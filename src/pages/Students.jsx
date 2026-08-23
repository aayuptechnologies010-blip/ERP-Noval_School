
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaThList, FaThLarge, FaCaretUp, FaCaretDown, FaStar, FaEye, FaArrowLeft, FaCamera, FaUserClock, FaRunning, FaCheckCircle, FaTasks, FaFileInvoiceDollar, FaHospitalUser, FaBus, FaExclamationTriangle, FaAward, FaVideo, FaEdit, FaTrash } from 'react-icons/fa';

const initialStudents = [
  { id: 1, adm: '1770', name: 'ARNAV GUPTA', class: 'NUR-A', dob: '15-Mar-2023', father: 'Mr. HANUMAN GUPTA', mother: 'Mrs. GAURI GUPTA', contact: '8957244533', type: 'Boarding', doj: '11-Apr-2025', gender: 'Male', city: 'MAU', state: 'UP', pincode: '275303', address: 'RAM LEELA BHAWAN GONTHA' },
  { id: 2, adm: '2203', name: 'ANVI MAURYA', class: 'NUR-A', dob: '21-Jul-2022', father: 'Mr. ARVIND KUMAR MAURYA', mother: 'Mrs. SANDHYA MAURYA', contact: '9795383676', type: 'Day Scholar', doj: '15-Apr-2025', gender: 'Female', city: 'LUCKNOW', state: 'UP', pincode: '226001', address: 'GOMTI NAGAR' },
  { id: 3, adm: '2206', name: 'SHANVI YADAV', class: 'NUR-A', dob: '23-Aug-2024', father: 'Mr. ANUP YADAV', mother: 'Mrs. SUNITA YADAV', contact: '9935510508', type: 'Day Scholar', doj: '10-Apr-2025', gender: 'Female', city: 'VARANASI', state: 'UP', pincode: '221001', address: 'LANKA' },
  { id: 4, adm: '2219', name: 'DIVYA', class: 'NUR-A', dob: '08-Feb-2022', father: 'Mr. DINESH KUMAR', mother: 'Mrs. JYOTI', contact: '6388242775', type: 'Boarding', doj: '05-Apr-2025', gender: 'Female', city: 'AGRA', state: 'UP', pincode: '282001', address: 'TAJGANJ' },
  { id: 5, adm: '2221', name: 'PRABHAS SAHANI', class: 'NUR-A', dob: '03-Sep-2020', father: 'Mr. RAVI KUMAR', mother: 'Mrs. RAJMATI', contact: '7754072048', type: 'Day Scholar', doj: '02-Apr-2025', gender: 'Male', city: 'KANPUR', state: 'UP', pincode: '208001', address: 'KIDWAI NAGAR' },
];

