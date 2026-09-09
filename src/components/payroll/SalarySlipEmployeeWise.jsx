import React, { useState, useEffect } from 'react';
import {
  UserCheck, Eye, Printer, Download, Search, CheckCircle,
  AlertCircle, Sparkles, Building, DollarSign, Calendar,
  ShieldCheck, FileText, Check, X, Award
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function SalarySlipEmployeeWise() {
  const [payrolls, setPayrolls] = useState([]);
  const [selectedSlip, setSelectedSlip] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);

  // Filters matching mockup
  const [schoolName, setSchoolName] = useState('NAVALS NATIONAL ACADEMY');
  const [staffType, setStaffType] = useState('All Staff Types');
  const [selectedStaffId, setSelectedStaffId] = useState('');
  const [salaryMonth, setSalaryMonth] = useState('Aug-2026');

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  const showNotif = (type, text) => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg(null), 4000);
  };

  const fetchEmployeeSlips = async () => {
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

        if (list.length > 0) {
          // Default to Ayup Tech if present or first
          const ayup = list.find(p => p.staffName?.toLowerCase().includes('ayup'));
          const target = ayup || list[0];
          setSelectedStaffId(target._id);
          setSelectedSlip(target);
        }
      }
    } catch (err) {
      console.error('Failed to load employee slips:', err);
      showNotif('error', 'Error loading employee salary slip data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeeSlips();
  }, [salaryMonth, staffType]);

  const handleSelectStaff = (id) => {
    setSelectedStaffId(id);
    const found = payrolls.find(p => p._id === id);
    if (found) setSelectedSlip(found);
  };

  const exportCSV = () => {
    if (!selectedSlip) return;
    const r = selectedSlip;
    const content = [
      `INDIVIDUAL PAYSLIP - ${schoolName}`,
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
    link.setAttribute('download', `Payslip_${r.employeeId}_${r.monthYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

      {/* FILTER CARD */}
      <div style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e2e8f0', marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <UserCheck size={24} color="#159BD7" />
              Salary Slip — Employee Wise
            </h2>
            <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '13px' }}>
              Individual employee payslip retrieval, annual CTC breakdown, and printable certificate generation.
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
              <Printer size={16} /> Print Slip
            </button>
            <button
              onClick={exportCSV}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 18px',
                background: 'white', color: '#334155', border: '1px solid #cbd5e1', borderRadius: '6px',
                fontWeight: '600', cursor: 'pointer', fontSize: '13px'
              }}
            >
              <Download size={16} /> Export CSV
            </button>
          </div>
        </div>

        {/* CONTROLS MATCHING ORIGINAL LAYOUT */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '20px' }}>
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
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#159BD7', marginBottom: '6px' }}>Select Staff</label>
            <select
              value={selectedStaffId}
              onChange={e => handleSelectStaff(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '2px solid #159BD7', fontSize: '13px', background: '#f0f9ff', fontWeight: '600', color: '#0f172a' }}
            >
              {payrolls.map(p => (
                <option key={p._id} value={p._id}>
                  {p.staffName} ({p.employeeId} - {p.department})
                </option>
              ))}
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
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
          <button
            onClick={() => {
              const found = payrolls.find(p => p._id === selectedStaffId);
              if (found) setSelectedSlip(found);
            }}
            style={{
              backgroundColor: '#159BD7', color: 'white', border: 'none',
              padding: '9px 30px', borderRadius: '6px', display: 'flex',
              alignItems: 'center', gap: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px',
              boxShadow: '0 2px 6px rgba(21, 155, 215, 0.3)'
            }}
          >
            <Eye size={16} /> View
          </button>
          <button
            onClick={() => window.print()}
            style={{
              backgroundColor: 'white', color: '#159BD7', border: '1px solid #159BD7',
              padding: '9px 30px', borderRadius: '6px', display: 'flex',
              alignItems: 'center', gap: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px'
            }}
          >
            <Printer size={16} /> Print
          </button>
        </div>
      </div>

      {/* DETAILED EMPLOYEE PAYSLIP CARD */}
      {selectedSlip ? (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          
          {/* TOP PROFILE SUMMARY */}
          <div style={{ background: 'white', borderRadius: '12px', padding: '20px 24px', border: '1px solid #e2e8f0', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#eff6ff', color: '#159BD7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: '700' }}>
                {selectedSlip.staffName?.charAt(0) || 'E'}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>{selectedSlip.staffName}</h3>
                  {selectedSlip.staffName?.toLowerCase().includes('ayup') && (
                    <span style={{ background: '#d97706', color: 'white', fontSize: '10px', padding: '2px 8px', borderRadius: '12px', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Sparkles size={10} /> Ayup Tech Verified
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                  {selectedSlip.designation} • {selectedSlip.department} • Employee ID: <strong>{selectedSlip.employeeId}</strong>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '24px' }}>
              <div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Gross Monthly CTC</div>
                <div style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>₹{(selectedSlip.grossSalary || 0).toLocaleString('en-IN')}</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Total Deductions</div>
                <div style={{ fontSize: '16px', fontWeight: '700', color: '#e11d48' }}>-₹{(selectedSlip.totalDeductions || 0).toLocaleString('en-IN')}</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Net Disbursed</div>
                <div style={{ fontSize: '18px', fontWeight: '800', color: '#16a34a' }}>₹{(selectedSlip.netSalary || 0).toLocaleString('en-IN')}</div>
              </div>
            </div>
          </div>

          {/* OFFICIAL PAYSLIP CARD */}
          <div style={{
            background: 'white', borderRadius: '12px', border: '2px solid #cbd5e1',
            padding: '36px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)'
          }}>
            
            {/* SCHOOL HEADER */}
            <div style={{ textAlign: 'center', borderBottom: '2px solid #0f172a', paddingBottom: '16px', marginBottom: '20px' }}>
              <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: '#0f172a' }}>
                {schoolName}
              </h1>
              <div style={{ fontSize: '12px', color: '#475569', marginTop: '4px' }}>
                Affiliated to CBSE, New Delhi • Educational Campus & Administration
              </div>
              <div style={{ display: 'inline-block', background: '#0f172a', color: 'white', fontSize: '12px', fontWeight: '700', padding: '4px 20px', borderRadius: '4px', marginTop: '10px' }}>
                CONFIDENTIAL PAYSLIP — {selectedSlip.monthYear?.toUpperCase()}
              </div>
            </div>

            {/* EMPLOYEE PARTICULARS */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', background: '#f8fafc', padding: '14px 18px', borderRadius: '6px', border: '1px solid #e2e8f0', marginBottom: '20px', fontSize: '12px' }}>
              <div>
                <span style={{ color: '#64748b' }}>Employee Name:</span><br />
                <strong style={{ color: '#0f172a', fontSize: '13px' }}>{selectedSlip.staffName}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b' }}>Employee ID:</span><br />
                <strong style={{ color: '#0f172a' }}>{selectedSlip.employeeId}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b' }}>Department:</span><br />
                <strong style={{ color: '#0f172a' }}>{selectedSlip.department}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b' }}>Designation:</span><br />
                <strong style={{ color: '#0f172a' }}>{selectedSlip.designation}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b' }}>Salary Account:</span><br />
                <strong style={{ color: '#0f172a' }}>{selectedSlip.salaryAccount}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b' }}>Bank & A/C No:</span><br />
                <strong style={{ color: '#0f172a', fontFamily: 'monospace' }}>{selectedSlip.bankName} - {selectedSlip.bankAccountNo}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b' }}>IFSC Code:</span><br />
                <strong style={{ color: '#0f172a', fontFamily: 'monospace' }}>{selectedSlip.ifscCode}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b' }}>Payment Advice:</span><br />
                <strong style={{ color: '#0f172a' }}>{selectedSlip.bankAdviceRef || 'NEFT/RTGS'}</strong>
              </div>
            </div>

            {/* TWO COLUMN EARNINGS & DEDUCTIONS */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              
              {/* EARNINGS */}
              <div style={{ border: '1px solid #cbd5e1', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ background: '#f1f5f9', padding: '8px 14px', fontWeight: '700', fontSize: '12px', color: '#0f172a', borderBottom: '1px solid #cbd5e1', display: 'flex', justifyContent: 'space-between' }}>
                  <span>EARNINGS (CREDITS)</span>
                  <span>AMOUNT (₹)</span>
                </div>
                <div style={{ padding: '8px 14px', fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Basic Salary</span>
                    <span style={{ fontWeight: '600' }}>₹{(selectedSlip.basicSalary || 0).toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Dearness Allowance (DA)</span>
                    <span style={{ fontWeight: '600' }}>₹{(selectedSlip.da || 0).toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>House Rent Allowance (HRA)</span>
                    <span style={{ fontWeight: '600' }}>₹{(selectedSlip.hra || 0).toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Transport Allowance (TA)</span>
                    <span style={{ fontWeight: '600' }}>₹{(selectedSlip.conveyance || 0).toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Special Allowance</span>
                    <span style={{ fontWeight: '600' }}>₹{(selectedSlip.specialAllowance || 0).toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <div style={{ background: '#f8fafc', padding: '10px 14px', borderTop: '2px solid #cbd5e1', fontWeight: '700', fontSize: '13px', color: '#0f172a', display: 'flex', justifyContent: 'space-between' }}>
                  <span>TOTAL GROSS EARNINGS:</span>
                  <span>₹{(selectedSlip.grossSalary || 0).toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* DEDUCTIONS */}
              <div style={{ border: '1px solid #cbd5e1', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ background: '#f1f5f9', padding: '8px 14px', fontWeight: '700', fontSize: '12px', color: '#0f172a', borderBottom: '1px solid #cbd5e1', display: 'flex', justifyContent: 'space-between' }}>
                  <span>STATUTORY DEDUCTIONS (DEBITS)</span>
                  <span>AMOUNT (₹)</span>
                </div>
                <div style={{ padding: '8px 14px', fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Employees Provident Fund (PF)</span>
                    <span style={{ fontWeight: '600', color: '#b91c1c' }}>₹{(selectedSlip.pfDeduction || 0).toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Employee State Insurance (ESI)</span>
                    <span style={{ fontWeight: '600', color: '#b91c1c' }}>₹{(selectedSlip.esiDeduction || 0).toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Income Tax Deduction (TDS)</span>
                    <span style={{ fontWeight: '600', color: '#b91c1c' }}>₹{(selectedSlip.tdsDeduction || 0).toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Group Insurance Policy</span>
                    <span style={{ fontWeight: '600', color: '#b91c1c' }}>₹{(selectedSlip.insuranceDeduction || 0).toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Advance / Loan Recovery</span>
                    <span style={{ fontWeight: '600', color: '#b91c1c' }}>₹{(selectedSlip.advanceDeduction || 0).toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <div style={{ background: '#f8fafc', padding: '10px 14px', borderTop: '2px solid #cbd5e1', fontWeight: '700', fontSize: '13px', color: '#b91c1c', display: 'flex', justifyContent: 'space-between' }}>
                  <span>TOTAL DEDUCTIONS:</span>
                  <span>-₹{(selectedSlip.totalDeductions || 0).toLocaleString('en-IN')}</span>
                </div>
              </div>

            </div>

            {/* NET SALARY ROW */}
            <div style={{
              background: 'linear-gradient(135deg, #0f172a, #1e293b)', color: 'white',
              padding: '16px 20px', borderRadius: '6px', display: 'flex',
              justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'
            }}>
              <div>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', opacity: 0.8, letterSpacing: '0.5px' }}>NET DISBURSED SALARY</div>
                <div style={{ fontSize: '24px', fontWeight: '800', color: '#4ade80' }}>
                  ₹{(selectedSlip.netSalary || 0).toLocaleString('en-IN')}
                </div>
              </div>
              <div style={{ textAlign: 'right', fontSize: '12px' }}>
                <div style={{ color: '#cbd5e1' }}>Amount in words:</div>
                <div style={{ fontWeight: '700', color: 'white' }}>
                  Rupees {numberToWords(selectedSlip.netSalary || 0)}
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
                <strong>Accounts Officer</strong>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ height: '30px' }}></div>
                <strong>Principal / Director</strong>
              </div>
            </div>

          </div>

        </div>
      ) : (
        <div style={{ padding: '60px', textAlign: 'center', color: '#64748b' }}>
          Select an employee above and click "View" to preview payslip.
        </div>
      )}

    </div>
  );
}
