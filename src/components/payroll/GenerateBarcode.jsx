import React, { useState, useEffect, useRef } from 'react';
import { Eye, X, Printer, Download, RefreshCw, AlertCircle, CheckCircle, Barcode, CheckSquare } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// Visual SVG Barcode Generator (Code 128 style pattern)
function VisualBarcode({ value, height = 36, width = 140 }) {
  if (!value) return <span style={{ color: '#94a3b8', fontSize: '11px' }}>No Barcode</span>;

  // Generate deterministic bar widths based on character charcodes
  const bars = [];
  let totalX = 4;
  for (let i = 0; i < value.length; i++) {
    const code = value.charCodeAt(i);
    const pattern = [(code % 3) + 1, ((code >> 1) % 3) + 1, ((code >> 2) % 2) + 1, 2];
    pattern.forEach((w, idx) => {
      if (idx % 2 === 0) {
        bars.push(<rect key={`${i}-${idx}`} x={totalX} y={2} width={w} height={height - 12} fill="#0f172a" />);
      }
      totalX += w + 1;
    });
  }

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', background: '#fff', padding: '4px 6px', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
      <svg width={Math.max(width, totalX + 8)} height={height - 8} style={{ display: 'block' }}>
        {bars}
      </svg>
      <span style={{ fontSize: '10px', fontFamily: 'monospace', fontWeight: '700', color: '#0f172a', letterSpacing: '1px', marginTop: '2px' }}>
        *{value}*
      </span>
    </div>
  );
}

