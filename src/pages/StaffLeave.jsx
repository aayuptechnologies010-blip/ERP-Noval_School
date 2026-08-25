import React, { useState, useEffect } from 'react';
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
  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/staff-leaves`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (response.ok && data.leaveRequests) {
          const mappedLeaves = data.leaveRequests.map(req => {
            const firstName = req.staffId?.firstName || '';
            const lastName = req.staffId?.lastName || '';
            const staffName = (firstName || lastName) ? `${firstName} ${lastName}`.trim() : 'Unknown Staff';
            return {
              id: req._id,
              staffName,
              department: req.staffId?.designation || 'Staff',
              fromDate: req.fromDate ? req.fromDate.split('T')[0] : '',
              toDate: req.toDate ? req.toDate.split('T')[0] : '',
              days: req.totalDays || 1,
              reason: req.reason,
              status: req.status,
              appliedOn: req.createdAt ? new Date(req.createdAt).toLocaleDateString('en-GB') : '',
              createdAtRaw: req.createdAt || ''
            };
          });
          // Sort by createdAt descending
          mappedLeaves.sort((a, b) => new Date(b.createdAtRaw || 0) - new Date(a.createdAtRaw || 0));
          setRequests(mappedLeaves);
        }
      } catch (error) {
        console.error("Error fetching staff leaves:", error);
      }
    };

    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/staff-leaves/stats`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (response.ok && data.stats) {
          const statsMap = {};
          data.stats.forEach(item => {
            statsMap[item._id] = item.count;
          });
          setStats(statsMap);
        }
      } catch (error) {
        console.error("Error fetching staff leave stats:", error);
      }
    };

    fetchLeaves();
    fetchStats();
  }, []);

  const tabs = ['Pending', 'Approved', 'Rejected', 'Cancelled'];

  const pendingCount = stats['Pending'] || 0;

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/staff-leaves/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          status: newStatus,
          adminRemarks: newStatus === 'Approved' ? 'Enjoy the function' : ''
        })
      });
      if (response.ok) {
        setRequests(requests.map(req => 
          req.id === id ? { ...req, status: newStatus } : req
        ));
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status", error);
      alert("Error updating status");
    }
  };

  const filteredRequests = requests.filter(req => req.status === activeTab);

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 70px)', boxSizing: 'border-box' }}>
      
      {/* Header Bar */}
      <div style={{ padding: '32px 32px 16px 32px' }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#2b3674', margin: 0, fontFamily: 'Poppins, sans-serif' }}>Staff Leave</h1>
      </div>

      {/* Main Content Card */}
      <div style={{ padding: '0 32px 32px 32px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#fff', borderRadius: 16, display: 'flex', flexDirection: 'column', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', padding: '28px', border: '1px solid #f1f5f9' }}>
          
          {/* Top Controls: Tabs & Print Button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {tabs.map((tab) => (
                <div key={tab} style={{ position: 'relative' }}>
                  <button
                    onClick={() => setActiveTab(tab)}
                    style={{
                      background: activeTab === tab ? '#28a745' : '#e9ecef',
                      color: activeTab === tab ? '#fff' : '#495057',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '10px 20px',
                      fontSize: '14px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      fontFamily: 'Inter, sans-serif'
                    }}
                  >
                    {tab}
                  </button>
                  {/* Notification Badge for Tab */}
                  {stats[tab] > 0 && (
                    <span style={{
                      position: 'absolute',
                      top: '-6px',
                      right: '-6px',
                      background: tab === 'Pending' ? '#dc3545' : tab === 'Approved' ? '#28a745' : '#6c757d',
                      color: '#fff',
                      fontSize: '11px',
                      fontWeight: 700,
                      width: '18px',
                      height: '18px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      border: '2px solid #fff'
                    }}>
                      {stats[tab]}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: '#fff',
              color: '#007bff',
              border: '1px solid #007bff',
              borderRadius: '6px',
              padding: '10px 20px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontFamily: 'Inter, sans-serif'
            }}>
              <FaPrint /> Print PDF
            </button>
          </div>

          {/* Content Area */}
          <div style={{ overflowX: 'auto' }}>
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
                      <td style={tdStyle}>
                        <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '14px' }}>{req.staffName}</div>
                        <div style={{ fontSize: '12px', color: '#64748b', marginTop: 4 }}>{req.department}</div>
                      </td>
                      <td style={tdStyle}>{req.appliedOn}</td>
                      <td style={tdStyle}>
                        <div style={{ fontWeight: 600, color: '#334155' }}>
                          <span style={{ color: '#ef4444' }}>{req.fromDate.split('-')[0]}</span>
                          {req.fromDate.substring(req.fromDate.indexOf('-'))} to <span style={{ color: '#ef4444' }}>{req.toDate.split('-')[0]}</span>
                          {req.toDate.substring(req.toDate.indexOf('-'))}
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748b', marginTop: 4 }}>{req.days} Day(s)</div>
                      </td>
                      <td style={{ ...tdStyle, whiteSpace: 'normal', minWidth: 150 }}>{req.reason}</td>
                      <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                        {req.status === 'Pending' ? (
                          <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                            <button 
                              onClick={() => handleUpdateStatus(req.id, 'Approved')}
                              title="Approve"
                              style={{ background: '#28a745', color: '#fff', border: 'none', borderRadius: 6, width: 32, height: 32, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                              onMouseOver={e => e.currentTarget.style.background = '#218838'}
                              onMouseOut={e => e.currentTarget.style.background = '#28a745'}
                            >
                              <FaCheck size={14} />
                            </button>
                            <button 
                              onClick={() => handleUpdateStatus(req.id, 'Rejected')}
                              title="Reject"
                              style={{ background: '#dc3545', color: '#fff', border: 'none', borderRadius: 6, width: 32, height: 32, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                              onMouseOver={e => e.currentTarget.style.background = '#c82333'}
                              onMouseOut={e => e.currentTarget.style.background = '#dc3545'}
                            >
                              <FaTimes size={14} />
                            </button>
                          </div>
                        ) : (
                          <span style={{ fontSize: 13, fontWeight: 700, color: req.status === 'Approved' ? '#28a745' : req.status === 'Rejected' ? '#dc3545' : '#6c757d' }}>{req.status}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', padding: '40px 0' }}>
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
  fontSize: 14,
  fontWeight: 700,
  color: '#1e293b',
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
