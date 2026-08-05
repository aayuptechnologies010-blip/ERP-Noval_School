import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaChartBar, FaSearch, FaCheckCircle, FaTimesCircle, FaTimes, FaUsers, FaPoll, FaPercent } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const initialSurveys = [
  { 
    id: 1, title: 'Transport Facility Feedback', audience: 'Parents', 
    startDate: '2026-08-01', endDate: '2026-08-15', status: 'Active', responses: 120,
    totalTarget: 200,
    analyticsData: [
      { question: 'Overall Satisfaction', Excellent: 45, Good: 38, Average: 27, Poor: 10 },
      { question: 'Punctuality', Excellent: 60, Good: 30, Average: 20, Poor: 10 },
      { question: 'Safety', Excellent: 55, Good: 40, Average: 15, Poor: 10 },
      { question: 'Cleanliness', Excellent: 40, Good: 45, Average: 25, Poor: 10 },
    ],
    sentimentData: [
      { name: 'Satisfied', value: 65, color: '#10b981' },
      { name: 'Neutral', value: 22, color: '#f59e0b' },
      { name: 'Dissatisfied', value: 13, color: '#ef4444' },
    ]
  },
  { 
    id: 2, title: 'Annual Day Planning', audience: 'Staff', 
    startDate: '2026-07-20', endDate: '2026-07-30', status: 'Closed', responses: 45,
    totalTarget: 60,
    analyticsData: [
      { question: 'Event Theme', Excellent: 20, Good: 15, Average: 7, Poor: 3 },
      { question: 'Venue Preference', Excellent: 18, Good: 18, Average: 6, Poor: 3 },
      { question: 'Date Preference', Excellent: 22, Good: 12, Average: 8, Poor: 3 },
    ],
    sentimentData: [
      { name: 'Satisfied', value: 78, color: '#10b981' },
      { name: 'Neutral', value: 14, color: '#f59e0b' },
      { name: 'Dissatisfied', value: 8, color: '#ef4444' },
    ]
  },
  { 
    id: 3, title: 'Canteen Food Quality', audience: 'Students', 
    startDate: '2026-08-03', endDate: '2026-08-10', status: 'Active', responses: 350,
    totalTarget: 500,
    analyticsData: [
      { question: 'Food Taste', Excellent: 120, Good: 100, Average: 80, Poor: 50 },
      { question: 'Hygiene', Excellent: 150, Good: 100, Average: 60, Poor: 40 },
      { question: 'Pricing', Excellent: 80, Good: 110, Average: 100, Poor: 60 },
      { question: 'Variety', Excellent: 100, Good: 120, Average: 80, Poor: 50 },
    ],
    sentimentData: [
      { name: 'Satisfied', value: 55, color: '#10b981' },
      { name: 'Neutral', value: 28, color: '#f59e0b' },
      { name: 'Dissatisfied', value: 17, color: '#ef4444' },
    ]
  },
];

const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#3b82f6'];

