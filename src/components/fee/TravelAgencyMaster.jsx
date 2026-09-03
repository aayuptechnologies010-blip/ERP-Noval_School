import React, { useState, useEffect } from 'react';
import { Save, Edit2, Trash2, RotateCcw, Plus } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const inputStyle = { width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' };
const labelStyle = { display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '6px', color: '#374151' };
const btnBase = { border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' };

export default function TravelAgencyMaster() {
  const [agencies, setAgencies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  
  const [form, setForm] = useState({ agencyName: '', contactPerson: '', contactNumber: '', address: '', remarks: '' });

  const token = localStorage.getItem('token');

  const fetchAgencies = async () => {
    try {
      const res = await fetch(`${API_URL}/api/transport/agencies`, { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setAgencies(await res.json());
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchAgencies(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    if (!form.agencyName) { setMessage({ type: 'error', text: 'Agency Name is required.' }); return; }
    setLoading(true);
    try {
      const url = editingId ? `${API_URL}/api/transport/agencies/${editingId}` : `${API_URL}/api/transport/agencies`;
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: data.message });
        setForm({ agencyName: '', contactPerson: '', contactNumber: '', address: '', remarks: '' });
        setEditingId(null);
        fetchAgencies();
      } else { setMessage({ type: 'error', text: data.message }); }
    } catch (err) { setMessage({ type: 'error', text: 'Server error' }); }
    finally { setLoading(false); }
  };

  const handleEdit = (agency) => {
    setForm({ agencyName: agency.agencyName, contactPerson: agency.contactPerson || '', contactNumber: agency.contactNumber || '', address: agency.address || '', remarks: agency.remarks || '' });
    setEditingId(agency._id);
    setMessage(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this agency?')) return;
    try {
      const res = await fetch(`${API_URL}/api/transport/agencies/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) { setMessage({ type: 'success', text: 'Agency deleted' }); fetchAgencies(); }
    } catch (err) { setMessage({ type: 'error', text: 'Server error' }); }
  };

  const handleReset = () => { setForm({ agencyName: '', contactPerson: '', contactNumber: '', address: '', remarks: '' }); setEditingId(null); setMessage(null); };

  return (
    <div style={{ padding: '20px', background: '#f3f4f6', minHeight: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {message && (
        <div style={{ padding: '10px', borderRadius: '4px', background: message.type === 'success' ? '#d1fae5' : '#fee2e2', color: message.type === 'success' ? '#065f46' : '#991b1b', fontSize: '13px' }}>
          {message.text}
        </div>
      )}

      {/* Form */}
      <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#1f2937', fontWeight: 'bold' }}>
          {editingId ? 'Edit Travel Agency' : 'Add Travel Agency'}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Agency Name *</label>
            <input name="agencyName" value={form.agencyName} onChange={handleChange} placeholder="e.g. Delhi Transport Co." style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Contact Person</label>
            <input name="contactPerson" value={form.contactPerson} onChange={handleChange} placeholder="Manager Name" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Contact Number</label>
            <input name="contactNumber" value={form.contactNumber} onChange={handleChange} placeholder="Phone Number" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Address</label>
            <input name="address" value={form.address} onChange={handleChange} placeholder="Address" style={inputStyle} />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>Remarks</label>
            <input name="remarks" value={form.remarks} onChange={handleChange} placeholder="Optional remarks" style={inputStyle} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
          <button onClick={handleSave} disabled={loading} style={{ ...btnBase, background: '#10b981', color: '#fff' }}>
            {editingId ? <Edit2 size={14} /> : <Plus size={14} />} {editingId ? 'Update' : 'Save'} Agency
          </button>
          <button onClick={handleReset} style={{ ...btnBase, background: '#f59e0b', color: '#fff' }}>
            <RotateCcw size={14} /> Reset
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        <div style={{ padding: '15px 20px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '15px', color: '#1f2937', fontWeight: 'bold' }}>All Travel Agencies</h3>
          <span style={{ fontSize: '12px', color: '#6b7280' }}>{agencies.length} records</span>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead style={{ background: '#f9fafb' }}>
            <tr>
              <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>#</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>Agency Name</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>Contact Person</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>Contact No.</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>Address</th>
              <th style={{ padding: '12px 16px', textAlign: 'center', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {agencies.length === 0 ? (
              <tr><td colSpan="6" style={{ padding: '30px', textAlign: 'center', color: '#6b7280' }}>No agencies found. Add one above.</td></tr>
            ) : (
              agencies.map((agency, i) => (
                <tr key={agency._id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '12px 16px', color: '#6b7280' }}>{i + 1}</td>
                  <td style={{ padding: '12px 16px', color: '#1f2937', fontWeight: '600' }}>{agency.agencyName}</td>
                  <td style={{ padding: '12px 16px', color: '#374151' }}>{agency.contactPerson || '-'}</td>
                  <td style={{ padding: '12px 16px', color: '#374151' }}>{agency.contactNumber || '-'}</td>
                  <td style={{ padding: '12px 16px', color: '#374151' }}>{agency.address || '-'}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button onClick={() => handleEdit(agency)} style={{ ...btnBase, background: '#3b82f6', color: '#fff', padding: '6px 12px', fontSize: '12px' }}>
                        <Edit2 size={12} /> Edit
                      </button>
                      <button onClick={() => handleDelete(agency._id)} style={{ ...btnBase, background: '#ef4444', color: '#fff', padding: '6px 12px', fontSize: '12px' }}>
                        <Trash2 size={12} /> Delete
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
  );
}
