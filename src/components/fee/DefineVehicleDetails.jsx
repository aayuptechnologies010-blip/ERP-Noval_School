import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, RotateCcw, Plus } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const inputStyle = { width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' };
const labelStyle = { display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '6px', color: '#374151' };
const btnBase = { border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' };

export default function DefineVehicleDetails() {
  const [vehicles, setVehicles] = useState([]);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({ vehicleNo: '', vehicleType: '', travelAgency: '', capacity: '', status: 'Active', remarks: '' });

  const token = localStorage.getItem('token');

  const fetchAll = async () => {
    try {
      const [vRes, tRes, aRes] = await Promise.all([
        fetch(`${API_URL}/api/transport/vehicles`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API_URL}/api/transport/vehicle-types`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API_URL}/api/transport/agencies`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      if (vRes.ok) setVehicles(await vRes.json());
      if (tRes.ok) setVehicleTypes(await tRes.json());
      if (aRes.ok) setAgencies(await aRes.json());
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    if (!form.vehicleNo || !form.vehicleType || !form.capacity) {
      setMessage({ type: 'error', text: 'Vehicle No, Type and Capacity are required.' });
      return;
    }
    setLoading(true);
    try {
      const url = editingId ? `${API_URL}/api/transport/vehicles/${editingId}` : `${API_URL}/api/transport/vehicles`;
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: data.message });
        setForm({ vehicleNo: '', vehicleType: '', travelAgency: '', capacity: '', status: 'Active', remarks: '' });
        setEditingId(null);
        fetchAll();
      } else { setMessage({ type: 'error', text: data.message }); }
    } catch (err) { setMessage({ type: 'error', text: 'Server error' }); }
    finally { setLoading(false); }
  };

  const handleEdit = (item) => {
    setForm({
      vehicleNo: item.vehicleNo,
      vehicleType: item.vehicleType?._id || item.vehicleType,
      travelAgency: item.travelAgency?._id || item.travelAgency || '',
      capacity: item.capacity,
      status: item.status,
      remarks: item.remarks || ''
    });
    setEditingId(item._id);
    setMessage(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this vehicle?')) return;
    try {
      const res = await fetch(`${API_URL}/api/transport/vehicles/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) { setMessage({ type: 'success', text: 'Vehicle deleted' }); fetchAll(); }
    } catch (err) { setMessage({ type: 'error', text: 'Server error' }); }
  };

  const handleReset = () => {
    setForm({ vehicleNo: '', vehicleType: '', travelAgency: '', capacity: '', status: 'Active', remarks: '' });
    setEditingId(null);
    setMessage(null);
  };

  const statusColor = (s) => s === 'Active' ? '#d1fae5' : s === 'Maintenance' ? '#fef3c7' : '#fee2e2';
  const statusTextColor = (s) => s === 'Active' ? '#065f46' : s === 'Maintenance' ? '#92400e' : '#991b1b';

  return (
    <div style={{ padding: '20px', background: '#f3f4f6', minHeight: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {message && (
        <div style={{ padding: '10px', borderRadius: '4px', background: message.type === 'success' ? '#d1fae5' : '#fee2e2', color: message.type === 'success' ? '#065f46' : '#991b1b', fontSize: '13px' }}>
          {message.text}
        </div>
      )}

      {/* Form */}
      <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#1f2937', fontWeight: 'bold' }}>
          {editingId ? 'Edit Vehicle' : 'Add Vehicle Details'}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Vehicle No. / Plate No. *</label>
            <input name="vehicleNo" value={form.vehicleNo} onChange={handleChange} placeholder="e.g. DL01AB1234" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Vehicle Type *</label>
            <select name="vehicleType" value={form.vehicleType} onChange={handleChange} style={inputStyle}>
              <option value="">-- Select Type --</option>
              {vehicleTypes.map(t => <option key={t._id} value={t._id}>{t.typeName}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Travel Agency</label>
            <select name="travelAgency" value={form.travelAgency} onChange={handleChange} style={inputStyle}>
              <option value="">-- None --</option>
              {agencies.map(a => <option key={a._id} value={a._id}>{a.agencyName}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Seating Capacity *</label>
            <input name="capacity" type="number" value={form.capacity} onChange={handleChange} placeholder="e.g. 40" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Status</label>
            <select name="status" value={form.status} onChange={handleChange} style={inputStyle}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Maintenance">Under Maintenance</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Remarks</label>
            <input name="remarks" value={form.remarks} onChange={handleChange} placeholder="Optional" style={inputStyle} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
          <button onClick={handleSave} disabled={loading} style={{ ...btnBase, background: '#10b981', color: '#fff' }}>
            {editingId ? <Edit2 size={14} /> : <Plus size={14} />} {editingId ? 'Update' : 'Save'} Vehicle
          </button>
          <button onClick={handleReset} style={{ ...btnBase, background: '#f59e0b', color: '#fff' }}><RotateCcw size={14} /> Reset</button>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        <div style={{ padding: '15px 20px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '15px', color: '#1f2937', fontWeight: 'bold' }}>All Vehicles</h3>
          <span style={{ fontSize: '12px', color: '#6b7280' }}>{vehicles.length} records</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', minWidth: '800px' }}>
            <thead style={{ background: '#f9fafb' }}>
              <tr>
                {['#', 'Vehicle No.', 'Type', 'Agency', 'Capacity', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: h === 'Actions' ? 'center' : 'left', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {vehicles.length === 0 ? (
                <tr><td colSpan="7" style={{ padding: '30px', textAlign: 'center', color: '#6b7280' }}>No vehicles found. Add one above.</td></tr>
              ) : (
                vehicles.map((v, i) => (
                  <tr key={v._id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '12px 16px', color: '#6b7280' }}>{i + 1}</td>
                    <td style={{ padding: '12px 16px', color: '#1f2937', fontWeight: '600' }}>{v.vehicleNo}</td>
                    <td style={{ padding: '12px 16px', color: '#374151' }}>{v.vehicleType?.typeName || '-'}</td>
                    <td style={{ padding: '12px 16px', color: '#374151' }}>{v.travelAgency?.agencyName || '-'}</td>
                    <td style={{ padding: '12px 16px', color: '#374151' }}>{v.capacity}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ padding: '3px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold', background: statusColor(v.status), color: statusTextColor(v.status) }}>
                        {v.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <button onClick={() => handleEdit(v)} style={{ ...btnBase, background: '#3b82f6', color: '#fff', padding: '6px 12px', fontSize: '12px' }}><Edit2 size={12} /> Edit</button>
                        <button onClick={() => handleDelete(v._id)} style={{ ...btnBase, background: '#ef4444', color: '#fff', padding: '6px 12px', fontSize: '12px' }}><Trash2 size={12} /> Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
