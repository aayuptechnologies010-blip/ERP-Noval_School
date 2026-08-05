import React, { useState } from 'react';
import { FaSearch, FaPlus, FaEye, FaTrash, FaTimes, FaExclamationTriangle } from 'react-icons/fa';

const severityColors = {
  Minor:    { bg: '#fef9c3', color: '#ca8a04' },
  Moderate: { bg: '#ffedd5', color: '#ea580c' },
  Severe:   { bg: '#fee2e2', color: '#ef4444' },
};

const infractionTypes = ['Late Coming', 'Uniform Violation', 'Disrespecting Management', 'Absenteeism', 'Misconduct', 'Other'];

const dummyRecords = [
  { id: 1, name: 'Miss Priya Sharma', designation: 'Teacher', department: 'Science', infraction: 'Late Coming', severity: 'Minor', date: '2023-10-03', consequence: 'Verbal Warning', notes: 'Arrived 20 mins late without notice.' },
  { id: 2, name: 'Mr. Suresh Yadav', designation: 'Peon', department: 'Support', infraction: 'Absenteeism', severity: 'Moderate', date: '2023-10-07', consequence: 'Written Warning', notes: 'Absent 3 days without leave.' },
  { id: 3, name: 'Ms. Kavita Singh', designation: 'Teacher', department: 'English', infraction: 'Misconduct', severity: 'Moderate', date: '2023-10-11', consequence: 'Meeting with Principal', notes: 'Argument with parent.' },
];

const emptyForm = { name: '', designation: '', department: '', infraction: 'Late Coming', severity: 'Minor', date: '', consequence: '', notes: '' };

