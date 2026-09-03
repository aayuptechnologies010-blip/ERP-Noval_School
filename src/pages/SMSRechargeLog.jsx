import React, { useState, useEffect } from 'react';
import { FaFileExcel, FaCreditCard, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

// Dummy data removed

function SMSRechargeLog() {
  const [filter, setFilter] = useState('All');
  const [allData, setAllData] = useState([]);
  const [summary, setSummary] = useState({ totalCredits: 0, totalAmount: 0, totalRecharges: 0 });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/reports/sms/recharge`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setAllData(data.records || []);
        if (data.summary) setSummary(data.summary);
      }
    } catch (err) { console.error(err); }
  };

  const filtered = allData.filter(r => filter === 'All' || r.status === filter);

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '24px 32px 8px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ margin: '0 0 4px', fontSize: 13, color: '#94a3b8' }}>Report &rsaquo; SMS Report &rsaquo;</p>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Recharge Log</h1>
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#10b981', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
          <FaFileExcel /> Export Log
        </button>
      </div>

      <div style={{ padding: '16px 32px 32px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
        
        {/* Balance Card */}
        <div style={{ background: '#2b3674', padding: 30, borderRadius: 12, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 15px rgba(43, 54, 116, 0.3)' }}>
          <div>
            <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 600, opacity: 0.9 }}>Current Available Credits</h3>
            <p style={{ margin: 0, fontSize: 36, fontWeight: 800 }}>12,450</p>
          </div>
          <button style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: 8, fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <FaCreditCard /> Recharge Now
          </button>
        </div>

        {/* Table */}
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', gap: 16, alignItems: 'center' }}>
            {['All', 'Success', 'Failed'].map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{ padding: '6px 16px', borderRadius: 20, border: 'none', fontWeight: 600, fontSize: 12, cursor: 'pointer', background: filter === f ? '#3b82f6' : '#e2e8f0', color: filter === f ? '#fff' : '#475569' }}>
                {f}
              </button>
            ))}
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['Transaction ID', 'Date', 'Credits Added', 'Amount', 'Payment Method', 'Status'].map(h => (
                  <th key={h} style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ ...tdStyle, fontWeight: 700, color: '#3b82f6' }}>{r.id}</td>
                  <td style={tdStyle}>{r.date}</td>
                  <td style={{ ...tdStyle, fontWeight: 700, color: '#10b981' }}>+{r.credits}</td>
                  <td style={tdStyle}>{r.amount}</td>
                  <td style={tdStyle}>{r.method}</td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: r.status === 'Success' ? '#16a34a' : '#ef4444', fontWeight: 600 }}>
                      {r.status === 'Success' ? <FaCheckCircle /> : <FaTimesCircle />}
                      {r.status}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const thStyle = { padding: '14px 16px', textAlign: 'left', fontSize: 13, fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', whiteSpace: 'nowrap' };
const tdStyle = { padding: '14px 16px', fontSize: 14, color: '#475569', verticalAlign: 'middle' };

export default SMSRechargeLog;
