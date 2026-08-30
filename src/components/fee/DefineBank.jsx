import React, { useState, useEffect } from 'react';
import { Search, Plus, Download, ChevronUp, ChevronDown, X, Save, AlertTriangle, Check, Edit, Trash2, RefreshCw } from 'lucide-react';

const COLUMNS = [
  { key: 'srNo',          label: 'Sr. No.' },
  { key: 'bankName',      label: 'Bank Name' },
  { key: 'accountNumber', label: 'Account Number' },
  { key: 'mobile',        label: 'Mobile' },
  { key: 'address',       label: 'Address' },
  { key: 'ifscCode',      label: 'IFSC Code' },
  { key: 'bsrCode',       label: 'BSR Code' },
  { key: 'modifiedDate',  label: 'Modified Date' },
  { key: 'action',        label: 'Action' },
];

const PAGE_SIZES = [10, 25, 50, 100];

export default function DefineBank() {
  const [search, setSearch]     = useState('');
  const [pageSize, setPageSize] = useState(10);
  
  const [showModal, setShowModal] = useState(false);
  const [bankName, setBankName] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showExportToast, setShowExportToast] = useState(false);

  const [banks, setBanks] = useState([]);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [editingBankId, setEditingBankId] = useState(null);

  const handleExport = () => {
    setShowExportToast(true);
    setTimeout(() => setShowExportToast(false), 3000);
  };

  const handleSave = () => {
    setHasSubmitted(true);
    if (bankName.trim() === '') {
      setShowError(true);
    } else {
      if (editingBankId) {
        setBanks(banks.map(b => b.srNo === editingBankId ? { ...b, bankName } : b));
        setSuccessMessage('Bank Name Updated Successfully');
      } else {
        const newBank = {
          srNo: banks.length > 0 ? Math.max(...banks.map(b => b.srNo)) + 1 : 1,
          bankName: bankName,
          accountNumber: '',
          mobile: '',
          address: '',
          ifscCode: '',
          bsrCode: '',
          modifiedDate: '28-Aug-2026'
        };
        setBanks([...banks, newBank]);
        setSuccessMessage('Bank Name Saved Successfully');
      }

      setShowModal(false);
      setBankName('');
      setEditingBankId(null);
      setHasSubmitted(false);
      setShowError(false);
      
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
    }
  };

  const handleEdit = (bank) => {
    setEditingBankId(bank.srNo);
    setBankName(bank.bankName);
    setHasSubmitted(false);
    setShowError(false);
    setShowModal(true);
  };

  const handleDelete = (srNo) => {
    setBanks(banks.filter(bank => bank.srNo !== srNo));
    setSuccessMessage('Bank Name Deleted Successfully');
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  return (
    <div style={{ padding: '20px 24px', background: '#fff', minHeight: '100%' }}>

      {/* Top controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1px solid #d1d5db', borderRadius: 4, padding: '6px 12px', background: '#fff', width: 240 }}>
          <Search size={14} color="#94a3b8" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search Bank"
            style={{ border: 'none', outline: 'none', fontSize: 12, color: '#374151', width: '100%', background: 'transparent' }}
          />
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => { setEditingBankId(null); setBankName(''); setHasSubmitted(false); setShowError(false); setShowModal(true); }} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: '#29a9d8', border: 'none', borderRadius: 4,
            padding: '7px 14px', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer',
          }}>
            <Plus size={14} /> Add New Bank
          </button>
          <button onClick={handleExport} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: '#29a9d8', border: 'none', borderRadius: 4,
            padding: '7px 14px', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer',
          }}>
            <Download size={14} /> Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={{ border: '1px solid #e2e8f0', borderRadius: 2, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr style={{ background: '#fff', borderBottom: '2px solid #e2e8f0' }}>
              {COLUMNS.map(col => (
                <th key={col.key} style={{
                  padding: '10px 12px', textAlign: 'left', fontWeight: 600,
                  color: '#374151', fontSize: 12, whiteSpace: 'nowrap',
                  borderRight: col.key !== 'action' ? '1px solid #f1f5f9' : 'none',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {col.label}
                    {col.key !== 'action' && (
                      <span style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <ChevronUp size={9} color="#94a3b8" style={{ display: 'block' }} />
                        <ChevronDown size={9} color="#94a3b8" style={{ display: 'block', marginTop: -3 }} />
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {banks.length === 0 ? (
              <tr>
                <td colSpan={COLUMNS.length} style={{
                  padding: '14px 12px', textAlign: 'center',
                  color: '#64748b', fontSize: 12, background: '#f8fafc',
                  borderBottom: '1px solid #e2e8f0',
                }}>
                  No data available in table
                </td>
              </tr>
            ) : (
              banks.map(bank => (
                <tr key={bank.srNo} style={{ height: 32, borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '8px 12px', color: '#374151', borderRight: '1px solid #f1f5f9' }}>{bank.srNo}</td>
                  <td style={{ padding: '8px 12px', color: '#374151', borderRight: '1px solid #f1f5f9' }}>{bank.bankName}</td>
                  <td style={{ padding: '8px 12px', color: '#374151', borderRight: '1px solid #f1f5f9' }}>{bank.accountNumber}</td>
                  <td style={{ padding: '8px 12px', color: '#374151', borderRight: '1px solid #f1f5f9' }}>{bank.mobile}</td>
                  <td style={{ padding: '8px 12px', color: '#374151', borderRight: '1px solid #f1f5f9' }}>{bank.address}</td>
                  <td style={{ padding: '8px 12px', color: '#374151', borderRight: '1px solid #f1f5f9' }}>{bank.ifscCode}</td>
                  <td style={{ padding: '8px 12px', color: '#374151', borderRight: '1px solid #f1f5f9' }}>{bank.bsrCode}</td>
                  <td style={{ padding: '8px 12px', color: '#374151', borderRight: '1px solid #f1f5f9' }}>{bank.modifiedDate}</td>
                  <td style={{ padding: '8px 12px', color: '#374151', display: 'flex', gap: 12, alignItems: 'center' }}>
                    <Edit size={14} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => handleEdit(bank)} />
                    <Trash2 size={14} color="#ef4444" style={{ cursor: 'pointer' }} onClick={() => handleDelete(bank.srNo)} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14 }}>
        {/* Show entries */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#374151' }}>
          <span>Show</span>
          <select
            value={pageSize}
            onChange={e => setPageSize(Number(e.target.value))}
            style={{ border: '1px solid #d1d5db', borderRadius: 3, padding: '2px 6px', fontSize: 12, color: '#374151', cursor: 'pointer' }}
          >
            {PAGE_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <span>entries</span>
          <span style={{ marginLeft: 16, color: '#64748b' }}>Showing {banks.length > 0 ? 1 : 0} to {banks.length} of {banks.length} entries</span>
        </div>

        {/* Pagination */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button style={{ background: 'none', border: 'none', fontSize: 12, color: '#94a3b8', cursor: 'default' }}>Previous</button>
          {banks.length > 0 && <button style={{ background: '#0ea5e9', border: 'none', borderRadius: 3, padding: '4px 10px', fontSize: 12, color: '#fff', cursor: 'pointer' }}>1</button>}
          <button style={{ background: 'none', border: 'none', fontSize: 12, color: '#94a3b8', cursor: 'default' }}>Next</button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: '800px', backgroundColor: '#fff', borderRadius: '4px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column' }}>
            
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid #f0f0f0' }}>
              <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 400, color: '#333' }}>{editingBankId ? 'Edit Bank' : 'Add New Bank'}</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999' }}>
                <X size={16} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '24px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: '#333' }}>Bank Name <span style={{ color: 'red' }}>*</span></label>
                  <input 
                    type="text" 
                    value={bankName}
                    onChange={(e) => {
                      setBankName(e.target.value);
                      if (showError && e.target.value.trim() !== '') setShowError(false);
                    }}
                    style={{ 
                      width: '100%', padding: '8px 12px', border: (hasSubmitted && bankName.trim() === '') ? '1px solid red' : '1px solid #d9d9d9', 
                      borderRadius: '4px', outline: 'none', fontSize: '13px'
                    }} 
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: '#333' }}>Account Number</label>
                  <input type="text" style={{ width: '100%', padding: '8px 12px', border: '1px solid #d9d9d9', borderRadius: '4px', outline: 'none', fontSize: '13px' }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '24px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: '#333' }}>Mobile</label>
                  <input type="text" style={{ width: '100%', padding: '8px 12px', border: '1px solid #d9d9d9', borderRadius: '4px', outline: 'none', fontSize: '13px' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: '#333' }}>Address</label>
                  <input type="text" style={{ width: '100%', padding: '8px 12px', border: '1px solid #d9d9d9', borderRadius: '4px', outline: 'none', fontSize: '13px' }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '24px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: '#333' }}>IFSC Code</label>
                  <input type="text" style={{ width: '100%', padding: '8px 12px', border: '1px solid #d9d9d9', borderRadius: '4px', outline: 'none', fontSize: '13px' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: '#333' }}>BSR Code</label>
                  <input type="text" style={{ width: '100%', padding: '8px 12px', border: '1px solid #d9d9d9', borderRadius: '4px', outline: 'none', fontSize: '13px' }} />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input type="checkbox" id="isSchool" style={{ cursor: 'pointer' }} />
                <label htmlFor="isSchool" style={{ fontSize: '13px', color: '#333', cursor: 'pointer' }}>Is School</label>
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'center', borderTop: '1px solid transparent', marginBottom: '24px' }}>
              <button onClick={handleSave} style={{ 
                backgroundColor: editingBankId ? '#0ea5e9' : '#51d88a', color: '#fff', border: 'none', padding: '10px 20px', 
                borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 500
              }}>
                {editingBankId ? <RefreshCw size={16} /> : <Save size={16} />} 
                {editingBankId ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Banner */}
      {showError && (
        <div style={{ 
          position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#ff7474', color: '#fff', 
          padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2000 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <span style={{ fontSize: '18px', lineHeight: '14px' }}>•</span> Enter bank name
          </div>
          <button onClick={() => setShowError(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
            <X size={16} />
          </button>
        </div>
      )}

      {/* Export Toast */}
      {showExportToast && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px', backgroundColor: '#f0ad4e', color: '#fff',
          borderRadius: '4px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 3000, width: '280px',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '12px 16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <AlertTriangle size={24} color="#fff" strokeWidth={1.5} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontSize: '14px', fontWeight: 600 }}>Information!</span>
                <button onClick={() => setShowExportToast(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 0 }}>
                  <X size={14} />
                </button>
              </div>
              <span style={{ fontSize: '13px' }}>There is no data to print</span>
            </div>
          </div>
          {/* Progress bar simulation */}
          <div style={{ height: '3px', backgroundColor: '#ef4444', width: '30%' }} />
        </div>
      )}

      {/* Success Toast */}
      {showSuccessToast && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px', backgroundColor: '#4ade80', color: '#fff',
          borderRadius: '4px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 3000, width: '280px',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '12px 16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <Check size={24} color="#fff" strokeWidth={3} style={{ marginTop: 2 }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '0.02em' }}>DONE!</span>
                <button onClick={() => setShowSuccessToast(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 0 }}>
                  <X size={12} strokeWidth={3} />
                </button>
              </div>
              <span style={{ fontSize: '12px' }}>{successMessage}</span>
            </div>
          </div>
          {/* Progress bar simulation */}
          <div style={{ height: '3px', backgroundColor: '#f97316', width: '20%' }} />
        </div>
      )}

    </div>
  );
}
