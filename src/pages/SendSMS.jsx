import React, { useState } from 'react';
import { FaVideo } from 'react-icons/fa';

function SendSMS() {
  const [smsSubject, setSmsSubject] = useState('Select');
  const [language, setLanguage] = useState('ENGLISH');
  const [smsText, setSmsText] = useState('');
  const [copyToSender, setCopyToSender] = useState(false);
  const [sendTo, setSendTo] = useState('Select');

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

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Header Bar */}
      <div style={{ padding: '24px 32px 16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Send SMS</h1>
        
        <button style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 8, color: '#5cb85c', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
          Video Tutorial <FaVideo size={16} />
        </button>
      </div>

      {/* Main Content Card */}
      <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '32px', flex: 1, display: 'flex', gap: 48 }}>
          
          {/* Left Column (Form) */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
            
            {/* SMS Subject */}
            <div style={formRowStyle}>
              <label style={labelStyle}>SMS Subject</label>
              <div style={{ flex: 1 }}>
                <select 
                  value={smsSubject} 
                  onChange={e => setSmsSubject(e.target.value)}
                  style={inputStyle}
                >
                  <option value="Select">Select</option>
                  <option value="Accounts">Accounts</option>
                  <option value="Admission">Admission</option>
                  <option value="Attendance">Attendance</option>
                  <option value="Class Test SMS">Class Test SMS</option>
                  <option value="Fees">Fees</option>
                  <option value="Latecomers SMS">Latecomers SMS</option>
                  <option value="Library">Library</option>
                  <option value="Marks">Marks</option>
                  <option value="Online Payment">Online Payment</option>
                  <option value="Online Registration">Online Registration</option>
                  <option value="Payroll">Payroll</option>
                  <option value="RFID Alert SMS">RFID Alert SMS</option>
                  <option value="Secret Code SMS">Secret Code SMS</option>
                  <option value="Single SMS">Single SMS</option>
                  <option value="SMS TO MOBILE">SMS TO MOBILE</option>
                  <option value="Specified">Specified</option>
                  <option value="Stocks">Stocks</option>
                  <option value="Subject Absentee SMS">Subject Absentee SMS</option>
                  <option value="Transport">Transport</option>
                </select>
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
                  <option value="GUJRATI">GUJRATI</option>
                  <option value="BENGALI">BENGALI</option>
                  <option value="HINDI">HINDI</option>
                  <option value="KANNADA">KANNADA</option>
                  <option value="MALAYALAM">MALAYALAM</option>
                  <option value="MARATHI">MARATHI</option>
                  <option value="PUNJABI">PUNJABI</option>
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
                
                {/* Send SMS copy to sender */}
                <div style={{ display: 'flex', alignItems: 'center', marginTop: 16, gap: 12 }}>
                  <span style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>Send sms copy to sender</span>
                  <div 
                    onClick={() => setCopyToSender(!copyToSender)}
                    style={{ 
                      display: 'flex', alignItems: 'center', background: copyToSender ? '#5cb85c' : '#e2e8f0', 
                      borderRadius: 20, padding: '2px 4px', width: 64, cursor: 'pointer', transition: '0.3s',
                      justifyContent: copyToSender ? 'flex-end' : 'flex-start'
                    }}
                  >
                    <div style={{ width: 14, height: 14, background: '#fff', borderRadius: '50%' }} />
                    {!copyToSender && <span style={{ fontSize: 9, fontWeight: 700, color: '#64748b', marginLeft: 4 }}>FALSE</span>}
                    {copyToSender && <span style={{ fontSize: 9, fontWeight: 700, color: '#fff', marginRight: 4 }}>TRUE</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* Send To */}
            <div style={formRowStyle}>
              <label style={labelStyle}>Send To</label>
              <div style={{ flex: 1 }}>
                <select 
                  value={sendTo} 
                  onChange={e => setSendTo(e.target.value)}
                  style={inputStyle}
                >
                  <option value="Select">Select</option>
                  <option value="Student">Student</option>
                  <option value="Parent">Parent</option>
                  <option value="Staff">Staff</option>
                </select>
              </div>
            </div>

          </div>

          {/* Right Column (Message Codes & Template) */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
            
            {/* Message Codes */}
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: '#334155', margin: '0 0 16px 0' }}>Message Codes</h2>
              <div style={{ background: '#f8fafc', padding: 16, borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13, color: '#475569', lineHeight: 1.6 }}>
                <div><b>S____ :</b> Student Name ('S' and 4 times underscore)</div>
                <div><b>R____ :</b> Receiver name; As per the selection 'Send To' ('R' and 4 times underscore)</div>
                <div><b>C____ :</b> Class Name ('C' and 4 times underscore)</div>
                <div><b>ADNo____ :</b> Admission Number ('ADNo' and 4 times underscore)</div>
                <div><b>MSUsr____ :</b> Microsoft Teams Username</div>
                <div><b>MSPsw____ :</b> Microsoft Teams Password</div>
                <div><b>Fr____ :</b> Father's name</div>
                <div><b>DOB____ :</b> Date Of Birth</div>
              </div>
            </div>

            {/* SMS Template */}
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: '#334155', margin: '0 0 16px 0' }}>SMS Template</h2>
              <div style={{ background: '#f8fafc', padding: 16, borderRadius: 8, border: '1px solid #e2e8f0', minHeight: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: 13 }}>
                Select a subject to view templates
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

export default SendSMS;
