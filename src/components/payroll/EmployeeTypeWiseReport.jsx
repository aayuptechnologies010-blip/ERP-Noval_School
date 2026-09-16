import React, { useState, useEffect } from 'react';
import {
  Eye, Download, Printer, Search, RefreshCw, CheckCircle,
  AlertCircle, Sparkles, DollarSign, Users, Briefcase,
  ChevronLeft, ChevronRight, Filter, Award, TrendingUp
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function EmployeeTypeWiseReport() {
  const [data, setData] = useState({ records: [], groupedByType: [], summary: {} });
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('detailed'); // 'detailed' or 'grouped'

  // Sidebar filters
  const [schoolName, setSchoolName] = useState('NAVALS NATIONAL ACADEMY');
  const [schoolBank, setSchoolBank] = useState('All School Banks');
  const [staffType, setStaffType] = useState('All Employee Types');
  const [designation, setDesignation] = useState('All (38)');
  const [activeStatus, setActiveStatus] = useState('Active');
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

  const fetchReport = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (monthYear && monthYear !== 'All Month') params.append('monthYear', monthYear);
      if (staffType && !staffType.includes('All')) params.append('staffType', staffType);
      if (designation && !designation.includes('All')) params.append('designation', designation);
      if (searchTerm) params.append('search', searchTerm);

      const res = await fetch(`${API_BASE}/api/salary-structure/employee-type-wise-report?${params.toString()}`, { headers });
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        showNotif('error', 'Failed to fetch employee type wise report');
      }
    } catch (err) {
      console.error(err);
      showNotif('error', 'Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  const handleReset = () => {
    setSchoolName('NAVALS NATIONAL ACADEMY');
    setSchoolBank('All School Banks');
    setStaffType('All Employee Types');
    setDesignation('All (38)');
    setActiveStatus('Active');
    setMonthYear('Aug-2026');
    setSearchTerm('');
    setTimeout(() => fetchReport(), 50);
  };

  const records = data.records || [];
  const grouped = data.groupedByType || [];
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
      '#', 'Emp ID', 'Staff Name', 'Employee Type', 'Department', 'Designation',
      'Bank Name', 'Account No', 'Basic Pay', 'DA', 'HRA', 'Conveyance',
      'Special Allowance', 'Gross Salary', 'Total Deductions', 'Net Salary', 'Month-Year', 'Status'
    ];
    const rows = filteredRecords.map((r, i) => [
      i + 1,
      `"${r.employeeId || ''}"`,
      `"${r.staffName || ''}"`,
      `"${r.staffType || ''}"`,
      `"${r.department || ''}"`,
      `"${r.designation || ''}"`,
      `"${r.bankName || ''}"`,
      `"${r.bankAccountNo || ''}"`,
      r.basicSalary || 0,
      r.da || 0,
      r.hra || 0,
      r.conveyance || 0,
      r.specialAllowance || 0,
      r.grossSalary || 0,
      r.totalDeductions || 0,
      r.netSalary || 0,
      `"${r.monthYear || ''}"`,
      `"${r.status || 'Paid'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headersList.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Employee_Type_Wise_Report_${monthYear}.csv`);
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
                Report Filters
              </span>
            </div>

            <div className="form-group">
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', display: 'block' }}>School Name</label>
              <select value={schoolName} onChange={e => setSchoolName(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '12px' }}>
                <option>NAVALS NATIONAL ACADEMY</option>
              </select>
            </div>

            <div className="form-group">
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', display: 'block' }}>School Bank</label>
              <select value={schoolBank} onChange={e => setSchoolBank(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '12px' }}>
                <option>All School Banks</option>
                <option>HDFC Bank</option>
                <option>State Bank of India</option>
                <option>ICICI Bank</option>
                <option>Axis Bank</option>
                <option>Bank of Baroda</option>
                <option>Punjab National Bank</option>
              </select>
            </div>

            <div className="form-group">
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', display: 'block' }}>Employee Type</label>
              <select value={staffType} onChange={e => setStaffType(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '12px' }}>
                <option>All Employee Types</option>
                <option>Teaching</option>
                <option>Non-Teaching</option>
                <option>Technical</option>
                <option>Administrative</option>
              </select>
            </div>

            <div className="form-group">
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', display: 'block' }}>Designation</label>
              <select value={designation} onChange={e => setDesignation(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '12px' }}>
                <option>All (38)</option>
                <option>Senior Lecturer</option>
                <option>PGT Mathematics</option>
                <option>Finance Officer</option>
                <option>System Administrator</option>
                <option>Lab In-Charge</option>
                <option>Head of Science</option>
                <option>Senior Faculty</option>
              </select>
            </div>

            <div className="form-group">
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', display: 'block' }}>Active Status</label>
              <select value={activeStatus} onChange={e => setActiveStatus(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '12px' }}>
                <option>Active</option>
                <option>All</option>
                <option>Inactive</option>
              </select>
            </div>

            <div className="form-group">
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', display: 'block' }}>Salary Month</label>
              <select value={monthYear} onChange={e => setMonthYear(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '12px' }}>
                <option value="Aug-2026">Aug-2026</option>
                <option value="Jul-2026">Jul-2026</option>
                <option value="Sep-2026">Sep-2026</option>
                <option value="All Month">All Months</option>
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
                  Employee Type wise Salary Report
                </h2>
                <span style={{
                  backgroundColor: '#e6fffa', color: '#047481', padding: '2px 8px',
                  borderRadius: '12px', fontSize: '11px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px'
                }}>
                  <Sparkles size={12} /> Live MongoDB Sync
                </span>
              </div>
              <p style={{ fontSize: '12px', color: '#718096', margin: '4px 0 0 0' }}>
                Salary breakdown and headcount classification across Teaching, Non-Teaching & Technical staff
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ position: 'relative' }}>
                <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#a0aec0' }} />
                <input
                  type="text"
                  placeholder="Search employee / dept..."
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
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#718096', textTransform: 'uppercase' }}>Total Staff</span>
                <Users size={16} color="#159BD7" />
              </div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#1a202c', marginTop: '6px' }}>
                {filteredRecords.length}
              </div>
              <div style={{ fontSize: '11px', color: '#a0aec0', marginTop: '4px' }}>
                Active in {monthYear}
              </div>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #10B981', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#718096', textTransform: 'uppercase' }}>Teaching Staff</span>
                <Award size={16} color="#10B981" />
              </div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#1a202c', marginTop: '6px' }}>
                {filteredRecords.filter(r => r.staffType === 'Teaching').length}
              </div>
              <div style={{ fontSize: '11px', color: '#10B981', marginTop: '4px', fontWeight: '500' }}>
                ₹{filteredRecords.filter(r => r.staffType === 'Teaching').reduce((s, r) => s + (r.grossSalary || 0), 0).toLocaleString('en-IN')} Gross
              </div>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #F59E0B', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#718096', textTransform: 'uppercase' }}>Non-Teaching Staff</span>
                <Briefcase size={16} color="#F59E0B" />
              </div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#1a202c', marginTop: '6px' }}>
                {filteredRecords.filter(r => r.staffType === 'Non-Teaching').length}
              </div>
              <div style={{ fontSize: '11px', color: '#F59E0B', marginTop: '4px', fontWeight: '500' }}>
                ₹{filteredRecords.filter(r => r.staffType === 'Non-Teaching').reduce((s, r) => s + (r.grossSalary || 0), 0).toLocaleString('en-IN')} Gross
              </div>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #8B5CF6', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#718096', textTransform: 'uppercase' }}>Total Net Disbursed</span>
                <DollarSign size={16} color="#8B5CF6" />
              </div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#1a202c', marginTop: '6px' }}>
                ₹{filteredRecords.reduce((s, r) => s + (r.netSalary || 0), 0).toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: '11px', color: '#718096', marginTop: '4px' }}>
                Avg: ₹{filteredRecords.length ? Math.round(filteredRecords.reduce((s, r) => s + (r.netSalary || 0), 0) / filteredRecords.length).toLocaleString('en-IN') : 0}
              </div>
            </div>
          </div>

          {/* View Mode Tabs */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <button
              onClick={() => setActiveTab('detailed')}
              style={{
                padding: '8px 16px', borderRadius: '6px', fontSize: '12px', fontWeight: '600',
                border: 'none', cursor: 'pointer',
                backgroundColor: activeTab === 'detailed' ? '#159BD7' : '#e2e8f0',
                color: activeTab === 'detailed' ? '#ffffff' : '#4a5568'
              }}
            >
              Detailed Employee View ({filteredRecords.length})
            </button>
            <button
              onClick={() => setActiveTab('grouped')}
              style={{
                padding: '8px 16px', borderRadius: '6px', fontSize: '12px', fontWeight: '600',
                border: 'none', cursor: 'pointer',
                backgroundColor: activeTab === 'grouped' ? '#159BD7' : '#e2e8f0',
                color: activeTab === 'grouped' ? '#ffffff' : '#4a5568'
              }}
            >
              Grouped Summary by Employee Type ({grouped.length})
            </button>
          </div>

          {/* Table Container */}
          <div style={{
            backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            border: '1px solid #e2e8f0', overflow: 'hidden'
          }}>
            {activeTab === 'detailed' ? (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#4a5568' }}>
                      <th style={{ padding: '10px 12px', fontWeight: '700' }}>#</th>
                      <th style={{ padding: '10px 12px', fontWeight: '700' }}>Emp ID</th>
                      <th style={{ padding: '10px 12px', fontWeight: '700' }}>Employee Name</th>
                      <th style={{ padding: '10px 12px', fontWeight: '700' }}>Type</th>
                      <th style={{ padding: '10px 12px', fontWeight: '700' }}>Department</th>
                      <th style={{ padding: '10px 12px', fontWeight: '700' }}>Designation</th>
                      <th style={{ padding: '10px 12px', fontWeight: '700', textAlign: 'right' }}>Basic</th>
                      <th style={{ padding: '10px 12px', fontWeight: '700', textAlign: 'right' }}>DA</th>
                      <th style={{ padding: '10px 12px', fontWeight: '700', textAlign: 'right' }}>HRA</th>
                      <th style={{ padding: '10px 12px', fontWeight: '700', textAlign: 'right' }}>Allowances</th>
                      <th style={{ padding: '10px 12px', fontWeight: '700', textAlign: 'right' }}>Gross Salary</th>
                      <th style={{ padding: '10px 12px', fontWeight: '700', textAlign: 'right' }}>Deductions</th>
                      <th style={{ padding: '10px 12px', fontWeight: '700', textAlign: 'right' }}>Net Payable</th>
                      <th style={{ padding: '10px 12px', fontWeight: '700', textAlign: 'center' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRecords.length === 0 ? (
                      <tr>
                        <td colSpan={14} style={{ padding: '30px', textAlign: 'center', color: '#a0aec0' }}>
                          No salary records found matching current filter criteria.
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
                            <td style={{ padding: '10px 12px' }}>
                              <span style={{
                                padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: '600',
                                backgroundColor: r.staffType === 'Teaching' ? '#e6fffa' : r.staffType === 'Non-Teaching' ? '#fef3c7' : '#ede9fe',
                                color: r.staffType === 'Teaching' ? '#047481' : r.staffType === 'Non-Teaching' ? '#92400e' : '#5b21b6'
                              }}>
                                {r.staffType || 'Teaching'}
                              </span>
                            </td>
                            <td style={{ padding: '10px 12px', color: '#4a5568' }}>{r.department || 'General'}</td>
                            <td style={{ padding: '10px 12px', color: '#4a5568' }}>{r.designation || 'Staff'}</td>
                            <td style={{ padding: '10px 12px', textAlign: 'right', color: '#4a5568' }}>₹{(r.basicSalary || 0).toLocaleString('en-IN')}</td>
                            <td style={{ padding: '10px 12px', textAlign: 'right', color: '#4a5568' }}>₹{(r.da || 0).toLocaleString('en-IN')}</td>
                            <td style={{ padding: '10px 12px', textAlign: 'right', color: '#4a5568' }}>₹{(r.hra || 0).toLocaleString('en-IN')}</td>
                            <td style={{ padding: '10px 12px', textAlign: 'right', color: '#4a5568' }}>₹{totalAllowances.toLocaleString('en-IN')}</td>
                            <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: '700', color: '#1a202c' }}>₹{(r.grossSalary || 0).toLocaleString('en-IN')}</td>
                            <td style={{ padding: '10px 12px', textAlign: 'right', color: '#e53e3e', fontWeight: '600' }}>₹{(r.totalDeductions || 0).toLocaleString('en-IN')}</td>
                            <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: '800', color: '#059669' }}>₹{(r.netSalary || 0).toLocaleString('en-IN')}</td>
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
                        <td colSpan={6} style={{ padding: '12px', textAlign: 'right', color: '#1a202c' }}>Grand Total ({filteredRecords.length} Staff):</td>
                        <td style={{ padding: '12px', textAlign: 'right' }}>₹{filteredRecords.reduce((s, r) => s + (r.basicSalary || 0), 0).toLocaleString('en-IN')}</td>
                        <td style={{ padding: '12px', textAlign: 'right' }}>₹{filteredRecords.reduce((s, r) => s + (r.da || 0), 0).toLocaleString('en-IN')}</td>
                        <td style={{ padding: '12px', textAlign: 'right' }}>₹{filteredRecords.reduce((s, r) => s + (r.hra || 0), 0).toLocaleString('en-IN')}</td>
                        <td style={{ padding: '12px', textAlign: 'right' }}>₹{filteredRecords.reduce((s, r) => s + ((r.conveyance || 0) + (r.specialAllowance || 0)), 0).toLocaleString('en-IN')}</td>
                        <td style={{ padding: '12px', textAlign: 'right', color: '#1a202c' }}>₹{filteredRecords.reduce((s, r) => s + (r.grossSalary || 0), 0).toLocaleString('en-IN')}</td>
                        <td style={{ padding: '12px', textAlign: 'right', color: '#e53e3e' }}>₹{filteredRecords.reduce((s, r) => s + (r.totalDeductions || 0), 0).toLocaleString('en-IN')}</td>
                        <td style={{ padding: '12px', textAlign: 'right', color: '#059669', fontSize: '13px' }}>₹{filteredRecords.reduce((s, r) => s + (r.netSalary || 0), 0).toLocaleString('en-IN')}</td>
                        <td></td>
                      </tr>
                    </tfoot>
                  )}
                </table>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#4a5568' }}>
                      <th style={{ padding: '10px 14px', fontWeight: '700' }}>Employee Type</th>
                      <th style={{ padding: '10px 14px', fontWeight: '700', textAlign: 'center' }}>Staff Headcount</th>
                      <th style={{ padding: '10px 14px', fontWeight: '700', textAlign: 'right' }}>Total Basic</th>
                      <th style={{ padding: '10px 14px', fontWeight: '700', textAlign: 'right' }}>Total DA</th>
                      <th style={{ padding: '10px 14px', fontWeight: '700', textAlign: 'right' }}>Total HRA</th>
                      <th style={{ padding: '10px 14px', fontWeight: '700', textAlign: 'right' }}>Total Allowances</th>
                      <th style={{ padding: '10px 14px', fontWeight: '700', textAlign: 'right' }}>Total Gross</th>
                      <th style={{ padding: '10px 14px', fontWeight: '700', textAlign: 'right' }}>Total Deductions</th>
                      <th style={{ padding: '10px 14px', fontWeight: '700', textAlign: 'right' }}>Total Net Payable</th>
                      <th style={{ padding: '10px 14px', fontWeight: '700', textAlign: 'right' }}>Average Net / Staff</th>
                    </tr>
                  </thead>
                  <tbody>
                    {grouped.map((g, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #edf2f7', backgroundColor: i % 2 === 0 ? '#ffffff' : '#fbfcfd' }}>
                        <td style={{ padding: '12px 14px' }}>
                          <span style={{
                            padding: '3px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '700',
                            backgroundColor: g.staffType === 'Teaching' ? '#e6fffa' : g.staffType === 'Non-Teaching' ? '#fef3c7' : '#ede9fe',
                            color: g.staffType === 'Teaching' ? '#047481' : g.staffType === 'Non-Teaching' ? '#92400e' : '#5b21b6'
                          }}>
                            {g.staffType}
                          </span>
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'center', fontWeight: '700' }}>{g.count}</td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', color: '#4a5568' }}>₹{g.totalBasic.toLocaleString('en-IN')}</td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', color: '#4a5568' }}>₹{g.totalDA.toLocaleString('en-IN')}</td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', color: '#4a5568' }}>₹{g.totalHRA.toLocaleString('en-IN')}</td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', color: '#4a5568' }}>₹{(g.totalConveyance + g.totalSpecial).toLocaleString('en-IN')}</td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: '700', color: '#1a202c' }}>₹{g.totalGross.toLocaleString('en-IN')}</td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', color: '#e53e3e', fontWeight: '600' }}>₹{g.totalDeductions.toLocaleString('en-IN')}</td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: '800', color: '#059669' }}>₹{g.totalNet.toLocaleString('en-IN')}</td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', color: '#4a5568' }}>
                          ₹{g.count > 0 ? Math.round(g.totalNet / g.count).toLocaleString('en-IN') : 0}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr style={{ backgroundColor: '#f1f5f9', fontWeight: '800', borderTop: '2px solid #cbd5e0' }}>
                      <td style={{ padding: '12px 14px' }}>Combined Total:</td>
                      <td style={{ padding: '12px 14px', textAlign: 'center' }}>{summary.totalStaff || 0}</td>
                      <td style={{ padding: '12px 14px', textAlign: 'right' }}>₹{grouped.reduce((s, g) => s + g.totalBasic, 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px 14px', textAlign: 'right' }}>₹{grouped.reduce((s, g) => s + g.totalDA, 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px 14px', textAlign: 'right' }}>₹{grouped.reduce((s, g) => s + g.totalHRA, 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px 14px', textAlign: 'right' }}>₹{grouped.reduce((s, g) => s + (g.totalConveyance + g.totalSpecial), 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px 14px', textAlign: 'right' }}>₹{(summary.totalGross || 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px 14px', textAlign: 'right', color: '#e53e3e' }}>₹{(summary.totalDeductions || 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px 14px', textAlign: 'right', color: '#059669' }}>₹{(summary.totalNet || 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px 14px', textAlign: 'right' }}>₹{(summary.averageNet || 0).toLocaleString('en-IN')}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
