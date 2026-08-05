import React, { useState } from 'react';
import { FaSearch, FaComments, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const dummyData = [
  { id: 1, sender: 'Mrs. Kavita Singh', receiver: 'Parent (Rohan)', topic: 'Academic Progress', date: '2026-08-04', status: 'Resolved' },
  { id: 2, sender: 'Principal', receiver: 'All Staff', topic: 'Annual Function Planning', date: '2026-08-03', status: 'Open' },
  { id: 3, sender: 'Mr. Rajesh Kumar', receiver: 'Student (Aarav)', topic: 'Math Assignment Issue', date: '2026-08-02', status: 'Resolved' },
  { id: 4, sender: 'Miss Priya Sharma', receiver: 'Parent (Sneha)', topic: 'Discipline Issue', date: '2026-08-01', status: 'Pending Review' },
  { id: 5, sender: 'Admin', receiver: 'Mrs. Kavita Singh', topic: 'Leave Request', date: '2026-07-30', status: 'Resolved' },
];

const pieData = [
  { name: 'Resolved', value: 60, color: '#10b981' },
  { name: 'Open', value: 25, color: '#3b82f6' },
  { name: 'Pending Review', value: 15, color: '#f59e0b' },
];

const barData = [
  { day: 'Mon', count: 12 },
  { day: 'Tue', count: 18 },
  { day: 'Wed', count: 15 },
  { day: 'Thu', count: 22 },
  { day: 'Fri', count: 25 },
  { day: 'Sat', count: 8 },
];

function ConversationReport() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = dummyData.filter(c => {
    const matchStatus = statusFilter === 'All' || c.status === statusFilter;
    const matchSearch = c.sender.toLowerCase().includes(search.toLowerCase()) || c.receiver.toLowerCase().includes(search.toLowerCase()) || c.topic.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '24px 32px 8px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ margin: '0 0 4px', fontSize: 13, color: '#94a3b8' }}>Report &rsaquo;</p>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Conversation Report</h1>
        </div>
      </div>

      <div style={{ padding: '16px 32px 32px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
        
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
          <div style={{ background: '#fff', borderRadius: 8, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 50, height: 50, borderRadius: '50%', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FaComments size={22} color="#3b82f6" />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 13, color: '#64748b', fontWeight: 600 }}>Total Threads</p>
              <h3 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: '#1e293b' }}>342</h3>
            </div>
          </div>
          <div style={{ background: '#fff', borderRadius: 8, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 50, height: 50, borderRadius: '50%', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FaCheckCircle size={22} color="#10b981" />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 13, color: '#64748b', fontWeight: 600 }}>Resolved</p>
              <h3 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: '#1e293b' }}>215</h3>
            </div>
          </div>
          <div style={{ background: '#fff', borderRadius: 8, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 50, height: 50, borderRadius: '50%', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FaExclamationCircle size={22} color="#f59e0b" />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 13, color: '#64748b', fontWeight: 600 }}>Pending Action</p>
              <h3 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: '#1e293b' }}>45</h3>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 24 }}>
          <div style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <h3 style={{ margin: '0 0 20px', fontSize: 15, fontWeight: 700, color: '#1e293b' }}>Status Breakdown</h3>
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

          <div style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <h3 style={{ margin: '0 0 20px', fontSize: 15, fontWeight: 700, color: '#1e293b' }}>Weekly Activity Trend</h3>
            <div style={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Messages Sent" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Filters + Table */}
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <FaSearch style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={12} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search topic or names..." style={{ padding: '8px 12px 8px 30px', borderRadius: 6, border: '1px solid #cbd5e1', outline: 'none', fontSize: 13, width: 220 }} />
            </div>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #cbd5e1', outline: 'none', fontSize: 13 }}>
              {['All', 'Resolved', 'Open', 'Pending Review'].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['Topic', 'Sender', 'Receiver', 'Date', 'Status'].map(h => (
                  <th key={h} style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ ...tdStyle, fontWeight: 600, color: '#1e293b' }}>{c.topic}</td>
                  <td style={tdStyle}>{c.sender}</td>
                  <td style={tdStyle}>{c.receiver}</td>
                  <td style={tdStyle}>{c.date}</td>
                  <td style={tdStyle}>
                    <span style={{ 
                      padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                      background: c.status === 'Resolved' ? '#dcfce7' : c.status === 'Open' ? '#eff6ff' : '#fef3c7',
                      color: c.status === 'Resolved' ? '#16a34a' : c.status === 'Open' ? '#3b82f6' : '#f59e0b'
                    }}>
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan="5" style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>No conversations found.</td></tr>}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

const thStyle = { padding: '14px 16px', textAlign: 'left', fontSize: 13, fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', whiteSpace: 'nowrap' };
const tdStyle = { padding: '14px 16px', fontSize: 14, color: '#475569', verticalAlign: 'middle' };

export default ConversationReport;
