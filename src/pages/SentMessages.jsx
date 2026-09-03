import React, { useState } from 'react';
import { FaSearch, FaFilter, FaCalendarAlt, FaComments } from 'react-icons/fa';

function SentMessages() {
  const [fromDate, setFromDate] = useState('');
  const [tillDate, setTillDate] = useState('');
  const [sentMessagesList, setSentMessagesList] = useState([]);
  const [activeMessage, setActiveMessage] = useState(null);

  React.useEffect(() => {
    fetchSentMessages();
  }, []);

  const fetchSentMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/messages/sent`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setSentMessagesList(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ flex: 1, background: '#f8f9fc', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ flex: 1, display: 'flex', margin: 24, background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        
        {/* Left Panel */}
        <div style={{ width: 320, background: '#f8fafc', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
          
          <div style={{ padding: '16px', display: 'flex', gap: 12, alignItems: 'center', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input type="text" placeholder="Search message" style={{ width: '100%', padding: '8px 32px 8px 12px', borderRadius: 4, border: '1px solid #cbd5e1', outline: 'none', fontSize: 13, background: '#fff' }} />
              <FaSearch style={{ position: 'absolute', right: 12, color: '#94a3b8', fontSize: 13 }} />
            </div>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FaFilter size={16} />
            </button>
          </div>

          <div style={{ padding: '16px', borderBottom: '1px solid #e2e8f0', background: '#fff', margin: '8px', borderRadius: 8, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>From Date</label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: 4, background: '#e2e8f0', padding: '6px 12px' }}>
                  <input type="text" value={fromDate} onChange={(e) => setFromDate(e.target.value)} style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: 13, color: '#334155' }} />
                  <FaCalendarAlt color="#475569" size={14} />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>Till Date</label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: 4, background: '#e2e8f0', padding: '6px 12px' }}>
                  <input type="text" value={tillDate} onChange={(e) => setTillDate(e.target.value)} style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: 13, color: '#334155' }} />
                  <FaCalendarAlt color="#475569" size={14} />
                </div>
              </div>
              <div>
                <button style={{ background: '#5cb85c', color: '#fff', border: 'none', padding: '6px 16px', borderRadius: 4, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Go</button>
              </div>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            {sentMessagesList.map(msg => (
              <div 
                key={msg._id} 
                onClick={() => setActiveMessage(msg)}
                style={{ 
                  padding: '12px 16px', 
                  borderBottom: '1px solid #e2e8f0',
                  cursor: 'pointer',
                  background: activeMessage?._id === msg._id ? '#f1f5f9' : 'transparent'
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>{msg.subject}</div>
                <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>
                  {new Date(msg.createdAt).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff' }}>
          {!activeMessage ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#334155' }}>
              <div style={{ fontSize: 64, color: '#fbbf24', marginBottom: 16 }}>
                <FaComments />
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>Select a conversation</h3>
            </div>
          ) : (
             <div style={{ flex: 1, padding: 24 }}>
               <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                 <h2 style={{ fontSize: 20, color: '#1e293b', marginTop: 0 }}>{activeMessage.subject}</h2>
                 <div style={{ fontSize: 12, color: '#64748b', marginBottom: 16 }}>
                   Sent on: {new Date(activeMessage.createdAt).toLocaleString()}
                 </div>
                 <div style={{ padding: '16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, whiteSpace: 'pre-wrap', color: '#334155', fontSize: 14 }}>
                   {activeMessage.content}
                 </div>
                 {activeMessage.attachmentUrl && (
                   <div style={{ marginTop: 16 }}>
                     <strong>Attachment:</strong> <a href={activeMessage.attachmentUrl} target="_blank" rel="noreferrer">View File</a>
                   </div>
                 )}
               </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SentMessages;
