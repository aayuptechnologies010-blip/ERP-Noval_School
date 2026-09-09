import React, { useState, useEffect } from 'react';
import { CheckSquare, X, Eye, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function AssignSalaryGroupToStaff() {
  const [staffList, setStaffList] = useState([]);
  const [staffTypes, setStaffTypes] = useState([]);
  const [salaryGroups, setSalaryGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Filters & Selection
  const [selectedStaffType, setSelectedStaffType] = useState('All');
  const [selectedGroupId, setSelectedGroupId] = useState('');
  const [search, setSearch] = useState('');
  const [selectedStaffIds, setSelectedStaffIds] = useState([]);

  // Structure Modal
  const [showStructureModal, setShowStructureModal] = useState(false);
  const [structureGroup, setStructureGroup] = useState(null);

  // Alert/Status
  const [statusMessage, setStatusMessage] = useState(null);

  // Pagination
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  const showNotification = (type, text) => {
    setStatusMessage({ type, text });
    setTimeout(() => {
      setStatusMessage(null);
    }, 4000);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const [staffRes, typeRes, groupRes] = await Promise.all([
        fetch(`${API_BASE}/api/staffs`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${API_BASE}/api/staff-types`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${API_BASE}/api/salary-groups`, { headers: { 'Authorization': `Bearer ${token}` } })
      ]);

      if (staffRes.ok) {
        const sData = await staffRes.json();
        setStaffList(Array.isArray(sData) ? sData : []);
      }
      if (typeRes.ok) {
        const tData = await typeRes.json();
        setStaffTypes(Array.isArray(tData) ? tData : []);
      }
      if (groupRes.ok) {
        const gData = await groupRes.json();
        setSalaryGroups(Array.isArray(gData) ? gData : []);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      showNotification('error', 'Failed to load staff or salary groups');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filtered staff
  const filteredStaff = staffList.filter(item => {
    const fullName = `${item.firstName || ''} ${item.middleName || ''} ${item.lastName || ''}`.toLowerCase();
    const empNo = (item.empNo || item.userName || '').toLowerCase();
    const grp = (item.salaryGroup || '').toLowerCase();
    const desig = (item.designation || '').toLowerCase();
    const father = (item.fatherSpouseName || '').toLowerCase();
    const q = search.toLowerCase();

    const matchesSearch = !search || fullName.includes(q) || empNo.includes(q) || grp.includes(q) || desig.includes(q) || father.includes(q);
    const matchesType = selectedStaffType === 'All' || item.staffType === selectedStaffType;

    return matchesSearch && matchesType;
  });

  // Select all / Deselect all
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
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Assign action
  const handleAssign = async () => {
    if (selectedStaffIds.length === 0) {
      showNotification('error', 'Please select at least one staff member to assign.');
      return;
    }
    if (!selectedGroupId) {
      showNotification('error', 'Please select a Salary Group to assign.');
      return;
    }

    const groupObj = salaryGroups.find(g => g._id === selectedGroupId);
    const groupName = groupObj ? groupObj.groupName : '';

    try {
      setSubmitting(true);
      const res = await fetch(`${API_BASE}/api/staffs/bulk/assign-salary-group`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          staffIds: selectedStaffIds,
          salaryGroup: groupName
        })
      });

      if (res.ok) {
        showNotification('success', `Assigned "${groupName}" to ${selectedStaffIds.length} staff member(s) successfully!`);
        setSelectedStaffIds([]);
        fetchData();
      } else {
        const err = await res.json();
        showNotification('error', err.message || 'Failed to assign salary group');
      }
    } catch (err) {
      console.error('Error assigning group:', err);
      showNotification('error', 'Server error while assigning salary group');
    } finally {
      setSubmitting(false);
    }
  };

  // Remove action
  const handleRemove = async () => {
    if (selectedStaffIds.length === 0) {
      showNotification('error', 'Please select at least one staff member to remove group from.');
      return;
    }

    if (!window.confirm(`Are you sure you want to remove salary group for ${selectedStaffIds.length} selected staff member(s)?`)) {
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch(`${API_BASE}/api/staffs/bulk/assign-salary-group`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          staffIds: selectedStaffIds,
          salaryGroup: ''
        })
      });

      if (res.ok) {
        showNotification('success', `Removed salary group for ${selectedStaffIds.length} staff member(s) successfully!`);
        setSelectedStaffIds([]);
        fetchData();
      } else {
        const err = await res.json();
        showNotification('error', err.message || 'Failed to remove salary group');
      }
    } catch (err) {
      console.error('Error removing group:', err);
      showNotification('error', 'Server error while removing salary group');
    } finally {
      setSubmitting(false);
    }
  };

  // Show structure
  const handleShowStructure = () => {
    if (!selectedGroupId) {
      showNotification('error', 'Please select a Salary Group from the dropdown first.');
      return;
    }
    const groupObj = salaryGroups.find(g => g._id === selectedGroupId);
    if (!groupObj) {
      showNotification('error', 'Selected salary group not found.');
      return;
    }
    setStructureGroup(groupObj);
    setShowStructureModal(true);
  };

  // Pagination calculation
  const totalPages = Math.ceil(filteredStaff.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const currentRows = filteredStaff.slice(startIndex, startIndex + pageSize);

  const areAllOnPageSelected = currentRows.length > 0 && currentRows.every(s => selectedStaffIds.includes(s._id));

  return (
    <div className="mail-template-container" style={{ padding: '20px' }}>
      {/* Alert message */}
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

      {/* Top Controls: Staff Type & Salary Group */}
      <div className="settings-row" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '25px', 
        background: '#f8fafc',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        marginBottom: '25px'
      }}>
        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>Staff Type</label>
          <select 
            className="settings-input" 
            value={selectedStaffType}
            onChange={(e) => { setSelectedStaffType(e.target.value); setCurrentPage(1); }}
            style={{ padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
          >
            <option value="All">All Staff Types</option>
            {staffTypes.map(t => (
              <option key={t._id} value={t.staffType || t.type}>{t.staffType || t.type}</option>
            ))}
          </select>
        </div>

        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>Salary Group</label>
          <select 
            className="settings-input"
            value={selectedGroupId}
            onChange={(e) => setSelectedGroupId(e.target.value)}
            style={{ padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
          >
            <option value="">-- Select Group --</option>
            {salaryGroups.map(g => (
              <option key={g._id} value={g._id}>
                {g.groupName} (Basic: ₹{g.basicFrom} - ₹{g.basicTo})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '25px', flexWrap: 'wrap' }}>
        <button 
          onClick={handleAssign}
          disabled={submitting}
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
            cursor: submitting ? 'not-allowed' : 'pointer',
            opacity: submitting ? 0.7 : 1,
            boxShadow: '0 2px 4px rgba(21, 155, 215, 0.2)'
          }}
        >
          <CheckSquare size={16} /> Assign
        </button>

        <button 
          onClick={handleRemove}
          disabled={submitting}
          style={{ 
            backgroundColor: '#ef4444', 
            color: 'white', 
            border: 'none', 
            padding: '9px 24px', 
            borderRadius: '6px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            fontWeight: '600',
            cursor: submitting ? 'not-allowed' : 'pointer',
            opacity: submitting ? 0.7 : 1,
            boxShadow: '0 2px 4px rgba(239, 68, 68, 0.2)'
          }}
        >
          <X size={16} /> Remove
        </button>

        <button 
          onClick={handleShowStructure}
          style={{ 
            backgroundColor: 'white', 
            color: '#159BD7', 
            border: '1px solid #159BD7', 
            padding: '9px 24px', 
            borderRadius: '6px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            fontWeight: '600',
            cursor: 'pointer' 
          }}
        >
          <Eye size={16} /> Show Structure
        </button>

        <button 
          onClick={fetchData}
          title="Refresh List"
          style={{ 
            backgroundColor: '#f1f5f9', 
            color: '#475569', 
            border: '1px solid #cbd5e1', 
            padding: '9px 15px', 
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

      {/* Staff List Table Area */}
      <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '20px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '18px',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ fontWeight: '700', fontSize: '15px', color: '#1e293b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            STAFF DETAILS ({filteredStaff.length})
            {selectedStaffIds.length > 0 && (
              <span style={{ marginLeft: '10px', fontSize: '13px', color: '#159BD7', fontWeight: '600' }}>
                ({selectedStaffIds.length} Selected)
              </span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#64748b' }}>Search:</span>
            <input 
              type="text" 
              placeholder="Search staff, code, group..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="settings-input" 
              style={{ width: '260px', padding: '6px 14px', borderRadius: '20px', border: '1px solid #cbd5e1' }} 
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
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Name</th>
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Group Name</th>
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Father/Spouse</th>
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Designation</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                    Loading staff records...
                  </td>
                </tr>
              ) : currentRows.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
                    No staff found matching criteria.
                  </td>
                </tr>
              ) : (
                currentRows.map((staff, idx) => {
                  const isChecked = selectedStaffIds.includes(staff._id);
                  const fullName = `${staff.firstName || ''} ${staff.middleName ? staff.middleName + ' ' : ''}${staff.lastName || ''}`.trim() || 'Unnamed';
                  const empNo = staff.empNo || staff.userName || '-';
                  const group = staff.salaryGroup;

                  return (
                    <tr 
                      key={staff._id} 
                      style={{ 
                        backgroundColor: isChecked ? '#f0f9ff' : (idx % 2 === 0 ? '#ffffff' : '#f8fafc'),
                        borderBottom: '1px solid #f1f5f9',
                        transition: 'background 0.2s'
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
                      <td style={{ padding: '12px', fontSize: '13px' }}>
                        {group ? (
                          <span style={{ 
                            padding: '4px 10px', 
                            borderRadius: '12px', 
                            fontSize: '12px', 
                            fontWeight: '600',
                            backgroundColor: '#e0f2fe',
                            color: '#0284c7',
                            border: '1px solid #bae6fd'
                          }}>
                            {group}
                          </span>
                        ) : (
                          <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>Not Assigned</span>
                        )}
                      </td>
                      <td style={{ padding: '12px', fontSize: '13px', color: '#64748b' }}>
                        {staff.fatherSpouseName || '-'}
                      </td>
                      <td style={{ padding: '12px', fontSize: '13px', color: '#475569' }}>
                        {staff.designation || staff.staffType || '-'}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination & Summary */}
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

      {/* Show Structure Modal */}
      {showStructureModal && structureGroup && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            width: '90%',
            maxWidth: '650px',
            maxHeight: '85vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '16px 24px',
              backgroundColor: '#159BD7',
              color: '#fff',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>
                Salary Structure: {structureGroup.groupName}
              </h3>
              <button 
                onClick={() => setShowStructureModal(false)}
                style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '20px 24px', overflowY: 'auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '20px', background: '#f8fafc', padding: '12px 16px', borderRadius: '6px' }}>
                <div>
                  <span style={{ fontSize: '12px', color: '#64748b', display: 'block' }}>Basic Pay Range</span>
                  <strong style={{ fontSize: '14px', color: '#1e293b' }}>₹{structureGroup.basicFrom} - ₹{structureGroup.basicTo}</strong>
                </div>
                <div>
                  <span style={{ fontSize: '12px', color: '#64748b', display: 'block' }}>Grade Pay</span>
                  <strong style={{ fontSize: '14px', color: '#1e293b' }}>₹{structureGroup.gradePay || '0.00'}</strong>
                </div>
                <div>
                  <span style={{ fontSize: '12px', color: '#64748b', display: 'block' }}>Pay Scale</span>
                  <strong style={{ fontSize: '14px', color: '#1e293b' }}>{structureGroup.payScale || '0.00'}</strong>
                </div>
              </div>

              <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#334155', marginBottom: '10px' }}>
                Assigned Salary Heads
              </h4>
              
              <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #e2e8f0' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f1f5f9' }}>
                    <th style={{ padding: '8px 12px', textAlign: 'left', fontSize: '12px', borderBottom: '1px solid #e2e8f0' }}>Head Name</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', fontSize: '12px', borderBottom: '1px solid #e2e8f0' }}>Calculation Type</th>
                    <th style={{ padding: '8px 12px', textAlign: 'right', fontSize: '12px', borderBottom: '1px solid #e2e8f0' }}>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {(!structureGroup.heads || structureGroup.heads.filter(h => h.selected).length === 0) ? (
                    <tr>
                      <td colSpan="3" style={{ textAlign: 'center', padding: '20px', color: '#94a3b8', fontSize: '13px' }}>
                        No heads active for this group.
                      </td>
                    </tr>
                  ) : (
                    structureGroup.heads.filter(h => h.selected).map((head, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '10px 12px', fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>
                          {head.headName}
                        </td>
                        <td style={{ padding: '10px 12px', fontSize: '13px', color: '#475569' }}>
                          <span style={{
                            padding: '2px 8px',
                            borderRadius: '4px',
                            fontSize: '11px',
                            backgroundColor: head.valueType === 'Percentage' ? '#e0f2fe' : '#f1f5f9',
                            color: head.valueType === 'Percentage' ? '#0284c7' : '#475569'
                          }}>
                            {head.valueType || 'Fixed'}
                          </span>
                        </td>
                        <td style={{ padding: '10px 12px', fontSize: '13px', fontWeight: '600', textAlign: 'right', color: '#0f172a' }}>
                          {head.valueType === 'Percentage' ? `${head.value}%` : `₹${head.value}`}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Modal Footer */}
            <div style={{ padding: '12px 24px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                onClick={() => setShowStructureModal(false)}
                style={{
                  padding: '8px 20px',
                  backgroundColor: '#64748b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
