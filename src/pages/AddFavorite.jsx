import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { 
  FaSearch, FaVideo, FaGripVertical, FaBus, FaUserGraduate, FaUserTie, 
  FaImages, FaBirthdayCake, FaChartPie, FaTasks, FaTable, FaBook, FaBookReader, 
  FaBookOpen, FaCalendarAlt, FaCalendarCheck, FaQuestion, FaRegCommentDots, 
  FaCalendarPlus, FaListUl, FaFileSignature, FaNetworkWired, FaEnvelope, 
  FaBullhorn, FaMobileAlt, FaEnvelopeOpenText, FaVideoSlash, FaInbox, FaUserClock, 
  FaPaperPlane, FaCircleNotch, FaUserEdit, FaStar, FaKey, FaUserCheck, FaSms, 
  FaRegEnvelope, FaPhotoVideo 
} from 'react-icons/fa';

const initialFavorites = [
  { id: 1, name: 'Transport Attendance', icon: FaBus, state: true },
  { id: 2, name: 'Students Profile', icon: FaUserGraduate, state: true },
  { id: 3, name: 'Staff Profile', icon: FaUserTie, state: true },
  { id: 4, name: 'Photo Albums', icon: FaImages, state: true },
  { id: 5, name: 'Birthday Report', icon: FaBirthdayCake, state: true },
  { id: 6, name: 'Report', icon: FaChartPie, state: true },
  { id: 7, name: 'Assignment', icon: FaTasks, state: false },
  { id: 8, name: 'Timetable', icon: FaTable, state: false },
  { id: 9, name: 'Syllabus', icon: FaBook, state: false },
  { id: 10, name: 'Library', icon: FaBookReader, state: false },
  { id: 11, name: 'e-Books', icon: FaBookOpen, state: false },
  { id: 12, name: 'Calendar', icon: FaCalendarAlt, state: false },
  { id: 13, name: 'Define Activities', icon: FaCalendarCheck, state: false },
  { id: 14, name: 'Questionnaire', icon: FaQuestion, state: false },
  { id: 15, name: 'Thoughts', icon: FaRegCommentDots, state: false },
  { id: 16, name: 'Appointment', icon: FaCalendarPlus, state: false },
  { id: 17, name: 'Task Management', icon: FaListUl, state: false },
  { id: 18, name: 'Lesson Plan', icon: FaFileSignature, state: false },
  { id: 19, name: 'Manage Survey', icon: FaNetworkWired, state: false },
  { id: 20, name: 'Survey', icon: FaNetworkWired, state: false },
  { id: 21, name: 'Compose Message', icon: FaEnvelope, state: false },
  { id: 22, name: 'School Notice', icon: FaBullhorn, state: false },
  { id: 23, name: 'Send SMS', icon: FaMobileAlt, state: false },
  { id: 24, name: 'Specified SMS', icon: FaEnvelopeOpenText, state: false },
  { id: 25, name: 'Video Albums', icon: FaVideoSlash, state: false },
  { id: 26, name: 'Class Notice', icon: FaBullhorn, state: false },
  { id: 27, name: 'Inbox', icon: FaInbox, state: false },
  { id: 28, name: 'Staff Leave', icon: FaUserClock, state: false },
  { id: 29, name: 'Staff Notice', icon: FaBullhorn, state: false },
  { id: 30, name: 'Sent Messages', icon: FaPaperPlane, state: false },
  { id: 31, name: 'Circular', icon: FaCircleNotch, state: false },
  { id: 32, name: 'Leave Requests', icon: FaUserEdit, state: false },
  { id: 33, name: 'Favorites', icon: FaStar, state: false },
  { id: 34, name: 'Send Credentials', icon: FaKey, state: false },
  { id: 35, name: 'Staff Attendance', icon: FaUserCheck, state: false },
  { id: 36, name: 'Text To Number', icon: FaSms, state: false },
  { id: 37, name: 'Specified Message', icon: FaRegEnvelope, state: false },
  { id: 38, name: 'Media Gallery', icon: FaPhotoVideo, state: false },
  { id: 39, name: 'Create Circular', icon: FaCircleNotch, state: false },
  { id: 40, name: 'Class Teacher', icon: FaUserTie, state: false },
  { id: 41, name: 'Attendance Report', icon: FaFileSignature, state: false },
  { id: 42, name: 'Missing Attendance', icon: FaUserClock, state: false },
  { id: 43, name: 'Average Attendance Analysis', icon: FaChartPie, state: false },
  { id: 44, name: 'Teachers\' Workload', icon: FaTasks, state: false },
  { id: 45, name: 'Conversation', icon: FaRegCommentDots, state: false },
  { id: 46, name: 'Question Paper', icon: FaFileSignature, state: false },
  { id: 47, name: 'Observation Entry', icon: FaListUl, state: false },
  { id: 48, name: 'My Attendance', icon: FaUserCheck, state: false },
  { id: 49, name: 'Observation Report', icon: FaChartPie, state: false },
  { id: 50, name: 'App Message Uses', icon: FaMobileAlt, state: false },
  { id: 51, name: 'My Leave', icon: FaUserClock, state: false },
  { id: 52, name: 'Payslip', icon: FaFileSignature, state: false },
  { id: 53, name: 'Appreciation', icon: FaStar, state: false },
  { id: 54, name: 'Infraction', icon: FaQuestion, state: false },
  { id: 55, name: 'Add Question', icon: FaQuestion, state: false },
  { id: 56, name: 'Statistical Report', icon: FaChartPie, state: false },
  { id: 57, name: 'App Users', icon: FaNetworkWired, state: false },
  { id: 58, name: 'Survey Report', icon: FaChartPie, state: false },
  { id: 59, name: 'Undertaking Acknowledgement', icon: FaFileSignature, state: false },
  { id: 60, name: 'Class Promotion', icon: FaUserGraduate, state: false },
  { id: 61, name: 'Attendance Summary', icon: FaUserCheck, state: false },
  { id: 62, name: 'Define Infraction', icon: FaQuestion, state: false },
  { id: 63, name: 'Define Appreciation', icon: FaStar, state: false },
  { id: 64, name: 'Define Rewards', icon: FaStar, state: false },
  { id: 65, name: 'Define Consequences', icon: FaQuestion, state: false },
  { id: 66, name: 'Mark Attendance', icon: FaUserCheck, state: false },
  { id: 67, name: 'Consumption', icon: FaChartPie, state: false },
  { id: 68, name: 'Manage Roll Number', icon: FaListUl, state: false },
  { id: 69, name: 'Assign House', icon: FaListUl, state: false },
  { id: 70, name: 'Recharge Log', icon: FaFileSignature, state: false },
  { id: 71, name: 'Modify Leave Attendance', icon: FaUserCheck, state: false },
  { id: 72, name: 'Infraction for Student', icon: FaQuestion, state: false },
  { id: 73, name: 'Add to Student', icon: FaUserGraduate, state: false },
  { id: 74, name: 'Appreciation Report', icon: FaChartPie, state: false },
  { id: 75, name: 'Absentee SMS', icon: FaMobileAlt, state: false },
  { id: 76, name: 'Infraction for Staff', icon: FaQuestion, state: false },
  { id: 77, name: 'Upload Student Photo', icon: FaImages, state: false },
  { id: 78, name: 'SMS Uses', icon: FaMobileAlt, state: false },
  { id: 79, name: 'Add to Staff', icon: FaUserTie, state: false },
  { id: 80, name: 'Infraction Report', icon: FaChartPie, state: false },
  { id: 81, name: 'Assign Club', icon: FaListUl, state: false },
  { id: 82, name: 'My Infraction', icon: FaQuestion, state: false },
];

