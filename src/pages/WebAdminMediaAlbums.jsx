import React, { useState, useEffect, useRef } from 'react';
import { 
  FaPlusCircle, FaBold, FaItalic, FaStrikethrough, FaListUl, FaListOl, 
  FaAlignLeft, FaAlignCenter, FaAlignRight, FaLink, FaImage, FaCaretDown, FaSearch, 
  FaEye, FaEdit, FaTrash, FaTable, FaSyncAlt, FaCalendarAlt, FaCloudUploadAlt, FaFilePdf, FaVideo
} from 'react-icons/fa';


const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function WebAdminMediaAlbums() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [viewModalMedia, setViewModalMedia] = useState(null);

  // Form State
  const [mediaName, setMediaName] = useState('Print Media');
  const [mediaHeadline, setMediaHeadline] = useState('');
  const [publishDate, setPublishDate] = useState(new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState(true);
  const [description, setDescription] = useState('');
  const [mediaSource, setMediaSource] = useState('image'); // 'url' | 'embed' | 'image' | 'pdf'
  const [referenceUrl, setReferenceUrl] = useState('');
  const [embedCode, setEmbedCode] = useState('');
  const [fileData, setFileData] = useState(''); // base64 image or pdf
  const [fileName, setFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const dateInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/web-admin/media`);
      const data = await res.json();
      if (data.success && data.data) {
        setAlbums(data.data);
      }
    } catch (err) {
      console.error('Error fetching media albums:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleFileUpload = (file) => {
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      setFileData(e.target.result);
      setErrorMsg('');
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!mediaHeadline.trim()) {
      setErrorMsg('Please enter Media Headline');
      return;
    }

    setSaving(true);
    try {
      let finalFileUrl = referenceUrl;
      if (mediaSource === 'embed') finalFileUrl = embedCode;
      else if (mediaSource === 'image' || mediaSource === 'pdf') finalFileUrl = fileData;

      const res = await fetch(`${API_BASE}/api/web-admin/media`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mediaName,
          headline: mediaHeadline,
          title: mediaHeadline,
          publishDate,
          status: status ? 'Active' : 'Inactive',
          description,
          mediaSource,
          fileUrl: finalFileUrl,
          thumbnail: mediaSource === 'image' ? fileData : '',
          type: mediaSource === 'pdf' ? 'document' : (mediaSource === 'image' ? 'image' : 'video')
        })
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg('Media Album saved successfully!');
        handleReset();
        fetchMedia();
        setTimeout(() => setSuccessMsg(''), 4000);
      } else {
        setErrorMsg(data.message || 'Failed to save media album');
      }
    } catch (err) {
      console.error('Error saving media:', err);
      setErrorMsg('Failed to save media album. Server connection error.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this media album?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/web-admin/media/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setAlbums(prev => prev.filter(a => a._id !== id));
        setSuccessMsg('Media album deleted successfully!');
        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        alert(data.message || 'Failed to delete');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Error deleting media album');
    }
  };

  const handleEdit = (album) => {
    setMediaName(album.mediaName || album.name || 'Print Media');
    setMediaHeadline(album.headline || album.title || '');
    setPublishDate(album.publishDate ? new Date(album.publishDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]);
    setDescription(album.description || '');
    setStatus(album.isActive !== false && album.status !== 'Inactive');
    setMediaSource(album.mediaSource || 'url');
    if (album.mediaSource === 'url') setReferenceUrl(album.fileUrl || '');
    else if (album.mediaSource === 'embed') setEmbedCode(album.fileUrl || '');
    else if (album.mediaSource === 'image' || album.mediaSource === 'pdf') {
      setFileData(album.fileUrl || album.thumbnail || '');
      setFileName(album.fileUrl ? 'Attached Media' : '');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setMediaName('Print Media');
    setMediaHeadline('');
    setPublishDate(new Date().toISOString().split('T')[0]);
    setStatus(true);
    setDescription('');
    setMediaSource('image');
    setReferenceUrl('');
    setEmbedCode('');
    setFileData('');
    setFileName('');
    setErrorMsg('');
  };

  const filteredAlbums = albums.filter(a =>
    !search ||
    (a.headline || a.title || '').toLowerCase().includes(search.toLowerCase()) ||
    (a.name || a.mediaName || '').toLowerCase().includes(search.toLowerCase()) ||
    (a.source || a.mediaSource || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#f4f5f7]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-[#1f2937]">Media Album Management</h1>
        <div className="text-xs text-gray-500 font-medium">
          Home <span className="mx-1">&gt;</span> Website <span className="mx-1">&gt;</span> Gallery <span className="mx-1">&gt;</span> Media Album
        </div>
      </div>

      {/* Add Media Album Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <FaPlusCircle className="text-gray-800 text-sm" />
          <h2 className="text-sm font-bold text-gray-800">Add Media Album</h2>
        </div>
        
        <div className="p-6">
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

          <div className="flex flex-col gap-6">
            
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">Media Name <span className="text-red-500">*</span></label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <select 
                      value={mediaName}
                      onChange={e => setMediaName(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 appearance-none bg-white outline-none focus:border-blue-500"
                    >
                      <option value="Print Media">Print Media</option>
                      <option value="Times of India">Times of India</option>
                      <option value="Hindustan Times">Hindustan Times</option>
                      <option value="Dainik Jagran">Dainik Jagran</option>
                      <option value="Amar Ujala">Amar Ujala</option>
                      <option value="Online News Portal">Online News Portal</option>
                    </select>
                    <FaCaretDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                  </div>
                  <button 
                    type="button" 
                    onClick={() => {
                      const custom = prompt('Enter custom Media Name:');
                      if (custom) setMediaName(custom);
                    }}
                    className="w-9 h-9 flex items-center justify-center border border-blue-500 text-blue-500 rounded hover:bg-blue-50 transition font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">Media Headline <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={mediaHeadline}
                  onChange={e => setMediaHeadline(e.target.value)}
                  placeholder="Enter Media Headline" 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" 
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-medium text-gray-700">
                    Publish Date <span className="text-red-500">*</span>
                  </label>
                  {publishDate && (
                    <span className="text-[11px] text-blue-600 font-semibold">
                      📅 {new Date(publishDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                  )}
                </div>
                <div 
                  onClick={() => {
                    try { dateInputRef.current?.showPicker(); } catch(e) { dateInputRef.current?.focus(); }
                  }}
                  className="relative flex items-center border border-gray-300 rounded bg-white hover:border-blue-500 transition cursor-pointer px-3 py-2 shadow-xs group"
                >
                  <input 
                    ref={dateInputRef}
                    type="date" 
                    value={publishDate}
                    onChange={e => setPublishDate(e.target.value)}
                    onClick={(e) => { try { e.target.showPicker?.(); } catch(err) {} }}
                    className="w-full text-sm text-gray-800 outline-none bg-transparent cursor-pointer font-medium" 
                  />
                  <FaCalendarAlt className="text-blue-600 group-hover:text-blue-800 cursor-pointer text-base ml-2 flex-shrink-0" />
                </div>
              </div>
              
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-2">Status</label>
                <div className="flex items-center gap-3 mt-1">
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

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Description <span className="text-red-500">*</span></label>
              <textarea 
                rows="4" 
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Enter Media Album description..."
                className="w-full border border-gray-300 rounded p-3 text-sm outline-none resize-y"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-3">Media Source <span className="text-red-500">*</span></label>
              <div className="flex flex-wrap gap-6 mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="mediaSource" className="w-3.5 h-3.5 text-blue-600" checked={mediaSource === 'image'} onChange={() => setMediaSource('image')} />
                  <span className="text-xs font-semibold text-gray-800 flex items-center gap-1"><FaImage className="text-blue-500" /> Attach Image</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="mediaSource" className="w-3.5 h-3.5 text-blue-600" checked={mediaSource === 'pdf'} onChange={() => setMediaSource('pdf')} />
                  <span className="text-xs font-semibold text-gray-800 flex items-center gap-1"><FaFilePdf className="text-red-500" /> Attach PDF</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="mediaSource" className="w-3.5 h-3.5 text-blue-600" checked={mediaSource === 'url'} onChange={() => setMediaSource('url')} />
                  <span className="text-xs font-semibold text-gray-800 flex items-center gap-1"><FaLink className="text-gray-500" /> Reference URL</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="mediaSource" className="w-3.5 h-3.5 text-blue-600" checked={mediaSource === 'embed'} onChange={() => setMediaSource('embed')} />
                  <span className="text-xs font-semibold text-gray-800 flex items-center gap-1"><FaVideo className="text-green-500" /> Video embed code</span>
                </label>
              </div>

              {/* Dynamic Source Upload Boxes */}
              {mediaSource === 'url' && (
                <input 
                  type="text" 
                  value={referenceUrl}
                  onChange={e => setReferenceUrl(e.target.value)}
                  placeholder="Enter online article / newspaper link: https://..." 
                  className="w-full sm:w-2/3 border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" 
                />
              )}

              {mediaSource === 'embed' && (
                <textarea 
                  rows="3"
                  value={embedCode}
                  onChange={e => setEmbedCode(e.target.value)}
                  placeholder="Paste YouTube or video iframe embed code or link..." 
                  className="w-full sm:w-2/3 border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" 
                />
              )}

              {(mediaSource === 'image' || mediaSource === 'pdf') && (
                <div className="w-full sm:w-2/3">
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    accept={mediaSource === 'image' ? 'image/*' : 'application/pdf'} 
                    onChange={e => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileUpload(e.target.files[0]);
                      }
                    }}
                    className="hidden" 
                  />

                  <div 
                    onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center min-h-[160px] bg-white relative cursor-pointer transition ${
                      isDragging ? 'border-blue-500 bg-blue-50/40' : 'border-gray-300 hover:border-blue-400 bg-gray-50/30'
                    }`}
                  >
                    {fileData ? (
                      mediaSource === 'image' ? (
                        <div className="relative w-full h-40 rounded overflow-hidden flex items-center justify-center bg-gray-100 group">
                          <img src={fileData} alt="Media Preview" className="w-full h-full object-contain" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                            <button 
                              type="button" 
                              onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                              className="bg-white text-gray-800 text-xs px-3 py-1.5 rounded shadow font-semibold"
                            >
                              Change
                            </button>
                            <button 
                              type="button" 
                              onClick={(e) => { e.stopPropagation(); setFileData(''); setFileName(''); }}
                              className="bg-red-600 text-white text-xs px-3 py-1.5 rounded shadow font-semibold"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2 p-4 bg-red-50 rounded border border-red-200 w-full text-center">
                          <FaFilePdf className="text-red-600 text-4xl" />
                          <span className="text-xs font-bold text-gray-800 truncate max-w-xs">{fileName || 'PDF Document Loaded'}</span>
                          <span className="text-[10px] text-green-600 font-semibold">✓ Ready to upload</span>
                          <button 
                            type="button" 
                            onClick={(e) => { e.stopPropagation(); setFileData(''); setFileName(''); }}
                            className="text-red-500 hover:text-red-700 text-xs font-medium underline mt-1"
                          >
                            Remove PDF
                          </button>
                        </div>
                      )
                    ) : (
                      <>
                        <FaCloudUploadAlt className="text-gray-400 text-4xl mb-2" />
                        <div className="text-sm font-semibold text-gray-700">
                          Drag & drop {mediaSource === 'image' ? 'Image' : 'PDF Document'} <span className="font-normal">or</span> <span className="text-blue-600 underline">browse</span>
                        </div>
                        <div className="text-[11px] text-gray-400 mt-1">
                          {mediaSource === 'image' ? 'JPG • PNG • JPEG | Max 5MB' : 'PDF Only | Max 10MB'}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

          </div>

          <div className="flex items-center gap-4 mt-8 pt-4 border-t border-gray-100">
            <button 
              type="button" 
              onClick={handleSave} 
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-6 rounded transition flex items-center gap-2 cursor-pointer shadow-sm"
            >
              {saving ? <><FaSyncAlt className="animate-spin text-xs" /> Saving...</> : 'Save Media'}
            </button>
            <button 
              type="button" 
              onClick={handleReset} 
              className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium py-2 px-6 rounded transition cursor-pointer"
            >
              Reset Form
            </button>
          </div>
        </div>
      </div>

      {/* All Media Albums Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FaTable className="text-gray-800 text-sm" />
            <h2 className="text-sm font-bold text-gray-800">All Media Albums <span className="text-xs font-normal text-gray-500">({albums.length} total)</span></h2>
          </div>
          
          <div className="flex items-center gap-2">
            <button onClick={fetchMedia} className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600 cursor-pointer" title="Refresh">
              <FaSyncAlt className={`text-xs text-blue-600 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
              <div className="relative border-r border-gray-200">
                <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-xs" />
                <input 
                  type="text" 
                  value={search} 
                  onChange={e => setSearch(e.target.value)} 
                  placeholder="Search media albums..." 
                  className="w-64 px-3 py-1.5 pl-8 text-xs text-gray-600 outline-none" 
                />
              </div>
              <select className="border-none px-2 py-1.5 text-xs text-gray-600 outline-none bg-gray-50/50">
                <option>10</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="font-semibold text-gray-700 bg-gray-50/50 border-y border-gray-200 uppercase text-[11px]">
              <tr>
                <th className="px-4 py-3 text-center w-16">S.No.</th>
                <th className="px-4 py-3 text-center w-20">PREVIEW</th>
                <th className="px-4 py-3">Media Headline</th>
                <th className="px-4 py-3">Media Name</th>
                <th className="px-4 py-3 text-center">Media Source</th>
                <th className="px-4 py-3 text-center">Publish Date</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="py-6 text-center text-xs text-gray-500">
                    Loading media albums from database...
                  </td>
                </tr>
              ) : filteredAlbums.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-6 text-center text-xs text-gray-500">
                    No media albums found
                  </td>
                </tr>
              ) : (
                filteredAlbums.map((album, index) => {
                  const headline = album.headline || album.title;
                  const name = album.mediaName || album.name || 'Print Media';
                  const source = album.mediaSource || album.source || 'image';
                  const pDate = album.publishDate ? new Date(album.publishDate).toLocaleDateString() : (album.date || (album.createdAt ? new Date(album.createdAt).toLocaleDateString() : '-'));
                  const isActive = album.status === 'Active' || album.isActive !== false;

                  return (
                    <tr key={album._id || index} className="border-b border-gray-100 hover:bg-gray-50/50 transition">
                      <td className="px-4 py-4 text-center font-medium text-blue-600">{index + 1}</td>
                      <td className="px-4 py-4 text-center">
                        <div className="w-12 h-10 border border-gray-200 rounded flex flex-col items-center justify-center bg-gray-50 mx-auto text-[8px] text-gray-400 overflow-hidden shadow-xs">
                          {album.thumbnail || (album.mediaSource === 'image' && album.fileUrl) ? (
                            <img src={album.thumbnail || album.fileUrl} alt="Cover" className="w-full h-full object-cover" />
                          ) : album.mediaSource === 'pdf' ? (
                            <FaFilePdf className="text-red-500 text-lg" />
                          ) : (
                            <FaLink className="text-blue-400 text-base" />
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 font-bold text-gray-800">{headline}</td>
                      <td className="px-4 py-4 text-gray-600">{name}</td>
                      <td className="px-4 py-4 text-center">
                        <span className="bg-blue-50 text-blue-700 border border-blue-200 text-[10px] px-2 py-0.5 rounded font-semibold uppercase">
                          {source}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center text-gray-600 font-mono">{pDate}</td>
                      <td className="px-4 py-4 text-center">
                        {isActive ? (
                          <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded">Active</span>
                        ) : (
                          <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded">Inactive</span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex items-center justify-center gap-3">
                          <button onClick={() => setViewModalMedia(album)} className="text-blue-500 hover:text-blue-700 cursor-pointer" title="View"><FaEye /></button>
                          <button onClick={() => handleEdit(album)} className="text-indigo-500 hover:text-indigo-700 cursor-pointer" title="Edit"><FaEdit /></button>
                          <button onClick={() => handleDelete(album._id)} className="text-red-500 hover:text-red-700 cursor-pointer" title="Delete"><FaTrash /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 flex items-center justify-between bg-white border-t border-gray-100">
          <div className="text-[11px] text-gray-500">
            Showing {filteredAlbums.length} of {albums.length} media albums
          </div>
        </div>
      </div>

      {/* View Modal */}
      {viewModalMedia && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="bg-[#1f2937] text-white px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaImage className="text-blue-400" />
                <h3 className="text-sm font-bold truncate max-w-xs">{viewModalMedia.headline || viewModalMedia.title}</h3>
              </div>
              <button onClick={() => setViewModalMedia(null)} className="text-gray-400 hover:text-white text-lg font-bold">✕</button>
            </div>
            <div className="p-5">
              {viewModalMedia.thumbnail || (viewModalMedia.mediaSource === 'image' && viewModalMedia.fileUrl) ? (
                <div className="w-full h-52 rounded-lg overflow-hidden mb-4 border border-gray-200 shadow-inner">
                  <img src={viewModalMedia.thumbnail || viewModalMedia.fileUrl} alt="Preview" className="w-full h-full object-contain bg-gray-50" />
                </div>
              ) : null}
              <div className="space-y-2 text-xs text-gray-600">
                <div><span className="font-bold text-gray-800">Media Name:</span> {viewModalMedia.mediaName || viewModalMedia.name}</div>
                <div><span className="font-bold text-gray-800">Publish Date:</span> {viewModalMedia.publishDate ? new Date(viewModalMedia.publishDate).toLocaleDateString() : '-'}</div>
                <div><span className="font-bold text-gray-800">Source Type:</span> <span className="uppercase font-semibold text-blue-600">{viewModalMedia.mediaSource || 'image'}</span></div>
                {viewModalMedia.description && (
                  <div className="mt-2 bg-gray-50 p-2.5 rounded border border-gray-200 text-gray-700">
                    <span className="font-bold block mb-1">Description:</span>
                    {viewModalMedia.description}
                  </div>
                )}
                {viewModalMedia.fileUrl && viewModalMedia.mediaSource !== 'image' && (
                  <div className="mt-2 p-2 bg-blue-50 rounded border border-blue-200 text-xs">
                    <span className="font-bold text-blue-900 block mb-0.5">Attached Link / Resource:</span>
                    <a href={viewModalMedia.fileUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline break-all">
                      {viewModalMedia.fileUrl.startsWith('data:') ? 'Open Attached File' : viewModalMedia.fileUrl}
                    </a>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 flex justify-end">
              <button onClick={() => setViewModalMedia(null)} className="bg-gray-700 hover:bg-gray-800 text-white text-xs font-semibold px-4 py-2 rounded">
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
