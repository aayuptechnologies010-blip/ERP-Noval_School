import React, { useState, useEffect } from 'react';
import { Plus, Download, Edit, Trash2, X, Save, AlertCircle, CheckCircle } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function DefinePayScaleAmount() {
  const [data, setData] = useState([]);
  const [payScales, setPayScales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Modals
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ scale: '', amount: 0, isActive: true });
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
      const [amtRes, scaleRes] = await Promise.all([
        fetch(`${API_BASE}/api/pay-scale-amounts`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${API_BASE}/api/pay-scales`, { headers: { 'Authorization': `Bearer ${token}` } })
      ]);

      if (amtRes.ok) {
        const aData = await amtRes.json();
        setData(Array.isArray(aData) ? aData : []);
      }
      if (scaleRes.ok) {
        const sData = await scaleRes.json();
        setPayScales(Array.isArray(sData) ? sData : []);
      }
    } catch (err) {
      console.error('Error fetching pay scale amounts:', err);
      showNotification('error', 'Server error while fetching data');
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
      scale: payScales.length > 0 ? payScales[0].scale : '',
      amount: 0,
      isActive: true
    });
    setShowModal(true);
  };

  const handleOpenEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      scale: item.scale || '',
      amount: item.amount !== undefined ? item.amount : 0,
      isActive: item.isActive !== undefined ? item.isActive : true
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.scale) {
      alert('Please select a Pay Scale');
      return;
    }

    try {
      setSubmitting(true);
      const url = editingId 
        ? `${API_BASE}/api/pay-scale-amounts/${editingId}`
        : `${API_BASE}/api/pay-scale-amounts`;
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        showNotification('success', `Pay Scale Amount ${editingId ? 'updated' : 'created'} successfully!`);
        setShowModal(false);
        fetchData();
      } else {
        const err = await res.json();
        showNotification('error', err.message || 'Save failed');
      }
    } catch (err) {
      console.error('Error saving amount:', err);
      showNotification('error', 'Server error while saving');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    try {
      setSubmitting(true);
      const res = await fetch(`${API_BASE}/api/pay-scale-amounts/${deleteConfirm._id}`, {
        method: 'DELETE',
        headers
      });

      if (res.ok) {
        showNotification('success', 'Pay Scale Amount deleted successfully!');
        setDeleteConfirm(null);
        fetchData();
      } else {
        const err = await res.json();
        showNotification('error', err.message || 'Delete failed');
      }
    } catch (err) {
      console.error('Error deleting amount:', err);
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

    const headersLine = ['Sr No.', 'Pay Scale', 'Amount', 'Modified Date'];
    const rows = data.map((item, i) => [
      i + 1,
      `"${item.scale}"`,
      item.amount !== undefined ? item.amount.toFixed(2) : '0.00',
      `"${item.modifyDate || item.updatedAt ? new Date(item.modifyDate || item.updatedAt).toLocaleDateString('en-GB') : ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headersLine.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Pay_Scale_Amounts_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredData = data.filter(row => {
    const q = search.toLowerCase();
    return (
      (row.scale && row.scale.toLowerCase().includes(q)) ||
      String(row.amount).includes(q)
    );
  });

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const currentRows = filteredData.slice(startIndex, startIndex + pageSize);

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

      {/* Top Header */}
      <div className="mail-template-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search Scale or Amount..." 
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="search-input" 
            style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid #cbd5e1', width: '260px' }}
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
            <Plus size={16} /> Add New Pay Scale Amount
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
              <th style={{ width: '60px', textAlign: 'center', padding: '12px', fontSize: '13px', color: '#475569' }}>Sr No.</th>
              <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Pay Scale</th>
              <th style={{ textAlign: 'right', padding: '12px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Amount</th>
              <th style={{ textAlign: 'center', padding: '12px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Modified Date</th>
              <th style={{ width: '90px', textAlign: 'center', padding: '12px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                  Loading pay scale amounts...
                </td>
              </tr>
            ) : currentRows.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: '#94a3b8', backgroundColor: '#f8f9fa' }}>
                  No pay scale amounts found.
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
                  <td style={{ padding: '12px', fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>
                    {row.scale}
                  </td>
                  <td style={{ textAlign: 'right', padding: '12px', fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>
                    ₹{Number(row.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
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
            maxWidth: '480px',
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
                {editingId ? 'Edit Pay Scale Amount' : 'Add New Pay Scale Amount'}
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
                  Pay Scale <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <select 
                  className="settings-input"
                  value={formData.scale}
                  onChange={(e) => setFormData({ ...formData, scale: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                >
                  <option value="">-- Select Pay Scale --</option>
                  {payScales.map(s => (
                    <option key={s._id} value={s.scale}>{s.scale}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                  Amount (₹) <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input 
                  type="number" 
                  step="any"
                  required
                  placeholder="e.g. 5300.00"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
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
                  <Save size={16} /> {submitting ? 'Saving...' : 'Save Amount'}
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
            maxWidth: '400px',
            padding: '24px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', color: '#1e293b' }}>Confirm Delete</h3>
            <p style={{ margin: '0 0 20px 0', fontSize: '14px', color: '#64748b', lineHeight: 1.5 }}>
              Are you sure you want to delete Pay Scale Amount <strong>"₹{deleteConfirm.amount}"</strong> for scale "{deleteConfirm.scale}"?
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
