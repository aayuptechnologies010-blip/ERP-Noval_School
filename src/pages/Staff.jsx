import React, { useState } from 'react';
import { FaThList, FaThLarge, FaCaretUp, FaCaretDown, FaStar, FaEye, FaArrowLeft, FaCamera, FaTasks, FaEnvelope, FaClipboardList, FaUserClock, FaBriefcase, FaMoneyBillWave, FaHandHoldingUsd, FaExclamationTriangle } from 'react-icons/fa';

const initialStaff = [
  { 
    id: 1, name: 'Miss. AARADHYA VERMA', designation: 'Teacher', type: 'TEACHERS', mobile: '8127535725', qualification: '', maritalStatus: 'Unmarried',
    userName: 'SF066', roleName: 'Teacher', gender: 'Female', doj: '27-Jan-2026', dojEpf: '', dob: '28-Feb-2006', email: '', aadhar: '', uan: '', nti: '', sti: '', pan: '', cbse: '', fatherName: 'RAKESH VERMA', fatherContact: '', anniversary: '01-Jan-1900', altMobile: '', emergency: '', altEmail: '', religion: 'HINDU', nationality: 'Indian', address: 'DOHARIGHA MAU', permAddress: 'VIKASH NAGAR 6/638 LUCKNOW'
  },
  { id: 2, name: 'Mr. AKASH RAI', designation: 'Acountant', type: 'Support Staff', mobile: '8400900772', qualification: '', maritalStatus: 'Others' },
  { id: 3, name: 'Mr. AKHILESH MISHRA', designation: 'Teacher', type: 'TEACHERS', mobile: '8896218542', qualification: 'B.ED', maritalStatus: 'Married' },
  { id: 4, name: 'Mr. AMIT DUBEY', designation: 'Teacher', type: 'TEACHERS', mobile: '6393449933', qualification: '', maritalStatus: 'Unmarried' },
  { id: 5, name: 'Mrs. ANSHIKA', designation: 'Teacher', type: 'PRE-PRIM. TEACHERS', mobile: '9305953530', qualification: 'B.ED', maritalStatus: 'Married' },
];

