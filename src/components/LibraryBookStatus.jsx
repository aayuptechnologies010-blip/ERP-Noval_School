import React from 'react';

function LibraryBookStatus() {
  const stats = [
    { label: 'Circulated Book', value: '0' },
    { label: 'Discarded Book', value: '0' },
    { label: 'Total Book', value: '0' },
    { label: 'News Subscribed', value: '0' },
    { label: 'Magazine Subscribed', value: '0' },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 flex-1 flex flex-col h-full min-h-[350px]">
      
      <h2 className="text-lg font-bold text-gray-800 mb-6">Library Book Status</h2>
      
      <div className="flex flex-col gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-gray-600 text-sm font-medium">{stat.label}</span>
            <span className="font-bold text-gray-800">{stat.value}</span>
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default LibraryBookStatus;
