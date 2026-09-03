import React, { useState, useEffect } from 'react';
import { Eye, Download } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const token = localStorage.getItem('token');

const inputStyle = { width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' };
const labelStyle = { display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' };

export default function ReconcileReport() {
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
      const url = `${API_URL}/api/fee-reports/defaulters?status=all`;
      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (res.ok) {
        // Group by Class to show a high-level reconciliation summary
        const groupedByClass = data.reduce((acc, curr) => {
          const cName = curr.class || 'Unassigned';
          if (!acc[cName]) {
            acc[cName] = { 
              className: cName, 
              studentCount: 0, 
              totalPayable: 0, 
              totalConcession: 0, 
              advanceAmount: 0, 
              totalPaid: 0, 
              totalDues: 0 
            };
          }
          acc[cName].studentCount += 1;
          acc[cName].totalPayable += curr.totalPayable || 0;
          acc[cName].totalConcession += curr.totalConcession || 0;
          acc[cName].advanceAmount += curr.advanceAmount || 0;
          acc[cName].totalPaid += curr.totalPaid || 0;
          acc[cName].totalDues += curr.totalDues || 0;
          
          return acc;
        }, {});

        let finalData = Object.values(groupedByClass).sort((a, b) => a.className.localeCompare(b.className));
        
        if (selectedClass) {
          const selectedClassName = classes.find(c => c._id === selectedClass)?.name;
          finalData = finalData.filter(d => d.className === selectedClassName);
        }

        setReportData(finalData);
      } else {
        setError(data.message || 'Failed to fetch reconciliation data');
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
            <h2 style={{ margin: 0, fontSize: '18px', color: '#1f2937' }}>Fee Reconciliation Report</h2>
            {reportData.length > 0 && (
              <button style={{ background: '#10b981', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' }}>
                <Download size={14} /> Export Excel
              </button>
            )}
          </div>

          {error && <div style={{ padding: '12px', background: '#fee2e2', color: '#991b1b', borderRadius: '4px', marginBottom: '20px', fontSize: '13px' }}>{error}</div>}

          {reportData.length === 0 && !loading && !error ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280', fontSize: '14px' }}>
              Click "Show" to view the class-wise financial reconciliation summary.
            </div>
          ) : (
            <div>
              <div style={{ overflowX: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', whiteSpace: 'nowrap' }}>
                  <thead style={{ background: '#f9fafb' }}>
                    <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Class</th>
                      <th style={{ padding: '12px 16px', textAlign: 'center', color: '#374151' }}>Total Students</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right', color: '#374151' }}>Expected Payable</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right', color: '#374151' }}>Concession</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right', color: '#059669' }}>Total Collected</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right', color: '#2563eb' }}>Advance Held</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right', color: '#b91c1c' }}>Total Outstanding Due</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.map((row, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '12px 16px', color: '#1f2937', fontWeight: '600' }}>{row.className}</td>
                        <td style={{ padding: '12px 16px', color: '#4b5563', textAlign: 'center' }}>{row.studentCount}</td>
                        <td style={{ padding: '12px 16px', color: '#4b5563', textAlign: 'right' }}>{row.totalPayable.toLocaleString()}</td>
                        <td style={{ padding: '12px 16px', color: '#4b5563', textAlign: 'right' }}>{row.totalConcession.toLocaleString()}</td>
                        <td style={{ padding: '12px 16px', color: '#059669', textAlign: 'right', fontWeight: 'bold' }}>{row.totalPaid.toLocaleString()}</td>
                        <td style={{ padding: '12px 16px', color: '#2563eb', textAlign: 'right' }}>{row.advanceAmount.toLocaleString()}</td>
                        <td style={{ padding: '12px 16px', color: '#b91c1c', textAlign: 'right', fontWeight: 'bold' }}>{row.totalDues.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                  {reportData.length > 0 && (
                    <tfoot style={{ background: '#f3f4f6' }}>
                      <tr>
                        <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 'bold', color: '#1f2937' }}>Grand Totals:</td>
                        <td style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 'bold', color: '#1f2937' }}>
                          {reportData.reduce((acc, curr) => acc + curr.studentCount, 0)}
                        </td>
                        <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 'bold', color: '#1f2937' }}>
                          ₹{reportData.reduce((acc, curr) => acc + curr.totalPayable, 0).toLocaleString()}
                        </td>
                        <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 'bold', color: '#1f2937' }}>
                          ₹{reportData.reduce((acc, curr) => acc + curr.totalConcession, 0).toLocaleString()}
                        </td>
                        <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 'bold', color: '#059669', fontSize: '15px' }}>
                          ₹{reportData.reduce((acc, curr) => acc + curr.totalPaid, 0).toLocaleString()}
                        </td>
                        <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 'bold', color: '#2563eb' }}>
                          ₹{reportData.reduce((acc, curr) => acc + curr.advanceAmount, 0).toLocaleString()}
                        </td>
                        <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 'bold', color: '#b91c1c', fontSize: '15px' }}>
                          ₹{reportData.reduce((acc, curr) => acc + curr.totalDues, 0).toLocaleString()}
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
