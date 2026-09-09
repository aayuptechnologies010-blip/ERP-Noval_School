import React, { useState, useEffect } from 'react';
import { 
  FaSitemap, FaInfoCircle, FaBars, FaArrowUp, FaArrowDown, FaFilter, FaUsers, FaSearch
} from 'react-icons/fa';

export default function WebAdminStaffVisibility() {
  const [activeTab, setActiveTab] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const defaultDesignations = [
    { id: 1, name: "Principal", isVisible: true },
    { id: 2, name: "Vice Principal", isVisible: true },
    { id: 3, name: "Head Mistress", isVisible: true },
    { id: 4, name: "Professor", isVisible: false },
    { id: 5, name: "Teacher", isVisible: true },
    { id: 6, name: "PGT", isVisible: true },
    { id: 7, name: "TGT", isVisible: true },
    { id: 8, name: "PRT", isVisible: true },
    { id: 9, name: "Accountant", isVisible: false },
    { id: 10, name: "Librarian", isVisible: true },
    { id: 11, name: "Officer", isVisible: false },
    { id: 12, name: "Manager", isVisible: false },
    { id: 13, name: "Group D", isVisible: false }
  ];

  const defaultStaff = [
    { id: 1, name: "Dr. A. K. Sharma", designation: "Principal", department: "Administration", isVisible: true },
    { id: 2, name: "Mrs. Sunita Verma", designation: "Vice Principal", department: "Academic", isVisible: true },
    { id: 3, name: "Mr. Rajesh Kumar", designation: "PGT", department: "Science", isVisible: true },
    { id: 4, name: "Ms. Anita Gupta", designation: "TGT", department: "Mathematics", isVisible: true },
    { id: 5, name: "Mr. Suresh Yadav", designation: "Accountant", department: "Accounts", isVisible: false },
    { id: 6, name: "Mrs. Meena Kumari", designation: "Librarian", department: "Library", isVisible: true }
  ];

  const [designations, setDesignations] = useState(defaultDesignations);
  const [searchDesig, setSearchDesig] = useState('');

  const [staffList, setStaffList] = useState(defaultStaff);
  const [selectedDesig, setSelectedDesig] = useState('All');
  const [searchStaff, setSearchStaff] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/web-admin/staff-visibility`);
      const data = await res.json();
      if (data.success && data.data && data.data.length > 0) {
        const desigDoc = data.data.find(d => d.type === 'designation');
        if (desigDoc && desigDoc.designations && desigDoc.designations.length > 0) {
          setDesignations(desigDoc.designations);
        }
        const staffDoc = data.data.find(d => d.type === 'staff');
        if (staffDoc && staffDoc.staffList && staffDoc.staffList.length > 0) {
          setStaffList(staffDoc.staffList);
        }
      }
    } catch (err) {
      console.error('Error fetching staff visibility:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDesignations = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch(`${API_BASE}/api/web-admin/staff-visibility`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'designation', designations })
      });
      const data = await res.json();
      if (data.success) {
        setSuccess('Designation layout saved successfully!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Failed to save');
      }
    } catch (err) {
      setError('An error occurred while saving.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveStaffOrder = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch(`${API_BASE}/api/web-admin/staff-visibility`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'staff', staffList })
      });
      const data = await res.json();
      if (data.success) {
        setSuccess('Staff order and visibility saved successfully!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Failed to save');
      }
    } catch (err) {
      setError('An error occurred while saving.');
    } finally {
      setLoading(false);
    }
  };

  const toggleVisibility = (id) => {
    setDesignations(designations.map(d => 
      d.id === id ? { ...d, isVisible: !d.isVisible } : d
    ));
  };

  const setAllVisibility = (isVisible) => {
    setDesignations(designations.map(d => ({ ...d, isVisible })));
  };

  const moveDesignation = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= designations.length) return;
    const newItems = [...designations];
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;
    setDesignations(newItems);
  };

  const toggleStaffVisibility = (id) => {
    setStaffList(staffList.map(s => 
      s.id === id ? { ...s, isVisible: !s.isVisible } : s
    ));
  };

  const setAllStaffVisibility = (isVisible) => {
    setStaffList(staffList.map(s => {
      if (selectedDesig !== 'All' && s.designation !== selectedDesig) return s;
      return { ...s, isVisible };
    }));
  };

  const moveStaff = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= filteredStaff.length) return;
    const itemToMove = filteredStaff[index];
    const itemTarget = filteredStaff[targetIndex];

    const actualIdx1 = staffList.findIndex(s => s.id === itemToMove.id);
    const actualIdx2 = staffList.findIndex(s => s.id === itemTarget.id);

    if (actualIdx1 !== -1 && actualIdx2 !== -1) {
      const up = [...staffList];
      const temp = up[actualIdx1];
      up[actualIdx1] = up[actualIdx2];
      up[actualIdx2] = temp;
      setStaffList(up);
    }
  };

  const filteredDesignations = designations.filter(d => 
    d.name.toLowerCase().includes(searchDesig.toLowerCase())
  );

  const filteredStaff = staffList.filter(s => {
    const matchesDesig = selectedDesig === 'All' || s.designation === selectedDesig;
    const matchesSearch = s.name.toLowerCase().includes(searchStaff.toLowerCase()) || 
                          (s.department && s.department.toLowerCase().includes(searchStaff.toLowerCase()));
    return matchesDesig && matchesSearch;
  });

  return (
    <div className="flex-1 overflow-y-auto bg-[#f4f5f7]">
      <div className="p-6">
        <h1 className="text-xl font-bold text-[#1f2937] mb-6">Website Hierarchy & Staff Display</h1>

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-sm font-medium">
            {success}
          </div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm font-medium">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button 
              className={`px-6 py-3 text-sm font-bold transition ${activeTab === 1 ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setActiveTab(1)}
            >
              1. Setup Designation Order
            </button>
            <button 
              className={`px-6 py-3 text-sm font-bold transition ${activeTab === 2 ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setActiveTab(2)}
            >
              2. Manage Staff within Designations
            </button>
          </div>

          {activeTab === 1 && (
            <div className="p-6">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
                <div className="flex items-center gap-2 text-blue-600">
                  <FaSitemap className="text-lg" />
                  <h2 className="text-sm font-bold">Designation Display Sequence</h2>
                </div>
                
                <div className="flex items-center gap-3">
                  <input 
                    type="text" 
                    placeholder="Search Designation..." 
                    value={searchDesig}
                    onChange={(e) => setSearchDesig(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500 w-64" 
                  />
                  <button 
                    onClick={handleSaveDesignations}
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded shadow-sm transition disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : 'Save Designation Layout'}
                  </button>
                </div>
              </div>

              {/* Info Banner */}
              <div className="bg-[#e6f7f9] text-[#008394] px-4 py-2.5 rounded text-xs font-medium flex items-center gap-2 mb-6">
                <FaInfoCircle />
                <span>Designations placed at the top will appear first on the website. Use Up/Down arrows to organize.</span>
              </div>

              {/* Table */}
              <div className="border border-gray-200 rounded overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-white border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-xs font-bold text-gray-700 w-24">Move</th>
                      <th className="px-4 py-3 text-xs font-bold text-gray-700 w-16">S.No.</th>
                      <th className="px-4 py-3 text-xs font-bold text-gray-700">Designation Name</th>
                      <th className="px-4 py-3 text-xs font-bold text-gray-700 w-32 text-center">
                        <div className="mb-1">Show on Website</div>
                        <div className="flex items-center justify-center gap-2 text-[9px] uppercase tracking-wider">
                          <button onClick={() => setAllVisibility(true)} className="text-green-600 hover:underline">All ON</button>
                          <button onClick={() => setAllVisibility(false)} className="text-red-500 hover:underline">All OFF</button>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDesignations.map((desig, index) => (
                      <tr key={desig.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2 text-gray-400">
                            <FaArrowUp 
                              onClick={() => moveDesignation(index, -1)}
                              className={`hover:text-blue-600 cursor-pointer ${index === 0 ? 'opacity-30 cursor-not-allowed' : ''}`} 
                            />
                            <FaArrowDown 
                              onClick={() => moveDesignation(index, 1)}
                              className={`hover:text-blue-600 cursor-pointer ${index === filteredDesignations.length - 1 ? 'opacity-30 cursor-not-allowed' : ''}`} 
                            />
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-600">{index + 1}</td>
                        <td className="px-4 py-3 text-xs font-bold text-gray-800">{desig.name}</td>
                        <td className="px-4 py-3 text-center">
                          <div 
                            className={`inline-flex items-center w-[42px] h-5 rounded-full relative cursor-pointer transition-colors ${desig.isVisible ? 'bg-green-500' : 'bg-red-500'}`}
                            onClick={() => toggleVisibility(desig.id)}
                          >
                            <span className={`absolute text-[9px] font-bold text-white transition-opacity ${desig.isVisible ? 'left-1.5' : 'right-1.5'}`}>
                              {desig.isVisible ? 'ON' : 'OFF'}
                            </span>
                            <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${desig.isVisible ? 'left-[24px]' : 'left-0.5'}`}></div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {activeTab === 2 && (
            <div className="p-6 flex flex-col gap-6">
              
              {/* Filter Staff Section */}
              <div className="border border-gray-200 rounded overflow-hidden bg-white">
                <div className="px-5 py-4 flex items-center gap-2 border-b border-gray-100">
                  <FaFilter className="text-[#68a030] text-lg" />
                  <h2 className="text-sm font-bold text-[#1f2937]">Filter Staff</h2>
                </div>
                <div className="p-5 flex flex-col sm:flex-row items-end gap-4">
                  <div className="flex-1 max-w-md">
                    <label className="block text-xs font-bold text-[#68a030] mb-1">Select Designation <span className="text-[#68a030]">*</span></label>
                    <select 
                      value={selectedDesig}
                      onChange={(e) => setSelectedDesig(e.target.value)}
                      className="w-full border border-[#68a030] rounded px-3 py-2 text-sm text-gray-700 outline-none bg-white"
                    >
                      <option value="All">All Designations</option>
                      {designations.map(d => (
                        <option key={d.id} value={d.name}>{d.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Staff Display Sequence Section */}
              <div className="border border-gray-200 rounded overflow-hidden bg-white">
                <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 gap-4">
                  <div className="flex items-center gap-2">
                    <FaUsers className="text-[#68a030] text-lg" />
                    <h2 className="text-sm font-bold text-[#68a030]">Staff Display Sequence</h2>
                  </div>
                  <div className="flex items-center gap-3">
                    <input 
                      type="text" 
                      placeholder="Search staff..." 
                      value={searchStaff}
                      onChange={(e) => setSearchStaff(e.target.value)}
                      className="border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-600 outline-none focus:border-[#68a030] w-64" 
                    />
                    <button 
                      onClick={handleSaveStaffOrder}
                      disabled={loading}
                      className="bg-[#68a030] hover:bg-[#5a8c29] text-white text-xs font-bold py-1.5 px-4 rounded transition disabled:opacity-50"
                    >
                      {loading ? 'Saving...' : 'Save Staff Order'}
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-white border-b-2 border-[#68a030]">
                      <tr>
                        <th className="px-4 py-3 text-[11px] font-bold text-gray-800 w-20">Move</th>
                        <th className="px-4 py-3 text-[11px] font-bold text-gray-800 w-16">S.No.</th>
                        <th className="px-4 py-3 text-[11px] font-bold text-gray-800">Staff Name</th>
                        <th className="px-4 py-3 text-[11px] font-bold text-gray-800">Designation</th>
                        <th className="px-4 py-3 text-[11px] font-bold text-gray-800">Department</th>
                        <th className="px-4 py-3 text-[11px] font-bold text-gray-800 w-32 text-center">
                          <div className="mb-1">Show on Website</div>
                          <div className="flex items-center justify-center gap-2 text-[9px] uppercase tracking-wider">
                            <button onClick={() => setAllStaffVisibility(true)} className="text-[#68a030] hover:underline">All ON</button>
                            <button onClick={() => setAllStaffVisibility(false)} className="text-red-500 hover:underline">All OFF</button>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStaff.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="px-4 py-12 text-center text-gray-400 text-sm bg-gray-50/20">
                            <span className="text-xs">No staff found for selected criteria</span>
                          </td>
                        </tr>
                      ) : (
                        filteredStaff.map((staff, index) => (
                          <tr key={staff.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2 text-gray-400">
                                <FaArrowUp 
                                  onClick={() => moveStaff(index, -1)}
                                  className={`hover:text-green-600 cursor-pointer ${index === 0 ? 'opacity-30 cursor-not-allowed' : ''}`} 
                                />
                                <FaArrowDown 
                                  onClick={() => moveStaff(index, 1)}
                                  className={`hover:text-green-600 cursor-pointer ${index === filteredStaff.length - 1 ? 'opacity-30 cursor-not-allowed' : ''}`} 
                                />
                              </div>
                            </td>
                            <td className="px-4 py-3 text-xs text-gray-600">{index + 1}</td>
                            <td className="px-4 py-3 text-xs font-bold text-gray-800">{staff.name}</td>
                            <td className="px-4 py-3 text-xs text-gray-600">{staff.designation}</td>
                            <td className="px-4 py-3 text-xs text-gray-600">{staff.department || '-'}</td>
                            <td className="px-4 py-3 text-center">
                              <div 
                                className={`inline-flex items-center w-[42px] h-5 rounded-full relative cursor-pointer transition-colors ${staff.isVisible ? 'bg-green-500' : 'bg-red-500'}`}
                                onClick={() => toggleStaffVisibility(staff.id)}
                              >
                                <span className={`absolute text-[9px] font-bold text-white transition-opacity ${staff.isVisible ? 'left-1.5' : 'right-1.5'}`}>
                                  {staff.isVisible ? 'ON' : 'OFF'}
                                </span>
                                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${staff.isVisible ? 'left-[24px]' : 'left-0.5'}`}></div>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
      
      <div className="text-center text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-6">
        COPYRIGHT © 2017 FRANCISCAN.
      </div>
    </div>
  );
}

