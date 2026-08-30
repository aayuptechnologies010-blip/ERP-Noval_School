import React from 'react';
import { 
  FaMinusSquare, FaCloudUploadAlt, FaListUl, FaSearch, FaFolderOpen
} from 'react-icons/fa';

export default function WebAdminEDiary() {
  return (
    <div className="flex-1 overflow-y-auto bg-[#f4f5f7]">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-[#1f2937]">e-Diary Management</h1>
          <div className="text-xs text-gray-500 font-medium">
            Home <span className="mx-1">&gt;</span> Academic <span className="mx-1">&gt;</span> e-Diary
          </div>
        </div>

        {/* Define e-Diary Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
          <div className="bg-[#f8f9fb] px-5 py-4 flex items-center gap-2 border-b border-gray-100">
            <FaMinusSquare className="text-blue-600 text-sm" />
            <h2 className="text-sm font-bold text-gray-800">Define e-Diary</h2>
          </div>
          
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-8">
              
              {/* Left side input */}
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">Session Name <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  placeholder="Enter Session Name" 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500 bg-white" 
                />
              </div>

              {/* Right side upload */}
              <div className="flex-[2]">
                <label className="block text-xs font-medium text-gray-700 mb-1">e-Diary PDF File <span className="text-red-500">*</span></label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg h-40 bg-white flex flex-col items-center justify-center relative cursor-pointer hover:bg-gray-50 transition">
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">PDF</div>
                  <FaCloudUploadAlt className="text-gray-800 text-xl mb-2" />
                  <div className="text-xs font-bold text-gray-800">
                    Drag & drop or <span className="text-blue-600 font-medium hover:underline">browse</span>
                  </div>
                  <div className="text-[10px] text-gray-500 mt-1">PDF files only | Max 10MB</div>
                  <div className="text-[10px] text-gray-400 mt-1">No spaces in filename</div>
                </div>
              </div>

            </div>

            <div className="flex justify-end items-center gap-6 mt-6">
              <button className="text-gray-500 hover:text-gray-800 text-xs font-bold transition">Reset Form</button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-8 rounded shadow-sm transition">Save</button>
            </div>
          </div>
        </div>

        {/* All e-Diaries Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="bg-[#f8f9fb] px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 gap-4">
            <div className="flex items-center gap-2">
              <FaListUl className="text-green-500 text-sm" />
              <h2 className="text-sm font-bold text-gray-800">All e-Diaries <span className="text-[10px] text-blue-600 font-bold ml-1">(0 total)</span></h2>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <FaSearch className="absolute left-3 top-2 text-gray-400 text-xs" />
                <input 
                  type="text" 
                  placeholder="Search e-diaries by session name or status..." 
                  className="w-72 border border-gray-300 rounded px-3 py-1.5 pl-8 text-xs text-gray-600 outline-none focus:border-blue-500 bg-white" 
                />
              </div>
              <select className="border border-gray-300 rounded px-3 py-1.5 text-xs font-bold text-gray-600 outline-none bg-white">
                <option>10 per page</option>
              </select>
            </div>
          </div>
          
          <div className="p-4 border-b border-gray-100 text-xs font-bold text-gray-600">
            Showing all 1 entries
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-[9px] text-gray-700 font-bold uppercase bg-[#f8f9fb] border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-center w-16">S.NO.</th>
                  <th className="px-6 py-4 text-center">SESSION NAME</th>
                  <th className="px-6 py-4 text-center">E-DIARY FILE</th>
                  <th className="px-6 py-4 text-center">STATUS</th>
                  <th className="px-6 py-4 text-center w-24">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="5" className="px-4 py-8 text-center text-gray-500 text-xs bg-white border-b border-gray-100">
                    <div className="flex items-center justify-center gap-2">
                      <FaFolderOpen className="text-gray-400 text-sm" />
                      <span>No e-diaries found</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
