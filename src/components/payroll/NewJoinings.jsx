import React from 'react';
import SummaryCard from './SummaryCard';
import { User, UserRound } from 'lucide-react';

export default function NewJoinings() {
  return (
    <SummaryCard title="NEW JOININGS (YTD)">
      <div style={{ marginTop: '20px' }}>
        <div className="progress-row">
          <div className="progress-label">
            <User size={16} color="var(--payroll-male)" />
            <span>Male</span>
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: '0%', backgroundColor: 'var(--payroll-male)' }}></div>
          </div>
          <div className="progress-value">
            0 (%)
          </div>
        </div>
        
        <div className="progress-row" style={{ marginTop: '30px' }}>
          <div className="progress-label">
            <UserRound size={16} color="var(--payroll-female)" />
            <span>Female</span>
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: '0%', backgroundColor: 'var(--payroll-female)' }}></div>
          </div>
          <div className="progress-value">
            0 (%)
          </div>
        </div>
      </div>
    </SummaryCard>
  );
}
