import React, { useState, useEffect } from 'react';
import { Eye, Download, Bus, Search, UserCheck } from 'lucide-react';
import * as XLSX from 'xlsx';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5005';
const inputStyle = { width: '100%', padding: '7px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none', background: '#fff' };
const labelStyle = { display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '5px', color: '#374151' };

export default function SelfTransportReport() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [reportData, setReportData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const getHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  useEffect(() => {
    fetch(`${API_URL}/api/school-classes`, { headers: getHeaders() })
      .then(r => r.json())
      .then(d => setClasses(Array.isArray(d) ? d : (d?.data || [])))
      .catch(console.error);

    handleShow();
  }, []);

  const handleShow = async () => {
    setLoading(true);
    setError(null);
    setHasSearched(true);
    try {
      const res = await fetch(`${API_URL}/api/students`, { headers: getHeaders() });
      const data = await res.json();
      if (res.ok) {
        const studentsList = Array.isArray(data) ? data : (data.students || []);

        // Self-transport students: students who are NOT opted into school bus transport
        const selfList = studentsList.filter(s => {
          const t = s.transportDetails || {};
          const isBusStudent = s.transportAssigned || t.isTransportStudent || s.transportRoute || t.route;
          return !isBusStudent;
        });

        const formatted = selfList.map((s, idx) => {
          const admNo = s.academicDetails?.admissionNumber || s.admissionNumber || '-';
          const p = s.personalDetails || {};
          const fullName = `${p.firstName || s.firstName || ''} ${p.lastName || s.lastName || ''}`.trim() || 'Student';
          const cls = `${s.academicDetails?.class || s.class?.className || s.class?.name || s.class || ''}${s.academicDetails?.section ? '-' + s.academicDetails.section : ''}`.trim() || '-';
          const fam = s.familyDetails || {};
          const f = fam.father || {};
          const fatherName = f.firstName ? `${f.title || 'Mr.'} ${f.firstName} ${f.lastName || ''}`.trim() : (s.fatherName || '-');
          const mobile = f.mobile || s.fatherMobile || s.contactAddress?.contactNumber || p.mobile || '-';
          const address = s.contactAddress?.currentAddress || s.address || '-';
          const mode = s.selfTransportMode || s.transportDetails?.selfMode || 'Bicycle / Walk / Parent Drop';

          return {
            _id: s._id || `self-${idx}`,
            sn: idx + 1,
            admissionNumber: admNo,
            fullName,
            className: cls,
            fatherName,
            mobile,
            address,
            mode,
            status: s.academicDetails?.currentStatus || s.status || 'STUDYING'
          };
        });

        setReportData(formatted);
        filterList(formatted, selectedClass, searchTerm);
      } else {
        setError(data.message || 'Failed to fetch student records');
      }
    } catch {
      setError('Server connection error while loading self transport records');
    } finally {
      setLoading(false);
    }
  };

  const filterList = (data, cls, search) => {
    let filtered = [...data];

    if (cls && cls !== 'All') {
      const clsTarget = cls.toLowerCase();
      filtered = filtered.filter(item => item.className.toLowerCase().includes(clsTarget));
    }

    if (search && search.trim() !== '') {
      const term = search.toLowerCase();
      filtered = filtered.filter(item =>
        item.admissionNumber.toLowerCase().includes(term) ||
        item.fullName.toLowerCase().includes(term) ||
        item.fatherName.toLowerCase().includes(term) ||
        item.mobile.toLowerCase().includes(term) ||
        item.address.toLowerCase().includes(term)
      );
    }

    setFilteredData(filtered);
  };

  const handleClassChange = (e) => {
    const val = e.target.value;
    setSelectedClass(val);
    filterList(reportData, val, searchTerm);
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    filterList(reportData, selectedClass, val);
  };

  const exportToExcel = () => {
    if (filteredData.length === 0) {
      alert('No data available to export');
      return;
    }

    const exportRows = filteredData.map((s, idx) => ({
      'S.No.': idx + 1,
      'Admission No': s.admissionNumber,
      'Student Name': s.fullName,
      'Class': s.className,
      'Father Name': s.fatherName,
      'Mobile No': s.mobile,
      'Self Transport Mode': s.mode,
      'Address': s.address,
      'Status': s.status
    }));

    const ws = XLSX.utils.json_to_sheet(exportRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Self Transport');
    XLSX.writeFile(wb, `Self_Transport_Report_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  return (
    <div style={{ display: 'flex', height: '100%', background: '#f8fafc', overflow: 'hidden' }}>
      {/* ── LEFT FILTER SIDEBAR ── */}
      <div style={{
        width: '260px',
        background: '#fff',
        borderRight: '1px solid #e2e8f0',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        flexShrink: 0,
        boxShadow: '1px 0 3px rgba(0,0,0,0.05)',
        overflowY: 'auto'
      }}>
        <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
          <h3 style={{ margin: 0, fontSize: '13px', fontWeight: 'bold', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <UserCheck size={16} color="#0284c7" /> Filter Self Transport
          </h3>
        </div>

        <div>
          <label style={labelStyle}>Class</label>
          <select value={selectedClass} onChange={handleClassChange} style={inputStyle}>
            <option value="All">All Classes</option>
            {classes.map(c => {
              const name = c.className || c.name || c._id;
              return <option key={c._id || name} value={name}>{name}</option>;
            })}
          </select>
        </div>

        <div>
          <label style={labelStyle}>Search Student</label>
          <div style={{ position: 'relative' }}>
            <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: '8px', top: '9px' }} />
            <input
              type="text"
              placeholder="Adm / Name / Mobile..."
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ ...inputStyle, paddingLeft: '28px' }}
            />
          </div>
        </div>

        <button
          onClick={handleShow}
          disabled={loading}
          style={{
            background: 'linear-gradient(to right, #0284c7, #0369a1)',
            color: '#fff',
            border: 'none',
            padding: '9px 12px',
            borderRadius: '5px',
            fontSize: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            fontWeight: 'bold',
            marginTop: '8px'
          }}
        >
          <Eye size={14} /> {loading ? 'Loading...' : 'Show Records'}
        </button>
      </div>

      {/* ── RIGHT MAIN REPORT CONTENT ── */}
      <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
        <div style={{ background: '#fff', minHeight: '100%', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '16px', display: 'flex', flexDirection: 'column' }}>
          
          {/* Top Bar with export */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '14px', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: '#0f172a' }}>
                Self Transport Student Report
              </h2>
              <span style={{ fontSize: '11px', color: '#64748b' }}>
                Total Self Transport Students: <strong>{filteredData.length}</strong> (Out of {reportData.length})
              </span>
            </div>

            <button
              onClick={exportToExcel}
              style={{
                background: '#10b981',
                color: '#fff',
                border: 'none',
                padding: '7px 14px',
                borderRadius: '5px',
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: '600'
              }}
            >
              <Download size={14} /> Export Excel
            </button>
          </div>

          {error && (
            <div style={{ padding: '10px 14px', background: '#fee2e2', color: '#991b1b', borderRadius: '5px', marginBottom: '14px', fontSize: '12px' }}>
              {error}
            </div>
          )}

          {/* Table */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '50px', color: '#64748b', fontSize: '13px' }}>
              Loading self transport student records...
            </div>
          ) : filteredData.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px', color: '#64748b', fontSize: '13px' }}>
              {hasSearched ? 'No students found matching your criteria.' : 'Click "Show Records" to view self transport students.'}
            </div>
          ) : (
            <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', whiteSpace: 'nowrap' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9', color: '#334155', borderBottom: '1px solid #cbd5e1' }}>
                    <th style={{ padding: '8px 10px', textAlign: 'center', width: '45px' }}>#</th>
                    <th style={{ padding: '8px 10px', textAlign: 'center' }}>Adm No</th>
                    <th style={{ padding: '8px 10px', textAlign: 'left' }}>Student Name</th>
                    <th style={{ padding: '8px 10px', textAlign: 'center' }}>Class</th>
                    <th style={{ padding: '8px 10px', textAlign: 'left' }}>Father Name</th>
                    <th style={{ padding: '8px 10px', textAlign: 'center' }}>Mobile No</th>
                    <th style={{ padding: '8px 10px', textAlign: 'left' }}>Self Transport Mode</th>
                    <th style={{ padding: '8px 10px', textAlign: 'left' }}>Address</th>
                    <th style={{ padding: '8px 10px', textAlign: 'center' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((s, i) => (
                    <tr
                      key={s._id || i}
                      style={{
                        borderBottom: '1px solid #e2e8f0',
                        background: i % 2 === 0 ? '#ffffff' : '#f8fafc'
                      }}
                    >
                      <td style={{ padding: '7px 10px', textAlign: 'center', color: '#64748b' }}>{i + 1}</td>
                      <td style={{ padding: '7px 10px', textAlign: 'center', fontWeight: '600', color: '#0284c7' }}>
                        {s.admissionNumber}
                      </td>
                      <td style={{ padding: '7px 10px', fontWeight: '600', color: '#1e293b' }}>
                        {s.fullName}
                      </td>
                      <td style={{ padding: '7px 10px', textAlign: 'center', color: '#475569' }}>
                        {s.className}
                      </td>
                      <td style={{ padding: '7px 10px', color: '#334155' }}>
                        {s.fatherName}
                      </td>
                      <td style={{ padding: '7px 10px', textAlign: 'center', color: '#475569' }}>
                        {s.mobile}
                      </td>
                      <td style={{ padding: '7px 10px' }}>
                        <span style={{
                          background: '#eff6ff',
                          color: '#2563eb',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: '500'
                        }}>
                          {s.mode}
                        </span>
                      </td>
                      <td style={{ padding: '7px 10px', color: '#64748b', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {s.address}
                      </td>
                      <td style={{ padding: '7px 10px', textAlign: 'center' }}>
                        <span style={{
                          background: '#f0fdf4',
                          color: '#16a34a',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          fontSize: '10px',
                          fontWeight: 'bold'
                        }}>
                          {s.status}
                        </span>
                      </td>
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
