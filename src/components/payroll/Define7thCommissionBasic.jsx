import React from 'react';
import { Eye, X } from 'lucide-react';

export default function Define7thCommissionBasic() {
  return (
    <div className="global-settings-container">
      <div style={{ padding: '20px 40px', maxWidth: '600px', margin: '0 auto' }}>
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label>7th CPC Level</label>
          <select className="settings-input">
            <option>Select Level Name</option>
          </select>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '30px' }}>
          <button style={{ backgroundColor: 'white', color: '#159BD7', border: '1px solid #159BD7', padding: '6px 20px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
            <Eye size={16} /> View
          </button>
          <button style={{ backgroundColor: 'white', color: '#ff9800', border: '1px solid #ff9800', padding: '6px 20px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
            <X size={16} /> Reset
          </button>
        </div>
      </div>
    </div>
  );
}
