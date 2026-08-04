import React from 'react';

const classes = [
  '5 B', '6 C', '8 A', '9 B', '9 F', '10 D', '11 D', '12 B',
  '5 C', '7 A', '8 B', '9 C', '10 A', '11 A', '11 E', '12 C',
  '6 A', '7 B', '8 C', '9 D', '10 B', '11 B', '11 F', '12 D',
  '6 B', '7 C', '9 A', '9 E', '10 C', '11 C', '12 A'
];

function StudentsAttendance() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 mb-8 w-full">
      
      {/* Header section */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <h2 className="text-lg font-bold text-gray-800">Students' Attendance</h2>
        <select className="border border-gray-300 rounded-md px-2 py-1 text-sm outline-none text-gray-600">
          <option>All classes (51)</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-4 max-h-[300px] overflow-y-auto no-scrollbar">
        {classes.map((cls, index) => (
          <div key={index} className="flex items-center justify-end gap-2 text-sm">
            <span className="text-gray-600 font-medium mr-1 w-6 text-right">{cls}</span>
            <div className="bg-green-500 text-white rounded w-6 h-6 flex items-center justify-center">0</div>
            <div className="bg-red-400 text-white rounded w-6 h-6 flex items-center justify-center">0</div>
            <div className="bg-blue-400 text-white rounded w-6 h-6 flex items-center justify-center">0</div>
            <div className="bg-orange-400 text-white rounded w-6 h-6 flex items-center justify-center">0</div>
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default StudentsAttendance;
