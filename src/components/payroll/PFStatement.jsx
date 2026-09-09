import React, { useState, useEffect } from 'react';
import {
  Eye, Download, Printer, RefreshCw, CheckCircle,
  AlertCircle, Sparkles, DollarSign, User, ShieldCheck,
  ChevronLeft, ChevronRight, Filter, Building2, BookOpen, Percent
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function PFStatement() {
  const [data, setData] = useState({ staffList: [], ledger: [], employee: {}, openingBalance: {}, closingBalance: {}, summary: {} });
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [schoolName, setSchoolName] = useState('Ayup Tech');
  const [financialYear, setFinancialYear] = useState('2026-2027');
  const [selectedEmpId, setSelectedEmpId] = useState('');

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  const showNotif = (type, text) => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg(null), 4000);
  };

  const fetchStatement = async (empId = selectedEmpId) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (financialYear) params.append('financialYear', financialYear);
      if (empId) params.append('employeeId', empId);

      const res = await fetch(`${API_BASE}/api/salary-structure/pf-statement?${params.toString()}`, { headers });
      if (res.ok) {
        const json = await res.json();
        setData(json);
        if (!empId && json.employee?.employeeId) {
          setSelectedEmpId(json.employee.employeeId);
        }
      } else {
        showNotif('error', 'Failed to fetch member PF statement');
      }
    } catch (err) {
      console.error(err);
      showNotif('error', 'Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatement('');
  }, []);

  const employee = data.employee || {};
  const ledger = data.ledger || [];
  const opening = data.openingBalance || {};
  const closing = data.closingBalance || {};
  const summary = data.summary || {};
  const staffList = data.staffList || [];

  const handleStaffChange = (e) => {
    const id = e.target.value;
    setSelectedEmpId(id);
    fetchStatement(id);
  };

  const exportCSV = () => {
    if (!ledger.length) return;
    const headersList = [
      'Month', 'EPF Wages (₹)', 'Employee Share (₹)', 'Employer EPF (₹)', 'Employer EPS (₹)',
      'Total Monthly (₹)', 'Progressive EE (₹)', 'Progressive Total (₹)'
    ];
    const rows = ledger.map(r => [
      `"${r.month}"`,
      r.epfWages,
      r.eeShare,
      r.erEpfShare,
      r.erEpsShare,
      r.totalMonthly,
      r.cumulativeEeBalance,
      r.cumulativeTotal
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headersList.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `PF_Member_Passbook_${employee.employeeId || 'Staff'}_${financialYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotif('success', 'PF Passbook CSV downloaded successfully');
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
                Member Filters
              </span>
            </div>

            <div className="form-group">
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', display: 'block' }}>School Name</label>
              <select value={schoolName} onChange={e => setSchoolName(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '12px' }}>
                <option value="Ayup Tech">Ayup Tech</option>
                <option value="Ayup Technologies">Ayup Technologies</option>
              </select>
            </div>

            <div className="form-group">
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', display: 'block' }}>Financial Year</label>
              <select value={financialYear} onChange={e => setFinancialYear(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '12px' }}>
                <option value="2026-2027">2026-2027</option>
                <option value="2025-2026">2025-2026</option>
              </select>
            </div>

            <div className="form-group">
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', display: 'block' }}>Select Member / Employee</label>
              <select value={selectedEmpId} onChange={handleStaffChange} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '12px' }}>
                {staffList.map((s, idx) => (
                  <option key={idx} value={s.employeeId}>
                    {s.staffName} ({s.employeeId})
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginTop: '10px' }}>
              <button
                onClick={() => fetchStatement(selectedEmpId)}
                disabled={loading}
                style={{
                  width: '100%', backgroundColor: '#159BD7', color: '#ffffff', border: 'none',
                  padding: '10px', borderRadius: '6px', fontWeight: '600', fontSize: '13px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer'
                }}
              >
                <Eye size={16} /> {loading ? 'Loading Passbook...' : 'View PF Passbook'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
        {/* Header */}
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
                  PF Member Statement & Annual Passbook
                </h2>
                <span style={{
                  backgroundColor: '#e0f2fe', color: '#0369a1', padding: '2px 10px',
                  borderRadius: '12px', fontSize: '11px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px'
                }}>
                  <Sparkles size={12} /> FY {financialYear}
                </span>
                <span style={{
                  backgroundColor: '#fef3c7', color: '#92400e', padding: '2px 10px',
                  borderRadius: '12px', fontSize: '11px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px'
                }}>
                  <Building2 size={12} /> {schoolName}
                </span>
              </div>
              <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>
                Member Ledger with Monthly Remittance, Interest Credited (8.25% p.a.), & Cumulative Balance
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => fetchStatement(selectedEmpId)}
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
              <Printer size={14} /> Print Passbook
            </button>
          </div>
        </div>

        {/* Member Profile Banner */}
        <div style={{ padding: '16px 24px 0' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0369a1' }}>
                <User size={24} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>{employee.staffName || 'Ayup Tech Staff'}</h3>
                <div style={{ display: 'flex', gap: '14px', marginTop: '4px', fontSize: '12px', color: '#64748b' }}>
                  <span>Emp ID: <b style={{ color: '#0369a1' }}>{employee.employeeId}</b></span>
                  <span>•</span>
                  <span>Dept: <b>{employee.department}</b></span>
                  <span>•</span>
                  <span>Designation: <b>{employee.designation}</b></span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px', fontSize: '12px' }}>
              <div style={{ backgroundColor: '#f8fafc', padding: '8px 14px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                <div style={{ color: '#64748b', fontSize: '11px' }}>UAN Number</div>
                <div style={{ fontWeight: '700', color: '#0f172a', fontFamily: 'monospace' }}>{employee.uanNumber || '101294820191'}</div>
              </div>
              <div style={{ backgroundColor: '#f8fafc', padding: '8px 14px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                <div style={{ color: '#64748b', fontSize: '11px' }}>PF Account No.</div>
                <div style={{ fontWeight: '700', color: '#0f172a', fontFamily: 'monospace' }}>{employee.pfNumber || 'UP/NOI/0019284/0001'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Stat KPI Cards */}
        <div style={{ padding: '16px 24px 10px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '8px', backgroundColor: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284c7' }}>
              <DollarSign size={22} />
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Opening Balance</div>
              <div style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>₹{(opening.total || 0).toLocaleString('en-IN')}</div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>As on 01-Apr-{financialYear.split('-')[0]}</div>
            </div>
          </div>

          <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '8px', backgroundColor: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a' }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Annual EE Share</div>
              <div style={{ fontSize: '18px', fontWeight: '700', color: '#16a34a' }}>₹{(summary.totalEeContributed || 0).toLocaleString('en-IN')}</div>
              <div style={{ fontSize: '11px', color: '#16a34a' }}>12 Months Deductions</div>
            </div>
          </div>

          <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '8px', backgroundColor: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706' }}>
              <Percent size={22} />
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Interest Accrued</div>
              <div style={{ fontSize: '18px', fontWeight: '700', color: '#d97706' }}>₹{(closing.interestAccrued || 0).toLocaleString('en-IN')}</div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Rate: {data.interestRate || 8.25}% p.a.</div>
            </div>
          </div>

          <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '8px', backgroundColor: '#fae8ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a21caf' }}>
              <BookOpen size={22} />
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Closing Balance</div>
              <div style={{ fontSize: '18px', fontWeight: '700', color: '#a21caf' }}>₹{(closing.total || 0).toLocaleString('en-IN')}</div>
              <div style={{ fontSize: '11px', color: '#a21caf' }}>As on 31-Mar-{financialYear.split('-')[1]}</div>
            </div>
          </div>
        </div>

        {/* Passbook Ledger Table */}
        <div style={{ padding: '16px 24px', flex: 1, overflowY: 'auto' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
                    <th style={{ padding: '12px 14px', fontWeight: '600' }}>Month</th>
                    <th style={{ padding: '12px 14px', fontWeight: '600', textAlign: 'right' }}>EPF Wages (₹)</th>
                    <th style={{ padding: '12px 14px', fontWeight: '600', textAlign: 'right', color: '#0369a1' }}>EE Share (12%)</th>
                    <th style={{ padding: '12px 14px', fontWeight: '600', textAlign: 'right', color: '#059669' }}>ER EPF (3.67%)</th>
                    <th style={{ padding: '12px 14px', fontWeight: '600', textAlign: 'right', color: '#d97706' }}>ER EPS (8.33%)</th>
                    <th style={{ padding: '12px 14px', fontWeight: '600', textAlign: 'right', color: '#7c3aed' }}>Monthly Total (₹)</th>
                    <th style={{ padding: '12px 14px', fontWeight: '600', textAlign: 'right', color: '#0f172a' }}>Progressive EE Balance (₹)</th>
                    <th style={{ padding: '12px 14px', fontWeight: '700', textAlign: 'right', color: '#0f172a' }}>Progressive Total Balance (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ backgroundColor: '#f1f5f9', fontWeight: '600' }}>
                    <td style={{ padding: '10px 14px', color: '#475569' }}>Opening Balance</td>
                    <td colSpan={5} style={{ padding: '10px 14px', textAlign: 'center', color: '#64748b' }}>Brought Forward from FY 2025-2026</td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', color: '#0369a1' }}>₹{(opening.eeBalance || 0).toLocaleString('en-IN')}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', color: '#0f172a' }}>₹{(opening.total || 0).toLocaleString('en-IN')}</td>
                  </tr>
                  {ledger.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: idx % 2 === 0 ? '#ffffff' : '#fafafa' }}>
                      <td style={{ padding: '10px 14px', fontWeight: '600', color: '#1e293b' }}>{row.month}</td>
                      <td style={{ padding: '10px 14px', textAlign: 'right', color: '#64748b' }}>₹{(row.epfWages || 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: '600', color: '#0369a1' }}>₹{(row.eeShare || 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: '600', color: '#059669' }}>₹{(row.erEpfShare || 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: '600', color: '#d97706' }}>₹{(row.erEpsShare || 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: '600', color: '#7c3aed' }}>₹{(row.totalMonthly || 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '10px 14px', textAlign: 'right', color: '#0f172a' }}>₹{(row.cumulativeEeBalance || 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: '700', color: '#0f172a' }}>₹{(row.cumulativeTotal || 0).toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                  <tr style={{ backgroundColor: '#fef3c7', fontWeight: '600' }}>
                    <td style={{ padding: '10px 14px', color: '#92400e' }}>Interest Credited ({data.interestRate || 8.25}%)</td>
                    <td colSpan={5} style={{ padding: '10px 14px', textAlign: 'center', color: '#92400e' }}>Statutory Annual Compound Interest</td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', color: '#92400e' }}>₹{Math.round((closing.interestAccrued || 0) * 0.75).toLocaleString('en-IN')}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', color: '#92400e' }}>₹{(closing.interestAccrued || 0).toLocaleString('en-IN')}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr style={{ backgroundColor: '#f1f5f9', borderTop: '2px solid #cbd5e1', fontWeight: '700', color: '#0f172a' }}>
                    <td style={{ padding: '12px 14px' }}>Closing Balance:</td>
                    <td style={{ padding: '12px 14px', textAlign: 'right' }}>—</td>
                    <td style={{ padding: '12px 14px', textAlign: 'right', color: '#0369a1' }}>₹{(summary.totalEeContributed || 0).toLocaleString('en-IN')}</td>
                    <td style={{ padding: '12px 14px', textAlign: 'right', color: '#059669' }}>₹{(summary.totalErEpfContributed || 0).toLocaleString('en-IN')}</td>
                    <td style={{ padding: '12px 14px', textAlign: 'right', color: '#d97706' }}>₹{(summary.totalErEpsContributed || 0).toLocaleString('en-IN')}</td>
                    <td style={{ padding: '12px 14px', textAlign: 'right', color: '#7c3aed' }}>₹{(summary.grandContribution || 0).toLocaleString('en-IN')}</td>
                    <td style={{ padding: '12px 14px', textAlign: 'right', color: '#0f172a' }}>₹{(closing.eeBalance || 0).toLocaleString('en-IN')}</td>
                    <td style={{ padding: '12px 14px', textAlign: 'right', color: '#16a34a', fontSize: '14px' }}>₹{(closing.total || 0).toLocaleString('en-IN')}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
