import React from 'react';
import { X } from 'lucide-react';

export default function RejoinStaff() {
  return (
    <div className="global-settings-container">
      <div className="settings-row" style={{ gridTemplateColumns: '1fr 1fr', gap: '30px', padding: '20px 40px', maxWidth: '800px', margin: '0 auto' }}>
        <div className="form-group">
          <label>Select Employee</label>
          <select className="settings-input"><option>Select Employee</option></select>
        </div>
        <div className="form-group">
          <label>Emp No (New)</label>
          <input type="text" className="settings-input" />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '30px' }}>
        <button style={{ backgroundColor: '#159BD7', color: 'white', border: 'none', padding: '8px 25px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Rejoin
        </button>
        <button style={{ backgroundColor: '#ff9800', color: 'white', border: 'none', padding: '8px 25px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
          <X size={16} /> Reset
        </button>
      </div>
    </div>
  );
}