function ManageSurvey() {
  const [surveys, setSurveys] = useState(initialSurveys);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSurvey, setEditingSurvey] = useState(null);
  const [analyticsModal, setAnalyticsModal] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    audience: 'Parents',
    startDate: '',
    endDate: '',
    status: 'Active'
  });

  const filteredSurveys = surveys.filter(s => s.title.toLowerCase().includes(search.toLowerCase()));

  const handleOpenModal = (survey = null) => {
    if (survey) {
      setEditingSurvey(survey);
      setFormData(survey);
    } else {
      setEditingSurvey(null);
      setFormData({ title: '', audience: 'Parents', startDate: '', endDate: '', status: 'Active' });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingSurvey) {
      setSurveys(surveys.map(s => s.id === editingSurvey.id ? { ...s, ...formData } : s));
    } else {
      setSurveys([...surveys, {
        ...formData,
        id: Date.now(),
        responses: 0,
        totalTarget: 100,
        analyticsData: [],
        sentimentData: [
          { name: 'Satisfied', value: 0, color: '#10b981' },
          { name: 'Neutral', value: 0, color: '#f59e0b' },
          { name: 'Dissatisfied', value: 0, color: '#ef4444' },
        ]
      }]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to delete this survey?')) {
      setSurveys(surveys.filter(s => s.id !== id));
    }
  };

  const handleStatusToggle = (id) => {
    setSurveys(surveys.map(s => {
      if (s.id === id) {
        return { ...s, status: s.status === 'Active' ? 'Closed' : 'Active' };
      }
      return s;
    }));
  };

  const responseRate = (s) => s.totalTarget > 0 ? Math.round((s.responses / s.totalTarget) * 100) : 0;

  return (
    <div style={{ flex: 1, background: '#f8f9fc', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', minHeight: '100vh', boxSizing: 'border-box' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b', margin: 0 }}>Manage Survey</h1>
          <p style={{ color: '#64748b', fontSize: 14, margin: '4px 0 0' }}>Create and manage surveys for students, parents, and staff</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}
        >
          <FaPlus /> Create Survey
        </button>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        <div style={statCardStyle('#eff6ff', '#3b82f6')}>
          <FaPoll size={22} style={{ color: '#3b82f6' }} />
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#1e293b' }}>{surveys.length}</div>
            <div style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>Total Surveys</div>
          </div>
        </div>
        <div style={statCardStyle('#dcfce7', '#16a34a')}>
          <FaCheckCircle size={22} style={{ color: '#16a34a' }} />
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#1e293b' }}>{surveys.filter(s => s.status === 'Active').length}</div>
            <div style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>Active Surveys</div>
          </div>
        </div>
        <div style={statCardStyle('#fef3c7', '#d97706')}>
          <FaUsers size={22} style={{ color: '#d97706' }} />
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#1e293b' }}>{surveys.reduce((a, s) => a + s.responses, 0)}</div>
            <div style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>Total Responses</div>
          </div>
        </div>
        <div style={statCardStyle('#f3e8ff', '#7c3aed')}>
          <FaPercent size={22} style={{ color: '#7c3aed' }} />
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#1e293b' }}>
              {surveys.length > 0 ? Math.round(surveys.reduce((a, s) => a + responseRate(s), 0) / surveys.length) : 0}%
            </div>
            <div style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>Avg Response Rate</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
        
        {/* Search */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
          <div style={{ position: 'relative', width: 300 }}>
            <FaSearch style={{ position: 'absolute', left: 12, top: 12, color: '#94a3b8' }} />
            <input 
              type="text" 
              placeholder="Search surveys..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '10px 10px 10px 36px', borderRadius: 8, border: '1px solid #cbd5e1', outline: 'none', fontSize: 14, boxSizing: 'border-box' }}
            />
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f1f5f9' }}>
                <th style={thStyle}>Survey Title</th>
                <th style={thStyle}>Audience</th>
                <th style={thStyle}>Duration</th>
                <th style={thStyle}>Responses</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSurveys.map(s => (
                <tr key={s.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ ...tdStyle, fontWeight: 600, color: '#334155' }}>{s.title}</td>
                  <td style={tdStyle}>{s.audience}</td>
                  <td style={tdStyle}>
                    <div style={{ fontSize: 12 }}>
                      <span style={{ color: '#10b981', fontWeight: 600 }}>{s.startDate}</span> to <span style={{ color: '#ef4444', fontWeight: 600 }}>{s.endDate}</span>
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <div>
                      <div style={{ fontWeight: 700, color: '#1e293b' }}>{s.responses}</div>
                      <div style={{ height: 4, background: '#e2e8f0', borderRadius: 4, width: 80, marginTop: 4 }}>
                        <div style={{ height: '100%', background: '#3b82f6', borderRadius: 4, width: `${responseRate(s)}%` }} />
                      </div>
                      <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{responseRate(s)}% rate</div>
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <button 
                      onClick={() => handleStatusToggle(s.id)}
                      style={{ 
                        background: 'none', border: 'none', cursor: 'pointer',
                        padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700,
                        display: 'flex', alignItems: 'center', gap: 6,
                        backgroundColor: s.status === 'Active' ? '#dcfce7' : '#fee2e2',
                        color: s.status === 'Active' ? '#16a34a' : '#ef4444',
                      }}
                    >
                      {s.status === 'Active' ? <FaCheckCircle /> : <FaTimesCircle />}
                      {s.status}
                    </button>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', gap: 12 }}>
                      <button onClick={() => handleOpenModal(s)} style={actionBtnStyle('#3b82f6')} title="Edit"><FaEdit /></button>
                      <button onClick={() => setAnalyticsModal(s)} style={actionBtnStyle('#8b5cf6')} title="Analytics"><FaChartBar /></button>
                      <button onClick={() => handleDelete(s.id)} style={actionBtnStyle('#ef4444')} title="Delete"><FaTrash /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredSurveys.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '40px 20px', color: '#64748b' }}>No surveys found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: 32, borderRadius: 12, width: '100%', maxWidth: 500, boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <h2 style={{ margin: '0 0 24px', fontSize: 20, color: '#1e293b' }}>{editingSurvey ? 'Edit Survey' : 'Create New Survey'}</h2>
            
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={labelStyle}>Survey Title</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} style={inputStyle} placeholder="Enter survey title" />
              </div>
              <div>
                <label style={labelStyle}>Target Audience</label>
                <select value={formData.audience} onChange={e => setFormData({...formData, audience: e.target.value})} style={inputStyle}>
                  <option>Parents</option>
                  <option>Students</option>
                  <option>Staff</option>
                  <option>All</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Start Date</label>
                  <input required type="date" value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} style={inputStyle} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>End Date</label>
                  <input required type="date" value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Status</label>
                <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} style={inputStyle}>
                  <option>Active</option>
                  <option>Closed</option>
                </select>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 16 }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ background: '#f1f5f9', color: '#475569', border: 'none', padding: '10px 20px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
                <button type="submit" style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>Save Survey</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Analytics Modal */}
      {analyticsModal && (
        <div 
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}
          onClick={(e) => { if (e.target === e.currentTarget) setAnalyticsModal(null); }}
        >
          <div style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 850, maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
            
            {/* Analytics Header */}
            <div style={{ padding: '24px 28px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 12, color: '#8b5cf6', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Survey Analytics</div>
                <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#1e293b' }}>{analyticsModal.title}</h2>
                <div style={{ marginTop: 6, display: 'flex', gap: 16, fontSize: 13, color: '#64748b' }}>
                  <span>👥 {analyticsModal.audience}</span>
                  <span>📅 {analyticsModal.startDate} → {analyticsModal.endDate}</span>
                  <span style={{ 
                    padding: '2px 8px', borderRadius: 20, fontWeight: 700, fontSize: 11,
                    background: analyticsModal.status === 'Active' ? '#dcfce7' : '#fee2e2',
                    color: analyticsModal.status === 'Active' ? '#16a34a' : '#ef4444'
                  }}>{analyticsModal.status}</span>
                </div>
              </div>
              <button onClick={() => setAnalyticsModal(null)} style={{ background: '#f1f5f9', border: 'none', borderRadius: 8, width: 36, height: 36, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontSize: 16 }}>
                <FaTimes />
              </button>
            </div>

            <div style={{ padding: 28 }}>
              
              {/* Key Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 28 }}>
                <div style={{ background: '#eff6ff', borderRadius: 10, padding: '16px 20px', textAlign: 'center' }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: '#3b82f6' }}>{analyticsModal.responses}</div>
                  <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>Total Responses</div>
                </div>
                <div style={{ background: '#dcfce7', borderRadius: 10, padding: '16px 20px', textAlign: 'center' }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: '#16a34a' }}>{analyticsModal.totalTarget}</div>
                  <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>Target Audience</div>
                </div>
                <div style={{ background: '#f3e8ff', borderRadius: 10, padding: '16px 20px', textAlign: 'center' }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: '#7c3aed' }}>{responseRate(analyticsModal)}%</div>
                  <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>Response Rate</div>
                </div>
              </div>

              {/* Charts Row */}
              {analyticsModal.analyticsData && analyticsModal.analyticsData.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 24 }}>
                  
                  {/* Bar Chart - Question Breakdown */}
                  <div style={{ background: '#f8fafc', borderRadius: 10, padding: 20 }}>
                    <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 700, color: '#1e293b' }}>Question-wise Feedback</h3>
                    <div style={{ height: 260 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={analyticsModal.analyticsData} margin={{ top: 0, right: 10, left: -20, bottom: 40 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                          <XAxis dataKey="question" tick={{ fontSize: 10, fill: '#64748b' }} angle={-25} textAnchor="end" />
                          <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                          <Tooltip />
                          <Legend wrapperStyle={{ fontSize: 11 }} />
                          <Bar dataKey="Excellent" fill="#10b981" radius={[3, 3, 0, 0]} />
                          <Bar dataKey="Good" fill="#3b82f6" radius={[3, 3, 0, 0]} />
                          <Bar dataKey="Average" fill="#f59e0b" radius={[3, 3, 0, 0]} />
                          <Bar dataKey="Poor" fill="#ef4444" radius={[3, 3, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Pie Chart - Overall Sentiment */}
                  <div style={{ background: '#f8fafc', borderRadius: 10, padding: 20 }}>
                    <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 700, color: '#1e293b' }}>Overall Sentiment</h3>
                    <div style={{ height: 200 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={analyticsModal.sentimentData}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={80}
                            paddingAngle={4}
                            dataKey="value"
                          >
                            {analyticsModal.sentimentData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value}%`, '']} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    {/* Legend */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
                      {analyticsModal.sentimentData.map((d, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ width: 10, height: 10, borderRadius: '50%', background: d.color }} />
                            <span style={{ fontSize: 12, color: '#475569' }}>{d.name}</span>
                          </div>
                          <span style={{ fontSize: 12, fontWeight: 700, color: '#1e293b' }}>{d.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: '#64748b', background: '#f8fafc', borderRadius: 10 }}>
                  <FaChartBar size={32} style={{ color: '#cbd5e1', marginBottom: 12 }} />
                  <p style={{ margin: 0 }}>No analytics data available yet. Responses will appear as they come in.</p>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

const statCardStyle = (bg, color) => ({
  background: '#fff',
  borderRadius: 10,
  padding: '16px 20px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  display: 'flex',
  alignItems: 'center',
  gap: 14,
  borderLeft: `4px solid ${color}`,
});

const thStyle = { padding: '14px 16px', fontSize: 13, fontWeight: 700, color: '#475569', borderBottom: '2px solid #e2e8f0' };
const tdStyle = { padding: '16px 16px', fontSize: 14, color: '#64748b', verticalAlign: 'middle' };
const actionBtnStyle = (color) => ({ background: 'none', border: 'none', color, cursor: 'pointer', fontSize: 16, padding: 4 });
const labelStyle = { display: 'block', fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 6 };
const inputStyle = { width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #cbd5e1', outline: 'none', fontSize: 14, boxSizing: 'border-box', background: '#fff' };

export default ManageSurvey;
