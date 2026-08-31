import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DefineHoliday from "./DefineHoliday";
import DefineLeave from "./DefineLeave";
import DefineShiftMaster from "./DefineShiftMaster";
import ReportSettings from "./ReportSettings";
import SessionTransfer from "./SessionTransfer";
import ChangeAcademicYear from "./ChangeAcademicYear";
import AssignLeaveToStaff from "./AssignLeaveToStaff";
import ProcessAttendancePayroll from "./ProcessAttendancePayroll";
import MarkManualAttendance from "./MarkManualAttendance";
import LeaveMarking from "./LeaveMarking";
import LateInEarlyOutReport from "./LateInEarlyOutReport";
import QuickLink from "./QuickLink";
import {
  FaBars,
  FaChartPie,
  FaChartBar,
  FaChevronDown,
  FaChevronRight,
  FaCog,
  FaInfoCircle,
  FaQuestionCircle,
  FaSearch,
  FaUserCheck,
  FaUsers,
  FaVenus,
  FaMars,
  FaFingerprint,
  FaCheckSquare,
  FaUserTie,
  FaArrowLeft,
  FaArrowRight,
  FaGraduationCap,
  FaGlobe,
  FaTimes,
  FaCheck,
} from "react-icons/fa";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const departmentData = [
  { name: "ADMINISTRATION DEPT.", value: 2, color: "#e76f51" },
  { name: "OFFICE STAFF", value: 2, color: "#ff6b6b" },
  { name: "PRE-PRIMARY TEACHERS", value: 4, color: "#ffd166" },
  { name: "PRIMARY TEACHERS", value: 7, color: "#49dcb1" },
  { name: "SENIOR TEACHERS", value: 7, color: "#69a8ed" },
];
const shiftData = [
  { name: "Teacher's Timing", value: 18, color: "#e76f51" },
  { name: "Office Staff Timing", value: 4, color: "#ff6b6b" },
];
const departments = departmentData.map((item) => ({
  name: item.name,
  staff: item.value,
}));
const days = Array.from({ length: 31 }, (_, index) => ({
  day: index + 1,
  staff: 22,
}));

function AttendanceDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(
    location.pathname === "/attendance/late-in-early-out"
      ? "Reports"
      : location.pathname === "/attendance" ||
          location.pathname === "/attendance/assign-leave-to-staff" ||
          location.pathname === "/attendance/process-attendance-payroll"
        ? "Attendance"
        : location.pathname === "/attendance/change-academic-year"
          ? "Master Settings"
          : "Global Masters",
  );
  const [selectedAttendanceItem, setSelectedAttendanceItem] = useState(
    "Assign Leave To Staff",
  );
  const [dailyReportsOpen, setDailyReportsOpen] = useState(true);
  const [range, setRange] = useState("TODAY'S");
  const [academicYear, setAcademicYear] = useState("2026-2027");
  const [financialYear, setFinancialYear] = useState("2026-2027");

  // ==================== THEME CUSTOMIZER SYSTEM ====================
  const [isThemeDrawerOpen, setIsThemeDrawerOpen] = useState(false);
  const [currentThemeKey, setCurrentThemeKey] = useState(() => {
    try {
      return localStorage.getItem("erp_attendance_theme") || "light-teal";
    } catch {
      return "light-teal";
    }
  });

  const themePresets = {
    "light-teal": { id: "light-teal", mode: "light", headerBg: "#35bfb4", sidebarBg: "#ffffff", sidebarText: "#495057", sidebarActiveBg: "#35bfb4", sidebarActiveText: "#ffffff", accent: "#35bfb4" },
    "light-charcoal": { id: "light-charcoal", mode: "light", headerBg: "#4a5568", sidebarBg: "#ffffff", sidebarText: "#495057", sidebarActiveBg: "#35bfb4", sidebarActiveText: "#ffffff", accent: "#4a5568" },
    "light-green": { id: "light-green", mode: "light", headerBg: "#48d68f", sidebarBg: "#ffffff", sidebarText: "#495057", sidebarActiveBg: "#48d68f", sidebarActiveText: "#ffffff", accent: "#48d68f" },
    "light-slate": { id: "light-slate", mode: "light", headerBg: "#9ba9ba", sidebarBg: "#ffffff", sidebarText: "#495057", sidebarActiveBg: "#9ba9ba", sidebarActiveText: "#ffffff", accent: "#9ba9ba" },
    "light-cyan": { id: "light-cyan", mode: "light", headerBg: "#22a3d7", sidebarBg: "#ffffff", sidebarText: "#495057", sidebarActiveBg: "#22a3d7", sidebarActiveText: "#ffffff", accent: "#22a3d7" },
    "light-purple": { id: "light-purple", mode: "light", headerBg: "#6d78d2", sidebarBg: "#ffffff", sidebarText: "#495057", sidebarActiveBg: "#6d78d2", sidebarActiveText: "#ffffff", accent: "#6d78d2" },

    "dark-coral": { id: "dark-coral", mode: "dark", headerBg: "#ff6b6b", sidebarBg: "#2d303e", sidebarText: "#adb2bf", sidebarActiveBg: "#222834", sidebarActiveText: "#ffffff", accent: "#ff6b6b" },
    "dark-emerald": { id: "dark-emerald", mode: "dark", headerBg: "#00b894", sidebarBg: "#2d303e", sidebarText: "#adb2bf", sidebarActiveBg: "#222834", sidebarActiveText: "#ffffff", accent: "#00b894" },
    "dark-slate": { id: "dark-slate", mode: "dark", headerBg: "#9ba9ba", sidebarBg: "#2d303e", sidebarText: "#adb2bf", sidebarActiveBg: "#222834", sidebarActiveText: "#ffffff", accent: "#9ba9ba" },
    "dark-cyan": { id: "dark-cyan", mode: "dark", headerBg: "#32a3d7", sidebarBg: "#2d303e", sidebarText: "#adb2bf", sidebarActiveBg: "#222834", sidebarActiveText: "#ffffff", accent: "#32a3d7" },
    "dark-purple": { id: "dark-purple", mode: "dark", headerBg: "#6d78d2", sidebarBg: "#2d303e", sidebarText: "#adb2bf", sidebarActiveBg: "#222834", sidebarActiveText: "#ffffff", accent: "#6d78d2" },
  };

  const activeTheme = themePresets[currentThemeKey] || themePresets["light-teal"];

  const isHolidayPage = location.pathname === "/attendance/define-holiday";
  const isLeavePage = location.pathname === "/attendance/define-leave";
  const isShiftPage = location.pathname === "/attendance/define-shift-master";
  const isReportSettingsPage =
    location.pathname === "/attendance/report-settings";
  const isSessionTransferPage =
    location.pathname === "/attendance/session-transfer";
  const isAcademicYearPage =
    location.pathname === "/attendance/change-academic-year";
  const isAssignLeavePage =
    location.pathname === "/attendance/assign-leave-to-staff";
  const isPayrollPage =
    location.pathname === "/attendance/process-attendance-payroll";
  const isManualAttendancePage =
    location.pathname === "/attendance/mark-manual-attendance";
  const isLeaveMarkingPage = location.pathname === "/attendance/leave-marking";
  const isLateReportPage =
    location.pathname === "/attendance/late-in-early-out";
  const isQuickLinkPage = location.pathname === "/attendance/quick-link";

  return (
    <div className="attendance-app">
      <aside
        className={`attendance-sidebar ${drawerOpen ? "is-open" : ""}`}
        style={{ backgroundColor: activeTheme.sidebarBg, color: activeTheme.sidebarText }}
        onMouseEnter={() => setDrawerOpen(true)}
        onMouseLeave={() => setDrawerOpen(false)}
      >
        <div className="attendance-brand">
          <span>NAVALS NATIONAL ACADEMY</span>
        </div>
        <div className="attendance-menu-title">
          <FaBars /> <span>Navigation</span>
        </div>
        <div className="attendance-search" role="search">
          <FaSearch />
          <input placeholder="Search Menu" />
        </div>
        <nav>
          <button
            className={`attendance-nav-item ${expandedMenu === "Global Masters" ? "is-active" : ""}`}
            onClick={() =>
              setExpandedMenu(
                expandedMenu === "Global Masters" ? "" : "Global Masters",
              )
            }
          >
            <span>
              <span className="attendance-nav-icon">
                <FaGlobe />
              </span>
              <span className="attendance-nav-label">Global Masters</span>
            </span>
            <FaChevronDown
              className={
                expandedMenu === "Global Masters" ? "" : "is-collapsed"
              }
            />
          </button>
          {expandedMenu === "Global Masters" && (
            <div className="attendance-submenu">
              {[
                "Define Holiday",
                "Define Leave",
                "Define Shift Master",
                "Report Settings",
                "Session Transfer",
              ].map((item) => (
                <button
                  key={item}
                  className={`attendance-submenu-item ${(item === "Define Holiday" && isHolidayPage) || (item === "Define Leave" && isLeavePage) || (item === "Define Shift Master" && isShiftPage) || (item === "Report Settings" && isReportSettingsPage) || (item === "Session Transfer" && isSessionTransferPage) ? "is-selected" : ""}`}
                  onClick={() => {
                    if (item === "Define Holiday")
                      navigate("/attendance/define-holiday");
                    if (item === "Define Leave")
                      navigate("/attendance/define-leave");
                    if (item === "Define Shift Master")
                      navigate("/attendance/define-shift-master");
                    if (item === "Report Settings")
                      navigate("/attendance/report-settings");
                    if (item === "Session Transfer")
                      navigate("/attendance/session-transfer");
                  }}
                >
                  <span className="attendance-submenu-dot" />
                  <span className="attendance-nav-label">{item}</span>
                </button>
              ))}
            </div>
          )}
          <button
            className={`attendance-nav-item ${expandedMenu === "Master Settings" ? "is-active" : ""}`}
            onClick={() =>
              setExpandedMenu(
                expandedMenu === "Master Settings" ? "" : "Master Settings",
              )
            }
          >
            <span>
              <span className="attendance-nav-icon">
                <FaCog />
              </span>
              <span className="attendance-nav-label">Master Settings</span>
            </span>
            <FaChevronDown
              className={
                expandedMenu === "Master Settings" ? "" : "is-collapsed"
              }
            />
          </button>
          {expandedMenu === "Master Settings" && (
            <div className="attendance-submenu">
              <button
                className={`attendance-submenu-item ${isAcademicYearPage ? "is-selected" : ""}`}
                onClick={() => navigate("/attendance/change-academic-year")}
              >
                <span className="attendance-submenu-dot" />
                <span className="attendance-nav-label">
                  Change Academic Year
                </span>
              </button>
            </div>
          )}
          <button
            className={`attendance-nav-item ${expandedMenu === "Attendance" ? "is-active" : ""}`}
            onClick={() =>
              setExpandedMenu(expandedMenu === "Attendance" ? "" : "Attendance")
            }
          >
            <span>
              <span className="attendance-nav-icon">
                <FaUsers />
              </span>
              <span className="attendance-nav-label">Attendance</span>
            </span>
            <FaChevronDown
              className={expandedMenu === "Attendance" ? "" : "is-collapsed"}
            />
          </button>
          {expandedMenu === "Attendance" && (
            <div className="attendance-submenu">
              {[
                "Assign Leave To Staff",
                "Process Attendance for Payroll",
                "Mark Manual Attendance",
                "Leave Marking",
              ].map((item) => (
                <button
                  key={item}
                  className={`attendance-submenu-item ${(selectedAttendanceItem === item && !isPayrollPage && !isManualAttendancePage && !isLeaveMarkingPage) || (item === "Process Attendance for Payroll" && isPayrollPage) || (item === "Mark Manual Attendance" && isManualAttendancePage) || (item === "Leave Marking" && isLeaveMarkingPage) ? "is-selected" : ""}`}
                  onClick={() => {
                    setSelectedAttendanceItem(item);
                    if (item === "Assign Leave To Staff") {
                      navigate("/attendance/assign-leave-to-staff");
                    }
                    if (item === "Process Attendance for Payroll") {
                      navigate("/attendance/process-attendance-payroll");
                    }
                    if (item === "Mark Manual Attendance") {
                      navigate("/attendance/mark-manual-attendance");
                    }
                    if (item === "Leave Marking") {
                      navigate("/attendance/leave-marking");
                    }
                  }}
                >
                  <span className="attendance-submenu-dot" />
                  <span className="attendance-nav-label">{item}</span>
                </button>
              ))}
            </div>
          )}
          <button
            className={`attendance-nav-item ${isLateReportPage ? "is-active" : ""}`}
            onClick={() =>
              setExpandedMenu(expandedMenu === "Reports" ? "" : "Reports")
            }
          >
            <span>
              <span className="attendance-nav-icon">
                <FaChartBar />
              </span>
              <span className="attendance-nav-label">Reports</span>
            </span>
            <FaChevronDown
              className={expandedMenu === "Reports" ? "" : "is-collapsed"}
            />
          </button>
          {expandedMenu === "Reports" && (
            <div className="attendance-submenu">
              <button
                className="attendance-submenu-item attendance-submenu-parent"
                onClick={() => setDailyReportsOpen(!dailyReportsOpen)}
              >
                <span className="attendance-submenu-dot" />
                <span className="attendance-nav-label">Daily Reports</span>
                <FaChevronDown
                  className={dailyReportsOpen ? "" : "is-collapsed"}
                />
              </button>
              {dailyReportsOpen && (
                <button
                  className={`attendance-submenu-item attendance-submenu-child ${isLateReportPage ? "is-selected" : ""}`}
                  onClick={() => navigate("/attendance/late-in-early-out")}
                >
                  <span className="attendance-nav-label">
                    <span className="attendance-child-arrow">›</span>Late In
                    Early Out Report
                  </span>
                </button>
              )}
              <button className="attendance-submenu-item">
                <span className="attendance-submenu-dot" />
                <span className="attendance-nav-label">Sms Report</span>
              </button>
            </div>
          )}
        </nav>
      </aside>

      <main className="attendance-main">
        <header className="attendance-header" style={{ backgroundColor: activeTheme.headerBg }}>
          <button 
            type="button" 
            className="attendance-icon-button"
            onClick={() => setDrawerOpen(!drawerOpen)}
            title="Toggle Menu"
          >
            <FaBars />
          </button>

          <div className="attendance-title">
            <strong className="text-[#e53935] font-extrabold tracking-wider text-sm sm:text-base">NAVALS NATIONAL ACADEMY</strong>
          </div>

          <div className="attendance-module">
            <FaUserCheck className="text-lg" />
            <span className="font-bold text-sm">Attendance</span>
          </div>

          <div className="attendance-selectors">
            <label>
              <FaGraduationCap /> Academic Year : 
              <select
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
              >
                <option>2026-2027</option>
                <option>2025-2026</option>
              </select>
            </label>

            <label>
              <FaChartPie /> Financial Year : 
              <select
                value={financialYear}
                onChange={(e) => setFinancialYear(e.target.value)}
              >
                <option>2026-2027</option>
                <option>2025-2026</option>
              </select>
            </label>
          </div>

          <div className="attendance-header-actions">
            <FaQuestionCircle className="cursor-pointer hover:opacity-80 text-base" title="Help" />
            <FaInfoCircle className="cursor-pointer hover:opacity-80 text-base" title="Info" />
            <FaCog
              className="spin-clockwise cursor-pointer text-lg hover:opacity-100 transition-all text-white"
              style={{ animation: "spinClockwise 4s linear infinite" }}
              onClick={() => setIsThemeDrawerOpen(true)}
              title="Theme Settings"
            />
            <div className="flex items-center gap-1.5 cursor-pointer">
              <strong className="text-white text-xs font-bold uppercase tracking-wider">ANKIT KUMAR</strong>
              <FaChevronDown className="text-xs text-white" />
            </div>
          </div>
        </header>

        <div className="quick-access">
          <div className="flex items-center gap-2 text-[#00bcd4] font-bold text-xs tracking-wider">
            <span>QUICK ACCESS</span>
            <FaChevronRight className="text-xs" />
          </div>
          <button
            title="Customize"
            onClick={() => navigate("/attendance/quick-link")}
            className="flex items-center gap-1 text-[#00bcd4] border border-[#00bcd4] hover:bg-cyan-50 px-2.5 py-1 rounded transition text-xs font-medium cursor-pointer"
          >
            <FaCog className="text-xs" />
            <span>Customize</span>
          </button>
        </div>

        {isHolidayPage ? (
          <DefineHoliday />
        ) : isLeavePage ? (
          <DefineLeave />
        ) : isShiftPage ? (
          <DefineShiftMaster />
        ) : isReportSettingsPage ? (
          <ReportSettings />
        ) : isSessionTransferPage ? (
          <SessionTransfer />
        ) : isAcademicYearPage ? (
          <ChangeAcademicYear />
        ) : isAssignLeavePage ? (
          <AssignLeaveToStaff />
        ) : isPayrollPage ? (
          <ProcessAttendancePayroll />
        ) : isManualAttendancePage ? (
          <MarkManualAttendance />
        ) : isLeaveMarkingPage ? (
          <LeaveMarking />
        ) : isLateReportPage ? (
          <LateInEarlyOutReport />
        ) : isQuickLinkPage ? (
          <QuickLink />
        ) : (
          <div className="attendance-content">
            <section className="attendance-card-grid">
              <SummaryCard
                title="STAFF HEAD COUNT (REG./TOTAL)"
                value="0/22"
                rows={[
                  [<FaMars />, "Male", "0/13", "#9aa8b4"],
                  [<FaVenus />, "Female", "0/9", "#ff6b73"],
                ]}
              />
              <SummaryCard
                title="ATTENDANCE AUTHENTICATION STATISTICS"
                rows={[
                  [<FaFingerprint />, "Through Biometric", "0 (0%)", "#28a9e2"],
                  [<FaCheckSquare />, "Manually", "0 (0%)", "#42d992"],
                ]}
              />
              <SummaryCard
                title="AVERAGE ATTENDANCE"
                subtitle="(COMPARISON WITH LAST WORKING DAY)"
                rows={[
                  [
                    <FaUserCheck />,
                    "Present",
                    "TODAY 0 (0%)   YESTERDAY 0",
                    "#43db9a",
                  ],
                  [
                    <FaUserCheck />,
                    "Absent",
                    "TODAY 0 (0%)   YESTERDAY 0",
                    "#ff6b73",
                  ],
                ]}
              />
              <div className="summary-card holiday-card">
                <h3>THIS MONTH’S HOLIDAY(S) LIST</h3>
                <a href="#holidays">◉&nbsp; View All</a>
                <div className="holiday-arrows">
                  <FaArrowLeft />
                  <FaArrowRight />
                </div>
              </div>
            </section>

            <ChartPanel
              title="ATTENDANCE FOR"
              suffix="( AUG 2026 )"
              range={range}
              setRange={setRange}
            >
              <div className="chart-with-summary">
                <div className="large-chart">
                  <p>As on 26-Aug-2026</p>
                  <ResponsiveContainer width="100%" height={310}>
                    <BarChart
                      data={[
                        { name: "Teacher's Timing", value: 18 },
                        { name: "Office Staff Timing", value: 4 },
                      ]}
                      margin={{ top: 15, right: 10, left: 20, bottom: 25 }}
                    >
                      <CartesianGrid stroke="#e5e7eb" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis
                        label={{
                          value: "STAFF STRENGTH",
                          angle: -90,
                          position: "insideLeft",
                        }}
                      />
                      <Tooltip />
                      <Bar dataKey="value" fill="#20a9d8" barSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <ShiftSummary title="SUMMARY OF ALL SHIFTS :" />
              </div>
            </ChartPanel>

            <ChartPanel
              title="STAFF ATTENDANCE ANALYSIS"
              suffix="(DEPARTMENT WISE)"
              range={range}
              setRange={setRange}
            >
              <div className="chart-with-summary">
                <div className="large-chart">
                  <p>As on 26-Aug-2026</p>
                  <ResponsiveContainer width="100%" height={310}>
                    <BarChart
                      data={departments}
                      margin={{ top: 15, right: 10, left: 20, bottom: 45 }}
                    >
                      <CartesianGrid stroke="#e5e7eb" vertical={false} />
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 12 }}
                        textAnchor="middle"
                        interval={0}
                      />
                      <YAxis
                        domain={[0, 7]}
                        label={{
                          value: "STAFF STRENGTH",
                          angle: -90,
                          position: "insideLeft",
                        }}
                      />
                      <Tooltip />
                      <Bar dataKey="staff" fill="#20a9d8" barSize={28} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <ShiftSummary
                  title="SUMMARY OF ALL DEPARTMENTS:"
                  showReprocess={false}
                />
              </div>
            </ChartPanel>

            <section className="attendance-two-column">
              <PiePanel
                title="DEPARTMENT WISE HEAD COUNT"
                data={departmentData}
              />
              <PiePanel title="SHIFT WISE HEAD COUNT" data={shiftData} />
            </section>

            <ChartPanel
              title="STAFF’S ATTENDANCE ANALYSIS"
              suffix="(SHIFT WISE)"
              range={range}
              setRange={setRange}
            >
              <div className="attendance-line-chart">
                <ResponsiveContainer width="100%" height={360}>
                  <BarChart
                    data={days}
                    margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid stroke="#e5e7eb" vertical={false} />
                    <XAxis
                      dataKey="day"
                      label={{
                        value: "MONTH'S DAY",
                        position: "insideBottom",
                        offset: -10,
                      }}
                    />
                    <YAxis
                      domain={[0, 25]}
                      label={{
                        value: "STAFF STRENGTH",
                        angle: -90,
                        position: "insideLeft",
                      }}
                    />
                    <Tooltip />
                    <Bar dataKey="staff" fill="#62bf27" barSize={3} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </ChartPanel>
          </div>
        )}
      </main>

      {/* ==================== THEME DRAWER MODAL (MATCHING MARKS MANAGER) ==================== */}
      {isThemeDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Transparent Backdrop */}
          <div
            onClick={() => setIsThemeDrawerOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-[0.5px] transition-opacity"
          ></div>

          {/* Drawer Panel */}
          <div className="relative w-64 bg-white h-full shadow-2xl z-50 flex flex-col animate-slideLeft border-l border-gray-200 select-none">
            
            {/* Top Blue Header */}
            <div
              className="h-12 px-4 flex items-center justify-between text-white font-bold text-sm tracking-wide"
              style={{ backgroundColor: activeTheme.headerBg }}
            >
              <span>THEME</span>
              <button
                type="button"
                onClick={() => setIsThemeDrawerOpen(false)}
                className="text-white hover:text-gray-200 text-base leading-none p-1 cursor-pointer bg-transparent border-none"
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
                  {/* Swatch 0: Vibrant Teal (Default Matching Screenshot) */}
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentThemeKey("light-teal");
                      localStorage.setItem("erp_attendance_theme", "light-teal");
                    }}
                    className={`w-14 h-14 rounded-[2px] cursor-pointer transition-transform hover:scale-105 flex items-center justify-center shadow-sm relative border-none ${
                      currentThemeKey === "light-teal" ? "ring-2 ring-blue-500" : ""
                    }`}
                    style={{ backgroundColor: "#35bfb4" }}
                    title="Vibrant Teal (Default Screenshot)"
                  >
                    {currentThemeKey === "light-teal" && <FaCheck className="text-white text-base" />}
                  </button>

                  {/* Swatch 1: Charcoal */}
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentThemeKey("light-charcoal");
                      localStorage.setItem("erp_attendance_theme", "light-charcoal");
                    }}
                    className={`w-14 h-14 rounded-[2px] cursor-pointer transition-transform hover:scale-105 flex items-center justify-center shadow-sm relative border-none ${
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
                    className={`w-14 h-14 rounded-[2px] cursor-pointer transition-transform hover:scale-105 flex items-center justify-center shadow-sm relative border-none ${
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
                    className={`w-14 h-14 rounded-[2px] cursor-pointer transition-transform hover:scale-105 flex items-center justify-center shadow-sm relative border-none ${
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
                    className={`w-14 h-14 rounded-[2px] cursor-pointer transition-transform hover:scale-105 flex items-center justify-center shadow-sm relative border-none ${
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
                    className={`w-14 h-14 rounded-[2px] cursor-pointer transition-transform hover:scale-105 flex items-center justify-center shadow-sm relative border-none ${
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
                    className={`w-14 h-14 rounded-[2px] cursor-pointer transition-transform hover:scale-105 overflow-hidden flex shadow-sm relative border-none p-0 ${
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
                    className={`w-14 h-14 rounded-[2px] cursor-pointer transition-transform hover:scale-105 overflow-hidden flex shadow-sm relative border-none p-0 ${
                      currentThemeKey === "dark-emerald" ? "ring-2 ring-blue-500" : ""
                    }`}
                    title="Emerald Green (Dark Sidebar)"
                  >
                    <div className="w-1/4 h-full bg-[#3b434e]"></div>
                    <div className="w-3/4 h-full bg-[#00b894] flex items-center justify-center">
                      {currentThemeKey === "dark-emerald" && <FaCheck className="text-white text-base" />}
                    </div>
                  </button>

                  {/* Swatch 8: Dark + Slate */}
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentThemeKey("dark-slate");
                      localStorage.setItem("erp_active_theme", "dark-slate");
                    }}
                    className={`w-14 h-14 rounded-[2px] cursor-pointer transition-transform hover:scale-105 overflow-hidden flex shadow-sm relative border-none p-0 ${
                      currentThemeKey === "dark-slate" ? "ring-2 ring-blue-500" : ""
                    }`}
                    title="Steel Slate (Dark Sidebar)"
                  >
                    <div className="w-1/4 h-full bg-[#3b434e]"></div>
                    <div className="w-3/4 h-full bg-[#9ba9ba] flex items-center justify-center">
                      {currentThemeKey === "dark-slate" && <FaCheck className="text-white text-base" />}
                    </div>
                  </button>

                  {/* Swatch 9: Dark + Sky Blue */}
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentThemeKey("dark-cyan");
                      localStorage.setItem("erp_active_theme", "dark-cyan");
                    }}
                    className={`w-14 h-14 rounded-[2px] cursor-pointer transition-transform hover:scale-105 overflow-hidden flex shadow-sm relative border-none p-0 ${
                      currentThemeKey === "dark-cyan" ? "ring-2 ring-blue-500" : ""
                    }`}
                    title="Sky Blue (Dark Sidebar)"
                  >
                    <div className="w-1/4 h-full bg-[#3b434e]"></div>
                    <div className="w-3/4 h-full bg-[#32a3d7] flex items-center justify-center">
                      {currentThemeKey === "dark-cyan" && <FaCheck className="text-white text-base" />}
                    </div>
                  </button>

                  {/* Swatch 10: Dark + Indigo Purple */}
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentThemeKey("dark-purple");
                      localStorage.setItem("erp_active_theme", "dark-purple");
                    }}
                    className={`w-14 h-14 rounded-[2px] cursor-pointer transition-transform hover:scale-105 overflow-hidden flex shadow-sm relative border-none p-0 ${
                      currentThemeKey === "dark-purple" ? "ring-2 ring-blue-500" : ""
                    }`}
                    title="Indigo Purple (Dark Sidebar)"
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
    </div>
  );
}

