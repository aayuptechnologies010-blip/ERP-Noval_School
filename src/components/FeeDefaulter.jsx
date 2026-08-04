import React from 'react';

const defaulters = [
  { class: '10 A', total: 40, defaulter: 40, amount: '₹15,70,667' },
  { class: '10 B', total: 38, defaulter: 38, amount: '₹15,89,600' },
  { class: '10 C', total: 125, defaulter: 125, amount: '₹47,50,000' },
  { class: '11 A', total: 93, defaulter: 89, amount: '₹30,58,700' },
  { class: '11 B', total: 28, defaulter: 28, amount: '₹10,22,300' },
  { class: '12 A', total: 38, defaulter: 36, amount: '₹15,05,800' },
  { class: '12 B', total: 11, defaulter: 10, amount: '₹4,94,700' },
  { class: '12 C', total: 69, defaulter: 69, amount: '₹31,77,400' },
];

function FeeDefaulter() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 flex-1 flex flex-col h-full">
      
      {/* Header section */}
      <div className="flex flex-wrap items-center justify-between mb-4 border-b pb-4">
        <h2 className="text-lg font-bold text-gray-800">Fee Defaulter</h2>
        
        <div className="flex items-center gap-3">
          <select className="border border-gray-300 rounded-md px-2 py-1 text-sm outline-none text-gray-600">
            <option>All Fee Typ</option>
          </select>
          <select className="border border-gray-300 rounded-md px-2 py-1 text-sm outline-none text-gray-600">
            <option>1 checked</option>
          </select>
          <label className="flex items-center gap-1 text-sm text-gray-600">
            <input type="checkbox" /> Include Fine
          </label>
          <button className="bg-[#5cb85c] hover:bg-[#4cae4c] text-white px-3 py-1 rounded-md font-bold text-sm transition">
            Go
          </button>
        </div>
      </div>

      {/* Summary Row */}
      <div className="bg-blue-50 text-blue-900 px-4 py-2 rounded-t-md flex items-center justify-between text-sm font-bold">
        <span>Total Student: <span className="text-green-600 font-normal">1232</span></span>
        <span className="text-gray-300">|</span>
        <span>Defaulter Student: <span className="text-red-500 font-normal">1192</span></span>
        <span className="text-gray-300">|</span>
        <span>Default Amount: <span className="text-red-500 font-normal line-through">₹3,03,99,366</span></span>
      </div>

      {/* Table */}
      <div className="overflow-y-auto max-h-[300px] no-scrollbar border border-t-0 border-gray-100 rounded-b-md flex-1">
        <table className="w-full text-left text-sm">
          <tbody>
            {defaulters.map((item, index) => (
              <tr key={index} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 text-gray-600">
                <td className="py-3 px-4">{index + 23}</td>
                <td className="py-3 px-4">{item.class}</td>
                <td className="py-3 px-4 text-center">{item.total}</td>
                <td className="py-3 px-4 text-center">{item.defaulter}</td>
                <td className="py-3 px-4 text-right pr-8">{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
}

export default FeeDefaulter;
