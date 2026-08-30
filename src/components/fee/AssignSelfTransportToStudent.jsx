import React from 'react';
import { RefreshCw, Download } from 'lucide-react';

export default function AssignSelfTransportToStudent() {
  const columns = [
    'Sr. No.', 'Select', 'Admission No.', 'Student Name', 'Father Name', 'Transport Type', 
    'Transport Vehicle Type', 'Vehicle No.', 'Driver Name', 'Driver Mobile No.', 'Driver Address', 
    'Driver Aadhaar No.', 'Driver Voter ID No.', 'Driver Driving Licence No.', 'Transporter Name', 
    'Transporter Mobile No.', 'Transporter Address', 'Transporter Aadhaar No.', 'Transporter Voter ID No.', 
    'Transporter Driving Licence No.'
  ];

  return (
    <div style={{ padding: '20px', background: '#fff', minHeight: '100%' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
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
          <div style={{ width: '200px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Type</label>
            <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }}>
              <option>Self</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <RefreshCw size={14} /> Update
          </button>
          <button style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Download size={14} /> Export
          </button>
        </div>

        <div>
          <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#374151', marginBottom: '10px' }}>Assign Self Transport Medium to Students</div>
          <div style={{ overflowX: 'auto', border: '1px solid #e5e7eb', borderRadius: '4px' }}>
            <table style={{ minWidth: '2000px', borderCollapse: 'collapse', fontSize: '11px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e5e7eb', background: '#fff' }}>
                  {columns.map((head, i) => (
                    <th key={i} style={{ padding: '10px 8px', textAlign: 'left', color: '#374151', borderRight: '1px solid #e5e7eb', fontWeight: 'bold' }}>
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={columns.length} style={{ padding: '20px', textAlign: 'center', color: '#9ca3af' }}></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
