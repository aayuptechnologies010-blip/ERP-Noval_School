import React from 'react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Label,
} from 'recharts';

const DATA = [
  { month: 'April',       Estimated: 12800000, Received: 9200000,  Concession: 0, Due: 3600000  },
  { month: 'May',         Estimated: 2900000,  Received: 1900000,  Concession: 0, Due: 1000000  },
  { month: 'June',        Estimated: 2900000,  Received: 1800000,  Concession: 0, Due: 1000000  },
  { month: 'July',        Estimated: 3000000,  Received: 1700000,  Concession: 0, Due: 1200000  },
  { month: 'August',      Estimated: 3000000,  Received: 1000000,  Concession: 0, Due: 1900000  },
  { month: 'September',   Estimated: 3000000,  Received: 350000,   Concession: 0, Due: 2600000  },
  { month: 'October',     Estimated: 4200000,  Received: 350000,   Concession: 0, Due: 3800000  },
  { month: 'November',    Estimated: 3000000,  Received: 250000,   Concession: 0, Due: 2800000  },
  { month: 'December',    Estimated: 3000000,  Received: 200000,   Concession: 0, Due: 2800000  },
  { month: 'January',     Estimated: 3000000,  Received: 200000,   Concession: 0, Due: 2800000  },
  { month: 'Feb-March',   Estimated: 7200000,  Received: 350000,   Concession: 0, Due: 6800000  },
];

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
  return (v / 1000000).toFixed(0) + '000000';
};

export default function EstimatedCollectionCard() {
  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', flex: 1, minWidth: 0 }}>
      <div style={{ padding: '14px 20px 10px 20px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', textTransform: 'uppercase', letterSpacing: 0.3 }}>
            Estimated Collection{' '}
            <span style={{ fontWeight: 400, fontSize: 11, color: '#64748b', textTransform: 'none' }}>
              (Installment Wise) (2026-2027)
            </span>
          </div>
          <Legend />
        </div>
        <div style={{ marginTop: 4, fontSize: 13, color: '#374151' }}>
          Total :{' '}
          <span style={{ fontWeight: 700, fontSize: 15 }}>₹ 48000522</span>
        </div>
      </div>
      <div style={{ padding: '8px 8px 0 0' }}>
        <div style={{ height: 320 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={DATA}
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
                  value="INSTALLMENT"
                  position="insideBottom"
                  offset={-14}
                  style={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600, letterSpacing: 1 }}
                />
              </XAxis>
              <YAxis
                domain={[0, 14000000]}
                ticks={[0, 2000000, 4000000, 6000000, 8000000, 10000000, 12000000, 14000000]}
                tickFormatter={fmtY}
                tick={{ fontSize: 10, fill: '#94a3b8' }}
                axisLine={false}
                tickLine={false}
                width={72}
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
