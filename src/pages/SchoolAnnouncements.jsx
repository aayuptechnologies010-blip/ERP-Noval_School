import React, { useState, useEffect } from 'react';
import { FaSearch, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function SchoolAnnouncements() {
  const [searchTerm, setSearchTerm] = useState('');
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/notices`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setNotices(data.notices || []);
      }
    } catch (error) {
      console.error("Failed to fetch notices", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredNotices = notices.filter(notice => {
    const heading = notice.heading || notice.title || '';
    const description = notice.description || notice.content || '';
    return heading.toLowerCase().includes(searchTerm.toLowerCase()) || 
           description.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Header Bar */}
      <div style={{ padding: '24px 32px 16px 32px' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Notices</h1>
      </div>

      {/* Main Content Card */}
      <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px', display: 'flex', flexDirection: 'column' }}>
          
          <div style={{ display: 'flex', marginBottom: 24 }}>
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ width: 250, padding: '8px 12px', border: '1px solid #cbd5e1', borderRight: 'none', borderRadius: '4px 0 0 4px', outline: 'none', fontSize: 13 }} 
            />
            <button style={{ background: '#5cb85c', color: '#fff', border: 'none', padding: '0 16px', borderRadius: '0 4px 4px 0', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
              <FaSearch size={12} /> Search
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={thStyle}>Sr. No.</th>
                  <th style={thStyle}>Heading</th>
                  <th style={thStyle}>Description</th>
                  <th style={thStyle}>Updated On</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>View</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>Loading notices...</td>
                  </tr>
                ) : filteredNotices.length > 0 ? (
                  filteredNotices.map((notice, idx) => (
                    <tr key={notice._id || notice.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={tdStyle}>{idx + 1}</td>
                      <td style={tdStyle}>{notice.heading || notice.title}</td>
                      <td style={tdStyle}>{notice.description || notice.content}</td>
                      <td style={tdStyle}>{notice.updatedOn || (notice.createdAt ? new Date(notice.createdAt).toLocaleDateString() : '-')}</td>
                      <td style={tdStyle}>
                        <span style={{ background: notice.status === 'Read' ? '#5cb85c' : '#fbbf24', color: '#fff', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600 }}>
                          {notice.status || 'Sent'}
                        </span>
                      </td>
                      <td style={tdStyle}>
                        <button 
                          onClick={() => navigate(`/dashboard/announcement/view/${notice._id || notice.id}`, { state: { notice } })}
                          style={{ background: '#0ea5e9', color: '#fff', border: 'none', width: 28, height: 28, borderRadius: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
                        >
                          <FaEye size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '24px', color: '#94a3b8' }}>
                      No notices found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

const thStyle = {
  padding: '14px 16px',
  textAlign: 'left',
  fontSize: 13,
  fontWeight: 700,
  color: '#334155',
  borderBottom: '1px solid #e2e8f0',
  whiteSpace: 'nowrap'
};

const tdStyle = {
  padding: '14px 16px',
  fontSize: 14,
  color: '#475569',
  verticalAlign: 'middle',
  maxWidth: 250,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
};

export default SchoolAnnouncements;
