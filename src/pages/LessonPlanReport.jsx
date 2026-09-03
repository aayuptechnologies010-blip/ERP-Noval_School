import React, { useState, useEffect } from 'react';
import { FaFileExcel, FaPrint, FaSearch } from 'react-icons/fa';

const statusColors = {
  Completed: { bg: '#dcfce7', color: '#16a34a' },
  'In Progress': { bg: '#e0e7ff', color: '#4f46e5' },
  Pending: { bg: '#fef9c3', color: '#ca8a04' },
};

function LessonPlanReport() {
  const [search, setSearch] = useState('');
  const [filterClass, setFilterClass] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [lessons, setLessons] = useState([]);

  useEffect(() => { fetchLessons(); }, []);

  const fetchLessons = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/reports/lesson-plans`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.records) {
          setLessons(data.records);
        } else {
          setLessons(data);
        }
      }
    } catch (err) { console.error(err); }
  };

  const filtered = lessons.filter(l => {
    const matchClass = filterClass === 'All' || l.class === filterClass;
    const matchStatus = filterStatus === 'All' || l.status === filterStatus;
    const matchSearch = (l.topic || '').toLowerCase().includes(search.toLowerCase()) || (l.teacher || '').toLowerCase().includes(search.toLowerCase());
    return matchClass && matchStatus && matchSearch;
  });

  const completedCount = lessons.filter(l => l.status === 'Completed').length;
  const pendingCount = lessons.filter(l => l.status === 'Pending').length;
  const inProgressCount = lessons.filter(l => l.status === 'In Progress').length;

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '24px 32px 8px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ margin: '0 0 4px', fontSize: 13, color: '#94a3b8' }}>Report &rsaquo;</p>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Lesson Plan Report</h1>
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
            { label: 'Total Plans', val: lessons.length, color: '#3b82f6', bg: '#eff6ff' },
            { label: 'Completed', val: completedCount, color: '#16a34a', bg: '#dcfce7' },
            { label: 'In Progress', val: inProgressCount, color: '#4f46e5', bg: '#e0e7ff' },
            { label: 'Pending', val: pendingCount, color: '#ca8a04', bg: '#fef9c3' },
          ].map((s, i) => (
            <div key={i} style={{ flex: '1 1 160px', background: '#fff', borderRadius: 8, padding: '20px 24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 46, height: 46, borderRadius: 10, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, color: s.color }}>
                {s.val}
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#475569' }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Filters + Table */}
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <FaSearch style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={12} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search topic or teacher..." style={{ padding: '8px 12px 8px 30px', borderRadius: 6, border: '1px solid #cbd5e1', outline: 'none', fontSize: 13, width: 220 }} />
            </div>
            <select value={filterClass} onChange={e => setFilterClass(e.target.value)} style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #cbd5e1', outline: 'none', fontSize: 13 }}>
              {['All', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'].map(c => <option key={c}>{c}</option>)}
            </select>
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #cbd5e1', outline: 'none', fontSize: 13 }}>
              {['All', 'Completed', 'In Progress', 'Pending'].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['Topic', 'Subject', 'Teacher', 'Class', 'Duration', 'Date', 'Status'].map(h => (
                  <th key={h} style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(l => (
                <tr key={l.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ ...tdStyle, fontWeight: 600, color: '#1e293b', maxWidth: 200 }}>{l.topic}</td>
                  <td style={tdStyle}>{l.subject}</td>
                  <td style={tdStyle}>{l.teacher}</td>
                  <td style={tdStyle}>{l.class}</td>
                  <td style={tdStyle}>{l.duration || 'N/A'}</td>
                  <td style={tdStyle}>{new Date(l.date).toLocaleDateString()}</td>
                  <td style={tdStyle}>
                    <span style={{ padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: statusColors[l.status]?.bg, color: statusColors[l.status]?.color }}>{l.status}</span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan="7" style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>No lesson plans found.</td></tr>}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

const thStyle = { padding: '14px 16px', textAlign: 'left', fontSize: 13, fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', whiteSpace: 'nowrap' };
const tdStyle = { padding: '14px 16px', fontSize: 14, color: '#475569', verticalAlign: 'middle' };

export default LessonPlanReport;
