import React, { useState } from 'react';
import { FaSearch, FaEye } from 'react-icons/fa';

const dummyNotices = [
  { id: 1, heading: 'Holiday Extended', description: 'School will remain closed till...', updatedOn: '03-Jan-2024', status: 'Read' },
  { id: 2, heading: 'School Timing', description: 'School Timing from 01/12/2...', updatedOn: '01-Dec-2023', status: 'Read' },
];

function SchoolAnnouncements() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNotices = dummyNotices.filter(notice => 
    notice.heading.toLowerCase().includes(searchTerm.toLowerCase()) || 
    notice.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                {filteredNotices.map((notice, idx) => (
                  <tr key={notice.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={tdStyle}>{idx + 1}</td>
                    <td style={tdStyle}>{notice.heading}</td>
                    <td style={tdStyle}>{notice.description}</td>
                    <td style={tdStyle}>{notice.updatedOn}</td>
                    <td style={tdStyle}>
                      <span style={{ background: '#5cb85c', color: '#fff', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600 }}>
                        {notice.status}
                      </span>
                    </td>
                    <td style={tdStyle}>
                      <button style={{ background: '#0ea5e9', color: '#fff', border: 'none', width: 28, height: 28, borderRadius: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                        <FaEye size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredNotices.length === 0 && (
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
  padding: '16px 16px',
  fontSize: 13,
  color: '#475569',
  whiteSpace: 'nowrap'
};

export default SchoolAnnouncements;
