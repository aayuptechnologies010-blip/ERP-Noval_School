import React, { useState } from 'react';
import { FaFileExcel, FaPrint } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const monthlyData = [
  { month: 'Apr', Class6: 92, Class7: 88, Class8: 94, Class9: 90, Class10: 96 },
  { month: 'May', Class6: 89, Class7: 91, Class8: 90, Class9: 87, Class10: 93 },
  { month: 'Jun', Class6: 94, Class7: 90, Class8: 92, Class9: 89, Class10: 95 },
  { month: 'Jul', Class6: 91, Class7: 93, Class8: 88, Class9: 92, Class10: 97 },
  { month: 'Aug', Class6: 95, Class7: 92, Class8: 94, Class9: 91, Class10: 96 },
];

const radarData = [
  { subject: 'Class 6', A: 92 },
  { subject: 'Class 7', A: 91 },
  { subject: 'Class 8', A: 93 },
  { subject: 'Class 9', A: 90 },
  { subject: 'Class 10', A: 95 },
];

const classStats = [
  { class: 'Class 6', total: 60, avg: '92.4%', highest: '98%', lowest: '75%', color: '#3b82f6' },
  { class: 'Class 7', total: 58, avg: '91.0%', highest: '97%', lowest: '72%', color: '#10b981' },
  { class: 'Class 8', total: 62, avg: '92.8%', highest: '99%', lowest: '74%', color: '#f59e0b' },
  { class: 'Class 9', total: 55, avg: '89.8%', highest: '96%', lowest: '68%', color: '#ef4444' },
  { class: 'Class 10', total: 65, avg: '95.4%', highest: '100%', lowest: '80%', color: '#8b5cf6' },
];

function AverageAttendanceAnalysis() {
  const [fromMonth, setFromMonth] = useState('2026-04');
  const [toMonth, setToMonth] = useState('2026-08');

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '24px 32px 8px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ margin: '0 0 4px', fontSize: 13, color: '#94a3b8' }}>Report &rsaquo;</p>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Average Attendance Analysis</h1>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button style={actionBtn}><FaFileExcel /> Export</button>
          <button style={{ ...actionBtn, background: '#64748b' }}><FaPrint /> Print</button>
        </div>
      </div>

      <div style={{ padding: '16px 32px 32px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Filters */}
        <div style={{ background: '#fff', borderRadius: 8, padding: '20px 24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div>
            <label style={lbl}>From Month</label>
            <input type="month" value={fromMonth} onChange={e => setFromMonth(e.target.value)} style={inp} />
          </div>
          <div>
            <label style={lbl}>To Month</label>
            <input type="month" value={toMonth} onChange={e => setToMonth(e.target.value)} style={inp} />
          </div>
          <button style={{ background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Analyze</button>
        </div>

        {/* Line Chart */}
        <div style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <h3 style={{ margin: '0 0 20px', fontSize: 15, fontWeight: 700, color: '#1e293b' }}>Month-wise Class Attendance Trend (%)</h3>
          <div style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis domain={[60, 100]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Class6" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="Class7" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="Class8" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="Class9" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="Class10" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stats Cards + Radar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
          <div style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 700, color: '#1e293b' }}>Class-wise Summary</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Class', 'Students', 'Avg %', 'Highest', 'Lowest'].map(h => (
                    <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#94a3b8', borderBottom: '1px solid #e2e8f0' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {classStats.map(s => (
                  <tr key={s.class} style={{ borderBottom: '1px solid #f8f9fc' }}>
                    <td style={{ padding: '10px 12px', fontSize: 13, fontWeight: 600, color: s.color }}>{s.class}</td>
                    <td style={{ padding: '10px 12px', fontSize: 13 }}>{s.total}</td>
                    <td style={{ padding: '10px 12px', fontSize: 13, fontWeight: 700, color: '#1e293b' }}>{s.avg}</td>
                    <td style={{ padding: '10px 12px', fontSize: 13, color: '#10b981' }}>{s.highest}</td>
                    <td style={{ padding: '10px 12px', fontSize: 13, color: '#ef4444' }}>{s.lowest}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <h3 style={{ margin: '0 0 20px', fontSize: 15, fontWeight: 700, color: '#1e293b' }}>Comparative Attendance Radar</h3>
            <div style={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[80, 100]} />
                  <Radar name="Avg %" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

const lbl = { display: 'block', marginBottom: 6, fontSize: 12, fontWeight: 600, color: '#94a3b8' };
const inp = { padding: '10px 12px', borderRadius: 6, border: '1px solid #cbd5e1', outline: 'none', fontSize: 14, color: '#334155', minWidth: 160 };
const actionBtn = { display: 'flex', alignItems: 'center', gap: 8, background: '#10b981', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer' };

export default AverageAttendanceAnalysis;
