import React, { useState, useEffect } from 'react';
import { Plus, Download, Edit, Trash2, X, Save } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function DefineSalaryGroup() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    groupName: '',
    basicFrom: '0.00',
    basicTo: '0.00',
    gradePay: '0.00',
    payScale: '0.00',
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
      const res = await fetch(`${API_BASE}/api/salary-groups`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const result = await res.json();
        setData(result);
      }
    } catch (err) {
      console.error('Error fetching salary groups:', err);
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
      groupName: '',
      basicFrom: '0.00',
      basicTo: '0.00',
      gradePay: '0.00',
      payScale: '0.00',
      isActive: true
    });
    setShowModal(true);
  };

  const handleOpenEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      groupName: item.groupName || '',
      basicFrom: item.basicFrom !== undefined ? String(item.basicFrom) : '0.00',
      basicTo: item.basicTo !== undefined ? String(item.basicTo) : '0.00',
      gradePay: item.gradePay !== undefined ? String(item.gradePay) : '0.00',
      payScale: item.payScale || '0.00',
      isActive: item.isActive !== undefined ? item.isActive : true
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.groupName.trim()) {
      alert('Group Name is required');
      return;
    }

    try {
      const url = editingId ? `${API_BASE}/api/salary-groups/${editingId}` : `${API_BASE}/api/salary-groups`;
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
        alert(err.message || 'Failed to save salary group');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving salary group');
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/api/salary-groups/${id}`, {
        method: 'DELETE',
        headers
      });
      if (res.ok) {
        setDeleteConfirm(null);
        fetchData();
      } else {
        const err = await res.json();
        alert(err.message || 'Failed to delete salary group');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting salary group');
    }
  };

  const handleExportCSV = () => {
    if (filteredData.length === 0) {
      alert('No data to export');
      return;
    }
    const headersCSV = ['Sl No.', 'GroupName', 'Basic From', 'Basic To', 'Grade Pay', 'Pay Scale'];
    const rows = filteredData.map((item, idx) => [
      idx + 1,
      `"${item.groupName || ''}"`,
      item.basicFrom,
      item.basicTo,
      item.gradePay,
      `"${item.payScale || ''}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headersCSV.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Salary_Groups_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredData = data.filter(item => {
    const s = search.toLowerCase();
    return (
      (item.groupName && item.groupName.toLowerCase().includes(s)) ||
      (item.payScale && item.payScale.toLowerCase().includes(s))
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
            placeholder="Search salary group..."
            className="search-input"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          />
        </div>
        <div className="header-buttons">
          <button className="btn-add" onClick={handleOpenAdd}>
            <Plus size={16} /> Add New Salary Group
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
              <th style={{ width: '60px', textAlign: 'center' }}>Sl No.</th>
              <th>GroupName</th>
              <th>Basic From</th>
              <th>Basic To</th>
              <th>Grade Pay</th>
              <th>Pay Scale</th>
              <th style={{ width: '80px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: '#6c757d' }}>
                  Loading salary groups...
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: '#6c757d' }}>
                  No data available in table
                </td>
              </tr>
            ) : (
              paginatedData.map((row, i) => (
                <tr key={row._id || i} className={i % 2 === 0 ? 'row-even' : 'row-odd'}>
                  <td style={{ textAlign: 'center' }}>{(currentPage - 1) * pageSize + i + 1}</td>
                  <td style={{ fontWeight: '500' }}>{row.groupName}</td>
                  <td>{Number(row.basicFrom).toFixed(2)}</td>
                  <td>{Number(row.basicTo).toFixed(2)}</td>
                  <td>{Number(row.gradePay).toFixed(2)}</td>
                  <td>{row.payScale}</td>
                  <td style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button
                        onClick={() => handleOpenEdit(row)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#159BD7', padding: '4px' }}
                        title="Edit"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(row._id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc3545', padding: '4px' }}
                        title="Delete"
                      >
                        <Trash2 size={14} />
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
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          entries
        </div>
        <div>
          Showing {totalEntries === 0 ? 0 : (currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, totalEntries)} of {totalEntries} entries
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
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
                {editingId ? 'Edit Salary Group' : 'Add New Salary Group'}
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
                  Group Name <span style={{ color: '#dc3545' }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. PB-08 46"
                  value={formData.groupName}
                  onChange={(e) => setFormData({ ...formData, groupName: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #ced4da', borderRadius: '4px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px', color: '#495057' }}>
                    Basic From
                  </label>
                  <input
                    type="number"
                    value={formData.basicFrom}
                    onChange={(e) => setFormData({ ...formData, basicFrom: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #ced4da', borderRadius: '4px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px', color: '#495057' }}>
                    Basic To
                  </label>
                  <input
                    type="number"
                    value={formData.basicTo}
                    onChange={(e) => setFormData({ ...formData, basicTo: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #ced4da', borderRadius: '4px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px', color: '#495057' }}>
                    Grade Pay
                  </label>
                  <input
                    type="number"
                    value={formData.gradePay}
                    onChange={(e) => setFormData({ ...formData, gradePay: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #ced4da', borderRadius: '4px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px', color: '#495057' }}>
                    Pay Scale
                  </label>
                  <input
                    type="text"
                    value={formData.payScale}
                    onChange={(e) => setFormData({ ...formData, payScale: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #ced4da', borderRadius: '4px', boxSizing: 'border-box' }}
                  />
                </div>
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
              Are you sure you want to delete this salary group?
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
