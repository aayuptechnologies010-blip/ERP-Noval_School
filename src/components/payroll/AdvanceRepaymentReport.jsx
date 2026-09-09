import React, { useState, useEffect } from 'react';
import { Eye, Printer, Download, RefreshCw, FileText, Sparkles, CheckCircle2, DollarSign } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function AdvanceRepaymentReport() {
  const [repayments, setRepayments] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filters
  const [fromDate, setFromDate] = useState('2026-01-01');
  const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);
  const [employeeType, setEmployeeType] = useState('All');
  const [designation, setDesignation] = useState('All');
  const [employeeName, setEmployeeName] = useState('All');

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

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
    fetchRepayments();
  }, []);

  const fetchRepayments = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (fromDate) params.append('fromDate', fromDate);
      if (toDate) params.append('toDate', toDate);
      if (employeeName && employeeName !== 'All') params.append('staffName', employeeName);

      const res = await fetch(`${API_BASE}/api/advance/repayments?${params.toString()}`, { headers });
      if (res.ok) {
        const data = await res.json();
        setRepayments(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error('Error fetching repayment report:', err);
    } finally {
      setLoading(false);
    }
  };

  // Export CSV
  const exportCSV = () => {
    if (repayments.length === 0) return;
    const headersLine = ['Staff Name', 'Employee ID', 'Repayment Date', 'Repayment Amount (₹)', 'Left Balance (₹)', 'Payment Mode', 'Cheque / Ref No', 'Account Name', 'Narration'];
    const rows = repayments.map(r => [
      `"${r.staffName || ''}"`,
      `"${r.employeeId || ''}"`,
      `"${new Date(r.repaymentDate).toLocaleDateString()}"`,
      r.repaymentAmount,
      r.leftAmount,
      `"${r.paymentMode || ''}"`,
      `"${r.chequeNo || ''}"`,
      `"${r.accountName || ''}"`,
      `"${(r.narration || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headersLine.join(','), ...rows.map(r => r.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `Advance_Repayment_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalRepaid = repayments.reduce((s, r) => s + (r.repaymentAmount || 0), 0);
  const avgRepayment = repayments.length > 0 ? Math.round(totalRepaid / repayments.length) : 0;

  return (
    <div className="global-settings-container report-root" style={{ display: 'flex', minHeight: '800px', padding: 0, backgroundColor: '#f8fafc' }}>
      
      {/* Print Styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .repayment-report-sheet, .repayment-report-sheet * {
            visibility: visible;
          }
          .repayment-report-sheet {
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
            <FileText size={18} color="#159BD7" /> Advance Repayment Report
          </h3>
          <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
            Audit and report all installment repayments & salary recoveries
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
            <option value="Senior Fullstack Lead">Senior Fullstack Lead</option>
            <option value="Assistant Professor - CS">Assistant Professor - CS</option>
            <option value="Senior Mathematics Lecturer">Senior Mathematics Lecturer</option>
            <option value="Faculty">Faculty</option>
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

        <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
          <button
            onClick={fetchRepayments}
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
      <div className="repayment-report-sheet" style={{ flexGrow: 1, padding: '24px 30px', overflowY: 'auto' }}>
        
        {/* Report Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #159BD7', paddingBottom: '14px', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0' }}>
              Advance Repayments & Recovery Audit Log
            </h2>
            <div style={{ fontSize: '12.5px', color: '#64748b' }}>
              Period: <strong>{new Date(fromDate).toLocaleDateString()}</strong> to <strong>{new Date(toDate).toLocaleDateString()}</strong> | Total Repayments: <strong>{repayments.length}</strong>
            </div>
          </div>
          <div style={{ textAlign: 'right', fontSize: '12px', color: '#64748b' }}>
            Report Generated: {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
          </div>
        </div>

        {/* KPI Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
          <div style={{ backgroundColor: '#ffffff', padding: '14px 18px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '11.5px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Total Transactions</div>
            <div style={{ fontSize: '22px', fontWeight: '700', color: '#0f172a', marginTop: '2px' }}>
              {repayments.length}
            </div>
          </div>
          <div style={{ backgroundColor: '#ffffff', padding: '14px 18px', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
            <div style={{ fontSize: '11.5px', color: '#166534', fontWeight: '600', textTransform: 'uppercase' }}>Total Amount Repaid</div>
            <div style={{ fontSize: '22px', fontWeight: '700', color: '#16a34a', marginTop: '2px' }}>
              ₹{totalRepaid.toLocaleString('en-IN')}
            </div>
          </div>
          <div style={{ backgroundColor: '#ffffff', padding: '14px 18px', borderRadius: '8px', border: '1px solid #bae6fd' }}>
            <div style={{ fontSize: '11.5px', color: '#0369a1', fontWeight: '600', textTransform: 'uppercase' }}>Average Installment Recovered</div>
            <div style={{ fontSize: '22px', fontWeight: '700', color: '#0284c7', marginTop: '2px' }}>
              ₹{avgRepayment.toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '1px solid #cbd5e1', color: '#334155', fontWeight: '600' }}>
                <th style={{ padding: '10px 14px' }}>#</th>
                <th style={{ padding: '10px 14px' }}>Staff Name</th>
                <th style={{ padding: '10px 14px' }}>Repayment Date</th>
                <th style={{ padding: '10px 14px' }}>Narration</th>
                <th style={{ padding: '10px 14px', textAlign: 'right' }}>Amount Paid</th>
                <th style={{ padding: '10px 14px', textAlign: 'right' }}>Remaining Balance</th>
                <th style={{ padding: '10px 14px' }}>Account</th>
                <th style={{ padding: '10px 14px' }}>Mode / Ref</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                    <RefreshCw size={18} className="animate-spin" style={{ display: 'inline', marginRight: '6px' }} /> Loading repayment records...
                  </td>
                </tr>
              ) : repayments.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
                    No advance repayments recorded for the selected criteria.
                  </td>
                </tr>
              ) : (
                repayments.map((r, idx) => {
                  const isAyup = (r.staffName || '').toLowerCase().includes('ayup');
                  return (
                    <tr
                      key={r._id}
                      style={{
                        borderBottom: '1px solid #f1f5f9',
                        backgroundColor: isAyup ? 'rgba(21, 155, 215, 0.04)' : 'transparent'
                      }}
                    >
                      <td style={{ padding: '10px 14px', color: '#64748b' }}>{idx + 1}</td>
                      <td style={{ padding: '10px 14px' }}>
                        <div style={{ fontWeight: '600', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          {r.staffName}
                          {isAyup && (
                            <span style={{ backgroundColor: '#e0f2fe', color: '#0284c7', fontSize: '10.5px', padding: '1px 5px', borderRadius: '4px', fontWeight: '700', border: '1px solid #7dd3fc' }}>
                              ★ Ayup Tech
                            </span>
                          )}
                        </div>
                        {r.employeeId && <div style={{ fontSize: '11px', color: '#64748b' }}>ID: {r.employeeId}</div>}
                      </td>
                      <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
                        {new Date(r.repaymentDate).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '10px 14px', color: '#334155' }}>
                        {r.narration || 'Advance recovery'}
                      </td>
                      <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: '700', color: '#16a34a' }}>
                        ₹{(r.repaymentAmount || 0).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: '600', color: r.leftAmount > 0 ? '#ea580c' : '#16a34a' }}>
                        ₹{(r.leftAmount || 0).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '10px 14px', color: '#475569' }}>
                        {r.accountName}
                      </td>
                      <td style={{ padding: '10px 14px', color: '#334155' }}>
                        <div>{r.paymentMode}</div>
                        {r.chequeNo && <div style={{ fontSize: '11px', color: '#64748b' }}>Ref: {r.chequeNo}</div>}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
            <tfoot>
              <tr style={{ backgroundColor: '#f8fafc', borderTop: '2px solid #cbd5e1', fontWeight: '700' }}>
                <td colSpan="4" style={{ padding: '12px 14px', textAlign: 'right' }}>Total Recovered:</td>
                <td style={{ padding: '12px 14px', textAlign: 'right', color: '#16a34a' }}>₹{totalRepaid.toLocaleString('en-IN')}</td>
                <td colSpan="3"></td>
              </tr>
            </tfoot>
          </table>
        </div>

      </div>

    </div>
  );
}
