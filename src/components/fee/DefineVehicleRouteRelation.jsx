import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, RotateCcw, Plus } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const inputStyle = { width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' };
const labelStyle = { display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '6px', color: '#374151' };
const btnBase = { border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' };

export default function DefineVehicleRouteRelation() {
  const [relations, setRelations] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ route: '', vehicle: '', driver: '', academicYear: new Date().getFullYear() + '-' + (new Date().getFullYear() + 1), status: 'Active' });

  const token = localStorage.getItem('token');

  const fetchAll = async () => {
    try {
      const [rRes, vRes, dRes, relRes] = await Promise.all([
        fetch(`${API_URL}/api/transport/routes`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API_URL}/api/transport/vehicles`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API_URL}/api/transport/drivers`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API_URL}/api/transport/route-relations`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      if (rRes.ok) setRoutes(await rRes.json());
      if (vRes.ok) setVehicles(await vRes.json());
      if (dRes.ok) setDrivers(await dRes.json());
      if (relRes.ok) setRelations(await relRes.json());
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    if (!form.route || !form.vehicle) {
      setMessage({ type: 'error', text: 'Route and Vehicle are required.' });
      return;
    }
    setLoading(true);
    try {
      const payload = { ...form };
      if (!payload.driver) delete payload.driver;
      const url = editingId ? `${API_URL}/api/transport/route-relations/${editingId}` : `${API_URL}/api/transport/route-relations`;
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: data.message });
        setForm({ route: '', vehicle: '', driver: '', academicYear: new Date().getFullYear() + '-' + (new Date().getFullYear() + 1), status: 'Active' });
        setEditingId(null);
        fetchAll();
      } else { setMessage({ type: 'error', text: data.message }); }
    } catch (err) { setMessage({ type: 'error', text: 'Server error' }); }
    finally { setLoading(false); }
  };

  const handleEdit = (rel) => {
    setForm({
      route: rel.route?._id || '',
      vehicle: rel.vehicle?._id || '',
      driver: rel.driver?._id || '',
      academicYear: rel.academicYear || '',
      status: rel.status
    });
    setEditingId(rel._id);
    setMessage(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this route-vehicle relation?')) return;
    try {
      const res = await fetch(`${API_URL}/api/transport/route-relations/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) { setMessage({ type: 'success', text: 'Relation removed' }); fetchAll(); }
    } catch (err) { setMessage({ type: 'error', text: 'Server error' }); }
  };

  const handleReset = () => {
    setForm({ route: '', vehicle: '', driver: '', academicYear: new Date().getFullYear() + '-' + (new Date().getFullYear() + 1), status: 'Active' });
    setEditingId(null);
    setMessage(null);
  };

  return (
    <div style={{ padding: '20px', background: '#f3f4f6', minHeight: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {message && <div style={{ padding: '10px', borderRadius: '4px', background: message.type === 'success' ? '#d1fae5' : '#fee2e2', color: message.type === 'success' ? '#065f46' : '#991b1b', fontSize: '13px' }}>{message.text}</div>}

      <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#1f2937', fontWeight: 'bold' }}>
          {editingId ? 'Edit' : 'Define'} Vehicle Route Relation
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Route *</label>
            <select name="route" value={form.route} onChange={handleChange} style={inputStyle}>
              <option value="">-- Select Route --</option>
              {routes.map(r => <option key={r._id} value={r._id}>{r.routeName}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Vehicle *</label>
            <select name="vehicle" value={form.vehicle} onChange={handleChange} style={inputStyle}>
              <option value="">-- Select Vehicle --</option>
              {vehicles.map(v => <option key={v._id} value={v._id}>{v.vehicleNo}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Driver</label>
            <select name="driver" value={form.driver} onChange={handleChange} style={inputStyle}>
              <option value="">-- Not Assigned --</option>
              {drivers.map(d => <option key={d._id} value={d._id}>{d.driverName}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Academic Year</label>
            <input name="academicYear" value={form.academicYear} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Status</label>
            <select name="status" value={form.status} onChange={handleChange} style={inputStyle}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
          <button onClick={handleSave} disabled={loading} style={{ ...btnBase, background: '#10b981', color: '#fff' }}>
            {editingId ? <Edit2 size={14} /> : <Plus size={14} />} {editingId ? 'Update' : 'Assign'} Relation
          </button>
          <button onClick={handleReset} style={{ ...btnBase, background: '#f59e0b', color: '#fff' }}><RotateCcw size={14} /> Reset</button>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        <div style={{ padding: '15px 20px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '15px', color: '#1f2937', fontWeight: 'bold' }}>Route ↔ Vehicle Assignments</h3>
          <span style={{ fontSize: '12px', color: '#6b7280' }}>{relations.length} records</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', minWidth: '700px' }}>
            <thead style={{ background: '#f9fafb' }}>
              <tr>
                {['#', 'Route', 'Vehicle No.', 'Driver', 'Academic Year', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: h === 'Actions' ? 'center' : 'left', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {relations.length === 0 ? (
                <tr><td colSpan="7" style={{ padding: '30px', textAlign: 'center', color: '#6b7280' }}>No relations defined yet.</td></tr>
              ) : relations.map((rel, i) => (
                <tr key={rel._id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '12px 16px', color: '#6b7280' }}>{i + 1}</td>
                  <td style={{ padding: '12px 16px', color: '#1f2937', fontWeight: '600' }}>{rel.route?.routeName || '-'}</td>
                  <td style={{ padding: '12px 16px', color: '#374151' }}>{rel.vehicle?.vehicleNo || '-'}</td>
                  <td style={{ padding: '12px 16px', color: '#374151' }}>{rel.driver?.driverName || '-'}</td>
                  <td style={{ padding: '12px 16px', color: '#374151' }}>{rel.academicYear}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ padding: '3px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold', background: rel.status === 'Active' ? '#d1fae5' : '#fee2e2', color: rel.status === 'Active' ? '#065f46' : '#991b1b' }}>{rel.status}</span>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button onClick={() => handleEdit(rel)} style={{ ...btnBase, background: '#3b82f6', color: '#fff', padding: '6px 12px', fontSize: '12px' }}><Edit2 size={12} /> Edit</button>
                      <button onClick={() => handleDelete(rel._id)} style={{ ...btnBase, background: '#ef4444', color: '#fff', padding: '6px 12px', fontSize: '12px' }}><Trash2 size={12} /> Remove</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
