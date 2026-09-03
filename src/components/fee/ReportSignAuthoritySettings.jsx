import React, { useState, useEffect } from 'react';
import { Save, Check, X } from 'lucide-react';

export default function ReportSignAuthoritySettings() {
  const [settings, setSettings] = useState([
    { id: 'left', label: 'Left Text', mainText: 'Received By:', lowerText: '', showAsUser: false, enable: true },
    { id: 'middle', label: 'Middle Text', mainText: '', lowerText: '', showAsUser: false, enable: false },
    { id: 'right', label: 'Right Text', mainText: 'Checked by:', lowerText: '', showAsUser: false, enable: true },
  ]);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);
  const [isError, setIsError] = useState(false);

  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
  const SETTING_KEY = 'ReportSignAuthority';

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${API_URL}/api/fee-master-settings/${SETTING_KEY}`, { headers });
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data)) {
          setSettings(data);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSubmitting(true);
    const payload = settings;

    try {
      const token = localStorage.getItem('token');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${API_URL}/api/fee-master-settings/${SETTING_KEY}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to save settings');

      setIsError(false);
      setToastMsg('Settings saved successfully');
      setTimeout(() => setToastMsg(null), 3000);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setToastMsg(error.message || 'An error occurred while saving');
      setTimeout(() => setToastMsg(null), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  const updateSetting = (index, field, value) => {
    const newSettings = [...settings];
    newSettings[index][field] = value;
    setSettings(newSettings);
  };

  return (
    <div style={{ padding: '40px', background: '#fff', minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
      
      {/* Toast Message */}
      {toastMsg && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px', backgroundColor: isError ? '#ef4444' : '#4ade80', color: '#fff',
          borderRadius: '4px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 3000, width: '320px',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '12px 16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            {isError ? <X size={20} color="#fff" /> : <Check size={20} color="#fff" />}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontSize: '14px', fontWeight: 600 }}>{isError ? 'Error' : 'Success'}</span>
                <button onClick={() => setToastMsg(null)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 0 }}>
                  <X size={14} />
                </button>
              </div>
              <span style={{ fontSize: '13px' }}>{toastMsg}</span>
            </div>
          </div>
        </div>
      )}

      <div style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>Loading settings...</div>
        ) : (
          <>
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
              <button 
                onClick={handleSave}
                disabled={submitting}
                style={{ 
                  backgroundColor: submitting ? '#9ca3af' : '#4ade80', color: '#fff', border: 'none', padding: '10px 28px', 
                  borderRadius: '4px', cursor: submitting ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 500
                }}>
                <Save size={16} /> {submitting ? 'Saving...' : 'Save'}
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
