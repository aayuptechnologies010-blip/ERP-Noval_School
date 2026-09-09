import React, { useState, useEffect } from 'react';
import { Plus, Download, Edit, Trash2, Search, X, CheckCircle, AlertCircle, RefreshCw, ShieldCheck } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function InsuranceVendor() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Search & Pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    vendorName: '',
    contactPerson: '',
    phone: '',
    email: '',
    address: '',
    isActive: true
  });

  // Notification State
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

  const fetchVendors = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/insurance-vendors`, { headers });
      if (res.ok) {
        const data = await res.json();
        setVendors(Array.isArray(data) ? data : []);
      } else {
        showNotification('error', 'Failed to fetch insurance vendors');
      }
    } catch (err) {
      console.error('Error fetching vendors:', err);
      showNotification('error', 'Server error while loading vendors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const handleOpenModal = (vendor = null) => {
    if (vendor) {
      setEditingId(vendor._id);
      setFormData({
        vendorName: vendor.vendorName || '',
        contactPerson: vendor.contactPerson || '',
        phone: vendor.phone || '',
        email: vendor.email || '',
        address: vendor.address || '',
        isActive: vendor.isActive !== false
      });
    } else {
      setEditingId(null);
      setFormData({
        vendorName: '',
        contactPerson: '',
        phone: '',
        email: '',
        address: '',
        isActive: true
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.vendorName.trim()) {
      showNotification('error', 'Vendor name is required');
      return;
    }

    try {
      setSubmitting(true);
      const url = editingId
        ? `${API_BASE}/api/insurance-vendors/${editingId}`
        : `${API_BASE}/api/insurance-vendors`;
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        showNotification('success', `Vendor ${editingId ? 'updated' : 'created'} successfully!`);
        handleCloseModal();
        fetchVendors();
      } else {
        const err = await res.json();
        showNotification('error', err.message || 'Failed to save vendor');
      }
    } catch (err) {
      console.error('Error saving vendor:', err);
      showNotification('error', 'Server error while saving vendor');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete insurance vendor "${name}"?`)) return;

    try {
      const res = await fetch(`${API_BASE}/api/insurance-vendors/${id}`, {
        method: 'DELETE',
        headers
      });

      if (res.ok) {
        showNotification('success', 'Vendor deleted successfully');
        fetchVendors();
      } else {
        showNotification('error', 'Failed to delete vendor');
      }
    } catch (err) {
      console.error('Error deleting vendor:', err);
      showNotification('error', 'Server error');
    }
  };

  // CSV Export
  const handleExportCSV = () => {
    if (vendors.length === 0) return;
    const csvRows = [
      ['Vendor Name', 'Contact Person', 'Phone', 'Email', 'Address', 'Status'],
      ...vendors.map(v => [
        v.vendorName || '',
        v.contactPerson || '',
        v.phone || '',
        v.email || '',
        v.address || '',
        v.isActive !== false ? 'Active' : 'Inactive'
      ])
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map(e => e.map(i => `"${i}"`).join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `insurance_vendors_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Search Filter & Pagination
  const filteredVendors = vendors.filter(v => {
    const q = searchTerm.toLowerCase();
    const name = (v.vendorName || '').toLowerCase();
    const person = (v.contactPerson || '').toLowerCase();
    const phone = (v.phone || '').toLowerCase();
    const email = (v.email || '').toLowerCase();
    return !searchTerm || name.includes(q) || person.includes(q) || phone.includes(q) || email.includes(q);
  });

  const totalPages = Math.ceil(filteredVendors.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const currentRows = filteredVendors.slice(startIndex, startIndex + pageSize);

  return (
    <div className="mail-template-container" style={{ padding: '20px' }}>
      {/* Notifications */}
      {statusMessage && (
        <div style={{
          padding: '12px 20px',
          borderRadius: '6px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          backgroundColor: statusMessage.type === 'success' ? '#e8f5e9' : '#ffebee',
          color: statusMessage.type === 'success' ? '#2e7d32' : '#c62828',
          border: `1px solid ${statusMessage.type === 'success' ? '#a5d6a7' : '#ef9a9a'}`
        }}>
          {statusMessage.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          <span style={{ fontSize: '14px', fontWeight: '500' }}>{statusMessage.text}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="mail-template-header" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ShieldCheck size={22} color="#159BD7" />
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#1e293b' }}>
            Insurance Vendors ({vendors.length})
          </h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <div className="search-bar" style={{ position: 'relative' }}>
            <input 
              type="text" 
              placeholder="Search vendor, contact, phone..." 
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="search-input" 
              style={{ padding: '8px 14px', borderRadius: '20px', border: '1px solid #cbd5e1', width: '250px' }}
            />
          </div>

          <button 
            onClick={() => handleOpenModal()}
            style={{
              backgroundColor: '#159BD7',
              color: 'white',
              border: 'none',
              padding: '8px 18px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(21, 155, 215, 0.25)'
            }}
          >
            <Plus size={16} /> Add New Insurance Vendor
          </button>

          <button 
            onClick={handleExportCSV}
            style={{
              backgroundColor: 'white',
              color: '#475569',
              border: '1px solid #cbd5e1',
              padding: '8px 16px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="mail-table-wrapper" style={{ overflowX: 'auto', background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        <table className="mail-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ width: '60px', textAlign: 'center', padding: '12px', fontSize: '13px', color: '#475569' }}>Sr. No.</th>
              <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', color: '#475569' }}>Vendor Name</th>
              <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', color: '#475569' }}>Contact Person</th>
              <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', color: '#475569' }}>Phone / Mobile</th>
              <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', color: '#475569' }}>Email</th>
              <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', color: '#475569' }}>Address</th>
              <th style={{ textAlign: 'center', padding: '12px', fontSize: '13px', color: '#475569' }}>Status</th>
              <th style={{ width: '100px', textAlign: 'center', padding: '12px', fontSize: '13px', color: '#475569' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                  <RefreshCw className="animate-spin" size={24} style={{ display: 'inline-block', marginBottom: '8px' }} />
                  <div>Loading insurance vendors...</div>
                </td>
              </tr>
            ) : currentRows.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
                  No insurance vendors found matching criteria.
                </td>
              </tr>
            ) : (
              currentRows.map((row, i) => {
                const isAyup = row.vendorName.toLowerCase().includes('ayup');
                return (
                  <tr key={row._id} style={{ backgroundColor: idxEven(i) ? '#ffffff' : '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ textAlign: 'center', padding: '10px', fontSize: '13px', color: '#64748b' }}>
                      {startIndex + i + 1}
                    </td>
                    <td style={{ padding: '10px', fontSize: '13px', fontWeight: isAyup ? '700' : '600', color: isAyup ? '#0284c7' : '#0f172a' }}>
                      {row.vendorName}
                      {isAyup && (
                        <span style={{ marginLeft: '8px', fontSize: '10px', backgroundColor: '#e1f5fe', color: '#0288d1', padding: '2px 6px', borderRadius: '4px', fontWeight: '600' }}>
                          Verified
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '10px', fontSize: '13px', color: '#334155' }}>
                      {row.contactPerson || '-'}
                    </td>
                    <td style={{ padding: '10px', fontSize: '13px', color: '#475569' }}>
                      {row.phone || '-'}
                    </td>
                    <td style={{ padding: '10px', fontSize: '13px', color: '#475569' }}>
                      {row.email || '-'}
                    </td>
                    <td style={{ padding: '10px', fontSize: '12px', color: '#64748b', maxWidth: '200px' }}>
                      {row.address || '-'}
                    </td>
                    <td style={{ textAlign: 'center', padding: '10px' }}>
                      <span style={{
                        backgroundColor: row.isActive !== false ? '#dcfce7' : '#fee2e2',
                        color: row.isActive !== false ? '#15803d' : '#b91c1c',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: '600'
                      }}>
                        {row.isActive !== false ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center', padding: '10px' }}>
                      <button 
                        onClick={() => handleOpenModal(row)}
                        style={{ border: 'none', background: 'transparent', color: '#0284c7', cursor: 'pointer', marginRight: '10px' }}
                        title="Edit Vendor"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(row._id, row.vendorName)}
                        style={{ border: 'none', background: 'transparent', color: '#ef4444', cursor: 'pointer' }}
                        title="Delete Vendor"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', color: '#64748b', fontSize: '13px', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          Show 
          <select 
            value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
            style={{ margin: '0 4px', padding: '4px 8px', border: '1px solid #cbd5e1', borderRadius: '4px' }}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          entries
        </div>

        <div>
          Showing {filteredVendors.length === 0 ? 0 : startIndex + 1} to {Math.min(startIndex + pageSize, filteredVendors.length)} of {filteredVendors.length} entries
        </div>

        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            style={{ padding: '5px 12px', border: '1px solid #cbd5e1', borderRadius: '4px', background: currentPage === 1 ? '#f8fafc' : '#fff', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
          >
            Previous
          </button>
          <span style={{ padding: '5px 12px', backgroundColor: '#159BD7', color: 'white', borderRadius: '4px', fontWeight: '600' }}>
            {currentPage}
          </span>
          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            style={{ padding: '5px 12px', border: '1px solid #cbd5e1', borderRadius: '4px', background: currentPage === totalPages ? '#f8fafc' : '#fff', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
          >
            Next
          </button>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            width: '100%',
            maxWidth: '520px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '16px 24px',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#f8fafc'
            }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#1e293b' }}>
                {editingId ? 'Edit Insurance Vendor' : 'Add New Insurance Vendor'}
              </h3>
              <button onClick={handleCloseModal} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>
                    Vendor Name <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Ayup Tech Insurance Care, LIC of India"
                    value={formData.vendorName}
                    onChange={(e) => setFormData({ ...formData, vendorName: e.target.value })}
                    style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Contact Person</label>
                    <input 
                      type="text"
                      placeholder="e.g. Ayup Tech"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Phone / Mobile</label>
                    <input 
                      type="text"
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Email Address</label>
                  <input 
                    type="email"
                    placeholder="e.g. contact@ayupinsurance.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Office Address</label>
                  <input 
                    type="text"
                    placeholder="e.g. Civil Lines, Gorakhpur"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                  <input 
                    type="checkbox"
                    id="vendorActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                  />
                  <label htmlFor="vendorActive" style={{ fontSize: '13px', color: '#334155', cursor: 'pointer', fontWeight: '500' }}>
                    Active Vendor
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  style={{ padding: '8px 18px', border: '1px solid #cbd5e1', borderRadius: '6px', background: '#fff', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    padding: '8px 22px',
                    backgroundColor: '#159BD7',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: '600',
                    cursor: submitting ? 'not-allowed' : 'pointer'
                  }}
                >
                  {submitting ? 'Saving...' : (editingId ? 'Update Vendor' : 'Add Vendor')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function idxEven(i) {
  return i % 2 === 0;
}
