import React, { useState } from 'react';
import { FaCalendarAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const dummyAttendance = [
  { id: 1, date: '2023-10-01', status: 'Present', checkIn: '08:00 AM', checkOut: '04:00 PM' },
  { id: 2, date: '2023-10-02', status: 'Holiday', checkIn: '-', checkOut: '-' },
  { id: 3, date: '2023-10-03', status: 'Present', checkIn: '08:05 AM', checkOut: '04:10 PM' },
  { id: 4, date: '2023-10-04', status: 'Absent', checkIn: '-', checkOut: '-' },
  { id: 5, date: '2023-10-05', status: 'Present', checkIn: '07:55 AM', checkOut: '04:00 PM' },
];

function MyAttendance() {
  const [month, setMonth] = useState('October');

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Header Bar */}
      <div style={{ padding: '24px 32px 16px 32px' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>My Attendance</h1>
      </div>

      {/* Main Content Card */}
      <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <label style={{ fontSize: 14, color: '#475569', fontWeight: 600 }}>Select Month</label>
              <select 
                value={month} 
                onChange={e => setMonth(e.target.value)}
                style={inputStyle}
              >
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={statCard}>
                <span style={statLabel}>Total Present</span>
                <span style={{ ...statValue, color: '#16a34a' }}>21</span>
              </div>
              <div style={statCard}>
                <span style={statLabel}>Total Absent</span>
                <span style={{ ...statValue, color: '#ef4444' }}>2</span>
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
                {dummyAttendance.map((row) => (
                  <tr key={row.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={tdStyle}>{row.date}</td>
                    <td style={tdStyle}>
                      <span style={{ 
                        padding: '4px 8px', borderRadius: 4, fontSize: 12, fontWeight: 600,
                        background: row.status === 'Present' ? '#dcfce7' : row.status === 'Absent' ? '#fee2e2' : '#f1f5f9',
                        color: row.status === 'Present' ? '#16a34a' : row.status === 'Absent' ? '#ef4444' : '#64748b'
                      }}>
                        {row.status}
                      </span>
                    </td>
                    <td style={tdStyle}>{row.checkIn}</td>
                    <td style={tdStyle}>{row.checkOut}</td>
                  </tr>
                ))}
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
  color: '#475569'
};

const statCard = {
  display: 'flex',
  flexDirection: 'column',
  background: '#f8fafc',
  padding: '8px 16px',
  borderRadius: 8,
  border: '1px solid #e2e8f0',
  alignItems: 'center'
};

const statLabel = {
  fontSize: 12,
  color: '#64748b',
  fontWeight: 600
};

const statValue = {
  fontSize: 18,
  fontWeight: 700
};

export default MyAttendance;
