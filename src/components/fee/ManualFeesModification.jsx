import React, { useState, useEffect } from 'react';
import { Search, Save, XCircle } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function ManualFeesModification() {
  const [receipts, setReceipts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  
  // Edit form state
  const [amountPaid, setAmountPaid] = useState('');
  const [discountAmount, setDiscountAmount] = useState('');
  const [reason, setReason] = useState('');
  
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
        // Only active receipts can be modified
        setReceipts(data.filter(r => r.status === 'Successful'));
      }
    } catch (error) {
      console.error('Error fetching receipts:', error);
    }
  };

  const handleSearch = () => {
    if (!searchQuery) {
      setIsError(true);
      setMessage("Please enter a search query (Receipt No or Adm No)");
      setTimeout(() => setMessage(null), 3000);
      return;
    }
    
    const found = receipts.find(r => 
      r.receiptNo?.toLowerCase() === searchQuery.toLowerCase() || 
      r.student?.admissionNumber === searchQuery
    );
    
    if (found) {
      setSelectedReceipt(found);
      setAmountPaid(found.amountPaid?.toString() || '0');
      setDiscountAmount(found.discountAmount?.toString() || '0');
      setReason('');
    } else {
      setSelectedReceipt(null);
      setIsError(true);
      setMessage("Receipt not found or is already cancelled.");
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleManualModify = async () => {
    if (!selectedReceipt) return;
    if (!reason.trim()) {
      setIsError(true);
      setMessage("Please provide a reason for this financial modification.");
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    if (!window.confirm("WARNING: Changing amounts will recalculate the student's ledger dues and advances. Are you sure you want to proceed?")) {
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/fee-transactions/manual-modify/${selectedReceipt._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          amountPaid: Number(amountPaid),
          discountAmount: Number(discountAmount),
          reason
        })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to modify receipt');
      
      setIsError(false);
      setMessage(`Ledger recalculated and receipt modified successfully!`);
      
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

  const handleReset = () => {
    setSelectedReceipt(null);
    setSearchQuery('');
    setAmountPaid('');
    setDiscountAmount('');
    setReason('');
  };

  return (
    <div style={{ display: 'flex', gap: '20px', padding: '20px', background: '#fff', minHeight: '100%', position: 'relative' }}>
      
      {message && (
        <div style={{
          position: 'absolute', top: '10px', right: '10px', padding: '10px 20px',
          borderRadius: '4px', background: isError ? '#ef4444' : '#10b981', color: '#fff', zIndex: 1000
        }}>
          {message}
        </div>
      )}

      {/* Left Column */}
      <div style={{ width: '250px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', height: 'fit-content' }}>
        <div style={{ width: '120px', height: '120px', background: '#e5e7eb', borderRadius: '4px', marginBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', overflow: 'hidden' }}>
           {selectedReceipt?.student?.profilePicture ? (
             <img src={`${API_URL}/${selectedReceipt.student.profilePicture}`} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
           ) : (
             <div style={{ width: '80px', height: '80px', background: '#9ca3af', borderRadius: '50% 50% 0 0', position: 'relative', top: '20px' }}>
                <div style={{ width: '40px', height: '40px', background: '#9ca3af', borderRadius: '50%', position: 'absolute', top: '-45px', left: '20px' }}></div>
             </div>
           )}
        </div>
        
        {selectedReceipt ? (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', color: '#374151', lineHeight: 1.4 }}>
            <div><strong>Name:</strong> {selectedReceipt.student?.firstName} {selectedReceipt.student?.lastName}</div>
            <div><strong>Class:</strong> {selectedReceipt.student?.class?.name || 'N/A'}</div>
            <div><strong>Adm No.:</strong> {selectedReceipt.student?.admissionNumber}</div>
            <div><strong>Current Amount Paid:</strong> ₹{selectedReceipt.amountPaid}</div>
          </div>
        ) : (
          <div style={{ fontSize: '12px', color: '#6b7280', textAlign: 'center', marginTop: '20px' }}>
            Search for a receipt to modify financial details
          </div>
        )}
      </div>

      {/* Right Column */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#374151' }}>Search Receipt by No. or Adm No.</span>
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

        {selectedReceipt && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', background: '#fffbeb', padding: '20px', border: '1px solid #fde68a', borderRadius: '4px' }}>
            <h3 style={{ margin: 0, fontSize: '14px', color: '#92400e' }}>Manual Financial Modification: {selectedReceipt.receiptNo}</h3>
            <p style={{ margin: 0, fontSize: '12px', color: '#b45309' }}>WARNING: Modifying amounts here will recalculate the student's entire ledger (Advances and Dues).</p>
            
            <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#92400e' }}>Amount Paid</label>
                <input 
                  type="number" 
                  value={amountPaid}
                  onChange={e => setAmountPaid(e.target.value)}
                  style={{ width: '100%', padding: '8px', border: '1px solid #fde68a', borderRadius: '4px', outline: 'none', fontSize: '12px' }} 
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#92400e' }}>Discount Amount</label>
                <input 
                  type="number" 
                  value={discountAmount}
                  onChange={e => setDiscountAmount(e.target.value)}
                  style={{ width: '100%', padding: '8px', border: '1px solid #fde68a', borderRadius: '4px', outline: 'none', fontSize: '12px' }} 
                />
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '15px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#92400e' }}>Reason to Modify (Required)</label>
                <input 
                  type="text" 
                  placeholder="Why is this amount being changed?"
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  style={{ width: '100%', padding: '8px', border: '1px solid #fde68a', borderRadius: '4px', outline: 'none', fontSize: '12px' }} 
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '15px', marginTop: '10px' }}>
              <button 
                onClick={handleManualModify}
                disabled={loading}
                style={{ background: '#d97706', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '4px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: loading ? 'not-allowed' : 'pointer' }}
              >
                <Save size={14} /> {loading ? 'Recalculating...' : 'Update & Recalculate Ledger'}
              </button>
              <button 
                onClick={handleReset}
                style={{ background: '#6b7280', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '4px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
              >
                <XCircle size={14} /> Cancel
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
