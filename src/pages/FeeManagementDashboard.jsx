import React, { useState, useRef, useEffect } from 'react';
import {
  Menu, Search, Settings, ChevronDown, ChevronRight,
  GraduationCap, Wallet, Bus, BarChart2, CreditCard,
  FileText, ClipboardList, HelpCircle, Info, Wrench, LayoutDashboard,
} from 'lucide-react';
import StudentHeadcount from '../components/fee/StudentHeadcount';
import FeeRevenueSummary from '../components/fee/FeeRevenueSummary';
import PaymodeSummary from '../components/fee/PaymodeSummary';
import TransactionHistoryCard from '../components/fee/TransactionHistoryCard';
import EstimatedCollectionCard from '../components/fee/EstimatedCollectionCard';
import EstimatedCollection from '../components/fee/EstimatedCollection';
import RecentTransitionsCard from '../components/fee/RecentTransitionsCard';
import CollectionSummaryCard from '../components/fee/CollectionSummaryCard';
import FeeDefaulterStatisticsCard from '../components/fee/FeeDefaulterStatisticsCard';
import DefineBank from '../components/fee/DefineBank';
import SessionTransfer from '../components/fee/SessionTransfer';
import ErrorPageTemplate from '../components/fee/ErrorPageTemplate';
import FeesManagerSessionTransfer from '../components/fee/FeesManagerSessionTransfer';
import ChangeAcademicYear from '../components/fee/ChangeAcademicYear';
import FeeReceiptNumberSetting from '../components/fee/FeeReceiptNumberSetting';
import CollectionPageSetting from '../components/fee/CollectionPageSetting';
import FeeOpeningBalanceSetting from '../components/fee/FeeOpeningBalanceSetting';
import PaymentGatewaySetting from '../components/fee/PaymentGatewaySetting';
import ReportSignAuthoritySettings from '../components/fee/ReportSignAuthoritySettings';
import ReceiptCertificateSetting from '../components/fee/ReceiptCertificateSetting';
import DefineSMSTemplate from '../components/fee/DefineSMSTemplate';
import BillBookSetting from '../components/fee/BillBookSetting';
import GenerateBillBookDetails from '../components/fee/GenerateBillBookDetails';
import BusIdSetting from '../components/fee/BusIdSetting';
import FeeEntryLockSetting from '../components/fee/FeeEntryLockSetting';
import DefineFeeInstallment from '../components/fee/DefineFeeInstallment';
import DefineFeeHead from '../components/fee/DefineFeeHead';
import DefineFeeType from '../components/fee/DefineFeeType';
import DefineFeeGroup from '../components/fee/DefineFeeGroup';
import FeeGroupToFeeHead from '../components/fee/FeeGroupToFeeHead';
import AssignAmountGroup from '../EnterpriseApp/AssignAmountGroup';
import AssignMultipleGroup from '../EnterpriseApp/AssignMultipleGroup';
import DefineConcession from '../components/fee/DefineConcession';
import DefineFeeHeadConcession from '../components/fee/DefineFeeHeadConcession';
import AssignConcessionToStudent from '../components/fee/AssignConcessionToStudent';
import DefineConcessionType from '../components/fee/DefineConcessionType';
import AssignConcessionToSingleStudent from '../components/fee/AssignConcessionToSingleStudent';
import AssignConcession from '../components/fee/AssignConcession';
import StudentFeeAdjustment from '../components/fee/StudentFeeAdjustment';
import StudentFeeDetails from '../components/fee/StudentFeeDetails';
import AssignOpeningBalance from '../components/fee/AssignOpeningBalance';
import VerifyStructure from '../components/fee/VerifyStructure';
import LateFeeSetting from '../components/fee/LateFeeSetting';
import SetDueLimit from '../components/fee/SetDueLimit';
import LateFeeSettingHeadWise from '../components/fee/LateFeeSettingHeadWise';
import AssignWaiveOff from '../components/fee/AssignWaiveOff';
import DefineExpenseHead from '../components/fee/DefineExpenseHead';
import FeeEntry from '../components/fee/FeeEntry';
import PrintFeeReceiptCertificate from '../components/fee/PrintFeeReceiptCertificate';
import FeeTypeAssignToUser from '../components/fee/FeeTypeAssignToUser';
import ModifyFeesReceipt from '../components/fee/ModifyFeesReceipt';
import CancelFeeReceipt from '../components/fee/CancelFeeReceipt';
import DeleteFeeReceipt from '../components/fee/DeleteFeeReceipt';
import ManualFeesModification from '../components/fee/ManualFeesModification';
import RefundHeadAmount from '../components/fee/RefundHeadAmount';
import ManageStudentExpenses from '../components/fee/ManageStudentExpenses';
import AddManualFee from '../components/fee/AddManualFee';
import FeeChequeClearing from '../components/fee/FeeChequeClearing';
import FeesUploadFromTally from '../components/fee/FeesUploadFromTally';
import UpdateBankDate from '../components/fee/UpdateBankDate';
import AdvanceAdjustment from '../components/fee/AdvanceAdjustment';
import FeesUploadWithPaymode from '../components/fee/FeesUploadWithPaymode';
import OnlineFeesUploadWithDepositBank from '../components/fee/OnlineFeesUploadWithDepositBank';
import FeesUploadWithDepositBank from '../components/fee/FeesUploadWithDepositBank';
import PayAmountWithoutStructure from '../components/fee/PayAmountWithoutStructure';
import ManageSecurityMoney from '../components/fee/ManageSecurityMoney';
import SecurityMoneyReturn from '../components/fee/SecurityMoneyReturn';
import PayAmountWithoutStructureForStaff from '../components/fee/PayAmountWithoutStructureForStaff';
import ChequeEntry from '../components/fee/ChequeEntry';
import OnlineFeeTransaction from '../components/fee/OnlineFeeTransaction';
import ManualSettlement from '../components/fee/ManualSettlement';
import ReconciliationFeeReceipt from '../components/fee/ReconciliationFeeReceipt';
import ModifyReceiptDateBank from '../components/fee/ModifyReceiptDateBank';
import MultipleRemarks from '../components/fee/MultipleRemarks';
import TransferConcession from '../components/fee/TransferConcession';
import Sponsorship from '../components/fee/Sponsorship';
import TravelAgencyMaster from '../components/fee/TravelAgencyMaster';
import VehicleReminder from '../components/fee/VehicleReminder';
import DefineVehicleType from '../components/fee/DefineVehicleType';
import DefineVehicleDetails from '../components/fee/DefineVehicleDetails';
import DefineVehicleRoute from '../components/fee/DefineVehicleRoute';
import DefineVehicleRouteRelation from '../components/fee/DefineVehicleRouteRelation';
import DefineTransportGroup from '../components/fee/DefineTransportGroup';
import DefineTransportMedium from '../components/fee/DefineTransportMedium';
import DefineRouteStop from '../components/fee/DefineRouteStop';
import AssignTransportToStudents from '../components/fee/AssignTransportToStudents';
import AssignSelfTransportToStudent from '../components/fee/AssignSelfTransportToStudent';
import TransferRoute from '../components/fee/TransferRoute';
import ChangeRouteVehicle from '../components/fee/ChangeRouteVehicle';
import VehicleMasterEntry from '../components/fee/VehicleMasterEntry';
import VehicleFuelEntry from '../components/fee/VehicleFuelEntry';
import VehicleServiceEntry from '../components/fee/VehicleServiceEntry';
import DailyMeterEntry from '../components/fee/DailyMeterEntry';
import DriverDetail from '../components/fee/DriverDetail';
import DailyFeeCollection from '../components/fee/DailyFeeCollection';
import CollectionReportTransactionDateWise from '../components/fee/CollectionReportTransactionDateWise';
import DailyFeeCollectionClassificationWise from '../components/fee/DailyFeeCollectionClassificationWise';
import OnlineFeeCollection from '../components/fee/OnlineFeeCollection';
import DailyFeeCollectionWithConcession from '../components/fee/DailyFeeCollectionWithConcession';
import DailyFeeCollectionWithChequeDetails from '../components/fee/DailyFeeCollectionWithChequeDetails';
import FeeCollectionReport from '../components/fee/FeeCollectionReport';
import DailyFeeCollectionListWithHeadFineFilter from '../components/fee/DailyFeeCollectionListWithHeadFineFilter';
import DailyFeeCollectionDateWise from '../components/fee/DailyFeeCollectionDateWise';
import DailyFeeCollectionDateWiseWithRemark from '../components/fee/DailyFeeCollectionDateWiseWithRemark';
import DailyFeeCollectionAccountWise from '../components/fee/DailyFeeCollectionAccountWise';
import DailyFeeCollectionReceiptRange from '../components/fee/DailyFeeCollectionReceiptRange';
import DailyFeeCollectionDateFeeGroupWise from '../components/fee/DailyFeeCollectionDateFeeGroupWise';
import PTADailyFeeCollectionDateFeeGroupWise from '../components/fee/PTADailyFeeCollectionDateFeeGroupWise';
import DayWiseTotalCollection from '../components/fee/DayWiseTotalCollection';
import DateConsolidatedCollectionReportPaymodeWise from '../components/fee/DateConsolidatedCollectionReportPaymodeWise';
import EstimatedCollectionReport from '../components/fee/EstimatedCollectionReport';
import FeeHeadWiseCollectionClassRange from '../components/fee/FeeHeadWiseCollectionClassRange';
import FeeCollectionStudentAndClassWise from '../components/fee/FeeCollectionStudentAndClassWise';
import FeeCollectionWithEntryTimeConcession from '../components/fee/FeeCollectionWithEntryTimeConcession';
import ReceiptWiseDailyCollection from '../components/fee/ReceiptWiseDailyCollection';
import ReceiptWiseFeeTypeCollection from '../components/fee/ReceiptWiseFeeTypeCollection';
import MonthWiseCollectionReport from '../components/fee/MonthWiseCollectionReport';
import MonthlyConsolidatedReport from '../components/fee/MonthlyConsolidatedReport';
import MonthlyFeeCollectionReportClassWise from '../components/fee/MonthlyFeeCollectionReportClassWise';
import TotalCollectionReport from '../components/fee/TotalCollectionReport';
import YearlyCollectionReport from '../components/fee/YearlyCollectionReport';
import StudentWiseCollectionReport from '../components/fee/StudentWiseCollectionReport';
import MonthlyFeeCollectionReportPaymodeWise from '../components/fee/MonthlyFeeCollectionReportPaymodeWise';
import NoOfPaidUnpaidReport from '../components/fee/NoOfPaidUnpaidReport';
import FeeDefaulterList from '../components/fee/FeeDefaulterList';
import FeeDefaulterListWithClassification from '../components/fee/FeeDefaulterListWithClassification';
import UnpaidFeeStudent from '../components/fee/UnpaidFeeStudent';
import FeeDefaulterInstallmentWise from '../components/fee/FeeDefaulterInstallmentWise';
import FeeDefaulterReportConsolidated from '../components/fee/FeeDefaulterReportConsolidated';
import FeeDefaulterListWithHeadFineFilter from '../components/fee/FeeDefaulterListWithHeadFineFilter';
import FeeDefaulterReportWithReceiving from '../components/fee/FeeDefaulterReportWithReceiving';
import FeeDefaulterSlip from '../components/fee/FeeDefaulterSlip';
import UnpaidStudentReport from '../components/fee/UnpaidStudentReport';
import DefaulterListInstallHeadWise from '../components/fee/DefaulterListInstallHeadWise';
import FeeDefaulterListBoardingWise from '../components/fee/FeeDefaulterListBoardingWise';
import AnnualStudentLedger1 from '../components/fee/AnnualStudentLedger1';
import AnnualStudentLedger2 from '../components/fee/AnnualStudentLedger2';
import AnnualStudentLedger3 from '../components/fee/AnnualStudentLedger3';
import StudentLedgerClassWise from '../components/fee/StudentLedgerClassWise';
import FeesStudentLedger from '../components/fee/FeesStudentLedger';
import StudentLedgerClassWiseWithRecDate from '../components/fee/StudentLedgerClassWiseWithRecDate';
import StudentLedgerClassHeadWise from '../components/fee/StudentLedgerClassHeadWise';
import ReconcileReport from '../components/fee/ReconcileReport';
import ReconcileStudentStrengthWithConcession from '../components/fee/ReconcileStudentStrengthWithConcession';
import ReconcileInstallmentClassWise from '../components/fee/ReconcileInstallmentClassWise';
import FeesConcession from '../components/fee/FeesConcession';
import FeesConcessionWithClassification from '../components/fee/FeesConcessionWithClassification';
import FeesConcessionAndDues from '../components/fee/FeesConcessionAndDues';
import FeesConcessionInstallHeadWise from '../components/fee/FeesConcessionInstallHeadWise';
import TotalConcessionReportInstallHeadWise from '../components/fee/TotalConcessionReportInstallHeadWise';
import FeesConcessionStudentWise from '../components/fee/FeesConcessionStudentWise';
import DeletedFeeReceiptReport from '../components/fee/DeletedFeeReceiptReport';
import CancelledFeesReceiptReport from '../components/fee/CancelledFeesReceiptReport';
import StudentWiseReceiptReport from '../components/fee/StudentWiseReceiptReport';
import WaiveOffReport from '../components/fee/WaiveOffReport';
import StudentExpenseReport from '../components/fee/StudentExpenseReport';
import ManualFeeReport from '../components/fee/ManualFeeReport';
import UploadedExcelDetails from '../components/fee/UploadedExcelDetails';
import AmountWithoutStructureReport from '../components/fee/AmountWithoutStructureReport';
import SecurityMoneyReport from '../components/fee/SecurityMoneyReport';
import AmountWithoutStructureForStaff from '../components/fee/AmountWithoutStructureForStaff';
import ChequeClearingStatusReport from '../components/fee/ChequeClearingStatusReport';
import ChequeReportDateWiseBankReport from '../components/fee/ChequeReportDateWiseBankReport';
import ChequeReportDateWiseWithMICRNo from '../components/fee/ChequeReportDateWiseWithMICRNo';
import ChequeReportDateWise from '../components/fee/ChequeReportDateWise';
import AdvancePaymentReport from '../components/fee/AdvancePaymentReport';
import BadDebtsReport from '../components/fee/BadDebtsReport';
import GetDifferenceFromBankAmount from '../components/fee/GetDifferenceFromBankAmount';
import StudentAmountFeeTypeWise from '../components/fee/StudentAmountFeeTypeWise';
import TransportDetail from '../components/fee/TransportDetail';
import PaidTransport from '../components/fee/PaidTransport';
import TransportStudentList from '../components/fee/TransportStudentList';
import SelfTransportReport from '../components/fee/SelfTransportReport';
import TransportReportClassWise from '../components/fee/TransportReportClassWise';
import AssignedTransportReport from '../components/fee/AssignedTransportReport';
import EstimatedTransportDetails from '../components/fee/EstimatedTransportDetails';
import PrintTransportIdCard from '../components/fee/PrintTransportIdCard';
import VehicleWiseTransportSummary from '../components/fee/VehicleWiseTransportSummary';
import MonthWiseTotalAmount from '../components/fee/MonthWiseTotalAmount';
import FeeReminder from '../components/fee/FeeReminder';
import VehicleWiseAvgFuelDetail from '../components/fee/VehicleWiseAvgFuelDetail';
import VehicleServiceReport from '../components/fee/VehicleServiceReport';
import DailyMeterReport from '../components/fee/DailyMeterReport';
import OpeningDuesReport from '../components/fee/OpeningDuesReport';
import SmsReport from '../components/fee/SmsReport';
import MailReport from '../components/fee/MailReport';
import RefundAmount from '../components/fee/RefundAmount';
import GroupWiseStudentDetails from '../components/fee/GroupWiseStudentDetails';
import MidYearStudentDetails from '../components/fee/MidYearStudentDetails';

