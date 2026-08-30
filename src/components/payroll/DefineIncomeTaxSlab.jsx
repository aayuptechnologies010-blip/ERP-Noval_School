import React from 'react';
import { Plus, Download, Edit, Trash2 } from 'lucide-react';

export default function DefineIncomeTaxSlab() {
  const data = [
    { id: 1, type: 'Tax payable in Existing Regime', group: 'For Female', sl: 1, lower: '0.00', upper: '0.00', tax: '0.00' },
    { id: 2, type: 'Tax payable in Existing Regime', group: 'For Female', sl: 2, lower: '250001.00', upper: '500000.00', tax: '10.00' },
    { id: 3, type: 'Tax payable in Existing Regime', group: 'For Female', sl: 3, lower: '500001.00', upper: '1000000.00', tax: '20.00' },
    { id: 4, type: 'Tax payable in Existing Regime', group: 'For Female', sl: 4, lower: '1000001.00', upper: '10000000.00', tax: '30.00' },
    { id: 5, type: 'Tax payable in Existing Regime', group: 'For Female', sl: 5, lower: '12000.00', upper: '18000.00', tax: '3.00' },
    { id: 6, type: 'Tax payable in Existing Regime', group: 'For Female', sl: 6, lower: '45.00', upper: '150.00', tax: '5.00' },
    { id: 7, type: 'Tax payable in Existing Regime', group: 'For Male', sl: 1, lower: '0.00', upper: '250000.00', tax: '0.00' },
    { id: 8, type: 'Tax payable in Existing Regime', group: 'For Male', sl: 2, lower: '250001.00', upper: '500000.00', tax: '10.00' },
    { id: 9, type: 'Tax payable in Existing Regime', group: 'For Male', sl: 3, lower: '500001.00', upper: '1000000.00', tax: '20.00' },
    { id: 10, type: 'Tax payable in Existing Regime', group: 'For Male', sl: 4, lower: '1000001.00', upper: '10000000.00', tax: '30.00' },
  ];

  return (
    <div className="mail-template-container">
      <div className="mail-template-header">
        <div className="search-bar">
          <input type="text" placeholder="Search" className="search-input" />
        </div>
        <div className="header-buttons">
          <button className="btn-add">
            <Plus size={16} /> Add New Income Tax Slab
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
              <th>IT Slab Type</th>
              <th>Group Name</th>
              <th>Group Sl No.</th>
              <th>Lower Bound</th>
              <th>Upper Bound</th>
              <th>Tax</th>
              <th style={{ width: '80px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={row.id} className={i % 2 === 0 ? 'row-even' : 'row-odd'}>
                <td>{row.id}</td>
                <td>{row.type}</td>
                <td>{row.group}</td>
                <td>{row.sl}</td>
                <td>{row.lower}</td>
                <td>{row.upper}</td>
                <td>{row.tax}</td>
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
        <div>Showing 1 to 10 of 13 entries</div>
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
