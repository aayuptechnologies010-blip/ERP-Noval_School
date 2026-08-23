import React, { useState } from 'react';

function MyLeave() {
  const [leaveType, setLeaveType] = useState('Sick Leave');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');

  const [leaves, setLeaves] = useState([
    { id: 1, type: 'Sick Leave', from: '2023-10-10', to: '2023-10-11', status: 'Approved', appliedOn: '2023-10-09' },
    { id: 2, type: 'Casual Leave', from: '2023-09-15', to: '2023-09-15', status: 'Rejected', appliedOn: '2023-09-10' },
  ]);

  const handleApply = async () => {
    if (!fromDate || !toDate || !reason) {
      alert('Please fill all fields');
      return;
    }

    try {
      // NOTE: Replace this static staffId with the dynamic ID from auth/user state
      const staffId = "6a70ca17725fe0a34ed8e89e"; 

      const payload = {
        staffId,
        leaveType,
        fromDate,
        toDate,
        reason
      };

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/staff-leaves`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok && data.leaveRequest) {
        alert(data.message || 'Leave applied successfully!');
        
        const newLeave = {
          id: data.leaveRequest._id,
          type: data.leaveRequest.leaveType,
          from: data.leaveRequest.fromDate.split('T')[0],
          to: data.leaveRequest.toDate.split('T')[0],
          status: data.leaveRequest.status,
          appliedOn: data.leaveRequest.createdAt.split('T')[0]
        };
        
        setLeaves([newLeave, ...leaves]);
        setFromDate('');
        setToDate('');
        setReason('');
      } else {
        alert(data.message || 'Failed to apply leave');
      }
    } catch (error) {
      console.error("Error creating leave:", error);
      alert('An error occurred while applying for leave.');
    }
  };

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Header Bar */}
      <div style={{ padding: '24px 32px 16px 32px' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>My Leave</h1>
      </div>

      {/* Main Content Card */}
      <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
        
        {/* Apply Leave Form */}
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#334155', margin: '0 0 24px 0' }}>Apply Leave</h2>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1, minWidth: 200 }}>
              <label style={labelStyle}>Leave Type</label>
              <select value={leaveType} onChange={e => setLeaveType(e.target.value)} style={inputStyle}>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Earned Leave">Earned Leave</option>
              </select>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1, minWidth: 150 }}>
              <label style={labelStyle}>From Date</label>
              <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} style={inputStyle} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1, minWidth: 150 }}>
              <label style={labelStyle}>To Date</label>
              <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} style={inputStyle} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 2, minWidth: 300 }}>
              <label style={labelStyle}>Reason</label>
              <input type="text" placeholder="Enter reason..." value={reason} onChange={e => setReason(e.target.value)} style={inputStyle} />
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button onClick={handleApply} style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: 4, fontSize: 14, fontWeight: 600, cursor: 'pointer', height: 42 }}>
                Apply
              </button>
            </div>

          </div>
        </div>

        {/* Leave History Table */}
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflowX: 'auto' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#334155', margin: '24px 24px 16px 24px' }}>Leave History</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                <th style={thStyle}>Applied On</th>
                <th style={thStyle}>Leave Type</th>
                <th style={thStyle}>From Date</th>
                <th style={thStyle}>To Date</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((row) => (
                <tr key={row.id} style={{ borderTop: '1px solid #f1f5f9' }}>
                  <td style={tdStyle}>{row.appliedOn}</td>
                  <td style={tdStyle}>{row.type}</td>
                  <td style={tdStyle}>{row.from}</td>
                  <td style={tdStyle}>{row.to}</td>
                  <td style={tdStyle}>
                    <span style={{ 
                      padding: '4px 8px', borderRadius: 4, fontSize: 12, fontWeight: 600,
                      background: row.status === 'Approved' ? '#dcfce7' : row.status === 'Rejected' ? '#fee2e2' : '#fef3c7',
                      color: row.status === 'Approved' ? '#16a34a' : row.status === 'Rejected' ? '#ef4444' : '#d97706'
                    }}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

const labelStyle = {
  fontSize: 13, color: '#475569', fontWeight: 600
};

const inputStyle = {
  padding: '10px 12px',
  borderRadius: 4,
  border: '1px solid #cbd5e1',
  outline: 'none',
  fontSize: 14,
  color: '#334155',
  background: '#fff',
  boxSizing: 'border-box'
};

const thStyle = {
  padding: '16px',
  textAlign: 'left',
  fontSize: 13,
  fontWeight: 700,
  color: '#0f172a',
  whiteSpace: 'nowrap'
};

const tdStyle = {
  padding: '16px',
  fontSize: 14,
  color: '#475569'
};

export default MyLeave;
