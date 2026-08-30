import React from 'react';
import { Edit, Trash2, Plus } from 'lucide-react';

export default function DefineMailTemplate() {
  const templates = [
    { id: 1, type: 'Fee Deposition', email: 'safzdfbgdfxb', active: 'True' },
    { id: 2, type: 'Defaulter SMS', email: 'dvdzxvgDSVGxv', active: 'True' },
    { id: 3, type: 'Registration SMS', email: 'dvdcxbvdsbZXbdc', active: 'True' },
    { id: 4, type: 'Admission SMS', email: 'dsvdbvdsbdsvb', active: 'True' },
    { id: 5, type: 'Item Maintainance', email: 'dvbdxbDSBfcxdb', active: 'True' },
    { id: 6, type: 'Cheque Bounce', email: 'dsvcxbsbdsb dfbfgnb', active: 'True' },
    { id: 7, type: 'Permit For UP', email: 'dsvdzxcvbdcxb', active: 'True' },
    { id: 8, type: 'Vehicle Fitness', email: 'dsvdzxvbdxcbc', active: 'True' },
    { id: 9, type: 'Salary SMS', email: 'HI, This mail is for salary. Now i m updated on this.', active: 'True' },
    { id: 10, type: 'Item approaching out of stock', email: 'sxczxvzxvZXAv', active: 'True' },
    { id: 11, type: 'Slot SMS', email: 'Hello, This is not specific mail', active: 'True' },
    { id: 12, type: 'Bill Generation', email: 'dsvzxvdzxvdavcx', active: 'True' },
  ];

  return (
    <div className="mail-template-container">
      <div className="mail-template-header">
        <input type="text" className="mail-search-input" placeholder="Search" />
        <button className="add-template-btn">
          <Plus size={16} /> Add New Template
        </button>
      </div>
      
      <div className="mail-table-wrapper">
        <table className="mail-table">
          <thead>
            <tr>
              <th style={{ width: '80px', textAlign: 'center' }}>Sr. No.</th>
              <th style={{ width: '250px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  E-Mail Type <span className="sort-arrows">↕</span>
                </div>
              </th>
              <th>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  E-Mail <span className="sort-arrows">↕</span>
                </div>
              </th>
              <th style={{ width: '100px', textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                  Active <span className="sort-arrows">↕</span>
                </div>
              </th>
              <th style={{ width: '100px', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {templates.map((row, index) => (
              <tr key={row.id} className={index % 2 === 0 ? 'row-even' : 'row-odd'}>
                <td style={{ textAlign: 'center' }}>{row.id}</td>
                <td>{row.type}</td>
                <td>{row.email}</td>
                <td style={{ textAlign: 'center' }}>{row.active}</td>
                <td>
                  <div className="action-icons">
                    <Edit size={16} color="#6c757d" style={{ cursor: 'pointer' }} />
                    <Trash2 size={16} color="#dc3545" style={{ cursor: 'pointer' }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mail-pagination">
        Show 
        <select defaultValue="10" className="entries-select">
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
        entries
      </div>
    </div>
  );
}
