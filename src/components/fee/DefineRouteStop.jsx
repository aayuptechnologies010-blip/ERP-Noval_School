import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, RotateCcw, Plus } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const inputStyle = { width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' };
const labelStyle = { display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '6px', color: '#374151' };
const btnBase = { border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' };

export default function DefineRouteStop() {
  const [routes, setRoutes] = useState([]);
  const [stops, setStops] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ stopName: '', stopOrder: '', distanceFromStart: '', fee: '', route: '' });

  const token = localStorage.getItem('token');

  const fetchRoutes = async () => {
    try {
      const res = await fetch(`${API_URL}/api/transport/routes`, { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setRoutes(await res.json());
    } catch (err) { console.error(err); }
  };

  const fetchStops = async (routeId) => {
    if (!routeId) return;
    try {
      const res = await fetch(`${API_URL}/api/transport/stops/${routeId}`, { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setStops(await res.json());
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchRoutes(); }, []);
  useEffect(() => { fetchStops(selectedRoute); }, [selectedRoute]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    if (!form.stopName || !selectedRoute || !form.stopOrder) {
      setMessage({ type: 'error', text: 'Stop Name, Route, and Stop Order are required.' });
      return;
    }
    setLoading(true);
    try {
      const payload = { ...form, route: selectedRoute };
      const url = editingId ? `${API_URL}/api/transport/stops/${editingId}` : `${API_URL}/api/transport/stops`;
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: data.message });
        setForm({ stopName: '', stopOrder: '', distanceFromStart: '', fee: '', route: '' });
        setEditingId(null);
        fetchStops(selectedRoute);
      } else { setMessage({ type: 'error', text: data.message }); }
    } catch (err) { setMessage({ type: 'error', text: 'Server error' }); }
    finally { setLoading(false); }
  };

  const handleEdit = (s) => {
    setForm({ stopName: s.stopName, stopOrder: s.stopOrder, distanceFromStart: s.distanceFromStart, fee: s.fee, route: s.route?._id || '' });
    setEditingId(s._id);
    setMessage(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this stop?')) return;
    try {
      const res = await fetch(`${API_URL}/api/transport/stops/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) { setMessage({ type: 'success', text: 'Stop deleted' }); fetchStops(selectedRoute); }
    } catch (err) { setMessage({ type: 'error', text: 'Server error' }); }
  };

  const handleReset = () => { setForm({ stopName: '', stopOrder: '', distanceFromStart: '', fee: '', route: '' }); setEditingId(null); setMessage(null); };

  return (
    <div style={{ padding: '20px', background: '#f3f4f6', minHeight: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {message && <div style={{ padding: '10px', borderRadius: '4px', background: message.type === 'success' ? '#d1fae5' : '#fee2e2', color: message.type === 'success' ? '#065f46' : '#991b1b', fontSize: '13px' }}>{message.text}</div>}

      {/* Route Selector */}
      <div style={{ background: '#fff', padding: '16px 20px', borderRadius: '8px', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <label style={{ ...labelStyle, margin: 0, whiteSpace: 'nowrap' }}>Select Route:</label>
        <select value={selectedRoute} onChange={(e) => setSelectedRoute(e.target.value)} style={{ ...inputStyle, maxWidth: '300px' }}>
          <option value="">-- Choose a Route --</option>
          {routes.map(r => <option key={r._id} value={r._id}>{r.routeName}</option>)}
        </select>
      </div>

      {/* Add Stop Form */}
      <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#1f2937', fontWeight: 'bold' }}>{editingId ? 'Edit' : 'Add'} Route Stop</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Stop Name *</label>
            <input name="stopName" value={form.stopName} onChange={handleChange} placeholder="e.g. Market Chowk" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Stop Order *</label>
            <input name="stopOrder" type="number" value={form.stopOrder} onChange={handleChange} placeholder="1, 2, 3..." style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Distance (km)</label>
            <input name="distanceFromStart" type="number" value={form.distanceFromStart} onChange={handleChange} placeholder="0" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Fee (₹)</label>
            <input name="fee" type="number" value={form.fee} onChange={handleChange} placeholder="0" style={inputStyle} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
          <button onClick={handleSave} disabled={loading} style={{ ...btnBase, background: '#10b981', color: '#fff' }}>
            {editingId ? <Edit2 size={14} /> : <Plus size={14} />} {editingId ? 'Update' : 'Add'} Stop
          </button>
          <button onClick={handleReset} style={{ ...btnBase, background: '#f59e0b', color: '#fff' }}><RotateCcw size={14} /> Reset</button>
        </div>
      </div>

      {/* Stops Table */}
      <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        <div style={{ padding: '15px 20px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '15px', color: '#1f2937', fontWeight: 'bold' }}>
            Stops for: {routes.find(r => r._id === selectedRoute)?.routeName || 'No route selected'}
          </h3>
          <span style={{ fontSize: '12px', color: '#6b7280' }}>{stops.length} stops</span>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead style={{ background: '#f9fafb' }}>
            <tr>
              {['Order', 'Stop Name', 'Distance (km)', 'Fee (₹)', 'Actions'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: h === 'Actions' ? 'center' : 'left', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!selectedRoute ? (
              <tr><td colSpan="5" style={{ padding: '30px', textAlign: 'center', color: '#6b7280' }}>Please select a route to view its stops.</td></tr>
            ) : stops.length === 0 ? (
              <tr><td colSpan="5" style={{ padding: '30px', textAlign: 'center', color: '#6b7280' }}>No stops defined for this route yet.</td></tr>
            ) : stops.map(s => (
              <tr key={s._id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '12px 16px', color: '#6b7280', fontWeight: 'bold' }}>{s.stopOrder}</td>
                <td style={{ padding: '12px 16px', color: '#1f2937', fontWeight: '600' }}>{s.stopName}</td>
                <td style={{ padding: '12px 16px', color: '#374151' }}>{s.distanceFromStart} km</td>
                <td style={{ padding: '12px 16px', color: '#374151', fontWeight: 'bold' }}>₹{s.fee}</td>
                <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                    <button onClick={() => handleEdit(s)} style={{ ...btnBase, background: '#3b82f6', color: '#fff', padding: '6px 12px', fontSize: '12px' }}><Edit2 size={12} /> Edit</button>
                    <button onClick={() => handleDelete(s._id)} style={{ ...btnBase, background: '#ef4444', color: '#fff', padding: '6px 12px', fontSize: '12px' }}><Trash2 size={12} /> Delete</button>
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
