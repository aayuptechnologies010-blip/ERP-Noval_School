import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'GENERAL', value: 89, color: '#10b981' }, // 9.6%
  { name: 'O.B.C.', value: 152, color: '#8b5cf6' }, // 16.5%
  { name: 'S.C.', value: 10, color: '#fed7aa' }, 
  { name: 'S.T.', value: 5, color: '#fda4af' }, 
  { name: 'SELECT CASTE CATEGORY', value: 5, color: '#0ea5e9' }, 
  { name: 'MUSLIM', value: 10, color: '#eab308' },
  { name: 'HINDU', value: 652, color: '#7f1d1d' }, // 70.6%
];

function StudentStatistic() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 flex-1 flex flex-col h-full min-h-[350px]">
      
      <h2 className="text-lg font-bold text-gray-800 mb-4">Student Statistic</h2>
      
      <div className="flex-1 w-full h-[250px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
              labelLine={false}
              label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
                // Only show label for values >= 89 to match screenshot (GENERAL, OBC, HINDU)
                if (value < 89) return null;
                
                const RADIAN = Math.PI / 180;
                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);
                return (
                  <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize="11" fontWeight="bold">
                    {((value / 923) * 100).toFixed(1)}%
                  </text>
                );
              }}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="text-gray-500 text-sm font-medium">Total</div>
          <div className="text-2xl font-bold text-gray-800">923</div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-4 text-[10px] sm:text-xs font-bold text-gray-600 uppercase text-center">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }}></div>
            {entry.name}
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default StudentStatistic;
