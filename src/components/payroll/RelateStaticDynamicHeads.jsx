import React, { useState, useEffect } from 'react';
import { Save, RefreshCw } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function RelateStaticDynamicHeads() {
  const [relations, setRelations] = useState([]);
  const [salaryHeads, setSalaryHeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const [relRes, headRes] = await Promise.all([
        fetch(`${API_BASE}/api/relate-static-dynamic-heads`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${API_BASE}/api/salary-heads`, { headers: { 'Authorization': `Bearer ${token}` } })
      ]);

      if (relRes.ok) {
        const relData = await relRes.json();
        setRelations(relData);
      }
      if (headRes.ok) {
        const headData = await headRes.json();
        setSalaryHeads(headData);
      }
    } catch (err) {
      console.error('Error loading static dynamic heads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDynamicHeadChange = (idx, value) => {
    const updated = [...relations];
    updated[idx] = { ...updated[idx], dynamicHead: value };
    setRelations(updated);
  };

  const handleSelectToggle = (idx, checked) => {
    const updated = [...relations];
    updated[idx] = { ...updated[idx], selected: checked };
    setRelations(updated);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const res = await fetch(`${API_BASE}/api/relate-static-dynamic-heads`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ relations })
      });

      if (res.ok) {
        alert('Static-Dynamic head relations saved successfully!');
        fetchData();
      } else {
        const err = await res.json();
        alert(err.message || 'Failed to save relations');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving relations');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mail-template-container">
      <div style={{ padding: '15px 20px', fontWeight: 'bold', fontSize: '14px', textTransform: 'uppercase', borderBottom: '1px solid #dee2e6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Relate Static Dynamic Heads</span>
        {loading && <span style={{ fontSize: '12px', color: '#6c757d', fontWeight: 'normal' }}>Loading mappings...</span>}
      </div>

      <div className="mail-table-wrapper" style={{ borderTop: 'none', borderRadius: '0' }}>
        <table className="mail-table">
          <thead>
            <tr>
              <th style={{ paddingLeft: '25px', width: '35%' }}>Static Head</th>
              <th style={{ width: '45%' }}>Dynamic Head</th>
              <th style={{ width: '20%', textAlign: 'center' }}>Select</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center', padding: '30px', color: '#6c757d' }}>
                  Loading relations...
                </td>
              </tr>
            ) : relations.length === 0 ? (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center', padding: '30px', color: '#6c757d' }}>
                  No relations found
                </td>
              </tr>
            ) : (
              relations.map((row, idx) => (
                <tr
                  key={row._id || idx}
                  style={{
                    backgroundColor: row.highlighted ? '#e3f2fd' : idx % 2 === 0 ? '#ffffff' : '#fafafa',
                    borderBottom: '1px solid #dee2e6'
                  }}
                >
                  <td style={{ paddingLeft: '25px', paddingRight: '20px', fontWeight: row.highlighted ? 'bold' : '500' }}>
                    {row.staticHead}
                  </td>
                  <td style={{ padding: '8px 20px' }}>
                    <select
                      className="settings-input"
                      style={{ width: '100%', padding: '6px 10px', borderRadius: '4px' }}
                      value={row.dynamicHead || 'NA'}
                      onChange={(e) => handleDynamicHeadChange(idx, e.target.value)}
                    >
                      <option value="NA">NA</option>
                      {salaryHeads.map(h => (
                        <option key={h._id} value={h.head}>
                          {h.head} ({h.type})
                        </option>
                      ))}
                    </select>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <input
                      type="checkbox"
                      checked={!!row.selected}
                      onChange={(e) => handleSelectToggle(idx, e.target.checked)}
                      style={{ transform: 'scale(1.1)', cursor: 'pointer' }}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px', borderTop: '1px solid #dee2e6' }}>
        <button
          onClick={handleSave}
          disabled={saving || loading}
          style={{
            backgroundColor: 'white',
            border: '1px solid #28a745',
            color: '#28a745',
            padding: '8px 25px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '13px'
          }}
        >
          {saving ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />} Save Mappings
        </button>
      </div>
    </div>
  );
}
