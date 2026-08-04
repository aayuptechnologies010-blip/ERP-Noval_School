import React, { useState } from 'react';
import { FaSearch, FaPrint, FaDownload } from 'react-icons/fa';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const timeSlots = [
  { period: '1st Period', time: '08:00 AM - 08:45 AM' },
  { period: '2nd Period', time: '08:45 AM - 09:30 AM' },
  { period: '3rd Period', time: '09:30 AM - 10:15 AM' },
  { period: 'Break', time: '10:15 AM - 10:45 AM', isBreak: true },
  { period: '4th Period', time: '10:45 AM - 11:30 AM' },
  { period: '5th Period', time: '11:30 AM - 12:15 PM' },
  { period: 'Lunch Break', time: '12:15 PM - 01:00 PM', isBreak: true },
  { period: '6th Period', time: '01:00 PM - 01:45 PM' },
  { period: '7th Period', time: '01:45 PM - 02:30 PM' },
];

const dummyTimetable = {
  Monday: { '1st Period': { subject: 'Mathematics', teacher: 'R. Sharma' }, '2nd Period': { subject: 'Physics', teacher: 'S. Verma' }, '3rd Period': { subject: 'English', teacher: 'K. Patel' }, '4th Period': { subject: 'Chemistry', teacher: 'A. Gupta' }, '5th Period': { subject: 'Computer', teacher: 'N. Singh' }, '6th Period': { subject: 'History', teacher: 'M. Ali' }, '7th Period': { subject: 'Geography', teacher: 'P. Kumar' } },
  Tuesday: { '1st Period': { subject: 'Physics', teacher: 'S. Verma' }, '2nd Period': { subject: 'Mathematics', teacher: 'R. Sharma' }, '3rd Period': { subject: 'Chemistry', teacher: 'A. Gupta' }, '4th Period': { subject: 'English', teacher: 'K. Patel' }, '5th Period': { subject: 'Biology', teacher: 'J. Das' }, '6th Period': { subject: 'Computer', teacher: 'N. Singh' }, '7th Period': { subject: 'Games', teacher: 'T. Roy' } },
  Wednesday: { '1st Period': { subject: 'English', teacher: 'K. Patel' }, '2nd Period': { subject: 'Chemistry', teacher: 'A. Gupta' }, '3rd Period': { subject: 'Mathematics', teacher: 'R. Sharma' }, '4th Period': { subject: 'Physics', teacher: 'S. Verma' }, '5th Period': { subject: 'History', teacher: 'M. Ali' }, '6th Period': { subject: 'Geography', teacher: 'P. Kumar' }, '7th Period': { subject: 'Library', teacher: 'L. Sen' } },
  Thursday: { '1st Period': { subject: 'Chemistry', teacher: 'A. Gupta' }, '2nd Period': { subject: 'Physics', teacher: 'S. Verma' }, '3rd Period': { subject: 'English', teacher: 'K. Patel' }, '4th Period': { subject: 'Mathematics', teacher: 'R. Sharma' }, '5th Period': { subject: 'Computer', teacher: 'N. Singh' }, '6th Period': { subject: 'Biology', teacher: 'J. Das' }, '7th Period': { subject: 'Games', teacher: 'T. Roy' } },
  Friday: { '1st Period': { subject: 'Mathematics', teacher: 'R. Sharma' }, '2nd Period': { subject: 'English', teacher: 'K. Patel' }, '3rd Period': { subject: 'Physics', teacher: 'S. Verma' }, '4th Period': { subject: 'Chemistry', teacher: 'A. Gupta' }, '5th Period': { subject: 'History', teacher: 'M. Ali' }, '6th Period': { subject: 'Computer', teacher: 'N. Singh' }, '7th Period': { subject: 'Geography', teacher: 'P. Kumar' } },
  Saturday: { '1st Period': { subject: 'Computer', teacher: 'N. Singh' }, '2nd Period': { subject: 'Mathematics', teacher: 'R. Sharma' }, '3rd Period': { subject: 'Physics', teacher: 'S. Verma' }, '4th Period': { subject: 'Chemistry', teacher: 'A. Gupta' }, '5th Period': { subject: 'English', teacher: 'K. Patel' }, '6th Period': { subject: 'Library', teacher: 'L. Sen' }, '7th Period': { subject: 'Games', teacher: 'T. Roy' } },
};

function TimeTable() {
  const [selectedClass, setSelectedClass] = useState('Class 10');
  const [selectedSection, setSelectedSection] = useState('Section A');
  const [showTimetable, setShowTimetable] = useState(false);

  const handleFetch = (e) => {
    e.preventDefault();
    setShowTimetable(true);
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
              <label style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>Select Class</label>
              <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} style={inputStyle}>
                <option value="">Select Class</option>
                <option value="Class 8">Class 8</option>
                <option value="Class 9">Class 9</option>
                <option value="Class 10">Class 10</option>
              </select>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>Select Section</label>
              <select value={selectedSection} onChange={e => setSelectedSection(e.target.value)} style={inputStyle}>
                <option value="">Select Section</option>
                <option value="Section A">Section A</option>
                <option value="Section B">Section B</option>
                <option value="Section C">Section C</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <button type="submit" style={{ ...actionBtn, background: '#3b82f6', color: '#fff', border: 'none', width: '100%', justifyContent: 'center' }}>
                <FaSearch /> Fetch Timetable
              </button>
            </div>
          </form>
        </div>

        {/* Timetable Card */}
        {showTimetable && (
          <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px', flex: 1, overflowX: 'auto' }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#1e293b', marginBottom: 20, textAlign: 'center' }}>
              Timetable for {selectedClass} - {selectedSection}
            </h2>
            
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
                {daysOfWeek.map((day) => (
                  <tr key={day}>
                    <td style={tdDayStyle}>{day}</td>
                    {timeSlots.map((slot, idx) => {
                      if (slot.isBreak) {
                        return (
                          <td key={idx} style={tdBreakStyle}>
                            <span style={{ transform: 'rotate(-90deg)', display: 'block', fontSize: 12, letterSpacing: 2 }}>{slot.period.toUpperCase()}</span>
                          </td>
                        );
                      }

                      const periodData = dummyTimetable[day]?.[slot.period];
                      return (
                        <td key={idx} style={tdStyle}>
                          {periodData ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
                              <span style={{ fontSize: 13, fontWeight: 700, color: '#2563eb' }}>{periodData.subject}</span>
                              <span style={{ fontSize: 11, color: '#475569' }}>{periodData.teacher}</span>
                            </div>
                          ) : (
                            <span style={{ color: '#94a3b8', fontSize: 12 }}>-</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}

const inputStyle = { width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #cbd5e1', outline: 'none', fontSize: 14, color: '#334155' };
const actionBtn = { display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderRadius: 6, border: '1px solid #cbd5e1', background: '#fff', color: '#475569', fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: '0.2s' };

const thDayStyle = { padding: '16px', textAlign: 'center', background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: 14, fontWeight: 700, color: '#334155', width: 120 };
const thStyle = { padding: '12px', textAlign: 'center', background: '#f8fafc', border: '1px solid #e2e8f0' };

const tdDayStyle = { padding: '16px', textAlign: 'center', background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: 14, fontWeight: 700, color: '#334155' };
const tdStyle = { padding: '12px', textAlign: 'center', border: '1px solid #e2e8f0', background: '#fff' };
const tdBreakStyle = { padding: '12px 0', textAlign: 'center', border: '1px solid #e2e8f0', background: '#f1f5f9', color: '#64748b', fontWeight: 700 };

export default TimeTable;
