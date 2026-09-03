import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Label, Cell,
} from 'recharts';

const TABS = ['STANDARD WISE'];

const fmtY = (v) => {
  if (v === 0) return '0';
  return (v / 1000).toFixed(0) + 'k';
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

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function FeeDefaulterStatisticsCard() {
  const [tab, setTab] = useState('STANDARD WISE');
  const [data, setData] = useState([]);
  const [stats, setStats] = useState({ totalDueAmount: 0, totalDefaulters: 0, totalStudents: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/api/fee-reports/dashboard/defaulter-stats`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const result = await res.json();
        if (res.ok) {
          setData(result.standardWise || []);
          setStats({
            totalDueAmount: result.totalDueAmount || 0,
            totalDefaulters: result.totalDefaulters || 0,
            totalStudents: result.totalStudents || 0
          });
        }
      } catch (error) {
        console.error('Failed to fetch defaulter stats', error);
      }
    };
    fetchData();
  }, []);

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
          Total : <span style={{ fontWeight: 700, color: '#1e293b' }}>₹ {stats.totalDueAmount.toLocaleString('en-IN')}</span>
        </div>
        <div style={{ fontSize: 11, color: '#64748b' }}>
          Total No. of Defaulter Students Class Wise:{' '}
          <span style={{ fontWeight: 700, color: '#1e293b' }}>{stats.totalDefaulters}/{stats.totalStudents}</span>
        </div>
      </div>

      {/* Chart */}
      <div style={{ padding: '10px 8px 0 0', height: 340 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
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
              {data.map((_, i) => (
                <Cell key={i} fill="#29a9d8" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
