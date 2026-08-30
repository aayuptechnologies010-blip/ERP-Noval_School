import React from 'react';
import { Save, Search } from 'lucide-react';

export default function DailyMeterEntry() {
  return (
    <div style={{ padding: '20px', background: '#fff', minHeight: '100%' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Form Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '15px', alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Date</label>
            <input type="text" defaultValue="29-Aug-2026" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Vehicle No.</label>
            <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }}>
              <option>Select</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Present Meter Reading</label>
            <input type="text" defaultValue="0" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Last Meter Reading</label>
            <input type="text" defaultValue="0" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>No Of Student</label>
            <input type="text" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }} />
          </div>
          <div>
            <button style={{ background: '#4ade80', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Save size={14} /> Save
            </button>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '10px 0' }} />

        {/* Search & Table */}
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', alignItems: 'center' }}>
          <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#374151', width: '40px' }}>From Date:</label>
          <input type="text" defaultValue="29-Aug-2026" style={{ width: '150px', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }} />
          
          <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#374151' }}>To Date:</label>
          <input type="text" defaultValue="29-Aug-2026" style={{ width: '150px', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }} />
          
          <button style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Search size={14} /> Search
          </button>
        </div>

        <div style={{ overflowX: 'auto', border: '1px solid #e5e7eb', borderRadius: '4px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
            <thead>
              <tr style={{ background: '#fff', borderBottom: '1px solid #e5e7eb' }}>
                {['Sr No.', 'Date', 'Vehicle No.', 'Present Meter Reading', 'Last Meter Reading', 'No Of Student', 'Action'].map((head, i) => (
                  <th key={i} style={{ padding: '10px 8px', textAlign: 'center', color: '#374151', fontWeight: 'bold' }}>
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="7" style={{ padding: '20px', textAlign: 'center' }}></td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
