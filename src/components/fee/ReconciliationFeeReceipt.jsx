import React from 'react';
import { Eye, Save } from 'lucide-react';

export default function ReconciliationFeeReceipt() {
  return (
    <div style={{ padding: '20px', background: '#fff', minHeight: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '200px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Receipt From Date</label>
          <input type="text" defaultValue="29-Aug-2026" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }} />
        </div>
        <div style={{ width: '200px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Receipt to Date</label>
          <input type="text" defaultValue="29-Aug-2026" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '150px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Paymode</label>
          <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }}>
            <option>All (10)</option>
          </select>
        </div>
        <div style={{ width: '150px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Fee Type</label>
          <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }}>
            <option>School Fee</option>
          </select>
        </div>
        <div style={{ width: '150px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>School</label>
          <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }}>
            <option>All Schools</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Eye size={14} /> Get Details
        </button>
        <button style={{ background: '#4ade80', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Save size={14} /> Save
        </button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', marginTop: '10px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
            <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Select</th>
            <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Sr. No.</th>
            <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Receipt No.</th>
            <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Rec. Date</th>
            <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Student Name</th>
            <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Admission No.</th>
            <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Amount</th>
            <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Paymode</th>
            <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>BankName</th>
            <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Cheque/DD No./Ref No.</th>
            <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Bank Name</th>
            <th style={{ padding: '8px', textAlign: 'center', color: '#374151', border: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                <input type="checkbox" /> Reconcile
              </div>
            </th>
            <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Remark</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>

    </div>
  );
}
