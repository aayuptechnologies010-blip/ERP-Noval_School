import React, { useState, useEffect } from 'react';
import { Eye, XCircle, Download, Printer, Shield, FileText, CheckCircle, Sparkles, X, DollarSign, Users, Building } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function InsuranceStatement() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [salaryAccounts, setSalaryAccounts] = useState([]);

  // Filters
  const [accountName, setAccountName] = useState('All');
  const [bankAccountNo, setBankAccountNo] = useState('');
  const [employeeType, setEmployeeType] = useState('All');
  const [monthYear, setMonthYear] = useState('Aug-2026');
  const [statementGen, setStatementGen] = useState('Generated');
  const [policyVendor, setPolicyVendor] = useState('LIC');
  const [chequeNo, setChequeNo] = useState('CHQ-LIC-99214');
  const [chequeDate, setChequeDate] = useState('30-Aug-2026');
  const [searchTerm, setSearchTerm] = useState('');

  // Print modal
  const [showPrintModal, setShowPrintModal] = useState(false);

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  const fetchInsuranceStatement = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (monthYear && monthYear !== 'Select') params.append('monthYear', monthYear);
      if (accountName && accountName !== 'All') params.append('accountName', accountName);
      if (policyVendor && policyVendor !== 'All') params.append('policyVendor', policyVendor);
      if (searchTerm) params.append('search', searchTerm);

      const res = await fetch(`${API_BASE}/api/salary-structure/insurance-statement?${params.toString()}`, { headers });
      if (res.ok) {
        const data = await res.json();
        setRecords(Array.isArray(data) ? data : []);
      }

      // Fetch accounts
      const aRes = await fetch(`${API_BASE}/api/salary-accounts`, { headers });
      if (aRes.ok) {
        const aData = await aRes.json();
        setSalaryAccounts(Array.isArray(aData) ? aData : []);
      }
    } catch (err) {
      console.error('Failed to load insurance statement:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsuranceStatement();
  }, []);

  const handleReset = () => {
    setAccountName('All');
    setBankAccountNo('');
    setEmployeeType('All');
    setMonthYear('Aug-2026');
    setStatementGen('Generated');
    setPolicyVendor('LIC');
    setSearchTerm('');
    fetchInsuranceStatement();
  };

  const filteredRecords = records.filter(r => {
    const matchesSearch = !searchTerm ||
      r.staffName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.employeeId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.policyNumber?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const totalPremium = filteredRecords.reduce((sum, r) => sum + (Number(r.insuranceDeduction) || 0), 0);
  const totalInsured = filteredRecords.length;

  const exportCSV = () => {
    if (filteredRecords.length === 0) return;
    const headersCsv = ['Sl No', 'Employee ID', 'Staff Name', 'Department', 'Designation', 'Policy Underwriter', 'Policy Number', 'Premium Deducted (INR)', 'Remittance Cheque Ref', 'Month-Year', 'Status'];
    const rows = filteredRecords.map((r, i) => [
      i + 1,
      `"${r.employeeId || ''}"`,
      `"${r.staffName || ''}"`,
      `"${r.department || ''}"`,
      `"${r.designation || ''}"`,
      `"${r.policyVendor || policyVendor || 'LIC'}"`,
      `"${r.policyNumber || `POL-LIC-2026-${i + 101}`}"`,
      r.insuranceDeduction || 0,
      `"${chequeNo}"`,
      `"${r.monthYear || monthYear}"`,
      `"${r.status || 'Deducted'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headersCsv.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Insurance_Statement_${monthYear}_${new Date().toISOString().slice(0, 10)}.csv`);
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
            <Shield size={26} color="#159BD7" />
            Staff Insurance Statement & Premium Remittance
          </h2>
          <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '13px' }}>
            Monthly staff life & health insurance policy deduction statement and underwriter remittance schedule.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            onClick={() => setShowPrintModal(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '9px 18px', background: 'white', color: '#0f766e',
              border: '1px solid #14b8a6', borderRadius: '6px', fontWeight: '600', cursor: 'pointer',
              fontSize: '13px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}
          >
            <Printer size={16} /> Print Remittance Schedule
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
            <Download size={16} /> Export Statement CSV
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
              Bank A/C No
            </label>
            <input
              type="text"
              placeholder="e.g. 50100429188"
              value={bankAccountNo}
              onChange={(e) => setBankAccountNo(e.target.value)}
              className="settings-input"
              style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            />
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
              <option value="Teaching">Teaching</option>
              <option value="Non-Teaching">Non-Teaching</option>
              <option value="Administrative">Administrative</option>
            </select>
          </div>

          <div className="form-group">
            <label style={{ fontWeight: '600', fontSize: '12px', color: '#475569', display: 'block', marginBottom: '6px' }}>
              Month-Year
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
            </select>
          </div>

          <div className="form-group">
            <label style={{ fontWeight: '600', fontSize: '12px', color: '#475569', display: 'block', marginBottom: '6px' }}>
              Policy Vendor / Underwriter
            </label>
            <select
              value={policyVendor}
              onChange={(e) => setPolicyVendor(e.target.value)}
              className="settings-input"
              style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            >
              <option value="All">All Policy Vendors</option>
              <option value="LIC">LIC (Life Insurance Corporation)</option>
              <option value="Star Health">Star Health & Allied Insurance</option>
              <option value="Max Life">Max Life Insurance</option>
              <option value="Tata AIG">Tata AIG General Insurance</option>
            </select>
          </div>

          <div className="form-group">
            <label style={{ fontWeight: '600', fontSize: '12px', color: '#475569', display: 'block', marginBottom: '6px' }}>
              Remittance Cheque No
            </label>
            <input
              type="text"
              value={chequeNo}
              onChange={(e) => setChequeNo(e.target.value)}
              className="settings-input"
              style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            />
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

          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <label style={{ fontWeight: '600', fontSize: '12px', color: '#475569', display: 'block', marginBottom: '8px' }}>
              Statement Status
            </label>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', fontSize: '13px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="insStatementGen"
                  checked={statementGen === 'Generated'}
                  onChange={() => setStatementGen('Generated')}
                />
                Generated
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="insStatementGen"
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
            onClick={fetchInsuranceStatement}
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

      {/* SUMMARY CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: 'white', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '8px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#159BD7' }}>
            <Users size={22} />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Insured Employees</div>
            <div style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a' }}>{totalInsured}</div>
          </div>
        </div>

        <div style={{ background: 'white', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '8px', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
            <DollarSign size={22} />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Total Premium Deducted</div>
            <div style={{ fontSize: '20px', fontWeight: '700', color: '#ef4444' }}>₹{totalPremium.toLocaleString('en-IN')}</div>
          </div>
        </div>

        <div style={{ background: 'white', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '8px', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a' }}>
            <Shield size={22} />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Primary Underwriter</div>
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#166534' }}>{policyVendor || 'LIC'}</div>
          </div>
        </div>

        <div style={{ background: 'white', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '8px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569' }}>
            <Building size={22} />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Remittance Cheque</div>
            <div style={{ fontSize: '14px', fontWeight: '700', color: '#334155' }}>{chequeNo}</div>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', overflow: 'hidden' }}>
        
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>
            Insurance Deduction Entries ({filteredRecords.length})
          </div>
          <input
            type="text"
            placeholder="Search staff, policy number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '6px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', width: '280px' }}
          />
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
            Loading insurance statements...
          </div>
        ) : filteredRecords.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
            No insurance deduction records found for the selected parameters.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                  <th style={{ padding: '12px 16px', fontWeight: '600' }}>#</th>
                  <th style={{ padding: '12px 16px', fontWeight: '600' }}>Staff Details</th>
                  <th style={{ padding: '12px 16px', fontWeight: '600' }}>Department & Role</th>
                  <th style={{ padding: '12px 16px', fontWeight: '600' }}>Policy Vendor</th>
                  <th style={{ padding: '12px 16px', fontWeight: '600' }}>Policy Number</th>
                  <th style={{ padding: '12px 16px', fontWeight: '600', textAlign: 'right' }}>Monthly Premium (₹)</th>
                  <th style={{ padding: '12px 16px', fontWeight: '600' }}>Remittance Cheque</th>
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
                        background: isAyup ? '#f0fdf4' : 'transparent'
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
                        <div style={{ color: '#334155' }}>{r.department || 'Academics'}</div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>{r.designation || r.staffType}</div>
                      </td>
                      <td style={{ padding: '12px 16px', color: '#334155', fontWeight: '600' }}>
                        {r.policyVendor || policyVendor || 'LIC'}
                      </td>
                      <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#1e293b' }}>
                        {r.policyNumber || `POL-LIC-2026-${i + 101}`}
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '700', color: '#ef4444' }}>
                        ₹{(Number(r.insuranceDeduction) || 0).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: '12px', color: '#64748b' }}>
                        {chequeNo}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: '4px',
                          background: '#ecfdf5', color: '#059669',
                          padding: '3px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: '600'
                        }}>
                          <CheckCircle size={12} /> Deducted
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr style={{ background: '#f8fafc', borderTop: '2px solid #cbd5e1', fontWeight: '700' }}>
                  <td colSpan={5} style={{ padding: '14px 16px', color: '#1e293b' }}>
                    Total Insurance Deductions ({filteredRecords.length} Policies):
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right', color: '#ef4444', fontSize: '15px' }}>
                    ₹{totalPremium.toLocaleString('en-IN')}
                  </td>
                  <td colSpan={2}></td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>

      {/* PRINT MODAL */}
      {showPrintModal && (
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
                <h3 style={{ margin: 0, color: '#0f172a', fontSize: '18px' }}>Insurance Premium Remittance Letter</h3>
              </div>
              <button
                onClick={() => setShowPrintModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ border: '1px solid #e2e8f0', padding: '24px', borderRadius: '8px', background: '#fff' }}>
              <div style={{ textAlign: 'center', borderBottom: '1px solid #cbd5e1', paddingBottom: '14px', marginBottom: '16px' }}>
                <h2 style={{ margin: 0, color: '#1e293b', fontSize: '20px', fontWeight: '800' }}>NOVAL INTERNATIONAL ACADEMY</h2>
                <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '12px' }}>Staff Welfare & Insurance Deduction Treasury</p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '13px', color: '#334155' }}>
                <div>
                  <strong>To:</strong><br />
                  The Branch Senior Officer<br />
                  {policyVendor || 'Life Insurance Corporation of India (LIC)'}<br />
                  Divisional Office, Institutional Area
                </div>
                <div style={{ textAlign: 'right' }}>
                  <strong>Date:</strong> {chequeDate}<br />
                  <strong>Cheque No:</strong> {chequeNo}<br />
                  <strong>Month:</strong> {monthYear}
                </div>
              </div>

              <p style={{ fontSize: '13px', color: '#334155', lineHeight: '1.6' }}>
                <strong>Subject:</strong> Remittance of Group Insurance Premium deductions for <strong>{monthYear}</strong>.
              </p>

              <p style={{ fontSize: '13px', color: '#334155', lineHeight: '1.6' }}>
                Dear Sir/Madam,<br />
                Enclosed please find Cheque No. <strong>{chequeNo}</strong> dated <strong>{chequeDate}</strong> drawn on HDFC Bank for an aggregate amount of <strong>₹{totalPremium.toLocaleString('en-IN')}</strong> on account of group policy deductions for <strong>{totalInsured} employees</strong>.
              </p>

              <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '20px', borderTop: '1px dashed #cbd5e1' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ borderBottom: '1px solid #64748b', width: '150px', marginBottom: '6px' }}></div>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: '#334155' }}>Payroll In-Charge</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ borderBottom: '1px solid #64748b', width: '150px', marginBottom: '6px' }}></div>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: '#334155' }}>Principal / Signatory</div>
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
                <Printer size={16} /> Print Official Remittance Letter
              </button>
              <button
                onClick={() => setShowPrintModal(false)}
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
