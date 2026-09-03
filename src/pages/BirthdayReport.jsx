import React, { useState, useEffect } from 'react';
import { FaGift, FaBirthdayCake, FaSearch, FaFileExcel } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'react-toastify';

function BirthdayReport() {
  const [birthdays, setBirthdays] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [todaysBirthdays, setTodaysBirthdays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('All');
  const [search, setSearch] = useState('');
  
  // Use current month/year as default
  const todayDate = new Date();
  const defaultMonth = `${todayDate.getFullYear()}-${String(todayDate.getMonth() + 1).padStart(2, '0')}`;
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { 'Authorization': `Bearer ${token}` };

        const [birthdaysRes, chartRes, todayRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_BASE_URL}/api/reports/birthdays`, { headers }),
          fetch(`${import.meta.env.VITE_API_BASE_URL}/api/reports/birthdays/chart`, { headers }),
          fetch(`${import.meta.env.VITE_API_BASE_URL}/api/reports/birthdays/today`, { headers })
        ]);
        
        if (birthdaysRes.ok && chartRes.ok && todayRes.ok) {
          const bData = await birthdaysRes.json();
          const cData = await chartRes.json();
          const tData = await todayRes.json();
          setBirthdays(bData);
          setChartData(cData);
          setTodaysBirthdays(tData);
        } else {
          toast.error("Failed to load birthday report data");
        }
      } catch (error) {
        console.error("Error fetching birthday report:", error);
        toast.error("An error occurred while fetching report data");
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, []);

  // Compute filtered list based on Search and Type only.
  // The month filter is usually for filtering the table, let's keep it.
  const filtered = birthdays.filter(b => {
    const matchType = filterType === 'All' || b.type === filterType;
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase());
    
    // Check if dob month matches selectedMonth (format: YYYY-MM)
    const dobDate = new Date(b.dateOfBirth);
    const dobMonthStr = String(dobDate.getMonth() + 1).padStart(2, '0');
    const selectedMonthStr = selectedMonth ? selectedMonth.split('-')[1] : null; 
    const matchMonth = selectedMonthStr ? dobMonthStr === selectedMonthStr : true;
    
    return matchType && matchSearch && matchMonth;
  });

  const thStyle = { textAlign: 'left', padding: '14px 24px', fontSize: 13, color: '#64748b', fontWeight: 600, textTransform: 'uppercase' };
  const tdStyle = { padding: '16px 24px', fontSize: 14, color: '#334155', fontWeight: 500 };

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
        {todaysBirthdays.length > 0 && (
          <div style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', borderRadius: 10, padding: 24, color: '#fff', display: 'flex', alignItems: 'center', gap: 16 }}>
            <FaBirthdayCake size={32} />
            <div>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>
                🎉 {todaysBirthdays.map(b => b.name).join(', ')} {todaysBirthdays.length > 1 ? 'have' : 'has'} birthdays Today!
              </h3>
              <p style={{ margin: '4px 0 0', opacity: 0.85, fontSize: 13 }}>Don't forget to wish them.</p>
            </div>
          </div>
        )}

        {/* Bar Chart */}
        <div style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <h3 style={{ margin: '0 0 20px', fontSize: 15, fontWeight: 700, color: '#1e293b' }}>Month-wise Birthday Distribution</h3>
          <div style={{ height: 240 }}>
            {loading ? (
              <div className="w-full h-full flex items-center justify-center text-gray-400">Loading chart...</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Birthdays" />
                </BarChart>
              </ResponsiveContainer>
            )}
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
            <button 
              onClick={() => setSelectedMonth('')} 
              style={{ background: 'none', border: 'none', color: '#3b82f6', fontSize: 13, cursor: 'pointer', fontWeight: 600 }}
            >
              Clear Month
            </button>
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
              {loading ? (
                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>Loading records...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>No birthdays found.</td></tr>
              ) : (
                filtered.map(b => (
                  <tr key={b.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={tdStyle}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        {b.photo ? (
                          <img src={b.photo} alt={b.name} style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover' }} />
                        ) : (
                          <div style={{ width: 34, height: 34, borderRadius: '50%', background: b.type === 'Staff' ? '#dcfce7' : '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: b.type === 'Staff' ? '#16a34a' : '#3b82f6', fontSize: 13 }}>
                            {b.name ? b.name.charAt(0) : '?'}
                          </div>
                        )}
                        <span style={{ fontWeight: 600 }}>{b.name}</span>
                      </div>
                    </td>
                    <td style={tdStyle}>
                      <span style={{ padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: b.type === 'Staff' ? '#dcfce7' : '#eff6ff', color: b.type === 'Staff' ? '#16a34a' : '#2563eb' }}>
                        {b.type}
                      </span>
                    </td>
                    <td style={tdStyle}>{b.class || 'N/A'}</td>
                    <td style={tdStyle}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <FaGift color="#94a3b8" /> 
                        {b.dateOfBirth ? new Date(b.dateOfBirth).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}
                      </div>
                    </td>
                    <td style={tdStyle}>{b.gender || 'N/A'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default BirthdayReport;
