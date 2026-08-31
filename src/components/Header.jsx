import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaThLarge,
  FaCog,
  FaBell,
  FaAngleDown,
  FaAngleUp,
  FaUserPlus,
  FaKey,
  FaSignOutAlt,
  FaCheck,
  FaTimes,
  FaMoneyCheckAlt,
  FaBoxOpen,
  FaCalendarAlt,
  FaDesktop,
  FaArrowRight,
  FaMoneyBill,
  FaBuilding,
  FaStethoscope,
  FaBook,
  FaChartBar,
  FaFileInvoice,
  FaFileSignature,
  FaUserCheck,
} from "react-icons/fa";

function Header({
  currentTheme,
  setTheme,
  onSettingsClick,
  onProfileClick,
  onCredentialsClick,
}) {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAppsOpen, setIsAppsOpen] = useState(false);

  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;
  const fullName = user
    ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
    : "Admin";
  const role = user?.role || "Admin";
  const initials = user
    ? `${(user.firstName || "A")[0]}${(user.lastName || "")[0] || ""}`.toUpperCase()
    : "A";
  const profileImage = user?.profileImage;

  const themes = [
    "#2d2d2d",
    "#9f3453",
    "#2c3983",
    "#4f3b7b",
    "#13838e",
    "#a68c2d",
    "#48714b",
  ];

  return (
    <div
      className="h-16 flex items-center justify-between px-6 text-white flex-shrink-0 relative z-50"
      style={{ backgroundColor: currentTheme }}
    >
      <div className="text-sm">
        Welcome <span className="font-bold">{fullName}</span>
      </div>

      <div className="flex items-center gap-6">
        {isSearchOpen ? (
          <div className="flex items-center bg-gray-100 rounded text-gray-800 h-8 relative group">
            <input
              type="text"
              placeholder="Global Search (Module, Students, Staff)"
              className="bg-transparent border-none outline-none text-sm w-72 px-3 text-blue-500"
              autoFocus
            />
            <div
              className="cursor-pointer text-gray-500 hover:text-gray-700 bg-gray-300 h-full flex items-center justify-center px-2.5 rounded-r relative group"
              onClick={() => setIsSearchOpen(false)}
            >
              <FaTimes className="text-[10px]" />
              <div className="absolute hidden group-hover:block top-full mt-1.5 right-0 bg-black text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-50">
                <div className="absolute -top-1 right-2 w-2 h-2 bg-black transform rotate-45"></div>
                Global Search
              </div>
            </div>
          </div>
        ) : (
          <FaSearch
            className="cursor-pointer hover:text-teal-200 transition"
            onClick={() => setIsSearchOpen(true)}
          />
        )}
        <div className="">
          <div
            className="flex items-center gap-2 cursor-pointer hover:text-teal-200 transition"
            onClick={() => setIsAppsOpen(true)}
          >
            <FaThLarge />
            <span className="text-xs font-bold">ERP APPS</span>
          </div>

          {/* ERP APPS Drawer */}
          {isAppsOpen && (
            <>
              <div
                className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-[90]"
                onClick={() => setIsAppsOpen(false)}
              ></div>
              <div className="fixed right-0 top-0 h-screen w-80 bg-white text-gray-800 shadow-2xl z-[100] flex flex-col">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                  <h2 className="text-lg font-bold text-gray-800">ERP Apps</h2>
                  <FaTimes
                    className="text-gray-400 cursor-pointer hover:text-gray-600 transition"
                    onClick={() => setIsAppsOpen(false)}
                  />
                </div>

                <div className="px-4 py-3">
                  <div className="flex items-center bg-white border border-gray-200 rounded px-3 py-2">
                    <FaSearch className="text-gray-400 mr-2" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="bg-transparent border-none outline-none text-sm w-full text-gray-700"
                    />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                  {/* Active Apps */}
                  <div
                    className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition"
                    onClick={() => {
                      window.open("/admission", "_blank");
                      setIsAppsOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <FaFileSignature className="text-xl text-black" />
                      <span className="text-[15px] font-bold text-black">
                        Admission Manager
                      </span>
                    </div>
                    <span className="text-green-500 text-sm flex items-center gap-1">
                      Go <FaArrowRight className="text-xs font-light" />
                    </span>
                  </div>

                  <div
                    className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition"
                    onClick={() => {
                      window.open("/attendance", "_blank");
                      setIsAppsOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <FaUserCheck className="text-xl text-black" />
                      <span className="text-[15px] font-bold text-black">
                        Attendance
                      </span>
                    </div>
                    <span className="text-green-500 text-sm flex items-center gap-1">
                      Go <FaArrowRight className="text-xs font-light" />
                    </span>
                  </div>

                  <div
                    className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition"
                    onClick={() => {
                      window.open("/fee", "_blank");
                      setIsAppsOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <FaMoneyBill className="text-xl text-black" />
                      <span className="text-[15px] font-bold text-black">
                        Fee Management
                      </span>
                    </div>
                    <span className="text-green-500 text-sm flex items-center gap-1">
                      Go <FaArrowRight className="text-xs font-light" />
                    </span>
                  </div>

                  <div
                    className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition"
                    onClick={() => {
                      try {
                        localStorage.setItem("marks_activeTab", "dashboard");
                        localStorage.setItem("marks_selectedSubItem", "");
                        localStorage.setItem("marks_openMenu", "");
                      } catch {}
                      window.open("/marks", "_blank");
                      setIsAppsOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <FaChartBar className="text-xl text-black" />
                      <span className="text-[15px] font-bold text-black">
                        Marks Manager
                      </span>
                    </div>
                    <span className="text-green-500 text-sm flex items-center gap-1">
                      Go <FaArrowRight className="text-xs font-light" />
                    </span>
                  </div>

                  <div
                    className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition"
                    onClick={() => {
                      window.open("/payroll", "_blank");
                      setIsAppsOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <FaMoneyCheckAlt className="text-xl text-black" />
                      <span className="text-[15px] font-bold text-black">
                        Payroll
                      </span>
                    </div>
                    <span className="text-green-500 text-sm flex items-center gap-1">
                      Go <FaArrowRight className="text-xs font-light" />
                    </span>
                  </div>

                  <div
                    className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition"
                    onClick={() => {
                      window.open("/timetable", "_blank");
                      setIsAppsOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <FaCalendarAlt className="text-xl text-black" />
                      <span className="text-[15px] font-bold text-black">
                        Timetable
                      </span>
                    </div>
                    <span className="text-green-500 text-sm flex items-center gap-1">
                      Go <FaArrowRight className="text-xs font-light" />
                    </span>
                  </div>

                  <div
                    className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition"
                    onClick={() => {
                      window.open("/web-admin", "_blank");
                      setIsAppsOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <FaDesktop className="text-xl text-black" />
                      <span className="text-[15px] font-bold text-black">
                        Web Admin
                      </span>
                    </div>
                    <span className="text-green-500 text-sm flex items-center gap-1">
                      Go <FaArrowRight className="text-xs font-light" />
                    </span>
                  </div>

                  {/* Coming Soon Apps */}
                  <div
                    className="flex items-center justify-between px-6 py-4 opacity-60 cursor-not-allowed border-b border-gray-100 transition"
                    title="Coming Soon"
                  >
                    <div className="flex items-center gap-4">
                      <FaFileInvoice className="text-xl text-black" />
                      <span className="text-[15px] font-bold text-black">
                        Account Manager
                      </span>
                    </div>
                    <span className="text-gray-400 text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-gray-100 rounded">
                      Coming Soon
                    </span>
                  </div>

                  <div
                    className="flex items-center justify-between px-6 py-4 opacity-60 cursor-not-allowed border-b border-gray-100 transition"
                    title="Coming Soon"
                  >
                    <div className="flex items-center gap-4">
                      <FaBuilding className="text-xl text-black" />
                      <span className="text-[15px] font-bold text-black">
                        Front Office
                      </span>
                    </div>
                    <span className="text-gray-400 text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-gray-100 rounded">
                      Coming Soon
                    </span>
                  </div>

                  <div
                    className="flex items-center justify-between px-6 py-4 opacity-60 cursor-not-allowed border-b border-gray-100 transition"
                    title="Coming Soon"
                  >
                    <div className="flex items-center gap-4">
                      <FaStethoscope className="text-xl text-black" />
                      <span className="text-[15px] font-bold text-black">
                        HealthCare Manager
                      </span>
                    </div>
                    <span className="text-gray-400 text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-gray-100 rounded">
                      Coming Soon
                    </span>
                  </div>

                  <div
                    className="flex items-center justify-between px-6 py-4 opacity-60 cursor-not-allowed border-b border-gray-100 transition"
                    title="Coming Soon"
                  >
                    <div className="flex items-center gap-4">
                      <FaBook className="text-xl text-black" />
                      <span className="text-[15px] font-bold text-black">
                        Library Manager
                      </span>
                    </div>
                    <span className="text-gray-400 text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-gray-100 rounded">
                      Coming Soon
                    </span>
                  </div>

                  <div
                    className="flex items-center justify-between px-6 py-4 opacity-60 cursor-not-allowed border-b border-gray-100 transition"
                    title="Coming Soon"
                  >
                    <div className="flex items-center gap-4">
                      <FaBoxOpen className="text-xl text-black" />
                      <span className="text-[15px] font-bold text-black">
                        Stock Manager
                      </span>
                    </div>
                    <span className="text-gray-400 text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-gray-100 rounded">
                      Coming Soon
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <FaCog
          className="cursor-pointer hover:text-teal-200 transition text-base spin-clockwise"
          style={{ animation: "spinClockwise 4s linear infinite" }}
          onClick={onSettingsClick}
          title="Settings / Theme"
        />
        <div className="relative">
          <div
            className="cursor-pointer hover:text-teal-200 transition"
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
          >
            <FaBell className="text-lg" />
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              0
            </span>
          </div>

          {/* Notifications Dropdown */}
          {isNotificationOpen && (
            <div className="absolute right-[-10px] top-10 w-[320px] h-[350px] bg-white text-gray-800 shadow-xl py-2 cursor-default z-50">
              {/* Up Arrow */}
              <div className="absolute -top-2 right-3 w-4 h-4 bg-white transform rotate-45"></div>

              <div className="px-4 py-2 relative z-10">
                <span className="text-base text-black font-normal">
                  Notifications
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative ml-4">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-9 h-9 rounded-full border-2 border-white object-cover"
              />
            ) : (
              <div className="w-9 h-9 rounded-full border-2 border-white bg-white/20 flex items-center justify-center font-bold text-white text-sm">
                {initials}
              </div>
            )}
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-bold uppercase">{fullName}</span>
              <span className="text-xs text-teal-200 capitalize">{role}</span>
            </div>
            {isProfileOpen ? (
              <FaAngleUp className="ml-2" />
            ) : (
              <FaAngleDown className="ml-2" />
            )}
          </div>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 top-12 w-64 bg-white text-gray-800 rounded shadow-xl border border-gray-100 py-2">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 text-lg">
                    {initials}
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-900 uppercase">
                    {fullName}
                  </span>
                  <span className="text-xs text-gray-500 capitalize">
                    {role}
                  </span>
                </div>
              </div>

              <div
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm text-gray-700 border-b border-gray-100 transition"
                onClick={() => {
                  navigate("/dashboard/profile");
                  setIsProfileOpen(false);
                }}
              >
                My Profile
              </div>

              <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm text-gray-700 border-b border-gray-100 transition">
                <FaUserPlus className="text-gray-500" /> Add Another School
              </div>

              <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
                {themes.map((color, index) => (
                  <div
                    key={index}
                    className="w-6 h-6 rounded-full cursor-pointer flex items-center justify-center transition-transform hover:scale-110"
                    style={{ backgroundColor: color }}
                    onClick={() => setTheme(color)}
                  >
                    {color === currentTheme && (
                      <FaCheck className="text-white text-[10px]" />
                    )}
                  </div>
                ))}
              </div>

              <div
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm text-gray-700 border-b border-gray-100 transition"
                onClick={() => {
                  if (onCredentialsClick) onCredentialsClick();
                  setIsProfileOpen(false);
                }}
              >
                <FaKey className="text-gray-500" /> Change Credentials
              </div>

              <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm text-gray-700 transition">
                <FaSignOutAlt className="text-gray-500" /> Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
