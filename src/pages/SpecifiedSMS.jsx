import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const dummyContacts = [
  { id: 1, sno: '01', class: '4-A', rollNo: '6', admissionNo: '471', recipientName: 'ANUPAM SAMRAT', childName: 'ANUPAM SAMRAT', mobileNo: '9580340797' },
  { id: 2, sno: '02', class: '10-A', rollNo: '14', admissionNo: '1280', recipientName: 'DIVYANSHU YADAV', childName: 'DIVYANSHU YADAV', mobileNo: '9616148976' },
  { id: 3, sno: '03', class: '5-B', rollNo: '12', admissionNo: '512', recipientName: 'RAHUL KUMAR', childName: 'RAHUL KUMAR', mobileNo: '9876543210' },
  { id: 4, sno: '04', class: '9-C', rollNo: '22', admissionNo: '1023', recipientName: 'NEHA GUPTA', childName: 'NEHA GUPTA', mobileNo: '9123456780' },
];

const templates = {
  'Select': '',
  'Birthday': 'Wishing you a very Happy Birthday! May you have a great year ahead.',
  'Anniversary': 'Happy Anniversary! Wishing you many more years of happiness.',
  'Religion': 'Dear Parent, your child was absent today without prior notice.',
  'Transport SMS': 'Your ward has boarded the bus safely.'
};

const subjects = [
  'Select', 'Accounts', 'Admission', 'Attendance', 'Class Test SMS', 'Fees', 'Latecomers SMS', 'Library', 'Marks', 'Online Payment', 'Online Registration', 'Payroll', 'RFID Alert SMS', 'Secret Code SMS', 'Single SMS', 'SMS TO MOBILE', 'Specified', 'Stocks', 'Subject Absentee SMS', 'Transport'
];

