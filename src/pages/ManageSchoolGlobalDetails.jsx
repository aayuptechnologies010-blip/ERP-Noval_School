import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaVideo, FaTrashAlt, FaEdit, FaEye, FaSave, FaAngleDown } from 'react-icons/fa';

const schoolFields = [
  { label: 'School Name', key: 'schoolName', required: true },
  { label: 'School Address', key: 'schoolAddress' },
  { label: 'School Address 2', key: 'schoolAddress2' },
  { label: 'School Short Name', key: 'schoolShortName' },
  { label: 'Contact No.(Phone)', key: 'contactNo', type: 'tel', pattern: '[0-9]*', title: 'Please enter numbers only' },
  { label: 'Mobile', key: 'mobile', type: 'tel', pattern: '[0-9]{10}', maxLength: 10, minLength: 10, title: 'Please enter a valid 10-digit mobile number' },
  { label: 'Secondary Contact No.', key: 'secondaryContactNo', type: 'tel', pattern: '[0-9]*', title: 'Please enter numbers only' },
  { label: 'Email ID', key: 'emailId', type: 'email' },
  { label: 'Support Email ID', key: 'supportEmailId', type: 'email' },
  { label: 'Website', key: 'website', type: 'url' },
  { label: 'Prefix', key: 'prefix' },
  { label: 'ISO Details', key: 'isoDetails' },
  { label: 'Establishment Code', key: 'establishmentCode' },
  { label: 'School No.', key: 'schoolNo' },
  { label: 'Affiliation To', key: 'affiliationTo' },
  { label: 'Affiliation No.', key: 'affiliationNo' },
  { label: 'Associates', key: 'associates' },
  { label: 'Renew Upto', key: 'renewUpto' },
  { label: 'School Status', key: 'schoolStatus' },
  { label: 'City', key: 'city' },
  { label: 'e-Care Mobile No.', key: 'eCareMobileNo', type: 'tel', pattern: '[0-9]{10}', maxLength: 10, minLength: 10, title: 'Please enter a valid 10-digit mobile number' },
  { label: 'Working Days', key: 'workingDays', type: 'number' },
  { label: 'Recess', key: 'recess' },
  { label: 'Total Period', key: 'totalPeriod', type: 'number' },
  { label: 'School Category', key: 'schoolCategory' },
  { label: 'U-Dise Registration No', key: 'uDiseRegistrationNo' },
  { label: 'Facebook ID', key: 'facebookId' },
  { label: 'Support Time(eg. 9:00AM - 6:00PM)', key: 'supportTime' },
  { label: 'Support Days(eg. Mon-Sat)', key: 'supportDays' }
];

