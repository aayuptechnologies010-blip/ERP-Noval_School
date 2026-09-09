import React, { useState, useEffect } from 'react';
import { Save, AlertCircle, CheckCircle } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function SalaryCalculation() {
  const [calcBase, setCalcBase] = useState('monthly_gross');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const token = localStorage.getItem('token');
  const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/global-payroll-settings`, { headers });
        if (res.ok) {
          const data = await res.json();
          if (data.salaryCalcBase) {
            setCalcBase(data.salaryCalcBase);
          }
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
        body: JSON.stringify({ salaryCalcBase: calcBase })
      });
      if (res.ok) {
        setMessage({ type: 'success', text: 'Salary calculation basis updated successfully' });
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
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;
  }

  return (
    <div className="global-settings-container">
      
      {message.text && (
        <div style={{
          maxWidth: '800px', margin: '0 auto 20px auto', padding: '12px 16px', borderRadius: '4px',
          display: 'flex', alignItems: 'center', gap: '8px',
          backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
          color: message.type === 'success' ? '#155724' : '#721c24',
          border: `1px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
        }}>
          {message.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
          {message.text}
        </div>
      )}

      <div className="settings-section" style={{ maxWidth: '800px', margin: '0 auto', border: '1px solid #dee2e6' }}>
        <div className="section-header" style={{ marginBottom: '20px' }}>Salary Calculation Based on</div>
        
        <div style={{ padding: '0 30px 30px 30px' }}>
          <div style={{ display: 'flex', gap: '30px', marginBottom: '15px' }}>
            <label className="checkbox-label" style={{ fontWeight: 'normal' }}>
              <input 
                type="radio" 
                name="calc_base" 
                checked={calcBase === 'monthly_gross'}
                onChange={() => setCalcBase('monthly_gross')}
              /> Monthly Gross
            </label>
            <label className="checkbox-label" style={{ fontWeight: 'normal' }}>
              <input 
                type="radio" 
                name="calc_base" 
                checked={calcBase === 'monthly_basic'}
                onChange={() => setCalcBase('monthly_basic')}
              /> Monthly Basic
            </label>
          </div>

          <div style={{ fontSize: '12px', color: '#666', marginBottom: '30px', lineHeight: '1.5' }}>
            Note: Selected option will calculate Basic & Salary head(s)(HRA, Allowances) on the basis of monthly Gross of employee(s).<br/>
            (Please carefully select one of the options)
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button 
              className="blue-btn" 
              style={{ padding: '8px 25px', opacity: saving ? 0.7 : 1 }}
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
