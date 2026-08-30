import React, { useState } from 'react';
import { Search, Plus, Download, Edit, Trash2, X, Save, RefreshCw } from 'lucide-react';

export default function DefineFeeHead() {
  const [heads, setHeads] = useState([
    { id: 1, name: 'Admission Fee ( NEW STUDENT)', print: 'Admission Fee ( NEW STUDENT)', type: 'Lifetime', priority: 1, cat: 'Regular', show: 'False', refund: 'False', modified: '31-Mar-2026' },
    { id: 2, name: 'TUITION FEE', print: 'TUITION FEE', type: 'Installment', priority: 2, cat: 'Regular', show: 'True', refund: 'False', modified: '31-Mar-2026' },
    { id: 3, name: 'COMPOSITE FEE', print: 'COMPOSITE FEE', type: 'Annual', priority: 3, cat: 'Regular', show: 'False', refund: 'False', modified: '31-Mar-2026' },
    { id: 4, name: 'Opening Balance', print: 'Opening Balance', type: 'Installment', priority: 4, cat: 'Opn Bal', show: 'False', refund: 'False', modified: '31-Mar-2026' },
    { id: 5, name: 'Open Dues', print: 'Open Dues', type: 'Annual', priority: 5, cat: 'Opn Dues', show: 'False', refund: 'False', modified: '31-Mar-2026' },
    { id: 6, name: 'Discount', print: 'Discount', type: 'Installment', priority: 6, cat: 'Discount', show: 'False', refund: 'False', modified: '31-Mar-2026' },
    { id: 7, name: 'Late Fine', print: 'Late Fine', type: 'Installment', priority: 7, cat: 'Fine', show: 'False', refund: 'False', modified: '31-Mar-2026' },
    { id: 8, name: 'Cheque Bounce', print: 'Cheque Bounce', type: 'Installment', priority: 8, cat: 'Cheque Bounce', show: 'False', refund: 'False', modified: '31-Mar-2026' },
    { id: 9, name: 'Transport', print: 'Transport', type: 'Installment', priority: 9, cat: 'Transport', show: 'True', refund: 'False', modified: '31-Mar-2026' },
    { id: 10, name: 'EXAM FEE', print: 'EXAM FEE', type: 'Installment', priority: 10, cat: 'Regular', show: 'True', refund: 'False', modified: '31-Mar-2026' }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedRow, setSelectedRow] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const openAddModal = () => {
    setModalMode('add');
    setSelectedRow(null);
    setIsModalOpen(true);
  };

  const openEditModal = (row) => {
    setModalMode('edit');
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setHeads(heads.filter(h => h.id !== id));
    setToastMessage('Successfully deleted');
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div style={{ padding: '24px', background: '#fff', minHeight: '100%', position: 'relative' }}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{ position: 'absolute', top: '24px', right: '24px', backgroundColor: '#4ade80', color: '#fff', padding: '12px 24px', borderRadius: '4px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', zIndex: 1000, fontWeight: 500, fontSize: '14px' }}>
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
          <button 
            onClick={openAddModal}
            style={{ backgroundColor: '#29a9d8', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}
          >
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
            <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333', fontWeight: 600 }}>Head Refundable</th>
            <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333', fontWeight: 600 }}>Modified Date</th>
            <th style={{ padding: '12px', textAlign: 'center', color: '#333', fontWeight: 600 }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {heads.map((row) => (
            <tr key={row.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '10px 12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#095484' }}>{row.id}</td>
              <td style={{ padding: '10px 12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333' }}>{row.name}</td>
              <td style={{ padding: '10px 12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333' }}>{row.print}</td>
              <td style={{ padding: '10px 12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333' }}>{row.type}</td>
              <td style={{ padding: '10px 12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333' }}>{row.priority}</td>
              <td style={{ padding: '10px 12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333' }}>{row.cat}</td>
              <td style={{ padding: '10px 12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333' }}>{row.show}</td>
              <td style={{ padding: '10px 12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333' }}>{row.refund}</td>
              <td style={{ padding: '10px 12px', textAlign: 'left', borderRight: '1px solid #e2e8f0', color: '#333' }}>{row.modified}</td>
              <td style={{ padding: '10px 12px', textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '12px' }}>
                <Edit size={14} color="#64748b" style={{ cursor: 'pointer' }} onClick={() => openEditModal(row)} />
                <Trash2 size={14} color="#ef4444" style={{ cursor: 'pointer' }} onClick={() => handleDelete(row.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', fontSize: '13px', color: '#333' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>Show</span>
          <select style={{ padding: '4px 8px', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none' }}>
            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
          <span>entries</span>
        </div>
        <div>Showing 1 to 10 of 10 entries</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b' }}>Previous</button>
          <button style={{ border: 'none', background: '#0ea5e9', color: '#fff', width: '28px', height: '28px', borderRadius: '4px', cursor: 'pointer' }}>1</button>
          <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#333' }}>Next</button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: '#fff', width: '800px', borderRadius: '4px', display: 'flex', flexDirection: 'column' }}>
            
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '16px', color: '#333' }}>{modalMode === 'add' ? 'Add New Head' : 'Edit Bank'}</span>
              <X size={18} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => setIsModalOpen(false)} />
            </div>

            {/* Modal Body */}
            <div style={{ padding: '32px 48px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Head Name</label>
                  <input type="text" defaultValue={selectedRow?.name || ''} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Head Print Name</label>
                  <input type="text" defaultValue={selectedRow?.print || ''} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Head Type</label>
                  <select defaultValue={selectedRow?.type || 'Lifetime'} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px', color: '#333' }}>
                    <option value="Lifetime">Lifetime</option>
                    <option value="Installment">Installment</option>
                    <option value="Annual">Annual</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Priority Number</label>
                  <input type="text" defaultValue={selectedRow?.priority || ''} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Category Type</label>
                  <select defaultValue={selectedRow?.cat || 'Regular'} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px', color: '#333' }}>
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
                  <select defaultValue="Select" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px', color: '#333' }}>
                    <option value="Select">Select</option>
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#333' }}>
                    <input type="checkbox" defaultChecked={selectedRow?.show === 'True'} style={{ width: '16px', height: '16px' }} /> Show In Certificate
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#333' }}>
                    <input type="checkbox" defaultChecked={selectedRow?.refund === 'True'} style={{ width: '16px', height: '16px' }} /> Fee Refundable
                  </label>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Tally Ledger Name</label>
                  <input type="text" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                {modalMode === 'add' ? (
                  <button style={{ backgroundColor: '#4ade80', color: '#fff', border: 'none', padding: '8px 24px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 500 }}>
                    <Save size={16} /> Save
                  </button>
                ) : (
                  <button style={{ backgroundColor: '#0ea5e9', color: '#fff', border: 'none', padding: '8px 24px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 500 }}>
                    <RefreshCw size={16} /> Update
                  </button>
                )}
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
