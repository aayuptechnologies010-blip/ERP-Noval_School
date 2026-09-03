import React, { useState } from 'react';
import { Eye, RefreshCcw, Search } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function ModifyReceiptDateBank() {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Search Filters
  const [payModeFilter, setPayModeFilter] = useState('All');
  const [receiptNoFrom, setReceiptNoFrom] = useState('');
  const [receiptNoTo, setReceiptNoTo] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);

  // Update Fields
  const [newReceiptDate, setNewReceiptDate] = useState('');
  const [newDepositBank, setNewDepositBank] = useState('');
  const [newChequeDate, setNewChequeDate] = useState('');

  const handleFetchReceipts = async () => {
    setLoading(true);
    setMessage(null);
    setSelectedIds([]);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/fee-transactions/receipts`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        let data = await res.json();
        
        if (payModeFilter !== 'All') {
          data = data.filter(r => r.paymentMode === payModeFilter);
        }
        
        if (receiptNoFrom) {
          data = data.filter(r => r.receiptNo.localeCompare(receiptNoFrom) >= 0);
        }
        if (receiptNoTo) {
          data = data.filter(r => r.receiptNo.localeCompare(receiptNoTo) <= 0);
        }
        
        setReceipts(data);
      }
    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: 'Failed to fetch receipts' });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(receipts.map(r => r._id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleUpdate = async () => {
    if (selectedIds.length === 0) {
      setMessage({ type: 'error', text: 'Please select at least one receipt to update.' });
      return;
    }
    
    if (!newReceiptDate && !newDepositBank && !newChequeDate) {
      setMessage({ type: 'error', text: 'Please provide at least one field to update.' });
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/fee-transactions/bulk-update-metadata`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          receiptIds: selectedIds,
          updates: {
            receiptDate: newReceiptDate || undefined,
            depositBank: newDepositBank || undefined,
            chequeDate: newChequeDate || undefined
          }
        })
      });

      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: data.message });
        setNewReceiptDate('');
        setNewDepositBank('');
        setNewChequeDate('');
        setSelectedIds([]);
        handleFetchReceipts();
      } else {
        setMessage({ type: 'error', text: data.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Server error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', background: '#f3f4f6', minHeight: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {message && (
        <div style={{ padding: '10px', borderRadius: '4px', background: message.type === 'success' ? '#d1fae5' : '#fee2e2', color: message.type === 'success' ? '#065f46' : '#991b1b', fontSize: '13px' }}>
          {message.text}
        </div>
      )}

      {/* Filter Section */}
      <div style={{ background: '#fff', padding: '20px', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
        <h3 style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#1f2937' }}>Search Receipts to Modify</h3>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          
          <div style={{ width: '200px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Pay Mode</label>
            <select 
              value={payModeFilter}
              onChange={(e) => setPayModeFilter(e.target.value)}
              style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px', outline: 'none' }}
            >
              <option value="All">All</option>
              <option value="Cash">Cash</option>
              <option value="Cheque">Cheque</option>
              <option value="DD">DD</option>
              <option value="Online">Online</option>
            </select>
          </div>

          <div style={{ width: '200px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Receipt No. (From)</label>
            <input 
              type="text" 
              value={receiptNoFrom}
              onChange={(e) => setReceiptNoFrom(e.target.value)}
              placeholder="e.g. REC001"
              style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px', outline: 'none' }} 
            />
          </div>
          
          <div style={{ width: '200px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Receipt No. (To)</label>
            <input 
              type="text" 
              value={receiptNoTo}
              onChange={(e) => setReceiptNoTo(e.target.value)}
              placeholder="e.g. REC100"
              style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px', outline: 'none' }} 
            />
          </div>

          <div>
            <button 
              onClick={handleFetchReceipts}
              disabled={loading}
              style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '4px', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Search size={16} /> Search Receipts
            </button>
          </div>
        </div>
      </div>

      {/* Update Section */}
      <div style={{ background: '#fff', padding: '20px', borderRadius: '4px', border: '1px solid #e5e7eb', display: 'flex', gap: '20px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        
        <div style={{ flex: 1, minWidth: '150px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>New Receipt Date</label>
          <input 
            type="date" 
            value={newReceiptDate}
            onChange={(e) => setNewReceiptDate(e.target.value)}
            style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px', outline: 'none' }} 
          />
        </div>

        <div style={{ flex: 1, minWidth: '150px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>New Chq/DD Date</label>
          <input 
            type="date" 
            value={newChequeDate}
            onChange={(e) => setNewChequeDate(e.target.value)}
            style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px', outline: 'none' }} 
          />
        </div>
        
        <div style={{ flex: 1, minWidth: '150px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>New Deposit Bank</label>
          <input 
            type="text" 
            value={newDepositBank}
            onChange={(e) => setNewDepositBank(e.target.value)}
            placeholder="Bank Name"
            style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px', outline: 'none' }} 
          />
        </div>

        <div>
          <button 
            onClick={handleUpdate}
            disabled={loading || selectedIds.length === 0}
            style={{ background: '#f59e0b', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '4px', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold', opacity: selectedIds.length === 0 ? 0.6 : 1 }}
          >
            <RefreshCcw size={16} /> Bulk Update ({selectedIds.length})
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div style={{ background: '#fff', borderRadius: '4px', border: '1px solid #e5e7eb', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '15px 20px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '16px', color: '#1f2937' }}>Receipt List</h3>
          <span style={{ fontSize: '12px', color: '#6b7280' }}>{receipts.length} receipts found</span>
        </div>
        
        <div style={{ overflowX: 'auto', flex: 1 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', minWidth: '1000px' }}>
            <thead style={{ background: '#f9fafb' }}>
              <tr>
                <th style={{ padding: '12px 15px', textAlign: 'center', borderBottom: '2px solid #e5e7eb', width: '50px' }}>
                  <input 
                    type="checkbox" 
                    checked={receipts.length > 0 && selectedIds.length === receipts.length}
                    onChange={handleSelectAll}
                  />
                </th>
                <th style={{ padding: '12px 15px', textAlign: 'left', color: '#374151', borderBottom: '2px solid #e5e7eb' }}>Rec. No.</th>
                <th style={{ padding: '12px 15px', textAlign: 'left', color: '#374151', borderBottom: '2px solid #e5e7eb' }}>Student Name</th>
                <th style={{ padding: '12px 15px', textAlign: 'left', color: '#374151', borderBottom: '2px solid #e5e7eb' }}>Adm. No.</th>
                <th style={{ padding: '12px 15px', textAlign: 'left', color: '#374151', borderBottom: '2px solid #e5e7eb' }}>Paymode</th>
                <th style={{ padding: '12px 15px', textAlign: 'left', color: '#374151', borderBottom: '2px solid #e5e7eb' }}>Receipt Date</th>
                <th style={{ padding: '12px 15px', textAlign: 'left', color: '#374151', borderBottom: '2px solid #e5e7eb' }}>Paid (₹)</th>
                <th style={{ padding: '12px 15px', textAlign: 'left', color: '#374151', borderBottom: '2px solid #e5e7eb' }}>Ref No / Bank</th>
                <th style={{ padding: '12px 15px', textAlign: 'left', color: '#374151', borderBottom: '2px solid #e5e7eb' }}>Chq/DD Date</th>
              </tr>
            </thead>
            <tbody>
              {loading && receipts.length === 0 ? (
                <tr>
                  <td colSpan="9" style={{ padding: '30px', textAlign: 'center', color: '#6b7280' }}>Loading receipts...</td>
                </tr>
              ) : receipts.length === 0 ? (
                <tr>
                  <td colSpan="9" style={{ padding: '30px', textAlign: 'center', color: '#6b7280' }}>No receipts found. Use filters to search.</td>
                </tr>
              ) : (
                receipts.map(receipt => (
                  <tr key={receipt._id} style={{ borderBottom: '1px solid #e5e7eb', background: selectedIds.includes(receipt._id) ? '#f0f9ff' : 'transparent' }}>
                    <td style={{ padding: '12px 15px', textAlign: 'center' }}>
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(receipt._id)}
                        onChange={() => handleSelect(receipt._id)}
                      />
                    </td>
                    <td style={{ padding: '12px 15px', color: '#374151', fontWeight: 'bold' }}>{receipt.receiptNo}</td>
                    <td style={{ padding: '12px 15px', color: '#374151' }}>{receipt.student?.firstName} {receipt.student?.lastName}</td>
                    <td style={{ padding: '12px 15px', color: '#374151' }}>{receipt.student?.admissionNumber}</td>
                    <td style={{ padding: '12px 15px', color: '#374151' }}>{receipt.paymentMode}</td>
                    <td style={{ padding: '12px 15px', color: '#374151' }}>{new Date(receipt.receiptDate).toLocaleDateString()}</td>
                    <td style={{ padding: '12px 15px', color: '#374151', fontWeight: 'bold' }}>{receipt.amountPaid}</td>
                    <td style={{ padding: '12px 15px', color: '#374151' }}>
                      <div>{receipt.referenceNumber || '-'}</div>
                      <div style={{ fontSize: '10px', color: '#6b7280' }}>{receipt.bankName || receipt.depositBank || ''}</div>
                    </td>
                    <td style={{ padding: '12px 15px', color: '#374151' }}>
                      {receipt.chequeDate ? new Date(receipt.chequeDate).toLocaleDateString() : '-'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
