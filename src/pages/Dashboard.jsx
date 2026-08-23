import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import SettingsModal from '../components/SettingsModal';
import ChangeCredentialsModal from '../components/ChangeCredentialsModal';

function Dashboard() {
  const [theme, setTheme] = useState('#13838e'); // Default theme color
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCredentialsOpen, setIsCredentialsOpen] = useState(false);

  return (
    <div 
      className="flex h-screen w-full overflow-hidden font-sans bg-[#f8f9fc]"
    >
      <Sidebar currentTheme={theme} />
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Header 
          currentTheme={theme} 
          setTheme={setTheme} 
          onSettingsClick={() => {
            setIsSettingsOpen(true);
            setIsCredentialsOpen(false);
          }}
          onCredentialsClick={() => {
            setIsCredentialsOpen(true);
            setIsSettingsOpen(false);
          }}
        />
        <div className="flex-1 overflow-y-auto bg-[#f8f9fc]">
          <Outlet />
        </div>
        {isSettingsOpen && <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />}
        {isCredentialsOpen && <ChangeCredentialsModal isOpen={isCredentialsOpen} onClose={() => setIsCredentialsOpen(false)} />}
      </div>
    </div>
  );
}

export default Dashboard;
