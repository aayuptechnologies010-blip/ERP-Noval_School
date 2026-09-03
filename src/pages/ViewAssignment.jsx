import React from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { FaArrowLeft, FaFileAlt } from 'react-icons/fa';

function ViewAssignment() {
  const navigate = useNavigate();
  const location = useLocation();
  const viewData = location.state?.viewData;

  if (!viewData) {
    return <Navigate to="/dashboard/assignment" replace />;
  }

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Header Bar */}
      <div style={{ padding: '24px 32px 16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
          <FaFileAlt color="#3b82f6" /> View Assignment
        </h1>
        <button 
          onClick={() => navigate(-1)}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px', background: 'none', color: '#475569',
            border: 'none', fontSize: '14px', fontWeight: 600, cursor: 'pointer'
          }}
        >
          <FaArrowLeft size={12} /> Go Back
        </button>
      </div>

      {/* Main Content */}
      <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'auto' }}>
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '32px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <DetailItem label="Title" value={viewData.title} />
            <DetailItem label="Subject" value={viewData.subject} />
            <DetailItem label="Assignment Type" value={viewData.type} />
            <DetailItem label="Class / Section" value={viewData.class} />
            <DetailItem label="Assigned On" value={viewData.assignedOn} />
            <DetailItem label="Submission Date" value={viewData.submissionDate || 'Not specified'} valueColor={viewData.submissionDate ? '#ef4444' : '#475569'} />
            <DetailItem label="Status" value={viewData.status} 
              customValue={
                <span style={{ 
                  background: viewData.status === 'Active' ? '#dcfce7' : '#f1f5f9',
                  color: viewData.status === 'Active' ? '#16a34a' : '#64748b',
                  padding: '4px 10px', borderRadius: 4, fontSize: 13, fontWeight: 700 
                }}>
                  {viewData.status}
                </span>
              } 
            />
          </div>

          <div style={{ marginTop: 24 }}>
            <label style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>Assignment Description / Details</label>
            <div style={{ marginTop: 8, padding: 16, background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0', minHeight: 100, fontSize: 14, color: '#334155', whiteSpace: 'pre-wrap' }}>
              {viewData.description || 'No description provided.'}
            </div>
          </div>
          {viewData.attachmentUrl && (
            <div style={{ marginTop: 16 }}>
              <label style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>Attachment</label>
              <div style={{ marginTop: 8 }}>
                <a href={viewData.attachmentUrl} target="_blank" rel="noreferrer" style={{ color: '#3b82f6', fontWeight: 600, fontSize: 14 }}>
                  📎 Download Attachment
                </a>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

const DetailItem = ({ label, value, valueColor = '#0f172a', customValue = null }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    <span style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>{label}</span>
    {customValue ? customValue : <span style={{ fontSize: 15, fontWeight: 600, color: valueColor }}>{value}</span>}
  </div>
);

export default ViewAssignment;
