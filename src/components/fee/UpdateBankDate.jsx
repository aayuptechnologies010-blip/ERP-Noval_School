import React from 'react';
import { Eye, Save } from 'lucide-react';

export default function UpdateBankDate() {
  return (
    <div style={{ padding: '20px', background: '#fff', minHeight: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Receipt From Date</label>
          <input type="text" defaultValue="29-Aug-2026" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px' }} />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Receipt To Date</label>
          <input type="text" defaultValue="29-Aug-2026" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px' }} />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Paymode</label>
          <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px' }}>
            <option>All (10)</option>
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Short By</label>
          <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px' }}>
            <option>Receipt No</option>
          </select>
        </div>
        <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#374151', padding: '0 10px' }}>
          Or
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Receipt No.</label>
          <input type="text" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px' }} />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '20%' }}>
        <button style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '4px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
          <Eye size={14} /> Get Details
        </button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px', fontSize: '11px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
            <th style={{ padding: '8px', textAlign: 'center', color: '#374151' }}>
              <input type="checkbox" defaultChecked />
            </th>
            <th style={{ padding: '8px', textAlign: 'left', color: '#374151' }}>Sr. No.</th>
            <th style={{ padding: '8px', textAlign: 'left', color: '#374151' }}>Receipt No.</th>
            <th style={{ padding: '8px', textAlign: 'left', color: '#374151' }}>Receipt Date</th>
            <th style={{ padding: '8px', textAlign: 'left', color: '#374151' }}>Student Name</th>
            <th style={{ padding: '8px', textAlign: 'left', color: '#374151' }}>Admission No.</th>
            <th style={{ padding: '8px', textAlign: 'left', color: '#374151' }}>Paid Amt.</th>
            <th style={{ padding: '8px', textAlign: 'left', color: '#374151' }}>Paymode</th>
            <th style={{ padding: '8px', textAlign: 'left', color: '#374151' }}>Bank Date/Clearing Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="9" style={{ padding: '15px', textAlign: 'center', color: '#6b7280', background: '#f3f4f6' }}>
              No data available in table
            </td>
          </tr>
        </tbody>
      </table>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <button style={{ background: '#4ade80', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '4px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
          <Save size={14} /> Save
        </button>
      </div>

    </div>
  );
}
