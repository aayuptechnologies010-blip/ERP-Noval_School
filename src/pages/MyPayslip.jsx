import React, { useState, useRef } from 'react';
import { FaDownload, FaPrint } from 'react-icons/fa';
import html2pdf from 'html2pdf.js';

function MyPayslip() {
  const [month, setMonth] = useState('October');
  const [year, setYear] = useState('2023');
  const payslipRef = useRef();

  const handleDownload = () => {
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
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px', display: 'flex', gap: 24, alignItems: 'flex-end' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1, maxWidth: 200 }}>
            <label style={labelStyle}>Select Month</label>
            <select value={month} onChange={e => setMonth(e.target.value)} style={inputStyle}>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1, maxWidth: 200 }}>
            <label style={labelStyle}>Select Year</label>
            <select value={year} onChange={e => setYear(e.target.value)} style={inputStyle}>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
            </select>
          </div>
          
        </div>

        {/* Payslip View */}
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '32px' }}>
          
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
              <p style={{ margin: '4px 0 0 0', color: '#64748b' }}>Payslip for the month of {month} {year}</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 32 }}>
              <div>
                <p style={infoText}><strong>Employee Name:</strong> JOHN DOE</p>
                <p style={infoText}><strong>Designation:</strong> Senior Teacher</p>
              </div>
              <div>
                <p style={infoText}><strong>Employee ID:</strong> EMP12345</p>
                <p style={infoText}><strong>Department:</strong> Science</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 32 }}>
              
              {/* Earnings */}
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: 16, borderBottom: '2px solid #e2e8f0', paddingBottom: 8, color: '#334155' }}>Earnings</h3>
                <div style={amountRow}>
                  <span>Basic Pay</span>
                  <span>₹ 45,000</span>
                </div>
                <div style={amountRow}>
                  <span>House Rent Allowance</span>
                  <span>₹ 8,000</span>
                </div>
                <div style={amountRow}>
                  <span>Conveyance Allowance</span>
                  <span>₹ 2,000</span>
                </div>
                <div style={amountRow}>
                  <span>Medical Allowance</span>
                  <span>₹ 1,500</span>
                </div>
                <div style={{ ...amountRow, fontWeight: 700, borderTop: '1px solid #e2e8f0', paddingTop: 12, marginTop: 12 }}>
                  <span>Gross Earnings</span>
                  <span>₹ 56,500</span>
                </div>
              </div>

              {/* Deductions */}
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: 16, borderBottom: '2px solid #e2e8f0', paddingBottom: 8, color: '#334155' }}>Deductions</h3>
                <div style={amountRow}>
                  <span>Provident Fund (PF)</span>
                  <span>₹ 3,500</span>
                </div>
                <div style={amountRow}>
                  <span>Professional Tax</span>
                  <span>₹ 200</span>
                </div>
                <div style={amountRow}>
                  <span>Income Tax (TDS)</span>
                  <span>₹ 1,800</span>
                </div>
                <div style={{ ...amountRow, fontWeight: 700, borderTop: '1px solid #e2e8f0', paddingTop: 12, marginTop: 60 }}>
                  <span>Total Deductions</span>
                  <span>₹ 5,500</span>
                </div>
              </div>

            </div>

            {/* Net Pay */}
            <div style={{ marginTop: 48, background: '#f8fafc', padding: '16px 24px', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 18, fontWeight: 700, color: '#334155' }}>Net Payable Amount</span>
              <span style={{ fontSize: 24, fontWeight: 800, color: '#16a34a' }}>₹ 51,000</span>
            </div>

            <p style={{ marginTop: 24, fontSize: 12, color: '#94a3b8', textAlign: 'center' }}>
              * This is a computer generated payslip and does not require a physical signature.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

const labelStyle = {
  fontSize: 13, color: '#475569', fontWeight: 600
};

const inputStyle = {
  padding: '10px 12px',
  borderRadius: 4,
  border: '1px solid #cbd5e1',
  outline: 'none',
  fontSize: 14,
  color: '#334155',
  background: '#fff',
  boxSizing: 'border-box'
};

const actionBtn = {
  background: '#fff',
  color: '#475569',
  border: '1px solid #cbd5e1',
  padding: '8px 16px',
  borderRadius: 4,
  fontSize: 13,
  fontWeight: 600,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  transition: '0.3s'
};

const infoText = {
  margin: '0 0 8px 0',
  color: '#475569',
  fontSize: 14
};

const amountRow = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '8px 0',
  color: '#475569',
  fontSize: 14
};

export default MyPayslip;
