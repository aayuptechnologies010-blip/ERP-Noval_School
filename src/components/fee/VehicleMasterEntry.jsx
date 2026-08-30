import React from 'react';
import { Save } from 'lucide-react';

export default function VehicleMasterEntry() {
  return (
    <div style={{ padding: '20px', background: '#fff', minHeight: '100%' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '30px' }}>
        
        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div style={{ width: '200px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Vehicle Name</label>
            <input type="text" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }} />
          </div>
          <div style={{ width: '200px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Vehicle No.</label>
            <input type="text" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }} />
          </div>
          <button style={{ background: '#4ade80', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', height: '33px' }}>
            <Save size={14} /> Save
          </button>
        </div>

        <div style={{ border: '1px solid #e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ padding: '10px', textAlign: 'left', color: '#374151', borderRight: '1px solid #e5e7eb', width: '80px' }}>Sr No.</th>
                <th style={{ padding: '10px', textAlign: 'left', color: '#374151', borderRight: '1px solid #e5e7eb' }}>Vehicle Name</th>
                <th style={{ padding: '10px', textAlign: 'left', color: '#374151', borderRight: '1px solid #e5e7eb' }}>Vehicle No.</th>
                <th style={{ padding: '10px', textAlign: 'center', color: '#374151', width: '100px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="4" style={{ padding: '20px', textAlign: 'center', color: '#9ca3af' }}></td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
