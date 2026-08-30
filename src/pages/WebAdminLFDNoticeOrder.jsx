import React from 'react';
import { 
  FaArrowsAltV, FaBullhorn, FaArrowsAlt
} from 'react-icons/fa';

export default function WebAdminLFDNoticeOrder() {
  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#f4f5f7]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-[#1f2937]">LFD Notice Order Management</h1>
        <div className="text-xs text-gray-500 font-medium">
          Home <span className="mx-1">&gt;</span> Website <span className="mx-1">&gt;</span> LFD <span className="mx-1">&gt;</span> Notice Order
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="bg-white px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FaArrowsAltV className="text-gray-800 text-lg" />
            <h2 className="text-sm font-bold text-gray-800">Notice Display Order</h2>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <input type="text" placeholder="Search notices..." className="w-64 border border-gray-300 rounded px-3 py-1.5 pl-3 text-xs text-gray-600 outline-none focus:border-blue-500" />
            </div>
            <select className="border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-600 outline-none">
              <option>10</option>
            </select>
          </div>
        </div>
        
        <div className="px-5 pb-4">
          <div className="bg-[#e6f4ff] border border-[#91d5ff] rounded p-3 flex items-start gap-2 mb-4">
            <FaArrowsAltV className="text-[#1890ff] mt-0.5 text-xs" />
            <p className="text-xs text-[#0050b3]"><span className="font-semibold">Notice Order Configuration:</span> Drag and drop or set numeric order to arrange how notices appear on the LFD screen. Lower numbers display first.</p>
          </div>

          <div className="overflow-x-auto border border-gray-200 rounded">
            <table className="w-full text-xs text-left">
              <thead className="font-semibold text-gray-600 uppercase bg-gray-50/50 border-b border-gray-200 text-[10px]">
                <tr>
                  <th className="px-4 py-3 text-center w-16">S.NO.</th>
                  <th className="px-4 py-3 text-center">NOTICE HEADING</th>
                  <th className="px-4 py-3 text-center">STATUS</th>
                  <th className="px-4 py-3 text-center">DISPLAY ORDER</th>
                  <th className="px-4 py-3 text-center">DRAG TO REORDER</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="5" className="px-4 py-12 text-center text-gray-500 bg-gray-50/20">
                    No notices found
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded text-[11px] text-gray-600">
                <FaArrowsAltV className="text-blue-500" /> Order: Unique (lower displays first)
              </div>
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded text-[11px] text-gray-600">
                <FaArrowsAlt className="text-blue-400" /> Drag & Drop: Reorder rows by dragging
              </div>
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded text-[11px] text-gray-600">
                <FaBullhorn className="text-green-500" /> Only active notices will be shown
              </div>
            </div>
            
            <div className="flex items-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-8 rounded transition">Save</button>
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
