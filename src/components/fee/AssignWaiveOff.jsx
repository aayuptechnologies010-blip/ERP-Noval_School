import React from 'react';
import { Search, Eye, XCircle } from 'lucide-react';

export default function AssignWaiveOff() {
  return (
    <div style={{ padding: '20px', background: '#fff', minHeight: '100%', display: 'flex', gap: '20px' }}>
      
      {/* Left Column - Student Profile */}
      <div style={{ width: '250px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '120px', height: '120px', background: '#e5e7eb', borderRadius: '4px', marginBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', overflow: 'hidden' }}>
          {/* Simple avatar placeholder using CSS */}
          <div style={{ width: '80px', height: '80px', background: '#9ca3af', borderRadius: '50% 50% 0 0', position: 'relative', top: '20px' }}>
             <div style={{ width: '40px', height: '40px', background: '#9ca3af', borderRadius: '50%', position: 'absolute', top: '-45px', left: '20px' }}></div>
          </div>
        </div>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px', fontWeight: 'bold', color: '#374151' }}>
          <div>Name:</div>
          <div>Address:</div>
          <div>Father's Name:</div>
          <div>Mother's Name:</div>
          <div>Contact No.:</div>
          <div>Admission No.:</div>
          <div>Bill No.:</div>
          <div>Class:</div>
          <div>Fees Group:</div>
        </div>
      </div>

      {/* Right Column */}
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
            <button style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '0 15px', borderRadius: '0 4px 4px 0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
              <Search size={14} /> Search
            </button>
          </div>
        </div>

        {/* Fees Settings */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-end' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>Fees Type</label>
            <select style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px' }}>
              <option>School Fee</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>Installment</label>
            <select style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px' }}>
              <option>Please Select</option>
            </select>
          </div>
          <div>
            <button style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', fontSize: '12px' }}>
              <Eye size={14} /> Show
            </button>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>Reason</label>
            <input type="text" style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px' }} />
          </div>
        </div>

        {/* Fee Details Sections */}
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '4px', minHeight: '120px' }}>
          <div style={{ padding: '10px 15px', borderBottom: '1px solid #e5e7eb', fontSize: '12px', fontWeight: 'bold', color: '#374151', background: '#f9fafb' }}>Fee Details</div>
        </div>
        
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '4px', minHeight: '120px' }}>
          <div style={{ padding: '10px 15px', borderBottom: '1px solid #e5e7eb', fontSize: '12px', fontWeight: 'bold', color: '#374151', background: '#f9fafb' }}>Fee Details</div>
        </div>

        {/* Reset Button */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <button style={{ background: '#f59e0b', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '4px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            <XCircle size={14} /> Reset
          </button>
        </div>

      </div>

    </div>
  );
}
