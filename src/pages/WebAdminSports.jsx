import React, { useState, useEffect, useRef } from 'react';
import { 
  FaTrophy, FaCalendarAlt, FaListUl, FaSearch, FaSyncAlt,
  FaEye, FaEdit, FaTrash, FaCloudUploadAlt, FaTimes, FaImage
} from 'react-icons/fa';


const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function WebAdminSports() {
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [viewModalSport, setViewModalSport] = useState(null);

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('Outdoor');
  const [amount, setAmount] = useState('');
  const [activationDate, setActivationDate] = useState(new Date().toISOString().split('T')[0]);
  const [deactivationDate, setDeactivationDate] = useState('');
  const [enableEndDate, setEnableEndDate] = useState(false);
  const [status, setStatus] = useState(true);
  const [instructions, setInstructions] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const actDateRef = useRef(null);
  const deactDateRef = useRef(null);
  const fileInputRef = useRef(null);

  const fetchSports = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/web-admin/sports`);
      const data = await res.json();
      if (data.success && data.data) {
        setSports(data.data);
      }
    } catch (err) {
      console.error('Error fetching sports:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSports();
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
    setCategory('');
    setType('Outdoor');
    setAmount('');
    setActivationDate(new Date().toISOString().split('T')[0]);
    setDeactivationDate('');
    setEnableEndDate(false);
    setStatus(true);
    setInstructions('');
    setPhotoUrl('');
    setErrorMsg('');
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter Sports Name');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/api/web-admin/sports`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: name,
          name,
          category: category || 'Athletics',
          sportType: type,
          type,
          amount: Number(amount) || 0,
          activationDate,
          deactivationDate: enableEndDate ? deactivationDate : null,
          status: status ? 'Active' : 'Inactive',
          description: instructions,
          instructions,
          photoUrl
        })
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg('Sports activity saved successfully!');
        fetchSports();
        handleReset();
        setTimeout(() => setSuccessMsg(''), 4000);
      } else {
        setErrorMsg(data.message || 'Failed to save sports activity');
      }
    } catch (err) {
      setErrorMsg('Error connecting to backend server');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this sports record?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/web-admin/sports/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg('Sports record deleted successfully!');
        setSports(prev => prev.filter(s => s._id !== id));
        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        setErrorMsg(data.message || 'Failed to delete sports record');
      }
    } catch (err) {
      setErrorMsg('Error deleting sports record');
    }
  };

  const handleEdit = (sport) => {
    setName(sport.name || sport.title || '');
    setCategory(sport.category || '');
    setType(sport.type || sport.sportType || 'Outdoor');
    setAmount(sport.amount !== undefined ? sport.amount : '');
    setActivationDate(sport.activationDate ? new Date(sport.activationDate).toISOString().split('T')[0] : (sport.matchDate ? new Date(sport.matchDate).toISOString().split('T')[0] : ''));
    if (sport.deactivationDate) {
      setDeactivationDate(new Date(sport.deactivationDate).toISOString().split('T')[0]);
      setEnableEndDate(true);
    } else {
      setDeactivationDate('');
      setEnableEndDate(false);
    }
    setStatus(sport.status !== 'Inactive');
    setInstructions(sport.instructions || sport.description || '');
    setPhotoUrl(sport.photoUrl || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredSports = sports.filter(s =>
    !search ||
    (s.name || s.title || '').toLowerCase().includes(search.toLowerCase()) ||
    (s.category || '').toLowerCase().includes(search.toLowerCase()) ||
    (s.type || s.sportType || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#f4f5f7]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-[#1f2937]">Sports Management</h1>
        <div className="text-xs text-gray-500 font-medium">
          Home <span className="mx-1">&gt;</span> Website <span className="mx-1">&gt;</span> Sports
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

      {/* Add Sports Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <FaTrophy className="text-gray-800 text-sm" />
          <h2 className="text-sm font-bold text-gray-800">Add Sports</h2>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Left Column - Form Fields */}
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Sports Name <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Swimming, Basketball, Football, Karate" 
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" 
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Category Name</label>
                  <input 
                    type="text" 
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    placeholder="e.g. Athletics, Water Sports, Team Sports" 
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" 
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Sports Type <span className="text-red-500">*</span></label>
                  <select 
                    value={type}
                    onChange={e => setType(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500 bg-white"
                  >
                    <option value="Outdoor">Outdoor</option>
                    <option value="Indoor">Indoor</option>
                    <option value="Martial Arts">Martial Arts</option>
                    <option value="Aquatics">Aquatics</option>
                    <option value="Yoga & Fitness">Yoga & Fitness</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Fee / Amount (₹)</label>
                  <input 
                    type="number" 
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    placeholder="e.g. 500 (Leave 0 for free)" 
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" 
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Activation Date <span className="text-red-500">*</span></label>
                  <div 
                    className="relative cursor-pointer"
                    onClick={() => actDateRef.current?.showPicker ? actDateRef.current.showPicker() : actDateRef.current?.focus()}
                  >
                    <input 
                      type="date" 
                      ref={actDateRef}
                      value={activationDate}
                      onChange={e => setActivationDate(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500 cursor-pointer" 
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Deactivation Date</label>
                  <div className="relative flex items-center gap-2">
                    <div 
                      className="relative flex-1 cursor-pointer"
                      onClick={() => enableEndDate && (deactDateRef.current?.showPicker ? deactDateRef.current.showPicker() : deactDateRef.current?.focus())}
                    >
                      <input 
                        type="date" 
                        ref={deactDateRef}
                        disabled={!enableEndDate}
                        value={deactivationDate}
                        onChange={e => setDeactivationDate(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500 disabled:bg-gray-100 cursor-pointer" 
                      />
                    </div>
                    <label className="flex items-center gap-1 text-[11px] text-gray-600 cursor-pointer whitespace-nowrap">
                      <input 
                        type="checkbox" 
                        checked={enableEndDate}
                        onChange={e => setEnableEndDate(e.target.checked)}
                        className="rounded border-gray-300" 
                      /> Enable
                    </label>
                  </div>
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
                  {status ? (
                    <span className="bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Active</span>
                  ) : (
                    <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Inactive</span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Instructions / Description</label>
                <textarea 
                  rows="3" 
                  value={instructions}
                  onChange={e => setInstructions(e.target.value)}
                  placeholder="Enter equipment required, dress code, coach timing..." 
                  className="w-full border border-gray-300 rounded p-3 text-sm text-gray-600 outline-none focus:border-blue-500 resize-y"
                ></textarea>
              </div>
            </div>

            {/* Right Column - Sports Photo Upload with Drag & Drop */}
            <div className="w-full lg:w-1/3">
              <label className="block text-xs font-medium text-gray-700 mb-1">Sports / Activity Photo</label>
              
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
                <div className="border-2 border-emerald-400 rounded-lg p-3 bg-white relative h-[300px] flex flex-col items-center justify-center">
                  <img 
                    src={photoUrl} 
                    alt="Sports Activity Preview" 
                    className="w-full h-52 object-cover rounded shadow-sm mb-3"
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
                  className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center h-[300px] bg-white relative cursor-pointer transition-colors ${
                    isDragging ? 'border-emerald-500 bg-emerald-50/50' : 'border-gray-300 hover:border-emerald-500'
                  }`}
                >
                  <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">PHOTO</span>
                  <FaCloudUploadAlt className="text-gray-400 text-4xl mb-3" />
                  <div className="text-sm font-medium text-gray-700 text-center">
                    Drag & drop <span className="font-normal">or</span> <span className="text-emerald-600 underline font-semibold">browse</span>
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
              {saving ? 'Saving...' : 'Save Sports'}
            </button>
          </div>
        </div>
      </div>

      {/* All Sports Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FaListUl className="text-gray-800 text-lg" />
            <h2 className="text-sm font-bold text-gray-800">All Sports <span className="text-xs font-normal text-gray-500">({sports.length} total)</span></h2>
          </div>
          
          <div className="flex items-center gap-2">
            <button onClick={fetchSports} className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600 cursor-pointer" title="Refresh">
              <FaSyncAlt className={`text-xs text-blue-600 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
              <div className="relative border-r border-gray-200">
                <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-xs" />
                <input 
                  type="text" 
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search sports..." 
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
                <th className="px-4 py-3 font-semibold text-center w-24">PHOTO</th>
                <th className="px-4 py-3 font-semibold text-center">SPORTS NAME</th>
                <th className="px-4 py-3 font-semibold text-center">CATEGORY</th>
                <th className="px-4 py-3 font-semibold text-center">TYPE</th>
                <th className="px-4 py-3 font-semibold text-center">AMOUNT</th>
                <th className="px-4 py-3 font-semibold text-center">STATUS</th>
                <th className="px-4 py-3 font-semibold text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="px-4 py-8 text-center text-gray-500 text-sm bg-gray-50/20">
                    Loading sports from database...
                  </td>
                </tr>
              ) : filteredSports.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-4 py-8 text-center text-gray-500 text-sm bg-gray-50/20">
                    No sports found
                  </td>
                </tr>
              ) : (
                filteredSports.map((sport, index) => (
                  <tr key={sport._id || index} className="border-b border-gray-100 hover:bg-gray-50/50 transition">
                    <td className="px-4 py-4 text-center text-gray-600">{index + 1}</td>
                    <td className="px-4 py-4 text-center">
                      <div className="w-12 h-10 border border-gray-200 rounded flex flex-col items-center justify-center bg-gray-50 mx-auto text-[8px] text-gray-400 overflow-hidden">
                        {sport.photoUrl ? (
                          <img src={sport.photoUrl} alt="Sport" className="w-full h-full object-cover" />
                        ) : (
                          <FaImage className="text-gray-300 text-base" />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 font-bold text-gray-800 text-center">{sport.name || sport.title}</td>
                    <td className="px-4 py-4 text-center text-gray-600">{sport.category || 'Athletics'}</td>
                    <td className="px-4 py-4 text-center text-gray-600">
                      <span className="bg-blue-50 text-blue-700 text-[10px] font-semibold px-2 py-0.5 rounded border border-blue-200">
                        {sport.type || sport.sportType || 'Outdoor'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center text-gray-800 font-semibold">
                      ₹{sport.amount || 0}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        sport.status === 'Inactive' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {sport.status || 'Active'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <button 
                          onClick={() => setViewModalSport(sport)}
                          className="text-blue-500 hover:text-blue-700 cursor-pointer" 
                          title="View"
                        >
                          <FaEye />
                        </button>
                        <button 
                          onClick={() => handleEdit(sport)}
                          className="text-indigo-500 hover:text-indigo-700 cursor-pointer" 
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          onClick={() => handleDelete(sport._id)}
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
            Showing {filteredSports.length} of {sports.length} entries
          </div>
        </div>
      </div>

      {/* View Sport Modal */}
      {viewModalSport && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-[#f8f9fb] px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaTrophy className="text-amber-500" />
                <h3 className="font-bold text-gray-800 text-base">{viewModalSport.name || viewModalSport.title}</h3>
              </div>
              <button 
                onClick={() => setViewModalSport(null)}
                className="text-gray-400 hover:text-gray-600 p-1 text-base cursor-pointer"
              >
                <FaTimes />
              </button>
            </div>
            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {viewModalSport.photoUrl && (
                <img 
                  src={viewModalSport.photoUrl} 
                  alt="Sport Photo" 
                  className="w-full h-52 object-cover rounded-lg shadow-sm"
                />
              )}
              <div className="grid grid-cols-2 gap-3 text-xs border-b pb-3">
                <div>
                  <span className="text-gray-500 block">Category:</span>
                  <span className="font-semibold text-gray-800">{viewModalSport.category || 'Athletics'}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Type:</span>
                  <span className="font-semibold text-blue-600">{viewModalSport.type || viewModalSport.sportType || 'Outdoor'}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Amount:</span>
                  <span className="font-semibold text-gray-800">₹{viewModalSport.amount || 0}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Status:</span>
                  <span className="font-semibold text-green-600">{viewModalSport.status || 'Active'}</span>
                </div>
              </div>
              <div>
                <span className="text-xs text-gray-500 font-medium block mb-1">Instructions / Description:</span>
                <p className="text-gray-700 text-xs bg-gray-50 p-3 rounded leading-relaxed whitespace-pre-wrap">
                  {viewModalSport.instructions || viewModalSport.description || 'No instructions specified.'}
                </p>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-3 border-t flex justify-end">
              <button 
                onClick={() => setViewModalSport(null)}
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
