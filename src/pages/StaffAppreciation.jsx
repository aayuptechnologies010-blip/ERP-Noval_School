import React, { useState } from 'react';
import { FaSearch, FaPlus, FaEye, FaTimes, FaStar } from 'react-icons/fa';

const appreciationTypes = ['Best Staff Award', 'Most Punctual', 'Best Teacher', 'Innovation Award', 'Leadership Award'];

const dummyStaff = [
  { id: 1, name: 'Miss Priya Sharma', designation: 'Teacher', department: 'Science', appreciation: 'Best Teacher', date: '2023-10-02', points: 10 },
  { id: 2, name: 'Mr. Ramesh Gupta', designation: 'Admin', department: 'Administration', appreciation: 'Most Punctual', date: '2023-10-06', points: 7 },
  { id: 3, name: 'Ms. Kavita Singh', designation: 'Teacher', department: 'English', appreciation: 'Innovation Award', date: '2023-10-11', points: 8 },
  { id: 4, name: 'Mr. Anil Kumar', designation: 'Peon', department: 'Support', appreciation: 'Best Staff Award', date: '2023-10-15', points: 5 },
];

function StaffAppreciation() {
  const [records, setRecords] = useState(dummyStaff);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [viewItem, setViewItem] = useState(null);
  const [form, setForm] = useState({ name: '', designation: '', department: '', appreciation: appreciationTypes[0], date: '', points: '' });

  const handleFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.date) return alert('Please fill all required fields.');
    setRecords([{ ...form, id: Date.now(), points: Number(form.points) || 0 }, ...records]);
    setShowModal(false);
    setForm({ name: '', designation: '', department: '', appreciation: appreciationTypes[0], date: '', points: '' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Remove this appreciation record?')) setRecords(records.filter(r => r.id !== id));
  };

  const filtered = records.filter(r => r.name.toLowerCase().includes(search.toLowerCase()) || r.department.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '24px 32px 8px 32px' }}>
        <p style={{ margin: '0 0 4px', fontSize: 13, color: '#94a3b8' }}>Discipline › Appreciation</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Staff Appreciation</h1>
          <button onClick={() => setShowModal(true)} style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
            <FaPlus size={12} /> Give Appreciation
          </button>
        </div>
      </div>

      <div style={{ padding: '12px 32px', display: 'flex', gap: 12 }}>
        <div style={{ position: 'relative' }}>
          <FaSearch style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={13} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or department..." style={{ padding: '8px 12px 8px 30px', borderRadius: 6, border: '1px solid #cbd5e1', outline: 'none', fontSize: 13, width: 260 }} />
        </div>
      </div>

      <div style={{ padding: '0 32px 32px', flex: 1, overflow: 'auto' }}>
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['Staff Member', 'Designation', 'Department', 'Appreciation', 'Points', 'Date', 'Actions'].map(h => (
                  <th key={h} style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#16a34a', fontSize: 14 }}>
                        {r.name.charAt(0)}
                      </div>
                      <span style={{ fontWeight: 600, color: '#1e293b' }}>{r.name}</span>
                    </div>
                  </td>
                  <td style={tdStyle}>{r.designation}</td>
                  <td style={tdStyle}>{r.department}</td>
                  <td style={tdStyle}><span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><FaStar size={12} color="#ca8a04" /> {r.appreciation}</span></td>
                  <td style={tdStyle}><span style={{ fontWeight: 700, color: '#3b82f6' }}>+{r.points}</span></td>
                  <td style={tdStyle}>{r.date}</td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
                      <button onClick={() => setViewItem(r)} style={iconBtn} title="View"><FaEye size={14} color="#3b82f6" /></button>
                      <button onClick={() => handleDelete(r.id)} style={iconBtn} title="Remove"><FaTimes size={14} color="#ef4444" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan="7" style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>No staff appreciation records found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div style={overlay}>
          <div style={modal}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ margin: 0, fontSize: 18, color: '#1e293b' }}>Give Appreciation to Staff</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><FaTimes size={16} color="#64748b" /></button>
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div><label style={lbl}>Staff Name *</label><input name="name" value={form.name} onChange={handleFormChange} required style={inp} placeholder="Full name" /></div>
                <div><label style={lbl}>Designation</label><input name="designation" value={form.designation} onChange={handleFormChange} style={inp} placeholder="e.g. Teacher" /></div>
                <div><label style={lbl}>Department</label><input name="department" value={form.department} onChange={handleFormChange} style={inp} placeholder="e.g. Science" /></div>
                <div><label style={lbl}>Date *</label><input type="date" name="date" value={form.date} onChange={handleFormChange} required style={inp} /></div>
              </div>
              <div><label style={lbl}>Appreciation Type</label>
                <select name="appreciation" value={form.appreciation} onChange={handleFormChange} style={inp}>
                  {appreciationTypes.map(a => <option key={a}>{a}</option>)}
                </select>
              </div>
              <div><label style={lbl}>Points</label><input type="number" name="points" value={form.points} onChange={handleFormChange} style={inp} placeholder="Points awarded" /></div>
              <button type="submit" style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: 12, borderRadius: 6, fontWeight: 600, cursor: 'pointer', marginTop: 6 }}>Save Appreciation</button>
            </form>
          </div>
        </div>
      )}

      {viewItem && (
        <div style={overlay}>
          <div style={{ ...modal, width: 400 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ margin: 0, fontSize: 18, color: '#1e293b' }}>Appreciation Details</h2>
              <button onClick={() => setViewItem(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><FaTimes size={16} color="#64748b" /></button>
            </div>
            {[['Name', viewItem.name], ['Designation', viewItem.designation], ['Department', viewItem.department], ['Appreciation', viewItem.appreciation], ['Points', `+${viewItem.points}`], ['Date', viewItem.date]].map(([k, v]) => (
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

const thStyle = { padding: '14px 16px', textAlign: 'left', fontSize: 13, fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', whiteSpace: 'nowrap' };
const tdStyle = { padding: '14px 16px', fontSize: 14, color: '#475569', verticalAlign: 'middle' };
const iconBtn = { background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center' };
const overlay = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 };
const modal = { background: '#fff', padding: 28, borderRadius: 10, width: 520, maxWidth: '95vw', boxShadow: '0 10px 25px rgba(0,0,0,0.15)' };
const lbl = { display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600, color: '#475569' };
const inp = { width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box', fontSize: 14 };

export default StaffAppreciation;
