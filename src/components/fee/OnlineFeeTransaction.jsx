import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function OnlineFeeTransaction() {
  const [receipts, setReceipts] = useState([]);
  const [filteredReceipts, setFilteredReceipts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [loading, setLoading] = useState(false);

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
        // Only get Online receipts
        const onlineReceipts = data.filter(r => r.paymentMode === 'Online');
        setReceipts(onlineReceipts);
        setFilteredReceipts(onlineReceipts);
      }
    } catch (error) {
      console.error('Error fetching online receipts:', error);
    } finally {
      setLoading(false);
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

  return (
    <div style={{ padding: '20px', background: '#fff', minHeight: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: '20px' }}>
        <h2 style={{ margin: 0, fontSize: '18px', color: '#1f2937' }}>Online Fee Transactions</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Search size={16} color="#6b7280" />
          <input 
            type="text" 
            placeholder="Search by Name, Adm No, Txn ID..."
            value={searchQuery}
            onChange={handleSearch}
            style={{ padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px', width: '250px' }} 
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ padding: '15px', background: '#f3f4f6', borderRadius: '4px', flex: 1, borderLeft: '4px solid #3b82f6' }}>
          <div style={{ fontSize: '12px', color: '#4b5563', marginBottom: '4px' }}>Total Online Transactions</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>
            {receipts.length}
          </div>
        </div>
        <div style={{ padding: '15px', background: '#f0fdf4', borderRadius: '4px', flex: 1, borderLeft: '4px solid #10b981' }}>
          <div style={{ fontSize: '12px', color: '#4b5563', marginBottom: '4px' }}>Successful Collections</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>
            ₹{receipts.filter(r => r.status === 'Successful').reduce((acc, curr) => acc + curr.amountPaid, 0)}
          </div>
        </div>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', marginTop: '10px' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #e5e7eb', background: '#f9fafb' }}>
            <th style={{ padding: '12px 8px', textAlign: 'left', color: '#374151' }}>Date & Time</th>
            <th style={{ padding: '12px 8px', textAlign: 'left', color: '#374151' }}>Receipt No.</th>
            <th style={{ padding: '12px 8px', textAlign: 'left', color: '#374151' }}>Student Name</th>
            <th style={{ padding: '12px 8px', textAlign: 'left', color: '#374151' }}>Adm. No.</th>
            <th style={{ padding: '12px 8px', textAlign: 'left', color: '#374151' }}>Trans. ID</th>
            <th style={{ padding: '12px 8px', textAlign: 'left', color: '#374151' }}>Status</th>
            <th style={{ padding: '12px 8px', textAlign: 'left', color: '#374151' }}>Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
             <tr>
               <td colSpan="7" style={{ padding: '20px', textAlign: 'center', color: '#6b7280' }}>Loading...</td>
             </tr>
          ) : filteredReceipts.length === 0 ? (
             <tr>
               <td colSpan="7" style={{ padding: '20px', textAlign: 'center', color: '#6b7280' }}>No online transactions found</td>
             </tr>
          ) : (
            filteredReceipts.map(receipt => (
              <tr key={receipt._id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px 8px', color: '#374151' }}>{new Date(receipt.receiptDate).toLocaleString()}</td>
                <td style={{ padding: '12px 8px', color: '#374151', fontWeight: 'bold' }}>{receipt.receiptNo}</td>
                <td style={{ padding: '12px 8px', color: '#374151' }}>{receipt.student?.firstName} {receipt.student?.lastName}</td>
                <td style={{ padding: '12px 8px', color: '#374151' }}>{receipt.student?.admissionNumber}</td>
                <td style={{ padding: '12px 8px', color: '#374151' }}>{receipt.referenceNumber || 'N/A'}</td>
                <td style={{ padding: '12px 8px' }}>
                  <span style={{ 
                    padding: '4px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold',
                    background: receipt.status === 'Successful' ? '#d1fae5' : '#fee2e2',
                    color: receipt.status === 'Successful' ? '#065f46' : '#991b1b'
                  }}>
                    {receipt.status}
                  </span>
                </td>
                <td style={{ padding: '12px 8px', color: '#374151', fontWeight: 'bold' }}>{receipt.amountPaid}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

    </div>
  );
}
