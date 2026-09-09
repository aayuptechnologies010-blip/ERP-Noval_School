import React, { useState, useEffect } from 'react';
import {
  Eye, MessageSquare, Download, Printer, Search, RefreshCw,
  CheckCircle, AlertCircle, Sparkles, DollarSign, Users,
  ShieldCheck, FileSpreadsheet, ChevronLeft, ChevronRight, Check, X
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function SalarySheet() {
  const [records, setRecords] = useState([]);
  const [salaryAccounts, setSalaryAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [smsSending, setSmsSending] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Filters matching mockup
  const [schoolName, setSchoolName] = useState('NAVALS NATIONAL ACADEMY');
  const [schoolBank, setSchoolBank] = useState('All Salary A/c');
  const [salaryAccount, setSalaryAccount] = useState('All Salary A/C No.');
  const [salaryMonth, setSalaryMonth] = useState('Aug-2026');
  const [hourlyPaid, setHourlyPaid] = useState(false);
  const [staffType, setStaffType] = useState('All (11)');
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

  const fetchSalarySheet = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (salaryMonth && salaryMonth !== 'Please Select') params.append('monthYear', salaryMonth);
      if (staffType && staffType !== 'All (11)') params.append('staffType', staffType);
      if (salaryAccount && salaryAccount !== 'All Salary A/C No.') params.append('salaryAccount', salaryAccount);
      if (hourlyPaid) params.append('salaryType', 'Hourly');
      if (searchTerm) params.append('search', searchTerm);

      const res = await fetch(`${API_BASE}/api/salary-structure/salary-generation?${params.toString()}`, { headers });
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
      console.error('Failed to load salary sheet:', err);
      showNotif('error', 'Error loading salary sheet register');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalarySheet();
  }, [hourlyPaid]);

  const handleSendSMS = async () => {
    try {
      setSmsSending(true);
      const res = await fetch(`${API_BASE}/api/salary-structure/salary-sheet/sms`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          monthYear: salaryMonth,
          count: filteredRecords.length
        })
      });
      if (res.ok) {
        const data = await res.json();
        showNotif('success', data.message || `Salary SMS dispatch queued for ${filteredRecords.length} staff!`);
      } else {
        showNotif('error', 'Failed to dispatch SMS alerts');
      }
    } catch (err) {
      showNotif('error', 'SMS gateway connection error');
    } finally {
      setSmsSending(false);
    }
  };

  const exportCSV = () => {
    if (!filteredRecords.length) return;
    const hdrs = [
      '#', 'Emp ID', 'Staff Name', 'Department', 'Designation', 'Staff Type',
      'Basic Salary', 'DA', 'HRA', 'TA & Sp.', 'Gross Salary',
      'PF', 'ESI', 'TDS', 'Advance', 'Total Deductions', 'Net Salary',
      'Bank Name', 'Account No', 'Payment Mode'
    ];
    const rows = filteredRecords.map((r, i) => [
      i + 1,
      `"${r.employeeId || ''}"`,
      `"${r.staffName || ''}"`,
      `"${r.department || ''}"`,
      `"${r.designation || ''}"`,
      r.staffType || '',
      r.basicSalary || 0,
      r.da || 0,
      r.hra || 0,
      (r.conveyance || 0) + (r.specialAllowance || 0),
      r.grossSalary || 0,
      r.pfDeduction || 0,
      r.esiDeduction || 0,
      r.tdsDeduction || 0,
      r.advanceDeduction || 0,
      r.totalDeductions || 0,
      r.netSalary || 0,
      `"${r.bankName || ''}"`,
      `"${r.bankAccountNo || ''}"`,
      r.paymentMode || ''
    ]);
    const csv = 'data:text/csv;charset=utf-8,' + [hdrs.join(','), ...rows.map(r => r.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', `Master_Salary_Sheet_${salaryMonth}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredRecords = records.filter(r => {
    if (!searchTerm) return true;
    const s = searchTerm.toLowerCase();
    return (
      (r.staffName && r.staffName.toLowerCase().includes(s)) ||
      (r.employeeId && r.employeeId.toLowerCase().includes(s)) ||
      (r.department && r.department.toLowerCase().includes(s))
    );
  });

  const totalGross = filteredRecords.reduce((s, r) => s + (r.grossSalary || 0), 0);
  const totalDeductions = filteredRecords.reduce((s, r) => s + (r.totalDeductions || 0), 0);
  const totalNet = filteredRecords.reduce((s, r) => s + (r.netSalary || 0), 0);
  const totalBasic = filteredRecords.reduce((s, r) => s + (r.basicSalary || 0), 0);
  const totalDA = filteredRecords.reduce((s, r) => s + (r.da || 0), 0);
  const totalHRA = filteredRecords.reduce((s, r) => s + (r.hra || 0), 0);

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
              Salary Sheet Filter
            </h3>
            <span style={{ fontSize: '11px', color: '#64748b', background: '#f1f5f9', padding: '2px 8px', borderRadius: '10px' }}>Master Sheet</span>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>School Name</label>
            <select
              value={schoolName}
              onChange={e => setSchoolName(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: 'white' }}
            >
              <option value="NAVALS NATIONAL ACADEMY">NAVALS NATIONAL ACADEMY</option>
              <option value="AYUP TECH ACADEMY">AYUP TECH ACADEMY</option>
            </select>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>School Bank</label>
            <select
              value={schoolBank}
              onChange={e => setSchoolBank(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: 'white' }}
            >
              <option value="All Salary A/c">All Salary A/c</option>
              <option value="HDFC Bank - 50100429188">HDFC Bank - 50100429188</option>
              <option value="SBI Bank - 30219847120">SBI Bank - 30219847120</option>
            </select>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Salary A/c No.</label>
            <select
              value={salaryAccount}
              onChange={e => setSalaryAccount(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: 'white' }}
            >
              <option value="All Salary A/C No.">All Salary A/C No.</option>
              <option value="Ayup Salary Account">Ayup Salary Account</option>
              <option value="Ayup Primary Account">Ayup Primary Account</option>
              {salaryAccounts.map(a => (
                <option key={a._id} value={a.accountName}>{a.accountName} ({a.bank})</option>
              ))}
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

          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <input
              type="checkbox"
              id="hourlyPaidCheck"
              checked={hourlyPaid}
              onChange={e => setHourlyPaid(e.target.checked)}
              style={{ cursor: 'pointer' }}
            />
            <label htmlFor="hourlyPaidCheck" style={{ fontSize: '13px', fontWeight: '600', color: '#334155', cursor: 'pointer' }}>
              Hourly Paid Staff Only
            </label>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Staff Type</label>
            <select
              value={staffType}
              onChange={e => setStaffType(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: 'white' }}
            >
              <option value="All (11)">All (11)</option>
              <option value="Teaching">Teaching</option>
              <option value="Non-Teaching">Non-Teaching</option>
              <option value="Technical">Technical</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleSendSMS}
                disabled={smsSending}
                style={{
                  flex: 1, backgroundColor: '#0284c7', color: 'white', border: 'none',
                  padding: '10px', borderRadius: '6px', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', gap: '6px',
                  cursor: 'pointer', fontSize: '12px', fontWeight: '600',
                  boxShadow: '0 2px 6px rgba(2, 132, 199, 0.3)'
                }}
              >
                <MessageSquare size={15} /> {smsSending ? 'Sending...' : 'Proceed To SMS'}
              </button>
              <button
                onClick={fetchSalarySheet}
                style={{
                  backgroundColor: '#159BD7', color: 'white', border: 'none',
                  padding: '10px 20px', borderRadius: '6px', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', gap: '6px',
                  cursor: 'pointer', fontWeight: '600', fontSize: '13px'
                }}
              >
                <Eye size={15} /> Show
              </button>
            </div>
            <button
              onClick={() => {
                setHourlyPaid(false);
                setStaffType('All (11)');
                setSearchTerm('');
                fetchSalarySheet();
              }}
              style={{
                backgroundColor: 'white', color: '#64748b', border: '1px solid #cbd5e1',
                padding: '8px', borderRadius: '6px', cursor: 'pointer',
                fontWeight: '600', fontSize: '12px'
              }}
            >
              Reset Filters
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
              {schoolName} • MASTER PAYROLL REGISTER
            </div>
            <h2 style={{ margin: '4px 0 0', fontSize: '20px', fontWeight: '700', color: '#0f172a' }}>
              Monthly Salary Sheet ({salaryMonth})
            </h2>
            <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#64748b' }}>
              Mode: <strong>{hourlyPaid ? 'Hourly Basis' : 'Regular Monthly Salaried'}</strong> • Bank: <strong>{schoolBank}</strong>
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
              <Download size={16} /> Export Master CSV
            </button>
            <button
              onClick={() => window.print()}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 18px',
                background: 'white', color: '#334155', border: '1px solid #cbd5e1', borderRadius: '6px',
                fontWeight: '600', cursor: 'pointer', fontSize: '13px'
              }}
            >
              <Printer size={16} /> Print Sheet
            </button>
          </div>
        </div>

        {/* SUMMARY KPI CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {[
            { label: 'Total Employees on Sheet', val: filteredRecords.length, icon: <Users size={20} color="#159BD7" />, bg: '#eff6ff' },
            { label: 'Gross Payroll Value', val: `₹${totalGross.toLocaleString('en-IN')}`, icon: <DollarSign size={20} color="#0284c7" />, bg: '#f0f9ff' },
            { label: 'Total Deductions', val: `₹${totalDeductions.toLocaleString('en-IN')}`, icon: <ShieldCheck size={20} color="#e11d48" />, bg: '#fff1f2' },
            { label: 'Net Disbursable Salary', val: `₹${totalNet.toLocaleString('en-IN')}`, icon: <CheckCircle size={20} color="#16a34a" />, bg: '#f0fdf4' }
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

        {/* MASTER SALARY SHEET DATA TABLE */}
        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>
              Master Payroll Register ({filteredRecords.length} Staff)
            </div>
            <div style={{ position: 'relative', width: '260px' }}>
              <Search size={15} style={{ position: 'absolute', left: '10px', top: '9px', color: '#94a3b8' }} />
              <input
                type="text"
                placeholder="Filter staff by name or ID..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '7px 12px 7px 32px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading salary sheet...</div>
          ) : filteredRecords.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>No payroll sheet records found for {salaryMonth}.</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                    {['#', 'Staff Details', 'Dept & Role', 'Basic', 'DA', 'HRA', 'Other Allow.', 'Gross', 'PF', 'ESI', 'TDS', 'Total Deduct.', 'Net Salary (₹)', 'Payment Mode'].map((h, i) => (
                      <th key={i} style={{ padding: '10px 12px', fontWeight: '600', textAlign: ['Basic', 'DA', 'HRA', 'Other Allow.', 'Gross', 'PF', 'ESI', 'TDS', 'Total Deduct.', 'Net Salary (₹)'].includes(h) ? 'right' : 'left' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((r, i) => {
                    const isAyup = r.staffName?.toLowerCase().includes('ayup');
                    const otherAllow = (r.conveyance || 0) + (r.specialAllowance || 0);
                    return (
                      <tr key={r._id || i} style={{ borderBottom: '1px solid #f1f5f9', background: isAyup ? '#fffbeb' : 'transparent' }}>
                        <td style={{ padding: '10px 12px', color: '#64748b' }}>{i + 1}</td>
                        <td style={{ padding: '10px 12px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontWeight: '600', color: '#0f172a' }}>{r.staffName}</span>
                            {isAyup && (
                              <span style={{ background: '#d97706', color: 'white', fontSize: '9px', padding: '1px 6px', borderRadius: '10px', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                                <Sparkles size={9} /> Ayup Tech
                              </span>
                            )}
                          </div>
                          <div style={{ fontSize: '10px', color: '#64748b' }}>ID: {r.employeeId}</div>
                        </td>
                        <td style={{ padding: '10px 12px', color: '#475569' }}>
                          <div>{r.department}</div>
                          <div style={{ fontSize: '10px', color: '#94a3b8' }}>{r.designation}</div>
                        </td>
                        <td style={{ padding: '10px 12px', textAlign: 'right', color: '#334155' }}>₹{(r.basicSalary || 0).toLocaleString('en-IN')}</td>
                        <td style={{ padding: '10px 12px', textAlign: 'right', color: '#334155' }}>₹{(r.da || 0).toLocaleString('en-IN')}</td>
                        <td style={{ padding: '10px 12px', textAlign: 'right', color: '#334155' }}>₹{(r.hra || 0).toLocaleString('en-IN')}</td>
                        <td style={{ padding: '10px 12px', textAlign: 'right', color: '#334155' }}>₹{otherAllow.toLocaleString('en-IN')}</td>
                        <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: '700', color: '#0f172a' }}>₹{(r.grossSalary || 0).toLocaleString('en-IN')}</td>
                        <td style={{ padding: '10px 12px', textAlign: 'right', color: '#b91c1c' }}>-₹{(r.pfDeduction || 0).toLocaleString('en-IN')}</td>
                        <td style={{ padding: '10px 12px', textAlign: 'right', color: '#b91c1c' }}>-₹{(r.esiDeduction || 0).toLocaleString('en-IN')}</td>
                        <td style={{ padding: '10px 12px', textAlign: 'right', color: '#b91c1c' }}>-₹{(r.tdsDeduction || 0).toLocaleString('en-IN')}</td>
                        <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: '600', color: '#dc2626' }}>-₹{(r.totalDeductions || 0).toLocaleString('en-IN')}</td>
                        <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: '700', color: '#16a34a', fontSize: '13px' }}>₹{(r.netSalary || 0).toLocaleString('en-IN')}</td>
                        <td style={{ padding: '10px 12px', color: '#475569', fontSize: '11px' }}>
                          <div>{r.paymentMode || 'Bank Transfer'}</div>
                          <div style={{ fontSize: '10px', color: '#94a3b8' }}>{r.bankName}</div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr style={{ background: '#f8fafc', fontWeight: '700', borderTop: '2px solid #cbd5e1' }}>
                    <td colSpan={3} style={{ padding: '12px', textAlign: 'right', color: '#0f172a' }}>TOTALS:</td>
                    <td style={{ padding: '12px', textAlign: 'right', color: '#334155' }}>₹{totalBasic.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '12px', textAlign: 'right', color: '#334155' }}>₹{totalDA.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '12px', textAlign: 'right', color: '#334155' }}>₹{totalHRA.toLocaleString('en-IN')}</td>
                    <td></td>
                    <td style={{ padding: '12px', textAlign: 'right', color: '#0f172a' }}>₹{totalGross.toLocaleString('en-IN')}</td>
                    <td colSpan={3}></td>
                    <td style={{ padding: '12px', textAlign: 'right', color: '#dc2626' }}>-₹{totalDeductions.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '12px', textAlign: 'right', color: '#16a34a', fontSize: '15px' }}>₹{totalNet.toLocaleString('en-IN')}</td>
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
