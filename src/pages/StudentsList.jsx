import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaListUl, FaThLarge } from 'react-icons/fa';

const dummyData = [
  { id: 1, admissionNo: '1770', name: 'ARNAV GUPTA', class: 'NUR-A', dob: '15-Mar-2023', fatherName: 'Mr. HANUMAN GUPTA', motherName: 'Mrs. GAURI GUPTA', contact: '8957244533' },
  { id: 2, admissionNo: '2203', name: 'ANVI MAURYA', class: 'NUR-A', dob: '21-Jul-2022', fatherName: 'Mr. ARVIND KUMAR MAURYA', motherName: 'Mrs. SANDHYA MAURYA', contact: '9795383676' },
  { id: 3, admissionNo: '2206', name: 'SHANVI YADAV', class: 'NUR-A', dob: '23-Aug-2024', fatherName: 'Mr. ANUP YADAV', motherName: 'Mrs. SUNITA YADAV', contact: '9935510508' },
  { id: 4, admissionNo: '2219', name: 'DIVYA', class: 'NUR-A', dob: '08-Feb-2022', fatherName: 'Mr. DINESH KUMAR', motherName: 'Mrs. JYOTI', contact: '6388242775' },
  { id: 5, admissionNo: '2221', name: 'PRABHAS SAHANI', class: 'NUR-A', dob: '03-Sep-2020', fatherName: 'Mr. RAVI KUMAR', motherName: 'Mrs. RAJMATI', contact: '7754072048' },
  { id: 6, admissionNo: '2224', name: 'GAUNIK RAI', class: 'NUR-A', dob: '03-Oct-2021', fatherName: 'Mr. GAURAV RAI', motherName: 'Mrs. NIDHI RAI', contact: '9580717042' },
  { id: 7, admissionNo: '2235', name: 'DIPENDRA NISHAD', class: 'NUR-A', dob: '02-Dec-2022', fatherName: 'Mr. MADHURENDRA NISHAD', motherName: 'Mrs. SIMA NISHAD', contact: '9506359192' },
  { id: 8, admissionNo: '2237', name: 'NAVYA CHAURASIYA', class: 'NUR-A', dob: '29-Oct-2022', fatherName: 'Mr. NAVIN KUMAR CHAURASIYA', motherName: 'Mrs. JYOTI KUMARI', contact: '8418901397' }
];

function StudentsList() {
  const [sensitiveData, setSensitiveData] = useState(true);
  const navigate = useNavigate();

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Header */}
      <div style={{ padding: '24px 32px 16px 32px' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Students List</h1>
      </div>

      {/* Filters Section */}
      <div style={{ padding: '0 32px 24px 32px', display: 'flex', alignItems: 'flex-end', gap: 24 }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 200 }}>
            <label style={{ fontSize: 13, color: '#475569', fontWeight: 500 }}>Search by</label>
            <select style={{ border: '1px solid #e2e8f0', borderRadius: 4, padding: '10px 12px', fontSize: 14, color: '#334155', outline: 'none', background: '#fff' }}>
              <option>All</option>
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
            <label style={{ fontSize: 13, color: '#475569', fontWeight: 500 }}>&nbsp;</label>
            <input 
              type="text" 
              placeholder="Type here..." 
              style={{ border: '1px solid #e2e8f0', borderRadius: 4, padding: '10px 12px', fontSize: 14, color: '#334155', outline: 'none', background: '#fff' }}
            />
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 10 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#334155', cursor: 'pointer' }}>
            <input type="radio" name="studentType" defaultChecked style={{ accentColor: '#3b82f6' }} /> All
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#334155', cursor: 'pointer' }}>
            <input type="radio" name="studentType" style={{ accentColor: '#3b82f6' }} /> Boarding
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#334155', cursor: 'pointer' }}>
            <input type="radio" name="studentType" style={{ accentColor: '#3b82f6' }} /> Day Scholar
          </label>
        </div>
        
        <button style={{ 
          background: '#65c466', color: '#fff', border: 'none', borderRadius: 4, 
          padding: '10px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer',
          marginBottom: 2
        }}>
          SEARCH
        </button>
      </div>

      {/* Main Content Card */}
      <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#fff', borderRadius: 12, flex: 1, display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          
          {/* Card Header */}
          <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: '#334155', margin: 0 }}>
              Students - (Total: 1232)
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
                {dummyData.map((student, index) => (
                  <tr key={student.id} style={{ borderBottom: index !== dummyData.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                    <td style={{ padding: '16px 24px', fontSize: 13, color: '#475569' }}>{student.admissionNo}</td>
                    <td style={{ padding: '16px 24px', fontSize: 13, color: '#334155', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap' }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#64748b', overflow: 'hidden' }}>
                         <img src={`https://ui-avatars.com/api/?name=${student.name}&background=6366f1&color=fff`} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      {student.name}
                    </td>
                    <td style={{ padding: '16px 24px', fontSize: 13, color: '#475569' }}>{student.class}</td>
                    <td style={{ padding: '16px 24px', fontSize: 13, color: '#475569' }}>{student.dob}</td>
                    <td style={{ padding: '16px 24px', fontSize: 13, color: '#475569' }}>{student.fatherName}</td>
                    <td style={{ padding: '16px 24px', fontSize: 13, color: '#475569' }}>{student.motherName}</td>
                    <td style={{ padding: '16px 24px', fontSize: 13, color: '#475569' }}>{student.contact}</td>
                    <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                      <button 
                        onClick={() => navigate('/dashboard/students/profile')}
                        style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: 16 }}
                      >
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentsList;
