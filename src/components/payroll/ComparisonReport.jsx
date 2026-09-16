import React, { useState, useEffect } from 'react';
import {
  Eye, Download, Printer, Search, RefreshCw, CheckCircle,
  AlertCircle, Sparkles, Scale, Layers, IndianRupee,
  ChevronLeft, ChevronRight, BarChart3, Building2,
  Users, Award, TrendingUp
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function ComparisonReport() {
  const [data, setData] = useState({ summary: {}, benchmarks: [], employeeRows: [] });
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [filterOptions, setFilterOptions] = useState({
    schools: ['Ayup Tech', 'Ayup Technologies'],
    departments: [],
    staffTypes: [],
    months: []
  });

  const [schoolName, setSchoolName] = useState('Ayup Tech');
  const [monthYear, setMonthYear] = useState('Aug-2026');
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
        if (json.months?.length) setMonthYear(json.months[0]);
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
      if (department && !department.includes('All')) params.append('department', department);
      if (staffType && !staffType.includes('All')) params.append('staffType', staffType);
      if (searchTerm) params.append('search', searchTerm);

      const res = await fetch(`${API_BASE}/api/salary-structure/comparison-report?${params.toString()}`, { headers });
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        showNotif('error', 'Failed to fetch Comparison Benchmarks');
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
  const benchmarks = data.benchmarks || [];
  const employeeRows = data.employeeRows || [];

  const filteredEmployees = employeeRows.filter(r => {
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
    if (!benchmarks.length) return;
    const csvHeaders = [
      'Cadre / Department', 'Department', 'Staff Type', 'Headcount',
      'Min Gross', 'Max Gross', 'Avg Gross', 'Total Spend',
      'Budget Share (%)', 'Pay Matrix Stage'
    ];
    const rows = benchmarks.map(b => [
      `"${b.cadreName || ''}"`,
      `"${b.department || ''}"`,
      `"${b.staffType || ''}"`,
      b.staffCount,
      b.minGross,
      b.maxGross,
      b.avgGross,
      b.totalGross,
      `${b.budgetSharePercent}%`,
      `"${b.stageLevel || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [csvHeaders.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Ayup_Tech_Comparative_Benchmarks_${monthYear}.csv`);
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
            <Scale size={20} color="#38bdf8" />
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, letterSpacing: '0.3px' }}>Benchmarking</h3>
          </div>
          <p style={{ margin: '6px 0 0 0', fontSize: '11px', color: '#94a3b8' }}>Ayup Tech Cadre & Salary Spread</p>
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
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px', display: 'block' }}>Salary Month</label>
            <select
              value={monthYear}
              onChange={e => setMonthYear(e.target.value)}
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
              Analyze Benchmarks
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
                Compensation Benchmarking
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#16a34a', fontWeight: 600, background: '#dcfce7', padding: '2px 8px', borderRadius: '4px' }}>
                <Sparkles size={12} /> Ayup Tech Pay Matrix
              </span>
            </div>
            <h1 style={{ margin: '4px 0 0 0', fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>
              Comparative Cadre & Department Salary Benchmarking
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
              <Printer size={15} /> Print Benchmarks
            </button>
          </div>
        </div>

        {/* Stat Summary Cards */}
        <div style={{ padding: '16px 24px 0 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '14px 18px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Institutional Payroll</span>
              <div style={{ padding: '6px', borderRadius: '8px', backgroundColor: '#e0f2fe', color: '#0284c7' }}><IndianRupee size={16} /></div>
            </div>
            <div style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', marginTop: '6px' }}>
              ₹{(summary.totalInstitutionalSpend || 0).toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '11px', color: '#0284c7', marginTop: '2px', fontWeight: 500 }}>
              Ayup Tech Monthly Budget
            </div>
          </div>

          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '14px 18px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Cadres Benchmarked</span>
              <div style={{ padding: '6px', borderRadius: '8px', backgroundColor: '#fef3c7', color: '#d97706' }}><Layers size={16} /></div>
            </div>
            <div style={{ fontSize: '22px', fontWeight: 700, color: '#d97706', marginTop: '6px' }}>
              {summary.cadreCount || benchmarks.length} Cadres
            </div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
              Across {summary.totalStaff || employeeRows.length} Employees
            </div>
          </div>

          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '14px 18px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Average Staff Pay</span>
              <div style={{ padding: '6px', borderRadius: '8px', backgroundColor: '#dcfce7', color: '#16a34a' }}><Users size={16} /></div>
            </div>
            <div style={{ fontSize: '22px', fontWeight: 700, color: '#16a34a', marginTop: '6px' }}>
              ₹{(summary.averageStaffPay || 0).toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '11px', color: '#16a34a', marginTop: '2px', fontWeight: 500 }}>
              Mean Monthly Compensation
            </div>
          </div>

          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '14px 18px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Matrix Alignment</span>
              <div style={{ padding: '6px', borderRadius: '8px', backgroundColor: '#f1f5f9', color: '#475569' }}><Award size={16} /></div>
            </div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginTop: '6px' }}>
              7th CPC Aligned
            </div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
              Standard Pay Band Stages
            </div>
          </div>
        </div>

        {/* Benchmarks Grid */}
        <div style={{ padding: '14px 24px', flex: 1, overflowY: 'auto' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.02)', marginBottom: '20px' }}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid #e2e8f0', fontWeight: 700, fontSize: '13px', color: '#0f172a' }}>
              Cadre Compensation Benchmarks & Budget Distribution
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: 600 }}>
                  <th style={{ padding: '12px 14px' }}>Cadre / Department Group</th>
                  <th style={{ padding: '12px 14px' }}>Staff Type</th>
                  <th style={{ padding: '12px 14px' }}>Headcount</th>
                  <th style={{ padding: '12px 14px', textAlign: 'right' }}>Min Gross</th>
                  <th style={{ padding: '12px 14px', textAlign: 'right' }}>Max Gross</th>
                  <th style={{ padding: '12px 14px', textAlign: 'right' }}>Avg Gross</th>
                  <th style={{ padding: '12px 14px', textAlign: 'right' }}>Total Outflow</th>
                  <th style={{ padding: '12px 14px', textAlign: 'right' }}>Budget Share</th>
                  <th style={{ padding: '12px 14px' }}>Pay Stage</th>
                </tr>
              </thead>
              <tbody>
                {benchmarks.length > 0 ? (
                  benchmarks.map((b, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '11px 14px', fontWeight: 600, color: '#0f172a' }}>{b.cadreName}</td>
                      <td style={{ padding: '11px 14px' }}>
                        <span style={{
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: 500,
                          backgroundColor: b.staffType === 'Teaching' ? '#e0f2fe' : '#f1f5f9',
                          color: b.staffType === 'Teaching' ? '#0369a1' : '#475569'
                        }}>
                          {b.staffType}
                        </span>
                      </td>
                      <td style={{ padding: '11px 14px', fontWeight: 600 }}>{b.staffCount}</td>
                      <td style={{ padding: '11px 14px', textAlign: 'right', color: '#475569' }}>
                        ₹{(b.minGross || 0).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '11px 14px', textAlign: 'right', color: '#475569' }}>
                        ₹{(b.maxGross || 0).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '11px 14px', textAlign: 'right', fontWeight: 600, color: '#0284c7' }}>
                        ₹{(b.avgGross || 0).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '11px 14px', textAlign: 'right', fontWeight: 700, color: '#d97706' }}>
                        ₹{(b.totalGross || 0).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '11px 14px', textAlign: 'right', fontWeight: 600, color: '#16a34a' }}>
                        {b.budgetSharePercent}%
                      </td>
                      <td style={{ padding: '11px 14px', fontSize: '11px', color: '#64748b' }}>
                        {b.stageLevel}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                      {loading ? 'Analyzing cadre benchmarks...' : 'No benchmark records found.'}
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
