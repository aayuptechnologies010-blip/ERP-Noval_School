import React from 'react';
import { Eye, XCircle } from 'lucide-react';

export default function IncrementRollback() {
  return (
    <div className="global-settings-container">
      <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '40px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <input type="radio" name="rollbackType" defaultChecked /> Roll Back For Basic
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <input type="radio" name="rollbackType" /> Roll Back For Head
          </label>
        </div>

        <div className="form-group" style={{ marginBottom: '40px' }}>
          <label style={{ fontWeight: 'bold' }}>Staff Type</label>
          <select className="settings-input"><option>All Staffs</option></select>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
          <button style={{ backgroundColor: 'white', color: '#159BD7', border: '1px solid #159BD7', padding: '6px 25px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
            <Eye size={16} /> View
          </button>
          <button style={{ backgroundColor: 'white', color: '#ffbd59', border: '1px solid #ffbd59', padding: '6px 25px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
            <XCircle size={16} /> Reset
          </button>
        </div>

      </div>
    </div>
  );
}
