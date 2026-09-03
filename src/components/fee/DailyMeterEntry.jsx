import React, { useState, useEffect } from 'react';
import { Save, Trash2, RotateCcw } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const inputStyle = { width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' };
const labelStyle = { display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '6px', color: '#374151' };
const btnBase = { border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' };

export default function DailyMeterEntry() {
  const [entries, setEntries] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [form, setForm] = useState({ date: new Date().toISOString().split('T')[0], openingMeter: '', closingMeter: '', remarks: '' });

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
      const res = await fetch(`${API_URL}/api/transport/meter/${vehicleId}`, { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setEntries(await res.json());
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchVehicles(); }, []);
  useEffect(() => { fetchEntries(selectedVehicle); }, [selectedVehicle]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    if (!selectedVehicle || !form.openingMeter || !form.closingMeter) {
      setMessage({ type: 'error', text: 'Vehicle, Opening and Closing meters are required.' });
      return;
    }
    if (Number(form.closingMeter) <= Number(form.openingMeter)) {
      setMessage({ type: 'error', text: 'Closing meter must be greater than opening meter.' });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/transport/meter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...form, vehicle: selectedVehicle, totalKm: form.closingMeter - form.openingMeter })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: data.message });
        setForm({ date: new Date().toISOString().split('T')[0], openingMeter: '', closingMeter: '', remarks: '' });
        fetchEntries(selectedVehicle);
      } else { setMessage({ type: 'error', text: data.message }); }
    } catch (err) { setMessage({ type: 'error', text: 'Server error' }); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this entry?')) return;
    try {
      const res = await fetch(`${API_URL}/api/transport/meter/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) fetchEntries(selectedVehicle);
    } catch (err) {}
  };

  const totalKm = entries.reduce((sum, e) => sum + (e.totalKm || 0), 0);

  return (
    <div style={{ padding: '20px', background: '#f3f4f6', minHeight: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {message && <div style={{ padding: '10px', borderRadius: '4px', background: message.type === 'success' ? '#d1fae5' : '#fee2e2', color: message.type === 'success' ? '#065f46' : '#991b1b', fontSize: '13px' }}>{message.text}</div>}

      <div style={{ background: '#fff', padding: '16px 20px', borderRadius: '8px', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <label style={{ ...labelStyle, margin: 0, whiteSpace: 'nowrap' }}>Select Vehicle:</label>
        <select value={selectedVehicle} onChange={(e) => setSelectedVehicle(e.target.value)} style={{ ...inputStyle, maxWidth: '250px' }}>
          <option value="">-- Choose Vehicle --</option>
          {vehicles.map(v => <option key={v._id} value={v._id}>{v.vehicleNo}</option>)}
        </select>
        {selectedVehicle && <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 'bold' }}>Total Distance: {totalKm} km</span>}
      </div>

      <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#1f2937', fontWeight: 'bold' }}>Daily Meter Entry</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Date</label>
            <input name="date" type="date" value={form.date} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Opening Meter (km) *</label>
            <input name="openingMeter" type="number" value={form.openingMeter} onChange={handleChange} placeholder="e.g. 5000" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Closing Meter (km) *</label>
            <input name="closingMeter" type="number" value={form.closingMeter} onChange={handleChange} placeholder="e.g. 5150" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Total KM (auto-calc)</label>
            <input readOnly value={(Number(form.closingMeter) - Number(form.openingMeter)) || 0} style={{ ...inputStyle, background: '#f9fafb', color: '#6b7280' }} />
          </div>
          <div style={{ gridColumn: '1/-1' }}>
            <label style={labelStyle}>Remarks</label>
            <input name="remarks" value={form.remarks} onChange={handleChange} placeholder="Optional" style={inputStyle} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
          <button onClick={handleSave} disabled={loading} style={{ ...btnBase, background: '#10b981', color: '#fff' }}><Save size={14} /> Save Entry</button>
          <button onClick={() => setForm({ date: new Date().toISOString().split('T')[0], openingMeter: '', closingMeter: '', remarks: '' })} style={{ ...btnBase, background: '#f59e0b', color: '#fff' }}><RotateCcw size={14} /> Reset</button>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        <div style={{ padding: '15px 20px', borderBottom: '1px solid #e5e7eb' }}><h3 style={{ margin: 0, fontSize: '15px', color: '#1f2937', fontWeight: 'bold' }}>Meter History</h3></div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead style={{ background: '#f9fafb' }}>
            <tr>
              {['Date', 'Opening (km)', 'Closing (km)', 'Total KM', 'Remarks', 'Actions'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: h === 'Actions' ? 'center' : 'left', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!selectedVehicle ? (
              <tr><td colSpan="6" style={{ padding: '30px', textAlign: 'center', color: '#6b7280' }}>Select a vehicle to view meter log.</td></tr>
            ) : entries.length === 0 ? (
              <tr><td colSpan="6" style={{ padding: '30px', textAlign: 'center', color: '#6b7280' }}>No meter entries yet.</td></tr>
            ) : entries.map(e => (
              <tr key={e._id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '12px 16px', color: '#374151' }}>{new Date(e.date).toLocaleDateString()}</td>
                <td style={{ padding: '12px 16px', color: '#374151' }}>{e.openingMeter} km</td>
                <td style={{ padding: '12px 16px', color: '#374151' }}>{e.closingMeter} km</td>
                <td style={{ padding: '12px 16px', color: '#10b981', fontWeight: '700' }}>{e.totalKm} km</td>
                <td style={{ padding: '12px 16px', color: '#374151' }}>{e.remarks || '-'}</td>
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
