import React from 'react';
import { Save } from 'lucide-react';

export default function StudentFeeAdjustment() {
  return (
    <div style={{ padding: '20px', background: '#fff', minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', width: '600px', justifyContent: 'center', marginTop: '20px' }}>
        <select style={{ flex: 1, padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }}>
          <option>Select Class</option>
        </select>
        <select style={{ flex: 1, padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }}>
          <option>Select Section</option>
        </select>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', width: '800px', justifyContent: 'center' }}>
        <select style={{ flex: 1, padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }}>
          <option>School Fee</option>
        </select>
        <select style={{ flex: 1, padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }}>
          <option>Select Installment</option>
        </select>
        <select style={{ flex: 1, padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }}>
          <option>Select Head</option>
        </select>
        <button style={{ background: '#4ade80', color: '#fff', border: 'none', padding: '8px 24px', borderRadius: '4px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
          <Save size={14} /> Save
        </button>
      </div>

      <div style={{ width: '100%' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', border: '1px solid #e5e7eb' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold' }}>Sr. No.</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold' }}>Adm No.</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold' }}>Student Name</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold' }}>Class</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold' }}>Father Name</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold' }}>Contact No.</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold' }}>Amount</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <input type="checkbox" /> Select All
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="8" style={{ height: '50px' }}></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
