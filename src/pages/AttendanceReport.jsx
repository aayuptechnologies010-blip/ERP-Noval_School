import React, { useState } from 'react';
import { FaSearch, FaFilter, FaFileExcel, FaPrint } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const overallStats = [
  { title: 'Total Students', value: '1,240', active: '1,210', inactive: '30' },
  { title: 'Present Today', value: '1,150', percentage: '92.7%', status: 'Normal' },
  { title: 'Absent Today', value: '60', percentage: '4.8%', status: 'Warning' },
  { title: 'On Leave Today', value: '30', percentage: '2.5%', status: 'Normal' },
];

const monthlyAttendanceData = [
  { name: 'June', Students: 94, Staff: 96 },
  { name: 'July', Students: 92, Staff: 95 },
  { name: 'August', Students: 95, Staff: 97 },
  { name: 'Sept', Students: 91, Staff: 94 },
  { name: 'Oct', Students: 93, Staff: 96 },
];

const classWiseAttendance = [
  { name: 'Class 6', Present: 95, Absent: 5 },
  { name: 'Class 7', Present: 92, Absent: 8 },
  { name: 'Class 8', Present: 94, Absent: 6 },
  { name: 'Class 9', Present: 91, Absent: 9 },
  { name: 'Class 10', Present: 96, Absent: 4 },
];

const COLORS = ['#10b981', '#ef4444'];

function AttendanceReport() {
  const [reportType, setReportType] = useState('Student');
  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedDate, setSelectedDate] = useState('2026-08-04');

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Header */}
      <div style={{ padding: '24px 32px 8px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ margin: '0 0 4px', fontSize: 13, color: '#94a3b8' }}>Report &rsaquo; Attendance</p>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Attendance Report</h1>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button style={{ ...actionBtn, background: '#10b981' }}><FaFileExcel /> Export Excel</button>
          <button style={{ ...actionBtn, background: '#64748b' }}><FaPrint /> Print</button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '16px 32px 32px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
        
        {/* Filters */}
        <div style={{ background: '#fff', borderRadius: 8, padding: '20px 24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <label style={lbl}>Type</label>
            <select value={reportType} onChange={e => setReportType(e.target.value)} style={inp}>
              <option value="Student">Student</option>
              <option value="Staff">Staff</option>
            </select>
          </div>
          {reportType === 'Student' && (
            <div>
              <label style={lbl}>Class</label>
              <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} style={inp}>
                <option value="All">All Classes</option>
                <option>Class 6</option>
                <option>Class 7</option>
                <option>Class 8</option>
                <option>Class 9</option>
                <option>Class 10</option>
              </select>
            </div>
          )}
          <div>
            <label style={lbl}>Date</label>
            <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} style={inp} />
          </div>
          <button style={{ background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginTop: 18 }}>
            Filter
          </button>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {overallStats.map((s, idx) => (
            <div key={idx} style={{ flex: '1 1 200px', background: '#fff', borderRadius: 8, padding: '20px 24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <span style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>{s.title}</span>
              <h3 style={{ margin: '8px 0 4px', fontSize: 24, fontWeight: 800, color: '#1e293b' }}>{s.value}</h3>
              <span style={{ fontSize: 12, color: s.status === 'Warning' ? '#ef4444' : '#10b981', fontWeight: 600 }}>
                {s.percentage || `Active: ${s.active}`}
              </span>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 24 }}>
          
          {/* Monthly Attendance Chart */}
          <div style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: 15, fontWeight: 700, color: '#1e293b' }}>Monthly Attendance Analysis (%)</h3>
            <div style={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyAttendanceData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis domain={[80, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Students" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Staff" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Class-wise Attendance Chart */}
          <div style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: 15, fontWeight: 700, color: '#1e293b' }}>Class-wise Present vs Absent</h3>
            <div style={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={classWiseAttendance}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Present" stackId="a" fill="#10b981" />
                  <Bar dataKey="Absent" stackId="a" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

const lbl = { display: 'block', marginBottom: 6, fontSize: 12, fontWeight: 600, color: '#94a3b8' };
const inp = { padding: '10px 12px', borderRadius: 6, border: '1px solid #cbd5e1', outline: 'none', fontSize: 14, color: '#334155', background: '#fff', minWidth: 160 };
const actionBtn = { display: 'flex', alignItems: 'center', gap: 8, color: '#fff', border: 'none', padding: '10px 18px', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer' };

export default AttendanceReport;
