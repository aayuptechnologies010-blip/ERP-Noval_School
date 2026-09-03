import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Label,
} from 'recharts';

const COLORS = {
  Estimated:  '#2ab5b5',
  Received:   '#7c3aed',
  Concession: '#2563eb',
  Due:        '#f59e0b',
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#fff', border: '1px solid #e5e7eb', padding: '8px 12px', fontSize: 11 }}>
      <p style={{ fontWeight: 700, marginBottom: 4, color: '#374151' }}>{label}</p>
      {payload.map(p => (
        <div key={p.name} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, padding: '1px 0' }}>
          <span style={{ color: p.color, fontWeight: 600 }}>{p.name}</span>
          <span style={{ color: '#374151' }}>₹ {p.value.toLocaleString('en-IN')}</span>
        </div>
      ))}
    </div>
  );
};

const Legend = () => (
  <div style={{ display: 'flex', gap: 16, justifyContent: 'flex-end', paddingBottom: 6 }}>
    {Object.entries(COLORS).map(([key, color]) => (
      <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <div style={{ width: 12, height: 12, background: color, borderRadius: 2 }} />
        <span style={{ fontSize: 11, color: '#6b7280' }}>{key}</span>
      </div>
    ))}
  </div>
);

const fmtY = (v) => {
  if (v === 0) return '0';
  return (v / 1000).toFixed(0) + 'k';
};

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function EstimatedCollectionCard() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/api/fee-reports/dashboard/estimated-collection`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const result = await res.json();
        if (res.ok) {
          setData(result);
          setTotal(result.reduce((acc, curr) => acc + curr.Received, 0));
        }
      } catch (error) {
        console.error('Failed to fetch estimated collection', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', flex: 1, minWidth: 0 }}>
      <div style={{ padding: '14px 20px 10px 20px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', textTransform: 'uppercase', letterSpacing: 0.3 }}>
            Estimated Collection{' '}
            <span style={{ fontWeight: 400, fontSize: 11, color: '#64748b', textTransform: 'none' }}>
              (Month Wise)
            </span>
          </div>
          <Legend />
        </div>
        <div style={{ marginTop: 4, fontSize: 13, color: '#374151' }}>
          Total Received :{' '}
          <span style={{ fontWeight: 700, fontSize: 15 }}>₹ {total.toLocaleString('en-IN')}</span>
        </div>
      </div>
      <div style={{ padding: '8px 8px 0 0' }}>
        <div style={{ height: 320 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 5, right: 20, left: 20, bottom: 45 }}
              barCategoryGap="30%"
              barGap={1}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 10, fill: '#94a3b8' }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={false}
                interval={0}
              >
                <Label
                  value="MONTH"
                  position="insideBottom"
                  offset={-14}
                  style={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600, letterSpacing: 1 }}
                />
              </XAxis>
              <YAxis
                tickFormatter={fmtY}
                tick={{ fontSize: 10, fill: '#94a3b8' }}
                axisLine={false}
                tickLine={false}
                width={60}
              >
                <Label
                  value="COLLECTION (₹)"
                  angle={-90}
                  position="insideLeft"
                  offset={10}
                  style={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600, letterSpacing: 1 }}
                />
              </YAxis>
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
              <Bar dataKey="Estimated"  fill={COLORS.Estimated}  radius={[2,2,0,0]} maxBarSize={12} />
              <Bar dataKey="Received"   fill={COLORS.Received}   radius={[2,2,0,0]} maxBarSize={12} />
              <Bar dataKey="Concession" fill={COLORS.Concession} radius={[2,2,0,0]} maxBarSize={12} />
              <Bar dataKey="Due"        fill={COLORS.Due}        radius={[2,2,0,0]} maxBarSize={12} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
