import React, { useState } from 'react';
import { 
  FaImage, FaImages, FaFolder
} from 'react-icons/fa';

export default function WebAdminPhotosOnHomepage() {
  const [albumMethod, setAlbumMethod] = useState('latest');
  
  // Dummy photos (using placeholders)
  const photos = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    url: '', // Empty to show grey box
    selected: false
  }));

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#f4f5f7]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-[#1f2937]">Gallery Management</h1>
        <div className="text-xs text-gray-500 font-medium">
          Home <span className="mx-1">&gt;</span> Website <span className="mx-1">&gt;</span> Gallery <span className="mx-1">&gt;</span> Show Photos on Homepage
        </div>
      </div>

      {/* Select Photo Album Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <FaImage className="text-blue-600 text-sm" />
            <h2 className="text-sm font-bold text-gray-800">Select Photo Album for Homepage</h2>
          </div>
          <div className="bg-[#00a8ff] text-white text-[10px] font-bold py-1 px-3 rounded flex items-center gap-1.5 shadow-sm">
            <FaFolder /> Annual Sports Game 2024
          </div>
        </div>
        
        <div className="p-6">
          <label className="block text-xs font-medium text-gray-700 mb-3">Album Selection Method</label>
          <div className="bg-gray-50/50 border border-gray-200 rounded-lg p-5 w-full md:w-2/3 lg:w-1/2">
            <div className="flex flex-col gap-5">
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
              
              <div className="w-full h-px bg-gray-200"></div>
              
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
      </div>

      {/* Photo Gallery Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8 overflow-hidden">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FaImages className="text-green-600 text-sm" />
            <h2 className="text-sm font-bold text-gray-800">Photo Gallery</h2>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="bg-gray-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
              10 Photos
            </div>
            <div className="bg-[#8cc63f] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
              0 Selected
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {photos.map((photo) => (
              <div key={photo.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white flex flex-col h-full shadow-sm">
                <div className="aspect-[4/3] w-full bg-gray-100 relative">
                  {/* Empty light grey placeholder as shown in screenshot */}
                </div>
                <div className="p-3 border-t border-gray-100 bg-white flex items-center gap-3">
                  <div className="w-10 h-5 bg-gray-300 rounded-full relative cursor-pointer">
                    <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white"></div>
                  </div>
                  <span className="text-xs font-medium text-gray-600">Show on Slider</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-gray-100">
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-1.5 text-blue-600 text-xs font-bold hover:text-blue-700">
                <span className="text-sm">✓</span> Select All
              </button>
              <button className="flex items-center gap-1.5 text-gray-700 text-xs font-bold hover:text-gray-900">
                <span className="text-sm">×</span> Clear All
              </button>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-gray-500 hover:text-gray-800 text-xs font-medium transition">Reset Selection</button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-2 px-6 rounded transition">Save Changes</button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-4">
        COPYRIGHT © 2017 FRANCISCAN.
      </div>
    </div>
  );
}
