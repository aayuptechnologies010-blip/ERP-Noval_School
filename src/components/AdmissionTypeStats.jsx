import React from 'react';

function AdmissionTypeStats({ data }) {
  const d = data || { online: 0, offline: 0 };
  const total = d.online + d.offline;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 flex-1 flex flex-col h-full min-h-[350px]">
      
      <h2 className="text-lg font-bold text-gray-800 mb-4">Online vs Offline Admission</h2>
      
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="text-gray-500 mb-1 text-sm">Total</div>
        <div className="text-xl text-gray-800">{total}</div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 mt-auto text-xs font-medium text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          In School ({d.offline})
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          Online ({d.online})
        </div>
      </div>
      
    </div>
  );
}

export default AdmissionTypeStats;
