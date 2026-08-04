import React from 'react';

function StaffAttendance() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 flex-1 flex flex-col h-full min-h-[350px]">
      
      <h2 className="text-lg font-bold text-gray-800 mb-4">Staff Attendance</h2>
      
      <div className="flex-1 flex flex-col items-center justify-center relative">
        <div className="text-blue-500 mb-1 text-sm">Leave</div>
        <div className="text-xl text-gray-800">0</div>
        {/* Decorative line from screenshot */}
        <div className="absolute top-0 w-px h-16 bg-gray-300"></div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 mt-auto text-xs font-medium text-gray-600">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-[#10b981]"></div>
          Present
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-[#f97316]"></div>
          On Duty
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-[#ef4444]"></div>
          Absent
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-[#3b82f6]"></div>
          Leave
        </div>
      </div>
      
    </div>
  );
}

export default StaffAttendance;
