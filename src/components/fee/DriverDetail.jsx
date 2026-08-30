import React from 'react';
import { Eye } from 'lucide-react';

export default function DriverDetail() {
  return (
    <div style={{ display: 'flex', height: '100%', background: '#f3f4f6' }}>
      
      {/* Side Panel */}
      <div style={{ width: '250px', background: '#fff', borderRight: '1px solid #e5e7eb', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px', flexShrink: 0 }}>
        
        <div>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Driver</label>
          <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }}>
            <option>JANGALI YADAV</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Class</label>
          <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }}>
            <option>All Classes</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Section</label>
          <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }}>
            <option>All Sections</option>
          </select>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <button style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '8px 25px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Eye size={14} /> Show
          </button>
        </div>

      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: '20px' }}>
        <div style={{ background: '#e5e7eb', width: '100%', height: '100%', borderRadius: '4px', border: '1px solid #d1d5db' }}>
          {/* Empty gray area as per screenshot */}
        </div>
      </div>

    </div>
  );
}
