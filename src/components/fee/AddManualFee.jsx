import React, { useState } from 'react';
import { Search, Save, RotateCcw } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function AddManualFee() {
  const [searchQuery, setSearchQuery] = useState('');
  const [student, setStudent] = useState(null);
  
  const [amount, setAmount] = useState('');
  const [headName, setHeadName] = useState('Library Fine');
  const [remarks, setRemarks] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSearch = async () => {
    if (!searchQuery) return;
    setLoading(true);
    setMessage(null);
    try {
      const token = localStorage.getItem('token');
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
        } else {
          setMessage({ type: 'error', text: 'Student not found.' });
          setStudent(null);
        }
      }
    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: 'Error searching student' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!student || !amount) {
      setMessage({ type: 'error', text: 'Please fill amount and search student first.' });
      return;
    }
    
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/fee-transactions/add-manual-fee`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          studentId: student._id,
          amount,
          headName,
          remarks
        })
      });

      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: data.message });
        setAmount('');
        setRemarks('');
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

        {/* Right Panel - Add Fee Form */}
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
            Add Manual Fee / Fine
          </div>
          <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>This will directly increase the student's total dues.</p>

          {/* Form Fields */}
          <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            
            <div style={{ flex: 1, minWidth: '150px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Head Name</label>
              <select 
                value={headName}
                onChange={(e) => setHeadName(e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px', outline: 'none' }}
              >
                <option value="Library Fine">Library Fine</option>
                <option value="ID Card Replacement">ID Card Replacement</option>
                <option value="Damage Charge">Damage Charge</option>
                <option value="Other Manual Fee">Other Manual Fee</option>
              </select>
            </div>

            <div style={{ flex: 1, minWidth: '150px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Amount (₹):</label>
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00" 
                style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px', outline: 'none' }} 
              />
            </div>
            
          </div>
          
          <div>
             <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' }}>Remarks:</label>
             <input 
               type="text" 
               value={remarks}
               onChange={(e) => setRemarks(e.target.value)}
               placeholder="Optional remarks" 
               style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px', outline: 'none' }} 
             />
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button 
              onClick={handleSave}
              disabled={loading}
              style={{ background: '#4ade80', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '4px', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' }}
            >
              <Save size={16} /> Add Charge
            </button>
            <button 
              onClick={() => { setStudent(null); setAmount(''); setRemarks(''); }}
              style={{ background: '#f59e0b', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '4px', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' }}
            >
              <RotateCcw size={16} /> Reset
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
