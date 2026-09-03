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
    minorSubjects: 0
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

  const classOptions = [
    "Select Class",
    "NUR-A", "NUR-B", "LKG-A", "LKG-B", "UKG-A", "UKG-B", "UKG-C",
    "1-A", "1-B", "1-C", "2-A", "2-B", "2-C", "3-A", "3-B", "3-C",
    "4-A", "4-B", "4-C", "5-A", "5-B", "5-C", "6-A", "6-B", "6-C",
    "7-A", "7-B", "7-C", "8-A", "8-B", "8-C", "9-A", "9-B", "9-C", "9-D",
    "10-A", "10-B", "10-C", "10-D", "10-E", "11-A", "11-B", "11-C", "11-D",
    "12-A", "12-B", "12-C", "12-D"
  ];

  const wingData = [
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
              <span className="font-bold text-gray-900 text-sm">4</span>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-700">
              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z" />
                </svg>
                <span className="font-medium text-gray-600">Total Classes</span>
              </div>
              <span className="font-bold text-gray-900 text-sm">51</span>
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
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-2xs bg-[#ff6b6b] inline-block"></span>
                <span>Kindergarten</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-2xs bg-[#00a2db] inline-block"></span>
                <span>Primary</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-2xs bg-[#ff7675] inline-block"></span>
                <span>Middle</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-2xs bg-[#00a2db] inline-block"></span>
                <span>Higher</span>
              </div>
            </div>
          </div>

          {/* Exact Bigger & Centered Pixel-Perfect SVG Donut Chart with Leader Lines and Smooth Spin-in Animation */}
          <div className="w-full flex-1 flex justify-center items-center py-2">
            <svg viewBox="0 0 380 270" className="w-full max-w-[380px] h-[255px] select-none overflow-visible">
              {/* Rotating Donut Ring Group */}
              <g className="animate-donut-spin">
                {/* 1. Kindergarten (Coral 33%) 0° to 118.8° */}
                <path
                  d={(() => {
                    const toRad = (d) => ((d - 90) * Math.PI) / 180;
                    const s = toRad(0);
                    const e = toRad(118.8);
                    const x1 = 190 + 92 * Math.cos(s);
                    const y1 = 135 + 92 * Math.sin(s);
                    const x2 = 190 + 92 * Math.cos(e);
                    const y2 = 135 + 92 * Math.sin(e);
                    const x3 = 190 + 52 * Math.cos(e);
                    const y3 = 135 + 52 * Math.sin(e);
                    const x4 = 190 + 52 * Math.cos(s);
                    const y4 = 135 + 52 * Math.sin(s);
                    return `M ${x1} ${y1} A 92 92 0 0 1 ${x2} ${y2} L ${x3} ${y3} A 52 52 0 0 0 ${x4} ${y4} Z`;
                  })()}
                  fill="#ff6b6b"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                />

                {/* 2. Primary (Bottom Blue 30%) 118.8° to 226.8° */}
                <path
                  d={(() => {
                    const toRad = (d) => ((d - 90) * Math.PI) / 180;
                    const s = toRad(118.8);
                    const e = toRad(226.8);
                    const x1 = 190 + 92 * Math.cos(s);
                    const y1 = 135 + 92 * Math.sin(s);
                    const x2 = 190 + 92 * Math.cos(e);
                    const y2 = 135 + 92 * Math.sin(e);
                    const x3 = 190 + 52 * Math.cos(e);
                    const y3 = 135 + 52 * Math.sin(e);
                    const x4 = 190 + 52 * Math.cos(s);
                    const y4 = 135 + 52 * Math.sin(s);
                    return `M ${x1} ${y1} A 92 92 0 0 1 ${x2} ${y2} L ${x3} ${y3} A 52 52 0 0 0 ${x4} ${y4} Z`;
                  })()}
                  fill="#00a2db"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                />

                {/* 3. Middle (Coral 7%) 226.8° to 252° */}
                <path
                  d={(() => {
                    const toRad = (d) => ((d - 90) * Math.PI) / 180;
                    const s = toRad(226.8);
                    const e = toRad(252);
                    const x1 = 190 + 92 * Math.cos(s);
                    const y1 = 135 + 92 * Math.sin(s);
                    const x2 = 190 + 92 * Math.cos(e);
                    const y2 = 135 + 92 * Math.sin(e);
                    const x3 = 190 + 52 * Math.cos(e);
                    const y3 = 135 + 52 * Math.sin(e);
                    const x4 = 190 + 52 * Math.cos(s);
                    const y4 = 135 + 52 * Math.sin(s);
                    return `M ${x1} ${y1} A 92 92 0 0 1 ${x2} ${y2} L ${x3} ${y3} A 52 52 0 0 0 ${x4} ${y4} Z`;
                  })()}
                  fill="#ff7675"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                />

                {/* 4. Higher (Top-Left Blue 30%) 252° to 360° */}
                <path
                  d={(() => {
                    const toRad = (d) => ((d - 90) * Math.PI) / 180;
                    const s = toRad(252);
                    const e = toRad(360);
                    const x1 = 190 + 92 * Math.cos(s);
                    const y1 = 135 + 92 * Math.sin(s);
                    const x2 = 190 + 92 * Math.cos(e);
                    const y2 = 135 + 92 * Math.sin(e);
                    const x3 = 190 + 52 * Math.cos(e);
                    const y3 = 135 + 52 * Math.sin(e);
                    const x4 = 190 + 52 * Math.cos(s);
                    const y4 = 135 + 52 * Math.sin(s);
                    return `M ${x1} ${y1} A 92 92 0 0 1 ${x2} ${y2} L ${x3} ${y3} A 52 52 0 0 0 ${x4} ${y4} Z`;
                  })()}
                  fill="#00a2db"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                />
              </g>

              {/* Center White Hole & 81 Counter with Pop-in Animation */}
              <g className="animate-center-pop">
                <circle cx="190" cy="135" r="51" fill="#ffffff" />
                <text
                  x="190"
                  y="157"
                  textAnchor="middle"
                  fill="#000000"
                  style={{ fontSize: "64px", fontWeight: "900", fontFamily: "sans-serif" }}
                >
                  81
                </text>
              </g>

              {/* Leader Lines and Percentages with Fade-in Animation */}
              <g className="animate-leader-lines">
                {/* Leader Line 1: Kindergarten (33%) */}
                <line x1="272" y1="102" x2="298" y2="90" stroke="#ff7675" strokeWidth="0.9" />
                <text x="303" y="94" fill="#000000" fontSize="14" fontWeight="600" fontFamily="sans-serif">
                  33%
                </text>

                {/* Leader Line 2: Primary (30%) */}
                <line x1="198" y1="228" x2="198" y2="246" stroke="#00a2db" strokeWidth="0.9" />
                <text x="198" y="262" textAnchor="middle" fill="#000000" fontSize="14" fontWeight="600" fontFamily="sans-serif">
                  30%
                </text>

                {/* Leader Line 3: Middle (7%) */}
                <line x1="110" y1="193" x2="90" y2="205" stroke="#ff7675" strokeWidth="0.9" />
                <text x="84" y="209" textAnchor="end" fill="#000000" fontSize="14" fontWeight="600" fontFamily="sans-serif">
                  7%
                </text>

                {/* Leader Line 4: Higher (30%) */}
                <line x1="112" y1="82" x2="92" y2="68" stroke="#00a2db" strokeWidth="0.9" />
                <text x="86" y="72" textAnchor="end" fill="#000000" fontSize="14" fontWeight="600" fontFamily="sans-serif">
                  30%
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
              onClick={() => showToast("Timetable Global Settings Updated Successfully!")}
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
  const initialTeachers = [
    { sno: 1, name: "AJEET SINGH", gender: "Male", shortName: "A SINGH", periods: "48", checked: false },
    { sno: 2, name: "AKANKSHA PANDEY", gender: "Female", shortName: "A PANDEY", periods: "48", checked: false },
    { sno: 3, name: "AKHILESH MISHRA", gender: "Male", shortName: "", periods: "48", checked: false },
    { sno: 4, name: "ALFIYA BANO", gender: "Female", shortName: "", periods: "48", checked: false },
    { sno: 5, name: "AMIT DUBEY", gender: "Male", shortName: "A DUBEY", periods: "48", checked: false },
    { sno: 6, name: "ANKIT KUMAR", gender: "Male", shortName: "A KUMAR", periods: "48", checked: false },
    { sno: 7, name: "ANSHIKA", gender: "Female", shortName: "", periods: "48", checked: false },
    { sno: 8, name: "ARCHANA YADAV", gender: "Female", shortName: "", periods: "48", checked: false },
    { sno: 9, name: "ARPANA UPADHYAY", gender: "Female", shortName: "A UPADHYAY", periods: "48", checked: false },
    { sno: 10, name: "ASHISH KUMAR", gender: "Male", shortName: "A KUMAR", periods: "48", checked: false },
    { sno: 11, name: "AVANEESH KUMAR RAI", gender: "Male", shortName: "A K RAI", periods: "48", checked: false },
    { sno: 12, name: "DEEPA GUPTA", gender: "Female", shortName: "", periods: "48", checked: false },
    { sno: 13, name: "GOLENDRA SINGH", gender: "Male", shortName: "G SINGH", periods: "48", checked: false },
    { sno: 14, name: "KIRAN YADAV", gender: "Female", shortName: "K YADAV", periods: "48", checked: false },
    { sno: 15, name: "MOHAMMAD MOZAHID", gender: "Male", shortName: "", periods: "48", checked: false },
    { sno: 16, name: "MUKESH KUMAR", gender: "Male", shortName: "M KUMAR", periods: "48", checked: false },
    { sno: 17, name: "NEELAM SINGH", gender: "Female", shortName: "N SINGH", periods: "48", checked: false },
    { sno: 18, name: "NITESH TIWARI", gender: "Male", shortName: "N TIWARI", periods: "48", checked: false },
    { sno: 19, name: "POOJA SHARMA", gender: "Female", shortName: "P SHARMA", periods: "48", checked: false },
    { sno: 20, name: "PRADEEP KUMAR", gender: "Male", shortName: "P KUMAR", periods: "48", checked: false },
    { sno: 21, name: "PRIYA TRIPATHI", gender: "Female", shortName: "P TRIPATHI", periods: "48", checked: false },
    { sno: 22, name: "RAJESH KUMAR", gender: "Male", shortName: "R KUMAR", periods: "48", checked: false },
    { sno: 23, name: "RAMESH CHANDRA", gender: "Male", shortName: "R CHANDRA", periods: "48", checked: false },
    { sno: 24, name: "RINKU VERMA", gender: "Female", shortName: "R VERMA", periods: "48", checked: false },
    { sno: 25, name: "SANJAY GUPTA", gender: "Male", shortName: "S GUPTA", periods: "48", checked: false },
    { sno: 26, name: "SATYAM SINGH", gender: "Male", shortName: "", periods: "48", checked: false },
    { sno: 27, name: "SEEMA GIRI", gender: "Female", shortName: "S GIRI", periods: "48", checked: false },
    { sno: 28, name: "SHAMA PARVEEN", gender: "Female", shortName: "S PARVEEN", periods: "48", checked: false },
    { sno: 29, name: "SHIKHA OJHA", gender: "Female", shortName: "", periods: "48", checked: false },
    { sno: 30, name: "SIMRAN GUPTA", gender: "Female", shortName: "", periods: "48", checked: false },
    { sno: 31, name: "SONIYA SINGH", gender: "Female", shortName: "S SINGH", periods: "48", checked: false },
    { sno: 32, name: "SUNITA", gender: "Female", shortName: "", periods: "48", checked: false },
    { sno: 33, name: "SUSHIL KUMAR YADAV", gender: "Male", shortName: "S K YADAV", periods: "48", checked: false },
    { sno: 34, name: "VASIM AHMAD", gender: "Male", shortName: "V AHMAD", periods: "48", checked: false },
    { sno: 35, name: "VISHAKHA THAMI", gender: "Female", shortName: "", periods: "48", checked: false },
    { sno: 36, name: "VISHAL SONAR", gender: "Male", shortName: "", periods: "48", checked: false },
    { sno: 37, name: "VIVEKANAND TIWARI", gender: "Male", shortName: "V TIWARI", periods: "48", checked: false },
    { sno: 38, name: "WASEEM FIROJ", gender: "Male", shortName: "W FIROJ", periods: "48", checked: false },
  ];

  const [teacherList, setTeacherList] = useState(initialTeachers);
  const [selectedRow, setSelectedRow] = useState(null);

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
          onClick={() => showToast("Teacher Settings Updated Successfully!")}
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
  const initialClassRows = [
    { sno: 1, class: "NUR", section: "A", wing: "Kindergarten" },
    { sno: 2, class: "NUR", section: "B", wing: "Kindergarten" },
    { sno: 3, class: "LKG", section: "A", wing: "Kindergarten" },
    { sno: 4, class: "LKG", section: "B", wing: "Kindergarten" },
    { sno: 5, class: "UKG", section: "A", wing: "Kindergarten" },
    { sno: 6, class: "UKG", section: "B", wing: "Kindergarten" },
    { sno: 7, class: "UKG", section: "C", wing: "Kindergarten" },
    { sno: 8, class: "1", section: "A", wing: "Kindergarten" },
    { sno: 9, class: "1", section: "B", wing: "Kindergarten" },
    { sno: 10, class: "1", section: "C", wing: "Kindergarten" },
    { sno: 11, class: "2", section: "A", wing: "Kindergarten" },
    { sno: 12, class: "2", section: "B", wing: "Kindergarten" },
    { sno: 13, class: "2", section: "C", wing: "Kindergarten" },
    { sno: 14, class: "3", section: "A", wing: "Primary" },
    { sno: 15, class: "3", section: "B", wing: "Primary" },
    { sno: 16, class: "3", section: "C", wing: "Primary" },
    { sno: 17, class: "4", section: "A", wing: "Primary" },
    { sno: 18, class: "4", section: "B", wing: "Primary" },
    { sno: 19, class: "4", section: "C", wing: "Primary" },
    { sno: 20, class: "5", section: "A", wing: "Primary" },
    { sno: 21, class: "5", section: "B", wing: "Primary" },
    { sno: 22, class: "5", section: "C", wing: "Primary" },
    { sno: 23, class: "6", section: "A", wing: "Middle" },
    { sno: 24, class: "6", section: "B", wing: "Middle" },
    { sno: 25, class: "6", section: "C", wing: "Middle" },
    { sno: 26, class: "7", section: "A", wing: "Middle" },
    { sno: 27, class: "7", section: "B", wing: "Middle" },
    { sno: 28, class: "7", section: "C", wing: "Middle" },
    { sno: 29, class: "8", section: "A", wing: "Middle" },
    { sno: 30, class: "8", section: "B", wing: "Middle" },
    { sno: 31, class: "8", section: "C", wing: "Middle" },
    { sno: 32, class: "9", section: "A", wing: "Higher" },
    { sno: 33, class: "9", section: "B", wing: "Higher" },
    { sno: 34, class: "9", section: "C", wing: "Higher" },
    { sno: 35, class: "9", section: "D", wing: "Higher" },
    { sno: 36, class: "10", section: "A", wing: "Higher" },
    { sno: 37, class: "10", section: "B", wing: "Higher" },
    { sno: 38, class: "10", section: "C", wing: "Higher" },
    { sno: 39, class: "10", section: "D", wing: "Higher" },
    { sno: 40, class: "10", section: "E", wing: "Higher" },
    { sno: 41, class: "10", section: "D", wing: "Kindergarten" },
    { sno: 42, class: "11", section: "A", wing: "Higher" },
    { sno: 43, class: "11", section: "B", wing: "Higher" },
    { sno: 44, class: "11", section: "C", wing: "Higher" },
    { sno: 45, class: "11", section: "D", wing: "Higher" },
    { sno: 46, class: "11", section: "E", wing: "Higher" },
    { sno: 47, class: "11", section: "F", wing: "Higher" },
    { sno: 48, class: "12", section: "A", wing: "Higher" },
    { sno: 49, class: "12", section: "B", wing: "Higher" },
    { sno: 50, class: "12", section: "C", wing: "Higher" },
    { sno: 51, class: "12", section: "D", wing: "Higher" },
  ].map((c) => ({
    ...c,
    workingDays: "",
    periodsPerDay: "",
    recess1: "",
    recess2: "",
  }));

  const [classList, setClassList] = useState(initialClassRows);
  const [selectedClassRow, setSelectedClassRow] = useState(null);

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
          onClick={() => showToast("Class Settings Updated Successfully!")}
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
  const [subjects, setSubjects] = useState(all102Subjects);
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
      sno: subjects.length + 1,
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
  const handleSaveSubject = () => {
    if (!editingSubject.name.trim()) {
      showToast("Subject Name is required");
      return;
    }
    setSubjects((prev) => {
      const exists = prev.find((s) => s.sno === editingSubject.sno);
      if (exists) {
        return prev.map((s) => (s.sno === editingSubject.sno ? editingSubject : s));
      }
      return [...prev, editingSubject];
    });
    setIsEditModalOpen(false);
    showToast("Subject Saved Successfully!");
  };

  // Delete Action
  const handleDeleteSubject = (sno) => {
    setSubjects((prev) => prev.filter((s) => s.sno !== sno));
    showToast("Subject Removed Successfully");
  };

  // Toggle Library Period
  const handleToggleLibrary = (sno) => {
    setSubjects((prev) =>
      prev.map((s) => (s.sno === sno ? { ...s, library: !s.library } : s))
    );
    showToast("Library Period setting updated");
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
                      onClick={() => handleToggleLibrary(sub.sno)}
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
                        onClick={() => handleDeleteSubject(sub.sno)}
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
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [assignedSubjects, setAssignedSubjects] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const mockSubjectList = [
    { sno: 1, name: "ENGLISH CORE", periods: "6", order: "1", selected: false },
    { sno: 2, name: "HINDI CORE", periods: "6", order: "2", selected: false },
    { sno: 3, name: "MATHEMATICS", periods: "8", order: "3", selected: false },
    { sno: 4, name: "PHYSICS", periods: "7", order: "4", selected: false },
    { sno: 5, name: "CHEMISTRY", periods: "7", order: "5", selected: false },
    { sno: 6, name: "BIOLOGY / CS", periods: "7", order: "6", selected: false },
    { sno: 7, name: "PHYSICAL EDUCATION", periods: "4", order: "7", selected: false },
    { sno: 8, name: "GENERAL KNOWLEDGE", periods: "2", order: "8", selected: false },
    { sno: 9, name: "ART / CRAFT", periods: "1", order: "9", selected: false },
  ];

  const handleGo = () => {
    if (!selectedClass) {
      showToast("Please select a Class first");
      return;
    }
    setAssignedSubjects(mockSubjectList);
    showToast(`Loaded subjects for ${selectedClass} - ${selectedSection || "All Sections"}`);
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
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full text-xs border border-gray-300 rounded px-3 py-2 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs"
          >
            <option value="">Select Class</option>
            {["NUR", "LKG", "UKG", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].map((c) => (
              <option key={c} value={c}>Class {c}</option>
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
            {["A", "B", "C", "D", "E", "F"].map((s) => (
              <option key={s} value={s}>Section {s}</option>
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
          onClick={() => showToast("Assigned Subjects Saved Successfully!")}
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
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [isUnassignModalOpen, setIsUnassignModalOpen] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState("timetable"); // 'timetable' or 'marks'
  const [selectedClasses, setSelectedClasses] = useState({});
  const [allotmentRows, setAllotmentRows] = useState([]);

  const classList = [
    "NUR-A", "NUR-B", "LKG-A", "LKG-B", "UKG-A", "UKG-B", "UKG-C",
    "1-A", "1-B", "1-C", "2-A", "2-B", "2-C", "3-A", "3-B", "3-C",
    "4-A", "4-B", "4-C", "5-A", "5-B", "5-C", "6-A", "6-B", "6-C",
    "7-A", "7-B", "7-C", "8-A", "8-B", "8-C", "9-A", "9-B", "9-C", "9-D",
    "10-A", "10-B", "10-C", "10-D", "10-E", "11-A", "11-B", "11-C", "11-D",
    "12-A", "12-B", "12-C", "12-D"
  ];

  const handleClassCheck = (cls) => {
    setSelectedClasses((prev) => ({ ...prev, [cls]: !prev[cls] }));
  };

  const handleShowSubjects = () => {
    const checked = Object.keys(selectedClasses).filter((k) => selectedClasses[k]);
    if (checked.length === 0) {
      showToast("Please select at least one Class");
      return;
    }
    const sampleAllotments = checked.flatMap((cls) => [
      { id: `${cls}-ENG`, className: cls, subject: "ENGLISH CORE", periods: "6", teacher: selectedTeacher || "ANKIT KUMAR", selected: false },
      { id: `${cls}-MATH`, className: cls, subject: "MATHEMATICS", periods: "8", teacher: selectedTeacher || "AKHILESH MISHRA", selected: false },
      { id: `${cls}-SCI`, className: cls, subject: "SCIENCE (INTEGRATED)", periods: "7", teacher: selectedTeacher || "AMIT DUBEY", selected: false },
    ]);
    setAllotmentRows(sampleAllotments);
    showToast(`Loaded ${sampleAllotments.length} subject entries`);
  };

  const [modalRecords, setModalRecords] = useState([
    { id: 1, className: "10-A", subject: "MATHEMATICS", periods: "8", teacher: "AKHILESH MISHRA", selected: false },
    { id: 2, className: "10-B", subject: "MATHEMATICS", periods: "8", teacher: "AKHILESH MISHRA", selected: false },
    { id: 3, className: "9-A", subject: "SCIENCE (INTEGRATED)", periods: "7", teacher: "AMIT DUBEY", selected: false },
    { id: 4, className: "12-A", subject: "PHYSICS", periods: "7", teacher: "ANKIT KUMAR", selected: false },
    { id: 5, className: "12-B", subject: "CHEMISTRY", periods: "7", teacher: "ASHISH KUMAR", selected: false },
  ]);

  const handleDeleteAssignedRecords = () => {
    const remaining = modalRecords.filter((r) => !r.selected);
    const count = modalRecords.length - remaining.length;
    if (count === 0) {
      showToast("Select at least one record to unassign");
      return;
    }
    setModalRecords(remaining);
    showToast(`${count} Teacher assignment(s) removed successfully!`);
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
                <option value="AKHILESH MISHRA">AKHILESH MISHRA</option>
                <option value="AMIT DUBEY">AMIT DUBEY</option>
                <option value="ANKIT KUMAR">ANKIT KUMAR</option>
                <option value="ASHISH KUMAR">ASHISH KUMAR</option>
                <option value="AVANEESH KUMAR RAI">AVANEESH KUMAR RAI</option>
                <option value="DEEPA GUPTA">DEEPA GUPTA</option>
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
                  {classList.map((cls) => (
                    <tr key={cls} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-2 px-3 text-center">
                        <input
                          type="checkbox"
                          checked={!!selectedClasses[cls]}
                          onChange={() => handleClassCheck(cls)}
                          className="w-3.5 h-3.5 border-gray-300 rounded text-blue-600 focus:ring-0 cursor-pointer"
                        />
                      </td>
                      <td className="py-2 px-3 font-semibold text-gray-800">{cls}</td>
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
              onClick={() => setIsUnassignModalOpen(true)}
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
                onClick={() => showToast("Period & Teacher Allotment Saved Successfully!")}
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
  const [resources, setResources] = useState([]); // Blank by default matching screenshot!

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

  const handleSaveResource = () => {
    if (!editingResource.name.trim()) {
      showToast("Resource Name cannot be blank");
      return;
    }
    if (editingResource.sno) {
      setResources((prev) =>
        prev.map((r) => (r.sno === editingResource.sno ? editingResource : r))
      );
      showToast("Resource Updated Successfully!");
    } else {
      setResources((prev) => [
        ...prev,
        { sno: prev.length + 1, name: editingResource.name.trim() }
      ]);
      showToast("New Resource Added Successfully!");
    }
    setIsAddModalOpen(false);
  };

  const handleDeleteResource = (sno) => {
    setResources((prev) => prev.filter((r) => r.sno !== sno));
    showToast("Resource Deleted Successfully!");
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
                        onClick={() => handleDeleteResource(res.sno)}
                        className="text-red-500 hover:text-red-700 p-1 cursor-pointer transition"
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
  const [selectedResource, setSelectedResource] = useState("");
  const [selectedClass, setSelectedClass] = useState("None selected");
  const [subjectRows, setSubjectRows] = useState([]); // Default empty matching screenshot 1!

  const handleShowSubjects = () => {
    if (!selectedResource) {
      showToast("Please select a resource");
      return;
    }
    showToast("Loaded subjects for selected resource");
  };

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
            <option value="Physics Lab">Physics Lab</option>
            <option value="Chemistry Lab">Chemistry Lab</option>
            <option value="Computer Lab">Computer Lab</option>
            <option value="Library">Library</option>
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
              <option value="NUR">NUR</option>
              <option value="LKG">LKG</option>
              <option value="UKG">UKG</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
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

      {/* Table (Blank / No data available in table) */}
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
              subjectRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50/80">
                  <td className="py-2.5 px-3 text-center">
                    <input type="checkbox" className="w-3.5 h-3.5 text-blue-600 rounded" />
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
          onClick={() => showToast("Resource Relate Settings Saved!")}
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

  const full51Classes = [
    { sno: 1, class: "NUR-A", wing: "Kindergarten", classTeacher: "", assistantTeacher: "" },
    { sno: 2, class: "NUR-B", wing: "Kindergarten", classTeacher: "", assistantTeacher: "" },
    { sno: 3, class: "LKG-A", wing: "Kindergarten", classTeacher: "", assistantTeacher: "" },
    { sno: 4, class: "LKG-B", wing: "Kindergarten", classTeacher: "", assistantTeacher: "" },
    { sno: 5, class: "UKG-A", wing: "Kindergarten", classTeacher: "", assistantTeacher: "" },
    { sno: 6, class: "UKG-B", wing: "Kindergarten", classTeacher: "", assistantTeacher: "" },
    { sno: 7, class: "UKG-C", wing: "Kindergarten", classTeacher: "", assistantTeacher: "" },
    { sno: 8, class: "1-A", wing: "Kindergarten", classTeacher: "", assistantTeacher: "" },
    { sno: 9, class: "1-B", wing: "Kindergarten", classTeacher: "", assistantTeacher: "" },
    { sno: 10, class: "1-C", wing: "Kindergarten", classTeacher: "", assistantTeacher: "" },
    { sno: 11, class: "2-A", wing: "Kindergarten", classTeacher: "", assistantTeacher: "" },
    { sno: 12, class: "2-B", wing: "Kindergarten", classTeacher: "", assistantTeacher: "" },
    { sno: 13, class: "2-C", wing: "Kindergarten", classTeacher: "", assistantTeacher: "" },
    { sno: 14, class: "3-A", wing: "Primary", classTeacher: "", assistantTeacher: "" },
    { sno: 15, class: "3-B", wing: "Primary", classTeacher: "", assistantTeacher: "" },
    { sno: 16, class: "3-C", wing: "Primary", classTeacher: "", assistantTeacher: "" },
    { sno: 17, class: "4-A", wing: "Primary", classTeacher: "", assistantTeacher: "" },
    { sno: 18, class: "4-B", wing: "Primary", classTeacher: "", assistantTeacher: "" },
    { sno: 19, class: "4-C", wing: "Primary", classTeacher: "", assistantTeacher: "" },
    { sno: 20, class: "5-A", wing: "Primary", classTeacher: "", assistantTeacher: "" },
    { sno: 21, class: "5-B", wing: "Primary", classTeacher: "", assistantTeacher: "" },
    { sno: 22, class: "5-C", wing: "Primary", classTeacher: "", assistantTeacher: "" },
    { sno: 23, class: "6-A", wing: "Middle", classTeacher: "", assistantTeacher: "" },
    { sno: 24, class: "6-B", wing: "Middle", classTeacher: "", assistantTeacher: "" },
    { sno: 25, class: "6-C", wing: "Middle", classTeacher: "", assistantTeacher: "" },
    { sno: 26, class: "7-A", wing: "Middle", classTeacher: "", assistantTeacher: "" },
    { sno: 27, class: "7-B", wing: "Middle", classTeacher: "", assistantTeacher: "" },
    { sno: 28, class: "7-C", wing: "Middle", classTeacher: "", assistantTeacher: "" },
    { sno: 29, class: "8-A", wing: "Middle", classTeacher: "", assistantTeacher: "" },
    { sno: 30, class: "8-B", wing: "Middle", classTeacher: "", assistantTeacher: "" },
    { sno: 31, class: "8-C", wing: "Middle", classTeacher: "", assistantTeacher: "" },
    { sno: 32, class: "9-A", wing: "Higher", classTeacher: "", assistantTeacher: "" },
    { sno: 33, class: "9-B", wing: "Higher", classTeacher: "", assistantTeacher: "" },
    { sno: 34, class: "9-C", wing: "Higher", classTeacher: "", assistantTeacher: "" },
    { sno: 35, class: "9-D", wing: "Higher", classTeacher: "", assistantTeacher: "" },
    { sno: 36, class: "10-A", wing: "Higher", classTeacher: "", assistantTeacher: "" },
    { sno: 37, class: "10-B", wing: "Higher", classTeacher: "", assistantTeacher: "" },
    { sno: 38, class: "10-C", wing: "Higher", classTeacher: "", assistantTeacher: "" },
    { sno: 39, class: "10-D", wing: "Higher", classTeacher: "", assistantTeacher: "" },
    { sno: 40, class: "10-E", wing: "Higher", classTeacher: "", assistantTeacher: "" },
    { sno: 41, class: "10-D", wing: "Kindergarten", classTeacher: "", assistantTeacher: "" },
    { sno: 42, class: "11-A", wing: "Higher", classTeacher: "", assistantTeacher: "" },
    { sno: 43, class: "11-B", wing: "Higher", classTeacher: "", assistantTeacher: "" },
    { sno: 44, class: "11-C", wing: "Higher", classTeacher: "", assistantTeacher: "" },
    { sno: 45, class: "11-D", wing: "Higher", classTeacher: "", assistantTeacher: "" },
    { sno: 46, class: "11-E", wing: "Higher", classTeacher: "", assistantTeacher: "" },
    { sno: 47, class: "11-F", wing: "Higher", classTeacher: "", assistantTeacher: "" },
    { sno: 48, class: "12-A", wing: "Higher", classTeacher: "", assistantTeacher: "" },
    { sno: 49, class: "12-B", wing: "Higher", classTeacher: "", assistantTeacher: "" },
    { sno: 50, class: "12-C", wing: "Higher", classTeacher: "", assistantTeacher: "" },
    { sno: 51, class: "12-D", wing: "Higher", classTeacher: "", assistantTeacher: "" },
  ];

  const [classTeachers, setClassTeachers] = useState(full51Classes);

  const teacherNames = [
    "Select Teacher", "AJEET SINGH", "AKANKSHA PANDEY", "AKHILESH MISHRA", "ALFIYA BANO",
    "AMIT DUBEY", "ANKIT KUMAR", "ANSHIKA", "ARCHANA YADAV", "ARPANA UPADHYAY",
    "ASHISH KUMAR", "AVANEESH KUMAR RAI", "DEEPA GUPTA", "GOLENDRA SINGH", "KIRAN YADAV",
    "MOHAMMAD MOZAHID", "MUKESH KUMAR", "NEELAM SINGH", "NITESH TIWARI", "POOJA SHARMA",
    "PRADEEP KUMAR", "PRIYA TRIPATHI", "RAJESH KUMAR", "RAMESH CHANDRA", "RINKU VERMA",
    "SANJAY GUPTA", "SATYAM SINGH", "SEEMA GIRI", "SHAMA PARVEEN", "SHIKHA OJHA",
    "SIMRAN GUPTA", "SONIYA SINGH", "SUNITA", "SUSHIL KUMAR YADAV", "VASIM AHMAD",
    "VISHAKHA THAMI", "VISHAL SONAR", "VIVEKANAND TIWARI", "WASEEM FIROJ"
  ];

  const filteredList = classTeachers.filter((c) => {
    if (selectedWing === "All Wing") return true;
    return c.wing === selectedWing;
  });

  const handleTeacherChange = (sno, field, value) => {
    setClassTeachers((prev) =>
      prev.map((c) => (c.sno === sno ? { ...c, [field]: value } : c))
    );
  };

  return (
    <div className="bg-white border border-gray-300 rounded-b rounded-tr p-4 md:p-6 shadow-xs space-y-4">
      
      {/* Top Update Button */}
      <div className="flex justify-center">
        <button
          onClick={() => showToast("Class Teacher Allotment Updated Successfully!")}
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
                        value={row.classTeacher || "Select Teacher"}
                        onChange={(e) => handleTeacherChange(row.sno, "classTeacher", e.target.value)}
                        className="w-full text-xs border border-gray-300 rounded px-2.5 py-1 text-gray-800 bg-white outline-none cursor-pointer hover:border-blue-400 appearance-none pr-6 shadow-2xs"
                      >
                        {teacherNames.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                      <FaAngleDown className="absolute right-2 top-2 text-[9px] text-gray-400 pointer-events-none" />
                    </div>
                  </td>

                  {/* Assistant Class Teacher Dropdown */}
                  <td className="py-2 px-4">
                    <div className="relative">
                      <select
                        value={row.assistantTeacher || "Select Teacher"}
                        onChange={(e) => handleTeacherChange(row.sno, "assistantTeacher", e.target.value)}
                        className="w-full text-xs border border-gray-300 rounded px-2.5 py-1 text-gray-800 bg-white outline-none cursor-pointer hover:border-blue-400 appearance-none pr-6 shadow-2xs"
                      >
                        {teacherNames.map((t) => (
                          <option key={t} value={t}>{t}</option>
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
  const [records, setRecords] = useState([]); // Blank by default matching screenshot 4!

  return (
    <div className="bg-white border border-gray-300 rounded-b rounded-tr p-4 md:p-6 shadow-xs space-y-4">
      
      {/* Top Update & Refresh Buttons */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => showToast("Class Teacher Subject Mapping Updated!")}
          className="border border-[#0288d1] text-[#0288d1] hover:bg-blue-50 px-4 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer transition"
        >
          <FaSyncAlt className="text-xs" />
          <span>Update</span>
        </button>
        <button
          onClick={() => {
            setRecords([]);
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
  const initialPeriods = [
    { sno: 1, period: 1, time: "7:30 AM-8:10 AM" },
    { sno: 2, period: 2, time: "8:10 AM-8:50 AM" },
    { sno: 3, period: 3, time: "8:50 AM-9:30 AM" },
    { sno: 4, period: 4, time: "9:30 AM-10:10 AM" },
    { sno: 5, period: 5, time: "10:10 AM-10:50 AM" },
    { sno: 6, period: 6, time: "10:50 AM-11:30 AM" },
    { sno: 7, period: 7, time: "11:30 AM-12:10 PM" },
    { sno: 8, period: 8, time: "12:10 PM - 12:50 PM" },
    { sno: 9, period: 9, time: "12:50 PM - 1:30 PM" },
    { sno: 10, period: 10, time: "1:30 PM - 2:10 PM" },
    { sno: 11, period: 11, time: "2:10 PM-2:50 PM" },
    { sno: 12, period: 12, time: "2:50 PM - 3:30 PM" },
    { sno: 13, period: 13, time: "3:30 PM - 4:10 PM" },
  ];

  const [periodList, setPeriodList] = useState(initialPeriods);

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
          onClick={() => showToast("Period Timings Updated Successfully!")}
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
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedClasses, setSelectedClasses] = useState({});
  const [subjectRows, setSubjectRows] = useState([]);

  const teacherList38 = [
    "Select Teacher",
    "AARADHYA VERMA",
    "AKASH RAI",
    "AKHILESH MISHRA",
    "ALFIYA BANO",
    "AMIT DUBEY",
    "ANKIT KUMAR",
    "ANSHIKA",
    "ARCHANA YADAV",
    "ARPANA UPADHYAY",
    "ASHISH KUMAR",
    "AVANEESH KUMAR RAI",
    "DEEPA GUPTA",
    "GOLENDRA SINGH",
    "KIRAN YADAV",
    "MOHAMMAD MOZAHID",
    "NISHA GUPTA",
    "NITESH TIWARI",
    "PREM SHANKAR PATHAK",
    "PRINCE RAI",
    "PRIYANKA RAI",
    "RACHNA RAI",
    "RAM SAKAL SAHANI",
    "REKHA GUPTA",
    "SAHABUDDIN ALI",
    "SANJU CHAUDHARY",
    "SATYAM SINGH",
    "SEEMA GIRI",
    "SHAMA PARVEEN",
    "SHIKHA OJHA",
    "SIMRAN GUPTA",
    "SONIYA SINGH",
    "SUNITA",
    "SUSHIL KUMAR YADAV",
    "VASIM AHMAD",
    "VISHAKHA THAMI",
    "VISHAL SONAR",
    "VIVEKANAND TIWARI",
    "WASEEM FIROJ"
  ];

  const classList = [
    "NUR-A", "NUR-B", "LKG-A", "LKG-B", "UKG-A", "UKG-B", "UKG-C",
    "1-A", "1-B", "1-C", "2-A", "2-B", "2-C", "3-A", "3-B", "3-C",
    "4-A", "4-B", "4-C", "5-A", "5-B", "5-C", "6-A", "6-B", "6-C",
    "7-A", "7-B", "7-C", "8-A", "8-B", "8-C", "9-A", "9-B", "9-C", "9-D",
    "10-A", "10-B", "10-C", "10-D", "10-E", "11-A", "11-B", "11-C", "11-D",
    "12-A", "12-B", "12-C", "12-D"
  ];

  const handleClassCheck = (cls) => {
    setSelectedClasses((prev) => ({ ...prev, [cls]: !prev[cls] }));
  };

  const handleShowSubjects = () => {
    const checked = Object.keys(selectedClasses).filter((k) => selectedClasses[k]);
    if (checked.length === 0) {
      showToast("Please select at least one Class");
      return;
    }
    const sample = checked.flatMap((cls) => [
      { id: `${cls}-1`, className: cls, subject: "MATHEMATICS", periods: "8", teacher: selectedTeacher || "AKHILESH MISHRA", selected: false },
      { id: `${cls}-2`, className: cls, subject: "ENGLISH CORE", periods: "6", teacher: selectedTeacher || "ANKIT KUMAR", selected: false }
    ]);
    setSubjectRows(sample);
    showToast(`Loaded ${sample.length} subject entries`);
  };

  return (
    <div className="bg-white border border-gray-300 rounded-b rounded-tr p-4 md:p-6 shadow-xs space-y-4">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (Select Teacher + Select Class List) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Select Teacher Dropdown (With 38 Real Teachers Matching Screenshot 2 & 3) */}
          <div className="space-y-1 text-left">
            <label className="block text-xs font-bold text-gray-800">Select Teacher</label>
            <div className="relative">
              <select
                value={selectedTeacher}
                onChange={(e) => setSelectedTeacher(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded px-3 py-2 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs"
              >
                {teacherList38.map((t) => (
                  <option key={t} value={t === "Select Teacher" ? "" : t}>
                    {t}
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
                  {classList.map((cls) => (
                    <tr key={cls} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-2 px-3 text-center">
                        <input
                          type="checkbox"
                          checked={!!selectedClasses[cls]}
                          onChange={() => handleClassCheck(cls)}
                          className="w-3.5 h-3.5 border-gray-300 rounded text-blue-600 focus:ring-0 cursor-pointer"
                        />
                      </td>
                      <td className="py-2 px-3 font-semibold text-gray-800">{cls}</td>
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

        {/* Right Column (Action Buttons + Select Subjects Table) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Top Right Buttons: Unassign & Filter */}
          <div className="flex items-center justify-start gap-3">
            <button
              onClick={() => showToast("Unassign options opened")}
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
                onClick={() => showToast("Period Allotment Assigned Successfully!")}
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
  const [academicYear, setAcademicYear] = useState("2026-2027");
  const [financialYear, setFinancialYear] = useState("2026-2027");
  const [school, setSchool] = useState("NAVALS NATIONAL ACADEMY");

  return (
    <div className="bg-white border border-gray-300 rounded-b rounded-tr p-8 shadow-xs min-h-[480px] flex flex-col items-center justify-start pt-10 select-none">
      <div className="w-full max-w-xl space-y-6">
        
        {/* Academic Year Dropdown */}
        <div className="space-y-1.5 text-left">
          <label className="block text-xs font-bold text-gray-800">Academic Year</label>
          <div className="relative">
            <select
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              className="w-full text-xs border border-gray-300 rounded px-3 py-2 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs"
            >
              <option value="2026-2027">2026-2027</option>
              <option value="2025-2026">2025-2026</option>
              <option value="2024-2025">2024-2025</option>
            </select>
            <FaAngleDown className="absolute right-3 top-3 text-[10px] pointer-events-none text-gray-400" />
          </div>
        </div>

        {/* Financial Year Dropdown */}
        <div className="space-y-1.5 text-left">
          <label className="block text-xs font-bold text-gray-800">Financial Year</label>
          <div className="relative">
            <select
              value={financialYear}
              onChange={(e) => setFinancialYear(e.target.value)}
              className="w-full text-xs border border-gray-300 rounded px-3 py-2 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs"
            >
              <option value="2026-2027">2026-2027</option>
              <option value="2025-2026">2025-2026</option>
              <option value="2024-2025">2024-2025</option>
            </select>
            <FaAngleDown className="absolute right-3 top-3 text-[10px] pointer-events-none text-gray-400" />
          </div>
        </div>

        {/* School Dropdown */}
        <div className="space-y-1.5 text-left">
          <label className="block text-xs font-bold text-gray-800">School</label>
          <div className="relative">
            <select
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              className="w-full text-xs border border-gray-300 rounded px-3 py-2 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs"
            >
              <option value="NAVALS NATIONAL ACADEMY">NAVALS NATIONAL ACADEMY</option>
            </select>
            <FaAngleDown className="absolute right-3 top-3 text-[10px] pointer-events-none text-gray-400" />
          </div>
        </div>

        {/* Change Button */}
        <div className="pt-4 flex justify-center">
          <button
            type="button"
            onClick={() => showToast("Academic Year & Session Changed Successfully!")}
            className="border border-[#0288d1] text-[#0288d1] hover:bg-blue-50 px-5 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
          >
            <FaSyncAlt className="text-[11px]" />
            <span>Change</span>
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
  const [patterns, setPatterns] = useState([
    { sno: 1, pattern: "Any subject teacher in whole school", selected: true, orderNo: "1" },
    { sno: 2, pattern: "Same wing with any subject teacher", selected: false, orderNo: "" },
    { sno: 3, pattern: "Same wing with same subject teacher", selected: false, orderNo: "" },
    { sno: 4, pattern: "Same class with any subject teacher", selected: false, orderNo: "" },
    { sno: 5, pattern: "Same wing with maximum free periods", selected: false, orderNo: "" }
  ]);
  const [repeatTeacher, setRepeatTeacher] = useState("No");

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
          onClick={() => showToast("Substitution Settings Updated Successfully!")}
          className="border border-[#0288d1] text-[#0288d1] hover:bg-blue-50 px-5 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
        >
          <FaSyncAlt className="text-[11px]" />
          <span>Update Setting</span>
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

  return (
    <div className="bg-white border border-gray-300 rounded-b rounded-tr p-6 shadow-xs space-y-6 select-none">
      
      {/* Top Filter Controls Matching Screenshot 1 */}
      <div className="flex flex-wrap items-end gap-5">
        
        {/* Class Multi-Select Dropdown with Checkboxes (Images 2, 3, 4) */}
        <ClassMultiSelectDropdown
          selected={selectedClasses}
          onChange={setSelectedClasses}
          label="Class"
          width="w-56"
        />

        {/* Buttons: Show Subjects & Filter Subject */}
        <div className="flex items-center gap-2.5 pb-0.5">
          <button
            type="button"
            onClick={() => showToast("Show Subjects triggered")}
            className="border border-[#0288d1] text-[#0288d1] hover:bg-blue-50 px-3.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
          >
            <span>👁 Show Subjects</span>
          </button>
          <button
            type="button"
            onClick={() => showToast("Filter Subject dialog opened")}
            className="border border-[#0288d1] text-[#0288d1] hover:bg-blue-50 px-3.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
          >
            <span>Y Filter Subject</span>
          </button>
        </div>

        {/* P-Allocation Name */}
        <div className="space-y-1 text-left min-w-[170px]">
          <label className="block text-xs font-bold text-gray-800">P-Allocation Name</label>
          <input
            type="text"
            value={pAllocName}
            onChange={(e) => setPAllocName(e.target.value)}
            className="w-full text-xs border border-gray-300 rounded px-3 py-1.5 text-gray-800 bg-white font-medium outline-none hover:border-blue-400 focus:border-blue-500 shadow-2xs"
          />
        </div>

        {/* Periods to Allocate */}
        <div className="space-y-1 text-left min-w-[170px]">
          <label className="block text-xs font-bold text-gray-800">Periods to Allocate</label>
          <input
            type="text"
            value={periodsToAlloc}
            onChange={(e) => setPeriodsToAlloc(e.target.value)}
            className="w-full text-xs border border-gray-300 rounded px-3 py-1.5 text-gray-800 bg-white font-medium outline-none hover:border-blue-400 focus:border-blue-500 shadow-2xs"
          />
        </div>

      </div>

      {/* Table Matching Screenshot 1 */}
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
                  <td className="py-2.5 px-4"><input type="checkbox" /></td>
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

      {/* Action Buttons Below Table Matching Screenshot 1 */}
      <div className="flex items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={() => showToast("Parallel Allocation Saved Successfully!")}
          className="border border-[#4caf50] text-[#4caf50] hover:bg-green-50 px-4 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
        >
          <FaSave className="text-[11px]" />
          <span>Save</span>
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
// 16. FIXED ALLOCATION VIEW (MATCHING SCREENSHOT 2 & 4 WITH EXACT GO ICON)
// =========================================================================
function FixedAllocationView({ showToast }) {
  const [selectedClass, setSelectedClass] = useState("Select");
  const [selectedSection, setSelectedSection] = useState("Select");

  const sectionList = ["Select", "A", "B", "C", "D", "E", "ALL"];

  return (
    <div className="bg-white border border-gray-300 rounded-b rounded-tr p-8 shadow-xs min-h-[480px] space-y-6 select-none">
      
      {/* Top Filter Controls Matching Screenshot 2 & 4 (Simple Class Number List Matching Image 1) */}
      <div className="flex items-end justify-center gap-6 pt-4">
        
        {/* Class Dropdown (Simple Numbers Matching Image 1) */}
        <div className="space-y-1.5 text-left w-48">
          <label className="block text-xs font-bold text-gray-800">Class</label>
          <div className="relative">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full text-xs border border-gray-300 rounded px-3 py-1.5 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs"
            >
              {SIMPLE_CLASSES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <FaAngleDown className="absolute right-3 top-2.5 text-[10px] pointer-events-none text-gray-400" />
          </div>
        </div>

        {/* Section Dropdown */}
        <div className="space-y-1.5 text-left w-48">
          <label className="block text-xs font-bold text-gray-800">Section</label>
          <div className="relative">
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="w-full text-xs border border-gray-300 rounded px-3 py-1.5 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs"
            >
              {sectionList.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <FaAngleDown className="absolute right-3 top-2.5 text-[10px] pointer-events-none text-gray-400" />
          </div>
        </div>

        {/* Exact Go Button Matching Screenshot 4 */}
        <div className="pb-0.5">
          <button
            type="button"
            onClick={() => showToast(`Loading Fixed Allocation for Class ${selectedClass} Section ${selectedSection}`)}
            className="border border-[#00a2db] rounded px-3.5 py-1.5 text-xs font-semibold text-[#00a2db] hover:bg-sky-50 flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
          >
            {/* Exact Paper Airplane Icon matching Screenshot 4 */}
            <svg
              className="w-3.5 h-3.5 text-[#00a2db]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" fill="#00a2db" fillOpacity="0.2" />
            </svg>
            <span>Go</span>
          </button>
        </div>

      </div>

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

  return (
    <div className="bg-white border border-gray-300 rounded-b rounded-tr p-6 shadow-xs space-y-6 select-none">
      
      {/* Top Filter Controls Matching Screenshot 3 */}
      <div className="space-y-4">
        
        {/* Row 1: Class (Multi-Select Checkboxes Images 2,3,4) & Show Subjects */}
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
              onClick={() => showToast("Show Subjects triggered")}
              className="border border-[#0288d1] text-[#0288d1] hover:bg-blue-50 px-3.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
            >
              <span>👁 Show Subjects</span>
            </button>
          </div>
        </div>

        {/* Row 2: Total Periods, Frequency, Total Set */}
        <div className="flex items-center gap-5">
          <div className="space-y-1 text-left w-36">
            <label className="block text-xs font-bold text-gray-800">Total Periods</label>
            <input
              type="text"
              value={totalPeriods}
              onChange={(e) => setTotalPeriods(e.target.value)}
              className="w-full text-xs border border-gray-300 rounded px-3 py-1.5 text-gray-800 bg-white font-medium outline-none hover:border-blue-400 focus:border-blue-500 shadow-2xs"
            />
          </div>

          <div className="space-y-1 text-left w-36">
            <label className="block text-xs font-bold text-gray-800">Frequency</label>
            <input
              type="text"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full text-xs border border-gray-300 rounded px-3 py-1.5 text-gray-800 bg-white font-medium outline-none hover:border-blue-400 focus:border-blue-500 shadow-2xs"
            />
          </div>

          <div className="space-y-1 text-left w-44">
            <label className="block text-xs font-bold text-gray-800">Total Set</label>
            <input
              type="text"
              value={totalSet}
              onChange={(e) => setTotalSet(e.target.value)}
              className="w-full text-xs border border-gray-300 rounded px-3 py-1.5 text-gray-800 bg-white font-medium outline-none hover:border-blue-400 focus:border-blue-500 shadow-2xs"
            />
          </div>
        </div>

      </div>

      {/* Table Matching Screenshot 3 */}
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
                  <td className="py-2.5 px-4"><input type="checkbox" /></td>
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

      {/* Action Buttons Below Table Matching Screenshot 3 */}
      <div className="flex items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={() => showToast("Consecutive Allocation Saved Successfully!")}
          className="border border-[#4caf50] text-[#4caf50] hover:bg-green-50 px-4 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
        >
          <FaSave className="text-[11px]" />
          <span>Save</span>
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
            onClick={() => showToast("Show Subjects triggered")}
            className="border border-[#0288d1] text-[#0288d1] hover:bg-blue-50 px-3.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
          >
            <span>👁 Show Subjects</span>
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
          <tbody>
            <tr>
              <td colSpan={5} className="py-2.5 px-4 text-center text-gray-700 bg-[#eaf4fc]/50 font-medium text-xs">
                No data available in table
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={() => showToast("Preference Allocation Saved Successfully!")}
          className="border border-[#4caf50] text-[#4caf50] hover:bg-green-50 px-4 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
        >
          <FaSave className="text-[11px]" />
          <span>Save</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setSelectedClasses([]);
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
  const [selectedClass, setSelectedClass] = useState("Select");
  const [selectedSection, setSelectedSection] = useState("Select");
  const [rows, setRows] = useState([]);

  const sectionList = ["Select", "A", "B", "C", "D", "E", "ALL"];

  return (
    <div className="bg-white border border-gray-300 rounded-b rounded-tr p-6 shadow-xs space-y-6 select-none">
      {/* Top Filter Controls Matching Screenshot 2 */}
      <div className="flex items-center justify-center gap-4 pt-2">
        <span className="text-xs font-bold text-gray-800">Class Timetable</span>
        
        {/* Class (Simple Numbers Matching Image 1) */}
        <div className="relative w-36">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full text-xs border border-gray-300 rounded px-3 py-1.5 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs"
          >
            {SIMPLE_CLASSES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <FaAngleDown className="absolute right-3 top-2.5 text-[10px] pointer-events-none text-gray-400" />
        </div>

        {/* Section */}
        <div className="relative w-36">
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="w-full text-xs border border-gray-300 rounded px-3 py-1.5 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs"
          >
            {sectionList.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <FaAngleDown className="absolute right-3 top-2.5 text-[10px] pointer-events-none text-gray-400" />
        </div>

        {/* Exact Go Button */}
        <button
          type="button"
          onClick={() => showToast(`Loading Predefined Timetable for Class ${selectedClass} ${selectedSection}`)}
          className="border border-[#00a2db] rounded px-3.5 py-1.5 text-xs font-semibold text-[#00a2db] hover:bg-sky-50 flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
        >
          <svg className="w-3.5 h-3.5 text-[#00a2db]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" fill="#00a2db" fillOpacity="0.2" />
          </svg>
          <span>Go</span>
        </button>

        {/* Copy Time Table Button (Solid Sky Blue Matching Screenshot 2) */}
        <button
          type="button"
          onClick={() => showToast("Copy Time Table panel opened")}
          className="bg-[#23a8e0] text-white hover:bg-[#0288d1] px-3.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
        >
          <span>Copy Time Table</span>
        </button>
      </div>

      {/* Table Matching Screenshot 2 */}
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
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-400 bg-sky-50/20 font-medium">
                  {/* Blank default table matching Screenshot 2 */}
                </td>
              </tr>
            ) : (
              rows.map((r, i) => (
                <tr key={i} className="hover:bg-gray-50/80">
                  <td className="py-2.5 px-4">{r.sno}</td>
                  <td className="py-2.5 px-4">{r.day}</td>
                  <td className="py-2.5 px-4">{r.period}</td>
                  <td className="py-2.5 px-4">{r.teacher}</td>
                  <td className="py-2.5 px-4">{r.subject}</td>
                  <td className="py-2.5 px-4">{r.action}</td>
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

  return (
    <div className="bg-white border border-gray-300 rounded-b rounded-tr p-8 shadow-xs min-h-[480px] space-y-10 select-none">
      {/* Top Filter Controls Matching Screenshot 3 */}
      <div className="flex items-center justify-center gap-6 pt-2">
        <span className="text-xs font-bold text-gray-800">Select Class</span>

        {/* Multi-Select Dropdown with Checkboxes (Images 2, 3, 4) */}
        <ClassMultiSelectDropdown
          selected={selectedClasses}
          onChange={setSelectedClasses}
          label=""
          width="w-64"
        />

        {/* Buttons: Auto Generate & Delete Timetable */}
        <button
          type="button"
          onClick={() => showToast("Auto Generating Timetable using AI Algorithm...")}
          className="border border-[#0288d1] text-[#0288d1] hover:bg-blue-50 px-4 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
        >
          <FaSyncAlt className="text-[11px]" />
          <span>Auto Generate</span>
        </button>

        <button
          type="button"
          onClick={() => showToast("Timetable Deleted for selected classes")}
          className="border border-[#f87171] text-[#f87171] hover:bg-red-50 px-4 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
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
  const [selectedClass, setSelectedClass] = useState("Select");
  const [selectedSection, setSelectedSection] = useState("Select");

  const sectionList = ["Select", "A", "B", "C", "D", "E", "ALL"];

  return (
    <div className="bg-white border border-gray-300 rounded-b rounded-tr p-8 shadow-xs min-h-[480px] space-y-6 select-none">
      {/* Top Filter Controls Matching Screenshot 4 */}
      <div className="flex items-end justify-center gap-6 pt-2">
        <div className="space-y-1.5 text-left w-48">
          <label className="block text-xs font-bold text-gray-800">Class</label>
          <div className="relative">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full text-xs border border-gray-300 rounded px-3 py-1.5 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs"
            >
              {SIMPLE_CLASSES.map((c) => (
                <option key={c} value={c}>{c}</option>
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
              className="w-full text-xs border border-gray-300 rounded px-3 py-1.5 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs"
            >
              {sectionList.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <FaAngleDown className="absolute right-3 top-2.5 text-[10px] pointer-events-none text-gray-400" />
          </div>
        </div>

        <div className="pb-0.5">
          <button
            type="button"
            onClick={() => showToast(`Loading Timetable for Class ${selectedClass} Section ${selectedSection}`)}
            className="border border-[#00a2db] rounded px-3.5 py-1.5 text-xs font-semibold text-[#00a2db] hover:bg-sky-50 flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
          >
            <svg className="w-3.5 h-3.5 text-[#00a2db]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" fill="#00a2db" fillOpacity="0.2" />
            </svg>
            <span>Go</span>
          </button>
        </div>
      </div>

      {/* ClassTeacher and Legend row Matching Screenshot 4 */}
      <div className="flex items-center justify-between pt-6 px-2 text-xs border-t border-gray-100">
        <div className="font-bold text-gray-900">
          ClassTeacher: <span className="font-medium text-gray-600"></span>
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
    </div>
  );
}

// =========================================================================
// 22. REPLACE TEACHER VIEW (MATCHING SCREENSHOT 5)
// =========================================================================
function ReplaceTeacherView({ showToast }) {
  const [selectedTeacher, setSelectedTeacher] = useState("Select Teacher");
  const [replaceToTeacher, setReplaceToTeacher] = useState("Select Teacher");
  const [rows, setRows] = useState([]);

  return (
    <div className="bg-white border border-gray-300 rounded-b rounded-tr p-6 shadow-xs space-y-6 select-none">
      {/* Top Filter Controls Matching Screenshot 5 */}
      <div className="flex flex-col items-center gap-4 pt-2">
        <div className="flex items-center justify-center gap-8">
          <div className="space-y-1.5 text-left w-56">
            <label className="block text-xs font-bold text-gray-800">Select Teacher</label>
            <div className="relative">
              <select
                value={selectedTeacher}
                onChange={(e) => setSelectedTeacher(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded px-3 py-1.5 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs"
              >
                {TEACHERS_LIST_38.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <FaAngleDown className="absolute right-3 top-2.5 text-[10px] pointer-events-none text-gray-400" />
            </div>
          </div>

          <div className="space-y-1.5 text-left w-56">
            <label className="block text-xs font-bold text-gray-800">Replace To</label>
            <div className="relative">
              <select
                value={replaceToTeacher}
                onChange={(e) => setReplaceToTeacher(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded px-3 py-1.5 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs"
              >
                {TEACHERS_LIST_38.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <FaAngleDown className="absolute right-3 top-2.5 text-[10px] pointer-events-none text-gray-400" />
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => showToast(`Replacing ${selectedTeacher} with ${replaceToTeacher}`)}
          className="border border-[#0288d1] text-[#0288d1] hover:bg-blue-50 px-5 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
        >
          <FaExchangeAlt className="text-[11px]" />
          <span>Replace</span>
        </button>
      </div>

      {/* Header Bar: Replace Subject Teacher Matching Screenshot 5 */}
      <div className="border border-gray-200 rounded overflow-hidden shadow-2xs">
        <div className="bg-gray-100/90 py-1.5 px-3 text-center text-xs font-bold text-gray-800 border-b border-gray-200">
          Replace Subject Teacher
        </div>
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-white border-b border-gray-200 select-none shadow-2xs">
            <tr className="text-gray-900 font-bold">
              <th className="py-2.5 px-4 w-32">Select <span className="text-[10px] text-gray-400">⇅</span></th>
              <th className="py-2.5 px-4 w-48">ClassName <span className="text-[10px] text-gray-400">⇅</span></th>
              <th className="py-2.5 px-4">Subjects</th>
              <th className="py-2.5 px-4 w-36">Periods</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-2.5 px-4 text-center text-gray-700 bg-[#eaf4fc]/50 font-medium text-xs">
                  No data available in table
                </td>
              </tr>
            ) : (
              rows.map((r, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4"><input type="checkbox" /></td>
                  <td className="py-2.5 px-4">{r.className}</td>
                  <td className="py-2.5 px-4">{r.subject}</td>
                  <td className="py-2.5 px-4">{r.periods}</td>
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
// 23. ASSIGN ONE TEACHER TIMETABLE TO ANOTHER VIEW (MATCHING SCREENSHOT 1)
// =========================================================================
function AssignOneTeacherTimetableToAnotherView({ showToast }) {
  const [selectedTeacher, setSelectedTeacher] = useState("Select Teacher");
  const [selectedNewTeacher, setSelectedNewTeacher] = useState("Select Teacher");

  return (
    <div className="bg-white border border-gray-300 rounded-b rounded-tr p-8 shadow-xs min-h-[480px] space-y-4 select-none">
      {/* 2 Columns: Select Teacher & Select New Teacher Matching Screenshot 1 */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
        {/* Left: Select Teacher */}
        <div className="space-y-3">
          <div className="text-center">
            <label className="block text-xs font-bold text-gray-800 mb-1.5">Select Teacher</label>
            <div className="relative w-72 mx-auto">
              <select
                value={selectedTeacher}
                onChange={(e) => setSelectedTeacher(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded px-3 py-1.5 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs text-left"
              >
                {TEACHERS_LIST_38.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <FaAngleDown className="absolute right-3 top-2.5 text-[10px] pointer-events-none text-gray-400" />
            </div>
          </div>

          {/* Light Box Container below Matching Screenshot 1 */}
          <div className="border border-gray-200 rounded h-7 bg-white shadow-2xs"></div>
        </div>

        {/* Right: Select New Teacher */}
        <div className="space-y-3">
          <div className="text-center">
            <label className="block text-xs font-bold text-gray-800 mb-1.5">Select New Teacher</label>
            <div className="relative w-72 mx-auto">
              <select
                value={selectedNewTeacher}
                onChange={(e) => setSelectedNewTeacher(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded px-3 py-1.5 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs text-left"
              >
                {TEACHERS_LIST_38.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <FaAngleDown className="absolute right-3 top-2.5 text-[10px] pointer-events-none text-gray-400" />
            </div>
          </div>

          {/* Light Box Container below Matching Screenshot 1 */}
          <div className="border border-gray-200 rounded h-7 bg-white shadow-2xs"></div>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// 24. MODIFY TIMETABLE VIEW (MATCHING SCREENSHOT 2)
// =========================================================================
function ModifyTimetableView({ showToast }) {
  const [selectedClass, setSelectedClass] = useState("Select");
  const [selectedSection, setSelectedSection] = useState("Select");

  const sectionList = ["Select", "A", "B", "C", "D", "E", "ALL"];

  return (
    <div className="bg-white border border-gray-300 rounded-b rounded-tr p-8 shadow-xs min-h-[480px] space-y-6 select-none">
      {/* Top Filter Controls Matching Screenshot 2 */}
      <div className="flex items-center justify-center gap-6 pt-2">
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-gray-800">Class</label>
          <div className="relative w-36">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full text-xs border border-gray-300 rounded px-3 py-1.5 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs"
            >
              {SIMPLE_CLASSES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <FaAngleDown className="absolute right-3 top-2.5 text-[10px] pointer-events-none text-gray-400" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-gray-800">Section</label>
          <div className="relative w-36">
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="w-full text-xs border border-gray-300 rounded px-3 py-1.5 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs"
            >
              {sectionList.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <FaAngleDown className="absolute right-3 top-2.5 text-[10px] pointer-events-none text-gray-400" />
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={() => showToast(`Loading Modify Timetable for ${selectedClass}-${selectedSection}`)}
            className="border border-[#00a2db] rounded px-3.5 py-1.5 text-xs font-semibold text-[#00a2db] hover:bg-sky-50 flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
          >
            <svg className="w-3.5 h-3.5 text-[#00a2db]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" fill="#00a2db" fillOpacity="0.2" />
            </svg>
            <span>Go</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// 25. MODIFY PREDEFINED ALLOCATION VIEW (MATCHING SCREENSHOT 3)
// =========================================================================
function ModifyPredefinedAllocationView({ showToast }) {
  const [selectedClass, setSelectedClass] = useState("Select Class");

  const classDropdownOptions = [
    "Select Class",
    ...ALL_SECTION_CLASSES
  ];

  return (
    <div className="bg-white border border-gray-300 rounded-b rounded-tr p-6 shadow-xs space-y-6 select-none">
      {/* Top Filter Matching Screenshot 3 */}
      <div className="flex flex-col items-center gap-2 pt-2">
        <label className="text-xs font-bold text-gray-800">Select Class</label>
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full text-xs border border-gray-300 rounded px-3 py-1.5 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs"
            >
              {classDropdownOptions.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <FaAngleDown className="absolute right-3 top-2.5 text-[10px] pointer-events-none text-gray-400" />
          </div>

          <button
            type="button"
            onClick={() => showToast(`Loading Predefined Allocation for ${selectedClass}`)}
            className="border border-[#00a2db] rounded px-3.5 py-1.5 text-xs font-semibold text-[#00a2db] hover:bg-sky-50 flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
          >
            <svg className="w-3.5 h-3.5 text-[#00a2db]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" fill="#00a2db" fillOpacity="0.2" />
            </svg>
            <span>Go</span>
          </button>
        </div>
      </div>

      {/* Header Bar & Table Matching Screenshot 3 */}
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
            <tr>
              <td colSpan={5} className="py-8 text-center text-gray-400 bg-white font-medium">
                {/* Clean blank rows */}
              </td>
            </tr>
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
  const [currentSession, setCurrentSession] = useState("2026-2027");
  const [nextSession, setNextSession] = useState("");

  const sessionList = ["", "2026-2027", "2027-2028", "2028-2029"];

  return (
    <div className="bg-white border border-gray-300 rounded-b rounded-tr p-8 shadow-xs min-h-[480px] flex flex-col items-center justify-start pt-6 space-y-6 select-none">
      {/* 2 Session Dropdowns Matching Screenshot 4 */}
      <div className="flex items-center justify-center gap-10">
        <div className="space-y-1.5 text-left w-56">
          <label className="block text-xs font-bold text-gray-800">Current Session</label>
          <div className="relative">
            <select
              value={currentSession}
              onChange={(e) => setCurrentSession(e.target.value)}
              className="w-full text-xs border border-gray-300 rounded px-3 py-1.5 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs"
            >
              <option value="2026-2027">2026-2027</option>
              <option value="2025-2026">2025-2026</option>
            </select>
            <FaAngleDown className="absolute right-3 top-2.5 text-[10px] pointer-events-none text-gray-400" />
          </div>
        </div>

        <div className="space-y-1.5 text-left w-56">
          <label className="block text-xs font-bold text-gray-800">Next Session</label>
          <div className="relative">
            <select
              value={nextSession}
              onChange={(e) => setNextSession(e.target.value)}
              className="w-full text-xs border border-gray-300 rounded px-3 py-1.5 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs"
            >
              {sessionList.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <FaAngleDown className="absolute right-3 top-2.5 text-[10px] pointer-events-none text-gray-400" />
          </div>
        </div>
      </div>

      {/* Transfer Action Button Matching Screenshot 4 */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => showToast(`Timetable Transferred to session ${nextSession || "2027-2028"} Successfully!`)}
          className="border border-[#00a2db] text-[#00a2db] hover:bg-sky-50 px-4 py-1.5 rounded text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-2xs transition"
        >
          <FaExchangeAlt className="text-[11px]" />
          <span>Transfer Timetable to Next Session</span>
        </button>
      </div>
    </div>
  );
}

// =========================================================================
// 27. MARK ATTENDANCE VIEW (MATCHING SCREENSHOT 2)
// =========================================================================
function MarkAttendanceView({ showToast }) {
  const [selectDate, setSelectDate] = useState("01-Sep-2026");
  const [selectedDay, setSelectedDay] = useState("Tuesday");
  const [rows, setRows] = useState([]);

  const daysList = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <div className="bg-white border border-gray-300 rounded-b rounded-tr p-6 shadow-xs space-y-6 select-none">
      {/* Top Filter Controls Matching Screenshot 2 */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
        <span className="text-xs font-bold text-gray-800">Select Date</span>
        <div className="relative w-36">
          <input
            type="text"
            value={selectDate}
            onChange={(e) => setSelectDate(e.target.value)}
            className="w-full text-xs border border-gray-300 rounded px-3 py-1.5 text-gray-800 bg-white font-medium outline-none hover:border-blue-400 shadow-2xs text-center"
          />
        </div>

        {/* Go Button */}
        <button
          type="button"
          onClick={() => showToast(`Loaded attendance for date ${selectDate}`)}
          className="border border-[#00a2db] rounded px-3.5 py-1.5 text-xs font-semibold text-[#00a2db] hover:bg-sky-50 flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
        >
          <svg className="w-3.5 h-3.5 text-[#00a2db]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" fill="#00a2db" fillOpacity="0.2" />
          </svg>
          <span>Go</span>
        </button>

        {/* Day Dropdown */}
        <div className="relative w-36">
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="w-full text-xs border border-gray-300 rounded px-3 py-1.5 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs"
          >
            {daysList.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <FaAngleDown className="absolute right-3 top-2.5 text-[10px] pointer-events-none text-gray-400" />
        </div>

        {/* Save Button */}
        <button
          type="button"
          onClick={() => showToast("Teacher Attendance Saved Successfully!")}
          className="border border-[#4caf50] text-[#4caf50] hover:bg-green-50 px-3.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
        >
          <FaSave className="text-[11px]" />
          <span>Save</span>
        </button>

        {/* Fetch Biometric Attendance Button */}
        <button
          type="button"
          onClick={() => showToast("Biometric Attendance Synchronized!")}
          className="border border-[#00a2db] text-[#00a2db] hover:bg-sky-50 px-3.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
        >
          <FaFingerprint className="text-[11px]" />
          <span>Fetch Biometric Attendance</span>
        </button>
      </div>

      {/* Table Matching Screenshot 2 */}
      <div className="border border-gray-200 rounded overflow-hidden shadow-2xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-white border-b border-gray-200 select-none shadow-2xs">
            <tr className="text-gray-900 font-bold">
              <th className="py-2.5 px-4 w-28">SNo.</th>
              <th className="py-2.5 px-4 w-36">Day</th>
              <th className="py-2.5 px-4">Teacher Name</th>
              <th className="py-2.5 px-4 w-52">Attendance Type</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-gray-400 bg-white font-medium">
                  {/* Blank default table matching Screenshot 2 */}
                </td>
              </tr>
            ) : (
              rows.map((r, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4">{r.sno}</td>
                  <td className="py-2.5 px-4">{r.day}</td>
                  <td className="py-2.5 px-4">{r.teacher}</td>
                  <td className="py-2.5 px-4">{r.type}</td>
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
  const [selectDate, setSelectDate] = useState("01-Sep-2026");
  const [rows, setRows] = useState([]);

  return (
    <div className="bg-white border border-gray-300 rounded-b rounded-tr p-6 shadow-xs space-y-6 select-none">
      {/* Top Filter Controls Matching Screenshot 3 */}
      <div className="flex flex-col items-center gap-4 pt-2">
        <div className="flex items-center justify-center gap-4">
          <span className="text-xs font-bold text-gray-800">Select Date</span>
          <div className="relative w-64">
            <input
              type="text"
              value={selectDate}
              onChange={(e) => setSelectDate(e.target.value)}
              className="w-full text-xs border border-gray-300 rounded px-3 py-1.5 text-gray-800 bg-white font-medium outline-none hover:border-blue-400 shadow-2xs text-left"
            />
          </div>

          <button
            type="button"
            onClick={() => showToast(`Loaded substitutions for date ${selectDate}`)}
            className="border border-[#00a2db] rounded px-3.5 py-1.5 text-xs font-semibold text-[#00a2db] hover:bg-sky-50 flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
          >
            <svg className="w-3.5 h-3.5 text-[#00a2db]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" fill="#00a2db" fillOpacity="0.2" />
            </svg>
            <span>Go</span>
          </button>
        </div>

        {/* Centered Substituion New Button Matching Screenshot 3 */}
        <div>
          <button
            type="button"
            onClick={() => showToast("Opening Substitution New generator")}
            className="bg-[#23a8e0] text-white hover:bg-[#0288d1] px-4 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
          >
            <span>Substituion New</span>
          </button>
        </div>
      </div>

      {/* Table Matching Screenshot 3 */}
      <div className="border border-gray-200 rounded overflow-hidden shadow-2xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-white border-b border-gray-200 select-none shadow-2xs">
            <tr className="text-gray-900 font-bold">
              <th className="py-2.5 px-4 w-20">SNo. <span className="text-[10px] text-gray-400">⇅</span></th>
              <th className="py-2.5 px-4 w-24">Day <span className="text-[10px] text-gray-400">⇅</span></th>
              <th className="py-2.5 px-4">Absent Teachers</th>
              <th className="py-2.5 px-4 w-36">Show Timetable</th>
              <th className="py-2.5 px-4 w-24">Period <span className="text-[10px] text-gray-400">⇅</span></th>
              <th className="py-2.5 px-4">Class & Subject <span className="text-[10px] text-gray-400">⇅</span></th>
              <th className="py-2.5 px-4">Substitute by <span className="text-[10px] text-gray-400">⇅</span></th>
              <th className="py-2.5 px-4 w-36">Show Timetable <span className="text-[10px] text-gray-400">⇅</span></th>
              <th className="py-2.5 px-4 w-24">Wing <span className="text-[10px] text-gray-400">⇅</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-2.5 px-4 text-center text-gray-700 bg-[#eaf4fc]/50 font-medium text-xs">
                  No data available in table
                </td>
              </tr>
            ) : (
              rows.map((r, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4">{r.sno}</td>
                  <td className="py-2.5 px-4">{r.day}</td>
                  <td className="py-2.5 px-4">{r.absentTeacher}</td>
                  <td className="py-2.5 px-4">{r.showTt}</td>
                  <td className="py-2.5 px-4">{r.period}</td>
                  <td className="py-2.5 px-4">{r.classSubject}</td>
                  <td className="py-2.5 px-4">{r.substituteBy}</td>
                  <td className="py-2.5 px-4">{r.showTtSub}</td>
                  <td className="py-2.5 px-4">{r.wing}</td>
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
function TimetableReportsView({ tabId, title, showToast }) {
  const [showReport, setShowReport] = useState(false);
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(false);
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

  // Master Requirement Radio Option state (Screenshot 2, 3, 4, 5)
  const [selectedMasterOption, setSelectedMasterOption] = useState("Class List");

  // Show Timetable At Glance Radio Option state (Screenshot 1)
  const [selectedGlanceOption, setSelectedGlanceOption] = useState("Class Timetable");

  // Pagination & Search
  const [currentPage, setCurrentPage] = useState(1);
  const [searchReportText, setSearchReportText] = useState("");
  const [timetableData, setTimetableData] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const totalPages = tabId === "subject_details" ? 3 : tabId === "master_requirement" ? 2 : 1;

  // Reset showReport when switching sub-tab
  useEffect(() => {
    setShowReport(false);
    setCurrentPage(1);
    setSearchReportText("");
  }, [tabId]);

  const reportHeading = title || tabId.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  // Show Timetable At Glance Radio List (Exact Matching Screenshot 1)
  const glanceOptions = [
    "Class Timetable",
    "Class Timetable ColorWise",
    "Teachers Timetable",
    "Teachers Timetable ColorWise",
    "Resource Timetable",
    "Resource Timetable ColorWise",
  ];

  // Master Requirement Radio List (Exact Matching Screenshot 2, 3, 4, 5)
  const masterRequirementOptions = [
    "Class List",
    "Subject List",
    "Teacher,Class,Subject,No. Of Periods",
    "Subject Taught ByTeacher",
    "Class Teachers Detail",
  ];

  // Staff Types List (Screenshot 3)
  const staffTypesList = ["None selected", "Teaching", "Non-Teaching", "All Staff"];

  // Resources List (Screenshot 4)
  const resourcesList = [
    "All Resources",
    "Physics Lab",
    "Chemistry Lab",
    "Biology Lab",
    "Computer Lab 1",
    "Computer Lab 2",
    "Art Room",
    "Music Room",
    "Library",
    "Playground",
    "Auditorium",
  ];

  // Subjects Data (Matching Screenshot 4 & 5)
  const allSubjects = [
    { sn: 1, name: "ACCOUNTANCY", shortName: "Accoun", type: "Minor" },
    { sn: 2, name: "ACTION RHYMES & CONV", shortName: "ACTION RHYMES & CONV", type: "Major" },
    { sn: 3, name: "ACTIVITY", shortName: "ACT", type: "Major" },
    { sn: 4, name: "ACTIVITY TIME", shortName: "ACTIVITY TIME", type: "Major" },
    { sn: 5, name: "ACTIVITY YOGA", shortName: "ACTIVITY YOGA", type: "Major" },
    { sn: 6, name: "AKSHAR STUDY TIME", shortName: "AKSHAR STUDY TIME", type: "Major" },
    { sn: 7, name: "ALPHABET STUDY TIME", shortName: "ALPHABET STUDY TIME", type: "Major" },
    { sn: 8, name: "ART & CRAFT", shortName: "ART", type: "Minor" },
    { sn: 9, name: "BIOLOGY", shortName: "BIO", type: "Major" },
    { sn: 10, name: "BUSINESS STUDIES", shortName: "BST", type: "Major" },
    { sn: 11, name: "CHEMISTRY", shortName: "CHEM", type: "Major" },
    { sn: 12, name: "COMPUTER SCIENCE", shortName: "CS", type: "Major" },
    { sn: 13, name: "CONVERSATION/LIFE SKILL", shortName: "CONVERSATION/LIFE SKILL", type: "Major" },
    { sn: 14, name: "CONVERSATION/SPOKEN", shortName: "CONVERSATION/SPOKEN", type: "Major" },
    { sn: 15, name: "CURSIVE WRI DICTATION", shortName: "CURSIVE WRI DICTATION", type: "Major" },
    { sn: 16, name: "CURSIVE WRITING", shortName: "CURSIVE WRITING", type: "Major" },
    { sn: 17, name: "DANCE", shortName: "DANCE", type: "Major" },
    { sn: 18, name: "DANCE CLASS", shortName: "DANCE CLASS", type: "Major" },
    { sn: 19, name: "DANCE MUSIC", shortName: "DAN/MUS", type: "Major" },
    { sn: 20, name: "DICTATION/READING", shortName: "DICTATION/READING", type: "Major" },
    { sn: 21, name: "DRAWING", shortName: "DRAWING", type: "Major" },
    { sn: 22, name: "E.V.S", shortName: "E.V.S", type: "Major" },
    { sn: 23, name: "ECONOMICS", shortName: "ECO", type: "Major" },
    { sn: 24, name: "EDU SPORTS", shortName: "EDUSP", type: "Major" },
    { sn: 25, name: "ENGLISH", shortName: "ENG", type: "Major" },
    { sn: 26, name: "ENGLISH GRAMMAR", shortName: "ENG-GR", type: "Major" },
    { sn: 27, name: "ENVIRONMENTAL STUDIES", shortName: "EVS", type: "Major" },
    { sn: 28, name: "GENERAL KNOWLEDGE", shortName: "GK", type: "Minor" },
    { sn: 29, name: "GEOGRAPHY", shortName: "GEO", type: "Major" },
    { sn: 30, name: "HINDI", shortName: "HIN", type: "Major" },
    { sn: 31, name: "HINDI GRAMMAR", shortName: "HIN-GR", type: "Major" },
    { sn: 32, name: "CONVERSATION/LIFE SKILL", shortName: "CONVERSATION/LIFE SKILL", type: "Major" },
    { sn: 33, name: "CONVERSATION/SPOKEN", shortName: "CONVERSATION/SPOKEN", type: "Major" },
    { sn: 34, name: "CURSIVE WRI DICTATION", shortName: "CURSIVE WRI DICTATION", type: "Major" },
    { sn: 35, name: "CURSIVE WRITING", shortName: "CURSIVE WRITING", type: "Major" },
    { sn: 36, name: "DANCE", shortName: "DANCE", type: "Major" },
    { sn: 37, name: "DANCE CLASS", shortName: "DANCE CLASS", type: "Major" },
    { sn: 38, name: "DANCE MUSIC", shortName: "DAN/MUS", type: "Major" },
    { sn: 39, name: "DICTATION/READING", shortName: "DICTATION/READING", type: "Major" },
    { sn: 40, name: "DRAWING", shortName: "DRAWING", type: "Major" },
    { sn: 41, name: "E.V.S", shortName: "E.V.S", type: "Major" },
    { sn: 42, name: "ECONOMICS", shortName: "ECO", type: "Major" },
    { sn: 43, name: "EDU SPORTS", shortName: "EDUSP", type: "Major" },
    { sn: 44, name: "ENGLISH", shortName: "ENG", type: "Major" },
  ];

  // Pagination for subjects
  const getPaginatedSubjects = () => {
    if (searchReportText.trim()) {
      return allSubjects.filter(
        (s) =>
          s.name.toLowerCase().includes(searchReportText.toLowerCase()) ||
          s.shortName.toLowerCase().includes(searchReportText.toLowerCase())
      );
    }
    if (currentPage === 1) return allSubjects.slice(0, 16);
    if (currentPage === 2) return allSubjects.slice(16, 31);
    return allSubjects.slice(31);
  };

  const currentSubjects = getPaginatedSubjects();

  // Class List Data for Master Requirement (Screenshot 3)
  const masterClassList = ALL_SECTION_CLASSES.map((cls, idx) => {
    const parts = cls.split("-");
    const cName = parts[0] || cls;
    const sName = parts[1] || "A";
    return {
      sn: idx + 1,
      className: cName,
      section: sName,
      noOfPeriods: 48,
    };
  });

  // Teacher, Class, Subject, No of Periods Data (Screenshot 4)
  const masterTeacherClassSubjectData = [
    { classSection: "NURSERY-A", subject: "ENGLISH", period: 8, teacherName: "MRS. KAVITA SHARMA", resource: "-" },
    { classSection: "NURSERY-A", subject: "HINDI", period: 8, teacherName: "MRS. ANITA VERMA", resource: "-" },
    { classSection: "NURSERY-A", subject: "MATHEMATICS", period: 8, teacherName: "MRS. KAVITA SHARMA", resource: "-" },
    { classSection: "NURSERY-A", subject: "RHYMES & CONV", period: 6, teacherName: "MS. PRIYA DIXIT", resource: "ACTIVITY ROOM" },
    { classSection: "NURSERY-A", subject: "DRAWING", period: 6, teacherName: "MRS. ANJALI ROY", resource: "ART ROOM" },
    { classSection: "NURSERY-A", subject: "ACTIVITY TIME", period: 6, teacherName: "MR. MANOJ TIWARI", resource: "PLAYGROUND" },
    { classSection: "NURSERY-A", subject: "DANCE MUSIC", period: 6, teacherName: "MS. POOJA JOSHI", resource: "MUSIC ROOM" },
    { classSection: "NURSERY-B", subject: "ENGLISH", period: 8, teacherName: "MRS. SHALINI MISHRA", resource: "-" },
    { classSection: "NURSERY-B", subject: "HINDI", period: 8, teacherName: "MRS. ANITA VERMA", resource: "-" },
    { classSection: "NURSERY-B", subject: "MATHEMATICS", period: 8, teacherName: "MRS. SHALINI MISHRA", resource: "-" },
    { classSection: "LKG-A", subject: "ENGLISH", period: 8, teacherName: "MRS. ANITA VERMA", resource: "-" },
    { classSection: "LKG-A", subject: "HINDI", period: 8, teacherName: "MRS. SUNITA ROY", resource: "-" },
    { classSection: "LKG-A", subject: "MATHEMATICS", period: 8, teacherName: "MRS. ANITA VERMA", resource: "-" },
    { classSection: "1-A", subject: "ENGLISH", period: 8, teacherName: "MR. RAJESH KUMAR", resource: "-" },
    { classSection: "1-A", subject: "HINDI", period: 8, teacherName: "MR. VIKRAM PATEL", resource: "-" },
    { classSection: "1-A", subject: "MATHEMATICS", period: 8, teacherName: "MR. AMIT SHARMA", resource: "-" },
    { classSection: "1-A", subject: "E.V.S", period: 6, teacherName: "MRS. PRIYA SINGH", resource: "SCIENCE LAB" },
    { classSection: "1-A", subject: "COMPUTER SCIENCE", period: 4, teacherName: "MS. POOJA JOSHI", resource: "COMP LAB" },
    { classSection: "1-A", subject: "DRAWING", period: 4, teacherName: "MRS. ANJALI ROY", resource: "ART ROOM" },
    { classSection: "1-A", subject: "EDU SPORTS", period: 4, teacherName: "MR. MANOJ TIWARI", resource: "PLAYGROUND" },
    { classSection: "10-A", subject: "MATHEMATICS", period: 7, teacherName: "MR. AMIT SHARMA", resource: "-" },
    { classSection: "10-A", subject: "PHYSICS", period: 6, teacherName: "MRS. NEHA GUPTA", resource: "PHYSICS LAB" },
    { classSection: "10-A", subject: "CHEMISTRY", period: 6, teacherName: "MR. DEEPAK MISHRA", resource: "CHEM LAB" },
    { classSection: "10-A", subject: "BIOLOGY", period: 6, teacherName: "MRS. PRIYA SINGH", resource: "BIO LAB" },
    { classSection: "10-A", subject: "ENGLISH", period: 6, teacherName: "MR. RAJESH KUMAR", resource: "-" },
    { classSection: "10-A", subject: "SOCIAL SCIENCE", period: 6, teacherName: "MS. SUNITA VERMA", resource: "-" },
    { classSection: "10-A", subject: "HINDI", period: 5, teacherName: "MR. VIKRAM PATEL", resource: "-" },
    { classSection: "10-A", subject: "COMPUTER APP", period: 4, teacherName: "MS. POOJA JOSHI", resource: "COMP LAB" },
    { classSection: "12-A", subject: "MATHEMATICS", period: 8, teacherName: "MR. AMIT SHARMA", resource: "-" },
    { classSection: "12-A", subject: "PHYSICS", period: 8, teacherName: "MRS. NEHA GUPTA", resource: "PHYSICS LAB" },
    { classSection: "12-A", subject: "CHEMISTRY", period: 8, teacherName: "MR. DEEPAK MISHRA", resource: "CHEM LAB" },
    { classSection: "12-A", subject: "ENGLISH CORE", period: 7, teacherName: "MR. RAJESH KUMAR", resource: "-" },
    { classSection: "12-A", subject: "COMPUTER SCIENCE", period: 7, teacherName: "MS. POOJA JOSHI", resource: "COMP LAB" },
  ];

  // Subject Taught By Teacher Data (Screenshot 5 & Image 2 with 44 items)
  const masterSubjectTaughtData = Array.from({ length: 44 }, (_, i) => {
    const cls = ALL_SECTION_CLASSES[i % ALL_SECTION_CLASSES.length];
    const sub = allSubjects[i % allSubjects.length].name;
    return {
      sn: i + 1,
      classSection: cls,
      subject: sub,
    };
  });

  // Class Teachers Detail Data
  const classTeachersData = ALL_SECTION_CLASSES.map((cls, idx) => {
    const parts = cls.split("-");
    const cName = parts[0] || cls;
    const sName = parts[1] || "A";
    const teachers = [
      "MRS. KAVITA SHARMA",
      "MRS. SHALINI MISHRA",
      "MRS. ANITA VERMA",
      "MR. AMIT SHARMA",
      "MRS. PRIYA SINGH",
      "MR. RAJESH KUMAR",
      "MS. SUNITA VERMA",
      "MR. VIKRAM PATEL",
      "MRS. NEHA GUPTA",
      "MR. DEEPAK MISHRA",
      "MS. POOJA JOSHI",
    ];
    return {
      sn: idx + 1,
      className: cName,
      section: sName,
      teacherName: teachers[idx % teachers.length],
      roomNo: `R-${101 + (idx % 25)}`,
      mobileNo: `98765${String(10000 + idx).slice(1)}`,
    };
  });

  // Wing Wise Teacher Data (Screenshot 5 Exact Data)
  const wingWiseTeacherData = [
    { sn: 1, name: "AARADHYA VERMA", contact: "8127535725", gender: "Unknown", wing: "Higher" },
    { sn: 2, name: "AMIT DUBEY", contact: "6393449933", gender: "Male", wing: "Primary" },
    { sn: 3, name: "ANKIT KUMAR", contact: "7408758324", gender: "Male", wing: "Kindergarten" },
    { sn: 4, name: "ANSHIKA", contact: "9305953530", gender: "Unknown", wing: "Kindergarten" },
    { sn: 5, name: "ARCHANA YADAV", contact: "7497961668", gender: "Unknown", wing: "Kindergarten" },
    { sn: 6, name: "ARPANA UPADHYAY", contact: "9492801781", gender: "Unknown", wing: "Primary" },
    { sn: 7, name: "ASHISH KUMAR", contact: "7860565888", gender: "Male", wing: "Primary" },
    { sn: 8, name: "DEEPAK MISHRA", contact: "8765432109", gender: "Male", wing: "Senior Secondary" },
    { sn: 9, name: "KAVITA SHARMA", contact: "9876543210", gender: "Female", wing: "Pre-Primary" },
    { sn: 10, name: "NEHA GUPTA", contact: "8877665544", gender: "Female", wing: "Senior Secondary" },
    { sn: 11, name: "POOJA JOSHI", contact: "7766554433", gender: "Female", wing: "Middle" },
    { sn: 12, name: "PRIYA SINGH", contact: "9988776655", gender: "Female", wing: "Middle" },
    { sn: 13, name: "RAJESH KUMAR", contact: "8899001122", gender: "Male", wing: "Senior Secondary" },
    { sn: 14, name: "SHALINI MISHRA", contact: "7788990011", gender: "Female", wing: "Pre-Primary" },
    { sn: 15, name: "SUNITA VERMA", contact: "9900112233", gender: "Female", wing: "Middle" },
    { sn: 16, name: "VIKRAM PATEL", contact: "8811223344", gender: "Male", wing: "Primary" },
  ];

  // Subject Wise Teacher Details Data (Screenshot 3)
  const subjectWiseTeacherData = [
    { sn: 1, subjectName: "MATHEMATICS", teacherName: "MR. AMIT SHARMA", contact: "9876543211", designation: "PGT MATH" },
    { sn: 2, subjectName: "PHYSICS", teacherName: "MRS. NEHA GUPTA", contact: "8877665544", designation: "PGT PHYSICS" },
    { sn: 3, subjectName: "CHEMISTRY", teacherName: "MR. DEEPAK MISHRA", contact: "8765432109", designation: "PGT CHEMISTRY" },
    { sn: 4, subjectName: "BIOLOGY", teacherName: "MRS. PRIYA SINGH", contact: "9988776655", designation: "TGT SCIENCE" },
    { sn: 5, subjectName: "ENGLISH", teacherName: "MR. RAJESH KUMAR", contact: "8899001122", designation: "PGT ENGLISH" },
    { sn: 6, subjectName: "SOCIAL SCIENCE", teacherName: "MS. SUNITA VERMA", contact: "9900112233", designation: "TGT SOCIAL" },
    { sn: 7, subjectName: "HINDI", teacherName: "MR. VIKRAM PATEL", contact: "8811223344", designation: "PRT HINDI" },
    { sn: 8, subjectName: "COMPUTER SCIENCE", teacherName: "MS. POOJA JOSHI", contact: "7766554433", designation: "TGT COMP" },
    { sn: 9, subjectName: "ART & CRAFT", teacherName: "MRS. ANJALI ROY", contact: "9811223344", designation: "PRT ART" },
    { sn: 10, subjectName: "EDU SPORTS", teacherName: "MR. MANOJ TIWARI", contact: "9822334455", designation: "PRT SPORTS" },
  ];

  // Parallel Allocation Details Data (Screenshot 2)
  const parallelAllocationData = [
    { sn: 1, className: "11-A", subject: "MATHEMATICS", teacher: "MR. AMIT SHARMA", parallelClass: "11-B", parallelSubject: "BIOLOGY", parallelTeacher: "MRS. PRIYA SINGH" },
    { sn: 2, className: "11-A", subject: "COMPUTER SCIENCE", teacher: "MS. POOJA JOSHI", parallelClass: "11-B", parallelSubject: "PHYSICAL EDUCATION", parallelTeacher: "MR. MANOJ TIWARI" },
    { sn: 3, className: "12-A", subject: "MATHEMATICS", teacher: "MR. AMIT SHARMA", parallelClass: "12-B", parallelSubject: "BIOLOGY", parallelTeacher: "MRS. PRIYA SINGH" },
    { sn: 4, className: "12-A", subject: "COMPUTER SCIENCE", teacher: "MS. POOJA JOSHI", parallelClass: "12-B", parallelSubject: "HINDI CORE", parallelTeacher: "MR. VIKRAM PATEL" },
    { sn: 5, className: "9-A", subject: "HINDI", teacher: "MR. VIKRAM PATEL", parallelClass: "9-B", parallelSubject: "SANSKRIT", parallelTeacher: "MRS. ANITA VERMA" },
    { sn: 6, className: "10-A", subject: "HINDI", teacher: "MR. VIKRAM PATEL", parallelClass: "10-B", parallelSubject: "SANSKRIT", parallelTeacher: "MRS. ANITA VERMA" },
  ];

  // Consecutive Allocation Details Data (Screenshot 1)
  const consecutiveAllocationData = [
    { sn: 1, teacherName: "MR. AMIT SHARMA", className: "10-A", subject: "MATHEMATICS", consecutivePeriods: "P1 - P2 (2 Periods)", day: "Monday" },
    { sn: 2, teacherName: "MRS. NEHA GUPTA", className: "11-A", subject: "PHYSICS (LAB)", consecutivePeriods: "P3 - P4 (2 Periods)", day: "Tuesday" },
    { sn: 3, teacherName: "MR. DEEPAK MISHRA", className: "12-A", subject: "CHEMISTRY (LAB)", consecutivePeriods: "P5 - P6 (2 Periods)", day: "Wednesday" },
    { sn: 4, teacherName: "MRS. PRIYA SINGH", className: "9-A", subject: "BIOLOGY (LAB)", consecutivePeriods: "P1 - P2 (2 Periods)", day: "Thursday" },
    { sn: 5, teacherName: "MS. POOJA JOSHI", className: "10-B", subject: "COMPUTER APP (LAB)", consecutivePeriods: "P6 - P7 (2 Periods)", day: "Friday" },
    { sn: 6, teacherName: "MR. RAJESH KUMAR", className: "12-B", subject: "ENGLISH", consecutivePeriods: "P3 - P4 (2 Periods)", day: "Saturday" },
  ];

  // Class and Resource Details Data (Screenshot 2)
  const classAndResourceData = [
    { sn: 1, className: "10-A", subject: "PHYSICS", resourceName: "PHYSICS LAB", periodsPerWeek: 3 },
    { sn: 2, className: "10-A", subject: "CHEMISTRY", resourceName: "CHEMISTRY LAB", periodsPerWeek: 3 },
    { sn: 3, className: "10-A", subject: "BIOLOGY", resourceName: "BIOLOGY LAB", periodsPerWeek: 2 },
    { sn: 4, className: "10-A", subject: "COMPUTER APP", resourceName: "COMPUTER LAB 1", periodsPerWeek: 4 },
    { sn: 5, className: "10-A", subject: "ART & CRAFT", resourceName: "ART ROOM", periodsPerWeek: 2 },
    { sn: 6, className: "10-A", subject: "EDU SPORTS", resourceName: "PLAYGROUND", periodsPerWeek: 4 },
    { sn: 7, className: "11-A", subject: "PHYSICS", resourceName: "PHYSICS LAB", periodsPerWeek: 4 },
    { sn: 8, className: "11-A", subject: "CHEMISTRY", resourceName: "CHEMISTRY LAB", periodsPerWeek: 4 },
    { sn: 9, className: "12-A", subject: "COMPUTER SCIENCE", resourceName: "COMPUTER LAB 2", periodsPerWeek: 4 },
  ];

  // Week Wise Free Teacher Details Data (Screenshot 3)
  const weekWiseFreeTeacherData = [
    { sn: 1, teacherName: "MR. AMIT SHARMA", day: "Monday", freePeriods: "P3, P6, P8", totalFree: "3 Periods" },
    { sn: 2, teacherName: "MR. AMIT SHARMA", day: "Tuesday", freePeriods: "P4, P7", totalFree: "2 Periods" },
    { sn: 3, teacherName: "MRS. PRIYA SINGH", day: "Monday", freePeriods: "P1, P5, P8", totalFree: "3 Periods" },
    { sn: 4, teacherName: "MRS. PRIYA SINGH", day: "Wednesday", freePeriods: "P2, P6", totalFree: "2 Periods" },
    { sn: 5, teacherName: "MR. RAJESH KUMAR", day: "Thursday", freePeriods: "P3, P7, P8", totalFree: "3 Periods" },
    { sn: 6, teacherName: "MS. SUNITA VERMA", day: "Friday", freePeriods: "P1, P2, P5", totalFree: "3 Periods" },
    { sn: 7, teacherName: "MR. VIKRAM PATEL", day: "Saturday", freePeriods: "P4, P5, P8", totalFree: "3 Periods" },
    { sn: 8, teacherName: "MRS. NEHA GUPTA", day: "Tuesday", freePeriods: "P2, P6, P7", totalFree: "3 Periods" },
  ];

  // Free Teachers Classwise Data (Screenshot 4)
  const freeTeachersClasswiseData = [
    { sn: 1, className: "1-A", period: "Period 1 (08:00 - 08:45)", freeTeachers: "MR. AMIT SHARMA, MRS. NEHA GUPTA, MR. DEEPAK MISHRA" },
    { sn: 2, className: "1-A", period: "Period 2 (08:45 - 09:30)", freeTeachers: "MRS. PRIYA SINGH, MS. SUNITA VERMA" },
    { sn: 3, className: "1-A", period: "Period 3 (09:30 - 10:15)", freeTeachers: "MR. RAJESH KUMAR, MR. VIKRAM PATEL, MS. POOJA JOSHI" },
    { sn: 4, className: "1-A", period: "Period 4 (10:15 - 11:00)", freeTeachers: "MRS. KAVITA SHARMA, MRS. ANITA VERMA" },
    { sn: 5, className: "1-A", period: "Period 5 (11:30 - 12:15)", freeTeachers: "MR. MANOJ TIWARI, MRS. ANJALI ROY" },
    { sn: 6, className: "1-A", period: "Period 6 (12:15 - 01:00)", freeTeachers: "MR. AMIT SHARMA, MRS. PRIYA SINGH" },
    { sn: 7, className: "1-A", period: "Period 7 (01:00 - 01:40)", freeTeachers: "MR. DEEPAK MISHRA, MS. POOJA JOSHI" },
    { sn: 8, className: "1-A", period: "Period 8 (01:40 - 02:20)", freeTeachers: "MR. RAJESH KUMAR, MS. SUNITA VERMA, MR. VIKRAM PATEL" },
  ];

  // Unallocated Period Details Data (Screenshot 5)
  const unallocatedPeriodData = [
    { sn: 1, className: "11-A", subject: "PHYSICAL EDUCATION", requiredPeriods: 4, allocated: 0, unallocated: 4 },
    { sn: 2, className: "11-B", subject: "LEGAL STUDIES", requiredPeriods: 4, allocated: 0, unallocated: 4 },
    { sn: 3, className: "9-A", subject: "SANSKRIT", requiredPeriods: 3, allocated: 0, unallocated: 3 },
    { sn: 4, className: "9-B", subject: "FRENCH", requiredPeriods: 3, allocated: 0, unallocated: 3 },
    { sn: 5, className: "12-A", subject: "PSYCHOLOGY", requiredPeriods: 4, allocated: 0, unallocated: 4 },
  ];

  // Day Wise Free Teacher Details Data (Screenshot 1)
  const dayWiseFreeTeacherData = [
    { sn: 1, teacherName: "MR. AMIT SHARMA", wing: "Senior Secondary", freeBells: "Monday (P3, P6, P8), Tuesday (P4, P7)", totalFree: "5 Bells" },
    { sn: 2, teacherName: "MRS. PRIYA SINGH", wing: "Middle", freeBells: "Monday (P1, P5, P8), Wednesday (P2, P6)", totalFree: "5 Bells" },
    { sn: 3, teacherName: "MR. RAJESH KUMAR", wing: "Senior Secondary", freeBells: "Tuesday (P1, P5), Thursday (P3, P7, P8)", totalFree: "5 Bells" },
    { sn: 4, teacherName: "MS. SUNITA VERMA", wing: "Middle", freeBells: "Wednesday (P4, P7), Friday (P1, P2, P5)", totalFree: "5 Bells" },
    { sn: 5, teacherName: "MR. VIKRAM PATEL", wing: "Primary", freeBells: "Thursday (P2, P6), Saturday (P4, P5, P8)", totalFree: "5 Bells" },
    { sn: 6, teacherName: "MRS. NEHA GUPTA", wing: "Senior Secondary", freeBells: "Monday (P4, P7), Tuesday (P2, P6, P7)", totalFree: "5 Bells" },
    { sn: 7, teacherName: "MR. DEEPAK MISHRA", wing: "Senior Secondary", freeBells: "Wednesday (P1, P3), Friday (P4, P7, P8)", totalFree: "5 Bells" },
    { sn: 8, teacherName: "MS. POOJA JOSHI", wing: "Middle", freeBells: "Thursday (P1, P5), Saturday (P2, P3, P7)", totalFree: "5 Bells" },
  ];

  // Class and Subject Taught Data (Screenshot 2)
  const classAndSubjectTaughtData = [
    { sn: 1, className: "1-A", subject: "ENGLISH", teacherName: "MR. RAJESH KUMAR", periodsPerWeek: 8 },
    { sn: 2, className: "1-A", subject: "HINDI", teacherName: "MR. VIKRAM PATEL", periodsPerWeek: 8 },
    { sn: 3, className: "1-A", subject: "MATHEMATICS", teacherName: "MR. AMIT SHARMA", periodsPerWeek: 8 },
    { sn: 4, className: "1-A", subject: "E.V.S", teacherName: "MRS. PRIYA SINGH", periodsPerWeek: 6 },
    { sn: 5, className: "1-A", subject: "COMPUTER SCIENCE", teacherName: "MS. POOJA JOSHI", periodsPerWeek: 4 },
    { sn: 6, className: "1-A", subject: "DRAWING", teacherName: "MRS. ANJALI ROY", periodsPerWeek: 4 },
    { sn: 7, className: "1-A", subject: "EDU SPORTS", teacherName: "MR. MANOJ TIWARI", periodsPerWeek: 4 },
    { sn: 8, className: "1-A", subject: "GENERAL KNOWLEDGE", teacherName: "MRS. KAVITA SHARMA", periodsPerWeek: 2 },
    { sn: 9, className: "1-A", subject: "MUSIC", teacherName: "MS. POOJA JOSHI", periodsPerWeek: 2 },
  ];

  // Teachers Work Load Details Data (Screenshot 3)
  const teachersWorkLoadData = [
    { sn: 1, teacherName: "MR. AMIT SHARMA", designation: "PGT MATHEMATICS", teachingPeriods: 28, remedialLab: 4, totalWorkLoad: 32 },
    { sn: 2, teacherName: "MRS. NEHA GUPTA", designation: "PGT PHYSICS", teachingPeriods: 26, remedialLab: 6, totalWorkLoad: 32 },
    { sn: 3, teacherName: "MR. DEEPAK MISHRA", designation: "PGT CHEMISTRY", teachingPeriods: 26, remedialLab: 6, totalWorkLoad: 32 },
    { sn: 4, teacherName: "MRS. PRIYA SINGH", designation: "TGT SCIENCE", teachingPeriods: 28, remedialLab: 4, totalWorkLoad: 32 },
    { sn: 5, teacherName: "MR. RAJESH KUMAR", designation: "PGT ENGLISH", teachingPeriods: 30, remedialLab: 2, totalWorkLoad: 32 },
    { sn: 6, teacherName: "MS. SUNITA VERMA", designation: "TGT SOCIAL SCIENCE", teachingPeriods: 30, remedialLab: 2, totalWorkLoad: 32 },
    { sn: 7, teacherName: "MR. VIKRAM PATEL", designation: "PRT HINDI", teachingPeriods: 32, remedialLab: 0, totalWorkLoad: 32 },
    { sn: 8, teacherName: "MS. POOJA JOSHI", designation: "TGT COMPUTER SCIENCE", teachingPeriods: 24, remedialLab: 8, totalWorkLoad: 32 },
    { sn: 9, teacherName: "MR. MANOJ TIWARI", designation: "PRT SPORTS / YOGA", teachingPeriods: 30, remedialLab: 2, totalWorkLoad: 32 },
    { sn: 10, teacherName: "MRS. ANJALI ROY", designation: "PRT ART & CRAFT", teachingPeriods: 28, remedialLab: 2, totalWorkLoad: 30 },
  ];

  // Resource Timetable Details Data (Screenshot 4)
  const resourceTimetableData = [
    { sn: 1, resourceName: "PHYSICS LAB", day: "Monday", period: "P3 - P4", className: "11-A", teacherInCharge: "MRS. NEHA GUPTA" },
    { sn: 2, resourceName: "PHYSICS LAB", day: "Tuesday", period: "P5 - P6", className: "12-A", teacherInCharge: "MRS. NEHA GUPTA" },
    { sn: 3, resourceName: "CHEMISTRY LAB", day: "Monday", period: "P1 - P2", className: "12-A", teacherInCharge: "MR. DEEPAK MISHRA" },
    { sn: 4, resourceName: "CHEMISTRY LAB", day: "Wednesday", period: "P3 - P4", className: "11-A", teacherInCharge: "MR. DEEPAK MISHRA" },
    { sn: 5, resourceName: "BIOLOGY LAB", day: "Tuesday", period: "P1 - P2", className: "10-A", teacherInCharge: "MRS. PRIYA SINGH" },
    { sn: 6, resourceName: "BIOLOGY LAB", day: "Thursday", period: "P5 - P6", className: "9-A", teacherInCharge: "MRS. PRIYA SINGH" },
    { sn: 7, resourceName: "COMPUTER LAB 1", day: "Monday", period: "P7 - P8", className: "10-A", teacherInCharge: "MS. POOJA JOSHI" },
    { sn: 8, resourceName: "COMPUTER LAB 1", day: "Friday", period: "P1 - P2", className: "9-B", teacherInCharge: "MS. POOJA JOSHI" },
    { sn: 9, resourceName: "ART ROOM", day: "Wednesday", period: "P7 - P8", className: "1-A", teacherInCharge: "MRS. ANJALI ROY" },
    { sn: 10, resourceName: "PLAYGROUND", day: "Thursday", period: "P7 - P8", className: "1-A", teacherInCharge: "MR. MANOJ TIWARI" },
  ];

  // Class Wise Teacher Allocation Details Data (Screenshot 1)
  const classWiseTeacherAllocationData = [
    { sn: 1, className: "1-A", subject: "ENGLISH", teacherName: "MR. RAJESH KUMAR", periodsPerWeek: 8, designation: "PGT ENGLISH" },
    { sn: 2, className: "1-A", subject: "HINDI", teacherName: "MR. VIKRAM PATEL", periodsPerWeek: 8, designation: "PRT HINDI" },
    { sn: 3, className: "1-A", subject: "MATHEMATICS", teacherName: "MR. AMIT SHARMA", periodsPerWeek: 8, designation: "PGT MATHEMATICS" },
    { sn: 4, className: "1-A", subject: "E.V.S", teacherName: "MRS. PRIYA SINGH", periodsPerWeek: 6, designation: "TGT SCIENCE" },
    { sn: 5, className: "1-A", subject: "COMPUTER SCIENCE", teacherName: "MS. POOJA JOSHI", periodsPerWeek: 4, designation: "TGT COMPUTER" },
    { sn: 6, className: "1-A", subject: "DRAWING", teacherName: "MRS. ANJALI ROY", periodsPerWeek: 4, designation: "PRT ART" },
    { sn: 7, className: "1-A", subject: "EDU SPORTS", teacherName: "MR. MANOJ TIWARI", periodsPerWeek: 4, designation: "PRT SPORTS" },
    { sn: 8, className: "1-A", subject: "GENERAL KNOWLEDGE", teacherName: "MRS. KAVITA SHARMA", periodsPerWeek: 2, designation: "PRT TEACHER" },
    { sn: 9, className: "1-A", subject: "MUSIC", teacherName: "MS. POOJA JOSHI", periodsPerWeek: 2, designation: "TGT MUSIC" },
    { sn: 10, className: "10-A", subject: "MATHEMATICS", teacherName: "MR. AMIT SHARMA", periodsPerWeek: 7, designation: "PGT MATHEMATICS" },
    { sn: 11, className: "10-A", subject: "PHYSICS", teacherName: "MRS. NEHA GUPTA", periodsPerWeek: 6, designation: "PGT PHYSICS" },
    { sn: 12, className: "10-A", subject: "CHEMISTRY", teacherName: "MR. DEEPAK MISHRA", periodsPerWeek: 6, designation: "PGT CHEMISTRY" },
    { sn: 13, className: "10-A", subject: "BIOLOGY", teacherName: "MRS. PRIYA SINGH", periodsPerWeek: 6, designation: "TGT SCIENCE" },
    { sn: 14, className: "10-A", subject: "ENGLISH", teacherName: "MR. RAJESH KUMAR", periodsPerWeek: 6, designation: "PGT ENGLISH" },
    { sn: 15, className: "10-A", subject: "SOCIAL SCIENCE", teacherName: "MS. SUNITA VERMA", periodsPerWeek: 6, designation: "TGT SOCIAL SCIENCE" },
    { sn: 16, className: "10-A", subject: "HINDI", teacherName: "MR. VIKRAM PATEL", periodsPerWeek: 5, designation: "PRT HINDI" },
    { sn: 17, className: "10-A", subject: "COMPUTER APP", teacherName: "MS. POOJA JOSHI", periodsPerWeek: 4, designation: "TGT COMPUTER" },
    { sn: 18, className: "12-A", subject: "MATHEMATICS", teacherName: "MR. AMIT SHARMA", periodsPerWeek: 8, designation: "PGT MATHEMATICS" },
    { sn: 19, className: "12-A", subject: "PHYSICS", teacherName: "MRS. NEHA GUPTA", periodsPerWeek: 8, designation: "PGT PHYSICS" },
    { sn: 20, className: "12-A", subject: "CHEMISTRY", teacherName: "MR. DEEPAK MISHRA", periodsPerWeek: 8, designation: "PGT CHEMISTRY" },
    { sn: 21, className: "12-A", subject: "ENGLISH CORE", teacherName: "MR. RAJESH KUMAR", periodsPerWeek: 7, designation: "PGT ENGLISH" },
    { sn: 22, className: "12-A", subject: "COMPUTER SCIENCE", teacherName: "MS. POOJA JOSHI", periodsPerWeek: 7, designation: "TGT COMPUTER" },
  ];

  // Date Wise Substitution Details Data (Screenshot 2)
  const dateWiseSubstitutionData = [
    { sn: 1, date: "01-Sep-2026", className: "10-A", period: "Period 2 (08:45-09:30)", absentTeacher: "MR. AMIT SHARMA", substituteTeacher: "MR. VIKRAM PATEL", subject: "MATHEMATICS" },
    { sn: 2, date: "01-Sep-2026", className: "11-A", period: "Period 3 (09:30-10:15)", absentTeacher: "MRS. NEHA GUPTA", substituteTeacher: "MR. DEEPAK MISHRA", subject: "PHYSICS" },
    { sn: 3, date: "01-Sep-2026", className: "9-B", period: "Period 4 (10:15-11:00)", absentTeacher: "MRS. PRIYA SINGH", substituteTeacher: "MS. SUNITA VERMA", subject: "BIOLOGY" },
    { sn: 4, date: "01-Sep-2026", className: "12-A", period: "Period 5 (11:30-12:15)", absentTeacher: "MR. RAJESH KUMAR", substituteTeacher: "MS. POOJA JOSHI", subject: "ENGLISH" },
    { sn: 5, date: "01-Sep-2026", className: "8-A", period: "Period 1 (08:00-08:45)", absentTeacher: "MS. SUNITA VERMA", substituteTeacher: "MRS. ANITA VERMA", subject: "SOCIAL SCIENCE" },
    { sn: 6, date: "01-Sep-2026", className: "6-C", period: "Period 6 (12:15-01:00)", absentTeacher: "MR. MANOJ TIWARI", substituteTeacher: "MR. ASHISH KUMAR", subject: "EDU SPORTS" },
    { sn: 7, date: "01-Sep-2026", className: "7-B", period: "Period 7 (01:00-01:40)", absentTeacher: "MRS. ANJALI ROY", substituteTeacher: "MRS. ARCHANA YADAV", subject: "ART & CRAFT" },
    { sn: 8, date: "01-Sep-2026", className: "1-A", period: "Period 8 (01:40-02:20)", absentTeacher: "MRS. KAVITA SHARMA", substituteTeacher: "MRS. SHALINI MISHRA", subject: "GENERAL KNOWLEDGE" },
  ];

  // Assignment Status Data (Screenshot 3)
  const assignmentStatusData = [
    { sn: 1, className: "NUR-A", subject: "ENGLISH", teacherName: "MRS. KAVITA SHARMA", requiredPeriods: 8, assignedPeriods: 8, status: "Completed" },
    { sn: 2, className: "NUR-A", subject: "HINDI", teacherName: "MRS. ANITA VERMA", requiredPeriods: 8, assignedPeriods: 8, status: "Completed" },
    { sn: 3, className: "NUR-A", subject: "MATHEMATICS", teacherName: "MRS. KAVITA SHARMA", requiredPeriods: 8, assignedPeriods: 8, status: "Completed" },
    { sn: 4, className: "1-A", subject: "ENGLISH", teacherName: "MR. RAJESH KUMAR", requiredPeriods: 8, assignedPeriods: 8, status: "Completed" },
    { sn: 5, className: "1-A", subject: "HINDI", teacherName: "MR. VIKRAM PATEL", requiredPeriods: 8, assignedPeriods: 8, status: "Completed" },
    { sn: 6, className: "1-A", subject: "MATHEMATICS", teacherName: "MR. AMIT SHARMA", requiredPeriods: 8, assignedPeriods: 8, status: "Completed" },
    { sn: 7, className: "1-A", subject: "E.V.S", teacherName: "MRS. PRIYA SINGH", requiredPeriods: 6, assignedPeriods: 6, status: "Completed" },
    { sn: 8, className: "1-A", subject: "COMPUTER SCIENCE", teacherName: "MS. POOJA JOSHI", requiredPeriods: 4, assignedPeriods: 4, status: "Completed" },
    { sn: 9, className: "10-A", subject: "MATHEMATICS", teacherName: "MR. AMIT SHARMA", requiredPeriods: 7, assignedPeriods: 7, status: "Completed" },
    { sn: 10, className: "10-A", subject: "PHYSICS", teacherName: "MRS. NEHA GUPTA", requiredPeriods: 6, assignedPeriods: 6, status: "Completed" },
    { sn: 11, className: "10-A", subject: "CHEMISTRY", teacherName: "MR. DEEPAK MISHRA", requiredPeriods: 6, assignedPeriods: 6, status: "Completed" },
    { sn: 12, className: "11-A", subject: "PHYSICAL EDUCATION", teacherName: "MR. MANOJ TIWARI", requiredPeriods: 4, assignedPeriods: 0, status: "Pending" },
    { sn: 13, className: "11-B", subject: "LEGAL STUDIES", teacherName: "MR. RAJESH KUMAR", requiredPeriods: 4, assignedPeriods: 0, status: "Pending" },
    { sn: 14, className: "12-A", subject: "MATHEMATICS", teacherName: "MR. AMIT SHARMA", requiredPeriods: 8, assignedPeriods: 8, status: "Completed" },
    { sn: 15, className: "12-A", subject: "PHYSICS", teacherName: "MRS. NEHA GUPTA", requiredPeriods: 8, assignedPeriods: 8, status: "Completed" },
  ];

  // Subject Summary Data (Screenshot 4)
  const subjectSummaryData = [
    { sn: 1, subjectCode: "ENG01", subjectName: "ENGLISH", totalPeriods: 128, teachersAllocated: "4 Teachers", status: "Active" },
    { sn: 2, subjectCode: "HIN01", subjectName: "HINDI", totalPeriods: 116, teachersAllocated: "4 Teachers", status: "Active" },
    { sn: 3, subjectCode: "MTH01", subjectName: "MATHEMATICS", totalPeriods: 134, teachersAllocated: "3 Teachers", status: "Active" },
    { sn: 4, subjectCode: "SCI01", subjectName: "SCIENCE / E.V.S", totalPeriods: 86, teachersAllocated: "3 Teachers", status: "Active" },
    { sn: 5, subjectCode: "PHY01", subjectName: "PHYSICS", totalPeriods: 38, teachersAllocated: "2 Teachers", status: "Active" },
    { sn: 6, subjectCode: "CHE01", subjectName: "CHEMISTRY", totalPeriods: 38, teachersAllocated: "2 Teachers", status: "Active" },
    { sn: 7, subjectCode: "BIO01", subjectName: "BIOLOGY", totalPeriods: 32, teachersAllocated: "2 Teachers", status: "Active" },
    { sn: 8, subjectCode: "SOC01", subjectName: "SOCIAL SCIENCE", totalPeriods: 72, teachersAllocated: "3 Teachers", status: "Active" },
    { sn: 9, subjectCode: "CMP01", subjectName: "COMPUTER SCIENCE / IT", totalPeriods: 64, teachersAllocated: "2 Teachers", status: "Active" },
    { sn: 10, subjectCode: "ART01", subjectName: "ART & CRAFT", totalPeriods: 48, teachersAllocated: "2 Teachers", status: "Active" },
    { sn: 11, subjectCode: "SPT01", subjectName: "SPORTS & YOGA", totalPeriods: 56, teachersAllocated: "2 Teachers", status: "Active" },
    { sn: 12, subjectCode: "MUS01", subjectName: "MUSIC & DANCE", totalPeriods: 36, teachersAllocated: "2 Teachers", status: "Active" },
    { sn: 13, subjectCode: "SAN01", subjectName: "SANSKRIT", totalPeriods: 24, teachersAllocated: "1 Teacher", status: "Active" },
    { sn: 14, subjectCode: "BST01", subjectName: "BUSINESS STUDIES", totalPeriods: 16, teachersAllocated: "1 Teacher", status: "Active" },
    { sn: 15, subjectCode: "ACC01", subjectName: "ACCOUNTANCY", totalPeriods: 16, teachersAllocated: "1 Teacher", status: "Active" },
    { sn: 16, subjectCode: "ECO01", subjectName: "ECONOMICS", totalPeriods: 16, teachersAllocated: "1 Teacher", status: "Active" },
  ];

  // Subject Wise Teacher Allocation Table Data (Screenshot 5)
  const subjectWiseTeacherAllocationTableData = [
    { sn: 1, subjectName: "ENGLISH", subjectCode: "ENG01", classSection: "1-A, 1-B, 2-A, 2-B", teacherName: "MR. RAJESH KUMAR", periodsPerWeek: 32, roomLab: "Classrooms", contact: "8899001122" },
    { sn: 2, subjectName: "HINDI", subjectCode: "HIN01", classSection: "1-A, 1-B, 2-A, 2-B", teacherName: "MR. VIKRAM PATEL", periodsPerWeek: 32, roomLab: "Classrooms", contact: "8811223344" },
    { sn: 3, subjectName: "MATHEMATICS", subjectCode: "MTH01", classSection: "10-A, 10-B, 11-A, 12-A", teacherName: "MR. AMIT SHARMA", periodsPerWeek: 28, roomLab: "Math Lab", contact: "9876543211" },
    { sn: 4, subjectName: "PHYSICS", subjectCode: "PHY01", classSection: "10-A, 11-A, 12-A", teacherName: "MRS. NEHA GUPTA", periodsPerWeek: 26, roomLab: "Physics Lab", contact: "8877665544" },
    { sn: 5, subjectName: "CHEMISTRY", subjectCode: "CHE01", classSection: "10-A, 11-A, 12-A", teacherName: "MR. DEEPAK MISHRA", periodsPerWeek: 26, roomLab: "Chemistry Lab", contact: "8765432109" },
    { sn: 6, subjectName: "BIOLOGY", subjectCode: "BIO01", classSection: "9-A, 10-A, 11-A, 12-A", teacherName: "MRS. PRIYA SINGH", periodsPerWeek: 28, roomLab: "Biology Lab", contact: "9988776655" },
    { sn: 7, subjectName: "SOCIAL SCIENCE", subjectCode: "SOC01", classSection: "8-A, 9-A, 10-A", teacherName: "MS. SUNITA VERMA", periodsPerWeek: 30, roomLab: "Classrooms", contact: "9900112233" },
    { sn: 8, subjectName: "COMPUTER SCIENCE", subjectCode: "CMP01", classSection: "9-A, 10-A, 11-A, 12-A", teacherName: "MS. POOJA JOSHI", periodsPerWeek: 24, roomLab: "Computer Lab 1", contact: "7766554433" },
    { sn: 9, subjectName: "ART & CRAFT", subjectCode: "ART01", classSection: "1-A to 5-A", teacherName: "MRS. ANJALI ROY", periodsPerWeek: 28, roomLab: "Art Room", contact: "9811223344" },
    { sn: 10, subjectName: "EDU SPORTS", subjectCode: "SPT01", classSection: "All Wings", teacherName: "MR. MANOJ TIWARI", periodsPerWeek: 30, roomLab: "Playground", contact: "9822334455" },
    { sn: 11, subjectName: "PRE-PRIMARY ALL", subjectCode: "PRP01", classSection: "NUR-A, LKG-A", teacherName: "MRS. KAVITA SHARMA", periodsPerWeek: 28, roomLab: "Activity Room", contact: "9876543210" },
    { sn: 12, subjectName: "PRE-PRIMARY ALL", subjectCode: "PRP02", classSection: "NUR-B, LKG-B", teacherName: "MRS. SHALINI MISHRA", periodsPerWeek: 28, roomLab: "Activity Room", contact: "7788990011" },
  ];

  // Timetable Log Data (Screenshot 1)
  const timetableLogs = [
    { sno: 1, generateTime: "01-Sep-2026 10:15 AM" },
    { sno: 2, generateTime: "31-Aug-2026 04:30 PM" },
    { sno: 3, generateTime: "30-Aug-2026 11:00 AM" },
    { sno: 4, generateTime: "29-Aug-2026 02:15 PM" },
    { sno: 5, generateTime: "28-Aug-2026 09:45 AM" },
  ];

  // Mock Class Timetable Matrix
  const classTimetableData = [
    { day: "Monday", p1: "Math (AS)", p2: "Physics (NG)", p3: "Chem (DM)", p4: "English (RK)", recess: "RECESS", p5: "Hindi (VP)", p6: "Bio (PS)", p7: "Comp (PJ)", p8: "Sports (MT)" },
    { day: "Tuesday", p1: "Physics (NG)", p2: "Math (AS)", p3: "English (RK)", p4: "Chem (DM)", recess: "RECESS", p5: "Social (SV)", p6: "Hindi (VP)", p7: "Sports (MT)", p8: "Library" },
    { day: "Wednesday", p1: "Chem (DM)", p2: "Physics (NG)", p3: "Math (AS)", p4: "Bio (PS)", recess: "RECESS", p5: "English (RK)", p6: "Comp (PJ)", p7: "Art (AR)", p8: "Music" },
    { day: "Thursday", p1: "English (RK)", p2: "Math (AS)", p3: "Physics (NG)", p4: "Social (SV)", recess: "RECESS", p5: "Chem (DM)", p6: "Hindi (VP)", p7: "Yoga (MT)", p8: "Bio (PS)" },
    { day: "Friday", p1: "Bio (PS)", p2: "English (RK)", p3: "Math (AS)", p4: "Physics (NG)", recess: "RECESS", p5: "Comp (PJ)", p6: "Chem (DM)", p7: "Social (SV)", p8: "Activity" },
    { day: "Saturday", p1: "Math (AS)", p2: "Physics (NG)", p3: "Chem (DM)", p4: "English (RK)", recess: "RECESS", p5: "Club Act", p6: "House Meet", p7: "Counseling", p8: "Free" },
  ];

  // Teachers List
  const teachersList = [
    "All Teachers",
    "None selected",
    "Mr. Amit Sharma (PGT Math)",
    "Mrs. Priya Singh (TGT Science)",
    "Mr. Rajesh Kumar (PGT English)",
    "Ms. Sunita Verma (TGT Social)",
    "Mr. Vikram Patel (PRT Hindi)",
    "Mrs. Neha Gupta (PGT Physics)",
    "Mr. Deepak Mishra (PGT Chemistry)",
    "Ms. Pooja Joshi (TGT Computer)",
    "Mr. Manoj Tiwari (PRT Sports)",
    "Mrs. Anjali Roy (PRT Art)",
  ];

  // Formats List
  const formatsList = ["Format 1", "Format 2", "Format 3"];

  // Days List
  const daysList = ["All Days", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // Wings List (Matching Screenshot 4)
  const wingsList = ["All Wings", "Higher", "Kindergarten", "Middle", "Pre-Primary", "Primary", "Senior Secondary"];

  
  const handleShowClick = async () => {
    if (tabId === "particular_class_timetable_details" || tabId === "class_timetable_details") {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        let parts = selectedClass.split('-');
        let cl = parts[0] || selectedClass;
        let sec = parts[1] || '';
        
        const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/timetables?class=${encodeURIComponent(cl)}&section=${encodeURIComponent(sec)}`;
        const response = await fetch(apiUrl, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
          const data = await response.json();
          const transformed = {};
          let slots = [];
          
          if (data.schedule && data.schedule.length > 0) {
            const refDay = data.schedule.reduce((prev, curr) => (curr.periods.length > prev.periods.length ? curr : prev), data.schedule[0]);
            if (refDay && refDay.periods) {
              slots = refDay.periods.map(p => ({
                period: p.periodName,
                time: `${p.startTime} - ${p.endTime}`,
                isBreak: p.isBreak
              }));
            }
            
            data.schedule.forEach(daySchedule => {
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
          setError('Failed to fetch timetable.');
        }
      } catch (err) {
        setError('Network error.');
      }
      setLoading(false);
    }
    
    setShowReport(true);
    showToast(`Generated ${reportHeading} report preview`);
  };


  // Determine Title Banner Text based on tabId and selected options
  const getBannerTitle = () => {
    if (tabId === "subject_details") return "SUBJECTS As on 01-Sep-2026";
    if (tabId === "class_teacher_details") return "CLASS TEACHERS DETAIL As on 01-Sep-2026";
    if (tabId === "wing_wise_teacher_details") return "TEACHERS WING WISE As on 01-Sep-2026";
    if (tabId === "subject_wise_teacher_details") return "SUBJECT WISE TEACHER DETAILS As on 01-Sep-2026";
    if (tabId === "parallel_allocation_details") return "PARALLEL ALLOCATION DETAILS As on 01-Sep-2026";
    if (tabId === "consecutive_allocation_details") return "CONSECUTIVE ALLOCATION DETAILS As on 01-Sep-2026";
    if (tabId === "class_and_resource_details") return "CLASS AND RESOURCE DETAILS As on 01-Sep-2026";
    if (tabId === "week_wise_free_teacher_details") return "WEEK WISE FREE TEACHER DETAILS As on 01-Sep-2026";
    if (tabId === "free_teachers_classwise") return "FREE TEACHERS CLASSWISE As on 01-Sep-2026";
    if (tabId === "unallocated_period_details") return "UNALLOCATED PERIOD DETAILS As on 01-Sep-2026";
    if (tabId === "day_wise_free_teacher_details") return "DAY WISE FREE TEACHER DETAILS As on 01-Sep-2026";
    if (tabId === "class_and_subject_taught") return "CLASS AND SUBJECT TAUGHT As on 01-Sep-2026";
    if (tabId === "teachers_work_load_details") return "TEACHERS WORK LOAD DETAILS As on 01-Sep-2026";
    if (tabId === "resource_timetable_details") return "RESOURCE TIMETABLE DETAILS As on 01-Sep-2026";
    if (tabId === "particular_class_timetable_details") return `CLASS TIMETABLE (${selectedClass === "Select Class" ? "1-A" : selectedClass}) As on 01-Sep-2026`;
    if (tabId === "class_wise_teacher_allocation_details") return "CLASS WISE TEACHER ALLOCATION DETAILS As on 01-Sep-2026";
    if (tabId === "date_wise_substitution_details") return "DATE WISE SUBSTITUTION DETAILS As on 01-Sep-2026";
    if (tabId === "assignment_status") return "ASSIGNMENT STATUS As on 01-Sep-2026";
    if (tabId === "subject_summary") return "SUBJECT SUMMARY As on 01-Sep-2026";
    if (tabId === "show_timetable_at_glance") return "SHOW TIMETABLE AT GLANCE As on 01-Sep-2026";
    if (tabId === "master_requirement") {
      if (selectedMasterOption === "Class List") return "CLASS LIST As on 01-Sep-2026";
      if (selectedMasterOption === "Subject List") return "SUBJECT LIST As on 01-Sep-2026";
      if (selectedMasterOption === "Teacher,Class,Subject,No. Of Periods")
        return "TEACHER, CLASS, SUBJECT, NO. OF PERIODS As on 01-Sep-2026";
      if (selectedMasterOption === "Subject Taught ByTeacher")
        return "SUBJECT TAUGHT BY TEACHER As on 01-Sep-2026";
      if (selectedMasterOption === "Class Teachers Detail")
        return "CLASS TEACHERS DETAIL As on 01-Sep-2026";
    }
    return `${reportHeading.toUpperCase()} As on 01-Sep-2026`;
  };

  // Determine Footer Report Name dynamically matching Image 2
  const getFooterReportName = () => {
    if (tabId === "subject_details") return "Subjects";
    if (tabId === "class_teacher_details") return "Class Teachers Detail";
    if (tabId === "wing_wise_teacher_details") return "Teachers Wing Wise";
    if (tabId === "subject_wise_teacher_details") return "Subject Wise Teacher Details";
    if (tabId === "parallel_allocation_details") return "Parallel Allocation Details";
    if (tabId === "consecutive_allocation_details") return "Consecutive Allocation Details";
    if (tabId === "class_and_resource_details") return "Class and Resource Details";
    if (tabId === "week_wise_free_teacher_details") return "Week Wise Free Teacher Details";
    if (tabId === "free_teachers_classwise") return "Free Teachers Classwise";
    if (tabId === "unallocated_period_details") return "Unallocated Period Details";
    if (tabId === "day_wise_free_teacher_details") return "Day Wise Free Teacher Details";
    if (tabId === "class_and_subject_taught") return "Class and Subject Taught";
    if (tabId === "teachers_work_load_details") return "Teachers Work Load Details";
    if (tabId === "resource_timetable_details") return "Resource Timetable Details";
    if (tabId === "particular_class_timetable_details") return "Particular Class Timetable Details";
    if (tabId === "class_wise_teacher_allocation_details") return "Class Wise Teacher Allocation Details";
    if (tabId === "date_wise_substitution_details") return "Date Wise Substitution Details";
    if (tabId === "assignment_status") return "Assignment Status";
    if (tabId === "subject_summary") return "Subject Summary";
    if (tabId === "show_timetable_at_glance") return "Show Timetable At Glance";
    if (tabId === "master_requirement") {
      if (selectedMasterOption === "Class List") return "Class List";
      if (selectedMasterOption === "Subject List") return "Subject List";
      if (selectedMasterOption === "Teacher,Class,Subject,No. Of Periods")
        return "Teacher, Class, Subject, No. Of Periods";
      if (selectedMasterOption === "Subject Taught ByTeacher")
        return "Subject Taught By Teacher";
      if (selectedMasterOption === "Class Teachers Detail")
        return "Class Teachers Detail";
    }
    return reportHeading;
  };

  // -------------------- SPECIAL VIEW 1: SHOW TIMETABLE LOG (SCREENSHOT 1) --------------------
  if (tabId === "show_timetable_log") {
    return (
      <div className="bg-white border border-gray-300 rounded-b rounded-tr shadow-xs p-5 min-h-[750px] flex flex-col select-none font-sans">
        {/* Top Refresh Button Matching Screenshot 1 */}
        <div className="flex justify-center mb-4">
          <button
            type="button"
            onClick={() => showToast("Refreshed Timetable Log")}
            className="border border-[#f59e0b] text-[#d97706] hover:bg-amber-50 px-4 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
          >
            <FaSyncAlt className="text-xs" />
            <span>Refresh</span>
          </button>
        </div>

        {/* Timetable Log Table Matching Screenshot 1 */}
        <div className="border border-gray-200 rounded overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-white border-b border-gray-200 text-gray-900 font-bold">
              <tr>
                <th className="py-2.5 px-4 w-32 border-r border-gray-100">SNo.</th>
                <th className="py-2.5 px-6 border-r border-gray-100">Generate Time</th>
                <th className="py-2.5 px-6">View Log</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {timetableLogs.map((log) => (
                <tr key={log.sno} className="hover:bg-gray-50/80">
                  <td className="py-2.5 px-4 border-r border-gray-100 text-gray-800">{log.sno}</td>
                  <td className="py-2.5 px-6 border-r border-gray-100 font-medium text-gray-900">{log.generateTime}</td>
                  <td className="py-2.5 px-6">
                    <button
                      type="button"
                      onClick={() => showToast(`Opening log for ${log.generateTime}`)}
                      className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer font-medium"
                    >
                      View Log
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // -------------------- SPECIAL VIEW 2: SUBJECT WISE TEACHER ALLOCATION DETAILS (SCREENSHOT 5) --------------------
  if (tabId === "subject_wise_teacher_allocation_details") {
    return (
      <div className="bg-white border border-gray-300 rounded-b rounded-tr shadow-xs p-6 min-h-[750px] flex flex-col select-none font-sans">
        {/* Top Header Matching Screenshot 5: Title on Left, Export Button on Top Right */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-gray-800 tracking-tight">Subject Wise Teacher</h2>
          <button
            type="button"
            onClick={() => showToast("Exporting Subject Wise Teacher details to Excel...")}
            className="border border-[#00a2db] text-[#00a2db] hover:bg-sky-50 px-4 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
          >
            <FaFileExcel className="text-green-600 text-xs" />
            <span>Export to excel</span>
          </button>
        </div>

        {/* Subject Wise Teacher Table */}
        <div className="border border-gray-200 rounded overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#f8fafc] border-b border-gray-200 text-gray-900 font-bold">
              <tr>
                <th className="py-2.5 px-3 w-16 border-r border-gray-200">SNo.</th>
                <th className="py-2.5 px-4 border-r border-gray-200">Subject Name</th>
                <th className="py-2.5 px-3 border-r border-gray-200">Code</th>
                <th className="py-2.5 px-4 border-r border-gray-200">Class & Section</th>
                <th className="py-2.5 px-4 border-r border-gray-200">Allocated Teacher</th>
                <th className="py-2.5 px-3 border-r border-gray-200 text-center">Periods/Wk</th>
                <th className="py-2.5 px-4 border-r border-gray-200">Room / Lab</th>
                <th className="py-2.5 px-4">Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-700">
              {subjectWiseTeacherAllocationTableData.map((row) => (
                <tr key={row.sn} className="hover:bg-gray-50/80">
                  <td className="py-2 px-3 border-r border-gray-200 text-gray-800">{row.sn}</td>
                  <td className="py-2 px-4 border-r border-gray-200 font-semibold text-gray-900 uppercase">{row.subjectName}</td>
                  <td className="py-2 px-3 border-r border-gray-200 font-mono text-gray-600">{row.subjectCode}</td>
                  <td className="py-2 px-4 border-r border-gray-200 font-medium text-gray-800">{row.classSection}</td>
                  <td className="py-2 px-4 border-r border-gray-200 font-semibold text-blue-800 uppercase">{row.teacherName}</td>
                  <td className="py-2 px-3 border-r border-gray-200 text-center font-bold text-gray-900">{row.periodsPerWeek}</td>
                  <td className="py-2 px-4 border-r border-gray-200 text-gray-600">{row.roomLab}</td>
                  <td className="py-2 px-4 font-mono text-gray-700">{row.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // -------------------- STANDARD SPLITTER & LETTERHEAD PREVIEW VIEW --------------------
  return (
    <div className="bg-white border border-gray-300 rounded-b rounded-tr shadow-xs flex min-h-[750px] overflow-hidden select-none">
      {/* -------------------- LEFT FILTERS SIDEBAR -------------------- */}
      <div
        className={`${
          isFilterCollapsed ? "w-0 p-0 border-none overflow-hidden" : "w-72 p-4 border-r border-gray-200"
        } bg-white flex flex-col gap-4 relative shrink-0 transition-all duration-200`}
      >
        {/* CASE 1: MASTER REQUIREMENT 5 RADIO BUTTONS (SCREENSHOT 2, 3, 4, 5) */}
        {tabId === "master_requirement" && (
          <div className="flex flex-col gap-2.5 pt-1">
            {masterRequirementOptions.map((opt) => (
              <label
                key={opt}
                className="flex items-center gap-2.5 text-xs text-gray-800 font-medium cursor-pointer hover:text-blue-600 select-none"
              >
                <input
                  type="radio"
                  name="masterRequirementOption"
                  value={opt}
                  checked={selectedMasterOption === opt}
                  onChange={(e) => {
                    setSelectedMasterOption(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-3.5 h-3.5 text-[#00a2db] focus:ring-[#00a2db] cursor-pointer"
                />
                <span className="leading-tight">{opt}</span>
              </label>
            ))}
          </div>
        )}

        {/* CASE 1B: SHOW TIMETABLE AT GLANCE 6 RADIO BUTTONS (SCREENSHOT 1) */}
        {tabId === "show_timetable_at_glance" && (
          <div className="flex flex-col gap-2.5 pt-1">
            {glanceOptions.map((opt) => (
              <label
                key={opt}
                className="flex items-center gap-2.5 text-xs text-gray-800 font-medium cursor-pointer hover:text-blue-600 select-none"
              >
                <input
                  type="radio"
                  name="glanceOption"
                  value={opt}
                  checked={selectedGlanceOption === opt}
                  onChange={(e) => {
                    setSelectedGlanceOption(e.target.value);
                  }}
                  className="w-3.5 h-3.5 text-[#00a2db] focus:ring-[#00a2db] cursor-pointer"
                />
                <span className="leading-tight">{opt}</span>
              </label>
            ))}
          </div>
        )}

        {/* CASE 2A: WING FILTER (Screenshot 4 - Wing Wise Teacher & Screenshot 3 - Week Wise Free Teacher) */}
        {(tabId === "wing_wise_teacher_details" || tabId === "week_wise_free_teacher_details") && (
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-800">Select Wing(s)</label>
            <div className="relative">
              <select
                value={selectedWing}
                onChange={(e) => setSelectedWing(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded px-2.5 py-1.5 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs"
              >
                {wingsList.map((w) => (
                  <option key={w} value={w}>{w}</option>
                ))}
              </select>
              <FaAngleDown className="absolute right-2.5 top-2.5 text-[10px] pointer-events-none text-gray-400" />
            </div>
          </div>
        )}

        {/* CASE 2B: DAY WISE FREE TEACHER DETAILS (Screenshot 1 - Select Wing(s) + All Days Free Bell) */}
        {tabId === "day_wise_free_teacher_details" && (
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-800">Select Wing(s)</label>
              <div className="relative">
                <select
                  value={selectedWing}
                  onChange={(e) => setSelectedWing(e.target.value)}
                  className="w-full text-xs border border-gray-300 rounded px-2.5 py-1.5 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs"
                >
                  {wingsList.map((w) => (
                    <option key={w} value={w}>{w}</option>
                  ))}
                </select>
                <FaAngleDown className="absolute right-2.5 top-2.5 text-[10px] pointer-events-none text-gray-400" />
              </div>
            </div>

            {/* Checkbox: All Days Free Bell Matching Screenshot 1 */}
            <div className="pl-6">
              <label className="flex items-center gap-2 text-xs text-gray-800 font-medium cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isAllDaysFreeBell}
                  onChange={(e) => setIsAllDaysFreeBell(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span>All Days Free Bell</span>
              </label>
            </div>
          </div>
        )}

        {/* CASE 2C: STAFF TYPE (Screenshot 3 - Week Wise Free Teacher Details) */}
        {tabId === "week_wise_free_teacher_details" && (
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-800">Staff Type</label>
            <div className="relative">
              <select
                value={selectedStaffType}
                onChange={(e) => setSelectedStaffType(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded px-2.5 py-1.5 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs"
              >
                {staffTypesList.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
              <FaAngleDown className="absolute right-2.5 top-2.5 text-[10px] pointer-events-none text-gray-400" />
            </div>
          </div>
        )}

        {/* CASE 3: TEACHER FILTER (Screenshot 3 - Subject Wise Teacher Details & Teacher Reports) */}
        {(tabId === "subject_wise_teacher_details" ||
          tabId === "teacher_timetable_details") && (
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-800">Select Teacher(s)</label>
            <div className="relative">
              <select
                value={selectedTeacher}
                onChange={(e) => setSelectedTeacher(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded px-2.5 py-1.5 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs"
              >
                {teachersList.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <FaAngleDown className="absolute right-2.5 top-2.5 text-[10px] pointer-events-none text-gray-400" />
            </div>
          </div>
        )}

        {/* CASE 4A: CLASS FILTER WITH 'Select Class' DEFAULT (Screenshot 1 - Class Wise Teacher Allocation, Screenshot 2 - Class and Resource, Screenshot 5 - Particular Class) */}
        {(tabId === "class_and_resource_details" ||
          tabId === "particular_class_timetable_details" ||
          tabId === "class_wise_teacher_allocation_details") && (
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-800">Select Class</label>
            <div className="relative">
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded px-2.5 py-1.5 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs"
              >
                <option value="Select Class">Select Class</option>
                <option value="All Classes">All Classes</option>
                {ALL_SECTION_CLASSES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <FaAngleDown className="absolute right-2.5 top-2.5 text-[10px] pointer-events-none text-gray-400" />
            </div>
          </div>
        )}

        {/* CASE 4B: CLASS FILTER & OTHER FORMAT CHECKBOX (Screenshot 4 - Free Teachers Classwise) */}
        {tabId === "free_teachers_classwise" && (
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-800">Select Class</label>
              <div className="relative">
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full text-xs border border-gray-300 rounded px-2.5 py-1.5 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs"
                >
                  <option value="All Class">All Class</option>
                  {ALL_SECTION_CLASSES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <FaAngleDown className="absolute right-2.5 top-2.5 text-[10px] pointer-events-none text-gray-400" />
              </div>
            </div>

            {/* Checkbox: Other Format(Table View) Matching Screenshot 4 */}
            <label className="flex items-center gap-2 text-xs text-gray-800 font-medium cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isOtherFormat}
                onChange={(e) => setIsOtherFormat(e.target.checked)}
                className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span>Other Format(Table View)</span>
            </label>
          </div>
        )}

        {/* CASE 4C: CLASS AND SUBJECT TAUGHT (Screenshot 2 - Select Class dropdown with All Class default) */}
        {tabId === "class_and_subject_taught" && (
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-800">Select Class</label>
            <div className="relative">
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded px-2.5 py-1.5 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs"
              >
                <option value="All Class">All Class</option>
                {ALL_SECTION_CLASSES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <FaAngleDown className="absolute right-2.5 top-2.5 text-[10px] pointer-events-none text-gray-400" />
            </div>
          </div>
        )}

        {/* CASE 4D: RESOURCE TIMETABLE (Screenshot 4 - Select Resource(s)) */}
        {tabId === "resource_timetable_details" && (
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-800">Select Resource(s)</label>
            <div className="relative">
              <select
                value={selectedResource}
                onChange={(e) => setSelectedResource(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded px-2.5 py-1.5 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs"
              >
                {resourcesList.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              <FaAngleDown className="absolute right-2.5 top-2.5 text-[10px] pointer-events-none text-gray-400" />
            </div>
          </div>
        )}

        {/* CASE 4E: DATE WISE SUBSTITUTION DETAILS (Screenshot 2 - From Date, To Date, Select Format) */}
        {tabId === "date_wise_substitution_details" && (
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-800">From Date</label>
              <input
                type="text"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded px-2.5 py-1.5 text-gray-800 bg-white font-medium outline-none hover:border-blue-400 shadow-2xs"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-800">To Date</label>
              <input
                type="text"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded px-2.5 py-1.5 text-gray-800 bg-white font-medium outline-none hover:border-blue-400 shadow-2xs"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-800">Select Format</label>
              <div className="relative">
                <select
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="w-full text-xs border border-gray-300 rounded px-2.5 py-1.5 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs"
                >
                  {formatsList.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
                <FaAngleDown className="absolute right-2.5 top-2.5 text-[10px] pointer-events-none text-gray-400" />
              </div>
            </div>
          </div>
        )}

        {/* CASE 4F: GENERAL CLASS FILTER (For Remaining Class Reports) */}
        {tabId === "class_timetable_details" && (
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-800">Select Class(es)</label>
            <div className="relative">
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded px-2.5 py-1.5 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs"
              >
                <option value="All Classes">All Classes</option>
                {ALL_SECTION_CLASSES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <FaAngleDown className="absolute right-2.5 top-2.5 text-[10px] pointer-events-none text-gray-400" />
            </div>
          </div>
        )}

        {/* CASE 5: DAY FILTER (Screenshot 5 - Day(s) for Particular Class & General Day Reports) */}
        {(tabId === "class_timetable_details" ||
          tabId === "particular_class_timetable_details" ||
          tabId === "teacher_timetable_details") && (
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-800">Day(s)</label>
            <div className="relative">
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded px-2.5 py-1.5 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs"
              >
                {daysList.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <FaAngleDown className="absolute right-2.5 top-2.5 text-[10px] pointer-events-none text-gray-400" />
            </div>
          </div>
        )}

        {/* CASE 6: FORMAT FILTER */}
        {(tabId === "class_timetable_details" ||
          tabId === "teacher_timetable_details") && (
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-800">Select Format</label>
            <div className="relative">
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded px-2.5 py-1.5 text-gray-800 bg-white font-medium outline-none cursor-pointer hover:border-blue-400 appearance-none pr-8 shadow-2xs"
              >
                {formatsList.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
              <FaAngleDown className="absolute right-2.5 top-2.5 text-[10px] pointer-events-none text-gray-400" />
            </div>
          </div>
        )}

        {/* Action Show Button matching Screenshot 1, 2, 3, 4, 5 */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleShowClick}
            className="border border-[#00a2db] text-[#00a2db] hover:bg-sky-50 px-4 py-1.5 rounded text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs transition"
          >
            <FaEye className="text-xs text-[#00a2db]" />
            <span>Show</span>
          </button>
        </div>
      </div>

      {/* Splitter collapse button on divider matching screenshot 1, 2, 3, 4, 5 */}
      <div className="relative flex items-center justify-center border-r border-gray-300 bg-[#edf2f7] w-3 z-10 select-none">
        <button
          type="button"
          onClick={() => setIsFilterCollapsed(!isFilterCollapsed)}
          className="absolute -left-1.5 bg-white border border-gray-300 hover:bg-gray-100 rounded-sm w-4 h-8 flex items-center justify-center text-gray-600 text-[10px] shadow-xs cursor-pointer"
          title={isFilterCollapsed ? "Expand Filters" : "Collapse Filters"}
        >
          {isFilterCollapsed ? "▶" : "◀"}
        </button>
      </div>

      {/* -------------------- RIGHT REPORT PREVIEW AREA -------------------- */}
      <div className="flex-1 bg-[#eaedf1] p-3 flex flex-col items-center justify-start overflow-y-auto custom-scrollbar">
        {!showReport ? (
          /* Blank grey area before Show is clicked (Matching Screenshot 1, 2, 3, 4, 5) */
          <div className="w-full h-full min-h-[600px] bg-[#eaedf1]"></div>
        ) : (
          /* Report Rendered with Crystal Report Toolbar & Letterhead Sheet (Matching Screenshot 3, 4, 5) */
          <div className="w-full flex flex-col items-center">
            {/* Top Toolbar matching Screenshot 3, 4, 5 */}
            <div className="w-full max-w-4xl bg-white border border-gray-300 px-3 py-1.5 mb-2.5 flex items-center justify-between shadow-xs text-xs rounded-sm">
              {/* Left Paging Controls */}
              <div className="flex items-center gap-1.5 text-gray-700">
                <button
                  type="button"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage <= 1}
                  className="font-mono text-xs px-1.5 py-0.5 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-30 cursor-pointer"
                  title="First Page"
                >
                  |&lt;&lt;
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage <= 1}
                  className="font-mono text-xs px-1.5 py-0.5 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-30 cursor-pointer"
                  title="Previous Page"
                >
                  &lt;
                </button>
                <div className="flex items-center gap-1 text-xs">
                  <input
                    type="text"
                    value={currentPage}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      if (val >= 1 && val <= totalPages) setCurrentPage(val);
                    }}
                    className="w-8 text-center border border-gray-300 rounded px-1 py-0.5 text-xs font-semibold"
                  />
                  <span>of {totalPages}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage >= totalPages}
                  className="font-mono text-xs px-1.5 py-0.5 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-30 cursor-pointer"
                  title="Next Page"
                >
                  &gt;
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage >= totalPages}
                  className="font-mono text-xs px-1.5 py-0.5 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-30 cursor-pointer"
                  title="Last Page"
                >
                  &gt;&gt;|
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCurrentPage(1);
                    showToast("Report refreshed");
                  }}
                  className="p-1 hover:text-blue-600 cursor-pointer ml-1"
                  title="Refresh"
                >
                  <FaSyncAlt className="text-xs text-blue-500" />
                </button>
              </div>

              {/* Middle Find Controls */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder=""
                  value={searchReportText}
                  onChange={(e) => setSearchReportText(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-0.5 text-xs w-36 bg-white outline-none focus:border-blue-500"
                />
                <span
                  onClick={() => {
                    if (searchReportText.trim()) showToast(`Searching for "${searchReportText}"`);
                  }}
                  className="text-gray-700 hover:text-blue-600 text-xs font-medium cursor-pointer"
                >
                  Find | Next
                </span>
              </div>

              {/* Right Export & Print Controls */}
              <div className="flex items-center gap-3">
                {/* Export Dropdown */}
                <div className="relative group">
                  <button
                    type="button"
                    className="flex items-center gap-1 text-gray-700 hover:text-blue-600 cursor-pointer p-1"
                    title="Export Report"
                  >
                    <FaSave className="text-sm text-blue-600" />
                    <FaAngleDown className="text-[10px]" />
                  </button>
                  <div className="hidden group-hover:block absolute right-0 top-6 bg-white border border-gray-200 shadow-xl rounded py-1 z-50 text-xs w-28">
                    <button
                      type="button"
                      onClick={() => showToast("Exported to PDF successfully!")}
                      className="w-full text-left px-3 py-1.5 hover:bg-gray-100 flex items-center gap-2 text-gray-700"
                    >
                      <FaFilePdf className="text-red-500 text-xs" />
                      <span>Acrobat (PDF)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => showToast("Exported to Excel successfully!")}
                      className="w-full text-left px-3 py-1.5 hover:bg-gray-100 flex items-center gap-2 text-gray-700"
                    >
                      <FaFileExcel className="text-emerald-600 text-xs" />
                      <span>MS Excel</span>
                    </button>
                  </div>
                </div>

                {/* Print Button */}
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="text-gray-700 hover:text-blue-600 cursor-pointer p-1"
                  title="Print Report"
                >
                  <FaPrint className="text-sm" />
                </button>
              </div>
            </div>

            {/* Printable Letterhead Document Sheet matching Screenshot 3, 4, 5 */}
            <div className="bg-white shadow-md border border-gray-300 p-8 w-full max-w-4xl mx-auto text-gray-900 font-sans min-h-[960px] flex flex-col justify-between">
              <div>
                {/* School Header Block matching Screenshot 3, 4, 5 */}
                <div className="flex items-start justify-center relative mb-4">
                  {/* Left Official School Crest Logo (Exact Size Matching User Image) */}
                  <img
                    src="/school_logo.png"
                    alt="Navals Academy Emblem"
                    className="absolute left-2 top-0 w-16 h-[72px] object-contain shrink-0 drop-shadow-xs"
                  />

                  {/* Centered School Name & Contact Details */}
                  <div className="text-center px-12">
                    <h2 className="text-xl font-bold text-gray-900 tracking-wide uppercase font-serif">
                      NAVALS NATIONAL ACADEMY
                    </h2>
                    <p className="text-xs font-semibold text-gray-800 tracking-wide mt-0.5">
                      DOHRIGHAT , MAU
                    </p>
                    <p className="text-[11px] text-gray-600 mt-1">
                      Website : www.navalsnationalacademydohrighat.com | Phone : 8299331845
                    </p>
                  </div>
                </div>

                {/* Report Banner with Tan Background and Double Line (Matching Screenshot 3, 4, 5) */}
                <div className="border-t-2 border-b-2 border-[#b58c58] bg-[#fbf6ee] py-1 px-4 mb-3 text-left">
                  <span className="font-bold text-xs uppercase tracking-wide text-gray-900">
                    {getBannerTitle()}
                  </span>
                </div>

                {/* -------------------- 1. TEACHERS WING WISE TABLE (SCREENSHOT 5 EXACT MATCH) -------------------- */}
                {tabId === "wing_wise_teacher_details" && (
                  <div className="border border-[#b58c58] overflow-hidden">
                    <table className="w-full text-left text-xs border-collapse font-sans">
                      <thead className="bg-[#fbf6ee] border-b border-[#b58c58]">
                        <tr className="text-gray-900 font-bold">
                          <th className="py-2 px-3 w-16 border-r border-[#b58c58]">SN</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">TEACHER NAME</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">CONTACT NO</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">GENDER</th>
                          <th className="py-2 px-4">WING NAME</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#b58c58]/40">
                        {wingWiseTeacherData
                          .filter((t) => selectedWing === "All Wings" || t.wing === selectedWing)
                          .map((row, idx) => (
                            <tr key={row.sn} className={idx % 2 === 1 ? "bg-[#fbf6ee]/30" : "bg-white"}>
                              <td className="py-1.5 px-3 border-r border-[#b58c58]/40 text-gray-800">{row.sn}</td>
                              <td className="py-1.5 px-4 border-r border-[#b58c58]/40 font-semibold text-gray-900 uppercase">
                                {row.name}
                              </td>
                              <td className="py-1.5 px-4 border-r border-[#b58c58]/40 text-gray-800">{row.contact}</td>
                              <td className="py-1.5 px-4 border-r border-[#b58c58]/40 text-gray-800">{row.gender}</td>
                              <td className="py-1.5 px-4 text-gray-800 font-medium">{row.wing}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* -------------------- 2. SUBJECT WISE TEACHER DETAILS TABLE (SCREENSHOT 3) -------------------- */}
                {tabId === "subject_wise_teacher_details" && (
                  <div className="border border-[#b58c58] overflow-hidden">
                    <table className="w-full text-left text-xs border-collapse font-sans">
                      <thead className="bg-[#fbf6ee] border-b border-[#b58c58]">
                        <tr className="text-gray-900 font-bold">
                          <th className="py-2 px-3 w-16 border-r border-[#b58c58]">SN</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">SUBJECT NAME</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">TEACHER NAME</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">CONTACT NO</th>
                          <th className="py-2 px-4">DESIGNATION</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#b58c58]/40">
                        {subjectWiseTeacherData.map((row, idx) => (
                          <tr key={row.sn} className={idx % 2 === 1 ? "bg-[#fbf6ee]/30" : "bg-white"}>
                            <td className="py-1.5 px-3 border-r border-[#b58c58]/40 text-gray-800">{row.sn}</td>
                            <td className="py-1.5 px-4 border-r border-[#b58c58]/40 font-semibold text-gray-900 uppercase">
                              {row.subjectName}
                            </td>
                            <td className="py-1.5 px-4 border-r border-[#b58c58]/40 text-gray-800 uppercase font-semibold">
                              {row.teacherName}
                            </td>
                            <td className="py-1.5 px-4 border-r border-[#b58c58]/40 text-gray-800">{row.contact}</td>
                            <td className="py-1.5 px-4 text-gray-800 font-medium">{row.designation}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* -------------------- 3. PARALLEL ALLOCATION DETAILS TABLE (SCREENSHOT 2) -------------------- */}
                {tabId === "parallel_allocation_details" && (
                  <div className="border border-[#b58c58] overflow-hidden">
                    <table className="w-full text-left text-xs border-collapse font-sans">
                      <thead className="bg-[#fbf6ee] border-b border-[#b58c58]">
                        <tr className="text-gray-900 font-bold">
                          <th className="py-2 px-3 w-16 border-r border-[#b58c58]">SN</th>
                          <th className="py-2 px-3 border-r border-[#b58c58]">CLASS</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">SUBJECT</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">TEACHER</th>
                          <th className="py-2 px-3 border-r border-[#b58c58]">PARALLEL CLASS</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">PARALLEL SUBJECT</th>
                          <th className="py-2 px-4">PARALLEL TEACHER</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#b58c58]/40">
                        {parallelAllocationData.map((row, idx) => (
                          <tr key={row.sn} className={idx % 2 === 1 ? "bg-[#fbf6ee]/30" : "bg-white"}>
                            <td className="py-1.5 px-3 border-r border-[#b58c58]/40 text-gray-800">{row.sn}</td>
                            <td className="py-1.5 px-3 border-r border-[#b58c58]/40 font-semibold text-gray-900 uppercase">
                              {row.className}
                            </td>
                            <td className="py-1.5 px-4 border-r border-[#b58c58]/40 text-gray-800 uppercase">{row.subject}</td>
                            <td className="py-1.5 px-4 border-r border-[#b58c58]/40 text-gray-900 font-semibold uppercase">
                              {row.teacher}
                            </td>
                            <td className="py-1.5 px-3 border-r border-[#b58c58]/40 font-semibold text-gray-900 uppercase">
                              {row.parallelClass}
                            </td>
                            <td className="py-1.5 px-4 border-r border-[#b58c58]/40 text-gray-800 uppercase">
                              {row.parallelSubject}
                            </td>
                            <td className="py-1.5 px-4 text-gray-900 font-semibold uppercase">{row.parallelTeacher}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* -------------------- 3B. CONSECUTIVE ALLOCATION DETAILS (SCREENSHOT 1) -------------------- */}
                {tabId === "consecutive_allocation_details" && (
                  <div className="border border-[#b58c58] overflow-hidden">
                    <table className="w-full text-left text-xs border-collapse font-sans">
                      <thead className="bg-[#fbf6ee] border-b border-[#b58c58]">
                        <tr className="text-gray-900 font-bold">
                          <th className="py-2 px-3 w-16 border-r border-[#b58c58]">SN</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">TEACHER NAME</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">CLASS</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">SUBJECT</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">CONSECUTIVE PERIODS</th>
                          <th className="py-2 px-4">DAY</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#b58c58]/40">
                        {consecutiveAllocationData.map((row, idx) => (
                          <tr key={row.sn} className={idx % 2 === 1 ? "bg-[#fbf6ee]/30" : "bg-white"}>
                            <td className="py-1.5 px-3 border-r border-[#b58c58]/40 text-gray-800">{row.sn}</td>
                            <td className="py-1.5 px-4 border-r border-[#b58c58]/40 font-semibold text-gray-900 uppercase">
                              {row.teacherName}
                            </td>
                            <td className="py-1.5 px-4 border-r border-[#b58c58]/40 text-gray-800 font-medium uppercase">{row.className}</td>
                            <td className="py-1.5 px-4 border-r border-[#b58c58]/40 text-gray-800 uppercase">{row.subject}</td>
                            <td className="py-1.5 px-4 border-r border-[#b58c58]/40 text-gray-900 font-semibold">{row.consecutivePeriods}</td>
                            <td className="py-1.5 px-4 text-gray-800">{row.day}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* -------------------- 3C. CLASS AND RESOURCE DETAILS (SCREENSHOT 2) -------------------- */}
                {tabId === "class_and_resource_details" && (
                  <div className="border border-[#b58c58] overflow-hidden">
                    <table className="w-full text-left text-xs border-collapse font-sans">
                      <thead className="bg-[#fbf6ee] border-b border-[#b58c58]">
                        <tr className="text-gray-900 font-bold">
                          <th className="py-2 px-3 w-16 border-r border-[#b58c58]">SN</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">CLASS</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">SUBJECT</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">RESOURCE NAME</th>
                          <th className="py-2 px-4">PERIODS / WEEK</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#b58c58]/40">
                        {classAndResourceData
                          .filter((r) => selectedClass === "All Classes" || selectedClass === "Select Class" || r.className === selectedClass)
                          .map((row, idx) => (
                            <tr key={row.sn} className={idx % 2 === 1 ? "bg-[#fbf6ee]/30" : "bg-white"}>
                              <td className="py-1.5 px-3 border-r border-[#b58c58]/40 text-gray-800">{row.sn}</td>
                              <td className="py-1.5 px-4 border-r border-[#b58c58]/40 font-semibold text-gray-900 uppercase">
                                {row.className}
                              </td>
                              <td className="py-1.5 px-4 border-r border-[#b58c58]/40 text-gray-800 uppercase">{row.subject}</td>
                              <td className="py-1.5 px-4 border-r border-[#b58c58]/40 text-gray-900 font-medium uppercase">{row.resourceName}</td>
                              <td className="py-1.5 px-4 text-gray-900 font-semibold">{row.periodsPerWeek} Periods</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* -------------------- 3D. WEEK WISE FREE TEACHER DETAILS (SCREENSHOT 3) -------------------- */}
                {tabId === "week_wise_free_teacher_details" && (
                  <div className="border border-[#b58c58] overflow-hidden">
                    <table className="w-full text-left text-xs border-collapse font-sans">
                      <thead className="bg-[#fbf6ee] border-b border-[#b58c58]">
                        <tr className="text-gray-900 font-bold">
                          <th className="py-2 px-3 w-16 border-r border-[#b58c58]">SN</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">TEACHER NAME</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">DAY</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">FREE PERIODS</th>
                          <th className="py-2 px-4">TOTAL FREE</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#b58c58]/40">
                        {weekWiseFreeTeacherData.map((row, idx) => (
                          <tr key={row.sn} className={idx % 2 === 1 ? "bg-[#fbf6ee]/30" : "bg-white"}>
                            <td className="py-1.5 px-3 border-r border-[#b58c58]/40 text-gray-800">{row.sn}</td>
                            <td className="py-1.5 px-4 border-r border-[#b58c58]/40 font-semibold text-gray-900 uppercase">
                              {row.teacherName}
                            </td>
                            <td className="py-1.5 px-4 border-r border-[#b58c58]/40 text-gray-800">{row.day}</td>
                            <td className="py-1.5 px-4 border-r border-[#b58c58]/40 text-blue-700 font-medium">{row.freePeriods}</td>
                            <td className="py-1.5 px-4 text-emerald-700 font-bold">{row.totalFree}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* -------------------- 3E. FREE TEACHERS CLASSWISE (SCREENSHOT 4) -------------------- */}
                {tabId === "free_teachers_classwise" && (
                  <div className="border border-[#b58c58] overflow-hidden">
                    <table className="w-full text-left text-xs border-collapse font-sans">
                      <thead className="bg-[#fbf6ee] border-b border-[#b58c58]">
                        <tr className="text-gray-900 font-bold">
                          <th className="py-2 px-3 w-16 border-r border-[#b58c58]">SN</th>
                          <th className="py-2 px-3 border-r border-[#b58c58]">CLASS</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">PERIOD</th>
                          <th className="py-2 px-6">FREE TEACHERS AVAILABLE</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#b58c58]/40">
                        {freeTeachersClasswiseData.map((row, idx) => (
                          <tr key={row.sn} className={idx % 2 === 1 ? "bg-[#fbf6ee]/30" : "bg-white"}>
                            <td className="py-1.5 px-3 border-r border-[#b58c58]/40 text-gray-800">{row.sn}</td>
                            <td className="py-1.5 px-3 border-r border-[#b58c58]/40 font-semibold text-gray-900 uppercase">
                              {row.className}
                            </td>
                            <td className="py-1.5 px-4 border-r border-[#b58c58]/40 text-gray-800 font-medium">{row.period}</td>
                            <td className="py-1.5 px-6 text-gray-800 text-[11px] font-medium">{row.freeTeachers}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* -------------------- 3F. UNALLOCATED PERIOD DETAILS (SCREENSHOT 5) -------------------- */}
                {tabId === "unallocated_period_details" && (
                  <div className="border border-[#b58c58] overflow-hidden">
                    <table className="w-full text-left text-xs border-collapse font-sans">
                      <thead className="bg-[#fbf6ee] border-b border-[#b58c58]">
                        <tr className="text-gray-900 font-bold">
                          <th className="py-2 px-3 w-16 border-r border-[#b58c58]">SN</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">CLASS</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">SUBJECT</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">REQUIRED PERIODS</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">ALLOCATED</th>
                          <th className="py-2 px-4">UNALLOCATED</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#b58c58]/40">
                        {unallocatedPeriodData.map((row, idx) => (
                          <tr key={row.sn} className={idx % 2 === 1 ? "bg-[#fbf6ee]/30" : "bg-white"}>
                            <td className="py-1.5 px-3 border-r border-[#b58c58]/40 text-gray-800">{row.sn}</td>
                            <td className="py-1.5 px-4 border-r border-[#b58c58]/40 font-semibold text-gray-900 uppercase">
                              {row.className}
                            </td>
                            <td className="py-1.5 px-4 border-r border-[#b58c58]/40 text-gray-800 uppercase">{row.subject}</td>
                            <td className="py-1.5 px-4 border-r border-[#b58c58]/40 text-gray-900 font-semibold">{row.requiredPeriods}</td>
                            <td className="py-1.5 px-4 border-r border-[#b58c58]/40 text-emerald-700 font-bold">{row.allocated}</td>
                            <td className="py-1.5 px-4 text-red-600 font-bold">{row.unallocated}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* -------------------- 3G. DAY WISE FREE TEACHER DETAILS (SCREENSHOT 1) -------------------- */}
                {tabId === "day_wise_free_teacher_details" && (
                  <div className="border border-[#b58c58] overflow-hidden">
                    <table className="w-full text-left text-xs border-collapse font-sans">
                      <thead className="bg-[#fbf6ee] border-b border-[#b58c58]">
                        <tr className="text-gray-900 font-bold">
                          <th className="py-2 px-3 w-16 border-r border-[#b58c58]">SN</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">TEACHER NAME</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">WING</th>
                          <th className="py-2 px-6 border-r border-[#b58c58]">FREE PERIODS (BELLS)</th>
                          <th className="py-2 px-4">TOTAL FREE</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#b58c58]/40">
                        {dayWiseFreeTeacherData
                          .filter((t) => selectedWing === "All Wings" || t.wing.includes(selectedWing))
                          .map((row, idx) => (
                            <tr key={row.sn} className={idx % 2 === 1 ? "bg-[#fbf6ee]/30" : "bg-white"}>
                              <td className="py-1.5 px-3 border-r border-[#b58c58]/40 text-gray-800">{row.sn}</td>
                              <td className="py-1.5 px-4 border-r border-[#b58c58]/40 font-semibold text-gray-900 uppercase">
                                {row.teacherName}
                              </td>
                              <td className="py-1.5 px-4 border-r border-[#b58c58]/40 text-gray-800">{row.wing}</td>
                              <td className="py-1.5 px-6 border-r border-[#b58c58]/40 text-blue-700 font-medium">{row.freeBells}</td>
                              <td className="py-1.5 px-4 text-emerald-700 font-bold">{row.totalFree}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* -------------------- 3H. CLASS AND SUBJECT TAUGHT (SCREENSHOT 2) -------------------- */}
                {tabId === "class_and_subject_taught" && (
                  <div className="border border-[#b58c58] overflow-hidden">
                    <table className="w-full text-left text-xs border-collapse font-sans">
                      <thead className="bg-[#fbf6ee] border-b border-[#b58c58]">
                        <tr className="text-gray-900 font-bold">
                          <th className="py-2 px-3 w-16 border-r border-[#b58c58]">SN</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">CLASS</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">SUBJECT</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">TEACHER NAME</th>
                          <th className="py-2 px-4">PERIODS / WEEK</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#b58c58]/40">
                        {classAndSubjectTaughtData
                          .filter((r) => selectedClass === "All Class" || selectedClass === "All Classes" || r.className === selectedClass)
                          .map((row, idx) => (
                            <tr key={row.sn} className={idx % 2 === 1 ? "bg-[#fbf6ee]/30" : "bg-white"}>
                              <td className="py-1.5 px-3 border-r border-[#b58c58]/40 text-gray-800">{row.sn}</td>
                              <td className="py-1.5 px-4 border-r border-[#b58c58]/40 font-semibold text-gray-900 uppercase">
                                {row.className}
                              </td>
                              <td className="py-1.5 px-4 border-r border-[#b58c58]/40 text-gray-800 uppercase">{row.subject}</td>
                              <td className="py-1.5 px-4 border-r border-[#b58c58]/40 text-gray-900 font-semibold uppercase">
                                {row.teacherName}
                              </td>
                              <td className="py-1.5 px-4 text-gray-900 font-semibold">{row.periodsPerWeek} Periods</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* -------------------- 3I. TEACHERS WORK LOAD DETAILS (SCREENSHOT 3) -------------------- */}
                {tabId === "teachers_work_load_details" && (
                  <div className="border border-[#b58c58] overflow-hidden">
                    <table className="w-full text-left text-xs border-collapse font-sans">
                      <thead className="bg-[#fbf6ee] border-b border-[#b58c58]">
                        <tr className="text-gray-900 font-bold">
                          <th className="py-2 px-3 w-16 border-r border-[#b58c58]">SN</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">TEACHER NAME</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">DESIGNATION</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">TEACHING PERIODS</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">REMEDIAL / LAB</th>
                          <th className="py-2 px-4">TOTAL WORK LOAD</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#b58c58]/40">
                        {teachersWorkLoadData.map((row, idx) => (
                          <tr key={row.sn} className={idx % 2 === 1 ? "bg-[#fbf6ee]/30" : "bg-white"}>
                            <td className="py-1.5 px-3 border-r border-[#b58c58]/40 text-gray-800">{row.sn}</td>
                            <td className="py-1.5 px-4 border-r border-[#b58c58]/40 font-semibold text-gray-900 uppercase">
                              {row.teacherName}
                            </td>
                            <td className="py-1.5 px-4 border-r border-[#b58c58]/40 text-gray-800">{row.designation}</td>
                            <td className="py-1.5 px-4 border-r border-[#b58c58]/40 text-gray-900 font-semibold">{row.teachingPeriods} Periods</td>
                            <td className="py-1.5 px-4 border-r border-[#b58c58]/40 text-gray-800">{row.remedialLab} Periods</td>
                            <td className="py-1.5 px-4 text-emerald-700 font-bold">{row.totalWorkLoad} Periods / Week</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* -------------------- 3J. RESOURCE TIMETABLE DETAILS (SCREENSHOT 4) -------------------- */}
                {tabId === "resource_timetable_details" && (
                  <div className="border border-[#b58c58] overflow-hidden">
                    <table className="w-full text-left text-xs border-collapse font-sans">
                      <thead className="bg-[#fbf6ee] border-b border-[#b58c58]">
                        <tr className="text-gray-900 font-bold">
                          <th className="py-2 px-3 w-16 border-r border-[#b58c58]">SN</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">RESOURCE NAME</th>
                          <th className="py-2 px-3 border-r border-[#b58c58]">DAY</th>
                          <th className="py-2 px-3 border-r border-[#b58c58]">PERIOD</th>
                          <th className="py-2 px-3 border-r border-[#b58c58]">CLASS</th>
                          <th className="py-2 px-4">TEACHER IN-CHARGE</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#b58c58]/40">
                        {resourceTimetableData
                          .filter((r) => selectedResource === "All Resources" || r.resourceName === selectedResource)
                          .map((row, idx) => (
                            <tr key={row.sn} className={idx % 2 === 1 ? "bg-[#fbf6ee]/30" : "bg-white"}>
                              <td className="py-1.5 px-3 border-r border-[#b58c58]/40 text-gray-800">{row.sn}</td>
                              <td className="py-1.5 px-4 border-r border-[#b58c58]/40 font-semibold text-gray-900 uppercase">
                                {row.resourceName}
                              </td>
                              <td className="py-1.5 px-3 border-r border-[#b58c58]/40 text-gray-800">{row.day}</td>
                              <td className="py-1.5 px-3 border-r border-[#b58c58]/40 text-blue-700 font-bold">{row.period}</td>
                              <td className="py-1.5 px-3 border-r border-[#b58c58]/40 font-semibold text-gray-900 uppercase">{row.className}</td>
                              <td className="py-1.5 px-4 text-gray-800 font-medium uppercase">{row.teacherInCharge}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* -------------------- 3K. CLASS WISE TEACHER ALLOCATION DETAILS (SCREENSHOT 1) -------------------- */}
                {tabId === "class_wise_teacher_allocation_details" && (
                  <div className="border border-[#b58c58] overflow-hidden">
                    <table className="w-full text-left text-xs border-collapse font-sans">
                      <thead className="bg-[#fbf6ee] border-b border-[#b58c58]">
                        <tr className="text-gray-900 font-bold">
                          <th className="py-2 px-3 w-16 border-r border-[#b58c58]">SN</th>
                          <th className="py-2 px-3 border-r border-[#b58c58]">CLASS</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">SUBJECT</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">TEACHER NAME</th>
                          <th className="py-2 px-3 border-r border-[#b58c58] text-center">PERIODS / WEEK</th>
                          <th className="py-2 px-4">DESIGNATION</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#b58c58]/40">
                        {classWiseTeacherAllocationData
                          .filter((row) => selectedClass === "Select Class" || selectedClass === "All Classes" || selectedClass === "All Class" || row.className === selectedClass)
                          .map((row) => (
                            <tr key={row.sn} className={row.sn % 2 === 0 ? "bg-[#fbf6ee]/30" : "bg-white"}>
                              <td className="py-1.5 px-3 border-r border-[#b58c58]/40 text-gray-800">{row.sn}</td>
                              <td className="py-1.5 px-3 border-r border-[#b58c58]/40 font-semibold text-gray-900 uppercase">{row.className}</td>
                              <td className="py-1.5 px-4 border-r border-[#b58c58]/40 font-medium text-gray-900 uppercase">{row.subject}</td>
                              <td className="py-1.5 px-4 border-r border-[#b58c58]/40 font-semibold text-blue-900 uppercase">{row.teacherName}</td>
                              <td className="py-1.5 px-3 border-r border-[#b58c58]/40 text-center font-bold text-gray-900">{row.periodsPerWeek}</td>
                              <td className="py-1.5 px-4 text-gray-700 font-medium uppercase">{row.designation}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* -------------------- 3L. DATE WISE SUBSTITUTION DETAILS (SCREENSHOT 2) -------------------- */}
                {tabId === "date_wise_substitution_details" && (
                  <div className="border border-[#b58c58] overflow-hidden">
                    <table className="w-full text-left text-xs border-collapse font-sans">
                      <thead className="bg-[#fbf6ee] border-b border-[#b58c58]">
                        <tr className="text-gray-900 font-bold">
                          <th className="py-2 px-3 w-16 border-r border-[#b58c58]">SN</th>
                          <th className="py-2 px-3 border-r border-[#b58c58]">DATE</th>
                          <th className="py-2 px-3 border-r border-[#b58c58]">CLASS</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">PERIOD</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">ABSENT TEACHER</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">SUBSTITUTE TEACHER</th>
                          <th className="py-2 px-4">SUBJECT</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#b58c58]/40">
                        {dateWiseSubstitutionData.map((row) => (
                          <tr key={row.sn} className={row.sn % 2 === 0 ? "bg-[#fbf6ee]/30" : "bg-white"}>
                            <td className="py-1.5 px-3 border-r border-[#b58c58]/40 text-gray-800">{row.sn}</td>
                            <td className="py-1.5 px-3 border-r border-[#b58c58]/40 text-gray-800 font-medium">{row.date}</td>
                            <td className="py-1.5 px-3 border-r border-[#b58c58]/40 font-semibold text-gray-900 uppercase">{row.className}</td>
                            <td className="py-1.5 px-4 border-r border-[#b58c58]/40 text-blue-800 font-semibold">{row.period}</td>
                            <td className="py-1.5 px-4 border-r border-[#b58c58]/40 text-red-700 font-medium uppercase">{row.absentTeacher}</td>
                            <td className="py-1.5 px-4 border-r border-[#b58c58]/40 text-emerald-800 font-semibold uppercase">{row.substituteTeacher}</td>
                            <td className="py-1.5 px-4 text-gray-800 font-medium uppercase">{row.subject}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* -------------------- 3M. ASSIGNMENT STATUS (SCREENSHOT 3) -------------------- */}
                {tabId === "assignment_status" && (
                  <div className="border border-[#b58c58] overflow-hidden">
                    <table className="w-full text-left text-xs border-collapse font-sans">
                      <thead className="bg-[#fbf6ee] border-b border-[#b58c58]">
                        <tr className="text-gray-900 font-bold">
                          <th className="py-2 px-3 w-16 border-r border-[#b58c58]">SN</th>
                          <th className="py-2 px-3 border-r border-[#b58c58]">CLASS</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">SUBJECT</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">TEACHER NAME</th>
                          <th className="py-2 px-3 border-r border-[#b58c58] text-center">REQUIRED</th>
                          <th className="py-2 px-3 border-r border-[#b58c58] text-center">ASSIGNED</th>
                          <th className="py-2 px-3 text-center">STATUS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#b58c58]/40">
                        {assignmentStatusData.map((row) => (
                          <tr key={row.sn} className={row.sn % 2 === 0 ? "bg-[#fbf6ee]/30" : "bg-white"}>
                            <td className="py-1.5 px-3 border-r border-[#b58c58]/40 text-gray-800">{row.sn}</td>
                            <td className="py-1.5 px-3 border-r border-[#b58c58]/40 font-semibold text-gray-900 uppercase">{row.className}</td>
                            <td className="py-1.5 px-4 border-r border-[#b58c58]/40 font-medium text-gray-800 uppercase">{row.subject}</td>
                            <td className="py-1.5 px-4 border-r border-[#b58c58]/40 font-semibold text-blue-900 uppercase">{row.teacherName}</td>
                            <td className="py-1.5 px-3 border-r border-[#b58c58]/40 text-center font-bold text-gray-900">{row.requiredPeriods}</td>
                            <td className="py-1.5 px-3 border-r border-[#b58c58]/40 text-center font-bold text-emerald-700">{row.assignedPeriods}</td>
                            <td className="py-1.5 px-3 text-center">
                              <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${row.status === "Completed" ? "bg-green-100 text-green-800 border border-green-300" : "bg-amber-100 text-amber-800 border border-amber-300"}`}>
                                {row.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* -------------------- 3N. SUBJECT SUMMARY (SCREENSHOT 4) -------------------- */}
                {tabId === "subject_summary" && (
                  <div className="border border-[#b58c58] overflow-hidden">
                    <table className="w-full text-left text-xs border-collapse font-sans">
                      <thead className="bg-[#fbf6ee] border-b border-[#b58c58]">
                        <tr className="text-gray-900 font-bold">
                          <th className="py-2 px-3 w-16 border-r border-[#b58c58]">SN</th>
                          <th className="py-2 px-3 border-r border-[#b58c58]">CODE</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">SUBJECT NAME</th>
                          <th className="py-2 px-4 border-r border-[#b58c58] text-center">TOTAL PERIODS / WEEK</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">TEACHERS ALLOCATED</th>
                          <th className="py-2 px-3 text-center">STATUS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#b58c58]/40">
                        {subjectSummaryData.map((row) => (
                          <tr key={row.sn} className={row.sn % 2 === 0 ? "bg-[#fbf6ee]/30" : "bg-white"}>
                            <td className="py-1.5 px-3 border-r border-[#b58c58]/40 text-gray-800">{row.sn}</td>
                            <td className="py-1.5 px-3 border-r border-[#b58c58]/40 font-mono text-gray-600">{row.subjectCode}</td>
                            <td className="py-1.5 px-4 border-r border-[#b58c58]/40 font-semibold text-gray-900 uppercase">{row.subjectName}</td>
                            <td className="py-1.5 px-4 border-r border-[#b58c58]/40 text-center font-bold text-gray-900">{row.totalPeriods}</td>
                            <td className="py-1.5 px-4 border-r border-[#b58c58]/40 font-medium text-blue-900">{row.teachersAllocated}</td>
                            <td className="py-1.5 px-3 text-center">
                              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-green-100 text-green-800 border border-green-300">
                                {row.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* -------------------- 3O. SHOW TIMETABLE AT GLANCE (SCREENSHOT 1) -------------------- */}
                {tabId === "show_timetable_at_glance" && (
                  <div className="border border-[#b58c58] overflow-x-auto">
                    <table className="w-full text-left text-[11px] border-collapse font-sans min-w-[720px]">
                      <thead className="bg-[#fbf6ee] border-b border-[#b58c58]">
                        <tr className="text-gray-900 font-bold text-center">
                          <th className="py-2 px-3 w-16 border-r border-[#b58c58]">
                            {selectedGlanceOption.includes("Teachers")
                              ? "TEACHER"
                              : selectedGlanceOption.includes("Resource")
                              ? "RESOURCE"
                              : "CLASS"}
                          </th>
                          <th className="py-2 px-2 border-r border-[#b58c58]">P1<br /><span className="text-[9px] font-normal text-gray-600">08:30-09:15</span></th>
                          <th className="py-2 px-2 border-r border-[#b58c58]">P2<br /><span className="text-[9px] font-normal text-gray-600">09:15-10:00</span></th>
                          <th className="py-2 px-2 border-r border-[#b58c58]">P3<br /><span className="text-[9px] font-normal text-gray-600">10:00-10:45</span></th>
                          <th className="py-2 px-2 border-r border-[#b58c58]">P4<br /><span className="text-[9px] font-normal text-gray-600">10:45-11:30</span></th>
                          <th className="py-2 px-2 border-r border-[#b58c58]">P5<br /><span className="text-[9px] font-normal text-gray-600">11:50-12:35</span></th>
                          <th className="py-2 px-2 border-r border-[#b58c58]">P6<br /><span className="text-[9px] font-normal text-gray-600">12:35-01:20</span></th>
                          <th className="py-2 px-2 border-r border-[#b58c58]">P7<br /><span className="text-[9px] font-normal text-gray-600">01:20-02:05</span></th>
                          <th className="py-2 px-2">P8<br /><span className="text-[9px] font-normal text-gray-600">02:05-02:50</span></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#b58c58]/40">
                        {ALL_SECTION_CLASSES.slice(0, 18).map((cls, idx) => {
                          const isColor = selectedGlanceOption.includes("ColorWise");
                          const subList = [
                            { sub: "ENG", teacher: "MR. AMIT", col: "bg-blue-50 text-blue-900 border-l border-blue-200" },
                            { sub: "MATH", teacher: "MS. PRIYA", col: "bg-emerald-50 text-emerald-900 border-l border-emerald-200" },
                            { sub: "HIN", teacher: "MR. RAJESH", col: "bg-rose-50 text-rose-900 border-l border-rose-200" },
                            { sub: "SCI", teacher: "MS. ANJALI", col: "bg-purple-50 text-purple-900 border-l border-purple-200" },
                            { sub: "SST", teacher: "MR. VIKAS", col: "bg-amber-50 text-amber-900 border-l border-amber-200" },
                            { sub: "CS", teacher: "MR. ROHIT", col: "bg-cyan-50 text-cyan-900 border-l border-cyan-200" },
                            { sub: "ACT", teacher: "MS. SNEHA", col: "bg-indigo-50 text-indigo-900 border-l border-indigo-200" },
                            { sub: "P.ED", teacher: "MR. MANOJ", col: "bg-teal-50 text-teal-900 border-l border-teal-200" },
                          ];
                          const shifted = [...subList.slice(idx % 8), ...subList.slice(0, idx % 8)];

                          return (
                            <tr key={cls} className={idx % 2 === 1 ? "bg-[#fbf6ee]/20" : "bg-white"}>
                              <td className="py-2 px-3 border-r border-[#b58c58]/40 font-bold text-gray-900 text-center uppercase bg-[#fbf6ee]/40">
                                {cls}
                              </td>
                              {shifted.map((p, pIdx) => (
                                <td
                                  key={pIdx}
                                  className={`py-1.5 px-2 border-r border-[#b58c58]/30 text-center ${
                                    pIdx === 7 ? "border-r-0" : ""
                                  } ${isColor ? p.col : ""}`}
                                >
                                  <div className="font-bold text-xs leading-tight">{p.sub}</div>
                                  <div className="text-[9px] text-gray-600 font-medium">{p.teacher}</div>
                                </td>
                              ))}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* -------------------- A. MASTER REQUIREMENT: SUBJECT TAUGHT BY TEACHER -------------------- */}
                {tabId === "master_requirement" && selectedMasterOption === "Subject Taught ByTeacher" && (
                  <div>
                    <div className="mb-2 text-xs font-semibold text-gray-800">
                      <span>Teacher Name </span>
                      <span className="inline-block border-b border-gray-400 w-64 ml-2"></span>
                    </div>

                    <div className="border border-[#b58c58] overflow-hidden">
                      <table className="w-full text-left text-xs border-collapse font-sans">
                        <thead className="bg-[#fbf6ee] border-b border-[#b58c58]">
                          <tr className="text-gray-900 font-bold">
                            <th className="py-2 px-3 w-16 border-r border-[#b58c58]">SN</th>
                            <th className="py-2 px-4 border-r border-[#b58c58]">CLASS & SECTION</th>
                            <th className="py-2 px-4">SUBJECT</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#b58c58]/40">
                          {masterSubjectTaughtData
                            .slice((currentPage - 1) * 22, currentPage * 22)
                            .map((row) => (
                              <tr key={row.sn} className={row.sn % 2 === 0 ? "bg-[#fbf6ee]/30" : "bg-white"}>
                                <td className="py-1.5 px-3 border-r border-[#b58c58]/40 text-gray-800">{row.sn}</td>
                                <td className="py-1.5 px-4 border-r border-[#b58c58]/40 font-semibold text-gray-900 uppercase">
                                  {row.classSection}
                                </td>
                                <td className="py-1.5 px-4 text-gray-800 font-medium uppercase">{row.subject}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* -------------------- B. MASTER REQUIREMENT: TEACHER, CLASS, SUBJECT, NO. OF PERIODS -------------------- */}
                {tabId === "master_requirement" && selectedMasterOption === "Teacher,Class,Subject,No. Of Periods" && (
                  <div className="border border-[#b58c58] overflow-hidden">
                    <table className="w-full text-left text-xs border-collapse font-sans">
                      <thead className="bg-[#fbf6ee] border-b border-[#b58c58]">
                        <tr className="text-gray-900 font-bold">
                          <th className="py-2 px-4 border-r border-[#b58c58]">CLASS/SECTION</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">SUBJECT</th>
                          <th className="py-2 px-3 border-r border-[#b58c58]">PERIOD</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">TEACHER NAME</th>
                          <th className="py-2 px-4">RESOURCE</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#b58c58]/40">
                        {masterTeacherClassSubjectData
                          .slice((currentPage - 1) * 16, currentPage * 16)
                          .map((row, idx) => (
                            <tr key={idx} className={idx % 2 === 1 ? "bg-[#fbf6ee]/30" : "bg-white"}>
                              <td className="py-1.5 px-4 border-r border-[#b58c58]/40 font-semibold text-gray-900 uppercase">
                                {row.classSection}
                              </td>
                              <td className="py-1.5 px-4 border-r border-[#b58c58]/40 text-gray-800 font-medium uppercase">
                                {row.subject}
                              </td>
                              <td className="py-1.5 px-3 border-r border-[#b58c58]/40 text-center font-bold text-gray-900">
                                {row.period}
                              </td>
                              <td className="py-1.5 px-4 border-r border-[#b58c58]/40 text-gray-800 uppercase font-semibold">
                                {row.teacherName}
                              </td>
                              <td className="py-1.5 px-4 text-gray-600 uppercase">{row.resource}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* -------------------- C. MASTER REQUIREMENT: CLASS LIST -------------------- */}
                {tabId === "master_requirement" && selectedMasterOption === "Class List" && (
                  <div className="border border-[#b58c58] overflow-hidden">
                    <table className="w-full text-left text-xs border-collapse font-sans">
                      <thead className="bg-[#fbf6ee] border-b border-[#b58c58]">
                        <tr className="text-gray-900 font-bold">
                          <th className="py-2 px-3 w-16 border-r border-[#b58c58]">SN</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">CLASS</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">SECTION</th>
                          <th className="py-2 px-4">NO. OF PERIODS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#b58c58]/40">
                        {masterClassList
                          .slice((currentPage - 1) * 25, currentPage * 25)
                          .map((row) => (
                            <tr key={row.sn} className={row.sn % 2 === 0 ? "bg-[#fbf6ee]/30" : "bg-white"}>
                              <td className="py-1.5 px-3 border-r border-[#b58c58]/40 text-gray-800">{row.sn}</td>
                              <td className="py-1.5 px-4 border-r border-[#b58c58]/40 font-semibold text-gray-900 uppercase">
                                {row.className}
                              </td>
                              <td className="py-1.5 px-4 border-r border-[#b58c58]/40 text-gray-800 font-medium uppercase">
                                {row.section}
                              </td>
                              <td className="py-1.5 px-4 text-gray-900 font-semibold">{row.noOfPeriods}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* -------------------- D. MASTER REQUIREMENT: SUBJECT LIST -------------------- */}
                {tabId === "master_requirement" && selectedMasterOption === "Subject List" && (
                  <div className="border border-[#b58c58] overflow-hidden">
                    <table className="w-full text-left text-xs border-collapse font-sans">
                      <thead className="bg-[#fbf6ee] border-b border-[#b58c58]">
                        <tr className="text-gray-900 font-bold">
                          <th className="py-2 px-3 w-16 border-r border-[#b58c58]">SN</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">SUBJECT NAME</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">SHORT NAME</th>
                          <th className="py-2 px-4">NO. OF PERIODS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#b58c58]/40">
                        {allSubjects
                          .slice((currentPage - 1) * 22, currentPage * 22)
                          .map((s) => (
                            <tr key={s.sn} className={s.sn % 2 === 0 ? "bg-[#fbf6ee]/30" : "bg-white"}>
                              <td className="py-1.5 px-3 border-r border-[#b58c58]/40 text-gray-800">{s.sn}</td>
                              <td className="py-1.5 px-4 border-r border-[#b58c58]/40 font-semibold text-gray-900 uppercase">
                                {s.name}
                              </td>
                              <td className="py-1.5 px-4 border-r border-[#b58c58]/40 text-gray-800">{s.shortName}</td>
                              <td className="py-1.5 px-4 text-gray-900 font-semibold">6 Periods</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* -------------------- E. CLASS TEACHERS DETAIL -------------------- */}
                {((tabId === "master_requirement" && selectedMasterOption === "Class Teachers Detail") ||
                  tabId === "class_teacher_details") && (
                  <div className="border border-[#b58c58] overflow-hidden">
                    <table className="w-full text-left text-xs border-collapse font-sans">
                      <thead className="bg-[#fbf6ee] border-b border-[#b58c58]">
                        <tr className="text-gray-900 font-bold">
                          <th className="py-2 px-3 w-16 border-r border-[#b58c58]">SN</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">CLASS</th>
                          <th className="py-2 px-3 border-r border-[#b58c58]">SECTION</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">CLASS TEACHER NAME</th>
                          <th className="py-2 px-3 border-r border-[#b58c58]">ROOM NO.</th>
                          <th className="py-2 px-4">MOBILE NO.</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#b58c58]/40">
                        {classTeachersData
                          .slice((currentPage - 1) * 25, currentPage * 25)
                          .map((ct) => (
                            <tr key={ct.sn} className={ct.sn % 2 === 0 ? "bg-[#fbf6ee]/30" : "bg-white"}>
                              <td className="py-1.5 px-3 border-r border-[#b58c58]/40 text-gray-800">{ct.sn}</td>
                              <td className="py-1.5 px-4 border-r border-[#b58c58]/40 font-semibold text-gray-900 uppercase">
                                {ct.className}
                              </td>
                              <td className="py-1.5 px-3 border-r border-[#b58c58]/40 font-bold text-gray-800 uppercase">
                                {ct.section}
                              </td>
                              <td className="py-1.5 px-4 border-r border-[#b58c58]/40 text-gray-900 font-semibold uppercase">
                                {ct.teacherName}
                              </td>
                              <td className="py-1.5 px-3 border-r border-[#b58c58]/40 text-gray-700">{ct.roomNo}</td>
                              <td className="py-1.5 px-4 text-gray-700">{ct.mobileNo}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* -------------------- 4. SUBJECT DETAILS TABLE -------------------- */}
                {tabId === "subject_details" && (
                  <div className="border border-[#b58c58] overflow-hidden">
                    <table className="w-full text-left text-xs border-collapse font-sans">
                      <thead className="bg-[#fbf6ee] border-b border-[#b58c58]">
                        <tr className="text-gray-900 font-bold">
                          <th className="py-2 px-3 w-16 border-r border-[#b58c58]">SN</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">SUBJECT NAME</th>
                          <th className="py-2 px-4 border-r border-[#b58c58]">SHORT NAME</th>
                          <th className="py-2 px-4 w-36">MAJOR/MINOR</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#b58c58]/40">
                        {currentSubjects.map((s, idx) => (
                          <tr key={s.sn} className={idx % 2 === 1 ? "bg-[#fbf6ee]/30" : "bg-white"}>
                            <td className="py-1.5 px-3 border-r border-[#b58c58]/40 text-gray-800">{s.sn}</td>
                            <td className="py-1.5 px-4 border-r border-[#b58c58]/40 font-semibold text-gray-900 uppercase">
                              {s.name}
                            </td>
                            <td className="py-1.5 px-4 border-r border-[#b58c58]/40 text-gray-800">{s.shortName}</td>
                            <td className="py-1.5 px-4 text-gray-800">{s.type}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* -------------------- 5. CLASS TIMETABLE GRID (FOR CLASS TT REPORTS) -------------------- */}
                {(tabId.includes("class_timetable") || tabId.includes("particular_class")) && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-semibold text-gray-700 bg-gray-50 p-2.5 border border-gray-200 rounded">
                      <span>Class: <strong className="text-gray-900">{selectedClass === "Select Class" ? "1-A" : selectedClass}</strong></span>
                      <span>Day(s): <strong className="text-gray-900">{selectedDay}</strong></span>
                      <span>Format: <strong className="text-gray-900">{selectedFormat}</strong></span>
                      <span>Academic Year: <strong className="text-gray-900">2026-2027</strong></span>
                    </div>

                    <div className="border border-[#b58c58] overflow-hidden">
                      <table className="w-full text-center text-xs border-collapse">
                        <thead className="bg-[#fbf6ee] border-b border-[#b58c58]">
                          <tr className="text-gray-900 font-bold">
                            <th className="py-2 px-2 border-r border-[#b58c58]">Day</th>
                            <th className="py-2 px-2 border-r border-[#b58c58]">
                              P1<br /><span className="text-[9px] font-normal">08:00-08:45</span>
                            </th>
                            <th className="py-2 px-2 border-r border-[#b58c58]">
                              P2<br /><span className="text-[9px] font-normal">08:45-09:30</span>
                            </th>
                            <th className="py-2 px-2 border-r border-[#b58c58]">
                              P3<br /><span className="text-[9px] font-normal">09:30-10:15</span>
                            </th>
                            <th className="py-2 px-2 border-r border-[#b58c58]">
                              P4<br /><span className="text-[9px] font-normal">10:15-11:00</span>
                            </th>
                            <th className="py-2 px-2 border-r border-[#b58c58] bg-[#f2e2ce] text-[10px]">RECESS</th>
                            <th className="py-2 px-2 border-r border-[#b58c58]">
                              P5<br /><span className="text-[9px] font-normal">11:30-12:15</span>
                            </th>
                            <th className="py-2 px-2 border-r border-[#b58c58]">
                              P6<br /><span className="text-[9px] font-normal">12:15-01:00</span>
                            </th>
                            <th className="py-2 px-2 border-r border-[#b58c58]">
                              P7<br /><span className="text-[9px] font-normal">01:00-01:40</span>
                            </th>
                            <th className="py-2 px-2">
                              P8<br /><span className="text-[9px] font-normal">01:40-02:20</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#b58c58]/40">
                          {classTimetableData.map((row, idx) => (
                            <tr key={row.day} className={idx % 2 === 1 ? "bg-[#fbf6ee]/30" : "bg-white"}>
                              <td className="py-2 px-2 font-bold text-gray-900 border-r border-[#b58c58]/40">{row.day}</td>
                              <td className="py-2 px-2 border-r border-[#b58c58]/40 text-gray-800">{row.p1}</td>
                              <td className="py-2 px-2 border-r border-[#b58c58]/40 text-gray-800">{row.p2}</td>
                              <td className="py-2 px-2 border-r border-[#b58c58]/40 text-gray-800">{row.p3}</td>
                              <td className="py-2 px-2 border-r border-[#b58c58]/40 text-gray-800">{row.p4}</td>
                              <td className="py-2 px-2 border-r border-[#b58c58]/40 bg-[#f2e2ce]/60 font-bold text-[10px] text-amber-900">
                                BREAK
                              </td>
                              <td className="py-2 px-2 border-r border-[#b58c58]/40 text-gray-800">{row.p5}</td>
                              <td className="py-2 px-2 border-r border-[#b58c58]/40 text-gray-800">{row.p6}</td>
                              <td className="py-2 px-2 border-r border-[#b58c58]/40 text-gray-800">{row.p7}</td>
                              <td className="py-2 px-2 text-gray-800">{row.p8}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* -------------------- 6. TEACHER TIMETABLE GRID (FOR TEACHER TT REPORTS) -------------------- */}
                {(tabId.includes("teacher_timetable") ||
                  tabId.includes("teacher_personal")) && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-semibold text-gray-700 bg-gray-50 p-2.5 border border-gray-200 rounded">
                      <span>
                        Teacher:{" "}
                        <strong className="text-gray-900">
                          {selectedTeacher === "None selected" ? "Mr. Amit Sharma (PGT Math)" : selectedTeacher}
                        </strong>
                      </span>
                      <span>Weekly Periods: <strong className="text-gray-900">28 Periods</strong></span>
                      <span>Department: <strong className="text-gray-900">Senior Science</strong></span>
                    </div>

                    <div className="border border-[#b58c58] overflow-hidden">
                      <table className="w-full text-center text-xs border-collapse">
                        <thead className="bg-[#fbf6ee] border-b border-[#b58c58]">
                          <tr className="text-gray-900 font-bold">
                            <th className="py-2 px-2 border-r border-[#b58c58]">Day</th>
                            <th className="py-2 px-2 border-r border-[#b58c58]">P1</th>
                            <th className="py-2 px-2 border-r border-[#b58c58]">P2</th>
                            <th className="py-2 px-2 border-r border-[#b58c58]">P3</th>
                            <th className="py-2 px-2 border-r border-[#b58c58]">P4</th>
                            <th className="py-2 px-2 border-r border-[#b58c58] bg-[#f2e2ce] text-[10px]">RECESS</th>
                            <th className="py-2 px-2 border-r border-[#b58c58]">P5</th>
                            <th className="py-2 px-2 border-r border-[#b58c58]">P6</th>
                            <th className="py-2 px-2 border-r border-[#b58c58]">P7</th>
                            <th className="py-2 px-2">P8</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#b58c58]/40">
                          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day, idx) => (
                            <tr key={day} className={idx % 2 === 1 ? "bg-[#fbf6ee]/30" : "bg-white"}>
                              <td className="py-2 px-2 font-bold text-gray-900 border-r border-[#b58c58]/40">{day}</td>
                              <td className="py-2 px-2 border-r border-[#b58c58]/40 font-medium text-blue-700">10-A (Math)</td>
                              <td className="py-2 px-2 border-r border-[#b58c58]/40 font-medium text-emerald-700">11-A (Math)</td>
                              <td className="py-2 px-2 border-r border-[#b58c58]/40 text-gray-400 font-normal">-- FREE --</td>
                              <td className="py-2 px-2 border-r border-[#b58c58]/40 font-medium text-purple-700">12-A (Math)</td>
                              <td className="py-2 px-2 border-r border-[#b58c58]/40 bg-[#f2e2ce]/60 font-bold text-[10px] text-amber-900">
                                BREAK
                              </td>
                              <td className="py-2 px-2 border-r border-[#b58c58]/40 font-medium text-blue-700">9-A (Math)</td>
                              <td className="py-2 px-2 border-r border-[#b58c58]/40 text-gray-400 font-normal">-- FREE --</td>
                              <td className="py-2 px-2 border-r border-[#b58c58]/40 font-medium text-emerald-700">10-B (Math)</td>
                              <td className="py-2 px-2 text-gray-400 font-normal">-- FREE --</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* -------------------- 7. ALL OTHER GENERAL REPORTS TABLE -------------------- */}
                {tabId !== "master_requirement" &&
                  tabId !== "subject_details" &&
                  tabId !== "class_teacher_details" &&
                  tabId !== "wing_wise_teacher_details" &&
                  tabId !== "subject_wise_teacher_details" &&
                  tabId !== "parallel_allocation_details" &&
                  tabId !== "consecutive_allocation_details" &&
                  tabId !== "class_and_resource_details" &&
                  tabId !== "week_wise_free_teacher_details" &&
                  tabId !== "free_teachers_classwise" &&
                  tabId !== "unallocated_period_details" &&
                  tabId !== "day_wise_free_teacher_details" &&
                  tabId !== "class_and_subject_taught" &&
                  tabId !== "teachers_work_load_details" &&
                  tabId !== "resource_timetable_details" &&
                  !tabId.includes("class_timetable") &&
                  !tabId.includes("particular_class") &&
                  !tabId.includes("teacher_timetable") &&
                  !tabId.includes("teacher_personal") && (
                    <div className="border border-[#b58c58] overflow-hidden">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead className="bg-[#fbf6ee] border-b border-[#b58c58]">
                          <tr className="text-gray-900 font-bold">
                            <th className="py-2 px-3 w-16 border-r border-[#b58c58]">SN</th>
                            <th className="py-2 px-4 border-r border-[#b58c58]">CLASS / ITEM</th>
                            <th className="py-2 px-4 border-r border-[#b58c58]">TEACHER / SUBJECT</th>
                            <th className="py-2 px-4 border-r border-[#b58c58]">ALLOTED PERIODS</th>
                            <th className="py-2 px-4 w-32">STATUS</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#b58c58]/40">
                          {ALL_SECTION_CLASSES.slice(0, 15).map((c, i) => (
                            <tr key={c} className={i % 2 === 1 ? "bg-[#fbf6ee]/30" : "bg-white"}>
                              <td className="py-1.5 px-3 border-r border-[#b58c58]/40 text-gray-800">{i + 1}</td>
                              <td className="py-1.5 px-4 border-r border-[#b58c58]/40 font-semibold text-gray-900">{c}</td>
                              <td className="py-1.5 px-4 border-r border-[#b58c58]/40 text-gray-800">
                                {i % 3 === 0
                                  ? "Mr. Amit Sharma (Math)"
                                  : i % 3 === 1
                                  ? "Mrs. Priya Singh (Sci)"
                                  : "Mr. Rajesh Kumar (Eng)"}
                              </td>
                              <td className="py-1.5 px-4 border-r border-[#b58c58]/40 text-gray-800 font-semibold">
                                {6 + (i % 3)} Periods / Week
                              </td>
                              <td className="py-1.5 px-4 text-emerald-700 font-bold">Allotted</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
              </div>

              {/* Footer Block matching Image 2 */}
              <div className="border-t border-[#b58c58] pt-2.5 mt-6 flex items-center justify-between text-xs font-bold text-gray-900 select-none">
                <div className="flex items-center gap-6">
                  <span>Academic Year : 2026-2027</span>
                  <span>{getFooterReportName()}  printed on 01-Sep-2026 at 05:09 PM</span>
                </div>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



