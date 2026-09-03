import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaVideo, FaSave, FaChalkboardTeacher } from 'react-icons/fa';

// Dummy data removed

function ClassTeacher() {
  const navigate = useNavigate();
  const [selectedDept, setSelectedDept] = useState('All');
  const [staff, setStaff] = useState([]);
  const [saved, setSaved] = useState(false);
  const [classes, setClasses] = useState([]);
  const [departments, setDepartments] = useState(['Mathematics', 'Science', 'English', 'Computer', 'Sports']);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/school-classes`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setClasses(data.classes || []);
      }
    } catch (err) { console.error(err); }
  };

  const handleFetchStaff = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/staffs`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        const list = Array.isArray(data) ? data : (data.staff || []);
        const formatted = list.map(s => {
          let classAssigned = '';
          let sectionAssigned = '';
          if (s.classTeacherOf) {
            classAssigned = s.classTeacherOf.className || '';
            // Since backend schema is single reference `classTeacherOf`, there's no direct `sectionAssigned` stored in Staff model.
            // Using a default fallback or derived if available
            sectionAssigned = 'A'; // Placeholder
          }
          return {
            id: s._id,
            staffId: s.employeeId || '-',
            name: `${s.firstName || ''} ${s.lastName || ''}`.trim(),
            department: s.department || 'N/A',
            classAssigned,
            sectionAssigned
          };
        });
        setStaff(formatted);
        const depts = [...new Set(formatted.map(s => s.department))].filter(Boolean);
        if (depts.length > 0) setDepartments(depts);
      }
    } catch (err) { console.error(err); }
  };

  const handleClassChange = (id, newClass) => {
    setStaff(staff.map(s => s.id === id ? { ...s, classAssigned: newClass } : s));
  };

  const handleSectionChange = (id, newSection) => {
    setStaff(staff.map(s => s.id === id ? { ...s, sectionAssigned: newSection } : s));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const assignments = staff.filter(s => s.classAssigned).map(s => ({
        staffId: s.id,
        className: s.classAssigned,
        section: s.sectionAssigned
      }));
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/staffs/bulk/assign-class-teacher`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ assignments })
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      } else {
        alert('Failed to save assignments');
      }
    } catch (err) { console.error(err); }
  };

  const filteredStaff = selectedDept === 'All' ? staff : staff.filter(s => s.department === selectedDept);

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* Header */}
      <div style={{ padding: '24px 32px 12px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
          <FaChalkboardTeacher size={22} color="#f59e0b" /> Assign Class Teacher
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 200 }}>
            <label style={{ fontSize: 12, color: '#475569', fontWeight: 600 }}>Department</label>
            <select
              value={selectedDept}
              onChange={e => setSelectedDept(e.target.value)}
              style={{ border: '1px solid #e2e8f0', borderRadius: 6, padding: '9px 12px', fontSize: 14, color: '#334155', outline: 'none', background: '#fff' }}
            >
              <option value="All">All Departments</option>
              {departments.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          <button
            onClick={handleFetchStaff}
            style={{ background: '#65c466', color: '#fff', border: 'none', borderRadius: 6, padding: '9px 22px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
          >
            Fetch Staff
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#fff', borderRadius: 12, flex: 1, display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <div style={{ flex: 1, overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  <th style={thStyle}>Sl. No.</th>
                  <th style={thStyle}>Staff ID</th>
                  <th style={thStyle}>Staff Name</th>
                  <th style={thStyle}>Department</th>
                  <th style={thStyle}>Assign Class</th>
                  <th style={thStyle}>Assign Section</th>
                </tr>
              </thead>
              <tbody>
                {filteredStaff.map((emp, idx) => (
                  <tr key={emp.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={tdStyle}>{idx + 1}</td>
                    <td style={{ ...tdStyle, fontWeight: 600 }}>{emp.staffId}</td>
                    <td style={{ ...tdStyle, fontWeight: 600, color: '#334155' }}>{emp.name}</td>
                    <td style={tdStyle}>{emp.department}</td>
                    <td style={tdStyle}>
                      <select 
                        value={emp.classAssigned} 
                        onChange={(e) => handleClassChange(emp.id, e.target.value)}
                        style={{ border: '1px solid #cbd5e1', borderRadius: 6, padding: '8px 12px', minWidth: '120px', fontSize: 13, outline: 'none', color: '#0f172a', fontWeight: 500 }}
                      >
                        <option value="">-- Select --</option>
                        {classes.map(c => (
                          <option key={c._id} value={c.className}>{c.className}</option>
                        ))}
                      </select>
                    </td>
                    <td style={tdStyle}>
                      <select 
                        value={emp.sectionAssigned} 
                        onChange={(e) => handleSectionChange(emp.id, e.target.value)}
                        style={{ border: '1px solid #cbd5e1', borderRadius: 6, padding: '8px 12px', minWidth: '120px', fontSize: 13, outline: 'none', color: '#0f172a', fontWeight: 500 }}
                      >
                        <option value="">-- Select --</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                      </select>
                    </td>
                  </tr>
                ))}
                {filteredStaff.length === 0 && (
                  <tr>
                    <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8', fontSize: 14 }}>
                      No staff found for this department.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Save Button */}
          <div style={{ padding: '16px 24px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 12 }}>
            {saved && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#22c55e', fontSize: 14, fontWeight: 600 }}>
                Class Teachers Assigned!
              </span>
            )}
            <button
              onClick={handleSave}
              style={{ background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 28px', fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <FaSave /> Save Assignments
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const thStyle = {
  padding: '14px 16px',
  textAlign: 'left',
  fontSize: 12,
  fontWeight: 700,
  color: '#0f172a',
  whiteSpace: 'nowrap',
  borderBottom: '2px solid #e2e8f0',
};

const tdStyle = {
  padding: '12px 16px',
  fontSize: 13,
  color: '#475569',
  whiteSpace: 'nowrap',
};

export default ClassTeacher;
