import React from 'react';
export default function ManageEnquiry() {
  return (
    <div className="bg-white p-6 mt-4 flex flex-col w-full h-full overflow-y-auto">
      <div className="flex items-center gap-4 mb-6 w-1/2">
        <label className="text-sm font-bold text-gray-700 whitespace-nowrap w-24">Enquiry No.</label>
        <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
        <a href="#" className="text-[#32a3d7] text-sm font-bold whitespace-nowrap hover:underline">Get Last Enquiry No.</a>
      </div>
      <div className="border border-gray-200 rounded shadow-sm mb-6 p-6 grid grid-cols-5 gap-6">
        <div className="flex flex-col gap-1 w-full">
          <label className="text-sm font-bold text-gray-700">Session</label>
          <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
            <option>Select Session</option>
          </select>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label className="text-sm font-bold text-gray-700">Enquiry Date</label>
          <input type="date" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
        </div>
      </div>
    </div>
  );
}