import React, { useState } from 'react';
import { Save } from 'lucide-react';

const Toggle = ({ checked, onChange }) => (
  <div 
    onClick={() => onChange(!checked)}
    style={{
      width: 36, height: 20, borderRadius: 10,
      background: checked ? '#4ade80' : '#fff',
      border: checked ? '1px solid #4ade80' : '1px solid #cbd5e1',
      position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0
    }}
  >
    <div style={{
      width: 14, height: 14, borderRadius: '50%', 
      background: checked ? '#fff' : '#cbd5e1',
      position: 'absolute', top: 2, left: checked ? 18 : 2,
      transition: 'left 0.2s'
    }} />
  </div>
);

export default function FeeEntryLockSetting() {
  const [lockEntry, setLockEntry] = useState(false);
  const [lockEntryPay, setLockEntryPay] = useState(false);
  const [cashLock, setCashLock] = useState(false);

  return (
    <div style={{ padding: '32px 40px', background: '#fff', minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <div style={{ width: '100%', maxWidth: '900px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* Top Row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '32px' }}>
          
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px', lineHeight: '1.4' }}>Lock Entry<br/>Enable</label>
            <Toggle checked={lockEntry} onChange={setLockEntry} />
          </div>

          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px', lineHeight: '1.4' }}>Lock Entry Pay<br/>Without<br/>structure<br/>Enable</label>
            <Toggle checked={lockEntryPay} onChange={setLockEntryPay} />
          </div>

          <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>From Date</label>
              <input type="text" defaultValue="28-Aug-2026" style={{ width: '100%', padding: '6px 12px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Message to show</label>
              <input type="text" style={{ width: '100%', padding: '6px 12px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px' }} />
            </div>
          </div>

          <div style={{ flex: 1.5 }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px', lineHeight: '1.4' }}>Allow User To Edit in Lock<br/>Period</label>
            <select style={{ width: '100%', padding: '6px 12px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', color: '#333' }}>
              <option>None selected</option>
            </select>
          </div>

        </div>

        {/* Separator */}
        <div style={{ height: '1px', background: '#e2e8f0', width: '100%' }} />

        {/* Bottom Row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', gap: '120px' }}>
          
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px', lineHeight: '1.4' }}>Cash Lock Entry<br/>Enable</label>
            <Toggle checked={cashLock} onChange={setCashLock} />
          </div>

          <div style={{ width: '220px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>From Time</label>
            <select style={{ width: '100%', padding: '6px 12px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', color: '#333' }}>
              <option>Select Time</option>
            </select>
          </div>

        </div>

        {/* Save Button */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
          <button style={{ backgroundColor: '#4ade80', color: '#fff', border: 'none', padding: '10px 32px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 500 }}>
            <Save size={16} /> Save
          </button>
        </div>

      </div>

    </div>
  );
}
