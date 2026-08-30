import React from 'react';
import { FaFilter, FaInfoCircle } from 'react-icons/fa';

export default function WebAdminFeedbackSubjectClass() {
  return (
    <div className="flex-1 overflow-y-auto bg-[#f4f5f7]">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-[#1f2937]">Subject Class Relation</h1>
          <div className="text-xs text-gray-500 font-medium">
            Home <span className="mx-1">&gt;</span> Feedback Management <span className="mx-1">&gt;</span> Subject Class Relation
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 flex items-center gap-2 border-b border-gray-100">
            <FaFilter className="text-gray-800 text-sm" />
            <h2 className="text-sm font-bold text-gray-800">Class Selection</h2>
          </div>
          
          <div className="p-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex items-end gap-4 w-full md:w-auto">
              <div className="w-64">
                <label className="block text-xs font-medium text-gray-700 mb-1">Select Class <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value="NUR A"
                  readOnly
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none bg-white" 
                />
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2 px-6 rounded transition">
                GO
              </button>
            </div>
            
            <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
              <FaInfoCircle />
              <span>Select a class to view and manage subjects for feedback system</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-6 w-full text-center text-[10px] text-gray-400 font-medium uppercase tracking-wider">
        COPYRIGHT © 2017 FRANCISCAN.
      </div>
    </div>
  );
}
