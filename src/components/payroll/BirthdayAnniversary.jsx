import React from 'react';
import SummaryCard from './SummaryCard';

export default function BirthdayAnniversary() {
  return (
    <SummaryCard title="TODAY'S BIRTHDAY AND ANNIVERSARY" titleAlign="left">
      <div style={{ fontSize: '13px', color: '#666', marginBottom: '30px' }}>
        30 Aug 2026
      </div>
      
      <div className="bday-grid">
        <div className="bday-col">
          <div className="bday-title">BIRTHDAY (0)</div>
          <div className="bday-placeholder">
            No Image<br/>Available
          </div>
          <div style={{ fontSize: '14px' }}>No Birthday Today</div>
        </div>
        
        <div className="bday-col">
          <div className="bday-title">ANNIVERSARY (0)</div>
          <div className="bday-placeholder">
            No Image<br/>Available
          </div>
          <div style={{ fontSize: '14px' }}>No Anniversary Today</div>
        </div>
      </div>
    </SummaryCard>
  );
}
