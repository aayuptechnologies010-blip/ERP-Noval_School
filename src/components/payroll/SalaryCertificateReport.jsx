import React, { useState, useEffect } from 'react';
import {
  Eye, Download, Printer, RefreshCw, CheckCircle,
  AlertCircle, Sparkles, Building2, ChevronLeft, ChevronRight,
  Filter, Award, ShieldCheck, FileCheck, CheckCircle2
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function SalaryCertificateReport() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Dynamic filter options
  const [filterOptions, setFilterOptions] = useState({
    schools: ['Ayup Tech', 'Ayup Technologies', 'Ayup Tech International'],
    banks: [],
    salaryAccounts: [],
    staffTypes: [],
    months: ['Aug-2026', 'Jul-2026', 'Sep-2026', 'Oct-2026'],
    financialYears: ['2026-2027', '2025-2026'],
    employees: []
  });

  // Sidebar filters
  const [schoolName, setSchoolName] = useState('Ayup Tech');
  const [schoolBank, setSchoolBank] = useState('All School Banks');
  const [salaryAccount, setSalaryAccount] = useState('All Salary A/C');
  const [staffType, setStaffType] = useState('All Staff Types');
  const [selectedStaff, setSelectedStaff] = useState('EMP-AT-001');
  const [salaryMonth, setSalaryMonth] = useState('Aug-2026');
  const [purpose, setPurpose] = useState('Official Bank Verification & Loan Application');

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  const showNotif = (type, text) => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg(null), 4000);
  };

  const fetchFilterOptions = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/salary-structure/monthly-reports-filter-options`, { headers });
      if (res.ok) {
        const json = await res.json();
        setFilterOptions(prev => ({
          ...prev,
          ...json,
          schools: json.schools?.length ? json.schools : ['Ayup Tech'],
          months: json.months?.length ? json.months : ['Aug-2026', 'Jul-2026', 'Sep-2026', 'Oct-2026']
        }));
        if (json.schools?.[0]) setSchoolName(json.schools[0]);
        if (json.employees?.length > 0 && (!selectedStaff || selectedStaff === 'EMP-AT-001')) {
          setSelectedStaff(json.employees[0].employeeId);
        }
      }
    } catch (e) {
      console.error('Failed to load filter options', e);
    }
  };

  const fetchCertificate = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedStaff) params.append('employeeId', selectedStaff);
      if (salaryMonth) params.append('monthYear', salaryMonth);
      if (purpose) params.append('purpose', purpose);

      const res = await fetch(`${API_BASE}/api/salary-structure/salary-certificate-report?${params.toString()}`, { headers });
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        showNotif('error', 'Failed to fetch salary certificate');
      }
    } catch (err) {
      console.error(err);
      showNotif('error', 'Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilterOptions();
    fetchCertificate();
  }, []);

  const handleReset = () => {
    setSchoolName(filterOptions.schools?.[0] || 'Ayup Tech');
    setSchoolBank('All School Banks');
    setSalaryAccount('All Salary A/C');
    setStaffType('All Staff Types');
    setSalaryMonth(filterOptions.months?.[0] || 'Aug-2026');
    setPurpose('Official Bank Verification & Loan Application');
    if (filterOptions.employees?.length > 0) {
      setSelectedStaff(filterOptions.employees[0].employeeId);
    }
    setTimeout(() => fetchCertificate(), 50);
  };

  const emp = data?.employee || {};
  const monthly = data?.monthlySalary || {};
  const annual = data?.annualProjectedSalary || {};
  const signatory = data?.authorizedSignatory || {};

  return (
    <div style={{ display: 'flex', height: '100%', minHeight: '85vh', backgroundColor: '#f4f6f9', fontFamily: 'Inter, sans-serif' }}>
      {/* Toast Notification */}
      {statusMsg && (
        <div style={{
          position: 'fixed', top: '20px', right: '20px', zIndex: 9999,
          padding: '12px 20px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          backgroundColor: statusMsg.type === 'success' ? '#10B981' : '#EF4444',
          color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '500'
        }}>
          {statusMsg.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
          {statusMsg.text}
        </div>
      )}

      {/* Left Filter Sidebar */}
      <div style={{
        width: isSidebarOpen ? '290px' : '0px',
        backgroundColor: '#ffffff',
        borderRight: isSidebarOpen ? '1px solid #e2e8f0' : 'none',
        transition: 'width 0.25s ease',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0
      }}>
        {isSidebarOpen && (
          <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto', height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #edf2f7', paddingBottom: '12px' }}>
              <Filter size={18} color="#159BD7" />
              <span style={{ fontWeight: '700', fontSize: '14px', color: '#1a202c', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Certificate Setup
              </span>
            </div>

            <div className="form-group">
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', display: 'block' }}>School / Entity</label>
              <select value={schoolName} onChange={e => setSchoolName(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '12px' }}>
                {(filterOptions.schools || ['Ayup Tech']).map((sch, idx) => (
                  <option key={idx} value={sch}>{sch}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', display: 'block' }}>School Bank</label>
              <select value={schoolBank} onChange={e => setSchoolBank(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '12px' }}>
                <option>All School Banks</option>
                {(filterOptions.banks || []).map((b, idx) => (
                  <option key={idx} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', display: 'block' }}>Salary A/c No.</label>
              <select value={salaryAccount} onChange={e => setSalaryAccount(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '12px' }}>
                <option>All Salary A/C</option>
                {(filterOptions.salaryAccounts || []).map((a, idx) => (
                  <option key={idx} value={a}>{a}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', display: 'block' }}>Staff Type</label>
              <select value={staffType} onChange={e => setStaffType(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '12px' }}>
                <option>All Staff Types</option>
                {(filterOptions.staffTypes || []).map((t, idx) => (
                  <option key={idx} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', display: 'block' }}>Select Staff / Employee</label>
              <select value={selectedStaff} onChange={e => setSelectedStaff(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '12px', fontWeight: '600' }}>
                {(filterOptions.employees || [
                  { employeeId: 'EMP-AT-001', staffName: 'Ayup Tech Lead' },
                  { employeeId: 'EMP-AT-002', staffName: 'Ayup Sharma' }
                ]).map((e, idx) => (
                  <option key={idx} value={e.employeeId}>{e.staffName} ({e.employeeId})</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', display: 'block' }}>Salary Month</label>
              <select value={salaryMonth} onChange={e => setSalaryMonth(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '12px' }}>
                {(filterOptions.months || ['Aug-2026', 'Jul-2026', 'Sep-2026', 'Oct-2026']).map((m, idx) => (
                  <option key={idx} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', display: 'block' }}>Certificate Purpose</label>
              <select value={purpose} onChange={e => setPurpose(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '12px' }}>
                <option value="Official Bank Verification & Loan Application">Bank Loan Application</option>
                <option value="Visa & Immigration Processing">Visa & Immigration</option>
                <option value="Income Tax & Statutory Assessment">Income Tax Assessment</option>
                <option value="General Employment & Emoluments Verification">General Verification</option>
              </select>
            </div>

            <div style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
              <button
                onClick={fetchCertificate}
                disabled={loading}
                style={{
                  flex: 1, backgroundColor: '#159BD7', color: 'white', border: 'none',
                  padding: '9px 12px', borderRadius: '6px', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '12px'
                }}
              >
                <Eye size={15} /> {loading ? 'Loading...' : 'Show'}
              </button>
              <button
                onClick={handleReset}
                style={{
                  backgroundColor: '#edf2f7', color: '#4a5568', border: '1px solid #cbd5e0',
                  padding: '9px 12px', borderRadius: '6px', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', cursor: 'pointer', fontWeight: '600', fontSize: '12px'
                }}
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Pane */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', overflowX: 'hidden' }}>
        {/* Toggle Sidebar Button */}
        <div
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          style={{
            position: 'absolute', top: '24px', left: isSidebarOpen ? '0px' : '0px',
            transform: isSidebarOpen ? 'translateX(-50%)' : 'none',
            width: '24px', height: '36px', backgroundColor: '#ffffff',
            border: '1px solid #cbd5e0', borderRadius: '0 4px 4px 0',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', zIndex: 40, boxShadow: '2px 0 6px rgba(0,0,0,0.06)'
          }}
          title={isSidebarOpen ? 'Collapse Filter Panel' : 'Expand Filter Panel'}
        >
          {isSidebarOpen ? <ChevronLeft size={14} color="#4a5568" /> : <ChevronRight size={14} color="#4a5568" />}
        </div>

        {/* Content Container */}
        <div style={{ padding: '24px', overflowY: 'auto' }}>
          {/* Header Action Bar */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            backgroundColor: '#ffffff', padding: '16px 20px', borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '20px', flexWrap: 'wrap', gap: '12px'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1a202c', margin: 0 }}>
                  Official Salary Certificate Report
                </h2>
                <span style={{
                  backgroundColor: '#e6fffa', color: '#047481', padding: '2px 8px',
                  borderRadius: '12px', fontSize: '11px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px'
                }}>
                  <Sparkles size={12} /> {salaryMonth}
                </span>
                <span style={{
                  backgroundColor: '#eff6ff', color: '#1d4ed8', padding: '2px 8px',
                  borderRadius: '12px', fontSize: '11px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px'
                }}>
                  <Building2 size={12} /> {schoolName}
                </span>
              </div>
              <p style={{ fontSize: '12px', color: '#718096', margin: '4px 0 0 0' }}>
                Legally formatted salary & emoluments certificate issued for official banking, visa and tax verification
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={fetchCertificate}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 12px',
                  backgroundColor: '#f7fafc', border: '1px solid #cbd5e0', borderRadius: '6px',
                  fontSize: '12px', fontWeight: '500', color: '#4a5568', cursor: 'pointer'
                }}
              >
                <RefreshCw size={13} className={loading ? 'animate-spin' : ''} /> Refresh
              </button>

              <button
                onClick={() => window.print()}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px',
                  backgroundColor: '#159BD7', border: 'none', borderRadius: '6px',
                  fontSize: '12px', fontWeight: '600', color: '#ffffff', cursor: 'pointer'
                }}
              >
                <Printer size={13} /> Print Certificate
              </button>
            </div>
          </div>

          {/* Official Letterhead Certificate Canvas */}
          {data ? (
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              padding: '40px 48px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
              border: '2px solid #e2e8f0',
              maxWidth: '850px',
              margin: '0 auto',
              position: 'relative',
              color: '#2d3748'
            }}>
              {/* Institutional Header with Ayup Tech Branding */}
              <div style={{ textAlign: 'center', borderBottom: '2px solid #159BD7', paddingBottom: '16px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <Building2 size={28} color="#159BD7" />
                  <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: '#1a365d', letterSpacing: '1px' }}>
                    AYUP TECH EDUCATIONAL INSTITUTIONS
                  </h1>
                </div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#4a5568' }}>
                  Department of Human Resource Management & Payroll Administration
                </div>
                <div style={{ fontSize: '11px', color: '#718096', marginTop: '4px' }}>
                  {data.institutionAddress || 'Ayup Tech Knowledge Park, Technology Sector, Sector 62, Noida, UP - 201309'} | Contact: hr@ayuptech.com
                </div>
              </div>

              {/* Reference & Issue Date */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#4a5568', marginBottom: '24px' }}>
                <div><strong>Ref. No:</strong> {data.certificateRef}</div>
                <div><strong>Date of Issue:</strong> {data.issueDate}</div>
              </div>

              {/* Certificate Title */}
              <div style={{ textAlign: 'center', margin: '20px 0 24px 0' }}>
                <span style={{
                  fontSize: '15px', fontWeight: '800', textTransform: 'uppercase',
                  letterSpacing: '1px', borderBottom: '2px solid #2d3748', paddingBottom: '3px'
                }}>
                  Salary & Employment Certificate
                </span>
                <div style={{ fontSize: '12px', color: '#718096', marginTop: '6px', fontStyle: 'italic' }}>
                  (TO WHOMSOEVER IT MAY CONCERN)
                </div>
              </div>

              {/* Body Text */}
              <div style={{ fontSize: '13px', lineHeight: '1.7', textAlign: 'justify', marginBottom: '24px', color: '#2d3748' }}>
                This is to certify that <strong>{emp.staffName}</strong> (Employee ID: <strong>{emp.employeeId}</strong>) is a permanent full-time employee of <strong>Ayup Tech</strong>. The employee is currently designated as <strong>{emp.designation}</strong> in the Department of <strong>{emp.department}</strong>, having joined the institution on <strong>{emp.doj || '15-Jun-2021'}</strong>.
                <br /><br />
                As per official payroll records for the month of <strong>{monthly.monthYear}</strong>, the details of monthly salary and projected annual emoluments drawn by <strong>{emp.staffName}</strong> are as follows:
              </div>

              {/* Emoluments Table */}
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', marginBottom: '24px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#edf2f7', border: '1px solid #cbd5e0' }}>
                    <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: '700' }}>Salary Component</th>
                    <th style={{ padding: '10px 14px', textAlign: 'right', fontWeight: '700' }}>Monthly Amount (₹)</th>
                    <th style={{ padding: '10px 14px', textAlign: 'right', fontWeight: '700' }}>Annual Projected (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ border: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '8px 14px' }}>Basic Salary</td>
                    <td style={{ padding: '8px 14px', textAlign: 'right' }}>₹{(monthly.basicSalary || 0).toLocaleString('en-IN')}</td>
                    <td style={{ padding: '8px 14px', textAlign: 'right' }}>₹{((monthly.basicSalary || 0) * 12).toLocaleString('en-IN')}</td>
                  </tr>
                  <tr style={{ border: '1px solid #e2e8f0', backgroundColor: '#fafafa' }}>
                    <td style={{ padding: '8px 14px' }}>Dearness Allowance (DA)</td>
                    <td style={{ padding: '8px 14px', textAlign: 'right' }}>₹{(monthly.da || 0).toLocaleString('en-IN')}</td>
                    <td style={{ padding: '8px 14px', textAlign: 'right' }}>₹{((monthly.da || 0) * 12).toLocaleString('en-IN')}</td>
                  </tr>
                  <tr style={{ border: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '8px 14px' }}>House Rent Allowance (HRA)</td>
                    <td style={{ padding: '8px 14px', textAlign: 'right' }}>₹{(monthly.hra || 0).toLocaleString('en-IN')}</td>
                    <td style={{ padding: '8px 14px', textAlign: 'right' }}>₹{((monthly.hra || 0) * 12).toLocaleString('en-IN')}</td>
                  </tr>
                  <tr style={{ border: '1px solid #e2e8f0', backgroundColor: '#fafafa' }}>
                    <td style={{ padding: '8px 14px' }}>Special & Conveyance Allowances</td>
                    <td style={{ padding: '8px 14px', textAlign: 'right' }}>
                      ₹{((monthly.conveyance || 0) + (monthly.specialAllowance || 0)).toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '8px 14px', textAlign: 'right' }}>
                      ₹{(((monthly.conveyance || 0) + (monthly.specialAllowance || 0)) * 12).toLocaleString('en-IN')}
                    </td>
                  </tr>
                  <tr style={{ border: '1px solid #cbd5e0', backgroundColor: '#ebf8ff', fontWeight: '700' }}>
                    <td style={{ padding: '9px 14px', color: '#2b6cb0' }}>GROSS SALARY (A)</td>
                    <td style={{ padding: '9px 14px', textAlign: 'right', color: '#2b6cb0' }}>
                      ₹{(monthly.grossSalary || 0).toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '9px 14px', textAlign: 'right', color: '#2b6cb0' }}>
                      ₹{(annual.annualGross || 0).toLocaleString('en-IN')}
                    </td>
                  </tr>
                  <tr style={{ border: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '8px 14px' }}>Provident Fund (PF Contribution)</td>
                    <td style={{ padding: '8px 14px', textAlign: 'right', color: '#e53e3e' }}>₹{(monthly.pfDeduction || 0).toLocaleString('en-IN')}</td>
                    <td style={{ padding: '8px 14px', textAlign: 'right', color: '#e53e3e' }}>₹{((monthly.pfDeduction || 0) * 12).toLocaleString('en-IN')}</td>
                  </tr>
                  <tr style={{ border: '1px solid #e2e8f0', backgroundColor: '#fafafa' }}>
                    <td style={{ padding: '8px 14px' }}>Tax Deducted at Source (TDS / IT)</td>
                    <td style={{ padding: '8px 14px', textAlign: 'right', color: '#e53e3e' }}>₹{(monthly.tdsDeduction || 0).toLocaleString('en-IN')}</td>
                    <td style={{ padding: '8px 14px', textAlign: 'right', color: '#e53e3e' }}>₹{((monthly.tdsDeduction || 0) * 12).toLocaleString('en-IN')}</td>
                  </tr>
                  <tr style={{ border: '1px solid #cbd5e0', backgroundColor: '#fff5f5', fontWeight: '700' }}>
                    <td style={{ padding: '9px 14px', color: '#c53030' }}>TOTAL STATUTORY DEDUCTIONS (B)</td>
                    <td style={{ padding: '9px 14px', textAlign: 'right', color: '#c53030' }}>
                      ₹{(monthly.totalDeductions || 0).toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '9px 14px', textAlign: 'right', color: '#c53030' }}>
                      ₹{(annual.annualDeductions || 0).toLocaleString('en-IN')}
                    </td>
                  </tr>
                  <tr style={{ border: '2px solid #2f855a', backgroundColor: '#f0fff4', fontWeight: '800' }}>
                    <td style={{ padding: '10px 14px', color: '#22543d', fontSize: '13px' }}>NET TAKE-HOME SALARY (A - B)</td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', color: '#22543d', fontSize: '13px' }}>
                      ₹{(monthly.netSalary || 0).toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', color: '#22543d', fontSize: '13px' }}>
                      ₹{(annual.annualNetSalary || 0).toLocaleString('en-IN')}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Banking Details Grid */}
              <div style={{ backgroundColor: '#f7fafc', padding: '12px 16px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '11px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '24px' }}>
                <div><strong>PAN:</strong> {emp.panNumber || 'AYUPT1234A'}</div>
                <div><strong>Bank:</strong> {emp.bankName}</div>
                <div><strong>Account No:</strong> {emp.bankAccountNo}</div>
                <div><strong>IFSC Code:</strong> {emp.ifscCode}</div>
              </div>

              {/* Purpose & Statement */}
              <div style={{ fontSize: '12px', color: '#4a5568', fontStyle: 'italic', marginBottom: '40px' }}>
                This certificate is issued on specific request for the purpose of <strong>{data.purpose}</strong> and does not constitute a financial guarantee on behalf of Ayup Tech.
              </div>

              {/* Signatures & Seal Block */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '10px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '80px', height: '80px', borderRadius: '50%', border: '2px dashed #a0aec0',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a0aec0',
                    fontSize: '10px', textTransform: 'uppercase', margin: '0 auto 6px auto'
                  }}>
                    Ayup Tech<br />Seal
                  </div>
                  <span style={{ fontSize: '11px', color: '#718096' }}>Institutional Seal</span>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Brush Script MT, cursive', fontSize: '20px', color: '#1a365d', marginBottom: '4px' }}>
                    {signatory.name || 'Dr. Ayup Director'}
                  </div>
                  <div style={{ width: '180px', height: '1px', backgroundColor: '#4a5568', margin: '4px auto 6px auto' }} />
                  <div style={{ fontSize: '12px', fontWeight: '700', color: '#1a202c' }}>{signatory.name}</div>
                  <div style={{ fontSize: '11px', color: '#4a5568' }}>{signatory.title}</div>
                  <div style={{ fontSize: '11px', color: '#718096' }}>Ayup Tech Educational Institutions</div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ padding: '60px', textAlign: 'center', color: '#a0aec0' }}>
              Select an employee and click "Show" to preview the certificate.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