function ManageSchoolGlobalDetails() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [viewItem, setViewItem] = useState(null);
  const [modalInput, setModalInput] = useState({});

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/school-global-details`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) { 
        const data = await res.json(); 
        setItems(data || []); 
      }
    } catch (e) { 
      console.error(e); 
    } finally { 
      setLoading(false); 
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!modalInput.schoolName?.trim()) {
      alert('Validation Error: School Name is required');
      return;
    }
    if (modalInput.mobile && !/^[0-9]{10}$/.test(modalInput.mobile.trim())) {
      alert('Validation Error: Mobile number must be exactly 10 digits');
      return;
    }
    if (modalInput.eCareMobileNo && !/^[0-9]{10}$/.test(modalInput.eCareMobileNo.trim())) {
      alert('Validation Error: e-Care Mobile number must be exactly 10 digits');
      return;
    }
    if (modalInput.contactNo && !/^[0-9+ -]{5,15}$/.test(modalInput.contactNo.trim())) {
      alert('Validation Error: Please enter a valid Contact No.');
      return;
    }
    if (modalInput.emailId && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(modalInput.emailId.trim())) {
      alert('Validation Error: Please enter a valid Email ID');
      return;
    }
    if (modalInput.supportEmailId && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(modalInput.supportEmailId.trim())) {
      alert('Validation Error: Please enter a valid Support Email ID');
      return;
    }
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const url = editItem
        ? `${import.meta.env.VITE_API_BASE_URL}/api/school-global-details/${editItem._id}`
        : `${import.meta.env.VITE_API_BASE_URL}/api/school-global-details`;
      
      const res = await fetch(url, {
        method: editItem ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(modalInput)
      });
      if (res.ok) { 
        setModalInput({}); 
        setIsAddModalOpen(false);
        setEditItem(null); 
        fetchItems(); 
      } else { 
        const err = await res.json(); 
        alert(err.message || 'Failed to save'); 
      }
    } catch (e) { 
      alert('Error saving details'); 
    } finally { 
      setSaving(false); 
    }
  };

  const openAddModal = () => {
    setModalInput({ isMainSchool: false });
    setEditItem(null);
    setIsAddModalOpen(true);
  };

  const openEditModal = (item) => { 
    setModalInput({ ...item });
    setEditItem(item);
    setIsAddModalOpen(true);
  };

  const openViewModal = (item) => {
    setViewItem(item);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this school detail?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/school-global-details/${id}`, {
        method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) fetchItems();
      else alert('Failed to delete');
    } catch (e) { alert('Error deleting detail'); }
  };

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderRadius: '12px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#2b3674', margin: 0 }}>School Global Details</h2>
        <button 
          onClick={openAddModal}
          className="bg-[#32a3d7] text-white px-4 py-1.5 rounded flex items-center gap-2 text-sm hover:bg-[#288ebf]"
        >
          Add Record
        </button>
      </div>

      <div style={{ flex: 1, overflow: 'auto', background: '#fff', margin: '0 16px 16px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <table className="w-full text-left border-collapse text-sm text-gray-600">
          <thead className="bg-[#f8fafc] text-gray-500 font-semibold border-b border-gray-200">
            <tr>
              <th className="px-6 py-3">Sr. No.</th>
              <th className="px-6 py-3">School Name</th>
              <th className="px-6 py-3">Main School</th>
              <th className="px-6 py-3">Email-ID</th>
              <th className="px-6 py-3">Website</th>
              <th className="px-6 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-3 text-center">No data available in table</td>
              </tr>
            ) : (
              items.map((row, index) => (
                <tr key={row._id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-3">{index + 1}</td>
                  <td className="px-6 py-3">{row.schoolName}</td>
                  <td className="px-6 py-3">{row.isMainSchool ? 'True' : 'False'}</td>
                  <td className="px-6 py-3">{row.emailId}</td>
                  <td className="px-6 py-3">{row.website}</td>
                  <td className="px-6 py-3 flex justify-end gap-3 mt-1.5">
                    <FaEye onClick={() => openViewModal(row)} className="text-gray-400 hover:text-green-500 cursor-pointer text-lg" title="View" />
                    <FaEdit onClick={() => openEditModal(row)} className="text-gray-400 hover:text-[#32a3d7] cursor-pointer text-lg" title="Edit" />
                    <FaTrashAlt onClick={() => handleDelete(row._id)} className="text-red-400 hover:text-red-600 cursor-pointer text-lg" title="Delete" />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded w-[90%] max-w-5xl shadow-lg flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium text-lg">{editItem ? 'Edit School Details' : 'Add New School'}</h3>
              <button onClick={() => { setIsAddModalOpen(false); setEditItem(null); }} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <form onSubmit={handleSave} className="flex flex-col overflow-hidden">
              <div className="p-6 overflow-y-auto">
                <div className="grid grid-cols-4 gap-x-6 gap-y-4">
                  {schoolFields.map(f => (
                    <div key={f.key} className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-gray-700">
                        {f.label} {f.required && <span className="text-red-500">*</span>}
                      </label>
                      <input 
                        type={f.type || 'text'} 
                        value={modalInput[f.key] || ''}
                        onChange={(e) => setModalInput({...modalInput, [f.key]: e.target.value})}
                        className="border border-gray-300 rounded px-2 py-1.5 outline-none focus:border-[#32a3d7] w-full text-sm" 
                        required={f.required}
                        pattern={f.pattern}
                        minLength={f.minLength}
                        maxLength={f.maxLength}
                        title={f.title}
                      />
                    </div>
                  ))}
                  <div className="flex flex-col gap-1 justify-end pb-1.5">
                    <label className="flex items-center gap-2 cursor-pointer text-sm font-bold text-gray-700">
                      <input 
                        type="checkbox" 
                        checked={modalInput.isMainSchool || false}
                        onChange={(e) => setModalInput({...modalInput, isMainSchool: e.target.checked})}
                        className="w-4 h-4 cursor-pointer" 
                      />
                      Is Main School?
                    </label>
                  </div>
                </div>
              </div>
              <div className="p-4 flex justify-center border-t border-gray-100">
                <button 
                  type="submit"
                  disabled={saving}
                  className="bg-[#4ade80] hover:bg-[#3bcf6d] text-white px-8 py-2 rounded font-medium flex items-center gap-2 text-sm disabled:opacity-50"
                >
                  <FaSave /> {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded w-[90%] max-w-5xl shadow-lg flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium text-lg">View School Details</h3>
              <button onClick={() => setViewItem(null)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-4 gap-x-6 gap-y-4">
                {schoolFields.map(f => (
                  <div key={f.key} className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-500">{f.label}</label>
                    <div className="text-sm text-gray-800 font-medium">{viewItem[f.key] || '-'}</div>
                  </div>
                ))}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-500">Is Main School</label>
                  <div className="text-sm text-gray-800 font-medium">{viewItem.isMainSchool ? 'True' : 'False'}</div>
                </div>
              </div>
            </div>
            <div className="p-4 flex justify-center border-t border-gray-100">
              <button 
                onClick={() => setViewItem(null)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-2 rounded font-medium flex items-center gap-2 text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageSchoolGlobalDetails;
