import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, RotateCcw, Plus } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const inputStyle = { width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' };
const labelStyle = { display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '6px', color: '#374151' };
const btnBase = { border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' };

export default function DefineTransportMedium() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ mediumName: '', remarks: '' });

  const token = localStorage.getItem('token');

  const fetchItems = async () => {
    try {
      const res = await fetch(`${API_URL}/api/transport/mediums`, { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setItems(await res.json());
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    if (!form.mediumName) { setMessage({ type: 'error', text: 'Medium Name is required.' }); return; }
    setLoading(true);
    try {
      const url = editingId ? `${API_URL}/api/transport/mediums/${editingId}` : `${API_URL}/api/transport/mediums`;
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: data.message });
        setForm({ mediumName: '', remarks: '' });
        setEditingId(null);
        fetchItems();
      } else { setMessage({ type: 'error', text: data.message }); }
    } catch (err) { setMessage({ type: 'error', text: 'Server error' }); }
    finally { setLoading(false); }
  };

  const handleEdit = (item) => { setForm({ mediumName: item.mediumName, remarks: item.remarks || '' }); setEditingId(item._id); setMessage(null); };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this medium?')) return;
    try {
      const res = await fetch(`${API_URL}/api/transport/mediums/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) { setMessage({ type: 'success', text: 'Medium deleted' }); fetchItems(); }
    } catch (err) { setMessage({ type: 'error', text: 'Server error' }); }
  };

  const handleReset = () => { setForm({ mediumName: '', remarks: '' }); setEditingId(null); setMessage(null); };

  return (
    <div style={{ padding: '20px', background: '#f3f4f6', minHeight: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {message && (
        <div style={{ padding: '10px', borderRadius: '4px', background: message.type === 'success' ? '#d1fae5' : '#fee2e2', color: message.type === 'success' ? '#065f46' : '#991b1b', fontSize: '13px' }}>
          {message.text}
        </div>
      )}
      <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb', maxWidth: '500px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#1f2937', fontWeight: 'bold' }}>
          {editingId ? 'Edit' : 'Add'} Transport Medium
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={labelStyle}>Medium Name *</label>
            <input name="mediumName" value={form.mediumName} onChange={handleChange} placeholder="e.g. Bus, Van, Auto" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Remarks</label>
            <input name="remarks" value={form.remarks} onChange={handleChange} placeholder="Optional" style={inputStyle} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
          <button onClick={handleSave} disabled={loading} style={{ ...btnBase, background: '#10b981', color: '#fff' }}>
            {editingId ? <Edit2 size={14} /> : <Plus size={14} />} {editingId ? 'Update' : 'Save'}
          </button>
          <button onClick={handleReset} style={{ ...btnBase, background: '#f59e0b', color: '#fff' }}><RotateCcw size={14} /> Reset</button>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        <div style={{ padding: '15px 20px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '15px', color: '#1f2937', fontWeight: 'bold' }}>All Transport Mediums</h3>
          <span style={{ fontSize: '12px', color: '#6b7280' }}>{items.length} records</span>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead style={{ background: '#f9fafb' }}>
            <tr>
              <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>#</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>Medium Name</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>Remarks</th>
              <th style={{ padding: '12px 16px', textAlign: 'center', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr><td colSpan="4" style={{ padding: '30px', textAlign: 'center', color: '#6b7280' }}>No mediums found.</td></tr>
            ) : (
              items.map((item, i) => (
                <tr key={item._id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '12px 16px', color: '#6b7280' }}>{i + 1}</td>
                  <td style={{ padding: '12px 16px', color: '#1f2937', fontWeight: '600' }}>{item.mediumName}</td>
                  <td style={{ padding: '12px 16px', color: '#374151' }}>{item.remarks || '-'}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button onClick={() => handleEdit(item)} style={{ ...btnBase, background: '#3b82f6', color: '#fff', padding: '6px 12px', fontSize: '12px' }}><Edit2 size={12} /> Edit</button>
                      <button onClick={() => handleDelete(item._id)} style={{ ...btnBase, background: '#ef4444', color: '#fff', padding: '6px 12px', fontSize: '12px' }}><Trash2 size={12} /> Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
