import React, { useState, useEffect } from 'react';
import { Eye, X, Save, RefreshCw, AlertCircle, CheckCircle, ArrowDown } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function BulkSalaryHeadEntry() {
  // Dropdowns
  const [bankAccounts, setBankAccounts] = useState([]);
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [salaryHeads, setSalaryHeads] = useState([]);

  // Filter selections
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedAccountNo, setSelectedAccountNo] = useState('');
  const [selectedEmployeeType, setSelectedEmployeeType] = useState('');
  const [selectedHeadName, setSelectedHeadName] = useState('');

  // Table Data & Editable Entries
  const [staffList, setStaffList] = useState([]);
  const [headEntries, setHeadEntries] = useState({}); // { [staffId]: value }
  const [hasViewed, setHasViewed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Quick fill value
  const [quickFillVal, setQuickFillVal] = useState('');

  // Search & Pagination
  const [search, setSearch] = useState('');
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
        setCurrentPage(1);

        // Populate initial entries map from existing heads
        const initialMap = {};
        filtered.forEach(s => {
          const existing = (s.salaryHeads || []).find(h => h.name === selectedHeadName);
          initialMap[s._id] = existing ? existing.val : '0.00';
        });
        setHeadEntries(initialMap);
      } else {
        showNotification('error', 'Failed to load staff list.');
      }
    } catch (err) {
      console.error('Error fetching staff:', err);
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
    setHeadEntries({});
    setHasViewed(false);
    setSearch('');
    setStatusMessage(null);
  };

  const handleEntryChange = (staffId, val) => {
    setHeadEntries(prev => ({
      ...prev,
      [staffId]: val
    }));
  };

  const handleQuickFill = () => {
    if (!quickFillVal) {
      showNotification('error', 'Please enter a value to fill.');
      return;
    }
    const updated = { ...headEntries };
    staffList.forEach(s => {
      updated[s._id] = quickFillVal;
    });
    setHeadEntries(updated);
    showNotification('success', `Filled ${quickFillVal} for all staff in view!`);
  };

  const handleSaveAll = async () => {
    if (staffList.length === 0) {
      showNotification('error', 'No staff entries to save.');
      return;
    }

    try {
      setSaving(true);
      const entries = staffList.map(s => ({
        staffId: s._id,
        headName: selectedHeadName,
        val: headEntries[s._id] !== undefined ? headEntries[s._id] : '0.00'
      }));

      const res = await fetch(`${API_BASE}/api/staffs/bulk/salary-head-entry`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ entries })
      });

      if (res.ok) {
        showNotification('success', `Salary head entries for "${selectedHeadName}" saved successfully!`);
      } else {
        const err = await res.json();
        showNotification('error', err.message || 'Failed to save entries.');
      }
    } catch (err) {
      console.error('Error saving salary head entries:', err);
      showNotification('error', 'Server error while saving entries.');
    } finally {
      setSaving(false);
    }
  };

  const uniqueBanks = Array.from(new Set(bankAccounts.map(b => b.bankName).filter(Boolean)));

  // Filtered by search
  const searchedStaff = staffList.filter(s => {
    const fullName = `${s.firstName || ''} ${s.middleName || ''} ${s.lastName || ''}`.toLowerCase();
    const empNo = (s.empNo || s.userName || '').toLowerCase();
    const desig = (s.designation || '').toLowerCase();
    const q = search.toLowerCase();
    return !search || fullName.includes(q) || empNo.includes(q) || desig.includes(q);
  });

  // Pagination
  const totalPages = Math.ceil(searchedStaff.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const currentRows = searchedStaff.slice(startIndex, startIndex + pageSize);

  return (
    <div className="mail-template-container" style={{ padding: '20px' }}>
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
            Head <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <select 
            className="settings-input"
            value={selectedHeadName}
            onChange={(e) => setSelectedHeadName(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
          >
            <option value="">All Salary Heads</option>
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

      {/* Entry Sheet & Staff List */}
      {hasViewed && (
        <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '20px' }}>
          {/* Quick Fill & Action Bar */}
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
                Quick Fill <span style={{ color: '#159BD7' }}>"{selectedHeadName}"</span> Amount:
              </span>
              <input 
                type="number"
                placeholder="e.g. 500"
                value={quickFillVal}
                onChange={(e) => setQuickFillVal(e.target.value)}
                style={{ width: '120px', padding: '6px 10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
              />
              <button
                onClick={handleQuickFill}
                style={{
                  backgroundColor: '#0284c7',
                  color: 'white',
                  border: 'none',
                  padding: '6px 14px',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '13px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                <ArrowDown size={14} /> Fill All
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
              <Save size={16} /> {saving ? 'Saving...' : 'Save Entries'}
            </button>
          </div>

          {/* Search Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ fontWeight: '700', fontSize: '14px', color: '#1e293b' }}>
              STAFF HEAD ENTRY LIST ({searchedStaff.length})
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#64748b' }}>Search:</span>
              <input 
                type="text"
                placeholder="Filter by name, code..."
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
                  <th style={{ width: '60px', textAlign: 'center', padding: '12px', fontSize: '13px', color: '#475569' }}>Sr No.</th>
                  <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Emp No.</th>
                  <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Staff Name</th>
                  <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Father/Spouse</th>
                  <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Designation</th>
                  <th style={{ textAlign: 'center', padding: '12px', fontSize: '13px', fontWeight: '600', color: '#475569', width: '200px' }}>
                    {selectedHeadName} (Amount ₹)
                  </th>
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
                    const currentValue = headEntries[staff._id] !== undefined ? headEntries[staff._id] : '0.00';

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
                        <td style={{ padding: '12px', fontSize: '13px', color: '#64748b' }}>
                          {staff.fatherSpouseName || '-'}
                        </td>
                        <td style={{ padding: '12px', fontSize: '13px', color: '#475569' }}>
                          {staff.designation || staff.staffType || '-'}
                        </td>
                        <td style={{ textAlign: 'center', padding: '8px 12px' }}>
                          <input 
                            type="number"
                            step="any"
                            value={currentValue}
                            onChange={(e) => handleEntryChange(staff._id, e.target.value)}
                            style={{
                              width: '130px',
                              padding: '6px 10px',
                              borderRadius: '4px',
                              border: '1px solid #94a3b8',
                              textAlign: 'right',
                              fontSize: '13px',
                              fontWeight: '600',
                              color: '#0f172a',
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
