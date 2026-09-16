import React, { useState, useEffect } from 'react';
import {
  Eye, Download, Printer, Search, RefreshCw, CheckCircle,
  AlertCircle, Sparkles, DollarSign, Users, Layers,
  ChevronLeft, ChevronRight, Filter, PieChart, Award, Building2
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function HeadWiseGrossSalaryReport() {
  const [data, setData] = useState({ headSummary: [], records: [], totalGross: 0, totalStaff: 0 });
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

  // Sidebar filters matching mockup
  const [schoolName, setSchoolName] = useState('Ayup Tech');
  const [schoolBank, setSchoolBank] = useState('All Salary A/C');
  const [salaryAccount, setSalaryAccount] = useState('All Salary A/C No.');
  const [staffType, setStaffType] = useState('All Staff Types');
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
      if (monthYear && monthYear !== 'None selected') params.append('monthYear', monthYear);
      if (schoolBank && schoolBank !== 'All Salary A/C' && !schoolBank.includes('All')) params.append('schoolBank', schoolBank);
      if (staffType && staffType !== 'All Staff Types' && !staffType.includes('All')) params.append('staffType', staffType);
      if (designation && designation !== 'All' && !designation.includes('All')) params.append('designation', designation);

      const res = await fetch(`${API_BASE}/api/salary-structure/head-wise-gross-salary-report?${params.toString()}`, { headers });
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        showNotif('error', 'Failed to fetch head wise gross salary report');
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
    setSchoolBank('All Salary A/C');
    setSalaryAccount('All Salary A/C No.');
    setStaffType('All Staff Types');
    setDesignation('All');
    setMonthYear(filterOptions.months?.[0] || 'Aug-2026');
    setSearchTerm('');
    setTimeout(() => fetchReport(), 50);
  };

  const headSummary = data.headSummary || [];
  const records = data.records || [];
  const totalGross = data.totalGross || 0;
  const totalStaff = data.totalStaff || 0;

  const filteredRecords = records.filter(r => {
    if (!searchTerm) return true;
    const s = searchTerm.toLowerCase();
    return (
      (r.staffName && r.staffName.toLowerCase().includes(s)) ||
      (r.employeeId && r.employeeId.toLowerCase().includes(s)) ||
      (r.department && r.department.toLowerCase().includes(s))
    );
  });

  const exportCSV = () => {
    if (!filteredRecords.length) return;
    const headersList = [
      '#', 'Emp ID', 'Staff Name', 'Department', 'Designation', 'Staff Type',
      'Basic Salary', 'DA', 'HRA', 'Conveyance', 'Special Allowance', 'Total Gross Salary'
    ];
    const rows = filteredRecords.map((r, i) => [
      i + 1,
      `"${r.employeeId || ''}"`,
      `"${r.staffName || ''}"`,
      `"${r.department || ''}"`,
      `"${r.designation || ''}"`,
      `"${r.staffType || ''}"`,
      r.basicSalary || 0,
      r.da || 0,
      r.hra || 0,
      r.conveyance || 0,
      r.specialAllowance || 0,
      r.grossSalary || 0
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headersList.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Head_Wise_Gross_Salary_${monthYear}.csv`);
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
                Head Wise Filters
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
                <option value="All Salary A/C">All Salary A/C</option>
                {(filterOptions.banks || []).map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', display: 'block' }}>Salary A/c No.</label>
              <select value={salaryAccount} onChange={e => setSalaryAccount(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '12px' }}>
                <option value="All Salary A/C No.">All Salary A/C No.</option>
                {(filterOptions.salaryAccounts || []).map(sa => (
                  <option key={sa} value={sa}>{sa}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', display: 'block' }}>Staff Type</label>
              <select value={staffType} onChange={e => setStaffType(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '12px' }}>
                <option value="All Staff Types">All Staff Types</option>
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
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', display: 'block' }}>Months</label>
              <select value={monthYear} onChange={e => setMonthYear(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '12px' }}>
                {(filterOptions.months && filterOptions.months.length > 0 ? filterOptions.months : ['Aug-2026', 'Jul-2026', 'Sep-2026', 'Oct-2026']).map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '4px', display: 'block' }}>Note :</label>
              <div style={{ fontSize: '11px', color: '#64748b', lineHeight: '1.4' }}>
                This report displays itemized head distributions for all components contributing to Gross Salary.
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
                  Head Wise Gross Salary Allocation Report
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
                Individual breakdown of salary heads (Basic, DA, HRA, Conveyance, Special Allowance) contributing to Gross Pay
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ position: 'relative' }}>
                <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#a0aec0' }} />
                <input
                  type="text"
                  placeholder="Search staff..."
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

          {/* KPI Cards for Head Wise Gross */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '20px' }}>
            <div style={{ backgroundColor: '#ffffff', padding: '14px', borderRadius: '8px', borderLeft: '4px solid #159BD7', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#718096', textTransform: 'uppercase' }}>Total Gross Payroll</div>
              <div style={{ fontSize: '18px', fontWeight: '800', color: '#1a202c', marginTop: '4px' }}>₹{totalGross.toLocaleString('en-IN')}</div>
              <div style={{ fontSize: '11px', color: '#159BD7', marginTop: '2px', fontWeight: '600' }}>{totalStaff} Employees</div>
            </div>

            {headSummary.map((h, i) => (
              <div key={i} style={{ backgroundColor: '#ffffff', padding: '14px', borderRadius: '8px', borderLeft: `4px solid ${h.color}`, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#718096', textTransform: 'uppercase' }}>{h.code}</div>
                <div style={{ fontSize: '18px', fontWeight: '800', color: '#1a202c', marginTop: '4px' }}>₹{h.totalAmount.toLocaleString('en-IN')}</div>
                <div style={{ fontSize: '11px', color: h.color, marginTop: '2px', fontWeight: '600' }}>{h.percentageOfGross}% of Total Gross</div>
              </div>
            ))}
          </div>

          {/* Head Distribution Progress Bar */}
          <div style={{
            backgroundColor: '#ffffff', padding: '16px 20px', borderRadius: '8px',
            border: '1px solid #e2e8f0', marginBottom: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#1a202c' }}>
                Salary Head Composition Breakdown
              </span>
              <span style={{ fontSize: '11px', color: '#64748b' }}>
                Total: ₹{totalGross.toLocaleString('en-IN')}
              </span>
            </div>
            <div style={{ height: '14px', width: '100%', display: 'flex', borderRadius: '7px', overflow: 'hidden' }}>
              {headSummary.map((h, idx) => (
                <div
                  key={idx}
                  style={{
                    width: `${h.percentageOfGross}%`,
                    backgroundColor: h.color,
                    title: `${h.headName}: ${h.percentageOfGross}%`
                  }}
                />
              ))}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '12px', fontSize: '11px' }}>
              {headSummary.map((h, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: h.color }} />
                  <span style={{ color: '#475569', fontWeight: '500' }}>{h.headName} ({h.percentageOfGross}%)</span>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Staff Table */}
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
                    <th style={{ padding: '10px 12px', fontWeight: '700', textAlign: 'right' }}>Conveyance</th>
                    <th style={{ padding: '10px 12px', fontWeight: '700', textAlign: 'right' }}>Special Allowance</th>
                    <th style={{ padding: '10px 12px', fontWeight: '700', textAlign: 'right', backgroundColor: '#e0f2fe', color: '#0369a1' }}>Total Gross</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.length === 0 ? (
                    <tr>
                      <td colSpan={11} style={{ padding: '30px', textAlign: 'center', color: '#a0aec0' }}>
                        No records found for current selection.
                      </td>
                    </tr>
                  ) : (
                    filteredRecords.map((r, idx) => {
                      const isAyup = r.staffName && r.staffName.includes('Ayup');

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
                          <td style={{ padding: '10px 12px', textAlign: 'right', color: '#4a5568' }}>₹{r.conveyance.toLocaleString('en-IN')}</td>
                          <td style={{ padding: '10px 12px', textAlign: 'right', color: '#4a5568' }}>₹{r.specialAllowance.toLocaleString('en-IN')}</td>
                          <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: '800', backgroundColor: '#f0f9ff', color: '#0369a1', fontSize: '13px' }}>
                            ₹{r.grossSalary.toLocaleString('en-IN')}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
                {filteredRecords.length > 0 && (
                  <tfoot>
                    <tr style={{ backgroundColor: '#f1f5f9', fontWeight: '800', borderTop: '2px solid #cbd5e0' }}>
                      <td colSpan={5} style={{ padding: '12px', textAlign: 'right' }}>Total Gross Component Sum:</td>
                      <td style={{ padding: '12px', textAlign: 'right' }}>₹{filteredRecords.reduce((s, r) => s + r.basicSalary, 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px', textAlign: 'right' }}>₹{filteredRecords.reduce((s, r) => s + r.da, 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px', textAlign: 'right' }}>₹{filteredRecords.reduce((s, r) => s + r.hra, 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px', textAlign: 'right' }}>₹{filteredRecords.reduce((s, r) => s + r.conveyance, 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px', textAlign: 'right' }}>₹{filteredRecords.reduce((s, r) => s + r.specialAllowance, 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px', textAlign: 'right', backgroundColor: '#e0f2fe', color: '#0369a1', fontSize: '14px' }}>
                        ₹{filteredRecords.reduce((s, r) => s + r.grossSalary, 0).toLocaleString('en-IN')}
                      </td>
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
