import React from 'react';
import { Search, FileText } from 'lucide-react';

export default function AssignConcessionToSingleStudent() {
  return (
    <div style={{ padding: '20px', background: '#fff', minHeight: '100%', display: 'flex', gap: '20px' }}>
      
      {/* Left Panel */}
      <div style={{ width: '250px', background: '#f9fafb', padding: '20px', border: '1px solid #e5e7eb', borderRadius: '4px', display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, height: 'fit-content' }}>
        <div style={{ width: '120px', height: '120px', background: '#e5e7eb', borderRadius: '4px', marginBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', overflow: 'hidden' }}>
          <svg viewBox="0 0 24 24" fill="#9ca3af" style={{ width: '100%', height: '100%', transform: 'translateY(10px)' }}>
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
        <div style={{ width: '100%', fontSize: '12px', color: '#374151', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ fontWeight: 'bold' }}>Name:</div>
          <div style={{ fontWeight: 'bold' }}>Address:</div>
          <div style={{ fontWeight: 'bold' }}>Father's Name:</div>
          <div style={{ fontWeight: 'bold' }}>Admission No.:</div>
          <div style={{ fontWeight: 'bold' }}>Class:</div>
          <div style={{ fontWeight: 'bold' }}>Fees Group:</div>
        </div>
      </div>

      {/* Right Panel */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Search Bar */}
        <div style={{ display: 'flex', gap: '15px', padding: '15px', border: '1px solid #e5e7eb', borderRadius: '4px', background: '#f9fafb', alignItems: 'center' }}>
          <select style={{ padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px', flex: 1 }}>
            <option>All Classes</option>
          </select>
          <select style={{ padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px', flex: 1 }}>
            <option>All Section</option>
          </select>
          <div style={{ display: 'flex', flex: 2 }}>
            <input type="text" style={{ flex: 1, padding: '8px 12px', border: '1px solid #d1d5db', borderRight: 'none', borderRadius: '4px 0 0 4px', outline: 'none', fontSize: '12px' }} />
            <button style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '0 15px', borderRadius: '0 4px 4px 0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Search size={16} />
            </button>
          </div>
        </div>

        {/* Concession Actions */}
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '4px', padding: '20px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 'bold', margin: '0 0 15px 0', color: '#374151' }}>Concession</h4>
          <div style={{ display: 'flex', gap: '15px' }}>
            <select style={{ flex: 1, padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }}>
              <option>None selected</option>
            </select>
            <button style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '4px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <FileText size={14} /> Apply
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
