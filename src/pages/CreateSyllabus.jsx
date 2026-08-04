import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaList, FaUpload } from 'react-icons/fa';

function CreateSyllabus() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [className, setClassName] = useState('');
  const [subject, setSubject] = useState('');
  
  const handleSave = (e) => {
    e.preventDefault();
    alert('Syllabus created successfully! (Dummy Action)');
    navigate('/dashboard/syllabus');
  };

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Header Bar */}
      <div style={{ padding: '24px 32px 16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Add Syllabus</h1>
        <button 
          onClick={() => navigate('/dashboard/syllabus')}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px', background: '#5cb85c', color: '#fff',
            border: 'none', borderRadius: '4px', padding: '8px 16px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s'
          }}
        >
          <FaList size={12} /> Syllabus List
        </button>
      </div>

      {/* Main Content Card */}
      <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '32px' }}>
          
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 800 }}>
            
            {/* Title */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>Syllabus Title <span style={{ color: '#ef4444' }}>*</span></label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Final Term Syllabus" style={inputStyle} required />
            </div>

            {/* Class and Subject Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>Class <span style={{ color: '#ef4444' }}>*</span></label>
                <select value={className} onChange={e => setClassName(e.target.value)} style={inputStyle} required>
                  <option value="">Select Class</option>
                  <option value="Class 8">Class 8</option>
                  <option value="Class 9">Class 9</option>
                  <option value="Class 10">Class 10</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>Subject <span style={{ color: '#ef4444' }}>*</span></label>
                <select value={subject} onChange={e => setSubject(e.target.value)} style={inputStyle} required>
                  <option value="">Select Subject</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Science">Science</option>
                  <option value="English">English</option>
                </select>
              </div>
            </div>

            {/* File Upload */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>Upload Syllabus File (PDF/Word) <span style={{ color: '#ef4444' }}>*</span></label>
              <div style={{ position: 'relative' }}>
                <input type="file" required style={{ opacity: 0, position: 'absolute', width: '100%', height: '100%', cursor: 'pointer', zIndex: 10 }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, border: '2px dashed #cbd5e1', borderRadius: 8, padding: '24px', background: '#f8fafc', color: '#64748b' }}>
                  <FaUpload size={20} />
                  <div>
                    <span style={{ fontWeight: 600, color: '#3b82f6' }}>Click to upload</span> or drag and drop<br/>
                    <span style={{ fontSize: 12 }}>PDF, DOCX up to 10MB</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: 16 }}>
              <button type="submit" style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                Save Syllabus
              </button>
            </div>
            
          </form>

        </div>
      </div>
    </div>
  );
}

const inputStyle = { width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #cbd5e1', outline: 'none', fontSize: 14, color: '#334155' };

export default CreateSyllabus;
