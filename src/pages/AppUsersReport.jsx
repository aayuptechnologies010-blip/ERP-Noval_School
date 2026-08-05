import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { FaPrint, FaArrowLeft } from 'react-icons/fa';

const donutData = [
  { name: 'Android', value: 349, color: '#10b981', percent: '13.95%' },
  { name: 'IOS', value: 3, color: '#8b5cf6', percent: '0.12%' },
  { name: 'Both', value: 4, color: '#fcd34d', percent: '0.16%' },
  { name: 'Remaining', value: 2146, color: '#fb7185', percent: '85.77%' },
];

const totalUsers = 2502;

const androidUsers = [
  { id: 1, name: 'SHASHANK RAI', father: 'Mr. PRABHAKAR RAI', gender: 'Male', admissionNo: '200', className: '7-A', mobile: '9415846993' },
  { id: 2, name: 'ATHARV KUMAR GUPT', father: 'Mr. KRISHNA MOHAN NIGAM', gender: 'Male', admissionNo: '1242', className: '8-B', mobile: '9450599254' },
];

const remainingUsers = [
  { id: 1, name: 'AMAN KUMAR', father: 'Mr. RAMESH KUMAR', gender: 'Male', admissionNo: '102', className: '6-A', mobile: '9876543210' },
  { id: 2, name: 'SNEHA SINGH', father: 'Mr. VIJAY SINGH', gender: 'Female', admissionNo: '304', className: '9-C', mobile: '8765432109' },
];

