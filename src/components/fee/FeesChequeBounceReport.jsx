import React from 'react';
import { Eye } from 'lucide-react';

export default function FeesChequeBounceReport() {
  return (
    <div style={{ display: 'flex', height: '100%', background: '#f3f4f6' }}>
      
      {/* Side Panel */}
      <div style={{ width: '250px', background: '#fff', borderRight: '1px solid #e5e7eb', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px', flexShrink: 0, overflowY: 'auto' }}>
        
        <div>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Select School</label>
          <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }}>
            <option>All Schools</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Date From</label>
          <input type="text" defaultValue="29-Aug-2026" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }} />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Date To</label>
          <input type="text" defaultValue="29-Aug-2026" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }} />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Class</label>
          <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }}>
            <option>All Class</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Section</label>
          <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }}>
            <option>All Sections</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Bank Name</label>
          <div style={{ height: '20px' }}></div>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button style={{ flex: 1, background: '#29a9d8', color: '#fff', border: 'none', padding: '8px 10px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <Eye size={14} /> Show
          </button>
        </div>

      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: '20px', position: 'relative' }}>
        {/* Toggle Arrow indicator */}
        <div style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', background: '#f3f4f6', padding: '10px 4px', border: '1px solid #d1d5db', borderLeft: 'none', borderRadius: '0 4px 4px 0', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center' }}>
          <div style={{ width: 0, height: 0, borderTop: '4px solid transparent', borderBottom: '4px solid transparent', borderRight: '6px solid #6b7280' }}></div>
        </div>
        
        <div style={{ background: '#e5e7eb', width: '100%', height: '100%', borderRadius: '4px', border: '1px solid #d1d5db' }}>
        </div>
      </div>

    </div>
  );
}
