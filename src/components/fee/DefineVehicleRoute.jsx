import React from 'react';
import { Save, Eye, Printer, RotateCcw } from 'lucide-react';

export default function DefineVehicleRoute() {
  return (
    <div style={{ padding: '20px', background: '#fff', minHeight: '100%' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#374151' }}>
            Add/Modify Vehicle Route
          </div>
          <div style={{ display: 'flex', borderRadius: '4px', overflow: 'hidden' }}>
            <button style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '8px 15px', fontSize: '12px', cursor: 'pointer', borderRight: '1px solid rgba(255,255,255,0.3)' }}>
              Export From Excel
            </button>
            <button style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '8px 15px', fontSize: '12px', cursor: 'pointer' }}>
              Download Excel Formate
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Route No.</label>
              <input type="text" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Route Incharge Name</label>
              <input type="text" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }} />
            </div>
          </div>

          <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Route Description</label>
              <input type="text" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Route Incharge Mob No.</label>
              <input type="text" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }} />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
          <button style={{ background: '#fff', color: '#4ade80', border: '1px solid #4ade80', padding: '8px 20px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Save size={14} /> Save
          </button>
          <button style={{ background: '#fff', color: '#29a9d8', border: '1px solid #29a9d8', padding: '8px 20px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Eye size={14} /> View
          </button>
          <button style={{ background: '#fff', color: '#3b82f6', border: '1px solid #3b82f6', padding: '8px 20px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Printer size={14} /> Print
          </button>
          <button style={{ background: '#fff', color: '#f59e0b', border: '1px solid #f59e0b', padding: '8px 20px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <RotateCcw size={14} /> Reset
          </button>
        </div>

      </div>
    </div>
  );
}
