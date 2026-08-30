import React from 'react';
import { Plus, Download, Edit, Trash2 } from 'lucide-react';

export default function DefineGradePay() {
  const data = [
    { id: 1, amount: '2400.00', date: '21 Jul 2016' },
    { id: 2, amount: '2600.00', date: '21 Jul 2016' },
    { id: 3, amount: '2800.00', date: '21 Jul 2016' },
    { id: 4, amount: '4200.00', date: '21 Jul 2016' },
    { id: 5, amount: '4600.00', date: '21 Jul 2016' },
    { id: 6, amount: '4800.00', date: '21 Jul 2016' },
    { id: 7, amount: '2600.00', date: '21 Jul 2016' },
    { id: 8, amount: '2600.00', date: '21 Jul 2016' },
    { id: 9, amount: '2600.00', date: '22 Jul 2016' },
    { id: 10, amount: '2000.00', date: '12 Jun 2017' },
  ];

  return (
    <div className="mail-template-container">
      <div className="mail-template-header">
        <div className="search-bar">
          <input type="text" placeholder="Search" className="search-input" />
        </div>
        <div className="header-buttons">
          <button className="btn-add">
            <Plus size={16} /> Add New Grade Pay
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
              <th style={{ width: '60px' }}>Sr No.</th>
              <th>Amount</th>
              <th>Modified Date</th>
              <th style={{ width: '80px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={row.id} className={i % 2 === 0 ? 'row-even' : 'row-odd'}>
                <td>{row.id}</td>
                <td>{row.amount}</td>
                <td>{row.date}</td>
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
        <div>Showing 1 to 10 of 10 entries</div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span style={{ cursor: 'pointer', padding: '5px 10px' }}>Previous</span>
          <span style={{ cursor: 'pointer', padding: '5px 10px', backgroundColor: '#0dcaf0', color: 'white', borderRadius: '4px' }}>1</span>
          <span style={{ cursor: 'pointer', padding: '5px 10px' }}>Next</span>
        </div>
      </div>
    </div>
  );
}
