import React, { useState, useEffect } from 'react';
import { Plus, Download, Edit, Trash2, Search, X, CheckCircle, AlertCircle, RefreshCw, Sparkles, Clock } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function InterviewSlot() {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Search & Pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    slotName: '',
    startTime: '10:00 AM',
    endTime: '11:30 AM',
    capacity: 5,
    modifyDetails: 'Created via Admin',
    status: 'Active'
  });

  // Delete Confirmation Modal
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Notifications
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

  const fetchSlots = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/recruitment/interview-slots`, { headers });
      if (res.ok) {
        const data = await res.json();
        setSlots(Array.isArray(data) ? data : []);
      } else {
        showNotification('error', 'Failed to fetch interview slots');
      }
    } catch (err) {
      console.error('Error fetching interview slots:', err);
      showNotification('error', 'Server error loading interview slots');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      slotName: '',
      startTime: '09:30 AM',
      endTime: '11:00 AM',
      capacity: 5,
      modifyDetails: 'Configured by Ayup Tech HR',
      status: 'Active'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      slotName: item.slotName || '',
      startTime: item.startTime || '10:00 AM',
      endTime: item.endTime || '11:30 AM',
      capacity: item.capacity || 5,
      modifyDetails: item.modifyDetails || '',
      status: item.status || 'Active'
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!formData.slotName.trim()) {
      showNotification('error', 'Slot Name is required');
      return;
    }

    try {
      setSubmitting(true);
      const slotTime = `${formData.startTime} - ${formData.endTime}`;
      const payload = { ...formData, slotTime };

      const url = editingId 
        ? `${API_BASE}/api/recruitment/interview-slots/${editingId}`
        : `${API_BASE}/api/recruitment/interview-slots`;
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        showNotification('success', editingId ? 'Interview slot updated!' : 'Interview slot created!');
        handleCloseModal();
        fetchSlots();
      } else {
        const err = await res.json();
        showNotification('error', err.message || 'Operation failed');
      }
    } catch (err) {
      console.error('Error saving slot:', err);
      showNotification('error', 'Server error while saving slot');
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      const res = await fetch(`${API_BASE}/api/recruitment/interview-slots/${deleteConfirmId}`, {
        method: 'DELETE',
        headers
      });
      if (res.ok) {
        showNotification('success', 'Interview slot deleted successfully!');
        setDeleteConfirmId(null);
        fetchSlots();
      } else {
        const err = await res.json();
        showNotification('error', err.message || 'Failed to delete');
      }
    } catch (err) {
      console.error('Error deleting slot:', err);
      showNotification('error', 'Server error deleting slot');
    }
  };

  const handleExportCSV = () => {
    if (slots.length === 0) {
      showNotification('error', 'No records to export');
      return;
    }
    const headersList = ['Sr No.', 'Slot Name', 'Slot Time', 'Capacity', 'Modify Details', 'Status'];
    const rows = filteredSlots.map((s, idx) => [
      idx + 1,
      `"${s.slotName || ''}"`,
      `"${s.slotTime || ''}"`,
      s.capacity || 5,
      `"${s.modifyDetails || ''}"`,
      `"${s.status || 'Active'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headersList.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Interview_Slots_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('success', 'Exported interview slots to CSV');
  };

  const filteredSlots = slots.filter(s => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      (s.slotName && s.slotName.toLowerCase().includes(term)) ||
      (s.slotTime && s.slotTime.toLowerCase().includes(term)) ||
      (s.modifyDetails && s.modifyDetails.toLowerCase().includes(term))
    );
  });

  const totalPages = Math.ceil(filteredSlots.length / pageSize) || 1;
  const paginatedSlots = filteredSlots.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="mail-template-container" style={{ padding: '24px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Toast Notification */}
      {statusMessage && (
        <div style={{
          position: 'fixed', top: '24px', right: '24px', zIndex: 9999,
          padding: '12px 20px', borderRadius: '8px',
          backgroundColor: statusMessage.type === 'success' ? '#10b981' : '#ef4444',
          color: '#ffffff', fontWeight: '500', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
          display: 'flex', alignItems: 'center', gap: '8px'
        }}>
          {statusMessage.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Recruitment</span>
            <span>/</span>
            <span style={{ color: '#159BD7', fontWeight: '600' }}>Interview Slot</span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Clock size={26} color="#159BD7" />
            Interview Slot
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={fetchSlots}
            style={{ padding: '8px 16px', backgroundColor: '#fff', color: '#475569', border: '1px solid #cbd5e1', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500', cursor: 'pointer' }}
          >
            <RefreshCw size={15} /> Refresh
          </button>
          <button
            onClick={handleOpenAdd}
            style={{ padding: '8px 18px', backgroundColor: '#159BD7', color: '#fff', border: 'none', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 2px 4px rgba(21, 155, 215, 0.2)' }}
          >
            <Plus size={18} /> Add New Interview Slot
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div style={{ backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
            <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search slot name or timing..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              style={{ width: '100%', padding: '7px 12px 7px 32px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={handleExportCSV}
              style={{ padding: '7px 14px', backgroundColor: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}
            >
              <Download size={15} /> Export
            </button>
            <select
              value={pageSize}
              onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
              style={{ padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#fff' }}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: '600' }}>
                <th style={{ padding: '12px 16px', width: '80px' }}>Sr No.</th>
                <th style={{ padding: '12px 16px' }}>Slot Name</th>
                <th style={{ padding: '12px 16px' }}>Slot Time</th>
                <th style={{ padding: '12px 16px', width: '110px' }}>Capacity</th>
                <th style={{ padding: '12px 16px' }}>Modify Details</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Status</th>
                <th style={{ padding: '12px 16px', width: '90px', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} style={{ padding: '36px', textAlign: 'center', color: '#64748b' }}>
                    <RefreshCw size={24} className="spin" style={{ margin: '0 auto 8px', display: 'block', animation: 'spin 1s linear infinite' }} />
                    Loading interview slots...
                  </td>
                </tr>
              ) : paginatedSlots.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                    <Clock size={36} style={{ margin: '0 auto 10px', color: '#cbd5e1' }} />
                    <div style={{ fontSize: '15px', fontWeight: '600', color: '#475569' }}>No Interview Slots Found</div>
                  </td>
                </tr>
              ) : (
                paginatedSlots.map((item, idx) => {
                  const isAyup = item.slotName && item.slotName.toLowerCase().includes('ayup');
                  return (
                    <tr 
                      key={item._id} 
                      style={{ 
                        borderBottom: '1px solid #f1f5f9', 
                        backgroundColor: isAyup ? '#f0fdf4' : (idx % 2 === 0 ? '#ffffff' : '#fcfcfd')
                      }}
                    >
                      <td style={{ padding: '12px 16px', fontWeight: '600', color: '#64748b' }}>
                        #{idx + 1}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: '600', color: '#0f172a' }}>{item.slotName}</span>
                          {isAyup && (
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '3px',
                              backgroundColor: '#dcfce7',
                              color: '#15803d',
                              fontSize: '11px',
                              fontWeight: '700',
                              padding: '2px 8px',
                              borderRadius: '12px',
                              border: '1px solid #bbf7d0'
                            }}>
                              <Sparkles size={11} /> AYUP TECH
                            </span>
                          )}
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px', color: '#159BD7', fontWeight: '600' }}>
                        {item.slotTime || `${item.startTime} - ${item.endTime}`}
                      </td>
                      <td style={{ padding: '12px 16px', color: '#334155' }}>
                        <span style={{ backgroundColor: '#f1f5f9', padding: '3px 8px', borderRadius: '4px', border: '1px solid #e2e8f0', fontSize: '12px' }}>
                          {item.capacity || 5} candidates
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', color: '#64748b', fontSize: '12px' }}>
                        {item.modifyDetails || '-'}
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <span style={{
                          padding: '3px 10px',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: '600',
                          backgroundColor: item.status === 'Active' ? '#dcfce7' : '#fee2e2',
                          color: item.status === 'Active' ? '#166534' : '#991b1b'
                        }}>
                          {item.status || 'Active'}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                          <button
                            onClick={() => handleOpenEdit(item)}
                            title="Edit"
                            style={{ padding: '5px', backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '4px', color: '#159BD7', cursor: 'pointer' }}
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(item._id)}
                            title="Delete"
                            style={{ padding: '5px', backgroundColor: '#fee2e2', border: '1px solid #fecaca', borderRadius: '4px', color: '#dc2626', cursor: 'pointer' }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div style={{ padding: '12px 20px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', color: '#64748b' }}>
          <div>Showing {filteredSlots.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to {Math.min(currentPage * pageSize, filteredSlots.length)} of {filteredSlots.length} entries</div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              style={{ padding: '5px 12px', borderRadius: '4px', border: '1px solid #cbd5e1', backgroundColor: currentPage <= 1 ? '#f1f5f9' : '#fff', cursor: currentPage <= 1 ? 'not-allowed' : 'pointer' }}
            >
              Previous
            </button>
            <span style={{ padding: '5px 10px', fontWeight: '600', color: '#0f172a' }}>{currentPage} / {totalPages}</span>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              style={{ padding: '5px 12px', borderRadius: '4px', border: '1px solid #cbd5e1', backgroundColor: currentPage >= totalPages ? '#f1f5f9' : '#fff', cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer' }}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Modal: Add / Edit */}
      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(2px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px'
        }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '12px', width: '100%', maxWidth: '520px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8fafc' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>
                {editingId ? 'Edit Interview Slot' : 'Add New Interview Slot'}
              </h3>
              <button onClick={handleCloseModal} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} style={{ padding: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
                    Slot Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ayup Tech Executive Morning Slot"
                    value={formData.slotName}
                    onChange={(e) => setFormData({ ...formData, slotName: e.target.value })}
                    required
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
                    Start Time *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 09:30 AM"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    required
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
                    End Time *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 11:00 AM"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    required
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
                    Slot Capacity (Candidates)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#fff' }}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
                    Modify Details
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Configured by Ayup Tech HR"
                    value={formData.modifyDetails}
                    onChange={(e) => setFormData({ ...formData, modifyDetails: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  style={{ padding: '7px 16px', border: '1px solid #cbd5e1', borderRadius: '6px', background: '#fff', cursor: 'pointer', fontSize: '13px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{ padding: '7px 20px', backgroundColor: '#159BD7', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}
                >
                  {submitting ? 'Saving...' : (editingId ? 'Update' : 'Save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Delete Confirmation */}
      {deleteConfirmId && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(2px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px'
        }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '12px', width: '100%', maxWidth: '380px', padding: '24px', textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Trash2 size={24} />
            </div>
            <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>Delete Interview Slot</h3>
            <p style={{ margin: '0 0 20px', fontSize: '13px', color: '#64748b' }}>Are you sure you want to delete this interview slot?</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
              <button onClick={() => setDeleteConfirmId(null)} style={{ padding: '7px 16px', border: '1px solid #cbd5e1', borderRadius: '6px', background: '#fff', cursor: 'pointer' }}>
                Cancel
              </button>
              <button onClick={confirmDelete} style={{ padding: '7px 18px', backgroundColor: '#dc2626', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
