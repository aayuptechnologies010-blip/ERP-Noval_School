import React, { useState, useRef } from 'react';
import { Download, Save, Upload, FileSpreadsheet, AlertCircle, CheckCircle } from 'lucide-react';
import * as XLSX from 'xlsx';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function ImportStaff() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [parsedData, setParsedData] = useState([]);
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState(null);
  const fileInputRef = useRef(null);

  const token = localStorage.getItem('token');

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setFileName(selectedFile.name);
    setImportResult(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Assume first sheet
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        // Convert to JSON
        const rows = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
        
        if (rows.length === 0) {
          alert('File appears to be empty.');
          setParsedData([]);
          return;
        }
        
        setParsedData(rows);
      } catch (err) {
        console.error('Parse error', err);
        alert('Error parsing file. Please ensure it is a valid Excel (.xlsx/.xls) or CSV file.');
      }
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  const handleDownloadTemplate = () => {
    const headers = ['firstName', 'lastName', 'emailId', 'mobileNo', 'gender', 'dateOfBirth', 'dateOfJoining', 'designation', 'department', 'qualification'];
    const sampleRow = {
      firstName: 'John', lastName: 'Doe', emailId: 'john@school.com', mobileNo: '9876543210', 
      gender: 'Male', dateOfBirth: '1990-01-15', dateOfJoining: '2024-04-01', 
      designation: 'Teacher', department: 'Mathematics', qualification: 'B.Ed'
    };

    const ws = XLSX.utils.json_to_sheet([sampleRow], { header: headers });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Staff");
    
    // Generate file and trigger download
    XLSX.writeFile(wb, "Staff_Import_Template.xlsx");
  };

  const handleSaveTeachers = async () => {
    if (parsedData.length === 0) {
      alert('No data to import. Please select a file first.');
      return;
    }
    setImporting(true);
    setImportResult(null);

    try {
      // Map parsed rows to staff fields intelligently
      const staffRows = parsedData.map(row => ({
        firstName: row.firstName || row['First Name'] || '',
        lastName: row.lastName || row['Last Name'] || '',
        emailId: row.emailId || row['Email'] || row.email || '',
        mobileNo: row.mobileNo || row['Mobile'] || row.mobile || '',
        gender: row.gender || row['Gender'] || 'Male',
        dateOfBirth: row.dateOfBirth || row['DOB'] || '',
        dateOfJoining: row.dateOfJoining || row['Date of Joining'] || '',
        designation: row.designation || row['Designation'] || '',
        department: row.department || row['Department'] || '',
        qualification: row.qualification || row['Qualification'] || '',
        userName: `SF${Date.now().toString().slice(-4)}${Math.floor(Math.random() * 100)}`,
        password: '12345678'
      }));

      let successCount = 0;
      let failCount = 0;
      const errors = [];

      for (const staff of staffRows) {
        try {
          const res = await fetch(`${API_BASE}/api/staffs`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(staff)
          });
          if (res.ok) {
            successCount++;
          } else {
            failCount++;
            const err = await res.json();
            errors.push(`${staff.firstName || 'Unknown'} ${staff.lastName || ''}: ${err.message}`);
          }
        } catch {
          failCount++;
          errors.push(`${staff.firstName || 'Unknown'} ${staff.lastName || ''}: Network error`);
        }
      }

      setImportResult({ successCount, failCount, errors });
    } catch (err) {
      alert('Import failed: ' + err.message);
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="import-staff-container">
      <div className="upload-header">
        <span className="upload-title">UPLOAD DATA OPTION</span>
        <label className="radio-label">
          <input type="radio" checked readOnly /> Excel / CSV To Online
        </label>
      </div>

      <div className="import-content">
        <h3 className="staff-details-title">STAFF DETAILS</h3>

        <div className="file-upload-section">
          <label className="file-label">Choose CSV/Excel file to upload</label>
          <div className="file-input-group">
            <input type="text" className="file-text-input" readOnly value={fileName} placeholder="No file selected" />
            <input
              type="file"
              ref={fileInputRef}
              accept=".csv,.xlsx,.xls"
              style={{ display: 'none' }}
              onChange={handleFileSelect}
            />
            <button className="select-file-btn" onClick={() => fileInputRef.current?.click()}>
              <Upload size={14} /> Select file
            </button>
          </div>
        </div>

        <div className="action-buttons-left">
          <button className="blue-btn" onClick={handleDownloadTemplate}>
            <Download size={16} /> Download Template
          </button>
        </div>

        {/* Preview Table */}
        {parsedData.length > 0 && (
          <div style={{ marginTop: '16px', overflowX: 'auto' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>
              <FileSpreadsheet size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
              Preview ({parsedData.length} rows found)
            </h4>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr>
                  <th style={{ padding: '6px 8px', backgroundColor: '#4a90d9', color: '#fff', textAlign: 'left', border: '1px solid #ddd' }}>#</th>
                  {Object.keys(parsedData[0]).map(key => (
                    <th key={key} style={{ padding: '6px 8px', backgroundColor: '#4a90d9', color: '#fff', textAlign: 'left', border: '1px solid #ddd', whiteSpace: 'nowrap' }}>
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {parsedData.slice(0, 20).map((row, idx) => (
                  <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? '#fff' : '#f8f9fa' }}>
                    <td style={{ padding: '4px 8px', border: '1px solid #eee' }}>{idx + 1}</td>
                    {Object.values(row).map((val, vi) => (
                      <td key={vi} style={{ padding: '4px 8px', border: '1px solid #eee', whiteSpace: 'nowrap' }}>{String(val).substring(0, 50)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {parsedData.length > 20 && (
              <p style={{ fontSize: '11px', color: '#888', marginTop: '4px' }}>Showing first 20 of {parsedData.length} rows</p>
            )}
          </div>
        )}

        {/* Import Result */}
        {importResult && (
          <div style={{ marginTop: '12px', padding: '12px', borderRadius: '6px', backgroundColor: importResult.failCount > 0 ? '#fff3cd' : '#d4edda', border: `1px solid ${importResult.failCount > 0 ? '#ffc107' : '#28a745'}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600 }}>
              {importResult.failCount > 0 ? <AlertCircle size={16} color="#856404" /> : <CheckCircle size={16} color="#155724" />}
              {importResult.successCount} imported successfully, {importResult.failCount} failed
            </div>
            {importResult.errors.length > 0 && (
              <ul style={{ margin: '8px 0 0 20px', fontSize: '11px', color: '#856404', maxHeight: '150px', overflowY: 'auto' }}>
                {importResult.errors.map((e, i) => <li key={i}>{e}</li>)}
              </ul>
            )}
          </div>
        )}

        <div className="action-buttons-center" style={{ marginTop: '20px' }}>
          <button className="blue-btn" onClick={handleSaveTeachers} disabled={importing || parsedData.length === 0}>
            <Save size={16} /> {importing ? 'Importing...' : `Save Teachers${parsedData.length > 0 ? ` (${parsedData.length})` : ''}`}
          </button>
        </div>
      </div>
    </div>
  );
}
