import React, { useState, useEffect, useRef } from 'react';
import { 
  FaImages, FaCloudUploadAlt, FaBold, FaItalic, FaStrikethrough, 
  FaListUl, FaListOl, FaAlignLeft, FaAlignCenter, 
  FaAlignRight, FaLink, FaImage, FaCaretDown, FaSearch, FaSyncAlt,
  FaPlus, FaEye, FaEdit, FaTrash, FaTimes
} from 'react-icons/fa';

export default function WebAdminKidsAlbums() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [viewModalAlbum, setViewModalAlbum] = useState(null);

  // Form State
  const [session, setSession] = useState('2026-2027');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(true);
  const [coverImage, setCoverImage] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef(null);

  const fetchKidsAlbums = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5005/api/web-admin/kids-albums');
      const data = await res.json();
      if (data.success && data.data) {
        setAlbums(data.data);
      }
    } catch (err) {
      console.error('Error fetching kids albums:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKidsAlbums();
  }, []);

  const handleImageFile = (file) => {
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

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleReset = () => {
    setTitle('');
    setDescription('');
    setCoverImage('');
    setStatus(true);
    setErrorMsg('');
  };

  const handleSave = async (e, addAnother = false) => {
    if (e) e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!title.trim()) {
      setErrorMsg('Please enter Album Title');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('http://localhost:5005/api/web-admin/kids-albums', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          category: 'Kids Corner',
          session,
          description,
          coverImage,
          status: status ? 'Active' : 'Inactive'
        })
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg('Kids album saved successfully!');
        fetchKidsAlbums();
        if (!addAnother) {
          handleReset();
        } else {
          setTitle('');
          setCoverImage('');
        }
        setTimeout(() => setSuccessMsg(''), 4000);
      } else {
        setErrorMsg(data.message || 'Failed to save kids album');
      }
    } catch (err) {
      setErrorMsg('Error connecting to backend server');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this Kids Album?')) return;
    try {
      const res = await fetch(`http://localhost:5005/api/web-admin/kids-albums/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg('Kids album deleted successfully!');
        setAlbums(prev => prev.filter(a => a._id !== id));
        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        setErrorMsg(data.message || 'Failed to delete album');
      }
    } catch (err) {
      setErrorMsg('Error deleting album');
    }
  };

  const handleEdit = (album) => {
    setTitle(album.title || '');
    setDescription(album.description || '');
    setCoverImage(album.coverImage || '');
    setStatus(album.status !== 'Inactive' && album.isActive !== false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredAlbums = albums.filter(a =>
    !search ||
    (a.title || '').toLowerCase().includes(search.toLowerCase()) ||
    (a.session || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#f4f5f7]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-[#1f2937]">Kids Album Management</h1>
        <div className="text-xs text-gray-500 font-medium">
          Home <span className="mx-1">&gt;</span> Website <span className="mx-1">&gt;</span> KidsCorner <span className="mx-1">&gt;</span> Manage Kids Album
        </div>
      </div>

      {/* Alert Notifications */}
      {successMsg && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm flex items-center justify-between shadow-sm">
          <span>✓ {successMsg}</span>
          <button onClick={() => setSuccessMsg('')} className="text-green-600 hover:text-green-800"><FaTimes /></button>
        </div>
      )}
      {errorMsg && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center justify-between shadow-sm">
          <span>⚠ {errorMsg}</span>
          <button onClick={() => setErrorMsg('')} className="text-red-600 hover:text-red-800"><FaTimes /></button>
        </div>
      )}

      {/* Create New Kids Album Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <FaImages className="text-blue-600 text-lg" />
          <h2 className="text-sm font-bold text-gray-800">Create New Kids Album</h2>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Left Column - Form Fields */}
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Select Session <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select 
                      value={session}
                      onChange={e => setSession(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 appearance-none bg-white outline-none focus:border-blue-500"
                    >
                      <option value="2026-2027">2026-2027</option>
                      <option value="2025-2026">2025-2026</option>
                      <option value="2024-2025">2024-2025</option>
                    </select>
                    <FaCaretDown className="absolute right-3 top-3 text-gray-400" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Album Title <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Enter kids album title (e.g. Nursery Annual Play, Kindergarten Rhymes)..." 
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                <div className="border border-gray-300 rounded overflow-hidden">
                  <div className="bg-[#f8f9fa] border-b border-gray-200 px-2 py-1.5 flex flex-wrap gap-1 items-center text-gray-600">
                    <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-xs"><FaBold /></button>
                    <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-xs"><FaItalic /></button>
                    <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-xs"><FaStrikethrough /></button>
                    <div className="w-px h-4 bg-gray-300 mx-1"></div>
                    <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-xs"><FaListUl /></button>
                    <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-xs"><FaListOl /></button>
                    <div className="w-px h-4 bg-gray-300 mx-1"></div>
                    <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-xs"><FaAlignLeft /></button>
                    <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-xs"><FaAlignCenter /></button>
                    <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-xs"><FaAlignRight /></button>
                  </div>
                  <textarea 
                    rows="5" 
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Enter kids album details, performance theme, class name..." 
                    className="w-full p-3 text-sm outline-none resize-y"
                  ></textarea>
                </div>
                <p className="text-[10px] text-gray-400 mt-1 mb-2">Use the rich text editor to format your description</p>
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
                  {status ? (
                    <span className="bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Active</span>
                  ) : (
                    <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Inactive</span>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Cover Photo with Drag & Drop */}
            <div className="w-full lg:w-1/3">
              <label className="block text-xs font-medium text-gray-700 mb-1">Album Cover Photo</label>
              
              <input 
                type="file" 
                ref={fileInputRef}
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleImageFile(e.target.files[0]);
                  }
                }}
                className="hidden"
              />

              {coverImage ? (
                <div className="border-2 border-green-400 rounded-lg p-3 bg-white relative h-[280px] flex flex-col items-center justify-center">
                  <img 
                    src={coverImage} 
                    alt="Album Cover Preview" 
                    className="w-full h-48 object-cover rounded shadow-sm mb-3"
                  />
                  <div className="flex gap-2">
                    <button 
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1 rounded font-medium transition cursor-pointer"
                    >
                      Change Photo
                    </button>
                    <button 
                      type="button"
                      onClick={() => setCoverImage('')}
                      className="text-xs bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1 rounded font-medium transition cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div 
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center h-[280px] bg-white relative cursor-pointer transition-colors ${
                    isDragging ? 'border-blue-500 bg-blue-50/50' : 'border-gray-300 hover:border-blue-400'
                  }`}
                >
                  <span className="absolute top-3 left-3 bg-[#6d5cae] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">COVER</span>
                  <FaCloudUploadAlt className="text-gray-400 text-4xl mb-3" />
                  <div className="text-sm font-medium text-gray-700 text-center">
                    Drag & drop <span className="font-normal">or</span> <span className="text-blue-500 underline font-semibold">browse</span>
                  </div>
                  <div className="text-[11px] text-gray-400 mt-1">JPG • PNG • JPEG</div>
                  <div className="text-[10px] text-gray-400 mt-2">Click to select photo</div>
                </div>
              )}
            </div>

          </div>

          <div className="flex justify-end items-center gap-4 mt-8 pt-4 border-t border-gray-100">
            <button 
              type="button"
              onClick={handleReset}
              className="text-sm text-gray-500 hover:text-gray-800 font-medium px-4 py-2"
            >
              Reset Form
            </button>
            <button 
              type="button"
              disabled={saving}
              onClick={(e) => handleSave(e, false)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-6 rounded transition shadow-sm disabled:opacity-60 cursor-pointer"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button 
              type="button"
              disabled={saving}
              onClick={(e) => handleSave(e, true)}
              className="bg-[#6db54a] hover:bg-[#5da23c] text-white text-sm font-medium py-2 px-4 rounded transition shadow-sm disabled:opacity-60 cursor-pointer"
            >
              Save & Add SubAlbum
            </button>
          </div>
        </div>
      </div>

      {/* All Kids Albums Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FaImages className="text-[#6db54a] text-lg" />
            <h2 className="text-sm font-bold text-gray-800">All Kids Albums <span className="text-xs font-normal text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">({albums.length} total)</span></h2>
          </div>
          
          <div className="flex items-center gap-2">
            <button onClick={fetchKidsAlbums} className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600 cursor-pointer" title="Refresh">
              <FaSyncAlt className={`text-xs text-blue-600 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
              <div className="relative border-r border-gray-200">
                <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-xs" />
                <input 
                  type="text" 
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search albums by title..." 
                  className="w-64 border-none px-3 py-1.5 pl-8 text-xs text-gray-600 outline-none" 
                />
              </div>
              <select className="border-none px-3 py-1.5 text-xs text-gray-600 outline-none bg-gray-50/50 cursor-pointer">
                <option>10 per page</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-b border-gray-100 text-[11px] font-semibold text-[#6db54a] flex items-center gap-2">
          <FaListUl /> Showing {filteredAlbums.length} of {albums.length} entries
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[11px] text-gray-600 uppercase bg-gray-50/50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 font-semibold text-center w-16">S.NO.</th>
                <th className="px-4 py-3 font-semibold text-center w-24">COVER</th>
                <th className="px-4 py-3 font-semibold text-center">ALBUM TITLE</th>
                <th className="px-4 py-3 font-semibold text-center">SESSION</th>
                <th className="px-4 py-3 font-semibold text-center">STATUS</th>
                <th className="px-4 py-3 font-semibold text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center text-gray-500 text-sm">
                    Loading kids albums from database...
                  </td>
                </tr>
              ) : filteredAlbums.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center text-gray-500 text-sm">
                    <div className="flex items-center justify-center gap-2">
                      <FaImages className="text-gray-400" /> No kids albums found
                    </div>
                  </td>
                </tr>
              ) : (
                filteredAlbums.map((album, index) => (
                  <tr key={album._id || index} className="border-b border-gray-100 hover:bg-gray-50/50 transition">
                    <td className="px-4 py-4 text-center text-gray-600">{index + 1}</td>
                    <td className="px-4 py-4 text-center">
                      <div className="w-12 h-10 border border-gray-200 rounded flex flex-col items-center justify-center bg-gray-50 mx-auto text-[8px] text-gray-400 overflow-hidden">
                        {album.coverImage ? (
                          <img src={album.coverImage} alt="Cover" className="w-full h-full object-cover" />
                        ) : (
                          <>
                            <FaImage className="text-gray-300 text-base mb-0.5" />
                            <span className="text-[7px]">NO IMG</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 font-bold text-gray-800 text-center">{album.title}</td>
                    <td className="px-4 py-4 text-center text-gray-600 font-mono text-xs">{album.session || '2026-2027'}</td>
                    <td className="px-4 py-4 text-center">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        album.status === 'Inactive' || album.isActive === false
                          ? 'bg-red-100 text-red-700' 
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {album.status || (album.isActive !== false ? 'Active' : 'Inactive')}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <button 
                          onClick={() => setViewModalAlbum(album)}
                          className="text-blue-500 hover:text-blue-700 cursor-pointer" 
                          title="View"
                        >
                          <FaEye />
                        </button>
                        <button 
                          onClick={() => handleEdit(album)}
                          className="text-indigo-500 hover:text-indigo-700 cursor-pointer" 
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          onClick={() => handleDelete(album._id)}
                          className="text-red-500 hover:text-red-700 cursor-pointer" 
                          title="Delete"
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

        <div className="p-4 border-t border-gray-100 text-[11px] font-semibold text-cyan-500 flex items-center gap-2">
          <FaListUl /> Showing {filteredAlbums.length} of {albums.length} entries
        </div>
      </div>

      {/* View Modal */}
      {viewModalAlbum && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-[#f8f9fb] px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaImages className="text-blue-600" />
                <h3 className="font-bold text-gray-800 text-base">{viewModalAlbum.title}</h3>
              </div>
              <button 
                onClick={() => setViewModalAlbum(null)}
                className="text-gray-400 hover:text-gray-600 p-1 text-base cursor-pointer"
              >
                <FaTimes />
              </button>
            </div>
            <div className="p-6">
              {viewModalAlbum.coverImage ? (
                <img 
                  src={viewModalAlbum.coverImage} 
                  alt={viewModalAlbum.title} 
                  className="w-full h-56 object-cover rounded-lg mb-4 shadow-sm"
                />
              ) : (
                <div className="w-full h-40 bg-gray-100 rounded-lg flex flex-col items-center justify-center text-gray-400 mb-4">
                  <FaImage className="text-3xl mb-1" />
                  <span className="text-xs">No Cover Image</span>
                </div>
              )}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500 font-medium">Session:</span>
                  <span className="font-semibold text-gray-800">{viewModalAlbum.session || '2026-2027'}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500 font-medium">Status:</span>
                  <span className="font-semibold text-green-600">{viewModalAlbum.status || 'Active'}</span>
                </div>
                <div>
                  <span className="text-gray-500 font-medium block mb-1">Description:</span>
                  <p className="text-gray-700 text-xs bg-gray-50 p-3 rounded leading-relaxed">
                    {viewModalAlbum.description || 'No description provided.'}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-3 border-t flex justify-end">
              <button 
                onClick={() => setViewModalAlbum(null)}
                className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-semibold rounded cursor-pointer"
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
