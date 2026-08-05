import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaExclamationTriangle } from 'react-icons/fa';

const severityColors = {
  Minor:    { bg: '#fef9c3', color: '#ca8a04' },
  Moderate: { bg: '#ffedd5', color: '#ea580c' },
  Severe:   { bg: '#fee2e2', color: '#ef4444' },
};

const dummyInfractions = [
  { id: 1, title: 'Late Coming', severity: 'Minor', description: 'Student/Staff arriving late to school or class.', points: 2 },
  { id: 2, title: 'Uniform Violation', severity: 'Minor', description: 'Not wearing proper school uniform.', points: 3 },
  { id: 3, title: 'Cheating in Exam', severity: 'Severe', description: 'Caught cheating or using unfair means in examination.', points: 10 },
  { id: 4, title: 'Disrespecting Teacher', severity: 'Moderate', description: 'Showing disrespect or misbehavior towards staff.', points: 7 },
  { id: 5, title: 'Vandalism', severity: 'Severe', description: 'Damaging school property intentionally.', points: 9 },
  { id: 6, title: 'Bullying', severity: 'Severe', description: 'Bullying, harassing or threatening other students.', points: 10 },
];

const emptyForm = { title: '', severity: 'Minor', description: '', points: '' };

function DefineInfraction() {
  const [infractions, setInfractions] = useState(dummyInfractions);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const handleFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const openAdd = () => { setEditItem(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (item) => { setEditItem(item); setForm({ ...item }); setShowModal(true); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.description) return alert('Please fill all required fields.');
    if (editItem) {
      setInfractions(infractions.map(i => i.id === editItem.id ? { ...form, id: editItem.id, points: Number(form.points) } : i));
    } else {
      setInfractions([...infractions, { ...form, id: Date.now(), points: Number(form.points) }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this infraction definition?')) setInfractions(infractions.filter(i => i.id !== id));
  };

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '24px 32px 8px 32px' }}>
        <p style={{ margin: '0 0 4px', fontSize: 13, color: '#94a3b8' }}>Discipline › Infraction</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Define Infraction</h1>
          <button onClick={openAdd} style={addBtn}><FaPlus size={12} /> Add New</button>
        </div>
      </div>

      <div style={{ padding: '16px 32px 32px', flex: 1, overflow: 'auto' }}>
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['#', 'Infraction Title', 'Severity', 'Penalty Points', 'Description', 'Actions'].map(h => (
                  <th key={h} style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {infractions.map((item, idx) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={tdStyle}>{idx + 1}</td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: severityColors[item.severity]?.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FaExclamationTriangle size={14} color={severityColors[item.severity]?.color} />
                      </div>
                      <span style={{ fontWeight: 600, color: '#1e293b' }}>{item.title}</span>
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <span style={{ padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: severityColors[item.severity]?.bg, color: severityColors[item.severity]?.color }}>
                      {item.severity}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <span style={{ fontWeight: 700, color: '#ef4444', fontSize: 16 }}>-{item.points}</span>
                    <span style={{ fontSize: 11, color: '#94a3b8', marginLeft: 4 }}>pts</span>
                  </td>
                  <td style={{ ...tdStyle, maxWidth: 250, color: '#64748b' }}>{item.description}</td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
                      <button onClick={() => openEdit(item)} style={iconBtn} title="Edit"><FaEdit size={14} color="#eab308" /></button>
                      <button onClick={() => handleDelete(item.id)} style={iconBtn} title="Delete"><FaTrash size={14} color="#ef4444" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {infractions.length === 0 && (
                <tr><td colSpan="6" style={{ textAlign: 'center', padding: 48, color: '#94a3b8' }}>No infractions defined yet. Click "Add New" to create one.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div style={overlay}>
          <div style={modal}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ margin: 0, fontSize: 18, color: '#1e293b' }}>{editItem ? 'Edit Infraction' : 'Define New Infraction'}</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><FaTimes size={16} color="#64748b" /></button>
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div><label style={lbl}>Title *</label><input name="title" value={form.title} onChange={handleFormChange} required style={inp} placeholder="e.g. Late Coming" /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div><label style={lbl}>Severity</label>
                  <select name="severity" value={form.severity} onChange={handleFormChange} style={inp}>
                    <option>Minor</option><option>Moderate</option><option>Severe</option>
                  </select>
                </div>
                <div><label style={lbl}>Penalty Points</label><input type="number" name="points" value={form.points} onChange={handleFormChange} min="1" style={inp} placeholder="e.g. 5" /></div>
              </div>
              <div><label style={lbl}>Description *</label><textarea name="description" value={form.description} onChange={handleFormChange} rows={3} required style={{ ...inp, resize: 'vertical' }} placeholder="Describe this infraction..." /></div>
              <button type="submit" style={{ background: '#ef4444', color: '#fff', border: 'none', padding: 12, borderRadius: 6, fontWeight: 600, cursor: 'pointer', marginTop: 6 }}>
                {editItem ? 'Update Infraction' : 'Save Infraction'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const addBtn = { background: '#3b82f6', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 };
const thStyle = { padding: '14px 16px', textAlign: 'left', fontSize: 13, fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', whiteSpace: 'nowrap' };
const tdStyle = { padding: '14px 16px', fontSize: 14, color: '#475569', verticalAlign: 'middle' };
const iconBtn = { background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center' };
const overlay = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 };
const modal = { background: '#fff', padding: 28, borderRadius: 10, width: 500, maxWidth: '95vw', boxShadow: '0 10px 25px rgba(0,0,0,0.15)' };
const lbl = { display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600, color: '#475569' };
const inp = { width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box', fontSize: 14 };

export default DefineInfraction;
