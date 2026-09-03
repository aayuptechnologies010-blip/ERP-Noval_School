import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function DefineFeeHeadConcession() {
  const [concessionsOpt, setConcessionsOpt] = useState([]);
  const [installmentsOpt, setInstallmentsOpt] = useState([{ _id: 'All', name: 'Select All' }]);

  const [concession, setConcession] = useState('');
  const [installment, setInstallment] = useState('All');
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
        
        const [conRes, instRes] = await Promise.all([
          fetch(`${API_URL}/api/concessions`, { headers }),
          fetch(`${API_URL}/api/fee-installments`, { headers })
        ]);

        if (conRes.ok) setConcessionsOpt(await conRes.json());
        if (instRes.ok) {
          const insts = await instRes.json();
          setInstallmentsOpt([{ _id: 'All', name: 'Select All' }, ...insts]);
        }
      } catch (error) {
        console.error('Error fetching dropdowns:', error);
      }
    };
    fetchDropdowns();
  }, []);

  const fetchMapping = async (conId, instId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/fee-head-concessions?concessionId=${conId}&installmentId=${instId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.concessions) {
          setTableData(data.concessions.map(c => ({
            _id: c.feeHead._id,
            feeHead: c.feeHead.name || 'Unknown',
            amount: c.amount,
            isPercent: c.isPercent,
            checked: c.checked
          })));
        } else {
          setTableData([]);
        }
      }
    } catch (error) {
      console.error('Error fetching mapping:', error);
    }
  };

  useEffect(() => {
    if (concession) {
      fetchMapping(concession, installment);
    } else {
      setTableData([]);
    }
  }, [concession, installment]);

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
    if (!concession) {
      showToast('Please select a Concession', 'error');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const checkedRows = tableData.filter(row => row.checked);
      const payload = {
        concession,
        installment,
        concessions: checkedRows.map(row => ({
          feeHead: row._id,
          amount: Number(row.amount),
          isPercent: row.isPercent
        }))
      };

      const res = await fetch(`${API_URL}/api/fee-head-concessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        showToast('Concession Mapping Saved');
      } else {
        const err = await res.json();
        showToast(err.message || 'Error saving', 'error');
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

      <div style={{ display: 'flex', gap: '30px', marginBottom: '30px', width: '600px', marginTop: '20px' }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>Concession</label>
          <select value={concession} onChange={e => setConcession(e.target.value)} style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }}>
            <option value="">--Select--</option>
            {concessionsOpt.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>Installment</label>
          <select value={installment} onChange={e => setInstallment(e.target.value)} style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }}>
            {installmentsOpt.map(i => <option key={i._id} value={i._id}>{i.name}</option>)}
          </select>
        </div>
      </div>

      <div style={{ width: '100%', maxWidth: '800px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', border: '1px solid #e5e7eb' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ textAlign: 'left', padding: '12px', width: '100px', borderRight: '1px solid #e5e7eb', background: '#f8fafc', color: '#333' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <input type="checkbox" onChange={handleSelectAll} />
                  <span style={{ fontWeight: 'normal', fontSize: '12px' }}>Select All</span>
                </div>
              </th>
              <th style={{ textAlign: 'left', padding: '12px', borderRight: '1px solid #e5e7eb', background: '#f8fafc', color: '#333' }}>Fee Head</th>
              <th style={{ textAlign: 'left', padding: '12px', borderRight: '1px solid #e5e7eb', background: '#f8fafc', color: '#333' }}>Amount</th>
              <th style={{ textAlign: 'left', padding: '12px', background: '#f8fafc', color: '#333' }}>IsPercent</th>
            </tr>
          </thead>
          <tbody>
            {tableData.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ padding: '20px', textAlign: 'center', color: '#666' }}>No Data (Select a Concession to load fee heads)</td>
              </tr>
            ) : (
              tableData.map((row, index) => (
                <tr key={row._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '10px 12px', textAlign: 'left', borderRight: '1px solid #e2e8f0' }}>
                    <input type="checkbox" checked={row.checked} onChange={e => handleRowChange(index, 'checked', e.target.checked)} />
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333' }}>{row.feeHead}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'left', borderRight: '1px solid #e2e8f0' }}>
                    <input type="number" value={row.amount} onChange={e => handleRowChange(index, 'amount', e.target.value)} style={{ padding: '6px', border: '1px solid #d1d5db', borderRadius: '4px', width: '100%' }} />
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'left' }}>
                    <input type="checkbox" checked={row.isPercent} onChange={e => handleRowChange(index, 'isPercent', e.target.checked)} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <button onClick={handleSave} style={{ marginTop: '40px', background: '#4ade80', color: '#fff', border: 'none', padding: '8px 24px', borderRadius: '4px', fontSize: '14px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
        <Save size={16} /> Save
      </button>

    </div>
  );
}
