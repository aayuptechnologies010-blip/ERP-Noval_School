import React, { useState, useEffect } from 'react';
import { Eye, Download, Bus } from 'lucide-react';
import * as XLSX from 'xlsx';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5005';
const inputStyle = { width: '100%', padding: '7px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none', background: '#fff' };
const labelStyle = { display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '4px', color: '#374151' };

export default function EstimatedTransportDetails() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('All');
  const [reportData, setReportData] = useState([]);
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

        // Filter transport students
        let transportStudents = students.filter(s => {
          const t = s.transportDetails || {};
          return t.isTransportStudent || t.stop || t.route || s.transportAssigned || s.transportStop;
        });

        if (selectedClass && selectedClass !== 'All') {
          const selClsObj = classes.find(c => c._id === selectedClass);
          const targetName = (selClsObj?.className || selClsObj?.name || selectedClass).toString().trim().toUpperCase();
          transportStudents = transportStudents.filter(s => {
            const sc = (s.academicDetails?.class || s.class?.className || s.class?.name || s.class || '').toString().trim().toUpperCase();
            return sc.startsWith(targetName) || s.academicDetails?.class === selectedClass || s.class?._id === selectedClass;
          });
        }

        // Group by Route Name
        const grouped = transportStudents.reduce((acc, s) => {
          const route = s.transportRoute || s.transportDetails?.route?.routeName || (typeof s.transportDetails?.route === 'string' ? s.transportDetails.route : 'Other Routes') || 'Other Routes';
          const fare = Number(s.transportFee || s.transportDetails?.transportFee || 0) || 0;
          
          if (!acc[route]) {
            acc[route] = {
              route,
              students: 0,
              estimatedMonthly: 0,
              avgFare: 0,
              stops: new Set()
            };
          }
          acc[route].students += 1;
          acc[route].estimatedMonthly += fare;
          if (s.transportStop) acc[route].stops.add(s.transportStop);
          return acc;
        }, {});

        const list = Object.values(grouped).map(g => ({
          route: g.route,
          students: g.students,
          stopsCount: g.stops.size,
          estimatedMonthly: g.estimatedMonthly,
          estimatedAnnual: g.estimatedMonthly * 12,
          avgFare: Math.round(g.estimatedMonthly / (g.students || 1))
        })).sort((a, b) => b.students - a.students);

        setReportData(list);
      } else {
        setError(data.message || 'Failed to fetch estimated details');
      }
    } catch {
      setError('Server connection error');
    } finally {
      setLoading(false);
    }
  };

  const handleExportExcel = () => {
    if (reportData.length === 0) return;
    const exportRows = reportData.map((d, index) => ({
      'SN': index + 1,
      'ROUTE NAME': d.route,
      'ACTIVE STOPS': d.stopsCount,
      'NO. OF STUDENTS': d.students,
      'AVG FARE (₹)': d.avgFare,
      'EST. MONTHLY COLLECTION (₹)': d.estimatedMonthly,
      'EST. ANNUAL COLLECTION (₹)': d.estimatedAnnual
    }));

    const ws = XLSX.utils.json_to_sheet(exportRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Estimated_Collection');
    XLSX.writeFile(wb, `Estimated_Transport_Details_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const totalStudents = reportData.reduce((a, r) => a + r.students, 0);
  const totalMonthly = reportData.reduce((a, r) => a + r.estimatedMonthly, 0);
  const totalAnnual = reportData.reduce((a, r) => a + r.estimatedAnnual, 0);

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
          <Eye size={14} /> {loading ? 'Calculating...' : 'Recalculate Estimate'}
        </button>

        <div style={{ background: '#f1f5f9', padding: '12px', borderRadius: '6px', border: '1px solid #e2e8f0', marginTop: '10px' }}>
          <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#475569', marginBottom: '8px', textTransform: 'uppercase' }}>
            Overall Projection
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '12px' }}>
            <span style={{ color: '#64748b' }}>Active Routes:</span>
            <span style={{ fontWeight: 'bold', color: '#0f172a' }}>{reportData.length}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '12px' }}>
            <span style={{ color: '#64748b' }}>Total Commuters:</span>
            <span style={{ fontWeight: 'bold', color: '#0f172a' }}>{totalStudents}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '12px' }}>
            <span style={{ color: '#64748b' }}>Monthly Target:</span>
            <span style={{ fontWeight: 'bold', color: '#16a34a' }}>₹{totalMonthly.toLocaleString('en-IN')}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
            <span style={{ color: '#64748b' }}>Annual Projection:</span>
            <span style={{ fontWeight: 'bold', color: '#2563eb' }}>₹{totalAnnual.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* ── RIGHT MAIN REPORT CONTENT ── */}
      <div style={{ flex: 1, padding: '18px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '14px', marginBottom: '14px' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Bus size={18} color="#2563eb" /> Estimated Transport Details & Projections
              </h2>
              <p style={{ margin: '3px 0 0 0', fontSize: '11px', color: '#64748b' }}>
                Route-wise commuter headcounts, average fares, and projected revenue collections
              </p>
            </div>
            
            {reportData.length > 0 && (
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
                  <th style={{ padding: '8px 10px', textAlign: 'center', borderRight: '1px solid #e2e8f0', width: '40px' }}>SN</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left', borderRight: '1px solid #e2e8f0' }}>ROUTE NAME</th>
                  <th style={{ padding: '8px 10px', textAlign: 'center', borderRight: '1px solid #e2e8f0', width: '90px' }}>STOPS</th>
                  <th style={{ padding: '8px 10px', textAlign: 'center', borderRight: '1px solid #e2e8f0', width: '110px' }}>COMMUTERS</th>
                  <th style={{ padding: '8px 10px', textAlign: 'right', borderRight: '1px solid #e2e8f0', width: '110px' }}>AVG FARE</th>
                  <th style={{ padding: '8px 12px', textAlign: 'right', borderRight: '1px solid #e2e8f0', width: '160px' }}>EST. MONTHLY (₹)</th>
                  <th style={{ padding: '8px 12px', textAlign: 'right', width: '160px' }}>EST. ANNUAL (₹)</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                      Calculating estimated transport collections...
                    </td>
                  </tr>
                ) : reportData.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
                      No active transport commuters found.
                    </td>
                  </tr>
                ) : (
                  reportData.map((r, i) => (
                    <tr
                      key={i}
                      style={{
                        borderBottom: '1px solid #f1f5f9',
                        background: i % 2 === 0 ? '#ffffff' : '#f8fafc'
                      }}
                    >
                      <td style={{ padding: '6px 10px', textAlign: 'center', borderRight: '1px solid #f1f5f9', color: '#64748b' }}>
                        {i + 1}
                      </td>
                      <td style={{ padding: '6px 12px', borderRight: '1px solid #f1f5f9', fontWeight: 'bold', color: '#1e293b' }}>
                        {r.route}
                      </td>
                      <td style={{ padding: '6px 10px', textAlign: 'center', borderRight: '1px solid #f1f5f9', color: '#475569' }}>
                        {r.stopsCount}
                      </td>
                      <td style={{ padding: '6px 10px', textAlign: 'center', borderRight: '1px solid #f1f5f9', fontWeight: '600', color: '#0f172a' }}>
                        {r.students}
                      </td>
                      <td style={{ padding: '6px 10px', textAlign: 'right', borderRight: '1px solid #f1f5f9', color: '#64748b' }}>
                        ₹{r.avgFare}
                      </td>
                      <td style={{ padding: '6px 12px', textAlign: 'right', borderRight: '1px solid #f1f5f9', fontWeight: 'bold', color: '#16a34a' }}>
                        ₹{r.estimatedMonthly.toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '6px 12px', textAlign: 'right', fontWeight: 'bold', color: '#2563eb' }}>
                        ₹{r.estimatedAnnual.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              {reportData.length > 0 && (
                <tfoot style={{ background: '#f1f5f9', fontWeight: 'bold', borderTop: '2px solid #cbd5e1' }}>
                  <tr>
                    <td colSpan="3" style={{ padding: '8px 12px', textAlign: 'right', color: '#0f172a' }}>
                      Total Collection:
                    </td>
                    <td style={{ padding: '8px 10px', textAlign: 'center', color: '#0f172a' }}>
                      {totalStudents}
                    </td>
                    <td></td>
                    <td style={{ padding: '8px 12px', textAlign: 'right', color: '#16a34a' }}>
                      ₹{totalMonthly.toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '8px 12px', textAlign: 'right', color: '#2563eb' }}>
                      ₹{totalAnnual.toLocaleString('en-IN')}
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

