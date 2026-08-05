import React, { useState } from 'react';
import { FaPlus, FaEye, FaEdit, FaTrash, FaTimes, FaBook } from 'react-icons/fa';

const dummyLessons = [
  { id: 1, topic: 'Introduction to Photosynthesis', subject: 'Science', class: 'Class 7', duration: '2 Hours', date: '2023-10-10', status: 'Completed', notes: 'Explained light and dark reactions.' },
  { id: 2, topic: 'Quadratic Equations Part 1', subject: 'Mathematics', class: 'Class 10', duration: '1.5 Hours', date: '2023-10-12', status: 'Pending', notes: 'Solving by factorization method.' },
  { id: 3, topic: 'Rise of Nationalism in Europe', subject: 'History', class: 'Class 9', duration: '3 Hours', date: '2023-10-15', status: 'In Progress', notes: 'Discuss French revolution impact.' },
  { id: 4, topic: 'Tenses and Voices', subject: 'English', class: 'Class 8', duration: '1 Hour', date: '2023-10-11', status: 'Completed', notes: 'Covered active and passive rules.' },
];

const classes = ['All', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'];
const statusColors = {
  Completed: { bg: '#dcfce7', color: '#16a34a' },
  'In Progress': { bg: '#e0e7ff', color: '#4f46e5' },
  Pending: { bg: '#fef9c3', color: '#ca8a04' },
};

const emptyForm = { topic: '', subject: '', class: 'Class 6', duration: '', date: '', status: 'Pending', notes: '' };

function Lesson() {
  const [lessons, setLessons] = useState(dummyLessons);
  const [filterClass, setFilterClass] = useState('All');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [viewItem, setViewItem] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const handleFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const openAdd = () => { setEditItem(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (lesson) => { setEditItem(lesson); setForm({ ...lesson }); setShowModal(true); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.topic || !form.subject || !form.date) return alert('Please fill all required fields.');

    if (editItem) {
      setLessons(lessons.map(l => l.id === editItem.id ? { ...form, id: editItem.id } : l));
    } else {
      setLessons([{ ...form, id: Date.now() }, ...lessons]);
    }
    setShowModal(false);
    setForm(emptyForm);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this lesson plan?')) setLessons(lessons.filter(l => l.id !== id));
  };

  const handleStatusChange = (id, newStatus) => {
    setLessons(lessons.map(l => l.id === id ? { ...l, status: newStatus } : l));
  };

  const filtered = lessons.filter(l => {
    const matchClass = filterClass === 'All' || l.class === filterClass;
    const matchSearch = l.topic.toLowerCase().includes(search.toLowerCase()) || l.subject.toLowerCase().includes(search.toLowerCase());
    return matchClass && matchSearch;
  });

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* Header */}
      <div style={{ padding: '24px 32px 16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Lesson Planning</h1>
        <button onClick={openAdd} style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
          <FaPlus size={12} /> Add Lesson Plan
        </button>
      </div>

      {/* Filters */}
      <div style={{ padding: '0 32px 16px 32px', display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative' }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search topic or subject..." style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #cbd5e1', outline: 'none', fontSize: 13, width: 220 }} />
        </div>
        <select value={filterClass} onChange={e => setFilterClass(e.target.value)} style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #cbd5e1', outline: 'none', fontSize: 13 }}>
          {classes.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Table */}
      <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'auto' }}>
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['Topic', 'Subject', 'Class', 'Duration', 'Date', 'Status', 'Actions'].map(h => (
                  <th key={h} style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(l => (
                <tr key={l.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FaBook size={14} color="#4f46e5" />
                      </div>
                      <div>
                        <span style={{ fontWeight: 600, color: '#1e293b' }}>{l.topic}</span>
                        {l.notes && <p style={{ margin: '2px 0 0', fontSize: 12, color: '#94a3b8' }}>{l.notes.slice(0, 40)}...</p>}
                      </div>
                    </div>
                  </td>
                  <td style={tdStyle}>{l.subject}</td>
                  <td style={tdStyle}>{l.class}</td>
                  <td style={tdStyle}>{l.duration}</td>
                  <td style={tdStyle}>{l.date}</td>
                  <td style={tdStyle}>
                    <select
                      value={l.status}
                      onChange={e => handleStatusChange(l.id, e.target.value)}
                      style={{
                        padding: '4px 8px', borderRadius: 20, fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer', outline: 'none',
                        background: statusColors[l.status]?.bg || '#f1f5f9',
                        color: statusColors[l.status]?.color || '#475569'
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
                      <button onClick={() => setViewItem(l)} style={iconBtn} title="View"><FaEye size={14} color="#3b82f6" /></button>
                      <button onClick={() => openEdit(l)} style={iconBtn} title="Edit"><FaEdit size={14} color="#eab308" /></button>
                      <button onClick={() => handleDelete(l.id)} style={iconBtn} title="Delete"><FaTrash size={14} color="#ef4444" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan="7" style={{ textAlign: 'center', padding: 48, color: '#94a3b8' }}>No lessons found.</td></tr>
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
              <h2 style={{ margin: 0, fontSize: 18, color: '#1e293b' }}>{editItem ? 'Edit Lesson Plan' : 'Add New Lesson Plan'}</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><FaTimes size={16} color="#64748b" /></button>
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={label}>Topic / Lesson Name *</label>
                <input name="topic" value={form.topic} onChange={handleFormChange} required style={input} placeholder="e.g. Introduction to Fractions" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                  <label style={label}>Subject *</label>
                  <input name="subject" value={form.subject} onChange={handleFormChange} required style={input} placeholder="e.g. Science" />
                </div>
                <div>
                  <label style={label}>Class</label>
                  <select name="class" value={form.class} onChange={handleFormChange} style={input}>
                    {classes.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
                <div>
                  <label style={label}>Duration</label>
                  <input name="duration" value={form.duration} onChange={handleFormChange} placeholder="e.g. 2 Hours" style={input} />
                </div>
                <div>
                  <label style={label}>Date *</label>
                  <input type="date" name="date" value={form.date} onChange={handleFormChange} required style={input} />
                </div>
                <div>
                  <label style={label}>Status</label>
                  <select name="status" value={form.status} onChange={handleFormChange} style={input}>
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={label}>Notes / Outline</label>
                <textarea name="notes" value={form.notes} onChange={handleFormChange} rows={3} placeholder="Outline of the lesson..." style={{ ...input, resize: 'vertical' }} />
              </div>
              <button type="submit" style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: 12, borderRadius: 6, fontWeight: 600, cursor: 'pointer', marginTop: 8 }}>
                {editItem ? 'Update Lesson' : 'Create Lesson'}
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
              <h2 style={{ margin: 0, fontSize: 18, color: '#1e293b' }}>Lesson Plan Details</h2>
              <button onClick={() => setViewItem(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><FaTimes size={16} color="#64748b" /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                ['Topic', viewItem.topic],
                ['Subject', viewItem.subject],
                ['Class', viewItem.class],
                ['Duration', viewItem.duration || 'N/A'],
                ['Date', viewItem.date],
                ['Status', viewItem.status],
                ['Notes', viewItem.notes || 'N/A'],
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

export default Lesson;
