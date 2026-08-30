import React from 'react';

export default function FeesUploadFromTally() {
  return (
    <div style={{ padding: '20px', background: '#fff', minHeight: '100%' }}>
      
      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Upload Excel File</label>
            <div style={{ display: 'flex' }}>
              <input type="text" style={{ flex: 1, padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px 0 0 4px', outline: 'none', fontSize: '12px' }} />
              <button style={{ background: '#e5e7eb', border: '1px solid #d1d5db', borderLeft: 'none', padding: '0 15px', borderRadius: '0 4px 4px 0', cursor: 'pointer', fontSize: '12px', color: '#374151' }}>
                Select file
              </button>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Fee Type</label>
            <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px' }}>
              <option>School Fee</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Date Format</label>
            <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px' }}>
              <option>dd-MM-yyy</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Adjust Type</label>
            <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px' }}>
              <option>Adjust From Starting</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Installment</label>
            <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px' }}>
              <option>April</option>
            </select>
          </div>
        </div>

      </div>

      <div style={{ marginTop: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '10px' }}>
          <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#374151' }}>Details</div>
          <a href="#" style={{ fontSize: '12px', color: '#29a9d8', textDecoration: 'none' }}>Sample Data</a>
        </div>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
              <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Sr. No.</th>
              <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Student Name</th>
              <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Adm No.</th>
              <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Class</th>
              <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Head Amount</th>
              <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Amount</th>
              <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Receiving Date</th>
              <th style={{ padding: '8px', textAlign: 'left', color: '#374151', border: '1px solid #e5e7eb' }}>Status</th>
              <th style={{ padding: '8px', textAlign: 'center', color: '#374151', border: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                  <input type="checkbox" /> Fine Waive Off
                </div>
              </th>
              <th style={{ padding: '8px', textAlign: 'center', color: '#374151', border: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                  <input type="checkbox" /> Select Fees
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="10" style={{ padding: '15px', textAlign: 'center', color: '#6b7280', background: '#f3f4f6', border: '1px solid #e5e7eb' }}>
                No records found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}
