import React, { useState, useEffect } from 'react';
import { FaExclamationTriangle, FaClock, FaCheckCircle } from 'react-icons/fa';

const severityColors = {
  Minor:    { bg: '#fef9c3', color: '#ca8a04' },
  Moderate: { bg: '#ffedd5', color: '#ea580c' },
  Severe:   { bg: '#fee2e2', color: '#ef4444' },
};

function MyInfraction() {
  const [myRecords, setMyRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInfractions();
  }, []);

  const fetchInfractions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const staffId = user._id || user.id;

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/staff-infractions`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        const records = data.staffInfractions || data.infractions || [];
        // Filter by the current staff ID
        const myInfractions = records.filter(record => 
          record.staffId && (record.staffId === staffId || record.staffId._id === staffId)
        );
        setMyRecords(myInfractions);
      }
    } catch (error) {
      console.error("Failed to load infractions", error);
    } finally {
      setLoading(false);
    }
  };

  const totalPenaltyPoints = myRecords.reduce((sum, r) => sum + (Number(r.penaltyPoints) || 0), 0);

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '24px 32px 8px 32px' }}>
        <p style={{ margin: '0 0 4px', fontSize: 13, color: '#94a3b8' }}>Discipline › Infraction</p>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>My Infraction Records</h1>
      </div>

      <div style={{ padding: '16px 32px 32px', flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
        
        {/* Penalty Points Summary */}
        <div style={{ background: '#fff', borderRadius: 8, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FaExclamationTriangle size={28} color="#ef4444" />
          </div>
          <div>
            <h2 style={{ margin: '0 0 4px 0', fontSize: 24, fontWeight: 800, color: '#ef4444' }}>{totalPenaltyPoints}</h2>
            <p style={{ margin: 0, fontSize: 14, color: '#64748b', fontWeight: 600 }}>Total Penalty Points Accumulated</p>
          </div>
        </div>

        {/* Infractions List */}
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid #f1f5f9' }}>
            <h3 style={{ margin: 0, fontSize: 15, color: '#334155', fontWeight: 700 }}>Record History</h3>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  {['Infraction', 'Severity', 'Penalty Points', 'Consequence', 'Date', 'Status', 'Notes'].map(h => (
                    <th key={h} style={thStyle}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="7" style={{ textAlign: 'center', padding: 40 }}>Loading...</td></tr>
                ) : myRecords.length === 0 ? (
                  <tr><td colSpan="7" style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>No infraction records found. Good job!</td></tr>
                ) : (
                  myRecords.map((r) => (
                    <tr key={r._id || r.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ ...tdStyle, fontWeight: 600, color: '#1e293b' }}>{r.infractionType || r.infraction}</td>
                      <td style={tdStyle}>
                        <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: severityColors[r.severity]?.bg || '#f1f5f9', color: severityColors[r.severity]?.color || '#475569' }}>
                          {r.severity || 'Minor'}
                        </span>
                      </td>
                      <td style={tdStyle}><span style={{ fontWeight: 700, color: '#ef4444' }}>-{r.penaltyPoints || 0}</span></td>
                      <td style={tdStyle}>{r.consequence || '-'}</td>
                      <td style={tdStyle}>{r.date ? new Date(r.date).toLocaleDateString() : '-'}</td>
                      <td style={tdStyle}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#16a34a', fontWeight: 600 }}>
                          <FaCheckCircle size={12} /> {r.status || 'Resolved'}
                        </span>
                      </td>
                      <td style={{ ...tdStyle, color: '#64748b', fontSize: 13 }}>{r.notes || '-'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

const thStyle = { padding: '14px 16px', textAlign: 'left', fontSize: 13, fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', whiteSpace: 'nowrap' };
const tdStyle = { padding: '14px 16px', fontSize: 14, color: '#475569', verticalAlign: 'middle' };

export default MyInfraction;
