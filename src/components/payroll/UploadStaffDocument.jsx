import React from 'react';
import { Search, ShieldAlert } from 'lucide-react';

export default function UploadStaffDocument() {
  return (
    <div className="global-settings-container" style={{ display: 'flex', gap: '40px', padding: '30px' }}>
      
      {/* Left Column: Image and Details */}
      <div style={{ width: '300px', flexShrink: 0 }}>
        <div style={{ border: '2px solid #dee2e6', width: '200px', height: '220px', margin: '0 auto 30px auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f9fa' }}>
          <ShieldAlert size={80} color="#ffcccc" />
          <div style={{ fontWeight: 'bold', fontSize: '16px', marginTop: '10px' }}>No Image</div>
          <div style={{ fontWeight: 'bold', fontSize: '16px' }}>Available</div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <span style={{ fontWeight: 'bold', width: '90px' }}>Name:</span>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <span style={{ fontWeight: 'bold', width: '90px' }}>Address:</span>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <span style={{ fontWeight: 'bold', width: '90px' }}>Contact No.:</span>
          </div>
        </div>
      </div>

      {/* Right Column: Search and Upload */}
      <div style={{ flexGrow: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '40px' }}>
          <label style={{ fontWeight: 'bold' }}>Enter/Search Name</label>
          <input type="text" className="settings-input" style={{ width: '250px' }} />
          <button style={{ backgroundColor: 'white', color: '#159BD7', border: '1px solid #159BD7', padding: '6px 20px', borderRadius: '4px', cursor: 'pointer' }}>
            Search
          </button>
        </div>

        <div style={{ marginBottom: '10px', fontWeight: 'bold', fontSize: '14px' }}>File Upload</div>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '30px' }}>
          <div style={{ display: 'flex', width: '400px' }}>
            <input type="text" className="settings-input" style={{ flexGrow: 1, borderRadius: '4px 0 0 4px', borderRight: 'none' }} disabled />
            <button style={{ backgroundColor: '#e9ecef', border: '1px solid #ced4da', padding: '6px 15px', borderRadius: '0 4px 4px 0', cursor: 'pointer' }}>
              Select file
            </button>
          </div>
          <button style={{ backgroundColor: 'white', color: '#159BD7', border: '1px solid #159BD7', padding: '6px 20px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
            <Search size={16} /> Verify Document
          </button>
        </div>

        <div className="mail-table-wrapper">
          <table className="mail-table">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>Sr.No.</th>
                <th>Document Photo</th>
                <th>Document Type</th>
                <th>Remove</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#6c757d', backgroundColor: '#f8f9fa' }}>
                  No data available in table
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
