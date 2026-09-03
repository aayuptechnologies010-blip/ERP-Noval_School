import React, { useState, useEffect } from 'react';
import { Search, CheckCircle, XCircle } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function FeeChequeClearing() {
  const [receipts, setReceipts] = useState([]);
  const [filteredReceipts, setFilteredReceipts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchReceipts();
  }, []);

  const fetchReceipts = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/fee-transactions/receipts`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        // Only get active Cheque receipts
        const chequeReceipts = data.filter(r => 
          (r.paymentMode === 'Cheque' || r.paymentMode === 'DD') && r.status === 'Successful'
        );
        setReceipts(chequeReceipts);
        setFilteredReceipts(chequeReceipts);
      }
    } catch (error) {
      console.error('Error fetching receipts:', error);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (!query) {
      setFilteredReceipts(receipts);
      return;
    }
    
    const filtered = receipts.filter(r => 
      r.receiptNo?.toLowerCase().includes(query) || 
      r.student?.firstName?.toLowerCase().includes(query) || 
      r.student?.admissionNumber?.includes(query) ||
      r.referenceNumber?.toLowerCase().includes(query)
    );
    setFilteredReceipts(filtered);
  };

  const handleUpdateStatus = async (receiptId, status) => {
    let bounceReason = '';
    
    if (status === 'Bounced') {
      bounceReason = window.prompt("Enter the reason for cheque bounce:");
      if (bounceReason === null) return; // User cancelled
      
      if (!window.confirm("WARNING: Bouncing a cheque will mark the receipt as Cancelled and reverse the student's ledger balances. Proceed?")) {
        return;
      }
    } else if (status === 'Cleared') {
      if (!window.confirm("Mark this cheque as cleared?")) {
        return;
      }
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/fee-transactions/cheque-status/${receiptId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status, bounceReason })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update cheque status');
      
      setIsError(false);
      setMessage(`Cheque marked as ${status} successfully!`);
      
      // Refresh list
      fetchReceipts();
      
      setTimeout(() => setMessage(null), 4000);
    } catch (error) {
      setIsError(true);
      setMessage(error.message);
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', background: '#fff', minHeight: '100%', display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
      
      {message && (
        <div style={{
          position: 'absolute', top: '10px', right: '10px', padding: '10px 20px',
          borderRadius: '4px', background: isError ? '#ef4444' : '#10b981', color: '#fff', zIndex: 1000
        }}>
          {message}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: '20px' }}>
        <h2 style={{ margin: 0, fontSize: '18px', color: '#1f2937' }}>Cheque Clearance Processing</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Search size={16} color="#6b7280" />
          <input 
            type="text" 
            placeholder="Search by Name, Adm No, Cheque No..."
            value={searchQuery}
            onChange={handleSearch}
            style={{ padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px', width: '250px' }} 
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ padding: '15px', background: '#f3f4f6', borderRadius: '4px', flex: 1, borderLeft: '4px solid #3b82f6' }}>
          <div style={{ fontSize: '12px', color: '#4b5563', marginBottom: '4px' }}>Pending Cheques</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>
            {receipts.filter(r => r.chequeStatus === 'Pending').length}
          </div>
        </div>
        <div style={{ padding: '15px', background: '#f0fdf4', borderRadius: '4px', flex: 1, borderLeft: '4px solid #10b981' }}>
          <div style={{ fontSize: '12px', color: '#4b5563', marginBottom: '4px' }}>Cleared Cheques</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>
            {receipts.filter(r => r.chequeStatus === 'Cleared').length}
          </div>
        </div>
        <div style={{ padding: '15px', background: '#fef2f2', borderRadius: '4px', flex: 1, borderLeft: '4px solid #ef4444' }}>
          <div style={{ fontSize: '12px', color: '#4b5563', marginBottom: '4px' }}>Bounced Cheques</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>
            {receipts.filter(r => r.chequeStatus === 'Bounced').length}
          </div>
        </div>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px', fontSize: '12px' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #e5e7eb', background: '#f9fafb' }}>
            <th style={{ padding: '12px 8px', textAlign: 'left', color: '#374151' }}>Receipt No.</th>
            <th style={{ padding: '12px 8px', textAlign: 'left', color: '#374151' }}>Student Name</th>
            <th style={{ padding: '12px 8px', textAlign: 'left', color: '#374151' }}>Admission No.</th>
            <th style={{ padding: '12px 8px', textAlign: 'left', color: '#374151' }}>Amt. (₹)</th>
            <th style={{ padding: '12px 8px', textAlign: 'left', color: '#374151' }}>Cheque/DD No.</th>
            <th style={{ padding: '12px 8px', textAlign: 'left', color: '#374151' }}>Bank</th>
            <th style={{ padding: '12px 8px', textAlign: 'center', color: '#374151' }}>Status</th>
            <th style={{ padding: '12px 8px', textAlign: 'center', color: '#374151' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredReceipts.length === 0 ? (
            <tr>
              <td colSpan="8" style={{ padding: '20px', textAlign: 'center', color: '#6b7280' }}>
                No cheque receipts found.
              </td>
            </tr>
          ) : (
            filteredReceipts.map(receipt => (
              <tr key={receipt._id} style={{ borderBottom: '1px solid #e5e7eb', transition: 'background 0.2s', background: receipt.chequeStatus === 'Cleared' ? '#f0fdf4' : (receipt.chequeStatus === 'Bounced' ? '#fef2f2' : 'transparent') }}>
                <td style={{ padding: '12px 8px', color: '#374151', fontWeight: 'bold' }}>{receipt.receiptNo}</td>
                <td style={{ padding: '12px 8px', color: '#374151' }}>{receipt.student?.firstName} {receipt.student?.lastName}</td>
                <td style={{ padding: '12px 8px', color: '#374151' }}>{receipt.student?.admissionNumber}</td>
                <td style={{ padding: '12px 8px', color: '#374151', fontWeight: 'bold' }}>{receipt.amountPaid}</td>
                <td style={{ padding: '12px 8px', color: '#374151' }}>{receipt.referenceNumber || 'N/A'}</td>
                <td style={{ padding: '12px 8px', color: '#374151' }}>{receipt.bankName || 'N/A'}</td>
                <td style={{ padding: '12px 8px', textAlign: 'center' }}>
                  <span style={{ 
                    padding: '4px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold',
                    background: receipt.chequeStatus === 'Pending' ? '#fef3c7' : (receipt.chequeStatus === 'Cleared' ? '#d1fae5' : '#fee2e2'),
                    color: receipt.chequeStatus === 'Pending' ? '#92400e' : (receipt.chequeStatus === 'Cleared' ? '#065f46' : '#991b1b')
                  }}>
                    {receipt.chequeStatus}
                  </span>
                </td>
                <td style={{ padding: '12px 8px', textAlign: 'center' }}>
                  {receipt.chequeStatus === 'Pending' ? (
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button 
                        onClick={() => handleUpdateStatus(receipt._id, 'Cleared')}
                        disabled={loading}
                        title="Mark as Cleared"
                        style={{ background: '#10b981', color: '#fff', border: 'none', padding: '6px', borderRadius: '4px', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <CheckCircle size={14} />
                      </button>
                      <button 
                        onClick={() => handleUpdateStatus(receipt._id, 'Bounced')}
                        disabled={loading}
                        title="Mark as Bounced (Will Cancel Receipt)"
                        style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '6px', borderRadius: '4px', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <XCircle size={14} />
                      </button>
                    </div>
                  ) : (
                    <span style={{ color: '#6b7280', fontSize: '11px' }}>Processed</span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
