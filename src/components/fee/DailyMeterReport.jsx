import React, { useState, useEffect } from 'react';
import { Eye, Download, Gauge } from 'lucide-react';
import * as XLSX from 'xlsx';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5005';

const inputStyle = { width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' };
const labelStyle = { display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' };

export default function DailyMeterReport() {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState('');

  // Default: last 30 days
  const defaultStart = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const defaultEnd = new Date().toISOString().split('T')[0];

  const [startDate, setStartDate] = useState(defaultStart);
  const [endDate, setEndDate] = useState(defaultEnd);

  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  useEffect(() => {
    fetch(`${API_URL}/api/transport/vehicles`, { headers: getHeaders() })
      .then(res => res.json())
      .then(data => setVehicles(Array.isArray(data) ? data : []))
      .catch(console.error);

    handleShow();
  }, []);

  const handleShow = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = `${API_URL}/api/transport/meter-entries?startDate=${startDate}&endDate=${endDate}`;
      if (selectedVehicle) url += `&vehicleId=${selectedVehicle}`;

      const res = await fetch(url, { headers: getHeaders() });
      const data = await res.json();

      if (res.ok) {
        setReportData(Array.isArray(data) ? data : []);
      } else {
        setError(data.message || 'Failed to fetch meter readings');
      }
    } catch {
      setError('Server connection error');
    } finally {
      setLoading(false);
    }
  };

  const exportToExcel = () => {
    if (reportData.length === 0) return;
    const rows = reportData.map((m, i) => ({
      '#': i + 1,
      'Date': new Date(m.date || m.createdAt).toLocaleDateString('en-GB'),
      'Vehicle No': m.vehicle?.vehicleNo || m.vehicleNo || 'N/A',
      'Opening Meter (KM)': m.openingMeter || 0,
      'Closing Meter (KM)': m.closingMeter || 0,
      'Total Distance Run (KM)': m.totalKm || (m.closingMeter - m.openingMeter) || 0,
      'Remarks': m.remarks || '-'
    }));

    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Daily Meter');
    XLSX.writeFile(wb, `Daily_Meter_Report_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  const grandKm = reportData.reduce((acc, m) => acc + (m.totalKm || (m.closingMeter - m.openingMeter) || 0), 0);

  return (
    <div style={{ display: 'flex', height: '100%', background: '#f3f4f6' }}>
      <div style={{ width: '250px', background: '#fff', borderRight: '1px solid #e5e7eb', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', flexShrink: 0, overflowY: 'auto' }}>
        <div>
          <label style={labelStyle}>Vehicle</label>
          <select value={selectedVehicle} onChange={e => setSelectedVehicle(e.target.value)} style={inputStyle}>
            <option value="">All Vehicles ({vehicles.length})</option>
            {vehicles.map(v => <option key={v._id} value={v._id}>{v.vehicleNo || v.name}</option>)}
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

        <button
          onClick={handleShow}
          disabled={loading}
          style={{
            background: '#29a9d8',
            color: '#fff',
            border: 'none',
            padding: '8px 10px',
            borderRadius: '4px',
            fontSize: '12px',
            cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            fontWeight: 'bold',
            marginTop: '8px'
          }}
        >
          <Eye size={14} /> {loading ? 'Loading...' : 'Show'}
        </button>
      </div>

      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <div style={{ background: '#fff', width: '100%', minHeight: '100%', borderRadius: '8px', border: '1px solid #e5e7eb', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: '16px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Gauge size={20} color="#29a9d8" />
              <h2 style={{ margin: 0, fontSize: '18px', color: '#1f2937' }}>Daily Meter Report</h2>
            </div>
            {reportData.length > 0 && (
              <button
                onClick={exportToExcel}
                style={{
                  background: '#10b981',
                  color: '#fff',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontWeight: 'bold'
                }}
              >
                <Download size={14} /> Export Excel
              </button>
            )}
          </div>

          {error && <div style={{ padding: '12px', background: '#fee2e2', color: '#991b1b', borderRadius: '4px', marginBottom: '20px', fontSize: '13px' }}>{error}</div>}

          {reportData.length === 0 && !loading && !error ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280', fontSize: '14px' }}>
              No daily meter readings found for the selected dates.
            </div>
          ) : (
            <div style={{ overflowX: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', whiteSpace: 'nowrap' }}>
                <thead style={{ background: '#f9fafb' }}>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Date</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Vehicle No</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right', color: '#374151' }}>Opening Meter</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right', color: '#374151' }}>Closing Meter</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right', color: '#059669' }}>Total KM</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((m, i) => (
                    <tr key={m._id || i} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '12px 16px', color: '#4b5563' }}>
                        {new Date(m.date || m.createdAt).toLocaleDateString('en-GB')}
                      </td>
                      <td style={{ padding: '12px 16px', color: '#1f2937', fontWeight: 'bold' }}>
                        {m.vehicle?.vehicleNo || m.vehicleNo || 'N/A'}
                      </td>
                      <td style={{ padding: '12px 16px', color: '#4b5563', textAlign: 'right' }}>
                        {Number(m.openingMeter || 0).toLocaleString()} KM
                      </td>
                      <td style={{ padding: '12px 16px', color: '#4b5563', textAlign: 'right' }}>
                        {Number(m.closingMeter || 0).toLocaleString()} KM
                      </td>
                      <td style={{ padding: '12px 16px', color: '#059669', textAlign: 'right', fontWeight: 'bold' }}>
                        {m.totalKm || (m.closingMeter - m.openingMeter) || 0} KM
                      </td>
                      <td style={{ padding: '12px 16px', color: '#6b7280' }}>{m.remarks || 'Normal Route'}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot style={{ background: '#f9fafb' }}>
                  <tr>
                    <td colSpan="4" style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 'bold', color: '#374151' }}>Total Distance Run:</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 'bold', color: '#059669', fontSize: '15px' }}>
                      {grandKm.toLocaleString()} KM
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
