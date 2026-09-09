import React, { useState, useEffect, useRef } from 'react';
import { 
  FaBookOpen, FaCalendarAlt, FaCloudUploadAlt, FaListUl, FaTrash
} from 'react-icons/fa';

export default function WebAdminMagazine() {
  const [status, setStatus] = useState(true);
  const [magazines, setMagazines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    session: '',
    publishDate: '',
    attachment: ''
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchMagazines();
  }, []);

  const fetchMagazines = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/web-admin/magazine`);
      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }
      const data = await res.json();
      if (data.success) {
        setMagazines(data.data || []);
      }
    } catch (err) {
      console.error('Error fetching magazines:', err);
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
    if (!formData.title || !formData.publishDate || !formData.attachment) {
      setError('Please fill all required fields and upload a PDF');
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
      
      const res = await fetch(`${API_BASE}/api/web-admin/magazine`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      if (data.success) {
        setSuccess('Magazine added successfully!');
        handleReset();
        fetchMagazines();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Failed to add magazine');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this magazine?')) return;
    
    try {
      const res = await fetch(`${API_BASE}/api/web-admin/magazine/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setSuccess('Magazine deleted successfully!');
        fetchMagazines();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Failed to delete magazine');
      }
    } catch (err) {
      setError('An error occurred while deleting.');
    }
  };

  const handleReset = () => {
    setFormData({ title: '', session: '', publishDate: '', attachment: '' });
    setStatus(true);
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#f4f5f7]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-[#1f2937]">E-Magazine Management</h1>
        <div className="text-xs text-gray-500 font-medium">
          Home <span className="mx-1">&gt;</span> Website <span className="mx-1">&gt;</span> E-Magazine
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

      {/* Add E-Magazine/Newsletter Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <FaBookOpen className="text-gray-800 text-sm" />
          <h2 className="text-sm font-bold text-gray-800">Add E-Magazine/Newsletter</h2>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Left Column - Form Fields */}
            <div className="flex-1 flex flex-col gap-6">
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Magazine Name <span className="text-red-500">*</span></label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Enter Magazine Name" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Session</label>
                  <div className="flex gap-2">
                    <select name="session" value={formData.session} onChange={handleInputChange} className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500 bg-white">
                      <option value="">Select Session</option>
                      <option value="2024-2025">2024-2025</option>
                      <option value="2023-2024">2023-2024</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Publish Date <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input type="date" name="publishDate" value={formData.publishDate} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
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
                  {status && <span className="bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Active</span>}
                  {!status && <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Inactive</span>}
                </div>
              </div>

            </div>

            {/* Right Column - PDF Upload */}
            <div className="w-full lg:w-[400px]">
              <label className="block text-xs font-medium text-gray-700 mb-1">Upload PDF File <span className="text-red-500">*</span></label>
              <div 
                className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center relative h-[180px] cursor-pointer transition ${formData.attachment ? 'border-green-400 bg-green-50' : 'border-gray-300 bg-white hover:bg-gray-50'}`}
                onClick={() => fileInputRef.current?.click()}
              >
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="application/pdf" />
                <span className="absolute top-3 left-3 bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">PDF</span>
                
                {formData.attachment ? (
                  <>
                    <FaBookOpen className="text-green-500 text-3xl mb-2" />
                    <div className="text-xs font-medium text-green-700">PDF Document Selected</div>
                    <div className="text-[10px] text-green-600 mt-1">Click to replace</div>
                  </>
                ) : (
                  <>
                    <FaCloudUploadAlt className="text-gray-400 text-3xl mb-2" />
                    <div className="text-xs font-medium text-gray-600">Click to upload PDF</div>
                    <div className="text-[10px] text-gray-400 mt-1">Max 50MB</div>
                  </>
                )}
              </div>
            </div>

          </div>

          <div className="flex justify-end items-center gap-4 mt-8 pt-4">
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

      {/* All E-Magazines/Newsletters Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FaListUl className="text-gray-800 text-lg" />
            <h2 className="text-sm font-bold text-gray-800">All E-Magazines/Newsletters</h2>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <input type="text" placeholder="Search magazines..." className="w-64 border border-gray-300 rounded px-3 py-1.5 pl-3 text-xs text-gray-600 outline-none focus:border-blue-500" />
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
                <th className="px-4 py-3 font-semibold text-center">MAGAZINE NAME</th>
                <th className="px-4 py-3 font-semibold text-center">SESSION</th>
                <th className="px-4 py-3 font-semibold text-center">PUBLISH DATE</th>
                <th className="px-4 py-3 font-semibold text-center">STATUS</th>
                <th className="px-4 py-3 font-semibold text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center text-gray-500 text-sm bg-gray-50/20">Loading...</td>
                </tr>
              ) : magazines.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center text-gray-500 text-sm bg-gray-50/20">No magazines found</td>
                </tr>
              ) : (
                magazines.map((mag, index) => (
                  <tr key={mag._id} className="border-b border-gray-100 hover:bg-gray-50/50 transition">
                    <td className="px-4 py-3 text-center">{index + 1}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">{mag.title}</td>
                    <td className="px-4 py-3 text-center">{mag.session || '-'}</td>
                    <td className="px-4 py-3 text-center">{new Date(mag.publishDate).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${mag.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {mag.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button 
                        onClick={() => handleDelete(mag._id)}
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
