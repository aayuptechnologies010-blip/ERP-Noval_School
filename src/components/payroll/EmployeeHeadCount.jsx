import React from 'react';
import SummaryCard from './SummaryCard';
import { User, UserRound } from 'lucide-react';

export default function EmployeeHeadCount() {
  return (
    <SummaryCard title="EMPLOYEE HEAD COUNT (YTD)">
      <div className="headcount-total">
        <span style={{ fontWeight: 'normal' }}>Total: </span>
        <span style={{ fontWeight: 'bold' }}>32</span>
      </div>
      
      <div className="progress-row">
        <div className="progress-label">
          <User size={16} color="var(--payroll-male)" />
          <span>Male</span>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: '53.13%', backgroundColor: 'var(--payroll-male)' }}></div>
        </div>
        <div className="progress-value">
          17 (53.13%)
        </div>
      </div>
      
      <div className="progress-row">
        <div className="progress-label">
          <UserRound size={16} color="var(--payroll-female)" />
          <span>Female</span>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: '46.88%', backgroundColor: 'var(--payroll-female)' }}></div>
        </div>
        <div className="progress-value">
          15 (46.88%)
        </div>
      </div>
    </SummaryCard>
  );
}
