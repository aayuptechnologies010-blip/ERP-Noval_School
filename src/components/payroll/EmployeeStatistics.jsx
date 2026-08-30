import React from 'react';
import SummaryCard from './SummaryCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LabelList } from 'recharts';

export default function EmployeeStatistics() {
  const data = [
    { name: 'ADMIN DEPT', uv: 1, fill: '#7C8B99' },
    { name: 'Front Office/Accounts', uv: 1, fill: '#FF6B72' },
    { name: 'Management', uv: 1, fill: '#48DDB5' },
    { name: 'PRE-PRIM. TEACHERS', uv: 2, fill: '#FFCA68' },
    { name: 'Principal', uv: 1, fill: '#A389D4' },
    { name: 'Support Staff', uv: 2, fill: '#5C9CE6' },
    { name: 'TEACHERS', uv: 30, fill: '#4BC0C0' }
  ];

  return (
    <SummaryCard title="EMPLOYEE STATISTICS (STAFF TYPE WISE)" titleAlign="left">
      <div className="chart-container" style={{ height: '350px', marginTop: '20px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
            <XAxis 
              dataKey="name" 
              axisLine={true} 
              tickLine={false} 
              tick={{ fontSize: 11, angle: -45, textAnchor: 'end' }} 
              interval={0}
              label={{ value: 'STAFF TYPE', position: 'insideBottom', offset: -70, style: { fontSize: 12, fontWeight: 'bold' } }}
            />
            <YAxis 
              axisLine={true} 
              tickLine={false} 
              tick={{ fontSize: 12 }} 
              label={{ value: 'NO. OF EMPLOYEES', angle: -90, position: 'insideLeft', offset: -10, style: { fontSize: 12, fontWeight: 'bold' } }}
            />
            <Bar dataKey="uv" barSize={30}>
              <LabelList dataKey="uv" position="top" style={{ fontSize: 12, fontWeight: 'bold' }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </SummaryCard>
  );
}
