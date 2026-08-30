import React from 'react';
import { Plus, Download, Edit, Trash2 } from 'lucide-react';

export default function DefineITHeadGroups() {
  const data = [
    { id: 1, sl: 1, name: 'House Rent Paid', limit: '0.00', pct: '100.00', date: '27-Mar-2015' },
    { id: 2, sl: 2, name: 'Interest of loan', limit: '200000.00', pct: '100.00', date: '31-May-2018' },
    { id: 3, sl: 3, name: '80 CC', limit: '150000.00', pct: '100.00', date: '27-Mar-2015' },
    { id: 4, sl: 4, name: 'Infra Bond', limit: '20000.00', pct: '100.00', date: '05-Jan-2015' },
    { id: 5, sl: 5, name: '89 I Tax Relief', limit: '0.00', pct: '100.00', date: '31-May-2018' },
    { id: 6, sl: 6, name: 'Other Section', limit: '0.00', pct: '100.00', date: '05-Jan-2015' },
    { id: 7, sl: 7, name: 'Extra Income', limit: '0.00', pct: '100.00', date: '05-Jan-2015' },
    { id: 8, sl: 8, name: 'National Pension Scheme', limit: '50000.00', pct: '100.00', date: '03-Feb-2018' },
    { id: 9, sl: 9, name: 'Other Sec 50', limit: '0.00', pct: '50.00', date: '03-Feb-2018' },
    { id: 10, sl: 10, name: 'Perq 12B', limit: '0.00', pct: '100.00', date: '03-Feb-2018' },
  ];

  return (
    <div className="mail-template-container">
      <div className="mail-template-header">
        <div className="search-bar">
          <input type="text" placeholder="Search" className="search-input" />
        </div>
        <div className="header-buttons">
          <button className="btn-add">
            <Plus size={16} /> Add New IT Head Group
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
              <th style={{ width: '60px' }}>Sr. No.</th>
              <th style={{ width: '60px' }}>Sl. No.</th>
              <th>Group Name</th>
              <th>Max Rebate Limit</th>
              <th>Percentage</th>
              <th>Modify Date</th>
              <th style={{ width: '80px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={row.id} className={i % 2 === 0 ? 'row-even' : 'row-odd'}>
                <td>{row.id}</td>
                <td>{row.sl}</td>
                <td>{row.name}</td>
                <td>{row.limit}</td>
                <td>{row.pct}</td>
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
