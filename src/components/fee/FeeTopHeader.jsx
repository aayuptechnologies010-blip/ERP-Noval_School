import React, { useState } from 'react';
import { HelpCircle, Info, Settings, ChevronDown, GraduationCap, Wrench } from 'lucide-react';
import SelectDropdown from './SelectDropdown';

export default function FeeTopHeader() {
  const [academicYear, setAcademicYear] = useState('2026-2027');
  const [financialYear, setFinancialYear] = useState('2026-2027');
  const [userOpen, setUserOpen] = useState(false);
  const years = ['2024-2025', '2025-2026', '2026-2027'];

  return (
    <div
      className="flex items-center justify-between px-4 py-0 flex-shrink-0 relative"
      style={{ background: 'linear-gradient(90deg, #2c6fad 0%, #3a8fc5 60%, #4ba8d4 100%)', minHeight: '52px' }}
    >
      {/* Left */}
      <div className="flex items-center gap-0 h-full">
        {/* Fees Icon Block */}
        <div className="flex items-center gap-2 pr-4 border-r border-white/25 h-full py-3">
          <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center">
            <GraduationCap size={18} className="text-white" />
          </div>
          <span className="text-white font-bold text-base tracking-wide">Fees</span>
        </div>

        {/* Academic Year */}
        <div className="flex items-center gap-2 px-4 border-r border-white/25 h-full py-3">
          <span className="text-white/80 text-xs">Academic Year:</span>
          <SelectDropdown
            value={academicYear}
            options={years}
            onChange={setAcademicYear}
            variant="blue"
          />
        </div>

        {/* Financial Year */}
        <div className="flex items-center gap-2 px-4 border-r border-white/25 h-full py-3">
          <span className="text-white/80 text-xs">Financial Year:</span>
          <SelectDropdown
            value={financialYear}
            options={years}
            onChange={setFinancialYear}
            variant="blue"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <a href="https://franciscanecare.zohodesk.com/portal/en/signin" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition p-1" title="Help">
          <HelpCircle size={17} />
        </a>
        <a href="https://franciscanwebsolutions.com/manuals/" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition p-1" title="Info">
          <Info size={17} />
        </a>
        <button className="text-white/80 hover:text-white transition p-1" title="Settings">
          <Settings size={17} />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-white/25 mx-1" />

        {/* User */}
        <div className="relative">
          <button
            onClick={() => setUserOpen(!userOpen)}
            className="flex items-center gap-1.5 text-white hover:text-white/80 transition"
          >
            <div className="w-7 h-7 rounded-full bg-white/25 flex items-center justify-center text-xs font-bold">AK</div>
            <span className="text-xs font-bold tracking-wide">ANKIT KUMAR</span>
            <ChevronDown size={13} />
          </button>
          {userOpen && (
            <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded shadow-xl border border-gray-100 z-50 py-1">
              {['My Profile', 'Change Password', 'Logout'].map(item => (
                <button key={item} className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 transition">
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Customize */}
        <button className="flex items-center gap-1 bg-white/15 hover:bg-white/25 border border-white/30 text-white text-xs px-2.5 py-1.5 rounded transition ml-1">
          <Wrench size={11} />
          <span>Customize</span>
        </button>
      </div>
    </div>
  );
}
