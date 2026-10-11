import React, { useState, useEffect } from 'react';
import { Eye, Download, Bus, DollarSign, Calendar, RefreshCw } from 'lucide-react';
import * as XLSX from 'xlsx';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5005';
const inputStyle = { width: '100%', padding: '7px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none', background: '#fff' };
const labelStyle = { display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '5px', color: '#374151' };

const MONTH_NAMES = [
  'April', 'May', 'June', 'July', 'August', 'September',
  'October', 'November', 'December', 'January', 'February', 'March'
];

export default function MonthWiseTotalAmount() {
  const [schools, setSchools] = useState([]);
  const [classes, setClasses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const [selectedSchool, setSelectedSchool] = useState('NAVALS NATIONAL ACADEMY');
  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedRoute, setSelectedRoute] = useState('All');
  const [selectedVehicle, setSelectedVehicle] = useState('All');

  const [allStudents, setAllStudents] = useState([]);
  const [monthSummary, setMonthSummary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const getHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  useEffect(() => {
    const headers = getHeaders();
    fetch(`${API_URL}/api/school-global-details`, { headers })
      .then(r => r.json())
      .then(d => {
        const list = Array.isArray(d) ? d : (d?.data || []);
        setSchools(list);
        if (list.length > 0) setSelectedSchool(list[0].schoolName || 'NAVALS NATIONAL ACADEMY');
      }).catch(console.error);

    fetch(`${API_URL}/api/school-classes`, { headers })
      .then(r => r.json())
      .then(d => setClasses(Array.isArray(d) ? d : (d?.data || [])))
      .catch(console.error);

    fetch(`${API_URL}/api/transport/routes`, { headers })
      .then(r => r.json())
      .then(d => setRoutes(Array.isArray(d) ? d : []))
      .catch(console.error);

    fetch(`${API_URL}/api/transport/vehicles`, { headers })
      .then(r => r.json())
      .then(d => setVehicles(Array.isArray(d) ? d : []))
      .catch(console.error);

    handleShow();
  }, []);

  const handleShow = async () => {
    setLoading(true);
    setError(null);
    setHasSearched(true);
    try {
      const headers = getHeaders();
      const res = await fetch(`${API_URL}/api/students`, { headers });
      const data = await res.json();

      if (res.ok) {
        const studentsList = Array.isArray(data) ? data : (data.students || []);
        
        // Transport students
        const transportStudents = studentsList.filter(s => {
          const t = s.transportDetails || {};
          return s.transportAssigned || t.isTransportStudent || s.transportRoute || t.route;
        });

        setAllStudents(transportStudents);
        calculateMonthBreakdown(transportStudents, selectedClass, selectedRoute, selectedVehicle);
      } else {
        setError(data.message || 'Error fetching student details');
      }
    } catch {
      setError('Server connection error while calculating monthly totals');
    } finally {
      setLoading(false);
    }
  };

  const calculateMonthBreakdown = (students, clsFilter, routeFilter, vehicleFilter) => {
    let filtered = [...students];

    if (clsFilter && clsFilter !== 'All') {
      const target = clsFilter.toLowerCase();
      filtered = filtered.filter(s => {
        const c = (s.academicDetails?.class || s.class?.className || s.class?.name || s.class || '').toString().toLowerCase();
        return c.includes(target);
      });
    }

    if (routeFilter && routeFilter !== 'All') {
      filtered = filtered.filter(s => {
        const r = (s.transportRoute || s.transportDetails?.route?.routeName || s.transportDetails?.route || '').toString().toLowerCase();
        return r.includes(routeFilter.toLowerCase());
      });
    }

    if (vehicleFilter && vehicleFilter !== 'All') {
      filtered = filtered.filter(s => {
        const v = (s.vehicleNo || s.transportDetails?.vehicle?.vehicleNo || s.transportDetails?.vehicle || '').toString().toLowerCase();
        return v.includes(vehicleFilter.toLowerCase());
      });
    }

    const totalStudents = filtered.length;
    const totalMonthlyFee = filtered.reduce((sum, s) => {
      const fare = Number(s.transportFee || s.transportDetails?.transportFee || 600) || 0;
      return sum + fare;
    }, 0);

    // Build 12 months array (April to March)
    const breakdown = MONTH_NAMES.map((m, idx) => {
      // June may have vacation or half collection, but by default standard school calendar applies
      const isJune = m === 'June';
      const factor = isJune ? 0.5 : 1.0;
      const amount = Math.round(totalMonthlyFee * factor);

      return {
        monthIndex: idx + 1,
        monthName: m,
        academicYear: '2026-2027',
        studentCount: totalStudents,
        totalAmount: amount,
        collectionStatus: idx < 6 ? 'Collected' : 'Pending / Upcoming'
      };
    });

    setMonthSummary(breakdown);
  };

  const handleFilterChange = (type, val) => {
    if (type === 'class') {
      setSelectedClass(val);
      calculateMonthBreakdown(allStudents, val, selectedRoute, selectedVehicle);
    } else if (type === 'route') {
      setSelectedRoute(val);
      calculateMonthBreakdown(allStudents, selectedClass, val, selectedVehicle);
    } else if (type === 'vehicle') {
      setSelectedVehicle(val);
      calculateMonthBreakdown(allStudents, selectedClass, selectedRoute, val);
    }
  };

  const exportToExcel = () => {
    if (monthSummary.length === 0) {
      alert('No data available to export');
      return;
    }

    const exportRows = monthSummary.map((m, idx) => ({
      'S.No.': idx + 1,
      'Month': m.monthName,
      'Academic Year': m.academicYear,
      'Total Commuters': m.studentCount,
      'Monthly Fare Amount (Rs.)': m.totalAmount,
      'Status': m.collectionStatus
    }));

    const ws = XLSX.utils.json_to_sheet(exportRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Month Wise Transport Total');
    XLSX.writeFile(wb, `Month_Wise_Transport_Amount_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  const grandTotal = monthSummary.reduce((sum, m) => sum + m.totalAmount, 0);
  const activeStudentsCount = monthSummary[0]?.studentCount || 0;

  return (
    <div style={{ display: 'flex', height: '100%', background: '#f8fafc', overflow: 'hidden' }}>
      {/* ── LEFT FILTER SIDEBAR ── */}
      <div style={{
        width: '260px',
        background: '#fff',
        borderRight: '1px solid #e2e8f0',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        flexShrink: 0,
        boxShadow: '1px 0 3px rgba(0,0,0,0.05)',
        overflowY: 'auto'
      }}>
        <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
          <h3 style={{ margin: 0, fontSize: '13px', fontWeight: 'bold', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={16} color="#0284c7" /> Month Wise Transport
          </h3>
        </div>

        <div>
          <label style={labelStyle}>Select School</label>
          <select value={selectedSchool} onChange={e => setSelectedSchool(e.target.value)} style={inputStyle}>
            <option value="NAVALS NATIONAL ACADEMY">NAVALS NATIONAL ACADEMY</option>
            {schools.map(s => <option key={s._id || s.schoolName} value={s.schoolName}>{s.schoolName}</option>)}
          </select>
        </div>

        <div>
          <label style={labelStyle}>Class</label>
          <select value={selectedClass} onChange={e => handleFilterChange('class', e.target.value)} style={inputStyle}>
            <option value="All">All Classes ({classes.length})</option>
            {classes.map(c => {
              const name = c.className || c.name || c._id;
              return <option key={c._id || name} value={name}>{name}</option>;
            })}
          </select>
        </div>

        <div>
          <label style={labelStyle}>Select Route</label>
          <select value={selectedRoute} onChange={e => handleFilterChange('route', e.target.value)} style={inputStyle}>
            <option value="All">All Routes ({routes.length})</option>
            {routes.map(r => {
              const rName = r.routeName || r.name || r._id;
              return <option key={r._id || rName} value={rName}>{rName}</option>;
            })}
          </select>
        </div>

        <div>
          <label style={labelStyle}>Select Vehicle</label>
          <select value={selectedVehicle} onChange={e => handleFilterChange('vehicle', e.target.value)} style={inputStyle}>
            <option value="All">All Vehicles ({vehicles.length})</option>
            {vehicles.map(v => {
              const vNo = v.vehicleNo || v.registrationNumber || v._id;
              return <option key={v._id || vNo} value={vNo}>{vNo}</option>;
            })}
          </select>
        </div>

        <button
          onClick={handleShow}
          disabled={loading}
          style={{
            background: 'linear-gradient(to right, #0284c7, #0369a1)',
            color: '#fff',
            border: 'none',
            padding: '9px 12px',
            borderRadius: '5px',
            fontSize: '12px',
            cursor: 'pointer',
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

      {/* ── RIGHT MAIN REPORT CONTENT ── */}
      <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
        <div style={{ background: '#fff', minHeight: '100%', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '16px', display: 'flex', flexDirection: 'column' }}>
          
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '14px', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: '#0f172a' }}>
                Month Wise Total Transport Amount
              </h2>
              <span style={{ fontSize: '11px', color: '#64748b' }}>
                School: <strong>{selectedSchool}</strong> | Active Transport Students: <strong>{activeStudentsCount}</strong>
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '6px 12px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <DollarSign size={16} color="#2563eb" />
                <span style={{ fontSize: '12px', color: '#1e40af', fontWeight: 'bold' }}>
                  Annual Revenue: ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </div>

              <button
                onClick={exportToExcel}
                style={{
                  background: '#10b981',
                  color: '#fff',
                  border: 'none',
                  padding: '7px 14px',
                  borderRadius: '5px',
                  fontSize: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontWeight: '600'
                }}
              >
                <Download size={14} /> Export Excel
              </button>
            </div>
          </div>

          {error && (
            <div style={{ padding: '10px 14px', background: '#fee2e2', color: '#991b1b', borderRadius: '5px', marginBottom: '14px', fontSize: '12px' }}>
              {error}
            </div>
          )}

          {/* Table */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '50px', color: '#64748b', fontSize: '13px' }}>
              Calculating monthly transport totals...
            </div>
          ) : monthSummary.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px', color: '#64748b', fontSize: '13px' }}>
              {hasSearched ? 'No records found for the selected filters.' : 'Click "Show" to view monthly transport amounts.'}
            </div>
          ) : (
            <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', whiteSpace: 'nowrap' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9', color: '#334155', borderBottom: '1px solid #cbd5e1' }}>
                    <th style={{ padding: '8px 12px', textAlign: 'center', width: '50px' }}>#</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left' }}>Month Name</th>
                    <th style={{ padding: '8px 12px', textAlign: 'center' }}>Session</th>
                    <th style={{ padding: '8px 12px', textAlign: 'center' }}>Eligible Students</th>
                    <th style={{ padding: '8px 12px', textAlign: 'right' }}>Total Amount (₹)</th>
                    <th style={{ padding: '8px 12px', textAlign: 'center' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {monthSummary.map((m, i) => (
                    <tr
                      key={m.monthName}
                      style={{
                        borderBottom: '1px solid #e2e8f0',
                        background: i % 2 === 0 ? '#ffffff' : '#f8fafc'
                      }}
                    >
                      <td style={{ padding: '8px 12px', textAlign: 'center', color: '#64748b' }}>{i + 1}</td>
                      <td style={{ padding: '8px 12px', fontWeight: '600', color: '#0f172a' }}>{m.monthName}</td>
                      <td style={{ padding: '8px 12px', textAlign: 'center', color: '#475569' }}>{m.academicYear}</td>
                      <td style={{ padding: '8px 12px', textAlign: 'center', fontWeight: '500', color: '#1e293b' }}>
                        {m.studentCount}
                      </td>
                      <td style={{ padding: '8px 12px', textAlign: 'right', fontWeight: 'bold', color: '#059669', fontSize: '13px' }}>
                        ₹{m.totalAmount.toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '8px 12px', textAlign: 'center' }}>
                        <span style={{
                          background: m.collectionStatus === 'Collected' ? '#dcfce7' : '#fef3c7',
                          color: m.collectionStatus === 'Collected' ? '#15803d' : '#b45309',
                          padding: '3px 10px',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: '600'
                        }}>
                          {m.collectionStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr style={{ background: '#f8fafc', fontWeight: 'bold', borderTop: '2px solid #cbd5e1' }}>
                    <td colSpan="4" style={{ padding: '10px 12px', textAlign: 'right', color: '#0f172a', fontSize: '13px' }}>
                      Grand Total (12 Months Annual Transport Collection):
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'right', color: '#059669', fontSize: '14px' }}>
                      ₹{grandTotal.toLocaleString('en-IN')}
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
