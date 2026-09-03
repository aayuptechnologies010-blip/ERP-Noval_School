import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaGift } from 'react-icons/fa';

const emptyForm = { title: '', category: 'Academic', description: '', value: '' };

function AppreciationRewards() {
  const [rewards, setRewards] = useState([]);

  React.useEffect(() => {
    fetchRewards();
  }, []);

  const fetchRewards = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/rewards`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setRewards(data.map(item => ({ ...item, id: item._id })));
      }
    } catch (err) {
      console.error('Failed to fetch rewards:', err);
    }
  };
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const handleFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const openAdd = () => { setEditItem(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (item) => { setEditItem(item); setForm({ ...item }); setShowModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title) return alert('Please fill all required fields.');
    try {
      const token = localStorage.getItem('token');
      const url = editItem 
        ? `${import.meta.env.VITE_API_BASE_URL}/api/rewards/${editItem.id}`
        : `${import.meta.env.VITE_API_BASE_URL}/api/rewards`;
        
      const res = await fetch(url, {
        method: editItem ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...form, value: Number(form.value) || 0 })
      });
      
      if (res.ok) {
        fetchRewards();
        setShowModal(false);
      } else {
        alert('Failed to save reward.');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving reward.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this reward?')) {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/rewards/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          fetchRewards();
        } else {
          alert('Failed to delete reward.');
        }
      } catch (err) {
        console.error(err);
        alert('Error deleting reward.');
      }
    }
  };

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '24px 32px 8px 32px' }}>
        <p style={{ margin: '0 0 4px', fontSize: 13, color: '#94a3b8' }}>Discipline › Appreciation</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Define Rewards</h1>
          <button onClick={openAdd} style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
            <FaPlus size={12} /> Add Reward
          </button>
        </div>
      </div>
      <div style={{ padding: '16px 32px 32px 32px', flex: 1, overflow: 'auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {rewards.map(r => (
            <div key={r.id} style={{ background: '#fff', borderRadius: 10, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 14, right: 14, display: 'flex', gap: 8 }}>
                <button onClick={() => openEdit(r)} style={iconBtn} title="Edit"><FaEdit size={13} color="#eab308" /></button>
                <button onClick={() => handleDelete(r.id)} style={iconBtn} title="Delete"><FaTrash size={13} color="#ef4444" /></button>
              </div>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: '#fef9c3', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                <FaGift size={22} color="#ca8a04" />
              </div>
              <h3 style={{ margin: '0 0 6px', fontSize: 16, color: '#1e293b', fontWeight: 700 }}>{r.title}</h3>
              <span style={{ fontSize: 12, fontWeight: 600, background: '#e0e7ff', color: '#4f46e5', padding: '3px 10px', borderRadius: 20 }}>{r.category}</span>
              <p style={{ margin: '12px 0 8px', fontSize: 13, color: '#64748b' }}>{r.description}</p>
              {r.value > 0 && (
                <p style={{ margin: 0, fontSize: 13, color: '#16a34a', fontWeight: 700 }}>₹ {r.value} Value</p>
              )}
            </div>
          ))}
          {rewards.length === 0 && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: 48, color: '#94a3b8' }}>No rewards defined yet.</div>
          )}
        </div>
      </div>

      {showModal && (
        <div style={overlay}>
          <div style={modal}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ margin: 0, fontSize: 18, color: '#1e293b' }}>{editItem ? 'Edit Reward' : 'Add New Reward'}</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><FaTimes size={16} color="#64748b" /></button>
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div><label style={lbl}>Title *</label><input name="title" value={form.title} onChange={handleFormChange} required style={inp} placeholder="e.g. Gold Medal" /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div><label style={lbl}>Category</label>
                  <select name="category" value={form.category} onChange={handleFormChange} style={inp}>
                    {['Academic','Sports','Cultural','Attendance','Discipline','Other'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div><label style={lbl}>Value (₹)</label><input type="number" name="value" value={form.value} onChange={handleFormChange} style={inp} placeholder="0 if non-monetary" /></div>
              </div>
              <div><label style={lbl}>Description</label><textarea name="description" value={form.description} onChange={handleFormChange} rows={3} style={{ ...inp, resize: 'vertical' }} placeholder="Brief description..." /></div>
              <button type="submit" style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: 12, borderRadius: 6, fontWeight: 600, cursor: 'pointer', marginTop: 6 }}>
                {editItem ? 'Update Reward' : 'Save Reward'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const iconBtn = { background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center' };
const overlay = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 };
const modal = { background: '#fff', padding: 28, borderRadius: 10, width: 480, maxWidth: '95vw', boxShadow: '0 10px 25px rgba(0,0,0,0.15)' };
const lbl = { display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600, color: '#475569' };
const inp = { width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box', fontSize: 14 };

export default AppreciationRewards;
