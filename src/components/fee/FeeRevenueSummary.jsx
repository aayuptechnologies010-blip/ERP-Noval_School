import React from 'react';
import { FileText, Hourglass, Briefcase } from 'lucide-react';
import ProgressBar from './ProgressBar';

const fmt = (n) =>
  '₹ ' + n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const rows = [
  {
    Icon: Hourglass,
    iconCls: 'text-red-500',
    bgCls: 'bg-red-50',
    label: 'Outstanding Revenue',
    amount: 30506917,
    pct: 71,
    barColor: 'bg-red-400',
  },
  {
    Icon: Hourglass,
    iconCls: 'text-blue-500',
    bgCls: 'bg-blue-50',
    label: 'Concession',
    amount: 0,
    pct: 0,
    barColor: 'bg-blue-400',
  },
  {
    Icon: Briefcase,
    iconCls: 'text-green-600',
    bgCls: 'bg-green-50',
    label: 'Total Received (YTD)',
    amount: 13981117,
    pct: 29,
    barColor: 'bg-green-500',
  },
];

export default function FeeRevenueSummary() {
  return (
    <div className="bg-white border border-gray-200 shadow-sm h-full flex flex-col">
      {/* Title bar */}
      <div className="flex items-center justify-center gap-2 px-4 py-3 border-b border-gray-200 bg-gray-50">
        <FileText size={13} className="text-red-500 flex-shrink-0" />
        <span className="text-[11px] font-bold text-gray-600 tracking-widest uppercase">
          Fee Revenue Summary (2026-2027)
        </span>
      </div>

      <div className="flex flex-col gap-5 px-6 py-5 flex-1">
        {/* Grand total */}
        <div className="text-center pb-3 border-b border-gray-100">
          <span className="text-sm text-gray-500">Total:&nbsp;</span>
          <span className="text-2xl font-black text-gray-800">₹ 4,80,00,522.00</span>
        </div>

        {/* Revenue rows */}
        <div className="flex flex-col gap-4 flex-1 justify-around">
          {rows.map(({ Icon, iconCls, bgCls, label, amount, pct, barColor }) => (
            <div key={label} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <div className={`w-6 h-6 rounded-full ${bgCls} flex items-center justify-center flex-shrink-0`}>
                    <Icon size={12} className={iconCls} />
                  </div>
                  <span className="text-xs font-semibold text-gray-600 truncate">{label}</span>
                </div>
                <span className="text-xs font-bold text-gray-700 whitespace-nowrap tabular-nums flex-shrink-0">
                  {fmt(amount)}({pct}.00%)
                </span>
              </div>
              <ProgressBar value={pct} color={barColor} trackColor="bg-gray-200" height="h-3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
