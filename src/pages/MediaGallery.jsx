import React, { useState, useEffect } from 'react';
import { FaPhotoVideo, FaFilePdf, FaFileWord, FaFileImage, FaDownload, FaFolderOpen, FaChevronRight } from 'react-icons/fa';

const folders = [
  { name: 'Documents & Forms', count: 12, color: '#f59e0b' },
  { name: 'Academics & Syllabus', count: 8, color: '#3b82f6' },
  { name: 'Events & Circulars', count: 24, color: '#10b981' },
  { name: 'Gallery & Media', count: 45, color: '#8b5cf6' },
];

const getTypeIcon = (type) => {
  if (!type) return FaFileImage;
  if (type === 'document') return FaFilePdf;
  if (type === 'video') return FaPhotoVideo;
  return FaFileImage;
};

const getTypeColor = (type) => {
  if (type === 'document') return '#ef4444';
  if (type === 'video') return '#3b82f6';
  return '#10b981';
};

function MediaGallery() {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/media`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setMediaFiles(data);
        }
      } catch (error) {
        console.error('Error fetching media:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMedia();
  }, []);
  return (
    <div style={{ flex: 1, background: '#f8f9fc', padding: '32px', minHeight: '100vh', boxSizing: 'border-box' }}>
      
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1e293b', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ background: '#f3e8ff', padding: '10px', borderRadius: '12px', display: 'flex' }}>
            <FaPhotoVideo style={{ color: '#8b5cf6' }} size={24} />
          </div>
          Media Gallery
        </h1>
        <p style={{ color: '#64748b', fontSize: 15, margin: 0 }}>Access school documents, brochures, forms, and downloadable media resources.</p>
      </div>

      {/* Folders Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 40 }}>
        {folders.map((folder, i) => (
          <div 
            key={i} 
            style={{ 
              background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', 
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', 
              transition: 'all 0.2s ease', boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.06)';
              e.currentTarget.style.borderColor = folder.color;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.02)';
              e.currentTarget.style.borderColor = '#e2e8f0';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: '12px', background: `${folder.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: folder.color }}>
                <FaFolderOpen size={24} />
              </div>
              <div>
                <div style={{ fontWeight: 700, color: '#1e293b', fontSize: 15, marginBottom: 4 }}>{folder.name}</div>
                <div style={{ fontSize: 13, color: '#64748b', fontWeight: 500 }}>{folder.count} files</div>
              </div>
            </div>
            <FaChevronRight style={{ color: '#cbd5e1' }} />
          </div>
        ))}
      </div>

      {/* Files Table Section */}
      <div style={{ background: '#fff', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid #f1f5f9' }}>
        <div style={{ padding: '24px 32px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#1e293b' }}>Recent Downloads</h2>
          <button style={{ background: 'transparent', color: '#3b82f6', border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>View All</button>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                <th style={{ padding: '16px 32px', fontSize: 13, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>File Name</th>
                <th style={{ padding: '16px 32px', fontSize: 13, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Size</th>
                <th style={{ padding: '16px 32px', fontSize: 13, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date Added</th>
                <th style={{ padding: '16px 32px', fontSize: 13, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4" style={{ padding: 40, textAlign: 'center', color: '#64748b' }}>Loading media files...</td></tr>
              ) : mediaFiles.length === 0 ? (
                <tr><td colSpan="4" style={{ padding: 40, textAlign: 'center', color: '#64748b' }}>No media files uploaded yet.</td></tr>
              ) : mediaFiles.map((file, i) => {
                const IconComp = getTypeIcon(file.type);
                const iconColor = getTypeColor(file.type);
                return (
                  <tr 
                    key={file._id || i} 
                    style={{ borderBottom: i < mediaFiles.length - 1 ? '1px solid #f1f5f9' : 'none', transition: 'background 0.2s' }} 
                    onMouseOver={e => e.currentTarget.style.background = '#f8fafc'} 
                    onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '20px 32px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ width: 44, height: 44, borderRadius: '10px', background: `${iconColor}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: iconColor }}>
                          <IconComp size={20} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, color: '#1e293b', fontSize: 15, marginBottom: 4 }}>{file.title}</div>
                          <div style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600, background: '#f1f5f9', display: 'inline-block', padding: '2px 8px', borderRadius: '4px' }}>
                            {file.type ? file.type.toUpperCase() : 'MEDIA'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '20px 32px', fontSize: 14, color: '#64748b', fontWeight: 500 }}>—</td>
                    <td style={{ padding: '20px 32px', fontSize: 14, color: '#64748b', fontWeight: 500 }}>{file.createdAt ? new Date(file.createdAt).toLocaleDateString() : ''}</td>
                    <td style={{ padding: '20px 32px', textAlign: 'right' }}>
                      <a 
                        href={file.fileUrl ? `${import.meta.env.VITE_API_BASE_URL}${file.fileUrl}` : '#'}
                        target="_blank" rel="noreferrer"
                        style={{ 
                          background: '#f1f5f9', color: '#475569', border: 'none', padding: '10px 20px', 
                          borderRadius: '8px', fontSize: 13, fontWeight: 700, cursor: 'pointer', 
                          display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none',
                          transition: 'all 0.2s' 
                        }} 
                      >
                        <FaDownload /> Download
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MediaGallery;
