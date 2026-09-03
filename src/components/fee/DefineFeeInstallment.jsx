import React, { useState, useEffect } from 'react';
import { Search, Plus, Download, Edit, Trash2, X, Save, RefreshCw } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function DefineFeeInstallment() {
  const [installments, setInstallments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [selectedRow, setSelectedRow] = useState(null);
  
  const [name, setName] = useState('');
  const [printName, setPrintName] = useState('');
  const [pref, setPref] = useState('');
  const [dueOnYear, setDueOnYear] = useState('Year');
  const [dueOnMonth, setDueOnMonth] = useState('Month');
  const [dueOnDay, setDueOnDay] = useState('Day');
  const [dueYear, setDueYear] = useState('Year');
  const [dueMonth, setDueMonth] = useState('Month');
  const [dueDay, setDueDay] = useState('Day');
  const [selectedMonth, setSelectedMonth] = useState('None selected');

  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const showToast = (msg, toastType = 'success') => {
    setToastMessage(msg);
    setToastType(toastType);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const fetchInstallments = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/fee-installments`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setInstallments(data);
      }
    } catch (error) {
      console.error('Error fetching installments:', error);
    }
  };

  useEffect(() => {
    fetchInstallments();
  }, []);

  const openAddModal = () => {
    setModalMode('add');
    setSelectedRow(null);
    setName('');
    setPrintName('');
    setPref('');
    setDueOnYear('Year');
    setDueOnMonth('Month');
    setDueOnDay('Day');
    setDueYear('Year');
    setDueMonth('Month');
    setDueDay('Day');
    setSelectedMonth('None selected');
    setIsModalOpen(true);
  };

  const openEditModal = (row) => {
    setModalMode('edit');
    setSelectedRow(row);
    setName(row.name);
    setPrintName(row.printName);
    setPref(row.pref);
    setDueOnYear(row.dueOnYear || 'Year');
    setDueOnMonth(row.dueOnMonth || 'Month');
    setDueOnDay(row.dueOnDay || 'Day');
    setDueYear(row.dueYear || 'Year');
    setDueMonth(row.dueMonth || 'Month');
    setDueDay(row.dueDay || 'Day');
    setSelectedMonth(row.selectedMonth || 'None selected');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !printName || !pref) {
      showToast('Please fill all required fields', 'error');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const method = modalMode === 'add' ? 'POST' : 'PUT';
      const url = modalMode === 'add' ? `${API_URL}/api/fee-installments` : `${API_URL}/api/fee-installments/${selectedRow._id}`;
      
      const payload = {
        name, printName, pref: Number(pref), dueOnYear, dueOnMonth, dueOnDay, dueYear, dueMonth, dueDay, selectedMonth
      };

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        showToast(modalMode === 'add' ? 'Installment Added' : 'Installment Updated');
        fetchInstallments();
        setIsModalOpen(false);
      } else {
        const err = await res.json();
        showToast(err.message || 'Error saving installment', 'error');
      }
    } catch (error) {
      showToast('Network error', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this installment?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/fee-installments/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        showToast('Installment Deleted');
        fetchInstallments();
      } else {
        const err = await res.json();
        showToast(err.message || 'Error deleting', 'error');
      }
    } catch (error) {
      showToast('Network error', 'error');
    }
  };

  return (
    <div style={{ padding: '24px', background: '#fff', minHeight: '100%', position: 'relative' }}>
      
      {toastMessage && (
        <div style={{ position: 'absolute', top: '24px', right: '24px', backgroundColor: toastType === 'success' ? '#4ade80' : '#ef4444', color: '#fff', padding: '12px 24px', borderRadius: '4px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', zIndex: 1000, fontWeight: 500, fontSize: '14px' }}>
          {toastMessage}
        </div>
      )}
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e2e8f0', borderRadius: '4px', padding: '6px 12px', width: '300px' }}>
          <Search size={16} color="#94a3b8" />
          <input type="text" placeholder="Search Installment" style={{ border: 'none', outline: 'none', marginLeft: '8px', fontSize: '13px', width: '100%' }} />
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={openAddModal} style={{ backgroundColor: '#29a9d8', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
            <Plus size={16} /> Add New Installment
          </button>
          <button style={{ backgroundColor: '#29a9d8', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #e2e8f0', fontSize: '13px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
            <th style={{ padding: '12px', textAlign: 'center', borderRight: '1px solid #e2e8f0', color: '#333', fontWeight: 600 }}>Sr. NO.</th>
            <th style={{ padding: '12px', textAlign: 'center', borderRight: '1px solid #e2e8f0', color: '#333', fontWeight: 600 }}>Installment Name</th>
            <th style={{ padding: '12px', textAlign: 'center', borderRight: '1px solid #e2e8f0', color: '#333', fontWeight: 600 }}>Print Name</th>
            <th style={{ padding: '12px', textAlign: 'center', borderRight: '1px solid #e2e8f0', color: '#333', fontWeight: 600 }}>Pref. No.</th>
            <th style={{ padding: '12px', textAlign: 'center', borderRight: '1px solid #e2e8f0', color: '#333', fontWeight: 600 }}>Due Date</th>
            <th style={{ padding: '12px', textAlign: 'center', borderRight: '1px solid #e2e8f0', color: '#333', fontWeight: 600 }}>Due On Date</th>
            <th style={{ padding: '12px', textAlign: 'center', borderRight: '1px solid #e2e8f0', color: '#333', fontWeight: 600 }}>Modified Date</th>
            <th style={{ padding: '12px', textAlign: 'center', color: '#333', fontWeight: 600 }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {installments.map((row, index) => (
            <tr key={row._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '10px 12px', textAlign: 'center', borderRight: '1px solid #e2e8f0', color: '#095484' }}>{index + 1}</td>
              <td style={{ padding: '10px 12px', textAlign: 'center', borderRight: '1px solid #e2e8f0', color: '#333' }}>{row.name}</td>
              <td style={{ padding: '10px 12px', textAlign: 'center', borderRight: '1px solid #e2e8f0', color: '#333' }}>{row.printName}</td>
              <td style={{ padding: '10px 12px', textAlign: 'center', borderRight: '1px solid #e2e8f0', color: '#333' }}>{row.pref}</td>
              <td style={{ padding: '10px 12px', textAlign: 'center', borderRight: '1px solid #e2e8f0', color: '#333' }}>
                {row.dueDay}-{row.dueMonth}-{row.dueYear}
              </td>
              <td style={{ padding: '10px 12px', textAlign: 'center', borderRight: '1px solid #e2e8f0', color: '#333' }}>
                {row.dueOnDay}-{row.dueOnMonth}-{row.dueOnYear}
              </td>
              <td style={{ padding: '10px 12px', textAlign: 'center', borderRight: '1px solid #e2e8f0', color: '#333' }}>{new Date(row.updatedAt).toLocaleDateString()}</td>
              <td style={{ padding: '10px 12px', textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '12px' }}>
                <Edit size={14} color="#64748b" style={{ cursor: 'pointer' }} onClick={() => openEditModal(row)} />
                <Trash2 size={14} color="#ef4444" style={{ cursor: 'pointer' }} onClick={() => handleDelete(row._id)} />
              </td>
            </tr>
          ))}
          {installments.length === 0 && (
            <tr>
              <td colSpan="8" style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>No Installments Found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: '#fff', width: '800px', borderRadius: '4px', display: 'flex', flexDirection: 'column' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '16px', color: '#333' }}>{modalMode === 'add' ? 'Add New Installment' : 'Edit Installment'}</span>
              <X size={18} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => setIsModalOpen(false)} />
            </div>

            <form onSubmit={handleSubmit} style={{ padding: '32px 48px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Installment Name</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Installment Print Name</label>
                  <input type="text" value={printName} onChange={e => setPrintName(e.target.value)} required style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Installment Preference No.</label>
                <input type="number" value={pref} onChange={e => setPref(e.target.value)} required style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Due On Date</label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <select value={dueOnYear} onChange={e => setDueOnYear(e.target.value)} style={{ flex: 1, padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px', color: '#333' }}>
                    <option value="Year">Year</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                  </select>
                  <select value={dueOnMonth} onChange={e => setDueOnMonth(e.target.value)} style={{ flex: 1, padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px', color: '#333' }}>
                    <option value="Month">Month</option>
                    {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <select value={dueOnDay} onChange={e => setDueOnDay(e.target.value)} style={{ flex: 1, padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px', color: '#333' }}>
                    <option value="Day">Day</option>
                    {[...Array(31)].map((_, i) => <option key={i+1} value={i+1}>{i+1}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Due Date</label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <select value={dueYear} onChange={e => setDueYear(e.target.value)} style={{ flex: 1, padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px', color: '#333' }}>
                    <option value="Year">Year</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                  </select>
                  <select value={dueMonth} onChange={e => setDueMonth(e.target.value)} style={{ flex: 1, padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px', color: '#333' }}>
                    <option value="Month">Month</option>
                    {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <select value={dueDay} onChange={e => setDueDay(e.target.value)} style={{ flex: 1, padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px', color: '#333' }}>
                    <option value="Day">Day</option>
                    {[...Array(31)].map((_, i) => <option key={i+1} value={i+1}>{i+1}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Select Month</label>
                <select value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px', color: '#333' }}>
                  <option value="None selected">None selected</option>
                  {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                <button type="submit" style={{ backgroundColor: modalMode === 'add' ? '#4ade80' : '#0ea5e9', color: '#fff', border: 'none', padding: '8px 24px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 500 }}>
                  {modalMode === 'add' ? <><Save size={16} /> Save</> : <><RefreshCw size={16} /> Update</>}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
