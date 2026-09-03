import React, { useState, useEffect } from 'react';
import { FaFileExcel, FaPrint } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Dummy data removed

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#6366f1', '#ec4899', '#14b8a6'];

function TeachersWorkload() {
  const [selectedMonth, setSelectedMonth] = useState('2026-08');
  const [summary, setSummary] = useState({ totalTeachers: 0, totalPeriodsAssigned: 0, avgPeriodsPerTeacher: 0, overloadedTeachers: 0 });
  const [chartData, setChartData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({ month: selectedMonth });
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/reports/teachers-workload?${params}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.summary) setSummary(data.summary);
        if (data.periodsPerTeacherChart) {
          setChartData(data.periodsPerTeacherChart.map(d => ({
            name: d.teacher,
            'Assigned Periods': d.assignedPeriods,
            'Overload': d.overload
          })));
        }
        if (data.workloadDistribution) {
          setPieData(data.workloadDistribution.map((d, i) => ({
            name: d.name,
            value: d.value,
            color: COLORS[i % COLORS.length]
          })));
        }
        if (data.tableData) setTableData(data.tableData);
      }
    } catch (err) { console.error(err); }
  };

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '24px 32px 8px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ margin: '0 0 4px', fontSize: 13, color: '#94a3b8' }}>Report &rsaquo;</p>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Teachers' Workload</h1>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button style={actionBtn}><FaFileExcel /> Export</button>
          <button style={{ ...actionBtn, background: '#64748b' }}><FaPrint /> Print</button>
        </div>
      </div>

      <div style={{ padding: '16px 32px 32px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
        
        {/* Filter */}
        <div style={{ background: '#fff', borderRadius: 8, padding: '20px 24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', gap: 16, alignItems: 'flex-end' }}>
          <div>
            <label style={lbl}>Select Month</label>
            <input type="month" value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)} style={inp} />
          </div>
          <button onClick={fetchData} style={{ background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Generate</button>
        </div>

        {/* Summary Cards */}
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {[
            { title: 'Total Teachers', value: summary.totalTeachers, color: '#3b82f6', bg: '#eff6ff' },
            { title: 'Total Periods Assigned', value: summary.totalPeriodsAssigned, color: '#10b981', bg: '#ecfdf5' },
            { title: 'Avg Periods/Teacher', value: summary.avgPeriodsPerTeacher, color: '#f59e0b', bg: '#fffbeb' },
            { title: 'Overloaded Teachers', value: summary.overloadedTeachers, color: '#ef4444', bg: '#fef2f2' },
          ].map((s, i) => (
            <div key={i} style={{ flex: '1 1 180px', background: '#fff', borderRadius: 8, padding: '20px 24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.value}</span>
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#475569' }}>{s.title}</span>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
          <div style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <h3 style={{ margin: '0 0 20px', fontSize: 15, fontWeight: 700, color: '#1e293b' }}>Periods per Teacher</h3>
            <div style={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Assigned Periods" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Overload" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <h3 style={{ margin: '0 0 20px', fontSize: 15, fontWeight: 700, color: '#1e293b' }}>Workload Distribution</h3>
            <div style={{ height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Table */}
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['Teacher', 'Subject', 'Classes Handled', 'Periods', 'Overload Periods', 'Status'].map(h => (
                  <th key={h} style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((t, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ ...tdStyle, fontWeight: 600, color: '#1e293b' }}>{t.teacherName}</td>
                  <td style={tdStyle}>{t.subject}</td>
                  <td style={tdStyle}>{t.classesHandled}</td>
                  <td style={tdStyle}>{t.periods}</td>
                  <td style={tdStyle}>
                    {t.overloadPeriods > 0 ? (
                      <span style={{ color: '#ef4444', fontWeight: 600 }}>+{t.overloadPeriods} Periods</span>
                    ) : (
                      <span style={{ color: '#10b981' }}>Normal</span>
                    )}
                  </td>
                  <td style={tdStyle}>
                    <span style={{ padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: t.overloadPeriods > 0 ? '#fee2e2' : '#dcfce7', color: t.overloadPeriods > 0 ? '#ef4444' : '#16a34a' }}>
                      {t.overloadPeriods > 0 ? 'Overloaded' : 'Normal'}
                    </span>
                  </td>
                </tr>
              ))}
              {tableData.length === 0 && (
                <tr><td colSpan="6" style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>No data found.</td></tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

const lbl = { display: 'block', marginBottom: 6, fontSize: 12, fontWeight: 600, color: '#94a3b8' };
const inp = { padding: '10px 12px', borderRadius: 6, border: '1px solid #cbd5e1', outline: 'none', fontSize: 14, color: '#334155', minWidth: 160 };
const actionBtn = { display: 'flex', alignItems: 'center', gap: 8, background: '#10b981', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer' };
const thStyle = { padding: '14px 16px', textAlign: 'left', fontSize: 13, fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', whiteSpace: 'nowrap' };
const tdStyle = { padding: '14px 16px', fontSize: 14, color: '#475569', verticalAlign: 'middle' };

export default TeachersWorkload;
