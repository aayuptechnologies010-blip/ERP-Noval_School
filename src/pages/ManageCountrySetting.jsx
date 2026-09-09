import React, { useState, useEffect } from 'react';
import { FaSave, FaAngleUp } from 'react-icons/fa';

export default function ManageCountrySetting() {
  const [countrySetting, setCountrySetting] = useState('India');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Mock fetch on mount
  useEffect(() => {
    fetchCountrySetting();
  }, []);

  const fetchCountrySetting = async () => {
    try {
      // Replace with actual endpoint if exists, e.g., /api/country-setting
      const res = await fetch('http://localhost:5005/api/country-setting');
      if (res.ok) {
        const data = await res.json();
        if (data && data.country) {
          setCountrySetting(data.country);
        }
      }
    } catch (err) {
      console.log('No existing country setting found or endpoint missing.');
    }
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    setMessage('');
    try {
      const res = await fetch('http://localhost:5005/api/country-setting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country: countrySetting })
      });
      if (res.ok) {
        setMessage('Country setting updated successfully!');
      } else {
        setMessage('Failed to update country setting (Endpoint might not exist yet).');
      }
    } catch (err) {
      setMessage('Error updating country setting.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 mt-4 flex flex-col items-start w-full">
      <div className="mb-6 w-full">
        <label className="text-sm font-bold text-gray-700 block mb-2">Country Setting</label>
        <select 
          className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#32a3d7] w-full text-sm"
          value={countrySetting}
          onChange={(e) => setCountrySetting(e.target.value)}
        >
          <option value="India">India</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
          <option value="Australia">Australia</option>
          <option value="Canada">Canada</option>
        </select>
      </div>
      {message && <p className="text-sm mb-4 text-green-600">{message}</p>}
      <button 
        onClick={handleUpdate}
        disabled={isLoading}
        className="bg-[#5bc0de] hover:bg-[#46b8da] text-white px-6 py-2 rounded text-sm flex items-center gap-2 font-medium self-end disabled:opacity-50"
      >
        <FaSave /> {isLoading ? 'Updating...' : 'Update Setting'}
      </button>
    </div>
  );
}
