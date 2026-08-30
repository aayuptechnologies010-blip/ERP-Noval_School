import React, { useState } from 'react';
import { 
  FaTrophy, FaListUl, FaUser
} from 'react-icons/fa';

export default function WebAdminWebsiteToppers() {
  const [status, setStatus] = useState(true);

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#f4f5f7]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-[#1f2937]">Website Toppers Management</h1>
        <div className="text-xs text-gray-500 font-medium">
          Home <span className="mx-1">&gt;</span> Website <span className="mx-1">&gt;</span> Toppers
        </div>
      </div>

      {/* Add Website Topper Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <FaTrophy className="text-gray-800 text-sm" />
          <h2 className="text-sm font-bold text-gray-800">Add Website Topper</h2>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-10">
            
            {/* Left Column - Form Fields */}
            <div className="flex-[2] flex flex-col gap-5">
              
              <div className="flex flex-col sm:flex-row gap-6">
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

              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Student Name <span className="text-red-500">*</span></label>
                  <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500 bg-white">
                    <option></option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Show In</label>
                  <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500 bg-white">
                    <option>Class X</option>
                    <option>Class XII</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Percentage <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Enter Percentage (%)" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Stream</label>
                  <input type="text" placeholder="Enter Stream" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Display Order <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="1-100" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
                </div>
                <div className="flex-1">
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

            </div>

            {/* Right Column - Photo preview */}
            <div className="flex-1 flex flex-col pt-2">
              <label className="block text-xs font-medium text-gray-700 mb-2">Student Photo</label>
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 inline-block w-[180px] h-[180px] relative flex flex-col items-center justify-center">
                {/* 3D figure dummy representation */}
                <div className="w-20 h-20 bg-gray-200 rounded-full mb-2 flex items-center justify-center overflow-hidden">
                  <FaUser className="text-gray-400 text-4xl mt-3" />
                </div>
                <div className="bg-gray-100 rounded border border-gray-300 px-3 py-1.5 text-center">
                  <div className="text-[10px] text-gray-500 font-bold uppercase leading-tight">Sorry, No</div>
                  <div className="text-[14px] text-gray-700 font-black uppercase leading-tight tracking-wider">Image</div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase leading-tight">Available</div>
                </div>
              </div>
              <p className="text-[10px] text-gray-400 italic mt-3 max-w-[200px]">
                Current student photo will be displayed automatically when student is selected
              </p>
            </div>

          </div>

          <div className="flex justify-end items-center gap-4 mt-8 pt-4">
            <button className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium py-2 px-6 rounded transition">Reset</button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-6 rounded transition">Save</button>
          </div>
        </div>
      </div>

      {/* All Website Toppers Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FaListUl className="text-gray-800 text-lg" />
            <h2 className="text-sm font-bold text-gray-800">All Website Toppers</h2>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <input type="text" placeholder="Search toppers..." className="w-64 border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500" />
            </div>
            <select className="border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-600 outline-none bg-white">
              <option>10</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="text-[10px] text-gray-500 uppercase bg-gray-50/50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 font-semibold text-center w-12">S.NO.</th>
                <th className="px-4 py-3 font-semibold text-center">ACADEMIC YEAR</th>
                <th className="px-4 py-3 font-semibold text-center">CLASS</th>
                <th className="px-4 py-3 font-semibold text-center">STUDENT NAME</th>
                <th className="px-4 py-3 font-semibold text-center">PHOTO</th>
                <th className="px-4 py-3 font-semibold text-center">PERCENTAGE</th>
                <th className="px-4 py-3 font-semibold text-center">STREAM</th>
                <th className="px-4 py-3 font-semibold text-center">DISPLAY ORDER</th>
                <th className="px-4 py-3 font-semibold text-center">SHOW IN</th>
                <th className="px-4 py-3 font-semibold text-center">STATUS</th>
                <th className="px-4 py-3 font-semibold text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="11" className="px-4 py-8 text-center text-gray-400 text-xs bg-gray-50/20">
                  No toppers found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
