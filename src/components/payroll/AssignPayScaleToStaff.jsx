import React from 'react';
import { Eye, X, Search } from 'lucide-react';

export default function AssignPayScaleToStaff() {
  return (
    <div className="global-settings-container">
      <div style={{ padding: '20px 40px', maxWidth: '800px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '40px' }}>
          <label style={{ fontWeight: 'bold' }}>Enter/Search Name</label>
          <input type="text" className="settings-input" style={{ width: '300px' }} />
          <button style={{ backgroundColor: 'white', color: '#159BD7', border: '1px solid #159BD7', padding: '6px 15px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
            <Search size={16} /> Search
          </button>
        </div>

        <div className="settings-row" style={{ gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
          <div className="form-group">
            <label>School Bank</label>
            <select className="settings-input"><option>All Salary A/c</option></select>
          </div>
          <div className="form-group">
            <label>Salary A/c No</label>
            <select className="settings-input"><option>All Salary A/C No.</option></select>
          </div>
          <div className="form-group">
            <label>Employee Type</label>
            <select className="settings-input"><option>All Employee Types</option></select>
          </div>
          <div className="form-group">
            <label>Designation</label>
            <select className="settings-input"><option>All Designations</option></select>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
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
