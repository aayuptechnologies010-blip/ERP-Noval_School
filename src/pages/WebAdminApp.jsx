import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  FaImages, FaVideo, FaBell, FaTrophy,
  FaCamera, FaPlay, FaFilm, FaChild,
  FaCalendarAlt, FaRunning, FaRss, FaComments,
  FaBars, FaSearch, FaDesktop, FaGlobe, FaBook, FaCommentDots, FaArrowLeft, FaAngleUp,
  FaThLarge, FaEnvelope, FaRegClock, FaHourglassHalf, FaFileAlt, FaStar, FaAngleRight, FaAngleDown, FaListOl,
  FaTh, FaHome, FaUserTie, FaFileUpload, FaCertificate, FaPen, FaGraduationCap, FaFutbol, FaQuoteLeft, FaEdit, FaUser,
  FaSyncAlt
} from 'react-icons/fa';
import WebAdminPhotoAlbums from './WebAdminPhotoAlbums';
import WebAdminVideoAlbums from './WebAdminVideoAlbums';
import WebAdminNotices from './WebAdminNotices';
import WebAdminAchievements from './WebAdminAchievements';
import WebAdminMediaAlbums from './WebAdminMediaAlbums';
import WebAdminKidsAlbums from './WebAdminKidsAlbums';
import WebAdminEvents from './WebAdminEvents';
import WebAdminSports from './WebAdminSports';
import WebAdminBlogs from './WebAdminBlogs';
import WebAdminGuestbook from './WebAdminGuestbook';
import WebAdminLFDLetterhead from './WebAdminLFDLetterhead';
import WebAdminLFDNoticeDisplayTime from './WebAdminLFDNoticeDisplayTime';
import WebAdminLFDDisplayTime from './WebAdminLFDDisplayTime';
import WebAdminLFDNotice from './WebAdminLFDNotice';
import WebAdminLFDNoticeOrder from './WebAdminLFDNoticeOrder';
import WebAdminLFDAchievement from './WebAdminLFDAchievement';
import WebAdminLFDFlyer from './WebAdminLFDFlyer';
import WebAdminLFDToppers from './WebAdminLFDToppers';
import WebAdminLFDAlbum from './WebAdminLFDAlbum';
import WebAdminMagazine from './WebAdminMagazine';
import WebAdminHomepageSlider from './WebAdminHomepageSlider';
import WebAdminCareer from './WebAdminCareer';
import WebAdminUploadTC from './WebAdminUploadTC';
import WebAdminHolidayHomework from './WebAdminHolidayHomework';
import WebAdminBlog from './WebAdminBlog';
import WebAdminWebsiteToppers from './WebAdminWebsiteToppers';
import WebAdminPhotosOnHomepage from './WebAdminPhotosOnHomepage';
import WebAdminWebsiteThoughts from './WebAdminWebsiteThoughts';
import WebAdminMandatoryDisclosure from './WebAdminMandatoryDisclosure';
import WebAdminStaffVisibility from './WebAdminStaffVisibility';
import WebAdminEBulletin from './WebAdminEBulletin';
import WebAdminEDiary from './WebAdminEDiary';
import WebAdminFeedbackSubjectClass from './WebAdminFeedbackSubjectClass';
import WebAdminFeedbackSubjectTeacher from './WebAdminFeedbackSubjectTeacher';
import WebAdminFeedbackQuestionMaster from './WebAdminFeedbackQuestionMaster';
import WebAdminFeedbackTemplate from './WebAdminFeedbackTemplate';
import logo from '../assets/logo.png';

class LocalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-10 text-red-500 font-bold text-xl bg-white min-h-screen">
          APP CRASH: {this.state.error.message} <br /><br /> {this.state.error.stack}
        </div>
      );
    }
    return this.props.children;
  }
}

export default function WebAdminAppWrapper() {
  return (
    <LocalErrorBoundary>
      <WebAdminApp />
    </LocalErrorBoundary>
  );
}

