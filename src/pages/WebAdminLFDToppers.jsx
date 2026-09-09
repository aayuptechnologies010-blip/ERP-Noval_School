import React, { useState, useEffect, useRef } from 'react';
import { 
  FaMedal, FaListUl, FaInfoCircle, FaUserGraduate, FaUser, FaArrowsAltV, FaRibbon, FaTrash, FaCheckCircle, FaCloudUploadAlt
} from 'react-icons/fa';

export default function WebAdminLFDToppers() {
  const [status, setStatus] = useState(true);
  const [toppers, setToppers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    academicYear: '',
    studentClass: '',
    studentName: '',
    displayOrder: '',
    description: '',
    studentPhoto: ''
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchToppers();
  }, []);

  const fetchToppers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/web-admin/lfd/toppers`);
      const data = await res.json();
      if (data.success) {
        setToppers(data.data);
      }
    } catch (err) {
      console.error('Error fetching toppers:', err);
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
        setFormData({ ...formData, studentPhoto: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.studentName || !formData.studentClass || !formData.description) {
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
      
      const res = await fetch(`${API_BASE}/api/web-admin/lfd/toppers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      if (data.success) {
        setSuccess('Topper added successfully!');
        handleReset();
        fetchToppers();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Failed to add topper');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this topper?')) return;
    
    try {
      const res = await fetch(`${API_BASE}/api/web-admin/lfd/toppers/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setSuccess('Topper deleted successfully!');
        fetchToppers();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Failed to delete topper');
      }
    } catch (err) {
      setError('An error occurred while deleting.');
    }
  };

  const handleReset = () => {
    setFormData({ academicYear: '', studentClass: '', studentName: '', displayOrder: '', description: '', studentPhoto: '' });
    setStatus(true);
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#f4f5f7]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-[#1f2937]">LFD Toppers Management</h1>
        <div className="text-xs text-gray-500 font-medium">
          Home <span className="mx-1">&gt;</span> Website <span className="mx-1">&gt;</span> LFD <span className="mx-1">&gt;</span> Toppers
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

      {/* Add LFD Topper Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <FaMedal className="text-gray-800 text-sm" />
          <h2 className="text-sm font-bold text-gray-800">Add LFD Topper</h2>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Left Column - Form Fields */}
            <div className="flex-1 flex flex-col gap-5">
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Academic Year</label>
                  <select name="academicYear" value={formData.academicYear} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500 bg-white">
                    <option value="">Select Year</option>
                    <option value="2024-2025">2024-2025</option>
                    <option value="2023-2024">2023-2024</option>
                  </select>
                </div>
                
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Class <span className="text-red-500">*</span></label>
                  <input type="text" name="studentClass" value={formData.studentClass} onChange={handleInputChange} placeholder="e.g. Class XII" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-[2]">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Student Name <span className="text-red-500">*</span></label>
                  <input type="text" name="studentName" value={formData.studentName} onChange={handleInputChange} placeholder="Enter Student Name" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
                </div>
                <div className="flex-[1]">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Display Order</label>
                  <input type="number" name="displayOrder" value={formData.displayOrder} onChange={handleInputChange} placeholder="1-100" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Achievement Description <span className="text-red-500">*</span></label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} rows="4" placeholder="Enter topper achievement details" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500 resize-y"></textarea>
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

            {/* Right Column - Photo preview & Guidelines */}
            <div className="w-full lg:w-[320px] flex flex-col gap-4">
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1 text-center">Student Photo</label>
                <div className="flex justify-center">
                  <div 
                    className="w-[120px] h-[140px] bg-gray-100 border border-gray-200 rounded flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-200 overflow-hidden relative"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                    {formData.studentPhoto ? (
                      <img src={formData.studentPhoto} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <FaCloudUploadAlt className="text-3xl mb-2 text-gray-400" />
                        <span className="text-[10px] font-medium text-center">Upload<br/>Photo</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-[#f8f9fa] border border-gray-200 rounded-lg p-5 mt-2">
                <div className="flex items-center gap-2 mb-3">
                  <FaInfoCircle className="text-gray-500 text-sm" />
                  <h3 className="text-sm font-semibold text-gray-700">Topper Guidelines</h3>
                </div>
                
                <div className="flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <FaUserGraduate className="text-blue-500 text-sm mt-0.5" />
                    <p className="text-[11px] text-gray-600">Select academic year and class for the topper</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaUser className="text-green-500 text-sm mt-0.5" />
                    <p className="text-[11px] text-gray-600">Choose student from the selected class</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaArrowsAltV className="text-blue-400 text-sm mt-0.5" />
                    <p className="text-[11px] text-gray-600">Set display order (1-100, lower shows first)</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaRibbon className="text-yellow-500 text-sm mt-0.5" />
                    <p className="text-[11px] text-gray-600">Provide achievement description details</p>
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

      {/* All LFD Toppers Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FaListUl className="text-gray-800 text-lg" />
            <h2 className="text-sm font-bold text-gray-800">All LFD Toppers</h2>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <input type="text" placeholder="Search toppers..." className="w-64 border border-gray-300 rounded px-3 py-1.5 pl-3 text-xs text-gray-600 outline-none focus:border-blue-500" />
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
                <th className="px-4 py-3 font-semibold text-center">PHOTO</th>
                <th className="px-4 py-3 font-semibold text-center">ACADEMIC YEAR</th>
                <th className="px-4 py-3 font-semibold text-center">CLASS</th>
                <th className="px-4 py-3 font-semibold text-center">STUDENT NAME</th>
                <th className="px-4 py-3 font-semibold text-center">ORDER</th>
                <th className="px-4 py-3 font-semibold text-center">STATUS</th>
                <th className="px-4 py-3 font-semibold text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="px-4 py-8 text-center text-gray-500 text-sm bg-gray-50/20">Loading...</td>
                </tr>
              ) : toppers.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-4 py-8 text-center text-gray-500 text-sm bg-gray-50/20">No LFD toppers found</td>
                </tr>
              ) : (
                toppers.map((topper, index) => (
                  <tr key={topper._id} className="border-b border-gray-100 hover:bg-gray-50/50 transition">
                    <td className="px-4 py-3 text-center">{index + 1}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="w-8 h-10 rounded border border-gray-200 overflow-hidden mx-auto bg-gray-50">
                        {topper.studentPhoto ? (
                          <img src={topper.studentPhoto} alt={topper.studentName} className="w-full h-full object-cover" />
                        ) : (
                          <FaUser className="text-gray-400 w-full h-full p-2" />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">{topper.academicYear || '-'}</td>
                    <td className="px-4 py-3 text-center">{topper.studentClass}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">{topper.studentName}</td>
                    <td className="px-4 py-3 text-center">{topper.displayOrder}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${topper.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {topper.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button 
                        onClick={() => handleDelete(topper._id)}
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
