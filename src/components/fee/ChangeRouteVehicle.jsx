import React from 'react';
import { RefreshCw } from 'lucide-react';

export default function ChangeRouteVehicle() {
  return (
    <div style={{ padding: '20px', background: '#fff', minHeight: '100%' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        <div>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Current Route</label>
          <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }}>
            <option>Select Route(s)</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Current Vehicle</label>
            <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }}>
              <option></option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>New Vehicle</label>
            <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }}>
              <option></option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <button style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '8px 25px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <RefreshCw size={14} /> Update
          </button>
        </div>

      </div>
    </div>
  );
}
