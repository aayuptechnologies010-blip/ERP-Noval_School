import React, { useState, useEffect } from 'react';
import FormField from './FormField';
import Select from './Select';
import Button from './Button';
import './styles.css';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function AssignAmountGroup({ setToast }) {
  const [feeGroupOptions, setFeeGroupOptions] = useState([{ value: '', label: 'Please Select' }]);
  const [installmentOptions, setInstallmentOptions] = useState([{ value: 'All', label: 'Select All' }]);
  
  const [feeGroup, setFeeGroup] = useState('');
  const [installment, setInstallment] = useState('All');
  
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        
        const [groupsRes, instRes] = await Promise.all([
          fetch(`${API_URL}/api/fee-groups`, { headers }),
          fetch(`${API_URL}/api/fee-installments`, { headers })
        ]);

        if (groupsRes.ok) {
          const groups = await groupsRes.json();
          setFeeGroupOptions([
            { value: '', label: 'Please Select' },
            ...groups.map(g => ({ value: g._id, label: g.name }))
          ]);
        }
        if (instRes.ok) {
          const insts = await instRes.json();
          setInstallmentOptions([
            { value: 'All', label: 'Select All' },
            ...insts.map(i => ({ value: i._id, label: i.name }))
          ]);
        }
      } catch (error) {
        console.error('Error fetching dropdowns:', error);
      }
    };
    fetchDropdowns();
  }, []);

  const handleShow = async () => {
    if (!feeGroup) {
      setToast('Please select a Fee Group.');
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/fee-amount-groups?groupId=${feeGroup}&installmentId=${installment}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        // data.amounts should be an array of { feeHead: object, amount: number }
        if (data.amounts) {
          setTableData(data.amounts.map(item => ({
            _id: item.feeHead._id,
            feeHead: item.feeHead.name || 'Unknown',
            amount: item.amount
          })));
        } else {
          setTableData([]);
        }
      }
    } catch (error) {
      console.error('Error fetching amounts:', error);
      setToast('Error loading amounts');
    }
  };

  const handleAmountChange = (index, val) => {
    const newData = [...tableData];
    newData[index].amount = Number(val);
    setTableData(newData);
  };

  const handleSave = async () => {
    if (!feeGroup) {
      setToast('Please select a Fee Group.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      
      const payload = {
        feeGroup,
        installment,
        amounts: tableData.map(item => ({
          feeHead: item._id,
          amount: item.amount
        }))
      };

      const res = await fetch(`${API_URL}/api/fee-amount-groups`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setToast('Fee group amounts saved successfully!');
      } else {
        const err = await res.json();
        setToast(err.message || 'Error saving amounts');
      }
    } catch (error) {
      setToast('Network error');
    }
  };

  return (
    <div className="erp-form-container">
      <div className="erp-row">
        <FormField label="Fee Group">
          <Select options={feeGroupOptions} value={feeGroup} onChange={e => setFeeGroup(e.target.value)} />
        </FormField>
        <FormField label="Installment">
          <Select options={installmentOptions} value={installment} onChange={e => setInstallment(e.target.value)} />
        </FormField>
      </div>

      <div className="erp-section-title">Group Amount List</div>
      
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead>
          <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
            <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', color: '#333', fontSize: '13px' }}>Fee Head</th>
            <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', color: '#333', fontSize: '13px' }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {tableData.length === 0 ? (
            <tr>
              <td colSpan="2" style={{ padding: '20px', textAlign: 'center', color: '#666', fontSize: '13px' }}>
                No Data (Click Show to fetch)
              </td>
            </tr>
          ) : (
            tableData.map((item, index) => (
              <tr key={item._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '10px', fontSize: '13px', color: '#333' }}>{item.feeHead}</td>
                <td style={{ padding: '10px' }}>
                  <input 
                    type="number" 
                    value={item.amount}
                    onChange={(e) => handleAmountChange(index, e.target.value)}
                    style={{ padding: '6px', border: '1px solid #d1d5db', borderRadius: '4px', width: '150px' }}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="erp-buttons">
        <Button variant="green" onClick={handleSave}>
          💾 Save
        </Button>
        <Button variant="blue" onClick={handleShow}>
          👁 Show
        </Button>
      </div>
    </div>
  );
}
