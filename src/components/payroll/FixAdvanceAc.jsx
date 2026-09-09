import React, { useState, useEffect } from 'react';
import { Save, Plus, Edit, Trash2, Search, Download, RefreshCw, CheckCircle, AlertCircle, Sparkles, Building2, Wallet } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function FixAdvanceAc() {
  const [accounts, setAccounts] = useState([]);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    accountName: '',
    ledgerAccountName: 'HDFC Bank - 50100429188',
    description: '',
    status: 'Active'
  });

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // Notifications
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

  // Fetch Accounts
  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/advance/accounts`, { headers });
      if (res.ok) {
        const data = await res.json();
        setAccounts(Array.isArray(data) ? data : []);
      } else {
        showNotification('error', 'Failed to fetch advance accounts');
      }

      // Fetch bank accounts for dropdown if available
      try {
        const bRes = await fetch(`${API_BASE}/api/salary-accounts`, { headers });
        if (bRes.ok) {
          const bData = await bRes.json();
          if (Array.isArray(bData) && bData.length > 0) setBankAccounts(bData);
        }
      } catch (e) {
        // ignore
      }
    } catch (err) {
      console.error('Error fetching advance accounts:', err);
      showNotification('error', 'Server error loading advance accounts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  // Submit (Create / Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.accountName.trim()) {
      showNotification('error', 'Please provide Account Name');
      return;
    }

    try {
      setSubmitting(true);
      const url = editingId
        ? `${API_BASE}/api/advance/accounts/${editingId}`
        : `${API_BASE}/api/advance/accounts`;
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        showNotification('success', editingId ? 'Advance account updated successfully!' : 'Advance account created successfully!');
        setFormData({
          accountName: '',
          ledgerAccountName: 'HDFC Bank - 50100429188',
          description: '',
          status: 'Active'
        });
        setEditingId(null);
        fetchAccounts();
      } else {
        const errData = await res.json();
        showNotification('error', errData.message || 'Failed to save account');
      }
    } catch (err) {
      console.error(err);
      showNotification('error', 'Server error while saving account');
    } finally {
      setSubmitting(false);
    }
  };

  // Edit
  const handleEdit = (acc) => {
    setEditingId(acc._id);
    setFormData({
      accountName: acc.accountName || '',
      ledgerAccountName: acc.ledgerAccountName || 'HDFC Bank - 50100429188',
      description: acc.description || '',
      status: acc.status || 'Active'
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this advance account?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/advance/accounts/${id}`, {
        method: 'DELETE',
        headers
      });
      if (res.ok) {
        showNotification('success', 'Account deleted successfully');
        fetchAccounts();
      } else {
        showNotification('error', 'Failed to delete account');
      }
    } catch (err) {
      console.error(err);
      showNotification('error', 'Server error during deletion');
    }
  };

  // Export CSV
  const exportCSV = () => {
    if (filteredAccounts.length === 0) {
      showNotification('error', 'No accounts to export');
      return;
    }
    const headersLine = ['Account Name', 'Ledger / Bank Account', 'Description', 'Status', 'Created Date'];
    const rows = filteredAccounts.map(a => [
      `"${a.accountName || ''}"`,
      `"${a.ledgerAccountName || ''}"`,
      `"${(a.description || '').replace(/"/g, '""')}"`,
      `"${a.status || ''}"`,
      `"${new Date(a.createdAt).toLocaleDateString()}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headersLine.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Fix_Advance_Accounts_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('success', 'Accounts exported to CSV!');
  };

  // Filtered Accounts
  const filteredAccounts = accounts.filter(a => {
    const matchesSearch =
      (a.accountName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (a.ledgerAccountName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (a.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || a.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="global-settings-container" style={{ padding: '24px', backgroundColor: '#f8fafc', minHeight: '85vh' }}>
      
      {/* Toast Notification */}
      {statusMessage && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 9999,
          padding: '12px 20px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          backgroundColor: statusMessage.type === 'success' ? '#10b981' : '#ef4444',
          color: 'white',
          fontWeight: '500'
        }}>
          {statusMessage.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1e293b', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Wallet size={24} color="#159BD7" /> Fix Advance A/c Configuration
          </h2>
          <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '14px' }}>
            Define and maintain dedicated advance ledger accounts for staff salary loans and disbursements
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={exportCSV}
            style={{
              backgroundColor: '#fff',
              color: '#475569',
              border: '1px solid #cbd5e1',
              padding: '9px 16px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            <Download size={16} /> Export CSV
          </button>
          <button
            onClick={fetchAccounts}
            style={{
              backgroundColor: '#fff',
              color: '#475569',
              border: '1px solid #cbd5e1',
              padding: '9px 12px',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
            title="Refresh"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Configuration Form Card */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0', marginBottom: '28px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={18} color="#159BD7" />
          {editingId ? 'Edit Advance Account' : 'Create New Advance Account'}
        </h3>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 120px', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                Advance Account Name <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ayup Tech Advance Reserve A/c"
                value={formData.accountName}
                onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                Linked Bank / Ledger Account
              </label>
              <select
                value={formData.ledgerAccountName}
                onChange={(e) => setFormData({ ...formData, ledgerAccountName: e.target.value })}
                style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', backgroundColor: '#fff' }}
              >
                <option value="HDFC Bank - 50100429188">HDFC Bank - 50100429188</option>
                <option value="State Bank of India - 30291823901">State Bank of India - 30291823901</option>
                <option value="ICICI Bank - 002105018293">ICICI Bank - 002105018293</option>
                <option value="Punjab National Bank - 19280018">Punjab National Bank - 19280018</option>
                <option value="School Cash In Hand / Treasury">School Cash In Hand / Treasury</option>
                {bankAccounts.map(b => (
                  <option key={b._id} value={`${b.bankName} - ${b.accountNumber}`}>
                    {b.bankName} - {b.accountNumber}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', backgroundColor: '#fff' }}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
              Description / Notes
            </label>
            <input
              type="text"
              placeholder="e.g. Primary salary loan disbursement pool managed by Ayup Tech"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setFormData({
                    accountName: '',
                    ledgerAccountName: 'HDFC Bank - 50100429188',
                    description: '',
                    status: 'Active'
                  });
                }}
                style={{
                  padding: '9px 18px',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  backgroundColor: '#fff',
                  color: '#475569',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={submitting}
              style={{
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                padding: '9px 24px',
                borderRadius: '6px',
                fontWeight: '600',
                cursor: submitting ? 'not-allowed' : 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Save size={16} /> {submitting ? 'Saving...' : editingId ? 'Update Account' : 'Save Account'}
            </button>
          </div>
        </form>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', gap: '12px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flex: 1, maxWidth: '500px' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search account name, bank or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '8px 12px 8px 34px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13.5px', boxSizing: 'border-box' }}
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13.5px', backgroundColor: '#fff' }}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div style={{ fontSize: '13px', color: '#64748b' }}>
          Total Configured Accounts: <strong>{filteredAccounts.length}</strong>
        </div>
      </div>

      {/* Data Table */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '1px solid #cbd5e1', color: '#334155', fontWeight: '600' }}>
              <th style={{ padding: '12px 16px', width: '60px' }}>#</th>
              <th style={{ padding: '12px 16px' }}>Account Name</th>
              <th style={{ padding: '12px 16px' }}>Linked Bank / Ledger Account</th>
              <th style={{ padding: '12px 16px' }}>Description / Remarks</th>
              <th style={{ padding: '12px 16px', width: '110px' }}>Status</th>
              <th style={{ padding: '12px 16px', textAlign: 'center', width: '100px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '36px', color: '#64748b' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                    <RefreshCw size={18} className="animate-spin" color="#159BD7" />
                    <span>Loading advance accounts...</span>
                  </div>
                </td>
              </tr>
            ) : filteredAccounts.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '36px', color: '#94a3b8' }}>
                  No advance accounts found matching criteria.
                </td>
              </tr>
            ) : (
              filteredAccounts.map((acc, idx) => {
                const isAyup = (acc.accountName || '').toLowerCase().includes('ayup');
                return (
                  <tr
                    key={acc._id}
                    style={{
                      borderBottom: '1px solid #f1f5f9',
                      backgroundColor: isAyup ? 'rgba(21, 155, 215, 0.04)' : 'transparent',
                      transition: 'background 0.2s'
                    }}
                  >
                    <td style={{ padding: '12px 16px', color: '#64748b' }}>{idx + 1}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ fontWeight: '600', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {acc.accountName}
                        {isAyup && (
                          <span style={{ backgroundColor: '#e0f2fe', color: '#0284c7', fontSize: '11px', padding: '1px 6px', borderRadius: '4px', fontWeight: '700', border: '1px solid #7dd3fc', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                            <Sparkles size={10} /> Ayup Tech
                          </span>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px', color: '#334155' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Building2 size={14} color="#64748b" />
                        <span>{acc.ledgerAccountName}</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px', color: '#64748b' }}>
                      {acc.description || '—'}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{
                        padding: '3px 10px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '600',
                        backgroundColor: acc.status === 'Active' ? '#dcfce7' : '#fee2e2',
                        color: acc.status === 'Active' ? '#15803d' : '#b91c1c',
                        border: `1px solid ${acc.status === 'Active' ? '#86efac' : '#fca5a5'}`
                      }}>
                        {acc.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                        <button
                          onClick={() => handleEdit(acc)}
                          style={{ background: 'none', border: 'none', color: '#159BD7', cursor: 'pointer', padding: '4px' }}
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(acc._id)}
                          style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}
                          title="Delete"
                        >
                          <Trash2 size={16} />
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

    </div>
  );
}
