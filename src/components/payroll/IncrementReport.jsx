import React from 'react';
import { Eye } from 'lucide-react';

export default function IncrementReport() {
  return (
    <div style={{ display: 'flex', height: '100%', backgroundColor: '#f0f2f5' }}>
      <div style={{ width: '300px', backgroundColor: 'white', padding: '20px', borderRight: '1px solid #ddd', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
        
        <div className="form-group">
          <label style={{ fontWeight: 'bold' }}>School Bank</label>
          <select className="settings-input"><option>All School Banks</option></select>
        </div>

        <div className="form-group">
          <label style={{ fontWeight: 'bold' }}>Salary A/c No.</label>
          <select className="settings-input"><option>All Salary A/C</option></select>
        </div>

        <div className="form-group">
          <label style={{ fontWeight: 'bold' }}>Month And Year</label>
          <select className="settings-input"><option>All Months</option></select>
        </div>

        <div className="form-group">
          <label style={{ fontWeight: 'bold' }}>Staff Type</label>
          <select className="settings-input"><option>All (13)</option></select>
        </div>
        
        <div className="form-group">
          <label style={{ fontWeight: 'bold' }}>Designation</label>
          <select className="settings-input"><option>All (38)</option></select>
        </div>

        <div className="form-group">
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Increment Point</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', backgroundColor: '#f9f9f9', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}><input type="checkbox" /> Basic Salary</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}><input type="checkbox" /> Dearness Allowance</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}><input type="checkbox" /> Transport Allowance</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}><input type="checkbox" /> House Rent Allowance</label>
          </div>
        </div>

        <div className="form-group">
          <label style={{ fontWeight: 'bold' }}>Status</label>
          <select className="settings-input">
            <option>Select</option>
            <option>Active</option>
            <option>Deactive</option>
          </select>
        </div>

        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
          <button style={{ backgroundColor: '#159BD7', color: 'white', border: 'none', padding: '8px 25px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
            <Eye size={16} /> Show
          </button>
        </div>

      </div>
      
      <div style={{ flex: 1, backgroundColor: '#e0e0e0', margin: '20px', borderRadius: '4px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '50%', left: '-10px', width: '20px', height: '40px', backgroundColor: 'white', border: '1px solid #ddd', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}>
          <span style={{ fontSize: '12px' }}>◀</span>
        </div>
      </div>
    </div>
  );
}
