import React, { useState, useEffect } from 'react';
import { Plus, Download, RefreshCw, Search, Trash2, CheckCircle, AlertCircle, Sparkles, DollarSign, Calendar, CreditCard, X } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export default function AdvanceRepayment() {
  const [repayments, setRepayments] = useState([]);
  const [activeAdvances, setActiveAdvances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Search & Pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAdvance, setSelectedAdvance] = useState(null);
  const [formData, setFormData] = useState({
    advanceEntryId: '',
    repaymentAmount: '',
    repaymentDate: new Date().toISOString().split('T')[0],
    paymentMode: 'Salary Deduction',
    chequeNo: '',
    narration: 'Monthly advance repayment deduction',
    accountName: 'Ayup Tech Advance Reserve A/c'
  });

  // Delete Confirm
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

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

  // Fetch Repayments and Active Advances
  const fetchData = async () => {
    try {
      setLoading(true);

      // 1. Repayments
      const rRes = await fetch(`${API_BASE}/api/advance/repayments`, { headers });
      if (rRes.ok) {
        const rData = await rRes.json();
        setRepayments(Array.isArray(rData) ? rData : []);
      }

      // 2. Active Advances (for repayment modal dropdown)
      const eRes = await fetch(`${API_BASE}/api/advance/entries`, { headers });
      if (eRes.ok) {
        const eData = await eRes.json();
        const pending = Array.isArray(eData) ? eData.filter(e => (e.leftAmount || 0) > 0) : [];
        setActiveAdvances(pending);
        if (pending.length > 0 && !formData.advanceEntryId) {
          // preselect Ayup Tech if available
          const ayupAdv = pending.find(p => (p.staffName || '').toLowerCase().includes('ayup'));
          const def = ayupAdv || pending[0];
          setSelectedAdvance(def);
          setFormData(prev => ({
            ...prev,
            advanceEntryId: def._id,
            repaymentAmount: def.monthlyInstallmentAmount || Math.min(10000, def.leftAmount),
            accountName: def.accountName
          }));
        }
      }
    } catch (err) {
      console.error('Error loading repayments:', err);
      showNotification('error', 'Server error loading repayment data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // When an advance is selected in the modal
  const handleAdvanceChange = (advId) => {
    const adv = activeAdvances.find(a => a._id === advId);
    if (adv) {
      setSelectedAdvance(adv);
      setFormData(prev => ({
        ...prev,
        advanceEntryId: adv._id,
        repaymentAmount: adv.monthlyInstallmentAmount || Math.min(10000, adv.leftAmount),
        accountName: adv.accountName
      }));
    }
  };

  // Save Repayment
  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.advanceEntryId) {
      showNotification('error', 'Please select an Active Advance');
      return;
    }
    if (!formData.repaymentAmount || Number(formData.repaymentAmount) <= 0) {
      showNotification('error', 'Please enter a valid Repayment Amount');
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch(`${API_BASE}/api/advance/repayments`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          ...formData,
          repaymentAmount: Number(formData.repaymentAmount)
        })
      });

      if (res.ok) {
        showNotification('success', 'Advance repayment recorded and balance updated successfully!');
        setIsModalOpen(false);
        fetchData();
      } else {
        const err = await res.json();
        showNotification('error', err.message || 'Failed to record repayment');
      }
    } catch (err) {
      console.error(err);
      showNotification('error', 'Server error during submission');
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Repayment (Rollback)
  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      const res = await fetch(`${API_BASE}/api/advance/repayments/${deleteConfirmId}`, {
        method: 'DELETE',
        headers
      });
      if (res.ok) {
        showNotification('success', 'Repayment deleted and parent advance balance adjusted');
        setDeleteConfirmId(null);
        fetchData();
      } else {
        showNotification('error', 'Failed to delete repayment');
      }
    } catch (err) {
      console.error(err);
      showNotification('error', 'Server error while deleting');
    }
  };

  // Export CSV
  const exportCSV = () => {
    if (filteredRepayments.length === 0) {
      showNotification('error', 'No repayments to export');
      return;
    }
    const headersLine = ['Staff Name', 'Employee ID', 'Narration', 'Repayment Amount (₹)', 'Left Balance (₹)', 'Repayment Date', 'Account Name', 'Payment Mode', 'Cheque No'];
    const rows = filteredRepayments.map(r => [
      `"${r.staffName || ''}"`,
      `"${r.employeeId || ''}"`,
      `"${(r.narration || '').replace(/"/g, '""')}"`,
      r.repaymentAmount || 0,
      r.leftAmount || 0,
      `"${new Date(r.repaymentDate).toLocaleDateString()}"`,
      `"${r.accountName || ''}"`,
      `"${r.paymentMode || ''}"`,
      `"${r.chequeNo || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headersLine.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Advance_Repayments_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('success', 'Repayments exported to CSV!');
  };

  // Filter Repayments
  const filteredRepayments = repayments.filter(r => {
    return (
      (r.staffName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.employeeId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.narration || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.chequeNo || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.accountName || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Pagination
  const totalPages = Math.ceil(filteredRepayments.length / pageSize) || 1;
  const paginatedRepayments = filteredRepayments.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Totals
  const totalRepaid = repayments.reduce((s, r) => s + (r.repaymentAmount || 0), 0);

  return (
    <div className="mail-template-container" style={{ padding: '24px', backgroundColor: '#f8fafc', minHeight: '85vh' }}>
      
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

      {/* Header and Action Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1e293b', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <DollarSign size={24} color="#159BD7" /> Advance Repayments Ledger
          </h2>
          <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '14px' }}>
            Record staff salary advance repayments, monthly payroll deductions, and check remaining loan balances
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              backgroundColor: '#159BD7',
              color: 'white',
              border: 'none',
              padding: '9px 18px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(21, 155, 215, 0.25)'
            }}
          >
            <Plus size={16} /> Add New Advance Re-payments
          </button>
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
            <Download size={16} /> Export
          </button>
          <button
            onClick={fetchData}
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

      {/* KPI Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: '#fff', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Total Repayments Recorded</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', marginTop: '4px' }}>{repayments.length}</div>
        </div>
        <div style={{ background: '#fff', padding: '16px', borderRadius: '10px', border: '1px solid #bbf7d0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '12px', color: '#166534', fontWeight: '600', textTransform: 'uppercase' }}>Total Repayment Recovered</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#16a34a', marginTop: '4px' }}>
            ₹{totalRepaid.toLocaleString('en-IN')}
          </div>
        </div>
        <div style={{ background: '#fff', padding: '16px', borderRadius: '10px', border: '1px solid #bae6fd', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '12px', color: '#0369a1', fontWeight: '600', textTransform: 'uppercase' }}>Staff with Pending Advances</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#0284c7', marginTop: '4px' }}>
            {activeAdvances.length} Staff
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: '16px', maxWidth: '400px', position: 'relative' }}>
        <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
        <input
          type="text"
          placeholder="Search name, narration, cheque..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', padding: '8px 12px 8px 34px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13.5px', boxSizing: 'border-box', backgroundColor: '#fff' }}
        />
      </div>

      {/* Table */}
      <div style={{ backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px', minWidth: '1000px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '1px solid #cbd5e1', color: '#334155', fontWeight: '600' }}>
                <th style={{ padding: '12px 14px', width: '70px' }}>Sl No.</th>
                <th style={{ padding: '12px 14px' }}>Staff Name</th>
                <th style={{ padding: '12px 14px' }}>Narration</th>
                <th style={{ padding: '12px 14px' }}>Amount Paid</th>
                <th style={{ padding: '12px 14px' }}>Left Amt</th>
                <th style={{ padding: '12px 14px' }}>Repayment Date</th>
                <th style={{ padding: '12px 14px' }}>Account Name</th>
                <th style={{ padding: '12px 14px' }}>Payment Mode / Cheque</th>
                <th style={{ padding: '12px 14px', textAlign: 'center', width: '80px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center', padding: '36px', color: '#64748b' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                      <RefreshCw size={18} className="animate-spin" color="#159BD7" />
                      <span>Loading repayments...</span>
                    </div>
                  </td>
                </tr>
              ) : paginatedRepayments.length === 0 ? (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center', padding: '36px', color: '#94a3b8' }}>
                    No advance repayments recorded in the table.
                  </td>
                </tr>
              ) : (
                paginatedRepayments.map((r, idx) => {
                  const isAyup = (r.staffName || '').toLowerCase().includes('ayup');
                  return (
                    <tr
                      key={r._id}
                      style={{
                        borderBottom: '1px solid #f1f5f9',
                        backgroundColor: isAyup ? 'rgba(21, 155, 215, 0.04)' : 'transparent',
                        transition: 'background 0.2s'
                      }}
                    >
                      <td style={{ padding: '12px 14px', color: '#64748b' }}>
                        {(currentPage - 1) * pageSize + idx + 1}
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ fontWeight: '600', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          {r.staffName}
                          {isAyup && (
                            <span style={{ backgroundColor: '#e0f2fe', color: '#0284c7', fontSize: '10.5px', padding: '1px 5px', borderRadius: '4px', fontWeight: '700', border: '1px solid #7dd3fc', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                              <Sparkles size={10} /> Ayup Tech
                            </span>
                          )}
                        </div>
                        {r.employeeId && (
                          <div style={{ fontSize: '11.5px', color: '#64748b' }}>ID: {r.employeeId}</div>
                        )}
                      </td>
                      <td style={{ padding: '12px 14px', color: '#334155' }}>
                        {r.narration || 'Salary Deduction'}
                      </td>
                      <td style={{ padding: '12px 14px', fontWeight: '700', color: '#16a34a' }}>
                        ₹{(r.repaymentAmount || 0).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '12px 14px', fontWeight: '700', color: r.leftAmount > 0 ? '#ea580c' : '#16a34a' }}>
                        ₹{(r.leftAmount || 0).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '12px 14px', color: '#334155', whiteSpace: 'nowrap' }}>
                        {r.repaymentDate ? new Date(r.repaymentDate).toLocaleDateString() : '-'}
                      </td>
                      <td style={{ padding: '12px 14px', color: '#475569' }}>
                        {r.accountName}
                      </td>
                      <td style={{ padding: '12px 14px', color: '#334155' }}>
                        <div>{r.paymentMode}</div>
                        {r.chequeNo && <div style={{ fontSize: '11px', color: '#64748b' }}>Ref: {r.chequeNo}</div>}
                      </td>
                      <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                        <button
                          onClick={() => setDeleteConfirmId(r._id)}
                          style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}
                          title="Delete Repayment"
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

        {/* Footer Pagination */}
        <div style={{ padding: '12px 18px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '13px', color: '#64748b' }}>
            Showing {filteredRepayments.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, filteredRepayments.length)} of {filteredRepayments.length} entries
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              style={{
                padding: '4px 12px',
                border: '1px solid #cbd5e1',
                borderRadius: '4px',
                backgroundColor: currentPage === 1 ? '#f1f5f9' : '#fff',
                color: currentPage === 1 ? '#94a3b8' : '#334155',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
              }}
            >
              Previous
            </button>
            <span style={{ padding: '4px 10px', fontSize: '13px', fontWeight: '600', color: '#334155' }}>
              {currentPage} / {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              style={{
                padding: '4px 12px',
                border: '1px solid #cbd5e1',
                borderRadius: '4px',
                backgroundColor: currentPage === totalPages || totalPages === 0 ? '#f1f5f9' : '#fff',
                color: currentPage === totalPages || totalPages === 0 ? '#94a3b8' : '#334155',
                cursor: currentPage === totalPages || totalPages === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Add Repayment Modal */}
      {isModalOpen && (
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
          zIndex: 10000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            width: '100%',
            maxWidth: '560px',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '16px 20px',
              backgroundColor: '#159BD7',
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
                Record Advance Repayment
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} style={{ padding: '24px' }}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                  Select Active Advance <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <select
                  value={formData.advanceEntryId}
                  onChange={(e) => handleAdvanceChange(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13.5px', backgroundColor: '#fff' }}
                >
                  <option value="">-- Select Active Loan / Advance --</option>
                  {activeAdvances.map(a => (
                    <option key={a._id} value={a._id}>
                      {a.staffName} — Total: ₹{a.advanceAmount} | Left: ₹{a.leftAmount} ({a.accountName})
                    </option>
                  ))}
                </select>
              </div>

              {selectedAdvance && (
                <div style={{ backgroundColor: '#f0f9ff', padding: '12px 16px', borderRadius: '8px', border: '1px solid #bae6fd', marginBottom: '16px', fontSize: '13px', color: '#0369a1' }}>
                  <div><strong>Employee:</strong> {selectedAdvance.staffName} ({selectedAdvance.employeeId || 'N/A'})</div>
                  <div><strong>Original Advance:</strong> ₹{selectedAdvance.advanceAmount.toLocaleString('en-IN')}</div>
                  <div><strong>Already Recovered:</strong> ₹{selectedAdvance.recoveredAmount.toLocaleString('en-IN')}</div>
                  <div><strong>Current Outstanding Left:</strong> <strong style={{ color: '#ea580c' }}>₹{selectedAdvance.leftAmount.toLocaleString('en-IN')}</strong></div>
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                    Repayment Amount (₹) <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.repaymentAmount}
                    onChange={(e) => setFormData({ ...formData, repaymentAmount: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', fontWeight: '600', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                    Repayment Date
                  </label>
                  <input
                    type="date"
                    value={formData.repaymentDate}
                    onChange={(e) => setFormData({ ...formData, repaymentDate: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                    Payment Mode
                  </label>
                  <select
                    value={formData.paymentMode}
                    onChange={(e) => setFormData({ ...formData, paymentMode: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', backgroundColor: '#fff' }}
                  >
                    <option value="Salary Deduction">Salary Deduction</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Cheque">Cheque</option>
                    <option value="Cash">Cash</option>
                    <option value="UPI">UPI</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                    Cheque / Ref No.
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. SAL-DED-2026 or UTR"
                    value={formData.chequeNo}
                    onChange={(e) => setFormData({ ...formData, chequeNo: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                  Narration / Notes
                </label>
                <input
                  type="text"
                  placeholder="e.g. Monthly salary deduction installment for Ayup Tech..."
                  value={formData.narration}
                  onChange={(e) => setFormData({ ...formData, narration: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }}
                />
              </div>

              {selectedAdvance && formData.repaymentAmount && (
                <div style={{ marginBottom: '16px', fontSize: '13px', color: '#166534', fontWeight: '600', backgroundColor: '#dcfce7', padding: '8px 12px', borderRadius: '6px' }}>
                  Remaining Balance After This Payment: ₹{Math.max(0, selectedAdvance.leftAmount - Number(formData.repaymentAmount)).toLocaleString('en-IN')}
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{ padding: '8px 18px', border: '1px solid #cbd5e1', borderRadius: '6px', backgroundColor: '#fff', color: '#475569', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    padding: '8px 24px',
                    border: 'none',
                    borderRadius: '6px',
                    backgroundColor: '#159BD7',
                    color: 'white',
                    fontWeight: '600',
                    cursor: submitting ? 'not-allowed' : 'pointer'
                  }}
                >
                  {submitting ? 'Processing...' : 'Confirm Repayment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
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
          zIndex: 10000,
          padding: '20px'
        }}>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', width: '100%', maxWidth: '420px', textAlign: 'center' }}>
            <AlertCircle size={48} color="#ef4444" style={{ margin: '0 auto 16px auto' }} />
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600' }}>Confirm Deletion</h3>
            <p style={{ margin: '0 0 20px 0', color: '#64748b', fontSize: '14px' }}>
              Are you sure you want to delete this repayment record? The paid amount will be added back to the parent advance loan balance.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
              <button
                onClick={() => setDeleteConfirmId(null)}
                style={{ padding: '8px 20px', border: '1px solid #cbd5e1', borderRadius: '6px', backgroundColor: '#fff', color: '#475569', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                style={{ padding: '8px 20px', border: 'none', borderRadius: '6px', backgroundColor: '#ef4444', color: 'white', fontWeight: '600', cursor: 'pointer' }}
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
