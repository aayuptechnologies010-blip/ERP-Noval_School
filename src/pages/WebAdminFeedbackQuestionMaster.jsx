import React, { useState, useEffect } from 'react';
import { FaSearch, FaInbox, FaPlus, FaTrash, FaQuestionCircle, FaTag } from 'react-icons/fa';

export default function WebAdminFeedbackQuestionMaster() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({
    category: 'Teaching Quality',
    question: '',
    type: 'Rating 1-5',
    status: 'Active'
  });

  const categories = [
    'Teaching Quality',
    'Classroom Discipline',
    'Curriculum & Syllabus',
    'Punctuality & Behavior',
    'Infrastructure & Facilities',
    'General Feedback'
  ];

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/web-admin/feedback/questions`);
      const data = await res.json();
      if (data.success) {
        setQuestions(data.data || []);
      }
    } catch (err) {
      console.error('Error fetching questions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    if (!form.question.trim() || !form.category) {
      setError('Please provide category and question text');
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/web-admin/feedback/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) {
        setSuccess('Question added successfully!');
        setShowAddModal(false);
        setForm({
          category: 'Teaching Quality',
          question: '',
          type: 'Rating 1-5',
          status: 'Active'
        });
        fetchQuestions();
      } else {
        setError(data.message || 'Failed to add question');
      }
    } catch (err) {
      setError('Network error saving question');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this question?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/web-admin/feedback/questions/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setSuccess('Question deleted successfully!');
        fetchQuestions();
      } else {
        setError(data.message || 'Failed to delete');
      }
    } catch (err) {
      setError('Error deleting question');
    }
  };

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = 
      q.question?.toLowerCase().includes(search.toLowerCase()) ||
      q.category?.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'All' || q.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="flex-1 overflow-y-auto bg-[#f4f5f7]">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-[#1f2937]">Questions Master</h1>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded transition flex items-center gap-1.5 shadow-sm"
            >
              <FaPlus className="text-[10px]" />
              <span>Add New Question</span>
            </button>
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

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#f8f9fb]">
            <div className="flex items-center gap-3">
              <div className="relative w-72">
                <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-xs" />
                <input 
                  type="text" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search questions or categories..." 
                  className="w-full border border-gray-300 rounded px-3 py-1.5 pl-8 text-xs text-gray-600 outline-none focus:border-blue-500 bg-white" 
                />
              </div>

              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-700 outline-none bg-white font-medium"
              >
                <option value="All">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="text-xs text-gray-500 font-semibold">
              Total: <span className="text-blue-600">{filteredQuestions.length}</span> questions
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#f8f9fb] border-b border-gray-200 text-[10px] text-gray-700 font-bold uppercase">
                <tr>
                  <th className="px-6 py-4 text-center w-16">S.NO.</th>
                  <th className="px-6 py-4 w-48">CATEGORY</th>
                  <th className="px-6 py-4">QUESTION</th>
                  <th className="px-6 py-4 text-center w-32">TYPE</th>
                  <th className="px-6 py-4 text-center w-24">STATUS</th>
                  <th className="px-6 py-4 text-center w-24">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500 bg-white">
                      Loading questions...
                    </td>
                  </tr>
                ) : filteredQuestions.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500 bg-[#fcfcfc] border-b border-gray-100">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <FaInbox className="text-gray-400 text-3xl" />
                        <span className="text-xs font-semibold">No questions found</span>
                        <button 
                          onClick={() => setShowAddModal(true)}
                          className="mt-2 text-xs text-blue-600 hover:underline font-bold"
                        >
                          + Add your first question
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredQuestions.map((q, idx) => (
                    <tr key={q._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                      <td className="px-6 py-3.5 text-center font-bold text-gray-600">{idx + 1}</td>
                      <td className="px-6 py-3.5">
                        <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-2.5 py-1 rounded text-[11px] font-semibold">
                          <FaTag className="text-[9px]" />
                          <span>{q.category}</span>
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-gray-800 font-medium text-xs leading-relaxed">
                        {q.question}
                      </td>
                      <td className="px-6 py-3.5 text-center">
                        <span className="bg-purple-50 text-purple-700 px-2.5 py-1 rounded text-[10px] font-bold">
                          {q.type}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          q.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {q.status}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-center">
                        <button 
                          onClick={() => handleDelete(q._id)}
                          className="text-red-500 hover:text-red-700 p-1.5 rounded hover:bg-red-50 transition"
                          title="Delete Question"
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

        {/* Modal to add Question */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden animate-fadeIn">
              <div className="bg-[#f8f9fb] px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-bold text-gray-800 text-sm flex items-center gap-2">
                  <FaQuestionCircle className="text-blue-600" />
                  <span>Add Feedback Question</span>
                </h3>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600 font-bold text-lg"
                >
                  &times;
                </button>
              </div>

              <form onSubmit={handleAddQuestion} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Category <span className="text-red-500">*</span></label>
                  <select 
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-xs text-gray-700 outline-none focus:border-blue-500 font-medium"
                    required
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Question Text <span className="text-red-500">*</span></label>
                  <textarea 
                    rows="3"
                    value={form.question}
                    onChange={(e) => setForm({ ...form, question: e.target.value })}
                    placeholder="Enter the question to ask in feedback forms..."
                    className="w-full border border-gray-300 rounded px-3 py-2 text-xs text-gray-700 outline-none focus:border-blue-500 resize-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Response Type</label>
                    <select 
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-xs text-gray-700 outline-none focus:border-blue-500 font-medium"
                    >
                      <option value="Rating 1-5">Rating 1-5 (Stars)</option>
                      <option value="Rating 1-10">Rating 1-10 Scale</option>
                      <option value="Yes/No">Yes / No</option>
                      <option value="Descriptive">Descriptive (Text)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Status</label>
                    <select 
                      value={form.status}
                      onChange={(e) => setForm({ ...form, status: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-xs text-gray-700 outline-none focus:border-blue-500 font-medium"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                  <button 
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-600 text-xs font-bold rounded hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white text-xs font-bold rounded hover:bg-blue-700 shadow-sm"
                  >
                    Save Question
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
