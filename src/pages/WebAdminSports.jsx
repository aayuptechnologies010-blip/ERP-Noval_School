import React, { useState } from 'react';
import { 
  FaTrophy, FaCalendarAlt, FaListUl
} from 'react-icons/fa';

export default function WebAdminSports() {
  const [status, setStatus] = useState(true);

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#f4f5f7]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-[#1f2937]">Sports Management</h1>
        <div className="text-xs text-gray-500 font-medium">
          Home <span className="mx-1">&gt;</span> Website <span className="mx-1">&gt;</span> Sports
        </div>
      </div>

      {/* Add Sports Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <FaTrophy className="text-gray-800 text-sm" />
          <h2 className="text-sm font-bold text-gray-800">Add Sports</h2>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col gap-6">
            
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">Sports Name <span className="text-red-500">*</span></label>
                <input type="text" placeholder="e.g. Swimming, Yoga, Football" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">Category Name <span className="text-red-500">*</span></label>
                <input type="text" placeholder="e.g. Athletics, Water Sports" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">Sports Type <span className="text-red-500">*</span></label>
                <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500 bg-white">
                  <option>Select Type</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">Amount <span className="text-red-500">*</span></label>
                <input type="text" placeholder="e.g. 500" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">Activation Date <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input type="text" placeholder="Select Activation Date" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
                  <FaCalendarAlt className="absolute right-3 top-2.5 text-gray-400" />
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">Deactivation Date</label>
                <div className="relative flex items-center gap-2">
                  <div className="relative flex-1">
                    <input type="text" placeholder="Select End Date (Optional)" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
                    <FaCalendarAlt className="absolute right-3 top-2.5 text-gray-400" />
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-gray-600">
                    <input type="checkbox" className="rounded border-gray-300" /> Enable End Date
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Status</label>
              <div className="flex items-center gap-3">
                <div 
                  className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${status ? 'bg-blue-500' : 'bg-gray-300'}`}
                  onClick={() => setStatus(!status)}
                >
                  <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${status ? 'translate-x-5' : ''}`}></div>
                </div>
                {status && <span className="bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Active</span>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Instructions <span className="text-red-500">*</span></label>
              <textarea rows="4" placeholder="Enter Instructions" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500 resize-y"></textarea>
            </div>

          </div>

          <div className="flex justify-end items-center gap-4 mt-8 pt-4">
            <button className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium py-2 px-6 rounded transition">Reset</button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-6 rounded transition">Save</button>
          </div>
        </div>
      </div>

      {/* All Sports Section (assumed layout) */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FaListUl className="text-gray-800 text-lg" />
            <h2 className="text-sm font-bold text-gray-800">All Sports</h2>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <input type="text" placeholder="Search sports..." className="w-64 border border-gray-300 rounded px-3 py-1.5 pl-3 text-xs text-gray-600 outline-none focus:border-blue-500" />
            </div>
            <select className="border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-600 outline-none">
              <option>10</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[11px] text-gray-600 uppercase bg-gray-50/50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 font-semibold text-center w-16">S.NO.</th>
                <th className="px-4 py-3 font-semibold text-center">SPORTS NAME</th>
                <th className="px-4 py-3 font-semibold text-center">CATEGORY</th>
                <th className="px-4 py-3 font-semibold text-center">TYPE</th>
                <th className="px-4 py-3 font-semibold text-center">AMOUNT</th>
                <th className="px-4 py-3 font-semibold text-center">STATUS</th>
                <th className="px-4 py-3 font-semibold text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="7" className="px-4 py-8 text-center text-gray-500 text-sm bg-gray-50/20">
                  No sports found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="text-center text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-4">
        COPYRIGHT © 2017 FRANCISCAN.
      </div>
    </div>
  );
}
