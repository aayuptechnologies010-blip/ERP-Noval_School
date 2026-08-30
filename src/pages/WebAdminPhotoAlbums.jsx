import React, { useState } from 'react';
import { 
  FaImages, FaPlus, FaCalendarAlt, FaCloudUploadAlt, FaBold, FaItalic, FaStrikethrough, 
  FaUnderline, FaListUl, FaListOl, FaQuoteRight, FaAlignLeft, FaAlignCenter, 
  FaAlignRight, FaAlignJustify, FaLink, FaImage, FaTable, FaEye, FaEdit, FaTrash,
  FaCaretDown, FaCaretUp, FaSearch
} from 'react-icons/fa';

export default function WebAdminPhotoAlbums() {
  const albums = [
    { id: 1, title: 'Annual Sports Game 2024', date: '24-Dec-2024', photos: 13, status: 'Active' },
    { id: 2, title: 'Prize Distribution', date: '24-Dec-2024', photos: 46, status: 'Active' },
    { id: 3, title: 'ANNUAL FUNCTION', date: '20-Apr-2023', photos: 151, status: 'Active' },
    { id: 4, title: 'CHRISTMAS DAY', date: '26-Dec-2022', photos: 29, status: 'Active' }
  ];

  const [status, setStatus] = useState(true);

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#f4f5f7]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-[#1f2937]">Photo Album Management</h1>
        <div className="text-xs text-gray-500 font-medium">
          Home <span className="mx-1">&gt;</span> Website <span className="mx-1">&gt;</span> Gallery <span className="mx-1">&gt;</span> Manage Photo Album
        </div>
      </div>

      {/* Create New Album Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <FaImages className="text-blue-600 text-lg" />
          <h2 className="text-sm font-bold text-gray-800">Create New Album</h2>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Left Column - Form Fields */}
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Album Type <span className="text-red-500">*</span></label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 appearance-none bg-white outline-none focus:border-blue-500">
                        <option>Select Gallery Type</option>
                      </select>
                      <FaCaretDown className="absolute right-3 top-3 text-gray-400" />
                    </div>
                    <button className="w-9 h-9 flex items-center justify-center border border-blue-500 text-blue-500 rounded hover:bg-blue-50 transition font-bold">+</button>
                  </div>
                </div>
                
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Date of Event <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input type="text" placeholder="Select Event Date" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
                    <FaCalendarAlt className="absolute right-3 top-2.5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Album Title <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Enter album title..." className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
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
                  <textarea rows="5" className="w-full p-3 text-sm outline-none resize-y"></textarea>
                </div>
                <p className="text-[10px] text-gray-400 mt-1 mb-4">Use the rich text editor to format your description</p>
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

            {/* Right Column - Cover Photo */}
            <div className="w-full lg:w-1/3">
              <label className="block text-xs font-medium text-gray-700 mb-1">Album Cover Photo</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center h-[280px] bg-white relative">
                <span className="absolute top-3 left-3 bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">COVER</span>
                <FaCloudUploadAlt className="text-gray-600 text-3xl mb-3" />
                <div className="text-sm font-medium text-gray-700">Drag & drop <span className="font-normal">or</span> <span className="text-blue-500 cursor-pointer">browse</span></div>
                <div className="text-[11px] text-gray-400 mt-1">JPG • PNG • JPEG | Max 5MB</div>
              </div>
            </div>

          </div>

          <div className="flex justify-end items-center gap-4 mt-8 pt-4 border-t border-gray-100">
            <button className="text-sm text-gray-500 hover:text-gray-800 font-medium">Reset Form</button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-6 rounded transition">Save</button>
            <button className="bg-[#6db54a] hover:bg-[#5da23c] text-white text-sm font-medium py-2 px-4 rounded transition">Save & Add Photos</button>
          </div>
        </div>
      </div>

      {/* All Photo Albums Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FaImages className="text-green-600 text-lg" />
            <h2 className="text-sm font-bold text-gray-800">All Photo Albums <span className="text-xs font-normal text-gray-500">(4 total)</span></h2>
          </div>
          
          <div className="flex items-center">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
              <div className="relative border-r border-gray-200">
                <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-xs" />
                <input type="text" placeholder="Search albums by title, type, or status..." className="w-64 px-3 py-2 pl-8 text-xs text-gray-600 outline-none" />
              </div>
              <select className="px-3 py-2 text-xs text-gray-600 outline-none bg-gray-50/50 cursor-pointer">
                <option>10 per page</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-b border-gray-100 text-xs font-medium text-gray-600 flex items-center gap-2">
          <FaListUl className="text-green-600" /> Showing 1 to 4 of 4 entries
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[11px] text-gray-600 uppercase bg-gray-50/50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 font-semibold text-center w-16">S.NO.</th>
                <th className="px-4 py-3 font-semibold text-center w-24">COVER</th>
                <th className="px-4 py-3 font-semibold cursor-pointer group">ALBUM TITLE <span className="text-gray-300 text-[10px] ml-1 group-hover:text-gray-500">↕</span></th>
                <th className="px-4 py-3 font-semibold cursor-pointer group">ALBUM TYPE <span className="text-gray-300 text-[10px] ml-1 group-hover:text-gray-500">↕</span></th>
                <th className="px-4 py-3 font-semibold cursor-pointer group">EVENT DATE <span className="text-gray-300 text-[10px] ml-1 group-hover:text-gray-500">↕</span></th>
                <th className="px-4 py-3 font-semibold cursor-pointer group text-center">PHOTOS <span className="text-gray-300 text-[10px] ml-1 group-hover:text-gray-500">↕</span></th>
                <th className="px-4 py-3 font-semibold cursor-pointer group text-center">STATUS <span className="text-gray-300 text-[10px] ml-1 group-hover:text-gray-500">↕</span></th>
                <th className="px-4 py-3 font-semibold text-center">ADD PHOTOS</th>
                <th className="px-4 py-3 font-semibold text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {albums.map((album, index) => (
                <tr key={album.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition">
                  <td className="px-4 py-4 text-center text-gray-600">{index + 1}</td>
                  <td className="px-4 py-4 text-center">
                    <div className="w-12 h-10 border border-gray-200 rounded flex flex-col items-center justify-center bg-gray-50 mx-auto text-[8px] text-gray-400">
                      <FaImage className="text-gray-300 text-lg mb-0.5" />
                      NO IMAGE
                    </div>
                  </td>
                  <td className="px-4 py-4 font-medium text-gray-800">{album.title}</td>
                  <td className="px-4 py-4 text-gray-600">-</td>
                  <td className="px-4 py-4 text-gray-600">{album.date}</td>
                  <td className="px-4 py-4 text-center">
                    <span className="bg-gray-100 text-gray-600 text-[10px] px-2 py-1 rounded border border-gray-200">{album.photos} photos</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded">Active</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button className="w-7 h-7 bg-[#21c55e] text-white rounded flex items-center justify-center mx-auto hover:bg-green-600 transition shadow-sm">
                      <FaPlus className="text-xs" />
                    </button>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <button className="text-blue-500 hover:text-blue-700"><FaEye /></button>
                      <button className="text-indigo-500 hover:text-indigo-700"><FaEdit /></button>
                      <button className="text-red-500 hover:text-red-700"><FaTrash /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 flex items-center justify-between border-t border-gray-100 bg-gray-50/30">
          <div className="text-xs text-gray-500 flex items-center gap-1">
            <FaListUl className="text-blue-500" /> Showing 1 to 4 of 4 entries
          </div>
          <div className="flex border border-gray-300 rounded overflow-hidden">
            <button className="px-3 py-1 bg-white text-gray-500 hover:bg-gray-50 text-xs border-r border-gray-300">&lt;</button>
            <button className="px-3 py-1 bg-blue-600 text-white text-xs font-medium">1</button>
            <button className="px-3 py-1 bg-white text-gray-500 hover:bg-gray-50 text-xs border-l border-gray-300">&gt;</button>
          </div>
        </div>
      </div>
      
      <div className="text-center text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-4">
        COPYRIGHT © 2017 FRANCISCAN.
      </div>
    </div>
  );
}
