import React, { useState, useEffect } from 'react';
import { FaSyncAlt, FaFilter, FaExclamationTriangle, FaChartLine, FaSms, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell } from 'recharts';

// Dummy data removed

function Report() {
  const [dateRange, setDateRange] = useState(new Date().toISOString().substring(0, 10));
  const [smsType, setSmsType] = useState('All SMS');
  const [mobile, setMobile] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [records, setRecords] = useState([]);
  const [allData, setAllData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [summary, setSummary] = useState({ sent: 0, delivered: 0, failed: 0 });
  const [hasSearched, setHasSearched] = useState(true);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/reports/sms/report`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setAllData(data.records || []);
        if (data.summary) {
          setSummary({
            sent: data.summary.totalSent,
            delivered: data.summary.delivered,
            failed: data.summary.failed
          });
        }
        applyFilters(data.records || []);
      }
    } catch (err) { console.error(err); }
  };

  const applyFilters = (dataToFilter) => {
    let filtered = dataToFilter || allData;
    if (smsType !== 'All SMS') {
      filtered = filtered.filter(r => r.type === smsType);
    }
    if (mobile) {
      filtered = filtered.filter(r => (r.mobile || '').includes(mobile));
    }
    setRecords(filtered);
    
    // update chart based on filtered
    const grouped = filtered.reduce((acc, r) => {
      const dateStr = r.date;
      if (!acc[dateStr]) acc[dateStr] = { name: dateStr, Sent: 0, Delivered: 0, Failed: 0 };
      acc[dateStr].Sent++;
      if (r.status === 'Delivered') acc[dateStr].Delivered++;
      if (r.status === 'Failed') acc[dateStr].Failed++;
      return acc;
    }, {});
    setChartData(Object.values(grouped));
    setHasSearched(true);
  };

  const handleGet = () => {
    applyFilters();
  };

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Header Bar */}
      <div style={{ padding: '24px 32px 0 32px' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>SMS Report & Analytics</h1>
      </div>

      <div style={{ padding: '24px 32px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
        
        {/* Filters Top Bar */}
        <div style={{ background: '#fff', borderRadius: 8, padding: '20px 24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          
          <div style={{ position: 'relative', flex: '1 1 200px', maxWidth: 300 }}>
            <label style={{ position: 'absolute', top: -8, left: 12, background: '#fff', padding: '0 4px', fontSize: 11, color: '#94a3b8', zIndex: 1 }}>
              Select date range
            </label>
            <input 
              type="text" 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              style={{ width: '100%', border: '1px solid #e2e8f0', borderRadius: 4, padding: '10px 12px', fontSize: 14, color: '#334155', outline: 'none' }}
            />
          </div>

          <select 
            value={smsType}
            onChange={(e) => setSmsType(e.target.value)}
            style={{ flex: '1 1 150px', maxWidth: 200, border: '1px solid #e2e8f0', borderRadius: 4, padding: '10px 12px', fontSize: 14, color: '#334155', outline: 'none' }}
          >
            <option value="All SMS">All SMS</option>
            <option value="Absentee SMS">Absentee SMS</option>
            <option value="Attendance">Attendance</option>
            <option value="Fees">Fees</option>
            <option value="Latecomers SMS">Latecomers SMS</option>
            <option value="Credential SMS">Credential SMS</option>
            <option value="Class Test SMS">Class Test SMS</option>
          </select>

          <input 
            type="text" 
            placeholder="Enter Mobile No."
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            style={{ flex: '1 1 180px', maxWidth: 250, border: '1px solid #e2e8f0', borderRadius: 4, padding: '10px 12px', fontSize: 14, color: '#334155', outline: 'none' }}
          />

          <button onClick={handleGet} style={{ background: '#4ade80', color: '#fff', border: 'none', borderRadius: 4, padding: '10px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            Get
          </button>

          <div style={{ marginLeft: 'auto', display: 'flex', gap: 20 }}>
            <button onClick={() => { setMobile(''); setSmsType('All SMS'); applyFilters(allData); }} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: '#64748b', cursor: 'pointer' }}>
              <FaSyncAlt /> Refresh
            </button>
            <button onClick={() => setIsFilterOpen(true)} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: '#64748b', cursor: 'pointer' }}>
              <FaFilter /> Filter
            </button>
          </div>
        </div>

        {hasSearched && (
          <>
            {/* Stats Cards */}
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              {[
                { title: 'Total SMS Sent', value: summary.sent, change: '', icon: <FaSms size={22} color="#3b82f6" />, bg: '#eff6ff' },
                { title: 'Delivered', value: summary.delivered, change: '', icon: <FaCheckCircle size={22} color="#10b981" />, bg: '#ecfdf5' },
                { title: 'Failed', value: summary.failed, change: '', icon: <FaExclamationCircle size={22} color="#ef4444" />, bg: '#fef2f2' },
              ].map((s, idx) => (
                <div key={idx} style={{ flex: '1 1 240px', background: '#fff', borderRadius: 8, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: 14, color: '#64748b', fontWeight: 600 }}>{s.title}</span>
                    <h3 style={{ margin: '8px 0 4px 0', fontSize: 28, fontWeight: 800, color: '#1e293b' }}>{s.value}</h3>
                    <span style={{ fontSize: 12, color: s.title === 'Failed' ? '#ef4444' : '#10b981', fontWeight: 600 }}>{s.change}</span>
                  </div>
                  <div style={{ width: 54, height: 54, borderRadius: '50%', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {s.icon}
                  </div>
                </div>
              ))}
            </div>

            {/* Graphs / Charts Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 24 }}>
              
              {/* Line/Area Chart */}
              <div style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <h3 style={{ margin: '0 0 20px 0', fontSize: 15, fontWeight: 700, color: '#1e293b' }}>SMS Traffic Analysis</h3>
                <div style={{ height: 250 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="Sent" stroke="#3b82f6" fillOpacity={1} fill="url(#colorSent)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Bar & Pie Combo */}
              <div style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <h3 style={{ margin: '0 0 20px 0', fontSize: 15, fontWeight: 700, color: '#1e293b' }}>SMS Delivery Status</h3>
                <div style={{ height: 250 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Delivered" fill="#10b981" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Failed" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>

            {/* Data Table */}
            <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
              <div style={{ padding: '18px 24px', borderBottom: '1px solid #f1f5f9' }}>
                <h3 style={{ margin: 0, fontSize: 15, color: '#1e293b', fontWeight: 700 }}>Sent SMS History</h3>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    {['Date & Time', 'SMS Type', 'Recipient', 'Mobile No.', 'Content', 'Status'].map(h => (
                      <th key={h} style={thStyle}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {records.map(r => (
                    <tr key={r.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={tdStyle}>
                        <div>{r.date}</div>
                        <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{r.time}</div>
                      </td>
                      <td style={tdStyle}><span style={{ background: '#f1f5f9', padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{r.type}</span></td>
                      <td style={tdStyle}>{r.recipient}</td>
                      <td style={tdStyle}>{r.mobile}</td>
                      <td style={{ ...tdStyle, maxWidth: 300, whiteSpace: 'normal', wordBreak: 'break-word' }}>{r.content}</td>
                      <td style={tdStyle}>
                        <span style={{ 
                          padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                          background: r.status === 'Delivered' ? '#dcfce7' : '#fee2e2',
                          color: r.status === 'Delivered' ? '#10b981' : '#ef4444'
                        }}>
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {records.length === 0 && (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '48px', color: '#94a3b8' }}>
                        <FaExclamationTriangle size={32} style={{ marginBottom: 12 }} />
                        <p>No records found matching the filters.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        <div style={{ textAlign: 'center', marginTop: 20, paddingBottom: 20, fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>
          COPYRIGHT © 2026 FRANCISCAN
        </div>
      </div>

      {/* Filter Drawer */}
      {isFilterOpen && (
        <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0, zIndex: 50, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, background: 'rgba(0,0,0,0.5)' }} onClick={() => setIsFilterOpen(false)}></div>
          <div style={{ position: 'relative', width: 350, background: '#fff', height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '-2px 0 8px rgba(0,0,0,0.1)' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', margin: 0 }}>Filter</h2>
              <button onClick={() => setIsFilterOpen(false)} style={{ background: 'none', border: 'none', fontSize: 24, color: '#64748b', cursor: 'pointer', lineHeight: 1 }}>&times;</button>
            </div>
            <div style={{ padding: '24px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 13, color: '#475569' }}>Select Date Range</label>
                <input type="text" value="03 Aug 2026" readOnly style={{ border: '1px solid #e2e8f0', borderRadius: 4, padding: '10px 12px', fontSize: 14, color: '#334155', outline: 'none' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <label style={{ fontSize: 13, color: '#475569' }}>Sender</label>
                <div style={{ display: 'flex', gap: 16 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#334155', cursor: 'pointer' }}>
                    <input type="radio" name="sender" defaultChecked style={{ accentColor: '#2563eb' }} /> All
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#334155', cursor: 'pointer' }}>
                    <input type="radio" name="sender" style={{ accentColor: '#2563eb' }} /> Staff
                  </label>
                </div>
              </div>
              <div>
                <button onClick={() => { handleGet(); setIsFilterOpen(false); }} style={{ background: '#4ade80', color: '#fff', border: 'none', borderRadius: 4, padding: '10px 16px', fontSize: 14, fontWeight: 600, cursor: 'pointer', width: '100%' }}>
                  Filter Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

const thStyle = { padding: '16px', textAlign: 'left', fontSize: 13, fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', whiteSpace: 'nowrap' };
const tdStyle = { padding: '16px', fontSize: 14, color: '#475569', verticalAlign: 'middle' };

export default Report;
