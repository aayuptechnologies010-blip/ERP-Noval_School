import React, { useState, useEffect } from 'react';
import {
  FileText, Eye, Printer, Mail, Download, Search, CheckCircle,
  AlertCircle, Sparkles, User, Building, DollarSign, Calendar,
  ShieldCheck, Check, X
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function SalarySlip() {
  const [payrolls, setPayrolls] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mailing, setMailing] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);

  // Filters matching mockup
  const [schoolName, setSchoolName] = useState('NAVALS NATIONAL ACADEMY');
  const [staffType, setStaffType] = useState('All Staff Types');
  const [salaryMonth, setSalaryMonth] = useState('Aug-2026');
  const [exportSlipCheck, setExportSlipCheck] = useState(true);
  const [sendOnMailCheck, setSendOnMailCheck] = useState(false);
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

  const fetchPayrolls = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (salaryMonth && salaryMonth !== 'Select') params.append('monthYear', salaryMonth);
      if (staffType && staffType !== 'All Staff Types') params.append('staffType', staffType);

      const res = await fetch(`${API_BASE}/api/salary-structure/salary-generation?${params.toString()}`, { headers });
      if (res.ok) {
        const data = await res.json();
        const list = Array.isArray(data) ? data : [];
        setPayrolls(list);
        if (list.length > 0) setSelectedStaff(list[0]);
      }
    } catch (err) {
      console.error('Failed to load payslips:', err);
      showNotif('error', 'Error loading salary slips');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayrolls();
  }, []);

  const handleSendMail = async () => {
    if (!selectedStaff) return;
    try {
      setMailing(true);
      const res = await fetch(`${API_BASE}/api/salary-structure/salary-slip/mail`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          staffName: selectedStaff.staffName,
          email: `${selectedStaff.employeeId.toLowerCase()}@navalsacademy.edu`,
          monthYear: salaryMonth
        })
      });
      if (res.ok) {
        const data = await res.json();
        showNotif('success', data.message || `Salary slip dispatched to ${selectedStaff.staffName}!`);
      }
    } catch (err) {
      showNotif('error', 'Mail server error');
    } finally {
      setMailing(false);
    }
  };

  const exportCSV = () => {
    if (!selectedStaff) return;
    const r = selectedStaff;
    const content = [
      `PAYSLIP - ${schoolName}`,
      `Month: ${r.monthYear}`,
      `Employee ID: ${r.employeeId}`,
      `Staff Name: ${r.staffName}`,
      `Department: ${r.department}`,
      `Designation: ${r.designation}`,
      `Bank: ${r.bankName}`,
      `Account No: ${r.bankAccountNo}`,
      `IFSC: ${r.ifscCode}`,
      `------------------------`,
      `EARNINGS`,
      `Basic Salary,${r.basicSalary || 0}`,
      `Dearness Allowance (DA),${r.da || 0}`,
      `House Rent Allowance (HRA),${r.hra || 0}`,
      `Transport Allowance (TA),${r.conveyance || 0}`,
      `Special Allowance,${r.specialAllowance || 0}`,
      `GROSS EARNINGS,${r.grossSalary || 0}`,
      `------------------------`,
      `DEDUCTIONS`,
      `Provident Fund (PF),${r.pfDeduction || 0}`,
      `ESI Deduction,${r.esiDeduction || 0}`,
      `TDS Deduction,${r.tdsDeduction || 0}`,
      `Insurance,${r.insuranceDeduction || 0}`,
      `Advance Recovery,${r.advanceDeduction || 0}`,
      `TOTAL DEDUCTIONS,${r.totalDeductions || 0}`,
      `------------------------`,
      `NET PAYABLE SALARY,${r.netSalary || 0}`
    ].join('\n');

    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `SalarySlip_${r.employeeId}_${r.monthYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredStaffs = payrolls.filter(p => {
    if (!searchTerm) return true;
    const s = searchTerm.toLowerCase();
    return (
      (p.staffName && p.staffName.toLowerCase().includes(s)) ||
      (p.employeeId && p.employeeId.toLowerCase().includes(s))
    );
  });

  // Convert numbers to words (Indian numbering system)
  const numberToWords = (num) => {
    const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    if ((num = num.toString()).length > 9) return 'Overflow';
    let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return '';
    let str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'Only' : 'Only';
    return str;
  };

  return (
    <div className="global-settings-container" style={{ padding: '24px', background: '#f8fafc', minHeight: '100vh' }}>

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

      {/* HEADER & FILTER CARD */}
      <div style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e2e8f0', marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FileText size={24} color="#159BD7" />
              Salary Slip Generator & Dispatch Portal
            </h2>
            <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '13px' }}>
              Generate, print and email official authenticated payslips with earnings, statutory deductions, and net words.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => window.print()}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 18px',
                background: '#159BD7', color: 'white', border: 'none', borderRadius: '6px',
                fontWeight: '600', cursor: 'pointer', fontSize: '13px'
              }}
            >
              <Printer size={16} /> Print Payslip
            </button>
            <button
              onClick={exportCSV}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 18px',
                background: 'white', color: '#334155', border: '1px solid #cbd5e1', borderRadius: '6px',
                fontWeight: '600', cursor: 'pointer', fontSize: '13px'
              }}
            >
              <Download size={16} /> Export Slip
            </button>
          </div>
        </div>

        {/* INPUTS ROW */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>School Name</label>
            <select
              value={schoolName}
              onChange={e => setSchoolName(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: 'white' }}
            >
              <option value="NAVALS NATIONAL ACADEMY">NAVALS NATIONAL ACADEMY</option>
              <option value="AYUP TECH ACADEMY">AYUP TECH ACADEMY</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Staff Type</label>
            <select
              value={staffType}
              onChange={e => setStaffType(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: 'white' }}
            >
              <option value="All Staff Types">All Staff Types</option>
              <option value="Teaching">Teaching</option>
              <option value="Non-Teaching">Non-Teaching</option>
              <option value="Technical">Technical</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Salary Month</label>
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

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '8px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600', color: '#334155', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={exportSlipCheck}
                onChange={e => setExportSlipCheck(e.target.checked)}
              /> Export Salary Slip
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600', color: '#334155', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={sendOnMailCheck}
                onChange={e => setSendOnMailCheck(e.target.checked)}
              /> Send on Mail (Automated Dispatch)
            </label>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
          <button
            onClick={fetchPayrolls}
            style={{
              backgroundColor: '#159BD7', color: 'white', border: 'none',
              padding: '9px 30px', borderRadius: '6px', display: 'flex',
              alignItems: 'center', gap: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px'
            }}
          >
            <Eye size={16} /> View Payslips
          </button>
          <button
            onClick={handleSendMail}
            disabled={mailing}
            style={{
              backgroundColor: '#059669', color: 'white', border: 'none',
              padding: '9px 25px', borderRadius: '6px', display: 'flex',
              alignItems: 'center', gap: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px'
            }}
          >
            <Mail size={16} /> {mailing ? 'Sending...' : 'Send on Mail'}
          </button>
        </div>
      </div>

      {/* PAYSLIP VIEWER LAYOUT: LIST ON LEFT + OFFICIAL PAYSLIP ON RIGHT */}
      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '20px' }}>
        
        {/* STAFF LIST PICKER */}
        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '16px', maxHeight: '720px', overflowY: 'auto' }}>
          <div style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', marginBottom: '12px' }}>
            Employees in {salaryMonth} ({filteredStaffs.length})
          </div>
          <div style={{ position: 'relative', marginBottom: '12px' }}>
            <Search size={14} style={{ position: 'absolute', left: '8px', top: '8px', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search staff..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '6px 10px 6px 28px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '11px', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {filteredStaffs.map(p => {
              const isSel = selectedStaff && selectedStaff._id === p._id;
              const isAyup = p.staffName?.toLowerCase().includes('ayup');
              return (
                <div
                  key={p._id}
                  onClick={() => setSelectedStaff(p)}
                  style={{
                    padding: '10px 12px', borderRadius: '8px', cursor: 'pointer',
                    background: isSel ? '#eff6ff' : 'transparent',
                    border: isSel ? '1px solid #93c5fd' : '1px solid #f1f5f9',
                    transition: 'all 0.15s'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontWeight: '600', fontSize: '12px', color: isSel ? '#1d4ed8' : '#0f172a' }}>
                      {p.staffName}
                    </div>
                    {isAyup && (
                      <span style={{ background: '#d97706', color: 'white', fontSize: '8px', padding: '1px 5px', borderRadius: '8px', fontWeight: '700' }}>
                        AYUP
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>
                    ID: {p.employeeId} • Net: <strong>₹{(p.netSalary || 0).toLocaleString('en-IN')}</strong>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* OFFICIAL AUTHENTICATED PAYSLIP CARD */}
        {selectedStaff ? (
          <div style={{
            background: 'white', borderRadius: '12px', border: '2px solid #cbd5e1',
            padding: '36px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', position: 'relative'
          }}>
            
            {/* SCHOOL HEADER & LOGO */}
            <div style={{ textAlign: 'center', borderBottom: '2px solid #0f172a', paddingBottom: '16px', marginBottom: '20px' }}>
              <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: '#0f172a', letterSpacing: '0.5px' }}>
                {schoolName}
              </h1>
              <div style={{ fontSize: '12px', color: '#475569', marginTop: '4px' }}>
                Affiliated to CBSE, New Delhi • ISO 9001:2015 Certified Educational Institution
              </div>
              <div style={{ display: 'inline-block', background: '#0f172a', color: 'white', fontSize: '12px', fontWeight: '700', padding: '4px 18px', borderRadius: '4px', marginTop: '10px', letterSpacing: '1px' }}>
                SALARY SLIP FOR THE MONTH OF {selectedStaff.monthYear?.toUpperCase()}
              </div>
            </div>

            {/* EMPLOYEE PARTICULARS */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', background: '#f8fafc', padding: '14px 18px', borderRadius: '6px', border: '1px solid #e2e8f0', marginBottom: '20px', fontSize: '12px' }}>
              <div>
                <span style={{ color: '#64748b' }}>Employee Name:</span><br />
                <strong style={{ color: '#0f172a', fontSize: '13px' }}>{selectedStaff.staffName}</strong>
                {selectedStaff.staffName?.toLowerCase().includes('ayup') && (
                  <span style={{ marginLeft: '6px', color: '#d97706', fontSize: '10px', fontWeight: '700' }}>★ AYUP TECH</span>
                )}
              </div>
              <div>
                <span style={{ color: '#64748b' }}>Employee ID:</span><br />
                <strong style={{ color: '#0f172a' }}>{selectedStaff.employeeId}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b' }}>Department:</span><br />
                <strong style={{ color: '#0f172a' }}>{selectedStaff.department}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b' }}>Designation:</span><br />
                <strong style={{ color: '#0f172a' }}>{selectedStaff.designation}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b' }}>Bank Name:</span><br />
                <strong style={{ color: '#0f172a' }}>{selectedStaff.bankName}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b' }}>Account No.:</span><br />
                <strong style={{ color: '#0f172a', fontFamily: 'monospace' }}>{selectedStaff.bankAccountNo}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b' }}>IFSC Code:</span><br />
                <strong style={{ color: '#0f172a', fontFamily: 'monospace' }}>{selectedStaff.ifscCode}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b' }}>Payment Mode:</span><br />
                <strong style={{ color: '#0f172a' }}>{selectedStaff.paymentMode}</strong>
              </div>
            </div>

            {/* EARNINGS & DEDUCTIONS BREAKDOWN TABLE */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              
              {/* EARNINGS */}
              <div style={{ border: '1px solid #cbd5e1', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ background: '#f1f5f9', padding: '8px 14px', fontWeight: '700', fontSize: '12px', color: '#0f172a', borderBottom: '1px solid #cbd5e1', display: 'flex', justifyContent: 'space-between' }}>
                  <span>EARNING HEADS</span>
                  <span>AMOUNT (₹)</span>
                </div>
                <div style={{ padding: '8px 14px', fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Basic Salary</span>
                    <span style={{ fontWeight: '600' }}>₹{(selectedStaff.basicSalary || 0).toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Dearness Allowance (DA)</span>
                    <span style={{ fontWeight: '600' }}>₹{(selectedStaff.da || 0).toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>House Rent Allowance (HRA)</span>
                    <span style={{ fontWeight: '600' }}>₹{(selectedStaff.hra || 0).toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Transport Allowance (TA)</span>
                    <span style={{ fontWeight: '600' }}>₹{(selectedStaff.conveyance || 0).toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Special Allowance</span>
                    <span style={{ fontWeight: '600' }}>₹{(selectedStaff.specialAllowance || 0).toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <div style={{ background: '#f8fafc', padding: '10px 14px', borderTop: '2px solid #cbd5e1', fontWeight: '700', fontSize: '13px', color: '#0f172a', display: 'flex', justifyContent: 'space-between' }}>
                  <span>GROSS EARNINGS:</span>
                  <span>₹{(selectedStaff.grossSalary || 0).toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* DEDUCTIONS */}
              <div style={{ border: '1px solid #cbd5e1', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ background: '#f1f5f9', padding: '8px 14px', fontWeight: '700', fontSize: '12px', color: '#0f172a', borderBottom: '1px solid #cbd5e1', display: 'flex', justifyContent: 'space-between' }}>
                  <span>STATUTORY DEDUCTIONS</span>
                  <span>AMOUNT (₹)</span>
                </div>
                <div style={{ padding: '8px 14px', fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Provident Fund (PF)</span>
                    <span style={{ fontWeight: '600', color: '#b91c1c' }}>₹{(selectedStaff.pfDeduction || 0).toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Employee State Insurance (ESI)</span>
                    <span style={{ fontWeight: '600', color: '#b91c1c' }}>₹{(selectedStaff.esiDeduction || 0).toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Income Tax (TDS)</span>
                    <span style={{ fontWeight: '600', color: '#b91c1c' }}>₹{(selectedStaff.tdsDeduction || 0).toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Group Insurance Policy</span>
                    <span style={{ fontWeight: '600', color: '#b91c1c' }}>₹{(selectedStaff.insuranceDeduction || 0).toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Advance Recovery / Other</span>
                    <span style={{ fontWeight: '600', color: '#b91c1c' }}>₹{(selectedStaff.advanceDeduction || 0).toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <div style={{ background: '#f8fafc', padding: '10px 14px', borderTop: '2px solid #cbd5e1', fontWeight: '700', fontSize: '13px', color: '#b91c1c', display: 'flex', justifyContent: 'space-between' }}>
                  <span>TOTAL DEDUCTIONS:</span>
                  <span>-₹{(selectedStaff.totalDeductions || 0).toLocaleString('en-IN')}</span>
                </div>
              </div>

            </div>

            {/* NET SALARY HIGHLIGHT BANNER */}
            <div style={{
              background: 'linear-gradient(135deg, #0f172a, #1e293b)', color: 'white',
              padding: '16px 20px', borderRadius: '6px', display: 'flex',
              justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'
            }}>
              <div>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', opacity: 0.8, letterSpacing: '0.5px' }}>NET DISBURSED SALARY</div>
                <div style={{ fontSize: '24px', fontWeight: '800', color: '#4ade80' }}>
                  ₹{(selectedStaff.netSalary || 0).toLocaleString('en-IN')}
                </div>
              </div>
              <div style={{ textAlign: 'right', fontSize: '12px' }}>
                <div style={{ color: '#cbd5e1' }}>Amount in words:</div>
                <div style={{ fontWeight: '700', color: 'white' }}>
                  Rupees {numberToWords(selectedStaff.netSalary || 0)}
                </div>
              </div>
            </div>

            {/* SIGNATURE BLOCKS */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', paddingTop: '20px', borderTop: '1px dashed #cbd5e1', fontSize: '12px', color: '#475569' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ height: '30px' }}></div>
                <strong>Employee Signature</strong>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ height: '30px' }}></div>
                <strong>Accountant / Bursar</strong>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ height: '30px' }}></div>
                <strong>Principal / Director</strong>
              </div>
            </div>

            {/* WATERMARK NOTE */}
            <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '10px', color: '#94a3b8' }}>
              * This is a computer generated salary document and requires no physical stamp when authenticated via ERP School_Soft.
            </div>

          </div>
        ) : (
          <div style={{ padding: '60px', textAlign: 'center', color: '#64748b' }}>
            Select an employee from the left panel to display payslip.
          </div>
        )}

      </div>

    </div>
  );
}
