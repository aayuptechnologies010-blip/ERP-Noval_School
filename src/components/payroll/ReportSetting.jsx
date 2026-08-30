import React from 'react';
import { Save } from 'lucide-react';

export default function ReportSetting() {
  const reports = [
    { id: 1, name: 'Bank Statement Report', format: 'Format 18' },
    { id: 2, name: 'Reconciliation Report', format: 'Select' },
    { id: 3, name: 'ESI Report', format: 'Select' },
    { id: 4, name: 'Salary Sheet', format: 'Format 18' },
    { id: 5, name: 'PF Report', format: 'Select' },
    { id: 6, name: 'Salary Slip', format: 'Format 17' },
    { id: 7, name: 'Salary Statement Employee Wise', format: 'Select' },
    { id: 8, name: 'Gross Form 16', format: 'Select' },
    { id: 9, name: 'PF Challan Report', format: 'Select' },
    { id: 10, name: 'Salary Certificate Report', format: 'Select' },
    { id: 11, name: 'Employee Type wise Report', format: 'Select' },
    { id: 12, name: 'Form 16', format: 'Select' },
    { id: 13, name: 'Estimated Salary Report', format: 'Select' },
    { id: 14, name: 'Experience Certificate Report', format: 'Select' },
  ];

  return (
    <div className="mail-template-container">
      <div style={{ padding: '15px 20px', borderBottom: '1px solid #dee2e6', fontWeight: 'bold', color: '#333', fontSize: '15px', textTransform: 'uppercase' }}>
        Report Settings
      </div>
      
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold', fontSize: '14px', color: '#333' }}>Search:</label>
          <input type="text" className="settings-input" style={{ width: '250px' }} />
        </div>

        <div className="mail-table-wrapper" style={{ border: 'none', borderRadius: '0' }}>
          <table className="mail-table" style={{ borderTop: '1px solid #dee2e6' }}>
            <thead>
              <tr>
                <th style={{ width: '60px', textAlign: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                    SN. <span className="sort-arrows">↕</span>
                  </div>
                </th>
                <th>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    Report Name <span className="sort-arrows">↕</span>
                  </div>
                </th>
                <th style={{ width: '300px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    Format <span className="sort-arrows">↕</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {reports.map((row) => (
                <tr key={row.id} className={row.id % 2 === 0 ? 'row-even' : 'row-odd'} style={row.id === 10 ? { backgroundColor: '#d4edda' } : {}}>
                  <td style={{ textAlign: 'center', padding: '12px' }}>{row.id}</td>
                  <td style={{ padding: '12px' }}>{row.name}</td>
                  <td style={{ padding: '12px' }}>
                    <select className="settings-input" defaultValue={row.format} style={{ width: '100%', padding: '6px 12px' }}>
                      <option value="Select">Select</option>
                      <option value="Format 17">Format 17</option>
                      <option value="Format 18">Format 18</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', fontSize: '13px' }}>
          <div>Showing 1 to 14 of 14 entries</div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <button style={{ 
            backgroundColor: 'white', 
            border: '1px solid #159BD7', 
            color: '#159BD7', 
            padding: '6px 25px', 
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            cursor: 'pointer'
          }}>
            <Save size={16} /> Save
          </button>
        </div>
      </div>
    </div>
  );
}
