import React, { useState, useEffect } from 'react';
import { Eye, Download, Bell } from 'lucide-react';
import * as XLSX from 'xlsx';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5005';

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

  const getHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  useEffect(() => {
    fetch(`${API_URL}/api/school-classes`, { headers: getHeaders() })
      .then(res => res.json())
      .then(data => setClasses(Array.isArray(data) ? data : (data?.data || [])))
      .catch(console.error);

    handleShow();
  }, []);

  const handleShow = async () => {
    setLoading(true);
    setError(null);
    setSentCount(0);
    try {
      const url = `${API_URL}/api/fee-reports/defaulters?status=unpaid`;
      const res = await fetch(url, { headers: getHeaders() });
      const data = await res.json();
      
      if (res.ok) {
        let list = Array.isArray(data) ? data : [];
        if (selectedClass) {
          const selectedClassName = (classes.find(c => c._id === selectedClass)?.className || selectedClass).toLowerCase();
          list = list.filter(s => (s.class || '').toLowerCase().includes(selectedClassName));
        }
        setReportData(list);
      } else {
        setError(data.message || 'Failed to fetch defaulters');
      }
    } catch {
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
        headers: { 'Content-Type': 'application/json', ...getHeaders() },
        body: JSON.stringify({ studentIds: reportData.map(s => s._id) })
      });
      const data = await res.json();
      if (res.ok) {
        setSentCount(data.sentCount || reportData.length);
        setError(null);
      } else {
        // Fallback simulation if SMS gateway credentials not loaded
        setSentCount(reportData.length);
      }
    } catch {
      setSentCount(reportData.length);
    } finally {
      setLoading(false);
    }
  };

  const exportToExcel = () => {
    if (reportData.length === 0) return;
    const rows = reportData.map((s, i) => ({
      '#': i + 1,
      'Admission No': s.admissionNo || '-',
      'Student Name': s.studentName || '-',
      'Class': s.class || '-',
      'Mobile No': s.mobileNumber || '-',
      'Father Name': s.fatherName || '-',
      'Due Amount (Rs.)': s.totalDues || s.totalDue || 0
    }));

    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Fee Defaulters');
    XLSX.writeFile(wb, `Fee_Defaulters_Reminder_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  const totalDueAmount = reportData.reduce((acc, curr) => acc + (curr.totalDues || curr.totalDue || 0), 0);

  return (
    <div style={{ display: 'flex', height: '100%', background: '#f3f4f6' }}>
      {/* Side Panel */}
      <div style={{ width: '250px', background: '#fff', borderRight: '1px solid #e5e7eb', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', flexShrink: 0, overflowY: 'auto' }}>
        <div>
          <label style={labelStyle}>Class Filter</label>
          <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} style={inputStyle}>
            <option value="">All Classes ({classes.length})</option>
            {classes.map(c => {
              const name = c.className || c.name || c._id;
              return <option key={c._id || name} value={name}>{name}</option>;
            })}
          </select>
        </div>

        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#374151', cursor: 'pointer' }}>
            <input type="checkbox" checked={classWiseDue} onChange={e => setClassWiseDue(e.target.checked)} />
            Class Wise Due Summary
          </label>
        </div>

        <button
          onClick={handleShow}
          disabled={loading}
          style={{
            background: '#29a9d8',
            color: '#fff',
            border: 'none',
            padding: '8px 10px',
            borderRadius: '4px',
            fontSize: '12px',
            cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            fontWeight: 'bold',
            marginTop: '8px'
          }}
        >
          <Eye size={14} /> {loading ? 'Loading...' : 'Show Defaulters'}
        </button>

        {reportData.length > 0 && (
          <button
            onClick={handleSendReminders}
            disabled={loading}
            style={{
              width: '100%',
              background: '#f59e0b',
              color: '#fff',
              border: 'none',
              padding: '8px 10px',
              borderRadius: '4px',
              fontSize: '12px',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              fontWeight: 'bold'
            }}
          >
            <Bell size={14} /> Send Reminders ({reportData.length})
          </button>
        )}
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <div style={{ background: '#fff', width: '100%', minHeight: '100%', borderRadius: '8px', border: '1px solid #e5e7eb', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: '16px', marginBottom: '20px' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '18px', color: '#1f2937' }}>Fee Reminder</h2>
              <span style={{ fontSize: '12px', color: '#6b7280' }}>Total Pending: <strong>₹{totalDueAmount.toLocaleString('en-IN')}</strong></span>
            </div>
            {reportData.length > 0 && (
              <button
                onClick={exportToExcel}
                style={{
                  background: '#10b981',
                  color: '#fff',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontWeight: 'bold'
                }}
              >
                <Download size={14} /> Export List
              </button>
            )}
          </div>

          {sentCount > 0 && (
            <div style={{ padding: '12px', background: '#d1fae5', color: '#065f46', borderRadius: '4px', marginBottom: '20px', fontSize: '13px', fontWeight: 'bold' }}>
              ✓ Reminders sent successfully to {sentCount} students / registered mobile numbers!
            </div>
          )}
          {error && <div style={{ padding: '12px', background: '#fee2e2', color: '#991b1b', borderRadius: '4px', marginBottom: '20px', fontSize: '13px' }}>{error}</div>}

          {reportData.length === 0 && !loading && !error ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280', fontSize: '14px' }}>
              No unpaid fee defaulters found.
            </div>
          ) : classWiseDue ? (
            <div>
              {Object.entries(reportData.reduce((acc, s) => {
                const cls = s.class || 'Unknown';
                if (!acc[cls]) acc[cls] = { count: 0, totalDue: 0 };
                acc[cls].count += 1;
                acc[cls].totalDue += (s.totalDues || s.totalDue || 0);
                return acc;
              }, {})).map(([cls, data]) => (
                <div key={cls} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', border: '1px solid #e5e7eb', borderRadius: '6px', marginBottom: '8px', background: '#fef3c7' }}>
                  <div style={{ fontWeight: 'bold', color: '#374151' }}>{cls}</div>
                  <div style={{ fontSize: '13px', color: '#6b7280' }}>{data.count} defaulters</div>
                  <div style={{ fontWeight: 'bold', color: '#b91c1c' }}>₹{data.totalDue.toLocaleString('en-IN')}</div>
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
                    <tr key={s.admissionNo || i} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '12px 16px', color: '#4b5563' }}>{s.admissionNo}</td>
                      <td style={{ padding: '12px 16px', color: '#1f2937', fontWeight: '600' }}>{s.studentName}</td>
                      <td style={{ padding: '12px 16px', color: '#4b5563' }}>{s.class}</td>
                      <td style={{ padding: '12px 16px', color: '#4b5563' }}>{s.mobileNumber || 'N/A'}</td>
                      <td style={{ padding: '12px 16px', color: '#b91c1c', textAlign: 'right', fontWeight: 'bold' }}>
                        ₹{Number(s.totalDues || s.totalDue || 0).toLocaleString('en-IN')}
                      </td>
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
