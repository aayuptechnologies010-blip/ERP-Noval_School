import React, { useState } from 'react';

const FeesManagerSessionTransfer = () => {
  const [currentSession, setCurrentSession] = useState('2026-2027');
  const [currentFinYear, setCurrentFinYear] = useState('2026-2027');
  const [nextSession, setNextSession] = useState('');
  const [nextFinYear, setNextFinYear] = useState('');
  const [selectAll, setSelectAll] = useState(true);

  const tableData = [
    "Define Fee Head",
    "Define Fee Type",
    "Define Fee Head to Fee type relation",
    "Define Fee Installment",
    "Define Fee Group",
    "Define Fee group to fee head",
    "Define Amount to group",
    "Late Fee Settings",
    "Late Fee Settings Headwise",
    "Define Concession Type",
    "Define Concession",
    "Define Fee Head Concession",
    "Assign Concession to Students",
    "Set Due Limit",
    "Travel Agency Master",
    "Define Transport Group",
    "Define Vehicle Type",
    "Define Vehicle Details",
    "Define Vehicle Route",
    "Define Vehicle Route Relation",
    "Define Route Stop",
    "Assign Transport To Students",
    "Opening Balance and Dues Transfer"
  ];

  const [selectedItems, setSelectedItems] = useState(
    tableData.reduce((acc, curr, idx) => ({ ...acc, [idx]: true }), {})
  );

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    const newSelected = {};
    tableData.forEach((_, idx) => {
      newSelected[idx] = newSelectAll;
    });
    setSelectedItems(newSelected);
  };

  const handleSelectRow = (idx) => {
    setSelectedItems(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#fff', minHeight: '100%', fontFamily: 'Inter, sans-serif' }}>

      {/* Top Controls */}
      <div style={{ display: 'flex', gap: '24px', marginBottom: '32px' }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>Current Session</label>
          <select
            value={currentSession}
            onChange={(e) => setCurrentSession(e.target.value)}
            style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '13px', color: '#374151', backgroundColor: '#fff' }}
          >
            <option value="2026-2027">2026-2027</option>
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>Current Financial Year</label>
          <select
            value={currentFinYear}
            onChange={(e) => setCurrentFinYear(e.target.value)}
            style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '13px', color: '#374151', backgroundColor: '#fff' }}
          >
            <option value="2026-2027">2026-2027</option>
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>Next Session</label>
          <select
            value={nextSession}
            onChange={(e) => setNextSession(e.target.value)}
            style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '13px', color: '#374151', backgroundColor: '#fff' }}
          >
            <option value="">Select</option>
            <option value="2027-2028">2027-2028</option>
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>Next Financial Year</label>
          <select
            value={nextFinYear}
            onChange={(e) => setNextFinYear(e.target.value)}
            style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '13px', color: '#374151', backgroundColor: '#fff' }}
          >
            <option value="">Select</option>
            <option value="2027-2028">2027-2028</option>
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '16px' }}>Fees Transfer Table</h3>

        <div style={{ border: '1px solid #e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ padding: '12px', fontWeight: 600, color: '#374151', width: '80px' }}>Sl. No.</th>
                <th style={{ padding: '12px', fontWeight: 600, color: '#374151' }}>Table Name</th>
                <th style={{ padding: '12px', fontWeight: 600, color: '#374151', width: '200px' }}>Transfer</th>
                <th style={{ padding: '12px', fontWeight: 600, color: '#374151', width: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    style={{ cursor: 'pointer' }}
                  />
                  Select All
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, idx) => (
                <tr
                  key={idx}
                  style={{ borderBottom: '1px solid #e5e7eb' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e0f2fe'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <td style={{ padding: '12px', color: '#4b5563' }}>{idx + 1}</td>
                  <td style={{ padding: '12px', color: '#374151' }}>{item}</td>
                  <td style={{ padding: '12px', color: '#84cc16' }}>Not Transfer</td>
                  <td style={{ padding: '12px' }}>
                    <input
                      type="checkbox"
                      checked={selectedItems[idx] || false}
                      onChange={() => handleSelectRow(idx)}
                      style={{ cursor: 'pointer' }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px', paddingBottom: '40px' }}>
        <button style={{
          backgroundColor: '#3b82f6', color: '#fff', border: 'none', padding: '10px 32px',
          borderRadius: '4px', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
        }}>
          Next
        </button>
      </div>

    </div>
  );
};

export default FeesManagerSessionTransfer;
