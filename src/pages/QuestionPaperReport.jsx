import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaEye, FaTimes, FaFileAlt, FaFileExcel } from 'react-icons/fa';
import { toast } from 'react-toastify';

const statusColors = {
  Published: { bg: '#dcfce7', color: '#16a34a' },
  Draft: { bg: '#fef9c3', color: '#ca8a04' },
};

const emptyForm = { title: '', subject: '', class: 'Class 6', teacher: '', totalMarks: '', duration: '', date: '', status: 'Draft' };
const API = `${import.meta.env.VITE_API_BASE_URL}/api`;
const authHeader = () => ({ 'Authorization': `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json' });

function QuestionPaperReport() {
  const [papers, setPapers] = useState([]);
  const [summary, setSummary] = useState({ total: 0, published: 0, drafts: 0 });
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [viewItem, setViewItem] = useState(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => { fetchPapers(); }, []);

  const fetchPapers = async () => {
    try {
      const res = await fetch(`${API}/reports/question-papers`, { headers: authHeader() });
      if (res.ok) {
        const data = await res.json();
        setPapers(data.records || []);
        if (data.summary) setSummary(data.summary);
      }
    } catch (err) { console.error(err); }
  };

  const handleFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const openAdd = () => { setEditItem(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (p) => { setEditItem(p); setForm({ ...p, date: p.date ? p.date.substring(0, 10) : '' }); setShowModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editItem ? `${API}/question-papers/${editItem.id}` : `${API}/question-papers`;
      const method = editItem ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: authHeader(), body: JSON.stringify(form) });
      if (res.ok) {
        toast.success(editItem ? 'Paper updated!' : 'Paper created!');
        setShowModal(false);
        fetchPapers();
      } else {
        const d = await res.json();
        toast.error(d.message || 'Failed to save.');
      }
    } catch (err) { toast.error('Server error.'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this question paper?')) return;
    try {
      const res = await fetch(`${API}/question-papers/${id}`, { method: 'DELETE', headers: authHeader() });
      if (res.ok) { toast.success('Deleted!'); fetchPapers(); }
      else toast.error('Failed to delete.');
    } catch (err) { toast.error('Server error.'); }
  };

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '24px 32px 8px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ margin: '0 0 4px', fontSize: 13, color: '#94a3b8' }}>Report &rsaquo;</p>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Question Paper</h1>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#10b981', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}><FaFileExcel /> Export</button>
          <button onClick={openAdd} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#3b82f6', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}><FaPlus size={12} /> Add Paper</button>
        </div>
      </div>

      <div style={{ padding: '16px 32px 32px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Stats */}
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {[
            { label: 'Total Papers', val: summary.total, color: '#3b82f6', bg: '#eff6ff' },
            { label: 'Published', val: summary.published, color: '#16a34a', bg: '#dcfce7' },
            { label: 'Draft', val: summary.drafts, color: '#ca8a04', bg: '#fef9c3' },
          ].map((s, i) => (
            <div key={i} style={{ flex: '1 1 180px', background: '#fff', borderRadius: 8, padding: '20px 24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 46, height: 46, borderRadius: 10, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 800, color: s.color }}>{s.val}</div>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#475569' }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Table */}
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['Title', 'Subject', 'Class', 'Teacher', 'Marks', 'Duration', 'Date', 'Status', 'Actions'].map(h => (
                  <th key={h} style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {papers.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 34, height: 34, borderRadius: 8, background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FaFileAlt size={14} color="#3b82f6" />
                      </div>
                      <span style={{ fontWeight: 600, color: '#1e293b', maxWidth: 160, display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.title}</span>
                    </div>
                  </td>
                  <td style={tdStyle}>{p.subject}</td>
                  <td style={tdStyle}>{p.class}</td>
                  <td style={tdStyle}>{p.teacher}</td>
                  <td style={tdStyle}>{p.totalMarks}</td>
                  <td style={tdStyle}>{p.duration}</td>
                  <td style={tdStyle}>{p.date}</td>
                  <td style={tdStyle}>
                    <span style={{ padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: statusColors[p.status]?.bg, color: statusColors[p.status]?.color }}>{p.status}</span>
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
                      <button onClick={() => setViewItem(p)} style={iconBtn}><FaEye size={13} color="#3b82f6" /></button>
                      <button onClick={() => openEdit(p)} style={iconBtn}><FaEdit size={13} color="#eab308" /></button>
                      <button onClick={() => handleDelete(p.id)} style={iconBtn}><FaTrash size={13} color="#ef4444" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {papers.length === 0 && <tr><td colSpan="9" style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>No question papers found.</td></tr>}
            </tbody>
          </table>
        </div>

      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div style={overlay}>
          <div style={modal}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ margin: 0, fontSize: 18, color: '#1e293b' }}>{editItem ? 'Edit Paper' : 'Add Question Paper'}</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><FaTimes size={16} color="#64748b" /></button>
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div><label style={lbl}>Paper Title *</label><input name="title" value={form.title} onChange={handleFormChange} required style={inp} placeholder="e.g. Mid-Term Math Exam" /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div><label style={lbl}>Subject</label><input name="subject" value={form.subject} onChange={handleFormChange} style={inp} /></div>
                <div><label style={lbl}>Class</label>
                  <select name="class" value={form.class} onChange={handleFormChange} style={inp}>
                    {['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div><label style={lbl}>Teacher</label><input name="teacher" value={form.teacher} onChange={handleFormChange} style={inp} /></div>
                <div><label style={lbl}>Total Marks</label><input type="number" name="totalMarks" value={form.totalMarks} onChange={handleFormChange} style={inp} /></div>
                <div><label style={lbl}>Duration</label><input name="duration" value={form.duration} onChange={handleFormChange} style={inp} placeholder="e.g. 2 Hours" /></div>
                <div><label style={lbl}>Date</label><input type="date" name="date" value={form.date} onChange={handleFormChange} style={inp} /></div>
              </div>
              <div><label style={lbl}>Status</label>
                <select name="status" value={form.status} onChange={handleFormChange} style={inp}>
                  <option>Draft</option><option>Published</option>
                </select>
              </div>
              <button type="submit" style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: 12, borderRadius: 6, fontWeight: 600, cursor: 'pointer', marginTop: 6 }}>
                {editItem ? 'Update Paper' : 'Create Paper'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewItem && (
        <div style={overlay}>
          <div style={{ ...modal, width: 420 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ margin: 0, fontSize: 18, color: '#1e293b' }}>Paper Details</h2>
              <button onClick={() => setViewItem(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><FaTimes size={16} color="#64748b" /></button>
            </div>
            {[['Title', viewItem.title], ['Subject', viewItem.subject], ['Class', viewItem.class], ['Teacher', viewItem.teacher], ['Total Marks', viewItem.totalMarks], ['Duration', viewItem.duration], ['Date', viewItem.date], ['Status', viewItem.status]].map(([k, v]) => (
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
const modal = { background: '#fff', padding: 28, borderRadius: 10, width: 540, maxWidth: '95vw', boxShadow: '0 10px 25px rgba(0,0,0,0.15)', maxHeight: '90vh', overflowY: 'auto' };
const lbl = { display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600, color: '#475569' };
const inp = { width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box', fontSize: 14 };

export default QuestionPaperReport;
