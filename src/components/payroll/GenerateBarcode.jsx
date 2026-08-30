import React from 'react';
import { Eye } from 'lucide-react';

export default function GenerateBarcode() {
  return (
    <div className="mail-template-container">
      <div style={{ padding: '20px 40px', borderBottom: '1px solid #dee2e6' }}>
        <div className="settings-row" style={{ gridTemplateColumns: '1fr 1fr', gap: '30px', maxWidth: '800px', margin: '0 auto' }}>
          <div className="form-group">
            <label>School Account</label>
            <select className="settings-input"><option>All Account</option></select>
          </div>
          <div className="form-group">
            <label>Employee Type</label>
            <select className="settings-input"><option>All Employee</option></select>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <button style={{ backgroundColor: 'white', color: '#159BD7', border: '1px solid #159BD7', padding: '6px 20px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
            <Eye size={16} /> View
          </button>
        </div>
      </div>

      <div style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Search:</span>
        <input type="text" className="settings-input" style={{ width: '250px', padding: '4px 10px', borderRadius: '20px' }} />
      </div>

      <div className="mail-table-wrapper">
        <table className="mail-table">
          <thead>
            <tr>
              <th style={{ width: '80px' }}>Sr. No.</th>
              <th>Staff Name</th>
              <th>Staff Type</th>
              <th>Designation</th>
              <th>Mobile</th>
              <th>Barcode</th>
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

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px', color: '#6c757d', fontSize: '13px' }}>
        <div>Showing 0 to 0 of 0 entries</div>
      </div>
    </div>
  );
}
