import React from 'react';
import { Eye, ChevronLeft } from 'lucide-react';

export default function GenerateBillBookDetails() {
  return (
    <div style={{ padding: '24px', background: '#fff', minHeight: '100%', display: 'flex', gap: '24px' }}>
      
      {/* Sidebar */}
      <div style={{ width: '240px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#333', marginBottom: '4px' }}>School</label>
          <select style={{ width: '100%', padding: '6px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px' }}><option>All Schools</option></select>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#333', marginBottom: '4px' }}>Class</label>
          <select style={{ width: '100%', padding: '6px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px' }}><option>All (51)</option></select>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#333', marginBottom: '4px' }}>Search</label>
          <input type="text" style={{ width: '100%', padding: '6px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px' }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#333', marginBottom: '4px' }}>Fee Type</label>
          <select style={{ width: '100%', padding: '6px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px' }}><option>All Fees Types</option></select>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#333', marginBottom: '4px' }}>Select Range</label>
          <select style={{ width: '100%', padding: '6px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px' }}><option>Please Select</option></select>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#333', marginBottom: '4px' }}>Installment</label>
        </div>
        <button style={{ backgroundColor: '#29a9d8', color: '#fff', border: 'none', padding: '6px 16px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', alignSelf: 'flex-start', marginTop: '8px' }}>
          <Eye size={14} /> Show
        </button>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, backgroundColor: '#e5e7eb', borderRadius: '4px', position: 'relative', display: 'flex', alignItems: 'center' }}>
        <button style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', backgroundColor: '#fff', border: '1px solid #d1d5db', borderLeft: 'none', padding: '12px 4px', cursor: 'pointer', borderTopRightRadius: '4px', borderBottomRightRadius: '4px' }}>
          <ChevronLeft size={16} color="#666" />
        </button>
      </div>
      
    </div>
  );
}
