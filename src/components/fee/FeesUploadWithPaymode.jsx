import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  FileSpreadsheet, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Trash2, 
  ArrowRight,
  Info
} from 'lucide-react';
import * as XLSX from 'xlsx';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function FeesUploadWithPaymode() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [parsedRows, setParsedRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const fileInputRef = useRef(null);

  // Download Sample Excel Template
  const handleDownloadSample = async () => {
    try {
      // First try to fetch from backend
      const res = await fetch(`${API_BASE}/api/fee-transactions/sample-template`);
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Student_Fee_Upload_Sample_Template.xlsx';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        return;
      }
    } catch {
      console.warn('Backend template download failed, using client-side generator');
    }

    // Fallback client-side generation
    const sampleData = [
      {
        'Admission No': 'NS-1001',
        'Student Name': 'Aarav Sharma',
        'Class': 'Class - X',
        'Amount Paid': 15000,
        'Payment Mode': 'Cash',
        'Receipt Date': '2026-08-15',
        'Receipt No': 'REC-1001',
        'Bank / Reference No': '',
        'Remarks': 'Quarter 1 Fee'
      },
      {
        'Admission No': 'NS-1002',
        'Student Name': 'Ananya Singh',
        'Class': 'Class - VIII',
        'Amount Paid': 12500,
        'Payment Mode': 'UPI',
        'Receipt Date': '2026-08-16',
        'Receipt No': 'REC-1002',
        'Bank / Reference No': 'UPI9876543210',
        'Remarks': 'Admission Installment'
      },
      {
        'Admission No': 'NS-1003',
        'Student Name': 'Rohan Patel',
        'Class': 'Class - V',
        'Amount Paid': 9000,
        'Payment Mode': 'Cheque',
        'Receipt Date': '2026-08-20',
        'Receipt No': 'REC-1003',
        'Bank / Reference No': 'CHQ-554421',
        'Remarks': 'HDFC Cheque'
      }
    ];

    const ws = XLSX.utils.json_to_sheet(sampleData);
    ws['!cols'] = [
      { wch: 15 }, { wch: 20 }, { wch: 15 }, { wch: 15 }, 
      { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 22 }, { wch: 25 }
    ];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Fee_Upload_Template');
    XLSX.writeFile(wb, 'Student_Fee_Upload_Sample_Template.xlsx');
  };

  // Handle File Change
  const handleFileChange = (selectedFile) => {
    if (!selectedFile) return;

    setErrorMessage('');
    setUploadResult(null);
    setFile(selectedFile);
    setFileName(selectedFile.name);

    // Read and parse preview locally
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
        
        if (json.length === 0) {
          setErrorMessage('Selected Excel file is empty.');
          setParsedRows([]);
        } else {
          setParsedRows(json);
        }
      } catch (err) {
        console.error('Error reading Excel file:', err);
        setErrorMessage('Failed to read Excel file. Please ensure it is a valid .xlsx, .xls, or .csv file.');
      }
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  // Clear File
  const handleClear = () => {
    setFile(null);
    setFileName('');
    setParsedRows([]);
    setUploadResult(null);
    setErrorMessage('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Upload to Database API
  const handleUploadSubmit = async () => {
    if (!file) {
      setErrorMessage('Please select an Excel file first.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setUploadResult(null);

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch(`${API_BASE}/api/fee-transactions/upload-excel`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to upload fee data.');
      }

      setUploadResult(data);
    } catch (err) {
      console.error('Upload error:', err);
      setErrorMessage(err.message || 'An error occurred during upload.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px', background: '#f8fafc', minHeight: '100%' }}>
      
      {/* Top Header Card */}
      <div style={{
        background: '#fff',
        borderRadius: '8px',
        padding: '20px 24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        border: '1px solid #e2e8f0',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', margin: 0 }}>
            Student Fee Bulk Excel Upload
          </h2>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
            Upload paid fee records for students using an Excel or CSV spreadsheet.
          </p>
        </div>

        <button
          onClick={handleDownloadSample}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            color: '#166534',
            padding: '9px 16px',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#dcfce7'}
          onMouseLeave={e => e.currentTarget.style.background = '#f0fdf4'}
        >
          <Download size={16} />
          Download Sample Template (.xlsx)
        </button>
      </div>

      {/* Upload Zone Card */}
      <div style={{
        background: '#fff',
        borderRadius: '8px',
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        border: '1px solid #e2e8f0',
        marginBottom: '24px'
      }}>
        <div
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={e => {
            e.preventDefault();
            setDragOver(false);
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
              handleFileChange(e.dataTransfer.files[0]);
            }
          }}
          style={{
            border: `2px dashed ${dragOver ? '#29a9d8' : '#cbd5e1'}`,
            background: dragOver ? '#f0f9ff' : '#fafafa',
            borderRadius: '8px',
            padding: '36px 20px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={e => e.target.files && handleFileChange(e.target.files[0])}
            accept=".xlsx, .xls, .csv"
            style={{ display: 'none' }}
          />

          <div style={{ display: 'inline-flex', padding: '14px', borderRadius: '50%', background: '#e0f2fe', color: '#0284c7', marginBottom: '12px' }}>
            <UploadCloud size={32} />
          </div>

          <div style={{ fontSize: '15px', fontWeight: '600', color: '#1e293b', marginBottom: '4px' }}>
            {fileName ? fileName : 'Click to upload or drag & drop Excel file'}
          </div>
          
          <div style={{ fontSize: '12px', color: '#64748b' }}>
            Supports .XLSX, .XLS, .CSV files (Max size: 20MB)
          </div>
        </div>

        {/* Selected file actions */}
        {file && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FileSpreadsheet size={20} color="#059669" />
              <div>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>{fileName}</span>
                <span style={{ fontSize: '12px', color: '#64748b', marginLeft: '8px' }}>
                  ({parsedRows.length} records detected)
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleClear}
                disabled={loading}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#fff',
                  border: '1px solid #cbd5e1',
                  color: '#64748b',
                  padding: '8px 14px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                <Trash2 size={14} /> Clear
              </button>

              <button
                onClick={handleUploadSubmit}
                disabled={loading || parsedRows.length === 0}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: loading ? '#94a3b8' : '#29a9d8',
                  border: 'none',
                  color: '#fff',
                  padding: '8px 20px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 2px 4px rgba(41, 169, 216, 0.3)'
                }}
              >
                {loading ? (
                  <>
                    <RefreshCw size={15} style={{ animation: 'spin 1s linear infinite' }} />
                    Processing Excel...
                  </>
                ) : (
                  <>
                    <ArrowRight size={15} />
                    Upload & Save to Database ({parsedRows.length})
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Error Notification */}
        {errorMessage && (
          <div style={{
            marginTop: '16px',
            padding: '12px 16px',
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: '#b91c1c',
            fontSize: '13px'
          }}>
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Upload Success & Stats Card */}
        {uploadResult && (
          <div style={{
            marginTop: '20px',
            padding: '18px 20px',
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '8px',
            color: '#166534'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <CheckCircle2 size={22} color="#16a34a" />
              <span style={{ fontSize: '15px', fontWeight: '700' }}>
                {uploadResult.message}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', fontSize: '13px', marginTop: '8px' }}>
              <div style={{ background: '#fff', padding: '8px 14px', borderRadius: '6px', border: '1px solid #bbf7d0' }}>
                Total Rows: <strong>{uploadResult.stats?.totalRows}</strong>
              </div>
              <div style={{ background: '#fff', padding: '8px 14px', borderRadius: '6px', border: '1px solid #bbf7d0', color: '#15803d' }}>
                ✅ Successfully Uploaded: <strong>{uploadResult.stats?.successfulCount}</strong>
              </div>
              {uploadResult.stats?.failedCount > 0 && (
                <div style={{ background: '#fff', padding: '8px 14px', borderRadius: '6px', border: '1px solid #fecaca', color: '#b91c1c' }}>
                  ⚠️ Failed / Skipped: <strong>{uploadResult.stats?.failedCount}</strong>
                </div>
              )}
            </div>

            {/* List Failed Rows if any */}
            {uploadResult.failed && uploadResult.failed.length > 0 && (
              <div style={{ marginTop: '16px', background: '#fff', borderRadius: '6px', border: '1px solid #fecaca', padding: '12px' }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#991b1b', marginBottom: '8px' }}>
                  Errors in {uploadResult.failed.length} Row(s):
                </div>
                <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                  <table style={{ width: '100%', fontSize: '11.5px', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: '#fef2f2', color: '#991b1b', textAlign: 'left' }}>
                        <th style={{ padding: '6px 8px' }}>Row #</th>
                        <th style={{ padding: '6px 8px' }}>Admission No</th>
                        <th style={{ padding: '6px 8px' }}>Student Name</th>
                        <th style={{ padding: '6px 8px' }}>Reason</th>
                      </tr>
                    </thead>
                    <tbody>
                      {uploadResult.failed.map((f, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid #fecaca' }}>
                          <td style={{ padding: '6px 8px', fontWeight: '600' }}>{f.row}</td>
                          <td style={{ padding: '6px 8px' }}>{f.admissionNo}</td>
                          <td style={{ padding: '6px 8px' }}>{f.studentName}</td>
                          <td style={{ padding: '6px 8px', color: '#b91c1c' }}>{f.reason}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Excel Data Preview Table */}
      {parsedRows.length > 0 && (
        <div style={{
          background: '#fff',
          borderRadius: '8px',
          padding: '20px 24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>
                Excel File Preview ({parsedRows.length} Rows)
              </span>
              <span style={{ fontSize: '11px', background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: '12px', fontWeight: '600' }}>
                Ready to Process
              </span>
            </div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>
              Showing first {Math.min(parsedRows.length, 50)} rows
            </div>
          </div>

          <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', color: '#475569', borderBottom: '1px solid #cbd5e1' }}>
                  <th style={{ padding: '10px 12px', textAlign: 'center', width: '50px' }}>#</th>
                  {Object.keys(parsedRows[0] || {}).map((header, idx) => (
                    <th key={idx} style={{ padding: '10px 12px', textAlign: 'left', fontWeight: '600', whiteSpace: 'nowrap' }}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {parsedRows.slice(0, 50).map((row, idx) => (
                  <tr 
                    key={idx} 
                    style={{ 
                      borderBottom: '1px solid #f1f5f9',
                      background: idx % 2 === 0 ? '#fff' : '#fafafa'
                    }}
                  >
                    <td style={{ padding: '8px 12px', textAlign: 'center', color: '#94a3b8', fontWeight: '600' }}>
                      {idx + 1}
                    </td>
                    {Object.keys(parsedRows[0] || {}).map((header, colIdx) => (
                      <td key={colIdx} style={{ padding: '8px 12px', color: '#334155', whiteSpace: 'nowrap' }}>
                        {String(row[header] !== undefined ? row[header] : '')}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Information / Instruction Box */}
      <div style={{
        marginTop: '24px',
        padding: '16px 20px',
        background: '#eff6ff',
        border: '1px solid #bfdbfe',
        borderRadius: '8px',
        display: 'flex',
        gap: '12px',
        fontSize: '12.5px',
        color: '#1e40af'
      }}>
        <Info size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <div style={{ fontWeight: '700', marginBottom: '4px' }}>
            Important Guidelines for Excel Upload:
          </div>
          <ul style={{ margin: 0, paddingLeft: '18px', lineHeight: '1.6' }}>
            <li>Har student ka <strong>Admission No / Scholar No</strong> ya Roll No + Class match hona zaroori hai.</li>
            <li><strong>Amount Paid</strong> 0 se bada number hona chahiye.</li>
            <li><strong>Payment Mode</strong> me Cash, UPI, Cheque, Bank Transfer, DD me se koi bhi value ho sakti hai.</li>
            <li>Upload hote hi <code>FeeReceipt</code> generate ho jayegi aur student ka <code>StudentFeeLedger</code> (Total Paid / Remaining Dues) update ho jayega.</li>
          </ul>
        </div>
      </div>

    </div>
  );
}
