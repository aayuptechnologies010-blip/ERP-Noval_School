import React, { useState } from 'react';
import { 
  FaImages, FaCog, FaCheckSquare, FaRegSquare, FaInfoCircle, FaEye
} from 'react-icons/fa';

export default function WebAdminLFDAlbum() {
  const [albumMethod, setAlbumMethod] = useState('latest');
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  
  // Dummy photos (using placeholders)
  const photos = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    url: 'https://placehold.co/400x250/e2e8f0/64748b?text=Sports+Event',
    selected: false
  }));

  const toggleSelectAll = () => {
    // In a real app, this would toggle all photos
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#f4f5f7]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-[#1f2937]">LFD Photo Album Management</h1>
        <div className="text-xs text-gray-500 font-medium">
          Home <span className="mx-1">&gt;</span> Website <span className="mx-1">&gt;</span> LFD <span className="mx-1">&gt;</span> Photo Album
        </div>
      </div>

      {/* Select Photo Album Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <FaImages className="text-gray-800 text-sm" />
            <h2 className="text-sm font-bold text-gray-800">Select Photo Album</h2>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white text-[10px] font-bold py-1.5 px-3 rounded flex items-center gap-1.5 shadow-sm">
            <FaCog /> Configure LFD Display
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <label className="block text-xs font-medium text-gray-700 mb-3">Album Selection Method</label>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 w-full md:w-2/3 lg:w-1/2">
              <div className="flex flex-col gap-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="radio" 
                    name="albumMethod" 
                    className="w-4 h-4 text-blue-600" 
                    checked={albumMethod === 'latest'}
                    onChange={() => setAlbumMethod('latest')}
                  />
                  <span className="text-sm text-gray-700">Latest Updated Album</span>
                </label>
                
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="radio" 
                    name="albumMethod" 
                    className="w-4 h-4 text-blue-600"
                    checked={albumMethod === 'manual'}
                    onChange={() => setAlbumMethod('manual')}
                  />
                  <span className="text-sm text-gray-700">Select Manually</span>
                </label>
              </div>
            </div>
          </div>
          
          <div className="bg-[#e6f7ff] border border-[#91d5ff] rounded p-3 flex items-center gap-2">
            <FaImages className="text-[#1890ff] text-sm" />
            <p className="text-sm text-[#0050b3]"><span className="font-semibold">Selected Album:</span> Annual Sports Game 2024</p>
          </div>
        </div>
      </div>

      {/* Photo Gallery Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8 overflow-hidden">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FaImages className="text-gray-800 text-sm" />
            <h2 className="text-sm font-bold text-gray-800">Photo Gallery</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1.5 cursor-pointer text-xs font-medium text-blue-600 hover:text-blue-700">
              <FaCheckSquare /> Select All
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer text-xs font-medium text-gray-600 hover:text-gray-700">
              <FaRegSquare /> Deselect All
            </label>
            <div className="bg-gray-500 text-white text-[10px] font-bold px-2 py-1 rounded">
              0 Selected
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 mb-6">
            {photos.map((photo) => (
              <div key={photo.id} className="border border-gray-200 rounded-lg overflow-hidden group cursor-pointer hover:shadow-md transition bg-white flex flex-col h-full relative">
                <div className="aspect-[4/3] w-full overflow-hidden relative">
                  <img src={photo.url} alt={`Photo ${photo.id}`} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-700 shadow-sm">
                      <FaEye className="text-sm" />
                    </div>
                  </div>
                </div>
                <div className="p-2 border-t border-gray-100 bg-white flex items-center gap-2">
                  <input type="checkbox" className="w-3.5 h-3.5 border-gray-300 rounded text-blue-600 cursor-pointer" />
                  <span className="text-[10px] font-medium text-gray-700">Show on LFD</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#e6f4ff] border border-[#91d5ff] rounded p-3 flex items-center gap-2 mb-6">
            <FaInfoCircle className="text-[#0050b3] text-sm" />
            <p className="text-xs text-[#0050b3]">Select photos to display on the LFD screen. Selected photos will be shown in a slideshow format.</p>
          </div>

          <div className="flex justify-end items-center gap-4 border-t border-gray-100 pt-5 mt-2">
            <button className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium py-2 px-6 rounded transition">Reset</button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-6 rounded transition shadow-sm">Save Configuration</button>
          </div>
        </div>
      </div>
      
      <div className="text-center text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-4">
        COPYRIGHT © 2017 FRANCISCAN.
      </div>
    </div>
  );
}
