import React from 'react';
import { Search, RefreshCw, XCircle, Eye } from 'lucide-react';

export default function ManageStudentExpenses() {
  return (
    <div style={{ padding: '20px', background: '#fff', minHeight: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <select style={{ width: '150px', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px' }}>
          <option>2026-2027</option>
        </select>
        <select style={{ width: '150px', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px' }}>
          <option>All Classes</option>
        </select>
        <select style={{ width: '150px', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px' }}>
          <option>All Section</option>
        </select>
        <div style={{ display: 'flex', width: '300px' }}>
          <input type="text" style={{ flex: 1, padding: '8px 12px', border: '1px solid #d1d5db', borderRight: 'none', borderRadius: '4px 0 0 4px', outline: 'none', fontSize: '12px' }} />
          <button style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '0 15px', borderRadius: '0 4px 4px 0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Search size={16} />
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '15px' }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Amount</label>
          <input type="text" defaultValue="0" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px' }} />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Date</label>
          <input type="text" defaultValue="29-Aug-2026" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px' }} />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Expense Head</label>
          <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px' }}>
            <option>All Expense Head</option>
          </select>
        </div>
        <div style={{ flex: 2 }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Remarks</label>
          <input type="text" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px' }} />
        </div>
      </div>

      <div>
        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#374151' }}>
          <input type="checkbox" /> Add Fee To Collect
        </label>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
        <button style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '4px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
          <RefreshCw size={14} /> Update
        </button>
        <button style={{ background: '#f59e0b', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '4px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
          <XCircle size={14} /> Reset
        </button>
        <button style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '4px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
          <Eye size={14} /> View Deleted Records
        </button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px', fontSize: '11px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <th style={{ padding: '8px', textAlign: 'left', color: '#374151' }}>Sno</th>
            <th style={{ padding: '8px', textAlign: 'left', color: '#374151' }}>Select</th>
            <th style={{ padding: '8px', textAlign: 'left', color: '#374151' }}>Adm. No.</th>
            <th style={{ padding: '8px', textAlign: 'left', color: '#374151' }}>Name</th>
            <th style={{ padding: '8px', textAlign: 'left', color: '#374151' }}>Father Name</th>
            <th style={{ padding: '8px', textAlign: 'left', color: '#374151' }}>Total</th>
            <th style={{ padding: '8px', textAlign: 'left', color: '#374151' }}>Current Balance</th>
            <th style={{ padding: '8px', textAlign: 'left', color: '#374151' }}>Total Expense</th>
            <th style={{ padding: '8px', textAlign: 'left', color: '#374151' }}>EXPAND</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>

      <div style={{ display: 'flex', gap: '30px', fontSize: '11px', fontWeight: 'bold', color: '#374151', padding: '10px 0' }}>
        <div>Total Amount:</div>
        <div>Total Current Balance:</div>
        <div>Total Expense:</div>
      </div>

    </div>
  );
}
