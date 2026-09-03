import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

function EstimatedCollectionChart({ data }) {
  const [filter, setFilter] = useState('This Year');
  const [selectedFee, setSelectedFee] = useState('School Fee');
  
  const d = data || { thisYear: [], tillToday: [] };
  const chartData = filter === 'This Year' ? d.thisYear : d.tillToday;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 mb-8 mt-4">
      
      {/* Header section */}
      <div className="flex flex-wrap items-center justify-between mb-8 border-b pb-4">
        
        {/* Left: Title & Dropdown */}
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-bold text-gray-800">Estimated Collection</h2>
          <select 
            value={selectedFee}
            onChange={(e) => setSelectedFee(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm outline-none text-gray-600 focus:border-green-500"
          >
            <option>School Fee</option>
            <option>Hostel Fee</option>
            <option>Transport Fee</option>
          </select>
        </div>

        {/* Right: Filters */}
        <div className="flex items-center gap-6 mt-4 md:mt-0">
          <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
            <span 
              onClick={() => setFilter('Till Today')}
              className={`cursor-pointer transition ${filter === 'Till Today' ? 'text-green-600 border-b-2 border-green-500 pb-1 font-bold' : 'hover:text-gray-800'}`}
            >
              Till Today
            </span>
            <span 
              onClick={() => setFilter('This Year')}
              className={`cursor-pointer transition ${filter === 'This Year' ? 'text-green-600 border-b-2 border-green-500 pb-1 font-bold' : 'hover:text-gray-800'}`}
            >
              This Year
            </span>
            <span className="cursor-pointer hover:text-gray-800 transition">Custom Date</span>
          </div>
          <button className="bg-[#5cb85c] hover:bg-[#4cae4c] text-white px-4 py-1.5 rounded-md font-bold text-sm transition">
            Go
          </button>
        </div>
      </div>

      {/* Chart container */}
      <div className="w-full h-[400px]">
        {chartData.length === 0 ? (
           <div className="flex items-center justify-center h-full text-gray-400 text-sm">No collection data available</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
              barGap={2}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 12 }}
                dy={10}
              />
              
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 12 }}
                dx={-10}
                label={{ value: 'COLLECTION (INR)', angle: -90, position: 'insideLeft', offset: -10, style: { fill: '#374151', fontWeight: 'bold', fontSize: 12 } }}
              />
              
              <Tooltip 
                cursor={{fill: 'transparent'}}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              
              <Legend 
                iconType="square" 
                wrapperStyle={{ paddingTop: '20px' }}
              />

              <Bar dataKey="Estimate" fill="#2596be" radius={[2, 2, 0, 0]} maxBarSize={12} />
              <Bar dataKey="Received" fill="#10b981" radius={[2, 2, 0, 0]} maxBarSize={12} />
              <Bar dataKey="Concession" fill="#a78bfa" radius={[2, 2, 0, 0]} maxBarSize={12} />
              <Bar dataKey="Due" fill="#fb7185" radius={[2, 2, 0, 0]} maxBarSize={12} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
      
    </div>
  );
}

export default EstimatedCollectionChart;
