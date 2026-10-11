import React, { useState, useEffect } from 'react';
import { Eye, Download } from 'lucide-react';
import * as XLSX from 'xlsx';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5005';

const inputStyle = { width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' };
const labelStyle = { display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' };

export default function GroupWiseStudentDetails() {
  const [classes, setClasses] = useState([]);
  const [feeGroups, setFeeGroups] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [displayType, setDisplayType] = useState('consolidated'); // consolidated | separated
  
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

    fetch(`${API_URL}/api/fee-groups`, { headers: getHeaders() })
      .then(res => res.json())
      .then(data => setFeeGroups(Array.isArray(data) ? data : []))
      .catch(console.error);

    handleShow();
  }, []);

  const handleShow = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = `${API_URL}/api/fee-reports/defaulters?status=all`;
      const res = await fetch(url, { headers: getHeaders() });
      const data = await res.json();
      
      if (res.ok) {
        let list = Array.isArray(data) ? data : [];
        if (selectedClass) {
          const selectedClassName = (classes.find(c => c._id === selectedClass)?.className || selectedClass).toLowerCase();
          list = list.filter(s => (s.class || '').toLowerCase().includes(selectedClassName));
        }
        setReportData(list);
      } else {
        setError(data.message || 'Failed to fetch group wise student records');
      }
    } catch {
      setError('Server connection error');
    } finally {
      setLoading(false);
    }
  };

  const consolidated = reportData.reduce((acc, s) => {
    const cls = s.class || 'Unknown';
    if (!acc[cls]) acc[cls] = { students: 0, totalPayable: 0, totalPaid: 0, totalDue: 0 };
    acc[cls].students += 1;
    acc[cls].totalPayable += (s.totalPayable || s.totalDues || 0);
    acc[cls].totalPaid += (s.totalPaid || 0);
    acc[cls].totalDue += (s.totalDues || s.totalDue || 0);
    return acc;
  }, {});

  const exportToExcel = () => {
    if (reportData.length === 0) return;
    let rows = [];

    if (displayType === 'consolidated') {
      rows = Object.entries(consolidated).map(([cls, d], i) => ({
        '#': i + 1,
        'Class': cls,
        'Total Students': d.students,
        'Total Payable (Rs.)': d.totalPayable,
        'Total Paid (Rs.)': d.totalPaid,
        'Total Due (Rs.)': d.totalDue
      }));
    } else {
      rows = reportData.map((s, i) => ({
        '#': i + 1,
        'Admission No': s.admissionNo || '-',
        'Student Name': s.studentName || '-',
        'Class': s.class || '-',
        'Fee Group': selectedGroup || 'Regular Tuition Group',
        'Payable (Rs.)': s.totalPayable || s.totalDues || 0,
        'Paid (Rs.)': s.totalPaid || 0,
        'Due (Rs.)': s.totalDues || s.totalDue || 0
      }));
    }

    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Group Wise Students');
    XLSX.writeFile(wb, `Group_Wise_Student_Details_${new Date().toISOString().slice(0, 10)}.xlsx`);
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
          <label style={labelStyle}>Fee Group</label>
          <select value={selectedGroup} onChange={e => setSelectedGroup(e.target.value)} style={inputStyle}>
            <option value="">All Fee Groups ({feeGroups.length || 3})</option>
            {feeGroups.map(g => <option key={g._id} value={g.name}>{g.name}</option>)}
          </select>
        </div>

        <div>
          <label style={labelStyle}>Display Type</label>
          <div style={{ display: 'flex', gap: '15px', fontSize: '12px', color: '#374151' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <input type="radio" name="displayType" value="consolidated" checked={displayType === 'consolidated'} onChange={() => setDisplayType('consolidated')} />
              Consolidated
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <input type="radio" name="displayType" value="separated" checked={displayType === 'separated'} onChange={() => setDisplayType('separated')} />
              Separated
            </label>
          </div>
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
          <Eye size={14} /> {loading ? 'Loading...' : 'Show Details'}
        </button>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <div style={{ background: '#fff', width: '100%', minHeight: '100%', borderRadius: '8px', border: '1px solid #e5e7eb', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: '16px', marginBottom: '20px' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '18px', color: '#1f2937' }}>Group Wise Student Details</h2>
              <span style={{ fontSize: '12px', color: '#6b7280' }}>
                Total Students: <strong>{reportData.length}</strong> | View: <strong>{displayType.toUpperCase()}</strong>
              </span>
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
              No student records found.
            </div>
          ) : displayType === 'consolidated' ? (
            <div style={{ overflowX: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', whiteSpace: 'nowrap' }}>
                <thead style={{ background: '#f9fafb' }}>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Class</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', color: '#374151' }}>Students</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right', color: '#374151' }}>Total Payable (₹)</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right', color: '#059669' }}>Total Paid (₹)</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right', color: '#b91c1c' }}>Total Due (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(consolidated).map(([cls, d], i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '12px 16px', color: '#1f2937', fontWeight: 'bold' }}>{cls}</td>
                      <td style={{ padding: '12px 16px', color: '#4b5563', textAlign: 'center' }}>{d.students}</td>
                      <td style={{ padding: '12px 16px', color: '#374151', textAlign: 'right' }}>₹{d.totalPayable.toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px 16px', color: '#059669', textAlign: 'right', fontWeight: '600' }}>₹{d.totalPaid.toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px 16px', color: '#b91c1c', textAlign: 'right', fontWeight: 'bold' }}>₹{d.totalDue.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ overflowX: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', whiteSpace: 'nowrap' }}>
                <thead style={{ background: '#f9fafb' }}>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Adm No</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Student Name</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Class</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right', color: '#374151' }}>Payable (₹)</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right', color: '#059669' }}>Paid (₹)</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right', color: '#b91c1c' }}>Due (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((s, i) => (
                    <tr key={s.admissionNo || i} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '12px 16px', color: '#4b5563' }}>{s.admissionNo}</td>
                      <td style={{ padding: '12px 16px', color: '#1f2937', fontWeight: '600' }}>{s.studentName}</td>
                      <td style={{ padding: '12px 16px', color: '#4b5563' }}>{s.class}</td>
                      <td style={{ padding: '12px 16px', color: '#374151', textAlign: 'right' }}>₹{(s.totalPayable || s.totalDues || 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px 16px', color: '#059669', textAlign: 'right' }}>₹{(s.totalPaid || 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px 16px', color: '#b91c1c', textAlign: 'right', fontWeight: 'bold' }}>₹{(s.totalDues || s.totalDue || 0).toLocaleString('en-IN')}</td>
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
