import React, { useState, useEffect } from 'react';
import { Eye, Printer, Download, RefreshCw, FileText, Sparkles, User, Calendar, DollarSign, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function AdvanceLedgerReport() {
  const [ledgerData, setLedgerData] = useState({
    summary: { totalDebit: 0, totalCredit: 0, currentOutstanding: 0, activeAdvancesCount: 0, repaymentsCount: 0 },
    ledger: []
  });
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filters
  const [fromDate, setFromDate] = useState('2026-01-01');
  const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);
  const [employeeType, setEmployeeType] = useState('All');
  const [employeeName, setEmployeeName] = useState('Ayup Tech');
  const [advanceDescription, setAdvanceDescription] = useState('All');

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
    fetchLedger();
  }, []);

  const fetchLedger = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (employeeName && employeeName !== 'All') params.append('staffName', employeeName);
      if (fromDate) params.append('fromDate', fromDate);
      if (toDate) params.append('toDate', toDate);

      const res = await fetch(`${API_BASE}/api/advance/ledger?${params.toString()}`, { headers });
      if (res.ok) {
        const data = await res.json();
        setLedgerData(data || { summary: {}, ledger: [] });
      }
    } catch (err) {
      console.error('Error fetching advance ledger:', err);
    } finally {
      setLoading(false);
    }
  };

  // Export CSV
  const exportCSV = () => {
    if (!ledgerData.ledger || ledgerData.ledger.length === 0) return;
    const headersLine = ['Date', 'Transaction Type', 'Staff Name', 'Employee ID', 'Narration', 'Account Name', 'Payment Mode', 'Cheque / Ref', 'Debit (₹)', 'Credit (₹)', 'Running Balance (₹)'];
    const rows = ledgerData.ledger.map(t => [
      `"${new Date(t.date).toLocaleDateString()}"`,
      `"${t.type || ''}"`,
      `"${t.staffName || ''}"`,
      `"${t.employeeId || ''}"`,
      `"${(t.narration || '').replace(/"/g, '""')}"`,
      `"${t.accountName || ''}"`,
      `"${t.paymentMode || ''}"`,
      `"${t.chequeNo || ''}"`,
      t.debit || 0,
      t.credit || 0,
      t.balance || 0
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headersLine.join(','), ...rows.map(r => r.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `Advance_Ledger_Statement_${employeeName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isAyup = employeeName.toLowerCase().includes('ayup');

  return (
    <div className="global-settings-container ledger-root" style={{ padding: '24px', backgroundColor: '#f8fafc', minHeight: '85vh' }}>
      
      {/* Print Styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .printable-ledger-sheet, .printable-ledger-sheet * {
            visibility: visible;
          }
          .printable-ledger-sheet {
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            margin: 0 !important;
            padding: 12mm !important;
            box-shadow: none !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Top Filter Card */}
      <div className="no-print" style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={22} color="#159BD7" /> Advance Ledger Statement
            </h2>
            <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '13.5px' }}>
              Comprehensive running balance statement showing loan disbursements (Debits) and repayments (Credits)
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={exportCSV}
              style={{
                backgroundColor: '#fff',
                color: '#475569',
                border: '1px solid #cbd5e1',
                padding: '8px 16px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: '500',
                fontSize: '13px',
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
                padding: '8px 18px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: '600',
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              <Printer size={15} /> Print Statement
            </button>
          </div>
        </div>

        {/* Filter Inputs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr) auto', gap: '14px', alignItems: 'flex-end' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>From Date</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              style={{ width: '100%', padding: '8px 10px', fontSize: '13px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>To Date</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              style={{ width: '100%', padding: '8px 10px', fontSize: '13px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Employee Type</label>
            <select
              value={employeeType}
              onChange={(e) => setEmployeeType(e.target.value)}
              style={{ width: '100%', padding: '8px 10px', fontSize: '13px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#fff' }}
            >
              <option value="All">All Types</option>
              <option value="Teaching">Teaching</option>
              <option value="Non-Teaching">Non-Teaching</option>
              <option value="Administrative">Administrative</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Select Employee</label>
            <select
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              style={{ width: '100%', padding: '8px 10px', fontSize: '13px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#fff', fontWeight: '600' }}
            >
              <option value="All">All Staff Combined</option>
              <option value="Ayup Tech">Ayup Tech (EMP-AT-2026)</option>
              <option value="Ayup Tech Senior Faculty">Ayup Tech Senior Faculty</option>
              <option value="Vikram Sharma">Vikram Sharma (EMP-2026-08)</option>
              {staffList.map(st => {
                const name = `${st.basicInfo?.firstName || ''} ${st.basicInfo?.lastName || ''}`.trim() || st.name || 'Staff';
                return (
                  <option key={st._id} value={name}>{name}</option>
                );
              })}
            </select>
          </div>

          <div>
            <button
              onClick={fetchLedger}
              style={{
                backgroundColor: '#159BD7',
                color: 'white',
                border: 'none',
                padding: '9px 20px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              <Eye size={16} /> Show Statement
            </button>
          </div>
        </div>
      </div>

      {/* Main Printable Statement Document */}
      <div className="printable-ledger-sheet" style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '30px', boxShadow: '0 4px 14px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
        
        {/* Formal Letterhead */}
        <div style={{ textAlign: 'center', borderBottom: '2px solid #159BD7', paddingBottom: '16px', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: '800', color: '#159BD7', margin: '0 0 4px 0', letterSpacing: '0.5px' }}>
            NOVAL INTERNATIONAL SCHOOL & AYUP TECH ACADEMY
          </h1>
          <p style={{ margin: '0 0 2px 0', fontSize: '12px', color: '#555' }}>
            Institutional Area, Knowledge Park, New Delhi - 110001 | Tel: +91 11 2345 6789
          </p>
          <div style={{ display: 'inline-block', backgroundColor: '#f1f5f9', padding: '4px 14px', borderRadius: '4px', fontSize: '12px', fontWeight: '700', color: '#334155', marginTop: '6px' }}>
            EMPLOYEE ADVANCE & LOAN LEDGER ACCOUNT
          </div>
        </div>

        {/* Statement Metadata & Employee Profile */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', backgroundColor: '#f8fafc', padding: '16px 20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>Account Holder / Staff:</div>
            <div style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
              {employeeName}
              {isAyup && (
                <span style={{ backgroundColor: '#e0f2fe', color: '#0284c7', fontSize: '11px', padding: '1px 6px', borderRadius: '4px', fontWeight: '700', border: '1px solid #7dd3fc' }}>
                  ★ Ayup Tech
                </span>
              )}
            </div>
            <div style={{ fontSize: '12.5px', color: '#64748b', marginTop: '4px' }}>
              Ref: <strong>{isAyup ? 'EMP-AT-2026' : 'STAFF-ADV-ACCT'}</strong> | Dept: <strong>Information Technology</strong>
            </div>
          </div>

          <div style={{ textAlign: 'right', fontSize: '12.5px', color: '#334155' }}>
            <div><strong>Statement Period:</strong> {new Date(fromDate).toLocaleDateString()} to {new Date(toDate).toLocaleDateString()}</div>
            <div style={{ marginTop: '4px' }}><strong>Currency:</strong> Indian Rupee (INR ₹)</div>
            <div style={{ marginTop: '4px', color: '#64748b' }}>Generated on: {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
          </div>
        </div>

        {/* Financial KPI Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
          <div style={{ backgroundColor: '#ffffff', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ArrowUpRight size={20} color="#ef4444" />
            </div>
            <div>
              <div style={{ fontSize: '11.5px', color: '#64748b', textTransform: 'uppercase', fontWeight: '600' }}>Total Advance Disbursed (Debit)</div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a' }}>
                ₹{(ledgerData.summary?.totalDebit || 0).toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: '#ffffff', padding: '14px', borderRadius: '8px', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ArrowDownLeft size={20} color="#16a34a" />
            </div>
            <div>
              <div style={{ fontSize: '11.5px', color: '#166534', textTransform: 'uppercase', fontWeight: '600' }}>Total Repaid (Credit)</div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#16a34a' }}>
                ₹{(ledgerData.summary?.totalCredit || 0).toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: '#ffffff', padding: '14px', borderRadius: '8px', border: '1px solid #fed7aa', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#fff7ed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DollarSign size={20} color="#ea580c" />
            </div>
            <div>
              <div style={{ fontSize: '11.5px', color: '#9a3412', textTransform: 'uppercase', fontWeight: '600' }}>Closing Balance Outstanding</div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#ea580c' }}>
                ₹{(ledgerData.summary?.currentOutstanding || 0).toLocaleString('en-IN')}
              </div>
            </div>
          </div>
        </div>

        {/* Chronological Statement Table */}
        <div style={{ overflowX: 'auto', marginBottom: '30px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '2px solid #cbd5e1', color: '#1e293b', fontWeight: '700' }}>
                <th style={{ padding: '10px 12px', width: '100px' }}>Date</th>
                <th style={{ padding: '10px 12px' }}>Transaction Type</th>
                <th style={{ padding: '10px 12px' }}>Narration & Description</th>
                <th style={{ padding: '10px 12px' }}>Payment Mode / Ref</th>
                <th style={{ padding: '10px 12px', textAlign: 'right', width: '110px' }}>Debit (₹)</th>
                <th style={{ padding: '10px 12px', textAlign: 'right', width: '110px' }}>Credit (₹)</th>
                <th style={{ padding: '10px 12px', textAlign: 'right', width: '120px' }}>Balance (₹)</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '36px', color: '#64748b' }}>
                    <RefreshCw size={18} className="animate-spin" style={{ display: 'inline', marginRight: '6px' }} /> Generating running balance ledger statement...
                  </td>
                </tr>
              ) : !ledgerData.ledger || ledgerData.ledger.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '36px', color: '#94a3b8' }}>
                    No advance transactions recorded for this employee during the selected period.
                  </td>
                </tr>
              ) : (
                ledgerData.ledger.map((tx, idx) => {
                  const isDebit = tx.debit > 0;
                  return (
                    <tr
                      key={idx}
                      style={{
                        borderBottom: '1px solid #e2e8f0',
                        backgroundColor: idx % 2 === 0 ? '#ffffff' : '#fcfcfd'
                      }}
                    >
                      <td style={{ padding: '10px 12px', whiteSpace: 'nowrap', color: '#475569' }}>
                        {new Date(tx.date).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '10px 12px' }}>
                        <span style={{
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: '700',
                          backgroundColor: isDebit ? '#fee2e2' : '#dcfce7',
                          color: isDebit ? '#b91c1c' : '#15803d',
                          border: `1px solid ${isDebit ? '#fca5a5' : '#86efac'}`
                        }}>
                          {tx.type}
                        </span>
                      </td>
                      <td style={{ padding: '10px 12px', color: '#1e293b' }}>
                        <div>{tx.narration}</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>A/c: {tx.accountName}</div>
                      </td>
                      <td style={{ padding: '10px 12px', color: '#475569', fontSize: '12px' }}>
                        <div>{tx.paymentMode}</div>
                        {tx.chequeNo && <div style={{ fontSize: '11px', color: '#94a3b8' }}>Ref: {tx.chequeNo}</div>}
                      </td>
                      <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: '600', color: isDebit ? '#b91c1c' : '#94a3b8' }}>
                        {tx.debit > 0 ? `₹${tx.debit.toLocaleString('en-IN')}` : '—'}
                      </td>
                      <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: '600', color: !isDebit ? '#15803d' : '#94a3b8' }}>
                        {tx.credit > 0 ? `₹${tx.credit.toLocaleString('en-IN')}` : '—'}
                      </td>
                      <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: '800', color: tx.balance > 0 ? '#ea580c' : '#16a34a' }}>
                        ₹{tx.balance.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
            <tfoot>
              <tr style={{ backgroundColor: '#f1f5f9', borderTop: '2px solid #cbd5e1', fontWeight: '800' }}>
                <td colSpan="4" style={{ padding: '12px', textAlign: 'right' }}>Total Debits & Credits:</td>
                <td style={{ padding: '12px', textAlign: 'right', color: '#b91c1c' }}>
                  ₹{(ledgerData.summary?.totalDebit || 0).toLocaleString('en-IN')}
                </td>
                <td style={{ padding: '12px', textAlign: 'right', color: '#15803d' }}>
                  ₹{(ledgerData.summary?.totalCredit || 0).toLocaleString('en-IN')}
                </td>
                <td style={{ padding: '12px', textAlign: 'right', color: '#ea580c', fontSize: '14px' }}>
                  ₹{(ledgerData.summary?.currentOutstanding || 0).toLocaleString('en-IN')}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Authorization Signatures */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #e2e8f0' }}>
          <div style={{ textAlign: 'left', width: '200px' }}>
            <div style={{ height: '35px', borderBottom: '1px solid #333', marginBottom: '4px' }}></div>
            <div style={{ fontWeight: 'bold', fontSize: '12px' }}>Staff Signature</div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>{employeeName}</div>
          </div>

          <div style={{ textAlign: 'left', width: '200px' }}>
            <div style={{ height: '35px', borderBottom: '1px solid #333', marginBottom: '4px' }}></div>
            <div style={{ fontWeight: 'bold', fontSize: '12px' }}>Payroll Accountant</div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>Accounts & Finance</div>
          </div>

          <div style={{ textAlign: 'left', width: '200px' }}>
            <div style={{ height: '35px', borderBottom: '1px solid #333', marginBottom: '4px' }}></div>
            <div style={{ fontWeight: 'bold', fontSize: '12px' }}>Audited & Approved By</div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>Administrative Officer</div>
          </div>
        </div>

      </div>

    </div>
  );
}
