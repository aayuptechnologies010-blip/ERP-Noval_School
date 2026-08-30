import React, { useState } from 'react';
import { 
  FaPlusCircle, FaBold, FaItalic, FaStrikethrough, FaUnderline, FaListUl, FaListOl, 
  FaAlignLeft, FaAlignCenter, FaAlignRight, FaLink, FaImage, FaCaretDown, FaSearch, 
  FaEye, FaEdit, FaTrash, FaTable
} from 'react-icons/fa';

export default function WebAdminMediaAlbums() {
  const [status, setStatus] = useState(true);
  const [mediaSource, setMediaSource] = useState('url');

  const albums = [
    { id: 1, headline: 'Edylumpic Prize Distrubution', name: 'Media Gallery', source: 'Print Media', publishDate: '26-Dec-2024', updatedOn: '28-Dec-2024', status: true }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#f4f5f7]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-[#1f2937]">Media Album Management</h1>
        <div className="text-xs text-gray-500 font-medium">
          Home <span className="mx-1">&gt;</span> Website <span className="mx-1">&gt;</span> Gallery <span className="mx-1">&gt;</span> Media Album
        </div>
      </div>

      {/* Add Media Album Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <FaPlusCircle className="text-gray-800 text-sm" />
          <h2 className="text-sm font-bold text-gray-800">Add Media Album</h2>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col gap-6">
            
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">Media Name <span className="text-red-500">*</span></label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 appearance-none bg-white outline-none focus:border-blue-500">
                      <option>Select Media Name</option>
                    </select>
                    <FaCaretDown className="absolute right-3 top-3 text-gray-400" />
                  </div>
                  <button className="w-9 h-9 flex items-center justify-center border border-blue-500 text-blue-500 rounded hover:bg-blue-50 transition font-bold">+</button>
                </div>
              </div>
              
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">Media Headline <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Enter Media Headline" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">Publish Date <span className="text-red-500">*</span></label>
                <input type="text" defaultValue="30-Aug-2026" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
              </div>
              
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-2">Status</label>
                <div className="flex items-center gap-3 mt-1">
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
                <textarea rows="6" className="w-full p-3 text-sm outline-none resize-y"></textarea>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-3">Media Source <span className="text-red-500">*</span></label>
              <div className="flex flex-col gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="mediaSource" className="w-3.5 h-3.5 border-gray-300 text-blue-600 focus:ring-blue-500" checked={mediaSource === 'url'} onChange={() => setMediaSource('url')} />
                  <span className="text-xs text-gray-700">Reference URL</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="mediaSource" className="w-3.5 h-3.5 border-gray-300 text-blue-600 focus:ring-blue-500" checked={mediaSource === 'embed'} onChange={() => setMediaSource('embed')} />
                  <span className="text-xs text-gray-700">Video embed code</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="mediaSource" className="w-3.5 h-3.5 border-gray-300 text-blue-600 focus:ring-blue-500" checked={mediaSource === 'image'} onChange={() => setMediaSource('image')} />
                  <span className="text-xs text-gray-700">Attach image</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer mb-2">
                  <input type="radio" name="mediaSource" className="w-3.5 h-3.5 border-gray-300 text-blue-600 focus:ring-blue-500" checked={mediaSource === 'pdf'} onChange={() => setMediaSource('pdf')} />
                  <span className="text-xs text-gray-700">Attach PDF</span>
                </label>
                
                <input type="text" placeholder="Enter Reference URL" className="w-full sm:w-1/2 border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
              </div>
            </div>

          </div>

          <div className="flex items-center gap-4 mt-8 pt-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-6 rounded transition">Save Media</button>
            <button className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium py-2 px-6 rounded transition">Reset Form</button>
          </div>
        </div>
      </div>

      {/* All Media Albums Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="bg-white px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <FaTable className="text-gray-800 text-sm" />
          <h2 className="text-sm font-bold text-gray-800">All Media Albums</h2>
        </div>
        
        <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            Show 
            <select className="border border-gray-300 rounded px-2 py-1 outline-none focus:border-blue-500">
              <option>10</option>
            </select>
            media albums per page
          </div>
          
          <div className="flex items-center gap-2 text-xs text-gray-600">
            Search Media Albums:
            <input type="text" className="border border-gray-300 rounded px-2 py-1 outline-none focus:border-blue-500 w-48" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="font-semibold text-gray-700 bg-gray-50/50 border-y border-gray-200">
              <tr>
                <th className="px-4 py-3 text-center w-16 cursor-pointer group">S.No. <span className="text-gray-300 text-[10px] ml-1">↕</span></th>
                <th className="px-4 py-3 cursor-pointer group">Media Headline <span className="text-gray-300 text-[10px] ml-1">↕</span></th>
                <th className="px-4 py-3 cursor-pointer group">Media Name <span className="text-gray-300 text-[10px] ml-1">↕</span></th>
                <th className="px-4 py-3 text-center cursor-pointer group">Media Source <span className="text-gray-300 text-[10px] ml-1">↕</span></th>
                <th className="px-4 py-3 text-center cursor-pointer group">Publish Date <span className="text-gray-300 text-[10px] ml-1">↕</span></th>
                <th className="px-4 py-3 text-center cursor-pointer group">Updated On <span className="text-gray-300 text-[10px] ml-1">↕</span></th>
                <th className="px-4 py-3 text-center cursor-pointer group">Status <span className="text-gray-300 text-[10px] ml-1">↕</span></th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {albums.map((album, index) => (
                <tr key={album.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition">
                  <td className="px-4 py-4 text-center font-medium text-blue-600">{index + 1}</td>
                  <td className="px-4 py-4 font-bold text-gray-800">{album.headline}</td>
                  <td className="px-4 py-4 text-gray-600">{album.name}</td>
                  <td className="px-4 py-4 text-center">
                    <span className="bg-blue-500 text-white text-[10px] px-2 py-1 rounded font-medium">{album.source}</span>
                  </td>
                  <td className="px-4 py-4 text-center text-gray-600">{album.publishDate}</td>
                  <td className="px-4 py-4 text-center text-gray-600">{album.updatedOn}</td>
                  <td className="px-4 py-4 text-center">
                    <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">Active</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <button className="text-blue-500 hover:text-blue-700"><FaEye /></button>
                      <button className="text-blue-500 hover:text-blue-700"><FaEdit /></button>
                      <button className="text-red-500 hover:text-red-700"><FaTrash /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 flex items-center justify-between bg-white border-t border-gray-100">
          <div className="text-[11px] text-gray-500">
            Showing 1 to 1 of 1 media albums
          </div>
          <div className="flex border border-gray-300 rounded overflow-hidden">
            <button className="px-2 py-1 bg-white text-gray-400 text-xs border-r border-gray-300">Previous</button>
            <button className="px-3 py-1 bg-blue-600 text-white text-xs font-medium border-r border-gray-300">1</button>
            <button className="px-2 py-1 bg-white text-gray-400 text-xs hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
      
      <div className="text-center text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-4">
        COPYRIGHT © 2017 FRANCISCAN.
      </div>
    </div>
  );
}
