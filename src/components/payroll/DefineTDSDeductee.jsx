import React, { useState, useEffect } from 'react';
import { Save, RefreshCw, AlertCircle, CheckCircle, Edit, Trash2, Check, UserCheck } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function DefineTDSDeductee() {
  const [deductees, setDeductees] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form State
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    designation: '',
    place: '',
    pan: '',
    tan: '',
    isPrimary: true
  });

  // Notification
  const [statusMessage, setStatusMessage] = useState(null);

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  const showNotification = (type, text) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const [deducteeRes, desigRes] = await Promise.all([
        fetch(`${API_BASE}/api/tds-deductee`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${API_BASE}/api/designations`, { headers: { 'Authorization': `Bearer ${token}` } })
      ]);

      if (deducteeRes.ok) {
        const dData = await deducteeRes.json();
        setDeductees(Array.isArray(dData) ? dData : []);
        
        // If we're not currently editing, pre-fill with primary or first deductee
        if (Array.isArray(dData) && dData.length > 0 && !editingId) {
          const primary = dData.find(d => d.isPrimary) || dData[0];
          setEditingId(primary._id);
          setFormData({
            name: primary.name || '',
            fatherName: primary.fatherName || '',
            designation: primary.designation || '',
            place: primary.place || '',
            pan: primary.pan || '',
            tan: primary.tan || '',
            isPrimary: primary.isPrimary !== undefined ? primary.isPrimary : true
          });
        }
      }

      if (desigRes.ok) {
        const desData = await desigRes.json();
        setDesignations(Array.isArray(desData) ? desData : []);
      }
    } catch (err) {
      console.error('Error fetching TDS deductee details:', err);
      showNotification('error', 'Server error while loading TDS Deductee info');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Deductee Name is required');
      return;
    }

    try {
      setSaving(true);
      const url = editingId 
        ? `${API_BASE}/api/tds-deductee/${editingId}`
        : `${API_BASE}/api/tds-deductee`;
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        const saved = await res.json();
        showNotification('success', `TDS Deductee "${saved.name}" saved successfully!`);
        fetchData();
      } else {
        const err = await res.json();
        showNotification('error', err.message || 'Failed to save TDS Deductee');
      }
    } catch (err) {
      console.error('Error saving TDS deductee:', err);
      showNotification('error', 'Server error while saving TDS deductee');
    } finally {
      setSaving(false);
    }
  };

  const handleSelectToEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      name: item.name || '',
      fatherName: item.fatherName || '',
      designation: item.designation || '',
      place: item.place || '',
      pan: item.pan || '',
      tan: item.tan || '',
      isPrimary: item.isPrimary !== undefined ? item.isPrimary : true
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetForm = () => {
    setEditingId(null);
    setFormData({
      name: '',
      fatherName: '',
      designation: designations.length > 0 ? designations[0].type : '',
      place: '',
      pan: '',
      tan: '',
      isPrimary: false
    });
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to remove TDS Deductee "${name}"?`)) return;

    try {
      const res = await fetch(`${API_BASE}/api/tds-deductee/${id}`, {
        method: 'DELETE',
        headers
      });

      if (res.ok) {
        showNotification('success', 'TDS Deductee removed successfully!');
        if (editingId === id) handleResetForm();
        fetchData();
      } else {
        const err = await res.json();
        showNotification('error', err.message || 'Delete failed');
      }
    } catch (err) {
      console.error('Error deleting TDS deductee:', err);
      showNotification('error', 'Server error while deleting');
    }
  };

  const handleSetPrimary = async (item) => {
    try {
      const res = await fetch(`${API_BASE}/api/tds-deductee/${item._id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ isPrimary: true })
      });

      if (res.ok) {
        showNotification('success', `"${item.name}" set as Primary Authorized TDS Deductee!`);
        fetchData();
      } else {
        showNotification('error', 'Failed to set as primary');
      }
    } catch (err) {
      console.error('Error setting primary:', err);
      showNotification('error', 'Server error');
    }
  };

  return (
    <div className="mail-template-container" style={{ padding: '20px' }}>
      {/* Alert Notifications */}
      {statusMessage && (
        <div style={{
          padding: '12px 20px',
          borderRadius: '6px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          backgroundColor: statusMessage.type === 'success' ? '#e8f5e9' : '#ffebee',
          color: statusMessage.type === 'success' ? '#2e7d32' : '#c62828',
          border: `1px solid ${statusMessage.type === 'success' ? '#a5d6a7' : '#ef9a9a'}`
        }}>
          {statusMessage.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          <span style={{ fontSize: '14px', fontWeight: '500' }}>{statusMessage.text}</span>
        </div>
      )}

      {/* Main Entry Card */}
      <div className="global-settings-container" style={{ 
        maxWidth: '850px', 
        margin: '0 auto 30px auto', 
        background: '#fff', 
        borderRadius: '8px', 
        border: '1px solid #e2e8f0', 
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '16px 24px',
          backgroundColor: '#159BD7',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <UserCheck size={20} />
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>
              {editingId ? 'Edit Authorized TDS Deductee' : 'Define New TDS Deductee'}
            </h3>
          </div>
          {editingId && (
            <button 
              onClick={handleResetForm}
              style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.4)',
                padding: '4px 12px',
                borderRadius: '4px',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              + Create New
            </button>
          )}
        </div>

        <form onSubmit={handleSave} style={{ padding: '30px 40px' }}>
          <div className="settings-row" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
            gap: '24px', 
            padding: 0 
          }}>
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>
                Name <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input 
                type="text" 
                required
                placeholder="e.g. Ayup Tech"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="settings-input"
                style={{ padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              />
            </div>

            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Father's Name</label>
              <input 
                type="text" 
                placeholder="e.g. Mohammad Khan"
                value={formData.fatherName}
                onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                className="settings-input"
                style={{ padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              />
            </div>

            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Designation</label>
              <select 
                className="settings-input"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                style={{ padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              >
                <option value="">Select Designation</option>
                {designations.map(d => (
                  <option key={d._id} value={d.type}>{d.type}</option>
                ))}
                {!designations.some(d => d.type === formData.designation) && formData.designation && (
                  <option value={formData.designation}>{formData.designation}</option>
                )}
              </select>
            </div>

            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Place</label>
              <input 
                type="text" 
                placeholder="e.g. Gorakhpur"
                value={formData.place}
                onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                className="settings-input"
                style={{ padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              />
            </div>

            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>PAN Number</label>
              <input 
                type="text" 
                placeholder="e.g. AYUPK1234F"
                value={formData.pan}
                onChange={(e) => setFormData({ ...formData, pan: e.target.value.toUpperCase() })}
                className="settings-input"
                style={{ padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              />
            </div>

            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>TAN Number</label>
              <input 
                type="text" 
                placeholder="e.g. GKPAY12345T"
                value={formData.tan}
                onChange={(e) => setFormData({ ...formData, tan: e.target.value.toUpperCase() })}
                className="settings-input"
                style={{ padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              />
            </div>
          </div>

          <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input 
              type="checkbox" 
              id="isPrimary"
              checked={formData.isPrimary}
              onChange={(e) => setFormData({ ...formData, isPrimary: e.target.checked })}
              style={{ width: '16px', height: '16px', cursor: 'pointer' }}
            />
            <label htmlFor="isPrimary" style={{ fontSize: '13px', fontWeight: '500', color: '#475569', cursor: 'pointer' }}>
              Set as Primary Authorized Signatory (Form 16 / Form 24Q)
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '30px' }}>
            <button 
              type="submit"
              disabled={saving}
              style={{ 
                backgroundColor: '#159BD7', 
                color: 'white', 
                border: 'none', 
                padding: '9px 30px', 
                borderRadius: '6px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                cursor: saving ? 'not-allowed' : 'pointer', 
                fontWeight: '600',
                opacity: saving ? 0.7 : 1,
                boxShadow: '0 2px 5px rgba(21, 155, 215, 0.3)'
              }}
            >
              <Save size={16} /> {saving ? 'Saving...' : (editingId ? 'Update Deductee' : 'Save Deductee')}
            </button>
          </div>
        </form>
      </div>

      {/* Authorized Deductees Table */}
      <div style={{ maxWidth: '850px', margin: '0 auto', background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '20px' }}>
        <div style={{ fontWeight: '700', fontSize: '14px', color: '#1e293b', marginBottom: '15px', textTransform: 'uppercase' }}>
          CONFIGURED TDS DEDUCTEES ({deductees.length})
        </div>

        <div className="mail-table-wrapper" style={{ overflowX: 'auto' }}>
          <table className="mail-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ width: '50px', textAlign: 'center', padding: '10px' }}>Primary</th>
                <th style={{ textAlign: 'left', padding: '10px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Name</th>
                <th style={{ textAlign: 'left', padding: '10px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Father's Name</th>
                <th style={{ textAlign: 'left', padding: '10px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Designation</th>
                <th style={{ textAlign: 'left', padding: '10px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Place</th>
                <th style={{ textAlign: 'left', padding: '10px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>PAN / TAN</th>
                <th style={{ width: '90px', textAlign: 'center', padding: '10px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>
                    Loading deductee details...
                  </td>
                </tr>
              ) : deductees.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '20px', color: '#94a3b8' }}>
                    No TDS deductee defined yet.
                  </td>
                </tr>
              ) : (
                deductees.map((item, i) => (
                  <tr 
                    key={item._id}
                    style={{
                      backgroundColor: item.isPrimary ? '#f0f9ff' : (i % 2 === 0 ? '#ffffff' : '#f8fafc'),
                      borderBottom: '1px solid #f1f5f9'
                    }}
                  >
                    <td style={{ textAlign: 'center', padding: '10px' }}>
                      {item.isPrimary ? (
                        <span 
                          title="Primary Authorized Signatory"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            backgroundColor: '#0284c7',
                            color: '#fff'
                          }}
                        >
                          <Check size={14} />
                        </span>
                      ) : (
                        <button
                          onClick={() => handleSetPrimary(item)}
                          title="Make Primary"
                          style={{
                            background: 'none',
                            border: '1px dashed #94a3b8',
                            borderRadius: '4px',
                            padding: '2px 6px',
                            fontSize: '11px',
                            color: '#64748b',
                            cursor: 'pointer'
                          }}
                        >
                          Set
                        </button>
                      )}
                    </td>
                    <td style={{ padding: '10px', fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>
                      {item.name}
                    </td>
                    <td style={{ padding: '10px', fontSize: '13px', color: '#64748b' }}>
                      {item.fatherName || '-'}
                    </td>
                    <td style={{ padding: '10px', fontSize: '13px', color: '#475569' }}>
                      {item.designation || '-'}
                    </td>
                    <td style={{ padding: '10px', fontSize: '13px', color: '#475569' }}>
                      {item.place || '-'}
                    </td>
                    <td style={{ padding: '10px', fontSize: '12px', color: '#64748b' }}>
                      {item.pan || item.tan ? `${item.pan || '-'} / ${item.tan || '-'}` : '-'}
                    </td>
                    <td style={{ textAlign: 'center', padding: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                        <button 
                          onClick={() => handleSelectToEdit(item)}
                          title="Edit"
                          style={{ background: 'none', border: 'none', color: '#159BD7', cursor: 'pointer', padding: '4px' }}
                        >
                          <Edit size={15} />
                        </button>
                        <button 
                          onClick={() => handleDelete(item._id, item.name)}
                          title="Delete"
                          style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
