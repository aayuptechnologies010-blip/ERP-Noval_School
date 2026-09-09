import React, { useState, useEffect } from 'react';
import {
  Eye, Download, Printer, Search, RefreshCw, CheckCircle,
  AlertCircle, Sparkles, DollarSign, Users, FileSpreadsheet,
  ChevronLeft, ChevronRight, Filter, Calendar, CreditCard, ShieldCheck, Building2
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function StaffStatement() {
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

  // Sidebar filters matching mockup
  const [schoolName, setSchoolName] = useState('Ayup Tech');
  const [schoolBank, setSchoolBank] = useState('All School Banks');
  const [salaryAccount, setSalaryAccount] = useState('All Salary A/C');
  const [staffType, setStaffType] = useState('All Staff Types');
  const [designation, setDesignation] = useState('All (38)');
  const [joiningFromDate, setJoiningFromDate] = useState('');
  const [joiningToDate, setJoiningToDate] = useState('');
  const [monthYear, setMonthYear] = useState('Aug-2026');
  const [selectedStaff, setSelectedStaff] = useState('All Staff');
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
      if (monthYear && monthYear !== 'Select') params.append('monthYear', monthYear);
      if (schoolBank && !schoolBank.includes('All')) params.append('schoolBank', schoolBank);
      if (staffType && !staffType.includes('All')) params.append('staffType', staffType);
      if (designation && !designation.includes('All')) params.append('designation', designation);
      if (selectedStaff && !selectedStaff.includes('All')) params.append('search', selectedStaff);
      if (searchTerm) params.append('search', searchTerm);

      const res = await fetch(`${API_BASE}/api/salary-structure/staff-statement?${params.toString()}`, { headers });
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        showNotif('error', 'Failed to fetch staff statement');
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
    setJoiningFromDate('');
    setJoiningToDate('');
    setMonthYear(filterOptions.months?.[0] || 'Aug-2026');
    setSelectedStaff('All Staff');
    setSearchTerm('');
    setTimeout(() => fetchReport(), 50);
  };

  const records = data.records || [];
  const summary = data.summary || {};

  const filteredRecords = records.filter(r => {
    if (joiningFromDate && r.doj && r.doj < joiningFromDate) return false;
    if (joiningToDate && r.doj && r.doj > joiningToDate) return false;
    if (!searchTerm) return true;
    const s = searchTerm.toLowerCase();
    return (
      (r.staffName && r.staffName.toLowerCase().includes(s)) ||
      (r.employeeId && r.employeeId.toLowerCase().includes(s)) ||
      (r.department && r.department.toLowerCase().includes(s)) ||
      (r.panNumber && r.panNumber.toLowerCase().includes(s)) ||
      (r.bankName && r.bankName.toLowerCase().includes(s))
    );
  });

  const exportCSV = () => {
    if (!filteredRecords.length) return;
    const headersList = [
      '#', 'Emp ID', 'Staff Name', 'Designation', 'Department', 'Staff Type',
      'Date of Joining', 'PAN Number', 'Bank Name', 'Account No', 'IFSC Code',
      'Payment Mode', 'Basic Pay', 'Gross Salary', 'Total Deductions', 'Net Salary', 'Status'
    ];
    const rows = filteredRecords.map((r, i) => [
      i + 1,
      `"${r.employeeId || ''}"`,
      `"${r.staffName || ''}"`,
      `"${r.designation || ''}"`,
      `"${r.department || ''}"`,
      `"${r.staffType || ''}"`,
      `"${r.doj || ''}"`,
      `"${r.panNumber || ''}"`,
      `"${r.bankName || ''}"`,
      `"${r.bankAccountNo || ''}"`,
      `"${r.ifscCode || ''}"`,
      `"${r.paymentMode || ''}"`,
      r.basicSalary || 0,
      r.grossSalary || 0,
      r.totalDeductions || 0,
      r.netSalary || 0,
      `"${r.status || 'Active / Paid'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headersList.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Staff_Statement_${monthYear}.csv`);
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
                Statement Filters
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
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', display: 'block' }}>Designation</label>
              <select value={designation} onChange={e => setDesignation(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '12px' }}>
                <option>All ({filterOptions.designations?.length || 38})</option>
                {(filterOptions.designations || []).map((d, idx) => (
                  <option key={idx} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', display: 'block' }}>Joining From Date</label>
              <input
                type="date"
                value={joiningFromDate}
                onChange={e => setJoiningFromDate(e.target.value)}
                style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '12px' }}
              />
            </div>

            <div className="form-group">
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', display: 'block' }}>Joining To Date</label>
              <input
                type="date"
                value={joiningToDate}
                onChange={e => setJoiningToDate(e.target.value)}
                style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '12px' }}
              />
            </div>

            <div className="form-group">
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', display: 'block' }}>Salary Month</label>
              <select value={monthYear} onChange={e => setMonthYear(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '12px' }}>
                {(filterOptions.months && filterOptions.months.length > 0 ? filterOptions.months : ['Aug-2026', 'Jul-2026', 'Sep-2026', 'Oct-2026']).map((m, idx) => (
                  <option key={idx} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', display: 'block' }}>Staff</label>
              <select value={selectedStaff} onChange={e => setSelectedStaff(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '12px' }}>
                <option>All Staff</option>
                {(filterOptions.employees || []).map((emp, idx) => (
                  <option key={idx} value={emp.staffName || emp.employeeId}>{emp.staffName} ({emp.employeeId})</option>
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
                  Staff Salary & Employment Statement
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
                Official employment profile, date of joining, statutory PAN, bank account and salary details
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ position: 'relative' }}>
                <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#a0aec0' }} />
                <input
                  type="text"
                  placeholder="Search name, PAN, bank..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  style={{
                    padding: '7px 10px 7px 30px', fontSize: '12px', border: '1px solid #cbd5e0',
                    borderRadius: '6px', outline: 'none', width: '210px'
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
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#718096', textTransform: 'uppercase' }}>Employees</span>
                <Users size={16} color="#159BD7" />
              </div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#1a202c', marginTop: '6px' }}>
                {filteredRecords.length}
              </div>
              <div style={{ fontSize: '11px', color: '#718096', marginTop: '4px' }}>
                Verified Records
              </div>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #10B981', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#718096', textTransform: 'uppercase' }}>Total Gross Payroll</span>
                <DollarSign size={16} color="#10B981" />
              </div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#1a202c', marginTop: '6px' }}>
                ₹{(summary.totalGross || 0).toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: '11px', color: '#10B981', marginTop: '4px', fontWeight: '500' }}>
                Earned Compensation
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
                Statutory + Others
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
                Avg: ₹{(summary.averageNet || 0).toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          {/* Statement Table */}
          <div style={{
            backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            border: '1px solid #e2e8f0', overflow: 'hidden'
          }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', textAlign: 'left', minWidth: '1100px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '2px solid #cbd5e0', color: '#334155' }}>
                    <th style={{ padding: '8px 10px', fontWeight: '700' }}>#</th>
                    <th style={{ padding: '8px 10px', fontWeight: '700' }}>Emp ID</th>
                    <th style={{ padding: '8px 10px', fontWeight: '700' }}>Staff Name</th>
                    <th style={{ padding: '8px 10px', fontWeight: '700' }}>Designation</th>
                    <th style={{ padding: '8px 10px', fontWeight: '700' }}>Department</th>
                    <th style={{ padding: '8px 10px', fontWeight: '700' }}>DOJ</th>
                    <th style={{ padding: '8px 10px', fontWeight: '700' }}>PAN Number</th>
                    <th style={{ padding: '8px 10px', fontWeight: '700' }}>Bank Name & A/C</th>
                    <th style={{ padding: '8px 10px', fontWeight: '700' }}>IFSC Code</th>
                    <th style={{ padding: '8px 10px', fontWeight: '700', textAlign: 'right' }}>Basic Pay</th>
                    <th style={{ padding: '8px 10px', fontWeight: '700', textAlign: 'right', backgroundColor: '#e0f2fe', color: '#0369a1' }}>Gross Salary</th>
                    <th style={{ padding: '8px 10px', fontWeight: '700', textAlign: 'right', backgroundColor: '#fee2e2', color: '#991b1b' }}>Deductions</th>
                    <th style={{ padding: '8px 10px', fontWeight: '700', textAlign: 'right', backgroundColor: '#dcfce7', color: '#166534' }}>Net Salary</th>
                    <th style={{ padding: '8px 10px', fontWeight: '700', textAlign: 'center' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.length === 0 ? (
                    <tr>
                      <td colSpan={14} style={{ padding: '30px', textAlign: 'center', color: '#a0aec0' }}>
                        No staff records found matching filter criteria.
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
                          <td style={{ padding: '8px 10px', color: '#64748b' }}>{idx + 1}</td>
                          <td style={{ padding: '8px 10px', fontWeight: '600', color: '#1e293b' }}>{r.employeeId || '—'}</td>
                          <td style={{ padding: '8px 10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                              <span style={{ fontWeight: '700', color: '#0f172a' }}>{r.staffName}</span>
                              {isAyup && (
                                <span style={{
                                  backgroundColor: '#159BD7', color: 'white', padding: '1px 5px',
                                  borderRadius: '8px', fontSize: '9px', fontWeight: '700'
                                }}>
                                  AYUP
                                </span>
                              )}
                            </div>
                          </td>
                          <td style={{ padding: '8px 10px', color: '#475569' }}>{r.designation}</td>
                          <td style={{ padding: '8px 10px', color: '#475569' }}>{r.department}</td>
                          <td style={{ padding: '8px 10px', color: '#64748b' }}>{r.doj || '—'}</td>
                          <td style={{ padding: '8px 10px', fontFamily: 'monospace', fontWeight: '600', color: '#0284c7' }}>
                            {r.panNumber}
                          </td>
                          <td style={{ padding: '8px 10px', color: '#334155' }}>
                            {r.bankName} - {r.bankAccountNo}
                          </td>
                          <td style={{ padding: '8px 10px', fontFamily: 'monospace', color: '#64748b' }}>{r.ifscCode}</td>
                          <td style={{ padding: '8px 10px', textAlign: 'right' }}>₹{r.basicSalary.toLocaleString('en-IN')}</td>
                          <td style={{ padding: '8px 10px', textAlign: 'right', fontWeight: '700', backgroundColor: '#f0f9ff', color: '#0369a1' }}>
                            ₹{r.grossSalary.toLocaleString('en-IN')}
                          </td>
                          <td style={{ padding: '8px 10px', textAlign: 'right', fontWeight: '600', backgroundColor: '#fef2f2', color: '#991b1b' }}>
                            ₹{r.totalDeductions.toLocaleString('en-IN')}
                          </td>
                          <td style={{ padding: '8px 10px', textAlign: 'right', fontWeight: '800', backgroundColor: '#f0fdf4', color: '#166534' }}>
                            ₹{r.netSalary.toLocaleString('en-IN')}
                          </td>
                          <td style={{ padding: '8px 10px', textAlign: 'center' }}>
                            <span style={{
                              backgroundColor: '#dcfce7', color: '#15803d', padding: '2px 6px',
                              borderRadius: '8px', fontSize: '10px', fontWeight: '600'
                            }}>
                              {r.status || 'Active / Paid'}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
                {filteredRecords.length > 0 && (
                  <tfoot>
                    <tr style={{ backgroundColor: '#f8fafc', fontWeight: '800', borderTop: '2px solid #cbd5e0' }}>
                      <td colSpan={9} style={{ padding: '10px', textAlign: 'right' }}>Total Statement Sum ({filteredRecords.length} Staff):</td>
                      <td style={{ padding: '10px', textAlign: 'right' }}>₹{filteredRecords.reduce((s, r) => s + r.basicSalary, 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '10px', textAlign: 'right', backgroundColor: '#e0f2fe', color: '#0369a1' }}>₹{(summary.totalGross || 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '10px', textAlign: 'right', backgroundColor: '#fee2e2', color: '#991b1b' }}>₹{(summary.totalDeductions || 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '10px', textAlign: 'right', backgroundColor: '#dcfce7', color: '#166534', fontSize: '12px' }}>₹{(summary.totalNet || 0).toLocaleString('en-IN')}</td>
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
