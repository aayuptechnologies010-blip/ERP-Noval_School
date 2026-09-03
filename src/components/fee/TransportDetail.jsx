import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const token = localStorage.getItem('token');
const inputStyle = { width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' };
const labelStyle = { display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' };

export default function TransportDetail() {
  const [vehicles, setVehicles] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/transport/vehicles`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(d => setVehicles(Array.isArray(d) ? d : [])).catch(console.error);
    fetch(`${API_URL}/api/transport/routes`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(d => setRoutes(Array.isArray(d) ? d : [])).catch(console.error);
  }, []);

  const handleShow = async () => {
    if (!selectedVehicle) { setError('Please select a vehicle'); return; }
    setLoading(true); setError(null);
    try {
      const res = await fetch(`${API_URL}/api/transport/vehicles/${selectedVehicle}`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (res.ok) setReportData(data);
      else setError(data.message);
    } catch { setError('Server connection error'); } finally { setLoading(false); }
  };

  const InfoRow = ({ label, value }) => (
    <div style={{ display: 'flex', borderBottom: '1px solid #f3f4f6', padding: '10px 0' }}>
      <div style={{ width: '180px', fontSize: '12px', color: '#6b7280', fontWeight: '600' }}>{label}</div>
      <div style={{ flex: 1, fontSize: '13px', color: '#1f2937', fontWeight: '500' }}>{value || 'N/A'}</div>
    </div>
  );

  return (
    <div style={{ display: 'flex', height: '100%', background: '#f3f4f6' }}>
      <div style={{ width: '250px', background: '#fff', borderRight: '1px solid #e5e7eb', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px', flexShrink: 0 }}>
        <div><label style={labelStyle}>Select Vehicle</label>
          <select value={selectedVehicle} onChange={e => setSelectedVehicle(e.target.value)} style={inputStyle}>
            <option value="">-- Select Vehicle --</option>
            {vehicles.map(v => <option key={v._id} value={v._id}>{v.vehicleNo || v.name}</option>)}
          </select></div>
        <button onClick={handleShow} disabled={loading} style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '8px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontWeight: 'bold', marginTop: '10px' }}>
          <Eye size={14} /> {loading ? 'Loading...' : 'Show'}</button>
      </div>
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <div style={{ background: '#fff', minHeight: '100%', borderRadius: '8px', border: '1px solid #e5e7eb', padding: '20px' }}>
          <h2 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#1f2937', borderBottom: '1px solid #e5e7eb', paddingBottom: '16px' }}>Transport Detail</h2>
          {error && <div style={{ padding: '12px', background: '#fee2e2', color: '#991b1b', borderRadius: '4px', marginBottom: '20px' }}>{error}</div>}
          {!reportData && !loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>Select a vehicle and click "Show" to view its details.</div>
          ) : reportData && (
            <div>
              {/* Vehicle Info Card */}
              <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
                <div style={{ fontWeight: 'bold', color: '#0369a1', fontSize: '16px', marginBottom: '12px' }}>🚌 {reportData.vehicleNo || reportData.name}</div>
                <InfoRow label="Registration No" value={reportData.registrationNo} />
                <InfoRow label="Vehicle Type" value={reportData.vehicleType} />
                <InfoRow label="Capacity" value={`${reportData.capacity} Seats`} />
                <InfoRow label="Route" value={reportData.route?.name || reportData.routeName} />
                <InfoRow label="Driver Name" value={reportData.driver?.name || reportData.driverName} />
                <InfoRow label="Driver Mobile" value={reportData.driver?.mobile || reportData.driverMobile} />
                <InfoRow label="Helper Name" value={reportData.helperName} />
                <InfoRow label="Insurance Expiry" value={reportData.insuranceExpiry ? new Date(reportData.insuranceExpiry).toLocaleDateString() : null} />
                <InfoRow label="Fitness Expiry" value={reportData.fitnessExpiry ? new Date(reportData.fitnessExpiry).toLocaleDateString() : null} />
              </div>

              {/* Students Section */}
              {reportData.students?.length > 0 && (
                <div>
                  <h3 style={{ fontSize: '14px', color: '#374151', fontWeight: 'bold', marginBottom: '12px' }}>Assigned Students ({reportData.students.length})</h3>
                  <div style={{ overflowX: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                      <thead style={{ background: '#f9fafb' }}>
                        <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                          {['Adm No','Name','Class','Stop'].map(h => <th key={h} style={{ padding: '10px 16px', textAlign: 'left', color: '#374151' }}>{h}</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        {reportData.students.map((s, i) => (
                          <tr key={s._id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                            <td style={{ padding: '10px 16px', color: '#4b5563' }}>{s.admissionNumber}</td>
                            <td style={{ padding: '10px 16px', color: '#1f2937', fontWeight: '600' }}>{s.firstName} {s.lastName}</td>
                            <td style={{ padding: '10px 16px', color: '#4b5563' }}>{s.class?.name || s.class}</td>
                            <td style={{ padding: '10px 16px', color: '#4b5563' }}>{s.transportStop || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
