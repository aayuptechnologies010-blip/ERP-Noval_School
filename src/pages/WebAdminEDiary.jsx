import React, { useState, useEffect, useRef } from 'react';
import { 
  FaMinusSquare, FaCloudUploadAlt, FaListUl, FaSearch, FaFolderOpen, FaTrash, FaEye, FaDownload, FaCheckCircle, FaTimesCircle
} from 'react-icons/fa';


const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function WebAdminEDiary() {
  const [diaries, setDiaries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [search, setSearch] = useState('');

  const [formData, setFormData] = useState({
    sessionName: '',
    status: 'Active',
    file: '',
    fileName: ''
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchEDiaries();
  }, []);

  const fetchEDiaries = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/web-admin/e-diaries`);
      const data = await res.json();
      if (data.success) {
        setDiaries(data.data || []);
      }
    } catch (err) {
      console.error('Error fetching e-diaries:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setError('Only PDF files are allowed');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          file: reader.result,
          fileName: file.name
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.sessionName.trim() || !formData.file) {
      setError('Please provide session name and upload a PDF file');
      return;
    }

    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch(`${API_BASE}/api/web-admin/e-diaries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setSuccess('e-Diary created successfully!');
        setFormData({
          sessionName: '',
          status: 'Active',
          file: '',
          fileName: ''
        });
        if (fileInputRef.current) fileInputRef.current.value = '';
        fetchEDiaries();
      } else {
        setError(data.message || 'Failed to save e-Diary');
      }
    } catch (err) {
      setError('Network error saving e-Diary');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this e-Diary?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/web-admin/e-diaries/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setSuccess('e-Diary deleted successfully!');
        fetchEDiaries();
      } else {
        setError(data.message || 'Failed to delete');
      }
    } catch (err) {
      setError('Error deleting e-Diary');
    }
  };

  const filteredDiaries = diaries.filter(item => {
    const s = search.toLowerCase();
    return (
      (item.sessionName && item.sessionName.toLowerCase().includes(s)) ||
      (item.status && item.status.toLowerCase().includes(s)) ||
      (item.fileName && item.fileName.toLowerCase().includes(s))
    );
  });

  return (
    <div className="flex-1 overflow-y-auto bg-[#f4f5f7]">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-[#1f2937]">e-Diary Management</h1>
          <div className="text-xs text-gray-500 font-medium">
            Home <span className="mx-1">&gt;</span> Academic <span className="mx-1">&gt;</span> e-Diary
          </div>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-3 rounded text-red-700 text-xs font-semibold flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError('')} className="text-red-600 hover:text-red-800">×</button>
          </div>
        )}

        {success && (
          <div className="mb-4 bg-green-50 border-l-4 border-green-500 p-3 rounded text-green-700 text-xs font-semibold flex items-center justify-between">
            <span>{success}</span>
            <button onClick={() => setSuccess('')} className="text-green-600 hover:text-green-800">×</button>
          </div>
        )}

        {/* Define e-Diary Section */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
          <div className="bg-[#f8f9fb] px-5 py-4 flex items-center gap-2 border-b border-gray-100">
            <FaMinusSquare className="text-blue-600 text-sm" />
            <h2 className="text-sm font-bold text-gray-800">Define e-Diary</h2>
          </div>
          
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-8">
              
              {/* Left side input */}
              <div className="flex-1 flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Session Name <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    value={formData.sessionName}
                    onChange={(e) => setFormData({ ...formData, sessionName: e.target.value })}
                    placeholder="e.g. Session 2024-2025" 
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-500 bg-white" 
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-500 bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Right side upload */}
              <div className="flex-[2]">
                <label className="block text-xs font-medium text-gray-700 mb-1">e-Diary PDF File <span className="text-red-500">*</span></label>
                <div 
                  onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg h-40 bg-[#fafafa] flex flex-col items-center justify-center relative cursor-pointer hover:bg-gray-50 transition"
                >
                  <input 
                    ref={fileInputRef} 
                    type="file" 
                    accept="application/pdf" 
                    onChange={handleFileChange}
                    className="hidden" 
                  />
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">PDF</div>
                  <FaCloudUploadAlt className="text-blue-500 text-3xl mb-2" />
                  <div className="text-xs font-bold text-gray-800">
                    {formData.fileName ? (
                      <span className="text-green-600 font-semibold">{formData.fileName}</span>
                    ) : (
                      <>Drag & drop or <span className="text-blue-600 font-medium hover:underline">browse</span></>
                    )}
                  </div>
                  <div className="text-[10px] text-gray-500 mt-1">PDF files only | Max 10MB</div>
                  <div className="text-[10px] text-gray-400 mt-1">Uploaded securely to server</div>
                </div>
              </div>

            </div>

            <div className="flex justify-end items-center gap-6 mt-6">
              <button 
                type="button"
                onClick={() => {
                  setFormData({ sessionName: '', status: 'Active', file: '', fileName: '' });
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="text-gray-500 hover:text-gray-800 text-xs font-bold transition"
              >
                Reset Form
              </button>
              <button 
                type="submit" 
                disabled={submitting}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-8 rounded shadow-sm transition disabled:opacity-50"
              >
                {submitting ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </form>

        {/* All e-Diaries Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="bg-[#f8f9fb] px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 gap-4">
            <div className="flex items-center gap-2">
              <FaListUl className="text-green-500 text-sm" />
              <h2 className="text-sm font-bold text-gray-800">
                All e-Diaries <span className="text-[10px] text-blue-600 font-bold ml-1">({filteredDiaries.length} total)</span>
              </h2>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-xs" />
                <input 
                  type="text" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search e-diaries..." 
                  className="w-72 border border-gray-300 rounded px-3 py-1.5 pl-8 text-xs text-gray-600 outline-none focus:border-blue-500 bg-white" 
                />
              </div>
            </div>
          </div>
          
          <div className="p-4 border-b border-gray-100 text-xs font-semibold text-gray-500">
            Showing {filteredDiaries.length} entries
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-[10px] text-gray-700 font-bold uppercase bg-[#f8f9fb] border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-center w-16">S.NO.</th>
                  <th className="px-6 py-4 text-left">SESSION NAME</th>
                  <th className="px-6 py-4 text-center">E-DIARY FILE</th>
                  <th className="px-6 py-4 text-center">STATUS</th>
                  <th className="px-6 py-4 text-center w-28">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-4 py-8 text-center text-gray-500 text-xs bg-white">
                      Loading e-diaries...
                    </td>
                  </tr>
                ) : filteredDiaries.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-4 py-8 text-center text-gray-500 text-xs bg-white border-b border-gray-100">
                      <div className="flex items-center justify-center gap-2">
                        <FaFolderOpen className="text-gray-400 text-sm" />
                        <span>No e-diaries found</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredDiaries.map((item, idx) => (
                    <tr key={item._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                      <td className="px-6 py-3 text-center font-bold text-gray-600">{idx + 1}</td>
                      <td className="px-6 py-3 text-left font-semibold text-gray-800">{item.sessionName}</td>
                      <td className="px-6 py-3 text-center">
                        {item.file ? (
                          <a 
                            href={item.file} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 bg-blue-50 px-2.5 py-1 rounded text-xs font-semibold"
                          >
                            <FaEye className="text-[11px]" />
                            <span>{item.fileName || 'View PDF'}</span>
                          </a>
                        ) : (
                          <span className="text-gray-400">No file</span>
                        )}
                      </td>
                      <td className="px-6 py-3 text-center">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          item.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-center">
                        <button 
                          onClick={() => handleDelete(item._id)}
                          className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition"
                          title="Delete"
                        >
                          <FaTrash className="text-sm" />
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
    </div>
  );
}
