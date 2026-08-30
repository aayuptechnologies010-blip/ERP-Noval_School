import React, { useState } from 'react';
import { 
  FaBook, FaCalendarAlt, FaCloudUploadAlt, FaListUl
} from 'react-icons/fa';

export default function WebAdminHolidayHomework() {
  const [status, setStatus] = useState(true);

  const classes = [
    'NUR-A', 'NUR-B', 'LKG-A', 'LKG-B', 'UKG-A', 'UKG-B',
    'I-A', 'I-B', 'II-A', 'II-B', 'III-A', 'III-B'
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#f4f5f7]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-[#1f2937]">Holiday Homework Management</h1>
        <div className="text-xs text-gray-500 font-medium">
          Home <span className="mx-1">&gt;</span> Website <span className="mx-1">&gt;</span> Holiday Homework
        </div>
      </div>

      {/* Add Holiday Homework Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <FaBook className="text-gray-800 text-sm" />
          <h2 className="text-sm font-bold text-gray-800">Add Holiday Homework</h2>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col gap-6">
            
            {/* Top Row */}
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">Date <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input type="text" placeholder="Select Date" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
                  <FaCalendarAlt className="absolute right-3 top-2.5 text-gray-400" />
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">Type <span className="text-red-500">*</span></label>
                <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500 bg-white">
                  <option>Select Type</option>
                </select>
              </div>
            </div>

            {/* Middle Row */}
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">Select Classes <span className="text-red-500">*</span></label>
                <div className="border border-gray-300 rounded-lg p-4 h-[180px] overflow-y-auto bg-gray-50/30">
                  <div className="flex flex-col gap-3">
                    {classes.map((cls, idx) => (
                      <label key={idx} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-3.5 h-3.5 border-gray-300 rounded text-blue-600" />
                        <span className="text-xs text-gray-600">{cls}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">Attach PDF File</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-white relative h-[180px]">
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">PDF</span>
                  <FaCloudUploadAlt className="text-gray-600 text-2xl mb-2" />
                  <div className="text-xs font-medium text-gray-700">Drag & drop <span className="font-normal">or</span> <span className="text-blue-500 cursor-pointer">browse</span></div>
                  <div className="text-[10px] text-gray-500 mt-1">PDF Only | Max 5MB | No spaces in filename</div>
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-[0.5]">
                <label className="block text-xs font-medium text-gray-700 mb-1">Subject <span className="text-red-500">*</span></label>
                <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500 bg-white">
                  <option>Select Subject</option>
                </select>
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

          <div className="flex justify-end items-center gap-4 mt-8 pt-4">
            <button className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium py-2 px-6 rounded transition">Reset</button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-6 rounded transition">Save</button>
          </div>
        </div>
      </div>

      {/* All Holiday Homework Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FaListUl className="text-gray-800 text-lg" />
            <h2 className="text-sm font-bold text-gray-800">All Holiday Homework</h2>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <input type="text" placeholder="Search homework..." className="w-64 border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500" />
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
                <th className="px-4 py-3 font-semibold text-center">DATE</th>
                <th className="px-4 py-3 font-semibold text-center">ACADEMIC YEAR</th>
                <th className="px-4 py-3 font-semibold text-center">CLASS</th>
                <th className="px-4 py-3 font-semibold text-center">SUBJECT</th>
                <th className="px-4 py-3 font-semibold text-center">TYPE</th>
                <th className="px-4 py-3 font-semibold text-center">ATTACHMENT</th>
                <th className="px-4 py-3 font-semibold text-center">STATUS</th>
                <th className="px-4 py-3 font-semibold text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="9" className="px-4 py-12 text-center text-gray-400 text-sm bg-gray-50/20 border-b border-gray-100">
                  <div className="flex flex-col items-center justify-center">
                    <span className="w-4 h-4 rounded border border-gray-400 mb-1 inline-block"></span>
                    <span className="text-xs">No records found</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
