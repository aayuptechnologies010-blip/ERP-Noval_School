import React, { useState, useEffect } from 'react';
import {
  Eye, Download, Printer, Search, RefreshCw, CheckCircle,
  AlertCircle, Sparkles, DollarSign, Users, ShieldCheck,
  ChevronLeft, ChevronRight, Filter, Building2, FileSpreadsheet
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function IncomeTaxReport() {
  const [data, setData] = useState({ summary: {}, records: [] });
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
    months: ['Aug-2026', 'Jul-2026', 'Sep-2026', 'Oct-2026']
  });

  // Sidebar filters
  const [schoolName, setSchoolName] = useState('Ayup Tech');
  const [schoolBank, setSchoolBank] = useState('All School Banks');
  const [salaryAccount, setSalaryAccount] = useState('All Salary A/C');
  const [monthYear, setMonthYear] = useState('Aug-2026');
  const [staffType, setStaffType] = useState('All Staff Types');
  const [designation, setDesignation] = useState('All');
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
          months: json.months?.length ? json.months : ['Aug-2026', 'Jul-2026', 'Sep-2026', 'Oct-2026']
        }));
        if (json.schools?.[0]) setSchoolName(json.schools[0]);
        if (json.months?.[0]) setMonthYear(json.months[0]);
      }
    } catch (e) {
      console.error('Failed to load filter options', e);
    }
  };

  const fetchReport = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (monthYear && monthYear !== 'All') params.append('monthYear', monthYear);
      if (schoolBank && !schoolBank.includes('All')) params.append('schoolBank', schoolBank);
      if (salaryAccount && !salaryAccount.includes('All')) params.append('salaryAccount', salaryAccount);
      if (staffType && !staffType.includes('All')) params.append('staffType', staffType);
      if (designation && !designation.includes('All')) params.append('designation', designation);
      if (searchTerm) params.append('search', searchTerm);

      const res = await fetch(`${API_BASE}/api/salary-structure/income-tax-report?${params.toString()}`, { headers });
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        showNotif('error', 'Failed to fetch Income Tax report');
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
    setMonthYear(filterOptions.months?.[0] || 'Aug-2026');
    setStaffType('All Staff Types');
    setDesignation('All');
    setSearchTerm('');
    setTimeout(() => fetchReport(), 50);
  };

  const summary = data.summary || {};
  const records = data.records || [];

  const filteredRecords = records.filter(r => {
    if (!searchTerm) return true;
    const s = searchTerm.toLowerCase();
    return (
      (r.staffName && r.staffName.toLowerCase().includes(s)) ||
      (r.employeeId && r.employeeId.toLowerCase().includes(s)) ||
      (r.panNumber && r.panNumber.toLowerCase().includes(s)) ||
      (r.department && r.department.toLowerCase().includes(s)) ||
      (r.designation && r.designation.toLowerCase().includes(s))
    );
  });

  const exportCSV = () => {
    if (!filteredRecords.length) return;
    const headersList = [
      '#', 'Emp ID', 'Staff Name', 'PAN Number', 'Designation', 'Department', 'Staff Type',
      'Monthly Gross (₹)', 'Standard Deduction (₹)', '80C Investments (₹)', 'Taxable Income (₹)',
      'TDS Deducted (₹)', 'Challan Status', 'Month'
    ];
    const rows = filteredRecords.map((r, i) => [
      i + 1,
      `"${r.employeeId || ''}"`,
      `"${r.staffName || ''}"`,
      `"${r.panNumber || ''}"`,
      `"${r.designation || ''}"`,
      `"${r.department || ''}"`,
      `"${r.staffType || ''}"`,
      r.grossSalary,
      r.standardDeduction,
      r.declaredInvestments,
      r.taxableIncome,
      r.tdsDeduction,
      `"${r.challanStatus || 'Deposited'}"`,
      `"${r.monthYear || monthYear}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headersList.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Income_Tax_TDS_Report_${monthYear}.csv`);
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
                Tax Filters
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
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', display: 'block' }}>Months</label>
              <select value={monthYear} onChange={e => setMonthYear(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '12px' }}>
                {(filterOptions.months || ['Aug-2026', 'Jul-2026', 'Sep-2026', 'Oct-2026']).map((m, idx) => (
                  <option key={idx} value={m}>{m}</option>
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
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', display: 'block' }}>Designation</label>
              <select value={designation} onChange={e => setDesignation(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '12px' }}>
                <option>All</option>
                {(filterOptions.designations || []).map((d, idx) => (
                  <option key={idx} value={d}>{d}</option>
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
                  Income Tax (TDS) Report
                </h2>
                <span style={{
                  backgroundColor: '#e6fffa', color: '#047481', padding: '2px 8px',
                  borderRadius: '12px', fontSize: '11px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px'
                }}>
                  <Sparkles size={12} /> {monthYear}
                </span>
                <span style={{
                  backgroundColor: '#eff6ff', color: '#1d4ed8', padding: '2px 8px',
                  borderRadius: '12px', fontSize: '11px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px'
                }}>
                  <Building2 size={12} /> {schoolName}
                </span>
              </div>
              <p style={{ fontSize: '12px', color: '#718096', margin: '4px 0 0 0' }}>
                Statutory Section 192 TDS deduction report, monthly taxable income computation and Challan 281 audit log
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ position: 'relative' }}>
                <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#a0aec0' }} />
                <input
                  type="text"
                  placeholder="Search staff, PAN, dept..."
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
            <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #EF4444', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#718096', fontWeight: '600' }}>TOTAL TDS DEDUCTED</span>
                <ShieldCheck size={18} color="#EF4444" />
              </div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#1a202c', marginTop: '6px' }}>
                ₹{(summary.totalTdsDeducted || 0).toLocaleString('en-IN')}
              </div>
              <span style={{ fontSize: '11px', color: '#718096' }}>For month {monthYear}</span>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #159BD7', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#718096', fontWeight: '600' }}>TAXABLE GROSS</span>
                <DollarSign size={18} color="#159BD7" />
              </div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#1a202c', marginTop: '6px' }}>
                ₹{(summary.totalTaxableGross || 0).toLocaleString('en-IN')}
              </div>
              <span style={{ fontSize: '11px', color: '#718096' }}>Post standard deduction</span>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #10B981', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#718096', fontWeight: '600' }}>TAX PAYERS</span>
                <Users size={18} color="#10B981" />
              </div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#1a202c', marginTop: '6px' }}>
                {summary.taxPayersCount || 0} / {summary.totalStaffCount || 0}
              </div>
              <span style={{ fontSize: '11px', color: '#10B981', fontWeight: '500' }}>Staff liable for TDS</span>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #8B5CF6', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#718096', fontWeight: '600' }}>AVG MONTHLY TDS</span>
                <Sparkles size={18} color="#8B5CF6" />
              </div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#1a202c', marginTop: '6px' }}>
                ₹{(summary.avgTdsPerTaxPayer || 0).toLocaleString('en-IN')}
              </div>
              <span style={{ fontSize: '11px', color: '#8B5CF6', fontWeight: '500' }}>Per assessed staff</span>
            </div>
          </div>

          {/* Master TDS Table */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left', minWidth: '1000px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#4a5568', fontWeight: '700' }}>
                    <th style={{ padding: '12px 14px' }}>#</th>
                    <th style={{ padding: '12px 14px' }}>Emp ID</th>
                    <th style={{ padding: '12px 14px' }}>Staff Name</th>
                    <th style={{ padding: '12px 14px' }}>PAN Number</th>
                    <th style={{ padding: '12px 14px' }}>Department</th>
                    <th style={{ padding: '12px 14px' }}>Designation</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>Gross (₹)</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>Std Ded. (₹)</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>Taxable Income (₹)</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>TDS Deducted (₹)</th>
                    <th style={{ padding: '12px 14px', textAlign: 'center' }}>Challan Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.length === 0 ? (
                    <tr>
                      <td colSpan={11} style={{ padding: '30px', textAlign: 'center', color: '#a0aec0' }}>
                        No tax records match the selected month and filters
                      </td>
                    </tr>
                  ) : (
                    filteredRecords.map((r, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #edf2f7', backgroundColor: idx % 2 === 0 ? '#ffffff' : '#fafafa' }}>
                        <td style={{ padding: '12px 14px', color: '#718096' }}>{idx + 1}</td>
                        <td style={{ padding: '12px 14px', fontWeight: '600', color: '#159BD7' }}>{r.employeeId}</td>
                        <td style={{ padding: '12px 14px', fontWeight: '600', color: '#1a202c' }}>{r.staffName}</td>
                        <td style={{ padding: '12px 14px', fontFamily: 'monospace', color: '#4a5568' }}>{r.panNumber}</td>
                        <td style={{ padding: '12px 14px', color: '#4a5568' }}>{r.department}</td>
                        <td style={{ padding: '12px 14px', color: '#4a5568' }}>{r.designation}</td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: '600', color: '#1a202c' }}>
                          ₹{r.grossSalary.toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', color: '#718096' }}>
                          ₹{r.standardDeduction.toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', color: '#2b6cb0', fontWeight: '600' }}>
                          ₹{r.taxableIncome.toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: '700', color: '#e53e3e' }}>
                          ₹{r.tdsDeduction.toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                          <span style={{
                            backgroundColor: r.tdsDeduction > 0 ? '#def7ec' : '#f3f4f6',
                            color: r.tdsDeduction > 0 ? '#03543f' : '#6b7280',
                            padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '600'
                          }}>
                            {r.challanStatus}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
                {filteredRecords.length > 0 && (
                  <tfoot>
                    <tr style={{ backgroundColor: '#f1f5f9', fontWeight: '700', borderTop: '2px solid #cbd5e0' }}>
                      <td colSpan={6} style={{ padding: '12px 14px', color: '#1a202c' }}>TOTALS</td>
                      <td style={{ padding: '12px 14px', textAlign: 'right', color: '#1a202c' }}>
                        ₹{filteredRecords.reduce((sum, r) => sum + r.grossSalary, 0).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '12px 14px', textAlign: 'right', color: '#718096' }}>
                        ₹{filteredRecords.reduce((sum, r) => sum + r.standardDeduction, 0).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '12px 14px', textAlign: 'right', color: '#2b6cb0' }}>
                        ₹{(summary.totalTaxableGross || 0).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '12px 14px', textAlign: 'right', color: '#e53e3e' }}>
                        ₹{(summary.totalTdsDeducted || 0).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '12px 14px', textAlign: 'center', color: '#03543f' }}>100% Deposited</td>
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
