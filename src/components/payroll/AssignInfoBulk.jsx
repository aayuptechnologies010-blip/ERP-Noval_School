import React from 'react';
import { Eye } from 'lucide-react';

export default function AssignInfoBulk() {
  return (
    <div className="global-settings-container">
      <div className="settings-row" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
        <div className="form-group">
          <label>Salary A/C Name</label>
          <select className="settings-input">
            <option>All Salary A/C</option>
          </select>
        </div>
        <div className="form-group">
          <label>Salary A/C No</label>
          <select className="settings-input">
            <option>All Salary A/C</option>
          </select>
        </div>
        <div className="form-group">
          <label>Staff Type</label>
          <select className="settings-input">
            <option>All Staff Types</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button style={{ backgroundColor: 'white', border: '1px solid #159BD7', color: '#159BD7', padding: '6px 20px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
          <Eye size={16} /> View
        </button>
      </div>
    </div>
  );
}
