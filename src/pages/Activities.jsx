import React, { useState } from 'react';

function Activities() {
  const [title, setTitle] = useState('');
  const [dayType, setDayType] = useState('Select Day Type');
  const [duration, setDuration] = useState('Select Duration');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [assignTo, setAssignTo] = useState('Select Assign to');
  const [isActive, setIsActive] = useState(false);
  const [showOnWebsite, setShowOnWebsite] = useState(false);

  const handleCreate = () => {
    alert('Activity Created Successfully!');
  };

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Header Bar */}
      <div style={{ padding: '24px 32px 16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Activities</h1>
        <button style={{ background: '#5cb85c', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 4, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
          Activities List
        </button>
      </div>

      {/* Main Content Card */}
      <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '32px' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#334155', margin: '0 0 24px 0' }}>Add New Activity</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            
            {/* Row 1 */}
            <div style={{ display: 'flex', gap: 32 }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={labelStyle}>Title</label>
                <div>
                  <input 
                    type="text" 
                    placeholder="Enter title (max 150 characters)" 
                    maxLength={150}
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    style={inputStyle}
                  />
                  <div style={{ textAlign: 'right', fontSize: 11, color: '#94a3b8', marginTop: 4 }}>
                    {title.length}/150
                  </div>
                </div>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={labelStyle}>Day Type</label>
                <select value={dayType} onChange={e => setDayType(e.target.value)} style={inputStyle}>
                  <option value="Select Day Type">Select Day Type</option>
                  <option value="Holiday">Holiday</option>
                  <option value="Working">Working</option>
                </select>
              </div>
            </div>

            {/* Row 2 */}
            <div style={{ display: 'flex', gap: 32 }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={labelStyle}>Duration</label>
                <select value={duration} onChange={e => setDuration(e.target.value)} style={inputStyle}>
                  <option value="Select Duration">Select Duration</option>
                  <option value="One Day">One Day</option>
                  <option value="More then one day">More then one day</option>
                </select>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={labelStyle}>From Date</label>
                <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} style={inputStyle} />
              </div>
            </div>

            {/* Row 3 */}
            <div style={{ display: 'flex', gap: 32 }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={labelStyle}>Assign to</label>
                <select value={assignTo} onChange={e => setAssignTo(e.target.value)} style={inputStyle}>
                  <option value="Select Assign to">Select Assign to</option>
                  <option value="All">All</option>
                  <option value="Student/Parent">Student/Parent</option>
                  <option value="Staff">Staff</option>
                </select>
              </div>
              <div style={{ flex: 1, display: 'flex', gap: 32, alignItems: 'center' }}>
                {duration === 'More then one day' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                    <label style={labelStyle}>To Date</label>
                    <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} style={inputStyle} />
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: duration === 'More then one day' ? 24 : 0 }}>
                  <input type="checkbox" id="active" checked={isActive} onChange={e => setIsActive(e.target.checked)} style={{ cursor: 'pointer' }} />
                  <label htmlFor="active" style={{ fontSize: 13, color: '#475569', cursor: 'pointer' }}>Active</label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: duration === 'More then one day' ? 24 : 0 }}>
                  <input type="checkbox" id="showWeb" checked={showOnWebsite} onChange={e => setShowOnWebsite(e.target.checked)} style={{ cursor: 'pointer' }} />
                  <label htmlFor="showWeb" style={{ fontSize: 13, color: '#475569', cursor: 'pointer' }}>Show on Website</label>
                </div>
              </div>
            </div>

            {/* Create Button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
              <button onClick={handleCreate} style={{ background: '#5cb85c', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: 4, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                Create Activities
              </button>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}

const labelStyle = {
  fontSize: 13, color: '#475569', fontWeight: 600
};

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: 4,
  border: '1px solid #cbd5e1',
  outline: 'none',
  fontSize: 14,
  color: '#334155',
  background: '#fff',
  boxSizing: 'border-box'
};

export default Activities;
