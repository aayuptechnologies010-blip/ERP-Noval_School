import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

const OPTIONS = [
  'Single Receipt',
  'School Wise Receipt',
  'Feetype Wise Receipt',
  'School with Feetype Wise Receipt',
  'Bank Wise Receipt'
];

const MOCK_DATA = {
  'Single Receipt': [
    { id: 1, label: null }
  ],
  'School Wise Receipt': [
    { id: 1, label: 'NAVALS NATIONAL ACADEMY' }
  ],
  'Feetype Wise Receipt': [
    { id: 1, label: 'School Fee' }
  ],
  'School with Feetype Wise Receipt': [
    { id: 1, label: 'School Fee' }
  ],
  'Bank Wise Receipt': [
    { id: 1, label: 'NAVAL NATIONAL ACADEMY GENERAL' },
    { id: 2, label: 'NAVAL NATIONAL ACADEMY BANK' }
  ]
};

export default function FeeReceiptNumberSetting() {
  const [selectedOption, setSelectedOption] = useState('Single Receipt');

  const getFirstColumnLabel = () => {
    switch(selectedOption) {
      case 'School Wise Receipt': return 'School Name';
      case 'Feetype Wise Receipt': return 'Fee Type';
      case 'School with Feetype Wise Receipt': return 'Fee Type';
      case 'Bank Wise Receipt': return 'Bank Name';
      default: return null;
    }
  };

  const firstColumnLabel = getFirstColumnLabel();
  const rows = MOCK_DATA[selectedOption];

  return (
    <div style={{ padding: '24px 32px', background: '#fff', minHeight: '100%', display: 'flex', gap: '48px' }}>
      
      {/* Left Column: Radio Buttons */}
      <div style={{ width: '280px', flexShrink: 0, marginTop: '32px' }}>
        {OPTIONS.map(option => (
          <div key={option} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', cursor: 'pointer' }} onClick={() => setSelectedOption(option)}>
            <div style={{ 
              width: '14px', height: '14px', borderRadius: '50%', 
              border: selectedOption === option ? '4px solid #29a9d8' : '1px solid #cbd5e1',
              boxSizing: 'border-box'
            }} />
            <span style={{ fontSize: '13px', color: '#333' }}>{option}</span>
          </div>
        ))}
      </div>

      {/* Right Column: Settings Table */}
      <div style={{ flex: 1, marginTop: '8px' }}>
        <p style={{ fontSize: '13px', color: '#333', marginBottom: '12px' }}>Set below details</p>
        
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '2px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
                {firstColumnLabel && (
                  <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: '#333', borderRight: '1px solid #e2e8f0' }}>
                    {firstColumnLabel}
                  </th>
                )}
                <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: '#333', borderRight: '1px solid #e2e8f0' }}>Prefix</th>
                <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: '#333', borderRight: '1px solid #e2e8f0' }}>Lead Zero</th>
                <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: '#333', borderRight: '1px solid #e2e8f0' }}>RCPT No. Start</th>
                <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: '#333' }}>Suffix</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={row.id} style={{ borderBottom: index === rows.length - 1 ? 'none' : '1px solid #e2e8f0' }}>
                  {firstColumnLabel && (
                    <td style={{ padding: '8px 12px', color: '#333', borderRight: '1px solid #e2e8f0', verticalAlign: 'middle', maxWidth: '200px', wordWrap: 'break-word' }}>
                      {row.label}
                    </td>
                  )}
                  <td style={{ padding: '8px', borderRight: '1px solid #e2e8f0' }}>
                    <input 
                      type="text" 
                      placeholder="Enter Prefix" 
                      style={{ width: '100%', padding: '6px 8px', border: '1px solid #e2e8f0', borderRadius: '2px', outline: 'none', fontSize: '12px' }} 
                    />
                  </td>
                  <td style={{ padding: '8px', borderRight: '1px solid #e2e8f0' }}>
                    <input 
                      type="text" 
                      defaultValue={selectedOption === 'Single Receipt' ? '' : '0'} 
                      placeholder="Lead Zero" 
                      style={{ width: '100%', padding: '6px 8px', border: '1px solid #e2e8f0', borderRadius: '2px', outline: 'none', fontSize: '12px' }} 
                    />
                  </td>
                  <td style={{ padding: '8px', borderRight: '1px solid #e2e8f0' }}>
                    <input 
                      type="text" 
                      defaultValue="1" 
                      style={{ width: '100%', padding: '6px 8px', border: '1px solid #e2e8f0', borderRadius: '2px', outline: 'none', fontSize: '12px' }} 
                    />
                  </td>
                  <td style={{ padding: '8px' }}>
                    <input 
                      type="text" 
                      placeholder={selectedOption === 'School Wise Receipt' ? 'Enter Postfix' : 'Enter Suffix'} 
                      style={{ width: '100%', padding: '6px 8px', border: '1px solid #e2e8f0', borderRadius: '2px', outline: 'none', fontSize: '12px' }} 
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Update Button */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
          <button style={{ 
            backgroundColor: '#29a9d8', color: '#fff', border: 'none', padding: '8px 24px', 
            borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 500
          }}>
            <RefreshCw size={14} /> Update
          </button>
        </div>

      </div>

    </div>
  );
}