const MENU = [
  { icon: LayoutDashboard, text: 'Dashboard' },
  { icon: Settings, text: 'Global Masters', children: [{ text: 'Define Bank' }, { text: 'Session Transfer' }] },
  {
    icon: Settings, text: 'Master Settings', children: [
      { text: 'Change Academic Year' },
      { text: 'Fee Receipt Number Setting' },
      { text: 'Collection Page Setting' },
      { text: 'Fee Opening Balance Setting' },
      { text: 'Payment Gateway Setting' },
      { text: 'Receipt Certificate Setting' },
      { text: 'Report Sign Authority Settings' },
      { text: 'Define SMS Template' },
      { text: 'Bill Book Setting' },
      { text: 'Generate Bill Book Details' },
      { text: 'Bus ID Setting' },
      { text: 'Online Page Setting' },
      { text: 'Fee Entry Lock Setting' }
    ]
  },
  {
    icon: Wallet, text: 'Fee Master', children: [
      {
        text: 'Define Fee Master', children: [
          { text: 'Define Fee Installment' },
          { text: 'Define Fee Head' },
          { text: 'Define Fee Type' },
          { text: 'Define Fee Group' }
        ]
      },
      { text: 'Fee Group to Fee Head' },
      { text: 'Assign Amount Group' },
      { text: 'Assign Multiple Group to Student' },
      { 
        text: 'Define and Assign Concession', 
        children: [
          { text: 'Define Concession' },
          { text: 'Define Fee Head Concession' },
          { text: 'Assign Concession To Student' },
          { text: 'Define Concession Type' },
          { text: 'Assign Concession' },
          { text: 'Assign concession to single student' }
        ] 
      },
      { text: 'Student Fee Adjustment' },
      { text: 'Student Fee Details' },
      { text: 'Assign Opening Balance' },
      { text: 'Verify Structure' },
      { text: 'Set Due Limit' },
      { 
        text: 'Late Fee Settings', 
        children: [
          { text: 'Late Fee Setting' },
          { text: 'Late Fee Setting Head Wise' },
          { text: 'Assign Waive off/Manual Late Fine' }
        ] 
      },
      { text: 'Create Students Fees Structure' },
      { text: 'Define Expense Head' },
    ]
  },
  { 
    icon: CreditCard, text: 'Manage Fee', children: [
      { text: 'Fee Entry' },
      { text: 'Print Fee Receipt & Certificate' },
      { text: 'Fee Type Assign To User' },
      { text: 'Modify Fees Receipt' },
      { text: 'Cancel Fee Receipt' },
      { text: 'Delete Fee Receipt' },
      { text: 'Manual Fees Modification' },
      { text: 'Refund Head Amount' },
      { text: 'Manage Student Expenses' },
      { text: 'Add Manual Fee' },
      { text: 'Fee Cheque Clearing' },
      { text: 'Fees Upload' },
      { text: 'Fees Upload From Tally' },
      { text: 'Update Bank Date' },
      { text: 'Advance Adjustment' },
      { text: 'Fees Upload With Paymode' },
      { text: 'Online Fees Upload With Deposit Bank' },
      { text: 'Fees Upload With Deposit Bank' },
      { 
        text: 'Amount Without Structure', 
        children: [
          { text: 'Pay Amount Without Structure' },
          { text: 'Support To Needy Students' },
          { text: 'Manage Security Money' },
          { text: 'Security Money Return' },
          { text: 'Pay amount without structure for Staff' }
        ] 
      },
      { text: 'ChequeEntry' },
      { text: 'Online Fee Transaction' },
      { text: 'Manual Settlement' },
      { text: 'Reconciliation Fee Receipt' },
      { text: 'Modify Receipt Date & Bank' },
      { text: 'Multiple Remarks' },
      { text: 'Transfer Concession' },
      { text: 'Sponsorship' }
    ] 
  },
  { 
    icon: Bus, text: 'Transport', children: [
      { text: 'Travel Agency Master' },
      { text: 'Vehicle Reminder' },
      { text: 'Define Vehicle Type' },
      { text: 'Define Vehicle Details' },
      { text: 'Define Vehicle Route' },
      { text: 'Define Vehicle Route Relation' },
      { text: 'Define Transport Group' },
      { text: 'Define Transport Medium' },
      { text: 'Define Route Stop' },
      { text: 'Assign Transport To Students' },
      { text: 'Assign Self Transport To Student' },
      { text: 'Transfer Route' },
      { text: 'Change Route Vehicle' },
      { 
        text: 'Vehicle Management', 
        children: [
          { text: 'Vehicle Master Entry' },
          { text: 'Vehicle Fuel Entry' },
          { text: 'Vehicle Service Entry' },
          { text: 'Daily Meter Entry' }
        ] 
      },
      { text: 'Driver Detail' }
    ] 
  },
  { 
    icon: BarChart2, 
    text: 'Transaction Report', 
    children: [
      {
        text: 'Collection Reports',
        children: [
          { text: 'Daily Fee Collection' },
          { text: 'Daily Fee Collection with Cheque Details' },
          { text: 'Collection Report Transaction Date wise' },
          { text: 'Daily Fee Collection Classification Wise' },
          { text: 'Online Fee Collection' },
          { text: 'Daily Fee Collection With Concession' },
          { text: 'Fee Collection Report' },
          { text: 'Daily Fee Collection List With Head Fine Filter' },
          { text: 'Daily Fee Collection Date Wise With Remark' },
          { text: 'Daily Fee Collection Date Wise' },
          { text: 'Daily Fee Collection Account Wise' },
          { text: 'Daily Fee Collection Receipt Range' },
          { text: 'Daily Fee Collection Date/Fee Group Wise' },
          { text: 'PTA Daily Fee Collection Date/Fee Group Wise' },
          { text: 'Day Wise Total Collection' },
          { text: 'Date Consolidated Collection Report Paymode Wise' },
          { text: 'Estimated Collection Report' },
          { text: 'Fee Head Wise Collection Class Range' },
          { text: 'Fee Collection Student and Class Wise' },
          { text: 'Fee Collection With Entry Time Concession' },
          { text: 'Receipt wise Daily Collection' },
          { text: 'Receipt wise Fee Type Collection' },
          { text: 'Month Wise Collection Report' },
          { text: 'Monthly Consolidated Report' },
          { text: 'Monthly Fee Collection Report Class Wise' },
          { text: 'Total Collection Report' },
          { text: 'Yearly Collection Report' },
          { text: 'Student Wise Collection Report' },
          { text: 'Monthly Fee Collection Report Paymode Wise' },
          { text: 'No of Paid Unpaid Report' }
        ]
      },
      {
        text: 'Defaulter Reports',
        children: [
          { text: 'Fee Defaulter List' },
          { text: 'Fee Defaulter List With Classification' },
          { text: 'Unpaid Fee Student' },
          { text: 'Fee Defaulter Installment Wise' },
          { text: 'Fee Defaulter List With Head Fine Filter' },
          { text: 'Fee Defaulter Report Consolidated' },
          { text: 'Fee Defaulter Report With Receiving' },
          { text: 'Fee Defaulter Slip' },
          { text: 'Unpaid Student Report' },
          { text: 'Defaulter List Install/Head wise' },
          { text: 'Fee Defaulter List Boarding wise' }
        ]
      },
      {
        text: 'Fee Ledger Reports',
        children: [
          { text: 'Annual Student Ledger 1' },
          { text: 'Annual Student Ledger 2' },
          { text: 'Annual Student Ledger 3' },
          { text: 'Student Ledger Class Wise' },
          { text: 'Fees Student Ledger' },
          { text: 'Student Ledger Class Wise With Rec. Date' },
          { text: 'Student Ledger Class Head Wise' }
        ]
      },
      {
        text: 'Reconcile Reports',
        children: [
          { text: 'Reconcile Report' },
          { text: 'Reconcile Student Strength With Concession' },
          { text: 'Reconcile Installment Class Wise' }
        ]
      },
      {
        text: 'Concession Reports',
        children: [
          { text: 'Fees Concession' },
          { text: 'Fees Concession With Classification' },
          { text: 'Fees Concession And Dues' },
          { text: 'Fees Concession Install/Head Wise' },
          { text: 'Total Concession Report Install/Head Wise' },
          { text: 'Fees Concession Student Wise' }
        ]
      },
      { text: 'Deleted Fee Receipt' },
      { text: 'Modified Fee Receipt Report' },
      {
        text: 'Cancelled Receipt Reports',
        children: [
          { text: 'Fees Cheque Bounce Report' },
          { text: 'Cancelled Fees Receipt Report' }
        ]
      },
      { text: 'Student Wise Receipt Report' },
      { text: 'Waive Off Report' },
      { text: 'Student Expense Report' },
      { text: 'Manual Fee Report' },
      { text: 'Uploaded Excel Details' },
      {
        text: 'Amount Without Structure Reports',
        children: [
          { text: 'Amount without Structure report' },
          { text: 'Security Money Report' },
          { text: 'Amount Without Structure for Staff' }
        ]
      },
      {
        text: 'Cheque Reports',
        children: [
          { text: 'Cheque Clearing Status Report' },
          { text: 'Cheque Report Date Wise Bank Report' },
          { text: 'Cheque Report Date Wise With MICR No.' },
          { text: 'Cheque Report Date Wise' }
        ]
      },
      { text: 'Advance Payment Report' },
      { text: 'Bad Debts Report' },
      { text: 'Get Difference from Bank Amount' },
      { text: 'Student Amount Fee Type Wise' }
    ] 
  },
  {
    icon: ClipboardList,
    text: 'Reports',
    children: [
      {
        text: 'Transport Report',
        children: [
          { text: 'Transport Detail' },
          { text: 'Transport Student List' },
          { text: 'Paid Transport' },
          { text: 'Self Transport Report' },
          { text: 'Transport Report Class Wise' },
          { text: 'Assigned Transport Report' },
          { text: 'Estimated Transport Details' },
          { text: 'Print TransportId Card' },
          { text: 'Vehicle Wise Transport Summary' },
          { text: 'Month Wise Total Amount' }
        ]
      },
      { text: 'Fee Reminder' },
      { 
        text: 'Vehicle Deail Report', 
        children: [
          { text: 'Vehicle Wise Avg Fuel Detail' },
          { text: 'Vehicle Service Report' },
          { text: 'Daily Meter Report' }
        ] 
      },
      { text: 'Opening Dues Report' },
      { text: 'Sms Report' },
      { text: 'Mail Report' },
      { text: 'Refund Amount' },
      { text: 'Group Wise Student Details' },
      { text: 'Mid Year Student Details' }
    ]
  },
];

