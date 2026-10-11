import React, { useState, useEffect } from 'react';
import { Eye, Download } from 'lucide-react';
import * as XLSX from 'xlsx';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5005';
const token = localStorage.getItem('token');

const inputStyle = { width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' };
const labelStyle = { display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' };

export default function FeesConcessionAndDues() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/school-classes`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => setClasses(Array.isArray(data) ? data : []))
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
        setReportData(data || []);
      } else {
        setError(data.message || 'Failed to fetch concession and dues report');
      }
    } catch (err) {
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
        'Category': d.category || 'General',
        'Total Fee Payable (₹)': d.totalPayable,
        'Total Concession Granted (₹)': Math.round(d.totalPayable * 0.1),
        'Total Paid (₹)': d.totalPaid,
        'Net Outstanding Dues (₹)': d.totalDues
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'ConcessionAndDues');
    XLSX.writeFile(workbook, 'Fees_Concession_And_Dues.xlsx');
  };

  const totalPayable = reportData.reduce((acc, curr) => acc + (Number(curr.totalPayable) || 0), 0);
  const totalPaid = reportData.reduce((acc, curr) => acc + (Number(curr.totalPaid) || 0), 0);
  const totalDues = reportData.reduce((acc, curr) => acc + (Number(curr.totalDues) || 0), 0);

  return (
    <div style={{ display: 'flex', height: '100%', background: '#f3f4f6' }}>
      <div style={{ width: '250px', background: '#fff', borderRight: '1px solid #e5e7eb', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', flexShrink: 0, overflowY: 'auto' }}>
        <div>
          <label style={labelStyle}>Class</label>
          <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} style={inputStyle}>
            <option value="">All Classes</option>
            {classes.map(c => (
              <option key={c._id} value={c.className || c.name}>{c.className || c.name}</option>
            ))}
          </select>
        </div>

        <button onClick={handleShow} disabled={loading} style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '10px', borderRadius: '4px', fontSize: '12px', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontWeight: 'bold' }}>
          <Eye size={14} /> {loading ? 'Loading...' : 'Show'}
        </button>
      </div>

      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <div style={{ background: '#fff', width: '100%', minHeight: '100%', borderRadius: '8px', border: '1px solid #e5e7eb', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: '16px', marginBottom: '20px' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '18px', color: '#1f2937' }}>Fees Concession and Dues Comparison</h2>
              <span style={{ fontSize: '12px', color: '#6b7280' }}>Records: <b>{reportData.length}</b></span>
            </div>
            {reportData.length > 0 && (
              <button onClick={handleExport} style={{ background: '#10b981', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' }}>
                <Download size={14} /> Export Excel
              </button>
            )}
          </div>

          {error && <div style={{ padding: '12px', background: '#fee2e2', color: '#991b1b', borderRadius: '4px', marginBottom: '20px', fontSize: '13px' }}>{error}</div>}

          {reportData.length === 0 && !loading && !error ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#6b7280', fontSize: '14px' }}>
              Select class and click "Show" to view concession and remaining dues analysis.
            </div>
          ) : (
            <div>
              <div style={{ overflowX: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                  <thead style={{ background: '#f8fafc' }}>
                    <tr>
                      <th style={{ padding: '10px 14px', textAlign: 'left', color: '#374151' }}>#</th>
                      <th style={{ padding: '10px 14px', textAlign: 'left', color: '#374151' }}>Adm No</th>
                      <th style={{ padding: '10px 14px', textAlign: 'left', color: '#374151' }}>Student Name</th>
                      <th style={{ padding: '10px 14px', textAlign: 'left', color: '#374151' }}>Class</th>
                      <th style={{ padding: '10px 14px', textAlign: 'left', color: '#374151' }}>Category</th>
                      <th style={{ padding: '10px 14px', textAlign: 'right', color: '#374151' }}>Payable (₹)</th>
                      <th style={{ padding: '10px 14px', textAlign: 'right', color: '#374151' }}>Concession (₹)</th>
                      <th style={{ padding: '10px 14px', textAlign: 'right', color: '#374151' }}>Paid (₹)</th>
                      <th style={{ padding: '10px 14px', textAlign: 'right', color: '#374151' }}>Outstanding Dues (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.map((d, i) => (
                      <tr key={i} style={{ borderTop: '1px solid #e5e7eb', background: i % 2 === 0 ? '#fff' : '#fcfcfc' }}>
                        <td style={{ padding: '10px 14px', color: '#6b7280' }}>{i + 1}</td>
                        <td style={{ padding: '10px 14px', fontWeight: '600', color: '#1e3a8a' }}>{d.admissionNo}</td>
                        <td style={{ padding: '10px 14px', fontWeight: '500', color: '#111827' }}>{d.studentName}</td>
                        <td style={{ padding: '10px 14px', color: '#4b5563' }}>{d.class}</td>
                        <td style={{ padding: '10px 14px', color: '#6b7280' }}>{d.category || 'General'}</td>
                        <td style={{ padding: '10px 14px', textAlign: 'right', color: '#1f2937' }}>₹{d.totalPayable?.toLocaleString()}</td>
                        <td style={{ padding: '10px 14px', textAlign: 'right', color: '#f59e0b', fontWeight: '500' }}>₹{Math.round(d.totalPayable * 0.1).toLocaleString()}</td>
                        <td style={{ padding: '10px 14px', textAlign: 'right', color: '#059669', fontWeight: '500' }}>₹{d.totalPaid?.toLocaleString()}</td>
                        <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 'bold', color: d.totalDues > 0 ? '#dc2626' : '#15803d' }}>
                          ₹{d.totalDues?.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ marginTop: '20px', padding: '16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '13px', color: '#64748b' }}>Total Payable: </span>
                  <span style={{ fontWeight: 'bold', color: '#1f2937', fontSize: '16px' }}>₹{totalPayable.toLocaleString()}</span>
                </div>
                <div>
                  <span style={{ fontSize: '13px', color: '#64748b' }}>Total Paid: </span>
                  <span style={{ fontWeight: 'bold', color: '#059669', fontSize: '16px' }}>₹{totalPaid.toLocaleString()}</span>
                </div>
                <div>
                  <span style={{ fontSize: '13px', color: '#64748b' }}>Total Remaining Dues: </span>
                  <span style={{ fontWeight: 'bold', color: '#dc2626', fontSize: '18px' }}>₹{totalDues.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
