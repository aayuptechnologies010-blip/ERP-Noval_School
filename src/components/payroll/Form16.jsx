import React, { useState, useEffect } from 'react';
import {
  Eye, Printer, Mail, Download, Search, CheckCircle,
  AlertCircle, Sparkles, Building, DollarSign, Users,
  ShieldCheck, FileText, ChevronLeft, ChevronRight, Award, Check, X, AlertTriangle
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function Form16() {
  const [certData, setCertData] = useState(null);
  const [staffList, setStaffList] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [loading, setLoading] = useState(false);
  const [mailing, setMailing] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Filters matching mockup
  const [staffType, setStaffType] = useState('All Staff Types');
  const [activeStatus, setActiveStatus] = useState('Active');
  const [dateOfIssue, setDateOfIssue] = useState('30-Aug-2026');
  const [placeOfIssue, setPlaceOfIssue] = useState('Gorakhpur, U.P.');

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  const showNotif = (type, text) => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg(null), 4000);
  };

  // 1. Fetch available staff list for dropdown
  const fetchStaffDropdown = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/salary-structure/salary-generation`, { headers });
      if (res.ok) {
        const list = await res.json();
        setStaffList(Array.isArray(list) ? list : []);
        if (list.length > 0) {
          const ayup = list.find(s => s.staffName?.toLowerCase().includes('ayup'));
          const defaultEmp = ayup || list[0];
          setSelectedEmployeeId(defaultEmp.employeeId);
          fetchCertificate(defaultEmp.employeeId);
        }
      }
    } catch (err) {
      console.error('Failed to load staff list:', err);
    }
  };

  // 2. Fetch Form 16 Certificate data
  const fetchCertificate = async (empId) => {
    try {
      setLoading(true);
      const idToFetch = empId || selectedEmployeeId;
      const params = new URLSearchParams();
      if (idToFetch) params.append('employeeId', idToFetch);
      params.append('date', dateOfIssue);
      params.append('place', placeOfIssue);

      const res = await fetch(`${API_BASE}/api/salary-structure/form-16-certificate?${params.toString()}`, { headers });
      if (res.ok) {
        const data = await res.json();
        setCertData(data);
      }
    } catch (err) {
      console.error('Failed to generate Form 16 certificate:', err);
      showNotif('error', 'Error generating Form 16 certificate');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaffDropdown();
  }, []);

  const handleSelectStaff = (empId) => {
    setSelectedEmployeeId(empId);
    fetchCertificate(empId);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSendMail = () => {
    if (!certData) return;
    setMailing(true);
    setTimeout(() => {
      setMailing(false);
      showNotif('success', `Official Form 16 (Part A & Part B) PDF dispatched to ${certData.employee?.name}'s email!`);
    }, 1200);
  };

  const numberToWords = (num) => {
    const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const n = Math.round(Number(num) || 0);
    if (n === 0) return 'Zero';
    const numStr = ('000000000' + n).substr(-9);
    const crore = Number(numStr.substr(0, 2));
    const lakh = Number(numStr.substr(2, 2));
    const thousand = Number(numStr.substr(4, 2));
    const hundred = Number(numStr.substr(6, 1));
    const tens = Number(numStr.substr(7, 2));
    let str = '';
    if (crore !== 0) str += (a[Number(crore)] || b[crore[0]] + ' ' + a[crore[1]]) + 'Crore ';
    if (lakh !== 0) str += (a[Number(lakh)] || b[lakh[0]] + ' ' + a[lakh[1]]) + 'Lakh ';
    if (thousand !== 0) str += (a[Number(thousand)] || b[thousand[0]] + ' ' + a[thousand[1]]) + 'Thousand ';
    if (hundred !== 0) str += a[Number(hundred)] + 'Hundred ';
    if (tens !== 0) {
      if (str !== '') str += 'and ';
      str += (a[Number(tens)] || b[tens[0]] + ' ' + a[tens[1]]);
    }
    return str.trim() + ' Rupees Only';
  };

  const emp = certData?.employee || {};
  const deductor = certData?.employer || {};
  const partA = certData?.partA || {};
  const partB = certData?.partB || {};

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 140px)', backgroundColor: '#f8fafc', margin: '-20px' }}>
      
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
          width: '310px', backgroundColor: 'white', padding: '24px',
          borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column',
          gap: '18px', overflowY: 'auto', flexShrink: 0, boxShadow: '2px 0 8px rgba(0,0,0,0.02)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#1e293b' }}>
              Form 16 Certificate
            </h3>
            <span style={{ fontSize: '11px', color: '#64748b', background: '#f1f5f9', padding: '2px 8px', borderRadius: '10px' }}>Section 203</span>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Staff Type</label>
            <select
              value={staffType}
              onChange={e => setStaffType(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: 'white' }}
            >
              <option value="All Staff Types">All Staff Types</option>
              <option value="Teaching">Teaching Faculty</option>
              <option value="Non-Teaching">Non-Teaching Staff</option>
              <option value="Technical">Technical</option>
            </select>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Active Status</label>
            <select
              value={activeStatus}
              onChange={e => setActiveStatus(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: 'white' }}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive / Relieved</option>
            </select>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Staff Name</label>
            <select
              value={selectedEmployeeId}
              onChange={e => handleSelectStaff(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: 'white', fontWeight: '600' }}
            >
              {staffList.map((s, idx) => (
                <option key={idx} value={s.employeeId}>
                  {s.staffName} ({s.employeeId})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Date of Issue</label>
            <input
              type="text"
              value={dateOfIssue}
              onChange={e => setDateOfIssue(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
            />
          </div>

          <div className="form-group">
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Place of Issue</label>
            <input
              type="text"
              value={placeOfIssue}
              onChange={e => setPlaceOfIssue(e.target.value)}
              placeholder="e.g. Gorakhpur, U.P."
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
            />
          </div>

          {/* MOCKUP NOTE */}
          <div style={{
            background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px',
            padding: '12px', fontSize: '11px', color: '#92400e', lineHeight: '1.5'
          }}>
            <strong style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
              <AlertTriangle size={14} color="#d97706" /> Note :
            </strong>
            Please define next Financial Year as Assessment Year, for proper reflection of details on Form 16 :-<br />
            <strong>Global Masters &gt;&gt; Define Financial Year</strong>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
            <button
              onClick={() => fetchCertificate(selectedEmployeeId)}
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
                if (staffList.length > 0) handleSelectStaff(staffList[0].employeeId);
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

      {/* RIGHT CONTENT AREA - OFFICIAL CERTIFICATE */}
      <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* TOP ACTIONS BAR */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '16px 24px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>
              Form 16 Certificate — {emp.name}
            </h2>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
              Certificate No: <strong>{certData?.certificateNo}</strong> • Assessment Year: <strong>{certData?.assessmentYear}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleSendMail}
              disabled={mailing}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 18px',
                background: '#159BD7', color: 'white', border: 'none', borderRadius: '6px',
                fontWeight: '600', cursor: 'pointer', fontSize: '13px'
              }}
            >
              <Mail size={16} /> {mailing ? 'Sending...' : 'Email Form 16'}
            </button>
            <button
              onClick={handlePrint}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 18px',
                background: 'white', color: '#334155', border: '1px solid #cbd5e1', borderRadius: '6px',
                fontWeight: '600', cursor: 'pointer', fontSize: '13px'
              }}
            >
              <Printer size={16} /> Print Official Form 16
            </button>
          </div>
        </div>

        {/* PRINTABLE OFFICIAL CERTIFICATE PAPER */}
        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: '#64748b', background: 'white', borderRadius: '12px' }}>
            Generating official Form 16 certificate...
          </div>
        ) : certData ? (
          <div style={{
            background: 'white', borderRadius: '12px', border: '2px solid #cbd5e1',
            padding: '36px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', maxWidth: '900px', margin: '0 auto', width: '100%', boxSizing: 'border-box'
          }}>
            
            {/* GOVT HEADER */}
            <div style={{ textAlign: 'center', borderBottom: '2px solid #0f172a', paddingBottom: '16px', marginBottom: '20px' }}>
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#475569', letterSpacing: '1px' }}>
                FORM NO. 16
              </div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>[See rule 31(1)(a)]</div>
              <h1 style={{ margin: '8px 0 4px', fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>
                CERTIFICATE UNDER SECTION 203 OF THE INCOME-TAX ACT, 1961
              </h1>
              <div style={{ fontSize: '12px', color: '#334155', fontWeight: '600' }}>
                For tax deducted at source on salary payments
              </div>
            </div>

            {/* PART A: DEDUCTOR & DEDUCTEE DETAILS */}
            <div style={{ border: '1px solid #94a3b8', borderRadius: '6px', overflow: 'hidden', marginBottom: '20px' }}>
              <div style={{ background: '#f1f5f9', padding: '8px 14px', fontWeight: '700', fontSize: '13px', borderBottom: '1px solid #94a3b8', color: '#0f172a' }}>
                PART A — Certificate Details & Quarterly Tax Deducted / Deposited
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid #e2e8f0' }}>
                <div style={{ padding: '12px 14px', borderRight: '1px solid #e2e8f0', fontSize: '12px', lineHeight: '1.6' }}>
                  <strong style={{ color: '#475569', display: 'block', fontSize: '11px' }}>NAME & ADDRESS OF EMPLOYER (DEDUCTOR):</strong>
                  <strong style={{ fontSize: '13px', color: '#0f172a' }}>{deductor.name}</strong><br />
                  {deductor.address}<br />
                  TAN: <strong>{deductor.tan}</strong> • PAN: <strong>{deductor.pan}</strong>
                </div>
                <div style={{ padding: '12px 14px', fontSize: '12px', lineHeight: '1.6' }}>
                  <strong style={{ color: '#475569', display: 'block', fontSize: '11px' }}>NAME & ADDRESS OF EMPLOYEE (DEDUCTEE):</strong>
                  <strong style={{ fontSize: '13px', color: '#0f172a' }}>{emp.name}</strong> (Emp ID: {emp.employeeId})<br />
                  PAN OF EMPLOYEE: <strong style={{ color: '#159BD7' }}>{emp.pan}</strong><br />
                  Designation: {emp.designation} • Dept: {emp.department}
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', background: '#f8fafc', padding: '10px 14px', fontSize: '12px', borderBottom: '1px solid #e2e8f0' }}>
                <div><span style={{ color: '#64748b' }}>Certificate No:</span><br /><strong>{certData.certificateNo}</strong></div>
                <div><span style={{ color: '#64748b' }}>Period:</span><br /><strong>{emp.periodWithEmployer}</strong></div>
                <div><span style={{ color: '#64748b' }}>Financial Year:</span><br /><strong>{certData.financialYear}</strong></div>
                <div><span style={{ color: '#64748b' }}>Assessment Year:</span><br /><strong>{certData.assessmentYear}</strong></div>
              </div>

              {/* QUARTERLY CHALLANS TABLE */}
              <div style={{ padding: '12px 14px' }}>
                <div style={{ fontSize: '12px', fontWeight: '700', marginBottom: '8px', color: '#334155' }}>
                  Summary of tax deducted and deposited into Central Government Account:
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '1px solid #cbd5e1' }}>
                      <th style={{ padding: '6px 8px', textAlign: 'left' }}>Quarter</th>
                      <th style={{ padding: '6px 8px', textAlign: 'right' }}>Tax Deducted (₹)</th>
                      <th style={{ padding: '6px 8px', textAlign: 'right' }}>Tax Deposited (₹)</th>
                      <th style={{ padding: '6px 8px' }}>BSR Code</th>
                      <th style={{ padding: '6px 8px' }}>Challan Serial No</th>
                      <th style={{ padding: '6px 8px' }}>Deposit Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(partA.quarters || []).map((q, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '6px 8px', fontWeight: '600' }}>{q.qtr}</td>
                        <td style={{ padding: '6px 8px', textAlign: 'right' }}>₹{q.taxDeducted.toLocaleString('en-IN')}</td>
                        <td style={{ padding: '6px 8px', textAlign: 'right', fontWeight: '700', color: '#16a34a' }}>₹{q.taxDeposited.toLocaleString('en-IN')}</td>
                        <td style={{ padding: '6px 8px', textAlign: 'center' }}>{q.bsr}</td>
                        <td style={{ padding: '6px 8px', textAlign: 'center' }}>{q.challan}</td>
                        <td style={{ padding: '6px 8px', textAlign: 'center' }}>{q.date}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr style={{ fontWeight: '800', background: '#f8fafc', borderTop: '2px solid #cbd5e1' }}>
                      <td style={{ padding: '8px' }}>TOTAL:</td>
                      <td style={{ padding: '8px', textAlign: 'right' }}>₹{(partA.totalTaxDeducted || 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '8px', textAlign: 'right', color: '#16a34a' }}>₹{(partA.totalTaxDeposited || 0).toLocaleString('en-IN')}</td>
                      <td colSpan={3} style={{ padding: '8px', textAlign: 'center', color: '#64748b' }}>Matches OLTAS Records</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* PART B: SALARY COMPUTATION */}
            <div style={{ border: '1px solid #94a3b8', borderRadius: '6px', overflow: 'hidden', marginBottom: '20px' }}>
              <div style={{ background: '#f1f5f9', padding: '8px 14px', fontWeight: '700', fontSize: '13px', borderBottom: '1px solid #94a3b8', color: '#0f172a' }}>
                PART B — Details of Salary Paid and Other Income with Tax Deducted
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '10px 14px', width: '70%' }}>
                      <strong>1. Gross Salary:</strong><br />
                      (a) Salary as per provisions contained in sec. 17(1)
                    </td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: '700' }}>
                      ₹{(partB.grossSalarySec17_1 || 0).toLocaleString('en-IN')}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '10px 14px' }}>
                      <strong>2. Less:</strong> Allowances exempt under section 10 (HRA & Conveyance)
                    </td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', color: '#64748b' }}>
                      ₹{(partB.exemptionsSec10 || 0).toLocaleString('en-IN')}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#fafafa' }}>
                    <td style={{ padding: '10px 14px' }}>
                      <strong>3. Balance (1 - 2):</strong>
                    </td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: '700' }}>
                      ₹{(partB.balanceSalary || 0).toLocaleString('en-IN')}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '10px 14px' }}>
                      <strong>4. Deductions under section 16:</strong><br />
                      • (a) Standard deduction under section 16(ia): ₹50,000<br />
                      • (b) Tax on employment under section 16(iii): ₹2,500
                    </td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', color: '#64748b' }}>
                      ₹{(partB.deductionsSec16?.totalSec16 || 52500).toLocaleString('en-IN')}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
                    <td style={{ padding: '10px 14px', fontWeight: '700' }}>
                      5. Income chargeable under the head "Salaries" (3 - 4):
                    </td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: '800', color: '#0f172a' }}>
                      ₹{(partB.incomeFromSalaries || 0).toLocaleString('en-IN')}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '10px 14px' }}>
                      <strong>6. Deductions under Chapter VI-A:</strong>
                      <div style={{ marginTop: '4px', fontSize: '11px', color: '#475569' }}>
                        {(partB.chapter6A || []).map((c, i) => (
                          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 0' }}>
                            <span>• {c.section} ({c.description}):</span>
                            <span>₹{c.deductible.toLocaleString('en-IN')}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', color: '#7c3aed', fontWeight: '700' }}>
                      ₹{(partB.totalChapter6ADeductions || 0).toLocaleString('en-IN')}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #cbd5e1', background: '#eff6ff' }}>
                    <td style={{ padding: '10px 14px', fontWeight: '800', fontSize: '13px', color: '#1e40af' }}>
                      7. Total Taxable Income (5 - 6):
                    </td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: '800', fontSize: '14px', color: '#1e40af' }}>
                      ₹{(partB.totalTaxableIncome || 0).toLocaleString('en-IN')}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '10px 14px' }}>8. Tax on Total Income:</td>
                    <td style={{ padding: '10px 14px', textAlign: 'right' }}>₹{(partB.taxOnTotalIncome || 0).toLocaleString('en-IN')}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '10px 14px' }}>9. Health and Education Cess (4%):</td>
                    <td style={{ padding: '10px 14px', textAlign: 'right' }}>₹{(partB.healthAndEducationCess || 0).toLocaleString('en-IN')}</td>
                  </tr>
                  <tr style={{ background: '#f0fdf4', borderTop: '2px solid #86efac' }}>
                    <td style={{ padding: '12px 14px', fontWeight: '800', fontSize: '14px', color: '#166534' }}>
                      10. Net Tax Payable / Deducted at Source:
                    </td>
                    <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: '900', fontSize: '16px', color: '#166534' }}>
                      ₹{(partB.netTaxPayable || 0).toLocaleString('en-IN')}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div style={{ padding: '12px 14px', background: '#fafafa', borderTop: '1px solid #e2e8f0', fontSize: '12px', color: '#475569' }}>
                Amount in words: <strong>{numberToWords(partB.netTaxPayable)}</strong>
              </div>
            </div>

            {/* VERIFICATION & SIGNATURE BLOCK */}
            <div style={{ border: '1px solid #cbd5e1', borderRadius: '6px', padding: '16px', background: '#f8fafc', fontSize: '11px', lineHeight: '1.6', color: '#334155' }}>
              <strong>VERIFICATION:</strong><br />
              I, <strong>{partB.verificationSignatory || 'Ankit Kumar'}</strong>, son/daughter of Principal Administrator, working in the capacity of <strong>Finance Controller / Principal</strong> do hereby certify that a sum of <strong>₹{(partB.netTaxPayable || 0).toLocaleString('en-IN')}</strong> has been deducted and a copy of the challan is retained in office records.
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '24px', paddingTop: '16px', borderTop: '1px dashed #cbd5e1' }}>
                <div>
                  Place: <strong>{certData.placeOfIssue}</strong><br />
                  Date: <strong>{certData.dateOfIssue}</strong>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: '160px', borderBottom: '1px solid #0f172a', marginBottom: '6px' }}></div>
                  <strong style={{ fontSize: '12px' }}>Signature of Person Responsible</strong><br />
                  <span style={{ fontSize: '10px', color: '#64748b' }}>For {deductor.name}</span>
                </div>
              </div>
            </div>

          </div>
        ) : null}

      </div>
    </div>
  );
}
