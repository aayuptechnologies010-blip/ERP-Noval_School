import React, { useState, useEffect } from 'react';
import { Eye, Download, Bell } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const token = localStorage.getItem('token');

const inputStyle = { width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' };
const labelStyle = { display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' };

export default function FeeReminder() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [classWiseDue, setClassWiseDue] = useState(false);
  
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sentCount, setSentCount] = useState(0);

  useEffect(() => {
    fetch(`${API_URL}/api/classes`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => setClasses(data))
      .catch(console.error);
  }, []);

  const handleShow = async () => {
    setLoading(true);
    setError(null);
    setSentCount(0);
    try {
      const url = `${API_URL}/api/fee-reports/defaulters?status=unpaid`;
      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      
      if (res.ok) {
        let filtered = data;
        if (selectedClass) {
          const selectedClassName = classes.find(c => c._id === selectedClass)?.name;
          filtered = filtered.filter(s => s.class === selectedClassName);
        }
        setReportData(filtered);
      } else {
        setError(data.message || 'Failed to fetch defaulters');
      }
    } catch (err) {
      setError('Server connection error');
    } finally {
      setLoading(false);
    }
  };

  const handleSendReminders = async () => {
    if (reportData.length === 0) return;
    if (!window.confirm(`Send fee reminders to ${reportData.length} students/parents?`)) return;
    
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/sms/send-fee-reminders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ studentIds: reportData.map(s => s._id) })
      });
      const data = await res.json();
      if (res.ok) {
        setSentCount(data.sentCount || reportData.length);
        setError(null);
      } else {
        setError(data.message || 'Failed to send reminders');
      }
    } catch (err) {
      setError('Failed to send reminders. Check SMS configuration.');
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

        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#374151', cursor: 'pointer' }}>
            <input type="checkbox" checked={classWiseDue} onChange={e => setClassWiseDue(e.target.checked)} />
            Class Wise Due Summary
          </label>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button onClick={handleShow} disabled={loading} style={{ flex: 1, background: '#29a9d8', color: '#fff', border: 'none', padding: '8px 10px', borderRadius: '4px', fontSize: '12px', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontWeight: 'bold' }}>
            <Eye size={14} /> {loading ? 'Loading...' : 'Show'}
          </button>
        </div>

        {reportData.length > 0 && (
          <button onClick={handleSendReminders} disabled={loading} style={{ width: '100%', background: '#f59e0b', color: '#fff', border: 'none', padding: '8px 10px', borderRadius: '4px', fontSize: '12px', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontWeight: 'bold' }}>
            <Bell size={14} /> Send Reminders ({reportData.length})
          </button>
        )}

      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <div style={{ background: '#fff', width: '100%', minHeight: '100%', borderRadius: '8px', border: '1px solid #e5e7eb', padding: '20px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: '16px', marginBottom: '20px' }}>
            <h2 style={{ margin: 0, fontSize: '18px', color: '#1f2937' }}>Fee Reminder</h2>
            {reportData.length > 0 && (
              <button style={{ background: '#10b981', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' }}>
                <Download size={14} /> Export List
              </button>
            )}
          </div>

          {sentCount > 0 && (
            <div style={{ padding: '12px', background: '#d1fae5', color: '#065f46', borderRadius: '4px', marginBottom: '20px', fontSize: '13px', fontWeight: 'bold' }}>
              ✓ Reminders sent successfully to {sentCount} students!
            </div>
          )}
          {error && <div style={{ padding: '12px', background: '#fee2e2', color: '#991b1b', borderRadius: '4px', marginBottom: '20px', fontSize: '13px' }}>{error}</div>}

          {reportData.length === 0 && !loading && !error ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280', fontSize: '14px' }}>
              Click "Show" to view defaulter students for sending fee reminders.
            </div>
          ) : classWiseDue ? (
            /* Class-wise summary view */
            <div>
              {Object.entries(reportData.reduce((acc, s) => {
                if (!acc[s.class]) acc[s.class] = { count: 0, totalDue: 0 };
                acc[s.class].count += 1;
                acc[s.class].totalDue += s.totalDue;
                return acc;
              }, {})).map(([cls, data]) => (
                <div key={cls} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', border: '1px solid #e5e7eb', borderRadius: '6px', marginBottom: '8px', background: '#fef3c7' }}>
                  <div style={{ fontWeight: 'bold', color: '#374151' }}>{cls}</div>
                  <div style={{ fontSize: '13px', color: '#6b7280' }}>{data.count} defaulters</div>
                  <div style={{ fontWeight: 'bold', color: '#b91c1c' }}>₹{data.totalDue.toLocaleString()}</div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ overflowX: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', whiteSpace: 'nowrap' }}>
                <thead style={{ background: '#f9fafb' }}>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Admission No</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Student Name</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Class</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Mobile No</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right', color: '#374151' }}>Due Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((s, i) => (
                    <tr key={s.admissionNo} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '12px 16px', color: '#4b5563' }}>{s.admissionNo}</td>
                      <td style={{ padding: '12px 16px', color: '#1f2937', fontWeight: '600' }}>{s.studentName}</td>
                      <td style={{ padding: '12px 16px', color: '#4b5563' }}>{s.class}</td>
                      <td style={{ padding: '12px 16px', color: '#4b5563' }}>{s.mobileNumber || 'N/A'}</td>
                      <td style={{ padding: '12px 16px', color: '#b91c1c', textAlign: 'right', fontWeight: 'bold' }}>{s.totalDue}</td>
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
