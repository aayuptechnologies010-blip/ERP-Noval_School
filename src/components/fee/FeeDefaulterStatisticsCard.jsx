import React, { useState } from 'react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Label, Cell,
} from 'recharts';

const TABS = ['STANDARD WISE', 'INSTALLMENT WISE'];

const DATA = [
  { std: 'NUR',  amount: 600000  },
  { std: 'LKG',  amount: 550000  },
  { std: 'UKG',  amount: 850000  },
  { std: '1',    amount: 1150000 },
  { std: '2',    amount: 1400000 },
  { std: '3',    amount: 950000  },
  { std: '4',    amount: 1250000 },
  { std: '5',    amount: 850000  },
  { std: '6',    amount: 1350000 },
  { std: '7',    amount: 1500000 },
  { std: '8',    amount: 1500000 },
  { std: '9',    amount: 2450000 },
  { std: '10',   amount: 7450000 },
  { std: '11',   amount: 3450000 },
  { std: '12',   amount: 4900000 },
];

const fmtY = (v) => {
  if (v === 0) return '0';
  return (v / 1000000).toFixed(0) + '000000';
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#fff', border: '1px solid #e5e7eb', padding: '8px 12px', fontSize: 11 }}>
      <p style={{ fontWeight: 700, color: '#374151', marginBottom: 3 }}>Std: {label}</p>
      <p style={{ color: '#29a9d8' }}>₹ {payload[0].value.toLocaleString('en-IN')}</p>
    </div>
  );
};

export default function FeeDefaulterStatisticsCard() {
  const [tab, setTab] = useState('STANDARD WISE');

  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0' }}>
      {/* Header */}
      <div style={{
        padding: '12px 20px',
        borderBottom: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 8,
      }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#1e293b', textTransform: 'uppercase', letterSpacing: 0.3 }}>
          Fee Defaulter Statistics (Year to Date)
        </span>
        {/* Tabs */}
        <div style={{ display: 'flex' }}>
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: '5px 16px',
                fontSize: 11,
                fontWeight: 600,
                border: '1px solid #e2e8f0',
                borderRight: t !== 'INSTALLMENT WISE' ? 'none' : '1px solid #e2e8f0',
                background: tab === t ? '#29a9d8' : '#f8fafc',
                color: tab === t ? '#fff' : '#64748b',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Sub-header */}
      <div style={{
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #f1f5f9',
        flexWrap: 'wrap',
        gap: 8,
      }}>
        <div style={{ fontSize: 13, color: '#374151' }}>
          Total : <span style={{ fontWeight: 700, color: '#1e293b' }}>₹ 30506917</span>
        </div>
        <div style={{ fontSize: 11, color: '#64748b' }}>
          Total No. of Defaulter Students Class Wise:{' '}
          <span style={{ fontWeight: 700, color: '#1e293b' }}>1173/1237</span>
        </div>
      </div>

      {/* Chart */}
      <div style={{ padding: '10px 8px 0 0', height: 340 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={DATA}
            margin={{ top: 5, right: 30, left: 20, bottom: 45 }}
            barCategoryGap="35%"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="std"
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              axisLine={{ stroke: '#e2e8f0' }}
              tickLine={false}
              interval={0}
            >
              <Label
                value="STANDARD"
                position="insideBottom"
                offset={-14}
                style={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600, letterSpacing: 1 }}
              />
            </XAxis>
            <YAxis
              domain={[0, 8000000]}
              ticks={[0, 1000000, 2000000, 3000000, 4000000, 5000000, 6000000, 7000000, 8000000]}
              tickFormatter={fmtY}
              tick={{ fontSize: 10, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
              width={72}
            >
              <Label
                value="AMOUNT (₹)"
                angle={-90}
                position="insideLeft"
                offset={10}
                style={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600, letterSpacing: 1 }}
              />
            </YAxis>
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(41,169,216,0.06)' }} />
            <Bar dataKey="amount" radius={[2,2,0,0]} maxBarSize={28}>
              {DATA.map((_, i) => (
                <Cell key={i} fill="#29a9d8" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
