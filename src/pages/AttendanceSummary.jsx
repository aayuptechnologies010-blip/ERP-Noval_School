import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaVideo, FaSearch, FaDownload, FaEye } from 'react-icons/fa';

const dummyData = [
  { id: 1, class: 'NUR A' },
  { id: 2, class: 'NUR B' },
  { id: 3, class: 'LKG A' },
  { id: 4, class: 'LKG B' },
  { id: 5, class: 'UKG A' },
  { id: 6, class: 'UKG B' },
  { id: 7, class: 'UKG C' },
  { id: 8, class: '1 A' },
  { id: 9, class: '1 B' },
  { id: 10, class: '1 C' },
  { id: 11, class: '2 A' },
];

function AttendanceSummary() {
  const navigate = useNavigate();

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Header Bar */}
      <div style={{ padding: '24px 32px 16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Attendance Summary</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#22c55e', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
          Video Tutorial <FaVideo />
        </div>
      </div>

      <div style={{ padding: '0 32px 24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* Left Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <input 
            type="text" 
            value="03-Aug-2026"
            readOnly
            style={{ 
              width: 150, border: '1px solid #e2e8f0', borderRadius: 4, background: '#f1f5f9', 
              padding: '8px 12px', fontSize: 14, color: '#334155', outline: 'none' 
            }}
          />
          <button style={{ background: '#65c466', color: '#fff', border: 'none', borderRadius: 4, padding: '9px 16px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            GO
          </button>
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex' }}>
            <input 
              type="text" 
              placeholder="Search class"
              style={{ 
                width: 150, border: '1px solid #e2e8f0', borderRight: 'none', borderRadius: '4px 0 0 4px', 
                padding: '8px 12px', fontSize: 14, color: '#334155', outline: 'none' 
              }}
            />
            <div style={{ border: '1px solid #e2e8f0', background: '#f1f5f9', borderRadius: '0 4px 4px 0', padding: '0 12px', display: 'flex', alignItems: 'center', color: '#475569', cursor: 'pointer' }}>
              <FaSearch />
            </div>
          </div>
          
          <button style={{ 
            background: '#fff', border: '1px solid #e2e8f0', borderRadius: 4, 
            padding: '8px 16px', fontSize: 14, fontWeight: 600, color: '#334155', 
            display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' 
          }}>
            <FaDownload /> Download
          </button>
        </div>
      </div>

      {/* Main Content Card */}
      <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'hidden' }}>
        <div style={{ background: '#fff', borderRadius: 12, height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          
          <div style={{ flex: 1, overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap' }}>Sl. No.</th>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap' }}>Class</th>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap' }}>Total</th>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap' }}>Total Present</th>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap' }}>Present</th>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap' }}>WH</th>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap' }}>Absent</th>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap' }}>Leave</th>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap' }}>NA</th>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap' }}>Late</th>
                  <th style={{ padding: '16px 20px', textAlign: 'center', fontSize: 12, fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap' }}>View</th>
                </tr>
              </thead>
              <tbody>
                {dummyData.map((item) => (
                  <tr key={item.id} style={{ background: '#f87171', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                    <td style={{ padding: '12px 20px', fontSize: 12, color: '#475569' }}>{item.id}</td>
                    <td style={{ padding: '12px 20px', fontSize: 12, color: '#334155', fontWeight: 500 }}>{item.class}</td>
                    <td style={{ padding: '12px 20px', fontSize: 12, color: '#475569' }}>0</td>
                    <td style={{ padding: '12px 20px', fontSize: 12, color: '#475569' }}>0</td>
                    <td style={{ padding: '12px 20px', fontSize: 12, color: '#475569' }}>0</td>
                    <td style={{ padding: '12px 20px', fontSize: 12, color: '#475569' }}>0</td>
                    <td style={{ padding: '12px 20px', fontSize: 12, color: '#475569' }}>0</td>
                    <td style={{ padding: '12px 20px', fontSize: 12, color: '#475569' }}>0</td>
                    <td style={{ padding: '12px 20px', fontSize: 12, color: '#475569' }}>0</td>
                    <td style={{ padding: '12px 20px', fontSize: 12, color: '#475569' }}>0</td>
                    <td style={{ padding: '12px 20px', textAlign: 'center' }}>
                      <button 
                        onClick={() => navigate('/dashboard/students/attendance/class')}
                        style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', fontSize: 14 }}
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

export default AttendanceSummary;
