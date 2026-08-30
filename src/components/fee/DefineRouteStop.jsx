import React from 'react';
import { Save, Eye, Printer, RotateCcw } from 'lucide-react';

export default function DefineRouteStop() {
  const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

  return (
    <div style={{ padding: '20px', background: '#fff', minHeight: '100%' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        <div style={{ display: 'flex', borderRadius: '4px', overflow: 'hidden' }}>
          <button style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '8px 15px', fontSize: '12px', cursor: 'pointer', borderRight: '1px solid rgba(255,255,255,0.3)' }}>
            Export From Excel
          </button>
          <button style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '8px 15px', fontSize: '12px', cursor: 'pointer' }}>
            Download Excel Formate
          </button>
        </div>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '150px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Route No.</label>
            <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }}>
              <option>Select</option>
            </select>
          </div>
          <div style={{ flex: 1, minWidth: '150px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Stop No.</label>
            <input type="text" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }} />
          </div>
          <div style={{ flex: 1, minWidth: '150px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Stop Name</label>
            <input type="text" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Morning Arrival Time</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <select style={{ flex: 1, padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }}>
                <option>01</option>
              </select>
              <select style={{ flex: 1, padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }}>
                <option>00</option>
              </select>
              <select style={{ flex: 1, padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }}>
                <option>AM</option>
              </select>
            </div>
          </div>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Afternoon Arrival Time</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <select style={{ flex: 1, padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }}>
                <option>01</option>
              </select>
              <select style={{ flex: 1, padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }}>
                <option>00</option>
              </select>
              <select style={{ flex: 1, padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }}>
                <option>AM</option>
              </select>
            </div>
          </div>
        </div>

        <div style={{ border: '1px solid #e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ padding: '10px', textAlign: 'center', color: '#374151', borderRight: '1px solid #e5e7eb', width: '80px' }}>Sl No.</th>
                <th style={{ padding: '10px', textAlign: 'center', color: '#374151', borderRight: '1px solid #e5e7eb', width: '120px' }}>Months</th>
                <th style={{ padding: '10px', textAlign: 'left', color: '#374151' }}></th>
              </tr>
            </thead>
            <tbody>
              {months.map((month, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '10px', textAlign: 'center', borderRight: '1px solid #e5e7eb', color: '#374151', background: idx === 0 ? '#e0f2fe' : 'transparent' }}>{idx + 1}</td>
                  <td style={{ padding: '10px', textAlign: 'center', borderRight: '1px solid #e5e7eb', color: '#374151' }}>{month}</td>
                  <td style={{ padding: '8px 10px' }}>
                    <select style={{ width: '100%', padding: '6px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }}>
                      <option>Please Select</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '10px' }}>
          <button style={{ background: '#fff', color: '#4ade80', border: '1px solid #4ade80', padding: '8px 20px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Save size={14} /> Save
          </button>
          <button style={{ background: '#fff', color: '#29a9d8', border: '1px solid #29a9d8', padding: '8px 20px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Eye size={14} /> View
          </button>
          <button style={{ background: '#fff', color: '#3b82f6', border: '1px solid #3b82f6', padding: '8px 20px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Printer size={14} /> Print
          </button>
          <button style={{ background: '#fff', color: '#f59e0b', border: '1px solid #f59e0b', padding: '8px 20px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <RotateCcw size={14} /> Reset
          </button>
        </div>

      </div>
    </div>
  );
}
