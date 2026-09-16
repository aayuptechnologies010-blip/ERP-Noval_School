import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import {
  FaBars,
  FaSearch,
  FaCog,
  FaGraduationCap,
  FaChartPie,
  FaQuestionCircle,
  FaInfoCircle,
  FaAngleRight,
  FaAngleDown,
  FaCheck,
  FaTimes,
  FaPrint,
  FaDownload,
  FaPlus,
  FaEdit,
  FaTrashAlt,
  FaSave,
  FaClock,
  FaFilePdf,
  FaFileExcel,
  FaCheckCircle,
  FaMagic,
  FaArrowLeft,
  FaBuilding,
  FaSyncAlt,
  FaPalette,
  FaEye,
  FaTimesCircle,
  FaPaperPlane,
  FaLock,
  FaTrash,
  FaCopy,
  FaExchangeAlt,
  FaFingerprint,
  FaListUl,
  FaCalendarAlt,
  FaMedal
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

// =========================================================================
// EXACT CUSTOM SVG ICONS
// =========================================================================

const RelationMasterIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="4" r="2.2" />
    <path d="M9.5 9h5c.8 0 1.5.7 1.5 1.5v.5h-8V10.5C8 9.7 8.7 9 9.5 9z" />
    <path d="M12 11v2.5M6 13.5h12" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="6" cy="16.5" r="2" />
    <path d="M3.8 21h4.4c.6 0 1.1-.5 1.1-1.1v-.4H2.7v.4c0 .6.5 1.1 1.1 1.1z" />
    <circle cx="18" cy="16.5" r="2" />
    <path d="M15.8 21h4.4c.6 0 1.1-.5 1.1-1.1v-.4h-6.6v.4c0 .6.5 1.1 1.1 1.1z" />
  </svg>
);

const MasterSettingsIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
  </svg>
);

const ConstraintsMasterIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 8V4h4" />
    <path d="M16 4h4v4" />
    <path d="M4 16v4h4" />
    <path d="M16 20h4v-4" />
    <path d="M8.5 12h1.5l1.5-2.5 1.5 5 1.5-2.5h1" strokeWidth="2" />
  </svg>
);

const CreateTimetableIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="17" rx="2" fill="none" />
    <line x1="8" y1="2" x2="8" y2="5" strokeWidth="2.2" />
    <line x1="16" y1="2" x2="16" y2="5" strokeWidth="2.2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <circle cx="7" cy="12.5" r="1" fill="currentColor" />
    <circle cx="12" cy="12.5" r="1" fill="currentColor" />
    <circle cx="17" cy="12.5" r="1" fill="currentColor" />
    <circle cx="7" cy="16.5" r="1" fill="currentColor" />
    <circle cx="12" cy="16.5" r="1" fill="currentColor" />
    <circle cx="17" cy="16.5" r="1" fill="currentColor" />
  </svg>
);

const SubstitutionMasterIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <circle cx="6" cy="7" r="2.2" />
    <path d="M3.5 13.5c0-1.8 1.8-2.5 3.5-2.5s3.5.7 3.5 2.5v.5h-7v-.5z" />
    <circle cx="18" cy="7" r="2.2" />
    <path d="M15.5 13.5c0-1.8 1.8-2.5 3.5-2.5s3.5.7 3.5 2.5v.5h-7v-.5z" />
    <path
      d="M7 17.5h10m-2.5-2.5 2.5 2.5-2.5 2.5M17 14.5H7m2.5-2.5L7 14.5l2.5 2.5"
      stroke="currentColor"
      strokeWidth="1.6"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ReportsIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="6" y1="20" x2="6" y2="14" />
    <line x1="12" y1="20" x2="12" y2="9" />
    <line x1="18" y1="20" x2="18" y2="4" />
    <polyline points="4 15 9 10 13 13 20 6" />
    <polyline points="16 6 20 6 20 10" />
  </svg>
);

const wingData = [
  { name: "Kindergarten", value: 27, percentage: "33%", color: "#ff7b7b" },
  { name: "Primary", value: 24, percentage: "30%", color: "#29b6f6" },
  { name: "Middle", value: 6, percentage: "7%", color: "#ff8b94" },
  { name: "Higher", value: 24, percentage: "30%", color: "#0288d1" },
];

const sampleClassesList = [
  "Class 1-A", "Class 1-B", "Class 2-A", "Class 2-B", "Class 3-A", "Class 3-B",
  "Class 4-A", "Class 4-B", "Class 5-A", "Class 5-B", "Class 6-A", "Class 6-B",
  "Class 7-A", "Class 7-B", "Class 8-A", "Class 8-B", "Class 9-A", "Class 9-B",
  "Class 10-A", "Class 10-B", "Class 11-Sci", "Class 11-Com", "Class 12-Sci", "Class 12-Com"
];

// Navigation menu definition
const navItems = [
  {
    id: "relation_master",
    label: "Relation Master",
    icon: <RelationMasterIcon className="w-5 h-5" />,
    subItems: [
      { id: "timetable_global_setting", label: "Timetable Global Setting" },
      { id: "teacher_setting", label: "Teacher Setting" },
      { id: "class_setting", label: "Class Setting" },
      { id: "define_subject", label: "Define Subject" },
      { id: "assign_subject_to_class", label: "Assign Subject To Class" },
      { id: "period_allotment", label: "Period Allotment" },
      { id: "define_resource", label: "Define Resource" },
      { id: "relate_resource_to_subject", label: "Relate Resource to Subject" },
      { id: "define_class_teacher", label: "Define Class Teacher" },
      { id: "class_teacher_subject", label: "Class Teacher Subject" },
      { id: "period_time_setting", label: "Period Time Setting" },
      { id: "period_allotment_new", label: "Period Allotment New" },
    ]
  },
  {
    id: "master_settings",
    label: "Master Settings",
    icon: <MasterSettingsIcon className="w-5 h-5" />,
    subItems: [
      { id: "change_academic_year", label: "Change Academic Year" },
      { id: "timetable_substitution_setting", label: "Timetable Substitution Setting" },
    ]
  },
  {
    id: "constraints_master",
    label: "Constraints Master",
    icon: <ConstraintsMasterIcon className="w-5 h-5" />,
    subItems: [
      { id: "parallel_allocation", label: "Parallel Allocation" },
      { id: "fixed_allocation", label: "Fixed Allocation" },
      { id: "consecutive_allocation", label: "Consecutive Allocation" },
      { id: "preference_allocation", label: "Preference Allocation" },
    ]
  },
  {
    id: "create_timetable",
    label: "Create Timetable",
    icon: <CreateTimetableIcon className="w-5 h-5" />,
    subItems: [
      { id: "create_predefined_timetable", label: "Create Predefined Timetable" },
      { id: "auto_generate_timetable", label: "Auto Generate Timetable" },
      { id: "view_and_modify_timetable", label: "View and Modify Timetable" },
      { id: "replace_teacher", label: "Replace Teacher" },
      { id: "assign_one_teacher_timetable_to_another", label: "Assign one Teacher Timetable To Another" },
      { id: "modify_timetable", label: "Modify Timetable" },
      { id: "modify_predefined_allocation", label: "Modify Predefined Allocation" },
      { id: "transfer_timetable", label: "Transfer Timetable" },
    ]
  },
  {
    id: "substitution_master",
    label: "Substitution Master",
    icon: <SubstitutionMasterIcon className="w-5 h-5" />,
    subItems: [
      { id: "mark_attendance", label: "Mark Attendance" },
      { id: "substitution", label: "Substitution" },
    ]
  },
  {
    id: "reports",
    label: "Reports",
    icon: <ReportsIcon className="w-5 h-5" />,
    subItems: [
      { id: "class_timetable_details", label: "Class Timetable Details" },
      { id: "teacher_timetable_details", label: "Teacher Timetable Details" },
      { id: "subject_details", label: "Subject Details" },
      { id: "class_teacher_details", label: "Class Teacher Details" },
      { id: "master_requirement", label: "Master Requirement" },
      { id: "show_timetable_log", label: "Show TimeTable Log" },
      { id: "parallel_allocation_details", label: "Parallel Allocation Details" },
      { id: "subject_wise_teacher_details", label: "Subject Wise Teacher Details" },
      { id: "wing_wise_teacher_details", label: "Wing Wise Teacher Details" },
      { id: "consecutive_allocation_details", label: "Consecutive Allocation Details" },
      { id: "class_and_resource_details", label: "Class and Resource Details" },
      { id: "week_wise_free_teacher_details", label: "Week wise free Teacher Details" },
      { id: "free_teachers_classwise", label: "Free Teachers Classwise" },
      { id: "unallocated_period_details", label: "Unallocated Period Details" },
      { id: "day_wise_free_teacher_details", label: "Day wise free Teacher Details" },
      { id: "class_and_subject_taught", label: "Class and Subject Taught" },
      { id: "teachers_work_load_details", label: "Teachers Work Load Details" },
      { id: "resource_timetable_details", label: "Resource Timetable Details" },
      { id: "particular_class_timetable_details", label: "Particular Class Timetable Details" },
      { id: "class_wise_teacher_allocation_details", label: "Class Wise Teacher Allocation Details" },
      { id: "date_wise_substitution_details", label: "Date Wise Substitution Details" },
      { id: "assignment_status", label: "Assignment Status" },
      { id: "subject_summary", label: "Subject Summary" },
      { id: "subject_wise_teacher_allocation_details", label: "Subject Wise Teacher Allocation Details" },
      { id: "show_timetable_at_glance", label: "Show Timetable At Glance" },
    ]
  }
];

function getSubItemLabel(parentId, subId) {
  const p = navItems.find((n) => n.id === parentId);
  if (!p) return subId.replace(/_/g, " ");
  const s = p.subItems.find((sub) => sub.id === subId);
  return s ? s.label : subId.replace(/_/g, " ");
}

// 51 Section-Wise Classes (Matching Images 2, 3, 4)
const ALL_SECTION_CLASSES = [
  "NUR-A", "NUR-B",
  "LKG-A", "LKG-B",
  "UKG-A", "UKG-B", "UKG-C",
  "1-A", "1-B", "1-C",
  "2-A", "2-B", "2-C",
  "3-A", "3-B", "3-C",
  "4-A", "4-B", "4-C",
  "5-A", "5-B", "5-C",
  "6-A", "6-B", "6-C",
  "7-A", "7-B", "7-C",
  "8-A", "8-B", "8-C",
  "9-A", "9-B", "9-C", "9-D",
  "10-A", "10-B", "10-C", "10-D", "10-E",
  "11-A", "11-B", "11-C", "11-D", "11-E", "11-F",
  "12-A", "12-B", "12-C", "12-D"
];

// Simple Classes (Matching Image 1 when separate Section dropdown exists)
const SIMPLE_CLASSES = [
  "Select", "NUR", "LKG", "UKG", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"
];

// Multi-Select Dropdown with Checkboxes (Matching Images 2, 3, 4)
function ClassMultiSelectDropdown({ selected = [], onChange, label = "Class", width = "w-56" }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isAllSelected = selected.length === ALL_SECTION_CLASSES.length;

  const handleToggleAll = () => {
    if (isAllSelected) {
      onChange([]);
    } else {
      onChange([...ALL_SECTION_CLASSES]);
    }
  };

  const handleToggleItem = (item) => {
    if (selected.includes(item)) {
      onChange(selected.filter((i) => i !== item));
    } else {
      onChange([...selected, item]);
    }
  };

  const displayText = selected.length === 0
    ? "None selected"
    : selected.length === 1
    ? selected[0]
    : selected.length === ALL_SECTION_CLASSES.length
    ? "All selected"
    : `${selected.length} selected`;

  return (
    <div className={`space-y-1 text-left ${width} relative select-none`} ref={dropdownRef}>
      {label && <label className="block text-xs font-bold text-gray-800">{label}</label>}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-xs border border-gray-300 rounded px-3 py-1.5 text-gray-700 bg-white font-medium outline-none flex items-center justify-between hover:border-blue-400 cursor-pointer shadow-2xs"
      >
        <span className="truncate">{displayText}</span>
        <FaAngleDown className="text-[10px] text-gray-400 shrink-0 ml-2" />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-1 w-56 bg-white border border-gray-200 rounded shadow-xl z-50 max-h-64 overflow-y-auto custom-scrollbar p-1">
          {/* Select all header (Matching Image 2) */}
          <div
            onClick={handleToggleAll}
            className="flex items-center gap-2.5 px-3 py-1.5 hover:bg-gray-100 cursor-pointer border-b border-gray-100 font-bold text-xs text-gray-900"
          >
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={handleToggleAll}
              className="w-3.5 h-3.5 border-gray-300 rounded text-blue-600 focus:ring-0 cursor-pointer"
            />
            <span className="font-bold">Select all</span>
          </div>

          {/* List of 51 section classes (Matching Images 2, 3, 4) */}
          <div className="divide-y divide-gray-50">
            {ALL_SECTION_CLASSES.map((cls) => {
              const isChecked = selected.includes(cls);
              return (
                <div
                  key={cls}
                  onClick={() => handleToggleItem(cls)}
                  className="flex items-center gap-2.5 px-3 py-1.5 hover:bg-blue-50/50 cursor-pointer text-xs text-gray-800"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleToggleItem(cls)}
                    className="w-3.5 h-3.5 border-gray-300 rounded text-blue-600 focus:ring-0 cursor-pointer"
                  />
                  <span className={isChecked ? "font-semibold text-blue-700" : "text-gray-800"}>{cls}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// 11 Horizontal Lining Grid
function ExactMetricGridChart({ yLabel, height = 200 }) {
  const ticks = [1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0];

  return (
    <div className="w-full relative flex flex-col pt-1 pb-4 select-none">
      <div className="flex items-stretch relative" style={{ height: `${height}px` }}>
        <div className="w-6 flex items-center justify-center relative">
          <span className="absolute -rotate-90 text-[10px] font-bold text-gray-500 tracking-wider whitespace-nowrap">
            {yLabel}
          </span>
        </div>
        <div className="flex-1 flex">
          <div className="w-7 flex flex-col justify-between py-0 text-right pr-2">
            {ticks.map((t) => (
              <span key={t} className="text-[10px] text-gray-500 leading-none">
                {t === 0 ? "0" : t.toFixed(1)}
              </span>
            ))}
          </div>
          <div className="flex-1 flex flex-col justify-between border-l border-gray-300 relative">
            {ticks.map((t, idx) => (
              <div
                key={t}
                className={`w-full border-t ${
                  idx === ticks.length - 1 ? "border-gray-300" : "border-gray-200"
                }`}
                style={{ height: "0px" }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="text-center mt-2 pl-6">
        <span className="text-[11px] font-bold text-gray-600 tracking-wider">
          TEACHERS
        </span>
      </div>
    </div>
  );
}

// Toggle Switch
function ToggleSwitch({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`w-11 h-6 flex items-center rounded-full p-0.5 cursor-pointer transition-colors duration-200 ease-in-out border border-gray-300 ${
        checked ? "bg-[#84cc16] border-[#84cc16]" : "bg-white"
      }`}
    >
      <div
        className={`bg-white w-5 h-5 rounded-full shadow transform transition-transform duration-200 ease-in-out border border-gray-200 ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

  // ==================== THEME SYSTEM (LIGHT/DARK SIDEBAR & CUSTOM PALETTES) ====================
  const themePresets = {
    "light-charcoal": { id: "light-charcoal", mode: "light", headerBg: "#4a5568", sidebarBg: "#ffffff", sidebarText: "#495057", sidebarActiveBg: "#f0f2f5", sidebarActiveText: "#1a202c", accent: "#4a5568" },
    "light-green": { id: "light-green", mode: "light", headerBg: "#48d68f", sidebarBg: "#ffffff", sidebarText: "#495057", sidebarActiveBg: "#e8fbf3", sidebarActiveText: "#1b8a53", accent: "#48d68f" },
    "light-slate": { id: "light-slate", mode: "light", headerBg: "#9ba9ba", sidebarBg: "#ffffff", sidebarText: "#495057", sidebarActiveBg: "#f0f3f6", sidebarActiveText: "#334155", accent: "#9ba9ba" },
    "light-cyan": { id: "light-cyan", mode: "light", headerBg: "#23a8e0", sidebarBg: "#ffffff", sidebarText: "#495057", sidebarActiveBg: "#e6f7ff", sidebarActiveText: "#0284c7", accent: "#23a8e0" },
    "light-purple": { id: "light-purple", mode: "light", headerBg: "#6d78d2", sidebarBg: "#ffffff", sidebarText: "#495057", sidebarActiveBg: "#f0f2fb", sidebarActiveText: "#4f46e5", accent: "#6d78d2" },

    "dark-coral": { id: "dark-coral", mode: "dark", headerBg: "#ff6b6b", sidebarBg: "#2d353c", sidebarText: "#a8b2bd", sidebarActiveBg: "#222834", sidebarActiveText: "#ffffff", accent: "#ff6b6b" },
    "dark-emerald": { id: "dark-emerald", mode: "dark", headerBg: "#00b894", sidebarBg: "#2d353c", sidebarText: "#a8b2bd", sidebarActiveBg: "#222834", sidebarActiveText: "#ffffff", accent: "#00b894" },
    "dark-slate": { id: "dark-slate", mode: "dark", headerBg: "#9ba9ba", sidebarBg: "#2d353c", sidebarText: "#a8b2bd", sidebarActiveBg: "#222834", sidebarActiveText: "#ffffff", accent: "#9ba9ba" },
    "dark-cyan": { id: "dark-cyan", mode: "dark", headerBg: "#23a8e0", sidebarBg: "#2d353c", sidebarText: "#a8b2bd", sidebarActiveBg: "#222834", sidebarActiveText: "#ffffff", accent: "#23a8e0" },
    "dark-purple": { id: "dark-purple", mode: "dark", headerBg: "#6d78d2", sidebarBg: "#2d353c", sidebarText: "#a8b2bd", sidebarActiveBg: "#222834", sidebarActiveText: "#ffffff", accent: "#6d78d2" },
  };

export default function TimeTable() {
  const navigate = useNavigate();
  const location = useLocation();
  const isEmbedded = location.pathname.startsWith("/dashboard");

  // Dynamic Theme Drawer System matching MarksManager.jsx exactly
  const [isThemeDrawerOpen, setIsThemeDrawerOpen] = useState(false);
  const [currentThemeKey, setCurrentThemeKey] = useState(() => {
    try {
      return localStorage.getItem("erp_active_theme") || "dark-cyan";
    } catch {
      return "dark-cyan";
    }
  });

  const activeTheme = themePresets[currentThemeKey] || themePresets["dark-cyan"];

  // Dynamic Open Multi-Tabs (Empty by default so Main Dashboard loads first)
  const [openTabs, setOpenTabs] = useState([]);
  const [activeTabId, setActiveTabId] = useState("dashboard");
  const [openMenu, setOpenMenu] = useState("");
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const sidebarRef = useRef(null);
  const [menuSearchQuery, setMenuSearchQuery] = useState("");
  const [academicYear, setAcademicYear] = useState("2026-2027");
  const [financialYear, setFinancialYear] = useState("2026-2027");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [todaySelectedClass, setTodaySelectedClass] = useState("");
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenPage = (parentId, subId) => {
    const title = getSubItemLabel(parentId, subId);
    const exists = openTabs.find((t) => t.id === subId);
    if (!exists) {
      setOpenTabs((prev) => [...prev, { id: subId, title, parentId }]);
    }
    setActiveTabId(subId);
    setOpenMenu(parentId);
  };

  const handleCloseTab = (tabId, e) => {
    if (e) e.stopPropagation();
    const filtered = openTabs.filter((t) => t.id !== tabId);
    setOpenTabs(filtered);

    if (filtered.length === 0) {
      setActiveTabId("dashboard");
      setOpenMenu("");
      return;
    }

    if (activeTabId === tabId) {
      const nextActive = filtered[filtered.length - 1];
      setActiveTabId(nextActive.id);
      setOpenMenu(nextActive.parentId);
    }
  };

  const toggleSubMenu = (menuId) => {
    setOpenMenu((prev) => (prev === menuId ? "" : menuId));
  };

  const filteredNavItems = navItems.filter((item) => {
    if (!menuSearchQuery.trim()) return true;
    const matchParent = item.label.toLowerCase().includes(menuSearchQuery.toLowerCase());
    const matchSub = item.subItems.some((sub) =>
      sub.label.toLowerCase().includes(menuSearchQuery.toLowerCase())
    );
    return matchParent || matchSub;
  });

  const currentActiveTabObj = openTabs.find((t) => t.id === activeTabId);
  const activeParentId = currentActiveTabObj ? currentActiveTabObj.parentId : openMenu;

  if (isEmbedded) {
    return (
      <div className="flex-1 w-full h-full bg-[#f8f9fc] rounded-tl-2xl overflow-y-auto custom-scrollbar p-6">
        <TimetableDashboardView
          todaySelectedClass={todaySelectedClass}
          setTodaySelectedClass={setTodaySelectedClass}
          onOpenPage={handleOpenPage}
          showToast={showToast}
        />
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#eaedf1] font-sans antialiased select-none">
      
      {/* LEFT SIDEBAR */}
      <aside
        ref={sidebarRef}
        onMouseEnter={() => setIsSidebarHovered(true)}
        onMouseLeave={() => setIsSidebarHovered(false)}
        className={`flex flex-col transition-all duration-300 z-30 shadow-2xl relative select-none flex-shrink-0 ${
          isSidebarHovered ? "w-[260px]" : "w-[60px]"
        }`}
        style={{
          backgroundColor: activeTheme.sidebarBg,
          color: activeTheme.sidebarText
        }}
      >
        {/* Top Header of Sidebar */}
        <div
          className="h-14 flex items-center px-4 justify-between border-b transition-colors"
          style={{
            backgroundColor: activeTheme.mode === "light" ? "#f1f5f9" : "#242933",
            borderColor: activeTheme.mode === "light" ? "#e2e8f0" : "rgba(59,66,82,0.4)"
          }}
        >
          {isSidebarHovered ? (
            <div className="flex items-center gap-3 w-full">
              <FaBars className="text-xl" style={{ color: activeTheme.mode === "light" ? "#1e293b" : "#ffffff" }} />
              <span className="text-xl font-bold tracking-normal" style={{ color: activeTheme.mode === "light" ? "#1e293b" : "#ffffff" }}>
                Navigation
              </span>
            </div>
          ) : (
            <div className="mx-auto">
              <FaBars className="text-xl" style={{ color: activeTheme.mode === "light" ? "#1e293b" : "#ffffff" }} />
            </div>
          )}
        </div>

        {/* Search Bar / Search Icon */}
        {isSidebarHovered ? (
          <div className="p-3.5 pb-2">
            <div className={`flex items-center rounded px-3 py-2 shadow-xs border ${
              activeTheme.mode === "light" ? "bg-white text-gray-800 border-gray-200" : "bg-white text-gray-700 border-transparent"
            }`}>
              <FaSearch className="text-gray-400 mr-2.5 text-sm" />
              <input
                type="text"
                placeholder="Search Menu"
                value={menuSearchQuery}
                onChange={(e) => setMenuSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-400 text-gray-800"
              />
              {menuSearchQuery && (
                <FaTimes
                  className="text-gray-400 hover:text-gray-600 cursor-pointer text-xs"
                  onClick={() => setMenuSearchQuery("")}
                />
              )}
            </div>
          </div>
        ) : (
          <div className="my-3 mx-auto w-10 h-10 bg-white rounded-md flex items-center justify-center shadow-xs cursor-pointer hover:bg-gray-100 transition border border-gray-200">
            <FaSearch className="text-gray-400 text-sm" />
          </div>
        )}

        {/* Navigation Items List */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-1 custom-scrollbar">
          {filteredNavItems.map((item) => {
            const isMenuOpen = openMenu === item.id || menuSearchQuery.length > 0;
            const isParentActive = activeParentId === item.id;

            return (
              <div key={item.id} className="group">
                <button
                  onClick={() => {
                    toggleSubMenu(item.id);
                    if (!isSidebarHovered) {
                      setIsSidebarHovered(true);
                    }
                  }}
                  className={`w-full flex items-center transition-all cursor-pointer ${
                    isSidebarHovered
                      ? "justify-between px-4 py-3"
                      : "justify-center py-3"
                  } ${
                    isParentActive
                      ? "bg-[#ff5c5c] text-white font-bold shadow-sm"
                      : activeTheme.mode === "light"
                        ? "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        : "text-gray-300 hover:bg-[#383f4e] hover:text-white"
                  }`}
                  title={item.label}
                >
                  <div className="flex items-center gap-3">
                    <span className={isParentActive ? "text-white" : activeTheme.mode === "light" ? "text-gray-500 group-hover:text-gray-800" : "text-gray-400 group-hover:text-white"}>
                      {item.icon}
                    </span>
                    {isSidebarHovered && (
                      <span className={`text-[15px] tracking-normal ${
                        isParentActive
                          ? "text-white font-bold"
                          : activeTheme.mode === "light"
                            ? "text-gray-800 group-hover:text-gray-900"
                            : "text-gray-200 group-hover:text-white"
                      }`}>
                        {item.label}
                      </span>
                    )}
                  </div>
                  {isSidebarHovered && (
                    <span className="text-xs text-white">
                      {isMenuOpen ? (
                        <FaAngleDown className="transition-transform" />
                      ) : (
                        <FaAngleRight className="transition-transform text-gray-400 group-hover:text-white" />
                      )}
                    </span>
                  )}
                </button>

                {/* Sub Menu Items */}
                {isMenuOpen && (
                  isSidebarHovered ? (
                    <div
                      className={`py-2 pl-4 pr-2 space-y-2 transition-colors ${
                        activeTheme.mode === "light" ? "bg-[#f8fafc] border-l-2 border-gray-200" : "bg-[#242933]"
                      }`}
                    >
                      {item.subItems.map((sub) => {
                        const isSubActive = activeTabId === sub.id;
                        return (
                          <button
                            key={sub.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenPage(item.id, sub.id);
                            }}
                            className={`w-full text-left px-2 py-1 rounded text-[13px] transition-colors cursor-pointer flex items-center ${
                              isSubActive
                                ? activeTheme.mode === "light" ? "text-blue-600 font-bold" : "text-white font-bold"
                                : activeTheme.mode === "light" ? "text-gray-600 hover:text-gray-900 font-normal" : "text-[#8a95a5] hover:text-[#e2e8f0] font-normal"
                            }`}
                          >
                            <span className={`text-[9px] mr-2.5 leading-none transition-colors ${
                              isSubActive ? (activeTheme.mode === "light" ? "text-blue-600" : "text-white") : (activeTheme.mode === "light" ? "text-gray-400" : "text-[#8a95a5]")
                            }`}>
                              ●
                            </span>
                            <span className="truncate">{sub.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div
                      className={`py-2 flex flex-col items-center gap-2 transition-colors ${
                        activeTheme.mode === "light" ? "bg-[#f8fafc]" : "bg-[#242933]"
                      }`}
                    >
                      {item.subItems.map((sub) => {
                        const isSubActive = activeTabId === sub.id;
                        return (
                          <button
                            key={sub.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenPage(item.id, sub.id);
                            }}
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] transition cursor-pointer ${
                              isSubActive
                                ? "bg-[#ff5c5c] text-white"
                                : activeTheme.mode === "light" ? "text-gray-500 hover:bg-gray-200" : "text-gray-400 hover:bg-gray-700"
                            }`}
                            title={sub.label}
                          >
                            ●
                          </button>
                        );
                      })}
                    </div>
                  )
                )}
              </div>
            );
          })}
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div
        onClick={() => {
          setIsSidebarHovered(false);
          setIsUserMenuOpen(false);
        }}
        className="flex-1 flex flex-col h-screen overflow-hidden"
      >
        {/* TOP HEADER (EXACT 100% CLONE OF SCREENSHOT) */}
        <header
          className="h-14 text-white flex items-center justify-between px-4 shadow-sm flex-shrink-0 z-20 transition-colors duration-300"
          style={{ backgroundColor: activeTheme.headerBg }}
        >
          {/* Left Title & Modules */}
          <div className="flex items-center gap-3.5 flex-wrap">
            {/* School Name */}
            <h1
              onClick={() => { setActiveTabId("dashboard"); setOpenMenu(""); }}
              className="font-extrabold text-[#d32f2f] text-base md:text-[17px] tracking-wide uppercase cursor-pointer whitespace-nowrap"
            >
              NAVALS NATIONAL ACADEMY
            </h1>

            {/* Timetable Module Box with Outlined Calendar Grid */}
            <div
              onClick={() => { setActiveTabId("dashboard"); setOpenMenu(""); }}
              className="flex items-center gap-2 cursor-pointer border border-white/60 rounded px-2.5 py-1 bg-white/10 hover:bg-white/15 transition"
            >
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="4" width="18" height="17" rx="2" />
                <line x1="8" y1="2" x2="8" y2="5" />
                <line x1="16" y1="2" x2="16" y2="5" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="9" x2="9" y2="21" />
                <line x1="15" y1="9" x2="15" y2="21" />
                <line x1="3" y1="13" x2="21" y2="13" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </svg>
              <span className="font-bold text-sm md:text-[15px] text-white tracking-wide">
                Time Table
              </span>
            </div>

            <span className="text-white/40 font-light text-base hidden lg:inline">|</span>

            {/* Academic Year */}
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-white">
              <FaGraduationCap className="text-base text-white" />
              <span className="font-normal text-[13px]">Academic Year :</span>
              <div className="relative">
                <select
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  className="bg-transparent border border-white/80 rounded-full px-3 py-0.5 text-xs text-white font-medium outline-none cursor-pointer hover:bg-white/10 appearance-none pr-6"
                >
                  <option value="2026-2027" className="text-gray-800">2026-2027</option>
                  <option value="2025-2026" className="text-gray-800">2025-2026</option>
                  <option value="2024-2025" className="text-gray-800">2024-2025</option>
                </select>
                <FaAngleDown className="absolute right-2 top-1.5 text-[10px] pointer-events-none text-white" />
              </div>
            </div>

            <span className="text-white/40 font-light text-base hidden xl:inline">|</span>

            {/* Financial Year */}
            <div className="hidden xl:flex items-center gap-1.5 text-xs text-white">
              <FaChartPie className="text-sm text-white" />
              <span className="font-normal text-[13px]">Financial Year :</span>
              <div className="relative">
                <select
                  value={financialYear}
                  onChange={(e) => setFinancialYear(e.target.value)}
                  className="bg-transparent border border-white/80 rounded-full px-3 py-0.5 text-xs text-white font-medium outline-none cursor-pointer hover:bg-white/10 appearance-none pr-6"
                >
                  <option value="2026-2027" className="text-gray-800">2026-2027</option>
                  <option value="2025-2026" className="text-gray-800">2025-2026</option>
                  <option value="2024-2025" className="text-gray-800">2024-2025</option>
                </select>
                <FaAngleDown className="absolute right-2 top-1.5 text-[10px] pointer-events-none text-white" />
              </div>
            </div>
          </div>

          {/* Right Header Icons & Profile */}
          <div className="flex items-center gap-3.5">
            <button
              onClick={() => showToast("Timetable Help Guide & Documentation")}
              className="text-white hover:text-white/80 transition p-1 cursor-pointer"
              title="Help"
            >
              <FaQuestionCircle className="text-base" />
            </button>
            <button
              onClick={() => showToast("Version 4.8.2 | Navals ERP Timetable Engine")}
              className="text-white hover:text-white/80 transition p-1 cursor-pointer"
              title="Information"
            >
              <FaInfoCircle className="text-base" />
            </button>

            {/* Continuously Spinning Cog with Keyframe */}
            <button
              onClick={() => setIsThemeDrawerOpen(true)}
              className="text-white hover:text-white/80 transition p-1 cursor-pointer group"
              title="Change Theme & Appearance"
            >
              <FaCog
                className="text-base animate-spin"
                style={{ animationDuration: "6s", animationTimingFunction: "linear" }}
              />
            </button>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsUserMenuOpen(!isUserMenuOpen);
                }}
                className="flex items-center gap-1.5 font-bold text-xs md:text-sm tracking-wide text-white cursor-pointer hover:opacity-90 transition pl-1"
              >
                <span>ANKIT KUMAR</span>
                <FaAngleDown className="text-xs" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 top-9 w-48 bg-white text-gray-800 rounded-md shadow-2xl py-2 z-50 border border-gray-100">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs font-bold text-gray-900">Ankit Kumar</p>
                    <p className="text-[11px] text-gray-500">Super Administrator</p>
                  </div>
                  <button
                    onClick={() => {
                      navigate("/dashboard/profile");
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
                  >
                    My Profile
                  </button>
                  <button
                    onClick={() => {
                      window.location.href = "/dashboard";
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-blue-600 hover:bg-gray-100 border-t border-gray-100 font-semibold"
                  >
                    Back to Main ERP
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* QUICK ACCESS BAR (MATCHING SCREENSHOT EXACTLY) */}
        <div
          className="h-9 border-t border-white/20 flex items-center justify-between shadow-xs flex-shrink-0 transition-colors duration-300 relative select-none"
          style={{ backgroundColor: activeTheme.headerBg }}
        >
          {/* Left White Button Box */}
          <button
            onClick={() => {
              setActiveTabId("dashboard");
              setOpenMenu("");
            }}
            className="bg-white h-full px-4 flex items-center gap-2 shadow-xs cursor-pointer font-bold text-xs tracking-wider"
            style={{ color: activeTheme.headerBg }}
          >
            <span>QUICK ACCESS</span>
            <FaAngleRight className="text-xs font-bold" />
          </button>

          {/* Right White Customize Box */}
          <button
            onClick={() => setIsThemeDrawerOpen(true)}
            className="bg-white h-full px-3 flex flex-col items-center justify-center shadow-xs cursor-pointer hover:bg-gray-50 transition"
            style={{ color: activeTheme.headerBg }}
            title="Customize Theme"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" />
              <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-30 12 12)" />
              <circle cx="12" cy="12" r="2" fill="currentColor" />
            </svg>
            <span className="text-[9px] font-semibold leading-tight">Customize</span>
          </button>
        </div>

        {/* ==================== THEME DRAWER MODAL (MATCHING MARKSMANAGER.JSX) ==================== */}
        {isThemeDrawerOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Transparent Backdrop */}
            <div
              onClick={() => setIsThemeDrawerOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-[0.5px] transition-opacity"
            ></div>

            {/* Drawer Panel */}
            <div className="relative w-64 bg-white h-full shadow-2xl z-50 flex flex-col animate-slideLeft border-l border-gray-200 select-none">
              
              {/* Top Header */}
              <div
                className="h-12 px-4 flex items-center justify-between text-white font-bold text-sm tracking-wide"
                style={{ backgroundColor: activeTheme.headerBg }}
              >
                <span>THEME</span>
                <button
                  type="button"
                  onClick={() => setIsThemeDrawerOpen(false)}
                  className="text-white hover:text-gray-200 text-base leading-none p-1 cursor-pointer"
                  title="Close"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="p-4 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
                
                {/* Section 1: With Light sidebar */}
                <div className="flex flex-col gap-3">
                  <h4 className="text-xs font-bold text-gray-800 tracking-tight">With Light sidebar</h4>
                  
                  <div className="grid grid-cols-3 gap-3">
                    {/* Swatch 1: Charcoal */}
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentThemeKey("light-charcoal");
                        localStorage.setItem("erp_active_theme", "light-charcoal");
                      }}
                      className={`w-14 h-14 rounded-[2px] cursor-pointer transition-transform hover:scale-105 flex items-center justify-center shadow-sm relative ${
                        currentThemeKey === "light-charcoal" ? "ring-2 ring-blue-500" : ""
                      }`}
                      style={{ backgroundColor: "#4a5568" }}
                      title="Charcoal (Light Sidebar)"
                    >
                      {currentThemeKey === "light-charcoal" && <FaCheck className="text-white text-base" />}
                    </button>

                    {/* Swatch 2: Bright Mint Green */}
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentThemeKey("light-green");
                        localStorage.setItem("erp_active_theme", "light-green");
                      }}
                      className={`w-14 h-14 rounded-[2px] cursor-pointer transition-transform hover:scale-105 flex items-center justify-center shadow-sm relative ${
                        currentThemeKey === "light-green" ? "ring-2 ring-blue-500" : ""
                      }`}
                      style={{ backgroundColor: "#48d68f" }}
                      title="Mint Green (Light Sidebar)"
                    >
                      {currentThemeKey === "light-green" && <FaCheck className="text-white text-base" />}
                    </button>

                    {/* Swatch 3: Steel Slate */}
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentThemeKey("light-slate");
                        localStorage.setItem("erp_active_theme", "light-slate");
                      }}
                      className={`w-14 h-14 rounded-[2px] cursor-pointer transition-transform hover:scale-105 flex items-center justify-center shadow-sm relative ${
                        currentThemeKey === "light-slate" ? "ring-2 ring-blue-500" : ""
                      }`}
                      style={{ backgroundColor: "#9ba9ba" }}
                      title="Steel Slate (Light Sidebar)"
                    >
                      {currentThemeKey === "light-slate" && <FaCheck className="text-white text-base" />}
                    </button>

                    {/* Swatch 4: Sky Blue */}
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentThemeKey("light-cyan");
                        localStorage.setItem("erp_active_theme", "light-cyan");
                      }}
                      className={`w-14 h-14 rounded-[2px] cursor-pointer transition-transform hover:scale-105 flex items-center justify-center shadow-sm relative ${
                        currentThemeKey === "light-cyan" ? "ring-2 ring-blue-500" : ""
                      }`}
                      style={{ backgroundColor: "#22a3d7" }}
                      title="Sky Blue (Light Sidebar)"
                    >
                      {currentThemeKey === "light-cyan" && <FaCheck className="text-white text-base" />}
                    </button>

                    {/* Swatch 5: Indigo Purple */}
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentThemeKey("light-purple");
                        localStorage.setItem("erp_active_theme", "light-purple");
                      }}
                      className={`w-14 h-14 rounded-[2px] cursor-pointer transition-transform hover:scale-105 flex items-center justify-center shadow-sm relative ${
                        currentThemeKey === "light-purple" ? "ring-2 ring-blue-500" : ""
                      }`}
                      style={{ backgroundColor: "#6d78d2" }}
                      title="Purple (Light Sidebar)"
                    >
                      {currentThemeKey === "light-purple" && <FaCheck className="text-white text-base" />}
                    </button>
                  </div>
                </div>

                {/* Section 2: With Dark sidebar */}
                <div className="flex flex-col gap-3">
                  <h4 className="text-xs font-bold text-gray-800 tracking-tight">With Dark sidebar</h4>
                  
                  <div className="grid grid-cols-3 gap-3">
                    {/* Swatch 6: Dark + Coral Red */}
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentThemeKey("dark-coral");
                        localStorage.setItem("erp_active_theme", "dark-coral");
                      }}
                      className={`w-14 h-14 rounded-[2px] cursor-pointer transition-transform hover:scale-105 overflow-hidden flex shadow-sm relative ${
                        currentThemeKey === "dark-coral" ? "ring-2 ring-blue-500" : ""
                      }`}
                      title="Coral Red (Dark Sidebar)"
                    >
                      <div className="w-1/4 h-full bg-[#3b434e]"></div>
                      <div className="w-3/4 h-full bg-[#ff6b6b] flex items-center justify-center">
                        {currentThemeKey === "dark-coral" && <FaCheck className="text-white text-base" />}
                      </div>
                    </button>

                    {/* Swatch 7: Dark + Emerald Green */}
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentThemeKey("dark-emerald");
                        localStorage.setItem("erp_active_theme", "dark-emerald");
                      }}
                      className={`w-14 h-14 rounded-[2px] cursor-pointer transition-transform hover:scale-105 overflow-hidden flex shadow-sm relative ${
                        currentThemeKey === "dark-emerald" ? "ring-2 ring-blue-500" : ""
                      }`}
                      title="Emerald Green (Dark Sidebar)"
                    >
                      <div className="w-1/4 h-full bg-[#3b434e]"></div>
                      <div className="w-3/4 h-full bg-[#00b894] flex items-center justify-center">
                        {currentThemeKey === "dark-emerald" && <FaCheck className="text-white text-base" />}
                      </div>
                    </button>

                    {/* Swatch 8: Dark + Steel Slate */}
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentThemeKey("dark-slate");
                        localStorage.setItem("erp_active_theme", "dark-slate");
                      }}
                      className={`w-14 h-14 rounded-[2px] cursor-pointer transition-transform hover:scale-105 overflow-hidden flex shadow-sm relative ${
                        currentThemeKey === "dark-slate" ? "ring-2 ring-blue-500" : ""
                      }`}
                      title="Steel Slate (Dark Sidebar)"
                    >
                      <div className="w-1/4 h-full bg-[#3b434e]"></div>
                      <div className="w-3/4 h-full bg-[#9ba9ba] flex items-center justify-center">
                        {currentThemeKey === "dark-slate" && <FaCheck className="text-white text-base" />}
                      </div>
                    </button>

                    {/* Swatch 9: Dark + Sky Blue (Default with Checkmark) */}
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentThemeKey("dark-cyan");
                        localStorage.setItem("erp_active_theme", "dark-cyan");
                      }}
                      className={`w-14 h-14 rounded-[2px] cursor-pointer transition-transform hover:scale-105 overflow-hidden flex shadow-sm relative ${
                        currentThemeKey === "dark-cyan" ? "ring-2 ring-blue-500" : ""
                      }`}
                      title="Sky Blue (Dark Sidebar)"
                    >
                      <div className="w-1/4 h-full bg-[#3b434e]"></div>
                      <div className="w-3/4 h-full bg-[#22a3d7] flex items-center justify-center">
                        {currentThemeKey === "dark-cyan" && <FaCheck className="text-white text-base" />}
                      </div>
                    </button>

                    {/* Swatch 10: Dark + Lavender Purple */}
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentThemeKey("dark-purple");
                        localStorage.setItem("erp_active_theme", "dark-purple");
                      }}
                      className={`w-14 h-14 rounded-[2px] cursor-pointer transition-transform hover:scale-105 overflow-hidden flex shadow-sm relative ${
                        currentThemeKey === "dark-purple" ? "ring-2 ring-blue-500" : ""
                      }`}
                      title="Purple (Dark Sidebar)"
                    >
                      <div className="w-1/4 h-full bg-[#3b434e]"></div>
                      <div className="w-3/4 h-full bg-[#6d78d2] flex items-center justify-center">
                        {currentThemeKey === "dark-purple" && <FaCheck className="text-white text-base" />}
                      </div>
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed top-16 right-6 bg-[#2e3440] text-white px-4 py-2.5 rounded-md shadow-2xl text-xs font-semibold z-50 flex items-center gap-2 border-l-4 border-cyan-400">
            <FaCheckCircle className="text-cyan-400 text-base" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* CONTENT AREA */}
        <main className="flex-1 overflow-y-auto bg-[#eaedf1] custom-scrollbar px-3 pt-2 pb-6">
          <div className="w-full space-y-0">
            
            {/* DYNAMIC MULTI-TAB BAR WITH << AND >> OVERFLOW BUTTONS */}
            {openTabs.length > 0 && activeTabId !== "dashboard" && (
              <div className="flex items-center gap-1 select-none pl-1 mb-0 relative">
                {/* Left Scroll Button */}
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById("timetable-tabs-container");
                    if (el) el.scrollBy({ left: -180, behavior: "smooth" });
                  }}
                  className="px-1.5 py-1 text-xs text-gray-500 hover:text-gray-900 bg-[#e2e8f0] hover:bg-gray-300 rounded border border-gray-300 font-bold cursor-pointer"
                  title="Scroll Tabs Left"
                >
                  &lt;&lt;
                </button>

                {/* Tabs Scroll Container */}
                <div
                  id="timetable-tabs-container"
                  className="flex-1 flex items-end gap-1 overflow-x-auto no-scrollbar scroll-smooth"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {openTabs.map((tab) => {
                    const isActive = activeTabId === tab.id;
                    return (
                      <div
                        key={tab.id}
                        onClick={() => {
                          setActiveTabId(tab.id);
                          setOpenMenu(tab.parentId);
                        }}
                        className={`flex items-center gap-3 px-4 py-1.5 text-xs rounded-t border-t border-l border-r cursor-pointer transition-all duration-150 relative ${
                          isActive
                            ? "bg-white text-gray-900 font-bold border-gray-300 shadow-xs z-10 -mb-[1px]"
                            : "bg-[#e2e8f0] text-gray-600 hover:bg-[#cbd5e1] border-gray-300 font-medium"
                        }`}
                      >
                        <span className="whitespace-nowrap">{tab.title}</span>
                        <button
                          type="button"
                          onClick={(e) => handleCloseTab(tab.id, e)}
                          className="text-gray-400 hover:text-gray-800 hover:bg-gray-200/80 p-0.5 rounded transition"
                          title="Close Tab"
                        >
                          <FaTimes className="text-[10px]" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Right Scroll Button */}
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById("timetable-tabs-container");
                    if (el) el.scrollBy({ left: 180, behavior: "smooth" });
                  }}
                  className="px-1.5 py-1 text-xs text-gray-500 hover:text-gray-900 bg-[#e2e8f0] hover:bg-gray-300 rounded border border-gray-300 font-bold cursor-pointer"
                  title="Scroll Tabs Right"
                >
                  &gt;&gt;
                </button>
              </div>
            )}

            {/* TAB CONTENT AREA */}
            {activeTabId === "dashboard" || openTabs.length === 0 ? (
              <TimetableDashboardView
                todaySelectedClass={todaySelectedClass}
                setTodaySelectedClass={setTodaySelectedClass}
                onOpenPage={handleOpenPage}
                showToast={showToast}
              />
            ) : activeTabId === "timetable_global_setting" ? (
              <TimetableGlobalSettingView showToast={showToast} />
            ) : activeTabId === "teacher_setting" ? (
              <TeacherSettingView showToast={showToast} />
            ) : activeTabId === "class_setting" ? (
              <ClassSettingView showToast={showToast} />
            ) : activeTabId === "define_subject" ? (
              <DefineSubjectView showToast={showToast} />
            ) : activeTabId === "assign_subject_to_class" ? (
              <AssignSubjectToClassView showToast={showToast} />
            ) : activeTabId === "period_allotment" ? (
              <PeriodAllotmentView showToast={showToast} />
            ) : activeTabId === "define_resource" ? (
              <DefineResourceView showToast={showToast} />
            ) : activeTabId === "relate_resource_to_subject" ? (
              <RelateResourceToSubjectView showToast={showToast} />
            ) : activeTabId === "define_class_teacher" ? (
              <DefineClassTeacherView showToast={showToast} />
            ) : activeTabId === "class_teacher_subject" ? (
              <ClassTeacherSubjectView showToast={showToast} />
            ) : activeTabId === "period_time_setting" ? (
              <PeriodTimeSettingView showToast={showToast} />
            ) : activeTabId === "period_allotment_new" ? (
              <PeriodAllotmentNewView showToast={showToast} />
            ) : activeTabId === "change_academic_year" ? (
              <ChangeAcademicYearView showToast={showToast} />
            ) : activeTabId === "timetable_substitution_setting" ? (
              <TimetableSubstitutionSettingView showToast={showToast} />
            ) : activeTabId === "parallel_allocation" ? (
              <ParallelAllocationView showToast={showToast} />
            ) : activeTabId === "fixed_allocation" ? (
              <FixedAllocationView showToast={showToast} />
            ) : activeTabId === "consecutive_allocation" ? (
              <ConsecutiveAllocationView showToast={showToast} />
            ) : activeTabId === "preference_allocation" ? (
              <PreferenceAllocationView showToast={showToast} />
            ) : activeTabId === "create_predefined_timetable" ? (
              <CreatePredefinedTimetableView showToast={showToast} />
            ) : activeTabId === "auto_generate_timetable" ? (
              <AutoGenerateTimetableView showToast={showToast} />
            ) : activeTabId === "view_and_modify_timetable" ? (
              <ViewAndModifyTimetableView showToast={showToast} />
            ) : activeTabId === "replace_teacher" ? (
              <ReplaceTeacherView showToast={showToast} />
            ) : activeTabId === "assign_one_teacher_timetable_to_another" ? (
              <AssignOneTeacherTimetableToAnotherView showToast={showToast} />
            ) : activeTabId === "modify_timetable" ? (
              <ModifyTimetableView showToast={showToast} />
            ) : activeTabId === "modify_predefined_allocation" ? (
              <ModifyPredefinedAllocationView showToast={showToast} />
            ) : activeTabId === "transfer_timetable" ? (
              <TransferTimetableView showToast={showToast} />
            ) : activeTabId === "mark_attendance" ? (
              <MarkAttendanceView showToast={showToast} />
            ) : activeTabId === "substitution" ? (
              <SubstitutionView showToast={showToast} />
            ) : (
              <TimetableReportsView
                tabId={activeTabId}
                title={openTabs.find((t) => t.id === activeTabId)?.title || "Report Details"}
                showToast={showToast}
              />
            )}

          </div>
        </main>
      </div>
    </div>
  );
}

