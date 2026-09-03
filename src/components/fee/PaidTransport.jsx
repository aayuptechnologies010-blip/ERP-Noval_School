import React, { useState, useEffect } from 'react';
import { Eye, Download } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const token = localStorage.getItem('token');
const inputStyle = { width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' };
const labelStyle = { display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' };

export default function PaidTransport() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [months] = useState(['January','February','March','April','May','June','July','August','September','October','November','December']);
  const [selectedMonth, setSelectedMonth] = useState((new Date().getMonth() + 1).toString());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
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
      const res = await fetch(`${API_URL}/api/fee-transactions/receipts`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (res.ok) {
        // Filter transport receipts for selected month
        let filtered = data.filter(r => {
          const rDate = new Date(r.receiptDate || r.createdAt);
          const matchMonth = rDate.getMonth() + 1 === parseInt(selectedMonth);
          const matchYear = rDate.getFullYear() === parseInt(selectedYear);
          const isTransport = r.feeHead?.includes('Transport') || r.featureType === 'transport';
          return matchMonth && matchYear && r.status === 'Successful';
        });
        if (selectedClass) {
          const cls = classes.find(c => c._id === selectedClass)?.name;
          filtered = filtered.filter(r => r.student?.class === cls);
        }
        setReportData(filtered);
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
        <div><label style={labelStyle}>Month</label>
          <select value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)} style={inputStyle}>
            {months.map((m, i) => <option key={i} value={i+1}>{m}</option>)}
          </select></div>
        <div><label style={labelStyle}>Year</label>
          <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)} style={inputStyle}>
            {[2024,2025,2026,2027].map(y => <option key={y} value={y}>{y}</option>)}
          </select></div>
        <button onClick={handleShow} disabled={loading} style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '8px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontWeight: 'bold', marginTop: '10px' }}>
          <Eye size={14} /> {loading ? 'Loading...' : 'Show'}</button>
      </div>
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <div style={{ background: '#fff', minHeight: '100%', borderRadius: '8px', border: '1px solid #e5e7eb', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', paddingBottom: '16px', marginBottom: '20px' }}>
            <h2 style={{ margin: 0, fontSize: '18px', color: '#1f2937' }}>Paid Transport Report</h2>
            {reportData.length > 0 && (
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: '#6b7280' }}>Total: <strong style={{ color: '#059669' }}>₹{reportData.reduce((a, r) => a + r.amountPaid, 0).toLocaleString()}</strong></span>
                <button style={{ background: '#10b981', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><Download size={14} /> Export</button>
              </div>
            )}
          </div>
          {error && <div style={{ padding: '12px', background: '#fee2e2', color: '#991b1b', borderRadius: '4px', marginBottom: '20px' }}>{error}</div>}
          {reportData.length === 0 && !loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>Select month and click "Show" to view paid transport records.</div>
          ) : (
            <div style={{ overflowX: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', whiteSpace: 'nowrap' }}>
                <thead style={{ background: '#f9fafb' }}>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    {['Date','Receipt No','Admission No','Student Name','Class','Route','Amount Paid (₹)'].map(h => (
                      <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((r, i) => (
                    <tr key={r._id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '12px 16px', color: '#4b5563' }}>{new Date(r.createdAt).toLocaleDateString()}</td>
                      <td style={{ padding: '12px 16px', color: '#1f2937', fontWeight: '600' }}>{r.receiptNo}</td>
                      <td style={{ padding: '12px 16px', color: '#4b5563' }}>{r.student?.admissionNumber}</td>
                      <td style={{ padding: '12px 16px', color: '#1f2937', fontWeight: '500' }}>{r.student?.firstName} {r.student?.lastName}</td>
                      <td style={{ padding: '12px 16px', color: '#4b5563' }}>{r.student?.class}</td>
                      <td style={{ padding: '12px 16px', color: '#4b5563' }}>{r.transportRoute || '-'}</td>
                      <td style={{ padding: '12px 16px', color: '#059669', fontWeight: 'bold' }}>{r.amountPaid}</td>
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
