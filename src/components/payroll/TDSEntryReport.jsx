import React, { useState, useEffect } from 'react';
import {
  Eye, Download, Printer, Search, RefreshCw, CheckCircle,
  AlertCircle, Sparkles, DollarSign, Users, FileText,
  ChevronLeft, ChevronRight, ShieldCheck, Check, X
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function TDSEntryReport() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Filters matching mockup
  const [schoolName, setSchoolName] = useState('NAVALS NATIONAL ACADEMY');
  const [monthYear, setMonthYear] = useState('Aug-2026');
  const [allEmployees, setAllEmployees] = useState(true);
  const [showGrossSalary, setShowGrossSalary] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  const showNotif = (type, text) => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg(null), 4000);
  };

  const fetchTDSReport = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (monthYear && monthYear !== 'Please Select') params.append('monthYear', monthYear);
      if (searchTerm) params.append('search', searchTerm);
      if (allEmployees) params.append('allEmployees', 'true');

      const res = await fetch(`${API_BASE}/api/salary-structure/tds-entry-report?${params.toString()}`, { headers });
      if (res.ok) {
        const data = await res.json();
        setRecords(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error('Failed to load TDS entry report:', err);
      showNotif('error', 'Error loading TDS entry records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTDSReport();
  }, [monthYear]);

  const filteredRecords = records.filter(r => {
    if (!searchTerm) return true;
    const s = searchTerm.toLowerCase();
    return (
      (r.staffName && r.staffName.toLowerCase().includes(s)) ||
      (r.employeeId && r.employeeId.toLowerCase().includes(s)) ||
      (r.panNumber && r.panNumber.toLowerCase().includes(s)) ||
      (r.challanNo && r.challanNo.toLowerCase().includes(s))
    );
  });

  const totalTds = filteredRecords.reduce((s, r) => s + (r.tdsAmount || 0), 0);
  const totalCess = filteredRecords.reduce((s, r) => s + (r.cess || 0), 0);
  const grandTax = totalTds + totalCess;
  const totalGross = filteredRecords.reduce((s, r) => s + (r.grossSalary || 0), 0);

  const exportCSV = () => {
    if (!filteredRecords.length) return;
    const hdrs = [
      '#', 'Emp ID', 'Staff Name', 'PAN Number', 'Department', 'Designation',
      'Staff Type', 'Month-Year', 'Gross Salary', 'Taxable Income',
      'TDS Deducted', 'Cess (4%)', 'Total Tax Deposited', 'Challan No', 'BSR Code', 'Status'
    ];
    const rows = filteredRecords.map((r, i) => [
      i + 1,
      `"${r.employeeId || ''}"`,
      `"${r.staffName || ''}"`,
      `"${r.panNumber || ''}"`,
      `"${r.department || ''}"`,
      `"${r.designation || ''}"`,
      `"${r.staffType || ''}"`,
      `"${r.monthYear || ''}"`,
      r.grossSalary || 0,
      r.taxableSalary || 0,
      r.tdsAmount || 0,
      r.cess || 0,
      r.totalTax || (r.tdsAmount || 0) + (r.cess || 0),
      `"${r.challanNo || ''}"`,
      `"${r.bsrCode || ''}"`,
      `"${r.status || 'Deposited'}"`
    ]);

    const csv = 'data:text/csv;charset=utf-8,' + [hdrs.join(','), ...rows.map(r => r.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', `TDS_Entry_Report_${monthYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 140px)', backgroundColor: '#f8fafc', margin: '-20px' }}>
      
      {/* NOTIFICATION */}
      {statusMsg && (
        <div style={{
          position: 'fixed', top: '20px', right: '20px', zIndex: 9999,
          padding: '12px 20px', borderRadius: '8px', display: 'flex',
          alignItems: 'center', gap: '10px', fontWeight: '600', fontSize: '13px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          background: statusMsg.type === 'success' ? '#ecfdf5' : '#fef2f2',
          color: statusMsg.type === 'success' ? '#065f46' : '#991b1b',
          border: `1px solid ${statusMsg.type === 'success' ? '#6ee7b7' : '#fca5a5'}`
        }}>
          {statusMsg.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />} {statusMsg.text}
        </div>
      )}

      {/* LEFT FILTER SIDEBAR */}
      {isSidebarOpen && (
        <div style={{
          width: '310px', backgroundColor: 'white', padding: '24px',
          borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column',
          gap: '18px', overflowY: 'auto', flexShrink: 0, boxShadow: '2px 0 8px rgba(0,0,0,0.02)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#1e293b' }}>
              TDS Report Filter
            </h3>
            <span style={{ fontSize: '11px', color: '#64748b', background: '#f1f5f9', padding: '2px 8px', borderRadius: '10px' }}>Section 192</span>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>School Name</label>
            <select
              value={schoolName}
              onChange={e => setSchoolName(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: 'white' }}
            >
              <option value="NAVALS NATIONAL ACADEMY">NAVALS NATIONAL ACADEMY</option>
              <option value="AYUP TECH MEMORIAL CAMPUS">AYUP TECH MEMORIAL CAMPUS</option>
            </select>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Month-Year</label>
            <select
              value={monthYear}
              onChange={e => setMonthYear(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: 'white' }}
            >
              <option value="Aug-2026">Aug-2026</option>
              <option value="Jul-2026">Jul-2026</option>
              <option value="Jun-2026">Jun-2026</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '14px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: '#334155', fontWeight: '500' }}>
              <input
                type="checkbox"
                checked={allEmployees}
                onChange={e => setAllEmployees(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: '#159BD7' }}
              />
              All Employee(s)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: '#334155', fontWeight: '500' }}>
              <input
                type="checkbox"
                checked={showGrossSalary}
                onChange={e => setShowGrossSalary(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: '#159BD7' }}
              />
              Show Gross Salary
            </label>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button
              onClick={fetchTDSReport}
              style={{
                flex: 1, backgroundColor: '#159BD7', color: 'white', border: 'none',
                padding: '10px 18px', borderRadius: '6px', display: 'flex',
                alignItems: 'center', justifyContent: 'center', gap: '6px',
                cursor: 'pointer', fontWeight: '600', fontSize: '13px',
                boxShadow: '0 2px 6px rgba(21, 155, 215, 0.3)'
              }}
            >
              <Eye size={16} /> Show
            </button>
            <button
              onClick={() => {
                setMonthYear('Aug-2026');
                setSearchTerm('');
                setAllEmployees(true);
                setShowGrossSalary(true);
                fetchTDSReport();
              }}
              style={{
                backgroundColor: 'white', color: '#64748b', border: '1px solid #cbd5e1',
                padding: '10px 16px', borderRadius: '6px', cursor: 'pointer',
                fontWeight: '600', fontSize: '13px'
              }}
            >
              Reset
            </button>
          </div>
        </div>
      )}

      {/* COLLAPSIBLE TOGGLE BUTTON */}
      <div style={{ position: 'relative', width: '0px' }}>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          style={{
            position: 'absolute', top: '24px', left: '-12px', width: '24px', height: '44px',
            backgroundColor: 'white', border: '1px solid #cbd5e1', borderRadius: '4px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', zIndex: 100, boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
          }}
          title={isSidebarOpen ? "Collapse Filter" : "Expand Filter"}
        >
          {isSidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>

      {/* RIGHT CONTENT AREA */}
      <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* HEADER BANNER */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '20px 24px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#159BD7', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {schoolName} • STATUTORY TAX COMPLIANCE
            </div>
            <h2 style={{ margin: '4px 0 0', fontSize: '20px', fontWeight: '700', color: '#0f172a' }}>
              TDS Entry Schedule Report ({monthYear})
            </h2>
            <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#64748b' }}>
              Tax Deducted at Source on Salary payments under <strong>Section 192</strong> of the Income Tax Act
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={exportCSV}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 18px',
                background: '#159BD7', color: 'white', border: 'none', borderRadius: '6px',
                fontWeight: '600', cursor: 'pointer', fontSize: '13px'
              }}
            >
              <Download size={16} /> Export TDS CSV
            </button>
            <button
              onClick={handlePrint}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 18px',
                background: 'white', color: '#334155', border: '1px solid #cbd5e1', borderRadius: '6px',
                fontWeight: '600', cursor: 'pointer', fontSize: '13px'
              }}
            >
              <Printer size={16} /> Print Schedule
            </button>
          </div>
        </div>

        {/* KPI CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {[
            { label: 'TDS Deductees', val: filteredRecords.length, icon: <Users size={20} color="#159BD7" />, bg: '#eff6ff' },
            { label: 'Total Tax Deposited', val: `₹${grandTax.toLocaleString('en-IN')}`, icon: <DollarSign size={20} color="#16a34a" />, bg: '#f0fdf4' },
            { label: 'Base TDS Amount', val: `₹${totalTds.toLocaleString('en-IN')}`, icon: <FileText size={20} color="#d97706" />, bg: '#fef3c7' },
            { label: '4% Cess Sum', val: `₹${totalCess.toLocaleString('en-IN')}`, icon: <ShieldCheck size={20} color="#9333ea" />, bg: '#fdf4ff' }
          ].map((c, i) => (
            <div key={i} style={{ background: 'white', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {c.icon}
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '500' }}>{c.label}</div>
                <div style={{ fontSize: '17px', fontWeight: '700', color: '#0f172a' }}>{c.val}</div>
              </div>
            </div>
          ))}
        </div>

        {/* DATA TABLE */}
        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>
              TDS Remittance Register ({filteredRecords.length} Staff Records)
            </div>
            <div style={{ position: 'relative', width: '260px' }}>
              <Search size={15} style={{ position: 'absolute', left: '10px', top: '9px', color: '#94a3b8' }} />
              <input
                type="text"
                placeholder="Filter staff, ID, PAN or challan..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '7px 12px 7px 32px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading TDS entry records...</div>
          ) : filteredRecords.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>No TDS entry records found for the selected month.</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', color: '#475569', borderBottom: '2px solid #e2e8f0', fontWeight: '700' }}>
                    <th style={{ padding: '12px 14px' }}>#</th>
                    <th style={{ padding: '12px 14px' }}>Emp ID</th>
                    <th style={{ padding: '12px 14px' }}>Staff Name</th>
                    <th style={{ padding: '12px 14px' }}>PAN Number</th>
                    <th style={{ padding: '12px 14px' }}>Department</th>
                    {showGrossSalary && <th style={{ padding: '12px 14px', textAlign: 'right' }}>Gross Salary</th>}
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>Taxable Base</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>TDS (₹)</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>Cess (4%)</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>Total Deposited</th>
                    <th style={{ padding: '12px 14px' }}>Challan No / BSR</th>
                    <th style={{ padding: '12px 14px' }}>Deposit Date</th>
                    <th style={{ padding: '12px 14px', textAlign: 'center' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((r, i) => {
                    const isAyup = r.staffName?.toLowerCase().includes('ayup');
                    const cess = r.cess || Math.round((r.tdsAmount || 0) * 0.04);
                    const totalTax = r.totalTax || (r.tdsAmount || 0) + cess;

                    return (
                      <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', background: isAyup ? 'rgba(21, 155, 215, 0.03)' : 'white' }}>
                        <td style={{ padding: '12px 14px', color: '#64748b' }}>{i + 1}</td>
                        <td style={{ padding: '12px 14px', fontWeight: '700', color: '#159BD7' }}>
                          {r.employeeId || `EMP-${i + 1}`}
                        </td>
                        <td style={{ padding: '12px 14px', fontWeight: '600', color: '#0f172a' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            {r.staffName}
                            {isAyup && (
                              <span style={{ fontSize: '10px', background: '#dbeafe', color: '#1e40af', padding: '1px 6px', borderRadius: '4px', fontWeight: '700' }}>
                                AYUP
                              </span>
                            )}
                          </div>
                          <span style={{ fontSize: '11px', color: '#64748b' }}>{r.designation}</span>
                        </td>
                        <td style={{ padding: '12px 14px', fontFamily: 'monospace', fontWeight: '700', color: '#334155' }}>
                          {r.panNumber || 'AYUPT1234K'}
                        </td>
                        <td style={{ padding: '12px 14px', color: '#475569' }}>{r.department}</td>
                        {showGrossSalary && (
                          <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: '600' }}>
                            ₹{(r.grossSalary || 0).toLocaleString('en-IN')}
                          </td>
                        )}
                        <td style={{ padding: '12px 14px', textAlign: 'right', color: '#475569' }}>
                          ₹{(r.taxableSalary || 0).toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: '700', color: '#dc2626' }}>
                          ₹{(r.tdsAmount || 0).toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', color: '#7c3aed' }}>
                          ₹{cess.toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: '800', color: '#0f172a' }}>
                          ₹{totalTax.toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '12px 14px', fontSize: '11px' }}>
                          <span style={{ fontWeight: '600', color: '#0284c7' }}>{r.challanNo || 'CHL-202608-01'}</span>
                          <div style={{ color: '#64748b' }}>BSR: {r.bsrCode || '0210042'}</div>
                        </td>
                        <td style={{ padding: '12px 14px', fontSize: '11px', color: '#64748b' }}>
                          {r.depositDate ? new Date(r.depositDate).toLocaleDateString('en-GB') : '07-Sep-2026'}
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                          <span style={{
                            padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '700',
                            background: '#dcfce7', color: '#15803d'
                          }}>
                            {r.status || 'Deposited'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr style={{ background: '#f8fafc', fontWeight: '800', borderTop: '2px solid #cbd5e1' }}>
                    <td colSpan={showGrossSalary ? 5 : 4} style={{ padding: '14px', textAlign: 'right', color: '#0f172a' }}>
                      TOTALS ({filteredRecords.length} Staff):
                    </td>
                    {showGrossSalary && (
                      <td style={{ padding: '14px', textAlign: 'right', color: '#0f172a' }}>
                        ₹{totalGross.toLocaleString('en-IN')}
                      </td>
                    )}
                    <td style={{ padding: '14px', textAlign: 'right' }}>-</td>
                    <td style={{ padding: '14px', textAlign: 'right', color: '#dc2626' }}>
                      ₹{totalTds.toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '14px', textAlign: 'right', color: '#7c3aed' }}>
                      ₹{totalCess.toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '14px', textAlign: 'right', color: '#16a34a', fontSize: '13px' }}>
                      ₹{grandTax.toLocaleString('en-IN')}
                    </td>
                    <td colSpan={3} style={{ padding: '14px', color: '#64748b', fontSize: '11px' }}>
                      OLTAS Central Tax Challan Verified
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
