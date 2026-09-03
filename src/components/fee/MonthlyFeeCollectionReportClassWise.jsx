import React, { useState, useEffect } from 'react';
import { Eye, Download } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const token = localStorage.getItem('token');

const inputStyle = { width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' };
const labelStyle = { display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' };

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function MonthlyFeeCollectionReportClassWise() {
  const [month, setMonth] = useState(new Date().getMonth() + 1); // 1-12
  const [year, setYear] = useState(new Date().getFullYear());
  
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleShow = async () => {
    setLoading(true);
    setError(null);
    try {
      // Calculate start and end date for the selected month/year
      const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
      const lastDay = new Date(year, month, 0).getDate();
      const endDate = `${year}-${String(month).padStart(2, '0')}-${lastDay}`;

      const url = `${API_URL}/api/fee-reports/collection/daily?startDate=${startDate}&endDate=${endDate}`;
      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (res.ok) {
        // Group by Class
        const groupedByClass = data.reduce((acc, curr) => {
          curr.receipts.forEach(r => {
            const className = r.class || 'Unassigned';
            if (!acc[className]) {
              acc[className] = { className, totalAmount: 0, count: 0 };
            }
            acc[className].totalAmount += r.amountPaid;
            acc[className].count += 1;
          });
          return acc;
        }, {});
        
        // Sort by class name alphabetically
        setReportData(Object.values(groupedByClass).sort((a, b) => a.className.localeCompare(b.className)));
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
          <label style={labelStyle}>Select Month</label>
          <select value={month} onChange={e => setMonth(Number(e.target.value))} style={inputStyle}>
            {monthNames.map((m, i) => (
              <option key={i} value={i + 1}>{m}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={labelStyle}>Select Year</label>
          <input type="number" value={year} onChange={e => setYear(e.target.value)} style={inputStyle} min="2000" max="2100" />
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
            <h2 style={{ margin: 0, fontSize: '18px', color: '#1f2937' }}>Monthly Class-Wise Collection</h2>
            {reportData.length > 0 && (
              <button style={{ background: '#10b981', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' }}>
                <Download size={14} /> Export Excel
              </button>
            )}
          </div>

          {error && <div style={{ padding: '12px', background: '#fee2e2', color: '#991b1b', borderRadius: '4px', marginBottom: '20px', fontSize: '13px' }}>{error}</div>}

          {reportData.length === 0 && !loading && !error ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280', fontSize: '14px' }}>
              Select a month/year and click "Show" to view the class-wise report.
            </div>
          ) : (
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div style={{ overflowX: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead style={{ background: '#f9fafb' }}>
                    <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Class</th>
                      <th style={{ padding: '12px 16px', textAlign: 'center', color: '#374151' }}>Total Receipts</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right', color: '#374151' }}>Total Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.map((row, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '12px 16px', color: '#1f2937', fontWeight: '600' }}>{row.className}</td>
                        <td style={{ padding: '12px 16px', color: '#4b5563', textAlign: 'center' }}>{row.count}</td>
                        <td style={{ padding: '12px 16px', color: '#059669', textAlign: 'right', fontWeight: 'bold' }}>{row.totalAmount.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                  {reportData.length > 0 && (
                    <tfoot style={{ background: '#f3f4f6' }}>
                      <tr>
                        <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 'bold', color: '#1f2937' }}>Grand Total:</td>
                        <td style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 'bold', color: '#1f2937' }}>{reportData.reduce((acc, curr) => acc + curr.count, 0)}</td>
                        <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 'bold', color: '#059669', fontSize: '15px' }}>
                          ₹{reportData.reduce((acc, curr) => acc + curr.totalAmount, 0).toLocaleString()}
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
