import React, { useState, useEffect, useRef } from 'react';
import { 
  FaTrophy, FaListUl, FaUser, FaTrash, FaCloudUploadAlt
} from 'react-icons/fa';

export default function WebAdminWebsiteToppers() {
  const [status, setStatus] = useState(true);
  const [toppers, setToppers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    academicYear: '',
    className: '',
    studentName: '',
    showIn: 'Class X',
    percentage: '',
    stream: '',
    displayOrder: '',
    photo: ''
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchToppers();
  }, []);

  const fetchToppers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/web-admin/website-toppers`);
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
        setFormData({ ...formData, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.academicYear || !formData.className || !formData.studentName || !formData.percentage) {
      setError('Academic Year, Class, Student Name, and Percentage are required');
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
      
      const res = await fetch(`${API_BASE}/api/web-admin/website-toppers`, {
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
      const res = await fetch(`${API_BASE}/api/web-admin/website-toppers/${id}`, {
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
    setFormData({
      academicYear: '',
      className: '',
      studentName: '',
      showIn: 'Class X',
      percentage: '',
      stream: '',
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
        <h1 className="text-xl font-bold text-[#1f2937]">Website Toppers Management</h1>
        <div className="text-xs text-gray-500 font-medium">
          Home <span className="mx-1">&gt;</span> Website <span className="mx-1">&gt;</span> Toppers
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

      {/* Add Website Topper Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <FaTrophy className="text-gray-800 text-sm" />
          <h2 className="text-sm font-bold text-gray-800">Add Website Topper</h2>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-10">
            
            {/* Left Column - Form Fields */}
            <div className="flex-[2] flex flex-col gap-5">
              
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Academic Year <span className="text-red-500">*</span></label>
                  <input type="text" name="academicYear" value={formData.academicYear} onChange={handleInputChange} placeholder="e.g. 2023-2024" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500 bg-white" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Class <span className="text-red-500">*</span></label>
                  <input type="text" name="className" value={formData.className} onChange={handleInputChange} placeholder="e.g. Class 10" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500 bg-white" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Student Name <span className="text-red-500">*</span></label>
                  <input type="text" name="studentName" value={formData.studentName} onChange={handleInputChange} placeholder="Enter Student Name" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500 bg-white" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Show In</label>
                  <select name="showIn" value={formData.showIn} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500 bg-white">
                    <option value="Class X">Class X</option>
                    <option value="Class XII">Class XII</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Percentage <span className="text-red-500">*</span></label>
                  <input type="text" name="percentage" value={formData.percentage} onChange={handleInputChange} placeholder="Enter Percentage (%)" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Stream</label>
                  <input type="text" name="stream" value={formData.stream} onChange={handleInputChange} placeholder="Enter Stream" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
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

            {/* Right Column - Photo preview */}
            <div className="flex-1 flex flex-col pt-2">
              <label className="block text-xs font-medium text-gray-700 mb-2">Student Photo</label>
              <div 
                className={`bg-white border-2 border-dashed rounded-lg shadow-sm p-4 inline-block w-[180px] h-[180px] relative flex flex-col items-center justify-center cursor-pointer transition ${formData.photo ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:bg-gray-50'}`}
                onClick={() => fileInputRef.current?.click()}
              >
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                {formData.photo ? (
                  <img src={formData.photo} alt="Student Preview" className="w-full h-full object-cover rounded" />
                ) : (
                  <>
                    <div className="w-16 h-16 bg-gray-200 rounded-full mb-2 flex items-center justify-center overflow-hidden">
                      <FaUser className="text-gray-400 text-3xl mt-2" />
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-blue-500 font-medium">Upload Photo</div>
                    </div>
                  </>
                )}
              </div>
              <p className="text-[10px] text-gray-400 italic mt-3 max-w-[200px]">
                Click to upload student photo (JPG, PNG). Max size 2MB.
              </p>
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

      {/* All Website Toppers Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FaListUl className="text-gray-800 text-lg" />
            <h2 className="text-sm font-bold text-gray-800">All Website Toppers</h2>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <input type="text" placeholder="Search toppers..." className="w-64 border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500" />
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="text-[10px] text-gray-500 uppercase bg-gray-50/50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 font-semibold text-center w-12">S.NO.</th>
                <th className="px-4 py-3 font-semibold text-center">ACADEMIC YEAR</th>
                <th className="px-4 py-3 font-semibold text-center">CLASS</th>
                <th className="px-4 py-3 font-semibold text-center">STUDENT NAME</th>
                <th className="px-4 py-3 font-semibold text-center">PHOTO</th>
                <th className="px-4 py-3 font-semibold text-center">PERCENTAGE</th>
                <th className="px-4 py-3 font-semibold text-center">STREAM</th>
                <th className="px-4 py-3 font-semibold text-center">DISPLAY ORDER</th>
                <th className="px-4 py-3 font-semibold text-center">SHOW IN</th>
                <th className="px-4 py-3 font-semibold text-center">STATUS</th>
                <th className="px-4 py-3 font-semibold text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="11" className="px-4 py-8 text-center text-gray-500 text-sm bg-gray-50/20">Loading...</td>
                </tr>
              ) : toppers.length === 0 ? (
                <tr>
                  <td colSpan="11" className="px-4 py-8 text-center text-gray-400 text-xs bg-gray-50/20">No toppers found</td>
                </tr>
              ) : (
                toppers.map((topper, index) => (
                  <tr key={topper._id} className="border-b border-gray-100 hover:bg-gray-50/50 transition">
                    <td className="px-4 py-4 text-center">{index + 1}</td>
                    <td className="px-4 py-4 text-center">{topper.academicYear || '-'}</td>
                    <td className="px-4 py-4 text-center">{topper.className || '-'}</td>
                    <td className="px-4 py-4 text-center font-medium text-gray-800">{topper.studentName}</td>
                    <td className="px-4 py-4 text-center">
                      {topper.photo ? (
                        <img src={topper.photo} alt={topper.studentName} className="w-10 h-10 object-cover rounded-full mx-auto border border-gray-200" />
                      ) : (
                        <div className="w-10 h-10 bg-gray-200 rounded-full mx-auto flex items-center justify-center">
                          <FaUser className="text-gray-400 text-sm" />
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4 text-center">{topper.percentage ? `${topper.percentage}%` : '-'}</td>
                    <td className="px-4 py-4 text-center">{topper.stream || '-'}</td>
                    <td className="px-4 py-4 text-center">{topper.displayOrder}</td>
                    <td className="px-4 py-4 text-center">{topper.showIn || '-'}</td>
                    <td className="px-4 py-4 text-center">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${topper.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {topper.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button 
                        onClick={() => handleDelete(topper._id)}
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
