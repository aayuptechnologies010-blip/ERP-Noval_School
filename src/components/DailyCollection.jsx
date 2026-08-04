import React from 'react';
import { 
  FaMoneyBillWave, FaMoneyCheckAlt, FaRegCreditCard, 
  FaUniversity, FaGlobe, FaCreditCard, FaMobileAlt 
} from 'react-icons/fa';

function DailyCollection() {
  const collections = [
    { name: 'Cash', icon: FaMoneyBillWave, value: '61000', color: 'text-blue-500' },
    { name: 'Cheque', icon: FaMoneyCheckAlt, value: '0', color: 'text-green-400' },
    { name: 'DD', icon: FaRegCreditCard, value: '0', color: 'text-red-400' },
    { name: 'NEFT', icon: FaUniversity, value: '0', color: 'text-orange-400' },
    { name: 'Online', icon: FaGlobe, value: '0', color: 'text-gray-400' },
    { name: 'Swiped Card', icon: FaCreditCard, value: '0', color: 'text-blue-400' },
    { name: 'UPI', icon: FaMobileAlt, value: '45800', color: 'text-blue-500' },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 mb-8">
      
      {/* Header section */}
      <div className="flex flex-wrap items-center justify-between mb-8 border-b pb-4">
        <h2 className="text-lg font-bold text-gray-800">Daily Mode Wise Collection (106800)</h2>
        
        <div className="flex items-center gap-6 mt-4 md:mt-0">
          <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
            <span className="cursor-pointer text-green-600 border-b-2 border-green-500 pb-1 font-bold">Today</span>
            <span className="cursor-pointer hover:text-gray-800 transition">Yesterday</span>
            <span className="cursor-pointer hover:text-gray-800 transition">Select Date</span>
          </div>
          <button className="bg-[#5cb85c] hover:bg-[#4cae4c] text-white px-4 py-1.5 rounded-md font-bold text-sm transition">
            Go
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap items-center justify-between w-full">
        {collections.map((item, index) => (
          <React.Fragment key={item.name}>
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="flex items-center gap-2">
                <item.icon className={`text-xl ${item.color}`} />
                <span className="font-bold text-sm text-gray-700">{item.name}</span>
              </div>
              <span className={`text-lg font-bold ${item.color}`}>{item.value}</span>
            </div>
            {index < collections.length - 1 && (
              <div className="h-10 w-px bg-gray-200 hidden md:block"></div>
            )}
          </React.Fragment>
        ))}
      </div>
      
    </div>
  );
}

export default DailyCollection;
