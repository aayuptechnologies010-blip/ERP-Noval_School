import React from 'react';
import { Save, Eye, Printer, XCircle } from 'lucide-react';

export default function DefineExpenseHead() {
  return (
    <div style={{ padding: '40px', background: '#fff', minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <div style={{ width: '100%', maxWidth: '800px', marginBottom: '30px', marginTop: '20px' }}>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>Define Expense Head</label>
        <input type="text" style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }} />
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
        <button style={{ background: '#fff', color: '#4ade80', border: '1px solid #4ade80', padding: '6px 16px', borderRadius: '4px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
          <Save size={14} /> Save
        </button>
        <button style={{ background: '#fff', color: '#3b82f6', border: '1px solid #3b82f6', padding: '6px 16px', borderRadius: '4px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
          <Eye size={14} /> View
        </button>
        <button style={{ background: '#fff', color: '#3b82f6', border: '1px solid #3b82f6', padding: '6px 16px', borderRadius: '4px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
          <Printer size={14} /> Print
        </button>
        <button style={{ background: '#fff', color: '#f59e0b', border: '1px solid #f59e0b', padding: '6px 16px', borderRadius: '4px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
          <XCircle size={14} /> Reset
        </button>
      </div>

    </div>
  );
}
