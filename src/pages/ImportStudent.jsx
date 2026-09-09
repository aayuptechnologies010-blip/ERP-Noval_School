import React, { useState } from 'react';
import { FaUpload, FaFileExcel, FaSpinner } from 'react-icons/fa';

export default function ImportStudent() {
  const [uploadOption, setUploadOption] = useState('current');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.name.endsWith('.xlsx')) {
        setSelectedFile(file);
        setMessage({ type: '', text: '' });
      } else {
        setSelectedFile(null);
        setMessage({ type: 'error', text: 'Please upload a valid Excel (.xlsx) file.' });
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage({ type: 'error', text: 'Please select a file to upload.' });
      return;
    }

    setIsLoading(true);
    setMessage({ type: '', text: '' });

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('academicYearType', uploadOption); // Optional metadata

    try {
      const res = await fetch('http://localhost:5005/api/students/import', {
        method: 'POST',
        body: formData,
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setMessage({ type: 'success', text: data.message || 'Students imported successfully!' });
        setSelectedFile(null);
        // Reset file input
        document.getElementById('studentExcelUpload').value = '';
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to import students.' });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Error uploading file. Please ensure the backend server is running.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 mt-4 flex flex-col items-center">
      <div className="w-full max-w-5xl bg-gray-100 p-3 mb-6 font-bold text-gray-700 rounded-sm">
        UPLOAD DATA OPTION
      </div>
      
      <div className="flex gap-8 mb-8 text-sm w-full max-w-5xl">
        <label className="flex items-center gap-2 cursor-pointer">
          <input 
            type="radio" 
            name="uploadOption" 
            className="w-4 h-4 text-[#32a3d7] border-gray-300 focus:ring-[#32a3d7]"
            checked={uploadOption === 'current'}
            onChange={() => setUploadOption('current')}
          />
          <span>Import Student Current Academicyear <a href="#" className="text-[#32a3d7] hover:underline font-medium">Click Here For Excel</a></span>
        </label>
        
        <label className="flex items-center gap-2 cursor-pointer">
          <input 
            type="radio" 
            name="uploadOption" 
            className="w-4 h-4 text-[#32a3d7] border-gray-300 focus:ring-[#32a3d7]"
            checked={uploadOption === 'multiple'}
            onChange={() => setUploadOption('multiple')}
          />
          <span>Import Student Multiple Academicyear <a href="#" className="text-[#32a3d7] hover:underline font-medium">Click Here For Excel</a></span>
        </label>
      </div>

      <div className="w-full max-w-md border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors">
        <FaFileExcel className="text-4xl text-green-600 mb-4" />
        <p className="text-gray-600 mb-4 text-sm">Select an Excel file to import student data.</p>
        
        <input 
          type="file" 
          id="studentExcelUpload"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
          className="hidden"
        />
        <label 
          htmlFor="studentExcelUpload"
          className="bg-white border border-[#32a3d7] text-[#32a3d7] hover:bg-[#32a3d7] hover:text-white px-6 py-2 rounded text-sm cursor-pointer transition-colors"
        >
          Choose File
        </label>

        {selectedFile && (
          <p className="mt-4 text-sm font-medium text-gray-700 bg-gray-100 py-1 px-3 rounded break-all">
            {selectedFile.name}
          </p>
        )}
      </div>

      {message.text && (
        <div className={`mt-6 w-full max-w-md p-3 rounded text-sm text-center ${message.type === 'error' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-green-50 text-green-600 border border-green-200'}`}>
          {message.text}
        </div>
      )}

      <button 
        onClick={handleUpload}
        disabled={isLoading || !selectedFile}
        className="mt-6 bg-[#5bc0de] hover:bg-[#46b8da] text-white px-8 py-2.5 rounded text-sm flex items-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? <FaSpinner className="animate-spin" /> : <FaUpload />} 
        {isLoading ? 'Uploading...' : 'Upload Data'}
      </button>
    </div>
  );
}
