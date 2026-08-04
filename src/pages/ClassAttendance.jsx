import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function ClassAttendance() {
  const navigate = useNavigate();

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Header Bar */}
      <div style={{ padding: '24px 32px 16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Class Attendance</h1>
        <button 
          onClick={() => navigate(-1)}
          style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#475569', fontSize: 14, fontWeight: 600, cursor: 'pointer', background: 'none', border: 'none' }}
        >
          <FaArrowLeft style={{ fontSize: 12 }} /> Go Back
        </button>
      </div>

      {/* Main Content Card */}
      <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'hidden' }}>
        <div style={{ background: '#fff', borderRadius: 12, height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          
          {/* Filters */}
          <div style={{ padding: '24px', display: 'flex', alignItems: 'flex-end', gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 200 }}>
              <label style={{ fontSize: 13, color: '#475569' }}>Class</label>
              <select style={{ border: '1px solid #e2e8f0', borderRadius: 4, padding: '10px 12px', fontSize: 14, color: '#334155', outline: 'none', background: '#fff' }}>
                <option>Select Class</option>
                <option>NUR A</option>
                <option>NUR B</option>
                <option>LKG A</option>
                <option>LKG B</option>
                <option>UKG A</option>
                <option>UKG B</option>
                <option>UKG C</option>
                <option>1 A</option>
                <option>1 B</option>
                <option>1 C</option>
                <option>2 A</option>
                <option>2 B</option>
                <option>2 C</option>
                <option>3 A</option>
                <option>3 B</option>
                <option>3 C</option>
                <option>4 A</option>
                <option>4 B</option>
                <option>4 C</option>
                <option>5 A</option>
                <option>5 B</option>
                <option>5 C</option>
                <option>6 A</option>
                <option>6 B</option>
                <option>6 C</option>
                <option>7 A</option>
                <option>7 B</option>
                <option>7 C</option>
                <option>8 A</option>
                <option>8 B</option>
                <option>8 C</option>
                <option>9 A</option>
                <option>9 B</option>
                <option>9 C</option>
                <option>9 D</option>
                <option>9 E</option>
                <option>9 F</option>
                <option>10 A</option>
                <option>10 B</option>
                <option>10 C</option>
                <option>10 D</option>
                <option>11 A</option>
                <option>11 B</option>
                <option>11 C</option>
                <option>11 D</option>
                <option>11 E</option>
                <option>11 F</option>
                <option>12 A</option>
                <option>12 B</option>
                <option>12 C</option>
                <option>12 D</option>
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 200 }}>
              <label style={{ fontSize: 13, color: '#475569' }}>Date</label>
              <input 
                type="text" 
                value="03-Aug-2026"
                readOnly
                style={{ border: '1px solid #e2e8f0', borderRadius: 4, background: '#f1f5f9', padding: '10px 12px', fontSize: 14, color: '#334155', outline: 'none' }}
              />
            </div>
            <button style={{ background: '#65c466', color: '#fff', border: 'none', borderRadius: 4, padding: '10px 16px', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginBottom: 2 }}>
              GO
            </button>
          </div>

          {/* Empty State Graphic */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <div style={{ position: 'relative', width: 250, height: 180 }}>
              {/* This is a simple placeholder graphic mimicking the "NO RECORD FOUND" SVG */}
              <div style={{ width: '100%', height: 120, border: '2px solid #8b5cf6', borderRadius: 8, background: '#fff', position: 'absolute', bottom: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#1e1b4b', textAlign: 'center', lineHeight: 1.2 }}>
                  NO<br/>RECORD FOUND
                </span>
              </div>
              <div style={{ width: '80%', height: 10, background: '#8b5cf6', borderRadius: 4, position: 'absolute', bottom: 0, left: '10%' }}></div>
              <div style={{ width: 60, height: 60, border: '4px solid #f43f5e', borderRadius: '50%', position: 'absolute', left: -20, top: 40, display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#fff' }}>
                 <div style={{ width: 20, height: 20, background: '#f43f5e', transform: 'rotate(45deg) translate(20px, 20px)' }}></div>
              </div>
              <div style={{ width: 50, height: 50, border: '2px solid #8b5cf6', borderRadius: '50%', position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', background: '#e0e7ff' }}></div>
              <div style={{ position: 'absolute', right: -10, top: 50, width: 0, height: 0, borderLeft: '20px solid transparent', borderRight: '20px solid transparent', borderBottom: '35px solid #e2e8f0', display: 'flex', justifyContent: 'center' }}>
                <span style={{ position: 'absolute', top: 10, color: '#f43f5e', fontSize: 16, fontWeight: 'bold' }}>!</span>
              </div>
            </div>
          </div>
          
        </div>

        <div style={{ textAlign: 'center', marginTop: 40, paddingBottom: 20, fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>
          COPYRIGHT © 2026 FRANCISCAN
        </div>
      </div>
    </div>
  );
}

export default ClassAttendance;
