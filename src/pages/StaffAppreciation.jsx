import React, { useState, useEffect } from 'react';
import { FaSearch, FaPlus, FaEye, FaTimes, FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';

function StaffAppreciation() {
  const [records, setRecords] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [appreciationList, setAppreciationList] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [viewItem, setViewItem] = useState(null);
  
  const [form, setForm] = useState({ 
    staffId: '', 
    appreciationId: '', 
    date: '', 
    description: '' 
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { 'Authorization': `Bearer ${token}` };
      const baseUrl = import.meta.env.VITE_API_BASE_URL;

      const [appreciationsRes, staffRes, masterAppreciationsRes] = await Promise.all([
        fetch(`${baseUrl}/api/staff-appreciations`, { headers }).then(r => r.json()),
        fetch(`${baseUrl}/api/staffs`, { headers }).then(r => r.json()),
        fetch(`${baseUrl}/api/appreciations`, { headers }).then(r => r.json()),
      ]);

      setRecords(Array.isArray(appreciationsRes) ? appreciationsRes : (appreciationsRes.data || []));
      setStaffList(Array.isArray(staffRes) ? staffRes : (staffRes.data || []));
      setAppreciationList(Array.isArray(masterAppreciationsRes) ? masterAppreciationsRes : (masterAppreciationsRes.data || []));
    } catch (error) {
      console.error("Error fetching data", error);
      toast.error("Failed to load data");
    }
  };

  const handleFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.staffId || !form.appreciationId || !form.date) return toast.error('Please fill all required fields.');
    
    // Map IDs to expected backend schema strings
    const selectedStaff = staffList.find(s => s._id === form.staffId);
    const selectedAppreciation = appreciationList.find(a => a._id === form.appreciationId);
    
    if (!selectedStaff || !selectedAppreciation) {
      return toast.error('Invalid staff or appreciation selected.');
    }

    const payload = {
      staffName: `${selectedStaff.firstName} ${selectedStaff.lastName}`.trim(),
      designation: selectedStaff.designation || (selectedStaff.role ? selectedStaff.role.roleName : 'Teacher'),
      department: selectedStaff.department || 'N/A',
      appreciationType: selectedAppreciation.type || selectedAppreciation.title,
      points: selectedAppreciation.points || 0,
      date: form.date,
      description: form.description
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/staff-appreciations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        toast.success("Appreciation added successfully!");
        setShowModal(false);
        setForm({ staffId: '', appreciationId: '', date: '', description: '' });
        fetchData();
      } else {
        toast.error("Failed to add appreciation");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error adding appreciation");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Remove this appreciation record?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/staff-appreciations/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
          toast.success("Appreciation removed");
          setRecords(records.filter(r => r._id !== id));
        } else {
          toast.error("Failed to remove");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error removing appreciation");
      }
    }
  };

  const filtered = records.filter(r => {
    const staffNameStr = r.staffName ? r.staffName.toLowerCase() : '';
    const deptStr = r.department ? r.department.toLowerCase() : '';
    const searchLower = search.toLowerCase();
    
    return staffNameStr.includes(searchLower) || deptStr.includes(searchLower);
  });

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '24px 32px 16px 32px' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Staff Appreciations</h1>
      </div>

      <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ position: 'relative' }}>
                <FaSearch style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input 
                  type="text"
                  placeholder="Search staff or department..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{ ...inputStyle, paddingLeft: 36, width: 250 }}
                />
              </div>
            </div>
            <button onClick={() => setShowModal(true)} style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
              <FaPlus size={12} /> Give Appreciation
            </button>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['Staff Member', 'Designation', 'Appreciation', 'Points', 'Date', 'Actions'].map(h => (
                  <th key={h} style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={tdStyle}>{item.staffName || 'Unknown'}</td>
                  <td style={tdStyle}>{item.designation || 'N/A'}</td>
                  <td style={tdStyle}>{item.appreciationType || 'N/A'}</td>
                  <td style={tdStyle}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#fef9c3', color: '#854d0e', padding: '4px 8px', borderRadius: 12, fontSize: 12, fontWeight: 600 }}>
                      <FaStar size={10} color="#ca8a04" />
                      {item.points || 0}
                    </span>
                  </td>
                  <td style={tdStyle}>{new Date(item.date).toLocaleDateString()}</td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
                      <button onClick={() => setViewItem(item)} style={iconBtn} title="View"><FaEye size={14} color="#3b82f6" /></button>
                      <button onClick={() => handleDelete(item._id)} style={iconBtn} title="Remove"><FaTimes size={14} color="#ef4444" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan="6" style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>No records found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div style={overlay}>
          <div style={modal}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ margin: 0, fontSize: 18, color: '#1e293b' }}>Give Staff Appreciation</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}><FaTimes size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={labelStyle}>Staff Member</label>
                <select name="staffId" value={form.staffId} onChange={handleFormChange} style={inputStyle} required>
                  <option value="">Select Staff</option>
                  {staffList.map(s => (
                    <option key={s._id} value={s._id}>{s.firstName} {s.lastName} ({s.designation})</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label style={labelStyle}>Appreciation Award</label>
                <select name="appreciationId" value={form.appreciationId} onChange={handleFormChange} style={inputStyle} required>
                  <option value="">Select Award</option>
                  {appreciationList.map(a => (
                    <option key={a._id} value={a._id}>{a.title} (+{a.points} points)</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Date</label>
                <input type="date" name="date" value={form.date} onChange={handleFormChange} style={inputStyle} required />
              </div>
              
              <div>
                <label style={labelStyle}>Description / Remarks</label>
                <textarea name="description" value={form.description} onChange={handleFormChange} style={{ ...inputStyle, height: 80, resize: 'none' }} placeholder="Optional remarks..."></textarea>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 10 }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ padding: '10px 16px', background: '#f1f5f9', border: 'none', borderRadius: 6, color: '#475569', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '10px 16px', background: '#3b82f6', border: 'none', borderRadius: 6, color: '#fff', fontWeight: 600, cursor: 'pointer' }}>Save Record</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewItem && (
        <div style={overlay}>
          <div style={{ ...modal, maxWidth: 500 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <h2 style={{ margin: '0 0 4px', fontSize: 20, color: '#1e293b' }}>Appreciation Details</h2>
                <p style={{ margin: 0, color: '#334155', fontWeight: 500 }}>{viewItem.staffName}</p>
              </div>
              <button onClick={() => setViewItem(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}><FaTimes size={18} /></button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>Designation</span>
                <p style={{ margin: 0, color: '#334155', fontWeight: 500 }}>{viewItem.designation}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>Appreciation Type</span>
                <p style={{ margin: 0, color: '#334155', fontWeight: 500 }}>{viewItem.appreciationType}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>Points Awarded</span>
                <p style={{ margin: 0, color: '#334155', fontWeight: 500 }}>
                  <FaStar size={12} color="#ca8a04" style={{ marginRight: 4 }} />
                  {viewItem.points}
                </p>
              </div>
            </div>
            
            {viewItem.description && (
              <div style={{ marginTop: 20 }}>
                <h4 style={{ margin: '0 0 8px', fontSize: 14, color: '#334155' }}>Remarks</h4>
                <p style={{ margin: 0, fontSize: 14, color: '#64748b', lineHeight: 1.5 }}>{viewItem.description}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const thStyle = { padding: '14px 16px', textAlign: 'left', fontSize: 13, fontWeight: 600, color: '#64748b', borderBottom: '1px solid #e2e8f0' };
const tdStyle = { padding: '14px 16px', fontSize: 14, color: '#334155', verticalAlign: 'middle' };
const iconBtn = { background: '#f1f5f9', border: 'none', width: 32, height: 32, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' };
const overlay = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 };
const modal = { background: '#fff', borderRadius: 12, width: '100%', maxWidth: 450, padding: 24, boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' };
const labelStyle = { display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600, color: '#475569' };
const inputStyle = { width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: 14, outline: 'none' };

export default StaffAppreciation;
