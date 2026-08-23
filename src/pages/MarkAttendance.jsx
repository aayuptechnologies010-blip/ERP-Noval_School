import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaVideo, FaSave, FaCheckCircle, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';

const CLASSES = [
  'Select Class','All','NUR','NUR A','NUR B','LKG','LKG A','LKG B','UKG','UKG A','UKG B','UKG C',
  '1','1 A','1 B','1 C','2','2 A','2 B','2 C','3 A','3 B','3 C',
  '4 A','4 B','4 C','5 A','5 B','5 C','6 A','6 B','6 C',
  '7 A','7 B','7 C','8 A','8 B','8 C','9 A','9 B','9 C','9 D','9 E','9 F',
  '10 A','10 B','10 C','10 D','11 A','11 B','11 C','11 D','11 E','11 F',
  '12 A','12 B','12 C','12 D'
];

const STATUS_BUTTONS = [
  { label: 'P',    bg: '#22c55e', color: '#fff', title: 'Present'  },
  { label: 'A',    bg: '#ef4444', color: '#fff', title: 'Absent'   },
  { label: 'L',    bg: '#f59e0b', color: '#fff', title: 'Leave'    },
  { label: 'WH',   bg: '#3b82f6', color: '#fff', title: 'Half Day' },
  { label: 'Late', bg: '#8b5cf6', color: '#fff', title: 'Late'     },
  { label: 'NA',   bg: '#64748b', color: '#fff', title: 'NA'       },
];

const API_STATUS_MAP = {
  'P': 'Present',
  'A': 'Absent',
  'L': 'Leave',
  'WH': 'Half Day',
  'Late': 'Late',
  'NA': 'NA'
};

const REVERSE_API_STATUS_MAP = {
  'Present': 'P',
  'Absent': 'A',
  'Leave': 'L',
  'Half Day': 'WH',
  'Late': 'Late',
  'NA': 'NA'
};

