import React from 'react';
import SummaryCard from './SummaryCard';
import { Calendar, Eye } from 'lucide-react';

export default function Retirements() {
  return (
    <SummaryCard title="NO. OF RETIREMENTS">
      <div className="retirements-grid">
        <div className="retirement-item">
          <Calendar size={24} color="var(--payroll-green)" />
          <span className="retirement-label">Year To Date</span>
          <span className="retirement-val">1</span>
          <div className="view-all card-link">
            <Eye size={12} /> View All
          </div>
        </div>
        
        <div className="retirement-item">
          <Calendar size={24} color="var(--payroll-text-blue)" />
          <span className="retirement-label">This Month</span>
          <span className="retirement-val">0</span>
          <div className="view-all card-link">
            <Eye size={12} /> View All
          </div>
        </div>
        
        <div className="retirement-item" style={{ marginTop: '15px' }}>
          <Calendar size={24} color="var(--payroll-female)" />
          <span className="retirement-label">Next Month</span>
          <span className="retirement-val">0</span>
          <div className="view-all card-link">
            <Eye size={12} /> View All
          </div>
        </div>
        
        <div className="retirement-item" style={{ marginTop: '15px' }}>
          <Calendar size={24} color="#999" />
          <span className="retirement-label">This Year</span>
          <span className="retirement-val">1</span>
          <div className="view-all card-link">
            <Eye size={12} /> View All
          </div>
        </div>
      </div>
    </SummaryCard>
  );
}
