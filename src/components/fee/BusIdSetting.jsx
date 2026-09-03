import React, { useState, useEffect } from 'react';
import { Save, Check, X } from 'lucide-react';

export default function BusIdSetting() {
  const [mode, setMode] = useState('Automatic');
  const [prefix, setPrefix] = useState('');
  const [startFrom, setStartFrom] = useState('');
  const [leadZero, setLeadZero] = useState('0');
  const [suffix, setSuffix] = useState('');

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);
  const [isError, setIsError] = useState(false);

  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
  const SETTING_KEY = 'BusId';

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
          setMode(data.mode || 'Automatic');
          setPrefix(data.prefix || '');
          setStartFrom(data.startFrom || '');
          setLeadZero(data.leadZero || '0');
          setSuffix(data.suffix || '');
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
    const payload = { mode, prefix, startFrom, leadZero, suffix };

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

      {loading ? (
        <div style={{ color: '#64748b' }}>Loading settings...</div>
      ) : (
        <>
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
              <input type="text" value={prefix} onChange={e => setPrefix(e.target.value)} disabled={mode === 'Manual'} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', backgroundColor: mode === 'Manual' ? '#f3f4f6' : '#fff' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Start From</label>
              <input type="number" value={startFrom} onChange={e => setStartFrom(e.target.value)} disabled={mode === 'Manual'} style={{ width: '100%', padding: '8px', border: '1px solid #ef4444', borderRadius: '4px', fontSize: '12px', outline: 'none', backgroundColor: mode === 'Manual' ? '#f3f4f6' : '#fff' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Lead Zero</label>
              <input type="number" value={leadZero} onChange={e => setLeadZero(e.target.value)} disabled={mode === 'Manual'} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', backgroundColor: mode === 'Manual' ? '#f3f4f6' : '#fff' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Suffix</label>
              <input type="text" value={suffix} onChange={e => setSuffix(e.target.value)} disabled={mode === 'Manual'} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', backgroundColor: mode === 'Manual' ? '#f3f4f6' : '#fff' }} />
            </div>
          </div>

          <button 
            onClick={handleSave}
            disabled={submitting}
            style={{ backgroundColor: submitting ? '#9ca3af' : '#4ade80', color: '#fff', border: 'none', padding: '8px 24px', borderRadius: '4px', cursor: submitting ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 500 }}>
            <Save size={16} /> {submitting ? 'Saving...' : 'Save'}
          </button>
        </>
      )}

    </div>
  );
}
