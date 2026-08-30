import React, { useState } from 'react';
import { Search, Plus, Download } from 'lucide-react';

export default function DefineConcession() {
  const [entries, setEntries] = useState(10);

  return (
    <div style={{ padding: '20px', background: '#fff', minHeight: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ position: 'relative', width: '300px' }}>
          <Search size={16} style={{ position: 'absolute', left: '10px', top: '9px', color: '#6b7280' }} />
          <input 
            type="text" 
            placeholder="Search Concession" 
            style={{ width: '100%', padding: '8px 10px 8px 32px', border: '1px solid #d1d5db', borderRadius: '20px', fontSize: '13px', outline: 'none' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            <Plus size={14} /> Add New Head
          </button>
          <button style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            <Download size={14} /> Export
          </button>
        </div>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold' }}>Sr No. <span style={{fontSize:'10px', color:'#9ca3af', marginLeft:'4px'}}>▲</span></th>
            <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold' }}>Concession Name <span style={{fontSize:'10px', color:'#9ca3af', marginLeft:'4px'}}>◆</span></th>
            <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold' }}>Concession Type <span style={{fontSize:'10px', color:'#9ca3af', marginLeft:'4px'}}>◆</span></th>
            <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold' }}>Modified Date <span style={{fontSize:'10px', color:'#9ca3af', marginLeft:'4px'}}>◆</span></th>
            <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 'bold' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#6b7280', borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
              No data available in table
            </td>
          </tr>
        </tbody>
      </table>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px', fontSize: '12px', color: '#4b5563' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span>Show</span>
          <select 
            value={entries} 
            onChange={(e) => setEntries(e.target.value)}
            style={{ padding: '4px 8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', width:'50px' }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span>entries</span>
        </div>
        <div>Showing 0 to 0 of 0 entries</div>
        <div style={{ display: 'flex', gap: '15px', color: '#9ca3af', cursor: 'not-allowed' }}>
          <span>Previous</span>
          <span>Next</span>
        </div>
      </div>
    </div>
  );
}
