import React, { useState, useEffect } from 'react';
import { Eye, Download } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const token = localStorage.getItem('token');

const inputStyle = { width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' };
const labelStyle = { display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' };

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function MonthlyConsolidatedReport() {
  const [year, setYear] = useState(new Date().getFullYear());
  
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleShow = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = `${API_URL}/api/fee-reports/collection/monthly?year=${year}`;
      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (res.ok) {
        // Pivot data: Group by Month, then separate by Paymode
        const groupedByMonth = data.reduce((acc, curr) => {
          const monthIdx = curr._id.month;
          const monthName = monthNames[monthIdx - 1];
          const mode = curr._id.paymentMode || 'Unknown';
          
          if (!acc[monthIdx]) {
            acc[monthIdx] = { monthIdx, monthName, Cash: 0, Online: 0, Cheque: 0, DD: 0, Card: 0, Adjustment: 0, Total: 0 };
          }
          
          if (acc[monthIdx][mode] !== undefined) {
            acc[monthIdx][mode] += curr.totalAmount;
          } else {
            acc[monthIdx][mode] = curr.totalAmount;
          }
          
          acc[monthIdx].Total += curr.totalAmount;
          return acc;
        }, {});
        
        // Sort by month index ascending
        setReportData(Object.values(groupedByMonth).sort((a, b) => a.monthIdx - b.monthIdx));
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
            <h2 style={{ margin: 0, fontSize: '18px', color: '#1f2937' }}>Monthly Consolidated Report (Paymode Wise)</h2>
            {reportData.length > 0 && (
              <button style={{ background: '#10b981', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' }}>
                <Download size={14} /> Export Excel
              </button>
            )}
          </div>

          {error && <div style={{ padding: '12px', background: '#fee2e2', color: '#991b1b', borderRadius: '4px', marginBottom: '20px', fontSize: '13px' }}>{error}</div>}

          {reportData.length === 0 && !loading && !error ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280', fontSize: '14px' }}>
              Select a year and click "Show" to view the monthly consolidated table.
            </div>
          ) : (
            <div>
              <div style={{ overflowX: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead style={{ background: '#f9fafb' }}>
                    <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Month</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right', color: '#374151' }}>Cash (₹)</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right', color: '#374151' }}>Online (₹)</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right', color: '#374151' }}>Cheque (₹)</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right', color: '#374151' }}>DD (₹)</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right', color: '#374151' }}>Card (₹)</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right', color: '#374151', background: '#ecfdf5' }}>Month Total (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.map((row, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '12px 16px', color: '#1f2937', fontWeight: '500' }}>{row.monthName}</td>
                        <td style={{ padding: '12px 16px', color: '#4b5563', textAlign: 'right' }}>{row.Cash ? row.Cash.toLocaleString() : '-'}</td>
                        <td style={{ padding: '12px 16px', color: '#4b5563', textAlign: 'right' }}>{row.Online ? row.Online.toLocaleString() : '-'}</td>
                        <td style={{ padding: '12px 16px', color: '#4b5563', textAlign: 'right' }}>{row.Cheque ? row.Cheque.toLocaleString() : '-'}</td>
                        <td style={{ padding: '12px 16px', color: '#4b5563', textAlign: 'right' }}>{row.DD ? row.DD.toLocaleString() : '-'}</td>
                        <td style={{ padding: '12px 16px', color: '#4b5563', textAlign: 'right' }}>{row.Card ? row.Card.toLocaleString() : '-'}</td>
                        <td style={{ padding: '12px 16px', color: '#059669', textAlign: 'right', fontWeight: 'bold', background: '#ecfdf5' }}>{row.Total.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                  {reportData.length > 0 && (
                    <tfoot style={{ background: '#f3f4f6' }}>
                      <tr>
                        <td style={{ padding: '12px 16px', fontWeight: 'bold', color: '#1f2937' }}>Yearly Totals</td>
                        <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 'bold', color: '#1f2937' }}>{reportData.reduce((acc, curr) => acc + (curr.Cash || 0), 0).toLocaleString()}</td>
                        <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 'bold', color: '#1f2937' }}>{reportData.reduce((acc, curr) => acc + (curr.Online || 0), 0).toLocaleString()}</td>
                        <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 'bold', color: '#1f2937' }}>{reportData.reduce((acc, curr) => acc + (curr.Cheque || 0), 0).toLocaleString()}</td>
                        <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 'bold', color: '#1f2937' }}>{reportData.reduce((acc, curr) => acc + (curr.DD || 0), 0).toLocaleString()}</td>
                        <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 'bold', color: '#1f2937' }}>{reportData.reduce((acc, curr) => acc + (curr.Card || 0), 0).toLocaleString()}</td>
                        <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 'bold', color: '#059669', background: '#d1fae5', fontSize: '15px' }}>
                          ₹{reportData.reduce((acc, curr) => acc + curr.Total, 0).toLocaleString()}
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
