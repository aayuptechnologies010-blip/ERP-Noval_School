import React from 'react';
import { Search, Save, Eye, RotateCcw } from 'lucide-react';

export default function ChequeEntry() {
  return (
    <div style={{ padding: '20px', background: '#f3f4f6', minHeight: '100%' }}>
      
      <div style={{ display: 'flex', gap: '20px', background: '#fff', padding: '20px', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
        
        {/* Left Panel */}
        <div style={{ width: '250px', flexShrink: 0, borderRight: '1px solid #e5e7eb', paddingRight: '20px' }}>
          <div style={{ width: '120px', height: '120px', background: '#e5e7eb', margin: '0 auto 20px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="80" height="80" viewBox="0 0 24 24" fill="#9ca3af">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '11px', color: '#374151' }}>
            <div style={{ fontWeight: 'bold' }}>Name:</div>
            <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '15px', fontWeight: 'bold' }}>Address:</div>
            <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '15px', fontWeight: 'bold' }}>Father's Name:</div>
            <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '15px', fontWeight: 'bold' }}>Admission No.:</div>
            <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '15px', fontWeight: 'bold' }}>Class:</div>
            <div style={{ fontWeight: 'bold' }}>Fees Group:</div>
          </div>
        </div>

        {/* Right Panel */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Top Search Bar */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <select style={{ padding: '6px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none', width: '150px' }}>
              <option>All Classes</option>
            </select>
            <select style={{ padding: '6px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none', width: '150px' }}>
              <option>All Section</option>
            </select>
            <div style={{ display: 'flex', flex: 1 }}>
              <input type="text" style={{ flex: 1, padding: '6px 10px', border: '1px solid #d1d5db', borderRadius: '4px 0 0 4px', fontSize: '12px', outline: 'none' }} />
              <button style={{ background: '#29a9d8', border: 'none', padding: '0 15px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Search size={14} color="#fff" />
              </button>
            </div>
            <button style={{ background: '#fff', color: '#f59e0b', border: '1px solid #f59e0b', padding: '0 15px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <RotateCcw size={14} /> Reset
            </button>
          </div>

          {/* Form Fields */}
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '150px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Cheque Entry Date</label>
              <input type="text" defaultValue="29-Aug-2026" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }} />
            </div>
            <div style={{ flex: 1, minWidth: '150px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Cheque No</label>
              <input type="text" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }} />
            </div>
            <div style={{ flex: 1, minWidth: '150px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Cheque Date</label>
              <input type="text" defaultValue="29-Aug-2026" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }} />
            </div>
            <div style={{ flex: 1, minWidth: '150px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Cheque Bank</label>
              <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }}>
                <option>Select Bank</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div style={{ flex: 1, minWidth: '150px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Branch</label>
              <input type="text" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }} />
            </div>
            <div style={{ flex: 1, minWidth: '150px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Cheque Amount</label>
              <input type="text" defaultValue="0.00" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }} />
            </div>
            <div style={{ flex: 2, display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button style={{ background: '#fff', color: '#4ade80', border: '1px solid #4ade80', padding: '8px 15px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Save size={14} /> Save
              </button>
              <button style={{ background: '#fff', color: '#29a9d8', border: '1px solid #29a9d8', padding: '8px 15px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Eye size={14} /> View
              </button>
              <button style={{ background: '#fff', color: '#f59e0b', border: '1px solid #f59e0b', padding: '8px 15px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <RotateCcw size={14} /> Reset
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
