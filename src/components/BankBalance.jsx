import React from 'react';

function BankBalance() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 flex-1 flex flex-col h-full min-h-[350px]">
      
      <h2 className="text-lg font-bold text-gray-800 mb-4">Bank Balance</h2>
      
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="text-gray-500 mb-1 text-sm">Total</div>
        <div className="text-xl text-gray-800">0</div>
      </div>

      <div className="flex flex-col gap-2 mt-auto text-xs font-medium text-gray-600">
        <div className="flex items-center gap-2 uppercase">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          Naval National Academy Bank
        </div>
        <div className="flex items-center gap-2 uppercase">
          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
          Naval National Academy General
        </div>
      </div>
      
    </div>
  );
}

export default BankBalance;