function WebAdminApp() {
  const navigate = useNavigate();
  const location = useLocation();

  // Detect base URL path: /web-admin or /webadmin
  const basePath = location.pathname.startsWith('/webadmin') ? '/webadmin' : '/web-admin';

  // Extract current view from URL route
  // e.g. "/web-admin/photo-albums" -> "photo-albums"
  // e.g. "/web-admin" -> "dashboard"
  const rawSubpath = location.pathname
    .replace(/^\/(web-admin|webadmin)\/?/, '')
    .split('/')[0]
    .trim()
    .toLowerCase();

  const currentView = rawSubpath || 'dashboard';

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState('Website');
  const [stats, setStats] = useState({
    photoAlbums: 0,
    videoAlbums: 0,
    notices: 0,
    achievements: 0,
    mediaAlbums: 0,
    kidsAlbums: 0,
    events: 0,
    sports: 0,
    blogs: 0,
    guestbook: 0
  });
  const [loadingStats, setLoadingStats] = useState(false);

  // Auto-expand appropriate accordion based on active URL
  useEffect(() => {
    if (currentView.startsWith('lfd-')) {
      setExpandedMenu('LFD');
    } else if (currentView.startsWith('feedback-')) {
      setExpandedMenu('Feedback');
    } else if (currentView.startsWith('e-diar')) {
      setExpandedMenu('e-Diary');
    } else if (currentView !== 'dashboard') {
      setExpandedMenu('Website');
    }
  }, [currentView]);

  const navigateToView = (viewKey) => {
    if (!viewKey || viewKey === 'dashboard') {
      navigate(basePath);
    } else {
      navigate(`${basePath}/${viewKey}`);
    }
  };

  const fetchStats = async () => {
    setLoadingStats(true);
    try {
      const res = await fetch('http://localhost:5005/api/web-admin/dashboard-stats');
      const data = await res.json();
      if (data.success && data.data) {
        setStats(data.data);
      }
    } catch (err) {
      console.error('Error fetching Web Admin stats:', err);
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="flex h-screen w-full bg-[#f4f5f7] font-sans overflow-hidden">

      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 bg-white border-r border-gray-200 flex flex-col flex-shrink-0 overflow-hidden`}>
        {/* Logo area */}
        <div 
          className="h-16 flex items-center px-4 border-b border-gray-200 gap-2 cursor-pointer" 
          onClick={() => navigateToView('dashboard')}
        >
          <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-white font-bold text-xl">
            F
          </div>
          <div className="font-bold text-red-600 tracking-wider text-sm flex flex-col leading-none">
            <span>FRANCISCAN</span>
          </div>
        </div>

        {/* Menu */}
        <div className="p-4 flex-1 overflow-y-auto">
          <div className="text-xs text-gray-400 font-semibold mb-2 px-2 uppercase tracking-wider">Main Menu</div>
          <div className="flex flex-col gap-1">
            <div
              className={`flex items-center gap-3 px-3 py-2.5 rounded cursor-pointer transition ${currentView === 'dashboard' ? 'bg-[#6d5cae] text-white shadow-xs' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => navigateToView('dashboard')}
            >
              <FaThLarge className={`text-sm ${currentView === 'dashboard' ? 'text-white' : 'text-gray-400'}`} />
              <span className="text-sm font-medium">Dashboard</span>
            </div>

            {/* LFD Accordion */}
            <div className="flex flex-col">
              <div
                className={`flex items-center justify-between px-3 py-2.5 cursor-pointer transition-colors ${expandedMenu === 'LFD' ? 'bg-[#0d6efd] text-white rounded-t shadow-sm z-10' : 'text-gray-600 hover:bg-gray-50 rounded'}`}
                onClick={() => setExpandedMenu(expandedMenu === 'LFD' ? '' : 'LFD')}
              >
                <div className="flex items-center gap-3">
                  <FaDesktop className={`text-sm ${expandedMenu === 'LFD' ? 'text-white' : 'text-gray-400'}`} />
                  <span className="text-sm font-medium">LFD</span>
                </div>
                <FaAngleDown className={`text-xs transition-transform ${expandedMenu === 'LFD' ? 'text-white rotate-180' : 'text-gray-400 -rotate-90'}`} />
              </div>

              {expandedMenu === 'LFD' && (
                <div className="flex flex-col bg-white rounded-b shadow-sm mb-1 pb-1">
                  <div
                    className={`flex items-center gap-3 px-4 py-2 cursor-pointer ${currentView === 'lfd-letterhead' ? 'bg-gray-100 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                    onClick={() => navigateToView('lfd-letterhead')}
                  >
                    <FaEnvelope className={`text-xs ${currentView === 'lfd-letterhead' ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className="text-xs font-medium">LFD Letterhead</span>
                  </div>
                  <div
                    className={`flex items-center gap-3 px-4 py-2 cursor-pointer ${currentView === 'lfd-notice-display-time' ? 'bg-gray-100 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                    onClick={() => navigateToView('lfd-notice-display-time')}
                  >
                    <FaRegClock className={`text-xs ${currentView === 'lfd-notice-display-time' ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className="text-xs font-medium">LFD Notice Display Time & Order</span>
                  </div>
                  <div
                    className={`flex items-center gap-3 px-4 py-2 cursor-pointer ${currentView === 'lfd-display-time' ? 'bg-gray-100 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                    onClick={() => navigateToView('lfd-display-time')}
                  >
                    <FaHourglassHalf className={`text-xs ${currentView === 'lfd-display-time' ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className="text-xs font-medium">LFD Display Time</span>
                  </div>
                  <div
                    className={`flex items-center gap-3 px-4 py-2 cursor-pointer ${currentView === 'lfd-notice' ? 'bg-gray-100 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                    onClick={() => navigateToView('lfd-notice')}
                  >
                    <FaBell className={`text-xs ${currentView === 'lfd-notice' ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className="text-xs font-medium">LFD Notice</span>
                  </div>
                  <div
                    className={`flex items-center gap-3 px-4 py-2 cursor-pointer ${currentView === 'lfd-notice-order' ? 'bg-gray-100 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                    onClick={() => navigateToView('lfd-notice-order')}
                  >
                    <FaListOl className={`text-xs ${currentView === 'lfd-notice-order' ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className="text-xs font-medium">LFD Notice Order</span>
                  </div>
                  <div
                    className={`flex items-center gap-3 px-4 py-2 cursor-pointer ${currentView === 'lfd-achievement' ? 'bg-gray-100 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                    onClick={() => navigateToView('lfd-achievement')}
                  >
                    <FaTrophy className={`text-xs ${currentView === 'lfd-achievement' ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className="text-xs font-medium">LFD Achievement</span>
                  </div>
                  <div
                    className={`flex items-center gap-3 px-4 py-2 cursor-pointer ${currentView === 'lfd-flyer' ? 'bg-gray-100 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                    onClick={() => navigateToView('lfd-flyer')}
                  >
                    <FaFileAlt className={`text-xs ${currentView === 'lfd-flyer' ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className="text-xs font-medium">LFD Flyer</span>
                  </div>
                  <div
                    className={`flex items-center gap-3 px-4 py-2 cursor-pointer ${currentView === 'lfd-toppers' ? 'bg-gray-100 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                    onClick={() => navigateToView('lfd-toppers')}
                  >
                    <FaStar className={`text-xs ${currentView === 'lfd-toppers' ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className="text-xs font-medium">LFD Toppers</span>
                  </div>
                  <div
                    className={`flex items-center gap-3 px-4 py-2 cursor-pointer ${currentView === 'lfd-album' ? 'bg-gray-100 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                    onClick={() => navigateToView('lfd-album')}
                  >
                    <FaImages className={`text-xs ${currentView === 'lfd-album' ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className="text-xs font-medium">LFD Album</span>
                  </div>
                </div>
              )}
            </div>

            {/* Website Accordion */}
            <div className="flex flex-col">
              <div
                className={`flex items-center justify-between px-3 py-2.5 cursor-pointer transition-colors ${expandedMenu === 'Website' ? 'bg-[#0d6efd] text-white rounded-t shadow-sm z-10' : 'text-gray-600 hover:bg-gray-50 rounded'}`}
                onClick={() => setExpandedMenu(expandedMenu === 'Website' ? '' : 'Website')}
              >
                <div className="flex items-center gap-3">
                  <FaGlobe className={`text-sm ${expandedMenu === 'Website' ? 'text-white' : 'text-gray-400'}`} />
                  <span className="text-sm font-medium">Website</span>
                </div>
                <FaAngleDown className={`text-xs transition-transform ${expandedMenu === 'Website' ? 'text-white rotate-180' : 'text-gray-400 -rotate-90'}`} />
              </div>

              {expandedMenu === 'Website' && (
                <div className="flex flex-col bg-white rounded-b shadow-sm mb-1 pb-1">
                  <div
                    className={`flex items-center gap-3 px-4 py-2 cursor-pointer ${currentView === 'photo-albums' ? 'bg-gray-100 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                    onClick={() => navigateToView('photo-albums')}
                  >
                    <FaCamera className={`text-xs ${currentView === 'photo-albums' ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className="text-xs font-medium">Photo Gallery</span>
                  </div>
                  <div
                    className={`flex items-center gap-3 px-4 py-2 cursor-pointer ${currentView === 'video-albums' ? 'bg-gray-100 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                    onClick={() => navigateToView('video-albums')}
                  >
                    <FaVideo className={`text-xs ${currentView === 'video-albums' ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className="text-xs font-medium">Video Gallery</span>
                  </div>
                  <div
                    className={`flex items-center gap-3 px-4 py-2 cursor-pointer ${currentView === 'media-albums' ? 'bg-gray-100 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                    onClick={() => navigateToView('media-albums')}
                  >
                    <FaFilm className={`text-xs ${currentView === 'media-albums' ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className="text-xs font-medium">Media Gallery</span>
                  </div>
                  <div
                    className={`flex items-center gap-3 px-4 py-2 cursor-pointer ${currentView === 'achievements' ? 'bg-gray-100 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                    onClick={() => navigateToView('achievements')}
                  >
                    <FaTrophy className={`text-xs ${currentView === 'achievements' ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className="text-xs font-medium">Achievements</span>
                  </div>
                  <div
                    className={`flex items-center gap-3 px-4 py-2 cursor-pointer ${currentView === 'notices' ? 'bg-gray-100 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                    onClick={() => navigateToView('notices')}
                  >
                    <FaBell className={`text-xs ${currentView === 'notices' ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className="text-xs font-medium">Notice</span>
                  </div>
                  <div
                    className={`flex items-center gap-3 px-4 py-2 cursor-pointer ${currentView === 'events' ? 'bg-gray-100 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                    onClick={() => navigateToView('events')}
                  >
                    <FaCalendarAlt className={`text-xs ${currentView === 'events' ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className="text-xs font-medium">Events</span>
                  </div>
                  <div
                    className={`flex items-center gap-3 px-4 py-2 cursor-pointer ${currentView === 'sports' ? 'bg-gray-100 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                    onClick={() => navigateToView('sports')}
                  >
                    <FaFutbol className={`text-xs ${currentView === 'sports' ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className="text-xs font-medium">Sports</span>
                  </div>
                  <div
                    className={`flex items-center gap-3 px-4 py-2 cursor-pointer ${currentView === 'magazine' ? 'bg-gray-100 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                    onClick={() => navigateToView('magazine')}
                  >
                    <FaTh className={`text-xs ${currentView === 'magazine' ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className="text-xs font-medium">Magazine</span>
                  </div>
                  <div
                    className={`flex items-center gap-3 px-4 py-2 cursor-pointer ${currentView === 'kids-corner' ? 'bg-gray-100 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                    onClick={() => navigateToView('kids-corner')}
                  >
                    <FaChild className={`text-xs ${currentView === 'kids-corner' ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className="text-xs font-medium">KidsCorner</span>
                  </div>
                  <div
                    className={`flex items-center gap-3 px-4 py-2 cursor-pointer ${currentView === 'homepage-main-slider' ? 'bg-gray-100 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                    onClick={() => navigateToView('homepage-main-slider')}
                  >
                    <FaHome className={`text-xs ${currentView === 'homepage-main-slider' ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className="text-xs font-medium">Homepage Main Slider</span>
                  </div>
                  <div
                    className={`flex items-center gap-3 px-4 py-2 cursor-pointer ${currentView === 'career' ? 'bg-gray-100 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                    onClick={() => navigateToView('career')}
                  >
                    <FaUserTie className={`text-xs ${currentView === 'career' ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className="text-xs font-medium">Career</span>
                  </div>
                  <div
                    className={`flex items-center gap-3 px-4 py-2 cursor-pointer ${currentView === 'upload-tc' ? 'bg-gray-100 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                    onClick={() => navigateToView('upload-tc')}
                  >
                    <FaFileAlt className={`text-xs ${currentView === 'upload-tc' ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className="text-xs font-medium">Upload TC</span>
                  </div>
                  <div
                    className={`flex items-center gap-3 px-4 py-2 cursor-pointer ${currentView === 'holiday-homework' ? 'bg-gray-100 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                    onClick={() => navigateToView('holiday-homework')}
                  >
                    <FaHome className={`text-xs ${currentView === 'holiday-homework' ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className="text-xs font-medium">Holiday Homework</span>
                  </div>
                  <div
                    className={`flex items-center gap-3 px-4 py-2 cursor-pointer ${currentView === 'blogs' || currentView === 'blog' ? 'bg-gray-100 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                    onClick={() => navigateToView('blogs')}
                  >
                    <FaPen className={`text-xs ${currentView === 'blogs' || currentView === 'blog' ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className="text-xs font-medium">Blog</span>
                  </div>
                  <div
                    className={`flex items-center gap-3 px-4 py-2 cursor-pointer ${currentView === 'website-toppers' ? 'bg-gray-100 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                    onClick={() => navigateToView('website-toppers')}
                  >
                    <FaGraduationCap className={`text-xs ${currentView === 'website-toppers' ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className="text-xs font-medium">Toppers</span>
                  </div>
                  <div
                    className={`flex items-center gap-3 px-4 py-2 cursor-pointer ${currentView === 'photos-homepage' ? 'bg-gray-100 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                    onClick={() => navigateToView('photos-homepage')}
                  >
                    <FaCamera className={`text-xs ${currentView === 'photos-homepage' ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className="text-xs font-medium">Photos on Homepage</span>
                  </div>
                  <div
                    className={`flex items-center gap-3 px-4 py-2 cursor-pointer ${currentView === 'website-thoughts' ? 'bg-gray-100 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                    onClick={() => navigateToView('website-thoughts')}
                  >
                    <FaQuoteLeft className={`text-xs ${currentView === 'website-thoughts' ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className="text-xs font-medium">Website Thoughts</span>
                  </div>
                  <div
                    className={`flex items-center gap-3 px-4 py-2 cursor-pointer ${currentView === 'guestbook' || currentView === 'guest-book' ? 'bg-gray-100 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                    onClick={() => navigateToView('guestbook')}
                  >
                    <FaBook className={`text-xs ${currentView === 'guestbook' || currentView === 'guest-book' ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className="text-xs font-medium">Guest Book</span>
                  </div>
                  <div
                    className={`flex items-center gap-3 px-4 py-2 cursor-pointer ${currentView === 'mandatory-disclosure' ? 'bg-gray-100 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                    onClick={() => navigateToView('mandatory-disclosure')}
                  >
                    <FaEdit className={`text-xs ${currentView === 'mandatory-disclosure' ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className="text-xs font-medium">Mandatory Public Disclosure</span>
                  </div>
                  <div
                    className={`flex items-center gap-3 px-4 py-2 cursor-pointer ${currentView === 'staff-visibility' ? 'bg-gray-100 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                    onClick={() => navigateToView('staff-visibility')}
                  >
                    <FaUser className={`text-xs ${currentView === 'staff-visibility' ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className="text-xs font-medium">Manage Staff Visibility</span>
                  </div>
                  <div
                    className={`flex items-center gap-3 px-4 py-2 cursor-pointer ${currentView === 'e-bulletin' ? 'bg-gray-100 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                    onClick={() => navigateToView('e-bulletin')}
                  >
                    <FaEnvelope className={`text-xs ${currentView === 'e-bulletin' ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className="text-xs font-medium">E-Bulletin</span>
                  </div>
                </div>
              )}
            </div>

            {/* e-Diary Accordion */}
            <div className="flex flex-col">
              <div
                className={`flex items-center justify-between px-3 py-2.5 cursor-pointer transition-colors ${expandedMenu === 'e-Diary' ? 'bg-[#0d6efd] text-white rounded-t shadow-sm z-10' : 'text-gray-600 hover:bg-gray-50 rounded'}`}
                onClick={() => setExpandedMenu(expandedMenu === 'e-Diary' ? '' : 'e-Diary')}
              >
                <div className="flex items-center gap-3">
                  <FaBook className={`text-sm ${expandedMenu === 'e-Diary' ? 'text-white' : 'text-gray-400'}`} />
                  <span className="text-sm font-medium">e-Diary</span>
                </div>
                <FaAngleDown className={`text-xs transition-transform ${expandedMenu === 'e-Diary' ? 'text-white rotate-180' : 'text-gray-400 -rotate-90'}`} />
              </div>

              {expandedMenu === 'e-Diary' && (
                <div className="flex flex-col bg-white rounded-b shadow-sm mb-1 pb-1">
                  <div
                    className={`flex items-center gap-3 px-4 py-2 cursor-pointer ${currentView === 'e-diaries' ? 'bg-gray-100 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                    onClick={() => navigateToView('e-diaries')}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 ml-1"></div>
                    <span className="text-xs font-medium">e-Diaries</span>
                  </div>
                </div>
              )}
            </div>

            {/* Feedback Accordion */}
            <div className="flex flex-col">
              <div
                className={`flex items-center justify-between px-3 py-2.5 cursor-pointer transition-colors ${expandedMenu === 'Feedback' ? 'bg-[#0d6efd] text-white rounded-t shadow-sm z-10' : 'text-gray-600 hover:bg-gray-50 rounded'}`}
                onClick={() => setExpandedMenu(expandedMenu === 'Feedback' ? '' : 'Feedback')}
              >
                <div className="flex items-center gap-3">
                  <FaCommentDots className={`text-sm ${expandedMenu === 'Feedback' ? 'text-white' : 'text-gray-400'}`} />
                  <span className="text-sm font-medium">Feedback</span>
                </div>
                <FaAngleDown className={`text-xs transition-transform ${expandedMenu === 'Feedback' ? 'text-white rotate-180' : 'text-gray-400 -rotate-90'}`} />
              </div>

              {expandedMenu === 'Feedback' && (
                <div className="flex flex-col bg-white rounded-b shadow-sm mb-1 pb-1">
                  <div
                    className={`flex items-center gap-3 px-4 py-2 cursor-pointer ${currentView === 'feedback-subject-class' ? 'bg-gray-100 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                    onClick={() => navigateToView('feedback-subject-class')}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 ml-1"></div>
                    <span className="text-xs font-medium">Relate Subject to Class</span>
                  </div>
                  <div
                    className={`flex items-center gap-3 px-4 py-2 cursor-pointer ${currentView === 'feedback-subject-teacher' ? 'bg-gray-100 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                    onClick={() => navigateToView('feedback-subject-teacher')}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 ml-1"></div>
                    <span className="text-xs font-medium">Relate Subject to Teacher</span>
                  </div>
                  <div
                    className={`flex items-center gap-3 px-4 py-2 cursor-pointer ${currentView === 'feedback-question-master' ? 'bg-gray-100 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                    onClick={() => navigateToView('feedback-question-master')}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 ml-1"></div>
                    <span className="text-xs font-medium">Question Master</span>
                  </div>
                  <div
                    className={`flex items-center gap-3 px-4 py-2 cursor-pointer ${currentView === 'feedback-template' ? 'bg-gray-100 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                    onClick={() => navigateToView('feedback-template')}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 ml-1"></div>
                    <span className="text-xs font-medium">Feedback Template</span>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top Navbar */}
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0 relative z-10 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#5966c5] text-white hover:bg-[#4b55a3] shadow-sm transition cursor-pointer"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              title="Toggle Sidebar"
            >
              <FaBars className="text-lg" />
            </button>
            {currentView !== 'dashboard' && (
              <button
                onClick={() => navigateToView('dashboard')}
                className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xs font-bold cursor-pointer transition shadow-xs border border-gray-200"
                title="Back to Web Admin Dashboard"
              >
                <FaArrowLeft className="text-xs text-[#5966c5]" /> Back to Dashboard
              </button>
            )}
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-1.5 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-bold cursor-pointer transition shadow-xs border border-blue-200"
              title="Return to Main ERP Dashboard"
            >
              <FaHome className="text-xs" /> Main ERP
            </button>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center bg-[#f4f5f7] rounded-full overflow-hidden w-80 h-10 px-4">
              <input type="text" placeholder="Search menus..." className="bg-transparent border-none outline-none text-sm w-full text-gray-600" />
              <button className="text-gray-400 hover:text-gray-600"><FaSearch className="text-sm" /></button>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center bg-white rounded-full border border-blue-200 px-4 py-2 h-10 cursor-pointer shadow-sm hover:shadow transition">
                <FaCalendarAlt className="text-[#5966c5] mr-2 text-sm" />
                <span className="text-xs text-gray-600 mr-2">Academic Year:</span>
                <span className="text-xs font-bold text-[#5966c5]">2026-2027</span>
              </div>
            </div>

            <div className="relative pl-2">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden cursor-pointer shadow-sm border border-gray-200">
                  <img src={logo} alt="User" className="w-full h-full object-contain bg-white" />
                </div>
                <FaAngleUp className={`text-gray-400 text-xs transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
              </div>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 top-12 w-48 bg-white rounded shadow-lg border border-gray-100 z-50 flex flex-col">
                  <div className="flex items-center gap-3 p-3 border-b border-gray-100">
                    <img src={logo} alt="Profile" className="w-8 h-8 rounded-full border border-gray-200 object-contain p-0.5" />
                    <div className="flex flex-col leading-tight">
                      <span className="text-sm font-bold text-gray-900 uppercase">NNADOH</span>
                      <span className="text-xs text-gray-500">Administrator</span>
                    </div>
                  </div>
                  <div
                    className="p-3 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer transition"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Universal Sub-view Navigation Bar */}
        {currentView !== 'dashboard' && (
          <div className="bg-white border-b border-gray-200 px-6 py-2.5 flex items-center justify-between shrink-0 shadow-xs z-10">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigateToView('dashboard')}
                className="flex items-center gap-2 px-3.5 py-1.5 bg-[#5966c5] hover:bg-[#47529f] text-white rounded-md text-xs font-bold shadow-xs cursor-pointer transition"
              >
                <FaArrowLeft className="text-[11px]" /> Back to Dashboard
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-xs font-semibold cursor-pointer transition border border-gray-200"
              >
                <FaHome className="text-xs text-gray-600" /> Back to Main ERP
              </button>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
              <span
                onClick={() => navigateToView('dashboard')}
                className="cursor-pointer text-[#5966c5] hover:underline font-semibold"
              >
                Dashboard
              </span>
              <span>&gt;</span>
              <span className="text-gray-800 font-bold capitalize">
                {currentView.replace(/-/g, ' ')}
              </span>
            </div>
          </div>
        )}

        {/* Dashboard Content */}
        {currentView === 'dashboard' ? (
          <div className="flex-1 overflow-y-auto p-6">

            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold text-[#1f2937]">Website Management Dashboard</h1>
                <button
                  onClick={fetchStats}
                  disabled={loadingStats}
                  className="flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 text-gray-600 rounded text-xs font-semibold hover:bg-gray-50 shadow-xs cursor-pointer transition disabled:opacity-50"
                  title="Reload live counts from backend"
                >
                  <FaSyncAlt className={`text-xs text-[#5966c5] ${loadingStats ? 'animate-spin' : ''}`} />
                  <span>{loadingStats ? 'Refreshing...' : 'Refresh'}</span>
                </button>
              </div>
              <div className="text-xs text-gray-500 font-medium">
                Home <span className="mx-1">&gt;</span> Dashboard
              </div>
            </div>

            {/* Top Cards */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div
                className="bg-white rounded-lg p-5 flex justify-between items-center shadow-sm border border-gray-100 cursor-pointer hover:shadow transition"
                onClick={() => navigateToView('photo-albums')}
              >
                <div>
                  <div className="text-xs text-gray-400 mb-1">Photo Albums</div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">{loadingStats ? '...' : (stats.photoAlbums ?? 0)}</div>
                  <div className="text-xs text-gray-400">Total Albums</div>
                </div>
                <div className="w-14 h-14 rounded-xl bg-[#eef2fa] text-[#4a81d4] flex justify-center items-center text-3xl">
                  <FaImages />
                </div>
              </div>
              <div
                className="bg-white rounded-lg p-5 flex justify-between items-center shadow-sm border border-gray-100 cursor-pointer hover:shadow transition"
                onClick={() => navigateToView('video-albums')}
              >
                <div>
                  <div className="text-xs text-gray-400 mb-1">Video Albums</div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">{loadingStats ? '...' : (stats.videoAlbums ?? 0)}</div>
                  <div className="text-xs text-gray-400">Video Content</div>
                </div>
                <div className="w-14 h-14 rounded-xl bg-[#eef8ef] text-[#31b131] flex justify-center items-center text-3xl">
                  <FaVideo />
                </div>
              </div>
              <div
                className="bg-white rounded-lg p-5 flex justify-between items-center shadow-sm border border-gray-100 cursor-pointer hover:shadow transition"
                onClick={() => navigateToView('notices')}
              >
                <div>
                  <div className="text-xs text-gray-400 mb-1">Active Notices</div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">{loadingStats ? '...' : (stats.notices ?? 0)}</div>
                  <div className="text-xs text-gray-400">Published</div>
                </div>
                <div className="w-14 h-14 rounded-xl bg-[#fdf6ea] text-[#f3b23e] flex justify-center items-center text-3xl">
                  <FaBell />
                </div>
              </div>
              <div
                className="bg-white rounded-lg p-5 flex justify-between items-center shadow-sm border border-gray-100 cursor-pointer hover:shadow transition"
                onClick={() => navigateToView('achievements')}
              >
                <div>
                  <div className="text-xs text-gray-400 mb-1">Achievements</div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">{loadingStats ? '...' : (stats.achievements ?? 0)}</div>
                  <div className="text-xs text-gray-400">Published</div>
                </div>
                <div className="w-14 h-14 rounded-xl bg-[#fdf6ea] text-[#f3b23e] flex justify-center items-center text-3xl">
                  <FaTrophy />
                </div>
              </div>
            </div>

            {/* Section 1 - Gallery & Media Management */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6 overflow-hidden">
              <div className="bg-[#f8f9fb] px-5 py-3 border-b border-gray-100">
                <h2 className="text-sm font-bold text-gray-700">Gallery & Media Management</h2>
              </div>
              <div className="p-6 flex flex-wrap gap-5">
                <div
                  className="bg-[#f8f9fa] border border-gray-200 rounded-lg w-36 h-32 flex flex-col justify-center items-center relative shadow-sm cursor-pointer hover:shadow-md transition"
                  onClick={() => navigateToView('photo-albums')}
                >
                  <div className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">{stats.photoAlbums ?? 0}</div>
                  <div className="w-12 h-12 rounded-xl bg-[#1976d2] text-white flex items-center justify-center text-2xl mb-3"><FaCamera /></div>
                  <div className="text-xs font-semibold text-gray-600">Photo Albums</div>
                </div>
                <div
                  className="bg-[#f8f9fa] border border-gray-200 rounded-lg w-36 h-32 flex flex-col justify-center items-center relative shadow-sm cursor-pointer hover:shadow-md transition"
                  onClick={() => navigateToView('video-albums')}
                >
                  <div className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">{stats.videoAlbums ?? 0}</div>
                  <div className="w-12 h-12 rounded-xl bg-[#2e7d32] text-white flex items-center justify-center text-2xl mb-3"><FaPlay /></div>
                  <div className="text-xs font-semibold text-gray-600">Video Albums</div>
                </div>
                <div
                  className="bg-[#f8f9fa] border border-gray-200 rounded-lg w-36 h-32 flex flex-col justify-center items-center relative shadow-sm cursor-pointer hover:shadow-md transition"
                  onClick={() => navigateToView('media-albums')}
                >
                  <div className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">{stats.mediaAlbums ?? 0}</div>
                  <div className="w-12 h-12 rounded-xl bg-[#00838f] text-white flex items-center justify-center text-2xl mb-3"><FaFilm /></div>
                  <div className="text-xs font-semibold text-gray-600">Media Albums</div>
                </div>
                <div
                  className="bg-[#f8f9fa] border border-gray-200 rounded-lg w-36 h-32 flex flex-col justify-center items-center relative shadow-sm cursor-pointer hover:shadow-md transition"
                  onClick={() => navigateToView('achievements')}
                >
                  <div className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">{stats.achievements ?? 0}</div>
                  <div className="w-12 h-12 rounded-xl bg-[#fbc02d] text-white flex items-center justify-center text-2xl mb-3"><FaTrophy /></div>
                  <div className="text-xs font-semibold text-gray-600">Achievements</div>
                </div>
                <div
                  className="bg-[#f8f9fa] border border-gray-200 rounded-lg w-36 h-32 flex flex-col justify-center items-center relative shadow-sm cursor-pointer hover:shadow-md transition"
                  onClick={() => navigateToView('kids-corner')}
                >
                  <div className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">{stats.kidsAlbums ?? 0}</div>
                  <div className="w-12 h-12 rounded-xl bg-[#c62828] text-white flex items-center justify-center text-2xl mb-3"><FaChild /></div>
                  <div className="text-xs font-semibold text-gray-600">Kids Corner</div>
                </div>
              </div>
            </div>

            {/* Section 2 - Website Content Management */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6 overflow-hidden">
              <div className="bg-[#f8f9fb] px-5 py-3 border-b border-gray-100">
                <h2 className="text-sm font-bold text-gray-700">Website Content Management</h2>
              </div>
              <div className="p-6 flex flex-wrap gap-5">
                <div
                  className="bg-[#f8f9fa] border border-gray-200 rounded-lg w-36 h-32 flex flex-col justify-center items-center relative shadow-sm cursor-pointer hover:shadow-md transition"
                  onClick={() => navigateToView('notices')}
                >
                  <div className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">{stats.notices ?? 0}</div>
                  <div className="w-12 h-12 rounded-xl bg-[#fbc02d] text-white flex items-center justify-center text-2xl mb-3"><FaBell /></div>
                  <div className="text-xs font-semibold text-gray-600">Notice Board</div>
                </div>
                <div
                  className="bg-[#f8f9fa] border border-gray-200 rounded-lg w-36 h-32 flex flex-col justify-center items-center relative shadow-sm cursor-pointer hover:shadow-md transition"
                  onClick={() => navigateToView('events')}
                >
                  <div className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">{stats.events ?? 0}</div>
                  <div className="w-12 h-12 rounded-xl bg-[#2e7d32] text-white flex items-center justify-center text-2xl mb-3"><FaCalendarAlt /></div>
                  <div className="text-xs font-semibold text-gray-600">Events</div>
                </div>
                <div
                  className="bg-[#f8f9fa] border border-gray-200 rounded-lg w-36 h-32 flex flex-col justify-center items-center relative shadow-sm cursor-pointer hover:shadow-md transition"
                  onClick={() => navigateToView('sports')}
                >
                  <div className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">{stats.sports ?? 0}</div>
                  <div className="w-12 h-12 rounded-xl bg-[#00838f] text-white flex items-center justify-center text-2xl mb-3"><FaRunning /></div>
                  <div className="text-xs font-semibold text-gray-600">Sports</div>
                </div>
                <div
                  className="bg-[#f8f9fa] border border-gray-200 rounded-lg w-36 h-32 flex flex-col justify-center items-center relative shadow-sm cursor-pointer hover:shadow-md transition"
                  onClick={() => navigateToView('blogs')}
                >
                  <div className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">{stats.blogs ?? 0}</div>
                  <div className="w-12 h-12 rounded-xl bg-[#546e7a] text-white flex items-center justify-center text-2xl mb-3"><FaRss /></div>
                  <div className="text-xs font-semibold text-gray-600">Blog Posts</div>
                </div>
                <div
                  className="bg-[#f8f9fa] border border-gray-200 rounded-lg w-36 h-32 flex flex-col justify-center items-center relative shadow-sm cursor-pointer hover:shadow-md transition"
                  onClick={() => navigateToView('guestbook')}
                >
                  <div className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">{stats.guestbook ?? 0}</div>
                  <div className="w-12 h-12 rounded-xl bg-[#212121] text-white flex items-center justify-center text-2xl mb-3"><FaComments /></div>
                  <div className="text-xs font-semibold text-gray-600">Guestbook</div>
                </div>
              </div>
            </div>

          </div>
        ) : (currentView === 'photo-albums' || currentView === 'photo-album' || currentView === 'photos' || currentView === 'photo-gallery') ? (
          <WebAdminPhotoAlbums />
        ) : (currentView === 'video-albums' || currentView === 'video-album' || currentView === 'videos' || currentView === 'video-gallery') ? (
          <WebAdminVideoAlbums />
        ) : (currentView === 'media-albums' || currentView === 'media-album' || currentView === 'media' || currentView === 'media-gallery') ? (
          <WebAdminMediaAlbums />
        ) : (currentView === 'achievements' || currentView === 'achievement') ? (
          <WebAdminAchievements />
        ) : (currentView === 'kids-corner' || currentView === 'kids-albums' || currentView === 'kids') ? (
          <WebAdminKidsAlbums />
        ) : (currentView === 'notices' || currentView === 'notice' || currentView === 'notice-board') ? (
          <WebAdminNotices />
        ) : (currentView === 'events' || currentView === 'event') ? (
          <WebAdminEvents />
        ) : (currentView === 'sports' || currentView === 'sport') ? (
          <WebAdminSports />
        ) : (currentView === 'blogs' || currentView === 'blog' || currentView === 'blog-posts') ? (
          <WebAdminBlogs />
        ) : (currentView === 'guestbook' || currentView === 'guest-book') ? (
          <WebAdminGuestbook />
        ) : currentView === 'lfd-letterhead' ? (
          <WebAdminLFDLetterhead />
        ) : currentView === 'lfd-notice-display-time' ? (
          <WebAdminLFDNoticeDisplayTime />
        ) : currentView === 'lfd-display-time' ? (
          <WebAdminLFDDisplayTime />
        ) : currentView === 'lfd-notice' ? (
          <WebAdminLFDNotice />
        ) : currentView === 'lfd-notice-order' ? (
          <WebAdminLFDNoticeOrder />
        ) : currentView === 'lfd-achievement' ? (
          <WebAdminLFDAchievement />
        ) : currentView === 'lfd-flyer' ? (
          <WebAdminLFDFlyer />
        ) : currentView === 'lfd-toppers' ? (
          <WebAdminLFDToppers />
        ) : currentView === 'lfd-album' ? (
          <WebAdminLFDAlbum />
        ) : currentView === 'magazine' ? (
          <WebAdminMagazine />
        ) : currentView === 'homepage-main-slider' ? (
          <WebAdminHomepageSlider />
        ) : currentView === 'career' ? (
          <WebAdminCareer />
        ) : currentView === 'upload-tc' ? (
          <WebAdminUploadTC />
        ) : currentView === 'holiday-homework' ? (
          <WebAdminHolidayHomework />
        ) : currentView === 'website-toppers' ? (
          <WebAdminWebsiteToppers />
        ) : currentView === 'photos-homepage' ? (
          <WebAdminPhotosOnHomepage />
        ) : currentView === 'website-thoughts' ? (
          <WebAdminWebsiteThoughts />
        ) : currentView === 'mandatory-disclosure' ? (
          <WebAdminMandatoryDisclosure />
        ) : currentView === 'staff-visibility' ? (
          <WebAdminStaffVisibility />
        ) : currentView === 'e-bulletin' ? (
          <WebAdminEBulletin />
        ) : currentView === 'e-diaries' ? (
          <WebAdminEDiary />
        ) : currentView === 'feedback-subject-class' ? (
          <WebAdminFeedbackSubjectClass />
        ) : currentView === 'feedback-subject-teacher' ? (
          <WebAdminFeedbackSubjectTeacher />
        ) : currentView === 'feedback-question-master' ? (
          <WebAdminFeedbackQuestionMaster />
        ) : currentView === 'feedback-template' ? (
          <WebAdminFeedbackTemplate />
        ) : (
          <div className="flex-1 p-8 text-center text-gray-500">
            <h2 className="text-lg font-bold text-gray-700 mb-2">Page Not Found</h2>
            <p className="text-sm mb-4">The page "{currentView}" could not be found.</p>
            <button
              onClick={() => navigateToView('dashboard')}
              className="px-4 py-2 bg-blue-600 text-white rounded text-xs font-semibold cursor-pointer"
            >
              Go to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
