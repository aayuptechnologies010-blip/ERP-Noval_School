import React, { useState, useEffect } from 'react';
import { Eye, Download } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const token = localStorage.getItem('token');

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

  useEffect(() => {
    fetch(`${API_URL}/api/classes`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => setClasses(data))
      .catch(console.error);

    fetch(`${API_URL}/api/fee-groups`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => setFeeGroups(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  const handleShow = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = `${API_URL}/api/fee-reports/defaulters?status=all`;
      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      
      if (res.ok) {
        let filtered = data;
        if (selectedClass) {
          const selectedClassName = classes.find(c => c._id === selectedClass)?.name;
          filtered = filtered.filter(s => s.class === selectedClassName);
        }
        setReportData(filtered);
      } else {
        setError(data.message || 'Failed to fetch data');
      }
    } catch (err) {
      setError('Server connection error');
    } finally {
      setLoading(false);
    }
  };

  // Group by class for consolidated view
  const consolidated = reportData.reduce((acc, s) => {
    const cls = s.class || 'Unknown';
    if (!acc[cls]) acc[cls] = { students: 0, totalPayable: 0, totalPaid: 0, totalDue: 0 };
    acc[cls].students += 1;
    acc[cls].totalPayable += (s.totalPayable || 0);
    acc[cls].totalPaid += (s.totalPaid || 0);
    acc[cls].totalDue += (s.totalDue || 0);
    return acc;
  }, {});

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
          <label style={labelStyle}>Fee Group</label>
          <select value={selectedGroup} onChange={e => setSelectedGroup(e.target.value)} style={inputStyle}>
            <option value="">All Fee Groups</option>
            {feeGroups.map(g => <option key={g._id} value={g._id}>{g.name}</option>)}
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
            <h2 style={{ margin: 0, fontSize: '18px', color: '#1f2937' }}>Group Wise Student Details</h2>
            {reportData.length > 0 && (
              <button style={{ background: '#10b981', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' }}>
                <Download size={14} /> Export Excel
              </button>
            )}
          </div>

          {error && <div style={{ padding: '12px', background: '#fee2e2', color: '#991b1b', borderRadius: '4px', marginBottom: '20px', fontSize: '13px' }}>{error}</div>}

          {reportData.length === 0 && !loading && !error ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280', fontSize: '14px' }}>
              Click "Show" to view group wise student fee details.
            </div>
          ) : displayType === 'consolidated' ? (
            /* Consolidated View - grouped by class */
            <div style={{ overflowX: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', whiteSpace: 'nowrap' }}>
                <thead style={{ background: '#f9fafb' }}>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Class</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', color: '#374151' }}>Students</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right', color: '#374151' }}>Total Payable (₹)</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right', color: '#374151' }}>Total Paid (₹)</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right', color: '#374151' }}>Total Dues (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(consolidated).map(([cls, d]) => (
                    <tr key={cls} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '12px 16px', color: '#1f2937', fontWeight: 'bold' }}>{cls}</td>
                      <td style={{ padding: '12px 16px', color: '#4b5563', textAlign: 'center' }}>{d.students}</td>
                      <td style={{ padding: '12px 16px', color: '#4b5563', textAlign: 'right' }}>{d.totalPayable.toLocaleString()}</td>
                      <td style={{ padding: '12px 16px', color: '#059669', textAlign: 'right', fontWeight: 'bold' }}>{d.totalPaid.toLocaleString()}</td>
                      <td style={{ padding: '12px 16px', color: d.totalDue > 0 ? '#b91c1c' : '#059669', textAlign: 'right', fontWeight: 'bold' }}>{d.totalDue.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot style={{ background: '#f9fafb' }}>
                  <tr>
                    <td colSpan="2" style={{ padding: '12px 16px', fontWeight: 'bold', color: '#1f2937' }}>Grand Total:</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 'bold', color: '#374151' }}>
                      ₹{Object.values(consolidated).reduce((a, d) => a + d.totalPayable, 0).toLocaleString()}
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 'bold', color: '#059669' }}>
                      ₹{Object.values(consolidated).reduce((a, d) => a + d.totalPaid, 0).toLocaleString()}
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 'bold', color: '#b91c1c' }}>
                      ₹{Object.values(consolidated).reduce((a, d) => a + d.totalDue, 0).toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ) : (
            /* Separated view - student by student */
            <div style={{ overflowX: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', whiteSpace: 'nowrap' }}>
                <thead style={{ background: '#f9fafb' }}>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Adm No</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Student Name</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Class</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right', color: '#374151' }}>Payable (₹)</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right', color: '#374151' }}>Paid (₹)</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right', color: '#374151' }}>Due (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((s, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '12px 16px', color: '#4b5563' }}>{s.admissionNo}</td>
                      <td style={{ padding: '12px 16px', color: '#1f2937', fontWeight: '600' }}>{s.studentName}</td>
                      <td style={{ padding: '12px 16px', color: '#4b5563' }}>{s.class}</td>
                      <td style={{ padding: '12px 16px', color: '#4b5563', textAlign: 'right' }}>{s.totalPayable || 0}</td>
                      <td style={{ padding: '12px 16px', color: '#059669', textAlign: 'right', fontWeight: 'bold' }}>{s.totalPaid || 0}</td>
                      <td style={{ padding: '12px 16px', color: s.totalDue > 0 ? '#b91c1c' : '#059669', textAlign: 'right', fontWeight: 'bold' }}>{s.totalDue || 0}</td>
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