function AddFavorite() {
  const [favorites, setFavorites] = useState(initialFavorites);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/favorites`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        // data is an array of strings (names of favorites)
        setFavorites(initialFavorites.map(item => ({
          ...item,
          state: data.includes(item.name)
        })));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      const activeFavorites = favorites.filter(f => f.state).map(f => f.name);
      
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/favorites`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ favorites: activeFavorites })
      });
      if (res.ok) {
        toast.success("Favorites updated successfully!");
      } else {
        toast.error("Failed to update favorites");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating favorites");
    }
  };

  const toggleState = (id) => {
    setFavorites(favorites.map(item => 
      item.id === id ? { ...item, state: !item.state } : item
    ));
  };

  const filteredFavorites = favorites.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Header Bar */}
      <div style={{ padding: '24px 32px 0 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>Add Favorites Menu</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#22c55e', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
          Video Tutorial <FaVideo />
        </div>
      </div>

      <div style={{ padding: '24px 32px', overflowY: 'auto', flex: 1 }}>
        <div style={{ background: '#fff', borderRadius: 8, padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          
          {/* Search and Update Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div style={{ position: 'relative', width: 300 }}>
              <FaSearch style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input 
                type="text" 
                placeholder="Search" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ 
                  width: '100%', border: '1px solid #e2e8f0', background: '#f8fafc', borderRadius: 4, 
                  padding: '10px 12px 10px 36px', fontSize: 14, color: '#334155', outline: 'none' 
                }}
              />
            </div>
            <button onClick={handleUpdate} style={{ 
              background: '#4ade80', color: '#fff', border: 'none', borderRadius: 4, 
              padding: '10px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer' 
            }}>
              Update
            </button>
          </div>

          {/* List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filteredFavorites.map((item) => (
              <div key={item.id} style={{ 
                display: 'flex', alignItems: 'center', border: '1px solid #e2e8f0', borderRadius: 4, overflow: 'hidden' 
              }}>
                {/* Drag Handle */}
                <div style={{ width: 36, display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#4ade80', color: '#fff', alignSelf: 'stretch' }}>
                  <FaGripVertical />
                </div>
                
                {/* Icon Box */}
                <div style={{ width: 40, display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0 10px 10px', background: '#94a3b8', color: '#fff', borderRadius: 4, padding: '8px 0' }}>
                  <item.icon style={{ fontSize: 16 }} />
                </div>
                
                {/* Name */}
                <div style={{ flex: 1, padding: '0 16px', fontSize: 14, color: '#334155', fontWeight: 500 }}>
                  {item.name}
                </div>

                {/* Toggle */}
                <div style={{ padding: '0 16px' }}>
                  <div 
                    onClick={() => toggleState(item.id)}
                    style={{ 
                      width: 50, height: 24, borderRadius: 12, background: item.state ? '#4ade80' : '#e2e8f0', 
                      position: 'relative', cursor: 'pointer', transition: 'all 0.3s' 
                    }}
                  >
                    <div style={{ 
                      position: 'absolute', top: 2, left: item.state ? 28 : 2, width: 20, height: 20, 
                      borderRadius: '50%', background: '#fff', transition: 'all 0.3s' 
                    }}></div>
                    <span style={{ 
                      position: 'absolute', top: '50%', transform: 'translateY(-50%)', 
                      left: item.state ? 8 : 26, fontSize: 10, fontWeight: 700, 
                      color: item.state ? '#fff' : '#94a3b8' 
                    }}>
                      {item.state ? 'ON' : 'OFF'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        <div style={{ textAlign: 'center', marginTop: 40, paddingBottom: 20, fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>
          COPYRIGHT © 2026 FRANCISCAN
        </div>
      </div>
    </div>
  );
}

export default AddFavorite;
