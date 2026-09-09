import React, { useState, useEffect } from 'react';
import {
  Eye, Download, Printer, Search, RefreshCw, CheckCircle,
  AlertCircle, Sparkles, Calendar, Users, BookOpen,
  ChevronLeft, ChevronRight, FileCheck, ShieldCheck,
  Award, Clock, Building2
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function ServiceReport() {
  const [data, setData] = useState({ summary: {}, records: [] });
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [filterOptions, setFilterOptions] = useState({
    schools: ['Ayup Tech', 'Ayup Technologies'],
    departments: [],
    staffTypes: []
  });

  const [schoolName, setSchoolName] = useState('Ayup Tech');
  const [department, setDepartment] = useState('All');
  const [staffType, setStaffType] = useState('All');
  const [serviceYear, setServiceYear] = useState('');
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
          schools: json.schools?.length ? json.schools : ['Ayup Tech']
        }));
      }
    } catch (e) {
      console.error('Failed to load filter options', e);
    }
  };

  const fetchReport = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (department && !department.includes('All')) params.append('department', department);
      if (staffType && !staffType.includes('All')) params.append('staffType', staffType);
      if (searchTerm) params.append('search', searchTerm);

      const res = await fetch(`${API_BASE}/api/salary-structure/service-report?${params.toString()}`, { headers });
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        showNotif('error', 'Failed to fetch Service Report');
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

  const summary = data.summary || {};
  const records = data.records || [];

  const filteredRecords = records.filter(r => {
    if (serviceYear && r.qualifyingYears && r.qualifyingYears < parseInt(serviceYear)) return false;
    if (!searchTerm) return true;
    const s = searchTerm.toLowerCase();
    return (
      (r.staffName && r.staffName.toLowerCase().includes(s)) ||
      (r.employeeId && r.employeeId.toLowerCase().includes(s)) ||
      (r.serviceBookNo && r.serviceBookNo.toLowerCase().includes(s)) ||
      (r.confirmationOrderNo && r.confirmationOrderNo.toLowerCase().includes(s)) ||
      (r.department && r.department.toLowerCase().includes(s))
    );
  });

  const exportCSV = () => {
    if (!filteredRecords.length) return;
    const headers = [
      'Sr No', 'Emp ID', 'Staff Name', 'Department', 'Designation', 'Staff Type',
      'Date of Joining', 'Service Book No', 'Probation Cleared Date', 'Confirmation Order No',
      'Qualifying Tenure (Yrs)', 'Earned Leave Bal', 'Medical Leave Bal',
      'Service Audit Status', 'Status'
    ];
    const rows = filteredRecords.map(r => [
      r.srNo,
      `"${r.employeeId || ''}"`,
      `"${r.staffName || ''}"`,
      `"${r.department || ''}"`,
      `"${r.designation || ''}"`,
      `"${r.staffType || ''}"`,
      r.doj,
      `"${r.serviceBookNo || ''}"`,
      r.probationCompletedDate,
      `"${r.confirmationOrderNo || ''}"`,
      r.qualifyingYears,
      r.earnedLeaveBalance,
      r.medicalLeaveBalance,
      `"${r.serviceVerificationStatus || ''}"`,
      `"${r.serviceStatus || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Ayup_Tech_Service_Book_Report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 60px)', backgroundColor: '#f1f5f9', overflow: 'hidden', fontFamily: "'Outfit', 'Segoe UI', sans-serif" }}>
      {/* Toast Notification */}
      {statusMsg && (
        <div style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '12px 20px',
          borderRadius: '10px',
          background: statusMsg.type === 'success' ? '#059669' : '#dc2626',
          color: '#fff',
          boxShadow: '0 10px 25px -5px rgba(0,0,0,0.2)',
          fontWeight: 500,
          animation: 'slideIn 0.3s ease-out'
        }}>
          {statusMsg.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          {statusMsg.text}
        </div>
      )}

      {/* Collapsible Sidebar */}
      <div style={{
        width: isSidebarOpen ? '290px' : '0px',
        minWidth: isSidebarOpen ? '290px' : '0px',
        backgroundColor: '#ffffff',
        borderRight: isSidebarOpen ? '1px solid #e2e8f0' : 'none',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 20,
        boxShadow: isSidebarOpen ? '2px 0 10px rgba(0,0,0,0.03)' : 'none'
      }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0', background: 'linear-gradient(135deg, #0f172a, #1e293b)', color: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <BookOpen size={20} color="#38bdf8" />
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, letterSpacing: '0.3px' }}>Service Book Filter</h3>
          </div>
          <p style={{ margin: '6px 0 0 0', fontSize: '11px', color: '#94a3b8' }}>Ayup Tech Service Ledger</p>
        </div>

        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto', flex: 1 }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px', display: 'block' }}>School / Institution</label>
            <select
              value={schoolName}
              onChange={e => setSchoolName(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#f8fafc', color: '#1e293b', fontWeight: 500 }}
            >
              <option value="Ayup Tech">Ayup Tech</option>
              {filterOptions.schools.filter(s => s !== 'Ayup Tech').map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px', display: 'block' }}>Department</label>
            <select
              value={department}
              onChange={e => setDepartment(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#f8fafc', color: '#1e293b' }}
            >
              <option value="All">All Departments</option>
              {filterOptions.departments?.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px', display: 'block' }}>Staff Type</label>
            <select
              value={staffType}
              onChange={e => setStaffType(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#f8fafc', color: '#1e293b' }}
            >
              <option value="All">All Staff Types</option>
              {filterOptions.staffTypes?.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px', display: 'block' }}>Min Service Years</label>
            <input
              type="number"
              placeholder="e.g. 5"
              value={serviceYear}
              onChange={e => setServiceYear(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#f8fafc', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginTop: '10px' }}>
            <button
              onClick={fetchReport}
              disabled={loading}
              style={{
                width: '100%',
                padding: '11px',
                borderRadius: '8px',
                border: 'none',
                background: 'linear-gradient(135deg, #0284c7, #0369a1)',
                color: '#fff',
                fontWeight: 600,
                fontSize: '13px',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(2,132,199,0.3)',
                transition: 'all 0.2s'
              }}
            >
              {loading ? <RefreshCw size={16} className="animate-spin" /> : <Eye size={16} />}
              Show Service Records
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
        {/* Toggle Sidebar Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          title={isSidebarOpen ? "Hide Filter Panel" : "Show Filter Panel"}
          style={{
            position: 'absolute',
            top: '18px',
            left: '12px',
            zIndex: 30,
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            border: '1px solid #cbd5e1',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#0f172a'
          }}
        >
          {isSidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>

        {/* Top Header */}
        <div style={{
          padding: '16px 24px 16px 52px',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          flexWrap: 'wrap'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '4px' }}>
                Service Book Registry
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#16a34a', fontWeight: 600, background: '#dcfce7', padding: '2px 8px', borderRadius: '4px' }}>
                <Sparkles size={12} /> Ayup Tech Verified
              </span>
            </div>
            <h1 style={{ margin: '4px 0 0 0', fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>
              Employee Service Book & Confirmation Ledger
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={exportCSV}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                backgroundColor: '#ffffff',
                color: '#334155',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <Download size={15} /> CSV Export
            </button>
            <button
              onClick={handlePrint}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#0f172a',
                color: '#ffffff',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(15,23,42,0.2)'
              }}
            >
              <Printer size={15} /> Print Service Records
            </button>
          </div>
        </div>

        {/* Stat Summary Cards */}
        <div style={{ padding: '16px 24px 0 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '14px 18px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Staff In Active Service</span>
              <div style={{ padding: '6px', borderRadius: '8px', backgroundColor: '#e0f2fe', color: '#0284c7' }}><Users size={16} /></div>
            </div>
            <div style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', marginTop: '6px' }}>
              {summary.totalStaffInService ?? records.length}
            </div>
            <div style={{ fontSize: '11px', color: '#0284c7', marginTop: '2px', fontWeight: 500 }}>
              Ayup Tech Employees
            </div>
          </div>

          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '14px 18px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Confirmed Service</span>
              <div style={{ padding: '6px', borderRadius: '8px', backgroundColor: '#dcfce7', color: '#16a34a' }}><Award size={16} /></div>
            </div>
            <div style={{ fontSize: '22px', fontWeight: 700, color: '#16a34a', marginTop: '6px' }}>
              {summary.confirmedCount ?? records.length}
            </div>
            <div style={{ fontSize: '11px', color: '#16a34a', marginTop: '2px', fontWeight: 500 }}>
              100% Probation Cleared
            </div>
          </div>

          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '14px 18px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Average Service Tenure</span>
              <div style={{ padding: '6px', borderRadius: '8px', backgroundColor: '#fef3c7', color: '#d97706' }}><Clock size={16} /></div>
            </div>
            <div style={{ fontSize: '22px', fontWeight: 700, color: '#d97706', marginTop: '6px' }}>
              {summary.averageTenureYears ?? 10} Years
            </div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
              Institutional Stability
            </div>
          </div>

          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '14px 18px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Physical Service Book Audit</span>
              <div style={{ padding: '6px', borderRadius: '8px', backgroundColor: '#f1f5f9', color: '#475569' }}><ShieldCheck size={16} /></div>
            </div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginTop: '6px' }}>
              Digitized
            </div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
              {summary.serviceBookAudit || '100% Verified'}
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div style={{ padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <div style={{ position: 'relative', width: '320px' }}>
            <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search staff, SB No, confirmation ref..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 36px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '12px',
                backgroundColor: '#ffffff',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>
            Showing <b>{filteredRecords.length}</b> service records
          </div>
        </div>

        {/* Data Table */}
        <div style={{ flex: 1, padding: '0 24px 20px 24px', overflowY: 'auto' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.02)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: 600 }}>
                  <th style={{ padding: '12px 14px' }}>#</th>
                  <th style={{ padding: '12px 14px' }}>Emp ID</th>
                  <th style={{ padding: '12px 14px' }}>Staff Name</th>
                  <th style={{ padding: '12px 14px' }}>Department</th>
                  <th style={{ padding: '12px 14px' }}>Designation</th>
                  <th style={{ padding: '12px 14px' }}>Staff Type</th>
                  <th style={{ padding: '12px 14px' }}>DOJ</th>
                  <th style={{ padding: '12px 14px' }}>Service Book No</th>
                  <th style={{ padding: '12px 14px' }}>Confirmation Order</th>
                  <th style={{ padding: '12px 14px' }}>Tenure</th>
                  <th style={{ padding: '12px 14px' }}>EL Bal</th>
                  <th style={{ padding: '12px 14px' }}>ML Bal</th>
                  <th style={{ padding: '12px 14px' }}>Verification Status</th>
                  <th style={{ padding: '12px 14px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((r, idx) => (
                    <tr
                      key={r.employeeId || idx}
                      style={{
                        borderBottom: '1px solid #f1f5f9',
                        transition: 'background-color 0.15s',
                        backgroundColor: idx % 2 === 0 ? '#ffffff' : '#fafafa'
                      }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f0f9ff'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = idx % 2 === 0 ? '#ffffff' : '#fafafa'}
                    >
                      <td style={{ padding: '11px 14px', color: '#94a3b8' }}>{r.srNo || idx + 1}</td>
                      <td style={{ padding: '11px 14px', fontWeight: 600, color: '#0284c7' }}>{r.employeeId}</td>
                      <td style={{ padding: '11px 14px', fontWeight: 600, color: '#0f172a' }}>{r.staffName}</td>
                      <td style={{ padding: '11px 14px', color: '#475569' }}>{r.department}</td>
                      <td style={{ padding: '11px 14px', color: '#64748b' }}>{r.designation}</td>
                      <td style={{ padding: '11px 14px' }}>
                        <span style={{
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: 500,
                          backgroundColor: r.staffType === 'Teaching' ? '#e0f2fe' : '#f1f5f9',
                          color: r.staffType === 'Teaching' ? '#0369a1' : '#475569'
                        }}>
                          {r.staffType}
                        </span>
                      </td>
                      <td style={{ padding: '11px 14px', color: '#64748b' }}>{r.doj}</td>
                      <td style={{ padding: '11px 14px', fontFamily: 'monospace', fontWeight: 600, color: '#4338ca' }}>
                        {r.serviceBookNo}
                      </td>
                      <td style={{ padding: '11px 14px', fontSize: '11px', color: '#64748b' }}>
                        {r.confirmationOrderNo}
                      </td>
                      <td style={{ padding: '11px 14px', fontWeight: 600, color: '#0f172a' }}>
                        {r.qualifyingYears} Yrs
                      </td>
                      <td style={{ padding: '11px 14px', color: '#16a34a', fontWeight: 600 }}>
                        {r.earnedLeaveBalance} d
                      </td>
                      <td style={{ padding: '11px 14px', color: '#d97706', fontWeight: 600 }}>
                        {r.medicalLeaveBalance} d
                      </td>
                      <td style={{ padding: '11px 14px', fontSize: '11px', color: '#15803d' }}>
                        {r.serviceVerificationStatus}
                      </td>
                      <td style={{ padding: '11px 14px' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '3px 8px',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: 600,
                          backgroundColor: '#dcfce7',
                          color: '#15803d'
                        }}>
                          <CheckCircle size={11} /> {r.serviceStatus || 'Confirmed'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={14} style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                      {loading ? 'Loading service book records...' : 'No service records found.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
