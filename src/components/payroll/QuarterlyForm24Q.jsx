import React, { useState, useEffect } from 'react';
import {
  Eye, Download, Printer, Search, RefreshCw, CheckCircle,
  AlertCircle, Sparkles, DollarSign, Users, FileText,
  ChevronLeft, ChevronRight, ShieldCheck, Layers, Award, Check, X
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function QuarterlyForm24Q() {
  const [data, setData] = useState({ challans: [], deductees: [], summary: {} });
  const [activeTab, setActiveTab] = useState('annexure2'); // 'annexure1' or 'annexure2'
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Filters matching mockup
  const [schoolName, setSchoolName] = useState('NAVALS NATIONAL ACADEMY');
  const [schoolBank, setSchoolBank] = useState('All Salary A/c');
  const [salaryAccount, setSalaryAccount] = useState('All Salary A/C No.');
  const [staffType, setStaffType] = useState('All (13)');
  const [quarter, setQuarter] = useState('Q2');
  const [fullYearMonth, setFullYearMonth] = useState(false);
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

  const fetchForm24Q = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append('quarter', quarter);
      if (staffType && staffType !== 'All (13)') params.append('staffType', staffType);
      if (fullYearMonth) params.append('fullYear', 'true');

      const res = await fetch(`${API_BASE}/api/salary-structure/form-24q?${params.toString()}`, { headers });
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error('Failed to load Form 24Q data:', err);
      showNotif('error', 'Error loading Form 24Q report');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForm24Q();
  }, [quarter, fullYearMonth]);

  const filteredDeductees = (data.deductees || []).filter(d => {
    if (!searchTerm) return true;
    const s = searchTerm.toLowerCase();
    return (
      (d.staffName && d.staffName.toLowerCase().includes(s)) ||
      (d.employeeId && d.employeeId.toLowerCase().includes(s)) ||
      (d.panNumber && d.panNumber.toLowerCase().includes(s))
    );
  });

  const exportCSV = () => {
    if (activeTab === 'annexure1') {
      const hdrs = ['#', 'BSR Code', 'Challan No', 'Deposit Date', 'Tax Amount', 'Surcharge', 'Cess', 'Total Deposited', 'Bank Name', 'Cheque No'];
      const rows = (data.challans || []).map((c, i) => [
        i + 1,
        `"${c.bsrCode || ''}"`,
        `"${c.challanNo || ''}"`,
        `"${c.depositDate || ''}"`,
        c.taxAmount || 0,
        c.surcharge || 0,
        c.cess || 0,
        c.totalDeposited || 0,
        `"${c.bankName || ''}"`,
        `"${c.chequeNo || ''}"`
      ]);
      const csv = 'data:text/csv;charset=utf-8,' + [hdrs.join(','), ...rows.map(r => r.join(','))].join('\n');
      downloadFile(csv, `Form24Q_Annexure1_Challans_${quarter}.csv`);
    } else {
      const hdrs = [
        '#', 'Emp ID', 'Staff Name', 'PAN Number', 'Department', 'Designation',
        'Period From', 'Period To', 'Gross Salary', 'Exemptions u/s 10',
        'Taxable Income', 'TDS Deducted', 'TDS Deposited', 'Tax Rate', 'Deduction Date'
      ];
      const rows = filteredDeductees.map((d, i) => [
        i + 1,
        `"${d.employeeId || ''}"`,
        `"${d.staffName || ''}"`,
        `"${d.panNumber || ''}"`,
        `"${d.department || ''}"`,
        `"${d.designation || ''}"`,
        `"${d.periodFrom || ''}"`,
        `"${d.periodTo || ''}"`,
        d.grossSalary || 0,
        d.exemptions || 0,
        d.taxableSalary || 0,
        d.tdsDeducted || 0,
        d.tdsDeposited || 0,
        `"${d.taxRate || ''}"`,
        `"${d.deductionDate || ''}"`
      ]);
      const csv = 'data:text/csv;charset=utf-8,' + [hdrs.join(','), ...rows.map(r => r.join(','))].join('\n');
      downloadFile(csv, `Form24Q_Annexure2_Deductees_${quarter}.csv`);
    }
  };

  const downloadFile = (content, filename) => {
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(content));
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  const summary = data.summary || {};

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
              Form 24Q Filters
            </h3>
            <span style={{ fontSize: '11px', color: '#64748b', background: '#f1f5f9', padding: '2px 8px', borderRadius: '10px' }}>Quarterly Return</span>
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
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Quarter Period</label>
            <select
              value={quarter}
              onChange={e => setQuarter(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: 'white' }}
            >
              <option value="Q1">Q1 (Apr - Jun 2026)</option>
              <option value="Q2">Q2 (Jul - Sep 2026)</option>
              <option value="Q3">Q3 (Oct - Dec 2026)</option>
              <option value="Q4">Q4 (Jan - Mar 2027)</option>
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
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Salary A/c No.</label>
            <select
              value={salaryAccount}
              onChange={e => setSalaryAccount(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: 'white' }}
            >
              <option value="All Salary A/C No.">All Salary A/C No.</option>
              <option value="50100429188">50100429188 (Primary Disbursement)</option>
              <option value="30219847120">30219847120 (Secondary Faculty)</option>
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

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <input
              type="checkbox"
              id="fullYearMonth"
              checked={fullYearMonth}
              onChange={e => setFullYearMonth(e.target.checked)}
              style={{ width: '16px', height: '16px', accentColor: '#159BD7' }}
            />
            <label htmlFor="fullYearMonth" style={{ fontSize: '13px', color: '#334155', fontWeight: '500', cursor: 'pointer' }}>
              Full Year Month(s)
            </label>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button
              onClick={fetchForm24Q}
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
                setQuarter('Q2');
                setFullYearMonth(false);
                setStaffType('All (13)');
                setSearchTerm('');
                fetchForm24Q();
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
              {schoolName} • E-TDS QUARTERLY FILING
            </div>
            <h2 style={{ margin: '4px 0 0', fontSize: '20px', fontWeight: '700', color: '#0f172a' }}>
              Quarterly Form 24Q Statement — {quarter} (FY {data.financialYear || '2026-2027'})
            </h2>
            <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#64748b' }}>
              Official quarterly statement of deduction of tax under Section 200(3) of the Income-tax Act, 1961
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
              <Download size={16} /> Export {activeTab === 'annexure1' ? 'Challans CSV' : 'Annexure II CSV'}
            </button>
            <button
              onClick={handlePrint}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 18px',
                background: 'white', color: '#334155', border: '1px solid #cbd5e1', borderRadius: '6px',
                fontWeight: '600', cursor: 'pointer', fontSize: '13px'
              }}
            >
              <Printer size={16} /> Print Return
            </button>
          </div>
        </div>

        {/* KPI CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {[
            { label: 'Quarter TDS Deposited', val: `₹${(summary.totalTdsDeposited || 0).toLocaleString('en-IN')}`, icon: <DollarSign size={20} color="#16a34a" />, bg: '#f0fdf4' },
            { label: 'Deductees Count', val: filteredDeductees.length, icon: <Users size={20} color="#159BD7" />, bg: '#eff6ff' },
            { label: 'OLTAS Challans Linked', val: `${(data.challans || []).length} Challans`, icon: <FileText size={20} color="#d97706" />, bg: '#fef3c7' },
            { label: 'FVU Compliance Status', val: 'FVU 8.4 Ready', icon: <ShieldCheck size={20} color="#9333ea" />, bg: '#fdf4ff' }
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

        {/* TAB SWITCHER */}
        <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', gap: '8px' }}>
          <button
            onClick={() => setActiveTab('annexure2')}
            style={{
              padding: '10px 20px', border: 'none', background: 'transparent', cursor: 'pointer',
              fontWeight: '700', fontSize: '13px',
              color: activeTab === 'annexure2' ? '#159BD7' : '#64748b',
              borderBottom: activeTab === 'annexure2' ? '3px solid #159BD7' : '3px solid transparent'
            }}
          >
            Annexure II: Deductee Salary & Tax Details ({filteredDeductees.length} Staff)
          </button>
          <button
            onClick={() => setActiveTab('annexure1')}
            style={{
              padding: '10px 20px', border: 'none', background: 'transparent', cursor: 'pointer',
              fontWeight: '700', fontSize: '13px',
              color: activeTab === 'annexure1' ? '#159BD7' : '#64748b',
              borderBottom: activeTab === 'annexure1' ? '3px solid #159BD7' : '3px solid transparent'
            }}
          >
            Annexure I: Challan Remittance Details ({(data.challans || []).length} Challans)
          </button>
        </div>

        {/* TABLE SECTION */}
        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          
          {/* SEARCH BAR */}
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>
              {activeTab === 'annexure2' ? `Deductee Schedule — ${quarter}` : `Challan Annexure — ${quarter}`}
            </div>
            {activeTab === 'annexure2' && (
              <div style={{ position: 'relative', width: '260px' }}>
                <Search size={15} style={{ position: 'absolute', left: '10px', top: '9px', color: '#94a3b8' }} />
                <input
                  type="text"
                  placeholder="Search Ayup staff, ID or PAN..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  style={{ width: '100%', padding: '7px 12px 7px 32px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', boxSizing: 'border-box' }}
                />
              </div>
            )}
          </div>

          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading Form 24Q records...</div>
          ) : activeTab === 'annexure2' ? (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', color: '#475569', borderBottom: '2px solid #e2e8f0', fontWeight: '700' }}>
                    <th style={{ padding: '12px 14px' }}>#</th>
                    <th style={{ padding: '12px 14px' }}>Emp ID</th>
                    <th style={{ padding: '12px 14px' }}>Staff Name</th>
                    <th style={{ padding: '12px 14px' }}>PAN Number</th>
                    <th style={{ padding: '12px 14px' }}>Employment Period</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>Quarterly Gross</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>Exemptions</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>Taxable Salary</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>TDS Deducted</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>TDS Deposited</th>
                    <th style={{ padding: '12px 14px', textAlign: 'center' }}>Tax Rate</th>
                    <th style={{ padding: '12px 14px' }}>Deduction Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDeductees.map((d, i) => {
                    const isAyup = d.staffName?.toLowerCase().includes('ayup');
                    return (
                      <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', background: isAyup ? 'rgba(21, 155, 215, 0.03)' : 'white' }}>
                        <td style={{ padding: '12px 14px', color: '#64748b' }}>{i + 1}</td>
                        <td style={{ padding: '12px 14px', fontWeight: '700', color: '#159BD7' }}>
                          {d.employeeId}
                        </td>
                        <td style={{ padding: '12px 14px', fontWeight: '600', color: '#0f172a' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            {d.staffName}
                            {isAyup && (
                              <span style={{ fontSize: '10px', background: '#dbeafe', color: '#1e40af', padding: '1px 6px', borderRadius: '4px', fontWeight: '700' }}>
                                AYUP
                              </span>
                            )}
                          </div>
                          <span style={{ fontSize: '11px', color: '#64748b' }}>{d.designation}</span>
                        </td>
                        <td style={{ padding: '12px 14px', fontFamily: 'monospace', fontWeight: '700', color: '#334155' }}>
                          {d.panNumber}
                        </td>
                        <td style={{ padding: '12px 14px', color: '#64748b', fontSize: '11px' }}>
                          {d.periodFrom} to {d.periodTo}
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: '600' }}>
                          ₹{(d.grossSalary || 0).toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', color: '#64748b' }}>
                          ₹{(d.exemptions || 0).toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', color: '#0f172a', fontWeight: '600' }}>
                          ₹{(d.taxableSalary || 0).toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', color: '#dc2626', fontWeight: '700' }}>
                          ₹{(d.tdsDeducted || 0).toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', color: '#16a34a', fontWeight: '800' }}>
                          ₹{(d.tdsDeposited || 0).toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                          <span style={{ background: '#f1f5f9', color: '#334155', padding: '2px 8px', borderRadius: '10px', fontWeight: '600', fontSize: '11px' }}>
                            {d.taxRate}
                          </span>
                        </td>
                        <td style={{ padding: '12px 14px', color: '#64748b', fontSize: '11px' }}>
                          {d.deductionDate}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', color: '#475569', borderBottom: '2px solid #e2e8f0', fontWeight: '700' }}>
                    <th style={{ padding: '12px 14px' }}>#</th>
                    <th style={{ padding: '12px 14px' }}>BSR Code</th>
                    <th style={{ padding: '12px 14px' }}>Challan Serial No</th>
                    <th style={{ padding: '12px 14px' }}>Date of Deposit</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>Tax Deposited (₹)</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>Surcharge</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>Health & Edu Cess</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>Total Remitted</th>
                    <th style={{ padding: '12px 14px' }}>Bank Name</th>
                    <th style={{ padding: '12px 14px' }}>Cheque / Ref No</th>
                  </tr>
                </thead>
                <tbody>
                  {(data.challans || []).map((c, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px 14px', color: '#64748b' }}>{i + 1}</td>
                      <td style={{ padding: '12px 14px', fontWeight: '700', color: '#0284c7' }}>{c.bsrCode}</td>
                      <td style={{ padding: '12px 14px', fontWeight: '700', color: '#0f172a' }}>{c.challanNo}</td>
                      <td style={{ padding: '12px 14px', color: '#64748b' }}>{c.depositDate}</td>
                      <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: '600' }}>₹{(c.taxAmount || 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px 14px', textAlign: 'right', color: '#64748b' }}>₹{(c.surcharge || 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px 14px', textAlign: 'right', color: '#7c3aed' }}>₹{(c.cess || 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: '800', color: '#16a34a' }}>
                        ₹{(c.totalDeposited || 0).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '12px 14px', color: '#334155' }}>{c.bankName}</td>
                      <td style={{ padding: '12px 14px', color: '#64748b', fontSize: '11px' }}>{c.chequeNo}</td>
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
