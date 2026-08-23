import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSave, FaImage } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function CreateAlbum() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    eventDate: '',
    totalMemories: 0,
    isActive: true
  });

  const [coverImage, setCoverImage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      
      const payload = new FormData();
      payload.append('data', JSON.stringify(formData));
      
      if (coverImage) {
        payload.append('coverImage', coverImage);
      }

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/albums`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: payload
      });

      if (response.ok) {
        toast.success("Album created successfully!");
        navigate('/dashboard/photos');
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to create album.");
      }
    } catch (error) {
      console.error("Error creating album:", error);
      toast.error("An error occurred while creating album.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-gray-50 rounded-tl-3xl p-8 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-blue-900">Create Album</h1>
        <button 
          onClick={() => navigate('/dashboard/photos')}
          className="flex items-center gap-2 bg-white px-4 py-2 rounded shadow-sm text-sm font-semibold text-gray-600 hover:bg-gray-100"
        >
          <FaArrowLeft /> Go Back
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 max-w-3xl mx-auto">
        <form onSubmit={handleSubmit}>
          
          {/* Image Upload Area */}
          <div className="flex flex-col items-center mb-8 p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
            <div className="w-48 h-32 bg-gray-200 flex flex-col items-center justify-center text-gray-400 mb-4 overflow-hidden rounded shadow-sm">
              {coverImage ? (
                <img src={URL.createObjectURL(coverImage)} alt="Album Cover" className="w-full h-full object-cover" />
              ) : (
                <>
                  <FaImage className="text-4xl mb-2" />
                  <span className="text-sm font-medium">Cover Image</span>
                </>
              )}
            </div>
            <label className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded text-sm cursor-pointer font-medium transition-colors">
              Choose File
              <input type="file" onChange={handleFileChange} className="hidden" accept="image/*" />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Album Title <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g. Prize Distribution"
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Event Date <span className="text-red-500">*</span></label>
              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Total Memories</label>
              <input
                type="number"
                name="totalMemories"
                value={formData.totalMemories}
                onChange={handleChange}
                min="0"
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center h-full pt-6">
              <label className="flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm font-medium text-gray-700">Is Active</span>
              </label>
            </div>
          </div>

          <div className="mt-8 flex justify-end border-t pt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-bold text-sm shadow-md transition-all disabled:opacity-50"
            >
              <FaSave className="text-lg" />
              {loading ? 'Creating Album...' : 'Create Album'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
