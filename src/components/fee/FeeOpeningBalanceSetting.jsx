import React, { useState, useEffect } from 'react';
import { Save, Check, X } from 'lucide-react';

export default function FeeOpeningBalanceSetting() {
  const [adjustmentType, setAdjustmentType] = useState('auto');
  const [feeType, setFeeType] = useState('School Fee');
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);
  const [isError, setIsError] = useState(false);

  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
  const SETTING_KEY = 'FeeOpeningBalance';

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
          setAdjustmentType(data.adjustmentType || 'auto');
          setFeeType(data.feeType || 'School Fee');
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
    const payload = { adjustmentType, feeType };

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

      <div style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>Loading settings...</div>
        ) : (
          <>
            {/* Section 1 */}
            <div style={{ border: '1px solid #e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#fff' }}>
                <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: '#333' }}>Fee Opening Balance and Advance Amount Setting</h4>
              </div>
              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: '#fff' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#333', cursor: 'pointer' }}>
                  <input 
                    type="radio" 
                    checked={adjustmentType === 'auto'} 
                    onChange={() => setAdjustmentType('auto')}
                    style={{ cursor: 'pointer' }}
                  />
                  Auto adjust, if advance amount is greater than or equal to next installment amount.
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#333', cursor: 'pointer' }}>
                  <input 
                    type="radio" 
                    checked={adjustmentType === 'manual'} 
                    onChange={() => setAdjustmentType('manual')}
                    style={{ cursor: 'pointer' }}
                  />
                  Manually adjust advance amount.
                </label>
              </div>
            </div>

            {/* Section 2 */}
            <div style={{ border: '1px solid #e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#fff' }}>
                <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: '#333' }}>Fee Type For Advance</h4>
              </div>
              <div style={{ padding: '16px', backgroundColor: '#fff' }}>
                <select 
                  value={feeType}
                  onChange={(e) => setFeeType(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px', color: '#333', marginBottom: '16px', cursor: 'pointer' }}
                >
                  <option value="School Fee">School Fee</option>
                </select>
                
                <p style={{ margin: 0, fontSize: '12px', color: '#4b5563', lineHeight: '1.5' }}>
                  <strong>Note:</strong>Advance amount is automatically adjusted in similar fee type which is choosen at the time of fee collection on fee entry page. However is all type is selected on fee collection page then advance adjustment will happen according to the fee type choosen in above setting.
                </p>
              </div>
            </div>

            {/* Button */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '8px' }}>
              <button 
                onClick={handleSave}
                disabled={submitting}
                style={{ 
                  backgroundColor: submitting ? '#9ca3af' : '#4ade80', color: '#fff', border: 'none', padding: '8px 24px', 
                  borderRadius: '4px', cursor: submitting ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 500
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
