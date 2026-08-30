import React from 'react';
import { Plus, Download, Edit, Trash2 } from 'lucide-react';

export default function DefineSalaryGroup() {
  const data = [
    { id: 1, name: 'Hourly Group', from: '500.00', to: '1000.00', gp: '0.00', ps: '0.00' },
    { id: 2, name: 'PB-00 00', from: '0.00', to: '0.00', gp: '0.00', ps: '0.00' },
    { id: 3, name: 'PB-01 18', from: '0.00', to: '0.00', gp: '1800.00', ps: '0.00' },
    { id: 4, name: 'PB-02 19', from: '0.00', to: '0.00', gp: '1900.00', ps: '0.00' },
    { id: 5, name: 'PB-03 20', from: '0.00', to: '0.00', gp: '2000.00', ps: '0.00' },
    { id: 6, name: 'PB-04 24', from: '0.00', to: '0.00', gp: '2400.00', ps: '0.00' },
    { id: 7, name: 'PB-05 26', from: '0.00', to: '0.00', gp: '2660.00', ps: '0.00' },
    { id: 8, name: 'PB-06 28', from: '0.00', to: '0.00', gp: '2800.00', ps: '0.00' },
    { id: 9, name: 'PB-07 42', from: '0.00', to: '0.00', gp: '4200.00', ps: '0.00' },
    { id: 10, name: 'PB-08 46', from: '0.00', to: '0.00', gp: '4600.00', ps: '0.00' },
  ];

  return (
    <div className="mail-template-container">
      <div className="mail-template-header">
        <div className="search-bar">
          <input type="text" placeholder="Search" className="search-input" />
        </div>
        <div className="header-buttons">
          <button className="btn-add">
            <Plus size={16} /> Add New Salary Group
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
              <th style={{ width: '60px' }}>Sl No.</th>
              <th>GroupName</th>
              <th>Basic From</th>
              <th>Basic To</th>
              <th>Grade Pay</th>
              <th>Pay Scale</th>
              <th style={{ width: '80px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={row.id} className={i % 2 === 0 ? 'row-even' : 'row-odd'}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.from}</td>
                <td>{row.to}</td>
                <td>{row.gp}</td>
                <td>{row.ps}</td>
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
        <div>Showing 1 to 10 of 14 entries</div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span style={{ cursor: 'pointer', padding: '5px 10px' }}>Previous</span>
          <span style={{ cursor: 'pointer', padding: '5px 10px', backgroundColor: '#0dcaf0', color: 'white', borderRadius: '4px' }}>1</span>
          <span style={{ cursor: 'pointer', padding: '5px 10px' }}>2</span>
          <span style={{ cursor: 'pointer', padding: '5px 10px' }}>Next</span>
        </div>
      </div>
    </div>
  );
}
