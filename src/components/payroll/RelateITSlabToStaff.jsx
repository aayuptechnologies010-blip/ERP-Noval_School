import React, { useState, useEffect } from 'react';
import { Save, X, RefreshCw, AlertCircle, CheckCircle, CheckSquare } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function RelateITSlabToStaff() {
  const [staffList, setStaffList] = useState([]);
  const [staffTypes, setStaffTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Configuration Dropdowns
  const [selectedStaffType, setSelectedStaffType] = useState('All');
  const [selectedRegime, setSelectedRegime] = useState('Tax payable in New Regime');
  const [selectedSlabGroup, setSelectedSlabGroup] = useState('For Male');

  // Search & Multi-select
  const [search, setSearch] = useState('');
  const [selectedStaffIds, setSelectedStaffIds] = useState([]);

  // Pagination
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

  const fetchData = async () => {
    try {
      setLoading(true);
      const [staffRes, typeRes] = await Promise.all([
        fetch(`${API_BASE}/api/staffs`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${API_BASE}/api/staff-types`, { headers: { 'Authorization': `Bearer ${token}` } })
      ]);

      if (staffRes.ok) {
        const sData = await staffRes.json();
        setStaffList(Array.isArray(sData) ? sData : []);
      }
      if (typeRes.ok) {
        const tData = await typeRes.json();
        setStaffTypes(Array.isArray(tData) ? tData : []);
      }
    } catch (err) {
      console.error('Error loading staff and staff types:', err);
      showNotification('error', 'Server error while fetching staff records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    if (selectedStaffIds.length === 0) {
      showNotification('error', 'Please select at least one staff member to relate IT Slab.');
      return;
    }
    if (!selectedRegime) {
      showNotification('error', 'Please select a Tax Regime Type.');
      return;
    }

    try {
      setSaving(true);
      const res = await fetch(`${API_BASE}/api/staffs/bulk/relate-it-slab`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          staffIds: selectedStaffIds,
          taxRegime: selectedRegime,
          itSlabGroup: selectedSlabGroup
        })
      });

      if (res.ok) {
        showNotification('success', `Assigned ${selectedRegime} (${selectedSlabGroup}) to ${selectedStaffIds.length} staff member(s) successfully!`);
        setSelectedStaffIds([]);
        fetchData();
      } else {
        const err = await res.json();
        showNotification('error', err.message || 'Failed to update staff IT Slab');
      }
    } catch (err) {
      console.error('Error saving IT slab relation:', err);
      showNotification('error', 'Server error while saving IT slab relation');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setSelectedStaffType('All');
    setSelectedRegime('Tax payable in New Regime');
    setSelectedSlabGroup('For Male');
    setSelectedStaffIds([]);
    setSearch('');
    setStatusMessage(null);
  };

  // Filter staff by staffType and search
  const filteredStaff = staffList.filter(s => {
    const fullName = `${s.firstName || ''} ${s.middleName || ''} ${s.lastName || ''}`.toLowerCase();
    const empNo = (s.empNo || s.userName || '').toLowerCase();
    const desig = (s.designation || '').toLowerCase();
    const regime = (s.taxRegime || '').toLowerCase();
    const q = search.toLowerCase();

    const matchesSearch = !search || fullName.includes(q) || empNo.includes(q) || desig.includes(q) || regime.includes(q);
    const matchesType = selectedStaffType === 'All' || s.staffType === selectedStaffType;

    return matchesSearch && matchesType;
  });

  // Pagination calculation
  const totalPages = Math.ceil(filteredStaff.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const currentRows = filteredStaff.slice(startIndex, startIndex + pageSize);

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

      {/* Top Setting Controls */}
      <div className="settings-row" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '20px', 
        padding: '24px', 
        background: '#f8fafc',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        marginBottom: '25px'
      }}>
        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>Staff Type Filter</label>
          <select 
            className="settings-input"
            value={selectedStaffType}
            onChange={(e) => { setSelectedStaffType(e.target.value); setCurrentPage(1); }}
            style={{ padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
          >
            <option value="All">All Staff Types</option>
            {staffTypes.map(t => (
              <option key={t._id} value={t.staffType || t.type}>{t.staffType || t.type}</option>
            ))}
          </select>
        </div>

        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>
            Select Tax Regime Type <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <select 
            className="settings-input"
            value={selectedRegime}
            onChange={(e) => setSelectedRegime(e.target.value)}
            style={{ padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
          >
            <option value="Tax payable in Existing Regime">Tax payable in Existing Regime (Old)</option>
            <option value="Tax payable in New Regime">Tax payable in New Regime</option>
          </select>
        </div>

        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>
            Tax Slab Group <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <select 
            className="settings-input"
            value={selectedSlabGroup}
            onChange={(e) => setSelectedSlabGroup(e.target.value)}
            style={{ padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
          >
            <option value="For Male">For Male</option>
            <option value="For Female">For Female</option>
            <option value="Senior Citizen">Senior Citizen</option>
            <option value="Super Senior Citizen">Super Senior Citizen</option>
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '25px', flexWrap: 'wrap' }}>
        <button 
          onClick={handleSave}
          disabled={saving}
          style={{ 
            backgroundColor: '#28a745', 
            color: 'white', 
            border: 'none', 
            padding: '9px 25px', 
            borderRadius: '6px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            cursor: saving ? 'not-allowed' : 'pointer', 
            fontWeight: '600',
            opacity: saving ? 0.7 : 1,
            boxShadow: '0 2px 4px rgba(40, 167, 69, 0.25)'
          }}
        >
          <Save size={16} /> {saving ? 'Saving...' : `Assign to Selected (${selectedStaffIds.length})`}
        </button>

        <button 
          onClick={handleReset}
          style={{ 
            backgroundColor: 'white', 
            color: '#ff9800', 
            border: '1px solid #ff9800', 
            padding: '9px 25px', 
            borderRadius: '6px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            cursor: 'pointer', 
            fontWeight: '600' 
          }}
        >
          <X size={16} /> Reset
        </button>

        <button 
          onClick={fetchData}
          style={{ 
            backgroundColor: '#f1f5f9', 
            color: '#475569', 
            border: '1px solid #cbd5e1', 
            padding: '9px 16px', 
            borderRadius: '6px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px', 
            cursor: 'pointer' 
          }}
        >
          <RefreshCw size={15} /> Refresh
        </button>
      </div>

      {/* Staff Table */}
      <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ fontWeight: '700', fontSize: '15px', color: '#1e293b', textTransform: 'uppercase' }}>
            STAFF IT REGIME & SLAB ALLOCATION ({filteredStaff.length})
            {selectedStaffIds.length > 0 && (
              <span style={{ marginLeft: '10px', fontSize: '13px', color: '#28a745', fontWeight: '600' }}>
                ({selectedStaffIds.length} Selected)
              </span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#64748b' }}>Search:</span>
            <input 
              type="text" 
              placeholder="Search staff, code, regime..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="settings-input" 
              style={{ width: '250px', padding: '6px 14px', borderRadius: '20px', border: '1px solid #cbd5e1' }} 
            />
          </div>
        </div>

        <div className="mail-table-wrapper" style={{ overflowX: 'auto' }}>
          <table className="mail-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '2px solid #e2e8f0' }}>
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
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Designation</th>
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Staff Type</th>
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Current IT Regime</th>
                <th style={{ textAlign: 'center', padding: '12px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Assigned Group</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                    Loading staff records...
                  </td>
                </tr>
              ) : currentRows.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
                    No staff records found.
                  </td>
                </tr>
              ) : (
                currentRows.map((staff, idx) => {
                  const isChecked = selectedStaffIds.includes(staff._id);
                  const fullName = `${staff.firstName || ''} ${staff.middleName ? staff.middleName + ' ' : ''}${staff.lastName || ''}`.trim() || 'Unnamed';
                  const empNo = staff.empNo || staff.userName || '-';
                  const regime = staff.taxRegime || 'Tax payable in Existing Regime';
                  const group = staff.itSlabGroup || 'For Male';

                  return (
                    <tr 
                      key={staff._id} 
                      style={{ 
                        backgroundColor: isChecked ? '#f0fdf4' : (idx % 2 === 0 ? '#ffffff' : '#f8fafc'),
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
                        {empNo}
                      </td>
                      <td style={{ padding: '12px', fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>
                        {fullName}
                      </td>
                      <td style={{ padding: '12px', fontSize: '13px', color: '#475569' }}>
                        {staff.designation || '-'}
                      </td>
                      <td style={{ padding: '12px', fontSize: '13px', color: '#64748b' }}>
                        {staff.staffType || '-'}
                      </td>
                      <td style={{ padding: '12px', fontSize: '13px' }}>
                        <span style={{ 
                          padding: '3px 9px', 
                          borderRadius: '4px', 
                          fontSize: '12px', 
                          fontWeight: '500',
                          backgroundColor: regime.includes('New') ? '#e0f2fe' : '#fef3c7',
                          color: regime.includes('New') ? '#0369a1' : '#b45309'
                        }}>
                          {regime}
                        </span>
                      </td>
                      <td style={{ textAlign: 'center', padding: '12px', fontSize: '13px' }}>
                        <span style={{ 
                          padding: '3px 10px', 
                          borderRadius: '12px', 
                          fontSize: '12px', 
                          fontWeight: '600',
                          backgroundColor: '#f1f5f9',
                          color: '#334155'
                        }}>
                          {group}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination & Footer */}
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
            Showing {filteredStaff.length === 0 ? 0 : startIndex + 1} to {Math.min(startIndex + pageSize, filteredStaff.length)} of {filteredStaff.length} entries
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
