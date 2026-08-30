import React from 'react';
import PayrollDashboard from '../components/payroll/PayrollDashboard';
import '../EnterpriseApp/styles.css';

export default function PayrollApp() {
  return (
    <div className="erp-container">
      {/* Slim Sidebar for Payroll as seen in typical ERP layouts */}
      <div className="erp-sidebar" style={{ width: '60px' }}>
        <div className="erp-sidebar-top" style={{ justifyContent: 'center', padding: 0 }}>
          <span style={{ fontSize: '16px', cursor: 'pointer' }}>☰</span>
        </div>
        <div className="erp-nav" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '20px', gap: '20px' }}>
          <span className="erp-nav-icon" style={{ margin: 0, fontSize: '20px', cursor: 'pointer' }}>⚙️</span>
          <span className="erp-nav-icon" style={{ margin: 0, fontSize: '20px', cursor: 'pointer' }}>👥</span>
          <span className="erp-nav-icon" style={{ margin: 0, fontSize: '20px', cursor: 'pointer' }}>💰</span>
          <span className="erp-nav-icon" style={{ margin: 0, fontSize: '20px', cursor: 'pointer' }}>📈</span>
        </div>
      </div>
      
      <div className="erp-main">
        {/* Top Header */}
        <div className="erp-header">
          <div className="erp-header-left">
            <div className="erp-header-title">NAVALS NATIONAL ACADEMY</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginLeft: '20px' }}>
              <span>🏢</span> Payroll
            </div>
            <div className="erp-header-controls" style={{ marginLeft: '20px' }}>
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

        {/* The Dashboard Content */}
        <PayrollDashboard />
      </div>
    </div>
  );
}
