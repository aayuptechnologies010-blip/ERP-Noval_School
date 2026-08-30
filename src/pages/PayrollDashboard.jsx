import React, { useState } from 'react';
import { HelpCircle, Info, Settings, Fingerprint, GraduationCap, PieChart } from 'lucide-react';
import { FaMoneyBill } from 'react-icons/fa';
import '../styles/payroll.css';

// Layout Components
import PayrollSidebar from '../components/payroll/PayrollSidebar';
import PayrollHeader from '../components/payroll/PayrollHeader';
import QuickAccess from '../components/payroll/QuickAccess';

// Dashboard Cards
import QuickLink from '../components/payroll/QuickLink';
import EmployeeHeadCount from '../components/payroll/EmployeeHeadCount';
import NewJoinings from '../components/payroll/NewJoinings';
import Retirements from '../components/payroll/Retirements';
import Probation from '../components/payroll/Probation';
import JoinedLeft from '../components/payroll/JoinedLeft';
import EmployeeStatistics from '../components/payroll/EmployeeStatistics';
import SalaryDisbursement from '../components/payroll/SalaryDisbursement';
import EmploymentStatus from '../components/payroll/EmploymentStatus';
import BirthdayAnniversary from '../components/payroll/BirthdayAnniversary';
import SalaryComparison from '../components/payroll/SalaryComparison';
import NationalityStrength from '../components/payroll/NationalityStrength';
import DepartmentHeadCount from '../components/payroll/DepartmentHeadCount';
import SalaryRange from '../components/payroll/SalaryRange';
import DefineMailTemplate from '../components/payroll/DefineMailTemplate';
import ImportStaff from '../components/payroll/ImportStaff';
import SessionTransfer from '../components/payroll/SessionTransfer';
import DefineGlobalSettings from '../components/payroll/DefineGlobalSettings';
import ChangeAcademicYear from '../components/payroll/ChangeAcademicYear';
import SalaryCalculation from '../components/payroll/SalaryCalculation';
import DefineStaffType from '../components/payroll/DefineStaffType';
import DefineQualification from '../components/payroll/DefineQualification';
import DefineDesignation from '../components/payroll/DefineDesignation';
import DefineDepartment from '../components/payroll/DefineDepartment';
import ReportSetting from '../components/payroll/ReportSetting';
import UploadStaffPhoto from '../components/payroll/UploadStaffPhoto';
import DownloadStaffPhotos from '../components/payroll/DownloadStaffPhotos';
import DefineStaffDocumentType from '../components/payroll/DefineStaffDocumentType';
import StaffRegistration from '../components/payroll/StaffRegistration';
import DefineSalaryAccount from '../components/payroll/DefineSalaryAccount';
import DefineSalaryMonth from '../components/payroll/DefineSalaryMonth';
import AssignInfoBulk from '../components/payroll/AssignInfoBulk';
import DefineSalaryHead from '../components/payroll/DefineSalaryHead';
import RelateStaticDynamicHeads from '../components/payroll/RelateStaticDynamicHeads';
import DefineSalaryGroup from '../components/payroll/DefineSalaryGroup';
import AssignSalaryHeadToGroup from '../components/payroll/AssignSalaryHeadToGroup';
import AssignSalaryGroupToStaff from '../components/payroll/AssignSalaryGroupToStaff';
import BulkSalaryHeadAssign from '../components/payroll/BulkSalaryHeadAssign';
import BulkSalaryHeadEntry from '../components/payroll/BulkSalaryHeadEntry';
import Define7thCPCLevel from '../components/payroll/Define7thCPCLevel';
import Define7thCommissionBasic from '../components/payroll/Define7thCommissionBasic';
import BulkHeadRemarkEntry from '../components/payroll/BulkHeadRemarkEntry';
import DefineIncomeTaxSlab from '../components/payroll/DefineIncomeTaxSlab';
import RelateITSlabToStaff from '../components/payroll/RelateITSlabToStaff';
import DefineITHeadGroups from '../components/payroll/DefineITHeadGroups';
import DefineITHead from '../components/payroll/DefineITHead';
import DefineTDSDeductee from '../components/payroll/DefineTDSDeductee';
import DefinePayScale from '../components/payroll/DefinePayScale';
import DefinePayScaleAmount from '../components/payroll/DefinePayScaleAmount';
import DefineGradePay from '../components/payroll/DefineGradePay';
import DefineFixation from '../components/payroll/DefineFixation';
import AssignPayScaleToStaff from '../components/payroll/AssignPayScaleToStaff';
import RejoinStaff from '../components/payroll/RejoinStaff';
import GenerateBarcode from '../components/payroll/GenerateBarcode';
import AssignTransportToStaff from '../components/payroll/AssignTransportToStaff';
import InsuranceVendor from '../components/payroll/InsuranceVendor';
import ModifyStaffInBulk from '../components/payroll/ModifyStaffInBulk';
import RelatePolicyWithEmployee from '../components/payroll/RelatePolicyWithEmployee';
import RelatedPoliciesWithMonth from '../components/payroll/RelatedPoliciesWithMonth';
import ProfessionalTaxSlab from '../components/payroll/ProfessionalTaxSlab';
import UploadStaffDocument from '../components/payroll/UploadStaffDocument';
import InterviewType from '../components/payroll/InterviewType';
import AssessmentType from '../components/payroll/AssessmentType';
import InterviewSlot from '../components/payroll/InterviewSlot';
import JobPosting from '../components/payroll/JobPosting';
import ApplicationReceived from '../components/payroll/ApplicationReceived';
import SlotAssigning from '../components/payroll/SlotAssigning';
import TravelPlanApproval from '../components/payroll/TravelPlanApproval';
import HREntryForms from '../components/payroll/HREntryForms';
import HRExitForms from '../components/payroll/HRExitForms';
import FixAdvanceAc from '../components/payroll/FixAdvanceAc';
import EmploymentForm from '../components/payroll/EmploymentForm';
import AdvanceEntry from '../components/payroll/AdvanceEntry';
import AdvanceRepayment from '../components/payroll/AdvanceRepayment';
import AdvanceEntryReport from '../components/payroll/AdvanceEntryReport';
import AdvanceRepaymentReport from '../components/payroll/AdvanceRepaymentReport';
import AdvanceLedgerReport from '../components/payroll/AdvanceLedgerReport';
import LeaveLWPManual from '../components/payroll/LeaveLWPManual';
import OccasionalAllowance from '../components/payroll/OccasionalAllowance';
import SalaryGeneration from '../components/payroll/SalaryGeneration';
import BankStatement from '../components/payroll/BankStatement';
import InsuranceStatement from '../components/payroll/InsuranceStatement';
import ChequeStatement from '../components/payroll/ChequeStatement';
import ITHeadEntry from '../components/payroll/ITHeadEntry';
import TDSEntry from '../components/payroll/TDSEntry';
import GratuityCalculations from '../components/payroll/GratuityCalculations';
import BonusCalculations from '../components/payroll/BonusCalculations';
import AutoIncrement from '../components/payroll/AutoIncrement';
import IncrementRollback from '../components/payroll/IncrementRollback';
import StaffSalaryStructure from '../components/payroll/StaffSalaryStructure';
import GenerateSalaryStatus from '../components/payroll/GenerateSalaryStatus';
import DailyWagesAttendance from '../components/payroll/DailyWagesAttendance';
import BankStatementReport from '../components/payroll/BankStatementReport';
import HeadWiseReport from '../components/payroll/HeadWiseReport';
import SalarySheet from '../components/payroll/SalarySheet';
import SalarySlip from '../components/payroll/SalarySlip';
import SalarySlipEmployeeWise from '../components/payroll/SalarySlipEmployeeWise';
import TDSEntryReport from '../components/payroll/TDSEntryReport';
import QuarterlyForm24Q from '../components/payroll/QuarterlyForm24Q';
import TDS24Q from '../components/payroll/TDS24Q';
import GrossForm16 from '../components/payroll/GrossForm16';
import Form16 from '../components/payroll/Form16';
import TDSReport from '../components/payroll/TDSReport';
import EmployeeTypeWiseReport from '../components/payroll/EmployeeTypeWiseReport';
import EstimatedSalaryReport from '../components/payroll/EstimatedSalaryReport';
import DepartmentWiseReport from '../components/payroll/DepartmentWiseReport';
import ConsolidatedSalaryStatement from '../components/payroll/ConsolidatedSalaryStatement';
import GrossSalaryReport from '../components/payroll/GrossSalaryReport';
import MonthWiseSalaryReport from '../components/payroll/MonthWiseSalaryReport';
import MonthlySummaryReport from '../components/payroll/MonthlySummaryReport';
import HeadWiseGrossSalaryReport from '../components/payroll/HeadWiseGrossSalaryReport';
import StaffStatement from '../components/payroll/StaffStatement';
import ReconciliationReport from '../components/payroll/ReconciliationReport';
import AnnualSalaryPaidReport from '../components/payroll/AnnualSalaryPaidReport';
import SalaryStatementEmployeeWise from '../components/payroll/SalaryStatementEmployeeWise';
import SalaryCertificateReport from '../components/payroll/SalaryCertificateReport';
import IncomeTaxReport from '../components/payroll/IncomeTaxReport';
import ProfessionalTaxReport from '../components/payroll/ProfessionalTaxReport';
import ChequeStatementReport from '../components/payroll/ChequeStatementReport';
import EmployeeStatisticsReport from '../components/payroll/EmployeeStatisticsReport';
import ESIReport from '../components/payroll/ESIReport';
import PFReport from '../components/payroll/PFReport';
import PFChallanReport from '../components/payroll/PFChallanReport';
import IncrementReport from '../components/payroll/IncrementReport';
import GSLIReport from '../components/payroll/GSLIReport';
import GratuityReport from '../components/payroll/GratuityReport';
import SalaryCompareReport from '../components/payroll/SalaryCompareReport';
import SuperAnnunciationReport from '../components/payroll/SuperAnnunciationReport';
import MACPListReport from '../components/payroll/MACPListReport';
import FixationReport from '../components/payroll/FixationReport';
import DateRangeRetirementReport from '../components/payroll/DateRangeRetirementReport';
import RetirementReport from '../components/payroll/RetirementReport';
import PensionListReport from '../components/payroll/PensionListReport';
import SMSReport from '../components/payroll/SMSReport';
import ExperienceCertificateReport from '../components/payroll/ExperienceCertificateReport';
import ComparisonReport from '../components/payroll/ComparisonReport';
import EmployeeBioDataReport from '../components/payroll/EmployeeBioDataReport';
import ESIAnnualReport from '../components/payroll/ESIAnnualReport';
import ServiceReport from '../components/payroll/ServiceReport';
import PFStatement from '../components/payroll/PFStatement';
import PFAnnualReport from '../components/payroll/PFAnnualReport';
import ProfessionalTax from '../components/payroll/ProfessionalTax';

