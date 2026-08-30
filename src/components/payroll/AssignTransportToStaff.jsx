import React from 'react';
import { Eye, X, Printer } from 'lucide-react';

export default function AssignTransportToStaff() {
  return (
    <div className="global-settings-container">
      <div className="settings-row" style={{ gridTemplateColumns: '1fr 1fr', gap: '30px', padding: '20px 40px', maxWidth: '800px', margin: '0 auto' }}>
        <div className="form-group">
          <label>Salary A/c</label>
          <select className="settings-input"><option>All Salary A/c</option></select>
        </div>
        <div className="form-group">
          <label>Salary A/c No.</label>
          <select className="settings-input"><option>All Salary A/C No.</option></select>
        </div>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <div className="form-group" style={{ width: '385px' }}>
          <label style={{ textAlign: 'center' }}>Staff Type</label>
          <select className="settings-input"><option>All (13)</option></select>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '30px' }}>
        <button style={{ backgroundColor: 'white', color: '#159BD7', border: '1px solid #159BD7', padding: '6px 20px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
          <Eye size={16} /> View
        </button>
        <button style={{ backgroundColor: 'white', color: '#159BD7', border: '1px solid #159BD7', padding: '6px 20px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
          <Printer size={16} /> Print
        </button>
        <button style={{ backgroundColor: 'white', color: '#ff9800', border: '1px solid #ff9800', padding: '6px 20px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
          <X size={16} /> Reset
        </button>
      </div>
    </div>
  );
}
