import React, { useState, useEffect } from 'react';
import { Eye, Download } from 'lucide-react';
import * as XLSX from 'xlsx';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5005';
const token = localStorage.getItem('token');

const inputStyle = { width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' };
const labelStyle = { display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' };

export default function TotalConcessionReportInstallHeadWise() {
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
      let url = `${API_URL}/api/fee-reports/concessions?`;
      if (selectedClass) url += `classId=${selectedClass}&`;

      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (res.ok) {
        // Group by class to show total concessions
        const classMap = {};
        (data || []).forEach(r => {
          const cls = r.class || 'Other';
          if (!classMap[cls]) {
            classMap[cls] = { class: cls, studentCount: 0, totalPaid: 0, totalConcession: 0 };
          }
          classMap[cls].studentCount += 1;
          classMap[cls].totalPaid += (Number(r.amountPaid) || 0);
          classMap[cls].totalConcession += (Number(r.discountAmount) || 0);
        });
        setReportData(Object.values(classMap));
      } else {
        setError(data.message || 'Failed to fetch concessions summary');
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
        'Class': d.class,
        'Students Benefited': d.studentCount,
        'Fee Collected (₹)': d.totalPaid,
        'Total Concession Granted (₹)': d.totalConcession
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'TotalConcessionsSummary');
    XLSX.writeFile(workbook, 'Total_Concession_Report_Install_Head_Wise.xlsx');
  };

  const grandConcession = reportData.reduce((acc, curr) => acc + curr.totalConcession, 0);
  const grandPaid = reportData.reduce((acc, curr) => acc + curr.totalPaid, 0);

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
              <h2 style={{ margin: 0, fontSize: '18px', color: '#1f2937' }}>Total Concession Consolidated Summary</h2>
              <span style={{ fontSize: '12px', color: '#6b7280' }}>Classes Represented: <b>{reportData.length}</b></span>
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
              Select filters and click "Show" to load consolidated class-wise concessions summary.
            </div>
          ) : (
            <div>
              <div style={{ overflowX: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                  <thead style={{ background: '#f8fafc' }}>
                    <tr>
                      <th style={{ padding: '10px 14px', textAlign: 'left', color: '#374151' }}>#</th>
                      <th style={{ padding: '10px 14px', textAlign: 'left', color: '#374151' }}>Class</th>
                      <th style={{ padding: '10px 14px', textAlign: 'center', color: '#374151' }}>Beneficiary Students</th>
                      <th style={{ padding: '10px 14px', textAlign: 'right', color: '#374151' }}>Total Fee Collected (₹)</th>
                      <th style={{ padding: '10px 14px', textAlign: 'right', color: '#374151' }}>Total Concession Granted (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.map((d, i) => (
                      <tr key={i} style={{ borderTop: '1px solid #e5e7eb', background: i % 2 === 0 ? '#fff' : '#fcfcfc' }}>
                        <td style={{ padding: '10px 14px', color: '#6b7280' }}>{i + 1}</td>
                        <td style={{ padding: '10px 14px', fontWeight: '600', color: '#1e3a8a' }}>Class {d.class}</td>
                        <td style={{ padding: '10px 14px', textAlign: 'center', color: '#4b5563' }}>{d.studentCount}</td>
                        <td style={{ padding: '10px 14px', textAlign: 'right', color: '#059669', fontWeight: '500' }}>₹{d.totalPaid?.toLocaleString()}</td>
                        <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 'bold', color: '#dc2626' }}>₹{d.totalConcession?.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ marginTop: '20px', padding: '16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '13px', color: '#64748b' }}>Grand Total Collected: </span>
                  <span style={{ fontWeight: 'bold', color: '#059669', fontSize: '16px' }}>₹{grandPaid.toLocaleString()}</span>
                </div>
                <div>
                  <span style={{ fontSize: '13px', color: '#64748b' }}>Grand Total Concessions Granted: </span>
                  <span style={{ fontWeight: 'bold', color: '#dc2626', fontSize: '18px' }}>₹{grandConcession.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
