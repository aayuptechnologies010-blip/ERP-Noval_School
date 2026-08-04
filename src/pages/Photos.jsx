import React from 'react';

const albums = [
  {
    id: 1,
    title: 'Prize Distribution',
    date: '24-Dec-2024',
    memories: 46,
    image: null
  },
  {
    id: 2,
    title: 'Annual Sports Game 2024',
    date: '24-Dec-2024',
    memories: 13,
    image: null
  },
  {
    id: 3,
    title: 'ANNUAL FUNCTION',
    date: '20-Apr-2023',
    memories: 151,
    image: null
  },
  {
    id: 4,
    title: 'CHRISTMAS DAY',
    date: '26-Dec-2022',
    memories: 29,
    image: 'https://images.unsplash.com/photo-1543332143-4e8c27e32a20?auto=format&fit=crop&q=80&w=400&h=250'
  }
];

function Photos() {
  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Header Bar */}
      <div style={{ background: '#1e6875', padding: '12px 24px', borderTopLeftRadius: '2rem', color: '#fff' }}>
        <h1 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>Photo Gallery</h1>
      </div>

      <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
        <div style={{ background: '#fff', borderRadius: 8, padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          
          {/* Top filter button */}
          <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: 16, marginBottom: 24 }}>
            <button style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 16px', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
              All
            </button>
          </div>

          {/* Albums Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '24px' }}>
            {albums.map((album) => (
              <div key={album.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ width: '100%', height: 160, background: '#f1f5f9', borderRadius: 4, marginBottom: 12, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {album.image ? (
                    <img src={album.image} alt={album.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ display: 'flex', gap: 2 }}>
                      <div style={{ width: 6, height: 6, background: '#94a3b8', borderRadius: '50%' }}></div>
                      <div style={{ width: 6, height: 6, background: '#94a3b8', borderRadius: '50%' }}></div>
                      <div style={{ width: 6, height: 6, background: '#94a3b8', borderRadius: '50%' }}></div>
                    </div>
                  )}
                </div>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: '#334155', margin: '0 0 4px 0' }}>{album.title}</h3>
                <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 2px 0' }}>Event On : {album.date}</p>
                <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 8px 0' }}>Total Memories : {album.memories}</p>
                <button style={{ background: 'none', border: 'none', color: '#475569', fontSize: 13, fontWeight: 500, cursor: 'pointer', padding: 0 }}>
                  View Album
                </button>
              </div>
            ))}
          </div>

        </div>

        <div style={{ textAlign: 'center', marginTop: 40, paddingBottom: 20, fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>
          COPYRIGHT © 2026 FRANCISCAN
        </div>
      </div>

    </div>
  );
}

export default Photos;
