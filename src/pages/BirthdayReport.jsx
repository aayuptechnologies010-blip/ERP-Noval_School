import React, { useState } from 'react';
import { FaGift, FaBirthdayCake, FaSearch, FaFileExcel } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const dummyBirthdays = [
  { id: 1, name: 'Aarav Sharma', class: 'Class 10', dob: '2009-08-04', type: 'Student', gender: 'Male' },
  { id: 2, name: 'Priya Verma', class: 'Class 9', dob: '2010-08-06', type: 'Student', gender: 'Female' },
  { id: 3, name: 'Miss Kavita Singh', class: 'N/A', dob: '1992-08-04', type: 'Staff', gender: 'Female' },
  { id: 4, name: 'Rohan Gupta', class: 'Class 8', dob: '2011-08-10', type: 'Student', gender: 'Male' },
  { id: 5, name: 'Mr. Anil Kumar', class: 'N/A', dob: '1985-08-12', type: 'Staff', gender: 'Male' },
  { id: 6, name: 'Sneha Patel', class: 'Class 7', dob: '2012-08-15', type: 'Student', gender: 'Female' },
];

const monthlyCount = [
  { month: 'Jan', count: 8 }, { month: 'Feb', count: 12 }, { month: 'Mar', count: 6 },
  { month: 'Apr', count: 14 }, { month: 'May', count: 10 }, { month: 'Jun', count: 9 },
  { month: 'Jul', count: 11 }, { month: 'Aug', count: 16 }, { month: 'Sep', count: 7 },
  { month: 'Oct', count: 13 }, { month: 'Nov', count: 8 }, { month: 'Dec', count: 15 },
];

function BirthdayReport() {
  const [filterType, setFilterType] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('2026-08');

  const filtered = dummyBirthdays.filter(b => {
    const matchType = filterType === 'All' || b.type === filterType;
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '24px 32px 8px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ margin: '0 0 4px', fontSize: 13, color: '#94a3b8' }}>Report &rsaquo;</p>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Birthday Report</h1>
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#10b981', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
          <FaFileExcel /> Export
        </button>
      </div>

      <div style={{ padding: '16px 32px 32px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Today Banner */}
        <div style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', borderRadius: 10, padding: 24, color: '#fff', display: 'flex', alignItems: 'center', gap: 16 }}>
          <FaBirthdayCake size={32} />
          <div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>🎉 Aarav Sharma & Miss Kavita Singh have birthdays Today!</h3>
            <p style={{ margin: '4px 0 0', opacity: 0.85, fontSize: 13 }}>Don't forget to wish them.</p>
          </div>
        </div>

        {/* Bar Chart */}
        <div style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <h3 style={{ margin: '0 0 20px', fontSize: 15, fontWeight: 700, color: '#1e293b' }}>Month-wise Birthday Distribution</h3>
          <div style={{ height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyCount}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Birthdays" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Filters + Table */}
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <FaSearch style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={12} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name..." style={{ padding: '8px 12px 8px 30px', borderRadius: 6, border: '1px solid #cbd5e1', outline: 'none', fontSize: 13, width: 200 }} />
            </div>
            {['All', 'Student', 'Staff'].map(t => (
              <button key={t} onClick={() => setFilterType(t)} style={{ padding: '7px 16px', borderRadius: 20, border: 'none', fontWeight: 600, fontSize: 12, cursor: 'pointer', background: filterType === t ? '#3b82f6' : '#e2e8f0', color: filterType === t ? '#fff' : '#475569' }}>
                {t}
              </button>
            ))}
            <input type="month" value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)} style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #cbd5e1', outline: 'none', fontSize: 13 }} />
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['Name', 'Type', 'Class', 'Date of Birth', 'Gender'].map(h => (
                  <th key={h} style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(b => (
                <tr key={b.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 34, height: 34, borderRadius: '50%', background: b.type === 'Staff' ? '#dcfce7' : '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: b.type === 'Staff' ? '#16a34a' : '#3b82f6', fontSize: 13 }}>
                        {b.name.charAt(0)}
                      </div>
                      <span style={{ fontWeight: 600, color: '#1e293b' }}>{b.name}</span>
                    </div>
                  </td>
                  <td style={tdStyle}><span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: b.type === 'Staff' ? '#dcfce7' : '#eff6ff', color: b.type === 'Staff' ? '#16a34a' : '#3b82f6' }}>{b.type}</span></td>
                  <td style={tdStyle}>{b.class}</td>
                  <td style={tdStyle}>{b.dob}</td>
                  <td style={tdStyle}>{b.gender}</td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan="5" style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>No birthdays found.</td></tr>}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

const thStyle = { padding: '14px 16px', textAlign: 'left', fontSize: 13, fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', whiteSpace: 'nowrap' };
const tdStyle = { padding: '14px 16px', fontSize: 14, color: '#475569', verticalAlign: 'middle' };

export default BirthdayReport;
