import React, { useState, useRef, useEffect } from 'react';
import { FaEye, FaTimes } from 'react-icons/fa';

const dummyData = [
  { id: 1, name: 'Miss. AARADHYA VERMA', designation: 'Teacher', msgCount: 0, avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: 2, name: 'Mr. AKASH RAI', designation: 'Accountant', msgCount: 0, avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: 3, name: 'Mr. AKHILESH MISHRA', designation: 'Teacher', msgCount: 0, avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: 4, name: 'Miss. ALFIYA BANO', designation: 'Accountant', msgCount: 0, avatar: 'https://i.pravatar.cc/150?u=4' },
  { id: 5, name: 'Mr. AMIT DUBEY', designation: 'Teacher', msgCount: 0, avatar: 'https://i.pravatar.cc/150?u=5' },
  { id: 6, name: 'Mr. ANKIT KUMAR', designation: 'Manager', msgCount: 0, avatar: 'https://i.pravatar.cc/150?u=6' },
  { id: 7, name: 'Mrs. ANSHIKA', designation: 'Teacher', msgCount: 0, avatar: 'https://i.pravatar.cc/150?u=7' },
  { id: 8, name: 'Miss. ARCHANA YADAV', designation: 'Teacher', msgCount: 0, avatar: 'https://i.pravatar.cc/150?u=8' },
  { id: 9, name: 'Mrs. ARPANA UPADHYAY', designation: 'Teacher', msgCount: 0, avatar: 'https://i.pravatar.cc/150?u=9' },
];

const wingsOptions = ['Higher', 'Kindergarten', 'Middle', 'Primary'];

function AppMessageUses() {
  const [dateRange, setDateRange] = useState('');
  const [wingsSearch, setWingsSearch] = useState('');
  const [selectedWings, setSelectedWings] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [viewUser, setViewUser] = useState(null);
  
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const handleWingToggle = (wing) => {
    if (selectedWings.includes(wing)) {
      setSelectedWings(selectedWings.filter(w => w !== wing));
    } else {
      setSelectedWings([...selectedWings, wing]);
    }
  };

  const filteredWings = wingsOptions.filter(w => w.toLowerCase().includes(wingsSearch.toLowerCase()));

  return (
    <div style={{ flex: 1, background: '#f4f6f9', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', minHeight: '100vh', boxSizing: 'border-box' }}>
      <h1 style={{ fontSize: 20, fontWeight: 600, color: '#333', margin: 0 }}>App Message Uses</h1>

      <div style={{ background: '#fff', borderRadius: 8, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        
        {/* Filters */}
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end', marginBottom: 24 }}>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#555', marginBottom: 8 }}>Select date range</label>
            <input 
              type="text" 
              placeholder="Custom Date" 
              value={dateRange}
              onChange={e => setDateRange(e.target.value)}
              style={{ width: 220, padding: '10px 12px', border: '1px solid #ddd', borderRadius: 4, outline: 'none', background: '#f8f9fa', fontSize: 14 }}
            />
          </div>
          
          {/* Wings Multi-Select Dropdown */}
          <div style={{ position: 'relative' }} ref={dropdownRef}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#555', marginBottom: 8 }}>Wings</label>
            <div 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{ width: 220, padding: '10px 12px', border: '1px solid #ddd', borderRadius: 4, background: '#fff', fontSize: 14, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: 41, boxSizing: 'border-box' }}
            >
              <span style={{ color: selectedWings.length === 0 ? '#999' : '#333', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {selectedWings.length === 0 ? 'Select' : selectedWings.join(', ')}
              </span>
              <span style={{ fontSize: 10, color: '#666' }}>▼</span>
            </div>
            
            {dropdownOpen && (
              <div style={{ position: 'absolute', top: 70, left: 0, width: '100%', background: '#fff', border: '1px solid #ccc', borderRadius: 4, boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 10, padding: 8 }}>
                <input 
                  type="text"
                  placeholder="Search..."
                  value={wingsSearch}
                  onChange={e => setWingsSearch(e.target.value)}
                  style={{ width: '100%', padding: '8px 10px', border: '1px solid #ddd', borderRadius: 4, marginBottom: 8, outline: 'none', boxSizing: 'border-box', fontSize: 13 }}
                />
                <div style={{ maxHeight: 150, overflowY: 'auto' }}>
                  {filteredWings.map(w => (
                    <div key={w} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 4px' }}>
                      <input 
                        type="checkbox" 
                        checked={selectedWings.includes(w)} 
                        onChange={() => handleWingToggle(w)}
                        style={{ cursor: 'pointer' }}
                      />
                      <label style={{ fontSize: 13, color: '#333', cursor: 'pointer', flex: 1 }} onClick={() => handleWingToggle(w)}>{w}</label>
                    </div>
                  ))}
                  {filteredWings.length === 0 && <div style={{ fontSize: 13, color: '#999', padding: '6px 4px' }}>No options found</div>}
                </div>
              </div>
            )}
          </div>

          <button style={{ background: '#5cb85c', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: 4, cursor: 'pointer', fontSize: 14, fontWeight: 500 }}>
            Go
          </button>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #eee' }}>
                <th style={thStyle}>Sr. No.</th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Designation</th>
                <th style={thStyle}>App Msg Count <span style={{ fontSize: 10 }}>↕</span></th>
                <th style={thStyle}>View</th>
              </tr>
            </thead>
            <tbody>
              {dummyData.map((item, index) => (
                <tr key={item.id} style={{ background: index % 2 === 0 ? '#fafafa' : '#fff', borderBottom: '1px solid #f1f1f1' }}>
                  <td style={tdStyle}>{index + 1}</td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <img src={item.avatar} alt="avatar" style={{ width: 24, height: 24, borderRadius: '50%', objectFit: 'cover' }} />
                      <span style={{ fontSize: 13, color: '#555' }}>{item.name}</span>
                    </div>
                  </td>
                  <td style={tdStyle}>{item.designation}</td>
                  <td style={tdStyle}>{item.msgCount}</td>
                  <td style={tdStyle}>
                    <button onClick={() => setViewUser(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#333', padding: 4 }}>
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* View Details Modal */}
      {viewUser && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyItems: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', borderRadius: 8, padding: 24, width: '100%', maxWidth: 500, margin: 'auto', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <img src={viewUser.avatar} alt="avatar" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <h2 style={{ margin: 0, fontSize: 16, color: '#333' }}>{viewUser.name}</h2>
                  <span style={{ fontSize: 12, color: '#777' }}>{viewUser.designation}</span>
                </div>
              </div>
              <button onClick={() => setViewUser(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <FaTimes size={16} color="#666" />
              </button>
            </div>
            
            <div style={{ background: '#f8f9fa', padding: 16, borderRadius: 6, border: '1px solid #eaeaea' }}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: 14, color: '#444' }}>Message Usage Details</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #ccc', paddingBottom: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: '#666' }}>Total Messages Sent:</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#333' }}>{viewUser.msgCount}</span>
              </div>
              <div style={{ fontSize: 13, color: '#888', fontStyle: 'italic', textAlign: 'center', marginTop: 20 }}>
                {viewUser.msgCount === 0 ? "No app messages used by this user." : "View full history..."}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

const thStyle = { padding: '12px 16px', fontSize: 13, fontWeight: 600, color: '#333', whiteSpace: 'nowrap' };
const tdStyle = { padding: '12px 16px', fontSize: 13, color: '#555', verticalAlign: 'middle' };

export default AppMessageUses;
