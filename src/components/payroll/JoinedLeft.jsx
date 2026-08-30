import React from 'react';
import SummaryCard from './SummaryCard';
import { Users, Eye } from 'lucide-react';

export default function JoinedLeft() {
  return (
    <SummaryCard title="JOINED AND LEFT EMPLOYEE (YTD)">
      <div style={{ marginTop: '20px' }}>
        <div className="stat-row">
          <div className="stat-row-left">
            <Users size={20} color="var(--payroll-green)" />
            Joined
          </div>
          <div className="stat-row-val">0</div>
          <div className="card-link" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Eye size={14} /> View All
          </div>
        </div>
        
        <div className="stat-row" style={{ marginTop: '30px' }}>
          <div className="stat-row-left">
            <Users size={20} color="var(--payroll-female)" />
            Left
          </div>
          <div className="stat-row-val">0</div>
          <div className="card-link" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Eye size={14} /> View All
          </div>
        </div>
      </div>
    </SummaryCard>
  );
}
