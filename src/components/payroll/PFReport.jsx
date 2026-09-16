import React, { useState, useEffect } from 'react';
import {
  Eye, Download, Printer, Search, RefreshCw, CheckCircle,
  AlertCircle, Sparkles, DollarSign, Users, ShieldCheck,
  ChevronLeft, ChevronRight, Filter, Building2, FileSpreadsheet
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function PFReport() {
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
    departments: [],
    months: ['Aug-2026', 'Jul-2026', 'Sep-2026', 'Oct-2026']
  });

  // Sidebar filters
  const [schoolName, setSchoolName] = useState('Ayup Tech');
  const [schoolBank, setSchoolBank] = useState('All School Banks');
  const [salaryAccount, setSalaryAccount] = useState('All Salary A/C');
  const [monthYear, setMonthYear] = useState('Aug-2026');
  const [staffType, setStaffType] = useState('All Staff Types');
  const [department, setDepartment] = useState('All');
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
      if (staffType && !staffType.includes('All')) params.append('staffType', staffType);
      if (department && !department.includes('All')) params.append('department', department);
      if (salaryAccount && !salaryAccount.includes('All')) params.append('salaryAccount', salaryAccount);
      if (searchTerm) params.append('search', searchTerm);

      const res = await fetch(`${API_BASE}/api/salary-structure/pf-report?${params.toString()}`, { headers });
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        showNotif('error', 'Failed to fetch PF report');
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
    setDepartment('All');
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
      (r.uanNumber && r.uanNumber.toLowerCase().includes(s)) ||
      (r.pfNumber && r.pfNumber.toLowerCase().includes(s)) ||
      (r.department && r.department.toLowerCase().includes(s))
    );
  });

  const exportCSV = () => {
    if (!filteredRecords.length) return;
    const headersList = [
      '#', 'Emp ID', 'Staff Name', 'UAN Number', 'PF Number', 'Department',
      'Gross Salary (₹)', 'EPF Wages (₹)', 'EE Share 12% (₹)', 'ER EPF 3.67% (₹)', 'ER EPS 8.33% (₹)', 'Total Remittance (₹)', 'Month'
    ];
    const rows = filteredRecords.map((r, i) => [
      i + 1,
      `"${r.employeeId || ''}"`,
      `"${r.staffName || ''}"`,
      `"${r.uanNumber || ''}"`,
      `"${r.pfNumber || ''}"`,
      `"${r.department || ''}"`,
      r.grossSalary,
      r.epfWages,
      r.eeShare,
      r.erEpfShare,
      r.erEpsShare,
      r.totalContribution,
      `"${r.monthYear || monthYear}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headersList.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `PF_Report_${monthYear}_AyupTech.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotif('success', 'PF Report CSV downloaded successfully');
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
                PF Filters
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
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', display: 'block' }}>Salary Month</label>
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
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', display: 'block' }}>Department</label>
              <select value={department} onChange={e => setDepartment(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '12px' }}>
                <option>All</option>
                {(filterOptions.departments || []).map((d, idx) => (
                  <option key={idx} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
              <button
                onClick={fetchReport}
                disabled={loading}
                style={{
                  flex: 1, backgroundColor: '#159BD7', color: '#ffffff', border: 'none',
                  padding: '9px 12px', borderRadius: '6px', fontWeight: '600', fontSize: '12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer'
                }}
              >
                <Eye size={15} /> {loading ? 'Loading...' : 'Show'}
              </button>
              <button
                onClick={handleReset}
                style={{
                  backgroundColor: '#edf2f7', color: '#4a5568', border: 'none',
                  padding: '9px 12px', borderRadius: '6px', fontWeight: '600', fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Pane */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
        {/* Top Header Bar */}
        <div style={{
          backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '16px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              title={isSidebarOpen ? 'Hide Filters' : 'Show Filters'}
              style={{
                background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '6px',
                width: '32px', height: '32px', display: 'flex', alignItems: 'center',
                justifyContent: 'center', cursor: 'pointer', color: '#475569'
              }}
            >
              {isSidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>
                  Provident Fund (PF) Monthly Report
                </h2>
                <span style={{
                  backgroundColor: '#e0f2fe', color: '#0369a1', padding: '2px 10px',
                  borderRadius: '12px', fontSize: '11px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px'
                }}>
                  <Sparkles size={12} /> {monthYear}
                </span>
                <span style={{
                  backgroundColor: '#fef3c7', color: '#92400e', padding: '2px 10px',
                  borderRadius: '12px', fontSize: '11px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px'
                }}>
                  <Building2 size={12} /> {schoolName}
                </span>
              </div>
              <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>
                EPF Act 1952 Statutory Remittance (A/c 01 EE 12%, A/c 01 ER 3.67%, A/c 10 EPS 8.33%)
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Search */}
            <div style={{ position: 'relative' }}>
              <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Search staff, UAN, PF No..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{
                  padding: '7px 12px 7px 32px', borderRadius: '6px', border: '1px solid #cbd5e1',
                  fontSize: '12px', width: '220px', outline: 'none'
                }}
              />
            </div>

            <button
              onClick={fetchReport}
              title="Refresh Data"
              style={{
                padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1',
                background: '#ffffff', cursor: 'pointer', color: '#475569', display: 'flex', alignItems: 'center'
              }}
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            </button>

            <button
              onClick={exportCSV}
              style={{
                backgroundColor: '#10b981', color: '#ffffff', border: 'none',
                padding: '7px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: '600',
                display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer'
              }}
            >
              <Download size={14} /> Export CSV
            </button>

            <button
              onClick={() => window.print()}
              style={{
                backgroundColor: '#0284c7', color: '#ffffff', border: 'none',
                padding: '7px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: '600',
                display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer'
              }}
            >
              <Printer size={14} /> Print
            </button>
          </div>
        </div>

        {/* 4 Stat KPI Cards */}
        <div style={{ padding: '20px 24px 10px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '8px', backgroundColor: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284c7' }}>
              <Users size={22} />
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Subscribed Staff</div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a' }}>{summary.totalEmployees || filteredRecords.length}</div>
              <div style={{ fontSize: '11px', color: '#10b981', fontWeight: '500' }}>100% EPF Enrolled</div>
            </div>
          </div>

          <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '8px', backgroundColor: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706' }}>
              <DollarSign size={22} />
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>EPF Wages Base</div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a' }}>₹{(summary.totalEpfWages || 0).toLocaleString('en-IN')}</div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Capped at statutory ceiling</div>
            </div>
          </div>

          <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '8px', backgroundColor: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a' }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Employee PF (12%)</div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#16a34a' }}>₹{(summary.totalEeShare || 0).toLocaleString('en-IN')}</div>
              <div style={{ fontSize: '11px', color: '#16a34a' }}>A/c 01 Deductions</div>
            </div>
          </div>

          <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '8px', backgroundColor: '#fae8ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a21caf' }}>
              <FileSpreadsheet size={22} />
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Total PF Remittance</div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#a21caf' }}>₹{(summary.grandTotalContribution || 0).toLocaleString('en-IN')}</div>
              <div style={{ fontSize: '11px', color: '#a21caf' }}>EE + ER (EPF + EPS)</div>
            </div>
          </div>
        </div>

        {/* Table Area */}
        <div style={{ padding: '16px 24px', flex: 1, overflowY: 'auto' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
                    <th style={{ padding: '12px 14px', fontWeight: '600', width: '45px' }}>#</th>
                    <th style={{ padding: '12px 14px', fontWeight: '600' }}>Emp ID</th>
                    <th style={{ padding: '12px 14px', fontWeight: '600' }}>Staff Name</th>
                    <th style={{ padding: '12px 14px', fontWeight: '600' }}>UAN Number</th>
                    <th style={{ padding: '12px 14px', fontWeight: '600' }}>PF Number</th>
                    <th style={{ padding: '12px 14px', fontWeight: '600' }}>Department</th>
                    <th style={{ padding: '12px 14px', fontWeight: '600', textAlign: 'right' }}>Gross (₹)</th>
                    <th style={{ padding: '12px 14px', fontWeight: '600', textAlign: 'right' }}>EPF Wages (₹)</th>
                    <th style={{ padding: '12px 14px', fontWeight: '600', textAlign: 'right', color: '#0369a1' }}>EE 12% (₹)</th>
                    <th style={{ padding: '12px 14px', fontWeight: '600', textAlign: 'right', color: '#059669' }}>ER EPF (₹)</th>
                    <th style={{ padding: '12px 14px', fontWeight: '600', textAlign: 'right', color: '#d97706' }}>ER EPS (₹)</th>
                    <th style={{ padding: '12px 14px', fontWeight: '700', textAlign: 'right', color: '#7c3aed' }}>Total (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.length === 0 ? (
                    <tr>
                      <td colSpan={12} style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                        {loading ? 'Fetching PF records from server...' : 'No PF records found matching current criteria.'}
                      </td>
                    </tr>
                  ) : (
                    filteredRecords.map((r, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: idx % 2 === 0 ? '#ffffff' : '#fafafa' }}>
                        <td style={{ padding: '10px 14px', color: '#64748b' }}>{idx + 1}</td>
                        <td style={{ padding: '10px 14px', fontWeight: '600', color: '#0284c7' }}>{r.employeeId}</td>
                        <td style={{ padding: '10px 14px', fontWeight: '600', color: '#1e293b' }}>{r.staffName}</td>
                        <td style={{ padding: '10px 14px', fontFamily: 'monospace', color: '#475569' }}>{r.uanNumber}</td>
                        <td style={{ padding: '10px 14px', fontFamily: 'monospace', color: '#475569' }}>{r.pfNumber}</td>
                        <td style={{ padding: '10px 14px', color: '#475569' }}>{r.department}</td>
                        <td style={{ padding: '10px 14px', textAlign: 'right', color: '#64748b' }}>₹{(r.grossSalary || 0).toLocaleString('en-IN')}</td>
                        <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: '600', color: '#0f172a' }}>₹{(r.epfWages || 0).toLocaleString('en-IN')}</td>
                        <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: '600', color: '#0369a1' }}>₹{(r.eeShare || 0).toLocaleString('en-IN')}</td>
                        <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: '600', color: '#059669' }}>₹{(r.erEpfShare || 0).toLocaleString('en-IN')}</td>
                        <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: '600', color: '#d97706' }}>₹{(r.erEpsShare || 0).toLocaleString('en-IN')}</td>
                        <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: '700', color: '#7c3aed' }}>₹{(r.totalContribution || 0).toLocaleString('en-IN')}</td>
                      </tr>
                    ))
                  )}
                </tbody>
                {filteredRecords.length > 0 && (
                  <tfoot>
                    <tr style={{ backgroundColor: '#f1f5f9', borderTop: '2px solid #cbd5e1', fontWeight: '700', color: '#0f172a' }}>
                      <td colSpan={6} style={{ padding: '12px 14px', textAlign: 'right' }}>Total Remittance:</td>
                      <td style={{ padding: '12px 14px', textAlign: 'right' }}>₹{(summary.totalGross || 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px 14px', textAlign: 'right' }}>₹{(summary.totalEpfWages || 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px 14px', textAlign: 'right', color: '#0369a1' }}>₹{(summary.totalEeShare || 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px 14px', textAlign: 'right', color: '#059669' }}>₹{(summary.totalErEpfShare || 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px 14px', textAlign: 'right', color: '#d97706' }}>₹{(summary.totalErEpsShare || 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px 14px', textAlign: 'right', color: '#7c3aed' }}>₹{(summary.grandTotalContribution || 0).toLocaleString('en-IN')}</td>
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
