import React from 'react';
import './styles.css';

export default function QuickAccessTabs({ tabs, activeTab, onTabSelect, onTabClose }) {
  return (
    <div className="erp-quick-access">
      <div className="erp-quick-access-label">QUICK ACCESS</div>
      <div className="erp-tabs">
        {tabs.map(tab => (
          <div 
            key={tab} 
            className={`erp-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => onTabSelect(tab)}
          >
            {tab}
            <span 
              className="erp-tab-close" 
              onClick={(e) => { e.stopPropagation(); onTabClose(tab); }}
            >
              ×
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
