import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const data = [
  { class: 'NUR', '2025-2026': 45, '2026-2027': 40 },
  { class: 'LKG', '2025-2026': 22, '2026-2027': 10 },
  { class: 'UKG', '2025-2026': 12, '2026-2027': 9 },
  { class: '1', '2025-2026': 22, '2026-2027': 12 },
  { class: '2', '2025-2026': 9, '2026-2027': 10 },
  { class: '3', '2025-2026': 10, '2026-2027': 12 },
  { class: '4', '2025-2026': 12, '2026-2027': 8 },
  { class: '5', '2025-2026': 11, '2026-2027': 10 },
  { class: '6', '2025-2026': 22, '2026-2027': 21 },
  { class: '7', '2025-2026': 14, '2026-2027': 11 },
  { class: '8', '2025-2026': 13, '2026-2027': 13 },
  { class: '9', '2025-2026': 170, '2026-2027': 45 },
  { class: '10', '2025-2026': 0, '2026-2027': 0 },
];

function AdmissionStats() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 flex-2 flex flex-col h-full min-h-[350px]">
      
      <h2 className="text-lg font-bold text-gray-800 mb-6">Admission Statistics</h2>
      
      <div className="flex-1 w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            barGap={0}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="class" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
            <YAxis axisLine={true} tickLine={true} tick={{ fontSize: 12, fill: '#6b7280' }} />
            <Tooltip cursor={{fill: 'transparent'}} />
            <Legend iconType="square" wrapperStyle={{ fontSize: '12px' }} />
            <Bar dataKey="2025-2026" fill="#fdb391" barSize={12} radius={[2, 2, 0, 0]} />
            <Bar dataKey="2026-2027" fill="#86efac" barSize={12} radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
    </div>
  );
}

export default AdmissionStats;
