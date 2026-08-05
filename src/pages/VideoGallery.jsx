import React, { useState } from 'react';
import { FaPlay, FaVideo, FaCalendarAlt, FaTimes } from 'react-icons/fa';

const videos = [
  { id: 1, title: 'Annual Sports Day 2026', date: '15 Aug 2026', duration: '45:20', thumbnail: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 2, title: 'Science Exhibition', date: '10 Jul 2026', duration: '12:15', thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 3, title: 'Annual Function Highlights', date: '20 Dec 2025', duration: '05:30', thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 4, title: 'Inter-school Debate Competition', date: '05 Nov 2025', duration: '28:40', thumbnail: 'https://images.unsplash.com/photo-1475721028070-2051152a4209?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 5, title: 'Teachers Day Celebration', date: '05 Sep 2025', duration: '1:15:00', thumbnail: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 6, title: 'Independence Day Flag Hoisting', date: '15 Aug 2025', duration: '32:10', thumbnail: 'https://images.unsplash.com/photo-1532375810709-75b1d315ee2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
];

function VideoGallery() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <div style={{ flex: 1, background: '#f8f9fc', padding: '32px', minHeight: '100vh', boxSizing: 'border-box' }}>
      
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1e293b', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ background: '#fee2e2', padding: '10px', borderRadius: '12px', display: 'flex' }}>
            <FaVideo style={{ color: '#ef4444' }} size={24} />
          </div>
          Video Gallery
        </h1>
        <p style={{ color: '#64748b', fontSize: 15, margin: 0 }}>Watch highlights and recordings of school events, functions, and seminars.</p>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 28 }}>
        {videos.map(video => (
          <div 
            key={video.id} 
            style={{ 
              background: '#fff', borderRadius: '16px', overflow: 'hidden', 
              boxShadow: '0 10px 25px rgba(0,0,0,0.03)', border: '1px solid #f1f5f9', 
              cursor: 'pointer', transition: 'all 0.2s ease', display: 'flex', flexDirection: 'column'
            }} 
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.08)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.03)';
            }}
            onClick={() => setActiveVideo(video)}
          >
            {/* Thumbnail Area */}
            <div style={{ position: 'relative', height: 200, backgroundImage: `url(${video.thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.4)', transition: 'background 0.3s' }} className="video-overlay" />
              
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ 
                  width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,0.95)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                }}>
                  <FaPlay size={20} style={{ marginLeft: 6 }} />
                </div>
              </div>
              
              <div style={{ position: 'absolute', bottom: 12, right: 12, background: 'rgba(0,0,0,0.75)', color: '#fff', padding: '4px 10px', borderRadius: 8, fontSize: 12, fontWeight: 700, letterSpacing: '0.5px' }}>
                {video.duration}
              </div>
            </div>
            
            {/* Details Area */}
            <div style={{ padding: '20px 24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: 17, fontWeight: 700, color: '#1e293b', lineHeight: 1.4 }}>{video.title}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#64748b', fontSize: 13, fontWeight: 600 }}>
                <FaCalendarAlt style={{ color: '#94a3b8' }} /> {video.date}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal overlay */}
      {activeVideo && (
        <div style={{ 
          position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.95)', zIndex: 9999, 
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(10px)'
        }}>
          {/* Close Button */}
          <button 
            onClick={() => setActiveVideo(null)} 
            style={{ 
              position: 'absolute', top: 32, right: 32, background: 'rgba(255,255,255,0.1)', 
              color: '#fff', border: '1px solid rgba(255,255,255,0.2)', width: 44, height: 44, 
              borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', 
              justifyContent: 'center', transition: 'all 0.2s' 
            }} 
            onMouseOver={e => { e.currentTarget.style.background = '#ef4444'; e.currentTarget.style.borderColor = '#ef4444'; }} 
            onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
          >
            <FaTimes size={20} />
          </button>
          
          {/* Fake Player UI */}
          <div style={{ width: '90%', maxWidth: 1000 }}>
            <div style={{ 
              background: '#000', aspectRatio: '16/9', borderRadius: 16, overflow: 'hidden', 
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', 
              justifyContent: 'center', color: '#64748b', position: 'relative'
            }}>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${activeVideo.thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.3, filter: 'blur(5px)' }} />
              <div style={{ zIndex: 1, textAlign: 'center' }}>
                <FaPlay size={64} style={{ color: '#fff', marginBottom: 24, filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))', cursor: 'pointer' }} />
                <p style={{ color: '#fff', fontSize: 18, fontWeight: 500, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Click to play <br/> <b>{activeVideo.title}</b></p>
              </div>
            </div>
            
            <div style={{ marginTop: 24, color: '#fff' }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 8px' }}>{activeVideo.title}</h2>
              <div style={{ display: 'flex', gap: 16, color: '#94a3b8', fontSize: 14 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><FaCalendarAlt /> Published: {activeVideo.date}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><FaPlay /> Duration: {activeVideo.duration}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoGallery;
