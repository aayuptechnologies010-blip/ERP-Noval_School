import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, Download, X, Save } from 'lucide-react';


const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function DefineStaffDocumentType() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ type: '' });
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [activeTab, setActiveTab] = useState('type');

  const token = localStorage.getItem('token');
  const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/staff-document-types`, { headers: { 'Authorization': `Bearer ${token}` } });
      if (res.ok) {
        let result = await res.json();
        if (search) {
          result = result.filter(item => item.type.toLowerCase().includes(search.toLowerCase()));
        }
        setData(result);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  const handleSave = async () => {
    try {
      const url = editingId ? `${API_BASE}/api/staff-document-types/${editingId}` : `${API_BASE}/api/staff-document-types`;
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers, body: JSON.stringify(formData) });
      if (res.ok) {
        setShowModal(false);
        setEditingId(null);
        setFormData({ type: '' });
        fetchData();
      }
    } catch (err) {
      alert('Error saving data');
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/api/staff-document-types/${id}`, { method: 'DELETE', headers });
      if (res.ok) {
        setDeleteConfirm(null);
        fetchData();
      }
    } catch (err) {
      alert('Error deleting data');
    }
  };

  return (
    <div className="mail-template-container">
      <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', padding: '20px', borderBottom: '1px solid #dee2e6' }}>
        <label className="checkbox-label" style={{ fontWeight: 'normal', color: activeTab === 'type' ? '#159BD7' : '#495057' }}>
          <input type="radio" checked={activeTab === 'type'} onChange={() => setActiveTab('type')} /> Define Document Type
        </label>
        <label className="checkbox-label" style={{ fontWeight: 'normal', color: activeTab === 'doc' ? '#159BD7' : '#495057' }}>
          <input type="radio" checked={activeTab === 'doc'} onChange={() => setActiveTab('doc')} /> Define Document
        </label>
      </div>

      <div className="mail-template-header" style={{ marginTop: '10px' }}>
        <input 
          type="text" 
          className="mail-search-input" 
          placeholder="Search" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="add-template-btn" onClick={() => { setEditingId(null); setFormData({ type: '' }); setShowModal(true); }}>
            <Plus size={16} /> Add New Document Type
          </button>
        </div>
      </div>
      
      <div className="mail-table-wrapper">
        <table className="mail-table">
          <thead>
            <tr>
              <th style={{ width: '80px', textAlign: 'center' }}>Sr No.</th>
              <th>Document Type</th>
              <th style={{ width: '100px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="3" style={{ textAlign: 'center', padding: '20px' }}>Loading...</td></tr>
            ) : data.length === 0 ? (
              <tr><td colSpan="3" style={{ textAlign: 'center', padding: '20px' }}>No records found</td></tr>
            ) : (
              data.map((row, index) => (
                <tr key={row._id} className={index % 2 === 0 ? 'row-even' : 'row-odd'}>
                  <td style={{ textAlign: 'center' }}>{index + 1}</td>
                  <td>{row.type}</td>
                  <td style={{ textAlign: 'center' }}>
                    <div className="action-icons" style={{ justifyContent: 'center' }}>
                      <Edit size={16} color="#6c757d" style={{ cursor: 'pointer' }} onClick={() => { setEditingId(row._id); setFormData(row); setShowModal(true); }} />
                      <Trash2 size={16} color="#dc3545" style={{ cursor: 'pointer' }} onClick={() => setDeleteConfirm(row._id)} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '24px', width: '400px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0 }}>{editingId ? 'Edit Document Type' : 'Add Document Type'}</h3>
              <X size={20} style={{ cursor: 'pointer' }} onClick={() => setShowModal(false)} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label>Document Type</label>
                <input type="text" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '20px' }}>
              <button onClick={() => setShowModal(false)} style={{ padding: '8px 16px', borderRadius: '4px' }}>Cancel</button>
              <button onClick={handleSave} style={{ padding: '8px 16px', borderRadius: '4px', backgroundColor: '#4a90d9', color: '#fff' }}>Save</button>
            </div>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '24px', textAlign: 'center' }}>
            <h3>Delete Record?</h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
              <button onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} style={{ backgroundColor: '#dc3545', color: '#fff', padding: '8px 16px' }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
