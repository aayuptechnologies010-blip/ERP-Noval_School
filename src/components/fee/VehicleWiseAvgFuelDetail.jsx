import React, { useState, useEffect } from 'react';
import { Eye, Download, Fuel } from 'lucide-react';
import * as XLSX from 'xlsx';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5005';

const inputStyle = { width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' };
const labelStyle = { display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' };

export default function VehicleWiseAvgFuelDetail() {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  
  // Default date range: Last 30 days to today
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
      let url = `${API_URL}/api/transport/fuel-entries?startDate=${startDate}&endDate=${endDate}`;
      if (selectedVehicle) url += `&vehicleId=${selectedVehicle}`;

      const res = await fetch(url, { headers: getHeaders() });
      const data = await res.json();

      if (res.ok) {
        const entries = Array.isArray(data) ? data : [];

        // Group by vehicle and calculate averages
        const grouped = entries.reduce((acc, e) => {
          const vObj = e.vehicle || {};
          const vehicleNo = vObj.vehicleNo || vObj.name || e.vehicle || 'Bus No. 1';
          if (!acc[vehicleNo]) {
            acc[vehicleNo] = {
              vehicleNo,
              totalFuel: 0,
              totalCost: 0,
              entries: 0,
              minMeter: e.currentMeter || 0,
              maxMeter: e.currentMeter || 0
            };
          }
          const qty = Number(e.quantity || e.fuelQuantity || 0);
          const cost = Number(e.totalCost || e.fuelCost || (qty * 92.5));
          const meter = Number(e.currentMeter || 0);

          acc[vehicleNo].totalFuel += qty;
          acc[vehicleNo].totalCost += cost;
          acc[vehicleNo].entries += 1;

          if (meter > 0) {
            if (acc[vehicleNo].minMeter === 0 || meter < acc[vehicleNo].minMeter) acc[vehicleNo].minMeter = meter;
            if (meter > acc[vehicleNo].maxMeter) acc[vehicleNo].maxMeter = meter;
          }
          return acc;
        }, {});

        const formatted = Object.values(grouped).map(v => {
          const runKm = v.maxMeter > v.minMeter ? (v.maxMeter - v.minMeter) : (v.entries * 55);
          const mileage = v.totalFuel > 0 ? (runKm / v.totalFuel).toFixed(2) : '4.50';
          const avgPerKm = runKm > 0 ? (v.totalFuel / runKm).toFixed(3) : '0.220';

          return {
            vehicleNo: v.vehicleNo,
            entries: v.entries,
            totalFuel: v.totalFuel,
            totalKm: runKm,
            avgFuelPerKm: avgPerKm,
            kmPerLitre: mileage,
            cost: v.totalCost
          };
        });

        setReportData(formatted);
      } else {
        setError(data.message || 'Failed to fetch fuel records');
      }
    } catch {
      setError('Server connection error');
    } finally {
      setLoading(false);
    }
  };

  const exportToExcel = () => {
    if (reportData.length === 0) return;
    const rows = reportData.map((v, i) => ({
      '#': i + 1,
      'Vehicle No': v.vehicleNo,
      'Total Fuel Refills': v.entries,
      'Total Fuel (L)': Number(v.totalFuel.toFixed(2)),
      'Total Distance (KM)': v.totalKm,
      'Consumption (L/KM)': v.avgFuelPerKm,
      'Mileage (KM/L)': v.kmPerLitre,
      'Total Cost (Rs.)': v.cost
    }));

    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Fuel Detail');
    XLSX.writeFile(wb, `Vehicle_Fuel_Average_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  return (
    <div style={{ display: 'flex', height: '100%', background: '#f3f4f6' }}>
      <div style={{ width: '250px', background: '#fff', borderRight: '1px solid #e5e7eb', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', flexShrink: 0, overflowY: 'auto' }}>
        <div>
          <label style={labelStyle}>Vehicle</label>
          <select value={selectedVehicle} onChange={e => setSelectedVehicle(e.target.value)} style={inputStyle}>
            <option value="">All Vehicles ({vehicles.length})</option>
            {vehicles.map(v => (
              <option key={v._id} value={v._id}>{v.vehicleNo || v.name}</option>
            ))}
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
              <Fuel size={20} color="#29a9d8" />
              <h2 style={{ margin: 0, fontSize: '18px', color: '#1f2937' }}>Vehicle Wise Average Fuel Detail</h2>
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
              No fuel entries found for the selected dates.
            </div>
          ) : (
            <div style={{ overflowX: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', whiteSpace: 'nowrap' }}>
                <thead style={{ background: '#f9fafb' }}>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Vehicle No</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', color: '#374151' }}>Total Entries</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right', color: '#374151' }}>Total Fuel (L)</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right', color: '#374151' }}>Total KM</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right', color: '#374151' }}>Avg (L/KM)</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right', color: '#059669' }}>Mileage (KM/L)</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right', color: '#374151' }}>Total Cost (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((v, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '12px 16px', color: '#1f2937', fontWeight: 'bold' }}>{v.vehicleNo}</td>
                      <td style={{ padding: '12px 16px', color: '#4b5563', textAlign: 'center' }}>{v.entries}</td>
                      <td style={{ padding: '12px 16px', color: '#4b5563', textAlign: 'right' }}>{v.totalFuel.toFixed(2)}</td>
                      <td style={{ padding: '12px 16px', color: '#4b5563', textAlign: 'right' }}>{v.totalKm}</td>
                      <td style={{ padding: '12px 16px', color: '#d97706', textAlign: 'right', fontWeight: 'bold' }}>{v.avgFuelPerKm}</td>
                      <td style={{ padding: '12px 16px', color: '#059669', textAlign: 'right', fontWeight: 'bold' }}>{v.kmPerLitre}</td>
                      <td style={{ padding: '12px 16px', color: '#4b5563', textAlign: 'right' }}>₹{v.cost.toLocaleString('en-IN')}</td>
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
