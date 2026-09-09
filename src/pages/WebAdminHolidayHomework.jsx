import React, { useState, useEffect, useRef } from 'react';
import { 
  FaBook, FaCalendarAlt, FaCloudUploadAlt, FaListUl, FaTrash, FaEye
} from 'react-icons/fa';

export default function WebAdminHolidayHomework() {
  const [status, setStatus] = useState(true);
  const [homeworks, setHomeworks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    date: '',
    type: '',
    subject: '',
    classNames: [],
    file: ''
  });

  const fileInputRef = useRef(null);

  const classes = [
    'NUR-A', 'NUR-B', 'LKG-A', 'LKG-B', 'UKG-A', 'UKG-B',
    'I-A', 'I-B', 'II-A', 'II-B', 'III-A', 'III-B'
  ];

  useEffect(() => {
    fetchHomeworks();
  }, []);

  const fetchHomeworks = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/web-admin/holiday-homework`);
      const data = await res.json();
      if (data.success) {
        setHomeworks(data.data);
      }
    } catch (err) {
      console.error('Error fetching homeworks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClassChange = (e) => {
    const { value, checked } = e.target;
    let newClasses = [...formData.classNames];
    if (checked) {
      newClasses.push(value);
    } else {
      newClasses = newClasses.filter(c => c !== value);
    }
    setFormData({ ...formData, classNames: newClasses });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, file: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.date || !formData.type || !formData.subject || formData.classNames.length === 0 || !formData.file) {
      setError('Date, Type, Subject, Classes, and File are required');
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
      
      const res = await fetch(`${API_BASE}/api/web-admin/holiday-homework`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      if (data.success) {
        setSuccess('Homework added successfully!');
        handleReset();
        fetchHomeworks();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Failed to add homework');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this homework?')) return;
    
    try {
      const res = await fetch(`${API_BASE}/api/web-admin/holiday-homework/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setSuccess('Homework deleted successfully!');
        fetchHomeworks();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Failed to delete homework');
      }
    } catch (err) {
      setError('An error occurred while deleting.');
    }
  };

  const handleReset = () => {
    setFormData({
      date: '',
      type: '',
      subject: '',
      classNames: [],
      file: ''
    });
    setStatus(true);
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#f4f5f7]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-[#1f2937]">Holiday Homework Management</h1>
        <div className="text-xs text-gray-500 font-medium">
          Home <span className="mx-1">&gt;</span> Website <span className="mx-1">&gt;</span> Holiday Homework
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

      {/* Add Holiday Homework Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <FaBook className="text-gray-800 text-sm" />
          <h2 className="text-sm font-bold text-gray-800">Add Holiday Homework</h2>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col gap-6">
            
            {/* Top Row */}
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">Date <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">Type <span className="text-red-500">*</span></label>
                <select name="type" value={formData.type} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500 bg-white">
                  <option value="">Select Type</option>
                  <option value="Holiday Homework">Holiday Homework</option>
                  <option value="Assignment">Assignment</option>
                </select>
              </div>
            </div>

            {/* Middle Row */}
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">Select Classes <span className="text-red-500">*</span></label>
                <div className="border border-gray-300 rounded-lg p-4 h-[180px] overflow-y-auto bg-gray-50/30">
                  <div className="flex flex-col gap-3">
                    {classes.map((cls, idx) => (
                      <label key={idx} className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          value={cls}
                          checked={formData.classNames.includes(cls)}
                          onChange={handleClassChange}
                          className="w-3.5 h-3.5 border-gray-300 rounded text-blue-600" 
                        />
                        <span className="text-xs text-gray-600">{cls}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">Attach PDF File</label>
                <div 
                  className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center relative h-[180px] cursor-pointer transition ${formData.file ? 'border-green-400 bg-green-50' : 'border-gray-300 bg-white hover:bg-gray-50'}`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf" />
                  {formData.file ? (
                    <div className="text-center">
                      <FaBook className="text-green-500 text-3xl mb-2 mx-auto" />
                      <div className="text-sm font-medium text-gray-700">PDF Selected</div>
                    </div>
                  ) : (
                    <>
                      <span className="absolute top-3 left-3 bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">PDF</span>
                      <FaCloudUploadAlt className="text-gray-600 text-2xl mb-2" />
                      <div className="text-xs font-medium text-gray-700">Drag & drop <span className="font-normal">or</span> <span className="text-blue-500">browse</span></div>
                      <div className="text-[10px] text-gray-500 mt-1">PDF Only | Max 5MB | No spaces in filename</div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-[0.5]">
                <label className="block text-xs font-medium text-gray-700 mb-1">Subject <span className="text-red-500">*</span></label>
                <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} placeholder="e.g. Mathematics" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
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

      {/* All Holiday Homework Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FaListUl className="text-gray-800 text-lg" />
            <h2 className="text-sm font-bold text-gray-800">All Holiday Homework</h2>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <input type="text" placeholder="Search homework..." className="w-64 border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500" />
            </div>
            <select className="border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-600 outline-none bg-white">
              <option>10</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="text-[10px] text-gray-500 uppercase bg-gray-50/50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 font-semibold text-center w-12">S.NO.</th>
                <th className="px-4 py-3 font-semibold text-center">DATE</th>
                <th className="px-4 py-3 font-semibold text-center">CLASSES</th>
                <th className="px-4 py-3 font-semibold text-center">SUBJECT</th>
                <th className="px-4 py-3 font-semibold text-center">TYPE</th>
                <th className="px-4 py-3 font-semibold text-center">ATTACHMENT</th>
                <th className="px-4 py-3 font-semibold text-center">STATUS</th>
                <th className="px-4 py-3 font-semibold text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="px-4 py-12 text-center text-gray-500 text-sm bg-gray-50/20 border-b border-gray-100">
                    Loading...
                  </td>
                </tr>
              ) : homeworks.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-4 py-12 text-center text-gray-400 text-sm bg-gray-50/20 border-b border-gray-100">
                    <div className="flex flex-col items-center justify-center">
                      <span className="w-4 h-4 rounded border border-gray-400 mb-1 inline-block"></span>
                      <span className="text-xs">No records found</span>
                    </div>
                  </td>
                </tr>
              ) : (
                homeworks.map((hw, index) => (
                  <tr key={hw._id} className="border-b border-gray-100 hover:bg-gray-50/50 transition">
                    <td className="px-4 py-4 text-center">{index + 1}</td>
                    <td className="px-4 py-4 text-center">{hw.date ? new Date(hw.date).toLocaleDateString() : '-'}</td>
                    <td className="px-4 py-4 text-center">{hw.classNames?.join(', ') || '-'}</td>
                    <td className="px-4 py-4 text-center">{hw.subject || '-'}</td>
                    <td className="px-4 py-4 text-center">{hw.type || '-'}</td>
                    <td className="px-4 py-4 text-center">
                      <a href={hw.file} target="_blank" rel="noreferrer" className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-1.5 rounded inline-block">
                        <FaEye />
                      </a>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${hw.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {hw.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button 
                        onClick={() => handleDelete(hw._id)}
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
