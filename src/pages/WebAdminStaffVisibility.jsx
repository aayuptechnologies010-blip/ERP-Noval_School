import React, { useState } from 'react';
import { 
  FaSitemap, FaInfoCircle, FaBars, FaArrowUp, FaArrowDown, FaFilter, FaUsers, FaSearch
} from 'react-icons/fa';

export default function WebAdminStaffVisibility() {
  const [activeTab, setActiveTab] = useState(1);
  const [designations, setDesignations] = useState([
    { id: 1, name: "Accountant", isVisible: false },
    { id: 2, name: "Business", isVisible: false },
    { id: 3, name: "Group D", isVisible: false },
    { id: 4, name: "Housewife", isVisible: false },
    { id: 5, name: "Librarian", isVisible: false },
    { id: 6, name: "Manager", isVisible: false },
    { id: 7, name: "Officer", isVisible: false },
    { id: 8, name: "Principal", isVisible: false },
    { id: 9, name: "Professor", isVisible: false },
    { id: 10, name: "Proprietor", isVisible: false },
    { id: 11, name: "Self", isVisible: false },
    { id: 12, name: "Service", isVisible: false },
    { id: 13, name: "Service (BHEL)", isVisible: false },
    { id: 14, name: "Service Manager", isVisible: false },
    { id: 15, name: "Service(BHEL)", isVisible: false },
    { id: 16, name: "Service(PNB)", isVisible: false },
    { id: 17, name: "Service(teacher)", isVisible: false },
    { id: 18, name: "Teacher", isVisible: false },
    { id: 19, name: "TEACHER1", isVisible: false },
  ]);

  const toggleVisibility = (id) => {
    setDesignations(designations.map(d => 
      d.id === id ? { ...d, isVisible: !d.isVisible } : d
    ));
  };

  const setAllVisibility = (isVisible) => {
    setDesignations(designations.map(d => ({ ...d, isVisible })));
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#f4f5f7]">
      <div className="p-6">
        <h1 className="text-xl font-bold text-[#1f2937] mb-6">Website Hierarchy & Staff Display</h1>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button 
              className={`px-6 py-3 text-sm font-bold ${activeTab === 1 ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setActiveTab(1)}
            >
              1. Setup Designation Order
            </button>
            <button 
              className={`px-6 py-3 text-sm font-bold ${activeTab === 2 ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
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
                    className="border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-600 outline-none focus:border-blue-500 w-64" 
                  />
                  <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded shadow-sm transition">
                    Save Designation Layout
                  </button>
                </div>
              </div>

              {/* Info Banner */}
              <div className="bg-[#e6f7f9] text-[#008394] px-4 py-2.5 rounded text-xs font-medium flex items-center gap-2 mb-6">
                <FaInfoCircle />
                <span>Designations placed at the top will appear first on the website. Use drag & drop (≡) or Up/Down arrows to organize.</span>
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
                    {designations.map((desig, index) => (
                      <tr key={desig.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2 text-gray-400">
                            <FaBars className="cursor-grab hover:text-gray-600" />
                            <FaArrowUp className="cursor-pointer hover:text-gray-600" />
                            <FaArrowDown className="cursor-pointer hover:text-gray-600" />
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
                    <select className="w-full border border-[#68a030] rounded px-3 py-2 text-sm text-gray-700 outline-none bg-white">
                      <option>All Designations</option>
                    </select>
                  </div>
                  <button className="bg-[#68a030] hover:bg-[#5a8c29] text-white text-sm font-bold py-2 px-8 rounded flex items-center gap-2 transition">
                    <FaSearch className="text-xs" /> Load Staff
                  </button>
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
                      className="border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-600 outline-none focus:border-[#68a030] w-64" 
                    />
                    <button className="bg-[#68a030] hover:bg-[#5a8c29] text-white text-xs font-bold py-1.5 px-4 rounded transition">
                      Save Staff Order
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
                            <button className="text-[#68a030] hover:underline">All ON</button>
                            <button className="text-red-500 hover:underline">All OFF</button>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan="6" className="px-4 py-12 text-center text-gray-400 text-sm bg-gray-50/20">
                          <span className="text-xs">No staff found for selected designation</span>
                        </td>
                      </tr>
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
