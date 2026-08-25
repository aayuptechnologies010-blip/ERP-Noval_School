import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { 
  FaBook, FaGraduationCap, FaChartPie, FaQuestionCircle, 
  FaInfoCircle, FaCog, FaAngleDown, FaAngleUp, FaSearch, FaBars,
  FaCogs, FaTools, FaFileAlt, FaChartBar, FaDotCircle, FaEdit, FaTrashAlt,
  FaSave, FaSync, FaEye, FaTimesCircle, FaPrint
} from 'react-icons/fa';

// Menu config with submenus
const menuItems = [
  {
    icon: <FaCogs />,
    text: 'Global Masters',
    children: [
      { text: 'Define Profession' },
      { text: 'Define Session', children: [
        { text: 'Define Academic Year' },
        { text: 'Define Financial Year' },
      ]},
      { text: 'Define School', children: [
        { text: 'School Global Details' },
        { text: 'Define School Board' },
        { text: 'School Global Details With FeeType' },
      ]},
      { text: 'Define Class Details', children: [
        { text: 'Define Wing' },
        { text: 'Define Class' },
        { text: 'Define Section' },
        { text: 'Relate Class Section' },
      ]},
      { text: 'Define Religion' },
      { text: 'Define Caste' },
      { text: 'Define Sub Caste' },
      { text: 'Define Category' },
      { text: 'Define Parish' },
      { text: 'Define House' },
      { text: 'Define Committee' },
      { text: 'Meeting Details' },
      { text: 'Define Club' },
      { text: 'Define Stream' },
      { text: 'Define Optional Subject' },
      { text: 'Parents Status' },
      { text: 'Import Student' },
      { text: 'Define Classification' },
      { text: 'Define Reason' },
      { text: 'Country Setting' },
      { text: 'Define Remark' },
      { text: 'Session Transfer' },
    ]
  },
  {
    icon: <FaTools />,
    text: 'Master Settings',
    children: [
      { text: 'Global Search Option Settings' },
      { text: 'Change Academic Year' },
      { text: 'Admission Setting' },
      { text: 'Enquiry No Setting' },
      { text: 'Prospectus & Registration No Setting' },
      { text: 'User Permission' },
      { text: 'Define TC Details', children: [
        { text: 'Define Language' },
        { text: 'Define TC Caste' },
        { text: 'Define Extra Activity' },
        { text: 'Define Character' },
        { text: 'Define Promotion Master' },
        { text: 'Define Last Result' },
        { text: 'Term Master' },
        { text: 'Define Moral' },
        { text: 'Define Mother Tongue' },
      ]},
      { text: 'Update Address and Blood' },
      { text: 'Receipt Certificate Setting' },
      { text: 'Certificate Ref No. Setting' },
      { text: 'Admission Form Settings' },
      { text: 'Saral ID Setting' },
    ]
  },
  {
    icon: <FaGraduationCap />,
    text: 'Admission',
    active: true,
    children: [
      { text: 'Enquiry' },
      { text: 'Enquiry FollowUp' },
      { text: 'Prospectus Entry' },
      { text: 'Admission Form Registration' },
      { text: 'Possible Siblings' },
      { text: 'Manual List Generation' },
      { text: 'Student Registration' },
      { text: 'DOB Request' },
      { text: 'Manage Student Details', children: [
        { text: 'Download Photos' },
        { text: 'Update Student Details' },
        { text: 'Set Student Status' },
        { text: 'Change Active/Inactive Status' },
        { text: 'Assign Computer No. To Student' },
        { text: 'Assign Roll No. To Student' },
        { text: 'Upload Student Document' },
        { text: 'Student Bank Details' },
        { text: 'Student Last Exam Details' },
        { text: 'Student Class Promotion' },
        { text: 'Student Class Section Transfer' },
        { text: 'Upload Student Image' },
        { text: 'Delete Student' },
        { text: 'Upload Parent Image' },
      ]},
      { text: 'Slot Creation' },
      { text: 'Define Merit Criteria' },
      { text: 'Slot Wise Point Entry' },
      { text: 'Merit List Generation' },
      { text: 'Re Slotting' },
      { text: 'Upload School Details Document' },
      { text: 'Requests for changes from Parent' },
      { text: 'Admission Entry', children: [
        { text: 'Admission Fee Collection' },
        { text: 'Adm Entry AmtStructure' },
        { text: 'Challan Amount' },
      ]},
      { text: 'Create ID Card' },
      { text: 'Generate Student Info Performa In Bulk' },
      { text: 'Print Student Label' },
      { text: 'Child Portrait' },
      { text: 'Prospectus Settlement Entry' },
      { text: 'Send SMS' },
    ]
  },
  {
    icon: <FaFileAlt />,
    text: 'Certificate',
    children: [
      { text: 'Certificates' },
      { text: 'TC', children: [
        { text: 'UP Board TC Form' },
        { text: 'TC Form' },
        { text: 'TC Form Class Wise' },
        { text: 'Generate TC' },
        { text: 'Generate TC In Bulk' },
        { text: 'TC Report' },
        { text: 'Assign Characteristics to student' },
      ]},
      { text: 'Bonafide Form' },
      { text: 'Assign Visa details to student' },
      { text: 'CBSE registration Form' },
      { text: 'CBSE Exam Confirmation Form' },
    ]
  },
  {
    icon: <FaChartBar />,
    text: 'Reports',
    children: [
      { text: 'Student Details' },
      { text: 'Student Details New' },
      { text: 'Student Data Capture Report' },
      { text: 'Enquiry Followup Details' },
      { text: 'Enquiry Details New' },
      { text: 'Enquiry Details' },
      { text: 'Prospectus Charges Report' },
      { text: 'Merit Generation List' },
      { text: 'Merit Criteria Print' },
      { text: 'Merit List Report' },
      { text: 'Admission Collection Report' },
      { text: 'Slot Report' },
      { text: 'Search and import online Registration' },
      { text: 'Sms Report' },
      { text: 'Sibling Report' },
      { text: 'Student HouseWise Strength Report' },
      { text: 'Student Document Details' },
      { text: 'Class Wise Admission report' },
      { text: 'Student Repeater list' },
      { text: 'Verification Admission Form' },
      { text: 'Admission Withdrawal Register' },
      { text: 'Challan Amount Collection Report' },
      { text: 'Total Collection Report Student Wise' },
      { text: 'Manual List Generation Report' },
      { text: 'Student Modification History Report' },
      { text: 'Certificates History' },
    ]
  },
  {
    icon: <FaChartBar />,
    text: 'Students Reports',
    children: [
      { text: 'Student Strength', children: [] },
      { text: 'Class Wise Student Details' },
      { text: 'Class Section Transfer Report' },
      { text: 'Class Wise Sibling' },
      { text: 'Class Wise Mark List' },
      { text: 'Total Session Strength Wise Report' },
      { text: 'Date Wise Admission Report' },
      { text: 'Student House Wise Report' },
      { text: 'Student Register Date Wise Report' },
      { text: 'Student Health Entry Report' },
      { text: 'Gender/Religion Wise Student Report' },
      { text: 'Category Wise Student Report' },
      { text: 'Surname Wise Student Details' },
      { text: 'Active/Inactive Students Detail Report' },
      { text: 'Staff Ward List Report' },
      { text: 'Student Last Exam Report' },
    ]
  },
];

function SubChildItem({ text, onItemClick }) {
  return (
    <div 
      className="flex items-center gap-2 pl-8 pr-4 py-1.5 text-[12px] text-[#32a3d7] hover:bg-[#eaf7fd] cursor-pointer transition-colors"
      onClick={() => onItemClick(text)}
    >
      <span className="text-gray-400 font-bold text-[10px]">&gt;</span>
      {text}
    </div>
  );
}

