import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

function MyAttendance() {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  // Default to current month
  useEffect(() => {
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    setMonth(currentMonth);
  }, []);

  useEffect(() => {
    if (month && year) {
      fetchMyAttendance();
    }
  }, [month, year]);

  const fetchMyAttendance = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      // Pass month and year as query parameters
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/staff-attendance/my-attendance?month=${month}&year=${year}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setAttendance(data.attendance || []);
      }
    } catch (error) {
      console.error("Failed to load attendance", error);
    } finally {
      setLoading(false);
    }
  };

  const totalPresent = attendance.filter(r => r.status === 'Present' || r.status === 'Late').length;
  const totalAbsent = attendance.filter(r => r.status === 'Absent').length;

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Header Bar */}
      <div style={{ padding: '24px 32px 16px 32px' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>My Attendance</h1>
      </div>

      {/* Main Content Card */}
      <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <label style={{ fontSize: 14, color: '#475569', fontWeight: 600 }}>Select Month</label>
              <select 
                value={month} 
                onChange={e => setMonth(e.target.value)}
                style={inputStyle}
              >
                {['January','February','March','April','May','June','July','August','September','October','November','December'].map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <select 
                value={year} 
                onChange={e => setYear(e.target.value)}
                style={inputStyle}
              >
                {[2023, 2024, 2025, 2026, 2027].map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={statCard}>
                <span style={statLabel}>Total Present</span>
                <span style={{ ...statValue, color: '#16a34a' }}>{totalPresent}</span>
              </div>
              <div style={statCard}>
                <span style={statLabel}>Total Absent</span>
                <span style={{ ...statValue, color: '#ef4444' }}>{totalAbsent}</span>
              </div>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  <th style={thStyle}>Date</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Check In</th>
                  <th style={thStyle}>Check Out</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={4} style={{ textAlign: 'center', padding: 24 }}>Loading...</td></tr>
                ) : attendance.length === 0 ? (
                  <tr><td colSpan={4} style={{ textAlign: 'center', padding: 24 }}>No attendance records found for this month.</td></tr>
                ) : (
                  attendance.map((row) => (
                    <tr key={row._id || row.id || row.date} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={tdStyle}>{row.date ? new Date(row.date).toLocaleDateString() : '-'}</td>
                      <td style={tdStyle}>
                        <span style={{ 
                          padding: '4px 8px', borderRadius: 4, fontSize: 12, fontWeight: 600,
                          background: (row.status === 'Present' || row.status === 'Late') ? '#dcfce7' : row.status === 'Absent' ? '#fee2e2' : '#f1f5f9',
                          color: (row.status === 'Present' || row.status === 'Late') ? '#16a34a' : row.status === 'Absent' ? '#ef4444' : '#64748b'
                        }}>
                          {row.status || '-'}
                        </span>
                      </td>
                      <td style={tdStyle}>{row.checkInTime || '-'}</td>
                      <td style={tdStyle}>{row.checkOutTime || '-'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: '8px 12px',
  borderRadius: 4,
  border: '1px solid #cbd5e1',
  outline: 'none',
  fontSize: 14,
  color: '#334155',
  background: '#fff'
};

const thStyle = {
  padding: '16px',
  textAlign: 'left',
  fontSize: 13,
  fontWeight: 700,
  color: '#0f172a',
  borderBottom: '2px solid #e2e8f0',
  whiteSpace: 'nowrap'
};

const tdStyle = {
  padding: '16px',
  fontSize: 14,
  color: '#475569',
  verticalAlign: 'middle'
};

const statCard = {
  background: '#f8fafc',
  padding: '12px 24px',
  borderRadius: 8,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  border: '1px solid #e2e8f0'
};

const statLabel = {
  fontSize: 12,
  fontWeight: 600,
  color: '#64748b',
  textTransform: 'uppercase',
  letterSpacing: 0.5,
  marginBottom: 4
};

const statValue = {
  fontSize: 24,
  fontWeight: 800,
};

export default MyAttendance;
