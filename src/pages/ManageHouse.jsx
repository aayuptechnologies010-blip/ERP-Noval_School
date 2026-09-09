import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt, FaSave } from 'react-icons/fa';

const fields = [
  {
    label: 'House Name',
    key: 'houseName',
    required: true
  }
];

function ManageHouse() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [modalInput, setModalInput] = useState({});

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/houses`, {
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
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const url = editItem 
        ? `${import.meta.env.VITE_API_BASE_URL}/api/houses/${editItem._id}`
        : `${import.meta.env.VITE_API_BASE_URL}/api/houses`;
      
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
    setModalInput({ isActive: true });
    setEditItem(null);
    setIsAddModalOpen(true);
  };

  const openEditModal = (item) => { 
    setModalInput({ ...item });
    setEditItem(item);
    setIsAddModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/houses/${id}`, {
        method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) fetchItems();
      else alert('Failed to delete');
    } catch (e) { alert('Error deleting record'); }
  };

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderRadius: '12px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#2b3674', margin: 0 }}>Define House</h2>
        <button 
          onClick={openAddModal}
          className="bg-[#32a3d7] text-white px-4 py-1.5 rounded flex items-center gap-2 text-sm hover:bg-[#288ebf]"
        >
          Add Record
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 16px 16px' }}>
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-white border-b border-gray-200">
            <tr>
              <th className="px-6 py-3">Sr. No.</th>
              {fields.map(f => <th key={f.key} className="px-6 py-3">{f.label}</th>)}
              <th className="px-6 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={fields.length + 2} className="text-center py-4">Loading...</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={fields.length + 2} className="text-center py-4">No data available in table</td></tr>
            ) : (
              items.map((row, idx) => (
                <tr key={row._id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-3">{idx + 1}</td>
                  {fields.map(f => <td key={f.key} className="px-6 py-3">{row[f.key]}</td>)}
                  <td className="px-6 py-3 flex justify-end gap-3 mt-1.5">
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
          <div className="bg-white rounded w-[90%] max-w-2xl shadow-lg flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-600 font-medium text-lg">{editItem ? 'Edit Define House' : 'Add New Define House'}</h3>
              <button onClick={() => { setIsAddModalOpen(false); setEditItem(null); }} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>
            <form onSubmit={handleSave} className="flex flex-col overflow-hidden">
              <div className="p-6 overflow-y-auto">
                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  {fields.map(f => (
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
                      />
                    </div>
                  ))}
                  <div className="flex flex-col gap-1 justify-end pb-1.5">
                    <label className="flex items-center gap-2 cursor-pointer text-sm font-bold text-gray-700">
                      <input 
                        type="checkbox" 
                        checked={modalInput.isActive !== false}
                        onChange={(e) => setModalInput({...modalInput, isActive: e.target.checked})}
                        className="w-4 h-4 cursor-pointer" 
                      />
                      Is Active?
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
    </div>
  );
}

export default ManageHouse;
