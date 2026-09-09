import React, { useState, useEffect } from 'react';
import { FaFilter, FaInfoCircle, FaPlus, FaTrash, FaChalkboardTeacher, FaEdit } from 'react-icons/fa';

export default function WebAdminFeedbackSubjectTeacher() {
  const [selectedClass, setSelectedClass] = useState('Class 10');
  const [mappings, setMappings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Add / assign teacher modal
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [form, setForm] = useState({
    subjectName: '',
    teacherName: '',
    teacherId: '',
    status: 'Active'
  });

  const availableClasses = [
    'NUR A', 'NUR B', 'LKG A', 'LKG B', 'UKG A', 'UKG B',
    'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
    'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
    'Class 11', 'Class 12'
  ];

  useEffect(() => {
    fetchMappings();
  }, [selectedClass]);

  const fetchMappings = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/web-admin/feedback/subject-teacher?className=${encodeURIComponent(selectedClass)}`);
      const data = await res.json();
      if (data.success) {
        const list = (data.data || []).filter(item => !selectedClass || item.className === selectedClass);
        setMappings(list);
      }
    } catch (err) {
      console.error('Error fetching subject-teacher mappings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignTeacher = async (e) => {
    e.preventDefault();
    if (!form.subjectName.trim() || !form.teacherName.trim()) {
      setError('Please provide subject and teacher name');
      return;
    }

    try {
      const res = await fetch('/api/web-admin/feedback/subject-teacher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          className: selectedClass,
          ...form
        })
      });
      const data = await res.json();
      if (data.success) {
        setSuccess('Teacher assigned successfully!');
        setShowAssignModal(false);
        setForm({
          subjectName: '',
          teacherName: '',
          teacherId: '',
          status: 'Active'
        });
        fetchMappings();
      } else {
        setError(data.message || 'Failed to assign teacher');
      }
    } catch (err) {
      setError('Network error assigning teacher');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this subject-teacher relation?')) return;
    try {
      const res = await fetch(`/api/web-admin/feedback/subject-teacher/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setSuccess('Mapping removed successfully!');
        fetchMappings();
      } else {
        setError(data.message || 'Failed to delete');
      }
    } catch (err) {
      setError('Error deleting relation');
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#f4f5f7]">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-[#1f2937]">Class Subject Teacher Relation</h1>
          <div className="text-xs text-gray-500 font-medium">
            Home <span className="mx-1">&gt;</span> Feedback Management <span className="mx-1">&gt;</span> Class Subject Teacher Relation
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

        {/* Filter Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="px-5 py-4 flex items-center gap-2 border-b border-gray-100">
            <FaFilter className="text-gray-800 text-sm" />
            <h2 className="text-sm font-bold text-gray-800">Select Class</h2>
          </div>
          
          <div className="p-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex items-end gap-4 w-full md:w-auto">
              <div className="w-64">
                <label className="block text-xs font-medium text-gray-700 mb-1">Class <span className="text-red-500">*</span></label>
                <select 
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 outline-none bg-white focus:border-blue-500 font-semibold"
                >
                  {availableClasses.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>
              <button 
                onClick={fetchMappings}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2 px-6 rounded transition"
              >
                GO
              </button>
            </div>
            
            <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
              <FaInfoCircle className="text-blue-500" />
              <span>Select a class to view subjects mapped for feedback and assign a teacher for each.</span>
            </div>
          </div>
        </div>

        {/* Mappings Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="px-5 py-4 flex items-center justify-between border-b border-gray-100 bg-[#f8f9fb]">
            <div className="flex items-center gap-2">
              <FaChalkboardTeacher className="text-blue-600 text-sm" />
              <h2 className="text-sm font-bold text-gray-800">
                Subject Teacher Allocations for <span className="text-blue-600">{selectedClass}</span> ({mappings.length})
              </h2>
            </div>
            <button 
              onClick={() => setShowAssignModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-1.5 px-3 rounded transition flex items-center gap-1.5"
            >
              <FaPlus className="text-[10px]" />
              <span>Assign Teacher</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-[10px] text-gray-700 font-bold uppercase bg-[#f8f9fb] border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-center w-16">S.NO.</th>
                  <th className="px-6 py-4">CLASS</th>
                  <th className="px-6 py-4">SUBJECT NAME</th>
                  <th className="px-6 py-4">ASSIGNED TEACHER</th>
                  <th className="px-6 py-4 text-center">TEACHER ID / EMP CODE</th>
                  <th className="px-6 py-4 text-center">STATUS</th>
                  <th className="px-6 py-4 text-center w-24">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="px-4 py-8 text-center text-gray-500 text-xs bg-white">
                      Loading allocations...
                    </td>
                  </tr>
                ) : mappings.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-4 py-8 text-center text-gray-500 text-xs bg-white">
                      No teacher allocations for {selectedClass}. Click "Assign Teacher" to map.
                    </td>
                  </tr>
                ) : (
                  mappings.map((m, idx) => (
                    <tr key={m._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                      <td className="px-6 py-3 text-center font-bold text-gray-600">{idx + 1}</td>
                      <td className="px-6 py-3 font-semibold text-gray-700">{m.className}</td>
                      <td className="px-6 py-3 font-semibold text-gray-800">{m.subjectName}</td>
                      <td className="px-6 py-3 font-semibold text-blue-700">{m.teacherName}</td>
                      <td className="px-6 py-3 text-center text-gray-500 font-mono">{m.teacherId || '-'}</td>
                      <td className="px-6 py-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          m.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {m.status}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-center">
                        <button 
                          onClick={() => handleDelete(m._id)}
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

        {/* Modal to assign teacher */}
        {showAssignModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-fadeIn">
              <div className="bg-[#f8f9fb] px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-bold text-gray-800 text-sm">Assign Teacher for {selectedClass}</h3>
                <button 
                  onClick={() => setShowAssignModal(false)}
                  className="text-gray-400 hover:text-gray-600 font-bold text-lg"
                >
                  &times;
                </button>
              </div>

              <form onSubmit={handleAssignTeacher} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Subject Name <span className="text-red-500">*</span></label>
                  <input 
                    type="text"
                    value={form.subjectName}
                    onChange={(e) => setForm({ ...form, subjectName: e.target.value })}
                    placeholder="e.g. Mathematics, Science, Social Studies"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-xs text-gray-700 outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Teacher Name <span className="text-red-500">*</span></label>
                  <input 
                    type="text"
                    value={form.teacherName}
                    onChange={(e) => setForm({ ...form, teacherName: e.target.value })}
                    placeholder="e.g. Mr. Rajesh Sharma"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-xs text-gray-700 outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Teacher ID / Employee Code</label>
                  <input 
                    type="text"
                    value={form.teacherId}
                    onChange={(e) => setForm({ ...form, teacherId: e.target.value })}
                    placeholder="e.g. EMP1024"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-xs text-gray-700 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Status</label>
                  <select 
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-xs text-gray-700 outline-none focus:border-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                  <button 
                    type="button"
                    onClick={() => setShowAssignModal(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-600 text-xs font-bold rounded hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white text-xs font-bold rounded hover:bg-blue-700"
                  >
                    Save Allocation
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
