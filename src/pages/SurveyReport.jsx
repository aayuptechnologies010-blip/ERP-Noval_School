import React, { useState, useEffect } from 'react';
import { FaPoll, FaPlus, FaEye, FaTrash, FaCheckCircle, FaRegClock } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { toast } from 'react-toastify';

// Dummy data removed

function SurveyReport() {
  const [filter, setFilter] = useState('All');
  const [surveys, setSurveys] = useState([]);
  const [summary, setSummary] = useState({ total: 0, active: 0, completed: 0 });
  const [chartData, setChartData] = useState([]);

  useEffect(() => { fetchSurveys(); }, []);

  const fetchSurveys = async () => {
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({ status: filter });
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/reports/surveys?${params}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setSurveys(data.records || []);
        if (data.summary) setSummary(data.summary);
      }
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this survey?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/surveys/${id}`, {
        method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) { toast.success('Survey deleted!'); fetchSurveys(); }
      else toast.error('Failed to delete.');
    } catch (err) { toast.error('Server error.'); }
  };

  const filtered = surveys.filter(s => filter === 'All' || s.status === filter);

  return (
    <div style={{ flex: 1, background: '#f8f9fc', padding: '24px', minHeight: '100vh', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1e293b', margin: 0 }}>Survey Report</h1>
          <p style={{ color: '#64748b', fontSize: 13, margin: '4px 0 0' }}>Manage and analyze school surveys & polls</p>
        </div>
        <button style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: 6, cursor: 'pointer', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
          <FaPlus /> Create New Survey
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 24 }}>
        <div style={{ background: '#fff', padding: 24, borderRadius: 12, boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 50, height: 50, borderRadius: '50%', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}>
            <FaPoll size={24} />
          </div>
          <div>
        <h3 style={{ margin: 0, fontSize: 24, color: '#1e293b', fontWeight: 800 }}>{summary.total}</h3>
            <p style={{ margin: 0, fontSize: 13, color: '#64748b', fontWeight: 500 }}>Total Surveys</p>
          </div>
        </div>
        <div style={{ background: '#fff', padding: 24, borderRadius: 12, boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 50, height: 50, borderRadius: '50%', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706' }}>
            <FaRegClock size={24} />
          </div>
          <div>
        <h3 style={{ margin: 0, fontSize: 24, color: '#1e293b', fontWeight: 800 }}>{summary.active}</h3>
            <p style={{ margin: 0, fontSize: 13, color: '#64748b', fontWeight: 500 }}>Active Surveys</p>
          </div>
        </div>
        <div style={{ background: '#fff', padding: 24, borderRadius: 12, boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 50, height: 50, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a' }}>
            <FaCheckCircle size={24} />
          </div>
          <div>
        <h3 style={{ margin: 0, fontSize: 24, color: '#1e293b', fontWeight: 800 }}>{summary.completed}</h3>
            <p style={{ margin: 0, fontSize: 13, color: '#64748b', fontWeight: 500 }}>Completed</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        
        {/* Surveys Table */}
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 4px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0, fontSize: 16, color: '#1e293b', fontWeight: 700 }}>Recent Surveys</h2>
            <select value={filter} onChange={e => setFilter(e.target.value)} style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #cbd5e1', outline: 'none', fontSize: 13 }}>
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                <th style={thStyle}>Title</th>
                <th style={thStyle}>Target Audience</th>
                <th style={thStyle}>Responses</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={tdStyle}>
                    <p style={{ margin: 0, fontWeight: 600, color: '#334155' }}>{s.title}</p>
                    <p style={{ margin: 0, fontSize: 11, color: '#94a3b8' }}>{s.date}</p>
                  </td>
                  <td style={tdStyle}>{s.audience}</td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ flex: 1, height: 6, background: '#e2e8f0', borderRadius: 4, overflow: 'hidden' }}>
                        <div style={{ height: '100%', background: '#3b82f6', width: `${(s.responses / s.target) * 100}%` }} />
                      </div>
                      <span style={{ fontSize: 12, color: '#64748b' }}>{s.responses}/{s.target}</span>
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <span style={{ padding: '4px 8px', borderRadius: 4, fontSize: 11, fontWeight: 700, background: s.status === 'Active' ? '#fef3c7' : '#dcfce7', color: s.status === 'Active' ? '#d97706' : '#16a34a' }}>
                      {s.status}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', gap: 12 }}>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }} title="View Results"><FaEye size={16} /></button>
                      <button onClick={() => handleDelete(s.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }} title="Delete"><FaTrash size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Global Feedback Chart */}
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 4px rgba(0,0,0,0.05)', padding: 24, display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ margin: '0 0 20px', fontSize: 16, color: '#1e293b', fontWeight: 700 }}>Overall Satisfaction (Latest)</h2>
          <div style={{ flex: 1, minHeight: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}

const thStyle = { padding: '12px 24px', fontSize: 12, fontWeight: 600, color: '#64748b', textTransform: 'uppercase' };
const tdStyle = { padding: '16px 24px', fontSize: 13, color: '#475569', verticalAlign: 'middle' };

export default SurveyReport;
