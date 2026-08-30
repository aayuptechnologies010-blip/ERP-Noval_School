import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import QuickAccessTabs from './QuickAccessTabs';
import AssignAmountGroup from './AssignAmountGroup';
import AssignMultipleGroup from './AssignMultipleGroup';
import WebAdmin from './WebAdmin';
import Toast from './Toast';
import './styles.css';

export default function EnterpriseApp() {
  const [tabs, setTabs] = useState(['Assign Amount Group']);
  const [activeTab, setActiveTab] = useState('Assign Amount Group');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleNavigate = (page) => {
    if (!tabs.includes(page)) {
      setTabs([...tabs, page]);
    }
    setActiveTab(page);
  };

  const handleTabClose = (page) => {
    const newTabs = tabs.filter(t => t !== page);
    setTabs(newTabs);
    if (activeTab === page && newTabs.length > 0) {
      setActiveTab(newTabs[newTabs.length - 1]);
    } else if (newTabs.length === 0) {
      setActiveTab('');
    }
  };

  return (
    <div className="erp-container">
      <Sidebar activeTab={activeTab} onNavigate={handleNavigate} />
      <div className="erp-main">
        <Header />
        <QuickAccessTabs 
          tabs={tabs} 
          activeTab={activeTab} 
          onTabSelect={setActiveTab} 
          onTabClose={handleTabClose} 
        />
        <div className="erp-content">
          {activeTab === 'Assign Amount Group' && (
            <AssignAmountGroup setToast={showToast} />
          )}
          {activeTab === 'Assign Multiple Group to Student' && (
            <AssignMultipleGroup setToast={showToast} />
          )}
          {activeTab === 'Web Admin' && (
            <WebAdmin setToast={showToast} />
          )}
        </div>
      </div>
      <Toast message={toastMessage} />
    </div>
  );
}
