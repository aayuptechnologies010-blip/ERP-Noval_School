import React from 'react';
import { 
  FaComments
} from 'react-icons/fa';

export default function WebAdminGuestbook() {
  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#f4f5f7]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-[#1f2937]">Guestbook Management</h1>
        <div className="text-xs text-gray-500 font-medium">
          Home <span className="mx-1">&gt;</span> Website <span className="mx-1">&gt;</span> Guestbook
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="bg-white px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FaComments className="text-gray-800 text-lg" />
            <h2 className="text-sm font-bold text-gray-800">All Guestbook Comments</h2>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <input type="text" placeholder="Search comments..." className="w-64 border border-gray-300 rounded px-3 py-1.5 pl-3 text-xs text-gray-600 outline-none focus:border-blue-500" />
            </div>
            <select className="border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-600 outline-none">
              <option>10</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-[10px] sm:text-xs text-left">
            <thead className="font-semibold text-gray-600 uppercase bg-gray-50/50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-4 text-center w-16">S.NO.</th>
                <th className="px-4 py-4 text-center">NAME</th>
                <th className="px-4 py-4 text-center">EMAIL</th>
                <th className="px-4 py-4 text-center">PROFESSION</th>
                <th className="px-4 py-4 text-center">RATING</th>
                <th className="px-4 py-4 text-center">COMMENTS</th>
                <th className="px-4 py-4 text-center">DATE</th>
                <th className="px-4 py-4 text-center">STATUS</th>
                <th className="px-4 py-4 text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="9" className="px-4 py-8 text-center text-gray-500 text-sm bg-gray-50/20">
                  No guestbook comments found
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
