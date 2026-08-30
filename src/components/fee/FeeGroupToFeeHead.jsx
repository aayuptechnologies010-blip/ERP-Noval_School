import React from 'react';
import { Save } from 'lucide-react';

export default function FeeGroupToFeeHead() {
  const data = [
    { id: 1, checked: false, type: 'School Fee', head: 'Admission Fee ( NEW STUDENT)', schedule: 'Lifetime', acc: 'Cheque Bounce', postAcc: 'NAVAL NATIONAL' },
    { id: 2, checked: false, type: 'School Fee', head: 'TUITION FEE', schedule: 'Installment', acc: 'Select Account', postAcc: 'Select Post Acc' },
    { id: 3, checked: false, type: 'School Fee', head: 'COMPOSITE FEE', schedule: 'Annual', acc: 'Select Account', postAcc: 'Select Post Acc' },
    { id: 4, checked: true, type: 'School Fee', head: 'Opening Balance', schedule: 'Installment', acc: 'Select Account', postAcc: 'Select Post Acc' },
    { id: 5, checked: true, type: 'School Fee', head: 'Open Dues', schedule: 'Annual', acc: 'Select Account', postAcc: 'Select Post Acc' },
    { id: 6, checked: true, type: 'School Fee', head: 'Discount', schedule: 'Installment', acc: 'Select Account', postAcc: 'Select Post Acc' },
    { id: 7, checked: true, type: 'School Fee', head: 'Late Fine', schedule: 'Installment', acc: 'Select Account', postAcc: 'Select Post Acc' },
  ];

  return (
    <div style={{ padding: '24px', background: '#fff', minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <div style={{ width: '100%', maxWidth: '1000px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        <div style={{ width: '400px', margin: '0 auto' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#333', marginBottom: '8px' }}>Fee Group</label>
          <select style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px', color: '#333' }}>
            <option>Select Fee Group</option>
          </select>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #e2e8f0', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '12px', textAlign: 'left', color: '#333', fontWeight: 600, width: '60px' }}>Sr. No.</th>
                <th style={{ padding: '12px', textAlign: 'center', color: '#333', fontWeight: 600, width: '80px' }}>Select All</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#333', fontWeight: 600 }}>Fee Type</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#333', fontWeight: 600 }}>Fee Head</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#333', fontWeight: 600 }}>Schedule Type</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#333', fontWeight: 600 }}>Installment</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#333', fontWeight: 600 }}>Fee Account</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#333', fontWeight: 600 }}>Fee Post Account</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '10px 12px', textAlign: 'left', color: '#095484' }}>{row.id}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                    <input type="checkbox" defaultChecked={row.checked} />
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'left', color: '#333' }}>{row.type}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'left', color: '#333' }}>{row.head}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'left', color: '#333' }}>{row.schedule}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'left' }}>
                    <select style={{ padding: '6px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', width: '100%' }}>
                      <option>Select Install</option>
                    </select>
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'left' }}>
                    <select style={{ padding: '6px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', width: '100%' }}>
                      <option>{row.acc}</option>
                    </select>
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'left' }}>
                    <select style={{ padding: '6px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', width: '100%' }}>
                      <option>{row.postAcc}</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button style={{ backgroundColor: '#4ade80', color: '#fff', border: 'none', padding: '8px 24px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 500 }}>
            <Save size={16} /> Save
          </button>
        </div>

      </div>

    </div>
  );
}
