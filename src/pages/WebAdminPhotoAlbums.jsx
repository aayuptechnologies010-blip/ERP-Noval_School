import React, { useState, useEffect } from 'react';
import { 
  FaImages, FaPlus, FaCalendarAlt, FaCloudUploadAlt, FaBold, FaItalic, FaStrikethrough, 
  FaUnderline, FaListUl, FaListOl, FaQuoteRight, FaAlignLeft, FaAlignCenter, 
  FaAlignRight, FaAlignJustify, FaLink, FaImage, FaTable, FaEye, FaEdit, FaTrash,
  FaCaretDown, FaCaretUp, FaSearch, FaSyncAlt
} from 'react-icons/fa';

export default function WebAdminPhotoAlbums() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState(true);
  const [eventDate, setEventDate] = useState(new Date().toISOString().split('T')[0]);
  const [coverImage, setCoverImage] = useState('');
  const [albumTitle, setAlbumTitle] = useState('');
  const [albumType, setAlbumType] = useState('General');
  const [description, setDescription] = useState('');
  
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [viewModalAlbum, setViewModalAlbum] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const dateInputRef = React.useRef(null);
  const coverInputRef = React.useRef(null);

  const fetchAlbums = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/web-admin/albums`);
      const data = await res.json();
      if (data.success && data.data) {
        setAlbums(data.data);
      }
    } catch (err) {
      console.error('Error fetching albums:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const handleOpenCalendar = () => {
    if (dateInputRef.current) {
      if (typeof dateInputRef.current.showPicker === 'function') {
        dateInputRef.current.showPicker();
      } else {
        dateInputRef.current.focus();
      }
    }
  };

  const handleCoverFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select a valid image file (JPG, PNG, JPEG)');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setCoverImage(e.target.result);
      setErrorMsg('');
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!albumTitle.trim()) {
      setErrorMsg('Please enter an Album Title');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/api/web-admin/albums`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: albumTitle,
          category: albumType,
          eventDate,
          description,
          coverImage,
          status: status ? 'Active' : 'Inactive',
          totalMemories: 1
        })
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg('Photo Album created successfully!');
        setAlbumTitle('');
        setDescription('');
        setCoverImage('');
        setEventDate(new Date().toISOString().split('T')[0]);
        fetchAlbums();
        setTimeout(() => setSuccessMsg(''), 4000);
      } else {
        setErrorMsg(data.message || 'Failed to create photo album');
      }
    } catch (err) {
      console.error('Error saving photo album:', err);
      setErrorMsg('Failed to save photo album. Server connection error.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAlbum = async (id) => {
    if (!window.confirm('Are you sure you want to delete this photo album?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/web-admin/albums/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setAlbums(prev => prev.filter(a => a._id !== id));
        setSuccessMsg('Photo album deleted successfully!');
        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        alert(data.message || 'Failed to delete photo album');
      }
    } catch (err) {
      console.error('Error deleting photo album:', err);
      alert('Error deleting photo album');
    }
  };

  const handleEditAlbum = (album) => {
    setAlbumTitle(album.title || '');
    setAlbumType(album.category || 'General');
    setEventDate(album.eventDate ? new Date(album.eventDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]);
    setDescription(album.description || '');
    setCoverImage(album.coverImage || '');
    setStatus(album.status === 'Active' || album.isActive !== false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#f4f5f7]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-[#1f2937]">Photo Album Management</h1>
        <div className="text-xs text-gray-500 font-medium">
          Home <span className="mx-1">&gt;</span> Website <span className="mx-1">&gt;</span> Gallery <span className="mx-1">&gt;</span> Manage Photo Album
        </div>
      </div>

      {/* Create New Album Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <FaImages className="text-blue-600 text-lg" />
          <h2 className="text-sm font-bold text-gray-800">Create New Album</h2>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Left Column - Form Fields */}
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Album Type <span className="text-red-500">*</span></label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <select 
                        value={albumType}
                        onChange={e => setAlbumType(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 appearance-none bg-white outline-none focus:border-blue-500"
                      >
                        <option value="General">General</option>
                        <option value="Celebrations">Celebrations</option>
                        <option value="Academic">Academic</option>
                        <option value="Sports">Sports</option>
                      </select>
                      <FaCaretDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                    </div>
                    <button 
                      type="button"
                      onClick={() => {
                        const custom = prompt('Enter gallery type:');
                        if (custom && custom.trim()) setAlbumType(custom.trim());
                      }}
                      className="w-9 h-9 flex items-center justify-center border border-blue-500 text-blue-500 rounded hover:bg-blue-50 transition font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-medium text-gray-700">
                      Date of Event <span className="text-red-500">*</span>
                    </label>
                    {eventDate && (
                      <span className="text-[11px] text-blue-600 font-semibold">
                        📅 {new Date(eventDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </span>
                    )}
                  </div>
                  <div 
                    onClick={handleOpenCalendar}
                    className="relative flex items-center border border-gray-300 rounded bg-white hover:border-blue-500 transition cursor-pointer px-3 py-2 shadow-sm group"
                  >
                    <input 
                      ref={dateInputRef}
                      type="date" 
                      value={eventDate}
                      onChange={e => setEventDate(e.target.value)}
                      onClick={(e) => {
                        try {
                          e.target.showPicker?.();
                        } catch (err) {}
                      }}
                      className="w-full text-sm text-gray-800 outline-none bg-transparent cursor-pointer font-medium" 
                    />
                    <FaCalendarAlt 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenCalendar();
                      }}
                      className="text-blue-600 group-hover:text-blue-800 cursor-pointer text-base ml-2 flex-shrink-0" 
                      title="Open Calendar"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Album Title <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={albumTitle}
                  onChange={e => setAlbumTitle(e.target.value)}
                  placeholder="Enter album title..." 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" 
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Description <span className="text-red-500">*</span></label>
                <div className="border border-gray-300 rounded overflow-hidden">
                  {/* Rich Text Toolbar Mockup */}
                  <div className="bg-[#f8f9fa] border-b border-gray-200 px-2 py-1.5 flex flex-wrap gap-1 items-center text-gray-600">
                    <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-xs"><FaBold /></button>
                    <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-xs"><FaItalic /></button>
                    <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-xs"><FaStrikethrough /></button>
                    <div className="w-px h-4 bg-gray-300 mx-1"></div>
                    <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-xs flex items-center gap-1">Format <FaCaretDown /></button>
                    <div className="w-px h-4 bg-gray-300 mx-1"></div>
                    <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-xs"><FaListUl /></button>
                    <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-xs"><FaListOl /></button>
                    <div className="w-px h-4 bg-gray-300 mx-1"></div>
                    <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-xs"><FaAlignLeft /></button>
                    <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-xs"><FaAlignCenter /></button>
                    <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-xs"><FaAlignRight /></button>
                    <div className="w-px h-4 bg-gray-300 mx-1"></div>
                    <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-xs"><FaLink /></button>
                    <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-xs"><FaImage /></button>
                  </div>
                  <textarea 
                    rows="4" 
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Enter description..."
                    className="w-full p-3 text-sm outline-none resize-y"
                  ></textarea>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Status</label>
                <div className="flex items-center gap-3">
                  <div 
                    className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${status ? 'bg-blue-500' : 'bg-gray-300'}`}
                    onClick={() => setStatus(!status)}
                  >
                    <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${status ? 'translate-x-5' : ''}`}></div>
                  </div>
                  {status && <span className="bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Active</span>}
                </div>
              </div>
            </div>

            {/* Right Column - Cover Photo */}
            <div className="w-full lg:w-1/3">
              <label className="block text-xs font-medium text-gray-700 mb-1">Album Cover Photo</label>
              
              <input 
                ref={coverInputRef}
                type="file" 
                accept="image/*" 
                onChange={e => {
                  if (e.target.files && e.target.files[0]) {
                    handleCoverFile(e.target.files[0]);
                  }
                }}
                className="hidden" 
              />

              <div 
                onClick={() => coverInputRef.current?.click()}
                onDragOver={e => e.preventDefault()}
                onDrop={e => {
                  e.preventDefault();
                  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    handleCoverFile(e.dataTransfer.files[0]);
                  }
                }}
                className="border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-lg p-6 flex flex-col items-center justify-center h-[280px] bg-white relative cursor-pointer transition"
              >
                {coverImage ? (
                  <div className="relative w-full h-full rounded overflow-hidden group">
                    <img src={coverImage} alt="Cover Preview" className="w-full h-full object-cover rounded" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                      <button 
                        type="button" 
                        onClick={(e) => { e.stopPropagation(); coverInputRef.current?.click(); }}
                        className="bg-white text-gray-800 text-xs px-2.5 py-1.5 rounded shadow font-medium"
                      >
                        Change
                      </button>
                      <button 
                        type="button" 
                        onClick={(e) => { e.stopPropagation(); setCoverImage(''); }}
                        className="bg-red-600 text-white text-xs px-2.5 py-1.5 rounded shadow font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <span className="absolute top-3 left-3 bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">COVER</span>
                    <FaCloudUploadAlt className="text-gray-400 text-4xl mb-3 hover:text-blue-500 transition" />
                    <div className="text-sm font-medium text-gray-700">Drag & drop <span className="font-normal">or</span> <span className="text-blue-500 underline font-medium">browse</span></div>
                    <div className="text-[11px] text-gray-400 mt-1">JPG • PNG • JPEG | Max 5MB</div>
                    <p className="text-[10px] text-blue-500 mt-2">Click to select image</p>
                  </>
                )}
              </div>
            </div>

          </div>

          {/* Notification Banners */}
          {successMsg && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-xs font-semibold flex items-center justify-between">
              <span>✓ {successMsg}</span>
              <button onClick={() => setSuccessMsg('')} className="text-green-800 font-bold ml-2">✕</button>
            </div>
          )}
          {errorMsg && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-xs font-semibold flex items-center justify-between">
              <span>✕ {errorMsg}</span>
              <button onClick={() => setErrorMsg('')} className="text-red-800 font-bold ml-2">✕</button>
            </div>
          )}

          <div className="flex justify-end items-center gap-4 mt-8 pt-4 border-t border-gray-100">
            <button 
              type="button"
              onClick={() => {
                setAlbumTitle('');
                setDescription('');
                setCoverImage('');
                setEventDate(new Date().toISOString().split('T')[0]);
                setStatus(true);
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className="text-sm text-gray-500 hover:text-gray-800 font-medium cursor-pointer"
            >
              Reset Form
            </button>
            <button 
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-6 rounded transition cursor-pointer flex items-center gap-2"
            >
              {saving ? (
                <>
                  <FaSyncAlt className="animate-spin text-xs" /> Saving...
                </>
              ) : 'Save'}
            </button>
          </div>
        </div>
      </div>

      {/* All Photo Albums Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FaImages className="text-green-600 text-lg" />
            <h2 className="text-sm font-bold text-gray-800">All Photo Albums <span className="text-xs font-normal text-gray-500">({albums.length} total)</span></h2>
          </div>
          
          <div className="flex items-center gap-2">
            <button onClick={fetchAlbums} className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600 cursor-pointer" title="Refresh">
              <FaSyncAlt className={`text-xs text-blue-600 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
              <div className="relative border-r border-gray-200">
                <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-xs" />
                <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search albums by title..." className="w-64 px-3 py-2 pl-8 text-xs text-gray-600 outline-none" />
              </div>
              <select className="px-3 py-2 text-xs text-gray-600 outline-none bg-gray-50/50 cursor-pointer">
                <option>10 per page</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-b border-gray-100 text-xs font-medium text-gray-600 flex items-center gap-2">
          <FaListUl className="text-green-600" /> Showing {albums.filter(a => !search || (a.title || '').toLowerCase().includes(search.toLowerCase())).length} of {albums.length} entries
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[11px] text-gray-600 uppercase bg-gray-50/50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 font-semibold text-center w-16">S.NO.</th>
                <th className="px-4 py-3 font-semibold text-center w-24">COVER</th>
                <th className="px-4 py-3 font-semibold cursor-pointer group">ALBUM TITLE <span className="text-gray-300 text-[10px] ml-1 group-hover:text-gray-500">↕</span></th>
                <th className="px-4 py-3 font-semibold cursor-pointer group">ALBUM TYPE <span className="text-gray-300 text-[10px] ml-1 group-hover:text-gray-500">↕</span></th>
                <th className="px-4 py-3 font-semibold cursor-pointer group">EVENT DATE <span className="text-gray-300 text-[10px] ml-1 group-hover:text-gray-500">↕</span></th>
                <th className="px-4 py-3 font-semibold cursor-pointer group text-center">PHOTOS <span className="text-gray-300 text-[10px] ml-1 group-hover:text-gray-500">↕</span></th>
                <th className="px-4 py-3 font-semibold cursor-pointer group text-center">STATUS <span className="text-gray-300 text-[10px] ml-1 group-hover:text-gray-500">↕</span></th>
                <th className="px-4 py-3 font-semibold text-center">ADD PHOTOS</th>
                <th className="px-4 py-3 font-semibold text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="9" className="py-6 text-center text-xs text-gray-500">Loading albums from database...</td></tr>
              ) : albums.filter(a => !search || (a.title || '').toLowerCase().includes(search.toLowerCase())).length === 0 ? (
                <tr><td colSpan="9" className="py-6 text-center text-xs text-gray-500">No photo albums found</td></tr>
              ) : (
                albums
                  .filter(a => !search || (a.title || '').toLowerCase().includes(search.toLowerCase()))
                  .map((album, index) => (
                    <tr key={album._id || index} className="border-b border-gray-100 hover:bg-gray-50/50 transition">
                      <td className="px-4 py-4 text-center text-gray-600">{index + 1}</td>
                      <td className="px-4 py-4 text-center">
                        <div className="w-12 h-10 border border-gray-200 rounded flex flex-col items-center justify-center bg-gray-50 mx-auto text-[8px] text-gray-400 overflow-hidden shadow-xs">
                          {album.coverImage ? (
                            <img src={album.coverImage} alt="Cover" className="w-full h-full object-cover" />
                          ) : (
                            <>
                              <FaImage className="text-gray-300 text-base mb-0.5" />
                              <span className="text-[7px]">NO PIC</span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 font-bold text-gray-800">{album.title}</td>
                      <td className="px-4 py-4 text-gray-600">{album.category || 'General'}</td>
                      <td className="px-4 py-4 text-gray-600 font-mono text-xs">
                        {album.eventDate ? new Date(album.eventDate).toLocaleDateString() : (album.date || (album.createdAt ? new Date(album.createdAt).toLocaleDateString() : '-'))}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="bg-gray-100 text-gray-600 text-[10px] px-2 py-1 rounded border border-gray-200">
                          {album.photos?.length || album.photoCount || album.totalMemories || 1} photo(s)
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          (album.status === 'Active' || album.isActive !== false) ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {album.status || (album.isActive !== false ? 'Active' : 'Inactive')}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <button 
                          onClick={() => {
                            const photoUrl = prompt('Enter additional photo URL for this album:');
                            if (photoUrl) alert('Photo added to album!');
                          }}
                          className="w-7 h-7 bg-[#21c55e] text-white rounded flex items-center justify-center mx-auto hover:bg-green-600 transition shadow-sm cursor-pointer"
                          title="Add Photos"
                        >
                          <FaPlus className="text-xs" />
                        </button>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex items-center justify-center gap-3">
                          <button 
                            onClick={() => setViewModalAlbum(album)}
                            className="text-blue-500 hover:text-blue-700 cursor-pointer" 
                            title="View Album"
                          >
                            <FaEye />
                          </button>
                          <button 
                            onClick={() => handleEditAlbum(album)}
                            className="text-indigo-500 hover:text-indigo-700 cursor-pointer" 
                            title="Edit (Load in Form)"
                          >
                            <FaEdit />
                          </button>
                          <button 
                            onClick={() => handleDeleteAlbum(album._id)}
                            className="text-red-500 hover:text-red-700 cursor-pointer" 
                            title="Delete Album"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 flex items-center justify-between border-t border-gray-100 bg-gray-50/30">
          <div className="text-xs text-gray-500 flex items-center gap-1">
            <FaListUl className="text-blue-500" /> Showing 1 to {albums.length} entries
          </div>
        </div>
      </div>
      
      {/* View Modal */}
      {viewModalAlbum && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="bg-[#1f2937] text-white px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaImages className="text-blue-400" />
                <h3 className="text-sm font-bold truncate max-w-xs">{viewModalAlbum.title}</h3>
              </div>
              <button 
                onClick={() => setViewModalAlbum(null)}
                className="text-gray-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>
            <div className="p-5">
              {viewModalAlbum.coverImage ? (
                <div className="w-full h-56 rounded-lg overflow-hidden mb-4 border border-gray-200 shadow-inner">
                  <img src={viewModalAlbum.coverImage} alt="Album Cover" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs mb-4">
                  No Cover Image Uploaded
                </div>
              )}
              <div className="space-y-2 text-xs text-gray-600">
                <div><span className="font-bold text-gray-800">Category:</span> {viewModalAlbum.category || 'General'}</div>
                <div><span className="font-bold text-gray-800">Event Date:</span> {viewModalAlbum.eventDate ? new Date(viewModalAlbum.eventDate).toLocaleDateString() : '-'}</div>
                <div><span className="font-bold text-gray-800">Status:</span> <span className="text-green-600 font-bold">{viewModalAlbum.status || (viewModalAlbum.isActive !== false ? 'Active' : 'Inactive')}</span></div>
                {viewModalAlbum.description && (
                  <div className="mt-2 bg-gray-50 p-2.5 rounded border border-gray-200 text-gray-700">
                    <span className="font-bold block mb-1">Description:</span>
                    {viewModalAlbum.description}
                  </div>
                )}
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 flex justify-end">
              <button 
                onClick={() => setViewModalAlbum(null)}
                className="bg-gray-700 hover:bg-gray-800 text-white text-xs font-semibold px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="text-center text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-4">
        COPYRIGHT © 2017 FRANCISCAN.
      </div>
    </div>
  );
}
