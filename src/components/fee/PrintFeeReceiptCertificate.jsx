import React from 'react';
import { Search, Printer } from 'lucide-react';

export default function PrintFeeReceiptCertificate() {
  return (
    <div style={{ display: 'flex', gap: '20px', padding: '20px', background: '#fff', minHeight: '100%' }}>
      {/* Left Column */}
      <div style={{ width: '250px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', height: 'fit-content' }}>
        <div style={{ width: '120px', height: '120px', background: '#e5e7eb', borderRadius: '4px', marginBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', overflow: 'hidden' }}>
          <div style={{ width: '80px', height: '80px', background: '#9ca3af', borderRadius: '50% 50% 0 0', position: 'relative', top: '20px' }}>
             <div style={{ width: '40px', height: '40px', background: '#9ca3af', borderRadius: '50%', position: 'absolute', top: '-45px', left: '20px' }}></div>
          </div>
        </div>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px', fontWeight: 'bold', color: '#374151', lineHeight: 1.2 }}>
          <div>Name:</div>
          <div>Address:</div>
          <div>Father's Name:</div>
          <div>Admission No.:</div>
          <div>Class:</div>
          <div>Fees Group:</div>
        </div>
      </div>

      {/* Right Column */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#374151' }}>Search Receipt by</span>
          <select style={{ width: '150px', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px' }}>
            <option>Student Details</option>
          </select>
        </div>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <select style={{ width: '150px', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px' }}>
            <option>All Classes</option>
          </select>
          <select style={{ width: '150px', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px' }}>
            <option>All Section</option>
          </select>
          <div style={{ display: 'flex', flex: 1 }}>
            <input type="text" style={{ flex: 1, padding: '8px 12px', border: '1px solid #d1d5db', borderRight: 'none', borderRadius: '4px 0 0 4px', outline: 'none', fontSize: '12px' }} />
            <button style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '0 15px', borderRadius: '0 4px 4px 0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Search size={16} />
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Installment</label>
            <select style={{ width: '150px', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px' }}>
              <option>All (11)</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <Printer size={14} /> Print NO-DUES
            </button>
            <button style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <Printer size={14} /> Print Certificate
            </button>
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px', fontSize: '11px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ padding: '8px', textAlign: 'left', color: '#374151' }}>Receipt No.</th>
              <th style={{ padding: '8px', textAlign: 'left', color: '#374151' }}>Fees Type</th>
              <th style={{ padding: '8px', textAlign: 'left', color: '#374151' }}>Receipt Date</th>
              <th style={{ padding: '8px', textAlign: 'left', color: '#374151' }}>Name</th>
              <th style={{ padding: '8px', textAlign: 'left', color: '#374151' }}>Adm. No.</th>
              <th style={{ padding: '8px', textAlign: 'left', color: '#374151' }}>Paid Amt.</th>
              <th style={{ padding: '8px', textAlign: 'left', color: '#374151' }}>Cheque/DD/NEFT</th>
              <th style={{ padding: '8px', textAlign: 'left', color: '#374151' }}>Duration</th>
              <th style={{ padding: '8px', textAlign: 'left', color: '#374151' }}>Print Receipt</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    </div>
  );
}
