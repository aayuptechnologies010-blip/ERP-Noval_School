import React, { useState } from 'react';
import { 
  FaBriefcase, FaGlobe, FaSearch, FaCalendarAlt, FaPlus,
  FaBold, FaItalic, FaStrikethrough, FaUnderline, FaListUl, FaListOl, 
  FaQuoteRight, FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify, 
  FaLink, FaImage, FaCaretDown
} from 'react-icons/fa';

export default function WebAdminCareer() {
  const [status, setStatus] = useState(true);

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#f4f5f7]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-[#1f2937]">Manage Career</h1>
        <div className="text-xs text-gray-500 font-medium">
          Website <span className="mx-1">&gt;</span> Manage Career
        </div>
      </div>

      {/* Post Vacancy Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <FaBriefcase className="text-gray-800 text-sm" />
          <h2 className="text-sm font-bold text-gray-800">Post Vacancy</h2>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col gap-5 max-w-4xl mx-auto">
            
            {/* Form Rows */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <label className="sm:w-48 text-xs font-medium text-gray-700">Job Title</label>
              <input type="text" placeholder="e.g. Requirment of Sports Teacher for Junior Wing" className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <label className="sm:w-48 text-xs font-medium text-gray-700">Job Role</label>
              <div className="flex-1 flex items-center gap-4">
                <select className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500 bg-white">
                  <option></option>
                </select>
                <button className="flex items-center gap-1 text-sm font-semibold text-gray-800 hover:text-blue-600">
                  <FaPlus className="text-xs" /> Add
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <label className="sm:w-48 text-xs font-medium text-gray-700">Required Experience</label>
              <div className="flex-1 flex items-center gap-4">
                <input type="text" placeholder="e.g. 3" className="w-24 border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
                <span className="text-xs text-gray-500">to</span>
                <input type="text" placeholder="e.g. 5" className="w-24 border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
                <span className="text-xs text-gray-500">Years</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <label className="sm:w-48 text-xs font-medium text-gray-700">Required Skills (if any)</label>
              <input type="text" placeholder="e.g. Swiming, Yoga, Football" className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <label className="sm:w-48 text-xs font-medium text-gray-700">Required Qualification</label>
              <input type="text" placeholder="e.g. B.Ed., TGT, NTT" className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <label className="sm:w-48 text-xs font-medium text-gray-700">Required Age Limit</label>
              <div className="flex-1 flex items-center gap-4">
                <input type="text" placeholder="25" className="w-24 border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
                <span className="text-xs text-gray-500">to</span>
                <input type="text" placeholder="35" className="w-24 border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
                <span className="text-xs text-gray-500">Years</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <label className="sm:w-48 text-xs font-medium text-gray-700">No. of Post</label>
              <input type="text" placeholder="e.g. 5" className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
              <label className="sm:w-48 text-xs font-medium text-gray-700 mt-2">Description</label>
              <div className="flex-1 border border-gray-300 rounded overflow-hidden">
                {/* Rich Text Toolbar Mockup */}
                <div className="bg-[#f8f9fa] border-b border-gray-200 px-2 py-1.5 flex flex-wrap gap-1 items-center text-gray-600">
                  <button className="p-1.5 hover:bg-gray-200 rounded text-xs"><FaBold /></button>
                  <button className="p-1.5 hover:bg-gray-200 rounded text-xs"><FaItalic /></button>
                  <button className="p-1.5 hover:bg-gray-200 rounded text-xs"><FaStrikethrough /></button>
                  <div className="w-px h-4 bg-gray-300 mx-1"></div>
                  <button className="p-1.5 hover:bg-gray-200 rounded text-xs flex items-center gap-1">Format <FaCaretDown /></button>
                  <div className="w-px h-4 bg-gray-300 mx-1"></div>
                  <button className="p-1.5 hover:bg-gray-200 rounded text-xs"><FaListUl /></button>
                  <button className="p-1.5 hover:bg-gray-200 rounded text-xs"><FaListOl /></button>
                  <div className="w-px h-4 bg-gray-300 mx-1"></div>
                  <button className="p-1.5 hover:bg-gray-200 rounded text-xs"><FaAlignLeft /></button>
                  <button className="p-1.5 hover:bg-gray-200 rounded text-xs"><FaAlignCenter /></button>
                  <button className="p-1.5 hover:bg-gray-200 rounded text-xs"><FaAlignRight /></button>
                  <div className="w-px h-4 bg-gray-300 mx-1"></div>
                  <button className="p-1.5 hover:bg-gray-200 rounded text-xs"><FaLink /></button>
                  <button className="p-1.5 hover:bg-gray-200 rounded text-xs"><FaImage /></button>
                </div>
                <textarea rows="6" className="w-full p-3 text-sm outline-none resize-y"></textarea>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mt-2">
              <label className="sm:w-48 text-xs font-medium text-gray-700">Activation Date</label>
              <div className="w-64 relative">
                <input type="text" placeholder="Start Date" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
                <div className="absolute right-0 top-0 bottom-0 w-10 bg-gray-100 border-l border-gray-300 flex items-center justify-center rounded-r">
                  <FaCalendarAlt className="text-gray-500" />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <label className="sm:w-48 text-xs font-medium text-gray-700 flex items-center gap-2">
                <input type="checkbox" className="w-3 h-3 border-gray-300 rounded" />
                Deactivation Date
              </label>
              <div className="w-64 relative opacity-60">
                <input type="text" placeholder="End Date" disabled className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none bg-gray-50" />
                <div className="absolute right-0 top-0 bottom-0 w-10 bg-gray-200 border-l border-gray-300 flex items-center justify-center rounded-r">
                  <FaCalendarAlt className="text-gray-400" />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <label className="sm:w-48 text-xs font-medium text-gray-700">Status</label>
              <div className="flex-1 flex items-center gap-3">
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

          <div className="flex justify-end items-center gap-4 mt-8 pt-4">
            <button className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium py-2 px-6 rounded transition">Reset</button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-6 rounded transition">Save</button>
          </div>
        </div>
      </div>

      {/* Post Vacancy List Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FaGlobe className="text-gray-800 text-lg" />
            <h2 className="text-sm font-bold text-gray-800">Post Vacancy List</h2>
          </div>
          
          <div className="relative">
            <input type="text" placeholder="Search..." className="w-64 border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gray-100 border-l border-gray-300 flex items-center justify-center rounded-r cursor-pointer hover:bg-gray-200">
              <FaSearch className="text-gray-500 text-[10px]" />
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] text-left">
            <thead className="text-gray-600 uppercase bg-gray-50/50 border-b border-gray-200">
              <tr>
                <th className="px-3 py-3 font-semibold text-center w-12">S.No.</th>
                <th className="px-3 py-3 font-semibold text-center">Job Title</th>
                <th className="px-3 py-3 font-semibold text-center">Job Role</th>
                <th className="px-3 py-3 font-semibold text-center">Skills</th>
                <th className="px-3 py-3 font-semibold text-center">Experience</th>
                <th className="px-3 py-3 font-semibold text-center">Qualification</th>
                <th className="px-3 py-3 font-semibold text-center">No. of Post</th>
                <th className="px-3 py-3 font-semibold text-center">Age</th>
                <th className="px-3 py-3 font-semibold text-center">Activation Date</th>
                <th className="px-3 py-3 font-semibold text-center">Deactivation Date</th>
                <th className="px-3 py-3 font-semibold text-center">Status</th>
                <th className="px-3 py-3 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="12" className="px-4 py-8 text-center text-gray-500 text-xs bg-gray-50/20">
                  No Record Found
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
