import React, { useState } from 'react';
import { Save } from 'lucide-react';

export default function ReportSignAuthoritySettings() {
  const [settings, setSettings] = useState([
    { id: 'left', label: 'Left Text', mainText: 'Received By:', lowerText: '', showAsUser: false, enable: true },
    { id: 'middle', label: 'Middle Text', mainText: '', lowerText: '', showAsUser: false, enable: false },
    { id: 'right', label: 'Right Text', mainText: 'Checked by:', lowerText: '', showAsUser: false, enable: true },
  ]);

  const updateSetting = (index, field, value) => {
    const newSettings = [...settings];
    newSettings[index][field] = value;
    setSettings(newSettings);
  };

  return (
    <div style={{ padding: '40px', background: '#fff', minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <div style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {settings.map((item, index) => (
          <div key={item.id} style={{ display: 'flex', gap: '24px', alignItems: 'flex-end' }}>
            
            {/* Main Text */}
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: '#333' }}>
                {item.label}
              </label>
              <input 
                type="text" 
                value={item.mainText}
                onChange={e => updateSetting(index, 'mainText', e.target.value)}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px', color: '#333' }}
              />
            </div>

            {/* Lower Text */}
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: '#333' }}>
                Lower Text
              </label>
              <input 
                type="text" 
                value={item.lowerText}
                onChange={e => updateSetting(index, 'lowerText', e.target.value)}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px', color: '#333' }}
              />
            </div>

            {/* Checkboxes */}
            <div style={{ flex: 1, display: 'flex', gap: '24px', paddingBottom: '8px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748b', cursor: 'pointer', maxWidth: '120px' }}>
                <input 
                  type="checkbox" 
                  checked={item.showAsUser}
                  onChange={e => updateSetting(index, 'showAsUser', e.target.checked)}
                  style={{ flexShrink: 0 }}
                />
                <span style={{ lineHeight: '1.2' }}>Show lower text as current user</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 500, color: '#333', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={item.enable}
                  onChange={e => updateSetting(index, 'enable', e.target.checked)}
                  style={{ accentColor: '#29a9d8', flexShrink: 0 }}
                />
                Enable?
              </label>
            </div>

          </div>
        ))}

        {/* Button */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
          <button style={{ 
            backgroundColor: '#4ade80', color: '#fff', border: 'none', padding: '10px 28px', 
            borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 500
          }}>
            <Save size={16} /> Save
          </button>
        </div>

      </div>
    </div>
  );
}
