import React, { useState } from 'react';
import { FaSyncAlt, FaFilter, FaExclamationTriangle } from 'react-icons/fa';

function Report() {
  const [dateRange, setDateRange] = useState('03 Aug 2026');
  const [smsType, setSmsType] = useState('All SMS');
  const [mobile, setMobile] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div style={{ flex: 1, background: '#f8f9fc', borderTopLeftRadius: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Header Bar */}
      <div style={{ padding: '24px 32px 0 32px' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2b3674', margin: 0 }}>SMS Report</h1>
      </div>

      <div style={{ padding: '24px 32px', overflowY: 'auto', flex: 1 }}>
        <div style={{ background: '#fff', borderRadius: 8, padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          
          {/* Filters Top Bar */}
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
            
            {/* Date Range Input */}
            <div style={{ position: 'relative', flex: '1 1 200px', maxWidth: 300 }}>
              <label style={{ 
                position: 'absolute', top: -8, left: 12, background: '#fff', padding: '0 4px', 
                fontSize: 11, color: '#94a3b8', zIndex: 1 
              }}>
                Select date range
              </label>
              <input 
                type="text" 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                style={{ 
                  width: '100%', border: '1px solid #e2e8f0', borderRadius: 4, padding: '10px 12px', 
                  fontSize: 14, color: '#334155', outline: 'none' 
                }}
              />
            </div>

            {/* Select SMS Type */}
            <select 
              value={smsType}
              onChange={(e) => setSmsType(e.target.value)}
              style={{ 
                flex: '1 1 150px', maxWidth: 200, border: '1px solid #e2e8f0', borderRadius: 4, 
                padding: '10px 12px', fontSize: 14, color: '#334155', outline: 'none' 
              }}
            >
              <option value="All SMS">All SMS</option>
              <option value="Absentee SMS">Absentee SMS</option>
              <option value="Accounts">Accounts</option>
              <option value="Additional Number">Additional Number</option>
              <option value="Admission">Admission</option>
              <option value="Attendance">Attendance</option>
              <option value="Class Test SMS">Class Test SMS</option>
              <option value="Credential SMS">Credential SMS</option>
              <option value="Fees">Fees</option>
              <option value="Latecomers SMS">Latecomers SMS</option>
              <option value="Leave Approval">Leave Approval</option>
              <option value="Library">Library</option>
              <option value="Marks">Marks</option>
              <option value="Online Payment">Online Payment</option>
              <option value="Online Registration">Online Registration</option>
              <option value="Payroll">Payroll</option>
              <option value="RFID Alert SMS">RFID Alert SMS</option>
              <option value="Secret Code SMS">Secret Code SMS</option>
              <option value="Single SMS">Single SMS</option>
              <option value="SMS TO MOBILE">SMS TO MOBILE</option>
              <option value="Specified">Specified</option>
              <option value="Stocks">Stocks</option>
              <option value="Subject Absentee SMS">Subject Absentee SMS</option>
              <option value="Transport">Transport</option>
            </select>

            {/* Mobile No Input */}
            <input 
              type="text" 
              placeholder="Enter Mobile No."
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              style={{ 
                flex: '1 1 180px', maxWidth: 250, border: '1px solid #e2e8f0', borderRadius: 4, 
                padding: '10px 12px', fontSize: 14, color: '#334155', outline: 'none' 
              }}
            />

            {/* Get Button */}
            <button style={{ 
              background: '#4ade80', color: '#fff', border: 'none', borderRadius: 4, 
              padding: '10px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer' 
            }}>
              Get
            </button>

            {/* Action Buttons Right */}
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 20 }}>
              <button style={{ 
                background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 6, 
                fontSize: 14, color: '#64748b', cursor: 'pointer' 
              }}>
                <FaSyncAlt /> Refresh
              </button>
              <button 
                onClick={() => setIsFilterOpen(true)}
                style={{ 
                background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 6, 
                fontSize: 14, color: '#64748b', cursor: 'pointer' 
              }}>
                <FaFilter /> Filter
              </button>
            </div>
            
          </div>

          {/* No Record Graphic */}
          <div style={{ padding: '60px 0', display: 'flex', justifyContent: 'center' }}>
            <div style={{ 
              width: 300, height: 200, background: '#f8fafc', border: '2px dashed #cbd5e1', 
              borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', 
              flexDirection: 'column', color: '#64748b' 
            }}>
              <FaExclamationTriangle style={{ fontSize: 40, color: '#94a3b8', marginBottom: 12 }} />
              <span style={{ fontWeight: 700 }}>NO RECORD FOUND</span>
            </div>
          </div>

        </div>

        <div style={{ textAlign: 'center', marginTop: 40, paddingBottom: 20, fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>
          COPYRIGHT © 2026 FRANCISCAN
        </div>
      </div>

      {/* Filter Drawer */}
      {isFilterOpen && (
        <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0, zIndex: 50, display: 'flex', justifyContent: 'flex-end' }}>
          {/* Overlay */}
          <div 
            style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, background: 'rgba(0,0,0,0.5)' }} 
            onClick={() => setIsFilterOpen(false)}
          ></div>
          
          {/* Drawer */}
          <div style={{ position: 'relative', width: 350, background: '#fff', height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '-2px 0 8px rgba(0,0,0,0.1)' }}>
            {/* Header */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', margin: 0 }}>Filter</h2>
              <button onClick={() => setIsFilterOpen(false)} style={{ background: 'none', border: 'none', fontSize: 24, color: '#64748b', cursor: 'pointer', lineHeight: 1 }}>&times;</button>
            </div>
            
            {/* Body */}
            <div style={{ padding: '24px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
              
              {/* Date Range */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 13, color: '#475569' }}>Select Date Range</label>
                <input 
                  type="text" 
                  value="03 Aug 2026"
                  readOnly
                  style={{ border: '1px solid #e2e8f0', borderRadius: 4, padding: '10px 12px', fontSize: 14, color: '#334155', outline: 'none' }}
                />
              </div>

              {/* Sender */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <label style={{ fontSize: 13, color: '#475569' }}>Sender</label>
                <div style={{ display: 'flex', gap: 16 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#334155', cursor: 'pointer' }}>
                    <input type="radio" name="sender" defaultChecked style={{ accentColor: '#2563eb' }} /> All
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#334155', cursor: 'pointer' }}>
                    <input type="radio" name="sender" style={{ accentColor: '#2563eb' }} /> Staff
                  </label>
                </div>
              </div>

              {/* Recipient */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <label style={{ fontSize: 13, color: '#475569' }}>Recipient</label>
                <div style={{ display: 'flex', gap: 16 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#334155', cursor: 'pointer' }}>
                    <input type="radio" name="recipient" defaultChecked style={{ accentColor: '#2563eb' }} /> All
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#334155', cursor: 'pointer' }}>
                    <input type="radio" name="recipient" style={{ accentColor: '#2563eb' }} /> Staff
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#334155', cursor: 'pointer' }}>
                    <input type="radio" name="recipient" style={{ accentColor: '#2563eb' }} /> Parent
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#334155', cursor: 'pointer' }}>
                    <input type="radio" name="recipient" style={{ accentColor: '#2563eb' }} /> Student
                  </label>
                </div>
              </div>

              {/* Has the word... */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <label style={{ fontSize: 13, color: '#475569' }}>Has the word in the message</label>
                <div style={{ display: 'flex', gap: 16 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#334155', cursor: 'pointer' }}>
                    <input type="radio" name="hasWord" defaultChecked style={{ accentColor: '#2563eb' }} /> Any
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#334155', cursor: 'pointer' }}>
                    <input type="radio" name="hasWord" style={{ accentColor: '#2563eb' }} /> Specific
                  </label>
                </div>
              </div>

              <div>
                <button style={{ background: '#4ade80', color: '#fff', border: 'none', borderRadius: 4, padding: '10px 16px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                  Filter Report
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Report;
