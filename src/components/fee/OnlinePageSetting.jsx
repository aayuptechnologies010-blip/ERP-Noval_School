import React, { useState } from 'react';

const Toggle = ({ checked = false }) => {
  const [isChecked, setIsChecked] = useState(checked);
  return (
    <div 
      onClick={() => setIsChecked(!isChecked)}
      style={{
        width: 34, height: 18, borderRadius: 9,
        background: isChecked ? '#4ade80' : '#fff',
        border: isChecked ? '1px solid #4ade80' : '1px solid #cbd5e1',
        position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0
      }}
    >
      <div style={{
        width: 14, height: 14, borderRadius: '50%', 
        background: isChecked ? '#fff' : '#cbd5e1',
        position: 'absolute', top: 1, left: isChecked ? 17 : 1,
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

export default function OnlinePageSetting() {
  return (
    <div style={{ padding: '0 32px 40px 32px', background: '#fff', minHeight: '100%' }}>
      
      {/* Heading */}
      <div style={{ textAlign: 'center', margin: '24px 0 32px 0', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '50%', left: '0', right: '0', height: '1px', background: '#e2e8f0', zIndex: 1 }} />
        <span style={{ position: 'relative', zIndex: 2, background: '#fff', padding: '0 16px', fontSize: '13px', fontWeight: 700, color: '#333', letterSpacing: '0.05em' }}>
          ENABLE/DISABLE OPTIONS ON ONLINE PAYMENT PAGE
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px' }}>
        
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: 1, paddingRight: '16px' }}>
              <SectionHeading title="Disable Paynow Button" description="Allows the user to disable paynow button with below date filter" />
              <div style={{ display: 'flex', gap: '24px', marginTop: '8px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '11px', color: '#333', marginBottom: '4px' }}>From Date</label>
                  <input type="text" defaultValue="28-Aug-2026" style={{ width: '100%', padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', color: '#333' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '11px', color: '#333', marginBottom: '4px' }}>To Date</label>
                  <input type="text" defaultValue="28-Aug-2026" style={{ width: '100%', padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', color: '#333' }} />
                </div>
              </div>
            </div>
            <Toggle />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: 1, paddingRight: '16px' }}>
              <SectionHeading title="Hide Academicyear" description="Allows the user to hide academicyear on print receipt" />
              <select style={{ width: '100%', padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', color: '#333', marginTop: '4px' }}>
                <option>None selected</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: 1, paddingRight: '16px' }}>
              <SectionHeading title="Hide Class" description="Allows the user to hide the paynow button from the class." />
              <select style={{ width: '100%', padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', color: '#333', marginTop: '4px' }}>
                <option>None selected</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: 1, paddingRight: '16px' }}>
              <SectionHeading title="Enable Academicyear On Payment By Admission No." description="Allows the user to show academicyear on Payment by Admission No." />
              <select style={{ width: '100%', padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', color: '#333', marginTop: '4px' }}>
                <option>None selected</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: 1, paddingRight: '16px' }}>
              <SectionHeading title="Hide Mobile and Email On Payment By Admission No." description="Hide Mobile and Email if it is not blank On Payment By Admission No." />
            </div>
            <Toggle />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: 1, paddingRight: '16px' }}>
              <SectionHeading title="Hide Date of Birth On Payment By Admission No." description="Hide Date of Birth if it is not blank On Payment By Admission No." />
            </div>
            <Toggle />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: 1, paddingRight: '16px' }}>
              <SectionHeading title="Enable Partial Payment" description="Allows the user to pay partial payment." />
              <div style={{ display: 'flex', gap: '24px', marginTop: '8px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#333', marginBottom: '4px' }}>Min. Amount</label>
                  <input type="text" defaultValue="0.0" style={{ width: '100%', padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', color: '#333' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#333', marginBottom: '4px' }}>Enable Fee Type</label>
                  <select style={{ width: '100%', padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', color: '#333' }}>
                    <option>All</option>
                  </select>
                </div>
              </div>
            </div>
            <Toggle />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: 1, paddingRight: '16px' }}>
              <SectionHeading title="Enable Multiple Gateway" description="Allows the user to select gateway." />
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '8px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#333' }}>Default Gateway</label>
                <select style={{ width: '180px', padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', color: '#333' }}>
                  <option>Select</option>
                </select>
              </div>
            </div>
            <Toggle />
          </div>

        </div>

        {/* Right Column */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div style={{ flex: 1, paddingRight: '16px' }}>
              <SectionHeading title="Disable Payment Time Availability" description="Disable online payment day-wise with time range" />
            </div>
            <Toggle />
          </div>

          <div style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '11px', color: '#333', marginBottom: '4px' }}>Allow Payment From Day</label>
              <select style={{ width: '100%', padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', color: '#333' }}>
                <option>-- Select --</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '11px', color: '#333', marginBottom: '4px' }}>Allow Payment Till Day</label>
              <select style={{ width: '100%', padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', color: '#333' }}>
                <option>-- Select --</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {DAYS.map(day => (
              <div key={day} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 1fr', gap: '16px', alignItems: 'center' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#333', cursor: 'pointer' }}>
                  <input type="checkbox" /> {day}
                </label>
                <select style={{ width: '100%', padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', color: '#333' }}>
                  <option>--Time--</option>
                </select>
                <select style={{ width: '100%', padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', color: '#333' }}>
                  <option>--Time--</option>
                </select>
              </div>
            ))}
          </div>
          
        </div>

      </div>

    </div>
  );
}
