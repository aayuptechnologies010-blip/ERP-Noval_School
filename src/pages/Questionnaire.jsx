import React, { useState, useEffect } from 'react';
import { FaFileSignature, FaPlus, FaEye, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';

function Questionnaire() {
  const [questionnaires, setQuestionnaires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newQTitle, setNewQTitle] = useState('');
  const [newQAudience, setNewQAudience] = useState('Students');
  const [newQStatus, setNewQStatus] = useState('Active');

  useEffect(() => {
    fetchQuestionnaires();
  }, []);

  const fetchQuestionnaires = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/questionnaires`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setQuestionnaires(Array.isArray(data) ? data : (data.records || data.questionnaires || []));
      }
    } catch (error) {
      console.error('Error fetching questionnaires:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this questionnaire?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/questionnaires/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) fetchQuestionnaires();
      } catch (error) {
        console.error('Error deleting questionnaire:', error);
      }
    }
  };

  const handleCreateNew = async (e) => {
    e.preventDefault();
    if (!newQTitle.trim()) return alert('Please enter a title');
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/questionnaires`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title: newQTitle, targetAudience: newQAudience, status: newQStatus })
      });
      if (response.ok) {
        fetchQuestionnaires();
        setShowModal(false);
        setNewQTitle('');
        setNewQAudience('Students');
        setNewQStatus('Active');
      } else {
        alert('Failed to create questionnaire.');
      }
    } catch (error) {
      console.error('Error creating questionnaire:', error);
      alert('An error occurred.');
    }
  };

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Header Bar */}
      <div style={{ padding: '24px 32px 16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Questionnaire Management</h1>
        <button 
          onClick={() => setShowModal(true)}
          style={{ background: '#5cb85c', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: 4, fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
        >
          <FaPlus size={12} /> Create New
        </button>
      </div>

      {/* Main Content Card */}
      <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflowX: 'auto' }}>
          
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                <th style={thStyle}>Title</th>
                <th style={thStyle}>Target Audience</th>
                <th style={thStyle}>Created Date</th>
                <th style={thStyle}>Status</th>
                <th style={{ ...thStyle, textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {questionnaires.map((q) => (
                <tr key={q._id || q.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <FaFileSignature size={16} color="#94a3b8" />
                      <span style={{ fontWeight: 600, color: '#334155' }}>{q.title}</span>
                    </div>
                  </td>
                  <td style={tdStyle}>{q.audience}</td>
                  <td style={tdStyle}>{q.createdAt ? new Date(q.createdAt).toLocaleDateString() : q.date}</td>
                  <td style={tdStyle}>
                    <span style={{ 
                      padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                      background: q.status === 'Active' ? '#dcfce7' : '#fee2e2',
                      color: q.status === 'Active' ? '#16a34a' : '#ef4444'
                    }}>
                      {q.status}
                    </span>
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
                      <button style={actionBtn} title="View"><FaEye size={14} color="#3b82f6" /></button>
                      <button style={actionBtn} title="Edit"><FaEdit size={14} color="#eab308" /></button>
                      <button style={actionBtn} title="Delete" onClick={() => handleDelete(q._id || q.id)}><FaTrash size={14} color="#ef4444" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {questionnaires.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '32px', color: '#94a3b8' }}>
                    No questionnaires available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

        </div>
      </div>

      {/* Create New Modal */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: 32, borderRadius: 8, width: 400, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ margin: 0, fontSize: 18, color: '#1e293b' }}>Create New Questionnaire</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><FaTimes size={16} color="#64748b" /></button>
            </div>
            <form onSubmit={handleCreateNew} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 600, color: '#475569' }}>Title</label>
                <input 
                  type="text" 
                  value={newQTitle}
                  onChange={e => setNewQTitle(e.target.value)}
                  placeholder="e.g. Annual Survey" 
                  style={{ width: '100%', padding: 10, borderRadius: 4, border: '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box' }}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 600, color: '#475569' }}>Target Audience</label>
                <select 
                  value={newQAudience}
                  onChange={e => setNewQAudience(e.target.value)}
                  style={{ width: '100%', padding: 10, borderRadius: 4, border: '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box' }}
                >
                  <option value="Students">Students</option>
                  <option value="Parents">Parents</option>
                  <option value="Staff">Staff</option>
                  <option value="General">General</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 600, color: '#475569' }}>Status</label>
                <select 
                  value={newQStatus}
                  onChange={e => setNewQStatus(e.target.value)}
                  style={{ width: '100%', padding: 10, borderRadius: 4, border: '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box' }}
                >
                  <option value="Active">Active</option>
                  <option value="Closed">Closed</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
              <button type="submit" style={{ marginTop: 16, background: '#3b82f6', color: '#fff', border: 'none', padding: 12, borderRadius: 4, fontWeight: 600, cursor: 'pointer' }}>
                Create Questionnaire
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

const thStyle = {
  padding: '16px',
  textAlign: 'left',
  fontSize: 13,
  fontWeight: 700,
  color: '#0f172a',
  borderBottom: '2px solid #e2e8f0',
  whiteSpace: 'nowrap'
};

const tdStyle = {
  padding: '16px',
  fontSize: 14,
  color: '#475569'
};

const actionBtn = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 4,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

export default Questionnaire;
