import React from 'react';
import { FaSearch, FaInbox } from 'react-icons/fa';

export default function WebAdminFeedbackQuestionMaster() {
  return (
    <div className="flex-1 overflow-y-auto bg-[#f4f5f7]">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-[#1f2937]">Questions Master</h1>
          <div className="flex items-center gap-4">
            <button className="text-xs text-gray-500 font-medium hover:text-gray-700 transition">
              Manage Question Category
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded transition">
              + Add New Question
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div className="relative w-64">
              <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-xs" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full border border-gray-300 rounded px-3 py-1.5 pl-8 text-xs text-gray-600 outline-none focus:border-blue-500 bg-white" 
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#f8f9fb] border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 font-bold text-gray-700">Category</th>
                  <th className="px-6 py-4 font-bold text-gray-700">Question</th>
                  <th className="px-6 py-4 font-bold text-gray-700 text-center w-24">Type</th>
                  <th className="px-6 py-4 font-bold text-gray-700 text-center w-24">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-gray-500 bg-[#fcfcfc] border-b border-gray-100">
                    <div className="flex items-center justify-center gap-2">
                      <FaInbox className="text-gray-400" />
                      <span className="text-xs font-medium">No records available</span>
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
