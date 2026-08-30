import React from 'react';
import { Save } from 'lucide-react';

export default function AssignOpeningBalance() {
  return (
    <div style={{ padding: '20px', background: '#fff', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', justifyContent: 'center', marginTop: '20px' }}>
        <select style={{ width: '200px', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }}>
          <option>Select Class</option>
        </select>
        <select style={{ width: '200px', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }}>
          <option>Select Section</option>
        </select>
        <select style={{ width: '200px', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }}>
          <option>School Fee</option>
        </select>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', padding: '0 50px' }}>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '4px', fontSize: '13px', cursor: 'pointer' }}>
            Export From Excel
          </button>
          <button style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '4px', fontSize: '13px', cursor: 'pointer' }}>
            Download Excel Formate
          </button>
        </div>
        <button style={{ background: '#4ade80', color: '#fff', border: 'none', padding: '8px 30px', borderRadius: '4px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
          <Save size={14} /> Save
        </button>
      </div>

      <h4 style={{ fontSize: '14px', fontWeight: 'bold', margin: '0 0 15px 0', color: '#374151', paddingLeft: '50px' }}>Student List</h4>

      <div style={{ padding: '0 50px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', border: '1px solid #e5e7eb' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold' }}>Sr. No.</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold' }}>Adm No.</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold' }}>Student Name</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold' }}>Class</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold' }}>Father Name</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold' }}>Contact No.</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold' }}>Opening Balance</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold' }}>Opening Dues</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <input type="checkbox" /> Select All
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="9" style={{ height: '50px' }}></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
