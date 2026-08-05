import React from 'react';
import { 
  FaHandPointer, FaUserCog, FaSlidersH, FaProjectDiagram, FaFileInvoice, FaEnvelopeOpenText,
  FaCog, FaSms, FaCalendarCheck, FaUserShield, FaImages, FaTasks,
  FaBookReader, FaUserClock, FaClock, FaUserLock, FaSearch, FaArrowLeft
} from 'react-icons/fa';

function SettingsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const settingsData = [
    { title: 'Set up Permissions', desc: 'From here you can give permission of "Set-up" to different Roles', icon: FaHandPointer, color: 'bg-yellow-600', lightColor: 'bg-yellow-100', iconColor: 'text-yellow-600' },
    { title: 'Manage Roles', desc: 'From here you can create, Edit or Delete roles as your requirement. You can also edit permissions given to a particular role from here.', icon: FaUserCog, color: 'bg-green-500', lightColor: 'bg-green-100', iconColor: 'text-green-500' },
    { title: 'Dashboard Customisation', desc: 'From here you can customise Dashboard for different roles.', icon: FaSlidersH, color: 'bg-purple-500', lightColor: 'bg-purple-100', iconColor: 'text-purple-500' },
    { title: 'ERP Permissions', desc: 'From here you can give permissions of all ERP Modules to individual Users.', icon: FaProjectDiagram, color: 'bg-pink-400', lightColor: 'bg-pink-100', iconColor: 'text-pink-400' },
    { title: 'Leave Policy Set up', desc: 'From here you can customise your leave policy according to your rules.', icon: FaFileInvoice, color: 'bg-red-400', lightColor: 'bg-red-100', iconColor: 'text-red-400' },
    { title: 'Message Control', desc: 'From here you can give control of message (read and write permissions) to different roles.', icon: FaEnvelopeOpenText, color: 'bg-blue-400', lightColor: 'bg-blue-100', iconColor: 'text-blue-400' },
    { title: 'General Settings', desc: 'Set up general rules for your school such as attendance, leave, I-Card, message rules etc. It is must to set up these rules before start using e-Care panel.', icon: FaCog, color: 'bg-orange-400', lightColor: 'bg-orange-100', iconColor: 'text-orange-400' },
    { title: 'Communication Templates', desc: 'You can set up SMS templates for your school from here.', icon: FaSms, color: 'bg-yellow-500', lightColor: 'bg-yellow-100', iconColor: 'text-yellow-500' },
    { title: 'Lesson Plan Set up', desc: 'Customise your Lesson Plan Form from here.', icon: FaCalendarCheck, color: 'bg-green-400', lightColor: 'bg-green-100', iconColor: 'text-green-400' },
    { title: 'Profile Controls', desc: 'From here you can control what data of Student and Staff Profile do you want to show to which Role.', icon: FaUserShield, color: 'bg-green-500', lightColor: 'bg-green-100', iconColor: 'text-green-500' },
    { title: 'Gallery Settings', desc: 'Manage user permissions for Like, Share, and Add to Favorites options in the gallery.', icon: FaImages, color: 'bg-purple-400', lightColor: 'bg-purple-100', iconColor: 'text-purple-400' },
    { title: 'Task Management', desc: 'From here, you can customize the Task Management module', icon: FaTasks, color: 'bg-blue-400', lightColor: 'bg-blue-100', iconColor: 'text-blue-400' },
    { title: 'Login Setup', desc: 'Manage OTP requirements for user logins based on roles. Enable or disable OTP verification for different roles to enhance security and control access efficiently.', icon: FaBookReader, color: 'bg-blue-400', lightColor: 'bg-blue-100', iconColor: 'text-blue-400' },
    { title: 'Attendance Settings', desc: 'Configure attendance management rules, including late marking, backdated attendance, record modifications, etc.', icon: FaUserClock, color: 'bg-green-400', lightColor: 'bg-green-100', iconColor: 'text-green-400' },
    { title: 'SMS Alert Scheduler', desc: 'Set up automated SMS alerts for birthdays, anniversaries, and low attendance of students.', icon: FaClock, color: 'bg-red-400', lightColor: 'bg-red-100', iconColor: 'text-red-400' },
    { title: 'Data & Privacy Settings', desc: 'Define which user roles are authorized to view sensitive personal data. Enable role-specific access to prevent unauthorized disclosure and ensure that sensitive information remains masked for restricted users.', icon: FaUserLock, color: 'bg-green-600', lightColor: 'bg-green-100', iconColor: 'text-green-600' },
  ];

  return (
    <div className="absolute inset-0 bg-[#f1f5f9] rounded-tl-[2rem] overflow-hidden flex z-[60]">
      
      {/* Scrollable Content Container */}
      <div className="flex-1 w-full h-full overflow-y-auto pb-12 relative px-4 sm:px-10 lg:px-20 pt-8">
        
        {/* Header / Search */}
        <div className="flex items-center justify-between mb-8 relative max-w-7xl mx-auto">
          <button 
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 text-gray-600 hover:text-green-600 hover:border-green-400 transition-colors font-medium text-sm"
          >
            <FaArrowLeft />
            <span>Back</span>
          </button>
          <div className="relative w-full max-w-xl mx-4">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full h-12 pl-10 pr-4 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:border-green-400 bg-white"
            />
          </div>
          <div className="w-24"></div> {/* Spacer for centering the search bar */}
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {settingsData.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col transition-transform hover:-translate-y-1 hover:shadow-lg">
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${item.lightColor} ${item.iconColor} flex-shrink-0`}>
                      <IconComponent className="text-xl" />
                    </div>
                    <h3 className="font-bold text-gray-800 text-lg">{item.title}</h3>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed flex-1">
                    {item.desc}
                  </p>
                </div>
                
                <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
                  <button className="text-green-500 font-medium text-sm flex items-center gap-1 hover:text-green-700 transition">
                    Start <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center text-sm font-bold text-gray-400 py-10 mt-6 max-w-7xl mx-auto">
          COPYRIGHT © 2026 FRANCISCAN
        </div>

      </div>
    </div>
  );
}

export default SettingsModal;
