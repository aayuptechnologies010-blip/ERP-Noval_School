import React, { useState, useEffect } from 'react';
import {
  Eye, Download, Printer, Search, RefreshCw, CheckCircle,
  AlertCircle, Sparkles, DollarSign, Users, PieChart,
  ChevronLeft, ChevronRight, Filter, TrendingUp, Award, Building2
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function GrossSalaryReport() {
  const [data, setData] = useState({ records: [], summary: {} });
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
    designations: [],
    employees: []
  });

  // Sidebar filters
  const [schoolName, setSchoolName] = useState('Ayup Tech');
  const [schoolBank, setSchoolBank] = useState('All School Banks');
  const [salaryAccount, setSalaryAccount] = useState('All Salary A/C');
  const [staffType, setStaffType] = useState('All');
  const [designation, setDesignation] = useState('All');
  const [monthYear, setMonthYear] = useState('Aug-2026');
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
      if (monthYear) params.append('monthYear', monthYear);
      if (staffType && staffType !== 'All') params.append('staffType', staffType);
      if (designation && designation !== 'All' && !designation.includes('All')) params.append('designation', designation);
      if (schoolBank && schoolBank !== 'All School Banks' && !schoolBank.includes('All')) params.append('schoolBank', schoolBank);
      if (salaryAccount && salaryAccount !== 'All Salary A/C' && !salaryAccount.includes('All')) params.append('salaryAccount', salaryAccount);
      if (searchTerm) params.append('search', searchTerm);

      const res = await fetch(`${API_BASE}/api/salary-structure/gross-salary-report?${params.toString()}`, { headers });
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        showNotif('error', 'Failed to fetch gross salary report');
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
    setDesignation('All');
    setMonthYear(filterOptions.months?.[0] || 'Aug-2026');
    setSearchTerm('');
    setTimeout(() => fetchReport(), 50);
  };

  const records = data.records || [];
  const summary = data.summary || {};

  const filteredRecords = records.filter(r => {
    if (!searchTerm) return true;
    const s = searchTerm.toLowerCase();
    return (
      (r.staffName && r.staffName.toLowerCase().includes(s)) ||
      (r.employeeId && r.employeeId.toLowerCase().includes(s)) ||
      (r.department && r.department.toLowerCase().includes(s)) ||
      (r.designation && r.designation.toLowerCase().includes(s))
    );
  });

  const exportCSV = () => {
    if (!filteredRecords.length) return;
    const headersList = [
      '#', 'Emp ID', 'Staff Name', 'Department', 'Designation', 'Staff Type',
      'Bank Name', 'Basic Pay', 'DA', 'HRA', 'Conveyance', 'Special Allowance',
      'Other Allowances', 'Monthly Gross', 'Est. Annual Gross', 'Basic %', 'Allowances %',
      'Payroll Share %', 'Status'
    ];
    const rows = filteredRecords.map((r, i) => [
      i + 1,
      `"${r.employeeId || ''}"`,
      `"${r.staffName || ''}"`,
      `"${r.department || ''}"`,
      `"${r.designation || ''}"`,
      `"${r.staffType || ''}"`,
      `"${r.bankName || ''}"`,
      r.basicSalary || 0,
      r.da || 0,
      r.hra || 0,
      r.conveyance || 0,
      r.specialAllowance || 0,
      r.otherAllowances || 0,
      r.grossSalary || 0,
      r.ytdEstimatedGross || 0,
      `${r.basicPercent}%`,
      `${r.allowancesPercent}%`,
      `${r.shareOfTotalPayroll}%`,
      `"${r.status || 'Paid'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headersList.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Gross_Salary_Report_${monthYear}.csv`);
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
                Gross Filters
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
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', display: 'block' }}>Designation</label>
              <select value={designation} onChange={e => setDesignation(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '12px' }}>
                <option value="All">All Designations</option>
                {(filterOptions.designations || []).map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', display: 'block' }}>Salary Month</label>
              <select value={monthYear} onChange={e => setMonthYear(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '12px' }}>
                {(filterOptions.months && filterOptions.months.length > 0 ? filterOptions.months : ['Aug-2026', 'Jul-2026', 'Sep-2026', 'Oct-2026']).map(m => (
                  <option key={m} value={m}>{m}</option>
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
                  Gross Salary Analytics Report
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
                Analysis of gross wage components, basic pay vs allowances ratios, and payroll expenditure distribution
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ position: 'relative' }}>
                <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#a0aec0' }} />
                <input
                  type="text"
                  placeholder="Search staff / dept..."
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
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#718096', textTransform: 'uppercase' }}>Faculty / Staff</span>
                <Users size={16} color="#159BD7" />
              </div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#1a202c', marginTop: '6px' }}>
                {filteredRecords.length}
              </div>
              <div style={{ fontSize: '11px', color: '#718096', marginTop: '4px' }}>
                Month: {monthYear}
              </div>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #10B981', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#718096', textTransform: 'uppercase' }}>Total Gross Payroll</span>
                <DollarSign size={16} color="#10B981" />
              </div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#1a202c', marginTop: '6px' }}>
                ₹{(summary.totalGrossSalary || 0).toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: '11px', color: '#10B981', marginTop: '4px', fontWeight: '500' }}>
                Basic + Allowances
              </div>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #F59E0B', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#718096', textTransform: 'uppercase' }}>Average Gross</span>
                <TrendingUp size={16} color="#F59E0B" />
              </div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#1a202c', marginTop: '6px' }}>
                ₹{(summary.averageGrossSalary || 0).toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: '11px', color: '#718096', marginTop: '4px' }}>
                Per Employee
              </div>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #8B5CF6', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#718096', textTransform: 'uppercase' }}>Highest Gross Pay</span>
                <Award size={16} color="#8B5CF6" />
              </div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#1a202c', marginTop: '6px' }}>
                ₹{(summary.highestGross || 0).toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: '11px', color: '#8B5CF6', marginTop: '4px', fontWeight: '500' }}>
                Ayup Tech Lead
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div style={{
            backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            border: '1px solid #e2e8f0', overflow: 'hidden'
          }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#4a5568' }}>
                    <th style={{ padding: '10px 12px', fontWeight: '700' }}>#</th>
                    <th style={{ padding: '10px 12px', fontWeight: '700' }}>Emp ID</th>
                    <th style={{ padding: '10px 12px', fontWeight: '700' }}>Employee Name</th>
                    <th style={{ padding: '10px 12px', fontWeight: '700' }}>Department</th>
                    <th style={{ padding: '10px 12px', fontWeight: '700' }}>Designation</th>
                    <th style={{ padding: '10px 12px', fontWeight: '700', textAlign: 'right' }}>Basic Pay</th>
                    <th style={{ padding: '10px 12px', fontWeight: '700', textAlign: 'right' }}>DA</th>
                    <th style={{ padding: '10px 12px', fontWeight: '700', textAlign: 'right' }}>HRA</th>
                    <th style={{ padding: '10px 12px', fontWeight: '700', textAlign: 'right' }}>Allowances</th>
                    <th style={{ padding: '10px 12px', fontWeight: '700', textAlign: 'right', backgroundColor: '#e0f2fe', color: '#0369a1' }}>Monthly Gross</th>
                    <th style={{ padding: '10px 12px', fontWeight: '700', textAlign: 'center' }}>Basic vs Allowances</th>
                    <th style={{ padding: '10px 12px', fontWeight: '700', textAlign: 'right' }}>Payroll Share</th>
                    <th style={{ padding: '10px 12px', fontWeight: '700', textAlign: 'center' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.length === 0 ? (
                    <tr>
                      <td colSpan={13} style={{ padding: '30px', textAlign: 'center', color: '#a0aec0' }}>
                        No gross salary records found.
                      </td>
                    </tr>
                  ) : (
                    filteredRecords.map((r, idx) => {
                      const isAyup = r.staffName && r.staffName.includes('Ayup');
                      const totalAllowances = (r.conveyance || 0) + (r.specialAllowance || 0);

                      return (
                        <tr
                          key={r._id || idx}
                          style={{
                            borderBottom: '1px solid #edf2f7',
                            backgroundColor: isAyup ? 'rgba(21, 155, 215, 0.04)' : (idx % 2 === 0 ? '#ffffff' : '#fbfcfd')
                          }}
                        >
                          <td style={{ padding: '10px 12px', color: '#718096' }}>{idx + 1}</td>
                          <td style={{ padding: '10px 12px', fontWeight: '600', color: '#2d3748' }}>{r.employeeId || '—'}</td>
                          <td style={{ padding: '10px 12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span style={{ fontWeight: '700', color: '#1a202c' }}>{r.staffName}</span>
                              {isAyup && (
                                <span style={{
                                  backgroundColor: '#159BD7', color: 'white', padding: '1px 6px',
                                  borderRadius: '10px', fontSize: '10px', fontWeight: '700'
                                }}>
                                  AYUP
                                </span>
                              )}
                            </div>
                          </td>
                          <td style={{ padding: '10px 12px', color: '#4a5568' }}>{r.department}</td>
                          <td style={{ padding: '10px 12px', color: '#4a5568' }}>{r.designation}</td>
                          <td style={{ padding: '10px 12px', textAlign: 'right', color: '#4a5568' }}>₹{r.basicSalary.toLocaleString('en-IN')}</td>
                          <td style={{ padding: '10px 12px', textAlign: 'right', color: '#4a5568' }}>₹{r.da.toLocaleString('en-IN')}</td>
                          <td style={{ padding: '10px 12px', textAlign: 'right', color: '#4a5568' }}>₹{r.hra.toLocaleString('en-IN')}</td>
                          <td style={{ padding: '10px 12px', textAlign: 'right', color: '#4a5568' }}>₹{totalAllowances.toLocaleString('en-IN')}</td>
                          <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: '800', backgroundColor: '#f0f9ff', color: '#0369a1', fontSize: '13px' }}>
                            ₹{r.grossSalary.toLocaleString('en-IN')}
                          </td>
                          <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center' }}>
                              <span style={{ fontSize: '10px', color: '#0369a1', fontWeight: '700' }}>{r.basicPercent}%</span>
                              <div style={{ width: '40px', height: '6px', backgroundColor: '#fed7aa', borderRadius: '3px', overflow: 'hidden' }}>
                                <div style={{ width: `${r.basicPercent}%`, height: '100%', backgroundColor: '#0284c7' }}></div>
                              </div>
                              <span style={{ fontSize: '10px', color: '#ea580c', fontWeight: '700' }}>{r.allowancesPercent}%</span>
                            </div>
                          </td>
                          <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: '700', color: '#8B5CF6' }}>
                            {r.shareOfTotalPayroll}%
                          </td>
                          <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                            <span style={{
                              backgroundColor: '#dcfce7', color: '#15803d', padding: '2px 8px',
                              borderRadius: '10px', fontSize: '11px', fontWeight: '600'
                            }}>
                              {r.status || 'Paid'}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
                {filteredRecords.length > 0 && (
                  <tfoot>
                    <tr style={{ backgroundColor: '#f1f5f9', fontWeight: '800', borderTop: '2px solid #cbd5e0' }}>
                      <td colSpan={5} style={{ padding: '12px', textAlign: 'right' }}>Total Gross Payroll ({filteredRecords.length} Staff):</td>
                      <td style={{ padding: '12px', textAlign: 'right' }}>₹{filteredRecords.reduce((s, r) => s + r.basicSalary, 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px', textAlign: 'right' }}>₹{filteredRecords.reduce((s, r) => s + r.da, 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px', textAlign: 'right' }}>₹{filteredRecords.reduce((s, r) => s + r.hra, 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px', textAlign: 'right' }}>₹{filteredRecords.reduce((s, r) => s + ((r.conveyance || 0) + (r.specialAllowance || 0)), 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px', textAlign: 'right', backgroundColor: '#e0f2fe', color: '#0369a1', fontSize: '14px' }}>
                        ₹{filteredRecords.reduce((s, r) => s + r.grossSalary, 0).toLocaleString('en-IN')}
                      </td>
                      <td colSpan={2} style={{ padding: '12px', textAlign: 'center', color: '#8B5CF6' }}>100.0% Allocated</td>
                      <td></td>
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
