import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaVideo, FaTrash, FaEdit } from 'react-icons/fa';

function ManageParentsStatus() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [statusName, setStatusName] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/parents-status`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) { const data = await res.json(); setItems(data || []); }
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!statusName.trim()) return;
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const url = editId
        ? `${import.meta.env.VITE_API_BASE_URL}/api/parents-status/${editId}`
        : `${import.meta.env.VITE_API_BASE_URL}/api/parents-status`;
      const res = await fetch(url, {
        method: editId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ statusName })
      });
      if (res.ok) { setStatusName(''); setEditId(null); fetchItems(); }
      else { const err = await res.json(); alert(err.message || 'Failed to save'); }
    } catch (e) { alert('Error saving parents status'); }
    finally { setSaving(false); }
  };

  const handleEdit = (item) => { setStatusName(item.statusName); setEditId(item._id); };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this status?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/parents-status/${id}`, {
        method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) fetchItems();
      else alert('Failed to delete parents status');
    } catch (e) { alert('Error deleting parents status'); }
  };

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '24px 32px 12px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Manage Parents Status</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#22c55e', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}><FaVideo /> Video Tutorial</span>
          <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#475569', fontSize: 14, fontWeight: 600, cursor: 'pointer', background: 'none', border: 'none' }}>
            <FaArrowLeft style={{ fontSize: 12 }} /> Go Back
          </button>
        </div>
      </div>
      <div style={{ padding: '0 32px 32px 32px', display: 'flex', gap: 24, flex: 1, overflow: 'hidden' }}>
        <div style={{ width: 350, background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', height: 'fit-content' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#334155', marginBottom: 20 }}>{editId ? 'Edit Status' : 'Add New Status'}</h2>
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#475569', fontWeight: 600, marginBottom: 8 }}>Status Name</label>
              <input type="text" value={statusName} onChange={e => setStatusName(e.target.value)} placeholder="e.g. Married, Divorced"
                style={{ width: '100%', border: '1px solid #e2e8f0', borderRadius: 6, padding: '10px 14px', fontSize: 14, outline: 'none' }} required />
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 10 }}>
              <button type="submit" disabled={saving} style={{ flex: 1, background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 6, padding: 10, fontSize: 14, fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer' }}>
                {saving ? 'Saving...' : (editId ? 'Update' : 'Save')}
              </button>
              {editId && <button type="button" onClick={() => { setEditId(null); setStatusName(''); }} style={{ background: '#f1f5f9', color: '#64748b', border: 'none', borderRadius: 6, padding: '10px 16px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>}
            </div>
          </form>
        </div>
        <div style={{ flex: 1, background: '#fff', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  <th style={thStyle}>Sl. No.</th><th style={thStyle}>Status Name</th><th style={thStyle}>Status (Active)</th><th style={thStyle} width="120">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading && <tr><td colSpan="4" style={{ padding: 20, textAlign: 'center', color: '#64748b' }}>Loading...</td></tr>}
                {!loading && items.map((item, idx) => (
                  <tr key={item._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={tdStyle}>{idx + 1}</td>
                    <td style={{ ...tdStyle, fontWeight: 600, color: '#334155' }}>{item.statusName}</td>
                    <td style={tdStyle}>
                      <span style={{ padding: '4px 8px', borderRadius: 4, fontSize: 12, fontWeight: 600, background: item.isActive !== false ? '#dcfce7' : '#fee2e2', color: item.isActive !== false ? '#166534' : '#991b1b' }}>
                        {item.isActive !== false ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td style={tdStyle}>
                      <div style={{ display: 'flex', gap: 12 }}>
                        <button onClick={() => handleEdit(item)} style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', padding: 4 }}><FaEdit size={15} /></button>
                        <button onClick={() => handleDelete(item._id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: 4 }}><FaTrash size={15} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!loading && items.length === 0 && <tr><td colSpan="4" style={{ padding: 20, textAlign: 'center', color: '#64748b' }}>No statuses found.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

const thStyle = { padding: '16px 20px', textAlign: 'left', fontSize: 13, fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap', borderBottom: '2px solid #e2e8f0' };
const tdStyle = { padding: '12px 20px', fontSize: 13, color: '#475569', whiteSpace: 'nowrap' };

export default ManageParentsStatus;
