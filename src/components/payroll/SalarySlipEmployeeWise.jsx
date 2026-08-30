import React from 'react';
import { Eye } from 'lucide-react';

export default function SalarySlipEmployeeWise() {
  return (
    <div className="global-settings-container">
      <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
        
        <div className="settings-row" style={{ gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '20px' }}>
          <div className="form-group">
            <label style={{ fontWeight: 'bold' }}>School Name</label>
            <select className="settings-input"><option>NAVALS NATIONAL ACADEMY</option></select>
          </div>
          <div className="form-group">
            <label style={{ fontWeight: 'bold' }}>Staff Type</label>
            <select className="settings-input"><option>All Staff Types</option></select>
          </div>
        </div>

        <div className="settings-row" style={{ gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '40px' }}>
          <div className="form-group">
            <label style={{ fontWeight: 'bold' }}>Staff</label>
            <select className="settings-input"><option>Select Staff</option></select>
          </div>
          <div className="form-group">
            {/* Empty space to match layout */}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
          <button style={{ backgroundColor: 'white', color: '#159BD7', border: '1px solid #159BD7', padding: '6px 25px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
            <Eye size={16} /> View
          </button>
          <button style={{ backgroundColor: 'white', color: '#159BD7', border: '1px solid #159BD7', padding: '6px 25px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
            Print
          </button>
        </div>

      </div>
    </div>
  );
}
