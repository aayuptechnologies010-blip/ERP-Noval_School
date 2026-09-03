import React, { useState, useEffect } from 'react';
import { FaPlus, FaEye, FaEdit, FaTrash, FaTimes, FaCheckCircle, FaClock, FaExclamationCircle } from 'react-icons/fa';

const priorityConfig = {
  High:   { bg: '#fee2e2', color: '#ef4444' },
  Medium: { bg: '#fef9c3', color: '#ca8a04' },
  Low:    { bg: '#dcfce7', color: '#16a34a' },
};

const statusConfig = {
  Pending:     { bg: '#f1f5f9', color: '#64748b', icon: <FaClock size={11} /> },
  'In Progress': { bg: '#e0e7ff', color: '#4f46e5', icon: <FaExclamationCircle size={11} /> },
  Completed:   { bg: '#dcfce7', color: '#16a34a', icon: <FaCheckCircle size={11} /> },
};

const emptyForm = { title: '', assignedTo: '', priority: 'Medium', dueDate: '', status: 'Pending', description: '' };

function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All Priorities');
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [viewItem, setViewItem] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, [filterStatus, filterPriority]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const queryParams = new URLSearchParams();
      if (filterStatus !== 'All') queryParams.append('status', filterStatus);
      if (filterPriority !== 'All Priorities') queryParams.append('priority', filterPriority);
      
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/tasks?${queryParams.toString()}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      }
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const openAdd = () => { setEditItem(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (t) => { setEditItem(t); setForm({ ...t }); setShowModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.assignedTo || !form.dueDate) return alert('Please fill all required fields.');
    
    try {
      const token = localStorage.getItem('token');
      const method = editItem ? 'PUT' : 'POST';
      const url = editItem 
        ? `${import.meta.env.VITE_API_BASE_URL}/api/tasks/${editItem._id}` 
        : `${import.meta.env.VITE_API_BASE_URL}/api/tasks`;
        
      const response = await fetch(url, {
        method,
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(form)
      });
      
      if (response.ok) {
        setShowModal(false);
        fetchTasks(); // Refresh list
      } else {
        alert("Failed to save task.");
      }
    } catch (error) {
      console.error("Error saving task", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this task?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/tasks/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          fetchTasks();
        }
      } catch (error) {
        console.error("Failed to delete task", error);
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      // Optimistically update
      setTasks(tasks.map(t => t._id === id ? { ...t, status: newStatus } : t));
      
      const taskToUpdate = tasks.find(t => t._id === id);
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ ...taskToUpdate, status: newStatus })
      });
    } catch (error) {
      console.error("Failed to update status", error);
      fetchTasks(); // Revert on failure
    }
  };

  const counts = {
    All: tasks.length,
    Pending: tasks.filter(t => t.status === 'Pending').length,
    'In Progress': tasks.filter(t => t.status === 'In Progress').length,
    Completed: tasks.filter(t => t.status === 'Completed').length,
  };

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* Header */}
      <div style={{ padding: '24px 32px 16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Task Management</h1>
        <button onClick={openAdd} style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
          <FaPlus size={12} /> Add New Task
        </button>
      </div>

      {/* Summary Cards */}
      <div style={{ padding: '0 32px 16px 32px', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {[
          { label: 'Total Tasks', value: counts.All, bg: '#e0e7ff', color: '#4f46e5' },
          { label: 'Pending', value: counts.Pending, bg: '#f1f5f9', color: '#64748b' },
          { label: 'In Progress', value: counts['In Progress'], bg: '#fef9c3', color: '#ca8a04' },
          { label: 'Completed', value: counts.Completed, bg: '#dcfce7', color: '#16a34a' },
        ].map(card => (
          <div key={card.label} style={{ flex: '1 1 140px', background: '#fff', borderRadius: 8, padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: card.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 20, fontWeight: 800, color: card.color }}>{card.value}</span>
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#475569' }}>{card.label}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ padding: '0 32px', marginBottom: 16, display: 'flex', gap: 16 }}>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={selectStyle}>
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)} style={selectStyle}>
          <option value="All Priorities">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* Task List */}
      <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'auto' }}>
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: 40, color: '#64748b' }}>Loading tasks...</div>
          ) : tasks.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 40, color: '#64748b' }}>No tasks found for the selected filters.</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 800 }}>
                <thead>
                  <tr>
                    <th style={thStyle}>Task Details</th>
                    <th style={thStyle}>Assigned To</th>
                    <th style={thStyle}>Priority</th>
                    <th style={thStyle}>Due Date</th>
                    <th style={thStyle}>Status</th>
                    <th style={thStyle}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((t) => (
                    <tr key={t._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={tdStyle}>
                        <div style={{ fontWeight: 600, color: '#1e293b' }}>{t.title}</div>
                        <div style={{ fontSize: 12, color: '#64748b', marginTop: 4, maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {t.description}
                        </div>
                      </td>
                      <td style={tdStyle}>
                        <span style={{ fontWeight: 600, color: '#334155' }}>{t.assignedTo}</span>
                      </td>
                      <td style={tdStyle}>
                        <span style={{ background: priorityConfig[t.priority]?.bg || '#f1f5f9', color: priorityConfig[t.priority]?.color || '#333', padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700 }}>
                          {t.priority}
                        </span>
                      </td>
                      <td style={tdStyle}>
                        <span style={{ color: '#475569', fontWeight: 500 }}>
                          {new Date(t.dueDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </span>
                      </td>
                      <td style={tdStyle}>
                        <select 
                          value={t.status}
                          onChange={(e) => handleStatusChange(t._id, e.target.value)}
                          style={{
                            ...selectStyle,
                            padding: '4px 8px',
                            fontSize: 12,
                            fontWeight: 600,
                            borderRadius: 20,
                            background: statusConfig[t.status]?.bg || '#f1f5f9',
                            color: statusConfig[t.status]?.color || '#333',
                            border: 'none',
                            outline: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                      <td style={tdStyle}>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button onClick={() => setViewItem(t)} style={{ background: '#e0f2fe', color: '#0ea5e9', border: 'none', width: 28, height: 28, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                            <FaEye size={13} />
                          </button>
                          <button onClick={() => openEdit(t)} style={{ background: '#fef3c7', color: '#d97706', border: 'none', width: 28, height: 28, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                            <FaEdit size={13} />
                          </button>
                          <button onClick={() => handleDelete(t._id)} style={{ background: '#fee2e2', color: '#ef4444', border: 'none', width: 28, height: 28, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                            <FaTrash size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div style={modalOverlay}>
          <div style={modalContent}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1e293b', margin: 0 }}>
                {editItem ? 'Edit Task' : 'Add New Task'}
              </h2>
              <FaTimes onClick={() => setShowModal(false)} style={{ cursor: 'pointer', color: '#64748b' }} />
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={labelStyle}>Task Title *</label>
                <input required type="text" name="title" value={form.title} onChange={handleFormChange} style={inputStyle} placeholder="Enter task title" />
              </div>
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={labelStyle}>Assigned To *</label>
                  <input required type="text" name="assignedTo" value={form.assignedTo} onChange={handleFormChange} style={inputStyle} placeholder="Name of assignee" />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={labelStyle}>Priority</label>
                  <select name="priority" value={form.priority} onChange={handleFormChange} style={inputStyle}>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={labelStyle}>Due Date *</label>
                  <input required type="date" name="dueDate" value={form.dueDate ? new Date(form.dueDate).toISOString().substring(0, 10) : ''} onChange={handleFormChange} style={inputStyle} />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={labelStyle}>Status</label>
                  <select name="status" value={form.status} onChange={handleFormChange} style={inputStyle}>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={labelStyle}>Description</label>
                <textarea name="description" value={form.description} onChange={handleFormChange} style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }} placeholder="Enter details..." />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 8 }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ padding: '10px 16px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" style={{ padding: '10px 16px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer' }}>
                  {editItem ? 'Update Task' : 'Save Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewItem && (
        <div style={modalOverlay}>
          <div style={{ ...modalContent, maxWidth: 500 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1e293b', margin: '0 0 8px 0' }}>{viewItem.title}</h2>
                <div style={{ display: 'flex', gap: 12 }}>
                  <span style={{ background: priorityConfig[viewItem.priority]?.bg, color: priorityConfig[viewItem.priority]?.color, padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 700 }}>
                    {viewItem.priority} Priority
                  </span>
                  <span style={{ background: statusConfig[viewItem.status]?.bg, color: statusConfig[viewItem.status]?.color, padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                    {statusConfig[viewItem.status]?.icon} {viewItem.status}
                  </span>
                </div>
              </div>
              <FaTimes onClick={() => setViewItem(null)} style={{ cursor: 'pointer', color: '#64748b' }} />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, background: '#f8fafc', padding: 16, borderRadius: 8 }}>
                <div>
                  <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600, marginBottom: 4 }}>ASSIGNED TO</div>
                  <div style={{ fontSize: 14, color: '#1e293b', fontWeight: 600 }}>{viewItem.assignedTo}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600, marginBottom: 4 }}>DUE DATE</div>
                  <div style={{ fontSize: 14, color: '#1e293b', fontWeight: 600 }}>
                    {new Date(viewItem.dueDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </div>
                </div>
              </div>
              
              <div>
                <div style={{ fontSize: 12, color: '#64748b', fontWeight: 700, marginBottom: 8, letterSpacing: 0.5 }}>DESCRIPTION</div>
                <p style={{ fontSize: 14, color: '#334155', lineHeight: 1.6, margin: 0 }}>
                  {viewItem.description || 'No description provided.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Styles
const selectStyle = {
  padding: '8px 12px',
  borderRadius: 6,
  border: '1px solid #cbd5e1',
  outline: 'none',
  fontSize: 13,
  color: '#334155',
  minWidth: 140,
  background: '#fff'
};

const thStyle = {
  padding: '16px',
  textAlign: 'left',
  fontSize: 12,
  fontWeight: 700,
  color: '#475569',
  borderBottom: '2px solid #e2e8f0',
  textTransform: 'uppercase',
  letterSpacing: 0.5
};

const tdStyle = {
  padding: '16px',
  fontSize: 14,
  verticalAlign: 'middle'
};

const labelStyle = {
  fontSize: 12,
  fontWeight: 600,
  color: '#475569'
};

const inputStyle = {
  padding: '10px 12px',
  borderRadius: 6,
  border: '1px solid #cbd5e1',
  outline: 'none',
  fontSize: 14,
  color: '#1e293b'
};

const modalOverlay = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  background: 'rgba(15, 23, 42, 0.4)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
  backdropFilter: 'blur(2px)'
};

const modalContent = {
  background: '#fff',
  borderRadius: 16,
  padding: '24px 32px',
  width: '100%',
  maxWidth: 600,
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
};

export default TaskPage;
