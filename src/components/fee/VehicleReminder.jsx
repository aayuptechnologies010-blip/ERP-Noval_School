import React, { useState, useEffect } from 'react';
import { Save, Trash2, RotateCcw, Bell, AlertTriangle, CheckCircle } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const inputStyle = { width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' };
const labelStyle = { display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '6px', color: '#374151' };
const btnBase = { border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' };

export default function VehicleReminder() {
  const [reminders, setReminders] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({ vehicle: '', reminderType: 'Insurance', dueDate: '', remarks: '' });

  const token = localStorage.getItem('token');

  const fetchAll = async () => {
    try {
      const [rRes, vRes] = await Promise.all([
        fetch(`${API_URL}/api/transport/reminders`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API_URL}/api/transport/vehicles`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      if (rRes.ok) setReminders(await rRes.json());
      if (vRes.ok) setVehicles(await vRes.json());
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    if (!form.vehicle || !form.dueDate) {
      setMessage({ type: 'error', text: 'Vehicle and Due Date are required.' });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/transport/reminders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: data.message });
        setForm({ vehicle: '', reminderType: 'Insurance', dueDate: '', remarks: '' });
        fetchAll();
      } else { setMessage({ type: 'error', text: data.message }); }
    } catch (err) { setMessage({ type: 'error', text: 'Server error' }); }
    finally { setLoading(false); }
  };

  const handleMarkDone = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/transport/reminders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ isCompleted: true })
      });
      if (res.ok) { setMessage({ type: 'success', text: 'Marked as done!' }); fetchAll(); }
    } catch (err) { setMessage({ type: 'error', text: 'Error' }); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this reminder?')) return;
    try {
      const res = await fetch(`${API_URL}/api/transport/reminders/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) { fetchAll(); }
    } catch (err) { setMessage({ type: 'error', text: 'Error' }); }
  };

  const getDaysUntil = (dateStr) => {
    const diff = Math.ceil((new Date(dateStr) - new Date()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const getStatusStyle = (days, isCompleted) => {
    if (isCompleted) return { bg: '#d1fae5', text: '#065f46', label: 'Done' };
    if (days < 0) return { bg: '#fee2e2', text: '#991b1b', label: `${Math.abs(days)}d overdue` };
    if (days <= 7) return { bg: '#fef3c7', text: '#92400e', label: `${days}d left` };
    return { bg: '#e0f2fe', text: '#075985', label: `${days}d left` };
  };

  return (
    <div style={{ padding: '20px', background: '#f3f4f6', minHeight: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {message && <div style={{ padding: '10px', borderRadius: '4px', background: message.type === 'success' ? '#d1fae5' : '#fee2e2', color: message.type === 'success' ? '#065f46' : '#991b1b', fontSize: '13px' }}>{message.text}</div>}

      <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#1f2937', fontWeight: 'bold' }}>Set Vehicle Reminder</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Vehicle *</label>
            <select name="vehicle" value={form.vehicle} onChange={handleChange} style={inputStyle}>
              <option value="">-- Select --</option>
              {vehicles.map(v => <option key={v._id} value={v._id}>{v.vehicleNo}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Reminder Type</label>
            <select name="reminderType" value={form.reminderType} onChange={handleChange} style={inputStyle}>
              <option>Insurance</option>
              <option>PUC / Pollution</option>
              <option>Fitness Certificate</option>
              <option>Road Tax</option>
              <option>Registration Renewal</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Due Date *</label>
            <input name="dueDate" type="date" value={form.dueDate} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Remarks</label>
            <input name="remarks" value={form.remarks} onChange={handleChange} placeholder="Optional" style={inputStyle} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
          <button onClick={handleSave} disabled={loading} style={{ ...btnBase, background: '#10b981', color: '#fff' }}><Bell size={14} /> Set Reminder</button>
          <button onClick={() => setForm({ vehicle: '', reminderType: 'Insurance', dueDate: '', remarks: '' })} style={{ ...btnBase, background: '#f59e0b', color: '#fff' }}><RotateCcw size={14} /> Reset</button>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        <div style={{ padding: '15px 20px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '15px', color: '#1f2937', fontWeight: 'bold' }}>All Vehicle Reminders</h3>
          <span style={{ fontSize: '12px', color: '#6b7280' }}>{reminders.filter(r => !r.isCompleted).length} pending</span>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead style={{ background: '#f9fafb' }}>
            <tr>
              {['Vehicle', 'Reminder Type', 'Due Date', 'Status', 'Remarks', 'Actions'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: h === 'Actions' ? 'center' : 'left', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reminders.length === 0 ? (
              <tr><td colSpan="6" style={{ padding: '30px', textAlign: 'center', color: '#6b7280' }}>No reminders set.</td></tr>
            ) : reminders.map(r => {
              const days = getDaysUntil(r.dueDate);
              const st = getStatusStyle(days, r.isCompleted);
              return (
                <tr key={r._id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '12px 16px', color: '#1f2937', fontWeight: '600' }}>{r.vehicle?.vehicleNo}</td>
                  <td style={{ padding: '12px 16px', color: '#374151' }}>{r.reminderType}</td>
                  <td style={{ padding: '12px 16px', color: '#374151' }}>{new Date(r.dueDate).toLocaleDateString()}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold', background: st.bg, color: st.text }}>{st.label}</span>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#374151' }}>{r.remarks || '-'}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      {!r.isCompleted && (
                        <button onClick={() => handleMarkDone(r._id)} style={{ ...btnBase, background: '#10b981', color: '#fff', padding: '6px 12px', fontSize: '12px' }}><CheckCircle size={12} /> Done</button>
                      )}
                      <button onClick={() => handleDelete(r._id)} style={{ ...btnBase, background: '#ef4444', color: '#fff', padding: '6px 12px', fontSize: '12px' }}><Trash2 size={12} /> Delete</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
