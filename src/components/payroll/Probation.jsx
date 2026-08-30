import React from 'react';
import SummaryCard from './SummaryCard';
import { Calendar, Eye } from 'lucide-react';

export default function Probation() {
  return (
    <SummaryCard title="NO. OF PROBATION">
      <div style={{ marginTop: '20px' }}>
        <div className="stat-row">
          <div className="stat-row-left">
            <Calendar size={20} color="var(--payroll-text-blue)" />
            This Month
          </div>
          <div className="stat-row-val">0</div>
          <div className="card-link" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Eye size={14} /> View All
          </div>
        </div>
        
        <div className="stat-row" style={{ marginTop: '30px' }}>
          <div className="stat-row-left">
            <Calendar size={20} color="#999" />
            This Year
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
