import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const dailyConsumption = [
  { day: '01 Aug', count: 120 }, { day: '02 Aug', count: 450 }, { day: '03 Aug', count: 320 },
  { day: '04 Aug', count: 50 }, { day: '05 Aug', count: 800 }, { day: '06 Aug', count: 210 },
  { day: '07 Aug', count: 110 }, { day: '08 Aug', count: 600 }, { day: '09 Aug', count: 300 },
];

function SMSConsumption() {
  const [month, setMonth] = useState('2026-08');

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '24px 32px 8px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ margin: '0 0 4px', fontSize: 13, color: '#94a3b8' }}>Report &rsaquo; SMS Report &rsaquo;</p>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Consumption</h1>
        </div>
        <div>
          <input type="month" value={month} onChange={e => setMonth(e.target.value)} style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #cbd5e1', outline: 'none', fontSize: 14, color: '#334155' }} />
        </div>
      </div>

      <div style={{ padding: '16px 32px 32px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
        
        {/* Total Month Card */}
        <div style={{ background: 'linear-gradient(135deg, #10b981, #059669)', padding: 30, borderRadius: 12, color: '#fff', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)' }}>
          <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 600, opacity: 0.9 }}>Total Consumption ({new Date(month + '-01').toLocaleString('default', { month: 'long', year: 'numeric' })})</h3>
          <p style={{ margin: 0, fontSize: 36, fontWeight: 800 }}>2,960 <span style={{ fontSize: 16, fontWeight: 500, opacity: 0.8 }}>SMS Credits</span></p>
        </div>

        {/* Area Chart */}
        <div style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <h3 style={{ margin: '0 0 20px', fontSize: 15, fontWeight: 700, color: '#1e293b' }}>Daily SMS Consumption Trend</h3>
          <div style={{ height: 350 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyConsumption}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke="#10b981" fill="#dcfce7" strokeWidth={2} name="SMS Credits Used" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SMSConsumption;
