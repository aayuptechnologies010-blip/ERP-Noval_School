import React from 'react';
import { Plus, Download, Edit, Trash2 } from 'lucide-react';

export default function DefineSalaryHead() {
  const data = [
    { id: 1, serial: 1, head: 'Dearness Allowance', report: 'DA', type: 'Allowance', lwp: true, ot: false, vType: 'Total Basic %', show: true, val: '95.00' },
    { id: 2, serial: 2, head: 'House Rent Allowance', report: 'HRA', type: 'Allowance', lwp: false, ot: false, vType: 'Total Basic %', show: true, val: '5.00' },
    { id: 3, serial: 3, head: 'Transport Allowance', report: 'TA', type: 'Allowance', lwp: false, ot: false, vType: 'Fixed', show: true, val: '1600.00' },
    { id: 4, serial: 4, head: 'Medical Allowance', report: 'MA', type: 'Allowance', lwp: false, ot: false, vType: 'Fixed', show: true, val: '75.00' },
    { id: 5, serial: 5, head: 'City expenses', report: 'CCA', type: 'Allowance', lwp: false, ot: false, vType: 'Fixed', show: false, val: '300.00' },
    { id: 6, serial: 6, head: 'Other Allowances', report: 'Other All', type: 'Allowance', lwp: false, ot: false, vType: 'Occasional', show: true, val: '0.00' },
    { id: 7, serial: 7, head: 'Basic Arrear', report: 'Basic Arr', type: 'Allowance', lwp: false, ot: false, vType: 'Occasional', show: false, val: '0.00' },
    { id: 8, serial: 8, head: 'Dearness Allowance Arrear', report: 'DA Arr', type: 'Allowance', lwp: false, ot: false, vType: 'Occasional', show: false, val: '0.00' },
    { id: 9, serial: 9, head: 'House Rent Allowance Arrear', report: 'HRA Arr', type: 'Allowance', lwp: false, ot: false, vType: 'Occasional', show: false, val: '0.00' },
  ];

  return (
    <div className="mail-template-container">
      <div className="mail-template-header">
        <div className="search-bar">
          <input type="text" placeholder="Search" className="search-input" />
        </div>
        <div className="header-buttons">
          <button className="btn-add">
            <Plus size={16} /> Add New Salary Head
          </button>
          <button className="btn-export">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <div className="mail-table-wrapper">
        <table className="mail-table">
          <thead>
            <tr>
              <th style={{ width: '40px' }}>Sl No.</th>
              <th style={{ width: '80px' }}>Head Serial No</th>
              <th>Head</th>
              <th>Head Report Name</th>
              <th>Head Type</th>
              <th style={{ width: '90px' }}>Effected By LWP</th>
              <th style={{ width: '90px' }}>Effected By OT</th>
              <th>Value Type</th>
              <th style={{ width: '90px' }}>Show in Main Sheet</th>
              <th>Value/Percentage</th>
              <th style={{ width: '80px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={row.id} className={i % 2 === 0 ? 'row-even' : 'row-odd'}>
                <td>{row.id}</td>
                <td>{row.serial}</td>
                <td>{row.head}</td>
                <td>{row.report}</td>
                <td>{row.type}</td>
                <td><input type="checkbox" checked={row.lwp} readOnly /></td>
                <td><input type="checkbox" checked={row.ot} readOnly /></td>
                <td>{row.vType}</td>
                <td><input type="checkbox" checked={row.show} readOnly /></td>
                <td>{row.val}</td>
                <td style={{ textAlign: 'center' }}>
                  <Edit size={14} style={{ color: '#6c757d', cursor: 'pointer', marginRight: '10px' }} />
                  <Trash2 size={14} style={{ color: '#dc3545', cursor: 'pointer' }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px', color: '#6c757d', fontSize: '13px' }}>
        <div>
          Show 
          <select style={{ margin: '0 5px', padding: '2px 5px' }}><option>10</option></select>
          entries
        </div>
        <div>Showing 1 to 10 of 27 entries</div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span style={{ cursor: 'pointer', padding: '5px 10px' }}>Previous</span>
          <span style={{ cursor: 'pointer', padding: '5px 10px', backgroundColor: '#0dcaf0', color: 'white', borderRadius: '4px' }}>1</span>
          <span style={{ cursor: 'pointer', padding: '5px 10px' }}>2</span>
          <span style={{ cursor: 'pointer', padding: '5px 10px' }}>3</span>
          <span style={{ cursor: 'pointer', padding: '5px 10px' }}>Next</span>
        </div>
      </div>
    </div>
  );
}