function SummaryCard({ title, value, subtitle, rows }) {
  return (
    <div className="summary-card">
      <h3>{title}</h3>
      {subtitle && <small>{subtitle}</small>}
      {value && <strong className="summary-value">{value}</strong>}
      <div className="summary-rows">
        {rows.map(([icon, label, amount, color]) => (
          <div className="summary-row" key={label}>
            <span style={{ color }}>
              {icon} {label}
            </span>
            <b>{amount}</b>
          </div>
        ))}
      </div>
    </div>
  );
}
function ShiftSummary({ title, showReprocess = true }) {
  return (
    <div className="shift-summary">
      <div className="shift-summary-header">
        <h3>{title}</h3>
        {showReprocess && <button>Reprocess Attendance</button>}
      </div>
      {[
        "Total Staff",
        "Total Present",
        "Total Absent",
        "Total Late",
        "Total On Leave",
        "Total On Duty",
        "Total Early Exit",
      ].map((label) => (
        <div key={label}>
          <span>{label}</span>
          <b>:</b>
          <strong>{label === "Total Staff" ? 22 : 0}</strong>
        </div>
      ))}
    </div>
  );
}
function ChartPanel({ title, suffix, range, setRange, children }) {
  return (
    <section className="chart-panel">
      <div className="panel-heading">
        <h2>
          {title} <span>{suffix}</span>
        </h2>
        <div className="range-tabs">
          {["TODAY'S", "LAST 7 DAYS", "LAST 30 DAYS"].map((item) => (
            <button
              key={item}
              className={range === item ? "active" : ""}
              onClick={() => setRange(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <LegendItems />
      </div>
      {children}
    </section>
  );
}
function LegendItems() {
  return (
    <div className="legend-items">
      <span>
        <i className="blue" />
        Total Staff
      </span>
      <span>
        <i className="green" />
        Total Present
      </span>
      <span>
        <i className="pink" />
        Total Absent
      </span>
      <span>
        <i className="yellow" />
        Total Late
      </span>
      <span>
        <i className="orange" />
        Total On Leave
      </span>
      <span>
        <i className="purple" />
        Total Early Exit
      </span>
      <span>
        <i className="mint" />
        Total On Duty
      </span>
    </div>
  );
}
function PiePanel({ title, data }) {
  return (
    <section className="pie-panel">
      <h2>{title}</h2>
      <div className="pie-body">
        <ResponsiveContainer width="60%" height={290}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={62}
              outerRadius={112}
              paddingAngle={1}
              label={({ percent }) => `${Math.round(percent * 100)}%`}
            >
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="pie-total">
          {data.reduce((sum, item) => sum + item.value, 0)}
        </div>
        <div className="pie-legend">
          {data.map((item) => (
            <span key={item.name}>
              <i style={{ background: item.color }} />
              {item.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
export default AttendanceDashboard;
