import React, { useState, useEffect } from 'react';
import {
  Eye, Download, Printer, Search, RefreshCw, CheckCircle,
  AlertCircle, Sparkles, Building, DollarSign, Users, FileText,
  ChevronLeft, ChevronRight, Check, X
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function BankStatementReport() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Filters matching mockup
  const [schoolName, setSchoolName] = useState('NAVALS NATIONAL ACADEMY');
  const [salaryMonth, setSalaryMonth] = useState('Aug-2026');
  const [schoolBank, setSchoolBank] = useState('All School Banks');
  const [bankName, setBankName] = useState('All Banks');
  const [salaryCheque, setSalaryCheque] = useState('All Cheques');
  const [salaryFormat, setSalaryFormat] = useState('Standard Corporate NEFT/RTGS');
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

  const fetchBankReport = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (salaryMonth && salaryMonth !== 'Select Month') params.append('monthYear', salaryMonth);
      if (bankName && bankName !== 'All Banks' && bankName !== 'Select Bank') params.append('bankName', bankName);
      if (searchTerm) params.append('search', searchTerm);

      const res = await fetch(`${API_BASE}/api/salary-structure/bank-statement?${params.toString()}`, { headers });
      if (res.ok) {
        const data = await res.json();
        setRecords(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error('Failed to load bank statement report:', err);
      showNotif('error', 'Error loading bank statement records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBankReport();
  }, []);

  const exportCSV = () => {
    if (!filteredRecords.length) return;
    const hdrs = ['#', 'Beneficiary ID', 'Beneficiary Name', 'Bank Name', 'Account Number', 'IFSC Code', 'Payment Mode', 'Transfer Amount', 'Advice Ref', 'Status'];
    const rows = filteredRecords.map((r, i) => [
      i + 1,
      `"${r.employeeId || ''}"`,
      `"${r.staffName || ''}"`,
      `"${r.bankName || ''}"`,
      `"${r.bankAccountNo || ''}"`,
      `"${r.ifscCode || ''}"`,
      `"${r.paymentMode || ''}"`,
      r.netSalary || 0,
      `"${r.bankAdviceRef || ''}"`,
      `"${r.status || ''}"`
    ]);
    const csv = 'data:text/csv;charset=utf-8,' + [hdrs.join(','), ...rows.map(r => r.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', `Bank_Statement_Report_${salaryMonth}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredRecords = records.filter(r => {
    if (bankName !== 'All Banks' && bankName !== 'Select Bank' && r.bankName !== bankName) return false;
    if (salaryCheque !== 'All Cheques' && salaryCheque !== 'Select Cheque' && r.chequeNo !== salaryCheque) return false;
    if (!searchTerm) return true;
    const s = searchTerm.toLowerCase();
    return (
      (r.staffName && r.staffName.toLowerCase().includes(s)) ||
      (r.employeeId && r.employeeId.toLowerCase().includes(s)) ||
      (r.bankAccountNo && r.bankAccountNo.toLowerCase().includes(s))
    );
  });

  const totalTransfer = filteredRecords.reduce((s, r) => s + (r.netSalary || 0), 0);

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 120px)', backgroundColor: '#f8fafc', overflow: 'hidden' }}>

      {/* NOTIFICATION */}
      {statusMsg && (
        <div style={{
          position: 'fixed', top: '20px', right: '20px', zIndex: 9999,
          padding: '12px 20px', borderRadius: '8px', display: 'flex',
          alignItems: 'center', gap: '10px', fontWeight: '600', fontSize: '13px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          background: statusMsg.type === 'success' ? '#ecfdf5' : '#fef2f2',
          color: statusMsg.type === 'success' ? '#065f46' : '#991b1b',
          border: `1px solid ${statusMsg.type === 'success' ? '#6ee7b7' : '#fca5a5'}`
        }}>
          {statusMsg.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />} {statusMsg.text}
        </div>
      )}

      {/* LEFT FILTER SIDEBAR */}
      {isSidebarOpen && (
        <div style={{
          width: '320px', backgroundColor: 'white', padding: '24px',
          borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column',
          gap: '18px', overflowY: 'auto', flexShrink: 0, boxShadow: '2px 0 8px rgba(0,0,0,0.02)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#1e293b' }}>
              Bank Report Filter
            </h3>
            <span style={{ fontSize: '11px', color: '#64748b', background: '#f1f5f9', padding: '2px 8px', borderRadius: '10px' }}>Payroll Master</span>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>School Name</label>
            <select
              value={schoolName}
              onChange={e => setSchoolName(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: 'white' }}
            >
              <option value="NAVALS NATIONAL ACADEMY">NAVALS NATIONAL ACADEMY</option>
              <option value="AYUP TECH MEMORIAL CAMPUS">AYUP TECH MEMORIAL CAMPUS</option>
            </select>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Salary Month</label>
            <select
              value={salaryMonth}
              onChange={e => setSalaryMonth(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: 'white' }}
            >
              <option value="Aug-2026">Aug-2026</option>
              <option value="Jul-2026">Jul-2026</option>
              <option value="Jun-2026">Jun-2026</option>
            </select>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>School Bank</label>
            <select
              value={schoolBank}
              onChange={e => setSchoolBank(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: 'white' }}
            >
              <option value="All School Banks">All School Banks</option>
              <option value="HDFC Bank - 50100429188">HDFC Bank - 50100429188</option>
              <option value="SBI Bank - 30219847120">SBI Bank - 30219847120</option>
            </select>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Bank Name</label>
            <select
              value={bankName}
              onChange={e => setBankName(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: 'white' }}
            >
              <option value="All Banks">All Banks</option>
              <option value="HDFC Bank">HDFC Bank</option>
              <option value="State Bank of India">State Bank of India</option>
              <option value="ICICI Bank">ICICI Bank</option>
              <option value="Punjab National Bank">Punjab National Bank</option>
            </select>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Salary Cheque</label>
            <select
              value={salaryCheque}
              onChange={e => setSalaryCheque(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: 'white' }}
            >
              <option value="All Cheques">All Cheques</option>
              <option value="CHQ-HDFC-99101">CHQ-HDFC-99101</option>
              <option value="CHQ-SBI-44201">CHQ-SBI-44201</option>
            </select>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Salary Format</label>
            <select
              value={salaryFormat}
              onChange={e => setSalaryFormat(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: 'white' }}
            >
              <option value="Standard Corporate NEFT/RTGS">Standard Corporate NEFT/RTGS</option>
              <option value="Direct Debit Advice Letter">Direct Debit Advice Letter</option>
              <option value="Bank Corporate Text File">Bank Corporate Text File</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button
              onClick={fetchBankReport}
              style={{
                flex: 1, backgroundColor: '#159BD7', color: 'white', border: 'none',
                padding: '10px 18px', borderRadius: '6px', display: 'flex',
                alignItems: 'center', justifyContent: 'center', gap: '6px',
                cursor: 'pointer', fontWeight: '600', fontSize: '13px',
                boxShadow: '0 2px 6px rgba(21, 155, 215, 0.3)'
              }}
            >
              <Eye size={16} /> Show
            </button>
            <button
              onClick={() => {
                setBankName('All Banks');
                setSalaryCheque('All Cheques');
                setSearchTerm('');
                fetchBankReport();
              }}
              style={{
                backgroundColor: 'white', color: '#64748b', border: '1px solid #cbd5e1',
                padding: '10px 16px', borderRadius: '6px', cursor: 'pointer',
                fontWeight: '600', fontSize: '13px'
              }}
            >
              Reset
            </button>
          </div>
        </div>
      )}

      {/* COLLAPSIBLE TOGGLE BUTTON */}
      <div style={{ position: 'relative', width: '0px' }}>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          style={{
            position: 'absolute', top: '24px', left: '-12px', width: '24px', height: '44px',
            backgroundColor: 'white', border: '1px solid #cbd5e1', borderRadius: '4px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', zIndex: 100, boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
          }}
          title={isSidebarOpen ? "Collapse Filter" : "Expand Filter"}
        >
          {isSidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>

      {/* RIGHT REPORT AREA */}
      <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* REPORT BANNER & ACTIONS */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '20px 24px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#159BD7', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {schoolName} • CORPORATE DISBURSEMENT
            </div>
            <h2 style={{ margin: '4px 0 0', fontSize: '20px', fontWeight: '700', color: '#0f172a' }}>
              Bank Statement Advice Report ({salaryMonth})
            </h2>
            <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#64748b' }}>
              Format: <strong>{salaryFormat}</strong> • Primary School A/c: <strong>{schoolBank}</strong>
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={exportCSV}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 18px',
                background: '#159BD7', color: 'white', border: 'none', borderRadius: '6px',
                fontWeight: '600', cursor: 'pointer', fontSize: '13px'
              }}
            >
              <Download size={16} /> Export Bank CSV
            </button>
            <button
              onClick={handlePrint}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 18px',
                background: 'white', color: '#334155', border: '1px solid #cbd5e1', borderRadius: '6px',
                fontWeight: '600', cursor: 'pointer', fontSize: '13px'
              }}
            >
              <Printer size={16} /> Print Advice
            </button>
          </div>
        </div>

        {/* FINANCIAL SUMMARY CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {[
            { label: 'Beneficiary Count', val: filteredRecords.length, icon: <Users size={20} color="#159BD7" />, bg: '#eff6ff' },
            { label: 'Total Transfer Sum', val: `₹${totalTransfer.toLocaleString('en-IN')}`, icon: <DollarSign size={20} color="#16a34a" />, bg: '#f0fdf4' },
            { label: 'Selected Bank', val: bankName === 'All Banks' ? 'Multi-Bank (4 Banks)' : bankName, icon: <Building size={20} color="#d97706" />, bg: '#fef3c7' },
            { label: 'Payment Mode', val: 'Electronic NEFT/RTGS', icon: <CheckCircle size={20} color="#9333ea" />, bg: '#fdf4ff' }
          ].map((c, i) => (
            <div key={i} style={{ background: 'white', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {c.icon}
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '500' }}>{c.label}</div>
                <div style={{ fontSize: '17px', fontWeight: '700', color: '#0f172a' }}>{c.val}</div>
              </div>
            </div>
          ))}
        </div>

        {/* BANK ADVICE MEMORANDUM */}
        <div style={{ background: '#f8fafc', padding: '14px 20px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', color: '#475569', lineHeight: '1.6' }}>
          <strong>To: The Branch Manager, Corporate Banking Division</strong><br />
          Please debit our School Collection / Disbursement Account and credit the under-mentioned staff beneficiary accounts towards monthly net salary for the month of <strong>{salaryMonth}</strong>.
        </div>

        {/* BANK STATEMENT DATA TABLE */}
        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>
              Beneficiary Credit Schedule ({filteredRecords.length} Employees)
            </div>
            <div style={{ position: 'relative', width: '260px' }}>
              <Search size={15} style={{ position: 'absolute', left: '10px', top: '9px', color: '#94a3b8' }} />
              <input
                type="text"
                placeholder="Filter beneficiary, ID or account..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '7px 12px 7px 32px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading bank statement report...</div>
          ) : filteredRecords.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>No bank statement records found for the selected filters.</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                    {['#', 'Beneficiary Details', 'Bank Name', 'Account Number', 'IFSC Code', 'Cheque / Ref No.', 'Gross Amount', 'Deductions', 'Transfer Net (₹)', 'Status'].map((h, i) => (
                      <th key={i} style={{ padding: '12px 14px', fontWeight: '600', textAlign: ['Gross Amount', 'Deductions', 'Transfer Net (₹)'].includes(h) ? 'right' : 'left' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((r, i) => {
                    const isAyup = r.staffName?.toLowerCase().includes('ayup');
                    return (
                      <tr key={r._id || i} style={{ borderBottom: '1px solid #f1f5f9', background: isAyup ? '#fffbeb' : 'transparent' }}>
                        <td style={{ padding: '12px 14px', color: '#64748b' }}>{i + 1}</td>
                        <td style={{ padding: '12px 14px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontWeight: '600', color: '#0f172a' }}>{r.staffName}</span>
                            {isAyup && (
                              <span style={{ background: '#d97706', color: 'white', fontSize: '10px', padding: '2px 7px', borderRadius: '12px', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                                <Sparkles size={10} /> Ayup Tech
                              </span>
                            )}
                          </div>
                          <div style={{ fontSize: '11px', color: '#64748b' }}>ID: {r.employeeId} | {r.department}</div>
                        </td>
                        <td style={{ padding: '12px 14px', color: '#334155', fontWeight: '500' }}>
                          {r.bankName || 'HDFC Bank'}
                        </td>
                        <td style={{ padding: '12px 14px', fontFamily: 'monospace', color: '#0f172a', fontWeight: '600' }}>
                          {r.bankAccountNo || '50100429188'}
                        </td>
                        <td style={{ padding: '12px 14px', fontFamily: 'monospace', color: '#475569' }}>
                          {r.ifscCode || 'HDFC0001234'}
                        </td>
                        <td style={{ padding: '12px 14px', color: '#64748b', fontSize: '12px' }}>
                          {r.chequeNo || r.bankAdviceRef || 'NEFT-AUG-01'}
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', color: '#334155' }}>
                          ₹{(r.grossSalary || 0).toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', color: '#e11d48' }}>
                          -₹{(r.totalDeductions || 0).toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: '700', color: '#16a34a', fontSize: '14px' }}>
                          ₹{(r.netSalary || 0).toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '12px 14px' }}>
                          <span style={{ background: '#ecfdf5', color: '#059669', padding: '3px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: '600' }}>
                            {r.status || 'Generated'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr style={{ background: '#f8fafc', fontWeight: '700', borderTop: '2px solid #cbd5e1' }}>
                    <td colSpan={8} style={{ padding: '14px', textAlign: 'right', color: '#0f172a' }}>Total Bank Net Transfer Payout:</td>
                    <td style={{ padding: '14px', textAlign: 'right', color: '#16a34a', fontSize: '16px' }}>₹{totalTransfer.toLocaleString('en-IN')}</td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
