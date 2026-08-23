import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaVideo, FaSave, FaImage, FaUpload } from 'react-icons/fa';

function ManagePhoto() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [availableClasses, setAvailableClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('All');
  
  // Stores File objects mapping studentId -> File
  const [photoUpdates, setPhotoUpdates] = useState({});
  const fileInputRef = useRef(null);
  const [activeStudentId, setActiveStudentId] = useState(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/promotions/classes`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setAvailableClasses(data.classes || []);
          if (data.classes?.length > 0) {
             setSelectedClass(data.classes[0].class);
             setSelectedSection('All');
          }
        }
      } catch (e) {
        console.error("Error fetching classes", e);
      }
    };
    fetchClasses();
  }, []);

  const handleFetchStudents = async () => {
    setLoading(true);
    setPhotoUpdates({}); // Reset pending changes on new fetch
    try {
      const token = localStorage.getItem('token');
      const url = selectedSection === 'All' 
        ? `${import.meta.env.VITE_API_BASE_URL}/api/promotions/eligible?class=${selectedClass}` 
        : `${import.meta.env.VITE_API_BASE_URL}/api/promotions/eligible?class=${selectedClass}&section=${selectedSection}`;
      const res = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setStudents(data.students || []);
      } else {
        alert("Failed to fetch students");
      }
    } catch (err) {
      console.error(err);
      alert("Error fetching students");
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoClick = (id) => {
    setActiveStudentId(id);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && activeStudentId) {
      setPhotoUpdates(prev => ({
        ...prev,
        [activeStudentId]: file
      }));
    }
    setActiveStudentId(null);
    e.target.value = null; // reset input
  };

  const handleSave = async () => {
    const studentIds = Object.keys(photoUpdates);
    if (studentIds.length === 0) return;

    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      studentIds.forEach(id => {
        formData.append(id, photoUpdates[id]);
      });

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/students/bulk/photos`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}` 
        },
        body: formData
      });
      
      if (res.ok) {
        alert("Photos updated successfully");
        setPhotoUpdates({});
        handleFetchStudents(); // Refresh data
      } else {
        alert("Failed to update photos");
      }
    } catch (e) {
      console.error(e);
      alert("Error updating photos");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Header Bar */}
      <div style={{ padding: '24px 32px 12px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
          <FaImage size={20} color="#8b5cf6" /> Manage Student Photos
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#22c55e', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            <FaVideo /> Video Tutorial
          </div>
          <button 
            onClick={() => navigate(-1)}
            style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#475569', fontSize: 14, fontWeight: 600, cursor: 'pointer', background: 'none', border: 'none' }}
          >
            <FaArrowLeft style={{ fontSize: 12 }} /> Go Back
          </button>
        </div>
      </div>

      {/* Filter Card */}
      <div style={{ padding: '0 32px 16px 32px' }}>
        <div style={{ background: '#fff', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', padding: '20px 24px', display: 'flex', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 150 }}>
            <label style={{ fontSize: 12, color: '#475569', fontWeight: 600 }}>Class</label>
            <select 
              value={selectedClass} 
              onChange={e => setSelectedClass(e.target.value)}
              style={{ border: '1px solid #e2e8f0', borderRadius: 6, padding: '9px 12px', fontSize: 14, color: '#334155', outline: 'none', background: '#fff' }}
            >
              {availableClasses.map(c => <option key={c.class} value={c.class}>{c.class}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 150 }}>
            <label style={{ fontSize: 12, color: '#475569', fontWeight: 600 }}>Section</label>
            <select 
              value={selectedSection} 
              onChange={e => setSelectedSection(e.target.value)}
              style={{ border: '1px solid #e2e8f0', borderRadius: 6, padding: '9px 12px', fontSize: 14, color: '#334155', outline: 'none', background: '#fff' }}
            >
              <option value="All">All</option>
              {availableClasses.find(c => c.class === selectedClass)?.sections.map(s => (
                <option key={s.section} value={s.section}>{s.section}</option>
              ))}
            </select>
          </div>
          <button 
            onClick={handleFetchStudents} 
            disabled={loading}
            style={{ background: '#65c466', color: '#fff', border: 'none', borderRadius: 6, padding: '9px 22px', fontSize: 14, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            Fetch Students
          </button>
        </div>
      </div>

      {/* Main Content Card */}
      <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'hidden' }}>
        <div style={{ background: '#fff', borderRadius: 12, height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
           
          {/* Hidden File Input */}
          <input 
            type="file" 
            accept="image/*" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            style={{ display: 'none' }} 
          />

          <div style={{ flex: 1, overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  <th style={thStyle}>Sl. No.</th>
                  <th style={thStyle}>Student Name</th>
                  <th style={thStyle}>Admission No</th>
                  <th style={thStyle}>Class & Section</th>
                  <th style={{ ...thStyle, textAlign: 'center' }}>Current Photo</th>
                  <th style={{ ...thStyle, textAlign: 'center' }}>Upload New Photo</th>
                </tr>
              </thead>
              <tbody>
                {loading && <tr><td colSpan="6" style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>Fetching students...</td></tr>}
                {!loading && students.map((student, idx) => {
                  let previewUrl = null;
                  if (photoUpdates[student._id]) {
                    previewUrl = URL.createObjectURL(photoUpdates[student._id]);
                  } else if (student.personalDetails?.studentPhoto) {
                    previewUrl = student.personalDetails.studentPhoto;
                  }
                  
                  return (
                    <tr key={student._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={tdStyle}>{idx + 1}</td>
                      <td style={{ ...tdStyle, fontWeight: 600, color: '#334155' }}>
                        {student.personalDetails?.firstName} {student.personalDetails?.lastName}
                      </td>
                      <td style={tdStyle}>{student.academicDetails?.admissionNumber}</td>
                      <td style={{ ...tdStyle, fontWeight: 600 }}>
                        {student.academicDetails?.class} {student.academicDetails?.section}
                      </td>
                      <td style={{ ...tdStyle, textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: '50%', background: '#e2e8f0', overflow: 'hidden', border: photoUpdates[student._id] ? '2px solid #22c55e' : 'none' }}>
                          {previewUrl ? (
                            <img src={previewUrl} alt="Student" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <FaImage color="#94a3b8" />
                          )}
                        </div>
                      </td>
                      <td style={{ ...tdStyle, textAlign: 'center' }}>
                        <button 
                          onClick={() => handlePhotoClick(student._id)}
                          style={{ background: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1', borderRadius: 6, padding: '6px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                        >
                          <FaUpload /> {photoUpdates[student._id] ? 'Change Selected' : 'Choose File'}
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Save Button Footer */}
          <div style={{ padding: '16px 24px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>Total: {students.length}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              {Object.keys(photoUpdates).length > 0 && (
                <span style={{ fontSize: 13, fontWeight: 700, color: '#f59e0b' }}>
                  {Object.keys(photoUpdates).length} unsaved changes
                </span>
              )}
              <button 
                onClick={handleSave}
                disabled={saving || Object.keys(photoUpdates).length === 0}
                style={{ background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 24px', fontSize: 14, fontWeight: 700, cursor: (saving || Object.keys(photoUpdates).length === 0) ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: 8, opacity: (saving || Object.keys(photoUpdates).length === 0) ? 0.7 : 1 }}
              >
                <FaSave /> {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

const thStyle = {
  padding: '16px 20px',
  textAlign: 'left',
  fontSize: 13,
  fontWeight: 700,
  color: '#0f172a',
  whiteSpace: 'nowrap',
  borderBottom: '2px solid #e2e8f0',
};

const tdStyle = {
  padding: '12px 20px',
  fontSize: 13,
  color: '#475569',
  whiteSpace: 'nowrap',
};

export default ManagePhoto;
