import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, RotateCcw, Plus } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const inputStyle = { width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' };
const labelStyle = { display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '6px', color: '#374151' };
const btnBase = { border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' };

export default function DefineVehicleRoute() {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ routeName: '', startPoint: '', endPoint: '', remarks: '' });

  const token = localStorage.getItem('token');

  const fetchRoutes = async () => {
    try {
      const res = await fetch(`${API_URL}/api/transport/routes`, { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setRoutes(await res.json());
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchRoutes(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    if (!form.routeName || !form.startPoint || !form.endPoint) {
      setMessage({ type: 'error', text: 'Route Name, Start Point and End Point are required.' });
      return;
    }
    setLoading(true);
    try {
      const url = editingId ? `${API_URL}/api/transport/routes/${editingId}` : `${API_URL}/api/transport/routes`;
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: data.message });
        setForm({ routeName: '', startPoint: '', endPoint: '', remarks: '' });
        setEditingId(null);
        fetchRoutes();
      } else { setMessage({ type: 'error', text: data.message }); }
    } catch (err) { setMessage({ type: 'error', text: 'Server error' }); }
    finally { setLoading(false); }
  };

  const handleEdit = (r) => { setForm({ routeName: r.routeName, startPoint: r.startPoint, endPoint: r.endPoint, remarks: r.remarks || '' }); setEditingId(r._id); setMessage(null); };
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this route?')) return;
    try {
      const res = await fetch(`${API_URL}/api/transport/routes/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) { setMessage({ type: 'success', text: 'Route deleted' }); fetchRoutes(); }
    } catch (err) { setMessage({ type: 'error', text: 'Server error' }); }
  };
  const handleReset = () => { setForm({ routeName: '', startPoint: '', endPoint: '', remarks: '' }); setEditingId(null); setMessage(null); };

  return (
    <div style={{ padding: '20px', background: '#f3f4f6', minHeight: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {message && <div style={{ padding: '10px', borderRadius: '4px', background: message.type === 'success' ? '#d1fae5' : '#fee2e2', color: message.type === 'success' ? '#065f46' : '#991b1b', fontSize: '13px' }}>{message.text}</div>}

      <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#1f2937', fontWeight: 'bold' }}>{editingId ? 'Edit' : 'Add'} Vehicle Route</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Route Name *</label>
            <input name="routeName" value={form.routeName} onChange={handleChange} placeholder="e.g. Route A - North Side" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Start Point *</label>
            <input name="startPoint" value={form.startPoint} onChange={handleChange} placeholder="e.g. School Gate" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>End Point *</label>
            <input name="endPoint" value={form.endPoint} onChange={handleChange} placeholder="e.g. City Center" style={inputStyle} />
          </div>
          <div style={{ gridColumn: '1/-1' }}>
            <label style={labelStyle}>Remarks</label>
            <input name="remarks" value={form.remarks} onChange={handleChange} placeholder="Optional" style={inputStyle} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
          <button onClick={handleSave} disabled={loading} style={{ ...btnBase, background: '#10b981', color: '#fff' }}>
            {editingId ? <Edit2 size={14} /> : <Plus size={14} />} {editingId ? 'Update' : 'Save'} Route
          </button>
          <button onClick={handleReset} style={{ ...btnBase, background: '#f59e0b', color: '#fff' }}><RotateCcw size={14} /> Reset</button>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        <div style={{ padding: '15px 20px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '15px', color: '#1f2937', fontWeight: 'bold' }}>All Routes</h3>
          <span style={{ fontSize: '12px', color: '#6b7280' }}>{routes.length} records</span>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead style={{ background: '#f9fafb' }}>
            <tr>
              {['#', 'Route Name', 'Start Point', 'End Point', 'Remarks', 'Actions'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: h === 'Actions' ? 'center' : 'left', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {routes.length === 0 ? (
              <tr><td colSpan="6" style={{ padding: '30px', textAlign: 'center', color: '#6b7280' }}>No routes found.</td></tr>
            ) : routes.map((r, i) => (
              <tr key={r._id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '12px 16px', color: '#6b7280' }}>{i + 1}</td>
                <td style={{ padding: '12px 16px', color: '#1f2937', fontWeight: '600' }}>{r.routeName}</td>
                <td style={{ padding: '12px 16px', color: '#374151' }}>{r.startPoint}</td>
                <td style={{ padding: '12px 16px', color: '#374151' }}>{r.endPoint}</td>
                <td style={{ padding: '12px 16px', color: '#374151' }}>{r.remarks || '-'}</td>
                <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                    <button onClick={() => handleEdit(r)} style={{ ...btnBase, background: '#3b82f6', color: '#fff', padding: '6px 12px', fontSize: '12px' }}><Edit2 size={12} /> Edit</button>
                    <button onClick={() => handleDelete(r._id)} style={{ ...btnBase, background: '#ef4444', color: '#fff', padding: '6px 12px', fontSize: '12px' }}><Trash2 size={12} /> Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
