import React, { useState } from 'react';
import { 
  FaFileAlt, FaCloudUploadAlt, FaListUl, FaInfoCircle,
  FaMobileAlt, FaDesktop, FaImage, FaExclamationTriangle, FaCog
} from 'react-icons/fa';

export default function WebAdminLFDLetterhead() {
  const [status, setStatus] = useState(true);

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#f4f5f7]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-[#1f2937]">LFD Letterhead Management</h1>
        <div className="text-xs text-gray-500 font-medium">
          Home <span className="mx-1">&gt;</span> Website <span className="mx-1">&gt;</span> LFD <span className="mx-1">&gt;</span> Letterhead
        </div>
      </div>

      {/* Add LFD Letterhead Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <FaFileAlt className="text-gray-800 text-sm" />
          <h2 className="text-sm font-bold text-gray-800">Add LFD Letterhead</h2>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Left Column - Form Fields */}
            <div className="flex-1 flex flex-col gap-6">
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Letterhead Type <span className="text-red-500">*</span></label>
                <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500 bg-white">
                  <option>--Select Letterhead--</option>
                </select>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Vertical Letterhead</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-white relative h-[140px]">
                    <span className="absolute top-3 left-3 bg-[#6d5cae] text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">VERTICAL</span>
                    <FaCloudUploadAlt className="text-gray-600 text-2xl mb-2" />
                    <div className="text-xs font-medium text-gray-700">Drag & drop <span className="font-normal">or</span> <span className="text-blue-500 cursor-pointer">browse</span></div>
                    <div className="text-[10px] text-gray-400 mt-1">JPG • JPEG • PNG • GIF | Max 1MB</div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Horizontal Letterhead</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-white relative h-[140px]">
                    <span className="absolute top-3 left-3 bg-[#f57c00] text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">HORIZONTAL</span>
                    <FaCloudUploadAlt className="text-gray-600 text-2xl mb-2" />
                    <div className="text-xs font-medium text-gray-700">Drag & drop <span className="font-normal">or</span> <span className="text-blue-500 cursor-pointer">browse</span></div>
                    <div className="text-[10px] text-gray-400 mt-1">JPG • JPEG • PNG • GIF | Max 1MB</div>
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
                  {status && <span className="bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Active</span>}
                </div>
              </div>

            </div>

            {/* Right Column - Guidelines */}
            <div className="w-full lg:w-[350px]">
              <div className="bg-[#f8f9fa] border border-gray-200 rounded-lg p-5 h-full">
                <div className="flex items-center gap-2 mb-4">
                  <FaInfoCircle className="text-gray-500 text-sm" />
                  <h3 className="text-sm font-semibold text-gray-700">Letterhead Guidelines</h3>
                </div>
                
                <div className="flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <FaMobileAlt className="text-blue-500 text-sm mt-0.5" />
                    <p className="text-[11px] text-gray-600"><span className="font-bold text-gray-700">Vertical:</span> For portrait orientation displays</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaDesktop className="text-green-500 text-sm mt-0.5" />
                    <p className="text-[11px] text-gray-600"><span className="font-bold text-gray-700">Horizontal:</span> For landscape orientation displays</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaImage className="text-blue-400 text-sm mt-0.5" />
                    <p className="text-[11px] text-gray-600">Supported formats: JPG, JPEG, PNG, GIF</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaExclamationTriangle className="text-orange-500 text-sm mt-0.5" />
                    <p className="text-[11px] text-gray-600">Maximum file size: 1MB each</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCog className="text-gray-500 text-sm mt-0.5" />
                    <p className="text-[11px] text-gray-600">Configure letterheads for different screen types</p>
                  </div>
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

      {/* All LFD Letterheads Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FaListUl className="text-gray-800 text-lg" />
            <h2 className="text-sm font-bold text-gray-800">All LFD Letterheads</h2>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <input type="text" placeholder="Search letterheads..." className="w-64 border border-gray-300 rounded px-3 py-1.5 pl-3 text-xs text-gray-600 outline-none focus:border-blue-500" />
            </div>
            <select className="border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-600 outline-none">
              <option>10</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[11px] text-gray-600 uppercase bg-gray-50/50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 font-semibold text-center w-16">S.NO.</th>
                <th className="px-4 py-3 font-semibold text-center">LETTERHEAD NAME</th>
                <th className="px-4 py-3 font-semibold text-center">VERTICAL FILE</th>
                <th className="px-4 py-3 font-semibold text-center">HORIZONTAL FILE</th>
                <th className="px-4 py-3 font-semibold text-center">STATUS</th>
                <th className="px-4 py-3 font-semibold text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="6" className="px-4 py-8 text-center text-gray-500 text-sm bg-gray-50/20">
                  No LFD letterheads found
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
