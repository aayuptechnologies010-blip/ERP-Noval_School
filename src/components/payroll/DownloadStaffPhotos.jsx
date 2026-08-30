import React from 'react';
import { Download } from 'lucide-react';

export default function DownloadStaffPhotos() {
  return (
    <div className="global-settings-container" style={{ padding: '20px' }}>
      
      <div className="settings-section" style={{ border: '1px solid #dee2e6', padding: '0', borderRadius: '4px', marginBottom: '20px' }}>
        <div style={{ padding: '20px 40px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ width: '150px', fontWeight: 'bold', fontSize: '13px', color: '#333' }}>Download Staff Photo</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ width: '150px', fontWeight: 'bold', fontSize: '13px', color: '#333', textAlign: 'right', paddingRight: '20px' }}>Staff</div>
            <select className="settings-input" style={{ width: '400px' }} defaultValue="Management">
              <option value="Management">Management</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <div style={{ width: '150px', fontWeight: 'bold', fontSize: '13px', color: '#333', textAlign: 'right', paddingRight: '20px', paddingTop: '5px' }}>Select Size</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <label className="checkbox-label" style={{ fontWeight: 'normal' }}>
                <input type="radio" name="img_size" /> I-Card Size - 216 x 253
              </label>
              <label className="checkbox-label" style={{ fontWeight: 'normal' }}>
                <input type="radio" name="img_size" /> Original Size - 432 x 506
              </label>
              <label className="checkbox-label" style={{ fontWeight: 'normal' }}>
                <input type="radio" name="img_size" /> Full Size - 136 x 159
              </label>
              <label className="checkbox-label" style={{ fontWeight: 'normal' }}>
                <input type="radio" name="img_size" defaultChecked /> Thumbs Size - 63 x 74
              </label>
            </div>
          </div>

        </div>
      </div>

      <div className="settings-section" style={{ border: '1px solid #dee2e6', padding: '0', borderRadius: '4px', minHeight: '300px' }}>
        <div style={{ backgroundColor: '#f8f9fa', padding: '10px', textAlign: 'center', fontWeight: 'bold', fontSize: '13px', borderBottom: '1px solid #dee2e6', color: '#333' }}>
          Staff Type : Management
        </div>
        <div style={{ padding: '20px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ width: '100px', textAlign: 'center' }}>
            <div style={{ width: '80px', height: '90px', backgroundColor: '#e9ecef', margin: '0 auto 10px auto', border: '1px solid #dee2e6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               {/* Placeholder for the person image */}
               <div style={{ width: '100%', height: '100%', backgroundColor: '#ccc' }}></div>
            </div>
            <div style={{ fontSize: '12px', color: '#333' }}>20.jpg</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
        <button className="blue-btn" style={{ padding: '8px 25px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Download size={16} /> Start Download
        </button>
      </div>

    </div>
  );
}
