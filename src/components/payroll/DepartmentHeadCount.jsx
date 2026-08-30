import React from 'react';
import SummaryCard from './SummaryCard';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Label } from 'recharts';

export default function DepartmentHeadCount() {
  const data = [
    { name: 'ADMINISTRATION DEPT.', value: 2 },
    { name: 'OFFICE STAFF', value: 3 },
    { name: 'PRE-PRIMARY TEACHERS', value: 8 },
    { name: 'PRIMARY TEACHERS', value: 10 },
    { name: 'SENIOR TEACHERS', value: 15 }
  ];
  const COLORS = ['#7C8B99', '#A389D4', '#5C9CE6', '#48DDB5', '#FFCA68'];

  return (
    <SummaryCard title="DEPARTMENT WISE HEAD COUNT" titleAlign="left">
      <div className="chart-container" style={{ height: '300px', marginTop: '10px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={70}
              outerRadius={110}
              paddingAngle={0}
              dataKey="value"
              stroke="none"
              cx="40%"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
              <Label value="38" position="center" style={{ fontSize: '70px', fontWeight: 'bold', fill: 'var(--payroll-text-primary)' }} />
            </Pie>
            <Legend 
              verticalAlign="middle" 
              align="right" 
              layout="vertical" 
              iconType="square" 
              wrapperStyle={{ fontSize: '11px', width: '50%' }} 
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </SummaryCard>
  );
}
