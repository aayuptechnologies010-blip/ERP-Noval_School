import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaListUl, FaThLarge, FaPlus, FaStar, FaRegStar, FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

function StudentsList({ favoritesOnly = false }) {
  const [sensitiveData, setSensitiveData] = useState(true);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filtering states
  const [searchBy, setSearchBy] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [studentTypeFilter, setStudentTypeFilter] = useState('All');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/students`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (response.ok) {
          setStudents(data);
        } else {
          toast.error("Failed to fetch students list.");
        }
      } catch (error) {
        console.error("Error fetching students:", error);
        toast.error("An error occurred while fetching students.");
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const toggleFavorite = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/students/${id}/favorite`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ isFavorite: !currentStatus })
      });
      if (response.ok) {
        setStudents(students.map(s => s._id === id ? { ...s, isFavorite: !currentStatus } : s));
        toast.success(currentStatus ? "Removed from favorites" : "Added to favorites");
      } else {
        toast.error("Failed to update favorite status");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating favorite status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/students/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setStudents(students.filter(s => s._id !== id));
        toast.success("Student deleted successfully");
      } else {
        toast.error("Failed to delete student");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting student");
    }
  };

  // Filter Logic
  const filteredStudents = students.filter(s => {
    if (favoritesOnly && !s.isFavorite) return false;
    
    // Boarding filter
    if (studentTypeFilter === 'Boarding' && s.personalDetails?.boardingHostel !== 'Yes') return false;
    if (studentTypeFilter === 'Day Scholar' && s.personalDetails?.boardingHostel !== 'No') return false;

    // Search text filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const p = s.personalDetails || {};
      const a = s.academicDetails || {};
      const fullName = `${p.firstName || ''} ${p.middleName || ''} ${p.lastName || ''}`.toLowerCase();
      const adm = (a.admissionNumber || '').toLowerCase();
      const cls = (`${a.class || ''}-${a.section || ''}`).toLowerCase();
      
      if (searchBy === 'All') {
        if (!fullName.includes(q) && !adm.includes(q) && !cls.includes(q)) return false;
      } else if (searchBy === 'Name') {
        if (!fullName.includes(q)) return false;
      } else if (searchBy === 'Admission No') {
        if (!adm.includes(q)) return false;
      } else if (searchBy === 'Class') {
        if (!cls.includes(q)) return false;
      }
    }

    return true;
  });

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Header */}
      <div style={{ padding: '24px 32px 16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>
          {favoritesOnly ? 'Favorite Students' : 'Students List'}
        </h1>
        <button 
          onClick={() => navigate('/dashboard/students/create')}
          style={{ 
            background: '#65c466', color: '#fff', border: 'none', borderRadius: 6, 
            padding: '10px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 8
          }}
        >
          <FaPlus /> Add Student
        </button>
      </div>

      {/* Filters Section */}
      <div style={{ padding: '0 32px 24px 32px', display: 'flex', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 200 }}>
            <label style={{ fontSize: 13, color: '#475569', fontWeight: 500 }}>Search by</label>
            <select 
              value={searchBy} onChange={e => setSearchBy(e.target.value)}
              style={{ border: '1px solid #e2e8f0', borderRadius: 4, padding: '10px 12px', fontSize: 14, color: '#334155', outline: 'none', background: '#fff' }}>
              <option value="All">All</option>
              <option value="Name">Name</option>
              <option value="Admission No">Admission No</option>
              <option value="Class">Class</option>
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
            <label style={{ fontSize: 13, color: '#475569', fontWeight: 500 }}>&nbsp;</label>
            <input 
              type="text" 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Type here..." 
              style={{ border: '1px solid #e2e8f0', borderRadius: 4, padding: '10px 12px', fontSize: 14, color: '#334155', outline: 'none', background: '#fff' }}
            />
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 10 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#334155', cursor: 'pointer' }}>
            <input type="radio" name="studentType" checked={studentTypeFilter === 'All'} onChange={() => setStudentTypeFilter('All')} style={{ accentColor: '#3b82f6' }} /> All
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#334155', cursor: 'pointer' }}>
            <input type="radio" name="studentType" checked={studentTypeFilter === 'Boarding'} onChange={() => setStudentTypeFilter('Boarding')} style={{ accentColor: '#3b82f6' }} /> Boarding
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#334155', cursor: 'pointer' }}>
            <input type="radio" name="studentType" checked={studentTypeFilter === 'Day Scholar'} onChange={() => setStudentTypeFilter('Day Scholar')} style={{ accentColor: '#3b82f6' }} /> Day Scholar
          </label>
        </div>
      </div>

      {/* Main Content Card */}
      <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#fff', borderRadius: 12, flex: 1, display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          
          {/* Card Header */}
          <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: '#334155', margin: 0 }}>
              Students - (Total: {filteredStudents.length})
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#334155' }}>Show Sensitive Data</span>
              
              {/* Toggle */}
              <div 
                onClick={() => setSensitiveData(!sensitiveData)}
                style={{ 
                  width: 44, height: 22, borderRadius: 12, background: sensitiveData ? '#65c466' : '#e2e8f0', 
                  position: 'relative', cursor: 'pointer', transition: 'all 0.3s' 
                }}
              >
                <div style={{ 
                  position: 'absolute', top: 2, left: sensitiveData ? 24 : 2, width: 18, height: 18, 
                  borderRadius: '50%', background: '#fff', transition: 'all 0.3s' 
                }}></div>
                <span style={{ 
                  position: 'absolute', top: '50%', transform: 'translateY(-50%)', 
                  left: sensitiveData ? 6 : 24, fontSize: 9, fontWeight: 700, 
                  color: sensitiveData ? '#fff' : '#94a3b8' 
                }}>
                  {sensitiveData ? 'ON' : 'OFF'}
                </span>
              </div>

              {/* View Icons */}
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{ width: 32, height: 32, borderRadius: 4, border: 'none', background: '#65c466', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <FaListUl />
                </button>
                <button style={{ width: 32, height: 32, borderRadius: 4, border: '1px solid #e2e8f0', background: '#fff', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <FaThLarge />
                </button>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div style={{ flex: 1, overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: 13, fontWeight: 700, color: '#0f172a', borderBottom: '1px solid #f1f5f9', whiteSpace: 'nowrap' }}>Admission No ↕</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: 13, fontWeight: 700, color: '#0f172a', borderBottom: '1px solid #f1f5f9', whiteSpace: 'nowrap' }}>Name ↕</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: 13, fontWeight: 700, color: '#0f172a', borderBottom: '1px solid #f1f5f9', whiteSpace: 'nowrap' }}>Class ↕</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: 13, fontWeight: 700, color: '#0f172a', borderBottom: '1px solid #f1f5f9', whiteSpace: 'nowrap' }}>DOB ↕</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: 13, fontWeight: 700, color: '#0f172a', borderBottom: '1px solid #f1f5f9', whiteSpace: 'nowrap' }}>Father Name ↕</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: 13, fontWeight: 700, color: '#0f172a', borderBottom: '1px solid #f1f5f9', whiteSpace: 'nowrap' }}>Mother Name ↕</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: 13, fontWeight: 700, color: '#0f172a', borderBottom: '1px solid #f1f5f9', whiteSpace: 'nowrap' }}>Contact Number ↕</th>
                  <th style={{ padding: '16px 24px', textAlign: 'center', fontSize: 13, fontWeight: 700, color: '#0f172a', borderBottom: '1px solid #f1f5f9', whiteSpace: 'nowrap' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" style={{ padding: '24px', textAlign: 'center', color: '#64748b' }}>Loading students...</td>
                  </tr>
                ) : filteredStudents.map((student, index, filteredArray) => {
                  const p = student.personalDetails || {};
                  const a = student.academicDetails || {};
                  const f = student.familyDetails || {};
                  const c = student.contactAddress || {};
                  const fullName = `${p.firstName || ''} ${p.middleName || ''} ${p.lastName || ''}`.trim().replace(/\s+/g, ' ');
                  const fatherName = f.father ? `${f.father.title || ''} ${f.father.firstName || ''} ${f.father.lastName || ''}`.trim() : '';
                  const motherName = f.mother ? `${f.mother.title || ''} ${f.mother.firstName || ''} ${f.mother.lastName || ''}`.trim() : '';
                  const dobDate = p.dateOfBirth ? new Date(p.dateOfBirth).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '';
                  const className = `${a.class || ''}-${a.section || ''}`.replace(/^-|-$/, '');
                  
                  return (
                    <tr key={student._id} style={{ borderBottom: index !== filteredArray.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                      <td style={{ padding: '16px 24px', fontSize: 13, color: '#475569' }}>{a.admissionNumber}</td>
                      <td style={{ padding: '16px 24px', fontSize: 13, color: '#334155', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap' }}>
                        <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#64748b', overflow: 'hidden' }}>
                           <img src={p.studentPhoto || `https://ui-avatars.com/api/?name=${fullName}&background=6366f1&color=fff`} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        {fullName}
                      </td>
                      <td style={{ padding: '16px 24px', fontSize: 13, color: '#475569' }}>{className}</td>
                      <td style={{ padding: '16px 24px', fontSize: 13, color: '#475569' }}>{sensitiveData ? dobDate : '***'}</td>
                      <td style={{ padding: '16px 24px', fontSize: 13, color: '#475569' }}>{fatherName}</td>
                      <td style={{ padding: '16px 24px', fontSize: 13, color: '#475569' }}>{motherName}</td>
                      <td style={{ padding: '16px 24px', fontSize: 13, color: '#475569' }}>{sensitiveData ? c.contactNumber : '***'}</td>
                      <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                        <button 
                          onClick={() => toggleFavorite(student._id, student.isFavorite)}
                          style={{ background: 'none', border: 'none', color: student.isFavorite ? '#eab308' : '#cbd5e1', cursor: 'pointer', fontSize: 16, marginRight: 12 }}
                          title="Toggle Favorite"
                        >
                          {student.isFavorite ? <FaStar /> : <FaRegStar />}
                        </button>
                        <button 
                          onClick={() => navigate('/dashboard/students/edit/' + student._id)}
                          style={{ background: 'none', border: 'none', color: '#6366f1', cursor: 'pointer', fontSize: 16, marginRight: 12 }}
                          title="Edit Profile"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          onClick={() => navigate('/dashboard/students/profile/' + student._id)}
                          style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: 16, marginRight: 12 }}
                          title="View Profile"
                        >
                          <FaEye />
                        </button>
                        <button 
                          onClick={() => handleDelete(student._id)}
                          style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: 16 }}
                          title="Delete Student"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentsList;
