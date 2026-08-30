import React from 'react';
import { Eye } from 'lucide-react';

export default function RetirementReport() {
  return (
    <div style={{ display: 'flex', height: '100%', backgroundColor: '#f0f2f5' }}>
      <div style={{ width: '300px', backgroundColor: 'white', padding: '20px', borderRight: '1px solid #ddd', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
        
        <div className="form-group">
          <label style={{ fontWeight: 'bold' }}>School Name</label>
          <select className="settings-input"><option>NAVALS NATIONAL ACADEMY</option></select>
        </div>

        <div className="form-group">
          <label style={{ fontWeight: 'bold' }}>Salary Month</label>
          <select className="settings-input"><option>All</option></select>
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
