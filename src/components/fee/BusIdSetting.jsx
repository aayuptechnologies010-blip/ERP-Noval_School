import React, { useState } from 'react';
import { Save } from 'lucide-react';

export default function BusIdSetting() {
  const [mode, setMode] = useState('Automatic');
  return (
    <div style={{ padding: '40px', background: '#fff', minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <div style={{ display: 'flex', gap: '24px', marginBottom: '32px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: '#333' }}>
          <input type="radio" checked={mode === 'Automatic'} onChange={() => setMode('Automatic')} /> Automatic
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: '#333' }}>
          <input type="radio" checked={mode === 'Manual'} onChange={() => setMode('Manual')} /> Manual
        </label>
      </div>

      <div style={{ width: '100%', maxWidth: '500px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Prefix</label>
          <input type="text" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px' }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Start From</label>
          <input type="text" style={{ width: '100%', padding: '8px', border: '1px solid #ef4444', borderRadius: '4px', fontSize: '12px', outline: 'none' }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Lead Zero</label>
          <input type="text" defaultValue="0" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px' }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Suffix</label>
          <input type="text" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px' }} />
        </div>
      </div>

      <button style={{ backgroundColor: '#4ade80', color: '#fff', border: 'none', padding: '8px 24px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 500 }}>
        <Save size={16} /> Save
      </button>

    </div>
  );
}
