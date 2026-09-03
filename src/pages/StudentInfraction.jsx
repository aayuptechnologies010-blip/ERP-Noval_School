import React, { useState, useEffect } from 'react';
import { FaSearch, FaPlus, FaEye, FaTimes, FaExclamationCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';

const classes = ['All', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'];
const infractionTypes = ['Bullying', 'Late Arrival', 'Disrespectful Behavior', 'Dress Code Violation', 'Cheating'];

function StudentInfraction() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [filterClass, setFilterClass] = useState('All');
  const [search, setSearch] = useState('');
  
  const [showModal, setShowModal] = useState(false);
  const [viewItem, setViewItem] = useState(null);
  
  const [form, setForm] = useState({ 
    studentName: '', studentClass: 'Class 6', rollNo: '', 
    infractionType: infractionTypes[0], date: '', severity: 'Low', consequence: '', notes: '' 
  });

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (filterClass !== 'All') params.append('studentClass', filterClass);

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/student-infractions?${params.toString()}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setRecords(data);
      }
    } catch (e) {
      console.error(e);
      toast.error('Failed to fetch infractions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [filterClass, search]);

  const handleFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.studentName || !form.rollNo || !form.date || !form.infractionType || !form.consequence) {
      return toast.error('Please fill all required fields.');
    }

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/student-infractions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        toast.success("Infraction recorded successfully!");
        setShowModal(false);
        setForm({ studentName: '', studentClass: 'Class 6', rollNo: '', infractionType: infractionTypes[0], date: '', severity: 'Low', consequence: '', notes: '' });
        fetchRecords();
      } else {
        const err = await res.json();
        toast.error(err.message || 'Failed to record infraction');
      }
    } catch (e) {
      console.error(e);
      toast.error('Error recording infraction');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this infraction record?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/student-infractions/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        toast.success("Record deleted");
        fetchRecords();
      } else {
        toast.error("Failed to delete");
      }
    } catch (e) {
      console.error(e);
      toast.error("Error deleting record");
    }
  };

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '24px 32px 8px 32px' }}>
        <p style={{ margin: '0 0 4px', fontSize: 13, color: '#94a3b8' }}>Discipline › Infractions</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Student Infractions</h1>
          <button onClick={() => setShowModal(true)} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
            <FaPlus size={12} /> Record Infraction
          </button>
        </div>
      </div>

      {/* Filters */}
      <div style={{ padding: '12px 32px', display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative' }}>
          <FaSearch style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={13} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or roll no..." style={{ padding: '8px 12px 8px 30px', borderRadius: 6, border: '1px solid #cbd5e1', outline: 'none', fontSize: 13, width: 220 }} />
        </div>
        <select value={filterClass} onChange={e => setFilterClass(e.target.value)} style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #cbd5e1', outline: 'none', fontSize: 13 }}>
          {classes.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Table */}
      <div style={{ padding: '0 32px 32px', flex: 1, overflow: 'auto' }}>
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['Student', 'Roll No.', 'Class', 'Infraction Type', 'Severity', 'Date', 'Actions'].map(h => (
                  <th key={h} style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && <tr><td colSpan="7" style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>Loading...</td></tr>}
              {!loading && records.map(r => (
                <tr key={r._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#b91c1c', fontSize: 14 }}>
                        {r.studentName ? r.studentName.charAt(0) : '?'}
                      </div>
                      <span style={{ fontWeight: 600, color: '#1e293b' }}>{r.studentName}</span>
                    </div>
                  </td>
                  <td style={tdStyle}>{r.rollNo}</td>
                  <td style={tdStyle}>{r.studentClass}</td>
                  <td style={tdStyle}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <FaExclamationCircle size={12} color="#ef4444" /> {r.infractionType}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <span style={{ 
                      padding: '4px 8px', borderRadius: 4, fontSize: 11, fontWeight: 700,
                      background: r.severity === 'High' ? '#fee2e2' : r.severity === 'Medium' ? '#fef3c7' : '#e0e7ff',
                      color: r.severity === 'High' ? '#b91c1c' : r.severity === 'Medium' ? '#b45309' : '#4338ca' 
                    }}>
                      {r.severity}
                    </span>
                  </td>
                  <td style={tdStyle}>{r.date ? new Date(r.date).toLocaleDateString() : ''}</td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
                      <button onClick={() => setViewItem(r)} style={iconBtn} title="View"><FaEye size={14} color="#3b82f6" /></button>
                      <button onClick={() => handleDelete(r._id)} style={iconBtn} title="Remove"><FaTimes size={14} color="#ef4444" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && records.length === 0 && (
                <tr><td colSpan="7" style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>No infraction records found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showModal && (
        <div style={overlay}>
          <div style={modal}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ margin: 0, fontSize: 18, color: '#1e293b' }}>Record Student Infraction</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><FaTimes size={16} color="#64748b" /></button>
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div><label style={lbl}>Student Name *</label><input name="studentName" value={form.studentName} onChange={handleFormChange} required style={inp} placeholder="Full name" /></div>
                <div><label style={lbl}>Roll No. *</label><input name="rollNo" value={form.rollNo} onChange={handleFormChange} required style={inp} placeholder="e.g. 1001" /></div>
                <div><label style={lbl}>Class *</label>
                  <select name="studentClass" value={form.studentClass} onChange={handleFormChange} style={inp}>
                    {classes.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div><label style={lbl}>Date *</label><input type="date" name="date" value={form.date} onChange={handleFormChange} required style={inp} /></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div><label style={lbl}>Infraction Type *</label>
                  <select name="infractionType" value={form.infractionType} onChange={handleFormChange} style={inp}>
                    {infractionTypes.map(a => <option key={a}>{a}</option>)}
                  </select>
                </div>
                <div><label style={lbl}>Severity</label>
                  <select name="severity" value={form.severity} onChange={handleFormChange} style={inp}>
                    <option>Low</option><option>Medium</option><option>High</option>
                  </select>
                </div>
              </div>
              <div><label style={lbl}>Consequence *</label><input type="text" name="consequence" value={form.consequence} onChange={handleFormChange} required style={inp} placeholder="e.g. Warning, Detention" /></div>
              <div><label style={lbl}>Additional Notes</label><textarea name="notes" value={form.notes} onChange={handleFormChange} style={{ ...inp, resize: 'vertical', minHeight: 60 }} placeholder="Optional notes" /></div>
              
              <button type="submit" style={{ background: '#ef4444', color: '#fff', border: 'none', padding: 12, borderRadius: 6, fontWeight: 600, cursor: 'pointer', marginTop: 6 }}>Save Record</button>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewItem && (
        <div style={overlay}>
          <div style={{ ...modal, width: 450 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ margin: 0, fontSize: 18, color: '#1e293b' }}>Infraction Details</h2>
              <button onClick={() => setViewItem(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><FaTimes size={16} color="#64748b" /></button>
            </div>
            {[['Student', viewItem.studentName], ['Roll No.', viewItem.rollNo], ['Class', viewItem.studentClass], 
              ['Infraction', viewItem.infractionType], ['Severity', viewItem.severity], 
              ['Consequence', viewItem.consequence], ['Date', viewItem.date ? new Date(viewItem.date).toLocaleDateString() : ''], 
              ['Notes', viewItem.notes || 'N/A']].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', borderBottom: '1px solid #f1f5f9', padding: '10px 0' }}>
                <span style={{ width: 120, color: '#94a3b8', fontSize: 13, fontWeight: 600 }}>{k}</span>
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

export default StudentInfraction;