const loadFavourites = () => {
  try {
    const saved = localStorage.getItem('studentFavourites');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

function Students() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [searchBy, setSearchBy] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [favourites, setFavourites] = useState(() => loadFavourites());
  const [showFavouritesOnly, setShowFavouritesOnly] = useState(false);
  const [studentType, setStudentType] = useState('All');
  const [showSensitive, setShowSensitive] = useState(true);
  const [viewType, setViewType] = useState('list');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [activeTab, setActiveTab] = useState('Personal details');
  const [attendanceData, setAttendanceData] = useState(null);
  const [attendanceLoading, setAttendanceLoading] = useState(false);
  const [attMonth, setAttMonth] = useState(new Date().getMonth() + 1);
  const [attYear, setAttYear] = useState(new Date().getFullYear());
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [leaveData, setLeaveData] = useState({ fromDate: '', toDate: '', leaveType: 'Sick Leave', reason: '' });

  
  useEffect(() => {
    if (id) {
      const fetchProfile = async () => {
        setLoadingProfile(true);
        try {
          const token = localStorage.getItem('token');
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/students/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (response.ok) {
            const data = await response.json();
            setSelectedStudent(data);
          }
        } catch (error) {
          console.error("Error fetching student profile:", error);
        } finally {
          setLoadingProfile(false);
        }
      };
      fetchProfile();
    } else {
      setSelectedStudent(null);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      const fetchAttendance = async () => {
        setAttendanceLoading(true);
        try {
          const token = localStorage.getItem('token');
          const params = { year: attYear };
          if (attMonth !== 'All') {
            params.month = attMonth;
          }
          const qs = new URLSearchParams(params).toString();
          const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/attendance/student/${id}?${qs}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (res.ok) {
            const data = await res.json();
            setAttendanceData(data);
          } else {
            setAttendanceData(null);
          }
        } catch (error) {
          console.error(error);
          setAttendanceData(null);
        } finally {
          setAttendanceLoading(false);
        }
      };
      fetchAttendance();
    } else {
      setAttendanceData(null);
    }
  }, [id, attMonth, attYear]);

useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/students/favorites`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        
        if (response.ok) {
          // The backend returns an array of student objects.
          // We map them to our local student IDs based on admissionNumber so the UI stars update correctly.
          if (Array.isArray(data)) {
            const favAdms = data.map(f => f?.academicDetails?.admissionNumber).filter(Boolean);
            const favIds = initialStudents
              .filter(s => favAdms.includes(s.adm))
              .map(s => s.id);
              
            setFavourites(favIds);
          }
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavourites();
  }, []);

  const toggleFavourite = (id) => {
    setFavourites((prev) => {
      const updated = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
      localStorage.setItem('studentFavourites', JSON.stringify(updated));
      return updated;
    });
  };

  const getFilteredStudents = () => {
    let displayed = initialStudents;

    if (studentType !== 'All') {
      displayed = displayed.filter(s => s.type === studentType);
    }

    if (searchText.trim() !== '') {
      const lowerSearch = searchText.toLowerCase();
      displayed = displayed.filter(s => {
        if (searchBy === 'Name') return s.name.toLowerCase().includes(lowerSearch);
        if (searchBy === 'Admission No') return s.adm.toLowerCase().includes(lowerSearch);
        return s.name.toLowerCase().includes(lowerSearch) || s.adm.toLowerCase().includes(lowerSearch);
      });
    }

    if (showFavouritesOnly) {
      displayed = displayed.filter(s => favourites.includes(s.id));
    }
    return displayed;
  };

  const displayedStudents = getFilteredStudents();

  const maskSensitiveData = (data) => {
    if (showSensitive) return data || '';
    return '***';
  };


  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this student profile?")) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/students/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        navigate('/dashboard/students');
      } else {
        alert("Failed to delete student.");
      }
    } catch (error) {
      console.error(error);
      alert("Error deleting student.");
    }
  };


  const handleApplyLeave = async () => {
    if (!leaveData.fromDate || !leaveData.toDate || !leaveData.reason) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/leave-requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          studentId: id,
          ...leaveData
        })
      });
      const result = await response.json();
      if (response.ok) {
        toast.success(result.message || "Leave request created successfully");
        setShowLeaveForm(false);
        setLeaveData({ fromDate: '', toDate: '', leaveType: 'Sick Leave', reason: '' });
      } else {
        toast.error(result.message || "Failed to create leave request");
      }
    } catch (e) {
      console.error(e);
      toast.error("Error creating leave request");
    }
  };

  if (loadingProfile) {
    return <div style={{ padding: 40, textAlign: 'center', color: '#64748b' }}>Loading student profile...</div>;
  }

  if (selectedStudent) {
    const s = selectedStudent;
    const p = s.personalDetails || {};
    const a = s.academicDetails || {};
    const c = s.contactAddress || {};
    const f = s.familyDetails || {};
    const u = s.uniqueIds || {};
    const g = s.guardianDetails || {};
    
    const fullName = `${p.firstName || ''} ${p.middleName || ''} ${p.lastName || ''}`.trim().replace(/\s+/g, ' ');
    const className = `${a.class || ''}-${a.section || ''}`.replace(/^-|-$/, '');
    const dobDate = p.dateOfBirth ? new Date(p.dateOfBirth).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '';
    const dojDate = a.dateOfJoining ? new Date(a.dateOfJoining).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '';
    const doaDate = a.dateOfAdmission ? new Date(a.dateOfAdmission).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '';
    const father = f.father || {};
    const mother = f.mother || {};
    
    return (
      <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', padding: '24px 32px', overflowY: 'auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Student Details</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', fontSize: 13, fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
              Video Tutorial <FaVideo style={{ color: '#22c55e', fontSize: 16 }} />
            </button>
            <button 
              onClick={() => navigate('/dashboard/students/edit/' + s._id)}
              style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', fontSize: 14, fontWeight: 600, color: '#6366f1', cursor: 'pointer' }}
            >
              <FaEdit /> Edit Profile
            </button>
            <button 
              onClick={() => navigate('/dashboard/students')}
              style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', fontSize: 14, fontWeight: 600, color: '#475569', cursor: 'pointer' }}
            >
              <FaArrowLeft /> Go Back
            </button>
            <button 
              onClick={handleDelete}
              style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', fontSize: 14, fontWeight: 600, color: '#ef4444', cursor: 'pointer' }}
            >
              <FaTrash /> Delete
            </button>
          </div>
        </div>

        {/* Top Section */}
        <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
          {/* Profile Card */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 200 }}>
            <div style={{ width: 140, height: 140, background: '#d1d5db', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', marginBottom: 12, overflow: 'hidden' }}>
              {p.studentPhoto ? (
                 <img src={p.studentPhoto} alt="Student" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <>
                  <FaCamera style={{ fontSize: 32, marginBottom: 8 }} />
                  <span style={{ fontSize: 12, fontWeight: 600 }}>Noimage</span>
                </>
              )}
            </div>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#65a30d', margin: '0 0 4px 0', textAlign: 'center', textTransform: 'uppercase' }}>{fullName}</h2>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', margin: '0 0 2px 0' }}>Class: <span style={{fontWeight: 500}}>{className}</span></p>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', margin: '0 0 2px 0' }}>Admission Number: <span style={{fontWeight: 500}}>{a.admissionNumber}</span></p>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', margin: 0 }}>Date of Joining: <span style={{fontWeight: 500}}>{dojDate}</span></p>
          </div>

          {/* Stats Cards */}
          <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', gap: 16, alignContent: 'flex-start' }}>
            <StatCard title="Attendance" value={attendanceData?.attendancePercentage || "0.00%"} icon={<FaUserClock />} color="#d97706" />
            <StatCard title="Leaves" value="0/0" icon={<FaRunning />} color="#ea580c" />
            <StatCard title="Last Exam Result" value="0.00%" icon={<FaCheckCircle />} color="#65a30d" />
            <StatCard title="Assignments" value="0" icon={<FaTasks />} color="#ef4444" />
            <StatCard title="Fee Dues" value="20300.00" valueColor="#ef4444" icon={<FaFileInvoiceDollar />} color="#22c55e" />
            <StatCard title="Infirmary Visits" value="0" icon={<FaHospitalUser />} color="#ec4899" />
            <StatCard title="Transport" value="0" icon={<FaBus />} color="#a855f7" />
            <StatCard title="Infraction" value="0" icon={<FaExclamationTriangle />} color="#eab308" />
            <StatCard title="Appreciation" value="0" icon={<FaAward />} color="#8b5cf6" />
          </div>
        </div>

        {/* Bottom Section */}
        <div style={{ display: 'flex', gap: 24 }}>
          {/* Sidebar */}
          <div style={{ width: 220, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {['Personal details', 'Attendance', 'Leave History', 'Promotion History', 'Academic Performance', 'Fee Details', 'Infirmary Visit', 'Library Transaction Details', 'Transport Details', 'Infraction Details', 'Appreciation', 'MedicalCard', 'Report Card', 'Session Log'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  textAlign: 'left', padding: '12px 16px', borderRadius: 4, border: 'none', cursor: 'pointer',
                  fontSize: 13, fontWeight: 500, transition: 'all 0.2s',
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
            {activeTab === 'Personal details' && (
              <div style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                
                {/* Sensitive Data Toggle */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 8, marginBottom: 24 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#475569' }}>Show Sensitive Data</span>
                  <button 
                    onClick={() => setShowSensitive(!showSensitive)}
                    style={{ 
                      width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer',
                      background: showSensitive ? '#4ade80' : '#cbd5e1',
                      position: 'relative', transition: 'background 0.3s'
                    }}
                  >
                    <div style={{ 
                      width: 20, height: 20, borderRadius: 10, background: '#fff', 
                      position: 'absolute', top: 2, left: showSensitive ? 22 : 2, 
                      transition: 'left 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, fontWeight: 'bold', color: showSensitive ? '#4ade80' : '#cbd5e1'
                    }}>
                      {showSensitive ? 'ON' : ''}
                    </div>
                  </button>
                </div>

                {/* Sections */}
                <ProfileSection title="Essentials">
                  <DetailItem label="Admission Status" value={a.admissionStatus} />
                  <DetailItem label="Current Status" value={a.currentStatus} />
                  <DetailItem label="Reason" value={a.reason} />
                  <DetailItem label="First Name" value={p.firstName} />
                  <DetailItem label="Middle Name" value={p.middleName} />
                  <DetailItem label="Last Name" value={p.lastName} />
                  <DetailItem label="Admission Number" value={a.admissionNumber} />
                  <DetailItem label="Date of Birth" value={maskSensitiveData(dobDate)} />
                  <DetailItem label="Gender" value={p.gender} />
                </ProfileSection>

                <ProfileSection title="Unique Ids">
                  <DetailItem label="UDISE Number" value={u.udiseNumber} />
                  <DetailItem label="PEN" value={u.pen} />
                  <DetailItem label="APAAR ID" value={u.apaarId} />
                  <DetailItem label="E-Punjab Number" value={u.ePunjabNumber} />
                  <DetailItem label="Fees Number" value={u.feesNumber} />
                  <DetailItem label="Saral Number" value={u.saralNumber} />
                  <DetailItem label="S.R.N. Number" value={u.srnNumber} />
                  <DetailItem label="ISSEN" value={u.issen ? "True" : "False"} />
                  <DetailItem label="ABHA Number" value={u.abhaNumber} />
                  <DetailItem label="Bill/GR Number" value={u.billGrNumber} />
                  <DetailItem label="Student Number" value={u.studentNumber} />
                  <DetailItem label="RFID Card Number" value={u.rfidCardNumber} />
                </ProfileSection>

                <ProfileSection title="Address & Communication">
                  <DetailItem label="Contact Number" value={maskSensitiveData(c.contactNumber)} />
                  <DetailItem label="Secondary Contact No" value={c.secondaryContactNo} />
                  <DetailItem label="Student Email" value={c.studentEmail} />
                  <DetailItem label="Current Address" value={c.currentAddress} />
                  <DetailItem label="City" value={c.city} />
                  <DetailItem label="State" value={c.state} />
                  <DetailItem label="Pin Code" value={c.pinCode} />
                  <DetailItem label="Permanent Address" value={c.permanentAddress} />
                  <DetailItem label="Pin Code" value={c.permanentPinCode} />
                  <DetailItem label="City" value={c.permanentCity} />
                  <DetailItem label="State" value={c.permanentState} />
                  <DetailItem label="Domicile State" value={c.domicileState} />
                </ProfileSection>

                <ProfileSection title="Academic Mapping">
                  <DetailItem label="Roll Number" value={a.rollNumber} />
                  <DetailItem label="Class" value={a.class} />
                  <DetailItem label="Section" value={a.section} />
                  <DetailItem label="Board" value={a.board} />
                  <DetailItem label="Date of Admission" value={doaDate} />
                  <DetailItem label="Date of Joining" value={dojDate} />
                  <DetailItem label="Stream" value={a.stream} />
                  <DetailItem label="Optional Subject" value={a.optionalSubject} />
                  <DetailItem label="Previous Class" value={a.previousClass} />
                  <DetailItem label="SixSubject" value={a.sixSubject} />
                </ProfileSection>

                <ProfileSection title="Personal Details">
                  <DetailItem label="Parish" value={p.parish} />
                  <DetailItem label="House Names" value={p.houseNames} />
                  <DetailItem label="Religion" value={p.religion} />
                  <DetailItem label="School Category" value={p.schoolCategory} />
                  <DetailItem label="Caste" value={p.caste} />
                  <DetailItem label="Sub Caste" value={p.subCaste} />
                  <DetailItem label="Nationality" value={p.nationality} />
                  <DetailItem label="Place Of Birth" value={p.placeOfBirth} />
                  <DetailItem label="Is NACH/ECS" value={p.isNachEcs ? "True" : "False"} />
                  <DetailItem label="Is EWS/CWSN" value={p.isEwsCwsn} />
                  <DetailItem label="Is Minority" value={p.isMinority ? "True" : "False"} />
                  <DetailItem label="Is Disability" value={p.isDisabilityCwsn ? "True" : "False"} />
                  <DetailItem label="Disability Description" value={p.disabilityDescription} />
                  <DetailItem label="Is RTE" value={p.isRte} />
                  <DetailItem label="Clubs" value={p.clubs} />
                  <DetailItem label="Cadet Type" value={p.cadetType} />
                  <DetailItem label="States/National Competitions" value={p.statesNationalCompetitions} />
                  <DetailItem label="Food Status" value={p.foodStatus} />
                  <DetailItem label="Mother Tongue" value={p.motherTongue} />
                  <DetailItem label="Boarding/Hostel" value={p.boardingHostel} />
                </ProfileSection>

                <ProfileSection title="Family">
                  <DetailItem label="Staff Name" value={f.staffName} />
                  <DetailItem label="Family ID" value={f.familyId} />
                  <DetailItem label="Parent Status" value={f.parentStatus} />
                  
                  {/* Father Details */}
                  <DetailItem label="Father's Title" value={father.title} />
                  <DetailItem label="Father's First Name" value={father.firstName} />
                  <DetailItem label="Middle Name" value={father.middleName} />
                  <DetailItem label="Last Name" value={father.lastName} />
                  <DetailItem label="Annual Income" value={father.annualIncome} />
                  <DetailItem label="Aadhar Number" value={maskSensitiveData(father.aadharNumber)} />
                  <DetailItem label="PAN Number" value={maskSensitiveData(father.panNumber)} />
                  <DetailItem label="Mobile" value={maskSensitiveData(father.mobile)} />
                  <DetailItem label="Phone" value={father.phone} />
                  <DetailItem label="Email" value={father.email} />
                  <DetailItem label="Residence Address" value={father.residenceAddress} />
                  <DetailItem label="Qualification" value={father.qualification} />
                  <DetailItem label="Profession" value={father.profession} />
                  <DetailItem label="Company Name" value={father.companyName} />
                  
                  {/* Mother Details */}
                  <DetailItem label="Mother's Title" value={mother.title} />
                  <DetailItem label="Mother's First Name" value={mother.firstName} />
                  <DetailItem label="Middle Name" value={mother.middleName} />
                  <DetailItem label="Last Name" value={mother.lastName} />
                  <DetailItem label="Annual Income" value={mother.annualIncome} />
                  <DetailItem label="Aadhar Number" value={maskSensitiveData(mother.aadharNumber)} />
                  <DetailItem label="PAN Number" value={maskSensitiveData(mother.panNumber)} />
                  <DetailItem label="Mobile" value={maskSensitiveData(mother.mobile)} />
                  <DetailItem label="Phone" value={mother.phone} />
                  <DetailItem label="Email" value={mother.email} />
                  <DetailItem label="Residence Address" value={mother.residenceAddress} />
                  <DetailItem label="Qualification" value={mother.qualification} />
                  <DetailItem label="Profession" value={mother.profession} />
                  
                  {/* Guardian Details */}
                  <DetailItem label="Guardian Name" value={g.name} />
                  <DetailItem label="Relationship" value={g.relationship} />
                  <DetailItem label="Mobile" value={maskSensitiveData(g.mobile)} />
                  <DetailItem label="Secondary Guardian Name" value={g.secondaryGuardianName} />
                  <DetailItem label="Secondary Guardian Mobile" value={g.secondaryGuardianMobile} />
                  <DetailItem label="Secondary Guardian Relationship" value={g.secondaryGuardianRelationship} />
                  
                  {/* Emergency Contacts */}
                  {(s.emergencyContacts || []).map((ec, idx) => (
                    <React.Fragment key={idx}>
                      <DetailItem label={`Emergency Contact ${idx + 1}`} value={ec.name} />
                      <DetailItem label="Relation" value={ec.relation} />
                      <DetailItem label="Mobile" value={ec.mobileNumber} />
                    </React.Fragment>
                  ))}
                  
                  {/* Photo place holders at the end of the Family section */}
                  <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-around', marginTop: 32, padding: '24px 0', borderTop: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>Family Photo</span>
                      <div style={{ width: 120, height: 120, border: '2px solid #e2e8f0', background: '#d1d5db', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', overflow: 'hidden' }}>
                        {f.familyPhoto ? <img src={f.familyPhoto} alt="Family" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <><FaCamera style={{ fontSize: 32, marginBottom: 8 }} /><span style={{ fontSize: 11, fontWeight: 600 }}>Noimage</span></>}
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>Father Photo</span>
                      <div style={{ width: 120, height: 120, border: '2px solid #e2e8f0', background: '#d1d5db', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', overflow: 'hidden' }}>
                        {father.photo ? <img src={father.photo} alt="Father" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <><FaCamera style={{ fontSize: 32, marginBottom: 8 }} /><span style={{ fontSize: 11, fontWeight: 600 }}>Noimage</span></>}
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>Mother Photo</span>
                      <div style={{ width: 120, height: 120, border: '2px solid #e2e8f0', background: '#d1d5db', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', overflow: 'hidden' }}>
                        {mother.photo ? <img src={mother.photo} alt="Mother" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <><FaCamera style={{ fontSize: 32, marginBottom: 8 }} /><span style={{ fontSize: 11, fontWeight: 600 }}>Noimage</span></>}
                      </div>
                    </div>
                  </div>
                </ProfileSection>
                
                <div style={{ textAlign: 'center', marginTop: 40, paddingBottom: 20, fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>
                  COPYRIGHT © 2026 FRANCISCAN
                </div>
              </div>
            )}

            {/* Other Tabs remain unchanged */}
            {activeTab === 'Attendance' && (
              <div style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                {showLeaveForm && (
                  <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ background: '#fff', padding: 24, borderRadius: 12, width: 400, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                      <h3 style={{ margin: '0 0 16px 0', color: '#1e293b' }}>Apply for Leave</h3>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <div>
                          <label style={{ display: 'block', fontSize: 13, color: '#475569', marginBottom: 4 }}>Leave Type</label>
                          <select value={leaveData.leaveType} onChange={e => setLeaveData({...leaveData, leaveType: e.target.value})} style={{ width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: 4 }}>
                            <option>Sick Leave</option>
                            <option>Casual Leave</option>
                            <option>Emergency Leave</option>
                          </select>
                        </div>
                        <div style={{ display: 'flex', gap: 12 }}>
                          <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontSize: 13, color: '#475569', marginBottom: 4 }}>From Date</label>
                            <input type="date" value={leaveData.fromDate} onChange={e => setLeaveData({...leaveData, fromDate: e.target.value})} style={{ width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: 4 }} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontSize: 13, color: '#475569', marginBottom: 4 }}>To Date</label>
                            <input type="date" value={leaveData.toDate} onChange={e => setLeaveData({...leaveData, toDate: e.target.value})} style={{ width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: 4 }} />
                          </div>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: 13, color: '#475569', marginBottom: 4 }}>Reason</label>
                          <textarea value={leaveData.reason} onChange={e => setLeaveData({...leaveData, reason: e.target.value})} style={{ width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: 4, minHeight: 80 }} placeholder="Reason for leave..."></textarea>
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
                        <button onClick={() => setShowLeaveForm(false)} style={{ padding: '8px 16px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
                        <button onClick={handleApplyLeave} style={{ padding: '8px 16px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 600 }}>Submit</button>
                      </div>
                    </div>
                  </div>
                )}
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <h3 style={{ margin: 0, fontSize: 16, color: '#1e293b' }}>Attendance Overview</h3>
                    <button 
                      onClick={() => setShowLeaveForm(true)}
                      style={{ padding: '6px 12px', background: '#f59e0b', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 13, fontWeight: 600 }}
                    >
                      Apply Leave
                    </button>
                  </div>
                  
                  <div style={{ display: 'flex', gap: 12 }}>
                    <select 
                      value={attMonth} 
                      onChange={e => setAttMonth(e.target.value)}
                      style={{ padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: 6, outline: 'none', color: '#334155', fontSize: 13, fontWeight: 600 }}
                    >
                      <option value="All">All Months</option>
                      {Array.from({ length: 12 }).map((_, i) => (
                        <option key={i+1} value={i+1}>{new Date(0, i).toLocaleString('en', { month: 'long' })}</option>
                      ))}
                    </select>
                    <select 
                      value={attYear} 
                      onChange={e => setAttYear(e.target.value)}
                      style={{ padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: 6, outline: 'none', color: '#334155', fontSize: 13, fontWeight: 600 }}
                    >
                      {Array.from({ length: 5 }).map((_, i) => {
                        const y = new Date().getFullYear() - 2 + i;
                        return <option key={y} value={y}>{y}</option>;
                      })}
                    </select>
                  </div>
                </div>
                
                {attendanceLoading ? (
                  <div style={{ padding: '60px 0', textAlign: 'center', fontSize: 14, fontWeight: 700, color: '#334155' }}>
                    Loading attendance...
                  </div>
                ) : attendanceData && attendanceData.summary ? (
                  <div>
                     {/* Summary */}
                     <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
                        {Object.entries(attendanceData.summary).map(([key, val]) => {
                            if (key === '_id') return null;
                            return (
                              <div key={key} style={{ background: '#f8fafc', padding: '16px', borderRadius: 8, border: '1px solid #e2e8f0', flex: 1, minWidth: 100, textAlign: 'center' }}>
                                 <div style={{ fontSize: 11, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>{key}</div>
                                 <div style={{ fontSize: 24, color: key === 'Present' ? '#22c55e' : key === 'Absent' ? '#ef4444' : '#0f172a', fontWeight: 700 }}>{val}</div>
                              </div>
                            );
                        })}
                     </div>
                     
                     {/* Table of records */}
                     <h4 style={{ margin: '0 0 16px 0', fontSize: 15, color: '#1e293b' }}>Recent Attendance Records</h4>
                     <div style={{ overflow: 'auto' }}>
                       <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 400 }}>
                         <thead>
                           <tr style={{ background: '#f8fafc' }}>
                              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 13, color: '#475569', fontWeight: 700, borderBottom: '1px solid #e2e8f0' }}>Date</th>
                              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 13, color: '#475569', fontWeight: 700, borderBottom: '1px solid #e2e8f0' }}>Status</th>
                              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 13, color: '#475569', fontWeight: 700, borderBottom: '1px solid #e2e8f0' }}>Remarks</th>
                           </tr>
                         </thead>
                         <tbody>
                           {(attendanceData.records || []).map(r => (
                             <tr key={r._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                               <td style={{ padding: '12px 16px', fontSize: 13, color: '#334155', fontWeight: 500 }}>
                                 {new Date(r.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                               </td>
                               <td style={{ padding: '12px 16px', fontSize: 13, color: r.status === 'Present' ? '#22c55e' : r.status === 'Absent' ? '#ef4444' : '#f59e0b', fontWeight: 700 }}>
                                 {r.status}
                               </td>
                               <td style={{ padding: '12px 16px', fontSize: 13, color: '#64748b' }}>
                                 {r.remarks || '-'}
                               </td>
                             </tr>
                           ))}
                           {(!attendanceData.records || attendanceData.records.length === 0) && (
                             <tr>
                               <td colSpan="3" style={{ padding: '24px', textAlign: 'center', color: '#94a3b8' }}>No specific records found</td>
                             </tr>
                           )}
                         </tbody>
                       </table>
                     </div>
                  </div>
                ) : (
                  <div style={{ padding: '60px 0', textAlign: 'center', fontSize: 14, fontWeight: 700, color: '#334155' }}>
                    No Attendance Data Found
                  </div>
                )}
              </div>
            )}

                        {activeTab === 'Leave History' && (
              <LeaveHistoryTab studentId={id} />
            )}
            {activeTab === 'Promotion History' && (
              <PromotionHistoryTab studentId={id} />
            )}
            {activeTab === 'Academic Performance' && (
              <div style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 24 }}>
                  <div style={{ border: '1px solid #e2e8f0', padding: '4px 12px', borderRadius: 4, display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: 10, color: '#94a3b8' }}>Academic Year</span>
                    <span style={{ fontSize: 13, color: '#334155', fontWeight: 600 }}>2026-2027</span>
                  </div>
                </div>
                <div style={{ padding: '40px 0', display: 'flex', justifyContent: 'center' }}>
                  <div style={{ width: 300, height: 200, background: '#f8fafc', border: '2px dashed #cbd5e1', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: '#64748b' }}>
                    <FaExclamationTriangle style={{ fontSize: 40, color: '#94a3b8', marginBottom: 12 }} />
                    <span style={{ fontWeight: 700 }}>NO RECORD FOUND</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Fee Details' && (
              <div style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 24 }}>
                  <div style={{ border: '1px solid #e2e8f0', padding: '4px 12px', borderRadius: 4, display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: 10, color: '#94a3b8' }}>Academic Year</span>
                    <span style={{ fontSize: 13, color: '#334155', fontWeight: 600 }}>2026-2027</span>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 60, marginBottom: 40 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#334155' }}>Fee Summary</span>
                  <div style={{ width: 120, height: 120, borderRadius: '50%', background: 'conic-gradient(#4ade80 0% 20.4%, #ef4444 20.4% 100%)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 10, fontWeight: 'bold' }}>
                    <span style={{ position: 'absolute', top: 20, right: 20 }}>20.4%</span>
                    <span style={{ position: 'absolute', bottom: 30, left: 20 }}>79.6%</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 10, height: 10, borderRadius: '50%', background: '#4ade80' }}></div> <span style={{ fontSize: 13, color: '#475569' }}>Received 5200</span></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }}></div> <span style={{ fontSize: 13, color: '#475569' }}>Outstanding 20300</span></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }}></div> <span style={{ fontSize: 13, color: '#475569' }}>Concession 0</span></div>
                  </div>
                </div>

                <div style={{ background: '#e0f2fe', padding: '12px 16px', color: '#0369a1', fontWeight: 700, fontSize: 14, borderLeft: '4px solid #0ea5e9' }}>
                  Advance Received: 0
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16 }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 13, color: '#475569', fontWeight: 700 }}>Installment</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 13, color: '#475569', fontWeight: 700 }}>Actual Fee</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 13, color: '#475569', fontWeight: 700 }}>Concession</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 13, color: '#475569', fontWeight: 700 }}>Received</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 13, color: '#475569', fontWeight: 700 }}>Outstanding</th>
                    </tr>
                  </thead>
                  <tbody>
                    {['April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'Febuary-March'].map((month, idx) => {
                      const actual = month === 'April' ? 5200 : month === 'October' ? 2500 : month === 'Febuary-March' ? 4200 : 1700;
                      const received = month === 'April' ? 5200 : 0;
                      const outstanding = actual - received;
                      return (
                        <tr key={month} style={{ borderBottom: '1px solid #f1f5f9', background: month === 'January' ? '#fafafa' : 'transparent' }}>
                          <td style={{ padding: '12px 16px', fontSize: 13, color: '#65a30d', fontWeight: 600 }}>{month}</td>
                          <td style={{ padding: '12px 16px', fontSize: 13, color: '#64748b' }}>{actual}</td>
                          <td style={{ padding: '12px 16px', fontSize: 13, color: '#64748b' }}>0</td>
                          <td style={{ padding: '12px 16px', fontSize: 13, color: '#64748b' }}>{received}</td>
                          <td style={{ padding: '12px 16px', fontSize: 13, color: '#64748b' }}>{outstanding}</td>
                        </tr>
                      )
                    })}
                    <tr style={{ borderBottom: '1px solid #f1f5f9', fontWeight: 700 }}>
                      <td style={{ padding: '12px 16px', fontSize: 14, color: '#475569' }}>Total</td>
                      <td style={{ padding: '12px 16px', fontSize: 14, color: '#64748b' }}>25500</td>
                      <td style={{ padding: '12px 16px', fontSize: 14, color: '#64748b' }}>0</td>
                      <td style={{ padding: '12px 16px', fontSize: 14, color: '#64748b' }}>5200</td>
                      <td style={{ padding: '12px 16px', fontSize: 14, color: '#64748b' }}>20300</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'Infirmary Visit' && (
              <div style={{ background: '#fff', padding: '80px 24px', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', textAlign: 'center' }}>
                <span style={{ fontSize: 20, fontWeight: 700, color: '#000' }}>Not yet visited !</span>
              </div>
            )}

            {activeTab === 'Library Transaction Details' && (
              <div style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <div style={{ marginBottom: 32 }}>
                  <div style={{ background: '#f1f5f9', padding: '10px 16px', borderRadius: '4px 4px 0 0', borderBottom: '2px solid #4ade80', fontSize: 14, fontWeight: 700, color: '#334155' }}>
                    Library Transaction Details
                  </div>
                  <div style={{ padding: '24px 16px', border: '1px solid #f1f5f9', borderRadius: '0 0 4px 4px', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                     <div style={{ textAlign: 'center' }}>
                       <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>Issued</div>
                       <div style={{ fontSize: 14, color: '#64748b' }}>0</div>
                     </div>
                     <div style={{ textAlign: 'center' }}>
                       <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>Returned</div>
                       <div style={{ fontSize: 14, color: '#64748b' }}>0</div>
                     </div>
                     <div style={{ textAlign: 'center' }}>
                       <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>Pending</div>
                       <div style={{ fontSize: 14, color: '#64748b' }}>0</div>
                     </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
                    <button style={{ background: '#4ade80', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 4, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>View Transaction Details</button>
                  </div>
                </div>

                <div>
                  <div style={{ background: '#f1f5f9', padding: '10px 16px', borderRadius: '4px 4px 0 0', borderBottom: '2px solid #4ade80', fontSize: 14, fontWeight: 700, color: '#334155' }}>
                    Library Fine Details
                  </div>
                  <div style={{ padding: '24px 16px', border: '1px solid #f1f5f9', borderRadius: '0 0 4px 4px', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                     <div style={{ textAlign: 'center' }}>
                       <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>Dues</div>
                       <div style={{ fontSize: 14, color: '#64748b' }}>0</div>
                     </div>
                     <div style={{ textAlign: 'center' }}>
                       <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>Waive off</div>
                       <div style={{ fontSize: 14, color: '#64748b' }}>0</div>
                     </div>
                     <div style={{ textAlign: 'center' }}>
                       <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>Paid</div>
                       <div style={{ fontSize: 14, color: '#64748b' }}>0</div>
                     </div>
                     <div style={{ textAlign: 'center' }}>
                       <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>Pending</div>
                       <div style={{ fontSize: 14, color: '#64748b' }}>0</div>
                     </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
                    <button style={{ background: '#4ade80', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 4, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>View Fine Details</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Transport Details' && (
              <div style={{ background: '#fff', padding: 32, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px 16px' }}>
                  <div style={{ display: 'flex', gap: 8 }}><span style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>Transport Type:</span> <span style={{ fontSize: 13, color: '#475569' }}>School</span></div>
                  <div style={{ display: 'flex', gap: 8 }}><span style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>Vehicle Number:</span> <span style={{ fontSize: 13, color: '#475569' }}>UP54AT5266</span></div>
                  <div style={{ display: 'flex', gap: 8 }}><span style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>Vehicle Type:</span> <span style={{ fontSize: 13, color: '#475569' }}>BUS</span></div>
                  
                  <div style={{ display: 'flex', gap: 8 }}><span style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>Driver Name:</span> <span style={{ fontSize: 13, color: '#475569' }}>JANGALI YADAV</span></div>
                  <div style={{ display: 'flex', gap: 8 }}><span style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>Vehicle Name:</span> <span style={{ fontSize: 13, color: '#475569' }}>BHARAT BENZ</span></div>
                  <div style={{ display: 'flex', gap: 8 }}><span style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>Contact No.:</span> <span style={{ fontSize: 13, color: '#475569' }}>8726887709</span></div>
                  
                  <div style={{ display: 'flex', gap: 8 }}><span style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>Route No:</span> <span style={{ fontSize: 13, color: '#475569' }}>1</span></div>
                  <div style={{ display: 'flex', gap: 8 }}><span style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>Route Incharge Name:</span> <span style={{ fontSize: 13, color: '#475569' }}>AKASH RAI</span></div>
                  <div style={{ display: 'flex', gap: 8 }}><span style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>Route Incharge Name:</span> <span style={{ fontSize: 13, color: '#475569' }}>AKASH RAI</span></div>
                  
                  <div style={{ display: 'flex', gap: 8 }}><span style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>Route Incharge Mobile No.:</span> <span style={{ fontSize: 13, color: '#475569' }}>08400900772</span></div>
                </div>
              </div>
            )}

            {(activeTab === 'Infraction Details' || activeTab === 'Appreciation') && (
              <div style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <div style={{ padding: '80px 0', display: 'flex', justifyContent: 'center' }}>
                  <div style={{ width: 300, height: 200, background: '#f8fafc', border: '2px dashed #cbd5e1', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: '#64748b' }}>
                    <FaExclamationTriangle style={{ fontSize: 40, color: '#94a3b8', marginBottom: 12 }} />
                    <span style={{ fontWeight: 700 }}>NO RECORD FOUND</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'MedicalCard' && (
              <div style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <div style={{ background: '#f1f5f9', padding: '10px 16px', borderRadius: '4px 4px 0 0', borderBottom: '2px solid #4ade80', fontSize: 14, fontWeight: 700, color: '#334155', marginBottom: 32 }}>
                  Medical Card
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px 16px' }}>
                  <div style={{ display: 'flex', gap: 8 }}><span style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>BCG:</span></div>
                  <div style={{ display: 'flex', gap: 8 }}><span style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>Diphtheria:</span></div>
                  <div style={{ display: 'flex', gap: 8 }}><span style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>DPT Booster:</span></div>
                  
                  <div style={{ display: 'flex', gap: 8 }}><span style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>Whooping Cough:</span></div>
                  <div style={{ display: 'flex', gap: 8 }}><span style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>Tetanus:</span></div>
                  <div style={{ display: 'flex', gap: 8 }}><span style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>Measles:</span></div>
                  
                  <div style={{ display: 'flex', gap: 8 }}><span style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>MMR:</span></div>
                  <div style={{ display: 'flex', gap: 8 }}><span style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>Chicken Pox:</span></div>
                  <div style={{ display: 'flex', gap: 8 }}><span style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>Hepatitis A:</span></div>
                  
                  <div style={{ display: 'flex', gap: 8 }}><span style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>Hepatitis B:</span></div>
                  <div style={{ display: 'flex', gap: 8 }}><span style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>Typhoid:</span></div>
                  <div style={{ display: 'flex', gap: 8 }}><span style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>Covid Dose 1:</span></div>
                  
                  <div style={{ display: 'flex', gap: 8 }}><span style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>Covid Dose 1:</span></div>
                  <div style={{ display: 'flex', gap: 8 }}><span style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>Covid Booster Dose:</span></div>
                  <div style={{ display: 'flex', gap: 8 }}><span style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>Allergies:</span></div>
                  
                  <div style={{ display: 'flex', gap: 8 }}><span style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>Surgery Undergone In The Past:</span></div>
                  <div style={{ display: 'flex', gap: 8 }}><span style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>Specific Past Disease:</span></div>
                  <div style={{ display: 'flex', gap: 8 }}><span style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>Child Regular Medication:</span></div>
                </div>
              </div>
            )}

            {activeTab === 'Report Card' && (
              <div style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
                  <span style={{ fontSize: 18, fontWeight: 700, color: '#334155' }}>Report Card</span>
                  <div style={{ border: '1px solid #e2e8f0', padding: '8px 12px', borderRadius: 4 }}>
                    <span style={{ fontSize: 13, color: '#334155', fontWeight: 600 }}>NUR-A</span>
                  </div>
                </div>
                <div style={{ padding: '40px 0', display: 'flex', justifyContent: 'center' }}>
                  <div style={{ width: 300, height: 200, background: '#f8fafc', border: '2px dashed #cbd5e1', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: '#64748b' }}>
                    <FaExclamationTriangle style={{ fontSize: 40, color: '#94a3b8', marginBottom: 12 }} />
                    <span style={{ fontWeight: 700 }}>NO RECORD FOUND</span>
                  </div>
                </div>
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
      <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', marginBottom: 24 }}>Students List</h1>

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
            <option value="Admission No">Admission No</option>
          </select>

          <input 
            type="text" 
            placeholder="Type here..." 
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ border: '1px solid #d1d5db', borderRadius: 4, padding: '8px 12px', fontSize: 14, minWidth: 240, outline: 'none' }}
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginLeft: 16 }}>
            {['All', 'Boarding', 'Day Scholar'].map((type) => (
              <label key={type} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: '#4a5568', cursor: 'pointer' }}>
                <input 
                  type="radio" 
                  name="studentType"
                  checked={studentType === type}
                  onChange={() => setStudentType(type)}
                  style={{ accentColor: '#2563eb', width: 16, height: 16, cursor: 'pointer' }}
                />
                {type}
              </label>
            ))}
          </div>

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
              Students - (Total: 1232)
            </h2>
            {/* Favourites filter badge */}
            <button
              onClick={() => setShowFavouritesOnly(!showFavouritesOnly)}
              title={showFavouritesOnly ? 'Show All Students' : 'Show Favourites Only'}
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#475569' }}>Show Sensitive Data</span>
              <button 
                onClick={() => setShowSensitive(!showSensitive)}
                style={{ 
                  width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer',
                  background: showSensitive ? '#4ade80' : '#cbd5e1',
                  position: 'relative', transition: 'background 0.3s'
                }}
              >
                <div style={{ 
                  width: 20, height: 20, borderRadius: 10, background: '#fff', 
                  position: 'absolute', top: 2, left: showSensitive ? 22 : 2, 
                  transition: 'left 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, fontWeight: 'bold', color: showSensitive ? '#4ade80' : '#cbd5e1'
                }}>
                  {showSensitive ? 'ON' : ''}
                </div>
              </button>
            </div>

            <div style={{ display: 'flex', gap: 4 }}>
              <button 
                onClick={() => setViewType('list')}
                style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  width: 36, height: 36, borderRadius: 4, border: '1px solid #e2e8f0', cursor: 'pointer',
                  background: viewType === 'list' ? '#4ade80' : '#fff',
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
                  background: viewType === 'grid' ? '#4ade80' : '#fff',
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
                  {['Admission No', 'Name', 'Class', 'DOB', 'Father Name', 'Mother Name', 'Contact Number'].map((head) => (
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
                {displayedStudents.length === 0 ? (
                  <tr>
                    <td colSpan={9} style={{ padding: '32px', textAlign: 'center', color: '#94a3b8', fontSize: 14 }}>
                      <FaStar style={{ color: '#fbbf24', fontSize: 24, marginBottom: 8, display: 'block', margin: '0 auto 8px' }} />
                      No students found.
                    </td>
                  </tr>
                ) : displayedStudents.map((student) => {
                  const isFav = favourites.includes(student.id);
                  return (
                    <tr
                      key={student.id}
                      style={{
                        borderBottom: '1px solid #e2e8f0',
                        background: isFav ? '#fffbeb' : 'transparent',
                        transition: 'background 0.3s',
                      }}
                    >
                      <td style={{ padding: '16px', fontSize: 14, color: '#475569' }}>{student.adm}</td>
                      <td style={{ padding: '16px', fontSize: 14, fontWeight: 500, color: '#475569', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 32, height: 20, background: '#a5b4fc', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#fff', fontWeight: 'bold' }}>
                          img
                        </div>
                        {student.name}
                      </td>
                      <td style={{ padding: '16px', fontSize: 14, color: '#475569' }}>{student.class}</td>
                      <td style={{ padding: '16px', fontSize: 14, color: '#475569' }}>{maskSensitiveData(student.dob)}</td>
                      <td style={{ padding: '16px', fontSize: 14, color: '#475569' }}>{student.father}</td>
                      <td style={{ padding: '16px', fontSize: 14, color: '#475569' }}>{student.mother}</td>
                      <td style={{ padding: '16px', fontSize: 14, color: '#475569' }}>{maskSensitiveData(student.contact)}</td>
                      <td style={{ padding: '16px', textAlign: 'center' }}>
                        <button 
                          onClick={() => setSelectedStudent(student)}
                          style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', transition: 'color 0.2s' }}
                          onMouseEnter={(e) => e.currentTarget.style.color = '#2563eb'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
                        >
                          <FaEye style={{ fontSize: 16 }} />
                        </button>
                      </td>
                      <td style={{ padding: '16px', textAlign: 'center' }}>
                        <button
                          onClick={() => toggleFavourite(student.id)}
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
            {displayedStudents.length === 0 ? (
              <div style={{ gridColumn: '1 / -1', padding: '32px', textAlign: 'center', color: '#94a3b8', fontSize: 14 }}>
                <FaStar style={{ color: '#fbbf24', fontSize: 24, marginBottom: 8, display: 'block', margin: '0 auto 8px' }} />
                No students found.
              </div>
            ) : displayedStudents.map((student) => {
              const isFav = favourites.includes(student.id);
              return (
                <div key={student.id} style={{
                  background: isFav ? '#fffbeb' : '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                  position: 'relative'
                }}>
                  <button
                    onClick={() => toggleFavourite(student.id)}
                    style={{
                      position: 'absolute', top: 12, right: 12,
                      background: 'none', border: 'none', cursor: 'pointer',
                      padding: '4px'
                    }}
                  >
                    <FaStar style={{ fontSize: 18, color: isFav ? '#f59e0b' : '#d1d5db' }} />
                  </button>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                    <div style={{ width: 48, height: 48, background: '#a5b4fc', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1e293b', margin: 0 }}>{student.name}</h3>
                      <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>Adm No: {student.adm}</p>
                    </div>
                  </div>
                  <div style={{ fontSize: 13, color: '#475569', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 500 }}>Class:</span> <span>{student.class}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 500 }}>Type:</span> <span>{student.type}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 500 }}>DOB:</span> <span>{maskSensitiveData(student.dob)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 500 }}>Contact:</span> <span>{maskSensitiveData(student.contact)}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setSelectedStudent(student)}
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

const StatCard = ({ title, value, icon, color, valueColor }) => (
  <div style={{ background: '#fff', borderRadius: 8, padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '220px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
    <div>
      <p style={{ fontSize: 12, color: '#94a3b8', margin: '0 0 4px 0', fontWeight: 600 }}>{title}</p>
      <h3 style={{ fontSize: 18, color: valueColor || '#1e293b', margin: 0, fontWeight: 700 }}>{value}</h3>
    </div>
    <div style={{ width: 40, height: 40, borderRadius: '50%', background: `${color}22`, color: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
      {icon}
    </div>
  </div>
);

const ProfileSection = ({ title, children }) => (
  <div style={{ marginBottom: 24 }}>
    <div style={{ background: '#e2e8f0', padding: '10px 16px', borderRadius: '4px 4px 0 0', borderBottom: '2px solid #4ade80' }}>
      <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#334155' }}>{title}</h3>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px 16px', padding: '24px 16px', border: '1px solid #f1f5f9', borderRadius: '0 0 4px 4px' }}>
      {children}
    </div>
  </div>
);

const DetailItem = ({ label, value }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    <span style={{ fontSize: 12, fontWeight: 700, color: '#1e293b' }}>{label}:</span>
    <span style={{ fontSize: 13, color: '#475569' }}>{value || '-'}</span>
  </div>
);


const LeaveHistoryTab = ({ studentId }) => {
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/leave-requests/student/${studentId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setHistory(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (studentId) fetchHistory();
  }, [studentId]);

  if (loading) return <div style={{ padding: 24, textAlign: 'center', color: '#64748b' }}>Loading history...</div>;
  if (!history) return <div style={{ padding: 24, textAlign: 'center', color: '#64748b' }}>No leave history found.</div>;

  return (
    <div style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <h3 style={{ margin: '0 0 16px 0', color: '#1e293b' }}>Leave Summary</h3>
      <div style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
        <div style={{ flex: 1, padding: 16, background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0', textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>Total Requests</div>
          <div style={{ fontSize: 24, color: '#1e293b', fontWeight: 700 }}>{history.summary?.Total || 0}</div>
        </div>
        <div style={{ flex: 1, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0', textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: '#166534', fontWeight: 600 }}>Approved</div>
          <div style={{ fontSize: 24, color: '#15803d', fontWeight: 700 }}>{history.summary?.Approved || 0}</div>
        </div>
        <div style={{ flex: 1, padding: 16, background: '#fef2f2', borderRadius: 8, border: '1px solid #fecaca', textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: '#991b1b', fontWeight: 600 }}>Rejected</div>
          <div style={{ fontSize: 24, color: '#b91c1c', fontWeight: 700 }}>{history.summary?.Rejected || 0}</div>
        </div>
        <div style={{ flex: 1, padding: 16, background: '#fffbeb', borderRadius: 8, border: '1px solid #fde68a', textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: '#92400e', fontWeight: 600 }}>Pending</div>
          <div style={{ fontSize: 24, color: '#d97706', fontWeight: 700 }}>{history.summary?.Pending || 0}</div>
        </div>
      </div>

      <h3 style={{ margin: '0 0 16px 0', color: '#1e293b' }}>Request History</h3>
      {history.leaveRequests?.length > 0 ? (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', color: '#475569', fontSize: 12, textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>Leave Type</th>
                <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>From</th>
                <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>To</th>
                <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>Days</th>
                <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>Status</th>
                <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>Reason / Remarks</th>
              </tr>
            </thead>
            <tbody>
              {history.leaveRequests.map(req => (
                <tr key={req._id} style={{ borderBottom: '1px solid #e2e8f0', fontSize: 13, color: '#334155' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 500 }}>{req.leaveType || 'General'}</td>
                  <td style={{ padding: '12px 16px' }}>{new Date(req.fromDate).toLocaleDateString()}</td>
                  <td style={{ padding: '12px 16px' }}>{new Date(req.toDate).toLocaleDateString()}</td>
                  <td style={{ padding: '12px 16px' }}>{req.totalDays}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ 
                      padding: '4px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600,
                      background: req.status === 'Approved' ? '#dcfce7' : req.status === 'Rejected' ? '#fee2e2' : '#fef3c7',
                      color: req.status === 'Approved' ? '#166534' : req.status === 'Rejected' ? '#991b1b' : '#92400e'
                    }}>
                      {req.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ marginBottom: req.adminRemarks ? 4 : 0 }}>{req.reason}</div>
                    {req.adminRemarks && <div style={{ fontSize: 11, color: '#64748b' }}>Admin: {req.adminRemarks}</div>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ padding: 24, textAlign: 'center', color: '#64748b', background: '#f8fafc', borderRadius: 8 }}>
          No leave requests recorded yet.
        </div>
      )}
    </div>
  );
};

export default Students;



function PromotionHistoryTab({ studentId }) {
  const [history, setHistory] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/promotions/history/student/${studentId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setHistory(data.history || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [studentId]);


  const handleDeleteHistory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this promotion history record? Note: Student class will NOT be reverted automatically.")) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/promotions/history/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setHistory(history.filter(r => r._id !== id));
      } else {
        alert("Failed to delete record.");
      }
    } catch (e) {
      console.error(e);
      alert("Error deleting record.");
    }
  };

  if (loading) return <div style={{ padding: 24, textAlign: 'center', color: '#64748b' }}>Loading promotion history...</div>;
  if (!history || history.length === 0) return <div style={{ padding: 24, textAlign: 'center', color: '#64748b' }}>No promotion history found.</div>;

  return (
    <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: 16, color: '#0f172a', fontWeight: 600 }}>Promotion History</h3>
        <span style={{ fontSize: 13, color: '#64748b', fontWeight: 500 }}>Total: {history.length}</span>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead style={{ background: '#f8fafc' }}>
          <tr>
            <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', color: '#475569', fontSize: 13, fontWeight: 600 }}>Date</th>
            <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', color: '#475569', fontSize: 13, fontWeight: 600 }}>Promoted From</th>
            <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', color: '#475569', fontSize: 13, fontWeight: 600 }}>Promoted To</th>
            <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', color: '#475569', fontSize: 13, fontWeight: 600 }}>Remarks</th>
            <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', color: '#475569', fontSize: 13, fontWeight: 600 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {history.map(rec => (
            <tr key={rec._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '12px 16px', fontSize: 13, color: '#334155' }}>
                {new Date(rec.promotedAt).toLocaleDateString()}
              </td>
              <td style={{ padding: '12px 16px', fontSize: 13, color: '#334155' }}>
                {rec.fromClass} {rec.fromSection} <br/><span style={{fontSize: 11, color: '#64748b'}}>{rec.fromSession}</span>
              </td>
              <td style={{ padding: '12px 16px', fontSize: 13, color: '#334155' }}>
                <span style={{color: '#22c55e', fontWeight: 600}}>{rec.toClass} {rec.toSection}</span> <br/><span style={{fontSize: 11, color: '#64748b'}}>{rec.toSession}</span>
              </td>
              <td style={{ padding: '12px 16px', fontSize: 13, color: '#334155' }}>
                {rec.remarks || '-'}
              </td>
              <td style={{ padding: '12px 16px', fontSize: 13 }}>
                <button onClick={() => handleDeleteHistory(rec._id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: 14 }}>
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
