import React from 'react';
import { Search, Plus, Download, Edit, Trash2 } from 'lucide-react';

export default function DefineFeeType() {
  const data = [
    { id: 1, name: 'School Fee', pref: 1, modified: '31-Mar-2026' }
  ];

  return (
    <div style={{ padding: '24px', background: '#fff', minHeight: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e2e8f0', borderRadius: '4px', padding: '6px 12px', width: '300px' }}>
          <Search size={16} color="#94a3b8" />
          <input type="text" placeholder="Search Fee Type" style={{ border: 'none', outline: 'none', marginLeft: '8px', fontSize: '13px', width: '100%' }} />
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ backgroundColor: '#29a9d8', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
            <Plus size={16} /> Add New Head
          </button>
          <button style={{ backgroundColor: '#29a9d8', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #e2e8f0', fontSize: '13px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
            <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333', fontWeight: 600 }}>Sr No.</th>
            <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333', fontWeight: 600 }}>Fee Type</th>
            <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333', fontWeight: 600 }}>Preference No.</th>
            <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333', fontWeight: 600 }}>Modified Date</th>
            <th style={{ padding: '12px', textAlign: 'center', color: '#333', fontWeight: 600 }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '10px 12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#095484' }}>{row.id}</td>
              <td style={{ padding: '10px 12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333' }}>{row.name}</td>
              <td style={{ padding: '10px 12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333' }}>{row.pref}</td>
              <td style={{ padding: '10px 12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333' }}>{row.modified}</td>
              <td style={{ padding: '10px 12px', textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '12px' }}>
                <Edit size={14} color="#64748b" style={{ cursor: 'pointer' }} />
                <Trash2 size={14} color="#ef4444" style={{ cursor: 'pointer' }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', fontSize: '13px', color: '#333' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>Show</span>
          <select style={{ padding: '4px 8px', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
            <option>10</option>
          </select>
          <span>entries</span>
        </div>
        <div>Showing 1 to 1 of 1 entries</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b' }}>Previous</button>
          <button style={{ border: 'none', background: '#0ea5e9', color: '#fff', width: '28px', height: '28px', borderRadius: '4px', cursor: 'pointer' }}>1</button>
          <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#333' }}>Next</button>
        </div>
      </div>
    </div>
  );
}
