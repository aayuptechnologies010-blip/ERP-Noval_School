import React, { useState, useEffect } from 'react';
import { Save, Eye, Printer, XCircle, Trash2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function LateFeeSettingHeadWise() {
  const [groupsOpt, setGroupsOpt] = useState([{ _id: 'All', name: 'All Groups' }]);
  const [feeTypesOpt, setFeeTypesOpt] = useState([]);
  const [installmentsOpt, setInstallmentsOpt] = useState([{ _id: 'All', name: 'Select All' }]);
  const [headsOpt, setHeadsOpt] = useState([]);

  const [selectedGroup, setSelectedGroup] = useState('All');
  const [selectedFeeType, setSelectedFeeType] = useState('');
  const [selectedInstallment, setSelectedInstallment] = useState('All');
  const [selectedHead, setSelectedHead] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [lateFeeType, setLateFeeType] = useState('Fixed');
  const [amount, setAmount] = useState(0.0);

  const [settingsList, setSettingsList] = useState([]);
  const [showTable, setShowTable] = useState(false);

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
        
        const [gRes, ftRes, instRes, hRes] = await Promise.all([
          fetch(`${API_URL}/api/fee-groups`, { headers }),
          fetch(`${API_URL}/api/fee-types`, { headers }),
          fetch(`${API_URL}/api/fee-installments`, { headers }),
          fetch(`${API_URL}/api/fee-heads`, { headers })
        ]);

        if (gRes.ok) {
          const gs = await gRes.json();
          setGroupsOpt([{ _id: 'All', name: 'All Groups' }, ...gs]);
        }
        if (ftRes.ok) {
          const fts = await ftRes.json();
          setFeeTypesOpt(fts);
          if (fts.length > 0) setSelectedFeeType(fts[0]._id);
        }
        if (instRes.ok) {
          const insts = await instRes.json();
          setInstallmentsOpt([{ _id: 'All', name: 'Select All' }, ...insts]);
        }
        if (hRes.ok) {
          const hs = await hRes.json();
          setHeadsOpt(hs);
          if (hs.length > 0) setSelectedHead(hs[0]._id);
        }
      } catch (error) {
        console.error('Error fetching dropdowns:', error);
      }
    };
    fetchDropdowns();
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/fee-master-settings/LATE_FEE_SETTINGS_HEAD_WISE`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data)) setSettingsList(data);
      }
    } catch (error) {
      console.error('Error fetching head-wise late fee settings:', error);
    }
  };

  const handleSave = async () => {
    if (!selectedFeeType || !dueDate || !selectedHead) {
      showToast('Please fill all required fields', 'error');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const newSetting = {
        id: Date.now().toString(),
        groupId: selectedGroup,
        feeTypeId: selectedFeeType,
        installmentId: selectedInstallment,
        headId: selectedHead,
        dueDate,
        lateFeeType,
        amount: Number(amount)
      };

      const existingIndex = settingsList.findIndex(
        s => s.groupId === selectedGroup && s.feeTypeId === selectedFeeType && s.installmentId === selectedInstallment && s.headId === selectedHead
      );
      let updatedList = [...settingsList];
      if (existingIndex >= 0) {
        updatedList[existingIndex] = newSetting;
      } else {
        updatedList.push(newSetting);
      }

      const res = await fetch(`${API_URL}/api/fee-master-settings/LATE_FEE_SETTINGS_HEAD_WISE`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatedList)
      });

      if (res.ok) {
        showToast('Setting Saved');
        setSettingsList(updatedList);
      } else {
        showToast('Error saving setting', 'error');
      }
    } catch (error) {
      showToast('Network error', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this setting?')) return;
    try {
      const token = localStorage.getItem('token');
      const updatedList = settingsList.filter(s => s.id !== id);
      
      const res = await fetch(`${API_URL}/api/fee-master-settings/LATE_FEE_SETTINGS_HEAD_WISE`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatedList)
      });

      if (res.ok) {
        showToast('Setting Deleted');
        setSettingsList(updatedList);
      }
    } catch (error) {
      showToast('Network error', 'error');
    }
  };

  const handleReset = () => {
    setSelectedGroup('All');
    setSelectedInstallment('All');
    if (headsOpt.length > 0) setSelectedHead(headsOpt[0]._id);
    setDueDate('');
    setLateFeeType('Fixed');
    setAmount(0.0);
  };

  return (
    <div style={{ padding: '40px', background: '#fff', minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
      
      {toastMessage && (
        <div style={{ position: 'absolute', top: '24px', right: '24px', backgroundColor: toastType === 'success' ? '#4ade80' : '#ef4444', color: '#fff', padding: '12px 24px', borderRadius: '4px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', zIndex: 1000, fontWeight: 500, fontSize: '14px' }}>
          {toastMessage}
        </div>
      )}

      <div style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '30px' }}>
        
        <div style={{ display: 'flex', gap: '30px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>Fee Group</label>
            <select value={selectedGroup} onChange={e => setSelectedGroup(e.target.value)} style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }}>
              {groupsOpt.map(g => <option key={g._id} value={g._id}>{g.name}</option>)}
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>Fee Type</label>
            <select value={selectedFeeType} onChange={e => setSelectedFeeType(e.target.value)} style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }}>
              {feeTypesOpt.map(f => <option key={f._id} value={f._id}>{f.name}</option>)}
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '30px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>Installment</label>
            <select value={selectedInstallment} onChange={e => setSelectedInstallment(e.target.value)} style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }}>
              {installmentsOpt.map(i => <option key={i._id} value={i._id}>{i.name}</option>)}
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>Head</label>
            <select value={selectedHead} onChange={e => setSelectedHead(e.target.value)} style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }}>
              {headsOpt.map(h => <option key={h._id} value={h._id}>{h.name}</option>)}
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '30px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>Due Date</label>
            <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>Late Fee Type</label>
            <select value={lateFeeType} onChange={e => setLateFeeType(e.target.value)} style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }}>
              <option value="Fixed">Fixed Amount</option>
              <option value="PerDay">Per Day</option>
              <option value="Percentage">Percentage</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '30px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>Amount</label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }} />
          </div>
          <div style={{ flex: 1 }}></div>
        </div>

      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '40px' }}>
        <button onClick={handleSave} style={{ background: '#fff', color: '#4ade80', border: '1px solid #4ade80', padding: '6px 16px', borderRadius: '4px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
          <Save size={14} /> Save
        </button>
        <button onClick={() => setShowTable(!showTable)} style={{ background: '#fff', color: '#3b82f6', border: '1px solid #3b82f6', padding: '6px 16px', borderRadius: '4px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
          <Eye size={14} /> View
        </button>
        <button onClick={handleReset} style={{ background: '#fff', color: '#f59e0b', border: '1px solid #f59e0b', padding: '6px 16px', borderRadius: '4px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
          <XCircle size={14} /> Reset
        </button>
      </div>

      {showTable && (
        <div style={{ width: '100%', maxWidth: '900px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #e2e8f0', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333' }}>Group</th>
                <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333' }}>Fee Type</th>
                <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333' }}>Installment</th>
                <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333' }}>Head</th>
                <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333' }}>Due Date</th>
                <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333' }}>Type</th>
                <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333' }}>Amount</th>
                <th style={{ padding: '12px', textAlign: 'center', color: '#333' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {settingsList.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>No Late Fee Settings Found</td>
                </tr>
              ) : (
                settingsList.map((row) => {
                  const gName = groupsOpt.find(g => g._id === row.groupId)?.name || row.groupId;
                  const fName = feeTypesOpt.find(f => f._id === row.feeTypeId)?.name || row.feeTypeId;
                  const iName = installmentsOpt.find(i => i._id === row.installmentId)?.name || row.installmentId;
                  const hName = headsOpt.find(h => h._id === row.headId)?.name || row.headId;
                  
                  return (
                    <tr key={row.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '10px 12px', color: '#333' }}>{gName}</td>
                      <td style={{ padding: '10px 12px', color: '#333' }}>{fName}</td>
                      <td style={{ padding: '10px 12px', color: '#333' }}>{iName}</td>
                      <td style={{ padding: '10px 12px', color: '#333' }}>{hName}</td>
                      <td style={{ padding: '10px 12px', color: '#333' }}>{new Date(row.dueDate).toLocaleDateString()}</td>
                      <td style={{ padding: '10px 12px', color: '#333' }}>{row.lateFeeType}</td>
                      <td style={{ padding: '10px 12px', color: '#333' }}>{row.amount}</td>
                      <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                        <Trash2 size={14} color="#ef4444" style={{ cursor: 'pointer' }} onClick={() => handleDelete(row.id)} />
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
