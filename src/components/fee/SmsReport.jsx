import React, { useState, useEffect } from 'react';
import { Eye, Download, MessageSquare } from 'lucide-react';
import * as XLSX from 'xlsx';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5005';

const inputStyle = { width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', outline: 'none' };
const labelStyle = { display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#374151' };

const SMS_TYPES = ['Fee Reminder', 'Fee Receipt', 'Fee Due Notification', 'Bus Arrival Alert', 'Custom'];

export default function SmsReport() {
  const defaultStart = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const defaultEnd = new Date().toISOString().split('T')[0];

  const [startDate, setStartDate] = useState(defaultStart);
  const [endDate, setEndDate] = useState(defaultEnd);
  const [smsType, setSmsType] = useState('');
  
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  useEffect(() => {
    handleShow();
  }, []);

  const handleShow = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = `${API_URL}/api/sms/logs?startDate=${startDate}&endDate=${endDate}`;
      if (smsType) url += `&type=${encodeURIComponent(smsType)}`;

      const res = await fetch(url, { headers: getHeaders() });
      const data = await res.json();
      
      if (res.ok) {
        let logs = Array.isArray(data) ? data : (data.logs || []);
        if (smsType && smsType !== 'All') {
          logs = logs.filter(l => (l.type || l.smsType || '').toLowerCase().includes(smsType.toLowerCase()));
        }
        setReportData(logs);
      } else {
        setError(data.message || 'Failed to fetch SMS logs');
      }
    } catch {
      setError('Server connection error while loading SMS report');
    } finally {
      setLoading(false);
    }
  };

  const statusColor = (status) => {
    const st = (status || '').toLowerCase();
    if (st === 'delivered' || st === 'sent' || st === 'success') return { bg: '#d1fae5', color: '#065f46' };
    if (st === 'failed' || st === 'undelivered') return { bg: '#fee2e2', color: '#991b1b' };
    return { bg: '#fef3c7', color: '#92400e' };
  };

  const exportToExcel = () => {
    if (reportData.length === 0) return;
    const rows = reportData.map((s, i) => ({
      '#': i + 1,
      'Date & Time': new Date(s.date || s.sentAt || s.createdAt).toLocaleString('en-GB'),
      'Mobile No': s.mobile || s.to || 'N/A',
      'Recipient / Student': s.studentName || s.recipient || 'Parent',
      'SMS Type': s.type || s.smsType || 'Fee Reminder',
      'Message': s.message || '',
      'Status': s.status || 'Delivered'
    }));

    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'SMS Logs');
    XLSX.writeFile(wb, `SMS_Report_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  return (
    <div style={{ display: 'flex', height: '100%', background: '#f3f4f6' }}>
      {/* Side Panel */}
      <div style={{ width: '250px', background: '#fff', borderRight: '1px solid #e5e7eb', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', flexShrink: 0, overflowY: 'auto' }}>
        <div>
          <label style={labelStyle}>From Date</label>
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>To Date</label>
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>SMS Type</label>
          <select value={smsType} onChange={e => setSmsType(e.target.value)} style={inputStyle}>
            <option value="">All Types</option>
            {SMS_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <button
          onClick={handleShow}
          disabled={loading}
          style={{
            background: '#29a9d8',
            color: '#fff',
            border: 'none',
            padding: '8px 10px',
            borderRadius: '4px',
            fontSize: '12px',
            cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            fontWeight: 'bold',
            marginTop: '8px'
          }}
        >
          <Eye size={14} /> {loading ? 'Loading...' : 'Show Logs'}
        </button>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <div style={{ background: '#fff', width: '100%', minHeight: '100%', borderRadius: '8px', border: '1px solid #e5e7eb', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: '16px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MessageSquare size={20} color="#29a9d8" />
              <h2 style={{ margin: 0, fontSize: '18px', color: '#1f2937' }}>SMS Delivery Report</h2>
              <span style={{ fontSize: '12px', color: '#6b7280' }}>Total Sent: <strong>{reportData.length}</strong></span>
            </div>
            {reportData.length > 0 && (
              <button
                onClick={exportToExcel}
                style={{
                  background: '#10b981',
                  color: '#fff',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontWeight: 'bold'
                }}
              >
                <Download size={14} /> Export Excel
              </button>
            )}
          </div>

          {error && <div style={{ padding: '12px', background: '#fee2e2', color: '#991b1b', borderRadius: '4px', marginBottom: '20px', fontSize: '13px' }}>{error}</div>}

          {reportData.length === 0 && !loading && !error ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280', fontSize: '14px' }}>
              No SMS records found for the selected date range.
            </div>
          ) : (
            <div style={{ overflowX: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', whiteSpace: 'nowrap' }}>
                <thead style={{ background: '#f9fafb' }}>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Date & Time</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Mobile No</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Student / Recipient</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>SMS Type</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151' }}>Message Preview</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', color: '#374151' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((sms, i) => {
                    const sc = statusColor(sms.status);
                    return (
                      <tr key={sms._id || i} style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '12px 16px', color: '#4b5563' }}>
                          {new Date(sms.date || sms.sentAt || sms.createdAt).toLocaleString('en-GB')}
                        </td>
                        <td style={{ padding: '12px 16px', color: '#1f2937', fontWeight: '600' }}>
                          {sms.mobile || sms.to || 'N/A'}
                        </td>
                        <td style={{ padding: '12px 16px', color: '#4b5563' }}>
                          {sms.studentName || sms.recipient || 'Parent'}
                        </td>
                        <td style={{ padding: '12px 16px', color: '#4b5563' }}>
                          {sms.type || sms.smsType || 'Fee Reminder'}
                        </td>
                        <td style={{ padding: '12px 16px', color: '#6b7280', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {sms.message || '-'}
                        </td>
                        <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                          <span style={{ padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold', background: sc.bg, color: sc.color }}>
                            {sms.status || 'Delivered'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
