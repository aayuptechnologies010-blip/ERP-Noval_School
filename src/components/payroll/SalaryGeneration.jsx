import React from 'react';
import { Eye, XCircle } from 'lucide-react';

export default function SalaryGeneration() {
  return (
    <div className="global-settings-container">
      <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '40px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <input type="radio" name="salaryType" defaultChecked /> For Regular
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <input type="radio" name="salaryType" /> For Hourly paid
          </label>
        </div>

        <div className="settings-row" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '30px' }}>
          <div className="form-group">
            <label style={{ fontWeight: 'bold', textAlign: 'center', display: 'block' }}>Salary A/c</label>
            <select className="settings-input"><option>Select Salary A/c</option></select>
          </div>
          <div className="form-group">
            <label style={{ fontWeight: 'bold', textAlign: 'center', display: 'block' }}>Salary Month-Year</label>
            <select className="settings-input"><option>Select Month-Year</option></select>
          </div>
          <div className="form-group">
            <label style={{ fontWeight: 'bold', textAlign: 'center', display: 'block' }}>Employee Type</label>
            <select className="settings-input"><option>All Employee Types</option></select>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
          <button style={{ backgroundColor: '#159BD7', color: 'white', border: 'none', padding: '8px 25px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
            <Eye size={16} /> View
          </button>
          <button style={{ backgroundColor: '#ffbd59', color: 'white', border: 'none', padding: '8px 25px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
            <XCircle size={16} /> Reset
          </button>
        </div>

      </div>
    </div>
  );
}
