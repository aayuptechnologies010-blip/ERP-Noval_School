import React from 'react';
import { Save } from 'lucide-react';

export default function AssignSalaryHeadToGroup() {
  const data = [
    { id: 1, head: 'Dearness Allowance', type: 'Total Basic %' },
    { id: 2, head: 'House Rent Allowance', type: 'Total Basic %' },
    { id: 3, head: 'Transport Allowance', type: 'Fixed' },
    { id: 4, head: 'Medical Allowance', type: 'Fixed' },
    { id: 5, head: 'City expenses', type: 'Fixed' },
    { id: 6, head: 'Other Allowances', type: 'Occasional' },
    { id: 7, head: 'Basic Arrear', type: 'Occasional' },
    { id: 8, head: 'Dearness Allowance Arrear', type: 'Occasional' },
    { id: 9, head: 'House Rent Allowance Arrear', type: 'Occasional' },
    { id: 10, head: 'Transport Allowance Arrear', type: 'Occasional' },
  ];

  return (
    <div className="mail-template-container">
      <div style={{ padding: '20px', borderBottom: '1px solid #dee2e6', marginBottom: '20px' }}>
        <div style={{ width: '300px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Salary Group</label>
          <select className="settings-input" style={{ width: '100%' }}>
            <option>Select Salary Group</option>
          </select>
        </div>
      </div>

      <div className="mail-table-wrapper">
        <table className="mail-table">
          <thead>
            <tr>
              <th style={{ width: '60px' }}>Sl. No.</th>
              <th style={{ width: '60px' }}></th>
              <th>Head Name</th>
              <th>Value/Percentage</th>
              <th>ValueType</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={row.id} className={i % 2 === 0 ? 'row-even' : 'row-odd'}>
                <td>{row.id}</td>
                <td><input type="checkbox" style={{ transform: 'scale(1.2)' }} /></td>
                <td>{row.head}</td>
                <td>
                  <input type="text" className="settings-input" defaultValue="0.00" style={{ width: '120px', padding: '4px 8px' }} />
                </td>
                <td>{row.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px', marginTop: '20px', borderTop: '1px solid #dee2e6' }}>
        <button style={{ backgroundColor: 'white', border: '1px solid #28a745', color: '#28a745', padding: '8px 25px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
          <Save size={16} /> Save
        </button>
      </div>
    </div>
  );
}
