import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Label,
} from 'recharts';

const FEE_TYPES = ['All Fee Type', 'School Fee'];

const CHART_DATA = [
  { month: 'April',        Estimated: 1240, Received: 950,  Concession: 20, Due: 350  },
  { month: 'May',          Estimated: 1240, Received: 870,  Concession: 15, Due: 400  },
  { month: 'June',         Estimated: 1240, Received: 820,  Concession: 10, Due: 470  },
  { month: 'July',         Estimated: 1240, Received: 750,  Concession: 8,  Due: 520  },
  { month: 'August',       Estimated: 1240, Received: 480,  Concession: 5,  Due: 780  },
  { month: 'September',    Estimated: 1240, Received: 160,  Concession: 2,  Due: 1080 },
  { month: 'October',      Estimated: 1240, Received: 110,  Concession: 0,  Due: 1140 },
  { month: 'November',     Estimated: 1240, Received: 100,  Concession: 0,  Due: 1150 },
  { month: 'December',     Estimated: 1240, Received: 95,   Concession: 0,  Due: 1160 },
  { month: 'January',      Estimated: 1240, Received: 85,   Concession: 0,  Due: 1170 },
  { month: 'Feb-March',    Estimated: 1240, Received: 80,   Concession: 0,  Due: 1180 },
];

const COLORS = {
  Estimated:  '#2ab5b5',
  Received:   '#7c3aed',
  Concession: '#374151',
  Due:        '#f59e0b',
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#fff', border: '1px solid #e5e7eb', padding: '10px 14px', fontSize: 11, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <p style={{ fontWeight: 700, marginBottom: 6, color: '#374151', borderBottom: '1px solid #f3f4f6', paddingBottom: 4 }}>{label}</p>
      {payload.map(p => (
        <div key={p.name} style={{ display: 'flex', justifyContent: 'space-between', gap: 20, padding: '2px 0' }}>
          <span style={{ color: p.color, fontWeight: 600 }}>{p.name}</span>
          <span style={{ color: '#374151', fontVariantNumeric: 'tabular-nums' }}>{p.value.toLocaleString('en-IN')}</span>
        </div>
      ))}
    </div>
  );
};

const Legend = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
    {Object.entries(COLORS).map(([key, color]) => (
      <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <div style={{ width: 12, height: 12, background: color, borderRadius: 2, flexShrink: 0 }} />
        <span style={{ fontSize: 11, color: '#6b7280', fontWeight: 500 }}>{key}</span>
      </div>
    ))}
  </div>
);

export default function EstimatedCollection() {
  const [feeType, setFeeType] = useState('All Fee Type');
  const [open, setOpen] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    const h = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0' }}>

      {/* ── Header ── */}
      <div style={{
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        padding: '14px 20px 12px 20px', borderBottom: '1px solid #e2e8f0', background: '#f8fafc',
        flexWrap: 'wrap', gap: 12,
      }}>
        {/* Left: title + total */}
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#1e293b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Estimated Collection with Strength
            </span>
            <span style={{ fontSize: 10, color: '#94a3b8', fontWeight: 400 }}>
              (Installment/Fee Type Wise) (2026-2027)
            </span>
          </div>
          <div style={{ marginTop: 6 }}>
            <span style={{ fontSize: 13, color: '#64748b' }}>Total:&nbsp;</span>
            <span style={{ fontSize: 22, fontWeight: 900, color: '#1e293b', letterSpacing: '-0.5px' }}>₹ 48000522</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#64748b', marginLeft: 3 }}>(1237)</span>
          </div>
        </div>

        {/* Right: dropdown + legend */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
          {/* Fee Type Dropdown */}
          <div style={{ position: 'relative' }} ref={dropRef}>
            <button
              onClick={() => setOpen(o => !o)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                border: '1px solid #d1d5db', background: '#fff', borderRadius: 3,
                padding: '5px 10px', fontSize: 11, color: '#374151', cursor: 'pointer',
                minWidth: 130, justifyContent: 'space-between',
              }}
            >
              <span>{feeType}</span>
              <ChevronDown size={12} color="#6b7280" />
            </button>
            {open && (
              <div style={{
                position: 'absolute', right: 0, top: '100%', marginTop: 2,
                background: '#fff', border: '1px solid #e5e7eb', borderRadius: 3,
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)', zIndex: 50, minWidth: 140,
              }}>
                {FEE_TYPES.map(ft => (
                  <div
                    key={ft}
                    onClick={() => { setFeeType(ft); setOpen(false); }}
                    style={{
                      padding: '7px 12px', fontSize: 11, cursor: 'pointer',
                      background: ft === feeType ? '#eff6ff' : '#fff',
                      color: ft === feeType ? '#2563eb' : '#374151',
                      fontWeight: ft === feeType ? 600 : 400,
                    }}
                    onMouseEnter={e => { if (ft !== feeType) e.currentTarget.style.background = '#f8fafc'; }}
                    onMouseLeave={e => { if (ft !== feeType) e.currentTarget.style.background = '#fff'; }}
                  >
                    {ft}
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Legend */}
          <Legend />
        </div>
      </div>

      {/* ── Chart ── */}
      <div style={{ padding: '16px 12px 20px 4px', height: 620 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={CHART_DATA}
            margin={{ top: 10, right: 30, left: 20, bottom: 50 }}
            barCategoryGap="40%"
            barGap={3}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: '#6b7280' }}
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={false}
              interval={0}
            >
              <Label
                value="INSTALLMENT"
                position="insideBottom"
                offset={-35}
                style={{ fontSize: 10, fill: '#9ca3af', fontWeight: 600, letterSpacing: 1 }}
              />
            </XAxis>
            <YAxis
              domain={[0, 1400]}
              ticks={[0, 200, 400, 600, 800, 1000, 1200, 1400]}
              tick={{ fontSize: 11, fill: '#6b7280' }}
              axisLine={false}
              tickLine={false}
              width={60}
            >
              <Label
                value="COLLECTION (₹)"
                angle={-90}
                position="insideLeft"
                offset={-8}
                style={{ fontSize: 10, fill: '#9ca3af', fontWeight: 600, letterSpacing: 1 }}
              />
            </YAxis>
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
            <Bar dataKey="Estimated"  fill={COLORS.Estimated}  radius={[2,2,0,0]} maxBarSize={13} />
            <Bar dataKey="Received"   fill={COLORS.Received}   radius={[2,2,0,0]} maxBarSize={13} />
            <Bar dataKey="Concession" fill={COLORS.Concession} radius={[2,2,0,0]} maxBarSize={13} />
            <Bar dataKey="Due"        fill={COLORS.Due}        radius={[2,2,0,0]} maxBarSize={13} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
