import React, { useState } from 'react';
import { 
  FaLightbulb, FaCalendarAlt, FaQuoteLeft, FaListUl, FaEye
} from 'react-icons/fa';

export default function WebAdminWebsiteThoughts() {
  const [status, setStatus] = useState(true);
  const [writerName, setWriterName] = useState('');
  const [thoughtQuote, setThoughtQuote] = useState('');
  const [enableEndDate, setEnableEndDate] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#f4f5f7]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-[#1f2937]">Website Thoughts Management</h1>
        <div className="text-xs text-gray-500 font-medium">
          Home <span className="mx-1">&gt;</span> Website <span className="mx-1">&gt;</span> Manage Thoughts
        </div>
      </div>

      {/* Add New Thought Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <FaLightbulb className="text-yellow-500 text-sm" />
          <h2 className="text-sm font-bold text-gray-800">Add New Thought</h2>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Column - Form Fields */}
            <div className="flex-[3] flex flex-col gap-6">
              
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Writer Name <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    placeholder="Enter Writer Name" 
                    value={writerName}
                    onChange={(e) => setWriterName(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" 
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Activation Date <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input type="text" placeholder="Select Activation Date" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
                    <FaCalendarAlt className="absolute right-3 top-2.5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Thought Quote <span className="text-red-500">*</span></label>
                <textarea 
                  rows="4" 
                  placeholder="Enter inspiring thought or quote..." 
                  value={thoughtQuote}
                  onChange={(e) => setThoughtQuote(e.target.value)}
                  maxLength={500}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500 resize-y"
                ></textarea>
                <div className="text-right text-[10px] text-gray-400 mt-1">
                  {thoughtQuote.length}/500 characters
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Deactivation Date</label>
                  <div className="flex items-center gap-3">
                    <div className="relative flex-1 opacity-50">
                      <input 
                        type="text" 
                        placeholder="Select End Date (Optional)" 
                        disabled={!enableEndDate}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500 disabled:bg-gray-50" 
                      />
                      <FaCalendarAlt className="absolute right-3 top-2.5 text-gray-400" />
                    </div>
                    <label className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={enableEndDate}
                        onChange={(e) => setEnableEndDate(e.target.checked)}
                        className="w-3.5 h-3.5" 
                      /> 
                      Enable End Date
                    </label>
                  </div>
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

            {/* Right Column - Live Preview */}
            <div className="flex-[2] pt-6 lg:pt-0">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg h-[240px] p-6 text-white relative shadow-md flex flex-col justify-center">
                <div className="absolute top-4 left-4 flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider opacity-70">
                  <FaEye /> Live Preview
                </div>
                
                <FaQuoteLeft className="text-4xl text-white opacity-20 absolute top-12 left-6" />
                
                <div className="text-center italic font-medium px-8 relative z-10 text-[15px] leading-relaxed">
                  {thoughtQuote ? `"${thoughtQuote}"` : "Enter your thought to see preview..."}
                </div>
                
                <div className="absolute bottom-6 right-6 text-sm font-semibold opacity-90">
                  - {writerName || "Unknown"}
                </div>
              </div>
            </div>

          </div>

          <div className="flex justify-end items-center gap-6 mt-8">
            <button className="text-gray-500 hover:text-gray-800 text-sm font-medium transition">Reset Form</button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-8 rounded transition">Save</button>
          </div>
        </div>
      </div>

      {/* All Website Thoughts Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FaListUl className="text-green-600 text-lg" />
            <h2 className="text-sm font-bold text-gray-800">All Website Thoughts</h2>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <input type="text" placeholder="Search thoughts..." className="w-56 border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500" />
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
                <th className="px-4 py-3 font-semibold text-center">WRITER NAME</th>
                <th className="px-4 py-3 font-semibold text-center w-64">THOUGHT QUOTE</th>
                <th className="px-4 py-3 font-semibold text-center">ACTIVATION DATE</th>
                <th className="px-4 py-3 font-semibold text-center">DEACTIVATION DATE</th>
                <th className="px-4 py-3 font-semibold text-center">STATUS</th>
                <th className="px-4 py-3 font-semibold text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="7" className="px-4 py-8 text-center text-gray-400 text-sm bg-gray-50/20">
                  <span className="text-xs">No thoughts found</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
