import React from 'react';
import { Eye, X } from 'lucide-react';

export default function BulkHeadRemarkEntry() {
  return (
    <div className="global-settings-container">
      <div className="settings-row" style={{ gridTemplateColumns: '1fr 1fr', gap: '30px', padding: '20px 40px' }}>
        <div className="form-group">
          <label>School Bank</label>
          <select className="settings-input"><option>All Salary A/C</option></select>
        </div>
        <div className="form-group">
          <label>Salary A/C No</label>
          <select className="settings-input"><option>All Salary A/C No.</option></select>
        </div>
        <div className="form-group">
          <label>Employee Type</label>
          <select className="settings-input"><option>All Employee Types</option></select>
        </div>
        <div className="form-group">
          <label>Salary Month</label>
          <select className="settings-input"><option>Please Select</option></select>
        </div>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <div className="form-group" style={{ width: '300px' }}>
          <label style={{ textAlign: 'center' }}>Salary Head</label>
          <select className="settings-input"><option>Please Select</option></select>
        </div>
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
  );
}
