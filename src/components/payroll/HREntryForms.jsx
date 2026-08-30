import React from 'react';

export default function HREntryForms() {
  return (
    <div className="global-settings-container" style={{ display: 'flex', minHeight: '600px', padding: 0 }}>
      
      {/* Left Sidebar */}
      <div style={{ width: '280px', padding: '20px', backgroundColor: 'white', borderRight: '1px solid #dee2e6' }}>
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold' }}>School Name</label>
          <select className="settings-input"><option>All Schools</option></select>
        </div>
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold' }}>Staff Type</label>
          <select className="settings-input"><option>Select Staff Type</option></select>
        </div>
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold' }}>Department</label>
          <select className="settings-input"><option>Select Department</option></select>
        </div>
        <div className="form-group" style={{ marginBottom: '30px' }}>
          <label style={{ fontWeight: 'bold' }}>Employee Name</label>
          <select className="settings-input"><option>Select Staff</option></select>
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{ backgroundColor: '#159BD7', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer', flex: 1 }}>
            Offer Letter
          </button>
          <button style={{ backgroundColor: '#159BD7', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer', flex: 1.5 }}>
            Appointment Letter
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flexGrow: 1, backgroundColor: '#e9ecef', position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', backgroundColor: 'white', padding: '8px 4px', border: '1px solid #dee2e6', borderLeft: 'none', cursor: 'pointer', borderTopRightRadius: '4px', borderBottomRightRadius: '4px' }}>
          <span style={{ fontSize: '12px' }}>◀</span>
        </div>
      </div>

    </div>
  );
}
