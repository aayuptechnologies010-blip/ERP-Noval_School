import React, { useState, useEffect } from 'react';
import { Plus, Download, Edit, Trash2, X, Save } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function DefineSalaryMonth() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    orderNo: '',
    month: 'April',
    year: '2026',
    workingDays: 26,
    totalDays: 30,
    isActive: true
  });
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [pageSize, setPageSize] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/salary-months`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const result = await res.json();
        setData(result);
      }
    } catch (err) {
      console.error('Error fetching salary months:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    const nextOrder = data.length > 0 ? Math.max(...data.map(d => Number(d.orderNo) || 0)) + 1 : 1;
    setFormData({
      orderNo: nextOrder,
      month: 'April',
      year: '2026',
      workingDays: 26,
      totalDays: 30,
      isActive: true
    });
    setShowModal(true);
  };

  const handleOpenEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      orderNo: item.orderNo || '',
      month: item.month || 'April',
      year: item.year || '2026',
      workingDays: item.workingDays !== undefined ? item.workingDays : 26,
      totalDays: item.totalDays !== undefined ? item.totalDays : 30,
      isActive: item.isActive !== undefined ? item.isActive : true
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.orderNo || !formData.month || !formData.year) {
      alert('Order No, Month and Year are required');
      return;
    }

    try {
      const url = editingId ? `${API_BASE}/api/salary-months/${editingId}` : `${API_BASE}/api/salary-months`;
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
        alert(err.message || 'Failed to save salary month');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving salary month');
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/api/salary-months/${id}`, {
        method: 'DELETE',
        headers
      });
      if (res.ok) {
        setDeleteConfirm(null);
        fetchData();
      } else {
        const err = await res.json();
        alert(err.message || 'Failed to delete salary month');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting salary month');
    }
  };

  const handleExportCSV = () => {
    if (filteredData.length === 0) {
      alert('No data to export');
      return;
    }
    const headersCSV = ['Sr No.', 'Order No', 'Month', 'Year', 'Working Days', 'Total Days', 'Status'];
    const rows = filteredData.map((item, idx) => [
      idx + 1,
      item.orderNo,
      `"${item.month || ''}"`,
      `"${item.year || ''}"`,
      item.workingDays,
      item.totalDays,
      item.isActive ? 'Active' : 'Inactive'
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headersCSV.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Salary_Months_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter
  const filteredData = data.filter(item => {
    const s = search.toLowerCase();
    return (
      (item.month && item.month.toLowerCase().includes(s)) ||
      (item.year && item.year.toString().toLowerCase().includes(s)) ||
      (item.orderNo && item.orderNo.toString().includes(s))
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
            placeholder="Search salary month..."
            className="search-input"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          />
        </div>
        <div className="header-buttons">
          <button className="btn-add" onClick={handleOpenAdd}>
            <Plus size={16} /> Add New Salary Month
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
              <th style={{ width: '70px', textAlign: 'center' }}>Sr No.</th>
              <th style={{ width: '90px', textAlign: 'center' }}>Order No</th>
              <th>Month</th>
              <th>Year</th>
              <th style={{ textAlign: 'center' }}>Working Days</th>
              <th style={{ textAlign: 'center' }}>Total Days</th>
              <th style={{ width: '100px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: '#6c757d' }}>
                  Loading salary months...
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: '#6c757d', backgroundColor: '#f8f9fa' }}>
                  No data available in table
                </td>
              </tr>
            ) : (
              paginatedData.map((item, idx) => (
                <tr key={item._id || idx} className={idx % 2 === 0 ? 'row-even' : 'row-odd'}>
                  <td style={{ textAlign: 'center' }}>{(currentPage - 1) * pageSize + idx + 1}</td>
                  <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{item.orderNo}</td>
                  <td style={{ fontWeight: '500' }}>{item.month}</td>
                  <td>{item.year}</td>
                  <td style={{ textAlign: 'center' }}>{item.workingDays}</td>
                  <td style={{ textAlign: 'center' }}>{item.totalDays}</td>
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
            <option value={6}>6</option>
            <option value={12}>12</option>
            <option value={24}>24</option>
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
            width: '420px',
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
                {editingId ? 'Edit Salary Month' : 'Add New Salary Month'}
              </span>
              <button
                onClick={() => setShowModal(false)}
                style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} style={{ padding: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px', color: '#495057' }}>
                    Order No <span style={{ color: '#dc3545' }}>*</span>
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.orderNo}
                    onChange={(e) => setFormData({ ...formData, orderNo: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #ced4da', borderRadius: '4px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px', color: '#495057' }}>
                    Year <span style={{ color: '#dc3545' }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2026"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #ced4da', borderRadius: '4px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px', color: '#495057' }}>
                  Month <span style={{ color: '#dc3545' }}>*</span>
                </label>
                <select
                  value={formData.month}
                  onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #ced4da', borderRadius: '4px', boxSizing: 'border-box' }}
                >
                  {MONTH_NAMES.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px', color: '#495057' }}>
                    Working Days <span style={{ color: '#dc3545' }}>*</span>
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.workingDays}
                    onChange={(e) => setFormData({ ...formData, workingDays: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #ced4da', borderRadius: '4px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px', color: '#495057' }}>
                    Total Days <span style={{ color: '#dc3545' }}>*</span>
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.totalDays}
                    onChange={(e) => setFormData({ ...formData, totalDays: e.target.value })}
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
              Are you sure you want to delete this salary month?
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
