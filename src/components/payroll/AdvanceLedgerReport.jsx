import React from 'react';
import { Eye } from 'lucide-react';

export default function AdvanceLedgerReport() {
  return (
    <div className="global-settings-container">
      <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
        
        <div className="settings-row" style={{ gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '20px' }}>
          <div className="form-group">
            <label style={{ fontWeight: 'bold' }}>From Date</label>
            <input type="text" className="settings-input" defaultValue="30-Aug-2026" />
          </div>
          <div className="form-group">
            <label style={{ fontWeight: 'bold' }}>To Date</label>
            <input type="text" className="settings-input" defaultValue="30-Aug-2026" />
          </div>
        </div>

        <div className="settings-row" style={{ gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '20px' }}>
          <div className="form-group">
            <label style={{ fontWeight: 'bold' }}>Employee Type</label>
            <select className="settings-input"><option>Select Employee Type</option></select>
          </div>
          <div className="form-group">
            <label style={{ fontWeight: 'bold' }}>Employee Name</label>
            <select className="settings-input"><option></option></select>
          </div>
        </div>

        <div className="settings-row" style={{ gridTemplateColumns: '1fr', marginBottom: '30px', padding: '0 100px' }}>
          <div className="form-group">
            <label style={{ fontWeight: 'bold', textAlign: 'center', display: 'block' }}>Advance Description</label>
            <select className="settings-input"><option></option></select>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button style={{ backgroundColor: '#159BD7', color: 'white', border: 'none', padding: '8px 25px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
            <Eye size={16} /> Show
          </button>
        </div>

      </div>
    </div>
  );
}
