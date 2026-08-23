import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaArrowLeft, FaTrash, FaStar, FaRegStar } from 'react-icons/fa';

function Photos() {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Detailed view state
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);
  const [albumDetails, setAlbumDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/albums`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setAlbums(data);
        } else {
          toast.error("Failed to load albums");
        }
      } catch (error) {
        console.error("Error fetching albums:", error);
        toast.error("An error occurred while fetching albums");
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  const handleViewAlbum = async (id) => {
    setSelectedAlbumId(id);
    setLoadingDetails(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/albums/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setAlbumDetails(data);
      } else {
        toast.error("Failed to load album details");
        setSelectedAlbumId(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error loading album details");
      setSelectedAlbumId(null);
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this album?")) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/albums/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          toast.success("Album removed successfully");
          setAlbums(albums.filter(a => a._id !== id));
          if (selectedAlbumId === id) {
            setSelectedAlbumId(null);
          }
        } else {
          const data = await response.json();
          toast.error(data.message || "Failed to delete album");
        }
      } catch (error) {
        console.error("Error deleting album:", error);
        toast.error("An error occurred while deleting album");
      }
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/albums/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ isActive: !currentStatus })
      });
      
      if (response.ok) {
        toast.success(`Album status updated to ${!currentStatus ? 'Active' : 'Inactive'}`);
        setAlbums(albums.map(a => a._id === id ? { ...a, isActive: !currentStatus } : a));
        if (selectedAlbumId === id && albumDetails) {
          setAlbumDetails({ ...albumDetails, isActive: !currentStatus });
        }
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to update album status");
      }
    } catch (error) {
      console.error("Error updating album status:", error);
      toast.error("An error occurred while updating status");
    }
  };

  const renderDetailedView = () => {
    if (loadingDetails) {
      return <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>Loading album details...</div>;
    }

    if (!albumDetails) {
      return <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>Could not load details.</div>;
    }

    const a = albumDetails;

    return (
      <div style={{ background: '#fff', borderRadius: 8, padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, borderBottom: '1px solid #e2e8f0', paddingBottom: 16 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1e293b', margin: 0 }}>{a.title}</h2>
          <div style={{ display: 'flex', gap: 12 }}>
            <button 
              onClick={() => navigate(`/dashboard/photos/edit/${a._id}`)}
              style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#3b82f6', border: 'none', padding: '8px 16px', borderRadius: 4, fontSize: 13, fontWeight: 600, color: '#fff', cursor: 'pointer' }}
            >
              Edit Album
            </button>
            <button 
              onClick={() => handleDelete(a._id)}
              style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#ef4444', border: 'none', padding: '8px 16px', borderRadius: 4, fontSize: 13, fontWeight: 600, color: '#fff', cursor: 'pointer' }}
            >
              <FaTrash /> Delete
            </button>
            <button 
              onClick={() => setSelectedAlbumId(null)}
              style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#e2e8f0', border: 'none', padding: '8px 16px', borderRadius: 4, fontSize: 13, fontWeight: 600, color: '#475569', cursor: 'pointer' }}
            >
              <FaArrowLeft /> Back to Gallery
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          {/* Cover Image */}
          <div style={{ flex: '1 1 300px', maxWidth: 400 }}>
            <div style={{ width: '100%', aspectRatio: '4/3', background: '#f1f5f9', borderRadius: 8, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {a.coverImage ? (
                <img src={a.coverImage} alt={a.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ color: '#94a3b8', fontSize: 14, fontWeight: 500 }}>No Cover Image</div>
              )}
            </div>
          </div>

          {/* Details */}
          <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 4px 0', fontWeight: 600, textTransform: 'uppercase' }}>Album ID</p>
              <p style={{ fontSize: 15, color: '#1e293b', margin: 0, fontWeight: 500 }}>{a._id}</p>
            </div>
            <div>
              <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 4px 0', fontWeight: 600, textTransform: 'uppercase' }}>Event Date</p>
              <p style={{ fontSize: 15, color: '#1e293b', margin: 0, fontWeight: 500 }}>
                {new Date(a.eventDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
              </p>
            </div>
            <div>
              <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 4px 0', fontWeight: 600, textTransform: 'uppercase' }}>Total Memories</p>
              <p style={{ fontSize: 15, color: '#1e293b', margin: 0, fontWeight: 500 }}>{a.totalMemories}</p>
            </div>
            <div>
              <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 4px 0', fontWeight: 600, textTransform: 'uppercase' }}>Status</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    className="hidden" 
                    checked={a.isActive} 
                    onChange={() => handleToggleStatus(a._id, a.isActive)} 
                    style={{ display: 'none' }} 
                  />
                  <div style={{ position: 'relative', width: 44, height: 24, background: a.isActive ? '#22c55e' : '#cbd5e1', borderRadius: 24, transition: 'background 0.3s' }}>
                    <div style={{ position: 'absolute', top: 2, left: a.isActive ? 22 : 2, width: 20, height: 20, background: '#fff', borderRadius: '50%', transition: 'left 0.3s', boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }}></div>
                  </div>
                </label>
                <span style={{ fontSize: 14, fontWeight: 600, color: a.isActive ? '#16a34a' : '#64748b' }}>
                  {a.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
              <div>
                <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 4px 0', fontWeight: 600 }}>Created At</p>
                <p style={{ fontSize: 13, color: '#475569', margin: 0 }}>{new Date(a.createdAt).toLocaleString()}</p>
              </div>
              <div>
                <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 4px 0', fontWeight: 600 }}>Updated At</p>
                <p style={{ fontSize: 13, color: '#475569', margin: 0 }}>{new Date(a.updatedAt).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Header Bar */}
      <div style={{ background: '#1e6875', padding: '12px 24px', borderTopLeftRadius: '2rem', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>Photo Gallery</h1>
        <button 
          onClick={() => navigate('/dashboard/photos/create')}
          style={{ background: '#4ade80', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 16px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
        >
          + Create Album
        </button>
      </div>

      <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
        {selectedAlbumId ? (
          renderDetailedView()
        ) : (
          <div style={{ background: '#fff', borderRadius: 8, padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            {/* Top filter button */}
            <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: 16, marginBottom: 24 }}>
              <button style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 16px', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
                All
              </button>
            </div>

            {/* Loading state */}
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>Loading albums...</div>
            ) : albums.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>No albums found.</div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '24px' }}>
                {albums.map((album) => (
                  <div key={album._id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', background: '#fff', padding: '16px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9', position: 'relative' }}>
                    
                    {/* Status Toggle on Card */}
                    <div style={{ position: 'absolute', top: 24, right: 24, zIndex: 10 }}>
                      <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} title={album.isActive ? "Active" : "Inactive"}>
                        <input 
                          type="checkbox" 
                          checked={album.isActive} 
                          onChange={() => handleToggleStatus(album._id, album.isActive)} 
                          style={{ display: 'none' }} 
                        />
                        <div style={{ position: 'relative', width: 36, height: 20, background: album.isActive ? '#22c55e' : '#e2e8f0', borderRadius: 20, transition: 'background 0.3s', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                          <div style={{ position: 'absolute', top: 2, left: album.isActive ? 18 : 2, width: 16, height: 16, background: '#fff', borderRadius: '50%', transition: 'left 0.3s' }}></div>
                        </div>
                      </label>
                    </div>

                    <div style={{ width: '100%', height: 160, background: '#f1f5f9', borderRadius: 8, marginBottom: 16, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {album.coverImage ? (
                        <img src={album.coverImage} alt={album.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ display: 'flex', gap: 2 }}>
                          <div style={{ width: 6, height: 6, background: '#94a3b8', borderRadius: '50%' }}></div>
                          <div style={{ width: 6, height: 6, background: '#94a3b8', borderRadius: '50%' }}></div>
                          <div style={{ width: 6, height: 6, background: '#94a3b8', borderRadius: '50%' }}></div>
                        </div>
                      )}
                    </div>
                    <h3 style={{ fontSize: 14, fontWeight: 600, color: '#334155', margin: '0 0 4px 0' }}>{album.title}</h3>
                    <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 2px 0' }}>Event On : {new Date(album.eventDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-')}</p>
                    <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 8px 0' }}>Total Memories : {album.totalMemories || 0}</p>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button 
                        onClick={() => handleViewAlbum(album._id)}
                        style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: '4px 8px' }}
                      >
                        View Album
                      </button>
                      <button 
                        onClick={() => handleDelete(album._id)}
                        style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: '4px 8px', display: 'flex', alignItems: 'center', gap: 4 }}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: 40, paddingBottom: 20, fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>
          COPYRIGHT © 2026 FRANCISCAN
        </div>
      </div>

    </div>
  );
}

export default Photos;
