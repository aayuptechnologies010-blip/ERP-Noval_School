import React, { useState, useEffect } from 'react';
import { Eye, Download } from 'lucide-react';
import * as XLSX from 'xlsx';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5005';
const token = localStorage.getItem('token');
const inputStyle = { width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' };
const labelStyle = { display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' };

export default function AnnualStudentLedger1() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [search, setSearch] = useState('');
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/school-classes`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => setClasses(Array.isArray(d) ? d : []))
      .catch(console.error);
  }, []);

  const handleShow = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = `${API_URL}/api/fee-reports/defaulters?status=all`;
      if (selectedClass) url += `&classId=${selectedClass}`;

      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (res.ok) {
        let results = data || [];
        if (search) {
          const q = search.toLowerCase();
          results = results.filter(r =>
            (r.studentName && r.studentName.toLowerCase().includes(q)) ||
            (r.admissionNo && r.admissionNo.toLowerCase().includes(q))
          );
        }
        setReportData(results);
      } else {
        setError(data.message || 'Failed to fetch student ledger');
      }
    } catch {
      setError('Server connection error');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    if (!reportData.length) return;
    const worksheet = XLSX.utils.json_to_sheet(
      reportData.map((d, i) => ({
        'S.No': i + 1,
        'Admission No': d.admissionNo,
        'Student Name': d.studentName,
        'Class': d.class,
        'Father Name': d.fatherName,
        'Mobile': d.mobileNumber,
        'Annual Fees (₹)': d.totalPayable,
        'Amount Paid (₹)': d.totalPaid,
        'Advance Balance (₹)': d.advanceAmount,
        'Balance Due (₹)': d.totalDues,
        'Last Transaction Date': d.lastPaymentDate ? new Date(d.lastPaymentDate).toLocaleDateString() : '-'
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'AnnualLedger');
    XLSX.writeFile(workbook, 'Annual_Student_Ledger.xlsx');
  };

  return (
    <div style={{ display: 'flex', height: '100%', background: '#f3f4f6' }}>
      <div style={{ width: '250px', background: '#fff', borderRight: '1px solid #e5e7eb', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', flexShrink: 0 }}>
        <div>
          <label style={labelStyle}>Class</label>
          <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} style={inputStyle}>
            <option value="">All Classes</option>
            {classes.map(c => <option key={c._id} value={c.className || c.name}>{c.className || c.name}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Search Student</label>
          <input type="text" placeholder="Name or Adm No..." value={search} onChange={e => setSearch(e.target.value)} style={inputStyle} />
        </div>

        <button onClick={handleShow} disabled={loading} style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '10px', borderRadius: '4px', fontSize: '12px', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontWeight: 'bold' }}>
          <Eye size={14} /> {loading ? 'Loading...' : 'Show Ledger'}
        </button>
      </div>

      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <div style={{ background: '#fff', minHeight: '100%', borderRadius: '8px', border: '1px solid #e5e7eb', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: '16px', marginBottom: '20px' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '18px', color: '#1f2937' }}>Annual Student Ledger Report</h2>
              <span style={{ fontSize: '12px', color: '#6b7280' }}>Total Students: <b>{reportData.length}</b></span>
            </div>
            {reportData.length > 0 && (
              <button onClick={handleExport} style={{ background: '#10b981', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' }}>
                <Download size={14} /> Export Excel
              </button>
            )}
          </div>

          {error && <div style={{ padding: '12px', background: '#fee2e2', color: '#991b1b', borderRadius: '4px', marginBottom: '20px', fontSize: '13px' }}>{error}</div>}

          {reportData.length === 0 && !loading && !error ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#6b7280' }}>Select class and click "Show Ledger" to view student annual accounts.</div>
          ) : (
            <div style={{ overflowX: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                <thead style={{ background: '#f8fafc' }}>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <th style={{ padding: '10px 14px', textAlign: 'left', color: '#374151' }}>#</th>
                    <th style={{ padding: '10px 14px', textAlign: 'left', color: '#374151' }}>Adm No</th>
                    <th style={{ padding: '10px 14px', textAlign: 'left', color: '#374151' }}>Student Name</th>
                    <th style={{ padding: '10px 14px', textAlign: 'left', color: '#374151' }}>Class</th>
                    <th style={{ padding: '10px 14px', textAlign: 'right', color: '#374151' }}>Annual Fee (₹)</th>
                    <th style={{ padding: '10px 14px', textAlign: 'right', color: '#374151' }}>Paid (₹)</th>
                    <th style={{ padding: '10px 14px', textAlign: 'right', color: '#374151' }}>Advance (₹)</th>
                    <th style={{ padding: '10px 14px', textAlign: 'right', color: '#374151' }}>Balance Due (₹)</th>
                    <th style={{ padding: '10px 14px', textAlign: 'left', color: '#374151' }}>Last Date</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((d, i) => (
                    <tr key={i} style={{ borderTop: '1px solid #e5e7eb', background: i % 2 === 0 ? '#fff' : '#fcfcfc' }}>
                      <td style={{ padding: '10px 14px', color: '#6b7280' }}>{i + 1}</td>
                      <td style={{ padding: '10px 14px', fontWeight: '600', color: '#1e3a8a' }}>{d.admissionNo}</td>
                      <td style={{ padding: '10px 14px', fontWeight: '500', color: '#111827' }}>{d.studentName}</td>
                      <td style={{ padding: '10px 14px', color: '#4b5563' }}>{d.class}</td>
                      <td style={{ padding: '10px 14px', textAlign: 'right', color: '#1f2937' }}>₹{d.totalPayable?.toLocaleString()}</td>
                      <td style={{ padding: '10px 14px', textAlign: 'right', color: '#059669', fontWeight: '500' }}>₹{d.totalPaid?.toLocaleString()}</td>
                      <td style={{ padding: '10px 14px', textAlign: 'right', color: '#2563eb' }}>₹{d.advanceAmount?.toLocaleString()}</td>
                      <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 'bold', color: d.totalDues > 0 ? '#dc2626' : '#15803d' }}>
                        ₹{d.totalDues?.toLocaleString()}
                      </td>
                      <td style={{ padding: '10px 14px', color: '#6b7280' }}>{d.lastPaymentDate ? new Date(d.lastPaymentDate).toLocaleDateString() : '-'}</td>
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
