import React from 'react';
import { Download, Save } from 'lucide-react';

export default function ImportStaff() {
  return (
    <div className="import-staff-container">
      <div className="upload-header">
        <span className="upload-title">UPLOAD DATA OPTION</span>
        <label className="radio-label">
          <input type="radio" checked readOnly /> Excel To Online
        </label>
      </div>

      <div className="import-content">
        <h3 className="staff-details-title">STAFF DETAILS</h3>
        
        <div className="file-upload-section">
          <label className="file-label">Choose excel file to upload</label>
          <div className="file-input-group">
            <input type="text" className="file-text-input" readOnly />
            <button className="select-file-btn">Select file</button>
          </div>
        </div>

        <div className="action-buttons-left">
          <button className="blue-btn">
            <Download size={16} /> Download Template
          </button>
        </div>

        <div className="action-buttons-center">
          <button className="blue-btn">
            <Save size={16} /> Save Teachers
          </button>
        </div>
      </div>
    </div>
  );
}
