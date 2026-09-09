import React, { useState, useEffect, useRef } from 'react';
import { 
  FaComments, FaSearch, FaSyncAlt, FaEye, FaEdit, FaTrash, FaStar,
  FaCloudUploadAlt, FaTimes, FaUser, FaCheckCircle
} from 'react-icons/fa';

export default function WebAdminGuestbook() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [viewModalItem, setViewModalItem] = useState(null);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profession, setProfession] = useState('Parent');
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('Approved');
  const [photoUrl, setPhotoUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef(null);

  const fetchGuestbook = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5005/api/web-admin/guestbook');
      const data = await res.json();
      if (data.success && data.data) {
        setComments(data.data);
      }
    } catch (err) {
      console.error('Error fetching guestbook:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuestbook();
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

  const handleReset = () => {
    setName('');
    setEmail('');
    setProfession('Parent');
    setRating(5);
    setMessage('');
    setStatus('Approved');
    setPhotoUrl('');
    setErrorMsg('');
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter Visitor Name');
      return;
    }
    if (!message.trim()) {
      setErrorMsg('Please enter Testimonial / Feedback message');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('http://localhost:5005/api/web-admin/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          profession,
          rating: Number(rating) || 5,
          message,
          status,
          photoUrl
        })
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg('Guestbook entry saved successfully!');
        fetchGuestbook();
        handleReset();
        setTimeout(() => setSuccessMsg(''), 4000);
      } else {
        setErrorMsg(data.message || 'Failed to save guestbook entry');
      }
    } catch (err) {
      setErrorMsg('Error connecting to backend server');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this guestbook comment?')) return;
    try {
      const res = await fetch(`http://localhost:5005/api/web-admin/guestbook/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg('Guestbook entry deleted successfully!');
        setComments(prev => prev.filter(c => c._id !== id));
        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        setErrorMsg(data.message || 'Failed to delete entry');
      }
    } catch (err) {
      setErrorMsg('Error deleting guestbook entry');
    }
  };

  const handleEdit = (item) => {
    setName(item.name || '');
    setEmail(item.email || '');
    setProfession(item.profession || 'Parent');
    setRating(item.rating || 5);
    setMessage(item.comment || item.message || '');
    setStatus(item.status || 'Approved');
    setPhotoUrl(item.photoUrl || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredComments = comments.filter(c =>
    !search ||
    (c.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (c.email || '').toLowerCase().includes(search.toLowerCase()) ||
    (c.profession || '').toLowerCase().includes(search.toLowerCase()) ||
    (c.comment || c.message || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#f4f5f7]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-[#1f2937]">Guestbook Management</h1>
        <div className="text-xs text-gray-500 font-medium">
          Home <span className="mx-1">&gt;</span> Website <span className="mx-1">&gt;</span> Guestbook
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

      {/* Add Guestbook Entry Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <FaComments className="text-gray-800 text-sm" />
          <h2 className="text-sm font-bold text-gray-800">Add Guestbook Entry / Testimonial</h2>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Left Column - Form Fields */}
            <div className="flex-1 flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Visitor Name <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Dr. Rajesh Sharma" 
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="visitor@example.com" 
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Profession / Role</label>
                  <select 
                    value={profession}
                    onChange={e => setProfession(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500 bg-white"
                  >
                    <option value="Parent">Parent</option>
                    <option value="Alumni">Alumni</option>
                    <option value="Guest">Distinguished Guest</option>
                    <option value="Educationist">Educationist</option>
                    <option value="Visitor">Visitor</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="flex-1 w-full">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Rating</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className={`text-xl cursor-pointer transition-transform hover:scale-110 ${
                          star <= rating ? 'text-amber-400' : 'text-gray-300'
                        }`}
                      >
                        <FaStar />
                      </button>
                    ))}
                    <span className="text-xs font-semibold text-gray-600 ml-2">({rating} of 5 Stars)</span>
                  </div>
                </div>

                <div className="w-full sm:w-1/3">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Approval Status</label>
                  <select 
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500 bg-white"
                  >
                    <option value="Approved">Approved (Visible)</option>
                    <option value="Pending">Pending Review</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Feedback / Message <span className="text-red-500">*</span></label>
                <textarea 
                  rows="4" 
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Enter the testimonial, visitor comments, impressions of the campus..." 
                  className="w-full border border-gray-300 rounded p-3 text-sm text-gray-600 outline-none focus:border-blue-500 resize-y"
                ></textarea>
              </div>
            </div>

            {/* Right Column - Avatar Photo Upload with Drag & Drop */}
            <div className="w-full lg:w-1/3">
              <label className="block text-xs font-medium text-gray-700 mb-1">Visitor Avatar / Photo</label>
              
              <input 
                type="file" 
                ref={fileInputRef}
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) handleImageFile(e.target.files[0]);
                }}
                className="hidden"
              />

              {photoUrl ? (
                <div className="border-2 border-indigo-400 rounded-lg p-3 bg-white relative h-[250px] flex flex-col items-center justify-center">
                  <img 
                    src={photoUrl} 
                    alt="Visitor Preview" 
                    className="w-28 h-28 object-cover rounded-full shadow-md mb-3 border-2 border-indigo-200"
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
                      onClick={() => setPhotoUrl('')}
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
                  className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center h-[250px] bg-white relative cursor-pointer transition-colors ${
                    isDragging ? 'border-indigo-500 bg-indigo-50/50' : 'border-gray-300 hover:border-indigo-400'
                  }`}
                >
                  <span className="absolute top-3 left-3 bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">AVATAR</span>
                  <FaCloudUploadAlt className="text-gray-400 text-4xl mb-3" />
                  <div className="text-sm font-medium text-gray-700 text-center">
                    Drag & drop <span className="font-normal">or</span> <span className="text-indigo-600 underline font-semibold">browse</span>
                  </div>
                  <div className="text-[11px] text-gray-400 mt-1">JPG • JPEG • PNG</div>
                  <div className="text-[10px] text-gray-400 mt-1">Click to select photo</div>
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
              {saving ? 'Saving...' : 'Save Guestbook Entry'}
            </button>
          </div>
        </div>
      </div>

      {/* All Comments Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FaComments className="text-gray-800 text-lg" />
            <h2 className="text-sm font-bold text-gray-800">All Guestbook Comments <span className="text-xs font-normal text-gray-500">({comments.length} total)</span></h2>
          </div>
          
          <div className="flex items-center gap-2">
            <button onClick={fetchGuestbook} className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600 cursor-pointer" title="Refresh">
              <FaSyncAlt className={`text-xs text-blue-600 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
              <div className="relative border-r border-gray-200">
                <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-xs" />
                <input 
                  type="text" 
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search comments..." 
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
            <thead className="text-[11px] font-semibold text-gray-600 uppercase bg-gray-50/50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-center w-16">S.NO.</th>
                <th className="px-4 py-3 text-center w-20">PHOTO</th>
                <th className="px-4 py-3 text-center">NAME</th>
                <th className="px-4 py-3 text-center">EMAIL</th>
                <th className="px-4 py-3 text-center">ROLE</th>
                <th className="px-4 py-3 text-center">RATING</th>
                <th className="px-4 py-3 text-center">COMMENTS</th>
                <th className="px-4 py-3 text-center">STATUS</th>
                <th className="px-4 py-3 text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" className="px-4 py-8 text-center text-gray-500 text-sm bg-gray-50/20">
                    Loading guestbook comments from database...
                  </td>
                </tr>
              ) : filteredComments.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-4 py-8 text-center text-gray-500 text-sm bg-gray-50/20">
                    No guestbook comments found
                  </td>
                </tr>
              ) : (
                filteredComments.map((item, index) => (
                  <tr key={item._id || index} className="border-b border-gray-100 hover:bg-gray-50/50 transition">
                    <td className="px-4 py-4 text-center text-gray-600 font-medium">{index + 1}</td>
                    <td className="px-4 py-4 text-center">
                      <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center bg-gray-50 mx-auto overflow-hidden">
                        {item.photoUrl ? (
                          <img src={item.photoUrl} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          <FaUser className="text-gray-400 text-xs" />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 font-bold text-gray-800 text-center">{item.name}</td>
                    <td className="px-4 py-4 text-center text-gray-600 font-mono text-xs">{item.email || '-'}</td>
                    <td className="px-4 py-4 text-center text-gray-600">
                      <span className="bg-blue-50 text-blue-700 text-[10px] font-semibold px-2 py-0.5 rounded border border-blue-200">
                        {item.profession || 'Visitor'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center gap-0.5 text-amber-400">
                        {Array.from({ length: item.rating || 5 }).map((_, i) => (
                          <FaStar key={i} className="text-xs" />
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-gray-700 max-w-xs truncate text-center text-xs">
                      {item.comment || item.message || '-'}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        item.status === 'Inactive' || item.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {item.status || 'Approved'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <button 
                          onClick={() => setViewModalItem(item)}
                          className="text-blue-500 hover:text-blue-700 cursor-pointer" 
                          title="View"
                        >
                          <FaEye />
                        </button>
                        <button 
                          onClick={() => handleEdit(item)}
                          className="text-indigo-500 hover:text-indigo-700 cursor-pointer" 
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          onClick={() => handleDelete(item._id)}
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

        <div className="p-4 flex items-center justify-between border-t border-gray-100 bg-white">
          <div className="text-[11px] text-gray-500">
            Showing {filteredComments.length} of {comments.length} entries
          </div>
        </div>
      </div>

      {/* View Comment Modal */}
      {viewModalItem && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-[#f8f9fb] px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaComments className="text-blue-600" />
                <h3 className="font-bold text-gray-800 text-base">Visitor Feedback</h3>
              </div>
              <button 
                onClick={() => setViewModalItem(null)}
                className="text-gray-400 hover:text-gray-600 p-1 text-base cursor-pointer"
              >
                <FaTimes />
              </button>
            </div>
            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="flex items-center gap-4">
                {viewModalItem.photoUrl ? (
                  <img 
                    src={viewModalItem.photoUrl} 
                    alt="Visitor" 
                    className="w-16 h-16 rounded-full object-cover shadow-sm border-2 border-indigo-200"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                    <FaUser className="text-2xl" />
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-gray-800 text-base">{viewModalItem.name}</h4>
                  <p className="text-xs text-blue-600 font-medium">{viewModalItem.profession || 'Visitor'}</p>
                  <p className="text-[11px] text-gray-500 font-mono">{viewModalItem.email || 'No email provided'}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-amber-400 py-1">
                {Array.from({ length: viewModalItem.rating || 5 }).map((_, i) => (
                  <FaStar key={i} className="text-sm" />
                ))}
                <span className="text-xs text-gray-600 ml-2 font-medium">({viewModalItem.rating || 5} / 5 Stars)</span>
              </div>

              <div>
                <span className="text-xs text-gray-500 font-medium block mb-1">Message / Comment:</span>
                <p className="text-gray-700 text-xs bg-gray-50 p-3.5 rounded-lg leading-relaxed whitespace-pre-wrap border border-gray-100">
                  "{viewModalItem.comment || viewModalItem.message || 'No feedback text.'}"
                </p>
              </div>

              <div className="flex justify-between items-center text-xs text-gray-400 border-t pt-3">
                <span>Status: <strong className="text-green-600">{viewModalItem.status || 'Approved'}</strong></span>
                <span>{viewModalItem.createdAt ? new Date(viewModalItem.createdAt).toLocaleDateString() : 'Recent'}</span>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-3 border-t flex justify-end">
              <button 
                onClick={() => setViewModalItem(null)}
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
