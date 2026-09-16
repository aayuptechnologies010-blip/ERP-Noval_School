import React, { useState, useEffect } from 'react';
import { Eye, XCircle, Download, Printer, Building2, CreditCard, Users, DollarSign, CheckCircle, Sparkles, X, FileText } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function BankStatement() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [salaryAccounts, setSalaryAccounts] = useState([]);

  // Form Filters
  const [accountName, setAccountName] = useState('All');
  const [employeeType, setEmployeeType] = useState('All');
  const [bankName, setBankName] = useState('All');
  const [bankAccountNo, setBankAccountNo] = useState('');
  const [monthYear, setMonthYear] = useState('Aug-2026');
  const [statementGen, setStatementGen] = useState('Generated');
  const [chequeDate, setChequeDate] = useState('30-Aug-2026');
  const [chequeNo, setChequeNo] = useState('CHQ-890214');
  const [searchTerm, setSearchTerm] = useState('');

  // Print Advice Modal
  const [showAdviceModal, setShowAdviceModal] = useState(false);

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  const fetchBankStatement = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (monthYear && monthYear !== 'Select') params.append('monthYear', monthYear);
      if (accountName && accountName !== 'All') params.append('accountName', accountName);
      if (employeeType && employeeType !== 'All') params.append('employeeType', employeeType);
      if (bankName && bankName !== 'All') params.append('bankName', bankName);
      if (bankAccountNo) params.append('search', bankAccountNo);

      const res = await fetch(`${API_BASE}/api/salary-structure/bank-statement?${params.toString()}`, { headers });
      if (res.ok) {
        const data = await res.json();
        setRecords(Array.isArray(data) ? data : []);
      }

      // Fetch accounts for dropdown
      const aRes = await fetch(`${API_BASE}/api/salary-accounts`, { headers });
      if (aRes.ok) {
        const aData = await aRes.json();
        setSalaryAccounts(Array.isArray(aData) ? aData : []);
      }
    } catch (err) {
      console.error('Failed to load bank statement:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBankStatement();
  }, []);

  const handleReset = () => {
    setAccountName('All');
    setEmployeeType('All');
    setBankName('All');
    setBankAccountNo('');
    setMonthYear('Aug-2026');
    setStatementGen('Generated');
    setSearchTerm('');
    fetchBankStatement();
  };

  // Filter records by search term
  const filteredRecords = records.filter(r => {
    const matchesSearch = !searchTerm ||
      r.staffName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.employeeId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.bankAccountNo?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const totalNet = filteredRecords.reduce((sum, r) => sum + (Number(r.netSalary) || 0), 0);
  const totalStaff = filteredRecords.length;

  const exportCSV = () => {
    if (filteredRecords.length === 0) return;
    const headersCsv = ['Sl No', 'Employee ID', 'Staff Name', 'Department', 'Designation', 'Bank Name', 'Bank A/C No', 'IFSC Code', 'Net Salary (INR)', 'Payment Mode', 'Bank Advice Ref', 'Status'];
    const rows = filteredRecords.map((r, i) => [
      i + 1,
      `"${r.employeeId || ''}"`,
      `"${r.staffName || ''}"`,
      `"${r.department || ''}"`,
      `"${r.designation || ''}"`,
      `"${r.bankName || ''}"`,
      `"\t${r.bankAccountNo || ''}"`,
      `"${r.ifscCode || ''}"`,
      r.netSalary || 0,
      `"${r.paymentMode || ''}"`,
      `"${r.bankAdviceRef || ''}"`,
      `"${r.status || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headersCsv.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Bank_Statement_${monthYear}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="global-settings-container" style={{ padding: '24px', background: '#f8fafc', minHeight: '100vh' }}>
      
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Building2 size={26} color="#159BD7" />
            Bank Statement & Salary Transfer Advice
          </h2>
          <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '13px' }}>
            Generate official bank electronic payment schedules and direct account credit statements.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            onClick={() => setShowAdviceModal(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '9px 18px', background: 'white', color: '#0f766e',
              border: '1px solid #14b8a6', borderRadius: '6px', fontWeight: '600', cursor: 'pointer',
              fontSize: '13px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}
          >
            <Printer size={16} /> Print Bank Advice Letter
          </button>
          <button
            onClick={exportCSV}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '9px 18px', background: '#159BD7', color: 'white',
              border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer',
              fontSize: '13px', boxShadow: '0 2px 4px rgba(21, 155, 215, 0.25)'
            }}
          >
            <Download size={16} /> Export Disbursal CSV
          </button>
        </div>
      </div>

      {/* FILTER PANEL */}
      <div style={{
        background: 'white', borderRadius: '12px', padding: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0', marginBottom: '24px'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '16px' }}>
          
          <div className="form-group">
            <label style={{ fontWeight: '600', fontSize: '12px', color: '#475569', display: 'block', marginBottom: '6px' }}>
              Account Name
            </label>
            <select
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className="settings-input"
              style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            >
              <option value="All">All Salary Accounts</option>
              {salaryAccounts.map((acc, idx) => (
                <option key={idx} value={acc.accountName || acc.name}>{acc.accountName || acc.name}</option>
              ))}
              <option value="Ayup Salary Account">Ayup Salary Account</option>
            </select>
          </div>

          <div className="form-group">
            <label style={{ fontWeight: '600', fontSize: '12px', color: '#475569', display: 'block', marginBottom: '6px' }}>
              Employee Type
            </label>
            <select
              value={employeeType}
              onChange={(e) => setEmployeeType(e.target.value)}
              className="settings-input"
              style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            >
              <option value="All">All Staff Types (13)</option>
              <option value="Teaching">Teaching Faculty</option>
              <option value="Non-Teaching">Non-Teaching Staff</option>
              <option value="Administrative">Administrative Staff</option>
              <option value="Support">Support Staff</option>
            </select>
          </div>

          <div className="form-group">
            <label style={{ fontWeight: '600', fontSize: '12px', color: '#475569', display: 'block', marginBottom: '6px' }}>
              Bank Name
            </label>
            <select
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="settings-input"
              style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            >
              <option value="All">All Disbursal Banks</option>
              <option value="HDFC Bank">HDFC Bank</option>
              <option value="State Bank of India">State Bank of India</option>
              <option value="ICICI Bank">ICICI Bank</option>
              <option value="Punjab National Bank">Punjab National Bank</option>
              <option value="Axis Bank">Axis Bank</option>
            </select>
          </div>

          <div className="form-group">
            <label style={{ fontWeight: '600', fontSize: '12px', color: '#475569', display: 'block', marginBottom: '6px' }}>
              Bank A/C No (Search)
            </label>
            <input
              type="text"
              placeholder="e.g. 50100429188..."
              value={bankAccountNo}
              onChange={(e) => setBankAccountNo(e.target.value)}
              className="settings-input"
              style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            />
          </div>

          <div className="form-group">
            <label style={{ fontWeight: '600', fontSize: '12px', color: '#475569', display: 'block', marginBottom: '6px' }}>
              Salary Month-Year
            </label>
            <select
              value={monthYear}
              onChange={(e) => setMonthYear(e.target.value)}
              className="settings-input"
              style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            >
              <option value="Aug-2026">August - 2026</option>
              <option value="Jul-2026">July - 2026</option>
              <option value="Jun-2026">June - 2026</option>
              <option value="May-2026">May - 2026</option>
            </select>
          </div>

          <div className="form-group">
            <label style={{ fontWeight: '600', fontSize: '12px', color: '#475569', display: 'block', marginBottom: '6px' }}>
              Cheque Date
            </label>
            <input
              type="text"
              value={chequeDate}
              onChange={(e) => setChequeDate(e.target.value)}
              className="settings-input"
              style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            />
          </div>

          <div className="form-group">
            <label style={{ fontWeight: '600', fontSize: '12px', color: '#475569', display: 'block', marginBottom: '6px' }}>
              Cheque / Batch Ref No
            </label>
            <input
              type="text"
              value={chequeNo}
              onChange={(e) => setChequeNo(e.target.value)}
              className="settings-input"
              style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            />
          </div>

          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <label style={{ fontWeight: '600', fontSize: '12px', color: '#475569', display: 'block', marginBottom: '8px' }}>
              Statement Status
            </label>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', fontSize: '13px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="statementGen"
                  checked={statementGen === 'Generated'}
                  onChange={() => setStatementGen('Generated')}
                />
                Generated
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="statementGen"
                  checked={statementGen === 'Non Generated'}
                  onChange={() => setStatementGen('Non Generated')}
                />
                Non Generated
              </label>
            </div>
          </div>

        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
          <button
            onClick={fetchBankStatement}
            style={{
              backgroundColor: '#159BD7', color: 'white', border: 'none',
              padding: '8px 24px', borderRadius: '6px', display: 'flex', alignItems: 'center',
              gap: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px'
            }}
          >
            <Eye size={16} /> View Statement
          </button>
          <button
            onClick={handleReset}
            style={{
              backgroundColor: 'white', color: '#e69b00', border: '1px solid #ffbd59',
              padding: '8px 20px', borderRadius: '6px', display: 'flex', alignItems: 'center',
              gap: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px'
            }}
          >
            <XCircle size={16} /> Reset
          </button>
        </div>
      </div>

      {/* KPI METRICS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: 'white', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '8px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#159BD7' }}>
            <Users size={22} />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Employees in Batch</div>
            <div style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a' }}>{totalStaff}</div>
          </div>
        </div>

        <div style={{ background: 'white', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '8px', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a' }}>
            <DollarSign size={22} />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Total Disbursal Net</div>
            <div style={{ fontSize: '20px', fontWeight: '700', color: '#16a34a' }}>₹{totalNet.toLocaleString('en-IN')}</div>
          </div>
        </div>

        <div style={{ background: 'white', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '8px', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706' }}>
            <CreditCard size={22} />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Batch Advice Reference</div>
            <div style={{ fontSize: '15px', fontWeight: '700', color: '#92400e' }}>{chequeNo}</div>
          </div>
        </div>

        <div style={{ background: 'white', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '8px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569' }}>
            <CheckCircle size={22} />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Statement Month</div>
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#334155' }}>{monthYear}</div>
          </div>
        </div>
      </div>

      {/* TABLE CONTAINER */}
      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', overflow: 'hidden' }}>
        
        {/* Table Search Toolbar */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>
            Bank Credit Records ({filteredRecords.length})
          </div>
          <input
            type="text"
            placeholder="Search staff, account, employee ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '6px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', width: '280px' }}
          />
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
            Loading bank transfer records...
          </div>
        ) : filteredRecords.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
            No bank transfer records found for the selected criteria.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                  <th style={{ padding: '12px 16px', fontWeight: '600' }}>#</th>
                  <th style={{ padding: '12px 16px', fontWeight: '600' }}>Staff Details</th>
                  <th style={{ padding: '12px 16px', fontWeight: '600' }}>Department & Role</th>
                  <th style={{ padding: '12px 16px', fontWeight: '600' }}>Bank Name</th>
                  <th style={{ padding: '12px 16px', fontWeight: '600' }}>Bank A/C No.</th>
                  <th style={{ padding: '12px 16px', fontWeight: '600' }}>IFSC Code</th>
                  <th style={{ padding: '12px 16px', fontWeight: '600' }}>Payment Mode</th>
                  <th style={{ padding: '12px 16px', fontWeight: '600', textAlign: 'right' }}>Net Payable (₹)</th>
                  <th style={{ padding: '12px 16px', fontWeight: '600' }}>Advice Ref</th>
                  <th style={{ padding: '12px 16px', fontWeight: '600' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((r, i) => {
                  const isAyup = r.staffName?.toLowerCase().includes('ayup');
                  return (
                    <tr
                      key={r._id || i}
                      style={{
                        borderBottom: '1px solid #f1f5f9',
                        background: isAyup ? '#f0fdf4' : 'transparent',
                        transition: 'background 0.15s'
                      }}
                    >
                      <td style={{ padding: '12px 16px', color: '#64748b' }}>{i + 1}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: '600', color: '#0f172a' }}>{r.staffName}</span>
                          {isAyup && (
                            <span style={{
                              display: 'inline-flex', alignItems: 'center', gap: '3px',
                              background: '#16a34a', color: 'white', fontSize: '10px',
                              padding: '2px 7px', borderRadius: '12px', fontWeight: '600'
                            }}>
                              <Sparkles size={10} /> Ayup Tech
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>ID: {r.employeeId || 'EMP-001'}</div>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ color: '#334155' }}>{r.department || 'General'}</div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>{r.designation || r.staffType}</div>
                      </td>
                      <td style={{ padding: '12px 16px', color: '#334155', fontWeight: '500' }}>{r.bankName || 'HDFC Bank'}</td>
                      <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontWeight: '600', color: '#1e293b' }}>
                        {r.bankAccountNo || '50100429188'}
                      </td>
                      <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#475569' }}>
                        {r.ifscCode || 'HDFC0001234'}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ background: '#f1f5f9', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', color: '#475569' }}>
                          {r.paymentMode || 'NEFT / RTGS'}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '700', color: '#16a34a' }}>
                        ₹{(Number(r.netSalary) || 0).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: '11px', color: '#64748b' }}>
                        {r.bankAdviceRef || `ADV-${r.monthYear || '2026'}-${i + 101}`}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: '4px',
                          background: '#ecfdf5', color: '#059669',
                          padding: '3px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: '600'
                        }}>
                          <CheckCircle size={12} /> Ready
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr style={{ background: '#f8fafc', borderTop: '2px solid #cbd5e1', fontWeight: '700' }}>
                  <td colSpan={7} style={{ padding: '14px 16px', color: '#1e293b' }}>
                    Total Batch Net Disbursal Amount ({filteredRecords.length} Staff):
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right', color: '#16a34a', fontSize: '15px' }}>
                    ₹{totalNet.toLocaleString('en-IN')}
                  </td>
                  <td colSpan={2}></td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>

      {/* BANK ADVICE LETTER MODAL */}
      {showAdviceModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px'
        }}>
          <div style={{
            background: 'white', borderRadius: '12px', width: '100%', maxWidth: '750px',
            maxHeight: '90vh', overflowY: 'auto', padding: '30px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #e2e8f0', paddingBottom: '16px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FileText size={24} color="#159BD7" />
                <h3 style={{ margin: 0, color: '#0f172a', fontSize: '18px' }}>Official Bank Transfer Advice Letter</h3>
              </div>
              <button
                onClick={() => setShowAdviceModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Letterhead Body */}
            <div style={{ border: '1px solid #e2e8f0', padding: '24px', borderRadius: '8px', background: '#fff' }}>
              <div style={{ textAlign: 'center', borderBottom: '1px solid #cbd5e1', paddingBottom: '14px', marginBottom: '16px' }}>
                <h2 style={{ margin: 0, color: '#1e293b', fontSize: '20px', fontWeight: '800' }}>NOVAL INTERNATIONAL ACADEMY</h2>
                <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '12px' }}>Affiliated to CBSE, New Delhi | Payroll & Disbursal Treasury</p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '13px', color: '#334155' }}>
                <div>
                  <strong>To:</strong><br />
                  The Branch Manager<br />
                  HDFC Bank Ltd, Main Branch<br />
                  Institutional Area
                </div>
                <div style={{ textAlign: 'right' }}>
                  <strong>Date:</strong> {chequeDate}<br />
                  <strong>Ref:</strong> {chequeNo}<br />
                  <strong>Month:</strong> {monthYear}
                </div>
              </div>

              <p style={{ fontSize: '13px', color: '#334155', lineHeight: '1.6' }}>
                <strong>Subject:</strong> Electronic credit of staff salary for the month of <strong>{monthYear}</strong>.
              </p>

              <p style={{ fontSize: '13px', color: '#334155', lineHeight: '1.6' }}>
                Dear Sir/Madam,<br />
                Please debit our School Salary Disbursal Account No. <strong>50100429188</strong> with the sum of <strong>₹{totalNet.toLocaleString('en-IN')}</strong> and credit the respective savings/current accounts of our <strong>{totalStaff} employees</strong> as per the schedule attached below.
              </p>

              {/* Mini Summary table */}
              <div style={{ margin: '16px 0', border: '1px solid #e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                      <th style={{ padding: '8px 12px', textAlign: 'left' }}>Staff Name</th>
                      <th style={{ padding: '8px 12px', textAlign: 'left' }}>Account No</th>
                      <th style={{ padding: '8px 12px', textAlign: 'left' }}>IFSC</th>
                      <th style={{ padding: '8px 12px', textAlign: 'right' }}>Net (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRecords.slice(0, 5).map((r, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '8px 12px' }}>{r.staffName}</td>
                        <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>{r.bankAccountNo}</td>
                        <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>{r.ifscCode}</td>
                        <td style={{ padding: '8px 12px', textAlign: 'right', fontWeight: '600' }}>₹{(r.netSalary || 0).toLocaleString('en-IN')}</td>
                      </tr>
                    ))}
                    {filteredRecords.length > 5 && (
                      <tr>
                        <td colSpan={4} style={{ padding: '8px 12px', textAlign: 'center', color: '#64748b', fontStyle: 'italic' }}>
                          ...and {filteredRecords.length - 5} more staff records as per attached annexure.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '20px', borderTop: '1px dashed #cbd5e1' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ borderBottom: '1px solid #64748b', width: '150px', marginBottom: '6px' }}></div>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: '#334155' }}>Accountant / Bursar</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ borderBottom: '1px solid #64748b', width: '150px', marginBottom: '6px' }}></div>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: '#334155' }}>Principal / Authorized Signatory</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button
                onClick={() => window.print()}
                style={{
                  background: '#159BD7', color: 'white', border: 'none',
                  padding: '9px 20px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer',
                  fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px'
                }}
              >
                <Printer size={16} /> Print Official Letter
              </button>
              <button
                onClick={() => setShowAdviceModal(false)}
                style={{
                  background: '#f1f5f9', color: '#475569', border: 'none',
                  padding: '9px 18px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
