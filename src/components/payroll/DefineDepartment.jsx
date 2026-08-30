import React from 'react';
import { Edit, Trash2, Plus, Download } from 'lucide-react';

export default function DefineDepartment() {
  const departments = [
    { id: 1, type: 'ADMINITRATION DEPT.' },
    { id: 2, type: 'OFFICE STAFF' },
    { id: 3, type: 'NON-TEACHING STAFF' },
    { id: 4, type: 'PRE-PRIMARY TEACHERS' },
    { id: 5, type: 'PRIMARY TEACHERS' },
    { id: 6, type: 'SENIOR TEACHERS' },
    { id: 7, type: 'MIDDLE SECTION TEACHER' }
  ];

  return (
    <div className="mail-template-container">
      <div className="mail-template-header">
        <input type="text" className="mail-search-input" placeholder="Search" />
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="add-template-btn">
            <Plus size={16} /> Add New Department
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
                  Department <span className="sort-arrows">↕</span>
                </div>
              </th>
              <th style={{ width: '100px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((row, index) => (
              <tr key={row.id} className={index % 2 === 0 ? 'row-even' : 'row-odd'}>
                <td style={{ textAlign: 'center' }}>{row.id}</td>
                <td>{row.type}</td>
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
        <div>Showing 1 to 7 of 7 entries</div>
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          <span style={{ color: '#6c757d', cursor: 'pointer' }}>Previous</span>
          <div style={{ backgroundColor: '#159BD7', color: 'white', padding: '4px 10px', borderRadius: '4px' }}>1</div>
          <span style={{ color: '#495057', cursor: 'pointer' }}>Next</span>
        </div>
      </div>
    </div>
  );
}
