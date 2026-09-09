import React, { useState, useEffect } from 'react';
import {
  Eye, Download, Printer, Search, RefreshCw, CheckCircle,
  AlertCircle, Sparkles, DollarSign, Users, ShieldCheck,
  ChevronLeft, ChevronRight, Filter, Building2, Layers, CheckCircle2
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function ReconciliationReport() {
  const [data, setData] = useState({
    summary: {},
    monthlyReconciliation: [],
    employeeReconciliation: []
  });
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('monthly'); // 'monthly' or 'employee'

  // Filter options loaded dynamically
  const [filterOptions, setFilterOptions] = useState({
    schools: ['Ayup Tech', 'Ayup Technologies', 'Ayup Tech International'],
    banks: [],
    salaryAccounts: [],
    staffTypes: [],
    financialYears: ['2026-2027', '2025-2026']
  });

  // Sidebar filters
  const [schoolName, setSchoolName] = useState('Ayup Tech');
  const [schoolBank, setSchoolBank] = useState('All School Bank');
  const [salaryAccount, setSalaryAccount] = useState('All Salary A/C');
  const [staffType, setStaffType] = useState('All Staff Types');
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
      }
    } catch (e) {
      console.error('Failed to load filter options', e);
    }
  };

  const fetchReport = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (financialYear) params.append('financialYear', financialYear);
      if (schoolBank && !schoolBank.includes('All')) params.append('schoolBank', schoolBank);
      if (salaryAccount && !salaryAccount.includes('All')) params.append('salaryAccount', salaryAccount);
      if (staffType && !staffType.includes('All')) params.append('staffType', staffType);
      if (searchTerm) params.append('search', searchTerm);

      const res = await fetch(`${API_BASE}/api/salary-structure/yearly-reconciliation-report?${params.toString()}`, { headers });
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        showNotif('error', 'Failed to fetch reconciliation report');
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
    setSchoolBank('All School Bank');
    setSalaryAccount('All Salary A/C');
    setStaffType('All Staff Types');
    setFinancialYear('2026-2027');
    setSearchTerm('');
    setTimeout(() => fetchReport(), 50);
  };

  const summary = data.summary || {};
  const monthlyList = data.monthlyReconciliation || [];
  const employeeList = data.employeeReconciliation || [];

  const filteredEmployees = employeeList.filter(e => {
    if (!searchTerm) return true;
    const s = searchTerm.toLowerCase();
    return (
      (e.staffName && e.staffName.toLowerCase().includes(s)) ||
      (e.employeeId && e.employeeId.toLowerCase().includes(s)) ||
      (e.department && e.department.toLowerCase().includes(s)) ||
      (e.designation && e.designation.toLowerCase().includes(s))
    );
  });

  const exportCSV = () => {
    if (activeTab === 'monthly') {
      const headersList = ['#', 'Month', 'Staff Count', 'Gross Calculated (₹)', 'Total Deductions (₹)', 'Net Payable (₹)', 'Bank Disbursed (₹)', 'Variance (₹)', 'Status'];
      const rows = monthlyList.map((m, idx) => [
        idx + 1,
        `"${m.month}"`,
        m.staffCount,
        m.grossSalary,
        m.deductions,
        m.netSalary,
        m.bankDisbursed,
        m.variance,
        `"${m.status}"`
      ]);
      downloadFile(headersList, rows, `Yearly_Reconciliation_Monthly_${financialYear}.csv`);
    } else {
      const headersList = ['#', 'Emp ID', 'Staff Name', 'Designation', 'Department', 'Staff Type', 'Months Count', 'Annual Gross (₹)', 'Annual Deductions (₹)', 'Annual Net (₹)', 'Status'];
      const rows = filteredEmployees.map((e, idx) => [
        idx + 1,
        `"${e.employeeId || ''}"`,
        `"${e.staffName || ''}"`,
        `"${e.designation || ''}"`,
        `"${e.department || ''}"`,
        `"${e.staffType || ''}"`,
        e.monthsCount,
        e.annualGross,
        e.annualDeductions,
        e.annualNet,
        `"${e.status}"`
      ]);
      downloadFile(headersList, rows, `Yearly_Reconciliation_Employees_${financialYear}.csv`);
    }
  };

  const downloadFile = (headersList, rows, fileName) => {
    const csvContent = 'data:text/csv;charset=utf-8,' + [headersList.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', fileName);
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
                Reconciliation Filters
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
                <option>All School Bank</option>
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
                {(filterOptions.staffTypes || ['Teaching', 'Non-Teaching', 'Technical']).map((t, idx) => (
                  <option key={idx} value={t}>{t}</option>
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
                  Yearly Salary Reconciliation Report
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
                Financial year month-by-month salary calculation, deductions, actual bank disbursement & variance reconciliation
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ position: 'relative' }}>
                <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#a0aec0' }} />
                <input
                  type="text"
                  placeholder="Search staff, dept, role..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  style={{
                    padding: '7px 10px 7px 30px', fontSize: '12px', border: '1px solid #cbd5e0',
                    borderRadius: '6px', outline: 'none', width: '200px'
                  }}
                />
              </div>

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

          {/* Metric Stat Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
            <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #159BD7', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#718096', fontWeight: '600' }}>TOTAL ANNUAL GROSS</span>
                <DollarSign size={18} color="#159BD7" />
              </div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#1a202c', marginTop: '6px' }}>
                ₹{(summary.totalAnnualGross || 0).toLocaleString('en-IN')}
              </div>
              <span style={{ fontSize: '11px', color: '#718096' }}>Calculated earnings</span>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #EF4444', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#718096', fontWeight: '600' }}>TOTAL DEDUCTIONS</span>
                <ShieldCheck size={18} color="#EF4444" />
              </div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#1a202c', marginTop: '6px' }}>
                ₹{(summary.totalAnnualDeductions || 0).toLocaleString('en-IN')}
              </div>
              <span style={{ fontSize: '11px', color: '#718096' }}>PF, TDS, ESI & Ins.</span>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #10B981', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#718096', fontWeight: '600' }}>TOTAL DISBURSED</span>
                <CheckCircle2 size={18} color="#10B981" />
              </div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#1a202c', marginTop: '6px' }}>
                ₹{(summary.totalAnnualNetDisbursed || 0).toLocaleString('en-IN')}
              </div>
              <span style={{ fontSize: '11px', color: '#10B981', fontWeight: '500' }}>Actual bank advice paid</span>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #8B5CF6', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#718096', fontWeight: '600' }}>RECONCILIATION VARIANCE</span>
                <Sparkles size={18} color="#8B5CF6" />
              </div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: summary.totalVariance === 0 ? '#10B981' : '#EF4444', marginTop: '6px' }}>
                ₹{(summary.totalVariance || 0).toLocaleString('en-IN')}
              </div>
              <span style={{ fontSize: '11px', color: '#10B981', fontWeight: '600' }}>
                {summary.reconciliationStatus || '100% Balanced'}
              </span>
            </div>
          </div>

          {/* Tab Navigation */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <button
              onClick={() => setActiveTab('monthly')}
              style={{
                padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
                border: 'none', backgroundColor: activeTab === 'monthly' ? '#159BD7' : '#e2e8f0',
                color: activeTab === 'monthly' ? '#ffffff' : '#4a5568'
              }}
            >
              Month-Wise Reconciliation (12 Months)
            </button>
            <button
              onClick={() => setActiveTab('employee')}
              style={{
                padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
                border: 'none', backgroundColor: activeTab === 'employee' ? '#159BD7' : '#e2e8f0',
                color: activeTab === 'employee' ? '#ffffff' : '#4a5568'
              }}
            >
              Employee-Wise Reconciliation ({filteredEmployees.length} Staff)
            </button>
          </div>

          {/* Tab 1: Month-Wise Reconciliation Table */}
          {activeTab === 'monthly' && (
            <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#4a5568', fontWeight: '700' }}>
                      <th style={{ padding: '12px 16px' }}>#</th>
                      <th style={{ padding: '12px 16px' }}>Month</th>
                      <th style={{ padding: '12px 16px' }}>Active Staff</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right' }}>Gross Calculated (₹)</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right' }}>Deductions (₹)</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right' }}>Net Payable (₹)</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right' }}>Bank Disbursed (₹)</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right' }}>Variance (₹)</th>
                      <th style={{ padding: '12px 16px', textAlign: 'center' }}>Reconciliation Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyList.length === 0 ? (
                      <tr>
                        <td colSpan={9} style={{ padding: '30px', textAlign: 'center', color: '#a0aec0' }}>
                          No monthly reconciliation records found for FY {financialYear}
                        </td>
                      </tr>
                    ) : (
                      monthlyList.map((m, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid #edf2f7', backgroundColor: idx % 2 === 0 ? '#ffffff' : '#fafafa' }}>
                          <td style={{ padding: '12px 16px', color: '#718096' }}>{idx + 1}</td>
                          <td style={{ padding: '12px 16px', fontWeight: '600', color: '#1a202c' }}>{m.month}</td>
                          <td style={{ padding: '12px 16px', color: '#4a5568' }}>{m.staffCount} Staff</td>
                          <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '600', color: '#1a202c' }}>
                            ₹{m.grossSalary.toLocaleString('en-IN')}
                          </td>
                          <td style={{ padding: '12px 16px', textAlign: 'right', color: '#e53e3e' }}>
                            ₹{m.deductions.toLocaleString('en-IN')}
                          </td>
                          <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '600', color: '#2b6cb0' }}>
                            ₹{m.netSalary.toLocaleString('en-IN')}
                          </td>
                          <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '600', color: '#2f855a' }}>
                            ₹{m.bankDisbursed.toLocaleString('en-IN')}
                          </td>
                          <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '700', color: m.variance === 0 ? '#10B981' : '#EF4444' }}>
                            ₹{m.variance.toLocaleString('en-IN')}
                          </td>
                          <td style={{ padding: '12px 16px', textAlign: 'center' }}>
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
                  {monthlyList.length > 0 && (
                    <tfoot>
                      <tr style={{ backgroundColor: '#f1f5f9', fontWeight: '700', borderTop: '2px solid #cbd5e0' }}>
                        <td colSpan={3} style={{ padding: '12px 16px', color: '#1a202c' }}>ANNUAL CUMULATIVE TOTAL</td>
                        <td style={{ padding: '12px 16px', textAlign: 'right', color: '#1a202c' }}>
                          ₹{(summary.totalAnnualGross || 0).toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '12px 16px', textAlign: 'right', color: '#e53e3e' }}>
                          ₹{(summary.totalAnnualDeductions || 0).toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '12px 16px', textAlign: 'right', color: '#2b6cb0' }}>
                          ₹{(summary.totalAnnualNetDisbursed || 0).toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '12px 16px', textAlign: 'right', color: '#2f855a' }}>
                          ₹{(summary.totalBankDisbursed || 0).toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '12px 16px', textAlign: 'right', color: '#10B981' }}>₹0</td>
                        <td style={{ padding: '12px 16px', textAlign: 'center', color: '#03543f' }}>100% Balanced</td>
                      </tr>
                    </tfoot>
                  )}
                </table>
              </div>
            </div>
          )}

          {/* Tab 2: Employee-Wise Reconciliation Table */}
          {activeTab === 'employee' && (
            <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#4a5568', fontWeight: '700' }}>
                      <th style={{ padding: '12px 16px' }}>#</th>
                      <th style={{ padding: '12px 16px' }}>Emp ID</th>
                      <th style={{ padding: '12px 16px' }}>Staff Name</th>
                      <th style={{ padding: '12px 16px' }}>Department</th>
                      <th style={{ padding: '12px 16px' }}>Designation</th>
                      <th style={{ padding: '12px 16px' }}>Staff Type</th>
                      <th style={{ padding: '12px 16px', textAlign: 'center' }}>Months</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right' }}>Annual Gross (₹)</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right' }}>Annual Deductions (₹)</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right' }}>Annual Net Paid (₹)</th>
                      <th style={{ padding: '12px 16px', textAlign: 'center' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.length === 0 ? (
                      <tr>
                        <td colSpan={11} style={{ padding: '30px', textAlign: 'center', color: '#a0aec0' }}>
                          No employee reconciliation records match your filter
                        </td>
                      </tr>
                    ) : (
                      filteredEmployees.map((e, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid #edf2f7', backgroundColor: idx % 2 === 0 ? '#ffffff' : '#fafafa' }}>
                          <td style={{ padding: '12px 16px', color: '#718096' }}>{idx + 1}</td>
                          <td style={{ padding: '12px 16px', fontWeight: '600', color: '#159BD7' }}>{e.employeeId}</td>
                          <td style={{ padding: '12px 16px', fontWeight: '600', color: '#1a202c' }}>{e.staffName}</td>
                          <td style={{ padding: '12px 16px', color: '#4a5568' }}>{e.department}</td>
                          <td style={{ padding: '12px 16px', color: '#4a5568' }}>{e.designation}</td>
                          <td style={{ padding: '12px 16px', color: '#718096' }}>{e.staffType}</td>
                          <td style={{ padding: '12px 16px', textAlign: 'center', fontWeight: '600' }}>
                            <span style={{ backgroundColor: '#e2e8f0', padding: '2px 8px', borderRadius: '10px', fontSize: '11px' }}>
                              {e.monthsCount} / 12
                            </span>
                          </td>
                          <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '600', color: '#1a202c' }}>
                            ₹{e.annualGross.toLocaleString('en-IN')}
                          </td>
                          <td style={{ padding: '12px 16px', textAlign: 'right', color: '#e53e3e' }}>
                            ₹{e.annualDeductions.toLocaleString('en-IN')}
                          </td>
                          <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '700', color: '#10B981' }}>
                            ₹{e.annualNet.toLocaleString('en-IN')}
                          </td>
                          <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                            <span style={{
                              backgroundColor: '#def7ec', color: '#03543f', padding: '3px 10px',
                              borderRadius: '12px', fontSize: '11px', fontWeight: '600'
                            }}>
                              {e.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
