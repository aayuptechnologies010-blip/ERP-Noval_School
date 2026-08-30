import React from 'react';
import { Search, Send } from 'lucide-react';

export default function ManualSettlement() {
  return (
    <div style={{ padding: '20px', background: '#fff', minHeight: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-end', justifyContent: 'center' }}>
        <div style={{ width: '150px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Start Date</label>
          <input type="text" defaultValue="29-Aug-2026" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }} />
        </div>
        <div style={{ width: '150px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>End Date</label>
          <input type="text" defaultValue="29-Aug-2026" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }} />
        </div>
        <div style={{ width: '150px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Account</label>
          <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }}>
            <option></option>
          </select>
        </div>
        <div>
          <button style={{ background: '#fff', color: '#29a9d8', border: '1px solid #29a9d8', padding: '8px 20px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', height: '33px' }}>
            <Search size={14} /> Search
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-end', justifyContent: 'center' }}>
        <div style={{ width: '150px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Settlement Date</label>
          <input type="text" defaultValue="29-Aug-2026" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }} />
        </div>
        <div style={{ width: '150px' }}>
          <button style={{ background: '#fff', color: '#3b82f6', border: '1px solid #3b82f6', padding: '8px 20px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', height: '33px', width: '100%', justifyContent: 'center' }}>
            <Send size={14} /> Save Settlement Date
          </button>
        </div>
        <div style={{ width: '70px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151', textAlign: 'center' }}>admno</label>
          <input type="text" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }} />
        </div>
        <div style={{ width: '110px' }}></div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#dc2626' }}>
          Total - Rs. 0.00
        </div>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', marginTop: '5px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
            <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Sr. No.</th>
            <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Date & Time</th>
            <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Student Name</th>
            <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Adm. No.</th>
            <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Class</th>
            <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Contact No.</th>
            <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Trans. ID</th>
            <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Settlement Date</th>
            <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Status</th>
            <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Amount</th>
            <th style={{ padding: '8px', textAlign: 'center', color: '#374151', border: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                <input type="checkbox" /> Select All
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>

    </div>
  );
}
