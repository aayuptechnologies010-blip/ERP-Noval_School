import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export default function SelectDropdown({ value, options, onChange, className = '', variant = 'default' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const base = variant === 'blue'
    ? 'bg-white/20 border border-white/30 text-white text-xs rounded px-2 py-1'
    : 'bg-white border border-gray-300 text-gray-700 text-xs rounded px-2 py-1';

  return (
    <div className={`relative inline-block ${className}`} ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 ${base} hover:bg-white/30 transition`}
      >
        <span>{value}</span>
        <ChevronDown size={12} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-50 min-w-full">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className={`px-3 py-1.5 text-xs text-gray-700 hover:bg-blue-50 cursor-pointer whitespace-nowrap ${opt === value ? 'bg-blue-50 font-semibold' : ''}`}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
