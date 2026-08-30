import React from 'react';

export default function SummaryCard({ title, children, titleAlign = 'center' }) {
  return (
    <div className="summary-card">
      <div className="card-header">
        <h3 className={`card-title ${titleAlign === 'left' ? 'card-title-left' : ''}`}>
          {title}
        </h3>
      </div>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}
