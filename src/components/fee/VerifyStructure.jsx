import React from 'react';
import { Eye } from 'lucide-react';

export default function VerifyStructure() {
  return (
    <div style={{ padding: '20px', background: '#fff', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      
      <div style={{ display: 'flex', gap: '30px', marginBottom: '30px', justifyContent: 'center', marginTop: '30px' }}>
        <div style={{ width: '220px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>Class</label>
          <select style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px' }}>
            <option>All (51)</option>
          </select>
        </div>
        <div style={{ width: '220px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>Installment</label>
          <select style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px' }}>
            <option>All Installment(s)</option>
          </select>
        </div>
        <div style={{ width: '220px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>Fee Type</label>
          <select style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px' }}>
            <option>School Fee</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '50px' }}>
        <button style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '8px 24px', borderRadius: '4px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
          <Eye size={16} /> Show
        </button>
      </div>

      <div style={{ padding: '0 50px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: 'normal', margin: '0 0 15px 0', color: '#374151' }}>Verify Structure</h4>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', border: '1px solid #e5e7eb' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold' }}>Sl. No.</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold' }}>Name</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold' }}>Adm No</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold' }}>Class</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold' }}>Group Assigned</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold' }}>Structure Assigned</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="6" style={{ height: '50px' }}></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
