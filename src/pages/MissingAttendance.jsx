import React, { useState, useEffect } from 'react';
import { FaPaperPlane, FaSearch, FaExclamationCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';

// Dummy data removed

function MissingAttendance() {
  const today = new Date().toISOString().split('T')[0];
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedDate, setSelectedDate] = useState(today);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchData(today); }, []);

  const fetchData = async (date) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({ date });
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/reports/missing-attendance?${params}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setRecords(data.records || []);
      }
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const handleSendReminder = (teacher, cls) => {
    toast.success(`Reminder sent to ${teacher} for ${cls}.`);
  };

  const handleSendAll = () => {
    if (records.length === 0) return toast.info('No missing records found.');
    toast.success(`Reminder sent to all ${records.length} pending teachers.`);
  };

  const filtered = records.filter(r =>
    (r.teacher || '').toLowerCase().includes(search.toLowerCase()) ||
    (r.class || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Header */}
      <div style={{ padding: '24px 32px 8px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ margin: '0 0 4px', fontSize: 13, color: '#94a3b8' }}>Report &rsaquo; Missing Attendance</p>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Missing Attendance Report</h1>
        </div>
        <button onClick={handleSendAll} style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
          <FaPaperPlane size={12} /> Send Reminder to All
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: '16px 32px 32px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
        
        {/* Stats Summary Card */}
        <div style={{ background: '#fff', borderRadius: 8, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 50, height: 50, borderRadius: '50%', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FaExclamationCircle size={24} color="#ef4444" />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: 18, color: '#1e293b', fontWeight: 700 }}>{records.length} Classes Missing Attendance</h3>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: '#64748b' }}>Attendance has not been finalized for these sessions on {selectedDate}.</p>
          </div>
        </div>

        {/* Filter Bar */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <FaSearch style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={12} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search teacher or class..." style={{ padding: '8px 12px 8px 30px', borderRadius: 6, border: '1px solid #cbd5e1', outline: 'none', fontSize: 13, width: 240 }} />
          </div>
          <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #cbd5e1', outline: 'none', fontSize: 13 }} />
          <button onClick={() => fetchData(selectedDate)} style={{ background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Search</button>
        </div>

        {/* Table */}
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['Class', 'Period', 'Subject', 'Assigned Teacher', 'Date', 'Status', 'Action'].map(h => (
                  <th key={h} style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && <tr><td colSpan="7" style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>Loading...</td></tr>}
              {!loading && filtered.map(r => (
                <tr key={r.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ ...tdStyle, fontWeight: 600, color: '#1e293b' }}>{r.class}</td>
                  <td style={tdStyle}>{r.period}</td>
                  <td style={tdStyle}>{r.subject}</td>
                  <td style={tdStyle}>{r.teacher}</td>
                  <td style={tdStyle}>{r.date}</td>
                  <td style={tdStyle}>
                    <span style={{ padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: '#fee2e2', color: '#ef4444' }}>
                      {r.status}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <button onClick={() => handleSendReminder(r.teacher, r.class)} style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: 4, fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <FaPaperPlane size={10} /> Send Reminder
                    </button>
                  </td>
                </tr>
              ))}
              {!loading && filtered.length === 0 && (
                <tr><td colSpan="7" style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>All attendance records are up-to-date for this date.</td></tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}

const thStyle = { padding: '14px 16px', textAlign: 'left', fontSize: 13, fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', whiteSpace: 'nowrap' };
const tdStyle = { padding: '14px 16px', fontSize: 14, color: '#475569', verticalAlign: 'middle' };

export default MissingAttendance;
