import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';


function ClassAttendance() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [selectedClass, setSelectedClass] = useState('Select Class');
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  
  const [availableClasses, setAvailableClasses] = useState([]);
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/promotions/classes`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          const classList = ['Select Class'];
          if (data.classes) {
            data.classes.forEach(c => {
              if (c.section) {
                classList.push(`${c.class} ${c.section}`);
              } else {
                classList.push(c.class);
              }
            });
          }
          setAvailableClasses(classList);
        }
      } catch (e) {
        console.error("Error fetching classes", e);
      }
    };
    fetchClasses();
  }, []);

  useEffect(() => {
    const qClass = searchParams.get('class');
    const qSection = searchParams.get('section');
    if (qClass && qSection) {
      setSelectedClass(`${qClass} ${qSection}`);
    }
  }, [searchParams]);

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

  const fetchReport = async () => {
    if (!parsedClass) {
      toast.error('Please select a valid class');
      return;
    }

    setLoading(true);
    setReportData(null);
    try {
      const token = localStorage.getItem('token');
      let url = `${import.meta.env.VITE_API_BASE_URL}/api/attendance/report/monthly?class=${encodeURIComponent(parsedClass)}&month=${month}&year=${year}`;
      if (parsedSection) {
        url += `&section=${encodeURIComponent(parsedSection)}`;
      }
      const res = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setReportData(data);
      } else {
        toast.error('Failed to fetch report');
      }
    } catch (e) {
      console.error(e);
      toast.error('Error fetching report');
    } finally {
      setLoading(false);
    }
  };

  // Auto fetch on load if we have class and section in URL
  useEffect(() => {
    if (parsedClass) {
      fetchReport();
    }
    // eslint-disable-next-line
  }, [parsedClass, parsedSection]); // Only on initial parsed load from URL

  const getStatusDisplay = (status) => {
    if (!status) return '-';
    if (status === 'Present') return <span style={{ color: '#22c55e', fontWeight: 700 }}>P</span>;
    if (status === 'Absent') return <span style={{ color: '#ef4444', fontWeight: 700 }}>A</span>;
    if (status === 'Leave') return <span style={{ color: '#f59e0b', fontWeight: 700 }}>L</span>;
    if (status === 'Half Day') return <span style={{ color: '#3b82f6', fontWeight: 700 }}>WH</span>;
    if (status === 'Late') return <span style={{ color: '#8b5cf6', fontWeight: 700 }}>Late</span>;
    return <span style={{ color: '#64748b', fontWeight: 700 }}>NA</span>;
  };

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Header Bar */}
      <div style={{ padding: '24px 32px 16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Monthly Attendance Report (Matrix)</h1>
        <button 
          onClick={() => navigate(-1)}
          style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#475569', fontSize: 14, fontWeight: 600, cursor: 'pointer', background: 'none', border: 'none' }}
        >
          <FaArrowLeft style={{ fontSize: 12 }} /> Go Back
        </button>
      </div>

      {/* Main Content Card */}
      <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'hidden' }}>
        <div style={{ background: '#fff', borderRadius: 12, height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          
          {/* Filters */}
          <div style={{ padding: '24px', display: 'flex', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 200 }}>
              <label style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>Class</label>
              <select 
                value={selectedClass}
                onChange={e => {
                  setSelectedClass(e.target.value);
                  const parts = e.target.value.split(' ');
                  if (parts.length > 1) {
                    setSearchParams({ class: parts[0], section: parts[1] });
                  } else {
                    setSearchParams({});
                  }
                }}
                style={{ border: '1px solid #e2e8f0', borderRadius: 4, padding: '10px 12px', fontSize: 14, color: '#334155', outline: 'none', background: '#fff' }}
              >
                {availableClasses.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 150 }}>
              <label style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>Month</label>
              <select 
                value={month} 
                onChange={e => setMonth(Number(e.target.value))}
                style={{ border: '1px solid #e2e8f0', borderRadius: 4, padding: '10px 12px', fontSize: 14, color: '#334155', outline: 'none', background: '#fff' }}
              >
                {Array.from({ length: 12 }).map((_, i) => (
                  <option key={i+1} value={i+1}>{new Date(0, i).toLocaleString('en', { month: 'long' })}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 150 }}>
              <label style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>Year</label>
              <select 
                value={year} 
                onChange={e => setYear(Number(e.target.value))}
                style={{ border: '1px solid #e2e8f0', borderRadius: 4, padding: '10px 12px', fontSize: 14, color: '#334155', outline: 'none', background: '#fff' }}
              >
                {Array.from({ length: 5 }).map((_, i) => {
                  const y = new Date().getFullYear() - 2 + i;
                  return <option key={y} value={y}>{y}</option>;
                })}
              </select>
            </div>

            <button 
              onClick={fetchReport}
              disabled={loading}
              style={{ background: '#65c466', color: '#fff', border: 'none', borderRadius: 4, padding: '10px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginBottom: 2, opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Fetching...' : 'GO'}
            </button>
          </div>

          <div style={{ flex: 1, overflow: 'auto', padding: '0 24px 24px 24px' }}>
            {reportData && reportData.students ? (
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 800 }}>
                <thead>
                  <tr>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap', borderBottom: '2px solid #e2e8f0', position: 'sticky', top: 0, background: '#fff', zIndex: 2 }}>Sl. No.</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap', borderBottom: '2px solid #e2e8f0', position: 'sticky', top: 0, background: '#fff', zIndex: 2 }}>Admission No.</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap', borderBottom: '2px solid #e2e8f0', position: 'sticky', top: 0, background: '#fff', zIndex: 2 }}>Name</th>
                    {reportData.workingDates.map((dateStr, idx) => {
                       const d = new Date(dateStr);
                       return (
                         <th key={idx} style={{ padding: '12px 8px', textAlign: 'center', fontSize: 12, fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', position: 'sticky', top: 0, background: '#fff', zIndex: 1 }}>
                           {d.getDate()}
                         </th>
                       )
                    })}
                    <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: 12, fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap', borderBottom: '2px solid #e2e8f0', position: 'sticky', top: 0, background: '#fff', zIndex: 2 }}>Present</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: 12, fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap', borderBottom: '2px solid #e2e8f0', position: 'sticky', top: 0, background: '#fff', zIndex: 2 }}>Absent</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: 12, fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap', borderBottom: '2px solid #e2e8f0', position: 'sticky', top: 0, background: '#fff', zIndex: 2 }}>%</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.students.map((student, idx) => (
                    <tr key={student.studentId} style={{ borderBottom: '1px solid #f1f5f9', background: idx % 2 === 0 ? '#fff' : '#f8fafc' }}>
                      <td style={{ padding: '12px 16px', fontSize: 13, color: '#475569' }}>{idx + 1}</td>
                      <td style={{ padding: '12px 16px', fontSize: 13, color: '#475569' }}>{student.admissionNumber}</td>
                      <td style={{ padding: '12px 16px', fontSize: 13, color: '#334155', fontWeight: 600 }}>{student.name}</td>
                      {reportData.workingDates.map((dateStr, idx2) => {
                         const record = student.attendance[dateStr];
                         return (
                           <td key={idx2} style={{ padding: '12px 8px', textAlign: 'center', fontSize: 12 }}>
                             {getStatusDisplay(record?.status)}
                           </td>
                         )
                      })}
                      <td style={{ padding: '12px 16px', textAlign: 'center', fontSize: 13, color: '#22c55e', fontWeight: 700 }}>{student.summary?.Present || 0}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', fontSize: 13, color: '#ef4444', fontWeight: 700 }}>{student.summary?.Absent || 0}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', fontSize: 13, color: '#3b82f6', fontWeight: 700 }}>{student.attendancePercentage}</td>
                    </tr>
                  ))}
                  {reportData.students.length === 0 && (
                    <tr>
                      <td colSpan={reportData.workingDates.length + 6} style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>No students found for this class.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            ) : !loading ? (
              <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <div style={{ position: 'relative', width: 250, height: 180 }}>
                  <div style={{ width: '100%', height: 120, border: '2px solid #8b5cf6', borderRadius: 8, background: '#fff', position: 'absolute', bottom: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#1e1b4b', textAlign: 'center', lineHeight: 1.2 }}>
                      NO<br/>RECORD FOUND
                    </span>
                  </div>
                  <div style={{ width: '80%', height: 10, background: '#8b5cf6', borderRadius: 4, position: 'absolute', bottom: 0, left: '10%' }}></div>
                  <div style={{ width: 60, height: 60, border: '4px solid #f43f5e', borderRadius: '50%', position: 'absolute', left: -20, top: 40, display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#fff' }}>
                     <div style={{ width: 20, height: 20, background: '#f43f5e', transform: 'rotate(45deg) translate(20px, 20px)' }}></div>
                  </div>
                  <div style={{ width: 50, height: 50, border: '2px solid #8b5cf6', borderRadius: '50%', position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', background: '#e0e7ff' }}></div>
                  <div style={{ position: 'absolute', right: -10, top: 50, width: 0, height: 0, borderLeft: '20px solid transparent', borderRight: '20px solid transparent', borderBottom: '35px solid #e2e8f0', display: 'flex', justifyContent: 'center' }}>
                    <span style={{ position: 'absolute', top: 10, color: '#f43f5e', fontSize: 16, fontWeight: 'bold' }}>!</span>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          
        </div>

        <div style={{ textAlign: 'center', marginTop: 40, paddingBottom: 20, fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>
          COPYRIGHT © 2026 FRANCISCAN
        </div>
      </div>
    </div>
  );
}

export default ClassAttendance;
