import React, { useState, useEffect } from 'react';
import { Eye, Download } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const token = localStorage.getItem('token');
const inputStyle = { width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' };
const labelStyle = { display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' };

export default function EstimatedTransportDetails() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/classes`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(d => setClasses(d)).catch(console.error);
  }, []);

  const handleShow = async () => {
    setLoading(true); setError(null);
    try {
      let url = `${API_URL}/api/students?transportAssigned=true`;
      if (selectedClass) url += `&classId=${selectedClass}`;
      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (res.ok) {
        const students = Array.isArray(data) ? data : (data.students || []);
        // Group by route for estimated collection
        const grouped = students.reduce((acc, s) => {
          const route = s.transportRoute?.name || s.transportRoute || 'Unknown';
          if (!acc[route]) acc[route] = { route, students: 0, estimatedMonthly: 0 };
          acc[route].students += 1;
          acc[route].estimatedMonthly += s.transportFee || 0;
          return acc;
        }, {});
        setReportData(Object.values(grouped));
      } else setError(data.message);
    } catch { setError('Server connection error'); } finally { setLoading(false); }
  };

  return (
    <div style={{ display: 'flex', height: '100%', background: '#f3f4f6' }}>
      <div style={{ width: '250px', background: '#fff', borderRight: '1px solid #e5e7eb', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px', flexShrink: 0 }}>
        <div><label style={labelStyle}>Class</label>
          <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} style={inputStyle}>
            <option value="">All Classes</option>
            {classes.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select></div>
        <button onClick={handleShow} disabled={loading} style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '8px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontWeight: 'bold', marginTop: '10px' }}>
          <Eye size={14} /> {loading ? 'Loading...' : 'Show'}</button>
      </div>
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <div style={{ background: '#fff', minHeight: '100%', borderRadius: '8px', border: '1px solid #e5e7eb', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', paddingBottom: '16px', marginBottom: '20px' }}>
            <h2 style={{ margin: 0, fontSize: '18px', color: '#1f2937' }}>Estimated Transport Details</h2>
            {reportData.length > 0 && <div style={{ fontSize: '13px', color: '#6b7280' }}>Total Estimated: <strong style={{ color: '#059669' }}>₹{reportData.reduce((a, r) => a + r.estimatedMonthly, 0).toLocaleString()}/month</strong></div>}
          </div>
          {error && <div style={{ padding: '12px', background: '#fee2e2', color: '#991b1b', borderRadius: '4px', marginBottom: '20px' }}>{error}</div>}
          {reportData.length === 0 && !loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>Click "Show" to view estimated transport collection.</div>
          ) : (
            <div style={{ overflowX: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead style={{ background: '#f9fafb' }}>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    {['Route Name','No. of Students','Est. Monthly Collection (₹)','Est. Annual Collection (₹)'].map(h => (
                      <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((r, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '12px 16px', color: '#1f2937', fontWeight: 'bold' }}>{r.route}</td>
                      <td style={{ padding: '12px 16px', color: '#4b5563', textAlign: 'center' }}>{r.students}</td>
                      <td style={{ padding: '12px 16px', color: '#059669', fontWeight: 'bold' }}>₹{r.estimatedMonthly.toLocaleString()}</td>
                      <td style={{ padding: '12px 16px', color: '#2563eb', fontWeight: 'bold' }}>₹{(r.estimatedMonthly * 12).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot style={{ background: '#ecfdf5' }}>
                  <tr>
                    <td style={{ padding: '12px 16px', fontWeight: 'bold', color: '#065f46' }}>Grand Total:</td>
                    <td style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 'bold' }}>{reportData.reduce((a, r) => a + r.students, 0)}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 'bold', color: '#059669' }}>₹{reportData.reduce((a, r) => a + r.estimatedMonthly, 0).toLocaleString()}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 'bold', color: '#2563eb' }}>₹{(reportData.reduce((a, r) => a + r.estimatedMonthly, 0) * 12).toLocaleString()}</td>
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
