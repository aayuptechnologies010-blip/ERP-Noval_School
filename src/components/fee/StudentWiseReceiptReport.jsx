import React, { useState, useEffect } from 'react';
import { Eye, Download } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const token = localStorage.getItem('token');

const inputStyle = { width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' };
const labelStyle = { display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' };

export default function StudentWiseReceiptReport() {
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
      const res = await fetch(`${API_URL}/api/fee-transactions/receipts`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      
      if (res.ok) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        
        let filtered = data.filter(r => {
          const rDate = new Date(r.receiptDate || r.createdAt);
          return rDate >= start && rDate <= end && r.status === 'Successful';
        });

        if (selectedClass) {
          const selectedClassName = classes.find(c => c._id === selectedClass)?.name;
          filtered = filtered.filter(r => r.student?.class === selectedClassName);
        }

        // Group by student
        const grouped = filtered.reduce((acc, curr) => {
          const studentName = curr.student ? `${curr.student.firstName} ${curr.student.lastName}` : 'Unknown';
          const admNo = curr.student?.admissionNumber || 'N/A';
          const key = `${admNo}-${studentName}`;
          
          if (!acc[key]) {
            acc[key] = { studentName, admNo, className: curr.student?.class || 'N/A', receipts: [], totalAmount: 0 };
          }
          acc[key].receipts.push(curr);
          acc[key].totalAmount += curr.amountPaid;
          return acc;
        }, {});

        setReportData(Object.values(grouped));
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
          <label style={labelStyle}>Class Filter</label>
          <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} style={inputStyle}>
            <option value="">All Classes</option>
            {classes.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
        </div>

        <div>
          <label style={labelStyle}>From Date</label>
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>To Date</label>
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} style={inputStyle} />
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
            <h2 style={{ margin: 0, fontSize: '18px', color: '#1f2937' }}>Student Wise Receipt Report</h2>
            {reportData.length > 0 && (
              <button style={{ background: '#10b981', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' }}>
                <Download size={14} /> Export Excel
              </button>
            )}
          </div>

          {error && <div style={{ padding: '12px', background: '#fee2e2', color: '#991b1b', borderRadius: '4px', marginBottom: '20px', fontSize: '13px' }}>{error}</div>}

          {reportData.length === 0 && !loading && !error ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280', fontSize: '14px' }}>
              Select a date range and click "Show" to view receipts grouped by student.
            </div>
          ) : (
            <div>
              {reportData.map((group, index) => (
                <div key={index} style={{ marginBottom: '20px', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
                  <div style={{ background: '#f3f4f6', padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb' }}>
                    <div style={{ display: 'flex', gap: '20px', fontSize: '13px', color: '#374151' }}>
                      <span><strong>Student:</strong> {group.studentName}</span>
                      <span><strong>Adm No:</strong> {group.admNo}</span>
                      <span><strong>Class:</strong> {group.className}</span>
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#059669' }}>
                      Total: ₹{group.totalAmount}
                    </div>
                  </div>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                    <thead>
                      <tr style={{ background: '#fff', borderBottom: '1px solid #e5e7eb' }}>
                        <th style={{ padding: '8px 16px', textAlign: 'left', color: '#6b7280', fontWeight: '600' }}>Date</th>
                        <th style={{ padding: '8px 16px', textAlign: 'left', color: '#6b7280', fontWeight: '600' }}>Receipt No</th>
                        <th style={{ padding: '8px 16px', textAlign: 'left', color: '#6b7280', fontWeight: '600' }}>Pay Mode</th>
                        <th style={{ padding: '8px 16px', textAlign: 'right', color: '#6b7280', fontWeight: '600' }}>Amount (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.receipts.map((r, i) => (
                        <tr key={i} style={{ borderBottom: i !== group.receipts.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
                          <td style={{ padding: '8px 16px', color: '#4b5563' }}>{new Date(r.createdAt).toLocaleDateString()}</td>
                          <td style={{ padding: '8px 16px', color: '#374151', fontWeight: '500' }}>{r.receiptNo}</td>
                          <td style={{ padding: '8px 16px', color: '#4b5563' }}>{r.paymentMode}</td>
                          <td style={{ padding: '8px 16px', color: '#059669', textAlign: 'right', fontWeight: '600' }}>{r.amountPaid}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
