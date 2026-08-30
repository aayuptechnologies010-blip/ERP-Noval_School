import React from 'react';
import { CornerUpRight } from 'lucide-react';

export default function CreateStudentsFeesStructure() {
  return (
    <div style={{ padding: '40px', background: '#fff', minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <div style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '30px', marginTop: '20px' }}>
        
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>Installment</label>
          <select style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }}>
            <option>Select Installment</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>Due On Date</label>
          <div style={{ display: 'flex', gap: '20px' }}>
            <select style={{ flex: 1, padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }}><option>Year</option></select>
            <select style={{ flex: 1, padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }}><option>Month</option></select>
            <select style={{ flex: 1, padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }}><option>Day</option></select>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>Due Date</label>
          <div style={{ display: 'flex', gap: '20px' }}>
            <select style={{ flex: 1, padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }}><option>Year</option></select>
            <select style={{ flex: 1, padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }}><option>Month</option></select>
            <select style={{ flex: 1, padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }}><option>Day</option></select>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <button style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '4px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <CornerUpRight size={16} /> Create Structure
          </button>
        </div>

      </div>

    </div>
  );
}
