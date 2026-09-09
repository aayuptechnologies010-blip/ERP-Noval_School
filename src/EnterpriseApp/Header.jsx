import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

export default function Header() {
  const [userOpen, setUserOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="erp-header">
      <div className="erp-header-left">
        <div className="erp-header-title">NAVALS NATIONAL ACADEMY</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span>🏢</span> Fees
        </div>
        <div className="erp-header-controls">
          <div>
            Academic Year: <select><option>2026-2027</option></select>
          </div>
          <div>
            Financial Year: <select><option>2026-2027</option></select>
          </div>
        </div>
      </div>
      <div className="erp-header-right">
        <span>❓</span>
        <span>⚙️</span>
        <div style={{ position: 'relative' }}>
          <div 
            onClick={() => setUserOpen(!userOpen)}
            style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}
          >
            ANKIT KUMAR <span style={{ fontSize: '10px' }}>▼</span>
          </div>
          {userOpen && (
            <div style={{ position: 'absolute', right: 0, top: '100%', marginTop: '5px', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px', zIndex: 1000, minWidth: '120px' }}>
              <div 
                style={{ padding: '8px 12px', cursor: 'pointer', color: '#333' }}
                onClick={() => {
                  setUserOpen(false);
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  navigate("/");
                }}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
