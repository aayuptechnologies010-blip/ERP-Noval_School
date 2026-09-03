import React, { useState } from 'react';
import { FaClipboardList, FaCheckCircle, FaClock, FaChevronRight, FaStar, FaTrophy } from 'react-icons/fa';

function Survey() {
  const [activeTab, setActiveTab] = useState('Available');

  const [availableSurveys, setAvailableSurveys] = useState([]);
  const [completedSurveys, setCompletedSurveys] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/surveys`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        // Since we don't have a completions table yet, let's just show active ones in available
        setAvailableSurveys(data.filter(s => s.isActive));
      }
    } catch (error) {
      console.error("Error fetching surveys:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalPoints = completedSurveys.reduce((acc, curr) => acc + (curr.pointsEarned || 0), 0);

  return (
    <div style={{ flex: 1, background: '#f8f9fc', padding: '32px', minHeight: '100vh', boxSizing: 'border-box' }}>
      
      {/* Header Area */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1e293b', margin: '0 0 8px 0' }}>Surveys & Feedback</h1>
          <p style={{ color: '#64748b', fontSize: 15, margin: 0 }}>Your opinion matters! Participate in surveys to help us improve.</p>
        </div>
        
        {/* Points Badge */}
        <div style={{ background: '#fff', padding: '12px 20px', borderRadius: 16, boxShadow: '0 4px 15px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: 12, border: '1px solid #f1f5f9' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706' }}>
            <FaTrophy size={20} />
          </div>
          <div>
            <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Total Points</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#1e293b' }}>{totalPoints}</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 32, borderBottom: '1px solid #e2e8f0', paddingBottom: 16 }}>
        <button 
          onClick={() => setActiveTab('Available')}
          style={{ 
            background: activeTab === 'Available' ? '#3b82f6' : 'transparent',
            color: activeTab === 'Available' ? '#fff' : '#64748b',
            border: 'none', padding: '10px 24px', borderRadius: 20, cursor: 'pointer', fontSize: 14, fontWeight: 600,
            transition: 'all 0.2s ease',
            boxShadow: activeTab === 'Available' ? '0 4px 10px rgba(59,130,246,0.3)' : 'none'
          }}
        >
          Available Surveys <span style={{ background: activeTab === 'Available' ? '#fff' : '#e2e8f0', color: activeTab === 'Available' ? '#3b82f6' : '#64748b', padding: '2px 8px', borderRadius: 12, fontSize: 12, marginLeft: 8 }}>{availableSurveys.length}</span>
        </button>
        <button 
          onClick={() => setActiveTab('Completed')}
          style={{ 
            background: activeTab === 'Completed' ? '#10b981' : 'transparent',
            color: activeTab === 'Completed' ? '#fff' : '#64748b',
            border: 'none', padding: '10px 24px', borderRadius: 20, cursor: 'pointer', fontSize: 14, fontWeight: 600,
            transition: 'all 0.2s ease',
            boxShadow: activeTab === 'Completed' ? '0 4px 10px rgba(16,185,129,0.3)' : 'none'
          }}
        >
          Completed <span style={{ background: activeTab === 'Completed' ? '#fff' : '#e2e8f0', color: activeTab === 'Completed' ? '#10b981' : '#64748b', padding: '2px 8px', borderRadius: 12, fontSize: 12, marginLeft: 8 }}>{completedSurveys.length}</span>
        </button>
      </div>

      {/* Content */}
      {activeTab === 'Available' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }}>
          {loading ? (
            <p>Loading surveys...</p>
          ) : availableSurveys.length === 0 ? (
            <p>No available surveys found.</p>
          ) : availableSurveys.map(survey => (
            <div key={survey._id} style={{ background: '#fff', borderRadius: 20, padding: 28, boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid #f1f5f9', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: 5, position: 'absolute', left: 0, top: 0, bottom: 0, background: '#3b82f6' }} />
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}>
                  <FaClipboardList size={24} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#fef3c7', padding: '6px 12px', borderRadius: 20, color: '#d97706', fontSize: 13, fontWeight: 700, border: '1px solid #fde68a' }}>
                  <FaStar /> {survey.points} Pts
                </div>
              </div>
              
              <h3 style={{ margin: '0 0 12px 0', fontSize: 20, fontWeight: 800, color: '#1e293b', letterSpacing: '-0.02em' }}>{survey.title}</h3>
              <p style={{ margin: '0 0 24px 0', fontSize: 15, color: '#64748b', lineHeight: 1.6, flex: 1 }}>{survey.description}</p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: 20, borderTop: '1px dashed #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#64748b', fontSize: 14, fontWeight: 600 }}>
                  <FaClock style={{ color: '#94a3b8' }} /> {survey.time}
                </div>
                <button 
                  style={{ 
                    background: '#3b82f6', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: 12, 
                    cursor: 'pointer', fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8,
                    boxShadow: '0 4px 12px rgba(59,130,246,0.3)', transition: 'transform 0.1s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  onClick={() => alert(`Starting survey: ${survey.title}`)}
                >
                  Start Survey <FaChevronRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Completed Tab Content */}
      {activeTab === 'Completed' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }}>
          {completedSurveys.length === 0 ? (
            <p>No completed surveys found.</p>
          ) : completedSurveys.map(survey => (
            <div key={survey._id || survey.id} style={{ background: '#fff', borderRadius: 20, padding: 28, boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid #f1f5f9', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: 5, position: 'absolute', left: 0, top: 0, bottom: 0, background: '#10b981' }} />
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
                  <FaCheckCircle size={28} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#f1f5f9', padding: '6px 12px', borderRadius: 20, color: '#475569', fontSize: 13, fontWeight: 700 }}>
                  +{survey.pointsEarned} Pts Earned
                </div>
              </div>
              
              <h3 style={{ margin: '0 0 12px 0', fontSize: 20, fontWeight: 800, color: '#1e293b', letterSpacing: '-0.02em' }}>{survey.title}</h3>
              <p style={{ margin: '0 0 24px 0', fontSize: 15, color: '#64748b', lineHeight: 1.6, flex: 1 }}>{survey.description}</p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', borderTop: '1px dashed #e2e8f0', paddingTop: 20 }}>
                <div style={{ color: '#64748b', fontSize: 14, fontWeight: 500 }}>
                  <span style={{ color: '#94a3b8' }}>Completed on:</span> <br/>
                  <span style={{ fontWeight: 700, color: '#334155' }}>{survey.completedDate}</span>
                </div>
                <div style={{ background: '#ecfdf5', color: '#10b981', padding: '8px 16px', borderRadius: 12, fontSize: 14, fontWeight: 700, border: '1px solid #d1fae5' }}>
                  Thank you!
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default Survey;
