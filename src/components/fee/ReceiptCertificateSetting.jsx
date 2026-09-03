import React, { useState, useEffect } from 'react';
import { Eye, Save, Check, X } from 'lucide-react';

const SettingGroup = ({ name, title, showSameAsErp, dropdownValue, isDropdownPlaceholder, value, sameAsErpChecked, onChange, options = [] }) => (
  <div style={{ marginBottom: '24px' }}>
    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>
      {title}
    </label>
    {showSameAsErp && (
      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748b', marginBottom: '8px', cursor: 'pointer' }}>
        <input 
          type="checkbox" 
          checked={sameAsErpChecked}
          onChange={(e) => onChange(name + 'SameAsErp', e.target.checked)}
        /> Same as ERP
      </label>
    )}
    <div style={{ display: 'flex', gap: '8px' }}>
      <select 
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        disabled={sameAsErpChecked}
        style={{ 
          flex: 1, padding: '6px 12px', border: '1px solid #d1d5db', borderRadius: '4px', 
          fontSize: '12px', color: !value || isDropdownPlaceholder ? '#64748b' : '#333', 
          cursor: sameAsErpChecked ? 'not-allowed' : 'pointer',
          backgroundColor: sameAsErpChecked ? '#f3f4f6' : '#fff'
        }}
      >
        <option value="">{dropdownValue || 'Select'}</option>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <button 
        type="button"
        style={{ 
          backgroundColor: '#29a9d8', color: '#fff', border: 'none', borderRadius: '4px', 
          padding: '0 12px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 600, cursor: 'pointer'
        }}
      >
        <Eye size={12} /> VIEW
      </button>
    </div>
  </div>
);

export default function ReceiptCertificateSetting() {
  const [settings, setSettings] = useState({
    receiptForErp: 'ReceiptFormat20',
    receiptForMobile: 'ReceiptFormat20',
    receiptForMobileSameAsErp: false,
    amtWithoutStructStudent: 'Type 1 Format',
    amtWithoutStructTeacher: 'Type 1 Format',
    feeCertForErp: '',
    feeCertForMobile: 'CertificateFormat 29',
    feeCertForMobileSameAsErp: false,
    billBookForErp: 'CustomType8',
    billBookForMobile: 'CustomType8',
    billBookForMobileSameAsErp: false
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);
  const [isError, setIsError] = useState(false);

  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
  const SETTING_KEY = 'ReceiptCertificate';

  const mockOptions = {
    receiptFormats: ['ReceiptFormat20', 'ReceiptFormat21', 'ReceiptFormat22'],
    amtFormats: ['Type 1 Format', 'Type 2 Format'],
    certFormats: ['CertificateFormat 29', 'CertificateFormat 30'],
    billBookFormats: ['CustomType8', 'CustomType9']
  };

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
    const payload = { ...settings };

    // Apply "Same as ERP" overrides
    if (payload.receiptForMobileSameAsErp) payload.receiptForMobile = payload.receiptForErp;
    if (payload.feeCertForMobileSameAsErp) payload.feeCertForMobile = payload.feeCertForErp;
    if (payload.billBookForMobileSameAsErp) payload.billBookForMobile = payload.billBookForErp;

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

      // Update state with overrides just in case
      setSettings(payload);
      
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

  const handleChange = (name, value) => {
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ padding: '32px 40px', background: '#fff', minHeight: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      
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
        <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>Loading settings...</div>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '48px', marginBottom: '40px' }}>
            
            {/* Column 1 */}
            <div>
              <SettingGroup 
                title="Receipt For ERP" 
                name="receiptForErp"
                value={settings.receiptForErp}
                options={mockOptions.receiptFormats}
                onChange={handleChange}
              />
              <SettingGroup 
                title="Receipt For Mobile" 
                showSameAsErp 
                name="receiptForMobile"
                value={settings.receiptForMobileSameAsErp ? settings.receiptForErp : settings.receiptForMobile}
                sameAsErpChecked={settings.receiptForMobileSameAsErp}
                options={mockOptions.receiptFormats}
                onChange={handleChange}
              />
              <SettingGroup 
                title="Amt without structure Receipt Student" 
                name="amtWithoutStructStudent"
                value={settings.amtWithoutStructStudent}
                options={mockOptions.amtFormats}
                onChange={handleChange}
              />
              <SettingGroup 
                title="Amt without structure Receipt Teacher" 
                name="amtWithoutStructTeacher"
                value={settings.amtWithoutStructTeacher}
                options={mockOptions.amtFormats}
                onChange={handleChange}
              />
            </div>

            {/* Column 2 */}
            <div>
              <SettingGroup 
                title="Fee Certificate For ERP" 
                name="feeCertForErp"
                dropdownValue="select Certificate"
                isDropdownPlaceholder
                value={settings.feeCertForErp}
                options={mockOptions.certFormats}
                onChange={handleChange}
              />
              <SettingGroup 
                title="Fee Certificate For Mobile" 
                showSameAsErp 
                name="feeCertForMobile"
                value={settings.feeCertForMobileSameAsErp ? settings.feeCertForErp : settings.feeCertForMobile}
                sameAsErpChecked={settings.feeCertForMobileSameAsErp}
                options={mockOptions.certFormats}
                onChange={handleChange}
              />
            </div>

            {/* Column 3 */}
            <div>
              <SettingGroup 
                title="Bill Book For ERP" 
                name="billBookForErp"
                value={settings.billBookForErp}
                options={mockOptions.billBookFormats}
                onChange={handleChange}
              />
              <SettingGroup 
                title="Bill Book For Mobile" 
                showSameAsErp 
                name="billBookForMobile"
                value={settings.billBookForMobileSameAsErp ? settings.billBookForErp : settings.billBookForMobile}
                sameAsErpChecked={settings.billBookForMobileSameAsErp}
                options={mockOptions.billBookFormats}
                onChange={handleChange}
              />
            </div>

          </div>

          {/* Save Button */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
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
  );
}
