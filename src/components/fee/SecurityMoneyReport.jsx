import React, { useState, useEffect } from 'react';
import { Eye, Download } from 'lucide-react';
import * as XLSX from 'xlsx';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5005';
const token = localStorage.getItem('token');
const inputStyle = { width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' };
const labelStyle = { display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' };

export default function SecurityMoneyReport() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
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
      let url = `${API_URL}/api/security-money?`;
      if (selectedClass) url += `classId=${selectedClass}&`;
      if (selectedStatus && selectedStatus !== 'all') url += `status=${selectedStatus}&`;

      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (res.ok) {
        setReportData(Array.isArray(data) ? data : []);
      } else {
        setError(data.message || 'Failed to fetch security money records');
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
      reportData.map((r, i) => ({
        'S.No': i + 1,
        'Receipt No': r.receiptNo,
        'Admission No': r.student?.academicDetails?.admissionNumber || 'N/A',
        'Student Name': `${r.student?.personalDetails?.firstName || ''} ${r.student?.personalDetails?.lastName || ''}`.trim() || 'Unknown',
        'Class': r.student?.academicDetails?.class || 'N/A',
        'Deposit Date': r.depositDate ? new Date(r.depositDate).toLocaleDateString() : '',
        'Security Amount (₹)': r.amount,
        'Payment Mode': r.paymentMode,
        'Status': r.status,
        'Return Date': r.returnDate ? new Date(r.returnDate).toLocaleDateString() : '-',
        'Remarks': r.remarks || ''
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'SecurityMoney');
    XLSX.writeFile(workbook, 'Security_Money_Report.xlsx');
  };

  const totalAmount = reportData.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

  return (
    <div style={{ display: 'flex', height: '100%', background: '#f3f4f6' }}>
      <div style={{ width: '250px', background: '#fff', borderRight: '1px solid #e5e7eb', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', flexShrink: 0 }}>
        <div>
          <label style={labelStyle}>Class Filter</label>
          <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} style={inputStyle}>
            <option value="">All Classes</option>
            {classes.map(c => <option key={c._id} value={c.className || c.name}>{c.className || c.name}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Status</label>
          <select value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)} style={inputStyle}>
            <option value="all">All Statuses</option>
            <option value="Deposited">Deposited</option>
            <option value="Returned">Returned</option>
          </select>
        </div>

        <button onClick={handleShow} disabled={loading} style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '10px', borderRadius: '4px', fontSize: '12px', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontWeight: 'bold' }}>
          <Eye size={14} /> {loading ? 'Loading...' : 'Show'}
        </button>
      </div>

      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <div style={{ background: '#fff', minHeight: '100%', borderRadius: '8px', border: '1px solid #e5e7eb', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: '16px', marginBottom: '20px' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '18px', color: '#1f2937' }}>Security Money Report</h2>
              <span style={{ fontSize: '12px', color: '#6b7280' }}>Records: <b>{reportData.length}</b></span>
            </div>
            {reportData.length > 0 && (
              <button onClick={handleExport} style={{ background: '#10b981', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' }}>
                <Download size={14} /> Export Excel
              </button>
            )}
          </div>

          {error && <div style={{ padding: '12px', background: '#fee2e2', color: '#991b1b', borderRadius: '4px', marginBottom: '20px' }}>{error}</div>}

          {reportData.length === 0 && !loading && !error ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#6b7280' }}>Click "Show" to view security money records.</div>
          ) : (
            <div>
              <div style={{ overflowX: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                  <thead style={{ background: '#f8fafc' }}>
                    <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <th style={{ padding: '10px 14px', textAlign: 'left', color: '#374151' }}>#</th>
                      <th style={{ padding: '10px 14px', textAlign: 'left', color: '#374151' }}>Receipt No</th>
                      <th style={{ padding: '10px 14px', textAlign: 'left', color: '#374151' }}>Adm No</th>
                      <th style={{ padding: '10px 14px', textAlign: 'left', color: '#374151' }}>Student Name</th>
                      <th style={{ padding: '10px 14px', textAlign: 'left', color: '#374151' }}>Class</th>
                      <th style={{ padding: '10px 14px', textAlign: 'left', color: '#374151' }}>Date Deposited</th>
                      <th style={{ padding: '10px 14px', textAlign: 'center', color: '#374151' }}>Status</th>
                      <th style={{ padding: '10px 14px', textAlign: 'right', color: '#374151' }}>Security Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.map((r, i) => (
                      <tr key={r._id || i} style={{ borderTop: '1px solid #e5e7eb', background: i % 2 === 0 ? '#fff' : '#fcfcfc' }}>
                        <td style={{ padding: '10px 14px', color: '#6b7280' }}>{i + 1}</td>
                        <td style={{ padding: '10px 14px', fontWeight: '600', color: '#1e3a8a' }}>{r.receiptNo}</td>
                        <td style={{ padding: '10px 14px', color: '#4b5563' }}>{r.student?.academicDetails?.admissionNumber || '-'}</td>
                        <td style={{ padding: '10px 14px', fontWeight: '500', color: '#111827' }}>
                          {`${r.student?.personalDetails?.firstName || ''} ${r.student?.personalDetails?.lastName || ''}`.trim() || 'Student'}
                        </td>
                        <td style={{ padding: '10px 14px', color: '#4b5563' }}>{r.student?.academicDetails?.class || '-'}</td>
                        <td style={{ padding: '10px 14px', color: '#6b7280' }}>{r.depositDate ? new Date(r.depositDate).toLocaleDateString() : '-'}</td>
                        <td style={{ padding: '10px 14px', textAlign: 'center' }}>
                          <span style={{
                            padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: '600',
                            background: r.status === 'Deposited' ? '#dcfce7' : '#fee2e2',
                            color: r.status === 'Deposited' ? '#15803d' : '#b91c1c'
                          }}>
                            {r.status}
                          </span>
                        </td>
                        <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 'bold', color: '#059669' }}>₹{r.amount?.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ marginTop: '20px', padding: '16px', background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold', color: '#065f46', fontSize: '15px' }}>Total Security Balance</span>
                <span style={{ fontWeight: 'bold', color: '#059669', fontSize: '20px' }}>₹{totalAmount.toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
