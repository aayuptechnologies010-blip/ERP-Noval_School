import React, { useState, useEffect } from 'react';
import { Save, Check, X } from 'lucide-react';

const GATEWAYS = [
  'Atom', 'Axis', 'billdesk', 'bob', 'ccavenue', 'citrus', 'ebs',
  'EaseBuzz', 'federal', 'freecharge', 'HDFC SmartGateway', 'icici',
  'iob', 'Paytm', 'Payu', 'Payub', 'qfix', 'razorpay', 'sabpaisa'
];

export default function PaymentGatewaySetting() {
  const [gateway, setGateway] = useState('');
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);
  const [isError, setIsError] = useState(false);

  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
  const SETTING_KEY = 'PaymentGateway';

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
        if (data && data.gateway) {
          setGateway(data.gateway);
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
    const payload = { gateway };

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
      setToastMsg('Payment Gateway Setting saved successfully');
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
    <div style={{ padding: '24px 32px', background: '#fff', minHeight: '100%', display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative' }}>
      
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
        <div style={{ padding: '40px', color: '#64748b' }}>Loading settings...</div>
      ) : (
        <>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Select Payment Gateway</label>
            <select 
              value={gateway}
              onChange={(e) => setGateway(e.target.value)}
              style={{ 
                width: '100%', 
                maxWidth: '400px',
                padding: '8px 12px', 
                border: '1px solid #d1d5db', 
                borderRadius: '4px', 
                fontSize: '13px', 
                color: '#333',
                cursor: 'pointer'
              }}
            >
              <option value="">-- Select Payment Gateway --</option>
              {GATEWAYS.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <div>
            <button 
              onClick={handleSave}
              disabled={submitting}
              style={{ 
                backgroundColor: submitting ? '#9ca3af' : '#29a9d8', color: '#fff', border: 'none', padding: '8px 24px', 
                borderRadius: '4px', cursor: submitting ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 500
              }}>
              <Save size={16} /> {submitting ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </>
      )}

    </div>
  );
}
