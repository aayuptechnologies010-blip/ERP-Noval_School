import React from 'react';
import SummaryCard from './SummaryCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';

export default function SalaryComparison() {
  const data = [{ name: '', value: 0 }, { name: ' ', value: 0 }]; // Dummy data to force axes rendering

  const renderLegend = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', fontSize: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '12px', height: '12px', backgroundColor: 'var(--payroll-text-blue)' }}></div>
          <span>2025-2026</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '12px', height: '12px', backgroundColor: 'var(--payroll-green)' }}></div>
          <span>2026-2027</span>
        </div>
      </div>
    );
  };

  return (
    <SummaryCard title="MONTH WISE SALARY COMPARISON WITH PREVIOUS YEAR" titleAlign="left">
      <div style={{ marginBottom: '10px' }}>
        {renderLegend()}
      </div>
      <div className="chart-container" style={{ height: '320px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
            <XAxis 
              dataKey="name" 
              axisLine={true} 
              tickLine={false}
              label={{ value: 'MONTHS', position: 'insideBottom', offset: -20, style: { fontSize: 12, fontWeight: 'bold' } }}
            />
            <YAxis 
              axisLine={true} 
              tickLine={false} 
              domain={[0, 1]}
              ticks={[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]}
              tick={{ fontSize: 12 }} 
              label={{ value: 'Amount (₹)', angle: -90, position: 'insideLeft', offset: -10, style: { fontSize: 12, fontWeight: 'bold' } }}
            />
            <Area type="monotone" dataKey="value" stroke="none" fill="none" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="empty-chart-note">
        *L denotes Value in Lacs
      </div>
    </SummaryCard>
  );
}
