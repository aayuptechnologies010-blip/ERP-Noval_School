import React, { useState, useEffect } from 'react';
import { Save, AlertCircle, CheckCircle } from 'lucide-react';


const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function DefineGlobalSettings() {
  const [activeTab, setActiveTab] = useState('main');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [formData, setFormData] = useState({
    rebateOnTaFor12Months: true,
    rebateOnTaAmount: 0,
    hraMetroPercent: 40.00,
    hraNonMetroPercent: 50.00,
    rebateOnHillAllowance: 0,
  });

  const token = localStorage.getItem('token');
  const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/global-payroll-settings`, { headers });
        if (res.ok) {
          const data = await res.json();
          setFormData({
            rebateOnTaFor12Months: data.rebateOnTaFor12Months ?? true,
            rebateOnTaAmount: data.rebateOnTaAmount ?? 0,
            hraMetroPercent: data.hraMetroPercent ?? 40.00,
            hraNonMetroPercent: data.hraNonMetroPercent ?? 50.00,
            rebateOnHillAllowance: data.rebateOnHillAllowance ?? 0,
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });
    try {
      const res = await fetch(`${API_BASE}/api/global-payroll-settings`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setMessage({ type: 'success', text: 'Global settings updated successfully' });
      } else {
        setMessage({ type: 'error', text: 'Failed to update settings' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Network error' });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage({ type: '', text: '' }), 5000);
    }
  };

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading settings...</div>;
  }

  return (
    <div className="global-settings-container">
      
      <div className="settings-tabs">
        <div 
          className={`settings-tab ${activeTab === 'main' ? 'active-tab' : 'inactive-tab'}`}
          onClick={() => setActiveTab('main')}
        >
          Main Global Settings
        </div>
        <div 
          className={`settings-tab ${activeTab === 'salary' ? 'active-tab' : 'inactive-tab'}`}
          onClick={() => setActiveTab('salary')}
        >
          Salary Generate Settings
        </div>
      </div>

      {message.text && (
        <div style={{
          margin: '20px', padding: '12px 16px', borderRadius: '4px',
          display: 'flex', alignItems: 'center', gap: '8px',
          backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
          color: message.type === 'success' ? '#155724' : '#721c24',
          border: `1px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
        }}>
          {message.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
          {message.text}
        </div>
      )}

      {activeTab === 'main' && (
        <>
          <div className="settings-section">
            <div className="section-header">Form 16</div>
            <div className="settings-row row-3-cols">
              <div className="form-group">
                <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                  Rebate on Travelling Allowance (TA)
                  <span className="checkbox-label" style={{ fontWeight: 'normal', color: '#333' }}>
                    <input 
                      type="checkbox" 
                      checked={formData.rebateOnTaFor12Months} 
                      onChange={(e) => setFormData({...formData, rebateOnTaFor12Months: e.target.checked})}
                    /> For 12 Month
                  </span>
                </label>
                <input 
                  type="number" 
                  className="settings-input" 
                  value={formData.rebateOnTaAmount}
                  onChange={(e) => setFormData({...formData, rebateOnTaAmount: Number(e.target.value)})}
                />
              </div>
              <div className="form-group">
                <label>HRA For Metropolitan Cities (in %)</label>
                <input 
                  type="number" 
                  className="settings-input" 
                  value={formData.hraMetroPercent}
                  onChange={(e) => setFormData({...formData, hraMetroPercent: Number(e.target.value)})}
                />
              </div>
              <div className="form-group">
                <label>HRA For Non Metropolitan Cities (in %)</label>
                <input 
                  type="number" 
                  className="settings-input" 
                  value={formData.hraNonMetroPercent}
                  onChange={(e) => setFormData({...formData, hraNonMetroPercent: Number(e.target.value)})}
                />
              </div>
            </div>
            <div className="settings-row row-3-cols">
              <div className="form-group">
                <label>Rebate on Hill Allowance (HA)</label>
                <input 
                  type="number" 
                  className="settings-input" 
                  value={formData.rebateOnHillAllowance}
                  onChange={(e) => setFormData({...formData, rebateOnHillAllowance: Number(e.target.value)})}
                />
              </div>
            </div>
          </div>
          
          <div className="settings-section">
            <div className="section-header">Signatures</div>
            <div className="settings-row row-3-cols">
              <div className="form-group">
                <label>Signature 1 Header (Optional)</label>
                <input type="text" className="settings-input" />
              </div>
              <div className="form-group">
                <label>Signature 2 Header (Optional)</label>
                <input type="text" className="settings-input" />
              </div>
              <div className="form-group">
                <label>Signature 3 Header (Optional)</label>
                <input type="text" className="settings-input" />
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'salary' && (
        <div className="settings-section">
           <div className="section-header">Salary Generate Settings</div>
           <div style={{ padding: '20px', color: '#666' }}>
              Advanced salary generation settings can be configured here.
           </div>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button 
          className="blue-btn" 
          style={{ padding: '8px 25px', opacity: saving ? 0.7 : 1 }}
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

    </div>
  );
}
