import React, { useState, useEffect, useRef } from 'react';
import { 
  FaCalendarAlt, FaCloudUploadAlt, FaListUl, FaSearch, FaSyncAlt,
  FaEye, FaEdit, FaTrash, FaImages, FaTimes, FaMapMarkerAlt, FaClock
} from 'react-icons/fa';

export default function WebAdminEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [viewModalEvent, setViewModalEvent] = useState(null);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventDate, setEventDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('10:00 AM');
  const [location, setLocation] = useState('School Campus');
  const [category, setCategory] = useState('Cultural');
  const [coverImage, setCoverImage] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const dateInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/web-admin/events`);
      const data = await res.json();
      if (data.success && data.data) {
        setEvents(data.data);
      }
    } catch (err) {
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
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
    setEventDate(new Date().toISOString().split('T')[0]);
    setTime('10:00 AM');
    setLocation('School Campus');
    setCategory('Cultural');
    setCoverImage('');
    setErrorMsg('');
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!title.trim()) {
      setErrorMsg('Please enter Event Title');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/api/web-admin/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          eventDate,
          time,
          location,
          category,
          description,
          bannerUrl: coverImage,
          coverImage,
          photos: coverImage ? [coverImage] : []
        })
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg('Event saved successfully!');
        fetchEvents();
        handleReset();
        setTimeout(() => setSuccessMsg(''), 4000);
      } else {
        setErrorMsg(data.message || 'Failed to save event');
      }
    } catch (err) {
      setErrorMsg('Error connecting to backend server');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this Event?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/web-admin/events/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg('Event deleted successfully!');
        setEvents(prev => prev.filter(ev => ev._id !== id));
        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        setErrorMsg(data.message || 'Failed to delete event');
      }
    } catch (err) {
      setErrorMsg('Error deleting event');
    }
  };

  const handleEdit = (evt) => {
    setTitle(evt.title || '');
    setDescription(evt.description || '');
    setEventDate(evt.eventDate ? (typeof evt.eventDate === 'string' && evt.eventDate.includes('T') ? evt.eventDate.split('T')[0] : evt.eventDate) : '');
    setTime(evt.time || '10:00 AM');
    setLocation(evt.location || 'School Campus');
    setCategory(evt.category || 'Cultural');
    setCoverImage(evt.coverImage || evt.bannerUrl || (evt.photos && evt.photos[0]) || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredEvents = events.filter(e =>
    !search ||
    (e.title || '').toLowerCase().includes(search.toLowerCase()) ||
    (e.category || '').toLowerCase().includes(search.toLowerCase()) ||
    (e.description || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#f4f5f7]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-[#1f2937]">Event Management</h1>
        <div className="text-xs text-gray-500 font-medium">
          Home <span className="mx-1">&gt;</span> Website <span className="mx-1">&gt;</span> Events
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

      {/* Add Event Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <FaCalendarAlt className="text-gray-800 text-sm" />
          <h2 className="text-sm font-bold text-gray-800">Add Event</h2>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Left Column - Form Fields */}
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Event Title <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Enter Event Title (e.g. Annual Sports Day 2026, Science Fair)..." 
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" 
                  />
                </div>
                <div className="w-full sm:w-1/3">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
                  <select 
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 bg-white outline-none focus:border-blue-500"
                  >
                    <option value="Cultural">Cultural</option>
                    <option value="Sports">Sports</option>
                    <option value="Academic">Academic</option>
                    <option value="Celebration">Celebration</option>
                    <option value="Workshop">Workshop</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  rows="4" 
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Enter detailed description of the event, itinerary, guest of honor..." 
                  className="w-full border border-gray-300 rounded p-3 text-sm text-gray-600 outline-none focus:border-blue-500 resize-y"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Event Date <span className="text-red-500">*</span></label>
                  <div 
                    className="relative cursor-pointer"
                    onClick={() => dateInputRef.current?.showPicker ? dateInputRef.current.showPicker() : dateInputRef.current?.focus()}
                  >
                    <input 
                      type="date" 
                      ref={dateInputRef}
                      value={eventDate}
                      onChange={e => setEventDate(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500 cursor-pointer" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Time</label>
                  <input 
                    type="text" 
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    placeholder="e.g. 10:00 AM - 02:00 PM" 
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Location / Venue</label>
                  <input 
                    type="text" 
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    placeholder="e.g. School Auditorium" 
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" 
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Event Photo / Banner */}
            <div className="w-full lg:w-1/3">
              <label className="block text-xs font-medium text-gray-700 mb-1">Event Photo / Banner</label>
              
              <input 
                type="file" 
                ref={fileInputRef}
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) handleImageFile(e.target.files[0]);
                }}
                className="hidden"
              />

              {coverImage ? (
                <div className="border-2 border-cyan-400 rounded-lg p-3 bg-white relative h-[250px] flex flex-col items-center justify-center">
                  <img 
                    src={coverImage} 
                    alt="Event Preview" 
                    className="w-full h-44 object-cover rounded shadow-sm mb-3"
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
                  className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center h-[250px] bg-white relative cursor-pointer transition-colors ${
                    isDragging ? 'border-blue-500 bg-blue-50/50' : 'border-gray-300 hover:border-cyan-500'
                  }`}
                >
                  <span className="absolute top-3 left-3 bg-[#13a8a8] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">BANNER</span>
                  <FaCloudUploadAlt className="text-gray-400 text-4xl mb-3" />
                  <div className="text-sm font-medium text-gray-700 text-center">
                    Drag & drop <span className="font-normal">or</span> <span className="text-blue-500 underline font-semibold">browse</span>
                  </div>
                  <div className="text-[11px] text-gray-400 mt-1">JPG • JPEG • PNG</div>
                  <div className="text-[10px] text-gray-400 mt-2">Click to select photo</div>
                </div>
              )}
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
              disabled={saving}
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-6 rounded transition shadow-sm disabled:opacity-60 cursor-pointer"
            >
              {saving ? 'Saving...' : 'Save Event'}
            </button>
          </div>
        </div>
      </div>

      {/* All Events Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FaListUl className="text-gray-800 text-lg" />
            <h2 className="text-sm font-bold text-gray-800">All Events <span className="text-xs font-normal text-gray-500">({events.length} total)</span></h2>
          </div>
          
          <div className="flex items-center gap-2">
            <button onClick={fetchEvents} className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600 cursor-pointer" title="Refresh">
              <FaSyncAlt className={`text-xs text-blue-600 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
              <div className="relative border-r border-gray-200">
                <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-xs" />
                <input 
                  type="text" 
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search events..." 
                  className="w-64 border-none px-3 py-1.5 pl-8 text-xs text-gray-600 outline-none" 
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
                <th className="px-4 py-3 font-semibold text-center w-24">BANNER</th>
                <th className="px-4 py-3 font-semibold text-center">EVENT TITLE</th>
                <th className="px-4 py-3 font-semibold text-center">CATEGORY</th>
                <th className="px-4 py-3 font-semibold text-center">EVENT DATE</th>
                <th className="px-4 py-3 font-semibold text-center">LOCATION</th>
                <th className="px-4 py-3 font-semibold text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-4 py-8 text-center text-gray-500 text-sm bg-gray-50/20">
                    Loading events from database...
                  </td>
                </tr>
              ) : filteredEvents.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-4 py-8 text-center text-gray-500 text-sm bg-gray-50/20">
                    No events found
                  </td>
                </tr>
              ) : (
                filteredEvents.map((evt, index) => {
                  const banner = evt.coverImage || evt.bannerUrl || (evt.photos && evt.photos[0]);
                  return (
                    <tr key={evt._id || index} className="border-b border-gray-100 hover:bg-gray-50/50 transition">
                      <td className="px-4 py-4 text-center text-gray-600">{index + 1}</td>
                      <td className="px-4 py-4 text-center">
                        <div className="w-12 h-10 border border-gray-200 rounded flex flex-col items-center justify-center bg-gray-50 mx-auto text-[8px] text-gray-400 overflow-hidden">
                          {banner ? (
                            <img src={banner} alt="Banner" className="w-full h-full object-cover" />
                          ) : (
                            <FaImages className="text-gray-300 text-base" />
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 font-bold text-gray-800 text-center">{evt.title}</td>
                      <td className="px-4 py-4 text-center">
                        <span className="bg-blue-50 text-blue-700 text-[10px] font-semibold px-2 py-0.5 rounded border border-blue-200">
                          {evt.category || 'General'}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center text-gray-600 font-mono text-xs">
                        {evt.eventDate ? (typeof evt.eventDate === 'string' && evt.eventDate.includes('T') ? evt.eventDate.split('T')[0] : evt.eventDate) : (evt.createdAt ? new Date(evt.createdAt).toLocaleDateString() : '-')}
                      </td>
                      <td className="px-4 py-4 text-gray-600 text-xs text-center">
                        {evt.location || 'Campus'}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex items-center justify-center gap-3">
                          <button 
                            onClick={() => setViewModalEvent(evt)}
                            className="text-blue-500 hover:text-blue-700 cursor-pointer" 
                            title="View"
                          >
                            <FaEye />
                          </button>
                          <button 
                            onClick={() => handleEdit(evt)}
                            className="text-indigo-500 hover:text-indigo-700 cursor-pointer" 
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button 
                            onClick={() => handleDelete(evt._id)}
                            className="text-red-500 hover:text-red-700 cursor-pointer" 
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 flex items-center justify-between border-t border-gray-100 bg-white">
          <div className="text-[11px] text-gray-500">
            Showing {filteredEvents.length} of {events.length} entries
          </div>
        </div>
      </div>

      {/* View Event Modal */}
      {viewModalEvent && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-[#f8f9fb] px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-blue-600" />
                <h3 className="font-bold text-gray-800 text-base">{viewModalEvent.title}</h3>
              </div>
              <button 
                onClick={() => setViewModalEvent(null)}
                className="text-gray-400 hover:text-gray-600 p-1 text-base cursor-pointer"
              >
                <FaTimes />
              </button>
            </div>
            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {(viewModalEvent.coverImage || viewModalEvent.bannerUrl || (viewModalEvent.photos && viewModalEvent.photos[0])) && (
                <img 
                  src={viewModalEvent.coverImage || viewModalEvent.bannerUrl || viewModalEvent.photos[0]} 
                  alt="Event Banner" 
                  className="w-full h-52 object-cover rounded-lg shadow-sm"
                />
              )}
              <div className="grid grid-cols-2 gap-3 text-xs border-b pb-3">
                <div className="flex items-center gap-1.5 text-gray-700">
                  <FaCalendarAlt className="text-blue-500" />
                  <span>{viewModalEvent.eventDate ? (typeof viewModalEvent.eventDate === 'string' && viewModalEvent.eventDate.includes('T') ? viewModalEvent.eventDate.split('T')[0] : viewModalEvent.eventDate) : '-'}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-700">
                  <FaClock className="text-blue-500" />
                  <span>{viewModalEvent.time || '10:00 AM'}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-700">
                  <FaMapMarkerAlt className="text-red-500" />
                  <span>{viewModalEvent.location || 'School Campus'}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-700">
                  <span className="font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{viewModalEvent.category || 'Cultural'}</span>
                </div>
              </div>
              <div>
                <span className="text-xs text-gray-500 font-medium block mb-1">Description:</span>
                <p className="text-gray-700 text-xs bg-gray-50 p-3 rounded leading-relaxed whitespace-pre-wrap">
                  {viewModalEvent.description || 'No description provided.'}
                </p>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-3 border-t flex justify-end">
              <button 
                onClick={() => setViewModalEvent(null)}
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
