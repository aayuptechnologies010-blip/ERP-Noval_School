import React, { useRef } from 'react';
import { Printer, X } from 'lucide-react';
import schoolLogo from '../../assets/school_logo.png';

// Number to Indian words converter
function numberToWords(num) {
  if (!num || isNaN(num)) return 'ZERO';
  const a = ['', 'ONE ', 'TWO ', 'THREE ', 'FOUR ', 'FIVE ', 'SIX ', 'SEVEN ', 'EIGHT ', 'NINE ', 'TEN ', 'ELEVEN ', 'TWELVE ', 'THIRTEEN ', 'FOURTEEN ', 'FIFTEEN ', 'SIXTEEN ', 'SEVENTEEN ', 'EIGHTEEN ', 'NINETEEN '];
  const b = ['', '', 'TWENTY', 'THIRTY', 'FORTY', 'FIFTY', 'SIXTY', 'SEVENTY', 'EIGHTY', 'NINETY'];

  const regex = /^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/;
  const n = ('000000000' + num).substr(-9).match(regex);
  if (!n) return '';
  let str = '';
  str += (Number(n[1]) !== 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'CRORE ' : '';
  str += (Number(n[2]) !== 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'LAKH ' : '';
  str += (Number(n[3]) !== 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'THOUSAND ' : '';
  str += (Number(n[4]) !== 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'HUNDRED ' : '';
  str += (Number(n[5]) !== 0) ? ((str !== '') ? 'AND ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
  return str.trim();
}

export default function FeeReceiptModal({ receipt, studentData, onClose }) {
  const printRef = useRef(null);

  if (!receipt) return null;

  const std = studentData || receipt.student || {};
  const personal = std.personalDetails || {};
  const academic = std.academicDetails || {};
  const family = std.familyDetails || {};
  const father = family.father || {};
  const mother = family.mother || {};

  const studentName = personal.firstName 
    ? `${personal.firstName} ${personal.middleName || ''} ${personal.lastName || ''}`.replace(/\s+/g, ' ').trim()
    : `${std.firstName || ''} ${std.middleName || ''} ${std.lastName || ''}`.replace(/\s+/g, ' ').trim() || 'RISHU PANKAJ GUPTA';

  const fatherName = father.firstName 
    ? `${father.firstName} ${father.lastName || ''}`.trim()
    : (std.fatherName || 'PANKAJ');

  const motherName = mother.firstName 
    ? `${mother.firstName} ${mother.lastName || ''}`.trim()
    : (std.motherName || 'ARTI');

  const admNo = academic.admissionNumber || std.admissionNumber || receipt.admissionNo || '2520';
  const studentClass = academic.class || std.class || receipt.class || '2';
  const studentSection = academic.section || std.section || receipt.section || 'A';
  const classSec = `${studentClass}-${studentSection}`;

  const receiptNo = receipt.receiptNo || '2231';
  const receiptDate = receipt.receiptDate ? new Date(receipt.receiptDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '14-Aug-2026';
  const installment = receipt.installment || receipt.duration || 'AUGUST';
  const paymentMode = receipt.paymentMode || 'Cash';
  const feeType = receipt.feeType || 'School Fee';
  const amountPaid = Number(receipt.amountPaid || 1500);
  const actualAmount = amountPaid;
  const concessionAmount = Number(receipt.discountAmount || 0);

  const amountInWords = numberToWords(amountPaid) + ' ONLY';

  const handlePrint = () => {
    const printContent = printRef.current.innerHTML;
    const printWindow = window.open('', '', 'width=900,height=800');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Fees Receipt - ${receiptNo}</title>
          <style>
            @page { size: A4; margin: 15mm; }
            body { 
              font-family: Arial, Helvetica, sans-serif; 
              margin: 0; 
              padding: 0; 
              color: #000;
              -webkit-print-color-adjust: exact; 
              print-color-adjust: exact; 
            }
            .receipt-border {
              border: 1.5px solid #000;
              padding: 16px 20px 24px;
              max-width: 750px;
              margin: 0 auto;
              box-sizing: border-box;
            }
            .top-header {
              display: flex;
              align-items: center;
              border-bottom: 2px solid #8b0000;
              padding-bottom: 12px;
              margin-bottom: 10px;
            }
            .logo-box {
              width: 75px;
              height: 75px;
              margin-right: 15px;
              flex-shrink: 0;
            }
            .logo-box img {
              width: 100%;
              height: 100%;
              object-fit: contain;
            }
            .header-text {
              flex: 1;
              text-align: center;
            }
            .school-name {
              font-size: 19px;
              font-weight: 900;
              color: #0c3359;
              letter-spacing: 0.5px;
              margin: 0;
              text-transform: uppercase;
            }
            .school-place {
              font-size: 12px;
              font-weight: bold;
              color: #000;
              margin: 2px 0;
            }
            .affil {
              font-size: 11px;
              color: #333;
              margin: 1px 0;
            }
            .contact-line {
              font-size: 10px;
              font-weight: bold;
              color: #000;
              margin-top: 4px;
            }
            .contact-line a {
              color: #0c3359;
              text-decoration: underline;
            }
            .receipt-title {
              text-align: center;
              font-size: 13px;
              font-weight: 900;
              color: #000;
              text-decoration: underline;
              margin: 10px 0 14px;
              letter-spacing: 0.5px;
            }
            .meta-grid {
              display: flex;
              justify-content: space-between;
              font-size: 11px;
              line-height: 1.6;
              margin-bottom: 14px;
            }
            .meta-col {
              width: 48%;
            }
            .meta-row {
              display: flex;
              margin-bottom: 2px;
            }
            .meta-label {
              width: 110px;
              font-weight: bold;
              color: #111;
            }
            .meta-colon {
              width: 15px;
              font-weight: bold;
            }
            .meta-val {
              flex: 1;
              font-weight: 700;
              color: #000;
            }
            table.fee-tbl {
              width: 100%;
              border-collapse: collapse;
              font-size: 11px;
              margin-bottom: 12px;
              border: 1px solid #000;
            }
            table.fee-tbl th {
              border: 1px solid #000;
              padding: 4px 8px;
              text-align: left;
              font-size: 10.5px;
              font-weight: 800;
              background-color: #ffffff;
            }
            table.fee-tbl th.text-right, table.fee-tbl td.text-right {
              text-align: right;
            }
            table.fee-tbl td {
              border: 1px solid #000;
              padding: 4px 8px;
              font-size: 10.5px;
            }
            table.fee-tbl tr.total-row td {
              font-weight: bold;
            }
            .words-row {
              border-top: 1px solid #000;
              border-bottom: 1px solid #000;
              padding: 5px 0;
              font-size: 11px;
              font-weight: bold;
              margin-bottom: 12px;
            }
            .bottom-summary {
              text-align: right;
              font-size: 11px;
              line-height: 1.5;
              font-weight: bold;
              margin-bottom: 25px;
            }
            .cashier-sign {
              text-align: right;
              font-size: 12px;
              font-weight: bold;
              padding-right: 20px;
            }
          </style>
        </head>
        <body>
          ${printContent}
          <script>
            window.onload = function() { window.print(); window.close(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full border border-gray-200 overflow-hidden my-4">
        
        {/* Top Modal Controls */}
        <div className="bg-[#0c3359] text-white px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold">
            <span>Fee Receipt - {receiptNo}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
            >
              <Printer size={14} /> Print Receipt
            </button>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white p-1 rounded transition hover:bg-white/10 cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Area - Exactly Matching User Image 1 */}
        <div className="p-6 overflow-y-auto max-h-[82vh] bg-gray-50 flex justify-center" ref={printRef}>
          <div className="receipt-border bg-white border border-black p-5 w-full max-w-[680px] shadow-sm text-black font-sans box-border">
            
            {/* Header: Logo on left, School Info centered */}
            <div className="top-header flex items-center border-b-2 border-[#8b0000] pb-3 mb-2.5">
              <div className="logo-box w-16 h-16 mr-3 shrink-0">
                <img src={schoolLogo} alt="School Logo" className="w-full h-full object-contain" />
              </div>
              <div className="header-text flex-1 text-center">
                <h1 className="school-name text-lg font-black text-[#0c3359] uppercase tracking-wide leading-tight">
                  NAVALS NATIONAL ACADEMY
                </h1>
                <p className="school-place text-xs font-bold text-black my-0.5">
                  DOHRIGHAT , MAU
                </p>
                <p className="affil text-[11px] text-gray-700">
                  Affiliated to CBSE, New Delhi
                </p>
                <p className="contact-line text-[10px] font-bold text-black mt-1">
                  Website : <span className="text-[#0c3359] underline">www.navalsnationalacademydohrighat.com</span> | Contact :8299331845
                </p>
              </div>
            </div>

            {/* Sub Title */}
            <div className="receipt-title text-center text-xs font-black text-black underline tracking-wide my-2.5">
              FEES RECEIPT
            </div>

            {/* Meta details: 2 Column Grid */}
            <div className="meta-grid flex justify-between text-[11px] leading-relaxed mb-3">
              <div className="meta-col w-[48%]">
                <div className="meta-row flex">
                  <span className="meta-label w-24 font-bold">Receipt No</span>
                  <span className="meta-colon w-3 font-bold">:</span>
                  <span className="meta-val font-bold">{receiptNo}</span>
                </div>
                <div className="meta-row flex">
                  <span className="meta-label w-24 font-bold">Adm No</span>
                  <span className="meta-colon w-3 font-bold">:</span>
                  <span className="meta-val font-bold">{admNo}</span>
                </div>
                <div className="meta-row flex">
                  <span className="meta-label w-24 font-bold">Name</span>
                  <span className="meta-colon w-3 font-bold">:</span>
                  <span className="meta-val font-bold uppercase">{studentName}</span>
                </div>
                <div className="meta-row flex">
                  <span className="meta-label w-24 font-bold">Father's Name</span>
                  <span className="meta-colon w-3 font-bold">:</span>
                  <span className="meta-val font-bold uppercase">{fatherName}</span>
                </div>
                <div className="meta-row flex">
                  <span className="meta-label w-24 font-bold">Mother's Name</span>
                  <span className="meta-colon w-3 font-bold">:</span>
                  <span className="meta-val font-bold uppercase">{motherName}</span>
                </div>
              </div>

              <div className="meta-col w-[48%]">
                <div className="meta-row flex">
                  <span className="meta-label w-24 font-bold">Date</span>
                  <span className="meta-colon w-3 font-bold">:</span>
                  <span className="meta-val font-bold">{receiptDate}</span>
                </div>
                <div className="meta-row flex">
                  <span className="meta-label w-24 font-bold">Class</span>
                  <span className="meta-colon w-3 font-bold">:</span>
                  <span className="meta-val font-bold">{classSec}</span>
                </div>
                <div className="meta-row flex">
                  <span className="meta-label w-24 font-bold">Installment</span>
                  <span className="meta-colon w-3 font-bold">:</span>
                  <span className="meta-val font-bold uppercase">{installment}</span>
                </div>
                <div className="meta-row flex">
                  <span className="meta-label w-24 font-bold">Payment Mode</span>
                  <span className="meta-colon w-3 font-bold">:</span>
                  <span className="meta-val font-bold">{paymentMode}</span>
                </div>
                <div className="meta-row flex">
                  <span className="meta-label w-24 font-bold">Fee Type</span>
                  <span className="meta-colon w-3 font-bold">:</span>
                  <span className="meta-val font-bold">-{feeType}</span>
                </div>
              </div>
            </div>

            {/* Fee Particulars Table */}
            <table className="fee-tbl w-full border-collapse border border-black text-[11px] mb-2.5">
              <thead>
                <tr className="bg-white border-b border-black">
                  <th className="border border-black px-2 py-1 text-left font-bold w-[34%]">HEAD NAME</th>
                  <th className="border border-black px-2 py-1 text-right font-bold w-[22%]">ACTUAL AMOUNT</th>
                  <th className="border border-black px-2 py-1 text-right font-bold w-[22%]">CONCESSION AMOUNT</th>
                  <th className="border border-black px-2 py-1 text-right font-bold w-[22%]">PAID AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black px-2 py-1 font-semibold uppercase">{receipt.remarks || 'TUITION FEE'}</td>
                  <td className="border border-black px-2 py-1 text-right">{actualAmount}</td>
                  <td className="border border-black px-2 py-1 text-right">{concessionAmount}</td>
                  <td className="border border-black px-2 py-1 text-right font-bold">{amountPaid}</td>
                </tr>
                <tr className="total-row border-t border-black font-bold">
                  <td className="border border-black px-2 py-1">Total</td>
                  <td className="border border-black px-2 py-1 text-right">{actualAmount}</td>
                  <td className="border border-black px-2 py-1 text-right">{concessionAmount}</td>
                  <td className="border border-black px-2 py-1 text-right font-bold">{amountPaid}</td>
                </tr>
              </tbody>
            </table>

            {/* Amount in words */}
            <div className="words-row border-t border-b border-black py-1 px-1 text-[10.5px] font-bold mb-3">
              Amount (in words) : &nbsp; RUPEES {amountInWords}
            </div>

            {/* Total Paid & Dues */}
            <div className="bottom-summary text-right text-[11px] font-bold leading-tight mb-8">
              <div>TOTAL PAID : {amountPaid}</div>
              <div className="text-[10.5px] mt-0.5">DUES : 0.00</div>
            </div>

            {/* Cashier Signature */}
            <div className="cashier-sign text-right font-bold text-xs pr-6">
              Cashier
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
