import React from 'react';
import { RefreshCw } from 'lucide-react';

export default function AssignConcessionToStudent() {
  return (
    <div style={{ padding: '20px', background: '#fff', minHeight: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '30px', marginTop: '20px' }}>
        <select style={{ padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', width: '200px', outline: 'none', fontSize: '13px' }}>
          <option>Select Class</option>
        </select>
        <select style={{ padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', width: '200px', outline: 'none', fontSize: '13px' }}>
          <option>All Section</option>
        </select>
        <button style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '4px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
          <RefreshCw size={14} /> Update
        </button>
      </div>

      <h3 style={{ fontSize: '16px', color: '#374151', marginBottom: '15px', fontWeight: 'normal', paddingLeft: '20px' }}>Student List</h3>

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold' }}>Sr. No. <span style={{fontSize:'10px', color:'#9ca3af', marginLeft:'4px'}}>▲</span></th>
            <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold' }}>Adm No. <span style={{fontSize:'10px', color:'#9ca3af', marginLeft:'4px'}}>◆</span></th>
            <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold' }}>Bill No. <span style={{fontSize:'10px', color:'#9ca3af', marginLeft:'4px'}}>◆</span></th>
            <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold' }}>Student Name <span style={{fontSize:'10px', color:'#9ca3af', marginLeft:'4px'}}>◆</span></th>
            <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold' }}>Father Name <span style={{fontSize:'10px', color:'#9ca3af', marginLeft:'4px'}}>◆</span></th>
            <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold' }}>DOB <span style={{fontSize:'10px', color:'#9ca3af', marginLeft:'4px'}}>◆</span></th>
            <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold' }}>DOA <span style={{fontSize:'10px', color:'#9ca3af', marginLeft:'4px'}}>◆</span></th>
            <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold' }}>Concession</th>
            <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold' }}>Select</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="9" style={{ textAlign: 'center', padding: '20px', color: '#6b7280', borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
              No data available in table
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
