import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaVideo, FaSave, FaHome } from 'react-icons/fa';

function ManageHouse() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [availableClasses, setAvailableClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('All');
  const [houseUpdates, setHouseUpdates] = useState({});

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
    setHouseUpdates({}); // Reset pending changes on new fetch
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

  const handleHouseChange = (id, newHouse) => {
    setHouseUpdates(prev => ({
      ...prev,
      [id]: newHouse
    }));
  };

  const handleSave = async () => {
    const updates = Object.keys(houseUpdates).map(id => ({
      studentId: id,
      houseName: houseUpdates[id]
    }));

    if (updates.length === 0) return;

    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/students/bulk/house-names`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ updates })
      });
      if (res.ok) {
        alert("House allocations updated successfully");
        setHouseUpdates({});
        handleFetchStudents(); // Refresh data
      } else {
        alert("Failed to update house allocations");
      }
    } catch (e) {
      console.error(e);
      alert("Error updating house allocations");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Header Bar */}
      <div style={{ padding: '24px 32px 12px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
          <FaHome size={20} color="#eab308" /> Manage Student House
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
           
          <div style={{ flex: 1, overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  <th style={thStyle}>Sl. No.</th>
                  <th style={thStyle}>Student Name</th>
                  <th style={thStyle}>Admission No</th>
                  <th style={thStyle}>Class & Section</th>
                  <th style={thStyle}>House Allocation</th>
                </tr>
              </thead>
              <tbody>
                {loading && <tr><td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>Fetching students...</td></tr>}
                {!loading && students.map((student, idx) => {
                  // If house update is pending, use it, else use existing houseName
                  const currentHouseVal = houseUpdates[student._id] !== undefined ? houseUpdates[student._id] : (student.personalDetails?.houseNames || '');
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
                      <td style={tdStyle}>
                        <select 
                          value={currentHouseVal} 
                          onChange={(e) => handleHouseChange(student._id, e.target.value)}
                          style={{ border: '1px solid #cbd5e1', borderRadius: 6, padding: '8px 12px', minWidth: '150px', fontSize: 13, outline: 'none', color: '#0f172a', fontWeight: 500 }}
                        >
                          <option value="">-- Select House --</option>
                          <option value="Red House">Red House</option>
                          <option value="Blue House">Blue House</option>
                          <option value="Green House">Green House</option>
                          <option value="Yellow House">Yellow House</option>
                        </select>
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
              {Object.keys(houseUpdates).length > 0 && (
                <span style={{ fontSize: 13, fontWeight: 700, color: '#f59e0b' }}>
                  {Object.keys(houseUpdates).length} unsaved changes
                </span>
              )}
              <button 
                onClick={handleSave}
                disabled={saving || Object.keys(houseUpdates).length === 0}
                style={{ background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 24px', fontSize: 14, fontWeight: 700, cursor: (saving || Object.keys(houseUpdates).length === 0) ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: 8, opacity: (saving || Object.keys(houseUpdates).length === 0) ? 0.7 : 1 }}
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

export default ManageHouse;
