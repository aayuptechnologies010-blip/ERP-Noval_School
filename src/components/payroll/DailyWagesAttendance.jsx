import React from 'react';
import { Eye, XCircle } from 'lucide-react';

export default function DailyWagesAttendance() {
  return (
    <div className="global-settings-container">
      <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
        
        <div className="settings-row" style={{ gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '20px' }}>
          <div className="form-group">
            <label style={{ fontWeight: 'bold' }}>School Bank</label>
            <select className="settings-input"><option>All Salary A/c</option></select>
          </div>
          <div className="form-group">
            <label style={{ fontWeight: 'bold' }}>Employee Type</label>
            <select className="settings-input"><option>All Employee Types</option></select>
          </div>
        </div>

        <div className="settings-row" style={{ gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '20px' }}>
          <div className="form-group">
            <label style={{ fontWeight: 'bold' }}>Salary A/c No.</label>
            <select className="settings-input"><option>All Salary A/C No.</option></select>
          </div>
          <div className="form-group">
            <label style={{ fontWeight: 'bold' }}>Year - Month</label>
            <select className="settings-input"><option>Select</option></select>
          </div>
        </div>

        <div style={{ textAlign: 'center', color: '#ff4d4f', fontWeight: 'bold', marginBottom: '30px' }}>
          Note : Maximum working period(s) should not exceed 500.
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
