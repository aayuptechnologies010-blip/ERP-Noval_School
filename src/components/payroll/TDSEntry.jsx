import React from 'react';
import { Eye, XCircle } from 'lucide-react';

export default function TDSEntry() {
  return (
    <div className="global-settings-container">
      <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
        
        <div className="settings-row" style={{ gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '20px' }}>
          <div className="form-group">
            <label style={{ fontWeight: 'bold' }}>Salary Month-Year</label>
            <select className="settings-input"><option>Select</option></select>
          </div>
          <div className="form-group">
            <label style={{ fontWeight: 'bold' }}>School Bank</label>
            <select className="settings-input"><option>Select Bank</option></select>
          </div>
        </div>

        <div className="settings-row" style={{ gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '30px' }}>
          <div className="form-group">
            <label style={{ fontWeight: 'bold' }}>Date</label>
            <input type="text" className="settings-input" defaultValue="30-Aug-2026" />
          </div>
          <div className="form-group">
            <label style={{ fontWeight: 'bold' }}>Cheque No.</label>
            <input type="text" className="settings-input" />
          </div>
        </div>

        <div className="settings-row" style={{ gridTemplateColumns: '1fr', marginBottom: '40px', padding: '0 150px' }}>
          <div className="form-group">
            <label style={{ fontWeight: 'bold', textAlign: 'center', display: 'block' }}>Challan No.</label>
            <input type="text" className="settings-input" />
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