const loadFavourites = () => {
  try {
    const saved = localStorage.getItem('staffFavourites');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

function Staff() {
  const [searchBy, setSearchBy] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [favourites, setFavourites] = useState(() => loadFavourites());
  const [showFavouritesOnly, setShowFavouritesOnly] = useState(false);
  const [viewType, setViewType] = useState('list');
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [activeTab, setActiveTab] = useState('Full Profile');

  const toggleFavourite = (id) => {
    setFavourites((prev) => {
      const updated = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
      localStorage.setItem('staffFavourites', JSON.stringify(updated));
      return updated;
    });
  };

  const getFilteredStaff = () => {
    let displayed = initialStaff;

    if (searchText.trim() !== '') {
      const lowerSearch = searchText.toLowerCase();
      displayed = displayed.filter(s => {
        if (searchBy === 'Name') return s.name.toLowerCase().includes(lowerSearch);
        if (searchBy === 'Mobile') return s.mobile.includes(lowerSearch);
        return s.name.toLowerCase().includes(lowerSearch) || s.mobile.includes(lowerSearch);
      });
    }

    if (showFavouritesOnly) {
      displayed = displayed.filter(s => favourites.includes(s.id));
    }
    return displayed;
  };

  const displayedStaff = getFilteredStaff();

  if (selectedStaff) {
    const s = selectedStaff;
    return (
      <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', padding: '24px 32px', overflowY: 'auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Staff Details</h1>
          <button 
            onClick={() => setSelectedStaff(null)}
            style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', fontSize: 14, fontWeight: 600, color: '#475569', cursor: 'pointer' }}
          >
            <FaArrowLeft /> Go Back
          </button>
        </div>

        {/* Top Section */}
        <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
          {/* Profile Card */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 200 }}>
            <div style={{ width: 140, height: 140, background: '#d1d5db', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', marginBottom: 12 }}>
              <FaCamera style={{ fontSize: 32, marginBottom: 8 }} />
              <span style={{ fontSize: 12, fontWeight: 600 }}>No image</span>
            </div>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#65a30d', margin: '0 0 4px 0', textAlign: 'center' }}>{s.name}</h2>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#1e293b', margin: 0 }}>{s.designation}</p>
          </div>

          {/* Stats Cards */}
          <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', gap: 16, alignContent: 'flex-start' }}>
            <StatCard title="Assignments" value="0" icon={<FaTasks />} color="#ef4444" />
            <StatCard title="Sent Message" value="0" icon={<FaEnvelope />} color="#84cc16" />
            <StatCard title="Work Load" value="0" icon={<FaClipboardList />} color="#a855f7" />
            <StatCard title="Attendance" value="0%" icon={<FaUserClock />} color="#eab308" />
            <StatCard title="Leaves" value="N/A" icon={<FaBriefcase />} color="#bef264" />
            <StatCard title="Current Salary" value="₹ 0.00" icon={<FaMoneyBillWave />} color="#f472b6" />
            <StatCard title="Advance Given" value="₹ 0.00" icon={<FaHandHoldingUsd />} color="#a3e635" />
          </div>
        </div>

        {/* Bottom Section */}
        <div style={{ display: 'flex', gap: 24 }}>
          {/* Sidebar */}
          <div style={{ width: 220, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {['Full Profile', 'Attendance', 'Timetable', 'Salary Structure', 'Session Log'].map(tab => (
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
                  <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#334155' }}>About {s.name}</h3>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px 16px', padding: '24px 16px', background: '#fff', borderRadius: '0 0 4px 4px' }}>
                  <DetailItem label="User Name" value={s.userName} />
                  <DetailItem label="Role Name" value={s.roleName} />
                  <DetailItem label="Designation" value={s.designation} />
                  <DetailItem label="Gender" value={s.gender} />
                  <DetailItem label="DOJ" value={s.doj} />
                  <DetailItem label="DOJ EPF" value={s.dojEpf} />
                  <DetailItem label="DOB" value={s.dob} />
                  <DetailItem label="Contact No" value={s.contact || s.mobile} />
                  <DetailItem label="Email Id" value={s.email} />
                  <DetailItem label="Qualification" value={s.qualification} />
                  <DetailItem label="Aadhar Card No" value={s.aadhar} />
                  <DetailItem label="UAN Number" value={s.uan} />
                  <DetailItem label="National Teacher ID" value={s.nti} />
                  <DetailItem label="State Teacher ID" value={s.sti} />
                  <DetailItem label="Pan Number" value={s.pan} />
                  <DetailItem label="CBSE ID" value={s.cbse} />
                  <DetailItem label="Marital Status" value={s.maritalStatus} />
                  <DetailItem label="Father/Spouse Name" value={s.fatherName} />
                  <DetailItem label="Father/Spouse Contact No" value={s.fatherContact} />
                  <DetailItem label="Date of Anniversary" value={s.anniversary} />
                  <DetailItem label="Alternate Mobile" value={s.altMobile} />
                  <DetailItem label="Emergency Contact No" value={s.emergency} />
                  <DetailItem label="Alternate Email ID" value={s.altEmail} />
                  <DetailItem label="Religion" value={s.religion} />
                  <DetailItem label="Nationality" value={s.nationality} />
                  <DetailItem label="Address" value={s.address} fullRow />
                  <DetailItem label="Permanent Address" value={s.permAddress} fullRow />
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
              Staff - (Total: 35)
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
              Favourites {favourites.length > 0 && `(${favourites.length})`}
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
                  const isFav = favourites.includes(staff.id);
                  return (
                    <tr
                      key={staff.id}
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
                        {staff.name}
                      </td>
                      <td style={{ padding: '16px', fontSize: 14, color: '#475569' }}>{staff.designation}</td>
                      <td style={{ padding: '16px', fontSize: 14, color: '#475569', textTransform: 'uppercase' }}>{staff.type}</td>
                      <td style={{ padding: '16px', fontSize: 14, color: '#475569' }}>{staff.mobile}</td>
                      <td style={{ padding: '16px', fontSize: 14, color: '#475569' }}>{staff.qualification}</td>
                      <td style={{ padding: '16px', fontSize: 14, color: '#475569' }}>{staff.maritalStatus}</td>
                      <td style={{ padding: '16px', textAlign: 'center' }}>
                        <button 
                          onClick={() => setSelectedStaff(staff)}
                          style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', transition: 'color 0.2s' }}
                          onMouseEnter={(e) => e.currentTarget.style.color = '#2563eb'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
                        >
                          <FaEye style={{ fontSize: 16 }} />
                        </button>
                      </td>
                      <td style={{ padding: '16px', textAlign: 'center' }}>
                        <button
                          onClick={() => toggleFavourite(staff.id)}
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
              const isFav = favourites.includes(staff.id);
              return (
                <div key={staff.id} style={{
                  background: isFav ? '#fffbeb' : '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                  position: 'relative'
                }}>
                  <button
                    onClick={() => toggleFavourite(staff.id)}
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
                      <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1e293b', margin: 0 }}>{staff.name}</h3>
                      <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>{staff.designation}</p>
                    </div>
                  </div>
                  <div style={{ fontSize: 13, color: '#475569', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 500 }}>Type:</span> <span>{staff.type}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 500 }}>Mobile:</span> <span>{staff.mobile}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 500 }}>Qual:</span> <span>{staff.qualification || '-'}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 500 }}>Marital:</span> <span>{staff.maritalStatus}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setSelectedStaff(staff)}
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
