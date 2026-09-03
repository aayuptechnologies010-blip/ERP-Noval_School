import React, { useState, useEffect } from 'react';
import { Search, Printer } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function PrintFeeReceiptCertificate() {
  const [receipts, setReceipts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredReceipts, setFilteredReceipts] = useState([]);

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
        setReceipts(data);
        setFilteredReceipts(data);
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

  const handlePrint = (receipt) => {
    // Basic mock print function
    window.print();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px', background: '#fff', minHeight: '100%' }}>
      
      {/* Right Column (Expanded for table) */}
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

        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px', fontSize: '11px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e5e7eb', background: '#f8fafc' }}>
              <th style={{ padding: '8px', textAlign: 'left', color: '#374151' }}>Receipt No.</th>
              <th style={{ padding: '8px', textAlign: 'left', color: '#374151' }}>Receipt Date</th>
              <th style={{ padding: '8px', textAlign: 'left', color: '#374151' }}>Name</th>
              <th style={{ padding: '8px', textAlign: 'left', color: '#374151' }}>Adm. No.</th>
              <th style={{ padding: '8px', textAlign: 'left', color: '#374151' }}>Paid Amt.</th>
              <th style={{ padding: '8px', textAlign: 'left', color: '#374151' }}>Payment Mode</th>
              <th style={{ padding: '8px', textAlign: 'left', color: '#374151' }}>Status</th>
              <th style={{ padding: '8px', textAlign: 'center', color: '#374151' }}>Print Receipt</th>
            </tr>
          </thead>
          <tbody>
            {filteredReceipts.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '20px', color: '#6b7280' }}>No receipts found</td>
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
                  <td style={{ padding: '8px', color: receipt.status === 'Cancelled' ? '#ef4444' : '#10b981' }}>{receipt.status}</td>
                  <td style={{ padding: '8px', textAlign: 'center' }}>
                    <button onClick={() => handlePrint(receipt)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#3b82f6' }}>
                      <Printer size={14} />
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