function AppUsersReport() {
  const [activeTab, setActiveTab] = useState('Overall');
  const [showReport, setShowReport] = useState(false);

  if (showReport) {
    return (
      <div style={{ flex: 1, background: '#f4f6f9', padding: '24px', minHeight: '100vh', boxSizing: 'border-box' }}>
        <h1 style={{ fontSize: 20, fontWeight: 600, color: '#333', margin: '0 0 20px' }}>App Users</h1>
        <div style={{ background: '#fff', borderRadius: 8, padding: 32, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          
          {/* Header Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginBottom: 24 }}>
            <button onClick={() => setShowReport(false)} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 4, cursor: 'pointer', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
              <FaArrowLeft /> Back
            </button>
            <button style={{ background: '#5cb85c', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 4, cursor: 'pointer', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
              <FaPrint /> Print / Download
            </button>
          </div>

          {/* Report Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #eee', paddingBottom: 16, marginBottom: 24 }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 600, color: '#333' }}>NAVALS NATIONAL ACADEMY</h2>
              <p style={{ margin: '4px 0 0', fontSize: 13, color: '#555' }}>DOHRIGHAT , MAU, Affiliated to CBSE, New Delhi</p>
            </div>
            <div style={{ fontSize: 13, color: '#555' }}>
              Report as on {new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })}
            </div>
          </div>

          {/* Report Title */}
          <div style={{ background: '#f1f5f9', padding: '10px', textAlign: 'center', fontWeight: 600, color: '#333', fontSize: 15, marginBottom: 4 }}>
            App Users Report
          </div>
          <div style={{ background: '#f8fafc', padding: '8px', textAlign: 'center', fontWeight: 500, color: '#555', fontSize: 13, marginBottom: 32 }}>
            Students details
          </div>

          {/* Tables */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            
            {/* Android Users */}
            <div>
              <h4 style={{ margin: '0 0 12px', fontSize: 14, color: '#333', fontWeight: 600 }}>Android User ({androidUsers.length})</h4>
              <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #eee' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <th style={thStyle}>Sl. No.</th>
                    <th style={thStyle}>Student Name</th>
                    <th style={thStyle}>Father Name</th>
                    <th style={thStyle}>Gender</th>
                    <th style={thStyle}>AdmissionNo</th>
                    <th style={thStyle}>Class Name</th>
                    <th style={thStyle}>Mobile</th>
                  </tr>
                </thead>
                <tbody>
                  {androidUsers.map((u, i) => (
                    <tr key={u.id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={tdStyle}>{i + 1}</td>
                      <td style={tdStyle}>{u.name}</td>
                      <td style={tdStyle}>{u.father}</td>
                      <td style={tdStyle}>{u.gender}</td>
                      <td style={tdStyle}>{u.admissionNo}</td>
                      <td style={tdStyle}>{u.className}</td>
                      <td style={tdStyle}>{u.mobile}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* iOS Users */}
            <div>
              <h4 style={{ margin: '0 0 12px', fontSize: 14, color: '#333', fontWeight: 600 }}>IOS User (0)</h4>
            </div>

            {/* Both Users */}
            <div>
              <h4 style={{ margin: '0 0 12px', fontSize: 14, color: '#333', fontWeight: 600 }}>Android & IOS User (0)</h4>
            </div>

            {/* Remaining Users */}
            <div>
              <h4 style={{ margin: '0 0 12px', fontSize: 14, color: '#333', fontWeight: 600 }}>Remaining User (1230)</h4>
              <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #eee' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <th style={thStyle}>Sl. No.</th>
                    <th style={thStyle}>Student Name</th>
                    <th style={thStyle}>Father Name</th>
                    <th style={thStyle}>Gender</th>
                    <th style={thStyle}>AdmissionNo</th>
                    <th style={thStyle}>Class Name</th>
                    <th style={thStyle}>Mobile</th>
                  </tr>
                </thead>
                <tbody>
                  {remainingUsers.map((u, i) => (
                    <tr key={u.id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={tdStyle}>{i + 1}</td>
                      <td style={tdStyle}>{u.name}</td>
                      <td style={tdStyle}>{u.father}</td>
                      <td style={tdStyle}>{u.gender}</td>
                      <td style={tdStyle}>{u.admissionNo}</td>
                      <td style={tdStyle}>{u.className}</td>
                      <td style={tdStyle}>{u.mobile}</td>
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

  return (
    <div style={{ flex: 1, background: '#f4f6f9', padding: '24px', minHeight: '100vh', boxSizing: 'border-box' }}>
      <h1 style={{ fontSize: 20, fontWeight: 600, color: '#333', margin: '0 0 20px' }}>App Users</h1>
      
      <div style={{ background: '#fff', borderRadius: 8, padding: 32, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        
        {/* Top Header Row with Tabs and Button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: 16, marginBottom: 40 }}>
          <div style={{ display: 'flex', gap: 16 }}>
            {['Overall', 'Parent', 'Staff', 'Student'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: activeTab === tab ? '#5cb85c' : 'transparent',
                  color: activeTab === tab ? '#fff' : '#64748b',
                  border: 'none',
                  padding: '6px 16px',
                  borderRadius: 4,
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 500,
                  transition: 'background 0.2s'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
          <button 
            onClick={() => setShowReport(true)}
            style={{ background: '#5cb85c', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: 4, cursor: 'pointer', fontSize: 14, fontWeight: 600 }}
          >
            Get Report
          </button>
        </div>

        {/* Chart Area */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap' }}>
          
          {/* Donut Chart */}
          <div style={{ width: 400, height: 400, position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={110}
                  outerRadius={150}
                  paddingAngle={0}
                  dataKey="value"
                  stroke="none"
                >
                  {donutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Center Label */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <p style={{ margin: 0, fontSize: 16, color: '#666', fontWeight: 500 }}>Total</p>
              <h2 style={{ margin: 0, fontSize: 28, color: '#333', fontWeight: 700 }}>{totalUsers}</h2>
            </div>
            
            {/* Legend Labels on Chart */}
            <div style={{ position: 'absolute', top: 50, right: 80, background: '#10b981', color: '#fff', fontSize: 12, padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>13.9%</div>
            <div style={{ position: 'absolute', bottom: 50, left: 160, color: '#fff', fontSize: 12, fontWeight: 700 }}>85.8%</div>
          </div>

          {/* Stats List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 250 }}>
            {donutData.map(item => (
              <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 15, fontWeight: 500, color: '#333' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: item.color }} />
                  {item.name}:
                </div>
                <div style={{ textAlign: 'right' }}>
                  {item.value} <span style={{ color: '#777', fontSize: 14 }}>({item.percent})</span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Legend */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 40 }}>
          {donutData.map(item => (
            <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#555', fontWeight: 600 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.color }} />
              {item.name}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

const thStyle = { padding: '10px 14px', fontSize: 12, fontWeight: 700, color: '#333', textAlign: 'left', whiteSpace: 'nowrap' };
const tdStyle = { padding: '10px 14px', fontSize: 12, color: '#555' };

export default AppUsersReport;
