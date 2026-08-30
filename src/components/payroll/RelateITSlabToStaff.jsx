import React from 'react';
import { Save, X } from 'lucide-react';

export default function RelateITSlabToStaff() {
  return (
    <div className="global-settings-container">
      <div className="settings-row" style={{ gridTemplateColumns: '1fr 1fr', gap: '30px', padding: '20px 40px', maxWidth: '800px', margin: '0 auto' }}>
        <div className="form-group">
          <label>Staff Type</label>
          <select className="settings-input"><option>All Staff Types</option></select>
        </div>
        <div className="form-group">
          <label>Select Tax Regime Type</label>
          <select className="settings-input"><option>Select Tax Regime</option></select>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '30px' }}>
        <button style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '8px 25px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
          <Save size={16} /> Save
        </button>
        <button style={{ backgroundColor: '#ff9800', color: 'white', border: 'none', padding: '8px 25px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
          <X size={16} /> Reset
        </button>
      </div>
    </div>
  );
}
