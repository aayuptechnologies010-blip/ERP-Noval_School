import React, { useState } from 'react';
import { Search, Settings, Users, UserPlus, Banknote, LineChart, BarChart3, Menu, ChevronRight, ChevronDown } from 'lucide-react';
import { FaMoneyBill, FaChartBar } from 'react-icons/fa';

export default function PayrollSidebar({ activeView, setActiveView }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openMenu, setOpenMenu] = useState('master-settings');
  const [openNestedMenu, setOpenNestedMenu] = useState(null);

  const toggleMenu = (menuName) => {
    if (!isExpanded) setIsExpanded(true);
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  return (
    <div className={`payroll-sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="sidebar-top" onClick={() => setIsExpanded(!isExpanded)}>
        <Menu size={24} />
        {isExpanded && <span className="sidebar-title">Navigation</span>}
      </div>
      
      <div className="sidebar-search-container">
        {isExpanded ? (
          <div className="search-box-expanded">
            <Search size={16} color="#999" />
            <input type="text" placeholder="Search Menu" />
          </div>
        ) : (
          <div className="search-box-collapsed">
            <Search size={18} color="#666" />
          </div>
        )}
      </div>

      <div className="sidebar-menu">
        <div className={`menu-item ${activeView === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveView('dashboard')} style={{ cursor: 'pointer' }}>
          <div className="menu-item-header">
            <LineChart size={18} />
            {isExpanded && <span className="menu-text">Dashboard</span>}
          </div>
        </div>

        {/* Global Masters */}
        <div className="menu-item">
          <div className="menu-item-header" onClick={() => toggleMenu('global-masters')}>
            <Settings size={18} />
            {isExpanded && (
              <>
                <span className="menu-text">Global Masters</span>
                {openMenu === 'global-masters' ? <ChevronDown size={16} className="menu-arrow" /> : <ChevronRight size={16} className="menu-arrow" />}
              </>
            )}
          </div>
          {isExpanded && openMenu === 'global-masters' && (
            <div className="submenu">
              <div className="submenu-item" onClick={() => setActiveView('mail-template')} style={{ cursor: 'pointer' }}>• Define Mail Template</div>
              <div className="submenu-item" onClick={() => setActiveView('import-staff')} style={{ cursor: 'pointer' }}>• Import Staff</div>
              <div className="submenu-item" onClick={() => setActiveView('session-transfer')} style={{ cursor: 'pointer' }}>• Session Transfer</div>
            </div>
          )}
        </div>

        {/* Master Settings */}
        <div className={`menu-item ${openMenu === 'master-settings' ? 'active' : ''}`}>
          <div className="menu-item-header" onClick={() => toggleMenu('master-settings')}>
            <Settings size={18} />
            {isExpanded && (
              <>
                <span className="menu-text">Master Settings</span>
                {openMenu === 'master-settings' ? <ChevronDown size={16} className="menu-arrow" /> : <ChevronRight size={16} className="menu-arrow" />}
              </>
            )}
          </div>
          {isExpanded && openMenu === 'master-settings' && (
            <div className="submenu">
              <div 
                className={`submenu-item ${activeView === 'global-settings' ? 'active-sub' : ''}`} 
                onClick={() => setActiveView('global-settings')}
                style={{ cursor: 'pointer' }}
              >
                • Define Global Settings
              </div>
              <div 
                className={`submenu-item ${activeView === 'change-academic-year' ? 'active-sub' : ''}`} 
                onClick={() => setActiveView('change-academic-year')}
                style={{ cursor: 'pointer' }}
              >
                • Change Academic Year
              </div>
              <div 
                className={`submenu-item ${activeView === 'salary-calculation' ? 'active-sub' : ''}`} 
                onClick={() => setActiveView('salary-calculation')}
                style={{ cursor: 'pointer' }}
              >
                • Salary Calculation Based On
              </div>
              <div 
                className={`submenu-item ${activeView === 'define-staff-type' ? 'active-sub' : ''}`} 
                onClick={() => setActiveView('define-staff-type')}
                style={{ cursor: 'pointer' }}
              >
                • Define Staff Type
              </div>
              <div 
                className={`submenu-item ${activeView === 'define-qualification' ? 'active-sub' : ''}`} 
                onClick={() => setActiveView('define-qualification')}
                style={{ cursor: 'pointer' }}
              >
                • Define Qualification
              </div>
              <div 
                className={`submenu-item ${activeView === 'define-designation' ? 'active-sub' : ''}`} 
                onClick={() => setActiveView('define-designation')}
                style={{ cursor: 'pointer' }}
              >
                • Define Designation
              </div>
              <div 
                className={`submenu-item ${activeView === 'define-department' ? 'active-sub' : ''}`} 
                onClick={() => setActiveView('define-department')}
                style={{ cursor: 'pointer' }}
              >
                • Define Department
              </div>
              <div 
                className={`submenu-item ${activeView === 'report-setting' ? 'active-sub' : ''}`} 
                onClick={() => setActiveView('report-setting')}
                style={{ cursor: 'pointer' }}
              >
                • Report Setting
              </div>
              <div 
                className={`submenu-item ${activeView === 'upload-staff-photo' ? 'active-sub' : ''}`} 
                onClick={() => setActiveView('upload-staff-photo')}
                style={{ cursor: 'pointer' }}
              >
                • Upload Staff Photo
              </div>
              <div 
                className={`submenu-item ${activeView === 'download-staff-photos' ? 'active-sub' : ''}`} 
                onClick={() => setActiveView('download-staff-photos')}
                style={{ cursor: 'pointer' }}
              >
                • Download Staff Photos
              </div>
              <div 
                className={`submenu-item ${activeView === 'define-staff-document-type' ? 'active-sub' : ''}`} 
                onClick={() => setActiveView('define-staff-document-type')}
                style={{ cursor: 'pointer' }}
              >
                • Define Staff Document Type
              </div>
            </div>
          )}
        </div>
        
        {/* Payroll Master - Expandable */}
        <div className={`menu-item ${openMenu === 'payroll-master' ? 'active' : ''}`}>
          <div className="menu-item-header" onClick={() => toggleMenu('payroll-master')}>
            <UserPlus size={18} />
            {isExpanded && (
              <>
                <span className="menu-text">Payroll Master</span>
                {openMenu === 'payroll-master' ? <ChevronDown size={16} className="menu-arrow" /> : <ChevronRight size={16} className="menu-arrow" />}
              </>
            )}
          </div>
          {isExpanded && openMenu === 'payroll-master' && (
            <div className="submenu">
              <div 
                className={`submenu-item ${activeView === 'staff-registration' ? 'active-sub' : ''}`} 
                onClick={() => setActiveView('staff-registration')}
                style={{ cursor: 'pointer' }}
              >
                • Staff Registration
              </div>
              <div 
                className={`submenu-item ${activeView === 'define-salary-account' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('define-salary-account')}
                style={{ cursor: 'pointer' }}
              >
                • Define Salary Account
              </div>
              <div 
                className={`submenu-item ${activeView === 'define-salary-month' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('define-salary-month')}
                style={{ cursor: 'pointer' }}
              >
                • Define Salary Month
              </div>
              <div 
                className={`submenu-item ${activeView === 'assign-info-bulk' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('assign-info-bulk')}
                style={{ cursor: 'pointer' }}
              >
                • Assign Info Bulk
              </div>
              <div 
                className="submenu-item" 
                style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', paddingRight: '15px' }}
                onClick={() => setOpenNestedMenu(openNestedMenu === 'salary-structure' ? null : 'salary-structure')}
              >
                <span>• Create Salary Structure</span>
                {openNestedMenu === 'salary-structure' ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </div>
              {openNestedMenu === 'salary-structure' && (
                <div style={{ paddingLeft: '15px', backgroundColor: 'rgba(0,0,0,0.02)' }}>
                  <div 
                    className={`submenu-item ${activeView === 'define-salary-head' ? 'active-sub' : ''}`}
                    onClick={() => setActiveView('define-salary-head')}
                    style={{ cursor: 'pointer' }}
                  >
                    › Define Salary Head
                  </div>
                  <div 
                    className={`submenu-item ${activeView === 'relate-static-dynamic-heads' ? 'active-sub' : ''}`}
                    onClick={() => setActiveView('relate-static-dynamic-heads')}
                    style={{ cursor: 'pointer' }}
                  >
                    › Relate Static Dynamic Heads
                  </div>
                  <div 
                    className={`submenu-item ${activeView === 'define-salary-group' ? 'active-sub' : ''}`}
                    onClick={() => setActiveView('define-salary-group')}
                    style={{ cursor: 'pointer' }}
                  >
                    › Define Salary Group
                  </div>
                  <div 
                    className={`submenu-item ${activeView === 'assign-salary-head-to-group' ? 'active-sub' : ''}`}
                    onClick={() => setActiveView('assign-salary-head-to-group')}
                    style={{ cursor: 'pointer' }}
                  >
                    › Assign Salary Head to Group
                  </div>
                  <div 
                    className={`submenu-item ${activeView === 'assign-salary-group-to-staff' ? 'active-sub' : ''}`}
                    onClick={() => setActiveView('assign-salary-group-to-staff')}
                    style={{ cursor: 'pointer' }}
                  >
                    › Assign Salary Group to Staff
                  </div>
                  <div 
                    className={`submenu-item ${activeView === 'bulk-salary-head-assign' ? 'active-sub' : ''}`}
                    onClick={() => setActiveView('bulk-salary-head-assign')}
                    style={{ cursor: 'pointer' }}
                  >
                    › Bulk Salary Head Assign
                  </div>
                  <div 
                    className={`submenu-item ${activeView === 'bulk-salary-head-entry' ? 'active-sub' : ''}`}
                    onClick={() => setActiveView('bulk-salary-head-entry')}
                    style={{ cursor: 'pointer' }}
                  >
                    › Bulk Salary Head Entry
                  </div>
                  <div 
                    className={`submenu-item ${activeView === 'define-7th-cpc-level' ? 'active-sub' : ''}`}
                    onClick={() => setActiveView('define-7th-cpc-level')}
                    style={{ cursor: 'pointer' }}
                  >
                    › Define 7th CPC Level
                  </div>
                  <div 
                    className={`submenu-item ${activeView === 'define-7th-commission-basic' ? 'active-sub' : ''}`}
                    onClick={() => setActiveView('define-7th-commission-basic')}
                    style={{ cursor: 'pointer' }}
                  >
                    › Define 7th Commission Basic
                  </div>
                  <div 
                    className={`submenu-item ${activeView === 'bulk-head-remark-entry' ? 'active-sub' : ''}`}
                    onClick={() => setActiveView('bulk-head-remark-entry')}
                    style={{ cursor: 'pointer' }}
                  >
                    › Bulk Head Remark Entry
                  </div>
                </div>
              )}
              <div 
                className="submenu-item" 
                style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', paddingRight: '15px' }}
                onClick={() => setOpenNestedMenu(openNestedMenu === 'tds-config' ? null : 'tds-config')}
              >
                <span>• TDS Configuration</span>
                {openNestedMenu === 'tds-config' ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </div>
              {openNestedMenu === 'tds-config' && (
                <div style={{ paddingLeft: '15px', backgroundColor: 'rgba(0,0,0,0.02)' }}>
                  <div 
                    className={`submenu-item ${activeView === 'define-income-tax-slab' ? 'active-sub' : ''}`}
                    onClick={() => setActiveView('define-income-tax-slab')}
                    style={{ cursor: 'pointer' }}
                  >
                    › Define Income Tax Slab
                  </div>
                  <div 
                    className={`submenu-item ${activeView === 'relate-it-slab-to-staff' ? 'active-sub' : ''}`}
                    onClick={() => setActiveView('relate-it-slab-to-staff')}
                    style={{ cursor: 'pointer' }}
                  >
                    › Relate IT Slab To Staff
                  </div>
                  <div 
                    className={`submenu-item ${activeView === 'define-it-head-groups' ? 'active-sub' : ''}`}
                    onClick={() => setActiveView('define-it-head-groups')}
                    style={{ cursor: 'pointer' }}
                  >
                    › Define IT Head Groups
                  </div>
                  <div 
                    className={`submenu-item ${activeView === 'define-it-head' ? 'active-sub' : ''}`}
                    onClick={() => setActiveView('define-it-head')}
                    style={{ cursor: 'pointer' }}
                  >
                    › Define IT Head
                  </div>
                  <div 
                    className={`submenu-item ${activeView === 'define-tds-deductee' ? 'active-sub' : ''}`}
                    onClick={() => setActiveView('define-tds-deductee')}
                    style={{ cursor: 'pointer' }}
                  >
                    › Define TDS Deductee
                  </div>
                </div>
              )}
              <div 
                className="submenu-item" 
                style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', paddingRight: '15px' }}
                onClick={() => setOpenNestedMenu(openNestedMenu === 'pay-scale-config' ? null : 'pay-scale-config')}
              >
                <span>• Pay Scale Configuration</span>
                {openNestedMenu === 'pay-scale-config' ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </div>
              {openNestedMenu === 'pay-scale-config' && (
                <div style={{ paddingLeft: '15px', backgroundColor: 'rgba(0,0,0,0.02)' }}>
                  <div 
                    className={`submenu-item ${activeView === 'define-pay-scale' ? 'active-sub' : ''}`}
                    onClick={() => setActiveView('define-pay-scale')}
                    style={{ cursor: 'pointer' }}
                  >
                    › Define Pay Scale
                  </div>
                  <div 
                    className={`submenu-item ${activeView === 'define-pay-scale-amount' ? 'active-sub' : ''}`}
                    onClick={() => setActiveView('define-pay-scale-amount')}
                    style={{ cursor: 'pointer' }}
                  >
                    › Define Pay Scale Amount
                  </div>
                  <div 
                    className={`submenu-item ${activeView === 'define-grade-pay' ? 'active-sub' : ''}`}
                    onClick={() => setActiveView('define-grade-pay')}
                    style={{ cursor: 'pointer' }}
                  >
                    › Define Grade Pay
                  </div>
                  <div 
                    className={`submenu-item ${activeView === 'define-fixation' ? 'active-sub' : ''}`}
                    onClick={() => setActiveView('define-fixation')}
                    style={{ cursor: 'pointer' }}
                  >
                    › Define Fixation
                  </div>
                  <div 
                    className={`submenu-item ${activeView === 'assign-pay-scale-to-staff' ? 'active-sub' : ''}`}
                    onClick={() => setActiveView('assign-pay-scale-to-staff')}
                    style={{ cursor: 'pointer' }}
                  >
                    › Assign Pay Scale to Staff
                  </div>
                </div>
              )}
              <div 
                className={`submenu-item ${activeView === 'modify-staff-in-bulk' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('modify-staff-in-bulk')}
                style={{ cursor: 'pointer' }}
              >
                • Modify Staff in Bulk
              </div>
              <div 
                className={`submenu-item ${activeView === 'rejoin-staff' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('rejoin-staff')}
                style={{ cursor: 'pointer' }}
              >
                • Rejoin Staff
              </div>
              <div 
                className={`submenu-item ${activeView === 'generate-barcode' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('generate-barcode')}
                style={{ cursor: 'pointer' }}
              >
                • Generate Barcode
              </div>
              <div 
                className={`submenu-item ${activeView === 'assign-transport-to-staff' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('assign-transport-to-staff')}
                style={{ cursor: 'pointer' }}
              >
                • Assign Transport To Staff
              </div>
              <div 
                className="submenu-item" 
                style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', paddingRight: '15px' }}
                onClick={() => setOpenNestedMenu(openNestedMenu === 'insurance' ? null : 'insurance')}
              >
                <span>• Insurance</span>
                {openNestedMenu === 'insurance' ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </div>
              {openNestedMenu === 'insurance' && (
                <div style={{ paddingLeft: '15px', backgroundColor: 'rgba(0,0,0,0.02)' }}>
                  <div 
                    className={`submenu-item ${activeView === 'insurance-vendor' ? 'active-sub' : ''}`}
                    onClick={() => setActiveView('insurance-vendor')}
                    style={{ cursor: 'pointer' }}
                  >
                    › Insurance Vendor
                  </div>
                  <div 
                    className={`submenu-item ${activeView === 'relate-policy-with-employee' ? 'active-sub' : ''}`}
                    onClick={() => setActiveView('relate-policy-with-employee')}
                    style={{ cursor: 'pointer' }}
                  >
                    › Relate policy with Employee
                  </div>
                  <div 
                    className={`submenu-item ${activeView === 'related-policies-with-month' ? 'active-sub' : ''}`}
                    onClick={() => setActiveView('related-policies-with-month')}
                    style={{ cursor: 'pointer' }}
                  >
                    › Related Policies with Month
                  </div>
                </div>
              )}
              <div 
                className={`submenu-item ${activeView === 'professional-tax-slab' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('professional-tax-slab')}
                style={{ cursor: 'pointer' }}
              >
                • Professional Tax slab
              </div>
              <div 
                className={`submenu-item ${activeView === 'upload-staff-document' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('upload-staff-document')}
                style={{ cursor: 'pointer' }}
              >
                • Upload Staff Document
              </div>
            </div>
          )}
        </div>

        <div className={`menu-item ${openMenu === 'recruitment' ? 'active' : ''}`}>
          <div className="menu-item-header" onClick={() => toggleMenu('recruitment')}>
            <Users size={18} />
            {isExpanded && (
              <>
                <span className="menu-text">Recruitment</span>
                {openMenu === 'recruitment' ? <ChevronDown size={16} className="menu-arrow" /> : <ChevronRight size={16} className="menu-arrow" />}
              </>
            )}
          </div>
          {isExpanded && openMenu === 'recruitment' && (
            <div className="submenu">
              <div 
                className={`submenu-item ${activeView === 'interview-type' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('interview-type')}
                style={{ cursor: 'pointer' }}
              >
                • Interview Type
              </div>
              <div 
                className={`submenu-item ${activeView === 'assessment-type' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('assessment-type')}
                style={{ cursor: 'pointer' }}
              >
                • Assessment Type
              </div>
              <div 
                className={`submenu-item ${activeView === 'interview-slot' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('interview-slot')}
                style={{ cursor: 'pointer' }}
              >
                • Interview Slot
              </div>
              <div 
                className={`submenu-item ${activeView === 'job-posting' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('job-posting')}
                style={{ cursor: 'pointer' }}
              >
                • Job Posting
              </div>
              <div 
                className={`submenu-item ${activeView === 'application-received' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('application-received')}
                style={{ cursor: 'pointer' }}
              >
                • Application Received
              </div>
              <div 
                className={`submenu-item ${activeView === 'slot-assigning' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('slot-assigning')}
                style={{ cursor: 'pointer' }}
              >
                • Slot Assigning
              </div>
              <div 
                className={`submenu-item ${activeView === 'travel-plan-approval' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('travel-plan-approval')}
                style={{ cursor: 'pointer' }}
              >
                • Travel Plan Approval
              </div>
              <div 
                className={`submenu-item ${activeView === 'hr-entry-forms' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('hr-entry-forms')}
                style={{ cursor: 'pointer' }}
              >
                • HR Entry Forms
              </div>
              <div 
                className={`submenu-item ${activeView === 'hr-exit-forms' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('hr-exit-forms')}
                style={{ cursor: 'pointer' }}
              >
                • HR Exit Forms
              </div>
              <div 
                className={`submenu-item ${activeView === 'employment-form' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('employment-form')}
                style={{ cursor: 'pointer' }}
              >
                • Employment Form
              </div>
            </div>
          )}
        </div>

        <div className={`menu-item ${openMenu === 'advance' ? 'active' : ''}`}>
          <div className="menu-item-header" onClick={() => toggleMenu('advance')}>
            <FaMoneyBill size={18} />
            {isExpanded && (
              <>
                <span className="menu-text">Advance</span>
                {openMenu === 'advance' ? <ChevronDown size={16} className="menu-arrow" /> : <ChevronRight size={16} className="menu-arrow" />}
              </>
            )}
          </div>
          {isExpanded && openMenu === 'advance' && (
            <div className="submenu">
              <div 
                className={`submenu-item ${activeView === 'fix-advance-ac' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('fix-advance-ac')}
                style={{ cursor: 'pointer' }}
              >
                • Fix Advance A/c
              </div>
              <div 
                className={`submenu-item ${activeView === 'employment-form' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('employment-form')}
                style={{ cursor: 'pointer' }}
              >
                • Employment Form
              </div>
              <div 
                className={`submenu-item ${activeView === 'advance-entry' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('advance-entry')}
                style={{ cursor: 'pointer' }}
              >
                • Advance entry
              </div>
              <div 
                className={`submenu-item ${activeView === 'advance-repayment' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('advance-repayment')}
                style={{ cursor: 'pointer' }}
              >
                • Advance Repayment
              </div>
              <div 
                className="submenu-item" 
                style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', paddingRight: '15px' }}
                onClick={() => setOpenNestedMenu(openNestedMenu === 'advance-report' ? null : 'advance-report')}
              >
                <span>• Advance Report</span>
                {openNestedMenu === 'advance-report' ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </div>
              {openNestedMenu === 'advance-report' && (
                <div style={{ paddingLeft: '15px', backgroundColor: 'rgba(0,0,0,0.02)' }}>
                  <div 
                    className={`submenu-item ${activeView === 'advance-entry-report' ? 'active-sub' : ''}`}
                    onClick={() => setActiveView('advance-entry-report')}
                    style={{ cursor: 'pointer' }}
                  >
                    › Advance Entry Report
                  </div>
                  <div 
                    className={`submenu-item ${activeView === 'advance-repayment-report' ? 'active-sub' : ''}`}
                    onClick={() => setActiveView('advance-repayment-report')}
                    style={{ cursor: 'pointer' }}
                  >
                    › Advance Repayment Report
                  </div>
                  <div 
                    className={`submenu-item ${activeView === 'advance-ledger-report' ? 'active-sub' : ''}`}
                    onClick={() => setActiveView('advance-ledger-report')}
                    style={{ cursor: 'pointer' }}
                  >
                    › Advance Ledger Report
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className={`menu-item ${openMenu === 'salary-structure' ? 'active' : ''}`}>
          <div className="menu-item-header" onClick={() => toggleMenu('salary-structure')}>
            <FaMoneyBill size={18} />
            {isExpanded && (
              <>
                <span className="menu-text">Salary Structure</span>
                {openMenu === 'salary-structure' ? <ChevronDown size={16} className="menu-arrow" /> : <ChevronRight size={16} className="menu-arrow" />}
              </>
            )}
          </div>
          {isExpanded && openMenu === 'salary-structure' && (
            <div className="submenu">
              <div 
                className={`submenu-item ${activeView === 'leave-lwp-manual' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('leave-lwp-manual')}
                style={{ cursor: 'pointer' }}
              >
                • Leave LWP Manual
              </div>
              <div 
                className={`submenu-item ${activeView === 'occasional-allowance' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('occasional-allowance')}
                style={{ cursor: 'pointer' }}
              >
                • Occasional Allowance/Deduction
              </div>
              <div 
                className={`submenu-item ${activeView === 'salary-generation' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('salary-generation')}
                style={{ cursor: 'pointer' }}
              >
                • Salary Generation
              </div>
              <div 
                className={`submenu-item ${activeView === 'bank-statement' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('bank-statement')}
                style={{ cursor: 'pointer' }}
              >
                • Bank Statement
              </div>
              <div 
                className={`submenu-item ${activeView === 'insurance-statement' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('insurance-statement')}
                style={{ cursor: 'pointer' }}
              >
                • Insurance Statement
              </div>
              <div 
                className={`submenu-item ${activeView === 'cheque-statement' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('cheque-statement')}
                style={{ cursor: 'pointer' }}
              >
                • Cheque Statement
              </div>
              <div 
                className={`submenu-item ${activeView === 'it-head-entry' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('it-head-entry')}
                style={{ cursor: 'pointer' }}
              >
                • IT Head Entry
              </div>
              <div 
                className={`submenu-item ${activeView === 'tds-entry' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('tds-entry')}
                style={{ cursor: 'pointer' }}
              >
                • TDS Entry
              </div>
              <div 
                className={`submenu-item ${activeView === 'gratuity-calculations' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('gratuity-calculations')}
                style={{ cursor: 'pointer' }}
              >
                • Gratuity Calculations
              </div>
              <div 
                className={`submenu-item ${activeView === 'bonus-calculations' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('bonus-calculations')}
                style={{ cursor: 'pointer' }}
              >
                • Bonus Calculations
              </div>
              <div 
                className="submenu-item" 
                style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', paddingRight: '15px' }}
                onClick={() => setOpenNestedMenu(openNestedMenu === 'increment' ? null : 'increment')}
              >
                <span>• Increment</span>
                {openNestedMenu === 'increment' ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </div>
              {openNestedMenu === 'increment' && (
                <div style={{ paddingLeft: '15px', backgroundColor: 'rgba(0,0,0,0.02)' }}>
                  <div 
                    className={`submenu-item ${activeView === 'auto-increment' ? 'active-sub' : ''}`}
                    onClick={() => setActiveView('auto-increment')}
                    style={{ cursor: 'pointer' }}
                  >
                    › Auto Increment
                  </div>
                  <div 
                    className={`submenu-item ${activeView === 'increment-rollback' ? 'active-sub' : ''}`}
                    onClick={() => setActiveView('increment-rollback')}
                    style={{ cursor: 'pointer' }}
                  >
                    › Increment Rollback
                  </div>
                </div>
              )}
              <div 
                className={`submenu-item ${activeView === 'staff-salary-structure' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('staff-salary-structure')}
                style={{ cursor: 'pointer' }}
              >
                • Staff Salary Structure
              </div>
              <div 
                className={`submenu-item ${activeView === 'generate-salary-status' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('generate-salary-status')}
                style={{ cursor: 'pointer' }}
              >
                • Generate Salary Status
              </div>
              <div 
                className={`submenu-item ${activeView === 'daily-wages-attendance' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('daily-wages-attendance')}
                style={{ cursor: 'pointer' }}
              >
                • Daily Wages Attendance
              </div>
            </div>
          )}
        </div>

        <div className={`menu-item ${openMenu === 'salary-reports' ? 'active' : ''}`}>
          <div className="menu-item-header" onClick={() => toggleMenu('salary-reports')}>
            <FaChartBar size={18} />
            {isExpanded && (
              <>
                <span className="menu-text">Salary Reports</span>
                {openMenu === 'salary-reports' ? <ChevronDown size={16} className="menu-arrow" /> : <ChevronRight size={16} className="menu-arrow" />}
              </>
            )}
          </div>
          {isExpanded && openMenu === 'salary-reports' && (
            <div className="submenu">
              <div 
                className={`submenu-item ${activeView === 'bank-statement-report' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('bank-statement-report')}
                style={{ cursor: 'pointer' }}
              >
                • Bank Statement Report
              </div>
              <div 
                className={`submenu-item ${activeView === 'head-wise-report' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('head-wise-report')}
                style={{ cursor: 'pointer' }}
              >
                • Head Wise Report
              </div>
              <div 
                className={`submenu-item ${activeView === 'salary-sheet' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('salary-sheet')}
                style={{ cursor: 'pointer' }}
              >
                • Salary Sheet
              </div>
              <div 
                className={`submenu-item ${activeView === 'salary-slip' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('salary-slip')}
                style={{ cursor: 'pointer' }}
              >
                • Salary Slip
              </div>
              <div 
                className={`submenu-item ${activeView === 'salary-slip-employee-wise' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('salary-slip-employee-wise')}
                style={{ cursor: 'pointer' }}
              >
                • Salary Slip Employee Wise
              </div>
              <div 
                className="submenu-item" 
                style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', paddingRight: '15px' }}
                onClick={() => setOpenNestedMenu(openNestedMenu === 'income-tax' ? null : 'income-tax')}
              >
                <span>• Income Tax</span>
                {openNestedMenu === 'income-tax' ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </div>
              {openNestedMenu === 'income-tax' && (
                <div style={{ paddingLeft: '15px', backgroundColor: 'rgba(0,0,0,0.02)' }}>
                  <div 
                    className={`submenu-item ${activeView === 'tds-entry-report' ? 'active-sub' : ''}`}
                    onClick={() => setActiveView('tds-entry-report')}
                    style={{ cursor: 'pointer' }}
                  >
                    › TDS Entry Report
                  </div>
                  <div 
                    className={`submenu-item ${activeView === 'quarterly-form-24q' ? 'active-sub' : ''}`}
                    onClick={() => setActiveView('quarterly-form-24q')}
                    style={{ cursor: 'pointer' }}
                  >
                    › Quarterly Form 24Q
                  </div>
                  <div 
                    className={`submenu-item ${activeView === 'tds-24q' ? 'active-sub' : ''}`}
                    onClick={() => setActiveView('tds-24q')}
                    style={{ cursor: 'pointer' }}
                  >
                    › TDS 24Q
                  </div>
                  <div 
                    className={`submenu-item ${activeView === 'gross-form-16' ? 'active-sub' : ''}`}
                    onClick={() => setActiveView('gross-form-16')}
                    style={{ cursor: 'pointer' }}
                  >
                    › Gross Form 16
                  </div>
                  <div 
                    className={`submenu-item ${activeView === 'form-16' ? 'active-sub' : ''}`}
                    onClick={() => setActiveView('form-16')}
                    style={{ cursor: 'pointer' }}
                  >
                    › Form 16
                  </div>
                  <div 
                    className={`submenu-item ${activeView === 'tds-report' ? 'active-sub' : ''}`}
                    onClick={() => setActiveView('tds-report')}
                    style={{ cursor: 'pointer' }}
                  >
                    › TDS Report
                  </div>
                </div>
              )}
              <div 
                className={`submenu-item ${activeView === 'employee-type-wise-report' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('employee-type-wise-report')}
                style={{ cursor: 'pointer' }}
              >
                • Employee Type wise Report
              </div>
              <div 
                className={`submenu-item ${activeView === 'estimated-salary-report' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('estimated-salary-report')}
                style={{ cursor: 'pointer' }}
              >
                • Estimated Salary Report
              </div>
              <div 
                className="submenu-item" 
                style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', paddingRight: '15px' }}
                onClick={() => setOpenNestedMenu(openNestedMenu === 'monthly-salary-reports' ? null : 'monthly-salary-reports')}
              >
                <span>• Monthly Salary Reports</span>
                {openNestedMenu === 'monthly-salary-reports' ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </div>
              {openNestedMenu === 'monthly-salary-reports' && (
                <div style={{ paddingLeft: '15px', backgroundColor: 'rgba(0,0,0,0.02)' }}>
                  <div 
                    className={`submenu-item ${activeView === 'department-wise-report' ? 'active-sub' : ''}`}
                    onClick={() => setActiveView('department-wise-report')}
                    style={{ cursor: 'pointer' }}
                  >
                    › Department wise Report
                  </div>
                  <div 
                    className={`submenu-item ${activeView === 'consolidated-salary-statement' ? 'active-sub' : ''}`}
                    onClick={() => setActiveView('consolidated-salary-statement')}
                    style={{ cursor: 'pointer' }}
                  >
                    › Consolidated Salary Statement
                  </div>
                  <div 
                    className={`submenu-item ${activeView === 'gross-salary-report' ? 'active-sub' : ''}`}
                    onClick={() => setActiveView('gross-salary-report')}
                    style={{ cursor: 'pointer' }}
                  >
                    › Gross Salary Report
                  </div>
                  <div 
                    className={`submenu-item ${activeView === 'month-wise-salary-report' ? 'active-sub' : ''}`}
                    onClick={() => setActiveView('month-wise-salary-report')}
                    style={{ cursor: 'pointer' }}
                  >
                    › Month Wise Salary Report
                  </div>
                  <div 
                    className={`submenu-item ${activeView === 'monthly-summary-report' ? 'active-sub' : ''}`}
                    onClick={() => setActiveView('monthly-summary-report')}
                    style={{ cursor: 'pointer' }}
                  >
                    › Monthly Summary Report
                  </div>
                  <div 
                    className={`submenu-item ${activeView === 'head-wise-gross-salary-report' ? 'active-sub' : ''}`}
                    onClick={() => setActiveView('head-wise-gross-salary-report')}
                    style={{ cursor: 'pointer' }}
                  >
                    › Head Wise Gross Salary Report
                  </div>
                  <div 
                    className={`submenu-item ${activeView === 'staff-statement' ? 'active-sub' : ''}`}
                    onClick={() => setActiveView('staff-statement')}
                    style={{ cursor: 'pointer' }}
                  >
                    › Staff Statement
                  </div>
                </div>
              )}
              
              <div 
                className="submenu-item" 
                style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', paddingRight: '15px' }}
                onClick={() => setOpenNestedMenu(openNestedMenu === 'yearly-reports' ? null : 'yearly-reports')}
              >
                <span>• Yearly Reports</span>
                {openNestedMenu === 'yearly-reports' ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </div>
              {openNestedMenu === 'yearly-reports' && (
                <div style={{ paddingLeft: '15px', backgroundColor: 'rgba(0,0,0,0.02)' }}>
                  <div 
                    className={`submenu-item ${activeView === 'reconciliation-report' ? 'active-sub' : ''}`}
                    onClick={() => setActiveView('reconciliation-report')}
                    style={{ cursor: 'pointer' }}
                  >
                    › Reconciliation Report
                  </div>
                  <div 
                    className={`submenu-item ${activeView === 'annual-salary-paid-report' ? 'active-sub' : ''}`}
                    onClick={() => setActiveView('annual-salary-paid-report')}
                    style={{ cursor: 'pointer' }}
                  >
                    › Annual Salary Paid Report
                  </div>
                  <div 
                    className={`submenu-item ${activeView === 'salary-statement-employee-wise' ? 'active-sub' : ''}`}
                    onClick={() => setActiveView('salary-statement-employee-wise')}
                    style={{ cursor: 'pointer' }}
                  >
                    › Salary Statement Employee Wise
                  </div>
                  <div 
                    className={`submenu-item ${activeView === 'salary-certificate-report' ? 'active-sub' : ''}`}
                    onClick={() => setActiveView('salary-certificate-report')}
                    style={{ cursor: 'pointer' }}
                  >
                    › Salary Certificate Report
                  </div>
                </div>
              )}

              <div 
                className={`submenu-item ${activeView === 'income-tax-report' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('income-tax-report')}
                style={{ cursor: 'pointer' }}
              >
                • Income Tax Report
              </div>
              <div 
                className={`submenu-item ${activeView === 'professional-tax-report' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('professional-tax-report')}
                style={{ cursor: 'pointer' }}
              >
                • Professional Tax Report
              </div>
              <div 
                className={`submenu-item ${activeView === 'cheque-statement-report' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('cheque-statement-report')}
                style={{ cursor: 'pointer' }}
              >
                • Cheque Statement Report
              </div>
            </div>
          )}
        </div>

        <div className={`menu-item ${openMenu === 'reports' ? 'active' : ''}`}>
          <div className="menu-item-header" onClick={() => toggleMenu('reports')}>
            <BarChart3 size={18} />
            {isExpanded && (
              <>
                <span className="menu-text">Reports</span>
                {openMenu === 'reports' ? <ChevronDown size={16} className="menu-arrow" /> : <ChevronRight size={16} className="menu-arrow" />}
              </>
            )}
          </div>
          {isExpanded && openMenu === 'reports' && (
            <div className="submenu">
              <div 
                className={`submenu-item ${activeView === 'employee-statistics-report' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('employee-statistics-report')}
                style={{ cursor: 'pointer' }}
              >
                • Employee Statistics
              </div>
              <div 
                className={`submenu-item ${activeView === 'esi-report' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('esi-report')}
                style={{ cursor: 'pointer' }}
              >
                • ESI Report
              </div>
              <div 
                className={`submenu-item ${activeView === 'pf-report' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('pf-report')}
                style={{ cursor: 'pointer' }}
              >
                • PF Report
              </div>
              <div 
                className={`submenu-item ${activeView === 'pf-challan-report' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('pf-challan-report')}
                style={{ cursor: 'pointer' }}
              >
                • PF Challan Report
              </div>
              <div 
                className={`submenu-item ${activeView === 'increment-report' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('increment-report')}
                style={{ cursor: 'pointer' }}
              >
                • Increment Report
              </div>
              <div 
                className={`submenu-item ${activeView === 'gsli-report' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('gsli-report')}
                style={{ cursor: 'pointer' }}
              >
                • GSLI Report
              </div>
              <div 
                className={`submenu-item ${activeView === 'gratuity-report' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('gratuity-report')}
                style={{ cursor: 'pointer' }}
              >
                • Gratuity Report
              </div>
              <div 
                className={`submenu-item ${activeView === 'salary-compare-report' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('salary-compare-report')}
                style={{ cursor: 'pointer' }}
              >
                • Salary compare
              </div>
              <div 
                className={`submenu-item ${activeView === 'professional-tax' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('professional-tax')}
                style={{ cursor: 'pointer' }}
              >
                • Professional Tax
              </div>
              <div 
                className={`submenu-item ${activeView === 'super-annunciation-report' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('super-annunciation-report')}
                style={{ cursor: 'pointer' }}
              >
                • Super Annunciation Report
              </div>
              <div 
                className={`submenu-item ${activeView === 'macp-list-report' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('macp-list-report')}
                style={{ cursor: 'pointer' }}
              >
                • MACP List
              </div>
              <div 
                className={`submenu-item ${activeView === 'fixation-report' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('fixation-report')}
                style={{ cursor: 'pointer' }}
              >
                • Fixation Report
              </div>
              <div 
                className={`submenu-item ${activeView === 'date-range-retirement-report' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('date-range-retirement-report')}
                style={{ cursor: 'pointer' }}
              >
                • Date Range Retirement Report
              </div>
              <div 
                className={`submenu-item ${activeView === 'retirement-report' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('retirement-report')}
                style={{ cursor: 'pointer' }}
              >
                • Retirement Report
              </div>
              <div 
                className={`submenu-item ${activeView === 'pension-list-report' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('pension-list-report')}
                style={{ cursor: 'pointer' }}
              >
                • Pension List
              </div>
              <div 
                className={`submenu-item ${activeView === 'sms-report' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('sms-report')}
                style={{ cursor: 'pointer' }}
              >
                • SMS Report
              </div>
              <div 
                className={`submenu-item ${activeView === 'experience-certificate-report' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('experience-certificate-report')}
                style={{ cursor: 'pointer' }}
              >
                • Experience Certificate Report
              </div>
              <div 
                className={`submenu-item ${activeView === 'comparison-report' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('comparison-report')}
                style={{ cursor: 'pointer' }}
              >
                • Comparison Report
              </div>
              <div 
                className={`submenu-item ${activeView === 'employee-bio-data-report' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('employee-bio-data-report')}
                style={{ cursor: 'pointer' }}
              >
                • Employee Bio Data
              </div>
              <div 
                className={`submenu-item ${activeView === 'esi-annual-report' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('esi-annual-report')}
                style={{ cursor: 'pointer' }}
              >
                • ESI Annual Report
              </div>
              <div 
                className={`submenu-item ${activeView === 'service-report' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('service-report')}
                style={{ cursor: 'pointer' }}
              >
                • Service Report
              </div>
              <div 
                className={`submenu-item ${activeView === 'pf-statement' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('pf-statement')}
                style={{ cursor: 'pointer' }}
              >
                • PF Statement
              </div>
              <div 
                className={`submenu-item ${activeView === 'pf-annual-report' ? 'active-sub' : ''}`}
                onClick={() => setActiveView('pf-annual-report')}
                style={{ cursor: 'pointer' }}
              >
                • PF Annual Report
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
