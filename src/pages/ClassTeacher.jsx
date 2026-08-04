import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaVideo, FaSave, FaChalkboardTeacher } from 'react-icons/fa';

const dummyStaff = [
  { id: 1, staffId: 'EMP-001', name: 'Rajesh Kumar', department: 'Mathematics', classAssigned: '', sectionAssigned: '' },
  { id: 2, staffId: 'EMP-002', name: 'Priya Sharma', department: 'Science', classAssigned: 'Class 9', sectionAssigned: 'A' },
  { id: 3, staffId: 'EMP-003', name: 'Amit Patel', department: 'English', classAssigned: '', sectionAssigned: '' },
  { id: 4, staffId: 'EMP-004', name: 'Sneha Gupta', department: 'Computer', classAssigned: '', sectionAssigned: '' },
  { id: 5, staffId: 'EMP-005', name: 'Vikram Singh', department: 'Sports', classAssigned: '', sectionAssigned: '' },
];

function ClassTeacher() {
  const navigate = useNavigate();
  const [selectedDept, setSelectedDept] = useState('All');
  const [staff, setStaff] = useState(dummyStaff);
  const [saved, setSaved] = useState(false);

  const handleClassChange = (id, newClass) => {
    setStaff(staff.map(s => s.id === id ? { ...s, classAssigned: newClass } : s));
  };

  const handleSectionChange = (id, newSection) => {
    setStaff(staff.map(s => s.id === id ? { ...s, sectionAssigned: newSection } : s));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
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
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
              <option value="Computer">Computer</option>
              <option value="Sports">Sports</option>
            </select>
          </div>
          <button
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
                        <option value="NUR">NUR</option>
                        <option value="LKG">LKG</option>
                        <option value="UKG">UKG</option>
                        <option value="Class 1">Class 1</option>
                        <option value="Class 9">Class 9</option>
                        <option value="Class 10">Class 10</option>
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