function SpecifiedSMS() {
  const [smsType, setSmsType] = useState('Select');
  const [smsText, setSmsText] = useState('');
  const [copyToSender, setCopyToSender] = useState(false);
  const [date, setDate] = useState('');
  const [smsSubject, setSmsSubject] = useState('Select');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [contacts, setContacts] = useState([]); // Initially empty, populated by "Get Contact"
  const [selectedIds, setSelectedIds] = useState([]);

  // Calculations for character count and SMS count
  const maxChars = 918;
  const charsPerSms = 160;
  const currentChars = smsText.length;
  const currentSmsCount = currentChars > 0 ? Math.ceil(currentChars / charsPerSms) : 0;

  const handleSmsTypeChange = (e) => {
    const val = e.target.value;
    setSmsType(val);
    if (templates[val] !== undefined) {
      setSmsText(templates[val]);
    }
  };

  const handleSmsChange = (e) => {
    if (e.target.value.length <= maxChars) {
      setSmsText(e.target.value);
    }
  };

  // Get Contacts Action
  const handleGetContact = () => {
    // Simulate fetching contacts
    setContacts(dummyContacts);
    setSelectedIds([]); // reset selection
  };

  // Handle Search Filtering
  const filteredContacts = contacts.filter(contact => 
    contact.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.admissionNo.includes(searchTerm) ||
    contact.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Checkbox logic
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredContacts.map(c => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selId => selId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Send SMS Action
  const handleSendSMS = () => {
    if (selectedIds.length === 0) {
      alert('Please select at least one contact to send the SMS.');
      return;
    }
    if (!smsText.trim()) {
      alert('SMS text cannot be empty.');
      return;
    }
    alert(`SMS sent successfully to ${selectedIds.length} recipients!`);
    // Reset form after sending
    setContacts([]);
    setSelectedIds([]);
    setSmsType('Select');
    setSmsText('');
    setDate('');
    setSmsSubject('Select');
    setCopyToSender(false);
  };

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Header Bar */}
      <div style={{ padding: '24px 32px 16px 32px' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Specified SMS</h1>
      </div>

      {/* Main Content Card */}
      <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '32px', display: 'flex', flexDirection: 'column' }}>
          
          <div style={{ display: 'flex', gap: 64, marginBottom: 48 }}>
            
            {/* Left Column (Form) */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
              
              {/* SMS Type */}
              <div style={formRowStyle}>
                <label style={labelStyle}>SMS Type</label>
                <div style={{ flex: 1 }}>
                  <select 
                    value={smsType} 
                    onChange={handleSmsTypeChange}
                    style={{ ...inputStyle, borderColor: '#5c6bc0', color: '#5c6bc0' }}
                  >
                    <option value="Select">Select</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Religion">Religion</option>
                    <option value="Transport SMS">Transport SMS</option>
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

              {/* Date */}
              <div style={formRowStyle}>
                <label style={labelStyle}>Date</label>
                <div style={{ flex: 1 }}>
                  <input 
                    type="date" 
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Get Contact Button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
                <button onClick={handleGetContact} style={{ background: '#5cb85c', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: 4, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                  Get Contact
                </button>
              </div>

            </div>

            {/* Right Column (Message Codes & Template) */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
              
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: '#334155', margin: '0 0 24px 0' }}>SMS Template</h2>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <label style={{ fontSize: 13, color: '#475569', fontWeight: 600, width: 100 }}>SMS Subject</label>
                  <div style={{ flex: 1 }}>
                    <select 
                      value={smsSubject} 
                      onChange={e => setSmsSubject(e.target.value)}
                      style={inputStyle}
                    >
                      {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
              </div>

            </div>
            
          </div>
          
          {/* Table Section */}
          {contacts.length > 0 && (
            <>
              <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '0 0 24px 0' }} />
              
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
                  <div style={{ position: 'relative', width: 250 }}>
                    <FaSearch style={{ position: 'absolute', left: 12, top: 10, color: '#94a3b8', fontSize: 13 }} />
                    <input 
                      type="text" 
                      placeholder="Search..." 
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      style={{ width: '100%', padding: '8px 12px 8px 32px', borderRadius: 4, border: '1px solid #cbd5e1', outline: 'none', fontSize: 13, boxSizing: 'border-box' }} 
                    />
                  </div>
                </div>

                <div style={{ overflowX: 'auto', minHeight: 150 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: '#f8fafc' }}>
                        <th style={thStyle}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <input 
                              type="checkbox" 
                              checked={filteredContacts.length > 0 && selectedIds.length === filteredContacts.length}
                              onChange={handleSelectAll}
                            /> 
                            S.No.
                          </div>
                        </th>
                        <th style={thStyle}>Class</th>
                        <th style={thStyle}>Roll No</th>
                        <th style={thStyle}>Admission No.</th>
                        <th style={thStyle}>Recipient Name</th>
                        <th style={thStyle}>Child Name</th>
                        <th style={thStyle}>Mobile No</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredContacts.length > 0 ? filteredContacts.map((contact, idx) => (
                        <tr key={contact.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={tdStyle}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <input 
                                type="checkbox" 
                                checked={selectedIds.includes(contact.id)}
                                onChange={() => handleSelectOne(contact.id)}
                              /> 
                              {idx < 9 ? `0${idx + 1}` : idx + 1}
                            </div>
                          </td>
                          <td style={tdStyle}>{contact.class}</td>
                          <td style={tdStyle}>{contact.rollNo}</td>
                          <td style={tdStyle}>{contact.admissionNo}</td>
                          <td style={tdStyle}>{contact.recipientName}</td>
                          <td style={tdStyle}>{contact.childName}</td>
                          <td style={tdStyle}>{contact.mobileNo}</td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="7" style={{ textAlign: 'center', padding: '24px', color: '#94a3b8' }}>
                            {contacts.length === 0 ? "Click 'Get Contact' to load recipients." : "No matching records found."}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
                  <button onClick={handleSendSMS} style={{ background: '#5cb85c', color: '#fff', border: 'none', padding: '12px 32px', borderRadius: 4, fontSize: 14, fontWeight: 600, cursor: 'pointer', opacity: selectedIds.length === 0 ? 0.6 : 1 }}>
                    Send SMS
                  </button>
                </div>

              </div>
            </>
          )}

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

const thStyle = {
  padding: '14px 16px',
  textAlign: 'left',
  fontSize: 13,
  fontWeight: 700,
  color: '#0f172a',
  borderBottom: '2px solid #e2e8f0',
  whiteSpace: 'nowrap'
};

const tdStyle = {
  padding: '12px 16px',
  fontSize: 13,
  color: '#475569',
  whiteSpace: 'nowrap'
};

export default SpecifiedSMS;
