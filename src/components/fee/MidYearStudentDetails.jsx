import React, { useState, useEffect } from 'react';
import { Eye, Download } from 'lucide-react';
import * as XLSX from 'xlsx';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5005';

const inputStyle = { width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' };
const labelStyle = { display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' };

export default function MidYearStudentDetails() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [admissionAfter, setAdmissionAfter] = useState('2026-04-15');
  
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  useEffect(() => {
    fetch(`${API_URL}/api/school-classes`, { headers: getHeaders() })
      .then(res => res.json())
      .then(data => setClasses(Array.isArray(data) ? data : (data?.data || [])))
      .catch(console.error);

    handleShow();
  }, []);

  const handleShow = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/students`, { headers: getHeaders() });
      const data = await res.json();
      
      if (res.ok) {
        const students = Array.isArray(data) ? data : (data.students || []);
        
        const filterCutoff = admissionAfter ? new Date(admissionAfter) : new Date('2026-04-15');
        
        let filtered = students.filter(s => {
          const admDate = new Date(s.academicDetails?.dateOfAdmission || s.dateOfAdmission || s.createdAt);
          return admDate >= filterCutoff || s.isMidYearAdmission === true;
        });

        if (selectedClass) {
          const selectedClassName = (classes.find(c => c._id === selectedClass)?.className || selectedClass).toLowerCase();
          filtered = filtered.filter(s => {
            const sc = (s.academicDetails?.class || s.class?.className || s.class?.name || s.class || '').toLowerCase();
            return sc.includes(selectedClassName);
          });
        }

        const formatted = filtered.map((s, idx) => {
          const admNo = s.academicDetails?.admissionNumber || s.admissionNumber || '-';
          const p = s.personalDetails || {};
          const fullName = `${p.firstName || s.firstName || ''} ${p.lastName || s.lastName || ''}`.trim() || 'Student';
          const cls = `${s.academicDetails?.class || s.class?.className || s.class?.name || s.class || ''}${s.academicDetails?.section ? '-' + s.academicDetails.section : ''}`.trim() || '-';
          const fam = s.familyDetails || {};
          const f = fam.father || {};
          const fatherName = f.firstName ? `${f.title || 'Mr.'} ${f.firstName} ${f.lastName || ''}`.trim() : (s.fatherName || '-');
          const mobile = f.mobile || s.fatherMobile || s.contactAddress?.contactNumber || p.mobile || '-';
          const dt = new Date(s.academicDetails?.dateOfAdmission || s.dateOfAdmission || s.createdAt);

          return {
            _id: s._id || `mid-${idx}`,
            admissionNumber: admNo,
            fullName,
            className: cls,
            fatherName,
            admissionDate: dt.toLocaleDateString('en-GB'),
            rawDate: dt,
            mobile
          };
        });

        setReportData(formatted);
      } else {
        setError(data.message || 'Failed to fetch student records');
      }
    } catch {
      setError('Server connection error');
    } finally {
      setLoading(false);
    }
  };

  const exportToExcel = () => {
    if (reportData.length === 0) return;
    const rows = reportData.map((s, i) => ({
      '#': i + 1,
      'Admission No': s.admissionNumber,
      'Student Name': s.fullName,
      'Class': s.className,
      'Father Name': s.fatherName,
      'Date of Admission': s.admissionDate,
      'Mobile No': s.mobile
    }));

    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Mid Year Admissions');
    XLSX.writeFile(wb, `Mid_Year_Students_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  return (
    <div style={{ display: 'flex', height: '100%', background: '#f3f4f6' }}>
      {/* Side Panel */}
      <div style={{ width: '250px', background: '#fff', borderRight: '1px solid #e5e7eb', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', flexShrink: 0, overflowY: 'auto' }}>
        <div>
          <label style={labelStyle}>Class Filter</label>
          <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} style={inputStyle}>
            <option value="">All Classes ({classes.length})</option>
            {classes.map(c => {
              const name = c.className || c.name || c._id;
              return <option key={c._id || name} value={name}>{name}</option>;
            })}
          </select>
        </div>

        <div>
          <label style={labelStyle}>Admitted On / After Date</label>
          <input type="date" value={admissionAfter} onChange={e => setAdmissionAfter(e.target.value)} style={inputStyle} />
          <div style={{ fontSize: '10px', color: '#6b7280', marginTop: '4px' }}>Mid-session joining cutoff date.</div>
        </div>

        <button
          onClick={handleShow}
          disabled={loading}
          style={{
            background: '#29a9d8',
            color: '#fff',
            border: 'none',
            padding: '8px 10px',
            borderRadius: '4px',
            fontSize: '12px',
            cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            fontWeight: 'bold',
            marginTop: '8px'
          }}
        >
          <Eye size={14} /> {loading ? 'Loading...' : 'Show Students'}
        </button>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <div style={{ background: '#fff', width: '100%', minHeight: '100%', borderRadius: '8px', border: '1px solid #e5e7eb', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: '16px', marginBottom: '20px' }}>
            <div>
              <h2 style={{ margin: '0 0 4px 0', fontSize: '18px', color: '#1f2937' }}>Mid Year Student Details</h2>
              <span style={{ fontSize: '12px', color: '#6b7280' }}>Total Mid-Year Joiners: <strong>{reportData.length}</strong></span>
            </div>
            {reportData.length > 0 && (
              <button
                onClick={exportToExcel}
                style={{
                  background: '#10b981',
                  color: '#fff',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontWeight: 'bold'
                }}
              >
                <Download size={14} /> Export Excel
              </button>
            )}
          </div>

          {error && <div style={{ padding: '12px', background: '#fee2e2', color: '#991b1b', borderRadius: '4px', marginBottom: '20px', fontSize: '13px' }}>{error}</div>}

          {reportData.length === 0 && !loading && !error ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280', fontSize: '14px' }}>
              No mid-year joiners found after the selected date.
            </div>
          ) : (
            <div style={{ overflowX: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', whiteSpace: 'nowrap' }}>
                <thead style={{ background: '#f9fafb' }}>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Admission No</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Student Name</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Class</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Father Name</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Date of Admission</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Mobile No</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((s, i) => (
                    <tr key={s._id || i} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '12px 16px', color: '#4b5563', fontWeight: '500' }}>{s.admissionNumber}</td>
                      <td style={{ padding: '12px 16px', color: '#1f2937', fontWeight: '600' }}>{s.fullName}</td>
                      <td style={{ padding: '12px 16px', color: '#4b5563' }}>{s.className}</td>
                      <td style={{ padding: '12px 16px', color: '#4b5563' }}>{s.fatherName}</td>
                      <td style={{ padding: '12px 16px', color: '#2563eb', fontWeight: '600' }}>
                        {s.admissionDate}
                      </td>
                      <td style={{ padding: '12px 16px', color: '#4b5563' }}>{s.mobile}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
