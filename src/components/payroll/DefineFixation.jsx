import React from 'react';
import { Plus, Download, Edit, Trash2 } from 'lucide-react';

export default function DefineFixation() {
  const data = [
    { id: 1, scale: '5300-125-9800', basic: '50.00', da: '21.00', gp: '2400.00', amt: '5300.00' },
    { id: 2, scale: '5300-125-9800', basic: '50.00', da: '21.00', gp: '2400.00', amt: '5300.00' },
    { id: 3, scale: '5300-125-9800', basic: '50.00', da: '21.00', gp: '2400.00', amt: '5300.00' },
    { id: 4, scale: '5300-125-9800', basic: '15.00', da: '2.00', gp: '2600.00', amt: '5300.00' },
    { id: 5, scale: '5300-150-10500', basic: '50.00', da: '24.00', gp: '2800.00', amt: '5200.00' },
    { id: 6, scale: '5300-125-9800', basic: '50.00', da: '21.00', gp: '4600.00', amt: '5300.00' },
  ];

  return (
    <div className="mail-template-container">
      <div className="mail-template-header">
        <div className="search-bar">
          <input type="text" placeholder="Search" className="search-input" />
        </div>
        <div className="header-buttons">
          <button className="btn-add">
            <Plus size={16} /> Add New Fixation
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
              <th>Pay Scale</th>
              <th>Basic (%)</th>
              <th>DA (%)</th>
              <th>Grade Pay</th>
              <th>Pay Scale Amount</th>
              <th style={{ width: '80px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={row.id} className={i % 2 === 0 ? 'row-even' : 'row-odd'}>
                <td>{row.id}</td>
                <td>{row.scale}</td>
                <td>{row.basic}</td>
                <td>{row.da}</td>
                <td>{row.gp}</td>
                <td>{row.amt}</td>
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
        <div>Showing 1 to 6 of 6 entries</div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span style={{ cursor: 'pointer', padding: '5px 10px' }}>Previous</span>
          <span style={{ cursor: 'pointer', padding: '5px 10px', backgroundColor: '#0dcaf0', color: 'white', borderRadius: '4px' }}>1</span>
          <span style={{ cursor: 'pointer', padding: '5px 10px' }}>Next</span>
        </div>
      </div>
    </div>
  );
}
