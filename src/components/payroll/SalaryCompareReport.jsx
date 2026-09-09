import React, { useState, useEffect } from 'react';
import {
  Eye, Download, Printer, Search, RefreshCw, CheckCircle,
  AlertCircle, Sparkles, ArrowRightLeft, TrendingUp, TrendingDown,
  ChevronLeft, ChevronRight, Calendar, Users, IndianRupee,
  Building2, Minus
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function SalaryCompareReport() {
  const [data, setData] = useState({ summary: {}, records: [] });
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [filterOptions, setFilterOptions] = useState({
    schools: ['Ayup Tech', 'Ayup Technologies'],
    departments: [],
    staffTypes: [],
    months: ['Jul-2026', 'Aug-2026', 'Sep-2026', 'Oct-2026', 'Apr-2026']
  });

  const [schoolName, setSchoolName] = useState('Ayup Tech');
  const [month1, setMonth1] = useState('Jul-2026');
  const [month2, setMonth2] = useState('Aug-2026');
  const [department, setDepartment] = useState('All');
  const [staffType, setStaffType] = useState('All');
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
        if (json.months?.length >= 2) {
          setMonth1(json.months[1] || json.months[0]);
          setMonth2(json.months[0]);
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
      if (month1) params.append('month1', month1);
      if (month2) params.append('month2', month2);
      if (department && !department.includes('All')) params.append('department', department);
      if (staffType && !staffType.includes('All')) params.append('staffType', staffType);
      if (searchTerm) params.append('search', searchTerm);

      const res = await fetch(`${API_BASE}/api/salary-structure/salary-compare-report?${params.toString()}`, { headers });
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        showNotif('error', 'Failed to fetch Salary Compare report');
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
    const csvHeaders = [
      'Sr No', 'Emp ID', 'Staff Name', 'Department', 'Designation', 'Staff Type',
      `${month1} Basic`, `${month2} Basic`,
      `${month1} Gross`, `${month2} Gross`,
      'Variance (₹)', 'Change (%)', 'Variance Type'
    ];
    const rows = filteredRecords.map(r => [
      r.srNo,
      `"${r.employeeId || ''}"`,
      `"${r.staffName || ''}"`,
      `"${r.department || ''}"`,
      `"${r.designation || ''}"`,
      `"${r.staffType || ''}"`,
      r.month1Basic,
      r.month2Basic,
      r.month1Gross,
      r.month2Gross,
      r.grossDiff,
      `${r.percentDiff}%`,
      `"${r.varianceType || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [csvHeaders.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Ayup_Tech_Salary_Compare_${month1}_vs_${month2}.csv`);
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
            <ArrowRightLeft size={20} color="#38bdf8" />
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, letterSpacing: '0.3px' }}>Salary Comparison</h3>
          </div>
          <p style={{ margin: '6px 0 0 0', fontSize: '11px', color: '#94a3b8' }}>Ayup Tech Multi-Month Variance</p>
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
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px', display: 'block' }}>Base Month (Month 1)</label>
            <select
              value={month1}
              onChange={e => setMonth1(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#f8fafc', color: '#1e293b' }}
            >
              {filterOptions.months?.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px', display: 'block' }}>Compared Month (Month 2)</label>
            <select
              value={month2}
              onChange={e => setMonth2(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#f8fafc', color: '#1e293b' }}
            >
              {filterOptions.months?.map(m => (
                <option key={m} value={m}>{m}</option>
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
              Compare Months
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
                Payroll Variance
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#16a34a', fontWeight: 600, background: '#dcfce7', padding: '2px 8px', borderRadius: '4px' }}>
                <Sparkles size={12} /> Ayup Tech Comparative
              </span>
              <span style={{ fontSize: '11px', color: '#64748b', background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                {month1} vs {month2}
              </span>
            </div>
            <h1 style={{ margin: '4px 0 0 0', fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>
              Monthly Salary Comparison & Variance Report
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
              <Printer size={15} /> Print Comparison
            </button>
          </div>
        </div>

        {/* Stat Summary Cards */}
        <div style={{ padding: '16px 24px 0 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '14px 18px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>{month1} Gross Outflow</span>
              <div style={{ padding: '6px', borderRadius: '8px', backgroundColor: '#e0f2fe', color: '#0284c7' }}><Calendar size={16} /></div>
            </div>
            <div style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', marginTop: '6px' }}>
              ₹{(summary.month1TotalGross || 0).toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
              Base Month Total
            </div>
          </div>

          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '14px 18px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>{month2} Gross Outflow</span>
              <div style={{ padding: '6px', borderRadius: '8px', backgroundColor: '#fef3c7', color: '#d97706' }}><IndianRupee size={16} /></div>
            </div>
            <div style={{ fontSize: '22px', fontWeight: 700, color: '#d97706', marginTop: '6px' }}>
              ₹{(summary.month2TotalGross || 0).toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
              Compared Month Total
            </div>
          </div>

          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '14px 18px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Net Gross Variance</span>
              <div style={{
                padding: '6px',
                borderRadius: '8px',
                backgroundColor: (summary.netVariance || 0) >= 0 ? '#dcfce7' : '#fee2e2',
                color: (summary.netVariance || 0) >= 0 ? '#16a34a' : '#dc2626'
              }}>
                {(summary.netVariance || 0) > 0 ? <TrendingUp size={16} /> : (summary.netVariance || 0) < 0 ? <TrendingDown size={16} /> : <Minus size={16} />}
              </div>
            </div>
            <div style={{
              fontSize: '22px',
              fontWeight: 700,
              color: (summary.netVariance || 0) >= 0 ? '#16a34a' : '#dc2626',
              marginTop: '6px'
            }}>
              {(summary.netVariance || 0) >= 0 ? '+' : ''}₹{(summary.netVariance || 0).toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
              {summary.netVariancePercent || 0}% Change
            </div>
          </div>

          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '14px 18px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Staff Movement</span>
              <div style={{ padding: '6px', borderRadius: '8px', backgroundColor: '#f1f5f9', color: '#475569' }}><Users size={16} /></div>
            </div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginTop: '6px' }}>
              {summary.totalEmployees || records.length} Staff Compared
            </div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
              {summary.increasedCount || 0} Up • {summary.decreasedCount || 0} Down • {summary.unchangedCount || 0} Steady
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div style={{ padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <div style={{ position: 'relative', width: '320px' }}>
            <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search staff, emp ID, department..."
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
            Showing <b>{filteredRecords.length}</b> comparative rows
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
                  <th style={{ padding: '12px 14px', textAlign: 'right' }}>{month1} Gross</th>
                  <th style={{ padding: '12px 14px', textAlign: 'right' }}>{month2} Gross</th>
                  <th style={{ padding: '12px 14px', textAlign: 'right' }}>Variance (₹)</th>
                  <th style={{ padding: '12px 14px', textAlign: 'right' }}>Change (%)</th>
                  <th style={{ padding: '12px 14px' }}>Variance Category</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((r, idx) => {
                    const isPositive = r.grossDiff > 0;
                    const isNegative = r.grossDiff < 0;
                    return (
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
                        <td style={{ padding: '11px 14px', textAlign: 'right', color: '#475569' }}>
                          ₹{(r.month1Gross || 0).toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '11px 14px', textAlign: 'right', fontWeight: 600, color: '#0f172a' }}>
                          ₹{(r.month2Gross || 0).toLocaleString('en-IN')}
                        </td>
                        <td style={{
                          padding: '11px 14px',
                          textAlign: 'right',
                          fontWeight: 700,
                          color: isPositive ? '#16a34a' : isNegative ? '#dc2626' : '#64748b'
                        }}>
                          {isPositive ? '+' : ''}₹{(r.grossDiff || 0).toLocaleString('en-IN')}
                        </td>
                        <td style={{
                          padding: '11px 14px',
                          textAlign: 'right',
                          fontWeight: 600,
                          color: isPositive ? '#16a34a' : isNegative ? '#dc2626' : '#64748b'
                        }}>
                          {isPositive ? '+' : ''}{r.percentDiff}%
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
                            backgroundColor: isPositive ? '#dcfce7' : isNegative ? '#fee2e2' : '#f1f5f9',
                            color: isPositive ? '#15803d' : isNegative ? '#b91c1c' : '#475569'
                          }}>
                            {isPositive ? <TrendingUp size={11} /> : isNegative ? <TrendingDown size={11} /> : <Minus size={11} />}
                            {r.varianceType}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={10} style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                      {loading ? 'Comparing month payrolls...' : 'No comparative records found.'}
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
