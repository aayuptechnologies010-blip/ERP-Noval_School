import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

function AdmissionStats({ data }) {
  const chartData = data && data.length > 0 ? data : [];
  
  // Get the year keys dynamically from the first record
  let prevYearKey = '2025-2026';
  let currYearKey = '2026-2027';
  if (chartData.length > 0) {
    const keys = Object.keys(chartData[0]).filter(k => k !== 'class');
    if (keys.length >= 2) {
      prevYearKey = keys[0];
      currYearKey = keys[1];
    } else if (keys.length === 1) {
      currYearKey = keys[0];
    }
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 flex-2 flex flex-col h-full min-h-[350px]">
      
      <h2 className="text-lg font-bold text-gray-800 mb-6">Admission Statistics</h2>
      
      <div className="flex-1 w-full h-[300px]">
        {chartData.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">No admission data available</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }} barGap={0}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="class" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
              <YAxis axisLine={true} tickLine={true} tick={{ fontSize: 12, fill: '#6b7280' }} />
              <Tooltip cursor={{fill: 'transparent'}} />
              <Legend iconType="square" wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey={prevYearKey} fill="#fdb391" barSize={12} radius={[2, 2, 0, 0]} />
              <Bar dataKey={currYearKey} fill="#86efac" barSize={12} radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
      
    </div>
  );
}

export default AdmissionStats;
