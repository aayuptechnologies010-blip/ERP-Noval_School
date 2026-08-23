import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaVideo, FaSearch, FaDownload, FaEye } from 'react-icons/fa';

const CLASSES = [
  'NUR A','NUR B','LKG A','LKG B','UKG A','UKG B','UKG C',
  '1 A','1 B','1 C','2 A','2 B','2 C','3 A','3 B','3 C',
  '4 A','4 B','4 C','5 A','5 B','5 C','6 A','6 B','6 C',
  '7 A','7 B','7 C','8 A','8 B','8 C','9 A','9 B','9 C','9 D','9 E','9 F',
  '10 A','10 B','10 C','10 D','11 A','11 B','11 C','11 D','11 E','11 F',
  '12 A','12 B','12 C','12 D'
];

function AttendanceSummary() {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [summaries, setSummaries] = useState({});
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const fetchSummaries = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    let currentSummaries = {};
    
    // Process in chunks to avoid overwhelming the backend
    for (let i = 0; i < CLASSES.length; i += 5) {
      const chunk = CLASSES.slice(i, i + 5);
      await Promise.all(chunk.map(async (className) => {
        const parts = className.split(' ');
        const cls = parts[0];
        const sec = parts[1];
        
        try {
          const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/attendance/summary?class=${cls}&section=${sec}&date=${date}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (res.ok) {
            const data = await res.json();
            currentSummaries[className] = data.summary;
          }
        } catch (e) {
          console.error(`Error fetching summary for ${className}`, e);
        }
      }));
      setSummaries({ ...currentSummaries });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSummaries();
  }, []);

  const handleGo = () => {
    setSummaries({});
    fetchSummaries();
  };

  const filteredClasses = CLASSES.filter(c => c.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Header Bar */}
      <div style={{ padding: '24px 32px 16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Attendance Summary</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#22c55e', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
          Video Tutorial <FaVideo />
        </div>
      </div>

      <div style={{ padding: '0 32px 24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* Left Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <input 
            type="text" 
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            
            style={{ 
              width: 150, border: '1px solid #e2e8f0', borderRadius: 4, background: '#f1f5f9', 
              padding: '8px 12px', fontSize: 14, color: '#334155', outline: 'none' 
            }}
          />
          <button onClick={handleGo} disabled={loading} style={{ background: '#65c466', color: '#fff', border: 'none', borderRadius: 4, padding: '9px 16px', fontSize: 14, fontWeight: 600, cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>
            GO
          </button>
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex' }}>
            <input 
              type="text" 
              placeholder="Search class"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ 
                width: 150, border: '1px solid #e2e8f0', borderRight: 'none', borderRadius: '4px 0 0 4px', 
                padding: '8px 12px', fontSize: 14, color: '#334155', outline: 'none' 
              }}
            />
            <div style={{ border: '1px solid #e2e8f0', background: '#f1f5f9', borderRadius: '0 4px 4px 0', padding: '0 12px', display: 'flex', alignItems: 'center', color: '#475569', cursor: 'pointer' }}>
              <FaSearch />
            </div>
          </div>
          
          <button style={{ 
            background: '#fff', border: '1px solid #e2e8f0', borderRadius: 4, 
            padding: '8px 16px', fontSize: 14, fontWeight: 600, color: '#334155', 
            display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' 
          }}>
            <FaDownload /> Download
          </button>
        </div>
      </div>

      {/* Main Content Card */}
      <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'hidden' }}>
        <div style={{ background: '#fff', borderRadius: 12, height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          
          <div style={{ flex: 1, overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap' }}>Sl. No.</th>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap' }}>Class</th>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap' }}>Total</th>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap' }}>Total Present</th>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap' }}>Present</th>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap' }}>WH</th>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap' }}>Absent</th>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap' }}>Leave</th>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap' }}>NA</th>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap' }}>Late</th>
                  <th style={{ padding: '16px 20px', textAlign: 'center', fontSize: 12, fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap' }}>View</th>
                </tr>
              </thead>
              <tbody>
                {filteredClasses.map((className, index) => {
                  const summary = summaries[className] || { Total: 0, Present: 0, Absent: 0, Leave: 0, HalfDay: 0, Late: 0, NA: 0 };
                  const totalPresent = summary.Present + summary.HalfDay + summary.Late; // Depending on how you calculate total present
                  
                  return (
                  <tr key={className} style={{ background: index % 2 === 0 ? '#fff' : '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 20px', fontSize: 13, color: '#475569' }}>{index + 1}</td>
                    <td style={{ padding: '12px 20px', fontSize: 13, color: '#334155', fontWeight: 600 }}>{className}</td>
                    <td style={{ padding: '12px 20px', fontSize: 13, color: '#475569' }}>{summary.Total}</td>
                    <td style={{ padding: '12px 20px', fontSize: 13, color: '#65c466', fontWeight: 600 }}>{totalPresent}</td>
                    <td style={{ padding: '12px 20px', fontSize: 13, color: '#475569' }}>{summary.Present}</td>
                    <td style={{ padding: '12px 20px', fontSize: 13, color: '#475569' }}>{summary.HalfDay}</td>
                    <td style={{ padding: '12px 20px', fontSize: 13, color: '#ef4444', fontWeight: 600 }}>{summary.Absent}</td>
                    <td style={{ padding: '12px 20px', fontSize: 13, color: '#f59e0b', fontWeight: 600 }}>{summary.Leave}</td>
                    <td style={{ padding: '12px 20px', fontSize: 13, color: '#475569' }}>{summary.NA}</td>
                    <td style={{ padding: '12px 20px', fontSize: 13, color: '#8b5cf6', fontWeight: 600 }}>{summary.Late}</td>
                    <td style={{ padding: '12px 20px', textAlign: 'center' }}>
                      <button 
                        onClick={() => navigate(`/dashboard/students/attendance/class?class=${className.replace(' ', '&section=')}`)}
                        style={{ background: 'none', border: 'none', color: '#6366f1', cursor: 'pointer', fontSize: 16 }}
                      >
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                )})}
                {loading && filteredClasses.length === 0 && (
                  <tr>
                    <td colSpan="11" style={{ padding: '24px', textAlign: 'center', color: '#64748b' }}>Loading summaries...</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AttendanceSummary;
