import React, { useState, useEffect, useRef } from 'react';
import { 
  FaImage, FaCloudUploadAlt, FaListUl, FaTrash
} from 'react-icons/fa';

export default function WebAdminHomepageSlider() {
  const [status, setStatus] = useState(true);
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    displayOrder: '',
    image: ''
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/web-admin/slider');
      const data = await res.json();
      if (data.success) {
        setSliders(data.data);
      }
    } catch (err) {
      console.error('Error fetching sliders:', err);
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
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.image) {
      setError('Please provide a title and upload an image');
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
      
      const res = await fetch('/api/web-admin/slider', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      if (data.success) {
        setSuccess('Slider added successfully!');
        handleReset();
        fetchSliders();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Failed to add slider');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this slider?')) return;
    
    try {
      const res = await fetch(`/api/web-admin/slider/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setSuccess('Slider deleted successfully!');
        fetchSliders();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Failed to delete slider');
      }
    } catch (err) {
      setError('An error occurred while deleting.');
    }
  };

  const handleReset = () => {
    setFormData({ title: '', displayOrder: '', image: '' });
    setStatus(true);
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#f4f5f7]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-[#1f2937]">Homepage Slider Management</h1>
        <div className="text-xs text-gray-500 font-medium">
          Home <span className="mx-1">&gt;</span> Website <span className="mx-1">&gt;</span> Homepage Slider
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

      {/* Add Slider Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <FaImage className="text-gray-800 text-sm" />
          <h2 className="text-sm font-bold text-gray-800">Add Slider</h2>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Left Column - Form Fields */}
            <div className="flex-1 flex flex-col gap-6">
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-[2]">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Slider Title <span className="text-red-500">*</span></label>
                  <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Enter Slider Title" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Order No.</label>
                  <input type="number" name="displayOrder" value={formData.displayOrder} onChange={handleInputChange} placeholder="e.g. 1" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-[2]">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Image Size</label>
                  <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500 bg-white">
                    <option>1500 x 650 (Standard)</option>
                  </select>
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

            {/* Right Column - Image Upload */}
            <div className="w-full lg:w-[400px]">
              <label className="block text-xs font-medium text-gray-700 mb-1">Slider Image <span className="text-red-500">*</span></label>
              <div 
                className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center relative h-[160px] cursor-pointer transition ${formData.image ? 'border-green-400 bg-green-50' : 'border-gray-300 bg-white hover:bg-gray-50'}`}
                onClick={() => fileInputRef.current?.click()}
              >
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                {formData.image ? (
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover rounded" />
                ) : (
                  <>
                    <span className="absolute top-3 left-3 bg-purple-500 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">IMAGE</span>
                    <FaCloudUploadAlt className="text-gray-600 text-2xl mb-2" />
                    <div className="text-xs font-medium text-gray-700">Drag & drop <span className="font-normal">or</span> <span className="text-blue-500">browse</span></div>
                    <div className="text-[10px] text-gray-400 mt-1">JPG • JPEG • PNG | Max 5MB</div>
                    <div className="text-[10px] text-blue-500 font-medium mt-1">Recommended: 1500 x 650</div>
                  </>
                )}
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

      {/* All Homepage Sliders Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FaListUl className="text-gray-800 text-lg" />
            <h2 className="text-sm font-bold text-gray-800">All Homepage Sliders</h2>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <input type="text" placeholder="Search sliders..." className="w-48 border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500" />
            </div>
            <select className="border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-600 outline-none">
              <option>10</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[10px] text-gray-600 uppercase bg-gray-50/50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 font-semibold text-center w-16">S.NO.</th>
                <th className="px-4 py-3 font-semibold text-center w-32">ORDER NO.</th>
                <th className="px-4 py-3 font-semibold text-center">TITLE</th>
                <th className="px-4 py-3 font-semibold text-center">PREVIEW</th>
                <th className="px-4 py-3 font-semibold text-center">STATUS</th>
                <th className="px-4 py-3 font-semibold text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center text-gray-500 text-sm bg-gray-50/20">Loading...</td>
                </tr>
              ) : sliders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center text-gray-500 text-sm bg-gray-50/20">No sliders found</td>
                </tr>
              ) : (
                sliders.map((slider, index) => (
                  <tr key={slider._id} className="border-b border-gray-100 hover:bg-gray-50/50 transition">
                    <td className="px-4 py-6 text-center text-gray-600">{index + 1}</td>
                    <td className="px-4 py-6 text-center">
                      <span className="w-16 border border-gray-300 rounded px-2 py-1 text-center text-xs text-gray-600 bg-gray-50 inline-block">{slider.displayOrder}</span>
                    </td>
                    <td className="px-4 py-6 text-center text-gray-600 text-xs font-medium">{slider.title}</td>
                    <td className="px-4 py-6 text-center">
                      <img src={slider.image} alt={slider.title} className="w-24 h-12 object-cover rounded mx-auto border border-gray-200" />
                    </td>
                    <td className="px-4 py-6 text-center">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${slider.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {slider.status}
                      </span>
                    </td>
                    <td className="px-4 py-6 text-center">
                      <button 
                        onClick={() => handleDelete(slider._id)}
                        className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2 rounded transition"
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
