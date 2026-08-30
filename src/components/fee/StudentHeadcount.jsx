import React from 'react';
import { FileText, User, Users } from 'lucide-react';
import ProgressBar from './ProgressBar';

const total = 1237;
const boys = 783;
const girls = 454;
const boysPct = Math.round((boys / total) * 100);
const girlsPct = Math.round((girls / total) * 100);

export default function StudentHeadcount() {
  return (
    <div className="bg-white border border-gray-200 shadow-sm h-full flex flex-col">
      {/* Title bar */}
      <div className="flex items-center justify-center gap-2 px-4 py-3 border-b border-gray-200 bg-gray-50">
        <FileText size={13} className="text-red-500 flex-shrink-0" />
        <span className="text-[11px] font-bold text-gray-600 tracking-widest uppercase">
          Student Headcounts
        </span>
      </div>

      <div className="flex flex-col gap-5 px-5 py-5 flex-1">
        {/* Total */}
        <div className="text-center pb-3 border-b border-gray-100">
          <span className="text-sm text-gray-500">Total:&nbsp;</span>
          <span className="text-3xl font-black text-gray-800">{total.toLocaleString('en-IN')}</span>
        </div>

        {/* Boys */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <User size={13} className="text-blue-600" />
              </div>
              <span className="text-xs font-semibold text-gray-600">Boys</span>
            </div>
            <span className="text-xs font-bold text-gray-700 tabular-nums">
              {boys}({boysPct}%)
            </span>
          </div>
          <ProgressBar value={boysPct} color="bg-slate-600" trackColor="bg-gray-200" height="h-3" />
        </div>

        {/* Girls */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                <Users size={13} className="text-pink-500" />
              </div>
              <span className="text-xs font-semibold text-gray-600">Girls</span>
            </div>
            <span className="text-xs font-bold text-gray-700 tabular-nums">
              {girls}({girlsPct}%)
            </span>
          </div>
          <ProgressBar value={girlsPct} color="bg-red-400" trackColor="bg-gray-200" height="h-3" />
        </div>
      </div>
    </div>
  );
}
