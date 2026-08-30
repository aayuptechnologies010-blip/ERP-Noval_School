import React from 'react';

export default function EmploymentForm() {
  return (
    <div style={{ padding: '20px', backgroundColor: 'white', minHeight: '600px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <h1 style={{ color: '#ff0000', margin: '0 0 15px 0', fontSize: '24px', fontWeight: 'normal' }}>
        Server Error in '/' Application.
      </h1>
      <hr style={{ border: 'none', borderTop: '1px solid #ccc', marginBottom: '15px' }} />
      <h2 style={{ color: '#800000', margin: '0 0 15px 0', fontSize: '18px', fontWeight: 'normal', fontStyle: 'italic' }}>
        The resource cannot be found.
      </h2>
      <p style={{ margin: '0 0 15px 0', fontSize: '13px' }}>
        <strong>Description: </strong>HTTP 404. The resource you are looking for (or one of its dependencies) could have been removed, had its name changed, or is temporarily unavailable. Please review the following URL and make sure that it is spelled correctly.
      </p>
      <p style={{ margin: '0 0 20px 0', fontSize: '13px' }}>
        <strong>Requested URL: </strong>/PayrollEmploymentForm.aspx
      </p>
      <hr style={{ border: 'none', borderTop: '1px solid #ccc', marginBottom: '10px' }} />
      <p style={{ margin: '0', fontSize: '11px', color: '#666' }}>
        <strong>Version Information:</strong> Microsoft .NET Framework Version:4.0.30319; ASP.NET Version:4.8.4805.0
      </p>
    </div>
  );
}
