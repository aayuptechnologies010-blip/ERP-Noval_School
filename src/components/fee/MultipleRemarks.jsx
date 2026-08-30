import React from 'react';
import { Search, Save, RotateCcw } from 'lucide-react';

export default function MultipleRemarks() {
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
            <select style={{ padding: '6px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none', width: '200px' }}>
              <option>All Classes</option>
            </select>
            <select style={{ padding: '6px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none', width: '200px' }}>
              <option>All Section</option>
            </select>
            <div style={{ display: 'flex', flex: 1 }}>
              <input type="text" style={{ flex: 1, padding: '6px 10px', border: '1px solid #d1d5db', borderRadius: '4px 0 0 4px', fontSize: '12px', outline: 'none' }} />
              <button style={{ background: '#29a9d8', border: 'none', padding: '0 15px', borderRadius: '0 4px 4px 0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Search size={14} color="#fff" />
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '10px', color: '#374151' }}>Remark Type</label>
              <div style={{ display: 'flex', gap: '30px', fontSize: '12px', color: '#374151' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <input type="radio" name="remarkType" defaultChecked style={{ accentColor: '#29a9d8' }} /> Receipt
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <input type="radio" name="remarkType" /> Installment
                </label>
              </div>
            </div>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Select Receipt</label>
              <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }}>
                <option></option>
              </select>
            </div>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Select Installment</label>
              <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }}>
                <option></option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Remark</label>
              <input type="text" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }} />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button style={{ background: '#4ade80', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Save size={14} /> Save
              </button>
              <button style={{ background: '#f59e0b', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <RotateCcw size={14} /> Reset
              </button>
            </div>
          </div>

          {/* Table */}
          <div style={{ marginTop: '10px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
              <thead>
                <tr style={{ border: '1px solid #e5e7eb', background: '#f9fafb' }}>
                  <th style={{ padding: '8px', textAlign: 'left', color: '#374151', borderRight: '1px solid #e5e7eb', width: '20%' }}>Receipt No.</th>
                  <th style={{ padding: '8px', textAlign: 'left', color: '#374151', borderRight: '1px solid #e5e7eb', width: '60%' }}>Remark</th>
                  <th style={{ padding: '8px', textAlign: 'left', color: '#374151', width: '20%' }}>Edit</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ border: '1px solid #e5e7eb' }}>
                  <td colSpan="3" style={{ padding: '20px', textAlign: 'center', color: '#9ca3af' }}></td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}
