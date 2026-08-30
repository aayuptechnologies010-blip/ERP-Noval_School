import React from 'react';
import { Save } from 'lucide-react';

export default function DefineFeeHeadConcession() {
  return (
    <div style={{ padding: '20px', background: '#fff', minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <div style={{ display: 'flex', gap: '30px', marginBottom: '30px', width: '600px', marginTop: '20px' }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>Concession</label>
          <select style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }}>
            <option>--Select--</option>
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>Installment</label>
          <select style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }}>
            <option>Select All</option>
          </select>
        </div>
      </div>

      <div style={{ width: '100%', maxWidth: '800px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', border: '1px solid #e5e7eb' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ textAlign: 'left', padding: '12px', width: '100px', borderRight: '1px solid #e5e7eb', background: '#f9fafb' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <input type="checkbox" defaultChecked />
                  <span style={{ fontWeight: 'normal', fontSize: '11px', color: '#4b5563' }}>Select All</span>
                </div>
              </th>
              <th style={{ textAlign: 'left', padding: '12px', borderRight: '1px solid #e5e7eb', background: '#f9fafb' }}>Fee Head</th>
              <th style={{ textAlign: 'left', padding: '12px', borderRight: '1px solid #e5e7eb', background: '#f9fafb' }}>Amount</th>
              <th style={{ textAlign: 'left', padding: '12px', background: '#f9fafb' }}>IsPercent</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="4" style={{ height: '50px' }}></td>
            </tr>
          </tbody>
        </table>
      </div>

      <button style={{ marginTop: '40px', background: '#4ade80', color: '#fff', border: 'none', padding: '8px 24px', borderRadius: '4px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
        <Save size={16} /> Save
      </button>

    </div>
  );
}
