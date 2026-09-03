import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, Label,
} from 'recharts';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const fmtY = (v) => {
  if (v === 0) return '0';
  return (v / 1000).toFixed(0) + 'k';
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
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/api/fee-reports/dashboard/transaction-history`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const result = await res.json();
        if (res.ok) {
          setData(result);
        }
      } catch (error) {
        console.error('Failed to fetch transaction history', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', marginBottom: 0 }}>
      <div style={{ padding: '14px 20px 10px 20px', borderBottom: '1px solid #e2e8f0' }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: '#1e293b', letterSpacing: 0.3, textTransform: 'uppercase' }}>
          Transaction History of Last 30 Days (Date Wise)
        </span>
      </div>
      <div style={{ padding: '10px 8px 0 0', height: 340 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 60 }}>
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
              tickFormatter={fmtY}
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
