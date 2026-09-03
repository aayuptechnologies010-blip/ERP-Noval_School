import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

function StandardStats({ data }) {
  const d = data || { studying: 0, left: 0, total: 0 };
  const total = d.studying + d.left || 1;
  
  const chartData = [
    { name: 'LEFT', value: d.left, color: '#10b981' },
    { name: 'STUDYING', value: d.studying, color: '#8b5cf6' }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 flex-1 flex flex-col h-full min-h-[350px]">
      
      <h2 className="text-lg font-bold text-gray-800 mb-4">Standard-wise statistics</h2>
      
      <div className="flex-1 w-full h-[250px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              innerRadius={70}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
              label={({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
                const RADIAN = Math.PI / 180;
                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);
                return (
                  <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize="12" fontWeight="bold">
                    {total > 0 ? ((value / total) * 100).toFixed(1) : 0}%
                  </text>
                );
              }}
              labelLine={false}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="text-purple-500 text-sm font-medium">Total</div>
          <div className="text-2xl font-bold text-gray-800">{total}</div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 mt-4 text-xs font-bold text-gray-600 uppercase">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#10b981]"></div>
          Left ({d.left})
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#8b5cf6]"></div>
          Studying ({d.studying})
        </div>
      </div>
      
    </div>
  );
}

export default StandardStats;
