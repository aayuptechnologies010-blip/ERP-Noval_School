import React from 'react';
import { Eye, XCircle } from 'lucide-react';

export default function BonusCalculations() {
  return (
    <div className="global-settings-container">
      <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
        
        <div className="settings-row" style={{ gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '20px' }}>
          <div className="form-group">
            <label style={{ fontWeight: 'bold' }}>Staff Type</label>
            <select className="settings-input"><option>All Staff Type(s)</option></select>
          </div>
          <div className="form-group">
            <label style={{ fontWeight: 'bold' }}>Salary Month and Year (From)</label>
            <select className="settings-input"><option>Select</option></select>
          </div>
        </div>

        <div className="settings-row" style={{ gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '40px' }}>
          <div className="form-group">
            <label style={{ fontWeight: 'bold' }}>Calculation Date</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <select className="settings-input" style={{ flex: 1 }}><option>2026</option></select>
              <select className="settings-input" style={{ flex: 1.5 }}><option>August</option></select>
              <select className="settings-input" style={{ flex: 1 }}><option>30</option></select>
            </div>
          </div>
          <div className="form-group">
            <label style={{ fontWeight: 'bold' }}>To be paid in (Salary Month and Year)</label>
            <select className="settings-input"><option>Select</option></select>
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
