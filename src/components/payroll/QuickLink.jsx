import React from 'react';

export default function QuickLink() {
  return (
    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '4px', minHeight: '400px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
      <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>Quick Link</h2>
      
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <input 
          type="text" 
          style={{ flex: 1, border: '1px solid #ced4da', padding: '8px 12px', borderRadius: '4px 0 0 4px', outline: 'none' }} 
        />
        <button style={{ backgroundColor: '#159BD7', color: 'white', border: 'none', padding: '0 15px', borderRadius: '0 4px 4px 0', cursor: 'pointer', fontSize: '18px' }}>
          +
        </button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '12px 10px', borderBottom: '2px solid #dee2e6', color: '#495057', width: '60px' }}>S.No</th>
            <th style={{ textAlign: 'left', padding: '12px 10px', borderBottom: '2px solid #dee2e6', color: '#495057' }}>Page Name</th>
            <th style={{ textAlign: 'left', padding: '12px 10px', borderBottom: '2px solid #dee2e6', color: '#495057', width: '100px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Empty state or list of quick links would go here */}
        </tbody>
      </table>
    </div>
  );
}
