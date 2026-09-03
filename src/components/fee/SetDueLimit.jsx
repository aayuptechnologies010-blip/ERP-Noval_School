import React, { useState, useEffect } from 'react';
import { Save, Eye, Printer, XCircle, Trash2, Edit } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function SetDueLimit() {
  const [classesOpt, setClassesOpt] = useState([{ _id: 'All', name: 'All Classes' }]);
  const [feeTypesOpt, setFeeTypesOpt] = useState([]);
  const [installmentsOpt, setInstallmentsOpt] = useState([{ _id: 'All', name: 'All' }]);

  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedFeeType, setSelectedFeeType] = useState('');
  const [lateFeeOnDue, setLateFeeOnDue] = useState('No');
  const [duesAmount, setDuesAmount] = useState(0);
  const [isPercent, setIsPercent] = useState(false);
  const [selectedInstallment, setSelectedInstallment] = useState('All');

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
        
        // Fetch fee types and installments
        const [ftRes, instRes] = await Promise.all([
          fetch(`${API_URL}/api/fee-types`, { headers }),
          fetch(`${API_URL}/api/fee-installments`, { headers })
        ]);

        if (ftRes.ok) {
          const fts = await ftRes.json();
          setFeeTypesOpt(fts);
          if(fts.length > 0) setSelectedFeeType(fts[0]._id);
        }
        if (instRes.ok) {
          const insts = await instRes.json();
          setInstallmentsOpt([{ _id: 'All', name: 'All' }, ...insts]);
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
      const res = await fetch(`${API_URL}/api/fee-master-settings/DUE_LIMIT_SETTINGS`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data)) {
          setSettingsList(data);
        }
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const handleSave = async () => {
    if (!selectedFeeType) {
      showToast('Please select a Fee Type', 'error');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      
      const newSetting = {
        id: Date.now().toString(),
        classId: selectedClass,
        feeTypeId: selectedFeeType,
        lateFeeOnDue: lateFeeOnDue === 'Yes',
        duesAmount: Number(duesAmount),
        isPercent,
        installmentId: selectedInstallment
      };

      // Check if exists and update, or push new
      const existingIndex = settingsList.findIndex(s => s.classId === selectedClass && s.feeTypeId === selectedFeeType);
      let updatedList = [...settingsList];
      
      if (existingIndex >= 0) {
        updatedList[existingIndex] = newSetting;
      } else {
        updatedList.push(newSetting);
      }

      const res = await fetch(`${API_URL}/api/fee-master-settings/DUE_LIMIT_SETTINGS`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatedList)
      });

      if (res.ok) {
        showToast('Due Limit Saved');
        setSettingsList(updatedList);
      } else {
        showToast('Error saving setting', 'error');
      }
    } catch (error) {
      showToast('Network error', 'error');
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm('Delete this setting?')) return;
    try {
      const token = localStorage.getItem('token');
      const updatedList = settingsList.filter(s => s.id !== id);
      
      const res = await fetch(`${API_URL}/api/fee-master-settings/DUE_LIMIT_SETTINGS`, {
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
    setSelectedClass('All');
    setLateFeeOnDue('No');
    setDuesAmount(0);
    setIsPercent(false);
    setSelectedInstallment('All');
  };

  return (
    <div style={{ padding: '40px', background: '#fff', minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
      
      {toastMessage && (
        <div style={{ position: 'absolute', top: '24px', right: '24px', backgroundColor: toastType === 'success' ? '#4ade80' : '#ef4444', color: '#fff', padding: '12px 24px', borderRadius: '4px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', zIndex: 1000, fontWeight: 500, fontSize: '14px' }}>
          {toastMessage}
        </div>
      )}

      <div style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '30px', marginBottom: '40px' }}>
        
        <div style={{ display: 'flex', gap: '40px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>Class</label>
            <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }}>
              {classesOpt.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>Fee Type</label>
            <select value={selectedFeeType} onChange={e => setSelectedFeeType(e.target.value)} style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }}>
              {feeTypesOpt.map(f => <option key={f._id} value={f._id}>{f.name}</option>)}
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '40px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>Late Fee on Due</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: '#374151', cursor: 'pointer' }}>
                <input type="radio" name="lateFeeOnDue" checked={lateFeeOnDue === 'Yes'} onChange={() => setLateFeeOnDue('Yes')} /> Yes
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: '#374151', cursor: 'pointer' }}>
                <input type="radio" name="lateFeeOnDue" checked={lateFeeOnDue === 'No'} onChange={() => setLateFeeOnDue('No')} /> No
              </label>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>Dues Amount</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <input type="number" value={duesAmount} onChange={e => setDuesAmount(e.target.value)} style={{ width: '100px', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }} />
              <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: '#374151', cursor: 'pointer' }}>
                <input type="checkbox" checked={isPercent} onChange={e => setIsPercent(e.target.checked)} /> %
              </label>
              <select value={selectedInstallment} onChange={e => setSelectedInstallment(e.target.value)} style={{ width: '120px', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }}>
                {installmentsOpt.map(i => <option key={i._id} value={i._id}>{i.name}</option>)}
              </select>
            </div>
          </div>
        </div>

      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '40px' }}>
        <button onClick={handleSave} style={{ background: '#fff', color: '#4ade80', border: '1px solid #4ade80', padding: '6px 16px', borderRadius: '4px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
          <Save size={14} /> Save
        </button>
        <button onClick={() => setShowTable(!showTable)} style={{ background: '#fff', color: '#3b82f6', border: '1px solid #3b82f6', padding: '6px 16px', borderRadius: '4px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
          <Eye size={14} /> View
        </button>
        <button style={{ background: '#fff', color: '#f59e0b', border: '1px solid #f59e0b', padding: '6px 16px', borderRadius: '4px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
          <XCircle size={14} /> Reset
        </button>
      </div>

      {showTable && (
        <div style={{ width: '100%', maxWidth: '800px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #e2e8f0', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333' }}>Class</th>
                <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333' }}>Late Fee On Due</th>
                <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333' }}>Dues Amount</th>
                <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333' }}>Installment</th>
                <th style={{ padding: '12px', textAlign: 'center', color: '#333' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {settingsList.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>No Due Limits Set</td>
                </tr>
              ) : (
                settingsList.map((row) => {
                  const instName = installmentsOpt.find(i => i._id === row.installmentId)?.name || row.installmentId;
                  const className = classesOpt.find(c => c._id === row.classId)?.name || row.classId;
                  
                  return (
                    <tr key={row.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '10px 12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333' }}>{className}</td>
                      <td style={{ padding: '10px 12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333' }}>{row.lateFeeOnDue ? 'Yes' : 'No'}</td>
                      <td style={{ padding: '10px 12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333' }}>{row.duesAmount} {row.isPercent ? '%' : ''}</td>
                      <td style={{ padding: '10px 12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333' }}>{instName}</td>
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
