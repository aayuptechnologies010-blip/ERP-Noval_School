import React, { useState, useEffect } from 'react';
import { Eye, Download, Bus, Search } from 'lucide-react';
import * as XLSX from 'xlsx';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5005';
const inputStyle = { width: '100%', padding: '7px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none', background: '#fff' };
const labelStyle = { display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '4px', color: '#374151' };

export default function AssignedTransportReport() {
  const [classes, setClasses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedRoute, setSelectedRoute] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [reportData, setReportData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  useEffect(() => {
    fetch(`${API_URL}/api/school-classes`, { headers: getHeaders() })
      .then(r => r.json())
      .then(d => setClasses(Array.isArray(d) ? d : (d?.data || [])))
      .catch(console.error);

    fetch(`${API_URL}/api/transport/routes`, { headers: getHeaders() })
      .then(r => r.json())
      .then(d => setRoutes(Array.isArray(d) ? d : []))
      .catch(console.error);

    handleShow();
  }, []);

  const handleShow = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/students`, { headers: getHeaders() });
      const data = await res.json();
      if (res.ok) {
        let students = Array.isArray(data) ? data : (data.students || []);

        const transportStudents = students.filter(s => {
          const t = s.transportDetails || {};
          return t.isTransportStudent || t.stop || t.route || s.transportAssigned || s.transportStop;
        });

        const formatted = transportStudents.map((s, idx) => {
          const admNo = s.academicDetails?.admissionNumber || s.admissionNumber || s.academicDetails?.admissionNo || '-';
          const p = s.personalDetails || {};
          const fullName = `${p.firstName || s.firstName || ''} ${p.lastName || s.lastName || ''}`.trim() || '-';
          const cls = `${s.academicDetails?.class || s.class?.className || s.class?.name || s.class || ''}${s.academicDetails?.section ? '-' + s.academicDetails.section : ''}`.trim() || '-';
          const route = s.transportRoute || s.transportDetails?.route?.routeName || (typeof s.transportDetails?.route === 'string' ? s.transportDetails.route : '-') || '-';
          const stop = s.transportStop || s.transportDetails?.stop?.stopName || (typeof s.transportDetails?.stop === 'string' ? s.transportDetails.stop : '-') || '-';
          const vehicle = s.vehicleNo || s.transportDetails?.vehicle?.vehicleNo || '-';
          const fare = s.transportFee || s.transportDetails?.transportFee || 0;
          const contact = s.contactAddress?.contactNumber || p.fatherDetails?.mobileNo || s.phone || '-';
          const address = s.contactAddress?.currentAddress || s.address || '-';

          return {
            id: s._id,
            sn: idx + 1,
            admNo,
            name: fullName,
            classStr: cls,
            rawClassId: s.academicDetails?.class || s.class?._id || '',
            route,
            stop,
            vehicle,
            fare: Number(fare) || 0,
            contact,
            address
          };
        });

        setReportData(formatted);
      } else {
        setError(data.message || 'Failed to fetch transport students');
      }
    } catch {
      setError('Server connection error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let list = [...reportData];

    if (selectedClass && selectedClass !== 'All') {
      const selClsObj = classes.find(c => c._id === selectedClass);
      const targetName = (selClsObj?.className || selClsObj?.name || selectedClass).toString().trim().toUpperCase();
      list = list.filter(item => {
        const itemCls = item.classStr.toUpperCase();
        return itemCls.startsWith(targetName) || item.rawClassId === selectedClass;
      });
    }

    if (selectedRoute && selectedRoute !== 'All') {
      const selRouteObj = routes.find(r => r._id === selectedRoute);
      const targetRoute = (selRouteObj?.routeName || selRouteObj?.name || selectedRoute).toString().trim().toUpperCase();
      list = list.filter(item => item.route.toUpperCase() === targetRoute);
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(item =>
        item.name.toLowerCase().includes(q) ||
        item.admNo.toLowerCase().includes(q) ||
        item.stop.toLowerCase().includes(q) ||
        item.route.toLowerCase().includes(q) ||
        item.contact.toLowerCase().includes(q)
      );
    }

    setFilteredData(list);
  }, [reportData, selectedClass, selectedRoute, searchTerm, classes, routes]);

  const handleExportExcel = () => {
    if (filteredData.length === 0) return;
    const exportRows = filteredData.map((d, index) => ({
      'SN': index + 1,
      'ADM NO.': d.admNo,
      'STUDENT NAME': d.name,
      'CLASS': d.classStr,
      'ROUTE': d.route,
      'BUS STOP': d.stop,
      'VEHICLE NO': d.vehicle,
      'MONTHLY FARE': d.fare,
      'CONTACT': d.contact,
      'ADDRESS': d.address
    }));

    const ws = XLSX.utils.json_to_sheet(exportRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Assigned_Transport');
    XLSX.writeFile(wb, `Assigned_Transport_Report_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const totalFare = filteredData.reduce((acc, curr) => acc + (curr.fare || 0), 0);

  return (
    <div style={{ display: 'flex', height: '100%', background: '#f8fafc', overflow: 'hidden' }}>
      {/* ── LEFT CONTROL PANEL ── */}
      <div style={{ width: '260px', background: '#fff', borderRight: '1px solid #e2e8f0', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px', flexShrink: 0 }}>
        <div>
          <label style={labelStyle}>Class Filter</label>
          <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} style={inputStyle}>
            <option value="All">All Classes ({classes.length})</option>
            {classes.map(c => <option key={c._id} value={c._id}>{c.className || c.name}</option>)}
          </select>
        </div>

        <div>
          <label style={labelStyle}>Route Filter</label>
          <select value={selectedRoute} onChange={e => setSelectedRoute(e.target.value)} style={inputStyle}>
            <option value="All">All Routes ({routes.length})</option>
            {routes.map(r => <option key={r._id} value={r._id}>{r.routeName || r.name}</option>)}
          </select>
        </div>

        <div>
          <label style={labelStyle}>Search</label>
          <input
            type="text"
            placeholder="Search name, adm, stop..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={inputStyle}
          />
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
          <Eye size={14} /> {loading ? 'Fetching...' : 'Refresh Report'}
        </button>

        <div style={{ background: '#f1f5f9', padding: '12px', borderRadius: '6px', border: '1px solid #e2e8f0', marginTop: '10px' }}>
          <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#475569', marginBottom: '8px', textTransform: 'uppercase' }}>
            Summary
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '12px' }}>
            <span style={{ color: '#64748b' }}>Assigned Students:</span>
            <span style={{ fontWeight: 'bold', color: '#0f172a' }}>{filteredData.length}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
            <span style={{ color: '#64748b' }}>Total Monthly Fare:</span>
            <span style={{ fontWeight: 'bold', color: '#16a34a' }}>₹{totalFare.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* ── RIGHT MAIN REPORT CONTENT ── */}
      <div style={{ flex: 1, padding: '18px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '14px', marginBottom: '14px' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Bus size={18} color="#2563eb" /> Assigned Transport Report
              </h2>
              <p style={{ margin: '3px 0 0 0', fontSize: '11px', color: '#64748b' }}>
                Students with currently active route, bus stop, and vehicle allotment
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
                  <th style={{ padding: '8px 6px', textAlign: 'center', borderRight: '1px solid #e2e8f0', width: '40px' }}>SN</th>
                  <th style={{ padding: '8px 8px', textAlign: 'center', borderRight: '1px solid #e2e8f0', width: '70px' }}>ADM NO</th>
                  <th style={{ padding: '8px 10px', textAlign: 'left', borderRight: '1px solid #e2e8f0' }}>STUDENT NAME</th>
                  <th style={{ padding: '8px 8px', textAlign: 'center', borderRight: '1px solid #e2e8f0', width: '65px' }}>CLASS</th>
                  <th style={{ padding: '8px 10px', textAlign: 'left', borderRight: '1px solid #e2e8f0' }}>ROUTE</th>
                  <th style={{ padding: '8px 10px', textAlign: 'left', borderRight: '1px solid #e2e8f0' }}>STOP</th>
                  <th style={{ padding: '8px 10px', textAlign: 'center', borderRight: '1px solid #e2e8f0', width: '90px' }}>VEHICLE</th>
                  <th style={{ padding: '8px 8px', textAlign: 'right', borderRight: '1px solid #e2e8f0', width: '75px' }}>FARE (₹)</th>
                  <th style={{ padding: '8px 10px', textAlign: 'center', width: '95px' }}>CONTACT</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="9" style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                      Loading assigned transport students...
                    </td>
                  </tr>
                ) : filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="9" style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
                      No students found with assigned transport.
                    </td>
                  </tr>
                ) : (
                  filteredData.map((s, i) => (
                    <tr
                      key={s.id || i}
                      style={{
                        borderBottom: '1px solid #f1f5f9',
                        background: i % 2 === 0 ? '#ffffff' : '#f8fafc'
                      }}
                    >
                      <td style={{ padding: '6px 6px', textAlign: 'center', borderRight: '1px solid #f1f5f9', color: '#64748b' }}>
                        {s.sn}
                      </td>
                      <td style={{ padding: '6px 8px', textAlign: 'center', borderRight: '1px solid #f1f5f9', fontWeight: 'bold', color: '#0f172a' }}>
                        {s.admNo}
                      </td>
                      <td style={{ padding: '6px 10px', borderRight: '1px solid #f1f5f9', fontWeight: '600', color: '#1e293b' }}>
                        {s.name}
                      </td>
                      <td style={{ padding: '6px 8px', textAlign: 'center', borderRight: '1px solid #f1f5f9', color: '#475569' }}>
                        {s.classStr}
                      </td>
                      <td style={{ padding: '6px 10px', borderRight: '1px solid #f1f5f9', color: '#475569' }}>
                        {s.route}
                      </td>
                      <td style={{ padding: '6px 10px', borderRight: '1px solid #f1f5f9', fontWeight: '500', color: '#2563eb' }}>
                        {s.stop}
                      </td>
                      <td style={{ padding: '6px 10px', textAlign: 'center', borderRight: '1px solid #f1f5f9', color: '#475569' }}>
                        {s.vehicle}
                      </td>
                      <td style={{ padding: '6px 8px', textAlign: 'right', borderRight: '1px solid #f1f5f9', fontWeight: 'bold', color: '#059669' }}>
                        ₹{s.fare}
                      </td>
                      <td style={{ padding: '6px 10px', textAlign: 'center', color: '#334155' }}>
                        {s.contact}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              {filteredData.length > 0 && (
                <tfoot style={{ background: '#f1f5f9', fontWeight: 'bold', borderTop: '2px solid #cbd5e1' }}>
                  <tr>
                    <td colSpan="7" style={{ padding: '8px 10px', textAlign: 'right', color: '#0f172a' }}>
                      Total ({filteredData.length} Students):
                    </td>
                    <td style={{ padding: '8px 8px', textAlign: 'right', color: '#16a34a' }}>
                      ₹{totalFare.toLocaleString('en-IN')}
                    </td>
                    <td></td>
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

