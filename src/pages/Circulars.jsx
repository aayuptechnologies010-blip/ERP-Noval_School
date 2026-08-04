import React, { useState } from 'react';
import { FaVideo, FaPlus, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Circulars() {
  const navigate = useNavigate();
  const [searchBy, setSearchBy] = useState('Select');
  const [session, setSession] = useState('2026-2027');
  
  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Header Bar */}
      <div style={{ padding: '24px 32px 16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Circulars</h1>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 8, color: '#5cb85c', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            Video Tutorial <FaVideo size={16} />
          </button>
          
          <button 
            onClick={() => navigate('/dashboard/announcement/create-circular')} 
            style={{ background: '#5cb85c', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: 4, fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
          >
            <FaPlus /> Create New Circular
          </button>
        </div>
      </div>

      {/* Main Content Card */}
      <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        
        {/* Filters */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>Search By</label>
            <select 
              value={searchBy} 
              onChange={e => setSearchBy(e.target.value)}
              style={{ width: 250, padding: '10px 12px', borderRadius: 4, border: '1px solid #cbd5e1', outline: 'none', fontSize: 13, color: '#334155' }}
            >
              <option value="Select">Select</option>
              <option value="Circular Title">Circular Title</option>
              <option value="Circular Date">Circular Date</option>
            </select>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>Session</label>
            <select 
              value={session} 
              onChange={e => setSession(e.target.value)}
              style={{ width: 250, padding: '10px 12px', borderRadius: 4, border: '1px solid #cbd5e1', outline: 'none', fontSize: 13, color: '#334155' }}
            >
              <option value="2026-2027">2026-2027</option>
            </select>
          </div>
        </div>

        {/* Empty State Card */}
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ 
              width: 250, 
              height: 180, 
              background: '#f8fafc', 
              borderRadius: 16, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              position: 'relative'
            }}>
              <div style={{ border: '2px solid #cbd5e1', width: 160, height: 100, borderRadius: 8, background: '#fff', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                  <div style={{ position: 'absolute', top: -16, width: 32, height: 32, borderRadius: '50%', border: '2px solid #cbd5e1', background: '#f1f5f9' }}></div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#334155', letterSpacing: 0.5 }}>NO</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#334155', letterSpacing: 0.5 }}>RECORD FOUND</span>
              </div>
              <div style={{ position: 'absolute', left: 10, top: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffe4e6', color: '#ef4444', width: 40, height: 40, borderRadius: '50%', border: '3px solid #fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                  <FaSearch size={18} />
              </div>
            </div>
        </div>

      </div>
    </div>
  );
}

export default Circulars;
