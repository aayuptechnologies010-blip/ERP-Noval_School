import React, { useState, useEffect } from 'react';
import { Save, Check, X } from 'lucide-react';

const Toggle = ({ checked, onChange }) => (
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

export default function CollectionPageSetting() {
  const [toggles, setToggles] = useState({});
  const [customFields, setCustomFields] = useState({
    defaultFeeType: '',
    defaultFeeEntryMode: 'School',
    defaultFeePayMode: 'Cash',
    chequeBounceFine: '0.00',
    manualLateFineOption: 'All Installment',
    dateOfAmountCreditBank2PayMode: 'All (10)',
    backDateSchool: false,
    backDateBank: false,
    allowNoOfBackDate: '100',
    futureDateSchool: false,
    futureDateBank: false,
    noOfDaysAfterDueToLockEcareap: '0'
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);
  const [isError, setIsError] = useState(false);

  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
  const SETTING_KEY = 'CollectionPage';

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
          setToggles(data.toggles || {});
          setCustomFields(data.customFields || customFields);
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
    const payload = { toggles, customFields };

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
      setToastMsg('Collection Page Settings saved successfully');
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

  const toggleVal = (key) => () => setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  const handleCustomField = (e) => {
    const { name, value, type, checked } = e.target;
    setCustomFields(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const settingsList = [
    { key: 'waiveOffCheckbox', title: 'Waive off checkbox', desc: 'Allows the user to show the checkbox of waive off on fee entry form, so that, the late fine can be waived off from the student' },
    { key: 'waiveOffOptionAutoCheck', title: 'Waive off option auto check', desc: 'Allows the user to automatically waive off fine for every entry for a particular installment(s) for a particular student' },
    { key: 'waiveOffWithReason', title: 'Waive off with reason', desc: 'Allows the user to enter the reason at the time of waiving off the fine for a particular installment(s)' },
    { key: 'waiveOffWithChequeBounce', title: 'Waive off with cheque bounce', desc: 'Allows the user to waive the late fine and cheque bounce amount together for a particular installment(s)' },
    { key: 'manualLateFine', title: 'Manual late fine', desc: 'Allows the user to take the manual late fine for a particular installment(s). Manual late fine cancels the assigned late fine if any for that installments(s)', 
      custom: (
        <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
          <label style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
            <input type="radio" name="manualLateFineOption" value="First Installment" checked={customFields.manualLateFineOption === 'First Installment'} onChange={handleCustomField} /> First Installment
          </label>
          <label style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
            <input type="radio" name="manualLateFineOption" value="All Installment" checked={customFields.manualLateFineOption === 'All Installment'} onChange={handleCustomField} /> All Installment
          </label>
        </div>
      )
    },
    { key: 'manualChequeBounce', title: 'Manual cheque bounce', desc: 'Allows the user to take the manual cheque bounce amount for a particular installment(s). This option cancels the assigned amount if any for cheque bounce' },
    { key: 'calculateLateFineChequeDate', title: 'Calculate Late Fine on cheque date', desc: 'Allows the user to calculate late fine on cheque date' },
    { key: 'runTimeConcession', title: 'Run time concession', desc: 'Allows the user to give the run time concession to the student for a particular installment(s)' },
    { key: 'askReasonRunTimeConcession', title: 'Ask reason on run time concession', desc: 'Allows the user to enter the reason at the time of run time concession to be given for a particular installment(s)' },
    
    { key: 'advanceAmountAdjustment', title: 'Advance amount adjustment', desc: 'Allows the user to adjust advance amount for a particular receipt report(s)' },
    { key: 'advanceReceiptAcceptance', title: 'Advance receipt acptance', desc: 'Allows the user to receive advance amount for paid installment. This is only applicable when the installment amount is already taken' },
    { key: 'discount', title: 'Discount', desc: 'Allows the user to give the discount on fee of a particular installment(s) to a particular student. Discount is always given on the total amount of an installment(s). It is completely different from concession' },
    
    { key: 'reuseFeeReceiptNumber', title: 'Reuse fee receipt number.', desc: 'Allows user to reuse cancelled fee receipt for a particular student of a particular installment(s)' },
    { key: 'printFeeReceiptAfterSave', title: 'Print fee receipt after save', desc: 'Allows the user to automatically print the fee receipt after entry is done and saved' },
    { key: 'modifyChequeDetails', title: 'Modify Cheque Details', desc: 'Allows the user to modify Cheque Details after fee received' },
    
    { key: 'smsAfterFeeEntry', title: 'SMS after fee entry', desc: 'Allows the user to send the fee deposit SMS to the parent after fee entry is done' },
    { key: 'paymentFromMidYear', title: 'Payment from mid year', desc: "Allows the user to re-structure the student's fee structure from the installment school wishes to do" },
    { key: 'referenceNumber', title: 'Referance number', desc: 'Allows the user to enter the reference number at the time of fee entry in case of exception so that user can see it in the report(s)' },
    
    { key: 'micrNumber', title: 'MICR number', desc: 'Allows the user to show the MICR No. on fee entry form when the paymode is cheque' },
    { key: 'mandateMicrNumber', title: 'Mandate MICR number', desc: 'Allows the user to make the MICR No. as mandatory field' },
    { key: 'tcNumberBookNoWise', title: 'TC Number Book No. Wise', desc: 'Allows the user to generate separate TC Number for different Book No' },
    
    { key: 'allowDepositeBank', title: 'Allow Deposite Bank', desc: 'Allows the user to select deposit Bank in fees entry form' },
    { key: 'dateOfAmountCreditBank1', title: 'Date of amount credit in bank', desc: 'Allows the user to enable the bank date option on fee entry form. This option shows the date on which the amount is credited in the bank' },
    { key: 'dateOfAmountCreditBank2', title: 'Date of amount credit in bank', desc: 'Allows the user to make the date of amount credit in bank as mandatory field', 
      custom: (
        <div style={{ marginTop: '8px' }}>
          <span style={{ fontSize: '11px', color: '#64748b', display: 'block', marginBottom: '2px' }}>PayMode</span>
          <select name="dateOfAmountCreditBank2PayMode" value={customFields.dateOfAmountCreditBank2PayMode} onChange={handleCustomField} style={{ width: '120px', padding: '4px', fontSize: '11px', border: '1px solid #d1d5db', borderRadius: '2px' }}>
            <option value="All (10)">All (10)</option>
          </select>
        </div>
      )
    },
    
    { key: 'backDateReceiptEntry', title: 'Back date receipt entry', desc: 'Do not Allows user to select the back date from the current date', 
      custom: (
        <div style={{ marginTop: '8px', display: 'flex', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}><input type="checkbox" name="backDateSchool" checked={customFields.backDateSchool} onChange={handleCustomField} /> School</label>
            <label style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}><input type="checkbox" name="backDateBank" checked={customFields.backDateBank} onChange={handleCustomField} /> Bank</label>
          </div>
          <div>
            <span style={{ fontSize: '11px', display: 'block', marginBottom: '2px' }}>Allow no.of back date</span>
            <input type="text" name="allowNoOfBackDate" value={customFields.allowNoOfBackDate} onChange={handleCustomField} style={{ width: '60px', padding: '2px 4px', fontSize: '11px', border: '1px solid #d1d5db', borderRadius: '2px' }} />
          </div>
        </div>
      )
    },
    { key: 'futureDateReceiptEntry', title: 'Future date receipt entry', desc: 'Do not Allows user to select next date from the current date',
      custom: (
        <div style={{ marginTop: '8px', display: 'flex', gap: '16px' }}>
          <label style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}><input type="checkbox" name="futureDateSchool" checked={customFields.futureDateSchool} onChange={handleCustomField} /> School</label>
          <label style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}><input type="checkbox" name="futureDateBank" checked={customFields.futureDateBank} onChange={handleCustomField} /> Bank</label>
        </div>
      )
    },
    { key: 'enableVatGst', title: 'Enable VAT/GST', desc: 'Allows the user to take VAT/GST on heads' },
    
    { key: 'defaultSelectionDepositeBank', title: 'Default Selection of Deposite Bank', desc: 'Deposite Bank Selected from fee group head relation while searching student' },
    { key: 'enableEveningTransport', title: 'Enable Evening Transport', desc: 'Allows the user to assing transport seperate for morning and evening both' },
    { key: 'disableCanceledReceiptInReport', title: 'Disable Canceled receipt in Report', desc: 'Allows the user to do not show Canceled receipt in Collection Report' },
    
    { key: 'transportModificationAfterReceivingFee', title: 'Transport Modification After Receiving Fee', desc: 'Allows the user to modify transport fee,stop,rout and other after fee received' },
    { key: 'enableToTakeFeeForAllSibling', title: 'Enable to take fee for all sibling', desc: 'Allows the user to take fee for all sibling' },
    { key: 'enableAutoCheckedToAddSibling', title: 'Enable auto checked to add sibling', desc: 'Allows the user to include all sibling while search student' },
    
    { key: 'allowUserToCheckInstallmentSequence', title: 'Allow the user to check installment in sequence', desc: 'Allow the user to check installment in sequence while receiving fee' },
    { key: 'enableSponsor', title: 'Enable Sponsor', desc: 'Allow the user to select sponsor while receiving fee' },
    { key: 'enableInactiveStudentShow', title: 'Enable Inactive Student show', desc: 'Allow the user to show inactive student on fee entry page' },
    
    { key: 'enableLastSelectedDepositeBank', title: 'Enable Last Selected Deposite Bank', desc: 'Allows the user to enable last selected deposite bank' },
    { key: 'enableSmsAutoChecked', title: 'Enable SMS Auto Checked', desc: 'Allows the user to set auto select sms' },
    { key: 'enablePaymodeReset', title: 'Enable Paymode Reset', desc: 'Allows the user to enable reset paymode after entry' },
    
    { key: 'disableRefreshPageAfterEntry', title: 'Disable Refresh Page After Entry', desc: 'Allows the user to disable page to refresh page.' },
    { key: 'disableModificationAmount', title: 'Disable Modification Amount', desc: 'Allow the user to disable amount modification while receiving fee' },
    { key: 'freezeAllAmountOnPage', title: 'Freeze All Amount On Page', desc: 'Allow the user to Freeze amount on page' },
    
    { key: 'assignConcession', title: 'Assign Concession', desc: 'Allows the user to select Assign Concession' },
    { key: 'freezeDueIntallments', title: 'Freeze Due Intallments', desc: 'Freeze installment on fee entry Page' },
    { key: 'receivedDateReset', title: 'Received Date Reset', desc: 'Received date should automatically get reset after received' },
    
    { key: 'transportAmountAdjustInAdvance', title: 'Tranport Amount adjust in Advance', desc: 'Allows the user to adjust transport amount in advance after modification' },
    { key: 'noOfDaysAfterDueToLockEcareap', title: 'No of days after due to lock ecareap', desc: 'Allow no of days',
      custom: (
        <div style={{ marginTop: '4px' }}>
          <input type="text" name="noOfDaysAfterDueToLockEcareap" value={customFields.noOfDaysAfterDueToLockEcareap} onChange={handleCustomField} style={{ width: '60px', padding: '2px 4px', fontSize: '11px', border: '1px solid #d1d5db', borderRadius: '2px' }} />
        </div>
      )
    },
    { key: 'enableManualDate', title: 'Enable Manual Date', desc: 'Allows the user to enter date manually.' },
    { key: 'enableTimeInBankDate', title: 'Enable Time In Bank Date', desc: 'Allow User To Enable Time In Bank Date (Fee Entry Page)' },
  ];

  return (
    <div style={{ background: '#fff', minHeight: '100%', position: 'relative' }}>
      
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

      {/* Top Section */}
      <div style={{ padding: '24px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Default Fee Type</label>
            <select name="defaultFeeType" value={customFields.defaultFeeType} onChange={handleCustomField} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', color: '#333' }}>
              <option value="">Select Fees Type</option>
              <option value="School Fee">School Fee</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Default Fee Entry Mode Used</label>
            <select name="defaultFeeEntryMode" value={customFields.defaultFeeEntryMode} onChange={handleCustomField} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', color: '#333' }}>
              <option value="School">School</option>
              <option value="Bank">Bank</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Default Fee Pay Mode Used</label>
            <select name="defaultFeePayMode" value={customFields.defaultFeePayMode} onChange={handleCustomField} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', color: '#333' }}>
              <option value="Cash">Cash</option>
              <option value="Cheque">Cheque</option>
              <option value="Online">Online</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Cheque Bounce Fine</label>
            <input type="text" name="chequeBounceFine" value={customFields.chequeBounceFine} onChange={handleCustomField} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', color: '#333' }} />
          </div>
        </div>

        <p style={{ fontSize: '11.5px', color: '#4b5563', lineHeight: '1.5' }}>
          *These settings show/hide the following options from the fee entry form to avoid getting the form clustered and to hide the settings for the schools which are not of their use. Moreover, these settings can be changed any time depending upon the requirement of the schools.
        </p>
      </div>

      <div style={{ height: '1px', background: '#e2e8f0', margin: '0 32px' }} />

      {/* Heading */}
      <div style={{ textAlign: 'center', margin: '24px 0 32px 0', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '50%', left: '32px', right: '32px', height: '1px', background: '#e2e8f0', zIndex: 1 }} />
        <span style={{ position: 'relative', zIndex: 2, background: '#fff', padding: '0 16px', fontSize: '13px', fontWeight: 700, color: '#333', letterSpacing: '0.05em' }}>
          ENABLE/DISABLE OPTIONS ON FEES ENTRY FORM
        </span>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>Loading settings...</div>
      ) : (
        <>
          {/* Grid */}
          <div style={{ padding: '0 32px 40px 32px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px 48px' }}>
            {settingsList.map(setting => (
              <div key={setting.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ paddingRight: '16px' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#111827', margin: '0 0 4px 0' }}>{setting.title}</h4>
                  <p style={{ fontSize: '11px', color: '#64748b', margin: 0, lineHeight: '1.4' }}>{setting.desc}</p>
                  {setting.custom}
                </div>
                <Toggle checked={!!toggles[setting.key]} onChange={toggleVal(setting.key)} />
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', padding: '0 0 40px 0' }}>
            <button 
              onClick={handleSave}
              disabled={submitting}
              style={{
                backgroundColor: submitting ? '#9ca3af' : '#29a9d8', 
                color: '#fff', 
                border: 'none', 
                padding: '10px 48px',
                borderRadius: '4px', 
                fontSize: '14px', 
                fontWeight: 600, 
                cursor: submitting ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}>
              <Save size={16} /> {submitting ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </>
      )}

    </div>
  );
}
