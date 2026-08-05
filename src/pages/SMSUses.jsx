import React from 'react';
import { FaSms, FaMobileAlt, FaEnvelopeOpenText, FaInfoCircle } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const usageData = [
  { module: 'Attendance SMS', count: 1450, color: '#ef4444' },
  { module: 'Fee Reminders', count: 850, color: '#f59e0b' },
  { module: 'Exam Results', count: 1200, color: '#10b981' },
  { module: 'Announcements', count: 430, color: '#3b82f6' },
  { module: 'OTP/Auth', count: 120, color: '#8b5cf6' },
];

function SMSUses() {
  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '24px 32px 8px 32px' }}>
        <p style={{ margin: '0 0 4px', fontSize: 13, color: '#94a3b8' }}>Report &rsaquo; SMS Report &rsaquo;</p>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>SMS Uses Analysis</h1>
      </div>

      <div style={{ padding: '16px 32px 32px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
        
        {/* Module Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
          {usageData.map((d, i) => (
            <div key={i} style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#475569' }}>{d.module}</span>
                <FaSms color={d.color} size={18} />
              </div>
              <h3 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: '#1e293b' }}>{d.count}</h3>
              <p style={{ margin: '4px 0 0', fontSize: 12, color: '#94a3b8' }}>SMS Sent</p>
            </div>
          ))}
        </div>

        {/* Bar Chart */}
        <div style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#1e293b' }}>Module-wise Usage Comparison</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#64748b', background: '#f1f5f9', padding: '6px 12px', borderRadius: 20 }}>
              <FaInfoCircle /> Shows usage for current academic year
            </div>
          </div>
          <div style={{ height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={usageData} layout="vertical" margin={{ top: 0, right: 0, left: 30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis dataKey="module" type="category" width={120} tick={{ fontSize: 12, fontWeight: 600, fill: '#475569' }} />
                <Tooltip />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {usageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}

export default SMSUses;
