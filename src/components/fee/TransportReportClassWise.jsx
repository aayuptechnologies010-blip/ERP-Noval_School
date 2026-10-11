import React, { useState, useEffect, useRef } from 'react';
import { Eye, Download, Bus, Users, Search, Upload, FileSpreadsheet, X, CheckCircle, AlertCircle } from 'lucide-react';
import * as XLSX from 'xlsx';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5005';
const inputStyle = { width: '100%', padding: '7px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none', background: '#fff' };
const labelStyle = { display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '5px', color: '#374151' };

export default function TransportReportClassWise() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [reportData, setReportData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Excel Upload Modal State
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadPreview, setUploadPreview] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState('');
  const [uploadErrorMsg, setUploadErrorMsg] = useState('');
  const fileInputRef = useRef(null);

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
    try {
      const res = await fetch(`${API_URL}/api/students`, { headers: getHeaders() });
      const data = await res.json();
      if (res.ok) {
        let students = Array.isArray(data) ? data : (data.students || []);

        const transportStudents = students.filter(s => {
          const t = s.transportDetails || {};
          return t.isTransportStudent || t.stop || t.route || s.transportAssigned || s.transportStop;
        });

        const formatted = transportStudents.map((s, idx) => {
          const admNo = s.academicDetails?.admissionNumber || s.admissionNumber || s.academicDetails?.admissionNo || '-';
          const p = s.personalDetails || {};
          const fullName = `${p.firstName || s.firstName || ''} ${p.lastName || s.lastName || ''}`.trim() || '-';
          const cls = `${s.academicDetails?.class || s.class?.className || s.class?.name || s.class || ''}${s.academicDetails?.section ? '-' + s.academicDetails.section : ''}`.trim() || '-';
          const address = s.contactAddress?.currentAddress || s.address || '-';
          const contact = s.contactAddress?.contactNumber || p.fatherDetails?.mobileNo || s.phone || '-';
          const stop = s.transportStop || s.transportDetails?.stop?.stopName || (typeof s.transportDetails?.stop === 'string' ? s.transportDetails.stop : '-') || '-';
          const fare = s.transportFee || s.transportDetails?.transportFee || 0;
          const agency = s.transportDetails?.agencyName || s.agencyName || '';
          const assignDate = s.transportDetails?.assignedDate ? new Date(s.transportDetails.assignedDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '-';

          return {
            id: s._id,
            sn: idx + 1,
            admNo,
            name: fullName,
            classStr: cls,
            rawClassId: s.academicDetails?.class || s.class?._id || '',
            address,
            contact,
            stop,
            fare: Number(fare) || 0,
            agency,
            assignDate
          };
        });

        setReportData(formatted);
      } else {
        setError(data.message || 'Error fetching students');
      }
    } catch {
      setError('Server connection error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let list = [...reportData];

    if (selectedClass && selectedClass !== 'All') {
      const selClsObj = classes.find(c => c._id === selectedClass);
      const targetName = (selClsObj?.className || selClsObj?.name || selectedClass).toString().trim().toUpperCase();
      list = list.filter(item => {
        const itemCls = item.classStr.toUpperCase();
        return itemCls.startsWith(targetName) || item.rawClassId === selectedClass;
      });
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(item =>
        item.name.toLowerCase().includes(q) ||
        item.admNo.toLowerCase().includes(q) ||
        item.stop.toLowerCase().includes(q) ||
        item.address.toLowerCase().includes(q) ||
        item.contact.toLowerCase().includes(q)
      );
    }

    setFilteredData(list);
  }, [reportData, selectedClass, searchTerm, classes]);

  // Export to Excel (.xlsx) using xlsx library
  const handleExportExcel = () => {
    if (filteredData.length === 0) return;

    const exportRows = filteredData.map((d, index) => ({
      'SN': index + 1,
      'ADM NO.': d.admNo,
      'NAME': d.name,
      'CLASS': d.classStr,
      'ADDRESS': d.address,
      'CONTACT': d.contact,
      'STOP': d.stop,
      'FARE': d.fare,
      'AGENCY NAME': d.agency,
      'ASSIGN DATE': d.assignDate
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportRows);
    
    // Auto-fit column widths
    const colWidths = [
      { wch: 6 },
      { wch: 12 },
      { wch: 25 },
      { wch: 10 },
      { wch: 35 },
      { wch: 15 },
      { wch: 22 },
      { wch: 10 },
      { wch: 15 },
      { wch: 14 }
    ];
    worksheet['!cols'] = colWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Transport_Report');

    const fileName = `Transport_Report_Class_Wise_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  // Download Sample Template for Excel Upload
  const handleDownloadSample = () => {
    const sampleRows = [
      {
        'ADM NO.': '1770',
        'NAME': 'ARNAV GUPTA',
        'CLASS': 'NUR-A',
        'ADDRESS': 'RAM LEELA BHAWAN GONTHA',
        'CONTACT': '8957244533',
        'STOP': '1-DOHRIGHAT',
        'FARE': 500,
        'AGENCY NAME': '',
        'ASSIGN DATE': '02-Apr-2026'
      },
      {
        'ADM NO.': '1858',
        'NAME': 'KARTIK MADDHESIYA',
        'CLASS': 'NUR-A',
        'ADDRESS': 'BARHALGANJ',
        'CONTACT': '8127445088',
        'STOP': '10-BARHALGANJ',
        'FARE': 500,
        'AGENCY NAME': '',
        'ASSIGN DATE': '12-Jul-2025'
      }
    ];

    const ws = XLSX.utils.json_to_sheet(sampleRows);
    ws['!cols'] = [
      { wch: 12 },
      { wch: 22 },
      { wch: 10 },
      { wch: 30 },
      { wch: 15 },
      { wch: 20 },
      { wch: 10 },
      { wch: 15 },
      { wch: 14 }
    ];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sample_Transport_Template');
    XLSX.writeFile(wb, 'Transport_Upload_Sample_Template.xlsx');
  };

  // Handle File Input for Upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadedFile(file);
    setUploadErrorMsg('');
    setUploadSuccessMsg('');

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsName = wb.SheetNames[0];
        const ws = wb.Sheets[wsName];
        const data = XLSX.utils.sheet_to_json(ws, { defval: '' });

        if (data.length === 0) {
          setUploadErrorMsg('Excel sheet is empty.');
          return;
        }
        setUploadPreview(data);
      } catch (err) {
        setUploadErrorMsg('Failed to parse Excel file. Please use a valid .xlsx or .xls file.');
      }
    };
    reader.readAsBinaryString(file);
  };

  // Submit Upload to Backend
  const handleUploadSubmit = async () => {
    if (uploadPreview.length === 0) {
      setUploadErrorMsg('No records found to upload.');
      return;
    }

    setUploading(true);
    setUploadErrorMsg('');
    setUploadSuccessMsg('');

    try {
      const res = await fetch(`${API_URL}/api/transport/bulk-upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getHeaders()
        },
        body: JSON.stringify({ students: uploadPreview })
      });
      const data = await res.json();

      if (res.ok) {
        setUploadSuccessMsg(data.message || 'Records uploaded and updated successfully!');
        setUploadPreview([]);
        setUploadedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        // Refresh master report data
        handleShow();
      } else {
        setUploadErrorMsg(data.message || 'Upload failed.');
      }
    } catch {
      setUploadErrorMsg('Server error while uploading. Please check connection.');
    } finally {
      setUploading(false);
    }
  };

  const totalStudents = filteredData.length;
  const totalFare = filteredData.reduce((acc, curr) => acc + (curr.fare || 0), 0);

  return (
    <div style={{ display: 'flex', height: '100%', background: '#f8fafc', overflow: 'hidden' }}>
      {/* ── LEFT CONTROL PANEL ── */}
      <div style={{ width: '270px', background: '#fff', borderRight: '1px solid #e2e8f0', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px', flexShrink: 0 }}>
        <div>
          <label style={labelStyle}>Class Filter</label>
          <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} style={inputStyle}>
            <option value="All">All Classes</option>
            {classes.map(c => <option key={c._id} value={c._id}>{c.className || c.name}</option>)}
          </select>
        </div>

        <div>
          <label style={labelStyle}>Search (Name, Adm, Stop)</label>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={inputStyle}
          />
        </div>

        <button
          onClick={handleShow}
          disabled={loading}
          style={{
            background: '#2563eb',
            color: '#fff',
            border: 'none',
            padding: '8px',
            borderRadius: '4px',
            fontSize: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            fontWeight: '600'
          }}
        >
          <Eye size={14} /> {loading ? 'Fetching Data...' : 'Refresh Report'}
        </button>

        {/* Stats Summary Widget */}
        <div style={{ background: '#f1f5f9', padding: '12px', borderRadius: '6px', border: '1px solid #e2e8f0', marginTop: '10px' }}>
          <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#475569', marginBottom: '8px', textTransform: 'uppercase' }}>
            Quick Statistics
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '12px' }}>
            <span style={{ color: '#64748b' }}>Transport Students:</span>
            <span style={{ fontWeight: 'bold', color: '#0f172a' }}>{totalStudents}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
            <span style={{ color: '#64748b' }}>Total Monthly Fare:</span>
            <span style={{ fontWeight: 'bold', color: '#16a34a' }}>₹{totalFare.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* ── RIGHT MAIN REPORT CONTENT ── */}
      <div style={{ flex: 1, padding: '18px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          
          {/* Header Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '14px', marginBottom: '14px' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Bus size={18} color="#2563eb" /> TRANSPORT REPORT CLASS WISE
              </h2>
              <p style={{ margin: '3px 0 0 0', fontSize: '11px', color: '#64748b' }}>
                NAVALS NATIONAL ACADEMY, DOHRIGHAT, MAU • Academic Year: 2026-2027
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '8px' }}>
              {/* Excel Upload Button */}
              <button
                onClick={() => {
                  setShowUploadModal(true);
                  setUploadSuccessMsg('');
                  setUploadErrorMsg('');
                }}
                style={{
                  background: '#4f46e5',
                  color: '#fff',
                  border: 'none',
                  padding: '7px 14px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontWeight: '600'
                }}
              >
                <Upload size={14} /> Excel Upload
              </button>

              {/* Excel Export Button */}
              {filteredData.length > 0 && (
                <button
                  onClick={handleExportExcel}
                  style={{
                    background: '#059669',
                    color: '#fff',
                    border: 'none',
                    padding: '7px 14px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontWeight: '600'
                  }}
                >
                  <FileSpreadsheet size={14} /> Export Excel (.xlsx)
                </button>
              )}
            </div>
          </div>

          {error && <div style={{ padding: '10px', background: '#fee2e2', color: '#991b1b', borderRadius: '4px', marginBottom: '14px', fontSize: '12px' }}>{error}</div>}

          {/* Table Container */}
          <div style={{ flex: 1, overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', color: '#1e293b' }}>
              <thead>
                <tr style={{ background: '#fef3c7', borderBottom: '2px solid #cbd5e1' }}>
                  <th style={{ padding: '8px 6px', textAlign: 'center', borderRight: '1px solid #e2e8f0', width: '40px' }}>SN</th>
                  <th style={{ padding: '8px 8px', textAlign: 'center', borderRight: '1px solid #e2e8f0', width: '70px' }}>ADM NO.</th>
                  <th style={{ padding: '8px 10px', textAlign: 'left', borderRight: '1px solid #e2e8f0' }}>NAME</th>
                  <th style={{ padding: '8px 8px', textAlign: 'center', borderRight: '1px solid #e2e8f0', width: '65px' }}>CLASS</th>
                  <th style={{ padding: '8px 10px', textAlign: 'left', borderRight: '1px solid #e2e8f0' }}>ADDRESS</th>
                  <th style={{ padding: '8px 10px', textAlign: 'center', borderRight: '1px solid #e2e8f0', width: '95px' }}>CONTACT</th>
                  <th style={{ padding: '8px 10px', textAlign: 'left', borderRight: '1px solid #e2e8f0' }}>STOP</th>
                  <th style={{ padding: '8px 8px', textAlign: 'right', borderRight: '1px solid #e2e8f0', width: '70px' }}>FARE</th>
                  <th style={{ padding: '8px 8px', textAlign: 'center', borderRight: '1px solid #e2e8f0', width: '90px' }}>AGENCY NAME</th>
                  <th style={{ padding: '8px 8px', textAlign: 'center', width: '95px' }}>ASSIGN DATE</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="10" style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                      Loading transport records...
                    </td>
                  </tr>
                ) : filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="10" style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
                      No transport student found matching criteria.
                    </td>
                  </tr>
                ) : (
                  filteredData.map((s, i) => (
                    <tr
                      key={s.id || i}
                      style={{
                        borderBottom: '1px solid #f1f5f9',
                        background: i % 2 === 0 ? '#ffffff' : '#f8fafc'
                      }}
                    >
                      <td style={{ padding: '6px 6px', textAlign: 'center', borderRight: '1px solid #f1f5f9', color: '#64748b' }}>
                        {s.sn}
                      </td>
                      <td style={{ padding: '6px 8px', textAlign: 'center', borderRight: '1px solid #f1f5f9', fontWeight: 'bold', color: '#0f172a' }}>
                        {s.admNo}
                      </td>
                      <td style={{ padding: '6px 10px', borderRight: '1px solid #f1f5f9', fontWeight: '600', color: '#1e293b' }}>
                        {s.name}
                      </td>
                      <td style={{ padding: '6px 8px', textAlign: 'center', borderRight: '1px solid #f1f5f9', color: '#475569' }}>
                        {s.classStr}
                      </td>
                      <td style={{ padding: '6px 10px', borderRight: '1px solid #f1f5f9', color: '#475569', maxWidth: '240px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={s.address}>
                        {s.address}
                      </td>
                      <td style={{ padding: '6px 10px', textAlign: 'center', borderRight: '1px solid #f1f5f9', color: '#334155' }}>
                        {s.contact}
                      </td>
                      <td style={{ padding: '6px 10px', borderRight: '1px solid #f1f5f9', fontWeight: '500', color: '#2563eb' }}>
                        {s.stop}
                      </td>
                      <td style={{ padding: '6px 8px', textAlign: 'right', borderRight: '1px solid #f1f5f9', fontWeight: 'bold', color: '#0f172a' }}>
                        ₹{s.fare}
                      </td>
                      <td style={{ padding: '6px 8px', textAlign: 'center', borderRight: '1px solid #f1f5f9', color: '#64748b' }}>
                        {s.agency || '-'}
                      </td>
                      <td style={{ padding: '6px 8px', textAlign: 'center', color: '#475569' }}>
                        {s.assignDate}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              {filteredData.length > 0 && (
                <tfoot style={{ background: '#f1f5f9', fontWeight: 'bold', borderTop: '2px solid #cbd5e1' }}>
                  <tr>
                    <td colSpan="7" style={{ padding: '8px 10px', textAlign: 'right', color: '#0f172a' }}>
                      Total ({filteredData.length} Students):
                    </td>
                    <td style={{ padding: '8px 8px', textAlign: 'right', color: '#16a34a' }}>
                      ₹{totalFare.toLocaleString('en-IN')}
                    </td>
                    <td colSpan="2"></td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>
      </div>

      {/* ── EXCEL UPLOAD MODAL ── */}
      {showUploadModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#fff', borderRadius: '8px', width: '650px', maxWidth: '100%', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}>
            
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileSpreadsheet size={20} color="#4f46e5" />
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 'bold', color: '#0f172a' }}>
                  Upload Transport Excel / CSV
                </h3>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '6px', padding: '12px' }}>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#1e40af' }}>Download Sample Template</div>
                  <div style={{ fontSize: '11px', color: '#3b82f6' }}>Pre-formatted Excel sheet with required column headers.</div>
                </div>
                <button
                  onClick={handleDownloadSample}
                  style={{
                    background: '#2563eb',
                    color: '#fff',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Download size={13} /> Sample Template (.xlsx)
                </button>
              </div>

              {/* Upload Zone */}
              <div style={{ border: '2px dashed #cbd5e1', borderRadius: '8px', padding: '24px', textAlign: 'center', background: '#f8fafc' }}>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".xlsx, .xls, .csv"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  id="excel-file-input"
                />
                <label htmlFor="excel-file-input" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <Upload size={32} color="#64748b" />
                  <span style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>
                    {uploadedFile ? uploadedFile.name : 'Click to select Excel / CSV file'}
                  </span>
                  <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                    Supported formats: .xlsx, .xls, .csv
                  </span>
                </label>
              </div>

              {uploadSuccessMsg && (
                <div style={{ padding: '10px 14px', background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '4px', color: '#065f46', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle size={16} color="#059669" />
                  <span>{uploadSuccessMsg}</span>
                </div>
              )}

              {uploadErrorMsg && (
                <div style={{ padding: '10px 14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '4px', color: '#991b1b', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertCircle size={16} color="#dc2626" />
                  <span>{uploadErrorMsg}</span>
                </div>
              )}

              {/* Preview */}
              {uploadPreview.length > 0 && (
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#334155', marginBottom: '8px' }}>
                    Preview ({uploadPreview.length} records found):
                  </div>
                  <div style={{ maxHeight: '180px', overflowY: 'auto', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px' }}>
                      <thead style={{ background: '#f1f5f9', position: 'sticky', top: 0 }}>
                        <tr>
                          {['ADM NO.', 'NAME', 'CLASS', 'STOP', 'FARE'].map(h => (
                            <th key={h} style={{ padding: '6px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {uploadPreview.slice(0, 10).map((r, i) => (
                          <tr key={i} style={{ borderBottom: '1px solid #f8fafc' }}>
                            <td style={{ padding: '4px 6px' }}>{r['ADM NO.'] || r.admNo || '-'}</td>
                            <td style={{ padding: '4px 6px' }}>{r['NAME'] || r.name || '-'}</td>
                            <td style={{ padding: '4px 6px' }}>{r['CLASS'] || r.classStr || '-'}</td>
                            <td style={{ padding: '4px 6px' }}>{r['STOP'] || r.stop || '-'}</td>
                            <td style={{ padding: '4px 6px' }}>{r['FARE'] || r.fare || 0}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {uploadPreview.length > 10 && (
                    <div style={{ fontSize: '10px', color: '#64748b', marginTop: '4px', textAlign: 'center' }}>
                      Showing preview of first 10 rows...
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', padding: '14px 20px', borderTop: '1px solid #e2e8f0', background: '#f8fafc' }}>
              <button
                onClick={() => setShowUploadModal(false)}
                style={{ padding: '7px 14px', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '12px', cursor: 'pointer', color: '#475569' }}
              >
                Close
              </button>
              <button
                onClick={handleUploadSubmit}
                disabled={uploading || uploadPreview.length === 0}
                style={{
                  padding: '7px 18px',
                  borderRadius: '4px',
                  border: 'none',
                  background: uploadPreview.length === 0 ? '#94a3b8' : '#2563eb',
                  color: '#fff',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: uploadPreview.length === 0 ? 'not-allowed' : 'pointer'
                }}
              >
                {uploading ? 'Uploading...' : `Upload & Save ${uploadPreview.length} Records`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


