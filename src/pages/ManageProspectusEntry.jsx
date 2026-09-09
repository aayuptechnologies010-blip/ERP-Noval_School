import React from 'react';
export default function ManageProspectusEntry() {
  return (
    <div className="bg-white p-6 mt-4 flex flex-col w-full h-full overflow-y-auto">
      <h2 className="text-lg font-bold text-gray-700 border-b pb-2 mb-4">Prospectus Entry</h2>
      <div className="flex items-center gap-4">
        <input type="text" placeholder="Enquiry No." className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-64 text-sm" />
        <button className="bg-[#32a3d7] text-white px-4 py-1.5 rounded hover:bg-[#288ebf]">Search</button>
      </div>
    </div>
  );
}