import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPaperPlane, FaInbox, FaUserPlus, FaBold, FaItalic, FaUnderline, FaPaperclip } from 'react-icons/fa';

function ComposeMessage() {
  const navigate = useNavigate();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent successfully!');
    setSubject('');
    setMessage('');
  };

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Header Bar */}
      <div style={{ padding: '24px 32px 16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Compose Message</h1>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={() => navigate('/dashboard/message/sent')} style={{ ...topBtnStyle, background: '#5cb85c' }}>
            <FaPaperPlane size={12} /> Sentbox
          </button>
          <button onClick={() => navigate('/dashboard/message')} style={{ ...topBtnStyle, background: '#5cb85c' }}>
            <FaInbox size={14} /> Inbox
          </button>
        </div>
      </div>

      {/* Main Content Card */}
      <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
              <button type="button" style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#475569', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                <FaUserPlus size={14} /> Add Recipients
              </button>
            </div>

            {/* Subject */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
              <label style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>Subject</label>
              <div>
                <input 
                  type="text" 
                  value={subject} 
                  onChange={e => setSubject(e.target.value.substring(0, 150))} 
                  placeholder="Enter subject here..." 
                  style={{ width: '100%', padding: '12px 14px', borderRadius: 4, border: '1px solid #cbd5e1', outline: 'none', fontSize: 14, color: '#334155', boxSizing: 'border-box' }} 
                />
                <div style={{ textAlign: 'right', fontSize: 11, color: '#94a3b8', marginTop: 4 }}>
                  {subject.length}/150 characters
                </div>
              </div>
            </div>

            {/* Message Area */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
              <label style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>Message</label>
              
              <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid #cbd5e1', borderRadius: 4, flex: 1, overflow: 'hidden' }}>
                <textarea 
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Enter your message here..."
                  style={{ flex: 1, padding: '14px', border: 'none', outline: 'none', fontSize: 14, color: '#334155', resize: 'none', minHeight: 200 }}
                />
                
                {/* Toolbar */}
                <div style={{ padding: '12px 14px', borderTop: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', flexDirection: 'column', gap: 16 }}>
                  
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
              </div>
            </div>

            {/* Submit Button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
              <button type="submit" style={{ background: '#5cb85c', color: '#fff', border: 'none', padding: '10px 32px', borderRadius: 4, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                Submit
              </button>
            </div>
            
          </form>

        </div>
      </div>
    </div>
  );
}

const topBtnStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  padding: '8px 16px',
  fontSize: '14px',
  fontWeight: 600,
  cursor: 'pointer'
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

export default ComposeMessage;
