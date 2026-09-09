import React from 'react';
export default function ManageEnquiryFollowUp() {
  return (
    <div className="bg-white p-6 mt-4 flex flex-col w-full h-full overflow-y-auto">
      <div className="flex flex-col gap-4 mb-6">
        <h2 className="text-lg font-bold text-gray-700 border-b pb-2">Enquiry FollowUp</h2>
        <div className="flex gap-6 items-center">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700"><input type="radio" name="followup_type" className="w-4 h-4 accent-[#32a3d7]"/>Enquiry Date wise</label>
          <div className="flex flex-col gap-1 w-64">
            <label className="text-sm font-bold text-gray-700">Enquiry Date</label>
            <input type="date" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
          </div>
        </div>
        <table className="w-full border mt-4 text-sm text-left">
          <thead className="bg-[#32a3d7] text-white">
            <tr>
              <th className="px-2 py-2 border-r border-[#32a3d7]">Enquiry No.</th>
              <th className="px-2 py-2 border-r border-[#32a3d7]">Enquiry Type</th>
              <th className="px-2 py-2 border-r border-[#32a3d7]">Enquiry Status</th>
            </tr>
          </thead>
          <tbody>
            <tr><td colSpan="3" className="px-2 py-4 text-center text-gray-500">No records found.</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}