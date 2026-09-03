import React from 'react';
import { 
  FaMoneyBillWave, FaMoneyCheckAlt, FaRegCreditCard, 
  FaUniversity, FaGlobe, FaCreditCard, FaMobileAlt 
} from 'react-icons/fa';

const iconMap = {
  'Cash': FaMoneyBillWave,
  'Cheque': FaMoneyCheckAlt,
  'DD': FaRegCreditCard,
  'NEFT': FaUniversity,
  'Online': FaGlobe,
  'Swiped Card': FaCreditCard,
  'UPI': FaMobileAlt
};

const colorMap = {
  'Cash': 'text-blue-500',
  'Cheque': 'text-green-400',
  'DD': 'text-red-400',
  'NEFT': 'text-orange-400',
  'Online': 'text-gray-400',
  'Swiped Card': 'text-blue-400',
  'UPI': 'text-blue-500'
};

function DailyCollection({ data }) {
  const d = data || { total: 0, modes: [] };
  const modes = d.modes && d.modes.length > 0 ? d.modes : [
    { name: 'Cash', value: 0 }, { name: 'Cheque', value: 0 },
    { name: 'DD', value: 0 }, { name: 'NEFT', value: 0 },
    { name: 'Online', value: 0 }, { name: 'Swiped Card', value: 0 },
    { name: 'UPI', value: 0 }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 mb-8">
      
      {/* Header section */}
      <div className="flex flex-wrap items-center justify-between mb-8 border-b pb-4">
        <h2 className="text-lg font-bold text-gray-800">Daily Mode Wise Collection ({d.total})</h2>
        
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
        {modes.map((item, index) => {
          const IconComponent = iconMap[item.name] || FaMoneyBillWave;
          const colorClass = colorMap[item.name] || 'text-gray-500';
          return (
            <React.Fragment key={item.name}>
              <div className="flex flex-col items-center gap-2 flex-1">
                <div className="flex items-center gap-2">
                  <IconComponent className={`text-xl ${colorClass}`} />
                  <span className="font-bold text-sm text-gray-700">{item.name}</span>
                </div>
                <span className={`text-lg font-bold ${colorClass}`}>{item.value}</span>
              </div>
              {index < modes.length - 1 && (
                <div className="h-10 w-px bg-gray-200 hidden md:block"></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      
    </div>
  );
}

export default DailyCollection;
