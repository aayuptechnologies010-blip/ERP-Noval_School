import React, { useState, useEffect } from 'react';
import { FileText, User, Users } from 'lucide-react';
import ProgressBar from './ProgressBar';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function StudentHeadcount() {
  const [stats, setStats] = useState({ total: 0, boys: 0, girls: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/api/fee-reports/dashboard/student-headcount`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const result = await res.json();
        if (res.ok) {
          setStats(result);
        }
      } catch (error) {
        console.error('Failed to fetch student headcount', error);
      }
    };
    fetchData();
  }, []);

  const total = stats.total || 1; // prevent divide by zero
  const boysPct = Math.round((stats.boys / total) * 100) || 0;
  const girlsPct = Math.round((stats.girls / total) * 100) || 0;

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
          <span className="text-3xl font-black text-gray-800">{stats.total.toLocaleString('en-IN')}</span>
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
              {stats.boys}({boysPct}%)
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
              {stats.girls}({girlsPct}%)
            </span>
          </div>
          <ProgressBar value={girlsPct} color="bg-red-400" trackColor="bg-gray-200" height="h-3" />
        </div>
      </div>
    </div>
  );
}
