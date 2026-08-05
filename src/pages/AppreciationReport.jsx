import React, { useState } from 'react';
import { FaSearch, FaFileAlt } from 'react-icons/fa';

const allData = [
  { id: 1, name: 'Aarav Sharma', type: 'Student', class: 'Class 10', appreciation: 'Best Student Award', date: '2023-10-01', points: 10 },
  { id: 2, name: 'Priya Verma', type: 'Student', class: 'Class 9', appreciation: 'Perfect Attendance', date: '2023-10-05', points: 5 },
  { id: 3, name: 'Miss Priya Sharma', type: 'Staff', class: 'N/A', appreciation: 'Best Teacher', date: '2023-10-02', points: 10 },
  { id: 4, name: 'Rohan Gupta', type: 'Student', class: 'Class 8', appreciation: 'Sports Champion', date: '2023-10-10', points: 8 },
  { id: 5, name: 'Mr. Ramesh Gupta', type: 'Staff', class: 'N/A', appreciation: 'Most Punctual', date: '2023-10-06', points: 7 },
  { id: 6, name: 'Sneha Singh', type: 'Student', class: 'Class 10', appreciation: 'Cultural Star', date: '2023-10-12', points: 6 },
  { id: 7, name: 'Ms. Kavita Singh', type: 'Staff', class: 'N/A', appreciation: 'Innovation Award', date: '2023-10-11', points: 8 },
];

function AppreciationReport() {
  const [filterType, setFilterType] = useState('All');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [search, setSearch] = useState('');
  const [reportData, setReportData] = useState([]);
  const [generated, setGenerated] = useState(false);

  const generateReport = () => {
    let data = allData;
    if (filterType !== 'All') data = data.filter(d => d.type === filterType);
    if (fromDate) data = data.filter(d => d.date >= fromDate);
    if (toDate) data = data.filter(d => d.date <= toDate);
    if (search) data = data.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));
    setReportData(data);
    setGenerated(true);
  };

  const totalPoints = reportData.reduce((sum, r) => sum + r.points, 0);

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '24px 32px 8px 32px' }}>
        <p style={{ margin: '0 0 4px', fontSize: 13, color: '#94a3b8' }}>Discipline › Appreciation</p>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Appreciation Report</h1>
      </div>

      <div style={{ padding: '16px 32px 32px', flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Filter Box */}
        <div style={{ background: '#fff', borderRadius: 8, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 15, color: '#334155' }}>Filter Report</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
            <div>
              <label style={lbl}>Type</label>
              <select value={filterType} onChange={e => setFilterType(e.target.value)} style={inp}>
                <option>All</option>
                <option>Student</option>
                <option>Staff</option>
              </select>
            </div>
            <div>
              <label style={lbl}>From Date</label>
              <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} style={inp} />
            </div>
            <div>
              <label style={lbl}>To Date</label>
              <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} style={inp} />
            </div>
            <div>
              <label style={lbl}>Search Name</label>
              <div style={{ position: 'relative' }}>
                <FaSearch style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={12} />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Name..." style={{ ...inp, paddingLeft: 28 }} />
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
            <button onClick={generateReport} style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: 6, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
              <FaFileAlt size={12} /> Generate Report
            </button>
          </div>
        </div>

        {/* Report Table */}
        {generated && (
          <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
            {/* Summary */}
            <div style={{ padding: '16px 24px', background: '#f8fafc', display: 'flex', gap: 32 }}>
              <div><span style={{ fontSize: 13, color: '#64748b' }}>Total Records: </span><strong>{reportData.length}</strong></div>
              <div><span style={{ fontSize: 13, color: '#64748b' }}>Total Points Awarded: </span><strong style={{ color: '#3b82f6' }}>{totalPoints}</strong></div>
              <div><span style={{ fontSize: 13, color: '#64748b' }}>Students: </span><strong>{reportData.filter(r => r.type === 'Student').length}</strong></div>
              <div><span style={{ fontSize: 13, color: '#64748b' }}>Staff: </span><strong>{reportData.filter(r => r.type === 'Staff').length}</strong></div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f1f5f9' }}>
                  {['#', 'Name', 'Type', 'Class/Dept', 'Appreciation', 'Points', 'Date'].map(h => (
                    <th key={h} style={thStyle}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reportData.map((r, i) => (
                  <tr key={r.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={tdStyle}>{i + 1}</td>
                    <td style={{ ...tdStyle, fontWeight: 600, color: '#1e293b' }}>{r.name}</td>
                    <td style={tdStyle}>
                      <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: r.type === 'Student' ? '#e0e7ff' : '#dcfce7', color: r.type === 'Student' ? '#4f46e5' : '#16a34a' }}>
                        {r.type}
                      </span>
                    </td>
                    <td style={tdStyle}>{r.class}</td>
                    <td style={tdStyle}>{r.appreciation}</td>
                    <td style={tdStyle}><span style={{ fontWeight: 700, color: '#3b82f6' }}>+{r.points}</span></td>
                    <td style={tdStyle}>{r.date}</td>
                  </tr>
                ))}
                {reportData.length === 0 && (
                  <tr><td colSpan="7" style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>No records found for the selected filters.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}

const thStyle = { padding: '14px 16px', textAlign: 'left', fontSize: 13, fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', whiteSpace: 'nowrap' };
const tdStyle = { padding: '14px 16px', fontSize: 14, color: '#475569', verticalAlign: 'middle' };
const lbl = { display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600, color: '#475569' };
const inp = { width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box', fontSize: 14 };

export default AppreciationReport;
