import React, { useState } from 'react';
import { FaSearch, FaFileAlt } from 'react-icons/fa';

const allData = [
  { id: 1, name: 'Aarav Sharma', type: 'Student', class: 'Class 10', infraction: 'Late Coming', severity: 'Minor', date: '2023-10-02', consequence: 'Verbal Warning', points: 2 },
  { id: 2, name: 'Rohan Gupta', type: 'Student', class: 'Class 8', infraction: 'Bullying', severity: 'Severe', date: '2023-10-05', consequence: 'Parent Meeting', points: 10 },
  { id: 3, name: 'Miss Priya Sharma', type: 'Staff', class: 'N/A', infraction: 'Late Coming', severity: 'Minor', date: '2023-10-03', consequence: 'Verbal Warning', points: 2 },
  { id: 4, name: 'Priya Verma', type: 'Student', class: 'Class 9', infraction: 'Uniform Violation', severity: 'Minor', date: '2023-10-07', consequence: 'Written Warning', points: 3 },
  { id: 5, name: 'Mr. Suresh Yadav', type: 'Staff', class: 'N/A', infraction: 'Absenteeism', severity: 'Moderate', date: '2023-10-07', consequence: 'Written Warning', points: 5 },
  { id: 6, name: 'Aditya Kumar', type: 'Student', class: 'Class 7', infraction: 'Cheating in Exam', severity: 'Severe', date: '2023-10-10', consequence: 'Suspension - 1 Day', points: 10 },
];

const severityColors = {
  Minor:    { bg: '#fef9c3', color: '#ca8a04' },
  Moderate: { bg: '#ffedd5', color: '#ea580c' },
  Severe:   { bg: '#fee2e2', color: '#ef4444' },
};

function InfractionReport() {
  const [filterType, setFilterType] = useState('All');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [search, setSearch] = useState('');
  const [reportData, setReportData] = useState([]);
  const [generated, setGenerated] = useState(false);

  const generateReport = async () => {
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams();
      if (filterType !== 'All') params.append('type', filterType);
      if (fromDate) params.append('fromDate', fromDate);
      if (toDate) params.append('toDate', toDate);
      if (search) params.append('search', search);

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/reports/infractions?${params}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setReportData(data);
        setGenerated(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const totalPoints = reportData.reduce((sum, r) => sum + r.points, 0);

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '24px 32px 8px 32px' }}>
        <p style={{ margin: '0 0 4px', fontSize: 13, color: '#94a3b8' }}>Discipline › Infraction</p>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Infraction Report</h1>
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
            <div style={{ padding: '16px 24px', background: '#f8fafc', display: 'flex', gap: 32 }}>
              <div><span style={{ fontSize: 13, color: '#64748b' }}>Total Records: </span><strong>{reportData.length}</strong></div>
              <div><span style={{ fontSize: 13, color: '#64748b' }}>Total Penalty Points: </span><strong style={{ color: '#ef4444' }}>-{totalPoints}</strong></div>
              <div><span style={{ fontSize: 13, color: '#64748b' }}>Students: </span><strong>{reportData.filter(r => r.type === 'Student').length}</strong></div>
              <div><span style={{ fontSize: 13, color: '#64748b' }}>Staff: </span><strong>{reportData.filter(r => r.type === 'Staff').length}</strong></div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f1f5f9' }}>
                  {['#', 'Name', 'Type', 'Class/Dept', 'Infraction', 'Severity', 'Consequence', 'Points', 'Date'].map(h => (
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
                    <td style={tdStyle}>{r.infraction}</td>
                    <td style={tdStyle}>
                      <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: severityColors[r.severity]?.bg, color: severityColors[r.severity]?.color }}>
                        {r.severity}
                      </span>
                    </td>
                    <td style={tdStyle}>{r.consequence}</td>
                    <td style={tdStyle}><span style={{ fontWeight: 700, color: '#ef4444' }}>-{r.points}</span></td>
                    <td style={tdStyle}>{r.date}</td>
                  </tr>
                ))}
                {reportData.length === 0 && (
                  <tr><td colSpan="9" style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>No records found for the selected filters.</td></tr>
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

export default InfractionReport;
