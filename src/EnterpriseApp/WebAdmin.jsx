import React from 'react';
import { 
  FaImages, FaVideo, FaBell, FaTrophy, 
  FaCamera, FaPlay, FaFilm, FaChild,
  FaCalendarAlt, FaRunning, FaRss, FaComments
} from 'react-icons/fa';
import './styles.css';

export default function WebAdmin() {
  return (
    <div className="wa-container">
      <div className="wa-header">
        <h2 className="wa-title">Website Management Dashboard</h2>
        <div className="wa-breadcrumb">
          <span>Home</span> &gt; <span>Dashboard</span>
        </div>
      </div>

      <div className="wa-top-cards">
        <div className="wa-top-card">
          <div className="wa-tc-content">
            <div className="wa-tc-label">Photo Albums</div>
            <div className="wa-tc-value">4</div>
            <div className="wa-tc-sub">Total Albums</div>
          </div>
          <div className="wa-tc-icon" style={{ color: '#4a81d4', backgroundColor: '#eef2fa' }}>
            <FaImages />
          </div>
        </div>
        <div className="wa-top-card">
          <div className="wa-tc-content">
            <div className="wa-tc-label">Video Albums</div>
            <div className="wa-tc-value">0</div>
            <div className="wa-tc-sub">Video Content</div>
          </div>
          <div className="wa-tc-icon" style={{ color: '#31b131', backgroundColor: '#eef8ef' }}>
            <FaVideo />
          </div>
        </div>
        <div className="wa-top-card">
          <div className="wa-tc-content">
            <div className="wa-tc-label">Active Notices</div>
            <div className="wa-tc-value">4</div>
            <div className="wa-tc-sub">Published</div>
          </div>
          <div className="wa-tc-icon" style={{ color: '#f3b23e', backgroundColor: '#fdf6ea' }}>
            <FaBell />
          </div>
        </div>
        <div className="wa-top-card">
          <div className="wa-tc-content">
            <div className="wa-tc-label">Achievements</div>
            <div className="wa-tc-value">0</div>
            <div className="wa-tc-sub">Published</div>
          </div>
          <div className="wa-tc-icon" style={{ color: '#f3b23e', backgroundColor: '#fdf6ea' }}>
            <FaTrophy />
          </div>
        </div>
      </div>

      <div className="wa-section">
        <div className="wa-section-header">Gallery & Media Management</div>
        <div className="wa-card-grid">
          <div className="wa-card">
            <div className="wa-badge">4</div>
            <div className="wa-card-icon" style={{ backgroundColor: '#1976d2' }}>
              <FaCamera />
            </div>
            <div className="wa-card-title">Photo Albums</div>
          </div>
          <div className="wa-card">
            <div className="wa-badge">0</div>
            <div className="wa-card-icon" style={{ backgroundColor: '#2e7d32' }}>
              <FaPlay />
            </div>
            <div className="wa-card-title">Video Albums</div>
          </div>
          <div className="wa-card">
            <div className="wa-badge">1</div>
            <div className="wa-card-icon" style={{ backgroundColor: '#00838f' }}>
              <FaFilm />
            </div>
            <div className="wa-card-title">Media Albums</div>
          </div>
          <div className="wa-card">
            <div className="wa-badge">0</div>
            <div className="wa-card-icon" style={{ backgroundColor: '#fbc02d' }}>
              <FaTrophy />
            </div>
            <div className="wa-card-title">Achievements</div>
          </div>
          <div className="wa-card">
            <div className="wa-badge">0</div>
            <div className="wa-card-icon" style={{ backgroundColor: '#c62828' }}>
              <FaChild />
            </div>
            <div className="wa-card-title">Kids Corner</div>
          </div>
        </div>
      </div>

      <div className="wa-section">
        <div className="wa-section-header">Website Content Management</div>
        <div className="wa-card-grid">
          <div className="wa-card">
            <div className="wa-badge">4</div>
            <div className="wa-card-icon" style={{ backgroundColor: '#fbc02d' }}>
              <FaBell />
            </div>
            <div className="wa-card-title">Notice Board</div>
          </div>
          <div className="wa-card">
            <div className="wa-badge">0</div>
            <div className="wa-card-icon" style={{ backgroundColor: '#2e7d32' }}>
              <FaCalendarAlt />
            </div>
            <div className="wa-card-title">Events</div>
          </div>
          <div className="wa-card">
            <div className="wa-badge">0</div>
            <div className="wa-card-icon" style={{ backgroundColor: '#00838f' }}>
              <FaRunning />
            </div>
            <div className="wa-card-title">Sports</div>
          </div>
          <div className="wa-card">
            <div className="wa-badge">0</div>
            <div className="wa-card-icon" style={{ backgroundColor: '#546e7a' }}>
              <FaRss />
            </div>
            <div className="wa-card-title">Blog Posts</div>
          </div>
          <div className="wa-card">
            <div className="wa-badge">0</div>
            <div className="wa-card-icon" style={{ backgroundColor: '#212121' }}>
              <FaComments />
            </div>
            <div className="wa-card-title">Guestbook</div>
          </div>
        </div>
      </div>
    </div>
  );
}
