import React, { useState, useEffect } from 'react';
import {
  Eye, Download, Printer, Search, RefreshCw, CheckCircle,
  AlertCircle, Sparkles, PieChart, DollarSign, Users, Layers,
  ChevronLeft, ChevronRight, Check, X
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function HeadWiseReport() {
  const [records, setRecords] = useState([]);
  const [salaryAccounts, setSalaryAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Filters matching mockup
  const [schoolName, setSchoolName] = useState('NAVALS NATIONAL ACADEMY');
  const [schoolBank, setSchoolBank] = useState('All Salary A/c');
  const [salaryAccount, setSalaryAccount] = useState('All Salary A/C No.');
  const [salaryMonth, setSalaryMonth] = useState('Aug-2026');
  const [staffType, setStaffType] = useState('All (11)');
  const [headToShow, setHeadToShow] = useState('House Rent Allowance (HRA)');
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

  // Convert head label to query string
  const getCleanHeadParam = (head) => {
    if (head.includes('Basic')) return 'Basic';
    if (head.includes('DA') || head.includes('Dearness')) return 'DA';
    if (head.includes('HRA') || head.includes('House Rent')) return 'HRA';
    if (head.includes('TA') || head.includes('Transport')) return 'TA';
    if (head.includes('Special')) return 'Special Allowance';
    if (head.includes('PF') || head.includes('Provident')) return 'PF';
    if (head.includes('ESI')) return 'ESI';
    if (head.includes('TDS') || head.includes('Income Tax')) return 'TDS';
    if (head.includes('Insurance')) return 'Insurance';
    if (head.includes('Advance')) return 'Advance';
    if (head.includes('Net')) return 'Net';
    return 'Gross';
  };

  const fetchHeadReport = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (salaryMonth && salaryMonth !== 'Please Select') params.append('monthYear', salaryMonth);
      if (staffType && staffType !== 'All (11)') params.append('staffType', staffType);
      if (salaryAccount && salaryAccount !== 'All Salary A/C No.') params.append('salaryAccount', salaryAccount);
      params.append('headName', getCleanHeadParam(headToShow));
      if (searchTerm) params.append('search', searchTerm);

      const res = await fetch(`${API_BASE}/api/salary-structure/head-wise-report?${params.toString()}`, { headers });
      if (res.ok) {
        const data = await res.json();
        setRecords(Array.isArray(data) ? data : []);
      }

      // Accounts
      const aRes = await fetch(`${API_BASE}/api/salary-accounts`, { headers });
      if (aRes.ok) {
        const aData = await aRes.json();
        setSalaryAccounts(Array.isArray(aData) ? aData : []);
      }
    } catch (err) {
      console.error('Failed to load head wise report:', err);
      showNotif('error', 'Error loading head-wise report data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeadReport();
  }, [headToShow]);

  const exportCSV = () => {
    if (!filteredRecords.length) return;
    const hdrs = ['#', 'Employee ID', 'Staff Name', 'Department', 'Designation', 'Staff Type', 'Selected Head', 'Head Value (₹)', 'Head Type', 'Gross Salary', 'Net Salary'];
    const rows = filteredRecords.map((r, i) => [
      i + 1,
      `"${r.employeeId || ''}"`,
      `"${r.staffName || ''}"`,
      `"${r.department || ''}"`,
      `"${r.designation || ''}"`,
      r.staffType || '',
      `"${headToShow}"`,
      r.headValue || 0,
      r.headType || 'Earnings',
      r.grossSalary || 0,
      r.netSalary || 0
    ]);
    const csv = 'data:text/csv;charset=utf-8,' + [hdrs.join(','), ...rows.map(r => r.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', `HeadWise_${getCleanHeadParam(headToShow)}_${salaryMonth}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredRecords = records.filter(r => {
    if (!searchTerm) return true;
    const s = searchTerm.toLowerCase();
    return (
      (r.staffName && r.staffName.toLowerCase().includes(s)) ||
      (r.employeeId && r.employeeId.toLowerCase().includes(s)) ||
      (r.department && r.department.toLowerCase().includes(s))
    );
  });

  const totalHeadVal = filteredRecords.reduce((s, r) => s + (r.headValue || 0), 0);
  const avgHeadVal = filteredRecords.length ? Math.round(totalHeadVal / filteredRecords.length) : 0;
  const isDeductionHead = ['PF', 'ESI', 'TDS', 'Insurance', 'Advance'].includes(getCleanHeadParam(headToShow));

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 120px)', backgroundColor: '#f8fafc', overflow: 'hidden' }}>

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
          width: '320px', backgroundColor: 'white', padding: '24px',
          borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column',
          gap: '18px', overflowY: 'auto', flexShrink: 0, boxShadow: '2px 0 8px rgba(0,0,0,0.02)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#1e293b' }}>
              Head Wise Filter
            </h3>
            <span style={{ fontSize: '11px', color: '#64748b', background: '#f1f5f9', padding: '2px 8px', borderRadius: '10px' }}>Salary Head Audit</span>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>School Name</label>
            <select
              value={schoolName}
              onChange={e => setSchoolName(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: 'white' }}
            >
              <option value="NAVALS NATIONAL ACADEMY">NAVALS NATIONAL ACADEMY</option>
              <option value="AYUP TECH ACADEMY">AYUP TECH ACADEMY</option>
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
              <option value="Ayup Salary Account">Ayup Salary Account</option>
              <option value="Ayup Primary Account">Ayup Primary Account</option>
              {salaryAccounts.map(a => (
                <option key={a._id} value={a.accountName}>{a.accountName} ({a.bank})</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Salary Month</label>
            <select
              value={salaryMonth}
              onChange={e => setSalaryMonth(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: 'white' }}
            >
              <option value="Aug-2026">Aug-2026</option>
              <option value="Jul-2026">Jul-2026</option>
              <option value="Jun-2026">Jun-2026</option>
            </select>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Staff Type</label>
            <select
              value={staffType}
              onChange={e => setStaffType(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: 'white' }}
            >
              <option value="All (11)">All (11)</option>
              <option value="Teaching">Teaching</option>
              <option value="Non-Teaching">Non-Teaching</option>
              <option value="Technical">Technical</option>
            </select>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#159BD7', marginBottom: '6px' }}>Head To Show</label>
            <select
              value={headToShow}
              onChange={e => setHeadToShow(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '2px solid #159BD7', fontSize: '13px', background: '#f0f9ff', fontWeight: '600', color: '#0f172a' }}
            >
              <optgroup label="EARNING HEADS">
                <option value="Basic Salary">Basic Salary</option>
                <option value="Dearness Allowance (DA)">Dearness Allowance (DA)</option>
                <option value="House Rent Allowance (HRA)">House Rent Allowance (HRA)</option>
                <option value="Transport Allowance (TA)">Transport Allowance (TA)</option>
                <option value="Special Allowance">Special Allowance</option>
                <option value="Gross Salary">Gross Salary</option>
              </optgroup>
              <optgroup label="DEDUCTION HEADS">
                <option value="Provident Fund (PF)">Provident Fund (PF)</option>
                <option value="ESI Deduction">ESI Deduction</option>
                <option value="TDS (Income Tax)">TDS (Income Tax)</option>
                <option value="Insurance Deduction">Insurance Deduction</option>
                <option value="Advance Deduction">Advance Deduction</option>
              </optgroup>
              <optgroup label="PAYOUT">
                <option value="Net Salary">Net Salary</option>
              </optgroup>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button
              onClick={fetchHeadReport}
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
                setHeadToShow('House Rent Allowance (HRA)');
                setStaffType('All (11)');
                setSearchTerm('');
                fetchHeadReport();
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

      {/* RIGHT REPORT AREA */}
      <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* REPORT BANNER & ACTIONS */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '20px 24px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: '700', color: isDeductionHead ? '#e11d48' : '#159BD7', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {schoolName} • {isDeductionHead ? 'STATUTORY DEDUCTION' : 'PAYROLL EARNINGS'} HEAD
            </div>
            <h2 style={{ margin: '4px 0 0', fontSize: '20px', fontWeight: '700', color: '#0f172a' }}>
              Head Wise Report: {headToShow}
            </h2>
            <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#64748b' }}>
              Month: <strong>{salaryMonth}</strong> • Category: <strong>{isDeductionHead ? 'Deduction' : 'Earnings / Base'}</strong>
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
              <Download size={16} /> Export Head CSV
            </button>
            <button
              onClick={() => window.print()}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 18px',
                background: 'white', color: '#334155', border: '1px solid #cbd5e1', borderRadius: '6px',
                fontWeight: '600', cursor: 'pointer', fontSize: '13px'
              }}
            >
              <Printer size={16} /> Print Report
            </button>
          </div>
        </div>

        {/* SUMMARY KPI CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {[
            { label: 'Staff Count on Head', val: filteredRecords.length, icon: <Users size={20} color="#159BD7" />, bg: '#eff6ff' },
            { label: `Total ${headToShow}`, val: `₹${totalHeadVal.toLocaleString('en-IN')}`, icon: <DollarSign size={20} color={isDeductionHead ? '#e11d48' : '#16a34a'} />, bg: isDeductionHead ? '#fff1f2' : '#f0fdf4' },
            { label: 'Average Value / Employee', val: `₹${avgHeadVal.toLocaleString('en-IN')}`, icon: <PieChart size={20} color="#d97706" />, bg: '#fef3c7' },
            { label: 'Head Classification', val: isDeductionHead ? 'Payroll Deduction' : 'Staff Earning', icon: <Layers size={20} color="#9333ea" />, bg: '#fdf4ff' }
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
              Detailed Employee Records for {headToShow} ({filteredRecords.length})
            </div>
            <div style={{ position: 'relative', width: '260px' }}>
              <Search size={15} style={{ position: 'absolute', left: '10px', top: '9px', color: '#94a3b8' }} />
              <input
                type="text"
                placeholder="Search employee or ID..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '7px 12px 7px 32px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading head wise records...</div>
          ) : filteredRecords.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>No records found for head: {headToShow}.</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                    {['#', 'Employee Details', 'Department & Role', 'Staff Type', 'Basic Pay', `${headToShow} (₹)`, '% of Gross', 'Gross Salary', 'Net Payable Salary'].map((h, i) => (
                      <th key={i} style={{ padding: '12px 14px', fontWeight: '600', textAlign: ['Basic Pay', `${headToShow} (₹)`, '% of Gross', 'Gross Salary', 'Net Payable Salary'].includes(h) ? 'right' : 'left' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((r, i) => {
                    const isAyup = r.staffName?.toLowerCase().includes('ayup');
                    const gross = r.grossSalary || 1;
                    const pctOfGross = Math.round(((r.headValue || 0) / gross) * 100);
                    return (
                      <tr key={r._id || i} style={{ borderBottom: '1px solid #f1f5f9', background: isAyup ? '#fffbeb' : 'transparent' }}>
                        <td style={{ padding: '12px 14px', color: '#64748b' }}>{i + 1}</td>
                        <td style={{ padding: '12px 14px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontWeight: '600', color: '#0f172a' }}>{r.staffName}</span>
                            {isAyup && (
                              <span style={{ background: '#d97706', color: 'white', fontSize: '10px', padding: '2px 7px', borderRadius: '12px', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                                <Sparkles size={10} /> Ayup Tech
                              </span>
                            )}
                          </div>
                          <div style={{ fontSize: '11px', color: '#64748b' }}>ID: {r.employeeId}</div>
                        </td>
                        <td style={{ padding: '12px 14px', color: '#475569' }}>
                          <div>{r.department}</div>
                          <div style={{ fontSize: '11px', color: '#94a3b8' }}>{r.designation}</div>
                        </td>
                        <td style={{ padding: '12px 14px' }}>
                          <span style={{ background: '#f1f5f9', color: '#475569', padding: '2px 8px', borderRadius: '10px', fontSize: '11px' }}>
                            {r.staffType}
                          </span>
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', color: '#334155' }}>
                          ₹{(r.basicSalary || 0).toLocaleString('en-IN')}
                        </td>
                        <td style={{
                          padding: '12px 14px', textAlign: 'right', fontWeight: '700', fontSize: '14px',
                          color: isDeductionHead ? '#e11d48' : '#16a34a'
                        }}>
                          {isDeductionHead ? '-' : ''}₹{(r.headValue || 0).toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', color: '#64748b', fontWeight: '600' }}>
                          {pctOfGross}%
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', color: '#0f172a', fontWeight: '600' }}>
                          ₹{(r.grossSalary || 0).toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: '700', color: '#16a34a' }}>
                          ₹{(r.netSalary || 0).toLocaleString('en-IN')}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr style={{ background: '#f8fafc', fontWeight: '700', borderTop: '2px solid #cbd5e1' }}>
                    <td colSpan={5} style={{ padding: '14px', textAlign: 'right', color: '#0f172a' }}>Total for {headToShow}:</td>
                    <td style={{ padding: '14px', textAlign: 'right', color: isDeductionHead ? '#e11d48' : '#16a34a', fontSize: '16px' }}>
                      {isDeductionHead ? '-' : ''}₹{totalHeadVal.toLocaleString('en-IN')}
                    </td>
                    <td colSpan={3}></td>
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
