import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function DownloadStaffPhotos() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [designations, setDesignations] = useState([]);
  const [selectedDesignation, setSelectedDesignation] = useState('All');
  const [imgSize, setImgSize] = useState('thumbs'); // thumbs, full, original, icard

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const headers = { 'Authorization': `Bearer ${token}` };
        
        // Fetch designations for filter
        const desigRes = await fetch(`${API_BASE}/api/designations`, { headers });
        if (desigRes.ok) {
          const desigData = await desigRes.json();
          setDesignations(desigData);
        }

        // Fetch staff
        const staffRes = await fetch(`${API_BASE}/api/staffs`, { headers });
        if (staffRes.ok) {
          const staffData = await staffRes.json();
          setStaff(staffData.filter(s => s.staffPhoto)); // Only staff with photos
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const filteredStaff = selectedDesignation === 'All' 
    ? staff 
    : staff.filter(s => s.designation === selectedDesignation);

  const getStyleForSize = () => {
    switch(imgSize) {
      case 'icard': return { width: '150px', height: '175px' }; // scaled down slightly for preview
      case 'original': return { width: '200px', height: '235px' };
      case 'full': return { width: '136px', height: '159px' };
      case 'thumbs':
      default: return { width: '63px', height: '74px' };
    }
  };

  const imgStyle = getStyleForSize();

  const handleDownload = async (url, name) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const objectUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = `${name.replace(/\s+/g, '_')}_photo.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Download failed', err);
    }
  };

  return (
    <div className="global-settings-container" style={{ padding: '20px' }}>
      
      <div className="settings-section" style={{ border: '1px solid #dee2e6', padding: '0', borderRadius: '4px', marginBottom: '20px' }}>
        <div style={{ padding: '20px 40px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ width: '150px', fontWeight: 'bold', fontSize: '13px', color: '#333' }}>Download Staff Photo</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ width: '150px', fontWeight: 'bold', fontSize: '13px', color: '#333', textAlign: 'right', paddingRight: '20px' }}>Filter by Designation</div>
            <select 
              className="settings-input" 
              style={{ width: '400px' }} 
              value={selectedDesignation}
              onChange={(e) => setSelectedDesignation(e.target.value)}
            >
              <option value="All">All Designations</option>
              {designations.map(d => (
                <option key={d._id} value={d.type}>{d.type}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <div style={{ width: '150px', fontWeight: 'bold', fontSize: '13px', color: '#333', textAlign: 'right', paddingRight: '20px', paddingTop: '5px' }}>Select Size (Preview)</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <label className="checkbox-label" style={{ fontWeight: 'normal' }}>
                <input type="radio" name="img_size" checked={imgSize === 'icard'} onChange={() => setImgSize('icard')} /> I-Card Size - 216 x 253
              </label>
              <label className="checkbox-label" style={{ fontWeight: 'normal' }}>
                <input type="radio" name="img_size" checked={imgSize === 'original'} onChange={() => setImgSize('original')} /> Original Size - 432 x 506
              </label>
              <label className="checkbox-label" style={{ fontWeight: 'normal' }}>
                <input type="radio" name="img_size" checked={imgSize === 'full'} onChange={() => setImgSize('full')} /> Full Size - 136 x 159
              </label>
              <label className="checkbox-label" style={{ fontWeight: 'normal' }}>
                <input type="radio" name="img_size" checked={imgSize === 'thumbs'} onChange={() => setImgSize('thumbs')} /> Thumbs Size - 63 x 74
              </label>
            </div>
          </div>

        </div>
      </div>

      <div className="settings-section" style={{ border: '1px solid #dee2e6', padding: '0', borderRadius: '4px', minHeight: '300px' }}>
        <div style={{ backgroundColor: '#f8f9fa', padding: '10px', textAlign: 'center', fontWeight: 'bold', fontSize: '13px', borderBottom: '1px solid #dee2e6', color: '#333' }}>
          Designation: {selectedDesignation} ({filteredStaff.length} Photos Found)
        </div>
        
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center' }}>Loading photos...</div>
        ) : filteredStaff.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>No photos available for the selected filter.</div>
        ) : (
          <div style={{ padding: '20px', display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {filteredStaff.map(s => (
              <div key={s._id} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ 
                  ...imgStyle,
                  backgroundColor: '#e9ecef', 
                  margin: '0 auto 10px auto', 
                  border: '1px solid #dee2e6', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}>
                  <img 
                    src={`${API_BASE}${s.staffPhoto}`} 
                    alt={s.firstName} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>
                <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '2px' }}>{s.firstName} {s.lastName}</div>
                <div style={{ fontSize: '11px', color: '#666', marginBottom: '5px' }}>{s.employeeCode || 'No Code'}</div>
                <button 
                  style={{ background: 'none', border: 'none', color: '#159BD7', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}
                  onClick={() => handleDownload(`${API_BASE}${s.staffPhoto}`, `${s.firstName}_${s.lastName}`)}
                >
                  <Download size={14} /> Download
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
