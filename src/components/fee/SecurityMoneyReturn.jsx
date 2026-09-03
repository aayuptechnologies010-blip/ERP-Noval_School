import React, { useState } from 'react';
import { Search, Undo2, RotateCcw } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function SecurityMoneyReturn() {
  const [searchQuery, setSearchQuery] = useState('');
  const [student, setStudent] = useState(null);
  
  const [records, setRecords] = useState([]);
  const [remarks, setRemarks] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSearch = async () => {
    if (!searchQuery) return;
    setLoading(true);
    setMessage(null);
    try {
      const token = localStorage.getItem('token');
      // Fetch student
      const res = await fetch(`${API_URL}/api/students`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        const found = data.find(s => 
          s.admissionNumber === searchQuery || 
          s.firstName?.toLowerCase() === searchQuery.toLowerCase()
        );
        if (found) {
          setStudent(found);
          fetchSecurityRecords(found._id);
        } else {
          setMessage({ type: 'error', text: 'Student not found.' });
          setStudent(null);
          setRecords([]);
        }
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error searching student' });
    } finally {
      setLoading(false);
    }
  };

  const fetchSecurityRecords = async (studentId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/security-money/student/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setRecords(data);
      }
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  const handleReturn = async (recordId) => {
    if (!window.confirm("Are you sure you want to process this return?")) return;
    
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/security-money/return/${recordId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ remarks })
      });

      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: `Security Money Returned successfully!` });
        setRemarks('');
        fetchSecurityRecords(student._id);
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
    <div style={{ padding: '20px', background: '#f3f4f6', minHeight: '100%' }}>
      
      {message && (
        <div style={{ padding: '10px', marginBottom: '15px', borderRadius: '4px', background: message.type === 'success' ? '#d1fae5' : '#fee2e2', color: message.type === 'success' ? '#065f46' : '#991b1b', fontSize: '13px' }}>
          {message.text}
        </div>
      )}

      <div style={{ display: 'flex', gap: '20px', background: '#fff', padding: '20px', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
        
        {/* Left Panel - Student Info */}
        <div style={{ width: '250px', flexShrink: 0, borderRight: '1px solid #e5e7eb', paddingRight: '20px' }}>
          <div style={{ width: '120px', height: '120px', background: '#e5e7eb', margin: '0 auto 20px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="80" height="80" viewBox="0 0 24 24" fill="#9ca3af">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '12px', color: '#374151' }}>
            <div style={{ fontWeight: 'bold' }}>Name: <span style={{ fontWeight: 'normal' }}>{student?.firstName} {student?.lastName}</span></div>
            <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '15px', fontWeight: 'bold' }}>Admission No.: <span style={{ fontWeight: 'normal' }}>{student?.admissionNumber}</span></div>
            <div style={{ fontWeight: 'bold' }}>Class: <span style={{ fontWeight: 'normal' }}>{student?.class?.name}</span></div>
          </div>
        </div>

        {/* Right Panel - Return Form */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Top Search Bar */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ display: 'flex', flex: 1 }}>
              <input 
                type="text" 
                placeholder="Search by Admission No or Name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ flex: 1, padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px 0 0 4px', fontSize: '13px', outline: 'none' }} 
              />
              <button 
                onClick={handleSearch}
                disabled={loading}
                style={{ background: '#29a9d8', border: 'none', padding: '0 20px', borderRadius: '0 4px 4px 0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Search size={16} color="#fff" />
              </button>
            </div>
          </div>

          <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937', borderBottom: '1px solid #e5e7eb', paddingBottom: '10px', marginTop: '10px' }}>
            Process Security Money Return
          </div>

          <div>
             <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Return Remarks (Optional):</label>
             <input 
               type="text" 
               value={remarks}
               onChange={(e) => setRemarks(e.target.value)}
               placeholder="Why is it being returned? (e.g. TC Generated)" 
               style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px', outline: 'none', maxWidth: '400px' }} 
             />
          </div>

          {/* List of Security Deposits */}
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', marginTop: '10px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e5e7eb', background: '#f9fafb' }}>
                <th style={{ padding: '12px 10px', textAlign: 'left', color: '#374151' }}>Deposit Date</th>
                <th style={{ padding: '12px 10px', textAlign: 'left', color: '#374151' }}>Receipt No.</th>
                <th style={{ padding: '12px 10px', textAlign: 'left', color: '#374151' }}>Amount (₹)</th>
                <th style={{ padding: '12px 10px', textAlign: 'left', color: '#374151' }}>Status</th>
                <th style={{ padding: '12px 10px', textAlign: 'left', color: '#374151' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {records.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: '#6b7280' }}>
                    {student ? "No security deposits found for this student." : "Search for a student to view deposits."}
                  </td>
                </tr>
              ) : (
                records.map(record => (
                  <tr key={record._id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px 10px', color: '#374151' }}>{new Date(record.depositDate).toLocaleDateString()}</td>
                    <td style={{ padding: '12px 10px', color: '#374151', fontWeight: 'bold' }}>{record.receiptNo}</td>
                    <td style={{ padding: '12px 10px', color: '#374151', fontWeight: 'bold' }}>{record.amount.toFixed(2)}</td>
                    <td style={{ padding: '12px 10px' }}>
                      <span style={{ 
                        padding: '4px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold',
                        background: record.status === 'Returned' ? '#d1fae5' : '#fef3c7',
                        color: record.status === 'Returned' ? '#065f46' : '#92400e'
                      }}>
                        {record.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 10px' }}>
                      {record.status === 'Deposited' ? (
                        <button 
                          onClick={() => handleReturn(record._id)}
                          style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 'bold' }}
                        >
                          <Undo2 size={12} /> Process Return
                        </button>
                      ) : (
                        <span style={{ fontSize: '11px', color: '#6b7280' }}>Returned on {new Date(record.returnDate).toLocaleDateString()}</span>
                      )}
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
