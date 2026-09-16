import React, { useState, useEffect } from 'react';
import { Plus, Download, Edit, Trash2, X, Save } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function DefineSalaryHead() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    serial: '',
    head: '',
    report: '',
    type: 'Allowance',
    lwp: false,
    ot: false,
    vType: 'Total Basic %',
    show: true,
    val: '0.00',
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
      const res = await fetch(`${API_BASE}/api/salary-heads`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const result = await res.json();
        setData(result);
      }
    } catch (err) {
      console.error('Error fetching salary heads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    const nextSerial = data.length > 0 ? Math.max(...data.map(d => Number(d.serial) || 0)) + 1 : 1;
    setFormData({
      serial: nextSerial,
      head: '',
      report: '',
      type: 'Allowance',
      lwp: false,
      ot: false,
      vType: 'Total Basic %',
      show: true,
      val: '0.00',
      isActive: true
    });
    setShowModal(true);
  };

  const handleOpenEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      serial: item.serial || '',
      head: item.head || '',
      report: item.report || '',
      type: item.type || 'Allowance',
      lwp: !!item.lwp,
      ot: !!item.ot,
      vType: item.vType || 'Total Basic %',
      show: item.show !== undefined ? item.show : true,
      val: item.val !== undefined ? item.val : '0.00',
      isActive: item.isActive !== undefined ? item.isActive : true
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.head || !formData.report) {
      alert('Head Name and Head Report Name are required');
      return;
    }

    try {
      const url = editingId ? `${API_BASE}/api/salary-heads/${editingId}` : `${API_BASE}/api/salary-heads`;
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
        alert(err.message || 'Failed to save salary head');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving salary head');
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/api/salary-heads/${id}`, {
        method: 'DELETE',
        headers
      });
      if (res.ok) {
        setDeleteConfirm(null);
        fetchData();
      } else {
        const err = await res.json();
        alert(err.message || 'Failed to delete salary head');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting salary head');
    }
  };

  const handleExportCSV = () => {
    if (filteredData.length === 0) {
      alert('No data to export');
      return;
    }
    const headersCSV = ['Sl No.', 'Head Serial No', 'Head', 'Head Report Name', 'Head Type', 'Effected By LWP', 'Effected By OT', 'Value Type', 'Show in Main Sheet', 'Value/Percentage'];
    const rows = filteredData.map((item, idx) => [
      idx + 1,
      item.serial,
      `"${item.head || ''}"`,
      `"${item.report || ''}"`,
      item.type,
      item.lwp ? 'Yes' : 'No',
      item.ot ? 'Yes' : 'No',
      `"${item.vType || ''}"`,
      item.show ? 'Yes' : 'No',
      `"${item.val || ''}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headersCSV.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Salary_Heads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredData = data.filter(item => {
    const s = search.toLowerCase();
    return (
      (item.head && item.head.toLowerCase().includes(s)) ||
      (item.report && item.report.toLowerCase().includes(s)) ||
      (item.type && item.type.toLowerCase().includes(s)) ||
      (item.vType && item.vType.toLowerCase().includes(s))
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
            placeholder="Search salary head..."
            className="search-input"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          />
        </div>
        <div className="header-buttons">
          <button className="btn-add" onClick={handleOpenAdd}>
            <Plus size={16} /> Add New Salary Head
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
              <th style={{ width: '40px', textAlign: 'center' }}>Sl No.</th>
              <th style={{ width: '80px', textAlign: 'center' }}>Head Serial No</th>
              <th>Head</th>
              <th>Head Report Name</th>
              <th>Head Type</th>
              <th style={{ width: '90px', textAlign: 'center' }}>Effected By LWP</th>
              <th style={{ width: '90px', textAlign: 'center' }}>Effected By OT</th>
              <th>Value Type</th>
              <th style={{ width: '90px', textAlign: 'center' }}>Show in Main Sheet</th>
              <th>Value/Percentage</th>
              <th style={{ width: '80px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="11" style={{ textAlign: 'center', padding: '30px', color: '#6c757d' }}>
                  Loading salary heads...
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan="11" style={{ textAlign: 'center', padding: '30px', color: '#6c757d' }}>
                  No data available in table
                </td>
              </tr>
            ) : (
              paginatedData.map((row, i) => (
                <tr key={row._id || i} className={i % 2 === 0 ? 'row-even' : 'row-odd'}>
                  <td style={{ textAlign: 'center' }}>{(currentPage - 1) * pageSize + i + 1}</td>
                  <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{row.serial}</td>
                  <td style={{ fontWeight: '500' }}>{row.head}</td>
                  <td>{row.report}</td>
                  <td>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '10px',
                      fontSize: '11px',
                      backgroundColor: row.type === 'Allowance' ? '#e8f5e9' : '#ffebee',
                      color: row.type === 'Allowance' ? '#2e7d32' : '#c62828',
                      fontWeight: '500'
                    }}>
                      {row.type}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <input type="checkbox" checked={!!row.lwp} readOnly />
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <input type="checkbox" checked={!!row.ot} readOnly />
                  </td>
                  <td>{row.vType}</td>
                  <td style={{ textAlign: 'center' }}>
                    <input type="checkbox" checked={!!row.show} readOnly />
                  </td>
                  <td style={{ fontWeight: 'bold' }}>{row.val}</td>
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
            width: '500px',
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
                {editingId ? 'Edit Salary Head' : 'Add New Salary Head'}
              </span>
              <button
                onClick={() => setShowModal(false)}
                style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} style={{ padding: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '15px', marginBottom: '15px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px', color: '#495057' }}>
                    Serial No
                  </label>
                  <input
                    type="number"
                    value={formData.serial}
                    onChange={(e) => setFormData({ ...formData, serial: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #ced4da', borderRadius: '4px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px', color: '#495057' }}>
                    Head Name <span style={{ color: '#dc3545' }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Special Allowance"
                    value={formData.head}
                    onChange={(e) => setFormData({ ...formData, head: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #ced4da', borderRadius: '4px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px', color: '#495057' }}>
                    Report Name <span style={{ color: '#dc3545' }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SA"
                    value={formData.report}
                    onChange={(e) => setFormData({ ...formData, report: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #ced4da', borderRadius: '4px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px', color: '#495057' }}>
                    Head Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #ced4da', borderRadius: '4px', boxSizing: 'border-box' }}
                  >
                    <option value="Allowance">Allowance</option>
                    <option value="Deduction">Deduction</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px', color: '#495057' }}>
                    Value Type
                  </label>
                  <select
                    value={formData.vType}
                    onChange={(e) => setFormData({ ...formData, vType: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #ced4da', borderRadius: '4px', boxSizing: 'border-box' }}
                  >
                    <option value="Total Basic %">Total Basic %</option>
                    <option value="Fixed">Fixed</option>
                    <option value="Occasional">Occasional</option>
                    <option value="Custom">Custom</option>
                    <option value="Percentage">Percentage</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px', color: '#495057' }}>
                    Value/Percentage
                  </label>
                  <input
                    type="text"
                    placeholder="0.00"
                    value={formData.val}
                    onChange={(e) => setFormData({ ...formData, val: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #ced4da', borderRadius: '4px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', padding: '10px 0', borderTop: '1fr solid #dee2e6' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.lwp}
                    onChange={(e) => setFormData({ ...formData, lwp: e.target.checked })}
                  />
                  Effected By LWP
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.ot}
                    onChange={(e) => setFormData({ ...formData, ot: e.target.checked })}
                  />
                  Effected By OT
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.show}
                    onChange={(e) => setFormData({ ...formData, show: e.target.checked })}
                  />
                  Show in Main Sheet
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
              Are you sure you want to delete this salary head?
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