function SidebarItem({ item, collapsed, isOpen, onToggle, onLeafClick, activeLeaf }) {
  const Icon = item.icon;
  const hasChildren = !!item.children?.length;
  const isActive = activeLeaf === item.text || (hasChildren && item.children.some(c => c.text === activeLeaf || (c.children?.some(cc => cc.text === activeLeaf))));
  const [openSub, setOpenSub] = useState(null);

  return (
    <div>
      <button
        onClick={hasChildren ? onToggle : () => onLeafClick(item.text)}
        title={collapsed ? item.text : undefined}
        style={{
          width: '100%', display: 'flex', alignItems: 'center',
          gap: collapsed ? 0 : 10, padding: collapsed ? '10px 0' : '9px 14px',
          justifyContent: collapsed ? 'center' : 'flex-start',
          background: isActive ? '#29a9d8' : 'transparent',
          color: isActive ? '#fff' : '#374151',
          border: 'none', cursor: 'pointer', textAlign: 'left',
          transition: 'background 0.15s',
        }}
        onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#f1f5f9'; }}
        onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
      >
        <Icon size={16} style={{ flexShrink: 0, color: isActive ? '#fff' : '#64748b' }} />
        {!collapsed && (
          <>
            <span style={{ fontSize: 12.5, fontWeight: 500, flex: 1 }}>{item.text}</span>
            {hasChildren && (
              <ChevronDown size={12} style={{ color: isActive ? '#fff' : '#94a3b8', transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.2s' }} />
            )}
          </>
        )}
      </button>

      {!collapsed && hasChildren && isOpen && (
        <div style={{ borderLeft: '2px solid #e2e8f0', marginLeft: 26 }}>
          {item.children.map(child => {
            const hasSub = !!child.children?.length;
            const isChildActive = activeLeaf === child.text || (hasSub && child.children.some(c => c.text === activeLeaf));
            const isSubOpen = openSub === child.text || isChildActive;

            return (
              <div key={child.text}>
                <button
                  onClick={hasSub ? () => setOpenSub(isSubOpen ? null : child.text) : () => onLeafClick(child.text)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 6,
                    padding: '7px 12px', border: 'none', cursor: 'pointer', textAlign: 'left',
                    background: isChildActive && !hasSub ? '#e8f4fd' : 'transparent',
                    color: isChildActive && !hasSub ? '#29a9d8' : '#64748b',
                    fontSize: 11.5,
                  }}
                  onMouseEnter={e => { if (!isChildActive || hasSub) e.currentTarget.style.background = '#f8fafc'; }}
                  onMouseLeave={e => { if (!isChildActive || hasSub) e.currentTarget.style.background = 'transparent'; }}
                >
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: isChildActive ? '#29a9d8' : '#cbd5e1', flexShrink: 0 }} />
                  <span style={{ flex: 1 }}>{child.text}</span>
                  {hasSub && (
                    <ChevronRight size={10} style={{ transform: isSubOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s', color: '#94a3b8' }} />
                  )}
                </button>
                {hasSub && isSubOpen && (
                  <div style={{ marginLeft: 16 }}>
                    {child.children.map(subChild => (
                      <button
                        key={subChild.text}
                        onClick={() => onLeafClick(subChild.text)}
                        style={{
                          width: '100%', display: 'flex', alignItems: 'center', gap: 6,
                          padding: '6px 12px', border: 'none', cursor: 'pointer', textAlign: 'left',
                          background: activeLeaf === subChild.text ? '#e8f4fd' : 'transparent',
                          color: activeLeaf === subChild.text ? '#29a9d8' : '#64748b',
                          fontSize: 11,
                        }}
                        onMouseEnter={e => { if (activeLeaf !== subChild.text) e.currentTarget.style.background = '#f8fafc'; }}
                        onMouseLeave={e => { if (activeLeaf !== subChild.text) e.currentTarget.style.background = 'transparent'; }}
                      >
                        <span style={{ width: 4, height: 4, borderRadius: '50%', background: activeLeaf === subChild.text ? '#29a9d8' : '#cbd5e1', flexShrink: 0 }} />
                        {subChild.text}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function YearDropdown({ label, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const years = ['2024-2025', '2025-2026', '2026-2027'];

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }} ref={ref}>
      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', whiteSpace: 'nowrap' }}>{label}</span>
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setOpen(!open)}
          style={{
            display: 'flex', alignItems: 'center', gap: 4,
            background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.35)',
            borderRadius: 4, padding: '3px 8px', color: '#fff', fontSize: 12,
            cursor: 'pointer', whiteSpace: 'nowrap',
          }}
        >
          {value} <ChevronDown size={11} />
        </button>
        {open && (
          <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: 2, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 4, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 100, minWidth: '100%' }}>
            {years.map(y => (
              <div key={y} onClick={() => { onChange(y); setOpen(false); }}
                style={{ padding: '6px 12px', fontSize: 12, cursor: 'pointer', color: y === value ? '#29a9d8' : '#374151', fontWeight: y === value ? 600 : 400, background: y === value ? '#f0f9ff' : '#fff' }}
                onMouseEnter={e => { if (y !== value) e.currentTarget.style.background = '#f8fafc'; }}
                onMouseLeave={e => { if (y !== value) e.currentTarget.style.background = '#fff'; }}
              >{y}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function UserDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  return (
    <div style={{ position: 'relative' }} ref={ref}>
      <button onClick={() => setOpen(!open)}
        style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 12, fontWeight: 700 }}
      >
        ANKIT KUMAR <ChevronDown size={12} />
      </button>
      {open && (
        <div style={{ position: 'absolute', right: 0, top: '100%', marginTop: 4, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 4, boxShadow: '0 4px 16px rgba(0,0,0,0.1)', zIndex: 100, minWidth: 160 }}>
          {['My Profile', 'Change Password', 'Logout'].map(item => (
            <button key={item} style={{ width: '100%', textAlign: 'left', padding: '8px 14px', fontSize: 12, color: '#374151', background: 'none', border: 'none', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}
            >{item}</button>
          ))}
        </div>
      )}
    </div>
  );
}

function DashboardContent() {
  return (
    <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20, background: '#edf2f6', minHeight: '100%' }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ width: 300, flexShrink: 0 }}><StudentHeadcount /></div>
        <div style={{ flex: 1, minWidth: 0 }}><FeeRevenueSummary /></div>
      </div>
      <PaymodeSummary />
      <EstimatedCollection />
      <TransactionHistoryCard />
      <div style={{ display: 'flex', gap: 20, alignItems: 'stretch' }}>
        <EstimatedCollectionCard />
        <RecentTransitionsCard />
      </div>
      <CollectionSummaryCard />
      <FeeDefaulterStatisticsCard />
    </div>
  );
}

export default function FeeManagementDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [openIdx, setOpenIdx] = useState(null);
  const [search, setSearch] = useState('');
  const [activeLeaf, setActiveLeaf] = useState('Dashboard');
  const [acadYear, setAcadYear] = useState('2026-2027');
  const [finYear, setFinYear] = useState('2026-2027');
  const [tabs, setTabs] = useState([{ id: 'Dashboard', title: 'Dashboard' }]);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filtered = MENU.filter(item =>
    item.text.toLowerCase().includes(search.toLowerCase()) ||
    item.children?.some(c => c.text.toLowerCase().includes(search.toLowerCase()))
  );

  const openLeaf = (text) => {
    setActiveLeaf(text);
    if (!tabs.find(t => t.id === text)) setTabs(prev => [...prev, { id: text, title: text }]);
    setActiveTab(text);
  };

  const closeTab = (id, e) => {
    e.stopPropagation();
    const next = tabs.filter(t => t.id !== id);
    setTabs(next);
    if (activeTab === id) {
      const last = next[next.length - 1];
      setActiveTab(last.id);
      setActiveLeaf(last.id);
    }
  };

  const SIDEBAR_W = collapsed ? 52 : 230;

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%', fontFamily: 'Inter, Arial, sans-serif', overflow: 'hidden' }}>

      {/* ══ SIDEBAR ══ */}
      <div style={{
        width: SIDEBAR_W, flexShrink: 0, background: '#fff',
        borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column',
        transition: 'width 0.25s', overflow: 'hidden', zIndex: 30,
      }}>
        {/* Sidebar header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: collapsed ? '14px 0' : '12px 14px',
          justifyContent: collapsed ? 'center' : 'flex-start',
          borderBottom: '1px solid #e2e8f0', minHeight: 52, flexShrink: 0,
        }}>
          <button onClick={() => setCollapsed(c => !c)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, display: 'flex', alignItems: 'center' }}>
            <Menu size={18} color="#374151" />
          </button>
          {!collapsed && (
            <span style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', whiteSpace: 'nowrap' }}>Navigation</span>
          )}
        </div>

        {/* Search */}
        {!collapsed && (
          <div style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 4, padding: '5px 10px' }}>
              <Search size={13} color="#94a3b8" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search Menu"
                style={{ background: 'none', border: 'none', outline: 'none', fontSize: 12, color: '#374151', width: '100%' }}
              />
            </div>
          </div>
        )}

        {/* Nav items */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {filtered.map((item, i) => (
            <SidebarItem
              key={item.text}
              item={item}
              collapsed={collapsed}
              isOpen={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
              onLeafClick={openLeaf}
              activeLeaf={activeLeaf}
            />
          ))}
        </div>
      </div>

      {/* ══ RIGHT PANEL ══ */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>

        {/* ── TOP HEADER BAR ── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 20px', flexShrink: 0, minHeight: 52,
          background: (activeTab.endsWith('Session transfer') && activeTab !== 'Session Transfer') ? '#f26b6b' : 'linear-gradient(90deg, #29a9d8 0%, #2196c4 100%)',
        }}>
          {/* Left */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
            {/* Logo + Fees */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingRight: 16, borderRight: '1px solid rgba(255,255,255,0.25)', marginRight: 16 }}>
              <div style={{ width: 32, height: 32, background: 'rgba(255,255,255,0.2)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Wallet size={16} color="#fff" />
              </div>
              <span style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>Fees</span>
            </div>
            {/* Academic Year */}
            <div style={{ paddingRight: 16, borderRight: '1px solid rgba(255,255,255,0.25)', marginRight: 16 }}>
              <YearDropdown label="Academic Year :" value={acadYear} onChange={setAcadYear} />
            </div>
            {/* Financial Year */}
            <YearDropdown label="Financial Year :" value={finYear} onChange={setFinYear} />
          </div>

          {/* Right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <a href="https://franciscanecare.zohodesk.com/portal/en/signin" target="_blank" rel="noopener noreferrer" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.85)', display: 'flex', textDecoration: 'none' }} title="Help"><HelpCircle size={17} /></a>
            <a href="https://franciscanwebsolutions.com/manuals/" target="_blank" rel="noopener noreferrer" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.85)', display: 'flex', textDecoration: 'none' }} title="Info"><Info size={17} /></a>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.85)', display: 'flex' }} title="Settings"><Settings size={17} /></button>
            <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.3)' }} />
            <UserDropdown />
          </div>
        </div>

        {/* ── SECOND BAR (Quick Access + Customize) ── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 16px', flexShrink: 0, minHeight: 40,
          background: (activeTab.endsWith('Session transfer') && activeTab !== 'Session Transfer') ? '#f26b6b' : 'linear-gradient(90deg, #29a9d8 0%, #2196c4 100%)',
          borderTop: '1px solid rgba(255,255,255,0.15)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Search size={13} color="rgba(255,255,255,0.7)" />
            <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.9)', letterSpacing: '0.05em' }}>QUICK ACCESS</span>
            <ChevronRight size={13} color="rgba(255,255,255,0.7)" />
          </div>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 5,
            background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: 3, padding: '4px 10px', color: '#fff', fontSize: 11,
            fontWeight: 600, cursor: 'pointer',
          }}>
            <Wrench size={11} />
            Customize
          </button>
        </div>

        {/* ── TAB BAR ── */}
        <div style={{ display: 'flex', alignItems: 'flex-end', background: '#dde3ea', padding: '6px 12px 0 12px', flexShrink: 0, overflowX: 'auto', gap: 2 }}>
          {tabs.map(tab => (
            <div
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setActiveLeaf(tab.id); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '5px 14px', fontSize: 11, cursor: 'pointer',
                background: activeTab === tab.id ? '#fff' : '#c8d0da',
                color: activeTab === tab.id ? '#374151' : '#64748b',
                fontWeight: activeTab === tab.id ? 600 : 400,
                border: '1px solid #c8d0da',
                borderBottom: activeTab === tab.id ? '1px solid #fff' : '1px solid #c8d0da',
                borderRadius: '3px 3px 0 0',
                marginBottom: activeTab === tab.id ? -1 : 0,
                whiteSpace: 'nowrap', flexShrink: 0,
              }}
            >
              {tab.title}
              {tab.id !== 'Dashboard' && (
                <span
                  onClick={e => closeTab(tab.id, e)}
                  style={{ color: '#94a3b8', fontWeight: 700, fontSize: 10, lineHeight: 1, marginLeft: 2 }}
                  onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
                  onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
                >✕</span>
              )}
            </div>
          ))}
        </div>

        {/* ── CONTENT ── */}
        <div style={{ flex: 1, overflowY: 'auto', background: '#edf2f6', borderTop: '1px solid #c8d0da' }}>
          {activeTab === 'Dashboard' && <DashboardContent />}
          {activeTab === 'Define Bank' && <DefineBank />}
          {activeTab === 'Change Academic Year' && <ChangeAcademicYear />}
          {activeTab === 'Fee Receipt Number Setting' && <FeeReceiptNumberSetting />}
          {activeTab === 'Collection Page Setting' && <CollectionPageSetting />}
          {activeTab === 'Fee Opening Balance Setting' && <FeeOpeningBalanceSetting />}
          {activeTab === 'Payment Gateway Setting' && <PaymentGatewaySetting />}
          {activeTab === 'Report Sign Authority Settings' && <ReportSignAuthoritySettings />}
          {activeTab === 'Receipt Certificate Setting' && <ReceiptCertificateSetting />}
          {activeTab === 'Define SMS Template' && <DefineSMSTemplate />}
          {activeTab === 'Bill Book Setting' && <BillBookSetting />}
          {activeTab === 'Generate Bill Book Details' && <GenerateBillBookDetails />}
          {activeTab === 'Bus ID Setting' && <BusIdSetting />}
          {activeTab === 'Online Page Setting' && <OnlinePageSetting />}
          {activeTab === 'Fee Entry Lock Setting' && <FeeEntryLockSetting />}
          {activeTab === 'Define Fee Installment' && <DefineFeeInstallment />}
          {activeTab === 'Define Fee Head' && <DefineFeeHead />}
          {activeTab === 'Define Fee Type' && <DefineFeeType />}
          {activeTab === 'Define Fee Group' && <DefineFeeGroup />}
          {activeTab === 'Fee Group to Fee Head' && <FeeGroupToFeeHead />}
          {activeTab === 'Assign Amount Group' && <AssignAmountGroup setToast={showToast} />}
          {activeTab === 'Assign Multiple Group to Student' && <AssignMultipleGroup setToast={showToast} />}
          {activeTab === 'Define Concession' && <DefineConcession />}
          {activeTab === 'Define Fee Head Concession' && <DefineFeeHeadConcession />}
          {activeTab === 'Assign Concession To Student' && <AssignConcessionToStudent />}
          {activeTab === 'Define Concession Type' && <DefineConcessionType />}
          {activeTab === 'Assign concession to single student' && <AssignConcessionToSingleStudent />}
          {activeTab === 'Assign Concession' && <AssignConcession />}
          {activeTab === 'Student Fee Adjustment' && <StudentFeeAdjustment />}
          {activeTab === 'Student Fee Details' && <StudentFeeDetails />}
          {activeTab === 'Assign Opening Balance' && <AssignOpeningBalance />}
          {activeTab === 'Verify Structure' && <VerifyStructure />}
          {activeTab === 'Set Due Limit' && <SetDueLimit />}
          {(activeTab === 'Late Fee Settings' || activeTab === 'Late Fee Setting' || activeTab === 'Late Fee Master') && <LateFeeSetting />}
          {activeTab === 'Late Fee Setting Head Wise' && <LateFeeSettingHeadWise />}
          {activeTab === 'Assign Waive off/Manual Late Fine' && <AssignWaiveOff />}
          {activeTab === 'Create Students Fees Structure' && <CreateStudentsFeesStructure />}
          {activeTab === 'Define Expense Head' && <DefineExpenseHead />}
          {activeTab === 'Fee Entry' && <FeeEntry />}
          {activeTab === 'Print Fee Receipt & Certificate' && <PrintFeeReceiptCertificate />}
          {activeTab === 'Fee Type Assign To User' && <FeeTypeAssignToUser />}
          {activeTab === 'Modify Fees Receipt' && <ModifyFeesReceipt />}
          {activeTab === 'Cancel Fee Receipt' && <CancelFeeReceipt />}
          {activeTab === 'Delete Fee Receipt' && <DeleteFeeReceipt />}
          {activeTab === 'Manual Fees Modification' && <ManualFeesModification />}
          {activeTab === 'Refund Head Amount' && <RefundHeadAmount />}
          {activeTab === 'Manage Student Expenses' && <ManageStudentExpenses />}
          {activeTab === 'Add Manual Fee' && <AddManualFee />}
          {activeTab === 'Fee Cheque Clearing' && <FeeChequeClearing />}
          {activeTab === 'Fees Upload From Tally' && <FeesUploadFromTally />}
          {activeTab === 'Update Bank Date' && <UpdateBankDate />}
          {activeTab === 'Advance Adjustment' && <AdvanceAdjustment />}
          {activeTab === 'Fees Upload With Paymode' && <FeesUploadWithPaymode />}
          {activeTab === 'Online Fees Upload With Deposit Bank' && <OnlineFeesUploadWithDepositBank />}
          {activeTab === 'Fees Upload With Deposit Bank' && <FeesUploadWithDepositBank />}
          {activeTab === 'Pay Amount Without Structure' && <PayAmountWithoutStructure />}
          {activeTab === 'Support To Needy Students' && <ErrorPageTemplate requestedUrl="/FeeManagement/SupportToNeedyStudents.aspx" />}
          {activeTab === 'Manage Security Money' && <ManageSecurityMoney />}
          {activeTab === 'Security Money Return' && <SecurityMoneyReturn />}
          {activeTab === 'Pay amount without structure for Staff' && <PayAmountWithoutStructureForStaff />}
          {activeTab === 'ChequeEntry' && <ChequeEntry />}
          {activeTab === 'Online Fee Transaction' && <OnlineFeeTransaction />}
          {activeTab === 'Manual Settlement' && <ManualSettlement />}
          {activeTab === 'Reconciliation Fee Receipt' && <ReconciliationFeeReceipt />}
          {activeTab === 'Modify Receipt Date & Bank' && <ModifyReceiptDateBank />}
          {activeTab === 'Multiple Remarks' && <MultipleRemarks />}
          {activeTab === 'Transfer Concession' && <TransferConcession />}
          {activeTab === 'Sponsorship' && <Sponsorship />}
          {activeTab === 'Travel Agency Master' && <TravelAgencyMaster />}
          {activeTab === 'Vehicle Reminder' && <VehicleReminder />}
          {activeTab === 'Define Vehicle Type' && <DefineVehicleType />}
          {activeTab === 'Define Vehicle Details' && <DefineVehicleDetails />}
          {activeTab === 'Define Vehicle Route' && <DefineVehicleRoute />}
          {activeTab === 'Define Vehicle Route Relation' && <DefineVehicleRouteRelation />}
          {activeTab === 'Define Transport Group' && <DefineTransportGroup />}
          {activeTab === 'Define Transport Medium' && <DefineTransportMedium />}
          {activeTab === 'Define Route Stop' && <DefineRouteStop />}
          {activeTab === 'Assign Transport To Students' && <AssignTransportToStudents />}
          {activeTab === 'Assign Self Transport To Student' && <AssignSelfTransportToStudent />}
          {activeTab === 'Transfer Route' && <TransferRoute />}
          {activeTab === 'Change Route Vehicle' && <ChangeRouteVehicle />}
          {activeTab === 'Vehicle Master Entry' && <VehicleMasterEntry />}
          {activeTab === 'Vehicle Fuel Entry' && <VehicleFuelEntry />}
          {activeTab === 'Vehicle Service Entry' && <VehicleServiceEntry />}
          {activeTab === 'Daily Meter Entry' && <DailyMeterEntry />}
          {activeTab === 'Driver Detail' && <DriverDetail />}
          {activeTab === 'Daily Fee Collection' && <DailyFeeCollection />}
          {activeTab === 'Collection Report Transaction Date wise' && <CollectionReportTransactionDateWise />}
          {activeTab === 'Daily Fee Collection Classification Wise' && <DailyFeeCollectionClassificationWise />}
          {activeTab === 'Online Fee Collection' && <OnlineFeeCollection />}
          {activeTab === 'Daily Fee Collection With Concession' && <DailyFeeCollectionWithConcession />}
          {activeTab === 'Daily Fee Collection with Cheque Details' && <DailyFeeCollectionWithChequeDetails />}
          {activeTab === 'Fee Collection Report' && <FeeCollectionReport />}
          {activeTab === 'Daily Fee Collection List With Head Fine Filter' && <DailyFeeCollectionListWithHeadFineFilter />}
          {activeTab === 'Daily Fee Collection Date Wise' && <DailyFeeCollectionDateWise />}
          {activeTab === 'Daily Fee Collection Date Wise With Remark' && <DailyFeeCollectionDateWiseWithRemark />}
          {activeTab === 'Daily Fee Collection Account Wise' && <DailyFeeCollectionAccountWise />}
          {activeTab === 'Daily Fee Collection Receipt Range' && <DailyFeeCollectionReceiptRange />}
          {activeTab === 'Daily Fee Collection Date/Fee Group Wise' && <DailyFeeCollectionDateFeeGroupWise />}
          {activeTab === 'PTA Daily Fee Collection Date/Fee Group Wise' && <PTADailyFeeCollectionDateFeeGroupWise />}
          {activeTab === 'Day Wise Total Collection' && <DayWiseTotalCollection />}
          {activeTab === 'Date Consolidated Collection Report Paymode Wise' && <DateConsolidatedCollectionReportPaymodeWise />}
          {activeTab === 'Estimated Collection Report' && <EstimatedCollectionReport />}
          {activeTab === 'Fee Head Wise Collection Class Range' && <FeeHeadWiseCollectionClassRange />}
          {activeTab === 'Fee Collection Student and Class Wise' && <FeeCollectionStudentAndClassWise />}
          {activeTab === 'Fee Collection With Entry Time Concession' && <FeeCollectionWithEntryTimeConcession />}
          {activeTab === 'Receipt wise Daily Collection' && <ReceiptWiseDailyCollection />}
          {activeTab === 'Receipt wise Fee Type Collection' && <ReceiptWiseFeeTypeCollection />}
          {activeTab === 'Month Wise Collection Report' && <MonthWiseCollectionReport />}
          {activeTab === 'Monthly Consolidated Report' && <MonthlyConsolidatedReport />}
          {activeTab === 'Monthly Fee Collection Report Class Wise' && <MonthlyFeeCollectionReportClassWise />}
          {activeTab === 'Total Collection Report' && <TotalCollectionReport />}
          {activeTab === 'Yearly Collection Report' && <YearlyCollectionReport />}
          {activeTab === 'Student Wise Collection Report' && <StudentWiseCollectionReport />}
          {activeTab === 'Monthly Fee Collection Report Paymode Wise' && <MonthlyFeeCollectionReportPaymodeWise />}
          {activeTab === 'No of Paid Unpaid Report' && <NoOfPaidUnpaidReport />}
          {activeTab === 'Fee Defaulter List' && <FeeDefaulterList />}
          {activeTab === 'Fee Defaulter List With Classification' && <FeeDefaulterListWithClassification />}
          {activeTab === 'Unpaid Fee Student' && <UnpaidFeeStudent />}
          {activeTab === 'Fee Defaulter Installment Wise' && <FeeDefaulterInstallmentWise />}
          {activeTab === 'Fee Defaulter List With Head Fine Filter' && <FeeDefaulterListWithHeadFineFilter />}
          {activeTab === 'Fee Defaulter Report Consolidated' && <FeeDefaulterReportConsolidated />}
          {activeTab === 'Fee Defaulter Report With Receiving' && <FeeDefaulterReportWithReceiving />}
          {activeTab === 'Fee Defaulter Slip' && <FeeDefaulterSlip />}
          {activeTab === 'Unpaid Student Report' && <UnpaidStudentReport />}
          {activeTab === 'Defaulter List Install/Head wise' && <DefaulterListInstallHeadWise />}
          {activeTab === 'Fee Defaulter List Boarding wise' && <FeeDefaulterListBoardingWise />}
          {activeTab === 'Annual Student Ledger 1' && <AnnualStudentLedger1 />}
          {activeTab === 'Annual Student Ledger 2' && <AnnualStudentLedger2 />}
          {activeTab === 'Annual Student Ledger 3' && <AnnualStudentLedger3 />}
          {activeTab === 'Student Ledger Class Wise' && <StudentLedgerClassWise />}
          {activeTab === 'Fees Student Ledger' && <FeesStudentLedger />}
          {activeTab === 'Student Ledger Class Wise With Rec. Date' && <StudentLedgerClassWiseWithRecDate />}
          {activeTab === 'Student Ledger Class Head Wise' && <StudentLedgerClassHeadWise />}
          {activeTab === 'Reconcile Report' && <ReconcileReport />}
          {activeTab === 'Reconcile Student Strength With Concession' && <ReconcileStudentStrengthWithConcession />}
          {activeTab === 'Reconcile Installment Class Wise' && <ReconcileInstallmentClassWise />}
          {activeTab === 'Fees Concession' && <FeesConcession />}
          {activeTab === 'Fees Concession With Classification' && <FeesConcessionWithClassification />}
          {activeTab === 'Fees Concession And Dues' && <FeesConcessionAndDues />}
          {activeTab === 'Fees Concession Install/Head Wise' && <FeesConcessionInstallHeadWise />}
          {activeTab === 'Total Concession Report Install/Head Wise' && <TotalConcessionReportInstallHeadWise />}
          {activeTab === 'Fees Concession Student Wise' && <FeesConcessionStudentWise />}
          {activeTab === 'Deleted Fee Receipt' && <DeletedFeeReceiptReport />}
          {activeTab === 'Modified Fee Receipt Report' && <ModifiedFeeReceiptReport />}
          {activeTab === 'Fees Cheque Bounce Report' && <FeesChequeBounceReport />}
          {activeTab === 'Cancelled Fees Receipt Report' && <CancelledFeesReceiptReport />}
          {activeTab === 'Student Wise Receipt Report' && <StudentWiseReceiptReport />}
          {activeTab === 'Waive Off Report' && <WaiveOffReport />}
          {activeTab === 'Student Expense Report' && <StudentExpenseReport />}
          {activeTab === 'Manual Fee Report' && <ManualFeeReport />}
          {activeTab === 'Uploaded Excel Details' && <UploadedExcelDetails />}
          {activeTab === 'Amount without Structure report' && <AmountWithoutStructureReport />}
          {activeTab === 'Security Money Report' && <SecurityMoneyReport />}
          {activeTab === 'Amount Without Structure for Staff' && <AmountWithoutStructureForStaff />}
          {activeTab === 'Cheque Clearing Status Report' && <ChequeClearingStatusReport />}
          {activeTab === 'Cheque Report Date Wise Bank Report' && <ChequeReportDateWiseBankReport />}
          {activeTab === 'Cheque Report Date Wise With MICR No.' && <ChequeReportDateWiseWithMICRNo />}
          {activeTab === 'Cheque Report Date Wise' && <ChequeReportDateWise />}
          {activeTab === 'Advance Payment Report' && <AdvancePaymentReport />}
          {activeTab === 'Bad Debts Report' && <BadDebtsReport />}
          {activeTab === 'Get Difference from Bank Amount' && <GetDifferenceFromBankAmount />}
          {activeTab === 'Student Amount Fee Type Wise' && <StudentAmountFeeTypeWise />}
          {activeTab === 'Transport Detail' && <TransportDetail />}
          {activeTab === 'Transport Student List' && <TransportStudentList />}
          {activeTab === 'Paid Transport' && <PaidTransport />}
          {activeTab === 'Self Transport Report' && <SelfTransportReport />}
          {activeTab === 'Transport Report Class Wise' && <TransportReportClassWise />}
          {activeTab === 'Assigned Transport Report' && <AssignedTransportReport />}
          {activeTab === 'Estimated Transport Details' && <EstimatedTransportDetails />}
          {activeTab === 'Print TransportId Card' && <PrintTransportIdCard />}
          {activeTab === 'Vehicle Wise Transport Summary' && <VehicleWiseTransportSummary />}
          {activeTab === 'Month Wise Total Amount' && <MonthWiseTotalAmount />}
          {activeTab === 'Fee Reminder' && <FeeReminder />}
          {activeTab === 'Vehicle Wise Avg Fuel Detail' && <VehicleWiseAvgFuelDetail />}
          {activeTab === 'Vehicle Service Report' && <VehicleServiceReport />}
          {activeTab === 'Daily Meter Report' && <DailyMeterReport />}
          {activeTab === 'Opening Dues Report' && <OpeningDuesReport />}
          {activeTab === 'Sms Report' && <SmsReport />}
          {activeTab === 'Mail Report' && <MailReport />}
          {activeTab === 'Refund Amount' && <RefundAmount />}
          {activeTab === 'Group Wise Student Details' && <GroupWiseStudentDetails />}
          {activeTab === 'Mid Year Student Details' && <MidYearStudentDetails />}
          {activeTab === 'Session Transfer' && <SessionTransfer openTab={openLeaf} />}
          {activeTab === 'Account Manager Session transfer' && <ErrorPageTemplate requestedUrl="/AccountManager/AccAcademicYearTransfer.aspx" />}
          {activeTab === 'Fees Manager Session transfer' && <FeesManagerSessionTransfer />}
          {activeTab === 'Payroll Manager Session transfer' && <ErrorPageTemplate requestedUrl="/Payroll/Pay_AcademicYearTransfer.aspx" />}
          {activeTab === 'Admission Manager Session transfer' && <ErrorPageTemplate requestedUrl="/AdmissionManager/AdmAcademicyearTransfer.aspx" />}
          {!activeTab.endsWith('Session transfer') && activeTab !== 'Dashboard' && activeTab !== 'Define Bank' && activeTab !== 'Session Transfer' && activeTab !== 'Change Academic Year' && activeTab !== 'Fee Receipt Number Setting' && activeTab !== 'Collection Page Setting' && activeTab !== 'Fee Opening Balance Setting' && activeTab !== 'Payment Gateway Setting' && activeTab !== 'Report Sign Authority Settings' && activeTab !== 'Receipt Certificate Setting' && activeTab !== 'Define SMS Template' && activeTab !== 'Bill Book Setting' && activeTab !== 'Generate Bill Book Details' && activeTab !== 'Bus ID Setting' && activeTab !== 'Online Page Setting' && activeTab !== 'Fee Entry Lock Setting' && activeTab !== 'Define Fee Installment' && activeTab !== 'Define Fee Head' && activeTab !== 'Define Fee Type' && activeTab !== 'Define Fee Group' && activeTab !== 'Fee Group to Fee Head' && activeTab !== 'Assign Amount Group' && activeTab !== 'Assign Multiple Group to Student' && activeTab !== 'Define Concession' && activeTab !== 'Define Fee Head Concession' && activeTab !== 'Assign Concession To Student' && activeTab !== 'Define Concession Type' && activeTab !== 'Assign concession to single student' && activeTab !== 'Assign Concession' && activeTab !== 'Student Fee Adjustment' && activeTab !== 'Student Fee Details' && activeTab !== 'Assign Opening Balance' && activeTab !== 'Verify Structure' && activeTab !== 'Set Due Limit' && activeTab !== 'Late Fee Settings' && activeTab !== 'Late Fee Setting' && activeTab !== 'Late Fee Master' && activeTab !== 'Late Fee Setting Head Wise' && activeTab !== 'Assign Waive off/Manual Late Fine' && activeTab !== 'Create Students Fees Structure' && activeTab !== 'Define Expense Head' && activeTab !== 'Fee Entry' && activeTab !== 'Print Fee Receipt & Certificate' && activeTab !== 'Fee Type Assign To User' && activeTab !== 'Modify Fees Receipt' && activeTab !== 'Cancel Fee Receipt' && activeTab !== 'Delete Fee Receipt' && activeTab !== 'Manual Fees Modification' && activeTab !== 'Refund Head Amount' && activeTab !== 'Manage Student Expenses' && activeTab !== 'Add Manual Fee' && activeTab !== 'Fee Cheque Clearing' && activeTab !== 'Fees Upload From Tally' && activeTab !== 'Update Bank Date' && activeTab !== 'Advance Adjustment' && activeTab !== 'Fees Upload With Paymode' && activeTab !== 'Online Fees Upload With Deposit Bank' && activeTab !== 'Fees Upload With Deposit Bank' && activeTab !== 'Pay Amount Without Structure' && activeTab !== 'Support To Needy Students' && activeTab !== 'Manage Security Money' && activeTab !== 'Security Money Return' && activeTab !== 'Pay amount without structure for Staff' && activeTab !== 'ChequeEntry' && activeTab !== 'Online Fee Transaction' && activeTab !== 'Manual Settlement' && activeTab !== 'Reconciliation Fee Receipt' && activeTab !== 'Modify Receipt Date & Bank' && activeTab !== 'Multiple Remarks' && activeTab !== 'Transfer Concession' && activeTab !== 'Sponsorship' && activeTab !== 'Travel Agency Master' && activeTab !== 'Vehicle Reminder' && activeTab !== 'Define Vehicle Type' && activeTab !== 'Define Vehicle Details' && activeTab !== 'Define Vehicle Route' && activeTab !== 'Define Vehicle Route Relation' && activeTab !== 'Define Transport Group' && activeTab !== 'Define Transport Medium' && activeTab !== 'Define Route Stop' && activeTab !== 'Assign Transport To Students' && activeTab !== 'Assign Self Transport To Student' && activeTab !== 'Transfer Route' && activeTab !== 'Change Route Vehicle' && activeTab !== 'Vehicle Master Entry' && activeTab !== 'Vehicle Fuel Entry' && activeTab !== 'Vehicle Service Entry' && activeTab !== 'Daily Meter Entry' && activeTab !== 'Driver Detail' && activeTab !== 'Daily Fee Collection' && activeTab !== 'Collection Report Transaction Date wise' && activeTab !== 'Daily Fee Collection Classification Wise' && activeTab !== 'Online Fee Collection' && activeTab !== 'Daily Fee Collection With Concession' && activeTab !== 'Daily Fee Collection with Cheque Details' && activeTab !== 'Fee Collection Report' && activeTab !== 'Daily Fee Collection List With Head Fine Filter' && activeTab !== 'Daily Fee Collection Date Wise' && activeTab !== 'Daily Fee Collection Date Wise With Remark' && activeTab !== 'Daily Fee Collection Account Wise' && activeTab !== 'Daily Fee Collection Receipt Range' && activeTab !== 'Daily Fee Collection Date/Fee Group Wise' && activeTab !== 'PTA Daily Fee Collection Date/Fee Group Wise' && activeTab !== 'Day Wise Total Collection' && activeTab !== 'Date Consolidated Collection Report Paymode Wise' && activeTab !== 'Estimated Collection Report' && activeTab !== 'Fee Head Wise Collection Class Range' && activeTab !== 'Fee Collection Student and Class Wise' && activeTab !== 'Fee Collection With Entry Time Concession' && activeTab !== 'Receipt wise Daily Collection' && activeTab !== 'Receipt wise Fee Type Collection' && activeTab !== 'Month Wise Collection Report' && activeTab !== 'Monthly Consolidated Report' && activeTab !== 'Monthly Fee Collection Report Class Wise' && activeTab !== 'Total Collection Report' && activeTab !== 'Yearly Collection Report' && activeTab !== 'Student Wise Collection Report' && activeTab !== 'Monthly Fee Collection Report Paymode Wise' && activeTab !== 'No of Paid Unpaid Report' && activeTab !== 'Fee Defaulter List' && activeTab !== 'Fee Defaulter List With Classification' && activeTab !== 'Unpaid Fee Student' && activeTab !== 'Fee Defaulter Installment Wise' && activeTab !== 'Fee Defaulter List With Head Fine Filter' && activeTab !== 'Fee Defaulter Report Consolidated' && activeTab !== 'Fee Defaulter Report With Receiving' && activeTab !== 'Fee Defaulter Slip' && activeTab !== 'Unpaid Student Report' && activeTab !== 'Defaulter List Install/Head wise' && activeTab !== 'Fee Defaulter List Boarding wise' && activeTab !== 'Annual Student Ledger 1' && activeTab !== 'Annual Student Ledger 2' && activeTab !== 'Annual Student Ledger 3' && activeTab !== 'Student Ledger Class Wise' && activeTab !== 'Fees Student Ledger' && activeTab !== 'Student Ledger Class Wise With Rec. Date' && activeTab !== 'Student Ledger Class Head Wise' && activeTab !== 'Reconcile Report' && activeTab !== 'Reconcile Student Strength With Concession' && activeTab !== 'Reconcile Installment Class Wise' && activeTab !== 'Fees Concession' && activeTab !== 'Fees Concession With Classification' && activeTab !== 'Fees Concession And Dues' && activeTab !== 'Fees Concession Install/Head Wise' && activeTab !== 'Total Concession Report Install/Head Wise' && activeTab !== 'Fees Concession Student Wise' && activeTab !== 'Deleted Fee Receipt' && activeTab !== 'Modified Fee Receipt Report' && activeTab !== 'Fees Cheque Bounce Report' && activeTab !== 'Cancelled Fees Receipt Report' && activeTab !== 'Student Wise Receipt Report' && activeTab !== 'Waive Off Report' && activeTab !== 'Student Expense Report' && activeTab !== 'Manual Fee Report' && activeTab !== 'Uploaded Excel Details' && activeTab !== 'Amount without Structure report' && activeTab !== 'Security Money Report' && activeTab !== 'Amount Without Structure for Staff' && activeTab !== 'Cheque Clearing Status Report' && activeTab !== 'Cheque Report Date Wise Bank Report' && activeTab !== 'Cheque Report Date Wise With MICR No.' && activeTab !== 'Cheque Report Date Wise' && activeTab !== 'Advance Payment Report' && activeTab !== 'Bad Debts Report' && activeTab !== 'Get Difference from Bank Amount' && activeTab !== 'Student Amount Fee Type Wise' && activeTab !== 'Transport Detail' && activeTab !== 'Transport Student List' && activeTab !== 'Paid Transport' && activeTab !== 'Self Transport Report' && activeTab !== 'Transport Report Class Wise' && activeTab !== 'Assigned Transport Report' && activeTab !== 'Estimated Transport Details' && activeTab !== 'Print TransportId Card' && activeTab !== 'Vehicle Wise Transport Summary' && activeTab !== 'Month Wise Total Amount' && activeTab !== 'Fee Reminder' && activeTab !== 'Vehicle Deail Report' && activeTab !== 'Opening Dues Report' && !activeTab.endsWith('Sms Report') && !activeTab.endsWith('Mail Report') && !activeTab.endsWith('Refund Amount') && !activeTab.endsWith('Group Wise Student Details') && !activeTab.endsWith('Mid Year Student Details') && !activeTab.endsWith('Fee Settings') && (
            <div style={{ padding: 32 }}>
              <div style={{ background: '#fff', border: '1px solid #e2e8f0', padding: 24, display: 'inline-block' }}>
                <p style={{ fontWeight: 600, color: '#374151', marginBottom: 4 }}>{activeTab}</p>
                <p style={{ fontSize: 12, color: '#94a3b8' }}>This section is under development.</p>
              </div>
            </div>
          )}
        </div>
        {toastMessage && (
          <div style={{
            position: 'fixed', bottom: 20, right: 20, background: '#333', color: '#fff',
            padding: '10px 20px', borderRadius: 4, fontSize: 12, zIndex: 1000
          }}>
            {toastMessage}
          </div>
        )}
      </div>
    </div>
  );
}
