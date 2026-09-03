import React, { useState, useEffect } from 'react';
import { Eye, Download } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const token = localStorage.getItem('token');

const inputStyle = { width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' };
const labelStyle = { display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' };

export default function FeesStudentLedger() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [ledgerData, setLedgerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/classes`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => setClasses(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (selectedClass) {
      fetch(`${API_URL}/api/students?class=${selectedClass}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => res.json())
        .then(data => {
          setStudents(Array.isArray(data) ? data : data.students || []);
        })
        .catch(console.error);
    } else {
      setStudents([]);
    }
  }, [selectedClass]);

  const filteredStudents = students.filter(s => {
    const term = searchQuery.toLowerCase();
    const name = `${s.personalDetails?.firstName} ${s.personalDetails?.lastName}`.toLowerCase();
    const adm = s.academicDetails?.admissionNumber?.toLowerCase() || '';
    return name.includes(term) || adm.includes(term);
  });

  const handleShow = async () => {
    if (!selectedStudent) {
      setError('Please select a student first');
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/fee-transactions/ledger/${selectedStudent._id}`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (res.ok) {
        setLedgerData(data);
      } else {
        setError(data.message || 'Failed to fetch ledger');
      }
    } catch (err) {
      setError('Server connection error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100%', background: '#f3f4f6' }}>
      
      {/* Side Panel */}
      <div style={{ width: '250px', background: '#fff', borderRight: '1px solid #e5e7eb', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px', flexShrink: 0, overflowY: 'auto' }}>
        
        <div>
          <label style={labelStyle}>Class</label>
          <select value={selectedClass} onChange={e => { setSelectedClass(e.target.value); setSelectedStudent(null); }} style={inputStyle}>
            <option value="">Select Class</option>
            {classes.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
        </div>

        <div>
          <label style={labelStyle}>Search Student</label>
          <input 
            type="text" 
            placeholder="Name or Admission No..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)} 
            style={inputStyle} 
          />
        </div>

        {selectedClass && (
          <div style={{ border: '1px solid #e5e7eb', borderRadius: '4px', maxHeight: '150px', overflowY: 'auto' }}>
            {filteredStudents.length > 0 ? filteredStudents.map(s => (
              <div 
                key={s._id} 
                onClick={() => setSelectedStudent(s)}
                style={{ 
                  padding: '8px', 
                  fontSize: '12px', 
                  cursor: 'pointer', 
                  borderBottom: '1px solid #e5e7eb',
                  background: selectedStudent?._id === s._id ? '#e0f2fe' : '#fff'
                }}
              >
                <b>{s.academicDetails?.admissionNumber}</b> - {s.personalDetails?.firstName} {s.personalDetails?.lastName}
              </div>
            )) : (
              <div style={{ padding: '8px', fontSize: '12px', color: '#6b7280' }}>No students found</div>
            )}
          </div>
        )}

        {selectedStudent && (
          <div style={{ fontSize: '12px', color: '#374151', background: '#f9fafb', padding: '10px', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
            <div style={{ marginBottom: '4px' }}><b>Name:</b> {selectedStudent.personalDetails?.firstName} {selectedStudent.personalDetails?.lastName}</div>
            <div style={{ marginBottom: '4px' }}><b>Adm No:</b> {selectedStudent.academicDetails?.admissionNumber}</div>
            <div><b>Father:</b> {selectedStudent.parentsDetails?.fatherName}</div>
          </div>
        )}

        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button onClick={handleShow} disabled={loading || !selectedStudent} style={{ flex: 1, background: '#29a9d8', color: '#fff', border: 'none', padding: '8px 10px', borderRadius: '4px', fontSize: '12px', cursor: (loading || !selectedStudent) ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontWeight: 'bold' }}>
            <Eye size={14} /> {loading ? 'Loading...' : 'Show'}
          </button>
        </div>

      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <div style={{ background: '#fff', width: '100%', minHeight: '100%', borderRadius: '8px', border: '1px solid #e5e7eb', padding: '20px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: '16px', marginBottom: '20px' }}>
            <h2 style={{ margin: 0, fontSize: '18px', color: '#1f2937' }}>Student Fee Ledger</h2>
            {ledgerData && ledgerData.transactions && ledgerData.transactions.length > 0 && (
              <button style={{ background: '#10b981', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' }}>
                <Download size={14} /> Export Excel
              </button>
            )}
          </div>

          {error && <div style={{ padding: '12px', background: '#fee2e2', color: '#991b1b', borderRadius: '4px', marginBottom: '20px', fontSize: '13px' }}>{error}</div>}

          {!ledgerData && !loading && !error && (
            <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280', fontSize: '14px' }}>
              Select a student and click "Show" to view their fee ledger.
            </div>
          )}

          {ledgerData && (
            <div>
              {/* Ledger Summary Cards */}
              <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
                <div style={{ flex: 1, background: '#f3f4f6', padding: '15px', borderRadius: '8px', border: '1px solid #d1d5db' }}>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#4b5563' }}>Total Due</div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#b91c1c', marginTop: '4px' }}>₹{ledgerData.ledger.totalDues.toLocaleString()}</div>
                </div>
                <div style={{ flex: 1, background: '#f3f4f6', padding: '15px', borderRadius: '8px', border: '1px solid #d1d5db' }}>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#4b5563' }}>Total Paid</div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#059669', marginTop: '4px' }}>₹{ledgerData.ledger.totalPaid.toLocaleString()}</div>
                </div>
                <div style={{ flex: 1, background: '#f3f4f6', padding: '15px', borderRadius: '8px', border: '1px solid #d1d5db' }}>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#4b5563' }}>Advance Balance</div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2563eb', marginTop: '4px' }}>₹{ledgerData.ledger.advanceAmount.toLocaleString()}</div>
                </div>
              </div>

              <h3 style={{ fontSize: '15px', color: '#374151', marginBottom: '15px' }}>Transaction History</h3>
              {ledgerData.transactions && ledgerData.transactions.length > 0 ? (
                <div style={{ overflowX: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                    <thead style={{ background: '#f9fafb' }}>
                      <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Date</th>
                        <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Receipt No</th>
                        <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Pay Mode</th>
                        <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Remarks</th>
                        <th style={{ padding: '12px 16px', textAlign: 'right', color: '#374151' }}>Amount (₹)</th>
                        <th style={{ padding: '12px 16px', textAlign: 'center', color: '#374151' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ledgerData.transactions.map((t, i) => (
                        <tr key={t._id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                          <td style={{ padding: '12px 16px', color: '#4b5563' }}>{new Date(t.createdAt).toLocaleDateString()}</td>
                          <td style={{ padding: '12px 16px', color: '#1f2937', fontWeight: '500' }}>{t.receiptNo}</td>
                          <td style={{ padding: '12px 16px', color: '#4b5563' }}>{t.paymentMode}</td>
                          <td style={{ padding: '12px 16px', color: '#4b5563' }}>{t.remarks || '-'}</td>
                          <td style={{ padding: '12px 16px', color: t.transactionType === 'Refund' ? '#b91c1c' : '#059669', textAlign: 'right', fontWeight: 'bold' }}>
                            {t.transactionType === 'Refund' ? '-' : ''}{t.amountPaid}
                          </td>
                          <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                            <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold', background: t.status === 'Cancelled' ? '#fee2e2' : '#d1fae5', color: t.status === 'Cancelled' ? '#991b1b' : '#065f46' }}>
                              {t.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div style={{ padding: '20px', border: '1px dashed #d1d5db', borderRadius: '8px', textAlign: 'center', color: '#6b7280' }}>
                  No transactions found for this student.
                </div>
              )}
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
