import React, { useState, useEffect, useRef } from 'react';
import { 
  FaTrophy, FaCalendarAlt, FaCloudUploadAlt, FaListUl, FaSearch, FaSyncAlt,
  FaEye, FaEdit, FaTrash, FaImage
} from 'react-icons/fa';

export default function WebAdminAchievements() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [viewModalAch, setViewModalAch] = useState(null);

  // Form State
  const [category, setCategory] = useState('Academic');
  const [title, setTitle] = useState('');
  const [studentName, setStudentName] = useState('');
  const [venue, setVenue] = useState('');
  const [eventDate, setEventDate] = useState(new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState(true);
  const [showOn, setShowOn] = useState('Website');
  const [description, setDescription] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const dateInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const fetchAchievements = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5005/api/web-admin/achievements');
      const data = await res.json();
      if (data.success && data.data) {
        setAchievements(data.data);
      }
    } catch (err) {
      console.error('Error fetching achievements:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const handleImageFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select a valid image file (JPG, PNG, JPEG)');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setPhotoUrl(e.target.result);
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

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!title.trim()) {
      setErrorMsg('Please enter Achievement Title');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('http://localhost:5005/api/web-admin/achievements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          studentName,
          category,
          venue,
          eventDate,
          status: status ? 'Active' : 'Inactive',
          showOn,
          description,
          photoUrl
        })
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg('Achievement saved successfully!');
        handleReset();
        fetchAchievements();
        setTimeout(() => setSuccessMsg(''), 4000);
      } else {
        setErrorMsg(data.message || 'Failed to save achievement');
      }
    } catch (err) {
      console.error('Error saving achievement:', err);
      setErrorMsg('Failed to save achievement. Server connection error.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this achievement?')) return;
    try {
      const res = await fetch(`http://localhost:5005/api/web-admin/achievements/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setAchievements(prev => prev.filter(a => a._id !== id));
        setSuccessMsg('Achievement deleted successfully!');
        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        alert(data.message || 'Failed to delete');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Error deleting achievement');
    }
  };

  const handleEdit = (ach) => {
    setTitle(ach.title || '');
    setStudentName(ach.studentName || '');
    setCategory(ach.category || 'Academic');
    setVenue(ach.venue || ach.eventName || '');
    setEventDate(ach.date ? new Date(ach.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]);
    setStatus(ach.status !== 'Inactive');
    setShowOn(ach.showOn || 'Website');
    setDescription(ach.description || '');
    setPhotoUrl(ach.photoUrl || ach.image || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setTitle('');
    setStudentName('');
    setCategory('Academic');
    setVenue('');
    setEventDate(new Date().toISOString().split('T')[0]);
    setStatus(true);
    setShowOn('Website');
    setDescription('');
    setPhotoUrl('');
    setErrorMsg('');
  };

  const filteredAchievements = achievements.filter(a =>
    !search ||
    (a.title || '').toLowerCase().includes(search.toLowerCase()) ||
    (a.studentName || '').toLowerCase().includes(search.toLowerCase()) ||
    (a.category || '').toLowerCase().includes(search.toLowerCase()) ||
    (a.venue || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#f4f5f7]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-[#1f2937]">Achievement Management</h1>
        <div className="text-xs text-gray-500 font-medium">
          Home <span className="mx-1">&gt;</span> Website <span className="mx-1">&gt;</span> Achievements
        </div>
      </div>

      {/* Add Achievement Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <FaTrophy className="text-amber-500 text-base" />
          <h2 className="text-sm font-bold text-gray-800">Add Achievement</h2>
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

          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Left Column - Form Fields */}
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Achievement Type <span className="text-red-500">*</span></label>
                  <select 
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500 bg-white"
                  >
                    <option value="Academic">Academic</option>
                    <option value="Sports">Sports</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Co-Curricular">Co-Curricular</option>
                    <option value="Science & Innovation">Science & Innovation</option>
                    <option value="General">General</option>
                  </select>
                </div>
                
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Achievement Title <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Enter Achievement Title" 
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" 
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Student / Winner Name</label>
                  <input 
                    type="text" 
                    value={studentName}
                    onChange={e => setStudentName(e.target.value)}
                    placeholder="Enter Student Name (Optional)" 
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" 
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Event Venue / Position <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    value={venue}
                    onChange={e => setVenue(e.target.value)}
                    placeholder="e.g. State Level / 1st Position" 
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" 
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-medium text-gray-700">
                      Event Date <span className="text-red-500">*</span>
                    </label>
                    {eventDate && (
                      <span className="text-[11px] text-blue-600 font-semibold">
                        📅 {new Date(eventDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
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
                      value={eventDate}
                      onChange={e => setEventDate(e.target.value)}
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
                  placeholder="Enter Achievement details and highlights..." 
                  className="w-full border border-gray-300 rounded p-3 text-sm text-gray-700 outline-none resize-y"
                ></textarea>
              </div>
            </div>

            {/* Right Column - Image Upload */}
            <div className="w-full lg:w-1/3">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Attach Image <span className="text-red-500">*</span>
              </label>

              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/*" 
                onChange={e => {
                  if (e.target.files && e.target.files[0]) {
                    handleImageFile(e.target.files[0]);
                  }
                }}
                className="hidden" 
              />

              <div 
                onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center min-h-[260px] h-full bg-white relative cursor-pointer transition ${
                  isDragging ? 'border-amber-500 bg-amber-50/40' : 'border-gray-300 hover:border-amber-500 bg-gray-50/30'
                }`}
              >
                {photoUrl ? (
                  <div className="relative w-full h-full rounded overflow-hidden group min-h-[200px] flex items-center justify-center bg-gray-100">
                    <img src={photoUrl} alt="Achievement Preview" className="w-full h-full object-contain" />
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
                        onClick={(e) => { e.stopPropagation(); setPhotoUrl(''); }}
                        className="bg-red-600 text-white text-xs px-3 py-1.5 rounded shadow font-semibold"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <span className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">IMAGE</span>
                    <FaCloudUploadAlt className="text-amber-500 text-4xl mb-2" />
                    <div className="text-sm font-semibold text-gray-700 text-center">
                      Drag & drop Image <span className="font-normal">or</span> <span className="text-amber-600 underline">browse</span>
                    </div>
                    <div className="text-[11px] text-gray-400 mt-1">JPG • JPEG • PNG | Max 5MB</div>
                  </>
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
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-6 rounded transition cursor-pointer flex items-center gap-2 shadow-sm"
            >
              {saving ? <><FaSyncAlt className="animate-spin text-xs" /> Saving...</> : 'Save Achievement'}
            </button>
          </div>
        </div>
      </div>

      {/* All Achievements Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FaListUl className="text-gray-800 text-lg" />
            <h2 className="text-sm font-bold text-gray-800">All Achievements <span className="text-xs font-normal text-gray-500">({achievements.length} total)</span></h2>
          </div>
          
          <div className="flex items-center gap-2">
            <button onClick={fetchAchievements} className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600 cursor-pointer" title="Refresh">
              <FaSyncAlt className={`text-xs text-blue-600 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
              <div className="relative border-r border-gray-200">
                <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-xs" />
                <input 
                  type="text" 
                  value={search} 
                  onChange={e => setSearch(e.target.value)} 
                  placeholder="Search achievements..." 
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
                <th className="px-4 py-3 font-semibold text-center w-20">IMAGE</th>
                <th className="px-4 py-3 font-semibold text-center">EVENT DATE</th>
                <th className="px-4 py-3 font-semibold text-center">TYPE</th>
                <th className="px-4 py-3 font-semibold">TITLE / WINNER</th>
                <th className="px-4 py-3 font-semibold text-center">VENUE / POSITION</th>
                <th className="px-4 py-3 font-semibold text-center">STATUS</th>
                <th className="px-4 py-3 font-semibold text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="px-4 py-8 text-center text-gray-500 text-sm bg-gray-50/20">
                    Loading achievements from database...
                  </td>
                </tr>
              ) : filteredAchievements.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-4 py-8 text-center text-gray-500 text-sm bg-gray-50/20">
                    No achievements found
                  </td>
                </tr>
              ) : (
                filteredAchievements.map((ach, index) => (
                  <tr key={ach._id || index} className="border-b border-gray-100 hover:bg-gray-50/50 transition">
                    <td className="px-4 py-4 text-center text-gray-600">{index + 1}</td>
                    <td className="px-4 py-4 text-center">
                      <div className="w-12 h-10 border border-gray-200 rounded flex flex-col items-center justify-center bg-gray-50 mx-auto text-[8px] text-gray-400 overflow-hidden shadow-xs">
                        {ach.photoUrl || ach.image ? (
                          <img src={ach.photoUrl || ach.image} alt="Ach" className="w-full h-full object-cover" />
                        ) : (
                          <>
                            <FaImage className="text-gray-300 text-base mb-0.5" />
                            <span className="text-[7px]">NO IMG</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center text-gray-600 font-mono text-xs">
                      {ach.date ? new Date(ach.date).toLocaleDateString() : (ach.createdAt ? new Date(ach.createdAt).toLocaleDateString() : '-')}
                    </td>
                    <td className="px-4 py-4 text-center text-gray-600">
                      <span className="bg-purple-50 text-purple-700 text-[10px] font-semibold px-2 py-0.5 rounded border border-purple-200">
                        {ach.category || 'General'}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-bold text-gray-800">
                      {ach.title}
                      {ach.studentName && (
                        <span className="block text-xs font-normal text-blue-600 mt-0.5">
                          Winner: {ach.studentName} {ach.class ? `(${ach.class})` : ''}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-center text-gray-600">
                      <div>{ach.venue || ach.eventName || '-'}</div>
                      {ach.rank && (
                        <span className="inline-block mt-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">
                          {ach.rank}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        ach.status === 'Active' || ach.status !== 'Inactive' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {ach.status || 'Active'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <button onClick={() => setViewModalAch(ach)} className="text-blue-500 hover:text-blue-700 cursor-pointer" title="View"><FaEye /></button>
                        <button onClick={() => handleEdit(ach)} className="text-indigo-500 hover:text-indigo-700 cursor-pointer" title="Edit"><FaEdit /></button>
                        <button onClick={() => handleDelete(ach._id)} className="text-red-500 hover:text-red-700 cursor-pointer" title="Delete"><FaTrash /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 flex items-center justify-between border-t border-gray-100 bg-white">
          <div className="text-[11px] text-gray-500">
            Showing {filteredAchievements.length} of {achievements.length} entries
          </div>
        </div>
      </div>

      {/* View Modal */}
      {viewModalAch && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="bg-[#1f2937] text-white px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaTrophy className="text-amber-400" />
                <h3 className="text-sm font-bold truncate max-w-xs">{viewModalAch.title}</h3>
              </div>
              <button onClick={() => setViewModalAch(null)} className="text-gray-400 hover:text-white text-lg font-bold">✕</button>
            </div>
            <div className="p-5">
              {viewModalAch.photoUrl || viewModalAch.image ? (
                <div className="w-full h-52 rounded-lg overflow-hidden mb-4 border border-gray-200 shadow-inner">
                  <img src={viewModalAch.photoUrl || viewModalAch.image} alt="Preview" className="w-full h-full object-contain bg-gray-50" />
                </div>
              ) : null}
              <div className="space-y-2 text-xs text-gray-600">
                <div><span className="font-bold text-gray-800">Winner:</span> {viewModalAch.studentName || 'School Team'}</div>
                <div><span className="font-bold text-gray-800">Category:</span> {viewModalAch.category || 'Academic'}</div>
                <div><span className="font-bold text-gray-800">Venue / Event:</span> {viewModalAch.venue || viewModalAch.eventName || '-'}</div>
                <div><span className="font-bold text-gray-800">Date:</span> {viewModalAch.date ? new Date(viewModalAch.date).toLocaleDateString() : '-'}</div>
                <div><span className="font-bold text-gray-800">Rank:</span> <span className="text-amber-600 font-bold">{viewModalAch.rank || '1st'}</span></div>
                {viewModalAch.description && (
                  <div className="mt-2 bg-gray-50 p-2.5 rounded border border-gray-200 text-gray-700">
                    <span className="font-bold block mb-1">Details:</span>
                    {viewModalAch.description}
                  </div>
                )}
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 flex justify-end">
              <button onClick={() => setViewModalAch(null)} className="bg-gray-700 hover:bg-gray-800 text-white text-xs font-semibold px-4 py-2 rounded">
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
