import React, { useState, useEffect } from 'react';
import {
  Eye, Download, Printer, Search, RefreshCw, CheckCircle,
  AlertCircle, Sparkles, DollarSign, Users, ShieldCheck,
  ChevronLeft, ChevronRight, Filter, Building2, Layers
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function FixationReport() {
  const [data, setData] = useState({ summary: {}, records: [] });
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [filterOptions, setFilterOptions] = useState({
    schools: ['Ayup Tech', 'Ayup Technologies'],
    departments: []
  });

  const [schoolName, setSchoolName] = useState('Ayup Tech');
  const [payCommission, setPayCommission] = useState('7th Central Pay Commission');
  const [matrixLevel, setMatrixLevel] = useState('All');
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
      if (payCommission) params.append('payCommission', payCommission);
      if (matrixLevel && matrixLevel !== 'All') params.append('matrixLevel', matrixLevel);
      if (department && !department.includes('All')) params.append('department', department);
      if (searchTerm) params.append('search', searchTerm);

      const res = await fetch(`${API_BASE}/api/salary-structure/fixation-report?${params.toString()}`, { headers });
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        showNotif('error', 'Failed to fetch Fixation report');
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
      (r.matrixLevel && r.matrixLevel.toLowerCase().includes(s)) ||
      (r.department && r.department.toLowerCase().includes(s))
    );
  });

  const exportCSV = () => {
    if (!filteredRecords.length) return;
    const headersList = [
      '#', 'Emp ID', 'Staff Name', 'Department', 'Designation', 'Commission',
      'Pay Band', 'Grade Pay (₹)', 'Level', 'Cell', 'Basic Pay (₹)', 'DA (₹)', 'HRA (₹)', 'Gross Salary (₹)', 'Status'
    ];
    const rows = filteredRecords.map((r, i) => [
      i + 1,
      `"${r.employeeId || ''}"`,
      `"${r.staffName || ''}"`,
      `"${r.department || ''}"`,
      `"${r.designation || ''}"`,
      `"${r.payCommission || '7th CPC'}"`,
      `"${r.payBand || ''}"`,
      r.gradePay,
      `"${r.matrixLevel || ''}"`,
      r.matrixCell,
      r.basicPay,
      r.da,
      r.hra,
      r.grossSalary,
      `"${r.status || 'Fixed'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headersList.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Pay_Fixation_Report_7thCPC_AyupTech.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotif('success', 'Fixation Report CSV downloaded successfully');
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

      {/* Sidebar */}
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
                Fixation Filters
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
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', display: 'block' }}>Pay Commission</label>
              <select value={payCommission} onChange={e => setPayCommission(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '12px' }}>
                <option value="7th Central Pay Commission">7th Central Pay Commission</option>
                <option value="6th Central Pay Commission">6th Central Pay Commission</option>
              </select>
            </div>

            <div className="form-group">
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', display: 'block' }}>Matrix Level</label>
              <select value={matrixLevel} onChange={e => setMatrixLevel(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '12px' }}>
                <option value="All">All Matrix Levels</option>
                <option value="Level 10">Level 10 (₹56,100 - ₹1,77,500)</option>
                <option value="Level 7">Level 7 (₹44,900 - ₹1,42,400)</option>
                <option value="Level 6">Level 6 (₹35,400 - ₹1,12,400)</option>
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

            <div style={{ marginTop: '10px' }}>
              <button
                onClick={fetchReport}
                disabled={loading}
                style={{
                  width: '100%', backgroundColor: '#159BD7', color: '#ffffff', border: 'none',
                  padding: '10px', borderRadius: '6px', fontWeight: '600', fontSize: '13px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer'
                }}
              >
                <Eye size={16} /> {loading ? 'Loading Fixation...' : 'Show Fixation Statement'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
        {/* Top Header */}
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
                  Pay Fixation Statement (7th CPC)
                </h2>
                <span style={{
                  backgroundColor: '#e0f2fe', color: '#0369a1', padding: '2px 10px',
                  borderRadius: '12px', fontSize: '11px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px'
                }}>
                  <Sparkles size={12} /> {payCommission}
                </span>
                <span style={{
                  backgroundColor: '#fef3c7', color: '#92400e', padding: '2px 10px',
                  borderRadius: '12px', fontSize: '11px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px'
                }}>
                  <Building2 size={12} /> {schoolName}
                </span>
              </div>
              <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>
                Pay Band, Grade Pay & Cell Level Fixation under CCS (Revised Pay) Rules • 2.57 Fitment Standard
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ position: 'relative' }}>
              <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Search staff, level..."
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
              title="Refresh"
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
              <div style={{ fontSize: '11px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Fixed Cadre Staff</div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a' }}>{summary.totalStaffFixed || filteredRecords.length}</div>
              <div style={{ fontSize: '11px', color: '#0284c7' }}>Pay Matrix Compliant</div>
            </div>
          </div>

          <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '8px', backgroundColor: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706' }}>
              <DollarSign size={22} />
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Total Basic Pay Base</div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a' }}>₹{(summary.totalBasic || 0).toLocaleString('en-IN')}</div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Index Cell Sum</div>
            </div>
          </div>

          <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '8px', backgroundColor: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a' }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Total Gross Salary</div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#16a34a' }}>₹{(summary.totalGross || 0).toLocaleString('en-IN')}</div>
              <div style={{ fontSize: '11px', color: '#16a34a' }}>Basic + DA + HRA + Allowances</div>
            </div>
          </div>

          <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '8px', backgroundColor: '#fae8ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a21caf' }}>
              <Layers size={22} />
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Senior Cadre (Level 10)</div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#a21caf' }}>{summary.gazettedCount || 3} Officers</div>
              <div style={{ fontSize: '11px', color: '#a21caf' }}>Grade Pay ₹5,400 Group</div>
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
                    <th style={{ padding: '12px 14px', fontWeight: '600' }}>Department</th>
                    <th style={{ padding: '12px 14px', fontWeight: '600' }}>Designation</th>
                    <th style={{ padding: '12px 14px', fontWeight: '600' }}>Pay Band</th>
                    <th style={{ padding: '12px 14px', fontWeight: '600', textAlign: 'center' }}>Grade Pay (₹)</th>
                    <th style={{ padding: '12px 14px', fontWeight: '600', color: '#0369a1' }}>Matrix Level & Cell</th>
                    <th style={{ padding: '12px 14px', fontWeight: '700', textAlign: 'right', color: '#0f172a' }}>Basic Pay (₹)</th>
                    <th style={{ padding: '12px 14px', fontWeight: '600', textAlign: 'right' }}>DA (₹)</th>
                    <th style={{ padding: '12px 14px', fontWeight: '600', textAlign: 'right' }}>HRA (₹)</th>
                    <th style={{ padding: '12px 14px', fontWeight: '700', textAlign: 'right', color: '#16a34a' }}>Gross (₹)</th>
                    <th style={{ padding: '12px 14px', fontWeight: '600', textAlign: 'center' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.length === 0 ? (
                    <tr>
                      <td colSpan={13} style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                        {loading ? 'Fetching fixation records...' : 'No fixation records found.'}
                      </td>
                    </tr>
                  ) : (
                    filteredRecords.map((r, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: idx % 2 === 0 ? '#ffffff' : '#fafafa' }}>
                        <td style={{ padding: '10px 14px', color: '#64748b' }}>{idx + 1}</td>
                        <td style={{ padding: '10px 14px', fontWeight: '600', color: '#0284c7' }}>{r.employeeId}</td>
                        <td style={{ padding: '10px 14px', fontWeight: '600', color: '#1e293b' }}>{r.staffName}</td>
                        <td style={{ padding: '10px 14px', color: '#475569' }}>{r.department}</td>
                        <td style={{ padding: '10px 14px', color: '#475569' }}>{r.designation}</td>
                        <td style={{ padding: '10px 14px', color: '#64748b' }}>{r.payBand}</td>
                        <td style={{ padding: '10px 14px', textAlign: 'center', color: '#475569' }}>₹{r.gradePay}</td>
                        <td style={{ padding: '10px 14px', fontWeight: '600', color: '#0369a1' }}>{r.matrixLevel} (Cell {r.matrixCell})</td>
                        <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: '700', color: '#0f172a' }}>₹{(r.basicPay || 0).toLocaleString('en-IN')}</td>
                        <td style={{ padding: '10px 14px', textAlign: 'right', color: '#64748b' }}>₹{(r.da || 0).toLocaleString('en-IN')}</td>
                        <td style={{ padding: '10px 14px', textAlign: 'right', color: '#64748b' }}>₹{(r.hra || 0).toLocaleString('en-IN')}</td>
                        <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: '700', color: '#16a34a' }}>₹{(r.grossSalary || 0).toLocaleString('en-IN')}</td>
                        <td style={{ padding: '10px 14px', textAlign: 'center' }}>
                          <span style={{
                            padding: '3px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: '600',
                            backgroundColor: '#dcfce7', color: '#166534'
                          }}>
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
                {filteredRecords.length > 0 && (
                  <tfoot>
                    <tr style={{ backgroundColor: '#f1f5f9', borderTop: '2px solid #cbd5e1', fontWeight: '700', color: '#0f172a' }}>
                      <td colSpan={8} style={{ padding: '12px 14px', textAlign: 'right' }}>Total Pay Base:</td>
                      <td style={{ padding: '12px 14px', textAlign: 'right', color: '#0f172a' }}>₹{(summary.totalBasic || 0).toLocaleString('en-IN')}</td>
                      <td colSpan={2}></td>
                      <td style={{ padding: '12px 14px', textAlign: 'right', color: '#16a34a' }}>₹{(summary.totalGross || 0).toLocaleString('en-IN')}</td>
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
