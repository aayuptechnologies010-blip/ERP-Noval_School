import React, { useState, useEffect } from 'react';
import { FaFileSignature, FaSearch, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export default function UndertakingAcknowledgement() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/reports/undertaking`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setRecords(data.records || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filtered = records.filter(r => 
    r.studentName.toLowerCase().includes(search.toLowerCase()) || 
    r.class.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '24px 32px 8px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ margin: '0 0 4px', fontSize: 13, color: '#94a3b8' }}>Report &rsaquo; Undertaking Acknowledgement</p>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Undertaking Acknowledgement</h1>
        </div>
      </div>

      <div style={{ padding: '16px 32px 32px', flex: 1, overflowY: 'auto' }}>
        <div style={{ background: '#fff', borderRadius: 12, padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
            <div style={{ position: 'relative', width: 300 }}>
              <FaSearch style={{ position: 'absolute', left: 12, top: 12, color: '#94a3b8' }} />
              <input 
                type="text" 
                placeholder="Search by student or class..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ width: '100%', padding: '10px 12px 10px 36px', border: '1px solid #cbd5e1', borderRadius: 6, outline: 'none' }}
              />
            </div>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f1f5f9' }}>
                <th style={{ padding: '12px', fontSize: 13, color: '#475569', fontWeight: 600 }}>Student Name</th>
                <th style={{ padding: '12px', fontSize: 13, color: '#475569', fontWeight: 600 }}>Class</th>
                <th style={{ padding: '12px', fontSize: 13, color: '#475569', fontWeight: 600 }}>Parent Name</th>
                <th style={{ padding: '12px', fontSize: 13, color: '#475569', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '12px', fontSize: 13, color: '#475569', fontWeight: 600 }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="5" style={{ padding: 20, textAlign: 'center', color: '#64748b' }}>Loading...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan="5" style={{ padding: 20, textAlign: 'center', color: '#64748b' }}>No records found.</td></tr>
              ) : (
                filtered.map(r => (
                  <tr key={r.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px', fontSize: 14, color: '#1e293b' }}>{r.studentName}</td>
                    <td style={{ padding: '12px', fontSize: 14, color: '#334155' }}>{r.class}</td>
                    <td style={{ padding: '12px', fontSize: 14, color: '#334155' }}>{r.parentName}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ 
                        padding: '4px 8px', borderRadius: 4, fontSize: 12, fontWeight: 600,
                        background: r.status === 'Acknowledged' ? '#dcfce7' : '#fee2e2',
                        color: r.status === 'Acknowledged' ? '#16a34a' : '#dc2626'
                      }}>
                        {r.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px', fontSize: 14, color: '#64748b' }}>{r.date || '-'}</td>
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
