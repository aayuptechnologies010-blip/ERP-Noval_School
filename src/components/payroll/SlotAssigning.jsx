import React, { useState, useEffect } from 'react';
import { Eye, Plus, Download, Edit, Trash2, Search, X, CheckCircle, AlertCircle, RefreshCw, Sparkles, Calendar, Clock, UserCheck } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function SlotAssigning() {
  const [assignments, setAssignments] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [interviewTypes, setInterviewTypes] = useState([]);
  const [interviewSlots, setInterviewSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Top Filter
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // Search & Pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    applicationId: '',
    candidateName: '',
    jobTitle: '',
    interviewTypeId: '',
    interviewType: '',
    interviewSlotId: '',
    interviewSlot: '',
    interviewDate: new Date().toISOString().split('T')[0],
    interviewerName: 'Ayup Tech Technical Panel',
    venue: 'Conference Room A & Google Meet',
    remarks: ''
  });

  // Delete Confirmation
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

  // 1. Fetch Slot Assignments
  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filterStatus && filterStatus !== 'All') params.append('status', filterStatus);
      if (fromDate) params.append('fromDate', fromDate);
      if (toDate) params.append('toDate', toDate);

      const res = await fetch(`${API_BASE}/api/recruitment/slot-assignments?${params.toString()}`, { headers });
      if (res.ok) {
        const data = await res.json();
        setAssignments(Array.isArray(data) ? data : []);
      } else {
        showNotification('error', 'Failed to fetch slot assignments');
      }
    } catch (err) {
      console.error('Error fetching assignments:', err);
      showNotification('error', 'Server error loading assignments');
    } finally {
      setLoading(false);
    }
  };

  // 2. Fetch Supporting Data
  const fetchSupportingData = async () => {
    try {
      // Applications
      const appRes = await fetch(`${API_BASE}/api/recruitment/applications`, { headers });
      if (appRes.ok) {
        const appData = await appRes.json();
        setCandidates(Array.isArray(appData) ? appData : []);
      }
      // Interview Types
      const itRes = await fetch(`${API_BASE}/api/recruitment/interview-types`, { headers });
      if (itRes.ok) {
        const itData = await itRes.json();
        setInterviewTypes(Array.isArray(itData) ? itData : []);
      }
      // Interview Slots
      const isRes = await fetch(`${API_BASE}/api/recruitment/interview-slots`, { headers });
      if (isRes.ok) {
        const isData = await isRes.json();
        setInterviewSlots(Array.isArray(isData) ? isData : []);
      }
    } catch (err) {
      console.error('Error fetching supporting data:', err);
    }
  };

  useEffect(() => {
    fetchAssignments();
    fetchSupportingData();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    const firstCandidate = candidates[0];
    const firstType = interviewTypes[0];
    const firstSlot = interviewSlots[0];

    setFormData({
      applicationId: firstCandidate ? firstCandidate._id : '',
      candidateName: firstCandidate ? firstCandidate.candidateName : '',
      jobTitle: firstCandidate ? firstCandidate.jobTitle : '',
      interviewTypeId: firstType ? firstType._id : '',
      interviewType: firstType ? firstType.typeName : 'Technical Panel Interview',
      interviewSlotId: firstSlot ? firstSlot._id : '',
      interviewSlot: firstSlot ? firstSlot.slotTime : '09:30 AM - 11:00 AM',
      interviewDate: new Date().toISOString().split('T')[0],
      interviewerName: 'Ayup Tech Technical Advisory Panel',
      venue: 'Tech Boardroom A & Google Meet',
      remarks: ''
    });
    setIsModalOpen(true);
  };

  const handleCandidateChange = (candId) => {
    const cand = candidates.find(c => c._id === candId);
    if (cand) {
      setFormData({
        ...formData,
        applicationId: cand._id,
        candidateName: cand.candidateName,
        jobTitle: cand.jobTitle || ''
      });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.candidateName.trim()) {
      showNotification('error', 'Candidate Name is required');
      return;
    }

    try {
      setSubmitting(true);
      const url = editingId 
        ? `${API_BASE}/api/recruitment/slot-assignments/${editingId}`
        : `${API_BASE}/api/recruitment/slot-assignments`;
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        showNotification('success', editingId ? 'Interview slot updated!' : 'Interview slot assigned successfully!');
        handleCloseModal();
        fetchAssignments();
      } else {
        const err = await res.json();
        showNotification('error', err.message || 'Operation failed');
      }
    } catch (err) {
      console.error('Error saving slot assignment:', err);
      showNotification('error', 'Server error while assigning slot');
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      const res = await fetch(`${API_BASE}/api/recruitment/slot-assignments/${deleteConfirmId}`, {
        method: 'DELETE',
        headers
      });
      if (res.ok) {
        showNotification('success', 'Slot assignment removed successfully!');
        setDeleteConfirmId(null);
        fetchAssignments();
      } else {
        const err = await res.json();
        showNotification('error', err.message || 'Failed to delete');
      }
    } catch (err) {
      console.error('Error deleting assignment:', err);
      showNotification('error', 'Server error deleting assignment');
    }
  };

  const handleExportCSV = () => {
    if (assignments.length === 0) {
      showNotification('error', 'No assignments to export');
      return;
    }
    const headersList = ['Sr No.', 'Candidate Name', 'Job Title', 'Interview Type', 'Interview Slot', 'Interview Date', 'Interviewer', 'Venue', 'Status'];
    const rows = filteredAssignments.map((a, idx) => [
      idx + 1,
      `"${a.candidateName || ''}"`,
      `"${a.jobTitle || ''}"`,
      `"${a.interviewType || ''}"`,
      `"${a.interviewSlot || ''}"`,
      a.interviewDate ? new Date(a.interviewDate).toLocaleDateString() : '',
      `"${a.interviewerName || ''}"`,
      `"${a.venue || ''}"`,
      `"${a.status || 'Scheduled'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headersList.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Slot_Assignments_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('success', 'Exported slot assignments to CSV');
  };

  const filteredAssignments = assignments.filter(a => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      (a.candidateName && a.candidateName.toLowerCase().includes(term)) ||
      (a.jobTitle && a.jobTitle.toLowerCase().includes(term)) ||
      (a.interviewType && a.interviewType.toLowerCase().includes(term)) ||
      (a.interviewerName && a.interviewerName.toLowerCase().includes(term))
    );
  });

  const totalPages = Math.ceil(filteredAssignments.length / pageSize) || 1;
  const paginatedAssignments = filteredAssignments.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="global-settings-container" style={{ padding: '24px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
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
            <span style={{ color: '#159BD7', fontWeight: '600' }}>Slot Assigning</span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Calendar size={26} color="#159BD7" />
            Interview Slot Assigning & Schedule
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={fetchAssignments}
            style={{ padding: '8px 16px', backgroundColor: '#fff', color: '#475569', border: '1px solid #cbd5e1', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500', cursor: 'pointer' }}
          >
            <RefreshCw size={15} /> Refresh
          </button>
          <button
            onClick={handleOpenAdd}
            style={{ padding: '8px 18px', backgroundColor: '#159BD7', color: '#fff', border: 'none', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 2px 4px rgba(21, 155, 215, 0.2)' }}
          >
            <Plus size={18} /> Assign Slot To Candidate
          </button>
        </div>
      </div>

      {/* Top Date Filter Card (Preserves Original Structure) */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px 24px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'end', flexWrap: 'wrap' }}>
          <div className="form-group" style={{ flex: 1, minWidth: '180px' }}>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px', display: 'block' }}>
              From Date
            </label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
            />
          </div>

          <div className="form-group" style={{ flex: 1, minWidth: '180px' }}>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px', display: 'block' }}>
              To Date
            </label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
            />
          </div>

          <div className="form-group" style={{ flex: 1, minWidth: '160px' }}>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px', display: 'block' }}>
              Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#fff' }}
            >
              <option value="All">All Statuses</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={fetchAssignments}
              style={{
                backgroundColor: 'white',
                color: '#159BD7',
                border: '1px solid #159BD7',
                padding: '8px 24px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                fontWeight: '700',
                fontSize: '13px'
              }}
            >
              <Eye size={16} /> Show
            </button>
            <button
              onClick={() => { setFromDate(''); setToDate(''); setFilterStatus('All'); fetchAssignments(); }}
              style={{ backgroundColor: '#fff', color: '#64748b', border: '1px solid #cbd5e1', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
        
        {/* Table Toolbar */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
            <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search candidate, slot, panel..."
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

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: '600' }}>
                <th style={{ padding: '12px 16px', width: '60px' }}>#</th>
                <th style={{ padding: '12px 16px' }}>Candidate Name</th>
                <th style={{ padding: '12px 16px' }}>Job Requisition</th>
                <th style={{ padding: '12px 16px' }}>Interview Type</th>
                <th style={{ padding: '12px 16px' }}>Slot Time</th>
                <th style={{ padding: '12px 16px' }}>Interview Date</th>
                <th style={{ padding: '12px 16px' }}>Panel & Venue</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Status</th>
                <th style={{ padding: '12px 16px', width: '90px', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={9} style={{ padding: '36px', textAlign: 'center', color: '#64748b' }}>
                    <RefreshCw size={24} className="spin" style={{ margin: '0 auto 8px', display: 'block', animation: 'spin 1s linear infinite' }} />
                    Loading assigned interview slots...
                  </td>
                </tr>
              ) : paginatedAssignments.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                    <Calendar size={36} style={{ margin: '0 auto 10px', color: '#cbd5e1' }} />
                    <div style={{ fontSize: '15px', fontWeight: '600', color: '#475569' }}>No Interview Slots Assigned</div>
                    <div style={{ fontSize: '13px', marginTop: '4px' }}>Click "+ Assign Slot To Candidate" to schedule an interview.</div>
                  </td>
                </tr>
              ) : (
                paginatedAssignments.map((item, idx) => {
                  const isAyup = item.candidateName && item.candidateName.toLowerCase().includes('ayup');
                  return (
                    <tr 
                      key={item._id} 
                      style={{ 
                        borderBottom: '1px solid #f1f5f9', 
                        backgroundColor: isAyup ? '#f0fdf4' : (idx % 2 === 0 ? '#ffffff' : '#fcfcfd')
                      }}
                    >
                      <td style={{ padding: '12px 16px', fontWeight: '600', color: '#64748b' }}>
                        {(currentPage - 1) * pageSize + idx + 1}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: '700', color: '#0f172a' }}>{item.candidateName}</span>
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
                      <td style={{ padding: '12px 16px', color: '#334155', fontWeight: '500' }}>
                        {item.jobTitle || 'N/A'}
                      </td>
                      <td style={{ padding: '12px 16px', color: '#159BD7', fontWeight: '600' }}>
                        {item.interviewType}
                      </td>
                      <td style={{ padding: '12px 16px', color: '#0f172a', fontWeight: '600' }}>
                        <span style={{ backgroundColor: '#f1f5f9', padding: '3px 8px', borderRadius: '4px', border: '1px solid #e2e8f0', fontSize: '12px' }}>
                          {item.interviewSlot}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', color: '#334155' }}>
                        {item.interviewDate ? new Date(item.interviewDate).toLocaleDateString() : 'N/A'}
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: '12px', color: '#475569' }}>
                        <div style={{ fontWeight: '600', color: '#0f172a' }}>{item.interviewerName}</div>
                        <div>{item.venue}</div>
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <span style={{
                          padding: '3px 10px',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: '600',
                          backgroundColor: item.status === 'Completed' ? '#dcfce7' : (item.status === 'Scheduled' ? '#e0f2fe' : '#fee2e2'),
                          color: item.status === 'Completed' ? '#166534' : (item.status === 'Scheduled' ? '#0369a1' : '#991b1b')
                        }}>
                          {item.status || 'Scheduled'}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
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

        {/* Footer */}
        <div style={{ padding: '12px 20px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', color: '#64748b' }}>
          <div>Showing {filteredAssignments.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to {Math.min(currentPage * pageSize, filteredAssignments.length)} of {filteredAssignments.length} entries</div>
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

      {/* Modal: Assign New Slot */}
      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(2px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px'
        }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '12px', width: '100%', maxWidth: '560px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8fafc' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={20} color="#159BD7" />
                Assign Interview Slot To Candidate
              </h3>
              <button onClick={handleCloseModal} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                
                {/* Select Candidate */}
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
                    Select Candidate *
                  </label>
                  <select
                    value={formData.applicationId}
                    onChange={(e) => handleCandidateChange(e.target.value)}
                    required
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#fff' }}
                  >
                    <option value="">-- Choose Candidate --</option>
                    {candidates.map(c => (
                      <option key={c._id} value={c._id}>
                        {c.candidateName} - {c.jobTitle}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Interview Type */}
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
                    Interview Type *
                  </label>
                  <select
                    value={formData.interviewType}
                    onChange={(e) => setFormData({ ...formData, interviewType: e.target.value })}
                    required
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#fff' }}
                  >
                    {interviewTypes.map(t => (
                      <option key={t._id} value={t.typeName}>{t.typeName}</option>
                    ))}
                  </select>
                </div>

                {/* Interview Slot */}
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
                    Interview Slot *
                  </label>
                  <select
                    value={formData.interviewSlot}
                    onChange={(e) => setFormData({ ...formData, interviewSlot: e.target.value })}
                    required
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#fff' }}
                  >
                    {interviewSlots.map(s => (
                      <option key={s._id} value={s.slotTime}>{s.slotName} ({s.slotTime})</option>
                    ))}
                  </select>
                </div>

                {/* Interview Date */}
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
                    Interview Date *
                  </label>
                  <input
                    type="date"
                    value={formData.interviewDate}
                    onChange={(e) => setFormData({ ...formData, interviewDate: e.target.value })}
                    required
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>

                {/* Panel / Interviewer Name */}
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
                    Interviewer / Panel Name
                  </label>
                  <input
                    type="text"
                    value={formData.interviewerName}
                    onChange={(e) => setFormData({ ...formData, interviewerName: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>

                {/* Venue / Meeting Link */}
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
                    Venue / Meeting Room / Online Link
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Conference Room A & Google Meet link"
                    value={formData.venue}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
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
                  {submitting ? 'Assigning...' : 'Assign Slot'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
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
            <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>Delete Slot Assignment</h3>
            <p style={{ margin: '0 0 20px', fontSize: '13px', color: '#64748b' }}>Remove this scheduled interview slot?</p>
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
