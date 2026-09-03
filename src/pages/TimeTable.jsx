import React, { useState } from 'react';
import { FaSearch, FaPrint, FaDownload, FaSpinner } from 'react-icons/fa';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function TimeTable() {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [showTimetable, setShowTimetable] = useState(false);
  const [timetableData, setTimetableData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // We will derive time slots from the first available day's schedule since periods should be standard per day
  const [timeSlots, setTimeSlots] = useState([]);

  const handleFetch = async (e) => {
    e.preventDefault();
    if (!selectedClass || !selectedSection) {
      setError('Please select both Class and Section.');
      return;
    }
    
    setError('');
    setShowTimetable(false);
    setLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/timetables?class=${encodeURIComponent(selectedClass)}&section=${encodeURIComponent(selectedSection)}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        
        // Transform data into an easy lookup map: map[day][periodName] = periodObject
        const transformed = {};
        let slots = [];
        
        if (data.schedule && data.schedule.length > 0) {
          // Extract time slots from the longest day (or just the first one that has periods)
          const refDay = data.schedule.reduce((prev, curr) => (curr.periods.length > prev.periods.length ? curr : prev), data.schedule[0]);
          if (refDay && refDay.periods) {
            slots = refDay.periods.map(p => ({
              period: p.periodName,
              time: `${p.startTime} - ${p.endTime}`,
              isBreak: p.isBreak
            }));
          }
          
          data.schedule.forEach(daySchedule => {
            transformed[daySchedule.day] = {};
            daySchedule.periods.forEach(period => {
              transformed[daySchedule.day][period.periodName] = {
                subject: period.subject,
                teacher: period.teacher ? `${period.teacher.firstName || ''} ${period.teacher.lastName || ''}`.trim() : '',
                isBreak: period.isBreak
              };
            });
          });
        }
        
        setTimetableData(transformed);
        setTimeSlots(slots);
        setShowTimetable(true);
      } else if (response.status === 404) {
        setError(`No timetable found for ${selectedClass} - ${selectedSection}.`);
      } else {
        setError('Failed to fetch timetable. Please try again.');
      }
    } catch (err) {
      console.error("Error fetching timetable:", err);
      setError('Network error while fetching timetable.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Header Bar */}
      <div style={{ padding: '24px 32px 16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Class Timetable</h1>
        
        {showTimetable && (
          <div style={{ display: 'flex', gap: 12 }}>
            <button style={actionBtn}><FaDownload /> Download PDF</button>
            <button style={actionBtn}><FaPrint /> Print</button>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
        
        {/* Filter Card */}
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px' }}>
          <form onSubmit={handleFetch} style={{ display: 'flex', gap: 24, alignItems: 'flex-end' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>Select Class *</label>
              <select required value={selectedClass} onChange={e => setSelectedClass(e.target.value)} style={inputStyle}>
                <option value="">Select Class</option>
                <option value="Class 8">Class 8</option>
                <option value="Class 9">Class 9</option>
                <option value="Class 10">Class 10</option>
                {/* Dynamically this could be fetched from class endpoint in the future */}
              </select>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>Select Section *</label>
              <select required value={selectedSection} onChange={e => setSelectedSection(e.target.value)} style={inputStyle}>
                <option value="">Select Section</option>
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="C">Section C</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <button type="submit" disabled={loading} style={{ ...actionBtn, background: loading ? '#94a3b8' : '#3b82f6', color: '#fff', border: 'none', width: '100%', justifyContent: 'center' }}>
                {loading ? <FaSpinner className="spin" /> : <FaSearch />} Fetch Timetable
              </button>
            </div>
          </form>
          {error && <div style={{ marginTop: 16, color: '#ef4444', fontSize: 14, fontWeight: 600 }}>{error}</div>}
        </div>

        {/* Timetable Card */}
        {showTimetable && (
          <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px', flex: 1, overflowX: 'auto' }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#1e293b', marginBottom: 20, textAlign: 'center' }}>
              Timetable for {selectedClass} - Section {selectedSection}
            </h2>
            
            {timeSlots.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#64748b', padding: 20 }}>No schedule periods defined for this timetable.</div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 1000 }}>
                <thead>
                  <tr>
                    <th style={thDayStyle}>Days / Time</th>
                    {timeSlots.map((slot, idx) => (
                      <th key={idx} style={thStyle}>
                        <div style={{ fontWeight: 700, color: '#0f172a' }}>{slot.period}</div>
                        <div style={{ fontSize: 11, color: '#64748b', fontWeight: 500 }}>{slot.time}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {daysOfWeek.map(day => (
                    <tr key={day} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={tdDayStyle}>{day}</td>
                      
                      {timeSlots.map((slot, idx) => {
                        const cellData = timetableData[day]?.[slot.period];
                        
                        // Break slot rendering
                        if (slot.isBreak || (cellData && cellData.isBreak)) {
                          return (
                            <td key={idx} style={tdBreakStyle}>
                              BREAK
                            </td>
                          );
                        }
                        
                        // Normal slot rendering
                        return (
                          <td key={idx} style={tdStyle}>
                            {cellData && cellData.subject ? (
                              <div style={cardStyle}>
                                <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>
                                  {cellData.subject}
                                </div>
                                <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>
                                  {cellData.teacher || 'Unassigned'}
                                </div>
                              </div>
                            ) : (
                              <div style={emptyCardStyle}>-</div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
      
      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

// Styles
const inputStyle = {
  padding: '10px 12px',
  borderRadius: 6,
  border: '1px solid #cbd5e1',
  outline: 'none',
  fontSize: 14,
  color: '#1e293b',
  background: '#fff'
};

const actionBtn = {
  background: '#fff',
  border: '1px solid #cbd5e1',
  padding: '10px 16px',
  borderRadius: 6,
  fontSize: 13,
  fontWeight: 600,
  color: '#475569',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  transition: 'all 0.2s'
};

const thDayStyle = {
  padding: '16px',
  background: '#f8fafc',
  borderBottom: '2px solid #e2e8f0',
  borderRight: '1px solid #e2e8f0',
  textAlign: 'center',
  fontSize: 13,
  fontWeight: 700,
  color: '#334155',
  width: 120
};

const thStyle = {
  padding: '12px 8px',
  background: '#f8fafc',
  borderBottom: '2px solid #e2e8f0',
  borderRight: '1px solid #f1f5f9',
  textAlign: 'center'
};

const tdDayStyle = {
  padding: '16px',
  background: '#f8fafc',
  borderRight: '1px solid #e2e8f0',
  textAlign: 'center',
  fontSize: 13,
  fontWeight: 700,
  color: '#334155',
  letterSpacing: 0.5
};

const tdStyle = {
  padding: '8px',
  borderRight: '1px solid #f1f5f9',
  textAlign: 'center',
  verticalAlign: 'middle'
};

const tdBreakStyle = {
  padding: '8px',
  borderRight: '1px solid #f1f5f9',
  textAlign: 'center',
  background: '#f1f5f9',
  color: '#94a3b8',
  fontSize: 12,
  fontWeight: 800,
  letterSpacing: 2
};

const cardStyle = {
  background: '#fff',
  border: '1px solid #e2e8f0',
  borderRadius: 6,
  padding: '8px',
  display: 'inline-block',
  minWidth: 100,
  boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
};

const emptyCardStyle = {
  color: '#cbd5e1',
  fontSize: 14
};

export default TimeTable;
