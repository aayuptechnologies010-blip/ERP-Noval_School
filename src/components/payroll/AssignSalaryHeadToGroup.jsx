import React, { useState, useEffect } from 'react';
import { Save, RefreshCw } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function AssignSalaryHeadToGroup() {
  const [groups, setGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState('');
  const [allHeads, setAllHeads] = useState([]);
  const [groupHeads, setGroupHeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  useEffect(() => {
    const initData = async () => {
      try {
        setLoading(true);
        const [gRes, hRes] = await Promise.all([
          fetch(`${API_BASE}/api/salary-groups`, { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch(`${API_BASE}/api/salary-heads`, { headers: { 'Authorization': `Bearer ${token}` } })
        ]);

        if (gRes.ok && hRes.ok) {
          const gData = await gRes.json();
          const hData = await hRes.json();
          setGroups(gData);
          setAllHeads(hData);

          if (gData.length > 0) {
            setSelectedGroupId(gData[0]._id);
            mapHeadsForGroup(gData[0], hData);
          }
        }
      } catch (err) {
        console.error('Error initializing group heads:', err);
      } finally {
        setLoading(false);
      }
    };
    initData();
  }, []);

  const mapHeadsForGroup = (group, headsList) => {
    const list = headsList || allHeads;
    const existingHeads = group.heads || [];

    const mapped = list.map((h, i) => {
      const found = existingHeads.find(eh => 
        (eh.headId && eh.headId === h._id) || (eh.headName && eh.headName === h.head)
      );
      return {
        id: i + 1,
        headId: h._id,
        headName: h.head,
        val: found ? found.val : h.val || '0.00',
        vType: h.vType || 'Fixed',
        selected: found ? !!found.selected : false
      };
    });

    setGroupHeads(mapped);
  };

  const handleGroupChange = (groupId) => {
    setSelectedGroupId(groupId);
    const g = groups.find(x => x._id === groupId);
    if (g) {
      mapHeadsForGroup(g, allHeads);
    }
  };

  const handleToggleCheck = (index) => {
    const updated = [...groupHeads];
    updated[index].selected = !updated[index].selected;
    setGroupHeads(updated);
  };

  const handleValueChange = (index, val) => {
    const updated = [...groupHeads];
    updated[index].val = val;
    setGroupHeads(updated);
  };

  const handleSave = async () => {
    if (!selectedGroupId) {
      alert('Please select a Salary Group');
      return;
    }

    try {
      setSaving(true);
      const res = await fetch(`${API_BASE}/api/salary-groups/${selectedGroupId}/heads`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ heads: groupHeads })
      });

      if (res.ok) {
        alert('Salary heads assigned to group successfully!');
        // Refresh groups
        const gRes = await fetch(`${API_BASE}/api/salary-groups`, { headers: { 'Authorization': `Bearer ${token}` } });
        if (gRes.ok) {
          const gData = await gRes.json();
          setGroups(gData);
        }
      } else {
        const err = await res.json();
        alert(err.message || 'Failed to save group heads');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving group heads');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mail-template-container">
      <div style={{ padding: '20px', borderBottom: '1px solid #dee2e6', marginBottom: '20px', backgroundColor: '#fcfcfc' }}>
        <div style={{ width: '320px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', color: '#495057' }}>
            Salary Group
          </label>
          <select
            className="settings-input"
            style={{ width: '100%', padding: '8px 12px' }}
            value={selectedGroupId}
            onChange={(e) => handleGroupChange(e.target.value)}
          >
            {groups.map(g => (
              <option key={g._id} value={g._id}>
                {g.groupName} (GP: {g.gradePay})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mail-table-wrapper" style={{ borderTop: 'none', borderRadius: '0' }}>
        <table className="mail-table">
          <thead>
            <tr>
              <th style={{ width: '60px', textAlign: 'center' }}>Sl. No.</th>
              <th style={{ width: '60px', textAlign: 'center' }}>Select</th>
              <th>Head Name</th>
              <th style={{ width: '200px' }}>Value/Percentage</th>
              <th style={{ width: '180px' }}>ValueType</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: '#6c757d' }}>
                  Loading heads...
                </td>
              </tr>
            ) : groupHeads.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: '#6c757d' }}>
                  No salary heads available
                </td>
              </tr>
            ) : (
              groupHeads.map((row, i) => (
                <tr key={row.headId || i} className={i % 2 === 0 ? 'row-even' : 'row-odd'}>
                  <td style={{ textAlign: 'center' }}>{row.id}</td>
                  <td style={{ textAlign: 'center' }}>
                    <input
                      type="checkbox"
                      checked={!!row.selected}
                      onChange={() => handleToggleCheck(i)}
                      style={{ transform: 'scale(1.2)', cursor: 'pointer' }}
                    />
                  </td>
                  <td style={{ fontWeight: row.selected ? 'bold' : 'normal', color: row.selected ? '#159BD7' : 'inherit' }}>
                    {row.headName}
                  </td>
                  <td>
                    <input
                      type="text"
                      className="settings-input"
                      value={row.val}
                      onChange={(e) => handleValueChange(i, e.target.value)}
                      style={{ width: '120px', padding: '4px 8px' }}
                    />
                  </td>
                  <td>{row.vType}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px', marginTop: '20px', borderTop: '1px solid #dee2e6' }}>
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
            fontWeight: 'bold'
          }}
        >
          {saving ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />} Save Heads to Group
        </button>
      </div>
    </div>
  );
}
