import React from 'react';
import { Eye } from 'lucide-react';

export default function AdvanceRepaymentReport() {
  return (
    <div className="global-settings-container" style={{ display: 'flex', minHeight: '600px', padding: 0 }}>
      
      {/* Left Sidebar */}
      <div style={{ width: '280px', padding: '20px', backgroundColor: 'white', borderRight: '1px solid #dee2e6' }}>
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold' }}>From Date</label>
          <input type="text" className="settings-input" defaultValue="30-Aug-2026" />
        </div>
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold' }}>To Date</label>
          <input type="text" className="settings-input" defaultValue="30-Aug-2026" />
        </div>
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold' }}>Employee Type</label>
          <select className="settings-input"><option>All Employee Types</option></select>
        </div>
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold' }}>Designation</label>
          <select className="settings-input"><option>All (38)</option></select>
        </div>
        <div className="form-group" style={{ marginBottom: '30px' }}>
          <label style={{ fontWeight: 'bold' }}>Employee Name</label>
          <select className="settings-input"><option>All Employees</option></select>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button style={{ backgroundColor: '#159BD7', color: 'white', border: 'none', padding: '8px 25px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
            <Eye size={16} /> Show
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
