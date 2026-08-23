import React, { useState, useEffect } from 'react';
import { FaTimes, FaUserCheck, FaEnvelope, FaUserClock, FaWallet, FaMoneyBillWave, FaBriefcase, FaSuitcaseRolling } from 'react-icons/fa';

function Profile() {
  const [activeTab, setActiveTab] = useState('Personal details');
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [saving, setSaving] = useState(false);

  const handleEditClick = () => {
    if (!isEditing) {
      setEditForm(profileData || {});
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setEditForm(prev => ({ ...prev, profileImageFile: e.target.files[0] }));
    }
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      
      const fields = ['firstName', 'lastName', 'phone', 'gender', 'dob', 'address', 'qualification', 'experience', 'joiningDate'];
      fields.forEach(field => {
        if (editForm[field] !== undefined) {
          formData.append(field, editForm[field]);
        }
      });

      if (editForm.profileImageFile) {
        formData.append('profileImage', editForm.profileImageFile);
      }

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        const fetchProfile = async () => {
          const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/profile`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const data = await res.json();
          if (res.ok) {
            setProfileData(data);
            const userStr = localStorage.getItem('user');
            if (userStr) {
              const user = JSON.parse(userStr);
              localStorage.setItem('user', JSON.stringify({ ...user, ...data }));
              window.location.reload(); 
            }
          }
        };
        await fetchProfile();
        setIsEditing(false);
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
        setLoading(true);
        try {
          const token = localStorage.getItem('token');
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/profile`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const data = await response.json();
          if (response.ok) {
            setProfileData(data);
          } else {
            console.error('Failed to fetch profile', data);
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
        } finally {
          setLoading(false);
        }
    };
    fetchProfile();
  }, []);

  const getInitials = () => {
    if (!profileData) return 'A';
    return `${(profileData.firstName || 'A')[0]}${(profileData.lastName || '')[0] || ''}`.toUpperCase();
  };

  const tabs = [
    'Personal details',
    'Attendance',
    'Salary',
    'Timetable',
    'Session Log'
  ];

  return (
    <div className="flex-1 bg-[#f9fafb] p-6 overflow-y-auto no-scrollbar relative h-full">
        
        {/* Header / Close - Optional if you want them to go back, but screenshot shows it without. */}
        {/* <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={onClose}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-500 hover:text-gray-800 shadow hover:shadow-md transition"
          >
            <FaTimes />
          </button>
        </div> */}

        <div className="w-full flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Staff Details</h2>
            {activeTab === 'Personal details' && (
              <div className="flex gap-2">
                {isEditing && (
                  <button 
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition text-sm font-bold shadow-md disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Save Profile'}
                  </button>
                )}
                <button 
                  onClick={handleEditClick}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition text-sm font-bold shadow-md"
                >
                  {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                </button>
              </div>
            )}
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            
            {/* Left Sidebar */}
            <div className="w-full md:w-64 flex-shrink-0">
              <div className="flex flex-col items-center mb-8">
                <div className="relative">
                  {profileData?.profileImage || editForm.profileImageFile ? (
                    <img 
                      src={editForm.profileImageFile ? URL.createObjectURL(editForm.profileImageFile) : profileData?.profileImage} 
                      alt="Profile" 
                      className="w-32 h-40 object-cover rounded shadow-md mb-4"
                    />
                  ) : (
                    <div className="w-32 h-40 rounded shadow-md mb-4 bg-gray-200 flex items-center justify-center text-gray-500 text-5xl font-bold">
                      {getInitials()}
                    </div>
                  )}
                  {isEditing && (
                    <div className="absolute inset-0 bg-black/50 rounded flex items-center justify-center mb-4 opacity-0 hover:opacity-100 transition cursor-pointer">
                      <label className="cursor-pointer text-white text-sm font-bold w-full h-full flex items-center justify-center">
                        Upload
                        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                      </label>
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-bold text-[#4caf50] uppercase tracking-wide">
                  {loading ? 'Loading...' : `${profileData?.firstName || 'User'} ${profileData?.lastName || ''}`}
                </h3>
                <span className="text-gray-900 font-bold text-sm">{profileData?.role || 'Admin'}</span>
              </div>
              
              <div className="flex flex-col gap-1">
                {tabs.map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-left px-4 py-3 text-sm font-medium rounded ${
                      activeTab === tab 
                        ? 'bg-[#43a047] text-white shadow-md' 
                        : 'text-gray-600 hover:bg-gray-200'
                    } transition-colors`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Content */}
            <div className="flex-1 flex flex-col">
              
              {/* Top Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-400 font-medium mb-1">Assignments</div>
                    <div className="text-xl font-bold text-gray-800">0</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <FaUserCheck className="text-red-400 text-lg" />
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-400 font-medium mb-1">Sent Message</div>
                    <div className="text-xl font-bold text-gray-800">0</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <FaEnvelope className="text-green-400 text-lg" />
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-400 font-medium mb-1">Attendance</div>
                    <div className="text-xl font-bold text-gray-800">0</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                    <FaUserClock className="text-yellow-500 text-lg" />
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-400 font-medium mb-1">Current Salary</div>
                    <div className="text-xl font-bold text-gray-800">₹ 0.00</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                    <FaWallet className="text-pink-400 text-lg" />
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-400 font-medium mb-1">Advance Given</div>
                    <div className="text-xl font-bold text-gray-800">₹ 0.00</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-lime-100 flex items-center justify-center">
                    <FaMoneyBillWave className="text-lime-500 text-lg" />
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-400 font-medium mb-1">Work Load</div>
                    <div className="text-xl font-bold text-gray-800">0</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <FaBriefcase className="text-purple-400 text-lg" />
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-400 font-medium mb-1">Leaves</div>
                    <div className="text-xl font-bold text-gray-800"></div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-lime-100 flex items-center justify-center">
                    <FaSuitcaseRolling className="text-lime-500 text-lg" />
                  </div>
                </div>
              </div>

              {/* Tab Content */}
              {activeTab === 'Personal details' && (
                <div className="flex flex-col gap-8 bg-white p-6 rounded-xl shadow-sm">
                  
                  {/* Essentials */}
                  <div>
                    <div className="bg-gray-200 px-4 py-2 rounded-t-md border-b-2 border-[#81c784] mb-4">
                      <h4 className="font-bold text-gray-800 text-sm">Essentials</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-6 text-[13px] px-2 text-gray-800">
                      <div><span className="font-bold mr-1">Employee Number:</span></div>
                      <div><span className="font-bold mr-1">Title:</span> Mr.</div>
                      <div><span className="font-bold mr-1">First Name:</span> {isEditing ? <input name="firstName" value={editForm.firstName || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full mt-1" /> : profileData?.firstName}</div>
                      
                      <div><span className="font-bold mr-1">Middle Name:</span></div>
                      <div><span className="font-bold mr-1">Last Name:</span> {isEditing ? <input name="lastName" value={editForm.lastName || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full mt-1" /> : profileData?.lastName}</div>
                      <div><span className="font-bold mr-1">Joining Type:</span></div>
                      
                      <div><span className="font-bold mr-1">Employment Status:</span></div>
                      <div><span className="font-bold mr-1">Serial Number:</span></div>
                      <div><span className="font-bold mr-1">Current Status:</span> Active</div>
                      
                      <div><span className="font-bold mr-1">Role:</span> {profileData?.role}</div>
                    </div>
                  </div>

                  {/* Unique IDs */}
                  <div>
                    <div className="bg-gray-200 px-4 py-2 rounded-t-md border-b-2 border-[#81c784] mb-4">
                      <h4 className="font-bold text-gray-800 text-sm">Unique IDs</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-6 text-[13px] px-2 text-gray-800">
                      <div><span className="font-bold mr-1">State Teacher Code:</span></div>
                      <div><span className="font-bold mr-1">Biometric Machine No:</span> 31</div>
                      <div><span className="font-bold mr-1">Family ID:</span></div>
                      
                      <div><span className="font-bold mr-1">CBSE ID:</span></div>
                      <div><span className="font-bold mr-1">National Teacher Code:</span></div>
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <div className="bg-gray-200 px-4 py-2 rounded-t-md border-b-2 border-[#81c784] mb-4">
                      <h4 className="font-bold text-gray-800 text-sm">Address</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-6 text-[13px] px-2 text-gray-800">
                      <div><span className="font-bold mr-1">Primary Mobile:</span> {isEditing ? <input name="phone" value={editForm.phone || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full mt-1" /> : profileData?.phone}</div>
                      <div><span className="font-bold mr-1">Secondary Mobile:</span></div>
                      <div><span className="font-bold mr-1">Email:</span> {profileData?.email}</div>
                      
                      <div><span className="font-bold mr-1">Phone:</span> {isEditing ? <input name="phone" value={editForm.phone || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full mt-1" /> : profileData?.phone}</div>
                      <div className="col-span-1 md:col-span-2"><span className="font-bold mr-1">Current Address:</span> {isEditing ? <input name="address" value={editForm.address || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full mt-1" /> : profileData?.address}</div>
                      <div><span className="font-bold mr-1">City:</span></div>
                      
                      <div><span className="font-bold mr-1">State:</span> 0</div>
                      <div><span className="font-bold mr-1">Pin Code:</span></div>
                      <div><span className="font-bold mr-1">Permanent Address:</span> VILL IBRAHIMABAD POST DOHRIGHAT MAU</div>
                      
                      <div><span className="font-bold mr-1">Permanent City:</span></div>
                      <div><span className="font-bold mr-1">Permanent State:</span> 0</div>
                      <div><span className="font-bold mr-1">Permanent Pin Code:</span></div>
                    </div>
                  </div>

                  {/* Personal Details */}
                  <div>
                    <div className="bg-gray-200 px-4 py-2 rounded-t-md border-b-2 border-[#81c784] mb-4">
                      <h4 className="font-bold text-gray-800 text-sm">Personal Details</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-6 text-[13px] px-2 text-gray-800">
                      <div><span className="font-bold mr-1">Date of Birth:</span> {isEditing ? <input type="date" name="dob" value={editForm.dob || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full mt-1" /> : profileData?.dob}</div>
                      <div><span className="font-bold mr-1">Gender:</span> {isEditing ? (
                        <select name="gender" value={editForm.gender || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full mt-1">
                          <option value="">Select</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      ) : profileData?.gender}</div>
                      <div><span className="font-bold mr-1">Religion:</span> HINDU</div>
                      
                      <div><span className="font-bold mr-1">Category:</span> SC</div>
                      <div><span className="font-bold mr-1">Nationality:</span> Indian</div>
                      <div><span className="font-bold mr-1">Place Of Birth:</span></div>
                      
                      <div><span className="font-bold mr-1">Aadhaar Number:</span></div>
                      <div><span className="font-bold mr-1">PAN Number:</span></div>
                    </div>
                  </div>
                  
                  {/* Employment Details */}
                  <div>
                    <div className="bg-gray-200 px-4 py-2 rounded-t-md border-b-2 border-[#81c784] mb-4">
                      <h4 className="font-bold text-gray-800 text-sm">Employment Details</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-6 text-[13px] px-2 text-gray-800">
                      <div><span className="font-bold mr-1">Date of Joining:</span> {isEditing ? <input type="date" name="joiningDate" value={editForm.joiningDate || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full mt-1" /> : profileData?.joiningDate}</div>
                      <div><span className="font-bold mr-1">Rejoin Date:</span></div>
                      <div><span className="font-bold mr-1">Staff Type:</span> ADMIN DEPT</div>
                      
                      <div><span className="font-bold mr-1">Department:</span> ADMINITRATION DEPT.</div>
                      <div><span className="font-bold mr-1">Designation:</span> Manager</div>
                      <div><span className="font-bold mr-1">Short Name:</span> A KUMAR</div>
                      
                      <div><span className="font-bold mr-1">Probation Date:</span></div>
                      <div><span className="font-bold mr-1">Confirmation Date:</span></div>
                      <div><span className="font-bold mr-1">Permanent Date:</span></div>
                      
                      <div><span className="font-bold mr-1">Contract Expiry:</span> 01 Jan 1900</div>
                      <div><span className="font-bold mr-1">Retirement Date:</span> 10 Dec 2050</div>
                      <div><span className="font-bold mr-1">Extend Service:</span> No</div>
                      
                      <div><span className="font-bold mr-1">Extension Start Date:</span> 01 Jan 1900</div>
                      <div><span className="font-bold mr-1">Extension End Date:</span> 01 Jan 1900</div>
                      <div><span className="font-bold mr-1">Wings:</span> Kindergarten</div>
                    </div>
                  </div>
                  
                  {/* Family */}
                  <div>
                    <div className="bg-gray-200 px-4 py-2 rounded-t-md border-b-2 border-[#81c784] mb-4">
                      <h4 className="font-bold text-gray-800 text-sm">Family</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-6 text-[13px] px-2 text-gray-800">
                      <div><span className="font-bold mr-1">Marital Status:</span> Unmarried</div>
                      <div><span className="font-bold mr-1">Emergency Contact Name:</span></div>
                      <div><span className="font-bold mr-1">Emergency Contact Mobile:</span></div>
                      <div><span className="font-bold mr-1">Emergency Contact Relation:</span></div>
                    </div>
                  </div>
                  
                  {/* Health & Medical */}
                  <div>
                    <div className="bg-gray-200 px-4 py-2 rounded-t-md border-b-2 border-[#81c784] mb-4">
                      <h4 className="font-bold text-gray-800 text-sm">Health & Medical</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-6 text-[13px] px-2 text-gray-800">
                      <div><span className="font-bold mr-1">Blood Group:</span></div>
                      <div><span className="font-bold mr-1">Allergy Details:</span></div>
                      <div><span className="font-bold mr-1">Chronic Condition:</span></div>
                      
                      <div><span className="font-bold mr-1">Disability Status:</span> No</div>
                      <div><span className="font-bold mr-1">Disability Details:</span></div>
                      <div><span className="font-bold mr-1">Emergency Medical Notes:</span></div>
                      
                      <div><span className="font-bold mr-1">Insurance Provider:</span></div>
                      <div><span className="font-bold mr-1">Insurance Policy No:</span></div>
                      <div><span className="font-bold mr-1">Insurance Expiry:</span></div>
                      
                      <div><span className="font-bold mr-1">Medically Fit:</span> No</div>
                    </div>
                  </div>
                  
                  {/* Job Compliance */}
                  <div>
                    <div className="bg-gray-200 px-4 py-2 rounded-t-md border-b-2 border-[#81c784] mb-4">
                      <h4 className="font-bold text-gray-800 text-sm">Job Compliance</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-6 text-[13px] px-2 text-gray-800">
                      <div><span className="font-bold mr-1">Child Protection Certified:</span> No</div>
                      <div><span className="font-bold mr-1">Child Protection Declaration:</span> No</div>
                      <div><span className="font-bold mr-1">BG Verification Status:</span> No</div>
                      
                      <div><span className="font-bold mr-1">BG Verification Agency:</span></div>
                      <div><span className="font-bold mr-1">Compliance Remarks:</span></div>
                    </div>
                  </div>
                  
                  {/* Compensation & Benefits */}
                  <div>
                    <div className="bg-gray-200 px-4 py-2 rounded-t-md border-b-2 border-[#81c784] mb-4">
                      <h4 className="font-bold text-gray-800 text-sm">Compensation & Benefits</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-6 text-[13px] px-2 text-gray-800">
                      <div><span className="font-bold mr-1">Generate Salary:</span> No</div>
                      <div><span className="font-bold mr-1">Disbursal Mode:</span> Cash</div>
                      <div><span className="font-bold mr-1">IFSC Code:</span></div>
                      
                      <div><span className="font-bold mr-1">Bank Name:</span></div>
                      <div><span className="font-bold mr-1">Account Number:</span></div>
                    </div>
                  </div>
                  
                  {/* Statutory Compliance */}
                  <div>
                    <div className="bg-gray-200 px-4 py-2 rounded-t-md border-b-2 border-[#81c784] mb-4">
                      <h4 className="font-bold text-gray-800 text-sm">Statutory Compliance</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-6 text-[13px] px-2 text-gray-800">
                      <div><span className="font-bold mr-1">Gratuity Code:</span></div>
                      <div><span className="font-bold mr-1">Gratuity Nominee:</span></div>
                      <div><span className="font-bold mr-1">Gratuity Nominee Aadhar:</span></div>
                      
                      <div><span className="font-bold mr-1">Gratuity Nominee Phone:</span></div>
                      <div><span className="font-bold mr-1">UAN Number:</span></div>
                      <div><span className="font-bold mr-1">PF Number:</span></div>
                      
                      <div><span className="font-bold mr-1">PF Start Date:</span></div>
                      <div><span className="font-bold mr-1">PF End Date:</span></div>
                      <div><span className="font-bold mr-1">PF Nominee:</span></div>
                    </div>
                  </div>

                  {/* Staff Separation */}
                  <div>
                    <div className="bg-gray-200 px-4 py-2 rounded-t-md border-b-2 border-[#81c784] mb-4">
                      <h4 className="font-bold text-gray-800 text-sm">Staff Separation</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-6 text-[13px] px-2 text-gray-800">
                      <div><span className="font-bold mr-1">Separation Mode:</span></div>
                      <div><span className="font-bold mr-1">Last Working Date:</span></div>
                      <div><span className="font-bold mr-1">Resignation Date:</span></div>
                      
                      <div><span className="font-bold mr-1">Separation Approved By:</span></div>
                      <div><span className="font-bold mr-1">Notice Period (Days):</span></div>
                      <div><span className="font-bold mr-1">Notice Period Served:</span></div>
                      
                      <div><span className="font-bold mr-1">Exit Interview Status:</span></div>
                      <div><span className="font-bold mr-1">NOC/Clearance Status:</span></div>
                      <div><span className="font-bold mr-1">F&F Settlement Status:</span></div>
                      
                      <div><span className="font-bold mr-1">Relieving Letter Issued:</span> No</div>
                      <div><span className="font-bold mr-1">Relieving Letter Date:</span></div>
                      <div><span className="font-bold mr-1">Experience Letter Issued:</span> No</div>
                      
                      <div><span className="font-bold mr-1">Experience Letter Date:</span></div>
                      <div><span className="font-bold mr-1">Fit for Rehire:</span> No</div>
                    </div>
                  </div>

                  {/* Reference */}
                  <div>
                    <div className="bg-gray-200 px-4 py-2 rounded-t-md border-b-2 border-[#81c784] mb-4">
                      <h4 className="font-bold text-gray-800 text-sm">Reference</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-6 text-[13px] px-2 text-gray-800">
                      <div><span className="font-bold mr-1">Reference 1 Name:</span></div>
                      <div><span className="font-bold mr-1">Reference 1 Mobile:</span></div>
                      <div><span className="font-bold mr-1">Reference 1 Address:</span></div>
                      
                      <div><span className="font-bold mr-1">Reference 1 Relation:</span></div>
                      <div><span className="font-bold mr-1">Reference 2 Name:</span></div>
                      <div><span className="font-bold mr-1">Reference 2 Mobile:</span></div>
                      
                      <div><span className="font-bold mr-1">Reference 2 Address:</span></div>
                      <div><span className="font-bold mr-1">Reference 2 Relation:</span></div>
                    </div>
                  </div>

                  {/* Custom */}
                  <div>
                    <div className="bg-gray-200 px-4 py-2 rounded-t-md border-b-2 border-[#81c784] mb-4">
                      <h4 className="font-bold text-gray-800 text-sm">Custom</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-6 text-[13px] px-2 text-gray-800">
                      <div><span className="font-bold mr-1">Testing:</span></div>
                      <div><span className="font-bold mr-1">Subject Taught:</span></div>
                      <div><span className="font-bold mr-1">MACP 3:</span></div>
                      
                      <div><span className="font-bold mr-1">Remarks:</span></div>
                      <div><span className="font-bold mr-1">Subject Expertise:</span></div>
                      <div><span className="font-bold mr-1">Activities:</span></div>
                      
                      <div><span className="font-bold mr-1">Qualification:</span> {isEditing ? <input name="qualification" value={editForm.qualification || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full mt-1" /> : profileData?.qualification}</div>
                      <div><span className="font-bold mr-1">Experience:</span> {isEditing ? <input name="experience" value={editForm.experience || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full mt-1" /> : profileData?.experience}</div>
                    </div>
                  </div>

                </div>
              )}

              {/* Attendance Tab Content */}
              {activeTab === 'Attendance' && (
                <div className="flex flex-col flex-1 bg-white p-6 rounded-xl shadow-sm relative">
                  <div className="flex justify-end mb-8">
                    <div className="relative">
                      <label className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-gray-400">Academic Year</label>
                      <select className="border border-gray-300 rounded text-sm px-3 py-2 outline-none text-gray-700 bg-transparent min-w-[150px] appearance-none">
                        <option>2026-2027</option>
                        <option>2025-2026</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <span className="font-bold text-gray-800 text-lg">No Data Found</span>
                  </div>
                </div>
              )}

              {/* Salary Tab Content */}
              {activeTab === 'Salary' && (
                <div className="flex flex-col flex-1 bg-white p-6 rounded-xl shadow-sm relative">
                  <div>
                    <div className="bg-gray-200 px-4 py-2 rounded-t-md border-b-2 border-[#81c784] mb-4">
                      <h4 className="font-bold text-gray-800 text-sm">Salary Structure</h4>
                    </div>
                  </div>
                </div>
              )}

              {/* Timetable Tab Content */}
              {activeTab === 'Timetable' && (
                <div className="flex flex-col flex-1 bg-white p-6 rounded-xl shadow-sm relative">
                  <div>
                    <div className="bg-gray-200 px-4 py-2 rounded-t-md border-b-2 border-[#81c784] mb-4">
                      <h4 className="font-bold text-gray-800 text-sm">Timetable</h4>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-4 flex flex-col items-center">
                      <div className="w-full flex justify-end gap-6 text-[13px] text-gray-800 font-bold mb-10">
                        <span>Total Lecture: 48</span>
                        <span>Period Taken: 0</span>
                        <span>Free Period: 48</span>
                      </div>
                      
                      <div className="text-red-500 text-[15px] font-normal mb-8">
                        No timetable periods found
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Session Log Tab Content */}
              {activeTab === 'Session Log' && (
                <div className="flex flex-col flex-1 bg-white p-6 rounded-xl shadow-sm relative">
                  <div className="flex gap-2 mb-6">
                    <select className="border border-gray-300 rounded text-sm px-3 py-1.5 outline-none text-gray-700 min-w-[150px]">
                      <option>Today, 1 Aug</option>
                    </select>
                    <button className="bg-[#4caf50] text-white px-4 py-1.5 rounded hover:bg-green-600 transition text-sm">
                      Go
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse border border-gray-200">
                      <thead>
                        <tr className="bg-[#f9fafb] text-[13px] text-gray-800 border-b border-gray-200">
                          <th className="py-3 px-4 font-bold border-r border-gray-200">Sr. No.</th>
                          <th className="py-3 px-4 font-bold border-r border-gray-200">User</th>
                          <th className="py-3 px-4 font-bold border-r border-gray-200">Session In</th>
                          <th className="py-3 px-4 font-bold border-r border-gray-200">Session Out</th>
                          <th className="py-3 px-4 font-bold border-r border-gray-200">Duration</th>
                          <th className="py-3 px-4 font-bold border-r border-gray-200">Status</th>
                          <th className="py-3 px-4 font-bold">Device Details</th>
                        </tr>
                      </thead>
                      <tbody className="text-[13px] text-gray-600">
                        <tr className="border-b border-gray-200 align-top">
                          <td className="py-3 px-4 border-r border-gray-200">1</td>
                          <td className="py-3 px-4 border-r border-gray-200">
                            <div className="text-gray-800">Mr. ANKIT KUMAR</div>
                            <div>Manager</div>
                          </td>
                          <td className="py-3 px-4 border-r border-gray-200">
                            <div>01-Aug-2026</div>
                            <div>11:31 AM</div>
                          </td>
                          <td className="py-3 px-4 border-r border-gray-200">
                            <div>01-Aug-2026</div>
                            <div>11:31 AM</div>
                          </td>
                          <td className="py-3 px-4 border-r border-gray-200">3s</td>
                          <td className="py-3 px-4 border-r border-gray-200 text-yellow-500">Idle</td>
                          <td className="py-3 px-4">
                            <div className="bg-[#007bff] text-white rounded text-[11px] font-bold px-2 py-0.5 inline-flex items-center gap-1 mb-1">
                              <span className="text-[10px]">🌐</span> Chrome (Web)
                            </div>
                            <div className="text-[11px] text-gray-500 leading-tight">
                              OS: Windows | IP: <br/>
                              172.31.1.172 | Last <br/>
                              Active: 01-Aug-2026 <br/>
                              11:31 AM
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
            
          </div>
          
          {/* Footer */}
          <div className="text-center text-[13px] font-bold text-gray-400 py-8">
            COPYRIGHT © 2026 FRANCISCAN
          </div>
          
        </div>
    </div>
  );
}

export default Profile;
