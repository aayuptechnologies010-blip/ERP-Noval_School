import React, { useState, useEffect } from 'react';
import { 
  FaBriefcase, FaGlobe, FaSearch, FaCalendarAlt, FaPlus,
  FaBold, FaItalic, FaStrikethrough, FaUnderline, FaListUl, FaListOl, 
  FaQuoteRight, FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify, 
  FaLink, FaImage, FaCaretDown, FaTrash
} from 'react-icons/fa';

export default function WebAdminCareer() {
  const [status, setStatus] = useState(true);
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobRole: '',
    expMin: '',
    expMax: '',
    skills: '',
    qualification: '',
    ageMin: '',
    ageMax: '',
    noOfPosts: '',
    description: '',
    activationDate: '',
    deactivationDate: ''
  });

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/web-admin/career');
      const data = await res.json();
      if (data.success) {
        setCareers(data.data);
      }
    } catch (err) {
      console.error('Error fetching careers:', err);
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
    if (!formData.jobTitle) {
      setError('Job Title is required');
      return;
    }
    
    setSubmitting(true);
    setError('');
    setSuccess('');
    
    try {
      const payload = {
        jobTitle: formData.jobTitle,
        jobRole: formData.jobRole,
        experience: formData.expMin || formData.expMax ? `${formData.expMin}-${formData.expMax} Years` : '',
        skills: formData.skills,
        qualification: formData.qualification,
        ageLimit: formData.ageMin || formData.ageMax ? `${formData.ageMin}-${formData.ageMax} Years` : '',
        noOfPosts: formData.noOfPosts,
        description: formData.description,
        activationDate: formData.activationDate || null,
        deactivationDate: formData.deactivationDate || null,
        status: status ? 'Active' : 'Inactive'
      };
      
      const res = await fetch('/api/web-admin/career', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      if (data.success) {
        setSuccess('Career posted successfully!');
        handleReset();
        fetchCareers();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Failed to post career');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this career?')) return;
    
    try {
      const res = await fetch(`/api/web-admin/career/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setSuccess('Career deleted successfully!');
        fetchCareers();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Failed to delete career');
      }
    } catch (err) {
      setError('An error occurred while deleting.');
    }
  };

  const handleReset = () => {
    setFormData({
      jobTitle: '',
      jobRole: '',
      expMin: '',
      expMax: '',
      skills: '',
      qualification: '',
      ageMin: '',
      ageMax: '',
      noOfPosts: '',
      description: '',
      activationDate: '',
      deactivationDate: ''
    });
    setStatus(true);
    setError('');
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#f4f5f7]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-[#1f2937]">Manage Career</h1>
        <div className="text-xs text-gray-500 font-medium">
          Website <span className="mx-1">&gt;</span> Manage Career
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

      {/* Post Vacancy Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <FaBriefcase className="text-gray-800 text-sm" />
          <h2 className="text-sm font-bold text-gray-800">Post Vacancy</h2>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col gap-5 max-w-4xl mx-auto">
            
            {/* Form Rows */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <label className="sm:w-48 text-xs font-medium text-gray-700">Job Title <span className="text-red-500">*</span></label>
              <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} placeholder="e.g. Requirement of Sports Teacher for Junior Wing" className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <label className="sm:w-48 text-xs font-medium text-gray-700">Job Role</label>
              <div className="flex-1 flex items-center gap-4">
                <input type="text" name="jobRole" value={formData.jobRole} onChange={handleInputChange} placeholder="e.g. Teacher" className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <label className="sm:w-48 text-xs font-medium text-gray-700">Required Experience</label>
              <div className="flex-1 flex items-center gap-4">
                <input type="number" name="expMin" value={formData.expMin} onChange={handleInputChange} placeholder="Min" className="w-24 border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
                <span className="text-xs text-gray-500">to</span>
                <input type="number" name="expMax" value={formData.expMax} onChange={handleInputChange} placeholder="Max" className="w-24 border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
                <span className="text-xs text-gray-500">Years</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <label className="sm:w-48 text-xs font-medium text-gray-700">Required Skills (if any)</label>
              <input type="text" name="skills" value={formData.skills} onChange={handleInputChange} placeholder="e.g. Swimming, Yoga, Football" className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <label className="sm:w-48 text-xs font-medium text-gray-700">Required Qualification</label>
              <input type="text" name="qualification" value={formData.qualification} onChange={handleInputChange} placeholder="e.g. B.Ed., TGT, NTT" className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <label className="sm:w-48 text-xs font-medium text-gray-700">Required Age Limit</label>
              <div className="flex-1 flex items-center gap-4">
                <input type="number" name="ageMin" value={formData.ageMin} onChange={handleInputChange} placeholder="Min" className="w-24 border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
                <span className="text-xs text-gray-500">to</span>
                <input type="number" name="ageMax" value={formData.ageMax} onChange={handleInputChange} placeholder="Max" className="w-24 border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
                <span className="text-xs text-gray-500">Years</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <label className="sm:w-48 text-xs font-medium text-gray-700">No. of Post</label>
              <input type="number" name="noOfPosts" value={formData.noOfPosts} onChange={handleInputChange} placeholder="e.g. 5" className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
              <label className="sm:w-48 text-xs font-medium text-gray-700 mt-2">Description</label>
              <div className="flex-1 border border-gray-300 rounded overflow-hidden">
                <div className="bg-[#f8f9fa] border-b border-gray-200 px-2 py-1.5 flex flex-wrap gap-1 items-center text-gray-600">
                  <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-xs"><FaBold /></button>
                  <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-xs"><FaItalic /></button>
                  <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-xs"><FaStrikethrough /></button>
                  <div className="w-px h-4 bg-gray-300 mx-1"></div>
                  <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-xs flex items-center gap-1">Format <FaCaretDown /></button>
                  <div className="w-px h-4 bg-gray-300 mx-1"></div>
                  <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-xs"><FaListUl /></button>
                  <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-xs"><FaListOl /></button>
                </div>
                <textarea name="description" value={formData.description} onChange={handleInputChange} rows="6" className="w-full p-3 text-sm outline-none resize-y"></textarea>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mt-2">
              <label className="sm:w-48 text-xs font-medium text-gray-700">Activation Date</label>
              <div className="w-64 relative">
                <input type="date" name="activationDate" value={formData.activationDate} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <label className="sm:w-48 text-xs font-medium text-gray-700 flex items-center gap-2">
                Deactivation Date
              </label>
              <div className="w-64 relative">
                <input type="date" name="deactivationDate" value={formData.deactivationDate} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <label className="sm:w-48 text-xs font-medium text-gray-700">Status</label>
              <div className="flex-1 flex items-center gap-3">
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

      {/* Post Vacancy List Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FaGlobe className="text-gray-800 text-lg" />
            <h2 className="text-sm font-bold text-gray-800">Post Vacancy List</h2>
          </div>
          
          <div className="relative">
            <input type="text" placeholder="Search..." className="w-64 border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gray-100 border-l border-gray-300 flex items-center justify-center rounded-r cursor-pointer hover:bg-gray-200">
              <FaSearch className="text-gray-500 text-[10px]" />
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] text-left">
            <thead className="text-gray-600 uppercase bg-gray-50/50 border-b border-gray-200">
              <tr>
                <th className="px-3 py-3 font-semibold text-center w-12">S.No.</th>
                <th className="px-3 py-3 font-semibold text-center">Job Title</th>
                <th className="px-3 py-3 font-semibold text-center">Job Role</th>
                <th className="px-3 py-3 font-semibold text-center">Skills</th>
                <th className="px-3 py-3 font-semibold text-center">Experience</th>
                <th className="px-3 py-3 font-semibold text-center">Qualification</th>
                <th className="px-3 py-3 font-semibold text-center">No. of Post</th>
                <th className="px-3 py-3 font-semibold text-center">Age</th>
                <th className="px-3 py-3 font-semibold text-center">Activation Date</th>
                <th className="px-3 py-3 font-semibold text-center">Deactivation Date</th>
                <th className="px-3 py-3 font-semibold text-center">Status</th>
                <th className="px-3 py-3 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="12" className="px-4 py-8 text-center text-gray-500 text-sm bg-gray-50/20">Loading...</td>
                </tr>
              ) : careers.length === 0 ? (
                <tr>
                  <td colSpan="12" className="px-4 py-8 text-center text-gray-500 text-sm bg-gray-50/20">No careers found</td>
                </tr>
              ) : (
                careers.map((career, index) => (
                  <tr key={career._id} className="border-b border-gray-100 hover:bg-gray-50/50 transition">
                    <td className="px-3 py-3 text-center">{index + 1}</td>
                    <td className="px-3 py-3 font-medium text-gray-800">{career.jobTitle}</td>
                    <td className="px-3 py-3 text-center">{career.jobRole || '-'}</td>
                    <td className="px-3 py-3 text-center">{career.skills || '-'}</td>
                    <td className="px-3 py-3 text-center">{career.experience || '-'}</td>
                    <td className="px-3 py-3 text-center">{career.qualification || '-'}</td>
                    <td className="px-3 py-3 text-center">{career.noOfPosts || '-'}</td>
                    <td className="px-3 py-3 text-center">{career.ageLimit || '-'}</td>
                    <td className="px-3 py-3 text-center">{career.activationDate ? new Date(career.activationDate).toLocaleDateString() : '-'}</td>
                    <td className="px-3 py-3 text-center">{career.deactivationDate ? new Date(career.deactivationDate).toLocaleDateString() : '-'}</td>
                    <td className="px-3 py-3 text-center">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${career.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {career.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <button 
                        onClick={() => handleDelete(career._id)}
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
