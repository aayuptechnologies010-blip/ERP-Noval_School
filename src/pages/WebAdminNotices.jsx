import React, { useState } from 'react';
import { 
  FaBullhorn, FaCalendarAlt, FaCloudUploadAlt, FaBold, FaItalic, FaStrikethrough, 
  FaUnderline, FaListUl, FaListOl, FaQuoteRight, FaAlignLeft, FaAlignCenter, 
  FaAlignRight, FaAlignJustify, FaLink, FaImage, FaCaretDown, FaSearch, FaEye, FaEdit, FaTrash
} from 'react-icons/fa';

export default function WebAdminNotices() {
  const [status, setStatus] = useState(true);
  const [showOnWebsite, setShowOnWebsite] = useState(true);

  const notices = [
    { id: 1, heading: 'EXAMINATION & ADMIT CARD RELATED..', activation: '08-Dec-2024', deactivation: '14-Dec-2024', attachment: 'No File', website: true, status: false, noticeFor: 'NUR A, NUR B, LKG A, LKG B, UKG A, UKG B, 1 A, 1 B, 2 A, 2 B, 3 A, 3 B, 4 A, 4 B, 5 A, 5 B, 6 A, 6 B, 7 A, 7 B, 8 A, 8 B, 10 A' },
    { id: 2, heading: 'Holiday Extended', activation: '03-Jan-2024', deactivation: '-', attachment: 'No File', website: true, status: true, noticeFor: 'School' },
    { id: 3, heading: 'New Year Holiday', activation: '30-Dec-2023', deactivation: '-', attachment: 'No File', website: true, status: false, noticeFor: 'School' },
    { id: 4, heading: 'holiday', activation: '06-Apr-2023', deactivation: '07-Apr-2023', attachment: 'No File', website: true, status: false, noticeFor: 'School' },
    { id: 5, heading: 'School Timing', activation: '01-Dec-2023', deactivation: '-', attachment: 'No File', website: true, status: true, noticeFor: 'School' }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#f4f5f7]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-[#1f2937]">Notice Management</h1>
        <div className="text-xs text-gray-500 font-medium">
          Home <span className="mx-1">&gt;</span> Website <span className="mx-1">&gt;</span> Notice
        </div>
      </div>

      {/* Add Notice Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <FaBullhorn className="text-gray-800 text-sm" />
          <h2 className="text-sm font-bold text-gray-800">Add Notice</h2>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Left Column - Form Fields */}
            <div className="flex-1 flex flex-col gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Heading <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Enter Notice Heading" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
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
                  <textarea rows="7" className="w-full p-3 text-sm outline-none resize-y"></textarea>
                </div>
              </div>
            </div>

            {/* Right Column - Uploads */}
            <div className="w-full lg:w-1/3 flex flex-col gap-6">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Attach PDF File</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-white relative h-[140px]">
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">PDF</span>
                  <FaCloudUploadAlt className="text-gray-600 text-3xl mb-2" />
                  <div className="text-sm font-medium text-gray-700">Drag & drop <span className="font-normal">or</span> <span className="text-blue-500 cursor-pointer">browse</span></div>
                  <div className="text-[11px] text-gray-400 mt-1">PDF Only | Max 5MB</div>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Cover Image</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-white relative h-[140px]">
                  <span className="absolute top-3 left-3 bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">IMAGE</span>
                  <FaCloudUploadAlt className="text-gray-600 text-3xl mb-2" />
                  <div className="text-sm font-medium text-gray-700">Drag & drop <span className="font-normal">or</span> <span className="text-blue-500 cursor-pointer">browse</span></div>
                  <div className="text-[11px] text-gray-400 mt-1">JPG • PNG • GIF | Max 5MB</div>
                </div>
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Activation Date <span className="text-red-500">*</span></label>
              <div className="relative">
                <input type="text" placeholder="Select Activation Date" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
                <FaCalendarAlt className="absolute right-3 top-2.5 text-gray-400" />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Deactivation Date</label>
              <div className="relative flex items-center gap-2">
                <div className="relative flex-1">
                  <input type="text" placeholder="Select End Date (Optional)" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
                  <FaCalendarAlt className="absolute right-3 top-2.5 text-gray-400" />
                </div>
                <div className="flex items-center gap-1 text-[11px] text-gray-600">
                  <input type="checkbox" className="rounded border-gray-300" /> Enable End Date
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-6">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Status</label>
                  <div className="flex items-center gap-2">
                    <div 
                      className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${status ? 'bg-blue-500' : 'bg-gray-300'}`}
                      onClick={() => setStatus(!status)}
                    >
                      <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${status ? 'translate-x-5' : ''}`}></div>
                    </div>
                    {status && <span className="bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Active</span>}
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Show On Website</label>
                  <div className="flex items-center gap-2">
                    <div 
                      className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${showOnWebsite ? 'bg-blue-500' : 'bg-gray-300'}`}
                      onClick={() => setShowOnWebsite(!showOnWebsite)}
                    >
                      <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${showOnWebsite ? 'translate-x-5' : ''}`}></div>
                    </div>
                    {showOnWebsite && <span className="bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Active</span>}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Notice For</label>
              <div className="relative">
                <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 appearance-none bg-white outline-none focus:border-blue-500">
                  <option>School</option>
                </select>
                <FaCaretDown className="absolute right-3 top-3 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="flex justify-end items-center gap-4 mt-8 pt-4">
            <button className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium py-2 px-6 rounded transition">Reset</button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-6 rounded transition">Save</button>
          </div>
        </div>
      </div>

      {/* All Notices Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FaListUl className="text-gray-800 text-lg" />
            <h2 className="text-sm font-bold text-gray-800">All Notices</h2>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <input type="text" placeholder="Search notices..." className="w-64 border border-gray-300 rounded px-3 py-1.5 pl-3 text-xs text-gray-600 outline-none focus:border-blue-500" />
            </div>
            <select className="border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-600 outline-none">
              <option>10</option>
            </select>
          </div>
        </div>
        
        <div className="p-3 border-b border-gray-100 flex justify-end">
          <input type="text" placeholder="Search..." className="border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-600 outline-none w-48" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-[11px] text-left">
            <thead className="text-gray-600 uppercase bg-gray-50/50 border-b border-gray-200">
              <tr>
                <th className="px-3 py-3 font-semibold text-center w-12">S.NO.</th>
                <th className="px-3 py-3 font-semibold">HEADING</th>
                <th className="px-3 py-3 font-semibold text-center group cursor-pointer">ACTIVATION DATE <span className="text-gray-300 ml-1">↕</span></th>
                <th className="px-3 py-3 font-semibold text-center group cursor-pointer">DEACTIVATION DATE <span className="text-gray-300 ml-1">↕</span></th>
                <th className="px-3 py-3 font-semibold text-center">ATTACHMENT</th>
                <th className="px-3 py-3 font-semibold text-center">WEBSITE</th>
                <th className="px-3 py-3 font-semibold text-center group cursor-pointer">STATUS <span className="text-gray-300 ml-1">↕</span></th>
                <th className="px-3 py-3 font-semibold text-center w-48">NOTICE FOR</th>
                <th className="px-3 py-3 font-semibold text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {notices.map((notice, index) => (
                <tr key={notice.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition text-gray-700">
                  <td className="px-3 py-4 text-center">{index + 1}</td>
                  <td className="px-3 py-4 font-medium max-w-[200px] truncate">{notice.heading}</td>
                  <td className="px-3 py-4 text-center">{notice.activation}</td>
                  <td className={`px-3 py-4 text-center ${notice.deactivation !== '-' ? 'text-red-500' : 'text-red-500'}`}>{notice.deactivation}</td>
                  <td className="px-3 py-4 text-center text-gray-500">{notice.attachment}</td>
                  <td className="px-3 py-4 text-center">
                    {notice.website ? <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded font-bold">Yes</span> : <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-bold">No</span>}
                  </td>
                  <td className="px-3 py-4 text-center">
                    {notice.status ? 
                      <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold">Active</span> : 
                      <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded font-bold">Inactive</span>
                    }
                  </td>
                  <td className="px-3 py-4 text-center text-blue-600 font-medium">
                    {notice.noticeFor}
                  </td>
                  <td className="px-3 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
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

        <div className="p-4 flex items-center justify-between border-t border-gray-100 bg-white">
          <div className="text-[11px] text-gray-500">
            Showing 1 to 5 of 5 entries
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
