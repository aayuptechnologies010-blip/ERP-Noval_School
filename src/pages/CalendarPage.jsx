import React from 'react';

function CalendarPage() {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '24px 32px 16px 32px' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>School Calendar - October 2023</h1>
      </div>

      <div style={{ padding: '0 32px 32px 32px', flex: 1, overflow: 'auto' }}>
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1, background: '#e2e8f0', border: '1px solid #e2e8f0' }}>
            {days.map(day => (
              <div key={day} style={{ background: '#f8fafc', padding: '12px', textAlign: 'center', fontWeight: 600, color: '#475569', fontSize: 14 }}>
                {day}
              </div>
            ))}
            
            {/* Empty slots for starting day of month (e.g., starts on Sunday) */}
            {/* Assuming month starts on Sunday for demo */}
            
            {dates.map(date => (
              <div key={date} style={{ background: '#fff', minHeight: 100, padding: 8, position: 'relative' }}>
                <span style={{ fontWeight: 600, color: '#334155', fontSize: 14 }}>{date}</span>
                
                {/* Dummy Events */}
                {date === 2 && (
                  <div style={{ background: '#dcfce7', color: '#16a34a', padding: '4px 6px', borderRadius: 4, fontSize: 11, fontWeight: 600, marginTop: 4 }}>
                    Gandhi Jayanti
                  </div>
                )}
                {date === 15 && (
                  <div style={{ background: '#e0e7ff', color: '#4f46e5', padding: '4px 6px', borderRadius: 4, fontSize: 11, fontWeight: 600, marginTop: 4 }}>
                    Half Yearly Exams start
                  </div>
                )}
                {date === 24 && (
                  <div style={{ background: '#fee2e2', color: '#ef4444', padding: '4px 6px', borderRadius: 4, fontSize: 11, fontWeight: 600, marginTop: 4 }}>
                    Dussehra Holiday
                  </div>
                )}
              </div>
            ))}
            
            {/* Empty slots to complete the grid (31 + 4 = 35) */}
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={`empty-${i}`} style={{ background: '#f8fafc', minHeight: 100 }}></div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default CalendarPage;
