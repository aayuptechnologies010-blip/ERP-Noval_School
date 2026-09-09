import React, { useState, useEffect } from 'react';
import { Plus, Download, Edit, Trash2, X, Save, AlertCircle, CheckCircle } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function DefineITHeadGroups() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Modals
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    groupSlNo: 1,
    groupName: '',
    maxRebateLimit: 0,
    percentage: 100,
    isActive: true
  });

  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [submitting, setSubmitting] = useState(false);

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
      const res = await fetch(`${API_BASE}/api/it-head-groups`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const result = await res.json();
        setData(Array.isArray(result) ? result : []);
      } else {
        showNotification('error', 'Failed to load IT Head Groups');
      }
    } catch (err) {
      console.error('Error fetching IT head groups:', err);
      showNotification('error', 'Server error while fetching groups');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      groupSlNo: (data.length || 0) + 1,
      groupName: '',
      maxRebateLimit: 0,
      percentage: 100,
      isActive: true
    });
    setShowModal(true);
  };

  const handleOpenEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      groupSlNo: item.groupSlNo || 1,
      groupName: item.groupName || '',
      maxRebateLimit: item.maxRebateLimit !== undefined ? item.maxRebateLimit : 0,
      percentage: item.percentage !== undefined ? item.percentage : 100,
      isActive: item.isActive !== undefined ? item.isActive : true
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.groupName.trim()) {
      alert('Group Name is required');
      return;
    }

    try {
      setSubmitting(true);
      const url = editingId 
        ? `${API_BASE}/api/it-head-groups/${editingId}`
        : `${API_BASE}/api/it-head-groups`;
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        showNotification('success', `IT Head Group ${editingId ? 'updated' : 'created'} successfully!`);
        setShowModal(false);
        fetchData();
      } else {
        const err = await res.json();
        showNotification('error', err.message || 'Save failed');
      }
    } catch (err) {
      console.error('Error saving group:', err);
      showNotification('error', 'Server error while saving');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    try {
      setSubmitting(true);
      const res = await fetch(`${API_BASE}/api/it-head-groups/${deleteConfirm._id}`, {
        method: 'DELETE',
        headers
      });

      if (res.ok) {
        showNotification('success', 'IT Head Group deleted successfully!');
        setDeleteConfirm(null);
        fetchData();
      } else {
        const err = await res.json();
        showNotification('error', err.message || 'Delete failed');
      }
    } catch (err) {
      console.error('Error deleting group:', err);
      showNotification('error', 'Server error while deleting');
    } finally {
      setSubmitting(false);
    }
  };

  const handleExportCSV = () => {
    if (data.length === 0) {
      alert('No data to export');
      return;
    }

    const headersLine = ['Sr. No.', 'Sl. No.', 'Group Name', 'Max Rebate Limit', 'Percentage (%)', 'Modify Date'];
    const rows = data.map((item, i) => [
      i + 1,
      item.groupSlNo || '',
      `"${item.groupName}"`,
      item.maxRebateLimit !== undefined ? item.maxRebateLimit.toFixed(2) : '0.00',
      item.percentage !== undefined ? `${item.percentage.toFixed(2)}%` : '100.00%',
      `"${item.modifyDate || item.updatedAt ? new Date(item.modifyDate || item.updatedAt).toLocaleDateString('en-GB') : ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headersLine.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `IT_Head_Groups_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredData = data.filter(row => {
    const q = search.toLowerCase();
    return (
      (row.groupName && row.groupName.toLowerCase().includes(q)) ||
      String(row.groupSlNo).includes(q) ||
      String(row.maxRebateLimit).includes(q)
    );
  });

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const currentRows = filteredData.slice(startIndex, startIndex + pageSize);

  return (
    <div className="mail-template-container" style={{ padding: '20px' }}>
      {/* Alert Notification */}
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

      {/* Header Bar */}
      <div className="mail-template-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search IT Head Groups..." 
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="search-input" 
            style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid #cbd5e1', width: '250px' }}
          />
        </div>
        <div className="header-buttons" style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={handleOpenAdd}
            className="btn-add"
            style={{ 
              backgroundColor: '#159BD7', 
              color: 'white', 
              border: 'none', 
              padding: '9px 18px', 
              borderRadius: '6px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px', 
              fontWeight: '600',
              cursor: 'pointer' 
            }}
          >
            <Plus size={16} /> Add New IT Head Group
          </button>
          <button 
            onClick={handleExportCSV}
            className="btn-export"
            style={{ 
              backgroundColor: '#0284c7', 
              color: 'white', 
              border: 'none', 
              padding: '9px 18px', 
              borderRadius: '6px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px', 
              fontWeight: '600',
              cursor: 'pointer' 
            }}
          >
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="mail-table-wrapper" style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', overflowX: 'auto' }}>
        <table className="mail-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ width: '60px', textAlign: 'center', padding: '12px', fontSize: '13px', color: '#475569' }}>Sr. No.</th>
              <th style={{ width: '60px', textAlign: 'center', padding: '12px', fontSize: '13px', color: '#475569' }}>Sl. No.</th>
              <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Group Name</th>
              <th style={{ textAlign: 'right', padding: '12px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Max Rebate Limit</th>
              <th style={{ textAlign: 'center', padding: '12px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Percentage</th>
              <th style={{ textAlign: 'center', padding: '12px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Modify Date</th>
              <th style={{ width: '90px', textAlign: 'center', padding: '12px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                  Loading IT Head Groups...
                </td>
              </tr>
            ) : currentRows.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: '#94a3b8', backgroundColor: '#f8f9fa' }}>
                  No IT head groups found.
                </td>
              </tr>
            ) : (
              currentRows.map((row, i) => (
                <tr 
                  key={row._id} 
                  style={{
                    backgroundColor: i % 2 === 0 ? '#ffffff' : '#f8fafc',
                    borderBottom: '1px solid #f1f5f9'
                  }}
                >
                  <td style={{ textAlign: 'center', padding: '12px', fontSize: '13px', color: '#64748b' }}>
                    {startIndex + i + 1}
                  </td>
                  <td style={{ textAlign: 'center', padding: '12px', fontSize: '13px', color: '#475569' }}>
                    {row.groupSlNo}
                  </td>
                  <td style={{ padding: '12px', fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>
                    {row.groupName}
                  </td>
                  <td style={{ textAlign: 'right', padding: '12px', fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>
                    ₹{Number(row.maxRebateLimit).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                  <td style={{ textAlign: 'center', padding: '12px', fontSize: '13px' }}>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '600',
                      backgroundColor: '#e0f2fe',
                      color: '#0369a1'
                    }}>
                      {row.percentage}%
                    </span>
                  </td>
                  <td style={{ textAlign: 'center', padding: '12px', fontSize: '13px', color: '#64748b' }}>
                    {row.modifyDate || row.updatedAt ? new Date(row.modifyDate || row.updatedAt).toLocaleDateString('en-GB') : '-'}
                  </td>
                  <td style={{ textAlign: 'center', padding: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                      <button 
                        onClick={() => handleOpenEdit(row)}
                        title="Edit"
                        style={{ background: 'none', border: 'none', color: '#159BD7', cursor: 'pointer', padding: '4px' }}
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => setDeleteConfirm(row)}
                        title="Delete"
                        style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
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
          Showing {filteredData.length === 0 ? 0 : startIndex + 1} to {Math.min(startIndex + pageSize, filteredData.length)} of {filteredData.length} entries
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

      {/* Add/Edit Modal */}
      {showModal && (
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
            maxWidth: '500px',
            overflow: 'hidden',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }}>
            <div style={{
              padding: '16px 20px',
              backgroundColor: '#159BD7',
              color: '#fff',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>
                {editingId ? 'Edit IT Head Group' : 'Add New IT Head Group'}
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} style={{ padding: '20px' }}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                  Group Name <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. 80 CC, House Rent Paid, Interest of loan"
                  value={formData.groupName}
                  onChange={(e) => setFormData({ ...formData, groupName: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                    Sl. No.
                  </label>
                  <input 
                    type="number" 
                    value={formData.groupSlNo}
                    onChange={(e) => setFormData({ ...formData, groupSlNo: Number(e.target.value) })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                    Percentage (%)
                  </label>
                  <input 
                    type="number" 
                    step="0.01"
                    value={formData.percentage}
                    onChange={(e) => setFormData({ ...formData, percentage: Number(e.target.value) })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                  Max Rebate Limit (₹)
                </label>
                <input 
                  type="number" 
                  value={formData.maxRebateLimit}
                  onChange={(e) => setFormData({ ...formData, maxRebateLimit: Number(e.target.value) })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{ padding: '8px 18px', border: '1px solid #cbd5e1', borderRadius: '6px', backgroundColor: '#fff', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={submitting}
                  style={{ 
                    padding: '8px 22px', 
                    backgroundColor: '#159BD7', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '6px', 
                    fontWeight: '600',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Save size={16} /> {submitting ? 'Saving...' : 'Save Group'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
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
            maxWidth: '420px',
            padding: '24px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', color: '#1e293b' }}>Confirm Delete</h3>
            <p style={{ margin: '0 0 20px 0', fontSize: '14px', color: '#64748b', lineHeight: 1.5 }}>
              Are you sure you want to delete IT Head Group <strong>"{deleteConfirm.groupName}"</strong>?
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button 
                onClick={() => setDeleteConfirm(null)}
                style={{ padding: '8px 18px', border: '1px solid #cbd5e1', borderRadius: '6px', backgroundColor: '#fff', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                disabled={submitting}
                style={{ 
                  padding: '8px 20px', 
                  backgroundColor: '#ef4444', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '6px', 
                  fontWeight: '600',
                  cursor: submitting ? 'not-allowed' : 'pointer'
                }}
              >
                {submitting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
