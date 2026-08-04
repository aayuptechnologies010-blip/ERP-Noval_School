import React, { useState } from 'react';
import { FaVideo, FaEye, FaTimes, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const dummyClassNotices = [
  { id: 1, classId: 'NUR A', heading: 'Rhymes Competition', description: 'Annual rhymes competition will be held next week...', updatedOn: '10-Feb-2026', status: 'Read' },
  { id: 2, classId: 'NUR A', heading: 'Bring Colors', description: 'Please send a set of wax crayons with the student.', updatedOn: '08-Feb-2026', status: 'Unread' },
  { id: 3, classId: 'LKG B', heading: 'Fancy Dress', description: 'Fancy dress competition details.', updatedOn: '12-Feb-2026', status: 'Read' },
];

function ClassNotice() {
  const [selectedClass, setSelectedClass] = useState('NUR A');
  const navigate = useNavigate();

  const filteredNotices = dummyClassNotices.filter(notice => notice.classId === selectedClass);

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Header Bar */}
      <div style={{ padding: '24px 32px 16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Class Notice</h1>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 8, color: '#5cb85c', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            Video Tutorial <FaVideo size={16} />
          </button>
          
          <select 
            value={selectedClass} 
            onChange={e => setSelectedClass(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: 4, border: '1px solid #cbd5e1', outline: 'none', fontSize: 14, color: '#334155', minWidth: 150 }}
          >
            <option value="NUR A">NUR A</option>
            <option value="LKG B">LKG B</option>
            <option value="UKG A">UKG A</option>
            <option value="Class 1">Class 1</option>
          </select>
        </div>
      </div>

      {/* Main Content Card */}
      <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          
          <div style={{ flex: 1, overflowX: 'auto' }}>
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
                {filteredNotices.length > 0 ? (
                  filteredNotices.map((notice, idx) => (
                    <tr key={notice.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={tdStyle}>{idx + 1}</td>
                      <td style={tdStyle}>{notice.heading}</td>
                      <td style={tdStyle}>{notice.description}</td>
                      <td style={tdStyle}>{notice.updatedOn}</td>
                      <td style={tdStyle}>
                        <span style={{ 
                          background: notice.status === 'Read' ? '#5cb85c' : '#fbbf24', 
                          color: '#fff', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600 
                        }}>
                          {notice.status}
                        </span>
                      </td>
                      <td style={tdStyle}>
                        <button 
                          onClick={() => navigate(`/dashboard/announcement/class/view/${notice.id}`, { state: { notice } })} 
                          style={{ background: '#0ea5e9', color: '#fff', border: 'none', width: 28, height: 28, borderRadius: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
                        >
                          <FaEye size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ padding: 0 }}>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', minHeight: 300 }}>
                        <div style={{ 
                          width: 250, 
                          height: 180, 
                          background: '#f8fafc', 
                          borderRadius: 16, 
                          display: 'flex', 
                          flexDirection: 'column', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          position: 'relative'
                        }}>
                          <div style={{ border: '2px solid #cbd5e1', width: 160, height: 100, borderRadius: 8, background: '#fff', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                              <div style={{ position: 'absolute', top: -16, width: 32, height: 32, borderRadius: '50%', border: '2px solid #cbd5e1', background: '#f1f5f9' }}></div>
                              <span style={{ fontSize: 11, fontWeight: 700, color: '#334155', letterSpacing: 0.5 }}>NO</span>
                              <span style={{ fontSize: 11, fontWeight: 700, color: '#334155', letterSpacing: 0.5 }}>RECORD FOUND</span>
                          </div>
                          <div style={{ position: 'absolute', left: 10, top: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffe4e6', color: '#ef4444', width: 40, height: 40, borderRadius: '50%', border: '3px solid #fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                              <FaSearch size={18} />
                          </div>
                        </div>
                      </div>
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

export default ClassNotice;
