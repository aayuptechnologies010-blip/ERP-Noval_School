import React, { useState } from 'react';

const subjects = [
  'Select', 'Accounts', 'Admission', 'Attendance', 'Class Test SMS', 'Fees', 'Latecomers SMS', 'Library', 'Marks', 'Online Payment', 'Online Registration', 'Payroll', 'RFID Alert SMS', 'Secret Code SMS', 'Single SMS', 'SMS TO MOBILE', 'Specified', 'Stocks', 'Subject Absentee SMS', 'Transport'
];

const templates = {
  'Select': '',
  'Fees': 'Dear Parent, your fee payment is due. Please clear the dues at the earliest.',
  'Attendance': 'Dear Parent, your child was marked absent today.',
  'Online Registration': 'Thank you for registering online. We will get back to you shortly.',
};

function TextToNumber() {
  const [selectMode, setSelectMode] = useState('Mobile No.');
  const [number, setNumber] = useState('');
  const [language, setLanguage] = useState('ENGLISH');
  const [smsText, setSmsText] = useState('');
  const [smsSubject, setSmsSubject] = useState('Select');
  
  // Calculations for character count and SMS count
  const maxChars = 918;
  const charsPerSms = 160;
  const currentChars = smsText.length;
  const currentSmsCount = currentChars > 0 ? Math.ceil(currentChars / charsPerSms) : 0;

  const handleSmsChange = (e) => {
    if (e.target.value.length <= maxChars) {
      setSmsText(e.target.value);
    }
  };

  const handleSubjectChange = (e) => {
    const val = e.target.value;
    setSmsSubject(val);
    if (templates[val] !== undefined) {
      setSmsText(templates[val]);
    }
  };

  const handleSendSMS = async () => {
    if (selectMode === 'Mobile No.' && !number.trim()) {
      alert('Please enter a mobile number.');
      return;
    }
    if (!smsText.trim()) {
      alert('SMS text cannot be empty.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const payload = {
        subject: smsSubject,
        language: language,
        message: smsText,
        sendCopy: false,
        sendTo: selectMode === 'Mobile No.' ? number : 'Bulk Contacts'
      };

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/sms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert(`SMS sent successfully via ${selectMode}!`);
        // Reset form after sending
        setSelectMode('Mobile No.');
        setNumber('');
        setLanguage('ENGLISH');
        setSmsText('');
        setSmsSubject('Select');
      } else {
        const errorData = await response.json();
        alert(`Failed to send SMS: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error sending TextToNumber SMS:", error);
      alert('An error occurred while sending the SMS.');
    }
  };

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Header Bar */}
      <div style={{ padding: '24px 32px 16px 32px' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Text to Number</h1>
      </div>

      {/* Main Content Card */}
      <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '32px', display: 'flex', flexDirection: 'column' }}>
          
          <div style={{ display: 'flex', gap: 64 }}>
            
            {/* Left Column (Form) */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
              
              {/* Select Mode */}
              <div style={formRowStyle}>
                <label style={labelStyle}>Select Mode</label>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 16, height: 42 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#475569', cursor: 'pointer' }}>
                    <input 
                      type="radio" 
                      name="selectMode"
                      value="Mobile No."
                      checked={selectMode === 'Mobile No.'}
                      onChange={e => setSelectMode(e.target.value)}
                      style={{ accentColor: '#3b82f6' }}
                    />
                    Mobile No.
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#475569', cursor: 'pointer' }}>
                    <input 
                      type="radio" 
                      name="selectMode"
                      value="Bulk"
                      checked={selectMode === 'Bulk'}
                      onChange={e => setSelectMode(e.target.value)}
                      style={{ accentColor: '#3b82f6' }}
                    />
                    Bulk(.txt,.xlsx,.xls)
                  </label>
                </div>
              </div>

              {/* Number or File Upload */}
              <div style={formRowStyle}>
                <label style={labelStyle}>{selectMode === 'Mobile No.' ? 'Number' : 'Upload File'}</label>
                <div style={{ flex: 1 }}>
                  {selectMode === 'Mobile No.' ? (
                    <input 
                      type="text" 
                      value={number}
                      onChange={e => setNumber(e.target.value)}
                      style={inputStyle}
                    />
                  ) : (
                    <input 
                      type="file" 
                      accept=".txt,.xlsx,.xls"
                      style={{ ...inputStyle, padding: '7px 12px' }}
                    />
                  )}
                </div>
              </div>

              {/* Select Language */}
              <div style={formRowStyle}>
                <label style={labelStyle}>Select Language</label>
                <div style={{ flex: 1 }}>
                  <select 
                    value={language} 
                    onChange={e => setLanguage(e.target.value)}
                    style={inputStyle}
                  >
                    <option value="ENGLISH">ENGLISH</option>
                    <option value="HINDI">HINDI</option>
                  </select>
                </div>
              </div>

              {/* SMS Textarea */}
              <div style={formRowStyle}>
                <label style={labelStyle}>SMS</label>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600, marginBottom: 4 }}>
                    (Maximum Characters : {maxChars} )
                  </div>
                  <textarea 
                    value={smsText}
                    onChange={handleSmsChange}
                    style={{ ...inputStyle, minHeight: 120, resize: 'vertical' }}
                  />
                  <div style={{ fontSize: 11, color: '#475569', fontWeight: 600, marginTop: 4, display: 'flex', gap: 8 }}>
                    <span>Chars Count: <b>{currentChars}</b></span>
                    <span>SMS Count: <b>{currentSmsCount}</b></span>
                    <span style={{ color: '#64748b' }}>( 1 SMS = {charsPerSms} Chars )</span>
                  </div>
                </div>
              </div>

              {/* Send SMS Button */}
              <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: 8 }}>
                <button onClick={handleSendSMS} style={{ background: '#5cb85c', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: 4, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                  Send SMS
                </button>
              </div>

            </div>

            {/* Right Column (Message Template) */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
              
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: '#334155', margin: '0 0 24px 0' }}>SMS Template</h2>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <label style={{ fontSize: 13, color: '#475569', fontWeight: 600, width: 100 }}>SMS Subject</label>
                  <div style={{ flex: 1 }}>
                    <select 
                      value={smsSubject} 
                      onChange={handleSubjectChange}
                      style={inputStyle}
                    >
                      {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
              </div>

            </div>
            
          </div>

        </div>
      </div>
    </div>
  );
}

const formRowStyle = {
  display: 'flex',
  alignItems: 'flex-start'
};

const labelStyle = {
  width: 140,
  fontSize: 13,
  color: '#475569',
  fontWeight: 600,
  paddingTop: 10
};

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: 4,
  border: '1px solid #cbd5e1',
  outline: 'none',
  fontSize: 14,
  color: '#334155',
  boxSizing: 'border-box'
};

export default TextToNumber;
