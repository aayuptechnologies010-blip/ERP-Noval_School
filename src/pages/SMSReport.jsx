import React, { useState } from 'react';
import { FaFileExcel, FaPrint, FaSearch, FaSms, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const dummyData = [
  { id: 1, date: '2026-08-01', type: 'Transactional', sentTo: 'Parents (Class 10)', message: 'Dear parents, please note...', count: 120, status: 'Delivered' },
  { id: 2, date: '2026-08-02', type: 'Promotional', sentTo: 'All Students', message: 'Join our new club...', count: 450, status: 'Delivered' },
  { id: 3, date: '2026-08-03', type: 'Transactional', sentTo: 'Staff', message: 'Meeting at 3 PM...', count: 45, status: 'Failed' },
  { id: 4, date: '2026-08-04', type: 'OTP', sentTo: 'Student (Aarav)', message: 'Your login OTP is 4561...', count: 1, status: 'Delivered' },
];

const pieData = [
  { name: 'Delivered', value: 85, color: '#10b981' },
  { name: 'Failed', value: 10, color: '#ef4444' },
  { name: 'Pending', value: 5, color: '#f59e0b' },
];

function SMSReport() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  const filtered = dummyData.filter(d => {
    const matchType = typeFilter === 'All' || d.type === typeFilter;
    const matchSearch = d.sentTo.toLowerCase().includes(search.toLowerCase()) || d.message.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '24px 32px 8px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ margin: '0 0 4px', fontSize: 13, color: '#94a3b8' }}>Report &rsaquo; SMS Report &rsaquo;</p>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Report</h1>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#10b981', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}><FaFileExcel /> Export</button>
          <button style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#64748b', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}><FaPrint /> Print</button>
        </div>
      </div>

      <div style={{ padding: '16px 32px 32px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
        
        {/* Stats */}
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {[
            { label: 'Total SMS Sent', val: 616, icon: FaSms, color: '#3b82f6', bg: '#eff6ff' },
            { label: 'Delivered', val: 571, icon: FaCheckCircle, color: '#16a34a', bg: '#dcfce7' },
            { label: 'Failed', val: 45, icon: FaExclamationCircle, color: '#ef4444', bg: '#fef2f2' },
          ].map((s, i) => (
            <div key={i} style={{ flex: '1 1 200px', background: '#fff', borderRadius: 8, padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 50, height: 50, borderRadius: '50%', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <s.icon size={22} color={s.color} />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 13, color: '#64748b', fontWeight: 600 }}>{s.label}</p>
                <h3 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: '#1e293b' }}>{s.val}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Chart & Table Area */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 24, flex: 1 }}>
          <div style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <h3 style={{ margin: '0 0 20px', fontSize: 15, fontWeight: 700, color: '#1e293b' }}>Delivery Status</h3>
            <div style={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="value" label>
                    {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
                <FaSearch style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={12} />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search message or recipient..." style={{ width: '100%', padding: '8px 12px 8px 30px', borderRadius: 6, border: '1px solid #cbd5e1', outline: 'none', fontSize: 13, boxSizing: 'border-box' }} />
              </div>
              <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #cbd5e1', outline: 'none', fontSize: 13 }}>
                {['All', 'Transactional', 'Promotional', 'OTP'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div style={{ flex: 1, overflowY: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    {['Date', 'Type', 'Sent To', 'Message Snippet', 'Count', 'Status'].map(h => (
                      <th key={h} style={thStyle}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(d => (
                    <tr key={d.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={tdStyle}>{d.date}</td>
                      <td style={tdStyle}><span style={{ fontWeight: 600, color: '#3b82f6' }}>{d.type}</span></td>
                      <td style={tdStyle}>{d.sentTo}</td>
                      <td style={{ ...tdStyle, maxWidth: 150, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.message}</td>
                      <td style={tdStyle}>{d.count}</td>
                      <td style={tdStyle}>
                        <span style={{ padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: d.status === 'Delivered' ? '#dcfce7' : '#fee2e2', color: d.status === 'Delivered' ? '#16a34a' : '#ef4444' }}>{d.status}</span>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && <tr><td colSpan="6" style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>No SMS records found.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const thStyle = { padding: '14px 16px', textAlign: 'left', fontSize: 13, fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', whiteSpace: 'nowrap' };
const tdStyle = { padding: '14px 16px', fontSize: 14, color: '#475569', verticalAlign: 'middle' };

export default SMSReport;
