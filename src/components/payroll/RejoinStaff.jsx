import React, { useState, useEffect } from 'react';
import { UserCheck, X, RefreshCw, AlertCircle, CheckCircle, Search, Clock, Trash2, Calendar, FileText } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function RejoinStaff() {
  const [allStaff, setAllStaff] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [rejoinHistory, setRejoinHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [selectedStaffId, setSelectedStaffId] = useState('');
  const [newEmpNo, setNewEmpNo] = useState('');
  const [rejoinDate, setRejoinDate] = useState(new Date().toISOString().slice(0, 10));
  const [designation, setDesignation] = useState('');
  const [staffType, setStaffType] = useState('');
  const [basicSalary, setBasicSalary] = useState('');
  const [remarks, setRemarks] = useState('');

  // Table Search & Pagination for History
  const [historySearch, setHistorySearch] = useState('');
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

  const fetchData = async () => {
    try {
      setLoading(true);
      const [staffRes, desigRes, typeRes, historyRes] = await Promise.all([
        fetch(`${API_BASE}/api/staffs`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${API_BASE}/api/designations`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${API_BASE}/api/staff-types`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${API_BASE}/api/rejoin-staff`, { headers: { 'Authorization': `Bearer ${token}` } })
      ]);

      if (staffRes.ok) {
        const sList = await staffRes.json();
        setAllStaff(Array.isArray(sList) ? sList : []);
      }
      if (desigRes.ok) setDesignations(await desigRes.json());
      if (typeRes.ok) setEmployeeTypes(await typeRes.json());
      if (historyRes.ok) {
        const hList = await historyRes.json();
        setRejoinHistory(Array.isArray(hList) ? hList : []);
      }
    } catch (err) {
      console.error('Error loading rejoin data:', err);
      showNotification('error', 'Server error while loading staff and history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // When an employee is selected from dropdown, prefill form
  const handleEmployeeSelect = (staffId) => {
    setSelectedStaffId(staffId);
    if (!staffId) {
      setNewEmpNo('');
      setDesignation('');
      setStaffType('');
      setBasicSalary('');
      return;
    }

    const staff = allStaff.find(s => s._id === staffId);
    if (staff) {
      setNewEmpNo(staff.empNo || staff.userName || '');
      setDesignation(staff.designation || '');
      setStaffType(staff.staffType || '');
      setBasicSalary(staff.basicSalary || '');
      setRemarks(`Rejoined active service from ${new Date().toLocaleDateString('en-IN')}`);
    }
  };

  // Submit Rejoin
  const handleRejoin = async (e) => {
    e.preventDefault();
    if (!selectedStaffId) {
      showNotification('error', 'Please select a staff member to rejoin.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch(`${API_BASE}/api/rejoin-staff`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          staffId: selectedStaffId,
          newEmpNo: newEmpNo.trim(),
          rejoinDate,
          designation,
          staffType,
          basicSalary: Number(basicSalary) || 0,
          remarks
        })
      });

      const result = await res.json();
      if (res.ok) {
        showNotification('success', result.message || 'Staff rejoined successfully!');
        handleReset();
        fetchData();
      } else {
        showNotification('error', result.message || 'Failed to rejoin staff');
      }
    } catch (err) {
      console.error('Error rejoining staff:', err);
      showNotification('error', 'Server error while submitting rejoin request');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSelectedStaffId('');
    setNewEmpNo('');
    setRejoinDate(new Date().toISOString().slice(0, 10));
    setDesignation('');
    setStaffType('');
    setBasicSalary('');
    setRemarks('');
  };

  // Delete Rejoin History Record
  const handleDeleteRecord = async (id) => {
    if (!window.confirm('Are you sure you want to remove this rejoin history entry?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/rejoin-staff/${id}`, {
        method: 'DELETE',
        headers
      });
      if (res.ok) {
        showNotification('success', 'Rejoin record removed');
        setRejoinHistory(prev => prev.filter(item => item._id !== id));
      } else {
        showNotification('error', 'Failed to delete record');
      }
    } catch (err) {
      console.error('Error deleting record:', err);
      showNotification('error', 'Server error');
    }
  };

  // Unique Options
  const uniqueDesignations = Array.from(new Set([
    ...designations.map(d => d.type || d.designation || d.name).filter(Boolean),
    ...allStaff.map(s => s.designation).filter(Boolean)
  ])).sort();

  const uniqueEmployeeTypes = Array.from(new Set([
    ...employeeTypes.map(t => t.type || t.staffType || t.name).filter(Boolean),
    ...allStaff.map(s => s.staffType).filter(Boolean)
  ])).sort();

  // Filtered History
  const searchedHistory = rejoinHistory.filter(h => {
    const name = (h.staffName || '').toLowerCase();
    const oldCode = (h.oldEmpNo || '').toLowerCase();
    const newCode = (h.newEmpNo || '').toLowerCase();
    const desig = (h.designation || '').toLowerCase();
    const q = historySearch.toLowerCase();
    return !historySearch || name.includes(q) || oldCode.includes(q) || newCode.includes(q) || desig.includes(q);
  });

  const totalPages = Math.ceil(searchedHistory.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const currentRows = searchedHistory.slice(startIndex, startIndex + pageSize);

  const selectedStaffObj = allStaff.find(s => s._id === selectedStaffId);

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

      {/* Top Rejoin Action Card */}
      <form onSubmit={handleRejoin} style={{ 
        padding: '24px 30px', 
        maxWidth: '850px', 
        margin: '0 auto 30px auto', 
        background: '#f8fafc', 
        borderRadius: '8px', 
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
      }}>
        <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <UserCheck size={20} color="#159BD7" />
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#1e293b' }}>
            Rejoin Staff Member
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px', marginBottom: '18px' }}>
          {/* Select Employee */}
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>
              Select Employee <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <select 
              className="settings-input"
              value={selectedStaffId}
              onChange={(e) => handleEmployeeSelect(e.target.value)}
              required
              style={{ padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            >
              <option value="">-- Choose Employee --</option>
              {allStaff.map(s => {
                const isInactive = s.salaryStatus === 'Resigned' || !s.isActive || s.salaryStatus === 'Suspended';
                const tag = isInactive ? ` [${s.salaryStatus || 'Inactive'}]` : ' [Active]';
                const fullName = `${s.firstName || ''} ${s.lastName || ''}`.trim();
                return (
                  <option key={s._id} value={s._id}>
                    {fullName} ({s.empNo || s.userName || 'No Code'}){tag}
                  </option>
                );
              })}
            </select>
          </div>

          {/* New Emp No */}
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Emp No (New / Retain)</label>
            <input 
              type="text" 
              className="settings-input"
              value={newEmpNo}
              onChange={(e) => setNewEmpNo(e.target.value)}
              placeholder="e.g. SF099 or SF099-R"
              style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            />
          </div>

          {/* Rejoin Date */}
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>
              Rejoining Date <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input 
              type="date" 
              required
              className="settings-input"
              value={rejoinDate}
              onChange={(e) => setRejoinDate(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            />
          </div>

          {/* Designation */}
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Designation</label>
            <select 
              className="settings-input"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              style={{ padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            >
              <option value="">-- Select Designation --</option>
              {uniqueDesignations.map((d, i) => <option key={i} value={d}>{d}</option>)}
            </select>
          </div>

          {/* Employee Type */}
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Employee Type</label>
            <select 
              className="settings-input"
              value={staffType}
              onChange={(e) => setStaffType(e.target.value)}
              style={{ padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            >
              <option value="">-- Select Employee Type --</option>
              {uniqueEmployeeTypes.map((t, i) => <option key={i} value={t}>{t}</option>)}
            </select>
          </div>

          {/* Basic Salary */}
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Basic Salary (₹)</label>
            <input 
              type="number" 
              className="settings-input"
              value={basicSalary}
              onChange={(e) => setBasicSalary(e.target.value)}
              placeholder="e.g. 35000"
              style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            />
          </div>
        </div>

        {/* Selected Staff Info Box */}
        {selectedStaffObj && (
          <div style={{
            backgroundColor: '#e0f2fe',
            border: '1px solid #bae6fd',
            borderRadius: '6px',
            padding: '10px 15px',
            marginBottom: '15px',
            fontSize: '12px',
            color: '#0369a1',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '15px'
          }}>
            <div><strong>Selected:</strong> {selectedStaffObj.firstName} {selectedStaffObj.lastName}</div>
            <div><strong>Prev Status:</strong> {selectedStaffObj.salaryStatus || 'Active'}</div>
            {selectedStaffObj.leavingDate && <div><strong>Left On:</strong> {new Date(selectedStaffObj.leavingDate).toLocaleDateString('en-IN')}</div>}
            {selectedStaffObj.reasonOfLeaving && <div><strong>Leaving Reason:</strong> {selectedStaffObj.reasonOfLeaving}</div>}
          </div>
        )}

        {/* Remarks */}
        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}>
          <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Rejoining Remarks / Note</label>
          <input 
            type="text" 
            className="settings-input"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="e.g. Approved by management, rejoined with new role and revised salary band"
            style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
          />
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
          <button 
            type="submit"
            disabled={submitting}
            style={{ 
              backgroundColor: '#159BD7', 
              color: 'white', 
              border: 'none', 
              padding: '9px 28px', 
              borderRadius: '6px', 
              cursor: submitting ? 'not-allowed' : 'pointer', 
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 4px rgba(21, 155, 215, 0.25)'
            }}
          >
            <UserCheck size={16} /> {submitting ? 'Rejoining...' : 'Rejoin Staff'}
          </button>
          <button 
            type="button"
            onClick={handleReset}
            style={{ 
              backgroundColor: 'white', 
              color: '#ff9800', 
              border: '1px solid #ff9800', 
              padding: '9px 24px', 
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
      </form>

      {/* Rejoin History Table */}
      <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ fontWeight: '700', fontSize: '14px', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={16} color="#0284c7" />
            REJOINED STAFF HISTORY ({searchedHistory.length})
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#64748b' }}>Search:</span>
            <input 
              type="text"
              placeholder="Search history by name, code..."
              value={historySearch}
              onChange={(e) => { setHistorySearch(e.target.value); setCurrentPage(1); }}
              style={{ padding: '6px 12px', borderRadius: '20px', border: '1px solid #cbd5e1', width: '220px' }}
            />
          </div>
        </div>

        <div className="mail-table-wrapper" style={{ overflowX: 'auto' }}>
          <table className="mail-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ width: '50px', textAlign: 'center', padding: '12px', fontSize: '13px', color: '#475569' }}>#</th>
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', color: '#475569' }}>Staff Name</th>
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', color: '#475569' }}>Old Emp No</th>
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', color: '#475569' }}>New Emp No</th>
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', color: '#475569' }}>Rejoin Date</th>
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', color: '#475569' }}>Designation</th>
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', color: '#475569' }}>Staff Type</th>
                <th style={{ textAlign: 'right', padding: '12px', fontSize: '13px', color: '#475569' }}>Basic Salary (₹)</th>
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', color: '#475569' }}>Remarks</th>
                <th style={{ textAlign: 'center', padding: '12px', fontSize: '13px', color: '#475569' }}>Status</th>
                <th style={{ textAlign: 'center', padding: '12px', fontSize: '13px', color: '#475569' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="11" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                    <RefreshCw className="animate-spin" size={24} style={{ display: 'inline-block', marginBottom: '8px' }} />
                    <div>Loading rejoin history...</div>
                  </td>
                </tr>
              ) : currentRows.length === 0 ? (
                <tr>
                  <td colSpan="11" style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
                    No rejoin history records found.
                  </td>
                </tr>
              ) : (
                currentRows.map((h, idx) => (
                  <tr key={h._id} style={{ backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ textAlign: 'center', padding: '10px', fontSize: '13px', color: '#64748b' }}>
                      {startIndex + idx + 1}
                    </td>
                    <td style={{ padding: '10px', fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>
                      {h.staffName}
                    </td>
                    <td style={{ padding: '10px', fontSize: '13px', color: '#64748b' }}>
                      {h.oldEmpNo || '-'}
                    </td>
                    <td style={{ padding: '10px', fontSize: '13px', fontWeight: '600', color: '#0284c7' }}>
                      {h.newEmpNo || '-'}
                    </td>
                    <td style={{ padding: '10px', fontSize: '13px', color: '#334155' }}>
                      {h.rejoinDate ? new Date(h.rejoinDate).toLocaleDateString('en-IN') : '-'}
                    </td>
                    <td style={{ padding: '10px', fontSize: '13px', color: '#475569' }}>
                      {h.designation || '-'}
                    </td>
                    <td style={{ padding: '10px', fontSize: '13px', color: '#64748b' }}>
                      {h.staffType || '-'}
                    </td>
                    <td style={{ textAlign: 'right', padding: '10px', fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>
                      ₹{Number(h.basicSalary || 0).toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '10px', fontSize: '12px', color: '#64748b', maxWidth: '200px' }}>
                      {h.remarks || '-'}
                    </td>
                    <td style={{ textAlign: 'center', padding: '10px' }}>
                      <span style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '600' }}>
                        {h.status || 'Rejoined'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center', padding: '10px' }}>
                      <button 
                        onClick={() => handleDeleteRecord(h._id)}
                        style={{ border: 'none', background: 'transparent', color: '#ef4444', cursor: 'pointer', padding: '4px' }}
                        title="Delete entry"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', color: '#64748b', fontSize: '13px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            Showing {searchedHistory.length === 0 ? 0 : startIndex + 1} to {Math.min(startIndex + pageSize, searchedHistory.length)} of {searchedHistory.length} entries
          </div>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              style={{ padding: '5px 12px', border: '1px solid #cbd5e1', borderRadius: '4px', background: currentPage === 1 ? '#f8fafc' : '#fff', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
            >
              Previous
            </button>
            <span style={{ padding: '5px 12px', backgroundColor: '#159BD7', color: 'white', borderRadius: '4px', fontWeight: '600' }}>
              {currentPage}
            </span>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              style={{ padding: '5px 12px', border: '1px solid #cbd5e1', borderRadius: '4px', background: currentPage === totalPages ? '#f8fafc' : '#fff', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
