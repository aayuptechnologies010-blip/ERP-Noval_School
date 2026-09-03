import React, { useState, useEffect } from 'react';
import { FaSearch, FaCalendarAlt, FaFileAlt } from 'react-icons/fa';

function ObservationReport() {
  const [teacher, setTeacher] = useState('All');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reportData, setReportData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [teachersList, setTeachersList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/staffs`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        const formatted = Array.isArray(data) ? data.map(t => ({
          id: t._id,
          name: `${t.firstName || ''} ${t.lastName || ''}`.trim() || 'Unknown',
        })) : [];
        setTeachersList(formatted);
      }
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const handleGetReport = async () => {
    setLoading(true);
    setHasSearched(true);
    try {
      const token = localStorage.getItem('token');
      let url = `${import.meta.env.VITE_API_BASE_URL}/api/teacher-observations/report?`;
      if (teacher !== 'All') url += `staff=${teacher}&`;
      if (fromDate) url += `fromDate=${fromDate}&`;
      if (toDate) url += `toDate=${toDate}&`;
      
      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setReportData(data);
      } else {
        setReportData([]);
      }
    } catch (error) {
      console.error('Error fetching report:', error);
      setReportData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Header Bar */}
      <div style={{ padding: '24px 32px 16px 32px' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Observation Report</h1>
      </div>

      {/* Main Content Card */}
      <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px' }}>
          
          {/* Filters */}
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1, minWidth: 200 }}>
              <label style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>Select Teacher</label>
              <select 
                value={teacher} 
                onChange={e => setTeacher(e.target.value)}
                style={inputStyle}
              >
                <option value="All">All Teachers</option>
                {teachersList.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1, minWidth: 150 }}>
              <label style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>From Date</label>
              <input 
                type="date" 
                value={fromDate}
                onChange={e => setFromDate(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1, minWidth: 150 }}>
              <label style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>To Date</label>
              <input 
                type="date" 
                value={toDate}
                onChange={e => setToDate(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button onClick={handleGetReport} style={{ background: '#5cb85c', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: 4, fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, height: 42 }}>
                <FaSearch size={14} /> Get Report
              </button>
            </div>
            
          </div>

        </div>

        {/* Report Results */}
        {hasSearched && (
          <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginTop: 24, overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  <th style={thStyle}>Teacher Name</th>
                  <th style={thStyle}>Date</th>
                  <th style={thStyle}>Subject</th>
                  <th style={thStyle}>Score</th>
                  <th style={thStyle}>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '32px', color: '#64748b' }}>Loading report data...</td>
                  </tr>
                ) : reportData.map((row, index) => (
                  <tr key={row._id || index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={tdStyle}>{row.staffName || row.name}</td>
                    <td style={tdStyle}>{new Date(row.observationDate || row.date).toLocaleDateString()}</td>
                    <td style={tdStyle}>{row.subject}</td>
                    <td style={tdStyle}>
                      <span style={{ background: '#dcfce7', color: '#166534', padding: '4px 8px', borderRadius: '4px', fontWeight: 600, fontSize: 12 }}>
                        {row.score}
                      </span>
                    </td>
                    <td style={tdStyle}>{row.remarks}</td>
                  </tr>
                ))}
                {!loading && reportData.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '32px', color: '#94a3b8' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                        <FaFileAlt size={48} color="#cbd5e1" />
                        <span>No observation records found for the selected criteria.</span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: 4,
  border: '1px solid #cbd5e1',
  outline: 'none',
  fontSize: 14,
  color: '#334155',
  background: '#fff',
  boxSizing: 'border-box'
};

const thStyle = {
  padding: '16px',
  textAlign: 'left',
  fontSize: 13,
  fontWeight: 700,
  color: '#0f172a',
  borderBottom: '2px solid #e2e8f0',
  whiteSpace: 'nowrap'
};

const tdStyle = {
  padding: '16px',
  fontSize: 13,
  color: '#475569'
};

export default ObservationReport;
