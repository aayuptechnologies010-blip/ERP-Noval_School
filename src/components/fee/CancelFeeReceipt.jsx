import React, { useState, useEffect } from 'react';
import { Search, XCircle } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function CancelFeeReceipt() {
  const [receipts, setReceipts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredReceipts, setFilteredReceipts] = useState([]);
  const [cancelReason, setCancelReason] = useState('');
  
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
        // Only show successful receipts for cancellation
        const successfulReceipts = data.filter(r => r.status === 'Successful');
        setReceipts(successfulReceipts);
        setFilteredReceipts(successfulReceipts);
      }
    } catch (error) {
      console.error('Error fetching receipts:', error);
    }
  };

  const handleSearch = () => {
    if (!searchQuery) {
      setFilteredReceipts(receipts);
      return;
    }
    
    const filtered = receipts.filter(r => 
      r.receiptNo?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      r.student?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      r.student?.admissionNumber === searchQuery
    );
    setFilteredReceipts(filtered);
  };

  const handleCancelReceipt = async (receiptId) => {
    if (!cancelReason.trim()) {
      setIsError(true);
      setMessage("Please enter a cancellation reason before cancelling.");
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    if (!window.confirm("Are you sure you want to cancel this receipt? This action will reverse the ledger balance.")) {
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/fee-transactions/cancel/${receiptId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ cancelledReason: cancelReason })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to cancel receipt');
      
      setIsError(false);
      setMessage(`Receipt cancelled successfully!`);
      
      // Refresh list
      fetchReceipts();
      setCancelReason('');
      
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px', background: '#fff', minHeight: '100%', position: 'relative' }}>
      
      {message && (
        <div style={{
          position: 'absolute', top: '10px', right: '10px', padding: '10px 20px',
          borderRadius: '4px', background: isError ? '#ef4444' : '#10b981', color: '#fff', zIndex: 1000
        }}>
          {message}
        </div>
      )}

      {/* Right Column (Expanded) */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#374151' }}>Search Receipt by Name, Adm No, Receipt No</span>
          <div style={{ display: 'flex', width: '300px' }}>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              style={{ flex: 1, padding: '8px 12px', border: '1px solid #d1d5db', borderRight: 'none', borderRadius: '4px 0 0 4px', outline: 'none', fontSize: '12px' }} 
            />
            <button onClick={handleSearch} style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '0 15px', borderRadius: '0 4px 4px 0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Search size={16} />
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', background: '#fff3cd', padding: '15px', border: '1px solid #ffeeba', borderRadius: '4px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#856404' }}>Cancellation Reason (Required for Cancellation)</label>
            <input 
              type="text" 
              placeholder="Enter reason for cancelling receipt..." 
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              style={{ width: '100%', padding: '8px', border: '1px solid #ffeeba', borderRadius: '4px', outline: 'none', fontSize: '12px' }} 
            />
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px', fontSize: '11px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e5e7eb', background: '#f8fafc' }}>
              <th style={{ padding: '8px', textAlign: 'left', color: '#374151' }}>Receipt No.</th>
              <th style={{ padding: '8px', textAlign: 'left', color: '#374151' }}>Receipt Date</th>
              <th style={{ padding: '8px', textAlign: 'left', color: '#374151' }}>Name</th>
              <th style={{ padding: '8px', textAlign: 'left', color: '#374151' }}>Adm. No.</th>
              <th style={{ padding: '8px', textAlign: 'left', color: '#374151' }}>Paid Amt.</th>
              <th style={{ padding: '8px', textAlign: 'left', color: '#374151' }}>Mode</th>
              <th style={{ padding: '8px', textAlign: 'center', color: '#374151' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredReceipts.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '20px', color: '#6b7280' }}>No active receipts found</td>
              </tr>
            ) : (
              filteredReceipts.map(receipt => (
                <tr key={receipt._id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '8px', color: '#374151' }}>{receipt.receiptNo}</td>
                  <td style={{ padding: '8px', color: '#374151' }}>{new Date(receipt.receiptDate).toLocaleDateString()}</td>
                  <td style={{ padding: '8px', color: '#374151' }}>{receipt.student?.firstName} {receipt.student?.lastName}</td>
                  <td style={{ padding: '8px', color: '#374151' }}>{receipt.student?.admissionNumber}</td>
                  <td style={{ padding: '8px', color: '#374151', fontWeight: 'bold' }}>₹{receipt.amountPaid}</td>
                  <td style={{ padding: '8px', color: '#374151' }}>{receipt.paymentMode}</td>
                  <td style={{ padding: '8px', textAlign: 'center' }}>
                    <button 
                      onClick={() => handleCancelReceipt(receipt._id)} 
                      disabled={loading}
                      style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: loading ? 'not-allowed' : 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      <XCircle size={14} /> Cancel
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

      </div>
    </div>
  );
}
