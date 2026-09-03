import React, { useState, useEffect } from 'react';
import { Save, Check, X } from 'lucide-react';

const Toggle = ({ checked = false, onChange }) => {
  return (
    <div 
      onClick={() => onChange(!checked)}
      style={{
        width: 34, height: 18, borderRadius: 9,
        background: checked ? '#4ade80' : '#fff',
        border: checked ? '1px solid #4ade80' : '1px solid #cbd5e1',
        position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0
      }}
    >
      <div style={{
        width: 14, height: 14, borderRadius: '50%', 
        background: checked ? '#fff' : '#cbd5e1',
        position: 'absolute', top: 1, left: checked ? 17 : 1,
        transition: 'left 0.2s'
      }} />
    </div>
  );
};

const SectionHeading = ({ title, description }) => (
  <div style={{ marginBottom: '8px' }}>
    <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: '#111827' }}>{title}</h4>
    <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#64748b', lineHeight: '1.4' }}>{description}</p>
  </div>
);

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const GATEWAYS = ['Atom', 'Axis', 'billdesk', 'bob', 'ccavenue', 'citrus', 'ebs', 'EaseBuzz', 'federal', 'freecharge', 'HDFC SmartGateway', 'icici', 'iob', 'Paytm', 'Payu', 'Payub', 'qfix', 'razorpay', 'sabpaisa'];

const TIMES = [];
for(let h=0; h<24; h++) {
  for(let m=0; m<60; m+=30) {
    const hh = h.toString().padStart(2, '0');
    const mm = m.toString().padStart(2, '0');
    TIMES.push(`${hh}:${mm}`);
  }
}

