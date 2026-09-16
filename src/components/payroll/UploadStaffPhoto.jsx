import React, { useState, useEffect, useRef } from 'react';
import { Upload, AlertCircle, CheckCircle, Search, RefreshCw } from 'lucide-react';


const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function UploadStaffPhoto() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedStaffId, setSelectedStaffId] = useState('All');
  const [uploading, setUploading] = useState({});
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const fileInputs = useRef({});

  const token = localStorage.getItem('token');
  const headers = { 'Authorization': `Bearer ${token}` };

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/staffs`, { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } });
      if (res.ok) {
        let result = await res.json();
        setStaff(result);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleUploadClick = (id) => {
    if (fileInputs.current[id]) {
      fileInputs.current[id].click();
    }
  };

  const handleFileChange = async (e, id) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(prev => ({ ...prev, [id]: true }));
    setMessage({ type: '', text: '' });

    const formData = new FormData();
    formData.append('staffPhoto', file);

    try {
      const res = await fetch(`${API_BASE}/api/staffs/${id}`, {
        method: 'PUT',
        headers, // Do NOT set Content-Type to multipart/form-data manually, browser does it
        body: formData
      });

      if (res.ok) {
        setMessage({ type: 'success', text: 'Photo uploaded successfully' });
        fetchStaff(); // Refresh list to get updated photo URLs
      } else {
        setMessage({ type: 'error', text: 'Failed to upload photo' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Network error occurred' });
    } finally {
      setUploading(prev => ({ ...prev, [id]: false }));
      setTimeout(() => setMessage({ type: '', text: '' }), 5000);
    }
  };

  const getFilteredStaff = () => {
    return staff.filter(s => {
      const matchesSearch = s.firstName?.toLowerCase().includes(search.toLowerCase()) || 
                            s.lastName?.toLowerCase().includes(search.toLowerCase()) ||
                            s.employeeCode?.toLowerCase().includes(search.toLowerCase());
      const matchesDropdown = selectedStaffId === 'All' || s._id === selectedStaffId;
      return matchesSearch && matchesDropdown;
    });
  };

  const filteredStaff = getFilteredStaff();

  return (
    <div className="mail-template-container">
      
      {message.text && (
        <div style={{
          margin: '20px', padding: '12px 16px', borderRadius: '4px',
          display: 'flex', alignItems: 'center', gap: '8px',
          backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
          color: message.type === 'success' ? '#155724' : '#721c24',
          border: `1px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
        }}>
          {message.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
          {message.text}
        </div>
      )}

      <div style={{ padding: '20px', borderBottom: '1px solid #dee2e6' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <label style={{ fontSize: '14px', color: '#333' }}>Select Staff</label>
          <select 
            className="settings-input" 
            style={{ width: '300px' }} 
            value={selectedStaffId}
            onChange={(e) => setSelectedStaffId(e.target.value)}
          >
            <option value="All">All Staff</option>
            {staff.map(s => (
              <option key={s._id} value={s._id}>{s.firstName} {s.lastName} ({s.employeeCode || 'No Code'})</option>
            ))}
          </select>
          
          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '4px', padding: '0 8px', backgroundColor: '#fff' }}>
            <Search size={16} color="#666" />
            <input 
              type="text" 
              placeholder="Search by name or ID" 
              style={{ border: 'none', outline: 'none', padding: '8px', width: '200px' }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div style={{ padding: '15px 20px', backgroundColor: '#f8f9fa', borderBottom: '1px solid #dee2e6', fontWeight: 'bold', color: '#495057', fontSize: '13px', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <span style={{ color: '#159BD7', marginRight: '5px' }}>o"</span> View Staff Photo
        </div>
        <div style={{ color: '#666', fontWeight: 'normal' }}>
          Found {filteredStaff.length} staff
        </div>
      </div>

      <div className="mail-table-wrapper" style={{ border: 'none', borderRadius: '0', maxHeight: '500px', overflowY: 'auto' }}>
        <table className="mail-table">
          <thead>
            <tr>
              <th style={{ width: '60px' }}>S.No.</th>
              <th>Name</th>
              <th>Employee Code</th>
              <th style={{ width: '150px' }}>Image Name</th>
              <th style={{ width: '200px', textAlign: 'center' }}>Upload Image</th>
              <th style={{ width: '80px', textAlign: 'center' }}>Preview</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>Loading staff...</td></tr>
            ) : filteredStaff.length === 0 ? (
              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>No staff found</td></tr>
            ) : (
              filteredStaff.map((row, index) => {
                const hasPhoto = !!row.staffPhoto;
                const fileName = hasPhoto ? row.staffPhoto.split('/').pop() : 'No image';

                return (
                  <tr key={row._id} className={index % 2 === 0 ? 'row-even' : 'row-odd'}>
                    <td style={{ padding: '10px' }}>{index + 1}</td>
                    <td style={{ padding: '10px' }}>{row.firstName} {row.lastName}</td>
                    <td style={{ padding: '10px' }}>{row.employeeCode || '-'}</td>
                    <td style={{ padding: '10px', color: '#666' }}>{fileName}</td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>
                      <input 
                        type="file" 
                        accept="image/*" 
                        style={{ display: 'none' }}
                        ref={el => fileInputs.current[row._id] = el}
                        onChange={(e) => handleFileChange(e, row._id)}
                      />
                      <button 
                        className="action-btn upload-btn" 
                        onClick={() => handleUploadClick(row._id)}
                        disabled={uploading[row._id]}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', opacity: uploading[row._id] ? 0.6 : 1 }}
                      >
                        {uploading[row._id] ? <RefreshCw size={14} className="spin" /> : <Upload size={14} />}
                        {uploading[row._id] ? 'Uploading...' : 'Upload'}
                      </button>
                    </td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>
                      {hasPhoto ? (
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto', border: '1px solid #ddd' }}>
                          <img src={`${API_BASE}${row.staffPhoto}`} alt="Staff" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                      ) : (
                        <span style={{ color: '#999', fontSize: '12px' }}>N/A</span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
