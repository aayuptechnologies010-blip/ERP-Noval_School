import React from 'react';
import { Search, RotateCcw, ArrowRightLeft } from 'lucide-react';

export default function TransferConcession() {
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
            <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '15px', fontWeight: 'bold' }}>Name:</div>
            <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '15px', fontWeight: 'bold' }}>Address:</div>
            <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '15px', fontWeight: 'bold' }}>Father's Name:</div>
            <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '15px', fontWeight: 'bold' }}>Mother's Name:</div>
            <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '15px', fontWeight: 'bold' }}>Contact No.:</div>
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

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#374151', marginBottom: '8px' }}>Sibling Details</div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
                    <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Sr. No.</th>
                    <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Select</th>
                    <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Admission No.</th>
                    <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Name</th>
                    <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Class</th>
                    <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Father</th>
                    <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Mother</th>
                    <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Contact</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="8" style={{ padding: '15px', textAlign: 'center', color: '#9ca3af', border: '1px solid #e5e7eb' }}></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#374151', marginBottom: '8px' }}>Concession Details</div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
                    <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Sr. No.</th>
                    <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Select</th>
                    <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Con Name</th>
                    <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Installment</th>
                    <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Fee Type</th>
                    <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Con Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="6" style={{ padding: '15px', textAlign: 'center', color: '#9ca3af', border: '1px solid #e5e7eb' }}></td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '10px' }}>
              <button style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ArrowRightLeft size={14} /> Transfer
              </button>
              <button style={{ background: '#f59e0b', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <RotateCcw size={14} /> Reset
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
