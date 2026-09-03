import React from 'react';

function FeeDefaulter({ data, summary }) {
  const defaulters = data && data.length > 0 ? data : [];
  const s = summary || { totalStudents: 0, defaulterStudents: 0, defaultAmount: 0 };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 flex-1 flex flex-col h-full min-h-[350px]">
      
      {/* Header section */}
      <div className="flex flex-wrap items-center justify-between mb-4 border-b pb-4">
        <h2 className="text-lg font-bold text-gray-800">Fee Defaulter</h2>
        
        <div className="flex items-center gap-3 mt-2 md:mt-0">
          <select className="border border-gray-300 rounded-md px-2 py-1 text-sm outline-none text-gray-600">
            <option>All Fee Typ</option>
          </select>
          <select className="border border-gray-300 rounded-md px-2 py-1 text-sm outline-none text-gray-600">
            <option>1 checked</option>
          </select>
          <label className="flex items-center gap-1 text-sm text-gray-600 whitespace-nowrap">
            <input type="checkbox" /> Include Fine
          </label>
          <button className="bg-[#5cb85c] hover:bg-[#4cae4c] text-white px-3 py-1 rounded-md font-bold text-sm transition">
            Go
          </button>
        </div>
      </div>

      {/* Summary Row */}
      <div className="bg-blue-50 text-blue-900 px-4 py-2 rounded-t-md flex items-center justify-between text-sm font-bold flex-wrap gap-2">
        <span>Total Student: <span className="text-green-600 font-normal">{s.totalStudents}</span></span>
        <span className="text-gray-300 hidden md:inline">|</span>
        <span>Defaulter Student: <span className="text-red-500 font-normal">{s.defaulterStudents}</span></span>
        <span className="text-gray-300 hidden md:inline">|</span>
        <span>Default Amount: <span className="text-red-500 font-normal">{formatCurrency(s.defaultAmount)}</span></span>
      </div>

      {/* Table */}
      <div className="overflow-y-auto max-h-[300px] no-scrollbar border border-t-0 border-gray-100 rounded-b-md flex-1">
        {defaulters.length === 0 ? (
          <div className="flex items-center justify-center h-full min-h-[100px] text-gray-400 text-sm p-4">No fee defaulters found</div>
        ) : (
          <table className="w-full text-left text-sm">
            <tbody>
              {defaulters.map((item, index) => (
                <tr key={index} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 text-gray-600">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{item.class}</td>
                  <td className="py-3 px-4 text-center">{item.total}</td>
                  <td className="py-3 px-4 text-center">{item.defaulter}</td>
                  <td className="py-3 px-4 text-right pr-8">{formatCurrency(item.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      
    </div>
  );
}

export default FeeDefaulter;
