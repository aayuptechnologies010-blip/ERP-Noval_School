import React, { useState } from 'react';
import { 
  FaImage, FaCloudUploadAlt, FaListUl, FaTrash
} from 'react-icons/fa';

export default function WebAdminHomepageSlider() {
  const [status, setStatus] = useState(true);

  // Dummy slider data
  const sliders = [
    { id: 1, order: 0, title: 'HOME', status: true, image: 'https://placehold.co/100x60/e2e8f0/64748b?text=School' },
    { id: 2, order: 0, title: 'HOME', status: true, image: 'https://placehold.co/100x60/e2e8f0/64748b?text=Students' },
    { id: 3, order: 0, title: 'HOME', status: true, image: 'https://placehold.co/100x60/e2e8f0/64748b?text=Campus' },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#f4f5f7]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-[#1f2937]">Homepage Slider Management</h1>
        <div className="text-xs text-gray-500 font-medium">
          Home <span className="mx-1">&gt;</span> Website <span className="mx-1">&gt;</span> Homepage Slider
        </div>
      </div>

      {/* Add Slider Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <FaImage className="text-gray-800 text-sm" />
          <h2 className="text-sm font-bold text-gray-800">Add Slider</h2>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Left Column - Form Fields */}
            <div className="flex-1 flex flex-col gap-6">
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-[2]">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Slider Title <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Enter Slider Title" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Order No.</label>
                  <input type="text" placeholder="e.g. 1" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-[2]">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Image Size</label>
                  <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500 bg-white">
                    <option>1500 x 650 (Standard)</option>
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

            {/* Right Column - Image Upload */}
            <div className="w-full lg:w-[400px]">
              <label className="block text-xs font-medium text-gray-700 mb-1">Slider Image <span className="text-red-500">*</span></label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-white relative h-[160px]">
                <span className="absolute top-3 left-3 bg-purple-500 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">IMAGE</span>
                <FaCloudUploadAlt className="text-gray-600 text-2xl mb-2" />
                <div className="text-xs font-medium text-gray-700">Drag & drop <span className="font-normal">or</span> <span className="text-blue-500 cursor-pointer">browse</span></div>
                <div className="text-[10px] text-gray-400 mt-1">JPG • JPEG • PNG | Max 5MB</div>
                <div className="text-[10px] text-blue-500 font-medium mt-1">Recommended: 1500 x 650</div>
              </div>
            </div>

          </div>

          <div className="flex justify-end items-center gap-4 mt-6 pt-4">
            <button className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium py-2 px-6 rounded transition">Reset</button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-6 rounded transition">Save</button>
          </div>
        </div>
      </div>

      {/* All Homepage Sliders Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FaListUl className="text-gray-800 text-lg" />
            <h2 className="text-sm font-bold text-gray-800">All Homepage Sliders</h2>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="bg-[#8cc63f] hover:bg-[#7ab32e] text-white text-[11px] font-bold py-1.5 px-4 rounded shadow-sm">
              Save Slider Sequence
            </button>
            <div className="relative">
              <input type="text" placeholder="Search sliders..." className="w-48 border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500" />
            </div>
            <select className="border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-600 outline-none">
              <option>10</option>
            </select>
          </div>
        </div>

        <div className="px-5 py-3 border-b border-gray-100 flex justify-end">
          <input type="text" placeholder="Search..." className="w-48 border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500" />
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[10px] text-gray-600 uppercase bg-gray-50/50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 font-semibold text-center w-16">S.NO.</th>
                <th className="px-4 py-3 font-semibold text-center w-32">ORDER NO.</th>
                <th className="px-4 py-3 font-semibold text-center">TITLE</th>
                <th className="px-4 py-3 font-semibold text-center">PREVIEW</th>
                <th className="px-4 py-3 font-semibold text-center">STATUS</th>
                <th className="px-4 py-3 font-semibold text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {sliders.map((slider, index) => (
                <tr key={slider.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition">
                  <td className="px-4 py-6 text-center text-gray-600">{index + 1}</td>
                  <td className="px-4 py-6 text-center">
                    <input 
                      type="text" 
                      defaultValue={slider.order}
                      className="w-16 border border-gray-300 rounded px-2 py-1 text-center text-xs outline-none focus:border-blue-500" 
                    />
                  </td>
                  <td className="px-4 py-6 text-center text-gray-600 text-xs">{slider.title}</td>
                  <td className="px-4 py-6 text-center">
                    <img src={slider.image} alt="Slider preview" className="w-16 h-10 object-cover rounded mx-auto border border-gray-200" />
                  </td>
                  <td className="px-4 py-6 text-center">
                    <span className="text-[#20c997] bg-[#e6fcf5] text-[10px] font-bold px-2 py-1 rounded-full border border-[#b2f2bb] inline-flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#20c997]"></span> Active
                    </span>
                  </td>
                  <td className="px-4 py-6 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-8 h-4 bg-green-500 rounded-full relative cursor-pointer">
                        <div className="absolute top-[2px] left-[18px] w-3 h-3 rounded-full bg-white"></div>
                      </div>
                      <button className="text-red-500 hover:text-red-700">
                        <FaTrash className="text-xs" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 flex items-center justify-between border-t border-gray-100 bg-white">
          <div className="text-xs text-gray-500">
            Showing 1 to 3 of 3 entries
          </div>
          <div className="flex border border-gray-300 rounded overflow-hidden">
            <button className="px-3 py-1.5 bg-gray-50 text-gray-500 hover:bg-gray-100 text-xs border-r border-gray-300">Previous</button>
            <button className="px-3 py-1.5 bg-[#3b82f6] text-white text-xs font-medium">1</button>
            <button className="px-3 py-1.5 bg-gray-50 text-gray-500 hover:bg-gray-100 text-xs border-l border-gray-300">Next</button>
          </div>
        </div>
      </div>
      
      <div className="text-center text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-4">
        COPYRIGHT © 2017 FRANCISCAN.
      </div>
    </div>
  );
}