function StaffInfraction() {
  const [records, setRecords] = useState(dummyRecords);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [viewItem, setViewItem] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const handleFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.date) return alert('Please fill all required fields.');
    setRecords([{ ...form, id: Date.now() }, ...records]);
    setShowModal(false);
    setForm(emptyForm);
  };

  const handleDelete = (id) => {
    if (window.confirm('Remove this infraction record?')) setRecords(records.filter(r => r.id !== id));
  };

  const filtered = records.filter(r => r.name.toLowerCase().includes(search.toLowerCase()) || r.department.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '24px 32px 8px 32px' }}>
        <p style={{ margin: '0 0 4px', fontSize: 13, color: '#94a3b8' }}>Discipline › Infraction</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Staff Infraction</h1>
          <button onClick={() => setShowModal(true)} style={addBtn}><FaPlus size={12} /> Record Infraction</button>
        </div>
      </div>

      <div style={{ padding: '12px 32px', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {['Minor', 'Moderate', 'Severe'].map(s => (
          <div key={s} style={{ background: '#fff', borderRadius: 8, padding: '10px 18px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: severityColors[s]?.color, display: 'inline-block' }}></span>
            <span style={{ fontSize: 13, color: '#475569' }}>{s}: <strong style={{ color: severityColors[s]?.color }}>{records.filter(r => r.severity === s).length}</strong></span>
          </div>
        ))}
        <div style={{ position: 'relative', marginLeft: 'auto' }}>
          <FaSearch style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={12} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or dept..." style={{ padding: '8px 12px 8px 30px', borderRadius: 6, border: '1px solid #cbd5e1', outline: 'none', fontSize: 13, width: 240 }} />
        </div>
      </div>

      <div style={{ padding: '0 32px 32px', flex: 1, overflow: 'auto' }}>
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['Staff Member', 'Designation', 'Department', 'Infraction', 'Severity', 'Consequence', 'Date', 'Actions'].map(h => (
                  <th key={h} style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#ffedd5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#ea580c', fontSize: 13 }}>
                        {r.name.charAt(0)}
                      </div>
                      <span style={{ fontWeight: 600, color: '#1e293b' }}>{r.name}</span>
                    </div>
                  </td>
                  <td style={tdStyle}>{r.designation}</td>
                  <td style={tdStyle}>{r.department}</td>
                  <td style={tdStyle}><div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><FaExclamationTriangle size={11} color={severityColors[r.severity]?.color} /> {r.infraction}</div></td>
                  <td style={tdStyle}>
                    <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: severityColors[r.severity]?.bg, color: severityColors[r.severity]?.color }}>{r.severity}</span>
                  </td>
                  <td style={tdStyle}>{r.consequence}</td>
                  <td style={tdStyle}>{r.date}</td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
                      <button onClick={() => setViewItem(r)} style={iconBtn}><FaEye size={14} color="#3b82f6" /></button>
                      <button onClick={() => handleDelete(r.id)} style={iconBtn}><FaTrash size={14} color="#ef4444" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan="8" style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>No staff infraction records found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div style={overlay}>
          <div style={modal}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ margin: 0, fontSize: 18, color: '#1e293b' }}>Record Staff Infraction</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><FaTimes size={16} color="#64748b" /></button>
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div><label style={lbl}>Staff Name *</label><input name="name" value={form.name} onChange={handleFormChange} required style={inp} placeholder="Full name" /></div>
                <div><label style={lbl}>Designation</label><input name="designation" value={form.designation} onChange={handleFormChange} style={inp} placeholder="e.g. Teacher" /></div>
                <div><label style={lbl}>Department</label><input name="department" value={form.department} onChange={handleFormChange} style={inp} placeholder="e.g. Science" /></div>
                <div><label style={lbl}>Date *</label><input type="date" name="date" value={form.date} onChange={handleFormChange} required style={inp} /></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div><label style={lbl}>Infraction Type</label>
                  <select name="infraction" value={form.infraction} onChange={handleFormChange} style={inp}>
                    {infractionTypes.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div><label style={lbl}>Severity</label>
                  <select name="severity" value={form.severity} onChange={handleFormChange} style={inp}>
                    <option>Minor</option><option>Moderate</option><option>Severe</option>
                  </select>
                </div>
              </div>
              <div><label style={lbl}>Consequence</label><input name="consequence" value={form.consequence} onChange={handleFormChange} style={inp} placeholder="e.g. Verbal Warning" /></div>
              <div><label style={lbl}>Notes</label><textarea name="notes" value={form.notes} onChange={handleFormChange} rows={2} style={{ ...inp, resize: 'vertical' }} placeholder="Additional notes..." /></div>
              <button type="submit" style={{ background: '#ef4444', color: '#fff', border: 'none', padding: 12, borderRadius: 6, fontWeight: 600, cursor: 'pointer' }}>Record Infraction</button>
            </form>
          </div>
        </div>
      )}

      {viewItem && (
        <div style={overlay}>
          <div style={{ ...modal, width: 420 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ margin: 0, fontSize: 18, color: '#1e293b' }}>Infraction Details</h2>
              <button onClick={() => setViewItem(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><FaTimes size={16} color="#64748b" /></button>
            </div>
            {[['Staff', viewItem.name], ['Designation', viewItem.designation], ['Department', viewItem.department], ['Infraction', viewItem.infraction], ['Severity', viewItem.severity], ['Consequence', viewItem.consequence], ['Date', viewItem.date], ['Notes', viewItem.notes || 'N/A']].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', borderBottom: '1px solid #f1f5f9', padding: '10px 0' }}>
                <span style={{ width: 110, color: '#94a3b8', fontSize: 13, fontWeight: 600 }}>{k}</span>
                <span style={{ flex: 1, color: '#1e293b', fontWeight: 500 }}>{v}</span>
              </div>
            ))}
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
const modal = { background: '#fff', padding: 28, borderRadius: 10, width: 540, maxWidth: '95vw', boxShadow: '0 10px 25px rgba(0,0,0,0.15)', maxHeight: '90vh', overflowY: 'auto' };
const lbl = { display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600, color: '#475569' };
const inp = { width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box', fontSize: 14 };

export default StaffInfraction;
