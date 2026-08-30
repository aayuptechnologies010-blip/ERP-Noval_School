import React from 'react';
import { Settings, ChevronRight } from 'lucide-react';

export default function QuickAccess() {
  return (
    <div className="quick-access-strip">
      <div className="qa-btn qa-left">
        QUICK ACCESS
        <ChevronRight size={18} />
      </div>
      
      <div className="qa-btn qa-customize">
        <Settings size={16} />
        Customize
      </div>
    </div>
  );
}
