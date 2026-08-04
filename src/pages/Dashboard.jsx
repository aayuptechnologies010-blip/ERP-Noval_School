import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import SettingsModal from '../components/SettingsModal';
import MyProfileModal from '../components/MyProfileModal';
import ChangeCredentialsModal from '../components/ChangeCredentialsModal';

function Dashboard() {
  const [theme, setTheme] = useState('#13838e'); // Default theme color
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCredentialsOpen, setIsCredentialsOpen] = useState(false);

  return (
    <div 
      className="flex h-screen w-full overflow-hidden font-sans transition-colors duration-300"
      style={{ backgroundColor: theme }}
    >
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Header 
          currentTheme={theme} 
          setTheme={setTheme} 
          onSettingsClick={() => {
            setIsSettingsOpen(true);
            setIsProfileOpen(false);
            setIsCredentialsOpen(false);
          }}
          onProfileClick={() => {
            setIsProfileOpen(true);
            setIsSettingsOpen(false);
            setIsCredentialsOpen(false);
          }}
          onCredentialsClick={() => {
            setIsCredentialsOpen(true);
            setIsProfileOpen(false);
            setIsSettingsOpen(false);
          }}
        />
        <Outlet />
        {isSettingsOpen && <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />}
        {isProfileOpen && <MyProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />}
        {isCredentialsOpen && <ChangeCredentialsModal isOpen={isCredentialsOpen} onClose={() => setIsCredentialsOpen(false)} />}
      </div>
    </div>
  );
}

export default Dashboard;
