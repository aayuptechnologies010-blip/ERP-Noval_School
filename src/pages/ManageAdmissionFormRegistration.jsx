import React from 'react';
export default function ManageAdmissionFormRegistration() {
  return (
    <div className="bg-white p-6 mt-4 flex flex-col w-full h-full overflow-y-auto">
      <div className="flex gap-2 justify-center mb-6 border-b border-gray-200">
        <button className="bg-[#32a3d7] text-white px-6 py-2 font-bold text-sm">Student Details</button>
        <button className="bg-gray-100 text-gray-700 px-6 py-2 font-bold text-sm hover:bg-gray-200">Parent Details</button>
        <button className="bg-gray-100 text-gray-700 px-6 py-2 font-bold text-sm hover:bg-gray-200">Other Details</button>
        <button className="bg-gray-100 text-gray-700 px-6 py-2 font-bold text-sm hover:bg-gray-200">Guardian Details</button>
      </div>
      <div className="flex items-center justify-between bg-gray-50 p-4 border border-gray-200 rounded mb-6">
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 text-sm text-gray-700"><input type="radio" name="prospectus_type" className="accent-[#32a3d7] w-4 h-4"/> With Prospectus</label>
          <label className="flex items-center gap-2 text-sm text-gray-700"><input type="radio" name="prospectus_type" defaultChecked className="accent-[#32a3d7] w-4 h-4"/> Without Prospectus/Enquiry</label>
          <label className="flex items-center gap-2 text-sm text-gray-700"><input type="checkbox" className="accent-[#32a3d7] w-4 h-4"/> With Enquiry</label>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex">
            <input type="text" placeholder="Search Pros/Enq" className="border border-gray-300 rounded-l px-3 py-1.5 outline-none focus:border-[#32a3d7] text-sm w-48"/>
            <button className="bg-[#32a3d7] text-white px-4 py-1.5 rounded-r text-sm font-bold flex items-center gap-2 hover:bg-[#288ebf]">Search</button>
          </div>
        </div>
      </div>
    </div>
  );
}