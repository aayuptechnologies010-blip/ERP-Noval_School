import React from 'react';

export default function ApplicationReceived() {
  return (
    <div className="global-settings-container">
      <div style={{ padding: '20px' }}>
        
        {/* Top Form */}
        <div className="settings-row" style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr auto', gap: '20px', alignItems: 'end', marginBottom: '30px' }}>
          <div className="form-group">
            <label style={{ fontWeight: 'bold' }}>Job Title</label>
            <select className="settings-input"><option>Select Job Title</option></select>
          </div>
          <div className="form-group">
            <label style={{ fontWeight: 'bold' }}>Application Date</label>
            <input type="text" className="settings-input" />
          </div>
          <div className="form-group">
            <label style={{ fontWeight: 'bold' }}>From Date</label>
            <input type="text" className="settings-input" defaultValue="30-Aug-2026" />
          </div>
          <div className="form-group">
            <label style={{ fontWeight: 'bold' }}>To Date</label>
            <input type="text" className="settings-input" defaultValue="30-Aug-2026" />
          </div>
          <div className="form-group" style={{ paddingBottom: '2px' }}>
            <button style={{ backgroundColor: '#159BD7', color: 'white', border: 'none', padding: '8px 25px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              GO
            </button>
          </div>
        </div>

        {/* Search */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '15px' }}>
          <input type="text" placeholder="Search" style={{ padding: '6px 12px', border: '1px solid #ced4da', borderRadius: '4px', width: '250px' }} />
        </div>

        {/* Table */}
        <div className="mail-table-wrapper" style={{ overflowX: 'auto' }}>
          <table className="mail-table" style={{ minWidth: '1000px' }}>
            <thead>
              <tr>
                <th>Sr.No. <span style={{ fontSize: '10px' }}>▼</span></th>
                <th>Select <span style={{ fontSize: '10px' }}>▼</span></th>
                <th>Candidate Name <span style={{ fontSize: '10px' }}>▼</span></th>
                <th>Qualification <span style={{ fontSize: '10px' }}>▼</span></th>
                <th>Job Title <span style={{ fontSize: '10px' }}>▼</span></th>
                <th>Application Date <span style={{ fontSize: '10px' }}>▼</span></th>
                <th>Interview Status <span style={{ fontSize: '10px' }}>▼</span></th>
                <th>Round <span style={{ fontSize: '10px' }}>▼</span></th>
                <th>Generate Offer Letter <span style={{ fontSize: '10px' }}>▼</span></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '20px', color: '#6c757d', backgroundColor: '#f8f9fa' }}>
                  No data available in table
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
