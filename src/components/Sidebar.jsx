import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaSearch, FaThLarge, FaBookmark, FaGraduationCap, FaUserTie, 
  FaTasks, FaTable, FaBook, FaEnvelope, FaBullhorn, FaMobileAlt, 
  FaUser, FaBookReader, FaAngleDown, FaBars, FaBookOpen, 
  FaCalendarAlt, FaCalendarCheck, FaQuestion, FaRegCommentDots, 
  FaCalendarPlus, FaListUl, FaClipboardCheck, FaFileSignature, 
  FaChartPie, FaNetworkWired, FaBus, FaImages, FaUserGraduate, 
  FaBirthdayCake, FaPlus, FaFileAlt, FaMoneyBill
} from 'react-icons/fa';
import logo from '../assets/logo.png';

function Sidebar({ currentTheme }) {
  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleMenu = (name, depth) => {
    setExpandedMenus(prev => {
      // If clicking the already open menu, close it and all its children
      if (prev[depth] === name) {
        const newState = { ...prev };
        for (let i = depth; i <= 10; i++) {
          delete newState[i];
        }
        return newState;
      }
      
      // Otherwise, open it and close any previously open menus at this depth and deeper
      const newState = { ...prev, [depth]: name };
      for (let i = depth + 1; i <= 10; i++) {
        delete newState[i];
      }
      return newState;
    });
  };

  const MenuItem = ({ item, depth = 0 }) => {
    const isExpanded = expandedMenus[depth] === item.name;
    const paddingLeft = depth === 0 ? 'px-3' : depth === 1 ? 'pl-9 pr-3' : 'pl-14 pr-3';

    if (item.subItems) {
      return (
        <>
          <div 
            className={`flex items-center justify-between py-2.5 rounded-md transition cursor-pointer hover:bg-teal-600/50 ${paddingLeft}`}
            onClick={() => toggleMenu(item.name, depth)}
          >
            <div className="flex items-center gap-3">
              {item.icon && <item.icon className="text-sm text-teal-100" />}
              <span className="text-sm font-medium">{item.name}</span>
            </div>
            <FaAngleDown className={`text-xs text-teal-200 transition-transform duration-300 ${isExpanded ? '' : '-rotate-90'}`} />
          </div>
          
          <div 
            className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
          >
            <div className="overflow-hidden">
              <ul className="flex flex-col gap-1 mt-1 pb-1">
                {item.subItems.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <MenuItem item={subItem} depth={depth + 1} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      );
    }

    return (
      <NavLink 
        to={item.path}
        className={({ isActive }) => 
          `flex items-center justify-between py-2 rounded-md transition ${isActive ? 'bg-teal-600' : 'hover:bg-teal-600/50'} ${paddingLeft}`
        }
      >
        {({ isActive }) => (
          <>
            <div className="flex items-center gap-3">
              {item.icon && <item.icon className={`text-sm ${isActive ? 'text-white' : 'text-teal-100'}`} />}
              <span className="text-sm font-medium">{item.name}</span>
            </div>
            {item.hasArrow && <FaAngleDown className="-rotate-90 text-xs text-teal-200" />}
          </>
        )}
      </NavLink>
    );
  };

  const menuItems = [
    { name: 'Dashboard', icon: FaThLarge, path: '/dashboard/home' },
    { 
      name: 'Favorites', 
      icon: FaBookmark, 
      hasArrow: true,
      subItems: [
        { name: 'Transport Attendance', icon: FaBus, path: '/dashboard/favorites/transport' },
        { name: 'Students Profile', icon: FaUserGraduate, path: '/dashboard/favorites/students' },
        { name: 'Staff Profile', icon: FaUserTie, path: '/dashboard/favorites/staff' },
        { name: 'Photo Albums', icon: FaImages, path: '/dashboard/favorites/photos' },
        { name: 'Birthday Report', icon: FaBirthdayCake, path: '/dashboard/favorites/birthday' },
        { name: 'Report', icon: FaFileAlt, path: '/dashboard/favorites/report' },
        { name: 'Add to favorite', icon: FaPlus, path: '/dashboard/favorites/add' },
      ]
    },
    { 
      name: 'Students', 
      icon: FaGraduationCap, 
      subItems: [
        { name: 'All Students', path: '/dashboard/students' },
        { 
          name: 'Attendance', 
          subItems: [
            { name: 'Attendance Summary', path: '/dashboard/students/attendance/summary' },
            { name: 'Mark Attendance', path: '/dashboard/students/attendance/mark' },
            { name: 'Modify Leave Attendance', path: '/dashboard/students/attendance/modify-leave' },
            { name: 'Absentee SMS', path: '/dashboard/students/attendance/absentee-sms' },
          ]
        },
        { name: 'Leave Requests', path: '/dashboard/students/leave-requests' },
        { 
          name: 'Update Record', 
          subItems: [
            { name: 'Class Promotion', path: '/dashboard/students/update-record/promotion' },
            { name: 'Manage Roll Number', path: '/dashboard/students/update-record/roll-number' },
            { name: 'Assign House', path: '/dashboard/students/update-record/house' },
            { name: 'Upload Student Photo', path: '/dashboard/students/update-record/photo' },
            { name: 'Assign Club', path: '/dashboard/students/update-record/club' },
          ]
        },
      ]
    },
    { 
      name: 'Staff', 
      icon: FaUserTie, 
      subItems: [
        { name: 'Staff Profile', path: '/dashboard/staff/profile' },
        { name: 'Staff Leave', path: '/dashboard/staff/leave' },
        { name: 'Staff Attendance', path: '/dashboard/staff/attendance' },
        { name: 'Class Teacher', path: '/dashboard/staff/class-teacher' },
      ]
    },
    { name: 'Assignment', icon: FaTasks, path: '/dashboard/assignment' },
    { name: 'Timetable', icon: FaTable, path: '/dashboard/timetable' },
    { name: 'Syllabus', icon: FaBook, path: '/dashboard/syllabus' },
    { 
      name: 'Message', 
      icon: FaEnvelope, 
      subItems: [
        { name: 'Compose Message', path: '/dashboard/message/compose' },
        { name: 'Inbox', path: '/dashboard/message/inbox' },
        { name: 'Sent Messages', path: '/dashboard/message/sent' },
        { name: 'Specified Message', path: '/dashboard/message/specified' },
      ]
    },
    { 
      name: 'Announcement', 
      icon: FaBullhorn, 
      subItems: [
        { name: 'School Notice', path: '/dashboard/announcement/school' },
        { name: 'Class Notice', path: '/dashboard/announcement/class' },
        { name: 'Staff Notice', path: '/dashboard/announcement/staff' },
        { name: 'Circular', path: '/dashboard/announcement/circular' },
        { name: 'Create Circular', path: '/dashboard/announcement/create-circular' },
      ]
    },
    { 
      name: 'Manage SMS', 
      icon: FaMobileAlt, 
      subItems: [
        { name: 'Send SMS', path: '/dashboard/sms/send' },
        { name: 'Specified SMS', path: '/dashboard/sms/specified' },
        { name: 'Send Credentials', path: '/dashboard/sms/credentials' },
        { name: 'Text To Number', path: '/dashboard/sms/text' },
      ]
    },
    { 
      name: 'Teacher Observation', 
      icon: FaSearch, 
      subItems: [
        { name: 'Observation Entry', path: '/dashboard/observation/entry' },
        { name: 'Observation Report', path: '/dashboard/observation/report' },
      ]
    },
    { 
      name: 'My Info', 
      icon: FaUser, 
      subItems: [
        { name: 'My Attendance', path: '/dashboard/myinfo/attendance' },
        { name: 'My Leave', path: '/dashboard/myinfo/leave' },
        { name: 'Pending Leaves', path: '/dashboard/myinfo/pending' },
        { name: 'Payslip', path: '/dashboard/myinfo/payslip' },
      ]
    },
    { name: 'Library', icon: FaBookReader, path: '/dashboard/library' },
    { name: 'e-Books', icon: FaBookOpen, path: '/dashboard/ebooks' },
    { name: 'Calendar', icon: FaCalendarAlt, path: '/dashboard/calendar' },
    { name: 'Define Activities', icon: FaCalendarCheck, path: '/dashboard/activities' },
    { name: 'Questionnaire', icon: FaQuestion, path: '/dashboard/questionnaire' },
    { name: 'Thoughts', icon: FaRegCommentDots, path: '/dashboard/thoughts' },
    { name: 'Appointment', icon: FaCalendarPlus, path: '/dashboard/appointment' },
    { name: 'Task Management', icon: FaListUl, path: '/dashboard/task' },
    { 
      name: 'Discipline Log', 
      icon: FaClipboardCheck, 
      subItems: [
        { 
          name: 'Appreciation', 
          subItems: [
            { name: 'Define Appreciation', path: '/dashboard/discipline/appreciation/define' },
            { name: 'Define Rewards', path: '/dashboard/discipline/appreciation/rewards' },
            { name: 'Add to Student', path: '/dashboard/discipline/appreciation/student' },
            { name: 'Appreciation Report', path: '/dashboard/discipline/appreciation/report' },
            { name: 'Add to Staff', path: '/dashboard/discipline/appreciation/staff' },
          ]
        },
        { 
          name: 'Infraction', 
          subItems: [
            { name: 'Define Infraction', path: '/dashboard/discipline/infraction/define' },
            { name: 'Define Consequences', path: '/dashboard/discipline/infraction/consequences' },
            { name: 'Infraction for Student', path: '/dashboard/discipline/infraction/student' },
            { name: 'Infraction for Staff', path: '/dashboard/discipline/infraction/staff' },
            { name: 'Infraction Report', path: '/dashboard/discipline/infraction/report' },
            { name: 'My Infraction', path: '/dashboard/discipline/infraction/my' },
          ]
        },
      ]
    },
    { name: 'Lesson Plan', icon: FaFileSignature, path: '/dashboard/lesson' },
    { 
      name: 'Report', 
      icon: FaChartPie, 
      subItems: [
        { name: 'Attendance Report', path: '/dashboard/report/attendance' },
        { name: 'Missing Attendance', path: '/dashboard/report/missing-attendance' },
        { name: 'Average Attendance Analysis', path: '/dashboard/report/average-attendance' },
        { name: "Teachers' Workload", path: '/dashboard/report/teachers-workload' },
        { name: 'Conversation', path: '/dashboard/report/conversation' },
        { name: 'Birthday Report', path: '/dashboard/report/birthday' },
        { name: 'Lesson Plan', path: '/dashboard/report/lesson-plan' },
        { name: 'Question Paper', path: '/dashboard/report/question-paper' },
        { 
          name: 'SMS Report', 
          subItems: [
            { name: 'Report', path: '/dashboard/report/sms/report' },
            { name: 'Consumption', path: '/dashboard/report/sms/consumption' },
            { name: 'Recharge Log', path: '/dashboard/report/sms/recharge' },
            { name: 'SMS Uses', path: '/dashboard/report/sms/uses' },
          ]
        },
        { name: 'App Message Uses', path: '/dashboard/report/app-message' },
        { name: 'Statistical Report', path: '/dashboard/report/statistical' },
        { name: 'App Users', path: '/dashboard/report/app-users' },
        { name: 'Survey Report', path: '/dashboard/report/survey' },
        { name: 'Undertaking Acknowledgement', path: '/dashboard/report/undertaking' },
      ]
    },
    { name: 'Manage Survey', icon: FaNetworkWired, path: '/dashboard/managesurvey' },
    { name: 'Transport Attendance', icon: FaBus, path: '/dashboard/transport' },
    { name: 'Survey', icon: FaNetworkWired, path: '/dashboard/survey' },
    { 
      name: 'Gallery', 
      icon: FaImages, 
      subItems: [
        { name: 'Photo Albums', path: '/dashboard/photos' },
        { name: 'Video Albums', path: '/dashboard/gallery/videos' },
        { name: 'Favorites', path: '/dashboard/gallery/favorites' },
        { name: 'Media Gallery', path: '/dashboard/gallery/media' },
      ]
    },
  ];

  return (
    <div className="w-64 h-full flex flex-col text-white flex-shrink-0" style={{ backgroundColor: currentTheme }}>
      
      {/* Logo Area */}
      <div className="h-20 flex items-center px-4 gap-2 border-b border-teal-600/30">
        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
          <img src={logo} alt="Logo" className="w-full h-full object-contain" />
        </div>
        <span className="font-extrabold text-sm tracking-wide text-white whitespace-nowrap">Naval's National Academy</span>
      </div>

      {/* Menu Header */}
      <div className="px-4 py-4 flex items-center gap-3">
        <FaBars className="text-xl" />
        <span className="font-bold text-lg">Menu</span>
      </div>

      {/* Search */}
      <div className="px-4 mb-4">
        <div className="bg-white rounded-md flex items-center px-3 py-1.5 text-gray-500">
          <FaSearch className="text-sm mr-2" />
          <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-sm w-full" />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-8">
        <ul className="flex flex-col gap-1 px-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <MenuItem item={item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
