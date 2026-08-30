import React from 'react';
import { Save } from 'lucide-react';

export default function FixAdvanceAc() {
  return (
    <div className="global-settings-container">
      <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
        
        <div className="form-group" style={{ marginBottom: '25px' }}>
          <label style={{ fontWeight: 'bold' }}>Account Name</label>
          <input type="text" className="settings-input" />
        </div>

        <div className="form-group" style={{ marginBottom: '40px' }}>
          <label style={{ fontWeight: 'bold' }}>Select Account</label>
          <select className="settings-input">
            <option>Select Account</option>
          </select>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button style={{ backgroundColor: '#2de080', color: 'white', border: 'none', padding: '8px 25px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
            <Save size={16} /> Save
          </button>
        </div>

      </div>
    </div>
  );
}
