import React, { useState, useEffect } from 'react';
import { 
  FaLightbulb, FaCalendarAlt, FaQuoteLeft, FaListUl, FaEye, FaTrash
} from 'react-icons/fa';


const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function WebAdminWebsiteThoughts() {
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    author: '',
    thought: '',
    activationDate: '',
    deactivationDate: ''
  });
  
  const [status, setStatus] = useState(true);
  const [enableEndDate, setEnableEndDate] = useState(false);

  useEffect(() => {
    fetchThoughts();
  }, []);

  const fetchThoughts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/web-admin/website-thoughts`);
      const data = await res.json();
      if (data.success) {
        setThoughts(data.data);
      }
    } catch (err) {
      console.error('Error fetching thoughts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.author || !formData.thought || !formData.activationDate) {
      setError('Writer Name, Thought, and Activation Date are required');
      return;
    }
    
    setSubmitting(true);
    setError('');
    setSuccess('');
    
    try {
      const payload = {
        ...formData,
        deactivationDate: enableEndDate ? formData.deactivationDate : null,
        status: status ? 'Active' : 'Inactive'
      };
      
      const res = await fetch(`${API_BASE}/api/web-admin/website-thoughts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      if (data.success) {
        setSuccess('Thought added successfully!');
        handleReset();
        fetchThoughts();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Failed to add thought');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this thought?')) return;
    
    try {
      const res = await fetch(`${API_BASE}/api/web-admin/website-thoughts/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setSuccess('Thought deleted successfully!');
        fetchThoughts();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Failed to delete thought');
      }
    } catch (err) {
      setError('An error occurred while deleting.');
    }
  };

  const handleReset = () => {
    setFormData({
      author: '',
      thought: '',
      activationDate: '',
      deactivationDate: ''
    });
    setStatus(true);
    setEnableEndDate(false);
    setError('');
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#f4f5f7]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-[#1f2937]">Website Thoughts Management</h1>
        <div className="text-xs text-gray-500 font-medium">
          Home <span className="mx-1">&gt;</span> Website <span className="mx-1">&gt;</span> Manage Thoughts
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

      {/* Add New Thought Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <FaLightbulb className="text-yellow-500 text-sm" />
          <h2 className="text-sm font-bold text-gray-800">Add New Thought</h2>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Column - Form Fields */}
            <div className="flex-[3] flex flex-col gap-6">
              
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Writer Name <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    name="author"
                    placeholder="Enter Writer Name" 
                    value={formData.author}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" 
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Activation Date <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input type="date" name="activationDate" value={formData.activationDate} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Thought Quote <span className="text-red-500">*</span></label>
                <textarea 
                  name="thought"
                  rows="4" 
                  placeholder="Enter inspiring thought or quote..." 
                  value={formData.thought}
                  onChange={handleInputChange}
                  maxLength={500}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500 resize-y"
                ></textarea>
                <div className="text-right text-[10px] text-gray-400 mt-1">
                  {formData.thought.length}/500 characters
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Deactivation Date</label>
                  <div className="flex items-center gap-3">
                    <div className={`relative flex-1 ${!enableEndDate ? 'opacity-50' : ''}`}>
                      <input 
                        type="date" 
                        name="deactivationDate"
                        value={formData.deactivationDate}
                        onChange={handleInputChange}
                        disabled={!enableEndDate}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500 disabled:bg-gray-50" 
                      />
                    </div>
                    <label className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={enableEndDate}
                        onChange={(e) => setEnableEndDate(e.target.checked)}
                        className="w-3.5 h-3.5" 
                      /> 
                      Enable End Date
                    </label>
                  </div>
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

            {/* Right Column - Live Preview */}
            <div className="flex-[2] pt-6 lg:pt-0">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg h-[240px] p-6 text-white relative shadow-md flex flex-col justify-center">
                <div className="absolute top-4 left-4 flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider opacity-70">
                  <FaEye /> Live Preview
                </div>
                
                <FaQuoteLeft className="text-4xl text-white opacity-20 absolute top-12 left-6" />
                
                <div className="text-center italic font-medium px-8 relative z-10 text-[15px] leading-relaxed">
                  {formData.thought ? `"${formData.thought}"` : "Enter your thought to see preview..."}
                </div>
                
                <div className="absolute bottom-6 right-6 text-sm font-semibold opacity-90">
                  - {formData.author || "Unknown"}
                </div>
              </div>
            </div>

          </div>

          <div className="flex justify-end items-center gap-6 mt-8">
            <button className="text-gray-500 hover:text-gray-800 text-sm font-medium transition" onClick={handleReset}>Reset Form</button>
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-8 rounded transition disabled:opacity-50"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>

      {/* All Website Thoughts Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FaListUl className="text-green-600 text-lg" />
            <h2 className="text-sm font-bold text-gray-800">All Website Thoughts</h2>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <input type="text" placeholder="Search thoughts..." className="w-56 border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500" />
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="text-[10px] text-gray-500 uppercase bg-gray-50/50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 font-semibold text-center w-12">S.NO.</th>
                <th className="px-4 py-3 font-semibold text-center">WRITER NAME</th>
                <th className="px-4 py-3 font-semibold text-center w-64">THOUGHT QUOTE</th>
                <th className="px-4 py-3 font-semibold text-center">ACTIVATION DATE</th>
                <th className="px-4 py-3 font-semibold text-center">DEACTIVATION DATE</th>
                <th className="px-4 py-3 font-semibold text-center">STATUS</th>
                <th className="px-4 py-3 font-semibold text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-4 py-8 text-center text-gray-500 text-sm bg-gray-50/20">Loading...</td>
                </tr>
              ) : thoughts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-4 py-8 text-center text-gray-400 text-sm bg-gray-50/20">
                    <span className="text-xs">No thoughts found</span>
                  </td>
                </tr>
              ) : (
                thoughts.map((item, index) => (
                  <tr key={item._id} className="border-b border-gray-100 hover:bg-gray-50/50 transition">
                    <td className="px-4 py-4 text-center">{index + 1}</td>
                    <td className="px-4 py-4 text-center">{item.author}</td>
                    <td className="px-4 py-4 text-center w-64 truncate max-w-xs" title={item.thought}>{item.thought}</td>
                    <td className="px-4 py-4 text-center">{item.activationDate ? new Date(item.activationDate).toLocaleDateString() : '-'}</td>
                    <td className="px-4 py-4 text-center">{item.deactivationDate ? new Date(item.deactivationDate).toLocaleDateString() : '-'}</td>
                    <td className="px-4 py-4 text-center">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${item.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button 
                        onClick={() => handleDelete(item._id)}
                        className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-1.5 rounded transition"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