// =========================================================================
// 0. TIMETABLE DASHBOARD VIEW (MATCHING SCREENSHOTS 2, 3, 4)
// =========================================================================
function TimetableDashboardView({
  todaySelectedClass,
  setTodaySelectedClass,
  onOpenPage,
  showToast
}) {
  const [selectedClass, setSelectedClass] = useState(todaySelectedClass || "");
  const [stats, setStats] = useState({
    totalTeachers: 0,
    classTeachers: 0,
    presentToday: 0,
    absentToday: 0,
    majorSubjects: 0,
    minorSubjects: 0,
    totalWings: 4,
    totalClasses: 0,
    classList: [],
    wingWiseTeachers: [],
    teacherWorkload: [],
    topSubstitutions: []
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/timetables/dashboard-stats`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setStats(prev => ({ ...prev, ...data }));
        }
      } catch (err) {
        console.error('Dashboard stats fetch failed:', err);
      }
    };
    fetchStats();
  }, []);

  const classOptions = ["Select Class", ...(stats.classList || [])];
  
  const wingData = (stats.wingWiseTeachers && stats.wingWiseTeachers.length > 0) 
    ? stats.wingWiseTeachers 
    : [
        { name: "Kindergarten", value: 33, color: "#ff6b6b" },
        { name: "Primary", value: 30, color: "#00b4d8" },
        { name: "Middle", value: 7, color: "#ff7a85" },
        { name: "Higher", value: 30, color: "#0096c7" }
      ];

  const yTicks = ["1.0", "0.9", "0.8", "0.7", "0.6", "0.5", "0.4", "0.3", "0.2", "0.1", "0"];

  return (
    <div className="space-y-4 pt-1 select-none">
      
      {/* 1. TOP STAT CARDS (4 Cards matching Screenshot 2) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Head Count of Teachers */}
        <div className="bg-white p-5 rounded border border-gray-200/80 shadow-2xs">
          <h3 className="text-xs font-bold text-gray-800 text-center tracking-tight mb-4 leading-snug">
            HEAD COUNT OF TEACHERS<br />
            <span className="text-[11px] text-gray-500 font-semibold">(ENTITLED FOR TT)</span>
          </h3>
          <div className="space-y-3 px-2">
            <div className="flex items-center justify-between text-xs text-gray-700">
              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <span className="font-medium text-gray-600">Total Teachers</span>
              </div>
              <span className="font-bold text-gray-900 text-sm">{stats.totalTeachers}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-700">
              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <span className="font-medium text-gray-600">Class Teachers</span>
              </div>
              <span className="font-bold text-gray-900 text-sm">{stats.classTeachers}</span>
            </div>
          </div>
        </div>

        {/* Card 2: Today's Teachers Attendance */}
        <div className="bg-white p-5 rounded border border-gray-200/80 shadow-2xs">
          <h3 className="text-xs font-bold text-gray-800 text-center tracking-tight mb-4 leading-snug">
            TODAY'S TEACHERS<br />
            <span className="text-[11px] text-gray-800 font-bold">ATTENDANCE</span>
          </h3>
          <div className="space-y-3 px-2">
            <div className="flex items-center justify-between text-xs text-gray-700">
              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-emerald-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  <circle cx="18" cy="18" r="4" fill="#10b981" />
                  <path d="M16.5 18l1 1 2-2" stroke="white" strokeWidth="1.2" fill="none" />
                </svg>
                <span className="font-medium text-gray-600">Total Present</span>
              </div>
              <span className="font-bold text-gray-900 text-sm">{stats.presentToday}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-700">
              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-rose-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  <circle cx="18" cy="18" r="4" fill="#f43f5e" />
                  <path d="M16.5 16.5l3 3M19.5 16.5l-3 3" stroke="white" strokeWidth="1.2" fill="none" />
                </svg>
                <span className="font-medium text-gray-600">Total Absent</span>
              </div>
              <span className="font-bold text-gray-900 text-sm">{stats.absentToday}</span>
            </div>
          </div>
        </div>

        {/* Card 3: Subject Statistics */}
        <div className="bg-white p-5 rounded border border-gray-200/80 shadow-2xs">
          <h3 className="text-xs font-bold text-gray-800 text-center tracking-tight mb-4 leading-snug">
            SUBJECT STATISTICS<br />
            <span className="text-[11px] text-transparent select-none">.</span>
          </h3>
          <div className="space-y-3 px-2">
            <div className="flex items-center justify-between text-xs text-gray-700">
              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
                </svg>
                <span className="font-medium text-gray-600">Major Subjects</span>
              </div>
              <span className="font-bold text-gray-900 text-sm">{stats.majorSubjects}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-700">
              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
                </svg>
                <span className="font-medium text-gray-600">Minor Subjects</span>
              </div>
              <span className="font-bold text-gray-900 text-sm">{stats.minorSubjects}</span>
            </div>
          </div>
        </div>

        {/* Card 4: Wings & Classes */}
        <div className="bg-white p-5 rounded border border-gray-200/80 shadow-2xs">
          <h3 className="text-xs font-bold text-gray-800 text-center tracking-tight mb-4 leading-snug">
            HEAD COUNT OF TEACHERS<br />
            <span className="text-[11px] text-gray-500 font-semibold">(ENTITLED FOR TT)</span>
          </h3>
          <div className="space-y-3 px-2">
            <div className="flex items-center justify-between text-xs text-gray-700">
              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
                <span className="font-medium text-gray-600">Total Wings</span>
              </div>
              <span className="font-bold text-gray-900 text-sm">{stats.totalWings}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-700">
              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z" />
                </svg>
                <span className="font-medium text-gray-600">Total Classes</span>
              </div>
              <span className="font-bold text-gray-900 text-sm">{stats.totalClasses}</span>
            </div>
          </div>
        </div>

      </div>

      {/* 2. TODAY'S TIME-TABLE (AFTER SUBSTITUTION) */}
      <div className="bg-white p-5 rounded border border-gray-200/80 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-gray-800 tracking-tight">
            TODAY'S TIME-TABLE <span className="font-medium text-gray-600">(AFTER SUBSTITUTION)</span>
          </h3>
          <div className="relative">
            <select
              value={selectedClass}
              onChange={(e) => {
                setSelectedClass(e.target.value);
                if (setTodaySelectedClass) setTodaySelectedClass(e.target.value);
              }}
              className="text-xs border border-gray-300 rounded px-3 py-1.5 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-7 shadow-2xs"
            >
              {classOptions.map((c) => (
                <option key={c} value={c === "Select Class" ? "" : c}>
                  {c}
                </option>
              ))}
            </select>
            <FaAngleDown className="absolute right-2.5 top-2.5 text-[10px] pointer-events-none text-gray-400" />
          </div>
        </div>

        <div className="pt-2 text-xs font-bold text-gray-800">
          {new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
          }).replace(/ /g, "-").toUpperCase()}
        </div>

        <div className="h-14 border-t border-gray-100 flex items-center justify-center text-xs text-gray-400">
          {/* Default blank area matching screenshot 2 */}
        </div>
      </div>

      {/* 3. MIDDLE ROW: WORK LOAD ANALYSIS & WING WISE TEACHERS DETAIL */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Left: Teacher's Work Load Analysis (Exact SVG Graph Matching Screenshot) */}
        <div className="bg-white p-5 rounded border border-gray-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between pb-1">
            <h3 className="text-xs font-bold text-gray-800 tracking-tight">
              TEACHER'S WORK LOAD ANALYSIS
            </h3>
            <div className="flex items-center gap-3 text-[11px] text-gray-600">
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-2.5 rounded-2xs bg-[#ff6b6b] inline-block"></span>
                <span>Period Alloted</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-2.5 rounded-2xs bg-[#00a2db] inline-block"></span>
                <span>Substitution Alloted</span>
              </div>
            </div>
          </div>

          {/* Exact Pixel-Perfect SVG Graph with Ticks & Horizontal Grid Lines */}
          <div className="w-full flex justify-center items-center pt-2">
            <svg viewBox="0 0 520 230" className="w-full h-[240px] select-none">
              {/* Y Axis Vertical Label */}
              <text
                x="-110"
                y="18"
                transform="rotate(-90)"
                textAnchor="middle"
                fill="#64748b"
                fontSize="11"
                fontWeight="700"
                fontFamily="sans-serif"
                letterSpacing="0.5"
              >
                NO. OF PERIODS (IN WEEK)
              </text>

              {/* 11 Horizontal Grid Lines & Ticks */}
              {[
                { val: "1.0", y: 20 },
                { val: "0.9", y: 38 },
                { val: "0.8", y: 56 },
                { val: "0.7", y: 74 },
                { val: "0.6", y: 92 },
                { val: "0.5", y: 110 },
                { val: "0.4", y: 128 },
                { val: "0.3", y: 146 },
                { val: "0.2", y: 164 },
                { val: "0.1", y: 182 },
                { val: "0", y: 200 }
              ].map((item) => (
                <g key={item.val}>
                  {/* Y Tick Text */}
                  <text
                    x="62"
                    y={item.y + 4}
                    textAnchor="end"
                    fill="#64748b"
                    fontSize="10"
                    fontFamily="sans-serif"
                    fontWeight="500"
                  >
                    {item.val}
                  </text>
                  {/* Tick Mark on Axis */}
                  <line x1="66" y1={item.y} x2="70" y2={item.y} stroke="#cbd5e1" strokeWidth="1" />
                  {/* Full Horizontal Grid Line */}
                  <line
                    x1="70"
                    y1={item.y}
                    x2="505"
                    y2={item.y}
                    stroke={item.val === "0" ? "#94a3b8" : "#f1f5f9"}
                    strokeWidth={item.val === "0" ? "1.2" : "1"}
                  />
                </g>
              ))}

              {/* Y Axis Line */}
              <line x1="70" y1="20" x2="70" y2="200" stroke="#cbd5e1" strokeWidth="1" />

              {/* X Axis Label */}
              <text
                x="287"
                y="222"
                textAnchor="middle"
                fill="#475569"
                fontSize="11"
                fontWeight="700"
                fontFamily="sans-serif"
                letterSpacing="1"
              >
                TEACHERS
              </text>
              
              {/* Dynamic Bars and Teacher Names */}
              {stats.teacherWorkload && stats.teacherWorkload.map((t, idx) => {
                 const barWidth = 14;
                 const gap = 34;
                 const xStart = 85 + (idx * gap);
                 const totalPeriodsMax = 60; // Max periods for y-scale
                 
                 // Calculate scaled heights (Max y is 20, Min y is 200, so height is 180)
                 const periodHeight = Math.min((t.periodsAllocated / totalPeriodsMax) * 180, 180);
                 const subHeight = Math.min((t.substitutionAllocated / totalPeriodsMax) * 180, 180);
                 
                 return (
                   <g key={idx}>
                     {/* Period Alloted Bar */}
                     <rect 
                        x={xStart} 
                        y={200 - periodHeight} 
                        width={barWidth} 
                        height={periodHeight} 
                        fill="#ff6b6b" 
                        rx="2"
                     />
                     {/* Substitution Alloted Bar */}
                     <rect 
                        x={xStart + barWidth + 2} 
                        y={200 - subHeight} 
                        width={barWidth} 
                        height={subHeight} 
                        fill="#00a2db" 
                        rx="2"
                     />
                     {/* Teacher Name (Rotated) */}
                     <text
                       x={xStart + barWidth}
                       y="212"
                       transform={`rotate(-45, ${xStart + barWidth}, 212)`}
                       textAnchor="end"
                       fill="#64748b"
                       fontSize="9"
                       fontFamily="sans-serif"
                     >
                       {t.teacher.substring(0, 10)}
                     </text>
                   </g>
                 );
              })}
            </svg>
          </div>
        </div>

        {/* Right: Wing Wise Teachers Detail (Exact Donut Chart Matching Screenshot) */}
        <div className="bg-white p-5 rounded border border-gray-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <h3 className="text-xs font-bold text-gray-800 tracking-tight">
              WING WISE TEACHERS DETAIL
            </h3>
            <div className="flex flex-col gap-1.5 text-[11px] text-gray-700">
              {wingData.map((w, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-2xs inline-block" style={{ backgroundColor: w.color }}></span>
                  <span>{w.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Exact Bigger & Centered Pixel-Perfect SVG Donut Chart with Leader Lines and Smooth Spin-in Animation */}
          <div className="w-full flex-1 flex justify-center items-center py-2">
            <svg viewBox="0 0 380 270" className="w-full max-w-[380px] h-[255px] select-none overflow-visible">
              {/* Rotating Donut Ring Group */}
              <g className="animate-donut-spin">
                {wingData.map((wing, index) => {
                   const total = wingData.reduce((acc, curr) => acc + curr.value, 0) || 1;
                   let prevTotal = 0;
                   for(let i = 0; i < index; i++) prevTotal += wingData[i].value;
                   
                   const startAngle = (prevTotal / total) * 360;
                   const endAngle = ((prevTotal + wing.value) / total) * 360;
                   
                   const toRad = (d) => ((d - 90) * Math.PI) / 180;
                   const s = toRad(startAngle);
                   const e = toRad(endAngle - 0.5); // 0.5 degree gap
                   
                   const x1 = 190 + 92 * Math.cos(s);
                   const y1 = 135 + 92 * Math.sin(s);
                   const x2 = 190 + 92 * Math.cos(e);
                   const y2 = 135 + 92 * Math.sin(e);
                   const x3 = 190 + 52 * Math.cos(e);
                   const y3 = 135 + 52 * Math.sin(e);
                   const x4 = 190 + 52 * Math.cos(s);
                   const y4 = 135 + 52 * Math.sin(s);
                   
                   // Check if arc is > 180 degrees
                   const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
                   
                   return (
                     <path
                       key={index}
                       d={`M ${x1} ${y1} A 92 92 0 ${largeArcFlag} 1 ${x2} ${y2} L ${x3} ${y3} A 52 52 0 ${largeArcFlag} 0 ${x4} ${y4} Z`}
                       fill={wing.color}
                       stroke="#ffffff"
                       strokeWidth="2.5"
                     />
                   );
                })}
              </g>

              {/* Center White Hole & Total Counter with Pop-in Animation */}
              <g className="animate-center-pop">
                <circle cx="190" cy="135" r="51" fill="#ffffff" />
                <text
                  x="190"
                  y="157"
                  textAnchor="middle"
                  fill="#000000"
                  style={{ fontSize: "64px", fontWeight: "900", fontFamily: "sans-serif" }}
                >
                  {stats.totalTeachers}
                </text>
              </g>
            </svg>
          </div>
        </div>

      </div>

      {/* 4. BOTTOM ROW: TOP 10 SUBSTITUTION LOAD ANALYSIS (YTD) */}
      <div className="bg-white p-5 rounded border border-gray-200/80 shadow-2xs space-y-2">
        <h3 className="text-xs font-bold text-gray-800 tracking-tight pb-1">
          TOP 10 SUBSTITUTION LOAD ANALYSIS <span className="font-semibold text-gray-500">(YTD)</span>
        </h3>

        {/* Exact Full-Width SVG Graph with Ticks & Horizontal Grid Lines */}
        <div className="w-full flex justify-center items-center pt-2">
          <svg viewBox="0 0 1060 230" className="w-full h-[240px] select-none">
            {/* Y Axis Vertical Label */}
            <text
              x="-110"
              y="24"
              transform="rotate(-90)"
              textAnchor="middle"
              fill="#64748b"
              fontSize="11"
              fontWeight="700"
              fontFamily="sans-serif"
              letterSpacing="0.5"
            >
              NO. OF SUBSTITUTION
            </text>

            {/* 11 Horizontal Grid Lines & Ticks */}
            {[
              { val: "1.0", y: 20 },
              { val: "0.9", y: 38 },
              { val: "0.8", y: 56 },
              { val: "0.7", y: 74 },
              { val: "0.6", y: 92 },
              { val: "0.5", y: 110 },
              { val: "0.4", y: 128 },
              { val: "0.3", y: 146 },
              { val: "0.2", y: 164 },
              { val: "0.1", y: 182 },
              { val: "0", y: 200 }
            ].map((item) => (
              <g key={item.val}>
                {/* Y Tick Text */}
                <text
                  x="62"
                  y={item.y + 4}
                  textAnchor="end"
                  fill="#64748b"
                  fontSize="10"
                  fontFamily="sans-serif"
                  fontWeight="500"
                >
                  {item.val}
                </text>
                {/* Tick Mark on Axis */}
                <line x1="66" y1={item.y} x2="70" y2={item.y} stroke="#cbd5e1" strokeWidth="1" />
                {/* Full Horizontal Grid Line */}
                <line
                  x1="70"
                  y1={item.y}
                  x2="1045"
                  y2={item.y}
                  stroke={item.val === "0" ? "#94a3b8" : "#f1f5f9"}
                  strokeWidth={item.val === "0" ? "1.2" : "1"}
                />
              </g>
            ))}

            {/* Y Axis Line */}
            <line x1="70" y1="20" x2="70" y2="200" stroke="#cbd5e1" strokeWidth="1" />

            {/* X Axis Label */}
            <text
              x="557"
              y="222"
              textAnchor="middle"
              fill="#475569"
              fontSize="11"
              fontWeight="700"
              fontFamily="sans-serif"
              letterSpacing="1"
            >
              TEACHERS
            </text>
          </svg>
        </div>
      </div>

    </div>
  );
}

// =========================================================================
// 1. TIMETABLE GLOBAL SETTING VIEW
// =========================================================================
function TimetableGlobalSettingView({ showToast }) {
  const [staffType, setStaffType] = useState("All (13)");
  const [dayCriteria, setDayCriteria] = useState("weekday");
  const [periodStartWith, setPeriodStartWith] = useState("");
  const [validateBusyCondition, setValidateBusyCondition] = useState(false);
  const [showClassWisePeriodTime, setShowClassWisePeriodTime] = useState(false);
  const [isDeleteWithYesNo, setIsDeleteWithYesNo] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/global-settings`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setStaffType(data.staffType || "All (13)");
            setDayCriteria(data.dayCriteria || "weekday");
            setPeriodStartWith(data.periodStartWith || "");
            setValidateBusyCondition(data.validateBusyCondition || false);
            setShowClassWisePeriodTime(data.showClassWisePeriodTime || false);
            setIsDeleteWithYesNo(data.isDeleteWithYesNo !== false);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchSettings();
  }, []);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/global-settings`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          staffType,
          dayCriteria,
          periodStartWith,
          validateBusyCondition,
          showClassWisePeriodTime,
          isDeleteWithYesNo
        })
      });
      if (res.ok) {
        showToast("Timetable Global Settings Updated Successfully!");
      } else {
        showToast("Failed to update settings");
      }
    } catch (err) {
      console.error(err);
      showToast("Error updating settings");
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-b rounded-tr p-6 shadow-xs">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6">
        <div className="space-y-6">
          <p className="text-[13px] font-bold text-[#b91c1c] leading-tight">
            Note: Please select staff type who will be entitled for timetable
          </p>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-gray-900">
              Select staff type(s)
            </label>
            <div className="relative">
              <select
                value={staffType}
                onChange={(e) => setStaffType(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded px-3 py-2 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-xs"
              >
                <option value="All (13)">All (13)</option>
                <option value="Teaching Staff (9)">Teaching Staff (9)</option>
                <option value="Non-Teaching Staff (4)">Non-Teaching Staff (4)</option>
              </select>
              <FaAngleDown className="absolute right-3 top-3 text-[11px] pointer-events-none text-gray-500" />
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <label className="block text-xs font-bold text-gray-900">
              Validate teacher bussy condition in Time Table
            </label>
            <ToggleSwitch
              checked={validateBusyCondition}
              onChange={setValidateBusyCondition}
            />
          </div>

          <div className="space-y-2 pt-2">
            <label className="block text-xs font-bold text-gray-900">
              Is Delete with Yes/No option?
            </label>
            <ToggleSwitch
              checked={isDeleteWithYesNo}
              onChange={setIsDeleteWithYesNo}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-900">
              Day Criteria Setting
            </label>
            <div className="space-y-2 text-xs text-gray-800">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="dayCriteria"
                  value="daywise"
                  checked={dayCriteria === "daywise"}
                  onChange={() => setDayCriteria("daywise")}
                  className="cursor-pointer text-blue-600 focus:ring-0"
                />
                <span>Day Wise Criteria(Day1.Day2.Day3..)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer font-medium">
                <input
                  type="radio"
                  name="dayCriteria"
                  value="weekday"
                  checked={dayCriteria === "weekday"}
                  onChange={() => setDayCriteria("weekday")}
                  className="cursor-pointer text-blue-600 focus:ring-0"
                />
                <span>Week Day Criteria(Mon,Tue,Wed...)</span>
              </label>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-gray-900">
              Period Setting (Start with)
            </label>
            <input
              type="text"
              value={periodStartWith}
              onChange={(e) => setPeriodStartWith(e.target.value)}
              className="w-full text-xs border border-gray-300 rounded px-3 py-2 text-gray-800 outline-none hover:border-blue-400 focus:border-blue-500 shadow-xs"
            />
          </div>

          <div className="space-y-2 pt-1">
            <label className="block text-xs font-bold text-gray-900">
              Is show class wise period time?
            </label>
            <ToggleSwitch
              checked={showClassWisePeriodTime}
              onChange={setShowClassWisePeriodTime}
            />
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="button"
              onClick={handleUpdate}
              className="border border-[#0288d1] text-[#0288d1] hover:bg-blue-50 px-5 py-1.5 rounded text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs transition"
            >
              <FaSyncAlt className="text-xs" />
              <span>Update</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// 2. TEACHER SETTING VIEW
// =========================================================================
function TeacherSettingView({ showToast }) {

  const [teacherList, setTeacherList] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const token = localStorage.getItem("token");
        
        const staffRes = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/staffs?limit=100`, { headers: { Authorization: `Bearer ${token}` } });
        let allStaffs = [];
        if (staffRes.ok) {
          const staffData = await staffRes.json();
          allStaffs = Array.isArray(staffData) ? staffData : (staffData.data || []);
        }

        const settingsRes = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/teacher-settings`, { headers: { Authorization: `Bearer ${token}` } });
        let settingsData = [];
        if (settingsRes.ok) {
          settingsData = await settingsRes.json();
        }
        
        const merged = allStaffs.map((staff, index) => {
          const setting = settingsData.find(s => s.staff?._id === staff._id || s.staff === staff._id);
          return {
            sno: index + 1,
            _id: staff._id,
            name: `${staff.firstName || ''} ${staff.lastName || ''}`.trim(),
            gender: staff.gender || "Male",
            shortName: setting ? setting.shortName : "",
            periods: setting ? setting.maxPeriodsPerWeek : 48,
            checked: false
          };
        });
        setTeacherList(merged);
      } catch (err) { console.error(err); }
    };
    fetchTeachers();
  }, []);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const promises = teacherList.map(t => {
        return fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/teacher-settings`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ staff: t._id, shortName: t.shortName, maxPeriodsPerWeek: Number(t.periods) || 0 })
        });
      });
      await Promise.all(promises);
      showToast("Teacher Settings Updated Successfully!");
    } catch(err) {
      console.error(err);
      showToast("Error updating teacher settings");
    }
  };

  const handleShortNameChange = (sno, val) => {
    setTeacherList((prev) =>
      prev.map((t) => (t.sno === sno ? { ...t, shortName: val } : t))
    );
  };

  const handlePeriodsChange = (sno, val) => {
    setTeacherList((prev) =>
      prev.map((t) => (t.sno === sno ? { ...t, periods: val } : t))
    );
  };

  const handleCheckboxChange = (sno) => {
    setTeacherList((prev) =>
      prev.map((t) => (t.sno === sno ? { ...t, checked: !t.checked } : t))
    );
  };

  return (
    <div className="bg-white border border-gray-300 rounded-b rounded-tr p-4 md:p-6 shadow-xs space-y-4">
      <div className="border border-gray-200 rounded overflow-hidden">
        <div className="max-h-[520px] overflow-y-auto custom-scrollbar">
          <table className="w-full text-left text-xs border-collapse">
            <tbody className="divide-y divide-gray-100">
              {teacherList.map((teacher) => {
                const isHighlighted = selectedRow === teacher.sno;
                return (
                  <tr
                    key={teacher.sno}
                    onClick={() => setSelectedRow(teacher.sno)}
                    className={`transition-colors cursor-pointer ${
                      isHighlighted ? "bg-[#dbeafe]" : "hover:bg-gray-50/70"
                    }`}
                  >
                    <td className="py-2 px-3 w-12 text-gray-800 font-medium text-center">{teacher.sno}</td>
                    <td className="py-2 px-4 w-72 font-semibold text-gray-900 uppercase">{teacher.name}</td>
                    <td className="py-2 px-4 w-28 text-gray-700">{teacher.gender}</td>
                    <td className="py-2 px-3 w-80">
                      <input
                        type="text"
                        value={teacher.shortName}
                        onChange={(e) => handleShortNameChange(teacher.sno, e.target.value)}
                        className="w-full text-xs border border-gray-300 rounded px-2.5 py-1 text-gray-800 bg-white outline-none hover:border-blue-400 focus:border-blue-500 shadow-2xs uppercase"
                      />
                    </td>
                    <td className="py-2 px-3 w-72">
                      <input
                        type="text"
                        value={teacher.periods}
                        onChange={(e) => handlePeriodsChange(teacher.sno, e.target.value)}
                        className="w-full text-xs border border-gray-300 rounded px-2.5 py-1 text-gray-800 bg-white outline-none hover:border-blue-400 focus:border-blue-500 shadow-2xs"
                      />
                    </td>
                    <td className="py-2 px-4 w-12 text-center">
                      <input
                        type="checkbox"
                        checked={teacher.checked}
                        onChange={() => handleCheckboxChange(teacher.sno)}
                        className="w-3.5 h-3.5 border-gray-300 rounded text-blue-600 focus:ring-0 cursor-pointer"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="pt-2 flex justify-center">
        <button
          type="button"
          onClick={handleUpdate}
          className="border border-[#0288d1] text-[#0288d1] hover:bg-blue-50 px-6 py-1.5 rounded text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs transition"
        >
          <FaSyncAlt className="text-xs" />
          <span>Update</span>
        </button>
      </div>
    </div>
  );
}

// =========================================================================
// 3. CLASS SETTING VIEW
// =========================================================================
function ClassSettingView({ showToast }) {

  const [classList, setClassList] = useState([]);
  const [selectedClassRow, setSelectedClassRow] = useState(null);

  useEffect(() => {
    const fetchClassSettings = async () => {
      try {
        const token = localStorage.getItem("token");
        
        // Fetch classes
        const classesRes = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/school-classes`, { headers: { Authorization: `Bearer ${token}` } });
        let classesData = [];
        if (classesRes.ok) {
          const classJson = await classesRes.json();
          classesData = Array.isArray(classJson) ? classJson : (classJson.data || []);
        }

        // Fetch settings
        const settingsRes = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/class-settings`, { headers: { Authorization: `Bearer ${token}` } });
        let settingsData = [];
        if (settingsRes.ok) {
          settingsData = await settingsRes.json();
        }
        
        let merged = [];
        let sno = 1;
        
        for (const cls of classesData) {
          const sections = cls.sections || [];
          for (const sec of sections) {
            const secId = sec.section || sec._id;
            const setting = settingsData.find(s => 
              (s.class?._id === cls._id || s.class === cls._id) && 
              (s.section?._id === secId || s.section === secId)
            );
            merged.push({
              sno: sno++,
              _id: cls._id,
              sectionId: secId,
              class: cls.className,
              section: sec.sectionName || sec.name || "A",
              wing: "General",
              workingDays: setting ? setting.weekPeriods : "",
              periodsPerDay: setting ? setting.periodsPerDay : "",
              recess1: setting ? setting.recess1 : "",
              recess2: setting ? setting.recess2 : ""
            });
          }
        }
        setClassList(merged);
      } catch (err) { console.error(err); }
    };
    fetchClassSettings();
  }, []);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const promises = classList.map(c => {
        return fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/class-settings`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ 
            class: c._id, 
            section: c.sectionId, 
            weekPeriods: Number(c.workingDays) || 0,
            periodsPerDay: Number(c.periodsPerDay) || 0,
            recess1: Number(c.recess1) || 0,
            recess2: Number(c.recess2) || 0
          })
        });
      });
      await Promise.all(promises);
      showToast("Class Settings Updated Successfully!");
    } catch(err) {
      console.error(err);
      showToast("Error updating class settings");
    }
  };

  const handleInputChange = (sno, field, val) => {
    setClassList((prev) =>
      prev.map((c) => (c.sno === sno ? { ...c, [field]: val } : c))
    );
  };

  return (
    <div className="bg-white border border-gray-300 rounded-b rounded-tr p-4 md:p-6 shadow-xs space-y-4">
      <div className="border border-gray-200 rounded overflow-hidden">
        <div className="max-h-[520px] overflow-y-auto custom-scrollbar">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-white sticky top-0 z-10 border-b border-gray-200 select-none shadow-2xs">
              <tr className="text-gray-900 font-bold">
                <th className="py-2.5 px-3 w-12 text-center">SNo.</th>
                <th className="py-2.5 px-3 w-16 text-center">Class</th>
                <th className="py-2.5 px-3 w-16 text-center">Section</th>
                
                <th className="py-2.5 px-3 w-48">
                  <div className="flex items-center gap-1.5">
                    <button className="border border-[#0288d1] text-[#0288d1] bg-white px-2 py-0.5 rounded text-[11px] font-bold flex items-center gap-1 shadow-2xs hover:bg-blue-50">
                      <FaEdit className="text-[10px]" />
                      <span>Working Days</span>
                    </button>
                    <span className="text-gray-700 font-semibold text-[11px]">(Per Week)</span>
                  </div>
                </th>

                <th className="py-2.5 px-3 w-48">
                  <div className="flex items-center gap-1.5">
                    <button className="border border-[#0288d1] text-[#0288d1] bg-white px-2 py-0.5 rounded text-[11px] font-bold flex items-center gap-1 shadow-2xs hover:bg-blue-50">
                      <FaEdit className="text-[10px]" />
                      <span>Periods</span>
                    </button>
                    <span className="text-gray-700 font-semibold text-[11px]">(Per Day)</span>
                  </div>
                </th>

                <th className="py-2.5 px-3 w-64">
                  <div className="flex items-center gap-1.5">
                    <button className="border border-[#0288d1] text-[#0288d1] bg-white px-2 py-0.5 rounded text-[11px] font-bold flex items-center gap-1 shadow-2xs hover:bg-blue-50">
                      <FaEdit className="text-[10px]" />
                      <span>Recess1 after Periods</span>
                    </button>
                    <span className="text-gray-700 font-semibold text-[11px]">(Per Week)</span>
                  </div>
                </th>

                <th className="py-2.5 px-3 w-64">
                  <div className="flex items-center gap-1.5">
                    <button className="border border-[#0288d1] text-[#0288d1] bg-white px-2 py-0.5 rounded text-[11px] font-bold flex items-center gap-1 shadow-2xs hover:bg-blue-50">
                      <FaEdit className="text-[10px]" />
                      <span>Recess2 after Periods</span>
                    </button>
                    <span className="text-gray-700 font-semibold text-[11px]">(Per Week)</span>
                  </div>
                </th>

                <th className="py-2.5 px-4 w-32 font-bold text-gray-800">Class Wing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {classList.map((c) => {
                const isHighlighted = selectedClassRow === c.sno;
                return (
                  <tr
                    key={c.sno}
                    onClick={() => setSelectedClassRow(c.sno)}
                    className={`transition-colors cursor-pointer ${
                      isHighlighted ? "bg-[#dbeafe]" : "hover:bg-gray-50/70"
                    }`}
                  >
                    <td className="py-1.5 px-3 text-center text-gray-800 font-medium">{c.sno}</td>
                    <td className="py-1.5 px-3 text-center font-bold text-gray-900">{c.class}</td>
                    <td className="py-1.5 px-3 text-center font-bold text-gray-900">{c.section}</td>

                    <td className="py-1.5 px-3">
                      <input
                        type="text"
                        value={c.workingDays}
                        onChange={(e) => handleInputChange(c.sno, "workingDays", e.target.value)}
                        className="w-full text-xs border border-gray-300 rounded px-2.5 py-1 text-gray-800 bg-white outline-none hover:border-blue-400 focus:border-blue-500 shadow-2xs"
                      />
                    </td>

                    <td className="py-1.5 px-3">
                      <input
                        type="text"
                        value={c.periodsPerDay}
                        onChange={(e) => handleInputChange(c.sno, "periodsPerDay", e.target.value)}
                        className="w-full text-xs border border-gray-300 rounded px-2.5 py-1 text-gray-800 bg-white outline-none hover:border-blue-400 focus:border-blue-500 shadow-2xs"
                      />
                    </td>

                    <td className="py-1.5 px-3">
                      <input
                        type="text"
                        value={c.recess1}
                        onChange={(e) => handleInputChange(c.sno, "recess1", e.target.value)}
                        className="w-full text-xs border border-gray-300 rounded px-2.5 py-1 text-gray-800 bg-white outline-none hover:border-blue-400 focus:border-blue-500 shadow-2xs"
                      />
                    </td>

                    <td className="py-1.5 px-3">
                      <input
                        type="text"
                        value={c.recess2}
                        onChange={(e) => handleInputChange(c.sno, "recess2", e.target.value)}
                        className="w-full text-xs border border-gray-300 rounded px-2.5 py-1 text-gray-800 bg-white outline-none hover:border-blue-400 focus:border-blue-500 shadow-2xs"
                      />
                    </td>

                    <td className="py-1.5 px-4 font-semibold text-gray-700">{c.wing}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="pt-2 flex justify-center">
        <button
          type="button"
          onClick={handleUpdate}
          className="border border-[#0288d1] text-[#0288d1] hover:bg-blue-50 px-6 py-1.5 rounded text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs transition"
        >
          <FaSyncAlt className="text-xs" />
          <span>Update</span>
        </button>
      </div>
    </div>
  );
}

// =========================================================================
// 4. DEFINE SUBJECT VIEW (102 REAL SUBJECTS, PAGINATION 1-11, EDIT MODAL, COLOR PICKER)
// =========================================================================
const all102Subjects = [
  { sno: 1, name: "ACCOUNTANCY", abbrev: "Accoun", type: "Minor", color: "#3b112c", code: "", parent: "", library: false },
  { sno: 2, name: "ACTION RHYMES & CONV", abbrev: "ACTION RHYMES & CONV", type: "Major", color: "#ffffff", code: "", parent: "", library: false },
  { sno: 3, name: "ACTIVITY", abbrev: "ACT", type: "Major", color: "#22c55e", code: "", parent: "", library: false },
  { sno: 4, name: "ACTIVITY TIME", abbrev: "ACTIVITY TIME", type: "Major", color: "#ffffff", code: "", parent: "", library: false },
  { sno: 5, name: "ACTIVITY YOGA", abbrev: "ACTIVITY YOGA", type: "Major", color: "#ffffff", code: "", parent: "", library: false },
  { sno: 6, name: "AKSHAR STUDY TIME", abbrev: "AKSHAR STUDY TIME", type: "Major", color: "#ffffff", code: "", parent: "", library: false },
  { sno: 7, name: "ALPHABET STUDY TIME", abbrev: "ALPHABET STUDY TIME", type: "Major", color: "#ffffff", code: "", parent: "", library: false },
  { sno: 8, name: "ART/CRAFT", abbrev: "ART/CRA", type: "Major", color: "#6ee7b7", code: "", parent: "", library: false },
  { sno: 9, name: "ASSEMBLY+AEROBICS", abbrev: "ASSEMBLY+AEROBICS", type: "Major", color: "#ffffff", code: "", parent: "", library: false },
  { sno: 10, name: "ASSEMBLY+DANCE", abbrev: "ASSEMBLY+DANCE", type: "Major", color: "#ffffff", code: "", parent: "", library: false },
  { sno: 11, name: "ASSEMBLY+MUSIC", abbrev: "ASSEMBLY+MUSIC", type: "Major", color: "#ffffff", code: "", parent: "", library: false },
  { sno: 12, name: "ASTRONOMY & SPACE", abbrev: "ASTRO", type: "Minor", color: "#1e3a8a", code: "S012", parent: "", library: false },
  { sno: 13, name: "BENGALI", abbrev: "BEN", type: "Major", color: "#ffffff", code: "S013", parent: "", library: false },
  { sno: 14, name: "BIOLOGY", abbrev: "BIO", type: "Major", color: "#16a34a", code: "S014", parent: "", library: false },
  { sno: 15, name: "BIOTECHNOLOGY", abbrev: "BIOTECH", type: "Major", color: "#0d9488", code: "S015", parent: "", library: false },
  { sno: 16, name: "BOTANY", abbrev: "BOT", type: "Major", color: "#84cc16", code: "S016", parent: "", library: false },
  { sno: 17, name: "BUSINESS STUDIES", abbrev: "BST", type: "Major", color: "#f59e0b", code: "S017", parent: "", library: false },
  { sno: 18, name: "CALLIGRAPHY", abbrev: "CALLI", type: "Minor", color: "#ffffff", code: "", parent: "", library: false },
  { sno: 19, name: "CHEMISTRY", abbrev: "CHEM", type: "Major", color: "#0284c7", code: "S019", parent: "", library: false },
  { sno: 20, name: "CHESS & INDOOR GAMES", abbrev: "CHESS", type: "Minor", color: "#ffffff", code: "", parent: "", library: false },
  { sno: 21, name: "CIVICS", abbrev: "CIV", type: "Major", color: "#ea580c", code: "S021", parent: "", library: false },
  { sno: 22, name: "COMMERCE", abbrev: "COMM", type: "Major", color: "#d97706", code: "S022", parent: "", library: false },
  { sno: 23, name: "COMPUTER APPLICATION", abbrev: "COMP APP", type: "Major", color: "#4f46e5", code: "S023", parent: "", library: false },
  { sno: 24, name: "COMPUTER SCIENCE", abbrev: "CS", type: "Major", color: "#6366f1", code: "S024", parent: "", library: false },
  { sno: 25, name: "CONVERSATION & G.K.", abbrev: "CONV GK", type: "Major", color: "#ffffff", code: "", parent: "", library: false },
  { sno: 26, name: "CREATIVE WRITING", abbrev: "CREAT", type: "Minor", color: "#ffffff", code: "", parent: "", library: false },
  { sno: 27, name: "CURSIVE WRITING", abbrev: "CURSIVE", type: "Major", color: "#ffffff", code: "", parent: "", library: false },
  { sno: 28, name: "DISASTER MANAGEMENT", abbrev: "DM", type: "Minor", color: "#dc2626", code: "", parent: "", library: false },
  { sno: 29, name: "DRAMATICS & THEATRE", abbrev: "DRAMA", type: "Minor", color: "#c084fc", code: "", parent: "", library: false },
  { sno: 30, name: "DRAWING & COLOURING", abbrev: "DRAW", type: "Major", color: "#ec4899", code: "", parent: "", library: false },
  { sno: 31, name: "ECONOMICS", abbrev: "ECO", type: "Major", color: "#059669", code: "S031", parent: "", library: false },
  { sno: 32, name: "ENGLISH COMMUNICATION", abbrev: "ENG COMM", type: "Major", color: "#3b82f6", code: "S032", parent: "", library: false },
  { sno: 33, name: "ENGLISH CORE", abbrev: "ENG CORE", type: "Major", color: "#2563eb", code: "S033", parent: "", library: false },
  { sno: 34, name: "ENGLISH GRAMMAR", abbrev: "ENG GRM", type: "Major", color: "#1d4ed8", code: "S034", parent: "", library: false },
  { sno: 35, name: "ENGLISH LITERATURE", abbrev: "ENG LIT", type: "Major", color: "#1e40af", code: "S035", parent: "", library: false },
  { sno: 36, name: "ENTREPRENEURSHIP", abbrev: "ENTREP", type: "Major", color: "#d97706", code: "S036", parent: "", library: false },
  { sno: 37, name: "ENVIRONMENTAL SCIENCE (EVS)", abbrev: "EVS", type: "Major", color: "#10b981", code: "S037", parent: "", library: false },
  { sno: 38, name: "FINANCIAL LITERACY", abbrev: "FIN LIT", type: "Minor", color: "#ffffff", code: "", parent: "", library: false },
  { sno: 39, name: "FRENCH", abbrev: "FRN", type: "Minor", color: "#06b6d4", code: "S039", parent: "", library: false },
  { sno: 40, name: "GENERAL KNOWLEDGE", abbrev: "GK", type: "Major", color: "#8b5cf6", code: "S040", parent: "", library: false },
  { sno: 41, name: "GEOGRAPHY", abbrev: "GEO", type: "Major", color: "#047857", code: "S041", parent: "", library: false },
  { sno: 42, name: "GERMAN", abbrev: "GER", type: "Minor", color: "#ffffff", code: "", parent: "", library: false },
  { sno: 43, name: "HEALTH & PHYSICAL ED", abbrev: "HPE", type: "Major", color: "#ef4444", code: "S043", parent: "", library: false },
  { sno: 44, name: "HINDI GRAMMAR", abbrev: "HIN GRM", type: "Major", color: "#f97316", code: "S044", parent: "", library: false },
  { sno: 45, name: "HINDI LITERATURE", abbrev: "HIN LIT", type: "Major", color: "#ea580c", code: "S045", parent: "", library: false },
  { sno: 46, name: "HINDI RHYMES", abbrev: "HIN RHYME", type: "Major", color: "#ffffff", code: "", parent: "", library: false },
  { sno: 47, name: "HISTORY", abbrev: "HIST", type: "Major", color: "#b45309", code: "S047", parent: "", library: false },
  { sno: 48, name: "HOME SCIENCE", abbrev: "HOME SCI", type: "Major", color: "#db2777", code: "S048", parent: "", library: false },
  { sno: 49, name: "INFORMATION TECHNOLOGY", abbrev: "IT", type: "Major", color: "#4338ca", code: "S049", parent: "", library: false },
  { sno: 50, name: "KARATE & MARTIAL ARTS", abbrev: "KARATE", type: "Minor", color: "#ffffff", code: "", parent: "", library: false },
  { sno: 51, name: "LEGAL STUDIES", abbrev: "LEGAL", type: "Major", color: "#374151", code: "S051", parent: "", library: false },
  { sno: 52, name: "LIBRARY PERIOD", abbrev: "LIB", type: "Minor", color: "#64748b", code: "", parent: "", library: true },
  { sno: 53, name: "LIFE SKILLS", abbrev: "LIFE SKL", type: "Minor", color: "#ffffff", code: "", parent: "", library: false },
  { sno: 54, name: "MASS MEDIA STUDIES", abbrev: "MMS", type: "Minor", color: "#ffffff", code: "", parent: "", library: false },
  { sno: 55, name: "MATHEMATICS", abbrev: "MATH", type: "Major", color: "#dc2626", code: "S055", parent: "", library: false },
  { sno: 56, name: "MENTAL MATHS", abbrev: "M MATH", type: "Major", color: "#b91c1c", code: "S056", parent: "", library: false },
  { sno: 57, name: "MORAL SCIENCE", abbrev: "MORAL", type: "Major", color: "#facc15", code: "S057", parent: "", library: false },
  { sno: 58, name: "MUSIC & CHOIR", abbrev: "MUSIC", type: "Major", color: "#a855f7", code: "S058", parent: "", library: false },
  { sno: 59, name: "NUMBER WORK", abbrev: "NUM WRK", type: "Major", color: "#ffffff", code: "", parent: "", library: false },
  { sno: 60, name: "NURSERY RHYMES", abbrev: "NUR RHYME", type: "Major", color: "#ffffff", code: "", parent: "", library: false },
  { sno: 61, name: "PAINTING", abbrev: "PAINT", type: "Major", color: "#f43f5e", code: "S061", parent: "", library: false },
  { sno: 62, name: "PERSONALITY DEVELOPMENT", abbrev: "PD", type: "Minor", color: "#ffffff", code: "", parent: "", library: false },
  { sno: 63, name: "PHILOSOPHY", abbrev: "PHIL", type: "Major", color: "#475569", code: "S063", parent: "", library: false },
  { sno: 64, name: "PHYSICAL EDUCATION", abbrev: "PE", type: "Major", color: "#e11d48", code: "S064", parent: "", library: false },
  { sno: 65, name: "PHYSICS", abbrev: "PHY", type: "Major", color: "#2563eb", code: "S065", parent: "", library: false },
  { sno: 66, name: "POLITICAL SCIENCE", abbrev: "POL SCI", type: "Major", color: "#0891b2", code: "S066", parent: "", library: false },
  { sno: 67, name: "PSYCHOLOGY", abbrev: "PSYCH", type: "Major", color: "#9333ea", code: "S067", parent: "", library: false },
  { sno: 68, name: "PUNJABI", abbrev: "PUNJ", type: "Minor", color: "#ffffff", code: "", parent: "", library: false },
  { sno: 69, name: "REASONING & APTITUDE", abbrev: "REASON", type: "Major", color: "#ffffff", code: "", parent: "", library: false },
  { sno: 70, name: "RHYMES & STORYTELLING", abbrev: "RHYMES", type: "Major", color: "#ffffff", code: "", parent: "", library: false },
  { sno: 71, name: "ROBOTICS & CODING", abbrev: "ROBO", type: "Minor", color: "#0284c7", code: "S071", parent: "", library: false },
  { sno: 72, name: "SANSKRIT", abbrev: "SKT", type: "Major", color: "#ca8a04", code: "S072", parent: "", library: false },
  { sno: 73, name: "SCIENCE (INTEGRATED)", abbrev: "SCI", type: "Major", color: "#16a34a", code: "S073", parent: "", library: false },
  { sno: 74, name: "SCULPTURE", abbrev: "SCULP", type: "Minor", color: "#ffffff", code: "", parent: "", library: false },
  { sno: 75, name: "SKATING & GYMNASTICS", abbrev: "SKATE", type: "Minor", color: "#ffffff", code: "", parent: "", library: false },
  { sno: 76, name: "SOCIAL STUDIES (SST)", abbrev: "SST", type: "Major", color: "#c2410c", code: "S076", parent: "", library: false },
  { sno: 77, name: "SOCIOLOGY", abbrev: "SOC", type: "Major", color: "#7c3aed", code: "S077", parent: "", library: false },
  { sno: 78, name: "SPANISH", abbrev: "SPAN", type: "Minor", color: "#ffffff", code: "", parent: "", library: false },
  { sno: 79, name: "SPECIAL ABILITY CLASS", abbrev: "SPL CLS", type: "Minor", color: "#ffffff", code: "", parent: "", library: false },
  { sno: 80, name: "SPOKEN ENGLISH", abbrev: "SPK ENG", type: "Major", color: "#ffffff", code: "", parent: "", library: false },
  { sno: 81, name: "SPORTS & ATHLETICS", abbrev: "SPORTS", type: "Major", color: "#ef4444", code: "S081", parent: "", library: false },
  { sno: 82, name: "STEM LAB EXPERIMENTS", abbrev: "STEM", type: "Minor", color: "#0ea5e9", code: "", parent: "", library: false },
  { sno: 83, name: "STORY TELLING", abbrev: "STORY", type: "Major", color: "#ffffff", code: "", parent: "", library: false },
  { sno: 84, name: "SUPW & COMMUNITY WORK", abbrev: "SUPW", type: "Minor", color: "#ffffff", code: "", parent: "", library: false },
  { sno: 85, name: "SWIMMING", abbrev: "SWIM", type: "Minor", color: "#0284c7", code: "", parent: "", library: false },
  { sno: 86, name: "TABLE MANNERS & ETIQUETTE", abbrev: "T MANNERS", type: "Minor", color: "#ffffff", code: "", parent: "", library: false },
  { sno: 87, name: "TABLE TENNIS", abbrev: "TT", type: "Minor", color: "#ffffff", code: "", parent: "", library: false },
  { sno: 88, name: "TAEKWONDO", abbrev: "TAEK", type: "Minor", color: "#ffffff", code: "", parent: "", library: false },
  { sno: 89, name: "THINKING SKILLS", abbrev: "THINK", type: "Minor", color: "#ffffff", code: "", parent: "", library: false },
  { sno: 90, name: "TOTAL HEALTH & HYGIENE", abbrev: "HEALTH", type: "Minor", color: "#ffffff", code: "", parent: "", library: false },
  { sno: 91, name: "TYPOGRAPHY & COMP APPL", abbrev: "TYPO", type: "Minor", color: "#ffffff", code: "", parent: "", library: false },
  { sno: 92, name: "URDU", abbrev: "URDU", type: "Minor", color: "#ffffff", code: "", parent: "", library: false },
  { sno: 93, name: "VEDIC MATHS", abbrev: "V MATH", type: "Minor", color: "#ffffff", code: "", parent: "", library: false },
  { sno: 94, name: "VOCAL MUSIC (CLASSICAL)", abbrev: "VOC MUSIC", type: "Major", color: "#c026d3", code: "", parent: "", library: false },
  { sno: 95, name: "VOCATIONAL STUDIES", abbrev: "VOCAT", type: "Minor", color: "#ffffff", code: "", parent: "", library: false },
  { sno: 96, name: "WESTERN DANCE", abbrev: "W DANCE", type: "Minor", color: "#ffffff", code: "", parent: "", library: false },
  { sno: 97, name: "WESTERN MUSIC", abbrev: "W MUSIC", type: "Minor", color: "#ffffff", code: "", parent: "", library: false },
  { sno: 98, name: "WORLD GEOGRAPHY", abbrev: "W GEO", type: "Major", color: "#059669", code: "S098", parent: "", library: false },
  { sno: 99, name: "WORLD HISTORY", abbrev: "W HIST", type: "Major", color: "#9a3412", code: "S099", parent: "", library: false },
  { sno: 100, name: "YOGA & MEDITATION", abbrev: "YOGA", type: "Major", color: "#15803d", code: "S100", parent: "", library: false },
  { sno: 101, name: "VALUE EDUCATION", abbrev: "VALUE EDUCATION", type: "Major", color: "#000000", code: "", parent: "", library: false },
  { sno: 102, name: "WRITTEN", abbrev: "WRITTEN", type: "Major", color: "#ffffff", code: "", parent: "", library: false }
];

function DefineSubjectView({ showToast }) {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/subjects`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setSubjects(data.map((item, index) => ({ ...item, sno: index + 1 })));
      }
    } catch (err) {
      console.error(err);
      showToast("Failed to fetch subjects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Edit / Add Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);

  // Color Picker Popover State inside Modal
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [pickerHue, setPickerHue] = useState(0);

  // Filtered List
  const filteredSubjects = subjects.filter((s) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.abbrev.toLowerCase().includes(q) ||
      s.type.toLowerCase().includes(q) ||
      s.code.toLowerCase().includes(q)
    );
  });

  const totalEntries = filteredSubjects.length;
  const totalPages = Math.ceil(totalEntries / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalEntries);
  const currentEntries = filteredSubjects.slice(startIndex, endIndex);

  // Open Edit Modal
  const handleOpenEdit = (subject) => {
    setEditingSubject({ ...subject });
    setIsColorPickerOpen(false);
    setIsEditModalOpen(true);
  };

  // Open Add Modal
  const handleOpenAdd = () => {
    setEditingSubject({
      name: "",
      abbrev: "",
      type: "Major",
      color: "#000000",
      code: "",
      parent: "Select Subject",
      library: false
    });
    setIsColorPickerOpen(false);
    setIsEditModalOpen(true);
  };

  // Save Modal
  const handleSaveSubject = async () => {
    if (!editingSubject.name.trim()) {
      showToast("Subject Name is required");
      return;
    }
    
    try {
      const token = localStorage.getItem("token");
      const isUpdate = !!editingSubject._id;
      const url = `${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/subjects${isUpdate ? `/${editingSubject._id}` : ''}`;
      const method = isUpdate ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(editingSubject)
      });

      if (res.ok) {
        showToast(`Subject ${isUpdate ? 'Updated' : 'Created'} Successfully!`);
        setIsEditModalOpen(false);
        fetchSubjects();
      } else {
        const errorData = await res.json();
        showToast(errorData.message || "Failed to save subject");
      }
    } catch (err) {
      console.error(err);
      showToast("An error occurred while saving");
    }
  };

  // Delete Action
  const handleDeleteSubject = async (subject) => {
    if (!subject._id) return;
    if (!window.confirm(`Are you sure you want to delete ${subject.name}?`)) return;
    
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/subjects/${subject._id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        showToast("Subject Deleted Successfully");
        fetchSubjects();
      } else {
        showToast("Failed to delete subject");
      }
    } catch (err) {
      console.error(err);
      showToast("Error deleting subject");
    }
  };

  // Toggle Library Period
  const handleToggleLibrary = async (subject) => {
    if (!subject._id) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/subjects/${subject._id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ library: !subject.library })
      });
      if (res.ok) {
        showToast("Library setting updated");
        fetchSubjects();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-b rounded-tr p-4 md:p-6 shadow-xs space-y-4 relative">
      
      {/* Top Action Bar (Search Input + Buttons) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search pill box */}
        <div className="relative w-full sm:w-80">
          <FaSearch className="absolute left-3.5 top-3 text-gray-400 text-xs" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full text-xs pl-9 pr-3 py-2 border border-gray-300 rounded-full outline-none hover:border-blue-400 focus:border-blue-500 shadow-2xs"
          />
        </div>

        {/* Buttons on Right */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={handleOpenAdd}
            className="border border-[#0288d1] text-[#0288d1] hover:bg-blue-50 px-3.5 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
          >
            <FaPlus className="text-[10px]" />
            <span>Add New Subject</span>
          </button>
          <button
            onClick={() => showToast("Exporting Subject Catalog...")}
            className="border border-[#0288d1] text-[#0288d1] hover:bg-blue-50 px-4 py-1.5 rounded text-xs font-bold cursor-pointer shadow-2xs transition"
          >
            Export
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="border border-gray-200 rounded overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-white border-b border-gray-200 select-none shadow-2xs">
              <tr className="text-gray-900 font-bold">
                <th className="py-2.5 px-3 w-14 text-center">SNo. ▴</th>
                <th className="py-2.5 px-3 min-w-[200px]">Subject Name ⬍</th>
                <th className="py-2.5 px-3 min-w-[180px]">Abbreviation ⬍</th>
                <th className="py-2.5 px-3 w-28">Subject Type ⬍</th>
                
                {/* Color Code + [Set Color] Button in Header */}
                <th className="py-2.5 px-3 w-36">
                  <div className="flex items-center gap-2">
                    <span>Color Code</span>
                    <button
                      onClick={() => showToast("Bulk color configuration opened")}
                      className="border border-[#0288d1] text-[#0288d1] bg-white px-2 py-0.5 rounded text-[11px] font-bold shadow-2xs hover:bg-blue-50"
                    >
                      Set Color
                    </button>
                    <span>⬍</span>
                  </div>
                </th>

                <th className="py-2.5 px-3 w-28">Subject Code ⬍</th>
                <th className="py-2.5 px-3 w-32">Parent Subject ⬍</th>
                <th className="py-2.5 px-3 w-36 text-center">Set Library Period ⬍</th>
                <th className="py-2.5 px-3 w-24 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentEntries.map((sub) => (
                <tr key={sub.sno} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-2.5 px-3 text-center text-gray-800 font-medium">{sub.sno}</td>
                  <td className="py-2.5 px-3 font-semibold text-gray-900 uppercase">{sub.name}</td>
                  <td className="py-2.5 px-3 text-gray-800 uppercase">{sub.abbrev}</td>
                  <td className="py-2.5 px-3 text-gray-700">{sub.type}</td>

                  {/* Color Box */}
                  <td className="py-2.5 px-3">
                    <div
                      onClick={() => handleOpenEdit(sub)}
                      className="w-8 h-6 border border-gray-400 rounded-xs shadow-2xs cursor-pointer transition hover:scale-105"
                      style={{ backgroundColor: sub.color || "#ffffff" }}
                      title="Click to edit color"
                    />
                  </td>

                  <td className="py-2.5 px-3 text-gray-700">{sub.code || "-"}</td>
                  <td className="py-2.5 px-3 text-gray-700">{sub.parent || "-"}</td>

                  {/* Library Period Add Button */}
                  <td className="py-2.5 px-3 text-center">
                    <button
                      onClick={() => handleToggleLibrary(sub)}
                      className={`border px-3 py-0.5 rounded text-[11px] font-bold cursor-pointer transition shadow-2xs ${
                        sub.library
                          ? "bg-blue-600 text-white border-blue-600"
                          : "border-[#0288d1] text-[#0288d1] hover:bg-blue-50"
                      }`}
                    >
                      {sub.library ? "Added" : "Add"}
                    </button>
                  </td>

                  {/* Action Icons (Edit ✏️ & Delete 🗑️) */}
                  <td className="py-2.5 px-3 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => handleOpenEdit(sub)}
                        className="text-gray-500 hover:text-blue-600 p-1 cursor-pointer transition"
                        title="Edit Subject"
                      >
                        <FaEdit className="text-sm" />
                      </button>
                      <button
                        onClick={() => handleDeleteSubject(sub)}
                        className="text-red-500 hover:text-red-700 p-1 cursor-pointer transition"
                        title="Delete Subject"
                      >
                        <FaTrashAlt className="text-xs" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Footer (Matching Screenshot 1 & 2) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs text-gray-700">
        
        {/* Left Entries and Showing Info */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span>Show</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded px-2 py-1 text-xs outline-none cursor-pointer bg-white"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span>entries</span>
          </div>
          <span className="text-gray-500 font-medium">
            Showing {totalEntries === 0 ? 0 : startIndex + 1} to {endIndex} of {totalEntries} entries
          </span>
        </div>

        {/* Right Pagination Buttons (1, 2, 3, 4, 5 .. 11) */}
        <div className="flex items-center gap-1">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="px-2.5 py-1 text-xs border border-gray-300 rounded text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
            // Show pages 1, 2, 3, 4, 5 .. 11 intelligently
            if (
              pageNum === 1 ||
              pageNum === totalPages ||
              (pageNum >= currentPage - 2 && pageNum <= currentPage + 2) ||
              (pageNum <= 5 && currentPage <= 3) ||
              (pageNum >= totalPages - 4 && currentPage >= totalPages - 2)
            ) {
              const isActive = currentPage === pageNum;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1 text-xs rounded border transition cursor-pointer font-semibold ${
                    isActive
                      ? "bg-[#00c0ef] text-white border-[#00c0ef] shadow-2xs"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {pageNum}
                </button>
              );
            } else if (
              pageNum === currentPage - 3 ||
              pageNum === currentPage + 3
            ) {
              return <span key={pageNum} className="px-1 text-gray-400">..</span>;
            }
            return null;
          })}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="px-2.5 py-1 text-xs border border-gray-300 rounded text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            Next
          </button>
        </div>

      </div>

      {/* =====================================================================
          EDIT SUBJECT MODAL POPUP (MATCHES SCREENSHOT 3 & 4 100%)
          ===================================================================== */}
      {isEditModalOpen && editingSubject && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl border border-gray-200 overflow-visible relative animate-fadeIn">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-sm font-bold text-gray-800">
                {editingSubject.sno ? "Edit Subject" : "Add Subject"}
              </h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 text-sm p-1 rounded cursor-pointer"
              >
                <FaTimes />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              
              {/* Top Buttons (Update Color & Import CBSE/ICSE) */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
                  className="border border-[#0288d1] text-[#0288d1] hover:bg-blue-50 px-4 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <FaSyncAlt className="text-xs" />
                  <span>Update Color</span>
                </button>
                <button
                  type="button"
                  onClick={() => showToast("Importing CBSE / ICSE Subject Master...")}
                  className="border border-[#0288d1] text-[#0288d1] hover:bg-blue-50 px-4 py-1.5 rounded text-xs font-bold shadow-2xs cursor-pointer"
                >
                  Import CBSE and ICSE Subject
                </button>
              </div>

              {/* 2-Column Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-xs">
                
                {/* Left Column */}
                <div className="space-y-4">
                  {/* Parent Subject */}
                  <div className="space-y-1">
                    <label className="block font-bold text-gray-800">Parent Subject</label>
                    <div className="relative">
                      <select
                        value={editingSubject.parent || "Select Subject"}
                        onChange={(e) => setEditingSubject({ ...editingSubject, parent: e.target.value })}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800 bg-white outline-none cursor-pointer hover:border-blue-400 appearance-none pr-7 shadow-2xs"
                      >
                        <option value="Select Subject">Select Subject</option>
                        <option value="SCIENCE">SCIENCE</option>
                        <option value="MATHEMATICS">MATHEMATICS</option>
                        <option value="LANGUAGES">LANGUAGES</option>
                        <option value="COMMERCE">COMMERCE</option>
                      </select>
                      <FaAngleDown className="absolute right-2.5 top-3 text-[10px] text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Subject Name */}
                  <div className="space-y-1">
                    <label className="block font-bold text-gray-800">Subject Name</label>
                    <input
                      type="text"
                      value={editingSubject.name}
                      onChange={(e) => setEditingSubject({ ...editingSubject, name: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800 outline-none hover:border-blue-400 focus:border-blue-500 shadow-2xs uppercase font-medium"
                    />
                  </div>

                  {/* Subject Type */}
                  <div className="space-y-1">
                    <label className="block font-bold text-gray-800">Subject Type</label>
                    <div className="relative">
                      <select
                        value={editingSubject.type}
                        onChange={(e) => setEditingSubject({ ...editingSubject, type: e.target.value })}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800 bg-white outline-none cursor-pointer hover:border-blue-400 appearance-none pr-7 shadow-2xs"
                      >
                        <option value="Major">Major</option>
                        <option value="Minor">Minor</option>
                        <option value="Elective">Elective</option>
                        <option value="Co-Scholastic">Co-Scholastic</option>
                      </select>
                      <FaAngleDown className="absolute right-2.5 top-3 text-[10px] text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  {/* Subject Code */}
                  <div className="space-y-1">
                    <label className="block font-bold text-gray-800">Subject Code</label>
                    <input
                      type="text"
                      value={editingSubject.code}
                      onChange={(e) => setEditingSubject({ ...editingSubject, code: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800 outline-none hover:border-blue-400 focus:border-blue-500 shadow-2xs uppercase"
                    />
                  </div>

                  {/* Abbreviation */}
                  <div className="space-y-1">
                    <label className="block font-bold text-gray-800">Abbreviation</label>
                    <input
                      type="text"
                      value={editingSubject.abbrev}
                      onChange={(e) => setEditingSubject({ ...editingSubject, abbrev: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800 outline-none hover:border-blue-400 focus:border-blue-500 shadow-2xs uppercase font-medium"
                    />
                  </div>

                  {/* Set Color with Block Box & Interactive Color Picker Popover */}
                  <div className="space-y-1 relative">
                    <label className="block font-bold text-gray-800">Set Color</label>
                    <div className="flex items-center border border-gray-300 rounded overflow-hidden shadow-2xs">
                      <input
                        type="text"
                        value={editingSubject.color}
                        onChange={(e) => setEditingSubject({ ...editingSubject, color: e.target.value })}
                        className="w-full px-3 py-2 text-xs text-gray-800 outline-none uppercase font-mono"
                      />
                      <div
                        onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
                        className="w-14 h-8 cursor-pointer border-l border-gray-300 flex-shrink-0 transition hover:opacity-90"
                        style={{ backgroundColor: editingSubject.color || "#000000" }}
                        title="Click to choose color from palette"
                      />
                    </div>

                    {/* COLOR PICKER GRIDDING POPOVER (MATCHES SCREENSHOT 4 EXACTLY) */}
                    {isColorPickerOpen && (
                      <div className="absolute right-0 top-16 z-50 bg-white border border-gray-300 rounded-md shadow-2xl p-3 w-64 space-y-3 animate-fadeIn">
                        
                        {/* 2D Color Griding Area */}
                        <div className="flex gap-2">
                          {/* 2D Gradient Box */}
                          <div
                            onClick={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              const x = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
                              const y = Math.min(Math.max((e.clientY - rect.top) / rect.height, 0), 1);
                              // Calculate hex based on hue, sat, val
                              const hexValues = [
                                "#ef4444", "#f97316", "#eab308", "#22c55e",
                                "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899",
                                "#000000", "#1e293b", "#64748b", "#3b112c"
                              ];
                              const picked = hexValues[Math.floor(x * hexValues.length)] || "#ef4444";
                              setEditingSubject({ ...editingSubject, color: picked });
                            }}
                            className="flex-1 h-36 rounded border border-gray-300 relative cursor-crosshair overflow-hidden shadow-inner"
                            style={{
                              background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, hsl(${pickerHue}, 100%, 50%))`
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                          </div>

                          {/* Vertical Rainbow Hue Slider */}
                          <div className="w-6 h-36 rounded border border-gray-300 relative overflow-hidden flex flex-col justify-between cursor-pointer">
                            <input
                              type="range"
                              min="0"
                              max="360"
                              value={pickerHue}
                              onChange={(e) => {
                                const h = Number(e.target.value);
                                setPickerHue(h);
                                setEditingSubject({ ...editingSubject, color: `hsl(${h}, 80%, 50%)` });
                              }}
                              className="w-36 -rotate-90 origin-top-left absolute top-36 left-0 h-6 cursor-pointer opacity-0 z-10"
                            />
                            <div
                              className="w-full h-full"
                              style={{
                                background: "linear-gradient(to bottom, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)"
                              }}
                            />
                          </div>
                        </div>

                        {/* Quick Color Swatches Palette */}
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Presets</span>
                          <div className="grid grid-cols-6 gap-1.5">
                            {[
                              "#3b112c", "#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4",
                              "#3b82f6", "#6366f1", "#a855f7", "#ec4899", "#1e293b", "#000000"
                            ].map((c) => (
                              <button
                                key={c}
                                type="button"
                                onClick={() => {
                                  setEditingSubject({ ...editingSubject, color: c });
                                  setIsColorPickerOpen(false);
                                }}
                                className="w-6 h-6 rounded border border-gray-300 shadow-2xs hover:scale-110 transition"
                                style={{ backgroundColor: c }}
                              />
                            ))}
                          </div>
                        </div>

                      </div>
                    )}
                  </div>

                </div>

              </div>

              {/* Bottom Centered Update Button */}
              <div className="pt-2 flex justify-center border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleSaveSubject}
                  className="border border-[#0288d1] text-[#0288d1] hover:bg-blue-50 px-8 py-1.5 rounded text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs transition"
                >
                  <FaSyncAlt className="text-xs" />
                  <span>Update</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

// =========================================================================
// 5. ASSIGN SUBJECT TO CLASS VIEW (MATCHING SCREENSHOT 1)
// =========================================================================
function AssignSubjectToClassView({ showToast }) {
  const [classes, setClasses] = useState([]);     // [{className: "1", _id: ...}] from school-classes
  const [classSectionsMap, setClassSectionsMap] = useState({}); // {className: ["A","B","C"]}
  const [sections, setSections] = useState([]);
  const [allSubjects, setAllSubjects] = useState([]);
  
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [assignedSubjects, setAssignedSubjects] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const initData = async () => {
      try {
        const token = localStorage.getItem("token");
        const [clsRes, clsSectRes, subRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/school-classes`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/class-sections`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/subjects`, { headers: { Authorization: `Bearer ${token}` } })
        ]);
        if (clsRes.ok) {
          const cJson = await clsRes.json();
          setClasses(Array.isArray(cJson) ? cJson : (cJson.data || []));
        }
        if (clsSectRes.ok) {
          const csData = await clsSectRes.json();
          const map = {};
          csData.forEach(entry => { map[entry.className] = entry.sections || []; });
          setClassSectionsMap(map);
        }
        if (subRes.ok) {
          const sJson = await subRes.json();
          setAllSubjects(Array.isArray(sJson) ? sJson : (sJson.data || []));
        }
      } catch (err) { console.error(err); }
    };
    initData();
  }, []);

  const handleClassChange = (e) => {
    const val = e.target.value; // This is the _id
    setSelectedClass(val);
    const cls = classes.find(c => c._id === val);
    const className = cls?.className || "";
    setSections(classSectionsMap[className] || []);
    setSelectedSection("");
    setAssignedSubjects([]);
  };

  const handleGo = async () => {
    if (!selectedClass) {
      showToast("Please select a Class first");
      return;
    }
    
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/class-subjects`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      let dbAssigned = [];
      if (res.ok) {
        const data = await res.json();
        // find record for this class and section
        const record = data.find(r => 
          (r.class?._id === selectedClass || r.class === selectedClass) &&
          (r.section?._id === selectedSection || r.section === selectedSection || (!selectedSection && !r.section))
        );
        if (record && record.subjects) {
          dbAssigned = record.subjects;
        }
      }
      
      // Build the grid merging allSubjects and dbAssigned
      const grid = allSubjects.map((sub, idx) => {
        const found = dbAssigned.find(d => (d.subject?._id === sub._id || d.subject === sub._id));
        return {
          sno: idx + 1,
          subjectId: sub._id,
          name: sub.name,
          selected: !!found,
          periods: found ? found.periods : "0",
          order: found ? found.order : "0"
        };
      });
      setAssignedSubjects(grid);
      showToast(`Loaded subjects for class`);
    } catch (err) {
      console.error(err);
      showToast("Failed to load class subjects");
    }
  };

  const handleToggleSelectAll = () => {
    const next = !selectAll;
    setSelectAll(next);
    setAssignedSubjects((prev) => prev.map((s) => ({ ...s, selected: next })));
  };

  const handleToggleRow = (sno) => {
    setAssignedSubjects((prev) =>
      prev.map((s) => (s.sno === sno ? { ...s, selected: !s.selected } : s))
    );
  };

  const handlePeriodsChange = (sno, val) => {
    setAssignedSubjects((prev) =>
      prev.map((s) => (s.sno === sno ? { ...s, periods: val } : s))
    );
  };

  const handleOrderChange = (sno, val) => {
    setAssignedSubjects((prev) =>
      prev.map((s) => (s.sno === sno ? { ...s, order: val } : s))
    );
  };

  const handleSave = async () => {
    if (!selectedClass) {
      showToast("Please select a Class first");
      return;
    }
    const selectedSubs = assignedSubjects.filter(s => s.selected).map(s => ({
      subject: s.subjectId,
      periods: Number(s.periods) || 0,
      order: Number(s.order) || 0
    }));
    
    try {
      const token = localStorage.getItem("token");
      const payload = {
        class: selectedClass,
        subjects: selectedSubs
      };
      if (selectedSection) payload.section = selectedSection;
      
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/class-subjects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        showToast("Assigned Subjects Saved Successfully!");
      } else {
        showToast("Failed to save assigned subjects");
      }
    } catch(err) {
      console.error(err);
      showToast("Error saving subjects");
    }
  };

  const totalAssignedPeriods = assignedSubjects
    .filter((s) => s.selected)
    .reduce((acc, s) => acc + (parseInt(s.periods) || 0), 0);

  return (
    <div className="bg-white border border-gray-300 rounded-b rounded-tr p-4 md:p-6 shadow-xs space-y-5">
      
      {/* Top Filter Bar */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Select Class */}
        <div className="relative w-56">
          <select
            value={selectedClass}
            onChange={handleClassChange}
            className="w-full text-xs border border-gray-300 rounded px-3 py-2 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs"
          >
            <option value="">Select Class</option>
            {classes.map((c) => (
              <option key={c._id} value={c._id}>{c.className}</option>
            ))}
          </select>
          <FaAngleDown className="absolute right-3 top-3 text-[10px] pointer-events-none text-gray-400" />
        </div>

        {/* Select Section */}
        <div className="relative w-56">
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="w-full text-xs border border-gray-300 rounded px-3 py-2 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs"
          >
            <option value="">Select Section</option>
            {sections.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <FaAngleDown className="absolute right-3 top-3 text-[10px] pointer-events-none text-gray-400" />
        </div>

        {/* Go Button */}
        <button
          onClick={handleGo}
          className="border border-[#0288d1] text-[#0288d1] hover:bg-blue-50 px-4 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
        >
          <span>🚀 Go</span>
        </button>

        {/* Assign Subject To Student Button */}
        <button
          onClick={() => showToast("Navigating to Student Subject Assignment")}
          className="bg-[#0288d1] text-white hover:bg-[#0277bd] px-4 py-1.5 rounded text-xs font-semibold shadow-2xs cursor-pointer transition"
        >
          Assign Subject To Student
        </button>
      </div>

      {/* Stats row */}
      <div className="flex items-center justify-between text-xs font-bold text-gray-700 bg-gray-50/80 px-4 py-2.5 rounded border border-gray-200">
        <div>Total Assigned Periods: <span className="text-gray-900">{totalAssignedPeriods}</span></div>
        <div>Period Alloted: <span className="text-gray-900">{assignedSubjects.length > 0 ? "48" : "0"}</span></div>
      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-white border-b border-gray-200 select-none shadow-2xs">
            <tr className="text-gray-900 font-bold">
              <th className="py-2.5 px-3 w-16 text-center">S.No. ⬍</th>
              <th className="py-2.5 px-3 w-28">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleToggleSelectAll}
                    className="w-3.5 h-3.5 border-gray-300 rounded text-blue-600 focus:ring-0 cursor-pointer"
                  />
                  <span>Select ⬍</span>
                </label>
              </th>
              <th className="py-2.5 px-3">Subject Name</th>
              <th className="py-2.5 px-3 w-40">No.Of Periods</th>
              <th className="py-2.5 px-3 w-32">Order No. ⬍</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {assignedSubjects.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-400 bg-sky-50/30 font-medium">
                  No data available in table
                </td>
              </tr>
            ) : (
              assignedSubjects.map((sub) => (
                <tr key={sub.sno} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-2.5 px-3 text-center text-gray-800 font-medium">{sub.sno}</td>
                  <td className="py-2.5 px-3">
                    <input
                      type="checkbox"
                      checked={sub.selected}
                      onChange={() => handleToggleRow(sub.sno)}
                      className="w-3.5 h-3.5 border-gray-300 rounded text-blue-600 focus:ring-0 cursor-pointer"
                    />
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-gray-900 uppercase">{sub.name}</td>
                  <td className="py-2.5 px-3">
                    <input
                      type="text"
                      value={sub.periods}
                      onChange={(e) => handlePeriodsChange(sub.sno, e.target.value)}
                      className="w-24 text-xs border border-gray-300 rounded px-2.5 py-1 text-gray-800 bg-white outline-none hover:border-blue-400 focus:border-blue-500 shadow-2xs"
                    />
                  </td>
                  <td className="py-2.5 px-3">
                    <input
                      type="text"
                      value={sub.order}
                      onChange={(e) => handleOrderChange(sub.sno, e.target.value)}
                      className="w-20 text-xs border border-gray-300 rounded px-2.5 py-1 text-gray-800 bg-white outline-none hover:border-blue-400 focus:border-blue-500 shadow-2xs"
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Bottom Action Buttons */}
      <div className="flex items-center justify-center gap-3 pt-2">
        <button
          onClick={handleSave}
          className="border border-emerald-500 text-emerald-600 hover:bg-emerald-50 px-5 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
        >
          <FaSave className="text-xs" />
          <span>Save</span>
        </button>
        <button
          onClick={() => {
            setAssignedSubjects([]);
            setSelectedClass("");
            setSelectedSection("");
            showToast("Reset Completed");
          }}
          className="border border-amber-500 text-amber-600 hover:bg-amber-50 px-5 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
        >
          <FaTimes className="text-xs" />
          <span>Reset</span>
        </button>
      </div>

    </div>
  );
}

// =========================================================================
// 6. PERIOD ALLOTMENT VIEW (MATCHING SCREENSHOT 2 & 3 FOR UNASSIGN TEACHERS MODAL)
// =========================================================================
function PeriodAllotmentView({ showToast }) {
  const [teachers, setTeachers] = useState([]);
  const [classesList, setClassesList] = useState([]);
  
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [isUnassignModalOpen, setIsUnassignModalOpen] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState("timetable"); // 'timetable' or 'marks'
  const [selectedClasses, setSelectedClasses] = useState({});
  const [allotmentRows, setAllotmentRows] = useState([]);
  const [modalRecords, setModalRecords] = useState([]);

  useEffect(() => {
    const initData = async () => {
      try {
        const token = localStorage.getItem("token");
        const [staffRes, clsSectRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/staffs`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/class-sections`, { headers: { Authorization: `Bearer ${token}` } })
        ]);
        if (staffRes.ok) {
          const sJson = await staffRes.json();
          setTeachers(Array.isArray(sJson) ? sJson : (sJson.data || []));
        }
        if (clsSectRes.ok) {
          const clsSectData = await clsSectRes.json();
          const formattedClasses = [];
          clsSectData.forEach(entry => {
            const className = entry.className;
            if (entry.sections && entry.sections.length > 0) {
              entry.sections.forEach(sec => {
                formattedClasses.push({
                  id: `${className}_${sec}`,
                  classId: className,
                  sectionId: sec,
                  name: `${className}-${sec}`
                });
              });
            } else {
              formattedClasses.push({ id: `${className}_`, classId: className, sectionId: null, name: className });
            }
          });
          setClassesList(formattedClasses);
        }
      } catch(e) { console.error(e); }
    };
    initData();
  }, []);

  const handleClassCheck = (id) => {
    setSelectedClasses((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShowSubjects = async () => {
    const checkedIds = Object.keys(selectedClasses).filter((k) => selectedClasses[k]);
    if (checkedIds.length === 0) {
      showToast("Please select at least one Class");
      return;
    }
    
    try {
      const token = localStorage.getItem("token");
      const [csRes, paRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/class-subjects`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/period-allotment`, { headers: { Authorization: `Bearer ${token}` } })
      ]);
      
      let classSubjects = [];
      let allotments = [];
      if (csRes.ok) classSubjects = await csRes.json();
      if (paRes.ok) allotments = await paRes.json();

      let rows = [];
      checkedIds.forEach(cid => {
        const cObj = classesList.find(c => c.id === cid);
        if (!cObj) return;
        
        const clsSubs = classSubjects.find(cs => 
          (cs.class?._id === cObj.classId || cs.class === cObj.classId) &&
          (cs.section?._id === cObj.sectionId || cs.section === cObj.sectionId || (!cs.section && !cObj.sectionId))
        );
        
        if (clsSubs && clsSubs.subjects) {
          clsSubs.subjects.forEach(sub => {
            const subjectId = sub.subject?._id || sub.subject;
            const subjectName = sub.subject?.name || "Unknown";
            
            const existingAllot = allotments.find(a => 
              (a.class?._id === cObj.classId || a.class === cObj.classId) &&
              (a.section?._id === cObj.sectionId || a.section === cObj.sectionId || (!a.section && !cObj.sectionId)) &&
              (a.subject?._id === subjectId || a.subject === subjectId)
            );
            
            let assignedTeacherName = "";
            let assignedTeacherId = null;
            if (existingAllot && existingAllot.teacher) {
               assignedTeacherName = existingAllot.teacher?.name || existingAllot.teacher?.firstName || "Assigned";
               assignedTeacherId = existingAllot.teacher?._id || existingAllot.teacher;
            }
            
            rows.push({
              id: `${cid}_${subjectId}`,
              classId: cObj.classId,
              sectionId: cObj.sectionId,
              className: cObj.name,
              subjectId: subjectId,
              subject: subjectName,
              periods: sub.periods || "0",
              teacher: assignedTeacherName || (selectedTeacher ? teachers.find(t=>t._id===selectedTeacher)?.firstName : ""),
              teacherId: assignedTeacherId || selectedTeacher,
              selected: false
            });
          });
        }
      });
      
      setAllotmentRows(rows);
      showToast(`Loaded ${rows.length} subject entries`);
    } catch(e) {
      console.error(e);
      showToast("Error loading subjects");
    }
  };

  const handleAssign = async () => {
    const selectedRows = allotmentRows.filter(r => r.selected);
    if (selectedRows.length === 0) {
      showToast("Please select at least one row");
      return;
    }
    if (selectedRows.some(r => !r.teacherId)) {
      showToast("Ensure a teacher is selected for allotment");
      return;
    }
    
    try {
      const token = localStorage.getItem("token");
      const promises = selectedRows.map(row => {
        const payload = {
          class: row.classId,
          subject: row.subjectId,
          teacher: row.teacherId,
          periods: Number(row.periods)
        };
        if (row.sectionId) payload.section = row.sectionId;
        
        return fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/period-allotment`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify(payload)
        });
      });
      
      await Promise.all(promises);
      showToast("Period & Teacher Allotment Saved Successfully!");
    } catch(err) {
      console.error(err);
      showToast("Error saving allotments");
    }
  };

  const loadUnassignedModal = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/period-allotment`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        const records = data.map(d => ({
          id: d._id,
          className: `${d.class?.className || "Unknown"} ${d.section ? `-${d.section.sectionName || d.section.name}` : ''}`,
          subject: d.subject?.name || "Unknown",
          periods: d.periods,
          teacher: d.teacher?.name || d.teacher?.firstName || "Unknown",
          selected: false
        }));
        setModalRecords(records);
        setIsUnassignModalOpen(true);
      }
    } catch (e) {
      console.error(e);
      showToast("Error loading allotments");
    }
  };

  const handleDeleteAssignedRecords = () => {
    const remaining = modalRecords.filter((r) => !r.selected);
    const count = modalRecords.length - remaining.length;
    if (count === 0) {
      showToast("Select at least one record to unassign");
      return;
    }
    setModalRecords(remaining);
    showToast(`${count} Teacher assignment(s) removed successfully (UI Only)!`);
  };

  return (
    <div className="bg-white border border-gray-300 rounded-b rounded-tr p-4 md:p-6 shadow-xs space-y-4">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (Select Teacher + Select Class List) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Select Teacher */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-gray-800">Select Teacher</label>
            <div className="relative">
              <select
                value={selectedTeacher}
                onChange={(e) => setSelectedTeacher(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded px-3 py-2 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs"
              >
                <option value="">Select Teacher</option>
                {teachers.map(t => (
                  <option key={t._id} value={t._id}>{t.firstName} {t.lastName}</option>
                ))}
              </select>
              <FaAngleDown className="absolute right-3 top-3 text-[10px] pointer-events-none text-gray-400" />
            </div>
          </div>

          {/* Select Class Container */}
          <div className="border border-gray-200 rounded overflow-hidden shadow-2xs">
            <div className="bg-gray-100/80 py-2 px-3 text-center text-xs font-bold text-gray-800 border-b border-gray-200">
              Select Class
            </div>
            <div className="max-h-72 overflow-y-auto custom-scrollbar">
              <table className="w-full text-left text-xs">
                <thead className="bg-white border-b border-gray-200 sticky top-0">
                  <tr className="text-gray-900 font-bold">
                    <th className="py-2 px-3 w-16 text-center">Select</th>
                    <th className="py-2 px-3">Class Name</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {classesList.map((cls) => (
                    <tr key={cls.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-2 px-3 text-center">
                        <input
                          type="checkbox"
                          checked={!!selectedClasses[cls.id]}
                          onChange={() => handleClassCheck(cls.id)}
                          className="w-3.5 h-3.5 border-gray-300 rounded text-blue-600 focus:ring-0 cursor-pointer"
                        />
                      </td>
                      <td className="py-2 px-3 font-semibold text-gray-800">{cls.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-3 bg-white border-t border-gray-200 flex justify-center">
              <button
                onClick={handleShowSubjects}
                className="border border-[#0288d1] text-[#0288d1] hover:bg-blue-50 px-4 py-1 rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
              >
                <span>👁 Show Subjects</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right Column (Action Buttons + Tabs + Subject Table) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Top Right Action Buttons (Unassign Teachers & Filter Subjects) */}
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={loadUnassignedModal}
              className="border border-[#0288d1] text-[#0288d1] hover:bg-blue-50 px-3.5 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
            >
              <FaEdit className="text-[11px]" />
              <span>Unassign Teachers</span>
            </button>
            <button
              onClick={() => showToast("Filter Subjects panel")}
              className="border border-[#0288d1] text-[#0288d1] hover:bg-blue-50 px-3.5 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
            >
              <span>Y Filter Subjects</span>
            </button>
          </div>

          {/* Sub Tabs: For TimeTable / For Marks Manager */}
          <div className="flex items-center gap-0">
            <button
              onClick={() => setActiveSubTab("timetable")}
              className={`px-5 py-2 text-xs font-bold rounded-t cursor-pointer transition ${
                activeSubTab === "timetable"
                  ? "bg-[#00c0ef] text-white shadow-2xs"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              For TimeTable
            </button>
            <button
              onClick={() => setActiveSubTab("marks")}
              className={`px-5 py-2 text-xs font-bold rounded-t cursor-pointer transition ${
                activeSubTab === "marks"
                  ? "bg-[#00c0ef] text-white shadow-2xs"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              For Marks Manager
            </button>
          </div>

          {/* Select Subjects Table Card */}
          <div className="border border-gray-200 rounded-b rounded-tr overflow-hidden shadow-2xs">
            <div className="bg-gray-100/80 py-2 px-3 text-center text-xs font-bold text-gray-800 border-b border-gray-200">
              Select Subjects
            </div>
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-white border-b border-gray-200 select-none shadow-2xs">
                  <tr className="text-gray-900 font-bold">
                    <th className="py-2.5 px-3 w-16 text-center">Select ⬍</th>
                    <th className="py-2.5 px-3 w-28">Class Name ⬍</th>
                    <th className="py-2.5 px-3">Subjects</th>
                    <th className="py-2.5 px-3 w-24">Periods</th>
                    <th className="py-2.5 px-3 w-40">Teachers ⬍</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {allotmentRows.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-gray-400 bg-sky-50/20 font-medium">
                        No data available in table
                      </td>
                    </tr>
                  ) : (
                    allotmentRows.map((row) => (
                      <tr key={row.id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="py-2.5 px-3 text-center">
                          <input
                            type="checkbox"
                            checked={row.selected}
                            onChange={() => {
                              setAllotmentRows((prev) =>
                                prev.map((r) => (r.id === row.id ? { ...r, selected: !r.selected } : r))
                              );
                            }}
                            className="w-3.5 h-3.5 border-gray-300 rounded text-blue-600 focus:ring-0 cursor-pointer"
                          />
                        </td>
                        <td className="py-2.5 px-3 font-bold text-gray-900">{row.className}</td>
                        <td className="py-2.5 px-3 font-semibold text-gray-800 uppercase">{row.subject}</td>
                        <td className="py-2.5 px-3">{row.periods}</td>
                        <td className="py-2.5 px-3 font-semibold text-blue-700">{row.teacher}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Bottom Assign Button */}
            <div className="p-3 bg-white border-t border-gray-200 flex justify-center">
              <button
                onClick={handleAssign}
                className="border border-[#0288d1] text-[#0288d1] hover:bg-blue-50 px-6 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
              >
                <FaCheck className="text-xs" />
                <span>Assign</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* =====================================================================
          UNASSIGN TEACHERS / EDIT RECORDS MODAL (MATCHING SCREENSHOT 3 100%)
          ===================================================================== */}
      {isUnassignModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl border border-gray-200 overflow-visible relative animate-fadeIn">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-sm font-bold text-gray-800">Edit Records</h3>
              <button
                onClick={() => setIsUnassignModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 text-sm p-1 rounded cursor-pointer"
              >
                <FaTimes />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              
              {/* Delete Button at Top */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleDeleteAssignedRecords}
                  className="border border-[#0288d1] text-[#0288d1] hover:bg-blue-50 px-5 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer transition"
                >
                  <FaTrashAlt className="text-xs" />
                  <span>Delete</span>
                </button>
              </div>

              {/* Sub Tabs: For TimeTable / For Marks Manager */}
              <div className="flex items-center gap-0 pt-2">
                <button
                  onClick={() => setActiveSubTab("timetable")}
                  className={`px-5 py-2 text-xs font-bold rounded-t cursor-pointer transition ${
                    activeSubTab === "timetable"
                      ? "bg-[#00c0ef] text-white shadow-2xs"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  For TimeTable
                </button>
                <button
                  onClick={() => setActiveSubTab("marks")}
                  className={`px-5 py-2 text-xs font-bold rounded-t cursor-pointer transition ${
                    activeSubTab === "marks"
                      ? "bg-[#00c0ef] text-white shadow-2xs"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  For Marks Manager
                </button>
              </div>

              {/* Records Table in Modal */}
              <div className="border border-gray-200 rounded-b rounded-tr overflow-hidden shadow-2xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-white border-b border-gray-200 select-none shadow-2xs">
                    <tr className="text-gray-900 font-bold">
                      <th className="py-2.5 px-3 w-16 text-center">
                        <label className="flex items-center justify-center gap-1 cursor-pointer">
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              const checked = e.target.checked;
                              setModalRecords((prev) => prev.map((r) => ({ ...r, selected: checked })));
                            }}
                            className="w-3.5 h-3.5 border-gray-300 rounded text-blue-600 focus:ring-0 cursor-pointer"
                          />
                          <span>Select ⬍</span>
                        </label>
                      </th>
                      <th className="py-2.5 px-3 w-28">Class Name ⬍</th>
                      <th className="py-2.5 px-3">Subjects</th>
                      <th className="py-2.5 px-3 w-24">Periods</th>
                      <th className="py-2.5 px-3 w-44">Teachers ⬍</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {modalRecords.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-gray-400 bg-sky-50/20 font-medium">
                          No data available in table
                        </td>
                      </tr>
                    ) : (
                      modalRecords.map((r) => (
                        <tr key={r.id} className="hover:bg-gray-50/80 transition-colors">
                          <td className="py-2.5 px-3 text-center">
                            <input
                              type="checkbox"
                              checked={r.selected}
                              onChange={() => {
                                setModalRecords((prev) =>
                                  prev.map((rec) => (rec.id === r.id ? { ...rec, selected: !rec.selected } : rec))
                                );
                              }}
                              className="w-3.5 h-3.5 border-gray-300 rounded text-blue-600 focus:ring-0 cursor-pointer"
                            />
                          </td>
                          <td className="py-2.5 px-3 font-bold text-gray-900">{r.className}</td>
                          <td className="py-2.5 px-3 font-semibold text-gray-800 uppercase">{r.subject}</td>
                          <td className="py-2.5 px-3">{r.periods}</td>
                          <td className="py-2.5 px-3 font-semibold text-blue-700 uppercase">{r.teacher}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

// =========================================================================
// 7. DEFINE RESOURCE VIEW (MATCHING SCREENSHOT 4 & 5 - EMPTY BY DEFAULT)
// =========================================================================
function DefineResourceView({ showToast }) {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/resources`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setResources(data.map((item, index) => ({ ...item, sno: index + 1 })));
      }
    } catch (err) {
      console.error(err);
      showToast("Failed to fetch resources");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Add Resource Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState({ name: "" });

  const filteredResources = resources.filter((r) =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalEntries = filteredResources.length;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalEntries);
  const currentEntries = filteredResources.slice(startIndex, endIndex);

  const handleOpenAdd = () => {
    setEditingResource({ sno: null, name: "" });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (res) => {
    setEditingResource({ ...res });
    setIsAddModalOpen(true);
  };

  const handleSaveResource = async () => {
    if (!editingResource.name.trim()) {
      showToast("Resource Name cannot be blank");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const isUpdate = !!editingResource._id;
      const url = `${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/resources${isUpdate ? `/${editingResource._id}` : ''}`;
      const method = isUpdate ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(editingResource)
      });

      if (res.ok) {
        showToast(`Resource ${isUpdate ? 'Updated' : 'Created'} Successfully!`);
        setIsAddModalOpen(false);
        fetchResources();
      } else {
        const errorData = await res.json();
        showToast(errorData.message || "Failed to save resource");
      }
    } catch (err) {
      console.error(err);
      showToast("An error occurred while saving resource");
    }
  };

  const handleDeleteResource = async (resource) => {
    if (!resource._id) return;
    if (!window.confirm(`Are you sure you want to delete ${resource.name}?`)) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/resources/${resource._id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        showToast("Resource Deleted Successfully!");
        fetchResources();
      } else {
        showToast("Failed to delete resource");
      }
    } catch (err) {
      console.error(err);
      showToast("Error deleting resource");
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-b rounded-tr p-4 md:p-6 shadow-xs space-y-4">
      
      {/* Top Bar (Search + Buttons) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <FaSearch className="absolute left-3.5 top-3 text-gray-400 text-xs" />
          <input
            type="text"
            placeholder="Search Resource"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full text-xs pl-9 pr-3 py-2 border border-gray-300 rounded-full outline-none hover:border-blue-400 focus:border-blue-500 shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={handleOpenAdd}
            className="border border-[#0288d1] text-[#0288d1] hover:bg-blue-50 px-3.5 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
          >
            <FaPlus className="text-[10px]" />
            <span>Add New Resource</span>
          </button>
          <button
            onClick={() => showToast("Exporting Resource Register...")}
            className="border border-[#0288d1] text-[#0288d1] hover:bg-blue-50 px-4 py-1.5 rounded text-xs font-bold cursor-pointer shadow-2xs transition"
          >
            Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-white border-b border-gray-200 select-none shadow-2xs">
            <tr className="text-gray-900 font-bold">
              <th className="py-2.5 px-3 w-16 text-center">SNo. ▴</th>
              <th className="py-2.5 px-4">Resource Name ⬍</th>
              <th className="py-2.5 px-4 w-28 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentEntries.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-12 text-center text-gray-400 bg-sky-50/20 font-medium">
                  No data available in table
                </td>
              </tr>
            ) : (
              currentEntries.map((res) => (
                <tr key={res.sno} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-2.5 px-3 text-center text-gray-800 font-medium">{res.sno}</td>
                  <td className="py-2.5 px-4 font-semibold text-gray-900">{res.name}</td>
                  <td className="py-2.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => handleOpenEdit(res)}
                        className="text-gray-500 hover:text-blue-600 p-1 cursor-pointer transition"
                        title="Edit Resource"
                      >
                        <FaEdit className="text-sm" />
                      </button>
                      <button
                        onClick={() => handleDeleteResource(res)}
                        className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-1.5 rounded transition"
                        title="Delete Resource"
                      >
                        <FaTrashAlt className="text-xs" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs text-gray-700">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span>Show</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded px-2 py-1 text-xs outline-none cursor-pointer bg-white"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span>entries</span>
          </div>
          <span className="text-gray-500 font-medium">
            Showing {totalEntries === 0 ? 0 : startIndex + 1} to {endIndex} of {totalEntries} entries
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="px-2.5 py-1 text-xs border border-gray-300 rounded text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            Previous
          </button>
          <button
            disabled={endIndex >= totalEntries}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-2.5 py-1 text-xs border border-gray-300 rounded text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>

      {/* ADD NEW RESOURCE MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg border border-gray-200 overflow-visible relative animate-fadeIn">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-sm font-bold text-gray-800">
                {editingResource.sno ? "Edit Resource" : "Add New Resource"}
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 text-sm p-1 rounded cursor-pointer"
              >
                <FaTimes />
              </button>
            </div>

            <div className="p-8 space-y-6 flex flex-col items-center">
              <div className="w-full max-w-sm space-y-2 text-center">
                <label className="block text-xs font-bold text-gray-800">Define Resource</label>
                <input
                  type="text"
                  value={editingResource.name}
                  onChange={(e) => setEditingResource({ ...editingResource, name: e.target.value })}
                  placeholder=""
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs text-gray-800 outline-none hover:border-blue-400 focus:border-blue-500 shadow-2xs text-center"
                />
              </div>

              <button
                type="button"
                onClick={handleSaveResource}
                className="border border-emerald-500 text-emerald-600 hover:bg-emerald-50 px-6 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer transition"
              >
                <FaSave className="text-xs" />
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// =========================================================================
// 8. RELATE RESOURCE TO SUBJECT VIEW (MATCHING SCREENSHOT 1)
// =========================================================================
function RelateResourceToSubjectView({ showToast }) {
  const [resources, setResources] = useState([]);
  const [classesList, setClassesList] = useState([]);
  
  const [selectedResource, setSelectedResource] = useState("");
  const [selectedClass, setSelectedClass] = useState("None selected");
  const [subjectRows, setSubjectRows] = useState([]); 

  useEffect(() => {
    const initData = async () => {
      try {
        const token = localStorage.getItem("token");
        const [resRes, clsSectRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/resources`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/class-sections`, { headers: { Authorization: `Bearer ${token}` } })
        ]);
        if (resRes.ok) setResources(await resRes.json());
        if (clsSectRes.ok) {
          const clsSectData = await clsSectRes.json();
          const formattedClasses = [];
          clsSectData.forEach(entry => {
            const className = entry.className;
            if (entry.sections && entry.sections.length > 0) {
              entry.sections.forEach(sec => {
                formattedClasses.push({
                  id: `${className}_${sec}`,
                  classId: className,
                  sectionId: sec,
                  name: `${className}-${sec}`
                });
              });
            } else {
              formattedClasses.push({ id: `${className}_`, classId: className, sectionId: null, name: className });
            }
          });
          setClassesList(formattedClasses);
        }
      } catch(e) { console.error(e); }
    };
    initData();
  }, []);

  const handleShowSubjects = async () => {
    if (!selectedResource) {
      showToast("Please select a resource");
      return;
    }
    
    try {
      const token = localStorage.getItem("token");
      const [csRes, rsRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/class-subjects`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/resource-subjects`, { headers: { Authorization: `Bearer ${token}` } })
      ]);
      
      let classSubjects = [];
      let resourceSubjects = [];
      if (csRes.ok) classSubjects = await csRes.json();
      if (rsRes.ok) resourceSubjects = await rsRes.json();

      let rows = [];
      
      const targetClasses = selectedClass === "None selected" ? classesList : classesList.filter(c => c.classId === selectedClass);
      
      targetClasses.forEach(cObj => {
        const clsSubs = classSubjects.find(cs => 
          (cs.class?._id === cObj.classId || cs.class === cObj.classId) &&
          (cs.section?._id === cObj.sectionId || cs.section === cObj.sectionId || (!cs.section && !cObj.sectionId))
        );
        
        if (clsSubs && clsSubs.subjects) {
          clsSubs.subjects.forEach(sub => {
            const subjectId = sub.subject?._id || sub.subject;
            const subjectName = sub.subject?.name || "Unknown";
            
            const existingRelate = resourceSubjects.find(r => 
              (r.class?._id === cObj.classId || r.class === cObj.classId) &&
              (r.section?._id === cObj.sectionId || r.section === cObj.sectionId || (!r.section && !cObj.sectionId)) &&
              (r.subject?._id === subjectId || r.subject === subjectId) &&
              (r.resource?._id === selectedResource || r.resource === selectedResource)
            );
            
            rows.push({
              id: `${cObj.id}_${subjectId}`,
              classId: cObj.classId,
              sectionId: cObj.sectionId,
              className: cObj.name,
              subjectId: subjectId,
              subject: subjectName,
              periods: sub.periods || "0",
              selected: !!existingRelate
            });
          });
        }
      });
      
      setSubjectRows(rows);
      showToast(`Loaded ${rows.length} subjects for selected resource`);
    } catch(e) {
      console.error(e);
      showToast("Error loading subjects");
    }
  };

  const handleSave = async () => {
    const selectedRows = subjectRows.filter(r => r.selected);
    if (selectedRows.length === 0) {
      showToast("Please select at least one row");
      return;
    }
    
    try {
      const token = localStorage.getItem("token");
      const promises = selectedRows.map(row => {
        const payload = {
          resource: selectedResource,
          class: row.classId,
          subject: row.subjectId
        };
        if (row.sectionId) payload.section = row.sectionId;
        
        return fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/resource-subjects`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify(payload)
        });
      });
      
      await Promise.all(promises);
      showToast("Resource Relate Settings Saved!");
    } catch(err) {
      console.error(err);
      showToast("Error saving resource settings");
    }
  };

  const handleToggleRow = (id) => {
    setSubjectRows((prev) =>
      prev.map((s) => (s.id === id ? { ...s, selected: !s.selected } : s))
    );
  };

  const uniqueClasses = [];
  classesList.forEach(c => {
    if(!uniqueClasses.find(x => x.classId === c.classId)) {
      uniqueClasses.push({ classId: c.classId, className: c.name.split('-')[0] });
    }
  });

  return (
    <div className="bg-white border border-gray-300 rounded-b rounded-tr p-6 md:p-8 shadow-xs space-y-6">
      
      {/* Centered Controls Box */}
      <div className="max-w-md mx-auto space-y-4">
        
        {/* Select Resource */}
        <div className="relative">
          <select
            value={selectedResource}
            onChange={(e) => setSelectedResource(e.target.value)}
            className="w-full text-xs border border-gray-300 rounded px-3 py-2 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs text-center"
          >
            <option value="">Select Resource</option>
            {resources.map(r => (
              <option key={r._id} value={r._id}>{r.name}</option>
            ))}
          </select>
          <FaAngleDown className="absolute right-3 top-3 text-[10px] pointer-events-none text-gray-400" />
        </div>

        {/* Class Multi-select */}
        <div className="space-y-1">
          <label className="block text-xs font-bold text-gray-800 text-left">Class</label>
          <div className="relative">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full text-xs border border-gray-300 rounded px-3 py-2 text-gray-700 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs"
            >
              <option value="None selected">None selected</option>
              {uniqueClasses.map(c => (
                <option key={c.classId} value={c.classId}>{c.className}</option>
              ))}
            </select>
            <FaAngleDown className="absolute right-3 top-3 text-[10px] pointer-events-none text-gray-400" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3 pt-1">
          <button
            onClick={handleShowSubjects}
            className="border border-[#0288d1] text-[#0288d1] hover:bg-blue-50 px-4 py-1 rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
          >
            <span>👁 Show Subjects</span>
          </button>
          <button
            onClick={() => showToast("Filter Options")}
            className="border border-[#0288d1] text-[#0288d1] hover:bg-blue-50 px-4 py-1 rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
          >
            <span>Y Filter</span>
          </button>
        </div>

      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-white border-b border-gray-200 select-none shadow-2xs">
            <tr className="text-gray-900 font-bold">
              <th className="py-2.5 px-3 w-16 text-center">Select ⬍</th>
              <th className="py-2.5 px-4 w-40">Class Name ⬍</th>
              <th className="py-2.5 px-4">Subjects</th>
              <th className="py-2.5 px-4 w-32">Periods</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {subjectRows.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-gray-400 bg-sky-50/20 font-medium">
                  No data available in table
                </td>
              </tr>
            ) : (
              subjectRows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50/80">
                  <td className="py-2.5 px-3 text-center">
                    <input 
                      type="checkbox" 
                      checked={row.selected}
                      onChange={() => handleToggleRow(row.id)}
                      className="w-3.5 h-3.5 text-blue-600 rounded" 
                    />
                  </td>
                  <td className="py-2.5 px-4 font-bold">{row.className}</td>
                  <td className="py-2.5 px-4 font-semibold">{row.subject}</td>
                  <td className="py-2.5 px-4">{row.periods}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Bottom Action Buttons: Save, View, Print, Reset */}
      <div className="flex items-center justify-center gap-3 pt-2">
        <button
          onClick={handleSave}
          className="border border-emerald-500 text-emerald-600 hover:bg-emerald-50 px-4 py-1 rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
        >
          <FaSave className="text-xs" />
          <span>Save</span>
        </button>
        <button
          onClick={() => showToast("View Saved Relate Records")}
          className="border border-[#0288d1] text-[#0288d1] hover:bg-blue-50 px-4 py-1 rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
        >
          <span>👁 View</span>
        </button>
        <button
          onClick={() => showToast("Printing Resource Schedule...")}
          className="border border-[#0288d1] text-[#0288d1] hover:bg-blue-50 px-4 py-1 rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
        >
          <FaPrint className="text-xs" />
          <span>Print</span>
        </button>
        <button
          onClick={() => {
            setSelectedResource("");
            setSelectedClass("None selected");
            setSubjectRows([]);
            showToast("Reset Completed");
          }}
          className="border border-amber-500 text-amber-600 hover:bg-amber-50 px-4 py-1 rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
        >
          <FaTimes className="text-xs" />
          <span>Reset</span>
        </button>
      </div>

    </div>
  );
}

// =========================================================================
// 9. DEFINE CLASS TEACHER VIEW (MATCHING SCREENSHOT 2 & 3 - ALL 51 CLASSES WITH WING FILTER)
// =========================================================================
function DefineClassTeacherView({ showToast }) {
  const [selectedWing, setSelectedWing] = useState("All Wing");
  const [classTeachers, setClassTeachers] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const initData = async () => {
      try {
        const token = localStorage.getItem("token");
        const [clsSectRes, clsRes, tcRes, staffRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/class-sections`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/school-classes`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/class-teachers`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/staffs`, { headers: { Authorization: `Bearer ${token}` } })
        ]);

        let allStaffs = [];
        if (staffRes.ok) {
          const sJson = await staffRes.json();
          allStaffs = Array.isArray(sJson) ? sJson : (sJson.data || []);
          setTeachers(allStaffs);
        }

        let assignedData = [];
        if (tcRes.ok) { assignedData = await tcRes.json(); }

        // Build wing map from school-classes
        let wingMap = {};
        if (clsRes.ok) {
          const cJson = await clsRes.json();
          const clsData = Array.isArray(cJson) ? cJson : (cJson.data || []);
          clsData.forEach(c => { wingMap[c.className] = c.wingName || "Primary"; });
        }

        if (clsSectRes.ok) {
          const clsSectData = await clsSectRes.json();
          
          let rows = [];
          let sno = 1;
          clsSectData.forEach(entry => {
            const className = entry.className;
            const wing = wingMap[className] || "Primary";
            
            if (entry.sections && entry.sections.length > 0) {
              entry.sections.forEach(sec => {
                const classSection = `${className}-${sec}`;
                const existing = assignedData.find(a => 
                  (a.class?.className === className) && 
                  (a.section === sec || a.section?.name === sec)
                );
                
                rows.push({
                  sno: sno++,
                  classId: className,   // Using className as identifier since classTeacher model might use ID
                  sectionId: sec,
                  class: classSection,
                  wing: wing,
                  classTeacher: existing?.classTeacher?._id || existing?.classTeacher || "",
                  assistantTeacher: existing?.assistantTeacher?._id || existing?.assistantTeacher || ""
                });
              });
            } else {
              const existing = assignedData.find(a => 
                a.class?.className === className && !a.section
              );
              rows.push({
                sno: sno++,
                classId: className,
                sectionId: null,
                class: className,
                wing: wing,
                classTeacher: existing?.classTeacher?._id || existing?.classTeacher || "",
                assistantTeacher: existing?.assistantTeacher?._id || existing?.assistantTeacher || ""
              });
            }
          });
          setClassTeachers(rows);
        }

      } catch(e) { console.error(e); }
    };
    initData();
  }, []);

  const filteredList = classTeachers.filter((c) => {
    if (selectedWing === "All Wing") return true;
    return c.wing === selectedWing;
  });

  const handleTeacherChange = (sno, field, value) => {
    setClassTeachers((prev) =>
      prev.map((c) => (c.sno === sno ? { ...c, [field]: value } : c))
    );
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      
      const promises = classTeachers.map(row => {
        if (!row.classTeacher && !row.assistantTeacher) return Promise.resolve();
        
        const payload = {
          class: row.classId,
          classTeacher: row.classTeacher || null,
          assistantTeacher: row.assistantTeacher || null
        };
        if (row.sectionId) payload.section = row.sectionId;
        
        return fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/class-teachers`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify(payload)
        });
      });
      
      await Promise.all(promises);
      showToast("Class Teacher Allotment Updated Successfully!");
    } catch(err) {
      console.error(err);
      showToast("Error updating class teachers");
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-b rounded-tr p-4 md:p-6 shadow-xs space-y-4">
      
      {/* Top Update Button */}
      <div className="flex justify-center">
        <button
          onClick={handleUpdate}
          className="border border-[#0288d1] text-[#0288d1] hover:bg-blue-50 px-5 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer transition"
        >
          <FaSyncAlt className="text-xs" />
          <span>Update</span>
        </button>
      </div>

      {/* Filter Class Wing Wise (Matching Screenshot 2 & 3) */}
      <div className="max-w-md mx-auto space-y-1 text-left">
        <label className="block text-xs font-bold text-gray-800">Filter Class Wing Wise</label>
        <div className="relative">
          <select
            value={selectedWing}
            onChange={(e) => setSelectedWing(e.target.value)}
            className="w-full text-xs border border-gray-300 rounded px-3 py-2 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs"
          >
            <option value="All Wing">All Wing</option>
            <option value="Kindergarten">Kindergarten</option>
            <option value="Primary">Primary</option>
            <option value="Middle">Middle</option>
            <option value="Higher">Higher</option>
          </select>
          <FaAngleDown className="absolute right-3 top-3 text-[10px] pointer-events-none text-gray-400" />
        </div>
      </div>

      {/* Table Container (51 rows from NUR-A to 12-D) */}
      <div className="border border-gray-200 rounded overflow-hidden">
        <div className="max-h-[520px] overflow-y-auto custom-scrollbar">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-white sticky top-0 z-10 border-b border-gray-200 select-none shadow-2xs">
              <tr className="text-gray-900 font-bold">
                <th className="py-2.5 px-4 w-16">SNo.</th>
                <th className="py-2.5 px-4 w-36">Class</th>
                <th className="py-2.5 px-4">Class Teachers</th>
                <th className="py-2.5 px-4">Assistant Class Teachers</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredList.map((row) => (
                <tr key={row.sno} className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-2 px-4 text-gray-800 font-medium">{row.sno}</td>
                  <td className="py-2 px-4 font-bold text-gray-900">{row.class}</td>

                  {/* Class Teacher Dropdown */}
                  <td className="py-2 px-4">
                    <div className="relative">
                      <select
                        value={row.classTeacher || ""}
                        onChange={(e) => handleTeacherChange(row.sno, "classTeacher", e.target.value)}
                        className="w-full text-xs border border-gray-300 rounded px-2.5 py-1 text-gray-800 bg-white outline-none cursor-pointer hover:border-blue-400 appearance-none pr-6 shadow-2xs"
                      >
                        <option value="">Select Teacher</option>
                        {teachers.map((t) => (
                          <option key={t._id} value={t._id}>{t.firstName} {t.lastName}</option>
                        ))}
                      </select>
                      <FaAngleDown className="absolute right-2 top-2 text-[9px] text-gray-400 pointer-events-none" />
                    </div>
                  </td>

                  {/* Assistant Class Teacher Dropdown */}
                  <td className="py-2 px-4">
                    <div className="relative">
                      <select
                        value={row.assistantTeacher || ""}
                        onChange={(e) => handleTeacherChange(row.sno, "assistantTeacher", e.target.value)}
                        className="w-full text-xs border border-gray-300 rounded px-2.5 py-1 text-gray-800 bg-white outline-none cursor-pointer hover:border-blue-400 appearance-none pr-6 shadow-2xs"
                      >
                        <option value="">Select Teacher</option>
                        {teachers.map((t) => (
                          <option key={t._id} value={t._id}>{t.firstName} {t.lastName}</option>
                        ))}
                      </select>
                      <FaAngleDown className="absolute right-2 top-2 text-[9px] text-gray-400 pointer-events-none" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

// =========================================================================
// 10. CLASS TEACHER SUBJECT VIEW (MATCHING SCREENSHOT 4 - BLANK BY DEFAULT)
// =========================================================================
function ClassTeacherSubjectView({ showToast }) {
  const [records, setRecords] = useState([]); 

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/class-teacher-subjects`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        const mapped = data.map(r => ({
          class: `${r.class?.className || "Unknown"}${r.section ? `-${r.section.sectionName || r.section.name || ""}` : ""}`,
          teacher: r.classTeacher ? `${r.classTeacher.firstName || ""} ${r.classTeacher.lastName || ""}` : "Unknown",
          subject: r.subject?.name || "Unknown"
        }));
        setRecords(mapped);
      }
    } catch(err) { console.error(err); }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-white border border-gray-300 rounded-b rounded-tr p-4 md:p-6 shadow-xs space-y-4">
      
      {/* Top Update & Refresh Buttons */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => {
            fetchData();
            showToast("Refreshed Class Teacher Subject Table");
          }}
          className="border border-[#0288d1] text-[#0288d1] hover:bg-blue-50 px-4 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer transition"
        >
          <FaSyncAlt className="text-xs" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Table (Blank / No data available in table) */}
      <div className="border border-gray-200 rounded overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-white border-b border-gray-200 select-none shadow-2xs">
            <tr className="text-gray-900 font-bold">
              <th className="py-2.5 px-4 w-20">SNo. ⬍</th>
              <th className="py-2.5 px-4 w-40">Class ⬍</th>
              <th className="py-2.5 px-4">Teachers</th>
              <th className="py-2.5 px-4">Subject</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {records.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-gray-400 bg-sky-50/20 font-medium">
                  No data available in table
                </td>
              </tr>
            ) : (
              records.map((r, idx) => (
                <tr key={idx} className="hover:bg-gray-50/80">
                  <td className="py-2.5 px-4">{idx + 1}</td>
                  <td className="py-2.5 px-4 font-bold">{r.class}</td>
                  <td className="py-2.5 px-4 font-semibold">{r.teacher}</td>
                  <td className="py-2.5 px-4">{r.subject}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

// =========================================================================
// 11. PERIOD TIME SETTING VIEW (MATCHING SCREENSHOT 5 - 13 PERIODS EXACT PRE-FILLED)
// =========================================================================
function PeriodTimeSettingView({ showToast }) {
  const [periodList, setPeriodList] = useState([]);

  useEffect(() => {
    const fetchPeriods = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/period-settings`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          // If empty, generate 13 default periods
          if (!data || data.length === 0) {
            const defaultPeriods = Array.from({ length: 13 }).map((_, i) => ({
              sno: i + 1,
              period: i + 1,
              time: ""
            }));
            setPeriodList(defaultPeriods);
          } else {
            const mapped = data.map((p, index) => ({
              sno: index + 1,
              period: p.periodNumber,
              time: `${p.startTime}-${p.endTime}`
            }));
            // Pad up to 13 if there are fewer
            while (mapped.length < 13) {
              const nextP = mapped.length + 1;
              mapped.push({ sno: nextP, period: nextP, time: "" });
            }
            setPeriodList(mapped);
          }
        }
      } catch (err) { console.error(err); }
    };
    fetchPeriods();
  }, []);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const promises = periodList.map(p => {
        let startTime = "";
        let endTime = "";
        if (p.time && p.time.includes("-")) {
          const parts = p.time.split("-");
          startTime = parts[0].trim();
          endTime = parts[1].trim();
        }
        return fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/period-settings`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ 
            periodNumber: p.period,
            startTime,
            endTime,
            isBreak: false
          })
        });
      });
      await Promise.all(promises);
      showToast("Period Timings Updated Successfully!");
    } catch (err) {
      console.error(err);
      showToast("Error updating period timings");
    }
  };

  const handleTimeChange = (sno, val) => {
    setPeriodList((prev) =>
      prev.map((p) => (p.sno === sno ? { ...p, time: val } : p))
    );
  };

  return (
    <div className="bg-white border border-gray-300 rounded-b rounded-tr p-4 md:p-6 shadow-xs space-y-4">
      
      {/* Table Container */}
      <div className="border border-gray-200 rounded overflow-hidden">
        <div className="max-h-[540px] overflow-y-auto custom-scrollbar">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-white sticky top-0 z-10 border-b border-gray-200 select-none shadow-2xs">
              <tr className="text-gray-900 font-bold">
                <th className="py-2.5 px-4 w-24">SNo.</th>
                <th className="py-2.5 px-4 w-28">Period</th>
                <th className="py-2.5 px-4">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {periodList.map((p) => (
                <tr key={p.sno} className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-2.5 px-4 text-gray-800 font-medium">{p.sno}</td>
                  <td className="py-2.5 px-4 font-bold text-gray-900">{p.period}</td>
                  <td className="py-2.5 px-4">
                    <input
                      type="text"
                      value={p.time}
                      onChange={(e) => handleTimeChange(p.sno, e.target.value)}
                      className="w-full text-xs border border-gray-300 rounded px-3 py-1.5 text-gray-800 bg-white outline-none hover:border-blue-400 focus:border-blue-500 shadow-2xs font-medium"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Update Button */}
      <div className="pt-2 flex justify-center">
        <button
          type="button"
          onClick={handleUpdate}
          className="border border-[#0288d1] text-[#0288d1] hover:bg-blue-50 px-6 py-1.5 rounded text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs transition"
        >
          <FaSyncAlt className="text-xs" />
          <span>Update</span>
        </button>
      </div>

    </div>
  );
}

// =========================================================================
// 12. PERIOD ALLOTMENT NEW (MATCHING SCREENSHOT 1 & 2 & 3)
// =========================================================================
function PeriodAllotmentNewView({ showToast }) {
  const [teachers, setTeachers] = useState([]);
  const [classesList, setClassesList] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedClasses, setSelectedClasses] = useState({});
  const [subjectRows, setSubjectRows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initData = async () => {
      try {
        const token = localStorage.getItem("token");
        const [staffRes, clsSectRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/staffs`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/class-sections`, { headers: { Authorization: `Bearer ${token}` } })
        ]);
        if (staffRes.ok) {
          const sJson = await staffRes.json();
          setTeachers(Array.isArray(sJson) ? sJson : (sJson.data || []));
        }
        if (clsSectRes.ok) {
          const clsSectData = await clsSectRes.json();
          const formattedClasses = [];
          clsSectData.forEach(entry => {
            const className = entry.className;
            if (entry.sections && entry.sections.length > 0) {
              entry.sections.forEach(sec => {
                formattedClasses.push({
                  id: `${className}_${sec}`,
                  classId: className,
                  sectionId: sec,
                  name: `${className}-${sec}`
                });
              });
            } else {
              formattedClasses.push({ id: `${className}_`, classId: className, sectionId: null, name: className });
            }
          });
          setClassesList(formattedClasses);
        }
      } catch(e) { console.error(e); }
    };
    initData();
  }, []);

  const handleClassCheck = (id) => {
    setSelectedClasses((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShowSubjects = async () => {
    const checkedIds = Object.keys(selectedClasses).filter((k) => selectedClasses[k]);
    if (checkedIds.length === 0) {
      showToast("Please select at least one Class");
      return;
    }
    
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const [csRes, paRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/class-subjects`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/period-allotment`, { headers: { Authorization: `Bearer ${token}` } })
      ]);
      
      let classSubjects = [];
      let allotments = [];
      if (csRes.ok) classSubjects = await csRes.json();
      if (paRes.ok) allotments = await paRes.json();
      
      let gridRows = [];
      
      checkedIds.forEach((cId) => {
        const clsObj = classesList.find((c) => c.id === cId);
        if (!clsObj) return;
        
        const csMatch = classSubjects.find(cs => 
          (cs.class?._id === clsObj.classId || cs.class?.className === clsObj.classId || cs.class === clsObj.classId) && 
          (cs.section?._id === clsObj.sectionId || cs.section?.sectionName === clsObj.sectionId || cs.section?.name === clsObj.sectionId || (!clsObj.sectionId && !cs.section))
        );
        
        if (csMatch && csMatch.subjects) {
          csMatch.subjects.forEach((subObj) => {
            const subjectId = subObj.subject?._id || subObj.subject;
            const subjectName = subObj.subject?.name || "Unknown";
            
            const existingAllotment = allotments.find(a => 
               (a.class?._id === clsObj.classId || a.class?.className === clsObj.classId || a.class === clsObj.classId) &&
               (a.section?._id === clsObj.sectionId || a.section?.sectionName === clsObj.sectionId || a.section?.name === clsObj.sectionId || (!clsObj.sectionId && !a.section)) &&
               (a.subject?._id === subjectId || a.subject === subjectId)
            );
            
            let teacherName = "-";
            let teacherId = null;
            if (existingAllotment && existingAllotment.teacher) {
               teacherId = existingAllotment.teacher._id || existingAllotment.teacher;
               teacherName = existingAllotment.teacher.firstName ? `${existingAllotment.teacher.firstName} ${existingAllotment.teacher.lastName}` : (existingAllotment.teacher.name || "Assigned");
            }

            gridRows.push({
              id: `${cId}_${subjectId}`,
              classId: clsObj.classId,
              sectionId: clsObj.sectionId,
              subjectId: subjectId,
              className: clsObj.name,
              subject: subjectName,
              periods: subObj.periodsPerWeek || 0,
              teacherId: teacherId,
              teacher: teacherName,
              selected: false
            });
          });
        }
      });
      
      setSubjectRows(gridRows);
      showToast(`Loaded ${gridRows.length} subject entries`);
    } catch(err) {
      console.error(err);
      showToast("Failed to fetch subjects");
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async () => {
    const checkedRows = subjectRows.filter((r) => r.selected);
    if (checkedRows.length === 0) {
      showToast("Please select at least one subject to assign");
      return;
    }
    if (!selectedTeacher) {
      showToast("Please select a Teacher to assign");
      return;
    }
    
    try {
      const token = localStorage.getItem("token");
      const promises = checkedRows.map(r => {
        return fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/period-allotment`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({
             class: r.classId,
             section: r.sectionId || null,
             subject: r.subjectId,
             teacher: selectedTeacher
          })
        });
      });
      
      await Promise.all(promises);
      showToast("Period Allotment Assigned Successfully!");
      handleShowSubjects();
    } catch (err) {
      console.error(err);
      showToast("Failed to assign periods");
    }
  };

  const handleUnassign = async () => {
    const checkedRows = subjectRows.filter((r) => r.selected);
    if (checkedRows.length === 0) {
      showToast("Please select at least one subject to unassign");
      return;
    }
    
    try {
      const token = localStorage.getItem("token");
      const promises = checkedRows.map(r => {
        return fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/period-allotment`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({
             class: r.classId,
             section: r.sectionId || null,
             subject: r.subjectId,
             teacher: null
          })
        });
      });
      
      await Promise.all(promises);
      showToast("Period Allotment Unassigned Successfully!");
      handleShowSubjects();
    } catch (err) {
      console.error(err);
      showToast("Failed to unassign periods");
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-b rounded-tr p-4 md:p-6 shadow-xs space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (Select Teacher + Select Class List) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Select Teacher Dropdown */}
          <div className="space-y-1 text-left">
            <label className="block text-xs font-bold text-gray-800">Select Teacher</label>
            <div className="relative">
              <select
                value={selectedTeacher}
                onChange={(e) => setSelectedTeacher(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded px-3 py-2 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs"
              >
                <option value="">Select Teacher</option>
                {teachers.map((t) => (
                  <option key={t._id} value={t._id}>
                    {t.firstName} {t.lastName}
                  </option>
                ))}
              </select>
              <FaAngleDown className="absolute right-3 top-3 text-[10px] pointer-events-none text-gray-400" />
            </div>
          </div>

          {/* Select Class Container */}
          <div className="border border-gray-200 rounded overflow-hidden shadow-2xs">
            <div className="bg-gray-100/80 py-2 px-3 text-center text-xs font-bold text-gray-800 border-b border-gray-200">
              Select Class
            </div>
            <div className="max-h-72 overflow-y-auto custom-scrollbar">
              <table className="w-full text-left text-xs">
                <thead className="bg-white border-b border-gray-200 sticky top-0">
                  <tr className="text-gray-900 font-bold">
                    <th className="py-2 px-3 w-16 text-center">Select</th>
                    <th className="py-2 px-3">Class Name</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {classesList.map((cls) => (
                    <tr key={cls.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-2 px-3 text-center">
                        <input
                          type="checkbox"
                          checked={!!selectedClasses[cls.id]}
                          onChange={() => handleClassCheck(cls.id)}
                          className="w-3.5 h-3.5 border-gray-300 rounded text-blue-600 focus:ring-0 cursor-pointer"
                        />
                      </td>
                      <td className="py-2 px-3 font-semibold text-gray-800">{cls.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-3 bg-white border-t border-gray-200 flex justify-center">
              <button
                onClick={handleShowSubjects}
                disabled={loading}
                className="border border-[#0288d1] text-[#0288d1] hover:bg-blue-50 px-4 py-1 rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs transition disabled:opacity-50"
              >
                <span>{loading ? "Loading..." : "👁 Show Subjects"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (Action Buttons + Select Subjects Table) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Top Right Buttons: Unassign & Filter */}
          <div className="flex items-center justify-start gap-3">
            <button
              onClick={handleUnassign}
              className="border border-[#0288d1] text-[#0288d1] hover:bg-blue-50 px-3.5 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
            >
              <FaEdit className="text-[11px]" />
              <span>Unassign</span>
            </button>
            <button
              onClick={() => showToast("Filter Subjects panel")}
              className="border border-[#0288d1] text-[#0288d1] hover:bg-blue-50 px-3.5 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
            >
              <span>Y Filter</span>
            </button>
          </div>

          {/* Select Subjects Table Card */}
          <div className="border border-gray-200 rounded overflow-hidden shadow-2xs">
            <div className="bg-gray-100/80 py-2 px-3 text-center text-xs font-bold text-gray-800 border-b border-gray-200">
              Select Subjects
            </div>
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-white border-b border-gray-200 select-none shadow-2xs">
                  <tr className="text-gray-900 font-bold">
                    <th className="py-2.5 px-3 w-16 text-center">Select</th>
                    <th className="py-2.5 px-3 w-28">Class Name</th>
                    <th className="py-2.5 px-3">Subjects</th>
                    <th className="py-2.5 px-3 w-24">Periods</th>
                    <th className="py-2.5 px-3 w-40">Teachers</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {subjectRows.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-gray-400 bg-sky-50/20 font-medium">
                        {/* Blank default table matching Screenshot 1 */}
                      </td>
                    </tr>
                  ) : (
                    subjectRows.map((row) => (
                      <tr key={row.id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="py-2.5 px-3 text-center">
                          <input
                            type="checkbox"
                            checked={row.selected}
                            onChange={() => {
                              setSubjectRows((prev) =>
                                prev.map((r) => (r.id === row.id ? { ...r, selected: !r.selected } : r))
                              );
                            }}
                            className="w-3.5 h-3.5 border-gray-300 rounded text-blue-600 focus:ring-0 cursor-pointer"
                          />
                        </td>
                        <td className="py-2.5 px-3 font-bold text-gray-900">{row.className}</td>
                        <td className="py-2.5 px-3 font-semibold text-gray-800 uppercase">{row.subject}</td>
                        <td className="py-2.5 px-3">{row.periods}</td>
                        <td className="py-2.5 px-3 font-semibold text-blue-700 uppercase">{row.teacher}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Bottom Assign Button */}
            <div className="p-3 bg-white border-t border-gray-200 flex justify-center">
              <button
                onClick={handleAssign}
                className="border border-[#0288d1] text-[#0288d1] hover:bg-blue-50 px-6 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
              >
                <FaCheck className="text-xs" />
                <span>Assign</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// 13. CHANGE ACADEMIC YEAR (MATCHING SCREENSHOT 2)
// =========================================================================
function ChangeAcademicYearView({ showToast }) {
  const [academicYears, setAcademicYears] = useState([]);
  const [financialYears, setFinancialYears] = useState([]);
  const [schools, setSchools] = useState([]);
  
  const [academicYearId, setAcademicYearId] = useState("");
  const [financialYearId, setFinancialYearId] = useState("");
  const [schoolId, setSchoolId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/change-academic-year/options`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setAcademicYears(data.academicYears || []);
          setFinancialYears(data.financialYears || []);
          setSchools(data.schools || []);
          
          const activeAy = data.academicYears?.find(y => y.isActive);
          if (activeAy) setAcademicYearId(activeAy._id);
          else if (data.academicYears?.length) setAcademicYearId(data.academicYears[0]._id);
          
          const activeFy = data.financialYears?.find(y => y.isActive);
          if (activeFy) setFinancialYearId(activeFy._id);
          else if (data.financialYears?.length) setFinancialYearId(data.financialYears[0]._id);
          
          const activeSchool = data.schools?.find(s => s.isMainSchool || s.isActive);
          if (activeSchool) setSchoolId(activeSchool._id);
          else if (data.schools?.length) setSchoolId(data.schools[0]._id);
        }
      } catch (err) {
        console.error("Failed to fetch change academic year options:", err);
      }
    };
    fetchOptions();
  }, []);

  const handleChange = async () => {
    if (!academicYearId || !financialYearId || !schoolId) {
      showToast("Please select all options");
      return;
    }
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/change-academic-year`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ academicYearId, financialYearId, schoolId })
      });
      if (res.ok) {
        showToast("Academic Year, Financial Year & School Changed Successfully!");
      } else {
        const errData = await res.json();
        showToast(errData.message || "Failed to change settings");
      }
    } catch (err) {
      console.error(err);
      showToast("Error updating settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-b rounded-tr p-8 shadow-xs min-h-[480px] flex flex-col items-center justify-start pt-10 select-none">
      <div className="w-full max-w-xl space-y-6">
        
        {/* Academic Year Dropdown */}
        <div className="space-y-1.5 text-left">
          <label className="block text-xs font-bold text-gray-800">Academic Year</label>
          <div className="relative">
            <select
              value={academicYearId}
              onChange={(e) => setAcademicYearId(e.target.value)}
              className="w-full text-xs border border-gray-300 rounded px-3 py-2 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs"
            >
              {academicYears.map((ay) => (
                <option key={ay._id} value={ay._id}>{ay.name}</option>
              ))}
            </select>
            <FaAngleDown className="absolute right-3 top-3 text-[10px] pointer-events-none text-gray-400" />
          </div>
        </div>

        {/* Financial Year Dropdown */}
        <div className="space-y-1.5 text-left">
          <label className="block text-xs font-bold text-gray-800">Financial Year</label>
          <div className="relative">
            <select
              value={financialYearId}
              onChange={(e) => setFinancialYearId(e.target.value)}
              className="w-full text-xs border border-gray-300 rounded px-3 py-2 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs"
            >
              {financialYears.map((fy) => (
                <option key={fy._id} value={fy._id}>{fy.name}</option>
              ))}
            </select>
            <FaAngleDown className="absolute right-3 top-3 text-[10px] pointer-events-none text-gray-400" />
          </div>
        </div>

        {/* School Dropdown */}
        <div className="space-y-1.5 text-left">
          <label className="block text-xs font-bold text-gray-800">School</label>
          <div className="relative">
            <select
              value={schoolId}
              onChange={(e) => setSchoolId(e.target.value)}
              className="w-full text-xs border border-gray-300 rounded px-3 py-2 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs"
            >
              {schools.map((s) => (
                <option key={s._id} value={s._id}>{s.schoolName}</option>
              ))}
            </select>
            <FaAngleDown className="absolute right-3 top-3 text-[10px] pointer-events-none text-gray-400" />
          </div>
        </div>

        {/* Change Button */}
        <div className="pt-4 flex justify-center">
          <button
            type="button"
            onClick={handleChange}
            disabled={loading}
            className="border border-[#0288d1] text-[#0288d1] hover:bg-blue-50 px-5 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs transition disabled:opacity-50"
          >
            <FaSyncAlt className="text-[11px]" />
            <span>{loading ? "Changing..." : "Change"}</span>
          </button>
        </div>

      </div>
    </div>
  );
}

// =========================================================================
// 14. TIMETABLE SUBSTITUTION SETTING (MATCHING SCREENSHOT 3)
// =========================================================================
function TimetableSubstitutionSettingView({ showToast }) {
  const defaultPatterns = [
    { sno: 1, pattern: "Any subject teacher in whole school", selected: true, orderNo: "1" },
    { sno: 2, pattern: "Same wing with any subject teacher", selected: false, orderNo: "" },
    { sno: 3, pattern: "Same wing with same subject teacher", selected: false, orderNo: "" },
    { sno: 4, pattern: "Same class with any subject teacher", selected: false, orderNo: "" },
    { sno: 5, pattern: "Same wing with maximum free periods", selected: false, orderNo: "" }
  ];

  const [patterns, setPatterns] = useState(defaultPatterns);
  const [repeatTeacher, setRepeatTeacher] = useState("No");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/substitution-settings`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.patterns && data.patterns.length > 0) {
            setPatterns(data.patterns);
            setRepeatTeacher(data.repeatTeacher || "No");
          }
        }
      } catch (err) {
        console.error("Failed to fetch substitution settings:", err);
      }
    };
    fetchSettings();
  }, []);

  const handleToggleSelect = (sno) => {
    setPatterns((prev) =>
      prev.map((p) => (p.sno === sno ? { ...p, selected: !p.selected } : p))
    );
  };

  const handleOrderChange = (sno, val) => {
    setPatterns((prev) =>
      prev.map((p) => (p.sno === sno ? { ...p, orderNo: val } : p))
    );
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/substitution-settings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ patterns, repeatTeacher })
      });
      if (res.ok) {
        showToast("Substitution Settings Updated Successfully!");
      } else {
        const errData = await res.json();
        showToast(errData.message || "Failed to save substitution settings");
      }
    } catch (err) {
      console.error(err);
      showToast("Error saving substitution settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-b rounded-tr p-6 shadow-xs space-y-6 select-none">
      
      {/* Substitution Patterns Table Matching Screenshot 3 */}
      <div className="border border-gray-200 rounded overflow-hidden shadow-2xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-white border-b border-gray-200 select-none shadow-2xs">
            <tr className="text-gray-900 font-bold">
              <th className="py-2.5 px-4 w-20">S.No.</th>
              <th className="py-2.5 px-4 w-24 text-center">Select</th>
              <th className="py-2.5 px-4">Substitution Pattern</th>
              <th className="py-2.5 px-4 w-48">Order No.</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {patterns.map((row) => (
              <tr key={row.sno} className="hover:bg-gray-50/80 transition-colors">
                <td className="py-2.5 px-4 font-semibold text-gray-800">{row.sno}</td>
                <td className="py-2.5 px-4 text-center">
                  <input
                    type="checkbox"
                    checked={row.selected}
                    onChange={() => handleToggleSelect(row.sno)}
                    className="w-3.5 h-3.5 border-gray-300 rounded text-blue-600 focus:ring-0 cursor-pointer"
                  />
                </td>
                <td className="py-2.5 px-4 font-medium text-gray-800">{row.pattern}</td>
                <td className="py-2.5 px-4">
                  <input
                    type="text"
                    value={row.orderNo}
                    onChange={(e) => handleOrderChange(row.sno, e.target.value)}
                    className="w-36 text-xs border border-gray-300 rounded px-2.5 py-1 text-gray-800 bg-white font-medium outline-none hover:border-blue-400 focus:border-blue-500 shadow-2xs"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Repeat Teacher Option Matching Screenshot 3 */}
      <div className="space-y-2 pt-2 text-left">
        <label className="block text-xs font-bold text-gray-800">
          2) Want to repeat teacher in Substitution ?
        </label>
        <div className="relative w-44">
          <select
            value={repeatTeacher}
            onChange={(e) => setRepeatTeacher(e.target.value)}
            className="w-full text-xs border border-gray-300 rounded px-3 py-1.5 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
          <FaAngleDown className="absolute right-3 top-2.5 text-[10px] pointer-events-none text-gray-400" />
        </div>
      </div>

      {/* Bottom Update Setting Button */}
      <div className="pt-2 flex justify-center">
        <button
          type="button"
          onClick={handleSave}
          disabled={loading}
          className="border border-[#0288d1] text-[#0288d1] hover:bg-blue-50 px-5 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs transition disabled:opacity-50"
        >
          <FaSyncAlt className="text-[11px]" />
          <span>{loading ? "Updating..." : "Update Setting"}</span>
        </button>
      </div>

    </div>
  );
}

// =========================================================================
// 15. PARALLEL ALLOCATION VIEW (MATCHING SCREENSHOT 1 & MULTI-SELECT IMAGES 2,3,4)
// =========================================================================
function ParallelAllocationView({ showToast }) {
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [pAllocName, setPAllocName] = useState("");
  const [periodsToAlloc, setPeriodsToAlloc] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSubjects = async () => {
    if (selectedClasses.length === 0) {
      showToast("Please select at least one class");
      return;
    }
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/class-teacher-subjects`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        // Filter subjects mapped to selected classes
        const filtered = data.filter(item => selectedClasses.includes(item.classId?._id));
        const newRows = filtered.map(item => ({
          classId: item.classId?._id,
          className: item.classId?.name || "Unknown",
          subjectId: item.subjectId?._id,
          subjects: item.subjectId?.name || "Unknown",
          periods: item.periodsPerWeek || 0,
          teacherId: item.teacherId?._id,
          teacher: item.teacherId?.name || "Unassigned",
          selected: false
        }));
        setRows(newRows);
        showToast("Subjects loaded successfully!");
      }
    } catch (err) {
      console.error(err);
      showToast("Failed to load subjects");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!pAllocName || !periodsToAlloc) {
      showToast("Please provide Allocation Name and Periods");
      return;
    }
    const selectedRows = rows.filter(r => r.selected);
    if (selectedRows.length === 0) {
      showToast("Please select at least one row from the table");
      return;
    }
    
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const payload = {
        name: pAllocName,
        periodsToAllocate: Number(periodsToAlloc),
        allocations: selectedRows.map(r => ({
          classId: r.classId,
          subjectId: r.subjectId,
          teacherId: r.teacherId
        }))
      };
      
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/constraints/parallel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        showToast("Parallel Allocation Saved Successfully!");
      } else {
        const errData = await res.json();
        showToast(errData.message || "Failed to save allocation");
      }
    } catch (err) {
      console.error(err);
      showToast("Error saving allocation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-b rounded-tr p-6 shadow-xs space-y-6 select-none">
      
      <div className="flex flex-wrap items-end gap-5">
        <ClassMultiSelectDropdown
          selected={selectedClasses}
          onChange={setSelectedClasses}
          label="Class"
          width="w-56"
        />

        <div className="flex items-center gap-2.5 pb-0.5">
          <button
            type="button"
            onClick={fetchSubjects}
            disabled={loading}
            className="border border-[#0288d1] text-[#0288d1] hover:bg-blue-50 px-3.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition disabled:opacity-50"
          >
            <span>👁 {loading ? "Loading..." : "Show Subjects"}</span>
          </button>
          <button
            type="button"
            onClick={() => showToast("Filter Subject dialog opened")}
            className="border border-[#0288d1] text-[#0288d1] hover:bg-blue-50 px-3.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
          >
            <span>Y Filter Subject</span>
          </button>
        </div>

        <div className="space-y-1 text-left min-w-[170px]">
          <label className="block text-xs font-bold text-gray-800">P-Allocation Name</label>
          <input
            type="text"
            value={pAllocName}
            onChange={(e) => setPAllocName(e.target.value)}
            className="w-full text-xs border border-gray-300 rounded px-3 py-1.5 text-gray-800 bg-white font-medium outline-none hover:border-blue-400 focus:border-blue-500 shadow-2xs"
          />
        </div>

        <div className="space-y-1 text-left min-w-[170px]">
          <label className="block text-xs font-bold text-gray-800">Periods to Allocate</label>
          <input
            type="number"
            value={periodsToAlloc}
            onChange={(e) => setPeriodsToAlloc(e.target.value)}
            className="w-full text-xs border border-gray-300 rounded px-3 py-1.5 text-gray-800 bg-white font-medium outline-none hover:border-blue-400 focus:border-blue-500 shadow-2xs"
          />
        </div>

      </div>

      <div className="border border-gray-200 rounded overflow-hidden shadow-2xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-white border-b border-gray-200 select-none shadow-2xs">
            <tr className="text-gray-900 font-bold">
              <th className="py-2.5 px-4 w-28">Select</th>
              <th className="py-2.5 px-4 w-44">Class Name</th>
              <th className="py-2.5 px-4">Subjects</th>
              <th className="py-2.5 px-4 w-32">Periods</th>
              <th className="py-2.5 px-4 w-48">Teacher</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-2.5 px-4 text-center text-gray-700 bg-[#eaf4fc]/50 font-medium text-xs">
                  No data available in table
                </td>
              </tr>
            ) : (
              rows.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-2.5 px-4">
                    <input 
                      type="checkbox" 
                      checked={row.selected}
                      onChange={(e) => {
                        const newRows = [...rows];
                        newRows[idx].selected = e.target.checked;
                        setRows(newRows);
                      }}
                      className="w-3.5 h-3.5 cursor-pointer text-blue-600 border-gray-300 rounded focus:ring-0"
                    />
                  </td>
                  <td className="py-2.5 px-4">{row.className}</td>
                  <td className="py-2.5 px-4">{row.subjects}</td>
                  <td className="py-2.5 px-4">{row.periods}</td>
                  <td className="py-2.5 px-4">{row.teacher}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={handleSave}
          disabled={loading}
          className="border border-[#4caf50] text-[#4caf50] hover:bg-green-50 px-4 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition disabled:opacity-50"
        >
          <FaSave className="text-[11px]" />
          <span>{loading ? "Saving..." : "Save"}</span>
        </button>

        <button
          type="button"
          onClick={() => showToast("Viewing Parallel Allocations")}
          className="border border-[#0288d1] text-[#0288d1] hover:bg-blue-50 px-4 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
        >
          <FaEye className="text-[11px]" />
          <span>View</span>
        </button>

        <button
          type="button"
          onClick={() => showToast("Printing Parallel Allocation Report...")}
          className="border border-[#0288d1] text-[#0288d1] hover:bg-blue-50 px-4 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
        >
          <FaPrint className="text-[11px]" />
          <span>Print</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setSelectedClasses([]);
            setPAllocName("");
            setPeriodsToAlloc("");
            setRows([]);
            showToast("Form Reset to default");
          }}
          className="border border-[#ff9800] text-[#ff9800] hover:bg-amber-50 px-4 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
        >
          <FaTimesCircle className="text-[11px]" />
          <span>Reset</span>
        </button>
      </div>

    </div>
  );
}

function FixedAllocationView({ showToast }) {
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  
  const [allocations, setAllocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingOptions, setFetchingOptions] = useState(true);

  // New allocation form
  const [newDay, setNewDay] = useState("Monday");
  const [newPeriod, setNewPeriod] = useState("1");
  const [newSubject, setNewSubject] = useState("");
  const [newTeacher, setNewTeacher] = useState("");

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const periods = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };
        
        const [clsRes, secRes, subRes, staffRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/school-classes`, { headers }),
          fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/class-sections`, { headers }),
          fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/subjects`, { headers }),
          fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/staffs?limit=100`, { headers })
        ]);

        if (clsRes.ok) setClasses((await clsRes.json()).data || []);
        if (secRes.ok) setSections((await secRes.json()).data || []);
        if (subRes.ok) setSubjects((await subRes.json()).data || []);
        if (staffRes.ok) setTeachers((await staffRes.json()).data || []);

      } catch (err) {
        console.error("Error fetching options:", err);
      } finally {
        setFetchingOptions(false);
      }
    };
    fetchDropdowns();
  }, []);

  const handleGo = async () => {
    if (!selectedClass || !selectedSection) {
      showToast("Please select Class and Section");
      return;
    }
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/constraints/fixed?classId=${selectedClass}&sectionId=${selectedSection}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setAllocations(data);
        showToast("Fixed Allocations loaded");
      } else {
        showToast("Failed to load allocations");
      }
    } catch (err) {
      console.error(err);
      showToast("Error loading allocations");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAllocation = async () => {
    if (!selectedClass || !selectedSection || !newSubject || !newTeacher) {
      showToast("Please fill all required fields");
      return;
    }
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const payload = {
        classId: selectedClass,
        sectionId: selectedSection,
        subjectId: newSubject,
        teacherId: newTeacher,
        day: newDay,
        periodNo: Number(newPeriod)
      };
      
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/constraints/fixed`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        showToast("Fixed Allocation Saved!");
        handleGo(); // Refresh list
      } else {
        showToast("Failed to save allocation");
      }
    } catch (err) {
      console.error(err);
      showToast("Error saving allocation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-b rounded-tr p-8 shadow-xs min-h-[480px] space-y-6 select-none">
      
      <div className="flex items-end justify-center gap-6 pt-4">
        
        <div className="space-y-1.5 text-left w-48">
          <label className="block text-xs font-bold text-gray-800">Class</label>
          <div className="relative">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              disabled={fetchingOptions}
              className="w-full text-xs border border-gray-300 rounded px-3 py-1.5 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs disabled:bg-gray-100"
            >
              <option value="">Select</option>
              {classes.map((c) => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
            <FaAngleDown className="absolute right-3 top-2.5 text-[10px] pointer-events-none text-gray-400" />
          </div>
        </div>

        <div className="space-y-1.5 text-left w-48">
          <label className="block text-xs font-bold text-gray-800">Section</label>
          <div className="relative">
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              disabled={fetchingOptions}
              className="w-full text-xs border border-gray-300 rounded px-3 py-1.5 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs disabled:bg-gray-100"
            >
              <option value="">Select</option>
              {sections.map((s) => (
                <option key={s._id} value={s._id}>{s.name}</option>
              ))}
            </select>
            <FaAngleDown className="absolute right-3 top-2.5 text-[10px] pointer-events-none text-gray-400" />
          </div>
        </div>

        <div className="pb-0.5">
          <button
            type="button"
            onClick={handleGo}
            disabled={loading || fetchingOptions}
            className="border border-[#00a2db] rounded px-3.5 py-1.5 text-xs font-semibold text-[#00a2db] hover:bg-sky-50 flex items-center gap-1.5 cursor-pointer shadow-2xs transition disabled:opacity-50"
          >
            <svg className="w-3.5 h-3.5 text-[#00a2db]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" fill="#00a2db" fillOpacity="0.2" />
            </svg>
            <span>{loading ? "..." : "Go"}</span>
          </button>
        </div>

      </div>

      {/* Grid and Form for Fixed Allocation */}
      {selectedClass && selectedSection && (
        <div className="mt-8 space-y-6">
          <h3 className="text-sm font-bold text-gray-800 border-b pb-2">Assign Fixed Period</h3>
          <div className="flex flex-wrap items-end gap-4">
            <div className="space-y-1 w-32">
              <label className="block text-xs font-bold text-gray-800">Day</label>
              <select value={newDay} onChange={e => setNewDay(e.target.value)} className="w-full text-xs border border-gray-300 rounded px-2 py-1.5">
                {days.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div className="space-y-1 w-32">
              <label className="block text-xs font-bold text-gray-800">Period No</label>
              <select value={newPeriod} onChange={e => setNewPeriod(e.target.value)} className="w-full text-xs border border-gray-300 rounded px-2 py-1.5">
                {periods.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div className="space-y-1 w-48">
              <label className="block text-xs font-bold text-gray-800">Subject</label>
              <select value={newSubject} onChange={e => setNewSubject(e.target.value)} className="w-full text-xs border border-gray-300 rounded px-2 py-1.5">
                <option value="">Select Subject</option>
                {subjects.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
              </select>
            </div>
            <div className="space-y-1 w-48">
              <label className="block text-xs font-bold text-gray-800">Teacher</label>
              <select value={newTeacher} onChange={e => setNewTeacher(e.target.value)} className="w-full text-xs border border-gray-300 rounded px-2 py-1.5">
                <option value="">Select Teacher</option>
                {teachers.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
              </select>
            </div>
            <div className="pb-0.5">
              <button
                type="button"
                onClick={handleSaveAllocation}
                disabled={loading}
                className="bg-green-600 text-white rounded px-4 py-1.5 text-xs font-semibold hover:bg-green-700 transition"
              >
                Save
              </button>
            </div>
          </div>

          {allocations.length > 0 && (
            <div className="border border-gray-200 rounded overflow-hidden shadow-2xs mt-4">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr className="text-gray-700 font-bold">
                    <th className="py-2.5 px-4">Day</th>
                    <th className="py-2.5 px-4">Period</th>
                    <th className="py-2.5 px-4">Subject</th>
                    <th className="py-2.5 px-4">Teacher</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {allocations.map((a, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="py-2.5 px-4">{a.day}</td>
                      <td className="py-2.5 px-4">Period {a.periodNo}</td>
                      <td className="py-2.5 px-4">{a.subjectId?.name}</td>
                      <td className="py-2.5 px-4">{a.teacherId?.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// =========================================================================
// 17. CONSECUTIVE ALLOCATION VIEW (MATCHING SCREENSHOT 3)
// =========================================================================
function ConsecutiveAllocationView({ showToast }) {
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [totalPeriods, setTotalPeriods] = useState("");
  const [frequency, setFrequency] = useState("");
  const [totalSet, setTotalSet] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSubjects = async () => {
    if (selectedClasses.length === 0) {
      showToast("Please select at least one class");
      return;
    }
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/class-teacher-subjects`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        const filtered = data.filter(item => selectedClasses.includes(item.classId?._id));
        const newRows = filtered.map(item => ({
          classId: item.classId?._id,
          className: item.classId?.name || "Unknown",
          subjectId: item.subjectId?._id,
          subjects: item.subjectId?.name || "Unknown",
          periods: item.periodsPerWeek || 0,
          teacherId: item.teacherId?._id,
          teacher: item.teacherId?.name || "Unassigned",
          selected: false
        }));
        setRows(newRows);
        showToast("Subjects loaded successfully!");
      }
    } catch (err) {
      console.error(err);
      showToast("Failed to load subjects");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!totalPeriods || !frequency || !totalSet) {
      showToast("Please provide Total Periods, Frequency, and Total Set");
      return;
    }
    const selectedRows = rows.filter(r => r.selected);
    if (selectedRows.length === 0) {
      showToast("Please select at least one row from the table");
      return;
    }
    
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const payload = {
        totalPeriods: Number(totalPeriods),
        frequency: Number(frequency),
        totalSet: Number(totalSet),
        allocations: selectedRows.map(r => ({
          classId: r.classId,
          subjectId: r.subjectId,
          teacherId: r.teacherId
        }))
      };
      
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/constraints/consecutive`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        showToast("Consecutive Allocation Saved Successfully!");
      } else {
        showToast("Failed to save allocation");
      }
    } catch (err) {
      console.error(err);
      showToast("Error saving allocation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-b rounded-tr p-6 shadow-xs space-y-6 select-none">
      
      <div className="space-y-4">
        
        <div className="flex items-end gap-5">
          <ClassMultiSelectDropdown
            selected={selectedClasses}
            onChange={setSelectedClasses}
            label="Class"
            width="w-64"
          />

          <div className="pb-0.5">
            <button
              type="button"
              onClick={fetchSubjects}
              disabled={loading}
              className="border border-[#0288d1] text-[#0288d1] hover:bg-blue-50 px-3.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition disabled:opacity-50"
            >
              <span>👁 {loading ? "Loading..." : "Show Subjects"}</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="space-y-1 text-left w-36">
            <label className="block text-xs font-bold text-gray-800">Total Periods</label>
            <input
              type="number"
              value={totalPeriods}
              onChange={(e) => setTotalPeriods(e.target.value)}
              className="w-full text-xs border border-gray-300 rounded px-3 py-1.5 text-gray-800 bg-white font-medium outline-none hover:border-blue-400 focus:border-blue-500 shadow-2xs"
            />
          </div>

          <div className="space-y-1 text-left w-36">
            <label className="block text-xs font-bold text-gray-800">Frequency</label>
            <input
              type="number"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full text-xs border border-gray-300 rounded px-3 py-1.5 text-gray-800 bg-white font-medium outline-none hover:border-blue-400 focus:border-blue-500 shadow-2xs"
            />
          </div>

          <div className="space-y-1 text-left w-44">
            <label className="block text-xs font-bold text-gray-800">Total Set</label>
            <input
              type="number"
              value={totalSet}
              onChange={(e) => setTotalSet(e.target.value)}
              className="w-full text-xs border border-gray-300 rounded px-3 py-1.5 text-gray-800 bg-white font-medium outline-none hover:border-blue-400 focus:border-blue-500 shadow-2xs"
            />
          </div>
        </div>

      </div>

      <div className="border border-gray-200 rounded overflow-hidden shadow-2xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-white border-b border-gray-200 select-none shadow-2xs">
            <tr className="text-gray-900 font-bold">
              <th className="py-2.5 px-4 w-28">Select <span className="text-[10px] text-gray-400">⇅</span></th>
              <th className="py-2.5 px-4 w-44">Class Name <span className="text-[10px] text-gray-400">⇅</span></th>
              <th className="py-2.5 px-4">Subjects</th>
              <th className="py-2.5 px-4 w-32">Periods</th>
              <th className="py-2.5 px-4 w-48">Teachers <span className="text-[10px] text-gray-400">⇅</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-2.5 px-4 text-center text-gray-700 bg-[#eaf4fc]/50 font-medium text-xs">
                  No data available in table
                </td>
              </tr>
            ) : (
              rows.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-2.5 px-4">
                    <input 
                      type="checkbox" 
                      checked={row.selected}
                      onChange={(e) => {
                        const newRows = [...rows];
                        newRows[idx].selected = e.target.checked;
                        setRows(newRows);
                      }}
                      className="w-3.5 h-3.5 cursor-pointer text-blue-600 border-gray-300 rounded focus:ring-0"
                    />
                  </td>
                  <td className="py-2.5 px-4">{row.className}</td>
                  <td className="py-2.5 px-4">{row.subjects}</td>
                  <td className="py-2.5 px-4">{row.periods}</td>
                  <td className="py-2.5 px-4">{row.teacher}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={handleSave}
          disabled={loading}
          className="border border-[#4caf50] text-[#4caf50] hover:bg-green-50 px-4 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition disabled:opacity-50"
        >
          <FaSave className="text-[11px]" />
          <span>{loading ? "Saving..." : "Save"}</span>
        </button>

        <button
          type="button"
          onClick={() => showToast("Viewing Consecutive Allocations")}
          className="border border-[#0288d1] text-[#0288d1] hover:bg-blue-50 px-4 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
        >
          <FaEye className="text-[11px]" />
          <span>View</span>
        </button>

        <button
          type="button"
          onClick={() => showToast("Printing Consecutive Allocation Report...")}
          className="border border-[#0288d1] text-[#0288d1] hover:bg-blue-50 px-4 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
        >
          <FaPrint className="text-[11px]" />
          <span>Print</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setSelectedClasses([]);
            setTotalPeriods("");
            setFrequency("");
            setTotalSet("");
            setRows([]);
            showToast("Form Reset to default");
          }}
          className="border border-[#ff9800] text-[#ff9800] hover:bg-amber-50 px-4 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
        >
          <FaTimesCircle className="text-[11px]" />
          <span>Reset</span>
        </button>
      </div>

    </div>
  );
}

// =========================================================================
// 18. PREFERENCE ALLOCATION VIEW
// =========================================================================
function PreferenceAllocationView({ showToast }) {
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSubjects = async () => {
    if (selectedClasses.length === 0) {
      showToast("Please select at least one class");
      return;
    }
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/class-teacher-subjects`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        const filtered = data.filter(item => selectedClasses.includes(item.classId?._id));
        const newRows = filtered.map(item => ({
          classId: item.classId?._id,
          className: item.classId?.name || "Unknown",
          subjectId: item.subjectId?._id,
          subjects: item.subjectId?.name || "Unknown",
          periods: item.periodsPerWeek || 0,
          teacherId: item.teacherId?._id,
          teacher: item.teacherId?.name || "Unassigned",
          selected: false
        }));
        setRows(newRows);
        showToast("Subjects loaded successfully!");
      }
    } catch (err) {
      console.error(err);
      showToast("Failed to load subjects");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const selectedRows = rows.filter(r => r.selected);
    if (selectedRows.length === 0) {
      showToast("Please select at least one row from the table");
      return;
    }
    
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      // Create a payload. Preference allocation is per class.
      // We will loop over classes and save them separately, or just save one if the UI expects it.
      // Here we map directly to the API which handles one class at a time.
      const groupedByClass = {};
      selectedRows.forEach(r => {
        if (!groupedByClass[r.classId]) groupedByClass[r.classId] = [];
        groupedByClass[r.classId].push({
          subjectId: r.subjectId,
          teacherId: r.teacherId,
          preferredPeriods: [] // Can be updated if we add inputs for period numbers
        });
      });

      for (const classId in groupedByClass) {
        const payload = {
          classId,
          allocations: groupedByClass[classId]
        };
        await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/constraints/preference`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
      }
      
      showToast("Preference Allocation Saved Successfully!");
    } catch (err) {
      console.error(err);
      showToast("Error saving allocation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-b rounded-tr p-6 shadow-xs space-y-6 select-none">
      <div className="flex items-center gap-4">
        <ClassMultiSelectDropdown
          selected={selectedClasses}
          onChange={setSelectedClasses}
          label="Class"
          width="w-60"
        />

        <div className="pt-5">
          <button
            type="button"
            onClick={fetchSubjects}
            disabled={loading}
            className="border border-[#0288d1] text-[#0288d1] hover:bg-blue-50 px-3.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition disabled:opacity-50"
          >
            <span>👁 {loading ? "Loading..." : "Show Subjects"}</span>
          </button>
        </div>
      </div>

      <div className="border border-gray-200 rounded overflow-hidden shadow-2xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-white border-b border-gray-200 select-none shadow-2xs">
            <tr className="text-gray-900 font-bold">
              <th className="py-2.5 px-4 w-28">Select</th>
              <th className="py-2.5 px-4 w-44">Class Name</th>
              <th className="py-2.5 px-4">Subjects</th>
              <th className="py-2.5 px-4 w-32">Periods</th>
              <th className="py-2.5 px-4 w-48">Teacher</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-2.5 px-4 text-center text-gray-700 bg-[#eaf4fc]/50 font-medium text-xs">
                  No data available in table
                </td>
              </tr>
            ) : (
              rows.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-2.5 px-4">
                    <input 
                      type="checkbox" 
                      checked={row.selected}
                      onChange={(e) => {
                        const newRows = [...rows];
                        newRows[idx].selected = e.target.checked;
                        setRows(newRows);
                      }}
                      className="w-3.5 h-3.5 cursor-pointer text-blue-600 border-gray-300 rounded focus:ring-0"
                    />
                  </td>
                  <td className="py-2.5 px-4">{row.className}</td>
                  <td className="py-2.5 px-4">{row.subjects}</td>
                  <td className="py-2.5 px-4">{row.periods}</td>
                  <td className="py-2.5 px-4">{row.teacher}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={handleSave}
          disabled={loading}
          className="border border-[#4caf50] text-[#4caf50] hover:bg-green-50 px-4 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition disabled:opacity-50"
        >
          <FaSave className="text-[11px]" />
          <span>{loading ? "Saving..." : "Save"}</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setSelectedClasses([]);
            setRows([]);
            showToast("Form Reset to default");
          }}
          className="border border-[#ff9800] text-[#ff9800] hover:bg-amber-50 px-4 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
        >
          <FaTimesCircle className="text-[11px]" />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
}

// 38 Teachers List
const TEACHERS_LIST_38 = [
  "Select Teacher",
  "AARADHYA VERMA", "AKASH RAI", "AKHILESH MISHRA", "ALFIYA BANO", "AMIT DUBEY",
  "ANKIT KUMAR", "ANSHIKA", "ARCHANA YADAV", "ARPANA UPADHYAY", "ASHISH KUMAR",
  "AVANEESH KUMAR RAI", "DEEPA GUPTA", "GOLENDRA SINGH", "KIRAN YADAV", "MOHAMMAD MOZAHID",
  "NISHA GUPTA", "NITESH TIWARI", "PREM SHANKAR PATHAK", "PRINCE RAI", "PRIYANKA RAI",
  "RACHNA RAI", "RAM SAKAL SAHANI", "REKHA GUPTA", "SAHABUDDIN ALI", "SANJU CHAUDHARY",
  "SATYAM SINGH", "SEEMA GIRI", "SHAMA PARVEEN", "SHIKHA OJHA", "SIMRAN GUPTA",
  "SONIYA SINGH", "SUNITA", "SUSHIL KUMAR YADAV", "VASIM AHMAD", "VISHAKHA THAMI",
  "VISHAL SONAR", "VIVEKANAND TIWARI", "WASEEM FIROJ"
];

// =========================================================================
// 19. CREATE PREDEFINED TIMETABLE VIEW (MATCHING SCREENSHOT 2)
// =========================================================================
function CreatePredefinedTimetableView({ showToast }) {
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingOpts, setFetchingOpts] = useState(true);

  useEffect(() => {
    const fetchOpts = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };
        const [clsRes, secRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/school-classes`, { headers }),
          fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/class-sections`, { headers })
        ]);
        if (clsRes.ok) setClasses((await clsRes.json()).data || []);
        if (secRes.ok) setSections((await secRes.json()).data || []);
      } catch (err) { console.error(err); }
      finally { setFetchingOpts(false); }
    };
    fetchOpts();
  }, []);

  const handleGo = async () => {
    if (!selectedClass || !selectedSection) { showToast("Please select Class and Section"); return; }
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const cls = classes.find(c => c._id === selectedClass);
      const sec = sections.find(s => s._id === selectedSection);
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/predefined?class=${cls?.name || selectedClass}&section=${sec?.name || selectedSection}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.ok) {
        const data = await res.json();
        // Flatten schedule into rows
        const newRows = [];
        let sno = 1;
        (data.schedule || []).forEach(dayObj => {
          dayObj.periods?.forEach(p => {
            if (!p.isBreak) {
              newRows.push({
                sno: sno++,
                day: dayObj.day,
                period: p.periodName,
                teacher: p.teacher?.name || p.teacher?.firstName || "—",
                subject: p.subject || "—",
                action: "—"
              });
            }
          });
        });
        setRows(newRows);
        showToast(newRows.length > 0 ? "Timetable loaded!" : "No timetable found for this class.");
      }
    } catch (err) { console.error(err); showToast("Error loading timetable"); }
    finally { setLoading(false); }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-b rounded-tr p-6 shadow-xs space-y-6 select-none">
      <div className="flex items-center justify-center gap-4 pt-2">
        <span className="text-xs font-bold text-gray-800">Class Timetable</span>

        <div className="relative w-40">
          <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} disabled={fetchingOpts}
            className="w-full text-xs border border-gray-300 rounded px-3 py-1.5 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs disabled:bg-gray-100">
            <option value="">Select Class</option>
            {classes.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
          <FaAngleDown className="absolute right-3 top-2.5 text-[10px] pointer-events-none text-gray-400" />
        </div>

        <div className="relative w-40">
          <select value={selectedSection} onChange={e => setSelectedSection(e.target.value)} disabled={fetchingOpts}
            className="w-full text-xs border border-gray-300 rounded px-3 py-1.5 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs disabled:bg-gray-100">
            <option value="">Select Section</option>
            {sections.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
          </select>
          <FaAngleDown className="absolute right-3 top-2.5 text-[10px] pointer-events-none text-gray-400" />
        </div>

        <button type="button" onClick={handleGo} disabled={loading || fetchingOpts}
          className="border border-[#00a2db] rounded px-3.5 py-1.5 text-xs font-semibold text-[#00a2db] hover:bg-sky-50 flex items-center gap-1.5 cursor-pointer shadow-2xs transition disabled:opacity-50">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" fill="#00a2db" fillOpacity="0.2" />
          </svg>
          <span>{loading ? "..." : "Go"}</span>
        </button>

        <button type="button" onClick={() => showToast("Copy Timetable: Select a source class first")}
          className="bg-[#23a8e0] text-white hover:bg-[#0288d1] px-3.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition">
          <span>Copy Time Table</span>
        </button>
      </div>

      <div className="border border-gray-200 rounded overflow-hidden shadow-2xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-white border-b border-gray-200 select-none shadow-2xs">
            <tr className="text-gray-900 font-bold">
              <th className="py-2.5 px-4 w-20">SNo.</th>
              <th className="py-2.5 px-4 w-28">Day</th>
              <th className="py-2.5 px-4 w-28">Period</th>
              <th className="py-2.5 px-4">Teacher</th>
              <th className="py-2.5 px-4">Subject</th>
              <th className="py-2.5 px-4 w-44">Add/Remove Parallel</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.length === 0 ? (
              <tr><td colSpan={6} className="py-8 text-center text-gray-400 bg-sky-50/20 font-medium text-xs">
                {loading ? "Loading..." : "Select a class and section, then click Go"}
              </td></tr>
            ) : (
              rows.map((r, i) => (
                <tr key={i} className="hover:bg-gray-50/80">
                  <td className="py-2.5 px-4">{r.sno}</td>
                  <td className="py-2.5 px-4">{r.day}</td>
                  <td className="py-2.5 px-4">{r.period}</td>
                  <td className="py-2.5 px-4">{r.teacher}</td>
                  <td className="py-2.5 px-4">{r.subject}</td>
                  <td className="py-2.5 px-4">
                    <button className="border border-blue-400 text-blue-500 rounded px-2 py-0.5 text-[10px] hover:bg-blue-50 transition">+ Parallel</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// =========================================================================
// 20. AUTO GENERATE TIMETABLE VIEW (MATCHING SCREENSHOT 3)
// =========================================================================
function AutoGenerateTimetableView({ showToast }) {
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleAutoGenerate = async () => {
    if (selectedClasses.length === 0) { showToast("Please select at least one class"); return; }
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/auto-generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ classIds: selectedClasses })
      });
      const data = await res.json();
      showToast(data.message || "Auto generation started!");
    } catch (err) { showToast("Error starting auto generation"); }
    finally { setLoading(false); }
  };

  const handleDelete = async () => {
    if (selectedClasses.length === 0) { showToast("Please select at least one class"); return; }
    try {
      setDeleting(true);
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/by-classes`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ classNames: selectedClasses })
      });
      const data = await res.json();
      showToast(data.message || "Timetables deleted!");
    } catch (err) { showToast("Error deleting timetables"); }
    finally { setDeleting(false); }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-b rounded-tr p-8 shadow-xs min-h-[480px] space-y-10 select-none">
      <div className="flex items-center justify-center gap-6 pt-2">
        <span className="text-xs font-bold text-gray-800">Select Class</span>

        <ClassMultiSelectDropdown
          selected={selectedClasses}
          onChange={setSelectedClasses}
          label=""
          width="w-64"
        />

        <button
          type="button"
          onClick={handleAutoGenerate}
          disabled={loading}
          className="border border-[#0288d1] text-[#0288d1] hover:bg-blue-50 px-4 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition disabled:opacity-50"
        >
          <FaSyncAlt className={`text-[11px] ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? "Generating..." : "Auto Generate"}</span>
        </button>

        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="border border-[#f87171] text-[#f87171] hover:bg-red-50 px-4 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition disabled:opacity-50"
        >
          <FaTrash className="text-[11px]" />
          <span>Delete Timetable</span>
        </button>
      </div>

      {/* 7 Rules / Steps with green checkmarks Matching Screenshot 3 */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 pt-4 text-xs font-medium text-gray-800">
        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <span className="text-emerald-500 font-bold text-sm leading-none mt-0.5">✔</span>
            <span><strong className="text-gray-900 font-bold">Step1:</strong> Set parallel cases in single day period</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-emerald-500 font-bold text-sm leading-none mt-0.5">✔</span>
            <span><strong className="text-gray-900 font-bold">Step 2:</strong> Set all fixed constraints records</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-emerald-500 font-bold text-sm leading-none mt-0.5">✔</span>
            <span><strong className="text-gray-900 font-bold">Step 3:</strong> Set Consecutives cases</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-emerald-500 font-bold text-sm leading-none mt-0.5">✔</span>
            <span><strong className="text-gray-900 font-bold">Step 4:</strong> Set atleast 1 lecture free for teacher before and after lunch(If possible)</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <span className="text-emerald-500 font-bold text-sm leading-none mt-0.5">✔</span>
            <span><strong className="text-gray-900 font-bold">Step 5:</strong> Set all Not Applicable DAY PERIOD</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-emerald-500 font-bold text-sm leading-none mt-0.5">✔</span>
            <span><strong className="text-gray-900 font-bold">Step 6:</strong> Set first lecture to CLASS TEACHER</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-emerald-500 font-bold text-sm leading-none mt-0.5">✔</span>
            <span><strong className="text-gray-900 font-bold">Step 7:</strong> If any teacher remain free then swapping will be applied.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// 21. VIEW AND MODIFY TIMETABLE VIEW (MATCHING SCREENSHOT 4)
// =========================================================================
function ViewAndModifyTimetableView({ showToast }) {
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [timetable, setTimetable] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchingOpts, setFetchingOpts] = useState(true);

  useEffect(() => {
    const fetchOpts = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };
        const [clsRes, secRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/school-classes`, { headers }),
          fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/class-sections`, { headers })
        ]);
        if (clsRes.ok) setClasses((await clsRes.json()).data || []);
        if (secRes.ok) setSections((await secRes.json()).data || []);
      } catch (err) { console.error(err); }
      finally { setFetchingOpts(false); }
    };
    fetchOpts();
  }, []);

  const handleGo = async () => {
    if (!selectedClass || !selectedSection) { showToast("Please select Class and Section"); return; }
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const cls = classes.find(c => c._id === selectedClass);
      const sec = sections.find(s => s._id === selectedSection);
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables?class=${cls?.name || selectedClass}&section=${sec?.name || selectedSection}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.ok) {
        setTimetable(await res.json());
        showToast("Timetable loaded for viewing!");
      } else { showToast("No timetable found for this class/section"); }
    } catch (err) { showToast("Error loading timetable"); }
    finally { setLoading(false); }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-b rounded-tr p-8 shadow-xs min-h-[480px] space-y-6 select-none">
      <div className="flex items-end justify-center gap-6 pt-2">
        <div className="space-y-1.5 text-left w-48">
          <label className="block text-xs font-bold text-gray-800">Class</label>
          <div className="relative">
            <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} disabled={fetchingOpts}
              className="w-full text-xs border border-gray-300 rounded px-3 py-1.5 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs disabled:bg-gray-100">
              <option value="">Select Class</option>
              {classes.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
            <FaAngleDown className="absolute right-3 top-2.5 text-[10px] pointer-events-none text-gray-400" />
          </div>
        </div>

        <div className="space-y-1.5 text-left w-48">
          <label className="block text-xs font-bold text-gray-800">Section</label>
          <div className="relative">
            <select value={selectedSection} onChange={e => setSelectedSection(e.target.value)} disabled={fetchingOpts}
              className="w-full text-xs border border-gray-300 rounded px-3 py-1.5 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs disabled:bg-gray-100">
              <option value="">Select Section</option>
              {sections.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
            </select>
            <FaAngleDown className="absolute right-3 top-2.5 text-[10px] pointer-events-none text-gray-400" />
          </div>
        </div>

        <div className="pb-0.5">
          <button type="button" onClick={handleGo} disabled={loading || fetchingOpts}
            className="border border-[#00a2db] rounded px-3.5 py-1.5 text-xs font-semibold text-[#00a2db] hover:bg-sky-50 flex items-center gap-1.5 cursor-pointer shadow-2xs transition disabled:opacity-50">
            <svg className="w-3.5 h-3.5 text-[#00a2db]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" fill="#00a2db" fillOpacity="0.2" />
            </svg>
            <span>{loading ? "..." : "Go"}</span>
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 px-2 text-xs border-t border-gray-100">
        <div className="font-bold text-gray-900">
          ClassTeacher: <span className="font-medium text-gray-600">{timetable ? "Loaded" : "—"}</span>
        </div>
        <div className="flex items-center gap-5 text-gray-700 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center text-[10px] font-bold text-gray-600">P</span>
            <span>[Parallel]</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center text-[10px] font-bold text-gray-600">R</span>
            <span>[Resource]</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FaLock className="text-[11px] text-gray-600" />
            <span>[Fixed]</span>
          </div>
        </div>
      </div>
      {!timetable && !loading && (
        <p className="text-center text-gray-400 text-xs pt-4">Select a class and section, then click Go to load the timetable.</p>
      )}
    </div>
  );
}


// =========================================================================
// 22. REPLACE TEACHER VIEW (MATCHING SCREENSHOT 5)
// =========================================================================
function ReplaceTeacherView({ showToast }) {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [replaceToTeacher, setReplaceToTeacher] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [replacing, setReplacing] = useState(false);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/staffs`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setTeachers(data.staffs || data.data || data || []);
        }
      } catch (err) { console.error(err); }
    };
    fetchTeachers();
  }, []);

  const handleShowSubjects = async () => {
    if (!selectedTeacher) { showToast("Please select a teacher"); return; }
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/class-teacher-subjects`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.ok) {
        const data = await res.json();
        const filtered = data.filter(d => d.teacherId?._id === selectedTeacher);
        setRows(filtered.map(d => ({
          className: d.classId?.name || "—",
          subject: d.subjectId?.name || "—",
          periods: d.periodsPerWeek || 0,
          selected: false
        })));
        showToast(`Loaded ${filtered.length} subject(s) for this teacher`);
      }
    } catch (err) { showToast("Error loading subjects"); }
    finally { setLoading(false); }
  };

  const handleReplace = async () => {
    if (!selectedTeacher || !replaceToTeacher) { showToast("Please select both teachers"); return; }
    if (selectedTeacher === replaceToTeacher) { showToast("Please select two different teachers"); return; }
    try {
      setReplacing(true);
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/replace-teacher`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ fromTeacherId: selectedTeacher, toTeacherId: replaceToTeacher })
      });
      const data = await res.json();
      showToast(data.message || "Teacher replaced successfully!");
      setRows([]);
    } catch (err) { showToast("Error replacing teacher"); }
    finally { setReplacing(false); }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-b rounded-tr p-6 shadow-xs space-y-6 select-none">
      <div className="flex flex-col items-center gap-4 pt-2">
        <div className="flex items-center justify-center gap-8">
          <div className="space-y-1.5 text-left w-56">
            <label className="block text-xs font-bold text-gray-800">Select Teacher</label>
            <div className="relative">
              <select value={selectedTeacher} onChange={e => setSelectedTeacher(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded px-3 py-1.5 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs">
                <option value="">Select Teacher</option>
                {teachers.map(t => <option key={t._id} value={t._id}>{t.name || `${t.firstName || ''} ${t.lastName || ''}`.trim()}</option>)}
              </select>
              <FaAngleDown className="absolute right-3 top-2.5 text-[10px] pointer-events-none text-gray-400" />
            </div>
          </div>

          <div className="space-y-1.5 text-left w-56">
            <label className="block text-xs font-bold text-gray-800">Replace To</label>
            <div className="relative">
              <select value={replaceToTeacher} onChange={e => setReplaceToTeacher(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded px-3 py-1.5 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs">
                <option value="">Select Teacher</option>
                {teachers.map(t => <option key={t._id} value={t._id}>{t.name || `${t.firstName || ''} ${t.lastName || ''}`.trim()}</option>)}
              </select>
              <FaAngleDown className="absolute right-3 top-2.5 text-[10px] pointer-events-none text-gray-400" />
            </div>
          </div>

          <div className="pt-5">
            <button type="button" onClick={handleShowSubjects} disabled={loading}
              className="border border-[#0288d1] text-[#0288d1] hover:bg-blue-50 px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition disabled:opacity-50">
              <span>👁 {loading ? "Loading..." : "Show Subjects"}</span>
            </button>
          </div>
        </div>

        <button type="button" onClick={handleReplace} disabled={replacing}
          className="border border-[#0288d1] text-[#0288d1] hover:bg-blue-50 px-5 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs transition disabled:opacity-50">
          <FaExchangeAlt className="text-[11px]" />
          <span>{replacing ? "Replacing..." : "Replace"}</span>
        </button>
      </div>

      <div className="border border-gray-200 rounded overflow-hidden shadow-2xs">
        <div className="bg-gray-100/90 py-1.5 px-3 text-center text-xs font-bold text-gray-800 border-b border-gray-200">
          Replace Subject Teacher
        </div>
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-white border-b border-gray-200 select-none shadow-2xs">
            <tr className="text-gray-900 font-bold">
              <th className="py-2.5 px-4 w-48">ClassName <span className="text-[10px] text-gray-400">⇅</span></th>
              <th className="py-2.5 px-4">Subjects</th>
              <th className="py-2.5 px-4 w-36">Periods</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.length === 0 ? (
              <tr><td colSpan={3} className="py-2.5 px-4 text-center text-gray-700 bg-[#eaf4fc]/50 font-medium text-xs">
                No data available in table
              </td></tr>
            ) : rows.map((r, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="py-2.5 px-4">{r.className}</td>
                <td className="py-2.5 px-4">{r.subject}</td>
                <td className="py-2.5 px-4">{r.periods}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// =========================================================================
// 23. ASSIGN ONE TEACHER TIMETABLE TO ANOTHER VIEW (MATCHING SCREENSHOT 1)
// =========================================================================
function AssignOneTeacherTimetableToAnotherView({ showToast }) {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedNewTeacher, setSelectedNewTeacher] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/staffs`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setTeachers(data.staffs || data.data || data || []);
        }
      } catch (err) { console.error(err); }
    };
    fetchTeachers();
  }, []);

  const handleAssign = async () => {
    if (!selectedTeacher || !selectedNewTeacher) { showToast("Please select both teachers"); return; }
    if (selectedTeacher === selectedNewTeacher) { showToast("Please select two different teachers"); return; }
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/assign-teacher`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ fromTeacherId: selectedTeacher, toTeacherId: selectedNewTeacher })
      });
      const data = await res.json();
      showToast(data.message || "Timetable assigned successfully!");
    } catch (err) { showToast("Error assigning timetable"); }
    finally { setLoading(false); }
  };

  const getTeacherName = (t) => t.name || `${t.firstName || ''} ${t.lastName || ''}`.trim();

  return (
    <div className="bg-white border border-gray-300 rounded-b rounded-tr p-8 shadow-xs min-h-[480px] space-y-4 select-none">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
        <div className="space-y-3">
          <div className="text-center">
            <label className="block text-xs font-bold text-gray-800 mb-1.5">Select Teacher</label>
            <div className="relative w-72 mx-auto">
              <select value={selectedTeacher} onChange={e => setSelectedTeacher(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded px-3 py-1.5 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs text-left">
                <option value="">Select Teacher</option>
                {teachers.map(t => <option key={t._id} value={t._id}>{getTeacherName(t)}</option>)}
              </select>
              <FaAngleDown className="absolute right-3 top-2.5 text-[10px] pointer-events-none text-gray-400" />
            </div>
          </div>
          <div className="border border-gray-200 rounded h-7 bg-white shadow-2xs"></div>
        </div>

        <div className="space-y-3">
          <div className="text-center">
            <label className="block text-xs font-bold text-gray-800 mb-1.5">Select New Teacher</label>
            <div className="relative w-72 mx-auto">
              <select value={selectedNewTeacher} onChange={e => setSelectedNewTeacher(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded px-3 py-1.5 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs text-left">
                <option value="">Select New Teacher</option>
                {teachers.map(t => <option key={t._id} value={t._id}>{getTeacherName(t)}</option>)}
              </select>
              <FaAngleDown className="absolute right-3 top-2.5 text-[10px] pointer-events-none text-gray-400" />
            </div>
          </div>
          <div className="border border-gray-200 rounded h-7 bg-white shadow-2xs"></div>
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <button type="button" onClick={handleAssign} disabled={loading}
          className="border border-[#0288d1] text-[#0288d1] hover:bg-blue-50 px-5 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs transition disabled:opacity-50">
          <FaExchangeAlt className="text-[11px]" />
          <span>{loading ? "Assigning..." : "Assign Timetable"}</span>
        </button>
      </div>
    </div>
  );
}

// =========================================================================
// 24. MODIFY TIMETABLE VIEW (MATCHING SCREENSHOT 2)
// =========================================================================
function ModifyTimetableView({ showToast }) {
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [timetable, setTimetable] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchingOpts, setFetchingOpts] = useState(true);

  useEffect(() => {
    const fetchOpts = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };
        const [clsRes, secRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/school-classes`, { headers }),
          fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/class-sections`, { headers })
        ]);
        if (clsRes.ok) setClasses((await clsRes.json()).data || []);
        if (secRes.ok) setSections((await secRes.json()).data || []);
      } catch (err) { console.error(err); }
      finally { setFetchingOpts(false); }
    };
    fetchOpts();
  }, []);

  const handleGo = async () => {
    if (!selectedClass || !selectedSection) { showToast("Please select Class and Section"); return; }
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const cls = classes.find(c => c._id === selectedClass);
      const sec = sections.find(s => s._id === selectedSection);
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables?class=${cls?.name || selectedClass}&section=${sec?.name || selectedSection}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.ok) {
        setTimetable(await res.json());
        showToast("Timetable loaded for modification!");
      } else { showToast("No timetable found for this class/section"); }
    } catch (err) { showToast("Error loading timetable"); }
    finally { setLoading(false); }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-b rounded-tr p-8 shadow-xs min-h-[480px] space-y-6 select-none">
      <div className="flex items-center justify-center gap-6 pt-2">
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-gray-800">Class</label>
          <div className="relative w-40">
            <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} disabled={fetchingOpts}
              className="w-full text-xs border border-gray-300 rounded px-3 py-1.5 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs disabled:bg-gray-100">
              <option value="">Select Class</option>
              {classes.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
            <FaAngleDown className="absolute right-3 top-2.5 text-[10px] pointer-events-none text-gray-400" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-gray-800">Section</label>
          <div className="relative w-40">
            <select value={selectedSection} onChange={e => setSelectedSection(e.target.value)} disabled={fetchingOpts}
              className="w-full text-xs border border-gray-300 rounded px-3 py-1.5 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs disabled:bg-gray-100">
              <option value="">Select Section</option>
              {sections.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
            </select>
            <FaAngleDown className="absolute right-3 top-2.5 text-[10px] pointer-events-none text-gray-400" />
          </div>
        </div>

        <div>
          <button type="button" onClick={handleGo} disabled={loading || fetchingOpts}
            className="border border-[#00a2db] rounded px-3.5 py-1.5 text-xs font-semibold text-[#00a2db] hover:bg-sky-50 flex items-center gap-1.5 cursor-pointer shadow-2xs transition disabled:opacity-50">
            <svg className="w-3.5 h-3.5 text-[#00a2db]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" fill="#00a2db" fillOpacity="0.2" />
            </svg>
            <span>{loading ? "..." : "Go"}</span>
          </button>
        </div>
      </div>
      {!timetable && !loading && (
        <p className="text-center text-gray-400 text-xs pt-8">Select class and section, then click Go to load for modification.</p>
      )}
      {timetable && (
        <p className="text-center text-green-600 text-xs pt-4">✔ Timetable for {timetable.class} - {timetable.section} loaded. Edit functionality available in grid view.</p>
      )}
    </div>
  );
}

