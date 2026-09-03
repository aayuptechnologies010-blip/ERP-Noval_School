import React, { useState, useEffect } from 'react';
import { Eye, Building2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function ChequeReportDateWiseBankReport() {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState({ cleared: 0, bounced: 0, pending: 0, total: 0 });

  useEffect(() => {
    fetchReceipts();
  }, []);

  const fetchReceipts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/fee-transactions/receipts`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        // Get all bank-related receipts (Cheque, DD)
        const bankReceipts = data.filter(r => r.paymentMode === 'Cheque' || r.paymentMode === 'DD');
        setReceipts(bankReceipts);
        
        let c = 0, b = 0, p = 0, t = 0;
        bankReceipts.forEach(r => {
          t += r.amountPaid;
          if (r.chequeStatus === 'Cleared') c += r.amountPaid;
          if (r.chequeStatus === 'Bounced') b += r.amountPaid;
          if (r.chequeStatus === 'Pending') p += r.amountPaid;
        });
        setSummary({ cleared: c, bounced: b, pending: p, total: t });
      }
    } catch (error) {
      console.error('Error fetching bank receipts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100%', background: '#f3f4f6' }}>
      
      {/* Side Panel */}
      <div style={{ width: '250px', background: '#fff', borderRight: '1px solid #e5e7eb', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px', flexShrink: 0, overflowY: 'auto' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#1f2937', fontWeight: 'bold', fontSize: '14px', borderBottom: '1px solid #e5e7eb', paddingBottom: '10px' }}>
          <Building2 size={18} />
          Bank Sheet Filters
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Date Range</label>
          <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }}>
            <option>All Time</option>
            <option>Today</option>
            <option>This Month</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Pay Mode</label>
          <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }}>
            <option>All Bank Modes (Cheque/DD)</option>
            <option>Cheque</option>
            <option>DD</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Status</label>
          <select style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }}>
            <option>All</option>
            <option>Pending</option>
            <option>Cleared</option>
            <option>Bounced</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button onClick={fetchReceipts} style={{ flex: 1, background: '#29a9d8', color: '#fff', border: 'none', padding: '8px 10px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <Eye size={14} /> View Sheet
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        <div style={{ display: 'flex', gap: '15px' }}>
          <div style={{ flex: 1, background: '#fff', padding: '15px', borderRadius: '4px', borderLeft: '4px solid #3b82f6', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', fontWeight: 'bold' }}>Total Bank Collections</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', marginTop: '5px' }}>₹{summary.total}</div>
          </div>
          <div style={{ flex: 1, background: '#fff', padding: '15px', borderRadius: '4px', borderLeft: '4px solid #10b981', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', fontWeight: 'bold' }}>Cleared Amount</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981', marginTop: '5px' }}>₹{summary.cleared}</div>
          </div>
          <div style={{ flex: 1, background: '#fff', padding: '15px', borderRadius: '4px', borderLeft: '4px solid #f59e0b', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', fontWeight: 'bold' }}>Pending Clearance</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f59e0b', marginTop: '5px' }}>₹{summary.pending}</div>
          </div>
          <div style={{ flex: 1, background: '#fff', padding: '15px', borderRadius: '4px', borderLeft: '4px solid #ef4444', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', fontWeight: 'bold' }}>Bounced Amount</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ef4444', marginTop: '5px' }}>₹{summary.bounced}</div>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden', display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div style={{ padding: '15px 20px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '16px', color: '#1f2937' }}>Bank Transaction Sheet</h3>
          </div>
          
          <div style={{ overflow: 'auto', flex: 1 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead style={{ position: 'sticky', top: 0, background: '#f9fafb', zIndex: 1 }}>
                <tr>
                  <th style={{ padding: '12px 15px', textAlign: 'left', color: '#4b5563', borderBottom: '2px solid #e5e7eb' }}>Receipt Date</th>
                  <th style={{ padding: '12px 15px', textAlign: 'left', color: '#4b5563', borderBottom: '2px solid #e5e7eb' }}>Receipt No</th>
                  <th style={{ padding: '12px 15px', textAlign: 'left', color: '#4b5563', borderBottom: '2px solid #e5e7eb' }}>Student Name</th>
                  <th style={{ padding: '12px 15px', textAlign: 'left', color: '#4b5563', borderBottom: '2px solid #e5e7eb' }}>Mode</th>
                  <th style={{ padding: '12px 15px', textAlign: 'left', color: '#4b5563', borderBottom: '2px solid #e5e7eb' }}>Ref No / Bank</th>
                  <th style={{ padding: '12px 15px', textAlign: 'center', color: '#4b5563', borderBottom: '2px solid #e5e7eb' }}>Status</th>
                  <th style={{ padding: '12px 15px', textAlign: 'right', color: '#4b5563', borderBottom: '2px solid #e5e7eb' }}>Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                   <tr>
                     <td colSpan="7" style={{ padding: '30px', textAlign: 'center', color: '#6b7280' }}>Loading bank sheet...</td>
                   </tr>
                ) : receipts.length === 0 ? (
                   <tr>
                     <td colSpan="7" style={{ padding: '30px', textAlign: 'center', color: '#6b7280' }}>No bank transactions found.</td>
                   </tr>
                ) : (
                  receipts.map(receipt => (
                    <tr key={receipt._id} style={{ borderBottom: '1px solid #e5e7eb', '&:hover': { background: '#f9fafb' } }}>
                      <td style={{ padding: '12px 15px', color: '#374151' }}>{new Date(receipt.receiptDate).toLocaleDateString()}</td>
                      <td style={{ padding: '12px 15px', color: '#374151', fontWeight: 'bold' }}>{receipt.receiptNo}</td>
                      <td style={{ padding: '12px 15px', color: '#374151' }}>{receipt.student?.firstName} {receipt.student?.lastName}</td>
                      <td style={{ padding: '12px 15px', color: '#374151' }}>{receipt.paymentMode}</td>
                      <td style={{ padding: '12px 15px', color: '#374151' }}>
                        <div>{receipt.referenceNumber || 'N/A'}</div>
                        <div style={{ fontSize: '10px', color: '#6b7280' }}>{receipt.bankName}</div>
                      </td>
                      <td style={{ padding: '12px 15px', textAlign: 'center' }}>
                        <span style={{ 
                          padding: '4px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold',
                          background: receipt.chequeStatus === 'Pending' ? '#fef3c7' : (receipt.chequeStatus === 'Cleared' ? '#d1fae5' : '#fee2e2'),
                          color: receipt.chequeStatus === 'Pending' ? '#92400e' : (receipt.chequeStatus === 'Cleared' ? '#065f46' : '#991b1b')
                        }}>
                          {receipt.chequeStatus}
                        </span>
                      </td>
                      <td style={{ padding: '12px 15px', color: '#374151', fontWeight: 'bold', textAlign: 'right' }}>
                        {receipt.amountPaid.toFixed(2)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