function ChildItem({ text, children = [], isOpen, onToggle, onItemClick }) {
  const hasChildren = children && children.length > 0;

  return (
    <div>
      <div
        className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-[#eaf7fd] transition-colors group"
        onClick={() => hasChildren ? onToggle() : onItemClick(text)}
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full border-2 border-[#32a3d7] bg-white shrink-0"></span>
          <span className={`text-[12.5px] font-medium ${isOpen ? 'text-[#32a3d7]' : 'text-gray-600 group-hover:text-[#32a3d7]'}`}>{text}</span>
        </div>
        {hasChildren && (
          <FaAngleDown
            className={`text-[10px] text-[#32a3d7] transition-transform duration-200 ${isOpen ? '' : '-rotate-90'}`}
          />
        )}
      </div>
      {hasChildren && isOpen && (
        <div className="bg-white">
          {children.map((sub, i) => (
            <SubChildItem key={i} text={sub.text} onItemClick={onItemClick} />
          ))}
        </div>
      )}
    </div>
  );
}

function SidebarItem({ icon, text, active = false, children = [], isOpen, onToggle, onItemClick }) {
  const [openChildIndex, setOpenChildIndex] = useState(null);
  const hasChildren = children && children.length > 0;

  return (
    <div>
      <div
        className={`flex items-center justify-between px-4 py-2.5 cursor-pointer transition-colors ${
          active ? 'bg-[#eaf7fd] text-[#32a3d7] font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        }`}
        onClick={() => hasChildren ? onToggle() : onItemClick(text)}
      >
        <div className="flex items-center gap-3">
          <span className={`text-base ${active ? 'text-[#32a3d7]' : 'text-[#32a3d7] opacity-80'}`}>{icon}</span>
          <span className="text-[13px] font-medium">{text}</span>
        </div>
        {hasChildren && (
          <FaAngleDown
            className={`text-[11px] text-gray-400 transition-transform duration-200 ${isOpen ? '' : '-rotate-90'}`}
          />
        )}
      </div>

      {/* Level-2 children */}
      {hasChildren && isOpen && (
        <div className="bg-[#f8fbfc]">
          {children.map((child, i) => (
            <ChildItem 
              key={i} 
              text={child.text} 
              children={child.children || []} 
              isOpen={openChildIndex === i}
              onToggle={() => setOpenChildIndex(openChildIndex === i ? null : i)}
              onItemClick={onItemClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}


function AdmissionLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openTopLevelIndex, setOpenTopLevelIndex] = useState(null);
  const [tabs, setTabs] = useState([{ id: 'Dashboard', title: 'Dashboard' }]);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const userName = "ANKIT KUMAR";

  const [professionData, setProfessionData] = useState([
    { sr: 1, name: "ACCOUNTANT" },
    { sr: 2, name: "ADVOCAT" },
    { sr: 3, name: "ARCHITECT" },
    { sr: 4, name: "BANK EMPLOYEE" },
    { sr: 5, name: "BEAUTICIAN" },
    { sr: 6, name: "BOOK-SELLER" },
    { sr: 7, name: "BOUTIQUE" },
    { sr: 8, name: "BUSINESS MAN" },
    { sr: 9, name: "CHARTED ACCOUNTANT" },
    { sr: 10, name: "CHEMIST" },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [modalInput, setModalInput] = useState('');

  const filteredProfessionData = professionData.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [academicYearData, setAcademicYearData] = useState([
    { sr: 1, name: "2017-2018", isActive: false, startDate: "01-Apr-2017", endDate: "31-Mar-2018", modifiedDate: "25-Oct-2018" },
    { sr: 2, name: "2018-2019", isActive: false, startDate: "01-Apr-2018", endDate: "31-Mar-2019", modifiedDate: "25-Oct-2018" },
    { sr: 3, name: "2019-2020", isActive: false, startDate: "01-Apr-2019", endDate: "31-Mar-2020", modifiedDate: "30-May-2019" },
    { sr: 4, name: "2022-2023", isActive: false, startDate: "01-Apr-2022", endDate: "31-Mar-2023", modifiedDate: "06-Jan-2023" },
    { sr: 5, name: "2023-2024", isActive: false, startDate: "01-Apr-2023", endDate: "31-Mar-2024", modifiedDate: "04-Apr-2023" },
    { sr: 6, name: "2024-2025", isActive: false, startDate: "01-Apr-2024", endDate: "31-Mar-2025", modifiedDate: "02-Aug-2024" },
    { sr: 7, name: "2025-2026", isActive: false, startDate: "01-Apr-2025", endDate: "31-Mar-2026", modifiedDate: "27-Mar-2025" },
    { sr: 8, name: "2026-2027", isActive: true, startDate: "01-Apr-2026", endDate: "31-Mar-2027", modifiedDate: "24-Apr-2026" },
  ]);
  const [isAddAcademicModalOpen, setIsAddAcademicModalOpen] = useState(false);
  const [editAcademicItem, setEditAcademicItem] = useState(null);
  
  const initialAcademicState = { 
    name: '', 
    startYear: '2026', startMonth: 'April', startDay: '1', 
    endYear: '2027', endMonth: 'March', endDay: '31', 
    isActive: false 
  };
  const [academicModalInput, setAcademicModalInput] = useState(initialAcademicState);

  const filteredAcademicYearData = academicYearData.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [financialYearData, setFinancialYearData] = useState([
    { sr: 1, name: "2017-2018", isActive: false, startDate: "01-Apr-2017", endDate: "31-Mar-2018", modifiedDate: "25-Oct-2018" },
    { sr: 2, name: "2018-2019", isActive: false, startDate: "01-Apr-2018", endDate: "31-Mar-2019", modifiedDate: "25-Oct-2018" },
    { sr: 3, name: "2019-2020", isActive: false, startDate: "01-Apr-2019", endDate: "31-Mar-2020", modifiedDate: "30-May-2019" },
    { sr: 4, name: "2022-2023", isActive: false, startDate: "01-Apr-2022", endDate: "31-Mar-2023", modifiedDate: "06-Jan-2023" },
    { sr: 5, name: "2023-2024", isActive: false, startDate: "01-Apr-2023", endDate: "31-Mar-2024", modifiedDate: "04-Apr-2023" },
    { sr: 6, name: "2024-2025", isActive: false, startDate: "01-Apr-2024", endDate: "31-Mar-2025", modifiedDate: "02-Aug-2024" },
    { sr: 7, name: "2025-2026", isActive: false, startDate: "01-Apr-2025", endDate: "31-Mar-2026", modifiedDate: "27-Mar-2025" },
    { sr: 8, name: "2026-2027", isActive: true, startDate: "01-Apr-2026", endDate: "31-Mar-2027", modifiedDate: "24-Apr-2026" },
  ]);
  const [isAddFinancialModalOpen, setIsAddFinancialModalOpen] = useState(false);
  const [editFinancialItem, setEditFinancialItem] = useState(null);
  const [financialModalInput, setFinancialModalInput] = useState(initialAcademicState);

  const filteredFinancialYearData = financialYearData.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddFinancialYear = () => {
    if (!financialModalInput.name.trim()) return;
    const newSr = financialYearData.length > 0 ? Math.max(...financialYearData.map(p => p.sr)) + 1 : 1;
    setFinancialYearData([...financialYearData, { 
      sr: newSr, 
      name: financialModalInput.name,
      isActive: financialModalInput.isActive,
      startDate: `${financialModalInput.startDay.padStart(2, '0')}-${financialModalInput.startMonth.substring(0, 3)}-${financialModalInput.startYear}`,
      endDate: `${financialModalInput.endDay.padStart(2, '0')}-${financialModalInput.endMonth.substring(0, 3)}-${financialModalInput.endYear}`,
      modifiedDate: "24-Aug-2026"
    }]);
    setIsAddFinancialModalOpen(false);
  };

  const handleEditFinancialYear = () => {
    if (!financialModalInput.name.trim() || !editFinancialItem) return;
    setFinancialYearData(financialYearData.map(p => p.sr === editFinancialItem.sr ? { 
      ...p, 
      name: financialModalInput.name,
      isActive: financialModalInput.isActive,
      startDate: `${financialModalInput.startDay.padStart(2, '0')}-${financialModalInput.startMonth.substring(0, 3)}-${financialModalInput.startYear}`,
      endDate: `${financialModalInput.endDay.padStart(2, '0')}-${financialModalInput.endMonth.substring(0, 3)}-${financialModalInput.endYear}`,
      modifiedDate: "24-Aug-2026" 
    } : p));
    setEditFinancialItem(null);
  };

  const handleDeleteFinancialYear = (sr) => {
    if (window.confirm("Are you sure you want to delete this financial year?")) {
      setFinancialYearData(financialYearData.filter(p => p.sr !== sr));
    }
  };

  const openEditFinancialModal = (item) => {
    setEditFinancialItem(item);
    const [startDay, startMonth, startYear] = item.startDate.split('-');
    const [endDay, endMonth, endYear] = item.endDate.split('-');
    
    setFinancialModalInput({
      name: item.name,
      startYear: startYear || '2026',
      startMonth: startMonth || 'April',
      startDay: parseInt(startDay || '1').toString(),
      endYear: endYear || '2027',
      endMonth: endMonth || 'March',
      endDay: parseInt(endDay || '31').toString(),
      isActive: item.isActive
    });
  };

  const initialSchoolState = {
    schoolName: '', schoolAddress: '', schoolAddress2: '', schoolShortName: '',
    contactNo: '', mobile: '', secondaryContactNo: '', emailId: '',
    supportEmailId: '', website: '', prefix: '', isoDetails: '',
    establishmentCode: '', schoolNo: '', affiliationTo: '', affiliationNo: '',
    associates: '', renewUpto: '', schoolStatus: '', city: '',
    eCareMobileNo: '', workingDays: '', recess: '', totalPeriod: '',
    schoolCategory: '', uDiseRegistrationNo: '', facebookId: '', supportTime: '', supportDays: ''
  };

  const [schoolData, setSchoolData] = useState([
    { 
      sr: 1, 
      schoolName: "NAVALS NATIONAL ACADEMY", 
      mainSchool: "True", 
      emailId: "navalsnationalacademymau@gmail.com", 
      website: "www.navalsnationalacademydohrighat.com",
      ...initialSchoolState 
    }
  ]);

  const [isAddSchoolModalOpen, setIsAddSchoolModalOpen] = useState(false);
  const [editSchoolItem, setEditSchoolItem] = useState(null);
  const [isViewSchoolModalOpen, setIsViewSchoolModalOpen] = useState(false);
  const [schoolModalInput, setSchoolModalInput] = useState(initialSchoolState);

  const filteredSchoolData = schoolData.filter(item => 
    item.schoolName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddSchool = () => {
    if (!schoolModalInput.schoolName.trim()) return;
    const newSr = schoolData.length > 0 ? Math.max(...schoolData.map(p => p.sr)) + 1 : 1;
    setSchoolData([...schoolData, { 
      sr: newSr, 
      mainSchool: "False", // Default to False for new ones, or whatever logic needed
      ...schoolModalInput
    }]);
    setIsAddSchoolModalOpen(false);
  };

  const handleEditSchool = () => {
    if (!schoolModalInput.schoolName.trim() || !editSchoolItem) return;
    setSchoolData(schoolData.map(p => p.sr === editSchoolItem.sr ? { 
      ...p, 
      ...schoolModalInput 
    } : p));
    setEditSchoolItem(null);
  };

  const handleDeleteSchool = (sr) => {
    if (window.confirm("Are you sure you want to delete this school?")) {
      setSchoolData(schoolData.filter(p => p.sr !== sr));
    }
  };

  const openEditSchoolModal = (item) => {
    setEditSchoolItem(item);
    setSchoolModalInput({
      ...initialSchoolState, // ensure all keys exist
      ...item 
    });
  };

  const openViewSchoolModal = (item) => {
    setSchoolModalInput({
      ...initialSchoolState,
      ...item
    });
    setIsViewSchoolModalOpen(true);
  };

  const [boardName, setBoardName] = useState('');
  const [isBoardDefault, setIsBoardDefault] = useState(false);
  const [boardData, setBoardData] = useState([
    { sr: 1, name: "ICSE", isDefault: false, modifyDate: "18-May-2018" },
    { sr: 2, name: "AISSC 20171", isDefault: false, modifyDate: "14-Apr-2018" },
    { sr: 3, name: "CBSE", isDefault: false, modifyDate: "04-Apr-2023" },
    { sr: 4, name: "up board", isDefault: true, modifyDate: "24-Aug-2026" },
  ]);
  const [isBoardListModalOpen, setIsBoardListModalOpen] = useState(false);

  const filteredBoardData = boardData.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveBoard = () => {
    if (!boardName.trim()) return;
    const newSr = boardData.length > 0 ? Math.max(...boardData.map(b => b.sr)) + 1 : 1;
    setBoardData([...boardData, { sr: newSr, name: boardName, isDefault: isBoardDefault, modifyDate: "24-Aug-2026" }]);
    setBoardName('');
    setIsBoardDefault(false);
    alert('School board saved successfully!');
  };

  const initialSchoolFeeTypeState = {
    feeType: 'School Fee', schoolName: '', schoolAddress: '', schoolAddress2: '',
    schoolShortName: '', contactNo: '', mobile: '', email: '',
    supportEmailId: '', website: '', prefix: '', receiptSettings: 'Default Receipt',
    schoolNo: '', affiliationTo: '', affiliationNo: '', associates: '',
    renewUpto: '', schoolStatus: '', city: '', eCareMobileNo: '',
    workingDays: '', recess: '', totalPeriod: ''
  };

  const [schoolFeeTypeData, setSchoolFeeTypeData] = useState([]);
  const [isAddSchoolFeeTypeModalOpen, setIsAddSchoolFeeTypeModalOpen] = useState(false);
  const [editSchoolFeeTypeItem, setEditSchoolFeeTypeItem] = useState(null);
  const [isViewSchoolFeeTypeModalOpen, setIsViewSchoolFeeTypeModalOpen] = useState(false);
  const [schoolFeeTypeModalInput, setSchoolFeeTypeModalInput] = useState(initialSchoolFeeTypeState);

  const filteredSchoolFeeTypeData = schoolFeeTypeData.filter(item => 
    item.schoolName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddSchoolFeeType = () => {
    if (!schoolFeeTypeModalInput.schoolName.trim()) return;
    const newSr = schoolFeeTypeData.length > 0 ? Math.max(...schoolFeeTypeData.map(p => p.sr)) + 1 : 1;
    setSchoolFeeTypeData([...schoolFeeTypeData, { 
      sr: newSr, 
      isAdmin: "False", 
      ...schoolFeeTypeModalInput
    }]);
    setIsAddSchoolFeeTypeModalOpen(false);
  };

  const handleEditSchoolFeeType = () => {
    if (!schoolFeeTypeModalInput.schoolName.trim() || !editSchoolFeeTypeItem) return;
    setSchoolFeeTypeData(schoolFeeTypeData.map(p => p.sr === editSchoolFeeTypeItem.sr ? { 
      ...p, 
      ...schoolFeeTypeModalInput 
    } : p));
    setEditSchoolFeeTypeItem(null);
  };

  const handleDeleteSchoolFeeType = (sr) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      setSchoolFeeTypeData(schoolFeeTypeData.filter(p => p.sr !== sr));
    }
  };

  const openEditSchoolFeeTypeModal = (item) => {
    setEditSchoolFeeTypeItem(item);
    setSchoolFeeTypeModalInput({
      ...initialSchoolFeeTypeState,
      ...item 
    });
  };

  const openViewSchoolFeeTypeModal = (item) => {
    setSchoolFeeTypeModalInput({
      ...initialSchoolFeeTypeState,
      ...item
    });
    setIsViewSchoolFeeTypeModalOpen(true);
  };
  const [wingData, setWingData] = useState([
    { sr: 1, name: "Kindergarten", modifyDate: "18-May-2018" },
    { sr: 2, name: "Primary", modifyDate: "29-Jan-2015" },
    { sr: 3, name: "Middle", modifyDate: "05-Apr-2018" },
    { sr: 4, name: "Higher", modifyDate: "29-Jan-2015" },
  ]);
  const [isAddWingModalOpen, setIsAddWingModalOpen] = useState(false);
  const [editWingItem, setEditWingItem] = useState(null);
  const [wingModalInput, setWingModalInput] = useState('');

  const [classData, setClassData] = useState([
    { sr: 1, className: "NUR", wingName: "Kindergarten", orderNo: 1, modifiedDate: "07-Jan-2023", schoolName: "NAVALS NATIONAL ACADEMY" },
    { sr: 2, className: "LKG", wingName: "Kindergarten", orderNo: 2, modifiedDate: "20-Jan-2023", schoolName: "NAVALS NATIONAL ACADEMY" },
    { sr: 3, className: "UKG", wingName: "Kindergarten", orderNo: 3, modifiedDate: "20-Jan-2023", schoolName: "NAVALS NATIONAL ACADEMY" },
    { sr: 4, className: "1", wingName: "Kindergarten", orderNo: 4, modifiedDate: "20-Jan-2023", schoolName: "NAVALS NATIONAL ACADEMY" },
    { sr: 5, className: "2", wingName: "Kindergarten", orderNo: 5, modifiedDate: "20-Jan-2023", schoolName: "NAVALS NATIONAL ACADEMY" },
    { sr: 6, className: "3", wingName: "Kindergarten", orderNo: 6, modifiedDate: "20-Jan-2023", schoolName: "NAVALS NATIONAL ACADEMY" },
    { sr: 7, className: "4", wingName: "Kindergarten", orderNo: 7, modifiedDate: "20-Jan-2023", schoolName: "NAVALS NATIONAL ACADEMY" },
    { sr: 8, className: "5", wingName: "Kindergarten", orderNo: 8, modifiedDate: "20-Jan-2023", schoolName: "NAVALS NATIONAL ACADEMY" },
    { sr: 9, className: "6", wingName: "Kindergarten", orderNo: 9, modifiedDate: "20-Jan-2023", schoolName: "NAVALS NATIONAL ACADEMY" },
    { sr: 10, className: "7", wingName: "Kindergarten", orderNo: 10, modifiedDate: "20-Jan-2023", schoolName: "NAVALS NATIONAL ACADEMY" },
  ]);
  const initialClassState = { className: '', wingName: 'Kindergarten', orderNo: '', schoolName: 'NAVALS NATIONAL ACADEMY' };
  const [isAddClassModalOpen, setIsAddClassModalOpen] = useState(false);
  const [editClassItem, setEditClassItem] = useState(null);
  const [classModalInput, setClassModalInput] = useState(initialClassState);

  const filteredClassData = classData.filter(item => 
    item.className.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [sectionData, setSectionData] = useState([
    { sr: 1, sectionName: "A", orderNo: 1 },
    { sr: 2, sectionName: "B", orderNo: 2 },
    { sr: 3, sectionName: "C", orderNo: 3 },
    { sr: 4, sectionName: "D", orderNo: 4 },
    { sr: 5, sectionName: "E", orderNo: 5 },
    { sr: 6, sectionName: "F", orderNo: 6 },
  ]);
  const initialSectionState = { sectionName: '', orderNo: '' };
  const [isAddSectionModalOpen, setIsAddSectionModalOpen] = useState(false);
  const [editSectionItem, setEditSectionItem] = useState(null);
  const [sectionModalInput, setSectionModalInput] = useState(initialSectionState);

  const filteredSectionData = sectionData.filter(item => 
    item.sectionName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddSection = () => {
    if (!sectionModalInput.sectionName.trim()) return;
    const newSr = sectionData.length > 0 ? Math.max(...sectionData.map(p => p.sr)) + 1 : 1;
    setSectionData([...sectionData, { sr: newSr, ...sectionModalInput }]);
    setIsAddSectionModalOpen(false);
    setSectionModalInput(initialSectionState);
  };

  const handleEditSection = () => {
    if (!sectionModalInput.sectionName.trim() || !editSectionItem) return;
    setSectionData(sectionData.map(p => p.sr === editSectionItem.sr ? { ...p, ...sectionModalInput } : p));
    setEditSectionItem(null);
    setSectionModalInput(initialSectionState);
  };

  const handleDeleteSection = (sr) => {
    if (window.confirm("Are you sure you want to delete this section?")) {
      setSectionData(sectionData.filter(p => p.sr !== sr));
    }
  };

  const openEditSectionModal = (item) => {
    setEditSectionItem(item);
    setSectionModalInput(item);
  };

  const handleAddClass = () => {
    if (!classModalInput.className.trim()) return;
    const newSr = classData.length > 0 ? Math.max(...classData.map(p => p.sr)) + 1 : 1;
    setClassData([...classData, { sr: newSr, ...classModalInput, modifiedDate: "24-Aug-2026" }]);
    setIsAddClassModalOpen(false);
    setClassModalInput(initialClassState);
  };

  const handleEditClass = () => {
    if (!classModalInput.className.trim() || !editClassItem) return;
    setClassData(classData.map(p => p.sr === editClassItem.sr ? { ...p, ...classModalInput, modifiedDate: "24-Aug-2026" } : p));
    setEditClassItem(null);
    setClassModalInput(initialClassState);
  };

  const handleDeleteClass = (sr) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      setClassData(classData.filter(p => p.sr !== sr));
    }
  };

  const openEditClassModal = (item) => {
    setEditClassItem(item);
    setClassModalInput(item);
  };

  const filteredWingData = wingData.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddWing = () => {
    if (!wingModalInput.trim()) return;
    const newSr = wingData.length > 0 ? Math.max(...wingData.map(p => p.sr)) + 1 : 1;
    setWingData([...wingData, { sr: newSr, name: wingModalInput, modifyDate: "24-Aug-2026" }]);
    setIsAddWingModalOpen(false);
    setWingModalInput('');
  };

  const handleEditWing = () => {
    if (!wingModalInput.trim() || !editWingItem) return;
    setWingData(wingData.map(p => p.sr === editWingItem.sr ? { ...p, name: wingModalInput } : p));
    setEditWingItem(null);
    setWingModalInput('');
  };

  const handleDeleteWing = (sr) => {
    if (window.confirm("Are you sure you want to delete this wing?")) {
      setWingData(wingData.filter(p => p.sr !== sr));
    }
  };

  const openEditWingModal = (item) => {
    setEditWingItem(item);
    setWingModalInput(item.name);
  };

  const handleAddAcademicYear = () => {
    if (!academicModalInput.name.trim()) return;
    const newSr = academicYearData.length > 0 ? Math.max(...academicYearData.map(p => p.sr)) + 1 : 1;
    setAcademicYearData([...academicYearData, { 
      sr: newSr, 
      name: academicModalInput.name,
      isActive: academicModalInput.isActive,
      startDate: `${academicModalInput.startDay.padStart(2, '0')}-${academicModalInput.startMonth.substring(0, 3)}-${academicModalInput.startYear}`,
      endDate: `${academicModalInput.endDay.padStart(2, '0')}-${academicModalInput.endMonth.substring(0, 3)}-${academicModalInput.endYear}`,
      modifiedDate: "24-Aug-2026"
    }]);
    setIsAddAcademicModalOpen(false);
  };

  const handleEditAcademicYear = () => {
    if (!academicModalInput.name.trim() || !editAcademicItem) return;
    setAcademicYearData(academicYearData.map(p => p.sr === editAcademicItem.sr ? { 
      ...p, 
      name: academicModalInput.name,
      isActive: academicModalInput.isActive,
      startDate: `${academicModalInput.startDay.padStart(2, '0')}-${academicModalInput.startMonth.substring(0, 3)}-${academicModalInput.startYear}`,
      endDate: `${academicModalInput.endDay.padStart(2, '0')}-${academicModalInput.endMonth.substring(0, 3)}-${academicModalInput.endYear}`,
      modifiedDate: "24-Aug-2026" 
    } : p));
    setEditAcademicItem(null);
  };

  const handleDeleteAcademicYear = (sr) => {
    if (window.confirm("Are you sure you want to delete this academic year?")) {
      setAcademicYearData(academicYearData.filter(p => p.sr !== sr));
    }
  };

  const openEditAcademicModal = (item) => {
    setEditAcademicItem(item);
    const [startDay, startMonth, startYear] = item.startDate.split('-');
    const [endDay, endMonth, endYear] = item.endDate.split('-');
    
    setAcademicModalInput({
      name: item.name,
      startYear: startYear || '2026',
      startMonth: startMonth || 'April',
      startDay: parseInt(startDay || '1').toString(),
      endYear: endYear || '2027',
      endMonth: endMonth || 'March',
      endDay: parseInt(endDay || '31').toString(),
      isActive: item.isActive
    });
  };

  const handleAddProfession = () => {
    if (!modalInput.trim()) return;
    const newSr = professionData.length > 0 ? Math.max(...professionData.map(p => p.sr)) + 1 : 1;
    setProfessionData([...professionData, { sr: newSr, name: modalInput.toUpperCase() }]);
    setIsAddModalOpen(false);
    setModalInput('');
  };

  const handleEditProfession = () => {
    if (!modalInput.trim() || !editItem) return;
    setProfessionData(professionData.map(p => p.sr === editItem.sr ? { ...p, name: modalInput.toUpperCase() } : p));
    setEditItem(null);
    setModalInput('');
  };

  const handleDeleteProfession = (sr) => {
    if (window.confirm("Are you sure you want to delete this profession?")) {
      setProfessionData(professionData.filter(p => p.sr !== sr));
    }
  };

  const openEditModal = (item) => {
    setEditItem(item);
    setModalInput(item.name);
  };

  const handleMenuClick = (itemText) => {
    if (!tabs.find(t => t.id === itemText)) {
      setTabs([...tabs, { id: itemText, title: itemText }]);
    }
    setActiveTab(itemText);
  };

  const closeTab = (id, e) => {
    e.stopPropagation();
    const newTabs = tabs.filter(t => t.id !== id);
    setTabs(newTabs);
    if (activeTab === id && newTabs.length > 0) {
      setActiveTab(newTabs[newTabs.length - 1].id);
    } else if (newTabs.length === 0) {
      setActiveTab(null);
    }
  };

  const schoolFeeTypeFields = [
    { label: 'Fee Type', key: 'feeType', type: 'select', options: ['School Fee', 'Hostel Fee', 'Transport Fee'] },
    { label: 'School Name', key: 'schoolName' },
    { label: 'School Address', key: 'schoolAddress' },
    { label: 'School Address 2', key: 'schoolAddress2' },
    { label: 'School Short Name', key: 'schoolShortName' },
    { label: 'Contact No.', key: 'contactNo' },
    { label: 'Mobile', key: 'mobile' },
    { label: 'Email', key: 'email' },
    { label: 'Support Email ID', key: 'supportEmailId' },
    { label: 'Website', key: 'website' },
    { label: 'Prefix', key: 'prefix' },
    { label: 'Receipt settings', key: 'receiptSettings', type: 'select', options: ['Default Receipt', 'Custom Receipt'] },
    { label: 'School No.', key: 'schoolNo' },
    { label: 'Affiliation To', key: 'affiliationTo' },
    { label: 'Affiliation No.', key: 'affiliationNo' },
    { label: 'Associates', key: 'associates' },
    { label: 'Renew Upto', key: 'renewUpto' },
    { label: 'School Status', key: 'schoolStatus' },
    { label: 'City', key: 'city' },
    { label: 'e-Care Mobile No.', key: 'eCareMobileNo' },
    { label: 'Working Days', key: 'workingDays' },
    { label: 'Recess', key: 'recess' },
    { label: 'Total Period', key: 'totalPeriod' },
  ];

  const schoolFields = [
    { label: 'School Name', key: 'schoolName' },
    { label: 'School Address', key: 'schoolAddress' },
    { label: 'School Address 2', key: 'schoolAddress2' },
    { label: 'School Short Name', key: 'schoolShortName' },
    { label: 'Contact No.(Phone)', key: 'contactNo' },
    { label: 'Mobile', key: 'mobile' },
    { label: 'Secondary Contact No.', key: 'secondaryContactNo' },
    { label: 'Email ID', key: 'emailId' },
    { label: 'Support Email ID', key: 'supportEmailId' },
    { label: 'Website', key: 'website' },
    { label: 'Prefix', key: 'prefix' },
    { label: 'ISO Details', key: 'isoDetails' },
    { label: 'Establishment Code', key: 'establishmentCode' },
    { label: 'School No.', key: 'schoolNo' },
    { label: 'Affiliation To', key: 'affiliationTo' },
    { label: 'Affiliation No.', key: 'affiliationNo' },
    { label: 'Associates', key: 'associates' },
    { label: 'Renew Upto', key: 'renewUpto' },
    { label: 'School Status', key: 'schoolStatus' },
    { label: 'City', key: 'city' },
    { label: 'e-Care Mobile No.', key: 'eCareMobileNo' },
    { label: 'Working Days', key: 'workingDays' },
    { label: 'Recess', key: 'recess' },
    { label: 'Total Period', key: 'totalPeriod' },
    { label: 'School Category', key: 'schoolCategory' },
    { label: 'U-Dise Registration No', key: 'uDiseRegistrationNo' },
    { label: 'Facebook ID', key: 'facebookId' },
    { label: 'Support Time(eg. 9:00AM - 6:00PM)', key: 'supportTime' },
    { label: 'Support Days(eg. Mon-Sat)', key: 'supportDays' }
  ];

  return (
    <div className="flex h-screen w-full font-sans bg-[#f4f7f6] overflow-hidden">

      {/* Sidebar */}
      <div
        className={`bg-white border-r border-gray-200 transition-all duration-300 flex flex-col z-20 shrink-0 ${
          isSidebarOpen ? 'w-60' : 'w-0 overflow-hidden'
        }`}
      >
        <div className="h-14 flex items-center justify-center px-4 border-b border-gray-100 bg-[#32a3d7]">
          <span className="text-base font-semibold text-white tracking-wide">≡ Navigation</span>
        </div>

        <div className="p-3 border-b border-gray-100">
          <div className="flex items-center border border-gray-300 rounded px-3 py-1.5 bg-white">
            <FaSearch className="text-gray-400 mr-2 text-sm" />
            <input type="text" placeholder="Search Menu" className="bg-transparent outline-none w-full text-xs text-gray-600" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {menuItems.map((item, i) => (
            <SidebarItem
              key={i}
              icon={item.icon}
              text={item.text}
              active={item.active}
              children={item.children}
              isOpen={openTopLevelIndex === i}
              onToggle={() => setOpenTopLevelIndex(openTopLevelIndex === i ? null : i)}
              onItemClick={handleMenuClick}
            />
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">

        {/* Header */}
        <div className="h-14 bg-[#32a3d7] flex items-center justify-between px-4 text-white flex-shrink-0 z-30">
          <div className="flex items-center gap-3 min-w-0">
            <FaBars
              className="text-lg cursor-pointer hover:text-gray-200 shrink-0"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            />

            <Link to="/dashboard" className="text-[#ea1f23] font-bold text-base tracking-wider hover:opacity-80 whitespace-nowrap shrink-0">
              NAVALS NATIONAL ACADEMY
            </Link>

            <div className="flex items-center gap-1.5 border-l border-white/30 pl-3 whitespace-nowrap shrink-0">
              <FaBook className="text-base" />
              <span className="text-sm font-medium">Admission</span>
            </div>

            <div className="flex items-center gap-3 ml-2">
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <FaGraduationCap className="text-base opacity-80" />
                <span className="text-xs">Academic Year :</span>
                <select className="bg-[#2a95c8] border border-white/40 rounded text-xs py-0.5 px-1.5 outline-none text-white cursor-pointer">
                  <option className="text-black">2026-2027</option>
                  <option className="text-black">2025-2026</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <FaChartPie className="text-base opacity-80" />
                <span className="text-xs">Financial Year :</span>
                <select className="bg-[#2a95c8] border border-white/40 rounded text-xs py-0.5 px-1.5 outline-none text-white cursor-pointer">
                  <option className="text-black">2026-2027</option>
                  <option className="text-black">2025-2026</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 ml-3 shrink-0">
            <div className="flex gap-3 text-base opacity-90">
              <FaQuestionCircle className="cursor-pointer hover:opacity-70" />
              <FaInfoCircle className="cursor-pointer hover:opacity-70" />
              <FaCog className="cursor-pointer hover:opacity-70" />
            </div>

            <div className="flex items-center gap-1 cursor-pointer hover:text-gray-200 whitespace-nowrap">
              <span className="text-xs font-bold">{userName}</span>
              <FaAngleDown className="text-xs" />
            </div>
          </div>
        </div>

        {/* Sub-header / Quick Access */}
        <div className="h-9 bg-[#4db7e2] flex items-center justify-between px-4 text-white shadow-sm flex-shrink-0">
          <div className="flex items-center gap-1 bg-white text-[#4db7e2] px-3 py-1 rounded-t-sm text-[11px] font-bold mt-1.5 border border-b-0 border-gray-200">
            QUICK ACCESS &gt;
          </div>
          <div className="bg-white text-[#4db7e2] border border-gray-200 px-3 py-1 text-[10px] uppercase font-bold rounded cursor-pointer hover:bg-gray-50 flex items-center gap-1">
            <FaCog /> Customize
          </div>
        </div>

        {/* Tabs Bar */}
        {tabs.length > 0 && (
          <div className="flex items-center gap-1 bg-[#eef1f5] pt-3 px-4">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-1.5 text-xs rounded-t-md cursor-pointer border ${
                  activeTab === tab.id
                    ? 'bg-white text-gray-700 border-gray-200 border-b-white z-10'
                    : 'bg-[#e4e9f0] text-gray-500 border-transparent hover:bg-gray-200 border-b-gray-200'
                }`}
                style={{ marginBottom: activeTab === tab.id ? '-1px' : '0' }}
              >
                {tab.title}
                {tab.id !== 'Dashboard' && (
                  <span
                    onClick={(e) => closeTab(tab.id, e)}
                    className="text-gray-400 hover:text-red-500 ml-2 font-bold text-[10px]"
                  >
                    ✕
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Content Outlet */}
        <div className="flex-1 overflow-y-auto bg-[#eef1f5] p-4 pt-0 flex flex-col">
          <div className="bg-white p-4 rounded-b-md rounded-tr-md shadow-sm border border-gray-200 flex-1 flex flex-col min-h-0">
            {activeTab === 'Dashboard' ? (
              <Outlet />
            ) : activeTab === 'Define School Board' ? (
              <div className="flex flex-col flex-1 p-4">
                <div className="max-w-4xl flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700">Board Name</label>
                    <input 
                      type="text" 
                      className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" 
                      value={boardName} 
                      onChange={e => setBoardName(e.target.value)} 
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 cursor-pointer" 
                      checked={isBoardDefault} 
                      onChange={e => setIsBoardDefault(e.target.checked)} 
                    />
                    <label className="text-sm text-gray-700">Is Default</label>
                  </div>
                  <div className="flex gap-4 mt-8 justify-center">
                    <button onClick={handleSaveBoard} className="border border-green-400 text-green-500 hover:bg-green-50 px-6 py-1.5 rounded flex items-center gap-2 text-sm"><FaSave /> Save</button>
                    <button onClick={() => setIsBoardListModalOpen(true)} className="border border-blue-400 text-blue-500 hover:bg-blue-50 px-6 py-1.5 rounded flex items-center gap-2 text-sm"><FaEye /> View</button>
                    <button className="border border-indigo-400 text-indigo-500 hover:bg-indigo-50 px-6 py-1.5 rounded flex items-center gap-2 text-sm"><FaPrint /> Print</button>
                    <button onClick={() => {setBoardName(''); setIsBoardDefault(false);}} className="border border-orange-400 text-orange-500 hover:bg-orange-50 px-6 py-1.5 rounded flex items-center gap-2 text-sm"><FaTimesCircle /> Reset</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center border border-gray-300 rounded-full px-4 py-1.5 w-64">
                    <FaSearch className="text-gray-400 mr-2 text-sm" />
                    <input 
                      type="text" 
                      placeholder={`Search ${activeTab}`} 
                      className="bg-transparent outline-none w-full text-sm text-gray-700"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)} 
                    />
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => { 
                        if (activeTab === 'Define Profession') { setIsAddModalOpen(true); setModalInput(''); }
                        else if (activeTab === 'Define Academic Year') { setIsAddAcademicModalOpen(true); setAcademicModalInput(initialAcademicState); }
                        else if (activeTab === 'Define Financial Year') { setIsAddFinancialModalOpen(true); setFinancialModalInput(initialAcademicState); }
                        else if (activeTab === 'School Global Details') { setIsAddSchoolModalOpen(true); setSchoolModalInput(initialSchoolState); }
                        else if (activeTab === 'School Global Details With FeeType') { setIsAddSchoolFeeTypeModalOpen(true); setSchoolFeeTypeModalInput(initialSchoolFeeTypeState); }
                        else if (activeTab === 'Define Wing') { setIsAddWingModalOpen(true); setWingModalInput(''); }
                        else if (activeTab === 'Define Class') { setIsAddClassModalOpen(true); setClassModalInput(initialClassState); }
                        else if (activeTab === 'Define Section') { setIsAddSectionModalOpen(true); setSectionModalInput(initialSectionState); }
                      }}
                      className="bg-[#32a3d7] text-white px-4 py-1.5 rounded flex items-center gap-2 text-sm hover:bg-[#288ebf]"
                    >
                      <span className="font-bold">+</span> Add New {activeTab.replace('Define ', '')}
                    </button>
                    <button className="bg-[#32a3d7] text-white px-4 py-1.5 rounded flex items-center gap-2 text-sm hover:bg-[#288ebf]">
                      <FaFileAlt /> Export
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-auto">
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                      {activeTab === 'Define Academic Year' ? (
                        <tr>
                          <th className="px-6 py-3">Sr. No.</th>
                          <th className="px-6 py-3">Academic Year Name</th>
                          <th className="px-6 py-3">Is Active</th>
                          <th className="px-6 py-3">Start Date</th>
                          <th className="px-6 py-3">End Date</th>
                          <th className="px-6 py-3">Modified Date</th>
                          <th className="px-6 py-3 text-right">Action</th>
                        </tr>
                      ) : activeTab === 'Define Financial Year' ? (
                        <tr>
                          <th className="px-6 py-3">Sr. No.</th>
                          <th className="px-6 py-3">Financial Year Name</th>
                          <th className="px-6 py-3">Is Active</th>
                          <th className="px-6 py-3">Start Date</th>
                          <th className="px-6 py-3">End Date</th>
                          <th className="px-6 py-3">Action</th>
                        </tr>
                      ) : activeTab === 'School Global Details' ? (
                        <tr>
                          <th className="px-6 py-3">Sr. No.</th>
                          <th className="px-6 py-3">School Name</th>
                          <th className="px-6 py-3">Main School</th>
                          <th className="px-6 py-3">Email-ID</th>
                          <th className="px-6 py-3">Website</th>
                          <th className="px-6 py-3 text-right">Action</th>
                        </tr>
                      ) : activeTab === 'School Global Details With FeeType' ? (
                        <tr>
                          <th className="px-6 py-3">Sr. No.</th>
                          <th className="px-6 py-3">School Name</th>
                          <th className="px-6 py-3">Is Admin</th>
                          <th className="px-6 py-3">Email-ID</th>
                          <th className="px-6 py-3">Website</th>
                          <th className="px-6 py-3 text-right">Action</th>
                        </tr>
                      ) : activeTab === 'Define Wing' ? (
                        <tr>
                          <th className="px-6 py-3">Sr. No. <FaAngleDown className="inline text-[10px]" /></th>
                          <th className="px-6 py-3">Wing Name <FaAngleDown className="inline text-[10px]" /></th>
                          <th className="px-6 py-3">Modified Details <FaAngleDown className="inline text-[10px]" /></th>
                          <th className="px-6 py-3 text-right">Action</th>
                        </tr>
                      ) : activeTab === 'Define Class' ? (
                        <tr>
                          <th className="px-6 py-3">Sr. No. <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3">Class Name <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3">Wing Name <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3">Order No <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3">Modified Date <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3">School Name <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3 text-center">Action</th>
                        </tr>
                      ) : activeTab === 'Define Section' ? (
                        <tr>
                          <th className="px-6 py-3">Sr. No. <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3">Section Name <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3">Order No <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3 text-center">Action</th>
                        </tr>
                      ) : (
                        <tr>
                          <th className="px-6 py-3">Sr. No.</th>
                          <th className="px-6 py-3">{activeTab.replace('Define ', '')}</th>
                          <th className="px-6 py-3 text-right">Action</th>
                        </tr>
                      )}
                    </thead>
                    <tbody>
                      {activeTab === 'Define Profession' ? (
                        filteredProfessionData.map((row) => (
                          <tr key={row.sr} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-3">{row.sr}</td>
                            <td className="px-6 py-3">{row.name}</td>
                            <td className="px-6 py-3 flex justify-end gap-3 mt-1.5">
                              <FaEdit onClick={() => openEditModal(row)} className="text-gray-400 hover:text-[#32a3d7] cursor-pointer" />
                              <FaTrashAlt onClick={() => handleDeleteProfession(row.sr)} className="text-red-400 hover:text-red-600 cursor-pointer" />
                            </td>
                          </tr>
                        ))
                      ) : activeTab === 'Define Academic Year' ? (
                        filteredAcademicYearData.map((row) => (
                          <tr key={row.sr} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-3">{row.sr}</td>
                            <td className="px-6 py-3">{row.name}</td>
                            <td className="px-6 py-3">{row.isActive ? 'True' : 'False'}</td>
                            <td className="px-6 py-3">{row.startDate}</td>
                            <td className="px-6 py-3">{row.endDate}</td>
                            <td className="px-6 py-3">{row.modifiedDate}</td>
                            <td className="px-6 py-3 flex justify-end gap-3 mt-1.5">
                              <FaEdit onClick={() => openEditAcademicModal(row)} className="text-gray-400 hover:text-[#32a3d7] cursor-pointer" />
                              <FaTrashAlt onClick={() => handleDeleteAcademicYear(row.sr)} className="text-red-400 hover:text-red-600 cursor-pointer" />
                            </td>
                          </tr>
                        ))
                      ) : activeTab === 'Define Financial Year' ? (
                        filteredFinancialYearData.map((row) => (
                          <tr key={row.sr} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-3">{row.sr}</td>
                            <td className="px-6 py-3">{row.name}</td>
                            <td className="px-6 py-3">{row.isActive ? 'True' : 'False'}</td>
                            <td className="px-6 py-3">{row.startDate}</td>
                            <td className="px-6 py-3">{row.endDate}</td>
                            <td className="px-6 py-3 flex gap-3 mt-1.5">
                              <FaEdit onClick={() => openEditFinancialModal(row)} className="text-gray-400 hover:text-[#32a3d7] cursor-pointer" />
                              <FaTrashAlt onClick={() => handleDeleteFinancialYear(row.sr)} className="text-red-400 hover:text-red-600 cursor-pointer" />
                            </td>
                          </tr>
                        ))
                      ) : activeTab === 'School Global Details' ? (
                        filteredSchoolData.map((row) => (
                          <tr key={row.sr} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-3">{row.sr}</td>
                            <td className="px-6 py-3">{row.schoolName}</td>
                            <td className="px-6 py-3">{row.mainSchool}</td>
                            <td className="px-6 py-3">{row.emailId}</td>
                            <td className="px-6 py-3">{row.website}</td>
                            <td className="px-6 py-3 flex justify-end gap-3 mt-1.5">
                              <FaEye onClick={() => openViewSchoolModal(row)} className="text-gray-400 hover:text-green-500 cursor-pointer text-lg" title="View" />
                              <FaEdit onClick={() => openEditSchoolModal(row)} className="text-gray-400 hover:text-[#32a3d7] cursor-pointer text-lg" title="Edit" />
                              <FaTrashAlt onClick={() => handleDeleteSchool(row.sr)} className="text-red-400 hover:text-red-600 cursor-pointer text-lg" title="Delete" />
                            </td>
                          </tr>
                        ))
                      ) : activeTab === 'School Global Details With FeeType' ? (
                        filteredSchoolFeeTypeData.length === 0 ? (
                          <tr>
                            <td colSpan="6" className="px-6 py-3 text-center">No data available in table</td>
                          </tr>
                        ) : (
                          filteredSchoolFeeTypeData.map((row) => (
                            <tr key={row.sr} className="bg-white border-b hover:bg-gray-50">
                              <td className="px-6 py-3">{row.sr}</td>
                              <td className="px-6 py-3">{row.schoolName}</td>
                              <td className="px-6 py-3">{row.isAdmin}</td>
                              <td className="px-6 py-3">{row.emailId}</td>
                              <td className="px-6 py-3">{row.website}</td>
                              <td className="px-6 py-3 flex justify-end gap-3 mt-1.5">
                                <FaEye onClick={() => openViewSchoolFeeTypeModal(row)} className="text-gray-400 hover:text-green-500 cursor-pointer text-lg" title="View" />
                                <FaEdit onClick={() => openEditSchoolFeeTypeModal(row)} className="text-gray-400 hover:text-[#32a3d7] cursor-pointer text-lg" title="Edit" />
                                <FaTrashAlt onClick={() => handleDeleteSchoolFeeType(row.sr)} className="text-red-400 hover:text-red-600 cursor-pointer text-lg" title="Delete" />
                              </td>
                            </tr>
                          ))
                        )
                      ) : activeTab === 'Define Wing' ? (
                        filteredWingData.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="px-6 py-3 text-center">No data available in table</td>
                          </tr>
                        ) : (
                          filteredWingData.map((row) => (
                            <tr key={row.sr} className="bg-white border-b hover:bg-gray-50">
                              <td className="px-6 py-3">{row.sr}</td>
                              <td className="px-6 py-3">{row.name}</td>
                              <td className="px-6 py-3">{row.modifyDate}</td>
                              <td className="px-6 py-3 flex justify-end gap-3 mt-1.5">
                                <FaEdit onClick={() => openEditWingModal(row)} className="text-gray-400 hover:text-[#32a3d7] cursor-pointer text-lg" title="Edit" />
                                <FaTrashAlt onClick={() => handleDeleteWing(row.sr)} className="text-red-400 hover:text-red-600 cursor-pointer text-lg" title="Delete" />
                              </td>
                            </tr>
                          ))
                        )
                      ) : activeTab === 'Define Class' ? (
                        filteredClassData.length === 0 ? (
                          <tr>
                            <td colSpan="7" className="px-6 py-3 text-center">No data available in table</td>
                          </tr>
                        ) : (
                          filteredClassData.map((row) => (
                            <tr key={row.sr} className="bg-white border-b hover:bg-gray-50">
                              <td className="px-6 py-3">{row.sr}</td>
                              <td className="px-6 py-3">{row.className}</td>
                              <td className="px-6 py-3">{row.wingName}</td>
                              <td className="px-6 py-3">{row.orderNo}</td>
                              <td className="px-6 py-3">{row.modifiedDate}</td>
                              <td className="px-6 py-3 uppercase">{row.schoolName}</td>
                              <td className="px-6 py-3 flex justify-center gap-3 mt-1.5">
                                <FaEdit onClick={() => openEditClassModal(row)} className="text-gray-400 hover:text-[#32a3d7] cursor-pointer text-base" title="Edit" />
                                <FaTrashAlt onClick={() => handleDeleteClass(row.sr)} className="text-red-400 hover:text-red-600 cursor-pointer text-base" title="Delete" />
                              </td>
                            </tr>
                          ))
                        )
                      ) : activeTab === 'Define Section' ? (
                        filteredSectionData.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="px-6 py-3 text-center">No data available in table</td>
                          </tr>
                        ) : (
                          filteredSectionData.map((row) => (
                            <tr key={row.sr} className="bg-white border-b hover:bg-gray-50">
                              <td className="px-6 py-3">{row.sr}</td>
                              <td className="px-6 py-3">{row.sectionName}</td>
                              <td className="px-6 py-3">{row.orderNo}</td>
                              <td className="px-6 py-3 flex justify-center gap-3 mt-1.5">
                                <FaEdit onClick={() => openEditSectionModal(row)} className="text-gray-400 hover:text-[#32a3d7] cursor-pointer text-base" title="Edit" />
                                <FaTrashAlt onClick={() => handleDeleteSection(row.sr)} className="text-red-400 hover:text-red-600 cursor-pointer text-base" title="Delete" />
                              </td>
                            </tr>
                          ))
                        )
                      ) : (
                        <tr className="bg-white border-b hover:bg-gray-50">
                          <td className="px-6 py-3">1</td>
                          <td className="px-6 py-3">Sample Data for {activeTab}</td>
                          <td className="px-6 py-3 flex justify-end gap-3 mt-1.5">
                            <FaEdit className="text-gray-400 hover:text-[#32a3d7] cursor-pointer" />
                            <FaTrashAlt className="text-red-400 hover:text-red-600 cursor-pointer" />
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <span>Show</span>
                    <select className="border border-gray-300 rounded px-2 py-1 outline-none">
                      <option>10</option>
                      <option>25</option>
                      <option>50</option>
                    </select>
                    <span>entries</span>
                  </div>
                  <div>Showing 1 to 10 of 15 entries</div>
                  <div className="flex gap-1">
                    <button className="px-2 py-1 border rounded text-gray-400">Previous</button>
                    <button className="px-3 py-1 bg-[#32a3d7] text-white rounded">1</button>
                    <button className="px-3 py-1 border rounded hover:bg-gray-50">2</button>
                    <button className="px-3 py-1 border rounded hover:bg-gray-50">3</button>
                    <button className="px-2 py-1 border rounded text-gray-600 hover:bg-gray-50">Next</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded w-[600px] shadow-lg flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium">Add New Profession</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-6 flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700">Profession</label>
              <input 
                type="text" 
                value={modalInput}
                onChange={(e) => setModalInput(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full" 
              />
            </div>
            <div className="p-4 flex justify-center border-t border-gray-100">
              <button 
                onClick={handleAddProfession}
                className="bg-[#4ade80] hover:bg-[#3bcf6d] text-white px-6 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                <FaSave /> Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded w-[600px] shadow-lg flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium">Edit Profession</h3>
              <button onClick={() => setEditItem(null)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-6 flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700">Profession</label>
              <input 
                type="text" 
                value={modalInput}
                onChange={(e) => setModalInput(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full" 
              />
            </div>
            <div className="p-4 flex justify-center border-t border-gray-100">
              <button 
                onClick={handleEditProfession}
                className="bg-[#32a3d7] hover:bg-[#288ebf] text-white px-6 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                <FaSync /> Update
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Add Modal for Academic Year */}
      {isAddAcademicModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded w-[700px] shadow-lg flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium">Add New Academic Year</h3>
              <button onClick={() => setIsAddAcademicModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div className="grid grid-cols-[150px_1fr] items-center gap-4">
                <label className="text-sm font-bold text-gray-700">Academic Year Name</label>
                <input 
                  type="text" 
                  value={academicModalInput.name}
                  onChange={(e) => setAcademicModalInput({...academicModalInput, name: e.target.value})}
                  className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full" 
                />
              </div>
              
              <div className="grid grid-cols-[150px_1fr] items-center gap-4">
                <label className="text-sm font-bold text-gray-700">Start Date</label>
                <div className="flex gap-4">
                  <select className="border border-gray-300 rounded px-3 py-1.5 w-32" value={academicModalInput.startYear} onChange={e => setAcademicModalInput({...academicModalInput, startYear: e.target.value})}>
                    <option>Year</option><option>2017</option><option>2018</option><option>2019</option><option>2022</option><option>2023</option><option>2024</option><option>2025</option><option>2026</option><option>2027</option>
                  </select>
                  <select className="border border-gray-300 rounded px-3 py-1.5 w-32" value={academicModalInput.startMonth} onChange={e => setAcademicModalInput({...academicModalInput, startMonth: e.target.value})}>
                    <option>Month</option><option>January</option><option>February</option><option>March</option><option>April</option><option>May</option><option>June</option><option>July</option><option>August</option><option>September</option><option>October</option><option>November</option><option>December</option>
                  </select>
                  <select className="border border-gray-300 rounded px-3 py-1.5 w-24" value={academicModalInput.startDay} onChange={e => setAcademicModalInput({...academicModalInput, startDay: e.target.value})}>
                    <option>Day</option>
                    {[...Array(31)].map((_,i) => <option key={i+1}>{i+1}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-[150px_1fr] items-center gap-4">
                <label className="text-sm font-bold text-gray-700">End Date</label>
                <div className="flex gap-4">
                  <select className="border border-gray-300 rounded px-3 py-1.5 w-32" value={academicModalInput.endYear} onChange={e => setAcademicModalInput({...academicModalInput, endYear: e.target.value})}>
                    <option>Year</option><option>2017</option><option>2018</option><option>2019</option><option>2022</option><option>2023</option><option>2024</option><option>2025</option><option>2026</option><option>2027</option>
                  </select>
                  <select className="border border-gray-300 rounded px-3 py-1.5 w-32" value={academicModalInput.endMonth} onChange={e => setAcademicModalInput({...academicModalInput, endMonth: e.target.value})}>
                    <option>Month</option><option>January</option><option>February</option><option>March</option><option>April</option><option>May</option><option>June</option><option>July</option><option>August</option><option>September</option><option>October</option><option>November</option><option>December</option>
                  </select>
                  <select className="border border-gray-300 rounded px-3 py-1.5 w-24" value={academicModalInput.endDay} onChange={e => setAcademicModalInput({...academicModalInput, endDay: e.target.value})}>
                    <option>Day</option>
                    {[...Array(31)].map((_,i) => <option key={i+1}>{i+1}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-[150px_1fr] items-center gap-4">
                <div></div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 cursor-pointer" checked={academicModalInput.isActive} onChange={e => setAcademicModalInput({...academicModalInput, isActive: e.target.checked})} />
                  <label className="text-sm text-gray-700">Is Active</label>
                </div>
              </div>
            </div>
            <div className="p-4 flex justify-center border-t border-gray-100">
              <button 
                onClick={handleAddAcademicYear}
                className="bg-[#4ade80] hover:bg-[#3bcf6d] text-white px-8 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                <FaSave /> Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal for Academic Year */}
      {editAcademicItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded w-[700px] shadow-lg flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium">Edit Academic Year</h3>
              <button onClick={() => setEditAcademicItem(null)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div className="grid grid-cols-[150px_1fr] items-center gap-4">
                <label className="text-sm font-bold text-gray-700">Academic Year Name</label>
                <input 
                  type="text" 
                  value={academicModalInput.name}
                  onChange={(e) => setAcademicModalInput({...academicModalInput, name: e.target.value})}
                  className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full" 
                />
              </div>
              
              <div className="grid grid-cols-[150px_1fr] items-center gap-4">
                <label className="text-sm font-bold text-gray-700">Start Date</label>
                <div className="flex gap-4">
                  <select className="border border-gray-300 rounded px-3 py-1.5 w-32" value={academicModalInput.startYear} onChange={e => setAcademicModalInput({...academicModalInput, startYear: e.target.value})}>
                    <option>Year</option><option>2017</option><option>2018</option><option>2019</option><option>2022</option><option>2023</option><option>2024</option><option>2025</option><option>2026</option><option>2027</option>
                  </select>
                  <select className="border border-gray-300 rounded px-3 py-1.5 w-32" value={academicModalInput.startMonth} onChange={e => setAcademicModalInput({...academicModalInput, startMonth: e.target.value})}>
                    <option>Month</option><option>January</option><option>February</option><option>March</option><option>April</option><option>May</option><option>June</option><option>July</option><option>August</option><option>September</option><option>October</option><option>November</option><option>December</option>
                  </select>
                  <select className="border border-gray-300 rounded px-3 py-1.5 w-24" value={academicModalInput.startDay} onChange={e => setAcademicModalInput({...academicModalInput, startDay: e.target.value})}>
                    <option>Day</option>
                    {[...Array(31)].map((_,i) => <option key={i+1}>{i+1}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-[150px_1fr] items-center gap-4">
                <label className="text-sm font-bold text-gray-700">End Date</label>
                <div className="flex gap-4">
                  <select className="border border-gray-300 rounded px-3 py-1.5 w-32" value={academicModalInput.endYear} onChange={e => setAcademicModalInput({...academicModalInput, endYear: e.target.value})}>
                    <option>Year</option><option>2017</option><option>2018</option><option>2019</option><option>2022</option><option>2023</option><option>2024</option><option>2025</option><option>2026</option><option>2027</option>
                  </select>
                  <select className="border border-gray-300 rounded px-3 py-1.5 w-32" value={academicModalInput.endMonth} onChange={e => setAcademicModalInput({...academicModalInput, endMonth: e.target.value})}>
                    <option>Month</option><option>January</option><option>February</option><option>March</option><option>April</option><option>May</option><option>June</option><option>July</option><option>August</option><option>September</option><option>October</option><option>November</option><option>December</option>
                  </select>
                  <select className="border border-gray-300 rounded px-3 py-1.5 w-24" value={academicModalInput.endDay} onChange={e => setAcademicModalInput({...academicModalInput, endDay: e.target.value})}>
                    <option>Day</option>
                    {[...Array(31)].map((_,i) => <option key={i+1}>{i+1}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-[150px_1fr] items-center gap-4">
                <div></div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 cursor-pointer" checked={academicModalInput.isActive} onChange={e => setAcademicModalInput({...academicModalInput, isActive: e.target.checked})} />
                  <label className="text-sm text-gray-700">Is Active</label>
                </div>
              </div>
            </div>
            <div className="p-4 flex justify-center border-t border-gray-100">
              <button 
                onClick={handleEditAcademicYear}
                className="bg-[#32a3d7] hover:bg-[#288ebf] text-white px-8 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                <FaSync /> Update
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Add Modal for Financial Year */}
      {isAddFinancialModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded w-[700px] shadow-lg flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium">Add New Financial Year</h3>
              <button onClick={() => setIsAddFinancialModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div className="grid grid-cols-[150px_1fr] items-center gap-4">
                <label className="text-sm font-bold text-gray-700">Financial Year Name</label>
                <input 
                  type="text" 
                  value={financialModalInput.name}
                  onChange={(e) => setFinancialModalInput({...financialModalInput, name: e.target.value})}
                  className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full" 
                />
              </div>
              
              <div className="grid grid-cols-[150px_1fr] items-center gap-4">
                <label className="text-sm font-bold text-gray-700">Start Date</label>
                <div className="flex gap-4">
                  <select className="border border-gray-300 rounded px-3 py-1.5 w-32" value={financialModalInput.startYear} onChange={e => setFinancialModalInput({...financialModalInput, startYear: e.target.value})}>
                    <option>Year</option><option>2017</option><option>2018</option><option>2019</option><option>2022</option><option>2023</option><option>2024</option><option>2025</option><option>2026</option><option>2027</option>
                  </select>
                  <select className="border border-gray-300 rounded px-3 py-1.5 w-32" value={financialModalInput.startMonth} onChange={e => setFinancialModalInput({...financialModalInput, startMonth: e.target.value})}>
                    <option>Month</option><option>January</option><option>February</option><option>March</option><option>April</option><option>May</option><option>June</option><option>July</option><option>August</option><option>September</option><option>October</option><option>November</option><option>December</option>
                  </select>
                  <select className="border border-gray-300 rounded px-3 py-1.5 w-24" value={financialModalInput.startDay} onChange={e => setFinancialModalInput({...financialModalInput, startDay: e.target.value})}>
                    <option>Day</option>
                    {[...Array(31)].map((_,i) => <option key={i+1}>{i+1}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-[150px_1fr] items-center gap-4">
                <label className="text-sm font-bold text-gray-700">End Date</label>
                <div className="flex gap-4">
                  <select className="border border-gray-300 rounded px-3 py-1.5 w-32" value={financialModalInput.endYear} onChange={e => setFinancialModalInput({...financialModalInput, endYear: e.target.value})}>
                    <option>Year</option><option>2017</option><option>2018</option><option>2019</option><option>2022</option><option>2023</option><option>2024</option><option>2025</option><option>2026</option><option>2027</option>
                  </select>
                  <select className="border border-gray-300 rounded px-3 py-1.5 w-32" value={financialModalInput.endMonth} onChange={e => setFinancialModalInput({...financialModalInput, endMonth: e.target.value})}>
                    <option>Month</option><option>January</option><option>February</option><option>March</option><option>April</option><option>May</option><option>June</option><option>July</option><option>August</option><option>September</option><option>October</option><option>November</option><option>December</option>
                  </select>
                  <select className="border border-gray-300 rounded px-3 py-1.5 w-24" value={financialModalInput.endDay} onChange={e => setFinancialModalInput({...financialModalInput, endDay: e.target.value})}>
                    <option>Day</option>
                    {[...Array(31)].map((_,i) => <option key={i+1}>{i+1}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-[150px_1fr] items-center gap-4">
                <div></div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 cursor-pointer" checked={financialModalInput.isActive} onChange={e => setFinancialModalInput({...financialModalInput, isActive: e.target.checked})} />
                  <label className="text-sm text-gray-700">Is Active</label>
                </div>
              </div>
            </div>
            <div className="p-4 flex justify-center border-t border-gray-100">
              <button 
                onClick={handleAddFinancialYear}
                className="bg-[#4ade80] hover:bg-[#3bcf6d] text-white px-8 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                <FaSave /> Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal for Financial Year */}
      {editFinancialItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded w-[700px] shadow-lg flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium">Edit Financial Year</h3>
              <button onClick={() => setEditFinancialItem(null)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div className="grid grid-cols-[150px_1fr] items-center gap-4">
                <label className="text-sm font-bold text-gray-700">Financial Year Name</label>
                <input 
                  type="text" 
                  value={financialModalInput.name}
                  onChange={(e) => setFinancialModalInput({...financialModalInput, name: e.target.value})}
                  className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full" 
                />
              </div>
              
              <div className="grid grid-cols-[150px_1fr] items-center gap-4">
                <label className="text-sm font-bold text-gray-700">Start Date</label>
                <div className="flex gap-4">
                  <select className="border border-gray-300 rounded px-3 py-1.5 w-32" value={financialModalInput.startYear} onChange={e => setFinancialModalInput({...financialModalInput, startYear: e.target.value})}>
                    <option>Year</option><option>2017</option><option>2018</option><option>2019</option><option>2022</option><option>2023</option><option>2024</option><option>2025</option><option>2026</option><option>2027</option>
                  </select>
                  <select className="border border-gray-300 rounded px-3 py-1.5 w-32" value={financialModalInput.startMonth} onChange={e => setFinancialModalInput({...financialModalInput, startMonth: e.target.value})}>
                    <option>Month</option><option>January</option><option>February</option><option>March</option><option>April</option><option>May</option><option>June</option><option>July</option><option>August</option><option>September</option><option>October</option><option>November</option><option>December</option>
                  </select>
                  <select className="border border-gray-300 rounded px-3 py-1.5 w-24" value={financialModalInput.startDay} onChange={e => setFinancialModalInput({...financialModalInput, startDay: e.target.value})}>
                    <option>Day</option>
                    {[...Array(31)].map((_,i) => <option key={i+1}>{i+1}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-[150px_1fr] items-center gap-4">
                <label className="text-sm font-bold text-gray-700">End Date</label>
                <div className="flex gap-4">
                  <select className="border border-gray-300 rounded px-3 py-1.5 w-32" value={financialModalInput.endYear} onChange={e => setFinancialModalInput({...financialModalInput, endYear: e.target.value})}>
                    <option>Year</option><option>2017</option><option>2018</option><option>2019</option><option>2022</option><option>2023</option><option>2024</option><option>2025</option><option>2026</option><option>2027</option>
                  </select>
                  <select className="border border-gray-300 rounded px-3 py-1.5 w-32" value={financialModalInput.endMonth} onChange={e => setFinancialModalInput({...financialModalInput, endMonth: e.target.value})}>
                    <option>Month</option><option>January</option><option>February</option><option>March</option><option>April</option><option>May</option><option>June</option><option>July</option><option>August</option><option>September</option><option>October</option><option>November</option><option>December</option>
                  </select>
                  <select className="border border-gray-300 rounded px-3 py-1.5 w-24" value={financialModalInput.endDay} onChange={e => setFinancialModalInput({...financialModalInput, endDay: e.target.value})}>
                    <option>Day</option>
                    {[...Array(31)].map((_,i) => <option key={i+1}>{i+1}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-[150px_1fr] items-center gap-4">
                <div></div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 cursor-pointer" checked={financialModalInput.isActive} onChange={e => setFinancialModalInput({...financialModalInput, isActive: e.target.checked})} />
                  <label className="text-sm text-gray-700">Is Active</label>
                </div>
              </div>
            </div>
            <div className="p-4 flex justify-center border-t border-gray-100">
              <button 
                onClick={handleEditFinancialYear}
                className="bg-[#32a3d7] hover:bg-[#288ebf] text-white px-8 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                <FaSync /> Update
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Add Modal for School Global Details */}
      {isAddSchoolModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded w-[90%] max-w-5xl shadow-lg flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium text-lg">Add New School</h3>
              <button onClick={() => setIsAddSchoolModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-4 gap-x-6 gap-y-4">
                {schoolFields.map(f => (
                  <div key={f.key} className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-700">{f.label}</label>
                    <input 
                      type="text" 
                      value={schoolModalInput[f.key] || ''}
                      onChange={(e) => setSchoolModalInput({...schoolModalInput, [f.key]: e.target.value})}
                      className="border border-gray-300 rounded px-2 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" 
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 flex justify-center border-t border-gray-100">
              <button 
                onClick={handleAddSchool}
                className="bg-[#4ade80] hover:bg-[#3bcf6d] text-white px-8 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                <FaSave /> Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal for School Global Details */}
      {editSchoolItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded w-[90%] max-w-5xl shadow-lg flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium text-lg">Edit School</h3>
              <button onClick={() => setEditSchoolItem(null)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-4 gap-x-6 gap-y-4">
                {schoolFields.map(f => (
                  <div key={f.key} className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-700">{f.label}</label>
                    <input 
                      type="text" 
                      value={schoolModalInput[f.key] || ''}
                      onChange={(e) => setSchoolModalInput({...schoolModalInput, [f.key]: e.target.value})}
                      className="border border-gray-300 rounded px-2 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" 
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 flex justify-center border-t border-gray-100">
              <button 
                onClick={handleEditSchool}
                className="bg-[#32a3d7] hover:bg-[#288ebf] text-white px-8 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                <FaSync /> Update
              </button>
            </div>
          </div>
        </div>
      )}
      {/* View Modal for School Global Details */}
      {isViewSchoolModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded w-[90%] max-w-5xl shadow-lg flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium text-lg">View School Details</h3>
              <button onClick={() => setIsViewSchoolModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-4 gap-x-6 gap-y-4">
                {schoolFields.map(f => (
                  <div key={f.key} className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-700">{f.label}</label>
                    <input 
                      type="text" 
                      value={schoolModalInput[f.key] || ''}
                      readOnly
                      className="border border-gray-200 bg-gray-50 rounded px-2 py-1.5 outline-none w-full text-sm text-gray-600 cursor-not-allowed" 
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 flex justify-end border-t border-gray-100">
              <button 
                onClick={() => setIsViewSchoolModalOpen(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* School Board List Modal */}
      {isBoardListModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded w-[90%] max-w-4xl shadow-lg flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium text-lg">School Board List</h3>
              <button onClick={() => setIsBoardListModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-4 overflow-y-auto flex-1">
              <div className="flex items-center border border-gray-300 rounded-full px-4 py-1.5 w-64 mb-4">
                <FaSearch className="text-gray-400 mr-2 text-sm" />
                <input 
                  type="text" 
                  placeholder="Search" 
                  className="bg-transparent outline-none w-full text-sm text-gray-700"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} 
                />
              </div>

              <table className="w-full text-sm text-center text-gray-700 border border-gray-200">
                <thead className="text-xs uppercase bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 border-r border-gray-200">Sr. No. <FaAngleDown className="inline text-[10px]" /></th>
                    <th className="px-4 py-3 border-r border-gray-200">Select <FaAngleDown className="inline text-[10px]" /></th>
                    <th className="px-4 py-3 border-r border-gray-200">Board <FaAngleDown className="inline text-[10px]" /></th>
                    <th className="px-4 py-3 border-r border-gray-200">Is Default <FaAngleDown className="inline text-[10px]" /></th>
                    <th className="px-4 py-3">Modify Details</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBoardData.map((row) => (
                    <tr key={row.sr} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-4 py-3 border-r border-gray-200">{row.sr}</td>
                      <td className="px-4 py-3 border-r border-gray-200">
                        <button className="border border-[#32a3d7] text-[#32a3d7] px-3 py-1 rounded text-xs flex items-center gap-1 mx-auto hover:bg-[#e6f4fc]">
                          <span className="font-bold text-[10px]">✔</span> Select
                        </button>
                      </td>
                      <td className="px-4 py-3 border-r border-gray-200">{row.name}</td>
                      <td className="px-4 py-3 border-r border-gray-200">{row.isDefault ? 'True' : 'False'}</td>
                      <td className="px-4 py-3">{row.modifyDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <span>Show</span>
                  <select className="border border-gray-300 rounded px-2 py-1 outline-none">
                    <option>10</option>
                  </select>
                  <span>entries</span>
                </div>
                <div>Showing 1 to {filteredBoardData.length} of {filteredBoardData.length} entries</div>
                <div className="flex items-center gap-1">
                  <button className="text-gray-400 px-2 cursor-not-allowed">Previous</button>
                  <button className="bg-[#00c0ef] text-white px-3 py-1 rounded">1</button>
                  <button className="text-gray-600 px-2 hover:text-gray-800">Next</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Add Modal for School Global Details With FeeType */}
      {isAddSchoolFeeTypeModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded w-[90%] max-w-5xl shadow-lg flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium text-lg">Add New School Type</h3>
              <button onClick={() => setIsAddSchoolFeeTypeModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-4 gap-x-6 gap-y-4">
                {schoolFeeTypeFields.map(f => (
                  <div key={f.key} className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-700">{f.label}</label>
                    {f.type === 'select' ? (
                      <select 
                        value={schoolFeeTypeModalInput[f.key] || ''}
                        onChange={(e) => setSchoolFeeTypeModalInput({...schoolFeeTypeModalInput, [f.key]: e.target.value})}
                        className="border border-gray-300 rounded px-2 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm bg-white"
                      >
                        {f.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    ) : (
                      <input 
                        type="text" 
                        value={schoolFeeTypeModalInput[f.key] || ''}
                        onChange={(e) => setSchoolFeeTypeModalInput({...schoolFeeTypeModalInput, [f.key]: e.target.value})}
                        className="border border-gray-300 rounded px-2 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" 
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 flex justify-center border-t border-gray-100">
              <button 
                onClick={handleAddSchoolFeeType}
                className="bg-[#4ade80] hover:bg-[#3bcf6d] text-white px-8 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                <FaSave /> Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal for School Global Details With FeeType */}
      {editSchoolFeeTypeItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded w-[90%] max-w-5xl shadow-lg flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium text-lg">Edit School Type</h3>
              <button onClick={() => setEditSchoolFeeTypeItem(null)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-4 gap-x-6 gap-y-4">
                {schoolFeeTypeFields.map(f => (
                  <div key={f.key} className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-700">{f.label}</label>
                    {f.type === 'select' ? (
                      <select 
                        value={schoolFeeTypeModalInput[f.key] || ''}
                        onChange={(e) => setSchoolFeeTypeModalInput({...schoolFeeTypeModalInput, [f.key]: e.target.value})}
                        className="border border-gray-300 rounded px-2 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm bg-white"
                      >
                        {f.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    ) : (
                      <input 
                        type="text" 
                        value={schoolFeeTypeModalInput[f.key] || ''}
                        onChange={(e) => setSchoolFeeTypeModalInput({...schoolFeeTypeModalInput, [f.key]: e.target.value})}
                        className="border border-gray-300 rounded px-2 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" 
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 flex justify-center border-t border-gray-100">
              <button 
                onClick={handleEditSchoolFeeType}
                className="bg-[#32a3d7] hover:bg-[#288ebf] text-white px-8 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                <FaSync /> Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal for School Global Details With FeeType */}
      {isViewSchoolFeeTypeModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded w-[90%] max-w-5xl shadow-lg flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium text-lg">View School Type Details</h3>
              <button onClick={() => setIsViewSchoolFeeTypeModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-4 gap-x-6 gap-y-4">
                {schoolFeeTypeFields.map(f => (
                  <div key={f.key} className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-700">{f.label}</label>
                    {f.type === 'select' ? (
                      <input 
                        type="text" 
                        value={schoolFeeTypeModalInput[f.key] || ''}
                        readOnly
                        className="border border-gray-200 bg-gray-50 rounded px-2 py-1.5 outline-none w-full text-sm text-gray-600 cursor-not-allowed" 
                      />
                    ) : (
                      <input 
                        type="text" 
                        value={schoolFeeTypeModalInput[f.key] || ''}
                        readOnly
                        className="border border-gray-200 bg-gray-50 rounded px-2 py-1.5 outline-none w-full text-sm text-gray-600 cursor-not-allowed" 
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 flex justify-end border-t border-gray-100">
              <button 
                onClick={() => setIsViewSchoolFeeTypeModalOpen(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Add Modal for Define Wing */}
      {isAddWingModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded w-[90%] max-w-2xl shadow-lg flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium text-lg">Add New Wing Name</h3>
              <button onClick={() => setIsAddWingModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-1 max-w-lg mx-auto">
                <label className="text-sm font-bold text-gray-700">Wing Name</label>
                <input 
                  type="text" 
                  value={wingModalInput}
                  onChange={(e) => setWingModalInput(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" 
                />
              </div>
            </div>
            <div className="p-4 flex justify-center border-t border-gray-100">
              <button 
                onClick={handleAddWing}
                className="bg-[#4ade80] hover:bg-[#3bcf6d] text-white px-8 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                <FaSave /> Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal for Define Wing */}
      {editWingItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded w-[90%] max-w-2xl shadow-lg flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium text-lg">Edit Wing Name</h3>
              <button onClick={() => setEditWingItem(null)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-1 max-w-lg mx-auto">
                <label className="text-sm font-bold text-gray-700">Wing Name</label>
                <input 
                  type="text" 
                  value={wingModalInput}
                  onChange={(e) => setWingModalInput(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" 
                />
              </div>
            </div>
            <div className="p-4 flex justify-center border-t border-gray-100">
              <button 
                onClick={handleEditWing}
                className="bg-[#32a3d7] hover:bg-[#288ebf] text-white px-8 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                <FaSync /> Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal for Define Class */}
      {isAddClassModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded w-[90%] max-w-2xl shadow-lg flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium text-lg">Add New Class</h3>
              <button onClick={() => setIsAddClassModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-4 max-w-lg mx-auto">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-700">Class Name</label>
                  <input 
                    type="text" 
                    value={classModalInput.className}
                    onChange={(e) => setClassModalInput({...classModalInput, className: e.target.value})}
                    className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" 
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-700">Wing Name</label>
                  <select 
                    value={classModalInput.wingName}
                    onChange={(e) => setClassModalInput({...classModalInput, wingName: e.target.value})}
                    className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm bg-white" 
                  >
                    <option>Kindergarten</option>
                    <option>Primary</option>
                    <option>Middle</option>
                    <option>Higher</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-700">Order No</label>
                  <input 
                    type="number" 
                    value={classModalInput.orderNo}
                    onChange={(e) => setClassModalInput({...classModalInput, orderNo: e.target.value})}
                    className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" 
                  />
                </div>
              </div>
            </div>
            <div className="p-4 flex justify-center border-t border-gray-100">
              <button 
                onClick={handleAddClass}
                className="bg-[#4ade80] hover:bg-[#3bcf6d] text-white px-8 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                <FaSave /> Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal for Define Class */}
      {editClassItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded w-[90%] max-w-2xl shadow-lg flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium text-lg">Edit Class</h3>
              <button onClick={() => setEditClassItem(null)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-4 max-w-lg mx-auto">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-700">Class Name</label>
                  <input 
                    type="text" 
                    value={classModalInput.className}
                    onChange={(e) => setClassModalInput({...classModalInput, className: e.target.value})}
                    className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" 
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-700">Wing Name</label>
                  <select 
                    value={classModalInput.wingName}
                    onChange={(e) => setClassModalInput({...classModalInput, wingName: e.target.value})}
                    className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm bg-white" 
                  >
                    <option>Kindergarten</option>
                    <option>Primary</option>
                    <option>Middle</option>
                    <option>Higher</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-700">Order No</label>
                  <input 
                    type="number" 
                    value={classModalInput.orderNo}
                    onChange={(e) => setClassModalInput({...classModalInput, orderNo: e.target.value})}
                    className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" 
                  />
                </div>
              </div>
            </div>
            <div className="p-4 flex justify-center border-t border-gray-100">
              <button 
                onClick={handleEditClass}
                className="bg-[#32a3d7] hover:bg-[#288ebf] text-white px-8 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                <FaSync /> Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal for Define Section */}
      {isAddSectionModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded w-[90%] max-w-lg shadow-lg flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium text-lg">Add New Section</h3>
              <button onClick={() => setIsAddSectionModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-4 max-w-sm mx-auto">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-700">Section Name</label>
                  <input 
                    type="text" 
                    value={sectionModalInput.sectionName}
                    onChange={(e) => setSectionModalInput({...sectionModalInput, sectionName: e.target.value})}
                    className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" 
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-700">Order No</label>
                  <input 
                    type="number" 
                    value={sectionModalInput.orderNo}
                    onChange={(e) => setSectionModalInput({...sectionModalInput, orderNo: e.target.value})}
                    className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" 
                  />
                </div>
              </div>
            </div>
            <div className="p-4 flex justify-center border-t border-gray-100">
              <button 
                onClick={handleAddSection}
                className="bg-[#4ade80] hover:bg-[#3bcf6d] text-white px-8 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                <FaSave /> Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal for Define Section */}
      {editSectionItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded w-[90%] max-w-lg shadow-lg flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium text-lg">Edit Section</h3>
              <button onClick={() => setEditSectionItem(null)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-4 max-w-sm mx-auto">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-700">Section Name</label>
                  <input 
                    type="text" 
                    value={sectionModalInput.sectionName}
                    onChange={(e) => setSectionModalInput({...sectionModalInput, sectionName: e.target.value})}
                    className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" 
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-700">Order No</label>
                  <input 
                    type="number" 
                    value={sectionModalInput.orderNo}
                    onChange={(e) => setSectionModalInput({...sectionModalInput, orderNo: e.target.value})}
                    className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" 
                  />
                </div>
              </div>
            </div>
            <div className="p-4 flex justify-center border-t border-gray-100">
              <button 
                onClick={handleEditSection}
                className="bg-[#32a3d7] hover:bg-[#288ebf] text-white px-8 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                <FaSync /> Update
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default AdmissionLayout;
