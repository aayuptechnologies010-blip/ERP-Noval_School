import React, { useState, useEffect } from 'react';
import { Eye, X, CheckSquare, RefreshCw, AlertCircle, CheckCircle, Save } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function BulkSalaryHeadAssign() {
  // Dropdown options
  const [bankAccounts, setBankAccounts] = useState([]);
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [salaryHeads, setSalaryHeads] = useState([]);

  // Selected filters
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedAccountNo, setSelectedAccountNo] = useState('');
  const [selectedEmployeeType, setSelectedEmployeeType] = useState('');
  const [selectedHeadName, setSelectedHeadName] = useState('');

  // Table Data & Staff
  const [staffList, setStaffList] = useState([]);
  const [hasViewed, setHasViewed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Bulk assignment configuration
  const [assignValue, setAssignValue] = useState('0.00');
  const [assignType, setAssignType] = useState('Fixed');
  const [selectedStaffIds, setSelectedStaffIds] = useState([]);

  // Search & Pagination
  const [search, setSearch] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Notification
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

  // Load initial dropdown data
  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [accRes, typeRes, headRes] = await Promise.all([
          fetch(`${API_BASE}/api/salary-accounts`, { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch(`${API_BASE}/api/staff-types`, { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch(`${API_BASE}/api/salary-heads`, { headers: { 'Authorization': `Bearer ${token}` } })
        ]);

        if (accRes.ok) {
          const aData = await accRes.json();
          setBankAccounts(Array.isArray(aData) ? aData : []);
        }
        if (typeRes.ok) {
          const tData = await typeRes.json();
          setEmployeeTypes(Array.isArray(tData) ? tData : []);
        }
        if (headRes.ok) {
          const hData = await headRes.json();
          setSalaryHeads(Array.isArray(hData) ? hData : []);
          if (Array.isArray(hData) && hData.length > 0) {
            setSelectedHeadName(hData[0].head);
          }
        }
      } catch (err) {
        console.error('Error fetching dropdown options:', err);
      }
    };
    fetchDropdowns();
  }, []);

  // Fetch staff based on filters
  const handleView = async () => {
    if (!selectedHeadName) {
      showNotification('error', 'Please select a Salary Head.');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/staffs`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.ok) {
        const data = await res.json();
        let filtered = Array.isArray(data) ? data : [];

        if (selectedBank) {
          filtered = filtered.filter(s => (s.bankName || '').toLowerCase().includes(selectedBank.toLowerCase()));
        }
        if (selectedAccountNo) {
          filtered = filtered.filter(s => (s.bankAccNo || s.empAccNo || '').toLowerCase().includes(selectedAccountNo.toLowerCase()));
        }
        if (selectedEmployeeType && selectedEmployeeType !== 'All') {
          filtered = filtered.filter(s => s.staffType === selectedEmployeeType);
        }

        setStaffList(filtered);
        setHasViewed(true);
        setSelectedStaffIds([]);
        setCurrentPage(1);

        // Try to infer default value from selected head definition
        const headObj = salaryHeads.find(h => h.head === selectedHeadName);
        if (headObj) {
          if (headObj.isCalculated) {
            setAssignType('Percentage');
          } else {
            setAssignType('Fixed');
          }
        }
      } else {
        showNotification('error', 'Failed to fetch staff records.');
      }
    } catch (err) {
      console.error('Error viewing staff:', err);
      showNotification('error', 'Server error while fetching staff.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedBank('');
    setSelectedAccountNo('');
    setSelectedEmployeeType('');
    if (salaryHeads.length > 0) setSelectedHeadName(salaryHeads[0].head);
    setStaffList([]);
    setHasViewed(false);
    setSelectedStaffIds([]);
    setSearch('');
    setStatusMessage(null);
  };

  // Assign Head to selected staff
  const handleBulkAssign = async () => {
    if (selectedStaffIds.length === 0) {
      showNotification('error', 'Please select at least one staff member to assign this head.');
      return;
    }
    if (!selectedHeadName) {
      showNotification('error', 'Please select a Salary Head.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch(`${API_BASE}/api/staffs/bulk/assign-salary-head`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          staffIds: selectedStaffIds,
          headName: selectedHeadName,
          value: assignValue,
          valueType: assignType
        })
      });

      if (res.ok) {
        showNotification('success', `Assigned ${selectedHeadName} (${assignValue} - ${assignType}) to ${selectedStaffIds.length} staff member(s) successfully!`);
        // Refresh the staff list
        handleView();
      } else {
        const err = await res.json();
        showNotification('error', err.message || 'Failed to assign salary head.');
      }
    } catch (err) {
      console.error('Error assigning salary head:', err);
      showNotification('error', 'Server error while assigning salary head.');
    } finally {
      setSubmitting(false);
    }
  };

  // Distinct banks from salary accounts
  const uniqueBanks = Array.from(new Set(bankAccounts.map(b => b.bankName).filter(Boolean)));

  // Filter staff by search term
  const searchedStaff = staffList.filter(s => {
    const fullName = `${s.firstName || ''} ${s.middleName || ''} ${s.lastName || ''}`.toLowerCase();
    const empNo = (s.empNo || s.userName || '').toLowerCase();
    const desig = (s.designation || '').toLowerCase();
    const q = search.toLowerCase();
    return !search || fullName.includes(q) || empNo.includes(q) || desig.includes(q);
  });

  // Pagination calculation
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
    <div className="mail-template-container" style={{ padding: '20px' }}>
      {/* Notifications */}
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

      {/* Filter Row */}
      <div className="settings-row" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
        gap: '20px', 
        padding: '24px', 
        background: '#f8fafc',
        borderRadius: '8px',
        border: '1px solid #e2e8f0'
      }}>
        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>School Bank</label>
          <select 
            className="settings-input"
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
          >
            <option value="">All School Banks</option>
            {uniqueBanks.map((b, idx) => (
              <option key={idx} value={b}>{b}</option>
            ))}
          </select>
        </div>

        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>Salary A/C No.</label>
          <select 
            className="settings-input"
            value={selectedAccountNo}
            onChange={(e) => setSelectedAccountNo(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
          >
            <option value="">All Salary A/C</option>
            {bankAccounts.map(a => (
              <option key={a._id} value={a.salaryAccountNo}>
                {a.salaryAccountNo} ({a.bankName})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>Employee Type</label>
          <select 
            className="settings-input"
            value={selectedEmployeeType}
            onChange={(e) => setSelectedEmployeeType(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
          >
            <option value="">All Employee Types</option>
            {employeeTypes.map(t => (
              <option key={t._id} value={t.staffType || t.type}>{t.staffType || t.type}</option>
            ))}
          </select>
        </div>

        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>
            Salary Head <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <select 
            className="settings-input"
            value={selectedHeadName}
            onChange={(e) => setSelectedHeadName(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
          >
            <option value="">Select Head</option>
            {salaryHeads.map(h => (
              <option key={h._id} value={h.head}>
                {h.head} ({h.type})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Action Buttons: View & Reset */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '20px', marginBottom: '25px' }}>
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
            gap: '8px', 
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer' 
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
            gap: '8px', 
            fontWeight: '600',
            cursor: 'pointer' 
          }}
        >
          <X size={16} /> Reset
        </button>
      </div>

      {/* Staff Assignment & Table Section */}
      {hasViewed && (
        <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '20px' }}>
          {/* Top Bar for Assigning Values */}
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
              <div style={{ fontWeight: '700', fontSize: '14px', color: '#1e293b' }}>
                Assign <span style={{ color: '#159BD7' }}>"{selectedHeadName}"</span>:
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: '500', color: '#475569' }}>Value:</span>
                <input 
                  type="text" 
                  value={assignValue}
                  onChange={(e) => setAssignValue(e.target.value)}
                  style={{ width: '100px', padding: '6px 10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: '500', color: '#475569' }}>Type:</span>
                <select 
                  value={assignType}
                  onChange={(e) => setAssignType(e.target.value)}
                  style={{ padding: '6px 10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                >
                  <option value="Fixed">Fixed Amount (₹)</option>
                  <option value="Percentage">Percentage (%)</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleBulkAssign}
              disabled={submitting}
              style={{
                backgroundColor: '#159BD7',
                color: 'white',
                border: 'none',
                padding: '8px 20px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: '600',
                cursor: submitting ? 'not-allowed' : 'pointer',
                opacity: submitting ? 0.7 : 1
              }}
            >
              <CheckSquare size={16} /> {submitting ? 'Assigning...' : `Assign to Selected (${selectedStaffIds.length})`}
            </button>
          </div>

          {/* Search Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ fontWeight: '700', fontSize: '14px', color: '#334155' }}>
              EMPLOYEE LIST ({searchedStaff.length})
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#64748b' }}>Search:</span>
              <input 
                type="text"
                placeholder="Filter by name, emp no..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                style={{ padding: '6px 12px', borderRadius: '20px', border: '1px solid #cbd5e1', width: '220px' }}
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
                  <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Father/Spouse</th>
                  <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Designation</th>
                  <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Bank / A/C</th>
                  <th style={{ textAlign: 'center', padding: '12px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Current {selectedHeadName}</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
                      No staff records found.
                    </td>
                  </tr>
                ) : (
                  currentRows.map((staff, idx) => {
                    const isChecked = selectedStaffIds.includes(staff._id);
                    const fullName = `${staff.firstName || ''} ${staff.middleName ? staff.middleName + ' ' : ''}${staff.lastName || ''}`.trim();
                    const existingHead = (staff.salaryHeads || []).find(h => h.name === selectedHeadName);

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
                        <td style={{ padding: '12px', fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>
                          {fullName}
                        </td>
                        <td style={{ padding: '12px', fontSize: '13px', color: '#64748b' }}>
                          {staff.fatherSpouseName || '-'}
                        </td>
                        <td style={{ padding: '12px', fontSize: '13px', color: '#475569' }}>
                          {staff.designation || staff.staffType || '-'}
                        </td>
                        <td style={{ padding: '12px', fontSize: '13px', color: '#475569' }}>
                          {staff.bankName ? `${staff.bankName} (${staff.bankAccNo || staff.empAccNo || '-'})` : '-'}
                        </td>
                        <td style={{ textAlign: 'center', padding: '12px', fontSize: '13px' }}>
                          {existingHead && existingHead.selected ? (
                            <span style={{ 
                              padding: '3px 8px', 
                              borderRadius: '4px', 
                              fontSize: '12px', 
                              fontWeight: '600', 
                              backgroundColor: '#dcfce7', 
                              color: '#166534',
                              border: '1px solid #bbf7d0'
                            }}>
                              {existingHead.type === 'Percentage' ? `${existingHead.val}%` : `₹${existingHead.val}`}
                            </span>
                          ) : (
                            <span style={{ color: '#94a3b8', fontSize: '12px', fontStyle: 'italic' }}>Not Assigned</span>
                          )}
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
      )}
    </div>
  );
}
