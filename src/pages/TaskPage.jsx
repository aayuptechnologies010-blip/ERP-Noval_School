import React, { useState } from 'react';
import { FaPlus, FaEye, FaEdit, FaTrash, FaTimes, FaCheckCircle, FaClock, FaExclamationCircle } from 'react-icons/fa';

const dummyTasks = [
  { id: 1, title: 'Prepare Monthly Report', assignedTo: 'Miss Priya Sharma', priority: 'High', dueDate: '2023-10-15', status: 'In Progress', description: 'Compile attendance and academic report for October month.' },
  { id: 2, title: 'Update Student Records', assignedTo: 'Mr. Ramesh Gupta', priority: 'Medium', dueDate: '2023-10-18', status: 'Pending', description: 'Update all student admission forms and database entries.' },
  { id: 3, title: 'Organize Annual Function', assignedTo: 'Ms. Kavita Singh', priority: 'High', dueDate: '2023-10-25', status: 'Pending', description: 'Arrange stage, invitations, and program schedule.' },
  { id: 4, title: 'Library Book Audit', assignedTo: 'Mr. Suresh Yadav', priority: 'Low', dueDate: '2023-10-20', status: 'Completed', description: 'Audit all books issued/returned in library for the month.' },
  { id: 5, title: 'Fee Defaulters Notification', assignedTo: 'Miss Priya Sharma', priority: 'High', dueDate: '2023-10-12', status: 'Completed', description: 'Send SMS/notice to all fee defaulters of October.' },
];

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
  const [tasks, setTasks] = useState(dummyTasks);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [viewItem, setViewItem] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const handleFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const openAdd = () => { setEditItem(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (t) => { setEditItem(t); setForm({ ...t }); setShowModal(true); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.assignedTo || !form.dueDate) return alert('Please fill all required fields.');
    if (editItem) {
      setTasks(tasks.map(t => t.id === editItem.id ? { ...form, id: editItem.id } : t));
    } else {
      setTasks([{ ...form, id: Date.now() }, ...tasks]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this task?')) setTasks(tasks.filter(t => t.id !== id));
  };

  const handleStatusChange = (id, newStatus) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const filtered = tasks.filter(t => {
    const matchStatus = filterStatus === 'All' || t.status === filterStatus;
    const matchPriority = filterPriority === 'All' || t.priority === filterPriority;
    return matchStatus && matchPriority;
  });

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
          { label: 'Total Tasks', value: tasks.length, bg: '#e0e7ff', color: '#4f46e5' },
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
      <div style={{ padding: '0 32px 16px 32px', display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {['All', 'Pending', 'In Progress', 'Completed'].map(tab => (
            <button key={tab} onClick={() => setFilterStatus(tab)} style={{
              padding: '7px 16px', borderRadius: 20, border: 'none', fontWeight: 600, fontSize: 12, cursor: 'pointer',
              background: filterStatus === tab ? '#3b82f6' : '#e2e8f0',
              color: filterStatus === tab ? '#fff' : '#475569',
              transition: 'all 0.2s'
            }}>{tab} {tab === 'All' ? `(${counts.All})` : `(${counts[tab] ?? 0})`}</button>
          ))}
        </div>
        <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)} style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #cbd5e1', outline: 'none', fontSize: 13, color: '#334155' }}>
          <option value="All">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* Table */}
      <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'auto' }}>
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['Task', 'Assigned To', 'Priority', 'Due Date', 'Status', 'Actions'].map(h => (
                  <th key={h} style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(task => (
                <tr key={task.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={tdStyle}>
                    <span style={{ fontWeight: 600, color: '#1e293b' }}>{task.title}</span>
                    {task.description && <p style={{ margin: '4px 0 0', fontSize: 12, color: '#94a3b8' }}>{task.description.slice(0, 45)}...</p>}
                  </td>
                  <td style={tdStyle}>{task.assignedTo}</td>
                  <td style={tdStyle}>
                    <span style={{ padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: priorityConfig[task.priority]?.bg, color: priorityConfig[task.priority]?.color }}>
                      {task.priority}
                    </span>
                  </td>
                  <td style={tdStyle}>{task.dueDate}</td>
                  <td style={tdStyle}>
                    <select
                      value={task.status}
                      onChange={e => handleStatusChange(task.id, e.target.value)}
                      style={{
                        padding: '5px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer', outline: 'none',
                        background: statusConfig[task.status]?.bg,
                        color: statusConfig[task.status]?.color
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
                      <button onClick={() => setViewItem(task)} style={iconBtn} title="View"><FaEye size={14} color="#3b82f6" /></button>
                      <button onClick={() => openEdit(task)} style={iconBtn} title="Edit"><FaEdit size={14} color="#eab308" /></button>
                      <button onClick={() => handleDelete(task.id)} style={iconBtn} title="Delete"><FaTrash size={14} color="#ef4444" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan="6" style={{ textAlign: 'center', padding: 48, color: '#94a3b8' }}>No tasks found matching the selected filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div style={overlay}>
          <div style={modal}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ margin: 0, fontSize: 18, color: '#1e293b' }}>{editItem ? 'Edit Task' : 'Add New Task'}</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><FaTimes size={16} color="#64748b" /></button>
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={label}>Task Title *</label>
                <input name="title" value={form.title} onChange={handleFormChange} placeholder="e.g. Prepare Monthly Report" required style={input} />
              </div>
              <div>
                <label style={label}>Assigned To *</label>
                <input name="assignedTo" value={form.assignedTo} onChange={handleFormChange} placeholder="Staff member name" required style={input} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
                <div>
                  <label style={label}>Priority</label>
                  <select name="priority" value={form.priority} onChange={handleFormChange} style={input}>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
                <div>
                  <label style={label}>Status</label>
                  <select name="status" value={form.status} onChange={handleFormChange} style={input}>
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </div>
                <div>
                  <label style={label}>Due Date *</label>
                  <input type="date" name="dueDate" value={form.dueDate} onChange={handleFormChange} required style={input} />
                </div>
              </div>
              <div>
                <label style={label}>Description</label>
                <textarea name="description" value={form.description} onChange={handleFormChange} rows={3} placeholder="Task details..." style={{ ...input, resize: 'vertical' }} />
              </div>
              <button type="submit" style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: 12, borderRadius: 6, fontWeight: 600, cursor: 'pointer', marginTop: 8 }}>
                {editItem ? 'Update Task' : 'Create Task'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewItem && (
        <div style={overlay}>
          <div style={{ ...modal, width: 420 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ margin: 0, fontSize: 18, color: '#1e293b' }}>Task Details</h2>
              <button onClick={() => setViewItem(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><FaTimes size={16} color="#64748b" /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                ['Title', viewItem.title],
                ['Assigned To', viewItem.assignedTo],
                ['Priority', viewItem.priority],
                ['Due Date', viewItem.dueDate],
                ['Status', viewItem.status],
                ['Description', viewItem.description || 'N/A'],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', borderBottom: '1px solid #f1f5f9', paddingBottom: 12 }}>
                  <span style={{ width: 110, color: '#94a3b8', fontSize: 13, fontWeight: 600 }}>{k}</span>
                  <span style={{ flex: 1, color: '#1e293b', fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

const thStyle = { padding: '14px 16px', textAlign: 'left', fontSize: 13, fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', whiteSpace: 'nowrap' };
const tdStyle = { padding: '14px 16px', fontSize: 14, color: '#475569', verticalAlign: 'middle' };
const iconBtn = { background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center' };
const overlay = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 };
const modal = { background: '#fff', padding: 32, borderRadius: 10, width: 560, maxWidth: '95vw', boxShadow: '0 10px 25px rgba(0,0,0,0.15)', maxHeight: '90vh', overflowY: 'auto' };
const label = { display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600, color: '#475569' };
const input = { width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box', fontSize: 14 };

export default TaskPage;
