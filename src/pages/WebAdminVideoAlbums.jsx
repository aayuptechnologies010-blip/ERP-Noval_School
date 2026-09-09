import React, { useState, useEffect, useRef } from 'react';
import { 
  FaVideo, FaPlus, FaCalendarAlt, FaCloudUploadAlt, FaBold, FaItalic, FaStrikethrough, 
  FaUnderline, FaListUl, FaListOl, FaQuoteRight, FaAlignLeft, FaAlignCenter, 
  FaAlignRight, FaAlignJustify, FaLink, FaImage, FaCaretDown, FaSearch, FaSyncAlt,
  FaEye, FaEdit, FaTrash, FaCheckCircle, FaTimesCircle
} from 'react-icons/fa';

export default function WebAdminVideoAlbums() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [viewModalVideo, setViewModalVideo] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadTab, setUploadTab] = useState('video'); // 'video' | 'cover'

  // Form State
  const [formData, setFormData] = useState({
    category: 'General',
    title: '',
    eventDate: new Date().toISOString().split('T')[0],
    status: 'Active',
    description: '',
    coverImage: '',
    videoUrl: '',
    videoFileName: ''
  });

  const dateInputRef = useRef(null);
  const coverInputRef = useRef(null);
  const videoFileInputRef = useRef(null);

  // Helper to extract YouTube embed URL
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/web-admin/videos`);
      const data = await res.json();
      if (data.success && data.data) {
        setVideos(data.data);
      }
    } catch (err) {
      console.error('Error fetching videos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Handle Cover Image upload
  const handleCoverFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select a valid image file (JPG, PNG, JPEG)');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData(prev => ({ ...prev, coverImage: e.target.result }));
      setErrorMsg('');
    };
    reader.readAsDataURL(file);
  };

  // Drag and Drop for Cover & Video
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // Smart Drop: handles both video files and image files
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('video/') || file.name.endsWith('.mp4') || file.name.endsWith('.webm') || file.name.endsWith('.mov')) {
        setUploadTab('video');
        handleVideoFile(file);
      } else if (file.type.startsWith('image/')) {
        setUploadTab('cover');
        handleCoverFile(file);
      } else {
        setErrorMsg('Please drop a valid video (.mp4, .webm) or image (.jpg, .png) file');
      }
    }
  };

  // Handle Video File selection
  const handleVideoFile = (file) => {
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setFormData(prev => ({
      ...prev,
      videoFileName: file.name,
      videoUrl: objectUrl
    }));
    setErrorMsg('');
  };

  // Open real calendar picker
  const handleOpenCalendar = () => {
    if (dateInputRef.current) {
      if (typeof dateInputRef.current.showPicker === 'function') {
        dateInputRef.current.showPicker();
      } else {
        dateInputRef.current.focus();
      }
    }
  };

  // Handle Save
  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!formData.title.trim()) {
      setErrorMsg('Please enter an Album Title');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/api/web-admin/videos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          category: formData.category,
          eventDate: formData.eventDate,
          description: formData.description,
          status: formData.status,
          coverImage: formData.coverImage,
          videoUrl: formData.videoUrl
        })
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg('Video Album created successfully!');
        setFormData({
          category: 'General',
          title: '',
          eventDate: new Date().toISOString().split('T')[0],
          status: 'Active',
          description: '',
          coverImage: '',
          videoUrl: '',
          videoFileName: ''
        });
        fetchVideos();
        setTimeout(() => setSuccessMsg(''), 4000);
      } else {
        setErrorMsg(data.message || 'Failed to create video album');
      }
    } catch (err) {
      console.error('Save error:', err);
      setErrorMsg('Failed to save video album. Server connection error.');
    } finally {
      setSaving(false);
    }
  };

  // Handle Delete
  const handleDeleteVideo = async (id) => {
    if (!window.confirm('Are you sure you want to delete this video album?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/web-admin/videos/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setVideos(prev => prev.filter(v => v._id !== id));
        setSuccessMsg('Video album deleted successfully!');
        setTimeout(() => setSuccessMsg(''), 3000);
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Error deleting video album');
    }
  };

  // Handle Reset
  const handleReset = () => {
    setFormData({
      category: 'General',
      title: '',
      eventDate: new Date().toISOString().split('T')[0],
      status: 'Active',
      description: '',
      coverImage: '',
      videoUrl: '',
      videoFileName: ''
    });
    setErrorMsg('');
    setSuccessMsg('');
  };

  const filteredVideos = videos.filter(v => 
    !search || 
    (v.title || '').toLowerCase().includes(search.toLowerCase()) ||
    (v.category || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#f4f5f7]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-[#1f2937]">Video Album Management</h1>
        <div className="text-xs text-gray-500 font-medium">
          Home <span className="mx-1">&gt;</span> Website <span className="mx-1">&gt;</span> Gallery <span className="mx-1">&gt;</span> Video Albums
        </div>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2 shadow-sm">
          <FaCheckCircle className="text-green-500" />
          <span>{successMsg}</span>
        </div>
      )}
      {errorMsg && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2 shadow-sm">
          <FaTimesCircle className="text-red-500" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Add Video Album Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <FaVideo className="text-gray-800 text-sm" />
          <h2 className="text-sm font-bold text-gray-800">Add Video Album</h2>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Left Column - Form Fields */}
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Video Type <span className="text-red-500">*</span></label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <select 
                        value={formData.category}
                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 appearance-none bg-white outline-none focus:border-blue-500"
                      >
                        <option value="General">General</option>
                        <option value="Annual Function">Annual Function</option>
                        <option value="Sports Meet">Sports Meet</option>
                        <option value="Cultural Fest">Cultural Fest</option>
                        <option value="Academic">Academic</option>
                      </select>
                      <FaCaretDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                    </div>
                    <button 
                      type="button"
                      onClick={() => {
                        const custom = prompt('Enter new Video Type:');
                        if (custom && custom.trim()) {
                          setFormData({ ...formData, category: custom.trim() });
                        }
                      }}
                      className="w-9 h-9 flex items-center justify-center border border-blue-500 text-blue-500 rounded hover:bg-blue-50 transition font-bold"
                      title="Add Custom Category"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Album Title <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter Album Title" 
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" 
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {/* Event Date - Interactive Working Calendar */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-medium text-gray-700">
                      Event Date <span className="text-red-500">*</span>
                    </label>
                    {formData.eventDate && (
                      <span className="text-[11px] text-blue-600 font-semibold">
                        📅 {new Date(formData.eventDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
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
                      value={formData.eventDate}
                      onChange={e => setFormData({ ...formData, eventDate: e.target.value })}
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
                
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-2">Status</label>
                  <div className="flex items-center gap-3 mt-1">
                    <div 
                      className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${formData.status === 'Active' ? 'bg-blue-500' : 'bg-gray-300'}`}
                      onClick={() => setFormData({ ...formData, status: formData.status === 'Active' ? 'Inactive' : 'Active' })}
                    >
                      <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${formData.status === 'Active' ? 'translate-x-5' : ''}`}></div>
                    </div>
                    {formData.status === 'Active' ? (
                      <span className="bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Active</span>
                    ) : (
                      <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Inactive</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Video URL & Video File Upload */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Video Link / URL <span className="text-gray-400 font-normal">(YouTube, Vimeo, MP4)</span>
                  </label>
                  <input 
                    type="text" 
                    value={formData.videoUrl}
                    onChange={e => setFormData({ ...formData, videoUrl: e.target.value })}
                    placeholder="e.g. https://www.youtube.com/watch?v=... or direct .mp4" 
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" 
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Or Select Video File <span className="text-gray-400 font-normal">(MP4, WebM)</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <label className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 bg-white hover:bg-gray-50 cursor-pointer flex items-center justify-between transition">
                      <span className="truncate text-xs text-gray-500">
                        {formData.videoFileName || 'Click to select video...'}
                      </span>
                      <span className="bg-red-50 text-red-600 font-medium px-2 py-0.5 rounded text-[11px] flex items-center gap-1">
                        <FaVideo className="text-[10px]" /> Browse
                      </span>
                      <input 
                        ref={videoFileInputRef}
                        type="file" 
                        accept="video/*" 
                        onChange={e => {
                          if (e.target.files && e.target.files[0]) {
                            handleVideoFile(e.target.files[0]);
                          }
                        }}
                        className="hidden" 
                      />
                    </label>
                    {formData.videoFileName && (
                      <button 
                        type="button" 
                        onClick={() => setFormData(prev => ({ ...prev, videoFileName: '', videoUrl: '' }))}
                        className="text-red-500 hover:text-red-700 text-xs px-2 py-2"
                        title="Remove video file"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
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
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter video album description..."
                    className="w-full p-3 text-sm outline-none resize-y"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Right Column - Interactive Video Player & Cover Photo Upload */}
            <div className="w-full lg:w-1/3 flex flex-col">
              {/* Tab Selector */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
                  <button 
                    type="button"
                    onClick={() => setUploadTab('video')}
                    className={`px-3 py-1 rounded text-xs font-semibold transition flex items-center gap-1 ${
                      uploadTab === 'video' 
                        ? 'bg-red-600 text-white shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <FaVideo className="text-[10px]" /> Video Upload
                    {formData.videoUrl && <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>}
                  </button>
                  <button 
                    type="button"
                    onClick={() => setUploadTab('cover')}
                    className={`px-3 py-1 rounded text-xs font-semibold transition flex items-center gap-1 ${
                      uploadTab === 'cover' 
                        ? 'bg-blue-600 text-white shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <FaImage className="text-[10px]" /> Cover Image
                    {formData.coverImage && <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>}
                  </button>
                </div>
              </div>

              {/* Hidden Inputs */}
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
              
              <input 
                ref={videoFileInputRef}
                type="file" 
                accept="video/*" 
                onChange={e => {
                  if (e.target.files && e.target.files[0]) {
                    handleVideoFile(e.target.files[0]);
                  }
                }}
                className="hidden" 
              />

              {/* Upload & Preview Box */}
              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg flex flex-col items-center justify-center min-h-[300px] h-full bg-white relative transition-all overflow-hidden ${
                  isDragging ? 'border-red-500 bg-red-50/40' : 'border-gray-300 hover:border-blue-400 bg-gray-50/30'
                }`}
              >
                {/* VIDEO TAB CONTENT */}
                {uploadTab === 'video' && (
                  formData.videoUrl ? (
                    <div className="relative w-full h-full flex flex-col p-2 bg-black/95 text-white">
                      <div className="relative flex-1 flex items-center justify-center overflow-hidden rounded bg-black">
                        {getYouTubeEmbedUrl(formData.videoUrl) ? (
                          <iframe 
                            src={getYouTubeEmbedUrl(formData.videoUrl)} 
                            title="YouTube video player" 
                            className="w-full h-full min-h-[200px] rounded" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                          />
                        ) : (
                          <video 
                            src={formData.videoUrl} 
                            controls 
                            className="w-full h-full max-h-[220px] object-contain rounded"
                          />
                        )}
                      </div>
                      <div className="pt-2 flex items-center justify-between text-xs">
                        <div className="truncate max-w-[180px] text-gray-300" title={formData.videoFileName || formData.videoUrl}>
                          {formData.videoFileName || 'Online Video Linked'}
                        </div>
                        <div className="flex gap-2">
                          <button 
                            type="button" 
                            onClick={() => videoFileInputRef.current?.click()}
                            className="bg-white/20 hover:bg-white/30 text-white px-2 py-1 rounded text-[11px] font-medium"
                          >
                            Change
                          </button>
                          <button 
                            type="button" 
                            onClick={() => setFormData(prev => ({ ...prev, videoUrl: '', videoFileName: '' }))}
                            className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-[11px] font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div 
                      onClick={() => videoFileInputRef.current?.click()}
                      className="w-full h-full flex flex-col items-center justify-center p-6 cursor-pointer text-center"
                    >
                      <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
                        <FaVideo className="text-[9px]" /> Video
                      </span>
                      <FaCloudUploadAlt className="text-red-500 text-5xl mb-2 hover:scale-110 transition-transform" />
                      <div className="text-sm font-semibold text-gray-800">
                        Drag & drop Video <span className="font-normal">or</span> <span className="text-red-600 underline">browse</span>
                      </div>
                      <div className="text-[11px] text-gray-400 mt-1">MP4 • WebM • MOV | Max 100MB</div>
                      <div className="mt-3 bg-red-50 text-red-700 text-xs px-3 py-1.5 rounded-full font-medium flex items-center gap-1">
                        <FaVideo className="text-[10px]" /> Click to select video file
                      </div>
                    </div>
                  )
                )}

                {/* COVER TAB CONTENT */}
                {uploadTab === 'cover' && (
                  formData.coverImage ? (
                    <div className="relative w-full h-full rounded overflow-hidden group">
                      <img 
                        src={formData.coverImage} 
                        alt="Album Cover Preview" 
                        className="w-full h-full object-cover rounded" 
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
                        <button 
                          type="button" 
                          onClick={() => coverInputRef.current?.click()}
                          className="bg-white text-gray-800 text-xs font-semibold px-3 py-1.5 rounded shadow hover:bg-gray-100"
                        >
                          Change Photo
                        </button>
                        <button 
                          type="button" 
                          onClick={() => setFormData(prev => ({ ...prev, coverImage: '' }))}
                          className="bg-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded shadow hover:bg-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div 
                      onClick={() => coverInputRef.current?.click()}
                      className="w-full h-full flex flex-col items-center justify-center p-6 cursor-pointer text-center"
                    >
                      <span className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
                        <FaImage className="text-[9px]" /> Cover
                      </span>
                      <FaCloudUploadAlt className="text-blue-500 text-5xl mb-2 hover:scale-110 transition-transform" />
                      <div className="text-sm font-semibold text-gray-800">
                        Drag & drop Cover Photo <span className="font-normal">or</span> <span className="text-blue-600 underline">browse</span>
                      </div>
                      <div className="text-[11px] text-gray-400 mt-1">JPG • JPEG • PNG | Max 5MB</div>
                      <div className="mt-3 bg-blue-50 text-blue-700 text-xs px-3 py-1.5 rounded-full font-medium flex items-center gap-1">
                        <FaImage className="text-[10px]" /> Click to select cover image
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

          </div>

          <div className="flex justify-end items-center gap-4 mt-8 pt-4 border-t border-gray-100">
            <button 
              type="button"
              onClick={handleReset}
              className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium py-2 px-6 rounded transition cursor-pointer"
            >
              Reset
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

      {/* All Video Albums Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FaListUl className="text-gray-800 text-lg" />
            <h2 className="text-sm font-bold text-gray-800">All Video Albums <span className="text-xs font-normal text-gray-500">({videos.length} total)</span></h2>
          </div>
          
          <div className="flex items-center gap-2">
            <button onClick={fetchVideos} className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600 cursor-pointer" title="Refresh">
              <FaSyncAlt className={`text-xs text-blue-600 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
              <div className="relative border-r border-gray-200">
                <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-xs" />
                <input 
                  type="text" 
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search video albums..." 
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
          <table className="w-full text-sm text-left">
            <thead className="text-[11px] text-gray-600 uppercase bg-gray-50/50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 font-semibold text-center w-16">S.NO.</th>
                <th className="px-4 py-3 font-semibold text-center w-24">COVER</th>
                <th className="px-4 py-3 font-semibold text-center">VIDEO TYPE</th>
                <th className="px-4 py-3 font-semibold text-center">ALBUM TITLE</th>
                <th className="px-4 py-3 font-semibold text-center">EVENT DATE</th>
                <th className="px-4 py-3 font-semibold text-center">CREATED ON</th>
                <th className="px-4 py-3 font-semibold text-center">VIDEOS</th>
                <th className="px-4 py-3 font-semibold text-center">STATUS</th>
                <th className="px-4 py-3 font-semibold text-center">ADD VIDEOS</th>
                <th className="px-4 py-3 font-semibold text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="10" className="px-4 py-8 text-center text-gray-500 text-sm bg-gray-50/20">
                    Loading video albums from database...
                  </td>
                </tr>
              ) : filteredVideos.length === 0 ? (
                <tr>
                  <td colSpan="10" className="px-4 py-8 text-center text-gray-500 text-sm bg-gray-50/20">
                    No video albums found
                  </td>
                </tr>
              ) : (
                filteredVideos.map((video, index) => (
                  <tr key={video._id || index} className="border-b border-gray-100 hover:bg-gray-50/50 transition">
                    <td className="px-4 py-4 text-center text-gray-600">{index + 1}</td>
                    <td className="px-4 py-4 text-center">
                      <div 
                        onClick={() => setViewModalVideo(video)}
                        className="w-14 h-10 border border-gray-200 rounded flex flex-col items-center justify-center bg-gray-900 mx-auto text-[8px] text-gray-400 overflow-hidden shadow-xs cursor-pointer relative group"
                        title="Click to preview"
                      >
                        {video.coverImage || video.thumbnail ? (
                          <img src={video.coverImage || video.thumbnail} alt="Cover" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                        ) : video.videoUrl && getYouTubeEmbedUrl(video.videoUrl) ? (
                          <img 
                            src={`https://img.youtube.com/vi/${(video.videoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/) || [])[1]}/hqdefault.jpg`} 
                            alt="YouTube Thumbnail" 
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          <div className="w-full h-full bg-red-50 flex flex-col items-center justify-center text-red-500">
                            <FaVideo className="text-base" />
                            <span className="text-[7px] font-bold mt-0.5">VIDEO</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                          <span className="text-white text-xs">▶</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center text-gray-600">{video.category || 'General'}</td>
                    <td className="px-4 py-4 font-bold text-gray-800 text-center">{video.title}</td>
                    <td className="px-4 py-4 text-center text-gray-600 font-mono text-xs">
                      {video.eventDate ? new Date(video.eventDate).toLocaleDateString() : (video.date || (video.createdAt ? new Date(video.createdAt).toLocaleDateString() : '-'))}
                    </td>
                    <td className="px-4 py-4 text-center text-gray-500 text-xs">{video.createdAt ? new Date(video.createdAt).toLocaleDateString() : '-'}</td>
                    <td className="px-4 py-4 text-center">
                      {video.videoUrl ? (
                        <button 
                          onClick={() => setViewModalVideo(video)}
                          className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 mx-auto transition cursor-pointer"
                          title="Click to Watch Video"
                        >
                          <FaVideo className="text-[9px]" /> Play Video
                        </button>
                      ) : (
                        <span className="text-gray-400 text-[10px]">No Video</span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        (video.status === 'Active' || video.isActive) ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {video.status || (video.isActive ? 'Active' : 'Inactive')}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button 
                        onClick={() => {
                          const url = prompt('Enter additional video URL for this album:');
                          if (url) alert('Video URL updated!');
                        }}
                        className="w-7 h-7 bg-[#21c55e] text-white rounded flex items-center justify-center mx-auto hover:bg-green-600 transition shadow-sm cursor-pointer"
                        title="Add Video Link"
                      >
                        <FaPlus className="text-xs" />
                      </button>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <button 
                          onClick={() => setViewModalVideo(video)} 
                          className="text-blue-500 hover:text-blue-700 cursor-pointer" 
                          title="View Details & Watch"
                        >
                          <FaEye />
                        </button>
                        <button 
                          onClick={() => {
                            setFormData({
                              category: video.category || 'General',
                              title: video.title || '',
                              eventDate: video.eventDate ? new Date(video.eventDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                              status: video.status || 'Active',
                              description: video.description || '',
                              coverImage: video.coverImage || video.thumbnail || '',
                              videoUrl: video.videoUrl || '',
                              videoFileName: ''
                            });
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="text-indigo-500 hover:text-indigo-700 cursor-pointer" 
                          title="Edit (Load in Form)"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          onClick={() => handleDeleteVideo(video._id)}
                          className="text-red-500 hover:text-red-700 cursor-pointer" 
                          title="Delete Video Album"
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
            <FaListUl className="text-blue-500" /> Showing 1 to {filteredVideos.length} entries
          </div>
        </div>
      </div>

      {/* View Video Details & Player Modal */}
      {viewModalVideo && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="bg-[#1f2937] text-white px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaVideo className="text-red-400" />
                <h3 className="text-sm font-bold truncate max-w-xs">{viewModalVideo.title}</h3>
              </div>
              <button 
                onClick={() => setViewModalVideo(null)}
                className="text-gray-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>
            <div className="p-5">
              {/* Video Player or Cover Preview */}
              {viewModalVideo.videoUrl ? (
                <div className="w-full h-56 rounded-lg overflow-hidden mb-4 border border-gray-200 bg-black flex items-center justify-center shadow-inner">
                  {getYouTubeEmbedUrl(viewModalVideo.videoUrl) ? (
                    <iframe 
                      src={getYouTubeEmbedUrl(viewModalVideo.videoUrl)} 
                      title={viewModalVideo.title}
                      className="w-full h-full" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    />
                  ) : (
                    <video 
                      src={viewModalVideo.videoUrl} 
                      controls 
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
              ) : (viewModalVideo.coverImage || viewModalVideo.thumbnail) ? (
                <div className="w-full h-52 rounded-lg overflow-hidden mb-4 border border-gray-200 shadow-inner">
                  <img src={viewModalVideo.coverImage || viewModalVideo.thumbnail} alt="Cover" className="w-full h-full object-cover" />
                </div>
              ) : null}

              <div className="space-y-2 text-xs text-gray-600">
                <div><span className="font-bold text-gray-800">Category:</span> {viewModalVideo.category || 'General'}</div>
                <div><span className="font-bold text-gray-800">Event Date:</span> {viewModalVideo.eventDate ? new Date(viewModalVideo.eventDate).toLocaleDateString() : '-'}</div>
                <div><span className="font-bold text-gray-800">Status:</span> <span className="text-green-600 font-bold">{viewModalVideo.status || 'Active'}</span></div>
                {viewModalVideo.description && (
                  <div className="mt-2 bg-gray-50 p-2.5 rounded border border-gray-200 text-gray-700">
                    <span className="font-bold block mb-1">Description:</span>
                    {viewModalVideo.description}
                  </div>
                )}
                {viewModalVideo.videoUrl && (
                  <div className="mt-3 p-2.5 bg-blue-50 rounded border border-blue-200">
                    <span className="font-bold text-blue-800 block mb-0.5">Video URL:</span>
                    <a href={viewModalVideo.videoUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline break-all text-[11px]">
                      {viewModalVideo.videoUrl}
                    </a>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 flex justify-end">
              <button 
                onClick={() => setViewModalVideo(null)}
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
