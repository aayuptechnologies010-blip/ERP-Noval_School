import React, { useState, useEffect } from 'react';
import { Eye, Printer, Download, RefreshCw, FileText, Sparkles, Filter, DollarSign } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function AdvanceEntryReport() {
  const [entries, setEntries] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filter States
  const [fromDate, setFromDate] = useState('2026-01-01');
  const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);
  const [employeeType, setEmployeeType] = useState('All');
  const [designation, setDesignation] = useState('All');
  const [employeeName, setEmployeeName] = useState('All');
  const [isTotalAdvance, setIsTotalAdvance] = useState(false);

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  // Fetch initial staff roster and run report
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const sRes = await fetch(`${API_BASE}/api/staffs`, { headers });
        if (sRes.ok) {
          const sData = await sRes.json();
          setStaffList(Array.isArray(sData) ? sData : []);
        }
      } catch (e) {
        // ignore
      }
    };
    fetchStaff();
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (fromDate) params.append('fromDate', fromDate);
      if (toDate) params.append('toDate', toDate);
      if (employeeType && employeeType !== 'All') params.append('staffType', employeeType);
      if (designation && designation !== 'All') params.append('designation', designation);
      if (employeeName && employeeName !== 'All') params.append('staffName', employeeName);

      const res = await fetch(`${API_BASE}/api/advance/entries?${params.toString()}`, { headers });
      if (res.ok) {
        const data = await res.json();
        setEntries(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error('Error loading advance report data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Export CSV
  const exportCSV = () => {
    if (entries.length === 0) return;
    let headersLine, rows;

    if (isTotalAdvance) {
      headersLine = ['Staff Name', 'Employee ID', 'Designation', 'Department', 'Total Disbursed (₹)', 'Total Recovered (₹)', 'Outstanding Balance (₹)', 'Loans Count'];
      rows = employeeSummary.map(s => [
        `"${s.staffName || ''}"`,
        `"${s.employeeId || ''}"`,
        `"${s.designation || ''}"`,
        `"${s.department || ''}"`,
        s.totalDisbursed,
        s.totalRecovered,
        s.netOutstanding,
        s.count
      ]);
    } else {
      headersLine = ['Staff Name', 'Employee ID', 'Designation', 'Department', 'Date', 'Advance Amount (₹)', 'Installments', 'Recovered (₹)', 'Left Amt (₹)', 'Account', 'Payment Mode', 'Status'];
      rows = entries.map(e => [
        `"${e.staffName || ''}"`,
        `"${e.employeeId || ''}"`,
        `"${e.designation || ''}"`,
        `"${e.department || ''}"`,
        `"${new Date(e.date).toLocaleDateString()}"`,
        e.advanceAmount,
        e.numberOfInstallments,
        e.recoveredAmount,
        e.leftAmount,
        `"${e.accountName || ''}"`,
        `"${e.paymentMode || ''}"`,
        `"${e.status || ''}"`
      ]);
    }

    const csvContent = 'data:text/csv;charset=utf-8,' + [headersLine.join(','), ...rows.map(r => r.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `Advance_Disbursement_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Aggregated Employee Summary
  const employeeSummaryMap = {};
  entries.forEach(e => {
    const key = e.staffName;
    if (!employeeSummaryMap[key]) {
      employeeSummaryMap[key] = {
        staffName: e.staffName,
        employeeId: e.employeeId,
        designation: e.designation,
        department: e.department,
        totalDisbursed: 0,
        totalRecovered: 0,
        netOutstanding: 0,
        count: 0
      };
    }
    employeeSummaryMap[key].totalDisbursed += (e.advanceAmount || 0);
    employeeSummaryMap[key].totalRecovered += (e.recoveredAmount || 0);
    employeeSummaryMap[key].netOutstanding += (e.leftAmount || 0);
    employeeSummaryMap[key].count += 1;
  });
  const employeeSummary = Object.values(employeeSummaryMap);

  // Totals
  const totalDisbursed = entries.reduce((s, e) => s + (e.advanceAmount || 0), 0);
  const totalRecovered = entries.reduce((s, e) => s + (e.recoveredAmount || 0), 0);
  const totalOutstanding = entries.reduce((s, e) => s + (e.leftAmount || 0), 0);

  // Unique designations
  const designations = Array.from(new Set([
    'Senior Fullstack Lead',
    'Assistant Professor - CS',
    'Senior Mathematics Lecturer',
    'Faculty',
    ...staffList.map(s => s.designation).filter(Boolean)
  ]));

  return (
    <div className="global-settings-container report-root" style={{ display: 'flex', minHeight: '800px', padding: 0, backgroundColor: '#f8fafc' }}>
      
      {/* Print Styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .report-sheet, .report-sheet * {
            visibility: visible;
          }
          .report-sheet {
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            margin: 0 !important;
            padding: 10mm !important;
            box-shadow: none !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Left Filter Sidebar */}
      <div className="no-print" style={{ width: '290px', minWidth: '290px', padding: '24px 20px', backgroundColor: '#ffffff', borderRight: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FileText size={18} color="#159BD7" /> Advance Entry Report
          </h3>
          <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
            Filter and generate salary loan & disbursement statements
          </p>
        </div>

        <div style={{ height: '1px', backgroundColor: '#e2e8f0' }} />

        <div className="form-group">
          <label style={{ fontSize: '12.5px', fontWeight: '600', color: '#475569', marginBottom: '4px', display: 'block' }}>From Date</label>
          <input
            type="date"
            className="settings-input"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            style={{ width: '100%', padding: '8px 10px', fontSize: '13px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
          />
        </div>

        <div className="form-group">
          <label style={{ fontSize: '12.5px', fontWeight: '600', color: '#475569', marginBottom: '4px', display: 'block' }}>To Date</label>
          <input
            type="date"
            className="settings-input"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            style={{ width: '100%', padding: '8px 10px', fontSize: '13px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
          />
        </div>

        <div className="form-group">
          <label style={{ fontSize: '12.5px', fontWeight: '600', color: '#475569', marginBottom: '4px', display: 'block' }}>Employee Type</label>
          <select
            className="settings-input"
            value={employeeType}
            onChange={(e) => setEmployeeType(e.target.value)}
            style={{ width: '100%', padding: '8px 10px', fontSize: '13px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#fff' }}
          >
            <option value="All">All Employee Types</option>
            <option value="Teaching">Teaching Staff</option>
            <option value="Non-Teaching">Non-Teaching Staff</option>
            <option value="Administrative">Administrative</option>
          </select>
        </div>

        <div className="form-group">
          <label style={{ fontSize: '12.5px', fontWeight: '600', color: '#475569', marginBottom: '4px', display: 'block' }}>Designation</label>
          <select
            className="settings-input"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            style={{ width: '100%', padding: '8px 10px', fontSize: '13px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#fff' }}
          >
            <option value="All">All Designations</option>
            {designations.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label style={{ fontSize: '12.5px', fontWeight: '600', color: '#475569', marginBottom: '4px', display: 'block' }}>Employee Name</label>
          <select
            className="settings-input"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            style={{ width: '100%', padding: '8px 10px', fontSize: '13px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#fff' }}
          >
            <option value="All">All Employees</option>
            <option value="Ayup Tech">Ayup Tech (EMP-AT-2026)</option>
            <option value="Ayup Tech Senior Faculty">Ayup Tech Senior Faculty</option>
            {staffList.map(st => {
              const name = `${st.basicInfo?.firstName || ''} ${st.basicInfo?.lastName || ''}`.trim() || st.name || 'Staff';
              return (
                <option key={st._id} value={name}>{name}</option>
              );
            })}
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 0' }}>
          <input
            type="checkbox"
            id="totalAdvance"
            checked={isTotalAdvance}
            onChange={(e) => setIsTotalAdvance(e.target.checked)}
            style={{ width: '16px', height: '16px', cursor: 'pointer' }}
          />
          <label htmlFor="totalAdvance" style={{ fontSize: '13px', fontWeight: '600', color: '#334155', cursor: 'pointer' }}>
            Total Advance Employee Wise
          </label>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
          <button
            onClick={fetchReportData}
            style={{
              backgroundColor: '#159BD7',
              color: 'white',
              border: 'none',
              padding: '9px 16px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              flex: 1
            }}
          >
            <Eye size={16} /> Show
          </button>
          <button
            onClick={() => {
              setFromDate('2026-01-01');
              setToDate(new Date().toISOString().split('T')[0]);
              setEmployeeType('All');
              setDesignation('All');
              setEmployeeName('All');
              setIsTotalAdvance(false);
            }}
            style={{
              padding: '9px 12px',
              border: '1px solid #cbd5e1',
              borderRadius: '6px',
              backgroundColor: '#f1f5f9',
              color: '#475569',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            Reset
          </button>
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button
            onClick={exportCSV}
            style={{
              backgroundColor: '#ffffff',
              color: '#475569',
              border: '1px solid #cbd5e1',
              padding: '9px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              fontSize: '13px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            <Download size={15} /> Export CSV
          </button>
          <button
            onClick={() => window.print()}
            style={{
              backgroundColor: '#0f172a',
              color: 'white',
              border: 'none',
              padding: '9px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            <Printer size={15} /> Print Report
          </button>
        </div>

      </div>

      {/* Main Report Area */}
      <div className="report-sheet" style={{ flexGrow: 1, padding: '24px 30px', overflowY: 'auto' }}>
        
        {/* Report Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #159BD7', paddingBottom: '14px', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0' }}>
              Staff Salary Advance Disbursement Statement
            </h2>
            <div style={{ fontSize: '12.5px', color: '#64748b' }}>
              Period: <strong>{new Date(fromDate).toLocaleDateString()}</strong> to <strong>{new Date(toDate).toLocaleDateString()}</strong> | Mode: <strong>{isTotalAdvance ? 'Employee-Wise Summary' : 'Detailed Itemized List'}</strong>
            </div>
          </div>
          <div style={{ textAlign: 'right', fontSize: '12px', color: '#64748b' }}>
            Report Generated: {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
          </div>
        </div>

        {/* Financial KPI Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
          <div style={{ backgroundColor: '#ffffff', padding: '14px 18px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '11.5px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Total Advance Disbursed</div>
            <div style={{ fontSize: '22px', fontWeight: '700', color: '#0f172a', marginTop: '2px' }}>
              ₹{totalDisbursed.toLocaleString('en-IN')}
            </div>
          </div>
          <div style={{ backgroundColor: '#ffffff', padding: '14px 18px', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
            <div style={{ fontSize: '11.5px', color: '#166534', fontWeight: '600', textTransform: 'uppercase' }}>Total Amount Recovered</div>
            <div style={{ fontSize: '22px', fontWeight: '700', color: '#16a34a', marginTop: '2px' }}>
              ₹{totalRecovered.toLocaleString('en-IN')}
            </div>
          </div>
          <div style={{ backgroundColor: '#ffffff', padding: '14px 18px', borderRadius: '8px', border: '1px solid #fed7aa' }}>
            <div style={{ fontSize: '11.5px', color: '#9a3412', fontWeight: '600', textTransform: 'uppercase' }}>Net Outstanding Balance</div>
            <div style={{ fontSize: '22px', fontWeight: '700', color: '#ea580c', marginTop: '2px' }}>
              ₹{totalOutstanding.toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        {/* Report Content Table */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          {isTotalAdvance ? (
            /* EMPLOYEE WISE SUMMARY VIEW */
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '1px solid #cbd5e1', color: '#334155', fontWeight: '600' }}>
                  <th style={{ padding: '10px 14px' }}>#</th>
                  <th style={{ padding: '10px 14px' }}>Employee Name</th>
                  <th style={{ padding: '10px 14px' }}>Department</th>
                  <th style={{ padding: '10px 14px', textAlign: 'center' }}>Advances Count</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right' }}>Total Disbursed</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right' }}>Total Recovered</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right' }}>Outstanding Balance</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                      <RefreshCw size={18} className="animate-spin" style={{ display: 'inline', marginRight: '6px' }} /> Loading summary...
                    </td>
                  </tr>
                ) : employeeSummary.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
                      No advance records found for selected period.
                    </td>
                  </tr>
                ) : (
                  employeeSummary.map((s, idx) => {
                    const isAyup = (s.staffName || '').toLowerCase().includes('ayup');
                    return (
                      <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: isAyup ? 'rgba(21, 155, 215, 0.04)' : 'transparent' }}>
                        <td style={{ padding: '10px 14px', color: '#64748b' }}>{idx + 1}</td>
                        <td style={{ padding: '10px 14px' }}>
                          <div style={{ fontWeight: '600', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            {s.staffName}
                            {isAyup && (
                              <span style={{ backgroundColor: '#e0f2fe', color: '#0284c7', fontSize: '10.5px', padding: '1px 5px', borderRadius: '4px', fontWeight: '700', border: '1px solid #7dd3fc' }}>
                                ★ Ayup Tech
                              </span>
                            )}
                          </div>
                          {s.employeeId && <div style={{ fontSize: '11px', color: '#64748b' }}>ID: {s.employeeId}</div>}
                        </td>
                        <td style={{ padding: '10px 14px', color: '#475569' }}>{s.department || '—'}</td>
                        <td style={{ padding: '10px 14px', textAlign: 'center', fontWeight: '600' }}>{s.count}</td>
                        <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: '600' }}>₹{s.totalDisbursed.toLocaleString('en-IN')}</td>
                        <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: '600', color: '#16a34a' }}>₹{s.totalRecovered.toLocaleString('en-IN')}</td>
                        <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: '700', color: s.netOutstanding > 0 ? '#ea580c' : '#16a34a' }}>
                          ₹{s.netOutstanding.toLocaleString('en-IN')}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
              <tfoot>
                <tr style={{ backgroundColor: '#f8fafc', borderTop: '2px solid #cbd5e1', fontWeight: '700' }}>
                  <td colSpan="4" style={{ padding: '12px 14px', textAlign: 'right' }}>Total Aggregates:</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right' }}>₹{totalDisbursed.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', color: '#16a34a' }}>₹{totalRecovered.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', color: '#ea580c' }}>₹{totalOutstanding.toLocaleString('en-IN')}</td>
                </tr>
              </tfoot>
            </table>
          ) : (
            /* DETAILED ITEMIZED ADVANCE LIST */
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12.5px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '1px solid #cbd5e1', color: '#334155', fontWeight: '600' }}>
                  <th style={{ padding: '10px 12px' }}>#</th>
                  <th style={{ padding: '10px 12px' }}>Staff Name</th>
                  <th style={{ padding: '10px 12px' }}>Date</th>
                  <th style={{ padding: '10px 12px' }}>Advance Amt</th>
                  <th style={{ padding: '10px 12px' }}>Installments</th>
                  <th style={{ padding: '10px 12px' }}>Recovered</th>
                  <th style={{ padding: '10px 12px' }}>Left Balance</th>
                  <th style={{ padding: '10px 12px' }}>Account</th>
                  <th style={{ padding: '10px 12px' }}>Mode</th>
                  <th style={{ padding: '10px 12px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="10" style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                      <RefreshCw size={18} className="animate-spin" style={{ display: 'inline', marginRight: '6px' }} /> Loading advance entries...
                    </td>
                  </tr>
                ) : entries.length === 0 ? (
                  <tr>
                    <td colSpan="10" style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
                      No advance entries found for selected criteria.
                    </td>
                  </tr>
                ) : (
                  entries.map((e, idx) => {
                    const isAyup = (e.staffName || '').toLowerCase().includes('ayup');
                    return (
                      <tr key={e._id} style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: isAyup ? 'rgba(21, 155, 215, 0.04)' : 'transparent' }}>
                        <td style={{ padding: '10px 12px', color: '#64748b' }}>{idx + 1}</td>
                        <td style={{ padding: '10px 12px' }}>
                          <div style={{ fontWeight: '600', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            {e.staffName}
                            {isAyup && (
                              <span style={{ backgroundColor: '#e0f2fe', color: '#0284c7', fontSize: '10px', padding: '0 4px', borderRadius: '3px', fontWeight: '700', border: '1px solid #7dd3fc' }}>
                                ★ Ayup Tech
                              </span>
                            )}
                          </div>
                          <div style={{ fontSize: '11px', color: '#64748b' }}>{e.employeeId}</div>
                        </td>
                        <td style={{ padding: '10px 12px', whiteSpace: 'nowrap' }}>{new Date(e.date).toLocaleDateString()}</td>
                        <td style={{ padding: '10px 12px', fontWeight: '600' }}>₹{(e.advanceAmount || 0).toLocaleString('en-IN')}</td>
                        <td style={{ padding: '10px 12px' }}>{e.numberOfInstallments} mths</td>
                        <td style={{ padding: '10px 12px', color: '#16a34a', fontWeight: '600' }}>₹{(e.recoveredAmount || 0).toLocaleString('en-IN')}</td>
                        <td style={{ padding: '10px 12px', color: e.leftAmount > 0 ? '#ea580c' : '#16a34a', fontWeight: '700' }}>₹{(e.leftAmount || 0).toLocaleString('en-IN')}</td>
                        <td style={{ padding: '10px 12px', color: '#475569' }}>{e.accountName}</td>
                        <td style={{ padding: '10px 12px' }}>{e.paymentMode}</td>
                        <td style={{ padding: '10px 12px' }}>
                          <span style={{
                            padding: '2px 8px',
                            borderRadius: '10px',
                            fontSize: '11px',
                            fontWeight: '600',
                            backgroundColor: e.status === 'Fully Recovered' ? '#dcfce7' : '#e0f2fe',
                            color: e.status === 'Fully Recovered' ? '#15803d' : '#0369a1'
                          }}>
                            {e.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
              <tfoot>
                <tr style={{ backgroundColor: '#f8fafc', borderTop: '2px solid #cbd5e1', fontWeight: '700' }}>
                  <td colSpan="3" style={{ padding: '10px 12px', textAlign: 'right' }}>Summary:</td>
                  <td style={{ padding: '10px 12px' }}>₹{totalDisbursed.toLocaleString('en-IN')}</td>
                  <td></td>
                  <td style={{ padding: '10px 12px', color: '#16a34a' }}>₹{totalRecovered.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '10px 12px', color: '#ea580c' }}>₹{totalOutstanding.toLocaleString('en-IN')}</td>
                  <td colSpan="3"></td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>

      </div>

    </div>
  );
}
