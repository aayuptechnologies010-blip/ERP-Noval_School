import React from 'react';
import { Eye, XCircle, Download } from 'lucide-react';

export default function StaffSalaryStructure() {
  return (
    <div className="global-settings-container">
      <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
        
        <div className="settings-row" style={{ gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '20px' }}>
          <div className="form-group">
            <label style={{ fontWeight: 'bold' }}>Account Name</label>
            <select className="settings-input"><option>Select Account</option></select>
          </div>
          <div className="form-group">
            <label style={{ fontWeight: 'bold' }}>Employee Type</label>
            <select className="settings-input"><option>All Employee Types</option></select>
          </div>
        </div>

        <div className="settings-row" style={{ gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '40px' }}>
          <div className="form-group">
            <label style={{ fontWeight: 'bold' }}>Salary Group</label>
            <select className="settings-input"><option>All Group</option></select>
          </div>
          <div className="form-group">
            {/* Empty space to match layout */}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
          <button style={{ backgroundColor: '#159BD7', color: 'white', border: 'none', padding: '8px 25px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
            <Eye size={16} /> View
          </button>
          <button style={{ backgroundColor: 'white', color: '#159BD7', border: '1px solid #159BD7', padding: '6px 25px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
            <Download size={16} /> Export
          </button>
          <button style={{ backgroundColor: '#ffbd59', color: 'white', border: 'none', padding: '8px 25px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
            <XCircle size={16} /> Reset
          </button>
        </div>

      </div>
    </div>
  );
}
