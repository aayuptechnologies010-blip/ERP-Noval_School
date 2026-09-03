import React, { useState, useEffect } from 'react';
import { FaFileExcel, FaPrint } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

// Dummy data removed

function AverageAttendanceAnalysis() {
  const [fromMonth, setFromMonth] = useState('2026-04');
  const [toMonth, setToMonth] = useState('2026-08');
  const [monthlyData, setMonthlyData] = useState([]);
  const [radarData, setRadarData] = useState([]);
  const [classStats, setClassStats] = useState([]);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({ fromMonth, toMonth });
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/reports/average-attendance?${params}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#6366f1', '#ec4899', '#14b8a6'];
        
        if (data.trendChart) setMonthlyData(data.trendChart);
        
        if (data.radarChart) {
          setRadarData(data.radarChart.map(r => ({ subject: r.className, A: r.avgPercentage })));
        }
        
        if (data.classSummary) {
          setClassStats(data.classSummary.map((c, i) => ({
            class: c.className,
            total: c.studentsCount,
            avg: `${c.avgPercentage}%`,
            highest: `${c.highest}%`,
            lowest: `${c.lowest}%`,
            color: colors[i % colors.length]
          })));
        }
      }
    } catch (err) { console.error(err); }
  };

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
          <button onClick={fetchData} style={{ background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Analyze</button>
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
                {classStats.map(stat => (
                  <Line key={stat.class} type="monotone" dataKey={stat.class} stroke={stat.color} strokeWidth={2} dot={{ r: 4 }} />
                ))}
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