export default function OnlinePageSetting() {
  const [settings, setSettings] = useState({
    disablePaynow: false,
    paynowFromDate: '28-Aug-2026',
    paynowToDate: '28-Aug-2026',
    hideAcademicYear: 'None selected',
    hideClass: 'None selected',
    enableAcademicYearOnPaymentByAdm: 'None selected',
    hideMobileEmailOnPaymentByAdm: false,
    hideDobOnPaymentByAdm: false,
    enablePartialPayment: false,
    partialMinAmount: '0.0',
    partialFeeType: 'All',
    enableMultipleGateway: false,
    defaultGateway: 'Select',
    disablePaymentTimeAvailability: false,
    allowPaymentFromDay: '-- Select --',
    allowPaymentTillDay: '-- Select --',
    dayTimes: DAYS.reduce((acc, day) => {
      acc[day] = { checked: false, fromTime: '--Time--', toTime: '--Time--' };
      return acc;
    }, {})
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);
  const [isError, setIsError] = useState(false);

  const [academicYears, setAcademicYears] = useState([]);
  const [classes, setClasses] = useState([]);
  const [feeTypes, setFeeTypes] = useState([]);

  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
  const SETTING_KEY = 'OnlinePage';

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const [setRes, acadRes, classRes, feeRes] = await Promise.all([
        fetch(`${API_URL}/api/fee-master-settings/${SETTING_KEY}`, { headers }),
        fetch(`${API_URL}/api/academic-years`, { headers }),
        fetch(`${API_URL}/api/school-classes`, { headers }),
        fetch(`${API_URL}/api/fee-types`, { headers })
      ]);

      if (setRes.ok) {
        const data = await setRes.json();
        if (data) setSettings(prev => ({ ...prev, ...data }));
      }
      if (acadRes.ok) setAcademicYears(await acadRes.json());
      if (classRes.ok) setClasses(await classRes.json());
      if (feeRes.ok) setFeeTypes(await feeRes.json());

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

  const updateDayTime = (day, field, value) => {
    setSettings(prev => ({
      ...prev,
      dayTimes: {
        ...prev.dayTimes,
        [day]: {
          ...prev.dayTimes[day],
          [field]: value
        }
      }
    }));
  };

  return (
    <div style={{ padding: '0 32px 40px 32px', background: '#fff', minHeight: '100%', position: 'relative' }}>
      
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

      {/* Heading */}
      <div style={{ textAlign: 'center', margin: '24px 0 32px 0', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '50%', left: '0', right: '0', height: '1px', background: '#e2e8f0', zIndex: 1 }} />
        <span style={{ position: 'relative', zIndex: 2, background: '#fff', padding: '0 16px', fontSize: '13px', fontWeight: 700, color: '#333', letterSpacing: '0.05em' }}>
          ENABLE/DISABLE OPTIONS ON ONLINE PAYMENT PAGE
        </span>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>Loading settings...</div>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', marginBottom: '40px' }}>
            
            {/* Left Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1, paddingRight: '16px' }}>
                  <SectionHeading title="Disable Paynow Button" description="Allows the user to disable paynow button with below date filter" />
                  <div style={{ display: 'flex', gap: '24px', marginTop: '8px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '11px', color: '#333', marginBottom: '4px' }}>From Date</label>
                      <input type="date" value={settings.paynowFromDate} onChange={e => updateSetting('paynowFromDate', e.target.value)} style={{ width: '100%', padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', color: '#333' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '11px', color: '#333', marginBottom: '4px' }}>To Date</label>
                      <input type="date" value={settings.paynowToDate} onChange={e => updateSetting('paynowToDate', e.target.value)} style={{ width: '100%', padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', color: '#333' }} />
                    </div>
                  </div>
                </div>
                <Toggle checked={settings.disablePaynow} onChange={v => updateSetting('disablePaynow', v)} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1, paddingRight: '16px' }}>
                  <SectionHeading title="Hide Academicyear" description="Allows the user to hide academicyear on print receipt" />
                  <select value={settings.hideAcademicYear} onChange={e => updateSetting('hideAcademicYear', e.target.value)} style={{ width: '100%', padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', color: '#333', marginTop: '4px' }}>
                    <option value="None selected">None selected</option>
                    {academicYears.map(a => <option key={a._id} value={a._id}>{a.name}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1, paddingRight: '16px' }}>
                  <SectionHeading title="Hide Class" description="Allows the user to hide the paynow button from the class." />
                  <select value={settings.hideClass} onChange={e => updateSetting('hideClass', e.target.value)} style={{ width: '100%', padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', color: '#333', marginTop: '4px' }}>
                    <option value="None selected">None selected</option>
                    {classes.map(c => <option key={c._id} value={c._id}>{c.className}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1, paddingRight: '16px' }}>
                  <SectionHeading title="Enable Academicyear On Payment By Admission No." description="Allows the user to show academicyear on Payment by Admission No." />
                  <select value={settings.enableAcademicYearOnPaymentByAdm} onChange={e => updateSetting('enableAcademicYearOnPaymentByAdm', e.target.value)} style={{ width: '100%', padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', color: '#333', marginTop: '4px' }}>
                    <option value="None selected">None selected</option>
                    {academicYears.map(a => <option key={a._id} value={a._id}>{a.name}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1, paddingRight: '16px' }}>
                  <SectionHeading title="Hide Mobile and Email On Payment By Admission No." description="Hide Mobile and Email if it is not blank On Payment By Admission No." />
                </div>
                <Toggle checked={settings.hideMobileEmailOnPaymentByAdm} onChange={v => updateSetting('hideMobileEmailOnPaymentByAdm', v)} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1, paddingRight: '16px' }}>
                  <SectionHeading title="Hide Date of Birth On Payment By Admission No." description="Hide Date of Birth if it is not blank On Payment By Admission No." />
                </div>
                <Toggle checked={settings.hideDobOnPaymentByAdm} onChange={v => updateSetting('hideDobOnPaymentByAdm', v)} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1, paddingRight: '16px' }}>
                  <SectionHeading title="Enable Partial Payment" description="Allows the user to pay partial payment." />
                  <div style={{ display: 'flex', gap: '24px', marginTop: '8px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#333', marginBottom: '4px' }}>Min. Amount</label>
                      <input type="text" value={settings.partialMinAmount} onChange={e => updateSetting('partialMinAmount', e.target.value)} style={{ width: '100%', padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', color: '#333' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#333', marginBottom: '4px' }}>Enable Fee Type</label>
                      <select value={settings.partialFeeType} onChange={e => updateSetting('partialFeeType', e.target.value)} style={{ width: '100%', padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', color: '#333' }}>
                        <option value="All">All</option>
                        {feeTypes.map(f => <option key={f._id} value={f._id}>{f.name}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
                <Toggle checked={settings.enablePartialPayment} onChange={v => updateSetting('enablePartialPayment', v)} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1, paddingRight: '16px' }}>
                  <SectionHeading title="Enable Multiple Gateway" description="Allows the user to select gateway." />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#333' }}>Default Gateway</label>
                    <select value={settings.defaultGateway} onChange={e => updateSetting('defaultGateway', e.target.value)} style={{ width: '180px', padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', color: '#333' }}>
                      <option value="Select">Select</option>
                      {GATEWAYS.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                </div>
                <Toggle checked={settings.enableMultipleGateway} onChange={v => updateSetting('enableMultipleGateway', v)} />
              </div>

            </div>

            {/* Right Column */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ flex: 1, paddingRight: '16px' }}>
                  <SectionHeading title="Disable Payment Time Availability" description="Disable online payment day-wise with time range" />
                </div>
                <Toggle checked={settings.disablePaymentTimeAvailability} onChange={v => updateSetting('disablePaymentTimeAvailability', v)} />
              </div>

              <div style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '11px', color: '#333', marginBottom: '4px' }}>Allow Payment From Day</label>
                  <select value={settings.allowPaymentFromDay} onChange={e => updateSetting('allowPaymentFromDay', e.target.value)} style={{ width: '100%', padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', color: '#333' }}>
                    <option value="-- Select --">-- Select --</option>
                    {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '11px', color: '#333', marginBottom: '4px' }}>Allow Payment Till Day</label>
                  <select value={settings.allowPaymentTillDay} onChange={e => updateSetting('allowPaymentTillDay', e.target.value)} style={{ width: '100%', padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', color: '#333' }}>
                    <option value="-- Select --">-- Select --</option>
                    {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {DAYS.map(day => (
                  <div key={day} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 1fr', gap: '16px', alignItems: 'center' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#333', cursor: 'pointer' }}>
                      <input type="checkbox" checked={settings.dayTimes[day].checked} onChange={e => updateDayTime(day, 'checked', e.target.checked)} /> {day}
                    </label>
                    <select value={settings.dayTimes[day].fromTime} onChange={e => updateDayTime(day, 'fromTime', e.target.value)} disabled={!settings.dayTimes[day].checked} style={{ width: '100%', padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', color: '#333' }}>
                      <option value="--Time--">--Time--</option>
                      {TIMES.map(t => <option key={`from-${t}`} value={t}>{t}</option>)}
                    </select>
                    <select value={settings.dayTimes[day].toTime} onChange={e => updateDayTime(day, 'toTime', e.target.value)} disabled={!settings.dayTimes[day].checked} style={{ width: '100%', padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', color: '#333' }}>
                      <option value="--Time--">--Time--</option>
                      {TIMES.map(t => <option key={`to-${t}`} value={t}>{t}</option>)}
                    </select>
                  </div>
                ))}
              </div>
              
            </div>

          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button 
              onClick={handleSave}
              disabled={submitting}
              style={{ backgroundColor: submitting ? '#9ca3af' : '#4ade80', color: '#fff', border: 'none', padding: '10px 28px', borderRadius: '4px', cursor: submitting ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 500 }}>
              <Save size={16} /> {submitting ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </>
      )}

    </div>
  );
}
