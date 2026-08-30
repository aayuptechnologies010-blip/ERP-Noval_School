import React, { useState } from 'react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Label,
} from 'recharts';
import { ChevronDown } from 'lucide-react';

const TABS = ["TODAY'S", 'LAST 7 DAYS', 'LAST 30 DAYS'];
const STANDARDS = ['NUR','LKG','UKG','1','2','3','4','5','6','7','8','9','10','11','12'];
const DATA = STANDARDS.map(s => ({ standard: s, amount: 0 }));

export default function CollectionSummaryCard() {
  const [tab, setTab] = useState("TODAY'S");

  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0' }}>

      {/* ── Header ── */}
      <div style={{
        padding: '10px 20px',
        borderBottom: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        gap: 24,
        flexWrap: 'wrap',
      }}>

        {/* Title */}
        <span style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', textTransform: 'uppercase', letterSpacing: 0.3, whiteSpace: 'nowrap' }}>
          Collection Summary (Standard Wise)
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
                border: '1px solid #cbd5e1',
                borderRight: t !== 'LAST 30 DAYS' ? 'none' : '1px solid #cbd5e1',
                background: tab === t ? '#29a9d8' : '#f1f5f9',
                color: tab === t ? '#fff' : '#64748b',
                cursor: 'pointer',
                transition: 'all 0.15s',
                whiteSpace: 'nowrap',
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* School Fee box — bordered, right side */}
        <div style={{ marginLeft: 'auto', border: '1px solid #e2e8f0', minWidth: 340 }}>
          {/* School Fee row */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '7px 14px', borderBottom: '1px solid #e2e8f0', background: '#fff',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>School Fee</span>
              <ChevronDown size={13} color="#64748b" />
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>₹14,031,668.00</span>
          </div>
          {/* Detail rows */}
          {[
            { label: 'School (Amt./Trans.)', val: '₹14,031,668.00/2122' },
            { label: 'Bank (Amt./Trans.)',   val: '₹0.00/0' },
            { label: 'Online (Amt./Trans.)', val: '₹0.00/0' },
          ].map(row => (
            <div key={row.label} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '5px 14px', borderBottom: '1px solid #f1f5f9',
            }}>
              <span style={{ fontSize: 11, color: '#64748b' }}>{row.label}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#374151' }}>{row.val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ padding: '16px 20px 20px 20px' }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: '#1e293b', marginBottom: 2 }}>
          Total : ₹ 0
        </div>
        <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 16 }}>As on 28-Aug-2026</div>

        {/* Full-width chart */}
        <div style={{ height: 320 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={DATA} margin={{ top: 5, right: 20, left: 20, bottom: 45 }} barCategoryGap="40%">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis
                dataKey="standard"
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
                domain={[0, 1]}
                ticks={[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]}
                tick={{ fontSize: 11, fill: '#94a3b8' }}
                axisLine={false}
                tickLine={false}
                width={45}
              >
                <Label
                  value="AMOUNT (₹)"
                  angle={-90}
                  position="insideLeft"
                  offset={10}
                  style={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600, letterSpacing: 1 }}
                />
              </YAxis>
              <Tooltip formatter={(v) => `₹ ${v}`} />
              <Bar dataKey="amount" fill="#29a9d8" radius={[2,2,0,0]} maxBarSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
