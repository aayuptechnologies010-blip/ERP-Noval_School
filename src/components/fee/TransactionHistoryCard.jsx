import React from 'react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, Label,
} from 'recharts';

const DATA = [
  { date: '30-Jul', value: 170000 },
  { date: '31-Jul', value: 105000 },
  { date: '01-Aug', value: 120000 },
  { date: '03-Aug', value: 285000 },
  { date: '05-Aug', value: 190000 },
  { date: '06-Aug', value: 140000 },
  { date: '07-Aug', value: 155000 },
  { date: '08-Aug', value: 145000 },
  { date: '09-Aug', value: 10000  },
  { date: '10-Aug', value: 330000 },
  { date: '11-Aug', value: 360000 },
  { date: '12-Aug', value: 420000 },
  { date: '13-Aug', value: 395000 },
  { date: '14-Aug', value: 760000 },
  { date: '15-Aug', value: 170000 },
  { date: '16-Aug', value: 445000 },
  { date: '17-Aug', value: 450000 },
  { date: '18-Aug', value: 340000 },
  { date: '19-Aug', value: 135000 },
  { date: '20-Aug', value: 90000  },
  { date: '21-Aug', value: 35000  },
  { date: '22-Aug', value: 80000  },
  { date: '24-Aug', value: 10000  },
  { date: '25-Aug', value: 45000  },
  { date: '27-Aug', value: 20000  },
];

const fmtY = (v) => {
  if (v === 0) return '0';
  return (v / 100000).toFixed(0) + '00000';
};

const fmtYAxis = (v) => {
  if (v >= 1000000) return (v / 1000000).toFixed(0) + '00000';
  if (v >= 100000) return v.toLocaleString('en-IN');
  return v.toString();
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#fff', border: '1px solid #e5e7eb', padding: '8px 12px', fontSize: 12 }}>
      <p style={{ fontWeight: 700, marginBottom: 4, color: '#374151' }}>{label}</p>
      <p style={{ color: '#29a9d8' }}>₹ {payload[0].value.toLocaleString('en-IN')}</p>
    </div>
  );
};

export default function TransactionHistoryCard() {
  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', marginBottom: 0 }}>
      <div style={{ padding: '14px 20px 10px 20px', borderBottom: '1px solid #e2e8f0' }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: '#1e293b', letterSpacing: 0.3, textTransform: 'uppercase' }}>
          Transaction History of Last 30 Days (Date Wise)
        </span>
      </div>
      <div style={{ padding: '10px 8px 0 0', height: 340 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={DATA} margin={{ top: 10, right: 30, left: 20, bottom: 60 }}>
            <defs>
              <linearGradient id="txGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#29a9d8" stopOpacity={0.18} />
                <stop offset="95%" stopColor="#29a9d8" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10, fill: '#94a3b8' }}
              axisLine={{ stroke: '#e2e8f0' }}
              tickLine={false}
              angle={-45}
              textAnchor="end"
              interval={0}
              height={60}
            >
              <Label
                value="TRANSACTION DATE"
                position="insideBottom"
                offset={-8}
                style={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600, letterSpacing: 1 }}
              />
            </XAxis>
            <YAxis
              domain={[0, 800000]}
              ticks={[0, 100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000]}
              tickFormatter={(v) => v === 0 ? '0' : (v / 100000).toFixed(0) + '00000'}
              tick={{ fontSize: 10, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
              width={68}
            >
              <Label
                value="COLLECTION"
                angle={-90}
                position="insideLeft"
                offset={10}
                style={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600, letterSpacing: 1 }}
              />
            </YAxis>
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#29a9d8"
              strokeWidth={2}
              fill="url(#txGrad)"
              dot={{ r: 3, fill: '#29a9d8', strokeWidth: 0 }}
              activeDot={{ r: 5, fill: '#29a9d8' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
