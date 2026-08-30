import React from 'react';
import './styles.css';

export default function Sidebar({ activeTab, onNavigate }) {
  return (
    <div className="erp-sidebar">
      <div className="erp-sidebar-top">
        <span style={{ fontSize: '16px', cursor: 'pointer' }}>☰</span>
      </div>
      <div className="erp-search-menu">
        <input type="text" placeholder="Search Menu" />
      </div>
      <div className="erp-nav">
        <div className="erp-nav-item">
          <span className="erp-nav-icon">📁</span> Global Masters
        </div>
        <div className="erp-nav-item">
          <span className="erp-nav-icon">⚙️</span> Master Settings
        </div>
        <div className="erp-nav-item parent">
          <span className="erp-nav-icon">▼</span> Fee Master
        </div>
        <div 
          className={`erp-nav-item child ${activeTab === 'Web Admin' ? 'active' : ''}`}
          onClick={() => onNavigate('Web Admin')}
        >
          Web Admin
        </div>
        <div className="erp-nav-item child">Define Fee Master</div>
        <div className="erp-nav-item child">Fee Group to Fee Head</div>
        <div 
          className={`erp-nav-item child ${activeTab === 'Assign Amount Group' ? 'active' : ''}`}
          onClick={() => onNavigate('Assign Amount Group')}
        >
          Assign Amount Group
        </div>
        <div 
          className={`erp-nav-item child ${activeTab === 'Assign Multiple Group to Student' ? 'active' : ''}`}
          onClick={() => onNavigate('Assign Multiple Group to Student')}
        >
          Assign Multiple Group to Student
        </div>
        <div className="erp-nav-item child" style={{ justifyContent: 'space-between' }}>
          <span><span className="erp-nav-icon">●</span> Define and Assign Concession</span>
          <span className="erp-nav-icon">▼</span>
        </div>
        <div className="erp-nav-item child" style={{ paddingLeft: '45px' }}>
          <span className="erp-nav-icon">&gt;</span> Define Concession
        </div>
        <div className="erp-nav-item child" style={{ paddingLeft: '45px' }}>
          <span className="erp-nav-icon">&gt;</span> Define Fee Head Concession
        </div>
        <div className="erp-nav-item child" style={{ paddingLeft: '45px' }}>
          <span className="erp-nav-icon">&gt;</span> Assign Concession To Student
        </div>
        <div className="erp-nav-item child" style={{ paddingLeft: '45px' }}>
          <span className="erp-nav-icon">&gt;</span> Define Concession Type
        </div>
        <div 
          className={`erp-nav-item child ${activeTab === 'Assign Concession' ? 'active' : ''}`} 
          style={{ paddingLeft: '45px' }}
          onClick={() => onNavigate('Assign Concession')}
        >
          <span className="erp-nav-icon">&gt;</span> Assign Concession
        </div>
        <div className="erp-nav-item child" style={{ paddingLeft: '45px' }}>
          <span className="erp-nav-icon">&gt;</span> Assign concession to single student
        </div>
        <div className="erp-nav-item child">Student Fee Adjustment</div>
        <div className="erp-nav-item child">Student Fee Details</div>
        <div className="erp-nav-item child">Assign Opening Balance</div>
        <div className="erp-nav-item child">Verify Structure</div>
        <div className="erp-nav-item child">Set Due Limit</div>
        <div className="erp-nav-item child">Late Fee Settings</div>
        <div className="erp-nav-item child">Create Students Fees Structure</div>
        <div className="erp-nav-item child">Define Expense Head</div>
        <div className="erp-nav-item child">Manage Fee</div>
      </div>
    </div>
  );
}
