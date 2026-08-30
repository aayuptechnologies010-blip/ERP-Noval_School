import React, { useState } from 'react';
import { 
  FaBookOpen, FaCalendarAlt, FaCloudUploadAlt, FaFilePdf, FaListUl
} from 'react-icons/fa';

export default function WebAdminEBulletin() {
  const [status, setStatus] = useState(true);

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#f4f5f7]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-[#1f2937]">E-Bulletin Management</h1>
        <div className="text-xs text-gray-500 font-medium">
          Home <span className="mx-1">&gt;</span> Website <span className="mx-1">&gt;</span> E-Bulletin
        </div>
      </div>

      {/* Add E-Bulletin Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="bg-white px-5 py-4 flex items-center gap-2 border-b border-gray-100">
          <FaBookOpen className="text-gray-800 text-sm" />
          <h2 className="text-sm font-bold text-gray-800">Add E-Bulletin</h2>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left side inputs */}
            <div className="flex-[2] flex flex-col gap-6">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Month Name <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  placeholder="Enter Month Name" 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" 
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Session <span className="text-red-500">*</span></label>
                  <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500 bg-white">
                    <option value="">Select Session</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Publish Date <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input type="text" placeholder="Select Publish Date" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
                    <FaCalendarAlt className="absolute right-3 top-2.5 text-gray-400" />
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
                  {status && <span className="bg-blue-50 text-blue-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Active</span>}
                </div>
              </div>
            </div>

            {/* Right side upload */}
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-700 mb-1">Upload E-Bulletin <span className="text-red-500">*</span></label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg h-36 bg-gray-50 flex flex-col items-center justify-center relative cursor-pointer hover:bg-gray-100 transition">
                <div className="absolute top-3 left-3 bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded">PDF</div>
                <FaCloudUploadAlt className="text-gray-600 text-2xl mb-2" />
                <div className="text-sm font-medium text-gray-700">
                  Drag & drop or <span className="text-blue-600">browse</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">E-Bulletin PDF</div>
              </div>
            </div>

          </div>

          <div className="flex justify-end items-center gap-4 mt-8">
            <button className="bg-[#6c757d] hover:bg-[#5a6268] text-white text-sm font-medium py-2 px-6 rounded transition">Reset</button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-6 rounded transition">Save</button>
          </div>
        </div>
      </div>

      {/* All E-Bulletins Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="bg-white px-5 py-4 flex items-center gap-2 border-b border-gray-100">
          <FaListUl className="text-gray-800 text-sm" />
          <h2 className="text-sm font-bold text-gray-800">All E-Bulletins</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="text-[10px] text-gray-700 font-bold uppercase bg-[#f8f9fb] border-b border-gray-200">
              <tr>
                <th className="px-4 py-4 text-center w-12">S.NO.</th>
                <th className="px-4 py-4 text-center">MONTH NAME</th>
                <th className="px-4 py-4 text-center">ACADEMIC YEAR</th>
                <th className="px-4 py-4 text-center">E-BULLETIN FILE</th>
                <th className="px-4 py-4 text-center">PUBLISH DATE</th>
                <th className="px-4 py-4 text-center">UPDATED DATE</th>
                <th className="px-4 py-4 text-center">STATUS</th>
                <th className="px-4 py-4 text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="8" className="px-4 py-12 text-center text-gray-500 text-xs bg-white">
                  No e-bulletins found
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
