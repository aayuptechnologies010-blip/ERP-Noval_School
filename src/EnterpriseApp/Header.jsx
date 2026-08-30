import React from 'react';
import './styles.css';

export default function Header() {
  return (
    <div className="erp-header">
      <div className="erp-header-left">
        <div className="erp-header-title">NAVALS NATIONAL ACADEMY</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span>🏢</span> Fees
        </div>
        <div className="erp-header-controls">
          <div>
            Academic Year: <select><option>2026-2027</option></select>
          </div>
          <div>
            Financial Year: <select><option>2026-2027</option></select>
          </div>
        </div>
      </div>
      <div className="erp-header-right">
        <span>❓</span>
        <span>⚙️</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
          ANKIT KUMAR <span style={{ fontSize: '10px' }}>▼</span>
        </div>
      </div>
    </div>
  );
}
