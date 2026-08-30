import React, { useState } from 'react';
import { Save } from 'lucide-react';

export default function BillBookSetting() {
  const [mode, setMode] = useState('Manual');
  return (
    <div style={{ padding: '40px', background: '#fff', minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px' }}>
          <input type="radio" name="billBookMode" checked={mode === 'Automatic'} onChange={() => setMode('Automatic')} /> Automatic
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px' }}>
          <input type="radio" name="billBookMode" checked={mode === 'Manual'} onChange={() => setMode('Manual')} /> Manual
        </label>
      </div>
      <button style={{ backgroundColor: '#4ade80', color: '#fff', border: 'none', padding: '8px 24px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 500 }}>
        <Save size={16} /> Save
      </button>
    </div>
  );
}
