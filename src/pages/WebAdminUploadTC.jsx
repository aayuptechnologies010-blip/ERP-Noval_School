import React, { useState, useEffect, useRef } from 'react';
import { 
  FaCertificate, FaCloudUploadAlt, FaListUl, FaTrash, FaEye
} from 'react-icons/fa';

export default function WebAdminUploadTC() {
  const [status, setStatus] = useState(true);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    certificateType: 'Transfer Certificate',
    academicYear: '',
    className: '',
    admissionNo: '',
    studentName: '',
    certificateNo: '',
    file: ''
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/web-admin/upload-tc`);
      const data = await res.json();
      if (data.success) {
        setCertificates(data.data);
      }
    } catch (err) {
      console.error('Error fetching certificates:', err);
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
        setFormData({ ...formData, file: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.studentName || !formData.file || !formData.certificateType) {
      setError('Student Name, Certificate Type and File are required');
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
      
      const res = await fetch(`${API_BASE}/api/web-admin/upload-tc`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      if (data.success) {
        setSuccess('Certificate uploaded successfully!');
        handleReset();
        fetchCertificates();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Failed to upload certificate');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this certificate?')) return;
    
    try {
      const res = await fetch(`${API_BASE}/api/web-admin/upload-tc/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setSuccess('Certificate deleted successfully!');
        fetchCertificates();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Failed to delete certificate');
      }
    } catch (err) {
      setError('An error occurred while deleting.');
    }
  };

  const handleReset = () => {
    setFormData({
      certificateType: 'Transfer Certificate',
      academicYear: '',
      className: '',
      admissionNo: '',
      studentName: '',
      certificateNo: '',
      file: ''
    });
    setStatus(true);
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#f4f5f7]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-[#1f2937]">Certificate Management</h1>
        <div className="text-xs text-gray-500 font-medium">
          Home <span className="mx-1">&gt;</span> Website <span className="mx-1">&gt;</span> Upload Certificate
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

      {/* Upload Certificate Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <FaCertificate className="text-blue-600 text-sm" />
          <h2 className="text-sm font-bold text-gray-800">Upload Certificate</h2>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Column - Form Fields */}
            <div className="flex-1 flex flex-col gap-5">
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Certificate Type <span className="text-red-500">*</span></label>
                  <select name="certificateType" value={formData.certificateType} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500 bg-white">
                    <option value="Transfer Certificate">Transfer Certificate</option>
                    <option value="Character Certificate">Character Certificate</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Academic Year</label>
                  <input type="text" name="academicYear" value={formData.academicYear} onChange={handleInputChange} placeholder="e.g. 2023-2024" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500 bg-white" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Class</label>
                  <input type="text" name="className" value={formData.className} onChange={handleInputChange} placeholder="e.g. Class 10" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500 bg-white" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Admission No</label>
                  <input type="text" name="admissionNo" value={formData.admissionNo} onChange={handleInputChange} placeholder="Enter Admission Number" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Student Name <span className="text-red-500">*</span></label>
                  <input type="text" name="studentName" value={formData.studentName} onChange={handleInputChange} placeholder="Enter Student Full Name" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Certificate Number</label>
                  <input type="text" name="certificateNo" value={formData.certificateNo} onChange={handleInputChange} placeholder="Enter Certificate Number" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" />
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

            {/* Right Column - File Upload */}
            <div className="w-full lg:w-[400px]">
              <label className="block text-xs font-medium text-gray-700 mb-1">Certificate File <span className="text-red-500">*</span></label>
              <div 
                className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center relative h-[180px] cursor-pointer transition ${formData.file ? 'border-green-400 bg-green-50' : 'border-gray-300 bg-white hover:bg-gray-50'}`}
                onClick={() => fileInputRef.current?.click()}
              >
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,image/*" />
                {formData.file ? (
                  <div className="text-center">
                    <FaCertificate className="text-green-500 text-3xl mb-2 mx-auto" />
                    <div className="text-sm font-medium text-gray-700">File Selected</div>
                  </div>
                ) : (
                  <>
                    <span className="absolute top-3 left-3 bg-orange-500 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">CERT</span>
                    <FaCloudUploadAlt className="text-gray-600 text-2xl mb-2" />
                    <div className="text-xs font-medium text-gray-700">Drag & drop <span className="font-normal">or</span> <span className="text-blue-500">browse</span></div>
                    <div className="text-[10px] text-gray-500 mt-1">PDF • JPG • PNG • JPEG | Max 5MB</div>
                  </>
                )}
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

      {/* All Uploaded Certificates Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="bg-[#f8f9fb] px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FaListUl className="text-green-600 text-lg" />
            <h2 className="text-sm font-bold text-gray-800">All Uploaded Certificates</h2>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <input type="text" placeholder="Search certificates..." className="w-56 border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500" />
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="text-[10px] text-gray-500 uppercase bg-gray-50/50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 font-semibold text-center w-12">S.NO.</th>
                <th className="px-4 py-3 font-semibold text-center">CERTIFICATE TYPE</th>
                <th className="px-4 py-3 font-semibold text-center">CLASS</th>
                <th className="px-4 py-3 font-semibold text-center">ADMISSION NO</th>
                <th className="px-4 py-3 font-semibold text-center">STUDENT NAME</th>
                <th className="px-4 py-3 font-semibold text-center">CERTIFICATE NO</th>
                <th className="px-4 py-3 font-semibold text-center">FILE</th>
                <th className="px-4 py-3 font-semibold text-center">STATUS</th>
                <th className="px-4 py-3 font-semibold text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" className="px-4 py-8 text-center text-gray-500 text-sm bg-gray-50/20">Loading...</td>
                </tr>
              ) : certificates.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-4 py-8 text-center text-gray-400 text-sm bg-gray-50/20">
                    <div className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-gray-300 text-white flex items-center justify-center text-[10px] font-bold">i</span>
                      No certificates found
                    </div>
                  </td>
                </tr>
              ) : (
                certificates.map((cert, index) => (
                  <tr key={cert._id} className="border-b border-gray-100 hover:bg-gray-50/50 transition">
                    <td className="px-4 py-4 text-center">{index + 1}</td>
                    <td className="px-4 py-4 text-center">{cert.certificateType}</td>
                    <td className="px-4 py-4 text-center">{cert.className || '-'}</td>
                    <td className="px-4 py-4 text-center">{cert.admissionNo || '-'}</td>
                    <td className="px-4 py-4 text-center font-medium">{cert.studentName}</td>
                    <td className="px-4 py-4 text-center">{cert.certificateNo || '-'}</td>
                    <td className="px-4 py-4 text-center">
                      <a href={cert.file} target="_blank" rel="noreferrer" className="text-blue-500 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 p-1.5 rounded inline-block">
                        <FaEye />
                      </a>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${cert.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {cert.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button 
                        onClick={() => handleDelete(cert._id)}
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
