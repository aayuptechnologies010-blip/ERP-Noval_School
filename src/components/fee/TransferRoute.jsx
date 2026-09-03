import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, Search } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const token = localStorage.getItem('token');

const inputStyle = { width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px', outline: 'none' };
const labelStyle = { display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' };

export default function TransferRoute() {
  const [routes, setRoutes] = useState([]);
  const [currentRoute, setCurrentRoute] = useState('');
  const [newRoute, setNewRoute] = useState('');
  
  const [newStops, setNewStops] = useState([]);
  const [selectedNewStop, setSelectedNewStop] = useState('');

  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/transport/routes`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(d => setRoutes(d)).catch(console.error);
  }, []);

  useEffect(() => {
    if (newRoute) {
      fetch(`${API_URL}/api/transport/route-stops/route/${newRoute}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(r => r.json()).then(d => setNewStops(d)).catch(console.error);
    } else {
      setNewStops([]);
    }
  }, [newRoute]);

  const handleSearchStudents = async () => {
    if (!currentRoute) return setMessage({ type: 'error', text: 'Select current route to find students' });
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/transport/students-by-route/${currentRoute}`, { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) {
        setStudents(await res.json());
      }
    } catch (err) { setMessage({ type: 'error', text: 'Search failed' }); }
    finally { setLoading(false); }
  };

  const handleTransfer = async () => {
    if (!selectedStudents.length) return setMessage({ type: 'error', text: 'Select students to transfer' });
    if (!newRoute || !selectedNewStop) return setMessage({ type: 'error', text: 'Select new route and stop' });

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/transport/transfer-route`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ studentIds: selectedStudents, newRoute, newStop: selectedNewStop })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: data.message });
        setSelectedStudents([]);
        setNewRoute('');
        setSelectedNewStop('');
        handleSearchStudents(); // refresh
      } else { setMessage({ type: 'error', text: data.message }); }
    } catch (err) { setMessage({ type: 'error', text: 'Server error' }); }
    finally { setLoading(false); }
  };

  const toggleSelect = (id) => setSelectedStudents(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  const toggleAll = () => {
    if (selectedStudents.length === students.length) setSelectedStudents([]);
    else setSelectedStudents(students.map(s => s._id));
  };

  return (
    <div style={{ padding: '20px', background: '#f3f4f6', minHeight: '100%' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {message && <div style={{ padding: '10px', borderRadius: '4px', background: message.type === 'success' ? '#d1fae5' : '#fee2e2', color: message.type === 'success' ? '#065f46' : '#991b1b', fontSize: '13px' }}>{message.text}</div>}

        <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#1f2937' }}>Transfer Students Between Routes</h3>
          
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'flex-end', marginBottom: '20px' }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <label style={labelStyle}>Current Route *</label>
              <select value={currentRoute} onChange={(e) => setCurrentRoute(e.target.value)} style={inputStyle}>
                <option value="">Select Route</option>
                {routes.map(r => <option key={r._id} value={r._id}>{r.routeName}</option>)}
              </select>
            </div>
            <button onClick={handleSearchStudents} disabled={loading} style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '9px 20px', borderRadius: '4px', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' }}>
              <Search size={14} /> Find Students
            </button>
          </div>

          {students.length > 0 && (
            <div style={{ padding: '20px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px', marginTop: '20px' }}>
              <h4 style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#1f2937' }}>Select Destination Route</h4>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <label style={labelStyle}>New Route *</label>
                  <select value={newRoute} onChange={(e) => setNewRoute(e.target.value)} style={inputStyle}>
                    <option value="">Select New Route</option>
                    {routes.map(r => <option key={r._id} value={r._id}>{r.routeName}</option>)}
                  </select>
                </div>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <label style={labelStyle}>New Stop *</label>
                  <select value={selectedNewStop} onChange={(e) => setSelectedNewStop(e.target.value)} style={inputStyle} disabled={!newRoute}>
                    <option value="">Select Stop</option>
                    {newStops.map(s => <option key={s._id} value={s._id}>{s.stopName} (₹{s.stopFare})</option>)}
                  </select>
                </div>
              </div>
              <div style={{ marginTop: '16px', textAlign: 'right' }}>
                <button onClick={handleTransfer} disabled={loading || !selectedStudents.length} style={{ background: '#10b981', color: '#fff', border: 'none', padding: '9px 20px', borderRadius: '4px', fontSize: '13px', cursor: selectedStudents.length ? 'pointer' : 'not-allowed', display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 'bold', opacity: selectedStudents.length ? 1 : 0.6 }}>
                  <ArrowRightLeft size={14} /> Transfer Selected Students
                </button>
              </div>
            </div>
          )}
        </div>

        {students.length > 0 && (
          <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead style={{ background: '#f9fafb' }}>
                <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}><input type="checkbox" checked={selectedStudents.length === students.length} onChange={toggleAll} /></th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Adm No.</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Student Name</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Class/Sec</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Current Stop</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s._id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '12px 16px' }}><input type="checkbox" checked={selectedStudents.includes(s._id)} onChange={() => toggleSelect(s._id)} /></td>
                    <td style={{ padding: '12px 16px', color: '#374151' }}>{s.academicDetails?.admissionNumber}</td>
                    <td style={{ padding: '12px 16px', color: '#1f2937', fontWeight: '600' }}>{s.personalDetails?.firstName} {s.personalDetails?.lastName}</td>
                    <td style={{ padding: '12px 16px', color: '#374151' }}>{s.academicDetails?.class} / {s.academicDetails?.section}</td>
                    <td style={{ padding: '12px 16px', color: '#374151' }}>{s.transportDetails?.stop?.stopName || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}
