import React, { useState, useEffect } from 'react';
import { Search, Plus, Download, Edit, Trash2, X, Save, RefreshCw } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function DefineFeeHead() {
  const [feeHeads, setFeeHeads] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedRow, setSelectedRow] = useState(null);
  
  const [name, setName] = useState('');
  const [printName, setPrintName] = useState('');
  const [type, setType] = useState('Lifetime');
  const [priority, setPriority] = useState('');
  const [category, setCategory] = useState('Regular');
  const [ledger, setLedger] = useState('Select');
  const [tallyLedger, setTallyLedger] = useState('');
  const [showInCertificate, setShowInCertificate] = useState('False');
  const [refundable, setRefundable] = useState('False');

  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const showToast = (msg, toastType = 'success') => {
    setToastMessage(msg);
    setToastType(toastType);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const fetchFeeHeads = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/fee-heads`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setFeeHeads(data);
      }
    } catch (error) {
      console.error('Error fetching fee heads:', error);
    }
  };

  useEffect(() => {
    fetchFeeHeads();
  }, []);

  const openAddModal = () => {
    setModalMode('add');
    setSelectedRow(null);
    setName('');
    setPrintName('');
    setType('Lifetime');
    setPriority('');
    setCategory('Regular');
    setLedger('Select');
    setTallyLedger('');
    setShowInCertificate('False');
    setRefundable('False');
    setIsModalOpen(true);
  };

  const openEditModal = (row) => {
    setModalMode('edit');
    setSelectedRow(row);
    setName(row.name);
    setPrintName(row.printName);
    setType(row.type);
    setPriority(row.priority);
    setCategory(row.category);
    setLedger(row.ledger || 'Select');
    setTallyLedger(row.tallyLedger || '');
    setShowInCertificate(row.showInCertificate || 'False');
    setRefundable(row.refundable || 'False');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !printName || !priority) {
      showToast('Please fill all required fields', 'error');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const method = modalMode === 'add' ? 'POST' : 'PUT';
      const url = modalMode === 'add' ? `${API_URL}/api/fee-heads` : `${API_URL}/api/fee-heads/${selectedRow._id}`;
      
      const payload = {
        name, printName, type, priority: Number(priority), category, ledger, tallyLedger, showInCertificate, refundable
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
        showToast(modalMode === 'add' ? 'Fee Head Added' : 'Fee Head Updated');
        fetchFeeHeads();
        setIsModalOpen(false);
      } else {
        const err = await res.json();
        showToast(err.message || 'Error saving fee head', 'error');
      }
    } catch (error) {
      showToast('Network error', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this fee head?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/fee-heads/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        showToast('Fee Head Deleted');
        fetchFeeHeads();
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
      
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{ position: 'absolute', top: '24px', right: '24px', backgroundColor: toastType === 'success' ? '#4ade80' : '#ef4444', color: '#fff', padding: '12px 24px', borderRadius: '4px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', zIndex: 1000, fontWeight: 500, fontSize: '14px' }}>
          {toastMessage}
        </div>
      )}
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e2e8f0', borderRadius: '4px', padding: '6px 12px', width: '300px' }}>
          <Search size={16} color="#94a3b8" />
          <input type="text" placeholder="Search Head" style={{ border: 'none', outline: 'none', marginLeft: '8px', fontSize: '13px', width: '100%' }} />
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={openAddModal} style={{ backgroundColor: '#29a9d8', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
            <Plus size={16} /> Add New Head
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
            <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333', fontWeight: 600 }}>Sr No.</th>
            <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333', fontWeight: 600 }}>Head Name</th>
            <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333', fontWeight: 600 }}>Print Head Name</th>
            <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333', fontWeight: 600 }}>Head Type</th>
            <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333', fontWeight: 600 }}>Priority</th>
            <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333', fontWeight: 600 }}>Category Type</th>
            <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333', fontWeight: 600 }}>Show in Certificate</th>
            <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333', fontWeight: 600 }}>Refundable</th>
            <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333', fontWeight: 600 }}>Modified Date</th>
            <th style={{ padding: '12px', textAlign: 'center', color: '#333', fontWeight: 600 }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {feeHeads.map((row, index) => (
            <tr key={row._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '10px 12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#095484' }}>{index + 1}</td>
              <td style={{ padding: '10px 12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333' }}>{row.name}</td>
              <td style={{ padding: '10px 12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333' }}>{row.printName}</td>
              <td style={{ padding: '10px 12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333' }}>{row.type}</td>
              <td style={{ padding: '10px 12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333' }}>{row.priority}</td>
              <td style={{ padding: '10px 12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333' }}>{row.category}</td>
              <td style={{ padding: '10px 12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333' }}>{row.showInCertificate}</td>
              <td style={{ padding: '10px 12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333' }}>{row.refundable}</td>
              <td style={{ padding: '10px 12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333' }}>{new Date(row.updatedAt).toLocaleDateString()}</td>
              <td style={{ padding: '10px 12px', textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '12px' }}>
                <Edit size={14} color="#64748b" style={{ cursor: 'pointer' }} onClick={() => openEditModal(row)} />
                <Trash2 size={14} color="#ef4444" style={{ cursor: 'pointer' }} onClick={() => handleDelete(row._id)} />
              </td>
            </tr>
          ))}
          {feeHeads.length === 0 && (
            <tr>
              <td colSpan="10" style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>No Fee Heads Found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: '#fff', width: '800px', borderRadius: '4px', display: 'flex', flexDirection: 'column' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '16px', color: '#333' }}>{modalMode === 'add' ? 'Add New Head' : 'Edit Head'}</span>
              <X size={18} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => setIsModalOpen(false)} />
            </div>

            <form onSubmit={handleSubmit} style={{ padding: '32px 48px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Head Name</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Head Print Name</label>
                  <input type="text" value={printName} onChange={(e) => setPrintName(e.target.value)} required style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Head Type</label>
                  <select value={type} onChange={(e) => setType(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px', color: '#333' }}>
                    <option value="Lifetime">Lifetime</option>
                    <option value="Installment">Installment</option>
                    <option value="Annual">Annual</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Priority Number</label>
                  <input type="number" value={priority} onChange={(e) => setPriority(e.target.value)} required style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Category Type</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px', color: '#333' }}>
                    <option value="Regular">Regular</option>
                    <option value="Opn Bal">Opn Bal</option>
                    <option value="Opn Dues">Opn Dues</option>
                    <option value="Discount">Discount</option>
                    <option value="Fine">Fine</option>
                    <option value="Cheque Bounce">Cheque Bounce</option>
                    <option value="Transport">Transport</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Account Ledger</label>
                  <select value={ledger} onChange={(e) => setLedger(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px', color: '#333' }}>
                    <option value="Select">Select</option>
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#333' }}>
                    <input type="checkbox" checked={showInCertificate === 'True'} onChange={(e) => setShowInCertificate(e.target.checked ? 'True' : 'False')} style={{ width: '16px', height: '16px' }} /> Show In Certificate
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#333' }}>
                    <input type="checkbox" checked={refundable === 'True'} onChange={(e) => setRefundable(e.target.checked ? 'True' : 'False')} style={{ width: '16px', height: '16px' }} /> Fee Refundable
                  </label>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Tally Ledger Name</label>
                  <input type="text" value={tallyLedger} onChange={(e) => setTallyLedger(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }} />
                </div>
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
