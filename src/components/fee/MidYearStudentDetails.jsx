import React, { useState, useEffect } from 'react';
import { Eye, Download } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const token = localStorage.getItem('token');

const inputStyle = { width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' };
const labelStyle = { display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' };

export default function MidYearStudentDetails() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [admissionAfter, setAdmissionAfter] = useState('');
  
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/classes`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => setClasses(data))
      .catch(console.error);
  }, []);

  const handleShow = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/students`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      
      if (res.ok) {
        const students = Array.isArray(data) ? data : (data.students || []);
        let filtered = students;
        
        // Mid-year students: admitted after April 1st of current academic year (common in Indian schools)
        const academicYearStart = admissionAfter
          ? new Date(admissionAfter)
          : new Date(`${new Date().getFullYear()}-04-01`);
        
        filtered = filtered.filter(s => {
          const admDate = new Date(s.dateOfAdmission || s.createdAt);
          return admDate > academicYearStart;
        });

        if (selectedClass) {
          const selectedClassName = classes.find(c => c._id === selectedClass)?.name;
          filtered = filtered.filter(s => (s.class?.name || s.class) === selectedClassName);
        }

        setReportData(filtered);
      } else {
        setError(data.message || 'Failed to fetch students');
      }
    } catch (err) {
      setError('Server connection error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100%', background: '#f3f4f6' }}>
      
      {/* Side Panel */}
      <div style={{ width: '250px', background: '#fff', borderRight: '1px solid #e5e7eb', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px', flexShrink: 0, overflowY: 'auto' }}>
        
        <div>
          <label style={labelStyle}>Class Filter (Optional)</label>
          <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} style={inputStyle}>
            <option value="">All Classes</option>
            {classes.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
        </div>

        <div>
          <label style={labelStyle}>Admission After Date</label>
          <input type="date" value={admissionAfter} onChange={e => setAdmissionAfter(e.target.value)} style={inputStyle} placeholder="Default: April 1st" />
          <div style={{ fontSize: '10px', color: '#6b7280', marginTop: '4px' }}>Students admitted after this date are considered mid-year joiners.</div>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button onClick={handleShow} disabled={loading} style={{ flex: 1, background: '#29a9d8', color: '#fff', border: 'none', padding: '8px 10px', borderRadius: '4px', fontSize: '12px', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontWeight: 'bold' }}>
            <Eye size={14} /> {loading ? 'Loading...' : 'Show'}
          </button>
        </div>

      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <div style={{ background: '#fff', width: '100%', minHeight: '100%', borderRadius: '8px', border: '1px solid #e5e7eb', padding: '20px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: '16px', marginBottom: '20px' }}>
            <div>
              <h2 style={{ margin: '0 0 4px 0', fontSize: '18px', color: '#1f2937' }}>Mid Year Student Details</h2>
              {reportData.length > 0 && <span style={{ fontSize: '12px', color: '#6b7280' }}>Showing {reportData.length} mid-year admissions</span>}
            </div>
            {reportData.length > 0 && (
              <button style={{ background: '#10b981', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' }}>
                <Download size={14} /> Export Excel
              </button>
            )}
          </div>

          {error && <div style={{ padding: '12px', background: '#fee2e2', color: '#991b1b', borderRadius: '4px', marginBottom: '20px', fontSize: '13px' }}>{error}</div>}

          {reportData.length === 0 && !loading && !error ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280', fontSize: '14px' }}>
              Click "Show" to view students admitted mid-year (after April 1st by default).
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
                    <tr key={s._id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '12px 16px', color: '#4b5563' }}>{s.admissionNumber}</td>
                      <td style={{ padding: '12px 16px', color: '#1f2937', fontWeight: '600' }}>{s.firstName} {s.lastName}</td>
                      <td style={{ padding: '12px 16px', color: '#4b5563' }}>{s.class?.name || s.class}</td>
                      <td style={{ padding: '12px 16px', color: '#4b5563' }}>{s.fatherName}</td>
                      <td style={{ padding: '12px 16px', color: '#2563eb', fontWeight: '600' }}>
                        {new Date(s.dateOfAdmission || s.createdAt).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '12px 16px', color: '#4b5563' }}>{s.mobileNumber || s.fatherMobile || 'N/A'}</td>
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
