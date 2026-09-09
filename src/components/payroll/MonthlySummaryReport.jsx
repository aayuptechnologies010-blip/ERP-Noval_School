import React, { useState, useEffect } from 'react';
import {
  Eye, Download, Printer, Search, RefreshCw, CheckCircle,
  AlertCircle, Sparkles, DollarSign, Users, FileText,
  ChevronLeft, ChevronRight, Filter, ShieldCheck, CreditCard, Building2, Award
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function MonthlySummaryReport() {
  const [data, setData] = useState({
    summary: {},
    paymentModeBreakdown: [],
    staffTypeBreakdown: [],
    departmentBreakdown: [],
    records: []
  });
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Dynamic filter options state
  const [filterOptions, setFilterOptions] = useState({
    schools: ['Ayup Tech', 'Ayup Technologies', 'Ayup Tech International'],
    departments: [],
    staffTypes: [],
    salaryAccounts: [],
    banks: [],
    months: [],
    employees: []
  });

  // Sidebar filters matching mockup
  const [schoolName, setSchoolName] = useState('Ayup Tech');
  const [schoolBank, setSchoolBank] = useState('All School Banks');
  const [salaryAccount, setSalaryAccount] = useState('All Salary A/C');
  const [staffType, setStaffType] = useState('All');
  const [monthYear, setMonthYear] = useState('Aug-2026');
  const [notes, setNotes] = useState('Note: This report has been designed on request, so it is suggested that the concerned client use this report.');

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  const showNotif = (type, text) => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg(null), 4000);
  };

  const fetchFilterOptions = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/salary-structure/monthly-reports-filter-options`, { headers });
      if (res.ok) {
        const json = await res.json();
        setFilterOptions(json);
        if (json.schools && json.schools.length > 0) {
          setSchoolName(json.schools[0]);
        }
        if (json.months && json.months.length > 0 && !json.months.includes(monthYear)) {
          setMonthYear(json.months[0]);
        }
      }
    } catch (e) {
      console.error('Failed to load filter options', e);
    }
  };

  const fetchReport = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (monthYear && monthYear !== 'Select') params.append('monthYear', monthYear);
      if (schoolBank && schoolBank !== 'All School Banks' && !schoolBank.includes('All')) params.append('schoolBank', schoolBank);
      if (salaryAccount && salaryAccount !== 'All Salary A/C' && !salaryAccount.includes('All')) params.append('salaryAccount', salaryAccount);
      if (staffType && staffType !== 'All' && !staffType.includes('All')) params.append('staffType', staffType);

      const res = await fetch(`${API_BASE}/api/salary-structure/monthly-summary-report?${params.toString()}`, { headers });
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        showNotif('error', 'Failed to fetch monthly summary report');
      }
    } catch (err) {
      console.error(err);
      showNotif('error', 'Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilterOptions();
    fetchReport();
  }, []);

  const handleReset = () => {
    setSchoolName(filterOptions.schools?.[0] || 'Ayup Tech');
    setSchoolBank('All School Banks');
    setSalaryAccount('All Salary A/C');
    setStaffType('All');
    setMonthYear(filterOptions.months?.[0] || 'Aug-2026');
    setNotes('Note: This report has been designed on request, so it is suggested that the concerned client use this report.');
    setTimeout(() => fetchReport(), 50);
  };

  const summary = data.summary || {};
  const paymentModes = data.paymentModeBreakdown || [];
  const staffTypes = data.staffTypeBreakdown || [];
  const departments = data.departmentBreakdown || [];
  const records = data.records || [];

  const exportCSV = () => {
    if (!departments.length) return;
    const headersList = ['Department / Section', 'Staff Count', 'Gross Amount', 'Net Amount'];
    const rows = departments.map(d => [
      `"${d.department}"`,
      d.count,
      d.gross,
      d.net
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headersList.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Monthly_Summary_Report_${monthYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotif('success', 'CSV downloaded successfully');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ display: 'flex', height: '100%', minHeight: '85vh', backgroundColor: '#f4f6f9', fontFamily: 'Inter, sans-serif' }}>
      {/* Toast Notification */}
      {statusMsg && (
        <div style={{
          position: 'fixed', top: '20px', right: '20px', zIndex: 9999,
          padding: '12px 20px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          backgroundColor: statusMsg.type === 'success' ? '#10B981' : '#EF4444',
          color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '500'
        }}>
          {statusMsg.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
          {statusMsg.text}
        </div>
      )}

      {/* Left Filter Sidebar */}
      <div style={{
        width: isSidebarOpen ? '290px' : '0px',
        backgroundColor: '#ffffff',
        borderRight: isSidebarOpen ? '1px solid #e2e8f0' : 'none',
        transition: 'width 0.25s ease',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0
      }}>
        {isSidebarOpen && (
          <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto', height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #edf2f7', paddingBottom: '12px' }}>
              <Filter size={18} color="#159BD7" />
              <span style={{ fontWeight: '700', fontSize: '14px', color: '#1a202c', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Summary Filters
              </span>
            </div>

            <div className="form-group">
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', display: 'block' }}>School / Institution</label>
              <select value={schoolName} onChange={e => setSchoolName(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '12px' }}>
                {(filterOptions.schools || ['Ayup Tech', 'Ayup Technologies']).map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', display: 'block' }}>School Bank</label>
              <select value={schoolBank} onChange={e => setSchoolBank(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '12px' }}>
                <option value="All School Banks">All School Banks</option>
                {(filterOptions.banks || []).map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', display: 'block' }}>Salary A/c No.</label>
              <select value={salaryAccount} onChange={e => setSalaryAccount(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '12px' }}>
                <option value="All Salary A/C">All Salary A/C</option>
                {(filterOptions.salaryAccounts || []).map(sa => (
                  <option key={sa} value={sa}>{sa}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', display: 'block' }}>Staff Type</label>
              <select value={staffType} onChange={e => setStaffType(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '12px' }}>
                <option value="All">All Staff Types</option>
                {(filterOptions.staffTypes || []).map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', display: 'block' }}>Month-Year</label>
              <select value={monthYear} onChange={e => setMonthYear(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '12px' }}>
                {(filterOptions.months && filterOptions.months.length > 0 ? filterOptions.months : ['Aug-2026', 'Jul-2026', 'Sep-2026', 'Oct-2026']).map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', display: 'block' }}>Notes:</label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                style={{
                  width: '100%', minHeight: '70px', padding: '8px 10px', borderRadius: '6px',
                  border: '1px solid #cbd5e0', fontSize: '11px', outline: 'none', resize: 'vertical'
                }}
              />
              <div style={{ fontSize: '10px', color: '#718096', marginTop: '4px' }}>
                Notes : This report has been designed on request, so it is suggested that the concerned client use this report.
              </div>
            </div>

            <div style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
              <button
                onClick={fetchReport}
                disabled={loading}
                style={{
                  flex: 1, backgroundColor: '#159BD7', color: 'white', border: 'none',
                  padding: '9px 12px', borderRadius: '6px', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '12px'
                }}
              >
                <Eye size={15} /> {loading ? 'Loading...' : 'Show'}
              </button>
              <button
                onClick={handleReset}
                style={{
                  backgroundColor: '#edf2f7', color: '#4a5568', border: '1px solid #cbd5e0',
                  padding: '9px 12px', borderRadius: '6px', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', cursor: 'pointer', fontWeight: '600', fontSize: '12px'
                }}
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Pane */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', overflowX: 'hidden' }}>
        {/* Toggle Sidebar Button */}
        <div
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          style={{
            position: 'absolute', top: '24px', left: isSidebarOpen ? '0px' : '0px',
            transform: isSidebarOpen ? 'translateX(-50%)' : 'none',
            width: '24px', height: '36px', backgroundColor: '#ffffff',
            border: '1px solid #cbd5e0', borderRadius: '0 4px 4px 0',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', zIndex: 40, boxShadow: '2px 0 6px rgba(0,0,0,0.06)'
          }}
          title={isSidebarOpen ? 'Collapse Filter Panel' : 'Expand Filter Panel'}
        >
          {isSidebarOpen ? <ChevronLeft size={14} color="#4a5568" /> : <ChevronRight size={14} color="#4a5568" />}
        </div>

        {/* Content Container */}
        <div style={{ padding: '24px', overflowY: 'auto' }}>
          {/* Header Bar */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            backgroundColor: '#ffffff', padding: '16px 20px', borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '20px', flexWrap: 'wrap', gap: '12px'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1a202c', margin: 0 }}>
                  Monthly Summary & Executive Board Report
                </h2>
                <span style={{
                  backgroundColor: '#e6fffa', color: '#047481', padding: '2px 8px',
                  borderRadius: '12px', fontSize: '11px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px'
                }}>
                  <Sparkles size={12} /> {monthYear}
                </span>
                <span style={{
                  backgroundColor: '#ebf8ff', color: '#2b6cb0', padding: '2px 8px',
                  borderRadius: '12px', fontSize: '11px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px'
                }}>
                  <Building2 size={12} /> {schoolName}
                </span>
              </div>
              <p style={{ fontSize: '12px', color: '#718096', margin: '4px 0 0 0' }}>
                High-level financial digest for school management, auditors, and disbursal banks
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={fetchReport}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 12px',
                  backgroundColor: '#f7fafc', border: '1px solid #cbd5e0', borderRadius: '6px',
                  fontSize: '12px', fontWeight: '500', color: '#4a5568', cursor: 'pointer'
                }}
              >
                <RefreshCw size={13} className={loading ? 'animate-spin' : ''} /> Refresh
              </button>

              <button
                onClick={exportCSV}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 12px',
                  backgroundColor: '#10B981', border: 'none', borderRadius: '6px',
                  fontSize: '12px', fontWeight: '600', color: '#ffffff', cursor: 'pointer'
                }}
              >
                <Download size={13} /> Export CSV
              </button>

              <button
                onClick={handlePrint}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 12px',
                  backgroundColor: '#4B5563', border: 'none', borderRadius: '6px',
                  fontSize: '12px', fontWeight: '600', color: '#ffffff', cursor: 'pointer'
                }}
              >
                <Printer size={13} /> Print
              </button>
            </div>
          </div>

          {/* KPI Summary Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
            <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #159BD7', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#718096', textTransform: 'uppercase' }}>Total Staff</span>
                <Users size={16} color="#159BD7" />
              </div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#1a202c', marginTop: '6px' }}>
                {summary.totalStaff || 0}
              </div>
              <div style={{ fontSize: '11px', color: '#718096', marginTop: '4px' }}>
                Teaching & Staff
              </div>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #10B981', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#718096', textTransform: 'uppercase' }}>Gross Payroll</span>
                <DollarSign size={16} color="#10B981" />
              </div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#1a202c', marginTop: '6px' }}>
                ₹{(summary.totalGross || 0).toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: '11px', color: '#10B981', marginTop: '4px', fontWeight: '500' }}>
                Total Salary Budget
              </div>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #EF4444', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#718096', textTransform: 'uppercase' }}>Total Deductions</span>
                <ShieldCheck size={16} color="#EF4444" />
              </div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#1a202c', marginTop: '6px' }}>
                ₹{(summary.totalDeductions || 0).toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: '11px', color: '#EF4444', marginTop: '4px', fontWeight: '500' }}>
                PF, ESI, TDS: {summary.statutorySharePercent || 0}%
              </div>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #8B5CF6', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#718096', textTransform: 'uppercase' }}>Net Disbursement</span>
                <CreditCard size={16} color="#8B5CF6" />
              </div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#1a202c', marginTop: '6px' }}>
                ₹{(summary.totalNet || 0).toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: '11px', color: '#8B5CF6', marginTop: '4px', fontWeight: '500' }}>
                Transferred to Accounts
              </div>
            </div>
          </div>

          {/* Middle Two-Column Section: Payment Modes & Staff Types */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '20px' }}>
            {/* Payment Mode Card */}
            <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#1a202c', margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CreditCard size={16} color="#159BD7" /> Disbursal Channel Summary
              </h3>
              <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#64748b' }}>
                    <th style={{ padding: '8px 0', textAlign: 'left' }}>Mode</th>
                    <th style={{ padding: '8px 0', textAlign: 'center' }}>Staff Count</th>
                    <th style={{ padding: '8px 0', textAlign: 'right' }}>Net Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentModes.map((m, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '10px 0', fontWeight: '600', color: '#334155' }}>{m.mode}</td>
                      <td style={{ padding: '10px 0', textAlign: 'center' }}>{m.count}</td>
                      <td style={{ padding: '10px 0', textAlign: 'right', fontWeight: '700', color: '#059669' }}>
                        ₹{m.totalAmount.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Staff Type Card */}
            <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#1a202c', margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Award size={16} color="#10B981" /> Staff Type Allocation
              </h3>
              <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#64748b' }}>
                    <th style={{ padding: '8px 0', textAlign: 'left' }}>Staff Type</th>
                    <th style={{ padding: '8px 0', textAlign: 'center' }}>Count</th>
                    <th style={{ padding: '8px 0', textAlign: 'right' }}>Gross</th>
                    <th style={{ padding: '8px 0', textAlign: 'right' }}>Net</th>
                  </tr>
                </thead>
                <tbody>
                  {staffTypes.map((t, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '10px 0', fontWeight: '600', color: '#334155' }}>{t.type}</td>
                      <td style={{ padding: '10px 0', textAlign: 'center' }}>{t.count}</td>
                      <td style={{ padding: '10px 0', textAlign: 'right', color: '#475569' }}>₹{t.gross.toLocaleString('en-IN')}</td>
                      <td style={{ padding: '10px 0', textAlign: 'right', fontWeight: '700', color: '#059669' }}>
                        ₹{t.net.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Departmental Digest Table */}
          <div style={{
            backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '20px'
          }}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Building2 size={16} color="#159BD7" />
              <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#1a202c', margin: 0 }}>
                Departmental Budget Allocation Summary
              </h3>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#4a5568' }}>
                    <th style={{ padding: '10px 14px', fontWeight: '700' }}>#</th>
                    <th style={{ padding: '10px 14px', fontWeight: '700' }}>Department Name</th>
                    <th style={{ padding: '10px 14px', fontWeight: '700', textAlign: 'center' }}>Staff Headcount</th>
                    <th style={{ padding: '10px 14px', fontWeight: '700', textAlign: 'right' }}>Total Gross</th>
                    <th style={{ padding: '10px 14px', fontWeight: '700', textAlign: 'right' }}>Total Net Disbursed</th>
                    <th style={{ padding: '10px 14px', fontWeight: '700', textAlign: 'right' }}>Budget Share</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map((d, i) => {
                    const share = summary.totalGross ? ((d.gross / summary.totalGross) * 100).toFixed(1) : 0;
                    return (
                      <tr key={i} style={{ borderBottom: '1px solid #edf2f7', backgroundColor: i % 2 === 0 ? '#ffffff' : '#fbfcfd' }}>
                        <td style={{ padding: '10px 14px', color: '#64748b' }}>{i + 1}</td>
                        <td style={{ padding: '10px 14px', fontWeight: '600', color: '#1e293b' }}>{d.department}</td>
                        <td style={{ padding: '10px 14px', textAlign: 'center', fontWeight: '700' }}>{d.count}</td>
                        <td style={{ padding: '10px 14px', textAlign: 'right', color: '#475569' }}>₹{d.gross.toLocaleString('en-IN')}</td>
                        <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: '700', color: '#059669' }}>₹{d.net.toLocaleString('en-IN')}</td>
                        <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: '700', color: '#8B5CF6' }}>{share}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Notes Card matching mockup */}
          {notes && (
            <div style={{
              backgroundColor: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px',
              padding: '14px 18px', display: 'flex', alignItems: 'flex-start', gap: '10px'
            }}>
              <FileText size={18} color="#d97706" style={{ marginTop: '2px', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#92400e', marginBottom: '2px' }}>
                  Institutional Payroll Notes:
                </div>
                <div style={{ fontSize: '11px', color: '#b45309' }}>
                  {notes}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
