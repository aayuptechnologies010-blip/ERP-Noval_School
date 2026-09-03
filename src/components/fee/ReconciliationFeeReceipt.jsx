import React, { useState } from 'react';
import { Eye, Save, Download } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const token = localStorage.getItem('token');

export default function ReconciliationFeeReceipt() {
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [payMode, setPayMode] = useState('');
  
  const [receipts, setReceipts] = useState([]);
  const [selectedReceipts, setSelectedReceipts] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleShow = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = `${API_URL}/api/fee-reports/collection/daily?startDate=${startDate}&endDate=${endDate}`;
      if (payMode) url += `&payMode=${payMode}`;

      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      
      if (res.ok) {
        // Flatten the grouped data into a single list of receipts
        const flattened = data.flatMap(group => 
          group.receipts.map(r => ({
            ...r,
            transactionDate: group._id.date,
            payMode: group._id.paymentMode
          }))
        );
        setReceipts(flattened);
        setSelectedReceipts({});
      } else {
        setError(data.message || 'Failed to fetch receipts');
      }
    } catch (err) {
      setError('Server connection error');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allSelected = {};
      receipts.forEach(r => allSelected[r.receiptNo] = true);
      setSelectedReceipts(allSelected);
    } else {
      setSelectedReceipts({});
    }
  };

  const handleSelect = (receiptNo) => {
    setSelectedReceipts(prev => ({
      ...prev,
      [receiptNo]: !prev[receiptNo]
    }));
  };

  const handleSave = () => {
    const selectedCount = Object.values(selectedReceipts).filter(Boolean).length;
    if (selectedCount === 0) {
      alert("Please select at least one receipt to reconcile.");
      return;
    }
    // Dummy save action - would connect to an actual update API
    alert(`${selectedCount} receipts marked as reconciled successfully!`);
  };

  return (
    <div style={{ padding: '20px', background: '#fff', minHeight: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '200px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Receipt From Date</label>
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }} />
        </div>
        <div style={{ width: '200px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Receipt to Date</label>
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '150px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Paymode</label>
          <select value={payMode} onChange={e => setPayMode(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' }}>
            <option value="">All Paymodes</option>
            <option value="Cash">Cash</option>
            <option value="Online">Online</option>
            <option value="Cheque">Cheque</option>
            <option value="DD">DD</option>
            <option value="Card">Card</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button onClick={handleShow} disabled={loading} style={{ background: '#29a9d8', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '4px', fontSize: '12px', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' }}>
          <Eye size={14} /> {loading ? 'Loading...' : 'Get Details'}
        </button>
        <button onClick={handleSave} disabled={receipts.length === 0} style={{ background: '#10b981', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '4px', fontSize: '12px', cursor: receipts.length === 0 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' }}>
          <Save size={14} /> Reconcile Selected
        </button>
      </div>

      {error && <div style={{ padding: '12px', background: '#fee2e2', color: '#991b1b', borderRadius: '4px', textAlign: 'center', fontSize: '13px' }}>{error}</div>}

      <div style={{ overflowX: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px', marginTop: '10px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', whiteSpace: 'nowrap' }}>
          <thead style={{ background: '#f9fafb' }}>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ padding: '12px 8px', textAlign: 'center', color: '#374151' }}>
                <input type="checkbox" onChange={handleSelectAll} checked={receipts.length > 0 && Object.values(selectedReceipts).filter(Boolean).length === receipts.length} />
              </th>
              <th style={{ padding: '12px 8px', textAlign: 'left', color: '#374151' }}>Sr. No.</th>
              <th style={{ padding: '12px 8px', textAlign: 'left', color: '#374151' }}>Receipt No.</th>
              <th style={{ padding: '12px 8px', textAlign: 'left', color: '#374151' }}>Rec. Date</th>
              <th style={{ padding: '12px 8px', textAlign: 'left', color: '#374151' }}>Student Name</th>
              <th style={{ padding: '12px 8px', textAlign: 'left', color: '#374151' }}>Admission No.</th>
              <th style={{ padding: '12px 8px', textAlign: 'left', color: '#374151' }}>Class</th>
              <th style={{ padding: '12px 8px', textAlign: 'right', color: '#374151' }}>Amount (₹)</th>
              <th style={{ padding: '12px 8px', textAlign: 'left', color: '#374151' }}>Paymode</th>
              <th style={{ padding: '12px 8px', textAlign: 'left', color: '#374151' }}>Bank Name</th>
              <th style={{ padding: '12px 8px', textAlign: 'left', color: '#374151' }}>Ref No.</th>
            </tr>
          </thead>
          <tbody>
            {receipts.length === 0 ? (
              <tr>
                <td colSpan="11" style={{ padding: '30px', textAlign: 'center', color: '#6b7280' }}>
                  No receipts found for the selected criteria.
                </td>
              </tr>
            ) : (
              receipts.map((r, i) => (
                <tr key={r.receiptNo} style={{ borderBottom: '1px solid #e5e7eb', background: selectedReceipts[r.receiptNo] ? '#ecfdf5' : '#fff' }}>
                  <td style={{ padding: '12px 8px', textAlign: 'center' }}>
                    <input type="checkbox" checked={!!selectedReceipts[r.receiptNo]} onChange={() => handleSelect(r.receiptNo)} />
                  </td>
                  <td style={{ padding: '12px 8px', color: '#6b7280' }}>{i + 1}</td>
                  <td style={{ padding: '12px 8px', color: '#1f2937', fontWeight: '600' }}>{r.receiptNo}</td>
                  <td style={{ padding: '12px 8px', color: '#4b5563' }}>{r.transactionDate}</td>
                  <td style={{ padding: '12px 8px', color: '#1f2937' }}>{r.studentName}</td>
                  <td style={{ padding: '12px 8px', color: '#4b5563' }}>{r.admissionNo}</td>
                  <td style={{ padding: '12px 8px', color: '#4b5563' }}>{r.class}</td>
                  <td style={{ padding: '12px 8px', color: '#059669', textAlign: 'right', fontWeight: 'bold' }}>{r.amountPaid}</td>
                  <td style={{ padding: '12px 8px', color: '#4b5563' }}>{r.payMode}</td>
                  <td style={{ padding: '12px 8px', color: '#4b5563' }}>{r.bankName || '-'}</td>
                  <td style={{ padding: '12px 8px', color: '#4b5563' }}>{r.referenceNumber || '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
