import React from 'react';
import { Save } from 'lucide-react';

export default function DefineTDSDeductee() {
  return (
    <div className="global-settings-container">
      <div className="settings-row" style={{ gridTemplateColumns: '1fr 1fr', gap: '30px', padding: '20px 40px', maxWidth: '800px', margin: '0 auto' }}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" className="settings-input" />
        </div>
        <div className="form-group">
          <label>Father's Name</label>
          <input type="text" className="settings-input" />
        </div>
        <div className="form-group">
          <label>Designation</label>
          <select className="settings-input"><option>Select Designation</option></select>
        </div>
        <div className="form-group">
          <label>Place</label>
          <input type="text" className="settings-input" />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
        <button style={{ backgroundColor: 'white', color: '#159BD7', border: '1px solid #159BD7', padding: '8px 25px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
          <Save size={16} /> Save
        </button>
      </div>
    </div>
  );
}
