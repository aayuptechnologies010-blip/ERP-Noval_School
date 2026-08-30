import React, { useState } from 'react';
import FeeSidebar from './FeeSidebar';
import FeeTopHeader from './FeeTopHeader';

export default function FeeDashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-full w-full overflow-hidden bg-[#edf2f6]">
      <FeeSidebar collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <FeeTopHeader />
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
}
