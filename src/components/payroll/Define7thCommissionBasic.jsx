import React, { useState, useEffect } from 'react';
import { Eye, X, Save, RefreshCw, Calculator, AlertCircle, CheckCircle } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function Define7thCommissionBasic() {
  const [levels, setLevels] = useState([]);
  const [selectedLevelId, setSelectedLevelId] = useState('');
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [cells, setCells] = useState([]);
  const [hasViewed, setHasViewed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Status notification
  const [statusMessage, setStatusMessage] = useState(null);

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  const showNotification = (type, text) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  // Load levels
  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/cpc-levels`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setLevels(Array.isArray(data) ? data : []);
          if (Array.isArray(data) && data.length > 0) {
            setSelectedLevelId(data[0]._id);
          }
        }
      } catch (err) {
        console.error('Error loading CPC levels:', err);
      }
    };
    fetchLevels();
  }, []);

  const handleView = () => {
    if (!selectedLevelId) {
      showNotification('error', 'Please select a 7th CPC Level.');
      return;
    }

    const lvl = levels.find(l => l._id === selectedLevelId);
    if (!lvl) {
      showNotification('error', 'Selected Level not found.');
      return;
    }

    setSelectedLevel(lvl);

    const totalCells = lvl.noOfCells || 40;
    const existingCells = lvl.cells || [];

    // Initialize 40 cells
    const cellList = [];
    let currentAmount = lvl.amount || 18000;

    for (let i = 1; i <= totalCells; i++) {
      const found = existingCells.find(c => c.cellNo === i);
      if (found && found.amount) {
        cellList.push({ cellNo: i, amount: found.amount });
      } else {
        // Fallback: 3% increment rounded to next 100
        if (i === 1) {
          cellList.push({ cellNo: 1, amount: currentAmount });
        } else {
          currentAmount = Math.round((currentAmount * 1.03) / 100) * 100;
          cellList.push({ cellNo: i, amount: currentAmount });
        }
      }
    }

    setCells(cellList);
    setHasViewed(true);
  };

  const handleReset = () => {
    if (levels.length > 0) setSelectedLevelId(levels[0]._id);
    setSelectedLevel(null);
    setCells([]);
    setHasViewed(false);
    setStatusMessage(null);
  };

  const handleCellAmountChange = (cellNo, newAmount) => {
    setCells(prev => prev.map(c => c.cellNo === cellNo ? { ...c, amount: Number(newAmount) || 0 } : c));
  };

  // Auto calculate 3% compounding for all cells starting from cell 1
  const handleAutoCalculate = () => {
    if (cells.length === 0) return;
    const base = cells[0].amount || selectedLevel?.amount || 18000;
    let curr = base;
    const updated = cells.map((c, idx) => {
      if (idx === 0) return { ...c, amount: base };
      curr = Math.round((curr * 1.03) / 100) * 100;
      return { ...c, amount: curr };
    });
    setCells(updated);
    showNotification('success', 'Calculated 3% compound annual increment for all cells!');
  };

  const handleSaveCells = async () => {
    if (!selectedLevel) return;

    try {
      setSaving(true);
      const res = await fetch(`${API_BASE}/api/cpc-levels/${selectedLevel._id}/cells`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ cells })
      });

      if (res.ok) {
        const updatedLevel = await res.json();
        // Update local levels state
        setLevels(prev => prev.map(l => l._id === updatedLevel._id ? updatedLevel : l));
        showNotification('success', `Pay matrix cells for "${selectedLevel.cpcLevel}" saved successfully!`);
      } else {
        const err = await res.json();
        showNotification('error', err.message || 'Failed to save cell values.');
      }
    } catch (err) {
      console.error('Error saving matrix cells:', err);
      showNotification('error', 'Server error while saving.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mail-template-container" style={{ padding: '20px' }}>
      {/* Alert Notification */}
      {statusMessage && (
        <div style={{
          padding: '12px 20px',
          borderRadius: '6px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          backgroundColor: statusMessage.type === 'success' ? '#e8f5e9' : '#ffebee',
          color: statusMessage.type === 'success' ? '#2e7d32' : '#c62828',
          border: `1px solid ${statusMessage.type === 'success' ? '#a5d6a7' : '#ef9a9a'}`
        }}>
          {statusMessage.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          <span style={{ fontSize: '14px', fontWeight: '500' }}>{statusMessage.text}</span>
        </div>
      )}

      {/* Filter Section */}
      <div className="global-settings-container" style={{ maxWidth: '650px', margin: '0 auto', background: '#f8fafc', padding: '24px 32px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        <div className="form-group" style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>
            7th CPC Level <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <select 
            className="settings-input"
            value={selectedLevelId}
            onChange={(e) => setSelectedLevelId(e.target.value)}
            style={{ padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }}
          >
            <option value="">Select Level Name</option>
            {levels.map(l => (
              <option key={l._id} value={l._id}>
                {l.cpcLevel} (Basic: ₹{l.amount.toLocaleString()}, Cells: {l.noOfCells || 40})
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '15px' }}>
          <button 
            onClick={handleView}
            style={{ 
              backgroundColor: 'white', 
              color: '#159BD7', 
              border: '1px solid #159BD7', 
              padding: '8px 24px', 
              borderRadius: '6px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              fontWeight: '600',
              cursor: 'pointer' 
            }}
          >
            <Eye size={16} /> View
          </button>
          <button 
            onClick={handleReset}
            style={{ 
              backgroundColor: 'white', 
              color: '#ff9800', 
              border: '1px solid #ff9800', 
              padding: '8px 24px', 
              borderRadius: '6px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              fontWeight: '600',
              cursor: 'pointer' 
            }}
          >
            <X size={16} /> Reset
          </button>
        </div>
      </div>

      {/* Pay Matrix Cells View */}
      {hasViewed && selectedLevel && (
        <div style={{ marginTop: '30px', background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '24px' }}>
          {/* Header Info & Action Controls */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '15px',
            paddingBottom: '15px',
            borderBottom: '1px solid #e2e8f0'
          }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#1e293b' }}>
                Pay Matrix: {selectedLevel.cpcLevel}
              </h3>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748b' }}>
                Base Amount: <strong>₹{selectedLevel.amount.toLocaleString()}</strong> | Order: <strong>{selectedLevel.orderNo}</strong> | Total Cells: <strong>{cells.length}</strong>
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={handleAutoCalculate}
                style={{
                  backgroundColor: '#f1f5f9',
                  color: '#0284c7',
                  border: '1px solid #cbd5e1',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                <Calculator size={15} /> Auto-Increment (3%)
              </button>

              <button
                onClick={handleSaveCells}
                disabled={saving}
                style={{
                  backgroundColor: '#159BD7',
                  color: 'white',
                  border: 'none',
                  padding: '8px 22px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: saving ? 'not-allowed' : 'pointer',
                  opacity: saving ? 0.7 : 1,
                  boxShadow: '0 2px 4px rgba(21, 155, 215, 0.25)'
                }}
              >
                <Save size={15} /> {saving ? 'Saving...' : 'Save Matrix Cells'}
              </button>
            </div>
          </div>

          {/* Cells Grid (4 columns of 10 cells each = 40 cells) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '12px'
          }}>
            {cells.map(cell => (
              <div 
                key={cell.cellNo}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  overflow: 'hidden'
                }}
              >
                <div style={{
                  padding: '10px 14px',
                  backgroundColor: '#e2e8f0',
                  color: '#334155',
                  fontWeight: '700',
                  fontSize: '12px',
                  minWidth: '65px',
                  textAlign: 'center'
                }}>
                  Cell {cell.cellNo}
                </div>
                <div style={{ padding: '6px 10px', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontSize: '13px', color: '#64748b' }}>₹</span>
                    <input 
                      type="number"
                      value={cell.amount}
                      onChange={(e) => handleCellAmountChange(cell.cellNo, e.target.value)}
                      style={{
                        width: '100%',
                        border: '1px solid #cbd5e1',
                        borderRadius: '4px',
                        padding: '4px 8px',
                        fontSize: '13px',
                        fontWeight: '600',
                        color: '#0f172a',
                        backgroundColor: '#fff'
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
