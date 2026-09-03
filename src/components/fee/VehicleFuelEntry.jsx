import React, { useState, useEffect } from 'react';
import { Save, Trash2, RotateCcw, Fuel } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const inputStyle = { width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' };
const labelStyle = { display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '6px', color: '#374151' };
const btnBase = { border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' };

export default function VehicleFuelEntry() {
  const [entries, setEntries] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [form, setForm] = useState({ vehicle: '', fuelType: 'Diesel', quantity: '', pricePerLitre: '', totalCost: '', date: new Date().toISOString().split('T')[0], currentMeter: '', remarks: '' });

  const token = localStorage.getItem('token');

  const fetchVehicles = async () => {
    try {
      const res = await fetch(`${API_URL}/api/transport/vehicles`, { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setVehicles(await res.json());
    } catch (err) { console.error(err); }
  };

  const fetchEntries = async (vehicleId) => {
    if (!vehicleId) return;
    try {
      const res = await fetch(`${API_URL}/api/transport/fuel/${vehicleId}`, { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setEntries(await res.json());
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchVehicles(); }, []);
  useEffect(() => { fetchEntries(selectedVehicle); }, [selectedVehicle]);

  const handleChange = (e) => {
    const updated = { ...form, [e.target.name]: e.target.value };
    if (e.target.name === 'quantity' || e.target.name === 'pricePerLitre') {
      const qty = parseFloat(updated.quantity) || 0;
      const price = parseFloat(updated.pricePerLitre) || 0;
      updated.totalCost = (qty * price).toFixed(2);
    }
    setForm(updated);
  };

  const handleSave = async () => {
    if (!selectedVehicle || !form.quantity) {
      setMessage({ type: 'error', text: 'Please select a vehicle and enter quantity.' });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/transport/fuel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...form, vehicle: selectedVehicle })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: data.message });
        setForm({ vehicle: '', fuelType: 'Diesel', quantity: '', pricePerLitre: '', totalCost: '', date: new Date().toISOString().split('T')[0], currentMeter: '', remarks: '' });
        fetchEntries(selectedVehicle);
      } else { setMessage({ type: 'error', text: data.message }); }
    } catch (err) { setMessage({ type: 'error', text: 'Server error' }); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this entry?')) return;
    try {
      const res = await fetch(`${API_URL}/api/transport/fuel/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) fetchEntries(selectedVehicle);
    } catch (err) { setMessage({ type: 'error', text: 'Error' }); }
  };

  const totalCost = entries.reduce((sum, e) => sum + (e.totalCost || 0), 0);

  return (
    <div style={{ padding: '20px', background: '#f3f4f6', minHeight: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {message && <div style={{ padding: '10px', borderRadius: '4px', background: message.type === 'success' ? '#d1fae5' : '#fee2e2', color: message.type === 'success' ? '#065f46' : '#991b1b', fontSize: '13px' }}>{message.text}</div>}

      {/* Vehicle Selector */}
      <div style={{ background: '#fff', padding: '16px 20px', borderRadius: '8px', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <label style={{ ...labelStyle, margin: 0, whiteSpace: 'nowrap' }}>Select Vehicle:</label>
        <select value={selectedVehicle} onChange={(e) => setSelectedVehicle(e.target.value)} style={{ ...inputStyle, maxWidth: '250px' }}>
          <option value="">-- Choose Vehicle --</option>
          {vehicles.map(v => <option key={v._id} value={v._id}>{v.vehicleNo}</option>)}
        </select>
        {selectedVehicle && <span style={{ fontSize: '12px', color: '#6b7280' }}>Total Fuel Cost: ₹{totalCost.toFixed(2)}</span>}
      </div>

      {/* Form */}
      <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#1f2937', fontWeight: 'bold' }}>Add Fuel Entry</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Date</label>
            <input name="date" type="date" value={form.date} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Fuel Type</label>
            <select name="fuelType" value={form.fuelType} onChange={handleChange} style={inputStyle}>
              <option>Diesel</option><option>Petrol</option><option>CNG</option><option>Electric</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Quantity (L)</label>
            <input name="quantity" type="number" value={form.quantity} onChange={handleChange} placeholder="0" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Price/Litre (₹)</label>
            <input name="pricePerLitre" type="number" value={form.pricePerLitre} onChange={handleChange} placeholder="0" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Total Cost (₹)</label>
            <input name="totalCost" type="number" value={form.totalCost} onChange={handleChange} placeholder="0" style={{ ...inputStyle, background: '#f9fafb' }} />
          </div>
          <div>
            <label style={labelStyle}>Meter Reading</label>
            <input name="currentMeter" type="number" value={form.currentMeter} onChange={handleChange} placeholder="km" style={inputStyle} />
          </div>
        </div>
        <div style={{ marginTop: '12px' }}>
          <label style={labelStyle}>Remarks</label>
          <input name="remarks" value={form.remarks} onChange={handleChange} placeholder="Optional" style={{ ...inputStyle, maxWidth: '400px' }} />
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
          <button onClick={handleSave} disabled={loading} style={{ ...btnBase, background: '#10b981', color: '#fff' }}><Fuel size={14} /> Add Entry</button>
          <button onClick={() => setForm({ vehicle: '', fuelType: 'Diesel', quantity: '', pricePerLitre: '', totalCost: '', date: new Date().toISOString().split('T')[0], currentMeter: '', remarks: '' })} style={{ ...btnBase, background: '#f59e0b', color: '#fff' }}><RotateCcw size={14} /> Reset</button>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        <div style={{ padding: '15px 20px', borderBottom: '1px solid #e5e7eb' }}>
          <h3 style={{ margin: 0, fontSize: '15px', color: '#1f2937', fontWeight: 'bold' }}>Fuel History</h3>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead style={{ background: '#f9fafb' }}>
            <tr>
              {['Date', 'Type', 'Qty (L)', 'Rate (₹/L)', 'Total Cost (₹)', 'Meter', 'Actions'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: h === 'Actions' ? 'center' : 'left', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!selectedVehicle ? (
              <tr><td colSpan="7" style={{ padding: '30px', textAlign: 'center', color: '#6b7280' }}>Select a vehicle to view fuel history.</td></tr>
            ) : entries.length === 0 ? (
              <tr><td colSpan="7" style={{ padding: '30px', textAlign: 'center', color: '#6b7280' }}>No fuel entries found.</td></tr>
            ) : entries.map(e => (
              <tr key={e._id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '12px 16px', color: '#374151' }}>{new Date(e.date).toLocaleDateString()}</td>
                <td style={{ padding: '12px 16px', color: '#374151' }}>{e.fuelType}</td>
                <td style={{ padding: '12px 16px', color: '#374151' }}>{e.quantity}</td>
                <td style={{ padding: '12px 16px', color: '#374151' }}>{e.pricePerLitre}</td>
                <td style={{ padding: '12px 16px', color: '#1f2937', fontWeight: '600' }}>₹{e.totalCost}</td>
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
  );
}
