import React from 'react';

export default function ChangeAcademicYear() {
  return (
    <div className="global-settings-container" style={{ padding: '40px' }}>
      
      <div className="form-group" style={{ maxWidth: '600px', margin: '0 auto 25px auto' }}>
        <label>Academic Year</label>
        <select className="settings-input">
          <option>2026-2027</option>
        </select>
      </div>

      <div className="form-group" style={{ maxWidth: '600px', margin: '0 auto 25px auto' }}>
        <label>Financial Year</label>
        <select className="settings-input">
          <option>2026-2027</option>
        </select>
      </div>

      <div className="form-group" style={{ maxWidth: '600px', margin: '0 auto 40px auto' }}>
        <label>School</label>
        <select className="settings-input">
          <option>NAVALS NATIONAL ACADEMY</option>
        </select>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button className="blue-btn" style={{ padding: '8px 25px' }}>
          ↻ Change
        </button>
      </div>

    </div>
  );
}
