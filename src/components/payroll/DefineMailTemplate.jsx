import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, X, Save } from 'lucide-react';


const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function DefineMailTemplate() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ type: '', emailContent: '', active: true });
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const token = localStorage.getItem('token');
  const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const url = search
        ? `${API_BASE}/api/mail-templates?search=${encodeURIComponent(search)}`
        : `${API_BASE}/api/mail-templates`;
      const res = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
      if (res.ok) {
        const data = await res.json();
        setTemplates(data);
      }
    } catch (err) {
      console.error('Failed to fetch mail templates:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, [search]);

  const handleSave = async () => {
    try {
      const url = editingId
        ? `${API_BASE}/api/mail-templates/${editingId}`
        : `${API_BASE}/api/mail-templates`;
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setShowModal(false);
        setEditingId(null);
        setFormData({ type: '', emailContent: '', active: true });
        fetchTemplates();
      } else {
        const err = await res.json();
        alert(err.message || 'Failed to save template');
      }
    } catch (err) {
      alert('Error saving template');
    }
  };

  const handleEdit = (template) => {
    setEditingId(template._id);
    setFormData({
      type: template.type,
      emailContent: template.emailContent,
      active: template.active
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/api/mail-templates/${id}`, {
        method: 'DELETE',
        headers
      });
      if (res.ok) {
        setDeleteConfirm(null);
        fetchTemplates();
      }
    } catch (err) {
      alert('Error deleting template');
    }
  };

  const displayedTemplates = templates.slice(0, entriesPerPage);

  return (
    <div className="mail-template-container">
      <div className="mail-template-header">
        <input
          type="text"
          className="mail-search-input"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="add-template-btn" onClick={() => {
          setEditingId(null);
          setFormData({ type: '', emailContent: '', active: true });
          setShowModal(true);
        }}>
          <Plus size={16} /> Add New Template
        </button>
      </div>

      <div className="mail-table-wrapper">
        <table className="mail-table">
          <thead>
            <tr>
              <th style={{ width: '80px', textAlign: 'center' }}>Sr. No.</th>
              <th style={{ width: '250px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  E-Mail Type <span className="sort-arrows">↕</span>
                </div>
              </th>
              <th>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  E-Mail <span className="sort-arrows">↕</span>
                </div>
              </th>
              <th style={{ width: '100px', textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                  Active <span className="sort-arrows">↕</span>
                </div>
              </th>
              <th style={{ width: '100px', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>Loading...</td></tr>
            ) : displayedTemplates.length === 0 ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#999' }}>No templates found. Click "Add New Template" to create one.</td></tr>
            ) : (
              displayedTemplates.map((row, index) => (
                <tr key={row._id} className={index % 2 === 0 ? 'row-even' : 'row-odd'}>
                  <td style={{ textAlign: 'center' }}>{index + 1}</td>
                  <td>{row.type}</td>
                  <td>{row.emailContent}</td>
                  <td style={{ textAlign: 'center' }}>{row.active ? 'True' : 'False'}</td>
                  <td>
                    <div className="action-icons">
                      <Edit size={16} color="#6c757d" style={{ cursor: 'pointer' }} onClick={() => handleEdit(row)} />
                      <Trash2 size={16} color="#dc3545" style={{ cursor: 'pointer' }} onClick={() => setDeleteConfirm(row._id)} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mail-pagination">
        Show{' '}
        <select value={entriesPerPage} onChange={(e) => setEntriesPerPage(Number(e.target.value))} className="entries-select">
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
        {' '}entries | Showing {displayedTemplates.length} of {templates.length}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
        }}>
          <div style={{
            backgroundColor: '#fff', borderRadius: '8px', padding: '24px', width: '500px', maxWidth: '90vw', boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>
                {editingId ? 'Edit Template' : 'Add New Template'}
              </h3>
              <X size={20} style={{ cursor: 'pointer', color: '#666' }} onClick={() => setShowModal(false)} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '4px', color: '#333' }}>E-Mail Type *</label>
                <input
                  type="text"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  placeholder="e.g., Salary SMS, Fee Deposition"
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '4px', color: '#333' }}>E-Mail Content</label>
                <textarea
                  value={formData.emailContent}
                  onChange={(e) => setFormData({ ...formData, emailContent: e.target.value })}
                  placeholder="Enter email template content..."
                  rows={4}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', resize: 'vertical', boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  id="activeCheck"
                />
                <label htmlFor="activeCheck" style={{ fontSize: '13px', cursor: 'pointer' }}>Active</label>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '20px' }}>
              <button onClick={() => setShowModal(false)} style={{
                padding: '8px 16px', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#f5f5f5', cursor: 'pointer', fontSize: '13px'
              }}>Cancel</button>
              <button onClick={handleSave} style={{
                padding: '8px 16px', border: 'none', borderRadius: '4px', backgroundColor: '#4a90d9', color: '#fff', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px'
              }}>
                <Save size={14} /> {editingId ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
        }}>
          <div style={{
            backgroundColor: '#fff', borderRadius: '8px', padding: '24px', width: '380px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)', textAlign: 'center'
          }}>
            <Trash2 size={40} color="#dc3545" style={{ marginBottom: '12px' }} />
            <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>Delete Template?</h3>
            <p style={{ color: '#666', fontSize: '13px', margin: '0 0 20px 0' }}>This action cannot be undone.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
              <button onClick={() => setDeleteConfirm(null)} style={{
                padding: '8px 20px', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#f5f5f5', cursor: 'pointer'
              }}>Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} style={{
                padding: '8px 20px', border: 'none', borderRadius: '4px', backgroundColor: '#dc3545', color: '#fff', cursor: 'pointer'
              }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
