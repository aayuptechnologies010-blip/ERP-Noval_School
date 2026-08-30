import React, { useState } from 'react';
import { 
  FaPen, FaListUl, FaBold, FaItalic, FaStrikethrough, FaUnderline, 
  FaListOl, FaQuoteRight, FaAlignLeft, FaAlignCenter, FaAlignRight, 
  FaAlignJustify, FaLink, FaImage, FaCaretDown
} from 'react-icons/fa';

export default function WebAdminBlog() {
  const [status, setStatus] = useState(true);

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#f4f5f7]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-[#1f2937]">Blog Management</h1>
        <div className="text-xs text-gray-500 font-medium">
          Home <span className="mx-1">&gt;</span> Website <span className="mx-1">&gt;</span> Blog
        </div>
      </div>

      {/* Add Blog Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <FaPen className="text-gray-800 text-sm" />
          <h2 className="text-sm font-bold text-gray-800">Add Blog</h2>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col gap-6">
            
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">Blog Title <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Enter Blog Title" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">Blog Author <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Enter Blog Author" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Description <span className="text-red-500">*</span></label>
              <div className="border border-gray-300 rounded overflow-hidden">
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
                <textarea rows="10" className="w-full p-3 text-sm outline-none resize-y"></textarea>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 items-end">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">Blog Icon</label>
                <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                  <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 text-xs font-medium text-gray-700 border-r border-gray-300">Choose File</button>
                  <span className="px-3 text-xs text-gray-500">No file chosen</span>
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">Author Photo</label>
                <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                  <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 text-xs font-medium text-gray-700 border-r border-gray-300">Choose File</button>
                  <span className="px-3 text-xs text-gray-500">No file chosen</span>
                </div>
              </div>
              <div className="flex-1 pb-1">
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

      {/* All Blogs Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FaListUl className="text-gray-800 text-lg" />
            <h2 className="text-sm font-bold text-gray-800">All Blogs</h2>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <input type="text" placeholder="Search blogs..." className="w-64 border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500" />
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
                <th className="px-4 py-3 font-semibold text-center">TITLE</th>
                <th className="px-4 py-3 font-semibold text-center">AUTHOR</th>
                <th className="px-4 py-3 font-semibold text-center">STATUS</th>
                <th className="px-4 py-3 font-semibold text-center">CREATED</th>
                <th className="px-4 py-3 font-semibold text-center">ICON</th>
                <th className="px-4 py-3 font-semibold text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="7" className="px-4 py-12 text-center text-gray-400 text-sm bg-gray-50/20">
                  <span className="text-xs">No blogs found</span>
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
