import React, { useState, useEffect } from 'react';
import { Eye, X, Save, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function BulkHeadRemarkEntry() {
  // Dropdown options
  const [bankAccounts, setBankAccounts] = useState([]);
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [salaryMonths, setSalaryMonths] = useState([]);
  const [salaryHeads, setSalaryHeads] = useState([]);

  // Selected filters
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedAccountNo, setSelectedAccountNo] = useState('');
  const [selectedEmployeeType, setSelectedEmployeeType] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedHeadName, setSelectedHeadName] = useState('');

  // Table Data & Editable Remarks
  const [staffList, setStaffList] = useState([]);
  const [remarksData, setRemarksData] = useState({}); // { [staffId]: { amount, remark } }
  const [hasViewed, setHasViewed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Quick fill remark
  const [quickRemark, setQuickRemark] = useState('');

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

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [accRes, typeRes, monthRes, headRes] = await Promise.all([
          fetch(`${API_BASE}/api/salary-accounts`, { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch(`${API_BASE}/api/staff-types`, { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch(`${API_BASE}/api/salary-months`, { headers: { 'Authorization': `Bearer ${token}` } }),
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
        if (monthRes.ok) {
          const mData = await monthRes.json();
          setSalaryMonths(Array.isArray(mData) ? mData : []);
          if (Array.isArray(mData) && mData.length > 0) {
            setSelectedMonth(mData[0].monthName || mData[0].name || '');
          }
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

  const handleView = async () => {
    if (!selectedMonth) {
      showNotification('error', 'Please select a Salary Month.');
      return;
    }
    if (!selectedHeadName) {
      showNotification('error', 'Please select a Salary Head.');
      return;
    }

    try {
      setLoading(true);
      const [staffRes, remarkRes] = await Promise.all([
        fetch(`${API_BASE}/api/staffs`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${API_BASE}/api/head-remarks?salaryMonth=${encodeURIComponent(selectedMonth)}&salaryHead=${encodeURIComponent(selectedHeadName)}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      if (staffRes.ok) {
        const sData = await staffRes.json();
        let filtered = Array.isArray(sData) ? sData : [];

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

        // Map existing remarks if present
        let existingRemarks = [];
        if (remarkRes.ok) {
          existingRemarks = await remarkRes.json();
        }

        const initialMap = {};
        filtered.forEach(s => {
          const found = existingRemarks.find(r => String(r.staffId) === String(s._id));
          const existingHead = (s.salaryHeads || []).find(h => h.name === selectedHeadName);
          const defaultAmount = existingHead ? Number(existingHead.val) || 0 : 0;

          initialMap[s._id] = {
            amount: found ? found.amount : defaultAmount,
            remark: found ? found.remark : ''
          };
        });

        setRemarksData(initialMap);
        setHasViewed(true);
        setCurrentPage(1);
      } else {
        showNotification('error', 'Failed to fetch staff data.');
      }
    } catch (err) {
      console.error('Error viewing remarks:', err);
      showNotification('error', 'Server error while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedBank('');
    setSelectedAccountNo('');
    setSelectedEmployeeType('');
    if (salaryMonths.length > 0) setSelectedMonth(salaryMonths[0].monthName || salaryMonths[0].name || '');
    if (salaryHeads.length > 0) setSelectedHeadName(salaryHeads[0].head);
    setStaffList([]);
    setRemarksData({});
    setHasViewed(false);
    setSearch('');
    setStatusMessage(null);
  };

  const handleFieldChange = (staffId, field, value) => {
    setRemarksData(prev => ({
      ...prev,
      [staffId]: {
        ...prev[staffId],
        [field]: value
      }
    }));
  };

  const handleQuickApplyRemark = () => {
    if (!quickRemark.trim()) {
      showNotification('error', 'Please enter a remark to apply.');
      return;
    }
    const updated = { ...remarksData };
    staffList.forEach(s => {
      updated[s._id] = {
        ...(updated[s._id] || {}),
        remark: quickRemark
      };
    });
    setRemarksData(updated);
    showNotification('success', `Applied remark to all ${staffList.length} staff in view!`);
  };

  const handleSaveAll = async () => {
    if (staffList.length === 0) {
      showNotification('error', 'No staff records to save.');
      return;
    }

    try {
      setSaving(true);
      const entries = staffList.map(s => {
        const current = remarksData[s._id] || {};
        return {
          staffId: s._id,
          staffName: `${s.firstName || ''} ${s.lastName || ''}`.trim(),
          staffCode: s.empNo || s.userName || '',
          salaryMonth: selectedMonth,
          salaryHead: selectedHeadName,
          amount: Number(current.amount) || 0,
          remark: current.remark || ''
        };
      });

      const res = await fetch(`${API_BASE}/api/head-remarks/bulk`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ entries })
      });

      if (res.ok) {
        showNotification('success', `Remarks for "${selectedHeadName}" (${selectedMonth}) saved successfully!`);
      } else {
        const err = await res.json();
        showNotification('error', err.message || 'Failed to save head remarks.');
      }
    } catch (err) {
      console.error('Error saving remarks:', err);
      showNotification('error', 'Server error while saving.');
    } finally {
      setSaving(false);
    }
  };

  const uniqueBanks = Array.from(new Set(bankAccounts.map(b => b.bankName).filter(Boolean)));

  const searchedStaff = staffList.filter(s => {
    const fullName = `${s.firstName || ''} ${s.middleName || ''} ${s.lastName || ''}`.toLowerCase();
    const empNo = (s.empNo || s.userName || '').toLowerCase();
    const desig = (s.designation || '').toLowerCase();
    const q = search.toLowerCase();
    return !search || fullName.includes(q) || empNo.includes(q) || desig.includes(q);
  });

  const totalPages = Math.ceil(searchedStaff.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const currentRows = searchedStaff.slice(startIndex, startIndex + pageSize);

  return (
    <div className="mail-template-container" style={{ padding: '20px' }}>
      {/* Alert Status */}
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
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
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
          <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>Salary A/C No</label>
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
            Salary Month <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <select 
            className="settings-input"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
          >
            <option value="">Please Select</option>
            {salaryMonths.map(m => {
              const name = m.monthName || m.name || m.month;
              return (
                <option key={m._id} value={name}>{name}</option>
              );
            })}
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
            <option value="">Please Select</option>
            {salaryHeads.map(h => (
              <option key={h._id} value={h.head}>
                {h.head} ({h.type})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Buttons */}
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

      {/* Remarks Table Section */}
      {hasViewed && (
        <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '20px' }}>
          {/* Quick Apply & Save Header */}
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>
                Batch Remark for <span style={{ color: '#159BD7' }}>{selectedHeadName} ({selectedMonth})</span>:
              </span>
              <input 
                type="text"
                placeholder="e.g. Monthly Attendance Adjustment"
                value={quickRemark}
                onChange={(e) => setQuickRemark(e.target.value)}
                style={{ width: '260px', padding: '6px 10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
              />
              <button
                onClick={handleQuickApplyRemark}
                style={{
                  backgroundColor: '#0284c7',
                  color: 'white',
                  border: 'none',
                  padding: '6px 14px',
                  borderRadius: '4px',
                  fontSize: '13px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Apply To All
              </button>
            </div>

            <button
              onClick={handleSaveAll}
              disabled={saving}
              style={{
                backgroundColor: '#159BD7',
                color: 'white',
                border: 'none',
                padding: '9px 24px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: '600',
                cursor: saving ? 'not-allowed' : 'pointer',
                opacity: saving ? 0.7 : 1,
                boxShadow: '0 2px 4px rgba(21, 155, 215, 0.25)'
              }}
            >
              <Save size={16} /> {saving ? 'Saving...' : 'Save Remarks'}
            </button>
          </div>

          {/* Search Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ fontWeight: '700', fontSize: '14px', color: '#1e293b' }}>
              HEAD REMARKS LIST ({searchedStaff.length})
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#64748b' }}>Search:</span>
              <input 
                type="text"
                placeholder="Filter staff by name or code..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                style={{ padding: '6px 12px', borderRadius: '20px', border: '1px solid #cbd5e1', width: '230px' }}
              />
            </div>
          </div>

          {/* Table */}
          <div className="mail-table-wrapper" style={{ overflowX: 'auto' }}>
            <table className="mail-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ width: '60px', textAlign: 'center', padding: '12px', fontSize: '13px', color: '#475569' }}>Sr No.</th>
                  <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Emp No.</th>
                  <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Staff Name</th>
                  <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Designation</th>
                  <th style={{ textAlign: 'center', padding: '12px', fontSize: '13px', fontWeight: '600', color: '#475569', width: '150px' }}>Amount (₹)</th>
                  <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', fontWeight: '600', color: '#475569', width: '320px' }}>Remark / Justification</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
                      No staff records found.
                    </td>
                  </tr>
                ) : (
                  currentRows.map((staff, idx) => {
                    const rowNumber = startIndex + idx + 1;
                    const fullName = `${staff.firstName || ''} ${staff.middleName ? staff.middleName + ' ' : ''}${staff.lastName || ''}`.trim();
                    const staffState = remarksData[staff._id] || { amount: 0, remark: '' };

                    return (
                      <tr 
                        key={staff._id}
                        style={{
                          backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f8fafc',
                          borderBottom: '1px solid #f1f5f9'
                        }}
                      >
                        <td style={{ textAlign: 'center', padding: '12px', fontSize: '13px', color: '#64748b' }}>
                          {rowNumber}
                        </td>
                        <td style={{ padding: '12px', fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>
                          {staff.empNo || staff.userName || '-'}
                        </td>
                        <td style={{ padding: '12px', fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>
                          {fullName}
                        </td>
                        <td style={{ padding: '12px', fontSize: '13px', color: '#475569' }}>
                          {staff.designation || staff.staffType || '-'}
                        </td>
                        <td style={{ textAlign: 'center', padding: '8px 12px' }}>
                          <input 
                            type="number"
                            step="any"
                            value={staffState.amount}
                            onChange={(e) => handleFieldChange(staff._id, 'amount', e.target.value)}
                            style={{
                              width: '110px',
                              padding: '6px 8px',
                              borderRadius: '4px',
                              border: '1px solid #cbd5e1',
                              textAlign: 'right',
                              fontSize: '13px',
                              fontWeight: '600',
                              color: '#0f172a',
                              backgroundColor: '#fff'
                            }}
                          />
                        </td>
                        <td style={{ padding: '8px 12px' }}>
                          <input 
                            type="text"
                            placeholder="Enter remark..."
                            value={staffState.remark}
                            onChange={(e) => handleFieldChange(staff._id, 'remark', e.target.value)}
                            style={{
                              width: '100%',
                              padding: '6px 10px',
                              borderRadius: '4px',
                              border: '1px solid #cbd5e1',
                              fontSize: '13px',
                              backgroundColor: '#fff'
                            }}
                          />
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
