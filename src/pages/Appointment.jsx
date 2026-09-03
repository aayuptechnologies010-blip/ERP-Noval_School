import React, { useState, useEffect } from 'react';
import { FaPlus, FaEye, FaEdit, FaTrash, FaTimes, FaCalendarAlt, FaUser, FaClock } from 'react-icons/fa';

const statusColors = {
  Confirmed: { bg: '#dcfce7', color: '#16a34a' },
  Pending: { bg: '#fef9c3', color: '#ca8a04' },
  Cancelled: { bg: '#fee2e2', color: '#ef4444' },
};

function Appointment() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [viewItem, setViewItem] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');

  // Form state
  const [form, setForm] = useState({ title: '', person: '', type: 'Parent', date: '', time: '', status: 'Pending', notes: '' });

  const handleFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/appointments`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setAppointments(Array.isArray(data) ? data : (data.appointments || []));
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditItem(null);
    setForm({ title: '', person: '', type: 'Parent', date: '', time: '', status: 'Pending', notes: '' });
    setShowModal(true);
  };

  const openEditModal = (appt) => {
    setEditItem(appt);
    setForm({ 
      title: appt.title || '', 
      person: appt.personName || appt.person || '', 
      type: appt.type || 'Parent', 
      date: appt.date || '', 
      time: appt.time || '', 
      status: appt.status || 'Pending', 
      notes: appt.notes || '' 
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.person || !form.date || !form.time) return alert('Please fill all required fields.');

    try {
      const token = localStorage.getItem('token');
      const method = editItem ? 'PUT' : 'POST';
      const url = editItem 
        ? `${import.meta.env.VITE_API_BASE_URL}/api/appointments/${editItem._id || editItem.id}` 
        : `${import.meta.env.VITE_API_BASE_URL}/api/appointments`;

      const payload = { ...form, personName: form.person };
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        fetchAppointments();
        setShowModal(false);
      } else {
        alert('Failed to save appointment.');
      }
    } catch (error) {
      console.error('Error saving appointment:', error);
      alert('An error occurred.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this appointment?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/appointments/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) fetchAppointments();
      } catch (error) {
        console.error('Error deleting appointment:', error);
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/appointments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        fetchAppointments();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const filtered = appointments.filter(a => filterStatus === 'All' || a.status === filterStatus);

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* Header */}
      <div style={{ padding: '24px 32px 16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Appointment Management</h1>
        <button onClick={openAddModal} style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
          <FaPlus size={12} /> Add Appointment
        </button>
      </div>

      {/* Filter Tabs */}
      <div style={{ padding: '0 32px 16px 32px', display: 'flex', gap: 8 }}>
        {['All', 'Confirmed', 'Pending', 'Cancelled'].map(tab => (
          <button key={tab} onClick={() => setFilterStatus(tab)} style={{
            padding: '7px 18px', borderRadius: 20, border: 'none', fontWeight: 600, fontSize: 13, cursor: 'pointer',
            background: filterStatus === tab ? '#3b82f6' : '#e2e8f0',
            color: filterStatus === tab ? '#fff' : '#475569',
            transition: 'all 0.2s'
          }}>{tab}</button>
        ))}
      </div>

      {/* Table */}
      <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'auto' }}>
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['Title', 'Person', 'Type', 'Date & Time', 'Status', 'Actions'].map(h => (
                  <th key={h} style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="6" style={{ textAlign: 'center', padding: '32px', color: '#64748b' }}>Loading appointments...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan="6" style={{ textAlign: 'center', padding: '32px', color: '#64748b' }}>No appointments found.</td></tr>
              ) : filtered.map(appt => (
                <tr key={appt._id || appt.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={tdStyle}>
                    <span style={{ fontWeight: 600, color: '#1e293b' }}>{appt.title}</span>
                    {appt.notes && <p style={{ margin: '4px 0 0', fontSize: 12, color: '#94a3b8' }}>{appt.notes.slice(0, 40)}...</p>}
                  </td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FaUser size={12} color="#4f46e5" />
                      </div>
                      {appt.personName || appt.person}
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <span style={{ background: '#f1f5f9', padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{appt.type}</span>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <FaCalendarAlt size={12} color="#94a3b8" /> {appt.date ? new Date(appt.date).toLocaleDateString() : ''}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                      <FaClock size={12} color="#94a3b8" /> {appt.time}
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <select
                      value={appt.status}
                      onChange={e => handleStatusChange(appt._id || appt.id, e.target.value)}
                      style={{
                        padding: '4px 8px', borderRadius: 20, fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer', outline: 'none',
                        background: statusColors[appt.status]?.bg || '#f1f5f9',
                        color: statusColors[appt.status]?.color || '#475569'
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
                      <button onClick={() => setViewItem(appt)} style={iconBtn} title="View"><FaEye size={14} color="#3b82f6" /></button>
                      <button onClick={() => openEditModal(appt)} style={iconBtn} title="Edit"><FaEdit size={14} color="#eab308" /></button>
                      <button onClick={() => handleDelete(appt._id || appt.id)} style={iconBtn} title="Delete"><FaTrash size={14} color="#ef4444" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan="6" style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>No appointments found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div style={overlay}>
          <div style={modal}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ margin: 0, fontSize: 18, color: '#1e293b' }}>{editItem ? 'Edit Appointment' : 'Add New Appointment'}</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><FaTimes size={16} color="#64748b" /></button>
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                  <label style={label}>Title *</label>
                  <input name="title" value={form.title} onChange={handleFormChange} placeholder="e.g. Parent Meeting" required style={input} />
                </div>
                <div>
                  <label style={label}>Person Name *</label>
                  <input name="person" value={form.person} onChange={handleFormChange} placeholder="Full Name" required style={input} />
                </div>
                <div>
                  <label style={label}>Type</label>
                  <select name="type" value={form.type} onChange={handleFormChange} style={input}>
                    <option>Parent</option>
                    <option>Staff</option>
                    <option>Medical</option>
                    <option>Vendor</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label style={label}>Status</label>
                  <select name="status" value={form.status} onChange={handleFormChange} style={input}>
                    <option>Pending</option>
                    <option>Confirmed</option>
                    <option>Cancelled</option>
                  </select>
                </div>
                <div>
                  <label style={label}>Date *</label>
                  <input type="date" name="date" value={form.date} onChange={handleFormChange} required style={input} />
                </div>
                <div>
                  <label style={label}>Time *</label>
                  <input type="time" name="time" value={form.time} onChange={handleFormChange} required style={input} />
                </div>
              </div>
              <div>
                <label style={label}>Notes</label>
                <textarea name="notes" value={form.notes} onChange={handleFormChange} rows={3} placeholder="Any additional notes..." style={{ ...input, resize: 'vertical' }} />
              </div>
              <button type="submit" style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: 12, borderRadius: 6, fontWeight: 600, cursor: 'pointer', marginTop: 8 }}>
                {editItem ? 'Update Appointment' : 'Create Appointment'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewItem && (
        <div style={overlay}>
          <div style={{ ...modal, width: 420 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ margin: 0, fontSize: 18, color: '#1e293b' }}>Appointment Details</h2>
              <button onClick={() => setViewItem(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><FaTimes size={16} color="#64748b" /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                ['Title', viewItem.title],
                ['Person', viewItem.person],
                ['Type', viewItem.type],
                ['Date', viewItem.date],
                ['Time', viewItem.time],
                ['Status', viewItem.status],
                ['Notes', viewItem.notes || 'N/A'],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', borderBottom: '1px solid #f1f5f9', paddingBottom: 12 }}>
                  <span style={{ width: 100, color: '#94a3b8', fontSize: 13, fontWeight: 600 }}>{k}</span>
                  <span style={{ flex: 1, color: '#1e293b', fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

const thStyle = { padding: '14px 16px', textAlign: 'left', fontSize: 13, fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', whiteSpace: 'nowrap' };
const tdStyle = { padding: '14px 16px', fontSize: 14, color: '#475569', verticalAlign: 'middle' };
const iconBtn = { background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center' };
const overlay = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 };
const modal = { background: '#fff', padding: 32, borderRadius: 10, width: 560, maxWidth: '95vw', boxShadow: '0 10px 25px rgba(0,0,0,0.15)', maxHeight: '90vh', overflowY: 'auto' };
const label = { display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600, color: '#475569' };
const input = { width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box', fontSize: 14 };

export default Appointment;
