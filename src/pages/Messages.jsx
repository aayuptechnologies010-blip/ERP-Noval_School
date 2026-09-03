import React, { useState } from 'react';
import { FaSearch, FaFilter, FaPaperclip, FaComments } from 'react-icons/fa';

function Messages() {
  const [activeSenderId, setActiveSenderId] = useState(null);
  const [senders, setSenders] = useState([]);
  const [conversations, setConversations] = useState({});

  React.useEffect(() => {
    fetchInbox();
  }, []);

  const fetchInbox = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/messages/inbox`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        // Mock processing for grouping messages by sender
        const uniqueSenders = [];
        const msgMap = {};
        
        data.forEach(msg => {
          const senderId = msg.sender?._id || 'unknown';
          const senderName = msg.sender?.name || 'Admin';
          
          if (!msgMap[senderId]) {
            uniqueSenders.push({
              id: senderId,
              name: senderName,
              role: msg.sender?.role || 'Staff',
              date: new Date(msg.createdAt).toLocaleString(),
              avatar: `https://ui-avatars.com/api/?name=${senderName}`
            });
            msgMap[senderId] = [];
          }
          
          msgMap[senderId].push({
            id: msg._id,
            title: msg.subject,
            preview: msg.content,
            time: new Date(msg.createdAt).toLocaleString(),
            hasAttachment: !!msg.attachmentUrl
          });
        });
        
        setSenders(uniqueSenders);
        setConversations(msgMap);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const activeSender = senders.find(s => s.id === activeSenderId);
  const messages = activeSenderId ? conversations[activeSenderId] : [];

  return (
    <div style={{ flex: 1, background: '#f8f9fc', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ flex: 1, display: 'flex', margin: 24, background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        
        {/* Left Panel */}
        <div style={{ width: 320, background: '#f8fafc', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
          
          <div style={{ padding: '16px', display: 'flex', gap: 12, alignItems: 'center', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
              <FaSearch style={{ position: 'absolute', left: 12, color: '#94a3b8', fontSize: 13 }} />
              <input type="text" placeholder="Search Sender" style={{ width: '100%', padding: '8px 12px 8px 32px', borderRadius: 20, border: '1px solid #cbd5e1', outline: 'none', fontSize: 13, background: '#fff' }} />
            </div>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FaFilter size={16} />
            </button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            {senders.map(sender => {
              const isActive = sender.id === activeSenderId;
              return (
                <div 
                  key={sender.id} 
                  onClick={() => setActiveSenderId(sender.id)}
                  style={{ 
                    padding: '12px 16px', 
                    display: 'flex', 
                    gap: 12, 
                    cursor: 'pointer',
                    background: isActive ? '#5cb85c' : 'transparent',
                    color: isActive ? '#fff' : '#334155',
                    borderBottom: '1px solid #e2e8f0'
                  }}
                >
                  <img src={sender.avatar} alt={sender.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{sender.name}{!isActive && `, ${sender.role}`}</div>
                    <div style={{ fontSize: 11, color: isActive ? 'rgba(255,255,255,0.8)' : '#94a3b8' }}>
                      {isActive ? sender.date : sender.date}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Panel */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff' }}>
          
          {!activeSender ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#334155' }}>
              <div style={{ fontSize: 64, color: '#fbbf24', marginBottom: 16 }}>
                <FaComments />
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>Select a conversation</h3>
            </div>
          ) : (
            <>
              {/* Right Panel Header */}
              <div style={{ padding: '16px 24px', borderBottom: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <img src={activeSender.avatar} alt={activeSender.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#1e293b' }}>{activeSender.name}</div>
                    <div style={{ fontSize: 12, color: '#94a3b8' }}>{activeSender.role}</div>
                  </div>
                </div>
                <div style={{ display: 'flex' }}>
                  <input type="text" placeholder="Search" style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRight: 'none', borderRadius: '4px 0 0 4px', outline: 'none', fontSize: 13, width: 200 }} />
                  <button style={{ background: '#5cb85c', color: '#fff', border: 'none', padding: '0 16px', borderRadius: '0 4px 4px 0', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Go</button>
                </div>
              </div>

              {/* Message List */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px' }}>
                {messages.map(msg => (
                  <div key={msg.id} style={{ padding: '16px 0', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1, paddingRight: 24 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#334155', marginBottom: 4 }}>{msg.title}</div>
                      {msg.preview && <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.4 }}>{msg.preview}</div>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      {msg.hasAttachment && <FaPaperclip color="#5cb85c" size={14} />}
                      <div style={{ fontSize: 12, color: '#64748b', whiteSpace: 'nowrap' }}>{msg.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

export default Messages;
