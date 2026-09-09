import React, { useState, useEffect, useRef } from 'react';
import { 
  FaBookOpen, FaCalendarAlt, FaCloudUploadAlt, FaFilePdf, FaListUl, FaEye, FaTrash
} from 'react-icons/fa';

export default function WebAdminEBulletin() {
  const [bulletins, setBulletins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    monthName: '',
    session: '2024-2025',
    publishDate: '',
    attachment: '',
    fileName: ''
  });
  const [status, setStatus] = useState(true);

  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchBulletins();
  }, []);

  const fetchBulletins = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/web-admin/e-bulletin');
      const data = await res.json();
      if (data.success) {
        setBulletins(data.data);
      }
    } catch (err) {
      console.error('Error fetching e-bulletins:', err);
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
        setFormData({ ...formData, attachment: reader.result, fileName: file.name });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.monthName || !formData.session || !formData.publishDate || !formData.attachment) {
      setError('Month Name, Session, Publish Date, and File attachment are required');
      return;
    }

    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const payload = {
        monthName: formData.monthName,
        session: formData.session,
        publishDate: formData.publishDate,
        attachment: formData.attachment,
        status: status ? 'Active' : 'Inactive'
      };

      const res = await fetch('/api/web-admin/e-bulletin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success) {
        setSuccess('E-Bulletin added successfully!');
        handleReset();
        fetchBulletins();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Failed to save e-bulletin');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this e-bulletin?')) return;

    try {
      const res = await fetch(`/api/web-admin/e-bulletin/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setSuccess('E-Bulletin deleted successfully!');
        fetchBulletins();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Failed to delete');
      }
    } catch (err) {
      setError('An error occurred while deleting.');
    }
  };

  const handleReset = () => {
    setFormData({
      monthName: '',
      session: '2024-2025',
      publishDate: '',
      attachment: '',
      fileName: ''
    });
    setStatus(true);
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#f4f5f7]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-[#1f2937]">E-Bulletin Management</h1>
        <div className="text-xs text-gray-500 font-medium">
          Home <span className="mx-1">&gt;</span> Website <span className="mx-1">&gt;</span> E-Bulletin
        </div>
      </div>

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-sm font-medium">
          {success}
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm font-medium">
          {error}
        </div>
      )}

      {/* Add E-Bulletin Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="bg-white px-5 py-4 flex items-center gap-2 border-b border-gray-100">
          <FaBookOpen className="text-gray-800 text-sm" />
          <h2 className="text-sm font-bold text-gray-800">Add E-Bulletin</h2>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left side inputs */}
            <div className="flex-[2] flex flex-col gap-6">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Month Name <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="monthName"
                  value={formData.monthName}
                  onChange={handleInputChange}
                  placeholder="e.g. October 2024" 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" 
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Session <span className="text-red-500">*</span></label>
                  <select 
                    name="session"
                    value={formData.session}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500 bg-white"
                  >
                    <option value="2025-2026">2025-2026</option>
                    <option value="2024-2025">2024-2025</option>
                    <option value="2023-2024">2023-2024</option>
                    <option value="2022-2023">2022-2023</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Publish Date <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input 
                      type="date" 
                      name="publishDate"
                      value={formData.publishDate}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500" 
                    />
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
                  {status && <span className="bg-blue-50 text-blue-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Active</span>}
                  {!status && <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Inactive</span>}
                </div>
              </div>
            </div>

            {/* Right side upload */}
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-700 mb-1">Upload E-Bulletin <span className="text-red-500">*</span></label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-lg h-36 flex flex-col items-center justify-center relative cursor-pointer transition ${formData.attachment ? 'border-green-400 bg-green-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}`}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept=".pdf,application/pdf" 
                  className="hidden" 
                />
                <div className="absolute top-3 left-3 bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded">PDF</div>
                <FaCloudUploadAlt className={`text-2xl mb-2 ${formData.attachment ? 'text-green-600' : 'text-gray-600'}`} />
                <div className="text-sm font-medium text-gray-700">
                  {formData.fileName ? formData.fileName : (
                    <>Drag & drop or <span className="text-blue-600">browse</span></>
                  )}
                </div>
                <div className="text-xs text-gray-500 mt-1">Max 10MB | PDF only</div>
              </div>
            </div>

          </div>

          <div className="flex justify-end items-center gap-4 mt-8">
            <button 
              onClick={handleReset}
              className="bg-[#6c757d] hover:bg-[#5a6268] text-white text-sm font-medium py-2 px-6 rounded transition"
            >
              Reset
            </button>
            <button 
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-6 rounded transition disabled:opacity-50"
            >
              {submitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>

      {/* All E-Bulletins Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="bg-white px-5 py-4 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-2">
            <FaListUl className="text-gray-800 text-sm" />
            <h2 className="text-sm font-bold text-gray-800">All E-Bulletins</h2>
          </div>
          <span className="text-xs bg-gray-100 text-gray-600 font-semibold px-2.5 py-1 rounded-full">
            {bulletins.length} Total
          </span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="text-[10px] text-gray-700 font-bold uppercase bg-[#f8f9fb] border-b border-gray-200">
              <tr>
                <th className="px-4 py-4 text-center w-12">S.NO.</th>
                <th className="px-4 py-4 text-center">MONTH NAME</th>
                <th className="px-4 py-4 text-center">ACADEMIC YEAR</th>
                <th className="px-4 py-4 text-center">E-BULLETIN FILE</th>
                <th className="px-4 py-4 text-center">PUBLISH DATE</th>
                <th className="px-4 py-4 text-center">STATUS</th>
                <th className="px-4 py-4 text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-4 py-12 text-center text-gray-500 text-xs bg-white">
                    Loading e-bulletins...
                  </td>
                </tr>
              ) : bulletins.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-4 py-12 text-center text-gray-500 text-xs bg-white">
                    No e-bulletins found
                  </td>
                </tr>
              ) : (
                bulletins.map((item, index) => (
                  <tr key={item._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="px-4 py-4 text-center">{index + 1}</td>
                    <td className="px-4 py-4 text-center font-medium text-gray-800">{item.monthName}</td>
                    <td className="px-4 py-4 text-center text-gray-600">{item.session}</td>
                    <td className="px-4 py-4 text-center">
                      {item.attachment ? (
                        <a 
                          href={item.attachment} 
                          download={`e-bulletin-${item.monthName}.pdf`}
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 border border-red-200 px-2.5 py-1 rounded text-[11px] font-medium hover:bg-red-100 transition"
                        >
                          <FaFilePdf className="text-xs" /> View PDF
                        </a>
                      ) : (
                        <span className="text-gray-400">No file</span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-center text-gray-600">
                      {item.publishDate ? new Date(item.publishDate).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${item.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button 
                        onClick={() => handleDelete(item._id)}
                        className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2 rounded transition"
                        title="Delete"
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

