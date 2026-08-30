import React from 'react';
import { 
  FaRegClock, FaArrowsAltV, FaInfoCircle
} from 'react-icons/fa';

export default function WebAdminLFDDisplayTime() {
  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#f4f5f7]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-[#1f2937]">LFD Display Time & Order Management</h1>
        <div className="text-xs text-gray-500 font-medium">
          Home <span className="mx-1">&gt;</span> Website <span className="mx-1">&gt;</span> LFD <span className="mx-1">&gt;</span> Display Time & Order
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="bg-white px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FaRegClock className="text-gray-800 text-lg" />
            <h2 className="text-sm font-bold text-gray-800">LFD Display Configuration</h2>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <input type="text" placeholder="Search items..." className="w-64 border border-gray-300 rounded px-3 py-1.5 pl-3 text-xs text-gray-600 outline-none focus:border-blue-500" />
            </div>
            <select className="border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-600 outline-none">
              <option>10</option>
            </select>
          </div>
        </div>
        
        <div className="px-5 pb-4">
          <div className="bg-[#e6f4ff] border border-[#91d5ff] rounded p-3 flex items-start gap-2 mb-4">
            <FaInfoCircle className="text-[#1890ff] mt-0.5 text-xs" />
            <p className="text-xs text-[#0050b3]"><span className="font-semibold">Display Configuration:</span> Set the display order (0-1000) and time duration (0-1200 seconds) for each LFD item. Lower order numbers display first.</p>
          </div>

          <div className="overflow-x-auto border border-gray-200 rounded">
            <table className="w-full text-xs text-left">
              <thead className="font-semibold text-gray-600 uppercase bg-gray-50/50 border-b border-gray-200 text-[10px]">
                <tr>
                  <th className="px-4 py-3 text-center w-16">S.NO.</th>
                  <th className="px-4 py-3 text-center">ITEM NAME</th>
                  <th className="px-4 py-3 text-center">STATUS</th>
                  <th className="px-4 py-3 text-center">DISPLAY ORDER</th>
                  <th className="px-4 py-3 text-center">DISPLAY TIME (SECONDS)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="5" className="px-4 py-12 text-center text-gray-500 bg-gray-50/20">
                    No display items found
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded text-[11px] text-gray-600">
                <FaArrowsAltV className="text-blue-500" /> Order: 0-1000 (Unique, lower shows first)
              </div>
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded text-[11px] text-gray-600">
                <FaRegClock className="text-green-500" /> Time: 0-1200 seconds per item
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium py-2 px-6 rounded transition">Reset</button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-6 rounded transition">Save</button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-4">
        COPYRIGHT © 2017 FRANCISCAN.
      </div>
    </div>
  );
}
