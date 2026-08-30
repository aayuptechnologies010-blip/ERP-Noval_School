import React from 'react';
import { Eye, RefreshCcw } from 'lucide-react';

export default function ModifyReceiptDateBank() {
  return (
    <div style={{ padding: '20px', background: '#fff', minHeight: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '200px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Rec. Date</label>
          <input type="text" defaultValue="29-Aug-2026" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }} />
        </div>
        <div style={{ width: '200px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Pay Mode</label>
          <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }}>
            <option>All (10)</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '200px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Fee Type</label>
          <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }}>
            <option>School Fee</option>
          </select>
        </div>
        <div style={{ width: '200px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>School</label>
          <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }}>
            <option>NAVALS NATIONAL ACADEMY</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '200px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Receipt No. from</label>
          <input type="text" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }} />
        </div>
        <div style={{ width: '200px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Receipt No. to</label>
          <input type="text" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Eye size={14} /> Get Details
        </button>
        <button style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <RefreshCcw size={14} /> Update
        </button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#374151', marginBottom: '10px' }}>Student List</div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', minWidth: '1000px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
                <th style={{ padding: '8px', textAlign: 'center', color: '#374151', border: '1px solid #e5e7eb' }}>
                  <input type="checkbox" />
                </th>
                <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Sr. No.</th>
                <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Rec. No.</th>
                <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Student Name</th>
                <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Adm. No.</th>
                <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Entrymode</th>
                <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Paymode</th>
                <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Receipt Date</th>
                <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Paid Amount</th>
                <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Chq/DD/NEFT No./InvoiceNo</th>
                <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Chq/DD Date</th>
                <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Chq/DD Bank</th>
                <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Deposit Bank</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
