import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function ViewNotice() {
  const location = useLocation();
  const navigate = useNavigate();
  const notice = location.state?.notice;

  if (!notice) {
    return (
      <div style={{ padding: 32, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ color: '#64748b' }}>No Notice Data Found</h2>
        <button onClick={() => navigate(-1)} style={{ marginTop: 16, background: '#3b82f6', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 4, cursor: 'pointer' }}>Go Back</button>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '24px 32px 16px 32px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: '50%', background: '#e2e8f0' }}>
          <FaArrowLeft />
        </button>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Notice Details</h1>
      </div>

      <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '32px', flex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 600 }}>
            <div>
              <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600, marginBottom: 4 }}>Heading</div>
              <div style={{ fontSize: 16, color: '#1e293b', fontWeight: 500 }}>{notice.heading}</div>
            </div>
            
            {notice.classId && (
              <div>
                <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600, marginBottom: 4 }}>Class</div>
                <div style={{ fontSize: 15, color: '#334155' }}>{notice.classId}</div>
              </div>
            )}
            
            <div>
              <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600, marginBottom: 4 }}>Description</div>
              <div style={{ fontSize: 15, color: '#475569', background: '#f8fafc', padding: 16, borderRadius: 8, lineHeight: 1.5 }}>
                {notice.description}
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: 48 }}>
              <div>
                <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600, marginBottom: 4 }}>Updated On</div>
                <div style={{ fontSize: 15, color: '#334155' }}>{notice.updatedOn}</div>
              </div>
              <div>
                <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600, marginBottom: 4 }}>Status</div>
                <div>
                  <span style={{ background: notice.status === 'Read' ? '#5cb85c' : '#fbbf24', color: '#fff', padding: '4px 12px', borderRadius: 4, fontSize: 12, fontWeight: 600 }}>
                    {notice.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewNotice;
