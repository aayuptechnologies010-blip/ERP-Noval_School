import React, { useState } from 'react';
import { 
  FaCertificate, FaCloudUploadAlt, FaListUl
} from 'react-icons/fa';

export default function WebAdminUploadTC() {
  const [status, setStatus] = useState(true);

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#f4f5f7]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-[#1f2937]">Certificate Management</h1>
        <div className="text-xs text-gray-500 font-medium">
          Home <span className="mx-1">&gt;</span> Website <span className="mx-1">&gt;</span> Upload Certificate
        </div>
      </div>

      {/* Upload Certificate Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <FaCertificate className="text-blue-600 text-sm" />
          <h2 className="text-sm font-bold text-gray-800">Upload Certificate</h2>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Column - Form Fields */}
            <div className="flex-1 flex flex-col gap-5">
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Certificate Type <span className="text-red-500">*</span></label>
                  <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500 bg-white">
                    <option>Transfer Certificate</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Academic Year <span className="text-red-500">*</span></label>
                  <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500 bg-white">
                    <option>Select Year</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Class <span className="text-red-500">*</span></label>
                  <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500 bg-white">
                    <option></option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Admission No <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Enter Admission Number" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Student Name <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Enter Student Full Name" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Certificate Number</label>
                  <input type="text" placeholder="Enter Certificate Number" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
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

            {/* Right Column - File Upload */}
            <div className="w-full lg:w-[400px]">
              <label className="block text-xs font-medium text-gray-700 mb-1">Certificate File <span className="text-red-500">*</span></label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-white relative h-[180px]">
                <span className="absolute top-3 left-3 bg-orange-500 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">CERT</span>
                <FaCloudUploadAlt className="text-gray-600 text-2xl mb-2" />
                <div className="text-xs font-medium text-gray-700">Drag & drop <span className="font-normal">or</span> <span className="text-blue-500 cursor-pointer">browse</span></div>
                <div className="text-[10px] text-gray-500 mt-1">PDF • JPG • PNG • JPEG | Max 5MB</div>
              </div>
            </div>

          </div>

          <div className="flex justify-end items-center gap-6 mt-8">
            <button className="text-gray-500 hover:text-gray-800 text-sm font-medium transition">Reset Form</button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-8 rounded transition">Save</button>
          </div>
        </div>
      </div>

      {/* All Uploaded Certificates Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FaListUl className="text-green-600 text-lg" />
            <h2 className="text-sm font-bold text-gray-800">All Uploaded Certificates</h2>
          </div>
          
          <div className="flex items-center gap-3">
            <select className="border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-600 outline-none bg-white">
              <option>All Academic Years</option>
            </select>
            <div className="relative">
              <input type="text" placeholder="Search certificates..." className="w-56 border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500" />
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
                <th className="px-4 py-3 font-semibold text-center">CERTIFICATE TYPE</th>
                <th className="px-4 py-3 font-semibold text-center">CLASS</th>
                <th className="px-4 py-3 font-semibold text-center">ADMISSION NO</th>
                <th className="px-4 py-3 font-semibold text-center">STUDENT NAME</th>
                <th className="px-4 py-3 font-semibold text-center">CERTIFICATE NO</th>
                <th className="px-4 py-3 font-semibold text-center">FILE</th>
                <th className="px-4 py-3 font-semibold text-center">STATUS</th>
                <th className="px-4 py-3 font-semibold text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="9" className="px-4 py-8 text-center text-gray-400 text-sm bg-gray-50/20">
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-gray-300 text-white flex items-center justify-center text-[10px] font-bold">i</span>
                    No certificates found
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
