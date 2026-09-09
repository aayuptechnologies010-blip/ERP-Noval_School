import React, { useState, useEffect } from 'react';
import { 
  FaDesktop, FaCalendarAlt, FaHeading, FaAlignLeft, FaEye, FaListUl, FaInfoCircle, FaTrash
} from 'react-icons/fa';

export default function WebAdminLFDNotice() {
  const [status, setStatus] = useState(true);
  const [showOnFooter, setShowOnFooter] = useState(false);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    noticeDate: '',
    noticeHeading: '',
    description: ''
  });

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/web-admin/lfd/notices');
      const data = await res.json();
      if (data.success) {
        setNotices(data.data);
      }
    } catch (err) {
      console.error('Error fetching notices:', err);
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
    if (!formData.noticeDate || !formData.noticeHeading || !formData.description) {
      setError('Please fill all required fields');
      return;
    }
    
    setSubmitting(true);
    setError('');
    setSuccess('');
    
    try {
      const payload = {
        ...formData,
        status: status ? 'Active' : 'Inactive',
        showOnFooter
      };
      
      const res = await fetch('/api/web-admin/lfd/notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      if (data.success) {
        setSuccess('Notice added successfully!');
        handleReset();
        fetchNotices();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Failed to add notice');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this notice?')) return;
    
    try {
      const res = await fetch(`/api/web-admin/lfd/notices/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setSuccess('Notice deleted successfully!');
        fetchNotices();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Failed to delete notice');
      }
    } catch (err) {
      setError('An error occurred while deleting.');
    }
  };

  const handleReset = () => {
    setFormData({ noticeDate: '', noticeHeading: '', description: '' });
    setStatus(true);
    setShowOnFooter(false);
    setError('');
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#f4f5f7]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-[#1f2937]">LFD Notice Management</h1>
        <div className="text-xs text-gray-500 font-medium">
          Home <span className="mx-1">&gt;</span> Website <span className="mx-1">&gt;</span> LFD <span className="mx-1">&gt;</span> LFD Notice
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

      {/* Add LFD Notice Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <FaDesktop className="text-gray-800 text-sm" />
          <h2 className="text-sm font-bold text-gray-800">Add LFD Notice</h2>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Left Column - Form Fields */}
            <div className="flex-1 flex flex-col gap-6">
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Notice Date <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input type="date" name="noticeDate" value={formData.noticeDate} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Notice Heading <span className="text-red-500">*</span></label>
                  <input type="text" name="noticeHeading" value={formData.noticeHeading} onChange={handleInputChange} placeholder="Enter Notice Heading" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Description <span className="text-red-500">*</span></label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} rows="5" placeholder="Enter Description" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500 resize-y"></textarea>
              </div>

              <div className="flex items-center gap-12">
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

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Show On Footer</label>
                  <div className="flex items-center gap-3">
                    <div 
                      className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${showOnFooter ? 'bg-blue-500' : 'bg-gray-300'}`}
                      onClick={() => setShowOnFooter(!showOnFooter)}
                    >
                      <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${showOnFooter ? 'translate-x-5' : ''}`}></div>
                    </div>
                    {showOnFooter && <span className="bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Active</span>}
                    {!showOnFooter && <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Inactive</span>}
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column - Information */}
            <div className="w-full lg:w-[350px]">
              <div className="bg-[#f8f9fa] border border-gray-200 rounded-lg p-5 h-full">
                <div className="flex items-center gap-2 mb-4">
                  <FaInfoCircle className="text-gray-500 text-sm" />
                  <h3 className="text-sm font-semibold text-gray-700">LFD Notice Information</h3>
                </div>
                
                <div className="flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <FaCalendarAlt className="text-blue-500 text-sm mt-0.5" />
                    <p className="text-[11px] text-gray-600">Select the date when this notice should be displayed</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaHeading className="text-green-500 text-sm mt-0.5" />
                    <p className="text-[11px] text-gray-600">Provide a clear, concise heading for the notice</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaAlignLeft className="text-blue-400 text-sm mt-0.5" />
                    <p className="text-[11px] text-gray-600">Rich text description supporting formatting</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaEye className="text-orange-400 text-sm mt-0.5" />
                    <p className="text-[11px] text-gray-600">Control notice visibility and footer display</p>
                  </div>
                </div>
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

      {/* All LFD Notices Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FaListUl className="text-gray-800 text-lg" />
            <h2 className="text-sm font-bold text-gray-800">All LFD Notices</h2>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <input type="text" placeholder="Search notices..." className="w-64 border border-gray-300 rounded px-3 py-1.5 pl-3 text-xs text-gray-600 outline-none focus:border-blue-500" />
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
                <th className="px-4 py-3 font-semibold text-center">DATE</th>
                <th className="px-4 py-3 font-semibold text-center">HEADING</th>
                <th className="px-4 py-3 font-semibold text-center">SHOW ON FOOTER</th>
                <th className="px-4 py-3 font-semibold text-center">STATUS</th>
                <th className="px-4 py-3 font-semibold text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center text-gray-500 text-sm bg-gray-50/20">Loading...</td>
                </tr>
              ) : notices.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center text-gray-500 text-sm bg-gray-50/20">No LFD notices found</td>
                </tr>
              ) : (
                notices.map((notice, index) => (
                  <tr key={notice._id} className="border-b border-gray-100 hover:bg-gray-50/50 transition">
                    <td className="px-4 py-3 text-center">{index + 1}</td>
                    <td className="px-4 py-3 text-center">{new Date(notice.noticeDate).toLocaleDateString()}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">{notice.noticeHeading}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${notice.showOnFooter ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                        {notice.showOnFooter ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${notice.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {notice.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button 
                        onClick={() => handleDelete(notice._id)}
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
