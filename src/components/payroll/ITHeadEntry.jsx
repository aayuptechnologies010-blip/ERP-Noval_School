import React from 'react';
import { Eye, XCircle } from 'lucide-react';

export default function ITHeadEntry() {
  return (
    <div className="global-settings-container">
      <div style={{ padding: '30px', maxWidth: '900px', margin: '0 auto' }}>
        
        <div className="settings-row" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '40px' }}>
          <div className="form-group">
            <label style={{ fontWeight: 'bold', textAlign: 'center', display: 'block' }}>School Bank</label>
            <select className="settings-input"><option>All School Banks</option></select>
          </div>
          <div className="form-group">
            <label style={{ fontWeight: 'bold', textAlign: 'center', display: 'block' }}>Salary A/c No.</label>
            <select className="settings-input"><option>All Salary A/C</option></select>
          </div>
          <div className="form-group">
            <label style={{ fontWeight: 'bold', textAlign: 'center', display: 'block' }}>Staff Type</label>
            <select className="settings-input"><option>All (13)</option></select>
          </div>
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
