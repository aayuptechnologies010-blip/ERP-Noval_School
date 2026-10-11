import React, { useState, useEffect } from 'react';
import { Eye, Download, Bus } from 'lucide-react';
import * as XLSX from 'xlsx';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5005';
const inputStyle = { width: '100%', padding: '7px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none', background: '#fff' };
const labelStyle = { display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '4px', color: '#374151' };

export default function VehicleWiseTransportSummary() {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState('All');
  const [reportData, setReportData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  useEffect(() => {
    fetch(`${API_URL}/api/transport/vehicles`, { headers: getHeaders() })
      .then(r => r.json())
      .then(d => setVehicles(Array.isArray(d) ? d : []))
      .catch(console.error);

    handleShow();
  }, []);

  const handleShow = async () => {
    setLoading(true);
    setError(null);
    try {
      const [vRes, sRes] = await Promise.all([
        fetch(`${API_URL}/api/transport/vehicles`, { headers: getHeaders() }),
        fetch(`${API_URL}/api/students`, { headers: getHeaders() })
      ]);
      const vData = await vRes.json();
      const sData = await sRes.json();

      const vList = Array.isArray(vData) ? vData : [];
      const sList = Array.isArray(sData) ? sData : (sData.students || []);

      // Calculate occupants and collection per vehicle
      const vMap = {};
      vList.forEach(v => {
        const vKey = (v.vehicleNo || v.name || '').trim().toUpperCase();
        vMap[vKey] = {
          id: v._id,
          vehicleNo: v.vehicleNo || v.name || 'Unnamed Bus',
          route: v.route?.routeName || v.routeName || '-',
          driver: v.driverName || v.driver?.name || 'Assigned Driver',
          driverMobile: v.driverMobile || v.driver?.mobile || '9999999999',
          capacity: v.capacity || 40,
          occupied: 0,
          monthlyCollection: 0
        };
      });

      // Accumulate student transport data
      sList.forEach(s => {
        const t = s.transportDetails || {};
        if (t.isTransportStudent || s.transportAssigned || s.vehicleNo) {
          const vName = (s.vehicleNo || t.vehicle?.vehicleNo || 'Bus No. 1').trim().toUpperCase();
          const fare = Number(s.transportFee || t.transportFee || 0) || 0;
          const rName = s.transportRoute || t.route?.routeName || '';

          if (!vMap[vName]) {
            vMap[vName] = {
              id: vName,
              vehicleNo: vName,
              route: rName || '-',
              driver: 'Assigned Driver',
              driverMobile: '9999999999',
              capacity: 40,
              occupied: 0,
              monthlyCollection: 0
            };
          }
          vMap[vName].occupied += 1;
          vMap[vName].monthlyCollection += fare;
          if (vMap[vName].route === '-' && rName) {
            vMap[vName].route = rName;
          }
        }
      });

      const list = Object.values(vMap).map(v => ({
        ...v,
        available: Math.max(0, v.capacity - v.occupied)
      })).sort((a, b) => b.occupied - a.occupied);

      setReportData(list);
    } catch {
      setError('Server connection error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedVehicle || selectedVehicle === 'All') {
      setFilteredData(reportData);
    } else {
      const selObj = vehicles.find(v => v._id === selectedVehicle);
      const targetNo = (selObj?.vehicleNo || selectedVehicle).toUpperCase();
      setFilteredData(reportData.filter(v => v.vehicleNo.toUpperCase() === targetNo));
    }
  }, [reportData, selectedVehicle, vehicles]);

  const handleExportExcel = () => {
    if (filteredData.length === 0) return;
    const exportRows = filteredData.map((v, index) => ({
      'SN': index + 1,
      'VEHICLE NO': v.vehicleNo,
      'PRIMARY ROUTE': v.route,
      'DRIVER NAME': v.driver,
      'DRIVER CONTACT': v.driverMobile,
      'CAPACITY': v.capacity,
      'OCCUPIED SEATS': v.occupied,
      'VACANT SEATS': v.available,
      'MONTHLY FARE (₹)': v.monthlyCollection
    }));

    const ws = XLSX.utils.json_to_sheet(exportRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Vehicle_Transport_Summary');
    XLSX.writeFile(wb, `Vehicle_Wise_Transport_Summary_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const totalCapacity = filteredData.reduce((a, v) => a + (v.capacity || 0), 0);
  const totalOccupied = filteredData.reduce((a, v) => a + v.occupied, 0);
  const totalRevenue = filteredData.reduce((a, v) => a + v.monthlyCollection, 0);

  return (
    <div style={{ display: 'flex', height: '100%', background: '#f8fafc', overflow: 'hidden' }}>
      {/* ── LEFT CONTROL PANEL ── */}
      <div style={{ width: '260px', background: '#fff', borderRight: '1px solid #e2e8f0', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px', flexShrink: 0 }}>
        <div>
          <label style={labelStyle}>Select Vehicle</label>
          <select value={selectedVehicle} onChange={e => setSelectedVehicle(e.target.value)} style={inputStyle}>
            <option value="All">All Vehicles</option>
            {vehicles.map(v => <option key={v._id} value={v._id}>{v.vehicleNo || v.name}</option>)}
          </select>
        </div>

        <button
          onClick={handleShow}
          disabled={loading}
          style={{
            background: '#2563eb',
            color: '#fff',
            border: 'none',
            padding: '8px',
            borderRadius: '4px',
            fontSize: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            fontWeight: '600'
          }}
        >
          <Eye size={14} /> {loading ? 'Fetching...' : 'Refresh Summary'}
        </button>

        <div style={{ background: '#f1f5f9', padding: '12px', borderRadius: '6px', border: '1px solid #e2e8f0', marginTop: '10px' }}>
          <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#475569', marginBottom: '8px', textTransform: 'uppercase' }}>
            Fleet Overview
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '12px' }}>
            <span style={{ color: '#64748b' }}>Buses in Fleet:</span>
            <span style={{ fontWeight: 'bold', color: '#0f172a' }}>{filteredData.length}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '12px' }}>
            <span style={{ color: '#64748b' }}>Total Occupied:</span>
            <span style={{ fontWeight: 'bold', color: '#16a34a' }}>{totalOccupied}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
            <span style={{ color: '#64748b' }}>Fleet Revenue:</span>
            <span style={{ fontWeight: 'bold', color: '#2563eb' }}>₹{totalRevenue.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* ── RIGHT MAIN REPORT CONTENT ── */}
      <div style={{ flex: 1, padding: '18px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '14px', marginBottom: '14px' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Bus size={18} color="#2563eb" /> Vehicle Wise Transport Summary
              </h2>
              <p style={{ margin: '3px 0 0 0', fontSize: '11px', color: '#64748b' }}>
                Bus-wise student occupancy, drivers, capacity utilization, and monthly collections
              </p>
            </div>
            
            {filteredData.length > 0 && (
              <button
                onClick={handleExportExcel}
                style={{
                  background: '#059669',
                  color: '#fff',
                  border: 'none',
                  padding: '7px 14px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontWeight: '600'
                }}
              >
                <Download size={14} /> Export Excel (.xlsx)
              </button>
            )}
          </div>

          {error && <div style={{ padding: '10px', background: '#fee2e2', color: '#991b1b', borderRadius: '4px', marginBottom: '14px', fontSize: '12px' }}>{error}</div>}

          <div style={{ flex: 1, overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', color: '#1e293b' }}>
              <thead>
                <tr style={{ background: '#fef3c7', borderBottom: '2px solid #cbd5e1' }}>
                  <th style={{ padding: '8px 8px', textAlign: 'center', borderRight: '1px solid #e2e8f0', width: '40px' }}>SN</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left', borderRight: '1px solid #e2e8f0' }}>VEHICLE NO</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left', borderRight: '1px solid #e2e8f0' }}>PRIMARY ROUTE</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left', borderRight: '1px solid #e2e8f0' }}>DRIVER</th>
                  <th style={{ padding: '8px 10px', textAlign: 'center', borderRight: '1px solid #e2e8f0', width: '80px' }}>CAPACITY</th>
                  <th style={{ padding: '8px 10px', textAlign: 'center', borderRight: '1px solid #e2e8f0', width: '90px' }}>OCCUPIED</th>
                  <th style={{ padding: '8px 10px', textAlign: 'center', borderRight: '1px solid #e2e8f0', width: '80px' }}>VACANT</th>
                  <th style={{ padding: '8px 12px', textAlign: 'right', width: '140px' }}>MONTHLY FARE (₹)</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                      Loading fleet summary...
                    </td>
                  </tr>
                ) : filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
                      No vehicles found.
                    </td>
                  </tr>
                ) : (
                  filteredData.map((v, i) => (
                    <tr
                      key={v.id || i}
                      style={{
                        borderBottom: '1px solid #f1f5f9',
                        background: i % 2 === 0 ? '#ffffff' : '#f8fafc'
                      }}
                    >
                      <td style={{ padding: '6px 8px', textAlign: 'center', borderRight: '1px solid #f1f5f9', color: '#64748b' }}>
                        {i + 1}
                      </td>
                      <td style={{ padding: '6px 12px', borderRight: '1px solid #f1f5f9', fontWeight: 'bold', color: '#0f172a' }}>
                        {v.vehicleNo}
                      </td>
                      <td style={{ padding: '6px 12px', borderRight: '1px solid #f1f5f9', color: '#475569' }}>
                        {v.route}
                      </td>
                      <td style={{ padding: '6px 12px', borderRight: '1px solid #f1f5f9', color: '#334155' }}>
                        {v.driver}
                      </td>
                      <td style={{ padding: '6px 10px', textAlign: 'center', borderRight: '1px solid #f1f5f9', color: '#475569' }}>
                        {v.capacity}
                      </td>
                      <td style={{ padding: '6px 10px', textAlign: 'center', borderRight: '1px solid #f1f5f9', fontWeight: 'bold', color: '#059669' }}>
                        {v.occupied}
                      </td>
                      <td style={{ padding: '6px 10px', textAlign: 'center', borderRight: '1px solid #f1f5f9', color: v.available > 0 ? '#d97706' : '#dc2626' }}>
                        {v.available}
                      </td>
                      <td style={{ padding: '6px 12px', textAlign: 'right', fontWeight: 'bold', color: '#2563eb' }}>
                        ₹{v.monthlyCollection.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              {filteredData.length > 0 && (
                <tfoot style={{ background: '#f1f5f9', fontWeight: 'bold', borderTop: '2px solid #cbd5e1' }}>
                  <tr>
                    <td colSpan="4" style={{ padding: '8px 12px', textAlign: 'right', color: '#0f172a' }}>
                      Fleet Total:
                    </td>
                    <td style={{ padding: '8px 10px', textAlign: 'center' }}>
                      {totalCapacity}
                    </td>
                    <td style={{ padding: '8px 10px', textAlign: 'center', color: '#059669' }}>
                      {totalOccupied}
                    </td>
                    <td style={{ padding: '8px 10px', textAlign: 'center' }}>
                      {Math.max(0, totalCapacity - totalOccupied)}
                    </td>
                    <td style={{ padding: '8px 12px', textAlign: 'right', color: '#2563eb' }}>
                      ₹{totalRevenue.toLocaleString('en-IN')}
                    </td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

