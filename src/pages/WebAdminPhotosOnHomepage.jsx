import React, { useState, useEffect, useRef } from 'react';
import { 
  FaImage, FaImages, FaTrash, FaCloudUploadAlt, FaEye
} from 'react-icons/fa';

export default function WebAdminPhotosOnHomepage() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    displayOrder: '',
    photo: ''
  });
  const [status, setStatus] = useState(true);

  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/web-admin/photos-homepage');
      const data = await res.json();
      if (data.success) {
        setPhotos(data.data);
      }
    } catch (err) {
      console.error('Error fetching photos:', err);
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
        setFormData({ ...formData, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.photo) {
      setError('Title and Photo are required');
      return;
    }
    
    setSubmitting(true);
    setError('');
    setSuccess('');
    
    try {
      const payload = {
        ...formData,
        displayOrder: formData.displayOrder ? parseInt(formData.displayOrder) : 0,
        status: status ? 'Active' : 'Inactive'
      };
      
      const res = await fetch('/api/web-admin/photos-homepage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      if (data.success) {
        setSuccess('Photo added successfully!');
        handleReset();
        fetchPhotos();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Failed to add photo');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
      const res = await fetch(`/api/web-admin/photos-homepage/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        fetchPhotos();
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this photo?')) return;
    
    try {
      const res = await fetch(`/api/web-admin/photos-homepage/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setSuccess('Photo deleted successfully!');
        fetchPhotos();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Failed to delete photo');
      }
    } catch (err) {
      setError('An error occurred while deleting.');
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      displayOrder: '',
      photo: ''
    });
    setStatus(true);
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#f4f5f7]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-[#1f2937]">Gallery Management</h1>
        <div className="text-xs text-gray-500 font-medium">
          Home <span className="mx-1">&gt;</span> Website <span className="mx-1">&gt;</span> Gallery <span className="mx-1">&gt;</span> Show Photos on Homepage
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

      {/* Add Photo Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <FaImage className="text-blue-600 text-sm" />
            <h2 className="text-sm font-bold text-gray-800">Add Photo to Homepage</h2>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 flex flex-col gap-5">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Title <span className="text-red-500">*</span></label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Enter Photo Title" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Display Order</label>
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
            
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-700 mb-1">Upload Image <span className="text-red-500">*</span></label>
              <div 
                className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center relative h-[140px] cursor-pointer transition ${formData.photo ? 'border-green-400 bg-green-50' : 'border-gray-300 bg-white hover:bg-gray-50'}`}
                onClick={() => fileInputRef.current?.click()}
              >
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                {formData.photo ? (
                  <img src={formData.photo} alt="Preview" className="h-full object-contain" />
                ) : (
                  <>
                    <FaCloudUploadAlt className="text-gray-600 text-3xl mb-2" />
                    <div className="text-xs font-medium text-gray-700">Drag & drop <span className="font-normal">or</span> <span className="text-blue-500">browse</span></div>
                    <div className="text-[10px] text-gray-500 mt-1">Max 2MB | JPG, PNG</div>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end items-center gap-4 mt-6 pt-4 border-t border-gray-100">
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

      {/* Photo Gallery Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8 overflow-hidden">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FaImages className="text-green-600 text-sm" />
            <h2 className="text-sm font-bold text-gray-800">Photo Gallery</h2>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="bg-gray-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
              {photos.length} Photos
            </div>
            <div className="bg-[#8cc63f] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
              {photos.filter(p => p.status === 'Active').length} Active
            </div>
          </div>
        </div>
        
        <div className="p-6">
          {loading ? (
            <div className="text-center py-10 text-gray-500 text-sm">Loading photos...</div>
          ) : photos.length === 0 ? (
            <div className="text-center py-10 text-gray-400 text-sm">No photos found for homepage</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-4">
              {photos.map((photo) => (
                <div key={photo._id} className="border border-gray-200 rounded-lg overflow-hidden bg-white flex flex-col h-full shadow-sm">
                  <div className="aspect-[4/3] w-full bg-gray-100 relative group overflow-hidden">
                    {photo.photo ? (
                      <img src={photo.photo} alt={photo.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                    )}
                    <button 
                      onClick={() => handleDelete(photo._id)}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition shadow"
                    >
                      <FaTrash className="text-xs" />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs px-2 py-1 truncate">
                      {photo.title}
                    </div>
                  </div>
                  <div className="p-3 border-t border-gray-100 bg-white flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div 
                        className={`w-8 h-4 rounded-full relative cursor-pointer transition-colors ${photo.status === 'Active' ? 'bg-blue-500' : 'bg-gray-300'}`}
                        onClick={() => handleToggleStatus(photo._id, photo.status)}
                      >
                        <div className={`absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-white transition-transform ${photo.status === 'Active' ? 'translate-x-4' : ''}`}></div>
                      </div>
                      <span className="text-[10px] font-medium text-gray-600">Active on Homepage</span>
                    </div>
                    {photo.displayOrder > 0 && (
                      <span className="bg-gray-100 text-gray-600 text-[10px] px-1.5 rounded font-medium">#{photo.displayOrder}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}

