import React, { useState, useEffect } from 'react';
import { Save, Eye, Printer, XCircle, Trash2, Edit } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function DefineConcessionType() {
  const [concessionTypes, setConcessionTypes] = useState([]);
  const [name, setName] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const showToast = (msg, type = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const fetchConcessionTypes = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/concession-types`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setConcessionTypes(data);
      }
    } catch (error) {
      console.error('Error fetching:', error);
    }
  };

  useEffect(() => {
    fetchConcessionTypes();
  }, []);

  const handleSave = async () => {
    if (!name) {
      showToast('Please enter Concession Type name', 'error');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const method = selectedId ? 'PUT' : 'POST';
      const url = selectedId ? `${API_URL}/api/concession-types/${selectedId}` : `${API_URL}/api/concession-types`;
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name })
      });

      if (res.ok) {
        showToast(selectedId ? 'Concession Type Updated' : 'Concession Type Saved');
        setName('');
        setSelectedId(null);
        fetchConcessionTypes();
      } else {
        const err = await res.json();
        showToast(err.message || 'Error saving', 'error');
      }
    } catch (error) {
      showToast('Network error', 'error');
    }
  };

  const handleEdit = (item) => {
    setName(item.name);
    setSelectedId(item._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this Concession Type?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/concession-types/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        showToast('Concession Type Deleted');
        fetchConcessionTypes();
      } else {
        showToast('Error deleting', 'error');
      }
    } catch (error) {
      showToast('Network error', 'error');
    }
  };

  const handleReset = () => {
    setName('');
    setSelectedId(null);
  };

  return (
    <div style={{ padding: '40px', background: '#fff', minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
      
      {toastMessage && (
        <div style={{ position: 'absolute', top: '24px', right: '24px', backgroundColor: toastType === 'success' ? '#4ade80' : '#ef4444', color: '#fff', padding: '12px 24px', borderRadius: '4px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', zIndex: 1000, fontWeight: 500, fontSize: '14px' }}>
          {toastMessage}
        </div>
      )}

      <div style={{ width: '100%', maxWidth: '700px' }}>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>Concession Type</label>
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px', marginBottom: '30px' }} 
        />
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '40px' }}>
          <button onClick={handleSave} style={{ background: '#fff', color: '#4ade80', border: '1px solid #4ade80', padding: '6px 16px', borderRadius: '4px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            <Save size={14} /> {selectedId ? 'Update' : 'Save'}
          </button>
          <button onClick={fetchConcessionTypes} style={{ background: '#fff', color: '#3b82f6', border: '1px solid #3b82f6', padding: '6px 16px', borderRadius: '4px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            <Eye size={14} /> View
          </button>
          <button style={{ background: '#fff', color: '#3b82f6', border: '1px solid #3b82f6', padding: '6px 16px', borderRadius: '4px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            <Printer size={14} /> Print
          </button>
          <button onClick={handleReset} style={{ background: '#fff', color: '#f59e0b', border: '1px solid #f59e0b', padding: '6px 16px', borderRadius: '4px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            <XCircle size={14} /> Reset
          </button>
        </div>
      </div>

      <div style={{ width: '100%', maxWidth: '700px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #e2e8f0', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333', fontWeight: 600, width: '80px' }}>Sr No.</th>
              <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333', fontWeight: 600 }}>Concession Type Name</th>
              <th style={{ padding: '12px', textAlign: 'center', color: '#333', fontWeight: 600, width: '100px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {concessionTypes.map((item, index) => (
              <tr key={item._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '10px 12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#095484' }}>{index + 1}</td>
                <td style={{ padding: '10px 12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333' }}>{item.name}</td>
                <td style={{ padding: '10px 12px', textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '12px' }}>
                  <Edit size={14} color="#64748b" style={{ cursor: 'pointer' }} onClick={() => handleEdit(item)} />
                  <Trash2 size={14} color="#ef4444" style={{ cursor: 'pointer' }} onClick={() => handleDelete(item._id)} />
                </td>
              </tr>
            ))}
            {concessionTypes.length === 0 && (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>No Concession Types Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
