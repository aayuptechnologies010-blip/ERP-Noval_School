import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaVideo, FaSave, FaCheckCircle, FaUserCheck } from 'react-icons/fa';

// Dummy staff removed

const STATUS_BUTTONS = [
  { label: 'P',    bg: '#22c55e', color: '#fff', title: 'Present'  },
  { label: 'A',    bg: '#ef4444', color: '#fff', title: 'Absent'   },
  { label: 'L',    bg: '#f59e0b', color: '#fff', title: 'Leave'    },
  { label: 'WH',   bg: '#3b82f6', color: '#fff', title: 'Half Day' },
  { label: 'Late', bg: '#8b5cf6', color: '#fff', title: 'Late'     },
  { label: 'NA',   bg: '#64748b', color: '#fff', title: 'NA'       },
];

function StaffAttendance() {
  const navigate = useNavigate();
  const [selectedDept, setSelectedDept] = useState('All');
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [showTable, setShowTable] = useState(true);
  const [saved, setSaved] = useState(false);
  const [staffList, setStaffList] = useState([]);
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/staff`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          const list = Array.isArray(data) ? data : (data.staff || []);
          const formattedList = list.map(s => ({
            id: s._id,
            staffId: s.employeeId || 'N/A',
            name: `${s.title || ''} ${s.firstName || ''} ${s.lastName || ''}`.trim(),
            department: s.department || 'General'
          }));
          setStaffList(formattedList);
          
          const initAtt = {};
          formattedList.forEach(s => { initAtt[s.id] = 'P'; });
          setAttendance(initAtt);
        }
      } catch (error) {
        console.error("Error fetching staff:", error);
      }
    };
    fetchStaff();
  }, []);

  const handleMark = (staffId, status) => {
    setAttendance(prev => ({ ...prev, [staffId]: status }));
  };

  const handleMarkAll = (status) => {
    const all = {};
    filteredStaff.forEach(s => { all[s.id] = status; });
    setAttendance(prev => ({ ...prev, ...all }));
  };

  const handleSave = async () => {
    try {
      const records = Object.keys(attendance).map(staffId => ({
        staff: staffId,
        status: attendance[staffId]
      }));
      
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/staff-attendance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ date, records })
      });
      
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      } else {
        console.error('Failed to save attendance');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredStaff = selectedDept === 'All' ? staffList : staffList.filter(s => s.department === selectedDept);

  const counts = filteredStaff.reduce((acc, s) => {
    const st = attendance[s.id] || 'P';
    acc[st] = (acc[st] || 0) + 1;
    return acc;
  }, {});

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* Header */}
      <div style={{ padding: '24px 32px 12px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
          <FaUserCheck size={22} color="#10b981" /> Staff Attendance
        </h1>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 180 }}>
            <label style={{ fontSize: 12, color: '#475569', fontWeight: 600 }}>Department</label>
            <select
              value={selectedDept}
              onChange={e => setSelectedDept(e.target.value)}
              style={{ border: '1px solid #e2e8f0', borderRadius: 6, padding: '9px 12px', fontSize: 14, color: '#334155', outline: 'none', background: '#fff' }}
            >
              <option value="All">All Departments</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
              <option value="Computer">Computer</option>
              <option value="Sports">Sports</option>
              <option value="Hindi">Hindi</option>
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 160 }}>
            <label style={{ fontSize: 12, color: '#475569', fontWeight: 600 }}>Date</label>
            <input
              type="text"
              value={date}
              onChange={e => setDate(e.target.value)}
              style={{ border: '1px solid #e2e8f0', borderRadius: 6, padding: '9px 12px', fontSize: 14, color: '#334155', outline: 'none', background: '#f8fafc' }}
            />
          </div>
          <button
            onClick={() => setShowTable(true)}
            style={{ background: '#65c466', color: '#fff', border: 'none', borderRadius: 6, padding: '9px 22px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
          >
            GO
          </button>
        </div>
      </div>

      {showTable && (
        <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

          {/* Summary Bar */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
            {STATUS_BUTTONS.map(b => (
              <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: '6px 14px', fontSize: 13 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: b.bg, display: 'inline-block' }}></span>
                <span style={{ fontWeight: 600, color: '#334155' }}>{b.title}:</span>
                <span style={{ color: b.bg, fontWeight: 700 }}>{counts[b.label] || 0}</span>
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: '6px 14px', fontSize: 13 }}>
              <span style={{ fontWeight: 600, color: '#334155' }}>Total:</span>
              <span style={{ color: '#2b3674', fontWeight: 700 }}>{filteredStaff.length}</span>
            </div>
          </div>

          {/* Mark All Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, background: '#f1f5f9', borderRadius: 8, padding: '10px 16px' }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#475569', marginRight: 6 }}>Mark All (Selected Dept):</span>
            {STATUS_BUTTONS.map(b => (
              <button
                key={b.label}
                onClick={() => handleMarkAll(b.label)}
                style={{ background: b.bg, color: b.color, border: 'none', borderRadius: 5, padding: '5px 12px', fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'opacity .2s' }}
              >
                {b.label}
              </button>
            ))}
          </div>

          {/* Table */}
          <div style={{ background: '#fff', borderRadius: 12, flex: 1, display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
            <div style={{ flex: 1, overflow: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    <th style={thStyle}>Sl.</th>
                    <th style={thStyle}>Staff ID</th>
                    <th style={thStyle}>Staff Name</th>
                    <th style={thStyle}>Department</th>
                    <th style={{ ...thStyle, textAlign: 'center' }}>Mark Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStaff.map((staff, idx) => {
                    const status = attendance[staff.id];
                    return (
                      <tr key={staff.id} style={{ borderBottom: '1px solid #f1f5f9', background: idx % 2 === 0 ? '#fff' : '#fafbfc' }}>
                        <td style={tdStyle}>{idx + 1}</td>
                        <td style={tdStyle}>{staff.staffId}</td>
                        <td style={{ ...tdStyle, fontWeight: 600, color: '#334155', display: 'flex', alignItems: 'center', gap: 10 }}>
                          <img
                            src={`https://ui-avatars.com/api/?name=${staff.name}&background=10b981&color=fff&size=28`}
                            alt=""
                            style={{ width: 28, height: 28, borderRadius: '50%' }}
                          />
                          {staff.name}
                        </td>
                        <td style={tdStyle}>{staff.department}</td>
                        <td style={{ padding: '10px 16px', textAlign: 'center' }}>
                          <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap' }}>
                            {STATUS_BUTTONS.map(b => (
                              <button
                                key={b.label}
                                onClick={() => handleMark(staff.id, b.label)}
                                style={{
                                  background: status === b.label ? b.bg : '#f1f5f9',
                                  color: status === b.label ? '#fff' : '#64748b',
                                  border: status === b.label ? `2px solid ${b.bg}` : '2px solid transparent',
                                  borderRadius: 5,
                                  padding: '4px 10px',
                                  fontSize: 11,
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                  transition: 'all 0.2s',
                                  outline: 'none',
                                  minWidth: 36,
                                }}
                              >
                                {b.label}
                              </button>
                            ))}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredStaff.length === 0 && (
                    <tr>
                      <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8', fontSize: 14 }}>
                        No staff found for this department.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Save Button */}
            <div style={{ padding: '16px 24px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 12 }}>
              {saved && (
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#22c55e', fontSize: 14, fontWeight: 600 }}>
                  <FaCheckCircle /> Attendance Saved!
                </span>
              )}
              <button
                onClick={handleSave}
                style={{ background: '#65c466', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 28px', fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
              >
                <FaSave /> Save Attendance
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const thStyle = {
  padding: '14px 16px',
  textAlign: 'left',
  fontSize: 12,
  fontWeight: 700,
  color: '#0f172a',
  whiteSpace: 'nowrap',
  borderBottom: '2px solid #e2e8f0',
};

const tdStyle = {
  padding: '12px 16px',
  fontSize: 13,
  color: '#475569',
  whiteSpace: 'nowrap',
};

export default StaffAttendance;
