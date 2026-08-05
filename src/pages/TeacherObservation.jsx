import React, { useState } from 'react';
import { FaEye, FaUserCircle, FaTimes } from 'react-icons/fa';

const dummyTeachers = [
  { id: 1, name: 'Miss. AARADHYA VERMA', designation: 'Teacher', mobile: '8127535725', qualification: 'B.ED', email: 'aaradhya@example.com' },
  { id: 2, name: 'Mr. AKASH RAI', designation: 'Accountant', mobile: '8400900772', qualification: 'B.COM', email: 'akash@example.com' },
  { id: 3, name: 'Mr. AKHILESH MISHRA', designation: 'Teacher', mobile: '8896218542', qualification: 'B.ED', email: 'akhilesh@example.com' },
  { id: 4, name: 'Mr. AMIT DUBEY', designation: 'Teacher', mobile: '6393449933', qualification: 'M.SC', email: 'amit@example.com' },
  { id: 5, name: 'Mrs. ANSHIKA', designation: 'Teacher', mobile: '9305953530', qualification: 'B.ED', email: 'anshika@example.com' },
  { id: 6, name: 'Miss. ARCHANA YADAV', designation: 'Teacher', mobile: '7497961668', qualification: 'MA', email: 'archana@example.com' },
  { id: 7, name: 'Mrs. ARPANA UPADHYAY', designation: 'Teacher', mobile: '9492801781', qualification: 'B.A', email: 'arpana@example.com' },
  { id: 8, name: 'Mr. ASHISH KUMAR', designation: 'Teacher', mobile: '7860565888', qualification: 'B.SC D.EL.ED', email: 'ashish@example.com' },
  { id: 9, name: 'Miss. DEEPA GUPTA', designation: 'Teacher', mobile: '7522833511', qualification: 'M.COM', email: 'deepa@example.com' },
];

function TeacherObservation() {
  const [filterBy, setFilterBy] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal State
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const filteredTeachers = dummyTeachers.filter(teacher => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    
    switch (filterBy) {
      case 'Name':
        return teacher.name.toLowerCase().includes(term);
      case 'Designation':
        return teacher.designation.toLowerCase().includes(term);
      case 'Mobile':
        return teacher.mobile.includes(term);
      case 'Email':
        return teacher.email.toLowerCase().includes(term);
      case 'All':
      default:
        return (
          teacher.name.toLowerCase().includes(term) ||
          teacher.designation.toLowerCase().includes(term) ||
          teacher.mobile.includes(term) ||
          teacher.email.toLowerCase().includes(term)
        );
    }
  });

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Header Bar */}
      <div style={{ padding: '24px 32px 16px 32px' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Teacher Observation</h1>
      </div>

      {/* Main Content Card */}
      <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        
        {/* Filters */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>Filter by</label>
            <select 
              value={filterBy}
              onChange={e => setFilterBy(e.target.value)}
              style={inputStyle}
            >
              <option value="All">All</option>
              <option value="Name">Name</option>
              <option value="Designation">Designation</option>
              <option value="Mobile">Mobile</option>
              <option value="Email">Email</option>
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, justifyContent: 'flex-end', flex: 1, maxWidth: 300 }}>
            <input 
              type="text" 
              placeholder="Type here..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        {/* List Section */}
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Designation</th>
                <th style={thStyle}>Mobile</th>
                <th style={thStyle}>Qualification</th>
                <th style={{ ...thStyle, textAlign: 'center' }}>View</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.map((teacher, index) => (
                <tr key={teacher.id} style={{ borderTop: index !== 0 ? '1px solid #e2e8f0' : 'none' }}>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <FaUserCircle size={24} color="#cbd5e1" />
                      <span style={{ fontWeight: 500, color: '#334155' }}>{teacher.name}</span>
                    </div>
                  </td>
                  <td style={tdStyle}>{teacher.designation}</td>
                  <td style={tdStyle}>{teacher.mobile}</td>
                  <td style={tdStyle}>{teacher.qualification}</td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    <button 
                      onClick={() => setSelectedTeacher(teacher)}
                      style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                      title="View Details"
                    >
                      <FaEye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              
              {filteredTeachers.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '32px', color: '#94a3b8' }}>
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
      </div>

      {/* Modal for View Details */}
      {selectedTeacher && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{ background: '#fff', padding: '32px', borderRadius: '8px', width: '400px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ margin: 0, fontSize: '18px', color: '#2b3674' }}>Teacher Details</h2>
              <button onClick={() => setSelectedTeacher(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                <FaTimes size={16} />
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <FaUserCircle size={48} color="#cbd5e1" />
                <div>
                  <h3 style={{ margin: 0, fontSize: '16px', color: '#334155' }}>{selectedTeacher.name}</h3>
                  <span style={{ fontSize: '13px', color: '#64748b' }}>{selectedTeacher.designation}</span>
                </div>
              </div>
              
              <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />
              
              <div style={detailRow}>
                <span style={detailLabel}>Mobile:</span>
                <span style={detailValue}>{selectedTeacher.mobile}</span>
              </div>
              <div style={detailRow}>
                <span style={detailLabel}>Email:</span>
                <span style={detailValue}>{selectedTeacher.email}</span>
              </div>
              <div style={detailRow}>
                <span style={detailLabel}>Qualification:</span>
                <span style={detailValue}>{selectedTeacher.qualification || 'N/A'}</span>
              </div>
            </div>
            
            <div style={{ marginTop: '32px', textAlign: 'right' }}>
              <button 
                onClick={() => setSelectedTeacher(null)}
                style={{ background: '#5cb85c', color: '#fff', border: 'none', padding: '8px 24px', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '8px 12px',
  borderRadius: 4,
  border: '1px solid #cbd5e1',
  outline: 'none',
  fontSize: 14,
  color: '#334155',
  background: '#fff'
};

const thStyle = {
  padding: '16px',
  textAlign: 'left',
  fontSize: 12,
  fontWeight: 700,
  color: '#0f172a',
  whiteSpace: 'nowrap'
};

const tdStyle = {
  padding: '16px',
  fontSize: 13,
  color: '#475569',
  whiteSpace: 'nowrap'
};

const detailRow = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const detailLabel = {
  fontSize: '14px',
  fontWeight: 600,
  color: '#475569'
};

const detailValue = {
  fontSize: '14px',
  color: '#334155'
};

export default TeacherObservation;
