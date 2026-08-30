import React from 'react';
import { Eye, Save } from 'lucide-react';

export default function FeeChequeClearing() {
  return (
    <div style={{ padding: '20px', background: '#fff', minHeight: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#374151', borderBottom: '1px solid #e5e7eb', paddingBottom: '20px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><input type="radio" name="chequeSearch" defaultChecked /> Receipt Date</label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><input type="radio" name="chequeSearch" /> Cheque Date</label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><input type="radio" name="chequeSearch" /> Cheque No.</label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><input type="radio" name="chequeSearch" /> Deposit Bank</label>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '30px' }}>
        <div style={{ width: '250px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Receipt From Date</label>
          <input type="text" defaultValue="29-Aug-2026" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px' }} />
        </div>
        <div style={{ width: '250px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Receipt To Date</label>
          <input type="text" defaultValue="29-Aug-2026" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px' }} />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '30px' }}>
        <div style={{ width: '150px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Cheque Status</label>
          <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px' }}>
            <option>Both</option>
          </select>
        </div>
        <div style={{ width: '150px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Clearing Date</label>
          <input type="text" defaultValue="29-Aug-2026" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px' }} />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
        <button style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '4px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
          <Eye size={14} /> Get Details
        </button>
        <button style={{ background: '#4ade80', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '4px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
          <Save size={14} /> Save
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
        <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#374151' }}>Total Cleared Amount: 0.00</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ fontSize: '12px', color: '#374151' }}>Search:</label>
          <input type="text" style={{ padding: '6px 10px', border: '1px solid #d1d5db', borderRadius: '15px', outline: 'none', fontSize: '12px', width: '200px' }} />
        </div>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px', fontSize: '11px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
            <th style={{ padding: '10px 8px', textAlign: 'left', color: '#374151' }}>Sr. No.</th>
            <th style={{ padding: '10px 8px', textAlign: 'left', color: '#374151' }}>Receipt No.</th>
            <th style={{ padding: '10px 8px', textAlign: 'left', color: '#374151' }}>Receipt Date</th>
            <th style={{ padding: '10px 8px', textAlign: 'left', color: '#374151' }}>Student Name</th>
            <th style={{ padding: '10px 8px', textAlign: 'left', color: '#374151' }}>Admission No.</th>
            <th style={{ padding: '10px 8px', textAlign: 'left', color: '#374151' }}>Class</th>
            <th style={{ padding: '10px 8px', textAlign: 'left', color: '#374151' }}>Paid Amt.</th>
            <th style={{ padding: '10px 8px', textAlign: 'left', color: '#374151' }}>Cheque Date</th>
            <th style={{ padding: '10px 8px', textAlign: 'left', color: '#374151' }}>Cheque No.</th>
            <th style={{ padding: '10px 8px', textAlign: 'left', color: '#374151' }}>Clearing Date</th>
            <th style={{ padding: '10px 8px', textAlign: 'center', color: '#374151' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <input type="checkbox" />
                <span>Cheque Clear Status</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="11" style={{ padding: '15px', textAlign: 'center', color: '#6b7280', background: '#f3f4f6' }}>
              No data available in table
            </td>
          </tr>
        </tbody>
      </table>

      <div style={{ fontSize: '11px', color: '#6b7280', padding: '10px 0' }}>
        Showing 0 to 0 of 0 entries
      </div>

    </div>
  );
}
