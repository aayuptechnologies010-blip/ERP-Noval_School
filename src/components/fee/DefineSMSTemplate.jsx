import React, { useState } from 'react';
import { Plus, Save, Eye, Printer, XCircle } from 'lucide-react';

const Toggle = ({ label }) => {
  const [checked, setChecked] = useState(false);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span style={{ fontSize: '13px', color: '#333' }}>{label}</span>
      <div 
        onClick={() => setChecked(!checked)}
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
    </div>
  );
};

const OutlineButton = ({ icon: Icon, text, color }) => (
  <button style={{
    display: 'flex', alignItems: 'center', gap: '6px',
    padding: '6px 16px', backgroundColor: '#fff', border: `1px solid ${color}`, borderRadius: '4px',
    color: color, fontSize: '13px', fontWeight: 500, cursor: 'pointer'
  }}>
    <Icon size={14} /> {text}
  </button>
);

const VARS_LEFT = [
  'StudentName :- S____',
  'Receiving Date :- Rd____',
  'Installment Name:- IN____',
  'School name:- #school__',
  'Salary Month:- M____',
  'Absent Days:- AB____',
  'Payment URL:- #payurl__',
  'Slot Time:- St____',
  'Expiry Date:- ExpDate__'
];

const VARS_MIDDLE = [
  'Amount :- Amt____',
  'ReceiptNo :- Rid____',
  'RegistrationNo:- #RegNo__',
  'Class Name:- #Class__',
  'Total Days:- W____',
  'Total Salary:- Sal____',
  'Adm No:- #AdmNo____',
  'Exam Location:- EL____',
  'Join Date:- JoinDate__'
];

const VARS_RIGHT = [
  'Bus Stop Name:- #Stop__',
  'VehIcle Name:- #VehIcle__',
  'Route Name:- #Route__',
  'Staff Name:- R____',
  'Present Days:- D____',
  'Line Change:- %0A',
  'Slot Date:- Sd____',
  'Designation:- Des____',
  'Travel From:- TrFrm__'
];

export default function DefineSMSTemplate() {
  return (
    <div style={{ background: '#fff', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', flex: 1 }}>
        
        {/* Top Section */}
        <div style={{ padding: '32px 40px', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: '100%', maxWidth: '900px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Form Fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px', margin: '0 auto', width: '100%' }}>
              
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>SMS Type</label>
                <select style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px', color: '#333' }}>
                  <option>Select Type</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>SMS</label>
                <textarea style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px', color: '#333', minHeight: '80px', resize: 'vertical' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Template ID</label>
                <input type="text" style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px', color: '#333' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                <div style={{ display: 'flex', gap: '32px' }}>
                  <Toggle label="SMS Enable" />
                  <Toggle label="Is Unicode" />
                  <Toggle label="Push Notification Enable" />
                </div>
                <button style={{ backgroundColor: '#29a9d8', border: 'none', borderRadius: '4px', width: '32px', height: '32px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', cursor: 'pointer' }}>
                  <Plus size={16} />
                </button>
              </div>

            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '16px' }}>
              <OutlineButton icon={Save} text="Save" color="#4ade80" />
              <OutlineButton icon={Eye} text="View" color="#29a9d8" />
              <OutlineButton icon={Printer} text="Print" color="#29a9d8" />
              <OutlineButton icon={XCircle} text="Reset" color="#f59e0b" />
            </div>

          </div>
        </div>

        {/* Bottom Section (Note and Variables) */}
        <div style={{ background: '#f4f6f8', padding: '32px 40px', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: '100%', maxWidth: '900px' }}>
            <p style={{ fontSize: '15px', color: '#4b5563', textAlign: 'center', marginBottom: '24px', marginTop: 0 }}>
              Note:- For using all below fields please use the symbols of that fields instead of field Name.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', fontSize: '11px', color: '#333', padding: '0 40px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {VARS_LEFT.map(v => <span key={v}>{v}</span>)}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {VARS_MIDDLE.map(v => <span key={v}>{v}</span>)}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {VARS_RIGHT.map(v => <span key={v}>{v}</span>)}
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
