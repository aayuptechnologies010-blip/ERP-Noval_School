import React, { useState, useEffect } from 'react';
import { Eye, Download } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const token = localStorage.getItem('token');

const inputStyle = { width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' };
const labelStyle = { display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' };

export default function MonthlyFeeCollectionReportPaymodeWise() {
  const [months] = useState(['January','February','March','April','May','June','July','August','September','October','November','December']);
  const [selectedMonth, setSelectedMonth] = useState((new Date().getMonth() + 1).toString());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/classes`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => setClasses(data))
      .catch(console.error);
  }, []);

  const handleShow = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/fee-transactions/receipts`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      
      if (res.ok) {
        // Filter by month and year
        let filtered = data.filter(r => {
          const rDate = new Date(r.receiptDate || r.createdAt);
          return rDate.getMonth() + 1 === parseInt(selectedMonth) && rDate.getFullYear() === parseInt(selectedYear) && r.status === 'Successful';
        });

        if (selectedClass) {
          const selectedClassName = classes.find(c => c._id === selectedClass)?.name;
          filtered = filtered.filter(r => r.student?.class === selectedClassName);
        }

        // Group by paymode
        const grouped = filtered.reduce((acc, curr) => {
          const mode = curr.paymentMode || 'Unknown';
          if (!acc[mode]) acc[mode] = { count: 0, amount: 0, receipts: [] };
          acc[mode].count += 1;
          acc[mode].amount += curr.amountPaid;
          acc[mode].receipts.push(curr);
          return acc;
        }, {});

        setReportData(Object.entries(grouped).map(([mode, data]) => ({ mode, ...data })));
      } else {
        setError(data.message || 'Failed to fetch receipts');
      }
    } catch (err) {
      setError('Server connection error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100%', background: '#f3f4f6' }}>
      
      {/* Side Panel */}
      <div style={{ width: '250px', background: '#fff', borderRight: '1px solid #e5e7eb', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px', flexShrink: 0, overflowY: 'auto' }}>
        
        <div>
          <label style={labelStyle}>Month</label>
          <select value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)} style={inputStyle}>
            {months.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
          </select>
        </div>

        <div>
          <label style={labelStyle}>Year</label>
          <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)} style={inputStyle}>
            {[2024, 2025, 2026, 2027].map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        <div>
          <label style={labelStyle}>Class Filter (Optional)</label>
          <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} style={inputStyle}>
            <option value="">All Classes</option>
            {classes.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button onClick={handleShow} disabled={loading} style={{ flex: 1, background: '#29a9d8', color: '#fff', border: 'none', padding: '8px 10px', borderRadius: '4px', fontSize: '12px', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontWeight: 'bold' }}>
            <Eye size={14} /> {loading ? 'Loading...' : 'Show'}
          </button>
        </div>

      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <div style={{ background: '#fff', width: '100%', minHeight: '100%', borderRadius: '8px', border: '1px solid #e5e7eb', padding: '20px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: '16px', marginBottom: '20px' }}>
            <h2 style={{ margin: 0, fontSize: '18px', color: '#1f2937' }}>Monthly Collection - Paymode Wise</h2>
            {reportData.length > 0 && (
              <button style={{ background: '#10b981', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' }}>
                <Download size={14} /> Export Excel
              </button>
            )}
          </div>

          {error && <div style={{ padding: '12px', background: '#fee2e2', color: '#991b1b', borderRadius: '4px', marginBottom: '20px', fontSize: '13px' }}>{error}</div>}

          {reportData.length === 0 && !loading && !error ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280', fontSize: '14px' }}>
              Select month and year and click "Show" to view paymode wise collections.
            </div>
          ) : (
            <div>
              <div style={{ overflowX: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', whiteSpace: 'nowrap' }}>
                  <thead style={{ background: '#f9fafb' }}>
                    <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Payment Mode</th>
                      <th style={{ padding: '12px 16px', textAlign: 'center', color: '#374151' }}>Total Receipts</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right', color: '#374151' }}>Total Collected (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.map((r, i) => (
                      <tr key={r.mode} style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '12px 16px', color: '#1f2937', fontWeight: 'bold' }}>{r.mode}</td>
                        <td style={{ padding: '12px 16px', color: '#4b5563', textAlign: 'center' }}>{r.count}</td>
                        <td style={{ padding: '12px 16px', color: '#059669', textAlign: 'right', fontWeight: 'bold' }}>{r.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                  {reportData.length > 0 && (
                    <tfoot style={{ background: '#ecfdf5' }}>
                      <tr>
                        <td style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 'bold', color: '#065f46' }}>Grand Total:</td>
                        <td style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 'bold', color: '#065f46' }}>
                          {reportData.reduce((acc, curr) => acc + curr.count, 0)}
                        </td>
                        <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 'bold', color: '#059669', fontSize: '15px' }}>
                          ₹{reportData.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}
                        </td>
                      </tr>
                    </tfoot>
                  )}
                </table>
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
