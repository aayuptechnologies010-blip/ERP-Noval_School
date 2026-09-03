import React, { useState, useEffect } from 'react';

function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      // Using activities endpoint to populate calendar
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/activities`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setEvents(Array.isArray(data) ? data : (data.activities || []));
      }
    } catch (error) {
      console.error('Error fetching calendar events:', error);
    }
  };

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Helper to get events for a specific date
  const getEventsForDate = (dateNum) => {
    return events.filter(e => {
      if (!e.fromDate) return false;
      const eDate = new Date(e.fromDate);
      return eDate.getDate() === dateNum && eDate.getMonth() === currentMonth && eDate.getFullYear() === currentYear;
    });
  };

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '24px 32px 16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>
          School Calendar - {monthNames[currentMonth]} {currentYear}
        </h1>
        <div>
          <button 
            onClick={() => setCurrentDate(new Date(currentYear, currentMonth - 1, 1))}
            style={{ padding: '6px 12px', marginRight: 8, cursor: 'pointer', border: '1px solid #cbd5e1', background: '#fff', borderRadius: 4 }}
          >Prev</button>
          <button 
            onClick={() => setCurrentDate(new Date(currentYear, currentMonth + 1, 1))}
            style={{ padding: '6px 12px', cursor: 'pointer', border: '1px solid #cbd5e1', background: '#fff', borderRadius: 4 }}
          >Next</button>
        </div>
      </div>

      <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'auto' }}>
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1, background: '#e2e8f0', border: '1px solid #e2e8f0' }}>
            {days.map(day => (
              <div key={day} style={{ background: '#f8fafc', padding: '12px', textAlign: 'center', fontWeight: 600, color: '#475569', fontSize: 14 }}>
                {day}
              </div>
            ))}
            
            {/* Empty slots for starting day of month */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-start-${i}`} style={{ background: '#f8fafc', minHeight: 100 }}></div>
            ))}
            
            {dates.map(date => {
              const dayEvents = getEventsForDate(date);
              return (
                <div key={date} style={{ background: '#fff', minHeight: 100, padding: 8, position: 'relative', borderTop: '1px solid #f1f5f9', borderLeft: '1px solid #f1f5f9' }}>
                  <span style={{ fontWeight: 600, color: '#334155', fontSize: 14 }}>{date}</span>
                  
                  {dayEvents.map(evt => (
                    <div key={evt._id || evt.id} style={{ background: '#e0e7ff', color: '#4f46e5', padding: '4px 6px', borderRadius: 4, fontSize: 11, fontWeight: 600, marginTop: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={evt.title}>
                      {evt.title}
                    </div>
                  ))}
                </div>
              );
            })}
            
            {/* Empty slots to complete the grid */}
            {Array.from({ length: (7 - ((firstDayOfMonth + daysInMonth) % 7)) % 7 }).map((_, i) => (
              <div key={`empty-end-${i}`} style={{ background: '#f8fafc', minHeight: 100, borderTop: '1px solid #f1f5f9', borderLeft: '1px solid #f1f5f9' }}></div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default CalendarPage;
