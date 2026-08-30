import React from 'react';

export default function RecentTransitionsCard() {
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
          Recent Transitions
          <span style={{ fontWeight: 400, fontSize: 11, color: '#64748b', textTransform: 'none' }}>
            {' '}(Student Wise)
          </span>
        </div>
        <div style={{ fontSize: 11, color: '#64748b', marginTop: 3 }}>ON 28-Aug-2026</div>
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <span style={{ fontSize: 12, color: '#94a3b8', fontStyle: 'italic' }}>No Records Found</span>
      </div>
    </div>
  );
}
