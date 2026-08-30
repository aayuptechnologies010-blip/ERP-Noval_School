import React from 'react';
import { Eye, MessageSquare } from 'lucide-react';

export default function SalarySheet() {
  return (
    <div style={{ display: 'flex', height: '100%', backgroundColor: '#f0f2f5' }}>
      <div style={{ width: '300px', backgroundColor: 'white', padding: '20px', borderRight: '1px solid #ddd', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
        
        <div className="form-group">
          <label style={{ fontWeight: 'bold' }}>School Name</label>
          <select className="settings-input"><option>NAVALS NATIONAL ACADEMY</option></select>
        </div>
        
        <div className="form-group">
          <label style={{ fontWeight: 'bold' }}>School Bank</label>
          <select className="settings-input"><option>All Salary A/c</option></select>
        </div>

        <div className="form-group">
          <label style={{ fontWeight: 'bold' }}>Salary A/c No.</label>
          <select className="settings-input"><option>All Salary A/C No.</option></select>
        </div>

        <div className="form-group">
          <label style={{ fontWeight: 'bold' }}>Salary Month</label>
          <select className="settings-input"><option>Please Select</option></select>
        </div>

        <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <input type="checkbox" id="hourlyPaid" />
          <label htmlFor="hourlyPaid">Hourly Paid</label>
        </div>

        <div className="form-group">
          <label style={{ fontWeight: 'bold' }}>Staff Type</label>
          <select className="settings-input"><option>All (11)</option></select>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button style={{ flex: 1, backgroundColor: '#159BD7', color: 'white', border: 'none', padding: '8px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', cursor: 'pointer', fontSize: '13px' }}>
            <MessageSquare size={16} /> Proceed To SMS
          </button>
          <button style={{ backgroundColor: '#159BD7', color: 'white', border: 'none', padding: '8px 25px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', cursor: 'pointer' }}>
            <Eye size={16} /> Show
          </button>
        </div>

      </div>
      
      <div style={{ flex: 1, backgroundColor: '#e0e0e0', margin: '20px', borderRadius: '4px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '50%', left: '-10px', width: '20px', height: '40px', backgroundColor: 'white', border: '1px solid #ddd', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}>
          <span style={{ fontSize: '12px' }}>◀</span>
        </div>
      </div>
    </div>
  );
}
