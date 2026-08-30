import React from 'react';
import { Plus, Download } from 'lucide-react';

export default function AdvanceRepayment() {
  return (
    <div className="mail-template-container">
      <div className="mail-template-header">
        <div className="search-bar">
          <input type="text" placeholder="Search" className="search-input" />
        </div>
        <div className="header-buttons">
          <button className="btn-add">
            <Plus size={16} /> Add New Advance Re-payments
          </button>
          <button className="btn-export">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <div className="mail-table-wrapper" style={{ overflowX: 'auto' }}>
        <table className="mail-table" style={{ minWidth: '1000px' }}>
          <thead>
            <tr>
              <th style={{ width: '80px' }}>Sl No. <span style={{ fontSize: '10px' }}>▼</span></th>
              <th>Name <span style={{ fontSize: '10px' }}>▼</span></th>
              <th>Narration <span style={{ fontSize: '10px' }}>▼</span></th>
              <th>Amount <span style={{ fontSize: '10px' }}>▼</span></th>
              <th>Left Amt <span style={{ fontSize: '10px' }}>▼</span></th>
              <th>Date <span style={{ fontSize: '10px' }}>▼</span></th>
              <th>Account Name <span style={{ fontSize: '10px' }}>▼</span></th>
              <th>Cheque No. <span style={{ fontSize: '10px' }}>▼</span></th>
              <th style={{ width: '80px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="9" style={{ textAlign: 'center', padding: '20px', color: '#6c757d', backgroundColor: '#f8f9fa' }}>
                No data available in table
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px', color: '#6c757d', fontSize: '13px' }}>
        <div>
          Show 
          <select style={{ margin: '0 5px', padding: '2px 5px' }}><option>10</option></select>
          entries
        </div>
        <div>Showing 0 to 0 of 0 entries</div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <span style={{ cursor: 'pointer' }}>Previous</span>
          <span style={{ cursor: 'pointer' }}>Next</span>
        </div>
      </div>
    </div>
  );
}
