import React, { useState } from 'react';
import { FaPrint, FaCheck, FaTimes, FaSearch } from 'react-icons/fa';

const dummyLeaveRequests = [
  { id: 1, staffName: 'Rajesh Kumar', department: 'Mathematics', fromDate: '10-Aug-2026', toDate: '12-Aug-2026', days: 3, reason: 'Family Function', status: 'Pending', appliedOn: '01-Aug-2026' },
  { id: 2, staffName: 'Priya Sharma', department: 'Science', fromDate: '05-Aug-2026', toDate: '06-Aug-2026', days: 2, reason: 'Sick Leave', status: 'Pending', appliedOn: '03-Aug-2026' },
  { id: 3, staffName: 'Amit Patel', department: 'English', fromDate: '01-Aug-2026', toDate: '01-Aug-2026', days: 1, reason: 'Personal Work', status: 'Approved', appliedOn: '28-Jul-2026' },
  { id: 4, staffName: 'Sneha Gupta', department: 'Computer', fromDate: '25-Jul-2026', toDate: '27-Jul-2026', days: 3, reason: 'Out of Station', status: 'Rejected', appliedOn: '20-Jul-2026' },
  { id: 5, staffName: 'Vikram Singh', department: 'Sports', fromDate: '15-Aug-2026', toDate: '16-Aug-2026', days: 2, reason: 'Tournament', status: 'Cancelled', appliedOn: '10-Aug-2026' },
];

function StaffLeave() {
  const [activeTab, setActiveTab] = useState('Pending');
  const [requests, setRequests] = useState(dummyLeaveRequests);

  const tabs = ['Pending', 'Approved', 'Rejected', 'Cancelled'];

  const pendingCount = requests.filter(r => r.status === 'Pending').length;

  const handleUpdateStatus = (id, newStatus) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: newStatus } : req
    ));
  };

  const filteredRequests = requests.filter(req => req.status === activeTab);

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Header Bar */}
      <div style={{ padding: '24px 32px 16px 32px' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Staff Leave</h1>
      </div>

      {/* Main Content Card */}
      <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#fff', borderRadius: 12, height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px' }}>
          
          {/* Top Controls: Tabs & Print Button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              {tabs.map((tab) => (
                <div key={tab} style={{ position: 'relative' }}>
                  <button
                    onClick={() => setActiveTab(tab)}
                    style={{
                      background: activeTab === tab ? '#34a853' : '#f1f3f4',
                      color: activeTab === tab ? '#fff' : '#5f6368',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '8px 16px',
                      fontSize: '14px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {tab}
                  </button>
                  {/* Notification Badge for Pending Tab */}
                  {tab === 'Pending' && pendingCount > 0 && (
                    <span style={{
                      position: 'absolute',
                      top: '-6px',
                      right: '-6px',
                      background: '#ea4335',
                      color: '#fff',
                      fontSize: '10px',
                      fontWeight: 700,
                      width: '16px',
                      height: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%'
                    }}>
                      {pendingCount}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: '#fff',
              color: '#3b82f6',
              border: '1px solid #3b82f6',
              borderRadius: '4px',
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}>
              <FaPrint /> Print PDF
            </button>
          </div>

          {/* Content Area */}
          <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
            {filteredRequests.length > 0 ? (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    <th style={thStyle}>Staff Details</th>
                    <th style={thStyle}>Applied On</th>
                    <th style={thStyle}>Leave Duration</th>
                    <th style={thStyle}>Reason</th>
                    <th style={{ ...thStyle, textAlign: 'center' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((req) => (
                    <tr key={req.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ ...tdStyle, color: '#334155' }}>
                        <div style={{ fontWeight: 700, color: '#0f172a' }}>{req.staffName}</div>
                        <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{req.department}</div>
                      </td>
                      <td style={tdStyle}>{req.appliedOn}</td>
                      <td style={tdStyle}>
                        <div style={{ fontWeight: 600, color: '#334155' }}>{req.fromDate} to {req.toDate}</div>
                        <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{req.days} Day(s)</div>
                      </td>
                      <td style={{ ...tdStyle, whiteSpace: 'normal', minWidth: 150 }}>{req.reason}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        {req.status === 'Pending' ? (
                          <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                            <button 
                              onClick={() => handleUpdateStatus(req.id, 'Approved')}
                              title="Approve"
                              style={{ background: '#22c55e', color: '#fff', border: 'none', borderRadius: 4, width: 28, height: 28, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
                            >
                              <FaCheck size={12} />
                            </button>
                            <button 
                              onClick={() => handleUpdateStatus(req.id, 'Rejected')}
                              title="Reject"
                              style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 4, width: 28, height: 28, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
                            >
                              <FaTimes size={12} />
                            </button>
                          </div>
                        ) : (
                          <span style={{ fontSize: 13, fontWeight: 600, color: '#64748b' }}>Processed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                {/* No Record Found Illustration */}
                <div style={{ 
                  width: 250, 
                  height: 180, 
                  background: '#f8fafc', 
                  borderRadius: 16, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginBottom: 20,
                  position: 'relative'
                }}>
                  <div style={{ border: '2px solid #cbd5e1', width: 160, height: 100, borderRadius: 8, background: '#fff', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                     <div style={{ position: 'absolute', top: -16, width: 32, height: 32, borderRadius: '50%', border: '2px solid #cbd5e1', background: '#f1f5f9' }}></div>
                     <span style={{ fontSize: 11, fontWeight: 700, color: '#334155', letterSpacing: 0.5 }}>NO</span>
                     <span style={{ fontSize: 11, fontWeight: 700, color: '#334155', letterSpacing: 0.5 }}>RECORD FOUND</span>
                  </div>
                  <div style={{ position: 'absolute', left: 10, top: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffe4e6', color: '#ef4444', width: 40, height: 40, borderRadius: '50%', border: '3px solid #fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                     <FaSearch size={18} />
                  </div>
                </div>
                <h3 style={{ margin: 0, fontSize: 16, color: '#475569' }}>No {activeTab} Records Found</h3>
              </div>
            )}
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
  borderBottom: '1px solid #e2e8f0',
};

const tdStyle = {
  padding: '16px 20px',
  fontSize: 13,
  color: '#475569',
  whiteSpace: 'nowrap',
};

export default StaffLeave;
