import React, { useState, useEffect } from 'react';
import { Plus, Download, Edit, Trash2, X, Save } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function DefineSalaryAccount() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    accountName: '',
    bank: '',
    accountNo: '',
    branch: '',
    ifscCode: '',
    isActive: true
  });
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/salary-accounts`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const result = await res.json();
        setData(result);
      }
    } catch (err) {
      console.error('Error fetching salary accounts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      accountName: '',
      bank: '',
      accountNo: '',
      branch: '',
      ifscCode: '',
      isActive: true
    });
    setShowModal(true);
  };

  const handleOpenEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      accountName: item.accountName || '',
      bank: item.bank || '',
      accountNo: item.accountNo || '',
      branch: item.branch || '',
      ifscCode: item.ifscCode || '',
      isActive: item.isActive !== undefined ? item.isActive : true
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.accountName || !formData.bank || !formData.accountNo) {
      alert('Please fill all required fields (Account Name, Bank, Account No)');
      return;
    }

    try {
      const url = editingId ? `${API_BASE}/api/salary-accounts/${editingId}` : `${API_BASE}/api/salary-accounts`;
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setShowModal(false);
        setEditingId(null);
        fetchData();
      } else {
        const err = await res.json();
        alert(err.message || 'Failed to save salary account');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving salary account');
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/api/salary-accounts/${id}`, {
        method: 'DELETE',
        headers
      });
      if (res.ok) {
        setDeleteConfirm(null);
        fetchData();
      } else {
        const err = await res.json();
        alert(err.message || 'Failed to delete salary account');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting salary account');
    }
  };

  const handleExportCSV = () => {
    if (filteredData.length === 0) {
      alert('No data to export');
      return;
    }
    const headersCSV = ['Sr.No', 'Account Name', 'Bank', 'A/C No.', 'Branch', 'IFSC Code', 'Status'];
    const rows = filteredData.map((item, idx) => [
      idx + 1,
      `"${item.accountName || ''}"`,
      `"${item.bank || ''}"`,
      `"${item.accountNo || ''}"`,
      `"${item.branch || ''}"`,
      `"${item.ifscCode || ''}"`,
      item.isActive ? 'Active' : 'Inactive'
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headersCSV.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Salary_Accounts_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter
  const filteredData = data.filter(item => {
    const s = search.toLowerCase();
    return (
      (item.accountName && item.accountName.toLowerCase().includes(s)) ||
      (item.bank && item.bank.toLowerCase().includes(s)) ||
      (item.accountNo && item.accountNo.toLowerCase().includes(s)) ||
      (item.branch && item.branch.toLowerCase().includes(s)) ||
      (item.ifscCode && item.ifscCode.toLowerCase().includes(s))
    );
  });

  const totalEntries = filteredData.length;
  const totalPages = Math.ceil(totalEntries / pageSize) || 1;
  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="mail-template-container">
      <div className="mail-template-header">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search salary account..."
            className="search-input"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          />
        </div>
        <div className="header-buttons">
          <button className="btn-add" onClick={handleOpenAdd}>
            <Plus size={16} /> Add New Salary Account
          </button>
          <button className="btn-export" onClick={handleExportCSV}>
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <div className="mail-table-wrapper">
        <table className="mail-table">
          <thead>
            <tr>
              <th style={{ width: '80px', textAlign: 'center' }}>Sr.No</th>
              <th>Account Name</th>
              <th>Bank</th>
              <th>A/C No.</th>
              <th style={{ width: '120px', textAlign: 'center' }}>Status</th>
              <th style={{ width: '120px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '30px', color: '#6c757d' }}>
                  Loading salary accounts...
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '30px', color: '#6c757d' }}>
                  No data available in table
                </td>
              </tr>
            ) : (
              paginatedData.map((item, idx) => (
                <tr key={item._id || idx} className={idx % 2 === 0 ? 'row-even' : 'row-odd'}>
                  <td style={{ textAlign: 'center' }}>{(currentPage - 1) * pageSize + idx + 1}</td>
                  <td style={{ fontWeight: item.accountName.toLowerCase().includes('ayup') ? '600' : 'normal', color: item.accountName.toLowerCase().includes('ayup') ? '#159BD7' : 'inherit' }}>
                    {item.accountName}
                  </td>
                  <td>{item.bank}</td>
                  <td>{item.accountNo}</td>
                  <td style={{ textAlign: 'center' }}>
                    <span style={{
                      padding: '3px 10px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: '500',
                      backgroundColor: item.isActive ? '#e8f5e9' : '#ffebee',
                      color: item.isActive ? '#2e7d32' : '#c62828'
                    }}>
                      {item.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button
                        onClick={() => handleOpenEdit(item)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#159BD7', padding: '4px' }}
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(item._id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc3545', padding: '4px' }}
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px', color: '#6c757d', fontSize: '13px' }}>
        <div>
          Show 
          <select
            value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
            style={{ margin: '0 5px', padding: '2px 5px', border: '1px solid #dee2e6', borderRadius: '4px' }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          entries
        </div>
        <div>
          Showing {totalEntries === 0 ? 0 : (currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, totalEntries)} of {totalEntries} entries
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            style={{ background: 'none', border: 'none', color: currentPage === 1 ? '#ccc' : '#159BD7', cursor: currentPage === 1 ? 'default' : 'pointer' }}
          >
            Previous
          </button>
          <span style={{ fontWeight: 'bold' }}>{currentPage}</span>
          <button
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            style={{ background: 'none', border: 'none', color: currentPage >= totalPages ? '#ccc' : '#159BD7', cursor: currentPage >= totalPages ? 'default' : 'pointer' }}
          >
            Next
          </button>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            width: '450px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            overflow: 'hidden'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 20px',
              backgroundColor: '#159BD7',
              color: 'white'
            }}>
              <span style={{ fontWeight: 'bold', fontSize: '15px' }}>
                {editingId ? 'Edit Salary Account' : 'Add New Salary Account'}
              </span>
              <button
                onClick={() => setShowModal(false)}
                style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} style={{ padding: '20px' }}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px', color: '#495057' }}>
                  Account Name <span style={{ color: '#dc3545' }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ayup Salary Account"
                  value={formData.accountName}
                  onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #ced4da', borderRadius: '4px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px', color: '#495057' }}>
                  Bank <span style={{ color: '#dc3545' }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. State Bank of India"
                  value={formData.bank}
                  onChange={(e) => setFormData({ ...formData, bank: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #ced4da', borderRadius: '4px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px', color: '#495057' }}>
                  A/C No. <span style={{ color: '#dc3545' }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 40928192831"
                  value={formData.accountNo}
                  onChange={(e) => setFormData({ ...formData, accountNo: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #ced4da', borderRadius: '4px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px', color: '#495057' }}>
                    Branch
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Civil Lines"
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #ced4da', borderRadius: '4px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px', color: '#495057' }}>
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. SBIN0001234"
                    value={formData.ifscCode}
                    onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #ced4da', borderRadius: '4px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px' }}>
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  />
                  Active
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{ padding: '6px 16px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '6px 16px', backgroundColor: '#159BD7', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Save size={16} /> Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            width: '380px',
            padding: '20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 10px', color: '#333' }}>Confirm Delete</h3>
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>
              Are you sure you want to delete this salary account?
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
              <button
                onClick={() => setDeleteConfirm(null)}
                style={{ padding: '6px 16px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                style={{ padding: '6px 16px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
