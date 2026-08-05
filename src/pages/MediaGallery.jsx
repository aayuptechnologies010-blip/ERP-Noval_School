import React from 'react';
import { FaPhotoVideo, FaFilePdf, FaFileWord, FaFileImage, FaDownload, FaFolderOpen, FaChevronRight } from 'react-icons/fa';

const mediaFiles = [
  { id: 1, name: 'School Prospectus 2026-27', type: 'PDF', size: '2.4 MB', date: '10 Aug 2026', icon: FaFilePdf, color: '#ef4444' },
  { id: 2, name: 'Annual Syllabus - Class X', type: 'DOCX', size: '1.1 MB', date: '05 Aug 2026', icon: FaFileWord, color: '#3b82f6' },
  { id: 3, name: 'Campus Map & Guidelines', type: 'JPG', size: '4.5 MB', date: '20 Jul 2026', icon: FaFileImage, color: '#10b981' },
  { id: 4, name: 'Transport Fee Structure 2026', type: 'PDF', size: '1.8 MB', date: '15 Jun 2026', icon: FaFilePdf, color: '#ef4444' },
  { id: 5, name: 'Academic Holiday Calendar', type: 'DOCX', size: '800 KB', date: '01 Jan 2026', icon: FaFileWord, color: '#3b82f6' },
];

const folders = [
  { name: 'Documents & Forms', count: 12, color: '#f59e0b' },
  { name: 'Academics & Syllabus', count: 8, color: '#3b82f6' },
  { name: 'Events & Circulars', count: 24, color: '#10b981' },
  { name: 'Gallery & Media', count: 45, color: '#8b5cf6' },
];

function MediaGallery() {
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
              {mediaFiles.map((file, i) => (
                <tr 
                  key={i} 
                  style={{ borderBottom: i < mediaFiles.length - 1 ? '1px solid #f1f5f9' : 'none', transition: 'background 0.2s' }} 
                  onMouseOver={e => e.currentTarget.style.background = '#f8fafc'} 
                  onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '20px 32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <div style={{ width: 44, height: 44, borderRadius: '10px', background: `${file.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: file.color }}>
                        <file.icon size={20} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: '#1e293b', fontSize: 15, marginBottom: 4 }}>{file.name}</div>
                        <div style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600, background: '#f1f5f9', display: 'inline-block', padding: '2px 8px', borderRadius: '4px' }}>
                          {file.type}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '20px 32px', fontSize: 14, color: '#64748b', fontWeight: 500 }}>{file.size}</td>
                  <td style={{ padding: '20px 32px', fontSize: 14, color: '#64748b', fontWeight: 500 }}>{file.date}</td>
                  <td style={{ padding: '20px 32px', textAlign: 'right' }}>
                    <button 
                      style={{ 
                        background: '#f1f5f9', color: '#475569', border: 'none', padding: '10px 20px', 
                        borderRadius: '8px', fontSize: 13, fontWeight: 700, cursor: 'pointer', 
                        display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'all 0.2s' 
                      }} 
                      onMouseOver={e => {e.currentTarget.style.background = '#e2e8f0'; e.currentTarget.style.color = '#1e293b'}} 
                      onMouseOut={e => {e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.color = '#475569'}}
                    >
                      <FaDownload /> Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MediaGallery;
