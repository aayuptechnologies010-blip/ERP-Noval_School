import React from 'react';
import { Eye, XCircle } from 'lucide-react';

export default function AutoIncrement() {
  return (
    <div className="global-settings-container">
      <div style={{ padding: '30px', maxWidth: '900px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '30px' }}>
          <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <input type="radio" name="incType" defaultChecked /> Basic
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <input type="radio" name="incType" /> DA
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <input type="radio" name="incType" /> TA
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <input type="radio" name="incType" /> HRA
            </label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <input type="checkbox" id="activeArrears" />
            <label htmlFor="activeArrears">Active <span style={{ color: 'red' }}>It must be active for Arrears.</span></label>
          </div>
        </div>

        <div className="settings-row" style={{ gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '20px' }}>
          <div className="form-group">
            <label style={{ fontWeight: 'bold' }}>School Bank</label>
            <select className="settings-input"><option>All School Banks</option></select>
          </div>
          <div className="form-group">
            <label style={{ fontWeight: 'bold' }}>Salary A/c No.</label>
            <select className="settings-input"><option>All Salary A/C</option></select>
          </div>
        </div>

        <div className="settings-row" style={{ gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '20px' }}>
          <div className="form-group">
            <label style={{ fontWeight: 'bold' }}>Staff Type</label>
            <select className="settings-input"><option>All Staff Types</option></select>
          </div>
          <div className="form-group">
            <label style={{ fontWeight: 'bold' }}>Select Staff</label>
            <select className="settings-input"><option>All Staffs</option></select>
          </div>
        </div>

        <div className="settings-row" style={{ gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '20px' }}>
          <div className="form-group">
            <label style={{ fontWeight: 'bold' }}>Increment Applied From</label>
            <select className="settings-input"><option>Select</option></select>
          </div>
          <div className="form-group">
            <label style={{ fontWeight: 'bold' }}>Percent Value</label>
            <input type="text" className="settings-input" defaultValue="0" />
          </div>
        </div>

        <div className="settings-row" style={{ gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '40px' }}>
          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '5px', height: '100%' }}>
            <input type="checkbox" id="thisMonthOnly" />
            <label htmlFor="thisMonthOnly">This Month Increment Only</label>
          </div>
          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '5px', height: '100%' }}>
            <input type="checkbox" id="checkGiveInc" />
            <label htmlFor="checkGiveInc">Check For Give Increment As Amount</label>
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
