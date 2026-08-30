import React from 'react';
import SummaryCard from './SummaryCard';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Label } from 'recharts';

export default function NationalityStrength() {
  const data = [
    { name: 'Indian', value: 32 }
  ];
  const COLORS = ['var(--payroll-orange)'];

  return (
    <SummaryCard title="NATIONALITY WISE EMPLOYEES STRENGTH" titleAlign="left">
      <div className="chart-container" style={{ height: '300px', marginTop: '10px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={80}
              outerRadius={120}
              paddingAngle={0}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
              <Label value="32" position="center" style={{ fontSize: '80px', fontWeight: 'bold', fill: 'var(--payroll-text-primary)' }} />
            </Pie>
            <Legend verticalAlign="top" align="right" iconType="square" wrapperStyle={{ fontSize: '13px' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </SummaryCard>
  );
}