function MarkAttendance() {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState('UKG A');
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);
  const [showTable, setShowTable] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [allStudents, setAllStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchingAttendance, setFetchingAttendance] = useState(false);
  const [markedDates, setMarkedDates] = useState([]);

  // States for attendance tracking
  const [attendance, setAttendance] = useState({});
  const [remarks, setRemarks] = useState({});
  const [recordIds, setRecordIds] = useState({});
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/students`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setAllStudents(data);
        } else {
          toast.error("Failed to fetch students");
        }
      } catch (error) {
        console.error("Error fetching students:", error);
        toast.error("Error fetching students");
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const { parsedClass, parsedSection } = useMemo(() => {
    if (!selectedClass || selectedClass === 'Select Class') return { parsedClass: '', parsedSection: '' };
    const parts = selectedClass.split(' ');
    if (parts.length > 1) {
      const section = parts.pop();
      const cls = parts.join(' ');
      return { parsedClass: cls, parsedSection: section };
    }
    return { parsedClass: selectedClass, parsedSection: '' };
  }, [selectedClass]);

  const filteredStudents = useMemo(() => {
    if (!parsedClass || selectedClass === 'Select Class') return [];
    if (selectedClass === 'All') return allStudents;
    return allStudents.filter(s => {
      const a = s.academicDetails || {};
      const sClass = String(a.class || '').trim();
      const sSection = String(a.section || '').trim();

      if (sClass === parsedClass && sSection === parsedSection) return true;
      if (sClass === selectedClass) return true;
      if (!parsedSection && sClass === parsedClass) return true;
      
      return false;
    });
  }, [allStudents, parsedClass, parsedSection, selectedClass]);

useEffect(() => {
    const fetchDates = async () => {
      if (!parsedClass) {
        setMarkedDates([]);
        return;
      }
      try {
        const token = localStorage.getItem('token');
        let url = `${import.meta.env.VITE_API_BASE_URL}/api/attendance/dates?class=${encodeURIComponent(parsedClass)}`;
        if (parsedSection) url += `&section=${encodeURIComponent(parsedSection)}`;
        const res = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
        if (res.ok) {
          const data = await res.json();
          setMarkedDates(data.dates || []);
        } else {
          setMarkedDates([]);
        }
      } catch (e) {
        setMarkedDates([]);
      }
    };
    fetchDates();
  }, [parsedClass, parsedSection]);

  const loadAttendance = async () => {
    if (!parsedClass || !date || filteredStudents.length === 0) return;
    
    if (selectedClass === 'All') {
      const initAtt = {};
      const initRem = {};
      const initRec = {};
      filteredStudents.forEach(s => { 
        initAtt[s._id] = 'P'; 
        initRem[s._id] = '';
      });
      setAttendance(initAtt);
      setRemarks(initRem);
      setRecordIds(initRec);
      setShowTable(true);
      return;
    }

    setFetchingAttendance(true);
    try {
      const token = localStorage.getItem('token');
      const qs = new URLSearchParams({ date, class: parsedClass });
      if (parsedSection) {
        qs.append('section', parsedSection);
      }

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/attendance?${qs.toString()}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        const initAtt = {};
        const initRem = {};
        const initRec = {};
        
        filteredStudents.forEach(s => { 
          initAtt[s._id] = 'P'; 
          initRem[s._id] = '';
        });

        if (data && data.records && Array.isArray(data.records)) {
          data.records.forEach(r => {
            const stObj = r.studentId || r.student;
            const stId = typeof stObj === 'object' && stObj !== null ? stObj._id : stObj;
            if (stId && initAtt[stId]) {
              initAtt[stId] = REVERSE_API_STATUS_MAP[r.status] || 'P';
              initRem[stId] = r.remarks || '';
              initRec[stId] = r._id;
            }
          });
        }
        
        setAttendance(initAtt);
        setRemarks(initRem);
        setRecordIds(initRec);
        setShowTable(true);
      } else {
        console.error("Fetch returned non-ok status:", response.status);
        toast.error("Failed to load existing attendance");
      }
    } catch (error) {
      console.error("Error fetching attendance:", error);
      toast.error("Error fetching existing attendance");
    } finally {
      setFetchingAttendance(false);
    }
  };

  useEffect(() => {
    if (showTable && filteredStudents.length > 0) {
      loadAttendance();
    } else {
      setAttendance({});
      setRemarks({});
      setRecordIds({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredStudents, date]);

  const handleShowClick = () => {
    setShowTable(true);
    loadAttendance();
  };

  const handleMark = (studentId, status) => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const handleRemarkChange = (studentId, text) => {
    setRemarks(prev => ({ ...prev, [studentId]: text }));
  };

  const handleMarkAll = (status) => {
    const all = {};
    filteredStudents.forEach(s => { all[s._id] = status; });
    setAttendance(all);
  };

  const handleUpdateSingle = async (studentId) => {
    const recordId = recordIds[studentId];
    if (!recordId) {
      toast.info("This record hasn't been saved to the database yet. Please use the main 'Save' button first to bulk-save new records.");
      return;
    }

    setUpdatingId(studentId);
    try {
      const payload = {
        status: API_STATUS_MAP[attendance[studentId]] || 'Present',
        remarks: remarks[studentId] || ''
      };

      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/attendance/${recordId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      
      if (response.ok) {
        toast.success(result.message || "Attendance updated successfully!");
      } else {
        toast.error(result.message || "Failed to update attendance.");
      }
    } catch (error) {
      console.error("Error updating single attendance:", error);
      toast.error("An error occurred while updating the record.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleSave = async () => {
    if (!parsedClass || !date || filteredStudents.length === 0) {
      toast.error("Missing required data to save attendance");
      return;
    }

    if (selectedClass === 'All') {
      toast.error("Cannot mark attendance for 'All' classes. Please select a specific class.");
      return;
    }

    setSaving(true);
    try {
      const records = filteredStudents.map(s => ({
        studentId: s._id,
        status: API_STATUS_MAP[attendance[s._id]] || 'Present',
        remarks: remarks[s._id] || ''
      }));

      const payload = {
        date,
        class: parsedClass,
        records
      };
      if (parsedSection) {
        payload.section = parsedSection;
      }

      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/attendance/mark`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      
      if (response.ok) {
        toast.success(result.message || "Attendance bulk marked successfully!");
        // Reload to get the new record IDs
        loadAttendance();
      } else {
        toast.error(result.message || "Failed to mark attendance.");
      }
    } catch (error) {
      console.error("Error saving attendance:", error);
      toast.error("An error occurred while saving attendance.");
    } finally {
      setSaving(false);
    }
  };

  const counts = filteredStudents.reduce((acc, s) => {
    const st = attendance[s._id] || 'P';
    acc[st] = (acc[st] || 0) + 1;
    return acc;
  }, {});

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* Header */}
      <div style={{ padding: '24px 32px 12px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Mark Attendance</h1>
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
            <label style={{ fontSize: 12, color: '#475569', fontWeight: 600 }}>Class</label>
            <select
              value={selectedClass}
              onChange={e => setSelectedClass(e.target.value)}
              style={{ border: '1px solid #e2e8f0', borderRadius: 6, padding: '9px 12px', fontSize: 14, color: '#334155', outline: 'none', background: '#fff' }}
            >
              {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 150 }}>
            <label style={{ fontSize: 12, color: '#475569', fontWeight: 600 }}>Date</label>
            <input 
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ border: '1px solid #e2e8f0', borderRadius: 6, padding: '8px 12px', fontSize: 14, color: '#334155', outline: 'none' }}
            />
          </div>

          <div style={{ display: 'flex', gap: 12, marginLeft: 'auto' }}>
            <button 
              onClick={handleShowClick}
              disabled={fetchingAttendance}
              style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: fetchingAttendance ? 'not-allowed' : 'pointer' }}
            >
              {fetchingAttendance ? 'Loading...' : 'Show'}
            </button>
            <button 
              onClick={() => {
                setShowTable(false);
                setAttendance({});
              }}
              style={{ background: '#f1f5f9', color: '#64748b', border: '1px solid #cbd5e1', padding: '10px 24px', borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: '0 32px 32px 32px', overflowY: 'auto' }}>
        {loading ? (
          <div style={{ background: '#fff', padding: 40, borderRadius: 10, textAlign: 'center', color: '#64748b' }}>
            Loading students...
          </div>
        ) : fetchingAttendance ? (
          <div style={{ background: '#fff', padding: 40, borderRadius: 10, textAlign: 'center', color: '#64748b' }}>
            Loading attendance records...
          </div>
        ) : showTable && parsedClass ? (
          filteredStudents.length > 0 ? (
            <div style={{ background: '#fff', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', height: '100%' }}>
              
              {/* Top Summary & Actions */}
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                
                {/* Stats */}
                <div style={{ display: 'flex', gap: 20 }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: 11, color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Total</span>
                    <span style={{ fontSize: 18, fontWeight: 700, color: '#1e293b' }}>{filteredStudents.length}</span>
                  </div>
                  {STATUS_BUTTONS.map(btn => (
                    <div key={btn.label} style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: 11, color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>{btn.title}</span>
                      <span style={{ fontSize: 18, fontWeight: 700, color: btn.bg }}>{counts[btn.label] || 0}</span>
                    </div>
                  ))}
                </div>

                {/* Mark All Buttons */}
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#64748b', marginRight: 8 }}>Mark All:</span>
                  {STATUS_BUTTONS.map(btn => (
                    <button
                      key={btn.label}
                      onClick={() => handleMarkAll(btn.label)}
                      style={{ 
                        background: btn.bg, color: btn.color, border: 'none', 
                        width: 32, height: 32, borderRadius: '50%', 
                        fontSize: 12, fontWeight: 700, cursor: 'pointer',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }}
                      title={`Mark All ${btn.title}`}
                    >
                      {btn.label}
                    </button>
                  ))}
                  
                  <div style={{ width: 1, height: 24, background: '#cbd5e1', margin: '0 8px' }}></div>
                  
                  <button 
                    onClick={handleSave}
                    disabled={saving}
                    style={{ 
                      display: 'flex', alignItems: 'center', gap: 8, 
                      background: saving ? '#94a3b8' : '#10b981', color: '#fff', border: 'none', 
                      padding: '8px 20px', borderRadius: 6, fontSize: 14, fontWeight: 600, 
                      cursor: saving ? 'not-allowed' : 'pointer', boxShadow: '0 2px 4px rgba(16,185,129,0.3)'
                    }}
                  >
                    {saving ? 'Saving...' : <><FaSave /> Save All</>}
                  </button>
                </div>
              </div>

              {/* Table */}
              <div style={{ overflow: 'auto', flex: 1 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 800 }}>
                  <thead style={{ position: 'sticky', top: 0, background: '#f8fafc', zIndex: 1 }}>
                    <tr>
                      {['Sr No', 'Adm No', 'Student Name', 'Roll No', 'Attendance', 'Remarks', 'Action'].map(th => (
                        <th key={th} style={{ textAlign: 'left', padding: '14px 24px', fontSize: 13, color: '#475569', fontWeight: 700, borderBottom: '1px solid #e2e8f0' }}>{th}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((s, index) => {
                      const p = s.personalDetails || {};
                      const a = s.academicDetails || {};
                      const fullName = `${p.firstName || ''} ${p.middleName || ''} ${p.lastName || ''}`.trim().replace(new RegExp('\\s+', 'g'), ' ');
                      const isUpdating = updatingId === s._id;
                      const hasRecord = !!recordIds[s._id];
                      
                      return (
                      <tr key={s._id} style={{ borderBottom: '1px solid #f1f5f9', background: '#fff' }}>
                        <td style={{ padding: '14px 24px', fontSize: 14, color: '#64748b', fontWeight: 500 }}>{index + 1}</td>
                        <td style={{ padding: '14px 24px', fontSize: 14, color: '#3b82f6', fontWeight: 600 }}>{a.admissionNumber || 'N/A'}</td>
                        <td style={{ padding: '14px 24px', fontSize: 14, color: '#1e293b', fontWeight: 600 }}>{fullName || 'N/A'}</td>
                        <td style={{ padding: '14px 24px', fontSize: 14, color: '#64748b', fontWeight: 500 }}>{a.rollNumber || 'N/A'}</td>
                        <td style={{ padding: '14px 24px' }}>
                          <div style={{ display: 'flex', gap: 6 }}>
                            {STATUS_BUTTONS.map(btn => {
                              const isSelected = attendance[s._id] === btn.label;
                              return (
                                <button
                                  key={btn.label}
                                  onClick={() => handleMark(s._id, btn.label)}
                                  style={{
                                    width: 32, height: 32, borderRadius: '50%', border: 'none',
                                    fontSize: 12, fontWeight: 700, cursor: 'pointer',
                                    background: isSelected ? btn.bg : '#f1f5f9',
                                    color: isSelected ? btn.color : '#64748b',
                                    boxShadow: isSelected ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
                                    transition: 'all 0.2s'
                                  }}
                                  title={btn.title}
                                >
                                  {btn.label}
                                </button>
                              );
                            })}
                          </div>
                        </td>
                        <td style={{ padding: '14px 24px' }}>
                          <input 
                            type="text" 
                            placeholder="Add remarks..." 
                            value={remarks[s._id] || ''}
                            onChange={(e) => handleRemarkChange(s._id, e.target.value)}
                            style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: 6, width: '100%', outline: 'none', fontSize: 13, color: '#334155' }}
                          />
                        </td>
                        <td style={{ padding: '14px 24px' }}>
                          <button
                            onClick={() => handleUpdateSingle(s._id)}
                            disabled={isUpdating || !hasRecord}
                            style={{
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              width: 34, height: 34, borderRadius: 6, border: 'none',
                              background: hasRecord ? '#3b82f6' : '#cbd5e1', color: '#fff',
                              cursor: (isUpdating || !hasRecord) ? 'not-allowed' : 'pointer',
                              opacity: isUpdating ? 0.7 : 1, transition: 'all 0.2s'
                            }}
                            title={hasRecord ? "Update this record" : "Save All first to create record"}
                          >
                            <FaSave />
                          </button>
                        </td>
                      </tr>
                    )})}
                  </tbody>
                </table>
              </div>

            </div>
          ) : (
             <div style={{ background: '#fff', padding: 40, borderRadius: 10, textAlign: 'center', color: '#64748b' }}>
              No students found for this class and section.
            </div>
          )
        ) : (
          <div style={{ background: '#fff', padding: 40, borderRadius: 10, textAlign: 'center', color: '#64748b' }}>
            Select a class and click "Show" to load students.
          </div>
        )}
      </div>

    </div>
  );
}

export default MarkAttendance;