export default function GenerateBarcode() {
  const [bankAccounts, setBankAccounts] = useState([]);
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [allStaff, setAllStaff] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [selectedStaffIds, setSelectedStaffIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  // Filters
  const [selectedAccount, setSelectedAccount] = useState('');
  const [selectedEmployeeType, setSelectedEmployeeType] = useState('');
  const [tableSearch, setTableSearch] = useState('');

  // Pagination
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Print Label Modal State
  const [printModalStaff, setPrintModalStaff] = useState(null);

  // Status Notification
  const [statusMessage, setStatusMessage] = useState(null);

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  const showNotification = (type, text) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const [accRes, typeRes, staffRes] = await Promise.all([
        fetch(`${API_BASE}/api/salary-accounts`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${API_BASE}/api/staff-types`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${API_BASE}/api/staffs`, { headers: { 'Authorization': `Bearer ${token}` } })
      ]);

      if (accRes.ok) setBankAccounts(await accRes.json());
      if (typeRes.ok) setEmployeeTypes(await typeRes.json());
      if (staffRes.ok) {
        const sList = await staffRes.json();
        const arr = Array.isArray(sList) ? sList : [];
        setAllStaff(arr);
        setStaffList(arr);
      }
    } catch (err) {
      console.error('Error fetching barcode data:', err);
      showNotification('error', 'Server error while loading staff data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter Unique Options
  const uniqueAccounts = Array.from(new Set([
    ...bankAccounts.map(a => a.accountName || a.accountNo || a.bank).filter(Boolean),
    ...allStaff.map(s => s.salaryAccount).filter(Boolean)
  ])).sort();

  const uniqueEmployeeTypes = Array.from(new Set([
    ...employeeTypes.map(t => t.type || t.staffType || t.name).filter(Boolean),
    ...allStaff.map(s => s.staffType).filter(Boolean)
  ])).sort();

  // Filter Handler
  const handleView = () => {
    let filtered = [...allStaff];
    if (selectedAccount && selectedAccount !== 'All') {
      filtered = filtered.filter(s => 
        (s.salaryAccount || '').toLowerCase().includes(selectedAccount.toLowerCase()) ||
        (s.bankName || '').toLowerCase().includes(selectedAccount.toLowerCase())
      );
    }
    if (selectedEmployeeType && selectedEmployeeType !== 'All') {
      filtered = filtered.filter(s => s.staffType === selectedEmployeeType);
    }
    setStaffList(filtered);
    setSelectedStaffIds([]);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSelectedAccount('');
    setSelectedEmployeeType('');
    setStaffList(allStaff);
    setSelectedStaffIds([]);
    setTableSearch('');
    setCurrentPage(1);
    setStatusMessage(null);
  };

  // Generate Barcode API Call
  const handleGenerateBarcodes = async () => {
    const targetIds = selectedStaffIds.length > 0 ? selectedStaffIds : staffList.map(s => s._id);
    if (targetIds.length === 0) {
      showNotification('error', 'No staff found to generate barcode.');
      return;
    }

    try {
      setGenerating(true);
      const res = await fetch(`${API_BASE}/api/staffs/bulk/generate-barcode`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ staffIds: targetIds })
      });

      if (res.ok) {
        showNotification('success', `Barcodes generated successfully for ${targetIds.length} staff member(s)!`);
        // Refresh staff list
        const refreshRes = await fetch(`${API_BASE}/api/staffs`, { headers: { 'Authorization': `Bearer ${token}` } });
        if (refreshRes.ok) {
          const arr = await refreshRes.json();
          setAllStaff(arr);
          setStaffList(arr);
        }
      } else {
        const err = await res.json();
        showNotification('error', err.message || 'Failed to generate barcodes');
      }
    } catch (err) {
      console.error('Error generating barcodes:', err);
      showNotification('error', 'Server error while generating barcodes');
    } finally {
      setGenerating(false);
    }
  };

  // Print Barcode Sheet
  const handlePrintSheet = (staffListToPrint) => {
    const printWindow = window.open('', '_blank');
    const items = staffListToPrint && staffListToPrint.length > 0 ? staffListToPrint : (selectedStaffIds.length > 0 ? allStaff.filter(s => selectedStaffIds.includes(s._id)) : staffList);

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Staff Barcode Labels - Noval School</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; background: #fff; }
          .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }
          .label-card { border: 1px dashed #475569; padding: 12px; border-radius: 6px; text-align: center; page-break-inside: avoid; }
          .school-title { font-size: 11px; font-weight: bold; color: #1e293b; text-transform: uppercase; margin-bottom: 4px; }
          .staff-name { font-size: 13px; font-weight: 700; color: #0284c7; margin-bottom: 2px; }
          .staff-meta { font-size: 11px; color: #64748b; margin-bottom: 8px; }
          .barcode-box { background: #f8fafc; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px; display: inline-block; }
          .barcode-val { font-family: monospace; font-weight: bold; font-size: 12px; letter-spacing: 2px; margin-top: 4px; }
          @media print {
            body { padding: 0; }
            button { display: none; }
          }
        </style>
      </head>
      <body>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <h2 style="margin: 0; font-size: 18px; color: #1e293b;">STAFF BARCODE IDENTIFICATION LABELS (${items.length})</h2>
          <button onclick="window.print()" style="padding: 8px 16px; background: #0284c7; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">Print Now</button>
        </div>
        <div class="grid">
          ${items.map(s => {
            const fullName = `${s.firstName || ''} ${s.lastName || ''}`.trim();
            const bVal = s.barcode || `STF-${s.empNo || s.userName || s._id.toString().slice(-4)}`;
            return `
              <div class="label-card">
                <div class="school-title">NOVAL PUBLIC SCHOOL</div>
                <div class="staff-name">${fullName}</div>
                <div class="staff-meta">${s.designation || 'Staff'} | Code: ${s.empNo || s.userName || '-'}</div>
                <div class="barcode-box">
                  <div style="font-family: monospace; font-size: 20px; font-weight: bold; letter-spacing: 4px;">|||| | ||| |||| |</div>
                  <div class="barcode-val">*${bVal}*</div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  // Export CSV
  const handleExportCSV = () => {
    if (staffList.length === 0) return;
    const csvRows = [
      ['Emp No', 'Staff Name', 'Employee Type', 'Designation', 'Mobile', 'Barcode Number'],
      ...staffList.map(s => {
        const fullName = `${s.firstName || ''} ${s.lastName || ''}`.trim();
        const bVal = s.barcode || `STF-${s.empNo || s.userName || s._id.toString().slice(-4)}`;
        return [
          s.empNo || s.userName || '',
          fullName,
          s.staffType || '',
          s.designation || '',
          s.contactNo || '',
          bVal
        ];
      })
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map(e => e.map(i => `"${i}"`).join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `staff_barcodes_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Table Search Filter
  const searchedStaff = staffList.filter(s => {
    const fullName = `${s.firstName || ''} ${s.middleName || ''} ${s.lastName || ''}`.toLowerCase();
    const empNo = (s.empNo || s.userName || '').toLowerCase();
    const desig = (s.designation || '').toLowerCase();
    const type = (s.staffType || '').toLowerCase();
    const barcode = (s.barcode || '').toLowerCase();
    const q = tableSearch.toLowerCase();
    return !tableSearch || fullName.includes(q) || empNo.includes(q) || desig.includes(q) || type.includes(q) || barcode.includes(q);
  });

  const totalPages = Math.ceil(searchedStaff.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const currentRows = searchedStaff.slice(startIndex, startIndex + pageSize);

  const areAllOnPageSelected = currentRows.length > 0 && currentRows.every(s => selectedStaffIds.includes(s._id));

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const pageStaffIds = currentRows.map(s => s._id);
      setSelectedStaffIds(prev => Array.from(new Set([...prev, ...pageStaffIds])));
    } else {
      const pageStaffIds = new Set(currentRows.map(s => s._id));
      setSelectedStaffIds(prev => prev.filter(id => !pageStaffIds.has(id)));
    }
  };

  const handleRowSelect = (id) => {
    setSelectedStaffIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="mail-template-container" style={{ padding: '20px' }}>
      {/* Alert Notifications */}
      {statusMessage && (
        <div style={{
          padding: '12px 20px',
          borderRadius: '6px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          backgroundColor: statusMessage.type === 'success' ? '#e8f5e9' : '#ffebee',
          color: statusMessage.type === 'success' ? '#2e7d32' : '#c62828',
          border: `1px solid ${statusMessage.type === 'success' ? '#a5d6a7' : '#ef9a9a'}`
        }}>
          {statusMessage.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          <span style={{ fontSize: '14px', fontWeight: '500' }}>{statusMessage.text}</span>
        </div>
      )}

      {/* Top Filter Card */}
      <div style={{ padding: '20px 30px', maxWidth: '800px', margin: '0 auto 25px auto', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        <div className="settings-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>School Account</label>
            <select 
              className="settings-input"
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            >
              <option value="">All Accounts</option>
              {uniqueAccounts.map((a, i) => <option key={i} value={a}>{a}</option>)}
            </select>
          </div>

          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>Employee Type</label>
            <select 
              className="settings-input"
              value={selectedEmployeeType}
              onChange={(e) => setSelectedEmployeeType(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            >
              <option value="">All Employee Types</option>
              {uniqueEmployeeTypes.map((t, i) => <option key={i} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
          <button 
            onClick={handleView}
            disabled={loading}
            style={{ 
              backgroundColor: 'white', 
              color: '#159BD7', 
              border: '1px solid #159BD7', 
              padding: '8px 24px', 
              borderRadius: '6px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px', 
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: '600'
            }}
          >
            <Eye size={16} /> {loading ? 'Loading...' : 'View'}
          </button>
          <button 
            onClick={handleReset}
            style={{ 
              backgroundColor: 'white', 
              color: '#ff9800', 
              border: '1px solid #ff9800', 
              padding: '8px 24px', 
              borderRadius: '6px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px', 
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            <X size={16} /> Reset
          </button>
        </div>
      </div>

      {/* Main Barcode Table Section */}
      <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        {/* Action Header */}
        <div style={{
          background: '#f1f5f9',
          padding: '16px 20px',
          borderRadius: '6px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '15px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Barcode size={20} color="#0284c7" />
            <span style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>
              STAFF BARCODES ({searchedStaff.length})
            </span>
            {selectedStaffIds.length > 0 && (
              <span style={{ fontSize: '12px', color: '#0369a1', backgroundColor: '#e0f2fe', padding: '2px 8px', borderRadius: '4px', fontWeight: '600' }}>
                {selectedStaffIds.length} Selected
              </span>
            )}
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={handleGenerateBarcodes}
              disabled={generating}
              style={{
                backgroundColor: '#0284c7',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: generating ? 'not-allowed' : 'pointer'
              }}
            >
              <RefreshCw className={generating ? 'animate-spin' : ''} size={15} /> 
              {generating ? 'Generating...' : `Generate Barcodes (${selectedStaffIds.length > 0 ? selectedStaffIds.length : 'All'})`}
            </button>

            <button
              onClick={() => handlePrintSheet()}
              style={{
                backgroundColor: 'white',
                color: '#159BD7',
                border: '1px solid #159BD7',
                padding: '8px 16px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
            >
              <Printer size={15} /> Print Labels
            </button>

            <button
              onClick={handleExportCSV}
              style={{
                backgroundColor: 'white',
                color: '#475569',
                border: '1px solid #cbd5e1',
                padding: '8px 16px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
            >
              <Download size={15} /> Export CSV
            </button>
          </div>
        </div>

        {/* Search Header */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#64748b' }}>Search:</span>
            <input 
              type="text"
              placeholder="Search by name, code, barcode..."
              value={tableSearch}
              onChange={(e) => { setTableSearch(e.target.value); setCurrentPage(1); }}
              style={{ padding: '6px 12px', borderRadius: '20px', border: '1px solid #cbd5e1', width: '240px' }}
            />
          </div>
        </div>

        {/* Table */}
        <div className="mail-table-wrapper" style={{ overflowX: 'auto' }}>
          <table className="mail-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ width: '45px', textAlign: 'center', padding: '12px' }}>
                  <input 
                    type="checkbox"
                    checked={areAllOnPageSelected}
                    onChange={handleSelectAll}
                    style={{ cursor: 'pointer', width: '16px', height: '16px' }}
                  />
                </th>
                <th style={{ width: '60px', textAlign: 'center', padding: '12px', fontSize: '13px', color: '#475569' }}>Sr. No.</th>
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', color: '#475569' }}>Emp No.</th>
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', color: '#475569' }}>Staff Name</th>
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', color: '#475569' }}>Staff Type</th>
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', color: '#475569' }}>Designation</th>
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', color: '#475569' }}>Mobile</th>
                <th style={{ textAlign: 'center', padding: '12px', fontSize: '13px', color: '#475569' }}>Barcode</th>
                <th style={{ textAlign: 'center', padding: '12px', fontSize: '13px', color: '#475569' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                    <RefreshCw className="animate-spin" size={24} style={{ display: 'inline-block', marginBottom: '8px' }} />
                    <div>Loading staff barcodes...</div>
                  </td>
                </tr>
              ) : currentRows.length === 0 ? (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
                    No staff records found matching criteria.
                  </td>
                </tr>
              ) : (
                currentRows.map((staff, idx) => {
                  const isChecked = selectedStaffIds.includes(staff._id);
                  const fullName = `${staff.firstName || ''} ${staff.middleName ? staff.middleName + ' ' : ''}${staff.lastName || ''}`.trim();
                  const isAyup = (staff.firstName && staff.firstName.toLowerCase().includes('ayup')) || (staff.userName === 'SF072');
                  const barcodeValue = staff.barcode || `STF-${staff.empNo || staff.userName || staff._id.toString().slice(-4)}`;

                  return (
                    <tr 
                      key={staff._id} 
                      style={{ 
                        backgroundColor: isChecked ? '#f0f9ff' : (idx % 2 === 0 ? '#ffffff' : '#f8fafc'), 
                        borderBottom: '1px solid #f1f5f9' 
                      }}
                    >
                      <td style={{ textAlign: 'center', padding: '10px' }}>
                        <input 
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleRowSelect(staff._id)}
                          style={{ cursor: 'pointer', width: '16px', height: '16px' }}
                        />
                      </td>
                      <td style={{ textAlign: 'center', padding: '10px', fontSize: '13px', color: '#64748b' }}>
                        {startIndex + idx + 1}
                      </td>
                      <td style={{ padding: '10px', fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>
                        {staff.empNo || staff.userName || '-'}
                      </td>
                      <td style={{ padding: '10px', fontSize: '13px', fontWeight: isAyup ? '700' : '600', color: isAyup ? '#0288d1' : '#1e293b' }}>
                        {fullName}
                        {isAyup && (
                          <span style={{ marginLeft: '8px', fontSize: '10px', backgroundColor: '#e1f5fe', color: '#0288d1', padding: '2px 6px', borderRadius: '4px', fontWeight: '600' }}>
                            Verified (Ayup Tech)
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '10px', fontSize: '13px', color: '#475569' }}>
                        {staff.staffType || '-'}
                      </td>
                      <td style={{ padding: '10px', fontSize: '13px', color: '#475569' }}>
                        {staff.designation || '-'}
                      </td>
                      <td style={{ padding: '10px', fontSize: '13px', color: '#64748b' }}>
                        {staff.contactNo || '-'}
                      </td>
                      <td style={{ textAlign: 'center', padding: '8px' }}>
                        <VisualBarcode value={barcodeValue} />
                      </td>
                      <td style={{ textAlign: 'center', padding: '10px' }}>
                        <button
                          onClick={() => handlePrintSheet([staff])}
                          style={{
                            border: '1px solid #0284c7',
                            background: 'white',
                            color: '#0284c7',
                            padding: '4px 10px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: '600',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          <Printer size={13} /> Print
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', color: '#64748b', fontSize: '13px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            Showing {searchedStaff.length === 0 ? 0 : startIndex + 1} to {Math.min(startIndex + pageSize, searchedStaff.length)} of {searchedStaff.length} entries
          </div>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              style={{ padding: '5px 12px', border: '1px solid #cbd5e1', borderRadius: '4px', background: currentPage === 1 ? '#f8fafc' : '#fff', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
            >
              Previous
            </button>
            <span style={{ padding: '5px 12px', backgroundColor: '#159BD7', color: 'white', borderRadius: '4px', fontWeight: '600' }}>
              {currentPage}
            </span>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              style={{ padding: '5px 12px', border: '1px solid #cbd5e1', borderRadius: '4px', background: currentPage === totalPages ? '#f8fafc' : '#fff', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
