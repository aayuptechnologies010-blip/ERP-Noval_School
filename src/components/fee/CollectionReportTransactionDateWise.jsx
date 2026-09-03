import React, { useState, useEffect } from 'react';
import { Eye, Download } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const token = localStorage.getItem('token');

const inputStyle = { width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' };
const labelStyle = { display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' };

export default function CollectionReportTransactionDateWise() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  
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
      let url = `${API_URL}/api/fee-reports/collection/daily?startDate=${startDate}&endDate=${endDate}`;
      if (selectedClass) url += `&classId=${selectedClass}`;

      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (res.ok) {
        // Group by transaction date
        const groupedByDate = data.reduce((acc, curr) => {
          const date = curr._id.date;
          if (!acc[date]) {
            acc[date] = { date, totalAmount: 0, count: 0, receipts: [] };
          }
          acc[date].totalAmount += curr.totalAmount;
          acc[date].count += curr.count;
          acc[date].receipts.push(...curr.receipts);
          return acc;
        }, {});
        
        setReportData(Object.values(groupedByDate).sort((a, b) => new Date(b.date) - new Date(a.date)));
      } else {
        setError(data.message || 'Failed to fetch report');
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
          <label style={labelStyle}>From Date</label>
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>To Date</label>
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Class</label>
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
            <h2 style={{ margin: 0, fontSize: '18px', color: '#1f2937' }}>Collection Report (Transaction Date Wise)</h2>
            {reportData.length > 0 && (
              <button style={{ background: '#10b981', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' }}>
                <Download size={14} /> Export Excel
              </button>
            )}
          </div>

          {error && <div style={{ padding: '12px', background: '#fee2e2', color: '#991b1b', borderRadius: '4px', marginBottom: '20px', fontSize: '13px' }}>{error}</div>}

          {reportData.length === 0 && !loading && !error ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280', fontSize: '14px' }}>
              Select a date range and click "Show" to view the report.
            </div>
          ) : (
            <div>
              {reportData.map((group, index) => (
                <div key={index} style={{ marginBottom: '30px' }}>
                  <div style={{ background: '#f9fafb', padding: '12px 16px', border: '1px solid #e5e7eb', borderBottom: 'none', borderRadius: '8px 8px 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontWeight: 'bold', color: '#374151', fontSize: '14px' }}>Transaction Date: {group.date}</div>
                    <div style={{ fontSize: '13px', color: '#4b5563' }}>Transactions: <b>{group.count}</b> | Total Amount: <b style={{ color: '#059669' }}>₹{group.totalAmount}</b></div>
                  </div>
                  <div style={{ overflowX: 'auto', border: '1px solid #e5e7eb', borderRadius: '0 0 8px 8px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                      <thead style={{ background: '#f3f4f6' }}>
                        <tr>
                          <th style={{ padding: '10px 16px', textAlign: 'left', color: '#374151' }}>Receipt No</th>
                          <th style={{ padding: '10px 16px', textAlign: 'left', color: '#374151' }}>Admission No</th>
                          <th style={{ padding: '10px 16px', textAlign: 'left', color: '#374151' }}>Student Name</th>
                          <th style={{ padding: '10px 16px', textAlign: 'left', color: '#374151' }}>Class</th>
                          <th style={{ padding: '10px 16px', textAlign: 'left', color: '#374151' }}>Pay Mode</th>
                          <th style={{ padding: '10px 16px', textAlign: 'right', color: '#374151' }}>Amount (₹)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {group.receipts.map((r, i) => (
                          <tr key={i} style={{ borderTop: '1px solid #e5e7eb' }}>
                            <td style={{ padding: '10px 16px', color: '#4b5563' }}>{r.receiptNo}</td>
                            <td style={{ padding: '10px 16px', color: '#4b5563' }}>{r.admissionNo}</td>
                            <td style={{ padding: '10px 16px', color: '#1f2937', fontWeight: '500' }}>{r.studentName}</td>
                            <td style={{ padding: '10px 16px', color: '#4b5563' }}>{r.class}</td>
                            <td style={{ padding: '10px 16px', color: '#4b5563' }}>{r.paymentMode}</td>
                            <td style={{ padding: '10px 16px', color: '#059669', textAlign: 'right', fontWeight: 'bold' }}>{r.amountPaid}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
              
              {reportData.length > 0 && (
                <div style={{ marginTop: '20px', padding: '16px', background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#065f46' }}>Grand Total</div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#059669' }}>
                    ₹{reportData.reduce((acc, curr) => acc + curr.totalAmount, 0)}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
