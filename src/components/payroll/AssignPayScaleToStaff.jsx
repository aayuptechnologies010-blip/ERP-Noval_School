import React, { useState, useEffect } from 'react';
import { Eye, X, Search, CheckSquare, Save, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function AssignPayScaleToStaff() {
  // Dropdown options
  const [bankAccounts, setBankAccounts] = useState([]);
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [payScales, setPayScales] = useState([]);
  const [gradePays, setGradePays] = useState([]);

  // Top Filter States
  const [searchName, setSearchName] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedAccountNo, setSelectedAccountNo] = useState('');
  const [selectedEmployeeType, setSelectedEmployeeType] = useState('');
  const [selectedDesignation, setSelectedDesignation] = useState('');

  // Table Data & Staff
  const [allStaff, setAllStaff] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Assignment Controls
  const [assignPayScale, setAssignPayScale] = useState('');
  const [assignGradePay, setAssignGradePay] = useState(4600);
  const [assignBasicSalary, setAssignBasicSalary] = useState(34800);
  const [assignPayScaleAmount, setAssignPayScaleAmount] = useState(9300);
  const [selectedStaffIds, setSelectedStaffIds] = useState([]);

  // Table Search & Pagination
  const [tableSearch, setTableSearch] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Status Notification
  const [statusMessage, setStatusMessage] = useState(null);

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  const showNotification = (type, text) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  // 1. Initial Load: Fetch Dropdowns & Staff
  const fetchData = async () => {
    try {
      setLoading(true);
      const [accRes, typeRes, desigRes, scaleRes, gpRes, staffRes] = await Promise.all([
        fetch(`${API_BASE}/api/salary-accounts`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${API_BASE}/api/staff-types`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${API_BASE}/api/designations`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${API_BASE}/api/pay-scales`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${API_BASE}/api/grade-pays`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${API_BASE}/api/staffs`, { headers: { 'Authorization': `Bearer ${token}` } })
      ]);

      if (accRes.ok) setBankAccounts(await accRes.json());
      if (typeRes.ok) setEmployeeTypes(await typeRes.json());
      if (desigRes.ok) setDesignations(await desigRes.json());

      if (scaleRes.ok) {
        const sData = await scaleRes.json();
        setPayScales(Array.isArray(sData) ? sData : []);
        if (Array.isArray(sData) && sData.length > 0) setAssignPayScale(sData[0].scale);
      }

      if (gpRes.ok) {
        const gData = await gpRes.json();
        setGradePays(Array.isArray(gData) ? gData : []);
        if (Array.isArray(gData) && gData.length > 0) setAssignGradePay(gData[0].amount);
      }

      if (staffRes.ok) {
        const sList = await staffRes.json();
        const arr = Array.isArray(sList) ? sList : [];
        setAllStaff(arr);
        setStaffList(arr);
      }
    } catch (err) {
      console.error('Error fetching initial data:', err);
      showNotification('error', 'Server error while loading data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Compute Unique Values for Dropdowns (guarantees NO empty/blank options)
  const uniqueBanks = Array.from(new Set([
    ...bankAccounts.map(b => b.bank || b.bankName).filter(Boolean),
    ...allStaff.map(s => s.bankName).filter(Boolean)
  ])).sort();

  const uniqueAccounts = Array.from(new Set([
    ...bankAccounts.map(a => a.accountNo || a.salaryAccountNo).filter(Boolean),
    ...allStaff.map(s => s.bankAccNo || s.empAccNo).filter(Boolean)
  ])).sort();

  const uniqueEmployeeTypes = Array.from(new Set([
    ...employeeTypes.map(t => t.type || t.staffType || t.name).filter(Boolean),
    ...allStaff.map(s => s.staffType).filter(Boolean)
  ])).sort();

  const uniqueDesignations = Array.from(new Set([
    ...designations.map(d => d.type || d.designation || d.name).filter(Boolean),
    ...allStaff.map(s => s.designation).filter(Boolean)
  ])).sort();

  // Handle View / Filter
  const handleView = () => {
    let filtered = [...allStaff];

    if (searchName.trim()) {
      const sn = searchName.trim().toLowerCase();
      filtered = filtered.filter(s => {
        const name = `${s.firstName || ''} ${s.middleName || ''} ${s.lastName || ''}`.toLowerCase();
        const empNo = (s.empNo || s.userName || '').toLowerCase();
        return name.includes(sn) || empNo.includes(sn);
      });
    }

    if (selectedBank) {
      filtered = filtered.filter(s => (s.bankName || '').toLowerCase() === selectedBank.toLowerCase());
    }

    if (selectedAccountNo) {
      filtered = filtered.filter(s => (s.bankAccNo || s.empAccNo || '') === selectedAccountNo);
    }

    if (selectedEmployeeType && selectedEmployeeType !== 'All') {
      filtered = filtered.filter(s => s.staffType === selectedEmployeeType);
    }

    if (selectedDesignation && selectedDesignation !== 'All') {
      filtered = filtered.filter(s => s.designation === selectedDesignation);
    }

    setStaffList(filtered);
    setSelectedStaffIds([]);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearchName('');
    setSelectedBank('');
    setSelectedAccountNo('');
    setSelectedEmployeeType('');
    setSelectedDesignation('');
    setStaffList(allStaff);
    setSelectedStaffIds([]);
    setTableSearch('');
    setCurrentPage(1);
    setStatusMessage(null);
  };

  // Bulk Assign Pay Scale to Selected Staff
  const handleBulkAssign = async () => {
    if (selectedStaffIds.length === 0) {
      showNotification('error', 'Please select at least one staff member.');
      return;
    }
    if (!assignPayScale) {
      showNotification('error', 'Please select a Pay Scale to assign.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch(`${API_BASE}/api/staffs/bulk/assign-pay-scale`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          staffIds: selectedStaffIds,
          payScale: assignPayScale,
          gradePay: Number(assignGradePay),
          basicSalary: Number(assignBasicSalary),
          payScaleAmount: Number(assignPayScaleAmount)
        })
      });

      if (res.ok) {
        showNotification('success', `Assigned "${assignPayScale}" to ${selectedStaffIds.length} staff member(s) successfully!`);
        setSelectedStaffIds([]);
        // Re-fetch all staff to refresh state
        const staffRes = await fetch(`${API_BASE}/api/staffs`, { headers: { 'Authorization': `Bearer ${token}` } });
        if (staffRes.ok) {
          const sList = await staffRes.json();
          const arr = Array.isArray(sList) ? sList : [];
          setAllStaff(arr);
          setStaffList(arr);
        }
      } else {
        const err = await res.json();
        showNotification('error', err.message || 'Failed to assign pay scale');
      }
    } catch (err) {
      console.error('Error assigning pay scale:', err);
      showNotification('error', 'Server error while assigning pay scale');
    } finally {
      setSubmitting(false);
    }
  };

  // Table Search Filter
  const searchedStaff = staffList.filter(s => {
    const fullName = `${s.firstName || ''} ${s.middleName || ''} ${s.lastName || ''}`.toLowerCase();
    const empNo = (s.empNo || s.userName || '').toLowerCase();
    const desig = (s.designation || '').toLowerCase();
    const scale = (s.payScale || '').toLowerCase();
    const type = (s.staffType || '').toLowerCase();
    const q = tableSearch.toLowerCase();
    return !tableSearch || fullName.includes(q) || empNo.includes(q) || desig.includes(q) || scale.includes(q) || type.includes(q);
  });

  const totalPages = Math.ceil(searchedStaff.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const currentRows = searchedStaff.slice(startIndex, startIndex + pageSize);

  const areAllOnPageSelected = currentRows.length > 0 && currentRows.every(s => selectedStaffIds.includes(s._id));

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const pageStaffIds = currentRows.map(s => s._id);
      setSelectedStaffIds(prev => Array.from(new Set([...prev, ...pageStaffIds])));
    } else {
      const pageStaffIds = new Set(currentRows.map(s => s._id));
      setSelectedStaffIds(prev => prev.filter(id => !pageStaffIds.has(id)));
    }
  };

  const handleRowSelect = (id) => {
    setSelectedStaffIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="global-settings-container" style={{ padding: '20px' }}>
      {/* Alert Notifications */}
      {statusMessage && (
        <div style={{
          padding: '12px 20px',
          borderRadius: '6px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          backgroundColor: statusMessage.type === 'success' ? '#e8f5e9' : '#ffebee',
          color: statusMessage.type === 'success' ? '#2e7d32' : '#c62828',
          border: `1px solid ${statusMessage.type === 'success' ? '#a5d6a7' : '#ef9a9a'}`
        }}>
          {statusMessage.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          <span style={{ fontSize: '14px', fontWeight: '500' }}>{statusMessage.text}</span>
        </div>
      )}

      {/* Filter Card */}
      <div style={{ padding: '20px 30px', maxWidth: '900px', margin: '0 auto 25px auto', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '25px', flexWrap: 'wrap' }}>
          <label style={{ fontWeight: '600', fontSize: '13px', color: '#334155' }}>Enter/Search Name</label>
          <input 
            type="text" 
            placeholder="Search by Employee Name or Code..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleView(); }}
            className="settings-input" 
            style={{ width: '320px', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} 
          />
          <button 
            onClick={handleView}
            style={{ 
              backgroundColor: 'white', 
              color: '#159BD7', 
              border: '1px solid #159BD7', 
              padding: '8px 18px', 
              borderRadius: '6px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px', 
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            <Search size={16} /> Search
          </button>
        </div>

        <div className="settings-row" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '15px', 
          marginBottom: '20px',
          padding: 0
        }}>
          {/* School Bank */}
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>School Bank</label>
            <select 
              className="settings-input"
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            >
              <option value="">All School Banks</option>
              {uniqueBanks.map((b, i) => <option key={i} value={b}>{b}</option>)}
            </select>
          </div>

          {/* Salary A/C No */}
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>Salary A/C No</label>
            <select 
              className="settings-input"
              value={selectedAccountNo}
              onChange={(e) => setSelectedAccountNo(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            >
              <option value="">All Salary A/C No.</option>
              {uniqueAccounts.map((acc, i) => (
                <option key={i} value={acc}>{acc}</option>
              ))}
            </select>
          </div>

          {/* Employee Type */}
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>Employee Type</label>
            <select 
              className="settings-input"
              value={selectedEmployeeType}
              onChange={(e) => setSelectedEmployeeType(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            >
              <option value="">All Employee Types</option>
              {uniqueEmployeeTypes.map((t, idx) => (
                <option key={idx} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Designation */}
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>Designation</label>
            <select 
              className="settings-input"
              value={selectedDesignation}
              onChange={(e) => setSelectedDesignation(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            >
              <option value="">All Designations</option>
              {uniqueDesignations.map((d, i) => <option key={i} value={d}>{d}</option>)}
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
          <button 
            onClick={handleView}
            disabled={loading}
            style={{ 
              backgroundColor: 'white', 
              color: '#159BD7', 
              border: '1px solid #159BD7', 
              padding: '8px 24px', 
              borderRadius: '6px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px', 
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: '600'
            }}
          >
            <Eye size={16} /> {loading ? 'Loading...' : 'View'}
          </button>
          <button 
            onClick={handleReset}
            style={{ 
              backgroundColor: 'white', 
              color: '#ff9800', 
              border: '1px solid #ff9800', 
              padding: '8px 24px', 
              borderRadius: '6px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px', 
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            <X size={16} /> Reset
          </button>
        </div>
      </div>

      {/* Staff Assignment & Table Section (Always Visible) */}
      <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        {/* Action Header for Bulk Assignment */}
        <div style={{
          background: '#f1f5f9',
          padding: '16px 20px',
          borderRadius: '6px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '15px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Pay Scale:</span>
              <select 
                value={assignPayScale}
                onChange={(e) => setAssignPayScale(e.target.value)}
                style={{ padding: '6px 10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
              >
                <option value="">Select Pay Scale</option>
                {payScales.map(s => <option key={s._id} value={s.scale}>{s.scale}</option>)}
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Grade Pay:</span>
              <select 
                value={assignGradePay}
                onChange={(e) => setAssignGradePay(Number(e.target.value))}
                style={{ padding: '6px 10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
              >
                {gradePays.map(g => <option key={g._id} value={g.amount}>₹{g.amount}</option>)}
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Basic Salary:</span>
              <input 
                type="number"
                value={assignBasicSalary}
                onChange={(e) => setAssignBasicSalary(Number(e.target.value))}
                style={{ width: '100px', padding: '6px 10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Scale Amt:</span>
              <input 
                type="number"
                value={assignPayScaleAmount}
                onChange={(e) => setAssignPayScaleAmount(Number(e.target.value))}
                style={{ width: '90px', padding: '6px 10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
              />
            </div>
          </div>

          <button
            onClick={handleBulkAssign}
            disabled={submitting || selectedStaffIds.length === 0}
            style={{
              backgroundColor: '#159BD7',
              color: 'white',
              border: 'none',
              padding: '9px 22px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: '600',
              cursor: (submitting || selectedStaffIds.length === 0) ? 'not-allowed' : 'pointer',
              opacity: (submitting || selectedStaffIds.length === 0) ? 0.6 : 1,
              boxShadow: '0 2px 4px rgba(21, 155, 215, 0.25)'
            }}
          >
            <CheckSquare size={16} /> {submitting ? 'Assigning...' : `Assign to Selected (${selectedStaffIds.length})`}
          </button>
        </div>

        {/* Search Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ fontWeight: '700', fontSize: '14px', color: '#1e293b' }}>
            STAFF PAY SCALE LIST ({searchedStaff.length})
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#64748b' }}>Search:</span>
            <input 
              type="text"
              placeholder="Filter by name, code, scale..."
              value={tableSearch}
              onChange={(e) => { setTableSearch(e.target.value); setCurrentPage(1); }}
              style={{ padding: '6px 12px', borderRadius: '20px', border: '1px solid #cbd5e1', width: '240px' }}
            />
          </div>
        </div>

        {/* Table */}
        <div className="mail-table-wrapper" style={{ overflowX: 'auto' }}>
          <table className="mail-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ width: '45px', textAlign: 'center', padding: '12px' }}>
                  <input 
                    type="checkbox"
                    checked={areAllOnPageSelected}
                    onChange={handleSelectAll}
                    style={{ cursor: 'pointer', width: '16px', height: '16px' }}
                  />
                </th>
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Emp No.</th>
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Staff Name</th>
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Staff Type</th>
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Designation</th>
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Current Pay Scale</th>
                <th style={{ textAlign: 'right', padding: '12px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Grade Pay (₹)</th>
                <th style={{ textAlign: 'right', padding: '12px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Basic Salary (₹)</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                    <RefreshCw className="animate-spin" size={24} style={{ display: 'inline-block', marginBottom: '8px' }} />
                    <div>Loading staff records...</div>
                  </td>
                </tr>
              ) : currentRows.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
                    No staff records found matching criteria.
                  </td>
                </tr>
              ) : (
                currentRows.map((staff, idx) => {
                  const isChecked = selectedStaffIds.includes(staff._id);
                  const fullName = `${staff.firstName || ''} ${staff.middleName ? staff.middleName + ' ' : ''}${staff.lastName || ''}`.trim();
                  const isAyup = (staff.firstName && staff.firstName.toLowerCase().includes('ayup')) || (staff.userName === 'SF072');

                  return (
                    <tr 
                      key={staff._id}
                      style={{
                        backgroundColor: isChecked ? '#f0f9ff' : (idx % 2 === 0 ? '#ffffff' : '#f8fafc'),
                        borderBottom: '1px solid #f1f5f9'
                      }}
                    >
                      <td style={{ textAlign: 'center', padding: '12px' }}>
                        <input 
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleRowSelect(staff._id)}
                          style={{ cursor: 'pointer', width: '16px', height: '16px' }}
                        />
                      </td>
                      <td style={{ padding: '12px', fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>
                        {staff.empNo || staff.userName || '-'}
                      </td>
                      <td style={{ padding: '12px', fontSize: '13px', fontWeight: isAyup ? '700' : '600', color: isAyup ? '#0288d1' : '#1e293b' }}>
                        {fullName}
                        {isAyup && (
                          <span style={{ marginLeft: '8px', fontSize: '10px', backgroundColor: '#e1f5fe', color: '#0288d1', padding: '2px 6px', borderRadius: '4px', fontWeight: '600' }}>
                            Verified (Ayup Tech)
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '12px', fontSize: '13px', color: '#64748b' }}>
                        {staff.staffType || '-'}
                      </td>
                      <td style={{ padding: '12px', fontSize: '13px', color: '#475569' }}>
                        {staff.designation || '-'}
                      </td>
                      <td style={{ padding: '12px', fontSize: '13px' }}>
                        {staff.payScale ? (
                          <span style={{
                            padding: '3px 8px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: '600',
                            backgroundColor: '#e0f2fe',
                            color: '#0369a1'
                          }}>
                            {staff.payScale}
                          </span>
                        ) : (
                          <span style={{ color: '#94a3b8', fontStyle: 'italic', fontSize: '12px' }}>Not Assigned</span>
                        )}
                      </td>
                      <td style={{ textAlign: 'right', padding: '12px', fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>
                        ₹{staff.gradePay ? Number(staff.gradePay).toLocaleString('en-IN') : '0'}
                      </td>
                      <td style={{ textAlign: 'right', padding: '12px', fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>
                        ₹{staff.basicSalary ? Number(staff.basicSalary).toLocaleString('en-IN') : '0'}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', color: '#64748b', fontSize: '13px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            Show 
            <select 
              value={pageSize}
              onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
              style={{ margin: '0 4px', padding: '4px 8px', border: '1px solid #cbd5e1', borderRadius: '4px' }}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            entries
          </div>

          <div>
            Showing {searchedStaff.length === 0 ? 0 : startIndex + 1} to {Math.min(startIndex + pageSize, searchedStaff.length)} of {searchedStaff.length} entries
          </div>

          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              style={{ 
                padding: '5px 12px', 
                border: '1px solid #cbd5e1', 
                borderRadius: '4px', 
                background: currentPage === 1 ? '#f8fafc' : '#fff',
                color: currentPage === 1 ? '#94a3b8' : '#1e293b',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
              }}
            >
              Previous
            </button>
            <span style={{ 
              padding: '5px 12px', 
              backgroundColor: '#159BD7', 
              color: 'white', 
              borderRadius: '4px',
              fontWeight: '600'
            }}>
              {currentPage}
            </span>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              style={{ 
                padding: '5px 12px', 
                border: '1px solid #cbd5e1', 
                borderRadius: '4px', 
                background: currentPage === totalPages ? '#f8fafc' : '#fff',
                color: currentPage === totalPages ? '#94a3b8' : '#1e293b',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
