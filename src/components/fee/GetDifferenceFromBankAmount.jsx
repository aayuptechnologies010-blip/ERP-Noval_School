import React from 'react';
import { Eye, Save, FileText } from 'lucide-react';

export default function GetDifferenceFromBankAmount() {
  return (
    <div style={{ display: 'flex', height: '100%', background: '#fff' }}>
      
      {/* Main Content Area */}
      <div style={{ flex: 1, padding: '20px', position: 'relative', overflowY: 'auto' }}>
        {/* Toggle Arrow indicator (mimicking the UI) */}
        <div style={{ position: 'absolute', left: '0px', top: '50%', transform: 'translateY(-50%)', background: '#f3f4f6', padding: '10px 4px', border: '1px solid #d1d5db', borderLeft: 'none', borderRadius: '0 4px 4px 0', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center' }}>
          <div style={{ width: 0, height: 0, borderTop: '4px solid transparent', borderBottom: '4px solid transparent', borderRight: '6px solid #6b7280' }}></div>
        </div>
        
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Academic Year</label>
              <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }}>
                <option>Select Academic Year</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Month</label>
              <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }}>
                <option>Select Month</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Fee Type</label>
              <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }}>
                <option>School Fee</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Fee Group</label>
              <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }}>
                <option>All</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Counter</label>
              <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }}>
                <option>School</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Wings</label>
              <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }}>
                <option>All</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '30px' }}>
            <button style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Eye size={14} /> Show
            </button>
            <button style={{ background: '#4ade80', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Save size={14} /> Save
            </button>
            <button style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
               Report
            </button>
          </div>

          <div>
            <h3 style={{ fontSize: '13px', fontWeight: 'bold', color: '#374151', marginBottom: '10px' }}>Difference between School/Bank Amount</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #e5e7eb', fontSize: '12px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <th style={{ padding: '8px', textAlign: 'left', borderRight: '1px solid #e5e7eb', color: '#374151' }}>Sl. No.</th>
                  <th style={{ padding: '8px', textAlign: 'left', borderRight: '1px solid #e5e7eb', color: '#374151' }}>Date</th>
                  <th style={{ padding: '8px', textAlign: 'left', borderRight: '1px solid #e5e7eb', color: '#374151' }}>Software Amount</th>
                  <th style={{ padding: '8px', textAlign: 'left', borderRight: '1px solid #e5e7eb', color: '#374151' }}>Bank Amount</th>
                  <th style={{ padding: '8px', textAlign: 'left', borderRight: '1px solid #e5e7eb', color: '#374151' }}>Difference</th>
                  <th style={{ padding: '8px', textAlign: 'left', color: '#374151' }}>Comments</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '8px', borderRight: '1px solid #e5e7eb' }}></td>
                  <td style={{ padding: '8px', borderRight: '1px solid #e5e7eb', fontWeight: 'bold' }}>Total</td>
                  <td style={{ padding: '8px', borderRight: '1px solid #e5e7eb' }}></td>
                  <td style={{ padding: '8px', borderRight: '1px solid #e5e7eb' }}></td>
                  <td style={{ padding: '8px', borderRight: '1px solid #e5e7eb' }}></td>
                  <td style={{ padding: '8px' }}></td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>

    </div>
  );
}