const tabLabels = {
  'quick-link': 'Quick Link',
  'define-mail-template': 'Define Mail Template',
  'import-staff': 'Import Staff',
  'session-transfer': 'Session transfer',
  'global-settings': 'Define Global Settings',
  'change-academic-year': 'Change Academic Year',
  'salary-calculation': 'Salary Calculation Based On',
  'define-staff-type': 'Define Staff Type',
  'define-qualification': 'Define Qualification',
  'define-designation': 'Define Designation',
  'define-department': 'Define Department',
  'report-setting': 'Report Setting',
  'upload-staff-photo': 'Upload Staff Photo',
  'download-staff-photos': 'Download Staff Photos',
  'define-staff-document-type': 'Define Staff Document Type',
  'staff-registration': 'Staff Registration',
  'define-salary-account': 'Define Salary Account',
  'define-salary-month': 'Define Salary Month',
  'assign-info-bulk': 'Assign Info Bulk',
  'define-salary-head': 'Define Salary Head',
  'relate-static-dynamic-heads': 'Relate Static Dynamic Heads',
  'define-salary-group': 'Define Salary Group',
  'assign-salary-head-to-group': 'Assign Salary Head to Group',
  'assign-salary-group-to-staff': 'Assign Salary Group to Staff',
  'bulk-salary-head-assign': 'Bulk Salary Head Assign',
  'bulk-salary-head-entry': 'Bulk Salary Head Entry',
  'define-7th-cpc-level': 'Define 7th CPC Level',
  'define-7th-commission-basic': 'Define 7th Commission Basic',
  'bulk-head-remark-entry': 'Bulk Head Remark Entry',
  'define-income-tax-slab': 'Define Income Tax Slab',
  'relate-it-slab-to-staff': 'Relate IT Slab To Staff',
  'define-it-head-groups': 'Define IT Head Groups',
  'define-it-head': 'Define IT Head',
  'define-tds-deductee': 'Define TDS Deductee',
  'define-pay-scale': 'Define Pay Scale',
  'define-pay-scale-amount': 'Define Pay Scale Amount',
  'define-grade-pay': 'Define Grade Pay',
  'define-fixation': 'Define Fixation',
  'assign-pay-scale-to-staff': 'Assign Pay Scale to Staff',
  'rejoin-staff': 'Rejoin Staff',
  'generate-barcode': 'Generate Barcode',
  'assign-transport-to-staff': 'Assign Transport To Staff',
  'insurance-vendor': 'Insurance Vendor',
  'modify-staff-in-bulk': 'Modify Staff in Bulk',
  'relate-policy-with-employee': 'Relate policy with Employee',
  'related-policies-with-month': 'Related Policies with Month',
  'professional-tax-slab': 'Professional Tax slab',
  'upload-staff-document': 'Upload Staff Document',
  'interview-type': 'Interview Type',
  'assessment-type': 'Assessment Type',
  'interview-slot': 'Interview Slot',
  'job-posting': 'Job Posting',
  'application-received': 'Application Received',
  'slot-assigning': 'Slot Assigning',
  'travel-plan-approval': 'Travel Plan Approval',
  'hr-entry-forms': 'HR Entry Forms',
  'hr-exit-forms': 'HR Exit Forms',
  'fix-advance-ac': 'Fix Advance A/c',
  'employment-form': 'Employment Form',
  'advance-entry': 'Advance entry',
  'advance-repayment': 'Advance Repayment',
  'advance-entry-report': 'Advance Entry Report',
  'advance-repayment-report': 'Advance Repayment Report',
  'advance-ledger-report': 'Advance Ledger Report',
  'leave-lwp-manual': 'Leave LWP Manual',
  'occasional-allowance': 'Occasional Allowance/Deduction',
  'salary-generation': 'Salary Generation',
  'bank-statement': 'Bank Statement',
  'insurance-statement': 'Insurance Statement',
  'cheque-statement': 'Cheque Statement',
  'it-head-entry': 'IT Head Entry',
  'tds-entry': 'TDS Entry',
  'gratuity-calculations': 'Gratuity Calculations',
  'bonus-calculations': 'Bonus Calculations',
  'auto-increment': 'Auto Increment',
  'increment-rollback': 'Increment Rollback',
  'staff-salary-structure': 'Staff Salary Structure',
  'generate-salary-status': 'Generate Salary Status',
  'daily-wages-attendance': 'Daily Wages Attendance',
  'bank-statement-report': 'Bank Statement Report',
  'head-wise-report': 'Head Wise Report',
  'salary-sheet': 'Salary Sheet',
  'salary-slip': 'Salary Slip',
  'salary-slip-employee-wise': 'Salary Slip Employee Wise',
  'tds-entry-report': 'TDS Entry Report',
  'quarterly-form-24q': 'Quarterly Form 24Q',
  'tds-24q': 'TDS 24Q',
  'gross-form-16': 'Gross Form 16',
  'form-16': 'Form 16',
  'tds-report': 'TDS Report',
  'employee-type-wise-report': 'Employee Type wise Report',
  'estimated-salary-report': 'Estimated Salary Report',
  'department-wise-report': 'Department wise Report',
  'consolidated-salary-statement': 'Consolidated Salary Statement',
  'gross-salary-report': 'Gross Salary Report',
  'month-wise-salary-report': 'Month Wise Salary Report',
  'monthly-summary-report': 'Monthly Summary Report',
  'head-wise-gross-salary-report': 'Head Wise Gross Salary Report',
  'staff-statement': 'Staff Statement',
  'reconciliation-report': 'Reconciliation Report',
  'annual-salary-paid-report': 'Annual Salary Paid Report',
  'salary-statement-employee-wise': 'Salary Statement Employee Wise',
  'salary-certificate-report': 'Salary Certificate Report',
  'income-tax-report': 'Income Tax Report',
  'professional-tax-report': 'Professional Tax Report',
  'cheque-statement-report': 'Cheque Statement Report',
  'employee-statistics-report': 'Employee Statistics',
  'esi-report': 'ESI Report',
  'pf-report': 'PF Report',
  'pf-challan-report': 'PF Challan Report',
  'increment-report': 'Increment Report',
  'gsli-report': 'GSLI Report',
  'gratuity-report': 'Gratuity Report',
  'salary-compare-report': 'Salary compare',
  'super-annunciation-report': 'Super Annunciation Report',
  'macp-list-report': 'MACP List',
  'fixation-report': 'Fixation Report',
  'date-range-retirement-report': 'Date Range Retirement Report',
  'retirement-report': 'Retirement Report',
  'pension-list-report': 'Pension List',
  'sms-report': 'SMS Report',
  'experience-certificate-report': 'Experience Certificate Report',
  'comparison-report': 'Comparison Report',
  'employee-bio-data-report': 'Employee Bio Data',
  'esi-annual-report': 'ESI Annual Report',
  'service-report': 'Service Report',
  'pf-statement': 'PF Statement',
  'pf-annual-report': 'PF Annual Report',
  'professional-tax': 'Professional Tax',
};

