import React, { useState, useEffect } from 'react';
import { Search, Undo2, XCircle } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function RefundHeadAmount() {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  const [ledger, setLedger] = useState(null);
  
  const [refundAmount, setRefundAmount] = useState('');
  const [reason, setReason] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/students`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setStudents(data);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleSearch = () => {
    const student = students.find(s => 
      s.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.admissionNumber === searchQuery || 
      s.rollNumber === searchQuery
    );
    
    if (student) {
      setSelectedStudent(student);
      fetchLedger(student._id);
    } else {
      setIsError(true);
      setMessage('Student not found');
      setTimeout(() => setMessage(null), 3000);
      setSelectedStudent(null);
      setLedger(null);
    }
  };

  const fetchLedger = async (studentId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/fee-transactions/ledger/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setLedger(data);
      }
    } catch (error) {
      console.error('Error fetching ledger:', error);
    }
  };

  const handleRefund = async () => {
    if (!selectedStudent) {
      setIsError(true);
      setMessage('Please select a student first');
      setTimeout(() => setMessage(null), 3000);
      return;
    }
    if (!refundAmount || Number(refundAmount) <= 0) {
      setIsError(true);
      setMessage('Please enter a valid refund amount');
      setTimeout(() => setMessage(null), 3000);
      return;
    }
    if (!reason.trim()) {
      setIsError(true);
      setMessage('Please enter a reason for refund');
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    if (!window.confirm(`Are you sure you want to process a refund of ₹${refundAmount}?`)) {
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/fee-transactions/refund`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          studentId: selectedStudent._id,
          refundAmount: Number(refundAmount),
          reason
        })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Refund failed');
      
      setIsError(false);
      setMessage(`Refund Processed successfully! Receipt No: ${data.receipt.receiptNo}`);
      
      // Update ledger locally
      setLedger(data.ledger);
      setRefundAmount('');
      setReason('');
      
      setTimeout(() => setMessage(null), 5000);
    } catch (error) {
      setIsError(true);
      setMessage(error.message);
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedStudent(null);
    setLedger(null);
    setSearchQuery('');
    setRefundAmount('');
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

      {/* Left Column - Student Profile */}
      <div style={{ width: '250px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', height: 'fit-content' }}>
        <div style={{ width: '120px', height: '120px', background: '#e5e7eb', borderRadius: '4px', marginBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', overflow: 'hidden' }}>
           {selectedStudent?.profilePicture ? (
             <img src={`${API_URL}/${selectedStudent.profilePicture}`} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
           ) : (
             <div style={{ width: '80px', height: '80px', background: '#9ca3af', borderRadius: '50% 50% 0 0', position: 'relative', top: '20px' }}>
                <div style={{ width: '40px', height: '40px', background: '#9ca3af', borderRadius: '50%', position: 'absolute', top: '-45px', left: '20px' }}></div>
             </div>
           )}
        </div>
        
        {selectedStudent ? (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', color: '#374151', lineHeight: 1.4 }}>
            <div><strong>Name:</strong> {selectedStudent.firstName} {selectedStudent.lastName}</div>
            <div><strong>Class:</strong> {selectedStudent.class?.name || 'N/A'}</div>
            <div><strong>Roll No.:</strong> {selectedStudent.rollNumber}</div>
            <div><strong>Admission No.:</strong> {selectedStudent.admissionNumber}</div>
          </div>
        ) : (
          <div style={{ fontSize: '12px', color: '#6b7280', textAlign: 'center', marginTop: '20px' }}>
            Search for a student to view details
          </div>
        )}
      </div>

      {/* Right Column - Entry Form */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Top Search */}
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <div style={{ display: 'flex', flex: 1 }}>
            <input 
              type="text" 
              placeholder="Search by Name, Roll No, Admission No..." 
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

        {ledger && (
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '15px', borderRadius: '4px' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#166534' }}>Financial Standing</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#15803d' }}>
              <span><strong>Total Paid:</strong> ₹{ledger.totalPaid}</span>
              <span><strong>Total Dues:</strong> ₹{ledger.totalDues}</span>
              <span><strong>Advance Balance:</strong> ₹{ledger.advanceAmount}</span>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', background: '#f8fafc', padding: '20px', border: '1px solid #e5e7eb', borderRadius: '4px' }}>
          <h3 style={{ margin: 0, fontSize: '14px', color: '#1e40af' }}>Process Refund</h3>
          
          <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Refund Amount (₹)</label>
              <input 
                type="number" 
                value={refundAmount}
                onChange={e => setRefundAmount(e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px' }} 
              />
            </div>
            <div style={{ flex: 2 }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Reason for Refund</label>
              <input 
                type="text" 
                value={reason}
                onChange={e => setReason(e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '12px' }} 
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '15px', marginTop: '10px' }}>
            <button 
              onClick={handleRefund}
              disabled={loading || !selectedStudent}
              style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '4px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: (loading || !selectedStudent) ? 'not-allowed' : 'pointer' }}
            >
              <Undo2 size={14} /> {loading ? 'Processing...' : 'Process Refund'}
            </button>
            <button 
              onClick={handleReset}
              style={{ background: '#6b7280', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '4px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
            >
              <XCircle size={14} /> Reset
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
