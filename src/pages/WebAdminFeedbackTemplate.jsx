import React, { useState, useEffect } from 'react';
import { FaSearch, FaClipboardList, FaPlus, FaTrash, FaCalendarAlt, FaLink, FaCheckCircle, FaTimesCircle, FaUsers } from 'react-icons/fa';

export default function WebAdminFeedbackTemplate() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [search, setSearch] = useState('');

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [form, setForm] = useState({
    formName: '',
    startDate: '',
    endDate: '',
    totalQuestions: 10,
    applyTo: 'All Students',
    status: 'Active',
    webLink: ''
  });

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/web-admin/feedback/templates`);
      const data = await res.json();
      if (data.success) {
        setTemplates(data.data || []);
      }
    } catch (err) {
      console.error('Error fetching feedback templates:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTemplate = async (e) => {
    e.preventDefault();
    if (!form.formName.trim() || !form.startDate || !form.endDate) {
      setError('Please fill in Form Name, Start Date, and End Date');
      return;
    }

    try {
      const generatedLink = form.webLink.trim() || `https://navalschool.edu/feedback/${encodeURIComponent(form.formName.toLowerCase().replace(/\s+/g, '-'))}`;
      const res = await fetch(`${API_BASE}/api/web-admin/feedback/templates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          webLink: generatedLink,
          totalQuestions: Number(form.totalQuestions) || 1
        })
      });
      const data = await res.json();
      if (data.success) {
        setSuccess('Feedback form template created successfully!');
        setShowCreateModal(false);
        setForm({
          formName: '',
          startDate: '',
          endDate: '',
          totalQuestions: 10,
          applyTo: 'All Students',
          status: 'Active',
          webLink: ''
        });
        fetchTemplates();
      } else {
        setError(data.message || 'Failed to create template');
      }
    } catch (err) {
      setError('Network error saving template');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this feedback template?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/web-admin/feedback/templates/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setSuccess('Template deleted successfully!');
        fetchTemplates();
      } else {
        setError(data.message || 'Failed to delete template');
      }
    } catch (err) {
      setError('Error deleting template');
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    try {
      return new Date(dateStr).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch (e) {
      return dateStr;
    }
  };

  const filteredTemplates = templates.filter(t => {
    const s = search.toLowerCase();
    return (
      (t.formName && t.formName.toLowerCase().includes(s)) ||
      (t.applyTo && t.applyTo.toLowerCase().includes(s)) ||
      (t.status && t.status.toLowerCase().includes(s))
    );
  });

  return (
    <div className="flex-1 overflow-y-auto bg-[#f4f5f7]">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-[#1f2937]">Feedback Manager</h1>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded transition flex items-center gap-2 shadow-sm"
          >
            <FaPlus className="text-[10px]" />
            <span>Create New Feedback</span>
          </button>
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

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-[#f8f9fb]">
            <div className="relative w-72">
              <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-xs" />
              <input 
                type="text" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Templates..." 
                className="w-full border border-gray-300 rounded px-3 py-1.5 pl-8 text-xs text-gray-600 outline-none focus:border-blue-500 bg-white" 
              />
            </div>

            <div className="text-xs text-gray-500 font-semibold">
              Total Forms: <span className="text-blue-600">{filteredTemplates.length}</span>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#f8f9fb] border-b border-gray-200 text-[10px] text-gray-700 font-bold uppercase">
                <tr>
                  <th className="px-5 py-4 font-bold text-center w-14">SL NO</th>
                  <th className="px-5 py-4 font-bold">FEEDBACK FORM</th>
                  <th className="px-5 py-4 font-bold">FEEDBACK DURATION</th>
                  <th className="px-5 py-4 font-bold text-center">STATUS</th>
                  <th className="px-5 py-4 font-bold text-center">TOTAL QUESTIONS</th>
                  <th className="px-5 py-4 font-bold text-center">APPLY TO</th>
                  <th className="px-5 py-4 font-bold text-center">RESPONSES</th>
                  <th className="px-5 py-4 font-bold text-center">WEB LINK</th>
                  <th className="px-5 py-4 font-bold text-center w-24">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="9" className="px-6 py-16 text-center text-gray-500 bg-white">
                      Loading feedback templates...
                    </td>
                  </tr>
                ) : filteredTemplates.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="px-6 py-16 text-center bg-[#fcfcfc] border-b border-gray-100">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <FaClipboardList className="text-gray-400 text-4xl" />
                        <div className="text-gray-600 font-bold text-sm">No feedback templates found</div>
                        <div className="text-gray-400 text-xs font-medium">Create your first feedback template to get started</div>
                        <button 
                          onClick={() => setShowCreateModal(true)}
                          className="mt-2 bg-blue-600 text-white text-xs font-bold py-1.5 px-4 rounded shadow-sm hover:bg-blue-700"
                        >
                          + Create New Feedback
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredTemplates.map((item, idx) => (
                    <tr key={item._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                      <td className="px-5 py-3.5 text-center font-bold text-gray-600">{idx + 1}</td>
                      <td className="px-5 py-3.5 font-semibold text-gray-800 text-xs">{item.formName}</td>
                      <td className="px-5 py-3.5 text-gray-600 font-medium whitespace-nowrap">
                        <span className="flex items-center gap-1.5">
                          <FaCalendarAlt className="text-gray-400 text-[10px]" />
                          <span>{formatDate(item.startDate)} - {formatDate(item.endDate)}</span>
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          item.status === 'Active' ? 'bg-green-100 text-green-700' :
                          item.status === 'Closed' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-center font-bold text-gray-700">
                        {item.totalQuestions || 0}
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded text-[11px] font-semibold">
                          {item.applyTo || 'All Students'}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <span className="bg-purple-50 text-purple-700 font-bold px-2 py-0.5 rounded text-[11px]">
                          {item.responseCount || 0}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        {item.webLink ? (
                          <a 
                            href={item.webLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-blue-600 hover:underline text-xs font-semibold"
                            title={item.webLink}
                          >
                            <FaLink className="text-[10px]" />
                            <span>Link</span>
                          </a>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <button 
                          onClick={() => handleDelete(item._id)}
                          className="text-red-500 hover:text-red-700 p-1.5 rounded hover:bg-red-50 transition"
                          title="Delete Template"
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

        {/* Modal to Create Feedback Template */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden animate-fadeIn">
              <div className="bg-[#f8f9fb] px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-bold text-gray-800 text-sm flex items-center gap-2">
                  <FaClipboardList className="text-blue-600" />
                  <span>Create Feedback Form</span>
                </h3>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600 font-bold text-lg"
                >
                  &times;
                </button>
              </div>

              <form onSubmit={handleCreateTemplate} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Feedback Form Title <span className="text-red-500">*</span></label>
                  <input 
                    type="text"
                    value={form.formName}
                    onChange={(e) => setForm({ ...form, formName: e.target.value })}
                    placeholder="e.g. Annual Teacher Evaluation 2024-25"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-xs text-gray-700 outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Start Date <span className="text-red-500">*</span></label>
                    <input 
                      type="date"
                      value={form.startDate}
                      onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-xs text-gray-700 outline-none focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">End Date <span className="text-red-500">*</span></label>
                    <input 
                      type="date"
                      value={form.endDate}
                      onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-xs text-gray-700 outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Total Questions</label>
                    <input 
                      type="number"
                      min="1"
                      value={form.totalQuestions}
                      onChange={(e) => setForm({ ...form, totalQuestions: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-xs text-gray-700 outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Apply To</label>
                    <select 
                      value={form.applyTo}
                      onChange={(e) => setForm({ ...form, applyTo: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-xs text-gray-700 outline-none focus:border-blue-500 font-medium"
                    >
                      <option value="All Students">All Students</option>
                      <option value="Secondary Classes">Secondary Classes</option>
                      <option value="Senior Secondary">Senior Secondary</option>
                      <option value="Parents">Parents</option>
                      <option value="Faculty & Staff">Faculty & Staff</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Status</label>
                    <select 
                      value={form.status}
                      onChange={(e) => setForm({ ...form, status: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-xs text-gray-700 outline-none focus:border-blue-500 font-medium"
                    >
                      <option value="Active">Active</option>
                      <option value="Closed">Closed</option>
                      <option value="Draft">Draft</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Custom Web Link (Optional)</label>
                    <input 
                      type="text"
                      value={form.webLink}
                      onChange={(e) => setForm({ ...form, webLink: e.target.value })}
                      placeholder="https://..."
                      className="w-full border border-gray-300 rounded px-3 py-2 text-xs text-gray-700 outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                  <button 
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-600 text-xs font-bold rounded hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white text-xs font-bold rounded hover:bg-blue-700 shadow-sm"
                  >
                    Create Feedback Form
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
