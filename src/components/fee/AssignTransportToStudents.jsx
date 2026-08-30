import React from 'react';
import { RefreshCw } from 'lucide-react';

export default function AssignTransportToStudents() {
  return (
    <div style={{ padding: '20px', background: '#fff', minHeight: '100%' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div style={{ width: '200px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Class</label>
            <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }}>
              <option>Select Class</option>
            </select>
          </div>
          <div style={{ width: '200px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Section</label>
            <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }}>
              <option>Select Section</option>
            </select>
          </div>
          <button style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', height: '33px' }}>
            <RefreshCw size={14} /> Update
          </button>
        </div>

        <div>
          <div style={{ fontSize: '14px', color: '#374151', marginBottom: '10px' }}>Student List</div>
          <div style={{ overflowX: 'auto', border: '1px solid #e5e7eb', borderRadius: '4px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e5e7eb', background: '#fff' }}>
                  {['Sr. No.', 'Adm No', 'Student Name', 'Father Name', 'Address', 'Route', 'Stop', 'Vehicle', 'Months', 'Select'].map((head, i) => (
                    <th key={i} style={{ padding: '10px 8px', textAlign: 'left', color: '#374151', borderRight: '1px solid #e5e7eb', fontWeight: 'bold' }}>
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="10" style={{ padding: '20px', textAlign: 'center', color: '#9ca3af' }}></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
