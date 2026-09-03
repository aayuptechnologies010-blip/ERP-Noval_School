import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaSearch, FaEye, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';

function AssignmentList() {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);

  React.useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/assignments`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        // Map backend fields to frontend table fields
        const formatted = data.map(d => ({
          ...d,
          id: d._id,
        }));
        setAssignments(formatted);
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/assignments/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          setAssignments(assignments.filter(a => a.id !== id));
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
      
      {/* Header Bar */}
      <div style={{ padding: '24px 32px 16px 32px' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Assignment</h1>
      </div>

      {/* Main Content Card */}
      <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#fff', borderRadius: 12, height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: '#334155', margin: 0 }}>Assignment</h2>
            <button 
              onClick={() => navigate('/dashboard/assignment/create')}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px', background: '#5cb85c', color: '#fff',
                border: 'none', borderRadius: '4px', padding: '8px 16px', fontSize: '14px', fontWeight: 600, cursor: 'pointer'
              }}
            >
              <FaPlus size={12} /> Create Assignment
            </button>
          </div>

          <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
            {assignments.length > 0 ? (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    <th style={thStyle}>Sl. No.</th>
                    <th style={thStyle}>Title</th>
                    <th style={thStyle}>Subject</th>
                    <th style={thStyle}>Class / Type</th>
                    <th style={thStyle}>Dates</th>
                    <th style={thStyle}>Status</th>
                    <th style={{ ...thStyle, textAlign: 'center' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {assignments.map((item, idx) => (
                    <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={tdStyle}>{idx + 1}</td>
                      <td style={{ ...tdStyle, fontWeight: 600, color: '#334155' }}>{item.title}</td>
                      <td style={tdStyle}>{item.subject}</td>
                      <td style={tdStyle}>
                        <div style={{ fontWeight: 600 }}>{item.class}</div>
                        <div style={{ fontSize: 12, color: '#64748b' }}>{item.type}</div>
                      </td>
                      <td style={tdStyle}>
                        <div style={{ fontSize: 12 }}>Assigned: {item.assignedOn}</div>
                        <div style={{ fontSize: 12, color: '#ef4444' }}>Due: {item.submissionDate}</div>
                      </td>
                      <td style={tdStyle}>
                        <span style={{ 
                          background: item.status === 'Active' ? '#dcfce7' : '#f1f5f9',
                          color: item.status === 'Active' ? '#16a34a' : '#64748b',
                          padding: '4px 10px', borderRadius: 4, fontSize: 12, fontWeight: 700 
                        }}>
                          {item.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                          <button onClick={() => navigate('/dashboard/assignment/view', { state: { viewData: item } })} style={{ background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 4, width: 28, height: 28, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                            <FaEye size={12} />
                          </button>
                          <button onClick={() => navigate('/dashboard/assignment/create', { state: { editData: item } })} style={{ background: '#f59e0b', color: '#fff', border: 'none', borderRadius: 4, width: 28, height: 28, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                            <FaEdit size={12} />
                          </button>
                          <button onClick={() => handleDelete(item.id)} style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 4, width: 28, height: 28, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                            <FaTrash size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                <div style={{ width: 250, height: 180, background: '#f8fafc', borderRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: 20, position: 'relative' }}>
                  <div style={{ border: '2px solid #cbd5e1', width: 160, height: 100, borderRadius: 8, background: '#fff', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                      <div style={{ position: 'absolute', top: -16, width: 32, height: 32, borderRadius: '50%', border: '2px solid #cbd5e1', background: '#f1f5f9' }}></div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#334155', letterSpacing: 0.5 }}>NO</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#334155', letterSpacing: 0.5 }}>RECORD FOUND</span>
                  </div>
                  <div style={{ position: 'absolute', left: 10, top: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffe4e6', color: '#ef4444', width: 40, height: 40, borderRadius: '50%', border: '3px solid #fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                      <FaSearch size={18} />
                  </div>
                </div>
              </div>
            )}
          </div>
          
        </div>
      </div>

    </div>
  );
}

const thStyle = { padding: '14px 16px', textAlign: 'left', fontSize: 13, fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap', borderBottom: '2px solid #e2e8f0' };
const tdStyle = { padding: '12px 16px', fontSize: 13, color: '#475569', whiteSpace: 'nowrap' };
const inputStyle = { width: '100%', padding: '8px 12px', borderRadius: 4, border: '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box' };
const modalOverlay = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 50 };
const modalContent = { background: '#fff', borderRadius: 12, width: '400px', maxWidth: '90%', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' };
const modalHeader = { padding: '16px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
const modalFooter = { padding: '16px 24px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end' };
const closeBtn = { background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' };
const btnSecondary = { padding: '8px 16px', borderRadius: 4, border: '1px solid #cbd5e1', background: '#fff', color: '#475569', cursor: 'pointer', fontWeight: 600 };
const btnPrimary = { padding: '8px 16px', borderRadius: 4, border: 'none', background: '#3b82f6', color: '#fff', cursor: 'pointer', fontWeight: 600 };

export default AssignmentList;
