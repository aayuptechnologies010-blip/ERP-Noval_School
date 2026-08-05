import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaStar } from 'react-icons/fa';

const dummyAppreciations = [
  { id: 1, title: 'Best Student Award', category: 'Academic', description: 'Given to students with highest academic performance.', points: 10 },
  { id: 2, title: 'Sports Champion', category: 'Sports', description: 'Awarded to top performer in annual sports meet.', points: 8 },
  { id: 3, title: 'Perfect Attendance', category: 'Attendance', description: 'No absence throughout the academic term.', points: 5 },
  { id: 4, title: 'Best Behavior', category: 'Discipline', description: 'Recognized for outstanding discipline and conduct.', points: 7 },
  { id: 5, title: 'Cultural Star', category: 'Cultural', description: 'Excellence in cultural activities and performances.', points: 6 },
];

const categoryColors = {
  Academic:    { bg: '#e0e7ff', color: '#4f46e5' },
  Sports:      { bg: '#dcfce7', color: '#16a34a' },
  Attendance:  { bg: '#fef9c3', color: '#ca8a04' },
  Discipline:  { bg: '#fee2e2', color: '#ef4444' },
  Cultural:    { bg: '#fce7f3', color: '#db2777' },
};

const emptyForm = { title: '', category: 'Academic', description: '', points: '' };

function DefineAppreciation() {
  const [appreciations, setAppreciations] = useState(dummyAppreciations);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const handleFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const openAdd = () => { setEditItem(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (item) => { setEditItem(item); setForm({ ...item }); setShowModal(true); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.points) return alert('Please fill all required fields.');
    if (editItem) {
      setAppreciations(appreciations.map(a => a.id === editItem.id ? { ...form, id: editItem.id, points: Number(form.points) } : a));
    } else {
      setAppreciations([...appreciations, { ...form, id: Date.now(), points: Number(form.points) }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this appreciation definition?')) {
      setAppreciations(appreciations.filter(a => a.id !== id));
    }
  };

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* Header */}
      <div style={{ padding: '24px 32px 8px 32px' }}>
        <p style={{ margin: '0 0 4px 0', fontSize: 13, color: '#94a3b8' }}>Discipline &rsaquo; Appreciation</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Define Appreciation</h1>
          <button onClick={openAdd} style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
            <FaPlus size={12} /> Add New
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '16px 32px 32px 32px', flex: 1, overflow: 'auto' }}>
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['#', 'Title', 'Category', 'Description', 'Points', 'Actions'].map(h => (
                  <th key={h} style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {appreciations.map((item, idx) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={tdStyle}>{idx + 1}</td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: categoryColors[item.category]?.bg || '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FaStar size={14} color={categoryColors[item.category]?.color || '#64748b'} />
                      </div>
                      <span style={{ fontWeight: 600, color: '#1e293b' }}>{item.title}</span>
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <span style={{ padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: categoryColors[item.category]?.bg || '#f1f5f9', color: categoryColors[item.category]?.color || '#64748b' }}>
                      {item.category}
                    </span>
                  </td>
                  <td style={{ ...tdStyle, maxWidth: 280 }}>{item.description}</td>
                  <td style={tdStyle}>
                    <span style={{ fontWeight: 700, color: '#3b82f6', fontSize: 16 }}>+{item.points}</span>
                    <span style={{ fontSize: 11, color: '#94a3b8', marginLeft: 4 }}>pts</span>
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
                      <button onClick={() => openEdit(item)} style={iconBtn} title="Edit"><FaEdit size={14} color="#eab308" /></button>
                      <button onClick={() => handleDelete(item.id)} style={iconBtn} title="Delete"><FaTrash size={14} color="#ef4444" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {appreciations.length === 0 && (
                <tr><td colSpan="6" style={{ textAlign: 'center', padding: 48, color: '#94a3b8' }}>No appreciation definitions found. Click "Add New" to create one.</td></tr>
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
              <h2 style={{ margin: 0, fontSize: 18, color: '#1e293b' }}>{editItem ? 'Edit Appreciation' : 'Define New Appreciation'}</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><FaTimes size={16} color="#64748b" /></button>
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={labelStyle}>Title *</label>
                <input name="title" value={form.title} onChange={handleFormChange} placeholder="e.g. Best Student Award" required style={inputStyle} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={labelStyle}>Category *</label>
                  <select name="category" value={form.category} onChange={handleFormChange} style={inputStyle}>
                    <option>Academic</option>
                    <option>Sports</option>
                    <option>Attendance</option>
                    <option>Discipline</option>
                    <option>Cultural</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Points *</label>
                  <input type="number" name="points" value={form.points} onChange={handleFormChange} placeholder="e.g. 10" min="1" required style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Description *</label>
                <textarea name="description" value={form.description} onChange={handleFormChange} rows={3} placeholder="Briefly describe this appreciation..." style={{ ...inputStyle, resize: 'vertical' }} required />
              </div>
              <button type="submit" style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: 12, borderRadius: 6, fontWeight: 600, cursor: 'pointer', marginTop: 8 }}>
                {editItem ? 'Update Appreciation' : 'Save Appreciation'}
              </button>
            </form>
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
const modal = { background: '#fff', padding: 32, borderRadius: 10, width: 500, maxWidth: '95vw', boxShadow: '0 10px 25px rgba(0,0,0,0.15)' };
const labelStyle = { display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600, color: '#475569' };
const inputStyle = { width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box', fontSize: 14 };

export default DefineAppreciation;
