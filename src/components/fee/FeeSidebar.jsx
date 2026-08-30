import React, { useState } from 'react';
import {
  Menu, Search, Settings, ChevronDown, ChevronRight,
  Landmark, FileText, Wallet, CreditCard, Bus, BarChart2, ClipboardList
} from 'lucide-react';

const navItems = [
  { label: 'Define Bank', icon: Landmark },
  { label: 'Session Transfer', icon: FileText },
  { label: 'Master Settings', icon: Settings },
  { label: 'Fee Master', icon: Wallet },
  { label: 'Manage Fee', icon: CreditCard },
  { label: 'Transport', icon: Bus },
  { label: 'Transaction Report', icon: BarChart2 },
  { label: 'Reports', icon: ClipboardList },
];

export default function FeeSidebar({ collapsed, onToggle }) {
  const [active, setActive] = useState('Manage Fee');
  const [search, setSearch] = useState('');

  const filtered = navItems.filter(i => i.label.toLowerCase().includes(search.toLowerCase()));

  return (
    <div
      className={`flex flex-col h-full bg-[#1e3a5f] text-white flex-shrink-0 transition-all duration-300 ${collapsed ? 'w-14' : 'w-[220px]'}`}
    >
      {/* Top */}
      <div className="flex items-center gap-2 px-3 py-3 border-b border-white/10">
        <button onClick={onToggle} className="p-1 hover:bg-white/10 rounded transition">
          <Menu size={18} />
        </button>
        {!collapsed && <span className="text-sm font-semibold tracking-wide">Navigation</span>}
      </div>

      {/* Search */}
      {!collapsed && (
        <div className="px-3 py-2">
          <div className="flex items-center gap-2 bg-white/10 rounded px-2 py-1.5">
            <Search size={13} className="text-white/60 flex-shrink-0" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search Menu"
              className="bg-transparent text-xs text-white placeholder-white/50 outline-none w-full"
            />
          </div>
        </div>
      )}

      {/* Global Masters Category */}
      <div className={`mx-2 mb-1 rounded ${collapsed ? 'px-1 py-2' : 'px-2 py-2'} bg-gradient-to-r from-[#2c6fad] to-[#3a82c4] flex items-center justify-between cursor-pointer`}>
        <div className="flex items-center gap-2">
          <Settings size={14} className="flex-shrink-0" />
          {!collapsed && <span className="text-xs font-bold tracking-wide">Global Masters</span>}
        </div>
        {!collapsed && <ChevronDown size={13} />}
      </div>

      {/* Nav Items */}
      <div className="flex-1 overflow-y-auto py-1">
        {filtered.map(({ label, icon: Icon }) => (
          <button
            key={label}
            onClick={() => setActive(label)}
            title={collapsed ? label : undefined}
            className={`w-full flex items-center gap-2.5 px-3 py-2 text-left transition-all
              ${active === label
                ? 'bg-[#2c6fad] text-white'
                : 'text-white/75 hover:bg-white/10 hover:text-white'}
              ${collapsed ? 'justify-center' : ''}`}
          >
            <Icon size={14} className="flex-shrink-0" />
            {!collapsed && (
              <span className="text-xs font-medium flex-1">{label}</span>
            )}
            {!collapsed && <ChevronRight size={11} className="text-white/40" />}
          </button>
        ))}
      </div>
    </div>
  );
}
