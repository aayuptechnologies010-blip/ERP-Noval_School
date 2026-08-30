import React from 'react';
import { Eye } from 'lucide-react';

export default function Form16() {
  return (
    <div style={{ display: 'flex', height: '100%', backgroundColor: '#f0f2f5' }}>
      <div style={{ width: '300px', backgroundColor: 'white', padding: '20px', borderRight: '1px solid #ddd', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
        
        <div className="form-group">
          <label style={{ fontWeight: 'bold' }}>Staff Type</label>
          <select className="settings-input"><option>Select Staff Type</option></select>
        </div>
        
        <div className="form-group">
          <label style={{ fontWeight: 'bold' }}>Active Status</label>
          <select className="settings-input"><option>Active</option></select>
        </div>

        <div className="form-group">
          <label style={{ fontWeight: 'bold' }}>Staff Name</label>
          <select className="settings-input"><option></option></select>
        </div>

        <div className="form-group">
          <label style={{ fontWeight: 'bold' }}>Date</label>
          <input type="text" className="settings-input" defaultValue="30-Aug-2026" />
        </div>

        <div className="form-group">
          <label style={{ fontWeight: 'bold' }}>Place</label>
          <input type="text" className="settings-input" />
        </div>

        <div style={{ fontSize: '11px', fontWeight: 'bold', marginTop: '10px' }}>
          Note :<br />
          Please define next Financial Year as Assessment Year, for proper reflection of details on Form 16 :-<br />
          Global Masters {'>'}{'>'} Define Financial Year 
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
