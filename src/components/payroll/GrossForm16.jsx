import React, { useState, useEffect } from 'react';
import {
  Eye, Printer, Download, Search, RefreshCw, CheckCircle,
  AlertCircle, Sparkles, DollarSign, Users, FileText,
  ChevronLeft, ChevronRight, ShieldCheck, Award, Check, X, AlertTriangle
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function GrossForm16() {
  const [data, setData] = useState({ records: [], totals: {} });
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Filters matching mockup
  const [schoolName, setSchoolName] = useState('NAVALS NATIONAL ACADEMY');
  const [schoolBank, setSchoolBank] = useState('All Salary A/c');
  const [session, setSession] = useState('2026-2027');
  const [staffType, setStaffType] = useState('All (13)');
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

  const fetchGrossForm16 = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append('session', session);
      if (staffType && staffType !== 'All (13)') params.append('staffType', staffType);

      const res = await fetch(`${API_BASE}/api/salary-structure/gross-form16?${params.toString()}`, { headers });
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error('Failed to load Gross Form 16 data:', err);
      showNotif('error', 'Error loading Gross Form 16 records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGrossForm16();
  }, [session, staffType]);

  const filteredRecords = (data.records || []).filter(r => {
    if (!searchTerm) return true;
    const s = searchTerm.toLowerCase();
    return (
      (r.staffName && r.staffName.toLowerCase().includes(s)) ||
      (r.employeeId && r.employeeId.toLowerCase().includes(s)) ||
      (r.panNumber && r.panNumber.toLowerCase().includes(s))
    );
  });

  const exportCSV = () => {
    if (!filteredRecords.length) return;
    const hdrs = [
      '#', 'Emp ID', 'Staff Name', 'PAN Number', 'Department', 'Designation',
      'Annual Gross (Sec 17)', 'Sec 10 Exemptions', 'Std Ded (Sec 16ia)', 'Prof Tax (Sec 16iii)',
      'Gross Total Income', 'Sec 80C', 'Sec 80D', 'Total Chap VI-A', 'Taxable Income',
      'Computed Tax', 'Cess (4%)', 'Net Tax Payable', 'Annual TDS Deducted', 'Refund / Balance Due', 'Status'
    ];
    const rows = filteredRecords.map((r, i) => [
      i + 1,
      `"${r.employeeId || ''}"`,
      `"${r.staffName || ''}"`,
      `"${r.panNumber || ''}"`,
      `"${r.department || ''}"`,
      `"${r.designation || ''}"`,
      r.annualGross || 0,
      r.sec10Exempt || 0,
      r.stdDeduction || 0,
      r.profTax || 0,
      r.grossTotalIncome || 0,
      r.sec80C || 0,
      r.sec80D || 0,
      r.totalChapter6A || 0,
      r.taxableIncome || 0,
      r.taxOnIncome || 0,
      r.cess || 0,
      r.netTaxPayable || 0,
      r.annualTdsDeducted || 0,
      r.refundOrDue || 0,
      `"${r.status || ''}"`
    ]);

    const csv = 'data:text/csv;charset=utf-8,' + [hdrs.join(','), ...rows.map(r => r.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', `Gross_Form16_Register_${session}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  const handlePrintEmployeewise = () => {
    showNotif('success', `Generating printable employee-wise tax compute slips for ${filteredRecords.length} staff members...`);
    setTimeout(() => window.print(), 500);
  };

  const totals = data.totals || {};

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
              Gross Form 16
            </h3>
            <span style={{ fontSize: '11px', color: '#64748b', background: '#f1f5f9', padding: '2px 8px', borderRadius: '10px' }}>Section 17 & 80C</span>
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
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>School Bank</label>
            <select
              value={schoolBank}
              onChange={e => setSchoolBank(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: 'white' }}
            >
              <option value="All Salary A/c">All Salary A/c</option>
              <option value="HDFC Bank - 50100429188">HDFC Bank - 50100429188</option>
              <option value="SBI Bank - 30219847120">SBI Bank - 30219847120</option>
            </select>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Session / Financial Year</label>
            <select
              value={session}
              onChange={e => setSession(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: 'white' }}
            >
              <option value="2026-2027">2026-2027 (AY 2027-2028)</option>
              <option value="2025-2026">2025-2026 (AY 2026-2027)</option>
            </select>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Staff Type</label>
            <select
              value={staffType}
              onChange={e => setStaffType(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: 'white' }}
            >
              <option value="All (13)">All (13 Staff Types)</option>
              <option value="Teaching">Teaching Faculty</option>
              <option value="Non-Teaching">Non-Teaching Staff</option>
              <option value="Technical">Technical & Lab</option>
            </select>
          </div>

          {/* MOCKUP NOTE */}
          <div style={{
            background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px',
            padding: '12px', fontSize: '11px', color: '#92400e', lineHeight: '1.5'
          }}>
            <strong style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
              <AlertTriangle size={14} color="#d97706" /> Note :
            </strong>
            IN CASE OF NEW EMPLOYEE OR IF EMPLOYEE IS NOT SHOWING ON GROSS FORM-16 WE HAVE TO SAVE IT'S DETAILS FROM IT HEAD ENTRY.
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '6px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={handlePrintEmployeewise}
                style={{
                  flex: 1, backgroundColor: '#159BD7', color: 'white', border: 'none',
                  padding: '9px 12px', borderRadius: '6px', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', gap: '5px',
                  cursor: 'pointer', fontWeight: '600', fontSize: '12px',
                  boxShadow: '0 2px 6px rgba(21, 155, 215, 0.25)'
                }}
              >
                <Printer size={15} /> Print Employeewise
              </button>
              <button
                onClick={fetchGrossForm16}
                style={{
                  backgroundColor: '#159BD7', color: 'white', border: 'none',
                  padding: '9px 18px', borderRadius: '6px', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', gap: '5px',
                  cursor: 'pointer', fontWeight: '600', fontSize: '12px',
                  boxShadow: '0 2px 6px rgba(21, 155, 215, 0.25)'
                }}
              >
                <Eye size={15} /> Show
              </button>
            </div>
            <button
              onClick={() => {
                setSession('2026-2027');
                setStaffType('All (13)');
                setSearchTerm('');
                fetchGrossForm16();
              }}
              style={{
                width: '100%', backgroundColor: 'white', color: '#64748b', border: '1px solid #cbd5e1',
                padding: '8px', borderRadius: '6px', cursor: 'pointer',
                fontWeight: '600', fontSize: '12px'
              }}
            >
              Reset Filters
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
              {schoolName} • STATUTORY GROSS TAX REGISTER
            </div>
            <h2 style={{ margin: '4px 0 0', fontSize: '20px', fontWeight: '700', color: '#0f172a' }}>
              Gross Form 16 Salary & Tax Computation ({session})
            </h2>
            <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#64748b' }}>
              Statutory computation of salary paid, standard deduction u/s 16(ia), Chapter VI-A relief, and net tax
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
              <Download size={16} /> Export Gross CSV
            </button>
            <button
              onClick={handlePrint}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 18px',
                background: 'white', color: '#334155', border: '1px solid #cbd5e1', borderRadius: '6px',
                fontWeight: '600', cursor: 'pointer', fontSize: '13px'
              }}
            >
              <Printer size={16} /> Print Register
            </button>
          </div>
        </div>

        {/* KPI CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {[
            { label: 'Annual Gross Salary Paid', val: `₹${(totals.totalGross || 0).toLocaleString('en-IN')}`, icon: <DollarSign size={20} color="#159BD7" />, bg: '#eff6ff' },
            { label: 'Total Sec 10 Exemptions', val: `₹${(totals.totalExemptions || 0).toLocaleString('en-IN')}`, icon: <ShieldCheck size={20} color="#d97706" />, bg: '#fef3c7' },
            { label: 'Standard Deductions', val: `₹${(totals.totalStdDeduction || 0).toLocaleString('en-IN')}`, icon: <FileText size={20} color="#9333ea" />, bg: '#fdf4ff' },
            { label: 'Total Annual TDS Deducted', val: `₹${(totals.totalTdsDeducted || 0).toLocaleString('en-IN')}`, icon: <CheckCircle size={20} color="#16a34a" />, bg: '#f0fdf4' }
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
              Statutory Gross Form 16 Computation ({filteredRecords.length} Staff)
            </div>
            <div style={{ position: 'relative', width: '260px' }}>
              <Search size={15} style={{ position: 'absolute', left: '10px', top: '9px', color: '#94a3b8' }} />
              <input
                type="text"
                placeholder="Search staff, ID or PAN..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '7px 12px 7px 32px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading Gross Form 16 records...</div>
          ) : filteredRecords.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>No records found. Please ensure staff investments are declared in IT Head Entry.</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', color: '#475569', borderBottom: '2px solid #e2e8f0', fontWeight: '700' }}>
                    <th style={{ padding: '12px 14px' }}>#</th>
                    <th style={{ padding: '12px 14px' }}>Emp ID</th>
                    <th style={{ padding: '12px 14px' }}>Staff Name</th>
                    <th style={{ padding: '12px 14px' }}>PAN Number</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>Annual Gross (Sec 17)</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>Exemptions (Sec 10)</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>Std Ded (16ia)</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>Chap VI-A (80C/80D)</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>Taxable Income</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>Tax Payable (w/ Cess)</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>TDS Deducted</th>
                    <th style={{ padding: '12px 14px', textAlign: 'center' }}>Tax Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((r, i) => {
                    const isAyup = r.staffName?.toLowerCase().includes('ayup');
                    return (
                      <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', background: isAyup ? 'rgba(21, 155, 215, 0.03)' : 'white' }}>
                        <td style={{ padding: '12px 14px', color: '#64748b' }}>{i + 1}</td>
                        <td style={{ padding: '12px 14px', fontWeight: '700', color: '#159BD7' }}>
                          {r.employeeId}
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
                          {r.panNumber}
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: '700', color: '#0f172a' }}>
                          ₹{(r.annualGross || 0).toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', color: '#64748b' }}>
                          ₹{(r.sec10Exempt || 0).toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', color: '#475569' }}>
                          ₹{(r.stdDeduction || 0).toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', color: '#7c3aed', fontWeight: '600' }}>
                          ₹{(r.totalChapter6A || 0).toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: '700', color: '#0f172a' }}>
                          ₹{(r.taxableIncome || 0).toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', color: '#dc2626', fontWeight: '700' }}>
                          ₹{(r.netTaxPayable || 0).toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', color: '#16a34a', fontWeight: '800' }}>
                          ₹{(r.annualTdsDeducted || 0).toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                          <span style={{
                            padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '700',
                            background: '#dcfce7', color: '#15803d'
                          }}>
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr style={{ background: '#f8fafc', fontWeight: '800', borderTop: '2px solid #cbd5e1' }}>
                    <td colSpan={4} style={{ padding: '14px', textAlign: 'right', color: '#0f172a' }}>
                      TOTALS ({filteredRecords.length} Staff):
                    </td>
                    <td style={{ padding: '14px', textAlign: 'right', color: '#0f172a' }}>
                      ₹{(totals.totalGross || 0).toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '14px', textAlign: 'right', color: '#64748b' }}>
                      ₹{(totals.totalExemptions || 0).toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '14px', textAlign: 'right', color: '#475569' }}>
                      ₹{(totals.totalStdDeduction || 0).toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '14px', textAlign: 'right', color: '#7c3aed' }}>
                      -
                    </td>
                    <td style={{ padding: '14px', textAlign: 'right', color: '#0f172a' }}>
                      ₹{(totals.totalTaxable || 0).toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '14px', textAlign: 'right', color: '#dc2626' }}>
                      ₹{(totals.totalTaxPayable || 0).toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '14px', textAlign: 'right', color: '#16a34a', fontSize: '13px' }}>
                      ₹{(totals.totalTdsDeducted || 0).toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '14px', textAlign: 'center', color: '#15803d', fontSize: '11px' }}>
                      Form 16 Ready
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