export default function PayrollDashboard() {
  const [activeView, setActiveView] = useState('dashboard');
  const [openTabs, setOpenTabs] = useState([]);

  const handleSetActiveView = (viewId) => {
    setActiveView(viewId);
    if (viewId !== 'dashboard' && !openTabs.includes(viewId)) {
      setOpenTabs([...openTabs, viewId]);
    }
  };

  const handleCloseTab = (e, viewId) => {
    e.stopPropagation(); // Prevent tab click
    const newTabs = openTabs.filter(id => id !== viewId);
    setOpenTabs(newTabs);
    if (activeView === viewId) {
      setActiveView(newTabs.length > 0 ? newTabs[newTabs.length - 1] : 'dashboard');
    }
  };

  return (
    <div className="payroll-container">
        <PayrollSidebar activeView={activeView} setActiveView={handleSetActiveView} />
        
        {/* Main Content Area */}
        <div style={{ flex: 1, backgroundColor: '#f4f6f9', overflowY: 'auto' }}>
          
          {/* Top Navbar */}
          <div style={{ backgroundColor: '#6470c0', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 20px', fontSize: '13px' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px' }}>
                <div style={{ border: '1px solid rgba(255,255,255,0.3)', padding: '5px', borderRadius: '4px', display: 'flex' }}>
                  <FaMoneyBill size={20} />
                </div>
                <span>Payroll</span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <GraduationCap size={16} />
                <span>Academic Year :</span>
                <select style={{ backgroundColor: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '15px', padding: '2px 10px', outline: 'none', marginLeft: '5px' }}>
                  <option style={{ color: 'black' }}>2026-2027</option>
                </select>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <PieChart size={16} />
                <span>Financial Year :</span>
                <select style={{ backgroundColor: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '15px', padding: '2px 10px', outline: 'none', marginLeft: '5px' }}>
                  <option style={{ color: 'black' }}>2026-2027</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <a href="https://franciscanecare.zohodesk.com/portal/en/signin" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                <HelpCircle size={16} style={{ cursor: 'pointer' }} />
              </a>
              <a href="https://franciscanwebsolutions.com/manuals/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                <Info size={16} style={{ cursor: 'pointer' }} />
              </a>
              <Settings size={16} style={{ cursor: 'pointer' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 'bold', cursor: 'pointer', marginLeft: '10px' }}>
                ANKIT KUMAR <span style={{ fontSize: '10px' }}>▼</span>
              </div>
            </div>

          </div>

          {/* Quick Access Strip */}
          <div style={{ backgroundColor: '#8a92d4', height: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'stretch' }}>
            <div style={{ backgroundColor: 'white', color: '#159BD7', fontWeight: 'bold', fontSize: '12px', padding: '0 20px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              QUICK ACCESS &gt;
            </div>
            <div style={{ backgroundColor: 'white', color: '#159BD7', padding: '0 15px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: '10px', cursor: 'pointer' }} onClick={() => handleSetActiveView('quick-link')}>
              <Fingerprint size={16} />
              Customize
            </div>
          </div>

          {/* Dynamic Tabs Bar */}
          {openTabs.length > 0 && (
            <div className="payroll-tabs-bar">
              <div className="tab-scroll-btn">{'<<'}</div>
              {openTabs.map(tabId => (
                <div 
                  key={tabId} 
                  className={`payroll-tab ${activeView === tabId ? 'active' : ''}`}
                  onClick={() => setActiveView(tabId)}
                >
                  {tabLabels[tabId] || tabId}
                  <span className="payroll-tab-close" onClick={(e) => handleCloseTab(e, tabId)}>✕</span>
                </div>
              ))}
              <div className="tab-scroll-btn">{'>>'}</div>
            </div>
          )}

          {/* Module Content */}
          <div style={{ padding: '20px' }}>
            {activeView === 'dashboard' ? (
            <>
              {/* First Row - Three Cards */}
              <div className="dashboard-row row-3-cols">
                <EmployeeHeadCount />
                <NewJoinings />
                <Retirements />
              </div>
              
              {/* Second Row - Two Cards */}
              <div className="dashboard-row row-2-cols">
                <Probation />
                <JoinedLeft />
              </div>
              
              {/* Third Row - Two Cards */}
              <div className="dashboard-row row-2-cols">
                <EmployeeStatistics />
                <SalaryDisbursement />
              </div>
              
              {/* Fourth Row - Two Cards */}
              <div className="dashboard-row row-2-cols">
                <EmploymentStatus />
                <BirthdayAnniversary />
              </div>
              
              {/* Fifth Row - Two Cards */}
              <div className="dashboard-row row-2-cols">
                <SalaryComparison />
                <NationalityStrength />
              </div>
              
              {/* Sixth Row - Two Cards */}
              <div className="dashboard-row row-2-cols">
                <DepartmentHeadCount />
                <SalaryRange />
              </div>
            </>
          ) : activeView === 'mail-template' ? (
            <DefineMailTemplate />
          ) : activeView === 'import-staff' ? (
            <ImportStaff />
          ) : activeView === 'session-transfer' ? (
            <SessionTransfer />
          ) : activeView === 'global-settings' ? (
            <DefineGlobalSettings />
          ) : activeView === 'change-academic-year' ? (
            <ChangeAcademicYear />
          ) : activeView === 'salary-calculation' ? (
            <SalaryCalculation />
          ) : activeView === 'define-staff-type' ? (
            <DefineStaffType />
          ) : activeView === 'define-qualification' ? (
            <DefineQualification />
          ) : activeView === 'define-designation' ? (
            <DefineDesignation />
          ) : activeView === 'define-department' ? (
            <DefineDepartment />
          ) : activeView === 'report-setting' ? (
            <ReportSetting />
          ) : activeView === 'upload-staff-photo' ? (
            <UploadStaffPhoto />
          ) : activeView === 'download-staff-photos' ? (
            <DownloadStaffPhotos />
          ) : activeView === 'define-staff-document-type' ? (
            <DefineStaffDocumentType />
          ) : activeView === 'staff-registration' ? (
            <StaffRegistration />
          ) : activeView === 'define-salary-account' ? (
            <DefineSalaryAccount />
          ) : activeView === 'define-salary-month' ? (
            <DefineSalaryMonth />
          ) : activeView === 'assign-info-bulk' ? (
            <AssignInfoBulk />
          ) : activeView === 'define-salary-head' ? (
            <DefineSalaryHead />
          ) : activeView === 'relate-static-dynamic-heads' ? (
            <RelateStaticDynamicHeads />
          ) : activeView === 'define-salary-group' ? (
            <DefineSalaryGroup />
          ) : activeView === 'assign-salary-head-to-group' ? (
            <AssignSalaryHeadToGroup />
          ) : activeView === 'assign-salary-group-to-staff' ? (
            <AssignSalaryGroupToStaff />
          ) : activeView === 'bulk-salary-head-assign' ? (
            <BulkSalaryHeadAssign />
          ) : activeView === 'bulk-salary-head-entry' ? (
            <BulkSalaryHeadEntry />
          ) : activeView === 'define-7th-cpc-level' ? (
            <Define7thCPCLevel />
          ) : activeView === 'define-7th-commission-basic' ? (
            <Define7thCommissionBasic />
          ) : activeView === 'bulk-head-remark-entry' ? (
            <BulkHeadRemarkEntry />
          ) : activeView === 'define-income-tax-slab' ? (
            <DefineIncomeTaxSlab />
          ) : activeView === 'relate-it-slab-to-staff' ? (
            <RelateITSlabToStaff />
          ) : activeView === 'define-it-head-groups' ? (
            <DefineITHeadGroups />
          ) : activeView === 'define-it-head' ? (
            <DefineITHead />
          ) : activeView === 'define-tds-deductee' ? (
            <DefineTDSDeductee />
          ) : activeView === 'define-pay-scale' ? (
            <DefinePayScale />
          ) : activeView === 'define-pay-scale-amount' ? (
            <DefinePayScaleAmount />
          ) : activeView === 'define-grade-pay' ? (
            <DefineGradePay />
          ) : activeView === 'define-fixation' ? (
            <DefineFixation />
          ) : activeView === 'assign-pay-scale-to-staff' ? (
            <AssignPayScaleToStaff />
          ) : activeView === 'rejoin-staff' ? (
            <RejoinStaff />
          ) : activeView === 'generate-barcode' ? (
            <GenerateBarcode />
          ) : activeView === 'assign-transport-to-staff' ? (
            <AssignTransportToStaff />
          ) : activeView === 'insurance-vendor' ? (
            <InsuranceVendor />
          ) : activeView === 'modify-staff-in-bulk' ? (
            <ModifyStaffInBulk />
          ) : activeView === 'relate-policy-with-employee' ? (
            <RelatePolicyWithEmployee />
          ) : activeView === 'related-policies-with-month' ? (
            <RelatedPoliciesWithMonth />
          ) : activeView === 'professional-tax-slab' ? (
            <ProfessionalTaxSlab />
          ) : activeView === 'upload-staff-document' ? (
            <UploadStaffDocument />
          ) : activeView === 'interview-type' ? (
            <InterviewType />
          ) : activeView === 'assessment-type' ? (
            <AssessmentType />
          ) : activeView === 'interview-slot' ? (
            <InterviewSlot />
          ) : activeView === 'job-posting' ? (
            <JobPosting />
          ) : activeView === 'application-received' ? (
            <ApplicationReceived />
          ) : activeView === 'slot-assigning' ? (
            <SlotAssigning />
          ) : activeView === 'travel-plan-approval' ? (
            <TravelPlanApproval />
          ) : activeView === 'hr-entry-forms' ? (
            <HREntryForms />
          ) : activeView === 'hr-exit-forms' ? (
            <HRExitForms />
          ) : activeView === 'fix-advance-ac' ? (
            <FixAdvanceAc />
          ) : activeView === 'employment-form' ? (
            <EmploymentForm />
          ) : activeView === 'advance-entry' ? (
            <AdvanceEntry />
          ) : activeView === 'advance-repayment' ? (
            <AdvanceRepayment />
          ) : activeView === 'advance-entry-report' ? (
            <AdvanceEntryReport />
          ) : activeView === 'advance-repayment-report' ? (
            <AdvanceRepaymentReport />
          ) : activeView === 'advance-ledger-report' ? (
            <AdvanceLedgerReport />
          ) : activeView === 'leave-lwp-manual' ? (
            <LeaveLWPManual />
          ) : activeView === 'occasional-allowance' ? (
            <OccasionalAllowance />
          ) : activeView === 'salary-generation' ? (
            <SalaryGeneration />
          ) : activeView === 'bank-statement' ? (
            <BankStatement />
          ) : activeView === 'insurance-statement' ? (
            <InsuranceStatement />
          ) : activeView === 'cheque-statement' ? (
            <ChequeStatement />
          ) : activeView === 'it-head-entry' ? (
            <ITHeadEntry />
          ) : activeView === 'tds-entry' ? (
            <TDSEntry />
          ) : activeView === 'gratuity-calculations' ? (
            <GratuityCalculations />
          ) : activeView === 'bonus-calculations' ? (
            <BonusCalculations />
          ) : activeView === 'auto-increment' ? (
            <AutoIncrement />
          ) : activeView === 'increment-rollback' ? (
            <IncrementRollback />
          ) : activeView === 'staff-salary-structure' ? (
            <StaffSalaryStructure />
          ) : activeView === 'generate-salary-status' ? (
            <GenerateSalaryStatus />
          ) : activeView === 'daily-wages-attendance' ? (
            <DailyWagesAttendance />
          ) : activeView === 'bank-statement-report' ? (
            <BankStatementReport />
          ) : activeView === 'head-wise-report' ? (
            <HeadWiseReport />
          ) : activeView === 'salary-sheet' ? (
            <SalarySheet />
          ) : activeView === 'salary-slip' ? (
            <SalarySlip />
          ) : activeView === 'salary-slip-employee-wise' ? (
            <SalarySlipEmployeeWise />
          ) : activeView === 'tds-entry-report' ? (
            <TDSEntryReport />
          ) : activeView === 'quarterly-form-24q' ? (
            <QuarterlyForm24Q />
          ) : activeView === 'tds-24q' ? (
            <TDS24Q />
          ) : activeView === 'gross-form-16' ? (
            <GrossForm16 />
          ) : activeView === 'form-16' ? (
            <Form16 />
          ) : activeView === 'tds-report' ? (
            <TDSReport />
          ) : activeView === 'employee-type-wise-report' ? (
            <EmployeeTypeWiseReport />
          ) : activeView === 'estimated-salary-report' ? (
            <EstimatedSalaryReport />
          ) : activeView === 'department-wise-report' ? (
            <DepartmentWiseReport />
          ) : activeView === 'consolidated-salary-statement' ? (
            <ConsolidatedSalaryStatement />
          ) : activeView === 'gross-salary-report' ? (
            <GrossSalaryReport />
          ) : activeView === 'month-wise-salary-report' ? (
            <MonthWiseSalaryReport />
          ) : activeView === 'monthly-summary-report' ? (
            <MonthlySummaryReport />
          ) : activeView === 'head-wise-gross-salary-report' ? (
            <HeadWiseGrossSalaryReport />
          ) : activeView === 'staff-statement' ? (
            <StaffStatement />
          ) : activeView === 'reconciliation-report' ? (
            <ReconciliationReport />
          ) : activeView === 'annual-salary-paid-report' ? (
            <AnnualSalaryPaidReport />
          ) : activeView === 'salary-statement-employee-wise' ? (
            <SalaryStatementEmployeeWise />
          ) : activeView === 'salary-certificate-report' ? (
            <SalaryCertificateReport />
          ) : activeView === 'income-tax-report' ? (
            <IncomeTaxReport />
          ) : activeView === 'professional-tax-report' ? (
            <ProfessionalTaxReport />
          ) : activeView === 'cheque-statement-report' ? (
            <ChequeStatementReport />
          ) : activeView === 'employee-statistics-report' ? (
            <EmployeeStatisticsReport />
          ) : activeView === 'esi-report' ? (
            <ESIReport />
          ) : activeView === 'pf-report' ? (
            <PFReport />
          ) : activeView === 'pf-challan-report' ? (
            <PFChallanReport />
          ) : activeView === 'increment-report' ? (
            <IncrementReport />
          ) : activeView === 'gsli-report' ? (
            <GSLIReport />
          ) : activeView === 'gratuity-report' ? (
            <GratuityReport />
          ) : activeView === 'salary-compare-report' ? (
            <SalaryCompareReport />
          ) : activeView === 'super-annunciation-report' ? (
            <SuperAnnunciationReport />
          ) : activeView === 'macp-list-report' ? (
            <MACPListReport />
          ) : activeView === 'fixation-report' ? (
            <FixationReport />
          ) : activeView === 'date-range-retirement-report' ? (
            <DateRangeRetirementReport />
          ) : activeView === 'retirement-report' ? (
            <RetirementReport />
          ) : activeView === 'pension-list-report' ? (
            <PensionListReport />
          ) : activeView === 'sms-report' ? (
            <SMSReport />
          ) : activeView === 'experience-certificate-report' ? (
            <ExperienceCertificateReport />
          ) : activeView === 'comparison-report' ? (
            <ComparisonReport />
          ) : activeView === 'employee-bio-data-report' ? (
            <EmployeeBioDataReport />
          ) : activeView === 'esi-annual-report' ? (
            <ESIAnnualReport />
          ) : activeView === 'service-report' ? (
            <ServiceReport />
          ) : activeView === 'pf-statement' ? (
            <PFStatement />
          ) : activeView === 'pf-annual-report' ? (
            <PFAnnualReport />
          ) : activeView === 'professional-tax' ? (
            <ProfessionalTax />
          ) : activeView === 'quick-link' ? (
            <QuickLink />
          ) : null}
        </div>
      </div>
    </div>
  );
}
