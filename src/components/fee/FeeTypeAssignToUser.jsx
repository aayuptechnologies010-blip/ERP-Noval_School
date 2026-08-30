import React from 'react';
import { RefreshCw } from 'lucide-react';

export default function FeeTypeAssignToUser() {
  return (
    <div style={{ padding: '40px', background: '#fff', minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <div style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
        
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>User Name</label>
          <select style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }}>
            <option>Please Select</option>
          </select>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #e5e7eb', fontSize: '12px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
              <th style={{ padding: '10px', textAlign: 'left', color: '#374151', width: '60px' }}>S.No</th>
              <th style={{ padding: '10px', textAlign: 'left', color: '#374151', width: '80px' }}>Select</th>
              <th style={{ padding: '10px', textAlign: 'left', color: '#374151' }}>Type</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ background: '#f0f9ff' }}>
              <td style={{ padding: '10px', borderBottom: '1px solid #e5e7eb', color: '#374151' }}>1</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #e5e7eb' }}><input type="checkbox" /></td>
              <td style={{ padding: '10px', borderBottom: '1px solid #e5e7eb', color: '#374151' }}>School Fee</td>
            </tr>
          </tbody>
        </table>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <button style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '8px 24px', borderRadius: '4px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <RefreshCw size={14} /> Update
          </button>
        </div>

      </div>

    </div>
  );
}
