import React, { useState, useEffect } from 'react';
import { Eye, Download } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const token = localStorage.getItem('token');

const inputStyle = { width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' };
const labelStyle = { display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' };

export default function FeeDefaulterReportWithReceiving() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [dateRangeEnabled, setDateRangeEnabled] = useState(false);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [reportData, setReportData] = useState([]);
  const [receiptsMap, setReceiptsMap] = useState({});
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
      const [defaultersRes, receiptsRes] = await Promise.all([
        fetch(`${API_URL}/api/fee-reports/defaulters?status=unpaid`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API_URL}/api/fee-transactions/receipts`, { headers: { Authorization: `Bearer ${token}` } })
      ]);

      const defaulters = await defaultersRes.json();
      const receipts = await receiptsRes.json();
      
      if (!defaultersRes.ok) throw new Error(defaulters.message);

      let filtered = defaulters;
      if (selectedClass) {
        const selectedClassName = classes.find(c => c._id === selectedClass)?.name;
        filtered = filtered.filter(s => s.class === selectedClassName);
      }

      // Build a map of admNo -> last receipt details
      const rMap = {};
      if (Array.isArray(receipts)) {
        receipts.filter(r => r.status === 'Successful').forEach(r => {
          const admNo = r.student?.admissionNumber;
          if (!admNo) return;
          if (!rMap[admNo] || new Date(r.createdAt) > new Date(rMap[admNo].createdAt)) {
            rMap[admNo] = r;
          }
        });
      }

      setReportData(filtered);
      setReceiptsMap(rMap);
    } catch (err) {
      setError(err.message || 'Server connection error');
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
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#374151', cursor: 'pointer' }}>
            <input type="checkbox" checked={dateRangeEnabled} onChange={e => setDateRangeEnabled(e.target.checked)} />
            Enable Date Range Filter
          </label>
        </div>

        {dateRangeEnabled && (
          <>
            <div>
              <label style={labelStyle}>From Date</label>
              <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>To Date</label>
              <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} style={inputStyle} />
            </div>
          </>
        )}

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
            <h2 style={{ margin: 0, fontSize: '18px', color: '#1f2937' }}>Fee Defaulter Report With Last Receiving</h2>
            {reportData.length > 0 && (
              <button style={{ background: '#10b981', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' }}>
                <Download size={14} /> Export Excel
              </button>
            )}
          </div>

          {error && <div style={{ padding: '12px', background: '#fee2e2', color: '#991b1b', borderRadius: '4px', marginBottom: '20px', fontSize: '13px' }}>{error}</div>}

          {reportData.length === 0 && !loading && !error ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280', fontSize: '14px' }}>
              Click "Show" to view defaulters along with their last payment received.
            </div>
          ) : (
            <div style={{ overflowX: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', whiteSpace: 'nowrap' }}>
                <thead style={{ background: '#f9fafb' }}>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Adm No</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Student Name</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Class</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Mobile</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right', color: '#374151' }}>Total Due (₹)</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Last Receipt No</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Last Payment Date</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right', color: '#374151' }}>Last Paid (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((s, i) => {
                    const lastReceipt = receiptsMap[s.admissionNo];
                    return (
                      <tr key={s.admissionNo} style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '12px 16px', color: '#4b5563' }}>{s.admissionNo}</td>
                        <td style={{ padding: '12px 16px', color: '#1f2937', fontWeight: '600' }}>{s.studentName}</td>
                        <td style={{ padding: '12px 16px', color: '#4b5563' }}>{s.class}</td>
                        <td style={{ padding: '12px 16px', color: '#4b5563' }}>{s.mobileNumber || 'N/A'}</td>
                        <td style={{ padding: '12px 16px', color: '#b91c1c', textAlign: 'right', fontWeight: 'bold' }}>{s.totalDue}</td>
                        <td style={{ padding: '12px 16px', color: '#2563eb' }}>{lastReceipt?.receiptNo || 'No Payment'}</td>
                        <td style={{ padding: '12px 16px', color: '#4b5563' }}>
                          {lastReceipt ? new Date(lastReceipt.createdAt).toLocaleDateString() : '-'}
                        </td>
                        <td style={{ padding: '12px 16px', color: '#059669', textAlign: 'right', fontWeight: 'bold' }}>
                          {lastReceipt ? lastReceipt.amountPaid : '-'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
