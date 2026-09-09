import React, { useState } from 'react';
import { FaExchangeAlt, FaSpinner } from 'react-icons/fa';

export default function ManageSessionTransfer() {
  const [formData, setFormData] = useState({
    currentSession: '',
    currentFinancialYear: '',
    nextSession: '',
    nextFinancialYear: '',
    modulesToTransfer: []
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const availableModules = [
    'Student Setup',
    'Fees Data',
    'Transport Data',
    'Library Data',
    'Examination Data'
  ];

  const handleCheckboxChange = (module) => {
    setFormData(prev => {
      const isSelected = prev.modulesToTransfer.includes(module);
      if (isSelected) {
        return {
          ...prev,
          modulesToTransfer: prev.modulesToTransfer.filter(m => m !== module)
        };
      } else {
        return {
          ...prev,
          modulesToTransfer: [...prev.modulesToTransfer, module]
        };
      }
    });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.currentSession || !formData.nextSession || formData.modulesToTransfer.length === 0) {
      setMessage({ type: 'error', text: 'Please fill in required fields and select at least one module.' });
      return;
    }

    if (!window.confirm("Are you sure you want to initiate this session transfer? This action cannot be easily undone.")) {
      return;
    }

    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const res = await fetch('http://localhost:5005/api/session-transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setMessage({ type: 'success', text: data.message || 'Session transfer initiated successfully!' });
        setFormData({
          currentSession: '',
          currentFinancialYear: '',
          nextSession: '',
          nextFinancialYear: '',
          modulesToTransfer: []
        });
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to initiate session transfer.' });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Error connecting to the backend server.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 mt-4 flex flex-col w-full max-w-4xl mx-auto shadow-sm border border-gray-100 rounded">
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
          <FaExchangeAlt className="text-[#32a3d7]" /> Session Transfer Tool
        </h2>
        <p className="text-sm text-gray-500 mt-1">Transfer data from one academic session to the next.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Source Session */}
        <div className="bg-blue-50 p-4 rounded border border-blue-100">
          <h3 className="font-semibold text-blue-800 mb-4 text-sm">Source Configuration</h3>
          
          <div className="mb-4">
            <label className="text-sm font-bold text-gray-700 block mb-1">Current Session *</label>
            <select 
              name="currentSession"
              value={formData.currentSession}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm bg-white"
            >
              <option value="">-- Select Session --</option>
              <option value="2024-2025">2024-2025</option>
              <option value="2025-2026">2025-2026</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700 block mb-1">Current Financial Year</label>
            <select 
              name="currentFinancialYear"
              value={formData.currentFinancialYear}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm bg-white"
            >
              <option value="">-- Select Financial Year --</option>
              <option value="FY 2024-25">FY 2024-25</option>
              <option value="FY 2025-26">FY 2025-26</option>
            </select>
          </div>
        </div>

        {/* Target Session */}
        <div className="bg-green-50 p-4 rounded border border-green-100">
          <h3 className="font-semibold text-green-800 mb-4 text-sm">Target Configuration</h3>
          
          <div className="mb-4">
            <label className="text-sm font-bold text-gray-700 block mb-1">Next Session *</label>
            <select 
              name="nextSession"
              value={formData.nextSession}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm bg-white"
            >
              <option value="">-- Select Next Session --</option>
              <option value="2025-2026">2025-2026</option>
              <option value="2026-2027">2026-2027</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700 block mb-1">Next Financial Year</label>
            <select 
              name="nextFinancialYear"
              value={formData.nextFinancialYear}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm bg-white"
            >
              <option value="">-- Select Financial Year --</option>
              <option value="FY 2025-26">FY 2025-26</option>
              <option value="FY 2026-27">FY 2026-27</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="font-semibold text-gray-700 mb-3 text-sm">Modules to Transfer *</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {availableModules.map((module, idx) => (
            <label key={idx} className="flex items-center gap-2 cursor-pointer p-2 border border-gray-200 rounded hover:bg-gray-50">
              <input 
                type="checkbox" 
                className="w-4 h-4 text-[#32a3d7] focus:ring-[#32a3d7] rounded border-gray-300"
                checked={formData.modulesToTransfer.includes(module)}
                onChange={() => handleCheckboxChange(module)}
              />
              <span className="text-sm text-gray-700">{module}</span>
            </label>
          ))}
        </div>
      </div>

      {message.text && (
        <div className={`mb-6 w-full p-3 rounded text-sm ${message.type === 'error' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-green-50 text-green-600 border border-green-200'}`}>
          {message.text}
        </div>
      )}

      <div className="flex justify-end pt-4 border-t border-gray-200">
        <button 
          onClick={handleSubmit}
          disabled={isLoading}
          className="bg-[#5bc0de] hover:bg-[#46b8da] text-white px-8 py-2 rounded text-sm flex items-center gap-2 font-medium disabled:opacity-50"
        >
          {isLoading ? <FaSpinner className="animate-spin" /> : <FaExchangeAlt />}
          {isLoading ? 'Processing...' : 'Execute Session Transfer'}
        </button>
      </div>
    </div>
  );
}
