import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function FeeGroupToFeeHead() {
  const [feeGroups, setFeeGroups] = useState([]);
  const [feeHeads, setFeeHeads] = useState([]);
  const [installments, setInstallments] = useState([]);
  
  const [selectedGroup, setSelectedGroup] = useState('');
  const [tableData, setTableData] = useState([]);

  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const showToast = (msg, type = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(''), 3000);
  };

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        
        const [groupsRes, headsRes, instRes] = await Promise.all([
          fetch(`${API_URL}/api/fee-groups`, { headers }),
          fetch(`${API_URL}/api/fee-heads`, { headers }),
          fetch(`${API_URL}/api/fee-installments`, { headers })
        ]);

        if (groupsRes.ok) setFeeGroups(await groupsRes.json());
        if (headsRes.ok) setFeeHeads(await headsRes.json());
        if (instRes.ok) setInstallments(await instRes.json());
      } catch (error) {
        console.error('Error fetching dropdowns:', error);
      }
    };
    fetchDropdowns();
  }, []);

  const fetchMapping = async (groupId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/fee-group-to-heads/${groupId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const mapping = await res.json();
        const mappedDict = {};
        if (mapping && mapping.mappedHeads) {
          mapping.mappedHeads.forEach(item => {
            // feeHead could be populated or just ID. Let's assume populated.
            const headId = typeof item.feeHead === 'object' ? item.feeHead._id : item.feeHead;
            const instId = typeof item.installment === 'object' && item.installment ? item.installment._id : item.installment;
            mappedDict[headId] = {
              checked: item.checked,
              installment: instId || '',
              feeAccount: item.feeAccount || '',
              feePostAccount: item.feePostAccount || ''
            };
          });
        }
        
        // Merge with all fee heads
        const formattedData = feeHeads.map(head => ({
          _id: head._id,
          name: head.name,
          type: head.type,
          checked: mappedDict[head._id] ? mappedDict[head._id].checked : false,
          installment: mappedDict[head._id] ? mappedDict[head._id].installment : '',
          feeAccount: mappedDict[head._id] ? mappedDict[head._id].feeAccount : '',
          feePostAccount: mappedDict[head._id] ? mappedDict[head._id].feePostAccount : ''
        }));

        setTableData(formattedData);
      }
    } catch (error) {
      console.error('Error fetching mapping:', error);
    }
  };

  const handleGroupChange = (e) => {
    const val = e.target.value;
    setSelectedGroup(val);
    if (val) {
      fetchMapping(val);
    } else {
      setTableData([]);
    }
  };

  const handleRowChange = (index, field, value) => {
    const newData = [...tableData];
    newData[index][field] = value;
    setTableData(newData);
  };

  const handleSelectAll = (e) => {
    const checked = e.target.checked;
    const newData = tableData.map(row => ({ ...row, checked }));
    setTableData(newData);
  };

  const handleSave = async () => {
    if (!selectedGroup) {
      showToast('Please select a Fee Group', 'error');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const mappedHeads = tableData.map(row => ({
        feeHead: row._id,
        installment: row.installment || null,
        feeAccount: row.feeAccount,
        feePostAccount: row.feePostAccount,
        checked: row.checked
      }));

      const res = await fetch(`${API_URL}/api/fee-group-to-heads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ feeGroup: selectedGroup, mappedHeads })
      });

      if (res.ok) {
        showToast('Mapping Saved Successfully');
      } else {
        showToast('Error saving mapping', 'error');
      }
    } catch (error) {
      showToast('Network error', 'error');
    }
  };

  return (
    <div style={{ padding: '24px', background: '#fff', minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
      
      {toastMessage && (
        <div style={{ position: 'absolute', top: '24px', right: '24px', backgroundColor: toastType === 'success' ? '#4ade80' : '#ef4444', color: '#fff', padding: '12px 24px', borderRadius: '4px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', zIndex: 1000, fontWeight: 500, fontSize: '14px' }}>
          {toastMessage}
        </div>
      )}

      <div style={{ width: '100%', maxWidth: '1000px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        <div style={{ width: '400px', margin: '0 auto' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#333', marginBottom: '8px' }}>Fee Group</label>
          <select 
            value={selectedGroup} 
            onChange={handleGroupChange}
            style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px', color: '#333', outline: 'none' }}
          >
            <option value="">Select Fee Group</option>
            {feeGroups.map(g => <option key={g._id} value={g._id}>{g.name}</option>)}
          </select>
        </div>

        {selectedGroup && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #e2e8f0', fontSize: '13px' }}>
              <thead>
                <tr style={{ backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#333', fontWeight: 600, width: '60px' }}>Sr. No.</th>
                  <th style={{ padding: '12px', textAlign: 'center', color: '#333', fontWeight: 600, width: '80px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                      <input type="checkbox" onChange={handleSelectAll} />
                      <span style={{ fontSize: '10px' }}>Select All</span>
                    </div>
                  </th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#333', fontWeight: 600 }}>Fee Type</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#333', fontWeight: 600 }}>Fee Head</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#333', fontWeight: 600 }}>Schedule Type</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#333', fontWeight: 600 }}>Installment</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#333', fontWeight: 600 }}>Fee Account</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#333', fontWeight: 600 }}>Fee Post Account</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={row._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '10px 12px', textAlign: 'left', color: '#095484' }}>{index + 1}</td>
                    <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                      <input type="checkbox" checked={row.checked} onChange={(e) => handleRowChange(index, 'checked', e.target.checked)} />
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'left', color: '#333' }}>School Fee</td>
                    <td style={{ padding: '10px 12px', textAlign: 'left', color: '#333' }}>{row.name}</td>
                    <td style={{ padding: '10px 12px', textAlign: 'left', color: '#333' }}>{row.type}</td>
                    <td style={{ padding: '10px 12px', textAlign: 'left' }}>
                      <select value={row.installment} onChange={(e) => handleRowChange(index, 'installment', e.target.value)} style={{ padding: '6px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', width: '100%' }}>
                        <option value="">Select Install</option>
                        {installments.map(i => <option key={i._id} value={i._id}>{i.name}</option>)}
                      </select>
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'left' }}>
                      <input type="text" placeholder="Account" value={row.feeAccount} onChange={(e) => handleRowChange(index, 'feeAccount', e.target.value)} style={{ padding: '6px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', width: '100%' }} />
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'left' }}>
                      <input type="text" placeholder="Post Account" value={row.feePostAccount} onChange={(e) => handleRowChange(index, 'feePostAccount', e.target.value)} style={{ padding: '6px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', width: '100%' }} />
                    </td>
                  </tr>
                ))}
                {tableData.length === 0 && (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>No Fee Heads Found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {selectedGroup && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button onClick={handleSave} style={{ backgroundColor: '#4ade80', color: '#fff', border: 'none', padding: '8px 24px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 500 }}>
              <Save size={16} /> Save
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
