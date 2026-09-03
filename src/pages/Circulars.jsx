import React, { useState, useEffect } from 'react';
import { FaVideo, FaPlus, FaSearch, FaDownload, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Circulars() {
  const navigate = useNavigate();
  const [searchBy, setSearchBy] = useState('Select');
  const [searchTerm, setSearchTerm] = useState('');
  const [session, setSession] = useState('2026-2027');
  const [circulars, setCirculars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCirculars();
  }, []);

  const fetchCirculars = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/circulars`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setCirculars(data.circulars || data.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch circulars", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCirculars = circulars.filter(c => {
    // Basic filter by session (if applicable)
    if (session && c.session && c.session !== session) {
       // Ignore strict session match if backend doesn't support it well yet, but keep logic
    }
    
    // Search logic
    if (searchBy === 'Circular Title' && searchTerm) {
      return (c.title || c.heading || '').toLowerCase().includes(searchTerm.toLowerCase());
    }
    if (searchBy === 'Circular Date' && searchTerm) {
      return (c.date || c.createdAt || '').includes(searchTerm);
    }
    
    return true; // if Select or empty search
  });

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Header Bar */}
      <div style={{ padding: '24px 32px 16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Circulars</h1>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 8, color: '#5cb85c', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            Video Tutorial <FaVideo size={16} />
          </button>
          
          <button 
            onClick={() => navigate('/dashboard/announcement/create-circular')} 
            style={{ background: '#5cb85c', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: 4, fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
          >
            <FaPlus /> Create New Circular
          </button>
        </div>
      </div>

      {/* Main Content Card */}
      <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        
        {/* Filters */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>Search By</label>
              <select 
                value={searchBy} 
                onChange={e => setSearchBy(e.target.value)}
                style={{ width: 180, padding: '10px 12px', borderRadius: 4, border: '1px solid #cbd5e1', outline: 'none', fontSize: 13, color: '#334155' }}
              >
                <option value="Select">Select</option>
                <option value="Circular Title">Circular Title</option>
                <option value="Circular Date">Circular Date</option>
              </select>
            </div>
            {searchBy !== 'Select' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>Enter {searchBy}</label>
                <input 
                  type={searchBy === 'Circular Date' ? 'date' : 'text'}
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                  style={{ width: 180, padding: '9px 12px', borderRadius: 4, border: '1px solid #cbd5e1', outline: 'none', fontSize: 13, color: '#334155' }}
                />
              </div>
            )}
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>Session</label>
            <select 
              value={session} 
              onChange={e => setSession(e.target.value)}
              style={{ width: 200, padding: '10px 12px', borderRadius: 4, border: '1px solid #cbd5e1', outline: 'none', fontSize: 13, color: '#334155' }}
            >
              <option value="2026-2027">2026-2027</option>
              <option value="2025-2026">2025-2026</option>
            </select>
          </div>
        </div>

        {/* Content Area */}
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', flex: 1, display: 'flex', flexDirection: 'column' }}>
          
          {loading ? (
             <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', padding: 40 }}>Loading circulars...</div>
          ) : filteredCirculars.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={thStyle}>Sr. No.</th>
                    <th style={thStyle}>Circular Title</th>
                    <th style={thStyle}>Date</th>
                    <th style={thStyle}>Description</th>
                    <th style={thStyle}>Attachment</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCirculars.map((circular, idx) => (
                    <tr key={circular._id || circular.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={tdStyle}>{idx + 1}</td>
                      <td style={tdStyle}>{circular.title || circular.heading}</td>
                      <td style={tdStyle}>{circular.date || (circular.createdAt ? new Date(circular.createdAt).toLocaleDateString() : '-')}</td>
                      <td style={tdStyle}>{circular.description || '-'}</td>
                      <td style={tdStyle}>
                        {circular.fileUrl || circular.attachment ? (
                          <a href={circular.fileUrl || circular.attachment} target="_blank" rel="noreferrer" style={{ background: '#0ea5e9', color: '#fff', padding: '6px 12px', borderRadius: 4, fontSize: 12, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6, textDecoration: 'none' }}>
                            <FaDownload size={12} /> Download
                          </a>
                        ) : (
                          <span style={{ color: '#94a3b8', fontSize: 13 }}>No file</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
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
          )}

        </div>
      </div>
    </div>
  );
}

const thStyle = {
  padding: '16px',
  textAlign: 'left',
  fontSize: 13,
  fontWeight: 700,
  color: '#334155',
  borderBottom: '1px solid #e2e8f0',
  whiteSpace: 'nowrap'
};

const tdStyle = {
  padding: '16px',
  fontSize: 14,
  color: '#475569',
  verticalAlign: 'middle',
  maxWidth: 250,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
};

export default Circulars;
