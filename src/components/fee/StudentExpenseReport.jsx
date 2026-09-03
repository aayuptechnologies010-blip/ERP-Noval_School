import React, { useState, useEffect } from 'react';
import { Eye, Download } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const token = localStorage.getItem('token');
const inputStyle = { width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' };
const labelStyle = { display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' };

export default function StudentExpenseReport() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
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
      let url = `${API_URL}/api/student-expenses?startDate=${startDate}&endDate=${endDate}`;
      if (selectedClass) url += `&classId=${selectedClass}`;
      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (res.ok) setReportData(Array.isArray(data) ? data : (data.data || []));
      else setError(data.message || 'Failed to fetch expense records');
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
        <div><label style={labelStyle}>From Date</label>
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} style={inputStyle} /></div>
        <div><label style={labelStyle}>To Date</label>
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} style={inputStyle} /></div>
        <button onClick={handleShow} disabled={loading} style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '8px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontWeight: 'bold', marginTop: '10px' }}>
          <Eye size={14} /> {loading ? 'Loading...' : 'Show'}</button>
      </div>
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <div style={{ background: '#fff', minHeight: '100%', borderRadius: '8px', border: '1px solid #e5e7eb', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', paddingBottom: '16px', marginBottom: '20px' }}>
            <h2 style={{ margin: 0, fontSize: '18px', color: '#1f2937' }}>Student Expense Report</h2>
            {reportData.length > 0 && <button style={{ background: '#10b981', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><Download size={14} /> Export</button>}
          </div>
          {error && <div style={{ padding: '12px', background: '#fee2e2', color: '#991b1b', borderRadius: '4px', marginBottom: '20px' }}>{error}</div>}
          {reportData.length === 0 && !loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>Select date range and click "Show" to view student expenses.</div>
          ) : (
            <div style={{ overflowX: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', whiteSpace: 'nowrap' }}>
                <thead style={{ background: '#f9fafb' }}>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    {['Date','Adm No','Student Name','Class','Expense Head','Amount (₹)','Remarks'].map(h => (
                      <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((r, i) => (
                    <tr key={r._id || i} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '12px 16px', color: '#4b5563' }}>{new Date(r.date || r.createdAt).toLocaleDateString()}</td>
                      <td style={{ padding: '12px 16px', color: '#4b5563' }}>{r.student?.admissionNumber}</td>
                      <td style={{ padding: '12px 16px', color: '#1f2937', fontWeight: '600' }}>{r.student?.firstName} {r.student?.lastName}</td>
                      <td style={{ padding: '12px 16px', color: '#4b5563' }}>{r.student?.class}</td>
                      <td style={{ padding: '12px 16px', color: '#4b5563' }}>{r.expenseHead || r.category || '-'}</td>
                      <td style={{ padding: '12px 16px', color: '#b91c1c', fontWeight: 'bold' }}>₹{(r.amount || 0).toLocaleString()}</td>
                      <td style={{ padding: '12px 16px', color: '#4b5563' }}>{r.remarks || '-'}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot style={{ background: '#fef2f2' }}>
                  <tr>
                    <td colSpan="5" style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 'bold', color: '#991b1b' }}>Total Expenses:</td>
                    <td style={{ padding: '12px 16px', fontWeight: 'bold', color: '#b91c1c', fontSize: '15px' }}>
                      ₹{reportData.reduce((a, r) => a + (r.amount || 0), 0).toLocaleString()}
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
