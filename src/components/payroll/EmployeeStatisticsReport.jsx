import React from 'react';
import { Eye, Settings } from 'lucide-react';

export default function EmployeeStatisticsReport() {
  return (
    <div style={{ display: 'flex', height: '100%', backgroundColor: '#f0f2f5' }}>
      <div style={{ width: '300px', backgroundColor: 'white', padding: '20px', borderRight: '1px solid #ddd', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
        
        <div className="form-group">
          <label style={{ fontWeight: 'bold' }}>School Name</label>
          <select className="settings-input"><option>NAVALS NATIONAL ACADEMY</option></select>
        </div>
        
        <div className="form-group">
          <label style={{ fontWeight: 'bold' }}>School Bank</label>
          <select className="settings-input"><option>All School Banks</option></select>
        </div>

        <div className="form-group">
          <label style={{ fontWeight: 'bold' }}>Salary A/c No.</label>
          <select className="settings-input"><option>All Salary A/C</option></select>
        </div>

        <div className="form-group">
          <label style={{ fontWeight: 'bold' }}>Designation</label>
          <select className="settings-input"><option>All Designations</option></select>
        </div>

        <div className="form-group">
          <label style={{ fontWeight: 'bold' }}>Staff Type</label>
          <select className="settings-input"><option>All (13)</option></select>
        </div>

        <div className="form-group">
          <label style={{ fontWeight: 'bold' }}>Select Status</label>
          <select className="settings-input"><option></option></select>
        </div>

        <div className="form-group">
          <label style={{ fontWeight: 'bold' }}>Salary Month</label>
          <select className="settings-input"><option>Select Month</option></select>
        </div>

        <div className="form-group">
          <label style={{ fontWeight: 'bold' }}>Group By</label>
          <select className="settings-input"><option>Select</option></select>
        </div>

        <div className="form-group">
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>Include Title</label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '14px', cursor: 'pointer' }}>
            <input type="checkbox" /> With Title
          </label>
        </div>

        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', backgroundColor: '#f9f9f9', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', maxHeight: '150px', overflowY: 'auto' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}><input type="checkbox" /> Select All</label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}><input type="checkbox" /> Slno</label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}><input type="checkbox" /> EmpNo</label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}><input type="checkbox" /> EmpName</label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}><input type="checkbox" /> BasicSalary</label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}><input type="checkbox" /> GradePay</label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}><input type="checkbox" /> Address</label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}><input type="checkbox" /> Mobile</label>
        </div>

        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <button style={{ backgroundColor: '#159BD7', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
            <Settings size={16} /> Setting
          </button>
          <button style={{ backgroundColor: '#159BD7', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
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
