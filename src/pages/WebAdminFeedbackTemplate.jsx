import React from 'react';
import { FaSearch, FaClipboardList } from 'react-icons/fa';

export default function WebAdminFeedbackTemplate() {
  return (
    <div className="flex-1 overflow-y-auto bg-[#f4f5f7]">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-[#1f2937]">Feedback Manager</h1>
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded transition flex items-center gap-2">
            <span>+</span> Create New Feedback
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div className="relative w-72">
              <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-xs" />
              <input 
                type="text" 
                placeholder="Search Templates..." 
                className="w-full border border-gray-300 rounded px-3 py-1.5 pl-8 text-xs text-gray-600 outline-none focus:border-blue-500 bg-white" 
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#f8f9fb] border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 font-bold text-gray-700 w-16">Sl No</th>
                  <th className="px-6 py-4 font-bold text-gray-700">Feedback Form</th>
                  <th className="px-6 py-4 font-bold text-gray-700">Feedback Duration</th>
                  <th className="px-6 py-4 font-bold text-gray-700 text-center">Status</th>
                  <th className="px-6 py-4 font-bold text-gray-700 text-center">Total Questions</th>
                  <th className="px-6 py-4 font-bold text-gray-700 text-center">Apply To</th>
                  <th className="px-6 py-4 font-bold text-gray-700 text-center">Response Count</th>
                  <th className="px-6 py-4 font-bold text-gray-700 text-center">Web Link</th>
                  <th className="px-6 py-4 font-bold text-gray-700 text-center w-24">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="9" className="px-6 py-16 text-center bg-[#fcfcfc] border-b border-gray-100">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <FaClipboardList className="text-gray-400 text-4xl" />
                      <div className="text-gray-600 font-bold text-sm">No feedback templates found</div>
                      <div className="text-gray-400 text-xs font-medium">Create your first feedback template to get started</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-6 w-full text-center text-[10px] text-gray-400 font-medium uppercase tracking-wider">
        COPYRIGHT © 2017 FRANCISCAN.
      </div>
    </div>
  );
}
