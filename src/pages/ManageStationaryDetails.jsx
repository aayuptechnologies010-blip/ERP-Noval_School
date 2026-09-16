import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaSpinner, FaAngleUp } from 'react-icons/fa';


const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function ManageStationaryDetails() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/stationary-details`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async () => {
    if (!inputValue) return;
    setIsLoading(true);
    try {
      if (editItem) {
        await fetch(`${API_BASE}/api/stationary-details/${editItem._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: inputValue })
        });
      } else {
        await fetch(`${API_BASE}/api/stationary-details`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: inputValue })
        });
      }
      setIsModalOpen(false);
      setEditItem(null);
      setInputValue('');
      fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await fetch(`${API_BASE}/api/stationary-details/${id}`, { method: 'DELETE' });
        fetchData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const openEdit = (item) => {
    setEditItem(item);
    setInputValue(item.name);
    setIsModalOpen(true);
  };

  const openAdd = () => {
    setEditItem(null);
    setInputValue('');
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white p-6 mt-4 flex flex-col items-end w-full">
      <div className="mb-4 w-full flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-700">Stationary Details</h2>
        <button onClick={openAdd} className="bg-[#32a3d7] hover:bg-[#288ebf] text-white px-4 py-2 rounded flex items-center gap-2 text-sm font-medium">
          <FaPlus /> Add Data
        </button>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-[#32a3d7] text-white">
              <th className="px-6 py-3 border border-gray-300 font-medium text-left">Sr. No. <FaAngleUp className="inline text-[10px]" /></th>
              <th className="px-6 py-3 border border-gray-300 font-medium text-left">Stationary Details Name <FaAngleUp className="inline text-[10px]" /></th>
              <th className="px-6 py-3 border border-gray-300 font-medium text-center">Modify Details <FaAngleUp className="inline text-[10px]" /></th>
              <th className="px-6 py-3 border border-gray-300 font-medium text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr><td colSpan="4" className="px-6 py-4 text-center text-gray-500">No data available in table</td></tr>
            ) : (
              data.map((item, idx) => (
                <tr key={item._id} className="hover:bg-gray-50 border-b border-gray-300">
                  <td className="px-6 py-3 border border-gray-300">{idx + 1}</td>
                  <td className="px-6 py-3 border border-gray-300">{item.name}</td>
                  <td className="px-6 py-3 border border-gray-300 text-center">
                    <button onClick={() => openEdit(item)} className="bg-[#32a3d7] text-white p-1.5 rounded hover:bg-[#288ebf] transition-colors"><FaEdit /></button>
                  </td>
                  <td className="px-6 py-3 border border-gray-300 text-center">
                    <button onClick={() => handleDelete(item._id)} className="bg-red-500 text-white p-1.5 rounded hover:bg-red-600 transition-colors"><FaTrash /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded w-[90%] max-w-lg shadow-lg flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium text-lg">{editItem ? 'Edit' : 'Add'} Data</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div>
                <label className="text-sm font-bold text-gray-700 block mb-1">Enter Name</label>
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm" 
                  placeholder="Enter name"
                />
              </div>
              <button 
                onClick={handleSave}
                disabled={isLoading || !inputValue.trim()}
                className="bg-[#5bc0de] hover:bg-[#46b8da] text-white px-6 py-2 rounded text-sm flex items-center justify-center gap-2 font-medium mt-2 disabled:opacity-50"
              >
                {isLoading ? <FaSpinner className="animate-spin" /> : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}