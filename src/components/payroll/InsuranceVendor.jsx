import React from 'react';
import { Plus, Download, Edit, Trash2 } from 'lucide-react';

export default function InsuranceVendor() {
  const data = [
    { id: 1, vendor: 'LIC' },
    { id: 2, vendor: 'HDFC' },
    { id: 3, vendor: 'AA&A' },
    { id: 4, vendor: 'HDFC3' },
  ];

  return (
    <div className="mail-template-container">
      <div className="mail-template-header">
        <div className="search-bar">
          <input type="text" placeholder="Search" className="search-input" />
        </div>
        <div className="header-buttons">
          <button className="btn-add">
            <Plus size={16} /> Add New Insurance Vendor
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
              <th style={{ width: '80px' }}>Sr. No.</th>
              <th>Vendor</th>
              <th style={{ width: '100px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={row.id} className={i % 2 === 0 ? 'row-even' : 'row-odd'}>
                <td>{row.id}</td>
                <td>{row.vendor}</td>
                <td style={{ textAlign: 'center' }}>
                  <Edit size={14} style={{ color: '#6c757d', cursor: 'pointer', marginRight: '15px' }} />
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
      </div>
    </div>
  );
}
