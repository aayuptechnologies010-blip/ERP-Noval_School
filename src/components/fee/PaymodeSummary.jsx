import React, { useState } from 'react';
import {
  Banknote, FileCheck, FileText, Landmark,
  Globe, CreditCard, Smartphone, CircleDollarSign, Calendar,
} from 'lucide-react';

const methods = [
  { label: 'Cash',         Icon: Banknote,          iconCls: 'text-blue-600',   bgCls: 'bg-blue-50'   },
  { label: 'Cheque',       Icon: FileCheck,          iconCls: 'text-green-600',  bgCls: 'bg-green-50'  },
  { label: 'DD',           Icon: FileText,           iconCls: 'text-red-600',    bgCls: 'bg-red-50'    },
  { label: 'NEFT',         Icon: Landmark,           iconCls: 'text-orange-600', bgCls: 'bg-orange-50' },
  { label: 'Online',       Icon: Globe,              iconCls: 'text-slate-600',  bgCls: 'bg-slate-100' },
  { label: 'Swiped Card',  Icon: CreditCard,         iconCls: 'text-blue-700',   bgCls: 'bg-blue-50'   },
  { label: 'UPI',          Icon: Smartphone,         iconCls: 'text-indigo-600', bgCls: 'bg-indigo-50' },
  { label: 'Total Amount', Icon: CircleDollarSign,   iconCls: 'text-blue-800',   bgCls: 'bg-blue-100'  },
];

export default function PaymodeSummary() {
  const [date, setDate] = useState('2026-08-28');
  const [y, m, d] = date.split('-');
  const display = `${d}-${m}-${y}`;

  return (
    <div className="bg-white border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-gray-50">
        <span className="text-[11px] font-bold text-gray-600 tracking-widest uppercase">
          Today's Paymode Summary
        </span>
        <label className="flex items-center gap-1.5 bg-white border border-gray-300 rounded px-2.5 py-1 cursor-pointer hover:bg-gray-50 transition relative">
          <Calendar size={12} className="text-blue-500" />
          <span className="text-xs font-semibold text-gray-700">{display}</span>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer w-full"
          />
        </label>
      </div>

      {/* Payment methods — 8 columns in 2 rows of 4 */}
      <div className="grid grid-cols-4 divide-x divide-gray-200">
        {methods.slice(0, 4).map(({ label, Icon, iconCls, bgCls }) => (
          <div key={label} className="flex flex-col items-center gap-2 py-4 px-3">
            <div className={`w-9 h-9 rounded-full ${bgCls} flex items-center justify-center`}>
              <Icon size={16} className={iconCls} />
            </div>
            <span className="text-[11px] font-bold text-gray-700 text-center leading-tight">{label}</span>
            <span className="text-xs font-semibold text-gray-500 tabular-nums">₹ 0.00</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4 divide-x divide-gray-200 border-t border-gray-200">
        {methods.slice(4).map(({ label, Icon, iconCls, bgCls }) => (
          <div key={label} className="flex flex-col items-center gap-2 py-4 px-3">
            <div className={`w-9 h-9 rounded-full ${bgCls} flex items-center justify-center`}>
              <Icon size={16} className={iconCls} />
            </div>
            <span className="text-[11px] font-bold text-gray-700 text-center leading-tight">{label}</span>
            <span className="text-xs font-semibold text-gray-500 tabular-nums">₹ 0.00</span>
          </div>
        ))}
      </div>
    </div>
  );
}
