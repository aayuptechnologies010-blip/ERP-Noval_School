import React, { useState } from 'react';
import { FileText, CreditCard, BadgeDollarSign, GraduationCap } from 'lucide-react';

export default function SessionTransfer() {
  const [activeModule, setActiveModule] = useState(null);

  if (activeModule === 'error') {
    return (
      <div style={{ backgroundColor: 'white', padding: '20px', fontFamily: 'Arial, sans-serif', height: '100%', position: 'relative' }}>
        <button onClick={() => setActiveModule(null)} style={{ position: 'absolute', top: '20px', right: '20px', padding: '5px 10px', cursor: 'pointer', border: '1px solid #ccc', backgroundColor: '#f9f9f9', borderRadius: '3px' }}>
          ← Back
        </button>
        <h1 style={{ color: '#d90000', fontSize: '24px', fontWeight: 'normal', margin: '0 0 10px 0' }}>
          Server Error in '/' Application.
        </h1>
        <hr style={{ border: '0', borderTop: '1px solid #ccc', margin: '15px 0' }} />
        <h2 style={{ color: '#d90000', fontSize: '18px', fontWeight: 'normal', fontStyle: 'italic', margin: '0 0 15px 0' }}>
          The resource cannot be found.
        </h2>
        <p style={{ fontSize: '12px', margin: '0 0 10px 0' }}>
          <strong>Description:</strong> HTTP 404. The resource you are looking for (or one of its dependencies) could have been removed, had its name changed, or is temporarily unavailable. Please review the following URL and make sure that it is spelled correctly.
        </p>
        <p style={{ fontSize: '12px', margin: '0 0 25px 0' }}>
          <strong>Requested URI:</strong> /AccountManager/AccAcademicyearTransfer.aspx
        </p>
        <hr style={{ border: '0', borderTop: '1px solid #ccc', margin: '15px 0' }} />
        <p style={{ fontSize: '11px', color: '#666' }}>
          <strong>Version Information:</strong> Microsoft .NET Framework Version:4.0.30319; ASP.NET Version:4.8.4805.0
        </p>
      </div>
    );
  }

  if (activeModule === 'payroll') {
    return (
      <div className="payroll-transfer-container" style={{ position: 'relative' }}>
        <button onClick={() => setActiveModule(null)} style={{ position: 'absolute', top: '20px', right: '20px', padding: '5px 10px', cursor: 'pointer', border: '1px solid #ccc', backgroundColor: '#f9f9f9', borderRadius: '3px' }}>
          ← Back
        </button>
        <div className="transfer-filters">
          <div className="filter-group">
            <label>Current Session</label>
            <select className="transfer-select" defaultValue="2026-2027">
              <option value="2026-2027">2026-2027</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Current Financial Year</label>
            <select className="transfer-select" defaultValue="2026-2027">
              <option value="2026-2027">2026-2027</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Next Session</label>
            <select className="transfer-select" defaultValue="Select">
              <option value="Select">Select</option>
              <option value="2027-2028">2027-2028</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Next Financial Year</label>
            <select className="transfer-select" defaultValue="Select">
              <option value="Select">Select</option>
              <option value="2027-2028">2027-2028</option>
            </select>
          </div>
        </div>

        <h3 className="transfer-table-title">Payroll Transfer Table</h3>
        
        <table className="transfer-table">
          <thead>
            <tr>
              <th style={{ width: '150px' }}>Sl. No.</th>
              <th>Table Name</th>
              <th>Transfer</th>
              <th style={{ width: '50px' }}></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Account Advance Relation</td>
              <td style={{ color: '#d9534f' }}>Record Transferred</td>
              <td><div className="empty-checkbox-box"></div></td>
            </tr>
          </tbody>
        </table>

        <div className="transfer-actions">
          <button className="transfer-next-btn">Next</button>
        </div>
      </div>
    );
  }

  return (
    <div className="session-transfer-container">
      <div className="module-cards-wrapper">
        
        <div className="module-card" onClick={() => setActiveModule('error')}>
          <div className="module-icon">
            <FileText size={48} strokeWidth={1} color="#333" />
            <div className="icon-overlay-user">
              <div style={{ width: '12px', height: '12px', border: '1px solid #333', borderRadius: '50%', margin: '0 auto' }}></div>
              <div style={{ width: '20px', height: '10px', border: '1px solid #333', borderRadius: '10px 10px 0 0', borderBottom: 'none' }}></div>
            </div>
          </div>
          <span className="module-name">Account Manager</span>
        </div>

        <div className="module-card" onClick={() => setActiveModule('error')}>
          <div className="module-icon">
            <CreditCard size={48} strokeWidth={1} color="#333" />
            <div className="icon-overlay-card">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <div style={{ width: '15px', height: '2px', backgroundColor: '#333' }}></div>
                <div style={{ width: '15px', height: '2px', backgroundColor: '#333' }}></div>
                <div style={{ width: '15px', height: '2px', backgroundColor: '#333' }}></div>
              </div>
            </div>
          </div>
          <span className="module-name">Fee Manager</span>
        </div>

        <div className="module-card" onClick={() => setActiveModule('payroll')}>
          <div className="module-icon">
            <BadgeDollarSign size={48} strokeWidth={1} color="#333" />
            <div className="icon-overlay-hand">
              <div style={{ width: '30px', height: '8px', border: '1px solid #333', borderTop: 'none', borderRadius: '0 0 10px 10px' }}></div>
            </div>
          </div>
          <span className="module-name">Payroll Manager</span>
        </div>

        <div className="module-card" onClick={() => setActiveModule('error')}>
          <div className="module-icon">
            <GraduationCap size={48} strokeWidth={1} color="#333" />
            <div className="icon-overlay-book">
              <div style={{ width: '20px', height: '25px', border: '1px solid #333', borderRadius: '2px' }}>
                <div style={{ width: '100%', height: '5px', borderBottom: '1px solid #333' }}></div>
                <div style={{ width: '100%', height: '5px', borderBottom: '1px solid #333' }}></div>
                <div style={{ width: '100%', height: '5px', borderBottom: '1px solid #333' }}></div>
              </div>
            </div>
          </div>
          <span className="module-name">Admission Manager</span>
        </div>

      </div>
    </div>
  );
}
