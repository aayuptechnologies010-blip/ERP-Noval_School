import React from 'react';

const ErrorPageTemplate = ({ requestedUrl }) => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#fff', minHeight: '100%', fontFamily: 'Arial, Helvetica, Geneva, SunSans-Regular, sans-serif' }}>
      <h1 style={{ color: 'red', fontSize: '24px', fontWeight: 'normal', margin: '0 0 16px 0' }}>
        Server Error in '/' Application.
      </h1>
      <hr style={{ border: '0', borderTop: '1px solid #ccc', margin: '0 0 16px 0' }} />
      <h2 style={{ color: 'maroon', fontSize: '18px', fontStyle: 'italic', fontWeight: 'normal', margin: '0 0 16px 0' }}>
        The resource cannot be found.
      </h2>
      <p style={{ fontSize: '12px', color: '#000', margin: '0 0 16px 0' }}>
        <b>Description: </b>
        HTTP 404. The resource you are looking for (or one of its dependencies) could have been removed, had its name changed, or is temporarily unavailable. Please review the following URL and make sure that it is spelled correctly.
      </p>
      <p style={{ fontSize: '12px', color: '#000', margin: '0 0 16px 0' }}>
        <b>Requested URL: </b>
        {requestedUrl}
      </p>
      <hr style={{ border: '0', borderTop: '1px solid #ccc', margin: '0 0 16px 0' }} />
      <p style={{ fontSize: '10px', color: '#666', margin: '0' }}>
        <b>Version Information:</b> Microsoft .NET Framework Version:4.0.30319; ASP.NET Version:4.8.4805.0
      </p>
    </div>
  );
};

export default ErrorPageTemplate;
