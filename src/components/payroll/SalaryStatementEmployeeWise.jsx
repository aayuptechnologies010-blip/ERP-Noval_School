import React, { useState, useEffect } from 'react';
import {
  Eye, Download, Printer, Search, RefreshCw, CheckCircle,
  AlertCircle, Sparkles, DollarSign, Users, ShieldCheck,
  ChevronLeft, ChevronRight, Filter, Building2, User, CreditCard, Calendar
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function SalaryStatementEmployeeWise() {
  const [data, setData] = useState({
    employeeProfile: {},
    summary: {},
    monthlyBreakdown: []
  });
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Dynamic filter options
  const [filterOptions, setFilterOptions] = useState({
    schools: ['Ayup Tech', 'Ayup Technologies', 'Ayup Tech International'],
    banks: [],
    salaryAccounts: [],
    staffTypes: [],
    designations: [],
    financialYears: ['2026-2027', '2025-2026'],
    employees: []
  });

  // Sidebar filters
  const [schoolName, setSchoolName] = useState('Ayup Tech');
  const [schoolBank, setSchoolBank] = useState('All School Banks');
  const [salaryAccount, setSalaryAccount] = useState('All Salary A/C');
  const [staffType, setStaffType] = useState('All Staff Types');
  const [designation, setDesignation] = useState('All (38)');
  const [selectedStaff, setSelectedStaff] = useState('EMP-AT-001');
  const [financialYear, setFinancialYear] = useState('2026-2027');
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

  const fetchFilterOptions = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/salary-structure/monthly-reports-filter-options`, { headers });
      if (res.ok) {
        const json = await res.json();
        setFilterOptions(prev => ({
          ...prev,
          ...json,
          schools: json.schools?.length ? json.schools : ['Ayup Tech'],
          financialYears: json.financialYears?.length ? json.financialYears : ['2026-2027', '2025-2026']
        }));
        if (json.schools?.[0]) setSchoolName(json.schools[0]);
        if (json.employees?.length > 0 && (!selectedStaff || selectedStaff === 'EMP-AT-001')) {
          setSelectedStaff(json.employees[0].employeeId);
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
      if (selectedStaff) params.append('employeeId', selectedStaff);
      if (financialYear) params.append('financialYear', financialYear);
      if (searchTerm) params.append('search', searchTerm);

      const res = await fetch(`${API_BASE}/api/salary-structure/yearly-employee-statement?${params.toString()}`, { headers });
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        showNotif('error', 'Failed to fetch employee salary statement');
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
    setStaffType('All Staff Types');
    setDesignation(`All (${filterOptions.designations?.length || 38})`);
    setFinancialYear('2026-2027');
    if (filterOptions.employees?.length > 0) {
      setSelectedStaff(filterOptions.employees[0].employeeId);
    }
    setSearchTerm('');
    setTimeout(() => fetchReport(), 50);
  };

  const profile = data.employeeProfile || {};
  const summary = data.summary || {};
  const months = data.monthlyBreakdown || [];

  const exportCSV = () => {
    if (!months.length) return;
    const headersList = [
      '#', 'Month', 'Basic Pay (₹)', 'HRA (₹)', 'DA (₹)', 'Conveyance (₹)',
      'Special Allowance (₹)', 'Gross Salary (₹)', 'PF (₹)', 'TDS (₹)',
      'Insurance (₹)', 'Total Deductions (₹)', 'Net Take-Home (₹)', 'Payment Mode', 'Status'
    ];
    const rows = months.map((m, i) => [
      i + 1,
      `"${m.monthYear}"`,
      m.basicSalary,
      m.hra,
      m.da,
      m.conveyance,
      m.specialAllowance,
      m.grossSalary,
      m.pfDeduction,
      m.tdsDeduction,
      m.insuranceDeduction,
      m.totalDeductions,
      m.netSalary,
      `"${m.paymentMode}"`,
      `"${m.status}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headersList.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Salary_Statement_${profile.staffName || 'Employee'}_${financialYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotif('success', 'CSV downloaded successfully');
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
                Employee Filters
              </span>
            </div>

            <div className="form-group">
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', display: 'block' }}>School Name</label>
              <select value={schoolName} onChange={e => setSchoolName(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '12px' }}>
                {(filterOptions.schools || ['Ayup Tech']).map((sch, idx) => (
                  <option key={idx} value={sch}>{sch}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', display: 'block' }}>School Bank</label>
              <select value={schoolBank} onChange={e => setSchoolBank(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '12px' }}>
                <option>All School Banks</option>
                {(filterOptions.banks || []).map((b, idx) => (
                  <option key={idx} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', display: 'block' }}>Salary A/c No.</label>
              <select value={salaryAccount} onChange={e => setSalaryAccount(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '12px' }}>
                <option>All Salary A/C</option>
                {(filterOptions.salaryAccounts || []).map((a, idx) => (
                  <option key={idx} value={a}>{a}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', display: 'block' }}>Staff Type</label>
              <select value={staffType} onChange={e => setStaffType(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '12px' }}>
                <option>All Staff Types</option>
                {(filterOptions.staffTypes || []).map((t, idx) => (
                  <option key={idx} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', display: 'block' }}>Select Employee / Staff</label>
              <select value={selectedStaff} onChange={e => setSelectedStaff(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '12px', fontWeight: '600' }}>
                {(filterOptions.employees || [
                  { employeeId: 'EMP-AT-001', staffName: 'Ayup Tech Lead' },
                  { employeeId: 'EMP-AT-002', staffName: 'Ayup Sharma' }
                ]).map((emp, idx) => (
                  <option key={idx} value={emp.employeeId}>{emp.staffName} ({emp.employeeId})</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', display: 'block' }}>Financial Year</label>
              <select value={financialYear} onChange={e => setFinancialYear(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '12px' }}>
                {(filterOptions.financialYears || ['2026-2027', '2025-2026']).map((yr, idx) => (
                  <option key={idx} value={yr}>{yr}</option>
                ))}
              </select>
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
                  Salary Statement (Employee Wise)
                </h2>
                <span style={{
                  backgroundColor: '#e6fffa', color: '#047481', padding: '2px 8px',
                  borderRadius: '12px', fontSize: '11px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px'
                }}>
                  <Sparkles size={12} /> FY {financialYear}
                </span>
                <span style={{
                  backgroundColor: '#eff6ff', color: '#1d4ed8', padding: '2px 8px',
                  borderRadius: '12px', fontSize: '11px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px'
                }}>
                  <Building2 size={12} /> {schoolName}
                </span>
              </div>
              <p style={{ fontSize: '12px', color: '#718096', margin: '4px 0 0 0' }}>
                Annual 12-month salary ledger, earnings progression, statutory deductions & net take-home
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
                <Download size={13} /> Export Statement
              </button>

              <button
                onClick={() => window.print()}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 12px',
                  backgroundColor: '#159BD7', border: 'none', borderRadius: '6px',
                  fontSize: '12px', fontWeight: '600', color: '#ffffff', cursor: 'pointer'
                }}
              >
                <Printer size={13} /> Print
              </button>
            </div>
          </div>

          {/* Employee Profile Banner */}
          {profile.staffName && (
            <div style={{
              backgroundColor: '#ffffff', padding: '18px 24px', borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '20px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#159BD7',
                  color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '18px', fontWeight: '700'
                }}>
                  {profile.staffName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#1a202c' }}>
                      {profile.staffName}
                    </h3>
                    <span style={{ backgroundColor: '#ebf8ff', color: '#2b6cb0', padding: '2px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '700' }}>
                      {profile.employeeId}
                    </span>
                    <span style={{ backgroundColor: '#f0fff4', color: '#276749', padding: '2px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '600' }}>
                      {profile.staffType}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#4a5568', marginTop: '4px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <span><strong>Dept:</strong> {profile.department}</span>
                    <span><strong>Role:</strong> {profile.designation}</span>
                    <span><strong>DOJ:</strong> {profile.doj || '15-Jun-2021'}</span>
                    <span><strong>PAN:</strong> {profile.panNumber || 'AYUPT1234A'}</span>
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'right', fontSize: '12px', color: '#4a5568', borderLeft: '1px solid #edf2f7', paddingLeft: '16px' }}>
                <div><strong>Bank:</strong> {profile.bankName}</div>
                <div><strong>A/C:</strong> {profile.bankAccountNo} (IFSC: {profile.ifscCode})</div>
                <div><strong>Salary A/C:</strong> {profile.salaryAccount}</div>
              </div>
            </div>
          )}

          {/* Metric Stat Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
            <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #159BD7', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#718096', fontWeight: '600' }}>ANNUAL GROSS EARNINGS</span>
                <DollarSign size={18} color="#159BD7" />
              </div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#1a202c', marginTop: '6px' }}>
                ₹{(summary.annualGross || 0).toLocaleString('en-IN')}
              </div>
              <span style={{ fontSize: '11px', color: '#718096' }}>Across {summary.monthsProcessed || 0} months</span>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #EF4444', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#718096', fontWeight: '600' }}>ANNUAL DEDUCTIONS</span>
                <ShieldCheck size={18} color="#EF4444" />
              </div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#1a202c', marginTop: '6px' }}>
                ₹{(summary.annualDeductions || 0).toLocaleString('en-IN')}
              </div>
              <span style={{ fontSize: '11px', color: '#718096' }}>PF, TDS, Taxes</span>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #10B981', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#718096', fontWeight: '600' }}>ANNUAL NET TAKE-HOME</span>
                <CheckCircle size={18} color="#10B981" />
              </div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#1a202c', marginTop: '6px' }}>
                ₹{(summary.annualNetTakeHome || 0).toLocaleString('en-IN')}
              </div>
              <span style={{ fontSize: '11px', color: '#10B981', fontWeight: '500' }}>Direct bank credit</span>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #8B5CF6', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#718096', fontWeight: '600' }}>MONTHS PROCESSED</span>
                <Calendar size={18} color="#8B5CF6" />
              </div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#8B5CF6', marginTop: '6px' }}>
                {summary.monthsProcessed || 0} / 12
              </div>
              <span style={{ fontSize: '11px', color: '#718096' }}>Full financial year</span>
            </div>
          </div>

          {/* 12-Month Progression Table */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left', minWidth: '1000px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#4a5568', fontWeight: '700' }}>
                    <th style={{ padding: '12px 14px' }}>#</th>
                    <th style={{ padding: '12px 14px' }}>Salary Month</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>Basic (₹)</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>DA (₹)</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>HRA (₹)</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>Allowances (₹)</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>Gross Pay (₹)</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>PF (₹)</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>TDS (₹)</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>Total Ded. (₹)</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>Net Take-Home (₹)</th>
                    <th style={{ padding: '12px 14px' }}>Disbursed Date</th>
                    <th style={{ padding: '12px 14px', textAlign: 'center' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {months.length === 0 ? (
                    <tr>
                      <td colSpan={13} style={{ padding: '30px', textAlign: 'center', color: '#a0aec0' }}>
                        No monthly salary statements found for this employee
                      </td>
                    </tr>
                  ) : (
                    months.map((m, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #edf2f7', backgroundColor: idx % 2 === 0 ? '#ffffff' : '#fafafa' }}>
                        <td style={{ padding: '12px 14px', color: '#718096' }}>{idx + 1}</td>
                        <td style={{ padding: '12px 14px', fontWeight: '600', color: '#1a202c' }}>{m.monthYear}</td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', color: '#4a5568' }}>₹{m.basicSalary.toLocaleString('en-IN')}</td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', color: '#4a5568' }}>₹{m.da.toLocaleString('en-IN')}</td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', color: '#4a5568' }}>₹{m.hra.toLocaleString('en-IN')}</td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', color: '#4a5568' }}>
                          ₹{((m.conveyance || 0) + (m.specialAllowance || 0)).toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: '600', color: '#1a202c' }}>
                          ₹{m.grossSalary.toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', color: '#e53e3e' }}>₹{m.pfDeduction.toLocaleString('en-IN')}</td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', color: '#e53e3e' }}>₹{m.tdsDeduction.toLocaleString('en-IN')}</td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: '600', color: '#e53e3e' }}>
                          ₹{m.totalDeductions.toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: '700', color: '#10B981' }}>
                          ₹{m.netSalary.toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '12px 14px', color: '#718096' }}>{m.disbursedDate}</td>
                        <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                          <span style={{
                            backgroundColor: '#def7ec', color: '#03543f', padding: '3px 10px',
                            borderRadius: '12px', fontSize: '11px', fontWeight: '600'
                          }}>
                            {m.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
                {months.length > 0 && (
                  <tfoot>
                    <tr style={{ backgroundColor: '#f1f5f9', fontWeight: '700', borderTop: '2px solid #cbd5e0' }}>
                      <td colSpan={2} style={{ padding: '12px 14px', color: '#1a202c' }}>ANNUAL TOTAL</td>
                      <td style={{ padding: '12px 14px', textAlign: 'right', color: '#4a5568' }}>
                        ₹{(summary.annualBasic || 0).toLocaleString('en-IN')}
                      </td>
                      <td colSpan={3} style={{ padding: '12px 14px' }}></td>
                      <td style={{ padding: '12px 14px', textAlign: 'right', color: '#1a202c' }}>
                        ₹{(summary.annualGross || 0).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '12px 14px', textAlign: 'right', color: '#e53e3e' }}>
                        ₹{(summary.annualPf || 0).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '12px 14px', textAlign: 'right', color: '#e53e3e' }}>
                        ₹{(summary.annualTds || 0).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '12px 14px', textAlign: 'right', color: '#e53e3e' }}>
                        ₹{(summary.annualDeductions || 0).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '12px 14px', textAlign: 'right', color: '#10B981' }}>
                        ₹{(summary.annualNetTakeHome || 0).toLocaleString('en-IN')}
                      </td>
                      <td colSpan={2} style={{ padding: '12px 14px' }}></td>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
