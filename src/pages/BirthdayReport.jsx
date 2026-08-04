import React, { useState } from 'react';
import { FaFileExcel } from 'react-icons/fa';

const dummyData = [
  { id: 1, sr: 1, name: 'ANUPAM SAMRAT', father: 'Mr. VIVEKANAND YADAV', mother: 'Mrs. MANSHA', class: '4-A', birthday: '3 Aug', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: 2, sr: 2, name: 'DIVYANSHU YADAV', father: 'Mr. HARIKESH YADAV', mother: 'Mrs. MEERA DEVI', class: '10-A', birthday: '3 Aug', img: 'https://randomuser.me/api/portraits/men/44.jpg' }
];

function BirthdayReport() {
  const [reportType, setReportType] = useState('date');
  const [selectedType, setSelectedType] = useState('Student');
  const [date, setDate] = useState('03-Aug');

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', padding: '24px 32px', overflowY: 'auto' }}>
      
      {/* Title */}
      <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', marginBottom: 24 }}>Birthday Report</h1>

      {/* Main Card */}
      <div style={{ background: '#fff', borderRadius: 8, padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        
        {/* Radio Buttons */}
        <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#475569', cursor: 'pointer' }}>
            <input 
              type="radio" 
              name="reportType" 
              checked={reportType === 'date'} 
              onChange={() => setReportType('date')}
              style={{ accentColor: '#2563eb' }}
            /> 
            Date Wise
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#475569', cursor: 'pointer' }}>
            <input 
              type="radio" 
              name="reportType" 
              checked={reportType === 'month'} 
              onChange={() => setReportType('month')}
              style={{ accentColor: '#2563eb' }}
            /> 
            Month Wise
          </label>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, marginBottom: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 12, color: '#64748b' }}>Select</label>
            <select 
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              style={{ border: '1px solid #d1d5db', borderRadius: 4, padding: '8px 12px', fontSize: 13, color: '#334155', minWidth: 200, outline: 'none' }}
            >
              <option value="Student">Student</option>
              <option value="Staff">Staff</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 12, color: '#64748b' }}>{reportType === 'date' ? 'Date' : 'Select'}</label>
            {reportType === 'date' ? (
              <input 
                type="text" 
                value={date}
                disabled
                style={{ border: '1px solid #d1d5db', background: '#e2e8f0', borderRadius: 4, padding: '8px 12px', fontSize: 13, color: '#334155', minWidth: 200, outline: 'none' }}
              />
            ) : (
              <select 
                style={{ border: '1px solid #d1d5db', borderRadius: 4, padding: '8px 12px', fontSize: 13, color: '#334155', minWidth: 200, outline: 'none' }}
              >
                <option value="">Select</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            )}
          </div>

          <button style={{ background: '#4ade80', color: '#fff', border: 'none', borderRadius: 4, padding: '9px 20px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
            GO
          </button>

          <button style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8, background: '#4ade80', color: '#fff', border: 'none', borderRadius: 4, padding: '9px 16px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
            <FaFileExcel style={{ fontSize: 16 }} /> Download
          </button>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: 800 }}>
            <thead>
              <tr>
                <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', fontSize: 13, fontWeight: 700, color: '#1e293b', width: 60 }}>Sr. No.</th>
                <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', fontSize: 13, fontWeight: 700, color: '#1e293b' }}>Student's Name</th>
                <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', fontSize: 13, fontWeight: 700, color: '#1e293b' }}>Father Name</th>
                <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', fontSize: 13, fontWeight: 700, color: '#1e293b' }}>Mother Name</th>
                <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', fontSize: 13, fontWeight: 700, color: '#1e293b' }}>Class</th>
                <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', fontSize: 13, fontWeight: 700, color: '#1e293b' }}>Birthday On</th>
              </tr>
            </thead>
            <tbody>
              {dummyData.map((row, index) => (
                <tr key={row.id} style={{ background: index % 2 === 0 ? '#fafafa' : '#fff' }}>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#475569' }}>{row.sr}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#475569', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', overflow: 'hidden' }}>
                      <img src={row.img} alt={row.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    {row.name}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#475569' }}>{row.father}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#475569' }}>{row.mother}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#475569' }}>{row.class}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#475569' }}>{row.birthday}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      <div style={{ textAlign: 'center', marginTop: 40, paddingBottom: 20, fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>
        COPYRIGHT © 2026 FRANCISCAN
      </div>
    </div>
  );
}

export default BirthdayReport;
