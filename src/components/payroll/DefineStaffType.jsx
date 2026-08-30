import React from 'react';
import { Edit, Trash2, Plus, Download } from 'lucide-react';

export default function DefineStaffType() {
  const staffTypes = [
    { id: 1, type: 'Management', hourly: 'No', showEcare: 'Yes' },
    { id: 2, type: 'Support Staff', hourly: 'No', showEcare: 'Yes' },
    { id: 3, type: 'PRIMARY TEACHERS', hourly: 'No', showEcare: 'Yes' },
    { id: 4, type: 'PRE-PRIM. TEACHERS', hourly: 'No', showEcare: 'Yes' },
    { id: 5, type: 'TEACHERS', hourly: 'No', showEcare: 'Yes' },
    { id: 6, type: 'Front Office/Accounts', hourly: 'No', showEcare: 'Yes' },
    { id: 7, type: 'OTHER', hourly: 'No', showEcare: 'No' },
    { id: 8, type: 'ADHOC', hourly: 'No', showEcare: 'No' },
    { id: 9, type: 'NON TEACHING', hourly: 'No', showEcare: 'No' },
    { id: 10, type: 'Cont Emp', hourly: 'Yes', showEcare: 'Yes' },
  ];

  return (
    <div className="mail-template-container">
      <div className="mail-template-header">
        <input type="text" className="mail-search-input" placeholder="Search" />
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="add-template-btn">
            <Plus size={16} /> Add New Staff Type
          </button>
          <button className="add-template-btn">
            <Download size={16} /> Export
          </button>
        </div>
      </div>
      
      <div className="mail-table-wrapper">
        <table className="mail-table">
          <thead>
            <tr>
              <th style={{ width: '80px', textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                  Sr No. <span className="sort-arrows">↕</span>
                </div>
              </th>
              <th>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  Staff Type <span className="sort-arrows">↕</span>
                </div>
              </th>
              <th style={{ width: '150px', textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                  Hourly <span className="sort-arrows">↕</span>
                </div>
              </th>
              <th style={{ width: '150px', textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                  Show On e-Care <span className="sort-arrows">↕</span>
                </div>
              </th>
              <th style={{ width: '100px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {staffTypes.map((row, index) => (
              <tr key={row.id} className={index % 2 === 0 ? 'row-even' : 'row-odd'}>
                <td style={{ textAlign: 'center' }}>{row.id}</td>
                <td>{row.type}</td>
                <td style={{ textAlign: 'center' }}>{row.hourly}</td>
                <td style={{ textAlign: 'center' }}>{row.showEcare}</td>
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

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', fontSize: '13px' }}>
        <div className="mail-pagination" style={{ margin: 0 }}>
          Show 
          <select defaultValue="10" className="entries-select">
            <option value="10">10</option>
          </select>
          entries
        </div>
        <div>Showing 1 to 10 of 13 entries</div>
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          <span style={{ color: '#6c757d', cursor: 'pointer' }}>Previous</span>
          <div style={{ backgroundColor: '#159BD7', color: 'white', padding: '4px 10px', borderRadius: '4px' }}>1</div>
          <div style={{ color: '#495057', padding: '4px 10px', cursor: 'pointer' }}>2</div>
          <span style={{ color: '#495057', cursor: 'pointer' }}>Next</span>
        </div>
      </div>
    </div>
  );
}
