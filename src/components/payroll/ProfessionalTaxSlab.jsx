import React, { useState, useEffect } from 'react';
import { Plus, Download, Edit, Trash2, Search, X, CheckCircle, AlertCircle, RefreshCw, Sparkles, Receipt, Layers, ShieldCheck } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function ProfessionalTaxSlab() {
  const [slabs, setSlabs] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    groupName: '',
    groupSlNo: 1,
    lowerBound: '',
    upperBound: '',
    tax: '',
    applicableMonth: 'All',
    gender: 'All',
    status: 'Active',
    remarks: ''
  });

  // Delete Confirmation Modal
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Toast Notification
  const [statusMessage, setStatusMessage] = useState(null);

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  const showNotification = (type, text) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  // Fetch Slabs
  const fetchSlabs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedGroup && selectedGroup !== 'All') params.append('groupName', selectedGroup);
      if (selectedStatus && selectedStatus !== 'All') params.append('status', selectedStatus);

      const url = `${API_BASE}/api/professional-tax-slabs?${params.toString()}`;
      const res = await fetch(url, { headers });
      if (res.ok) {
        const data = await res.json();
        setSlabs(Array.isArray(data) ? data : []);
      } else {
        showNotification('error', 'Failed to fetch tax slabs');
      }
    } catch (err) {
      console.error('Error loading slabs:', err);
      showNotification('error', 'Server error while loading slabs');
    } finally {
      setLoading(false);
    }
  };

  // Fetch Groups
  const fetchGroups = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/professional-tax-slabs/groups`, { headers });
      if (res.ok) {
        const data = await res.json();
        setGroups(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error('Error loading groups:', err);
    }
  };

  useEffect(() => {
    fetchSlabs();
    fetchGroups();
  }, [selectedGroup, selectedStatus]);

  // Open Add Modal
  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      groupName: groups.length > 0 ? groups[0] : 'Ayup Tech Professional Tax Group',
      groupSlNo: slabs.length + 1,
      lowerBound: '',
      upperBound: '',
      tax: '',
      applicableMonth: 'All',
      gender: 'All',
      status: 'Active',
      remarks: ''
    });
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (slab) => {
    setEditingId(slab._id);
    setFormData({
      groupName: slab.groupName || '',
      groupSlNo: slab.groupSlNo || 1,
      lowerBound: slab.lowerBound !== undefined ? slab.lowerBound : '',
      upperBound: slab.upperBound !== undefined ? slab.upperBound : '',
      tax: slab.tax !== undefined ? slab.tax : '',
      applicableMonth: slab.applicableMonth || 'All',
      gender: slab.gender || 'All',
      status: slab.status || 'Active',
      remarks: slab.remarks || ''
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  // Save Slab
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!formData.groupName.trim()) {
      showNotification('error', 'Please enter a Group Name');
      return;
    }
    if (formData.lowerBound === '' || formData.upperBound === '' || formData.tax === '') {
      showNotification('error', 'Please enter Lower Bound, Upper Bound, and Tax amount');
      return;
    }
    if (Number(formData.lowerBound) > Number(formData.upperBound)) {
      showNotification('error', 'Lower Bound cannot be greater than Upper Bound');
      return;
    }

    try {
      setSubmitting(true);
      const url = editingId 
        ? `${API_BASE}/api/professional-tax-slabs/${editingId}`
        : `${API_BASE}/api/professional-tax-slabs`;
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        showNotification('success', editingId ? 'Tax slab updated successfully!' : 'Tax slab created successfully!');
        handleCloseModal();
        fetchSlabs();
        fetchGroups();
      } else {
        const err = await res.json();
        showNotification('error', err.message || 'Operation failed');
      }
    } catch (err) {
      console.error('Error saving slab:', err);
      showNotification('error', 'Server error while saving slab');
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Slab
  const confirmDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      const res = await fetch(`${API_BASE}/api/professional-tax-slabs/${deleteConfirmId}`, {
        method: 'DELETE',
        headers
      });
      if (res.ok) {
        showNotification('success', 'Professional tax slab deleted successfully!');
        setDeleteConfirmId(null);
        fetchSlabs();
        fetchGroups();
      } else {
        const err = await res.json();
        showNotification('error', err.message || 'Failed to delete slab');
      }
    } catch (err) {
      console.error('Error deleting slab:', err);
      showNotification('error', 'Server error deleting slab');
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    if (slabs.length === 0) {
      showNotification('error', 'No slabs to export');
      return;
    }
    const headersList = ['Sl No.', 'Group Name', 'Group Sl No.', 'Lower Bound (Rs)', 'Upper Bound (Rs)', 'Tax (Rs)', 'Gender', 'Status', 'Remarks'];
    const rows = filteredSlabs.map((s, idx) => [
      idx + 1,
      `"${s.groupName || ''}"`,
      s.groupSlNo || 1,
      s.lowerBound || 0,
      s.upperBound || 0,
      s.tax || 0,
      `"${s.gender || 'All'}"`,
      `"${s.status || 'Active'}"`,
      `"${s.remarks || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headersList.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Professional_Tax_Slabs_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('success', 'Exported tax slabs to CSV');
  };

  // Filter computation
  const filteredSlabs = slabs.filter(s => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      (s.groupName && s.groupName.toLowerCase().includes(term)) ||
      (s.remarks && s.remarks.toLowerCase().includes(term)) ||
      String(s.tax).includes(term) ||
      String(s.lowerBound).includes(term) ||
      String(s.upperBound).includes(term)
    );
  });

  // KPIs
  const totalSlabs = filteredSlabs.length;
  const activeGroups = new Set(filteredSlabs.map(s => s.groupName)).size;
  const maxTax = filteredSlabs.reduce((max, s) => Math.max(max, Number(s.tax) || 0), 0);
  const ayupSlabsCount = filteredSlabs.filter(s => s.groupName && s.groupName.toLowerCase().includes('ayup')).length;

  // Pagination
  const totalPages = Math.ceil(filteredSlabs.length / pageSize) || 1;
  const paginatedSlabs = filteredSlabs.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="mail-template-container" style={{ padding: '24px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Toast Notification */}
      {statusMessage && (
        <div style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          zIndex: 9999,
          padding: '12px 20px',
          borderRadius: '8px',
          backgroundColor: statusMessage.type === 'success' ? '#10b981' : '#ef4444',
          color: '#ffffff',
          fontWeight: '500',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          animation: 'fadeIn 0.2s ease-in-out'
        }}>
          {statusMessage.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Payroll Master</span>
            <span>/</span>
            <span style={{ color: '#159BD7', fontWeight: '600' }}>Professional Tax Slab</span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Receipt size={26} color="#159BD7" />
            Professional Tax Slab
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => { fetchSlabs(); fetchGroups(); }}
            style={{
              padding: '8px 16px',
              backgroundColor: '#ffffff',
              color: '#475569',
              border: '1px solid #cbd5e1',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            <RefreshCw size={15} /> Refresh
          </button>
          <button
            onClick={handleOpenAdd}
            style={{
              padding: '8px 18px',
              backgroundColor: '#159BD7',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(21, 155, 215, 0.2)'
            }}
          >
            <Plus size={18} /> Add New Professional Tax Slab
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ backgroundColor: '#ffffff', padding: '16px 20px', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '500' }}>Total Tax Slabs</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', marginTop: '6px' }}>{totalSlabs}</div>
          <div style={{ fontSize: '12px', color: '#10b981', marginTop: '4px' }}>Configured salary deduction tiers</div>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '16px 20px', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '500' }}>Active Tax Groups</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#159BD7', marginTop: '6px' }}>{activeGroups}</div>
          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Distinct state/slab groups</div>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '16px 20px', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '500' }}>Max Professional Tax</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#059669', marginTop: '6px' }}>
            ₹{maxTax.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: '12px', color: '#059669', marginTop: '4px' }}>Highest monthly deduction cap</div>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '16px 20px', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '500' }}>Ayup Tech Slabs</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#8b5cf6', marginTop: '6px' }}>{ayupSlabsCount}</div>
          <div style={{ fontSize: '12px', color: '#8b5cf6', marginTop: '4px' }}>Ayup Tech standard group slabs</div>
        </div>
      </div>

      {/* Main Table Container */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        {/* Table Toolbar */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '280px' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
              <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="text"
                placeholder="Search group, bounds, tax..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                style={{
                  width: '100%',
                  padding: '7px 12px 7px 32px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '13px'
                }}
              />
            </div>

            <select
              value={selectedGroup}
              onChange={(e) => { setSelectedGroup(e.target.value); setCurrentPage(1); }}
              style={{ padding: '7px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#fff' }}
            >
              <option value="All">All Groups</option>
              {groups.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
              style={{ padding: '7px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#fff' }}
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={handleExportCSV}
              style={{
                padding: '7px 14px',
                backgroundColor: '#f1f5f9',
                color: '#334155',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              <Download size={15} /> Export
            </button>
            <select
              value={pageSize}
              onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
              style={{ padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#fff' }}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        {/* Slabs Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: '600' }}>
                <th style={{ padding: '12px 16px', width: '80px' }}>Sl No.</th>
                <th style={{ padding: '12px 16px' }}>Group Name</th>
                <th style={{ padding: '12px 16px', width: '120px' }}>Group Sl No.</th>
                <th style={{ padding: '12px 16px' }}>Lower Bound</th>
                <th style={{ padding: '12px 16px' }}>Upper Bound</th>
                <th style={{ padding: '12px 16px' }}>Tax</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Status</th>
                <th style={{ padding: '12px 16px', width: '100px', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} style={{ padding: '36px', textAlign: 'center', color: '#64748b' }}>
                    <RefreshCw size={24} className="spin" style={{ margin: '0 auto 8px', display: 'block', animation: 'spin 1s linear infinite' }} />
                    Loading professional tax slabs...
                  </td>
                </tr>
              ) : paginatedSlabs.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                    <Receipt size={36} style={{ margin: '0 auto 10px', color: '#cbd5e1' }} />
                    <div style={{ fontSize: '15px', fontWeight: '600', color: '#475569' }}>No Professional Tax Slabs Found</div>
                    <div style={{ fontSize: '13px', marginTop: '4px' }}>Click "+ Add New Professional Tax Slab" above to create one.</div>
                  </td>
                </tr>
              ) : (
                paginatedSlabs.map((s, idx) => {
                  const isAyup = s.groupName && s.groupName.toLowerCase().includes('ayup');
                  return (
                    <tr 
                      key={s._id} 
                      style={{ 
                        borderBottom: '1px solid #f1f5f9', 
                        backgroundColor: isAyup ? '#f0fdf4' : (idx % 2 === 0 ? '#ffffff' : '#fcfcfd')
                      }}
                    >
                      <td style={{ padding: '12px 16px', color: '#64748b', fontWeight: '500' }}>
                        {(currentPage - 1) * pageSize + idx + 1}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: '600', color: '#0f172a' }}>{s.groupName}</span>
                          {isAyup && (
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '3px',
                              backgroundColor: '#dcfce7',
                              color: '#15803d',
                              fontSize: '11px',
                              fontWeight: '700',
                              padding: '2px 8px',
                              borderRadius: '12px',
                              border: '1px solid #bbf7d0'
                            }}>
                              <Sparkles size={11} /> AYUP TECH SLAB
                            </span>
                          )}
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px', color: '#475569', fontWeight: '600' }}>
                        <span style={{ backgroundColor: '#f1f5f9', padding: '3px 10px', borderRadius: '4px', border: '1px solid #e2e8f0', fontSize: '12px' }}>
                          #{s.groupSlNo || 1}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', color: '#334155', fontWeight: '500' }}>
                        ₹{Number(s.lowerBound || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>
                      <td style={{ padding: '12px 16px', color: '#334155', fontWeight: '500' }}>
                        {Number(s.upperBound) >= 999999 ? 'Above' : `₹${Number(s.upperBound || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`}
                      </td>
                      <td style={{ padding: '12px 16px', fontWeight: '700', color: Number(s.tax) > 0 ? '#0f172a' : '#059669' }}>
                        ₹{Number(s.tax || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <span style={{
                          padding: '3px 10px',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: '600',
                          backgroundColor: s.status === 'Active' ? '#dcfce7' : '#fee2e2',
                          color: s.status === 'Active' ? '#166534' : '#991b1b'
                        }}>
                          {s.status || 'Active'}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                          <button
                            onClick={() => handleOpenEdit(s)}
                            title="Edit Slab"
                            style={{
                              padding: '5px',
                              backgroundColor: '#f1f5f9',
                              border: '1px solid #cbd5e1',
                              borderRadius: '4px',
                              color: '#159BD7',
                              cursor: 'pointer'
                            }}
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(s._id)}
                            title="Delete Slab"
                            style={{
                              padding: '5px',
                              backgroundColor: '#fee2e2',
                              border: '1px solid #fecaca',
                              borderRadius: '4px',
                              color: '#dc2626',
                              cursor: 'pointer'
                            }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div style={{
          padding: '12px 20px',
          borderTop: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '13px',
          color: '#64748b'
        }}>
          <div>
            Showing {filteredSlabs.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to {Math.min(currentPage * pageSize, filteredSlabs.length)} of {filteredSlabs.length} entries
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              style={{
                padding: '5px 12px',
                borderRadius: '4px',
                border: '1px solid #cbd5e1',
                backgroundColor: currentPage <= 1 ? '#f1f5f9' : '#ffffff',
                color: currentPage <= 1 ? '#94a3b8' : '#334155',
                cursor: currentPage <= 1 ? 'not-allowed' : 'pointer'
              }}
            >
              Previous
            </button>
            <span style={{ padding: '5px 10px', fontWeight: '600', color: '#0f172a' }}>
              {currentPage} / {totalPages}
            </span>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              style={{
                padding: '5px 12px',
                borderRadius: '4px',
                border: '1px solid #cbd5e1',
                backgroundColor: currentPage >= totalPages ? '#f1f5f9' : '#ffffff',
                color: currentPage >= totalPages ? '#94a3b8' : '#334155',
                cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer'
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Modal: Add / Edit Slab */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(2px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            width: '100%',
            maxWidth: '560px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#f8fafc'
            }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Receipt size={20} color="#159BD7" />
                {editingId ? 'Edit Professional Tax Slab' : 'Add New Professional Tax Slab'}
              </h3>
              <button onClick={handleCloseModal} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} style={{ padding: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px', display: 'block' }}>
                    Group Name *
                  </label>
                  <input
                    type="text"
                    list="groupSuggestions"
                    placeholder="e.g. Ayup Tech Professional Tax Group"
                    value={formData.groupName}
                    onChange={(e) => setFormData({ ...formData, groupName: e.target.value })}
                    required
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                  <datalist id="groupSuggestions">
                    {groups.map(g => (
                      <option key={g} value={g} />
                    ))}
                    <option value="Ayup Tech Professional Tax Group" />
                    <option value="Maharashtra Standard P-Tax" />
                    <option value="Karnataka P-Tax Group" />
                  </datalist>
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px', display: 'block' }}>
                    Group Sl No. *
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.groupSlNo}
                    onChange={(e) => setFormData({ ...formData, groupSlNo: e.target.value })}
                    required
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px', display: 'block' }}>
                    Gender Applicability
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#fff' }}
                  >
                    <option value="All">All Genders</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px', display: 'block' }}>
                    Lower Bound (Gross Min ₹) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="e.g. 0"
                    value={formData.lowerBound}
                    onChange={(e) => setFormData({ ...formData, lowerBound: e.target.value })}
                    required
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px', display: 'block' }}>
                    Upper Bound (Gross Max ₹) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="e.g. 7500"
                    value={formData.upperBound}
                    onChange={(e) => setFormData({ ...formData, upperBound: e.target.value })}
                    required
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px', display: 'block' }}>
                    Tax Amount (₹) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="e.g. 175"
                    value={formData.tax}
                    onChange={(e) => setFormData({ ...formData, tax: e.target.value })}
                    required
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px', display: 'block' }}>
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#fff' }}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px', display: 'block' }}>
                    Remarks / Description
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Standard tax slab for Ayup Tech staff"
                    value={formData.remarks}
                    onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  style={{ padding: '8px 18px', border: '1px solid #cbd5e1', borderRadius: '6px', background: '#fff', cursor: 'pointer', fontSize: '13px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    padding: '8px 22px',
                    backgroundColor: '#159BD7',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: '600',
                    fontSize: '13px',
                    cursor: submitting ? 'not-allowed' : 'pointer'
                  }}
                >
                  {submitting ? 'Saving...' : (editingId ? 'Update Slab' : 'Add Slab')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Delete Confirmation */}
      {deleteConfirmId && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(2px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            width: '100%',
            maxWidth: '400px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            padding: '24px',
            textAlign: 'center'
          }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Trash2 size={24} />
            </div>
            <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>Delete Tax Slab</h3>
            <p style={{ margin: '0 0 20px', fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>
              Are you sure you want to delete this professional tax slab? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
              <button
                onClick={() => setDeleteConfirmId(null)}
                style={{ padding: '8px 18px', border: '1px solid #cbd5e1', borderRadius: '6px', background: '#fff', cursor: 'pointer', fontSize: '13px' }}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                style={{ padding: '8px 20px', backgroundColor: '#dc2626', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
