import React, { useState, useEffect } from 'react';
import { Eye, Download } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const token = localStorage.getItem('token');
const inputStyle = { width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' };
const labelStyle = { display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' };

export default function VehicleWiseTransportSummary() {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/transport/vehicles`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(d => setVehicles(Array.isArray(d) ? d : [])).catch(console.error);
  }, []);

  const handleShow = async () => {
    setLoading(true); setError(null);
    try {
      let url = `${API_URL}/api/transport/vehicles`;
      if (selectedVehicle) url += `/${selectedVehicle}/students`;
      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (res.ok) {
        const vehicleList = Array.isArray(data) ? data : [data];
        setReportData(vehicleList.map(v => ({
          vehicleNo: v.vehicleNo || v.name,
          route: v.route?.name || v.routeName || '-',
          driver: v.driver?.name || v.driverName || '-',
          capacity: v.capacity || '-',
          occupied: v.students?.length || v.assignedStudents || 0,
          monthlyCollection: v.monthlyCollection || 0
        })));
      } else setError(data.message);
    } catch { setError('Server connection error'); } finally { setLoading(false); }
  };

  return (
    <div style={{ display: 'flex', height: '100%', background: '#f3f4f6' }}>
      <div style={{ width: '250px', background: '#fff', borderRight: '1px solid #e5e7eb', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px', flexShrink: 0 }}>
        <div><label style={labelStyle}>Vehicle</label>
          <select value={selectedVehicle} onChange={e => setSelectedVehicle(e.target.value)} style={inputStyle}>
            <option value="">All Vehicles</option>
            {vehicles.map(v => <option key={v._id} value={v._id}>{v.vehicleNo || v.name}</option>)}
          </select></div>
        <button onClick={handleShow} disabled={loading} style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '8px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontWeight: 'bold', marginTop: '10px' }}>
          <Eye size={14} /> {loading ? 'Loading...' : 'Show'}</button>
      </div>
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <div style={{ background: '#fff', minHeight: '100%', borderRadius: '8px', border: '1px solid #e5e7eb', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', paddingBottom: '16px', marginBottom: '20px' }}>
            <h2 style={{ margin: 0, fontSize: '18px', color: '#1f2937' }}>Vehicle Wise Transport Summary</h2>
            {reportData.length > 0 && <button style={{ background: '#10b981', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><Download size={14} /> Export</button>}
          </div>
          {error && <div style={{ padding: '12px', background: '#fee2e2', color: '#991b1b', borderRadius: '4px', marginBottom: '20px' }}>{error}</div>}
          {reportData.length === 0 && !loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>Click "Show" to view vehicle wise transport summary.</div>
          ) : (
            <div style={{ overflowX: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead style={{ background: '#f9fafb' }}>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    {['Vehicle No','Route','Driver','Capacity','Occupied','Available','Monthly Collection (₹)'].map(h => (
                      <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((v, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '12px 16px', color: '#1f2937', fontWeight: 'bold' }}>{v.vehicleNo}</td>
                      <td style={{ padding: '12px 16px', color: '#4b5563' }}>{v.route}</td>
                      <td style={{ padding: '12px 16px', color: '#4b5563' }}>{v.driver}</td>
                      <td style={{ padding: '12px 16px', color: '#4b5563', textAlign: 'center' }}>{v.capacity}</td>
                      <td style={{ padding: '12px 16px', color: '#059669', textAlign: 'center', fontWeight: 'bold' }}>{v.occupied}</td>
                      <td style={{ padding: '12px 16px', color: '#d97706', textAlign: 'center', fontWeight: 'bold' }}>{v.capacity !== '-' ? v.capacity - v.occupied : '-'}</td>
                      <td style={{ padding: '12px 16px', color: '#059669', fontWeight: 'bold' }}>₹{v.monthlyCollection.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
