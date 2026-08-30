import React from 'react';
import { Save } from 'lucide-react';

export default function RelateStaticDynamicHeads() {
  const data = [
    { id: 1, static: 'Basic Arrear', dynamic: 'Basic Arrear', selected: true },
    { id: 2, static: 'DA Arrear', dynamic: 'Dearness Allowance Arrear', selected: true },
    { id: 3, static: 'I-Tax', dynamic: 'Income Tax', selected: false },
    { id: 4, static: 'PF. Arrear', dynamic: 'NA', selected: false },
    { id: 5, static: 'Advance Recover', dynamic: 'Advance', selected: true },
    { id: 6, static: 'T.A', dynamic: 'Transport Allowance', selected: false },
    { id: 7, static: 'PF', dynamic: 'Provident Fund', selected: true, highlighted: true },
    { id: 8, static: 'HRA', dynamic: 'House Rent Allowance', selected: true, highlighted: true },
    { id: 9, static: 'DA', dynamic: 'Dearness Allowance', selected: true },
    { id: 10, static: 'VOL.PF', dynamic: 'Vol Provident Fund', selected: true },
    { id: 11, static: 'Bonus', dynamic: 'NA', selected: false },
    { id: 12, static: 'TA on DA', dynamic: 'NA', selected: false },
    { id: 13, static: 'TA ARREAR', dynamic: 'Transport Allowance Arrear', selected: true },
  ];

  return (
    <div className="mail-template-container">
      <div style={{ padding: '15px 20px', fontWeight: 'bold', fontSize: '14px', textTransform: 'uppercase', borderBottom: '1px solid #dee2e6' }}>
        Relate Static Dynamic Heads
      </div>

      <div className="mail-table-wrapper" style={{ borderTop: 'none', borderRadius: '0' }}>
        <table className="mail-table">
          <thead>
            <tr>
              <th style={{ paddingLeft: '20px' }}>Static Head</th>
              <th>Dynamic Head</th>
              <th style={{ width: '100px', textAlign: 'center' }}>Select</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} style={{ backgroundColor: row.highlighted ? '#e3f2fd' : 'transparent', borderBottom: '1px solid #dee2e6' }}>
                <td style={{ paddingLeft: '20px', paddingRight: '20px' }}>{row.static}</td>
                <td style={{ padding: '8px 20px' }}>
                  <select className="settings-input" style={{ width: '100%', padding: '4px 8px' }} defaultValue={row.dynamic}>
                    <option>{row.dynamic}</option>
                  </select>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <input type="checkbox" defaultChecked={row.selected} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px', borderTop: '1px solid #dee2e6' }}>
        <button style={{ backgroundColor: 'white', border: '1px solid #28a745', color: '#28a745', padding: '6px 20px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
          <Save size={16} /> Save
        </button>
      </div>
    </div>
  );
}
