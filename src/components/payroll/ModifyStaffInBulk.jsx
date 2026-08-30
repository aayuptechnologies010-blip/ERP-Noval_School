import React from 'react';
import { Eye, X, Save } from 'lucide-react';

export default function ModifyStaffInBulk() {
  return (
    <div className="global-settings-container">
      <div style={{ padding: '20px 40px', maxWidth: '800px', margin: '0 auto' }}>
        <div className="settings-row" style={{ gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
          <div className="form-group">
            <label>School Bank</label>
            <select className="settings-input"><option>All Salary A/c</option></select>
          </div>
          <div className="form-group">
            <label>Salary A/c No</label>
            <select className="settings-input"><option>All Salary A/C No.</option></select>
          </div>
          <div className="form-group">
            <label>Employee Type</label>
            <select className="settings-input"><option>All Employee Types</option></select>
          </div>
          <div className="form-group">
            <label>Designation</label>
            <select className="settings-input"><option>All Designations</option></select>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '30px' }}>
          <button style={{ backgroundColor: 'white', color: '#159BD7', border: '1px solid #159BD7', padding: '6px 20px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
            <Eye size={16} /> View
          </button>
          <button style={{ backgroundColor: 'white', color: '#ff9800', border: '1px solid #ff9800', padding: '6px 20px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
            <X size={16} /> Reset
          </button>
        </div>
      </div>

      <div style={{ padding: '0 20px' }}>
        <div className="mail-table-wrapper">
          <table className="mail-table">
            <thead>
              <tr>
                <th style={{ width: '40px', textAlign: 'center' }}><input type="checkbox" /></th>
                <th>Emp No.</th>
                <th>Staff Name</th>
                <th>Designation</th>
                <th>Mobile</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: '#6c757d', backgroundColor: '#f8f9fa' }}>
                  No data available in table
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <button style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '8px 25px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            <Save size={16} /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
