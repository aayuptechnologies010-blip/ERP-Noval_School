import React, { useState } from 'react';
import { 
  FaMedal, FaListUl, FaInfoCircle, FaUserGraduate, FaUser, FaArrowsAltV, FaRibbon
} from 'react-icons/fa';

export default function WebAdminLFDToppers() {
  const [status, setStatus] = useState(true);

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#f4f5f7]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-[#1f2937]">LFD Toppers Management</h1>
        <div className="text-xs text-gray-500 font-medium">
          Home <span className="mx-1">&gt;</span> Website <span className="mx-1">&gt;</span> LFD <span className="mx-1">&gt;</span> Toppers
        </div>
      </div>

      {/* Add LFD Topper Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <FaMedal className="text-gray-800 text-sm" />
          <h2 className="text-sm font-bold text-gray-800">Add LFD Topper</h2>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Left Column - Form Fields */}
            <div className="flex-1 flex flex-col gap-5">
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Academic Year <span className="text-red-500">*</span></label>
                  <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500 bg-white">
                    <option>Select Year</option>
                  </select>
                </div>
                
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Class <span className="text-red-500">*</span></label>
                  <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500 bg-white">
                    <option></option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-[2]">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Student Name <span className="text-red-500">*</span></label>
                  <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500 bg-white">
                    <option></option>
                  </select>
                </div>
                <div className="flex-[1]">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Display Order <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="1-100" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Achievement Description <span className="text-red-500">*</span></label>
                <textarea rows="4" placeholder="Enter topper achievement details" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500 resize-y"></textarea>
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

            </div>

            {/* Right Column - Photo preview & Guidelines */}
            <div className="w-full lg:w-[320px] flex flex-col gap-4">
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1 text-center">Student Photo</label>
                <div className="flex justify-center">
                  <div className="w-[120px] h-[140px] bg-gray-100 border border-gray-200 rounded flex flex-col items-center justify-center text-gray-400">
                    <FaUser className="text-3xl mb-2 text-gray-400" />
                    <span className="text-[10px] font-medium">No Photo</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#f8f9fa] border border-gray-200 rounded-lg p-5 mt-2">
                <div className="flex items-center gap-2 mb-3">
                  <FaInfoCircle className="text-gray-500 text-sm" />
                  <h3 className="text-sm font-semibold text-gray-700">Topper Guidelines</h3>
                </div>
                
                <div className="flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <FaUserGraduate className="text-blue-500 text-sm mt-0.5" />
                    <p className="text-[11px] text-gray-600">Select academic year and class for the topper</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaUser className="text-green-500 text-sm mt-0.5" />
                    <p className="text-[11px] text-gray-600">Choose student from the selected class</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaArrowsAltV className="text-blue-400 text-sm mt-0.5" />
                    <p className="text-[11px] text-gray-600">Set display order (1-100, lower shows first)</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaRibbon className="text-yellow-500 text-sm mt-0.5" />
                    <p className="text-[11px] text-gray-600">Provide achievement description details</p>
                  </div>
                </div>
              </div>

            </div>

          </div>

          <div className="flex justify-end items-center gap-4 mt-6 pt-4">
            <button className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium py-2 px-6 rounded transition">Reset</button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-6 rounded transition">Save</button>
          </div>
        </div>
      </div>

      {/* All LFD Toppers Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FaListUl className="text-gray-800 text-lg" />
            <h2 className="text-sm font-bold text-gray-800">All LFD Toppers</h2>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <input type="text" placeholder="Search toppers..." className="w-64 border border-gray-300 rounded px-3 py-1.5 pl-3 text-xs text-gray-600 outline-none focus:border-blue-500" />
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
                <th className="px-4 py-3 font-semibold text-center">PHOTO</th>
                <th className="px-4 py-3 font-semibold text-center">ACADEMIC YEAR</th>
                <th className="px-4 py-3 font-semibold text-center">CLASS</th>
                <th className="px-4 py-3 font-semibold text-center">STUDENT NAME</th>
                <th className="px-4 py-3 font-semibold text-center">ORDER</th>
                <th className="px-4 py-3 font-semibold text-center">STATUS</th>
                <th className="px-4 py-3 font-semibold text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="8" className="px-4 py-8 text-center text-gray-500 text-sm bg-gray-50/20">
                  No LFD toppers found
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
