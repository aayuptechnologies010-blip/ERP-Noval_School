import React, { useState, useEffect } from 'react';
import { FileText, CreditCard, BadgeDollarSign, GraduationCap } from 'lucide-react';


const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function SessionTransfer() {
  const [activeModule, setActiveModule] = useState(null);
  const [academicYears, setAcademicYears] = useState([]);
  const [financialYears, setFinancialYears] = useState([]);
  const [currentSession, setCurrentSession] = useState('');
  const [currentFinancial, setCurrentFinancial] = useState('');
  const [nextSession, setNextSession] = useState('');
  const [nextFinancial, setNextFinancial] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchYears = async () => {
      try {
        const headers = { 'Authorization': `Bearer ${token}` };

        const [acRes, fyRes] = await Promise.all([
          fetch(`${API_BASE}/api/academic-years`, { headers }),
          fetch(`${API_BASE}/api/financial-years`, { headers })
        ]);

        if (acRes.ok) {
          const acData = await acRes.json();
          const years = Array.isArray(acData) ? acData : (acData.data || acData.academicYears || []);
          setAcademicYears(years);
          // Set current session to the active one or the first one
          const active = years.find(y => y.isActive || y.isCurrent);
          if (active) setCurrentSession(active.year || active.name || active.yearRange || '');
          else if (years.length > 0) setCurrentSession(years[0].year || years[0].name || years[0].yearRange || '');
        }

        if (fyRes.ok) {
          const fyData = await fyRes.json();
          const years = Array.isArray(fyData) ? fyData : (fyData.data || fyData.financialYears || []);
          setFinancialYears(years);
          const active = years.find(y => y.isActive || y.isCurrent);
          if (active) setCurrentFinancial(active.year || active.name || active.yearRange || '');
          else if (years.length > 0) setCurrentFinancial(years[0].year || years[0].name || years[0].yearRange || '');
        }
      } catch (err) {
        console.error('Failed to fetch years:', err);
      }
    };
    fetchYears();
  }, []);

  const getYearLabel = (y) => y.year || y.name || y.yearRange || y.title || `${y.startYear}-${y.endYear}` || 'Unknown';

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
            <select className="transfer-select" value={currentSession} onChange={(e) => setCurrentSession(e.target.value)}>
              <option value="">Select</option>
              {academicYears.map((y, i) => (
                <option key={i} value={getYearLabel(y)}>{getYearLabel(y)}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Current Financial Year</label>
            <select className="transfer-select" value={currentFinancial} onChange={(e) => setCurrentFinancial(e.target.value)}>
              <option value="">Select</option>
              {financialYears.map((y, i) => (
                <option key={i} value={getYearLabel(y)}>{getYearLabel(y)}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Next Session</label>
            <select className="transfer-select" value={nextSession} onChange={(e) => setNextSession(e.target.value)}>
              <option value="">Select</option>
              {academicYears.map((y, i) => (
                <option key={i} value={getYearLabel(y)}>{getYearLabel(y)}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Next Financial Year</label>
            <select className="transfer-select" value={nextFinancial} onChange={(e) => setNextFinancial(e.target.value)}>
              <option value="">Select</option>
              {financialYears.map((y, i) => (
                <option key={i} value={getYearLabel(y)}>{getYearLabel(y)}</option>
              ))}
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
            {[
              'Account Advance Relation',
              'Staff Salary Structure',
              'Salary Head Assignment',
              'Salary Group Assignment',
              'Income Tax Slab Relations',
              'Pay Scale Assignment',
              'Insurance Policy Relations'
            ].map((tableName, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{tableName}</td>
                <td style={{ color: nextSession ? '#5cb85c' : '#d9534f' }}>
                  {nextSession ? 'Ready to Transfer' : 'Select Next Session'}
                </td>
                <td>
                  <input type="checkbox" disabled={!nextSession} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="transfer-actions">
          <button className="transfer-next-btn" disabled={!nextSession || !nextFinancial}>
            Next
          </button>
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
