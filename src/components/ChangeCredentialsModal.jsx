import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function ChangeCredentialsModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('Change Password');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Change Password state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("New Password and Confirm Password do not match.");
      return;
    }
    
    if (newPassword.length < 5 || newPassword.length > 12) {
      alert("Password must be between 5 to 12 characters.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/change-password`, {
        method: 'POST', // Usually POST or PUT for this action
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          oldPassword,
          newPassword
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Password successfully changed! Please login again.");
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/'; // Redirect to login
      } else {
        alert(data.message || "Failed to change password.");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="flex-1 bg-[#f9fafb] rounded-tl-[2rem] p-6 overflow-y-auto no-scrollbar relative">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Change Credentials</h2>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        
        {/* Tabs */}
        <div className="flex items-center bg-[#f9fafb] p-1 rounded mb-8 w-full max-w-2xl">
          <button 
            className={`px-6 py-2.5 text-sm font-medium transition-colors ${activeTab === 'Change Password' ? 'bg-[#5cb85c] text-white rounded' : 'text-gray-600 hover:text-gray-800'}`}
            onClick={() => setActiveTab('Change Password')}
          >
            Change Password
          </button>
          <button 
            className={`px-6 py-2.5 text-sm font-medium transition-colors ${activeTab === 'Change Username' ? 'bg-[#5cb85c] text-white rounded' : 'text-gray-600 hover:text-gray-800'}`}
            onClick={() => setActiveTab('Change Username')}
          >
            Change Username
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'Change Password' && (
          <div className="flex flex-col md:flex-row gap-12">
            
            {/* Left Column: Form */}
            <div className="flex-1 max-w-md">
              <h3 className="text-lg font-bold text-gray-800 mb-6">Change Password</h3>
              
              <div className="mb-4">
                <label className="block text-gray-600 text-sm mb-2">Current Password</label>
                <input 
                  type="password" 
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-green-500 transition-colors"
                />
              </div>

              <div className="mb-4 relative">
                <label className="block text-gray-600 text-sm mb-2">New Password</label>
                <div className="relative">
                  <input 
                    type={showNewPassword ? "text" : "password"} 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-green-500 transition-colors pr-10"
                  />
                  <button 
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="mb-8 relative">
                <label className="block text-gray-600 text-sm mb-2">Confirm Password</label>
                <div className="relative">
                  <input 
                    type={showConfirmPassword ? "text" : "password"} 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-green-500 transition-colors pr-10"
                  />
                  <button 
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button 
                onClick={handleChangePassword}
                disabled={loading}
                className="bg-[#5cb85c] text-white px-6 py-2.5 rounded text-sm hover:bg-green-600 transition-colors disabled:opacity-50"
              >
                {loading ? 'Changing...' : 'Change Password'}
              </button>
            </div>

            {/* Right Column: Note */}
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Note:</h3>
              <div className="text-sm text-gray-500 flex flex-col gap-4">
                <p>Password must be between 5 to 12 characters .</p>
                <p>Your password should be including at least 1 number or special character except for # and &.</p>
                <p>Once Password will be successfully changed, you'll be redirect to Login Page.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Change Username' && (
          <div className="flex flex-col md:flex-row gap-12">
            
            {/* Left Column: Form */}
            <div className="flex-1 max-w-md">
              <h3 className="text-lg font-bold text-gray-800 mb-6">Change Username</h3>
              
              <div className="mb-4">
                <label className="block text-gray-600 text-sm mb-2">Current User name</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-green-500 transition-colors"
                />
              </div>

              <div className="mb-6 relative">
                <label className="block text-gray-600 text-sm mb-2">New User name</label>
                <div>
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-green-500 transition-colors"
                  />
                  <div className="flex justify-end mt-1">
                    <button type="button" className="bg-[#00a8ff] text-white text-[10px] font-bold px-2 py-1 rounded">
                      Check Username Availability
                    </button>
                  </div>
                </div>
              </div>

              <button className="bg-[#6c7df8] text-white px-6 py-2.5 rounded text-sm hover:bg-blue-600 transition-colors">
                Change User name
              </button>
            </div>

            {/* Right Column: Note */}
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Note:</h3>
              <div className="text-sm text-gray-500 flex flex-col gap-4">
                <p>Usernames must consist of alphanumeric characters (A-Z,a-z, 0-9)</p>
                <p>No Special Characters allowed in username</p>
                <p>Username must be between 5 to 10 characters</p>
                <p>Once Username will be successfully changed, you'll be redirect to Login Page.</p>
              </div>
            </div>
          </div>
        )}

      </div>
      
      {/* Footer */}
      <div className="text-center text-[13px] font-bold text-gray-400 py-8">
        COPYRIGHT © 2026 FRANCISCAN
      </div>
      
    </div>
  );
}

export default ChangeCredentialsModal;
