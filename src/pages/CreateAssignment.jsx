import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaList } from 'react-icons/fa';

function CreateAssignment() {
  const navigate = useNavigate();
  const location = useLocation();
  const editData = location.state?.editData;

  const [assignmentType, setAssignmentType] = useState(editData?.type || 'Class Wise');
  const [hasSubmissionDate, setHasSubmissionDate] = useState(!!editData?.submissionDate);
  
  // States for other fields
  const [subject, setSubject] = useState(editData?.subject || 'Select Subject');
  const [className, setClassName] = useState(editData?.class || 'Select');
  const [assignedOn, setAssignedOn] = useState(editData?.assignedOn || '');
  const [submissionDate, setSubmissionDate] = useState(editData?.submissionDate || '');
  const [title, setTitle] = useState(editData?.title || '');
  const [statusActive, setStatusActive] = useState(editData ? editData.status === 'Active' : false);
  
  const isEdit = !!editData;

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Header Bar */}
      <div style={{ padding: '24px 32px 16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>{isEdit ? 'Edit Assignment' : 'Create Assignment'}</h1>
        <button 
          onClick={() => navigate('/dashboard/assignment')}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px', background: '#5cb85c', color: '#fff',
            border: 'none', borderRadius: '4px', padding: '8px 16px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s'
          }}
        >
          <FaList size={12} /> Assignment List
        </button>
      </div>

      {/* Main Content Card */}
      <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '32px' }}>
          
          <form style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            
            {/* Type Selection */}
            <div style={{ display: 'flex', gap: 24 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#334155', cursor: 'pointer' }}>
                <input type="radio" name="type" checked={assignmentType === 'Class Wise'} onChange={() => setAssignmentType('Class Wise')} style={{ accentColor: '#3b82f6', width: 16, height: 16 }} /> Class Wise
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#334155', cursor: 'pointer' }}>
                <input type="radio" name="type" checked={assignmentType === 'Student Wise'} onChange={() => setAssignmentType('Student Wise')} style={{ accentColor: '#3b82f6', width: 16, height: 16 }} /> Student Wise
              </label>
            </div>

            {/* Subject and Class Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>Subject</label>
                <select value={subject} onChange={e => setSubject(e.target.value)} style={inputStyle}>
                  <option>Select Subject</option>
                  <option>Mathematics</option>
                  <option>Science</option>
                  <option>English</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>Class</label>
                <select value={className} onChange={e => setClassName(e.target.value)} style={inputStyle}>
                  <option>Select</option>
                  <option>Class 8</option>
                  <option>Class 9</option>
                  <option>Class 10</option>
                </select>
              </div>
            </div>

            {/* Dates Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>Assigned on</label>
                <input type="text" value={assignedOn} onChange={e => setAssignedOn(e.target.value)} placeholder="DD-MMM-YYYY" style={{ ...inputStyle, background: '#f1f5f9' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: 10 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#475569', cursor: 'pointer' }}>
                  <input type="checkbox" checked={hasSubmissionDate} onChange={(e) => setHasSubmissionDate(e.target.checked)} style={{ accentColor: '#3b82f6', width: 16, height: 16 }} /> Submission Date
                </label>
              </div>
            </div>

            {hasSubmissionDate && (
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}></div>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                   <label style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>Select Submission Date</label>
                   <input type="text" value={submissionDate} onChange={e => setSubmissionDate(e.target.value)} placeholder="DD-MMM-YYYY" style={inputStyle} />
                 </div>
               </div>
            )}

            {/* Title */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>Title</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="" style={inputStyle} />
            </div>

            {/* Assignment Textarea */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>Assignment</label>
              <textarea rows="5" style={{ ...inputStyle, resize: 'vertical' }}></textarea>
            </div>

            {/* File Upload and Options Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 32, alignItems: 'start' }}>
              
              {/* Browse File */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>Browse file</label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: 4, overflow: 'hidden' }}>
                  <label style={{ background: '#f1f5f9', padding: '10px 16px', borderRight: '1px solid #cbd5e1', cursor: 'pointer', fontSize: 13, color: '#475569', fontWeight: 600, margin: 0 }}>
                    Choose Files
                    <input type="file" style={{ display: 'none' }} />
                  </label>
                  <span style={{ padding: '10px 16px', fontSize: 13, color: '#64748b' }}>No file chosen</span>
                </div>
                <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>
                  <p style={{ margin: '0 0 2px 0', color: '#0f172a', fontWeight: 500 }}>File must be less then <span style={{ fontWeight: 700 }}>5MB</span></p>
                  <p style={{ margin: 0, color: '#0f172a', fontWeight: 500 }}>Allowed file types: <span style={{ fontWeight: 700 }}>pdf, doc, docx, jpg, jpeg, png, xlsx, xls</span></p>
                </div>
              </div>

              {/* Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 28 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#475569', cursor: 'pointer' }}>
                  <input type="checkbox" style={{ accentColor: '#3b82f6', width: 14, height: 14 }} />
                  Allow student for multiple submission
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#475569', cursor: 'pointer' }}>
                  <input type="checkbox" style={{ accentColor: '#3b82f6', width: 14, height: 14 }} />
                  Allow student for late submission
                </label>
              </div>

              {/* Active */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 28 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#475569', cursor: 'pointer' }}>
                  <input type="checkbox" style={{ accentColor: '#3b82f6', width: 14, height: 14 }} />
                  Active
                </label>
              </div>

            </div>

            {/* Submit Button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
              <button 
                type="button"
                onClick={() => {
                  alert("Assignment Posted Successfully!");
                  navigate('/dashboard/assignment');
                }}
                style={{
                  background: '#5cb85c',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '12px 24px',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              >
                Post Assignment
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  border: '1px solid #cbd5e1',
  borderRadius: '4px',
  padding: '10px 14px',
  fontSize: '14px',
  color: '#334155',
  outline: 'none',
  boxSizing: 'border-box'
};

export default CreateAssignment;
