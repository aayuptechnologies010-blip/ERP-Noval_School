import React, { useState, useEffect } from 'react';
import { Save, AlertCircle, CheckCircle } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function ReportSetting() {
  const defaultReports = [
    { id: 1, name: 'Bank Statement Report' },
    { id: 2, name: 'Reconciliation Report' },
    { id: 3, name: 'ESI Report' },
    { id: 4, name: 'Salary Sheet' },
    { id: 5, name: 'PF Report' },
    { id: 6, name: 'Salary Slip' },
    { id: 7, name: 'Salary Statement Employee Wise' },
    { id: 8, name: 'Gross Form 16' },
    { id: 9, name: 'PF Challan Report' },
    { id: 10, name: 'Salary Certificate Report' },
    { id: 11, name: 'Employee Type wise Report' },
    { id: 12, name: 'Form 16' },
    { id: 13, name: 'Estimated Salary Report' },
    { id: 14, name: 'Experience Certificate Report' },
  ];

  const formatOptions = ['Select', 'Format 1', 'Format 2', 'Format 17', 'Format 18'];

  const [reportFormats, setReportFormats] = useState({});
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const token = localStorage.getItem('token');
  const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/global-payroll-settings`, { headers });
        if (res.ok) {
          const data = await res.json();
          if (data.reportSettings) {
            setReportFormats(data.reportSettings);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleFormatChange = (reportName, format) => {
    setReportFormats(prev => ({
      ...prev,
      [reportName]: format
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });
    try {
      const res = await fetch(`${API_BASE}/api/global-payroll-settings`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ reportSettings: reportFormats })
      });
      if (res.ok) {
        setMessage({ type: 'success', text: 'Report formats updated successfully' });
      } else {
        setMessage({ type: 'error', text: 'Failed to update settings' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Network error' });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage({ type: '', text: '' }), 5000);
    }
  };

  const filteredReports = defaultReports.filter(r => r.name.toLowerCase().includes(search.toLowerCase()));

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;
  }

  return (
    <div className="mail-template-container">
      <div style={{ padding: '15px 20px', borderBottom: '1px solid #dee2e6', fontWeight: 'bold', color: '#333', fontSize: '15px', textTransform: 'uppercase' }}>
        Report Settings
      </div>

      {message.text && (
        <div style={{
          margin: '20px', padding: '12px 16px', borderRadius: '4px',
          display: 'flex', alignItems: 'center', gap: '8px',
          backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
          color: message.type === 'success' ? '#155724' : '#721c24',
          border: `1px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
        }}>
          {message.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
          {message.text}
        </div>
      )}
      
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold', fontSize: '14px', color: '#333' }}>Search:</label>
          <input 
            type="text" 
            className="settings-input" 
            style={{ width: '250px' }} 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="mail-table-wrapper" style={{ border: 'none', borderRadius: '0', maxHeight: '500px', overflowY: 'auto' }}>
          <table className="mail-table" style={{ borderTop: '1px solid #dee2e6' }}>
            <thead>
              <tr>
                <th style={{ width: '60px', textAlign: 'center' }}>SN.</th>
                <th>Report Name</th>
                <th style={{ width: '300px' }}>Format</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((row, index) => (
                <tr key={row.id} className={index % 2 === 0 ? 'row-even' : 'row-odd'}>
                  <td style={{ textAlign: 'center' }}>{index + 1}</td>
                  <td>{row.name}</td>
                  <td>
                    <select 
                      className="settings-input" 
                      style={{ margin: 0, height: '32px', width: '200px' }}
                      value={reportFormats[row.name] || 'Select'}
                      onChange={(e) => handleFormatChange(row.name, e.target.value)}
                    >
                      {formatOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <button 
            className="blue-btn" 
            style={{ padding: '8px 25px', opacity: saving ? 0.7 : 1 }}
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>

      </div>
    </div>
  );
}
