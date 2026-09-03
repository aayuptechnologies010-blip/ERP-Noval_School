import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimes, FaCalendarAlt, FaBold, FaItalic, FaUnderline, FaListUl, FaListOl, FaLink, FaImage, FaTable, FaStrikethrough, FaQuoteRight } from 'react-icons/fa';

function CreateCircular() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [details, setDetails] = useState('');
  const [sendTo, setSendTo] = useState('All User');
  const [mustRead, setMustRead] = useState(false);
  const [status, setStatus] = useState(true);

  const handleSave = async () => {
    if (!title.trim()) {
      alert('Please fill out the Title field.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const payload = {
        title,
        date: date || new Date().toISOString().split('T')[0],
        details,
        sendTo,
        mustRead,
        status: status ? 'Active' : 'Inactive'
      };

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/circulars`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert('Circular saved successfully!');
        navigate('/dashboard/announcement/circulars');
      } else {
        const errorData = await response.json();
        alert(`Failed to save circular: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error saving circular:', error);
      alert('An error occurred while saving the circular.');
    }
  };

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Header Bar */}
      <div style={{ padding: '24px 32px 16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Create Circular</h1>
        <button onClick={() => navigate('/dashboard/announcement/circulars')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
          <FaTimes size={20} />
        </button>
      </div>

      {/* Main Content Card */}
      <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', width: '100%', maxWidth: 800 }}>
          
          <div style={{ padding: '24px 32px', borderBottom: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 24 }}>
            
            {/* Title */}
            <div style={formRowStyle}>
              <label style={labelStyle}>Title : <span style={{ color: 'red' }}>*</span></label>
              <div style={{ flex: 1 }}>
                <input 
                  type="text" 
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Date */}
            <div style={formRowStyle}>
              <label style={labelStyle}>Date :</label>
              <div style={{ flex: 1, position: 'relative' }}>
                <input 
                  type="date" 
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Details (Mock WYSIWYG) */}
            <div style={formRowStyle}>
              <label style={labelStyle}>Details :</label>
              <div style={{ flex: 1, border: '1px solid #cbd5e1', borderRadius: 4, overflow: 'hidden' }}>
                {/* Toolbar Mock */}
                <div style={{ background: '#f8fafc', padding: '8px 12px', borderBottom: '1px solid #cbd5e1', display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
                  <button style={toolbarBtn}><FaBold size={12} /></button>
                  <button style={toolbarBtn}><FaItalic size={12} /></button>
                  <button style={toolbarBtn}><FaStrikethrough size={12} /></button>
                  <div style={{ width: 1, height: 16, background: '#cbd5e1', margin: '0 4px' }} />
                  <button style={toolbarBtn}><FaListUl size={12} /></button>
                  <button style={toolbarBtn}><FaListOl size={12} /></button>
                  <div style={{ width: 1, height: 16, background: '#cbd5e1', margin: '0 4px' }} />
                  <button style={toolbarBtn}><FaLink size={12} /></button>
                  <button style={toolbarBtn}><FaImage size={12} /></button>
                  <button style={toolbarBtn}><FaTable size={12} /></button>
                  <button style={toolbarBtn}><FaQuoteRight size={12} /></button>
                </div>
                {/* Editor Area */}
                <textarea 
                  value={details}
                  onChange={e => setDetails(e.target.value)}
                  style={{ width: '100%', minHeight: 180, border: 'none', padding: 12, outline: 'none', fontSize: 14, resize: 'vertical', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            {/* Send To */}
            <div style={formRowStyle}>
              <label style={labelStyle}>Send Circular To :</label>
              <div style={{ flex: 1 }}>
                <select 
                  value={sendTo} 
                  onChange={e => setSendTo(e.target.value)}
                  style={inputStyle}
                >
                  <option value="All User">All User</option>
                  <option value="All Students/All Parents">All Students/All Parents</option>
                  <option value="All Staff">All Staff</option>
                  <option value="Staff Type">Staff Type</option>
                  <option value="Classes">Classes</option>
                  <option value="Students/Parents">Students/Parents</option>
                </select>
              </div>
            </div>

            {/* Browse File */}
            <div style={formRowStyle}>
              <label style={labelStyle}>Browse File :</label>
              <div style={{ flex: 1, display: 'flex' }}>
                <button style={{ background: '#e2e8f0', border: '1px solid #cbd5e1', borderRight: 'none', padding: '8px 16px', borderRadius: '4px 0 0 4px', color: '#475569', fontSize: 13, fontWeight: 600 }}>
                  Choose File
                </button>
                <div style={{ border: '1px solid #cbd5e1', padding: '8px 12px', flex: 1, borderRadius: '0 4px 4px 0', fontSize: 13, color: '#94a3b8', display: 'flex', alignItems: 'center' }}>
                  No file chosen
                </div>
              </div>
            </div>

            {/* Toggles */}
            <div style={{ ...formRowStyle, justifyContent: 'flex-start' }}>
              <label style={{ ...labelStyle, width: 'auto' }}>Must read</label>
              <div 
                onClick={() => setMustRead(!mustRead)}
                style={{ 
                  display: 'flex', alignItems: 'center', background: mustRead ? '#5cb85c' : '#e2e8f0', 
                  borderRadius: 20, padding: '2px 4px', width: 64, cursor: 'pointer', transition: '0.3s',
                  marginLeft: 16, marginRight: 32, justifyContent: mustRead ? 'flex-end' : 'flex-start'
                }}
              >
                <div style={{ width: 16, height: 16, background: '#fff', borderRadius: '50%' }} />
                {!mustRead && <span style={{ fontSize: 10, fontWeight: 700, color: '#64748b', marginLeft: 4 }}>INACTIVE</span>}
              </div>

              <label style={{ ...labelStyle, width: 'auto' }}>Status</label>
              <div 
                onClick={() => setStatus(!status)}
                style={{ 
                  display: 'flex', alignItems: 'center', background: status ? '#5cb85c' : '#e2e8f0', 
                  borderRadius: 20, padding: '2px 4px', width: 72, cursor: 'pointer', transition: '0.3s',
                  marginLeft: 16, justifyContent: status ? 'space-between' : 'flex-start'
                }}
              >
                {status && <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', marginLeft: 6 }}>ACTIVE</span>}
                <div style={{ width: 16, height: 16, background: '#fff', borderRadius: '50%', marginLeft: status ? 0 : 4 }} />
              </div>
            </div>

          </div>

          <div style={{ padding: '16px 32px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
            <button onClick={handleSave} style={{ background: '#5cb85c', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: 4, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
              Save Circular
            </button>
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

const toolbarBtn = {
  background: 'none',
  border: 'none',
  color: '#64748b',
  cursor: 'pointer',
  padding: 4,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

export default CreateCircular;
