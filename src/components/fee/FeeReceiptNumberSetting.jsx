import React, { useState, useEffect } from 'react';
import { RefreshCw, Check, X } from 'lucide-react';

const OPTIONS = [
  'Single Receipt',
  'School Wise Receipt',
  'Feetype Wise Receipt',
  'School with Feetype Wise Receipt',
  'Bank Wise Receipt'
];

export default function FeeReceiptNumberSetting() {
  const [selectedOption, setSelectedOption] = useState('Single Receipt');
  
  // Base structural data for rows based on option.
  // In a fully dynamic app, School/Feetype/Bank list would be fetched from their respective APIs.
  // For this integration, we maintain the structure but tie inputs to React state.
  const [rowStates, setRowStates] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  // Base structures
  const baseStructures = {
    'Single Receipt': [
      { id: 1, label: null }
    ],
    'School Wise Receipt': [
      { id: 1, label: 'NAVALS NATIONAL ACADEMY' }
    ],
    'Feetype Wise Receipt': [
      { id: 1, label: 'School Fee' }
    ],
    'School with Feetype Wise Receipt': [
      { id: 1, label: 'School Fee' }
    ],
    'Bank Wise Receipt': [
      { id: 1, label: 'NAVAL NATIONAL ACADEMY GENERAL' },
      { id: 2, label: 'NAVAL NATIONAL ACADEMY BANK' }
    ]
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${API_URL}/api/fee-receipt-settings`, { headers });
      if (res.ok) {
        const data = await res.json();
        if (data.receiptType) {
          setSelectedOption(data.receiptType);
          
          // Map backend settings to state
          const newRowStates = { ...rowStates };
          const base = baseStructures[data.receiptType] || baseStructures['Single Receipt'];
          
          base.forEach((row, idx) => {
            const dbSetting = data.settings && data.settings[idx];
            newRowStates[`${data.receiptType}_${row.id}`] = {
              prefix: dbSetting?.prefix || '',
              leadZero: dbSetting?.leadZero || (data.receiptType === 'Single Receipt' ? '' : '0'),
              rcptNoStart: dbSetting?.rcptNoStart || '1',
              suffix: dbSetting?.suffix || ''
            };
          });
          setRowStates(newRowStates);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Initialize row state if missing when switching tabs
  useEffect(() => {
    const base = baseStructures[selectedOption];
    let needsUpdate = false;
    const newStates = { ...rowStates };

    base.forEach(row => {
      const key = `${selectedOption}_${row.id}`;
      if (!newStates[key]) {
        newStates[key] = {
          prefix: '',
          leadZero: selectedOption === 'Single Receipt' ? '' : '0',
          rcptNoStart: '1',
          suffix: ''
        };
        needsUpdate = true;
      }
    });

    if (needsUpdate) {
      setRowStates(newStates);
    }
  }, [selectedOption]);

  const handleInputChange = (rowId, field, value) => {
    const key = `${selectedOption}_${rowId}`;
    setRowStates(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value
      }
    }));
  };

  const handleUpdate = async () => {
    setSubmitting(true);
    
    // Construct payload
    const base = baseStructures[selectedOption];
    const settingsPayload = base.map(row => {
      const state = rowStates[`${selectedOption}_${row.id}`];
      return {
        prefix: state?.prefix || '',
        leadZero: parseInt(state?.leadZero || '0', 10),
        rcptNoStart: parseInt(state?.rcptNoStart || '1', 10),
        suffix: state?.suffix || ''
      };
    });

    const payload = {
      receiptType: selectedOption,
      settings: settingsPayload
    };

    try {
      const token = localStorage.getItem('token');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${API_URL}/api/fee-receipt-settings`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update settings');

      setIsError(false);
      setMessage('Fee Receipt Settings updated successfully');
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setMessage(error.message || 'An error occurred while saving');
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  const getFirstColumnLabel = () => {
    switch(selectedOption) {
      case 'School Wise Receipt': return 'School Name';
      case 'Feetype Wise Receipt': return 'Fee Type';
      case 'School with Feetype Wise Receipt': return 'Fee Type';
      case 'Bank Wise Receipt': return 'Bank Name';
      default: return null;
    }
  };

  const firstColumnLabel = getFirstColumnLabel();
  const rows = baseStructures[selectedOption];

  return (
    <div style={{ padding: '24px 32px', background: '#fff', minHeight: '100%', display: 'flex', gap: '48px', position: 'relative' }}>
      
      {/* Toast Message */}
      {message && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px', backgroundColor: isError ? '#ef4444' : '#4ade80', color: '#fff',
          borderRadius: '4px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 3000, width: '320px',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '12px 16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            {isError ? <X size={20} color="#fff" /> : <Check size={20} color="#fff" />}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontSize: '14px', fontWeight: 600 }}>{isError ? 'Error' : 'Success'}</span>
                <button onClick={() => setMessage(null)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 0 }}>
                  <X size={14} />
                </button>
              </div>
              <span style={{ fontSize: '13px' }}>{message}</span>
            </div>
          </div>
        </div>
      )}

      {/* Left Column: Radio Buttons */}
      <div style={{ width: '280px', flexShrink: 0, marginTop: '32px' }}>
        {OPTIONS.map(option => (
          <div key={option} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', cursor: 'pointer' }} onClick={() => setSelectedOption(option)}>
            <div style={{ 
              width: '14px', height: '14px', borderRadius: '50%', 
              border: selectedOption === option ? '4px solid #29a9d8' : '1px solid #cbd5e1',
              boxSizing: 'border-box'
            }} />
            <span style={{ fontSize: '13px', color: '#333' }}>{option}</span>
          </div>
        ))}
      </div>

      {/* Right Column: Settings Table */}
      <div style={{ flex: 1, marginTop: '8px' }}>
        <p style={{ fontSize: '13px', color: '#333', marginBottom: '12px' }}>Set below details</p>
        
        {loading ? (
          <div style={{ padding: '20px', color: '#64748b', fontSize: '13px' }}>Loading settings...</div>
        ) : (
          <>
            <div style={{ border: '1px solid #e2e8f0', borderRadius: '2px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                <thead>
                  <tr style={{ background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
                    {firstColumnLabel && (
                      <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: '#333', borderRight: '1px solid #e2e8f0' }}>
                        {firstColumnLabel}
                      </th>
                    )}
                    <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: '#333', borderRight: '1px solid #e2e8f0' }}>Prefix</th>
                    <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: '#333', borderRight: '1px solid #e2e8f0' }}>Lead Zero</th>
                    <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: '#333', borderRight: '1px solid #e2e8f0' }}>RCPT No. Start</th>
                    <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: '#333' }}>Suffix</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => {
                    const rState = rowStates[`${selectedOption}_${row.id}`] || {};
                    return (
                      <tr key={row.id} style={{ borderBottom: index === rows.length - 1 ? 'none' : '1px solid #e2e8f0' }}>
                        {firstColumnLabel && (
                          <td style={{ padding: '8px 12px', color: '#333', borderRight: '1px solid #e2e8f0', verticalAlign: 'middle', maxWidth: '200px', wordWrap: 'break-word' }}>
                            {row.label}
                          </td>
                        )}
                        <td style={{ padding: '8px', borderRight: '1px solid #e2e8f0' }}>
                          <input 
                            type="text" 
                            value={rState.prefix || ''}
                            onChange={e => handleInputChange(row.id, 'prefix', e.target.value)}
                            placeholder="Enter Prefix" 
                            style={{ width: '100%', padding: '6px 8px', border: '1px solid #e2e8f0', borderRadius: '2px', outline: 'none', fontSize: '12px' }} 
                          />
                        </td>
                        <td style={{ padding: '8px', borderRight: '1px solid #e2e8f0' }}>
                          <input 
                            type="number" 
                            value={rState.leadZero || ''}
                            onChange={e => handleInputChange(row.id, 'leadZero', e.target.value)}
                            placeholder="Lead Zero" 
                            style={{ width: '100%', padding: '6px 8px', border: '1px solid #e2e8f0', borderRadius: '2px', outline: 'none', fontSize: '12px' }} 
                          />
                        </td>
                        <td style={{ padding: '8px', borderRight: '1px solid #e2e8f0' }}>
                          <input 
                            type="number" 
                            value={rState.rcptNoStart || ''}
                            onChange={e => handleInputChange(row.id, 'rcptNoStart', e.target.value)}
                            style={{ width: '100%', padding: '6px 8px', border: '1px solid #e2e8f0', borderRadius: '2px', outline: 'none', fontSize: '12px' }} 
                          />
                        </td>
                        <td style={{ padding: '8px' }}>
                          <input 
                            type="text" 
                            value={rState.suffix || ''}
                            onChange={e => handleInputChange(row.id, 'suffix', e.target.value)}
                            placeholder={selectedOption === 'School Wise Receipt' ? 'Enter Postfix' : 'Enter Suffix'} 
                            style={{ width: '100%', padding: '6px 8px', border: '1px solid #e2e8f0', borderRadius: '2px', outline: 'none', fontSize: '12px' }} 
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Update Button */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
              <button 
                onClick={handleUpdate}
                disabled={submitting}
                style={{ 
                  backgroundColor: submitting ? '#9ca3af' : '#29a9d8', color: '#fff', border: 'none', padding: '8px 24px', 
                  borderRadius: '4px', cursor: submitting ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 500
                }}>
                <RefreshCw size={14} /> {submitting ? 'Updating...' : 'Update'}
              </button>
            </div>
          </>
        )}
      </div>

    </div>
  );
}
