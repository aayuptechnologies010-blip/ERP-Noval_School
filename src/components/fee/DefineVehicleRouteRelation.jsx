import React from 'react';
import { Save, Eye, Printer, RotateCcw } from 'lucide-react';

export default function DefineVehicleRouteRelation() {
  const routes = [
    '1 => AMILA TO SCHOOL VIA GONTHA',
    '2 => SCHOOL TO BHAUDAURA CHOWK',
    '3 => SCHOOL TO MAADI SIPAH',
    '12 => SCHOOL TO SAKKARPUR',
    '5 => SCHOOL TO CHAUKO',
    '9 => SCHOOL TO VISANPURA',
    '6 => NAI BAZAR TO SCHOOL',
    '10 => CHADIA TO SCHOOL'
  ];

  return (
    <div style={{ padding: '20px', background: '#fff', minHeight: '100%' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div style={{ flex: 1, minWidth: '250px', maxWidth: '350px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Vehicle Name</label>
            <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }}>
              <option>Select</option>
            </select>
          </div>
          <div style={{ flex: 1, minWidth: '250px', maxWidth: '350px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Vehicle No.</label>
            <input type="text" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }} />
          </div>
        </div>

        <div style={{ border: '1px solid #e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ padding: '10px', textAlign: 'left', color: '#374151', borderRight: '1px solid #e5e7eb', width: '80px' }}>S No.</th>
                <th style={{ padding: '10px', textAlign: 'left', color: '#374151', borderRight: '1px solid #e5e7eb' }}>Route No. =&gt; Route Description</th>
                <th style={{ padding: '10px', textAlign: 'left', color: '#374151', width: '100px' }}>Select</th>
              </tr>
            </thead>
            <tbody>
              {routes.map((route, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #e5e7eb', background: idx % 2 === 0 ? '#fff' : '#f8fafc' }}>
                  <td style={{ padding: '10px', borderRight: '1px solid #e5e7eb', color: '#374151' }}>{idx + 1}</td>
                  <td style={{ padding: '10px', borderRight: '1px solid #e5e7eb', color: '#374151' }}>{route}</td>
                  <td style={{ padding: '10px' }}>
                    <input type="checkbox" style={{ accentColor: '#29a9d8', width: '16px', height: '16px' }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '10px' }}>
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