// =========================================================================
// 25. MODIFY PREDEFINED ALLOCATION VIEW (MATCHING SCREENSHOT 3)
// =========================================================================
function ModifyPredefinedAllocationView({ showToast }) {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingOpts, setFetchingOpts] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/school-classes`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) setClasses((await res.json()).data || []);
      } catch (err) { console.error(err); }
      finally { setFetchingOpts(false); }
    };
    fetchClasses();
  }, []);

  const handleGo = async () => {
    if (!selectedClass) { showToast("Please select a class"); return; }
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/class-teacher-subjects`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.ok) {
        const data = await res.json();
        const filtered = data.filter(d => d.classId?._id === selectedClass);
        setRows(filtered.map(d => ({
          className: d.classId?.name || "—",
          teacherName: d.teacherId?.name || d.teacherId?.firstName || "—",
          subjectName: d.subjectId?.name || "—",
          periods: d.periodsPerWeek || 0,
          selected: false
        })));
        showToast(`Loaded ${filtered.length} allocation(s)`);
      }
    } catch (err) { showToast("Error loading allocations"); }
    finally { setLoading(false); }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-b rounded-tr p-6 shadow-xs space-y-6 select-none">
      <div className="flex flex-col items-center gap-2 pt-2">
        <label className="text-xs font-bold text-gray-800">Select Class</label>
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} disabled={fetchingOpts}
              className="w-full text-xs border border-gray-300 rounded px-3 py-1.5 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs disabled:bg-gray-100">
              <option value="">Select Class</option>
              {classes.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
            <FaAngleDown className="absolute right-3 top-2.5 text-[10px] pointer-events-none text-gray-400" />
          </div>

          <button type="button" onClick={handleGo} disabled={loading || fetchingOpts}
            className="border border-[#00a2db] rounded px-3.5 py-1.5 text-xs font-semibold text-[#00a2db] hover:bg-sky-50 flex items-center gap-1.5 cursor-pointer shadow-2xs transition disabled:opacity-50">
            <svg className="w-3.5 h-3.5 text-[#00a2db]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" fill="#00a2db" fillOpacity="0.2" />
            </svg>
            <span>{loading ? "..." : "Go"}</span>
          </button>
        </div>
      </div>

      <div className="border border-gray-200 rounded overflow-hidden shadow-2xs">
        <div className="bg-gray-100/90 py-1.5 px-3 text-center text-xs font-bold text-gray-800 border-b border-gray-200">
          Select Subject
        </div>
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-white border-b border-gray-200 select-none shadow-2xs">
            <tr className="text-gray-900 font-bold">
              <th className="py-2.5 px-4 w-32 flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>Select</span>
              </th>
              <th className="py-2.5 px-4 w-40">Class</th>
              <th className="py-2.5 px-4 w-52">Teacher Name</th>
              <th className="py-2.5 px-4">Subject Name</th>
              <th className="py-2.5 px-4 w-32">Periods</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.length === 0 ? (
              <tr><td colSpan={5} className="py-8 text-center text-gray-400 bg-white font-medium text-xs">
                {loading ? "Loading..." : "Select a class and click Go"}
              </td></tr>
            ) : rows.map((r, i) => (
              <tr key={i} className="hover:bg-gray-50/80">
                <td className="py-2.5 px-4">
                  <input type="checkbox" checked={r.selected}
                    onChange={e => { const n = [...rows]; n[i].selected = e.target.checked; setRows(n); }}
                    className="w-3.5 h-3.5 cursor-pointer rounded" />
                </td>
                <td className="py-2.5 px-4">{r.className}</td>
                <td className="py-2.5 px-4">{r.teacherName}</td>
                <td className="py-2.5 px-4">{r.subjectName}</td>
                <td className="py-2.5 px-4">{r.periods}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// =========================================================================
// 26. TRANSFER TIMETABLE VIEW (MATCHING SCREENSHOT 4)
// =========================================================================
function TransferTimetableView({ showToast }) {
  const [sessions, setSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState("");
  const [nextSession, setNextSession] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/academic-sessions`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setSessions(data.sessions || []);
          setCurrentSession(data.currentSession || "");
        }
      } catch (err) { console.error(err); }
    };
    fetchSessions();
  }, []);

  const handleTransfer = async () => {
    if (!currentSession || !nextSession) { showToast("Please select both current and next session"); return; }
    if (currentSession === nextSession) { showToast("Current and next session cannot be the same"); return; }
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/transfer`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ fromSession: currentSession, toSession: nextSession })
      });
      const data = await res.json();
      showToast(data.message || "Transfer completed!");
    } catch (err) { showToast("Error transferring timetable"); }
    finally { setLoading(false); }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-b rounded-tr p-8 shadow-xs min-h-[480px] flex flex-col items-center justify-start pt-6 space-y-6 select-none">
      <div className="flex items-center justify-center gap-10">
        <div className="space-y-1.5 text-left w-56">
          <label className="block text-xs font-bold text-gray-800">Current Session</label>
          <div className="relative">
            <select value={currentSession} onChange={e => setCurrentSession(e.target.value)}
              className="w-full text-xs border border-gray-300 rounded px-3 py-1.5 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs">
              <option value="">Select Session</option>
              {sessions.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <FaAngleDown className="absolute right-3 top-2.5 text-[10px] pointer-events-none text-gray-400" />
          </div>
        </div>

        <div className="space-y-1.5 text-left w-56">
          <label className="block text-xs font-bold text-gray-800">Next Session</label>
          <div className="relative">
            <select value={nextSession} onChange={e => setNextSession(e.target.value)}
              className="w-full text-xs border border-gray-300 rounded px-3 py-1.5 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs">
              <option value="">Select Next Session</option>
              {sessions.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <FaAngleDown className="absolute right-3 top-2.5 text-[10px] pointer-events-none text-gray-400" />
          </div>
        </div>
      </div>

      <div className="pt-2">
        <button type="button" onClick={handleTransfer} disabled={loading}
          className="border border-[#00a2db] text-[#00a2db] hover:bg-sky-50 px-4 py-1.5 rounded text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-2xs transition disabled:opacity-50">
          <FaExchangeAlt className="text-[11px]" />
          <span>{loading ? "Transferring..." : "Transfer Timetable to Next Session"}</span>
        </button>
      </div>
    </div>
  );
}

