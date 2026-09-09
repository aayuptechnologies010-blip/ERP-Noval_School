import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import QuickAccessTabs from './QuickAccessTabs';
import AssignAmountGroup from './AssignAmountGroup';
import AssignMultipleGroup from './AssignMultipleGroup';
import WebAdmin from './WebAdmin';
import Toast from './Toast';
import './styles.css';

import ManageWing from '../pages/ManageWing';
import ManageCaste from '../pages/ManageCaste';
import ManageReligion from '../pages/ManageReligion';
import ManageCategory from '../pages/ManageCategory';
import ManageSection from '../pages/ManageSection';
import ManageSchoolClass from '../pages/ManageSchoolClass';
import ManageStream from '../pages/ManageStream';
import ManageRemark from '../pages/ManageRemark';
import ManageReason from '../pages/ManageReason';
import ManageSubCaste from '../pages/ManageSubCaste';
import ManageParish from '../pages/ManageParish';
import ManageAcademicYear from '../pages/ManageAcademicYear';
import ManageFinancialYear from '../pages/ManageFinancialYear';
import ManageSchoolBoard from '../pages/ManageSchoolBoard';
import ManageProfession from '../pages/ManageProfession';
import ManageParentsStatus from '../pages/ManageParentsStatus';
import ManageStudentClassification from '../pages/ManageStudentClassification';
import ManageClubMaster from '../pages/ManageClubMaster';
import ManageCommittee from '../pages/ManageCommittee';

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
          {activeTab === 'Wing' && <ManageWing />}
          {activeTab === 'Caste' && <ManageCaste />}
          {activeTab === 'Religion' && <ManageReligion />}
          {activeTab === 'Category' && <ManageCategory />}
          {activeTab === 'Section' && <ManageSection />}
          {activeTab === 'School Class' && <ManageSchoolClass />}
          {activeTab === 'Stream' && <ManageStream />}
          {activeTab === 'Remark' && <ManageRemark />}
          {activeTab === 'Reason' && <ManageReason />}
          {activeTab === 'Sub Caste' && <ManageSubCaste />}
          {activeTab === 'Parish' && <ManageParish />}
          {activeTab === 'Academic Year' && <ManageAcademicYear />}
          {activeTab === 'Financial Year' && <ManageFinancialYear />}
          {activeTab === 'School Board' && <ManageSchoolBoard />}
          {activeTab === 'Profession' && <ManageProfession />}
          {activeTab === 'Parents Status' && <ManageParentsStatus />}
          {activeTab === 'Student Classification' && <ManageStudentClassification />}
          {activeTab === 'Club' && <ManageClubMaster />}
          {activeTab === 'Committee' && <ManageCommittee />}
        </div>
      </div>
      <Toast message={toastMessage} />
    </div>
  );
}
