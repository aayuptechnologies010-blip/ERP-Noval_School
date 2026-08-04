import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaVideo, FaLevelUpAlt, FaUsers } from 'react-icons/fa';

const dummyStudents = [
  { id: 1, admNo: '1770', name: 'ARNAV GUPTA', currentClass: 'UKG A', roll: '01' },
  { id: 2, admNo: '2203', name: 'ANVI MAURYA', currentClass: 'UKG A', roll: '02' },
  { id: 3, admNo: '2206', name: 'SHANVI YADAV', currentClass: 'UKG A', roll: '03' },
  { id: 4, admNo: '2219', name: 'DIVYA', currentClass: 'UKG A', roll: '04' },
];

function Promotion() {
  const navigate = useNavigate();
  const [students, setStudents] = useState(dummyStudents);
  const [selectedIds, setSelectedIds] = useState([]);
  const [promoted, setPromoted] = useState(false);

  const toggleSelectAll = () => {
    if (selectedIds.length === students.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(students.map(s => s.id));
    }
  };

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selId => selId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handlePromote = () => {
    setPromoted(true);
    setTimeout(() => {
      setPromoted(false);
      // Remove promoted students from the list (dummy logic)
      setStudents(students.filter(s => !selectedIds.includes(s.id)));
      setSelectedIds([]);
    }, 2000);
  };

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Header Bar */}
      <div style={{ padding: '24px 32px 12px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
          <FaLevelUpAlt size={22} color="#3b82f6" /> Student Promotion
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

      <div style={{ padding: '0 32px 16px 32px', display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        {/* Promotion From Settings */}
        <div style={{ flex: 1, background: '#fff', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', padding: '20px 24px' }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', margin: '0 0 16px 0', borderBottom: '2px solid #e2e8f0', paddingBottom: 8 }}>
            Promote From <span style={{ color: '#ef4444' }}>(Current Session)</span>
          </h2>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
              <label style={{ fontSize: 12, color: '#475569', fontWeight: 600 }}>Academic Session</label>
              <select style={inputStyle} defaultValue="2025-2026">
                <option>2024-2025</option>
                <option>2025-2026</option>
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
              <label style={{ fontSize: 12, color: '#475569', fontWeight: 600 }}>Class</label>
              <select style={inputStyle}>
                <option>UKG</option>
                <option>Class 1</option>
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
              <label style={{ fontSize: 12, color: '#475569', fontWeight: 600 }}>Section</label>
              <select style={inputStyle}>
                <option>A</option>
                <option>B</option>
              </select>
            </div>
          </div>
          <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
            <button style={{ background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 20px', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
              <FaUsers /> Fetch Students
            </button>
          </div>
        </div>

        {/* Promotion To Settings */}
        <div style={{ flex: 1, background: '#fff', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', padding: '20px 24px' }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', margin: '0 0 16px 0', borderBottom: '2px solid #e2e8f0', paddingBottom: 8 }}>
            Promote To <span style={{ color: '#22c55e' }}>(Next Session)</span>
          </h2>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
              <label style={{ fontSize: 12, color: '#475569', fontWeight: 600 }}>Academic Session</label>
              <select style={inputStyle} defaultValue="2026-2027">
                <option>2025-2026</option>
                <option>2026-2027</option>
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
              <label style={{ fontSize: 12, color: '#475569', fontWeight: 600 }}>Class</label>
              <select style={inputStyle} defaultValue="Class 1">
                <option>UKG</option>
                <option>Class 1</option>
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
              <label style={{ fontSize: 12, color: '#475569', fontWeight: 600 }}>Section</label>
              <select style={inputStyle}>
                <option>A</option>
                <option>B</option>
              </select>
            </div>
          </div>
          <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 12 }}>
            {promoted && (
              <span style={{ fontSize: 13, fontWeight: 700, color: '#22c55e' }}>Promotion Successful!</span>
            )}
            <button 
              onClick={handlePromote}
              disabled={selectedIds.length === 0}
              style={{ 
                background: selectedIds.length > 0 ? '#22c55e' : '#94a3b8', 
                color: '#fff', border: 'none', borderRadius: 6, padding: '8px 20px', 
                fontSize: 13, fontWeight: 700, cursor: selectedIds.length > 0 ? 'pointer' : 'not-allowed', 
                display: 'flex', alignItems: 'center', gap: 6 
              }}
            >
              <FaLevelUpAlt /> Promote Selected ({selectedIds.length})
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Card - Student List */}
      <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'hidden' }}>
        <div style={{ background: '#fff', borderRadius: 12, height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ padding: '16px 20px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: 14, color: '#334155', fontWeight: 700 }}>Eligible Students for Promotion</h3>
            <span style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>Total: {students.length}</span>
          </div>
           
          <div style={{ flex: 1, overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#fff' }}>
                  <th style={{ ...thStyle, width: 40, textAlign: 'center' }}>
                    <input 
                      type="checkbox" 
                      checked={students.length > 0 && selectedIds.length === students.length}
                      onChange={toggleSelectAll}
                      style={{ cursor: 'pointer', transform: 'scale(1.2)' }}
                    />
                  </th>
                  <th style={thStyle}>Sl. No.</th>
                  <th style={thStyle}>Student Info</th>
                  <th style={thStyle}>Current Class</th>
                  <th style={thStyle}>Roll No</th>
                  <th style={{ ...thStyle, textAlign: 'center' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, idx) => (
                  <tr key={student.id} style={{ borderBottom: '1px solid #f1f5f9', background: selectedIds.includes(student.id) ? '#eff6ff' : '#fff' }}>
                    <td style={{ ...tdStyle, textAlign: 'center' }}>
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(student.id)}
                        onChange={() => toggleSelect(student.id)}
                        style={{ cursor: 'pointer', transform: 'scale(1.2)' }}
                      />
                    </td>
                    <td style={tdStyle}>{idx + 1}</td>
                    <td style={{ ...tdStyle, color: '#334155' }}>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>{student.name}</div>
                      <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>Adm No: {student.admNo}</div>
                    </td>
                    <td style={{ ...tdStyle, fontWeight: 600 }}>{student.currentClass}</td>
                    <td style={tdStyle}>{student.roll}</td>
                    <td style={{ ...tdStyle, textAlign: 'center' }}>
                      <span style={{ 
                        background: selectedIds.includes(student.id) ? '#dbeafe' : '#f1f5f9', 
                        color: selectedIds.includes(student.id) ? '#2563eb' : '#64748b', 
                        padding: '4px 10px', 
                        borderRadius: 12, 
                        fontSize: 11, 
                        fontWeight: 700 
                      }}>
                        {selectedIds.includes(student.id) ? 'Selected for Promotion' : 'Not Selected'}
                      </span>
                    </td>
                  </tr>
                ))}
                {students.length === 0 && (
                  <tr>
                    <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8', fontSize: 14 }}>
                      All students have been promoted or no students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  border: '1px solid #e2e8f0', 
  borderRadius: 6, 
  padding: '9px 12px', 
  fontSize: 13, 
  color: '#334155', 
  outline: 'none', 
  background: '#f8fafc',
  fontWeight: 500
};

const thStyle = {
  padding: '16px 20px',
  textAlign: 'left',
  fontSize: 12,
  fontWeight: 700,
  color: '#475569',
  whiteSpace: 'nowrap',
  borderBottom: '2px solid #e2e8f0',
};

const tdStyle = {
  padding: '14px 20px',
  fontSize: 13,
  color: '#475569',
  whiteSpace: 'nowrap',
};

export default Promotion;
