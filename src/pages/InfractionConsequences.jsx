import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaGavel } from 'react-icons/fa';

const dummyConsequences = [
  { id: 1, title: 'Verbal Warning', infractionType: 'Late Coming', action: 'Warning', description: 'Formal verbal warning given to student/staff.', notifyParent: true },
  { id: 2, title: 'Written Warning', infractionType: 'Uniform Violation', action: 'Warning', description: 'Written notice issued and recorded in file.', notifyParent: true },
  { id: 3, title: 'Suspension - 1 Day', infractionType: 'Cheating in Exam', action: 'Suspension', description: 'Student suspended from school for 1 day.', notifyParent: true },
  { id: 4, title: 'Parent Meeting', infractionType: 'Bullying', action: 'Meeting', description: 'Mandatory parent-teacher meeting to be arranged.', notifyParent: true },
  { id: 5, title: 'Community Service', infractionType: 'Vandalism', action: 'Service', description: '2 hours of community service within school premises.', notifyParent: false },
];

const emptyForm = { title: '', infractionType: 'Late Coming', action: 'Warning', description: '', notifyParent: false };

function InfractionConsequences() {
  const [consequences, setConsequences] = useState(dummyConsequences);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const handleFormChange = (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: val });
  };
  const openAdd = () => { setEditItem(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (item) => { setEditItem(item); setForm({ ...item }); setShowModal(true); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.description) return alert('Please fill all required fields.');
    if (editItem) {
      setConsequences(consequences.map(c => c.id === editItem.id ? { ...form, id: editItem.id } : c));
    } else {
      setConsequences([...consequences, { ...form, id: Date.now() }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this consequence?')) setConsequences(consequences.filter(c => c.id !== id));
  };

  const actionColors = { Warning: { bg: '#fef9c3', color: '#ca8a04' }, Suspension: { bg: '#fee2e2', color: '#ef4444' }, Meeting: { bg: '#e0e7ff', color: '#4f46e5' }, Service: { bg: '#dcfce7', color: '#16a34a' } };

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '24px 32px 8px 32px' }}>
        <p style={{ margin: '0 0 4px', fontSize: 13, color: '#94a3b8' }}>Discipline › Infraction</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Define Consequences</h1>
          <button onClick={openAdd} style={addBtn}><FaPlus size={12} /> Add Consequence</button>
        </div>
      </div>

      <div style={{ padding: '16px 32px 32px', flex: 1, overflow: 'auto' }}>
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['#', 'Consequence', 'Infraction Type', 'Action Type', 'Notify Parent', 'Description', 'Actions'].map(h => (
                  <th key={h} style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {consequences.map((item, idx) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={tdStyle}>{idx + 1}</td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FaGavel size={14} color="#ef4444" />
                      </div>
                      <span style={{ fontWeight: 600, color: '#1e293b' }}>{item.title}</span>
                    </div>
                  </td>
                  <td style={tdStyle}>{item.infractionType}</td>
                  <td style={tdStyle}>
                    <span style={{ padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: actionColors[item.action]?.bg, color: actionColors[item.action]?.color }}>
                      {item.action}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: item.notifyParent ? '#dcfce7' : '#f1f5f9', color: item.notifyParent ? '#16a34a' : '#64748b' }}>
                      {item.notifyParent ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td style={{ ...tdStyle, maxWidth: 200, color: '#64748b' }}>{item.description}</td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
                      <button onClick={() => openEdit(item)} style={iconBtn}><FaEdit size={14} color="#eab308" /></button>
                      <button onClick={() => handleDelete(item.id)} style={iconBtn}><FaTrash size={14} color="#ef4444" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {consequences.length === 0 && (
                <tr><td colSpan="7" style={{ textAlign: 'center', padding: 48, color: '#94a3b8' }}>No consequences defined yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div style={overlay}>
          <div style={modal}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ margin: 0, fontSize: 18, color: '#1e293b' }}>{editItem ? 'Edit Consequence' : 'Add New Consequence'}</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><FaTimes size={16} color="#64748b" /></button>
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div><label style={lbl}>Consequence Title *</label><input name="title" value={form.title} onChange={handleFormChange} required style={inp} placeholder="e.g. Verbal Warning" /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div><label style={lbl}>Infraction Type</label>
                  <select name="infractionType" value={form.infractionType} onChange={handleFormChange} style={inp}>
                    {['Late Coming', 'Uniform Violation', 'Cheating in Exam', 'Disrespecting Teacher', 'Vandalism', 'Bullying'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div><label style={lbl}>Action Type</label>
                  <select name="action" value={form.action} onChange={handleFormChange} style={inp}>
                    <option>Warning</option><option>Suspension</option><option>Meeting</option><option>Service</option>
                  </select>
                </div>
              </div>
              <div><label style={lbl}>Description *</label><textarea name="description" value={form.description} onChange={handleFormChange} rows={3} required style={{ ...inp, resize: 'vertical' }} placeholder="Describe this consequence..." /></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input type="checkbox" id="notifyParent" name="notifyParent" checked={form.notifyParent} onChange={handleFormChange} />
                <label htmlFor="notifyParent" style={{ fontSize: 14, color: '#475569', cursor: 'pointer' }}>Notify Parent / Guardian</label>
              </div>
              <button type="submit" style={{ background: '#ef4444', color: '#fff', border: 'none', padding: 12, borderRadius: 6, fontWeight: 600, cursor: 'pointer', marginTop: 6 }}>
                {editItem ? 'Update Consequence' : 'Save Consequence'}
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
const modal = { background: '#fff', padding: 28, borderRadius: 10, width: 520, maxWidth: '95vw', boxShadow: '0 10px 25px rgba(0,0,0,0.15)' };
const lbl = { display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600, color: '#475569' };
const inp = { width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box', fontSize: 14 };

export default InfractionConsequences;
