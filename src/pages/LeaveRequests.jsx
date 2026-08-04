import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCheck, FaTimes, FaVideo, FaEye } from 'react-icons/fa';

const dummyLeaveRequests = [
  { id: 1, admNo: '1770', name: 'ARNAV GUPTA', class: 'NUR A', dateRange: '01-Aug-2026 to 02-Aug-2026', days: 2, reason: 'Fever', status: 'Pending', appliedOn: '30-Jul-2026' },
  { id: 2, admNo: '2203', name: 'ANVI MAURYA', class: 'NUR A', dateRange: '03-Aug-2026 to 05-Aug-2026', days: 3, reason: 'Family Function', status: 'Approved', appliedOn: '01-Aug-2026' },
  { id: 3, admNo: '2206', name: 'SHANVI YADAV', class: 'NUR A', dateRange: '10-Aug-2026 to 10-Aug-2026', days: 1, reason: 'Sick', status: 'Rejected', appliedOn: '08-Aug-2026' },
  { id: 4, admNo: '2219', name: 'DIVYA', class: 'NUR A', dateRange: '12-Aug-2026 to 14-Aug-2026', days: 3, reason: 'Out of station', status: 'Pending', appliedOn: '10-Aug-2026' },
  { id: 5, admNo: '2221', name: 'PRABHAS SAHANI', class: 'NUR A', dateRange: '15-Aug-2026 to 15-Aug-2026', days: 1, reason: 'Personal', status: 'Approved', appliedOn: '14-Aug-2026' },
];

function LeaveRequests() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState(dummyLeaveRequests);

  const handleUpdateStatus = (id, newStatus) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: newStatus } : req
    ));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Approved': return '#22c55e';
      case 'Rejected': return '#ef4444';
      default: return '#f59e0b';
    }
  };

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Header Bar */}
      <div style={{ padding: '24px 32px 12px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Leave Requests</h1>
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
              <option>All Classes</option>
              <option>NUR A</option>
              <option>NUR B</option>
              <option>LKG A</option>
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 150 }}>
            <label style={{ fontSize: 12, color: '#475569', fontWeight: 600 }}>Status</label>
            <select style={{ border: '1px solid #e2e8f0', borderRadius: 6, padding: '9px 12px', fontSize: 14, color: '#334155', outline: 'none', background: '#fff' }}>
              <option>All</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 150 }}>
            <label style={{ fontSize: 12, color: '#475569', fontWeight: 600 }}>From Date</label>
            <input type="date" style={{ border: '1px solid #e2e8f0', borderRadius: 6, padding: '7px 12px', fontSize: 14, color: '#334155', outline: 'none', background: '#fff' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 150 }}>
            <label style={{ fontSize: 12, color: '#475569', fontWeight: 600 }}>To Date</label>
            <input type="date" style={{ border: '1px solid #e2e8f0', borderRadius: 6, padding: '7px 12px', fontSize: 14, color: '#334155', outline: 'none', background: '#fff' }} />
          </div>
          <button style={{ background: '#65c466', color: '#fff', border: 'none', borderRadius: 6, padding: '9px 22px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
            SEARCH
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
                  <th style={thStyle}>Student Info</th>
                  <th style={thStyle}>Applied On</th>
                  <th style={thStyle}>Leave Duration</th>
                  <th style={thStyle}>Reason</th>
                  <th style={thStyle}>Status</th>
                  <th style={{ ...thStyle, textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req, idx) => (
                  <tr key={req.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={tdStyle}>{idx + 1}</td>
                    <td style={{ ...tdStyle, color: '#334155' }}>
                      <div style={{ fontWeight: 600 }}>{req.name}</div>
                      <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>Class: {req.class} | Adm No: {req.admNo}</div>
                    </td>
                    <td style={tdStyle}>{req.appliedOn}</td>
                    <td style={tdStyle}>
                      <div style={{ fontWeight: 500, color: '#334155' }}>{req.dateRange}</div>
                      <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{req.days} Day(s)</div>
                    </td>
                    <td style={{ ...tdStyle, whiteSpace: 'normal', minWidth: 150 }}>{req.reason}</td>
                    <td style={tdStyle}>
                      <span style={{ 
                        background: `${getStatusColor(req.status)}20`, 
                        color: getStatusColor(req.status), 
                        padding: '4px 10px', 
                        borderRadius: 12, 
                        fontSize: 12, 
                        fontWeight: 700 
                      }}>
                        {req.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                        <button 
                          title="View Details"
                          style={{ background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: 4, width: 28, height: 28, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
                        >
                          <FaEye size={12} />
                        </button>
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

export default LeaveRequests;
