import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaVideo, FaSave, FaUsers } from 'react-icons/fa';

const dummyStudents = [
  { id: 1, admNo: '1770', name: 'ARNAV GUPTA', currentClub: 'Science Club' },
  { id: 2, admNo: '2203', name: 'ANVI MAURYA', currentClub: 'Arts Club' },
  { id: 3, admNo: '2206', name: 'SHANVI YADAV', currentClub: 'Sports Club' },
  { id: 4, admNo: '2219', name: 'DIVYA', currentClub: '' },
];

function ManageClub() {
  const navigate = useNavigate();
  const [students, setStudents] = useState(dummyStudents);
  const [saved, setSaved] = useState(false);

  const handleClubChange = (id, newClub) => {
    setStudents(students.map(s => s.id === id ? { ...s, currentClub: newClub } : s));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Header Bar */}
      <div style={{ padding: '24px 32px 12px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
          <FaUsers size={20} color="#ec4899" /> Manage Student Club
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
            <select style={{ border: '1px solid #e2e8f0', borderRadius: 6, padding: '9px 12px', fontSize: 14, color: '#334155', outline: 'none', background: '#fff' }}>
              <option>UKG</option>
              <option>Class 1</option>
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 150 }}>
            <label style={{ fontSize: 12, color: '#475569', fontWeight: 600 }}>Section</label>
            <select style={{ border: '1px solid #e2e8f0', borderRadius: 6, padding: '9px 12px', fontSize: 14, color: '#334155', outline: 'none', background: '#fff' }}>
              <option>A</option>
              <option>B</option>
            </select>
          </div>
          <button style={{ background: '#65c466', color: '#fff', border: 'none', borderRadius: 6, padding: '9px 22px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
            Fetch Students
          </button>
        </div>
      </div>

      {/* Main Content Card */}
      <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'hidden' }}>
        <div style={{ background: '#fff', borderRadius: 12, height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
           
          <div style={{ flex: 1, overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  <th style={thStyle}>Sl. No.</th>
                  <th style={thStyle}>Student Name</th>
                  <th style={thStyle}>Admission No</th>
                  <th style={thStyle}>Club Allocation</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, idx) => (
                  <tr key={student.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={tdStyle}>{idx + 1}</td>
                    <td style={{ ...tdStyle, fontWeight: 600, color: '#334155' }}>{student.name}</td>
                    <td style={tdStyle}>{student.admNo}</td>
                    <td style={tdStyle}>
                      <select 
                        value={student.currentClub} 
                        onChange={(e) => handleClubChange(student.id, e.target.value)}
                        style={{ border: '1px solid #cbd5e1', borderRadius: 6, padding: '8px 12px', minWidth: '150px', fontSize: 13, outline: 'none', color: '#0f172a', fontWeight: 500 }}
                      >
                        <option value="">-- Select Club --</option>
                        <option value="Science Club">Science Club</option>
                        <option value="Sports Club">Sports Club</option>
                        <option value="Arts Club">Arts Club</option>
                        <option value="Music Club">Music Club</option>
                        <option value="Coding Club">Coding Club</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Save Button Footer */}
          <div style={{ padding: '16px 24px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 16 }}>
            {saved && (
              <span style={{ fontSize: 13, fontWeight: 700, color: '#22c55e' }}>Club Allocations Saved!</span>
            )}
            <button 
              onClick={handleSave}
              style={{ background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 24px', fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <FaSave /> Save Changes
            </button>
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

export default ManageClub;
