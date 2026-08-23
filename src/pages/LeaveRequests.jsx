import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCheck, FaTimes, FaVideo, FaEye, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const thStyle = { padding: '14px 16px', textAlign: 'left', fontSize: 13, color: '#475569', fontWeight: 700, borderBottom: '1px solid #e2e8f0', textTransform: 'uppercase', letterSpacing: '0.05em' };
const tdStyle = { padding: '14px 16px', fontSize: 14, borderBottom: '1px solid #f1f5f9', verticalAlign: 'middle' };

function LeaveRequests() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [selectedLeaveId, setSelectedLeaveId] = useState(null);
  const [leaveDetails, setLeaveDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [stats, setStats] = useState(null);
  const [availableClasses, setAvailableClasses] = useState([]);
  const [adminRemarks, setAdminRemarks] = useState('');
  const [leaveTypeUpdate, setLeaveTypeUpdate] = useState('');
  const [loading, setLoading] = useState(false);

  const [filterClass, setFilterClass] = useState('All');
  const [filterSection, setFilterSection] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Example pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  const fetchLeaveRequests = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      let url = `${import.meta.env.VITE_API_BASE_URL}/api/leave-requests?page=${page}&limit=${limit}`;
      
      // We can append filters if the backend supports them
      if (filterClass !== 'All') {
        url += `&class=${filterClass}`;
      }
      if (filterSection !== 'All') {
        url += `&section=${filterSection}`;
      }
      if (filterStatus !== 'All') {
        url += `&status=${filterStatus}`;
      }
      if (searchQuery.trim() !== '') {
        url += `&search=${encodeURIComponent(searchQuery.trim())}`;
      }
      // Assuming backend supports startDate / endDate
      if (fromDate) url += `&fromDate=${fromDate}`;
      if (toDate) url += `&toDate=${toDate}`;

      const response = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
      if (response.ok) {
        const data = await response.json();
        setRequests(data.leaveRequests || []);
        setTotal(data.total || 0);
      } else {
        toast.error("Failed to fetch leave requests");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching leave requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, [page]);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/leave-requests/stats`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
      }
    } catch (e) {
      console.error("Error fetching stats", e);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchClasses = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/promotions/classes`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setAvailableClasses(data.classes || []);
      }
    } catch (e) {
      console.error("Error fetching classes", e);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);



  useEffect(() => {
    setPage(1);
    fetchLeaveRequests();
  }, [limit]);

  useEffect(() => {
    if (selectedLeaveId) {
      const fetchSingleLeave = async () => {
        setLoadingDetails(true);
        try {
          const token = localStorage.getItem('token');
          const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/leave-requests/${selectedLeaveId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (res.ok) {
            const data = await res.json();
            setLeaveDetails(data);
            setAdminRemarks(data.adminRemarks || '');
            setLeaveTypeUpdate(data.leaveType || '');
          } else {
            toast.error("Failed to load leave details");
            setSelectedLeaveId(null);
          }
        } catch (error) {
          console.error(error);
          toast.error("Error loading leave details");
          setSelectedLeaveId(null);
        } finally {
          setLoadingDetails(false);
        }
      };
      fetchSingleLeave();
    } else {
      setLeaveDetails(null);
    }
  }, [selectedLeaveId]);


  const handleUpdateStatus = async (id, newStatus, remarks = '', type = '') => {
    try {
      const token = localStorage.getItem('token');
      const bodyPayload = { status: newStatus };
      if (remarks !== '') bodyPayload.adminRemarks = remarks;
      if (type !== '') bodyPayload.leaveType = type;
      
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/leave-requests/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bodyPayload)
      });
      if (response.ok) {
        toast.success(`Request ${newStatus} successfully`);
        setRequests(requests.map(req => 
          req._id === id ? { ...req, status: newStatus } : req
        ));
      } else {
        toast.error("Failed to update status");
      }
    } catch (e) {
      console.error(e);
      toast.error("Error updating status");
    }
  };


  const handleDeleteLeave = async (id) => {
    if (!window.confirm("Are you sure you want to delete this leave request?")) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/leave-requests/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        toast.success("Leave request deleted successfully");
        setRequests(requests.filter(req => req._id !== id));
        if (selectedLeaveId === id) setSelectedLeaveId(null);
      } else {
        toast.error("Failed to delete leave request");
      }
    } catch (e) {
      console.error(e);
      toast.error("Error deleting leave request");
    }
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


      <div style={{ padding: '0 32px 0 32px' }}>

      {/* Stats Cards */}
      {stats && (
        <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
          <div style={{ flex: 1, padding: 16, background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #3b82f6' }}>
            <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>Total Requests</div>
            <div style={{ fontSize: 24, color: '#1e293b', fontWeight: 700 }}>{stats.Total || 0}</div>
          </div>
          <div style={{ flex: 1, padding: 16, background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #f59e0b' }}>
            <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>Pending</div>
            <div style={{ fontSize: 24, color: '#1e293b', fontWeight: 700 }}>{stats.Pending || 0}</div>
          </div>
          <div style={{ flex: 1, padding: 16, background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #22c55e' }}>
            <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>Approved</div>
            <div style={{ fontSize: 24, color: '#1e293b', fontWeight: 700 }}>{stats.Approved || 0}</div>
          </div>
          <div style={{ flex: 1, padding: 16, background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #ef4444' }}>
            <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>Rejected</div>
            <div style={{ fontSize: 24, color: '#1e293b', fontWeight: 700 }}>{stats.Rejected || 0}</div>
          </div>
        </div>
      )}

      </div>
      {/* Filter Card */}
      <div style={{ padding: '0 32px 16px 32px' }}>
        <div style={{ background: '#fff', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', padding: '20px 24px', display: 'flex', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 120 }}>
            <label style={{ fontSize: 12, color: '#475569', fontWeight: 600 }}>Class</label>
            <select value={filterClass} onChange={e => { setFilterClass(e.target.value); setFilterSection('All'); }} style={{ border: '1px solid #e2e8f0', borderRadius: 6, padding: '9px 12px', fontSize: 14, color: '#334155', outline: 'none', background: '#fff' }}>
              <option>All</option>
              {availableClasses.map(c => (
                <option key={c.class} value={c.class}>{c.class}</option>
              ))}
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 100 }}>
            <label style={{ fontSize: 12, color: '#475569', fontWeight: 600 }}>Section</label>
            <select value={filterSection} onChange={e => setFilterSection(e.target.value)} style={{ border: '1px solid #e2e8f0', borderRadius: 6, padding: '9px 12px', fontSize: 14, color: '#334155', outline: 'none', background: '#fff' }}>
              <option>All</option>
              {filterClass !== 'All' 
                ? availableClasses.find(c => c.class === filterClass)?.sections.map(s => (
                    <option key={s.section} value={s.section}>{s.section}</option>
                  ))
                : null
              }
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 200, flex: 1 }}>
            <label style={{ fontSize: 12, color: '#475569', fontWeight: 600 }}>Search Student</label>
            <input type="text" placeholder="Name or Adm No." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ border: '1px solid #e2e8f0', borderRadius: 6, padding: '8px 12px', fontSize: 14, color: '#334155', outline: 'none', background: '#fff' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 150 }}>
            <label style={{ fontSize: 12, color: '#475569', fontWeight: 600 }}>Status</label>
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ border: '1px solid #e2e8f0', borderRadius: 6, padding: '9px 12px', fontSize: 14, color: '#334155', outline: 'none', background: '#fff' }}>
              <option>All</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 150 }}>
            <label style={{ fontSize: 12, color: '#475569', fontWeight: 600 }}>From Date</label>
            <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} style={{ border: '1px solid #e2e8f0', borderRadius: 6, padding: '7px 12px', fontSize: 14, color: '#334155', outline: 'none', background: '#fff' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 150 }}>
            <label style={{ fontSize: 12, color: '#475569', fontWeight: 600 }}>To Date</label>
            <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} style={{ border: '1px solid #e2e8f0', borderRadius: 6, padding: '7px 12px', fontSize: 14, color: '#334155', outline: 'none', background: '#fff' }} />
          </div>
          <button onClick={() => { setPage(1); fetchLeaveRequests(); }} style={{ background: '#65c466', color: '#fff', border: 'none', borderRadius: 6, padding: '9px 22px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
            SEARCH
          </button>
        </div>
      </div>

      {/* Main Content Card */}
      <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'hidden' }}>
        <div style={{ background: '#fff', borderRadius: 12, height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
           
          <div style={{ flex: 1, overflow: 'auto' }}>
            {loading ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading leave requests...</div>
            ) : (
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
                {requests.map((req, idx) => {
                  const studentName = req.studentId?.personalDetails ? `${req.studentId.personalDetails.firstName || ''} ${req.studentId.personalDetails.lastName || ''}` : 'Unknown';
                  const admNo = req.studentId?.academicDetails?.admissionNumber || 'N/A';
                  
                  return (
                  <tr key={req._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={tdStyle}>{(page - 1) * limit + idx + 1}</td>
                    <td style={{ ...tdStyle, color: '#334155' }}>
                      <div style={{ fontWeight: 600 }}>{studentName}</div>
                      <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>Class: {req.class}-{req.section} | Adm No: {admNo}</div>
                      <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>Type: {req.leaveType || 'General'}</div>
                    </td>
                    <td style={tdStyle}>{new Date(req.createdAt).toLocaleDateString('en-GB')}</td>
                    <td style={tdStyle}>
                      <div style={{ fontWeight: 500, color: '#334155' }}>
                        {new Date(req.fromDate).toLocaleDateString('en-GB')} to {new Date(req.toDate).toLocaleDateString('en-GB')}
                      </div>
                      <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{req.totalDays} Day(s)</div>
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
                          onClick={() => setSelectedLeaveId(req._id)}
                          title="View Details"
                          style={{ background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: 4, width: 28, height: 28, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
                        >
                          <FaEye size={12} />
                        </button>
                        <button 
                          onClick={() => handleUpdateStatus(req._id, 'Approved')}
                          title="Approve"
                          disabled={req.status === 'Approved'}
                          style={{ background: req.status === 'Approved' ? '#e2e8f0' : '#22c55e', color: '#fff', border: 'none', borderRadius: 4, width: 28, height: 28, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: req.status === 'Approved' ? 'not-allowed' : 'pointer' }}
                        >
                          <FaCheck size={12} />
                        </button>
                        <button 
                          onClick={() => handleUpdateStatus(req._id, 'Rejected')}
                          title="Reject"
                          disabled={req.status === 'Rejected'}
                          style={{ background: req.status === 'Rejected' ? '#e2e8f0' : '#ef4444', color: '#fff', border: 'none', borderRadius: 4, width: 28, height: 28, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: req.status === 'Rejected' ? 'not-allowed' : 'pointer' }}
                        >
                          <FaTimes size={12} />
                        </button>
                        <button 
                          onClick={() => handleDeleteLeave(req._id)}
                          title="Delete"
                          style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #ef4444', borderRadius: 4, width: 28, height: 28, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
                        >
                          <FaTrash size={10} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )})}
                {requests.length === 0 && (
                  <tr>
                    <td colSpan="7" style={{ padding: '24px', textAlign: 'center', color: '#94a3b8' }}>No leave requests found</td>
                  </tr>
                )}
              </tbody>
            </table>
            )}
          </div>

          <div style={{ padding: '16px 24px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ fontSize: 13, color: '#64748b' }}>
                Showing {requests.length} of {total} entries
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#475569' }}>
                Rows per page:
                <select value={limit} onChange={e => setLimit(Number(e.target.value))} style={{ border: '1px solid #e2e8f0', borderRadius: 4, padding: '4px 8px', outline: 'none' }}>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button 
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                style={{ padding: '6px 12px', border: '1px solid #e2e8f0', background: page === 1 ? '#f1f5f9' : '#fff', color: '#475569', borderRadius: 4, cursor: page === 1 ? 'not-allowed' : 'pointer', fontSize: 13, fontWeight: 600 }}
              >
                Previous
              </button>
              <button 
                onClick={() => setPage(page + 1)}
                disabled={page * limit >= total}
                style={{ padding: '6px 12px', border: '1px solid #e2e8f0', background: page * limit >= total ? '#f1f5f9' : '#fff', color: '#475569', borderRadius: 4, cursor: page * limit >= total ? 'not-allowed' : 'pointer', fontSize: 13, fontWeight: 600 }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {selectedLeaveId && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 32, width: 500, maxWidth: '90%', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ margin: 0, fontSize: 18, color: '#1e293b' }}>Leave Request Details</h2>
              <button onClick={() => setSelectedLeaveId(null)} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#94a3b8' }}>&times;</button>
            </div>
            {loadingDetails ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: '#64748b' }}>Loading details...</div>
            ) : leaveDetails ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center', background: '#f8fafc', padding: 16, borderRadius: 8 }}>
                   <img src={leaveDetails.studentId?.personalDetails?.studentPhoto || 'https://via.placeholder.com/50'} alt="Student" style={{ width: 50, height: 50, borderRadius: '50%', objectFit: 'cover' }} />
                   <div>
                     <div style={{ fontWeight: 700, color: '#334155' }}>{leaveDetails.studentId?.personalDetails?.firstName} {leaveDetails.studentId?.personalDetails?.lastName}</div>
                     <div style={{ fontSize: 12, color: '#64748b' }}>Class: {leaveDetails.class}-{leaveDetails.section} | Adm No: {leaveDetails.studentId?.academicDetails?.admissionNumber}</div>
                   </div>
                </div>
                <div style={{ display: 'flex', gap: 24, padding: '0 8px' }}>
                   <div>
                     <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' }}>Leave Type</div>
                     <div style={{ fontSize: 14, color: '#334155', fontWeight: 500 }}>{leaveDetails.leaveType || 'General'}</div>
                   </div>
                   <div>
                     <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' }}>Status</div>
                     <div style={{ fontSize: 14, color: getStatusColor(leaveDetails.status), fontWeight: 700 }}>{leaveDetails.status}</div>
                   </div>
                </div>
                <div style={{ display: 'flex', gap: 24, padding: '0 8px' }}>
                   <div>
                     <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' }}>From</div>
                     <div style={{ fontSize: 14, color: '#334155', fontWeight: 500 }}>{new Date(leaveDetails.fromDate).toLocaleDateString('en-GB')}</div>
                   </div>
                   <div>
                     <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' }}>To</div>
                     <div style={{ fontSize: 14, color: '#334155', fontWeight: 500 }}>{new Date(leaveDetails.toDate).toLocaleDateString('en-GB')}</div>
                   </div>
                   <div>
                     <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' }}>Total Days</div>
                     <div style={{ fontSize: 14, color: '#334155', fontWeight: 500 }}>{leaveDetails.totalDays}</div>
                   </div>
                </div>
                <div style={{ padding: '0 8px' }}>
                   <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>Reason</div>
                   <div style={{ fontSize: 14, color: '#475569', background: '#f1f5f9', padding: 12, borderRadius: 6, minHeight: 60 }}>{leaveDetails.reason}</div>
                </div>
                <div style={{ padding: '0 8px' }}>
                   <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>Modify Leave Type</div>
                   <input type="text" value={leaveTypeUpdate} onChange={e => setLeaveTypeUpdate(e.target.value)} style={{ width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 13, outline: 'none' }} placeholder="e.g. Sick Leave, Medical" />
                </div>
                <div style={{ padding: '0 8px' }}>
                   <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>Admin Remarks</div>
                   <textarea value={adminRemarks} onChange={e => setAdminRemarks(e.target.value)} style={{ width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 13, outline: 'none', minHeight: 60 }} placeholder="Add remarks before approving/rejecting (optional)"></textarea>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
                   <button onClick={() => handleDeleteLeave(leaveDetails._id)} style={{ padding: '8px 16px', background: 'transparent', color: '#ef4444', border: '1px solid #ef4444', borderRadius: 4, cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}><FaTrash /> Delete</button>
                   <div style={{ display: 'flex', gap: 12 }}>
                     <button onClick={() => { handleUpdateStatus(leaveDetails._id, 'Pending', '', leaveTypeUpdate); setSelectedLeaveId(null); }} disabled={leaveDetails.status === 'Pending'} style={{ padding: '8px 16px', background: leaveDetails.status === 'Pending' ? '#e2e8f0' : '#f59e0b', color: '#fff', border: 'none', borderRadius: 4, cursor: leaveDetails.status === 'Pending' ? 'not-allowed' : 'pointer', fontWeight: 600 }}>Reset to Pending</button>
                     <button onClick={() => { handleUpdateStatus(leaveDetails._id, 'Approved', adminRemarks, leaveTypeUpdate); setSelectedLeaveId(null); }} disabled={leaveDetails.status === 'Approved'} style={{ padding: '8px 16px', background: leaveDetails.status === 'Approved' ? '#e2e8f0' : '#22c55e', color: '#fff', border: 'none', borderRadius: 4, cursor: leaveDetails.status === 'Approved' ? 'not-allowed' : 'pointer', fontWeight: 600 }}>Approve</button>
                     <button onClick={() => { handleUpdateStatus(leaveDetails._id, 'Rejected', adminRemarks, leaveTypeUpdate); setSelectedLeaveId(null); }} disabled={leaveDetails.status === 'Rejected'} style={{ padding: '8px 16px', background: leaveDetails.status === 'Rejected' ? '#e2e8f0' : '#ef4444', color: '#fff', border: 'none', borderRadius: 4, cursor: leaveDetails.status === 'Rejected' ? 'not-allowed' : 'pointer', fontWeight: 600 }}>Reject</button>
                   </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );

}

export default LeaveRequests;
