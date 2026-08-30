import React from 'react';
import { Plus, Download } from 'lucide-react';

export default function DefineStaffDocumentType() {
  return (
    <div className="mail-template-container">
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', padding: '20px', borderBottom: '1px solid #dee2e6' }}>
        <label className="checkbox-label" style={{ fontWeight: 'normal', color: '#159BD7' }}>
          <input type="radio" name="doc_tab" defaultChecked /> Define Document Type
        </label>
        <label className="checkbox-label" style={{ fontWeight: 'normal', color: '#495057' }}>
          <input type="radio" name="doc_tab" /> Define Document
        </label>
      </div>

      <div className="mail-template-header" style={{ marginTop: '10px' }}>
        <input type="text" className="mail-search-input" placeholder="Search" />
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="add-template-btn">
            <Plus size={16} /> Add New Documents
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
                  Document Type <span className="sort-arrows">↕</span>
                </div>
              </th>
              <th>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', justifyContent: 'center' }}>
                  Document Name <span className="sort-arrows">↕</span>
                </div>
              </th>
              <th style={{ width: '150px', textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                  Last Modified <span className="sort-arrows">↕</span>
                </div>
              </th>
              <th style={{ width: '100px', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '15px', color: '#6c757d', backgroundColor: '#f8f9fa' }}>
                No data available in table
              </td>
            </tr>
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
        <div style={{ color: '#6c757d' }}>Showing 0 to 0 of 0 entries</div>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <span style={{ color: '#adb5bd' }}>Previous</span>
          <span style={{ color: '#adb5bd' }}>Next</span>
        </div>
      </div>
    </div>
  );
}
