import React, { useState, useEffect } from 'react';
import { FaThList, FaThLarge, FaCaretUp, FaCaretDown, FaStar, FaEye, FaArrowLeft, FaCamera, FaTasks, FaEnvelope, FaClipboardList, FaUserClock, FaBriefcase, FaMoneyBillWave, FaHandHoldingUsd, FaExclamationTriangle, FaPlus, FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function Staff({ favoritesOnly = false }) {
  const navigate = useNavigate();
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const token = localStorage.getItem('token');
        const endpoint = favoritesOnly ? '/api/staffs/favorites' : '/api/staffs';
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}${endpoint}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (response.ok) {
          setStaffList(data);
        } else {
          console.error("Failed to fetch staff");
        }
      } catch (error) {
        console.error("Error fetching staff:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStaff();
  }, []);
  const [searchBy, setSearchBy] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [showFavouritesOnly, setShowFavouritesOnly] = useState(false);
  const [viewType, setViewType] = useState('list');
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [activeTab, setActiveTab] = useState('Full Profile');
  const [staffLeaves, setStaffLeaves] = useState([]);

  const handleViewProfile = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/staffs/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setSelectedStaff(data);
        
        // Fetch leaves for this staff
        try {
          const leaveRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/staff-leaves`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const leaveData = await leaveRes.json();
          if (leaveRes.ok && leaveData.leaveRequests) {
            const filtered = leaveData.leaveRequests.filter(l => 
              l.staffId && (l.staffId === id || l.staffId._id === id)
            );
            filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
            setStaffLeaves(filtered);
          } else {
            setStaffLeaves([]);
          }
        } catch (err) {
          console.error("Error fetching staff leaves", err);
          setStaffLeaves([]);
        }

      } else {
        toast.error("Failed to fetch staff details.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching staff details.");
    }
  };

  const toggleFavourite = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/staffs/${id}/favorite`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ isFavorite: !currentStatus })
      });
      if (response.ok) {
        setStaffList(prev => prev.map(staff => staff._id === id ? { ...staff, isFavorite: !currentStatus } : staff));
        if (selectedStaff && selectedStaff._id === id) {
          setSelectedStaff(prev => ({ ...prev, isFavorite: !currentStatus }));
        }
        toast.success(`Staff ${currentStatus ? 'removed from' : 'added to'} favorites`);
      } else {
        toast.error("Failed to toggle favorite status");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error toggling favorite status");
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/staffs/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ isActive: !currentStatus })
      });
      if (response.ok) {
        setStaffList(prev => prev.map(staff => staff._id === id ? { ...staff, isActive: !currentStatus } : staff));
        if (selectedStaff && selectedStaff._id === id) {
          setSelectedStaff(prev => ({ ...prev, isActive: !currentStatus }));
        }
        toast.success(`Staff marked as ${!currentStatus ? 'Active' : 'Inactive'}`);
      } else {
        toast.error("Failed to change status");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error changing status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this staff member?")) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/staffs/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setStaffList(prev => prev.filter(staff => staff._id !== id));
        if (selectedStaff && selectedStaff._id === id) setSelectedStaff(null);
        toast.success("Staff deleted successfully");
      } else {
        toast.error("Failed to delete staff");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting staff");
    }
  };

  const getFilteredStaff = () => {
    let displayed = staffList;

    if (searchText.trim() !== '') {
      const lowerSearch = searchText.toLowerCase();
      displayed = displayed.filter(s => {
        if (searchBy === 'Name') return (s.firstName + ' ' + s.lastName).toLowerCase().includes(lowerSearch);
        if (searchBy === 'Mobile') return s.contactNo && s.contactNo.includes(lowerSearch);
        return (s.firstName + ' ' + s.lastName).toLowerCase().includes(lowerSearch) || (s.contactNo && s.contactNo.includes(lowerSearch));
      });
    }

    if (showFavouritesOnly) {
      displayed = displayed.filter(s => s.isFavorite);
    }
    return displayed;
  };

  const displayedStaff = getFilteredStaff();


  if (loading) {
    return <div style={{ padding: 40, textAlign: 'center', color: '#64748b' }}>Loading staff...</div>;
  }

  if (selectedStaff) {
    const s = selectedStaff;
    return (
      <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', padding: '24px 32px', overflowY: 'auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Staff Details</h1>
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={() => toggleFavourite(s._id, s.isFavorite)}
              style={{ display: 'flex', alignItems: 'center', gap: 6, background: s.isFavorite ? '#fef08a' : '#f1f5f9', color: s.isFavorite ? '#92400e' : '#64748b', border: s.isFavorite ? '2px solid #f59e0b' : '1px solid #cbd5e1', padding: '6px 12px', borderRadius: 4, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
            >
              <FaStar style={{ color: s.isFavorite ? '#f59e0b' : '#cbd5e1' }} /> {s.isFavorite ? 'Favorited' : 'Add to Favorites'}
            </button>
            <button
              onClick={() => handleDelete(s._id)}
              style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#ef4444', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: 4, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
            >
              <FaTrash /> Delete
            </button>
            <button 
              onClick={() => setSelectedStaff(null)}
              style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#e2e8f0', border: 'none', padding: '6px 12px', borderRadius: 4, fontSize: 13, fontWeight: 600, color: '#475569', cursor: 'pointer' }}
            >
              <FaArrowLeft /> Go Back
            </button>
          </div>
        </div>

        {/* Top Section */}
        <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
          {/* Profile Card */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 200 }}>
            <div style={{ width: 140, height: 140, background: '#d1d5db', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', marginBottom: 12 }}>
              <FaCamera style={{ fontSize: 32, marginBottom: 8 }} />
              <span style={{ fontSize: 12, fontWeight: 600 }}>No image</span>
            </div>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#65a30d', margin: '0 0 4px 0', textAlign: 'center' }}>{s.title + ' ' + s.firstName + ' ' + s.lastName}</h2>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#1e293b', margin: 0 }}>{s.designation}</p>
          </div>

          {/* Stats Cards */}
          <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', gap: 16, alignContent: 'flex-start' }}>
            <StatCard title="Assignments" value="0" icon={<FaTasks />} color="#ef4444" />
            <StatCard title="Sent Message" value="0" icon={<FaEnvelope />} color="#84cc16" />
            <StatCard title="Work Load" value="0" icon={<FaClipboardList />} color="#a855f7" />
            <StatCard title="Attendance" value="0%" icon={<FaUserClock />} color="#eab308" />
            <StatCard title="Leaves" value={staffLeaves.length.toString()} icon={<FaBriefcase />} color="#bef264" />
            <StatCard title="Current Salary" value="₹ 0.00" icon={<FaMoneyBillWave />} color="#f472b6" />
            <StatCard title="Advance Given" value="₹ 0.00" icon={<FaHandHoldingUsd />} color="#a3e635" />
          </div>
        </div>

        {/* Bottom Section */}
        <div style={{ display: 'flex', gap: 24 }}>
          {/* Sidebar */}
          <div style={{ width: 220, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {['Full Profile', 'Attendance', 'Leave', 'Timetable', 'Salary Structure', 'Session Log'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  textAlign: 'left', padding: '12px 16px', borderRadius: 4, border: 'none', cursor: 'pointer',
                  fontSize: 14, fontWeight: 500, transition: 'all 0.2s',
                  background: activeTab === tab ? '#4ade80' : 'transparent',
                  color: activeTab === tab ? '#fff' : '#475569',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Main Content */}
          <div style={{ flex: 1 }}>
            {activeTab === 'Full Profile' && (
              <div>
                <div style={{ background: '#e2e8f0', padding: '10px 16px', borderRadius: '4px 4px 0 0', borderBottom: '2px solid #4ade80' }}>
                  <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#334155' }}>About {s.title + ' ' + s.firstName + ' ' + s.lastName}</h3>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px 16px', padding: '24px 16px', background: '#fff', borderRadius: '0 0 4px 4px' }}>
                  <DetailItem label="User Name" value={s.userName} />
                  <DetailItem label="Role Name" value={s.role?.roleName} />
                  <DetailItem label="Designation" value={s.designation} />
                  <DetailItem label="Gender" value={s.gender} />
                  <DetailItem label="DOJ" value={s.doj} />
                  <DetailItem label="DOJ EPF" value={s.dojEpf} />
                  <DetailItem label="DOB" value={s.dob} />
                  <DetailItem label="Contact No" value={s.contact || s.contactNo} />
                  <DetailItem label="Email Id" value={s.emailId} />
                  <DetailItem label="Qualification" value={s.qualification} />
                  <DetailItem label="Aadhar Card No" value={s.aadharCardNo} />
                  <DetailItem label="UAN Number" value={s.uan} />
                  <DetailItem label="National Teacher ID" value={s.nationalTeacherId} />
                  <DetailItem label="State Teacher ID" value={s.stateTeacherId} />
                  <DetailItem label="Pan Number" value={s.pan} />
                  <DetailItem label="CBSE ID" value={s.cbseId} />
                  <DetailItem label="Marital Status" value={s.maritalStatus} />
                  <DetailItem label="Father/Spouse Name" value={s.fatherSpouseName} />
                  <DetailItem label="Father/Spouse Contact No" value={s.fatherSpouseContactNo} />
                  <DetailItem label="Date of Anniversary" value={s.dateOfAnniversary} />
                  <DetailItem label="Alternate Mobile" value={s.alternateMobile} />
                  <DetailItem label="Emergency Contact No" value={s.emergencyContactNo} />
                  <DetailItem label="Alternate Email ID" value={s.alternateEmailId} />
                  <DetailItem label="Religion" value={s.religion} />
                  <DetailItem label="Nationality" value={s.nationality} />
                  <DetailItem label="Address" value={s.address} fullRow />
                  <DetailItem label="Permanent Address" value={s.permanentAddress} fullRow />
                </div>
                <div style={{ textAlign: 'center', marginTop: 40, paddingBottom: 20, fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>
                  COPYRIGHT © 2026 FRANCISCAN
                </div>
              </div>
            )}

            {activeTab === 'Attendance' && (
              <div style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 24 }}>
                  <div style={{ border: '1px solid #e2e8f0', padding: '4px 12px', borderRadius: 4, display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: 10, color: '#94a3b8' }}>Academic Year</span>
                    <span style={{ fontSize: 13, color: '#334155', fontWeight: 600 }}>2026-2027</span>
                  </div>
                </div>
                <div style={{ padding: '60px 0', textAlign: 'center', fontSize: 14, fontWeight: 700, color: '#334155' }}>
                  No Data Found
                </div>
              </div>
            )}

            {activeTab === 'Leave' && (
              <div style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <div style={{ background: '#f1f5f9', padding: '10px 16px', borderRadius: '4px 4px 0 0', borderBottom: '2px solid #4ade80', fontSize: 14, fontWeight: 700, color: '#334155' }}>
                  Leave Records
                </div>
                
                {staffLeaves.length > 0 ? (
                  <div style={{ overflowX: 'auto', marginTop: 16 }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ background: '#f8fafc' }}>
                          <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 13, color: '#1e293b', borderBottom: '1px solid #e2e8f0' }}>Applied On</th>
                          <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 13, color: '#1e293b', borderBottom: '1px solid #e2e8f0' }}>Leave Type</th>
                          <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 13, color: '#1e293b', borderBottom: '1px solid #e2e8f0' }}>Duration</th>
                          <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 13, color: '#1e293b', borderBottom: '1px solid #e2e8f0' }}>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {staffLeaves.map(leave => (
                          <tr key={leave._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '12px 16px', fontSize: 13, color: '#475569' }}>
                              {leave.createdAt ? new Date(leave.createdAt).toLocaleDateString('en-GB') : '-'}
                            </td>
                            <td style={{ padding: '12px 16px', fontSize: 13, color: '#475569' }}>
                              {leave.leaveType || 'Annual Leave'}
                            </td>
                            <td style={{ padding: '12px 16px', fontSize: 13, color: '#475569' }}>
                              <span style={{ fontWeight: 600, color: '#334155' }}>
                                {leave.fromDate ? leave.fromDate.split('T')[0] : ''} 
                                <span style={{ color: '#94a3b8', margin: '0 4px' }}>to</span> 
                                {leave.toDate ? leave.toDate.split('T')[0] : ''}
                              </span>
                              <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>
                                {leave.totalDays} Day(s)
                              </div>
                            </td>
                            <td style={{ padding: '12px 16px', fontSize: 13 }}>
                              <span style={{ 
                                padding: '4px 8px', borderRadius: 4, fontSize: 11, fontWeight: 700,
                                background: leave.status === 'Approved' ? '#dcfce7' : leave.status === 'Rejected' ? '#fee2e2' : '#fef3c7',
                                color: leave.status === 'Approved' ? '#16a34a' : leave.status === 'Rejected' ? '#ef4444' : '#d97706'
                              }}>
                                {leave.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div style={{ padding: '60px 0', textAlign: 'center', fontSize: 14, fontWeight: 700, color: '#334155' }}>
                    No Leave Records Found
                  </div>
                )}
              </div>
            )}

            {activeTab === 'Timetable' && (
              <div style={{ background: '#fff', padding: 40, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              </div>
            )}

            {activeTab === 'Salary Structure' && (
              <div style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <div style={{ background: '#f1f5f9', padding: '10px 16px', borderRadius: '4px 4px 0 0', borderBottom: '2px solid #4ade80', fontSize: 14, fontWeight: 700, color: '#334155' }}>
                  Salary Structure
                </div>
                <div style={{ padding: '60px 0' }}></div>
              </div>
            )}

            {activeTab === 'Session Log' && (
              <div style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', gap: 0, marginBottom: 40 }}>
                  <select style={{ border: '1px solid #d1d5db', borderRight: 'none', borderRadius: '4px 0 0 4px', padding: '8px 12px', fontSize: 13, color: '#334155', minWidth: 250, outline: 'none' }}>
                    <option>Today, 3 Aug</option>
                  </select>
                  <button style={{ background: '#4ade80', color: '#fff', border: 'none', borderRadius: '0 4px 4px 0', padding: '0 16px', fontWeight: 600, cursor: 'pointer' }}>Go</button>
                </div>
                <div style={{ padding: '40px 0', display: 'flex', justifyContent: 'center' }}>
                  <div style={{ width: 300, height: 200, background: '#f8fafc', border: '2px dashed #cbd5e1', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: '#64748b' }}>
                    <FaExclamationTriangle style={{ fontSize: 40, color: '#94a3b8', marginBottom: 12 }} />
                    <span style={{ fontWeight: 700 }}>NO RECORD FOUND</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    );
  }

  // --- Main List View ---
  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', padding: '24px 32px', overflowY: 'auto' }}>
      
      {/* Title */}
      <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', marginBottom: 24 }}>Staff List</h1>

      {/* Search Filters Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 24 }}>
        <label style={{ fontSize: 13, color: '#5c6bc0', fontWeight: 500 }}>Search by</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
          
          <select 
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
            style={{ border: '1px solid #d1d5db', borderRadius: 4, padding: '8px 12px', fontSize: 14, minWidth: 200, outline: 'none' }}
          >
            <option value="All">All</option>
            <option value="Name">Name</option>
            <option value="Mobile">Mobile</option>
          </select>

          <input 
            type="text" 
            placeholder="Type here..." 
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ border: '1px solid #d1d5db', borderRadius: 4, padding: '8px 12px', fontSize: 14, minWidth: 240, outline: 'none' }}
          />

          <button style={{ 
            background: '#4ade80', 
            color: '#fff', 
            border: 'none', 
            borderRadius: 4, 
            padding: '8px 24px', 
            fontWeight: 700, 
            fontSize: 14, 
            cursor: 'pointer',
            marginLeft: 'auto'
          }}>
            SEARCH
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div style={{ background: '#fff', borderRadius: 12, padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        
        {/* Card Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#334155', margin: 0 }}>
              Staff - (Total: {staffList.length})
            </h2>
            {/* Favourites filter badge */}
            <button
              onClick={() => setShowFavouritesOnly(!showFavouritesOnly)}
              title={showFavouritesOnly ? 'Show All Staff' : 'Show Favourites Only'}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '5px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
                fontWeight: 600, fontSize: 13, transition: 'all 0.25s',
                background: showFavouritesOnly ? '#fef08a' : '#f1f5f9',
                color: showFavouritesOnly ? '#92400e' : '#64748b',
                boxShadow: showFavouritesOnly ? '0 0 0 2px #fbbf24' : 'none',
              }}
            >
              <FaStar style={{ color: showFavouritesOnly ? '#f59e0b' : '#cbd5e1', fontSize: 14 }} />
              Favourites {staffList.filter(s => s.isFavorite).length > 0 && `(${staffList.filter(s => s.isFavorite).length})`}
            </button>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', gap: 4 }}>
              <button 
                onClick={() => setViewType('list')}
                style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  width: 36, height: 36, borderRadius: 4, border: '1px solid #e2e8f0', cursor: 'pointer',
                  background: viewType === 'list' ? '#65a30d' : '#fff',
                  color: viewType === 'list' ? '#fff' : '#64748b'
                }}
              >
                <FaThList />
              </button>
              <button 
                onClick={() => setViewType('grid')}
                style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  width: 36, height: 36, borderRadius: 4, border: '1px solid #e2e8f0', cursor: 'pointer',
                  background: viewType === 'grid' ? '#65a30d' : '#fff',
                  color: viewType === 'grid' ? '#fff' : '#64748b'
                }}
              >
                <FaThLarge />
              </button>
            </div>
            
            <button 
              onClick={() => navigate('/dashboard/staff/create')}
              style={{ 
                display: 'flex', alignItems: 'center', gap: 6, 
                background: '#3b82f6', color: '#fff', border: 'none', 
                borderRadius: 4, padding: '8px 16px', fontWeight: 600, 
                fontSize: 14, cursor: 'pointer' 
              }}
            >
              <FaPlus /> Create Staff
            </button>
          </div>
        </div>

        {/* Data rendering */}
        {viewType === 'list' ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: 900 }}>
              <thead>
                <tr>
                  {['Name', 'Designation', 'Staff Type', 'Mobile', 'Qualification', 'Marital Status'].map((head) => (
                    <th key={head} style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', fontSize: 13, fontWeight: 700, color: '#1e293b' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        {head}
                        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 10, color: '#94a3b8' }}>
                          <FaCaretUp style={{ marginBottom: -4 }} />
                          <FaCaretDown />
                        </div>
                      </div>
                    </th>
                  ))}
                  <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', fontSize: 13, fontWeight: 700, color: '#1e293b', textAlign: 'center' }}>
                    View
                  </th>
                  <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', fontSize: 13, fontWeight: 700, color: '#1e293b', textAlign: 'center' }}>
                    <FaStar style={{ color: '#fbbf24', fontSize: 14 }} />
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayedStaff.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ padding: '32px', textAlign: 'center', color: '#94a3b8', fontSize: 14 }}>
                      <FaStar style={{ color: '#fbbf24', fontSize: 24, marginBottom: 8, display: 'block', margin: '0 auto 8px' }} />
                      No staff found.
                    </td>
                  </tr>
                ) : displayedStaff.map((staff) => {
                  const isFav = staff.isFavorite;
                  return (
                    <tr
                      key={staff._id}
                      style={{
                        borderBottom: '1px solid #e2e8f0',
                        background: isFav ? '#fffbeb' : 'transparent',
                        transition: 'background 0.3s',
                      }}
                    >
                      <td style={{ padding: '16px', fontSize: 14, fontWeight: 500, color: '#475569', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 32, height: 32, background: '#e2e8f0', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: '#94a3b8' }}>
                          <FaEye style={{opacity: 0.5}} />
                        </div>
                        {staff.firstName + ' ' + staff.lastName}
                      </td>
                      <td style={{ padding: '16px', fontSize: 14, color: '#475569' }}>{staff.designation}</td>
                      <td style={{ padding: '16px', fontSize: 14, color: '#475569', textTransform: 'uppercase' }}>{staff.role?.roleName}</td>
                      <td style={{ padding: '16px', fontSize: 14, color: '#475569' }}>{staff.contactNo}</td>
                      <td style={{ padding: '16px', fontSize: 14, color: '#475569' }}>{staff.qualification}</td>
                      <td style={{ padding: '16px', fontSize: 14, color: '#475569' }}>{staff.maritalStatus}</td>
                      <td style={{ padding: '16px', textAlign: 'center' }}>
                        <button
                          onClick={() => handleToggleStatus(staff._id, staff.isActive)}
                          title={staff.isActive ? 'Mark Inactive' : 'Mark Active'}
                          style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            color: staff.isActive ? '#10b981' : '#94a3b8',
                            fontSize: 18, transition: 'transform 0.2s',
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                          {staff.isActive ? <FaToggleOn /> : <FaToggleOff />}
                        </button>
                      </td>
                      <td style={{ padding: '16px', textAlign: 'center' }}>
                        <button 
                          onClick={() => handleViewProfile(staff._id)}
                          style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', transition: 'color 0.2s' }}
                          onMouseEnter={(e) => e.currentTarget.style.color = '#2563eb'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
                        >
                          <FaEye style={{ fontSize: 16 }} />
                        </button>
                      </td>
                      <td style={{ padding: '16px', textAlign: 'center' }}>
                        <button
                          onClick={() => toggleFavourite(staff._id, isFav)}
                          title={isFav ? 'Remove from Favourites' : 'Add to Favourites'}
                          style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            padding: '4px', borderRadius: '50%',
                            transition: 'transform 0.2s',
                            display: 'inline-flex', alignItems: 'center',
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.35)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                          <FaStar
                            style={{
                              fontSize: 18,
                              color: isFav ? '#f59e0b' : '#d1d5db',
                              filter: isFav ? 'drop-shadow(0 0 3px #fbbf2488)' : 'none',
                              transition: 'color 0.25s, filter 0.25s',
                            }}
                          />
                        </button>
                      </td>
                      <td style={{ padding: '16px', textAlign: 'center' }}>
                        <button
                          onClick={() => handleDelete(staff._id)}
                          style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            color: '#ef4444', fontSize: 16, transition: 'transform 0.2s',
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {displayedStaff.length === 0 ? (
              <div style={{ gridColumn: '1 / -1', padding: '32px', textAlign: 'center', color: '#94a3b8', fontSize: 14 }}>
                <FaStar style={{ color: '#fbbf24', fontSize: 24, marginBottom: 8, display: 'block', margin: '0 auto 8px' }} />
                No staff found.
              </div>
            ) : displayedStaff.map((staff) => {
              const isFav = staff.isFavorite;
              return (
                <div key={staff._id} style={{
                  background: isFav ? '#fffbeb' : '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                  position: 'relative'
                }}>
                  <button
                    onClick={() => toggleFavourite(staff._id, isFav)}
                    style={{
                      position: 'absolute', top: 12, right: 12,
                      background: 'none', border: 'none', cursor: 'pointer',
                      padding: '4px'
                    }}
                  >
                    <FaStar style={{ fontSize: 18, color: isFav ? '#f59e0b' : '#d1d5db' }} />
                  </button>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                    <div style={{ width: 48, height: 48, background: '#e2e8f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontWeight: 'bold' }}>
                      <FaEye />
                    </div>
                    <div>
                      <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1e293b', margin: 0 }}>{staff.firstName + ' ' + staff.lastName}</h3>
                      <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>{staff.designation}</p>
                    </div>
                  </div>
                  <div style={{ fontSize: 13, color: '#475569', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 500 }}>Type:</span> <span>{staff.role?.roleName}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 500 }}>Mobile:</span> <span>{staff.contactNo}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 500 }}>Qual:</span> <span>{staff.qualification || '-'}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 500 }}>Marital:</span> <span>{staff.maritalStatus}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleViewProfile(staff._id)}
                    style={{
                      marginTop: 16, width: '100%', padding: '8px', background: '#f1f5f9', border: 'none', borderRadius: 6,
                      color: '#475569', fontWeight: 600, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
                    }}
                  >
                    <FaEye /> View Profile
                  </button>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}

const StatCard = ({ title, value, icon, color }) => (
  <div style={{ background: '#fff', borderRadius: 8, padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '220px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
    <div>
      <p style={{ fontSize: 12, color: '#94a3b8', margin: '0 0 4px 0', fontWeight: 600 }}>{title}</p>
      <h3 style={{ fontSize: 18, color: '#1e293b', margin: 0, fontWeight: 700 }}>{value}</h3>
    </div>
    <div style={{ width: 40, height: 40, borderRadius: '50%', background: `${color}22`, color: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
      {icon}
    </div>
  </div>
);

const DetailItem = ({ label, value, fullRow }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, gridColumn: fullRow ? '1 / -1' : 'auto' }}>
    <span style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', minWidth: 140 }}>{label}:</span>
    <span style={{ fontSize: 13, color: '#475569' }}>{value || '-'}</span>
  </div>
);

export default Staff;
