import React from 'react';
import { Search, Save, Eye, Printer, RotateCcw } from 'lucide-react';

export default function PayAmountWithoutStructureForStaff() {
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
            <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '15px', fontWeight: 'bold' }}>Emp No.:</div>
            <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '15px', fontWeight: 'bold' }}>Name:</div>
            <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '15px', fontWeight: 'bold' }}>Date of Joining:</div>
            <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '15px', fontWeight: 'bold' }}>Address:</div>
            <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '15px', fontWeight: 'bold' }}>Father's/Husband Name:</div>
            <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '15px', fontWeight: 'bold' }}>Staff Type:</div>
            <div style={{ fontWeight: 'bold' }}>Department:</div>
          </div>
        </div>

        {/* Right Panel */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Top Search Bar */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <select style={{ padding: '6px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none', width: '200px' }}>
              <option>2026-2027</option>
            </select>
            <div style={{ display: 'flex', flex: 1 }}>
              <input type="text" style={{ flex: 1, padding: '6px 10px', border: '1px solid #d1d5db', borderRadius: '4px 0 0 4px', fontSize: '12px', outline: 'none' }} />
              <button style={{ background: '#29a9d8', border: 'none', padding: '0 15px', borderRadius: '0 4px 4px 0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Search size={14} color="#fff" />
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '150px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Date:</label>
              <input type="text" defaultValue="29-Aug-2026" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }} />
            </div>
            <div style={{ flex: 1, minWidth: '150px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Reason:</label>
              <input type="text" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }} />
            </div>
            <div style={{ flex: 1, minWidth: '150px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Head:</label>
              <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }}>
                <option>Select Head</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ width: '200px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Paymode</label>
              <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }}>
                <option>Select Paymode</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div style={{ marginTop: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '12px', fontWeight: 'bold' }}>Search:</span>
              <input type="text" style={{ padding: '6px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none', width: '250px' }} />
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
              <thead>
                <tr style={{ border: '1px solid #e5e7eb', background: '#f9fafb' }}>
                  <th style={{ padding: '10px', textAlign: 'left', color: '#374151', borderRight: '1px solid #e5e7eb', width: '50%', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      Head Name
                      <span style={{ fontSize: '8px', color: '#9ca3af' }}>▲</span>
                    </div>
                  </th>
                  <th style={{ padding: '10px', textAlign: 'left', color: '#374151', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      To Be Paid Amt.
                      <span style={{ fontSize: '8px', color: '#9ca3af' }}>▲</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ border: '1px solid #e5e7eb' }}>
                  <td colSpan="2" style={{ padding: '15px', textAlign: 'center', color: '#6b7280', background: '#f3f4f6' }}>
                    No data available in table
                  </td>
                </tr>
              </tbody>
            </table>
            <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '10px' }}>
              Showing 0 to 0 of 0 entries
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
            <button style={{ background: '#fff', color: '#4ade80', border: '1px solid #4ade80', padding: '6px 15px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Save size={14} /> Save
            </button>
            <button style={{ background: '#fff', color: '#29a9d8', border: '1px solid #29a9d8', padding: '6px 15px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Eye size={14} /> View
            </button>
            <button style={{ background: '#fff', color: '#3b82f6', border: '1px solid #3b82f6', padding: '6px 15px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Printer size={14} /> Print
            </button>
            <button style={{ background: '#fff', color: '#f59e0b', border: '1px solid #f59e0b', padding: '6px 15px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <RotateCcw size={14} /> Reset
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
