import React from 'react';
import { Search, Save, XCircle, Eye } from 'lucide-react';

export default function FeeEntry() {
  return (
    <div style={{ display: 'flex', gap: '20px', padding: '20px', background: '#fff', minHeight: '100%' }}>
      
      {/* Left Column - Student Profile */}
      <div style={{ width: '250px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', height: 'fit-content' }}>
        <div style={{ width: '120px', height: '120px', background: '#e5e7eb', borderRadius: '4px', marginBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', overflow: 'hidden' }}>
          <div style={{ width: '80px', height: '80px', background: '#9ca3af', borderRadius: '50% 50% 0 0', position: 'relative', top: '20px' }}>
             <div style={{ width: '40px', height: '40px', background: '#9ca3af', borderRadius: '50%', position: 'absolute', top: '-45px', left: '20px' }}></div>
          </div>
        </div>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px', fontWeight: 'bold', color: '#374151', lineHeight: 1.2 }}>
          <div>Name:</div>
          <div>Class:</div>
          <div>Roll No.:</div>
          <div>Admission No.:</div>
          <div>Status:</div>
          <div>Last Modified Date:</div>
          <div>Address:</div>
          <div>Father's Name:</div>
          <div>Mother's Name:</div>
          <div>Contact No.:</div>
          <div>Bill No.:</div>
          <div>Fees Group:</div>
          <div>Route Name:</div>
          <div>Stop Name:</div>
          <div>Father Mobile:</div>
          <div>Mother Mobile:</div>
          <div>DOB:</div>
          <div>DOA:</div>
          <div>DOJ:</div>
          <div>Category:</div>
        </div>
      </div>

      {/* Right Column - Entry Form */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Top Search */}
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

        {/* Form Details */}
        <div style={{ display: 'flex', gap: '20px' }}>
          
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', gap: '15px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Entry Mode</label>
                <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px' }}>
                  <option>School</option>
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Rec. Date</label>
                <input type="text" defaultValue="29-Aug-2026" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px' }} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '15px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Fees Type</label>
                <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px' }}>
                  <option>All Fee Types</option>
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Receipt No.</label>
                <input type="text" defaultValue="0" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px' }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Remarks</label>
                <input type="text" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px' }} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '15px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Installment</label>
                <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px' }}>
                  <option>None selected</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#374151' }}>Discount</label>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input type="checkbox" />
                <input type="text" defaultValue="0" style={{ width: '80px', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px' }} />
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#374151' }}>
                <input type="checkbox" /> Reuse Receipt
              </label>
            </div>
          </div>
          
        </div>

        {/* Action bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '15px', border: '1px solid #e5e7eb', borderRadius: '4px' }}>
          <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#374151' }}>Today's Collection : 0</span>
          <button style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            <Eye size={14} /> Show
          </button>
        </div>

        {/* Bottom Amounts and Save */}
        <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-end', marginTop: 'auto' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Total Amt. Being Paid</label>
            <input type="text" defaultValue="0.00" style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Dues Amt.:</label>
            <input type="text" defaultValue="0.00" style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Advance Amt.</label>
            <input type="text" defaultValue="0.00" style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }} />
          </div>
          <div style={{ display: 'flex', gap: '10px', height: '39px' }}>
            <button style={{ background: '#4ade80', color: '#fff', border: 'none', padding: '0 20px', borderRadius: '4px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <Save size={14} /> Save
            </button>
            <button style={{ background: '#f59e0b', color: '#fff', border: 'none', padding: '0 20px', borderRadius: '4px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <XCircle size={14} /> Reset
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
