import React, { useState, useEffect, useRef } from 'react';
import { 
  FaImage, FaCalendarAlt, FaCloudUploadAlt, FaListUl, FaInfoCircle, FaExclamationTriangle, FaArrowsAltV, FaCheckCircle, FaTrash
} from 'react-icons/fa';

export default function WebAdminLFDFlyer() {
  const [status, setStatus] = useState(true);
  const [flyers, setFlyers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    flyerName: '',
    displayOrder: '',
    activationDate: '',
    deactivationDate: '',
    attachment: ''
  });
  
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchFlyers();
  }, []);

  const fetchFlyers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/web-admin/lfd/flyers');
      const data = await res.json();
      if (data.success) {
        setFlyers(data.data);
      }
    } catch (err) {
      console.error('Error fetching flyers:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, attachment: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.flyerName || !formData.activationDate || !formData.deactivationDate || !formData.attachment) {
      setError('Please fill all required fields');
      return;
    }
    
    setSubmitting(true);
    setError('');
    setSuccess('');
    
    try {
      const payload = {
        ...formData,
        status: status ? 'Active' : 'Inactive'
      };
      
      const res = await fetch('/api/web-admin/lfd/flyers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      if (data.success) {
        setSuccess('Flyer added successfully!');
        setFormData({ flyerName: '', displayOrder: '', activationDate: '', deactivationDate: '', attachment: '' });
        if (fileInputRef.current) fileInputRef.current.value = '';
        fetchFlyers();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Failed to add flyer');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this flyer?')) return;
    
    try {
      const res = await fetch(`/api/web-admin/lfd/flyers/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setSuccess('Flyer deleted successfully!');
        fetchFlyers();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Failed to delete flyer');
      }
    } catch (err) {
      setError('An error occurred while deleting.');
    }
  };

  const handleReset = () => {
    setFormData({ flyerName: '', displayOrder: '', activationDate: '', deactivationDate: '', attachment: '' });
    setStatus(true);
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#f4f5f7]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-[#1f2937]">LFD Flyer Management</h1>
        <div className="text-xs text-gray-500 font-medium">
          Home <span className="mx-1">&gt;</span> Website <span className="mx-1">&gt;</span> LFD <span className="mx-1">&gt;</span> LFD Flyer
        </div>
      </div>

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Add LFD Flyer Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <FaImage className="text-gray-800 text-sm" />
          <h2 className="text-sm font-bold text-gray-800">Add LFD Flyer</h2>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Left Column - Form Fields */}
            <div className="flex-1 flex flex-col gap-5">
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Activation Date <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input type="date" name="activationDate" value={formData.activationDate} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Deactivation Date <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input type="date" name="deactivationDate" value={formData.deactivationDate} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Flyer Name <span className="text-red-500">*</span></label>
                <input type="text" name="flyerName" value={formData.flyerName} onChange={handleInputChange} placeholder="Enter Flyer Name" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Display Order <span className="text-red-500">*</span></label>
                  <input type="number" name="displayOrder" value={formData.displayOrder} onChange={handleInputChange} placeholder="1-100" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-2">Status</label>
                  <div className="flex items-center gap-3">
                    <div 
                      className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${status ? 'bg-blue-500' : 'bg-gray-300'}`}
                      onClick={() => setStatus(!status)}
                    >
                      <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${status ? 'translate-x-5' : ''}`}></div>
                    </div>
                    {status && <span className="bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Active</span>}
                    {!status && <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Inactive</span>}
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column - Image & Guidelines */}
            <div className="w-full lg:w-[350px] flex flex-col gap-4">
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Flyer Image <span className="text-red-500">*</span></label>
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-white relative h-[140px] cursor-pointer hover:bg-gray-50"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                  <span className="absolute top-3 left-3 bg-blue-500 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">FLYER</span>
                  
                  {formData.attachment ? (
                    <div className="text-center">
                      <FaCheckCircle className="text-green-500 text-2xl mb-2 mx-auto" />
                      <div className="text-xs font-medium text-green-700">Image Selected</div>
                    </div>
                  ) : (
                    <>
                      <FaCloudUploadAlt className="text-gray-600 text-2xl mb-2" />
                      <div className="text-xs font-medium text-gray-700">Click to <span className="text-blue-500">browse</span></div>
                      <div className="text-[10px] text-gray-400 mt-1">JPG • JPEG • PNG | Max 50MB</div>
                    </>
                  )}
                </div>
              </div>

              <div className="bg-[#f8f9fa] border border-gray-200 rounded-lg p-5">
                <div className="flex items-center gap-2 mb-3">
                  <FaInfoCircle className="text-gray-500 text-sm" />
                  <h3 className="text-sm font-semibold text-gray-700">Flyer Guidelines</h3>
                </div>
                
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-start gap-3">
                    <FaImage className="text-blue-500 text-sm mt-0.5" />
                    <p className="text-[11px] text-gray-600">Recommended size: 1080 x 1920 pixels</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaExclamationTriangle className="text-yellow-500 text-sm mt-0.5" />
                    <p className="text-[11px] text-gray-600">Maximum file size: 50MB</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="text-green-500 text-sm mt-0.5" />
                    <p className="text-[11px] text-gray-600">Supported formats: JPG, JPEG, PNG</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaArrowsAltV className="text-blue-400 text-sm mt-0.5" />
                    <p className="text-[11px] text-gray-600">Display order: 1-100 (lower shows first)</p>
                  </div>
                </div>
              </div>

            </div>

          </div>

          <div className="flex justify-end items-center gap-4 mt-6 pt-4">
            <button className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium py-2 px-6 rounded transition" onClick={handleReset}>Reset</button>
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-6 rounded transition disabled:opacity-50"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>

      {/* All LFD Flyers Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FaListUl className="text-gray-800 text-lg" />
            <h2 className="text-sm font-bold text-gray-800">All LFD Flyers</h2>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <input type="text" placeholder="Search flyers..." className="w-64 border border-gray-300 rounded px-3 py-1.5 pl-3 text-xs text-gray-600 outline-none focus:border-blue-500" />
            </div>
            <select className="border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-600 outline-none">
              <option>10</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[11px] text-gray-600 uppercase bg-gray-50/50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 font-semibold text-center w-16">S.NO.</th>
                <th className="px-4 py-3 font-semibold text-center">FLYER NAME</th>
                <th className="px-4 py-3 font-semibold text-center">ACTIVATION DATE</th>
                <th className="px-4 py-3 font-semibold text-center">DEACTIVATION DATE</th>
                <th className="px-4 py-3 font-semibold text-center">ORDER</th>
                <th className="px-4 py-3 font-semibold text-center">ATTACHMENT</th>
                <th className="px-4 py-3 font-semibold text-center">STATUS</th>
                <th className="px-4 py-3 font-semibold text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="px-4 py-8 text-center text-gray-500 text-sm bg-gray-50/20">Loading...</td>
                </tr>
              ) : flyers.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-4 py-8 text-center text-gray-500 text-sm bg-gray-50/20">No LFD flyers found</td>
                </tr>
              ) : (
                flyers.map((flyer, index) => (
                  <tr key={flyer._id} className="border-b border-gray-100 hover:bg-gray-50/50 transition">
                    <td className="px-4 py-3 text-center">{index + 1}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">{flyer.flyerName}</td>
                    <td className="px-4 py-3 text-center">{new Date(flyer.activationDate).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-center">{new Date(flyer.deactivationDate).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-center">{flyer.displayOrder}</td>
                    <td className="px-4 py-3 text-center">
                      {flyer.attachment ? (
                        <div className="w-8 h-8 rounded border border-gray-200 overflow-hidden mx-auto bg-gray-50">
                          <img src={flyer.attachment} alt="attachment" className="w-full h-full object-cover" />
                        </div>
                      ) : '-'}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${flyer.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {flyer.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button 
                        onClick={() => handleDelete(flyer._id)}
                        className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-1.5 rounded transition"
                      >
                        <FaTrash className="text-xs" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="text-center text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-4">
        COPYRIGHT © 2017 FRANCISCAN.
      </div>
    </div>
  );
}
