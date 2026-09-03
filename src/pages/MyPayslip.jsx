import React, { useState, useRef, useEffect } from 'react';
import { FaDownload, FaPrint } from 'react-icons/fa';
import html2pdf from 'html2pdf.js';
import { toast } from 'react-toastify';

function MyPayslip() {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [payslipData, setPayslipData] = useState(null);
  const [loading, setLoading] = useState(false);
  const payslipRef = useRef();

  useEffect(() => {
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    setMonth(currentMonth);
  }, []);

  useEffect(() => {
    if (month && year) {
      fetchPayslip();
    }
  }, [month, year]);

  const fetchPayslip = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const staffId = user._id || user.id;

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/payslips/my-payslip?staffId=${staffId}&month=${month}&year=${year}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const resData = await response.json();
      
      if (response.ok && resData.success && resData.data) {
        setPayslipData(resData.data);
      } else {
        setPayslipData(null);
      }
    } catch (error) {
      console.error("Failed to load payslip", error);
      setPayslipData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!payslipData) return;
    const element = payslipRef.current;
    const opt = {
      margin:       0.5,
      filename:     `Payslip_${month}_${year}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  const handlePrint = () => {
    if (!payslipData) return;
    window.print();
  };

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Header Bar */}
      <div style={{ padding: '24px 32px 16px 32px' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>My Payslip</h1>
      </div>

      {/* Main Content Card */}
      <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
        
        {/* Filters */}
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px', display: 'flex', gap: 24, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1, minWidth: 150, maxWidth: 200 }}>
            <label style={labelStyle}>Select Month</label>
            <select value={month} onChange={e => setMonth(e.target.value)} style={inputStyle}>
              {['January','February','March','April','May','June','July','August','September','October','November','December'].map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1, minWidth: 150, maxWidth: 200 }}>
            <label style={labelStyle}>Select Year</label>
            <select value={year} onChange={e => setYear(e.target.value)} style={inputStyle}>
              {[2023, 2024, 2025, 2026, 2027].map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
          
        </div>

        {/* Payslip View */}
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '32px' }}>
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>Loading payslip...</div>
          ) : !payslipData ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
              No payslip found for {month} {year}.
            </div>
          ) : (
            <>
              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16, marginBottom: 24 }}>
                <button onClick={handlePrint} style={actionBtn}>
                  <FaPrint size={14} /> Print
                </button>
                <button onClick={handleDownload} style={{ ...actionBtn, background: '#5cb85c', color: '#fff', borderColor: '#5cb85c' }}>
                  <FaDownload size={14} /> Download PDF
                </button>
              </div>

              {/* Payslip Document */}
              <div ref={payslipRef} id="payslip-container" style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: '32px', background: '#fff' }}>
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                  <h2 style={{ margin: 0, fontSize: 24, color: '#1e293b' }}>Noval School</h2>
                  <p style={{ margin: '4px 0 0 0', color: '#64748b' }}>Payslip for the month of {payslipData.month} {payslipData.year}</p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 20 }}>
                  <div>
                    <p style={infoText}><strong>Employee Name:</strong> {payslipData.employeeName}</p>
                    <p style={infoText}><strong>Designation:</strong> {payslipData.designation}</p>
                  </div>
                  <div>
                    <p style={infoText}><strong>Employee ID:</strong> {payslipData.employeeId}</p>
                    <p style={infoText}><strong>Department:</strong> {payslipData.department}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
                  
                  {/* Earnings */}
                  <div style={{ flex: 1, minWidth: 250 }}>
                    <h3 style={{ fontSize: 16, borderBottom: '2px solid #e2e8f0', paddingBottom: 8, color: '#334155' }}>Earnings</h3>
                    <div style={amountRow}>
                      <span>Basic Pay</span>
                      <span>₹ {payslipData.earnings.basicPay || 0}</span>
                    </div>
                    <div style={amountRow}>
                      <span>House Rent Allowance</span>
                      <span>₹ {payslipData.earnings.houseRentAllowance || 0}</span>
                    </div>
                    <div style={amountRow}>
                      <span>Conveyance Allowance</span>
                      <span>₹ {payslipData.earnings.conveyanceAllowance || 0}</span>
                    </div>
                    <div style={amountRow}>
                      <span>Medical Allowance</span>
                      <span>₹ {payslipData.earnings.medicalAllowance || 0}</span>
                    </div>
                    <div style={{ ...amountRow, fontWeight: 700, marginTop: 16, borderTop: '1px solid #e2e8f0', paddingTop: 8 }}>
                      <span>Gross Earnings</span>
                      <span style={{ color: '#16a34a' }}>₹ {payslipData.earnings.grossEarnings || 0}</span>
                    </div>
                  </div>

                  {/* Deductions */}
                  <div style={{ flex: 1, minWidth: 250 }}>
                    <h3 style={{ fontSize: 16, borderBottom: '2px solid #e2e8f0', paddingBottom: 8, color: '#334155' }}>Deductions</h3>
                    <div style={amountRow}>
                      <span>Provident Fund</span>
                      <span>₹ {payslipData.deductions.providentFund || 0}</span>
                    </div>
                    <div style={amountRow}>
                      <span>Professional Tax</span>
                      <span>₹ {payslipData.deductions.professionalTax || 0}</span>
                    </div>
                    <div style={amountRow}>
                      <span>Income Tax</span>
                      <span>₹ {payslipData.deductions.incomeTax || 0}</span>
                    </div>
                    <div style={{ ...amountRow, fontWeight: 700, marginTop: 16, borderTop: '1px solid #e2e8f0', paddingTop: 8 }}>
                      <span>Total Deductions</span>
                      <span style={{ color: '#ef4444' }}>₹ {payslipData.deductions.totalDeductions || 0}</span>
                    </div>
                  </div>
                </div>

                {/* Net Pay */}
                <div style={{ marginTop: 32, background: '#f8fafc', padding: 24, borderRadius: 8, border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 18, fontWeight: 700, color: '#334155' }}>Net Payable Amount</span>
                  <span style={{ fontSize: 24, fontWeight: 800, color: '#2b3674' }}>₹ {payslipData.netPayableAmount || 0}</span>
                </div>

              </div>
            </>
          )}

        </div>

      </div>
    </div>
  );
}

const inputStyle = {
  padding: '10px 12px',
  borderRadius: 6,
  border: '1px solid #cbd5e1',
  outline: 'none',
  fontSize: 14,
  color: '#334155',
  background: '#f8fafc'
};

const labelStyle = {
  fontSize: 13,
  fontWeight: 600,
  color: '#64748b'
};

const actionBtn = {
  padding: '8px 16px',
  background: '#fff',
  border: '1px solid #cbd5e1',
  borderRadius: 6,
  color: '#475569',
  fontSize: 14,
  fontWeight: 600,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  transition: 'all 0.2s'
};

const infoText = {
  margin: '0 0 8px 0',
  fontSize: 14,
  color: '#475569'
};

const amountRow = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '8px 0',
  fontSize: 14,
  color: '#475569'
};

export default MyPayslip;
