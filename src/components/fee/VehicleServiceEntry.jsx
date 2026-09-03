import React, { useState, useEffect } from 'react';
import { Save, Trash2, RotateCcw, Wrench } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const inputStyle = { width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' };
const labelStyle = { display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '6px', color: '#374151' };
const btnBase = { border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' };

export default function VehicleServiceEntry() {
  const [entries, setEntries] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [form, setForm] = useState({ serviceType: '', garageName: '', cost: '', serviceDate: new Date().toISOString().split('T')[0], nextServiceDate: '', currentMeter: '', remarks: '' });

  const token = localStorage.getItem('token');

  const fetchVehicles = async () => {
    try {
      const res = await fetch(`${API_URL}/api/transport/vehicles`, { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setVehicles(await res.json());
    } catch (err) { console.error(err); }
  };

  const fetchEntries = async (vehicleId) => {
    if (!vehicleId) return setEntries([]);
    try {
      const res = await fetch(`${API_URL}/api/transport/service/${vehicleId}`, { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setEntries(await res.json());
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchVehicles(); }, []);
  useEffect(() => { fetchEntries(selectedVehicle); }, [selectedVehicle]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    if (!selectedVehicle || !form.serviceType) {
      setMessage({ type: 'error', text: 'Please select a vehicle and enter service type.' });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/transport/service`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...form, vehicle: selectedVehicle })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: data.message });
        setForm({ serviceType: '', garageName: '', cost: '', serviceDate: new Date().toISOString().split('T')[0], nextServiceDate: '', currentMeter: '', remarks: '' });
        fetchEntries(selectedVehicle);
      } else { setMessage({ type: 'error', text: data.message }); }
    } catch (err) { setMessage({ type: 'error', text: 'Server error' }); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this entry?')) return;
    try {
      const res = await fetch(`${API_URL}/api/transport/service/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) fetchEntries(selectedVehicle);
    } catch (err) {}
  };

  return (
    <div style={{ padding: '20px', background: '#f3f4f6', minHeight: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {message && <div style={{ padding: '10px', borderRadius: '4px', background: message.type === 'success' ? '#d1fae5' : '#fee2e2', color: message.type === 'success' ? '#065f46' : '#991b1b', fontSize: '13px' }}>{message.text}</div>}

      <div style={{ background: '#fff', padding: '16px 20px', borderRadius: '8px', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <label style={{ ...labelStyle, margin: 0, whiteSpace: 'nowrap' }}>Select Vehicle:</label>
        <select value={selectedVehicle} onChange={(e) => setSelectedVehicle(e.target.value)} style={{ ...inputStyle, maxWidth: '250px' }}>
          <option value="">-- Choose Vehicle --</option>
          {vehicles.map(v => <option key={v._id} value={v._id}>{v.vehicleNo}</option>)}
        </select>
      </div>

      <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#1f2937', fontWeight: 'bold' }}>Add Service Entry</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Service Type *</label>
            <input name="serviceType" value={form.serviceType} onChange={handleChange} placeholder="e.g. Oil Change, Tyres" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Garage Name</label>
            <input name="garageName" value={form.garageName} onChange={handleChange} placeholder="Workshop name" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Cost (₹)</label>
            <input name="cost" type="number" value={form.cost} onChange={handleChange} placeholder="0" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Service Date</label>
            <input name="serviceDate" type="date" value={form.serviceDate} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Next Service Date</label>
            <input name="nextServiceDate" type="date" value={form.nextServiceDate} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Meter Reading (km)</label>
            <input name="currentMeter" type="number" value={form.currentMeter} onChange={handleChange} placeholder="0" style={inputStyle} />
          </div>
          <div style={{ gridColumn: '1/-1' }}>
            <label style={labelStyle}>Remarks</label>
            <input name="remarks" value={form.remarks} onChange={handleChange} placeholder="Optional" style={inputStyle} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
          <button onClick={handleSave} disabled={loading} style={{ ...btnBase, background: '#10b981', color: '#fff' }}><Wrench size={14} /> Add Entry</button>
          <button onClick={() => setForm({ serviceType: '', garageName: '', cost: '', serviceDate: new Date().toISOString().split('T')[0], nextServiceDate: '', currentMeter: '', remarks: '' })} style={{ ...btnBase, background: '#f59e0b', color: '#fff' }}><RotateCcw size={14} /> Reset</button>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        <div style={{ padding: '15px 20px', borderBottom: '1px solid #e5e7eb' }}><h3 style={{ margin: 0, fontSize: '15px', color: '#1f2937', fontWeight: 'bold' }}>Service History</h3></div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', minWidth: '800px' }}>
            <thead style={{ background: '#f9fafb' }}>
              <tr>
                {['Service Type', 'Garage', 'Cost (₹)', 'Service Date', 'Next Due', 'Meter', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: h === 'Actions' ? 'center' : 'left', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {!selectedVehicle ? (
                <tr><td colSpan="7" style={{ padding: '30px', textAlign: 'center', color: '#6b7280' }}>Select a vehicle to view history.</td></tr>
              ) : entries.length === 0 ? (
                <tr><td colSpan="7" style={{ padding: '30px', textAlign: 'center', color: '#6b7280' }}>No service records found.</td></tr>
              ) : entries.map(e => (
                <tr key={e._id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '12px 16px', color: '#1f2937', fontWeight: '600' }}>{e.serviceType}</td>
                  <td style={{ padding: '12px 16px', color: '#374151' }}>{e.garageName || '-'}</td>
                  <td style={{ padding: '12px 16px', color: '#374151', fontWeight: 'bold' }}>₹{e.cost}</td>
                  <td style={{ padding: '12px 16px', color: '#374151' }}>{new Date(e.serviceDate).toLocaleDateString()}</td>
                  <td style={{ padding: '12px 16px', color: e.nextServiceDate && new Date(e.nextServiceDate) < new Date() ? '#ef4444' : '#374151' }}>
                    {e.nextServiceDate ? new Date(e.nextServiceDate).toLocaleDateString() : '-'}
                  </td>
                  <td style={{ padding: '12px 16px', color: '#374151' }}>{e.currentMeter ? `${e.currentMeter} km` : '-'}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    <button onClick={() => handleDelete(e._id)} style={{ ...btnBase, background: '#ef4444', color: '#fff', padding: '6px 12px', fontSize: '12px' }}><Trash2 size={12} /> Delete</button>
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
