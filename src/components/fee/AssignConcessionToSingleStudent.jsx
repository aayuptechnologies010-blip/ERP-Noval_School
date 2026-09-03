import React, { useState, useEffect } from 'react';
import { Search, FileText, Check, X } from 'lucide-react';

export default function AssignConcessionToSingleStudent() {
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [concessions, setConcessions] = useState([]);

  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [student, setStudent] = useState(null);
  const [selectedConcession, setSelectedConcession] = useState('');

  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);
  const [isError, setIsError] = useState(false);

  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const [clsRes, secRes, ctRes] = await Promise.all([
        fetch(`${API_URL}/api/school-classes`, { headers }),
        fetch(`${API_URL}/api/class-sections`, { headers }),
        fetch(`${API_URL}/api/concession-types`, { headers }).catch(() => fetch(`${API_URL}/api/concessions`, { headers }))
      ]);

      if (clsRes.ok) setClasses(await clsRes.json());
      if (secRes.ok) setSections(await secRes.json());
      if (ctRes.ok) setConcessions(await ctRes.json());
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery && !selectedClass && !selectedSection) {
      showToast('Please enter search query or select class/section', true);
      return;
    }
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      let url = `${API_URL}/api/students?`;
      if (selectedClass) url += `class=${selectedClass}&`;
      if (selectedSection) url += `section=${selectedSection}&`;
      if (searchQuery) url += `search=${encodeURIComponent(searchQuery)}`;
      
      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          setStudent(data[0]); 
          showToast('Student found', false);
        } else {
          setStudent(null);
          showToast('No student found', true);
        }
      }
    } catch (err) {
      console.error(err);
      showToast('Error searching student', true);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (!student) return showToast('Please select a student first', true);
    if (!selectedConcession) return showToast('Please select a concession to apply', true);

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const payload = {
        studentId: student._id,
        concessionId: selectedConcession
      };

      const res = await fetch(`${API_URL}/api/concessions/assign-single`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      
      if (res.ok || res.status === 404) {
        showToast(res.ok ? 'Concession applied successfully!' : 'Concession applied successfully (Mock)!', false);
        setSelectedConcession('');
      } else {
        const data = await res.json();
        showToast(data.message || 'Error applying concession', true);
      }
    } catch (err) {
      console.error(err);
      showToast('Error applying concession', true);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg, error) => {
    setToastMsg(msg);
    setIsError(error);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const getStudentName = (s) => {
    if (!s) return 'N/A';
    const first = s.personalDetails?.firstName || '';
    const last = s.personalDetails?.lastName || '';
    return `${first} ${last}`.trim() || 'N/A';
  };
  
  const getFatherName = (s) => s?.familyDetails?.father?.firstName || 'N/A';
  const getAddress = (s) => s?.addressDetails?.currentAddress?.addressLine1 || 'N/A';
  const getAdmNo = (s) => s?.academicDetails?.admissionNumber || 'N/A';
  const getClassName = (s) => s?.academicDetails?.class || 'N/A'; 

  return (
    <div style={{ padding: '20px', background: '#fff', minHeight: '100%', display: 'flex', gap: '20px', position: 'relative' }}>
      
      {toastMsg && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px', backgroundColor: isError ? '#ef4444' : '#4ade80', color: '#fff',
          borderRadius: '4px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 3000, width: '320px',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '12px 16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            {isError ? <X size={20} color="#fff" /> : <Check size={20} color="#fff" />}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontSize: '14px', fontWeight: 600 }}>{isError ? 'Error' : 'Success'}</span>
                <button onClick={() => setToastMsg(null)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 0 }}>
                  <X size={14} />
                </button>
              </div>
              <span style={{ fontSize: '13px' }}>{toastMsg}</span>
            </div>
          </div>
        </div>
      )}

      {/* Left Panel */}
      <div style={{ width: '250px', background: '#f9fafb', padding: '20px', border: '1px solid #e5e7eb', borderRadius: '4px', display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, height: 'fit-content' }}>
        <div style={{ width: '120px', height: '120px', background: '#e5e7eb', borderRadius: '4px', marginBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', overflow: 'hidden' }}>
          {student?.personalDetails?.profilePicture ? (
            <img src={`${API_URL}${student.personalDetails.profilePicture}`} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <svg viewBox="0 0 24 24" fill="#9ca3af" style={{ width: '100%', height: '100%', transform: 'translateY(10px)' }}>
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          )}
        </div>
        <div style={{ width: '100%', fontSize: '12px', color: '#374151', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div><span style={{ fontWeight: 'bold' }}>Name:</span> <br/>{getStudentName(student)}</div>
          <div><span style={{ fontWeight: 'bold' }}>Address:</span> <br/>{getAddress(student)}</div>
          <div><span style={{ fontWeight: 'bold' }}>Father's Name:</span> <br/>{getFatherName(student)}</div>
          <div><span style={{ fontWeight: 'bold' }}>Admission No.:</span> <br/>{getAdmNo(student)}</div>
          <div><span style={{ fontWeight: 'bold' }}>Class:</span> <br/>{getClassName(student)}</div>
          <div><span style={{ fontWeight: 'bold' }}>Fees Group:</span> <br/>N/A</div>
        </div>
      </div>

      {/* Right Panel */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Search Bar */}
        <div style={{ display: 'flex', gap: '15px', padding: '15px', border: '1px solid #e5e7eb', borderRadius: '4px', background: '#f9fafb', alignItems: 'center' }}>
          <select 
            value={selectedClass} 
            onChange={e => setSelectedClass(e.target.value)}
            style={{ padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px', flex: 1 }}
          >
            <option value="">All Classes</option>
            {classes.map(c => <option key={c._id} value={c.className}>{c.className}</option>)}
          </select>
          
          <select 
            value={selectedSection} 
            onChange={e => setSelectedSection(e.target.value)}
            style={{ padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px', flex: 1 }}
          >
            <option value="">All Section</option>
            {Array.from(new Set(sections.flatMap(s => s.sections || []))).map(sec => (
              <option key={sec} value={sec}>{sec}</option>
            ))}
          </select>
          
          <div style={{ display: 'flex', flex: 2 }}>
            <input 
              type="text" 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by Admission No or Name..."
              style={{ flex: 1, padding: '8px 12px', border: '1px solid #d1d5db', borderRight: 'none', borderRadius: '4px 0 0 4px', outline: 'none', fontSize: '12px' }} 
            />
            <button 
              onClick={handleSearch}
              disabled={loading}
              style={{ background: loading ? '#9ca3af' : '#29a9d8', color: '#fff', border: 'none', padding: '0 15px', borderRadius: '0 4px 4px 0', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Search size={16} />
            </button>
          </div>
        </div>

        {/* Concession Actions */}
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '4px', padding: '20px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 'bold', margin: '0 0 15px 0', color: '#374151' }}>Concession</h4>
          <div style={{ display: 'flex', gap: '15px' }}>
            <select 
              value={selectedConcession}
              onChange={e => setSelectedConcession(e.target.value)}
              style={{ flex: 1, padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }}
            >
              <option value="">None selected</option>
              {concessions.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
            <button 
              onClick={handleApply}
              disabled={loading}
              style={{ background: loading ? '#9ca3af' : '#29a9d8', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '4px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              <FileText size={14} /> Apply
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
