import React, { useState } from 'react';
import { FaBold, FaItalic, FaUnderline, FaPaperclip, FaSearch } from 'react-icons/fa';

const dummyContacts = [
  { id: 1, sno: '01', class: '4-A', rollNo: '6', admissionNo: '471', recipientName: 'ANUPAM SAMRAT', childName: 'ANUPAM SAMRAT', mobileNo: '9580340797' },
  { id: 2, sno: '02', class: '10-A', rollNo: '14', admissionNo: '1280', recipientName: 'DIVYANSHU YADAV', childName: 'DIVYANSHU YADAV', mobileNo: '9616148976' },
  { id: 3, sno: '03', class: '5-B', rollNo: '12', admissionNo: '512', recipientName: 'RAHUL KUMAR', childName: 'RAHUL KUMAR', mobileNo: '9876543210' },
  { id: 4, sno: '04', class: '9-C', rollNo: '22', admissionNo: '1023', recipientName: 'NEHA GUPTA', childName: 'NEHA GUPTA', mobileNo: '9123456780' },
];

const templates = {
  'Select': { subject: 'Select', message: '' },
  'Birthday': { subject: 'Birthday', message: 'Wishing you a very Happy Birthday! May you have a great year ahead.' },
  'Anniversary': { subject: 'Anniversary', message: 'Happy Anniversary! Wishing you many more years of happiness.' },
  'Fees': { subject: 'Transport SMS', message: 'Dear Parent, Please pay the pending fees for the current term.' },
  'Attendance': { subject: 'Religion', message: 'Dear Parent, your child was absent today without prior notice.' }
};

function SpecifiedMessage() {
  const [messageSubject, setMessageSubject] = useState('Select');
  const [messageBody, setMessageBody] = useState('');
  const [sendTo, setSendTo] = useState('Select');
  const [templateSubject, setTemplateSubject] = useState('Select');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [contacts, setContacts] = useState([]); // Initially empty, populated by "Get Contact"
  const [selectedIds, setSelectedIds] = useState([]);

  // Handle Template Selection
  const handleTemplateChange = (e) => {
    const val = e.target.value;
    setTemplateSubject(val);
    if (templates[val]) {
      setMessageSubject(templates[val].subject);
      setMessageBody(templates[val].message);
    }
  };

  // Get Contacts Action
  const handleGetContact = () => {
    if (sendTo === 'Select') {
      alert('Please select "Send To" first!');
      return;
    }
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

  // Send Message Action
  const handleSendMessage = () => {
    if (selectedIds.length === 0) {
      alert('Please select at least one contact to send the message.');
      return;
    }
    if (!messageBody.trim()) {
      alert('Message body cannot be empty.');
      return;
    }
    alert(`Message sent successfully to ${selectedIds.length} recipients!`);
    // Reset form after sending
    setContacts([]);
    setSelectedIds([]);
    setMessageSubject('Select');
    setMessageBody('');
    setTemplateSubject('Select');
  };

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Header Bar */}
      <div style={{ padding: '24px 32px 16px 32px' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Specified Message</h1>
      </div>

      {/* Main Content Card */}
      <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '32px', display: 'flex', flexDirection: 'column' }}>
          
          <div style={{ display: 'flex', gap: 64, marginBottom: 48 }}>
            
            {/* Left Side: Message Form */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>Message Subject</label>
                <select value={messageSubject} onChange={e => setMessageSubject(e.target.value)} style={inputStyle}>
                  <option value="Select">Select</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Religion">Religion</option>
                  <option value="Transport SMS">Transport SMS</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>Message</label>
                <textarea 
                  value={messageBody} 
                  onChange={e => setMessageBody(e.target.value)} 
                  style={{ ...inputStyle, minHeight: 120, resize: 'none' }} 
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>Send To <span style={{color: 'red'}}>*</span></label>
                <select value={sendTo} onChange={e => setSendTo(e.target.value)} style={inputStyle}>
                  <option value="Select">Select</option>
                  <option value="Student on Students' App">Student on Students' App</option>
                  <option value="Student on Parents' App">Student on Parents' App</option>
                  <option value="Student & Parents App">Student & Parents App</option>
                  <option value="Parent">Parent</option>
                  <option value="Staff">Staff</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button type="button" style={toolbarBtn}><FaBold size={12} /></button>
                    <button type="button" style={toolbarBtn}><FaItalic size={12} /></button>
                    <button type="button" style={toolbarBtn}><FaUnderline size={12} /></button>
                  </div>
                  <div>
                    <button type="button" style={{ ...toolbarBtn, borderRadius: '50%', width: 36, height: 36, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <FaPaperclip size={14} />
                    </button>
                  </div>
                </div>

                <button onClick={handleGetContact} style={{ background: '#5cb85c', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: 4, fontSize: 14, fontWeight: 600, cursor: 'pointer', alignSelf: 'flex-start' }}>
                  Get Contact
                </button>
              </div>

            </div>

            {/* Right Side: Message Template */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
              <h2 style={{ fontSize: 18, fontWeight: 600, color: '#334155', margin: 0 }}>Message Template</h2>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <label style={{ fontSize: 13, color: '#475569', fontWeight: 600, width: 120 }}>Message Subject</label>
                <select value={templateSubject} onChange={handleTemplateChange} style={{ ...inputStyle, flex: 1 }}>
                  <option value="Select">Select</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Attendance">Attendance</option>
                  <option value="Fees">Fees</option>
                </select>
              </div>
            </div>

          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '0 0 24px 0' }} />

          {/* Table Section */}
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
              <button onClick={handleSendMessage} style={{ background: '#5cb85c', color: '#fff', border: 'none', padding: '12px 32px', borderRadius: 4, fontSize: 14, fontWeight: 600, cursor: 'pointer', opacity: selectedIds.length === 0 ? 0.6 : 1 }}>
                Send Message
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: 4,
  border: '1px solid #cbd5e1',
  outline: 'none',
  fontSize: 14,
  color: '#334155',
  boxSizing: 'border-box',
  background: '#fff'
};

const toolbarBtn = {
  background: '#fff',
  border: '1px solid #cbd5e1',
  borderRadius: 4,
  padding: '6px 10px',
  color: '#475569',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
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

export default SpecifiedMessage;
