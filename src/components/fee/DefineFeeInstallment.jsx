import React, { useState } from 'react';
import { Search, Plus, Download, Edit, Trash2, X, Save, RefreshCw } from 'lucide-react';

export default function DefineFeeInstallment() {
  const [installments, setInstallments] = useState([
    { id: 1, name: 'April', print: 'April', pref: 1, due: '30-Apr-2026', dueOn: '01-Apr-2026', modified: '31-Mar-2026' },
    { id: 2, name: 'May', print: 'May', pref: 2, due: '31-May-2026', dueOn: '01-May-2026', modified: '31-Mar-2026' },
    { id: 3, name: 'June', print: 'June', pref: 3, due: '30-Jun-2026', dueOn: '01-Jun-2026', modified: '31-Mar-2026' },
    { id: 4, name: 'July', print: 'July', pref: 4, due: '31-Jul-2026', dueOn: '01-Jul-2026', modified: '31-Mar-2026' },
    { id: 5, name: 'August', print: 'August', pref: 5, due: '31-Aug-2026', dueOn: '01-Aug-2026', modified: '31-Mar-2026' },
    { id: 6, name: 'September', print: 'September', pref: 6, due: '30-Sep-2026', dueOn: '01-Sep-2026', modified: '31-Mar-2026' },
    { id: 7, name: 'October', print: 'October', pref: 7, due: '31-Oct-2026', dueOn: '01-Oct-2026', modified: '31-Mar-2026' },
    { id: 8, name: 'November', print: 'November', pref: 8, due: '30-Nov-2026', dueOn: '01-Nov-2026', modified: '31-Mar-2026' },
    { id: 9, name: 'December', print: 'December', pref: 9, due: '31-Dec-2026', dueOn: '01-Dec-2026', modified: '31-Mar-2026' },
    { id: 10, name: 'January', print: 'January', pref: 10, due: '31-Jan-2027', dueOn: '01-Jan-2027', modified: '31-Mar-2026' }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
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
    setInstallments(installments.filter(inst => inst.id !== id));
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
          <input type="text" placeholder="Search Installment" style={{ border: 'none', outline: 'none', marginLeft: '8px', fontSize: '13px', width: '100%' }} />
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={openAddModal}
            style={{ backgroundColor: '#29a9d8', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}
          >
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
          {installments.map((row) => (
            <tr key={row.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '10px 12px', textAlign: 'center', borderRight: '1px solid #e2e8f0', color: '#095484' }}>{row.id}</td>
              <td style={{ padding: '10px 12px', textAlign: 'center', borderRight: '1px solid #e2e8f0', color: '#333' }}>{row.name}</td>
              <td style={{ padding: '10px 12px', textAlign: 'center', borderRight: '1px solid #e2e8f0', color: '#333' }}>{row.print}</td>
              <td style={{ padding: '10px 12px', textAlign: 'center', borderRight: '1px solid #e2e8f0', color: '#333' }}>{row.pref}</td>
              <td style={{ padding: '10px 12px', textAlign: 'center', borderRight: '1px solid #e2e8f0', color: '#333' }}>{row.due}</td>
              <td style={{ padding: '10px 12px', textAlign: 'center', borderRight: '1px solid #e2e8f0', color: '#333' }}>{row.dueOn}</td>
              <td style={{ padding: '10px 12px', textAlign: 'center', borderRight: '1px solid #e2e8f0', color: '#333' }}>{row.modified}</td>
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
        <div>Showing 1 to 10 of 11 entries</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b' }}>Previous</button>
          <button style={{ border: 'none', background: '#0ea5e9', color: '#fff', width: '28px', height: '28px', borderRadius: '4px', cursor: 'pointer' }}>1</button>
          <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#333', width: '28px', height: '28px' }}>2</button>
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
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Installment Name</label>
                  <input type="text" defaultValue={selectedRow?.name || ''} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Installment Print Name</label>
                  <input type="text" defaultValue={selectedRow?.print || ''} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Installment Preference No.</label>
                <input type="text" defaultValue={selectedRow?.pref || ''} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Due On Date</label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <select defaultValue={modalMode === 'edit' ? '2026' : 'Year'} style={{ flex: 1, padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px', color: '#333' }}>
                    <option value="Year">Year</option>
                    <option value="2026">2026</option>
                  </select>
                  <select defaultValue={modalMode === 'edit' ? (selectedRow?.name || 'Month') : 'Month'} style={{ flex: 1, padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px', color: '#333' }}>
                    <option value="Month">Month</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                  </select>
                  <select defaultValue={modalMode === 'edit' ? '1' : 'Day'} style={{ flex: 1, padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px', color: '#333' }}>
                    <option value="Day">Day</option>
                    <option value="1">1</option>
                    <option value="15">15</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Due Date</label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <select defaultValue={modalMode === 'edit' ? '2026' : 'Year'} style={{ flex: 1, padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px', color: '#333' }}>
                    <option value="Year">Year</option>
                    <option value="2026">2026</option>
                  </select>
                  <select defaultValue={modalMode === 'edit' ? (selectedRow?.name || 'Month') : 'Month'} style={{ flex: 1, padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px', color: '#333' }}>
                    <option value="Month">Month</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                  </select>
                  <select defaultValue={modalMode === 'edit' ? '30' : 'Day'} style={{ flex: 1, padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px', color: '#333' }}>
                    <option value="Day">Day</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Select Month</label>
                <select defaultValue={modalMode === 'edit' ? 'Apr' : 'None selected'} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', fontSize: '13px', color: '#333' }}>
                  <option value="None selected">None selected</option>
                  <option value="Apr">Apr</option>
                  <option value="May">May</option>
                  <option value="Jun">Jun</option>
                </select>
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
