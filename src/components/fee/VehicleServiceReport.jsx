import React, { useState, useEffect } from 'react';
import { Eye, Download, Wrench } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const token = localStorage.getItem('token');

const inputStyle = { width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' };
const labelStyle = { display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' };

const SERVICE_TYPES = ['Oil Change', 'Tyre Change', 'Battery', 'AC Service', 'Engine Repair', 'Brake Service', 'Other'];

export default function VehicleServiceReport() {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);

  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/transport/vehicles`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => setVehicles(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  const handleShow = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = `${API_URL}/api/transport/service-entries?startDate=${startDate}&endDate=${endDate}`;
      if (selectedVehicle) url += `&vehicleId=${selectedVehicle}`;
      if (serviceType) url += `&serviceType=${encodeURIComponent(serviceType)}`;

      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();

      if (res.ok) {
        setReportData(Array.isArray(data) ? data : []);
      } else {
        setError(data.message || 'Failed to fetch service records');
      }
    } catch (err) {
      setError('Server connection error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100%', background: '#f3f4f6' }}>
      <div style={{ width: '250px', background: '#fff', borderRight: '1px solid #e5e7eb', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px', flexShrink: 0, overflowY: 'auto' }}>

        <div>
          <label style={labelStyle}>Vehicle</label>
          <select value={selectedVehicle} onChange={e => setSelectedVehicle(e.target.value)} style={inputStyle}>
            <option value="">All Vehicles</option>
            {vehicles.map(v => <option key={v._id} value={v._id}>{v.vehicleNo || v.name}</option>)}
          </select>
        </div>

        <div>
          <label style={labelStyle}>Service Type</label>
          <select value={serviceType} onChange={e => setServiceType(e.target.value)} style={inputStyle}>
            <option value="">All Types</option>
            {SERVICE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div>
          <label style={labelStyle}>From Date</label>
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>To Date</label>
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} style={inputStyle} />
        </div>

        <button onClick={handleShow} disabled={loading} style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '8px 10px', borderRadius: '4px', fontSize: '12px', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontWeight: 'bold', marginTop: '10px' }}>
          <Eye size={14} /> {loading ? 'Loading...' : 'Show'}
        </button>
      </div>

      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <div style={{ background: '#fff', width: '100%', minHeight: '100%', borderRadius: '8px', border: '1px solid #e5e7eb', padding: '20px' }}>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: '16px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Wrench size={20} color="#29a9d8" />
              <h2 style={{ margin: 0, fontSize: '18px', color: '#1f2937' }}>Vehicle Service Report</h2>
            </div>
            {reportData.length > 0 && (
              <button style={{ background: '#10b981', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' }}>
                <Download size={14} /> Export Excel
              </button>
            )}
          </div>

          {error && <div style={{ padding: '12px', background: '#fee2e2', color: '#991b1b', borderRadius: '4px', marginBottom: '20px', fontSize: '13px' }}>{error}</div>}

          {reportData.length === 0 && !loading && !error ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280', fontSize: '14px' }}>
              Select filters and click "Show" to view vehicle service records.
            </div>
          ) : (
            <div style={{ overflowX: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', whiteSpace: 'nowrap' }}>
                <thead style={{ background: '#f9fafb' }}>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Service Date</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Vehicle No</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Service Type</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Service Centre</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right', color: '#374151' }}>KM Reading</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right', color: '#374151' }}>Cost (₹)</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Next Service Due</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((s, i) => (
                    <tr key={s._id || i} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '12px 16px', color: '#4b5563' }}>{new Date(s.serviceDate || s.createdAt).toLocaleDateString()}</td>
                      <td style={{ padding: '12px 16px', color: '#1f2937', fontWeight: 'bold' }}>{s.vehicle?.vehicleNo || s.vehicleNo || 'N/A'}</td>
                      <td style={{ padding: '12px 16px', color: '#4b5563' }}>{s.serviceType || '-'}</td>
                      <td style={{ padding: '12px 16px', color: '#4b5563' }}>{s.serviceCentre || s.serviceCenter || '-'}</td>
                      <td style={{ padding: '12px 16px', color: '#4b5563', textAlign: 'right' }}>{s.kmReading || '-'}</td>
                      <td style={{ padding: '12px 16px', color: '#b91c1c', textAlign: 'right', fontWeight: 'bold' }}>₹{(s.cost || s.serviceCost || 0).toLocaleString()}</td>
                      <td style={{ padding: '12px 16px', color: '#d97706' }}>{s.nextServiceDue ? new Date(s.nextServiceDue).toLocaleDateString() : '-'}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot style={{ background: '#f9fafb' }}>
                  <tr>
                    <td colSpan="5" style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 'bold', color: '#374151' }}>Total Service Cost:</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 'bold', color: '#b91c1c', fontSize: '15px' }}>
                      ₹{reportData.reduce((acc, s) => acc + (s.cost || s.serviceCost || 0), 0).toLocaleString()}
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