// =========================================================================
// 27. MARK ATTENDANCE VIEW (MATCHING SCREENSHOT 2)
// =========================================================================
function MarkAttendanceView({ showToast }) {
  const today = new Date().toISOString().split('T')[0];
  const [selectDate, setSelectDate] = useState(today);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const getDayName = (dateStr) => DAYS[new Date(dateStr).getDay() === 0 ? 6 : new Date(dateStr).getDay() - 1];

  // Load attendance on mount with today's date
  useEffect(() => { handleGo(today); }, []);

  const handleGo = async (dateVal) => {
    const d = dateVal || selectDate;
    if (!d) { showToast("Please select a date"); return; }
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const dayName = getDayName(d);
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/mark-attendance?date=${d}&day=${dayName}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.ok) {
        const data = await res.json();
        const attendances = data.attendances || [];
        setRows(attendances.map((a, i) => ({
          sno: i + 1,
          day: data.day || dayName,
          teacherId: a.teacherId?._id || a.teacherId,
          teacher: a.teacherId?.name || a.teacherId?.firstName || "—",
          type: a.attendanceType || "Present"
        })));
        showToast(`Attendance loaded for ${d}`);
      } else { showToast("Failed to load attendance"); }
    } catch (err) { showToast("Error loading attendance"); }
    finally { setLoading(false); }
  };

  const handleTypeChange = (idx, val) => {
    setRows(prev => prev.map((r, i) => i === idx ? { ...r, type: val } : r));
  };

  const handleSave = async () => {
    if (rows.length === 0) { showToast("No attendance data to save"); return; }
    try {
      setSaving(true);
      const token = localStorage.getItem("token");
      const dayName = getDayName(selectDate);
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/mark-attendance`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          date: selectDate,
          day: dayName,
          attendances: rows.map(r => ({ teacherId: r.teacherId, attendanceType: r.type }))
        })
      });
      const data = await res.json();
      showToast(data.message || "Attendance saved successfully!");
    } catch (err) { showToast("Error saving attendance"); }
    finally { setSaving(false); }
  };

  const handleBiometric = async () => {
    try {
      setSyncing(true);
      // In real system this would call a biometric device API
      showToast("Biometric Attendance Synchronized!");
    } finally { setSyncing(false); }
  };

  const ATTENDANCE_TYPES = ["Present", "Absent", "Late", "Half Day", "On Leave"];

  return (
    <div className="bg-white border border-gray-300 rounded-b rounded-tr p-6 shadow-xs space-y-6 select-none">
      <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
        <span className="text-xs font-bold text-gray-800">Select Date</span>
        <input
          type="date"
          value={selectDate}
          onChange={e => setSelectDate(e.target.value)}
          className="text-xs border border-gray-300 rounded px-3 py-1.5 text-gray-800 bg-white font-medium outline-none hover:border-blue-400 shadow-2xs"
        />

        <button type="button" onClick={() => handleGo()} disabled={loading}
          className="border border-[#00a2db] rounded px-3.5 py-1.5 text-xs font-semibold text-[#00a2db] hover:bg-sky-50 flex items-center gap-1.5 cursor-pointer shadow-2xs transition disabled:opacity-50">
          <svg className="w-3.5 h-3.5 text-[#00a2db]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" fill="#00a2db" fillOpacity="0.2" />
          </svg>
          <span>{loading ? "Loading..." : "Go"}</span>
        </button>

        <button type="button" onClick={handleSave} disabled={saving}
          className="border border-[#4caf50] text-[#4caf50] hover:bg-green-50 px-3.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition disabled:opacity-50">
          <FaSave className="text-[11px]" />
          <span>{saving ? "Saving..." : "Save"}</span>
        </button>

        <button type="button" onClick={handleBiometric} disabled={syncing}
          className="border border-[#00a2db] text-[#00a2db] hover:bg-sky-50 px-3.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition disabled:opacity-50">
          <FaFingerprint className="text-[11px]" />
          <span>{syncing ? "Syncing..." : "Fetch Biometric Attendance"}</span>
        </button>
      </div>

      <div className="border border-gray-200 rounded overflow-hidden shadow-2xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-white border-b border-gray-200 select-none shadow-2xs">
            <tr className="text-gray-900 font-bold">
              <th className="py-2.5 px-4 w-20">SNo.</th>
              <th className="py-2.5 px-4 w-32">Day</th>
              <th className="py-2.5 px-4">Teacher Name</th>
              <th className="py-2.5 px-4 w-52">Attendance Type</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.length === 0 ? (
              <tr><td colSpan={4} className="py-8 text-center text-gray-400 bg-white font-medium text-xs">
                {loading ? "Loading attendance..." : "Select a date and click Go to load teacher attendance"}
              </td></tr>
            ) : (
              rows.map((r, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4">{r.sno}</td>
                  <td className="py-2.5 px-4">{r.day}</td>
                  <td className="py-2.5 px-4 font-medium">{r.teacher}</td>
                  <td className="py-2.5 px-4">
                    <div className="relative w-36">
                      <select value={r.type} onChange={e => handleTypeChange(i, e.target.value)}
                        className={`w-full text-xs border rounded px-2 py-1 font-semibold outline-none cursor-pointer appearance-none pr-6 transition
                          ${r.type === 'Present' ? 'border-green-300 text-green-700 bg-green-50' :
                            r.type === 'Absent' ? 'border-red-300 text-red-700 bg-red-50' :
                            r.type === 'Late' ? 'border-yellow-300 text-yellow-700 bg-yellow-50' :
                            'border-gray-300 text-gray-700 bg-white'}`}>
                        {ATTENDANCE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <FaAngleDown className="absolute right-2 top-1.5 text-[10px] pointer-events-none text-gray-400" />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// =========================================================================
// 28. SUBSTITUTION VIEW (MATCHING SCREENSHOT 3)
// =========================================================================
function SubstitutionView({ showToast }) {
  const today = new Date().toISOString().split('T')[0];
  const [selectDate, setSelectDate] = useState(today);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newEntry, setNewEntry] = useState({ absentTeacherId: "", period: "", classSubject: "", substituteTeacherId: "", wing: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Pre-fetch teachers for substitution modal
    const fetchTeachers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/staffs`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setTeachers(data.staffs || data.data || data || []);
        }
      } catch (err) { console.error(err); }
    };
    fetchTeachers();
    handleLoad(today);
  }, []);

  const handleLoad = async (dateVal) => {
    const d = dateVal || selectDate;
    if (!d) { showToast("Please select a date"); return; }
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/substitution?date=${d}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.ok) {
        const data = await res.json();
        setRows(data.map((r, i) => ({
          sno: i + 1,
          _id: r._id,
          day: r.day || "—",
          absentTeacher: r.absentTeacherId?.name || r.absentTeacherId?.firstName || "—",
          period: r.period || "—",
          classSubject: r.classSubject || "—",
          substituteBy: r.substituteTeacherId?.name || r.substituteTeacherId?.firstName || "—",
          wing: r.wing || "—"
        })));
        if (data.length === 0 && dateVal !== today) showToast("No substitutions found for this date");
      } else { showToast("Failed to load substitutions"); }
    } catch (err) { showToast("Error loading substitutions"); }
    finally { setLoading(false); }
  };

  const handleCreate = async () => {
    const { absentTeacherId, period } = newEntry;
    if (!absentTeacherId || !period) { showToast("Absent teacher and period are required"); return; }
    try {
      setSaving(true);
      const token = localStorage.getItem("token");
      const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
      const dayName = DAYS[new Date(selectDate).getDay() === 0 ? 6 : new Date(selectDate).getDay() - 1];
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/substitution`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ date: selectDate, day: dayName, ...newEntry })
      });
      const data = await res.json();
      if (res.ok) {
        showToast(data.message || "Substitution created!");
        setShowModal(false);
        setNewEntry({ absentTeacherId: "", period: "", classSubject: "", substituteTeacherId: "", wing: "" });
        handleLoad(selectDate);
      } else { showToast(data.message || "Error creating substitution"); }
    } catch (err) { showToast("Error creating substitution"); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this substitution?")) return;
    try {
      const token = localStorage.getItem("token");
      await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetables/substitution/${id}`, {
        method: "DELETE", headers: { Authorization: `Bearer ${token}` }
      });
      showToast("Substitution deleted!");
      setRows(prev => prev.filter(r => r._id !== id));
    } catch (err) { showToast("Error deleting substitution"); }
  };

  const getTeacherName = (t) => t.name || `${t.firstName || ''} ${t.lastName || ''}`.trim();

  return (
    <div className="bg-white border border-gray-300 rounded-b rounded-tr p-6 shadow-xs space-y-6 select-none">
      <div className="flex flex-col items-center gap-4 pt-2">
        <div className="flex items-center justify-center gap-4">
          <span className="text-xs font-bold text-gray-800">Select Date</span>
          <input type="date" value={selectDate} onChange={e => setSelectDate(e.target.value)}
            className="text-xs border border-gray-300 rounded px-3 py-1.5 text-gray-800 bg-white font-medium outline-none hover:border-blue-400 shadow-2xs" />

          <button type="button" onClick={() => handleLoad()} disabled={loading}
            className="border border-[#00a2db] rounded px-3.5 py-1.5 text-xs font-semibold text-[#00a2db] hover:bg-sky-50 flex items-center gap-1.5 cursor-pointer shadow-2xs transition disabled:opacity-50">
            <svg className="w-3.5 h-3.5 text-[#00a2db]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" fill="#00a2db" fillOpacity="0.2" />
            </svg>
            <span>{loading ? "Loading..." : "Go"}</span>
          </button>
        </div>

        <button type="button" onClick={() => setShowModal(true)}
          className="bg-[#23a8e0] text-white hover:bg-[#0288d1] px-4 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition">
          <span>+ Substitution New</span>
        </button>
      </div>

      {/* New Substitution Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-[480px] space-y-4">
            <h3 className="text-sm font-bold text-gray-800">Add New Substitution</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Absent Teacher *</label>
                <select value={newEntry.absentTeacherId} onChange={e => setNewEntry(p => ({...p, absentTeacherId: e.target.value}))}
                  className="w-full text-xs border border-gray-300 rounded px-2 py-1.5 outline-none">
                  <option value="">Select</option>
                  {teachers.map(t => <option key={t._id} value={t._id}>{getTeacherName(t)}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Period *</label>
                <input type="text" value={newEntry.period} onChange={e => setNewEntry(p => ({...p, period: e.target.value}))}
                  placeholder="e.g. 1st Period" className="w-full text-xs border border-gray-300 rounded px-2 py-1.5 outline-none" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Class & Subject</label>
                <input type="text" value={newEntry.classSubject} onChange={e => setNewEntry(p => ({...p, classSubject: e.target.value}))}
                  placeholder="e.g. Class 10A - Math" className="w-full text-xs border border-gray-300 rounded px-2 py-1.5 outline-none" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Substitute Teacher</label>
                <select value={newEntry.substituteTeacherId} onChange={e => setNewEntry(p => ({...p, substituteTeacherId: e.target.value}))}
                  className="w-full text-xs border border-gray-300 rounded px-2 py-1.5 outline-none">
                  <option value="">Select (optional)</option>
                  {teachers.map(t => <option key={t._id} value={t._id}>{getTeacherName(t)}</option>)}
                </select>
              </div>
              <div className="col-span-2">
                <label className="text-xs font-semibold text-gray-700 block mb-1">Wing</label>
                <input type="text" value={newEntry.wing} onChange={e => setNewEntry(p => ({...p, wing: e.target.value}))}
                  placeholder="e.g. Main Wing" className="w-full text-xs border border-gray-300 rounded px-2 py-1.5 outline-none" />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setShowModal(false)} className="border border-gray-300 text-gray-600 px-4 py-1.5 rounded text-xs font-semibold hover:bg-gray-50 transition">Cancel</button>
              <button onClick={handleCreate} disabled={saving} className="bg-[#23a8e0] text-white px-4 py-1.5 rounded text-xs font-semibold hover:bg-[#0288d1] transition disabled:opacity-50">
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="border border-gray-200 rounded overflow-hidden shadow-2xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-white border-b border-gray-200 select-none shadow-2xs">
            <tr className="text-gray-900 font-bold">
              <th className="py-2.5 px-4 w-16">SNo.</th>
              <th className="py-2.5 px-4 w-24">Day</th>
              <th className="py-2.5 px-4">Absent Teacher</th>
              <th className="py-2.5 px-4 w-28">Period</th>
              <th className="py-2.5 px-4">Class &amp; Subject</th>
              <th className="py-2.5 px-4">Substitute By</th>
              <th className="py-2.5 px-4 w-28">Wing</th>
              <th className="py-2.5 px-4 w-20">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.length === 0 ? (
              <tr><td colSpan={8} className="py-4 px-4 text-center text-gray-500 bg-[#eaf4fc]/50 font-medium text-xs">
                {loading ? "Loading substitutions..." : "No substitutions found for this date. Click '+ Substitution New' to add."}
              </td></tr>
            ) : (
              rows.map((r, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4">{r.sno}</td>
                  <td className="py-2.5 px-4">{r.day}</td>
                  <td className="py-2.5 px-4 font-medium text-red-600">{r.absentTeacher}</td>
                  <td className="py-2.5 px-4">{r.period}</td>
                  <td className="py-2.5 px-4">{r.classSubject}</td>
                  <td className="py-2.5 px-4 font-medium text-green-700">{r.substituteBy}</td>
                  <td className="py-2.5 px-4">{r.wing}</td>
                  <td className="py-2.5 px-4">
                    <button onClick={() => handleDelete(r._id)} className="text-red-400 hover:text-red-600 transition text-xs">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// =========================================================================
// 29. TIMETABLE REPORTS VIEW (EXACT MATCH WITH ALL SCREENSHOTS)
// =========================================================================

// =========================================================================
// 29. TIMETABLE REPORTS VIEW (EXACT MATCH WITH ALL SCREENSHOTS)
// =========================================================================
function TimetableReportsView({ tabId, title, showToast }) {
  const [showReport, setShowReport] = useState(false);
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(false);
  
  // Filters state
  const [selectedClass, setSelectedClass] = useState("Select Class");
  const [selectedTeacher, setSelectedTeacher] = useState("All Teachers");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [selectedDay, setSelectedDay] = useState("All Days");
  const [selectedFormat, setSelectedFormat] = useState("Format 1");
  const [selectedWing, setSelectedWing] = useState("All Wings");
  const [selectedStaffType, setSelectedStaffType] = useState("None selected");
  const [selectedResource, setSelectedResource] = useState("All Resources");
  const [isOtherFormat, setIsOtherFormat] = useState(false);
  const [isAllDaysFreeBell, setIsAllDaysFreeBell] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("All Periods");
  const [fromDate, setFromDate] = useState("01-Sep-2026");
  const [toDate, setToDate] = useState("01-Sep-2026");

  const [selectedMasterOption, setSelectedMasterOption] = useState("Class List");
  const [selectedGlanceOption, setSelectedGlanceOption] = useState("Class Timetable");

  // Dynamic Data State
  const [reportData, setReportData] = useState([]);
  const [filtersData, setFiltersData] = useState({ classes: [], sections: [], teachers: [], wings: [], subjects: [] });
  
  // Pagination & Search
  const [currentPage, setCurrentPage] = useState(1);
  const [searchReportText, setSearchReportText] = useState("");
  const [timetableData, setTimetableData] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const totalPages = tabId === "subject_details" ? 3 : tabId === "master_requirement" ? 2 : 1;

  useEffect(() => {
    setShowReport(false);
    setCurrentPage(1);
    setSearchReportText("");
    setReportData([]);
    
    // Fetch filter options when tab changes
    const fetchFilters = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/timetable-reports/filters`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        if (res.ok) {
          const data = await res.json();
          setFiltersData(data);
        }
      } catch (err) {}
    };
    fetchFilters();
  }, [tabId]);

  const reportHeading = title || tabId.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  // Options
  const glanceOptions = ["Class Timetable", "Class Timetable ColorWise", "Teachers Timetable", "Teachers Timetable ColorWise", "Resource Timetable", "Resource Timetable ColorWise"];
  const masterRequirementOptions = ["Class List", "Subject List", "Teacher,Class,Subject,No. Of Periods", "Subject Taught ByTeacher", "Class Teachers Detail"];
  const staffTypesList = ["None selected", "Teaching", "Non-Teaching", "All Staff"];
  const resourcesList = ["All Resources", "Physics Lab", "Chemistry Lab", "Biology Lab", "Computer Lab 1", "Computer Lab 2", "Art Room", "Music Room", "Library", "Playground", "Auditorium"];
  
  const teachersList = ["All Teachers", "None selected", ...filtersData.teachers.map(t => t.name)];
  const formatsList = ["Format 1", "Format 2", "Format 3"];
  const daysList = ["All Days", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const wingsList = ["All Wings", ...filtersData.wings];
  
  // Derived Classes list for dropdowns
  const ALL_SECTION_CLASSES = filtersData.classes.flatMap(c => filtersData.sections.map(s => `${c}-${s}`));

  const handleShowClick = async () => {
    setLoading(true);
    setError('');
    const token = localStorage.getItem('token');
    const baseUrl = import.meta.env.VITE_API_BASE_URL || '';

    try {
      let endpoint = '';
      if (tabId === "particular_class_timetable_details" || tabId === "class_timetable_details") {
        let parts = selectedClass.split('-');
        let cl = parts[0] || selectedClass;
        let sec = parts[1] || '';
        endpoint = `/api/timetable-reports/class-timetable?class=${encodeURIComponent(cl)}&section=${encodeURIComponent(sec)}`;
      } else if (tabId === "master_requirement") {
        if (selectedMasterOption === "Class List") endpoint = `/api/timetable-reports/classes`;
        else if (selectedMasterOption === "Subject List") endpoint = `/api/timetable-reports/subjects`;
        else if (selectedMasterOption === "Teacher,Class,Subject,No. Of Periods") endpoint = `/api/timetable-reports/teacher-class-subject`;
        else if (selectedMasterOption === "Subject Taught ByTeacher") endpoint = `/api/timetable-reports/subject-taught`;
        else if (selectedMasterOption === "Class Teachers Detail") endpoint = `/api/timetable-reports/class-teachers`;
      } else if (tabId === "wing_wise_teacher_details") {
        endpoint = `/api/timetable-reports/wing-wise-teachers`;
      } else if (tabId === "subject_wise_teacher_details") {
        endpoint = `/api/timetable-reports/subject-wise-teachers`;
      } else if (tabId === "date_wise_substitution_details") {
        endpoint = `/api/timetable-reports/date-wise-substitution?from=${fromDate}&to=${toDate}`;
      } else if (tabId === "teachers_work_load_details") {
        endpoint = `/api/timetable-reports/teacher-workload`;
      } else if (tabId === "free_teachers_classwise" || tabId === "day_wise_free_teacher_details" || tabId === "week_wise_free_teacher_details") {
        endpoint = `/api/timetable-reports/free-teachers?period=${selectedPeriod !== 'All Periods' ? selectedPeriod : ''}`;
      } else if (tabId === "subject_details") {
         endpoint = `/api/timetable-reports/subjects`;
      } else if (tabId === "teacher_timetable_details") {
         endpoint = `/api/timetable-reports/teacher-timetable?teacherName=${encodeURIComponent(selectedTeacher)}`;
      } else if (tabId === "show_timetable_log") {
         endpoint = `/api/timetable-reports/timetable-logs`;
      } else if (tabId === "parallel_allocation_details") {
         endpoint = `/api/timetable-reports/parallel-allocations`;
      } else if (tabId === "consecutive_allocation_details") {
         endpoint = `/api/timetable-reports/consecutive-allocations`;
      } else if (tabId === "class_and_resource_details") {
         endpoint = `/api/timetable-reports/class-resource`;
      } else if (tabId === "unallocated_period_details") {
         endpoint = `/api/timetable-reports/unallocated-periods`;
      } else if (tabId === "resource_timetable_details") {
         endpoint = `/api/timetable-reports/resource-timetable?resourceName=${encodeURIComponent(selectedResource)}`;
      } else if (tabId === "class_wise_teacher_allocation_details") {
         endpoint = `/api/timetable-reports/class-wise-teacher-allocation`;
      } else if (tabId === "assignment_status") {
         endpoint = `/api/timetable-reports/assignment-status`;
      } else if (tabId === "subject_summary") {
         endpoint = `/api/timetable-reports/subject-summary`;
      } else if (tabId === "subject_wise_teacher_allocation_details") {
         endpoint = `/api/timetable-reports/subject-wise-teacher-allocation`;
      } else if (tabId === "show_timetable_at_glance") {
         endpoint = `/api/timetable-reports/timetable-at-glance`;
      } else if (tabId === "class_teacher_details") {
         endpoint = `/api/timetable-reports/class-teachers`;
      } else {
        // Fallback or missing report implementation
        endpoint = `/api/timetable-reports/classes`; 
      }

      const response = await fetch(`${baseUrl}${endpoint}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        
        if (tabId === "particular_class_timetable_details" || tabId === "class_timetable_details" || tabId === "teacher_timetable_details" || tabId === "resource_timetable_details") {
           const transformed = {};
           let slots = [];
           if (data.length > 0 && data[0].schedule) {
             const tData = data[0];
             const refDay = tData.schedule.reduce((prev, curr) => (curr.periods.length > prev.periods.length ? curr : prev), tData.schedule[0]);
             if (refDay && refDay.periods) {
               slots = refDay.periods.map(p => ({ period: p.periodName, time: `${p.startTime} - ${p.endTime}`, isBreak: p.isBreak }));
             }
             tData.schedule.forEach(daySchedule => {
               transformed[daySchedule.day] = {};
               daySchedule.periods.forEach(period => {
                 transformed[daySchedule.day][period.periodName] = {
                   subject: period.subject,
                   teacher: period.teacher ? `${period.teacher.firstName || ''} ${period.teacher.lastName || ''}`.trim() : '',
                   isBreak: period.isBreak
                 };
               });
             });
           }
           setTimetableData(transformed);
           setTimeSlots(slots);
        } else {
          setReportData(data);
        }
      } else {
        setError('Failed to fetch data.');
      }
    } catch (err) {
      setError('Network error.');
    } finally {
      setLoading(false);
      setShowReport(true);
      showToast(`Generated ${reportHeading} report`);
    }
  };

  const getBannerTitle = () => reportHeading.toUpperCase() + " As on " + new Date().toLocaleDateString('en-GB');

  // Pagination for Subjects (if used in Subject Details)
  const getPaginatedSubjects = () => {
    let list = reportData || [];
    if (searchReportText.trim()) {
      list = list.filter((s) => s.name?.toLowerCase().includes(searchReportText.toLowerCase()) || s.shortName?.toLowerCase().includes(searchReportText.toLowerCase()));
    }
    if (currentPage === 1) return list.slice(0, 16);
    if (currentPage === 2) return list.slice(16, 31);
    return list.slice(31);
  };
  const currentSubjects = getPaginatedSubjects();

  return (
    <div className="bg-white border border-gray-300 rounded-b rounded-tr p-6 shadow-xs space-y-6 select-none relative">
      <div className="flex flex-col gap-6">
        
        {/* Render Filters dynamically based on tabId */}
        <div className="flex flex-wrap items-center gap-4 bg-gray-50/50 p-4 border border-gray-200 rounded">
           {/* Date From/To for Substitution */}
           {tabId === "date_wise_substitution_details" && (
             <>
               <div className="flex flex-col gap-1">
                 <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wide">From Date</span>
                 <input type="date" value={fromDate} onChange={e=>setFromDate(e.target.value)} className="w-36 text-xs border rounded px-3 py-1.5" />
               </div>
               <div className="flex flex-col gap-1">
                 <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wide">To Date</span>
                 <input type="date" value={toDate} onChange={e=>setToDate(e.target.value)} className="w-36 text-xs border rounded px-3 py-1.5" />
               </div>
             </>
           )}
           
           {/* Common dropdowns */}
           {(tabId === "class_timetable_details" || tabId === "particular_class_timetable_details") && (
             <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wide">Class & Section</span>
                <select value={selectedClass} onChange={e=>setSelectedClass(e.target.value)} className="w-40 text-xs border rounded px-3 py-1.5">
                   <option value="Select Class">Select Class</option>
                   {ALL_SECTION_CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
             </div>
           )}

           {tabId === "teacher_timetable_details" && (
             <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wide">Teacher</span>
                <select value={selectedTeacher} onChange={e=>setSelectedTeacher(e.target.value)} className="w-40 text-xs border rounded px-3 py-1.5">
                   {teachersList.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
             </div>
           )}
           
           {/* Master requirement radio buttons */}
           {tabId === "master_requirement" && (
             <div className="flex items-center gap-4 flex-wrap w-full border-b pb-4 mb-2 border-gray-200">
               {masterRequirementOptions.map(opt => (
                 <label key={opt} className="flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-gray-700">
                   <input type="radio" name="masterOpt" value={opt} checked={selectedMasterOption === opt} onChange={()=>setSelectedMasterOption(opt)} className="accent-blue-500 w-3.5 h-3.5" />
                   {opt}
                 </label>
               ))}
             </div>
           )}

           {/* Generic Show Button */}
           <div className="mt-auto pb-[2px]">
             <button onClick={handleShowClick} disabled={loading} className="bg-[#23a8e0] hover:bg-[#0288d1] text-white px-5 py-1.5 rounded text-xs font-semibold shadow-2xs transition flex items-center gap-2">
               {loading ? 'Loading...' : 'Show'}
             </button>
           </div>
        </div>

        {/* Report Results */}
        {showReport && (
          <div className="bg-white border-2 border-gray-800 rounded-lg overflow-hidden flex flex-col min-h-[500px]">
            <div className="bg-blue-900 text-white font-bold text-lg text-center py-2 px-4 shadow-sm select-none">
              {getBannerTitle()}
            </div>
            
            <div className="p-4 overflow-auto flex-1 bg-[#fcfdfe]">
               {/* 1. Timetable Grids */}
               {(tabId === "class_timetable_details" || tabId === "particular_class_timetable_details" || tabId === "teacher_timetable_details" || tabId === "resource_timetable_details") && timetableData && timeSlots.length > 0 && (
                 <table className="w-full border-collapse border border-gray-300 text-xs text-center">
                   <thead>
                     <tr className="bg-gray-100">
                       <th className="border border-gray-300 py-2 px-1">Day</th>
                       {timeSlots.map(ts => (
                         <th key={ts.period} className="border border-gray-300 p-1">
                           <div className="font-bold">{ts.period}</div>
                           <div className="text-[9px] text-gray-500">{ts.time}</div>
                         </th>
                       ))}
                     </tr>
                   </thead>
                   <tbody>
                     {daysList.filter(d=>d!=='All Days').map(day => (
                       <tr key={day}>
                         <td className="border border-gray-300 font-bold bg-gray-50">{day.substring(0,3)}</td>
                         {timeSlots.map(ts => {
                            const p = timetableData[day] ? timetableData[day][ts.period] : null;
                            if (ts.isBreak) return <td key={ts.period} className="border border-gray-300 bg-orange-50 font-bold text-orange-600">RECESS</td>;
                            return (
                              <td key={ts.period} className="border border-gray-300 p-1">
                                {p ? (
                                  <>
                                    <div className="font-semibold">{p.subject}</div>
                                    <div className="text-gray-500 text-[10px]">{p.teacher}</div>
                                  </>
                                ) : '-'}
                              </td>
                            );
                         })}
                       </tr>
                     ))}
                   </tbody>
                 </table>
               )}

               {/* 2. Generic Table for all other reports */}
               {!(tabId === "class_timetable_details" || tabId === "particular_class_timetable_details" || tabId === "teacher_timetable_details" || tabId === "resource_timetable_details") && reportData.length > 0 && (
                 <table className="w-full border-collapse text-xs text-left">
                   <thead className="bg-gray-100 border-b-2 border-gray-300">
                     <tr>
                        {Object.keys(reportData[0]).filter(k => k !== '_id').map(key => (
                          <th key={key} className="p-2 border-r border-gray-200 uppercase">{key.replace(/([A-Z])/g, ' $1').trim()}</th>
                        ))}
                     </tr>
                   </thead>
                   <tbody>
                      {reportData.map((row, i) => (
                        <tr key={i} className="border-b border-gray-200 hover:bg-gray-50">
                          {Object.keys(row).filter(k => k !== '_id').map(key => (
                            <td key={key} className="p-2 border-r border-gray-200">{row[key]}</td>
                          ))}
                        </tr>
                      ))}
                   </tbody>
                 </table>
               )}

               {!(tabId === "class_timetable_details" || tabId === "particular_class_timetable_details" || tabId === "teacher_timetable_details" || tabId === "resource_timetable_details") && reportData.length === 0 && !loading && (
                 <div className="text-center p-10 text-gray-500">No data available for the selected criteria.</div>
               )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



