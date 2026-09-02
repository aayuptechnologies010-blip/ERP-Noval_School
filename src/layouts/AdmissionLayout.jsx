import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { 
  FaBook, FaGraduationCap, FaChartPie, FaQuestionCircle, 
  FaInfoCircle, FaCog, FaAngleDown, FaAngleUp, FaSearch, FaBars,
  FaCogs, FaTools, FaFileAlt, FaChartBar, FaDotCircle, FaEdit, FaTrashAlt,
  FaSave, FaSync, FaEye, FaTimesCircle, FaPrint, FaCopy, FaClock, FaUser
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
      { text: 'Stationary Details' },
      { text: 'TC Setting' },
      { text: 'Image Setting' },
      { text: 'Report Layout Setting' },
      { text: 'Define Document Type' },
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

function SubChildItem({ text, onItemClick, activeTab }) {
  const isActive = text === activeTab;
  return (
    <div 
      className={`flex items-center gap-2 pl-8 pr-4 py-1.5 text-[12px] cursor-pointer transition-colors ${
        isActive ? 'bg-gray-700 text-white font-bold' : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
      }`}
      onClick={() => onItemClick(text)}
    >
      <span className={`font-bold text-[10px] ${isActive ? 'text-[#00a2db]' : 'text-gray-500'}`}>&gt;</span>
      {text}
    </div>
  );
}

function ChildItem({ text, children = [], isOpen, onToggle, onItemClick, activeTab }) {
  const hasChildren = children && children.length > 0;
  const isActive = text === activeTab || (hasChildren && children.some(sub => sub.text === activeTab));

  return (
    <div>
      <div
        className={`flex items-center justify-between px-4 py-2 cursor-pointer transition-colors group ${
          isActive ? 'bg-gray-700/60 text-white' : 'hover:bg-gray-700/40'
        }`}
        onClick={() => hasChildren ? onToggle() : onItemClick(text)}
      >
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? 'bg-[#00a2db]' : 'bg-gray-400'}`}></span>
          <span className={`text-[12.5px] font-medium ${isActive ? 'text-white font-bold' : isOpen ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>{text}</span>
        </div>
        {hasChildren && (
          <span className={`text-[10px] text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-90 text-white' : ''}`}>
            &gt;
          </span>
        )}
      </div>
      {hasChildren && isOpen && (
        <div className="bg-[#191f26]">
          {children.map((sub, i) => (
            <SubChildItem key={i} text={sub.text} onItemClick={onItemClick} activeTab={activeTab} />
          ))}
        </div>
      )}
    </div>
  );
}

function SidebarItem({ icon, text, active = false, children = [], isOpen, isExpanded, onToggle, onItemClick, activeTab }) {
  const [openChildIndex, setOpenChildIndex] = useState(null);
  const hasChildren = children && children.length > 0;

  if (!isExpanded) {
    return (
      <div
        className={`w-10 h-10 flex items-center justify-center cursor-pointer transition-colors ${
          active 
            ? 'text-white bg-[#00a2db] rounded-lg' 
            : 'text-gray-400 hover:text-white hover:bg-gray-700/60 rounded-lg'
        }`}
        title={text}
        onClick={onToggle}
      >
        <span className="text-lg">{icon}</span>
      </div>
    );
  }

  return (
    <div>
      <div
        className={`flex items-center justify-between px-4 py-2.5 cursor-pointer transition-colors ${
          active ? 'bg-gray-700/70 text-white font-semibold' : 'text-gray-300 hover:bg-gray-700/40 hover:text-white font-medium'
        }`}
        onClick={() => hasChildren ? onToggle() : onItemClick(text)}
      >
        <div className="flex items-center gap-3.5 min-w-0">
          <span className={`text-base shrink-0 ${active ? 'text-[#00a2db]' : 'text-gray-400'}`}>{icon}</span>
          <span className="text-[13px] truncate">{text}</span>
        </div>
        {hasChildren && (
          <span
            className={`text-[12px] text-gray-400 font-bold transition-transform duration-200 ${
              isOpen ? 'rotate-90 text-white' : ''
            }`}
          >
            &gt;
          </span>
        )}
      </div>

      {/* Level-2 children */}
      {hasChildren && isOpen && (
        <div className="bg-[#1f262e] border-l-2 border-[#00a2db]/40 ml-4 my-1">
          {children.map((child, i) => (
            <ChildItem 
              key={i} 
              text={child.text} 
              children={child.children || []} 
              isOpen={openChildIndex === i}
              onToggle={() => setOpenChildIndex(openChildIndex === i ? null : i)}
              onItemClick={onItemClick}
              activeTab={activeTab}
            />
          ))}
        </div>
      )}
    </div>
  );
}


function AdmissionLayout() {
  const [isPinned, setIsPinned] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isExpanded = isPinned || isHovered;
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

  const [religionData, setReligionData] = useState([
    { sr: 1, name: "SIKH" },
    { sr: 2, name: "MUSLIM" },
    { sr: 3, name: "HINDU" },
    { sr: 4, name: "CHRISTIAN" },
    { sr: 5, name: "O.B.C." },
    { sr: 6, name: "SELECT CASTE CATEGORY" },
    { sr: 7, name: "S.C." },
    { sr: 8, name: "GENERAL" },
    { sr: 9, name: "S.T." },
  ]);
  const [isAddReligionModalOpen, setIsAddReligionModalOpen] = useState(false);
  const [editReligionItem, setEditReligionItem] = useState(null);
  const [religionModalInput, setReligionModalInput] = useState('');

  const filteredReligionData = religionData.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddReligion = () => {
    if (!religionModalInput.trim()) return;
    const newSr = religionData.length > 0 ? Math.max(...religionData.map(p => p.sr)) + 1 : 1;
    setReligionData([...religionData, { sr: newSr, name: religionModalInput.toUpperCase() }]);
    setIsAddReligionModalOpen(false);
    setReligionModalInput('');
  };

  const handleEditReligion = () => {
    if (!religionModalInput.trim() || !editReligionItem) return;
    setReligionData(religionData.map(p => p.sr === editReligionItem.sr ? { ...p, name: religionModalInput.toUpperCase() } : p));
    setEditReligionItem(null);
    setReligionModalInput('');
  };

  const handleDeleteReligion = (sr) => {
    if (window.confirm("Are you sure you want to delete this religion?")) {
      setReligionData(religionData.filter(p => p.sr !== sr));
    }
  };

  const openEditReligionModal = (item) => {
    setEditReligionItem(item);
    setReligionModalInput(item.name);
  };

  const [casteData, setCasteData] = useState([]);
  const [isAddCasteModalOpen, setIsAddCasteModalOpen] = useState(false);
  const [editCasteItem, setEditCasteItem] = useState(null);
  const [casteModalInput, setCasteModalInput] = useState('');

  const filteredCasteData = casteData.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCaste = () => {
    if (!casteModalInput.trim()) return;
    const newSr = casteData.length > 0 ? Math.max(...casteData.map(p => p.sr)) + 1 : 1;
    setCasteData([...casteData, { sr: newSr, name: casteModalInput.toUpperCase() }]);
    setIsAddCasteModalOpen(false);
    setCasteModalInput('');
  };

  const handleEditCaste = () => {
    if (!casteModalInput.trim() || !editCasteItem) return;
    setCasteData(casteData.map(p => p.sr === editCasteItem.sr ? { ...p, name: casteModalInput.toUpperCase() } : p));
    setEditCasteItem(null);
    setCasteModalInput('');
  };

  const handleDeleteCaste = (sr) => {
    if (window.confirm("Are you sure you want to delete this caste?")) {
      setCasteData(casteData.filter(p => p.sr !== sr));
    }
  };

  const openEditCasteModal = (item) => {
    setEditCasteItem(item);
    setCasteModalInput(item.name);
  };

  // Sub Caste
  const [subCasteData, setSubCasteData] = useState([]);
  const [isAddSubCasteModalOpen, setIsAddSubCasteModalOpen] = useState(false);
  const [editSubCasteItem, setEditSubCasteItem] = useState(null);
  const [subCasteModalInput, setSubCasteModalInput] = useState({ casteName: '', subCasteName: '' });

  const filteredSubCasteData = subCasteData.filter(item => 
    item.subCasteName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.casteName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddSubCaste = () => {
    if (!subCasteModalInput.subCasteName.trim()) return;
    const newSr = subCasteData.length > 0 ? Math.max(...subCasteData.map(p => p.sr)) + 1 : 1;
    setSubCasteData([...subCasteData, { sr: newSr, ...subCasteModalInput }]);
    setIsAddSubCasteModalOpen(false);
    setSubCasteModalInput({ casteName: '', subCasteName: '' });
  };

  const handleEditSubCaste = () => {
    if (!subCasteModalInput.subCasteName.trim() || !editSubCasteItem) return;
    setSubCasteData(subCasteData.map(p => p.sr === editSubCasteItem.sr ? { ...p, ...subCasteModalInput } : p));
    setEditSubCasteItem(null);
    setSubCasteModalInput({ casteName: '', subCasteName: '' });
  };

  const handleDeleteSubCaste = (sr) => {
    if (window.confirm("Are you sure you want to delete this sub caste?")) {
      setSubCasteData(subCasteData.filter(p => p.sr !== sr));
    }
  };

  const openEditSubCasteModal = (item) => {
    setEditSubCasteItem(item);
    setSubCasteModalInput({ casteName: item.casteName, subCasteName: item.subCasteName });
  };

  // Category
  const [categoryData, setCategoryData] = useState([
    { sr: 1, name: "Gen", isDefault: "False" },
    { sr: 2, name: "OBC", isDefault: "False" },
    { sr: 3, name: "SC", isDefault: "False" },
    { sr: 4, name: "ST", isDefault: "False" },
  ]);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [editCategoryItem, setEditCategoryItem] = useState(null);
  const [categoryModalInput, setCategoryModalInput] = useState({ name: '', isDefault: false });

  const filteredCategoryData = categoryData.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCategory = () => {
    if (!categoryModalInput.name.trim()) return;
    const newSr = categoryData.length > 0 ? Math.max(...categoryData.map(p => p.sr)) + 1 : 1;
    setCategoryData([...categoryData, { sr: newSr, name: categoryModalInput.name, isDefault: categoryModalInput.isDefault ? "True" : "False" }]);
    setIsAddCategoryModalOpen(false);
    setCategoryModalInput({ name: '', isDefault: false });
  };

  const handleEditCategory = () => {
    if (!categoryModalInput.name.trim() || !editCategoryItem) return;
    setCategoryData(categoryData.map(p => p.sr === editCategoryItem.sr ? { ...p, name: categoryModalInput.name, isDefault: categoryModalInput.isDefault ? "True" : "False" } : p));
    setEditCategoryItem(null);
    setCategoryModalInput({ name: '', isDefault: false });
  };

  const handleDeleteCategory = (sr) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategoryData(categoryData.filter(p => p.sr !== sr));
    }
  };

  const openEditCategoryModal = (item) => {
    setEditCategoryItem(item);
    setCategoryModalInput({ name: item.name, isDefault: item.isDefault === "True" });
  };

  // Parish
  const [parishData, setParishData] = useState([
    { sr: 1, parish: "St. Joseph's Church, Greater Noida", religion: "", modifyDetails: "28-May-2018" },
    { sr: 2, parish: "Testing Parish", religion: "", modifyDetails: "12-Apr-2018" },
    { sr: 3, parish: "23533@@#$", religion: "", modifyDetails: "28-May-2018" },
  ]);
  const [isAddParishModalOpen, setIsAddParishModalOpen] = useState(false);
  const [editParishItem, setEditParishItem] = useState(null);
  const [parishModalInput, setParishModalInput] = useState({ parish: '', religion: '' });

  const filteredParishData = parishData.filter(item => 
    item.parish.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddParish = () => {
    if (!parishModalInput.parish.trim()) return;
    const newSr = parishData.length > 0 ? Math.max(...parishData.map(p => p.sr)) + 1 : 1;
    setParishData([...parishData, { sr: newSr, ...parishModalInput, modifyDetails: "26-Aug-2026" }]);
    setIsAddParishModalOpen(false);
    setParishModalInput({ parish: '', religion: '' });
  };

  const handleEditParish = () => {
    if (!parishModalInput.parish.trim() || !editParishItem) return;
    setParishData(parishData.map(p => p.sr === editParishItem.sr ? { ...p, ...parishModalInput, modifyDetails: "26-Aug-2026" } : p));
    setEditParishItem(null);
    setParishModalInput({ parish: '', religion: '' });
  };

  const handleDeleteParish = (sr) => {
    if (window.confirm("Are you sure you want to delete this parish?")) {
      setParishData(parishData.filter(p => p.sr !== sr));
    }
  };

  const openEditParishModal = (item) => {
    setEditParishItem(item);
    setParishModalInput({ parish: item.parish, religion: item.religion });
  };

  // House
  const [houseData, setHouseData] = useState([
    { sr: 1, houseName: "sd", modifyDetails: "26-Aug-2026" },
  ]);
  const [isAddHouseModalOpen, setIsAddHouseModalOpen] = useState(false);
  const [editHouseItem, setEditHouseItem] = useState(null);
  const [houseModalInput, setHouseModalInput] = useState('');

  const filteredHouseData = houseData.filter(item => 
    item.houseName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddHouse = () => {
    if (!houseModalInput.trim()) return;
    const newSr = houseData.length > 0 ? Math.max(...houseData.map(p => p.sr)) + 1 : 1;
    setHouseData([...houseData, { sr: newSr, houseName: houseModalInput, modifyDetails: "26-Aug-2026" }]);
    setIsAddHouseModalOpen(false);
    setHouseModalInput('');
  };

  const handleEditHouse = () => {
    if (!houseModalInput.trim() || !editHouseItem) return;
    setHouseData(houseData.map(p => p.sr === editHouseItem.sr ? { ...p, houseName: houseModalInput, modifyDetails: "26-Aug-2026" } : p));
    setEditHouseItem(null);
    setHouseModalInput('');
  };

  const handleDeleteHouse = (sr) => {
    if (window.confirm("Are you sure you want to delete this house?")) {
      setHouseData(houseData.filter(p => p.sr !== sr));
    }
  };

  const openEditHouseModal = (item) => {
    setEditHouseItem(item);
    setHouseModalInput(item.houseName);
  };

  // Committee
  const [committeeData, setCommitteeData] = useState([]);
  const [isAddCommitteeModalOpen, setIsAddCommitteeModalOpen] = useState(false);
  const [editCommitteeItem, setEditCommitteeItem] = useState(null);
  const [committeeModalInput, setCommitteeModalInput] = useState({
    committeeType: '', designation: '', staffStudent: '', staff: '', fromDate: '', toDate: '', activeStatus: false
  });

  const filteredCommitteeData = committeeData.filter(item => 
    item.committeeType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.designation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCommittee = () => {
    if (!committeeModalInput.committeeType.trim()) return;
    const newSr = committeeData.length > 0 ? Math.max(...committeeData.map(p => p.sr)) + 1 : 1;
    setCommitteeData([...committeeData, { sr: newSr, ...committeeModalInput }]);
    setIsAddCommitteeModalOpen(false);
    setCommitteeModalInput({ committeeType: '', designation: '', staffStudent: '', staff: '', fromDate: '', toDate: '', activeStatus: false });
  };

  const handleEditCommittee = () => {
    if (!committeeModalInput.committeeType.trim() || !editCommitteeItem) return;
    setCommitteeData(committeeData.map(p => p.sr === editCommitteeItem.sr ? { ...p, ...committeeModalInput } : p));
    setEditCommitteeItem(null);
    setCommitteeModalInput({ committeeType: '', designation: '', staffStudent: '', staff: '', fromDate: '', toDate: '', activeStatus: false });
  };

  const handleDeleteCommittee = (sr) => {
    if (window.confirm("Are you sure you want to delete this committee?")) {
      setCommitteeData(committeeData.filter(p => p.sr !== sr));
    }
  };

  const openEditCommitteeModal = (item) => {
    setEditCommitteeItem(item);
    setCommitteeModalInput(item);
  };

  // --- Meeting Details State ---
  const [meetingDetailsInput, setMeetingDetailsInput] = useState({
    committeeType: '',
    meetingDate: '31-Aug-2026',
    noOfMember: 0,
    description: ''
  });

  // --- Define Club State ---
  const [clubData, setClubData] = useState([]);
  const [isAddClubModalOpen, setIsAddClubModalOpen] = useState(false);
  const [editClubItem, setEditClubItem] = useState(null);
  const [clubModalInput, setClubModalInput] = useState('');

  const filteredClubData = clubData.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddClub = () => {
    if (!clubModalInput.trim()) return;
    const newSr = clubData.length > 0 ? Math.max(...clubData.map(p => p.sr)) + 1 : 1;
    setClubData([...clubData, { sr: newSr, name: clubModalInput }]);
    setIsAddClubModalOpen(false);
    setClubModalInput('');
  };

  const handleEditClub = () => {
    if (!clubModalInput.trim() || !editClubItem) return;
    setClubData(clubData.map(p => p.sr === editClubItem.sr ? { ...p, name: clubModalInput } : p));
    setEditClubItem(null);
    setClubModalInput('');
  };

  const handleDeleteClub = (sr) => {
    if (window.confirm("Are you sure you want to delete this club?")) {
      setClubData(clubData.filter(p => p.sr !== sr));
    }
  };

  const openEditClubModal = (item) => {
    setEditClubItem(item);
    setClubModalInput(item.name);
  };

  // --- Define Stream State ---
  const [streamData, setStreamData] = useState([
    { sr: 1, name: 'Science', modifyDetails: '14-May-2016' },
    { sr: 2, name: 'Commerce', modifyDetails: '16-May-2016' },
    { sr: 3, name: 'Art', modifyDetails: '08-Aug-2017' },
    { sr: 4, name: 'Maths', modifyDetails: '28-May-2018' }
  ]);
  const [isAddStreamModalOpen, setIsAddStreamModalOpen] = useState(false);
  const [editStreamItem, setEditStreamItem] = useState(null);
  const [streamModalInput, setStreamModalInput] = useState('');

  const filteredStreamData = streamData.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddStream = () => {
    if (!streamModalInput.trim()) return;
    const newSr = streamData.length > 0 ? Math.max(...streamData.map(p => p.sr)) + 1 : 1;
    const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-');
    setStreamData([...streamData, { sr: newSr, name: streamModalInput, modifyDetails: today }]);
    setIsAddStreamModalOpen(false);
    setStreamModalInput('');
  };

  const handleEditStream = () => {
    if (!streamModalInput.trim() || !editStreamItem) return;
    const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-');
    setStreamData(streamData.map(p => p.sr === editStreamItem.sr ? { ...p, name: streamModalInput, modifyDetails: today } : p));
    setEditStreamItem(null);
    setStreamModalInput('');
  };

  const handleDeleteStream = (sr) => {
    if (window.confirm("Are you sure you want to delete this stream?")) {
      setStreamData(streamData.filter(p => p.sr !== sr));
    }
  };

  const openEditStreamModal = (item) => {
    setEditStreamItem(item);
    setStreamModalInput(item.name);
  };

  // --- Define Optional Subject ---
  const [optionalSubjectData, setOptionalSubjectData] = useState([]);
  const [isAddOptionalSubjectModalOpen, setIsAddOptionalSubjectModalOpen] = useState(false);
  const [editOptionalSubjectItem, setEditOptionalSubjectItem] = useState(null);
  const [optionalSubjectModalInput, setOptionalSubjectModalInput] = useState('');

  const handleAddOptionalSubject = () => {
    if (!optionalSubjectModalInput.trim()) return;
    const newSr = optionalSubjectData.length > 0 ? Math.max(...optionalSubjectData.map(p => p.sr)) + 1 : 1;
    setOptionalSubjectData([...optionalSubjectData, { sr: newSr, name: optionalSubjectModalInput, modifyDetails: today }]);
    setIsAddOptionalSubjectModalOpen(false);
    setOptionalSubjectModalInput('');
  };

  const handleEditOptionalSubject = () => {
    if (!optionalSubjectModalInput.trim() || !editOptionalSubjectItem) return;
    setOptionalSubjectData(optionalSubjectData.map(p => p.sr === editOptionalSubjectItem.sr ? { ...p, name: optionalSubjectModalInput, modifyDetails: today } : p));
    setEditOptionalSubjectItem(null);
    setOptionalSubjectModalInput('');
  };

  const handleDeleteOptionalSubject = (sr) => {
    if (window.confirm("Are you sure you want to delete this Optional Subject?")) {
      setOptionalSubjectData(optionalSubjectData.filter(p => p.sr !== sr));
    }
  };

  const openEditOptionalSubjectModal = (item) => {
    setEditOptionalSubjectItem(item);
    setOptionalSubjectModalInput(item.name);
  };

  // --- Parents Status ---
  const [parentsStatusData, setParentsStatusData] = useState([]);
  const [isAddParentsStatusModalOpen, setIsAddParentsStatusModalOpen] = useState(false);
  const [editParentsStatusItem, setEditParentsStatusItem] = useState(null);
  const [parentsStatusModalInput, setParentsStatusModalInput] = useState('');

  const handleAddParentsStatus = () => {
    if (!parentsStatusModalInput.trim()) return;
    const newSr = parentsStatusData.length > 0 ? Math.max(...parentsStatusData.map(p => p.sr)) + 1 : 1;
    setParentsStatusData([...parentsStatusData, { sr: newSr, name: parentsStatusModalInput }]);
    setIsAddParentsStatusModalOpen(false);
    setParentsStatusModalInput('');
  };

  const handleEditParentsStatus = () => {
    if (!parentsStatusModalInput.trim() || !editParentsStatusItem) return;
    setParentsStatusData(parentsStatusData.map(p => p.sr === editParentsStatusItem.sr ? { ...p, name: parentsStatusModalInput } : p));
    setEditParentsStatusItem(null);
    setParentsStatusModalInput('');
  };

  const handleDeleteParentsStatus = (sr) => {
    if (window.confirm("Are you sure you want to delete this Parents Status?")) {
      setParentsStatusData(parentsStatusData.filter(p => p.sr !== sr));
    }
  };

  const openEditParentsStatusModal = (item) => {
    setEditParentsStatusItem(item);
    setParentsStatusModalInput(item.name);
  };

  // --- Import Student ---
  const [importStudentData, setImportStudentData] = useState([]);
  const [importFileInput, setImportFileInput] = useState(null);

  // --- Define Classification ---
  const [classificationData, setClassificationData] = useState([
    { sr: 1, name: 'Emirates', modifyDetails: '15-May-2019' },
    { sr: 2, name: 'Arab', modifyDetails: '15-May-2019' },
    { sr: 3, name: 'Non Emirates', modifyDetails: '15-May-2019' }
  ]);
  const [isAddClassificationModalOpen, setIsAddClassificationModalOpen] = useState(false);
  const [editClassificationItem, setEditClassificationItem] = useState(null);
  const [classificationModalInput, setClassificationModalInput] = useState('');

  const handleAddClassification = () => {
    if (!classificationModalInput.trim()) return;
    const newSr = classificationData.length > 0 ? Math.max(...classificationData.map(p => p.sr)) + 1 : 1;
    setClassificationData([...classificationData, { sr: newSr, name: classificationModalInput }]);
    setIsAddClassificationModalOpen(false);
    setClassificationModalInput('');
  };

  const handleEditClassification = () => {
    if (!classificationModalInput.trim() || !editClassificationItem) return;
    setClassificationData(classificationData.map(p => p.sr === editClassificationItem.sr ? { ...p, name: classificationModalInput } : p));
    setEditClassificationItem(null);
    setClassificationModalInput('');
  };

  const handleDeleteClassification = (sr) => {
    if (window.confirm("Are you sure you want to delete this Classification?")) {
      setClassificationData(classificationData.filter(p => p.sr !== sr));
    }
  };

  const openEditClassificationModal = (item) => {
    setEditClassificationItem(item);
    setClassificationModalInput(item.name);
  };

  // --- Define Reason ---
  const [reasonData, setReasonData] = useState([
    { sr: 1, name: 'srf', modifyDetails: '31-Aug-2026' }
  ]);
  const [isAddReasonModalOpen, setIsAddReasonModalOpen] = useState(false);
  const [editReasonItem, setEditReasonItem] = useState(null);
  const [reasonModalInput, setReasonModalInput] = useState('');

  const handleAddReason = () => {
    if (!reasonModalInput.trim()) return;
    const newSr = reasonData.length > 0 ? Math.max(...reasonData.map(p => p.sr)) + 1 : 1;
    setReasonData([...reasonData, { sr: newSr, name: reasonModalInput, modifyDetails: '31-Aug-2026' }]);
    setIsAddReasonModalOpen(false);
    setReasonModalInput('');
  };

  const handleEditReason = () => {
    if (!reasonModalInput.trim() || !editReasonItem) return;
    setReasonData(reasonData.map(p => p.sr === editReasonItem.sr ? { ...p, name: reasonModalInput } : p));
    setEditReasonItem(null);
    setReasonModalInput('');
  };

  const handleDeleteReason = (sr) => {
    if (window.confirm("Are you sure you want to delete this Reason?")) {
      setReasonData(reasonData.filter(p => p.sr !== sr));
    }
  };

  const openEditReasonModal = (item) => {
    setEditReasonItem(item);
    setReasonModalInput(item.name);
  };

  // --- Define Remark ---
  const [remarkData, setRemarkData] = useState([]);
  const [isAddRemarkModalOpen, setIsAddRemarkModalOpen] = useState(false);
  const [editRemarkItem, setEditRemarkItem] = useState(null);
  const [remarkModalInput, setRemarkModalInput] = useState('');

  const handleAddRemark = () => {
    if (!remarkModalInput.trim()) return;
    const newSr = remarkData.length > 0 ? Math.max(...remarkData.map(p => p.sr)) + 1 : 1;
    setRemarkData([...remarkData, { sr: newSr, name: remarkModalInput, modifyDetails: '31-Aug-2026' }]);
    setIsAddRemarkModalOpen(false);
    setRemarkModalInput('');
  };

  const handleEditRemark = () => {
    if (!remarkModalInput.trim() || !editRemarkItem) return;
    setRemarkData(remarkData.map(p => p.sr === editRemarkItem.sr ? { ...p, name: remarkModalInput } : p));
    setEditRemarkItem(null);
    setRemarkModalInput('');
  };

  const handleDeleteRemark = (sr) => {
    if (window.confirm("Are you sure you want to delete this Remark?")) {
      setRemarkData(remarkData.filter(p => p.sr !== sr));
    }
  };

  const openEditRemarkModal = (item) => {
    setEditRemarkItem(item);
    setRemarkModalInput(item.name);
  };

  // --- Session Transfer ---
  const [sessionTransferData, setSessionTransferData] = useState([]);
  const [isAddSessionTransferModalOpen, setIsAddSessionTransferModalOpen] = useState(false);
  const [editSessionTransferItem, setEditSessionTransferItem] = useState(null);
  const [sessionTransferModalInput, setSessionTransferModalInput] = useState('');

  const handleAddSessionTransfer = () => {
    if (!sessionTransferModalInput.trim()) return;
    const newSr = sessionTransferData.length > 0 ? Math.max(...sessionTransferData.map(p => p.sr)) + 1 : 1;
    setSessionTransferData([...sessionTransferData, { sr: newSr, name: sessionTransferModalInput, modifyDetails: '31-Aug-2026' }]);
    setIsAddSessionTransferModalOpen(false);
    setSessionTransferModalInput('');
  };

  const handleEditSessionTransfer = () => {
    if (!sessionTransferModalInput.trim() || !editSessionTransferItem) return;
    setSessionTransferData(sessionTransferData.map(p => p.sr === editSessionTransferItem.sr ? { ...p, name: sessionTransferModalInput } : p));
    setEditSessionTransferItem(null);
    setSessionTransferModalInput('');
  };

  const handleDeleteSessionTransfer = (sr) => {
    if (window.confirm("Are you sure you want to delete this Session Transfer?")) {
      setSessionTransferData(sessionTransferData.filter(p => p.sr !== sr));
    }
  };

  const openEditSessionTransferModal = (item) => {
    setEditSessionTransferItem(item);
    setSessionTransferModalInput(item.name);
  };

  // --- Country Setting ---
  const [countrySetting, setCountrySetting] = useState('India');
  const [numberingSystem, setNumberingSystem] = useState('Indian System');
  const [activeSmsService, setActiveSmsService] = useState(true);
  const [activePushNotification, setActivePushNotification] = useState(false);

  // --- Global Search Option Settings ---
  const [globalSearchOptions, setGlobalSearchOptions] = useState({
    admNo: true, name: true, fName: true, mName: true, rollNo: false, parentCode: false,
    mob: false, address: false, stBarcode: false, computerNo: false, busId: false
  });
  const [globalSearchDisplay, setGlobalSearchDisplay] = useState('Show Admission No');

  // --- Change Academic Year ---
  const [changeAcademicYear, setChangeAcademicYear] = useState('2026-2027');
  const [changeFinancialYear, setChangeFinancialYear] = useState('2026-2027');
  const [changeSchool, setChangeSchool] = useState('NAVALS NATIONAL ACADEMY');

  // --- Admission Setting ---
  const [admissionSettingData, setAdmissionSettingData] = useState({
    defaultSession: '',
    defaultPaymode: '',
    amountOnFormEntry: '200.00',
    isValidateStationary: false,
    sendSmsAfterEnquiry: false,
    sendSmsAfterAdmission: false,
    sendSmsAfterProspectus: false,
    isAutoRollNo: false,
    generateTcBoardWise: false,
    fixSession: false,
    registrationProspectusNoSame: false,
    registrationProspectusReceiptNoSame: true,
    importRegistrationWithProspectus: true,
    printOutAfterProspectus: false,
    updateAdmNoFromRegistration: true,
    sendCredentialSms: false,
    sendSmsMailAfterRegistration: 'BOTH',
    defaultGender: 'Male',
    autoFillHouseInfo: false,
    checkLibraryDefaulter: false,
    checkDuplicateStudent: false,
    usernameAdmissionPasswordDob: false
  });

  // --- Enquiry No Setting ---
  const [enquiryNoSetting, setEnquiryNoSetting] = useState({
    session: '2026-2027',
    settingShouldBe: 'Automatic',
    prefix: '',
    startFrom: '1',
    leadZero: '',
    suffix: ''
  });

  // --- Master Settings Part 2 States ---
  const [prospectusRegNoSetting, setProspectusRegNoSetting] = useState({
    school: '', class: '', session: '', board: '', registrationNo: '', shouldBe: 'Automatic',
    recNoStartFrom: '1', prefix: '', startFrom: '1', leadZero: '0', suffix: ''
  });

  const [userPermissionSetting, setUserPermissionSetting] = useState({
    user: 'SF002 (AKANSHA SINGH)', school: 'NAVALS NATIONAL ACADEMY'
  });

  const [addressBloodData, setAddressBloodData] = useState([
    { id: 1, admNo: '1952', name: 'AARADHYA', father: 'NEERAJ YADAV', address: 'VILL IBF', contact: '90447183', blood: '', gender: 'Female', doj: '06-May', doa: '06-May', religion: 'HINDU' },
    { id: 2, admNo: '1601', name: 'AARAV PANDEY', father: 'AJAY PRAKASH PANDEY', address: 'VILL PU', contact: '94542895', blood: '', gender: 'Male', doj: '01-Apr', doa: '01-Apr', religion: 'HINDU' },
    { id: 3, admNo: '2493', name: 'AAYUSHI YADAV', father: 'GAGAN YADAV', address: 'VILL NA', contact: '95553944', blood: '', gender: 'Male', doj: '11-Jul', doa: '11-Jul', religion: 'HINDU' },
    { id: 4, admNo: '1682', name: 'ABHIRAJ', father: 'RAJOO KANAUJIYA', address: 'VILL AN', contact: '96708822', blood: '', gender: 'Male', doj: '26-Jun', doa: '26-Jun', religion: 'HINDU' },
    { id: 5, admNo: '1721', name: 'ADVIKA RAI', father: 'ANAND RAI', address: 'VILL AN', contact: '96169548', blood: '', gender: 'Female', doj: '01-Apr', doa: '01-Apr', religion: 'HINDU' }
  ]);

  const [receiptCertSetting, setReceiptCertSetting] = useState({
    admReceipt: 'Default Receipt', prospectusReceipt: 'Default Receipt', admEntry: 'Default Receipt',
    tcSetting: 'Default TC', casteCert: 'Certificate Type 1', bonafide: 'Default Bonafide',
    characterCert: 'Default CC', provisionalTc: 'Default', schoolLeaving: 'Default',
    anecdotal: 'Default', labelFormat: 'Default Label', birthCert: 'Default',
    affiliation: 'Default', locCert: 'Default LOC', passportApply: 'Default',
    ruralArea: 'Default', migrationCert: 'Default', migrationSetting: 'Select Class',
    examName: '', studyCert: 'Default'
  });

  const [certRefNoSetting, setCertRefNoSetting] = useState([
    { id: 1, type: 'Bonafide', prefix: '', start: '1', lead: '', suffix: '' },
    { id: 2, type: 'Character', prefix: '', start: '1', lead: '', suffix: '' },
    { id: 3, type: 'Migration', prefix: '', start: '1', lead: '', suffix: '' },
    { id: 4, type: 'Birth', prefix: '', start: '1', lead: '', suffix: '' },
    { id: 5, type: 'Affiliation', prefix: '', start: '1', lead: '', suffix: '' },
    { id: 6, type: 'LOC', prefix: '', start: '1', lead: '', suffix: '' },
    { id: 7, type: 'Passport Apply', prefix: '', start: '1', lead: '', suffix: '' },
    { id: 8, type: 'Passport Issue', prefix: '', start: '1', lead: '', suffix: '' },
    { id: 9, type: 'Rural Area', prefix: '', start: '1', lead: '', suffix: '' },
  ]);

  const [admissionFormSettings, setAdmissionFormSettings] = useState({ format: 'Format Type 1' });
  const [saralIdSetting, setSaralIdSetting] = useState(true);

  // Define Language
  const [languageData, setLanguageData] = useState([{ id: 1, name: 'Arbic', date: '28-Jun-2018' }, { id: 2, name: 'aaaaaaaaa', date: '28-Jun-2018' }, { id: 3, name: 'Punjabi', date: '18-Aug-2017' }, { id: 4, name: 'Bengali', date: '30-Nov-2016' }, { id: 5, name: 'Kannada', date: '30-Nov-2016' }, { id: 6, name: 'Tamil', date: '30-Nov-2016' }, { id: 7, name: 'Telugu', date: '28-Jun-2018' }, { id: 8, name: 'Malayalam', date: '30-Nov-2016' }, { id: 9, name: 'Marathi', date: '30-Nov-2016' }]);
  const [isAddLanguageModalOpen, setIsAddLanguageModalOpen] = useState(false);
  const [languageModalInput, setLanguageModalInput] = useState('');

  // Define TC Caste
  const [tcCasteData, setTcCasteData] = useState([{ id: 1, name: 'General', date: '08-Nov-2014' }]);
  const [isAddTcCasteModalOpen, setIsAddTcCasteModalOpen] = useState(false);
  const [tcCasteModalInput, setTcCasteModalInput] = useState('');

  // Define Extra Activity
  const [extraActivityData, setExtraActivityData] = useState([{ id: 1, name: 'w', date: '31-Aug-2026' }]);
  const [isAddExtraActivityModalOpen, setIsAddExtraActivityModalOpen] = useState(false);
  const [extraActivityModalInput, setExtraActivityModalInput] = useState('');

  // Define Character
  const [characterData, setCharacterData] = useState([{ id: 1, name: 'good', date: '16-Apr-2018' }, { id: 2, name: 'Best', date: '21-Dec-2016' }, { id: 3, name: 'Very Good', date: '28-May-2018' }]);
  const [isAddCharacterModalOpen, setIsAddCharacterModalOpen] = useState(false);
  const [characterModalInput, setCharacterModalInput] = useState('');

  // Define Promotion Master
  const [promotionMasterData, setPromotionMasterData] = useState([{ id: 1, name: 'GRANTED', date: '08-Sep-2017' }, { id: 2, name: 'Studying', date: '23-Apr-2018' }]);
  const [isAddPromotionMasterModalOpen, setIsAddPromotionMasterModalOpen] = useState(false);
  const [promotionMasterModalInput, setPromotionMasterModalInput] = useState('');

  // Define Last Result
  const [lastResultData, setLastResultData] = useState([{ id: 1, name: 'we', date: '31-Aug-2026' }]);
  const [isAddLastResultModalOpen, setIsAddLastResultModalOpen] = useState(false);
  const [lastResultModalInput, setLastResultModalInput] = useState('');

  // Term Master
  const [termMasterData, setTermMasterData] = useState([{ id: 1, name: 'we', date: '31-Aug-2026' }]);
  const [isAddTermMasterModalOpen, setIsAddTermMasterModalOpen] = useState(false);
  const [termMasterModalInput, setTermMasterModalInput] = useState('');

  // Define Moral
  const [moralData, setMoralData] = useState([{ id: 1, name: 'Good', date: '' }, { id: 2, name: 'satisfactory a', date: '' }, { id: 3, name: 'Best', date: '' }]);
  const [isAddMoralModalOpen, setIsAddMoralModalOpen] = useState(false);
  const [moralModalInput, setMoralModalInput] = useState('');

  // Define Mother Tongue
  const [motherTongueData, setMotherTongueData] = useState([{ id: 1, name: 'Hindi', date: '28-May-2018' }]);
  const [isAddMotherTongueModalOpen, setIsAddMotherTongueModalOpen] = useState(false);
  const [motherTongueModalInput, setMotherTongueModalInput] = useState('');



  const [relateClassSelection, setRelateClassSelection] = useState("NUR");
  const [relateClassSections, setRelateClassSections] = useState({
    "NUR": ["A", "B"],
  });

  const handleToggleRelateClassSection = (sectionName) => {
    const currentSections = relateClassSections[relateClassSelection] || [];
    if (currentSections.includes(sectionName)) {
      setRelateClassSections({
        ...relateClassSections,
        [relateClassSelection]: currentSections.filter(s => s !== sectionName)
      });
    } else {
      setRelateClassSections({
        ...relateClassSections,
        [relateClassSelection]: [...currentSections, sectionName]
      });
    }
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

      {/* 1. Dark Slate Single Unified Sidebar (Hover to Expand, Collapse to Icons) */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`bg-[#262f38] text-gray-200 transition-all duration-300 ease-in-out flex flex-col z-50 shrink-0 select-none shadow-md h-full ${
          isExpanded ? 'w-64' : 'w-14'
        }`}
      >
        {/* Top Header / Hamburger */}
        {isExpanded ? (
          <div className="h-12 flex items-center justify-between px-4 text-white shrink-0 border-b border-gray-700/50">
            <span className="text-base font-bold tracking-wide flex items-center gap-3">
              <FaBars className="text-lg cursor-pointer hover:text-gray-300" onClick={() => setIsPinned(!isPinned)} />
              <span>Navigation</span>
            </span>
          </div>
        ) : (
          <div 
            className="h-12 flex items-center justify-center text-white shrink-0 cursor-pointer hover:text-gray-300 transition" 
            onClick={() => setIsPinned(!isPinned)}
            title="Expand Navigation"
          >
            <FaBars className="text-xl" />
          </div>
        )}

        {/* Search Box */}
        {isExpanded ? (
          <div className="p-3 border-b border-gray-700/40">
            <div className="flex items-center border border-gray-300 rounded-md px-2.5 py-1.5 bg-white shadow-2xs">
              <FaSearch className="text-gray-400 mr-2 text-xs" />
              <input
                type="text"
                placeholder="Search Menu"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none w-full text-xs text-gray-800 placeholder-gray-400"
                autoFocus={isHovered}
              />
            </div>
          </div>
        ) : (
          <div className="p-2 flex justify-center border-b border-gray-700/30">
            <button
              onClick={() => setIsPinned(!isPinned)}
              className="w-10 h-10 flex items-center justify-center bg-white rounded-lg text-gray-500 hover:text-gray-800 shadow transition cursor-pointer"
              title="Search Menu"
            >
              <FaSearch className="text-base" />
            </button>
          </div>
        )}

        {/* Menu Items */}
        <div className={`flex-1 overflow-y-auto ${isExpanded ? 'py-2' : 'flex flex-col gap-3 py-3 items-center'}`}>
          {menuItems.map((item, i) => {
            const isTopLevelActive = item.text === activeTab || (item.children && item.children.some(child => 
              child.text === activeTab || (child.children && child.children.some(sub => sub.text === activeTab))
            ));
            return (
              <SidebarItem
                key={i}
                icon={item.icon}
                text={item.text}
                active={isTopLevelActive}
                children={item.children}
                isOpen={openTopLevelIndex === i}
                isExpanded={isExpanded}
                onToggle={() => {
                  if (!isExpanded) {
                    setIsPinned(true);
                  }
                  setOpenTopLevelIndex(openTopLevelIndex === i ? null : i);
                }}
                onItemClick={handleMenuClick}
                activeTab={activeTab}
              />
            );
          })}
        </div>

        {/* Bottom Weather / Notification Widget */}
        <div className="p-2.5 border-t border-gray-700/50 flex justify-center items-center shrink-0">
          <div className="relative cursor-pointer">
            <span className="text-xl">🌙</span>
            <span className="absolute -top-1 -right-1 bg-pink-400 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
              3
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Content Container (Header + Subheader + Dashboard) */}
      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">

        {/* Top Header */}
        <div className="h-12 bg-[#00a2db] flex items-center justify-between px-4 text-white flex-shrink-0 z-40 shadow-xs">
          <div className="flex items-center gap-3 min-w-0">
            <Link to="/dashboard" className="text-[#e53935] font-extrabold text-base tracking-wider hover:opacity-90 whitespace-nowrap shrink-0 drop-shadow-xs">
              NAVALS NATIONAL ACADEMY
            </Link>

            <div className="flex items-center gap-1.5 border border-white/40 rounded px-2.5 py-1 whitespace-nowrap shrink-0 bg-white/10">
              <FaGraduationCap className="text-base" />
              <span className="text-xs font-bold tracking-wide">Admission</span>
            </div>

            <div className="flex items-center gap-3 ml-2">
              <div className="flex items-center gap-1.5 whitespace-nowrap text-xs">
                <FaGraduationCap className="text-sm opacity-90" />
                <span>Academic Year :</span>
                <select className="bg-white/20 border border-white/40 rounded text-xs py-0.5 px-2 outline-none text-white cursor-pointer font-medium">
                  <option className="text-gray-900">2026-2027</option>
                  <option className="text-gray-900">2025-2026</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5 whitespace-nowrap text-xs">
                <FaChartPie className="text-sm opacity-90" />
                <span>Financial Year :</span>
                <select className="bg-white/20 border border-white/40 rounded text-xs py-0.5 px-2 outline-none text-white cursor-pointer font-medium">
                  <option className="text-gray-900">2026-2027</option>
                  <option className="text-gray-900">2025-2026</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 ml-3 shrink-0">
            <div className="flex gap-3 text-sm opacity-95">
              <FaQuestionCircle className="cursor-pointer hover:opacity-75" title="Help" />
              <FaInfoCircle className="cursor-pointer hover:opacity-75" title="Info" />
              <FaCog className="cursor-pointer hover:opacity-75" title="Settings" />
            </div>

            <div className="flex items-center gap-1 cursor-pointer hover:text-gray-200 whitespace-nowrap">
              <span className="text-xs font-bold">{userName}</span>
              <FaAngleDown className="text-xs" />
            </div>
          </div>
        </div>

        {/* Sub-header / Quick Access Bar */}
        <div className="h-10 bg-[#00a2db] flex items-center justify-between px-3 text-white flex-shrink-0 border-t border-white/20 z-30">
          <div className="flex items-center gap-3">
            <div className="bg-white text-[#00a2db] px-3.5 py-1 text-xs font-bold tracking-tight rounded-none shadow-2xs">
              QUICK ACCESS &gt;
            </div>
            <button className="bg-white text-[#0284c7] hover:bg-blue-50 border border-blue-200 text-xs font-semibold px-4 py-1 rounded-full shadow-2xs transition">
              UP Board TC Form
            </button>
          </div>

          <button className="bg-white text-[#00a2db] border border-blue-200 px-3.5 py-1 text-xs font-bold rounded-2xs cursor-pointer hover:bg-gray-50 flex items-center gap-1.5 shadow-2xs transition">
            <FaCog className="text-sm" /> Customize
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0 bg-[#edf2f7]">
          {/* Tab Bar (Only when multiple non-Dashboard tabs are open) */}
          {tabs.length > 1 && (
            <div className="flex items-center gap-1 bg-[#eef1f5] pt-2 px-4 border-b border-gray-200 shrink-0">
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-1.5 text-xs rounded-t-md cursor-pointer border ${
                    activeTab === tab.id
                      ? 'bg-white text-gray-700 border-gray-200 border-b-white z-10 font-bold'
                      : 'bg-[#e4e9f0] text-gray-500 border-transparent hover:bg-gray-200 border-b-gray-200 font-medium'
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

          {/* Scrollable Page Content */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col">
            {activeTab === 'Dashboard' ? (
              <Outlet />
            ) : activeTab === 'Relate Class Section' ? (
              <div className="flex flex-col flex-1 p-4">
                <div className="max-w-4xl flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700">Class</label>
                    <select 
                      className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm"
                      value={relateClassSelection}
                      onChange={(e) => setRelateClassSelection(e.target.value)}
                    >
                      {classData.map(c => (
                        <option key={c.sr} value={c.className}>{c.className}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex justify-center mt-2">
                    <button className="bg-[#4ade80] hover:bg-[#3bcf6d] text-white px-6 py-2 rounded font-medium flex items-center gap-2 text-sm">
                      <FaSave /> Save
                    </button>
                  </div>
                  <div className="mt-4 border border-gray-200 rounded">
                    <table className="w-full text-sm text-center text-gray-700">
                      <thead className="text-xs uppercase bg-white border-b">
                        <tr>
                          <th className="px-6 py-3 border-r">Select</th>
                          <th className="px-6 py-3">Section Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sectionData.map((section, idx) => (
                          <tr key={section.sr} className={idx % 2 === 0 ? "bg-white border-b" : "bg-gray-50 border-b"}>
                            <td className="px-6 py-3 border-r">
                              <input 
                                type="checkbox" 
                                className="w-4 h-4 cursor-pointer"
                                checked={(relateClassSections[relateClassSelection] || []).includes(section.sectionName)}
                                onChange={() => handleToggleRelateClassSection(section.sectionName)}
                              />
                            </td>
                            <td className="px-6 py-3">{section.sectionName}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
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
                    {!['Meeting Details', 'Import Student', 'Country Setting', 'Global Search Option Settings', 'Change Academic Year', 'Admission Setting', 'Enquiry No Setting', 'Prospectus & Registration No Setting', 'User Permission', 'Update Address and Blood', 'Receipt Certificate Setting', 'Certificate Ref No. Setting', 'Admission Form Settings', 'Saral ID Setting', 'Stationary Details', 'TC Setting', 'Image Setting', 'Report Layout Setting', 'Define Document Type', 'Enquiry', 'Enquiry FollowUp', 'Prospectus Entry', 'Admission Form Registration', 'Possible Siblings', 'Manual List Generation', 'Student Registration', 'DOB Request', 'Download Photos', 'Update Student Details', 'Set Student Status', 'Change Active/Inactive Status', 'Assign Computer No. To Student', 'Assign Roll No. To Student', 'Upload Student Document', 'Student Bank Details', 'Student Last Exam Details', 'Student Class Promotion', 'Student Class Section Transfer'].includes(activeTab) && (
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
                          else if (activeTab === 'Define Religion') { setIsAddReligionModalOpen(true); setReligionModalInput(''); }
                          else if (activeTab === 'Define Caste') { setIsAddCasteModalOpen(true); setCasteModalInput(''); }
                          else if (activeTab === 'Define Sub Caste') { setIsAddSubCasteModalOpen(true); setSubCasteModalInput({ casteName: '', subCasteName: '' }); }
                          else if (activeTab === 'Define Category') { setIsAddCategoryModalOpen(true); setCategoryModalInput({ name: '', isDefault: false }); }
                          else if (activeTab === 'Define Parish') { setIsAddParishModalOpen(true); setParishModalInput({ parish: '', religion: '' }); }
                          else if (activeTab === 'Define House') { setIsAddHouseModalOpen(true); setHouseModalInput(''); }
                          else if (activeTab === 'Define Committee') { setIsAddCommitteeModalOpen(true); setCommitteeModalInput({ committeeType: '', designation: '', staffStudent: '', staff: '', fromDate: '', toDate: '', activeStatus: false }); }
                          else if (activeTab === 'Define Club') { setIsAddClubModalOpen(true); setClubModalInput(''); }
                          else if (activeTab === 'Define Stream') { setIsAddStreamModalOpen(true); setStreamModalInput(''); }
                          else if (activeTab === 'Define Optional Subject') { setIsAddOptionalSubjectModalOpen(true); setOptionalSubjectModalInput(''); }
                          else if (activeTab === 'Parents Status') { setIsAddParentsStatusModalOpen(true); setParentsStatusModalInput(''); }
                          else if (activeTab === 'Define Classification') { setIsAddClassificationModalOpen(true); setClassificationModalInput(''); }
                          else if (activeTab === 'Define Reason') { setIsAddReasonModalOpen(true); setReasonModalInput(''); }
                          else if (activeTab === 'Define Remark') { setIsAddRemarkModalOpen(true); setRemarkModalInput(''); }
                          else if (activeTab === 'Session Transfer') { setIsAddSessionTransferModalOpen(true); setSessionTransferModalInput(''); }
                          else if (activeTab === 'Define Language') { setIsAddLanguageModalOpen(true); setLanguageModalInput(''); }
                          else if (activeTab === 'Define TC Caste') { setIsAddTcCasteModalOpen(true); setTcCasteModalInput(''); }
                          else if (activeTab === 'Define Extra Activity') { setIsAddExtraActivityModalOpen(true); setExtraActivityModalInput(''); }
                          else if (activeTab === 'Define Character') { setIsAddCharacterModalOpen(true); setCharacterModalInput(''); }
                          else if (activeTab === 'Define Promotion Master') { setIsAddPromotionMasterModalOpen(true); setPromotionMasterModalInput(''); }
                          else if (activeTab === 'Define Last Result') { setIsAddLastResultModalOpen(true); setLastResultModalInput(''); }
                          else if (activeTab === 'Term Master') { setIsAddTermMasterModalOpen(true); setTermMasterModalInput(''); }
                          else if (activeTab === 'Define Moral') { setIsAddMoralModalOpen(true); setMoralModalInput(''); }
                          else if (activeTab === 'Define Mother Tongue') { setIsAddMotherTongueModalOpen(true); setMotherTongueModalInput(''); }
                        }}
                        className="bg-[#32a3d7] text-white px-4 py-1.5 rounded flex items-center gap-2 text-sm hover:bg-[#288ebf]"
                      >
                        <span className="font-bold">+</span> Add New {activeTab === 'Define Classification' ? 'Bank' : activeTab === 'Define Optional Subject' ? 'Subject' : activeTab.replace('Define ', '')}
                      </button>
                    )}
                    {!['Meeting Details', 'Import Student', 'Country Setting', 'Global Search Option Settings', 'Change Academic Year', 'Admission Setting', 'Enquiry No Setting', 'Prospectus & Registration No Setting', 'User Permission', 'Update Address and Blood', 'Receipt Certificate Setting', 'Certificate Ref No. Setting', 'Admission Form Settings', 'Saral ID Setting', 'Stationary Details', 'TC Setting', 'Image Setting', 'Report Layout Setting', 'Define Document Type', 'Enquiry', 'Enquiry FollowUp', 'Prospectus Entry', 'Admission Form Registration', 'Possible Siblings', 'Manual List Generation', 'Student Registration', 'DOB Request', 'Download Photos', 'Update Student Details', 'Set Student Status', 'Change Active/Inactive Status', 'Assign Computer No. To Student', 'Assign Roll No. To Student', 'Upload Student Document', 'Student Bank Details', 'Student Last Exam Details', 'Student Class Promotion', 'Student Class Section Transfer'].includes(activeTab) && (
                      <button className="bg-[#32a3d7] text-white px-4 py-1.5 rounded flex items-center gap-2 text-sm hover:bg-[#288ebf]">
                        <FaFileAlt /> Export
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex-1 overflow-auto">
                  {['Meeting Details', 'Import Student', 'Country Setting', 'Global Search Option Settings', 'Change Academic Year', 'Admission Setting', 'Enquiry No Setting', 'Prospectus & Registration No Setting', 'User Permission', 'Update Address and Blood', 'Receipt Certificate Setting', 'Certificate Ref No. Setting', 'Admission Form Settings', 'Saral ID Setting', 'Stationary Details', 'TC Setting', 'Image Setting', 'Report Layout Setting', 'Define Document Type', 'Enquiry', 'Enquiry FollowUp', 'Prospectus Entry', 'Admission Form Registration', 'Possible Siblings', 'Manual List Generation', 'Student Registration', 'DOB Request', 'Download Photos', 'Update Student Details', 'Set Student Status', 'Change Active/Inactive Status', 'Assign Computer No. To Student', 'Assign Roll No. To Student', 'Upload Student Document', 'Student Bank Details', 'Student Last Exam Details', 'Student Class Promotion', 'Student Class Section Transfer'].includes(activeTab) ? (
                    activeTab === 'Meeting Details' ? (
                      <div className="max-w-4xl bg-white p-6 mt-4">
                      <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-1">
                          <label className="text-sm font-bold text-gray-700">Committee Type</label>
                          <select 
                            value={meetingDetailsInput.committeeType}
                            onChange={(e) => setMeetingDetailsInput({...meetingDetailsInput, committeeType: e.target.value})}
                            className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm bg-white" 
                          >
                            <option value="">Select Committee Type</option>
                          </select>
                        </div>
                        <div className="flex gap-4">
                          <div className="flex flex-col gap-1 w-1/2">
                            <label className="text-sm font-bold text-gray-700">Meeting Date</label>
                            <input 
                              type="date" 
                              value={meetingDetailsInput.meetingDate}
                              onChange={(e) => setMeetingDetailsInput({...meetingDetailsInput, meetingDate: e.target.value})}
                              className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" 
                            />
                          </div>
                          <div className="flex flex-col gap-1 w-1/2">
                            <label className="text-sm font-bold text-gray-700">No. Of member</label>
                            <input 
                              type="number" 
                              value={meetingDetailsInput.noOfMember}
                              onChange={(e) => setMeetingDetailsInput({...meetingDetailsInput, noOfMember: parseInt(e.target.value) || 0})}
                              className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" 
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-sm font-bold text-gray-700">Description</label>
                          <textarea 
                            value={meetingDetailsInput.description}
                            onChange={(e) => setMeetingDetailsInput({...meetingDetailsInput, description: e.target.value})}
                            className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm min-h-[100px]" 
                          ></textarea>
                        </div>
                        <div className="flex gap-4 mt-4">
                          <button className="flex items-center gap-2 border border-green-400 text-green-500 hover:bg-green-50 px-6 py-1.5 rounded text-sm transition-colors">
                            <FaSave /> Save
                          </button>
                          <button className="flex items-center gap-2 border border-[#32a3d7] text-[#32a3d7] hover:bg-blue-50 px-6 py-1.5 rounded text-sm transition-colors">
                            <FaEye /> View
                          </button>
                          <button className="flex items-center gap-2 border border-orange-300 text-orange-400 hover:bg-orange-50 px-6 py-1.5 rounded text-sm transition-colors">
                            <FaTimesCircle /> Reset
                          </button>
                        </div>
                      </div>
                    </div>
                    ) : activeTab === 'Import Student' ? (
                      <div className="bg-white p-6 mt-4 flex flex-col items-center">
                        <div className="w-full max-w-5xl bg-gray-100 p-3 mb-6 font-bold text-gray-700 rounded-sm">
                          UPLOAD DATA OPTION
                        </div>
                        <div className="flex gap-8 mb-8 text-sm">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="uploadOption" className="w-4 h-4 text-[#32a3d7] border-gray-300 focus:ring-[#32a3d7]" defaultChecked />
                            <span>Import Student Current Academicyear <a href="#" className="text-[#32a3d7] hover:underline font-medium">Click Here For Excel</a></span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="uploadOption" className="w-4 h-4 text-[#32a3d7] border-gray-300 focus:ring-[#32a3d7]" />
                            <span>Import Student Multiple Academicyear <a href="#" className="text-[#32a3d7] hover:underline font-medium">Click Here For Excel</a></span>
                          </label>
                        </div>
                        
                        <div className="text-center font-bold text-gray-800 underline mb-4">
                          STUDENT DETAILS (MAX STID : 3135)
                        </div>
                        
                        <div className="w-full max-w-4xl text-left mb-2">
                          <label className="text-sm font-bold text-gray-700">Choose excel file to upload</label>
                        </div>
                        <div className="w-full max-w-4xl flex border border-gray-300 rounded overflow-hidden mb-6">
                          <div className="flex-1 bg-white px-3 py-2 text-sm text-gray-600 flex items-center gap-2">
                            <FaFileAlt className="text-gray-400" />
                            {importFileInput ? importFileInput.name : 'No file chosen'}
                          </div>
                          <div className="flex bg-gray-200">
                            <label className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-300 cursor-pointer border-l border-r border-gray-300">
                              Change
                              <input type="file" className="hidden" onChange={(e) => setImportFileInput(e.target.files[0])} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                            </label>
                            <button 
                              className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-300 cursor-pointer"
                              onClick={() => setImportFileInput(null)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                        
                        <button className="bg-[#5bc0de] hover:bg-[#46b8da] text-white px-6 py-2 rounded text-sm flex items-center gap-2 font-medium">
                          <FaSave /> Save Student
                        </button>
                      </div>
                    ) : activeTab === 'Country Setting' ? (
                      <div className="bg-white p-6 mt-4 flex flex-col items-start w-full">
                        <div className="mb-6 w-full">
                          <label className="text-sm font-bold text-gray-700 block mb-2">Country Setting</label>
                          <select 
                            className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm"
                            value={countrySetting}
                            onChange={(e) => setCountrySetting(e.target.value)}
                          >
                            <option value="India">India</option>
                            <option value="USA">USA</option>
                            <option value="UK">UK</option>
                          </select>
                        </div>
                        
                        <div className="mb-6 w-full">
                          <h4 className="font-bold text-gray-800 text-lg mb-1">Numbering System standard</h4>
                          <p className="text-sm text-gray-500 mb-3">A numeral system is a writing system for expressing a number, that is a mathematical notation for representing numbers of a given set, using digits or other symbols in a consistent manner.</p>
                          
                          <div className="flex flex-col gap-4">
                            <label className="flex items-start gap-2 cursor-pointer">
                              <input 
                                type="radio" 
                                name="numberingSystem" 
                                value="Indian System"
                                checked={numberingSystem === 'Indian System'}
                                onChange={(e) => setNumberingSystem(e.target.value)}
                                className="mt-1 w-4 h-4 text-[#32a3d7] border-gray-300 focus:ring-[#32a3d7]" 
                              />
                              <div>
                                <span className="font-bold text-gray-700 text-sm block">Indian System</span>
                                <span className="text-sm text-gray-500">The Indian numbering system is used in the Indian subcontinent. The terms lakh (1,00,000) and crore (1,00,00,000) are used in Indian English to express large numbers.</span>
                              </div>
                            </label>
                            
                            <label className="flex items-start gap-2 cursor-pointer">
                              <input 
                                type="radio" 
                                name="numberingSystem" 
                                value="Western System"
                                checked={numberingSystem === 'Western System'}
                                onChange={(e) => setNumberingSystem(e.target.value)}
                                className="mt-1 w-4 h-4 text-[#32a3d7] border-gray-300 focus:ring-[#32a3d7]" 
                              />
                              <div>
                                <span className="text-gray-700 text-sm block">Western System</span>
                                <span className="text-sm text-gray-500">In western(International) numbering system,groups the rightmost three digits together.The terms million (1,000,000) and Billion (1,000,000,000) are used to express large numbers.</span>
                              </div>
                            </label>
                          </div>
                        </div>

                        <div className="mb-6 w-full">
                          <h4 className="font-bold text-gray-800 text-lg mb-3">Communication Standard</h4>
                          
                          <div className="flex flex-col gap-4">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-gray-700 text-sm">Active SMS Service</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input type="checkbox" className="sr-only peer" checked={activeSmsService} onChange={(e) => setActiveSmsService(e.target.checked)} />
                                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5cdb95]"></div>
                                </label>
                              </div>
                              <p className="text-sm text-gray-500 ml-1">(If you turn on this setting, only SMS will receive to parents.)</p>
                            </div>
                            
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-gray-700 text-sm">Active Push notification</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input type="checkbox" className="sr-only peer" checked={activePushNotification} onChange={(e) => setActivePushNotification(e.target.checked)} />
                                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5cdb95]"></div>
                                </label>
                              </div>
                              <p className="text-sm text-gray-500 ml-1">(If you turn on this setting, only Notification will receive to parents.)</p>
                            </div>
                            
                            <p className="text-sm text-gray-700 font-medium mt-2">Note: For Notification facility make sure that school is using E-Care Mobile Application, otherwise parent wouldn't receive any kind of notification</p>
                          </div>
                        </div>

                        <div className="w-full flex justify-center mt-2">
                          <button className="bg-[#32a3d7] hover:bg-[#288ebf] text-white px-8 py-2 rounded text-sm font-bold flex items-center gap-2 shadow">
                            <FaSync /> Update
                          </button>
                        </div>
                      </div>
                    ) : activeTab === 'Global Search Option Settings' ? (
                      <div className="bg-white p-6 mt-4 flex flex-col items-center w-full">
                        <div className="border border-gray-200 mb-6 w-full max-w-5xl rounded overflow-hidden">
                          <h4 className="font-bold text-gray-800 text-sm bg-gray-50 px-4 py-2 border-b border-gray-200">Search Options For Students</h4>
                          <div className="p-4 grid grid-cols-5 gap-4">
                            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 font-medium">
                              <input type="checkbox" checked={globalSearchOptions.admNo} onChange={(e) => setGlobalSearchOptions({...globalSearchOptions, admNo: e.target.checked})} className="w-4 h-4 text-[#32a3d7]" /> Adm.No
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 font-medium">
                              <input type="checkbox" checked={globalSearchOptions.name} onChange={(e) => setGlobalSearchOptions({...globalSearchOptions, name: e.target.checked})} className="w-4 h-4 text-[#32a3d7]" /> Name
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 font-medium">
                              <input type="checkbox" checked={globalSearchOptions.fName} onChange={(e) => setGlobalSearchOptions({...globalSearchOptions, fName: e.target.checked})} className="w-4 h-4 text-[#32a3d7]" /> F.Name
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 font-medium">
                              <input type="checkbox" checked={globalSearchOptions.mName} onChange={(e) => setGlobalSearchOptions({...globalSearchOptions, mName: e.target.checked})} className="w-4 h-4 text-[#32a3d7]" /> M.Name
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 font-medium">
                              <input type="checkbox" checked={globalSearchOptions.rollNo} onChange={(e) => setGlobalSearchOptions({...globalSearchOptions, rollNo: e.target.checked})} className="w-4 h-4 text-[#32a3d7]" /> Roll No
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 font-medium">
                              <input type="checkbox" checked={globalSearchOptions.parentCode} onChange={(e) => setGlobalSearchOptions({...globalSearchOptions, parentCode: e.target.checked})} className="w-4 h-4 text-[#32a3d7]" /> Parent Code
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 font-medium">
                              <input type="checkbox" checked={globalSearchOptions.mob} onChange={(e) => setGlobalSearchOptions({...globalSearchOptions, mob: e.target.checked})} className="w-4 h-4 text-[#32a3d7]" /> Mob.
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 font-medium">
                              <input type="checkbox" checked={globalSearchOptions.address} onChange={(e) => setGlobalSearchOptions({...globalSearchOptions, address: e.target.checked})} className="w-4 h-4 text-[#32a3d7]" /> Address
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 font-medium">
                              <input type="checkbox" checked={globalSearchOptions.stBarcode} onChange={(e) => setGlobalSearchOptions({...globalSearchOptions, stBarcode: e.target.checked})} className="w-4 h-4 text-[#32a3d7]" /> St.Barcode
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 font-medium">
                              <input type="checkbox" checked={globalSearchOptions.computerNo} onChange={(e) => setGlobalSearchOptions({...globalSearchOptions, computerNo: e.target.checked})} className="w-4 h-4 text-[#32a3d7]" /> Computer No
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 font-medium">
                              <input type="checkbox" checked={globalSearchOptions.busId} onChange={(e) => setGlobalSearchOptions({...globalSearchOptions, busId: e.target.checked})} className="w-4 h-4 text-[#32a3d7]" /> Bus Id
                            </label>
                          </div>
                        </div>
                        <div className="border border-gray-200 mb-6 w-full max-w-5xl rounded overflow-hidden">
                          <h4 className="font-bold text-gray-800 text-sm bg-gray-50 px-4 py-2 border-b border-gray-200">Display On Report</h4>
                          <div className="p-4 flex gap-8">
                            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 font-medium">
                              <input type="radio" name="globalSearchDisplay" value="Show Admission No" checked={globalSearchDisplay === 'Show Admission No'} onChange={(e) => setGlobalSearchDisplay(e.target.value)} className="w-4 h-4 text-[#32a3d7]" /> Show Admission No
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 font-medium">
                              <input type="radio" name="globalSearchDisplay" value="Show Bill" checked={globalSearchDisplay === 'Show Bill'} onChange={(e) => setGlobalSearchDisplay(e.target.value)} className="w-4 h-4 text-[#32a3d7]" /> Show Bill
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 font-medium">
                              <input type="radio" name="globalSearchDisplay" value="Show Bus ID" checked={globalSearchDisplay === 'Show Bus ID'} onChange={(e) => setGlobalSearchDisplay(e.target.value)} className="w-4 h-4 text-[#32a3d7]" /> Show Bus ID
                            </label>
                          </div>
                        </div>
                        <div className="w-full max-w-5xl flex justify-center mt-2">
                          <button className="bg-[#32a3d7] hover:bg-[#288ebf] text-white px-8 py-2 rounded text-sm font-bold shadow">
                            <FaSync className="inline mr-2" /> Set Globally
                          </button>
                        </div>
                      </div>
                    ) : activeTab === 'Change Academic Year' ? (
                      <div className="bg-white p-6 mt-4 flex flex-col items-center w-full">
                        <div className="flex flex-col gap-6 w-full max-w-4xl">
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Academic Year</label>
                            <select value={changeAcademicYear} onChange={(e) => setChangeAcademicYear(e.target.value)} className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm">
                              <option value="2026-2027">2026-2027</option>
                            </select>
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Financial Year</label>
                            <select value={changeFinancialYear} onChange={(e) => setChangeFinancialYear(e.target.value)} className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm">
                              <option value="2026-2027">2026-2027</option>
                            </select>
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">School</label>
                            <select value={changeSchool} onChange={(e) => setChangeSchool(e.target.value)} className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm">
                              <option value="NAVALS NATIONAL ACADEMY">NAVALS NATIONAL ACADEMY</option>
                            </select>
                          </div>
                          <div className="flex justify-center mt-4">
                            <button className="bg-[#32a3d7] hover:bg-[#288ebf] text-white px-8 py-2 rounded text-sm font-bold shadow">
                              <FaSync className="inline mr-2" /> Change
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : activeTab === 'Admission Setting' ? (
                      <div className="bg-white p-6 mt-4 flex flex-col items-center w-full">
                        <div className="w-full max-w-5xl border border-gray-200 rounded overflow-hidden">
                          <div className="border-b border-gray-200 bg-gray-50 p-3 w-full font-bold text-gray-700 text-sm mb-6">
                            Admission default setting <FaInfoCircle className="inline text-gray-400" />
                          </div>
                          <div className="px-6 flex gap-8 mb-8 w-full">
                            <div className="flex flex-col gap-1">
                              <label className="text-sm font-bold text-gray-700">Default Session</label>
                              <select value={admissionSettingData.defaultSession} onChange={(e) => setAdmissionSettingData({...admissionSettingData, defaultSession: e.target.value})} className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] text-sm w-48">
                                <option value="">Select Session</option>
                              </select>
                            </div>
                            <div className="flex flex-col gap-1">
                              <label className="text-sm font-bold text-gray-700">Default Paymode</label>
                              <select value={admissionSettingData.defaultPaymode} onChange={(e) => setAdmissionSettingData({...admissionSettingData, defaultPaymode: e.target.value})} className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] text-sm w-48">
                                <option value="">Select Paymode</option>
                              </select>
                            </div>
                            <div className="flex flex-col gap-1">
                              <label className="text-sm font-bold text-gray-700">Amount on Form Entry</label>
                              <input type="text" value={admissionSettingData.amountOnFormEntry} onChange={(e) => setAdmissionSettingData({...admissionSettingData, amountOnFormEntry: e.target.value})} className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] text-sm w-48" />
                            </div>
                          </div>
                          <div className="px-6 pb-6 grid grid-cols-3 gap-y-8 gap-x-8 w-full">
                            <div className="flex flex-col gap-2">
                              <label className="text-sm font-bold text-gray-700 flex items-center gap-1">Is validate stationary on prospectus entry <FaInfoCircle className="text-gray-400" /></label>
                              <div className={`w-12 h-6 rounded-full cursor-pointer p-1 transition-colors ${admissionSettingData.isValidateStationary ? 'bg-[#5cdb95]' : 'bg-gray-300'}`} onClick={() => setAdmissionSettingData({...admissionSettingData, isValidateStationary: !admissionSettingData.isValidateStationary})}>
                                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${admissionSettingData.isValidateStationary ? 'translate-x-6' : ''}`}></div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <label className="text-sm font-bold text-gray-700 flex items-center gap-1">Send SMS after enquiry <FaInfoCircle className="text-gray-400" /></label>
                              <div className={`w-12 h-6 rounded-full cursor-pointer p-1 transition-colors ${admissionSettingData.sendSmsAfterEnquiry ? 'bg-[#5cdb95]' : 'bg-gray-300'}`} onClick={() => setAdmissionSettingData({...admissionSettingData, sendSmsAfterEnquiry: !admissionSettingData.sendSmsAfterEnquiry})}>
                                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${admissionSettingData.sendSmsAfterEnquiry ? 'translate-x-6' : ''}`}></div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <label className="text-sm font-bold text-gray-700 flex items-center gap-1">Send SMS after Admission Form Registration <FaInfoCircle className="text-gray-400" /></label>
                              <div className={`w-12 h-6 rounded-full cursor-pointer p-1 transition-colors ${admissionSettingData.sendSmsAfterAdmission ? 'bg-[#5cdb95]' : 'bg-gray-300'}`} onClick={() => setAdmissionSettingData({...admissionSettingData, sendSmsAfterAdmission: !admissionSettingData.sendSmsAfterAdmission})}>
                                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${admissionSettingData.sendSmsAfterAdmission ? 'translate-x-6' : ''}`}></div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <label className="text-sm font-bold text-gray-700 flex items-center gap-1">Send SMS after Prospectus <FaInfoCircle className="text-gray-400" /></label>
                              <div className={`w-12 h-6 rounded-full cursor-pointer p-1 transition-colors ${admissionSettingData.sendSmsAfterProspectus ? 'bg-[#5cdb95]' : 'bg-gray-300'}`} onClick={() => setAdmissionSettingData({...admissionSettingData, sendSmsAfterProspectus: !admissionSettingData.sendSmsAfterProspectus})}>
                                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${admissionSettingData.sendSmsAfterProspectus ? 'translate-x-6' : ''}`}></div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <label className="text-sm font-bold text-gray-700 flex items-center gap-1">Is Auto Roll No <FaInfoCircle className="text-gray-400" /></label>
                              <div className={`w-12 h-6 rounded-full cursor-pointer p-1 transition-colors ${admissionSettingData.isAutoRollNo ? 'bg-[#5cdb95]' : 'bg-gray-300'}`} onClick={() => setAdmissionSettingData({...admissionSettingData, isAutoRollNo: !admissionSettingData.isAutoRollNo})}>
                                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${admissionSettingData.isAutoRollNo ? 'translate-x-6' : ''}`}></div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <label className="text-sm font-bold text-gray-700 flex items-center gap-1">Generate TC Board Wise <FaInfoCircle className="text-gray-400" /></label>
                              <div className={`w-12 h-6 rounded-full cursor-pointer p-1 transition-colors ${admissionSettingData.generateTcBoardWise ? 'bg-[#5cdb95]' : 'bg-gray-300'}`} onClick={() => setAdmissionSettingData({...admissionSettingData, generateTcBoardWise: !admissionSettingData.generateTcBoardWise})}>
                                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${admissionSettingData.generateTcBoardWise ? 'translate-x-6' : ''}`}></div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <label className="text-sm font-bold text-gray-700 flex items-center gap-1">Are you want to fix session? <FaInfoCircle className="text-gray-400" /></label>
                              <div className={`w-12 h-6 rounded-full cursor-pointer p-1 transition-colors ${admissionSettingData.fixSession ? 'bg-[#5cdb95]' : 'bg-gray-300'}`} onClick={() => setAdmissionSettingData({...admissionSettingData, fixSession: !admissionSettingData.fixSession})}>
                                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${admissionSettingData.fixSession ? 'translate-x-6' : ''}`}></div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <label className="text-sm font-bold text-gray-700 flex items-center gap-1">Registration and prospectus no same <FaInfoCircle className="text-gray-400" /></label>
                              <div className={`w-12 h-6 rounded-full cursor-pointer p-1 transition-colors ${admissionSettingData.registrationProspectusNoSame ? 'bg-[#5cdb95]' : 'bg-gray-300'}`} onClick={() => setAdmissionSettingData({...admissionSettingData, registrationProspectusNoSame: !admissionSettingData.registrationProspectusNoSame})}>
                                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${admissionSettingData.registrationProspectusNoSame ? 'translate-x-6' : ''}`}></div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <label className="text-sm font-bold text-gray-700 flex items-center gap-1">Registration and prospectus receipt no same <FaInfoCircle className="text-gray-400" /></label>
                              <div className={`w-12 h-6 rounded-full cursor-pointer p-1 transition-colors ${admissionSettingData.registrationProspectusReceiptNoSame ? 'bg-[#5cdb95]' : 'bg-gray-300'}`} onClick={() => setAdmissionSettingData({...admissionSettingData, registrationProspectusReceiptNoSame: !admissionSettingData.registrationProspectusReceiptNoSame})}>
                                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${admissionSettingData.registrationProspectusReceiptNoSame ? 'translate-x-6' : ''}`}></div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <label className="text-sm font-bold text-gray-700 flex items-center gap-1">Import registration with prospectus? <FaInfoCircle className="text-gray-400" /></label>
                              <div className={`w-12 h-6 rounded-full cursor-pointer p-1 transition-colors ${admissionSettingData.importRegistrationWithProspectus ? 'bg-[#5cdb95]' : 'bg-gray-300'}`} onClick={() => setAdmissionSettingData({...admissionSettingData, importRegistrationWithProspectus: !admissionSettingData.importRegistrationWithProspectus})}>
                                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${admissionSettingData.importRegistrationWithProspectus ? 'translate-x-6' : ''}`}></div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <label className="text-sm font-bold text-gray-700 flex items-center gap-1">Are you want print out after prospectus entry? <FaInfoCircle className="text-gray-400" /></label>
                              <div className={`w-12 h-6 rounded-full cursor-pointer p-1 transition-colors ${admissionSettingData.printOutAfterProspectus ? 'bg-[#5cdb95]' : 'bg-gray-300'}`} onClick={() => setAdmissionSettingData({...admissionSettingData, printOutAfterProspectus: !admissionSettingData.printOutAfterProspectus})}>
                                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${admissionSettingData.printOutAfterProspectus ? 'translate-x-6' : ''}`}></div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <label className="text-sm font-bold text-gray-700 flex items-center gap-1">Are you want update Adm No. from registration? <FaInfoCircle className="text-gray-400" /></label>
                              <div className={`w-12 h-6 rounded-full cursor-pointer p-1 transition-colors ${admissionSettingData.updateAdmNoFromRegistration ? 'bg-[#5cdb95]' : 'bg-gray-300'}`} onClick={() => setAdmissionSettingData({...admissionSettingData, updateAdmNoFromRegistration: !admissionSettingData.updateAdmNoFromRegistration})}>
                                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${admissionSettingData.updateAdmNoFromRegistration ? 'translate-x-6' : ''}`}></div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <label className="text-sm font-bold text-gray-700 flex items-center gap-1">Send Credential SMS after Student registration <FaInfoCircle className="text-gray-400" /></label>
                              <div className={`w-12 h-6 rounded-full cursor-pointer p-1 transition-colors ${admissionSettingData.sendCredentialSms ? 'bg-[#5cdb95]' : 'bg-gray-300'}`} onClick={() => setAdmissionSettingData({...admissionSettingData, sendCredentialSms: !admissionSettingData.sendCredentialSms})}>
                                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${admissionSettingData.sendCredentialSms ? 'translate-x-6' : ''}`}></div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <label className="text-sm font-bold text-gray-700 flex items-center gap-1">Send SMS/MAIL after Student registration <FaInfoCircle className="text-gray-400" /></label>
                              <select value={admissionSettingData.sendSmsMailAfterRegistration} onChange={(e) => setAdmissionSettingData({...admissionSettingData, sendSmsMailAfterRegistration: e.target.value})} className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] text-sm w-32 mt-1">
                                <option value="BOTH">BOTH</option>
                                <option value="SMS">SMS</option>
                                <option value="MAIL">MAIL</option>
                              </select>
                            </div>
                            <div className="flex flex-col gap-2">
                              <label className="text-sm font-bold text-gray-700 flex items-center gap-1">By default Gender <FaInfoCircle className="text-gray-400" /></label>
                              <div className="flex gap-4 mt-2">
                                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                                  <input type="radio" name="defaultGender" value="Male" checked={admissionSettingData.defaultGender === 'Male'} onChange={(e) => setAdmissionSettingData({...admissionSettingData, defaultGender: e.target.value})} className="w-4 h-4 text-[#32a3d7]" /> Male
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                                  <input type="radio" name="defaultGender" value="Female" checked={admissionSettingData.defaultGender === 'Female'} onChange={(e) => setAdmissionSettingData({...admissionSettingData, defaultGender: e.target.value})} className="w-4 h-4 text-[#32a3d7]" /> Female
                                </label>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <label className="text-sm font-bold text-gray-700 flex items-center gap-1">Auto-Fill Student House Information <FaInfoCircle className="text-gray-400" /></label>
                              <div className={`w-12 h-6 rounded-full cursor-pointer p-1 transition-colors ${admissionSettingData.autoFillHouseInfo ? 'bg-[#5cdb95]' : 'bg-gray-300'}`} onClick={() => setAdmissionSettingData({...admissionSettingData, autoFillHouseInfo: !admissionSettingData.autoFillHouseInfo})}>
                                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${admissionSettingData.autoFillHouseInfo ? 'translate-x-6' : ''}`}></div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <label className="text-sm font-bold text-gray-700 flex items-center gap-1">Check Library Book Defaulter for Inactive Student <FaInfoCircle className="text-gray-400" /></label>
                              <div className={`w-12 h-6 rounded-full cursor-pointer p-1 transition-colors ${admissionSettingData.checkLibraryDefaulter ? 'bg-[#5cdb95]' : 'bg-gray-300'}`} onClick={() => setAdmissionSettingData({...admissionSettingData, checkLibraryDefaulter: !admissionSettingData.checkLibraryDefaulter})}>
                                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${admissionSettingData.checkLibraryDefaulter ? 'translate-x-6' : ''}`}></div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <label className="text-sm font-bold text-gray-700 flex items-center gap-1">Are you want to Check Duplicate Student On Registration <FaInfoCircle className="text-gray-400" /></label>
                              <div className={`w-12 h-6 rounded-full cursor-pointer p-1 transition-colors ${admissionSettingData.checkDuplicateStudent ? 'bg-[#5cdb95]' : 'bg-gray-300'}`} onClick={() => setAdmissionSettingData({...admissionSettingData, checkDuplicateStudent: !admissionSettingData.checkDuplicateStudent})}>
                                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${admissionSettingData.checkDuplicateStudent ? 'translate-x-6' : ''}`}></div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <label className="text-sm font-bold text-gray-700 flex items-center gap-1">Username as Admission No. & Password as Student DOB <FaInfoCircle className="text-gray-400" /></label>
                              <div className={`w-12 h-6 rounded-full cursor-pointer p-1 transition-colors ${admissionSettingData.usernameAdmissionPasswordDob ? 'bg-[#5cdb95]' : 'bg-gray-300'}`} onClick={() => setAdmissionSettingData({...admissionSettingData, usernameAdmissionPasswordDob: !admissionSettingData.usernameAdmissionPasswordDob})}>
                                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${admissionSettingData.usernameAdmissionPasswordDob ? 'translate-x-6' : ''}`}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : activeTab === 'Enquiry No Setting' ? (
                      <div className="bg-white p-6 mt-4 flex flex-col items-center w-full">
                        <div className="w-full max-w-4xl p-6">
                          <div className="grid grid-cols-2 gap-x-12 gap-y-6 w-full">
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-sm font-bold text-gray-700">Session</label>
                              <select value={enquiryNoSetting.session} onChange={(e) => setEnquiryNoSetting({...enquiryNoSetting, session: e.target.value})} className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm">
                                <option value="2026-2027">2026-2027</option>
                              </select>
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-sm font-bold text-gray-700">Enquiry No. setting should be</label>
                              <div className="flex gap-4 mt-2">
                                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                                  <input type="radio" name="settingShouldBe" value="Automatic" checked={enquiryNoSetting.settingShouldBe === 'Automatic'} onChange={(e) => setEnquiryNoSetting({...enquiryNoSetting, settingShouldBe: e.target.value})} className="w-4 h-4 text-[#32a3d7]" /> Automatic
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                                  <input type="radio" name="settingShouldBe" value="Manual" checked={enquiryNoSetting.settingShouldBe === 'Manual'} onChange={(e) => setEnquiryNoSetting({...enquiryNoSetting, settingShouldBe: e.target.value})} className="w-4 h-4 text-[#32a3d7]" /> Manual
                                </label>
                              </div>
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-sm font-bold text-gray-700">Prefix</label>
                              <input type="text" value={enquiryNoSetting.prefix} onChange={(e) => setEnquiryNoSetting({...enquiryNoSetting, prefix: e.target.value})} className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-sm font-bold text-gray-700">Start From</label>
                              <input type="text" value={enquiryNoSetting.startFrom} onChange={(e) => setEnquiryNoSetting({...enquiryNoSetting, startFrom: e.target.value})} className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-sm font-bold text-gray-700">Lead Zero</label>
                              <input type="text" value={enquiryNoSetting.leadZero} onChange={(e) => setEnquiryNoSetting({...enquiryNoSetting, leadZero: e.target.value})} className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-sm font-bold text-gray-700">Suffix</label>
                              <input type="text" value={enquiryNoSetting.suffix} onChange={(e) => setEnquiryNoSetting({...enquiryNoSetting, suffix: e.target.value})} className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" />
                            </div>
                          </div>
                          <div className="flex justify-center mt-12 w-full">
                            <button className="bg-[#5cdb95] hover:bg-[#48c981] text-white px-8 py-2 rounded text-sm font-bold flex items-center gap-2 shadow">
                              <FaSave /> Save
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : activeTab === 'Prospectus & Registration No Setting' ? (
                      <>
                        <div className="bg-white mt-4 flex flex-col items-center w-full rounded shadow-sm border border-gray-200">
                          <div className="w-full">
                            
                            {/* Row 1 */}
                            <div className="p-5 grid grid-cols-4 gap-6 border-b border-gray-100">
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-[13px] font-bold text-gray-700">School</label>
                                <select value={prospectusRegNoSetting.school} onChange={(e) => setProspectusRegNoSetting({...prospectusRegNoSetting, school: e.target.value})} className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                  <option value="">Select School</option>
                                </select>
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-[13px] font-bold text-gray-700">Class</label>
                                <select value={prospectusRegNoSetting.class} onChange={(e) => setProspectusRegNoSetting({...prospectusRegNoSetting, class: e.target.value})} className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                  <option value="All Class">All Class</option>
                                </select>
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-[13px] font-bold text-gray-700">Session</label>
                                <select value={prospectusRegNoSetting.session} onChange={(e) => setProspectusRegNoSetting({...prospectusRegNoSetting, session: e.target.value})} className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                  <option value="">Select</option>
                                </select>
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-[13px] font-bold text-gray-700">Board</label>
                                <select value={prospectusRegNoSetting.board} onChange={(e) => setProspectusRegNoSetting({...prospectusRegNoSetting, board: e.target.value})} className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                  <option value="All Board">All Board</option>
                                </select>
                              </div>
                            </div>
                            
                            {/* Row 2 */}
                            <div className="p-5 grid grid-cols-3 gap-6 border-b border-gray-100 items-end">
                              <div className="flex flex-col w-full">
                                <select value={prospectusRegNoSetting.registrationNo} onChange={(e) => setProspectusRegNoSetting({...prospectusRegNoSetting, registrationNo: e.target.value})} className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                  <option value="Registration No.">Registration No.</option>
                                </select>
                              </div>
                              <div className="flex flex-col gap-1 w-full items-center">
                                <label className="text-[13px] font-bold text-gray-700">Should be</label>
                                <div className="flex gap-4 mt-1">
                                  <label className="flex items-center gap-1.5 cursor-pointer text-sm text-gray-700">
                                    <input type="radio" name="prospectusShouldBe" value="Automatic" checked={prospectusRegNoSetting.shouldBe === 'Automatic'} onChange={(e) => setProspectusRegNoSetting({...prospectusRegNoSetting, shouldBe: e.target.value})} className="w-3.5 h-3.5 text-[#32a3d7]" /> Automatic
                                  </label>
                                  <label className="flex items-center gap-1.5 cursor-pointer text-sm text-gray-700">
                                    <input type="radio" name="prospectusShouldBe" value="Manual" checked={prospectusRegNoSetting.shouldBe === 'Manual'} onChange={(e) => setProspectusRegNoSetting({...prospectusRegNoSetting, shouldBe: e.target.value})} className="w-3.5 h-3.5 text-[#32a3d7]" /> Manual
                                  </label>
                                </div>
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-[13px] font-bold text-gray-700">Rec. No. Start From (School Wise)</label>
                                <input type="text" value={prospectusRegNoSetting.recNoStartFrom} onChange={(e) => setProspectusRegNoSetting({...prospectusRegNoSetting, recNoStartFrom: e.target.value})} className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                            </div>

                            {/* Row 3 */}
                            <div className="p-5 grid grid-cols-4 gap-6">
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-[13px] font-bold text-gray-700">Prefix</label>
                                <input type="text" value={prospectusRegNoSetting.prefix} onChange={(e) => setProspectusRegNoSetting({...prospectusRegNoSetting, prefix: e.target.value})} className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-[13px] font-bold text-gray-700">Start From</label>
                                <input type="text" value={prospectusRegNoSetting.startFrom} onChange={(e) => setProspectusRegNoSetting({...prospectusRegNoSetting, startFrom: e.target.value})} className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-[13px] font-bold text-gray-700">Lead Zero</label>
                                <input type="text" value={prospectusRegNoSetting.leadZero} onChange={(e) => setProspectusRegNoSetting({...prospectusRegNoSetting, leadZero: e.target.value})} className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-[13px] font-bold text-gray-700">Suffix</label>
                                <input type="text" value={prospectusRegNoSetting.suffix} onChange={(e) => setProspectusRegNoSetting({...prospectusRegNoSetting, suffix: e.target.value})} className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-center mt-6 mb-6 gap-3 w-full">
                          <button className="border border-[#5cdb95] text-[#5cdb95] hover:bg-green-50 px-6 py-1.5 rounded text-sm flex items-center gap-2">
                            <FaSave /> Save
                          </button>
                          <button className="border border-[#32a3d7] text-[#32a3d7] hover:bg-blue-50 px-6 py-1.5 rounded text-sm flex items-center gap-2">
                            <FaEye /> View
                          </button>
                          <button className="border border-[#32a3d7] text-[#32a3d7] hover:bg-blue-50 px-6 py-1.5 rounded text-sm flex items-center gap-2">
                            <FaPrint /> Print
                          </button>
                          <button className="border border-orange-400 text-orange-400 hover:bg-orange-50 px-6 py-1.5 rounded text-sm flex items-center gap-2">
                            <FaTimesCircle /> Reset
                          </button>
                        </div>
                      </>
                    ) : activeTab === 'User Permission' ? (
                      <div className="bg-white p-6 mt-4 flex flex-col items-center w-full min-h-[400px]">
                        <div className="w-full max-w-2xl mt-8">
                          <div className="flex gap-8 w-full justify-center">
                            <div className="flex flex-col gap-1 w-64">
                              <label className="text-sm font-bold text-gray-700">Select User</label>
                              <select value={userPermissionSetting.user} onChange={(e) => setUserPermissionSetting({...userPermissionSetting, user: e.target.value})} className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm">
                                <option value="SF002 (AKANSHA SINGH)">SF002 (AKANSHA SINGH)</option>
                              </select>
                            </div>
                            <div className="flex flex-col gap-1 w-64">
                              <label className="text-sm font-bold text-gray-700">Select School</label>
                              <select value={userPermissionSetting.school} onChange={(e) => setUserPermissionSetting({...userPermissionSetting, school: e.target.value})} className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm">
                                <option value="NAVALS NATIONAL ACADEMY">NAVALS NATIONAL ACADEMY</option>
                              </select>
                            </div>
                          </div>
                          <div className="flex justify-center mt-12 w-full">
                            <button className="bg-[#32a3d7] hover:bg-[#288ebf] text-white px-8 py-2 rounded text-sm font-bold flex items-center gap-2 shadow">
                              <FaSync /> Update
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : activeTab === 'Update Address and Blood' ? (
                      <div className="bg-white p-6 mt-4 flex flex-col items-center w-full">
                        <div className="w-full">
                          <div className="flex gap-8 mb-8">
                            <div className="flex flex-col gap-1 w-64">
                              <label className="text-sm font-bold text-gray-700">Class</label>
                              <select className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm">
                                <option>LKG</option>
                              </select>
                            </div>
                            <div className="flex flex-col gap-1 w-64">
                              <label className="text-sm font-bold text-gray-700">Section</label>
                              <select className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm">
                                <option>All Section</option>
                              </select>
                            </div>
                          </div>
                          <div className="flex justify-center mb-8">
                            <button className="bg-[#32a3d7] hover:bg-[#288ebf] text-white px-8 py-2 rounded text-sm font-bold flex items-center gap-2 shadow">
                              <FaSync /> Update
                            </button>
                          </div>
                          
                          <h4 className="font-bold text-gray-800 text-lg mb-4 uppercase">Student List</h4>
                          
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left border-collapse">
                              <thead className="text-xs text-gray-700 font-bold border-b-2 border-gray-200">
                                <tr>
                                  <th className="px-2 py-3">Sr. No.</th>
                                  <th className="px-2 py-3">Adm. No.</th>
                                  <th className="px-2 py-3">Student Name</th>
                                  <th className="px-2 py-3">Father Name</th>
                                  <th className="px-2 py-3 w-32">Student Address</th>
                                  <th className="px-2 py-3">ContactNo</th>
                                  <th className="px-2 py-3">Blood Group</th>
                                  <th className="px-2 py-3">Admission No.</th>
                                  <th className="px-2 py-3">Gender</th>
                                  <th className="px-2 py-3">DOJ</th>
                                  <th className="px-2 py-3">DOA</th>
                                  <th className="px-2 py-3">Religion</th>
                                </tr>
                              </thead>
                              <tbody>
                                {addressBloodData.map((item) => (
                                  <tr key={item.id} className="border-b border-gray-200">
                                    <td className="px-2 py-2">{item.id}</td>
                                    <td className="px-2 py-2">{item.admNo}</td>
                                    <td className="px-2 py-2">{item.name}</td>
                                    <td className="px-2 py-2">{item.father}</td>
                                    <td className="px-2 py-2"><input type="text" defaultValue={item.address} className="border border-gray-300 rounded px-2 py-1 w-full text-xs" /></td>
                                    <td className="px-2 py-2"><input type="text" defaultValue={item.contact} className="border border-gray-300 rounded px-2 py-1 w-24 text-xs" /></td>
                                    <td className="px-2 py-2">
                                      <select className="border border-gray-300 rounded px-1 py-1 text-xs">
                                        <option>Select</option>
                                      </select>
                                    </td>
                                    <td className="px-2 py-2"><input type="text" defaultValue={item.admNo} className="border border-gray-300 rounded px-2 py-1 w-16 text-xs" /></td>
                                    <td className="px-2 py-2">
                                      <select defaultValue={item.gender} className="border border-gray-300 rounded px-1 py-1 text-xs">
                                        <option>Male</option>
                                        <option>Female</option>
                                      </select>
                                    </td>
                                    <td className="px-2 py-2">{item.doj}</td>
                                    <td className="px-2 py-2">{item.doa}</td>
                                    <td className="px-2 py-2">
                                      <select defaultValue={item.religion} className="border border-gray-300 rounded px-1 py-1 text-xs">
                                        <option>HINDU</option>
                                        <option>MUSLIM</option>
                                      </select>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    ) : activeTab === 'Receipt Certificate Setting' ? (
                      <div className="bg-white p-6 mt-4 flex flex-col items-center w-full">
                        <div className="w-full grid grid-cols-4 gap-x-8 gap-y-6">
                          
                          {/* Col 1 */}
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Admission Receipt settings</label>
                            <select value={receiptCertSetting.admReceipt} onChange={(e) => setReceiptCertSetting({...receiptCertSetting, admReceipt: e.target.value})} className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm">
                              <option>Default Receipt</option>
                            </select>
                            <button className="bg-[#32a3d7] text-white px-4 py-1.5 rounded text-xs font-bold shadow w-fit flex items-center gap-1 mt-1"><FaEye /> VIEW</button>
                          </div>
                          {/* Col 2 */}
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Bonafide settings</label>
                            <select value={receiptCertSetting.bonafide} onChange={(e) => setReceiptCertSetting({...receiptCertSetting, bonafide: e.target.value})} className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm">
                              <option>Default Bonafide</option>
                            </select>
                            <button className="bg-[#32a3d7] text-white px-4 py-1.5 rounded text-xs font-bold shadow w-fit flex items-center gap-1 mt-1"><FaEye /> VIEW</button>
                          </div>
                          {/* Col 3 */}
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Label Format Setting</label>
                            <select value={receiptCertSetting.labelFormat} onChange={(e) => setReceiptCertSetting({...receiptCertSetting, labelFormat: e.target.value})} className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm">
                              <option>Default Label</option>
                            </select>
                            <button className="bg-[#32a3d7] text-white px-4 py-1.5 rounded text-xs font-bold shadow w-fit flex items-center gap-1 mt-1"><FaEye /> VIEW</button>
                          </div>
                          {/* Col 4 */}
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Rural Area Certificate</label>
                            <select value={receiptCertSetting.ruralArea} onChange={(e) => setReceiptCertSetting({...receiptCertSetting, ruralArea: e.target.value})} className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm">
                              <option>Default</option>
                            </select>
                            <button className="bg-[#32a3d7] text-white px-4 py-1.5 rounded text-xs font-bold shadow w-fit flex items-center gap-1 mt-1"><FaEye /> VIEW</button>
                          </div>

                          {/* Row 2 */}
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Prospectus Receipt settings</label>
                            <select value={receiptCertSetting.prospectusReceipt} onChange={(e) => setReceiptCertSetting({...receiptCertSetting, prospectusReceipt: e.target.value})} className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm">
                              <option>Default Receipt</option>
                            </select>
                            <button className="bg-[#32a3d7] text-white px-4 py-1.5 rounded text-xs font-bold shadow w-fit flex items-center gap-1 mt-1"><FaEye /> VIEW</button>
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Character Certificate setting</label>
                            <select value={receiptCertSetting.characterCert} onChange={(e) => setReceiptCertSetting({...receiptCertSetting, characterCert: e.target.value})} className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm">
                              <option>Default CC</option>
                            </select>
                            <button className="bg-[#32a3d7] text-white px-4 py-1.5 rounded text-xs font-bold shadow w-fit flex items-center gap-1 mt-1"><FaEye /> VIEW</button>
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Birth Certificate</label>
                            <select value={receiptCertSetting.birthCert} onChange={(e) => setReceiptCertSetting({...receiptCertSetting, birthCert: e.target.value})} className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm">
                              <option>Default</option>
                            </select>
                            <button className="bg-[#32a3d7] text-white px-4 py-1.5 rounded text-xs font-bold shadow w-fit flex items-center gap-1 mt-1"><FaEye /> VIEW</button>
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Migration Certificate</label>
                            <select value={receiptCertSetting.migrationCert} onChange={(e) => setReceiptCertSetting({...receiptCertSetting, migrationCert: e.target.value})} className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm">
                              <option>Default</option>
                            </select>
                            <button className="bg-[#32a3d7] text-white px-4 py-1.5 rounded text-xs font-bold shadow w-fit flex items-center gap-1 mt-1"><FaEye /> VIEW</button>
                          </div>

                          {/* Row 3 */}
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Adm. Entry settings</label>
                            <select value={receiptCertSetting.admEntry} onChange={(e) => setReceiptCertSetting({...receiptCertSetting, admEntry: e.target.value})} className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm">
                              <option>Default Receipt</option>
                            </select>
                            <button className="bg-[#32a3d7] text-white px-4 py-1.5 rounded text-xs font-bold shadow w-fit flex items-center gap-1 mt-1"><FaEye /> VIEW</button>
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Provisional TC setting</label>
                            <select value={receiptCertSetting.provisionalTc} onChange={(e) => setReceiptCertSetting({...receiptCertSetting, provisionalTc: e.target.value})} className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm">
                              <option>Default</option>
                            </select>
                            <button className="bg-[#32a3d7] text-white px-4 py-1.5 rounded text-xs font-bold shadow w-fit flex items-center gap-1 mt-1"><FaEye /> VIEW</button>
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Affiliation Certificate</label>
                            <select value={receiptCertSetting.affiliation} onChange={(e) => setReceiptCertSetting({...receiptCertSetting, affiliation: e.target.value})} className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm">
                              <option>Default</option>
                            </select>
                            <button className="bg-[#32a3d7] text-white px-4 py-1.5 rounded text-xs font-bold shadow w-fit flex items-center gap-1 mt-1"><FaEye /> VIEW</button>
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Migration Certificate setting</label>
                            <select value={receiptCertSetting.migrationSetting} onChange={(e) => setReceiptCertSetting({...receiptCertSetting, migrationSetting: e.target.value})} className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm">
                              <option>Select Class</option>
                            </select>
                            <label className="text-sm font-bold text-gray-700 mt-2">Exam Name</label>
                            <input type="text" value={receiptCertSetting.examName} onChange={(e) => setReceiptCertSetting({...receiptCertSetting, examName: e.target.value})} className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" />
                          </div>

                          {/* Row 4 */}
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">TC settings</label>
                            <select value={receiptCertSetting.tcSetting} onChange={(e) => setReceiptCertSetting({...receiptCertSetting, tcSetting: e.target.value})} className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm">
                              <option>Default TC</option>
                            </select>
                            <button className="bg-[#32a3d7] text-white px-4 py-1.5 rounded text-xs font-bold shadow w-fit flex items-center gap-1 mt-1"><FaEye /> VIEW</button>
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">School Leaving Certificate</label>
                            <select value={receiptCertSetting.schoolLeaving} onChange={(e) => setReceiptCertSetting({...receiptCertSetting, schoolLeaving: e.target.value})} className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm">
                              <option>Default</option>
                            </select>
                            <button className="bg-[#32a3d7] text-white px-4 py-1.5 rounded text-xs font-bold shadow w-fit flex items-center gap-1 mt-1"><FaEye /> VIEW</button>
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">LOC Certificate</label>
                            <select value={receiptCertSetting.locCert} onChange={(e) => setReceiptCertSetting({...receiptCertSetting, locCert: e.target.value})} className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm">
                              <option>Default LOC</option>
                            </select>
                            <button className="bg-[#32a3d7] text-white px-4 py-1.5 rounded text-xs font-bold shadow w-fit flex items-center gap-1 mt-1"><FaEye /> VIEW</button>
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Study Certificate</label>
                            <select value={receiptCertSetting.studyCert} onChange={(e) => setReceiptCertSetting({...receiptCertSetting, studyCert: e.target.value})} className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm">
                              <option>Default</option>
                            </select>
                            <button className="bg-[#32a3d7] text-white px-4 py-1.5 rounded text-xs font-bold shadow w-fit flex items-center gap-1 mt-1"><FaEye /> VIEW</button>
                          </div>

                          {/* Row 5 */}
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Caste Certificate</label>
                            <select value={receiptCertSetting.casteCert} onChange={(e) => setReceiptCertSetting({...receiptCertSetting, casteCert: e.target.value})} className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm">
                              <option>Certificate Type 1</option>
                            </select>
                            <button className="bg-[#32a3d7] text-white px-4 py-1.5 rounded text-xs font-bold shadow w-fit flex items-center gap-1 mt-1"><FaEye /> VIEW</button>
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Anecdotal Certificate</label>
                            <select value={receiptCertSetting.anecdotal} onChange={(e) => setReceiptCertSetting({...receiptCertSetting, anecdotal: e.target.value})} className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm">
                              <option>Default</option>
                            </select>
                            <button className="bg-[#32a3d7] text-white px-4 py-1.5 rounded text-xs font-bold shadow w-fit flex items-center gap-1 mt-1"><FaEye /> VIEW</button>
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Passport Apply</label>
                            <select value={receiptCertSetting.passportApply} onChange={(e) => setReceiptCertSetting({...receiptCertSetting, passportApply: e.target.value})} className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm">
                              <option>Default</option>
                            </select>
                            <button className="bg-[#32a3d7] text-white px-4 py-1.5 rounded text-xs font-bold shadow w-fit flex items-center gap-1 mt-1"><FaEye /> VIEW</button>
                          </div>
                        </div>
                      </div>
                    ) : activeTab === 'Certificate Ref No. Setting' ? (
                      <div className="bg-white p-6 mt-4 w-full">
                        <table className="w-full text-sm text-left border-collapse">
                          <thead className="text-xs text-gray-700 font-bold border-b border-gray-200 bg-gray-50">
                            <tr>
                              <th className="px-4 py-3">Sr. No</th>
                              <th className="px-4 py-3">Certificate Type</th>
                              <th className="px-4 py-3">Prefix</th>
                              <th className="px-4 py-3">Start from</th>
                              <th className="px-4 py-3">Lead Zero</th>
                              <th className="px-4 py-3">Suffix</th>
                            </tr>
                          </thead>
                          <tbody>
                            {certRefNoSetting.map(item => (
                              <tr key={item.id} className="border-b border-gray-100">
                                <td className="px-4 py-2">{item.id}</td>
                                <td className="px-4 py-2">{item.type}</td>
                                <td className="px-4 py-2"><input type="text" defaultValue={item.prefix} className="border border-gray-300 rounded px-2 py-1 w-full" /></td>
                                <td className="px-4 py-2"><input type="text" defaultValue={item.start} className="border border-gray-300 rounded px-2 py-1 w-full" /></td>
                                <td className="px-4 py-2"><input type="text" defaultValue={item.lead} className="border border-gray-300 rounded px-2 py-1 w-full" /></td>
                                <td className="px-4 py-2"><input type="text" defaultValue={item.suffix} className="border border-gray-300 rounded px-2 py-1 w-full" /></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="flex justify-center mt-6 w-full">
                          <button className="bg-[#32a3d7] hover:bg-[#288ebf] text-white px-8 py-2 rounded text-sm font-bold flex items-center gap-2 shadow">
                            <FaSync /> Update
                          </button>
                        </div>
                      </div>
                    ) : activeTab === 'Admission Form Settings' ? (
                      <div className="bg-white p-6 mt-4 flex flex-col items-center w-full min-h-[400px]">
                        <h4 className="font-bold text-gray-800 text-md mb-2">Admission Form Settings</h4>
                        <div className="flex items-center gap-4 mt-2">
                          <select value={admissionFormSettings.format} onChange={(e) => setAdmissionFormSettings({format: e.target.value})} className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-64 text-sm">
                            <option>Format Type 1</option>
                          </select>
                          <button className="bg-[#32a3d7] text-white px-4 py-2 rounded text-sm font-bold shadow flex items-center gap-1"><FaEye /> VIEW</button>
                        </div>
                        <div className="mt-8">
                          <button className="bg-[#5cdb95] text-white px-8 py-2 rounded text-sm font-bold shadow flex items-center gap-2">
                            <FaSave /> Save
                          </button>
                        </div>
                      </div>
                    ) : activeTab === 'Saral ID Setting' ? (
                      <div className="bg-white p-6 mt-4 flex flex-col items-center w-full min-h-[400px]">
                        <div className="w-[400px] border border-gray-200 rounded shadow-sm">
                          <div className="bg-gray-50 border-b border-gray-200 py-3 text-center font-bold text-gray-700 text-sm">
                            Show on Student Registration Page
                          </div>
                          <div className="flex flex-col items-center p-6 gap-6">
                            <div className={`w-14 h-7 rounded-full cursor-pointer p-1 transition-colors ${saralIdSetting ? 'bg-[#5cdb95]' : 'bg-gray-300'}`} onClick={() => setSaralIdSetting(!saralIdSetting)}>
                              <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${saralIdSetting ? 'translate-x-7' : ''}`}></div>
                            </div>
                            <button className="bg-[#5cdb95] text-white px-6 py-2 rounded text-sm font-bold shadow flex items-center gap-2">
                              <FaSave /> Save
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : activeTab === 'Stationary Details' ? (
                      <div className="bg-white p-6 mt-4 flex flex-col items-center w-full">
                        <div className="w-full grid grid-cols-2 gap-x-12 gap-y-6 max-w-4xl">
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Stationary Name</label>
                            <input type="text" className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Amount</label>
                            <input type="text" className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Post Account Name</label>
                            <select className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm">
                              <option>Select Post Account</option>
                            </select>
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">School</label>
                            <select className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm">
                              <option>Select School</option>
                            </select>
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Session</label>
                            <select className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm">
                              <option>2026-2027</option>
                            </select>
                          </div>
                        </div>
                        <div className="flex justify-center mt-10 gap-4 w-full">
                          <button className="bg-white border border-[#5cdb95] text-[#5cdb95] hover:bg-[#5cdb95] hover:text-white px-6 py-2 rounded text-sm font-bold shadow-sm flex items-center gap-2 transition-colors">
                            <FaSave /> Save
                          </button>
                          <button className="bg-white border border-[#32a3d7] text-[#32a3d7] hover:bg-[#32a3d7] hover:text-white px-6 py-2 rounded text-sm font-bold shadow-sm flex items-center gap-2 transition-colors">
                            <FaEye /> View
                          </button>
                          <button className="bg-white border border-[#32a3d7] text-[#32a3d7] hover:bg-[#32a3d7] hover:text-white px-6 py-2 rounded text-sm font-bold shadow-sm flex items-center gap-2 transition-colors">
                            <FaPrint /> Print
                          </button>
                          <button className="bg-white border border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white px-6 py-2 rounded text-sm font-bold shadow-sm flex items-center gap-2 transition-colors">
                            <FaTimesCircle /> Reset
                          </button>
                        </div>
                      </div>
                    ) : activeTab === 'TC Setting' ? (
                      <div className="bg-white p-6 mt-4 flex flex-col items-center w-full min-h-[400px]">
                        <div className="w-[500px] border border-gray-200 rounded shadow-sm">
                          <div className="bg-gray-50 border-b border-gray-200 py-3 text-center font-bold text-gray-700 text-sm">
                            TC Form setting
                          </div>
                          <div className="flex flex-col p-6 gap-6">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-bold text-gray-700">Subject from Marks Manager</span>
                              <input type="checkbox" defaultChecked className="w-4 h-4 cursor-pointer accent-[#32a3d7]" />
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-bold text-gray-700">Subject from Time Table</span>
                              <input type="checkbox" defaultChecked className="w-4 h-4 cursor-pointer accent-[#32a3d7]" />
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-bold text-gray-700">Attendance from eCare</span>
                              <input type="checkbox" defaultChecked className="w-4 h-4 cursor-pointer accent-[#32a3d7]" />
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-bold text-gray-700">Check Dues in Fees when generate TC?</span>
                              <input type="checkbox" defaultChecked className="w-4 h-4 cursor-pointer accent-[#32a3d7]" />
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-bold text-gray-700">Check Dues in Library when generate TC?</span>
                              <input type="checkbox" defaultChecked className="w-4 h-4 cursor-pointer accent-[#32a3d7]" />
                            </div>
                            <div className="flex justify-center mt-4">
                              <button className="bg-[#5cdb95] text-white px-8 py-2 rounded text-sm font-bold shadow flex items-center gap-2">
                                <FaSave /> Save
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : activeTab === 'Report Layout Setting' ? (
                      <div className="bg-white p-6 mt-4 flex flex-col w-full">
                        <div className="border border-gray-200 rounded shadow-sm mb-6">
                          <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 font-bold text-gray-700 text-sm">
                            Copy Report Setting
                          </div>
                          <div className="p-4 grid grid-cols-4 gap-6 items-end">
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-sm font-bold text-gray-700">Copy From</label>
                              <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                <option>Admission Details</option>
                              </select>
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-sm font-bold text-gray-700">Report Name</label>
                              <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-sm font-bold text-gray-700">Report Title</label>
                              <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                            </div>
                            <div>
                              <button className="bg-white border border-[#32a3d7] text-[#32a3d7] hover:bg-[#32a3d7] hover:text-white px-6 py-1.5 rounded text-sm font-bold shadow-sm flex items-center justify-center gap-2 transition-colors w-full">
                                <FaCopy /> Copy
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="border border-gray-200 rounded shadow-sm mb-6">
                          <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 font-bold text-gray-700 text-sm">
                            Report Setting
                          </div>
                          <div className="p-4 grid grid-cols-2 gap-6 w-1/2">
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-sm font-bold text-gray-700">Report Name</label>
                              <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-sm font-bold text-gray-700">Report Title</label>
                              <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                            </div>
                          </div>
                        </div>

                        <div className="border border-gray-200 rounded shadow-sm mb-6">
                          <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 font-bold text-gray-700 text-sm">
                            Page Orientation & Layout Setting
                          </div>
                          <div className="p-4 grid grid-cols-2 gap-6 w-1/2">
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-sm font-bold text-gray-700">Page Orientation</label>
                              <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                <option>Potrait</option>
                              </select>
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-sm font-bold text-gray-700">Page Layout</label>
                              <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                <option>A4</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="border border-gray-200 rounded shadow-sm mb-6">
                          <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 font-bold text-gray-700 text-sm">
                            Height & Width Setting
                          </div>
                          <div className="p-4 grid grid-cols-4 gap-6">
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-sm font-bold text-gray-700">Page Height</label>
                              <input type="text" defaultValue="11.69" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-sm font-bold text-gray-700">Page Width</label>
                              <input type="text" defaultValue="8.27" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-sm font-bold text-gray-700">Header Height</label>
                              <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-sm font-bold text-gray-700">Footer Height</label>
                              <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                            </div>
                            
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-sm font-bold text-gray-700">Logo Height</label>
                              <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-sm font-bold text-gray-700">Header Line Width</label>
                              <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-sm font-bold text-gray-700">Footer Line Width</label>
                              <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-sm font-bold text-gray-700">Column Width(Default)</label>
                              <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                            </div>
                            
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-sm font-bold text-gray-700">Table Column Height</label>
                              <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                            </div>
                          </div>
                        </div>
                        
                        <div className="border border-gray-200 rounded shadow-sm mb-6">
                          <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 font-bold text-gray-700 text-sm">
                            Margin Setting
                          </div>
                          <div className="p-4 grid grid-cols-4 gap-6">
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-sm font-bold text-gray-700">Page Margin Left</label>
                              <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-sm font-bold text-gray-700">Page Margin Right</label>
                              <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-sm font-bold text-gray-700">Page Margin Top</label>
                              <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-sm font-bold text-gray-700">Page Margin Bottom</label>
                              <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                            </div>
                            
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-sm font-bold text-gray-700">Logo Margin Top</label>
                              <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-sm font-bold text-gray-700">Logo Margin Left</label>
                              <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-sm font-bold text-gray-700">Table Margin Top</label>
                              <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-sm font-bold text-gray-700">Table Margin Left</label>
                              <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                            </div>
                            
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-sm font-bold text-gray-700">Header Line Margin Top</label>
                              <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-sm font-bold text-gray-700">Footer Line Margin Top</label>
                              <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                            </div>
                          </div>
                        </div>

                        <div className="border border-gray-200 rounded shadow-sm mb-6">
                          <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 font-bold text-gray-700 text-sm">
                            Header and Footer Setting
                          </div>
                          <div className="p-4 grid grid-cols-4 gap-6">
                            <div className="flex flex-col gap-3 w-full">
                              <div className="flex items-center gap-2"><input type="checkbox" className="w-3.5 h-3.5 accent-[#32a3d7]" /> <span className="text-sm text-gray-700 font-medium">Is Header Enable</span></div>
                              <div className="flex items-center gap-2"><input type="checkbox" className="w-3.5 h-3.5 accent-[#32a3d7]" /> <span className="text-sm text-gray-700 font-medium">Is Logo Enable</span></div>
                            </div>
                            <div className="flex flex-col gap-3 w-full">
                              <div className="flex items-center gap-2"><input type="checkbox" className="w-3.5 h-3.5 accent-[#32a3d7]" /> <span className="text-sm text-gray-700 font-medium">Is Header Line Enable</span></div>
                              <div className="flex items-center gap-2"><input type="checkbox" className="w-3.5 h-3.5 accent-[#32a3d7]" /> <span className="text-sm text-gray-700 font-medium">Is Row No</span></div>
                            </div>
                            <div className="flex flex-col gap-3 w-full">
                              <div className="flex items-center gap-2"><input type="checkbox" className="w-3.5 h-3.5 accent-[#32a3d7]" /> <span className="text-sm text-gray-700 font-medium">Is Footer Enable</span></div>
                              <div className="flex items-center gap-2"><input type="checkbox" className="w-3.5 h-3.5 accent-[#32a3d7]" /> <span className="text-sm text-gray-700 font-medium">Is Group</span></div>
                            </div>
                            <div className="flex flex-col gap-3 w-full">
                              <div className="flex items-center gap-2"><input type="checkbox" className="w-3.5 h-3.5 accent-[#32a3d7]" /> <span className="text-sm text-gray-700 font-medium">Is Footer Line Enable</span></div>
                              <div className="flex items-center gap-2"><input type="checkbox" className="w-3.5 h-3.5 accent-[#32a3d7]" /> <span className="text-sm text-gray-700 font-medium">Is Sum</span></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border border-gray-200 rounded shadow-sm mb-6">
                          <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 font-bold text-gray-700 text-sm">
                            Font Size Setting
                          </div>
                          <div className="p-4 grid grid-cols-3 gap-6 w-3/4">
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-sm font-bold text-gray-700">Font Size</label>
                              <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-sm font-bold text-gray-700">Is Total</label>
                              <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                <option>No</option>
                                <option>Yes</option>
                              </select>
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-sm font-bold text-gray-700">Group Page Break(Only for group report)</label>
                              <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                <option>No</option>
                                <option>Yes</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-center mt-6 mb-8 gap-4 w-full">
                          <button className="bg-white border border-[#5cdb95] text-[#5cdb95] hover:bg-[#5cdb95] hover:text-white px-6 py-2 rounded text-sm font-bold shadow-sm flex items-center gap-2 transition-colors">
                            <FaSave /> Save
                          </button>
                          <button className="bg-white border border-[#32a3d7] text-[#32a3d7] hover:bg-[#32a3d7] hover:text-white px-6 py-2 rounded text-sm font-bold shadow-sm flex items-center gap-2 transition-colors">
                            <FaEye /> View
                          </button>
                          <button className="bg-white border border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white px-6 py-2 rounded text-sm font-bold shadow-sm flex items-center gap-2 transition-colors">
                            <FaTimesCircle /> Reset
                          </button>
                        </div>
                      </div>
                    ) : activeTab === 'Image Setting' ? (
                      <div className="bg-white p-6 mt-4 flex flex-col items-center w-full min-h-[400px]">
                        <div className="w-[500px] border border-gray-200 rounded shadow-sm">
                          <div className="bg-gray-50 border-b border-gray-200 py-3 text-center font-bold text-gray-700 text-sm">
                            Image setting
                          </div>
                          <div className="flex flex-col p-6 gap-6">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-bold text-gray-700">Is Prospectus/Enquiry Details</span>
                              <input type="checkbox" defaultChecked className="w-4 h-4 cursor-pointer accent-[#32a3d7]" />
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-bold text-gray-700">Is Previous School</span>
                              <input type="checkbox" defaultChecked className="w-4 h-4 cursor-pointer accent-[#32a3d7]" />
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-bold text-gray-700">Is Family Details</span>
                              <input type="checkbox" defaultChecked className="w-4 h-4 cursor-pointer accent-[#32a3d7]" />
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-bold text-gray-700">Is Health Details</span>
                              <input type="checkbox" defaultChecked className="w-4 h-4 cursor-pointer accent-[#32a3d7]" />
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-bold text-gray-700">Is Custom Details</span>
                              <input type="checkbox" defaultChecked className="w-4 h-4 cursor-pointer accent-[#32a3d7]" />
                            </div>
                            <div className="flex justify-center mt-4">
                              <button className="bg-[#5cdb95] text-white px-8 py-2 rounded text-sm font-bold shadow flex items-center gap-2">
                                <FaSave /> Save
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : activeTab === 'Define Document Type' ? (
                      <div className="bg-white p-6 mt-4 flex flex-col items-center w-full min-h-[400px]">
                        <div className="w-[800px] border border-gray-200 rounded shadow-sm mb-6">
                          <div className="bg-gray-50 border-b border-gray-200 py-3 px-6 font-bold text-gray-700 text-sm">
                            Document Setting
                          </div>
                          <div className="flex items-end p-6 gap-6">
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-sm font-bold text-gray-700">Document Name <span className="text-red-500">*</span></label>
                              <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-sm font-bold text-gray-700">Type <span className="text-red-500">*</span></label>
                              <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                <option>Compulsory</option>
                                <option>Optional</option>
                              </select>
                            </div>
                            <div className="flex gap-2 w-full">
                              <button className="bg-[#5cdb95] text-white px-4 py-1.5 rounded text-sm font-bold shadow hover:opacity-90">Save</button>
                              <button className="bg-[#32a3d7] text-white px-4 py-1.5 rounded text-sm font-bold shadow hover:opacity-90">Update</button>
                              <button className="bg-orange-400 text-white px-4 py-1.5 rounded text-sm font-bold shadow hover:opacity-90">Cancel</button>
                            </div>
                          </div>
                        </div>

                        <div className="w-[800px]">
                          <table className="w-full text-sm text-left border border-gray-200">
                            <thead className="bg-[#eaf7fd] text-[#32a3d7] font-bold border-b border-[#32a3d7]">
                              <tr>
                                <th className="px-4 py-2 border-r border-[#32a3d7]">S.No</th>
                                <th className="px-4 py-2 border-r border-[#32a3d7]">Document Name</th>
                                <th className="px-4 py-2 border-r border-[#32a3d7]">Is Mandatory</th>
                                <th className="px-4 py-2 text-center">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="px-4 py-2 border-r border-gray-200 text-gray-700">1</td>
                                <td className="px-4 py-2 border-r border-gray-200 text-[#32a3d7]">Aadhar Card</td>
                                <td className="px-4 py-2 border-r border-gray-200 text-gray-700">True</td>
                                <td className="px-4 py-2 text-center">
                                  <div className="flex justify-center items-center gap-3">
                                    <button className="text-[#32a3d7] hover:text-[#288ebf]"><FaEdit /></button>
                                    <button className="text-red-500 hover:text-red-600"><FaTrashAlt /></button>
                                  </div>
                                </td>
                              </tr>
                              <tr className="border-b border-gray-200 hover:bg-gray-50 bg-gray-50">
                                <td className="px-4 py-2 border-r border-gray-200 text-gray-700">2</td>
                                <td className="px-4 py-2 border-r border-gray-200 text-[#32a3d7]">Passport</td>
                                <td className="px-4 py-2 border-r border-gray-200 text-gray-700">False</td>
                                <td className="px-4 py-2 text-center">
                                  <div className="flex justify-center items-center gap-3">
                                    <button className="text-[#32a3d7] hover:text-[#288ebf]"><FaEdit /></button>
                                    <button className="text-red-500 hover:text-red-600"><FaTrashAlt /></button>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : activeTab === 'Enquiry' ? (
                      <div className="bg-white p-6 mt-4 flex flex-col w-full">
                        <div className="flex items-center gap-4 mb-6 w-1/2">
                          <label className="text-sm font-bold text-gray-700 whitespace-nowrap w-24">Enquiry No.</label>
                          <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                          <a href="#" className="text-[#32a3d7] text-sm font-bold whitespace-nowrap hover:underline">Get Last Enquiry No.</a>
                        </div>
                        <div className="border border-gray-200 rounded shadow-sm mb-6 p-6 grid grid-cols-5 gap-6">
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Session</label>
                            <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                              <option>Select Session</option>
                            </select>
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Enquiry Date</label>
                            <input type="text" defaultValue="31-Aug-2026" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Guardian Name</label>
                            <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Guardian Address</label>
                            <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Contact No.</label>
                            <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Contact Person</label>
                            <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                          </div>
                          
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Reference/Remark</label>
                            <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Student Name</label>
                            <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Middle Name</label>
                            <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Last Name</label>
                            <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">DOB</label>
                            <input type="text" defaultValue="31-Aug-2026" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Admission in Class</label>
                            <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                              <option>Select Class</option>
                            </select>
                          </div>
                          
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Student Address</label>
                            <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Last School</label>
                            <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Reason for Leaving</label>
                            <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Father's Name</label>
                            <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Middle Name</label>
                            <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Last Name</label>
                            <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                          </div>

                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Father's Mobile</label>
                            <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Father's Email</label>
                            <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Mother's Name</label>
                            <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Middle Name</label>
                            <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Last Name</label>
                            <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Mother's Mobile</label>
                            <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                          </div>

                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Mother's Email</label>
                            <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700 flex items-center justify-between">How did you know ? <a href="#" className="flex items-center gap-1 text-[#32a3d7]"><FaEdit /> Add</a></label>
                            <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                              <option>Select</option>
                            </select>
                          </div>
                          <div className="flex flex-col gap-2 w-full">
                            <label className="text-sm font-bold text-gray-700">Gender</label>
                            <div className="flex items-center gap-4">
                              <label className="flex items-center gap-2 text-sm text-gray-700"><input type="radio" name="gender" defaultChecked className="accent-[#32a3d7]"/> Male</label>
                              <label className="flex items-center gap-2 text-sm text-gray-700"><input type="radio" name="gender" className="accent-[#32a3d7]"/> Female</label>
                            </div>
                          </div>
                        </div>

                        <div className="border border-gray-200 rounded shadow-sm mb-6 p-4 bg-gray-50">
                           <div className="flex flex-col gap-1 w-64">
                              <label className="text-sm font-bold text-gray-700">View Fee Structure</label>
                              <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm bg-white">
                                <option>Select Class</option>
                              </select>
                            </div>
                        </div>

                        <div className="flex justify-center mb-8 gap-4 w-full">
                          <button className="bg-white border border-[#5cdb95] text-[#5cdb95] hover:bg-[#5cdb95] hover:text-white px-6 py-2 rounded text-sm font-bold shadow-sm flex items-center gap-2 transition-colors">
                            <FaSave /> Save
                          </button>
                          <button className="bg-white border border-[#32a3d7] text-[#32a3d7] hover:bg-[#32a3d7] hover:text-white px-6 py-2 rounded text-sm font-bold shadow-sm flex items-center gap-2 transition-colors">
                            <FaEye /> View
                          </button>
                          <button className="bg-white border border-[#32a3d7] text-[#32a3d7] hover:bg-[#32a3d7] hover:text-white px-6 py-2 rounded text-sm font-bold shadow-sm flex items-center gap-2 transition-colors">
                            <FaPrint /> Print
                          </button>
                          <button className="bg-white border border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white px-6 py-2 rounded text-sm font-bold shadow-sm flex items-center gap-2 transition-colors">
                            <FaTimesCircle /> Reset
                          </button>
                        </div>
                      </div>
                    ) : activeTab === 'Enquiry FollowUp' ? (
                      <div className="bg-white p-6 mt-4 flex flex-col w-full">
                        <div className="border border-gray-200 rounded shadow-sm mb-6 p-6 flex flex-col gap-4">
                          <div className="flex items-center justify-center gap-6">
                             <label className="flex items-center gap-2 text-sm font-bold text-gray-700"><input type="radio" name="followup_type" defaultChecked className="w-4 h-4 accent-[#32a3d7]"/>Follow-up Date wise</label>
                             <label className="flex items-center gap-2 text-sm font-bold text-gray-700"><input type="radio" name="followup_type" className="w-4 h-4 accent-[#32a3d7]"/>Enquiry Date wise</label>
                             <label className="flex items-center gap-2 text-sm font-bold text-gray-700"><input type="radio" name="followup_type" className="w-4 h-4 accent-[#32a3d7]"/>Student Detail wise</label>
                          </div>
                          <div className="flex items-end gap-6">
                            <div className="flex flex-col gap-1 flex-1">
                              <label className="text-sm font-bold text-gray-700">Session</label>
                              <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                <option>2026-2027</option>
                              </select>
                            </div>
                            <div className="flex flex-col gap-1 flex-1">
                              <label className="text-sm font-bold text-gray-700">Follow-up Date</label>
                              <input type="text" defaultValue="31-Aug-2026" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                            </div>
                            <div className="flex flex-col gap-1 flex-1">
                              <label className="text-sm font-bold text-gray-700">Enquiry Date</label>
                              <input type="text" defaultValue="31-Aug-2026" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                            </div>
                            <div className="flex flex-col gap-1 flex-[2]">
                              <label className="text-sm font-bold text-gray-700">Student Details</label>
                              <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                            </div>
                            <div>
                               <button className="bg-[#32a3d7] text-white px-6 py-1.5 rounded text-sm font-bold shadow-sm flex items-center gap-2 hover:bg-[#288ebf]">
                                 <FaEye /> Get Data
                               </button>
                            </div>
                          </div>
                        </div>

                        <div className="w-full overflow-x-auto">
                          <table className="w-full text-sm text-left border border-gray-200">
                            <thead className="bg-[#eaf7fd] text-[#32a3d7] font-bold border-b border-[#32a3d7] text-xs text-center">
                              <tr>
                                <th className="px-2 py-2 border-r border-[#32a3d7]">Sr.No.</th>
                                <th className="px-2 py-2 border-r border-[#32a3d7]">Enquiry No.</th>
                                <th className="px-2 py-2 border-r border-[#32a3d7]">Student Name</th>
                                <th className="px-2 py-2 border-r border-[#32a3d7]">Class</th>
                                <th className="px-2 py-2 border-r border-[#32a3d7]">Father Name</th>
                                <th className="px-2 py-2 border-r border-[#32a3d7]">Contact No.</th>
                                <th className="px-2 py-2 border-r border-[#32a3d7]">Father Mobile</th>
                                <th className="px-2 py-2 border-r border-[#32a3d7]">Mother Mobile</th>
                                <th className="px-2 py-2 border-r border-[#32a3d7]">Source</th>
                                <th className="px-2 py-2 border-r border-[#32a3d7]">Reasons</th>
                                <th className="px-2 py-2 border-r border-[#32a3d7]">Counsellor</th>
                                <th className="px-2 py-2 border-r border-[#32a3d7]">Enquiry Type</th>
                                <th className="px-2 py-2 border-r border-[#32a3d7]">Followup Date and Remark</th>
                                <th className="px-2 py-2 border-r border-[#32a3d7]">Enquiry Status</th>
                                <th className="px-2 py-2">Manage</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td colSpan="15" className="px-4 py-3 text-center text-gray-500 bg-gray-50 border-b border-gray-200">
                                  No data available in table
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : activeTab === 'Prospectus Entry' ? (
                      <div className="bg-white p-6 mt-4 flex flex-col w-full">
                        <div className="flex items-center gap-4 mb-6 justify-center w-full">
                          <input type="text" placeholder="Enquiry No." className="border border-gray-300 rounded-l px-3 py-1.5 outline-none focus:border-[#32a3d7] w-64 text-sm" />
                          <button className="bg-[#32a3d7] text-white px-4 py-1.5 rounded-r text-sm font-bold shadow-sm flex items-center gap-2 hover:bg-[#288ebf] -ml-4">
                            <FaSearch /> Search
                          </button>
                        </div>

                        <div className="border border-gray-200 rounded shadow-sm mb-6 p-6 grid grid-cols-5 gap-6">
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Class <span className="text-red-500">*</span></label>
                            <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                              <option>Select Class</option>
                            </select>
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Board</label>
                            <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                              <option>All Board</option>
                            </select>
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Reg No./ Pros No. <span className="text-red-500">*</span></label>
                            <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Date <span className="text-red-500">*</span></label>
                            <input type="text" defaultValue="31-Aug-2026" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Session</label>
                            <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                              <option>Select Session</option>
                            </select>
                          </div>
                          
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Student Name <span className="text-red-500">*</span></label>
                            <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Middle Name</label>
                            <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Last Name</label>
                            <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Reference</label>
                            <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Date of Birth <span className="text-red-500">*</span></label>
                            <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Gender <span className="text-red-500">*</span></label>
                            <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                              <option>Select Gender</option>
                            </select>
                          </div>
                          
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Father Name <span className="text-red-500">*</span></label>
                            <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Middle Name</label>
                            <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Last Name</label>
                            <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Con. Mobile <span className="text-red-500">*</span></label>
                            <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Mother Name</label>
                            <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Middle Name</label>
                            <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                          </div>

                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Last Name</label>
                            <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Con. Person</label>
                            <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Con. Email</label>
                            <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Village/H.No/Streets</label>
                            <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">City</label>
                            <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">State</label>
                            <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Pin Code</label>
                            <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                          </div>
                          
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Remark</label>
                            <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Date of Admission Test</label>
                            <input type="text" defaultValue="31-Aug-2026" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                          </div>
                          <div className="flex flex-col gap-1 w-full relative">
                            <label className="text-sm font-bold text-gray-700">Time of Admission Test</label>
                            <input type="text" placeholder="HH:MM AM/PM" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                            <FaClock className="absolute right-3 top-8 text-gray-400" />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-bold text-gray-700">Date of Interaction with Principal</label>
                            <input type="text" defaultValue="31-Aug-2026" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                          </div>
                          <div className="flex flex-col gap-1 w-full relative">
                            <label className="text-sm font-bold text-gray-700">Time of Interaction with Principal</label>
                            <input type="text" placeholder="HH:MM AM/PM" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                            <FaClock className="absolute right-3 top-8 text-gray-400" />
                          </div>
                        </div>
                        
                        <div className="flex gap-6 mb-6">
                           <div className="flex-1">
                             <table className="w-full text-sm text-left border border-gray-200">
                              <thead className="bg-[#eaf7fd] text-[#32a3d7] font-bold border-b border-[#32a3d7]">
                                <tr>
                                  <th className="px-4 py-2 border-r border-[#32a3d7]">Sr. No</th>
                                  <th className="px-4 py-2 border-r border-[#32a3d7]">Select</th>
                                  <th className="px-4 py-2 border-r border-[#32a3d7]">Stationary</th>
                                  <th className="px-4 py-2">Amount</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td colSpan="4" className="px-4 py-3 text-center text-gray-500 bg-gray-50 border-b border-gray-200">
                                    No data available in table
                                  </td>
                                </tr>
                              </tbody>
                             </table>
                           </div>
                           <div className="flex-1 bg-gray-50 border border-gray-200 rounded p-4 flex flex-col gap-2 h-fit">
                              <div className="flex items-center gap-4">
                                <label className="text-sm font-bold text-gray-700">Paymode</label>
                                <label className="flex items-center gap-2 text-sm text-gray-700"><input type="checkbox" className="w-4 h-4 accent-[#32a3d7]"/> Is Online</label>
                              </div>
                              <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-1/2 text-sm bg-white">
                                <option>Select Paymode</option>
                              </select>
                           </div>
                        </div>

                        <div className="flex justify-center mb-8 gap-4 w-full">
                          <button className="bg-white border border-[#5cdb95] text-[#5cdb95] hover:bg-[#5cdb95] hover:text-white px-6 py-2 rounded text-sm font-bold shadow-sm flex items-center gap-2 transition-colors">
                            <FaSave /> Save
                          </button>
                          <button className="bg-white border border-[#32a3d7] text-[#32a3d7] hover:bg-[#32a3d7] hover:text-white px-6 py-2 rounded text-sm font-bold shadow-sm flex items-center gap-2 transition-colors">
                            <FaEye /> View
                          </button>
                          <button className="bg-white border border-[#32a3d7] text-[#32a3d7] hover:bg-[#32a3d7] hover:text-white px-6 py-2 rounded text-sm font-bold shadow-sm flex items-center gap-2 transition-colors">
                            <FaPrint /> Print
                          </button>
                          <button className="bg-white border border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white px-6 py-2 rounded text-sm font-bold shadow-sm flex items-center gap-2 transition-colors">
                            <FaTimesCircle /> Reset
                          </button>
                        </div>
                      </div>
                    ) : activeTab === 'Admission Form Registration' ? (
                      <div className="bg-white p-6 mt-4 flex flex-col w-full h-full overflow-y-auto">
                        <div className="flex gap-2 justify-center mb-6 border-b border-gray-200">
                           <button className="bg-[#32a3d7] text-white px-6 py-2 font-bold text-sm">Student Details</button>
                           <button className="bg-gray-100 text-gray-700 px-6 py-2 font-bold text-sm hover:bg-gray-200">Parent Details</button>
                           <button className="bg-gray-100 text-gray-700 px-6 py-2 font-bold text-sm hover:bg-gray-200">Other Details</button>
                           <button className="bg-gray-100 text-gray-700 px-6 py-2 font-bold text-sm hover:bg-gray-200">Guardian Details</button>
                        </div>
                        
                        <div className="flex items-center justify-between bg-gray-50 p-4 border border-gray-200 rounded mb-6">
                           <div className="flex items-center gap-6">
                             <label className="flex items-center gap-2 text-sm text-gray-700"><input type="radio" name="prospectus_type" className="accent-[#32a3d7] w-4 h-4"/> With Prospectus</label>
                             <label className="flex items-center gap-2 text-sm text-gray-700"><input type="radio" name="prospectus_type" defaultChecked className="accent-[#32a3d7] w-4 h-4"/> Without Prospectus/Enquiry</label>
                             <label className="flex items-center gap-2 text-sm text-gray-700"><input type="checkbox" className="accent-[#32a3d7] w-4 h-4"/> With Enquiry</label>
                           </div>
                           <div className="flex flex-col gap-2">
                             <div className="flex">
                                <input type="text" placeholder="Search Pros/Enq" className="border border-gray-300 rounded-l px-3 py-1.5 outline-none focus:border-[#32a3d7] text-sm w-48"/>
                                <button className="bg-[#32a3d7] text-white px-4 py-1.5 rounded-r text-sm font-bold flex items-center gap-2 hover:bg-[#288ebf]">
                                  <FaSearch /> Search
                                </button>
                             </div>
                             <button className="bg-[#32a3d7] text-white px-4 py-1.5 rounded text-sm font-bold w-full hover:bg-[#288ebf]">
                               Import Prospectus Entry
                             </button>
                           </div>
                        </div>

                        <div className="border border-gray-200 rounded p-6 grid grid-cols-7 gap-4 mb-6">
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Class <span className="text-red-500">*</span></label>
                             <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                               <option>Select Class</option>
                             </select>
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Session</label>
                             <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                               <option>Select</option>
                             </select>
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Board</label>
                             <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                               <option>up board</option>
                             </select>
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Reg. No. <span className="text-red-500">*</span></label>
                             <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Pros. No.</label>
                             <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">ENQ. No.</label>
                             <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Date</label>
                             <input type="text" defaultValue="31-Aug-2026" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>

                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Amount</label>
                             <input type="text" defaultValue="200.00" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                           <div className="flex flex-col gap-1 w-full col-span-2">
                             <label className="text-sm font-bold text-gray-700">Admission Account</label>
                             <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                               <option>Please Select</option>
                             </select>
                           </div>
                           <div className="flex flex-col gap-1 w-full col-span-2">
                             <label className="text-sm font-bold text-gray-700">Post Account</label>
                             <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                               <option>Please Select</option>
                             </select>
                           </div>
                           <div className="flex flex-col gap-1 w-full col-span-2">
                             <label className="text-sm font-bold text-gray-700">Payment Mode</label>
                             <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                               <option>Please Select</option>
                             </select>
                           </div>
                        </div>

                        <div className="mb-6 border border-gray-200 rounded pb-4">
                           <h3 className="bg-[#eaf7fd] text-[#32a3d7] font-bold p-2 border-b border-gray-200 mb-4">Student Details</h3>
                           <div className="px-4 grid grid-cols-6 gap-4">
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">First Name <span className="text-red-500">*</span></label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Middle Name</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Last Name</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">DOB</label>
                                <input type="text" defaultValue="31-Aug-2026" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Place Of Birth</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">DOJ</label>
                                <input type="text" defaultValue="31-Aug-2026" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              
                              <div className="flex flex-col gap-2 w-full">
                                <label className="text-sm font-bold text-gray-700">Gender</label>
                                <div className="flex items-center gap-4 mt-1">
                                  <label className="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="student_gender" defaultChecked className="accent-[#32a3d7] w-4 h-4"/> Male</label>
                                  <label className="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="student_gender" className="accent-[#32a3d7] w-4 h-4"/> Female</label>
                                </div>
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Email</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Mobile</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Aadhar Card No</label>
                                <input type="text" placeholder="1234-5678-9012" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Student Name as Per Aadhar</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Blood Group</label>
                                <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                  <option>Select Blood Group</option>
                                </select>
                              </div>
                           </div>
                        </div>
                        
                        <div className="mb-6 border border-gray-200 rounded pb-4">
                           <h3 className="bg-[#eaf7fd] text-[#32a3d7] font-bold p-2 border-b border-gray-200 mb-4">Contacts</h3>
                           <div className="px-4 grid grid-cols-6 gap-4">
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Contact Person Name</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Contact Person Email</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Contact Person Mobile</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Secondary Contact No</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">H.No and Streets</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">City</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">State</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Pin Code</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                           </div>
                        </div>

                        <div className="mb-6 border border-gray-200 rounded pb-4">
                           <h3 className="bg-[#eaf7fd] text-[#32a3d7] font-bold p-2 border-b border-gray-200 mb-4">Other Details</h3>
                           <div className="px-4 grid grid-cols-6 gap-4">
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Religion</label>
                                <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                  <option>Select Religion</option>
                                </select>
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Caste</label>
                                <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                  <option>Select Caste</option>
                                </select>
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Category</label>
                                <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                  <option>Select Category</option>
                                </select>
                              </div>
                              <div className="flex flex-col gap-1 w-full items-center">
                                <label className="text-sm font-bold text-gray-700 text-center">Is EWS</label>
                                <div className="flex items-center gap-2 mt-1">
                                  <label className="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="is_ews" className="accent-[#32a3d7] w-4 h-4"/> Yes</label>
                                  <label className="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="is_ews" defaultChecked className="accent-[#32a3d7] w-4 h-4"/> No</label>
                                </div>
                              </div>
                              <div className="flex flex-col gap-1 w-full items-center">
                                <label className="text-sm font-bold text-gray-700 text-center">Sibling</label>
                                <div className="flex items-center gap-2 mt-1">
                                  <label className="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="sibling" className="accent-[#32a3d7] w-4 h-4"/> Yes</label>
                                  <label className="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="sibling" defaultChecked className="accent-[#32a3d7] w-4 h-4"/> No</label>
                                </div>
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Transport</label>
                                <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                  <option>NA</option>
                                </select>
                              </div>
                              
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Nationality <span className="text-red-500">*</span></label>
                                <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                  <option>Indian</option>
                                </select>
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">UDISE No.</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">PEN-Permanent Education No.</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full justify-center pl-4 pt-4">
                                <label className="flex items-center gap-2 text-sm font-bold text-gray-700"><input type="checkbox" className="accent-[#32a3d7] w-4 h-4"/> Is Minority</label>
                              </div>
                           </div>
                        </div>

                        <div className="flex justify-center mb-8 gap-4 w-full">
                          <button className="bg-white border border-[#5cdb95] text-[#5cdb95] hover:bg-[#5cdb95] hover:text-white px-6 py-2 rounded text-sm font-bold shadow-sm flex items-center gap-2 transition-colors">
                            <FaSave /> Save
                          </button>
                          <button className="bg-white border border-[#32a3d7] text-[#32a3d7] hover:bg-[#32a3d7] hover:text-white px-6 py-2 rounded text-sm font-bold shadow-sm flex items-center gap-2 transition-colors">
                            <FaEye /> View
                          </button>
                          <button className="bg-white border border-[#32a3d7] text-[#32a3d7] hover:bg-[#32a3d7] hover:text-white px-6 py-2 rounded text-sm font-bold shadow-sm flex items-center gap-2 transition-colors">
                            <FaPrint /> Print
                          </button>
                          <button className="bg-white border border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white px-6 py-2 rounded text-sm font-bold shadow-sm flex items-center gap-2 transition-colors">
                            <FaTimesCircle /> Reset
                          </button>
                        </div>
                      </div>
                    ) : activeTab === 'Possible Siblings' ? (
                      <div className="bg-white p-6 mt-4 flex flex-col w-full h-full overflow-y-auto">
                         <div className="flex justify-center gap-4 mb-6">
                            <button className="bg-[#32a3d7] text-white px-6 py-2 rounded text-sm font-bold flex items-center gap-2 shadow-sm hover:bg-[#288ebf]">
                              <FaSync /> Refresh
                            </button>
                            <button className="bg-[#32a3d7] text-white px-6 py-2 rounded text-sm font-bold flex items-center gap-2 shadow-sm hover:bg-[#288ebf]">
                              <FaSave /> Save Sibling
                            </button>
                         </div>
                         <div className="w-full">
                           <table className="w-full text-sm text-left border border-gray-200">
                             <thead className="bg-[#f8f9fa] text-gray-700 font-bold border-b border-gray-200">
                               <tr>
                                 <th className="px-4 py-3 border-r border-gray-200">SrNo</th>
                                 <th className="px-4 py-3 border-r border-gray-200">Father Name</th>
                                 <th className="px-4 py-3 border-r border-gray-200">Mother Name</th>
                                 <th className="px-4 py-3 border-r border-gray-200">Contact Number</th>
                                 <th className="px-4 py-3 border-r border-gray-200">Student Name</th>
                                 <th className="px-4 py-3 border-r border-gray-200">Gender</th>
                                 <th className="px-4 py-3 border-r border-gray-200">Class</th>
                                 <th className="px-4 py-3 border-r border-gray-200">Status</th>
                                 <th className="px-4 py-3 border-r border-gray-200">Select to Add</th>
                                 <th className="px-4 py-3">Select to Remove</th>
                               </tr>
                             </thead>
                             <tbody>
                               {[
                                 { id: 1, fname: 'YOGESH KUMAR', mname: 'NISHA DEVI', contact: '9506634660', students: [{name: 'ARCHANA YADAV', gender: 'Female', cls: '9 - B'}, {name: 'AYUSH YADAV', gender: 'Male', cls: '7 - B'}] },
                                 { id: 2, fname: 'PRADEEP KUMAR CHAUHAN', mname: 'POONAM SINGH CHAUHAN', contact: '9807476247', students: [{name: 'DEEPIKA SINGH CHAUHAN', gender: 'Female', cls: '7 - A'}, {name: 'VAMIKA SINGH CHAUHAN', gender: 'Female', cls: '5 - A'}] },
                                 { id: 3, fname: 'PRAMOD KUMAR SHARMA', mname: 'KUSUM SHARMA', contact: '7754049196', students: [{name: 'ARADHYA SHARMA', gender: 'Female', cls: '6 - A'}, {name: 'PRIYANSHU SHARMA', gender: 'Male', cls: '9 - B'}] },
                                 { id: 4, fname: 'SURENDRA YADAV', mname: 'MANJU DEVI', contact: '8173889731', students: [{name: 'ADITYA YADAV', gender: 'Male', cls: '11 - A'}, {name: 'AMAN YADAV', gender: 'Male', cls: '9 - B'}] },
                                 { id: 5, fname: 'GYANCHAND YADAV', mname: 'SARITA YADAV', contact: '8808708644', students: [{name: 'SAKSHI YADAV', gender: 'Female', cls: '6 - A'}, {name: 'SONAKSHI YADAV', gender: 'Female', cls: '4 - A'}] },
                                 { id: 6, fname: 'GYANCHAND YADAV', mname: 'SARITA YADAV', contact: '8795465555', students: [{name: 'ANUP YADAV', gender: 'Male', cls: '7 - B'}] },
                               ].map((row, i) => (
                                 <React.Fragment key={i}>
                                   <tr className="border-b border-gray-200 hover:bg-gray-50">
                                     <td className="px-4 py-3 border-r border-gray-200" rowSpan={row.students.length}>{row.id}</td>
                                     <td className="px-4 py-3 border-r border-gray-200" rowSpan={row.students.length}>{row.fname}</td>
                                     <td className="px-4 py-3 border-r border-gray-200" rowSpan={row.students.length}>{row.mname}</td>
                                     <td className="px-4 py-3 border-r border-gray-200" rowSpan={row.students.length}>{row.contact}</td>
                                     <td className="px-4 py-3 border-r border-gray-200">{row.students[0].name}</td>
                                     <td className="px-4 py-3 border-r border-gray-200">{row.students[0].gender}</td>
                                     <td className="px-4 py-3 border-r border-gray-200">{row.students[0].cls}</td>
                                     <td className="px-4 py-3 border-r border-gray-200"></td>
                                     <td className="px-4 py-3 border-r border-gray-200 text-center"><input type="checkbox" className="w-4 h-4 accent-[#32a3d7]"/></td>
                                     <td className="px-4 py-3 text-center"><input type="checkbox" className="w-4 h-4 accent-[#32a3d7]"/></td>
                                   </tr>
                                   {row.students.slice(1).map((student, j) => (
                                     <tr key={`${i}-${j}`} className="border-b border-gray-200 hover:bg-gray-50">
                                       <td className="px-4 py-3 border-r border-gray-200">{student.name}</td>
                                       <td className="px-4 py-3 border-r border-gray-200">{student.gender}</td>
                                       <td className="px-4 py-3 border-r border-gray-200">{student.cls}</td>
                                       <td className="px-4 py-3 border-r border-gray-200"></td>
                                       <td className="px-4 py-3 border-r border-gray-200 text-center"><input type="checkbox" className="w-4 h-4 accent-[#32a3d7]"/></td>
                                       <td className="px-4 py-3 text-center"><input type="checkbox" className="w-4 h-4 accent-[#32a3d7]"/></td>
                                     </tr>
                                   ))}
                                 </React.Fragment>
                               ))}
                             </tbody>
                           </table>
                         </div>
                      </div>
                    ) : activeTab === 'Manual List Generation' ? (
                      <div className="bg-white p-6 mt-4 flex flex-col w-full h-full overflow-y-auto">
                        <div className="border border-gray-200 rounded p-6 shadow-sm mb-6 flex flex-col gap-4">
                          <div className="flex items-end gap-6">
                            <div className="flex flex-col gap-1 w-64">
                              <label className="text-sm font-bold text-gray-700">Class</label>
                              <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                <option>Select Class</option>
                              </select>
                            </div>
                            <div className="flex flex-col gap-1 w-64">
                              <label className="text-sm font-bold text-gray-700">Merit List</label>
                              <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                <option>Select Merit List</option>
                              </select>
                            </div>
                            <div className="flex flex-col gap-1 w-64">
                              <label className="text-sm font-bold text-gray-700">Select Date</label>
                              <input type="text" defaultValue="31-Aug-2026" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                            </div>
                            <div>
                               <button className="bg-[#32a3d7] text-white px-6 py-1.5 rounded text-sm font-bold flex items-center gap-2 shadow-sm hover:bg-[#288ebf]">
                                 <FaEye /> Get Student
                               </button>
                            </div>
                          </div>
                          
                          <div className="flex items-end gap-6">
                            <div className="flex flex-col gap-1 w-64">
                              <label className="text-sm font-bold text-gray-700">Adm. Date From</label>
                              <input type="text" defaultValue="31-Aug-2026" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                            </div>
                            <div className="flex flex-col gap-1 w-64">
                              <label className="text-sm font-bold text-gray-700">Adm. Date To</label>
                              <input type="text" defaultValue="31-Aug-2026" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                            </div>
                            <div className="flex flex-col gap-1 w-64">
                              <label className="text-sm font-bold text-gray-700">Session</label>
                              <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                <option>Select Session</option>
                              </select>
                            </div>
                            <div>
                               <button className="bg-[#32a3d7] text-white px-6 py-1.5 rounded text-sm font-bold flex items-center gap-2 shadow-sm hover:bg-[#288ebf]">
                                 <FaSync /> Update
                               </button>
                            </div>
                          </div>
                        </div>

                        <div className="w-full overflow-x-auto">
                          <table className="w-full text-sm text-left border border-gray-200">
                            <thead className="bg-[#f8f9fa] text-gray-700 font-bold border-b border-gray-200 text-xs">
                              <tr>
                                <th className="px-4 py-3 border-r border-gray-200">Sr.No.</th>
                                <th className="px-4 py-3 border-r border-gray-200">Registration No.</th>
                                <th className="px-4 py-3 border-r border-gray-200">Student Name</th>
                                <th className="px-4 py-3 border-r border-gray-200">Father Name</th>
                                <th className="px-4 py-3 border-r border-gray-200">Contact No.</th>
                                <th className="px-4 py-3 border-r border-gray-200">Remark</th>
                                <th className="px-4 py-3 border-r border-gray-200">Selected Class</th>
                                <th className="px-4 py-3 border-r border-gray-200 flex items-center gap-2 justify-center"><input type="checkbox" defaultChecked className="w-4 h-4 accent-[#32a3d7]"/> Select</th>
                                <th className="px-4 py-3 border-r border-gray-200">Adm. Status</th>
                                <th className="px-4 py-3">View Details</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td colSpan="10" className="px-4 py-3 text-center text-gray-500 bg-gray-50 border-b border-gray-200">
                                  No data available in table
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : activeTab === 'Student Registration' ? (
                      <div className="bg-white mt-4 flex flex-col w-full h-full overflow-y-auto">
                        <div className="bg-[#32a3d7] text-white p-2 font-bold text-sm flex justify-between items-center">
                          Student Details
                          <button className="text-white hover:text-gray-200"><FaAngleUp /></button>
                        </div>
                        <div className="p-6 border border-gray-200 border-t-0 mb-6">
                           <div className="flex items-center gap-4 mb-6">
                              <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-48 text-sm">
                                <option>Select Class</option>
                              </select>
                              <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-48 text-sm">
                                <option>Select Section</option>
                              </select>
                              <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] flex-1 text-sm" />
                              <button className="bg-white border border-[#32a3d7] text-[#32a3d7] px-4 py-1.5 rounded text-sm font-bold flex items-center gap-2 hover:bg-[#f0f9ff]">
                                <FaSearch /> Search
                              </button>
                              <button className="bg-white border border-[#32a3d7] text-[#32a3d7] px-4 py-1.5 rounded text-sm font-bold flex items-center gap-2 hover:bg-[#f0f9ff]">
                                <FaSearch /> Search From Admission
                              </button>
                           </div>

                           <div className="flex gap-6">
                              <div className="w-32 flex flex-col items-center gap-2">
                                 <div className="w-32 h-32 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                                   <FaInfoCircle className="text-5xl" />
                                 </div>
                                 <div className="text-sm font-bold text-center">Name:<br/>Adm No.:<br/>Parent Status:</div>
                              </div>
                              <div className="flex-1 grid grid-cols-5 gap-4">
                                <div className="flex flex-col gap-1 w-full col-span-2">
                                  <label className="text-sm font-bold text-gray-700">Name of the Student as Per Aadhar</label>
                                  <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                  <label className="text-sm font-bold text-gray-700">Class <span className="text-red-500">*</span></label>
                                  <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                    <option>Select Class</option>
                                  </select>
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                  <label className="text-sm font-bold text-gray-700">Section <span className="text-red-500">*</span></label>
                                  <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                    <option>Select Sect</option>
                                  </select>
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                  <label className="text-sm font-bold text-gray-700">First Name <span className="text-red-500">*</span></label>
                                  <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                  <label className="text-sm font-bold text-gray-700">Middle Name</label>
                                  <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                                </div>
                                
                                <div className="flex flex-col gap-1 w-full">
                                  <label className="text-sm font-bold text-gray-700">Last Name</label>
                                  <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                  <label className="text-sm font-bold text-gray-700">Blood Group</label>
                                  <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                    <option>Select Bloo</option>
                                  </select>
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                  <label className="text-sm font-bold text-gray-700">Board</label>
                                  <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                    <option>up board</option>
                                  </select>
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                  <label className="text-sm font-bold text-gray-700">Adm. No. <span className="text-red-500">*</span></label>
                                  <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                  <label className="text-sm font-bold text-gray-700">Roll No.</label>
                                  <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                  <label className="text-sm font-bold text-gray-700">Bill/GR No.</label>
                                  <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                                </div>

                                <div className="flex flex-col gap-1 w-full">
                                  <label className="text-sm font-bold text-gray-700">TC No.</label>
                                  <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                  <label className="text-sm font-bold text-gray-700">Saral ID.</label>
                                  <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                  <label className="text-sm font-bold text-gray-700">Student Status</label>
                                  <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                    <option>STUDYING</option>
                                  </select>
                                </div>
                                <div className="flex flex-col gap-1 w-full col-span-2">
                                  <label className="text-sm font-bold text-gray-700">Reason</label>
                                  <div className="flex items-center gap-4">
                                     <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                                     <label className="flex items-center gap-1 text-sm text-gray-700 whitespace-nowrap"><input type="checkbox" defaultChecked className="accent-[#32a3d7] w-4 h-4"/> Is Active</label>
                                  </div>
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                  <label className="text-sm font-bold text-gray-700">House</label>
                                  <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                    <option>Select Hou</option>
                                  </select>
                                </div>
                                
                                <div className="flex flex-col gap-1 w-full col-span-2">
                                  <label className="text-sm font-bold text-gray-700">Classification Name</label>
                                  <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-1/2 text-sm">
                                    <option>Select clast</option>
                                  </select>
                                </div>
                                <div className="flex flex-col gap-1 w-full pt-4">
                                  <label className="flex items-center gap-1 text-sm text-gray-700 whitespace-nowrap"><input type="checkbox" className="accent-[#32a3d7] w-4 h-4"/> Is Only Child</label>
                                </div>
                                <div className="flex flex-col gap-1 w-full pt-4 col-span-2">
                                  <label className="text-sm font-bold text-gray-700">Is New</label>
                                  <div className="flex items-center gap-4 mt-1">
                                    <label className="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="is_new" defaultChecked className="accent-[#32a3d7] w-4 h-4"/> Yes</label>
                                    <label className="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="is_new" className="accent-[#32a3d7] w-4 h-4"/> No</label>
                                  </div>
                                </div>
                              </div>
                           </div>
                        </div>

                        <div className="bg-gray-100 p-2 font-bold text-sm text-gray-700 mb-4 border-b border-gray-200">
                          Student Details
                        </div>
                        <div className="px-6 grid grid-cols-7 gap-4 mb-6">
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">DOB <span className="text-red-500">*</span></label>
                             <input type="text" defaultValue="31-Aug-20" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">DOA <span className="text-red-500">*</span></label>
                             <input type="text" defaultValue="31-Aug-20" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">DOJ</label>
                             <input type="text" defaultValue="31-Aug-20" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Admitted Class</label>
                             <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                               <option>Select Class</option>
                             </select>
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Mobile</label>
                             <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Gender</label>
                             <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                               <option>Male</option>
                             </select>
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Place Of Birth</label>
                             <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                           
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Reason of correction DOB</label>
                             <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Email</label>
                             <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Contact Person Name</label>
                             <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Contact Person Email</label>
                             <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Contact Person Mobile</label>
                             <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Secondary Contact No</label>
                             <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                           <div className="flex flex-col gap-1 w-full"></div>

                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Family ID</label>
                             <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">UDISE No.</label>
                             <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">APAAR ID</label>
                             <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">PEN-Permanent Education No.</label>
                             <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">S.R.N./UMRN/SATS No.</label>
                             <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                           <div className="flex flex-col gap-1 w-full items-center">
                             <label className="text-sm font-bold text-gray-700 text-center">Sibling</label>
                             <div className="flex items-center gap-2 mt-1">
                               <label className="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="stud_sibling" className="accent-[#32a3d7] w-4 h-4"/> Yes</label>
                               <label className="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="stud_sibling" defaultChecked className="accent-[#32a3d7] w-4 h-4"/> No</label>
                             </div>
                           </div>
                        </div>

                        <div className="bg-gray-100 p-2 font-bold text-sm text-gray-700 mb-4 border-b border-gray-200">
                          Address
                        </div>
                        <div className="px-6 grid grid-cols-7 gap-4 mb-6">
                           <div className="col-span-1 flex items-center">
                             <label className="text-sm font-bold text-gray-700">Correspondence Address</label>
                           </div>
                           <div className="flex flex-col gap-1 w-full col-span-2">
                             <label className="text-sm font-bold text-gray-700">H.No and Streets <span className="text-red-500">*</span></label>
                             <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                           <div className="flex flex-col gap-1 w-full col-span-2">
                             <label className="text-sm font-bold text-gray-700">City</label>
                             <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">State</label>
                             <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Pin Code</label>
                             <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>

                           <div className="col-span-1 flex items-center">
                             <label className="text-sm font-bold text-gray-700">Permanent Address</label>
                           </div>
                           <div className="flex flex-col gap-1 w-full col-span-2">
                             <div className="flex justify-between items-center">
                               <label className="text-sm font-bold text-gray-700">H.No and Streets</label>
                               <label className="flex items-center gap-1 text-xs text-gray-500"><input type="checkbox" className="accent-[#32a3d7]"/> Same as Correspondence</label>
                             </div>
                             <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                           <div className="flex flex-col gap-1 w-full col-span-2">
                             <label className="text-sm font-bold text-gray-700">City</label>
                             <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">State</label>
                             <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Pin Code</label>
                             <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                        </div>

                        <div className="bg-gray-100 p-2 font-bold text-sm text-gray-700 mb-4 border-b border-gray-200">
                          Other Details
                        </div>
                        <div className="px-6 grid grid-cols-7 gap-4 mb-6">
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Nationality</label>
                             <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                               <option>Indian</option>
                             </select>
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Religion</label>
                             <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                               <option>Select Religion</option>
                             </select>
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Parish</label>
                             <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                               <option>Select Parish</option>
                             </select>
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Caste</label>
                             <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                               <option>Select Caste</option>
                             </select>
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Sub Caste</label>
                             <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                               <option>Select Sub Caste</option>
                             </select>
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Category</label>
                             <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                               <option>Select Category</option>
                             </select>
                           </div>
                           <div className="flex flex-col gap-1 w-full"></div>

                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Dis. Desc.</label>
                             <div className="flex items-center gap-2">
                               <input type="checkbox" className="accent-[#32a3d7] w-4 h-4"/>
                               <span className="text-xs text-gray-500">Is Disability/CWSN</span>
                             </div>
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Transport</label>
                             <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                               <option>N A</option>
                             </select>
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Aadhar Card No</label>
                             <input type="text" placeholder="1234-5678-9012" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                           <div className="flex flex-col gap-1 w-full items-center">
                             <label className="text-sm font-bold text-gray-700 text-center">Is EWS/CWSN</label>
                             <div className="flex items-center gap-2 mt-1">
                               <label className="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="stud_ews" className="accent-[#32a3d7] w-4 h-4"/> Yes</label>
                               <label className="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="stud_ews" defaultChecked className="accent-[#32a3d7] w-4 h-4"/> No</label>
                             </div>
                           </div>
                           <div className="flex flex-col gap-1 w-full justify-end pb-1">
                             <label className="flex items-center gap-2 text-sm text-gray-700"><input type="checkbox" className="accent-[#32a3d7] w-4 h-4"/> Is Minority</label>
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Select Club</label>
                             <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                               <option>Select Club</option>
                             </select>
                           </div>
                           <div className="flex flex-col gap-1 w-full justify-end pb-1">
                             <label className="flex items-center gap-2 text-sm text-gray-700"><input type="checkbox" className="accent-[#32a3d7] w-4 h-4"/> Is Keralite</label>
                           </div>

                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">RFID Card No.</label>
                             <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Select Cadet Type</label>
                             <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                               <option>Select</option>
                             </select>
                           </div>
                           <div className="flex flex-col gap-1 w-full col-span-2">
                             <label className="text-sm font-bold text-gray-700">E-Punjab No./Samagra ID</label>
                             <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                           <div className="flex flex-col gap-1 w-full col-span-2">
                             <label className="text-sm font-bold text-gray-700">ABHA No.</label>
                             <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                           <div className="flex flex-col gap-1 w-full justify-end pb-1">
                             <label className="flex items-center gap-2 text-sm text-gray-700"><input type="checkbox" className="accent-[#32a3d7] w-4 h-4"/> Is RTE</label>
                           </div>
                        </div>

                        <div className="bg-[#32a3d7] text-white p-2 font-bold text-sm flex justify-between items-center mb-6">
                          Parent's Details
                          <button className="text-white hover:text-gray-200"><FaAngleUp /></button>
                        </div>

                        {/* Father's Details */}
                        <div className="bg-gray-100 p-2 font-bold text-sm text-gray-700 mb-4 border-b border-gray-200">
                          Father's Details
                        </div>
                        <div className="px-6 flex gap-6 mb-6">
                           <div className="w-32 flex flex-col items-center">
                              <div className="w-32 h-32 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                                <FaInfoCircle className="text-5xl" />
                              </div>
                           </div>
                           <div className="flex-1 grid grid-cols-4 gap-4">
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Father's Title</label>
                                <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                  <option>Mr.</option>
                                </select>
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Father's Name</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Middle Name</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Last Name</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>

                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Profession</label>
                                <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                  <option>Select Profession</option>
                                </select>
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Profession Details</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Designation</label>
                                <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                  <option>Select Designation</option>
                                </select>
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Designation Details</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>

                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Residence Address</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Office Address</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Email</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Alternate Email</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>

                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">DOB</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Mobile</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Phone</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Company Name</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>

                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Business Details</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Qualification</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Service In</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Office Phone</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>

                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Office Mobile</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Office Extension</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Office Email</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Office Website</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Annual Income</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Parent Status</label>
                                <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                  <option>Select Parent Sta</option>
                                </select>
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Aadhar No.</label>
                                <input type="text" placeholder="1234-5678-9012" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Pan No.</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              
                              <div className="flex flex-col gap-1 w-full justify-end pb-1">
                                <label className="flex items-center gap-2 text-sm text-gray-700"><input type="checkbox" className="accent-[#32a3d7] w-4 h-4"/> Is Alumni</label>
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Batch Year</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full justify-end pb-1">
                                <label className="flex items-center gap-2 text-sm text-gray-700"><input type="checkbox" defaultChecked className="accent-[#32a3d7] w-4 h-4"/> Is alive</label>
                              </div>
                           </div>
                        </div>

                        {/* Mother's Details */}
                        <div className="bg-gray-100 p-2 font-bold text-sm text-gray-700 mb-4 border-b border-gray-200">
                          Mother's Details
                        </div>
                        <div className="px-6 flex gap-6 mb-6">
                           <div className="w-32 flex flex-col items-center">
                              <div className="w-32 h-32 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                                <FaInfoCircle className="text-5xl" />
                              </div>
                           </div>
                           <div className="flex-1 grid grid-cols-4 gap-4">
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Mother's Title</label>
                                <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                  <option>Mrs.</option>
                                </select>
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Mother's Name</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Middle Name</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Last Name</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>

                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Profession</label>
                                <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                  <option>Select Profession</option>
                                </select>
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Profession Details</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Designation</label>
                                <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                  <option>Select Designation</option>
                                </select>
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Designation Details</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>

                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Residence Address</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Office Address</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Email</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Alternate Email</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>

                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">DOB</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Mobile</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Phone</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Company Name</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>

                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Business Details</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Qualification</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Service In</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Office Phone</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>

                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Office Mobile</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Office Extension</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Office Email</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Office Website</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Annual Income</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Anniversary Date</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Aadhar No.</label>
                                <input type="text" placeholder="1234-5678-9012" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Pan No.</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              
                              <div className="flex flex-col gap-1 w-full justify-end pb-1">
                                <label className="flex items-center gap-2 text-sm text-gray-700"><input type="checkbox" className="accent-[#32a3d7] w-4 h-4"/> Is Alumni</label>
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Batch Year</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full justify-end pb-1">
                                <label className="flex items-center gap-2 text-sm text-gray-700"><input type="checkbox" defaultChecked className="accent-[#32a3d7] w-4 h-4"/> Is alive</label>
                              </div>
                           </div>
                        </div>

                        <div className="bg-[#32a3d7] text-white p-2 font-bold text-sm flex justify-between items-center mb-6">
                          Other Details
                          <button className="text-white hover:text-gray-200"><FaAngleUp /></button>
                        </div>
                        
                        <div className="px-6 flex flex-col gap-4 pb-12">
                           <h4 className="text-sm font-bold text-gray-700 border-b border-gray-200 pb-2">Emergency Contact</h4>
                           <div className="grid grid-cols-5 gap-4">
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Person Name</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Mobile Number</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Phone Number</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Address</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Relation</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                           </div>

                           <h4 className="text-sm font-bold text-gray-700 border-b border-gray-200 pb-2 mt-4">Emergency Contact 2</h4>
                           <div className="grid grid-cols-5 gap-4">
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Person Name</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Mobile Number</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Phone Number</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Address</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Relation</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                           </div>
                           <h4 className="text-sm font-bold text-gray-700 border-b border-gray-200 pb-2 mt-4">Student Staff Relation</h4>
                           <div className="grid grid-cols-3 gap-4">
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Staff Ward</label>
                                <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                  <option>All Staff</option>
                                </select>
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Staff Name</label>
                                <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                  <option>Select Staff Name</option>
                                </select>
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">General Description</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                           </div>
                        </div>

                        <div className="bg-[#32a3d7] text-white p-2 font-bold text-sm flex justify-between items-center mb-6">
                          Other Details
                          <button className="text-white hover:text-gray-200"><FaAngleUp /></button>
                        </div>
                        
                        {/* Student Other Details */}
                        <div className="bg-gray-100 p-2 font-bold text-sm text-gray-700 mb-4 border-b border-gray-200">
                          Student Other Details
                        </div>
                        <div className="px-6 grid grid-cols-6 gap-4 mb-6">
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Mother Tongue</label>
                             <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                               <option>Select Mother To</option>
                             </select>
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Domicile State</label>
                             <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Fees No.</label>
                             <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Stream</label>
                             <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                               <option>Select Stream</option>
                             </select>
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Optional Subject</label>
                             <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                               <option>Select Subject</option>
                             </select>
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Boarding/Hostel</label>
                             <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                               <option>No</option>
                             </select>
                           </div>

                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Medical History</label>
                             <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Allergies</label>
                             <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Other Medical Info</label>
                             <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Family Doctor Name</label>
                             <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Family Doctor Mobile</label>
                             <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Family Doctor Address</label>
                             <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>

                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Last Class</label>
                             <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                               <option>Select Class</option>
                             </select>
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Admission Remark</label>
                             <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Food Status</label>
                             <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                               <option>Select</option>
                             </select>
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Previous School TC No.</label>
                             <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Dis(KM) for Residence...</label>
                             <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">States/National Competitions</label>
                             <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                               <option>Select</option>
                             </select>
                           </div>

                           <div className="flex flex-col gap-1 w-full pt-4 col-span-2">
                             <label className="text-sm font-bold text-gray-700">Is NACH/ECS</label>
                             <div className="flex items-center gap-4 mt-1">
                               <label className="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="is_nach" className="accent-[#32a3d7] w-4 h-4"/> Yes</label>
                               <label className="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="is_nach" defaultChecked className="accent-[#32a3d7] w-4 h-4"/> No</label>
                             </div>
                           </div>
                        </div>

                        {/* Previous School Details */}
                        <div className="bg-gray-100 p-2 font-bold text-sm text-gray-700 mb-4 border-b border-gray-200">
                          Previous School Details
                        </div>
                        <div className="px-6 flex flex-col gap-4 mb-6">
                           {[1, 2, 3].map((row) => (
                             <div key={`prev-school-${row}`} className="grid grid-cols-5 gap-4">
                                <div className="flex flex-col gap-1 w-full">
                                  {row === 1 && <label className="text-sm font-bold text-gray-700">School Name</label>}
                                  <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                  {row === 1 && <label className="text-sm font-bold text-gray-700">City</label>}
                                  <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                  {row === 1 && <label className="text-sm font-bold text-gray-700">Class</label>}
                                  <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                  {row === 1 && <label className="text-sm font-bold text-gray-700">Year</label>}
                                  <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                  {row === 1 && <label className="text-sm font-bold text-gray-700">Board</label>}
                                  <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                                </div>
                             </div>
                           ))}
                        </div>

                        {/* Other School Sibling Details */}
                        <div className="bg-gray-100 p-2 font-bold text-sm text-gray-700 mb-4 border-b border-gray-200">
                          Other School Sibling Details
                        </div>
                        <div className="px-6 flex flex-col gap-4 mb-6">
                           {[1, 2, 3].map((row) => (
                             <div key={`sibling-school-${row}`} className="grid grid-cols-5 gap-4">
                                <div className="flex flex-col gap-1 w-full">
                                  {row === 1 && <label className="text-sm font-bold text-gray-700">Full Name</label>}
                                  <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                  {row === 1 && <label className="text-sm font-bold text-gray-700">School Name</label>}
                                  <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                  {row === 1 && <label className="text-sm font-bold text-gray-700">Class</label>}
                                  <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                  {row === 1 && <label className="text-sm font-bold text-gray-700">City</label>}
                                  <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                  {row === 1 && <label className="text-sm font-bold text-gray-700">Board</label>}
                                  <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                                </div>
                             </div>
                           ))}
                        </div>

                        {/* Personal Information */}
                        <div className="bg-[#32a3d7] text-white p-2 font-bold text-sm flex justify-between items-center mb-6">
                          Personal Information
                        </div>
                        <div className="bg-gray-100 p-2 font-bold text-sm text-gray-700 mb-4 border-b border-gray-200">
                          Personal Information
                        </div>
                        <div className="px-6 grid grid-cols-5 gap-4 mb-6">
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Visa Number</label>
                             <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Visa Type</label>
                             <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Visa Issued On</label>
                             <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Visa Valid Till</label>
                             <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Passport No.</label>
                             <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>

                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Issued Country</label>
                             <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">OCI</label>
                             <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">FRRO</label>
                             <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Other Language Known</label>
                             <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Student Status(Active/InActive)</label>
                             <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                               <option>Active</option>
                               <option>InActive</option>
                             </select>
                           </div>
                        </div>

                        {/* Guardian Details Section */}
                        <div className="bg-[#32a3d7] text-white p-2 font-bold text-sm flex justify-between items-center mb-6">
                          Guardian Details
                          <button className="text-white hover:text-gray-200"><FaAngleUp /></button>
                        </div>
                        
                        <div className="bg-gray-100 p-2 font-bold text-sm text-gray-700 mb-4 border-b border-gray-200">
                          Guardian Details
                        </div>
                        <div className="px-6 flex gap-6 mb-6">
                           <div className="w-32 flex flex-col items-center">
                              <div className="w-32 h-32 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                                <FaInfoCircle className="text-5xl" />
                              </div>
                           </div>
                           <div className="flex-1 grid grid-cols-4 gap-4">
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Guardian Title</label>
                                <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                  <option>Mr.</option>
                                </select>
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Guardian Name</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Profession</label>
                                <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                  <option>Select Profes..</option>
                                </select>
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Profession Details</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Designation</label>
                                <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                  <option>Select Designatio</option>
                                </select>
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Residence Address</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Office Address</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Email</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>

                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Alternate Email</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">DOB</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Mobile</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Phone</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>

                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Company Name</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Business Details</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Qualification</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Service In</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>

                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Office Phone</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Office Mobile</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Office Extension</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Office Email</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Office Website</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">Income</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label className="text-sm font-bold text-gray-700">RelationShip</label>
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                              </div>
                           </div>
                        </div>

                        <div className="bg-gray-100 p-2 font-bold text-sm text-gray-700 mb-4 border-b border-gray-200">
                          Secondary Guardian Details
                        </div>
                        <div className="px-6 grid grid-cols-5 gap-4 mb-6">
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Guardian Name</label>
                             <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Mobile</label>
                             <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">RelationShip</label>
                             <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                           </div>
                        </div>

                        <div className="bg-gray-100 p-2 font-bold text-sm text-gray-700 mb-4 border-b border-gray-200">
                          If Single Parent Please Specify
                        </div>
                        <div className="px-6 grid grid-cols-5 gap-4 mb-6">
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Student Lives With</label>
                             <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                               <option>Select</option>
                             </select>
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Legal Custody Of the Child</label>
                             <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                               <option>Select</option>
                             </select>
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Correspondence to</label>
                             <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                               <option>Select</option>
                             </select>
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Check if Applicable</label>
                             <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                               <option>None selected</option>
                             </select>
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Other info or other details</label>
                             <div className="flex gap-4 items-center">
                                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 whitespace-nowrap"><input type="checkbox" defaultChecked className="accent-[#32a3d7] w-4 h-4"/> Is alive</label>
                             </div>
                           </div>
                        </div>

                        <div className="bg-[#32a3d7] text-white p-2 font-bold text-sm flex justify-between items-center mb-6">
                          Documents Details
                          <button className="text-white hover:text-gray-200"><FaAngleUp /></button>
                        </div>
                        <div className="px-6 mb-12">
                           <div className="w-full bg-gray-50 border border-gray-200 h-16 rounded mb-8"></div>
                           
                           <div className="flex justify-center gap-4 w-full">
                             <button className="bg-white border border-[#5cdb95] text-[#5cdb95] hover:bg-[#5cdb95] hover:text-white px-6 py-2 rounded text-sm font-bold shadow-sm flex items-center gap-2 transition-colors">
                               <FaSave /> Save
                             </button>
                             <button className="bg-white border border-[#32a3d7] text-[#32a3d7] hover:bg-[#32a3d7] hover:text-white px-6 py-2 rounded text-sm font-bold shadow-sm flex items-center gap-2 transition-colors">
                               <FaEye /> View
                             </button>
                             <button className="bg-white border border-[#32a3d7] text-[#32a3d7] hover:bg-[#32a3d7] hover:text-white px-6 py-2 rounded text-sm font-bold shadow-sm flex items-center gap-2 transition-colors">
                               <FaPrint /> Print
                             </button>
                             <button className="bg-white border border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white px-6 py-2 rounded text-sm font-bold shadow-sm flex items-center gap-2 transition-colors">
                               <FaTimesCircle /> Reset
                             </button>
                           </div>
                        </div>

                      </div>
                    ) : activeTab === 'DOB Request' ? (
                      <div className="flex flex-col h-full bg-white">
                        <div className="p-4 border-b border-gray-200">
                           <div className="flex gap-4 items-end max-w-sm">
                             <div className="flex flex-col gap-1 w-full">
                               <label className="text-sm font-bold text-gray-700">Class</label>
                               <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                 <option>Rejected</option>
                               </select>
                             </div>
                             <button className="bg-[#32a3d7] text-white px-4 py-1.5 rounded text-sm font-bold flex items-center gap-2 whitespace-nowrap h-[34px]">
                               <FaEye /> Get Detail
                             </button>
                           </div>
                        </div>
                        <div className="p-4 overflow-auto flex-1">
                          <table className="w-full text-sm text-left text-gray-500 border border-gray-200">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                              <tr>
                                <th className="px-6 py-3">Sr.No.</th>
                                <th className="px-6 py-3">Stu Name</th>
                                <th className="px-6 py-3">Admission No</th>
                                <th className="px-6 py-3">Old DOB</th>
                                <th className="px-6 py-3">New DOB</th>
                                <th className="px-6 py-3">Request Status</th>
                                <th className="px-6 py-3">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td colSpan="7" className="px-6 py-3 text-center bg-[#f0f9fb]">No data available in table</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : activeTab === 'Download Photos' ? (
                      <div className="flex gap-4 h-full bg-white">
                        <div className="w-80 border-r border-gray-200 p-4 flex flex-col gap-4">
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Class</label>
                             <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                               <option>NUR-A</option>
                             </select>
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                             <label className="text-sm font-bold text-gray-700">Photo Type</label>
                             <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                               <option>Student</option>
                             </select>
                           </div>
                           <div className="flex flex-col gap-2 mt-2 w-full">
                             <label className="text-sm font-bold text-gray-700">Select Size</label>
                             <div className="flex flex-col gap-1">
                               <label className="flex items-center gap-2 text-sm text-gray-700"><input type="radio" name="photo_size" className="accent-[#32a3d7] w-4 h-4"/> I-Card Size - 216 x 253</label>
                               <label className="flex items-center gap-2 text-sm text-gray-700"><input type="radio" name="photo_size" className="accent-[#32a3d7] w-4 h-4"/> Original Size - 432 x 506</label>
                               <label className="flex items-center gap-2 text-sm text-gray-700"><input type="radio" name="photo_size" className="accent-[#32a3d7] w-4 h-4"/> Full Size - 136 x 159</label>
                               <label className="flex items-center gap-2 text-sm text-gray-700"><input type="radio" name="photo_size" defaultChecked className="accent-[#32a3d7] w-4 h-4"/> Thumbs Size - 63 x 74</label>
                             </div>
                           </div>
                           <div className="flex flex-col gap-2 mt-2 w-full">
                             <label className="text-sm font-bold text-gray-700">Photo Download with</label>
                             <div className="flex flex-col gap-1">
                               <label className="flex items-center gap-2 text-sm text-gray-700"><input type="radio" name="dl_with" defaultChecked className="accent-[#32a3d7] w-4 h-4"/> Photo Id</label>
                               <label className="flex items-center gap-2 text-sm text-gray-700"><input type="radio" name="dl_with" className="accent-[#32a3d7] w-4 h-4"/> Admission No.</label>
                               <label className="flex items-center gap-2 text-sm text-gray-700"><input type="radio" name="dl_with" className="accent-[#32a3d7] w-4 h-4"/> Student Name</label>
                               <label className="flex items-center gap-2 text-sm text-gray-700"><input type="radio" name="dl_with" className="accent-[#32a3d7] w-4 h-4"/> Roll No.</label>
                               <label className="flex items-center gap-2 text-sm text-gray-700"><input type="radio" name="dl_with" className="accent-[#32a3d7] w-4 h-4"/> Admission No. with Name</label>
                             </div>
                           </div>
                           <div className="text-sm font-bold text-gray-700 mt-2">
                             Note- Replace the backslash (/) in the Admission No with a dash (-)
                           </div>
                        </div>
                        <div className="flex-1 p-4 overflow-auto">
                          <div className="font-bold text-sm text-gray-700 mb-4 border-b border-gray-200 pb-2">Class :NUR-A</div>
                          <div className="grid grid-cols-7 gap-2 border border-gray-200 p-2">
                             {Array.from({length: 35}).map((_, i) => (
                               <div key={i} className="w-16 h-20 bg-gray-200 border border-gray-300 flex items-center justify-center">
                                 <span className="text-xs text-gray-400">🖼️</span>
                               </div>
                             ))}
                          </div>
                        </div>
                      </div>
                    ) : activeTab === 'Update Student Details' ? (
                      <div className="flex flex-col h-full bg-white">
                        <div className="p-4 border-b border-gray-200">
                           <div className="flex gap-4 items-end">
                             <div className="flex flex-col gap-1 w-64">
                               <label className="text-sm font-bold text-gray-700">Class</label>
                               <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                 <option>UKG</option>
                               </select>
                             </div>
                             <div className="flex flex-col gap-1 w-64">
                               <label className="text-sm font-bold text-gray-700">Section</label>
                               <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                 <option>A</option>
                               </select>
                             </div>
                             <div className="flex flex-col gap-1 w-64">
                               <label className="text-sm font-bold text-gray-700">Field</label>
                               <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                 <option>Aadhar Card No.</option>
                               </select>
                             </div>
                           </div>
                           <div className="flex gap-4 items-end mt-4 max-w-xl">
                             <div className="flex flex-col gap-1 w-64">
                               <label className="text-sm font-bold text-gray-700">Order By</label>
                               <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                 <option>Default(First Name)</option>
                               </select>
                             </div>
                           </div>
                           <div className="flex justify-center mt-6">
                             <button className="bg-[#32a3d7] text-white px-6 py-1.5 rounded text-sm font-bold flex items-center gap-2">
                               <FaSync /> Update
                             </button>
                           </div>
                        </div>
                        <div className="p-4 overflow-auto flex-1">
                          <h4 className="font-bold text-sm text-gray-700 mb-2">STUDENT LIST</h4>
                          <table className="w-full text-sm text-left text-gray-500 border border-gray-200">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                              <tr>
                                <th className="px-4 py-2">Adm. No.</th>
                                <th className="px-4 py-2">Student Name</th>
                                <th className="px-4 py-2">Father's Name</th>
                                <th className="px-4 py-2">Mother's Name</th>
                                <th className="px-4 py-2">Aadhar Card No.</th>
                              </tr>
                            </thead>
                            <tbody>
                              {[
                                { adm: '1808', name: 'ABHINANDAN SINGH', father: 'MANOJ KUMAR SINGH', mother: 'CHANDRAKALA SINGH', aadhar: '774495210916' },
                                { adm: '1833', name: 'AKIRITI GUPTA', father: 'ASHISH GUPTA', mother: 'RADHA GUPTA', aadhar: '' },
                                { adm: '1735', name: 'ARAV', father: 'RAVI YADAV', mother: 'ANUPAM YADAV', aadhar: '' },
                                { adm: '2230', name: 'AYANSH KUMAR', father: 'AKHILESH KUMAR', mother: 'SAVITA DEVI', aadhar: '' },
                                { adm: '1350', name: 'AYUSH', father: 'JAY SINGH', mother: 'REENA DEVI', aadhar: '' },
                                { adm: '2205', name: 'DAKSH GUPTA', father: 'ARUN KUMAR GUPTA', mother: 'SITA GUPTA', aadhar: '' }
                              ].map((row, i) => (
                                 <tr key={i} className="border-b">
                                   <td className="px-4 py-2">{row.adm}</td>
                                   <td className="px-4 py-2">{row.name}</td>
                                   <td className="px-4 py-2">{row.father}</td>
                                   <td className="px-4 py-2">{row.mother}</td>
                                   <td className="px-4 py-2">
                                     <input type="text" defaultValue={row.aadhar} className="border border-gray-300 rounded px-2 py-1 w-full text-sm outline-none focus:border-[#32a3d7]"/>
                                   </td>
                                 </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : activeTab === 'Set Student Status' ? (
                      <div className="flex flex-col h-full bg-white">
                        <div className="p-4 border-b border-gray-200">
                           <div className="flex gap-4 items-end">
                             <div className="flex flex-col gap-1 w-96">
                               <label className="text-sm font-bold text-gray-700">Class</label>
                               <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                 <option>NUR</option>
                               </select>
                             </div>
                             <div className="flex flex-col gap-1 w-96">
                               <label className="text-sm font-bold text-gray-700">Section</label>
                               <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                 <option>All Section</option>
                               </select>
                             </div>
                           </div>
                           <div className="flex justify-center mt-6">
                             <button className="bg-[#5cdb95] text-white px-6 py-1.5 rounded text-sm font-bold flex items-center gap-2 shadow-sm">
                               <FaSave /> Save
                             </button>
                           </div>
                        </div>
                        <div className="p-4 overflow-auto flex-1">
                          <h4 className="font-bold text-sm text-gray-700 mb-2">Student List</h4>
                          <table className="w-full text-sm text-left text-gray-500 border border-gray-200">
                            <thead className="text-xs text-gray-700 uppercase bg-[#f0f9fb] border-b">
                              <tr>
                                <th className="px-4 py-2">Sr. No.</th>
                                <th className="px-4 py-2">Adm No.</th>
                                <th className="px-4 py-2">Student Name</th>
                                <th className="px-4 py-2">Father Name</th>
                                <th className="px-4 py-2 text-center">Student Status(Is New)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {[
                                { sr: 1, adm: '2261', name: 'ABHYANT GUPTA', father: 'ASHOK KUMAR GUPTA', new: true },
                                { sr: 2, adm: '2228', name: 'ADVIK KUMAR', father: 'ANGAD KUMAR', new: true },
                                { sr: 3, adm: '2512', name: 'ANKITA CHAUHAN', father: 'PAPPU CHAUHAN', new: true },
                                { sr: 4, adm: '2203', name: 'ANVI MAURYA', father: 'ARVIND KUMAR MAURYA', new: true },
                                { sr: 5, adm: '2515', name: 'ARADHYA GOND', father: 'RAMCHANDAR', new: true },
                                { sr: 6, adm: '1770', name: 'ARNAV GUPTA', father: 'HANUMAN GUPTA', new: false },
                                { sr: 7, adm: '2312', name: 'ARPITA MAURYA', father: 'SUJEET MAURYA', new: true },
                                { sr: 8, adm: '2361', name: 'AYANASH RAI', father: 'SHASHANK RAI', new: true }
                              ].map((row, i) => (
                                 <tr key={i} className="border-b hover:bg-gray-50">
                                   <td className="px-4 py-2">{row.sr}</td>
                                   <td className="px-4 py-2">{row.adm}</td>
                                   <td className="px-4 py-2">{row.name}</td>
                                   <td className="px-4 py-2">{row.father}</td>
                                   <td className="px-4 py-2 text-center">
                                     <input type="checkbox" defaultChecked={row.new} className="accent-[#32a3d7] w-4 h-4"/>
                                   </td>
                                 </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : activeTab === 'Change Active/Inactive Status' ? (
                      <div className="flex flex-col h-full bg-white">
                        <div className="p-4 border-b border-gray-200">
                           <div className="flex gap-4 items-end justify-center">
                             <div className="flex flex-col gap-1 w-48">
                               <label className="text-sm font-bold text-gray-700">Class</label>
                               <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                 <option>NUR</option>
                               </select>
                             </div>
                             <div className="flex flex-col gap-1 w-48">
                               <label className="text-sm font-bold text-gray-700">Section</label>
                               <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                 <option>A</option>
                               </select>
                             </div>
                             <div className="flex flex-col gap-1 w-48">
                               <label className="text-sm font-bold text-gray-700">Order By</label>
                               <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                 <option>Admission numb</option>
                               </select>
                             </div>
                           </div>
                           <div className="flex justify-center mt-4">
                             <button className="bg-white border border-[#32a3d7] text-[#32a3d7] hover:bg-[#32a3d7] hover:text-white px-6 py-1.5 rounded text-sm font-bold flex items-center gap-2 shadow-sm transition-colors">
                               <FaSync /> Update
                             </button>
                           </div>
                        </div>
                        <div className="p-4 overflow-auto flex-1">
                          <h4 className="font-bold text-sm text-gray-700 mb-2 uppercase">STUDENT LIST</h4>
                          <table className="w-full text-sm text-left text-gray-500 border border-gray-200">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                              <tr>
                                <th className="px-4 py-2">Select</th>
                                <th className="px-4 py-2">Sr. No.</th>
                                <th className="px-4 py-2">ADMISSION NO.</th>
                                <th className="px-4 py-2">RollNo</th>
                                <th className="px-4 py-2">Student Name</th>
                                <th className="px-4 py-2">Father Name</th>
                                <th className="px-4 py-2 text-center">Set Active/Inactive</th>
                                <th className="px-4 py-2">Modify Active/Inactive Date</th>
                                <th className="px-4 py-2">Modify Active/Inactive Reason</th>
                              </tr>
                            </thead>
                            <tbody>
                              {[
                                { sr: 1, adm: '1770', roll: '1', name: 'ARNAV GUPTA', father: 'HANUMAN GUPTA', date: '31-Aug-2026' },
                                { sr: 2, adm: '1850', roll: '39', name: 'SATVIK JAISWAL', father: 'SANJAY', date: '31-Aug-2026' },
                                { sr: 3, adm: '1858', roll: '42', name: 'KARTIK MADDHESIYA', father: 'ATUL MADDHESIYA', date: '31-Aug-2026' },
                                { sr: 4, adm: '2203', roll: '2', name: 'ANVI MAURYA', father: 'ARVIND KUMAR MAURYA', date: '31-Aug-2026' },
                                { sr: 5, adm: '2206', roll: '3', name: 'SHANVI YADAV', father: 'ANUP YADAV', date: '31-Aug-2026' },
                                { sr: 6, adm: '2219', roll: '4', name: 'DIVYA', father: 'DINESH KUMAR', date: '08-May-2026' },
                                { sr: 7, adm: '2221', roll: '5', name: 'PRABHAS SAHANI', father: 'RAVI KUMAR', date: '31-Aug-2026' },
                                { sr: 8, adm: '2224', roll: '6', name: 'GAUNIK RAI', father: 'GAURAV RAI', date: '31-Aug-2026' }
                              ].map((row, i) => (
                                 <tr key={i} className="border-b hover:bg-gray-50">
                                   <td className="px-4 py-2"><input type="checkbox" className="accent-[#32a3d7] w-4 h-4"/></td>
                                   <td className="px-4 py-2">{row.sr}</td>
                                   <td className="px-4 py-2">{row.adm}</td>
                                   <td className="px-4 py-2">{row.roll}</td>
                                   <td className="px-4 py-2">{row.name}</td>
                                   <td className="px-4 py-2">{row.father}</td>
                                   <td className="px-4 py-2 text-center">
                                     <input type="checkbox" defaultChecked className="accent-[#32a3d7] w-4 h-4"/>
                                   </td>
                                   <td className="px-4 py-2">
                                     <input type="text" defaultValue={row.date} className="border border-gray-300 rounded px-2 py-1 w-full text-sm outline-none focus:border-[#32a3d7]"/>
                                   </td>
                                   <td className="px-4 py-2">
                                     <input type="text" className="border border-gray-300 rounded px-2 py-1 w-full text-sm outline-none focus:border-[#32a3d7]"/>
                                   </td>
                                 </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : activeTab === 'Assign Computer No. To Student' ? (
                      <div className="flex flex-col h-full bg-white">
                        <div className="p-4 border-b border-gray-200">
                           <div className="flex gap-4 items-end">
                             <div className="flex flex-col gap-1 w-full max-w-4xl">
                               <label className="text-sm font-bold text-gray-700">Select Class & Section</label>
                               <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                 <option>NUR-A</option>
                               </select>
                             </div>
                           </div>
                           <div className="flex justify-center mt-6 gap-2">
                             <button className="bg-[#32a3d7] text-white px-6 py-1.5 rounded text-sm font-bold flex items-center gap-2 shadow-sm">
                               <FaEdit /> Assign
                             </button>
                             <button className="bg-[#f0ad4e] text-white px-6 py-1.5 rounded text-sm font-bold flex items-center gap-2 shadow-sm">
                               <FaTimesCircle /> Reset
                             </button>
                           </div>
                           <div className="flex justify-between items-center mt-6 max-w-4xl">
                             <div className="font-bold text-sm text-gray-700">Student List</div>
                             <div className="flex items-center gap-2">
                               <label className="text-sm font-bold text-gray-700">Auto Assign No.</label>
                               <input type="text" defaultValue="0" className="border border-gray-300 rounded px-3 py-1 w-24 text-sm outline-none focus:border-[#32a3d7]" />
                             </div>
                             <button className="bg-white border border-[#32a3d7] text-[#32a3d7] hover:bg-[#32a3d7] hover:text-white px-6 py-1.5 rounded text-sm font-bold flex items-center gap-2 transition-colors">
                               <FaEdit /> Auto Assign
                             </button>
                           </div>
                           <div className="mt-4 flex items-center gap-2 max-w-4xl">
                             <label className="text-sm font-bold text-gray-700">Search:</label>
                             <input type="text" className="border border-gray-300 rounded-full px-3 py-1 w-64 text-sm outline-none focus:border-[#32a3d7]" />
                           </div>
                        </div>
                        <div className="p-4 overflow-auto flex-1">
                          <table className="w-full text-sm text-left text-gray-500 border border-gray-200">
                            <thead className="text-xs text-gray-700 uppercase bg-[#f0f9fb] border-b">
                              <tr>
                                <th className="px-4 py-2">Sr. No</th>
                                <th className="px-4 py-2">Admission No.</th>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Father Name</th>
                                <th className="px-4 py-2">Computer No.</th>
                                <th className="px-4 py-2">Assign</th>
                              </tr>
                            </thead>
                            <tbody>
                              {[
                                { sr: 1, adm: '2261', name: 'ABHYANT GUPTA', father: 'ASHOK KUMAR GUPTA' },
                                { sr: 2, adm: '2228', name: 'ADVIK KUMAR', father: 'ANGAD KUMAR' },
                                { sr: 3, adm: '2512', name: 'ANKITA CHAUHAN', father: 'PAPPU CHAUHAN' },
                                { sr: 4, adm: '2203', name: 'ANVI MAURYA', father: 'ARVIND KUMAR MAURYA' },
                                { sr: 5, adm: '2515', name: 'ARADHYA GOND', father: 'RAMCHANDAR' },
                                { sr: 6, adm: '1770', name: 'ARNAV GUPTA', father: 'HANUMAN GUPTA' }
                              ].map((row, i) => (
                                 <tr key={i} className="border-b hover:bg-gray-50">
                                   <td className="px-4 py-2">{row.sr}</td>
                                   <td className="px-4 py-2">{row.adm}</td>
                                   <td className="px-4 py-2">{row.name}</td>
                                   <td className="px-4 py-2">{row.father}</td>
                                   <td className="px-4 py-2">
                                     <input type="text" className="border border-gray-300 rounded px-2 py-1 w-full text-sm outline-none focus:border-[#32a3d7]"/>
                                   </td>
                                   <td className="px-4 py-2"></td>
                                 </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : activeTab === 'Assign Roll No. To Student' ? (
                      <div className="flex flex-col h-full bg-white">
                        <div className="p-4 border-b border-gray-200">
                           <div className="flex gap-4 items-end">
                             <div className="flex flex-col gap-1 w-1/2">
                               <label className="text-sm font-bold text-gray-700">Class</label>
                               <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                 <option>NUR</option>
                               </select>
                             </div>
                             <div className="flex flex-col gap-1 w-1/2">
                               <label className="text-sm font-bold text-gray-700">Section</label>
                               <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                 <option>A</option>
                               </select>
                             </div>
                           </div>
                           <div className="flex gap-4 items-end mt-4">
                             <div className="flex flex-col gap-1 w-1/2">
                               <label className="text-sm font-bold text-gray-700">Select Order</label>
                               <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                 <option>Roll Number(Asc)</option>
                               </select>
                             </div>
                             <div className="flex flex-col gap-1 w-1/2 justify-end pb-1.5">
                               <label className="flex items-center gap-2 text-sm font-bold text-gray-700"><input type="checkbox" className="accent-[#32a3d7] w-4 h-4"/> Auto Assign</label>
                             </div>
                           </div>
                           <div className="flex justify-center mt-6">
                             <button className="bg-[#32a3d7] text-white px-6 py-1.5 rounded text-sm font-bold flex items-center gap-2 shadow-sm">
                               <FaSync /> Update
                             </button>
                           </div>
                        </div>
                        <div className="p-4 overflow-auto flex-1">
                          <h4 className="font-bold text-sm text-gray-700 mb-2">Student List</h4>
                          <table className="w-full text-sm text-left text-gray-500 border border-gray-200">
                            <thead className="text-xs text-gray-700 bg-gray-50 border-b">
                              <tr>
                                <th className="px-4 py-2">Sr. No</th>
                                <th className="px-4 py-2">Admission No.</th>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">father Name</th>
                                <th className="px-4 py-2">Roll No.</th>
                              </tr>
                            </thead>
                            <tbody>
                              {[
                                { sr: 1, adm: '1770', name: 'ARNAV GUPTA', father: 'HANUMAN GUPTA', roll: '1' },
                                { sr: 2, adm: '2203', name: 'ANVI MAURYA', father: 'ARVIND KUMAR MAURYA', roll: '2' },
                                { sr: 3, adm: '2206', name: 'SHANVI YADAV', father: 'ANUP YADAV', roll: '3' },
                                { sr: 4, adm: '2219', name: 'DIVYA', father: 'DINESH KUMAR', roll: '4' },
                                { sr: 5, adm: '2221', name: 'PRABHAS SAHANI', father: 'RAVI KUMAR', roll: '5' }
                              ].map((row, i) => (
                                 <tr key={i} className="border-b hover:bg-gray-50">
                                   <td className="px-4 py-2">{row.sr}</td>
                                   <td className="px-4 py-2">{row.adm}</td>
                                   <td className="px-4 py-2">{row.name}</td>
                                   <td className="px-4 py-2">{row.father}</td>
                                   <td className="px-4 py-2">
                                     <input type="text" defaultValue={row.roll} className="border border-gray-300 rounded px-2 py-1 w-full max-w-[100px] text-sm outline-none focus:border-[#32a3d7]"/>
                                   </td>
                                 </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : activeTab === 'Upload Student Document' ? (
                      <div className="flex gap-4 h-full bg-white p-4">
                        <div className="w-64 bg-gray-50 p-4 border border-gray-200 rounded flex flex-col items-center">
                          <div className="w-32 h-40 border border-gray-300 bg-white flex items-center justify-center mb-4">
                            <div className="text-center">
                              <div className="text-red-300 text-6xl mb-2">🛡️</div>
                              <div className="text-sm font-bold text-gray-700">No Image Available</div>
                            </div>
                          </div>
                          <div className="w-full flex flex-col gap-4 text-sm font-bold text-gray-700">
                            <div>Name:</div>
                            <div>Address:</div>
                            <div>Father's Name:</div>
                            <div>Mother's Name:</div>
                            <div>Contact No.:</div>
                            <div>Admission No.:</div>
                          </div>
                        </div>
                        <div className="flex-1 flex flex-col gap-6">
                          <div className="flex gap-2 p-4 border border-gray-200 bg-gray-50 rounded items-center">
                            <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] text-sm bg-white">
                              <option>All Class</option>
                            </select>
                            <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] text-sm bg-white">
                              <option>All Section</option>
                            </select>
                            <input type="text" className="border border-gray-300 rounded px-3 py-1.5 flex-1 text-sm outline-none focus:border-[#32a3d7]" />
                            <button className="bg-[#32a3d7] text-white px-4 py-1.5 rounded text-sm font-bold flex items-center gap-2">
                              <FaSearch /> Search
                            </button>
                          </div>
                          
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-gray-700">File Upload</label>
                            <div className="flex gap-4 items-center">
                              <div className="flex">
                                <input type="text" readOnly className="border border-gray-300 rounded-l px-3 py-1.5 text-sm bg-white outline-none w-64" />
                                <button className="bg-gray-200 border border-gray-300 border-l-0 rounded-r px-4 py-1.5 text-sm text-gray-700">Select file</button>
                              </div>
                              <button className="bg-white border border-[#32a3d7] text-[#32a3d7] px-4 py-1.5 rounded text-sm flex items-center gap-2 hover:bg-[#32a3d7] hover:text-white transition-colors">
                                <FaSearch /> Verify Document
                              </button>
                            </div>
                          </div>

                          <table className="w-full text-sm text-left text-gray-500 border border-gray-200 mt-2">
                            <thead className="text-xs text-gray-700 bg-gray-50 border-b">
                              <tr>
                                <th className="px-4 py-2">Sr.No.</th>
                                <th className="px-4 py-2">Document Photo</th>
                                <th className="px-4 py-2">Document Type</th>
                                <th className="px-4 py-2">Remove</th>
                                <th className="px-4 py-2">Select</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td colSpan="5" className="px-4 py-3 text-center bg-[#f0f9fb]">No data available in table</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : activeTab === 'Student Bank Details' ? (
                      <div className="flex gap-4 h-full bg-white p-4">
                        <div className="w-64 bg-gray-50 p-4 border border-gray-200 rounded flex flex-col items-center">
                          <div className="w-32 h-40 border border-gray-300 bg-gray-200 flex items-center justify-center mb-4">
                            <FaUser className="text-gray-400 text-6xl" />
                          </div>
                          <div className="w-full flex flex-col gap-4 text-sm font-bold text-gray-700">
                            <div>Name:</div>
                            <div>Address:</div>
                            <div>Father's Name:</div>
                            <div>Admission No.:</div>
                            <div>Class:</div>
                          </div>
                        </div>
                        <div className="flex-1 flex flex-col">
                          <div className="flex gap-2 mb-6 items-center border-b border-gray-200 pb-4">
                            <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] text-sm bg-white w-48">
                              <option>All Classes</option>
                            </select>
                            <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] text-sm bg-white w-48">
                              <option>Select Section</option>
                            </select>
                            <input type="text" className="border border-gray-300 rounded px-3 py-1.5 flex-1 text-sm outline-none focus:border-[#32a3d7]" />
                            <button className="bg-white border border-[#32a3d7] text-[#32a3d7] px-4 py-1.5 rounded text-sm font-bold flex items-center gap-2 hover:bg-[#32a3d7] hover:text-white transition-colors">
                              <FaSearch /> Search
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-x-8 gap-y-6 overflow-auto pr-4 pb-16">
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-sm font-bold text-gray-700">Bank Name</label>
                              <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-sm font-bold text-gray-700">Bank Branch Name</label>
                              <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-sm font-bold text-gray-700">Bank Account No.</label>
                              <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-sm font-bold text-gray-700">IFSC Code</label>
                              <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-sm font-bold text-gray-700">MICR Code</label>
                              <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-sm font-bold text-gray-700">Passport Validity</label>
                              <input type="text" defaultValue="31-Aug-2026" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-sm font-bold text-gray-700">Parent Bank Name</label>
                              <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-sm font-bold text-gray-700">Parent Bank Branch Name</label>
                              <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-sm font-bold text-gray-700">Parent Bank Account No.</label>
                              <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-sm font-bold text-gray-700">Parent IFSC Code</label>
                              <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-sm font-bold text-gray-700">Parent MICR Code</label>
                              <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                            </div>
                          </div>
                          
                          <div className="flex gap-2 justify-end pt-4 border-t border-gray-200 mt-auto">
                             <button className="bg-white border border-[#5cdb95] text-[#5cdb95] px-4 py-1.5 rounded text-sm font-bold flex items-center gap-2 hover:bg-[#5cdb95] hover:text-white transition-colors">
                               <FaSave /> Save
                             </button>
                             <button className="bg-white border border-[#32a3d7] text-[#32a3d7] px-4 py-1.5 rounded text-sm font-bold flex items-center gap-2 hover:bg-[#32a3d7] hover:text-white transition-colors">
                               <FaEye /> View
                             </button>
                             <button className="bg-white border border-[#6b5b95] text-[#6b5b95] px-4 py-1.5 rounded text-sm font-bold flex items-center gap-2 hover:bg-[#6b5b95] hover:text-white transition-colors">
                               <FaPrint /> Print
                             </button>
                             <button className="bg-white border border-[#f0ad4e] text-[#f0ad4e] px-4 py-1.5 rounded text-sm font-bold flex items-center gap-2 hover:bg-[#f0ad4e] hover:text-white transition-colors">
                               <FaTimesCircle /> Reset
                             </button>
                          </div>
                        </div>
                      </div>
                    ) : activeTab === 'Student Last Exam Details' ? (
                      <div className="flex gap-4 h-full bg-white p-4">
                        <div className="w-64 bg-gray-50 p-4 border border-gray-200 rounded flex flex-col items-center">
                          <div className="w-32 h-40 border border-gray-300 bg-gray-200 flex items-center justify-center mb-4">
                            <FaUser className="text-gray-400 text-6xl" />
                          </div>
                          <div className="w-full flex flex-col gap-4 text-sm font-bold text-gray-700">
                            <div>Name:</div>
                            <div>Address:</div>
                            <div>Father's Name:</div>
                            <div>Admission No.:</div>
                            <div>Class:</div>
                          </div>
                        </div>
                        <div className="flex-1 flex flex-col">
                          <div className="flex gap-2 mb-6 items-center border-b border-gray-200 pb-4">
                            <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] text-sm bg-white w-48">
                              <option>All Classes</option>
                            </select>
                            <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] text-sm bg-white w-48">
                              <option>Select Section</option>
                            </select>
                            <input type="text" className="border border-gray-300 rounded px-3 py-1.5 flex-1 text-sm outline-none focus:border-[#32a3d7]" />
                            <button className="bg-white border border-[#32a3d7] text-[#32a3d7] px-4 py-1.5 rounded text-sm font-bold flex items-center gap-2 hover:bg-[#32a3d7] hover:text-white transition-colors">
                              <FaSearch /> Search
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-x-8 gap-y-6 overflow-auto pr-4 pb-16">
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-sm font-bold text-gray-700 uppercase">BOARD ROLL NUMBER</label>
                              <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-sm font-bold text-gray-700">Remark</label>
                              <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                            </div>
                            {[1, 2, 3, 4, 5, 6, 7].map(num => (
                              <React.Fragment key={num}>
                                <div className="flex flex-col gap-1 w-full">
                                  <label className="text-sm font-bold text-gray-700">Subject {num}</label>
                                  <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                  <label className="text-sm font-bold text-gray-700">Marks Subject {num}</label>
                                  <input type="text" className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" />
                                </div>
                              </React.Fragment>
                            ))}
                          </div>
                          
                          <div className="flex gap-2 justify-end pt-4 border-t border-gray-200 mt-auto">
                             <button className="bg-white border border-gray-300 text-gray-700 px-6 py-1.5 rounded text-sm hover:bg-gray-50 transition-colors">
                               Save/Update
                             </button>
                          </div>
                        </div>
                      </div>
                    ) : activeTab === 'Student Class Promotion' ? (
                      <div className="flex flex-col h-full bg-white">
                        <div className="p-4 border-b border-gray-200">
                           <div className="flex gap-4 items-end">
                             <div className="flex flex-col gap-1 w-1/5">
                               <label className="text-sm font-bold text-gray-700">Class</label>
                               <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                 <option>NUR</option>
                               </select>
                             </div>
                             <div className="flex flex-col gap-1 w-1/5">
                               <label className="text-sm font-bold text-gray-700">Section</label>
                               <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                 <option>A</option>
                               </select>
                             </div>
                             <div className="flex flex-col gap-1 w-1/5">
                               <label className="text-sm font-bold text-gray-700">Gender</label>
                               <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                 <option>All</option>
                               </select>
                             </div>
                             <div className="flex flex-col gap-1 w-1/5">
                               <label className="text-sm font-bold text-gray-700">Current Session</label>
                               <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                 <option>2026-2027</option>
                               </select>
                             </div>
                             <div className="flex flex-col gap-1 w-1/5">
                               <label className="text-sm font-bold text-gray-700">Next Session</label>
                               <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                 <option>2026-2027</option>
                               </select>
                             </div>
                           </div>
                           <div className="flex justify-center mt-6">
                             <button className="bg-[#32a3d7] text-white px-6 py-1.5 rounded text-sm font-bold flex items-center gap-2 shadow-sm hover:bg-[#288ebf]">
                               <FaSync /> Update
                             </button>
                           </div>
                        </div>
                        <div className="p-4 overflow-auto flex-1">
                          <div className="mb-2">
                            <button className="text-green-600 hover:text-green-700"><FaFileAlt className="text-xl" /></button>
                          </div>
                          <table className="w-full text-sm text-left text-gray-500 border border-gray-200">
                            <thead className="text-xs text-gray-700 font-bold bg-white border-b">
                              <tr>
                                <th className="px-4 py-4">Sr. No.</th>
                                <th className="px-4 py-4"><input type="checkbox" className="w-4 h-4 accent-[#32a3d7]"/></th>
                                <th className="px-4 py-4">Adm No</th>
                                <th className="px-4 py-4">Roll No</th>
                                <th className="px-4 py-4">Bill No</th>
                                <th className="px-4 py-4">Student Name</th>
                                <th className="px-4 py-4">Father Name</th>
                                <th className="px-4 py-4">Assigned Class</th>
                                <th className="px-4 py-4">Assigned Section</th>
                                <th className="px-4 py-2">
                                   <div className="flex flex-col gap-1 items-center">
                                     <select className="border border-gray-300 rounded px-2 py-0.5 text-xs w-20"><option>NUR</option></select>
                                     <span>New Class</span>
                                   </div>
                                </th>
                                <th className="px-4 py-2">
                                   <div className="flex flex-col gap-1 items-center">
                                     <select className="border border-gray-300 rounded px-2 py-0.5 text-xs w-16"><option>A</option></select>
                                     <span>New Section</span>
                                   </div>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {[
                                { sr: 1, adm: '1770', roll: '1', name: 'ARNAV GUPTA', father: 'HANUMAN GUPTA', class: 'NUR', sec: 'A' },
                                { sr: 2, adm: '2203', roll: '2', name: 'ANVI MAURYA', father: 'ARVIND KUMAR MAURYA', class: 'NUR', sec: 'A' },
                                { sr: 3, adm: '2206', roll: '3', name: 'SHANVI YADAV', father: 'ANUP YADAV', class: 'NUR', sec: 'A' },
                                { sr: 4, adm: '2219', roll: '4', name: 'DIVYA', father: 'DINESH KUMAR', class: 'NUR', sec: 'A' },
                                { sr: 5, adm: '2221', roll: '5', name: 'PRABHAS SAHANI', father: 'RAVI KUMAR', class: 'NUR', sec: 'A' },
                                { sr: 6, adm: '2224', roll: '6', name: 'GAUNIK RAI', father: 'GAURAV RAI', class: 'NUR', sec: 'A' }
                              ].map((row, i) => (
                                 <tr key={i} className="border-b hover:bg-gray-50">
                                   <td className="px-4 py-2">{row.sr}</td>
                                   <td className="px-4 py-2"><input type="checkbox" className="w-4 h-4 accent-[#32a3d7]"/></td>
                                   <td className="px-4 py-2">{row.adm}</td>
                                   <td className="px-4 py-2">{row.roll}</td>
                                   <td className="px-4 py-2"></td>
                                   <td className="px-4 py-2">{row.name}</td>
                                   <td className="px-4 py-2">{row.father}</td>
                                   <td className="px-4 py-2">{row.class}</td>
                                   <td className="px-4 py-2">{row.sec}</td>
                                   <td className="px-4 py-2">
                                     <select className="border border-gray-300 rounded px-2 py-1 w-full text-sm outline-none focus:border-[#32a3d7]">
                                       <option>Select</option>
                                     </select>
                                   </td>
                                   <td className="px-4 py-2">
                                     <select className="border border-gray-300 rounded px-2 py-1 w-full text-sm outline-none focus:border-[#32a3d7]">
                                       <option>A</option>
                                     </select>
                                   </td>
                                 </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : activeTab === 'Student Class Section Transfer' ? (
                      <div className="flex flex-col h-full bg-white">
                        <div className="p-4 border-b border-gray-200">
                           <div className="flex gap-4 items-end justify-center">
                             <div className="flex flex-col gap-1 w-64">
                               <label className="text-sm font-bold text-gray-700">Class</label>
                               <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                 <option>NUR</option>
                               </select>
                             </div>
                             <div className="flex flex-col gap-1 w-64">
                               <label className="text-sm font-bold text-gray-700">Section</label>
                               <select className="border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm">
                                 <option>A</option>
                               </select>
                             </div>
                           </div>
                           <div className="flex justify-center mt-6">
                             <button className="bg-[#32a3d7] text-white px-6 py-1.5 rounded text-sm font-bold flex items-center gap-2 shadow-sm hover:bg-[#288ebf]">
                               <FaSync /> Update
                             </button>
                           </div>
                        </div>
                        <div className="p-4 overflow-auto flex-1">
                          <h4 className="font-bold text-sm text-gray-700 uppercase mb-4">Student List</h4>
                          <table className="w-full text-sm text-left text-gray-500 border-b border-gray-200">
                            <thead className="text-xs text-gray-700 font-bold bg-white border-b">
                              <tr>
                                <th className="px-4 py-4">Sr. No.</th>
                                <th className="px-4 py-4 uppercase">AdmissionNo</th>
                                <th className="px-4 py-4">Roll No</th>
                                <th className="px-4 py-4">Student Name</th>
                                <th className="px-4 py-4">Father Name</th>
                                <th className="px-4 py-4">Class</th>
                                <th className="px-4 py-2">
                                   <div className="flex flex-col gap-1 items-start">
                                     <select className="border border-gray-300 rounded px-2 py-1 w-32"><option>Select Section</option></select>
                                   </div>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {[
                                { sr: 1, adm: '2261', roll: '15', name: 'ABHYANT GUPTA', father: 'ASHOK KUMAR GUPTA' },
                                { sr: 2, adm: '2228', roll: '21', name: 'ADVIK KUMAR', father: 'ANGAD KUMAR' },
                                { sr: 3, adm: '2512', roll: '', name: 'ANKITA CHAUHAN', father: 'PAPPU CHAUHAN' },
                                { sr: 4, adm: '2203', roll: '2', name: 'ANVI MAURYA', father: 'ARVIND KUMAR MAURYA' },
                                { sr: 5, adm: '2515', roll: '', name: 'ARADHYA GOND', father: 'RAMCHANDAR' },
                                { sr: 6, adm: '1770', roll: '1', name: 'ARNAV GUPTA', father: 'HANUMAN GUPTA' },
                                { sr: 7, adm: '2312', roll: '20', name: 'ARPITA MAURYA', father: 'SUJEET MAURYA' }
                              ].map((row, i) => (
                                 <tr key={i} className="border-b hover:bg-gray-50">
                                   <td className="px-4 py-2">{row.sr}</td>
                                   <td className="px-4 py-2">{row.adm}</td>
                                   <td className="px-4 py-2">{row.roll}</td>
                                   <td className="px-4 py-2">{row.name}</td>
                                   <td className="px-4 py-2">{row.father}</td>
                                   <td className="px-4 py-2">
                                     <select className="border border-gray-300 rounded px-2 py-1 w-24 text-sm outline-none focus:border-[#32a3d7] bg-gray-50 cursor-not-allowed" disabled>
                                       <option>NUR</option>
                                     </select>
                                   </td>
                                   <td className="px-4 py-2">
                                     <select className="border border-gray-300 rounded px-2 py-1 w-32 text-sm outline-none focus:border-[#32a3d7]">
                                       <option>A</option>
                                     </select>
                                   </td>
                                 </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : (
                      null
                    )
                  ) : (
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
                      ) : activeTab === 'Define Religion' ? (
                        <tr>
                          <th className="px-6 py-3">Sr. No. <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3">Religion Name <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3 text-center">Action</th>
                        </tr>
                      ) : activeTab === 'Define Caste' ? (
                        <tr>
                          <th className="px-6 py-3">Sr. No. <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3 text-center">Caste Name <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3 text-center">Modify Details <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3 text-center">Action</th>
                        </tr>
                      ) : activeTab === 'Define Sub Caste' ? (
                        <tr>
                          <th className="px-6 py-3">Sr. No. <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3 text-center">Caste Name <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3 text-center">Sub Caste Name <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3 text-center">Action</th>
                        </tr>
                      ) : activeTab === 'Define Category' ? (
                        <tr>
                          <th className="px-6 py-3">Sr. No. <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3 text-center">Category Name <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3 text-center">Is Default <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3 text-center">Action</th>
                        </tr>
                      ) : activeTab === 'Define Parish' ? (
                        <tr>
                          <th className="px-6 py-3">Sr. No. <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3 text-center">Parish <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3 text-center">Religion <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3 text-center">Modify Details <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3 text-center">Action</th>
                        </tr>
                      ) : activeTab === 'Define House' ? (
                        <tr>
                          <th className="px-6 py-3">Sr. No. <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3 text-center">House Name <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3 text-center">Modify Details <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3 text-center">Action</th>
                        </tr>
                      ) : activeTab === 'Define Club' ? (
                        <tr>
                          <th className="px-6 py-3">Sr. No. <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3 text-center">Club Name <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3 text-center">Action</th>
                        </tr>
                      ) : activeTab === 'Define Stream' ? (
                        <tr>
                          <th className="px-6 py-3">Sr. No. <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3">Stream Name <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3 text-center">Modify Details <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3 text-center">Action</th>
                        </tr>
                      ) : activeTab === 'Define Stream' ? (
                        <tr>
                          <th className="px-6 py-3">Sr. No. <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3">Stream Name <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3 text-center">Modify Details <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3 text-center">Action</th>
                        </tr>
                      ) : activeTab === 'Define Optional Subject' ? (
                        <tr>
                          <th className="px-6 py-3">Sr. No. <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3">Subject Name <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3 text-center">Modify Details <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3 text-center">Action</th>
                        </tr>
                      ) : activeTab === 'Parents Status' ? (
                        <tr>
                          <th className="px-6 py-3">Sr. No. <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3">Status Name <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3 text-center">Action</th>
                        </tr>
                      ) : activeTab === 'Define Classification' ? (
                        <tr>
                          <th className="px-6 py-3">Sr. No. <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3">Classification Name <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3 text-center">Modify Details <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3 text-center">Action</th>
                        </tr>
                      ) : activeTab === 'Define Reason' ? (
                        <tr>
                          <th className="px-6 py-3">Sr. No. <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3">Reason Name <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3 text-center">Modify Details <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3 text-center">Action</th>
                        </tr>
                      ) : activeTab === 'Define Remark' ? (
                        <tr>
                          <th className="px-6 py-3">Sr. No. <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3">Remark <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3 text-center">Modify Details <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3 text-center">Action</th>
                        </tr>
                      ) : activeTab === 'Session Transfer' ? (
                        <tr>
                          <th className="px-6 py-3">Sr. No. <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3">Session Transfer <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3 text-center">Modify Details <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3 text-center">Action</th>
                        </tr>
                      ) : activeTab === 'Define Committee' ? (
                        <tr>
                          <th className="px-6 py-3">Sr. No. <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3 text-center">Committee Type <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3 text-center">Designation <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3 text-center">Staff/Student <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3 text-center">From Date <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3 text-center">To Date <FaAngleUp className="inline text-[10px]" /></th>
                          <th className="px-6 py-3 text-center">Active Status <FaAngleUp className="inline text-[10px]" /></th>
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
                      ) : activeTab === 'Define Religion' ? (
                        filteredReligionData.length === 0 ? (
                          <tr>
                            <td colSpan="3" className="px-6 py-3 text-center">No data available in table</td>
                          </tr>
                        ) : (
                          filteredReligionData.map((row) => (
                            <tr key={row.sr} className="bg-white border-b hover:bg-gray-50">
                              <td className="px-6 py-3">{row.sr}</td>
                              <td className="px-6 py-3 font-medium text-gray-700">{row.name}</td>
                              <td className="px-6 py-3 flex justify-center gap-3 mt-1.5">
                                <FaEdit onClick={() => openEditReligionModal(row)} className="text-gray-400 hover:text-[#32a3d7] cursor-pointer text-base" title="Edit" />
                                <FaTrashAlt onClick={() => handleDeleteReligion(row.sr)} className="text-red-400 hover:text-red-600 cursor-pointer text-base" title="Delete" />
                              </td>
                            </tr>
                          ))
                        )
                      ) : activeTab === 'Define Caste' ? (
                        filteredCasteData.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="px-6 py-3 text-center">No data available in table</td>
                          </tr>
                        ) : (
                          filteredCasteData.map((row) => (
                            <tr key={row.sr} className="bg-white border-b hover:bg-gray-50">
                              <td className="px-6 py-3">{row.sr}</td>
                              <td className="px-6 py-3 text-center">{row.name}</td>
                              <td className="px-6 py-3 text-center"></td>
                              <td className="px-6 py-3 flex justify-center gap-3 mt-1.5">
                                <FaEdit onClick={() => openEditCasteModal(row)} className="text-gray-400 hover:text-[#32a3d7] cursor-pointer text-base" title="Edit" />
                                <FaTrashAlt onClick={() => handleDeleteCaste(row.sr)} className="text-red-400 hover:text-red-600 cursor-pointer text-base" title="Delete" />
                              </td>
                            </tr>
                          ))
                        )
                      ) : activeTab === 'Define Sub Caste' ? (
                        filteredSubCasteData.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="px-6 py-3 text-center">No data available in table</td>
                          </tr>
                        ) : (
                          filteredSubCasteData.map((row) => (
                            <tr key={row.sr} className="bg-white border-b hover:bg-gray-50">
                              <td className="px-6 py-3">{row.sr}</td>
                              <td className="px-6 py-3 text-center">{row.casteName}</td>
                              <td className="px-6 py-3 text-center">{row.subCasteName}</td>
                              <td className="px-6 py-3 flex justify-center gap-3 mt-1.5">
                                <FaEdit onClick={() => openEditSubCasteModal(row)} className="text-gray-400 hover:text-[#32a3d7] cursor-pointer text-base" title="Edit" />
                                <FaTrashAlt onClick={() => handleDeleteSubCaste(row.sr)} className="text-red-400 hover:text-red-600 cursor-pointer text-base" title="Delete" />
                              </td>
                            </tr>
                          ))
                        )
                      ) : activeTab === 'Define Category' ? (
                        filteredCategoryData.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="px-6 py-3 text-center">No data available in table</td>
                          </tr>
                        ) : (
                          filteredCategoryData.map((row) => (
                            <tr key={row.sr} className="bg-white border-b hover:bg-gray-50">
                              <td className="px-6 py-3">{row.sr}</td>
                              <td className="px-6 py-3 text-center">{row.name}</td>
                              <td className="px-6 py-3 text-center">{row.isDefault}</td>
                              <td className="px-6 py-3 flex justify-center gap-3 mt-1.5">
                                <FaEdit onClick={() => openEditCategoryModal(row)} className="text-gray-400 hover:text-[#32a3d7] cursor-pointer text-base" title="Edit" />
                                <FaTrashAlt onClick={() => handleDeleteCategory(row.sr)} className="text-red-400 hover:text-red-600 cursor-pointer text-base" title="Delete" />
                              </td>
                            </tr>
                          ))
                        )
                      ) : activeTab === 'Define Parish' ? (
                        filteredParishData.length === 0 ? (
                          <tr>
                            <td colSpan="5" className="px-6 py-3 text-center">No data available in table</td>
                          </tr>
                        ) : (
                          filteredParishData.map((row) => (
                            <tr key={row.sr} className="bg-white border-b hover:bg-gray-50">
                              <td className="px-6 py-3">{row.sr}</td>
                              <td className="px-6 py-3 text-center">{row.parish}</td>
                              <td className="px-6 py-3 text-center">{row.religion}</td>
                              <td className="px-6 py-3 text-center">{row.modifyDetails}</td>
                              <td className="px-6 py-3 flex justify-center gap-3 mt-1.5">
                                <FaEdit onClick={() => openEditParishModal(row)} className="text-gray-400 hover:text-[#32a3d7] cursor-pointer text-base" title="Edit" />
                                <FaTrashAlt onClick={() => handleDeleteParish(row.sr)} className="text-red-400 hover:text-red-600 cursor-pointer text-base" title="Delete" />
                              </td>
                            </tr>
                          ))
                        )
                      ) : activeTab === 'Define House' ? (
                        filteredHouseData.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="px-6 py-3 text-center">No data available in table</td>
                          </tr>
                        ) : (
                          filteredHouseData.map((row) => (
                            <tr key={row.sr} className="bg-white border-b hover:bg-gray-50">
                              <td className="px-6 py-3">{row.sr}</td>
                              <td className="px-6 py-3 text-center">{row.houseName}</td>
                              <td className="px-6 py-3 text-center">{row.modifyDetails}</td>
                              <td className="px-6 py-3 flex justify-center gap-3 mt-1.5">
                                <FaEdit onClick={() => openEditHouseModal(row)} className="text-gray-400 hover:text-[#32a3d7] cursor-pointer text-base" title="Edit" />
                                <FaTrashAlt onClick={() => handleDeleteHouse(row.sr)} className="text-red-400 hover:text-red-600 cursor-pointer text-base" title="Delete" />
                              </td>
                            </tr>
                          ))
                        )
                      ) : activeTab === 'Define Club' ? (
                        filteredClubData.length === 0 ? (
                          <tr>
                            <td colSpan="3" className="px-6 py-4 text-center">No data available in table</td>
                          </tr>
                        ) : (
                          filteredClubData.map((row) => (
                            <tr key={row.sr} className="border-b hover:bg-gray-50">
                              <td className="px-6 py-3">{row.sr}</td>
                              <td className="px-6 py-3 text-center">{row.name}</td>
                              <td className="px-6 py-3 text-center flex justify-center gap-3">
                                <FaEdit onClick={() => openEditClubModal(row)} className="text-gray-400 hover:text-[#32a3d7] cursor-pointer text-base" title="Edit" />
                                <FaTrashAlt onClick={() => handleDeleteClub(row.sr)} className="text-red-400 hover:text-red-600 cursor-pointer text-base" title="Delete" />
                              </td>
                            </tr>
                          ))
                        )
                      ) : activeTab === 'Define Stream' ? (
                        filteredStreamData.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="px-6 py-4 text-center">No data available in table</td>
                          </tr>
                        ) : (
                          filteredStreamData.map((row) => (
                            <tr key={row.sr} className="border-b hover:bg-gray-50">
                              <td className="px-6 py-3">{row.sr}</td>
                              <td className="px-6 py-3">{row.name}</td>
                              <td className="px-6 py-3 text-center">{row.modifyDetails}</td>
                              <td className="px-6 py-3 text-center flex justify-center gap-3">
                                <FaEdit onClick={() => openEditStreamModal(row)} className="text-gray-400 hover:text-[#32a3d7] cursor-pointer text-base" title="Edit" />
                                <FaTrashAlt onClick={() => handleDeleteStream(row.sr)} className="text-red-400 hover:text-red-600 cursor-pointer text-base" title="Delete" />
                              </td>
                            </tr>
                          ))
                        )
                      ) : activeTab === 'Define Stream' ? (
                        filteredStreamData.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="px-6 py-4 text-center">No data available in table</td>
                          </tr>
                        ) : (
                          filteredStreamData.map((row) => (
                            <tr key={row.sr} className="border-b hover:bg-gray-50">
                              <td className="px-6 py-3">{row.sr}</td>
                              <td className="px-6 py-3">{row.name}</td>
                              <td className="px-6 py-3 text-center">{row.modifyDetails}</td>
                              <td className="px-6 py-3 text-center flex justify-center gap-3">
                                <FaEdit onClick={() => openEditStreamModal(row)} className="text-gray-400 hover:text-[#32a3d7] cursor-pointer text-base" title="Edit" />
                                <FaTrashAlt onClick={() => handleDeleteStream(row.sr)} className="text-red-400 hover:text-red-600 cursor-pointer text-base" title="Delete" />
                              </td>
                            </tr>
                          ))
                        )
                      ) : activeTab === 'Define Optional Subject' ? (
                        optionalSubjectData.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="px-6 py-4 text-center">No data available in table</td>
                          </tr>
                        ) : (
                          optionalSubjectData.map((row) => (
                            <tr key={row.sr} className="border-b hover:bg-gray-50">
                              <td className="px-6 py-3">{row.sr}</td>
                              <td className="px-6 py-3">{row.name}</td>
                              <td className="px-6 py-3 text-center">{row.modifyDetails}</td>
                              <td className="px-6 py-3 text-center flex justify-center gap-3">
                                <FaEdit onClick={() => openEditOptionalSubjectModal(row)} className="text-gray-400 hover:text-[#32a3d7] cursor-pointer text-base" title="Edit" />
                                <FaTrashAlt onClick={() => handleDeleteOptionalSubject(row.sr)} className="text-red-400 hover:text-red-600 cursor-pointer text-base" title="Delete" />
                              </td>
                            </tr>
                          ))
                        )
                      ) : activeTab === 'Parents Status' ? (
                        parentsStatusData.length === 0 ? (
                          <tr>
                            <td colSpan="3" className="px-6 py-4 text-center">No data available in table</td>
                          </tr>
                        ) : (
                          parentsStatusData.map((row) => (
                            <tr key={row.sr} className="border-b hover:bg-gray-50">
                              <td className="px-6 py-3">{row.sr}</td>
                              <td className="px-6 py-3">{row.name}</td>
                              <td className="px-6 py-3 text-center flex justify-center gap-3">
                                <FaEdit onClick={() => openEditParentsStatusModal(row)} className="text-gray-400 hover:text-[#32a3d7] cursor-pointer text-base" title="Edit" />
                                <FaTrashAlt onClick={() => handleDeleteParentsStatus(row.sr)} className="text-red-400 hover:text-red-600 cursor-pointer text-base" title="Delete" />
                              </td>
                            </tr>
                          ))
                        )
                      ) : activeTab === 'Define Classification' ? (
                        classificationData.length === 0 ? (
                          <tr>
                            <td colSpan="3" className="px-6 py-4 text-center">No data available in table</td>
                          </tr>
                        ) : (
                          classificationData.map((row) => (
                            <tr key={row.sr} className="border-b hover:bg-gray-50">
                              <td className="px-6 py-3">{row.sr}</td>
                              <td className="px-6 py-3">{row.name}</td>
                              <td className="px-6 py-3 text-center">{row.modifyDetails || '15-May-2019'}</td>
                              <td className="px-6 py-3 text-center flex justify-center gap-3">
                                <FaEdit onClick={() => openEditClassificationModal(row)} className="text-gray-400 hover:text-[#32a3d7] cursor-pointer text-base" title="Edit" />
                                <FaTrashAlt onClick={() => handleDeleteClassification(row.sr)} className="text-red-400 hover:text-red-600 cursor-pointer text-base" title="Delete" />
                              </td>
                            </tr>
                          ))
                        )
                      ) : activeTab === 'Define Reason' ? (
                        reasonData.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="px-6 py-4 text-center">No data available in table</td>
                          </tr>
                        ) : (
                          reasonData.map((row) => (
                            <tr key={row.sr} className="border-b hover:bg-gray-50">
                              <td className="px-6 py-3">{row.sr}</td>
                              <td className="px-6 py-3">{row.name}</td>
                              <td className="px-6 py-3 text-center">{row.modifyDetails || '31-Aug-2026'}</td>
                              <td className="px-6 py-3 text-center flex justify-center gap-3">
                                <FaEdit onClick={() => openEditReasonModal(row)} className="text-gray-400 hover:text-[#32a3d7] cursor-pointer text-base" title="Edit" />
                                <FaTrashAlt onClick={() => handleDeleteReason(row.sr)} className="text-red-400 hover:text-red-600 cursor-pointer text-base" title="Delete" />
                              </td>
                            </tr>
                          ))
                        )
                      ) : activeTab === 'Define Remark' ? (
                        remarkData.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="px-6 py-4 text-center">No data available in table</td>
                          </tr>
                        ) : (
                          remarkData.map((row) => (
                            <tr key={row.sr} className="border-b hover:bg-gray-50">
                              <td className="px-6 py-3">{row.sr}</td>
                              <td className="px-6 py-3">{row.name}</td>
                              <td className="px-6 py-3 text-center">{row.modifyDetails || '31-Aug-2026'}</td>
                              <td className="px-6 py-3 text-center flex justify-center gap-3">
                                <FaEdit onClick={() => openEditRemarkModal(row)} className="text-gray-400 hover:text-[#32a3d7] cursor-pointer text-base" title="Edit" />
                                <FaTrashAlt onClick={() => handleDeleteRemark(row.sr)} className="text-red-400 hover:text-red-600 cursor-pointer text-base" title="Delete" />
                              </td>
                            </tr>
                          ))
                        )
                      ) : activeTab === 'Session Transfer' ? (
                        sessionTransferData.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="px-6 py-4 text-center">No data available in table</td>
                          </tr>
                        ) : (
                          sessionTransferData.map((row) => (
                            <tr key={row.sr} className="border-b hover:bg-gray-50">
                              <td className="px-6 py-3">{row.sr}</td>
                              <td className="px-6 py-3">{row.name}</td>
                              <td className="px-6 py-3 text-center">{row.modifyDetails || '31-Aug-2026'}</td>
                              <td className="px-6 py-3 text-center flex justify-center gap-3">
                                <FaEdit onClick={() => openEditSessionTransferModal(row)} className="text-gray-400 hover:text-[#32a3d7] cursor-pointer text-base" title="Edit" />
                                <FaTrashAlt onClick={() => handleDeleteSessionTransfer(row.sr)} className="text-red-400 hover:text-red-600 cursor-pointer text-base" title="Delete" />
                              </td>
                            </tr>
                          ))
                        )
                      ) : activeTab === 'Define Committee' ? (
                        filteredCommitteeData.length === 0 ? (
                          <tr>
                            <td colSpan="8" className="px-6 py-3 text-center">No data available in table</td>
                          </tr>
                        ) : (
                          filteredCommitteeData.map((row) => (
                            <tr key={row.sr} className="bg-white border-b hover:bg-gray-50">
                              <td className="px-6 py-3">{row.sr}</td>
                              <td className="px-6 py-3 text-center">{row.committeeType}</td>
                              <td className="px-6 py-3 text-center">{row.designation}</td>
                              <td className="px-6 py-3 text-center">{row.staffStudent}</td>
                              <td className="px-6 py-3 text-center">{row.fromDate}</td>
                              <td className="px-6 py-3 text-center">{row.toDate}</td>
                              <td className="px-6 py-3 text-center">{row.activeStatus ? 'Yes' : 'No'}</td>
                              <td className="px-6 py-3 flex justify-center gap-3 mt-1.5">
                                <FaEdit onClick={() => openEditCommitteeModal(row)} className="text-gray-400 hover:text-[#32a3d7] cursor-pointer text-base" title="Edit" />
                                <FaTrashAlt onClick={() => handleDeleteCommittee(row.sr)} className="text-red-400 hover:text-red-600 cursor-pointer text-base" title="Delete" />
                              </td>
                            </tr>
                          ))
                        )
                      ) : activeTab === 'Define Language' ? (
                        languageData.length === 0 ? (
                          <tr><td colSpan="3" className="px-6 py-4 text-center">No data available in table</td></tr>
                        ) : (
                          languageData.map((row) => (
                            <tr key={row.id} className="border-b hover:bg-gray-50">
                              <td className="px-6 py-3">{row.id}</td>
                              <td className="px-6 py-3">{row.name}</td>
                              <td className="px-6 py-3 text-right flex justify-end gap-3">
                                <FaEdit onClick={() => { setLanguageModalInput(row.name); setIsAddLanguageModalOpen(true); }} className="text-gray-400 hover:text-[#32a3d7] cursor-pointer text-base" title="Edit" />
                                <FaTrashAlt className="text-red-400 hover:text-red-600 cursor-pointer text-base" title="Delete" />
                              </td>
                            </tr>
                          ))
                        )
                      ) : activeTab === 'Define TC Caste' ? (
                        tcCasteData.length === 0 ? (
                          <tr><td colSpan="3" className="px-6 py-4 text-center">No data available in table</td></tr>
                        ) : (
                          tcCasteData.map((row) => (
                            <tr key={row.id} className="border-b hover:bg-gray-50">
                              <td className="px-6 py-3">{row.id}</td>
                              <td className="px-6 py-3">{row.name}</td>
                              <td className="px-6 py-3 text-right flex justify-end gap-3">
                                <FaEdit onClick={() => { setTcCasteModalInput(row.name); setIsAddTcCasteModalOpen(true); }} className="text-gray-400 hover:text-[#32a3d7] cursor-pointer text-base" title="Edit" />
                                <FaTrashAlt className="text-red-400 hover:text-red-600 cursor-pointer text-base" title="Delete" />
                              </td>
                            </tr>
                          ))
                        )
                      ) : activeTab === 'Define Extra Activity' ? (
                        extraActivityData.length === 0 ? (
                          <tr><td colSpan="3" className="px-6 py-4 text-center">No data available in table</td></tr>
                        ) : (
                          extraActivityData.map((row) => (
                            <tr key={row.id} className="border-b hover:bg-gray-50">
                              <td className="px-6 py-3">{row.id}</td>
                              <td className="px-6 py-3">{row.name}</td>
                              <td className="px-6 py-3 text-right flex justify-end gap-3">
                                <FaEdit onClick={() => { setExtraActivityModalInput(row.name); setIsAddExtraActivityModalOpen(true); }} className="text-gray-400 hover:text-[#32a3d7] cursor-pointer text-base" title="Edit" />
                                <FaTrashAlt className="text-red-400 hover:text-red-600 cursor-pointer text-base" title="Delete" />
                              </td>
                            </tr>
                          ))
                        )
                      ) : activeTab === 'Define Character' ? (
                        characterData.length === 0 ? (
                          <tr><td colSpan="3" className="px-6 py-4 text-center">No data available in table</td></tr>
                        ) : (
                          characterData.map((row) => (
                            <tr key={row.id} className="border-b hover:bg-gray-50">
                              <td className="px-6 py-3">{row.id}</td>
                              <td className="px-6 py-3">{row.name}</td>
                              <td className="px-6 py-3 text-right flex justify-end gap-3">
                                <FaEdit onClick={() => { setCharacterModalInput(row.name); setIsAddCharacterModalOpen(true); }} className="text-gray-400 hover:text-[#32a3d7] cursor-pointer text-base" title="Edit" />
                                <FaTrashAlt className="text-red-400 hover:text-red-600 cursor-pointer text-base" title="Delete" />
                              </td>
                            </tr>
                          ))
                        )
                      ) : activeTab === 'Define Promotion Master' ? (
                        promotionMasterData.length === 0 ? (
                          <tr><td colSpan="3" className="px-6 py-4 text-center">No data available in table</td></tr>
                        ) : (
                          promotionMasterData.map((row) => (
                            <tr key={row.id} className="border-b hover:bg-gray-50">
                              <td className="px-6 py-3">{row.id}</td>
                              <td className="px-6 py-3">{row.name}</td>
                              <td className="px-6 py-3 text-right flex justify-end gap-3">
                                <FaEdit onClick={() => { setPromotionMasterModalInput(row.name); setIsAddPromotionMasterModalOpen(true); }} className="text-gray-400 hover:text-[#32a3d7] cursor-pointer text-base" title="Edit" />
                                <FaTrashAlt className="text-red-400 hover:text-red-600 cursor-pointer text-base" title="Delete" />
                              </td>
                            </tr>
                          ))
                        )
                      ) : activeTab === 'Define Last Result' ? (
                        lastResultData.length === 0 ? (
                          <tr><td colSpan="3" className="px-6 py-4 text-center">No data available in table</td></tr>
                        ) : (
                          lastResultData.map((row) => (
                            <tr key={row.id} className="border-b hover:bg-gray-50">
                              <td className="px-6 py-3">{row.id}</td>
                              <td className="px-6 py-3">{row.name}</td>
                              <td className="px-6 py-3 text-right flex justify-end gap-3">
                                <FaEdit onClick={() => { setLastResultModalInput(row.name); setIsAddLastResultModalOpen(true); }} className="text-gray-400 hover:text-[#32a3d7] cursor-pointer text-base" title="Edit" />
                                <FaTrashAlt className="text-red-400 hover:text-red-600 cursor-pointer text-base" title="Delete" />
                              </td>
                            </tr>
                          ))
                        )
                      ) : activeTab === 'Term Master' ? (
                        termMasterData.length === 0 ? (
                          <tr><td colSpan="3" className="px-6 py-4 text-center">No data available in table</td></tr>
                        ) : (
                          termMasterData.map((row) => (
                            <tr key={row.id} className="border-b hover:bg-gray-50">
                              <td className="px-6 py-3">{row.id}</td>
                              <td className="px-6 py-3">{row.name}</td>
                              <td className="px-6 py-3 text-right flex justify-end gap-3">
                                <FaEdit onClick={() => { setTermMasterModalInput(row.name); setIsAddTermMasterModalOpen(true); }} className="text-gray-400 hover:text-[#32a3d7] cursor-pointer text-base" title="Edit" />
                                <FaTrashAlt className="text-red-400 hover:text-red-600 cursor-pointer text-base" title="Delete" />
                              </td>
                            </tr>
                          ))
                        )
                      ) : activeTab === 'Define Moral' ? (
                        moralData.length === 0 ? (
                          <tr><td colSpan="3" className="px-6 py-4 text-center">No data available in table</td></tr>
                        ) : (
                          moralData.map((row) => (
                            <tr key={row.id} className="border-b hover:bg-gray-50">
                              <td className="px-6 py-3">{row.id}</td>
                              <td className="px-6 py-3">{row.name}</td>
                              <td className="px-6 py-3 text-right flex justify-end gap-3">
                                <FaEdit onClick={() => { setMoralModalInput(row.name); setIsAddMoralModalOpen(true); }} className="text-gray-400 hover:text-[#32a3d7] cursor-pointer text-base" title="Edit" />
                                <FaTrashAlt className="text-red-400 hover:text-red-600 cursor-pointer text-base" title="Delete" />
                              </td>
                            </tr>
                          ))
                        )
                      ) : activeTab === 'Define Mother Tongue' ? (
                        motherTongueData.length === 0 ? (
                          <tr><td colSpan="3" className="px-6 py-4 text-center">No data available in table</td></tr>
                        ) : (
                          motherTongueData.map((row) => (
                            <tr key={row.id} className="border-b hover:bg-gray-50">
                              <td className="px-6 py-3">{row.id}</td>
                              <td className="px-6 py-3">{row.name}</td>
                              <td className="px-6 py-3 text-right flex justify-end gap-3">
                                <FaEdit onClick={() => { setMotherTongueModalInput(row.name); setIsAddMotherTongueModalOpen(true); }} className="text-gray-400 hover:text-[#32a3d7] cursor-pointer text-base" title="Edit" />
                                <FaTrashAlt className="text-red-400 hover:text-red-600 cursor-pointer text-base" title="Delete" />
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
                  )}
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

      {/* Add Modal for Define Religion */}
      {isAddReligionModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded w-[90%] max-w-lg shadow-lg flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium text-lg">Add New Religion</h3>
              <button onClick={() => setIsAddReligionModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-1 max-w-sm mx-auto">
                <label className="text-sm font-bold text-gray-700">Religion Name</label>
                <input 
                  type="text" 
                  value={religionModalInput}
                  onChange={(e) => setReligionModalInput(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" 
                />
              </div>
            </div>
            <div className="p-4 flex justify-center border-t border-gray-100">
              <button 
                onClick={handleAddReligion}
                className="bg-[#4ade80] hover:bg-[#3bcf6d] text-white px-8 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                <FaSave /> Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal for Define Religion */}
      {editReligionItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded w-[90%] max-w-lg shadow-lg flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium text-lg">Edit Religion</h3>
              <button onClick={() => setEditReligionItem(null)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-1 max-w-sm mx-auto">
                <label className="text-sm font-bold text-gray-700">Religion Name</label>
                <input 
                  type="text" 
                  value={religionModalInput}
                  onChange={(e) => setReligionModalInput(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" 
                />
              </div>
            </div>
            <div className="p-4 flex justify-center border-t border-gray-100">
              <button 
                onClick={handleEditReligion}
                className="bg-[#32a3d7] hover:bg-[#288ebf] text-white px-8 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                <FaSync /> Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal for Define Caste */}
      {isAddCasteModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded w-[90%] max-w-lg shadow-lg flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium text-lg">Add New Caste</h3>
              <button onClick={() => setIsAddCasteModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-1 max-w-sm mx-auto">
                <label className="text-sm font-bold text-gray-700">Caste Name</label>
                <input 
                  type="text" 
                  value={casteModalInput}
                  onChange={(e) => setCasteModalInput(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" 
                />
              </div>
            </div>
            <div className="p-4 flex justify-center border-t border-gray-100">
              <button 
                onClick={handleAddCaste}
                className="bg-[#4ade80] hover:bg-[#3bcf6d] text-white px-8 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                <FaSave /> Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal for Define Caste */}
      {editCasteItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded w-[90%] max-w-lg shadow-lg flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium text-lg">Edit Caste</h3>
              <button onClick={() => setEditCasteItem(null)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-1 max-w-sm mx-auto">
                <label className="text-sm font-bold text-gray-700">Caste Name</label>
                <input 
                  type="text" 
                  value={casteModalInput}
                  onChange={(e) => setCasteModalInput(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" 
                />
              </div>
            </div>
            <div className="p-4 flex justify-center border-t border-gray-100">
              <button 
                onClick={handleEditCaste}
                className="bg-[#32a3d7] hover:bg-[#288ebf] text-white px-8 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                <FaSync /> Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal for Define Sub Caste */}
      {isAddSubCasteModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded w-[90%] max-w-lg shadow-lg flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium text-lg">Add New Sub Caste</h3>
              <button onClick={() => setIsAddSubCasteModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-4 max-w-sm mx-auto">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-700">Caste Name</label>
                  <select 
                    value={subCasteModalInput.casteName}
                    onChange={(e) => setSubCasteModalInput({...subCasteModalInput, casteName: e.target.value})}
                    className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm bg-white" 
                  >
                    <option value="">-- Select Caste --</option>
                    {casteData.map(c => <option key={c.sr} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-700">Sub Caste Name</label>
                  <input 
                    type="text" 
                    value={subCasteModalInput.subCasteName}
                    onChange={(e) => setSubCasteModalInput({...subCasteModalInput, subCasteName: e.target.value})}
                    className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" 
                  />
                </div>
              </div>
            </div>
            <div className="p-4 flex justify-center border-t border-gray-100">
              <button 
                onClick={handleAddSubCaste}
                className="bg-[#4ade80] hover:bg-[#3bcf6d] text-white px-8 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                <FaSave /> Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal for Define Sub Caste */}
      {editSubCasteItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded w-[90%] max-w-lg shadow-lg flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium text-lg">Edit Sub Caste</h3>
              <button onClick={() => setEditSubCasteItem(null)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-4 max-w-sm mx-auto">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-700">Caste Name</label>
                  <select 
                    value={subCasteModalInput.casteName}
                    onChange={(e) => setSubCasteModalInput({...subCasteModalInput, casteName: e.target.value})}
                    className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm bg-white" 
                  >
                    <option value="">-- Select Caste --</option>
                    {casteData.map(c => <option key={c.sr} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-700">Sub Caste Name</label>
                  <input 
                    type="text" 
                    value={subCasteModalInput.subCasteName}
                    onChange={(e) => setSubCasteModalInput({...subCasteModalInput, subCasteName: e.target.value})}
                    className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" 
                  />
                </div>
              </div>
            </div>
            <div className="p-4 flex justify-center border-t border-gray-100">
              <button 
                onClick={handleEditSubCaste}
                className="bg-[#32a3d7] hover:bg-[#288ebf] text-white px-8 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                <FaSync /> Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal for Define Category */}
      {isAddCategoryModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded w-[90%] max-w-lg shadow-lg flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium text-lg">Add New Category</h3>
              <button onClick={() => setIsAddCategoryModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-4 max-w-sm mx-auto">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-700">Category Name</label>
                  <input 
                    type="text" 
                    value={categoryModalInput.name}
                    onChange={(e) => setCategoryModalInput({...categoryModalInput, name: e.target.value})}
                    className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" 
                  />
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <input 
                    type="checkbox" 
                    checked={categoryModalInput.isDefault}
                    onChange={(e) => setCategoryModalInput({...categoryModalInput, isDefault: e.target.checked})}
                    className="w-4 h-4 cursor-pointer" 
                  />
                  <label className="text-sm text-gray-700">Is Default</label>
                </div>
              </div>
            </div>
            <div className="p-4 flex justify-center border-t border-gray-100">
              <button 
                onClick={handleAddCategory}
                className="bg-[#4ade80] hover:bg-[#3bcf6d] text-white px-8 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                <FaSave /> Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal for Define Category */}
      {editCategoryItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded w-[90%] max-w-lg shadow-lg flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium text-lg">Edit Category</h3>
              <button onClick={() => setEditCategoryItem(null)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-4 max-w-sm mx-auto">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-700">Category Name</label>
                  <input 
                    type="text" 
                    value={categoryModalInput.name}
                    onChange={(e) => setCategoryModalInput({...categoryModalInput, name: e.target.value})}
                    className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" 
                  />
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <input 
                    type="checkbox" 
                    checked={categoryModalInput.isDefault}
                    onChange={(e) => setCategoryModalInput({...categoryModalInput, isDefault: e.target.checked})}
                    className="w-4 h-4 cursor-pointer" 
                  />
                  <label className="text-sm text-gray-700">Is Default</label>
                </div>
              </div>
            </div>
            <div className="p-4 flex justify-center border-t border-gray-100">
              <button 
                onClick={handleEditCategory}
                className="bg-[#32a3d7] hover:bg-[#288ebf] text-white px-8 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                <FaSync /> Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal for Define Parish */}
      {isAddParishModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded w-[90%] max-w-lg shadow-lg flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium text-lg">Add New Parish</h3>
              <button onClick={() => setIsAddParishModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-4 max-w-sm mx-auto">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-700">Parish Name</label>
                  <input 
                    type="text" 
                    value={parishModalInput.parish}
                    onChange={(e) => setParishModalInput({...parishModalInput, parish: e.target.value})}
                    className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" 
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-700">Religion</label>
                  <select 
                    value={parishModalInput.religion}
                    onChange={(e) => setParishModalInput({...parishModalInput, religion: e.target.value})}
                    className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm bg-white" 
                  >
                    <option value="">-- Select Religion --</option>
                    {religionData.map(r => <option key={r.sr} value={r.name}>{r.name}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div className="p-4 flex justify-center border-t border-gray-100">
              <button 
                onClick={handleAddParish}
                className="bg-[#4ade80] hover:bg-[#3bcf6d] text-white px-8 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                <FaSave /> Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal for Define Parish */}
      {editParishItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded w-[90%] max-w-lg shadow-lg flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium text-lg">Edit Parish</h3>
              <button onClick={() => setEditParishItem(null)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-4 max-w-sm mx-auto">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-700">Parish Name</label>
                  <input 
                    type="text" 
                    value={parishModalInput.parish}
                    onChange={(e) => setParishModalInput({...parishModalInput, parish: e.target.value})}
                    className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" 
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-700">Religion</label>
                  <select 
                    value={parishModalInput.religion}
                    onChange={(e) => setParishModalInput({...parishModalInput, religion: e.target.value})}
                    className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm bg-white" 
                  >
                    <option value="">-- Select Religion --</option>
                    {religionData.map(r => <option key={r.sr} value={r.name}>{r.name}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div className="p-4 flex justify-center border-t border-gray-100">
              <button 
                onClick={handleEditParish}
                className="bg-[#32a3d7] hover:bg-[#288ebf] text-white px-8 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                <FaSync /> Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal for Define House */}
      {isAddHouseModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded w-[90%] max-w-lg shadow-lg flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium text-lg">Add New House</h3>
              <button onClick={() => setIsAddHouseModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-1 max-w-sm mx-auto">
                <label className="text-sm font-bold text-gray-700">House Name</label>
                <input 
                  type="text" 
                  value={houseModalInput}
                  onChange={(e) => setHouseModalInput(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" 
                />
              </div>
            </div>
            <div className="p-4 flex justify-center border-t border-gray-100">
              <button 
                onClick={handleAddHouse}
                className="bg-[#4ade80] hover:bg-[#3bcf6d] text-white px-8 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                <FaSave /> Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal for Define House */}
      {editHouseItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded w-[90%] max-w-lg shadow-lg flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium text-lg">Edit House</h3>
              <button onClick={() => setEditHouseItem(null)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-1 max-w-sm mx-auto">
                <label className="text-sm font-bold text-gray-700">House Name</label>
                <input 
                  type="text" 
                  value={houseModalInput}
                  onChange={(e) => setHouseModalInput(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" 
                />
              </div>
            </div>
            <div className="p-4 flex justify-center border-t border-gray-100">
              <button 
                onClick={handleEditHouse}
                className="bg-[#32a3d7] hover:bg-[#288ebf] text-white px-8 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                <FaSync /> Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal for Define Committee */}
      {isAddCommitteeModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded w-[90%] max-w-4xl shadow-lg flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium text-lg">Add New Committee</h3>
              <button onClick={() => setIsAddCommitteeModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-6 max-w-3xl mx-auto">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-700">Committee Type</label>
                  <select 
                    value={committeeModalInput.committeeType}
                    onChange={(e) => setCommitteeModalInput({...committeeModalInput, committeeType: e.target.value})}
                    className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm bg-white" 
                  >
                    <option value="">Select Committee Type</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-700">Designation</label>
                  <select 
                    value={committeeModalInput.designation}
                    onChange={(e) => setCommitteeModalInput({...committeeModalInput, designation: e.target.value})}
                    className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm bg-white" 
                  >
                    <option value="">Select Designation</option>
                  </select>
                </div>

                <div className="flex justify-between items-center px-2">
                  <div className="flex gap-8">
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input type="radio" name="staffStudent" value="Employee" checked={committeeModalInput.staffStudent === 'Employee'} onChange={(e) => setCommitteeModalInput({...committeeModalInput, staffStudent: e.target.value})} className="w-4 h-4 cursor-pointer" /> Employee
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input type="radio" name="staffStudent" value="Student" checked={committeeModalInput.staffStudent === 'Student'} onChange={(e) => setCommitteeModalInput({...committeeModalInput, staffStudent: e.target.value})} className="w-4 h-4 cursor-pointer" /> Student
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input type="radio" name="staffStudent" value="Other" checked={committeeModalInput.staffStudent === 'Other'} onChange={(e) => setCommitteeModalInput({...committeeModalInput, staffStudent: e.target.value})} className="w-4 h-4 cursor-pointer" /> Other
                    </label>
                  </div>
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" checked={committeeModalInput.activeStatus} onChange={(e) => setCommitteeModalInput({...committeeModalInput, activeStatus: e.target.checked})} className="w-4 h-4 cursor-pointer" /> Active Status
                  </label>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-700">Staff</label>
                  <select 
                    value={committeeModalInput.staff}
                    onChange={(e) => setCommitteeModalInput({...committeeModalInput, staff: e.target.value})}
                    className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm bg-white" 
                  >
                    <option value="">Select Staff Name</option>
                  </select>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col gap-1 w-1/2">
                    <label className="text-sm font-bold text-gray-700">From Date</label>
                    <input 
                      type="date" 
                      value={committeeModalInput.fromDate}
                      onChange={(e) => setCommitteeModalInput({...committeeModalInput, fromDate: e.target.value})}
                      className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" 
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-1/2">
                    <label className="text-sm font-bold text-gray-700">To Date</label>
                    <input 
                      type="date" 
                      value={committeeModalInput.toDate}
                      onChange={(e) => setCommitteeModalInput({...committeeModalInput, toDate: e.target.value})}
                      className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" 
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 flex justify-center border-t border-gray-100">
              <button 
                onClick={handleAddCommittee}
                className="bg-[#4ade80] hover:bg-[#3bcf6d] text-white px-8 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                <FaSave /> Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal for Define Committee */}
      {editCommitteeItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded w-[90%] max-w-4xl shadow-lg flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium text-lg">Edit Committee</h3>
              <button onClick={() => setEditCommitteeItem(null)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-6 max-w-3xl mx-auto">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-700">Committee Type</label>
                  <select 
                    value={committeeModalInput.committeeType}
                    onChange={(e) => setCommitteeModalInput({...committeeModalInput, committeeType: e.target.value})}
                    className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm bg-white" 
                  >
                    <option value="">Select Committee Type</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-700">Designation</label>
                  <select 
                    value={committeeModalInput.designation}
                    onChange={(e) => setCommitteeModalInput({...committeeModalInput, designation: e.target.value})}
                    className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm bg-white" 
                  >
                    <option value="">Select Designation</option>
                  </select>
                </div>

                <div className="flex justify-between items-center px-2">
                  <div className="flex gap-8">
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input type="radio" name="staffStudent" value="Employee" checked={committeeModalInput.staffStudent === 'Employee'} onChange={(e) => setCommitteeModalInput({...committeeModalInput, staffStudent: e.target.value})} className="w-4 h-4 cursor-pointer" /> Employee
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input type="radio" name="staffStudent" value="Student" checked={committeeModalInput.staffStudent === 'Student'} onChange={(e) => setCommitteeModalInput({...committeeModalInput, staffStudent: e.target.value})} className="w-4 h-4 cursor-pointer" /> Student
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input type="radio" name="staffStudent" value="Other" checked={committeeModalInput.staffStudent === 'Other'} onChange={(e) => setCommitteeModalInput({...committeeModalInput, staffStudent: e.target.value})} className="w-4 h-4 cursor-pointer" /> Other
                    </label>
                  </div>
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" checked={committeeModalInput.activeStatus} onChange={(e) => setCommitteeModalInput({...committeeModalInput, activeStatus: e.target.checked})} className="w-4 h-4 cursor-pointer" /> Active Status
                  </label>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-700">Staff</label>
                  <select 
                    value={committeeModalInput.staff}
                    onChange={(e) => setCommitteeModalInput({...committeeModalInput, staff: e.target.value})}
                    className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm bg-white" 
                  >
                    <option value="">Select Staff Name</option>
                  </select>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col gap-1 w-1/2">
                    <label className="text-sm font-bold text-gray-700">From Date</label>
                    <input 
                      type="date" 
                      value={committeeModalInput.fromDate}
                      onChange={(e) => setCommitteeModalInput({...committeeModalInput, fromDate: e.target.value})}
                      className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" 
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-1/2">
                    <label className="text-sm font-bold text-gray-700">To Date</label>
                    <input 
                      type="date" 
                      value={committeeModalInput.toDate}
                      onChange={(e) => setCommitteeModalInput({...committeeModalInput, toDate: e.target.value})}
                      className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" 
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 flex justify-center border-t border-gray-100">
              <button 
                onClick={handleEditCommittee}
                className="bg-[#32a3d7] hover:bg-[#288ebf] text-white px-8 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                <FaSync /> Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal for Define Club */}
      {isAddClubModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded w-[90%] max-w-4xl shadow-lg flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium text-lg">Add New Club</h3>
              <button onClick={() => setIsAddClubModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-1 max-w-md mx-auto">
                <label className="text-sm font-bold text-gray-700 text-center">Club Name</label>
                <input 
                  type="text" 
                  value={clubModalInput}
                  onChange={(e) => setClubModalInput(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" 
                />
              </div>
            </div>
            <div className="p-4 flex justify-center border-t border-gray-100">
              <button 
                onClick={handleAddClub}
                className="bg-[#5cdb95] hover:bg-[#48c981] text-white px-8 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                <FaSave /> Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal for Define Club */}
      {editClubItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded w-[90%] max-w-4xl shadow-lg flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium text-lg">Edit Club</h3>
              <button onClick={() => setEditClubItem(null)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-1 max-w-md mx-auto">
                <label className="text-sm font-bold text-gray-700 text-center">Club Name</label>
                <input 
                  type="text" 
                  value={clubModalInput}
                  onChange={(e) => setClubModalInput(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" 
                />
              </div>
            </div>
            <div className="p-4 flex justify-center border-t border-gray-100">
              <button 
                onClick={handleEditClub}
                className="bg-[#32a3d7] hover:bg-[#288ebf] text-white px-8 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                <FaSync /> Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal for Define Stream */}
      {isAddStreamModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded w-[90%] max-w-4xl shadow-lg flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium text-lg">Add New Stream</h3>
              <button onClick={() => setIsAddStreamModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-1 max-w-md mx-auto">
                <label className="text-sm font-bold text-gray-700 text-center">Stream Name</label>
                <input 
                  type="text" 
                  value={streamModalInput}
                  onChange={(e) => setStreamModalInput(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" 
                />
              </div>
            </div>
            <div className="p-4 flex justify-center border-t border-gray-100">
              <button 
                onClick={handleAddStream}
                className="bg-[#5cdb95] hover:bg-[#48c981] text-white px-8 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                <FaSave /> Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal for Define Stream */}
      {editStreamItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded w-[90%] max-w-4xl shadow-lg flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium text-lg">Edit Stream</h3>
              <button onClick={() => setEditStreamItem(null)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-1 max-w-md mx-auto">
                <label className="text-sm font-bold text-gray-700 text-center">Stream Name</label>
                <input 
                  type="text" 
                  value={streamModalInput}
                  onChange={(e) => setStreamModalInput(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" 
                />
              </div>
            </div>
            <div className="p-4 flex justify-center border-t border-gray-100">
              <button 
                onClick={handleEditStream}
                className="bg-[#32a3d7] hover:bg-[#288ebf] text-white px-8 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                <FaSync /> Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal for Define Optional Subject */}
      {isAddOptionalSubjectModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded w-[90%] max-w-4xl shadow-lg flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium text-lg">Add New Optional Subject</h3>
              <button onClick={() => setIsAddOptionalSubjectModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-1 max-w-md mx-auto">
                <label className="text-sm font-bold text-gray-700 text-center">Subject Name</label>
                <input 
                  type="text" 
                  value={optionalSubjectModalInput}
                  onChange={(e) => setOptionalSubjectModalInput(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" 
                />
              </div>
            </div>
            <div className="p-4 flex justify-center border-t border-gray-100">
              <button 
                onClick={handleAddOptionalSubject}
                className="bg-[#5cdb95] hover:bg-[#48c981] text-white px-8 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                <FaSave /> Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal for Define Optional Subject */}
      {editOptionalSubjectItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded w-[90%] max-w-4xl shadow-lg flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium text-lg">Edit Optional Subject</h3>
              <button onClick={() => setEditOptionalSubjectItem(null)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-1 max-w-md mx-auto">
                <label className="text-sm font-bold text-gray-700 text-center">Subject Name</label>
                <input 
                  type="text" 
                  value={optionalSubjectModalInput}
                  onChange={(e) => setOptionalSubjectModalInput(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" 
                />
              </div>
            </div>
            <div className="p-4 flex justify-center border-t border-gray-100">
              <button 
                onClick={handleEditOptionalSubject}
                className="bg-[#32a3d7] hover:bg-[#288ebf] text-white px-8 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                <FaSync /> Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal for Parents Status */}
      {isAddParentsStatusModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded w-[90%] max-w-4xl shadow-lg flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium text-lg">Add New Parents Status</h3>
              <button onClick={() => setIsAddParentsStatusModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-1 max-w-md mx-auto">
                <label className="text-sm font-bold text-gray-700 text-center">Status Name</label>
                <input 
                  type="text" 
                  value={parentsStatusModalInput}
                  onChange={(e) => setParentsStatusModalInput(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" 
                />
              </div>
            </div>
            <div className="p-4 flex justify-center border-t border-gray-100">
              <button 
                onClick={handleAddParentsStatus}
                className="bg-[#5cdb95] hover:bg-[#48c981] text-white px-8 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                <FaSave /> Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal for Parents Status */}
      {editParentsStatusItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded w-[90%] max-w-4xl shadow-lg flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium text-lg">Edit Parents Status</h3>
              <button onClick={() => setEditParentsStatusItem(null)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-1 max-w-md mx-auto">
                <label className="text-sm font-bold text-gray-700 text-center">Status Name</label>
                <input 
                  type="text" 
                  value={parentsStatusModalInput}
                  onChange={(e) => setParentsStatusModalInput(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" 
                />
              </div>
            </div>
            <div className="p-4 flex justify-center border-t border-gray-100">
              <button 
                onClick={handleEditParentsStatus}
                className="bg-[#32a3d7] hover:bg-[#288ebf] text-white px-8 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                <FaSync /> Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal for Define Classification */}
      {isAddClassificationModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded w-[90%] max-w-4xl shadow-lg flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium text-lg">Add New Classification</h3>
              <button onClick={() => setIsAddClassificationModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-1 max-w-md mx-auto">
                <label className="text-sm font-bold text-gray-700 text-center">Classification Name</label>
                <input 
                  type="text" 
                  value={classificationModalInput}
                  onChange={(e) => setClassificationModalInput(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" 
                />
              </div>
            </div>
            <div className="p-4 flex justify-center border-t border-gray-100">
              <button 
                onClick={handleAddClassification}
                className="bg-[#5cdb95] hover:bg-[#48c981] text-white px-8 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                <FaSave /> Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal for Define Classification */}
      {editClassificationItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded w-[90%] max-w-4xl shadow-lg flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium text-lg">Edit Classification</h3>
              <button onClick={() => setEditClassificationItem(null)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-1 max-w-md mx-auto">
                <label className="text-sm font-bold text-gray-700 text-center">Classification Name</label>
                <input 
                  type="text" 
                  value={classificationModalInput}
                  onChange={(e) => setClassificationModalInput(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" 
                />
              </div>
            </div>
            <div className="p-4 flex justify-center border-t border-gray-100">
              <button 
                onClick={handleEditClassification}
                className="bg-[#32a3d7] hover:bg-[#288ebf] text-white px-8 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                <FaSync /> Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal for Define Reason */}
      {isAddReasonModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded w-[90%] max-w-4xl shadow-lg flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium text-lg">Add New Reason</h3>
              <button onClick={() => setIsAddReasonModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-1 max-w-md mx-auto">
                <label className="text-sm font-bold text-gray-700 text-center">Reason Name</label>
                <input 
                  type="text" 
                  value={reasonModalInput}
                  onChange={(e) => setReasonModalInput(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" 
                />
              </div>
            </div>
            <div className="p-4 flex justify-center border-t border-gray-100">
              <button 
                onClick={handleAddReason}
                className="bg-[#5cdb95] hover:bg-[#48c981] text-white px-8 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                <FaSave /> Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal for Define Reason */}
      {editReasonItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded w-[90%] max-w-4xl shadow-lg flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium text-lg">Edit Reason</h3>
              <button onClick={() => setEditReasonItem(null)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-1 max-w-md mx-auto">
                <label className="text-sm font-bold text-gray-700 text-center">Reason Name</label>
                <input 
                  type="text" 
                  value={reasonModalInput}
                  onChange={(e) => setReasonModalInput(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" 
                />
              </div>
            </div>
            <div className="p-4 flex justify-center border-t border-gray-100">
              <button 
                onClick={handleEditReason}
                className="bg-[#32a3d7] hover:bg-[#288ebf] text-white px-8 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                <FaSync /> Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal for Define Remark */}
      {isAddRemarkModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded w-[90%] max-w-4xl shadow-lg flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium text-lg">Add New Remark</h3>
              <button onClick={() => setIsAddRemarkModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-1 max-w-md mx-auto">
                <label className="text-sm font-bold text-gray-700 text-center">Remark</label>
                <input 
                  type="text" 
                  value={remarkModalInput}
                  onChange={(e) => setRemarkModalInput(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" 
                />
              </div>
            </div>
            <div className="p-4 flex justify-center border-t border-gray-100">
              <button 
                onClick={handleAddRemark}
                className="bg-[#5cdb95] hover:bg-[#48c981] text-white px-8 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                <FaSave /> Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal for Define Remark */}
      {editRemarkItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded w-[90%] max-w-4xl shadow-lg flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium text-lg">Edit Remark</h3>
              <button onClick={() => setEditRemarkItem(null)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-1 max-w-md mx-auto">
                <label className="text-sm font-bold text-gray-700 text-center">Remark</label>
                <input 
                  type="text" 
                  value={remarkModalInput}
                  onChange={(e) => setRemarkModalInput(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" 
                />
              </div>
            </div>
            <div className="p-4 flex justify-center border-t border-gray-100">
              <button 
                onClick={handleEditRemark}
                className="bg-[#32a3d7] hover:bg-[#288ebf] text-white px-8 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                <FaSync /> Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal for Session Transfer */}
      {isAddSessionTransferModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded w-[90%] max-w-4xl shadow-lg flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium text-lg">Add New Session Transfer</h3>
              <button onClick={() => setIsAddSessionTransferModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-1 max-w-md mx-auto">
                <label className="text-sm font-bold text-gray-700 text-center">Session Transfer</label>
                <input 
                  type="text" 
                  value={sessionTransferModalInput}
                  onChange={(e) => setSessionTransferModalInput(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" 
                />
              </div>
            </div>
            <div className="p-4 flex justify-center border-t border-gray-100">
              <button 
                onClick={handleAddSessionTransfer}
                className="bg-[#5cdb95] hover:bg-[#48c981] text-white px-8 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                <FaSave /> Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal for Session Transfer */}
      {editSessionTransferItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded w-[90%] max-w-4xl shadow-lg flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium text-lg">Edit Session Transfer</h3>
              <button onClick={() => setEditSessionTransferItem(null)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-1 max-w-md mx-auto">
                <label className="text-sm font-bold text-gray-700 text-center">Session Transfer</label>
                <input 
                  type="text" 
                  value={sessionTransferModalInput}
                  onChange={(e) => setSessionTransferModalInput(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" 
                />
              </div>
            </div>
            <div className="p-4 flex justify-center border-t border-gray-100">
              <button 
                onClick={handleEditSessionTransfer}
                className="bg-[#32a3d7] hover:bg-[#288ebf] text-white px-8 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                <FaSync /> Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Shared generic Add/Edit Modal for 9 tabs */}
      {(isAddLanguageModalOpen || isAddTcCasteModalOpen || isAddExtraActivityModalOpen || isAddCharacterModalOpen || isAddPromotionMasterModalOpen || isAddLastResultModalOpen || isAddTermMasterModalOpen || isAddMoralModalOpen || isAddMotherTongueModalOpen) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[400px]">
            <div className="bg-gray-100 px-4 py-3 border-b flex justify-between items-center rounded-t-lg">
              <h3 className="text-gray-600 font-medium text-lg">
                {isAddLanguageModalOpen ? 'Language Details' :
                 isAddTcCasteModalOpen ? 'TC Caste Details' :
                 isAddExtraActivityModalOpen ? 'Extra Activity Details' :
                 isAddCharacterModalOpen ? 'Character Details' :
                 isAddPromotionMasterModalOpen ? 'Promotion Master Details' :
                 isAddLastResultModalOpen ? 'Last Result Details' :
                 isAddTermMasterModalOpen ? 'Term Master Details' :
                 isAddMoralModalOpen ? 'Moral Details' :
                 isAddMotherTongueModalOpen ? 'Mother Tongue Details' : ''}
              </h3>
              <button 
                onClick={() => {
                  setIsAddLanguageModalOpen(false); setIsAddTcCasteModalOpen(false); setIsAddExtraActivityModalOpen(false); setIsAddCharacterModalOpen(false); setIsAddPromotionMasterModalOpen(false); setIsAddLastResultModalOpen(false); setIsAddTermMasterModalOpen(false); setIsAddMoralModalOpen(false); setIsAddMotherTongueModalOpen(false);
                }} 
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <label className="text-sm font-bold text-gray-700 text-center block mb-2">
                  {activeTab.replace('Define ', '')}
                </label>
                <input
                  type="text"
                  value={
                    isAddLanguageModalOpen ? languageModalInput :
                    isAddTcCasteModalOpen ? tcCasteModalInput :
                    isAddExtraActivityModalOpen ? extraActivityModalInput :
                    isAddCharacterModalOpen ? characterModalInput :
                    isAddPromotionMasterModalOpen ? promotionMasterModalInput :
                    isAddLastResultModalOpen ? lastResultModalInput :
                    isAddTermMasterModalOpen ? termMasterModalInput :
                    isAddMoralModalOpen ? moralModalInput :
                    isAddMotherTongueModalOpen ? motherTongueModalInput : ''
                  }
                  onChange={(e) => {
                    const v = e.target.value;
                    if (isAddLanguageModalOpen) setLanguageModalInput(v);
                    else if (isAddTcCasteModalOpen) setTcCasteModalInput(v);
                    else if (isAddExtraActivityModalOpen) setExtraActivityModalInput(v);
                    else if (isAddCharacterModalOpen) setCharacterModalInput(v);
                    else if (isAddPromotionMasterModalOpen) setPromotionMasterModalInput(v);
                    else if (isAddLastResultModalOpen) setLastResultModalInput(v);
                    else if (isAddTermMasterModalOpen) setTermMasterModalInput(v);
                    else if (isAddMoralModalOpen) setMoralModalInput(v);
                    else if (isAddMotherTongueModalOpen) setMotherTongueModalInput(v);
                  }}
                  className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-[#32a3d7] transition-colors"
                />
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t flex justify-end gap-3 rounded-b-lg">
              <button 
                onClick={() => {
                  setIsAddLanguageModalOpen(false); setIsAddTcCasteModalOpen(false); setIsAddExtraActivityModalOpen(false); setIsAddCharacterModalOpen(false); setIsAddPromotionMasterModalOpen(false); setIsAddLastResultModalOpen(false); setIsAddTermMasterModalOpen(false); setIsAddMoralModalOpen(false); setIsAddMotherTongueModalOpen(false);
                }}
                className="bg-red-400 hover:bg-red-500 text-white px-8 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                <FaTimes /> Close
              </button>
              <button 
                onClick={() => {
                  setIsAddLanguageModalOpen(false); setIsAddTcCasteModalOpen(false); setIsAddExtraActivityModalOpen(false); setIsAddCharacterModalOpen(false); setIsAddPromotionMasterModalOpen(false); setIsAddLastResultModalOpen(false); setIsAddTermMasterModalOpen(false); setIsAddMoralModalOpen(false); setIsAddMotherTongueModalOpen(false);
                }}
                className="bg-[#32a3d7] hover:bg-[#288ebf] text-white px-8 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                <FaSave /> Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default AdmissionLayout;
