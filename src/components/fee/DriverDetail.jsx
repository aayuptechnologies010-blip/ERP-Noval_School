import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, RotateCcw, Plus } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const inputStyle = { width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' };
const labelStyle = { display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '6px', color: '#374151' };
const btnBase = { border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' };

export default function DriverDetail() {
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    driverName: '', contactNumber: '', licenseNumber: '', licenseExpiry: '', address: '', vehicleAssigned: '', status: 'Active', remarks: ''
  });

  const token = localStorage.getItem('token');

  const fetchAll = async () => {
    try {
      const [dRes, vRes] = await Promise.all([
        fetch(`${API_URL}/api/transport/drivers`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API_URL}/api/transport/vehicles`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      if (dRes.ok) setDrivers(await dRes.json());
      if (vRes.ok) setVehicles(await vRes.json());
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    if (!form.driverName || !form.contactNumber) {
      setMessage({ type: 'error', text: 'Driver Name and Contact No. are required.' });
      return;
    }
    setLoading(true);
    try {
      const payload = { ...form };
      if (!payload.vehicleAssigned) delete payload.vehicleAssigned;
      const url = editingId ? `${API_URL}/api/transport/drivers/${editingId}` : `${API_URL}/api/transport/drivers`;
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: data.message });
        setForm({ driverName: '', contactNumber: '', licenseNumber: '', licenseExpiry: '', address: '', vehicleAssigned: '', status: 'Active', remarks: '' });
        setEditingId(null);
        fetchAll();
      } else { setMessage({ type: 'error', text: data.message }); }
    } catch (err) { setMessage({ type: 'error', text: 'Server error' }); }
    finally { setLoading(false); }
  };

  const handleEdit = (item) => {
    setForm({
      driverName: item.driverName,
      contactNumber: item.contactNumber,
      licenseNumber: item.licenseNumber || '',
      licenseExpiry: item.licenseExpiry ? item.licenseExpiry.split('T')[0] : '',
      address: item.address || '',
      vehicleAssigned: item.vehicleAssigned?._id || item.vehicleAssigned || '',
      status: item.status,
      remarks: item.remarks || ''
    });
    setEditingId(item._id);
    setMessage(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this driver?')) return;
    try {
      const res = await fetch(`${API_URL}/api/transport/drivers/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) { setMessage({ type: 'success', text: 'Driver deleted' }); fetchAll(); }
    } catch (err) { setMessage({ type: 'error', text: 'Server error' }); }
  };

  const handleReset = () => {
    setForm({ driverName: '', contactNumber: '', licenseNumber: '', licenseExpiry: '', address: '', vehicleAssigned: '', status: 'Active', remarks: '' });
    setEditingId(null);
    setMessage(null);
  };

  return (
    <div style={{ padding: '20px', background: '#f3f4f6', minHeight: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {message && (
        <div style={{ padding: '10px', borderRadius: '4px', background: message.type === 'success' ? '#d1fae5' : '#fee2e2', color: message.type === 'success' ? '#065f46' : '#991b1b', fontSize: '13px' }}>
          {message.text}
        </div>
      )}

      <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#1f2937', fontWeight: 'bold' }}>
          {editingId ? 'Edit Driver' : 'Add Driver Detail'}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Driver Name *</label>
            <input name="driverName" value={form.driverName} onChange={handleChange} placeholder="Full Name" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Contact Number *</label>
            <input name="contactNumber" value={form.contactNumber} onChange={handleChange} placeholder="Mobile No." style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>License Number</label>
            <input name="licenseNumber" value={form.licenseNumber} onChange={handleChange} placeholder="DL No." style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>License Expiry Date</label>
            <input name="licenseExpiry" type="date" value={form.licenseExpiry} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Assign Vehicle</label>
            <select name="vehicleAssigned" value={form.vehicleAssigned} onChange={handleChange} style={inputStyle}>
              <option value="">-- Not Assigned --</option>
              {vehicles.map(v => <option key={v._id} value={v._id}>{v.vehicleNo}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Status</label>
            <select name="status" value={form.status} onChange={handleChange} style={inputStyle}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>Address</label>
            <input name="address" value={form.address} onChange={handleChange} placeholder="Home Address" style={inputStyle} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
          <button onClick={handleSave} disabled={loading} style={{ ...btnBase, background: '#10b981', color: '#fff' }}>
            {editingId ? <Edit2 size={14} /> : <Plus size={14} />} {editingId ? 'Update' : 'Save'} Driver
          </button>
          <button onClick={handleReset} style={{ ...btnBase, background: '#f59e0b', color: '#fff' }}><RotateCcw size={14} /> Reset</button>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        <div style={{ padding: '15px 20px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '15px', color: '#1f2937', fontWeight: 'bold' }}>All Drivers</h3>
          <span style={{ fontSize: '12px', color: '#6b7280' }}>{drivers.length} records</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', minWidth: '900px' }}>
            <thead style={{ background: '#f9fafb' }}>
              <tr>
                {['#', 'Driver Name', 'Contact No.', 'License No.', 'License Expiry', 'Vehicle', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: h === 'Actions' ? 'center' : 'left', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {drivers.length === 0 ? (
                <tr><td colSpan="8" style={{ padding: '30px', textAlign: 'center', color: '#6b7280' }}>No drivers found. Add one above.</td></tr>
              ) : (
                drivers.map((d, i) => (
                  <tr key={d._id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '12px 16px', color: '#6b7280' }}>{i + 1}</td>
                    <td style={{ padding: '12px 16px', color: '#1f2937', fontWeight: '600' }}>{d.driverName}</td>
                    <td style={{ padding: '12px 16px', color: '#374151' }}>{d.contactNumber}</td>
                    <td style={{ padding: '12px 16px', color: '#374151' }}>{d.licenseNumber || '-'}</td>
                    <td style={{ padding: '12px 16px', color: d.licenseExpiry && new Date(d.licenseExpiry) < new Date() ? '#ef4444' : '#374151' }}>
                      {d.licenseExpiry ? new Date(d.licenseExpiry).toLocaleDateString() : '-'}
                    </td>
                    <td style={{ padding: '12px 16px', color: '#374151' }}>{d.vehicleAssigned?.vehicleNo || '-'}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ padding: '3px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold', background: d.status === 'Active' ? '#d1fae5' : '#fee2e2', color: d.status === 'Active' ? '#065f46' : '#991b1b' }}>
                        {d.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <button onClick={() => handleEdit(d)} style={{ ...btnBase, background: '#3b82f6', color: '#fff', padding: '6px 12px', fontSize: '12px' }}><Edit2 size={12} /> Edit</button>
                        <button onClick={() => handleDelete(d._id)} style={{ ...btnBase, background: '#ef4444', color: '#fff', padding: '6px 12px', fontSize: '12px' }}><Trash2 size={12} /> Delete</button>
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
