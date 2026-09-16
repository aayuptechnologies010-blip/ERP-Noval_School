import React, { useState, useEffect } from 'react';
import { Eye, XCircle, Download, Printer, FileText, CheckCircle, Sparkles, X, DollarSign, Users, Hash } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function ChequeStatement() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [salaryAccounts, setSalaryAccounts] = useState([]);

  // Filters
  const [accountName, setAccountName] = useState('All');
  const [employeeType, setEmployeeType] = useState('All');
  const [bankName, setBankName] = useState('All');
  const [bankAccountNo, setBankAccountNo] = useState('');
  const [monthYear, setMonthYear] = useState('Aug-2026');
  const [statementGen, setStatementGen] = useState('Generated');
  const [chequeDate, setChequeDate] = useState('30-Aug-2026');
  const [searchTerm, setSearchTerm] = useState('');
  const [showPrintModal, setShowPrintModal] = useState(false);

  const token = localStorage.getItem('token');
  const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

  const fetchChequeStatement = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (monthYear && monthYear !== 'Select') params.append('monthYear', monthYear);
      if (accountName && accountName !== 'All') params.append('accountName', accountName);
      if (searchTerm) params.append('search', searchTerm);

      const res = await fetch(`${API_BASE}/api/salary-structure/cheque-statement?${params.toString()}`, { headers });
      if (res.ok) {
        const data = await res.json();
        setRecords(Array.isArray(data) ? data : []);
      }

      const aRes = await fetch(`${API_BASE}/api/salary-accounts`, { headers });
      if (aRes.ok) {
        const aData = await aRes.json();
        setSalaryAccounts(Array.isArray(aData) ? aData : []);
      }
    } catch (err) {
      console.error('Failed to load cheque statement:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchChequeStatement(); }, []);

  const handleReset = () => {
    setAccountName('All'); setEmployeeType('All'); setBankName('All');
    setBankAccountNo(''); setMonthYear('Aug-2026'); setStatementGen('Generated'); setSearchTerm('');
    fetchChequeStatement();
  };

  const filteredRecords = records.filter(r =>
    !searchTerm ||
    r.staffName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.employeeId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.chequeNo?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalNet = filteredRecords.reduce((sum, r) => sum + (Number(r.netSalary) || 0), 0);

  const exportCSV = () => {
    if (!filteredRecords.length) return;
    const hdrs = ['Sl No', 'Employee ID', 'Staff Name', 'Department', 'Designation', 'Bank Name', 'Account No', 'Cheque No', 'Cheque Date', 'Net Amount (INR)', 'Status'];
    const rows = filteredRecords.map((r, i) => [
      i + 1, `"${r.employeeId || ''}"`, `"${r.staffName || ''}"`,
      `"${r.department || ''}"`, `"${r.designation || ''}"`,
      `"${r.bankName || ''}"`, `"\t${r.bankAccountNo || ''}"`,
      `"${r.chequeNo || `CHQ-${i + 1001}`}"`, `"${chequeDate}"`,
      r.netSalary || 0, `"${r.status || 'Disbursed'}"`
    ]);
    const csv = 'data:text/csv;charset=utf-8,' + [hdrs.join(','), ...rows.map(e => e.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', `Cheque_Statement_${monthYear}.csv`);
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
  };

  return (
    <div className="global-settings-container" style={{ padding: '24px', background: '#f8fafc', minHeight: '100vh' }}>

      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Hash size={26} color="#159BD7" />
            Cheque Payment Statement
          </h2>
          <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '13px' }}>
            Staff salary cheque disbursement schedule — payment dates, cheque numbers, and net payable amounts.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => setShowPrintModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 18px', background: 'white', color: '#0f766e', border: '1px solid #14b8a6', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>
            <Printer size={16} /> Print Cheque Schedule
          </button>
          <button onClick={exportCSV} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 18px', background: '#159BD7', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      {/* FILTERS */}
      <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>

          {[
            { label: 'Account Name', el: <select value={accountName} onChange={e => setAccountName(e.target.value)} className="settings-input" style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
              <option value="All">All Salary Accounts</option>
              {salaryAccounts.map((a, i) => <option key={i} value={a.accountName || a.name}>{a.accountName || a.name}</option>)}
              <option value="Ayup Salary Account">Ayup Salary Account</option>
            </select> },
            { label: 'Employee Type', el: <select value={employeeType} onChange={e => setEmployeeType(e.target.value)} className="settings-input" style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
              <option value="All">All Staff Types (13)</option>
              <option value="Teaching">Teaching</option>
              <option value="Non-Teaching">Non-Teaching</option>
              <option value="Administrative">Administrative</option>
            </select> },
            { label: 'Bank Name', el: <select value={bankName} onChange={e => setBankName(e.target.value)} className="settings-input" style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
              <option value="All">All Banks</option>
              <option value="HDFC Bank">HDFC Bank</option>
              <option value="SBI">State Bank of India</option>
              <option value="ICICI Bank">ICICI Bank</option>
            </select> },
            { label: 'Bank A/C No', el: <input type="text" placeholder="e.g. 50100429188" value={bankAccountNo} onChange={e => setBankAccountNo(e.target.value)} className="settings-input" style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} /> },
            { label: 'Year-Month', el: <select value={monthYear} onChange={e => setMonthYear(e.target.value)} className="settings-input" style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
              <option value="Aug-2026">August - 2026</option>
              <option value="Jul-2026">July - 2026</option>
              <option value="Jun-2026">June - 2026</option>
            </select> },
            { label: 'Cheque Date', el: <input type="text" value={chequeDate} onChange={e => setChequeDate(e.target.value)} className="settings-input" style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} /> },
          ].map(({ label, el }, idx) => (
            <div key={idx} className="form-group">
              <label style={{ fontWeight: '600', fontSize: '12px', color: '#475569', display: 'block', marginBottom: '6px' }}>{label}</label>
              {el}
            </div>
          ))}

          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <label style={{ fontWeight: '600', fontSize: '12px', color: '#475569', display: 'block', marginBottom: '8px' }}>Statement Status</label>
            <div style={{ display: 'flex', gap: '16px', fontSize: '13px' }}>
              {['Generated', 'Non Generated'].map(v => (
                <label key={v} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <input type="radio" name="chqStatementGen" checked={statementGen === v} onChange={() => setStatementGen(v)} /> {v}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
          <button onClick={fetchChequeStatement} style={{ backgroundColor: '#159BD7', color: 'white', border: 'none', padding: '8px 24px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>
            <Eye size={16} /> View Statement
          </button>
          <button onClick={handleReset} style={{ backgroundColor: 'white', color: '#e69b00', border: '1px solid #ffbd59', padding: '8px 20px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>
            <XCircle size={16} /> Reset
          </button>
        </div>
      </div>

      {/* KPI CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {[
          { icon: <Users size={22} />, bg: '#eff6ff', color: '#159BD7', label: 'Cheque Beneficiaries', val: filteredRecords.length },
          { icon: <DollarSign size={22} />, bg: '#f0fdf4', color: '#16a34a', label: 'Total Cheque Amount', val: `₹${totalNet.toLocaleString('en-IN')}` },
          { icon: <Hash size={22} />, bg: '#fef3c7', color: '#d97706', label: 'Cheque Date', val: chequeDate },
          { icon: <CheckCircle size={22} />, bg: '#f1f5f9', color: '#475569', label: 'Statement Month', val: monthYear },
        ].map(({ icon, bg, color, label, val }, i) => (
          <div key={i} style={{ background: 'white', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '8px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>{icon}</div>
            <div>
              <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>{label}</div>
              <div style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>{val}</div>
            </div>
          </div>
        ))}
      </div>

      {/* TABLE */}
      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Cheque Payment Records ({filteredRecords.length})</div>
          <input type="text" placeholder="Search staff, cheque no..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={{ padding: '6px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', width: '260px' }} />
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading cheque payment records...</div>
        ) : filteredRecords.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>No cheque payment records found.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                  {['#', 'Staff Details', 'Department & Role', 'Bank Name', 'Account No', 'IFSC', 'Cheque No', 'Net Payable (₹)', 'Status'].map((h, i) => (
                    <th key={i} style={{ padding: '12px 16px', fontWeight: '600', textAlign: i === 7 ? 'right' : 'left' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((r, i) => {
                  const isAyup = r.staffName?.toLowerCase().includes('ayup');
                  return (
                    <tr key={r._id || i} style={{ borderBottom: '1px solid #f1f5f9', background: isAyup ? '#f0fdf4' : 'transparent' }}>
                      <td style={{ padding: '12px 16px', color: '#64748b' }}>{i + 1}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: '600', color: '#0f172a' }}>{r.staffName}</span>
                          {isAyup && <span style={{ background: '#16a34a', color: 'white', fontSize: '10px', padding: '2px 7px', borderRadius: '12px', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '3px' }}><Sparkles size={10} /> Ayup Tech</span>}
                        </div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>ID: {r.employeeId || 'EMP-001'}</div>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ color: '#334155' }}>{r.department || 'Academics'}</div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>{r.designation || r.staffType}</div>
                      </td>
                      <td style={{ padding: '12px 16px', fontWeight: '500', color: '#334155' }}>{r.bankName || 'HDFC Bank'}</td>
                      <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontWeight: '600', color: '#1e293b' }}>{r.bankAccountNo || '50100429188'}</td>
                      <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#475569' }}>{r.ifscCode || 'HDFC0001234'}</td>
                      <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#7c3aed', fontWeight: '600' }}>{r.chequeNo || `CHQ-${monthYear.replace('-', '')}-${i + 1001}`}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '700', color: '#16a34a' }}>₹{(r.netSalary || 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ background: '#ecfdf5', color: '#059669', padding: '3px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <CheckCircle size={12} /> Disbursed
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr style={{ background: '#f8fafc', borderTop: '2px solid #cbd5e1', fontWeight: '700' }}>
                  <td colSpan={7} style={{ padding: '14px 16px', color: '#1e293b' }}>Total Cheque Disbursement ({filteredRecords.length} Staff):</td>
                  <td style={{ padding: '14px 16px', textAlign: 'right', color: '#16a34a', fontSize: '15px' }}>₹{totalNet.toLocaleString('en-IN')}</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>

      {/* PRINT MODAL */}
      {showPrintModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
          <div style={{ background: 'white', borderRadius: '12px', width: '100%', maxWidth: '750px', maxHeight: '90vh', overflowY: 'auto', padding: '30px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #e2e8f0', paddingBottom: '16px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FileText size={24} color="#159BD7" />
                <h3 style={{ margin: 0, color: '#0f172a', fontSize: '18px' }}>Cheque Payment Disbursement Schedule</h3>
              </div>
              <button onClick={() => setShowPrintModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><X size={20} /></button>
            </div>
            <div style={{ border: '1px solid #e2e8f0', padding: '24px', borderRadius: '8px' }}>
              <div style={{ textAlign: 'center', borderBottom: '1px solid #cbd5e1', paddingBottom: '14px', marginBottom: '16px' }}>
                <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#1e293b' }}>NOVAL INTERNATIONAL ACADEMY</h2>
                <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '12px' }}>Staff Cheque Payment Schedule — {monthYear}</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '13px', color: '#334155' }}>
                <div><strong>Date:</strong> {chequeDate}</div>
                <div><strong>Month:</strong> {monthYear} | <strong>Total Beneficiaries:</strong> {filteredRecords.length}</div>
              </div>
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '6px', overflow: 'hidden', margin: '16px 0' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                  <thead><tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    {['#', 'Staff Name', 'Account No.', 'Cheque No.', 'Net Amount (₹)'].map((h, i) => <th key={i} style={{ padding: '8px 12px', textAlign: i === 4 ? 'right' : 'left', fontWeight: '600' }}>{h}</th>)}
                  </tr></thead>
                  <tbody>
                    {filteredRecords.slice(0, 8).map((r, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '8px 12px' }}>{idx + 1}</td>
                        <td style={{ padding: '8px 12px' }}>{r.staffName}</td>
                        <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>{r.bankAccountNo}</td>
                        <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>{r.chequeNo || `CHQ-${idx + 1001}`}</td>
                        <td style={{ padding: '8px 12px', textAlign: 'right', fontWeight: '600' }}>₹{(r.netSalary || 0).toLocaleString('en-IN')}</td>
                      </tr>
                    ))}
                    {filteredRecords.length > 8 && <tr><td colSpan={5} style={{ padding: '8px 12px', textAlign: 'center', color: '#64748b', fontStyle: 'italic' }}>...and {filteredRecords.length - 8} more as per attached annexure.</td></tr>}
                  </tbody>
                  <tfoot><tr style={{ background: '#f8fafc', borderTop: '2px solid #cbd5e1', fontWeight: '700' }}>
                    <td colSpan={4} style={{ padding: '8px 12px' }}>Grand Total:</td>
                    <td style={{ padding: '8px 12px', textAlign: 'right', color: '#16a34a' }}>₹{totalNet.toLocaleString('en-IN')}</td>
                  </tr></tfoot>
                </table>
              </div>
              <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between', paddingTop: '20px', borderTop: '1px dashed #cbd5e1' }}>
                {['Payroll Officer', 'Accounts Head', 'Principal / Signatory'].map((s, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{ borderBottom: '1px solid #64748b', width: '120px', marginBottom: '6px' }}></div>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#334155' }}>{s}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button onClick={() => window.print()} style={{ background: '#159BD7', color: 'white', border: 'none', padding: '9px 20px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}><Printer size={16} /> Print Schedule</button>
              <button onClick={() => setShowPrintModal(false)} style={{ background: '#f1f5f9', color: '#475569', border: 'none', padding: '9px 18px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
