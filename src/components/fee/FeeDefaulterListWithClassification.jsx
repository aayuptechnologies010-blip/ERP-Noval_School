import React, { useState, useEffect } from 'react';
import { Eye, Download } from 'lucide-react';
import * as XLSX from 'xlsx';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5005';
const token = localStorage.getItem('token');

const inputStyle = { width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' };
const labelStyle = { display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' };

export default function FeeDefaulterListWithClassification() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [search, setSearch] = useState('');
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
      let url = `${API_URL}/api/fee-reports/defaulters?`;
      if (selectedClass) url += `classId=${selectedClass}&`;
      if (selectedCategory) url += `category=${selectedCategory}&`;
      if (search) url += `search=${encodeURIComponent(search)}&`;

      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (res.ok) {
        setReportData(data || []);
      } else {
        setError(data.message || 'Failed to fetch defaulters');
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
        'Classification / Category': d.category || 'General',
        'Father Name': d.fatherName,
        'Mobile Number': d.mobileNumber,
        'Total Payable (₹)': d.totalPayable,
        'Total Paid (₹)': d.totalPaid,
        'Total Dues (₹)': d.totalDues
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'DefaultersClassification');
    XLSX.writeFile(workbook, 'Defaulter_List_Classification_Wise.xlsx');
  };

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
        <div>
          <label style={labelStyle}>Classification / Category</label>
          <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} style={inputStyle}>
            <option value="">All Categories</option>
            <option value="General">General</option>
            <option value="OBC">OBC</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>Search Name / Adm No</label>
          <input type="text" placeholder="Type name or adm no..." value={search} onChange={e => setSearch(e.target.value)} style={inputStyle} />
        </div>

        <button onClick={handleShow} disabled={loading} style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '10px', borderRadius: '4px', fontSize: '12px', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontWeight: 'bold' }}>
          <Eye size={14} /> {loading ? 'Loading...' : 'Show'}
        </button>
      </div>

      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <div style={{ background: '#fff', width: '100%', minHeight: '100%', borderRadius: '8px', border: '1px solid #e5e7eb', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: '16px', marginBottom: '20px' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '18px', color: '#1f2937' }}>Fee Defaulter List With Classification</h2>
              <span style={{ fontSize: '12px', color: '#6b7280' }}>Total Defaulters: <b>{reportData.length}</b></span>
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
              Select class and classification to display defaulters list.
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
                      <th style={{ padding: '10px 14px', textAlign: 'left', color: '#374151' }}>Father Name</th>
                      <th style={{ padding: '10px 14px', textAlign: 'left', color: '#374151' }}>Mobile</th>
                      <th style={{ padding: '10px 14px', textAlign: 'right', color: '#374151' }}>Total Paid (₹)</th>
                      <th style={{ padding: '10px 14px', textAlign: 'right', color: '#374151' }}>Dues (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.map((d, i) => (
                      <tr key={i} style={{ borderTop: '1px solid #e5e7eb', background: i % 2 === 0 ? '#fff' : '#fcfcfc' }}>
                        <td style={{ padding: '10px 14px', color: '#6b7280' }}>{i + 1}</td>
                        <td style={{ padding: '10px 14px', fontWeight: '600', color: '#1e3a8a' }}>{d.admissionNo}</td>
                        <td style={{ padding: '10px 14px', fontWeight: '500', color: '#111827' }}>{d.studentName}</td>
                        <td style={{ padding: '10px 14px', color: '#4b5563' }}>{d.class}</td>
                        <td style={{ padding: '10px 14px', color: '#6b7280' }}>
                          <span style={{ padding: '2px 8px', borderRadius: '12px', background: '#f1f5f9', color: '#334155', fontSize: '11px' }}>
                            {d.category || 'General'}
                          </span>
                        </td>
                        <td style={{ padding: '10px 14px', color: '#4b5563' }}>{d.fatherName || '-'}</td>
                        <td style={{ padding: '10px 14px', color: '#4b5563' }}>{d.mobileNumber || '-'}</td>
                        <td style={{ padding: '10px 14px', textAlign: 'right', color: '#059669', fontWeight: '500' }}>₹{d.totalPaid?.toLocaleString()}</td>
                        <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 'bold', color: '#dc2626' }}>₹{d.totalDues?.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ marginTop: '20px', padding: '16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold', color: '#991b1b', fontSize: '15px' }}>Total Outstanding Dues</span>
                <span style={{ fontWeight: 'bold', color: '#dc2626', fontSize: '20px' }}>₹{totalDues.toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
