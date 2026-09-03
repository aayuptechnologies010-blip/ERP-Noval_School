import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function RecentTransitionsCard() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/api/fee-reports/dashboard/recent-transactions`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const result = await res.json();
        if (res.ok) {
          setTransactions(result);
        }
      } catch (error) {
        console.error('Failed to fetch recent transactions', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{
      background: '#fff',
      border: '1px solid #e2e8f0',
      width: 280,
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{ padding: '14px 16px 10px 16px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#1e293b', textTransform: 'uppercase', letterSpacing: 0.3 }}>
          Recent Transactions
          <span style={{ fontWeight: 400, fontSize: 11, color: '#64748b', textTransform: 'none' }}>
            {' '}(Student Wise)
          </span>
        </div>
        <div style={{ fontSize: 11, color: '#64748b', marginTop: 3 }}>As on {new Date().toLocaleDateString('en-IN')}</div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {loading ? (
          <div style={{ padding: 24, textAlign: 'center', fontSize: 12, color: '#94a3b8' }}>Loading...</div>
        ) : transactions.length === 0 ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
            <span style={{ fontSize: 12, color: '#94a3b8', fontStyle: 'italic' }}>No Records Found</span>
          </div>
        ) : (
          <div>
            {transactions.map((tx, idx) => (
              <div key={idx} style={{ padding: '10px 16px', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#1e293b' }}>{tx.studentName}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#059669' }}>₹ {tx.amountPaid}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748b' }}>
                  <span>Class: {tx.class} | Adm No: {tx.admissionNumber}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748b', marginTop: 2 }}>
                  <span>Receipt: {tx.receiptNo}</span>
                  <span>{new Date(tx.receiptDate).toLocaleDateString('en-IN')}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
