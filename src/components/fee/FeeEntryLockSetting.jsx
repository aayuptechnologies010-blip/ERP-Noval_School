import React, { useState, useEffect } from 'react';
import { Save, Check, X } from 'lucide-react';

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
  const [settings, setSettings] = useState({
    lockEntry: false,
    lockEntryPay: false,
    fromDate: '28-Aug-2026',
    messageToShow: '',
    allowEditUser: 'None selected',
    cashLock: false,
    fromTime: 'Select Time'
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);
  const [isError, setIsError] = useState(false);

  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
  const SETTING_KEY = 'FeeEntryLock';

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
        if (data) {
          setSettings(prev => ({ ...prev, ...data }));
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
    try {
      const token = localStorage.getItem('token');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${API_URL}/api/fee-master-settings/${SETTING_KEY}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(settings)
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

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div style={{ padding: '32px 40px', background: '#fff', minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
      
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

      {loading ? (
        <div style={{ color: '#64748b' }}>Loading settings...</div>
      ) : (
        <div style={{ width: '100%', maxWidth: '900px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* Top Row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '32px' }}>
            
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px', lineHeight: '1.4' }}>Lock Entry<br/>Enable</label>
              <Toggle checked={settings.lockEntry} onChange={v => updateSetting('lockEntry', v)} />
            </div>

            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px', lineHeight: '1.4' }}>Lock Entry Pay<br/>Without<br/>structure<br/>Enable</label>
              <Toggle checked={settings.lockEntryPay} onChange={v => updateSetting('lockEntryPay', v)} />
            </div>

            <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>From Date</label>
                <input type="text" value={settings.fromDate} onChange={e => updateSetting('fromDate', e.target.value)} style={{ width: '100%', padding: '6px 12px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Message to show</label>
                <input type="text" value={settings.messageToShow} onChange={e => updateSetting('messageToShow', e.target.value)} style={{ width: '100%', padding: '6px 12px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px' }} />
              </div>
            </div>

            <div style={{ flex: 1.5 }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px', lineHeight: '1.4' }}>Allow User To Edit in Lock<br/>Period</label>
              <select value={settings.allowEditUser} onChange={e => updateSetting('allowEditUser', e.target.value)} style={{ width: '100%', padding: '6px 12px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', color: '#333' }}>
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
              <Toggle checked={settings.cashLock} onChange={v => updateSetting('cashLock', v)} />
            </div>

            <div style={{ width: '220px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>From Time</label>
              <select value={settings.fromTime} onChange={e => updateSetting('fromTime', e.target.value)} style={{ width: '100%', padding: '6px 12px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', color: '#333' }}>
                <option>Select Time</option>
              </select>
            </div>

          </div>

          {/* Save Button */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
            <button 
              onClick={handleSave}
              disabled={submitting}
              style={{ backgroundColor: submitting ? '#9ca3af' : '#4ade80', color: '#fff', border: 'none', padding: '10px 32px', borderRadius: '4px', cursor: submitting ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 500 }}>
              <Save size={16} /> {submitting ? 'Saving...' : 'Save'}
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
