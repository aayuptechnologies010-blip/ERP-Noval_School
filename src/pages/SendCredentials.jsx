import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

// Dummy data removed

function SendCredentials() {
  const [sendVia, setSendVia] = useState('SMS');
  const [sendTo, setSendTo] = useState('Select');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [contacts, setContacts] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  const handleGetContact = async () => {
    if (sendTo === 'Select') {
      alert('Please select "Send To" first!');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      // depending on sendTo we can fetch staff or students.
      const ep = sendTo === 'Staff' ? '/api/staffs' : '/api/students';
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}${ep}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        const list = Array.isArray(data) ? data : (data.students || data.staff || []);
        const formatted = list.map((s, idx) => ({
          id: s._id || idx,
          sno: String(idx + 1).padStart(2, '0'),
          class: s.class ? s.class.className : (s.department || 'N/A'),
          rollNo: s.rollNo || s.employeeId || '-',
          admissionNo: s.admissionNo || '-',
          recipientName: s.fatherName || `${s.firstName || ''} ${s.lastName || ''}`.trim(),
          childName: `${s.firstName || ''} ${s.lastName || ''}`.trim(),
          mobileNo: s.mobileNo || s.fatherMobileNo || '-',
          email: s.email || '-'
        }));
        setContacts(formatted);
        setSelectedIds([]);
      }
    } catch (err) { console.error(err); }
  };

  const filteredContacts = contacts.filter(contact => 
    contact.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.admissionNo.includes(searchTerm) ||
    contact.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleSendCredentials = async () => {
    if (selectedIds.length === 0) {
      alert(`Please select at least one contact to send the credentials.`);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const payload = {
        sendVia,
        sendToType: sendTo,
        recipients: selectedIds.map(id => {
          const contact = contacts.find(c => c.id === id);
          return {
            recipientName: contact.recipientName,
            mobileNo: contact.mobileNo,
            email: contact.email
          };
        })
      };

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/credentials/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert(`Credentials sent successfully via ${sendVia} to ${selectedIds.length} recipients!`);
        setContacts([]);
        setSelectedIds([]);
        setSendTo('Select');
        setSendVia('SMS');
      } else {
        const errorData = await response.json();
        alert(`Failed to send credentials: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error sending credentials:", error);
      alert('An error occurred while sending credentials.');
    }
  };

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Header Bar */}
      <div style={{ padding: '24px 32px 16px 32px' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Send Credentials</h1>
      </div>

      {/* Main Content Card */}
      <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', width: '100%', maxWidth: 900, display: 'flex', flexDirection: 'column' }}>
          
          <div style={{ padding: '32px 48px', display: 'flex', flexDirection: 'column', gap: 24 }}>
            
            {/* Send Credentials Via */}
            <div style={formRowStyle}>
              <label style={labelStyle}>Send Credentials Via</label>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 24, height: 42 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#475569', cursor: 'pointer' }}>
                  <input 
                    type="radio" 
                    name="sendVia"
                    value="SMS"
                    checked={sendVia === 'SMS'}
                    onChange={e => setSendVia(e.target.value)}
                    style={{ accentColor: '#3b82f6', width: 16, height: 16 }}
                  />
                  SMS
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#475569', cursor: 'pointer' }}>
                  <input 
                    type="radio" 
                    name="sendVia"
                    value="Email"
                    checked={sendVia === 'Email'}
                    onChange={e => setSendVia(e.target.value)}
                    style={{ accentColor: '#3b82f6', width: 16, height: 16 }}
                  />
                  Email
                </label>
              </div>
            </div>

            {/* Send To */}
            <div style={formRowStyle}>
              <label style={labelStyle}>Send To</label>
              <div style={{ flex: 1 }}>
                <select 
                  value={sendTo} 
                  onChange={e => setSendTo(e.target.value)}
                  style={{ ...inputStyle, borderColor: '#3b82f6' }}
                >
                  <option value="Select">Select</option>
                  <option value="Student">Student</option>
                  <option value="Parent">Parent</option>
                  <option value="Staff">Staff</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
               <button onClick={handleGetContact} style={{ background: '#5cb85c', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: 4, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                 Get Details
               </button>
            </div>

          </div>

          {/* Table Section */}
          {contacts.length > 0 && (
            <div style={{ padding: '0 32px 32px 32px' }}>
              <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '0 0 24px 0' }} />
              
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

              <div style={{ overflowX: 'auto' }}>
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
                      <th style={thStyle}>Recipient Name</th>
                      <th style={thStyle}>Mobile No</th>
                      {sendVia === 'Email' && <th style={thStyle}>Email</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContacts.map((contact, idx) => (
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
                        <td style={tdStyle}>{contact.recipientName}</td>
                        <td style={tdStyle}>{contact.mobileNo}</td>
                        {sendVia === 'Email' && <td style={tdStyle}>{contact.email}</td>}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
                <button onClick={handleSendCredentials} style={{ background: '#5cb85c', color: '#fff', border: 'none', padding: '12px 32px', borderRadius: 4, fontSize: 14, fontWeight: 600, cursor: 'pointer', opacity: selectedIds.length === 0 ? 0.6 : 1 }}>
                  Send Credentials
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

const formRowStyle = {
  display: 'flex',
  alignItems: 'center'
};

const labelStyle = {
  width: 200,
  fontSize: 14,
  color: '#475569',
  fontWeight: 600
};

const inputStyle = {
  width: '100%',
  maxWidth: 400,
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

export default SendCredentials;
